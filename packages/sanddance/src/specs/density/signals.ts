// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { colorBinCountSignal, colorReverseSignal, textSignals } from '../signals';
import { facetSignals } from '../facet';
import { Insight, SpecColumns, SpecViewOptions } from '../types';
import { Signal } from 'vega-typings';
import { SignalNames } from '../constants';

export default function (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const signals = allTruthy<Signal>(
        textSignals(specViewOptions),
        [
            colorBinCountSignal(specViewOptions),
            colorReverseSignal(specViewOptions),
            {
                "name": "unitpad",
                "value": 0.1,
                "bind": {
                    "name": SignalNames.InnerPadding,
                    "input": "range",
                    "min": 0.1,
                    "max": 1.0,
                    "step": 0.1
                }
            },
            {
                "name": "xsize",
                "update": "domain('xscale').length"
            },
            {
                "name": "ysize",
                "update": "domain('yscale').length"
            },
            {
                "name": "cellwidth",
                "update": "width/max(xsize,ysize)"
            },
            {
                "name": "maxnumbers",
                "update": "sqrt(cextent[1])"
            },
            {
                "name": "unitsize",
                "update": "cellwidth/((1 + unitpad)*maxnumbers)"
            }

        ],
        insight.columns.facet && facetSignals(insight.facets, specViewOptions)
    );
    return signals;
}
