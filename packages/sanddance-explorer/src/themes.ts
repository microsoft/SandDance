/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { ColorSettings } from './interfaces';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { SandDance } from '@msrvida/sanddance-react';

import util = SandDance.VegaMorphCharts.util;

export const themePalettes: { [theme: string]: Partial<FluentUITypes.IPalette> } = {};

themePalettes[''] = {
    themePrimary: '#0078d4',
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#595959',
    neutralSecondary: '#373737',
    neutralSecondaryAlt: '#373737',
    neutralPrimaryAlt: '#2f2f2f',
    neutralPrimary: '#000000',
    neutralDark: '#151515',
    black: '#0b0b0b',
    white: '#ffffff',
};

themePalettes['dark-theme'] = {
    themePrimary: '#0078d4',
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#0b0b0b',
    neutralLighter: '#151515',
    neutralLight: '#252525',
    neutralQuaternaryAlt: '#2f2f2f',
    neutralQuaternary: '#373737',
    neutralTertiaryAlt: '#595959',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralSecondaryAlt: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#ffffff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#000000',
};

export function getColorSettingsFromThemePalette(themePalette: Partial<FluentUITypes.IPalette>): Partial<ColorSettings> {
    const c = util.colorFromString(themePalette.themeSecondary);
    c[3] = 256 / 3; // one-third opacity background
    return {
        axisLine: themePalette.black,
        axisText: themePalette.black,
        gridLine: themePalette.neutralLight,
        backgroundColor: themePalette.white,
        hoveredCube: themePalette.black,
        clickableText: themePalette.themeDark,
        clickableTextHighlight: util.colorToString(c),
        searchText: themePalette.neutralPrimary,
        searchTextHighlight: themePalette.neutralPrimaryAlt,
    };
}
