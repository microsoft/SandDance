import { SpecViewOptions } from "./types";
import { util } from "../vega-deck.gl";
import { Axis } from "vega-typings";
import { SignalNames } from "./constants";

export function partialAxes(specViewOptions: SpecViewOptions) {
    const lineColor = util.colorToString(specViewOptions.colors.axisLine);
    const axisColor = {
        "domainColor": lineColor,
        "tickColor": lineColor,
        "labelColor": util.colorToString(specViewOptions.colors.axisText)
    };
    const bottom: Partial<Axis> = {
        "orient": "bottom",
        "labelAlign": "left",
        "labelAngle": {
            "signal": SignalNames.TextAngleX
        },
        "labelFontSize": {
            "signal": SignalNames.TextSize
        },
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
    };
    const left: Partial<Axis> =
    {
        "orient": "left",
        "labelAlign": "right",
        "labelAngle": {
            "signal": SignalNames.TextAngleY
        },
        "labelFontSize": {
            "signal": SignalNames.TextSize
        },
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
    };
    return { left, bottom };
}
