/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Column } from '@msrvida/chart-types';
import { isGeo } from './geo.js';

export function preferredColumnForTreemapSize(columns: Column[], strict: boolean) {
    for (let i = 0; i < columns.length; i++) {
        const c = columns[i];
        if (c.quantitative) {
            if (strict && c.stats.hasNegative) continue;
            if (strict && c.stats.isSequential) continue;
            if (strict && isGeo(c)) continue;
            return c;
        }
    }
}
