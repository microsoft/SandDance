// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

/**
 * Types of camera views.
 */
export type View = '2d' | '3d';

/**
 * Rectangle size.
 */
export interface Size {
    height: number;
    width: number;
}

/**
 * Camera setting.
 */
export interface Camera {
    position: [number, number, number];
    rotation: [number, number, number, number];
    captureSize: Size;
}
