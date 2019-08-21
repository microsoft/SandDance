// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Color } from '@deck.gl/core/utils/color';
import { DeckProps, PickInfo } from '@deck.gl/core/lib/deck';
import { LightSettings } from '@deck.gl/core/lib/layer';
import { LineLayerDatum } from '@deck.gl/layers/line-layer/line-layer';
import { Scene } from 'vega-typings';
import { TextLayerDatum } from '@deck.gl/layers/text-layer/text-layer';

export interface StyledLine extends LineLayerDatum {
    strokeWidth?: number;
}

export interface TickText extends TextLayerDatum {
    value: number | string;
}

export interface Axis {
    domain: StyledLine;
    ticks: StyledLine[];
    tickText: TickText[];
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

    color: Color;
    position: Vec3;
    size: Vec3;
}

/**
 * Types of camera views.
 */
export type View = '2d' | '3d';

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
    facetTitle?: TextLayerDatum;
    lines: StyledLine[];
}

/**
 * Data structure containing all that is necessary to present a chart.
 */
export interface Stage {
    backgroundColor?: Color;
    cubeData: Cube[];
    legend?: Legend;
    axes: {
        x: Axis[];
        y: Axis[];
    };
    textData?: TextLayerDatum[];
    clickableTextData?: TextLayerDatum[];
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
    (stage: Stage, deckProps: DeckProps): void;
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
    onTextClick?: (e: MouseEvent | PointerEvent | TouchEvent, text: TextLayerDatum) => void;
    onLayerClick?: (info: PickInfo, pickedInfos: PickInfo[], e: MouseEvent) => any;
    onLegendClick?: (e: MouseEvent | PointerEvent | TouchEvent, legend: Legend, clickedIndex: number) => void;
    onPresent?: () => void;
    shouldViewstateTransition?: () => boolean;
}

/**
 * Style options to be used by the Presenter.
 */
export interface PresenterStyle {

    /**
     * Prefix of CSS class names.
     */
    cssPrefix?: string;

    /**
     * Default color of cubes.
     */
    defaultCubeColor: Color;

    /**
     * Highlight color of cubes.
     */
    highlightColor?: Color;

    /**
     * Light settings per camera view.
     */
    lightSettings?: { [view in View]: LightSettings };

    /**
     * Highlight color of clickable text.
     */
    textHighlightColor?: Color;
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
