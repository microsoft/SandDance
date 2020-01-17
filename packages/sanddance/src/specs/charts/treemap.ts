// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Treemap, TreemapProps } from '../unitLayouts/treemap';
import { Whole } from '../footprints/whole';

export default function (specContext: SpecContext): SpecBuilderProps {
    return {
        specContext,
        footprintClass: Whole,
        unitLayoutClass: Treemap,
        unitLayoutProps: { corner: 'top-left' } as TreemapProps,
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
