// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { SignalNames } from '../constants';
import { GlobalScales, InnerScope } from '../interfaces';
import { linearScale, pointScale } from '../scales';
import {
    addData,
    addMarks,
    addOffsets,
    addSignal
} from '../scope';
import { testForCollapseSelection } from '../selection';
import { Column } from '@msrvida/chart-types';
import {
    RectEncodeEntry,
    RectMark,
    Scale,
    Transforms
} from 'vega-typings';

export interface ScatterProps extends LayoutProps {
    x: Column;
    y: Column;
    z: Column;
    scatterPointSizeDisplay: string;
    zGrounded: string;
}

export class Scatter extends Layout {
    private names: {
        aggregateData: string,
        markData: string,
        xScale: string,
        yScale: string,
        zScale: string
    };

    constructor(public props: ScatterProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `scatter_${this.id}`;
        this.names = {
            aggregateData: `data_${p}_aggregate`,
            markData: `data_${p}_mark`,
            xScale: `scale_${p}_x`,
            yScale: `scale_${p}_y`,
            zScale: `scale_${p}_z`
        };
    }

    public build(): InnerScope {
        const { names, prefix, props } = this;
        const { globalScope, parentScope, scatterPointSizeDisplay, x, y, z, zGrounded } = props;

        addSignal(globalScope.scope,
            {
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
            },
            {
                name: SignalNames.ZGrounded,
                value: false,
                bind: {
                    name: zGrounded,
                    input: 'checkbox'
                }
            }
        );

        addData(globalScope.scope, {
            name: names.markData,
            source: globalScope.markDataName,
            transform: [x, y, z].map(c => {
                if (!c || !c.quantitative) return;
                const t: Transforms = {
                    type: 'filter',
                    expr: `isValid(datum[${JSON.stringify(c.name)}])`
                };
                return t;
            }).filter(Boolean)
        });
        globalScope.markDataName = names.markData;

        const globalScales: GlobalScales = { showAxes: true, scales: {} };
        const zValue = z ? `scale(${JSON.stringify(names.zScale)}, datum[${JSON.stringify(z.name)}])` : null;
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
            ...z && {
                z: [
                    {
                        test: testForCollapseSelection(),
                        value: 0
                    },
                    {
                        signal: `${SignalNames.ZGrounded} ? 0 : ${zValue}`
                    }
                ],
                depth: [
                    {
                        test: testForCollapseSelection(),
                        value: 0
                    },
                    {
                        signal: `${SignalNames.ZGrounded} ? ${zValue} : ${SignalNames.PointSize}`
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
                {
                    column: x,
                    xyz: 'x',
                    scaleName: names.xScale,
                    reverse: false,
                    signal: parentScope.sizeSignals.layoutWidth
                },
                {
                    column: y,
                    xyz: 'y',
                    scaleName: names.yScale,
                    reverse: true,
                    signal: parentScope.sizeSignals.layoutHeight
                },
                {
                    column: z,
                    xyz: 'z',
                    scaleName: names.zScale,
                    reverse: false,
                    signal: `${parentScope.sizeSignals.layoutHeight}*${SignalNames.ZProportion}`
                }
            ];
        columnSignals.forEach(cs => {
            const { column, reverse, scaleName, signal, xyz } = cs;
            if (!column) return;
            let scale: Scale;
            if (column.quantitative) {
                scale = linearScale(
                    scaleName,
                    globalScope.data.name,
                    column.name,
                    [0, { signal }],
                    reverse,
                    false
                );
            } else {
                scale = pointScale(
                    scaleName,
                    globalScope.data.name,
                    [0, { signal }],
                    column.name,
                    reverse
                );
            }
            globalScales.scales[xyz] = scale;
        });

        const mark: RectMark = {
            name: prefix,
            type: 'rect',
            from: { data: globalScope.markDataName },
            encode: { update }
        };
        addMarks(globalScope.markGroup, mark);

        return {
            offsets: {
                x: addOffsets(parentScope.offsets.x, `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(x.name)}])`),
                y: addOffsets(parentScope.offsets.y, `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(y.name)}]) - ${SignalNames.PointSize}`),
                h: SignalNames.PointSize,
                w: SignalNames.PointSize
            },
            sizeSignals: {
                layoutHeight: null,
                layoutWidth: null
            },
            globalScales,
            mark,
            encodingRuleMap: {
                y: [
                    {
                        test: testForCollapseSelection(),
                        signal: addOffsets(parentScope.offsets.y, parentScope.sizeSignals.layoutHeight)
                    }
                ]
            }
        };
    }
}
