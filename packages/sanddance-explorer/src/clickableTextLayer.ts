// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from './base';
import { SandDance } from '@msrvida/sanddance-react';
import { TextLayerDatum } from '@deck.gl/layers/text-layer/text-layer';

interface Zzz extends TextLayerDatum {
    role: SandDance.types.InsightColumnRoles;
}

export function onBeforeCreateLayers(stage: SandDance.VegaDeckGl.types.Stage, layerFn: SandDance.VegaDeckGl.types.LayerFn, specCapabilities: SandDance.types.SpecCapabilities) {
    const clickableTextData: Zzz[] = [];
    const pristineAxes = SandDance.VegaDeckGl.util.clone(stage.axes);
    for (let axisName in stage.axes) {
        specCapabilities.roles.forEach(role => {
            if (role.role === axisName) {
                let axes = stage.axes[axisName] as SandDance.VegaDeckGl.types.Axis[];
                axes.forEach(axis => {
                    if (axis.title) {
                        const z = axis.title as Zzz;
                        z.role = role.role;
                        clickableTextData.push(z);
                        delete axis.title;
                    }
                });
            }
        });
    }
    const layers = layerFn(stage);
    stage.axes = pristineAxes;
    if (clickableTextData.length > 0) {
        const onTextClick = (e: MouseEvent | PointerEvent | TouchEvent, text: Zzz) => {
            console.log('clicked', text);
        };
        const clickableTextLayer = newClickableTextLayer("z", onTextClick, clickableTextData, [0, 0, 200, 255]);
        layers.splice(1, 0, clickableTextLayer);
    }
    return layers;
}


function newClickableTextLayer(id: string, onTextClick: (e: MouseEvent | PointerEvent | TouchEvent, text: Zzz) => void, data: Zzz[], highlightColor: number[]) {
    return new base.layers.TextLayer({
        id,
        data,
        coordinateSystem: base.deck.COORDINATE_SYSTEM.IDENTITY,
        autoHighlight: true,
        highlightColor,
        pickable: true,
        onClick: (o, e) => onTextClick(e && e.srcEvent, o.object as Zzz),
        getColor: [64, 64, 255, 255],
        getTextAnchor: o => o.textAnchor,
        getSize: o => o.size,
        getAngle: o => o.angle
    });
}
