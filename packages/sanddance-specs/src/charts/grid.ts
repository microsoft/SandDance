// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales } from '../interfaces';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { SquareProps } from '../layouts/square';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { specColumns } = specContext;
    const squareProps: SquareProps = {
        sortBy: specColumns.sort,
        fillDirection: 'right-down',
        z: specColumns.z,
        collapseYHeight: true,
        showAxes: true,
    };
    const axisScales: AxisScales = {
        z: { title: specColumns.z && specColumns.z.name },
    };
    return {
        axisScales,
        layouts: [
            {
                layoutType: 'Square',
                props: squareProps,
            },
        ],
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: 'z',
                    axisSelection: specColumns.z?.quantitative ? 'range' : 'exact',
                    allowNone: true,
                },
                {
                    role: 'color',
                    allowNone: true,
                },
                {
                    role: 'sort',
                    allowNone: true,
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [SignalNames.FacetBins],
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [SignalNames.FacetVBins],
                },
            ],
        },
    };
}
