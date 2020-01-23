// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Square, SquareProps } from '../layouts/square';
import { SpecBuilderProps } from '../specBuilder';
import { SpecContext } from '../types';

export default function (specContext: SpecContext): SpecBuilderProps {
    const squareProps: SquareProps = { sortBy: specContext.specColumns.sort, fillDirection: 'right-down', markType: 'rect' };
    return {
        specContext,
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
                    allowNone: true
                },
                {
                    role: 'facetV',
                    allowNone: true
                }
            ]
        }
    };
}
