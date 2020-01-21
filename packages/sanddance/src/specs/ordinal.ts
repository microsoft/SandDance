// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Scope } from "vega-typings";

export function createOrdinalsForFacet(scope: Scope, source: string, prefix: string, binField: string) {
    const scaleName = `${prefix}_order`;
    const lookupField = 'ordinal';
    const dataName = `${prefix}_bin_order`;
    scope.data.push(
        {
            name: dataName,
            source,
            transform: [
                {
                    type: 'aggregate',
                    groupby: [binField]
                },
                {
                    type: 'collect',
                    sort: {
                        field: binField,
                        order: 'ascending'
                    }
                },
                {
                    type: 'window',
                    ops: ['row_number'],
                    as: [lookupField]
                }
            ]
        }
    );
    scope.scales.push(
        {
            type: 'ordinal',
            name: scaleName,
            domain: {
                data: dataName,
                field: binField
            },
            range: {
                data: dataName,
                field: lookupField
            }
        }
    );
    return {
        dataName,
        scaleName,
        lookupField
    };
}
