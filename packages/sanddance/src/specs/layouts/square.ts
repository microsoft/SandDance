// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { BuildProps, Layout, LayoutProps } from './layout';
import { InnerScope } from '../interfaces';
import { Mark } from 'vega-typings';

export interface SquareProps extends LayoutProps {
    growDirection: 'right-down' | 'right-up' | 'down-right';
}

export class Square extends Layout {
    public props: SquareProps & BuildProps;

    public build(): InnerScope {
        const { props } = this;
        const { global, parent } = props;
        const name = `square_${this.id}`;
        const facetDataName = `facet_${name}`;
        const mark: Mark = {
            style: 'cell',
            name,
            type: 'group',
            from: {
                data: parent.dataName
            },
            encode: {
                update: {
                    x: {
                        value: 0
                    },
                    y: {
                        value: 0
                    },
                    height: {
                        value: 50
                    },
                    width: {
                        value: 50
                    }
                }
            },
            marks: []
        };
        parent.scope.marks.push(mark);

        return {
            dataName: facetDataName,
            scope: mark,
            sizeSignals: parent.sizeSignals
        };
    }
}
