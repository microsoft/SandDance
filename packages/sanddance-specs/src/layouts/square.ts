// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { FieldNames } from '../constants';
import { safeFieldName } from '../expr';
import { InnerScope } from '../interfaces';
import {
    addMarks,
    addOffsets,
    addTransforms,
    getGroupBy
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
    collapseYHeight?: boolean
}

export class Square extends Layout {
    private names: {
        bandWidth: string,
        maxGroupField: string,
        maxGroupSignal: string,
        stack0: string,
        stack1: string,
        zScale: string
    }

    constructor(public props: SquareProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `square_${this.id}`;
        this.names = {
            bandWidth: this.getBandWidth(),
            maxGroupField: `${p}_max_group`,
            maxGroupSignal: `${p}_max_grouping`,
            stack0: `${p}_stack0`,
            stack1: `${p}_stack1`,
            zScale: `scale_${p}_z`
        };
    }

    public build(): InnerScope {
        const { names, prefix, props } = this;
        const { fillDirection, globalScope, groupings, parentScope, collapseYHeight, sortBy, z } = props;
        addZScale(z, globalScope.zSize, globalScope, names.zScale);

        addTransforms(globalScope.data, {
            type: 'stack',
            groupby: getGroupBy(groupings).map(safeFieldName),
            as: [names.stack0, names.stack1],
            ...sortBy && {
                sort: {
                    field: safeFieldName(sortBy.name),
                    order: 'ascending'
                }
            }
        });

        const { gap, levelSize, size, squaresPerBand } = this.addSignals();

        const heightSignal = {
            signal: fillDirection === 'down-right' ? size : levelSize
        };

        const mark: RectMark = {
            name: prefix,
            type: 'rect',
            from: {
                data: globalScope.markDataName
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
                        signal: fillDirection === 'down-right' ? levelSize : size
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
                                field: safeFieldName(z.name)
                            }
                        ]
                    }
                }
            }
        };
        addMarks(globalScope.markGroup, mark);

        const { tx, ty } = this.transformXY(gap, levelSize, squaresPerBand);

        return {
            offsets: {
                x: addOffsets(parentScope.offsets.x, tx.expr),
                y: addOffsets(parentScope.offsets.y, ty.expr),
                h: size,
                w: size
            },
            mark,
            sizeSignals: {
                layoutHeight: size,
                layoutWidth: size
            },
            ...collapseYHeight && {
                encodingRuleMap: {
                    y: [
                        {
                            test: testForCollapseSelection(),
                            value: parentScope.offsets.y
                        }
                    ]
                }
            }
        };
    }

    private getBandWidth() {
        const { offsets } = this.props.parentScope;
        switch (this.props.fillDirection) {
            case 'down-right':
                return offsets.h;
            default:
                return offsets.w;
        }
    }

    private addSignals() {
        const { names, props } = this;
        const { fillDirection, globalScope, groupings, parentScope } = props;
        let { maxGroupedFillSize, maxGroupedUnits } = props;

        if (!maxGroupedUnits) {
            if (groupings) {
                addTransforms(globalScope.data,
                    {
                        type: 'joinaggregate',
                        groupby: getGroupBy(groupings).map(safeFieldName),
                        ops: ['count'],
                        as: [names.maxGroupField]
                    },
                    {
                        type: 'extent',
                        field: names.maxGroupField,
                        signal: names.maxGroupSignal
                    }
                );
                maxGroupedUnits = `(${names.maxGroupSignal}[1])`;
            } else {
                maxGroupedUnits = `length(data(${JSON.stringify(globalScope.data.name)}))`;
            }
        }
        if (!maxGroupedFillSize) {
            maxGroupedFillSize = fillDirection === 'down-right' ? parentScope.offsets.w : parentScope.offsets.h;
        }

        const aspect = `((${names.bandWidth}) / (${maxGroupedFillSize}))`;
        const squaresPerBand = `ceil(sqrt(${maxGroupedUnits} * ${aspect}))`;
        const gap = `min(0.1 * ((${names.bandWidth}) / (${squaresPerBand} - 1)), 1)`;
        const size = `(((${names.bandWidth}) / ${squaresPerBand}) - ${gap})`;
        const levels = `ceil(${maxGroupedUnits} / ${squaresPerBand})`;
        const levelSize = `(((${maxGroupedFillSize}) / ${levels}) - ${gap})`;

        return { gap, levelSize, size, squaresPerBand };
    }

    private transformXY(gap: string, levelSize: string, squaresPerBand: string) {
        const { names, prefix } = this;
        const compartment = `(${names.bandWidth}) / ${squaresPerBand} * ((datum[${JSON.stringify(names.stack0)}]) % ${squaresPerBand})`;
        const level = `floor((datum[${JSON.stringify(names.stack0)}]) / ${squaresPerBand})`;
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
                tx.expr = `${level} * (${levelSize} + ${gap})`;
                ty.expr = compartment;
                break;
            }
            case 'right-up': {
                tx.expr = compartment;
                ty.expr = `${parentScope.offsets.h} - ${levelSize} - ${level} * (${levelSize} + ${gap})`;
                break;
            }
            case 'right-down':
            default: {
                tx.expr = compartment;
                ty.expr = `${level} * (${levelSize} + ${gap})`;
                break;
            }
        }
        return { tx, ty };
    }
}
