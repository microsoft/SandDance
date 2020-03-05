// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addData, addMarks, addSignal } from '../scope';
import { Column } from '../types';
import { GlobalScales, InnerScope } from '../interfaces';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { linearScale, pointScale } from '../scales';
import {
    RectEncodeEntry,
    RectMark,
    Scale,
    Transforms
} from 'vega-typings';
import { SignalNames } from '../constants';
import { testForCollapseSelection } from '../selection';

export interface ScatterProps extends LayoutProps {
    x: Column;
    y: Column;
    z: Column;
    scatterPointSizeDisplay: string
}

export class Scatter extends Layout {
    private names: {
        aggregateData: string,
        xScale: string,
        yScale: string,
        zScale: string,
        validData: string
    };

    constructor(public props: ScatterProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `scatter_${this.id}`;
        this.names = {
            aggregateData: `data_${p}_aggregate`,
            xScale: `scale_${p}_x`,
            yScale: `scale_${p}_y`,
            zScale: `scale_${p}_z`,
            validData: `data_${p}_valid`
        };
    }

    public build(): InnerScope {
        const { names, props } = this;
        const { globalScope, parentScope, scatterPointSizeDisplay, x, y, z } = props;

        addSignal(globalScope.scope, {
            name: SignalNames.PointSize,
            value: 5,
            bind: {
                name: scatterPointSizeDisplay,
                debounce: 50,
                input: 'range',
                min: 1,
                max: 25,
                step: 1
            }
        });
        addData(parentScope.scope, {
            name: names.validData,
            source: parentScope.dataName,
            transform: [x, y, z].map(c => {
                if (!c || !c.quantitative) return;
                const t: Transforms = {
                    type: 'filter',
                    expr: `isValid(datum[${JSON.stringify(c.name)}])`
                };
                return t;
            }).filter(Boolean)
        });

        const globalScales: GlobalScales = {};
        const update: RectEncodeEntry = {
            height: [
                {
                    test: testForCollapseSelection(),
                    value: 0
                },
                {
                    signal: SignalNames.PointSize
                }
            ],
            width: {
                signal: SignalNames.PointSize
            },
            x: {
                scale: names.xScale,
                field: x.name
            },
            y: [
                {
                    scale: names.yScale,
                    test: testForCollapseSelection(),
                    value: 0
                },
                {
                    scale: names.yScale,
                    field: y.name,
                    offset: {
                        signal: `-${SignalNames.PointSize}`
                    }
                }
            ],
            ...z && {
                z: [
                    {
                        test: testForCollapseSelection(),
                        value: 0
                    },
                    {
                        scale: names.zScale,
                        field: z && z.name
                    }
                ],
                depth: [
                    {
                        test: testForCollapseSelection(),
                        value: 0
                    },
                    {
                        signal: SignalNames.PointSize
                    }
                ]
            }
        };

        const columnSignals: {
            column: Column,
            xyz: 'x' | 'y' | 'z',
            scaleName: string,
            reverse: boolean,
            signal: string
        }[] = [
                { column: x, xyz: 'x', scaleName: names.xScale, reverse: false, signal: parentScope.sizeSignals.layoutWidth },
                { column: y, xyz: 'y', scaleName: names.yScale, reverse: true, signal: parentScope.sizeSignals.layoutHeight },
                { column: z, xyz: 'z', scaleName: names.zScale, reverse: false, signal: `${parentScope.sizeSignals.layoutHeight}*${SignalNames.ZProportion}` }
            ];
        columnSignals.forEach(cs => {
            const { column, reverse, scaleName, signal, xyz } = cs;
            if (!column) return;
            let scale: Scale;
            if (column.quantitative) {
                scale = linearScale(
                    scaleName,
                    globalScope.dataName,
                    column.name,
                    [0, { signal }],
                    reverse,
                    false
                );
            } else {
                scale = pointScale(
                    scaleName,
                    globalScope.dataName,
                    [0, { signal }],
                    column.name,
                    reverse
                );
            }
            globalScales[xyz] = scale;
        });

        const mark: RectMark = {
            type: 'rect',
            from: { data: names.validData },
            encode: { update }
        };
        addMarks(parentScope.scope, mark)

        return {
            dataName: null,
            sizeSignals: {
                layoutHeight: null,
                layoutWidth: null
            },
            globalScales,
            mark
        };
    }
}
