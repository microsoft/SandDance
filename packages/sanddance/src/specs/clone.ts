// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { create } from '.';
import { Data } from 'vega-typings';
import { inferAll } from './inference';
import { Insight, SpecColumns, SpecViewOptions } from './types';
import { SpecResult } from './interfaces';

export function cloneVegaSpecWithData(insight: Insight, specColumns: SpecColumns, specViewOptions: SpecViewOptions, currData: object[]): SpecResult {
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

    const specResult = create(insight, specColumns, specViewOptions);
    if (!specResult.errors) {
        const data0 = specResult.vegaSpec.data[0] as Data & { values: object[] };
        data0.values = currData;
    }
    return specResult;
}
