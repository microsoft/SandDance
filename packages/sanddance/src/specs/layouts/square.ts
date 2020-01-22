// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { BuildProps, Layout, LayoutProps } from './layout';
import { InnerScope } from '../interfaces';
import { Mark } from 'vega-typings';
import { push } from '../../array';

export interface SquareProps extends LayoutProps {
    fillDirection: 'right-down' | 'right-up' | 'down-right';
    maxSignal: string;
}

export class Square extends Layout {
    public props: SquareProps & BuildProps;

    public build(): InnerScope {
        const { props } = this;
        const { global, maxSignal, parent } = props;
        const name = `square_${this.id}`;
        const dataName = `facet_${name}`;
        const aspect = `${name}_aspect`;
        const squaresPerBand = `${name}_squares_per_band`;
        const mark: Mark = {
            style: 'cell',
            name,
            type: 'group',
            // from: {
            //     data: dataName
            // },
            encode: {
                update: {
                    x: {
                        signal: `datum.row_number * 1.1`
                    },
                    y: {
                        value: 0
                    },
                    height: {
                        value: 1
                    },
                    width: {
                        value: 1
                    }
                }
            },
            marks: [
                {
                    type: 'text',
                    encode: {
                        update: {
                            text: {
                                signal: `${parent.sizeSignals.width} + ' ' + ${parent.sizeSignals.height}`
                            }
                        }
                    }
                }
            ]
        };
        parent.scope.marks.push(mark);

        parent.scope.data = parent.scope.data || [];
        parent.scope.data.push({
            name: dataName,
            source: parent.dataName,
            transform: [
                {
                    type: 'window',
                    ops: ['row_number'],
                    as: ['row_number']
                }
            ]
        });

        // global.scope.data.push({
        //     name: "seq",
        //     transform: [
        //         {
        //             type: "sequence",
        //             start: { signal: `${binSignalName}.start` },
        //             stop: { signal: `${binSignalName}.stop` },
        //             step: { signal: `${binSignalName}.step` }
        //         }
        //     ]
        // });
        //global.scope.scales.push()

        push(global.scope.signals, [
            {
                name: aspect,
                update: `${parent.sizeSignals.width}/${parent.sizeSignals.height}`
            },
            {
                name: squaresPerBand,
                update: `ceil(sqrt(${maxSignal}*${aspect}))`
            }
        ]);

        return {
            dataName,
            scope: mark,
            sizeSignals: parent.sizeSignals
        };
    }
}
