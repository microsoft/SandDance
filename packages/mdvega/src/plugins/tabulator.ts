/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Batch, definePlugin, IInstance, Plugin } from '../factory';
import { sanitizedHTML } from '../sanitize';
import { Tabulator, Options as TabulatorOptions } from 'tabulator-tables';
import { dataNameSelectedSuffix } from './common';

interface TabulatorInstance {
    id: string;
    spec: TabulatorSpec;
    table: Tabulator;
}

export interface TabulatorSpec {
    dataSignalName: string;
    options: TabulatorOptions;
}

interface CustomWindow extends Window {
    Tabulator: typeof Tabulator;
}

export const tabulatorPlugin: Plugin = {
    name: 'tabulator',
    initializePlugin: (md) => definePlugin(md, 'tabulator'),
    fence: (token, idx) => {
        const tabulatorId = `tabulator-${idx}`;
        return sanitizedHTML('div', { id: tabulatorId, class: 'tabulator', style: 'box-sizing: border-box;' }, token.content.trim());
    },
    hydrateComponent: async (renderer, errorHandler) => {
        const tabulatorInstances: TabulatorInstance[] = [];
        const containers = renderer.element.querySelectorAll('.tabulator');
        for (const [index, container] of containers.entries()) {
            if (!container.textContent) continue;
            if (!(window as unknown as CustomWindow).Tabulator) {
                errorHandler(new Error('Tabulator not found'), 'tabulator', index, 'init', container);
                continue;
            }

            try {
                const spec: TabulatorSpec = JSON.parse(container.textContent);

                let options: TabulatorOptions = {
                    autoColumns: true,
                    layout: 'fitColumns',
                    maxHeight: '200px',
                };

                //see if default options is an object with no properties
                if (spec.options && Object.keys(spec.options).length > 0) {
                    options = spec.options;
                }

                const table = new (window as unknown as CustomWindow).Tabulator(container as HTMLElement, options);
                const tabulatorInstance: TabulatorInstance = { id: container.id, spec, table };
                tabulatorInstances.push(tabulatorInstance);
            } catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'tabulator', index, 'parse', container);
                continue;
            }
        }
        const instances: IInstance[] = tabulatorInstances.map((tabulatorInstance, index) => {
            const initialSignals = [{
                name: tabulatorInstance.spec.dataSignalName,
                value: null,
                priority: -1,
                isData: true,
            }];
            if (tabulatorInstance.spec.options.selectableRows) {
                initialSignals.push({
                    name: `${tabulatorInstance.spec.dataSignalName}${dataNameSelectedSuffix}`,
                    value: [],
                    priority: -1,
                    isData: true,
                });
            }
            return {
                ...tabulatorInstance,
                initialSignals,
                recieveBatch: async (batch) => {
                    const newData = batch[tabulatorInstance.spec.dataSignalName].value as object[];
                    if (newData) {
                        tabulatorInstance.table.setData(newData);
                    }
                },
                beginListening(sharedSignals) {
                    if (tabulatorInstance.spec.options.selectableRows) {
                        for (const { isData, signalName } of sharedSignals) {
                            if (isData) {
                                const matchData = signalName === `${tabulatorInstance.spec.dataSignalName}${dataNameSelectedSuffix}`;
                                if (matchData) {
                                    tabulatorInstance.table.on('rowSelectionChanged', (e, rows) => {
                                        const selectedData = tabulatorInstance.table.getSelectedData();
                                        const batch: Batch = {
                                            [`${tabulatorInstance.spec.dataSignalName}${dataNameSelectedSuffix}`]: {
                                                value: selectedData,
                                                isData: true,
                                            },
                                        };
                                        renderer.signalBus.log(tabulatorInstance.id, 'sending batch', batch);
                                        renderer.signalBus.broadcast(tabulatorInstance.id, batch);
                                    });
                                }
                            }
                        }
                    }
                },
                getCurrentSignalValue() {
                    return tabulatorInstance.table.getSelectedData();
                },
                destroy: async () => {
                    tabulatorInstance.table.destroy();
                },
            };
        });
        return instances;
    }
};
