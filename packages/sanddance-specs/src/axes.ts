// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SignalNames } from './constants';
import { axesLabelLimit, axesTitleLimit } from './defaults';
import { GlobalScope } from './globalScope';
import { AxisScale, AxisScales, GlobalScales } from './interfaces';
import { addAxes, addScales } from './scope';
import { SpecColumns, SpecViewOptions } from './types';
import { Column, View } from '@msrvida/chart-types';
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
    globalScope: GlobalScope;
    allGlobalScales: GlobalScales[];
    axisScales: AxisScales;
    plotOffsetSignals: { x: NewSignal, y: NewSignal };
    axesOffsets: { x: number, y: number };
    axesTitlePadding: { x: number, y: number };
    labelBaseline: { x: TextBaselineValue, y: TextBaselineValue };
    specColumns: SpecColumns;
    specViewOptions: SpecViewOptions;
    axesScopes: AxesScopeMap;
    faceted: boolean;
    view: View;
}

export function addGlobalAxes(props: Props) {
    const { axesOffsets, axisScales, axesScopes, axesTitlePadding, allGlobalScales, globalScope, labelBaseline, plotOffsetSignals, specColumns, specViewOptions } = props;
    const { scope } = globalScope;

    allGlobalScales.forEach(globalScales => {
        const { scales } = globalScales;
        for (let xyz in scales) {
            let _scales: Scale[] = scales[xyz];
            if (_scales) {
                addScales(scope, ..._scales);
                let { showAxes } = globalScales;
                let zindex: number = undefined;
                if (xyz === 'z') {
                    showAxes = false;
                    if (props.view === '3d' && specViewOptions.zAxisOptions && !props.faceted) {
                        if (specViewOptions.zAxisOptions.showZAxis) {
                            showAxes = true;
                            zindex = specViewOptions.zAxisOptions.zIndex;
                        }
                    }
                }
                if (showAxes && axisScales) {
                    let axisScale: AxisScale = axisScales[xyz];
                    if (axisScale) {
                        const lineColor = specViewOptions.colors.axisLine;
                        const horizontal = xyz === 'x';
                        const column: Column = specColumns[xyz] || { quantitative: true };
                        const title = axisScale.title;
                        const props: AxisProps = {
                            title,
                            horizontal,
                            column,
                            specViewOptions,
                            lineColor,
                            titlePadding: axesTitlePadding[xyz],
                            labelBaseline: labelBaseline[xyz],
                            zindex
                        };
                        axesScopes['main'].forEach(a => addAxes(a.scope, createAxis({
                            ...props,
                            scale: a.scale || _scales[0],
                            showTitle: a.title,
                            showLabels: a.labels,
                            showLines: a.lines
                        })));

                        if (axesScopes[xyz]) {
                            axesScopes[xyz].forEach(a => addAxes(a.scope, createAxis({
                                ...props,
                                scale: a.scale || _scales[0],
                                showTitle: a.title,
                                showLabels: a.labels,
                                showLines: a.lines
                            })));
                        }

                        if (plotOffsetSignals[xyz] && axesOffsets[xyz]) {
                            const plotOffsetSignal = plotOffsetSignals[xyz] as NewSignal;
                            plotOffsetSignal.update = `${axesOffsets[xyz]}`;
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
    zindex: number;
}

function createAxis(props: AxisProps) {
    const { column, horizontal, labelBaseline, lineColor, scale, showLabels, showTitle, showLines, specViewOptions, title, titlePadding, zindex } = props;
    const axis: Axis = {
        zindex,
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
