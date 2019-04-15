// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    ColorBinCountSignal,
    TextAngleXSignal,
    TextAngleYSignal,
    TextScaleSignal,
    TextSizeSignal,
    TitleTextSizeSignal,
    ZHeightSignal,
    ZProportionSignal
} from './constants';
import { NewSignal } from 'vega-typings/types';
import { SpecViewOptions } from './types';

export function textSignals(specViewOptions: SpecViewOptions) {
    const signals: NewSignal[] = [
        {
            "name": ZProportionSignal,
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
            "name": ZHeightSignal,
            "update": `height * ${ZProportionSignal}`
        },
        {
            "name": TextScaleSignal,
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
            "name": TextSizeSignal,
            "update": `${TextScaleSignal} * 10`
        },
        {
            "name": TitleTextSizeSignal,
            "update": `${TextScaleSignal} * 15`
        },
        {
            "name": TextAngleXSignal,
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
            "name": TextAngleYSignal,
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
        "name": ColorBinCountSignal,
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