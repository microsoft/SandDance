// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Axis } from 'vega-typings';
import { SpecColumns, SpecViewOptions } from '../types';

export default function (specViewOptions: SpecViewOptions, columns: SpecColumns) {
    const axes: Axis[] = [
        {
            "scale": "xband",
            "grid": true,
            "domain": false,
            "orient": "bottom",
            "tickCount": 5,
            "title": columns.x.name
        },
        {
            "scale": "yband",
            "grid": true,
            "domain": false,
            "orient": "left",
            "titlePadding": 5,
            "title": columns.y.name
        }
    ];
    return axes;
}
