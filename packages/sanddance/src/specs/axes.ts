// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Axis } from 'vega-typings';
import { Column, SpecViewOptions } from './types';
import { SignalNames } from './constants';
import { util } from '../vega-deck.gl';

export enum AxisType {
    quantitative, categoric, date
}

export function columnToAxisType(c: Column): AxisType {
    if (c.type === 'date') {
        return AxisType.date;
    }
    if (c.quantitative) {
        return AxisType.quantitative
    }
    return AxisType.categoric;
}

export function partialAxes(specViewOptions: SpecViewOptions, bottomType: AxisType, leftType: AxisType) {
    const lineColor = util.colorToString(specViewOptions.colors.axisLine);
    const axisColor = {
        domainColor: lineColor,
        tickColor: lineColor,
        labelColor: util.colorToString(specViewOptions.colors.axisText)
    };
    const bottom: Partial<Axis> = {
        orient: 'bottom',
        labelAlign: 'left',
        labelAngle: {
            signal: SignalNames.TextAngleX
        },
        labelFontSize: {
            signal: SignalNames.TextSize
        },
        titleAngle: {
            signal: SignalNames.TextAngleX
        },
        titleAlign: 'left',
        titleFontSize: {
            signal: SignalNames.TextTitleSize
        },
        titleColor: util.colorToString(specViewOptions.colors.axisText),
        tickSize: specViewOptions.tickSize,
        ...axisColor
    };
    if (bottomType === AxisType.quantitative) {
        bottom.format = '~r';
    }
    const left: Partial<Axis> =
    {
        orient: 'left',
        labelAlign: 'right',
        labelAngle: {
            signal: SignalNames.TextAngleY
        },
        labelFontSize: {
            signal: SignalNames.TextSize
        },
        titleAngle: {
            signal: SignalNames.TextAngleY
        },
        titleAlign: 'right',
        titleFontSize: {
            signal: SignalNames.TextTitleSize
        },
        titleColor: util.colorToString(specViewOptions.colors.axisText),
        tickSize: specViewOptions.tickSize,
        ...axisColor
    };
    if (leftType === AxisType.quantitative) {
        left.format = '~r';
    }
    return { left, bottom };
}
