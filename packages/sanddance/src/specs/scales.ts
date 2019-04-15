// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ColorBinCountSignal, ColorScaleName, ColorScaleNone } from './constants';
import { ColorBin } from './types';
import {
    LinearScale,
    PointScale,
    QuantileScale,
    QuantizeScale,
    RangeBand,
    RangeScheme,
    ScaleData,
    SequentialScale
} from 'vega-typings';

export function linearScale(name: string, data: string, field: string, range: RangeScheme, reverse: boolean, zero: boolean) {
    const scale: LinearScale = {
        name,
        "type": "linear",
        range,
        "round": true,
        reverse,
        "domain": {
            data,
            field
        },
        zero,
        "nice": true
    };
    return scale;
}

export function pointScale(name: string, data: string, range: RangeBand, field: string) {
    const scale: PointScale = {
        name,
        "type": "point",
        range,
        "domain": {
            data,
            field
        },
        "padding": 0.5
    };
    return scale;
}

export function binnableColorScale(colorBin: ColorBin, data: string, field: string, scheme?: string) {
    scheme = scheme || ColorScaleNone;
    const name = ColorScaleName;
    const domain: ScaleData = {
        data,
        field
    };
    const range: RangeScheme = {
        scheme
    };
    if (colorBin !== 'continuous') {
        range.count = { signal: ColorBinCountSignal };
    }
    switch (colorBin) {
        case 'continuous':
            const sequentialScale: SequentialScale = {
                name,
                "type": "sequential",
                domain,
                range
            };
            return sequentialScale;

        case 'quantile':
            const quantileScale: QuantileScale = {
                name,
                "type": "quantile",
                domain,
                range
            };
            return quantileScale;

        default:
            const quantizeScale: QuantizeScale = {
                name,
                "type": "quantize",
                domain,
                range
            };
            return quantizeScale;
    }
}
