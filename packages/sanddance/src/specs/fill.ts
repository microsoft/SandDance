// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ColorValueRef, NumericValueRef, ProductionRule } from 'vega-typings';
import { FieldNames, ScaleNames, SignalNames } from './constants';
import { SpecContext } from './types';
import { util } from '../vega-deck.gl';

export function fill(context: SpecContext): ProductionRule<ColorValueRef> {
    const { specColumns, insight, specViewOptions } = context;
    const colorColumn = specColumns.color;
    return colorColumn ?
        colorColumn.isColorData || insight.directColor ?
            {
                field: colorColumn.name
            }
            :
            {
                scale: ScaleNames.Color,
                field: colorColumn.quantitative ? colorColumn.name : FieldNames.Top
            }
        :
        {
            value: util.colorToString(specViewOptions.colors.defaultCube)
        };
}

export function opacity(context: SpecContext) {
    const result: ProductionRule<NumericValueRef> = {
        signal: SignalNames.MarkOpacity
    };
    return result;
}
