// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import qualitativeScales from './scales.qualitative';
import quantitativeScales from './scales.quantitative';
import { BarChartScaleNames, BarChartSignalNames } from './constants';
import { binnableColorScale, linearScale, pointScale } from '../scales';
import {
    ColorScaleNone,
    DataNames,
    FieldNames,
    ScaleNames,
    SignalNames
} from '../constants';
import { NameSpace } from './namespace';
import { RangeScheme, Scale } from 'vega-typings';
import { SpecContext } from '../types';

export default function (context: SpecContext, namespace: NameSpace) {
    const { specColumns, insight } = context;
    const scales: Scale[] = [
        {
            name: BarChartScaleNames.compartmentScale,
            type: 'band',
            range: [
                0,
                {
                    signal: BarChartSignalNames.compartmentWidthSignal
                }
            ],
            padding: 0.1,
            domain: {
                signal: `sequence(0, ${BarChartSignalNames.compartmentsPerLevelSignal}+1, 1)`
            }
        },
        {
            name: BarChartScaleNames.levelScale,
            range: [
                {
                    signal: 'height'
                },
                {
                    signal: '0'
                }
            ],
            round: true,
            domain: {
                data: namespace.stacked,
                field: namespace.__level,
                sort: true
            },
            zero: true,
            nice: true
        },
        {
            name: ScaleNames.Y,
            type: 'band',
            range: [
                {
                    signal: 'height'
                },
                {
                    signal: '0'
                }
            ],
            padding: 0.1,
            round: false,
            reverse: false,
            align: 1,
            domain: {
                data: namespace.stacked,
                field: namespace.__level,
                sort: true
            }
        }
    ];
    if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
        if (specColumns.color.quantitative) {
            scales.push(binnableColorScale(insight.colorBin, namespace.bucket, specColumns.color.name, insight.scheme));
        } else {
            scales.push(
                {
                    name: ScaleNames.Color,
                    type: 'ordinal',
                    domain: {
                        data: namespace.bucket,
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
    return scales.concat(specColumns.x.quantitative ? quantitativeScales() : qualitativeScales(context, namespace));
}