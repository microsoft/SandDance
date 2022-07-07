/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { BackgroundImage } from './types';
import { ImageMark } from 'vega-typings/types';
import { GlobalScales } from './interfaces';
import { bandScaleLinearSuffix } from './layouts/band';

export function getImageMark(backgroundImage: BackgroundImage, allGlobalScales: GlobalScales[]): ImageMark {
    const xScale = allGlobalScales.filter(s => s.scales.x)[0].scales.x[0];
    const yScale = allGlobalScales.filter(s => s.scales.y)[0].scales.y[0];
    const [xScaleName, yScaleName] = [xScale, yScale].map(s => s.name + (xScale.type === 'band' ? bandScaleLinearSuffix : ''));
    return {
        type: 'image',
        encode: {
            update: {
                url: {
                    value: backgroundImage.url,
                },
                aspect: {
                    value: false,
                },
                baseline: {
                    value: 'bottom',
                },
                height: {
                    signal: getScaledSpan(yScaleName, backgroundImage.extents.bottom, backgroundImage.extents.top),
                },
                y: {
                    signal: getScaledValue(yScaleName, backgroundImage.extents.bottom),
                },
                width: {
                    signal: getScaledSpan(xScaleName, backgroundImage.extents.right, backgroundImage.extents.left),
                },
                x: {
                    signal: getScaledValue(xScaleName, backgroundImage.extents.left),
                },
            },
        },
    };
}

function getScaledSpan(scaleName: string, low: number, high: number): string {
    return `abs(scale('${scaleName}', ${low}) - scale('${scaleName}', ${high}))`;
}

function getScaledValue(scaleName: string, value: number): string {
    return `scale('${scaleName}', ${value})`;
}
