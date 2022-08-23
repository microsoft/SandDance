/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import * as VegaMorphCharts from '@msrvida/vega-morphcharts';
import { Transition } from "./types";
import { getStats } from '@msrvida/sanddance-specs';
import { scaleLinear } from 'd3-scale';
import { GL_ORDINAL } from './constants';
import { Dimension3D } from '../../chart-types/dist/es6';

export function assignTransitionStagger(transition: Transition, currentData: object[], selection: Set<number>, presenter: VegaMorphCharts.Presenter) {
    const { layerStagger } = presenter.morphchartsref;
    const { morphChartsRenderResult } = presenter;
    const cubelayer = morphChartsRenderResult.getCubeLayer();
    const range = transition.reverse ? [1, 0] : [0, 1];
    if (!transition || transition.type === 'ordinal' && !transition.reverse) {
        delete layerStagger.cubes;
    } else {
        const staggerOrders = new Float64Array(cubelayer.positionsX.length);
        switch (transition.type) {
            case 'ordinal': {
                //reverse ordinal
                const scale = scaleLinear(range).domain([0, currentData.length]);
                currentData.forEach((datum, i) => {
                    const glOrdinal = datum[GL_ORDINAL] as number;
                    staggerOrders[glOrdinal] = scale(i);
                });
                break;
            }
            case 'column': {
                if (transition.column.quantitative) {
                    const values = new Float64Array(currentData.length);
                    currentData.forEach((datum, i) => {
                        values[i] = datum[transition.column.name];
                    });
                    const stats = getStats(currentData, transition.column);
                    const scale = scaleLinear(range).domain([stats.min, stats.max]);
                    currentData.forEach((datum, i) => {
                        const glOrdinal = datum[GL_ORDINAL] as number;
                        staggerOrders[glOrdinal] = scale(values[i]);
                    });
                } else {
                    const strings: string[] = new Array(currentData.length);
                    currentData.forEach((datum, i) => {
                        strings[i] = datum[transition.column.name];
                    });
                    getStats(currentData, transition.column, distictValues => {
                        currentData.forEach((datum, i) => {
                            const glOrdinal = datum[GL_ORDINAL] as number;
                            const index = distictValues.indexOf(strings[i]);
                            const staggerOrder = index / distictValues.length;
                            staggerOrders[glOrdinal] = transition.reverse ? 1 - staggerOrder : staggerOrder;
                        });
                    });
                }
                break;
            }
            case 'position': {
                const dimensions: { [key in Dimension3D]: Float64Array } = {
                    'x': cubelayer.positionsX,
                    'y': cubelayer.positionsY,
                    'z': cubelayer.positionsZ,
                };
                const positions = dimensions[transition.dimension];
                const values = new Float64Array(currentData.length);
                currentData.forEach((datum, i) => {
                    const glOrdinal = datum[GL_ORDINAL] as number;
                    values[i] = positions[glOrdinal];
                });
                const stats = getStats(values, null, 'number', true);
                const scale = scaleLinear(range).domain([stats.min, stats.max]);
                currentData.forEach((datum, i) => {
                    const glOrdinal = datum[GL_ORDINAL] as number;
                    staggerOrders[glOrdinal] = scale(values[i]);
                });
                break;
            }
        }
        layerStagger.cubes = { staggerOrders, maxStaggerOrder: 1, minStaggerOrder: 0 };
    }
    cubelayer.update(morphChartsRenderResult.bounds, selection, layerStagger.cubes)
}