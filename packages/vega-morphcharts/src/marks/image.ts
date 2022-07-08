/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { Stage } from '../interfaces';
import { Scene, SceneItem } from 'vega-typings';
import { GroupType, MarkStager, MarkStagerOptions } from './interfaces';

interface SceneImage extends SceneItem {
    height: number;
    url: string;
    width: number;
}

const markStager: MarkStager = (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType) => {
    base.vega.sceneVisit(scene, function (item: SceneImage) {
        const { bounds, height, url, width } = item;
        let { x1, x2, y1, y2 } = bounds;
        x1 += x;
        x2 += x;
        y1 += y;
        y2 += y;
        if (!stage.backgroundImages) {
            stage.backgroundImages = [];
        }
        stage.backgroundImages.push({ bounds: { x1, x2, y1, y2 }, height, url, width });
    });
};

export default markStager;
