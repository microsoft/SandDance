// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { BarChartSignalNames } from '../../constants';
import { Column, SpecContext } from '../../types';
import { FieldNames, SignalNames } from '../../constants';
import { StackTransform, Transforms } from 'vega-typings';

export default function (context: SpecContext, groupBy: Column) {
    const { specColumns } = context;
    const bucket_extent = 'bucket_extent';

    const stackTransform: StackTransform = {
        type: 'stack',
        groupby: [
            FieldNames.BarChartBin0
        ],
        as: [
            FieldNames.BarChartStack0,
            FieldNames.BarChartStack1
        ]
    };
    if (groupBy) {
        stackTransform.groupby.push(groupBy.name);
    }
    if (specColumns.sort) {
        stackTransform.sort = {
            field: specColumns.sort.name
        };
    }
    const transforms: Transforms[] = [
        {
            type: 'extent',
            field: specColumns.x.name,
            signal: bucket_extent
        },
        {
            type: 'bin',
            field: specColumns.x.name,
            extent: {
                signal: bucket_extent
            },
            maxbins: {
                signal: SignalNames.XBins
            },
            as: [
                FieldNames.BarChartBin0,
                FieldNames.BarChartBin1
            ],
            signal: BarChartSignalNames.quantitativeBinSignal
        },
        stackTransform,
        {
            type: 'extent',
            signal: BarChartSignalNames.levelExtentSignal,
            field: FieldNames.BarChartStack1
        }
    ];
    return transforms;
}