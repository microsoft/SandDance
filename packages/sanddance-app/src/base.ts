// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FluentUIComponents } from '@msrvida/fluentui-react-cdn-typings';
import * as SandDanceExplorer from '@msrvida/sanddance-explorer';
import { SandDance } from '@msrvida/sanddance-explorer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import types = SandDance.VegaDeckGl.types;

/**
 * References to dependency libraries.
 */
export interface Base {
    fluentUI: FluentUIComponents;
}

export const base: Base = {
    fluentUI: null
};

/**
 * Specify the dependency libraries to use for rendering.
 * @param fluentUI FluentUI React library.
 * @param vega Vega library.
 * @param deck @deck.gl/core library.
 * @param layers @deck.gl/layers library.
 * @param luma @luma.gl/core library.
 */
export function use(
    fluentUI: FluentUIComponents,
    vega: types.VegaBase,
    deck: types.DeckBase,
    layers: types.DeckLayerBase,
    luma: types.LumaBase
) {
    SandDanceExplorer.use(fluentUI, React, ReactDOM, vega, deck, layers, luma);
    base.fluentUI = fluentUI;
}
