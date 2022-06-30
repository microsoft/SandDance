// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Position } from '@deck.gl/core';
import { lineZ } from './defaults';
import { Vec3 } from './interfaces';

export function zSwap(v3: Vec3 | Position) {
    const temp = -v3[1]; //negeative y to positive z
    if(v3[0]===lineZ) {
        v3[0] = 0;
    }
    v3[1] = v3[2];
    v3[2] = temp;
}
