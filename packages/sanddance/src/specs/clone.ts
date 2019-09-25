// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { create } from '.';
import { Data } from 'vega-typings';
import { inferAll } from './inference';
import { SpecContext } from './types';
import { SpecResult } from './interfaces';

export function cloneVegaSpecWithData(context: SpecContext, currData: object[]): SpecResult {
    const { specColumns } = context;
    const columns = [
        specColumns.color,
        specColumns.facet,
        specColumns.group,
        specColumns.size,
        specColumns.sort,
        specColumns.x,
        specColumns.y,
        specColumns.z
    ]
    inferAll(columns, currData);

    const specResult = create(context);
    if (!specResult.errors) {
        const data0 = specResult.vegaSpec.data[0] as Data & { values: object[] };
        data0.values = currData;
    }
    return specResult;
}
