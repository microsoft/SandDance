// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import {
    Column,
    Insight,
    SpecColumns,
    SpecViewOptions
} from '../types';
import { Data, StackTransform, Transforms } from 'vega-typings';
import { DataNames, SignalNames } from '../constants';
import { topLookup } from '../top';

export default function (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const categoricalColor = columns.color && !columns.color.quantitative;
    const data = allTruthy<Data>(
        [
            {
                "name": DataNames.Main,
                "transform": allTruthy<Transforms>([
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
                    columns.x.quantitative && {
                        "type": "bin",
                        "field": columns.x.name,
                        "extent": {
                            "signal": "long_extent"
                        },
                        "maxbins": {
                            "signal": SignalNames.XBins
                        },
                        "nice": false,
                        "as": [
                            "long0",
                            "long1"
                        ],
                        "signal": "binXSignal"
                    },
                    columns.y.quantitative && {
                        "type": "bin",
                        "field": columns.y.name,
                        "extent": {
                            "signal": "lat_extent"
                        },
                        "nice": false,
                        "maxbins": {
                            "signal": SignalNames.YBins
                        },
                        "as": [
                            "lat0",
                            "lat1"
                        ],
                        "signal": "binYSignal"
                    }
                ])
            }
        ],
        columns.x.quantitative && [
            {
                "name": "xaxisdata",
                "transform": [
                    {
                        "type": "sequence",
                        "start": {
                            "signal": "binXSignal.start"
                        },
                        "stop": {
                            "signal": "binXSignal.stop"
                        },
                        "step": {
                            "signal": "binXSignal.step"
                        }
                    }
                ]
            }
        ],
        columns.y.quantitative && [
            {
                "name": "yaxisdata",
                "transform": [
                    {
                        "type": "sequence",
                        "start": {
                            "signal": "binYSignal.start"
                        },
                        "stop": {
                            "signal": "binYSignal.stop"
                        },
                        "step": {
                            "signal": "binYSignal.step"
                        }
                    }
                ]
            }
        ],
        categoricalColor && topLookup(columns.color, specViewOptions.maxLegends),
        [
            {
                "name": "stackedgroup",
                "source": categoricalColor ? DataNames.Legend : DataNames.Main,
                "transform": [
                    stackTransform(columns.sort, columns.x, columns.y),
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
                        "expr": `datum.s1 % ${SignalNames.XGridSize}`,
                        "as": "column"
                    },
                    {
                        "type": "formula",
                        "expr": `floor((datum.s1 % columns)/ ${SignalNames.XGridSize})`,
                        "as": "depth"
                    },
                    {
                        "type": "extent",
                        "signal": "rowxtent",
                        "field": "row"
                    }
                ]
            }
        ]
    );
    return data;
}

function stackTransform(sortColumn: Column, xColumn: Column, yColumn: Column) {
    const st: StackTransform = {
        "type": "stack",
        "groupby": [
            yColumn.quantitative ? "lat0" : yColumn.name,
            xColumn.quantitative ? "long0" : xColumn.name
        ],
        "as": [
            "s1",
            "s2"
        ]
    };
    if (sortColumn) {
        st.sort = {
            "field": sortColumn.name
        };
    }
    return st;
}