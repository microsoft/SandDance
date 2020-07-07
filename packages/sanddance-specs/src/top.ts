// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Other } from './constants';
import { safeFieldName } from './expr';
import { Column } from '@msrvida/chart-types';
import { Data } from 'vega-typings';

export function topLookup(column: Column, count: number, source: string, legend: string, lookupName: string, fieldName: string, indexName: string) {
    const data: Data[] = [
        {
            name: lookupName,
            source,
            transform: [
                {
                    type: 'aggregate',
                    groupby: [safeFieldName(column.name)]
                },
                {
                    type: 'window',
                    ops: ['count'],
                    as: [indexName]
                },
                {
                    type: 'filter',
                    expr: `datum[${JSON.stringify(indexName)}] <= ${count}`
                }
            ]
        },
        {
            name: legend,
            source,
            transform: [
                {
                    type: 'lookup',
                    from: lookupName,
                    key: safeFieldName(column.name),
                    fields: [column.name].map(safeFieldName),
                    values: [column.name].map(safeFieldName),
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
