// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { BuildProps, LayoutProps, Layout } from "./layout";
import { Orientation, InnerScope } from "../interfaces";
import { Mark, Transforms } from "vega-typings";
import { binnable } from "../bin";
import { Column } from "../types";

export interface SliceProps extends LayoutProps {
    groupby: Column;
    orientation: Orientation;
    maxbins: number;
}

export class Slice extends Layout {
    public props: SliceProps & BuildProps;

    public build(): InnerScope {
        const { props } = this;
        const { global, groupby, maxbins, parent } = props;
        const name = `slice_${this.id}`;
        const facetDataName = `data_${name}_facet`;
        const bin = binnable(global.dataName, groupby, maxbins);
        let globalTransforms: { [columnName: string]: Transforms[] };
        if (bin.transforms) {
            globalTransforms = {};
            globalTransforms[groupby.name] = bin.transforms;
            global.scope.data.push(bin.dataSequence);
        }
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
