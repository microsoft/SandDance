/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { Column } from '@msrvida/chart-types';
import { Insight, SpecColumns } from '@msrvida/sanddance-specs';
import { GL_ORDINAL } from './constants';
import { OrdinalMap } from './types';

export function assignOrdinals(columns: SpecColumns, data: object[], ordinalMap?: OrdinalMap) {
    const uCol = columns.uid && columns.uid.name;

    if (ordinalMap) {
        data.forEach((d, i) => {
            const key = uCol ? d[uCol] : i;
            d[GL_ORDINAL] = ordinalMap[key];
        });
    } else {
        ordinalMap = {};
        data.forEach((d, i) => {
            d[GL_ORDINAL] = i;
            const uColValue = uCol ? d[uCol] : i;
            ordinalMap[uColValue] = i;
        });
    }

    return ordinalMap;
}

export function getDataIndexOfCube(cube: VegaDeckGl.types.Cube, data: object[]) {
    const len = data.length;
    for (let i = 0; i < len; i++) {
        if (data[i][GL_ORDINAL] === cube.ordinal) {
            return i;
        }
    }
}
