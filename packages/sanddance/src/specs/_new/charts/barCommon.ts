// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { BarH } from '../footprints/barH';
import { BarV } from '../footprints/barV';
import { Footprint } from '../footprints/footprint';
import { Grid } from '../unitLayouts/grid';
import { PercentH } from '../footprints/percentH';
import { PercentV } from '../footprints/percentV';
import { StripPercentH, StripPercentV } from '../unitLayouts/strip';
import { SumStyle } from '../../types';
import { Treemap } from '../unitLayouts/treemap';
import { UnitLayout } from '../unitLayouts/unitLayout';

export function footprintClassFromSumStyle(sumStyle: SumStyle, vertical: boolean): typeof Footprint {
    switch (sumStyle) {
        case 'strip-percent':
            return vertical ? PercentV : PercentH;
        default:
            return vertical ? BarV : BarH;
    }
}

export function unitLayoutClassFromSumStyle(sumStyle: SumStyle, vertical: boolean): typeof UnitLayout {
    switch (sumStyle) {
        case 'treemap':
            return Treemap;
        case 'strip-percent':
            return vertical ? StripPercentV : StripPercentH;
        default:
            return Grid;
    }
}
