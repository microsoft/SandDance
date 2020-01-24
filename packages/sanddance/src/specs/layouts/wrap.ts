// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnable } from '../bin';
import { createOrdinalsForFacet } from '../ordinal';
import { GroupLayoutProps, Layout, LayoutBuildProps } from './layout';
import { InnerScope } from '../interfaces';
import { Mark } from 'vega-typings';
import { push } from '../../array';

export interface WrapProps extends GroupLayoutProps {
}

export class Wrap extends Layout {
    public props: WrapProps & LayoutBuildProps;

    public build(): InnerScope {
        const { props } = this;
        const { global, groupby, maxbins, parent } = props;
        const prefix = `wrap_${this.id}`;
        const facetDataName = `data_${prefix}_facet`;
        const bin = binnable(prefix, global.dataName, groupby, maxbins);
        if (bin.transforms) {
            push(global.scope.data[0].transform, bin.transforms);
            global.scope.data.push(bin.dataSequence);
        }
        const ord = createOrdinalsForFacet(parent.dataName, prefix, bin.field);
        parent.scope.data = parent.scope.data || [];
        parent.scope.data.push(ord.data);

        parent.scope.scales = parent.scope.scales || [];
        parent.scope.scales.push(ord.scale);

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
                update: {
                    x: {
                        signal: `(scale(${JSON.stringify(ord.scale.name)}, datum[${JSON.stringify(bin.field)}])-1)*101`
                    },
                    height: {
                        value: 100
                    },
                    width: {
                        value: 100
                    }
                }
            },
            marks: [
                {
                    type: 'text',
                    encode: {
                        update: {
                            // text: {
                            //     signal: `length(data(${JSON.stringify(facetDataName)}))`
                            // },
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
            sizeSignals: parent.sizeSignals
        };
    }
}
