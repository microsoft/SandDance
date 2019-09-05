// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column } from './types';
import { Data } from 'vega-typings';
import {
    DataNames,
    Other,
    FieldNames
} from './constants';

export function topLookup(column: Column, count: number) {
    const data: Data[] = [
        {
            "name": DataNames.TopLookup,
            "source": DataNames.Main,
            "transform": [
                { "type": "aggregate", "groupby": [column.name] },
                {
                    "type": "window",
                    "ops": [
                        "count"
                    ],
                    "as": [
                        FieldNames.TopIndex
                    ]
                },
                { "type": "filter", "expr": `datum.${FieldNames.TopIndex} <= ${count}` }
            ]
        },
        {
            "name": DataNames.Legend,
            "source": DataNames.Main,
            "transform": [
                {
                    "type": "lookup",
                    "from": DataNames.TopLookup,
                    "key": column.name,
                    "fields": [column.name],
                    "values": [column.name],
                    "as": [FieldNames.Top]
                },
                {
                    "type": "formula",
                    "expr": `datum.${FieldNames.Top} == null ? '${Other}' : datum.${FieldNames.Top}`,
                    "as": FieldNames.Top
                }
            ]
        }
    ];
    return data;
}
