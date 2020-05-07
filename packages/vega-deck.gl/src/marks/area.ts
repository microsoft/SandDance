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
    z: number;
}

const markStager: MarkStager = (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType) => {
    console.log("in area stager ", scene);

//    base.vega.sceneVisit(scene, function (item: GroupItem) {

        //for orthographic (2d) - always use 0 or else Deck will not show them
       // const z = stage.view === '2d' ? 0 : (item.z || 0);
       // const depth = (stage.view === '2d' ? 0 : (item.depth || 0)) + min3dDepth;

        //change direction of y from SVG to GL
        const ty = -1;

      
        const polygon: Polygon = {
                // strokeWidth: item.items[0].strokeWidth,
                strokeWidth: 2,
                strokeColor: scene.items[0].stroke,
                fillColor: scene.items[0].fill,                
                strokeOpacity: 1.0,
                //positions:  scene.items.map( (it)=>{return([it.x, ty*it.y, it.z ? it.z : 0.0, it.x2? it.x2 : it.x, it.y2?ty*it.y2: it.y, it.z2?it.z2:(it.z ? it.z:0) ])})
                positions:  scene.items.map( (it)=>{return[it.x, -1*it.y, it.z, it.x2,-1*it.y2, it.z2]})
            };        

        stage.polygonData.push(polygon);        
    //});
    
   // console.log("end of  line stager ", stage);

};

export default markStager;