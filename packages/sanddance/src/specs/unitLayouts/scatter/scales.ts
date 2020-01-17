// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DataNames, ScaleNames, SignalNames } from '../../constants';
import { linearScale, pointScale } from '../../scales';
import { RangeScheme, Scale } from 'vega-typings';
import { SpecContext } from '../../types';

export default function (context: SpecContext) {
    const { specColumns } = context;
    const heightRange: RangeScheme = [{ signal: 'child_height' }, 0];
    const widthRange: RangeScheme = [0, { signal: 'child_width' }];
    const scales: Scale[] = [
        (
            specColumns.x.quantitative ?
                linearScale(ScaleNames.X, DataNames.Main, specColumns.x.name, widthRange, false, false)
                :
                pointScale(ScaleNames.X, DataNames.Main, widthRange, specColumns.x.name)
        ),
        (
            specColumns.y.quantitative ?
                linearScale(ScaleNames.Y, DataNames.Main, specColumns.y.name, heightRange, false, false)
                :
                pointScale(ScaleNames.Y, DataNames.Main, heightRange, specColumns.y.name, true)
        )
    ];
    return scales;
}
