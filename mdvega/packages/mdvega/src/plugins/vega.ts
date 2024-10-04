/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { parse, Runtime, Spec, View } from 'vega';
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

            // Register initial signals with the signal bus
            if (spec.signals) {
                spec.signals.forEach((signal: InitSignal) => {
                    //see if signal already exists and get its value
                    const existingSourceSignal = renderer.signalBus.findSourceSignal(signal.name, vegaId);
                    if (existingSourceSignal) {
                        signal.value = existingSourceSignal.value;
                    }
                    renderer.signalBus.registerSignal(vegaId, signal.name, signal.value);
                });
            }

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
                view = new View(runtime, { container, renderer: 'canvas' });
                view.run();
            } catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'vega', index, 'view', container);
                return;
            }

            renderer.instances['vega'].push(view);

            // Helper function to check if a signal is defined in the spec
            const hasSignal = (signalName: string) => {
                return !!(spec.signals && spec.signals.some(signal => signal.name === signalName));
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
            renderer.signalBus.registerListener(vegaId, (name, value) => {
                const scopedName = `${vegaId}_${name}`;
                if (renderer.signalBus.signals[scopedName] !== value) {
                    renderer.signalBus.log(`[Vega ${vegaId}] Updating signal: ${name} with value:`, value);
                    // Mark this update as direct to prevent broadcasting it again
                    ////////////////////////////////////////////////////////////////////renderer.signalBus.updateSignalDirectly(vegaId, name, value);
                    view.signal(name, value).runAsync();
                } else {
                    renderer.signalBus.log(`[Vega ${vegaId}] Signal update snubbed: ${name}, value unchanged:`, value);
                }
            }, hasSignal);
        });
    },
};
