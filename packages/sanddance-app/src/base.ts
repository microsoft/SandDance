// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as SandDanceExplorer from '@msrvida/sanddance-explorer';
import { FabricComponents } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { SandDance } from '@msrvida/sanddance-explorer';

import types = SandDance.VegaDeckGl.types;

/**
 * References to dependency libraries.
 */
export interface Base {
  fabric: FabricComponents;
}

export const base: Base = {
  fabric: null
};

/**
 * Specify the dependency libraries to use for rendering.
 * @param fabric Office UI Fabric React library.
 */
export function use(
  fabric: FabricComponents,
  vega: types.VegaBase,
  deck: types.DeckBase,
  layers: types.DeckLayerBase,
  luma: types.LumaBase
) {
  SandDanceExplorer.use(fabric, vega, deck, layers, luma);
  base.fabric = fabric;
}
