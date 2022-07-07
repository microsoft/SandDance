/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { ensureSearchExpressionGroupArray } from './group';
import { Search } from './types';

export function narrow(a: Search, b: Search) {
    if (!a) {
        return b;
    }
    const arrs = [a, b].map(ensureSearchExpressionGroupArray);
    const [arrA, arrB] = arrs;
    arrB[0].clause = '&&';
    return arrA.concat(arrB);
}
