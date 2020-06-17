// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ColorScaleNone, SignalNames } from './constants';
import { safeFieldName } from './expr';
import { ColorBin } from './types';
import {
    LinearScale,
    PointScale,
    QuantileScale,
    QuantizeScale,
    RangeBand,
    RangeScheme,
    ScaleData,
    SignalRef
} from 'vega-typings';

export function linearScale(scaleName: string, data: string, field: string, range: RangeScheme, reverse: boolean, zero: boolean) {
    const scale: LinearScale = {
        name: scaleName,
        type: 'linear',
        range,
        round: true,
        reverse,
        domain: {
            data,
            field: safeFieldName(field)
        },
        zero,
        nice: true
    };
    return scale;
}

export function pointScale(scaleName: string, data: string, range: RangeBand, field: string, reverse?: boolean) {
    const scale: PointScale = {
        name: scaleName,
        type: 'point',
        range,
        domain: {
            data,
            field: safeFieldName(field),
            sort: true
        },
        padding: 0.5
    };
    if (reverse !== undefined) {
        scale.reverse = reverse;
    }
    return scale;
}

export function binnableColorScale(scaleName: string, colorBin: ColorBin, data: string, field: string, scheme?: string) {
    scheme = scheme || ColorScaleNone;
    const domain: ScaleData = {
        data,
        field: safeFieldName(field)
    };
    const range: RangeScheme = {
        scheme
    };
    const reverse: SignalRef = { signal: SignalNames.ColorReverse };
    if (colorBin !== 'continuous') {
        range.count = { signal: SignalNames.ColorBinCount };
    }
    switch (colorBin) {
        case 'continuous': {
            const sequentialScale: LinearScale = {
                name: scaleName,
                type: 'linear',
                domain,
                range,
                reverse
            };
            return sequentialScale;
        }
        case 'quantile': {
            const quantileScale: QuantileScale = {
                name: scaleName,
                type: 'quantile',
                domain,
                range,
                reverse
            };
            return quantileScale;
        }
        default: {
            const quantizeScale: QuantizeScale = {
                name: scaleName,
                type: 'quantize',
                domain,
                range,
                reverse
            };
            return quantizeScale;
        }
    }
}
