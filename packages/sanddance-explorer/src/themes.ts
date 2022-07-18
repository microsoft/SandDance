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
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#ffffff',
};

themePalettes['dark-theme'] = {
    themePrimary: '#00b4f0',
    themeLighterAlt: '#00070a',
    themeLighter: '#001d26',
    themeLight: '#003648',
    themeTertiary: '#006c90',
    themeSecondary: '#009ed3',
    themeDarkAlt: '#18bbf1',
    themeDark: '#3ac5f3',
    themeDarker: '#6cd4f6',
    neutralLighterAlt: '#0b0b0b',
    neutralLighter: '#151515',
    neutralLight: '#252525',
    neutralQuaternaryAlt: '#2f2f2f',
    neutralQuaternary: '#373737',
    neutralTertiaryAlt: '#595959',
    neutralTertiary: '#929292',
    neutralSecondary: '#a7a7a7',
    neutralPrimaryAlt: '#b4b4b4',
    neutralPrimary: '#cccccc',
    neutralDark: '#d8d8d8',
    black: '#f5f5f5',
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
