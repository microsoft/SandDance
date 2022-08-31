/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { IBounds, ILayerProps, MorphChartsRenderResult, MorphChartsRef, PreStage, Stage, MorphChartsColors, PresenterConfig, LayerSelection, ILayer, ImageBounds, LayerStagger, ICubeLayer } from '../interfaces';
import { createAxesLayer } from './axes';
import { outerBounds } from './bounds';
import { createCubeLayer } from './cubes';
import { createLineLayer } from './lines';
import { createTextLayer } from './text';
import { createImageQuad, getImageData } from './image';
import { minZ } from '../defaults';
import { quat, vec3 } from 'gl-matrix';
import { colorConfig } from './color';
import { cameraDefaults } from './defaults';
import { Camera } from '@msrvida/chart-types';

export function morphChartsRender(ref: MorphChartsRef, prevStage: Stage, stage: Stage, height: number, width: number, preStage: PreStage, colors: MorphChartsColors, config: PresenterConfig): MorphChartsRenderResult {
    const { qCameraRotation2d, qCameraRotation3d, qModel2d, qModel3d, vPosition } = cameraDefaults;
    const { core, cameraTransitioner, modelTransitioner, positionTransitioner } = ref;
    let cameraTo: Camera;
    let holdCamera: boolean;
    if (config.camera === 'hold') {
        holdCamera = true;
    } else {
        cameraTo = config.camera;
    }
    if (prevStage && (prevStage.view !== stage.view)) {
        modelTransitioner.shouldTransition = !holdCamera;
        if (stage.view === '2d') {
            modelTransitioner.qModelFrom = qModel3d;
            modelTransitioner.qModelTo = qModel2d;
            cameraTransitioner.qCameraRotationTo = cameraTo?.rotation || qCameraRotation2d;
            cameraTransitioner.vCameraPositionTo = cameraTo?.position || vPosition;
        } else {
            modelTransitioner.qModelFrom = qModel2d;
            modelTransitioner.qModelTo = qModel3d;
            cameraTransitioner.qCameraRotationTo = cameraTo?.rotation || qCameraRotation3d;
            cameraTransitioner.vCameraPositionTo = cameraTo?.position || vPosition;
        }
    } else {
        modelTransitioner.shouldTransition = false;
        if (stage.view === '2d') {
            modelTransitioner.qModelTo = qModel2d;
            cameraTransitioner.qCameraRotationTo = cameraTo?.rotation || qCameraRotation2d;
            cameraTransitioner.vCameraPositionTo = cameraTo?.position || vPosition;
        } else {
            modelTransitioner.qModelTo = qModel3d;
            cameraTransitioner.qCameraRotationTo = cameraTo?.rotation || qCameraRotation3d;
            cameraTransitioner.vCameraPositionTo = cameraTo?.position || vPosition;
        }
    }
    core.camera.getOrbit(cameraTransitioner.qCameraRotationFrom);
    core.camera.getPosition(cameraTransitioner.vCameraPositionFrom);
    if (!prevStage) {
        core.setModelRotation(modelTransitioner.qModelTo, false);
        core.camera.setOrbit(cameraTransitioner.qCameraRotationTo, false);
        core.camera.setPosition(cameraTransitioner.vCameraPositionTo, false);
    } else if (!holdCamera) {
        cameraTransitioner.begin();
    }
    positionTransitioner.begin();
    if (modelTransitioner.shouldTransition) {
        modelTransitioner.begin();
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

    core.config.transitionStaggering = config.transitionDurations.stagger;
    core.config.transitionDuration = config.transitionDurations.position;

    let bounds: IBounds;
    if (axesLayer && axesLayer.bounds) {
        bounds = axesLayer.bounds;
    } else {
        bounds = contentBounds;
    }

    ref.setMorphChartsRendererOptions(config.renderer);

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

    ref.lastPresenterConfig = config;
    ref.lastView = stage.view;
    core.renderer.transitionTime = 0; // Set renderer transition time for this render pass to prevent rendering target buffer for single frame

    colorConfig(ref, colors);

    return {
        bounds,
        getCubeLayer: () => <ICubeLayer>cubeLayer,
        update: layerSelection => layersWithSelection(cubeLayer, lineLayer, textLayer, layerSelection, bounds, ref.layerStagger),
        activate: id => core.renderer.transitionBuffers[0].activeId = id,
        moveCamera: (position: vec3, rotation: quat) => {
            if (!(positionTransitioner.isTransitioning || modelTransitioner.isTransitioning)) {
                core.camera.getOrbit(cameraTransitioner.qCameraRotationFrom);
                core.camera.getPosition(cameraTransitioner.vCameraPositionFrom);
                cameraTransitioner.move(position, rotation);
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
