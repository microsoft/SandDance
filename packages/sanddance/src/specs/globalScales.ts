// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addAxes, addScale } from './scope';
import {
    Aggregate,
    AxisScale,
    AxisScales,
    GlobalScope
} from './interfaces';
import {
    axesLabelLimit,
    axesTitleLimit
} from './defaults';
import {
    Axis,
    NewSignal,
    Scale,
    Scope,
    TextBaselineValue
} from 'vega-typings';
import {
    Column,
    SpecColumns,
    SpecLanguage,
    SpecViewOptions
} from './types';
import { SignalNames } from './constants';
import { util } from '@msrvida/vega-deck.gl';

export interface AxesScope {
    scope: Scope;
    scale?: string;
    title: boolean;
    labels: boolean;
    lines: boolean;
}

export interface AxesScopeMap {
    [key: string]: AxesScope[];
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
                    const title = aggregateTitle(axisScale.aggregate, specViewOptions.language, column);
                    const props: AxisProps = {
                        title,
                        horizontal,
                        column,
                        specViewOptions,
                        lineColor,
                        titlePadding: axesTitlePadding[s],
                        labelBaseline: labelBaseline[s]
                    }
                    axesScopes['main'].forEach(a => addAxes(a.scope, createAxis({
                        ...props,
                        scale: a.scale || scale.name,
                        showTitle: a.title,
                        showLabels: a.labels,
                        showLines: a.lines
                    })));

                    if (axesScopes[s]) {
                        axesScopes[s].forEach(a => addAxes(a.scope, createAxis({
                            ...props,
                            scale: a.scale || scale.name,
                            showTitle: a.title,
                            showLabels: a.labels,
                            showLines: a.lines
                        })));
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

function aggregateTitle(aggregate: Aggregate, language: SpecLanguage, column: Column) {
    switch (aggregate) {
        case 'count': return language.count;
        case 'percent': return language.percent;
        case 'sum': return language.sum;
        default:
            return column.name;
    }
}

interface AxisProps {
    scale?: string;
    title: string;
    horizontal: boolean;
    column: Column;
    specViewOptions: SpecViewOptions;
    lineColor: string;
    showLines?: boolean;
    showTitle?: boolean;
    showLabels?: boolean;
    titlePadding: number;
    labelBaseline: TextBaselineValue;
}

function createAxis(props: AxisProps) {
    const { column, horizontal, labelBaseline, lineColor, scale, showLabels, showTitle, showLines, specViewOptions, title, titlePadding } = props;
    const axis: Axis = {
        scale,
        orient: horizontal ? 'bottom' : 'left',
        domain: showLines,
        ticks: showLines,
        ...showLines && {
            domainColor: lineColor,
            tickColor: lineColor,
            tickSize: specViewOptions.tickSize
        },
        ...showTitle && {
            title,
            titleAlign: horizontal ? 'left' : 'right',
            titleAngle: {
                signal: horizontal ? SignalNames.TextAngleX : SignalNames.TextAngleY
            },
            titleColor: util.colorToString(specViewOptions.colors.axisText),
            titleFontSize: {
                signal: SignalNames.TextTitleSize
            },
            titleLimit: axesTitleLimit,
            titlePadding
        },
        labels: showLabels,
        ...showLabels && {
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