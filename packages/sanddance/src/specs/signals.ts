// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SignalNames } from './constants';
import { NewSignal } from 'vega-typings/types';
import { SpecViewOptions } from './types';

export function textSignals(specViewOptions: SpecViewOptions) {
    const signals: NewSignal[] = [
        {
            "name": SignalNames.ZProportionSignal,
            "value": 0.6,
            "bind": {
                "name": specViewOptions.language.zScaleProportion,
                "debounce": 50,
                "input": "range",
                "min": 0.2,
                "max": 2,
                "step": 0.1
            }
        },
        {
            "name": SignalNames.ZHeightSignal,
            "update": `height * ${SignalNames.ZProportionSignal}`
        },
        {
            "name": SignalNames.TextScaleSignal,
            "value": 2,
            "bind": {
                "name": specViewOptions.language.textScaleSignal,
                "debounce": 50,
                "input": "range",
                "min": 1,
                "max": 5,
                "step": 0.5
            }
        },
        {
            "name": SignalNames.TextSizeSignal,
            "update": `${SignalNames.TextScaleSignal} * 10`
        },
        {
            "name": SignalNames.TitleTextSizeSignal,
            "update": `${SignalNames.TextScaleSignal} * 15`
        },
        {
            "name": SignalNames.TextAngleXSignal,
            "value": 30,
            "bind": {
                "name": specViewOptions.language.xAxisTextAngleSignal,
                "debounce": 50,
                "input": "range",
                "min": 0,
                "max": 90,
                "step": 1
            }
        },
        {
            "name": SignalNames.TextAngleYSignal,
            "value": 0,
            "bind": {
                "name": specViewOptions.language.yAxisTextAngleSignal,
                "debounce": 50,
                "input": "range",
                "min": -90,
                "max": 0,
                "step": 1
            }
        }
    ];
    return signals;
}

export function colorBinCountSignal(specViewOptions: SpecViewOptions) {
    const signal: NewSignal = {
        "name": SignalNames.ColorBinCountSignal,
        "value": 7,
        "bind": {
            "name": specViewOptions.language.colorBinCount,
            "input": "range",
            "min": 1,
            "max": specViewOptions.maxLegends + 1,
            "step": 1
        }
    };
    return signal;
}

export function colorReverseSignal(specViewOptions: SpecViewOptions) {
    const signal: NewSignal = {
        "name": SignalNames.ColorReverseSignal,
        "value": false,
        "bind": {
            "name": specViewOptions.language.colorReverse,
            "input": "checkbox"
        }
    };
    return signal;
}