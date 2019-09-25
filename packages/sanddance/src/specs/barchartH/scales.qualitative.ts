// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { BarChartScaleNames } from './constants';
import { NameSpace } from './namespace';
import { Scale } from 'vega-typings';
import { ScaleNames } from '../constants';
import { SpecContext } from '../types';

export default function (context: SpecContext, namespace: NameSpace) {
    const { columns } = context;
    const scales: Scale[] = [
        {
            "name": BarChartScaleNames.bucketScale,
            "type": "band",
            "range": "height",
            "domain": {
                "data": namespace.bucket,
                "field": columns.y.name,
                "sort": true
            }
        },
        {
            "name": ScaleNames.Y,
            "type": "band",
            "range": [
                0,
                {
                    "signal": "height"
                }
            ],
            "padding": 0.01,
            "domain": {
                "data": namespace.stacked,
                "field": columns.y.name,
                "sort": true
            },
            "reverse": true
        }
    ];
    return scales;
}