// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ScaleNames } from '../constants';
import { NameSpace } from './namespace';
import { Scale } from 'vega-typings';
import { SpecColumns } from '../types';
import { xscaleavailable } from './constants';

export default function (namespace: NameSpace, columns: SpecColumns) {
    const scales: Scale[] = [
        {
            "name": xscaleavailable,
            "type": "band",
            "range": "width",
            "domain": {
                "data": namespace.nested,
                "field": columns.x.name,
                "sort": true
            }
        },
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
                "data": namespace.stacked,
                "field": columns.x.name,
                "sort": true
            }
        }
    ];
    return scales;
}