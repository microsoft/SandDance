/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Batch, IInstance, Plugin, MdVega } from '@msrvida/mdvega';
import * as SandDance from '@msrvida/sanddance';
import '@msrvida/sanddance/dist/css/sanddance.css';

declare const vega: SandDance.VegaMorphCharts.types.VegaBase;
declare const MdVega: MdVega;

interface SandDanceInstance {
    id: string;
    spec: SandDanceSpec;
    viewer: SandDance.Viewer;
}

export interface SandDanceSpec {
    insight: SandDance.specs.Insight;
    dataSignalName?: string;
}

export const sanddancePlugin: Plugin = {
    name: 'sanddance',
    initializePlugin: (md) => MdVega.definePlugin(md, 'sanddance'),
    fence: (token, idx) => {
        const id = `SandDance-${idx}`;
        return MdVega.sanitizedHTML('div', { id, class: 'sanddance' }, token.content.trim());
    },
    hydrateComponent: async (renderer, errorHandler) => {

        SandDance.use(vega);

        const sanddanceInstances: SandDanceInstance[] = [];
        const containers = renderer.element.querySelectorAll('.sanddance');
        for (const [index, container] of containers.entries()) {
            if (!container.textContent) continue;

            try {
                const spec: SandDanceSpec = JSON.parse(container.textContent);

                const viewer = new SandDance.Viewer(container as HTMLElement, {});

                const sanddanceInstance: SandDanceInstance = { id: container.id, spec, viewer };
                sanddanceInstances.push(sanddanceInstance);
            } catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'SandDance', index, 'parse', container);
                continue;
            }
        }
        const instances: IInstance[] = sanddanceInstances.map((sanddanceInstance, index) => {
            const { viewer, spec } = sanddanceInstance;
            const initialSignals = [
                {
                    name: sanddanceInstance.spec.dataSignalName,
                    value: null,
                    priority: 1,
                    isData: false,
                },
                {
                    name: `${sanddanceInstance.spec.dataSignalName}${MdVega.common.dataNameSelectedSuffix}`,
                    value: null,
                    priority: 1,
                    isData: false,
                },
            ];
            return {
                ...sanddanceInstance,
                initialSignals,
                recieveBatch: async (batch) => {
                    console.log(`SandDance: received batch for viewer ${sanddanceInstance.id}`, batch);
                    if (spec.dataSignalName) {
                        const newData = batch[spec.dataSignalName]?.value as object[];
                        if (newData) {
                            //load data into the viewer

                            console.log(`SandDance: loading data into viewer ${sanddanceInstance.id}`, newData);

                            viewer.render({
                                insight: spec.insight,
                            }, newData);
                        }
                    }
                },
                beginListening() {
                    sanddanceInstance.viewer.options.onSelectionChanged = (search: SandDance.searchExpression.Search, activeIndex?: number, selectedData?: object[]) => {

                        console.log(`SandDance: selection changed in viewer ${sanddanceInstance.id}`, search, activeIndex, selectedData);

                        const batch: Batch = {
                            [`${spec.dataSignalName}${MdVega.common.dataNameSelectedSuffix}`]: {
                                value: selectedData || [],
                                isData: true,
                            },
                        };
                        renderer.signalBus.broadcast(sanddanceInstance.id, batch);
                    };
                },
                destroy: async () => {
                    viewer.finalize();
                },
            };
        });
        return instances;
    },
};

MdVega.registerMarkdownPlugin(sanddancePlugin);
