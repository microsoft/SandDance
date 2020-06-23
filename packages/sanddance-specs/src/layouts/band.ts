// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { binnable, Binnable } from '../bin';
import { safeFieldName } from '../expr';
import {
    DiscreteColumn,
    EncodingRule,
    InnerScope,
    LayoutOffsets,
    Orientation
} from '../interfaces';
import {
    addData,
    addOffsets,
    addSignals,
    addTransforms
} from '../scope';
import { testForCollapseSelection } from '../selection';
import { modifySignal } from '../signals';
import { BandScale } from 'vega-typings';

export interface BandProps extends LayoutProps {
    excludeEncodingRuleMap?: boolean;
    groupby: DiscreteColumn;
    minBandWidth: number;
    orientation: Orientation;
    showAxes: boolean;
    style?: string;
}

export class Band extends Layout {
    private bin: Binnable;
    private names: {
        xScale: string,
        yScale: string,
        bandWidth: string,
        accumulative: string
    };

    constructor(public props: BandProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `band_${this.id}`;
        this.names = {
            xScale: `scale_${p}_x`,
            yScale: `scale_${p}_y`,
            bandWidth: `${p}_bandwidth`,
            accumulative: `${p}_accumulative`
        };
        this.bin = binnable(this.prefix, props.globalScope.data.name, props.groupby);
    }

    public getGrouping() {
        return this.bin.fields;
    }

    public build(): InnerScope {
        const { bin, names, props } = this;
        const { globalScope, minBandWidth, orientation, parentScope, showAxes } = props;
        const binField = bin.fields[0];
        if (bin.native === false) {
            addSignals(globalScope.scope, bin.maxbinsSignal);
            addTransforms(globalScope.data, ...bin.transforms);
            addData(globalScope.scope, bin.dataSequence);
        }

        //TODO don't add this, use existing dataset
        addData(globalScope.scope, {
            name: names.accumulative,
            source: bin.fullScaleDataname,
            transform: [
                {
                    type: 'aggregate',
                    groupby: this.getGrouping().map(safeFieldName),
                    ops: ['count']
                }
            ]
        });
        const horizontal = orientation === 'horizontal';
        const minCellSignal = (horizontal) ? globalScope.signals.minCellHeight : globalScope.signals.minCellWidth;
        modifySignal(minCellSignal, 'max', `length(data(${JSON.stringify(names.accumulative)})) * ${minBandWidth}`);
        addSignals(globalScope.scope,
            {
                name: names.bandWidth,
                update: `bandwidth(${JSON.stringify(horizontal ? names.yScale : names.xScale)})`
            }
        );

        const scale = this.getScale(bin, horizontal);

        let encodingRuleMap: { [key: string]: EncodingRule[] };
        if (!props.excludeEncodingRuleMap) {
            encodingRuleMap = horizontal ?
                {
                    x: [
                        {
                            test: testForCollapseSelection(),
                            value: parentScope.offsets.x
                        }
                    ],
                    width: [
                        {
                            test: testForCollapseSelection(),
                            value: 0
                        }
                    ]
                }
                :
                {
                    y: [
                        {
                            test: testForCollapseSelection(),
                            signal: addOffsets(parentScope.offsets.y, parentScope.offsets.h)
                        }
                    ],
                    height: [
                        {
                            test: testForCollapseSelection(),
                            value: 0
                        }
                    ]
                };
        }

        return {
            offsets: this.getOffset(horizontal, binField),
            sizeSignals: horizontal ?
                {
                    layoutHeight: names.bandWidth,
                    layoutWidth: parentScope.sizeSignals.layoutWidth
                }
                :
                {
                    layoutHeight: parentScope.sizeSignals.layoutHeight,
                    layoutWidth: names.bandWidth
                },
            globalScales: {
                showAxes,
                scales: {
                    x: horizontal ? undefined : scale,
                    y: horizontal ? scale : undefined
                }
            },
            encodingRuleMap
        };
    }

    private getOffset(horizontal: boolean, binField: string): LayoutOffsets {
        const { names, props } = this;
        const { parentScope } = props;
        return {
            x: addOffsets(parentScope.offsets.x,
                horizontal ?
                    ''
                    :
                    `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(binField)}])`
            ),
            y: addOffsets(parentScope.offsets.y,
                horizontal ?
                    `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(binField)}])`
                    :
                    ''
            ),
            h: horizontal ?
                names.bandWidth
                :
                parentScope.offsets.h,
            w: horizontal ?
                parentScope.offsets.w
                :
                names.bandWidth
        };
    }

    private getScale(bin: Binnable, horizontal: boolean) {
        const { names } = this;
        const { parentScope } = this.props;
        const binField = safeFieldName(bin.fields[0]);

        let scale: BandScale;
        if (horizontal) {
            scale = {
                type: 'band',
                name: names.yScale,
                range: [
                    0,
                    {
                        signal: parentScope.sizeSignals.layoutHeight
                    }
                ],
                padding: 0.1,
                domain: {
                    data: bin.domainDataName,
                    field: binField,
                    sort: true
                },
                reverse: true
            };
        } else {
            scale = {
                type: 'band',
                name: names.xScale,
                range: [
                    0,
                    {
                        signal: parentScope.sizeSignals.layoutWidth
                    }
                ],
                padding: 0.1,
                domain: {
                    data: bin.domainDataName,
                    field: binField,
                    sort: true
                }
            };
        }
        return scale;
    }
}
