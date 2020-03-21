// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ensureSearchExpressionGroupArray } from './group';
import { Search } from './types';

export function narrow(a: Search, b: Search) {
    if (!a) {
        return b;
    }
    let arrs = [a, b].map(ensureSearchExpressionGroupArray);
    let [arrA, arrB] = arrs;
    arrB[0].clause = '&&';
    return arrA.concat(arrB);
}
