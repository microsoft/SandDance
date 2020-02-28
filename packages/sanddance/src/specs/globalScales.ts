// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addAxes, addScale } from './scope';
import { axesLabelLimit, axesTitleLimit, axesTitlePaddingX, axesTitlePaddingY } from './defaults';
import {
    Axis,
    NewSignal,
    Scale,
    Scope,
    TextBaselineValue
} from 'vega-typings';
import { AxisScale, AxisScales, GlobalScope } from './interfaces';
import { Column, SpecColumns, SpecViewOptions } from './types';
import { SignalNames } from './constants';
import { util } from '@msrvida/vega-deck.gl';

export interface AxesScope {
    scope: Scope;
    labels: boolean;
}

export interface AxesScopeMap {
    [key: string]: AxesScope;
}

export function addGlobalScales(
    globalScope: GlobalScope,
    globalScales: { x?: Scale, y?: Scale, z?: Scale },
    axisScales: AxisScales,
    plotOffsetSignals: { x: NewSignal, y: NewSignal },
    axesOffsets: { x: number, y: number },
    axesTitlePadding: { x: number, y: number },
    labelBaseline: { x: TextBaselineValue, y: TextBaselineValue },
    specColumns: SpecColumns,
    specViewOptions: SpecViewOptions,
    axesScopes: AxesScopeMap) {

    // add(axisScales.x, globalScales.x, specColumns.x, 'bottom');
    // add(axisScales.y, globalScales.y, specColumns.y, 'left');
    // add(axisScales.z, globalScales.z, specColumns.z, 'left');

    const { scope } = globalScope;

    //TODO always add Z scale to global scope

    for (let s in globalScales) {
        let scale: Scale = globalScales[s];
        if (scale) {
            //TODO check to see if scale exists in global scope
            addScale(scope, scale);
            if (axisScales) {
                let axisScale: AxisScale = axisScales[s];
                if (axisScale) {
                    const lineColor = util.colorToString(specViewOptions.colors.axisLine);
                    switch (axisScale.type) {
                        //band scale
                        //continuous scale
                        //etc
                    }
                    //const pa = partialAxes(specViewOptions, AxisType.quantitative, columnToAxisType(specColumns[s]));
                    const horizontal = s === 'x';
                    const column: Column = specColumns[s];
                    addAxes(axesScopes['main'].scope, createAxis(scale, horizontal, axisScale, column, specViewOptions, lineColor, axesScopes['main'].labels, axesTitlePadding[s], labelBaseline[s]));
                    if (axesScopes[s]) {
                        addAxes(axesScopes[s].scope, createAxis(scale, horizontal, axisScale, column, specViewOptions, lineColor, axesScopes[s].labels, axesTitlePadding[s], labelBaseline[s]));
                    }
                    if (plotOffsetSignals[s] && axesOffsets[s]) {
                        const plotOffsetSignal = plotOffsetSignals[s] as NewSignal;
                        plotOffsetSignal.update = `${axesOffsets[s]}`;
                    }
                }
            }
        }
    }
}

function createAxis(scale: Scale, horizontal: boolean, axisScale: AxisScale, column: Column, specViewOptions: SpecViewOptions, lineColor: string, labels: boolean, titlePadding: number, labelBaseline: TextBaselineValue) {
    const axis: Axis = {
        scale: scale.name,
        orient: horizontal ? 'bottom' : 'left',
        domainColor: lineColor,
        tickColor: lineColor,
        tickSize: specViewOptions.tickSize,
        labels,
        ...labels && {
            title: axisScale.aggregate ? 'TODO aggtitle' : column.name,
            titleAlign: horizontal ? 'left' : 'right',
            titleAngle: {
                signal: horizontal ? SignalNames.TextAngleX : SignalNames.TextAngleY
            },
            titleColor: util.colorToString(specViewOptions.colors.axisText),
            titleFontSize: {
                signal: SignalNames.TextTitleSize
            },
            titleLimit: axesTitleLimit,
            titlePadding,
            labelAlign: horizontal ? 'left' : 'right',
            labelBaseline,
            labelAngle: {
                signal: horizontal ? SignalNames.TextAngleX : SignalNames.TextAngleY
            },
            labelColor: util.colorToString(specViewOptions.colors.axisText),
            labelFontSize: {
                signal: SignalNames.TextSize
            },
            labelLimit: axesLabelLimit
        }
    };
    if (column.quantitative) {
        axis.format = '~r';
    }
    return axis;
}
