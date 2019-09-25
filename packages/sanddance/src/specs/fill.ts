// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ColorValueRef, ProductionRule } from 'vega-typings';
import { FieldNames, ScaleNames } from './constants';
import { SpecContext } from './types';
import { util } from '../vega-deck.gl';

export function fill(context: SpecContext): ProductionRule<ColorValueRef> {
    const { columns, specViewOptions } = context;
    const colorColumn = columns.color;
    return colorColumn ?
        colorColumn.isColorData ?
            {
                "field": colorColumn.name
            }
            :
            {
                "scale": ScaleNames.Color,
                "field": colorColumn.quantitative ? colorColumn.name : FieldNames.Top
            }
        :
        {
            "value": util.colorToString(specViewOptions.colors.defaultCube)
        }
}
