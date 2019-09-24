// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DataNames, ScaleNames } from '../constants';
import { Scale } from 'vega-typings';

export default function () {
    const scales: Scale[] = [
        {
            "name": ScaleNames.X,
            "type": "band",
            "range": [
                0,
                {
                    "signal": "width"
                }
            ],
            "padding": 0.01,
            "domain": {
                "data": DataNames.QuantitativeData,
                "field": "data",
                "sort": true
            }
        }
    ];
    return scales;
}