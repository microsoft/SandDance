// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { SignalNames } from '../constants';
import { scatterSizedDiv } from '../defaults';
import { safeFieldName } from '../expr';
import { GlobalScales, InnerScope } from '../interfaces';
import { linearScale, pointScale } from '../scales';
import {
    addData,
    addMarks,
    addOffsets,
    addScales,
    addSignals,
    addTransforms
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
    size: Column;
    scatterPointScaleDisplay: string;
    zGrounded: string;
}

export class Scatter extends Layout {
    private names: {
        aggregateData: string,
        markData: string,
        sizeExtent: string,
        sizeRange: string,
        sizeScale: string,
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
            sizeExtent: `${p}_sizeExtent`,
            sizeRange: `${p}_sizeRange`,
            sizeScale: `${p}_sizeScale`,
            xScale: `scale_${p}_x`,
            yScale: `scale_${p}_y`,
            zScale: `scale_${p}_z`
        };
    }

    public build(): InnerScope {
        const { names, prefix, props } = this;
        const { globalScope, parentScope, scatterPointScaleDisplay, size, x, y, z, zGrounded } = props;
        const qsize = size && size.quantitative && size;

        addSignals(globalScope.scope,
            {
                name: SignalNames.PointScale,
                value: 5,
                bind: {
                    name: scatterPointScaleDisplay,
                    debounce: 50,
                    input: 'range',
                    min: 1,
                    max: 10,
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

        if (qsize) {
            addTransforms(globalScope.data,
                {
                    type: 'extent',
                    field: safeFieldName(qsize.name),
                    signal: names.sizeExtent
                }
            );
            addScales(globalScope.scope,
                {
                    name: names.sizeScale,
                    type: 'linear',
                    domain: [0, { signal: `${names.sizeExtent}[1]` }],
                    range: [0, { signal: names.sizeRange }]
                }
            );
            addSignals(globalScope.scope,
                {
                    name: names.sizeRange,
                    update: `min(${parentScope.sizeSignals.layoutHeight}, ${parentScope.sizeSignals.layoutWidth}) / ${scatterSizedDiv}`
                }
            );
        }

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
        globalScope.setMarkDataName(names.markData);

        const globalScales: GlobalScales = { showAxes: true, scales: {} };
        const zValue = z ? `scale(${JSON.stringify(names.zScale)}, datum[${JSON.stringify(z.name)}])` : null;
        const sizeValueSignal = qsize ?
            `scale(${JSON.stringify(names.sizeScale)}, datum[${JSON.stringify(qsize.name)}]) * ${SignalNames.PointScale}`
            : SignalNames.PointScale;

        const update: RectEncodeEntry = {
            height: [
                {
                    test: testForCollapseSelection(),
                    value: 0
                },
                {
                    signal: sizeValueSignal
                }
            ],
            width: {
                signal: sizeValueSignal
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
                        signal: `${SignalNames.ZGrounded} ? ${zValue} : ${sizeValueSignal}`
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
                signal: `(${globalScope.zSize}) * ${SignalNames.ZProportion}`
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
                y: addOffsets(parentScope.offsets.y, `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(y.name)}]) - ${sizeValueSignal}`),
                h: sizeValueSignal,
                w: sizeValueSignal
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
