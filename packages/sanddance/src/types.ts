/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import * as VegaMorphCharts from '@msrvida/vega-morphcharts';
import {
    Camera,
    Column,
    ColumnStats,
    ColumnTypeMap,
    Dimension2D,
    Dimension3D,
    Size,
    View,
} from '@msrvida/chart-types';
//import { LightSettings } from '@deck.gl/core/lib/layer';
import { Search, SearchExpressionGroup } from '@msrvida/search-expression';
import { Spec } from 'vega-typings';
import {
    Insight,
    SpecCapabilities,
    SpecColorSettings,
    SpecLanguage,
    SpecResult,
    SpecViewOptions,
} from '@msrvida/sanddance-specs';

export { Camera, Column, ColumnStats, ColumnTypeMap, Dimension2D, Dimension3D, Size, View };

/**
 * Map of ordinals per unique Id.
 */
export interface OrdinalMap {
    [uid: string]: number;
}

/**
 * Result of an attempt to render.
 */
export interface RenderResult {

    /**
     * Specification result object.
     */
    specResult: SpecResult;

    /**
     * Map of cube ordinals assigned by unique id.
     */
    ordinalMap: OrdinalMap;
}

/**
 * Customization options for the Viewer.
 */
export interface ViewerOptions extends SpecViewOptions {

    /**
     * Custom colors of various parts of the visualization.
     */
    colors: ColorSettings;

    /**
     * Font family of text elements.
     */
    fontFamily?: string;

    /**
     * Language settings for the visualization.
     */
    language: Language;

    /**
     * Tooltip options
     */
    tooltipOptions?: TooltipOptions;

    /**
     * Optional error handler.
     */
    onError?: (errors: string[]) => void;

    /**
     * Optional handler when color context changes.
     */
    onColorContextChange?: () => void;

    /**
     * Optional handler to be invoked when data is filtered.
     */
    onDataFilter?: (filter: Search, filteredData: object[]) => void;

    /**
     * Optional handler to be invoked when selection has changed.
     */
    onSelectionChanged?: (search: Search, activeIndex?: number, selectedData?: object[]) => void;

    /**
     * Optional handler when data is on stage.
     */
    onStage?: (stage: VegaMorphCharts.types.Stage) => void;

    /**
     * Optional handler when chart is presented.
     */
    onPresent?: () => void;

    /**
     * Optional handler to modify the stage prior to deck.gl layer construction.
     */
    onBeforeCreateLayers?: (stage: VegaMorphCharts.types.Stage, specCapabilities: SpecCapabilities) => void;

    /**
     * Optional handler to get the color of text elements.
     */
    getTextColor?: (t: VegaMorphCharts.types.VegaTextLayerDatum) => VegaMorphCharts.RGBAColor;

    /**
     * Optional handler to get the highlight color of text elements.
     */
    getTextHighlightColor?: (t: VegaMorphCharts.types.VegaTextLayerDatum) => VegaMorphCharts.RGBAColor;

    /**
     * Optional click handler for text elements.
     */
    onTextClick?: (e: MouseEvent | PointerEvent | TouchEvent, o: VegaMorphCharts.types.VegaTextLayerDatum) => void;

    /**
     * Optional handler when axis is clicked.
     */
    onAxisClick?: (e: TouchEvent | MouseEvent | PointerEvent, search: SearchExpressionGroup) => void;

    /**
     * Optional handler when empty canvas is clicked.
     */
    onCanvasClick?: (e: TouchEvent | MouseEvent | PointerEvent) => void;

    /**
     * Optional handler when cube is clicked.
     */
    onCubeClick?: (e: TouchEvent | MouseEvent | PointerEvent, cube: VegaMorphCharts.types.Cube) => void;

    /**
     * Optional handler when legend header is clicked.
     */
    onLegendHeaderClick?: (e: TouchEvent | MouseEvent | PointerEvent) => void;

    /**
     * Optional handler when legend row is clicked.
     */
    onLegendRowClick?: (e: TouchEvent | MouseEvent | PointerEvent, legendRow: LegendRowWithSearch) => void;

    /**
     * Optional handler when Vega spec is created, prior to it being rendered.
     */
    onVegaSpec?: (vegaSpec: Spec) => void;

    /**
     * Optional handler to reset the camera after chart is rendered.
     */
    onNewViewStateTarget?: () => boolean;

    /**
     * Optional flag to preserve the WebGL canvas.
     */
    preserveDrawingBuffer?: boolean;

    /**
     * Z value of selection polygons.
     */
    selectionPolygonZ: number;

    /**
     * Disable lasso selection.
     */
    disableLasso?: boolean;

    filterRenderingTimerPadding?: number;
}

export interface RenderOptions {
    rebaseFilter?: () => boolean;
    columns?: Column[];
    columnTypes?: ColumnTypeMap;
    ordinalMap?: OrdinalMap;
    initialColorContext?: ColorContext;
    discardColorContextUpdates?: () => boolean;
}

/**
 * Custom colors of various parts of the visualization.
 */
export interface ColorSettings extends SpecColorSettings {

    /**
     * Color of the background canvas.
     */
    backgroundColor?: string;

    /**
    * Color of the individually selected cube.
    */
    activeCube?: string;

    /**
     * Color of the cube when mouse hovered.
     */
    hoveredCube?: string;

    /**
     * Color of selected cubes.
     */
    selectedCube?: string;

    /**
     * Color of axis hover hotspots.
     */
    axisSelectHighlight?: string;
}

/**
 * Labels in the sections of the chart panel.
 */
export interface Headers {

    /**
     * Label above chart controls.
     */
    chart: string;

    /**
     * Label above legend.
     */
    legend: string;

    /**
     * Label above selection area.
     */
    selection: string;

    /**
     * Label above details section.
     */
    details: string;
}

/**
 * Language settings.
 */
export interface Language extends SpecLanguage {

    /**
     * Labels in the sections of the chart panel.
     */
    headers: Headers;

    /**
     * Text to use for "search with Bing".
     */
    bing: string;

    /**
     * Button text to re-map color.
     */
    newColorMap: string;

    /**
     * Button text to keep same color.
     */
    oldColorMap: string;

    /**
     * Button text to deselect.
     */
    deselect: string;

    /**
     * Button text to filter out selected items.
     */
    exclude: string;

    /**
     * Button text to keep only selected items.
     */
    isolate: string;

    /**
     * Text for aggregated legend rows past maximum.
     */
    legendOther: string;

    /**
     * Button text for next item.
     */
    nextDetail: string;

    /**
     * Button text for previous item.
     */
    previousDetail: string;

    /**
     * Button text to remove all filters.
     */
    reset: string;

    /**
     * Label preceding number of items in selection.
     */
    selectionCount: (count: number) => string;
}

/**
 * Custom Vega color scheme.
 */
export interface ColorScheme {

    /**
     * Name of the color scheme.
     */
    scheme: string;

    /**
     * Array of CSS colors.
     */
    colors: string[];
}

export interface ColorMappedItem {
    color?: VegaMorphCharts.RGBAColor;
    unSelected?: boolean;
}

/**
 * ColorMap plus an HTMLElement legend containing color.
 */
export interface ColorContext {
    colorMap: VegaMorphCharts.types.UnitColorMap;
    legendElement: HTMLElement;
    legend: VegaMorphCharts.types.Legend;
}

export interface LegendRowWithSearch extends VegaMorphCharts.types.LegendRow {
    search: SearchExpressionGroup;
}

export interface SelectionState {
    search?: Search;
    selectedData?: object[];
    active?: object;
}

export interface TooltipCreateOptions {
    dataItem: object;
    event: MouseEvent | PointerEvent | TouchEvent;
}

export interface TooltipDestroyable {
    destroy: () => void;
}

export interface TooltipOptions {
    prepareDataItem?: (dataItem: object) => object;
    create?: (props: TooltipCreateOptions) => TooltipDestroyable;
}

export type Transition = TransitionByOrdinal | TransitionByColumn | TransitionByPosition;

export type TransitionType = 'ordinal' | 'column' | 'position';

export interface TransitionBase {
    type: TransitionType;
    reverse?: boolean;
}
export interface TransitionByOrdinal extends TransitionBase {
    type: 'ordinal';
}
export interface TransitionByColumn extends TransitionBase {
    type: 'column';
    column: Column;
}

export interface TransitionByPosition extends TransitionBase {
    type: 'position';
    dimension: Dimension3D;
}

export interface Setup extends VegaMorphCharts.types.PresenterSetup {
    transition?: Transition;
}

/**
 * Saved metadata about an Insight.
 */
export interface Snapshot {
    title?: string;
    description?: string;
    insight?: Insight;
    image?: string;
    bgColor?: string;
    setup?: Setup;
}

/**
 * Visualize an Insight with a particular Setup.
 */
export interface InsightSetup {
    insight: Insight;
    setup?: Setup;
}
