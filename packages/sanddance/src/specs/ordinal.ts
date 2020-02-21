// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Data, Scale, OrdinalScale } from "vega-typings";

export interface OrdinalResult {
    data: Data;
    scale: Scale;
    lookupField: string;
}

export function createOrdinalsForFacet(source: string, prefix: string, binFields: string[]): OrdinalResult {
    const lookupField = 'ordinal';
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
                    order: binFields.map(f => 'ascending')
                }
            },
            {
                type: 'window',
                ops: ['row_number'],
                as: [lookupField]
            }
        ]
    };
    const scale: OrdinalScale = {
        type: 'ordinal',
        name: `${prefix}_order`,
        domain: {
            data: dataName,
            field: binFields[0]
        },
        range: {
            data: dataName,
            field: lookupField
        }
    };
    return {
        data,
        scale,
        lookupField
    };
}
