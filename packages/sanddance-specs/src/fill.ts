// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SignalNames } from './constants';
import { safeFieldName } from './expr';
import { SpecContext } from './types';
import { ColorValueRef, NumericValueRef, ProductionRule } from 'vega-typings';

export function fill(context: SpecContext, colorFieldName: string, scale: string): ProductionRule<ColorValueRef> {
    const { specColumns, insight, specViewOptions } = context;
    const colorColumn = specColumns.color;
    return colorColumn ?
        colorColumn.isColorData || insight.directColor ?
            {
                field: safeFieldName(colorColumn.name)
            }
            :
            {
                scale,
                field: colorColumn.quantitative ? safeFieldName(colorColumn.name) : colorFieldName
            }
        :
        {
            value: specViewOptions.colors.defaultCube
        };
}

export function opacity(context: SpecContext): ProductionRule<NumericValueRef> {
    const result: ProductionRule<NumericValueRef> = {
        signal: SignalNames.MarkOpacity
    };
    return result;
}
