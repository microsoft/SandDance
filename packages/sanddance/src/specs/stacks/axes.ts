// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Axis } from 'vega-typings';
import { columnToAxisType, partialAxes } from '../axes';
import { SpecContext } from '../types';

export default function (context: SpecContext) {
    const { specColumns, specViewOptions } = context;
    const pa = partialAxes(specViewOptions, columnToAxisType(specColumns.x), columnToAxisType(specColumns.y));
    const axes: Axis[] = [
        {
            scale: 'xband',
            title: specColumns.x.name,
            bandPosition: 0.5,
            grid: true,
            labelFlush: true,
            ...pa.bottom as Axis
        },
        {
            scale: 'yband',
            title: specColumns.y.name,
            bandPosition: specColumns.y.quantitative ? 0 : 0.5,
            grid: true,
            labelFlush: true,
            ...pa.left as Axis
        }
    ];
    return axes;
}
