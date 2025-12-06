/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Size, View } from '@msrvida/chart-types';
import { Search } from '@msrvida/search-expression';
import { Transforms } from 'vega-typings';
import { BackgroundImage, Chart, ColorBin, FacetStyle, SignalValues, TotalStyle } from './types';

/**
 * Options to designate a SandDance visualization.
 */
export interface Insight {
    backgroundImage?: BackgroundImage;
    chart: Chart;
    size: Size;
    columns: InsightColumns;
    view?: View;
    filter?: Search;
    facetStyle?: FacetStyle;
    totalStyle?: TotalStyle;

    /**
     * Type of color binning to use on color scale. Only applicable when the column in the color role is quantitative. 
     */
    colorBin?: ColorBin;

    /**
     * Name of the color scheme. See https://vega.github.io/vega/docs/schemes/
     */
    scheme?: string;

    /**
     * Vega signal values for this insight.
     */
    signalValues?: SignalValues;

    /**
     * Optional flag to hide axes.
     */
    hideAxes?: boolean;

    /**
     * Optional flag to hide legend.
     */
    hideLegend?: boolean;

    /**
     * Optional flag to use CSS colors directly from data.
     */
    directColor?: boolean;

    /**
     * Optional array of Vega transforms to apply to the data.
     */
    transform?: Transforms[];
}

export type InsightColumnRoles = 'uid' | 'x' | 'y' | 'z' | 'group' | 'size' | 'color' | 'facet' | 'facetV' | 'sort';

export interface InsightColumns {
    uid?: string;
    x?: string;
    y?: string;
    z?: string;
    group?: string;
    size?: string;
    color?: string;
    sort?: string;
    facet?: string;
    facetV?: string;
}
