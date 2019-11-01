// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { BarChartScaleNames, BarChartSignalNames } from '../constants';
import { colorBinCountSignal, colorReverseSignal, textSignals } from '../signals';
import { facetSignals } from '../facet';
import { ScaleNames, SignalNames } from '../constants';
import { Signal } from 'vega-typings';
import { SpecContext } from '../types';

export default function (context: SpecContext): Signal[] {
    const { specColumns, specViewOptions } = context;
    const signals = allTruthy<Signal>(
        textSignals(context),
        [
            {
                name: SignalNames.YDomain,
                update: `domain('${ScaleNames.Y}')`
            },
            specColumns.x.quantitative && {
                name: SignalNames.XBins,
                value: 7,
                bind: {
                    name: specViewOptions.language.XBinSize,
                    input: 'range',
                    min: 1,
                    max: 20,
                    step: 1
                }
            },
            {
                name: BarChartSignalNames.compartmentWidthSignal,
                update: `bandwidth('${specColumns.x.quantitative ? ScaleNames.X : BarChartScaleNames.bucketScale}')`
            },
            {
                name: BarChartSignalNames.aspectRatioSignal,
                update: `${BarChartSignalNames.compartmentWidthSignal}/height`
            },
            {
                name: BarChartSignalNames.compartmentsPerLevelSignal,
                update: `ceil(sqrt(${BarChartSignalNames.aspectRatioSignal}*${BarChartSignalNames.levelExtentSignal}[1]))`
            },
            colorBinCountSignal(context),
            colorReverseSignal(context)
        ],
        specColumns.facet && facetSignals(context)
    );
    return signals;
}
