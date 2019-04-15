// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { LinearInterpolator as _LinearInterpolator } from '@deck.gl/core';

export interface ILinearInterpolator<T> {
    layerStartProps: T;
    layerEndProps: T;
    layerInterpolatedProps: T;
}

function wrapper(props: any) {

    class LinearInterpolatorInternal<T> extends base.deck.LinearInterpolator implements ILinearInterpolator<T> {
        public layerStartProps: any;
        public layerEndProps: any;
        public layerInterpolatedProps: any;

        constructor(transitionProps?: string[]) {
            super(transitionProps);
        }

        interpolateProps(viewStateStartProps: any, viewStateEndProps: any, t: any) {
            if (this.layerStartProps && this.layerEndProps) {
                this.layerInterpolatedProps = super.interpolateProps(this.layerStartProps, this.layerEndProps, t);
            }
            return super.interpolateProps(viewStateStartProps, viewStateEndProps, t);
        }
    }

    const instance = new LinearInterpolatorInternal(props) as _LinearInterpolator;

    return instance;
}

export const LinearInterpolator: typeof LinearInterpolator_Class = wrapper as any;

export declare class LinearInterpolator_Class<T> extends base.deck.LinearInterpolator implements ILinearInterpolator<T> {
    layerStartProps: T;
    layerEndProps: T;
    layerInterpolatedProps: T;
}
