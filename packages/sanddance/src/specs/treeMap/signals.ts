// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { colorBinCountSignal, colorReverseSignal, textSignals } from '../signals';
import { facetSignals } from '../facet';
import { Signal } from 'vega-typings';
import { SignalNames } from '../constants';
import { SpecContext } from '../types';

export default function (context: SpecContext) {
    const { insight, specViewOptions } = context;
    const signals = allTruthy<Signal>(
        textSignals(context),
        [
            colorBinCountSignal(context),
            {
                "name": SignalNames.TreeMapMethod,
                "value": "squarify",
                "bind": {
                    "name": specViewOptions.language.treeMapMethod,
                    "input": "select",
                    "options": [
                        "squarify", "binary"
                    ]
                }
            },
            colorReverseSignal(context)

        ],
        insight.columns.facet && facetSignals(context)
    );
    return signals;
}
