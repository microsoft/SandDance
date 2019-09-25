// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { BarChartScaleNames, BarChartSignalNames } from './constants';
import { colorBinCountSignal, colorReverseSignal, textSignals } from '../signals';
import { facetSignals } from '../facet';
import { ScaleNames, SignalNames } from '../constants';
import { Signal } from 'vega-typings';
import { SpecContext } from '../types';

export default function (context: SpecContext): Signal[] {
    const { columns, specViewOptions } = context;
    const signals = allTruthy<Signal>(
        textSignals(context),
        [
            {
                "name": SignalNames.XDomain,
                "update": `domain('${ScaleNames.X}')`
            },
            columns.y.quantitative && {
                "name": SignalNames.YBins,
                "value": 7,
                "bind": {
                    "name": specViewOptions.language.YBinSize,
                    "input": "range",
                    "min": 1,
                    "max": 20,
                    "step": 1
                }
            },
            {
                "name": BarChartSignalNames.compartmentHeightSignal,
                "update": `bandwidth('${columns.y.quantitative ? ScaleNames.Y : BarChartScaleNames.bucketScale}')`
            },
            {
                "name": BarChartSignalNames.aspectRatioSignal,
                "update": `${BarChartSignalNames.compartmentHeightSignal}/width`
            },
            {
                "name": BarChartSignalNames.compartmentsPerLevelSignal,
                "update": `ceil(sqrt(${BarChartSignalNames.aspectRatioSignal}*${BarChartSignalNames.levelExtentSignal}[1]))`
            },
            colorBinCountSignal(context),
            colorReverseSignal(context)
        ],
        columns.facet && facetSignals(context)
    );
    return signals;
}
