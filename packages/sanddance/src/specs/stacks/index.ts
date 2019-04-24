// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getAxes from './axes';
import getData from './data';
import getMarks from './marks';
import getScales from './scales';
import getSignals from './signals';
import { DataNames, SignalNames } from '../constants';
import {
    checkForFacetErrors,
    facetMarks,
    facetSize,
    layout
} from '../facet';
import {
    Insight,
    SpecCapabilities,
    SpecColumns,
    SpecViewOptions
} from '../types';
import { legend } from '../legends';
import { Mark, Spec } from 'vega-typings';
import { SpecCreator, SpecResult } from '../interfaces';

export const stacks: SpecCreator = (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions): SpecResult => {
    const errors: string[] = [];

    if (!columns.uid) errors.push(`Must set a field for id`);
    if (!columns.x) errors.push(`Must set a field for x axis`);
    checkForFacetErrors(insight.facets, errors);

    const specCapabilities: SpecCapabilities = {
        roles: [
            {
                role: 'x',
                binnable: true,
                axisSelection: columns.x && columns.x.quantitative ? 'range' : 'exact',
                signals: [SignalNames.BinX]
            },
            {
                role: 'y',
                binnable: true,
                axisSelection: columns.y && columns.y.quantitative ? 'range' : 'exact',
                signals: [SignalNames.BinY]
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
        ],
        signals: ['mywidth', 'mydepth']
    };

    if (errors.length) {
        return {
            errors,
            specCapabilities,
            vegaSpec: null,
        };
    }

    //  const rootNamespace = new NameSpace();
    //  let axes = getAxes(specViewOptions, columns);
    //  let marks: Mark[];

    // if (columns.facet) {
    //      const cellNamespace = new NameSpace('Cell');
    //      const cellMarks = getMarks(cellNamespace, columns, specViewOptions);
    //      marks = facetMarks(specViewOptions, rootNamespace.stacked, cellMarks, axes, cellData(cellNamespace, FacetGroupCellDataName, columns));
    //     axes = [];
    // } else {
    //     marks = getMarks(rootNamespace, columns, specViewOptions);
    //  }

    const size = columns.facet ? facetSize(insight.facets, insight.size, specViewOptions) : insight.size;

    var vegaSpec: Spec = {
        "$schema": "https://vega.github.io/schema/vega/v3.json",
        "height": size.height,
        "width": size.width,
        "padding": 5,
        signals: getSignals(insight, columns, specViewOptions),
        data: getData(insight, columns, specViewOptions),
        scales: getScales(columns, insight),
        axes: getAxes(specViewOptions, columns),
        marks: getMarks(columns, specViewOptions)
    };

    if (columns.color) {
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
