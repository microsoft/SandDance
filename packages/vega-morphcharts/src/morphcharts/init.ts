/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Core } from 'morphcharts';
import { MorphChartsRef, MorphChartsRendererOptions, MorphChartsOptions } from '../interfaces';
import { getRenderer, rendererEnabled, setRendererOptions, shouldChangeRenderer } from './renderer';
import { quat, vec3 } from 'gl-matrix';
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

    const ref: MorphChartsRef = {
        supportedRenders: {
            advanced: rendererEnabled(true),
            basic: rendererEnabled(false),
        },
        reset: () => {
            core.reset(true);
            const { cameraTransitioner: cameraState, modelTransitioner: modelState } = ref;
            quat.slerp(modelState.qModelCurrent, modelState.qModelTo, modelState.qModelTo, 0);
            core.setModelRotation(modelState.qModelCurrent, true);
            core.camera.setOrbit(cameraState.qCameraRotationTo, false);
            //core.camera.setPosition(cameraState.vCameraPositionTo, false);
        },
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
        lastPresenterConfig: null,
        layerStagger: {},
    };
    const cam = (t: number) => {
        quat.slerp(cameraTransitioner.qCameraRotationCurrent, cameraTransitioner.qCameraRotationFrom, cameraTransitioner.qCameraRotationTo, t);
        vec3.lerp(cameraTransitioner.vCameraPositionCurrent, cameraTransitioner.vCameraPositionFrom, cameraTransitioner.vCameraPositionTo, t);
        core.camera.setOrbit(cameraTransitioner.qCameraRotationCurrent, false);
        core.camera.setPosition(cameraTransitioner.vCameraPositionCurrent, false);

        // disable picking during transitions, as the performance degradation could reduce the framerate
        core.inputManager.isPickingEnabled = false;
    };
    core.updateCallback = (elapsedTime) => {
        const { transitionDurations } = ref.lastPresenterConfig;
        if (positionTransitioner.isTransitioning) {
            core.renderer.transitionTime = positionTransitioner.elapse(elapsedTime, transitionDurations.position + transitionDurations.stagger);
        }
        if (modelTransitioner.isTransitioning) {
            const tm = modelTransitioner.elapse(elapsedTime, transitionDurations.view, true);
            if (modelTransitioner.shouldTransition) {
                quat.slerp(modelTransitioner.qModelCurrent, modelTransitioner.qModelFrom, modelTransitioner.qModelTo, tm);
                core.setModelRotation(modelTransitioner.qModelCurrent, false);
            }
            cam(tm);
        }
        if (cameraTransitioner.isTransitioning) {
            const t = cameraTransitioner.elapse(elapsedTime, transitionDurations.view, true);
            cam(t);
        } else {
            core.inputManager.isPickingEnabled = true;
        }
    };
    return ref;
}
