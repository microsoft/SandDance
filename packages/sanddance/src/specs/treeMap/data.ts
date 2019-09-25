// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { Data, Transforms } from 'vega-typings';
import { DataNames, FieldNames, SignalNames } from '../constants';
import { facetGroupData, facetSourceData, facetTransforms } from '../facet';
import { Insight, SpecContext } from '../types';
import { topLookup } from '../top';

export default function (context: SpecContext) {
    const { columns, insight, specViewOptions } = context;
    const categoricalColor = columns.color && !columns.color.quantitative;
    const TreeMapDataName = "SandDanceTreeMapData";
    const data = allTruthy<Data>(
        facetSourceData(columns.facet, insight.facets, TreeMapDataName),
        [
            {
                "name": DataNames.Main,
                "source": TreeMapDataName,
                "transform": allTruthy<Transforms>(
                    columns.facet && facetTransforms(columns.facet, insight.facets),
                    !columns.facet && treemapTransforms(insight)
                )
            }
        ],
        categoricalColor && topLookup(columns.color, specViewOptions.maxLegends),
        columns.facet && facetGroupData(DataNames.Main)
    );
    return data;
}

export function treemapTransforms(insight: Insight) {
    const transforms: Transforms[] = [
        {
            "type": "nest",
            "keys": [insight.columns.group || "__NONE__"]
        },
        {
            "type": "treemap",
            "field": insight.columns.size,
            "sort": { "field": "value", "order": "descending" },
            "round": true,
            "method": { "signal": SignalNames.TreeMapMethod },
            "padding": 1,
            "size": [{ "signal": "width" }, { "signal": "height" }],
            "as": [
                FieldNames.TreemapStackX0,
                FieldNames.TreemapStackY0,
                FieldNames.TreemapStackX1,
                FieldNames.TreemapStackY1,
                FieldNames.TreemapStackDepth,
                FieldNames.TreemapStackChildren
            ]
        }
    ];
    return transforms;
}
