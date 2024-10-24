/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { changeset, parse, Runtime, Spec, ValuesData, View } from 'vega';
import { Plugin, definePlugin } from '../factory';
import { sanitizedHTML } from './sanitize';
import { InitSignal } from 'vega-typings';

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
                    //see if signal already exists and get its value
                    const existingSourceSignal = renderer.signalBus.findSourceSignal(signal.name, vegaId);
                    if (existingSourceSignal) {
                        signal.value = existingSourceSignal.value;
                    }
                    renderer.signalBus.registerSourceSignal(vegaId, signal.name, view.signal(signal.name));
                });
            }

            // Register initial data with the signal bus
            if (spec.data) {
                spec.data.filter(d => d.name.startsWith(renderer.options.dataSignalPrefix)).forEach((data: ValuesData) => {
                    if (!data.name.startsWith(renderer.options.dataSignalPrefix)) return;
                    //see if data already exists and get its value
                    const existingSourceData = renderer.signalBus.findSourceData(data.name, vegaId);
                    if (existingSourceData) {
                        data.values = existingSourceData.values;
                    }
                    renderer.signalBus.registerSourceData(vegaId, data.name, view.data(data.name));
                });
            }

            renderer.instances['vega'].push(view);

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
                    const scopedName = `${vegaId}_${name}`;
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
