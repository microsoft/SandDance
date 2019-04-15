// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// Adapted from https://github.com/uber/deck.gl/blob/5.3-release/modules/layers/src/grid-cell-layer/grid-cell-layer.js

import fs from './cube-layer-fragment.glsl';
import vs from './cube-layer-vertex.glsl';
import { base } from '../base';
import { Cube } from '../interfaces';
import { Layer } from 'deck.gl';
import { LayerProps } from '@deck.gl/core/lib/layer';
import { LinearInterpolator_Class } from '../deck.gl-classes/linearInterpolator';

export interface CubeLayerDefaultProps {
  lightingMix: number;
  fp64?: boolean;
  getColor?: (o: Cube) => number[];
  getSize?: (o: Cube) => number[];
  getPosition?: (o: Cube) => number[];
}

export interface CubeLayerDataProps {
  data: Cube[];
  interpolator?: LinearInterpolator_Class<CubeLayerInterpolatedProps>;
}

export interface CubeLayerInterpolatedProps {
  lightingMix: number;
}

export type CubeLayerProps = LayerProps & CubeLayerDefaultProps & CubeLayerDataProps;

//https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
const UNSIGNED_BYTE = 0x1401;

const DEFAULT_COLOR = [255, 0, 255, 255];

const defaultProps: CubeLayerDefaultProps = {
  lightingMix: 0.5,
  fp64: false,
  getSize: x => x.size,
  getPosition: x => x.position,
  getColor: x => x.color
};

function _CubeLayer(props?: CubeLayerProps) {

  //dynamic superclass, since we don't know have deck.Layer in the declaration phase
  class __CubeLayer extends base.deck.Layer {

    static layerName = 'CubeLayer';
    static defaultProps = defaultProps;

    public id: string;
    public props: CubeLayerProps;

    getShaders() {
      const projectModule = this.use64bitProjection() ? 'project64' : 'project32';
      return { vs, fs, modules: [projectModule, 'lighting', 'picking'] };
    }

    initializeState() {
      const attributeManager = this.getAttributeManager();
      attributeManager.addInstanced({
        instancePositions: {
          size: 3,
          transition: true,
          accessor: 'getPosition'
        },
        instancePositions64xyLow: {
          size: 3,
          accessor: 'getPosition',
          update: this.calculateInstancePositions64xyLow
        },
        instanceSizes: {
          size: 3,
          transition: true,
          accessor: 'getSize'
        },
        instanceColors: {
          size: 4,
          type: UNSIGNED_BYTE,
          transition: true,
          accessor: 'getColor',
          defaultValue: DEFAULT_COLOR
        }
      });
    }

    updateState({ props, oldProps, changeFlags }) {
      super.updateState({ props, oldProps, changeFlags } as any); //TODO add parameter type to deck.gl-typings
      // Re-generate model if geometry changed
      if (props.fp64 !== oldProps.fp64) {
        const { gl } = this.context;
        if (this.state.model) {
          this.state.model.delete();
        }
        this.setState({ model: this._getModel(gl) });
        this.getAttributeManager().invalidateAll();
      }
    }

    _getModel(gl) {
      return new base.luma.Model(
        gl,
        Object.assign({}, this.getShaders(), {
          id: this.props.id,
          geometry: new base.luma.CubeGeometry(),
          isInstanced: true,
          shaderCache: this.context.shaderCache
        })
      );
    }

    draw({ uniforms }) {
      let { lightingMix } = this.props;
      if (this.props.interpolator && this.props.interpolator.layerInterpolatedProps) {
        lightingMix = this.props.interpolator.layerInterpolatedProps.lightingMix;
      }
      this.state.model.render(
        Object.assign({}, uniforms, {
          lightingMix
        })
      );
    }

    calculateInstancePositions64xyLow(attribute) {
      const isFP64 = this.use64bitPositions();
      attribute.constant = !isFP64;

      if (!isFP64) {
        attribute.value = new Float32Array(2);
        return;
      }

      const { data, getPosition } = this.props;
      const { value } = attribute;
      let i = 0;
      for (const point of data) {
        const position = getPosition(point);
        value[i++] = base.luma.fp64.fp64LowPart(position[0]);
        value[i++] = base.luma.fp64.fp64LowPart(position[1]);
      }
    }
  }

  const instance = new __CubeLayer(props) as Layer;

  return instance;
}

//signature to allow this function to be used with the 'new' keyword.
//need to trick the compiler by casting to 'any'.

/**
 * CubeLayer - a Deck.gl layer to render cuboids.
 * This is instantiatable by calling `new CubeLayer()`.
 */
export const CubeLayer: typeof CubeLayer_Class = _CubeLayer as any;

/**
 * CubeLayer - a Deck.gl layer to render cuboids.
 * This is not instantiatable, it is the TypeScript declaration of the type.
 */
export declare class CubeLayer_Class extends base.deck.Layer {
  id: string;
  props: CubeLayerProps;
}
