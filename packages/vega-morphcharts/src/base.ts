/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

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
    View,
} from 'vega-typings';

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

const vega: VegaBase = {
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
    View: null,
};

/**
 * References to dependency libraries.
 */
export interface Base {
    //TODO MorphCharts???
    vega: VegaBase;
}

/**
 * References to dependency libraries.
 */
export const base: Base = {
    vega,
};

/**
 * Specify the dependency libraries to use for rendering.
 * @param vega Vega library.
 * @param deck deck/core library.
 * @param layers deck/layers library.
 * @param luma luma.gl library.
 */
export function use(vega: VegaBase) {
    base.vega = vega;
}
