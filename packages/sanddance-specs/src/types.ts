// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column, View } from '@msrvida/chart-types';
import { Search } from '@msrvida/search-expression';
import { Transforms } from 'vega-typings';

/**
 * Type of selection scope on an axis.
 */
export type AxisSelectionType = 'exact' | 'range';

/**
 * Types of SandDance visualizations.
 */
export type Chart = 'barchart' | 'barchartH' | 'barchartV' | 'density' | 'grid' | 'scatterplot' | 'stacks' | 'strips' | 'treemap';

export type ColorBin = 'continuous' | 'quantize' | 'quantile';

/**
 * Layout style to use for faceting.
 */
export type FacetStyle = 'wrap' | 'cross'; // | 'horizontal' | 'vertical'

/**
 * Layout style to use for summing.
 */
export type TotalStyle = 'count-square' | 'count-strip' | 'sum-strip' | 'sum-strip-percent' | 'sum-treemap';

/**
 * Column to use for faceting into small multiples.
 */
export interface Facets {

    /**
     * Number of columns in the facet grid.
     */
    columns: number;

    /**
     * Number of rows in the facet grid.
     */
    rows: number;
}

/**
 * Options to designate a SandDance visualization.
 */
export interface Insight {
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

export interface SpecRoleCapabilities {
    role: InsightColumnRoles;
    excludeCategoric?: boolean;
    allowNone?: boolean | ((specContext: SpecContext) => boolean);
    binnable?: boolean;
    axisSelection?: AxisSelectionType;

    /**
     * Signals associated with this spec role.
     */
    signals?: string[];
}

/**
 * Interaction behavior on a visualization type.
 */
export interface SpecCapabilities {
    /**
     * Capability of showing as counts or sums
     */
    countsAndSums: boolean;

    /**
     * Capability of showing as percentage
     */
    percentage?: boolean;

    /**
     * Roles to map columns.
     */
    roles: SpecRoleCapabilities[];

    /**
     * Signals associated with this spec type.
     */
    signals?: string[];
}

/**
 * Custom colors of various parts of the visualization.
 */
export interface SpecColorSettings {

    /**
     * Color of cubes when there is no coloring specified.
     */
    defaultCube?: string;

    /**
     * Color of axes lines.
     */
    axisLine?: string;

    /**
     * Color of axes text.
     */
    axisText?: string;
}

/**
 * Language settings.
 */
export interface SpecLanguage {

    /**
     * Label for a count axis.
     */
    count: string;

    /**
     * Label for a sum axis.
     */
    sum: string;

    /**
     * Label for a percentage axis.
     */
    percent: string;

    /**
     * Label for treemap method dropdown.
     */
    treeMapMethod: string;

    /**
     * Label for scatterPlot point scale slider.
     */
    scatterPointScale: string;

    /**
     * Label for bar facet max bins slider.
     */
    FacetMaxBins: string;

    /**
     * Label for bar facetV max bins slider.
     */
    FacetVMaxBins: string;

    /**
     * Label for bar x axis max bins slider.
     */
    XMaxBins: string;

    /**
     * Label for bar y axis max bins slider.
     */
    YMaxBins: string;

    /**
     * Label for bar x grid size slider.
     */
    XGridSize: string;

    /**
     * Label for bar y grid size slider.
     */
    YGridSize: string;

    /**
     * Label for bar inner padding size slider.
     */
    InnerPaddingSize: string;

    /**
     * Label for bar outer padding size slider.
     */
    OuterPaddingSize: string;

    /**
     * Label for the color bin count slider.
     */
    colorBinCount: string;

    /**
     * Label for the color reverse checkbox.
     */
    colorReverse: string;

    /**
     * Label for facet columns slider.
     */
    facetColumns: string;

    /**
     * Label for facet rows slider.
     */
    facetRows: string;

    /**
     * Label for mark opacity slider.
     */
    markOpacitySignal: string;

    /**
     * Label for text scale slider.
     */
    textScaleSignal: string;

    /**
     * Label for x axis text angle slider.
     */
    xAxisTextAngleSignal: string;

    /**
     * Label for y axis text angle slider.
     */
    yAxisTextAngleSignal: string;

    /**
     * Label for z scale proportion slider.
     */
    zScaleProportion: string;

    /**
     * Label for z grounded toggle.
     */
    zGrounded: string;
}

export interface SignalValues {
    [key: string]: any;
}

/**
 * Rectangle size.
 */
export interface Size {
    height: number;
    width: number;
}

/**
 * Specified columns for a SandDance visualization.
 */
export interface SpecColumns {

    /**
     * Column with a unique id for each row.
     */
    uid: Column;

    /**
     * Column to use as x-axis in a visualization.
     */
    x?: Column;

    /**
     * Column to use as y-axis in a visualization, optional for bar chart.
     */
    y?: Column;

    /**
     * Column to use as z-axis in a visualization.
     */
    z?: Column;

    /**
     * Column to use as size in a visualization.
     */
    size?: Column;

    /**
     * Column to use for grouping in a visualization.
     */
    group?: Column;

    /**
     * Column to use for coloring a visualization.
     */
    color?: Column;

    /**
     * Column to use for sorting a visualization, not applicable to scatterplot.
     */
    sort?: Column;

    /**
     * Column to use for faceting a visualization.
     */
    facet?: Column;

    /**
     * Column to use for vertically faceting a visualization.
     */
    facetV?: Column;
}

export interface SpecViewOptions {

    /**
     * Custom colors of various parts of the visualization.
     */
    colors: SpecColorSettings;

    /**
     * Language settings for the visualization.
     */
    language: SpecLanguage;

    /**
     * Maximum number of rows in a legend.
     */
    maxLegends: number;

    tickSize: number
}

export interface SpecContext {
    specColumns: SpecColumns;
    insight: Insight;
    specViewOptions: SpecViewOptions;
}
