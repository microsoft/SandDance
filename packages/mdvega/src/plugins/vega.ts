/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { changeset, parse, View, expressionFunction, LoggerInterface } from 'vega';
import { Batch, IInstance, Plugin, PrioritizedSignal, definePlugin } from '../factory';
import { sanitizedHTML } from '../sanitize';
import { BaseSignal, InitSignal, NewSignal, Runtime, Spec, ValuesData } from 'vega-typings';
import { Resolver, resolveSpec } from '../resolver';
import { ErrorHandler, Renderer } from '../renderer';
import { LogLevel } from '../signalbus';
import { dataNameSelectedSuffix } from './common';
import { urlParam } from './util';

const ignoredSignals = ['width', 'height', 'padding', 'autosize', 'background', 'style', 'parent', 'datum', 'item', 'event', 'cursor'];

interface SpecInit {
    spec: Spec;
    initialSignals: PrioritizedSignal[];
    container: Element;
    index: number;
}

interface VegaInstance extends SpecInit {
    view: View;
    id: string;
    batch?: Batch;
    dataSignals: string[];
    needToRun?: boolean;
}

export const vegaPlugin: Plugin = {
    name: 'vega',
    initializePlugin: (md) => definePlugin(md, 'vega'),
    fence: (token, idx) => {
        const vegaId = `vega-${idx}`;
        return sanitizedHTML('div', { id: vegaId, class: 'vega-chart' }, token.content.trim());
    },
    hydrateComponent: async (renderer, errorHandler) => {
        const vegaInstances: VegaInstance[] = [];
        const containers = renderer.element.querySelectorAll('.vega-chart');
        const specInits: SpecInit[] = [];
        for (const [index, container] of containers.entries()) {
            const specInit = await createSpecInit(container, index, renderer, errorHandler);
            if (specInit) {
                specInits.push(specInit);
            }
        }
        prioritizeSignalValues(specInits);
        for (const specInit of specInits) {
            const vegaInstance = await createVegaInstance(specInit, renderer, errorHandler);
            if (vegaInstance) {
                vegaInstances.push(vegaInstance);
            }
        }

        //make a single array of all the initialSignals that are marked isData
        const dataSignals = vegaInstances.map(vegaInstance => vegaInstance.initialSignals.filter(signal => signal.isData)).flat();

        //spin through all instances to see if its spec has data that matches with dataSignals
        for (const vegaInstance of vegaInstances) {
            if (!vegaInstance.spec.data) continue;
            for (const data of vegaInstance.spec.data) {
                //find a matching data signal
                const dataSignal = dataSignals.find(signal =>
                    (signal.name === data.name)                 //exact match
                    ||
                    (`${signal.name}${dataNameSelectedSuffix}` === data.name)   //match a selection from Tabulator
                );
                if (dataSignal) {
                    //if we find a match, add it to our initialSignals
                    vegaInstance.initialSignals.push({
                        name: data.name,
                        value: (data as ValuesData).values,
                        priority: (data as ValuesData).values ? 1 : 0,
                        isData: true,
                    });
                }
            }
        }

        const instances: IInstance[] = vegaInstances.map((vegaInstance) => {
            const { spec, view, initialSignals } = vegaInstance;
            const startBatch = (from: string) => {
                if (!vegaInstance.batch) {
                    renderer.signalBus.log(vegaInstance.id, 'starting batch', from);
                    vegaInstance.batch = {};
                    view.runAfter(() => {
                        const { batch } = vegaInstance;
                        vegaInstance.batch = undefined;
                        renderer.signalBus.log(vegaInstance.id, 'sending batch', batch);
                        renderer.signalBus.broadcast(vegaInstance.id, batch);
                    });
                }
            };
            return {
                ...vegaInstance,
                initialSignals,
                recieveBatch: async (batch, from) => {
                    renderer.signalBus.log(vegaInstance.id, 'recieved batch', batch, from);
                    return new Promise<void>(resolve => {
                        view.runAfter(async () => {
                            if (recieveBatch(batch, renderer, vegaInstance)) {
                                renderer.signalBus.log(vegaInstance.id, 'running after _pulse, changes from', from);
                                vegaInstance.needToRun = true;
                            } else {
                                renderer.signalBus.log(vegaInstance.id, 'no changes');
                            }
                            renderer.signalBus.log(vegaInstance.id, 'running view after _pulse finished');
                            resolve();
                        });
                    });
                },
                broadcastComplete: async () => {
                    renderer.signalBus.log(vegaInstance.id, 'broadcastComplete');
                    if (vegaInstance.needToRun) {
                        view.runAfter(() => {
                            view.runAsync();    //do not await, since we are already in a runAfter
                            vegaInstance.needToRun = false;
                            renderer.signalBus.log(vegaInstance.id, 'running view after broadcastComplete');
                        });
                    }
                },
                beginListening: (sharedSignals) => {
                    for (const { isData, signalName } of sharedSignals) {
                        if (ignoredSignals.includes(signalName)) return;
                        if (isData) {
                            const matchData = spec.data?.find(data => data.name === signalName);
                            if (matchData && vegaInstance.dataSignals.includes(matchData.name)) {
                                renderer.signalBus.log(vegaInstance.id, 'listening to data', signalName);
                                view.addDataListener(signalName, async (name, value) => {
                                    startBatch(`data:${signalName}`);
                                    vegaInstance.batch[name] = { value, isData };
                                });
                            }
                        }
                        const matchSignal = spec.signals?.find(signal => signal.name === signalName);
                        if (matchSignal) {
                            //only listen to signals that are change sources
                            const isChangeSource =
                                (matchSignal as BaseSignal).on ||   // event streams
                                (matchSignal as NewSignal).bind ||  // ui elements
                                (matchSignal as NewSignal).update   // calculations
                                ;
                            if (isChangeSource) {
                                renderer.signalBus.log(vegaInstance.id, 'listening to signal', signalName);
                                view.addSignalListener(signalName, async (name, value) => {
                                    startBatch(`signal:${signalName}`);
                                    vegaInstance.batch[name] = { value, isData };
                                });
                            } else {
                                //renderer.signalBus.log(vegaInstance.id, 'not listening to signal, not a change source', signalName);
                            }
                        } else {
                            //renderer.signalBus.log(vegaInstance.id, 'not listening to signal, no match', signalName);
                        }
                    }
                },
                getCurrentSignalValue: (signalName: string) => {
                    const matchSignal = spec.signals?.find(signal => signal.name === signalName);
                    if (matchSignal) {
                        return view.signal(signalName);
                    } else {
                        return undefined;
                    }
                },
                destroy: async () => {
                    vegaInstance.view.finalize();
                },
            };
        });
        return instances;
    },
};

function recieveBatch(batch: Batch, renderer: Renderer, vegaInstance: VegaInstance) {
    const { spec, view } = vegaInstance;
    const doLog = renderer.signalBus.logLevel === LogLevel.all;
    doLog && renderer.signalBus.log(vegaInstance.id, 'recieveBatch', batch);
    let hasAnyChange = false;
    for (const signalName in batch) {
        const batchItem = batch[signalName];
        if (ignoredSignals.includes(signalName)) {
            doLog && renderer.signalBus.log(vegaInstance.id, 'ignoring reverved signal name', signalName, batchItem.value);
            continue;
        }
        if (batchItem.isData) {
            let logReason: string;
            if (!batchItem.value) {
                logReason = 'not updating data, no value';
            } else {
                const matchData = spec.data?.find(data => data.name === signalName);
                if (!matchData) {
                    logReason = 'not updating data, no match';
                } else {
                    logReason = 'updating data';
                    view.change(signalName, changeset().remove(() => true).insert(batchItem.value));
                    hasAnyChange = true;
                }
            }
            doLog && renderer.signalBus.log(vegaInstance.id, `(isData) ${logReason}`, signalName, batchItem.value);
        }
        let logReason = '';
        const matchSignal = spec.signals?.find(signal => signal.name === signalName);
        if (!matchSignal) {
            logReason = 'not updating signal, no match';
        } else {
            if ((matchSignal as NewSignal).update) {
                logReason = 'not updating signal, it is a calculation';
            } else {
                if (isSignalDataBridge(matchSignal)) {
                    logReason = 'not updating signal, data bridge';
                } else {
                    const oldValue = view.signal(signalName);
                    if (oldValue === batchItem.value) {
                        logReason = 'not updating signal, same value';
                    } else {
                        logReason = 'updating signal';
                        view.signal(signalName, batchItem.value);
                        hasAnyChange = true;
                    }
                }
            }
        }
        doLog && renderer.signalBus.log(vegaInstance.id, logReason, signalName, batchItem.value);
    }
    return hasAnyChange;
}

async function createSpecInit(container: Element, index: number, renderer: Renderer, errorHandler: ErrorHandler) {
    if (!container.textContent) {
        container.innerHTML = '<div class="error">Expected a spec object or a url</div>';
        return;
    }

    let result: Resolver;
    try {
        result = await resolveSpec(container.textContent);
    } catch (e) {
        container.innerHTML = `<div class="error">${e.toString()}</div>`;
        errorHandler(e, 'vega', index, 'resolve', container);
        return;
    }
    if (result.error) {
        container.innerHTML = `<div class="error">${result.error.toString()}</div>`;
        errorHandler(result.error, 'vega', index, 'resolve', container);
        return;
    }
    if (!result.spec) {
        container.innerHTML = '<div class="error">Expected a spec object</div>';
        return;
    }
    const { spec } = result;
    const initialSignals: PrioritizedSignal[] = spec.signals?.map((signal: InitSignal | NewSignal) => {
        if (ignoredSignals.includes(signal.name)) return;
        let isData = isSignalDataBridge(signal as NewSignal);
        //support legacy dataPrefix
        if (signal.name.startsWith(renderer.options.dataSignalPrefix)) {
            isData = true;
        }
        return {
            name: signal.name,
            value: signal.value,
            priority: signal.bind ? 1 : 0,
            isData,
        };
    }).filter(Boolean) || [];
    const specInit: SpecInit = { container, index, initialSignals, spec };
    return specInit;
}

async function createVegaInstance(specInit: SpecInit, renderer: Renderer, errorHandler: ErrorHandler) {
    const { container, index, initialSignals, spec } = specInit;
    const id = `vega-${index}`;

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
        view = new View(runtime, {
            container,
            renderer: renderer.options.vegaRenderer,
            logger: new VegaLogger(error => {
                errorHandler(error, 'vega', index, 'view', container);
            }),
        });
        view.run();

        //fix up initial signals
        for (const signal of initialSignals) {
            if (signal.isData) continue; //skip data signals
            const currentValue = view.signal(signal.name);
            if (currentValue !== signal.value) {
                renderer.signalBus.log(id, 're-setting initial signal', signal.name, signal.value, currentValue);
                signal.value = currentValue;
            }
        }

    } catch (e) {
        container.innerHTML = `<div class="error">${e.toString()}</div>`;
        errorHandler(e, 'vega', index, 'view', container);
        return;
    }

    //make a dataSignals array that is made of all the signals that are marked as isData, where the name is in the spec data
    const dataSignals = initialSignals.filter(signal => signal.isData && spec.data?.some(data => data.name === signal.name)).map(signal => signal.name);

    const instance: VegaInstance = { ...specInit, view, id, dataSignals };
    return instance;
}

function isSignalDataBridge(signal: NewSignal) {
    return signal.update === `data('${signal.name}')`;
}

function prioritizeSignalValues(specInits: SpecInit[]) {
    const highPrioritySignals = specInits.map(specInit => specInit.initialSignals.filter(signal => signal.priority > 0)).flat();
    for (const specInit of specInits) {
        for (const prioritySignal of highPrioritySignals) {
            const matchSignal = specInit.spec.signals?.find(signal => signal.name === prioritySignal.name);
            if (matchSignal && (matchSignal as NewSignal).value !== undefined && (matchSignal as NewSignal).value !== prioritySignal.value) {
                (matchSignal as NewSignal).value = prioritySignal.value;
            }
        }
    }
}

expressionFunction('urlParam', urlParam);

class VegaLogger implements LoggerInterface {
    private logLevel: number = 0;

    constructor(private errorHandler: (error: Error) => void) {
        this.error = this.error.bind(this);
        this.warn = this.warn.bind(this);
        this.info = this.info.bind(this);
        this.debug = this.debug.bind(this);
    }

    level(level: number): this;
    level(): number;
    level(level?: number): this | number {
        if (level === undefined) {
            return this.logLevel;
        }
        this.logLevel = level;
        return this;
    }

    error(...args: readonly any[]) {
        if (this.errorHandler) {
            this.errorHandler(args[0]);
        }
        if (this.logLevel >= 1) {
            console.error(...args);
        }
        return this;
    }

    warn(...args: readonly any[]) {
        if (this.logLevel >= 2) {
            console.warn(...args);
        }
        return this;
    }

    info(...args: readonly any[]) {
        if (this.logLevel >= 3) {
            console.info(...args);
        }
        return this;
    }

    debug(...args: readonly any[]) {
        if (this.logLevel >= 4) {
            console.debug(...args);
        }
        return this;
    }
}
