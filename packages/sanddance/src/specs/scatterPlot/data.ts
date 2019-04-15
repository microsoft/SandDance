// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { Data, Transforms } from 'vega-typings';
import { DataName } from '../constants';
import { facetGroupData, facetSourceData, facetTransforms } from '../facet';
import { Insight, SpecColumns, SpecViewOptions } from '../types';
import { topLookup } from '../top';

export default function (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const categoricalColor = columns.color && !columns.color.quantitative;
    const ScatterDataName = "SandDanceScatterPlotData";
    const data = allTruthy<Data>(
        facetSourceData(columns.facet, insight.facets, ScatterDataName),
        [
            {
                "name": DataName,
                "source": ScatterDataName,
                "transform": allTruthy<Transforms>(
                    columns.facet && facetTransforms(columns.facet, insight.facets)
                )
            }
        ],
        categoricalColor && topLookup(columns.color, specViewOptions.maxLegends),
        columns.facet && facetGroupData(DataName)
    );
    return data;
}
