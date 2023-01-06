/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { SignalNames } from '../constants';
import { debounce, scatterSizedDiv } from '../defaults';
import { safeFieldName } from '../expr';
import { GlobalScales, InnerScope } from '../interfaces';
import { linearScale, pointScale } from '../scales';
import {
    addData,
    addMarks,
    addOffsets,
    addScales,
    addSignals,
    addTransforms,
} from '../scope';
import { testForCollapseSelection } from '../selection';
import { Column, Dimension3D, View } from '@msrvida/chart-types';
import {
    RectEncodeEntry,
    RectMark,
    Scale,
    ScaleData,
    SignalRef,
    Transforms,
} from 'vega-typings';
import { Extents } from '../types';
import { dataExtent } from '../transforms';
import { outerExtentSignal, shouldBeIntegralBinStep } from '../bin';

export interface ScatterProps extends LayoutProps {
    x: Column;
    y: Column;
    z: Column;
    size: Column;
    scatterPointScaleDisplay: string;
    zGrounded: string;
    showAxes: boolean;
    backgroundImageExtents: Extents;
    view: View;
}

export class Scatter extends Layout {
    private names: {
        aggregateData: string,
        markData: string,
        xDataExtent: string,
        yDataExtent: string,
        xExtent: string,
        yExtent: string,
        sizeExtent: string,
        sizeRange: string,
        sizeScale: string,
        xScale: string,
        yScale: string,
        zScale: string,
    };

    constructor(public props: ScatterProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `scatter_${this.id}`;
        this.names = {
            aggregateData: `data_${p}_aggregate`,
            markData: `data_${p}_mark`,
            xDataExtent: `${p}_xDataExtent`,
            yDataExtent: `${p}_yDataExtent`,
            xExtent: `${p}_xExtent`,
            yExtent: `${p}_yExtent`,
            sizeExtent: `${p}_sizeExtent`,
            sizeRange: `${p}_sizeRange`,
            sizeScale: `${p}_sizeScale`,
            xScale: `scale_${p}_x`,
            yScale: `scale_${p}_y`,
            zScale: `scale_${p}_z`,
        };
    }

    public build(): InnerScope {
        const { names, prefix, props } = this;
        const { backgroundImageExtents, globalScope, parentScope, scatterPointScaleDisplay, showAxes, size, view, x, y, z, zGrounded } = props;
        const qsize = size && size.quantitative && size;

        addSignals(globalScope.scope,
            {
                name: SignalNames.PointScale,
                value: 5,
                bind: {
                    name: scatterPointScaleDisplay,
                    debounce,
                    input: 'range',
                    min: 1,
                    max: 10,
                    step: 1,
                },
            },
            {
                name: SignalNames.ZGrounded,
                value: false,
                bind: {
                    name: zGrounded,
                    input: 'checkbox',
                },
            },
        );

        if (backgroundImageExtents) {
            addTransforms(globalScope.data,
                dataExtent(x, names.xDataExtent),
                dataExtent(y, names.yDataExtent),
            );
            const xSignal = outerExtentSignal(names.xExtent, backgroundImageExtents.left, backgroundImageExtents.right, names.xDataExtent);
            const ySignal = outerExtentSignal(names.yExtent, backgroundImageExtents.bottom, backgroundImageExtents.top, names.yDataExtent);
            addSignals(globalScope.scope, xSignal, ySignal);
        }

        if (qsize) {
            addTransforms(globalScope.data,
                {
                    type: 'extent',
                    field: safeFieldName(qsize.name),
                    signal: names.sizeExtent,
                },
            );
            addScales(globalScope.scope,
                {
                    name: names.sizeScale,
                    type: 'pow',
                    exponent: 0.5,
                    domain: [0, { signal: `${names.sizeExtent}[1]` }],
                    range: [0, { signal: names.sizeRange }],
                },
            );
            addSignals(globalScope.scope,
                {
                    name: names.sizeRange,
                    update: `min(${parentScope.sizeSignals.layoutHeight}, ${parentScope.sizeSignals.layoutWidth}) / ${scatterSizedDiv}`,
                },
            );
        }

        addData(globalScope.scope, {
            name: names.markData,
            source: globalScope.markDataName,
            transform: [x, y, z].map(c => {
                if (!c || !c.quantitative) return;
                const t: Transforms = {
                    type: 'filter',
                    expr: `isValid(datum[${JSON.stringify(c.name)}])`,
                };
                return t;
            }).filter(Boolean),
        });
        globalScope.setMarkDataName(names.markData);

        const globalScales: GlobalScales = { showAxes, scales: {} };
        const zValue = z ? `scale(${JSON.stringify(names.zScale)}, datum[${JSON.stringify(z.name)}])` : null;
        const sizeValueSignal = qsize ?
            `scale(${JSON.stringify(names.sizeScale)}, datum[${JSON.stringify(qsize.name)}]) * ${SignalNames.PointScale}`
            : SignalNames.PointScale;

        const update: RectEncodeEntry = {
            height: [
                {
                    test: testForCollapseSelection(),
                    value: 0,
                },
                {
                    signal: sizeValueSignal,
                },
            ],
            width: {
                signal: sizeValueSignal,
            },
            ...z && {
                z: [
                    {
                        test: testForCollapseSelection(),
                        value: 0,
                    },
                    {
                        signal: `${SignalNames.ZGrounded} ? 0 : ${zValue}`,
                    },
                ],
                zindex: [
                    {
                        signal: `${SignalNames.ZGrounded} ? 0 : ${zValue}`,
                    },
                ],
                depth: [
                    {
                        test: testForCollapseSelection(),
                        value: 0,
                    },
                    {
                        signal: view === '3d'
                            ? `${SignalNames.ZGrounded} ? ${zValue} : ${sizeValueSignal}`
                            : '0',
                    },
                ],
            },
        };

        const columnSignals: {
            column: Column,
            xyz: Dimension3D,
            scaleName: string,
            domain: ScaleData | SignalRef,
            reverse: boolean,
            signal: string
        }[] = [
            {
                column: x,
                xyz: 'x',
                scaleName: names.xScale,
                domain: backgroundImageExtents ?
                    {
                        signal: names.xExtent,
                    }
                    :
                    {
                        data: globalScope.data.name,
                        field: safeFieldName(x.name),
                    },
                reverse: false,
                signal: parentScope.sizeSignals.layoutWidth,
            },
            {
                column: y,
                xyz: 'y',
                scaleName: names.yScale,
                domain: backgroundImageExtents ?
                    {
                        signal: names.yExtent,
                    }
                    :
                    {
                        data: globalScope.data.name,
                        field: safeFieldName(y.name),
                    },
                reverse: true,
                signal: parentScope.sizeSignals.layoutHeight,
            },
            {
                column: z,
                xyz: 'z',
                scaleName: names.zScale,
                domain: {
                    data: globalScope.data.name,
                    field: z ? safeFieldName(z.name) : null,
                },
                reverse: false,
                signal: view === '3d'
                    ? `(${globalScope.zSize}) * ${SignalNames.ZProportion}`
                    : `10 * ${SignalNames.ZProportion}`,
            },
        ];
        columnSignals.forEach(cs => {
            const { column, domain, reverse, scaleName, signal, xyz } = cs;
            if (!column) return;
            let scale: Scale;
            if (column.quantitative) {
                scale = linearScale(
                    scaleName,
                    domain,
                    [0, { signal }],
                    reverse,
                    false,
                    showAxes,
                );
                if (shouldBeIntegralBinStep(column)) {
                    scale.bins = { step: 1 };
                }
            } else {
                scale = pointScale(
                    scaleName,
                    globalScope.data.name,
                    [0, { signal }],
                    column.name,
                    reverse,
                );
            }
            globalScales.scales[xyz] = [scale];
        });

        const mark: RectMark = {
            name: prefix,
            type: 'rect',
            from: { data: globalScope.markDataName },
            encode: { update },
        };
        addMarks(globalScope.markGroup, mark);

        return {
            offsets: {
                x: addOffsets(parentScope.offsets.x, `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(x.name)}])`),
                y: addOffsets(parentScope.offsets.y, `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(y.name)}]) - ${sizeValueSignal}`),
                h: sizeValueSignal,
                w: sizeValueSignal,
            },
            sizeSignals: {
                layoutHeight: null,
                layoutWidth: null,
            },
            globalScales,
            mark,
            encodingRuleMap: {
                y: [
                    {
                        test: testForCollapseSelection(),
                        signal: addOffsets(parentScope.offsets.y, parentScope.sizeSignals.layoutHeight),
                    },
                ],
            },
        };
    }
}
