// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from './base';
import { ChromaticTextLayer, ChromaticTextLayerProps } from './chromatic-text-layer/chromatic-text-layer';
import { Color } from '@deck.gl/core/utils/color';
import { concat } from './array';
import {
    Cube,
    PresenterConfig,
    Stage,
    StyledLine
} from './interfaces';
import { CubeLayer, CubeLayerInterpolatedProps, CubeLayerProps } from './cube-layer/cube-layer';
import { DeckProps } from '@deck.gl/core/lib/deck';
import { easeExpInOut } from 'd3-ease';
import { Layer } from 'deck.gl';
import { layerNames } from './constants';
import { LayerProps, LightSettings, TransitionTiming } from '@deck.gl/core/lib/layer';
import { LinearInterpolator_Class } from './deck.gl-classes/linearInterpolator';
import { Presenter } from './presenter';
import { TextLayerDatum } from '@deck.gl/layers/text-layer/text-layer';

export function getLayers(
    presenter: Presenter,
    config: PresenterConfig,
    stage: Stage,
    lightSettings: LightSettings,
    lightingMix: number,
    interpolator: LinearInterpolator_Class<CubeLayerInterpolatedProps>,
    guideLines: StyledLine[]
): Layer[] {
    const cubeLayer = newCubeLayer(presenter, config, stage.cubeData, presenter.style.highlightColor, lightSettings, lightingMix, interpolator);
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
    return [textLayer, cubeLayer, lineLayer];
}

function newCubeLayer(presenter: Presenter, config: PresenterConfig, cubeData: Cube[], highlightColor: Color, lightSettings: LightSettings, lightingMix: number, interpolator?: LinearInterpolator_Class<CubeLayerInterpolatedProps>) {
    const getPosition = getTiming(config.transitionDurations.position, easeExpInOut);
    const getSize = getTiming(config.transitionDurations.size, easeExpInOut);
    const getColor = getTiming(config.transitionDurations.color);
    const cubeLayerProps: CubeLayerProps = {
        interpolator,
        lightingMix,
        id: layerNames.cubes,
        data: cubeData,
        coordinateSystem: base.deck.COORDINATE_SYSTEM.IDENTITY,
        pickable: true,
        autoHighlight: true,
        highlightColor,
        onClick: (o, e) => {
            config.onCubeClick(e && e.srcEvent, o.object as Cube);
        },
        onHover: (o, e) => {
            if (o.index === -1) {
                presenter.deckgl.interactiveState.onCube = false;
                config.onCubeHover(e && e.srcEvent, null);
            } else {
                presenter.deckgl.interactiveState.onCube = true;
                config.onCubeHover(e && e.srcEvent, o.object as Cube);
            }
        },
        lightSettings,
        transitions: {
            getPosition,
            getColor,
            getSize
        }
    };
    return new CubeLayer(cubeLayerProps);
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

export function getCubeLayer(deckProps: DeckProps) {
    return deckProps.layers.filter(layer => layer.id === layerNames.cubes)[0];
}

export function getCubes(deckProps: DeckProps) {
    const cubeLayer = getCubeLayer(deckProps);
    if (!cubeLayer) return;
    const cubeLayerProps = cubeLayer.props as CubeLayerProps;
    return cubeLayerProps.data;
}
