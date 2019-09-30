// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DataNames, ScaleNames } from '../constants';
import { Scale } from 'vega-typings';

export default function () {
    const scales: Scale[] = [
        {
            name: ScaleNames.Y,
            type: 'band',
            range: [
                0,
                {
                    signal: 'height'
                }
            ],
            padding: 0.01,
            domain: {
                data: DataNames.QuantitativeData,
                field: 'data',
                sort: true
            },
            reverse: true
        }
    ];
    return scales;
}