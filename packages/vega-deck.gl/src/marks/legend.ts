// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from '../base';
import {
    GroupType,
    LabelDatum,
    MarkStager,
    MarkStagerOptions
} from './interfaces';
import { Legend, LegendRowSymbol, Stage } from '../interfaces';
import {
    Scene,
    SceneItem,
    SceneLegendItem,
    SceneSymbol,
    SceneText
} from 'vega-typings';

const legendMap: { [role: string]: (legend: Legend, item: SceneItem) => void } = {

    'legend-title': function (legend: Legend, textItem: SceneText) {
        legend.title = textItem.text;
    },

    'legend-symbol': function (legend: Legend, symbol: SceneSymbol & SceneLegendItem) {
        const { bounds, fill, shape } = symbol;
        //this object is safe for serialization
        const legendRowSymbol: LegendRowSymbol = { bounds, fill, shape };
        const i = symbol.datum.index;
        legend.rows[i] = legend.rows[i] || {};
        legend.rows[i].symbol = legendRowSymbol;
    },

    'legend-label': function (legend: Legend, label: SceneText & SceneLegendItem) {
        const i = label.datum.index;
        legend.rows[i] = legend.rows[i] || {};
        const row = legend.rows[i];
        row.label = label.text;
        row.value = (label.datum as unknown as LabelDatum).value;
    }

};

const markStager: MarkStager = (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType) => {
    base.vega.sceneVisit(scene, function (item: SceneItem) {
        const fn = legendMap[item.mark.role];
        if (fn) {
            fn(stage.legend, item);
        } else {
            //console.log(`need to render legend ${item.mark.role}`);
        }
    });
};

export default markStager;
