// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getAxes from './axes';
import getData from './data';
import getMarks from './marks';
import getScales from './scales';
import getSignals from './signals';
import {
    AxisSelectionType,
    Insight,
    SpecCapabilities,
    SpecColumns,
    SpecViewOptions
} from '../types';
import {
    checkForFacetErrors,
    facetMarks,
    facetSize,
    layout
} from '../facet';
import { legend } from '../legends';
import { Spec } from 'vega-typings';
import { SpecCreator, SpecResult } from '../interfaces';
import { SignalNames } from '../constants';

export const scatterplot: SpecCreator = (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions): SpecResult => {
    const errors: string[] = [];

    if (!columns.uid) errors.push(`Must set a field for id`);
    if (!columns.x) errors.push(`Must set a field for x axis`);
    if (!columns.y) errors.push(`Must set a field for y axis`);
    checkForFacetErrors(insight.facets, errors);

    const specCapabilities: SpecCapabilities = {
        roles: [
            {
                role: 'x',
                axisSelection: columns.x && columns.x.quantitative ? 'range' : 'exact'
            },
            {
                role: 'y',
                axisSelection: columns.y && columns.y.quantitative ? 'range' : 'exact'
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
        signals: [SignalNames.PointSize]
    };

    if (errors.length) {
        return {
            errors,
            specCapabilities,
            vegaSpec: null,
        };
    }

    let axes = getAxes(specViewOptions, columns);
    let marks = getMarks(columns, specViewOptions);

    if (columns.facet) {
        marks = facetMarks(specViewOptions, marks[0].from.data, marks, axes);
        axes = [];
    }

    const size = columns.facet ? facetSize(insight.facets, insight.size, specViewOptions) : insight.size;

    var vegaSpec: Spec = {
        "$schema": "https://vega.github.io/schema/vega/v3.json",
        "height": size.height,
        "width": size.width,
        signals: getSignals(insight, specViewOptions),
        data: getData(insight, columns, specViewOptions),
        scales: getScales(columns, insight),
        axes,
        marks
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
