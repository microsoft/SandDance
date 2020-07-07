// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SpecContext } from './types';

export function allowNoneForSize(specContext: SpecContext) {
    switch (specContext.insight.totalStyle) {
        case 'sum-strip':
        case 'sum-strip-percent':
        case 'sum-treemap':
            return false;
        default:
            //if totalStyle is blank, count is assumed
            return true;
    }
}
