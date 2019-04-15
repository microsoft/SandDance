// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import legend from './marks/legend';
import rect from './marks/rect';
import rule, { box } from './marks/rule';
import text from './marks/text';
import {
    Axis,
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
    SceneGroup2
} from './marks/interfaces';
import { Scene } from 'vega-typings';

interface VegaAxisDatum {
    domain: boolean;
    grid: boolean;
    labels: boolean;
    orient: "bottom" | "left" | "right" | "top";
    ticks: boolean;
    title: boolean;
}

function convertGroupRole(group: SceneGroup2): GroupType {
    if (group.mark.role === "legend") return GroupType.legend;
    if (group.mark.role === "axis") {
        var vegaAxisDatum = group.datum as VegaAxisDatum;
        if (vegaAxisDatum) {
            switch (vegaAxisDatum.orient) {
                case "bottom":
                case "top":
                    return GroupType.xAxis;
                case "left":
                case "right":
                    return GroupType.yAxis;
            }
        }
    }
}

const group: MarkStager = (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType) => {

    base.vega.sceneVisit(scene, function (g: SceneGroup2) {

        if (g.bounds.x1 < options.offsetX) {
            options.offsetX = g.bounds.x1;
        }

        if (g.bounds.y1 < options.offsetY) {
            options.offsetY = g.bounds.y1;
        }

        const gx = g.x || 0, gy = g.y || 0;
        if (g.context && g.context.background && !stage.backgroundColor) {
            stage.backgroundColor = colorFromString(g.context.background)
        }
        if (g.stroke) {
            const facetRect: FacetRect = {
                lines: box(gx + x - options.offsetX, gy + y - options.offsetY, g.height, g.width, g.stroke, groupStrokeWidth)
            };
            stage.facets.push(facetRect);
            options.currFacetRect = facetRect;
        }

        groupType = convertGroupRole(g) || groupType;
        setCurrentAxis(options, stage, groupType);

        // draw group contents
        base.vega.sceneVisit(g, function (item: Scene) {
            mainStager(options, stage, item, gx + x, gy + y, groupType);
        });

    });
};

function setCurrentAxis(options: MarkStagerOptions, stage: Stage, groupType: GroupType) {
    let axes: Axis[];
    switch (groupType) {
        case GroupType.xAxis:
            axes = stage.axes.x;
            break;
        case GroupType.yAxis:
            axes = stage.axes.y;
            break;
        default:
            return;
    }
    options.currAxis = {
        domain: null,
        tickText: [],
        ticks: []
    };
    axes.push(options.currAxis);
}

const markStagers: { [id: string]: MarkStager } = {
    group,
    legend,
    rect,
    rule,
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
}

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
