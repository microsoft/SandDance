/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { IBounds } from '../interfaces';

export function outerBounds(b1: IBounds, b2: IBounds): IBounds {
    if (!b1 && !b2) return;
    if (!b1) return b2;
    if (!b2) return b1;
    const minProps = [
        'minBoundsX',
        'minBoundsY',
        'minBoundsZ',
    ];
    const maxProps = [
        'maxBoundsX',
        'maxBoundsY',
        'maxBoundsZ',
    ];
    const result = {} as IBounds;
    minProps.forEach(p => result[p] = notNull(Math.min, b1[p], b2[p]));
    maxProps.forEach(p => result[p] = notNull(Math.max, b1[p], b2[p]));
    return result;
}

function notNull(fn: (...values: number[]) => number, v1: number, v2: number) {
    if (v1 == null && v2 == null) return null;
    if (v1 == null) return v2;
    if (v2 == null) return v1;
    return fn(v1, v2);
}

export function increment(
    b: IBounds,
    minBoundsX: number,
    minBoundsY: number,
    minBoundsZ: number,
    maxBoundsX: number,
    maxBoundsY: number,
    maxBoundsZ: number,
) {
    return outerBounds(b, {
        minBoundsX,
        minBoundsY,
        minBoundsZ,
        maxBoundsX,
        maxBoundsY,
        maxBoundsZ,
    });
}
