// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    Cube,
    PresenterConfig,
    PresenterStyle,
    Stage
} from './interfaces';
import { LightSettings } from '@deck.gl/core/lib/layer';
import { View } from '@msrvida/chart-types';

export const minHeight = '100px';
export const minWidth = '100px';

const lightSettings: { [view in View]: LightSettings } = {
    '2d': {},
    '3d': {
        lightsPosition: [-122.45, 37.66, 8000, -122.0, 38.0, 8000],
        ambientRatio: 0.3,
        diffuseRatio: 0.6,
        specularRatio: 0.4,
        lightsStrength: [0.3, 0.0, 0.8, 0.0],
        numberOfLights: 2
    }
};

export const defaultPresenterStyle: PresenterStyle = {
    cssPrefix: 'vega-deckgl-',
    defaultCubeColor: [128, 128, 128, 255],
    highlightColor: [0, 0, 0, 255],
    lightSettings
};

export const defaultPresenterConfig: PresenterConfig = {
    onCubeClick: (e, cube: Cube) => { },
    onCubeHover: (e, cube: Cube) => { },
    transitionDurations: {
        color: 100,
        position: 600,
        size: 600,
        view: 600
    }
};

export function createStage(view: View) {
    const stage: Stage = {
        view,
        cubeData: [],
        axes: {
            x: [],
            y: []
        },
        gridLines: [],
        textData: [],
        legend: {
            rows: {}
        },
        facets: []
    };
    return stage;
}

export const groupStrokeWidth = 1;

export const lineZ = -1;

export const defaultView: View = '2d';

export const min3dDepth = 0.05;
export const minPixelSize = 0.5;
