// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Axis } from 'vega-typings';
import {
    ScaleNames,
    SignalNames
} from '../constants';
import { SpecColumns, SpecViewOptions } from '../types';
import { util } from '../../vega-deck.gl';

export default function (specViewOptions: SpecViewOptions, columns: SpecColumns) {
    const lineColor = util.colorToString(specViewOptions.colors.axisLine);
    const axisColor = {
        "domainColor": lineColor,
        "tickColor": lineColor,
        "labelColor": util.colorToString(specViewOptions.colors.axisText)
    };
    const axes: Axis[] = [
        {
            "orient": "bottom",
            "labelAngle": {
                "signal": SignalNames.TextAngleX
            },
            "labelAlign": "left",
            "labelFontSize": {
                "signal": SignalNames.TextSize
            },
            "scale": ScaleNames.X,
            "title": columns.x.name,
            "titleAngle": {
                "signal": SignalNames.TextAngleX
            },
            "titleAlign": "left",
            "titleFontSize": {
                "signal": SignalNames.TextTitleSize
            },
            "titleColor": util.colorToString(specViewOptions.colors.axisText),
            "tickSize": specViewOptions.tickSize,
            ...axisColor
        },
        {
            "orient": "left",
            "labelAlign": "right",
            "labelAngle": {
                "signal": SignalNames.TextAngleY
            },
            "labelFontSize": {
                "signal": SignalNames.TextSize
            },
            "scale": ScaleNames.Y,
            "title": columns.y.name,
            "titleAngle": {
                "signal": SignalNames.TextAngleY
            },
            "titleAlign": "right",
            "titleFontSize": {
                "signal": SignalNames.TextTitleSize
            },
            "titleColor": util.colorToString(specViewOptions.colors.axisText),
            "tickSize": specViewOptions.tickSize,
            ...axisColor
        }
    ];
    return axes;
}