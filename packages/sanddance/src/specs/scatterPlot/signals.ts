// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { colorBinCountSignal, textSignals, colorReverseSignal } from '../signals';
import { facetSignals } from '../facet';
import { Insight, SpecViewOptions } from '../types';
import { ScaleNames, SignalNames } from '../constants';
import { Signal } from 'vega-typings';

export default function (insight: Insight, specViewOptions: SpecViewOptions) {
    const signals = allTruthy<Signal>(
        textSignals(specViewOptions),
        [
            {
                "name": SignalNames.YDomainSignal,
                "update": `domain('${ScaleNames.Y}')`
            },
            {
                "name": SignalNames.PointSizeSignal,
                "value": 5,
                "bind": {
                    "name": specViewOptions.language.scatterPointSize,
                    "debounce": 50,
                    "input": "range",
                    "min": 1,
                    "max": 25,
                    "step": 1
                }
            },
            colorBinCountSignal(specViewOptions),
            colorReverseSignal(specViewOptions)

        ],
        insight.columns.facet && facetSignals(insight.facets, specViewOptions)
    );
    return signals;
}
