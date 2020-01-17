// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getAxes from './axes';
import getData, { bucketed, stacked } from './data';
import getMarks from './marks';
import getScales from './scales';
import getSignals from './signals';
import { Axis, Mark, Spec } from 'vega-typings';
import {
    checkForFacetErrors,
    facetMarks,
    facetSize,
    layout
} from '../../facet';
import { DataNames, SignalNames } from '../../constants';
import { getLegends } from '../../legends';
import { BarChartNameSpace } from '../../namespace';
import { SpecCapabilities, SpecContext } from '../../types';
import { SpecCreator, SpecResult } from '../../interfaces';

export const barchartH: SpecCreator = (context: SpecContext): SpecResult => {
    const { specColumns, insight, specViewOptions } = context;
    const errors: string[] = [];

    if (!specColumns.y) errors.push('Must set a field for y axis');
    checkForFacetErrors(insight.facets, errors);

    const specCapabilities: SpecCapabilities = {
        roles: [
            {
                role: 'y',
                binnable: true,
                axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
                signals: [SignalNames.YBins]
            },
            {
                role: 'z',
                allowNone: true
            },
            {
                role: 'color',
                allowNone: true
            },
            {
                role: 'sort',
                allowNone: true
            },
            {
                role: 'facet',
                allowNone: true
            }
        ]
    };

    if (errors.length) {
        return {
            errors,
            specCapabilities,
            vegaSpec: null,
        };
    }

    const rootNamespace = new BarChartNameSpace();
    let axes: Axis[];

    if (!insight.hideAxes) {
        axes = getAxes(context);
    }

    let marks: Mark[];

    if (specColumns.facet) {
        const cellNamespace = new BarChartNameSpace('Cell');
        const cellMarks = getMarks(context, cellNamespace);
        const cd = specColumns.y.quantitative ?
            [
                stacked(cellNamespace, DataNames.FacetGroupCell)
            ]
            :
            [
                bucketed(context, cellNamespace, DataNames.FacetGroupCell),
                stacked(cellNamespace, cellNamespace.bucket)
            ];
        marks = facetMarks(specViewOptions, rootNamespace.stacked, cellMarks, axes, cd);
        axes = [];
    } else {
        marks = getMarks(context, rootNamespace);
    }

    const size = specColumns.facet ? facetSize(context) : insight.size;

    var vegaSpec: Spec = {
        $schema: 'https://vega.github.io/schema/vega/v3.json',
        height: size.height,
        width: size.width,
        signals: getSignals(context),
        scales: getScales(context, rootNamespace),
        data: getData(context, rootNamespace),
        marks
    };

    if (!insight.hideAxes && axes && axes.length) {
        vegaSpec.axes = axes;
    }

    const legends = getLegends(context);
    if (legends) {
        vegaSpec.legends = legends;
    }

    if (specColumns.facet) {
        vegaSpec.layout = layout(context);
    } else {
        //use autosize only when not faceting
        vegaSpec.autosize = 'fit';
    }

    return { vegaSpec, specCapabilities };
};
