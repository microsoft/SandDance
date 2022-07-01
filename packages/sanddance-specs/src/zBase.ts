// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SignalNames } from './constants';
import { linearScale, pointScale } from './scales';
import { Column } from '@msrvida/chart-types';
import { RangeScheme } from 'vega-typings';
import { safeFieldName } from './expr';

export function addZScale(z: Column, zSize: string, dataName: string, zScaleName: string) {
    if (z) {
        const zRange: RangeScheme = [0, { signal: `(${zSize}) * ${SignalNames.ZProportion}` }];
        const scale = z.quantitative
            ?
            linearScale(
                zScaleName,
                {
                    data: dataName,
                    field: safeFieldName(z.name),
                },
                zRange,
                false,
                true)
            :
            pointScale(zScaleName, dataName, zRange, z.name, false)
            ;
        return scale;
    }
}
