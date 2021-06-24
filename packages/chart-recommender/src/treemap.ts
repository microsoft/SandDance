// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as SandDance from '@msrvida/sanddance';
import { isGeo } from './geo';

export function preferredColumnForTreemapSize(columns: SandDance.types.Column[], strict: boolean) {
    for (let i = 0; i < columns.length; i++) {
        let c = columns[i];
        if (c.quantitative) {
            if (strict && c.stats.hasNegative) continue;
            if (strict && c.stats.isSequential) continue;
            if (strict && isGeo(c)) continue;
            return c;
        }
    }
}
