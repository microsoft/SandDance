/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { AxesVisibility, Core } from 'morphcharts';
import { MorphChartsRef, MorphChartsRendererOptions, MorphChartsOptions } from '../interfaces';
import { getRenderer, rendererEnabled, setRendererOptions, shouldChangeRenderer } from './renderer';
import { listenCanvasEvents } from './canvas';
import { CameraTransitioner, ModelTransitioner, Transitioner } from '../transition';

export function init(options: MorphChartsOptions, mcRendererOptions: MorphChartsRendererOptions) {
    const { container } = options;
    const core = new Core({ container });

    getRenderer(mcRendererOptions, core);
    listenCanvasEvents(core, options);

    core.config.pickSelectDelay = 50;

    const cameraTransitioner = new CameraTransitioner();
    const modelTransitioner = new ModelTransitioner();
    const positionTransitioner = new Transitioner();

    positionTransitioner.ended = () => {
        core.renderer.axesVisibility = AxesVisibility.current;
    };

    const ref: MorphChartsRef = {
        supportedRenders: {
            advanced: rendererEnabled(true),
            basic: rendererEnabled(false),
        },
        reset: null,
        cameraTransitioner,
        modelTransitioner,
        positionTransitioner,
        core,
        setMorphChartsRendererOptions(mcRendererOptions: MorphChartsRendererOptions) {
            if (shouldChangeRenderer(ref.lastMorphChartsRendererOptions, mcRendererOptions)) {
                getRenderer(mcRendererOptions, core);
                listenCanvasEvents(core, options);
            } else {
                if (mcRendererOptions.advanced) {
                    //same renderer, poke the config
                    setRendererOptions(core.renderer, mcRendererOptions);
                }
            }
            ref.lastMorphChartsRendererOptions = mcRendererOptions;
        },
        lastMorphChartsRendererOptions: mcRendererOptions,
        layerStagger: {},
    };

    return ref;
}
