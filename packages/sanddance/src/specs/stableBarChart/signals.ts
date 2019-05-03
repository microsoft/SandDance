// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
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
                "name": "xdesbandwidth",
                "update": `bandwidth('${ScaleNames.X}')`
            },
            {
                "name": "binAspect",
                "update": "xdesbandwidth/height"
            },
            {
                "name": "shapesPerRow",
                "update": "ceil(sqrt(binAspect*xtent[1]))"
            },
            colorBinCountSignal(specViewOptions),
            colorReverseSignal(specViewOptions)
        ],
        columns.facet && facetSignals(insight.facets, specViewOptions)
    );
    return signals;
}
