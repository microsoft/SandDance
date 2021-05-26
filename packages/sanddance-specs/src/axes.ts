// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SignalNames } from './constants';
import { axesLabelLimit, axesTitleLimit } from './defaults';
import { GlobalScope } from './globalScope';
import { AxisScale, AxisScales, GlobalScales } from './interfaces';
import { addAxes, addScales } from './scope';
import { SpecColumns, SpecViewOptions } from './types';
import { Column } from '@msrvida/chart-types';
import {
    Axis,
    NewSignal,
    Scale,
    Scope,
    TextBaselineValue
} from 'vega-typings';

export interface AxesScope {
    scope: Scope;
    scale?: Scale;
    title: boolean;
    labels: boolean;
    lines: boolean;
}

export interface AxesScopeMap {
    [key: string]: AxesScope[];
}

interface Props {
    globalScope: GlobalScope,
    allGlobalScales: GlobalScales[],
    axisScales: AxisScales,
    plotOffsetSignals: { x: NewSignal, y: NewSignal },
    axesOffsets: { x: number, y: number },
    axesTitlePadding: { x: number, y: number },
    labelBaseline: { x: TextBaselineValue, y: TextBaselineValue },
    specColumns: SpecColumns,
    specViewOptions: SpecViewOptions,
    axesScopes: AxesScopeMap
}

export function addGlobalAxes(props: Props) {
    const { axesOffsets, axisScales, axesScopes, axesTitlePadding, allGlobalScales, globalScope, labelBaseline, plotOffsetSignals, specColumns, specViewOptions } = props;
    const { scope } = globalScope;

    allGlobalScales.forEach(globalScales => {
        const { scales } = globalScales;
        for (let s in scales) {
            let scale: Scale = scales[s];
            if (scale) {
                addScales(scope, scale);
                if (globalScales.showAxes && axisScales && s !== 'z') {
                    let axisScale: AxisScale = axisScales[s];
                    if (axisScale) {
                        const lineColor = specViewOptions.colors.axisLine;
                        const horizontal = s === 'x';
                        const column: Column = specColumns[s] || { quantitative: true };
                        const title = axisScale.title;
                        const props: AxisProps = {
                            title,
                            horizontal,
                            column,
                            specViewOptions,
                            lineColor,
                            titlePadding: axesTitlePadding[s],
                            labelBaseline: labelBaseline[s]
                        };
                        axesScopes['main'].forEach(a => addAxes(a.scope, createAxis({
                            ...props,
                            scale: a.scale || scale,
                            showTitle: a.title,
                            showLabels: a.labels,
                            showLines: a.lines
                        })));

                        if (axesScopes[s]) {
                            axesScopes[s].forEach(a => addAxes(a.scope, createAxis({
                                ...props,
                                scale: a.scale || scale,
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
    });
}

interface AxisProps {
    scale?: Scale;
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
        scale: scale.name,
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
            titleColor: specViewOptions.colors.axisText,
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
            labelColor: specViewOptions.colors.axisText,
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
