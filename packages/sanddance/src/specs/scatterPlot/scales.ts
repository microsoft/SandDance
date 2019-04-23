// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnableColorScale, linearScale, pointScale } from '../scales';
import {
    ColorScaleName,
    ColorScaleNone,
    DataName,
    LegendDataName,
    MainXScale,
    MainYScale,
    MainZScale,
    TopFieldName,
    ZHeightSignal,
    ColorReverseSignal
} from '../constants';
import { Insight, SpecColumns } from '../types';
import { RangeScheme, Scale } from 'vega-typings';

export default function (columns: SpecColumns, insight: Insight) {
    const scales: Scale[] = [
        (
            columns.x.quantitative ?
                linearScale(MainXScale, DataName, columns.x.name, "width", false, false)
                :
                pointScale(MainXScale, DataName, "width", columns.x.name)
        ),
        (
            columns.y.quantitative ?
                linearScale(MainYScale, DataName, columns.y.name, "height", false, false)
                :
                pointScale(MainYScale, DataName, "height", columns.y.name)
        )
    ];
    if (columns.color) {
        if (columns.color.quantitative) {
            scales.push(binnableColorScale(insight.colorBin, DataName, columns.color.name, insight.scheme));
        } else {
            scales.push(
                {
                    "name": ColorScaleName,
                    "type": "ordinal",
                    "domain": {
                        "data": LegendDataName,
                        "field": TopFieldName,
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
                linearScale(MainZScale, DataName, columns.z.name, zRange, false, false)
                :
                pointScale(MainZScale, DataName, zRange, columns.z.name)
        );
    }
    return scales;
}
