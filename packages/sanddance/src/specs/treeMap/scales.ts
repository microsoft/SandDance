// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnableColorScale, linearScale, pointScale } from '../scales';
import {
    ColorScaleNone,
    DataNames,
    FieldNames,
    ScaleNames,
    SignalNames
} from '../constants';
import { RangeScheme, Scale } from 'vega-typings';
import { SpecContext } from '../types';

export default function (context: SpecContext) {
    const { columns, insight } = context;
    const scales: Scale[] = [];
    if (columns.color && !columns.color.isColorData) {
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
                    "reverse": { "signal": SignalNames.ColorReverse }
                }
            );
        }
    }
    if (columns.z) {
        const zRange: RangeScheme = [0, { "signal": SignalNames.ZHeight }];
        scales.push(
            columns.z.quantitative ?
                linearScale(ScaleNames.Z, DataNames.Main, columns.z.name, zRange, false, false)
                :
                pointScale(ScaleNames.Z, DataNames.Main, zRange, columns.z.name)
        );
    }
    return scales;
}
