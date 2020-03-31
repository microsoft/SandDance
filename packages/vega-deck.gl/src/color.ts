// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Color } from '@deck.gl/core/utils/color';
import {
    color as d3color,
    hsl as d3hsl,
    rgb as d3rgb,
    RGBColor
} from 'd3-color';

function rgbToDeckglColor(c: RGBColor): Color {
    return [c.r, c.g, c.b, c.opacity * 255];
}

/**
 * Compares 2 colors to see if they are equal.
 * @param a Color to compare
 * @param b Color to compare
 * @returns True if colors are equal.
 */
export function colorIsEqual(a: Color, b: Color) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

/**
 * Convert a CSS color string to a Deck.gl Color array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.).
 * @param cssColorSpecifier A CSS Color Module Level 3 specifier string.
 */
export function colorFromString(cssColorSpecifier: string): Color {
    if (cssColorSpecifier) {
        const dc = d3color(cssColorSpecifier);
        if (dc) {
            const c = dc.rgb();
            return rgbToDeckglColor(c);
        }
    }
}

/**
 * Convert a Deck.gl color to a CSS rgba() string.
 * @param color A Deck.gl Color array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.)
 */
export function colorToString(color: Color) {
    const c = [...color];
    if (c.length > 3) {
        c[3] /= 255;
    }
    return `rgba(${c.join(',')})`;
}

export function desaturate(color: Color, value: number): Color {
    const rgb = d3rgb(color[0], color[1], color[2], color[3] / 255);
    const hslColor = d3hsl(rgb);
    hslColor.s = value;
    const c = hslColor.rgb();
    return rgbToDeckglColor(c);
}
