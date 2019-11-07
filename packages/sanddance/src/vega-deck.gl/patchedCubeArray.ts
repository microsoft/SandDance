// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Shape } from './interfaces';

export function patchShapeArray(allocatedSize: number, empty: Partial<Shape>, shapes: Shape[]) {
    const patched: Shape[] = new Array<Shape>(allocatedSize);
    patched.fill(empty as Shape);

    shapes.forEach(shape => patched[shape.ordinal] = shape);

    return patched;
}
