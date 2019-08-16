// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FieldNames, ScaleNames } from '../constants';
import { fill } from '../fill';
import { RectMark } from 'vega-typings';
import { SpecColumns, SpecViewOptions } from '../types';
import { zeroIfCollapsed } from '../selection';

export default function (columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const mark: RectMark = {
        "type": "rect",
        "from": {
            "data": "aggregated"
        },
        "sort": {
            "field": [
                "ff_field1",
                "ff_field2"
            ],
            "order": [
                "ascending",
                "ascending"
            ]
        },
        "encode": {
            "update": {
                "xc": {
                    "scale": "xscale",
                    "field": columns.x.quantitative ? FieldNames.DensityXBin0 : "ff_field1",
                    "offset": {
                        "signal": "scale('sizescale', ((datum.s1-1) % floor(sqrt(datum.count))))-scale('sizescale', sqrt(datum.count)-2)/2"
                    }
                },
                "yc": {
                    "scale": "yscale",
                    "field": columns.y.quantitative ? FieldNames.DensityYBin0 : "ff_field2",
                    "offset": {
                        "signal": "scale('sizescale',height/width*floor(((datum.s1-1) / floor(sqrt(datum.count))))) - scale('sizescale', height/width*sqrt(datum.count)+2)/2"
                    }
                },
                "width": {
                    "signal": "unitsize"
                },
                "height": {
                    "signal": "height/width*unitsize"
                },
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
            "scale": ScaleNames.Z,
            "field": columns.z.name
        });
    }
    return [mark];
}
