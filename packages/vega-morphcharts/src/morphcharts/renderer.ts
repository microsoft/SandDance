/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Core, Renderers } from 'morphcharts';
import { RendererBase } from 'morphcharts/dist/renderers/renderer';
import { McRendererOptions } from '../interfaces';

export function shouldChangeRenderer(prev: McRendererOptions, next: McRendererOptions) {
    if (!prev || !next) return true;
    if (prev.advanced !== next.advanced) return true;
    if (!prev.advanced) {
        return prev.basicOptions?.antialias != next.basicOptions?.antialias;
    }
}

export function getRenderer(mcRendererOptions: McRendererOptions, core: Core) {
    const advanced = mcRendererOptions?.advanced;
    const r = advanced ?
        new Renderers.Advanced.Main()
        :
        new Renderers.Basic.Main(mcRendererOptions?.basicOptions)
        ;
    core.renderer = r;

    setRendererOptions(r, mcRendererOptions);
    return r;
}

export function setRendererOptions(renderer: RendererBase, mcRendererOptions: McRendererOptions) {
    const o = mcRendererOptions?.advancedOptions;
    if (mcRendererOptions?.advanced && o) {
        for (const key in o) {
            renderer.config[key] = o[key];
        }
    }
}

export function rendererEnabled(advanced: boolean) {
    const r = advanced ?
        new Renderers.Advanced.Main()
        :
        new Renderers.Basic.Main()
        ;
    return r.isSupported;
}
