// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { BuildProps, Layout, LayoutProps } from './layout';
import { InnerScope } from '../interfaces';
import { Mark, GroupEncodeEntry } from 'vega-typings';
import { push } from '../../array';

export interface SquareProps extends LayoutProps {
    fillDirection: 'right-down' | 'right-up' | 'down-right';
    maxSignal: string;
}

export class Square extends Layout {
    public props: SquareProps & BuildProps;
    private names: {
        dataName: string,
        aspect: string,
        bandWidth: string,
        squaresPerBand: string,
        index: string,
        gap: string,
        size: string
    }

    public build(): InnerScope {
        const { props } = this;
        const { fillDirection, global, parent } = props;
        let { maxSignal } = props;
        const name = `square_${this.id}`;
        this.names = {
            dataName: `facet_${name}`,
            aspect: `${name}_aspect`,
            bandWidth: this.getBandWidth(),
            squaresPerBand: `${name}_squares_per_band`,
            index: `${name}_index`,
            gap: `${name}_gap`,
            size: `${name}_size`
        };
        const { names } = this;
        const mark: Mark = {
            name,
            type: 'rect',
            from: {
                data: names.dataName
            },
            encode: {
                update: {
                    ...this.groupEncodeEntry(),
                    height: {
                        signal: names.size
                    },
                    width: {
                        signal: names.size
                    }
                }
            }
        };
        parent.scope.marks.push(mark);

        parent.scope.data = parent.scope.data || [];
        parent.scope.data.push({
            name: names.dataName,
            source: parent.dataName,
            transform: [
                {
                    type: 'window',
                    ops: ['row_number'],
                    as: [names.index]
                }
            ]
        });

        if (!maxSignal) {
            maxSignal = `length(data(${JSON.stringify(parent.dataName)}))`;
        }
        push(global.scope.signals, [
            {
                name: names.aspect,
                update: `${parent.sizeSignals.width}/${parent.sizeSignals.height}`
            },
            {
                name: names.squaresPerBand,
                update: `ceil(sqrt(${maxSignal}*${names.aspect}))`
            },
            {
                name: names.gap,
                update: `min(0.1*(${names.bandWidth}/(${names.squaresPerBand}-1)),1)`
            },
            {
                name: names.size,
                update: `${names.bandWidth}/${names.squaresPerBand}-${names.gap}`
            }
        ]);

        return {
            dataName: names.dataName,
            mark,
            sizeSignals: {
                height: names.size,
                width: names.size
            }
        };
    }

    private getBandWidth() {
        const { sizeSignals } = this.props.parent;
        switch (this.props.fillDirection) {
            case 'down-right':
                return sizeSignals.height;
            default:
                return sizeSignals.width;
        }
    }

    private groupEncodeEntry(): GroupEncodeEntry {
        const { names } = this;
        const compartment = `${names.bandWidth}/${names.squaresPerBand}*((datum[${JSON.stringify(names.index)}]-1)%${names.squaresPerBand})`;
        const level = `floor((datum[${JSON.stringify(names.index)}]-1)/${names.squaresPerBand})`;
        switch (this.props.fillDirection) {
            case 'right-up':
            default: {
                return {
                    x: {
                        signal: compartment
                    },
                    y: {
                        signal: `-${names.size}-${level}*(${names.size}+${names.gap})`
                    }
                };
            }
        }
    }
}
