// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FabricComponents } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { Renderer } from 'react-dom';
import { SandDance } from '@msrvida/sanddance-react';

/**
 * References to dependency libraries.
 */
export interface Base {
  fabric: FabricComponents;
  reactDomRender: Renderer;
}

export const base: Base = {
  fabric: null,
  reactDomRender: null
};

/**
 * Specify the dependency libraries to use for rendering.
 * @param fabric Office UI Fabric React library.
 */
export function use(
  reactDomRender: Renderer,
  fabric: FabricComponents,
  vega: SandDance.VegaDeckGl.types.VegaBase,
  deck: SandDance.VegaDeckGl.types.DeckBase,
  layers: SandDance.VegaDeckGl.types.DeckLayerBase,
  luma: SandDance.VegaDeckGl.types.LumaBase
) {
  SandDance.VegaDeckGl.use(vega, deck, layers, luma);
  base.reactDomRender = reactDomRender;
  base.fabric = fabric;
}
