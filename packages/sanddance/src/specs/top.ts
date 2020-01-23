// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column } from './types';
import { Data } from 'vega-typings';
import {
    DataNames,
    Other,
    FieldNames
} from './constants';

export function topLookup(column: Column, count: number, source = DataNames.Main, legend = DataNames.Legend, lookupName = DataNames.TopLookup, fieldName = FieldNames.Top, indexName = FieldNames.TopIndex) {
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
                { type: 'filter', expr: `datum.${indexName} <= ${count}` }
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
                    expr: `datum.${fieldName} == null ? '${Other}' : datum.${fieldName}`,
                    as: fieldName
                }
            ]
        }
    ];
    return data;
}
