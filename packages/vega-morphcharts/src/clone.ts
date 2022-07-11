/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import * as _deepmerge from 'deepmerge';
import { isPlainObject } from 'is-plain-object';

const deepmerge = ((_deepmerge as any).default || _deepmerge) as typeof _deepmerge;

export function clone<T extends object>(objectToClone: T) {
    if (!objectToClone) return objectToClone;
    return deepmerge.all([objectToClone]) as T;
}

const dontMerge = (destination, source) => source;

export function deepMerge<T>(...objectsToMerge: T[]) {
    const objects = objectsToMerge.filter(Boolean) as any as object[];
    return deepmerge.all(objects, { arrayMerge: dontMerge, isMergeableObject: isPlainObject }) as any as T;
}
