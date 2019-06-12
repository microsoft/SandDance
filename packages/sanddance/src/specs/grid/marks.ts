// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ColumnCount } from './constants';
import { FieldNames, ScaleNames } from '../constants';
import { fill } from '../fill';
import { Mark } from 'vega-typings';
import { SpecColumns, SpecViewOptions } from '../types';
import { zeroIfCollapsed } from '../selection';

export default function (data: string, columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const marks: Mark[] = [
        {
            "type": "rect",
            "from": {
                data
            },
            "encode": {
                "update": {
                    "x": {
                        "signal": `(datum['${FieldNames.Index}']-1)%${ColumnCount}`,
                        "scale": ScaleNames.X
                    },
                    "width": {
                        "scale": ScaleNames.X,
                        "band": true
                    },
                    "y": {
                        "signal": `floor((datum['${FieldNames.Index}']-1)/${ColumnCount})`,
                        "scale": ScaleNames.Y
                    },
                    "height": {
                        "scale": ScaleNames.Y,
                        "band": true
                    },
                    "fill": fill(columns.color, specViewOptions)
                }
            }
        }
    ];
    if (columns.z) {
        const update = marks[0].encode.update;
        update.z = {
            "value": 0
        };
        update.depth = zeroIfCollapsed({
            "scale": ScaleNames.Z,
            "field": columns.z.name
        });
    }
    return marks;
}
