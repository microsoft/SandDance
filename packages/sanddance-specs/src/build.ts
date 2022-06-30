// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { getSpecBuilderPropsForChart } from './charts';
import { inferAll } from './inference';
import { SpecContext } from './types';
import { SpecResult } from './interfaces';
import { ValuesData } from 'vega-typings';
import { SpecBuilder } from './specBuilder';

export function build(specContext: SpecContext, currData: object[]): SpecResult {
    const { specColumns } = specContext;
    const columns = [
        specColumns.color,
        specColumns.facet,
        specColumns.facetV,
        specColumns.group,
        specColumns.size,
        specColumns.sort,
        specColumns.x,
        specColumns.y,
        specColumns.z,
    ];
    inferAll(columns, currData);

    const specBuilderProps = getSpecBuilderPropsForChart(specContext);
    const specBuilder = new SpecBuilder(specBuilderProps, specContext);
    let specResult: SpecResult;

    if (specBuilder) {
        try {
            const errors = specBuilder.validate();
            if (errors.length) {
                specResult = {
                    errors,
                    specCapabilities: specBuilderProps.specCapabilities,
                    vegaSpec: null,
                };
            } else {
                specResult = specBuilder.build();
            }
        }
        catch (e) {
            specResult = {
                specCapabilities: null,
                vegaSpec: null,
                errors: [e.stack],
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
            errors: [`could not build spec for ${specContext.insight.chart}`],
        };
    }
    return specResult;
}
