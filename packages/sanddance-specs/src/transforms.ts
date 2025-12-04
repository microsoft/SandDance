/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Column } from '@msrvida/chart-types';
import { ExtentTransform } from 'vega-typings';
import { safeFieldName } from './expr.js';

export function dataExtent(column: Column, signal: string): ExtentTransform {
    return {
        type: 'extent',
        field: safeFieldName(column.name),
        signal,
    };
}
