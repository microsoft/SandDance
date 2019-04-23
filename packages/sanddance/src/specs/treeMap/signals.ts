// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { colorBinCountSignal, textSignals,colorReverseSignal } from '../signals';
import { facetSignals } from '../facet';
import { Insight, SpecViewOptions } from '../types';
import { TreeMapMethod } from '../constants';
import { Signal } from 'vega-typings';

export default function (insight: Insight, specViewOptions: SpecViewOptions) {
    const signals = allTruthy<Signal>(
        textSignals(specViewOptions),
        [
            colorBinCountSignal(specViewOptions),
            {
                "name": TreeMapMethod,
                "value": "squarify",
                "bind": {
                    "name": specViewOptions.language.treeMapMethod,
                    "input": "select",
                    "options": [
                        "squarify", "binary"
                    ]
                }
            },
            colorReverseSignal(specViewOptions)

        ],
        insight.columns.facet && facetSignals(insight.facets, specViewOptions)
    );
    return signals;
}
