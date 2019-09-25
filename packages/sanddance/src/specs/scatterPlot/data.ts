// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { Column, SpecContext } from '../types';
import { Data, Transforms } from 'vega-typings';
import { DataNames } from '../constants';
import { facetGroupData, facetSourceData, facetTransforms } from '../facet';
import { topLookup } from '../top';

export default function (context: SpecContext) {
    const { columns, insight, specViewOptions } = context;
    const categoricalColor = columns.color && !columns.color.quantitative;
    const ScatterDataName = "SandDanceScatterPlotData";
    const data = allTruthy<Data>(
        facetSourceData(columns.facet, insight.facets, ScatterDataName),
        [
            {
                "name": DataNames.Main,
                "source": ScatterDataName,
                "transform": allTruthy<Transforms>(
                    filterInvalidWhenNumeric(columns.x),
                    filterInvalidWhenNumeric(columns.y),
                    filterInvalidWhenNumeric(columns.z),
                    columns.facet && facetTransforms(columns.facet, insight.facets)
                )
            }
        ],
        categoricalColor && topLookup(columns.color, specViewOptions.maxLegends),
        columns.facet && facetGroupData(DataNames.Main)
    );
    return data;
}

function filterInvalidWhenNumeric(column: Column) {
    if (column && column.quantitative) {
        const transforms: Transforms[] = [
            {
                "type": "filter",
                "expr": `datum[${JSON.stringify(column.name)}] != null`
            }
        ];
        return transforms;
    }
}
