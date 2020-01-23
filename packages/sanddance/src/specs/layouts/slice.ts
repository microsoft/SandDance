// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnable } from '../bin';
import { GroupLayoutProps, Layout, LayoutBuildProps } from './layout';
import { InnerScope, Orientation } from '../interfaces';
import { Mark, Transforms } from 'vega-typings';

export interface SliceProps extends GroupLayoutProps {
    orientation: Orientation;
    maxbins: number;
}

export class Slice extends Layout {
    public props: SliceProps & LayoutBuildProps;

    public build(): InnerScope {
        const { props } = this;
        const { global, groupby, maxbins, parent } = props;
        const prefix = `slice_${this.id}`;
        const facetDataName = `data_${prefix}_facet`;
        const bin = binnable(global.dataName, groupby, maxbins);
        let globalTransforms: { [columnName: string]: Transforms[] };
        if (bin.transforms) {
            globalTransforms = {};
            globalTransforms[groupby.name] = bin.transforms;
            global.scope.data.push(bin.dataSequence);
        }
        const mark: Mark = {
            style: 'cell',
            name: prefix,
            type: 'group',
            from: {
                facet: {
                    name: facetDataName,
                    data: parent.dataName,
                    groupby: bin.field
                }
            },
            encode: {
            },
            marks: [
                {
                    type: 'text',
                    encode: {
                        update: {
                            text: {
                                signal: `length(data(${JSON.stringify(facetDataName)}))`
                            },
                            fontSize: {
                                value: 20
                            }
                        }
                    }
                }
            ]
        };
        parent.scope.marks.push(mark);

        return {
            dataName: facetDataName,
            scope: mark,
            sizeSignals: { height: 'TODO', width: 'TODO' },
            globalTransforms
        };

    }
}
