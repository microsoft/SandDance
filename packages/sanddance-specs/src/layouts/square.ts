// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { FieldNames } from '../constants';
import { InnerScope } from '../interfaces';
import {
    addData,
    addMarks,
    addSignal,
    addTransforms,
    getDataByName,
    getGroupBy,
    offsetPropValueSignal
    } from '../scope';
import { testForCollapseSelection } from '../selection';
import { addZScale } from '../zBase';
import { Column } from '@msrvida/chart-types';
import { FormulaTransform, RectMark } from 'vega-typings';

export interface SquareProps extends LayoutProps {
    sortBy: Column;
    z: Column;
    fillDirection: 'right-down' | 'right-up' | 'down-right';
    maxGroupedUnits?: string;
    maxGroupedFillSize?: string;
    zSize?: string;
    collapseYHeight?: boolean
}

export class Square extends Layout {
    private names: {
        aspect: string,
        bandWidth: string,
        squaresPerBand: string,
        gap: string,
        size: string,
        levels: string,
        levelSize: string,
        grouping: string,
        maxGroup: string,
        stack0: string,
        stack1: string,
        zScale: string
    }

    constructor(public props: SquareProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `square_${this.id}`;
        this.names = {
            aspect: `${p}_aspect`,
            bandWidth: this.getBandWidth(),
            squaresPerBand: `${p}_squares_per_band`,
            gap: `${p}_gap`,
            size: `${p}_size`,
            levels: `${p}_levels`,
            levelSize: `${p}_levelsize`,
            grouping: `data_${p}_grouping`,
            maxGroup: `${p}_max_grouping`,
            stack0: `${p}_stack0`,
            stack1: `${p}_stack1`,
            zScale: `scale_${p}_z`
        };
    }

    public build(): InnerScope {
        const { names, prefix, props } = this;
        const { fillDirection, globalScope, groupings, parentScope, collapseYHeight, sortBy, z } = props;
        let { zSize } = props;
        zSize = zSize || parentScope.sizeSignals.layoutHeight;
        addZScale(z, zSize, globalScope, names.zScale);

        addTransforms(getDataByName(globalScope.scope.data, globalScope.dataName).data, {
            type: 'stack',
            groupby: getGroupBy(groupings),
            as: [names.stack0, names.stack1],
            ...sortBy && {
                sort: {
                    field: sortBy.name,
                    order: 'ascending'
                }
            }
        });
        
        //TODO add testForCollapseSelection

        // const xy = this.encodeXY();
        // if (collapseYHeight) {
        //     xy.y = [
        //         {
        //             test: testForCollapseSelection(),
        //             value: 0
        //         },
        //         xy.y as NumericValueRef
        //     ];
        // }

        const heightSignal = {
            signal: fillDirection === 'down-right' ? names.size : names.levelSize
        };
        const mark: RectMark = {
            name: prefix,
            type: 'rect',
            from: {
                data: globalScope.dataName
            },
            encode: {
                update: {
                    height: collapseYHeight ?
                        [
                            {
                                test: testForCollapseSelection(),
                                value: 0
                            },
                            heightSignal
                        ]
                        :
                        heightSignal,
                    width: {
                        signal: fillDirection === 'down-right' ? names.levelSize : names.size
                    },
                    ...z && {
                        z: { value: 0 },
                        depth: [
                            {
                                test: testForCollapseSelection(),
                                value: 0
                            },
                            {
                                scale: names.zScale,
                                field: z.name
                            }
                        ]
                    }
                }
            }
        };
        addMarks(globalScope.markGroup, mark);

        this.addSignals();

        const { tx, ty } = this.transformXY();

        return {
            prefix,
            dataName: prefix,
            offsets: {
                x: {
                    formula: tx
                },
                y: {
                    formula: ty
                },
                h: null,
                w: null
            },
            mark,
            sizeSignals: {
                layoutHeight: names.size,
                layoutWidth: names.size
            }
        };
    }

    private getBandWidth() {
        const { sizeSignals } = this.props.parentScope;
        switch (this.props.fillDirection) {
            case 'down-right':
                return sizeSignals.layoutHeight;
            default:
                return sizeSignals.layoutWidth;
        }
    }

    private addSignals() {
        const { names, props } = this;
        const { fillDirection, globalScope, groupings, parentScope } = props;
        let { maxGroupedFillSize, maxGroupedUnits } = props;

        if (!maxGroupedUnits) {
            if (groupings) {
                addData(globalScope.scope,
                    {
                        name: names.grouping,
                        source: globalScope.dataName,
                        transform: [
                            {
                                type: 'aggregate',
                                groupby: getGroupBy(groupings),
                                ops: ['count'],
                                as: [FieldNames.Count]
                            },
                            {
                                type: 'extent',
                                field: FieldNames.Count,
                                signal: names.maxGroup
                            }
                        ]
                    }
                );
                maxGroupedUnits = `(${names.maxGroup}[1])`;
            } else {
                maxGroupedUnits = `length(data(${JSON.stringify(globalScope.dataName)}))`;
            }
        }
        if (!maxGroupedFillSize) {
            maxGroupedFillSize = fillDirection === 'down-right' ? parentScope.sizeSignals.layoutWidth : parentScope.sizeSignals.layoutHeight;
        }

        const aspect = `((${names.bandWidth}) / (${maxGroupedFillSize}))`;

        addSignal(globalScope.scope,
            {
                name: names.aspect,
                update: aspect || `${globalScope.sizeSignals.layoutWidth} / ${props.fillDirection === 'down-right' ? globalScope.sizeSignals.layoutWidth : globalScope.sizeSignals.layoutHeight}`
            },
            {
                name: names.squaresPerBand,
                update: `ceil(sqrt(${maxGroupedUnits} * ${names.aspect}))`
            },
            {
                name: names.gap,
                update: `min(0.1 * (${names.bandWidth} / (${names.squaresPerBand} - 1)), 1)`
            },
            {
                name: names.size,
                update: `${names.bandWidth} / ${names.squaresPerBand} - ${names.gap}`
            },
            {
                name: names.levels,
                update: `ceil(${maxGroupedUnits} / ${names.squaresPerBand})`
            },
            {
                name: names.levelSize,
                update: `((${maxGroupedFillSize}) / ${names.levels}) - ${names.gap}`
            }
        );
    }

    private transformXY() {
        const { names, prefix } = this;
        const compartment = `${names.bandWidth} / ${names.squaresPerBand} * ((datum[${JSON.stringify(names.stack0)}]) % ${names.squaresPerBand})`;
        const level = `floor((datum[${JSON.stringify(names.stack0)}]) / ${names.squaresPerBand})`;
        const { fillDirection, parentScope } = this.props;
        const tx: FormulaTransform = {
            type: 'formula',
            expr: null,
            as: `${prefix}_${FieldNames.OffsetX}`
        };
        const ty: FormulaTransform = {
            type: 'formula',
            expr: null,
            as: `${prefix}_${FieldNames.OffsetY}`
        };
        switch (fillDirection) {
            case 'down-right': {
                tx.expr = `${level} * (${names.levelSize} + ${names.gap})`;
                ty.expr = compartment;
                break;
            }
            case 'right-up': {
                tx.expr = compartment;
                ty.expr = `${offsetPropValueSignal(parentScope.offsets.h)} - ${names.levelSize} - ${level} * (${names.levelSize} + ${names.gap})`;
                break;
            }
            case 'right-down':
            default: {
                tx.expr = compartment;
                ty.expr = `${level} * (${names.levelSize} + ${names.gap})`;
                break;
            }
        }
        return { tx, ty };
    }
}
