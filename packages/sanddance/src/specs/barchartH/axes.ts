// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Axis } from 'vega-typings';
import { AxisType, columnToAxisType, partialAxes } from '../axes';
import { BarChartScaleNames, BarChartSignalNames } from './constants';
import { ScaleNames } from '../constants';
import { SpecContext } from '../types';

export default function (context: SpecContext) {
    const { specColumns, specViewOptions } = context;
    const pa = partialAxes(specViewOptions, AxisType.quantitative, columnToAxisType(specColumns.y));
    const axes: Axis[] = [
        {
            scale: ScaleNames.Y,
            title: specColumns.y.name,
            ...pa.left as Axis
        },
        {
            scale: BarChartScaleNames.levelScale,
            title: specViewOptions.language.count,
            encode: {
                labels: {
                    update: {
                        text: {
                            signal: `${BarChartSignalNames.compartmentsPerLevelSignal} * datum.value`
                        }
                    }
                }
            },
            ...pa.bottom as Axis
        }
    ];
    return axes;
}
