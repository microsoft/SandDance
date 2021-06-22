// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import legend from './marks/legend';
import rect from './marks/rect';
import rule, { box } from './marks/rule';
import line from './marks/line';
import text from './marks/text';
import area from './marks/area';

import {
    Axis,
    AxisRole,
    FacetRect,
    Stage,
    StyledLine
} from './interfaces';
import { base } from './base';
import { colorFromString } from './color';
import { groupStrokeWidth } from './defaults';
import {
    GroupType,
    MarkStager,
    MarkStagerOptions,
    AxisSceneGroup
} from './marks/interfaces';
import { Orient, Scene, SceneGroup } from 'vega-typings';

interface VegaAxisDatum {
    domain: boolean;
    grid: boolean;
    labels: boolean;
    orient: Orient;
    ticks: boolean;
    title: boolean;
}

function getOrientItem(group: AxisSceneGroup): { orient?: Orient; } {
    if (group.orient) {
        return group;
    }
    return group.datum as VegaAxisDatum;
}

function convertGroupRole(group: SceneGroup, options: MarkStagerOptions): GroupType {
    if (group.mark.role === 'legend') return GroupType.legend;
    if (group.mark.role === 'axis') {
        if (((group as AxisSceneGroup).mark).zindex === options.zAxisZindex && options.zAxisZindex !== undefined) {
            return GroupType.zAxis;
        }
        const orientItem = getOrientItem(group as AxisSceneGroup);
        if (orientItem) {
            switch (orientItem.orient) {
                case 'bottom':
                case 'top':
                    return GroupType.xAxis;
                case 'left':
                case 'right':
                    return GroupType.yAxis;
            }
        }
    }
}

const group: MarkStager = (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType) => {

    base.vega.sceneVisit(scene, function (g: SceneGroup) {

        const gx = g.x || 0, gy = g.y || 0;
        if (g.context && g.context.background && !stage.backgroundColor) {
            stage.backgroundColor = colorFromString(g.context.background);
        }
        if (g.stroke) {
            const facetRect: FacetRect = {
                datum: g.datum,
                lines: box(gx + x, gy + y, g.height, g.width, g.stroke, groupStrokeWidth)
            };
            stage.facets.push(facetRect);
        }

        groupType = convertGroupRole(g, options) || groupType;
        setCurrentAxis(options, stage, groupType);

        // draw group contents
        base.vega.sceneVisit(g, function (item: Scene) {
            mainStager(options, stage, item, gx + x, gy + y, groupType);
        });

    });
};

function setCurrentAxis(options: MarkStagerOptions, stage: Stage, groupType: GroupType) {
    let axes: Axis[];
    let role: AxisRole;
    switch (groupType) {
        case GroupType.xAxis:
            axes = stage.axes.x;
            role = 'x';
            break;
        case GroupType.yAxis:
            axes = stage.axes.y;
            role = 'y';
            break;
        case GroupType.zAxis:
            axes = stage.axes.z;
            role = 'z';
            break;
        default:
            return;
    }
    options.currAxis = {
        domain: null,
        tickText: [],
        ticks: [],
        role
    };
    axes.push(options.currAxis);
}

const markStagers: { [id: string]: MarkStager } = {
    group,
    legend,
    rect,
    rule,
    line,
    area,
    text
};

var mainStager: MarkStager = (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType) => {
    if (scene.marktype !== 'group' && groupType === GroupType.legend) {
        legend(options, stage, scene, x, y, groupType);
    } else {
        var markStager = markStagers[scene.marktype];
        if (markStager) {
            markStager(options, stage, scene, x, y, groupType);
        } else {
            //console.log(`need to render ${scene.marktype}`);
        }
    }
};

export function sceneToStage(options: MarkStagerOptions, stage: Stage, scene: Scene) {
    mainStager(options, stage, scene, 0, 0, null);
    sortAxis(stage.axes.x, 0);
    sortAxis(stage.axes.y, 1);
}

function sortAxis(axes: Axis[], dim: number) {
    axes.forEach(axis => {
        if (axis.domain) orderDomain(axis.domain, dim);
        axis.ticks.sort((a, b) => a.sourcePosition[dim] - b.sourcePosition[dim]);
        axis.tickText.sort((a, b) => a.position[dim] - b.position[dim]);
    });
}

function orderDomain(domain: StyledLine, dim: number) {
    if (domain.sourcePosition[dim] > domain.targetPosition[dim]) {
        const temp = domain.targetPosition;
        domain.targetPosition = domain.sourcePosition;
        domain.sourcePosition = temp;
    }
}
