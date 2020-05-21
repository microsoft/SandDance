// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Axis, Stage } from '../interfaces';
import { RGBAColor } from '@deck.gl/core/utils/color';
import { Scene, SceneGroup } from 'vega-typings';

export enum GroupType {
    none = 0,
    legend = 1,
    xAxis = 2,
    yAxis = 3
}

export interface MarkStagerOptions {
    maxOrdinal: number;
    currAxis: Axis;
    defaultCubeColor: RGBAColor;
    assignCubeOrdinal: (d: object) => number | undefined;
}

//TODO - use vega-typings below
export type SceneGroup2 = SceneGroup & {
    datum?: any;
    orient?: 'bottom' | 'left' | 'right' | 'top';
};
export interface LabelDatum {
    value: any;
}
//TODO - use vega-typings above


export interface MarkStager {
    (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType): void;
}
