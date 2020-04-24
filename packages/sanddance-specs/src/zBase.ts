// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addScale } from './scope';
import { Column } from '@msrvida/chart-types';
import { GlobalScope } from './interfaces';
import { linearScale, pointScale } from './scales';
import { RangeScheme } from 'vega-typings';
import { SignalNames } from './constants';

export function addZScale(z: Column, zSize: string, globalScope: GlobalScope, zScaleName: string) {
    if (z) {
        const zRange: RangeScheme = [0, { signal: `(${zSize}) * ${SignalNames.ZProportion}` }];
        addScale(globalScope.scope, z.quantitative
            ?
            linearScale(zScaleName, globalScope.data.name, z.name, zRange, false, true)
            :
            pointScale(zScaleName, globalScope.data.name, zRange, z.name, false));
    }
}
