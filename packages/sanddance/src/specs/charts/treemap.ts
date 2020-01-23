// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AxisScales } from '../interfaces';
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Treemap, TreemapProps } from '../layouts/treemap';

export default function (specContext: SpecContext): SpecBuilderProps {
    const treemapProps: TreemapProps = { corner: 'top-left' };
    const axisScales: AxisScales = {
        z: { type: 'zFloor' }
    };
    return {
        axisScales,
        layouts: [
            {
                layoutClass: Treemap,
                props: treemapProps
            }
        ],
        specCapabilities: {
            roles: [
                {
                    role: 'size',
                    excludeCategoric: true
                },
                {
                    role: 'group',
                    allowNone: true
                },
                {
                    role: 'z',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'facet',
                    allowNone: true
                },
                {
                    role: 'facetV',
                    allowNone: true
                }
            ],
            signals: [SignalNames.TreeMapMethod]
        }
    };
}
