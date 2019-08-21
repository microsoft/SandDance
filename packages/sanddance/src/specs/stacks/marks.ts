// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FieldNames } from '../constants';
import { fill } from '../fill';
import { Mark } from 'vega-typings';
import { SpecColumns, SpecViewOptions } from '../types';

export default function (columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const marks: Mark[] = [
        {
            "name": "marks2",
            "type": "rect",
            "from": {
                "data": "stackedgroup"
            },
            "encode": {
                "update": {
                    "x": {
                        "scale": "xband",
                        "field": columns.x.quantitative ? FieldNames.StacksLongBin0 : columns.x.name,
                        "offset": {
                            "scale": "xinternalscale",
                            "field": "column"
                        }
                    },
                    "y": {
                        "scale": "yband",
                        "field": columns.y.quantitative ? FieldNames.StacksLatBin0 : columns.y.name,
                        "offset": {
                            "scale": "yinternalscale",
                            "field": "depth"
                        }
                    },
                    "z": {
                        "scale": "zband",
                        "field": "row"
                    },
                    "depth": {
                        "scale": "zband",
                        "band": true
                    },
                    "width": {
                        "signal": "actsize"
                    },
                    "height": {
                        "signal": "actsize"
                    },
                    "fill": fill(columns.color, specViewOptions)
                }
            }
        }
    ];
    return marks;
}
