// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales } from '../interfaces';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Square, SquareProps } from '../layouts/square';

export default function (specContext: SpecContext): SpecBuilderProps {
    const squareProps: SquareProps = {
        sortBy: specContext.specColumns.sort,
        fillDirection: 'right-down'
    };
    const axisScales: AxisScales = {
        z: { type: 'zFloor' }
    };
    return {
        axisScales,
        layouts: [
            {
                layoutClass: Square,
                props: squareProps
            }
        ],
        specCapabilities: {
            roles: [
                {
                    role: 'z',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [SignalNames.FacetBins]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [SignalNames.FacetVBins]
                }
            ]
        }
    };
}
