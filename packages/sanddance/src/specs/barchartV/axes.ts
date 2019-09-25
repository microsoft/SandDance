// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Axis } from 'vega-typings';
import { BarChartScaleNames, BarChartSignalNames } from './constants';
import { partialAxes } from '../axes';
import { ScaleNames } from '../constants';
import { SpecContext } from '../types';

export default function (context: SpecContext) {
    const { columns, specViewOptions } = context;
    const pa = partialAxes(specViewOptions, columns.x.quantitative, true);
    const axes: Axis[] = [
        {
            "scale": ScaleNames.X,
            "title": columns.x.name,
            ...pa.bottom as Axis
        },
        {
            "scale": BarChartScaleNames.levelScale,
            "title": specViewOptions.language.count,
            "encode": {
                "labels": {
                    "update": {
                        "text": {
                            "signal": `${BarChartSignalNames.compartmentsPerLevelSignal} * datum.value`
                        }
                    }
                }
            },
            ...pa.left as Axis
        }
    ];
    return axes;
}
