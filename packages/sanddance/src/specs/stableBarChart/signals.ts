// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { BinXSignal, MainYScale, YDomainSignal } from '../constants';
import { colorBinCountSignal, textSignals } from '../signals';
import { facetSignals } from '../facet';
import { Insight, SpecColumns, SpecViewOptions } from '../types';
import { Signal } from 'vega-typings';

export default function (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions): Signal[] {
    const signals = allTruthy<Signal>(
        textSignals(specViewOptions),
        [
            {
                "name": YDomainSignal,
                "update": `domain('${MainYScale}')`
            },
            columns.x.quantitative && {
                "name": BinXSignal,
                "value": 7,
                "bind": {
                    "name": specViewOptions.language.barChartBinSize,
                    "input": "range",
                    "min": 1,
                    "max": 20,
                    "step": 1
                }
            },
            {
                "name": "xdesbandwidth",
                "update": "bandwidth('xscaleavailable')"
            },
            {
                "name": "binAspect",
                "update": "xdesbandwidth/height"
            },
            {
                "name": "shapesPerRow",
                "update": "ceil(sqrt(binAspect*xtent[1]))"
            },
            colorBinCountSignal(specViewOptions)
        ],
        columns.facet && facetSignals(insight.facets, specViewOptions)
    );
    return signals;
}
