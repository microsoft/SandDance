// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Axis } from 'vega-typings';
import { BarChartScaleNames, BarChartSignalNames } from './constants';
import { partialAxes } from '../axes';
import { ScaleNames } from '../constants';
import { SpecContext } from '../types';

export default function (context: SpecContext) {
    const { specColumns, specViewOptions } = context;
    const pa = partialAxes(specViewOptions, specColumns.x.quantitative, true);
    const axes: Axis[] = [
        {
            "scale": ScaleNames.X,
            "title": specColumns.x.name,
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
