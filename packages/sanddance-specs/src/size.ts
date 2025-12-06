/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { SpecContext } from './types.js';

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
