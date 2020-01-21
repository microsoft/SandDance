// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { BuildProps, Layout, LayoutProps } from './layout';
import { InnerScope } from '../interfaces';
import { Mark } from 'vega-typings';

export interface TreemapProps extends LayoutProps {
    corner: 'top-left' | 'bottom-left';
}

export class Treemap extends Layout {
    public props: TreemapProps & BuildProps;

    public build(): InnerScope {
        const { props } = this;
        const { global, groupby, parent } = props;
        const name = `square_${this.id}`;
        const facetDataName = `facet_${name}`;
        const mark: Mark = {
            style: 'cell',
            name: 'X',
            type: 'group',
            from: {
                data: parent.dataName
            },

            //TODO implement corner

            encode: {
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
