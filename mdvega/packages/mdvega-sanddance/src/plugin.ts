/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { MdVega, Plugin } from '@msrvida/mdvega';
import { SignalRef } from 'vega-typings/types';
import { Spec } from './types';
import { dataLoader, types, Viewer } from '@msrvida/sanddance';

declare const MdVega: MdVega;

export const sanddancePlugin: Plugin = {
    name: 'sanddance',
    initializePlugin: (md) => MdVega.definePlugin(md, 'sanddance'),
    fence: (token, idx) => {
        const sdSpec = JSON.parse(token.content.trim());
        const sanddanceId = `sanddance-${idx}`;
        return `<div id="${sanddanceId}" class="sanddance-chart">${JSON.stringify(sdSpec)}</div>`;
    },
    hydrateComponent: (renderer) => {
        renderer.element.querySelectorAll('.sanddance-chart').forEach((container, index) => {
            if (!container.textContent) return;

            const sdSpec = JSON.parse(container.textContent) as Spec;

            console.log('sanddance spec found', sdSpec);

            if (sdSpec.data) {
                //see if data is a signalRef
                if ((sdSpec.data as SignalRef).signal) {
                    //TODO
                    // const dataSignal = spec.data.signal;
                    // const dataSignalValue = renderer.signalBus.getSignalValue(dataSignal);
                    // if (dataSignalValue) {
                    //     spec.data = dataSignalValue;
                    // }
                } else {
                    //load through SandDance dataLoader
                    const data = sdSpec.data as object[] | types.DataFile;
                    dataLoader.loadData(data, (dataFile, dataContent) => {
                        console.log('SD data loaded', dataFile, dataContent);

                        const element = container as HTMLElement;

                        //TODO validate insight object
                        const { insight } = sdSpec;

                        if (insight.size?.height) {
                            element.style.height = `${insight.size.height}px`;
                        }

                        const viewer = new Viewer(element);
                        viewer.render({ insight }, dataContent.data);

                        const spec = viewer.vegaSpec;
                        
                        const sanddanceId = `sanddance-${index}`;

                        // Register initial signals with the signal bus
                        if (spec.signals) {
                            spec.signals.forEach(signal => {
                                renderer.signalBus.registerSignal(sanddanceId, signal.name, null /*signal.value*/); //////////////////////////////
                            });
                        }

                        //TODO catch errors

                        renderer.instances['sanddance'].push(viewer);


                        // Helper function to check if a signal is defined in the spec
                        const hasSignal = (signalName: string) => {
                            return !!(spec.signals && spec.signals.some(signal => signal.name === signalName));
                        };

                        // Register a listener for each signal in this Vega instance
                        if (spec.signals) {
                            spec.signals.forEach(signal => {
                                viewer.vegaViewGl.addSignalListener(signal.name, (name, value) => {
                                    //console.log(`[Vega ${sanddanceId}] Signal event: ${name}, value:`, value);
                                    // Only broadcast if this is an event-driven signal change
                                    renderer.signalBus.broadcast(sanddanceId, name, value);
                                });
                            });
                        }

                        // Register a global listener to update this Vega instance when signals change
                        renderer.signalBus.registerListener(sanddanceId, (name, value) => {
                            const scopedName = `${sanddanceId}_${name}`;
                            if (renderer.signalBus.signals[scopedName] !== value) {
                                //console.log(`[Vega ${sanddanceId}] Updating signal: ${name} with value:`, value);
                                // Mark this update as direct to prevent broadcasting it again
                                ////////////////////////////////////////////////////////////////////renderer.signalBus.updateSignalDirectly(vegaId, name, value);
                                viewer.vegaViewGl.signal(name, value).runAsync();
                            } else {
                                //console.log(`[Vega ${sanddanceId}] Signal update snubbed: ${name}, value unchanged:`, value);
                            }
                        }, hasSignal);


                    }, (reason) => {
                        console.error('SD data load error', reason);
                    });
                }
            }

        });
    },
};
