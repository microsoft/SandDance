// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { colorFromString } from '../color';
import { Shape, Stage } from '../interfaces';
import { Datum, Scene, SceneRect } from 'vega-typings';
import { GroupType, MarkStager, MarkStagerOptions } from './interfaces';
import { min3dDepth } from '../defaults';

type SceneCube = SceneRect & {
    datum: Datum & { GL_ORDINAL: number };
    depth: number;
    opacity: number;
    z: number;
}

const markStager: MarkStager = (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType) => {

    let i = 0;

    base.vega.sceneVisit(scene, function (item: SceneCube) {

        //for orthographic (2d) - always use 0 or else Deck will not show them
        const z = stage.view === '2d' ? 0 : (item.z || 0);
        const depth = (stage.view === '2d' ? 0 : (item.depth || 0)) + min3dDepth;

        //change direction of y from SVG to GL
        const ty = -1;

        let ordinal = i;
        if (item.datum.GL_ORDINAL !== void 0) {
            options.ordinalsSpecified = true;

            ordinal = item.datum.GL_ORDINAL;
            if (ordinal > options.maxOrdinal) {
                options.maxOrdinal = ordinal;
            }
        }

        const px = x + (item.x || 0) - options.offsetX;
        const py = ty * (y + (item.y || 0) - options.offsetY) - item.height;
        const position = [px, py, z];

        const shape: Shape = {
            ordinal,
            polygon: [
                position,
                [px + item.width, py, z],
                [px + item.width, py + item.height, z],
                [px, py + item.height, z],
                position
            ],
            depth,
            color: colorFromString(item.fill) || options.defaultShapeColor || [128, 128, 128, 128]
        };

        shape.color[3] = item.opacity === undefined ? 255 : 255 * item.opacity;

        stage.shapeData.push(shape);

        i++;
    });

};

export default markStager;
