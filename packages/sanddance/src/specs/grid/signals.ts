// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { colorBinCountSignal, colorReverseSignal, textSignals } from '../signals';
import { ColumnCount, RowCount, Total } from './constants';
import { DataNames } from '../constants';
import { facetSignals } from '../facet';
import { Insight, SpecViewOptions } from '../types';
import { Signal } from 'vega-typings';

export default function (insight: Insight, specViewOptions: SpecViewOptions) {
    const signals = allTruthy<Signal>(
        textSignals(specViewOptions),
        [
            colorBinCountSignal(specViewOptions),
            {
                "name": Total,
                "update": `data('${DataNames.Main}').length`
            },
            {
                "name": ColumnCount,
                "update": `ceil(sqrt((width/height)*${Total}))`
            },
            {
                "name": RowCount,
                "update": `${Total}/${ColumnCount}`
            },
            colorReverseSignal(specViewOptions)
        ],
        insight.columns && insight.columns.facet && facetSignals(insight.facets, specViewOptions)
    );
    return signals;
}
