// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FieldNames, ScaleNames } from '../constants';
import { fill } from '../fill';
import { RectMark } from 'vega-typings';
import { SpecContext } from '../types';
import { testForCollapseSelection } from '../selection';

export default function (context: SpecContext) {
    const { columns } = context;
    const mark: RectMark = {
        "type": "rect",
        "from": {
            "data": "aggregated"
        },
        "sort": {
            "field": [
                columns.x.name,
                columns.y.name
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
                    "field": columns.x.quantitative ? FieldNames.DensityXBin0 : columns.x.name,
                    "offset": {
                        "signal": `scale('sizescale', ((datum.${FieldNames.DensityRow}-1) % floor(sqrt(datum.${FieldNames.DensityCount}))))-scale('sizescale', sqrt(datum.${FieldNames.DensityCount})-2)/2`
                    }
                },
                "yc": {
                    "scale": "yscale",
                    "field": columns.y.quantitative ? FieldNames.DensityYBin0 : columns.y.name,
                    "offset": {
                        "signal": `scale('sizescale',height/width*floor(((datum.${FieldNames.DensityRow}-1) / floor(sqrt(datum.${FieldNames.DensityCount}))))) - scale('sizescale', height/width*sqrt(datum.${FieldNames.DensityCount})+2)/2`
                    }
                },
                "width": {
                    "signal": "unitsize"
                },
                "height": {
                    "signal": "height/width*unitsize"
                },
                "fill": fill(context)
            }
        }
    };
    if (columns.z) {
        const update = mark.encode.update;
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
                "field": columns.z.name
            }
        ];
    }
    return [mark];
}
