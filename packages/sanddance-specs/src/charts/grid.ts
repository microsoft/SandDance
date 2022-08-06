/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { AxisScales } from '../interfaces';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { SquareProps } from '../layouts/square';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { insight, specColumns } = specContext;
    const { view } = insight;
    const squareProps: SquareProps = {
        sortBy: specColumns.sort,
        fillDirection: 'right-down',
        z: specColumns.z,
        collapseYHeight: true,
        showAxes: !insight.hideAxes,
        view,
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
                    disabled: view === '2d',
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
