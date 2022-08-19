/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { getColorSettingsFromThemePalette, themePalettes } from './themes';
import { ViewerOptions } from './interfaces';
import { SandDance } from '@msrvida/sanddance-react';

export const fontFamily = 'Segoe UI, sans-serif';

export const defaultViewerOptions: Partial<ViewerOptions> = {
    colors: getColorSettingsFromThemePalette(themePalettes['']),
    fontFamily,
};

export const snapshotThumbWidth = 300;

export const defaultRenderer: SandDance.VegaMorphCharts.types.MorphChartsRendererOptions = {
    advanced: false,
    advancedOptions: {
        bloomIntensity: 2,
        isBloomEnabled: false,
        isDofEnabled: false,
        dofFocusRange: 0.25,
        isFxaaEnabled: false,
        isShadowEnabled: true,
        isSsaoEnabled: true
    },
    basicOptions: {
        antialias: true
    }
};
