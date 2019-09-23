// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getQualitative from './transform.qualitative';
import getQuantitative from './transform.quantitative';
import { allTruthy } from '../../array';
import { Data, SourceData, Transforms } from 'vega-typings';
import { DataNames, FieldNames } from '../constants';
import { facetGroupData, facetSourceData, facetTransforms } from '../facet';
import { Insight, SpecColumns, SpecViewOptions } from '../types';
import { NameSpace } from './namespace';
import { topLookup } from '../top';

export default function (namespace: NameSpace, insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const categoricalColor = columns.color && !columns.color.quantitative;
    const nestedDataName = columns.facet && columns.facet.quantitative ? DataNames.Pre : DataNames.Main;
    const data = allTruthy<Data>(
        facetSourceData(columns.facet, insight.facets, DataNames.Main),
        categoricalColor && topLookup(columns.color, specViewOptions.maxLegends),
        [
            nested(namespace, categoricalColor ? DataNames.Legend : nestedDataName, columns),
            stacked(namespace, namespace.nested,
                columns.facet && facetTransforms(columns.facet, insight.facets)
            )
        ],
        columns.x.quantitative && [
            {
                "name": "xaxisdata",
                "transform": [
                    {
                        "type": "sequence",
                        "start": {
                            "signal": "binSignal.start"
                        },
                        "stop": {
                            "signal": "binSignal.stop"
                        },
                        "step": {
                            "signal": "binSignal.step"
                        }
                    }
                ]
            }
        ],
        columns.facet && facetGroupData(namespace.stacked)
    );
    return data;
}

export function nested(namespace: NameSpace, source: string, columns: SpecColumns) {
    const data: SourceData = {
        "name": namespace.nested,
        source,
        "transform": columns.x.quantitative ?
            getQuantitative(columns, columns.facet)
            :
            getQualitative(columns)
    };
    return data;
}

export function stacked(namespace: NameSpace, source: string, transforms?: Transforms[]) {
    const data: SourceData = {
        "name": namespace.stacked,
        source,
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
            "expr": `floor(datum.${FieldNames.BarChartStack0} / shapesPerRow)`,
            "as": namespace.__row
        },
        {
            "type": "formula",
            "expr": `datum.${FieldNames.BarChartStack0} % shapesPerRow`,
            "as": namespace.__column
        }
    ];
    return transforms;
}
