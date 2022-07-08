/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Layouts, UnitType } from 'morphcharts';
import { IBounds, ILayer, ILayerCreator, ILayerProps, Stage } from '../interfaces';
import { increment } from './bounds';
import { ColorMap } from './color';

const key = 'cube';

export const createCubeLayer: ILayerCreator = (props: ILayerProps): ILayer => {
    const { ref, stage } = props;
    const { core } = ref;
    const scatter = new Layouts.Scatter(core);
    const {
        ids,
        colors,
        positionsX,
        positionsY,
        positionsZ,
        sizesX,
        sizesY,
        sizesZ,
        bounds,
        maxColor,
        palette,
    } = convert(stage);

    if (!ids.length) return;

    const { renderer } = core;

    let cubeTransitionBuffer = renderer.transitionBuffers.find(t => t.key === key);
    if (!cubeTransitionBuffer) {
        cubeTransitionBuffer = renderer.createTransitionBuffer(ids);
        cubeTransitionBuffer.key = key;
        renderer.transitionBuffers.push(cubeTransitionBuffer);
    } else {
        cubeTransitionBuffer.swap();
    }

    scatter.layout(cubeTransitionBuffer.currentBuffer, ids, {
        positionsX,
        positionsY,
        positionsZ,
    });

    const layer: ILayer = {
        update: (newBounds, selected) => {
            const { colors, maxColor, minColor, palette } = layer.unitColorMap;

            // reference off of core.renderer to get the actual buffer
            const currCubeTransitionBuffer = core.renderer.transitionBuffers.find(t => t.key === key);
            currCubeTransitionBuffer.currentBuffer.unitType = UnitType.block;
            currCubeTransitionBuffer.currentPalette.colors = palette;

            scatter.update(currCubeTransitionBuffer.currentBuffer, ids, {
                selected,
                colors,
                minColor,
                maxColor,
                sizesX,
                sizesY,
                sizesZ,
                ...newBounds,
            });
        },
        bounds,
        unitColorMap: {
            colors,
            ids,
            minColor: 0,
            maxColor,
            palette,
        },
    };

    return layer;
};

function convert(stage: Stage) {
    const { cubeData } = stage;
    const { length } = cubeData;

    const ids: number[] = [];
    const colors = new Float64Array(length);
    const positionsX = new Float64Array(length);
    const positionsY = new Float64Array(length);
    const positionsZ = new Float64Array(length);
    const sizesX = new Float64Array(length);
    const sizesY = new Float64Array(length);
    const sizesZ = new Float64Array(length);
    let bounds: IBounds;

    const colorMap = new ColorMap();

    cubeData.forEach((cube, i) => {
        ids.push(i);
        if (cube.isEmpty) {
            positionsX[i] = 0;
            positionsY[i] = 0;
            positionsZ[i] = 0;
            sizesX[i] = 0;
            sizesY[i] = 0;
            sizesZ[i] = 0;
            colors[i] = 0;
        } else {
            //ids.push(cube.ordinal);
            positionsX[i] = cube.position[0] + cube.size[0] * 0.5;
            positionsY[i] = cube.position[1] + cube.size[1] * 0.5;
            positionsZ[i] = cube.position[2] + cube.size[2] * 0.5;
            sizesX[i] = cube.size[0];
            sizesY[i] = cube.size[1];
            sizesZ[i] = cube.size[2];

            bounds = increment(bounds,
                cube.position[0],
                cube.position[1],
                cube.position[2],
                cube.position[0] + cube.size[0],
                cube.position[1] + cube.size[1],
                cube.position[2] + cube.size[2],
            );

            colors[i] = colorMap.registerColor(cube.color);
        }
    });

    const { palette, maxColor } = colorMap.getPalette();

    return {
        ids: new Uint32Array(ids),
        colors,
        positionsX,
        positionsY,
        positionsZ,
        sizesX,
        sizesY,
        sizesZ,
        bounds,
        maxColor,
        palette,
    };
}
