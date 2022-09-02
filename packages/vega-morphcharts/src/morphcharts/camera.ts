/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { quat, vec3 } from 'gl-matrix';
import { AxesVisibility } from 'morphcharts';
import { MorphChartsCore, MorphChartsRef, PresenterConfig } from '../interfaces';
import { cameraDefaults } from './defaults';
import { View } from '@msrvida/chart-types';

const { qCameraRotation2d, qCameraRotation3d, qModelRotation2d, qModelRotation3d, vCameraPosition } = cameraDefaults;

export function applyCameraCallbacks(ref: MorphChartsRef, lastPresenterConfig: PresenterConfig, lastView: View, transistion2dOnly: boolean) {
    const { cameraTransitioner, core, modelTransitioner, positionTransitioner } = ref;

    ref.reset = () => {

        core.reset(true);

        if (lastView === '3d') {
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
        const { transitionDurations } = lastPresenterConfig;
        if (positionTransitioner.isTransitioning) {
            const t = positionTransitioner.elapse(elapsedTime, transitionDurations.position + transitionDurations.stagger);
            core.renderer.transitionTime = t;
            setTransitionTimeAxesVisibility(transistion2dOnly, core);
        } else {
            core.inputManager.isPickingEnabled = true;
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
        }
    };
}

export function setTransitionTimeAxesVisibility(transistion2dOnly: boolean, core: MorphChartsCore) {
    const t = core.renderer.transitionTime;
    if (transistion2dOnly) {
        if (t < 0.5) {
            core.renderer.axesVisibility = AxesVisibility.previous;
        } else {
            core.renderer.axesVisibility = AxesVisibility.current;
        }
    }
    else {
        if (t <= 0.01) {
            core.renderer.axesVisibility = AxesVisibility.previous;
        } else if (t >= 0.99) {
            core.renderer.axesVisibility = AxesVisibility.current;
        } else {
            core.renderer.axesVisibility = AxesVisibility.none;
        }
    }
}
