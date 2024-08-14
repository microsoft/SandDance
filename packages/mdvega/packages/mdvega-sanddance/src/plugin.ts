import { MdVega, Plugin } from '@msrvida/mdvega';
import { Spec } from './types';

declare const MdVega: MdVega;

export const sanddancePlugin: Plugin = {
    name: 'sanddance',
    initializePlugin: (md) => MdVega.definePlugin(md, 'sanddance'),
    fence: (token, idx) => {
        const spec = JSON.parse(token.content.trim());
        const sanddanceId = `sanddance-${idx}`;
        return `<div id="${sanddanceId}" class="sanddance-chart">${JSON.stringify(spec)}</div>`;
    },
    hydrateComponent: (renderer) => {
        renderer.element.querySelectorAll('.sanddance-chart').forEach((container, index) => {
            if (!container.textContent) return;

            const spec = JSON.parse(container.textContent) as Spec;

            console.log('sanddance spec found', spec);

            //const sanddanceId = `sanddance-${index}`;

            // Register initial signals with the signal bus
            // if (spec.signals) {
            //     spec.signals.forEach(signal => {
            //         renderer.signalBus.registerSignal(sanddanceId, signal.name, null /*signal.value*/); //////////////////////////////
            //     });
            // }

            //TODO catch errors

            // const runtime = parse(spec);
            // const view = new View(runtime, { container, renderer: 'canvas' });
            // view.runAsync();

            // renderer.instances['vega'].push(view);



            // Helper function to check if a signal is defined in the spec
            // const hasSignal = (signalName: string) => {
            //     return !!(spec.signals && spec.signals.some(signal => signal.name === signalName));
            // };

            // // Register a listener for each signal in this Vega instance
            // if (spec.signals) {
            //     spec.signals.forEach(signal => {
            //         view.addSignalListener(signal.name, (name, value) => {
            //             console.log(`[Vega ${sanddanceId}] Signal event: ${name}, value:`, value);
            //             // Only broadcast if this is an event-driven signal change
            //             renderer.signalBus.broadcast(sanddanceId, name, value);
            //         });
            //     });
            // }

            // // Register a global listener to update this Vega instance when signals change
            // renderer.signalBus.registerListener(sanddanceId, (name, value) => {
            //     const scopedName = `${sanddanceId}_${name}`;
            //     if (renderer.signalBus.signals[scopedName] !== value) {
            //         console.log(`[Vega ${sanddanceId}] Updating signal: ${name} with value:`, value);
            //         // Mark this update as direct to prevent broadcasting it again
            //         ////////////////////////////////////////////////////////////////////renderer.signalBus.updateSignalDirectly(vegaId, name, value);
            //         view.signal(name, value).runAsync();
            //     } else {
            //         console.log(`[Vega ${sanddanceId}] Signal update snubbed: ${name}, value unchanged:`, value);
            //     }
            // }, hasSignal);
        });
    },
};
