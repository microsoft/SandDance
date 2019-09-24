// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getData from './data';
import getMarks from './marks';
import getScales from './scales';
import getSignals from './signals';
import { DataNames } from '../constants';
import { getLegends } from '../legends';
import {
    Insight,
    SpecCapabilities,
    SpecColumns,
    SpecViewOptions
} from '../types';
import { Spec } from 'vega-typings';
import { SpecCreator, SpecResult } from '../interfaces';

export const grid: SpecCreator = (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions): SpecResult => {
    const errors: string[] = [];

    const specCapabilities: SpecCapabilities = {
        roles: [
            {
                role: 'z',
                allowNone: true
            },
            {
                role: 'color',
                allowNone: true
            },
            {
                role: 'sort',
                allowNone: true
            }
        ]
    };

    if (errors.length) {
        return {
            errors,
            specCapabilities,
            vegaSpec: null,
        };
    }

    const categoricalColor = columns.color && !columns.color.quantitative;
    const dataName = categoricalColor ? DataNames.Legend : DataNames.Main;

    const size = insight.size;

    var vegaSpec: Spec = {
        "$schema": "https://vega.github.io/schema/vega/v3.json",
        "height": size.height,
        "width": size.width,
        signals: getSignals(insight, specViewOptions),
        scales: getScales(columns, insight),
        data: getData(columns, specViewOptions),
        marks: getMarks(dataName, columns, specViewOptions)
    };

    const legends = getLegends(insight, columns)
    if (legends) {
        vegaSpec.legends = legends;
    }

    //use autosize only when not faceting
    vegaSpec.autosize = "fit";

    return { vegaSpec, specCapabilities };
}
