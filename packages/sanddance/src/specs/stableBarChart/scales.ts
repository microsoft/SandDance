// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import qualitativeScales from './scales.qualitative';
import quantitativeScales from './scales.quantitative';
import {
    ScaleNameColor,
    ColorScaleNone,
    DataName,
    ScaleNameY,
    ScaleNameZ,
    FieldNames,
    ZHeightSignal,
    ColorReverseSignal
} from '../constants';
import { Insight, SpecColumns } from '../types';
import { linearScale, pointScale, binnableColorScale } from '../scales';
import { NameSpace } from './namespace';
import { RangeScheme, Scale } from 'vega-typings';

export default function (namespace: NameSpace, insight: Insight, columns: SpecColumns) {
    const scales: Scale[] = [
        {
            "name": "xnewinternalscale",
            "type": "band",
            "range": [
                0,
                {
                    "signal": "xdesbandwidth"
                }
            ],
            "padding": 0.1,
            "domain": {
                "signal": "sequence(0, shapesPerRow+1, 1)"
            }
        },
        {
            "name": "yscalelabel",
            "range": [
                {
                    "signal": "height"
                },
                {
                    "signal": "0"
                }
            ],
            "round": true,
            "domain": {
                "data": namespace.stacked,
                "field": namespace.__row,
                "sort": true
            },
            "zero": true,
            "nice": true
        },
        {
            "name": ScaleNameY,
            "type": "band",
            "range": [
                {
                    "signal": "height"
                },
                {
                    "signal": "0"
                }
            ],
            "padding": 0.1,
            "round": true,
            "reverse": false,
            "align": 1,
            "domain": {
                "data": namespace.stacked,
                "field": namespace.__row,
                "sort": true
            }
        }
    ];
    if (columns.color) {
        if (columns.color.quantitative) {
            scales.push(binnableColorScale(insight.colorBin, namespace.nested, columns.color.name, insight.scheme));
        } else {
            scales.push(
                {
                    "name": ScaleNameColor,
                    "type": "ordinal",
                    "domain": {
                        "data": namespace.nested,
                        "field": FieldNames.Top,
                        "sort": true
                    },
                    "range": {
                        "scheme": insight.scheme || ColorScaleNone
                    },
                    "reverse": {"signal":ColorReverseSignal}
                }
            );
        }
    }
    if (columns.z) {
        const zRange: RangeScheme = [0, { "signal": ZHeightSignal }];
        scales.push(
            columns.z.quantitative ?
                linearScale(ScaleNameZ, DataName, columns.z.name, zRange, false, true)
                :
                pointScale(ScaleNameZ, DataName, zRange, columns.z.name)
        );
    }
    return scales.concat(columns.x.quantitative ? quantitativeScales(namespace, columns) : qualitativeScales(namespace, columns));
}