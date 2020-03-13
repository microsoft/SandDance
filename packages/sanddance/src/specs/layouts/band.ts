// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    addData,
    addMarks,
    addSignal,
    addTransforms,
    getDataByName
} from '../scope';
import { BandScale, GroupMark } from 'vega-typings';
import { binnable, Binnable } from '../bin';
import { DiscreteColumn, InnerScope, Orientation } from '../interfaces';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { modifySignal } from '../signals';
import { testForCollapseSelection } from '../selection';

export interface BandProps extends LayoutProps {
    groupby: DiscreteColumn;
    minBandWidth: number;
    orientation: Orientation;
    showAxes: boolean;
}

export class Band extends Layout {
    private bin: Binnable;
    private names: {
        facetData: string,
        xScale: string,
        yScale: string,
        bandWidth: string,
        accumulative: string
    };

    constructor(public props: BandProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `band_${this.id}`;
        this.names = {
            facetData: `facet_${p}`,
            xScale: `scale_${p}_x`,
            yScale: `scale_${p}_y`,
            bandWidth: `${p}_bandwidth`,
            accumulative: `${p}_accumulative`
        };
        this.bin = binnable(this.prefix, props.globalScope.dataName, props.groupby);
    }

    public getGrouping() {
        return this.bin.fields;
    }

    public build(): InnerScope {
        const { bin, names, props } = this;
        const { globalScope, minBandWidth, orientation, parentScope, showAxes } = props;
        const binField = bin.fields[0];
        if (bin.native === false) {
            addSignal(globalScope.scope, bin.maxbinsSignal);
            addTransforms(getDataByName(globalScope.scope.data, globalScope.dataName), ...bin.transforms);
            addData(globalScope.scope, bin.dataSequence);
        }
        addData(globalScope.scope, {
            name: names.accumulative,
            source: bin.fullScaleDataname,
            transform: [
                {
                    type: 'aggregate',
                    groupby: this.getGrouping(),
                    ops: ['count']
                }
            ]
        });
        const horizontal = orientation === 'horizontal';
        const minCellSignal = (horizontal) ? globalScope.signals.minCellHeight : globalScope.signals.minCellWidth;
        modifySignal(minCellSignal, 'max', `length(data(${JSON.stringify(names.accumulative)})) * ${minBandWidth}`);
        addSignal(globalScope.scope,
            {
                name: names.bandWidth,
                update: `bandwidth(${JSON.stringify(horizontal ? names.yScale : names.xScale)})`
            }
        );
        const mark = this.getMark(parentScope, horizontal, binField);
        addMarks(parentScope.scope, mark);

        const scale = this.getScale(bin, horizontal);

        return {
            dataName: names.facetData,
            scope: mark,
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
            encodingRuleMap: horizontal ?
                {
                    x: [
                        {
                            test: testForCollapseSelection(),
                            value: 0
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
                            signal: parentScope.sizeSignals.layoutHeight
                        }
                    ],
                    height: [
                        {
                            test: testForCollapseSelection(),
                            value: 0
                        }
                    ]
                }
        };
    }

    private getMark(parentScope: InnerScope, horizontal: boolean, binField: string): GroupMark {
        const { bin, names, prefix } = this;
        return {
            name: prefix,
            type: 'group',
            from: {
                facet: {
                    name: names.facetData,
                    data: parentScope.dataName,
                    groupby: bin.fields
                }
            },
            encode: {
                update: horizontal ?
                    {
                        x: {
                            value: 0
                        },
                        y: {
                            scale: names.yScale,
                            field: binField
                        },
                        height: {
                            signal: names.bandWidth
                        },
                        width: {
                            signal: parentScope.sizeSignals.layoutWidth
                        }
                    }
                    :
                    {
                        x: {
                            scale: names.xScale,
                            field: binField
                        },
                        y: {
                            value: 0
                        },
                        height: {
                            signal: parentScope.sizeSignals.layoutHeight
                        },
                        width: {
                            signal: names.bandWidth
                        }
                    }
            }
        };
    }

    private getScale(bin: Binnable, horizontal: boolean) {
        const { names } = this;
        const { parentScope } = this.props;
        const binField = bin.fields[0];

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
