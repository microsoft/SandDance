// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { Data, Transforms } from 'vega-typings';
import { Insight, SpecColumns, SpecViewOptions } from '../types';
import { DataNames, SignalNames } from '../constants';
import { topLookup } from '../top';

export default function (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const categoricalColor = columns.color && !columns.color.quantitative;
    const data = allTruthy<Data>(
        [
            {
                "name": DataNames.Main,
                "transform": [
                    {
                        "type": "extent",
                        "field": columns.x.name,
                        "signal": "long_extent"
                    },
                    {
                        "type": "extent",
                        "field": columns.y.name,
                        "signal": "lat_extent"
                    },
                    {
                        "type": "bin",
                        "field": columns.x.name,
                        "extent": {
                            "signal": "long_extent"
                        },
                        "maxbins": {
                            "signal": SignalNames.BinXSignal
                        },
                        "as": [
                            "long0",
                            "long1"
                        ]
                    },
                    {
                        "type": "bin",
                        "field": columns.y.name,
                        "extent": {
                            "signal": "lat_extent"
                        },
                        "maxbins": {
                            "signal": SignalNames.BinYSignal
                        },
                        "as": [
                            "lat0",
                            "lat1"
                        ]
                    }
                ]
            },
            {
                "name": "summary",
                "source": DataNames.Main,
                "transform": [
                    {
                        "type": "nest",
                        "keys": [
                            "lat0",
                            "long0"
                        ]
                    }]
            },
            {
                "name": "aggregated",
                "source": DataNames.Main,
                "transform": [
                    {
                        "type": "aggregate",
                        "groupby": [
                            "lat0",
                            "long0"
                        ],

                        "ops": [
                            "count"
                        ]
                    }]
            },
            {
                "name": "stackedgroup",
                "source": "summary",
                "transform": [
                    {
                        "type": "stack",
                        "groupby": [
                            "lat0",
                            "long0"
                        ],
                        "sort": {
                            "field": columns.sort.name
                        },
                        "as": [
                            "s1",
                            "s2"
                        ]
                    },
                    {
                        "type": "extent",
                        "signal": "xtent",
                        "field": "s1"
                    },
                    {
                        "type": "formula",
                        "expr": "datum.s2 % columns",
                        "as": "_columns"
                    },
                    {
                        "type": "formula",
                        "expr": "floor(datum.s1 / columns)",
                        "as": "row"
                    },
                    {
                        "type": "formula",
                        "expr": "datum.s1 % mywidth",
                        "as": "column"
                    },
                    {
                        "type": "formula",
                        "expr": "floor((datum.s1 % columns)/ mywidth)",
                        "as": "depth"
                    },
                    {
                        "type": "extent",
                        "signal": "rowxtent",
                        "field": "row"
                    }
                ]
            }
        ],
        categoricalColor && topLookup(columns.color, specViewOptions.maxLegends),
    );
    return data;
}
