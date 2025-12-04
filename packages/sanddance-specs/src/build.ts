/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { getSpecBuilderPropsForChart } from './charts/index.js';
import { inferAll } from './inference.js';
import { SpecContext } from './types.js';
import { SpecResult } from './interfaces.js';
import { ValuesData } from 'vega-typings';
import { SpecBuilder } from './specBuilder.js';

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
