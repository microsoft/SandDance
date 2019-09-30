// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getAxes from './axes';
import getData from './data';
import getMarks from './marks';
import getScales from './scales';
import getSignals from './signals';
import { Axis, Spec } from 'vega-typings';
import {
    checkForFacetErrors,
    facetMarks,
    facetSize,
    layout
} from '../facet';
import { getLegends } from '../legends';
import { SignalNames } from '../constants';
import { SpecCapabilities, SpecContext } from '../types';
import { SpecCreator, SpecResult } from '../interfaces';

export const scatterplot: SpecCreator = (context: SpecContext): SpecResult => {
    const { specColumns, insight, specViewOptions } = context;
    const errors: string[] = [];

    if (!specColumns.x) errors.push('Must set a field for x axis');
    if (!specColumns.y) errors.push('Must set a field for y axis');
    checkForFacetErrors(insight.facets, errors);

    const specCapabilities: SpecCapabilities = {
        roles: [
            {
                role: 'x',
                axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact'
            },
            {
                role: 'y',
                axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact'
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

    let axes: Axis[];

    if (!insight.hideAxes) {
        axes = getAxes(context);
    }

    let marks = getMarks(context);

    if (specColumns.facet) {
        marks = facetMarks(specViewOptions, marks[0].from.data, marks, axes);
        axes = [];
    }

    const size = specColumns.facet ? facetSize(context) : insight.size;

    var vegaSpec: Spec = {
        $schema: 'https://vega.github.io/schema/vega/v3.json',
        height: size.height,
        width: size.width,
        signals: getSignals(context),
        data: getData(context),
        scales: getScales(context),
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
