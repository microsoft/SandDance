// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SignalNames } from './constants';
import { GlobalScope } from './globalScope';
import { linearScale, pointScale } from './scales';
import { addScales } from './scope';
import { Column } from '@msrvida/chart-types';
import { RangeScheme } from 'vega-typings';

export function addZScale(z: Column, zSize: string, globalScope: GlobalScope, zScaleName: string) {
    if (z) {
        const zRange: RangeScheme = [0, { signal: `(${zSize}) * ${SignalNames.ZProportion}` }];
        addScales(globalScope.scope, z.quantitative
            ?
            linearScale(zScaleName, globalScope.data.name, z.name, zRange, false, true)
            :
            pointScale(zScaleName, globalScope.data.name, zRange, z.name, false));
    }
}
