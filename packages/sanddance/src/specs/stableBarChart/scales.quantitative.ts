// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ScaleNameX } from '../constants';
import { NameSpace } from './namespace';
import { Scale } from 'vega-typings';
import { SpecColumns } from '../types';

export default function (namespace: NameSpace, columns: SpecColumns) {
    const scales: Scale[] = [
        {
            "name": "xscaleavailable",
            "type": "band",
            "range": "width",
            "domain": {
                "data": namespace.nested,
                "field": "__bin0",
                "sort": true
            }
        },
        {
            "name": ScaleNameX,
            "type": "band",
            "range": [
                0,
                {
                    "signal": "width"
                }
            ],
            "padding": 0.01,
            "domain": {
                "data": namespace.nested,
                "field": "__bin0",
                "sort": true
            }
        }
    ];
    return scales;
}