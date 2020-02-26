// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnableColorScale } from './scales';
import { colorBinCountSignal, colorReverseSignal } from './signals';
import { ColorScaleNone, ScaleNames, SignalNames } from './constants';
import { getLegends } from './legends';
import { push } from '../array';
import { Scope } from 'vega-typings';
import { SpecContext } from './types';
import { topLookup } from './top';

export function addColor(scope: Scope, dataSource: string, specContext: SpecContext) {
    let colorDataName = dataSource;
    const { insight, specColumns, specViewOptions } = specContext;
    const legends = getLegends(specContext);
    if (legends) {
        scope.legends = legends;
    }

    const topColorField = 'top_color';
    const categoricalColor = specColumns.color && !specColumns.color.quantitative;
    if (categoricalColor) {
        const legendName = 'data_legend';
        push(scope.data, topLookup(specColumns.color, specViewOptions.maxLegends, dataSource, legendName, 'top_colors', topColorField));
        colorDataName = legendName;
    }

    if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
        if (specColumns.color.quantitative) {
            scope.scales.push(binnableColorScale(insight.colorBin, dataSource, specColumns.color.name, insight.scheme));
        } else {
            scope.scales.push(
                {
                    name: ScaleNames.Color,
                    type: 'ordinal',
                    domain: {
                        data: colorDataName,
                        field: topColorField,
                        sort: true
                    },
                    range: {
                        scheme: insight.scheme || ColorScaleNone
                    },
                    reverse: { signal: SignalNames.ColorReverse }
                }
            );
        }
    }

    push(scope.signals, [
        colorBinCountSignal(specContext),
        colorReverseSignal(specContext)
    ]);

    return { topColorField, colorDataName };
}
