// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { collapseY, zeroIfCollapsed } from '../selection';
import {
    ScaleNameX,
    ScaleNameY,
    ScaleNameZ
} from '../constants';
import { fill } from '../fill';
import { NameSpace } from './namespace';
import { RectMark } from 'vega-typings';
import { SpecColumns, SpecViewOptions } from '../types';

export default function (namespace: NameSpace, columns: SpecColumns, specViewOptions: SpecViewOptions): RectMark[] {
    const mark: RectMark = {
        "type": "rect",
        "from": {
            "data": namespace.stacked
        },
        "encode": {
            "update": {
                "x": {
                    "scale": ScaleNameX,
                    "field": columns.x.quantitative ? "__bin0" : columns.x.name,
                    "offset": {
                        "scale": "xnewinternalscale",
                        "field": namespace.__column
                    }
                },
                "width": {
                    "scale": "xnewinternalscale",
                    "band": true
                },
                "y": collapseY(
                    {
                        "scale": ScaleNameY,
                        "field": namespace.__row,
                        "band": true,
                        "offset": {
                            "signal": `-bandwidth('${ScaleNameY}')-1`
                        }
                    }
                ),
                "height": zeroIfCollapsed(
                    {
                        "scale": ScaleNameY,
                        "band": true
                    }
                ),
                "fill": fill(columns.color, specViewOptions)
            }
        }
    };
    if (columns.z) {
        const update = mark.encode.update;
        update.z = {
            "value": 0
        };
        update.depth = zeroIfCollapsed({
            "scale": ScaleNameZ,
            "field": columns.z.name
        });
    }
    return [mark];
}
