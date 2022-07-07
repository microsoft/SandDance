/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { easeExpInOut } from 'd3-ease';

export function easing(t: number) {
    if (t === 0 || t === 1) return t;
    return easeExpInOut(t);
}
