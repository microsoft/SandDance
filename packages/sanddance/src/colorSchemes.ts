// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { ColorScaleNone } from '@msrvida/sanddance-specs';
import { ColorScheme } from './types';
import { defaultViewerOptions, dualColorSchemeColors as defs } from './defaults';

const dualPairs = [
    [defs.black, defs.gray],
    [defs.red, defs.green],
    [defs.red, defs.blue],
    [defs.black, defs.red],
    [defs.black, defs.orange],
    [defs.black, defs.green],
];

/**
 * Array of color schemes.
 */
export const colorSchemes: ColorScheme[] = [
    {
        scheme: ColorScaleNone,
        colors: [defaultViewerOptions.colors.defaultCube],
    },
];

createDualColorSchemes();

export function registerColorSchemes(vega: VegaDeckGl.types.VegaBase) {
    colorSchemes.forEach(cs => {
        if (cs.colors.length === 1) {
            vega.scheme(cs.scheme, x => cs.colors[0]);
        } else {
            vega.scheme(cs.scheme, cs.colors);
        }
    });
}

function createPair(names: string[], colors: string[]) {
    const scheme = `dual_${names[0]}${names[1]}`;
    colorSchemes.push({ scheme, colors });
}

function createDualColorSchemes() {
    dualPairs.forEach(colors => {
        const names = colors.map(color => {
            for (const key in defs) if (color === defs[key]) return key;
        });
        createPair(names, colors);
        createPair([...names].reverse(), [...colors].reverse());
    });
}
