/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Insight } from '@msrvida/sanddance-specs';
import { types } from '@msrvida/vega-morphcharts';

export class CharacterSet {
    private chars: string[];

    public resetCharacterSet(forceNewCharacterSet: boolean, oldInsight?: Insight, newInsight?: Insight) {
        if (forceNewCharacterSet || needsNewCharacterSet(oldInsight, newInsight)) {
            this.chars = undefined;
        }
    }

    public getCharacterSet(stage: types.Stage) {
        if (!this.chars) {
            const map: { [char: string]: true } = {};
            const addText = (text: string) => {
                Array.from(text).forEach(char => { map[char] = true; });
            };
            stage.textData.forEach(t => addText(t.text));
            const { x, y } = stage.axes;
            [x, y].forEach(axes => {
                axes.forEach(axis => {
                    if (axis.tickText) axis.tickText.forEach(t => addText(t.text));
                    if (axis.title) addText(axis.title.text);
                });
            });
            this.chars = Object.keys(map);
        }
        return this.chars;
    }
}

function needsNewCharacterSet(oldInsight: Insight, newInsight: Insight) {
    if (!oldInsight) return true;
    if (!newInsight) return true;
    if (oldInsight.chart !== newInsight.chart) return true;
    if (oldInsight.facetStyle !== newInsight.facetStyle) return true;
    if (oldInsight.totalStyle !== newInsight.totalStyle) return true;
    if (oldInsight.hideAxes !== newInsight.hideAxes) return true;
    if (differentObjectValues(oldInsight.signalValues, newInsight.signalValues)) return true;
    if (differentObjectValues(oldInsight.size, newInsight.size)) return true;
    const oldColumns = oldInsight.columns;
    const newColumns = newInsight.columns;
    if (oldColumns.facet !== newColumns.facet) return true;
    if (oldColumns.facetV !== newColumns.facetV) return true;
    if (oldColumns.x !== newColumns.x) return true;
    if (oldColumns.y !== newColumns.y) return true;
    if (oldColumns.z !== newColumns.z) return true;
    return false;
}

function differentObjectValues(a: { [key: string]: any }, b: { [key: string]: any }) {
    if (!a && !b) return false;
    if (!a || !b) return true;
    const keys = Object.keys(b);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const ta = typeof a;
        const tb = typeof b;
        if (ta !== tb) return true;
        if (ta === 'object') {
            return differentObjectValues(a[key], b[key]);
        } else {
            if (a[key] !== b[key]) return true;
        }
    }
    return false;
}
