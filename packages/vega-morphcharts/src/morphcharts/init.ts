/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Core } from 'morphcharts';
import { MorphChartsRef, MorphChartsRendererOptions, MorphChartsOptions } from '../interfaces';
import { getRenderer, rendererEnabled, setRendererOptions, shouldChangeRenderer } from './renderer';
import { easing } from '../easing';
import { quat, vec3 } from 'gl-matrix';
import { listenCanvasEvents } from './canvas';

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
            quat.slerp(ref.qModelCurrent, ref.qModelTo, ref.qModelTo, 0);
            core.setModelRotation(ref.qModelCurrent, true);
            core.camera.setOrbit(ref.qCameraRotationTo, false);
            //core.camera.setPosition(ref.vCameraPositionTo, false);
        },
        transitionModel: false,
        qModelFrom: null,
        qModelTo: null,
        qModelCurrent: quat.create(),
        qCameraRotationFrom: quat.create(),
        qCameraRotationTo: null,
        qCameraRotationCurrent: quat.create(),
        vCameraPositionFrom: vec3.create(),
        vCameraPositionTo: null,
        vCameraPositionCurrent: vec3.create(),
        core,
        cameraTime: 0,
        isCameraMovement: false,
        isTransitioningPosition: false,
        isTransitioningModel: false,
        transitionPositionTime: 0,
        transitionModelTime: 0,
        transitionDurations: null,
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
        resetCameraWithLayout: true,
    };
    const cam = (t: number) => {
        quat.slerp(ref.qCameraRotationCurrent, ref.qCameraRotationFrom, ref.qCameraRotationTo, t);
        vec3.lerp(ref.vCameraPositionCurrent, ref.vCameraPositionFrom, ref.vCameraPositionTo, t);
        core.camera.setOrbit(ref.qCameraRotationCurrent, false);
        core.camera.setPosition(ref.vCameraPositionCurrent, false);

        // disable picking during transitions, as the performance degradation could reduce the framerate
        core.inputManager.isPickingEnabled = false;
    };
    core.updateCallback = (elapsedTime) => {
        const { transitionDurations } = ref;
        if (ref.isTransitioningPosition) {
            ref.transitionPositionTime += elapsedTime;
            const totalPositionTime = transitionDurations.position + transitionDurations.stagger;
            if (ref.transitionPositionTime >= totalPositionTime) {
                ref.isTransitioningPosition = false;
                ref.transitionPositionTime = totalPositionTime;
            }
            const tp = ref.transitionPositionTime / totalPositionTime;
            core.renderer.transitionTime = tp;
        }
        if (ref.isTransitioningModel) {
            ref.transitionModelTime += elapsedTime;
            const totalModelTime = transitionDurations.view;
            if (ref.transitionModelTime >= totalModelTime) {
                ref.isTransitioningModel = false;
                ref.transitionModelTime = totalModelTime;
            }
            const tm = easing(ref.transitionModelTime / totalModelTime);
            if (ref.transitionModel) {
                quat.slerp(ref.qModelCurrent, ref.qModelFrom, ref.qModelTo, tm);
                core.setModelRotation(ref.qModelCurrent, false);
            }
            cam(tm);
        }
        if (ref.isCameraMovement) {
            ref.cameraTime += elapsedTime;
            const totalTime = transitionDurations.view;
            if (ref.cameraTime >= totalTime) {
                ref.isCameraMovement = false;
                ref.cameraTime = totalTime;
            }
            const t = easing(ref.cameraTime / totalTime);
            cam(t);
        } else {
            core.inputManager.isPickingEnabled = true;
        }
    };
    return ref;
}
