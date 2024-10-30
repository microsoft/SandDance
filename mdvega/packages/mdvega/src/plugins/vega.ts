/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { changeset, parse, Runtime, Spec, ValuesData, View } from 'vega';
import { Plugin, definePlugin } from '../factory';
import { sanitizedHTML } from './sanitize';
import { InitSignal } from 'vega-typings';

const ignoredSignals = ['width', 'height', 'padding', 'autosize', 'background', 'style', 'parent', 'datum', 'item', 'event', 'cursor'];

export const vegaPlugin: Plugin = {
    name: 'vega',
    initializePlugin: (md) => definePlugin(md, 'vega'),
    fence: (token, idx) => {
        const spec = JSON.parse(token.content.trim());
        const vegaId = `vega-${idx}`;
        return sanitizedHTML('div', { id: vegaId, class: 'vega-chart' }, JSON.stringify(spec));
    },
    hydrateComponent: (renderer, errorHandler) => {
        renderer.element.querySelectorAll('.vega-chart').forEach((container, index) => {
            if (!container.textContent) return;

            const spec = JSON.parse(container.textContent) as Spec;

            const vegaId = `vega-${index}`;

            let runtime: Runtime;
            let view: View;

            try {
                runtime = parse(spec);
            } catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'vega', index, 'parse', container);
                return;
            }

            try {
                view = new View(runtime, { container, renderer: renderer.options.vegaRenderer });
                view.run();
            } catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'vega', index, 'view', container);
                return;
            }

            // Register initial signals with the signal bus
            if (spec.signals) {
                spec.signals.forEach((signal: InitSignal) => {
                    if (ignoredSignals.includes(signal.name)) return;

                    //see if signal already exists and get its value
                    const existingSourceSignal = renderer.signalBus.findSourceSignal(signal.name, vegaId);
                    if (existingSourceSignal) {
                        view.signal(signal.name, existingSourceSignal.value);
                    }
                    renderer.signalBus.registerSourceSignal(vegaId, signal.name, view.signal(signal.name));
                });
            }

            // get initial data from the signal bus
            if (spec.data) {
                spec.data.filter(d => d.name.startsWith(renderer.options.dataSignalPrefix)).forEach((data: ValuesData) => {
                    if (!data.name.startsWith(renderer.options.dataSignalPrefix)) return;
                    //see if data already exists and get its value
                    const existingSourceData = renderer.signalBus.findSourceSignal(data.name, vegaId);
                    if (existingSourceData) {
                        view
                            .change(data.name, changeset().remove(() => true).insert(existingSourceData.value))
                            .run();
                    }
                });
            }

            renderer.instances['vega'].push({ view, spec, vegaId });

            // Helper function to check if a signal is defined in the spec
            const hasSignal = (signalName: string) => {
                return !!(spec.signals && spec.signals.some(signal => signal.name === signalName));
            };

            const hasData = (dataName: string) => {
                return !!(spec.data && spec.data.some(data => data.name === dataName));
            };

            // Register a listener for each signal in this Vega instance
            if (spec.signals) {
                spec.signals.forEach(signal => {
                    if (ignoredSignals.includes(signal.name)) return;
                    
                    view.addSignalListener(signal.name, (name, value) => {
                        renderer.signalBus.log(`[Vega ${vegaId}] Signal event: ${name}, value:`, value);
                        // Only broadcast if this is an event-driven signal change
                        renderer.signalBus.broadcast(vegaId, name, value);
                    });
                });
            }

            // Register a global listener to update this Vega instance when signals change
            renderer.signalBus.registerListener(
                vegaId,
                async (name, value) => {
                    const scopedName = renderer.signalBus.getScopedName(vegaId, name);
                    if (renderer.signalBus.signalValues[scopedName] !== value) {
                        renderer.signalBus.log(`[Vega ${vegaId}] Updating signal: ${name} with value:`, value);
                        // Mark this update as direct to prevent broadcasting it again
                        ////////////////////////////////////////////////////////////////////renderer.signalBus.updateSignalDirectly(vegaId, name, value);
                        await view.signal(name, value).runAsync();
                    } else {
                        renderer.signalBus.log(`[Vega ${vegaId}] Signal update snubbed: ${name}, value unchanged:`, value);
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
        });
    },
};
