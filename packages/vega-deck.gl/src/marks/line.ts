// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { colorFromString } from '../color';
import { Cube, Stage, Path } from '../interfaces';
import { Datum, Scene, SceneRect, SceneGroup } from 'vega-typings';
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
    z: number;
    strokeWidth: number;
}

const markStager: MarkStager = (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType) => {
    console.log("in line stager ", scene);

    //    base.vega.sceneVisit(scene, function (item: GroupItem) {

    //for orthographic (2d) - always use 0 or else Deck will not show them
    // const z = stage.view === '2d' ? 0 : (item.z || 0);
    // const depth = (stage.view === '2d' ? 0 : (item.depth || 0)) + min3dDepth;

    //change direction of y from SVG to GL
    const ty = -1;

    const g1 = scene.items[0] as GroupItem;

    const path: Path = {
        // strokeWidth: item.items[0].strokeWidth,
        strokeWidth: g1.strokeWidth ? g1.strokeWidth : 1,
        strokeColor: colorFromString(g1.stroke),
        strokeOpacity: 1.0,
        positions: scene.items.map((it: GroupItem) => { return ([it.x, ty * it.y, it.z ? it.z : 0.0]) })
    };

    stage.pathData.push(path);
    //});

    // console.log("end of  line stager ", stage);

};

export default markStager;