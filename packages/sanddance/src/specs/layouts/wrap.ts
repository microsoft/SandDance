// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Mark, Transforms } from 'vega-typings';
import { binnable } from '../bin';
import { BuildProps, Layout, LayoutProps } from './layout';
import { InnerScope } from '../interfaces';

export interface WrapProps extends LayoutProps {
    maxbins: number
}

export class Wrap extends Layout {
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
        const ord = this.ordinalReqs(name, bin.field);
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

    private ordinalReqs(prefix: string, binField: string) {
        const { global } = this.props;
        const scaleName = `${prefix}_order`;
        const lookupField = 'ordinal';
        const dataName = `${prefix}_bin_order`;
        global.scope.data.push(
            {
                name: dataName,
                source: global.dataName,
                transform: [
                    {
                        type: 'aggregate',
                        groupby: [binField]
                    },
                    {
                        type: 'collect',
                        sort: {
                            field: binField,
                            order: 'ascending'
                        }
                    },
                    {
                        type: 'window',
                        ops: ['row_number'],
                        as: [lookupField]
                    }
                ]
            }
        );
        global.scope.scales.push(
            {
                type: 'ordinal',
                name: scaleName,
                domain: {
                    data: dataName,
                    field: binField
                },
                range: {
                    data: dataName,
                    field: lookupField
                }
            }
        );
        return {
            dataName,
            scaleName,
            lookupField
        };
    }
}
