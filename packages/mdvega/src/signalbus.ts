/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Batch, IInstance } from "./factory";

export enum LogLevel {
    none = 0,
    some = 1,
    all = 2,
}

// Signal Bus to manage shared signals
export class SignalBus {
    public broadcastingStack: string[];
    public logLevel: LogLevel;
    public logWatchIds: string[];
    public active: boolean;
    public peers: IInstance[];
    public signalDeps: { [signalName: string]: { value: unknown; priority: number; initialPriorityId: string; isData: boolean; deps: IInstance[]; } };
    public peerDependencies: { [peerId: string]: string[] };

    constructor(public dataSignalPrefix: string) {
        this.logLevel = LogLevel.none;
        this.logWatchIds = [];
        this.reset();
    }

    public log(id: string, message: string, ...optionalParams: unknown[]) {
        if (this.logLevel === LogLevel.none) return;
        if (this.logWatchIds.length > 0 && !this.logWatchIds.includes(id)) return;
        console.log(`[Signal Bus][${id}] ${message}`, ...optionalParams);
    }

    async broadcast(originId: string, batch: Batch) {
        //TODO handle multiple broadcasts

        //TODO handle circular dependencies

        if (this.broadcastingStack.includes(originId)) {
            this.log(originId, 'Additional broadcast from', originId, this.broadcastingStack.join(' -> '));
            //return;
        }

        this.log(originId, 'Broadcasting batch from', originId, batch);
        this.broadcastingStack.push(originId);
        for (const peerId of this.peerDependencies[originId]) {
            const peer = this.peers.find(p => p.id === peerId);

            //create a new batch with the signals that the peer is interested in
            const peerBatch: Batch = {};
            let hasBatch = false;
            for (const signalName in batch) {
                if (
                    peer.initialSignals.some(s => s.name === signalName)
                    && batch[signalName].value !== this.signalDeps[signalName].value
                ) {
                    peerBatch[signalName] = batch[signalName];
                    hasBatch = true;
                }
            }

            if (!hasBatch) continue;
            peer.recieveBatch && await peer.recieveBatch(peerBatch, originId);
        }
        this.broadcastingStack.pop();

        //set current values
        for (const signalName in batch) {
            const signalDep = this.signalDeps[signalName];
            signalDep.value = batch[signalName].value;
        }

        if (this.broadcastingStack.length === 0) {
            //broadcast complete
            for (const peer of this.peers) {
                peer.broadcastComplete && await peer.broadcastComplete();
            }
        }
    }

    getPriorityPeer(signalName: string) {
        const signalDep = this.signalDeps[signalName];
        if (!signalDep) return null;
        return this.peers.find(p => p.id === signalDep.initialPriorityId);
    }

    registerPeer(peer: IInstance) {
        this.peers.push(peer);
        for (const initialSignal of peer.initialSignals) {
            if (!(initialSignal.name in this.signalDeps)) {
                //first encounter with this signal
                this.signalDeps[initialSignal.name] = {
                    deps: [peer],
                    priority: initialSignal.priority,
                    initialPriorityId: peer.id,
                    value: initialSignal.value,
                    isData: initialSignal.isData,
                };
            } else {
                //signal exists, add the peer to the deps and check to override the priority
                const signalDep = this.signalDeps[initialSignal.name];
                if (!signalDep.deps.includes(peer)) {
                    signalDep.deps.push(peer);
                }
                if (initialSignal.priority > signalDep.priority) {
                    signalDep.priority = initialSignal.priority;
                    signalDep.initialPriorityId = peer.id;
                    signalDep.value = initialSignal.value;
                    signalDep.isData = initialSignal.isData;
                }
            }
        }
    }

    beginListening() {
        //set the initial batch on each peer
        this.log('beginListening', 'begin initial batch', this.signalDeps);

        for (const peer of this.peers) {
            const batch: Batch = {};
            for (const signalName in this.signalDeps) {
                const signalDep = this.signalDeps[signalName];
                const { value, isData } = signalDep;
                batch[signalName] = { value, isData };
            }
            peer.recieveBatch && peer.recieveBatch(batch, 'initial');
        }

        this.log('beginListening', 'end initial batch');

        //for all signalDeps, compile a list of signals for each peer depending on the signal
        const peerSignals: { [peerId: string]: { signalName: string, isData: boolean }[] } = {};

        for (const signalName in this.signalDeps) {
            const signalDep = this.signalDeps[signalName];
            if (signalDep.deps.length === 1) continue; // No need to share signals if only one peer depends on it

            for (const peer of signalDep.deps) {
                if (!(peer.id in peerSignals)) {
                    peerSignals[peer.id] = [];
                    this.peerDependencies[peer.id] = [];
                }
                peerSignals[peer.id].push({ signalName, isData: signalDep.isData });

                // Add other peers sharing this signal to the dependencies map
                for (const otherPeer of signalDep.deps) {
                    if (otherPeer.id !== peer.id && !this.peerDependencies[peer.id].includes(otherPeer.id)) {
                        this.peerDependencies[peer.id].push(otherPeer.id);
                    }
                }
            }
        }

        this.log('beginListening', '======= dependencies =========', peerSignals, this.peerDependencies);

        // Begin listening and logging the shared dependencies
        for (const peer of this.peers) {
            const sharedSignals = peerSignals[peer.id];
            if (sharedSignals) {
                this.log(peer.id, 'Shared signals:', sharedSignals);
                if (this.peerDependencies[peer.id]) {
                    this.log(peer.id, 'Shared dependencies:', this.peerDependencies[peer.id]);
                }
                peer.beginListening && peer.beginListening(sharedSignals);
            } else {
                this.log(peer.id, 'No shared signals');
            }
        }

        this.active = true;
    }

    reset() {
        this.signalDeps = {};
        this.active = false;
        this.peers = [];
        this.broadcastingStack = [];
        this.peerDependencies = {};
    }

}
