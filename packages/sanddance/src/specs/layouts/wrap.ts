// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnable, Binnable } from '../bin';
import { createOrdinalsForFacet } from '../ordinal';
import { DiscreteColumn, InnerScope } from '../interfaces';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { Mark } from 'vega-typings';
import { push } from '../../array';

export interface WrapProps extends LayoutProps {
    groupby: DiscreteColumn;
}

export class Wrap extends Layout {
    private bin: Binnable;

    constructor(public props: WrapProps & LayoutBuildProps) {
        super(props);
        this.prefix = `wrap_${this.id}`;
        this.bin = binnable(this.prefix, props.global.dataName, props.groupby);
    }

    public getGrouping() {
        return [this.bin.field];
    }

    public build(): InnerScope {
        const {bin, prefix, props } = this;
        const { global, groupby, parent } = props;
        const facetDataName = `data_${prefix}_facet`;
        if (bin.native === false) {
            global.scope.signals.push(bin.maxbinsSignal);
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
                        signal: `(scale(${JSON.stringify(ord.scale.name)}, datum[${JSON.stringify(bin.field)}])-1)*301`
                    },
                    height: {
                        value: 300
                    },
                    width: {
                        value: 300
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
