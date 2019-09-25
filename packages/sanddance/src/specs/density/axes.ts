// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Axis } from 'vega-typings';
import { partialAxes } from '../axes';
import { SpecContext } from '../types';

export default function (context: SpecContext) {
    const { columns, specViewOptions } = context;
    const pa = partialAxes(specViewOptions, columns.x.quantitative, columns.y.quantitative);
    const axes: Axis[] = [
        {
            "scale": "xscale",
            "title": columns.x.name,
            "bandPosition": 0.5,
            "grid": true,
            "labelFlush": true,
            ...pa.bottom as Axis
        },
        {
            "scale": "yscale",
            "title": columns.y.name,
            "bandPosition": columns.y.quantitative ? 0 : 0.5,
            "grid": true,
            "labelFlush": true,
            ...pa.left as Axis
        }
    ];
    return axes;
}
