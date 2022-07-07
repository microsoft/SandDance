/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

export interface MousePosition {
    top: number;
    left: number;
}

function hasClientXY(e: MouseEvent | PointerEvent | Touch): MousePosition {
    if (e && e.clientX !== undefined && e.clientX !== undefined) {
        return { top: e.clientY, left: e.clientX };
    }
}

export function getPosition(e: MouseEvent | PointerEvent | TouchEvent): MousePosition {
    const xy = hasClientXY(e as MouseEvent | PointerEvent);
    if (xy) {
        return xy;
    }
    const te = e as TouchEvent;
    if (te?.touches) {
        for (let i = 0; i < te.touches.length; i++) {
            const xy = hasClientXY(te.touches[i]);
            if (xy) {
                return xy;
            }
        }
    }
    const el = e.target as HTMLElement;
    if (el && el.getClientRects) {
        return el.getClientRects()[0];
    }
}
