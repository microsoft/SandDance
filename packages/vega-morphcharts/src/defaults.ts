/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import {
    Axis,
    Cube,
    PresenterConfig,
    PresenterStyle,
    RGBAColor,
    Stage,
    StyledLine,
    VegaTextLayerDatum,
} from './interfaces';
import { View } from '@msrvida/chart-types';
import { SceneLine, SceneText } from 'vega-typings/types/runtime/scene';
import { colorIsEqual } from './color';

export const minHeight = '100px';
export const minWidth = '100px';

export const defaultPresenterStyle: PresenterStyle = {
    cssPrefix: 'vega-morphcharts-',
    defaultCubeColor: [128, 128, 128, 255],
    highlightColor: [0, 0, 0, 255],
};

export const defaultPresenterConfig: PresenterConfig = {
    onCubeClick: (e, cube: Cube) => { },
    onCubeHover: (e, cube: Cube) => { },
    transitionDurations: {
        color: 100,
        position: 600,
        stagger: 600,
        view: 600,
    },
    initialMcRendererOptions: {
        advanced: false,
        advancedOptions: {},
        basicOptions: {
            antialias: true,
        },
    },
};

export function createStage(view: View) {
    const stage: Stage = {
        view,
        cubeData: [],
        pathData: [],
        polygonData: [],
        axes: {
            x: [],
            y: [],
            z: [],
        },
        gridLines: [],
        textData: [],
        legend: {
            rows: {},
        },
        facets: [],
    };
    return stage;
}

export const groupStrokeWidth = 1;

export const lineZ = 0;

export const defaultView: View = '2d';

export const minZ = 0.5;
export const min3dDepth = 0.05;
export const minPixelSize = 0.5;

const zAxisEncodeColor: RGBAColor = [7, 7, 7, 255];
const zAxisOutColor: RGBAColor = [0, 0, 0, 255];

export function defaultOnAxisItem(vegaItem: SceneLine | SceneText, stageItem: StyledLine | VegaTextLayerDatum, stage: Stage, currAxis: Axis) {
    if (colorIsEqual(stageItem.color, zAxisEncodeColor)) {
        stageItem.color = zAxisOutColor;
        if (currAxis.axisRole !== 'z') {
            const previousAxisRole = removeCurrentAxes(stage, currAxis);
            if (previousAxisRole) {
                currAxis.axisRole = 'z';
                stage.axes.z.push(currAxis);
            } else {
                //debug: curr axis not found
            }
        }
    }
}

function removeCurrentAxes(stage: Stage, currAxis: Axis) {
    //find the current axis, remove it from parent
    for (const axisRole in stage.axes) {
        const axes: Axis[] = stage.axes[axisRole];
        for (let i = 0; i < axes.length; i++) {
            if (axes[i] === currAxis) {
                axes.splice(i, 1);
                return axisRole;
            }
        }
    }
}
