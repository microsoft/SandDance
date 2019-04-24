// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnableColorScale, linearScale, pointScale } from '../scales';
import {
    ScaleNames,
    ColorScaleNone,
    DataNames,
    FieldNames,
    ZHeightSignal,
    ColorReverseSignal
} from '../constants';
import { Insight, SpecColumns } from '../types';
import { RangeScheme, Scale } from 'vega-typings';

export default function (columns: SpecColumns, insight: Insight) {
    const scales: Scale[] = [
        (
            columns.x.quantitative ?
                linearScale(ScaleNames.X, DataNames.Main, columns.x.name, "width", false, false)
                :
                pointScale(ScaleNames.X, DataNames.Main, "width", columns.x.name)
        ),
        (
            columns.y.quantitative ?
                linearScale(ScaleNames.Y, DataNames.Main, columns.y.name, "height", false, false)
                :
                pointScale(ScaleNames.Y, DataNames.Main, "height", columns.y.name)
        )
    ];
    if (columns.color) {
        if (columns.color.quantitative) {
            scales.push(binnableColorScale(insight.colorBin, DataNames.Main, columns.color.name, insight.scheme));
        } else {
            scales.push(
                {
                    "name": ScaleNames.Color,
                    "type": "ordinal",
                    "domain": {
                        "data": DataNames.Legend,
                        "field": FieldNames.Top,
                        "sort": true
                    },
                    "range": {
                        "scheme": insight.scheme || ColorScaleNone
                    },
                    "reverse": {"signal": ColorReverseSignal}
                }
            );
        }
    }
    if (columns.z) {
        const zRange: RangeScheme = [0, { "signal": ZHeightSignal }];
        scales.push(
            columns.z.quantitative ?
                linearScale(ScaleNames.Z, DataNames.Main, columns.z.name, zRange, false, false)
                :
                pointScale(ScaleNames.Z, DataNames.Main, zRange, columns.z.name)
        );
    }
    return scales;
}
