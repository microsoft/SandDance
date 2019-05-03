// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { fill } from '../fill';
import { Mark } from 'vega-typings';
import { SpecColumns, SpecViewOptions } from '../types';

export default function (columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const marks: Mark[] = [
        {
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
                        "field": "ff_field1",
                        "offset": {
                            "signal": "scale('sizescale', ((datum.s1-1) % floor(sqrt(datum.count))))-scale('sizescale', sqrt(datum.count)-2)/2"
                        }
                    },
                    "yc": {
                        "scale": "yscale",
                        "field": "ff_field2",
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
        }
    ];
    return marks;
}
