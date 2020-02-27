// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { InnerScope } from '../interfaces';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { Mark } from 'vega-typings';
import { addMarks } from '../scope';

export interface TreemapProps extends LayoutProps {
    corner: 'top-left' | 'bottom-left';
}

export class Treemap extends Layout {
    public props: TreemapProps & LayoutBuildProps;

    public build(): InnerScope {
        const { props } = this;
        const { globalScope, parentScope } = props;
        const prefix = `square_${this.id}`;
        const facetDataName = `facet_${prefix}`;
        const mark: Mark = {
            style: 'cell',
            name: 'X',
            type: 'group',
            from: {
                data: parentScope.dataName
            },

            //TODO implement corner

            encode: {
            }
        };
        addMarks(parentScope.scope, mark);

        return {
            dataName: facetDataName,
            scope: mark,
            sizeSignals: parentScope.sizeSignals
        };
    }

}
