// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getAxes from './axes';
import getData from './data';
import getMarks from './marks';
import getScales from './scales';
import getSignals from './signals';
import { checkForFacetErrors, facetSize, layout } from '../facet';
import { getLegends } from '../legends';
import { SignalNames } from '../constants';
import { Spec } from 'vega-typings';
import { SpecCapabilities, SpecContext } from '../types';
import { SpecCreator, SpecResult } from '../interfaces';

export const stacks: SpecCreator = (context: SpecContext): SpecResult => {
    const { columns, insight } = context;
    const errors: string[] = [];

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

    const size = columns.facet ? facetSize(context) : insight.size;

    var vegaSpec: Spec = {
        "$schema": "https://vega.github.io/schema/vega/v3.json",
        "height": size.height,
        "width": size.width,
        signals: getSignals(context),
        data: getData(context),
        scales: getScales(context),
        marks: getMarks(context)
    };

    if (!insight.hideAxes) {
        vegaSpec.axes = getAxes(context);
    }

    const legends = getLegends(context)
    if (legends) {
        vegaSpec.legends = legends;
    }

    if (columns.facet) {
        vegaSpec.layout = layout(context);
    } else {
        //use autosize only when not faceting
        vegaSpec.autosize = "fit";
    }

    return { vegaSpec, specCapabilities };
}
