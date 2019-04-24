// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { collapseY, zeroIfCollapsed } from '../selection';
import {
    DataName,
    DataNameLegend,
    ScaleNameX,
    ScaleNameY,
    ScaleNameZ,
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
                "data": categoricalColor ? DataNameLegend : DataName
            },
            "encode": {
                "update": {
                    "id": {
                        "field": columns.uid.name
                    },
                    "x": {
                        "scale": ScaleNameX,
                        "field": columns.x.name,
                        "offset": 1
                    },
                    "width": { "signal": PointSizeSignal },
                    "y": collapseY(
                        {
                            "scale": ScaleNameY,
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
            "scale": ScaleNameZ,
            "field": columns.z.name
        });
        update.depth = { "signal": PointSizeSignal };
    }
    return marks;
}
