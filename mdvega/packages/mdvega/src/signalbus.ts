/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Datum } from 'vega';

interface SignalCallback {
    (name: string, value: string | null): void;
}

interface DataCallback {
    (name: string, value: unknown): void;
}

interface Listener {
    id: string;
    signalCallback: SignalCallback;
    dataCallback: DataCallback;
    hasSignal: (name: string) => boolean;
    hasData: (name: string) => boolean;
}

export enum LogLevel {
    none = 0,
    all = 1,
}

// Signal Bus to manage shared signals
export class SignalBus {
    public signalSources: string[];
    public signals: { [key: string]: unknown };
    public dataSources: string[];
    public data: { [key: string]: Datum[] | object };
    public listeners: Listener[];
    public broadcastingStack: boolean[];
    public directUpdateSignals: Set<unknown>;
    public logLevel: LogLevel;

    constructor(public dataSignalPrefix: string) {
        this.dataSources = [];
        this.data = {};
        this.signalSources = [];
        this.signals = {};
        this.listeners = [];
        this.broadcastingStack = [];
        this.directUpdateSignals = new Set();
        this.logLevel = LogLevel.none;
    }

    public log(message: string, ...optionalParams: unknown[]) {
        if (this.logLevel !== LogLevel.none) {
            console.log(`[Signal Bus] ${message}`, ...optionalParams);
        }
    }

    findSourceData(name: string, excludeId?: string) {
        for (let i = 0; i < this.dataSources.length; i++) {
            const id = this.dataSources[i];
            if (id === excludeId) continue;
            const scopedName = `${id}_${name}`;
            if (this.data[scopedName]) {
                const values = this.data[scopedName];
                return { id, values };
            }
        }
    }

    findSourceSignal(name: string, excludeId?: string) {
        for (let i = 0; i < this.signalSources.length; i++) {
            const id = this.signalSources[i];
            if (id === excludeId) continue;
            const scopedName = `${id}_${name}`;
            if (this.signals[scopedName]) {
                const value = this.signals[scopedName];
                return { id, value };
            }
        }
    }

    registerData(id: string, name: string, values: Datum[] | object) {
        const scopedName = `${id}_${name}`;
        if (!this.data[scopedName]) {
            if (!this.dataSources.includes(id)) {
                this.dataSources.push(id);
            }
            this.data[scopedName] = values;
            this.log(`Registered data: ${scopedName} with initial value:`, values);
        }
    }

    registerSignal(id: string, name: string, value: unknown) {
        const scopedName = `${id}_${name}`;
        if (!this.signals[scopedName]) {
            if (!this.signalSources.includes(id)) {
                this.signalSources.push(id);
            }
            this.signals[scopedName] = value;
            this.log(`Registered signal: ${scopedName} with initial value:`, value);
        }
    }

    broadcast(originId: string, name: string, value: unknown) {
        const scopedName = `${originId}_${name}`;
        if (this.directUpdateSignals.has(scopedName)) {
            this.log(`Ignoring direct update for signal: ${name} from ${originId}`);
            this.directUpdateSignals.delete(scopedName);
            return;
        }

        this.log(`Broadcasting signal: ${name} from ${originId} with value:`, value);
        this.startBroadcast();

        this.signals[scopedName] = value;

        // Notify other listeners if they have the signal defined and the value has changed
        this.listeners.forEach(listener => {
            const listenerScopedName = `${listener.id}_${name}`;
            if (listener.id !== originId) {
                if (listener.hasSignal(name)) {
                    if (this.signals[listenerScopedName] !== value) {
                        this.log(`Notifying listener: ${listener.id} with signal: ${name}, value:`, value);
                        listener.signalCallback(name, value ? value.toString() : null);
                    } else {
                        this.log(`Propagation snubbed for listener: ${listener.id}, signal: ${name}, value unchanged:`, value);
                    }
                } else {
                    this.log(`Listener ${listener.id} does not have signal: ${name}`);
                }
                if (listener.dataCallback && name.startsWith(this.dataSignalPrefix)) {
                    if (listener.hasData(name)) {
                        this.log(`Notifying listener: ${listener.id} with data: ${name}, value:`, value);
                        listener.dataCallback(name, value);
                    }
                }
            }
        });

        this.endBroadcast();
    }

    private startBroadcast() {
        this.broadcastingStack.push(true);
    }

    private endBroadcast() {
        this.broadcastingStack.pop();
    }

    isBroadcasting() {
        return this.broadcastingStack.length > 0;
    }

    registerListener(id: string, signalCallback: SignalCallback, hasSignal: (name: string) => boolean, dataCallback: DataCallback, hasData: (name: string) => boolean) {
        this.listeners.push({ id, signalCallback, hasSignal, dataCallback, hasData });
        this.log(`Registered listener for: ${id}`);
    }

    // updateSignalDirectly(id: string, name: string, value: string | null) {
    //     const scopedName = `${id}_${name}`;
    //     this.directUpdateSignals.add(scopedName);
    //     this.signals[scopedName] = value;
    //     /////////////////////////////////////////////////////////////////////////////////////////////////////this.updateKeyValue(name, value);
    //     this.log(`Directly updating signal: ${name} for ${id} with value:`, value);
    // }


    // Function to reset signal listeners
    resetSignalListeners() {
        this.signalSources = [];
        this.listeners = [];
        this.signals = {};
        this.log('Signal listeners and signals have been reset.');
    }
}
