// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from './base';
import { ChromaticTextLayer, ChromaticTextLayerProps } from './chromatic-text-layer/chromatic-text-layer';
import { Color } from '@deck.gl/core/utils/color';
import { concat } from './array';
import { DeckProps } from '@deck.gl/core/lib/deck';
import { easeExpInOut } from 'd3-ease';
import { Layer } from 'deck.gl';
import { layerNames } from './constants';
import { LayerProps, TransitionTiming } from '@deck.gl/core/lib/layer';
import { LinearInterpolator_Class } from './deck.gl-classes/linearInterpolator';
import { Presenter } from './presenter';
import {
    PresenterConfig,
    Shape,
    Stage,
    StyledLine
} from './interfaces';
import { ShapeLayer, ShapeLayerProps } from './shape-layer/shape-layer';
import { TextLayerDatum } from '@deck.gl/layers/text-layer/text-layer';
import { SolidPolygonLayerProps } from '@deck.gl/layers/solid-polygon-layer/solid-polygon-layer';

export function getLayers(
    presenter: Presenter,
    config: PresenterConfig,
    stage: Stage,
    guideLines: StyledLine[]
): Layer[] {
    const shapeLayer = newShapeLayer(presenter, config, stage.shapeData, presenter.style.highlightColor);
    const { x, y } = stage.axes;
    const lines = concat(stage.gridLines, guideLines);
    const texts = [...stage.textData];
    [x, y].forEach(axes => {
        axes.forEach(axis => {
            if (axis.domain) lines.push(axis.domain);
            if (axis.ticks) lines.push.apply(lines, axis.ticks);
            if (axis.tickText) texts.push.apply(texts, axis.tickText);
            if (axis.title) texts.push(axis.title);
        });
    });
    if (stage.facets) {
        stage.facets.forEach(f => {
            if (f.lines) lines.push.apply(lines, f.lines);
            if (f.facetTitle) texts.push(f.facetTitle);
        });
    }
    const lineLayer = newLineLayer(layerNames.lines, lines);
    const textLayer = newTextLayer(presenter, layerNames.text, texts, config, presenter.style.fontFamily);
    return [textLayer, shapeLayer, lineLayer];
}

function newShapeLayer(presenter: Presenter, config: PresenterConfig, shapeData: Shape[], highlightColor: Color) {
    const getPolygon = getTiming(config.transitionDurations.polygon, easeExpInOut);
    const getColor = getTiming(config.transitionDurations.color);
    const shapeLayerProps: LayerProps & SolidPolygonLayerProps = {
        id: layerNames.shapes,
        data: shapeData,
        coordinateSystem: base.deck.COORDINATE_SYSTEM.IDENTITY,
        pickable: true,
        autoHighlight: true,
        highlightColor,
        onClick: (o, e) => {
            config.onShapeClick(e && e.srcEvent, o.object as Shape);
        },
        onHover: (o, e) => {
            if (o.index === -1) {
                presenter.deckgl.interactiveState.onShape = false;
                config.onShapeHover(e && e.srcEvent, null);
            } else {
                presenter.deckgl.interactiveState.onShape = true;
                config.onShapeHover(e && e.srcEvent, o.object as Shape);
            }
        },
        getFillColor: (d: Shape) => d.color,
        getPolygon: d => d.polygon,
        getElevation: (d: Shape) => d.depth,
        filled: true,
        extruded: true,
        transitions: {
            getPolygon,
            getElevation: getPolygon,
            getColor
        }
    };
    return new base.layers.SolidPolygonLayer(shapeLayerProps);
}

function newLineLayer(id: string, data: StyledLine[]) {
    return new base.layers.LineLayer({
        id,
        data,
        coordinateSystem: base.deck.COORDINATE_SYSTEM.IDENTITY,
        getColor: (o: StyledLine) => o.color,
        getStrokeWidth: (o: StyledLine) => o.strokeWidth
    });
}

function newTextLayer(presenter: Presenter, id: string, data: TextLayerDatum[], config: PresenterConfig, fontFamily: string) {
    const props: LayerProps & ChromaticTextLayerProps = {
        id,
        data,
        coordinateSystem: base.deck.COORDINATE_SYSTEM.IDENTITY,
        autoHighlight: true,
        pickable: true,
        getHighlightColor: config.getTextHighlightColor || (o => o.color),
        onClick: (o, e) => {
            let pe: Partial<PointerEvent> = e && e.srcEvent;
            //handle iOS event
            if (e.center) {
                pe = { clientX: e.center.x, clientY: e.center.y };
            }
            config.onTextClick && config.onTextClick(pe as PointerEvent, o.object as TextLayerDatum);
        },
        onHover: (o, e) => {
            if (o.index === -1) {
                presenter.deckgl.interactiveState.onText = false;
            } else {
                presenter.deckgl.interactiveState.onText = config.onTextHover ? config.onTextHover(e && e.srcEvent, o.object as TextLayerDatum) : true;
            }
        },
        getColor: config.getTextColor || (o => o.color),
        getTextAnchor: o => o.textAnchor,
        getSize: o => o.size,
        getAngle: o => o.angle,
        fontSettings: {
            sdf: true,
            fontSize: 128
        }
    };
    if (fontFamily) {
        props.fontFamily = fontFamily;
    }
    return new ChromaticTextLayer(props);
}

function getTiming(duration: number, easing?: (t: number) => number) {
    let timing: TransitionTiming;
    if (duration) {
        timing = {
            duration
        };
        if (easing) {
            timing.easing = easing;
        }
    }
    return timing;
}

export function getShapeLayer(deckProps: DeckProps) {
    return deckProps.layers.filter(layer => layer.id === layerNames.shapes)[0];
}

export function getShapes(deckProps: DeckProps) {
    const shapeLayer = getShapeLayer(deckProps);
    if (!shapeLayer) return;
    const shapeLayerProps = shapeLayer.props as ShapeLayerProps;
    return shapeLayerProps.data;
}
