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
                        "type": "formula",
                        "as": "ff_field1",
                        "expr": `datum[${JSON.stringify(columns.x.name)}]`
                    },
                    {
                        "type": "formula",
                        "as": "ff_field2",
                        "expr": `datum[${JSON.stringify(columns.y.name)}]`
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
                "name": "aggregated",
                "source": categoricalColor ? DataNames.Legend : DataNames.Main,
                "transform": [
                    {
                        "type": "joinaggregate",
                        "groupby": [
                            "ff_field1",
                            "ff_field2"
                        ],
                        "ops": [
                            "count"
                        ],
                        "as": [
                            "count"
                        ]
                    },
                    windowTransform(columns.sort),
                    {
                        "type": "extent",
                        "field": "s1",
                        "signal": "cextent"
                    }
                ]
            }
        ]
    );
    return data;
}

function windowTransform(sortColumn: Column) {
    const t: Transforms = {
        "type": "window",
        "groupby": [
            "ff_field1",
            "ff_field2"
        ],
        "ops": [
            "row_number"
        ],
        "as": [
            "s1"
        ]
    };
    if (sortColumn) {
        t.sort = {
            "field": [sortColumn.name],
            "order": [
                "ascending"
            ]
        };
    }
    return t;
}
