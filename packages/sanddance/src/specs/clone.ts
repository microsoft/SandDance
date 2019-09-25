// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { create } from '.';
import { Data } from 'vega-typings';
import { inferAll } from './inference';
import { SpecContext } from './types';
import { SpecResult } from './interfaces';

export function cloneVegaSpecWithData(context: SpecContext, currData: object[]): SpecResult {
    const { columns } = context;
    const rawColumns = [
        columns.color,
        columns.facet,
        columns.group,
        columns.size,
        columns.sort,
        columns.x,
        columns.y,
        columns.z
    ]
    inferAll(rawColumns, currData);

    const specResult = create(context);
    if (!specResult.errors) {
        const data0 = specResult.vegaSpec.data[0] as Data & { values: object[] };
        data0.values = currData;
    }
    return specResult;
}
