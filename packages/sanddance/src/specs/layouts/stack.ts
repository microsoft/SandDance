// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addData, addMarks, addSignal } from '../scope';
import { Column } from '../types';
import { FieldNames } from '../constants';
import { GroupMark, Transforms, Scope, RectMark } from 'vega-typings';
import { InnerScope } from '../interfaces';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { testForCollapseSelection } from '../selection';

export interface StackProps extends LayoutProps {
    sort: Column;
    parentHeight: string;
}

export class Stack extends Layout {
    private names: {
        cube: string,
        cubeX: string,
        cubeY: string,
        globalDataName: string,
        globalExtent: string,
        levelDataName: string,
        ordinal: string,
        sequence: string,
        sides: string,
        size: string,
        squared: string,
        squaredExtent: string,
        zLevel: string
    };

    constructor(public props: StackProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `stack_${this.id}`;
        this.names = {
            cube: `${p}_cube`,
            cubeX: `${p}_x`,
            cubeY: `${p}_y`,
            globalDataName: `data_${p}_count`,
            globalExtent: `${p}_global_extent`,
            levelDataName: `data_${p}_level`,
            ordinal: `${p}_ordinal`,
            sequence: `data_${p}_sequence`,
            sides: `${p}_sides`,
            size: `${p}_size`,
            squared: `${p}_squared`,
            squaredExtent: `${p}_squared_extent`,
            zLevel: `${p}_zLevel`
        };
    }

    public build(): InnerScope {
        const { names, props } = this;
        const { globalScope, groupings, parentHeight, parentScope, sort } = props;
        const { sizeSignals } = parentScope;

        addData(globalScope.scope,
            {
                name: names.globalDataName,
                source: globalScope.dataName,
                transform: [
                    {
                        type: 'aggregate',
                        groupby: groupings.reduce((acc, val) => acc.concat(val), []),
                        ops: ['count'],
                        as: [FieldNames.Count]
                    },
                    {
                        type: 'extent',
                        field: FieldNames.Count,
                        signal: names.globalExtent
                    }
                ]
            },
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
                        expr: `datum.side * datum.maxlevels + datum.maxlevels - 1`,
                        as: 'sidecubeheight'
                    },
                    {
                        type: 'formula',
                        expr: `abs(${parentHeight} - datum.sidecubeheight)`,
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

        addSignal(globalScope.scope,
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

        const transform: Transforms[] = [
            {
                type: 'window',
                ops: ['row_number'],
                as: [FieldNames.Ordinal]
            },
            {
                type: 'formula',
                expr: `floor((datum[${JSON.stringify(FieldNames.Ordinal)}] - 1) / ${names.squared})`,
                as: names.zLevel
            },
            {
                type: 'formula',
                expr: `(datum[${JSON.stringify(FieldNames.Ordinal)}] - 1) % ${names.squared}`,
                as: names.ordinal
            },
            {
                type: 'formula',
                expr: `datum[${JSON.stringify(names.ordinal)}] % ${names.sides}`,
                as: names.cubeX
            },
            {
                type: 'formula',
                expr: `floor(datum[${JSON.stringify(names.ordinal)}] / ${names.sides})`,
                as: names.cubeY
            }
        ];

        if (sort) {
            transform.unshift({
                type: 'collect',
                sort: {
                    field: sort.name
                }
            });
        }

        addData(parentScope.scope, {
            name: names.levelDataName,
            source: parentScope.dataName,
            transform
        });

        const group: GroupMark = {
            type: 'group',
            encode: {
                update: {
                    x: {
                        signal: `(${sizeSignals.layoutWidth} - ${names.size}) / 2`
                    },
                    y: {
                        signal: `(${sizeSignals.layoutHeight} - ${names.size}) / 2`
                    },
                    height: {
                        signal: names.size
                    },
                    width: {
                        signal: names.size
                    }
                }
            }
        };

        addMarks(parentScope.scope, group);

        const mark = this.addRectMarks(group);

        return {
            dataName: names.levelDataName,
            scope: group,
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
                    signal: names.size 
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

    private addRectMarks(scope: Scope) {
        const { names } = this;
        const mark: RectMark = {
            type: 'rect',
            from: { data: this.names.levelDataName },
            encode: {
                update: {
                    x: {
                        signal: `datum[${JSON.stringify(names.cubeX)}] * (${names.cube} + 1)`
                    },
                    y: {
                        signal: `datum[${JSON.stringify(names.cubeY)}] * (${names.cube} + 1)`
                    },
                    z: {
                        signal: `datum[${JSON.stringify(names.zLevel)}] * (${names.cube} + 1)`
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
        addMarks(scope, mark);
        return mark;
    }
}
