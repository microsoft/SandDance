// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import {
    Insight,
    SpecColumns,
    SpecViewOptions
} from '../types';
import { Data, Transforms } from 'vega-typings';
import { DataNames, FieldNames, SignalNames } from '../constants';
import { topLookup } from '../top';

export default function (insight: Insight, columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const categoricalColor = columns.color && !columns.color.quantitative;
    const data = allTruthy<Data>(
        [
            {
                "name": DataNames.Main,
                "transform": allTruthy<Transforms>(
                    columns.x.quantitative && [
                        {
                            "type": "extent",
                            "field": columns.x.name,
                            "signal": "var_Xextent"
                        },
                        {
                            "type": "bin",
                            "field": columns.x.name,
                            "extent": {
                                "signal": "var_Xextent"
                            },
                            "maxbins": {
                                "signal": SignalNames.XBins
                            },
                            "as": [
                                FieldNames.DensityXBin0,
                                FieldNames.DensityXBin1
                            ],
                            "signal": "binXSignal"
                        }
                    ],
                    columns.y.quantitative && [
                        {
                            "type": "extent",
                            "field": columns.y.name,
                            "signal": "var_Yextent"
                        },
                        {
                            "type": "bin",
                            "field": columns.y.name,
                            "extent": {
                                "signal": "var_Yextent"
                            },
                            "maxbins": {
                                "signal": SignalNames.YBins
                            },
                            "as": [
                                FieldNames.DensityYBin0,
                                FieldNames.DensityYBin1
                            ],
                            "signal": "binYSignal"
                        }
                    ]
                )
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
                            columns.x.quantitative ? FieldNames.DensityXBin0 : columns.x.name,
                            columns.y.quantitative ? FieldNames.DensityYBin0 : columns.y.name
                        ],
                        "ops": [
                            "count"
                        ],
                        "as": [
                            FieldNames.DensityCount
                        ]
                    },
                    windowTransform(columns),
                    {
                        "type": "extent",
                        "field": FieldNames.DensityRow,
                        "signal": "cextent"
                    }
                ]
            }
        ]
    );
    return data;
}

function windowTransform(columns: SpecColumns) {
    const t: Transforms = {
        "type": "window",
        "groupby": [
            columns.x.quantitative ? FieldNames.DensityXBin0 : columns.x.name,
            columns.y.quantitative ? FieldNames.DensityYBin0 : columns.y.name
        ],
        "ops": [
            "row_number"
        ],
        "as": [
            FieldNames.DensityRow
        ]
    };
    if (columns.sort) {
        t.sort = {
            "field": [columns.sort.name],
            "order": [
                "descending"
            ]
        };
    }
    return t;
}
