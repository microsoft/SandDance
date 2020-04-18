// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Grouping } from './interfaces';
import {
    Axis,
    Data,
    Mark,
    Scale,
    Scope,
    Signal,
    Transforms
} from 'vega-typings';

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

export function getDataByName(data: Data[], dataName: string) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].name === dataName) return { data: data[i], index: i };
    }
}

export function getGroupBy(groupings: Grouping[]) {
    const groupby = groupings.map(g => g.groupby);
    return groupby.reduce((acc, val) => acc.concat(val), [])
}

export function addOffsets(...offsets: string[]) {
    return offsets.filter(Boolean).join(' + ');
}
