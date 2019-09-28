// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnableColorScale, linearScale, pointScale } from '../scales';
import {
    ColorScaleNone,
    DataNames,
    FieldNames,
    ScaleNames,
    SignalNames
} from '../constants';
import { RangeScheme, Scale } from 'vega-typings';
import { SpecContext } from '../types';

export default function (context: SpecContext) {
    const { specColumns, insight } = context;
    const scales: Scale[] = [
        {
            name: 'xscale',
            type: 'point',
            domain: specColumns.x.quantitative ?
                {
                    data: 'xaxisdata',
                    field: 'data',
                    sort: true
                }
                :
                {
                    data: DataNames.Main,
                    field: specColumns.x.name,
                    sort: true
                },
            range: 'width',
            padding: 0.5
        },
        {
            name: 'yscale',
            type: 'point',
            domain: specColumns.y.quantitative ?
                {
                    data: 'yaxisdata',
                    field: 'data',
                    sort: true
                }
                :
                {
                    data: DataNames.Main,
                    field: specColumns.y.name,
                    sort: true
                },
            range: 'height',
            reverse: true,
            padding: 0.5
        },
        {
            name: 'sizescale',
            type: 'linear',
            domain: [
                0,
                {
                    signal: 'sqrt(cextent[1])'
                }
            ],
            range: [
                0,
                {
                    signal: 'width/max(xsize,ysize)'
                }
            ]
        }
    ];
    if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
        if (specColumns.color.quantitative) {
            scales.push(binnableColorScale(insight.colorBin, DataNames.Main, specColumns.color.name, insight.scheme));
        } else {
            scales.push(
                {
                    name: ScaleNames.Color,
                    type: 'ordinal',
                    domain: {
                        data: DataNames.Legend,
                        field: FieldNames.Top,
                        sort: true
                    },
                    range: {
                        scheme: insight.scheme || ColorScaleNone
                    },
                    reverse: { signal: SignalNames.ColorReverse }
                }
            );
        }
    }
    if (specColumns.z) {
        const zRange: RangeScheme = [0, { signal: SignalNames.ZHeight }];
        scales.push(
            specColumns.z.quantitative ?
                linearScale(ScaleNames.Z, DataNames.Main, specColumns.z.name, zRange, false, true)
                :
                pointScale(ScaleNames.Z, DataNames.Main, zRange, specColumns.z.name)
        );
    }
    return scales;
}
