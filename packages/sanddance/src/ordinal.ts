// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { Column, Insight, SpecColumns } from './specs/types';
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

export function getSpecColumns(insight: Insight, columns: Column[]): SpecColumns {
    function getColumnByName(name: string) {
        return columns.filter(c => c.name === name)[0];
    }
    return {
        color: getColumnByName(insight.columns && insight.columns.color),
        facet: getColumnByName(insight.columns && insight.columns.facet),
        facetV: getColumnByName(insight.columns && insight.columns.facetV),
        group: getColumnByName(insight.columns && insight.columns.group),
        size: getColumnByName(insight.columns && insight.columns.size),
        sort: getColumnByName(insight.columns && insight.columns.sort),
        sum: getColumnByName(insight.columns && insight.columns.sum),
        uid: getColumnByName(insight.columns && insight.columns.uid),
        x: getColumnByName(insight.columns && insight.columns.x),
        y: getColumnByName(insight.columns && insight.columns.y),
        z: getColumnByName(insight.columns && insight.columns.z)
    };
}

export function getDataIndexOfCube(cube: VegaDeckGl.types.Cube, data: object[]) {
    const len = data.length;
    for (let i = 0; i < len; i++) {
        if (data[i][GL_ORDINAL] === cube.ordinal) {
            return i;
        }
    }
}
