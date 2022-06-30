// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { GroupType, MarkStager, MarkStagerOptions } from './interfaces';
import { colorFromString } from '../color';
import { Path, Stage } from '../interfaces';
import { Datum, Scene, SceneGroup } from 'vega-typings';

type GroupItem = SceneGroup & {
    datum: Datum;
    length: number;
    depth: number;
    opacity: number;
    z: number;
    strokeWidth: number,
    strokeOpacity: number;
}

//change direction of y from SVG to GL
const ty = -1;

const markStager: MarkStager = (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType) => {

    const g: GroupItem = {
        opacity: 1,
        strokeOpacity: 1,
        strokeWidth: 1,
        ...(<GroupItem>scene.items[0]),
    };

    const path: Path = {
        strokeWidth: g.strokeWidth,
        strokeColor: colorFromString(g.stroke),
        positions: scene.items.map((it: GroupItem) => [
            it.x,
            ty * it.y,
            it.z || 0,
        ]),
    };

    path.strokeColor[3] *= g.strokeOpacity;
    path.strokeColor[3] *= g.opacity;

    stage.pathData.push(path);
};

export default markStager;