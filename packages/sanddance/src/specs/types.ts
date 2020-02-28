// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { Color } from '@deck.gl/core/utils/color';
import { Search } from '../searchExpression/types';
import { Transforms, TypeInference } from 'vega-typings';

/**
 * Type of selection scope on an axis.
 */
export type AxisSelectionType = 'exact' | 'range';

/**
 * Types of SandDance visualizations.
 */
export type Chart = 'barchart' | 'barchartH' | 'barchartV' | 'density' | 'grid' | 'scatterplot' | 'stacks' | 'treemap';

export type ColorBin = 'continuous' | 'quantize' | 'quantile';

/**
 * Column information.
 */
export interface Column {

    /**
     * Name of the column.
     */
    name: string;

    /**
     * Type of data in the column.
     */
    type: TypeInference;

    /**
     * Optional flag to specify if the column data is quantitative.
     */
    quantitative?: boolean;

    /**
    * Optional flag to specify if the column data is CSS colors.
    */
    isColorData?: boolean;

    /**
     * Optional stats object with metadata of column data content.
     */
    stats?: ColumnStats;
}

/**
 * Metadata about a column.
 */
export interface ColumnStats {

    /**
     * Number of unique values in this column.
     */
    distinctValueCount: number;

    /**
     * Maximum value of data in this column, if column is numeric.
     */
    max?: number;

    /**
     * Mean value of data in this column, if column is numeric.
     */
    mean?: number;

    /**
     * Minimum value of data in this column, if column is numeric.
     */
    min?: number;

    /**
     * Optional flag to specify if the column data is sequential.
     */
    isSequential?: boolean;

    /**
     * Optional flag to specify if the column data contains negative numbers.
     */
    hasNegative?: boolean;

    /**
     * Optional flag to specify if the column data contains color data.
     */
    hasColorData?: boolean;

}

export interface ColumnTypeMap {
    [columnName: string]: TypeInference
}

export interface FacetMargins {
    column: number;
    row: number;
    title: number;
}

/**
 * Layout style to use for faceting.
 */
export type FacetStyle = 'wrap' | 'horizontal' | 'vertical' | 'cross'; //horizontal, vertical, wrap, cross

/**
 * Layout style to use for summing.
 */
export type SumStyle = 'treemap' | 'strip' | 'strip-percent';

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
    view?: VegaDeckGl.types.View;
    filter?: Search;
    facetStyle?: FacetStyle;
    facets?: Facets;            //TODO: deprecate
    sumStyle?: SumStyle;

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

export type InsightColumnRoles = 'uid' | 'x' | 'y' | 'z' | 'group' | 'size' | 'color' | 'facet' | 'facetV' | 'sort' | 'sum';

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
    sum?: string;
}

export interface SpecRoleCapabilities {
    role: InsightColumnRoles;
    excludeCategoric?: boolean;
    allowNone?: boolean;
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
    defaultCube?: Color;

    /**
     * Color of axes lines.
     */
    axisLine?: Color;

    /**
     * Color of axes text.
     */
    axisText?: Color;

    /**
     * Color of inactive facets lines.
     */
    cellFillerLine?: Color;
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
     * Label for scatterPlot point size slider.
     */
    scatterPointSize: string;

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
     * Column to use for summing a visualization.
     */
    sum?: Column;

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

    facetMargins: FacetMargins;

    tickSize: number
}

export interface SpecContext {
    specColumns: SpecColumns;
    insight: Insight;
    specViewOptions: SpecViewOptions;
}
