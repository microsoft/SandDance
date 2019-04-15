// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Axis } from 'vega-typings';
import {
    MainXScale,
    TextAngleXSignal,
    TextAngleYSignal,
    TextSizeSignal,
    TitleTextSizeSignal
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
                "signal": TextAngleXSignal
            },
            "labelAlign": "left",
            "labelFontSize": {
                "signal": TextSizeSignal
            },
            "scale": MainXScale,
            "title": columns.x.name,
            "titleAngle": {
                "signal": TextAngleXSignal
            },
            "titleAlign": "left",
            "titleFontSize": {
                "signal": TitleTextSizeSignal
            },
            "titleColor": util.colorToString(specViewOptions.colors.axisText),
            "tickSize": specViewOptions.tickSize,
            ...axisColor
        },
        {
            "orient": "left",
            "labelAlign": "right",
            "labelAngle": {
                "signal": TextAngleYSignal
            },
            "labelFontSize": {
                "signal": TextSizeSignal
            },
            "scale": "yscalelabel",
            "encode": {
                "labels": {
                    "update": {
                        "text": {
                            "signal": "shapesPerRow * datum.value"
                        }
                    }
                }
            },
            "title": "Count",
            "titleAngle": {
                "signal": TextAngleYSignal
            },
            "titleAlign": "right",
            "titleFontSize": {
                "signal": TitleTextSizeSignal
            },
            "titleColor": util.colorToString(specViewOptions.colors.axisText),
            "tickSize": specViewOptions.tickSize,
            ...axisColor
        }
    ];
    return axes;
}