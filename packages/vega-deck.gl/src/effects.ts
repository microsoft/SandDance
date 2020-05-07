// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from './base';
import { Effect } from '@deck.gl/core';

export function lightingEffects(): Effect[] {

    const ambientLight = new base.deck.AmbientLight({
        color: [255, 255, 255],
        intensity: 0.3
    });

    const cameraLight = new base.deck._CameraLight({
        color: [255, 255, 255],
        intensity: 1
    });

    // const directionalLight = new base.deck.DirectionalLight({
    //     color: [255, 255, 255],
    //     direction: [0, 0, -1],
    //     intensity: 0.2
    //   });

    return [new base.deck.LightingEffect({ ambientLight, cameraLight })];
}
