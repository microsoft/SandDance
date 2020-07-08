// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { GroupType, MarkStager, MarkStagerOptions } from './interfaces';
import { colorFromString } from '../color';
import { Polygon, Stage } from '../interfaces';
import { Datum, Scene, SceneGroup } from 'vega-typings';

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

//change direction of y from SVG to GL
const ty = -1;

const markStager: MarkStager = (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType) => {
    const g: GroupItem = {
        fillOpacity: 1,
        opacity: 1,
        strokeOpacity: 1,
        ...(<GroupItem>scene.items[0])
    };

    const polygon: Polygon = {
        fillColor: colorFromString(g.fill) || [0, 0, 0, 0],
        positions: scene.items.map((item: GroupItem) => {
            item = {
                z: 0,
                ...item
            };
            item = {
                x2: item.x,
                y2: item.y,
                z2: item.z,
                ...item
            };
            return [
                item.x,
                ty * item.y,
                item.z,
                item.x2,
                ty * item.y2,
                item.z2
            ];
        }),
        strokeColor: colorFromString(g.stroke) || [0, 0, 0, 0],
        strokeWidth: g.strokeWidth
    };

    polygon.fillColor[3] *= g.fillOpacity;
    polygon.fillColor[3] *= g.opacity;

    polygon.strokeColor[3] *= g.strokeOpacity;
    polygon.strokeColor[3] *= g.opacity;

    stage.polygonData.push(polygon);
};

export default markStager;