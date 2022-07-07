/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { getColorSettingsFromThemePalette, themePalettes } from './themes';
import { ViewerOptions } from './interfaces';

export const fontFamily = 'Segoe UI, sans-serif';

export const defaultViewerOptions: Partial<ViewerOptions> = {
    colors: getColorSettingsFromThemePalette(themePalettes['']),
    fontFamily,
};

export const snapshotThumbWidth = 300;
