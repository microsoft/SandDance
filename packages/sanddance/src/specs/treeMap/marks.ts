// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FieldNames, ScaleNames } from '../constants';
import { fill } from '../fill';
import { Mark } from 'vega-typings';
import { SpecContext } from '../types';
import { testForCollapseSelection } from '../selection';

export default function (context: SpecContext, data: string) {
    const { specColumns } = context;
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
                    "fill": fill(context)
                }
            }
        }
    ];
    if (specColumns.z) {
        const update = marks[0].encode.update;
        update.z = {
            "value": 0
        };
        update.depth = [
            {
                "test": testForCollapseSelection(),
                "value": 0
            },
            {
                "scale": ScaleNames.Z,
                "field": specColumns.z.name
            }
        ];
    }
    return marks;
}
