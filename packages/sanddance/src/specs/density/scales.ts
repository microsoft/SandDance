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
            "name": "xscale",
            "type": "point",
            "domain": {
                "data": DataNames.Main,
                "field": columns.x.name,
                "sort": true
            },
            "range": "width",
            "padding": 0.5
        },
        {
            "name": "yscale",
            "type": "point",
            "domain": {
                "data": DataNames.Main,
                "field": columns.y.name
            },
            "range": "height",
            "padding": 0.5
        },
        {
            "name": "sizescale",
            "type": "linear",
            "domain": [
                0,
                {
                    "signal": "sqrt(cextent[1])"
                }
            ],
            "range": [
                0,
                {
                    "signal": "width/max(xsize,ysize)"
                }
            ]
        }
    ];
    if (columns.color) {
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
