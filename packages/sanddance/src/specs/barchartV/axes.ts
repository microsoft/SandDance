// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { aggregateScale, shapesPerRow } from './constants';
import { Axis } from 'vega-typings';
import { partialAxes } from '../axes';
import { ScaleNames } from '../constants';
import { SpecColumns, SpecViewOptions } from '../types';

export default function (specViewOptions: SpecViewOptions, columns: SpecColumns) {
    const pa = partialAxes(specViewOptions, columns.x.quantitative, true);
    const axes: Axis[] = [
        {
            "scale": ScaleNames.X,
            "title": columns.x.name,
            ...pa.bottom as Axis
        },
        {
            "scale": aggregateScale,
            "title": specViewOptions.language.count,
            "encode": {
                "labels": {
                    "update": {
                        "text": {
                            "signal": `${shapesPerRow} * datum.value`
                        }
                    }
                }
            },
            ...pa.left as Axis
        }
    ];
    return axes;
}
