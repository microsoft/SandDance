// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import barchartH from './barchartH';
import barchartV from './barchartV';
import density from './density';
import grid from './grid';
import scatterplot from './scatterplot';
import stacks from './stacks';
import treemap from './treemap';
import { SpecBuilder, SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../../types';

const map: { [chart: string]: (specContext: SpecContext) => SpecBuilderProps } = {
    barchart: barchartV,
    barchartH,
    barchartV,
    density,
    grid,
    scatterplot,
    stacks,
    treemap
};

export function getSpecBuilderForChart(specContext: SpecContext) {
    const { insight } = specContext;
    let props: SpecBuilderProps;

    const fn = map[insight.chart];
    if (fn) {
        props = fn(specContext);
        return new SpecBuilder(props);
    }
}
