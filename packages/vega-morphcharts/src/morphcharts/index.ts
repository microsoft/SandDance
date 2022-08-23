/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Constants, Core, Helpers } from 'morphcharts';
import { IBounds, ILayerProps, MorphChartsRenderResult, MorphChartsRef, PreStage, Stage, MorphChartsColors, PresenterConfig, MorphChartsRendererOptions, LayerSelection, ILayer, ImageBounds, MorphChartsOptions, LayerStagger, ICubeLayer } from '../interfaces';
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
import { listenCanvasEvents } from './canvas';
import { colorConfig } from './color';

export { MorphChartsRef };

export function init(options: MorphChartsOptions, mcRendererOptions: MorphChartsRendererOptions) {
    const { container } = options;
    const core = new Core({ container });

    getRenderer(mcRendererOptions, core);
    listenCanvasEvents(core, options);

    core.config.pickSelectDelay = 50;

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
        isTransitioningPosition: false,
        isTransitioningModel: false,
        transitionPositionTime: 0,
        transitionModelTime: 0,
        transitionDurations: null,
        setMorphChartsRendererOptions(mcRendererOptions: MorphChartsRendererOptions) {
            if (shouldChangeRenderer(ref.lastMorphChartsRendererOptions, mcRendererOptions)) {
                getRenderer(mcRendererOptions, core);
                listenCanvasEvents(core, options);
            } else {
                if (mcRendererOptions.advanced) {
                    //same renderer, poke the config
                    setRendererOptions(core.renderer, mcRendererOptions);
                }
            }
            ref.lastMorphChartsRendererOptions = mcRendererOptions;
        },
        lastMorphChartsRendererOptions: mcRendererOptions,
        layerStagger: {},
        resetCameraWithLayout: true,
    };
    const cam = (t: number) => {
        quat.slerp(ref.qCameraRotationCurrent, ref.qCameraRotationFrom, ref.qCameraRotationTo, t);
        vec3.lerp(ref.vCameraPositionCurrent, ref.vCameraPositionFrom, ref.vCameraPositionTo, t);
        core.camera.setOrbit(ref.qCameraRotationCurrent, false);
        core.camera.setPosition(ref.vCameraPositionCurrent, false);

        // disable picking during transitions, as the performance degradation could reduce the framerate
        core.inputManager.isPickingEnabled = false;
    };
    core.updateCallback = (elapsedTime) => {
        const { transitionDurations } = ref;
        if (ref.isTransitioningPosition) {
            ref.transitionPositionTime += elapsedTime;
            const totalPositionTime = transitionDurations.position + transitionDurations.stagger;
            if (ref.transitionPositionTime >= totalPositionTime) {
                ref.isTransitioningPosition = false;
                ref.transitionPositionTime = totalPositionTime;
            }
            const tp = ref.transitionPositionTime / totalPositionTime;
            core.renderer.transitionTime = tp;
        }
        if (ref.isTransitioningModel) {
            ref.transitionModelTime += elapsedTime;
            const totalModelTime = transitionDurations.view;
            if (ref.transitionModelTime >= totalModelTime) {
                ref.isTransitioningModel = false;
                ref.transitionModelTime = totalModelTime;
            }
            const tm = easing(ref.transitionModelTime / totalModelTime);
            if (ref.transitionModel) {
                quat.slerp(ref.qModelCurrent, ref.qModelFrom, ref.qModelTo, tm);
                core.setModelRotation(ref.qModelCurrent, false);
            }
            cam(tm);
        }
        if (ref.isCameraMovement) {
            ref.cameraTime += elapsedTime;
            const totalTime = transitionDurations.view;
            if (ref.cameraTime >= totalTime) {
                ref.isCameraMovement = false;
                ref.cameraTime = totalTime;
            }
            const t = easing(ref.cameraTime / totalTime);
            cam(t);
        } else {
            core.inputManager.isPickingEnabled = true;
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


export function morphChartsRender(ref: MorphChartsRef, prevStage: Stage, stage: Stage, height: number, width: number, preStage: PreStage, colors: MorphChartsColors, config: PresenterConfig): MorphChartsRenderResult {
    const cameraTo = config.camera;
    if (prevStage && (prevStage.view !== stage.view)) {
        ref.transitionModel = ref.resetCameraWithLayout;
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
        ref.transitionModel = false;
        if (stage.view === '2d') {
            ref.qModelTo = qModel2d;
            ref.qCameraRotationTo = cameraTo?.rotation || qCameraRotation2d;
            ref.vCameraPositionTo = cameraTo?.position || vPosition;
        } else {
            ref.qModelTo = qModel3d;
            ref.qCameraRotationTo = cameraTo?.rotation || qCameraRotation3d;
            ref.vCameraPositionTo = cameraTo?.position || vPosition;
        }
    }
    ref.core.camera.getOrbit(ref.qCameraRotationFrom);
    ref.core.camera.getPosition(ref.vCameraPositionFrom);
    if (!prevStage) {
        ref.core.setModelRotation(ref.qModelTo, false);
        ref.core.camera.setOrbit(ref.qCameraRotationTo, false);
        ref.core.camera.setPosition(ref.vCameraPositionTo, false);
    } else if (ref.resetCameraWithLayout) {
        ref.isTransitioningPosition = true;
        ref.isCameraMovement = true;
        ref.cameraTime = 0;
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

    if (preStage) {
        preStage(stage, <ICubeLayer>cubeLayer);
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
    layersWithSelection(cubeLayer, lineLayer, textLayer, config.layerSelection, bounds, ref.layerStagger);

    ref.isTransitioningPosition = true;
    ref.transitionPositionTime = 0;
    ref.isTransitioningModel = ref.transitionModel;
    ref.transitionModelTime = 0;
    ref.transitionDurations = config.transitionDurations;
    core.renderer.transitionTime = 0; // Set renderer transition time for this render pass to prevent rendering target buffer for single frame

    colorConfig(ref, colors);

    return {
        bounds,
        getCubeLayer: () => <ICubeLayer>cubeLayer,
        update: layerSelection => layersWithSelection(cubeLayer, lineLayer, textLayer, layerSelection, bounds, ref.layerStagger),
        activate: id => core.renderer.transitionBuffers[0].activeId = id,
        moveCamera: (position: vec3, rotation: quat) => {
            if (!(ref.isTransitioningPosition || ref.isTransitioningModel)) {
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

function layersWithSelection(cubeLayer: ILayer, lineLayer: ILayer, textLayer: ILayer, layerSelection: LayerSelection, bounds: IBounds, layerStagger: LayerStagger) {
    const layerItems = [
        {
            layer: cubeLayer,
            selection: layerSelection?.cubes,
            stagger: layerStagger?.cubes,
        },
        {
            layer: lineLayer,
            selection: layerSelection?.lines,
            stagger: layerStagger?.lines,
        },
        {
            layer: textLayer,
            selection: layerSelection?.texts,
            stagger: layerStagger?.texts,
        },
    ];
    layerItems.forEach(layerItem => layerItem.layer?.update(bounds, layerItem.selection, layerItem.stagger));
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
