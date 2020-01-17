// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../../array';
import { Data, Transforms } from 'vega-typings';
import { DataNames, FieldNames, SignalNames } from '../../constants';
import { facetGroupData, facetSourceData, facetTransforms } from '../../facet';
import { Insight, SpecContext } from '../../types';
import { topLookup } from '../../top';

export default function (context: SpecContext) {
    const { specColumns, insight, specViewOptions } = context;
    const categoricalColor = specColumns.color && !specColumns.color.quantitative;
    const TreeMapDataName = 'SandDanceTreeMapData';
    const data = allTruthy<Data>(
        facetSourceData(specColumns.facet, insight.facets, TreeMapDataName),
        [
            {
                name: DataNames.Main,
                source: TreeMapDataName,
                transform: allTruthy<Transforms>(
                    specColumns.facet && facetTransforms(specColumns.facet, insight.facets),
                    !specColumns.facet && treemapTransforms(insight)
                )
            }
        ],
        categoricalColor && topLookup(specColumns.color, specViewOptions.maxLegends),
        specColumns.facet && facetGroupData(DataNames.Main)
    );
    return data;
}

export function treemapTransforms(insight: Insight) {
    const transforms: Transforms[] = [
        {
            type: 'nest',
            keys: [insight.columns.group || '__NONE__']
        },
        {
            type: 'treemap',
            field: insight.columns.size,
            sort: { field: 'value', order: 'descending' },
            round: true,
            method: { signal: SignalNames.TreeMapMethod },
            padding: 1,
            size: [{ signal: 'width' }, { signal: 'height' }],
            as: [
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
