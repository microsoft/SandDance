// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { colorFromString } from '../color';
import { Stage, Polygon } from '../interfaces';
import { Datum, Scene, SceneRect, SceneGroup, AreaMark } from 'vega-typings';
import { GroupType, MarkStager, MarkStagerOptions } from './interfaces';
import { min3dDepth } from '../defaults';

type SceneCube = SceneRect & {
    datum: Datum;
    depth: number;
    opacity: number;
    z: number;
}

type GroupItem = SceneGroup & {
    datum: Datum;
    length: number;
    depth: number;
    opacity: number;
    fillOpacity: number;
    fill: string;
    strokeOpacity: number;
    strokeWidth: number;
    z: number;
    z2: number;
    x2: number;
    y2: number;
}

const markStager: MarkStager = (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType) => {
    const g = scene.items[0] as GroupItem;

    let { fillOpacity, opacity, strokeOpacity } = g;
    if (fillOpacity === undefined) fillOpacity = 1;
    if (opacity === undefined) opacity = 1;
    if (strokeOpacity === undefined) strokeOpacity = 1;

    const polygon: Polygon = {
        fillColor: colorFromString(g.fill) || [0, 0, 0, 0],
        positions: scene.items.map((it: GroupItem) => [
            it.x,
            -1 * it.y,
            'z' in it ? it.z : 0,
            'x2' in it ? it.x2 : it.x,
            'y2' in it ? -1 * it.y2 : -1 * it.y,
            'z2' in it ? it.z2 : ('z' in it ? it.z : 0)
        ]),
        strokeColor: colorFromString(g.stroke) || [0, 0, 0, 0],
        strokeWidth: g.strokeWidth
    };

    polygon.fillColor[3] *= fillOpacity;
    polygon.fillColor[3] *= opacity;

    polygon.strokeColor[3] *= strokeOpacity;
    polygon.strokeColor[3] *= opacity;

    stage.polygonData.push(polygon);
};

export default markStager;