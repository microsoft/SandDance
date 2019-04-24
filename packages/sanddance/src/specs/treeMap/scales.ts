// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnableColorScale, linearScale, pointScale } from '../scales';
import {
    ColorScaleName,
    ColorScaleNone,
    DataName,
    LegendDataName,
    MainZScale,
    FieldNameTop,
    ZHeightSignal
} from '../constants';
import { Insight, SpecColumns } from '../types';
import { RangeScheme, Scale } from 'vega-typings';

export default function (columns: SpecColumns, insight: Insight) {
    const scales: Scale[] = [];
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
                        "field": FieldNameTop,
                        "sort": true
                    },
                    "range": {
                        "scheme": insight.scheme || ColorScaleNone
                    }
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
