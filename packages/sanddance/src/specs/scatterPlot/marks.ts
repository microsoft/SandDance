// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { collapseY, zeroIfCollapsed } from '../selection';
import {
    DataName,
    LegendDataName,
    MainXScale,
    MainYScale,
    MainZScale,
    PointSizeSignal
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
                "data": categoricalColor ? LegendDataName : DataName
            },
            "encode": {
                "update": {
                    "id": {
                        "field": columns.uid.name
                    },
                    "x": {
                        "scale": MainXScale,
                        "field": columns.x.name,
                        "offset": 1
                    },
                    "width": { "signal": PointSizeSignal },
                    "y": collapseY(
                        {
                            "scale": MainYScale,
                            "field": columns.y.name,
                            "offset": {
                                "signal": `-${PointSizeSignal}`
                            }
                        }
                    ),
                    "height": zeroIfCollapsed(
                        { "signal": PointSizeSignal }
                    ),
                    "fill": fill(columns.color, specViewOptions)
                }
            }
        }
    ];
    if (columns.z) {
        const update = marks[0].encode.update;
        update.z = zeroIfCollapsed({
            "scale": MainZScale,
            "field": columns.z.name
        });
        update.depth = { "signal": PointSizeSignal };
    }
    return marks;
}
