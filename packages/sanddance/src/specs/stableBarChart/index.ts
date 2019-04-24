// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getAxes from './axes';
import getData, { cellData } from './data';
import getMarks from './marks';
import getScales from './scales';
import getSignals from './signals';
import {
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
import { DataNameFacetGroupCell, BinXSignal, ColorReverseSignal } from '../constants';
import { legend } from '../legends';
import { Mark, Spec } from 'vega-typings';
import { NameSpace } from './namespace';
import { SpecCreator, SpecResult } from '../interfaces';

export const barchart: SpecCreator = (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions): SpecResult => {
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
                signals: [BinXSignal]
            },
            {
                role: 'z',
                allowNone: true
            },
            {
                role: 'color',
                allowNone: true,
                signals: [ColorReverseSignal]

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
    let axes = getAxes(specViewOptions, columns);
    let marks: Mark[];

    if (columns.facet) {
        const cellNamespace = new NameSpace('Cell');
        const cellMarks = getMarks(cellNamespace, columns, specViewOptions);
        marks = facetMarks(specViewOptions, rootNamespace.stacked, cellMarks, axes, cellData(cellNamespace, DataNameFacetGroupCell, columns));
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
        axes,
        data: getData(rootNamespace, insight, columns, specViewOptions),
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
