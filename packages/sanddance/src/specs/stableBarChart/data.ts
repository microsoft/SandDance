// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getQualitative from './transform.qualitative';
import getQuantitative from './transform.quantitative';
import { allTruthy } from '../../array';
import { Data, Transforms } from 'vega-typings';
import { DataName, LegendDataName, PreDataName } from '../constants';
import { facetGroupData, facetSourceData, facetTransforms } from '../facet';
import { Insight, SpecColumns, SpecViewOptions } from '../types';
import { NameSpace } from './namespace';
import { topLookup } from '../top';

export default function (namespace: NameSpace, insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const categoricalColor = columns.color && !columns.color.quantitative;
    const nestedDataName = columns.facet && columns.facet.quantitative ? PreDataName : DataName;
    const data = allTruthy<Data>(
        facetSourceData(columns.facet, insight.facets, DataName),
        categoricalColor && topLookup(columns.color, specViewOptions.maxLegends),
        [
            nested(namespace, categoricalColor ? LegendDataName : nestedDataName, columns),
            stacked(namespace,
                columns.facet && facetTransforms(columns.facet, insight.facets)
            )
        ],
        columns.facet && facetGroupData(namespace.stacked)
    );
    return data;
}

function nested(namespace: NameSpace, source: string, columns: SpecColumns) {
    const data: Data = {
        "name": namespace.nested,
        source,
        "transform": columns.x.quantitative ?
            getQuantitative(columns, columns.facet)
            :
            getQualitative(columns)
    };
    return data;
}

function stacked(namespace: NameSpace, transforms?: Transforms[]) {
    const data: Data = {
        "name": namespace.stacked,
        "source": namespace.nested,
        "transform": allTruthy<Transforms>(
            transforms,
            xy(namespace)
        )
    };
    return data;
}

function xy(namespace: NameSpace) {
    const transforms: Transforms[] = [
        {
            "type": "formula",
            "expr": "floor(datum.y0 / shapesPerRow)",
            "as": namespace.__row
        },
        {
            "type": "formula",
            "expr": "datum.y0 % shapesPerRow",
            "as": namespace.__column
        }
    ];
    return transforms;
}

export function cellData(namespace: NameSpace, source: string, columns: SpecColumns) {
    const data: Data[] = [
        nested(namespace, source, columns),
        stacked(namespace)
    ];
    return data;
}
