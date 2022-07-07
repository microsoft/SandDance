/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { Presenter } from '../presenter';
import { PresenterConfig, Scene3d } from '../interfaces';
import { Renderer, Scene, SceneItem } from 'vega-typings';
import { View } from '@msrvida/chart-types';

//pass in the SuperClass, which should be a vega.View
function _RendererGl(loader?: any) {

    //dynamic superclass, since we don't know have vega.View in the declaration phase
    class RendererGlInternal extends base.vega.Renderer {
        public height: number;
        public width: number;
        public origin: number[];
        public presenter: Presenter;
        public presenterConfig: PresenterConfig;
        public getView: { (): View };

        initialize(el, width, height, origin) {
            this.height = height;
            this.width = width;

            // this method will invoke resize to size the canvas appropriately
            return super.initialize(el, width, height, origin);
        }

        resize(width, height, origin) {

            super.resize(width, height, origin);

            this.origin = origin;
            this.height = height;
            this.width = width;

            //rteturn this for vega
            return this;
        }

        _render(scene: Scene, items: SceneItem[]) {
            const scene3d = scene as Scene3d;
            scene3d.view = this.getView();

            this.presenter.present(scene3d, this.height, this.width, this.presenterConfig);

            //return this for vega
            return this;
        }

    }

    const instance = new RendererGlInternal(loader) as Renderer;

    return instance;
}

//signature to allow this function to be used with the 'new' keyword.
//need to trick the compiler by casting to 'any'.

/**
 * Subclass of Vega.Renderer, with added properties for accessing a Presenter.
 * This is instantiated by ViewGl.
 */
export const RendererGl: typeof RendererGl_Class = _RendererGl as any;

/**
 * Subclass of Vega.Renderer, with added properties for accessing a Presenter.
 * This is not instantiatable, it is the TypeScript declaration of the type.
 */
export declare class RendererGl_Class extends base.vega.Renderer {
    public height: number;
    public width: number;
    public origin: number[];
    public presenter: Presenter;
    public presenterConfig: PresenterConfig;
    public getView: { (): View };
}
