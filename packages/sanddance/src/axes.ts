// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { RGBAColor } from '@deck.gl/core/utils/color';
import { SpecColorSettings } from '@msrvida/sanddance-specs';
import * as VegaDeckGl from '@msrvida/vega-deck.gl';

function cloneAxis(axes: VegaDeckGl.types.Axis[], axisColor: RGBAColor, axisTextColor: RGBAColor) {
    return axes.map(axis => {
        const newAxis = VegaDeckGl.util.deepMerge(axis);
        newAxis.domain.color = axisColor;
        newAxis.title.color = axisTextColor;
        newAxis.ticks.forEach(t => { t.color = axisColor; });
        newAxis.tickText.forEach(t => { t.color = axisTextColor; });
        return newAxis;
    });
}

function cloneTextData(textData: VegaDeckGl.types.VegaTextLayerDatum[], color: RGBAColor) {
    return textData.map(t => {
        return { ...t, color };
    });
}

export function recolorAxes(stage: VegaDeckGl.types.Stage, oldColors: SpecColorSettings, newColors: SpecColorSettings): Partial<VegaDeckGl.types.Stage> {
    const hasNewLineColor = newColors.axisLine && newColors.axisLine !== oldColors.axisLine;
    const hasNewTextColor = newColors.axisText && newColors.axisText !== oldColors.axisText;
    let axes: {
        x: VegaDeckGl.types.Axis[];
        y: VegaDeckGl.types.Axis[];
    };
    let textData: VegaDeckGl.types.VegaTextLayerDatum[];

    if (hasNewLineColor || hasNewTextColor) {
        const lineColor = VegaDeckGl.util.colorFromString(newColors.axisLine || oldColors.axisLine);
        const textColor = VegaDeckGl.util.colorFromString(newColors.axisText || oldColors.axisText);
        axes = {
            x: cloneAxis(stage.axes.x, lineColor, textColor),
            y: cloneAxis(stage.axes.y, lineColor, textColor)
        };
    }

    if (hasNewTextColor) {
        textData = cloneTextData(stage.textData, VegaDeckGl.util.colorFromString(newColors.axisText));
    }

    return { axes, textData };
}
