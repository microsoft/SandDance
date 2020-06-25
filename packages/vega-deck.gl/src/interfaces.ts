// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DeckProps, PickInfo } from '@deck.gl/core/lib/deck';
import { RGBAColor } from '@deck.gl/core/utils/color';
import { Position } from '@deck.gl/core/utils/positions';
import { AlignmentBaseline, TextAnchor } from '@deck.gl/layers/text-layer/text-layer';
import { View } from '@msrvida/chart-types';
import { Scene } from 'vega-typings';
//import { LightSettings } from '@deck.gl/core/lib/layer';

export interface VegaTextLayerDatum {
    color: RGBAColor;
    text: string;
    position: Position;
    size: number;
    angle?: number;
    textAnchor?: TextAnchor;
    alignmentBaseline?: AlignmentBaseline;
    metaData?: any;
}

export interface StyledLine {
    color?: RGBAColor;
    sourcePosition: Vec3;
    strokeWidth?: number;
    targetPosition: Vec3;
}

export interface TickText extends VegaTextLayerDatum {
    value: number | string;
}

export interface Axis {
    domain: StyledLine;
    ticks: StyledLine[];
    tickText: TickText[];
    title?: VegaTextLayerDatum;
}

/**
 * 3 dimensional array of numbers.
 */
export type Vec3 = [number, number, number];

/**
 * Cuboid information. The cube does not need to have equal dimensions.
 */
export interface Cube {

    /**
     * Ordinal position.
     */
    ordinal?: number;

    /**
     * Flag whether this cube is a "placeholder" and is not to be rendered nor contains cube data.
     */
    isEmpty?: boolean;

    color: RGBAColor;
    position: Vec3;
    size: Vec3;
}

/**
 * Vega Scene plus camera type.
 */
export interface Scene3d extends Scene {
    view: View;
}

/**
 * Rect area and title for a facet.
 */
export interface FacetRect {
    datum: any;
    lines: StyledLine[];
}

/**
 * Data structure containing all that is necessary to present a chart.
 */
export interface Stage {
    backgroundColor?: RGBAColor;
    cubeData: Cube[];
    legend?: Legend;
    axes: {
        x: Axis[];
        y: Axis[];
    };
    textData: VegaTextLayerDatum[];
    view: View;
    gridLines?: StyledLine[];
    facets?: FacetRect[];
}

export interface Legend {
    title?: string;
    rows: { [index: number]: LegendRow };
}

export interface LegendRow {
    label?: string;
    value?: string;
    symbol?: LegendRowSymbol;
}

export interface LegendRowSymbol {
    bounds: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    };
    fill: string;
    shape: string;
}

/**
 * Function that can be called prior to presenting the stage.
 */
export interface PreStage {
    (stage: Stage, deckProps: Partial<DeckProps>): void;
}

/**
 * Lengths of time for a transition animation.
 */
export interface TransitionDurations {
    color?: number;
    position?: number;
    size?: number;
    view?: number;
}

/**
 * Configuration options to be used by the Presenter.
 */
export interface PresenterConfig {
    transitionDurations?: TransitionDurations;
    preStage?: PreStage;
    redraw?: () => void;
    onCubeHover?: (e: MouseEvent | PointerEvent | TouchEvent, cube: Cube) => void;
    onCubeClick?: (e: MouseEvent | PointerEvent | TouchEvent, cube: Cube) => void;
    onLayerClick?: (info: PickInfo<any>, e: MouseEvent) => any;
    onLegendClick?: (e: MouseEvent | PointerEvent | TouchEvent, legend: Legend, clickedIndex: number) => void;
    onPresent?: () => void;
    shouldViewstateTransition?: () => boolean;
    preLayer?: (stage: Stage) => void;
    onTextClick?: (e: MouseEvent | PointerEvent | TouchEvent, t: VegaTextLayerDatum) => void;
    onTextHover?: (e: MouseEvent | PointerEvent | TouchEvent, t: VegaTextLayerDatum) => boolean;
    getTextColor?: (o: VegaTextLayerDatum) => RGBAColor;
    getTextHighlightColor?: (o: VegaTextLayerDatum) => RGBAColor;
    onSceneRectAssignCubeOrdinal?: (d: object) => number | undefined;
    onTargetViewState?: (height: number, width: number) => { height: number, width: number, newViewStateTarget?: boolean };
    preserveDrawingBuffer?: boolean;
}

export interface PresenterStyle {
    cssPrefix?: string;
    defaultCubeColor?: RGBAColor;
    highlightColor?: RGBAColor;
    //    lightSettings?: { [view in View]: LightSettings };
    fontFamily?: string;
}

/**
 * Options to pass to Presenter.queueAnimation()
 */
export interface QueuedAnimationOptions {

    /**
     * Debug label to observe which animation is waiting.
     */
    waitingLabel?: string;

    /**
     * Debug label to observe which handler is invoked.
     */
    handlerLabel?: string;

    /**
     * Function to invoke if animation was interrupted when another animation is queued.
     */
    animationCanceled?: () => void;
}
