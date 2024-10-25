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

    constructor(public dataSignalPrefix: string) {
        this.dataSources = [];
        this.signalSources = [];
        this.signalValues = {};
        this.listeners = [];
        this.broadcastingStack = [];
        this.logLevel = LogLevel.none;
    }

    public log(message: string, ...optionalParams: unknown[]) {
        if (this.logLevel !== LogLevel.none) {
            console.log(`[Signal Bus] ${message}`, ...optionalParams);
        }
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
        this.signalSources.forEach(id => {
            Object.keys(this.signalValues).forEach(key => {
                if (key.startsWith(`${id}_`)) {
                    const signalName = key.substring(id.length + 1);
                    state[signalName] = this.signalValues[key];
                }
            });
        });
        return state;
    }

    async setState(state: { [key: string]: unknown }) {
        Object.keys(state).forEach(async key => {
            const source = this.findSourceSignal(key);
            if (source) {
                await this.narrowcast(source.id, key, state[key]);
            }
        });
    }

    async narrowcast(originId: string, name: string, value: unknown) {
        const originalListeners = this.listeners.filter(l => l.id === originId);
        const scopedName = this.getScopedName(originId, name);
        originalListeners.forEach(async listener => {
            if (listener.hasSignal(name)) {
                if (this.signalValues[scopedName] !== value) {
                    this.log(`Notifying original listener: ${listener.id} with signal: ${name}, value:`, value);
                    await listener.signalCallback(name, value);
                    this.signalValues[scopedName] = value;
                } else {
                    this.log(`Propagation snubbed for original listener: ${listener.id}, signal: ${name}, value unchanged:`, value);
                }
            } else {
                this.log(`original Listener ${listener.id} does not have signal: ${name}`);
            }
            if (listener.dataCallback && name.startsWith(this.dataSignalPrefix)) {
                if (listener.hasData(name)) {
                    this.log(`Notifying original listener: ${listener.id} with data: ${name}, value:`, value);
                    await listener.dataCallback(name, value);
                }
            }
        });
    }

    registerSourceSignal(id: string, name: string, value: unknown) {
        const scopedName = this.getScopedName(id, name);
        if (!this.signalValues[scopedName]) {
            if (!this.signalSources.includes(id)) {
                this.signalSources.push(id);
            }
            this.signalValues[scopedName] = value;
            this.log(`Registered signal: ${scopedName} with initial value:`, value);
        }
    }

    async broadcast(originId: string, name: string, value: unknown) {
        const scopedName = this.getScopedName(originId, name);

        this.log(`Broadcasting signal: ${name} from ${originId} with value:`, value);
        this.startBroadcast();

        this.signalValues[scopedName] = value;

        // Notify other listeners if they have the signal defined and the value has changed
        const otherListeners = this.listeners.filter(l => l.id !== originId);
        otherListeners.forEach(async listener => {
            const listenerScopedName = this.getScopedName(listener.id, name);
            if (listener.hasSignal(name)) {
                if (this.signalValues[listenerScopedName] !== value) {
                    this.log(`Notifying listener: ${listener.id} with signal: ${name}, value:`, value);
                    await listener.signalCallback(name, value);
                } else {
                    this.log(`Propagation snubbed for listener: ${listener.id}, signal: ${name}, value unchanged:`, value);
                }
            } else {
                this.log(`Listener ${listener.id} does not have signal: ${name}`);
            }
            if (listener.dataCallback && name.startsWith(this.dataSignalPrefix)) {
                if (listener.hasData(name)) {
                    this.log(`Notifying listener: ${listener.id} with data: ${name}, value:`, value);
                    await listener.dataCallback(name, value);
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

    // Function to reset signal listeners
    resetSignalListeners() {
        this.signalSources = [];
        this.listeners = [];
        this.signalValues = {};
        this.log('Signal listeners and signals have been reset.');
    }

    getScopedName(id: string, name: string) {
        return `${id}_${name}`;
    }

}
