/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

interface Callback {
    (name: string, value: string | null): void;
}

interface Listener {
    id: string;
    callback: Callback;
    hasSignal: (name: string) => boolean;
}

export enum LogLevel {
    none = 0,
    all = 1,
}

// Signal Bus to manage shared signals
export class SignalBus {
    public signals: { [key: string]: unknown };
    public listeners: Listener[];
    public broadcastingStack: boolean[];
    public directUpdateSignals: Set<unknown>;
    public logLevel: LogLevel;

    constructor() {
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

    registerSignal(id: string, name: string, value: unknown) {
        const scopedName = `${id}_${name}`;
        if (!this.signals[scopedName]) {
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
                        listener.callback(name, value ? value.toString() : null);
                    } else {
                        this.log(`Propagation snubbed for listener: ${listener.id}, signal: ${name}, value unchanged:`, value);
                    }
                } else {
                    this.log(`Listener ${listener.id} does not have signal: ${name}`);
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

    registerListener(id: string, callback: Callback, hasSignal: (name: string) => boolean) {
        this.listeners.push({ id, callback, hasSignal });
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
        this.listeners = [];
        this.signals = {};
        this.log('Signal listeners and signals have been reset.');
    }
}