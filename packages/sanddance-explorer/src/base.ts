// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { PositionedColumnMap } from './clickableTextLayer';
import { DataExportPicker } from './controls/dataExporter';
import { Chart } from './dialogs/chart';
import { Search } from './dialogs/search';
import { Settings } from './dialogs/settings';
import { SnapshotEditor } from './dialogs/snapshotEditor';
import { Snapshots } from './dialogs/snapshots';
import { Explorer } from './explorer';
import { FluentUIComponents } from '@msrvida/fluentui-react-cdn-typings';
import { SandDance, use as _use } from '@msrvida/sanddance-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * References to dependency libraries.
 */
export interface Base {
    fluentUI: FluentUIComponents;
    react: typeof React;
    reactDOM: typeof ReactDOM;
}

export const base: Base = {
    fluentUI: null,
    react: null,
    reactDOM: null
};

/**
 * Specify the dependency libraries to use for rendering.
 * @param fluentUI FluentUI React library.
 * @param react React library.
 * @param vega Vega library.
 * @param deck @deck.gl/core library.
 * @param layers @deck.gl/layers library.
 * @param luma @luma.gl/core library.
 */
export function use(
    fluentUI: FluentUIComponents,
    react: typeof React,
    reactDOM: typeof ReactDOM,
    vega: SandDance.VegaDeckGl.types.VegaBase,
    deck: SandDance.VegaDeckGl.types.DeckBase,
    layers: SandDance.VegaDeckGl.types.DeckLayerBase,
    luma: SandDance.VegaDeckGl.types.LumaBase
) {
    _use(react, reactDOM, vega, deck, layers, luma);
    base.fluentUI = fluentUI;
    base.react = react;
    base.reactDOM = reactDOM;

    //inform React that we are using a dynamic base class
    Chart.prototype = react.Component.prototype as any;
    DataExportPicker.prototype = react.Component.prototype as any;
    Explorer.prototype = react.Component.prototype as any;
    PositionedColumnMap.prototype = react.Component.prototype as any;
    Search.prototype = react.Component.prototype as any;
    SnapshotEditor.prototype = react.Component.prototype as any;
    Snapshots.prototype = react.Component.prototype as any;
    Settings.prototype = react.Component.prototype as any;
}
