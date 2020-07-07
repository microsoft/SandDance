// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { safeFieldName } from '../expr';
import { InnerScope, LayoutOffsets } from '../interfaces';
import {
    addData,
    addMarks,
    addOffsets,
    addSignals,
    addTransforms,
    getGroupBy
} from '../scope';
import { testForCollapseSelection } from '../selection';
import { Column } from '@msrvida/chart-types';
import { RectMark } from 'vega-typings';

export interface StackProps extends LayoutProps {
    sort: Column;
}

export class Stack extends Layout {
    private names: {
        cube: string,
        globalDataName: string,
        globalExtent: string,
        levelDataName: string,
        count: string,
        stack0: string,
        stack1: string,
        sequence: string,
        sides: string,
        size: string,
        squared: string,
        squaredExtent: string
    };

    constructor(public props: StackProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `stack_${this.id}`;
        this.names = {
            cube: `${p}_cube`,
            globalDataName: `data_${p}_count`,
            globalExtent: `${p}_global_extent`,
            levelDataName: `data_${p}_level`,
            count: `${p}_count`,
            stack0: `${p}_stack0`,
            stack1: `${p}_stack1`,
            sequence: `data_${p}_sequence`,
            sides: `${p}_sides`,
            size: `${p}_size`,
            squared: `${p}_squared`,
            squaredExtent: `${p}_squared_extent`
        };
    }

    public build(): InnerScope {
        const { names, props } = this;
        const { globalScope, groupings, parentScope, sort } = props;
        const { sizeSignals } = parentScope;

        addTransforms(globalScope.data,
            {
                type: 'joinaggregate',
                groupby: getGroupBy(groupings).map(safeFieldName),
                ops: ['count'],
                as: [names.count]
            },
            {
                type: 'extent',
                field: names.count,
                signal: names.globalExtent
            },
            {
                type: 'stack',
                groupby: getGroupBy(groupings).map(safeFieldName),
                as: [names.stack0, names.stack1],
                ...sort && {
                    sort: {
                        field: safeFieldName(sort.name),
                        order: 'ascending'
                    }
                }
            }
        );

        addData(globalScope.scope,
            {
                name: names.sequence,
                transform: [
                    {
                        type: 'sequence',
                        start: 1,
                        stop: {
                            signal: `sqrt(${names.globalExtent}[1])`
                        }
                    },
                    {
                        type: 'formula',
                        expr: 'datum.data * datum.data',
                        as: 'squared'
                    },
                    {
                        type: 'formula',
                        expr: `ceil(${names.globalExtent}[1] / datum.squared)`,
                        as: 'maxlevels'
                    },
                    {
                        type: 'formula',
                        expr: `(${names.size} - (datum.data - 1) * datum.data) / datum.data`,
                        as: 'side'
                    },
                    {
                        type: 'formula',
                        expr: 'datum.side * datum.maxlevels + datum.maxlevels - 1',
                        as: 'sidecubeheight'
                    },
                    {
                        type: 'formula',
                        expr: `abs(${globalScope.zSize} - datum.sidecubeheight)`,
                        as: 'heightmatch'
                    },
                    {
                        type: 'collect',
                        sort: {
                            field: 'heightmatch',
                            order: 'ascending'
                        }
                    },
                    {
                        type: 'window',
                        ops: ['row_number']
                    },
                    {
                        type: 'filter',
                        expr: 'datum.row_number === 1'
                    },
                    {
                        type: 'extent',
                        field: 'squared',
                        signal: names.squaredExtent
                    }
                ]
            }
        );

        addSignals(globalScope.scope,
            {
                name: names.size,
                update: `min((${sizeSignals.layoutHeight}), (${sizeSignals.layoutWidth}))`
            },
            {
                name: names.squared,
                update: `${names.squaredExtent}[0]`
            },
            {
                name: names.sides,
                update: `sqrt(${names.squared})`
            },
            {
                name: names.cube,
                update: `(${names.size} - (${names.sides} - 1)) / ${names.sides}`
            }
        );

        const zLevel = `floor(datum[${JSON.stringify(names.stack0)}] / ${names.squared})`;
        const layerOrdinal = `(datum[${JSON.stringify(names.stack0)}] % ${names.squared})`;
        const cubeX = `(${layerOrdinal} % ${names.sides})`;
        const cubeY = `floor(${layerOrdinal} / ${names.sides})`;
        const groupX = `(${sizeSignals.layoutWidth} - ${names.size}) / 2`;
        const groupY = `(${sizeSignals.layoutHeight} - ${names.size}) / 2`;

        const offsets: LayoutOffsets = {
            x: addOffsets(parentScope.offsets.x, groupX, `${cubeX} * (${names.cube} + 1)`),
            y: addOffsets(parentScope.offsets.y, groupY, `${cubeY} * (${names.cube} + 1)`),
            h: names.size,
            w: names.size
        };

        const mark: RectMark = {
            type: 'rect',
            from: { data: this.names.levelDataName },
            encode: {
                update: {
                    z: {
                        signal: `${zLevel} * (${names.cube} + 1)`
                    },
                    height: {
                        signal: names.cube
                    },
                    width: {
                        signal: names.cube
                    },
                    depth: {
                        signal: names.cube
                    }
                }
            }
        };
        addMarks(globalScope.markGroup, mark);

        return {
            offsets,
            mark,
            sizeSignals: {
                layoutHeight: names.size,
                layoutWidth: names.size
            },
            globalScales: {
                showAxes: false,
                scales: {}
            },
            encodingRuleMap: {
                y: [{
                    test: testForCollapseSelection(),
                    signal: parentScope.offsets.y
                }],
                z: [{
                    test: testForCollapseSelection(),
                    value: 0
                }],
                depth: [{
                    test: testForCollapseSelection(),
                    value: 0
                }],
                height: [{
                    test: testForCollapseSelection(),
                    value: 0
                }]
            }
        };
    }
}
