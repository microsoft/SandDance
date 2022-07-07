/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { NewSignal } from 'vega-typings/types';
import { SignalNames } from './constants';
import { debounce } from './defaults';
import { SpecContext } from './types';

export const defaultZProportion = 0.6;

export function textSignals(context: SpecContext, heightSignal: string) {
    const { specViewOptions } = context;
    const signals: NewSignal[] = [
        {
            name: SignalNames.ZProportion,
            value: defaultZProportion,
            bind: {
                name: specViewOptions.language.zScaleProportion,
                debounce,
                input: 'range',
                min: 0.1,
                max: 2,
                step: 0.1,
            },
        },
        {
            name: SignalNames.ZHeight,
            update: `${heightSignal} * ${SignalNames.ZProportion}`,
        },
        {
            name: SignalNames.TextScale,
            value: 1.2,
            bind: {
                name: specViewOptions.language.textScaleSignal,
                debounce,
                input: 'range',
                min: 0.5,
                max: 2,
                step: 0.1,
            },
        },
        {
            name: SignalNames.TextSize,
            update: `${SignalNames.TextScale} * 10`,
        },
        {
            name: SignalNames.TextTitleSize,
            update: `${SignalNames.TextScale} * 15`,
        },
        {
            name: SignalNames.TextAngleX,
            value: 30,
            bind: {
                name: specViewOptions.language.xAxisTextAngleSignal,
                debounce,
                input: 'range',
                min: 0,
                max: 90,
                step: 1,
            },
        },
        {
            name: SignalNames.TextAngleY,
            value: 0,
            bind: {
                name: specViewOptions.language.yAxisTextAngleSignal,
                debounce,
                input: 'range',
                min: -90,
                max: 0,
                step: 1,
            },
        },
        {
            name: SignalNames.MarkOpacity,
            value: 1,
            bind: {
                name: specViewOptions.language.markOpacitySignal,
                debounce,
                input: 'range',
                min: 0.1,
                max: 1,
                step: 0.05,
            },
        },
    ];
    return signals;
}

export function colorBinCountSignal(context: SpecContext) {
    const { specViewOptions } = context;
    const signal: NewSignal = {
        name: SignalNames.ColorBinCount,
        value: 7,
        bind: {
            name: specViewOptions.language.colorBinCount,
            debounce,
            input: 'range',
            min: 1,
            max: specViewOptions.maxLegends + 1,
            step: 1,
        },
    };
    return signal;
}

export function colorReverseSignal(context: SpecContext) {
    const { specViewOptions } = context;
    const signal: NewSignal = {
        name: SignalNames.ColorReverse,
        value: false,
        bind: {
            name: specViewOptions.language.colorReverse,
            input: 'checkbox',
        },
    };
    return signal;
}

export function modifySignal(s: NewSignal, fn: string, update: string) {
    s.update = `${fn}((${s.update}), (${update}))`;
}
