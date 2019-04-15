// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from './vega-deck.gl';
import { Color } from '@deck.gl/core/utils/color';
import { SpecColorSettings } from './specs/types';
import { TextLayerDatum } from '@deck.gl/layers/text-layer/text-layer';

function cloneAxis(axes: VegaDeckGl.types.Axis[], axisColor: Color, axisTextColor: Color) {
    return axes.map(axis => {
        const newAxis = VegaDeckGl.util.deepMerge(axis);
        newAxis.domain.color = axisColor;
        newAxis.ticks.forEach(t => { t.color = axisColor });
        newAxis.tickText.forEach(t => { t.color = axisTextColor });
        return newAxis;
    });
}

function cloneTextData(textData: TextLayerDatum[], color: Color) {
    return textData.map(t => {
        return { ...t, color };
    });
}

function colorEquals(a: Color, b: Color) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function recolorAxes(stage: VegaDeckGl.types.Stage, oldColors: SpecColorSettings, newColors: SpecColorSettings): Partial<VegaDeckGl.types.Stage> {
    const hasNewLineColor = newColors.axisLine && !colorEquals(newColors.axisLine, oldColors.axisLine);
    const hasNewTextColor = newColors.axisText && !colorEquals(newColors.axisText, oldColors.axisText);
    let axes: {
        x: VegaDeckGl.types.Axis[];
        y: VegaDeckGl.types.Axis[];
    };
    let textData: TextLayerDatum[];

    if (hasNewLineColor || hasNewTextColor) {
        const lineColor = newColors.axisLine || oldColors.axisLine;
        const textColor = newColors.axisText || oldColors.axisText;
        axes = {
            x: cloneAxis(stage.axes.x, lineColor, textColor),
            y: cloneAxis(stage.axes.y, lineColor, textColor)
        };
    }

    if (hasNewTextColor) {
        textData = cloneTextData(stage.textData, newColors.axisText);
    }

    return { axes, textData };
}
