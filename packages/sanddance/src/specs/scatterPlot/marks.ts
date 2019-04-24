// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { collapseY, zeroIfCollapsed } from '../selection';
import {
    DataNames,
    ScaleNames,
    SignalNames
} from '../constants';
import { fill } from '../fill';
import { Mark } from 'vega-typings';
import { SpecColumns, SpecViewOptions } from '../types';

export default function (columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const categoricalColor = columns.color && !columns.color.quantitative;
    const marks: Mark[] = [
        {
            "type": "rect",
            "from": {
                "data": categoricalColor ? DataNames.Legend : DataNames.Main
            },
            "encode": {
                "update": {
                    "id": {
                        "field": columns.uid.name
                    },
                    "x": {
                        "scale": ScaleNames.X,
                        "field": columns.x.name,
                        "offset": 1
                    },
                    "width": { "signal": SignalNames.PointSize },
                    "y": collapseY(
                        {
                            "scale": ScaleNames.Y,
                            "field": columns.y.name,
                            "offset": {
                                "signal": `-${SignalNames.PointSize}`
                            }
                        }
                    ),
                    "height": zeroIfCollapsed(
                        { "signal": SignalNames.PointSize }
                    ),
                    "fill": fill(columns.color, specViewOptions)
                }
            }
        }
    ];
    if (columns.z) {
        const update = marks[0].encode.update;
        update.z = zeroIfCollapsed({
            "scale": ScaleNames.Z,
            "field": columns.z.name
        });
        update.depth = { "signal": SignalNames.PointSize };
    }
    return marks;
}
