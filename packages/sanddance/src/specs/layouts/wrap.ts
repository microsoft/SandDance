// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnable } from '../bin';
import { BuildProps, GroupLayoutProps, GroupLayout } from './layout';
import { createOrdinalsForFacet } from '../ordinal';
import { InnerScope } from '../interfaces';
import { Mark, Transforms } from 'vega-typings';

export interface WrapProps extends GroupLayoutProps {
    maxbins: number
}

export class Wrap extends GroupLayout {
    public props: WrapProps & BuildProps;

    public build(): InnerScope {
        const { props } = this;
        const { global, groupby, maxbins, parent } = props;
        const name = `wrap_${this.id}`;
        const facetDataName = `data_${name}_facet`;
        const bin = binnable(global.dataName, groupby, maxbins);
        let globalTransforms: { [columnName: string]: Transforms[] };
        if (bin.transforms) {
            globalTransforms = {};
            globalTransforms[groupby.name] = bin.transforms;
        }
        const ord = createOrdinalsForFacet(global.scope, global.dataName, name, bin.field);
        const mark: Mark = {
            style: 'cell',
            name,
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
                        signal: `(scale(${JSON.stringify(ord.scaleName)}, datum[${JSON.stringify(bin.field)}])-1)*101`
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
            sizeSignals: parent.sizeSignals,
            globalTransforms
        };
    }
}
