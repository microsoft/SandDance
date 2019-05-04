// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnableColorScale, linearScale, pointScale } from '../scales';
import {
    ColorScaleNone,
    DataNames,
    FieldNames,
    ScaleNames,
    SignalNames
} from '../constants';
import { Insight, SpecColumns } from '../types';
import { RangeScheme, Scale } from 'vega-typings';

export default function (columns: SpecColumns, insight: Insight) {
    const scales: Scale[] = [
        {
            "name": "xscale",
            "type": "point",
            "domain": columns.x.quantitative ?
                {
                    "data": "xaxisdata",
                    "field": "data",
                    "sort": true
                }
                :
                {
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
            "domain": columns.y.quantitative ?
                {
                    "data": "yaxisdata",
                    "field": "data",
                    "sort": true
                }
                :
                {
                    "data": DataNames.Main,
                    "field": columns.y.name,
                    "sort": true
                },
            "range": "height",
            "reverse": true,
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
    if (columns.z) {
        const zRange: RangeScheme = [0, { "signal": SignalNames.ZHeight }];
        scales.push(
            columns.z.quantitative ?
                linearScale(ScaleNames.Z, DataNames.Main, columns.z.name, zRange, false, true)
                :
                pointScale(ScaleNames.Z, DataNames.Main, zRange, columns.z.name)
        );
    }
    return scales;
}
