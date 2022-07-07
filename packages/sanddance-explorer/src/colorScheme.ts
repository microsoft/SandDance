/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { SandDance } from '@msrvida/sanddance-react';

export function bestColorScheme(newColumn: SandDance.types.Column, oldColumn: SandDance.types.Column, oldScheme: string) {
    if (oldColumn &&
        oldColumn.quantitative === newColumn.quantitative &&
        defaultColorScheme(oldColumn) === defaultColorScheme(newColumn)
    ) {
        return oldScheme;
    }
    return defaultColorScheme(newColumn);
}

function defaultColorScheme(c: SandDance.types.Column) {
    if (c.quantitative) {
        return 'redyellowgreen';
    } else if (c.stats.distinctValueCount === 2) {
        return 'dual_redgreen';
    } else if (c.stats.distinctValueCount <= 10) {
        return 'category10';
    }
    return 'category20';
}
