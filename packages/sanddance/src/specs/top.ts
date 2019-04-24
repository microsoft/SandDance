// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column } from './types';
import { Data } from 'vega-typings';
import {
    DataName,
    DataNameLegend,
    Other,
    FieldNameTop,
    DataNameTopLookup
} from './constants';

export function topLookup(column: Column, count: number) {
    const data: Data[] = [
        {
            "name": DataNameTopLookup,
            "source": DataName,
            "transform": [
                { "type": "aggregate", "groupby": [column.name] },
                { "type": "identifier", "as": "id" },
                { "type": "filter", "expr": `datum.id <= ${count}` }
            ]
        },
        {
            "name": DataNameLegend,
            "source": DataName,
            "transform": [
                {
                    "type": "lookup",
                    "from": DataNameTopLookup,
                    "key": column.name,
                    "fields": [column.name],
                    "values": [column.name],
                    "as": [FieldNameTop]
                },
                {
                    "type": "formula",
                    "expr": `datum.${FieldNameTop} || '${Other}'`,
                    "as": FieldNameTop
                }
            ]
        }
    ];
    return data;
}
