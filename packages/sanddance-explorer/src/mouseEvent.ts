// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export interface MousePosition {
    top: number;
    left: number;
}

function hasClientXY(e: MouseEvent | PointerEvent | Touch) {
    if (e && e.clientX !== undefined && e.clientX !== undefined) {
        return { top: e.clientY, left: e.clientX };
    }
}

export function getPosition(e: MouseEvent | PointerEvent | TouchEvent): MousePosition {
    let xy = hasClientXY(e as MouseEvent | PointerEvent);
    if (xy) {
        return xy;
    }
    const te = e as TouchEvent;
    if (te) {
        for (let i = 0; i < te.touches.length; i++) {
            let xy = hasClientXY(te.touches[i]);
            if (xy) {
                return xy;
            }
        }
    }
}
