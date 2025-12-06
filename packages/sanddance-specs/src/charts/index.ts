/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import barchartH from './barchartH.js';
import barchartV from './barchartV.js';
import density from './density.js';
import grid from './grid.js';
import scatterplot from './scatterplot.js';
import stacks from './stacks.js';
import strips from './strips.js';
import treemap from './treemap.js';
import { SpecBuilderProps } from '../specBuilder.js';
import { SpecContext } from '../types.js';
import { getFacetLayout } from '../facetLayout.js';
import { DiscreteColumn } from '../interfaces.js';
import { SignalNames } from '../constants.js';
import { defaultBins, maxbins } from '../defaults.js';

const map: { [chart: string]: (specContext: SpecContext) => SpecBuilderProps } = {
    barchart: barchartV,
    barchartH,
    barchartV,
    density,
    grid,
    scatterplot,
    stacks,
    strips,
    treemap,
};

export function getSpecBuilderPropsForChart(specContext: SpecContext) {
    const { insight, specColumns, specViewOptions } = specContext;
    const fn = map[insight.chart];
    if (fn) {
        const props = fn(specContext);
        if (insight.columns.facet) {
            const discreteFacetColumn: DiscreteColumn = {
                column: specColumns.facet,
                defaultBins,
                maxbins,
                maxbinsSignalDisplayName: specViewOptions.language.FacetMaxBins,
                maxbinsSignalName: SignalNames.FacetBins,
            };
            const discreteFacetVColumn: DiscreteColumn = {
                column: specColumns.facetV,
                defaultBins,
                maxbins,
                maxbinsSignalDisplayName: specViewOptions.language.FacetVMaxBins,
                maxbinsSignalName: SignalNames.FacetVBins,
            };
            const { facetLayout, layoutPair } = getFacetLayout(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn, specViewOptions.colors.axisText);
            props.layouts.unshift(layoutPair);
            props.facetLayout = facetLayout;
            props.collapseFacetAxes = specViewOptions.collapseFacetAxes;
        }
        return props;
    }
}
