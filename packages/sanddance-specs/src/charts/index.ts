// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import barchartH from './barchartH';
import barchartV from './barchartV';
import density from './density';
import grid from './grid';
import scatterplot from './scatterplot';
import stacks from './stacks';
import strips from './strips';
import treemap from './treemap';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { getFacetLayout } from '../facetLayout';
import { DiscreteColumn } from '../interfaces';
import { SignalNames } from '../constants';
import { defaultBins, maxbins } from '../defaults';

const map: { [chart: string]: (specContext: SpecContext) => SpecBuilderProps } = {
    barchart: barchartV,
    barchartH,
    barchartV,
    density,
    grid,
    scatterplot,
    stacks,
    strips,
    treemap
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
                maxbinsSignalName: SignalNames.FacetBins
            };
            const discreteFacetVColumn: DiscreteColumn = {
                column: specColumns.facetV,
                defaultBins,
                maxbins,
                maxbinsSignalDisplayName: specViewOptions.language.FacetVMaxBins,
                maxbinsSignalName: SignalNames.FacetVBins
            };
            const { facetLayout, layoutPair } = getFacetLayout(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn, specViewOptions.colors.axisText);
            props.layouts.unshift(layoutPair);
            props.facetLayout = facetLayout;
            props.collapseFacetAxes = specViewOptions.collapseFacetAxes;
        }
        return props;
    }
}
