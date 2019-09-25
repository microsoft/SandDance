// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy } from '../../array';
import { Data, Transforms } from 'vega-typings';
import { DataNames, FieldNames, SignalNames } from '../constants';
import { SpecColumns, SpecContext } from '../types';
import { topLookup } from '../top';

export default function (context: SpecContext) {
    const { specColumns, specViewOptions } = context;
    const categoricalColor = specColumns.color && !specColumns.color.quantitative;
    const data = allTruthy<Data>(
        [
            {
                "name": DataNames.Main,
                "transform": allTruthy<Transforms>(
                    specColumns.x.quantitative && [
                        {
                            "type": "extent",
                            "field": specColumns.x.name,
                            "signal": "var_Xextent"
                        },
                        {
                            "type": "bin",
                            "field": specColumns.x.name,
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
                    specColumns.y.quantitative && [
                        {
                            "type": "extent",
                            "field": specColumns.y.name,
                            "signal": "var_Yextent"
                        },
                        {
                            "type": "bin",
                            "field": specColumns.y.name,
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
        specColumns.x.quantitative && [
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
        specColumns.y.quantitative && [
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
        categoricalColor && topLookup(specColumns.color, specViewOptions.maxLegends),
        [
            {
                "name": "aggregated",
                "source": categoricalColor ? DataNames.Legend : DataNames.Main,
                "transform": [
                    {
                        "type": "joinaggregate",
                        "groupby": [
                            specColumns.x.quantitative ? FieldNames.DensityXBin0 : specColumns.x.name,
                            specColumns.y.quantitative ? FieldNames.DensityYBin0 : specColumns.y.name
                        ],
                        "ops": [
                            "count"
                        ],
                        "as": [
                            FieldNames.DensityCount
                        ]
                    },
                    windowTransform(specColumns),
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
