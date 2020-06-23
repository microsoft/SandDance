// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SandDanceReact } from './viewer';
import * as SandDance from '@msrvida/sanddance';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * References to dependency libraries.
 */
export interface Base {
    react: typeof React;
    reactDOM: typeof ReactDOM;
}

export const base: Base = {
    react: null,
    reactDOM: null
};

/**
 * Specify the dependency libraries to use for rendering.
 * @param react React library.
 * @param vega Vega library.
 * @param deck @deck.gl/core library.
 * @param layers @deck.gl/layers library.
 * @param luma @luma.gl/core library.
 */
export function use(
    react: typeof React,
    reactDOM: typeof ReactDOM,
    vega: SandDance.VegaDeckGl.types.VegaBase,
    deck: SandDance.VegaDeckGl.types.DeckBase,
    layers: SandDance.VegaDeckGl.types.DeckLayerBase,
    luma: SandDance.VegaDeckGl.types.LumaBase
) {
    SandDance.VegaDeckGl.use(vega, deck, layers, luma);
    base.react = react;
    base.reactDOM = reactDOM;

    //inform React that we are using a dynamic base class
    SandDanceReact.prototype = react.Component.prototype as any;
}
