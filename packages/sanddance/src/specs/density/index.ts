// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getAxes from './axes';
import getData from './data';
import getMarks from './marks';
import getScales from './scales';
import getSignals from './signals';
import { checkForFacetErrors, facetSize, layout } from '../facet';
import {
    Insight,
    SpecCapabilities,
    SpecColumns,
    SpecViewOptions
} from '../types';
import { legend } from '../legends';
import { SignalNames } from '../constants';
import { Spec } from 'vega-typings';
import { SpecCreator, SpecResult } from '../interfaces';

export const density: SpecCreator = (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions): SpecResult => {
    const errors: string[] = [];

    if (!columns.uid) errors.push(`Must set a field for id`);
    if (!columns.x) errors.push(`Must set a field for x axis`);
    if (!columns.y) errors.push(`Must set a field for y axis`);
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
                role: 'y',
                binnable: true,
                axisSelection: columns.y && columns.y.quantitative ? 'range' : 'exact',
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

    const size = columns.facet ? facetSize(insight.facets, insight.size, specViewOptions) : insight.size;

    var vegaSpec: Spec = {
        "$schema": "https://vega.github.io/schema/vega/v3.json",
        "height": size.height,
        "width": size.width,
        signals: getSignals(insight, columns, specViewOptions),
        data: getData(insight, columns, specViewOptions),
        scales: getScales(columns, insight),
        marks: getMarks(columns, specViewOptions)
    };

    if (!insight.hideAxes) {
        vegaSpec.axes = getAxes(specViewOptions, columns);
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
