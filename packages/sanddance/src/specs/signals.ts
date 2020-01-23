// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { NewSignal } from 'vega-typings/types';
import { SignalNames } from './constants';
import { SpecContext } from './types';

export const defaultZProportion = 0.6;

export function textSignals(context: SpecContext, heightSignal = 'height') {
    const { specViewOptions } = context;
    const signals: NewSignal[] = [
        {
            name: SignalNames.ZProportion,
            value: defaultZProportion,
            bind: {
                name: specViewOptions.language.zScaleProportion,
                debounce: 50,
                input: 'range',
                min: 0.2,
                max: 2,
                step: 0.1
            }
        },
        {
            name: SignalNames.ZHeight,
            update: `${heightSignal} * ${SignalNames.ZProportion}`
        },
        {
            name: SignalNames.TextScale,
            value: 2,
            bind: {
                name: specViewOptions.language.textScaleSignal,
                debounce: 50,
                input: 'range',
                min: 1,
                max: 5,
                step: 0.5
            }
        },
        {
            name: SignalNames.TextSize,
            update: `${SignalNames.TextScale} * 10`
        },
        {
            name: SignalNames.TextTitleSize,
            update: `${SignalNames.TextScale} * 15`
        },
        {
            name: SignalNames.TextAngleX,
            value: 30,
            bind: {
                name: specViewOptions.language.xAxisTextAngleSignal,
                debounce: 50,
                input: 'range',
                min: 0,
                max: 90,
                step: 1
            }
        },
        {
            name: SignalNames.TextAngleY,
            value: 0,
            bind: {
                name: specViewOptions.language.yAxisTextAngleSignal,
                debounce: 50,
                input: 'range',
                min: -90,
                max: 0,
                step: 1
            }
        },
        {
            name: SignalNames.MarkOpacity,
            value: 1,
            bind: {
                name: specViewOptions.language.markOpacitySignal,
                debounce: 50,
                input: 'range',
                min: 0.1,
                max: 1,
                step: 0.05
            }
        }
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
            input: 'range',
            min: 1,
            max: specViewOptions.maxLegends + 1,
            step: 1
        }
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
            input: 'checkbox'
        }
    };
    return signal;
}