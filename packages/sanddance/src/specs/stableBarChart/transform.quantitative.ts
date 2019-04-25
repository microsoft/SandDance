// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column, SpecColumns } from '../types';
import { SignalNames } from '../constants';
import { StackTransform, Transforms } from 'vega-typings';

export default function (columns: SpecColumns, groupBy: Column) {
    const stackTransform: StackTransform = {
        "type": "stack",
        "groupby": [
            "__bin0"
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
            "signal": "var_extent"
        },
        {
            "type": "bin",
            "field": columns.x.name,
            "extent": {
                "signal": "var_extent"
            },
            "maxbins": {
                "signal": SignalNames.XBins
            },
            "as": [
                "__bin0",
                "__bin1"
            ]
        },
        stackTransform,
        {
            "type": "extent",
            "signal": "xtent",
            "field": "y1"
        }
    ];
    return transforms;
}