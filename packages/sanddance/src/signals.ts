// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { NewSignal, Spec, View } from 'vega-typings';
import { SignalValues } from '@msrvida/sanddance-specs';

export function applySignalValues(sv: SignalValues, b: Spec) {
    if (!sv || !b || !b.signals || !b.signals.length) return;
    for (const key in sv) {
        const value = sv[key];
        const signalB = b.signals.filter(signal => signal.name === key)[0] as NewSignal;
        if (signalB && signalB.bind) {
            signalB.value = value;
        }
    }
}

export function extractSignalValuesFromView(view: View, spec: Spec) {
    if (!view || !spec || !spec.signals || !spec.signals.length) return;
    const result: SignalValues = {};
    spec.signals.forEach((signalA: NewSignal) => {
        //bound to a UI control
        if (signalA.bind) {
            try {
                result[signalA.name] = view.signal(signalA.name);
            }
            catch (e) {
                // continue regardless of error
            }
        }
    });
    return result;
}
