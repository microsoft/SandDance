/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { changeset, NewSignal, parse, Runtime, Signal, Spec, View } from 'vega';
import { Plugin, definePlugin } from '../factory';
import { sanitizedHTML } from './sanitize';
import { InitSignal } from 'vega-typings';
import { Resolver, resolveSpec } from '../resolver';

const ignoredSignals = ['width', 'height', 'padding', 'autosize', 'background', 'style', 'parent', 'datum', 'item', 'event', 'cursor'];

interface VegaInstance {
    view: View;
    spec: Spec;
    vegaId: string;
}

interface StackItem {
    signal: Signal;
    vegaInstance: VegaInstance;
}

export const vegaPlugin: Plugin = {
    name: 'vega',
    initializePlugin: (md) => definePlugin(md, 'vega'),
    fence: (token, idx) => {
        const vegaId = `vega-${idx}`;
        return sanitizedHTML('div', { id: vegaId, class: 'vega-chart' }, token.content.trim());
    },
    hydrateComponent: async (renderer, errorHandler) => {
        const instances: VegaInstance[] = [];
        const containers = renderer.element.querySelectorAll('.vega-chart');
        for (const [index, container] of containers.entries()) {
            if (!container.textContent) {
                container.innerHTML = '<div class="error">Expected a spec object or a url</div>';
                continue;
            }

            let result: Resolver;
            try {
                result = await resolveSpec(container.textContent);
            } catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'vega', index, 'resolve', container);
                continue;
            }
            if (result.error) {
                container.innerHTML = `<div class="error">${result.error.toString()}</div>`;
                errorHandler(result.error, 'vega', index, 'resolve', container);
                continue;
            }
            if (!result.spec) {
                container.innerHTML = '<div class="error">Expected a spec object</div>';
                continue;
            }
            const { spec } = result;
            const vegaId = `vega-${index}`;

            let runtime: Runtime;
            let view: View;

            try {
                runtime = parse(spec);
            } catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'vega', index, 'parse', container);
                continue;
            }

            try {
                view = new View(runtime, { container, renderer: renderer.options.vegaRenderer });
                view.run();
            } catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'vega', index, 'view', container);
                continue;
            }

            instances.push({ view, spec, vegaId });
        }

        // determine signal priority - a "bind" to a UI element should be the definitive initial value
        // separate instances into 2 groups - those with signals with "bind" and those without
        const stackItemsWithBind: StackItem[] = [];
        const stackItemsWithoutBind: StackItem[] = [];
        for (const instance of instances) {
            if (!instance.spec.signals) continue;
            for (const signal of instance.spec.signals) {
                const stackItem: StackItem = { signal, vegaInstance: instance };
                if ((signal as (InitSignal | NewSignal)).bind) {
                    stackItemsWithBind.push(stackItem);
                } else {
                    stackItemsWithoutBind.push(stackItem);
                }
            }
        }
        const stackItems = stackItemsWithBind.concat(stackItemsWithoutBind);

        for (const stackItem of stackItems) {
            const { vegaInstance } = stackItem;
            const { spec, view, vegaId } = vegaInstance;

            // Register initial signals with the signal bus
            if (spec.signals) {
                for (const signal of spec.signals as InitSignal[]) {
                    if (ignoredSignals.includes(signal.name)) continue;

                    //see if signal already exists and get its value
                    const existingSourceSignal = renderer.signalBus.findSourceSignal(signal.name, vegaId);
                    if (existingSourceSignal) {
                        view.signal(signal.name, existingSourceSignal.value);
                    }
                    renderer.signalBus.registerSourceSignal(vegaId, signal.name, view.signal(signal.name));
                }
            }

            // get initial data from the signal bus
            if (spec.data) {
                const prefixed = spec.data.filter(d => d.name.startsWith(renderer.options.dataSignalPrefix));
                for (const data of prefixed) {
                    if (!data.name.startsWith(renderer.options.dataSignalPrefix)) continue;
                    //see if data already exists and get its value
                    const existingSourceData = renderer.signalBus.findSourceSignal(data.name, vegaId);
                    if (existingSourceData) {
                        view
                            .change(data.name, changeset().remove(() => true).insert(existingSourceData.value))
                            .run();
                    }
                }
            }

            // Helper function to check if a signal is defined in the spec
            const hasSignal = (signalName: string) => {
                return !!(spec.signals && spec.signals.some(signal => signal.name === signalName));
            };

            const hasData = (dataName: string) => {
                return !!(spec.data && spec.data.some(data => data.name === dataName));
            };

            // Register a listener for each signal in this Vega instance
            if (spec.signals) {
                for (const signal of spec.signals) {
                    if (ignoredSignals.includes(signal.name)) continue;

                    view.addSignalListener(signal.name, (name, value) => {
                        renderer.signalBus.log(`[Vega ${vegaId}] Signal event: ${name}, value:`, value);
                        // Only broadcast if this is an event-driven signal change
                        renderer.signalBus.broadcast(vegaId, name, value);
                    });
                }
            }

            // Register a global listener to update this Vega instance when signals change
            renderer.signalBus.registerListener(
                vegaId,
                async (name, value) => {
                    const scopedName = renderer.signalBus.getScopedName(vegaId, name);
                    if (renderer.signalBus.signalValues[scopedName] !== value) {
                        renderer.signalBus.log(vegaId, `Vega Updating signal: ${name} with value:`, value);
                        // Mark this update as direct to prevent broadcasting it again
                        ////////////////////////////////////////////////////////////////////renderer.signalBus.updateSignalDirectly(vegaId, name, value);
                        await view.signal(name, value).runAsync();
                    } else {
                        renderer.signalBus.log(vegaId, `Vega Signal update snubbed: ${name}, value unchanged:`, value);
                    }
                },
                hasSignal,
                async (name, value) => {
                    await view
                        .change(name, changeset().remove(() => true).insert(value))
                        .runAsync();
                },
                hasData,
            );
        }
        return {
            pluginName: vegaPlugin.name,
            instances,
        };
    },
};
