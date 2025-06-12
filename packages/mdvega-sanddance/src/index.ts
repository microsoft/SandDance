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
    spec: SdMdSpec;
    viewer: SandDance.Viewer;
    viewIndex: number;
}

export interface SdMdSpec {
    dataSignalName?: string;
    views: (SandDance.specs.Insight | SandDance.types.Snapshot)[];
    viewIndexSignalName?: string;
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
                const spec: SdMdSpec = JSON.parse(container.textContent);
                const viewer = new SandDance.Viewer(container as HTMLElement, {});
                const sanddanceInstance: SandDanceInstance = { id: container.id, spec, viewer, viewIndex: 0 };
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
                    let viewIndex = sanddanceInstance.viewIndex;
                    if (spec.viewIndexSignalName) {
                        const viewIndexSignal = batch[spec.viewIndexSignalName];
                        if (viewIndexSignal && typeof viewIndexSignal.value === 'number') {
                            viewIndex = viewIndexSignal.value;
                        }
                    }
                    if (spec.dataSignalName) {
                        const newData = batch[spec.dataSignalName]?.value as object[];
                        if (newData) {
                            let insight: SandDance.specs.Insight | undefined;
                            let setup: SandDance.types.Setup | undefined;
                            if (spec.views && spec.views[viewIndex]) {
                                const view = spec.views[viewIndex];
                                const snapshot = view as SandDance.types.Snapshot;
                                if (snapshot.insight) {
                                    //this is a snapshot
                                    insight = {
                                        ...snapshot.insight,
                                        size: {
                                            //TODO make sure this is a reasonable size
                                            height: 400,
                                            width: 600,
                                        },
                                    };
                                    setup = snapshot.setup;
                                } else {
                                    //this is an insight
                                    insight = view as SandDance.specs.Insight;
                                }
                            }
                            viewer.render({ insight, setup }, newData);
                        }
                    } else {
                        //no new data but check if in
                    }
                },
                beginListening() {
                    sanddanceInstance.viewer.options.onSelectionChanged = (search: SandDance.searchExpression.Search, activeIndex?: number, selectedData?: object[]) => {
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
