// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binSignal, var_extent, xtent } from './constants';
import { Column, SpecColumns } from '../types';
import { FieldNames, SignalNames } from '../constants';
import { StackTransform, Transforms } from 'vega-typings';

export default function (columns: SpecColumns, groupBy: Column) {
    const stackTransform: StackTransform = {
        "type": "stack",
        "groupby": [
            FieldNames.BarChartBin0
        ],
        "as": [
            FieldNames.BarChartStack0,
            FieldNames.BarChartStack1
        ]
    };
    if (groupBy) {
        stackTransform.groupby.push(groupBy.name);
    }
    if (columns.sort) {
        stackTransform.sort = {
            "field": columns.sort.name
        };
    }
    const transforms: Transforms[] = [
        {
            "type": "extent",
            "field": columns.x.name,
            "signal": var_extent
        },
        {
            "type": "bin",
            "field": columns.x.name,
            "extent": {
                "signal": var_extent
            },
            "maxbins": {
                "signal": SignalNames.XBins
            },
            "as": [
                FieldNames.BarChartBin0,
                FieldNames.BarChartBin1
            ],
            "signal": binSignal
        },
        stackTransform,
        {
            "type": "extent",
            "signal": xtent,
            "field": FieldNames.BarChartStack1
        }
    ];
    return transforms;
}