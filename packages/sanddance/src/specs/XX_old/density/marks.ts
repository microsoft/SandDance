// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FieldNames, ScaleNames } from '../../constants';
import { fill, opacity } from '../../fill';
import { RectMark } from 'vega-typings';
import { SpecContext } from '../../types';
import { testForCollapseSelection } from '../../selection';

export default function (context: SpecContext) {
    const { specColumns } = context;
    const mark: RectMark = {
        type: 'rect',
        from: {
            data: 'aggregated'
        },
        sort: {
            field: [
                specColumns.x.name,
                specColumns.y.name
            ],
            order: [
                'ascending',
                'ascending'
            ]
        },
        encode: {
            update: {
                xc: {
                    scale: 'xscale',
                    field: specColumns.x.quantitative ? FieldNames.DensityXBin0 : specColumns.x.name,
                    offset: {
                        signal: `scale('sizescale', ((datum.${FieldNames.DensityRow}-1) % floor(sqrt(datum.${FieldNames.DensityCount}))))-scale('sizescale', sqrt(datum.${FieldNames.DensityCount})-2)/2`
                    }
                },
                yc: {
                    scale: 'yscale',
                    field: specColumns.y.quantitative ? FieldNames.DensityYBin0 : specColumns.y.name,
                    offset: {
                        signal: `scale('sizescale',height/width*floor(((datum.${FieldNames.DensityRow}-1) / floor(sqrt(datum.${FieldNames.DensityCount}))))) - scale('sizescale', height/width*sqrt(datum.${FieldNames.DensityCount})+2)/2`
                    }
                },
                width: {
                    signal: 'unitsize'
                },
                height: {
                    signal: 'height/width*unitsize'
                },
                fill: fill(context),
                opacity: opacity(context)
            }
        }
    };
    if (specColumns.z) {
        const update = mark.encode.update;
        update.z = {
            value: 0
        };
        update.depth = [
            {
                test: testForCollapseSelection(),
                value: 0
            },
            {
                scale: ScaleNames.Z,
                field: specColumns.z.name
            }
        ];
    }
    return [mark];
}
