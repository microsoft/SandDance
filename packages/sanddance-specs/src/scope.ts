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
    Transforms,
} from 'vega-typings';

export function addAxes(scope: Scope, ...axes: Axis[]) {
    if (!axes || !axes.length) return;
    if (!scope.axes) scope.axes = [];
    scope.axes.push(...axes.filter(Boolean));
}

export function addData(scope: Scope, ...datas: Data[]) {
    if (!datas || !datas.length) return;
    if (!scope.data) scope.data = [];
    scope.data.push(...datas.filter(Boolean));
}

export function addMarks(scope: Scope, ...marks: Mark[]) {
    if (!marks || !marks.length) return;
    if (!scope.marks) scope.marks = [];
    scope.marks.push(...marks.filter(Boolean));
}

export function addScales(scope: Scope, ...scales: Scale[]) {
    if (!scales || !scales.length) return;
    if (!scope.scales) scope.scales = [];
    scope.scales.push(...scales.filter(Boolean));
}

export function addSignals(scope: Scope, ...signals: Signal[]) {
    if (!signals || !signals.length) return;
    if (!scope.signals) scope.signals = [];
    scope.signals.push(...signals.filter(Boolean));
}

export function addTransforms(data: Data, ...transforms: Transforms[]) {
    if (!transforms || !transforms.length) return;
    if (!data.transform) data.transform = [];
    data.transform.push(...transforms.filter(Boolean));
}

export function getDataByName(data: Data[], dataName: string) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].name === dataName) return { data: data[i], index: i };
    }
}

export function getGroupBy(groupings: Grouping[]) {
    const groupby = groupings.map(g => g.groupby);
    return groupby.reduce((acc, val) => acc.concat(val), []);
}

export function addOffsets(...offsets: string[]) {
    return offsets.filter(Boolean).join(' + ');
}
