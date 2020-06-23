// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FieldNames } from './constants';
import { safeFieldName } from './expr';
import { Data, OrdinalScale, SortOrder } from 'vega-typings';

export interface OrdinalResult {
    data: Data;
    scale: OrdinalScale;
}

export function createOrdinals(source: string, prefix: string, binFields: string[], sortOrder: SortOrder): OrdinalResult {
    const _binFields = binFields.map(safeFieldName);
    const dataName = `${prefix}_bin_order`;
    const data: Data = {
        name: dataName,
        source,
        transform: [
            {
                type: 'aggregate',
                groupby: _binFields
            },
            {
                type: 'collect',
                sort: {
                    field: _binFields,
                    order: _binFields.map(f => sortOrder)
                }
            },
            {
                type: 'window',
                ops: ['row_number'],
                as: [FieldNames.Ordinal]
            }
        ]
    };
    return {
        data,
        scale: ordinalScale(dataName, `scale_${prefix}_order`, binFields)
    };
}

export function ordinalScale(dataName: string, scaleName: string, binFields: string[]): OrdinalScale {
    return {
        type: 'ordinal',
        name: scaleName,
        domain: {
            data: dataName,
            field: safeFieldName(binFields[0])
        },
        range: {
            data: dataName,
            field: FieldNames.Ordinal
        }
    };
}

