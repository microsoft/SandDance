/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { quat, vec3 } from 'gl-matrix';
import { easing } from './easing';

export class Transitioner {
    public isTransitioning: boolean;
    public time: number;

    constructor() {
        this.isTransitioning = false;
    }

    begin() {
        this.isTransitioning = true;
        this.time = 0;
    }

    elapse(elapsedTime: number, totalTime: number, ease = false) {
        this.time += elapsedTime;
        if (this.time >= totalTime) {
            this.isTransitioning = false;
            this.time = totalTime;
        }
        const t = this.time / totalTime;
        return ease ? easing(t) : t;
    }
}

export class CameraTransitioner extends Transitioner {
    public qCameraRotationFrom: quat;
    public qCameraRotationTo: quat;
    public qCameraRotationCurrent: quat;
    public vCameraPositionFrom: vec3;
    public vCameraPositionTo: vec3;
    public vCameraPositionCurrent: vec3;

    constructor() {
        super();
        this.qCameraRotationFrom = quat.create();
        this.qCameraRotationTo = null;
        this.qCameraRotationCurrent = quat.create();
        this.vCameraPositionFrom = vec3.create();
        this.vCameraPositionTo = null;
        this.vCameraPositionCurrent = vec3.create();
    }

    move(position: vec3, rotation: quat) {
        this.begin();
        this.qCameraRotationTo = rotation;
        this.vCameraPositionTo = position;
    }
}

export class ModelTransitioner extends Transitioner {
    public shouldTransition: boolean;
    public qModelFrom: quat;
    public qModelTo: quat;
    public qModelCurrent: quat;

    constructor() {
        super();
        this.shouldTransition = false;
        this.qModelFrom = null;
        this.qModelTo = null;
        this.qModelCurrent = quat.create();
    }
}
