// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getAxes from './axes';
import getData, { nested, stacked } from './data';
import getMarks from './marks';
import getScales from './scales';
import getSignals from './signals';
import {
    checkForFacetErrors,
    facetMarks,
    facetSize,
    layout
} from '../facet';
import { DataNames, SignalNames } from '../constants';
import {
    Insight,
    SpecCapabilities,
    SpecColumns,
    SpecViewOptions
} from '../types';
import { legend } from '../legends';
import { Axis, Mark, Spec } from 'vega-typings';
import { NameSpace } from './namespace';
import { SpecCreator, SpecResult } from '../interfaces';

export const barchart: SpecCreator = (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions): SpecResult => {
    const errors: string[] = [];

    if (!columns.x) errors.push(`Must set a field for x axis`);
    checkForFacetErrors(insight.facets, errors);

    const specCapabilities: SpecCapabilities = {
        roles: [
            {
                role: 'x',
                binnable: true,
                axisSelection: columns.x && columns.x.quantitative ? 'range' : 'exact',
                signals: [SignalNames.XBins]
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

    const rootNamespace = new NameSpace();
    let axes: Axis[];

    if (!insight.hideAxes) {
        axes = getAxes(specViewOptions, columns);
    }

    let marks: Mark[];

    if (columns.facet) {
        const cellNamespace = new NameSpace('Cell');
        const cellMarks = getMarks(cellNamespace, columns, specViewOptions);
        const cd = columns.x.quantitative ?
            [
                stacked(cellNamespace, DataNames.FacetGroupCell)
            ]
            :
            [
                nested(cellNamespace, DataNames.FacetGroupCell, columns),
                stacked(cellNamespace, cellNamespace.nested)
            ];
        marks = facetMarks(specViewOptions, rootNamespace.stacked, cellMarks, axes, cd);
        axes = [];
    } else {
        marks = getMarks(rootNamespace, columns, specViewOptions);
    }

    const size = columns.facet ? facetSize(insight.facets, insight.size, specViewOptions) : insight.size;

    var vegaSpec: Spec = {
        "$schema": "https://vega.github.io/schema/vega/v3.json",
        "height": size.height,
        "width": size.width,
        signals: getSignals(insight, columns, specViewOptions),
        scales: getScales(rootNamespace, insight, columns),
        data: getData(rootNamespace, insight, columns, specViewOptions),
        marks
    };

    if (!insight.hideAxes && axes && axes.length) {
        vegaSpec.axes = axes;
    }

    if (columns.color && !insight.hideLegend) {
        vegaSpec.legends = [legend(columns.color)];
    }

    if (columns.facet) {
        vegaSpec.layout = layout(specViewOptions);
    } else {
        //use autosize only when not faceting
        vegaSpec.autosize = "fit";
    }

    return { vegaSpec, specCapabilities };
}
