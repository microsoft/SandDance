// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
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
                    "x": { "field": FieldNames.TreemapStackX0 },
                    "y": { "field": FieldNames.TreemapStackY0 },
                    "x2": { "field": FieldNames.TreemapStackX1 },
                    "y2": { "field": FieldNames.TreemapStackY1 },
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
