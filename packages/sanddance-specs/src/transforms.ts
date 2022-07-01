// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column } from '@msrvida/chart-types';
import { ExtentTransform } from 'vega-typings';
import { safeFieldName } from './expr';

export function dataExtent(column: Column, signal: string): ExtentTransform {
    return {
        type: 'extent',
        field: safeFieldName(column.name),
        signal,
    };
}
