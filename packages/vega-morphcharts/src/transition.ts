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

export interface TransitionSet<T> {
    from: T;
    to: T;
    current: T;
}

export class CameraTransitioner extends Transitioner {
    public qRotation: TransitionSet<quat>;
    public vPosition: TransitionSet<vec3>;

    constructor() {
        super();
        this.qRotation = {
            from: quat.create(),
            to: null,
            current: quat.create(),
        };
        this.vPosition = {
            from: vec3.create(),
            to: null,
            current: vec3.create(),
        };
    }

    move(position: vec3, rotation: quat) {
        this.begin();
        this.qRotation.to = rotation;
        this.vPosition.to = position;
    }
}

export class ModelTransitioner extends Transitioner {
    public qRotation: TransitionSet<quat>;
    public shouldTransition: boolean;

    constructor() {
        super();
        this.shouldTransition = false;
        this.qRotation = {
            from: null,
            to: null,
            current: quat.create(),
        };
    }
}
