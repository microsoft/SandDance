// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SignalNames } from '../constants';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';
import { Treemap, TreemapProps } from '../layouts/treemap';

export default function (specContext: SpecContext): SpecBuilderProps {
    return {
        specContext,
        layouts: [
            {
                layoutClass: Treemap,
                props: <TreemapProps>{ corner: 'top-left' }
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
