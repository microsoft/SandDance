// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Axis, Scope, Scale, Signal, Data, Mark, Transforms } from 'vega-typings';

export function addAxes(scope: Scope, ...axis: Axis[]) {
    if (!scope.axes) {
        scope.axes = [];
    }
    scope.axes.push(...axis);
}

export function addData(scope: Scope, ...data: Data[]) {
    if (!scope.data) {
        scope.data = [];
    }
    scope.data.push(...data);
}

export function addMarks(scope: Scope, ...marks: Mark[]) {
    if (!scope.marks) {
        scope.marks = [];
    }
    scope.marks.push(...marks);
}

export function addScale(scope: Scope, ...scale: Scale[]) {
    if (!scope.scales) {
        scope.scales = [];
    }
    scope.scales.push(...scale);
}

export function addSignal(scope: Scope, ...signal: Signal[]) {
    if (!scope.signals) {
        scope.signals = [];
    }
    scope.signals.push(...signal);
}

export function addTransforms(data: Data, ...transforms: Transforms[]) {
    if (!data.transform) {
        data.transform = [];
    }
    data.transform.push(...transforms);
}

export function getDataByName(data: Data[], dataName: string): Data {
    for (let i = 0; i < data.length; i++) {
        if (data[i].name === dataName) return data[i];
    }
}
