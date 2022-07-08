/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Components, Core } from 'morphcharts';
import { vec3 } from 'gl-matrix';
import { IBounds } from '../interfaces';

export function getImageData(url: string) {
    return new Promise<ImageData>((resolve, reject) => {
        const imageElement = document.createElement('img');
        imageElement.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const { height, width } = imageElement;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(imageElement, 0, 0);
            resolve(ctx.getImageData(0, 0, width, height));
        };
        imageElement.src = url;
    });
}

export function createImageQuad(core: Core, imageData: ImageData, bounds: IBounds, position: vec3, width: number, height: number) {
    const { maxBoundsX, maxBoundsY, maxBoundsZ, minBoundsX, minBoundsY, minBoundsZ } = bounds;
    const imageOptions: Components.IImageQuadOptions = {
        imageData,
        position,
        height,
        width,
        minBoundsX,
        maxBoundsX,
        minBoundsZ,
        maxBoundsZ,
        minBoundsY,
        maxBoundsY,
    };
    return new Components.ImageQuad(core, imageOptions);
}
