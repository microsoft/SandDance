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
        cameraTransitioner: new CameraTransitioner(),
        modelTransitioner: new ModelTransitioner(),
        positionTransitioner: new Transitioner(),
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
        const { cameraTransitioner: cameraState } = ref;
        quat.slerp(cameraState.qCameraRotationCurrent, cameraState.qCameraRotationFrom, cameraState.qCameraRotationTo, t);
        vec3.lerp(cameraState.vCameraPositionCurrent, cameraState.vCameraPositionFrom, cameraState.vCameraPositionTo, t);
        core.camera.setOrbit(cameraState.qCameraRotationCurrent, false);
        core.camera.setPosition(cameraState.vCameraPositionCurrent, false);

        // disable picking during transitions, as the performance degradation could reduce the framerate
        core.inputManager.isPickingEnabled = false;
    };
    core.updateCallback = (elapsedTime) => {
        const { cameraTransitioner: cameraState, modelTransitioner: modelState, positionTransitioner: transitionState } = ref;
        const { transitionDurations } = ref.lastPresenterConfig;
        if (transitionState.isTransitioning) {
            core.renderer.transitionTime = transitionState.elapse(elapsedTime, transitionDurations.position + transitionDurations.stagger);
        }
        if (modelState.isTransitioning) {
            const tm = modelState.elapse(elapsedTime, transitionDurations.view, true);
            if (modelState.shouldTransition) {
                quat.slerp(modelState.qModelCurrent, modelState.qModelFrom, modelState.qModelTo, tm);
                core.setModelRotation(modelState.qModelCurrent, false);
            }
            cam(tm);
        }
        if (cameraState.isTransitioning) {
            const t = cameraState.elapse(elapsedTime, transitionDurations.view, true);
            cam(t);
        } else {
            core.inputManager.isPickingEnabled = true;
        }
    };
    return ref;
}
