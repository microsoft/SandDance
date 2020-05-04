// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Position } from '@deck.gl/core/utils/positions';
import { OrbitViewState } from '@deck.gl/core/views/orbit-view';
import { View } from '@msrvida/chart-types';

export const viewStateProps = ['target', 'rotationOrbit', 'rotationX', 'zoom'];

export function targetViewState(height: number, width: number, view: View): OrbitViewState {
    const target = [width / 2, - height / 2, 0] as Position;

    if (view === '2d') {
        return {
            target,
            rotationOrbit: 0,
            rotationX: 0,
            zoom: 10 / height
        };
    } else {
        return {
            target,
            rotationOrbit: -25,
            rotationX: 60,
            zoom: 9 / height
        };
    }
}
