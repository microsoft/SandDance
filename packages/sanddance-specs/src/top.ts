// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column } from '@msrvida/chart-types';
import { Data } from 'vega-typings';
import { Other } from './constants';

export function topLookup(column: Column, count: number, source: string, legend: string, lookupName: string, fieldName: string, indexName: string) {
    const data: Data[] = [
        {
            name: lookupName,
            source,
            transform: [
                { type: 'aggregate', groupby: [column.name] },
                {
                    type: 'window',
                    ops: ['count'],
                    as: [indexName]
                },
                { type: 'filter', expr: `datum[${JSON.stringify(indexName)}] <= ${count}` }
            ]
        },
        {
            name: legend,
            source,
            transform: [
                {
                    type: 'lookup',
                    from: lookupName,
                    key: column.name,
                    fields: [column.name],
                    values: [column.name],
                    as: [fieldName]
                },
                {
                    type: 'formula',
                    expr: `datum[${JSON.stringify(fieldName)}] == null ? '${Other}' : datum[${JSON.stringify(fieldName)}]`,
                    as: fieldName
                }
            ]
        }
    ];
    return data;
}
