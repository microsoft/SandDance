/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Components, HorizontalAlignment, VerticalAlignment } from 'morphcharts';
import { IBounds, ILayer, ILayerCreator, ILayerProps, Stage } from '../interfaces';
import { increment } from './bounds';
import { ColorMap } from './color';

export const createTextLayer: ILayerCreator = (props: ILayerProps): ILayer => {
    const { ref, stage } = props;
    const { core } = ref;
    const {
        ids,
        colors,
        positionsX,
        positionsY,
        positionsZ,
        sizes,
        bounds,
        maxColor,
        maxGlyphs,
        palette,
        text,
    } = convert(stage);

    if (text.length === 0) {
        core.renderer.labelSets = [];
        return;
    }

    const options: Components.ILabelSetOptions = {
        text,
        maxGlyphs,
        scales: sizes,
    };

    const labelSet = new Components.LabelSet(core, options);
    labelSet.positionsX = positionsX;
    labelSet.positionsY = positionsY;
    labelSet.positionsZ = positionsZ;
    labelSet.horizontalAlignment = HorizontalAlignment.center;
    labelSet.verticalAlignment = VerticalAlignment.center;

    const layer: ILayer = {
        update: bounds => {
            const {
                maxBoundsX,
                maxBoundsY,
                maxBoundsZ,
                minBoundsX,
                minBoundsY,
                minBoundsZ,
            } = bounds;
            labelSet.minBoundsX = minBoundsX;
            labelSet.minBoundsY = minBoundsY;
            labelSet.minBoundsZ = minBoundsZ;
            labelSet.maxBoundsX = maxBoundsX;
            labelSet.maxBoundsY = maxBoundsY;
            labelSet.maxBoundsZ = maxBoundsZ;
        },
        bounds,
    };

    const labelSetVisual = core.renderer.createLabelSetVisual(labelSet);
    core.renderer.labelSets = [labelSetVisual];

    return layer;
};

function convert(stage: Stage) {
    const { textData } = stage;
    const { length } = textData;

    const ids: number[] = [];
    const text: string[] = [];
    const colors = new Float64Array(length);
    const positionsX = new Float64Array(length);
    const positionsY = new Float64Array(length);
    const positionsZ = new Float64Array(length);
    const sizes = new Float64Array(length);
    let bounds: IBounds;
    let maxGlyphs = 0;

    const colorMap = new ColorMap();

    textData.forEach((t, i) => {
        ids.push(i);
        text.push(t.text);
        maxGlyphs += t.text.length;
        positionsX[i] = t.position[0];
        positionsY[i] = t.position[1];
        positionsZ[i] = t.position[2];
        sizes[i] = 1.5 * t.size;    //scale similar to axes

        bounds = increment(bounds,
            t.position[0],
            t.position[1],
            t.position[2],
            t.position[0],
            t.position[1],
            t.position[2],
        );

        colors[i] = colorMap.registerColor(t.color);
    });

    const { palette, maxColor } = colorMap.getPalette();

    return {
        ids: new Uint32Array(ids),
        colors,
        positionsX,
        positionsY,
        positionsZ,
        sizes,
        bounds,
        maxColor,
        maxGlyphs,
        palette,
        text,
    };
}
