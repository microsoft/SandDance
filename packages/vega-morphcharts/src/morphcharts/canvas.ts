/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Core, SingleTouchAction } from 'morphcharts';
import { MorphChartsOptions } from '../interfaces';

const rightButton = 2;

export function listenCanvasEvents(core: Core, options: MorphChartsOptions) {
    const { container, pickGridCallback } = options;
    const { inputManager } = core;

    if (options.onLasso) {
        inputManager.pickLassoCallback = result => {
            options.onLasso(result.ids[0], result.manipulator.event as MouseEvent);
        };
    }

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

    inputManager.pickAxesGridCallback = ({ divisionX, divisionY, divisionZ, manipulator }) => {
        clearClickTimeout();
        const { altKey, button, shiftKey } = manipulator;
        const me = { altKey, shiftKey, button } as MouseEvent;
        const e: MouseEvent | PointerEvent | TouchEvent = me;
        pickGridCallback([divisionX, divisionY, divisionZ], e);
    };

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
    canvas.addEventListener('mousedown', () => {
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
}
