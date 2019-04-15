// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Cube } from './interfaces';

export function patchCubeArray(allocatedSize: number, empty: Partial<Cube>, cubes: Cube[]) {
    const patched: Cube[] = new Array<Cube>(allocatedSize);
    patched.fill(empty as Cube);

    cubes.forEach(cube => patched[cube.ordinal] = cube);

    return patched;
}
