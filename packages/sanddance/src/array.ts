// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

/**
 * Returns array with items which are truthy.
 * @param args array or arrays to concat into a single array.
 */
export function allTruthy<T>(...args: T[][]) {
    return args.reduce((p, c) => c ? p.concat(c) : p, []).filter(Boolean);
}

export function push<T>(arr: T[], items: T[]) {
    arr.push.apply(arr, items);
}
