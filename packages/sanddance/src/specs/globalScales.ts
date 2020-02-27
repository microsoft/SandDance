// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addAxes, addScale } from './scope';
import {
    Axis,
    NewSignal,
    Scale,
    Scope
} from 'vega-typings';
import { AxisScale, AxisScales, GlobalScope } from './interfaces';
import { Column, SpecColumns, SpecViewOptions } from './types';
import { SignalNames } from './constants';
import { util } from '@msrvida/vega-deck.gl';

export function addGlobalScales(
    globalScope: GlobalScope,          //TODO if faceting, scope shoule be each facet!!
    globalScales: { x?: Scale, y?: Scale, z?: Scale },
    axisScales: AxisScales,
    plotOffsetSignals: { x: NewSignal, y: NewSignal },
    specColumns: SpecColumns,
    specViewOptions: SpecViewOptions,
    axesScope: Scope) {

    // const add = (axisScale: AxisScale, scale: Scale, column: Column, orient: AxisOrient) => {
    //     const pa = partialAxes(specViewOptions, AxisType.quantitative, columnToAxisType(column));

    // };

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
                    const axis: Axis = {
                        scale: scale.name,
                        orient: horizontal ? 'bottom' : 'left',
                        title: axisScale.aggregate ? 'TODO aggtitle' : column.name,
                        labelAlign: horizontal ? 'left' : 'right',
                        labelAngle: {
                            signal: horizontal ? SignalNames.TextAngleX : SignalNames.TextAngleY
                        },
                        labelFontSize: {
                            signal: SignalNames.TextSize
                        },
                        titleAngle: {
                            signal: horizontal ? SignalNames.TextAngleX : SignalNames.TextAngleY
                        },
                        titleAlign: horizontal ? 'left' : 'right',
                        titleFontSize: {
                            signal: SignalNames.TextTitleSize
                        },
                        titleColor: util.colorToString(specViewOptions.colors.axisText),
                        tickSize: specViewOptions.tickSize,
                        domainColor: lineColor,
                        tickColor: lineColor,
                        labelColor: util.colorToString(specViewOptions.colors.axisText)
                    };
                    if (column.quantitative) {
                        axis.format = '~r';
                    }
                    addAxes(axesScope, axis);
                    if (plotOffsetSignals[s]) {
                        const plotOffsetSignal = plotOffsetSignals[s] as NewSignal;
                        plotOffsetSignal.update = `200`; //TODO measure axis text????
                    }
                }
            }
        }
    }
}
