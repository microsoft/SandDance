// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Axis } from 'vega-typings';
import { columnToAxisType, partialAxes } from '../../axes';
import { ScaleNames } from '../../constants';
import { SpecContext } from '../../types';

export default function (context: SpecContext) {
    const { specColumns, specViewOptions } = context;
    const pa = partialAxes(specViewOptions, columnToAxisType(specColumns.x), columnToAxisType(specColumns.y));
    const axes: Axis[] = [
        {
            scale: ScaleNames.X,
            title: specColumns.x.name,
            ...pa.bottom as Axis
        },
        {
            scale: ScaleNames.Y,
            title: specColumns.y.name,
            ...pa.left as Axis
        }
    ];
    return axes;
}
