/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

// import { AlignmentBaseline, TextAnchor } from '@deck.gl/layers/text-layer/text-layer';
import { base } from '../base';
import { colorFromString } from '../color';
import {
    GroupType,
    LabelDatum,
    MarkStager,
    MarkStagerOptions,
} from './interfaces';
import {
    Scene,
    SceneText,
    SceneTextAlign,
    SceneTextBaseline,
} from 'vega-typings';
import { Stage, TickText, VegaTextLayerDatum } from '../interfaces';

interface SceneText2 extends SceneText {
    metaData?: any;
    ellipsis?: string;
    limit?: number;
}

const markStager: MarkStager = (options: MarkStagerOptions, stage: Stage, scene: Scene, x: number, y: number, groupType: GroupType) => {

    //change direction of y from SVG to GL
    const ty = -1;

    base.vega.sceneVisit(scene, function (item: SceneText2) {
        if (!item.text) return;
        const size = item.fontSize;
        //const alignmentBaseline = convertBaseline(item.baseline);
        //const yOffset = alignmentBaseline === 'top' ? item.fontSize / 2 : 0;    //fixup to get tick text correct
        const yOffset =  0;
        const textItem: VegaTextLayerDatum = {
            color: colorFromString(item.fill),
            text: item.limit === undefined ? item.text : base.vega.truncate(item.text, item.limit, 'right', item.ellipsis || '...'),   //use dots instead of unicode ellipsis for
            position: [x + (item.x || 0), ty * (y + (item.y || 0) + yOffset), 0],
            size,
            angle: convertAngle(item.angle),
            //textAnchor: convertAlignment(item.align),
            //alignmentBaseline,
            metaData: item.metaData,
        };

        const { currAxis } = options;
        if (options.modifyAxis) {
            options.modifyAxis(item, textItem, stage, currAxis);
        }

        if (item.mark.role === 'axis-label') {
            const tickText = textItem as TickText;
            tickText.value = (item.datum as LabelDatum).value;
            currAxis.tickText.push(tickText);
        } else if (item.mark.role === 'axis-title') {
            currAxis.title = textItem;
        } else {
            stage.textData.push(textItem);
        }
    });
};

function convertAngle(vegaTextAngle: number) {
    if (vegaTextAngle && !isNaN(vegaTextAngle)) {
        return 360 - vegaTextAngle;
    }
    return 0;
}

// function convertAlignment(textAlign: SceneTextAlign): TextAnchor {
//     switch (textAlign) {
//         case 'center': return 'middle';
//         case 'left': return 'start';
//         case 'right': return 'end';
//     }
//     return 'start';
// }

// function convertBaseline(baseline: SceneTextBaseline): AlignmentBaseline {
//     switch (baseline) {
//         case 'middle': return 'center';
//     }
//     return baseline || 'bottom';
// }

export default markStager;
