// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column } from '@msrvida/chart-types';
import { SpecContext } from './types';
import { Legend } from 'vega-typings';

function legend(column: Column, fill: string) {
    const legend: Legend = {
        orient: 'none',
        title: column.name,
        fill,
        encode: {
            symbols: {
                update: {
                    shape: {
                        value: 'square',
                    },
                },
            },
        },
    };
    if (column.quantitative) {
        legend.type = 'symbol';
        legend.format = '~r';
    }
    return legend;
}

export function getLegends(context: SpecContext, fill: string) {
    const { specColumns, insight } = context;
    if (specColumns.color && !insight.hideLegend && !insight.directColor && !specColumns.color.isColorData) {
        return [legend(specColumns.color, fill)];
    }
}
