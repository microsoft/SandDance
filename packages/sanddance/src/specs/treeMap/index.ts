// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getData, { treemapTransforms } from './data';
import getMarks from './marks';
import getScales from './scales';
import getSignals from './signals';
import {
    checkForFacetErrors,
    facetMarks,
    facetSize,
    layout
} from '../facet';
import { Data, GroupMark, Spec } from 'vega-typings';
import { DataNames, SignalNames } from '../constants';
import {
    Insight,
    SpecCapabilities,
    SpecColumns,
    SpecViewOptions
} from '../types';
import { legend } from '../legends';
import { SpecCreator, SpecResult } from '../interfaces';

export const treemap: SpecCreator = (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions): SpecResult => {
    const errors: string[] = [];

    if (!columns.uid) errors.push(`Must set a field for id`);
    if (!columns.size) errors.push(`Must set a field for size`);
    checkForFacetErrors(insight.facets, errors);

    const specCapabilities: SpecCapabilities = {
        roles: [
            {
                role: 'size',
                excludeCategoric: true
            },
            {
                role: 'group',
                allowNone: true
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
                role: 'facet',
                allowNone: true
            }
        ],
        signals: [SignalNames.TreeMapMethod]
    };

    if (errors.length) {
        return {
            errors,
            specCapabilities,
            vegaSpec: null,
        };
    }

    const categoricalColor = columns.color && !columns.color.quantitative;
    const dataName = categoricalColor ? DataNames.Legend : DataNames.Main;

    const TreeMapName = "SandDanceTreeMapFaceted";
    const data = getData(insight, columns, specViewOptions);
    let marks = getMarks(columns.facet ? TreeMapName : dataName, columns, specViewOptions);

    if (columns.facet) {
        const childData: Data = {
            "name": TreeMapName,
            "source": DataNames.FacetGroupCell,
            "transform": treemapTransforms(insight)
        };
        marks = facetMarks(specViewOptions, dataName, marks, null, [childData]);
        (marks[0] as GroupMark).marks
    }

    const size = columns.facet ? facetSize(insight.facets, insight.size, specViewOptions) : insight.size;

    var vegaSpec: Spec = {
        "$schema": "https://vega.github.io/schema/vega/v3.json",
        "height": size.height,
        "width": size.width,
        signals: getSignals(insight, specViewOptions),
        data,
        scales: getScales(columns, insight),
        marks
    };

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
