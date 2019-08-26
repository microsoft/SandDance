// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ColorSettings, ViewerOptions } from './interfaces';
import { SandDance } from '@msrvida/sanddance-react';
import { themePalettes } from './themes';

const colors: Partial<ColorSettings> = {
    clickableText: SandDance.VegaDeckGl.util.colorFromString(themePalettes[''].themeLighter),
    clickableTextHighlight: SandDance.VegaDeckGl.util.colorFromString(themePalettes[''].themeLight)
}

export const defaultViewerOptions: Partial<ViewerOptions> = {
    colors
};
