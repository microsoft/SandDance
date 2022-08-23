/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import * as VegaMorphCharts from '@msrvida/vega-morphcharts';
import { ColumnStats, Transition } from "./types";
import { getStats } from '@msrvida/sanddance-specs';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { GL_ORDINAL } from './constants';

export function assignTransitionStagger(transition: Transition, currentData: object[], presenter: VegaMorphCharts.Presenter) {
    const { layerStagger } = presenter.morphchartsref;
    if (!transition || transition.type === 'ordinal') {
        delete layerStagger.cubes;
    } else {
        const { morphChartsRenderResult } = presenter;
        const cubelayer = morphChartsRenderResult.getCubeLayer();
        const staggerOrders = new Float64Array(cubelayer.positionsX.length);
        //TODO calc column via filtered data
        let stats: ColumnStats;
        switch (transition.type) {
            case 'column': {
                stats = getStats(currentData, transition.column)
                //TODO extract the column, get stats, sort it, use as a domain, create a scale range 0-1
                //TODO cluster
                break;
            }
            case 'position': {
                let positions: Float64Array;
                switch (transition.dimension) {
                    case 'x': {
                        positions = cubelayer.positionsX;
                        break;
                    }
                    case 'y': {
                        positions = cubelayer.positionsY;
                        break;
                    }
                }
                const values = new Float64Array(currentData.length);
                currentData.forEach((datum, i) => {
                    const glOrdinal = datum[GL_ORDINAL] as number;
                    values[i] = positions[glOrdinal];
                })
                stats = getStats(values, null, 'number', true);
                const scale = scaleLinear([0, 1])
                    .domain([stats.min, stats.max]);

                currentData.forEach((datum, i) => {
                    const glOrdinal = datum[GL_ORDINAL] as number;
                    staggerOrders[glOrdinal] = scale(values[i]);
                })

                //TODO cluster
                break;
            }
        }
        //console.log('staggerOrders', staggerOrders)
        layerStagger.cubes = { staggerOrders, maxStaggerOrder: 1, minStaggerOrder: 0 };
        cubelayer.update(morphChartsRenderResult.bounds, new Set<number>(), layerStagger.cubes)
    }
}