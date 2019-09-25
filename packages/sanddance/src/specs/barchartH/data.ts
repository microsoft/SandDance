// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import getQualitative from './transform.qualitative';
import getQuantitative from './transform.quantitative';
import { allTruthy } from '../../array';
import { BarChartSignalNames } from './constants';
import { Data, SourceData, Transforms } from 'vega-typings';
import { DataNames, FieldNames } from '../constants';
import { facetGroupData, facetSourceData, facetTransforms } from '../facet';
import { NameSpace } from './namespace';
import { SpecContext } from '../types';
import { topLookup } from '../top';

export default function (context: SpecContext, namespace: NameSpace) {
    const { columns, insight, specViewOptions } = context;
    const categoricalColor = columns.color && !columns.color.quantitative;
    const nestedDataName = columns.facet && columns.facet.quantitative ? DataNames.Pre : DataNames.Main;
    const data = allTruthy<Data>(
        facetSourceData(columns.facet, insight.facets, DataNames.Main),
        categoricalColor && topLookup(columns.color, specViewOptions.maxLegends),
        [
            bucketed(context, namespace, categoricalColor ? DataNames.Legend : nestedDataName),
            stacked(namespace, namespace.bucket,
                columns.facet && facetTransforms(columns.facet, insight.facets)
            )
        ],
        columns.y.quantitative && [
            {
                "name": DataNames.QuantitativeData,
                "transform": [
                    {
                        "type": "sequence",
                        "start": {
                            "signal": `${BarChartSignalNames.quantitativeBinSignal}.start`
                        },
                        "stop": {
                            "signal": `${BarChartSignalNames.quantitativeBinSignal}.stop`
                        },
                        "step": {
                            "signal": `${BarChartSignalNames.quantitativeBinSignal}.step`
                        }
                    }
                ]
            }
        ],
        columns.facet && facetGroupData(namespace.stacked)
    );
    return data;
}

export function bucketed(context: SpecContext, namespace: NameSpace, source: string) {
    const { columns } = context;
    const data: SourceData = {
        "name": namespace.bucket,
        source,
        "transform": columns.y.quantitative ?
            getQuantitative(context, columns.facet)
            :
            getQualitative(context)
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
            "expr": `floor(datum.${FieldNames.BarChartStack0} / ${BarChartSignalNames.compartmentsPerLevelSignal})`,
            "as": namespace.__level
        },
        {
            "type": "formula",
            "expr": `datum.${FieldNames.BarChartStack0} % ${BarChartSignalNames.compartmentsPerLevelSignal}`,
            "as": namespace.__compartment
        }
    ];
    return transforms;
}
