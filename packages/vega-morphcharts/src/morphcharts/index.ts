/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Constants, Core, Helpers, Input, SingleTouchAction } from 'morphcharts';
import { colorFromString } from '../color';
import { MorphChartsColorMapper, UnitColorMap } from '../exports/types';
import { IBounds, ILayerProps, MorphChartsRendering, MorphChartsRef, PreStage, Stage, McColor, McColors, PresenterConfig, McRendererOptions, LayerSelection, ILayer, ImageBounds } from '../interfaces';
import { createAxesLayer } from './axes';
import { outerBounds } from './bounds';
import { createCubeLayer } from './cubes';
import { createLineLayer } from './lines';
import { getRenderer, rendererEnabled, setRendererOptions, shouldChangeRenderer } from './renderer';
import { createTextLayer } from './text';
import { quat } from 'gl-matrix';
import { easing } from '../easing';
import { createImageQuad, getImageData } from './image';
import { minZ } from '../defaults';
import { vec3 } from 'gl-matrix';

export { MorphChartsRef };

export interface McOptions {
    container: HTMLElement;
    pickGridCallback: (divisions: number[], e: MouseEvent | PointerEvent | TouchEvent) => void;
    onCubeHover: (e: MouseEvent, id: number) => void;
    onCubeClick: (e: MouseEvent, id: number) => void;
    onCanvasClick: (e: MouseEvent) => void;
    onLasso: (ids: Set<number>, e: MouseEvent | PointerEvent | TouchEvent) => void;
}

export function init(options: McOptions, mcRendererOptions: McRendererOptions) {
    const { container, pickGridCallback } = options;
    const core = new Core({ container });

    getRenderer(mcRendererOptions, core);

    core.config.pickSelectDelay = 50;
    const { inputManager } = core;
    inputManager.pickAxesGridCallback = ({ divisionX, divisionY, divisionZ, manipulator }) => {
        clearClickTimeout();
        const { altKey, button, shiftKey } = manipulator;
        const me = { altKey, shiftKey, button } as MouseEvent;
        const e: MouseEvent | PointerEvent | TouchEvent = me;
        pickGridCallback([divisionX, divisionY, divisionZ], e);
    };

    inputManager.pickLassoCallback = result => {
        options.onLasso(result.ids[0], result.manipulator.event as MouseEvent);
    };

    const rightButton = 2;
    inputManager.singleTouchAction = manipulator => {
        if (manipulator.button == rightButton || manipulator.shiftKey || manipulator.ctrlKey) {
            return SingleTouchAction.rotate;
        }
        else if (manipulator.altKey) {
            return SingleTouchAction.lasso;
        }
        else {
            return SingleTouchAction.translate;
        }
    };

    //synthesize a hover event
    const canvas = container.getElementsByTagName('canvas')[0];
    let pickedId: number;
    const hover = (e: MouseEvent) => {
        if (core.renderer.pickedId !== pickedId) {
            pickedId = core.renderer.pickedId;
            const ordinal = core.renderer.transitionBuffers[0].pickIdLookup[pickedId];
            options.onCubeHover(e, ordinal);
        }
    };
    canvas.addEventListener('mousemove', (e) => {
        clearClickTimeout();
        if (mousedown) {
            options.onCubeHover(e, null);
        }
        hover(e);
    });
    canvas.addEventListener('mouseout', hover);
    canvas.addEventListener('mouseover', hover);

    let mousedown: boolean;
    canvas.addEventListener('mousedown', (e) => {
        mousedown = true;
    });
    canvas.addEventListener('mouseup', (e) => {
        mousedown = false;
    });

    let canvasClickTimeout: NodeJS.Timeout;
    const clearClickTimeout = () => {
        clearTimeout(canvasClickTimeout);
        canvasClickTimeout = null;
    };
    canvas.addEventListener('click', (e) => {
        canvasClickTimeout = setTimeout(() => {
            options.onCanvasClick(e);
        }, 50);
    });

    inputManager.pickItemCallback = ({ manipulator }) => {
        clearClickTimeout();
        const ordinal = core.renderer.transitionBuffers[0].pickIdLookup[pickedId];
        options.onCubeClick(manipulator.event as MouseEvent, ordinal);
    };

    const ref: MorphChartsRef = {
        supportedRenders: {
            advanced: rendererEnabled(true),
            basic: rendererEnabled(false),
        },
        reset: () => {
            core.reset(true);
            quat.slerp(ref.qModelCurrent, ref.qModelTo, ref.qModelTo, 0);
            core.setModelRotation(ref.qModelCurrent, true);
            core.camera.setOrbit(ref.qCameraRotationTo, false);
            //core.camera.setPosition(ref.vCameraPositionTo, false);
        },
        transitionModel: false,
        qModelFrom: null,
        qModelTo: null,
        qModelCurrent: quat.create(),
        qCameraRotationFrom: quat.create(),
        qCameraRotationTo: null,
        qCameraRotationCurrent: quat.create(),
        vCameraPositionFrom: vec3.create(),
        vCameraPositionTo: null,
        vCameraPositionCurrent: vec3.create(),
        core,
        cameraTime: 0,
        isCameraMovement: false,
        isTransitioning: false,
        transitionTime: 0,
        setMcRendererOptions(mcRendererOptions: McRendererOptions) {
            if (shouldChangeRenderer(ref.lastMcRendererOptions, mcRendererOptions)) {
                getRenderer(mcRendererOptions, core);
            } else {
                if (mcRendererOptions.advanced) {
                    //same renderer, poke the config
                    setRendererOptions(core.renderer, mcRendererOptions);
                }
            }
            ref.lastMcRendererOptions = mcRendererOptions;
        },
        lastMcRendererOptions: mcRendererOptions,
    };
    const cam = (t: number) => {
        quat.slerp(ref.qCameraRotationCurrent, ref.qCameraRotationFrom, ref.qCameraRotationTo, t);
        vec3.lerp(ref.vCameraPositionCurrent, ref.vCameraPositionFrom, ref.vCameraPositionTo, t);
        core.camera.setOrbit(ref.qCameraRotationCurrent, false);
        core.camera.setPosition(ref.vCameraPositionCurrent, false);

        // disable picking during transitions, as the performance degradation could reduce the framerate
        inputManager.isPickingEnabled = false;
    };
    core.updateCallback = (elapsedTime) => {
        if (ref.isTransitioning) {
            ref.transitionTime += elapsedTime;
            const totalTime = core.config.transitionDuration + core.config.transitionStaggering;
            if (ref.transitionTime >= totalTime) {
                ref.isTransitioning = false;
                ref.transitionTime = totalTime;
            }
            const t = easing(ref.transitionTime / totalTime);
            core.renderer.transitionTime = t;
            if (ref.transitionModel) {
                quat.slerp(ref.qModelCurrent, ref.qModelFrom, ref.qModelTo, t);
                core.setModelRotation(ref.qModelCurrent, false);
            }
            cam(t);
        } else if (ref.isCameraMovement) {
            ref.cameraTime += elapsedTime;
            const totalTime = core.config.transitionDuration;
            if (ref.cameraTime >= totalTime) {
                ref.isCameraMovement = false;
                ref.cameraTime = totalTime;
            }
            const t = easing(ref.cameraTime / totalTime);
            cam(t);
        } else {
            inputManager.isPickingEnabled = true;
        }
    };
    return ref;
}

const qModel2d = quat.create();
const qModel3d = Constants.QUAT_ROTATEX_MINUS_90;
const qCameraRotation2d = quat.create();
const qCameraRotation3d = quat.create();
const qAngle = quat.create();
const vPosition = vec3.create();

// Altitude (pitch around local right axis)
quat.setAxisAngle(qCameraRotation3d, Constants.VECTOR3_UNITX, Helpers.AngleHelper.degreesToRadians(30));

// Azimuth (yaw around global up axis)
quat.setAxisAngle(qAngle, Constants.VECTOR3_UNITY, Helpers.AngleHelper.degreesToRadians(-25));
quat.multiply(qCameraRotation3d, qCameraRotation3d, qAngle);


export function mcRender(ref: MorphChartsRef, prevStage: Stage, stage: Stage, height: number, width: number, preStage: PreStage, colors: McColors, config: PresenterConfig): MorphChartsRendering {
    const cameraTo = config.getCameraTo && config.getCameraTo();
    if (prevStage && (prevStage.view !== stage.view)) {
        ref.transitionModel = true;
        if (stage.view === '2d') {
            ref.qModelFrom = qModel3d;
            ref.qModelTo = qModel2d;
            ref.qCameraRotationTo = cameraTo?.rotation || qCameraRotation2d;
            ref.vCameraPositionTo = cameraTo?.position || vPosition;
        } else {
            ref.qModelFrom = qModel2d;
            ref.qModelTo = qModel3d;
            ref.qCameraRotationTo = cameraTo?.rotation || qCameraRotation3d;
            ref.vCameraPositionTo = cameraTo?.position || vPosition;
        }
    } else {
        if (stage.view === '2d') {
            ref.qModelTo = qModel2d;
            ref.qCameraRotationTo = cameraTo?.rotation || qCameraRotation2d;
            ref.vCameraPositionTo = cameraTo?.position || vPosition;
        } else {
            ref.qModelTo = qModel3d;
            ref.qCameraRotationTo = cameraTo?.rotation || qCameraRotation3d;
            ref.vCameraPositionTo = cameraTo?.position || vPosition;
        }
        ref.transitionModel = false;
    }
    ref.core.camera.getOrbit(ref.qCameraRotationFrom);
    ref.core.camera.getPosition(ref.vCameraPositionFrom);
    if (!prevStage) {
        ref.core.setModelRotation(ref.qModelTo, false);
        ref.core.camera.setOrbit(ref.qCameraRotationTo, false);
        ref.core.camera.setPosition(ref.vCameraPositionTo, false);
    }

    const props: ILayerProps = { ref, stage, height, width, config };
    const cubeLayer = createCubeLayer(props);
    const lineLayer = createLineLayer(props);
    const textLayer = createTextLayer(props);
    const { backgroundImages } = stage;

    let contentBounds = outerBounds(
        outerBounds(cubeLayer?.bounds, lineLayer?.bounds),
        outerBounds(textLayer?.bounds, null),
    );

    backgroundImages?.forEach(backgroundImage => {
        contentBounds = outerBounds(contentBounds, convertBounds(backgroundImage.bounds));
    });

    props.bounds = contentBounds;

    const axesLayer = createAxesLayer(props);

    const { core } = ref;
    core.config.transitionStaggering = config.transitionDurations.stagger;
    core.config.transitionDuration = config.transitionDurations.position;

    let bounds: IBounds;
    if (axesLayer && axesLayer.bounds) {
        bounds = axesLayer.bounds;
    } else {
        bounds = contentBounds;
    }

    const colorMapper: MorphChartsColorMapper = {
        getCubeUnitColorMap: () => cubeLayer.unitColorMap,
        setCubeUnitColorMap: (unitColorMap: UnitColorMap) => {
            cubeLayer.unitColorMap = unitColorMap;
        },
    };

    if (preStage) {
        preStage(stage, colorMapper);
    }

    //add images
    core.renderer.images = [];
    if (backgroundImages) {
        const addImage = (imageBounds: IBounds, imageData: ImageData) => {
            const imageWidth = imageBounds.maxBoundsX - imageBounds.minBoundsX;
            const imageHeight = imageBounds.maxBoundsY - imageBounds.minBoundsY;
            const position: vec3 = [imageBounds.minBoundsX + imageWidth / 2, imageBounds.minBoundsY + imageHeight / 2, 0];
            const imageQuad = createImageQuad(core, imageData, contentBounds, position, imageWidth, imageHeight);
            const imageVisual = core.renderer.createImageVisual(imageQuad);
            core.renderer.images.push(imageVisual);
        };
        const imageDataCache: { [key: string]: ImageData } = {};
        backgroundImages.forEach(backgroundImage => {
            const imageBounds = convertBounds(backgroundImage.bounds);
            const imageData = imageDataCache[backgroundImage.url];
            if (imageData) {
                addImage(imageBounds, imageData);
            } else {
                getImageData(backgroundImage.url).then(imageData => {
                    imageDataCache[backgroundImage.url] = imageData;
                    addImage(imageBounds, imageData);
                });
            }
        });
    }

    //Now call update on each layout
    layersWithSelection(cubeLayer, lineLayer, textLayer, config.layerSelection, bounds);

    ref.isTransitioning = true;
    ref.transitionTime = 0;
    core.renderer.transitionTime = 0; // Set renderer transition time for this render pass to prevent rendering target buffer for single frame

    colorConfig(ref, colors);

    return {
        ...colorMapper,
        update: layerSelection => layersWithSelection(cubeLayer, lineLayer, textLayer, layerSelection, bounds),
        activate: id => core.renderer.transitionBuffers[0].activeId = id,
        moveCamera: (position: vec3, rotation: quat) => {
            if (!ref.isTransitioning) {
                ref.core.camera.getOrbit(ref.qCameraRotationFrom);
                ref.core.camera.getPosition(ref.vCameraPositionFrom);
                ref.isCameraMovement = true;
                ref.cameraTime = 0;
                ref.qCameraRotationTo = rotation;
                ref.vCameraPositionTo = position;
            }
        },
    };
}

function layersWithSelection(cubeLayer: ILayer, lineLayer: ILayer, textLayer: ILayer, layerSelection: LayerSelection, bounds: IBounds) {
    const layers = [
        {
            layer: cubeLayer,
            selection: layerSelection?.cubes,
        },
        {
            layer: lineLayer,
            selection: layerSelection?.lines,
        },
        {
            layer: textLayer,
            selection: layerSelection?.texts,
        },
    ];
    layers.forEach(x => x.layer?.update(bounds, x.selection));
}

function convert(newColor: string): McColor {
    const c = colorFromString(newColor).slice(0, 3);
    return c.map(v => v / 255) as McColor;
}

export function colorConfig(ref: MorphChartsRef, colors: McColors) {
    if (!colors) return;
    const { config } = ref.core;
    config.activeColor = convert(colors.activeItemColor);
    config.backgroundColor = convert(colors.backgroundColor);
    config.textColor = convert(colors.textColor);
    config.textBorderColor = convert(colors.textBorderColor);
    config.axesTextColor = convert(colors.axesTextLabelColor);
    config.axesGridBackgroundColor = convert(colors.axesGridBackgroundColor);
    config.axesGridHighlightColor = convert(colors.axesGridHighlightColor);
    config.axesGridMinorColor = convert(colors.axesGridMinorColor);
    config.axesGridMajorColor = convert(colors.axesGridMajorColor);
    config.axesGridZeroColor = convert(colors.axesGridZeroColor);

    //TODO fix this - hack to reset the background color
    ref.core.renderer['_theme'] = null;
}

function convertBounds(bounds: ImageBounds): IBounds {
    if (!bounds) return;
    return {
        minBoundsX: bounds.x1,
        maxBoundsX: bounds.x2,
        minBoundsY: -bounds.y2,
        maxBoundsY: -bounds.y1,
        minBoundsZ: minZ,
        maxBoundsZ: minZ,
    };
}
