// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { getColorSettingsFromThemePalette, themePalettes } from './themes';
import { ViewerOptions } from './interfaces';

export const fontFamily = 'Segoe UI, sans-serif';

export const defaultViewerOptions: Partial<ViewerOptions> = {
    colors: getColorSettingsFromThemePalette(themePalettes['']),
    fontFamily,
};

export const snapshotThumbWidth = 300;
