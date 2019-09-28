// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { colorBinCountSignal, colorReverseSignal, textSignals } from '../signals';
import { facetSignals } from '../facet';
import { ScaleNames, SignalNames } from '../constants';
import { Signal } from 'vega-typings';
import { SpecContext } from '../types';

export default function (context: SpecContext) {
    const { insight, specViewOptions } = context;
    const signals = allTruthy<Signal>(
        textSignals(context),
        [
            {
                name: SignalNames.YDomain,
                update: `domain('${ScaleNames.Y}')`
            },
            {
                name: SignalNames.PointSize,
                value: 5,
                bind: {
                    name: specViewOptions.language.scatterPointSize,
                    debounce: 50,
                    input: 'range',
                    min: 1,
                    max: 25,
                    step: 1
                }
            },
            colorBinCountSignal(context),
            colorReverseSignal(context)
        ],
        insight.columns.facet && facetSignals(context)
    );
    return signals;
}
