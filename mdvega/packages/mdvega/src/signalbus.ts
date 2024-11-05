/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

interface SignalCallback {
    (name: string, value: unknown): Promise<void>;
}

interface DataCallback {
    (name: string, value: unknown): Promise<void>;
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
    public signalValues: { [key: string]: unknown };
    public dataSources: string[];
    public listeners: Listener[];
    public broadcastingStack: boolean[];
    public logLevel: LogLevel;
    public logWatchIds: string[];

    constructor(public dataSignalPrefix: string) {
        this.dataSources = [];
        this.signalSources = [];
        this.signalValues = {};
        this.listeners = [];
        this.broadcastingStack = [];
        this.logLevel = LogLevel.none;
        this.logWatchIds = [];
    }

    public log(id: string, message: string, ...optionalParams: unknown[]) {
        if (this.logLevel === LogLevel.none) return;
        if (this.logWatchIds.length > 0 && !this.logWatchIds.includes(id)) return;
        console.log(`[Signal Bus][${id}] ${message}`, ...optionalParams);
    }

    findSourceSignal(name: string, excludeId?: string) {
        for (let i = 0; i < this.signalSources.length; i++) {
            const id = this.signalSources[i];
            if (id === excludeId) continue;
            const scopedName = this.getScopedName(id, name);
            if (scopedName in this.signalValues) {
                const value = this.signalValues[scopedName];
                return { id, value };
            }
        }
    }

    getState() {
        const state: { [key: string]: unknown } = {};
        for (const id of this.signalSources) {
            for (const key of Object.keys(this.signalValues)) {
                if (key.startsWith(`${id}_`)) {
                    const signalName = key.substring(id.length + 1);
                    state[signalName] = this.signalValues[key];
                }
            }
        }
        return state;
    }

    async setState(state: { [key: string]: unknown }) {
        for (const key of Object.keys(state)) {
            const source = this.findSourceSignal(key);
            if (source) {
                await this.narrowcast(source.id, key, state[key]);
            }
        }
    }

    async narrowcast(originId: string, name: string, value: unknown) {
        const originalListeners = this.listeners.filter(l => l.id === originId);
        const scopedName = this.getScopedName(originId, name);
        for (const listener of originalListeners) {
            if (listener.hasSignal(name)) {
                if (this.signalValues[scopedName] !== value) {
                    this.log(listener.id, `Notifying original listener with signal: ${name}, value:`, value);
                    await listener.signalCallback(name, value);
                    this.signalValues[scopedName] = value;
                } else {
                    this.log(listener.id, `Propagation snubbed for original listener, signal: ${name}, value unchanged:`, value);
                }
            } else {
                this.log(listener.id, `original Listener does not have signal: ${name}`);
            }
            if (listener.dataCallback && name.startsWith(this.dataSignalPrefix)) {
                if (listener.hasData(name)) {
                    this.log(listener.id, `Notifying original listener with data: ${name}, value:`, value);
                    await listener.dataCallback(name, value);
                }
            }
        }
    }

    registerSourceSignal(id: string, name: string, value: unknown) {
        const scopedName = this.getScopedName(id, name);
        if (!this.signalValues[scopedName]) {
            if (!this.signalSources.includes(id)) {
                this.signalSources.push(id);
            }
            this.signalValues[scopedName] = value;
            this.log(id, `Sourced signal: ${scopedName} with initial value:`, value);
        }
    }

    async broadcast(originId: string, name: string, value: unknown) {
        const scopedName = this.getScopedName(originId, name);

        this.log(originId, `Broadcasting signal: ${name} from ${originId} with value:`, value);
        this.startBroadcast();

        this.signalValues[scopedName] = value;

        // Notify other listeners if they have the signal defined and the value has changed
        const otherListeners = this.listeners.filter(l => l.id !== originId);
        for (const listener of otherListeners) {
            const listenerScopedName = this.getScopedName(listener.id, name);
            if (listener.hasSignal(name)) {
                if (this.signalValues[listenerScopedName] !== value) {
                    this.log(listener.id, `Notifying listener with signal: ${name}, value:`, value);
                    await listener.signalCallback(name, value);
                } else {
                    this.log(listener.id, `Propagation snubbed for listener, signal: ${name}, value unchanged:`, value);
                }
            } else {
                this.log(listener.id, `Listener does not have signal: ${name}`);
            }
            if (listener.dataCallback && name.startsWith(this.dataSignalPrefix)) {
                if (listener.hasData(name)) {
                    this.log(listener.id, `Notifying listener with data: ${name}, value:`, value);
                    await listener.dataCallback(name, value);
                }
            }
        }

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
        this.log(id, 'Listening');
    }

    // Function to reset signal listeners
    resetSignalListeners() {
        this.signalSources = [];
        this.listeners = [];
        this.signalValues = {};
        this.log('', 'Signal listeners and signals have been reset.');
    }

    getScopedName(id: string, name: string) {
        return `${id}_${name}`;
    }

}
