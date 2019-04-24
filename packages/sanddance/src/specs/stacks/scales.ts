// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Insight, SpecColumns } from '../types';
import { Scale } from 'vega-typings';
import { binnableColorScale } from '../scales';
import { DataNames, ScaleNameColor, FieldNames, ColorScaleNone } from '../constants';

export default function (columns: SpecColumns, insight: Insight) {
    const scales: Scale[] = [
        {
            "name": "xband",
            "type": "band",
            "domain": {
                "data": DataNames.Main,
                "field": "long0",
                "sort": true
            },
            "range": [
                0,
                {
                    "signal": "width"
                }
            ],
            "padding": 0.05,
            "round": true
        },
        {
            "name": "yband",
            "type": "band",
            "reverse": true,
            "domain": {
                "data": DataNames.Main,
                "field": "lat0",
                "sort": true
            },
            "range": "height",
            "padding": 0.05,
            "round": true
        },
        {
            "name": "zband",
            "type": "band",
            "reverse": false,
            "domain": {
                "data": "stackedgroup",
                "field": "row",
                "sort": true
            },
            "align": 0.0,
            "range": [
                0,
                {
                    "signal": "height"
                }
            ],
            "padding": 0.1,
            "round": true
        },
        {
            "name": "xinternalscale",
            "type": "band",
            "range": [
                0,
                {
                    "signal": "xbandw"
                }
            ],
            "padding": {
                "signal": "x_padding"
            },
            "domain": {
                "data": "stackedgroup",
                "field": "column",
                "sort": true
            }
        },
        {
            "name": "yinternalscale",
            "type": "band",
            "range": [
                0,
                {
                    "signal": "ybandw"
                }
            ],
            "padding": {
                "signal": "x_padding"
            },
            "domain": {
                "data": "stackedgroup",
                "field": "depth",
                "sort": true
            }
        },
        {
            "name": "x",
            "type": "linear",
            "round": true,
            "nice": true,
            "zero": false,
            "domain": {
                "data": DataNames.Main,
                "field": columns.x.name
            },
            "range": "width"
        },
        {
            "name": "y",
            "type": "linear",
            "round": true,
            "nice": true,
            "zero": false,
            "domain": {
                "data": DataNames.Main,
                "field": columns.y.name
            },
            "range": "height"
        },
        {
            "name": "z",
            "type": "linear",
            "round": true,
            "nice": true,
            "zero": false,
            "domain": {
                "data": "stackedgroup",
                "field": "s1"
            },
            "range": [
                0,
                "height"
            ]
        }
    ];
    if (columns.color) {
        if (columns.color.quantitative) {
            scales.push(binnableColorScale(insight.colorBin, DataNames.Main, columns.color.name, insight.scheme));
        } else {
            scales.push(
                {
                    "name": ScaleNameColor,
                    "type": "ordinal",
                    "domain": {
                        "data": DataNames.Legend,
                        "field": FieldNames.Top,
                        "sort": true
                    },
                    "range": {
                        "scheme": insight.scheme || ColorScaleNone
                    }
                }
            );
        }
    }
    return scales;
}
