// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { BarChartScaleNames, BarChartSignalNames } from './constants';
import { colorBinCountSignal, colorReverseSignal, textSignals } from '../signals';
import { facetSignals } from '../facet';
import { Insight, SpecColumns, SpecViewOptions } from '../types';
import { ScaleNames, SignalNames } from '../constants';
import { Signal } from 'vega-typings';

export default function (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions): Signal[] {
    const signals = allTruthy<Signal>(
        textSignals(specViewOptions),
        [
            {
                "name": SignalNames.YDomain,
                "update": `domain('${ScaleNames.Y}')`
            },
            columns.x.quantitative && {
                "name": SignalNames.XBins,
                "value": 7,
                "bind": {
                    "name": specViewOptions.language.XBinSize,
                    "input": "range",
                    "min": 1,
                    "max": 20,
                    "step": 1
                }
            },
            {
                "name": BarChartSignalNames.compartmentWidthSignal,
                "update": `bandwidth('${columns.x.quantitative ? ScaleNames.X : BarChartScaleNames.bucketScale}')`
            },
            {
                "name": BarChartSignalNames.aspectRatioSignal,
                "update": `${BarChartSignalNames.compartmentWidthSignal}/height`
            },
            {
                "name": BarChartSignalNames.compartmentsPerLevelSignal,
                "update": `ceil(sqrt(${BarChartSignalNames.aspectRatioSignal}*${BarChartSignalNames.levelExtentSignal}[1]))`
            },
            colorBinCountSignal(specViewOptions),
            colorReverseSignal(specViewOptions)
        ],
        columns.facet && facetSignals(insight.facets, specViewOptions)
    );
    return signals;
}
