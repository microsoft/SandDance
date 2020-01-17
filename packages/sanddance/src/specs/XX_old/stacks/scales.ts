// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnableColorScale } from '../../scales';
import {
    ColorScaleNone,
    DataNames,
    FieldNames,
    ScaleNames,
    SignalNames
} from '../../constants';
import { Scale } from 'vega-typings';
import { SpecContext } from '../../types';

export default function (context: SpecContext) {
    const { specColumns, insight } = context;
    const scales: Scale[] = [
        {
            name: 'xband',
            type: 'band',
            domain: specColumns.x.quantitative ?
                {
                    data: 'xaxisdata',
                    field: 'data',
                    sort: true
                }
                :
                {
                    data: DataNames.Main,
                    field: specColumns.x.quantitative ? FieldNames.StacksLongBin0 : specColumns.x.name,
                    sort: true
                },
            range: [
                0,
                {
                    signal: 'width'
                }
            ],
            padding: { signal: SignalNames.OuterPadding },
            round: true
        },
        {
            name: 'yband',
            type: 'band',
            reverse: true,
            domain: specColumns.y.quantitative ?
                {
                    data: 'yaxisdata',
                    field: 'data',
                    sort: true
                }
                :
                {
                    data: DataNames.Main,
                    field: specColumns.y.quantitative ? FieldNames.StacksLatBin0 : specColumns.y.name,
                    sort: true
                },
            range: 'height',
            padding: { signal: SignalNames.OuterPadding },
            round: true
        },
        {
            name: 'zband',
            type: 'band',
            reverse: false,
            domain: {
                data: 'stackedgroup',
                field: 'row',
                sort: true
            },
            align: 0.0,
            range: [
                0,
                {
                    signal: 'countheight'
                }
            ],
            padding: { signal: SignalNames.InnerPadding },
            round: false
        },
        {
            name: 'xinternalscale',
            type: 'band',
            range: [
                0,
                {
                    signal: 'xbandw'
                }
            ],
            padding: {
                signal: SignalNames.InnerPadding
            },
            domain: {
                data: 'stackedgroup',
                field: 'column',
                sort: true
            }
        },
        {
            name: 'yinternalscale',
            type: 'band',
            range: [
                0,
                {
                    signal: 'ybandw'
                }
            ],
            padding: {
                signal: SignalNames.InnerPadding
            },
            domain: {
                data: 'stackedgroup',
                field: 'depth',
                sort: true
            }
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
    return scales;
}
