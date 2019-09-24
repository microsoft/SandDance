// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnableColorScale } from '../scales';
import {
    ColorScaleNone,
    DataNames,
    FieldNames,
    ScaleNames,
    SignalNames
} from '../constants';
import { Insight, SpecColumns } from '../types';
import { Scale } from 'vega-typings';

export default function (columns: SpecColumns, insight: Insight) {
    const scales: Scale[] = [
        {
            "name": "xband",
            "type": "band",
            "domain": columns.x.quantitative ?
                {
                    "data": "xaxisdata",
                    "field": "data",
                    "sort": true
                }
                :
                {
                    "data": DataNames.Main,
                    "field": columns.x.quantitative ? FieldNames.StacksLongBin0 : columns.x.name,
                    "sort": true
                },
            "range": [
                0,
                {
                    "signal": "width"
                }
            ],
            "padding": { "signal": SignalNames.OuterPadding },
            "round": true
        },
        {
            "name": "yband",
            "type": "band",
            "reverse": true,
            "domain": columns.y.quantitative ?
                {
                    "data": "yaxisdata",
                    "field": "data",
                    "sort": true
                }
                :
                {
                    "data": DataNames.Main,
                    "field": columns.y.quantitative ? FieldNames.StacksLatBin0 : columns.y.name,
                    "sort": true
                },
            "range": "height",
            "padding": { "signal": SignalNames.OuterPadding },
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
                    "signal": "countheight"
                }
            ],
            "padding": { "signal": SignalNames.InnerPadding },
            "round": false
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
                "signal": SignalNames.InnerPadding
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
                "signal": SignalNames.InnerPadding
            },
            "domain": {
                "data": "stackedgroup",
                "field": "depth",
                "sort": true
            }
        }
    ];
    if (columns.color && !columns.color.isColorData) {
        if (columns.color.quantitative) {
            scales.push(binnableColorScale(insight.colorBin, DataNames.Main, columns.color.name, insight.scheme));
        } else {
            scales.push(
                {
                    "name": ScaleNames.Color,
                    "type": "ordinal",
                    "domain": {
                        "data": DataNames.Legend,
                        "field": FieldNames.Top,
                        "sort": true
                    },
                    "range": {
                        "scheme": insight.scheme || ColorScaleNone
                    },
                    "reverse": { "signal": SignalNames.ColorReverse }
                }
            );
        }
    }
    return scales;
}
