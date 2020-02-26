// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnable, Binnable } from '../bin';
import { Column } from '../types';
import { createOrdinalsForFacet } from '../ordinal';
import { DiscreteColumn, InnerScope } from '../interfaces';
import {
    GroupEncodeEntry,
    GroupMark,
    RectMark,
    Scope,
    Transforms
} from 'vega-typings';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { push } from '../../array';

export interface SquareProps extends LayoutProps {
    sortBy: Column;
    fillDirection: 'right-down' | 'right-up' | 'down-right';
    maxGroupedUnits?: string;
    maxGroupedFillSize?: string;
    groupby?: DiscreteColumn;
}

export class Square extends Layout {
    private bin: Binnable;

    private names: {
        dataName: string,
        aspect: string,
        bandWidth: string,
        squaresPerBand: string,
        index: string,
        gap: string,
        size: string,
        levels: string,
        levelSize: string,
        facetData: string
    }

    constructor(public props: SquareProps & LayoutBuildProps) {
        super(props);
        this.prefix = `square_${this.id}`;
        if (props.groupby) {
            this.bin = binnable(this.prefix, props.globalScope.dataName, props.groupby);
        }
    }

    public getGrouping() {
        return this.bin ? this.bin.fields : null;
    }

    public build(): InnerScope {
        const { props } = this;
        const { fillDirection, globalScope, groupby, parentScope } = props;
        const prefix = `square_${this.id}`;
        this.names = {
            dataName: `data_${prefix}`,
            aspect: `${prefix}_aspect`,
            bandWidth: this.getBandWidth(),
            squaresPerBand: `${prefix}_squares_per_band`,
            index: `${prefix}_index`,
            gap: `${prefix}_gap`,
            size: `${prefix}_size`,
            levels: `${prefix}_levels`,
            levelSize: `${prefix}_levelsize`,
            facetData: `facet_${prefix}`
        };
        const { names } = this;
        const mark: RectMark | GroupMark = {
            name: prefix,
            type: groupby ? 'group' : 'rect',
            from: {
                data: names.dataName
            },
            encode: {
                update: {
                    ...this.encodeXY(),
                    height: {
                        signal: fillDirection === 'down-right' ? names.size : names.levelSize
                    },
                    width: {
                        signal: fillDirection === 'down-right' ? names.levelSize : names.size
                    }
                }
            }
        };
        parentScope.scope.marks.push(mark);

        let dataName: string
        let scope: Scope;
        if (this.bin) {
            dataName = names.facetData;
            const groupMark = mark as GroupMark;
            const { bin } = this;
            if (bin.native === false) {
                globalScope.scope.signals.push(bin.maxbinsSignal);
                push(globalScope.scope.data[0].transform, bin.transforms);
                globalScope.scope.data.push(bin.dataSequence);
            }
            const ord = createOrdinalsForFacet(parentScope.dataName, prefix, bin.fields);
            groupMark.data = [ord.data];
            groupMark.scales = [ord.scale];
            const childMark: GroupMark = {
                type: 'group',
                from: {
                    facet: {
                        name: names.facetData,
                        data: names.dataName,
                        groupby: bin.fields
                    }
                }
            };
            groupMark.marks = [childMark];
            scope = childMark;
        }

        this.addData();
        this.addSignals();

        return {
            dataName,
            scope,
            mark: !groupby && mark as RectMark,
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

    private addData() {
        const { parentScope, sortBy } = this.props;
        const { names } = this;
        const transform: Transforms[] = [
            {
                type: 'window',
                ops: ['row_number'],
                as: [names.index]
            }
        ];
        if (sortBy) {
            transform.unshift({
                type: 'collect',
                sort: { field: sortBy.name }
            });
        }
        parentScope.scope.data = parentScope.scope.data || [];
        parentScope.scope.data.push({
            name: names.dataName,
            source: parentScope.dataName,
            transform
        });
    }

    private addSignals() {
        const { names, props } = this;
        const { fillDirection, globalScope, parentScope } = props;
        let { maxGroupedFillSize, maxGroupedUnits } = props;

        if (!maxGroupedUnits) {
            maxGroupedUnits = `length(data(${JSON.stringify(parentScope.dataName)}))`;
        }
        if (!maxGroupedFillSize) {
            maxGroupedFillSize = fillDirection === 'down-right' ? parentScope.sizeSignals.layoutWidth : parentScope.sizeSignals.layoutHeight;
        }

        const aspect = `((${names.bandWidth})/(${maxGroupedFillSize}))`;

        parentScope.scope.signals = parentScope.scope.signals || [];
        push(parentScope.scope.signals, [
            {
                name: names.aspect,
                update: aspect || `${globalScope.sizeSignals.layoutWidth}/${props.fillDirection === 'down-right' ? globalScope.sizeSignals.layoutWidth : globalScope.sizeSignals.layoutHeight}`
            },
            {
                name: names.squaresPerBand,
                update: `ceil(sqrt(${maxGroupedUnits}*${names.aspect}))`
            },
            {
                name: names.gap,
                update: `min(0.1*(${names.bandWidth}/(${names.squaresPerBand}-1)),1)`
            },
            {
                name: names.size,
                update: `${names.bandWidth}/${names.squaresPerBand}-${names.gap}`
            },
            {
                name: names.levels,
                update: `ceil(${maxGroupedUnits}/${names.squaresPerBand})`
            },
            {
                name: names.levelSize,
                update: `((${maxGroupedFillSize})/${names.levels})-${names.gap}`
            }
        ]);
    }

    private encodeXY(): GroupEncodeEntry {
        const { names } = this;
        const compartment = `${names.bandWidth}/${names.squaresPerBand}*((datum[${JSON.stringify(names.index)}]-1)%${names.squaresPerBand})`;
        const level = `floor((datum[${JSON.stringify(names.index)}]-1)/${names.squaresPerBand})`;
        const { fillDirection, parentScope } = this.props;
        switch (fillDirection) {
            case 'down-right': {
                return {
                    x: {
                        signal: `${level}*(${names.levelSize}+${names.gap})`
                    },
                    y: {
                        signal: compartment
                    }
                };
            }
            case 'right-up': {
                return {
                    x: {
                        signal: compartment
                    },
                    y: {
                        signal: `(${parentScope.sizeSignals.layoutHeight})-${names.levelSize}-${level}*(${names.levelSize}+${names.gap})`
                    }
                };
            }
            case 'right-down':
            default: {
                return {
                    x: {
                        signal: compartment
                    },
                    y: {
                        signal: `${level}*(${names.levelSize}+${names.gap})`
                    }
                };
            }
        }
    }
}
