// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import { colorFromString } from '../color';
import { GroupType, MarkStager, MarkStagerOptions } from './interfaces';
import { lineZ } from '../defaults';
import { Scene, SceneLine } from 'vega-typings';
import { Stage, StyledLine } from '../interfaces';
import { zSwap } from '../zaxis';

const markStager: MarkStager = (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType) => {

    base.vega.sceneVisit(scene, function (item: SceneLine) {
        const x1 = item.x || 0;
        const y1 = item.y || 0;
        const x2 = item.x2 != null ? item.x2 : x1;
        const y2 = item.y2 != null ? item.y2 : y1;

        const lineItem = styledLine(x1 + x, y1 + y, x2 + x, y2 + y, item.stroke, item.strokeWidth);

        if (item.mark.role === 'axis-tick') {
            if (options.currAxis.role === 'z') {
                zSwap(lineItem.sourcePosition);
                zSwap(lineItem.targetPosition);
            }
            options.currAxis.ticks.push(lineItem);
        } else if (item.mark.role === 'axis-domain') {
            if (options.currAxis.role === 'z') {
                zSwap(lineItem.sourcePosition);
                zSwap(lineItem.targetPosition);
            }
            options.currAxis.domain = lineItem;
        } else {
            stage.gridLines.push(lineItem);
        }
    });
};

function styledLine(x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number) {
    const line: StyledLine = {
        sourcePosition: [x1, -y1, lineZ], //-1 = change direction of y from SVG to GL
        targetPosition: [x2, -y2, lineZ],
        color: colorFromString(stroke),
        strokeWidth: strokeWidth
    };
    return line;
}

export function box(gx: number, gy: number, height: number, width: number, stroke: string, strokeWidth: number, diagonals = false) {
    const lines = [
        styledLine(gx, gy, gx + width, gy, stroke, strokeWidth),
        styledLine(gx + width, gy, gx + width, gy + height, stroke, strokeWidth),
        styledLine(gx + width, gy + height, gx, gy + height, stroke, strokeWidth),
        styledLine(gx, gy + height, gx, gy, stroke, strokeWidth)
    ];
    if (diagonals) {
        lines.push(styledLine(gx, gy, gx + width, gy + height, stroke, strokeWidth));
        lines.push(styledLine(gx, gy + height, gx + width, gy, stroke, strokeWidth));
    }
    return lines;
}

export default markStager;
