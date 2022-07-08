/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Axis, RGBAColor, Stage, StyledLine, VegaTextLayerDatum } from '../interfaces';
import { Scene, SceneLine, SceneText } from 'vega-typings';

export enum GroupType {
    none = 0,
    legend = 1,
    xAxis = 2,
    yAxis = 3,
    zAxis = 4,
}

export interface MarkStagerOptions {
    maxOrdinal: number;
    currAxis: Axis;
    defaultCubeColor: RGBAColor;
    assignCubeOrdinal: (d: object) => number | undefined;
    modifyAxis?: (vegaItem: SceneLine | SceneText, stageItem: StyledLine | VegaTextLayerDatum, stage: Stage, currAxis: Axis) => void;
    zAxisZindex: number;
}

//TODO - use vega-typings below
export interface LabelDatum {
    value: any;
}
//TODO - use vega-typings above


export interface MarkStager {
    (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType): void;
}
