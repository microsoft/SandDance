// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FieldNames } from '../../constants';
import { fill, opacity } from '../../fill';
import { Mark } from 'vega-typings';
import { SpecContext } from '../../types';

export default function (context: SpecContext) {
    const { specColumns } = context;
    const marks: Mark[] = [
        {
            name: 'marks2',
            type: 'rect',
            from: {
                data: 'stackedgroup'
            },
            encode: {
                update: {
                    x: {
                        scale: 'xband',
                        field: specColumns.x.quantitative ? FieldNames.StacksLongBin0 : specColumns.x.name,
                        offset: {
                            scale: 'xinternalscale',
                            field: 'column'
                        }
                    },
                    y: {
                        scale: 'yband',
                        field: specColumns.y.quantitative ? FieldNames.StacksLatBin0 : specColumns.y.name,
                        offset: {
                            scale: 'yinternalscale',
                            field: 'depth'
                        }
                    },
                    z: {
                        scale: 'zband',
                        field: 'row'
                    },
                    depth: {
                        scale: 'zband',
                        band: true
                    },
                    width: {
                        signal: 'actsize'
                    },
                    height: {
                        signal: 'actsize'
                    },
                    fill: fill(context),
                    opacity: opacity(context)
                }
            }
        }
    ];
    return marks;
}
