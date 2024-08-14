import { parse, Spec, View } from 'vega';
import { Plugin, definePlugin } from '../factory';

export const vegaPlugin: Plugin = {
    name: 'vega',
    initializePlugin: (md) => definePlugin(md, 'vega'),
    fence: (token, idx) => {
        const spec = JSON.parse(token.content.trim());
        const vegaId = `vega-${idx}`;
        return `<div id="${vegaId}" class="vega-chart">${JSON.stringify(spec)}</div>`;
    },
    hydrateComponent: (renderer) => {
        renderer.element.querySelectorAll('.vega-chart').forEach((container, index) => {
            if (!container.textContent) return;

            const spec = JSON.parse(container.textContent) as Spec;

            const vegaId = `vega-${index}`;

            // Register initial signals with the signal bus
            if (spec.signals) {
                spec.signals.forEach(signal => {
                    renderer.signalBus.registerSignal(vegaId, signal.name, null /*signal.value*/); //////////////////////////////
                });
            }

            //TODO catch errors

            const runtime = parse(spec);
            const view = new View(runtime, { container, renderer: 'canvas' });
            view.runAsync();

            renderer.instances['vega'].push(view);



            // Helper function to check if a signal is defined in the spec
            const hasSignal = (signalName: string) => {
                return !!(spec.signals && spec.signals.some(signal => signal.name === signalName));
            };

            // Register a listener for each signal in this Vega instance
            if (spec.signals) {
                spec.signals.forEach(signal => {
                    view.addSignalListener(signal.name, (name, value) => {
                        console.log(`[Vega ${vegaId}] Signal event: ${name}, value:`, value);
                        // Only broadcast if this is an event-driven signal change
                        renderer.signalBus.broadcast(vegaId, name, value);
                    });
                });
            }

            // Register a global listener to update this Vega instance when signals change
            renderer.signalBus.registerListener(vegaId, (name, value) => {
                const scopedName = `${vegaId}_${name}`;
                if (renderer.signalBus.signals[scopedName] !== value) {
                    console.log(`[Vega ${vegaId}] Updating signal: ${name} with value:`, value);
                    // Mark this update as direct to prevent broadcasting it again
                    ////////////////////////////////////////////////////////////////////renderer.signalBus.updateSignalDirectly(vegaId, name, value);
                    view.signal(name, value).runAsync();
                } else {
                    console.log(`[Vega ${vegaId}] Signal update snubbed: ${name}, value unchanged:`, value);
                }
            }, hasSignal);
        });
    },
};
