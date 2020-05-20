// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { getSpecBuilderForChart } from './charts';
import { inferAll } from './inference';
import { SpecContext } from './types';
import { SpecResult } from './interfaces';
import { ValuesData } from 'vega-typings';

export function build(context: SpecContext, currData: object[]): SpecResult {
    const { specColumns } = context;
    const columns = [
        specColumns.color,
        specColumns.facet,
        specColumns.facetV,
        specColumns.group,
        specColumns.size,
        specColumns.sort,
        specColumns.x,
        specColumns.y,
        specColumns.z
    ];
    inferAll(columns, currData);

    const specBuilder = getSpecBuilderForChart(context);
    let specResult: SpecResult;

    if (specBuilder) {
        try {
            specResult = specBuilder.build();
        }
        catch (e) {
            specResult = {
                specCapabilities: null,
                vegaSpec: null,
                errors: [e.stack]
            };
        }
        if (!specResult.errors) {
            const data0 = specResult.vegaSpec.data[0] as ValuesData;
            data0.values = currData;
        }
    } else {
        specResult = {
            specCapabilities: null,
            vegaSpec: null,
            errors: [`could not build spec for ${context.insight.chart}`]
        };
    }
    return specResult;
}
