/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { GroupType, MarkStager, MarkStagerOptions } from './interfaces';
import { colorFromString } from '../color';
import { Polygon, Position, Stage } from '../interfaces';
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
        strokeWidth: 0,
        depth: 0,
        ...(<GroupItem>scene.items[0]),
    };

    const points = scene.items.map((item: GroupItem) => {
        item = {
            z: 0,
            ...item,
        };
        item = {
            x2: item.x,
            y2: item.y,
            z2: item.z,
            ...item,
        };
        return [
            item.x,
            ty * item.y,
            item.z,
            item.x2,
            ty * item.y2,
            item.z2,
        ];
    });

    //TODO populate column instead of item
    const positions: Position[] = [];

    const startpoint: Position = [points[0][0], points[0][1], points[0][2]];
    points.forEach(p => {
        positions.push([p[0], p[1], p[2]]);
    });
    points.reverse().forEach(p => {
        positions.push([p[3], p[4], p[5]]);
    });
    positions.push(startpoint);

    const polygon: Polygon = {
        fillColor: colorFromString(g.fill) || [0, 0, 0, 0],
        positions,
        strokeColor: colorFromString(g.stroke) || [0, 0, 0, 0],
        strokeWidth: g.strokeWidth,
        depth: g.depth,
    };

    polygon.fillColor[3] *= g.fillOpacity;
    polygon.fillColor[3] *= g.opacity;

    polygon.strokeColor[3] *= g.strokeOpacity;
    polygon.strokeColor[3] *= g.opacity;

    stage.polygonData.push(polygon);
};

export default markStager;