// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Data, Scale, OrdinalScale, SortOrder } from "vega-typings";
import { FieldNames } from "./constants";

export interface OrdinalResult {
    data: Data;
    scale: OrdinalScale;
}

export function createOrdinalsForFacet(source: string, prefix: string, binFields: string[], sortOrder: SortOrder): OrdinalResult {
    const dataName = `${prefix}_bin_order`;
    const data: Data = {
        name: dataName,
        source,
        transform: [
            {
                type: 'aggregate',
                groupby: binFields
            },
            {
                type: 'collect',
                sort: {
                    field: binFields,
                    order: binFields.map(f => sortOrder)
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
            field: binFields[0]
        },
        range: {
            data: dataName,
            field: FieldNames.Ordinal
        }
    };
}

