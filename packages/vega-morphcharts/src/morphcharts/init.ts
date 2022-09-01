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
import { cameraDefaults } from './defaults';

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
            const { qCameraRotation2d, qCameraRotation3d, qModelRotation2d, qModelRotation3d, vCameraPosition } = cameraDefaults;
            const { cameraTransitioner, modelTransitioner } = ref;

            core.reset(true);

            if (ref.lastView === '3d') {
                modelTransitioner.qRotation.to = qModelRotation3d;
                cameraTransitioner.qRotation.to = qCameraRotation3d;
                cameraTransitioner.vPosition.to = vCameraPosition;
            } else {
                modelTransitioner.qRotation.to = qModelRotation2d;
                cameraTransitioner.qRotation.to = qCameraRotation2d;
                cameraTransitioner.vPosition.to = vCameraPosition;
            }

            quat.slerp(modelTransitioner.qRotation.current, modelTransitioner.qRotation.to, modelTransitioner.qRotation.to, 0);
            core.setModelRotation(modelTransitioner.qRotation.current, true);
            core.camera.setOrbit(cameraTransitioner.qRotation.to, true);
            core.camera.setPosition(cameraTransitioner.vPosition.to, true);
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
        lastView: null,
        layerStagger: {},
    };
    const cam = (t: number) => {
        quat.slerp(cameraTransitioner.qRotation.current, cameraTransitioner.qRotation.from, cameraTransitioner.qRotation.to, t);
        vec3.lerp(cameraTransitioner.vPosition.current, cameraTransitioner.vPosition.from, cameraTransitioner.vPosition.to, t);
        core.camera.setOrbit(cameraTransitioner.qRotation.current, false);
        core.camera.setPosition(cameraTransitioner.vPosition.current, false);

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
                quat.slerp(modelTransitioner.qRotation.current, modelTransitioner.qRotation.from, modelTransitioner.qRotation.to, tm);
                core.setModelRotation(modelTransitioner.qRotation.current, false);
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
