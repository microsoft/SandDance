// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { BarChartSignalNames } from './constants';
import { FieldNames } from '../constants';
import { SpecContext } from '../types';
import { StackTransform, Transforms } from 'vega-typings';

export default function (context: SpecContext) {
    const { columns } = context;
    const stackTransform: StackTransform = {
        "type": "stack",
        "groupby": [
            {
                "field": columns.x.name
            }
        ],
        "as": [
            FieldNames.BarChartStack0,
            FieldNames.BarChartStack1
        ]
    };
    if (columns.sort) {
        stackTransform.sort = {
            "field": columns.sort.name
        };
    }
    const transforms: Transforms[] = [
        stackTransform,
        {
            "type": "extent",
            "signal": BarChartSignalNames.levelExtentSignal,
            "field": FieldNames.BarChartStack1
        }
    ];

    return transforms;
}