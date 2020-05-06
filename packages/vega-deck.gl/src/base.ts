// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    _CameraLight,
    AmbientLight,
    CompositeLayer,
    COORDINATE_SYSTEM,
    Deck,
    DirectionalLight,
    IconLayer,
    Layer,
    LightingEffect,
    LinearInterpolator,
    LineLayer,
    OrbitController,
    OrbitView,
    PolygonLayer,
    gouraudLighting,
    picking,
    project32,
    TextLayer
} from 'deck.gl';
import {
    CanvasHandler,
    inferType,
    inferTypes,
    loader,
    parse,
    read,
    Renderer,
    renderModule,
    sceneVisit,
    scheme,
    truncate,
    View
} from 'vega-typings';
import { CubeGeometry, Model, Texture2D } from '@luma.gl/core';

/**
 * Vega library dependency.
 */
export interface VegaBase {
    CanvasHandler: CanvasHandler;
    inferType: typeof inferType;
    inferTypes: typeof inferTypes;
    loader: typeof loader;
    parse: typeof parse;
    read: typeof read;
    renderModule: typeof renderModule;
    Renderer: typeof Renderer,
    sceneVisit: typeof sceneVisit
    scheme: typeof scheme,
    truncate: typeof truncate,
    View: typeof View,
}

let vega: VegaBase = {
    CanvasHandler: null,
    inferType: null,
    inferTypes: null,
    loader: null,
    parse: null,
    read: null,
    renderModule: null,
    Renderer: null,
    sceneVisit: null,
    scheme: null,
    truncate: null,
    View: null
};

/**
 * deck.gl/core dependency.
 */
export interface DeckBase {
    _CameraLight: typeof _CameraLight,
    AmbientLight: typeof AmbientLight,
    CompositeLayer: typeof CompositeLayer;
    COORDINATE_SYSTEM: typeof COORDINATE_SYSTEM;
    Deck: typeof Deck;
    DirectionalLight: typeof DirectionalLight;
    Layer: typeof Layer;
    LightingEffect: typeof LightingEffect;
    LinearInterpolator: typeof LinearInterpolator;
    OrbitView: typeof OrbitView;
    OrbitController: typeof OrbitController;
    gouraudLighting: typeof gouraudLighting;
    picking: typeof picking;
    project32: typeof project32;
}

/**
 * deck.gl/layers dependency.
 */
export interface DeckLayerBase {
    IconLayer: typeof IconLayer;
    LineLayer: typeof LineLayer;
    PolygonLayer: typeof PolygonLayer;
    TextLayer: typeof TextLayer;
}

let deck: DeckBase = {
    _CameraLight: null,
    AmbientLight: null,
    CompositeLayer: null,
    COORDINATE_SYSTEM: null,
    Deck: null,
    DirectionalLight: null,
    Layer: null,
    LightingEffect: null,
    LinearInterpolator: null,
    OrbitView: null,
    OrbitController: null,
    gouraudLighting: null,
    picking: null,
    project32:  null
};

let layers: DeckLayerBase = {
    IconLayer: null,
    LineLayer: null,
    PolygonLayer: null,
    TextLayer: null
};

/**
 * luma.gl dependency.
 */
export interface LumaBase {
    CubeGeometry: typeof CubeGeometry;
    Model: typeof Model;
    Texture2D: typeof Texture2D
}

let luma: LumaBase = {
    CubeGeometry: null,
    Model: null,
    Texture2D: null
};

/**
 * References to dependency libraries.
 */
export interface Base {
    deck: DeckBase;
    layers: DeckLayerBase;
    luma: LumaBase;
    vega: VegaBase;
}

/**
 * References to dependency libraries.
 */
export const base: Base = {
    deck,
    layers,
    luma,
    vega
};

/**
 * Specify the dependency libraries to use for rendering.
 * @param vega Vega library.
 * @param deck deck/core library.
 * @param layers deck/layers library.
 * @param luma luma.gl library.
 */
export function use(vega: VegaBase, deck: DeckBase, layers: DeckLayerBase, luma: LumaBase) {
    base.deck = deck;
    base.layers = layers;
    base.luma = luma;
    base.vega = vega;

    window['deck'] = deck;
}
