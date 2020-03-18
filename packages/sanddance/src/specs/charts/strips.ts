// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales } from '../interfaces';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Strip, StripProps } from '../layouts/strip';

export default function (specContext: SpecContext): SpecBuilderProps {
    const { specColumns } = specContext;
    const stripProps: StripProps = {
        orientation: 'vertical',
        size: specColumns.size,
        sort: specColumns.sort,
        z: specColumns.z
};
    const axisScales: AxisScales = {
        z: { title: specColumns.z && specColumns.z.name }
    };
    return {
        axisScales,
        layouts: [
            {
                layoutClass: Strip,
                props: stripProps
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
