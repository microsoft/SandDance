// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from './vega-deck.gl';
import { Column, Insight, SpecColumns } from './specs/types';
import { OrdinalMap } from './types';

export function assignOrdinals(columns: SpecColumns, data: object[], ordinalMap?: OrdinalMap) {
    const uCol = columns.uid && columns.uid.name;

    if (ordinalMap) {
        data.forEach((d, i) => {
            const key = uCol ? d[uCol] : i;
            d[VegaDeckGl.constants.GL_ORDINAL] = ordinalMap[key];
        });
    } else {
        ordinalMap = {};
        data.forEach((d, i) => {
            d[VegaDeckGl.constants.GL_ORDINAL] = i;
            const uColValue = uCol ? d[uCol] : i;
            ordinalMap[uColValue] = i;
        })
    }

    return ordinalMap;
}

export function getSpecColumns(insight: Insight, columns: Column[]): SpecColumns {
    function getColumnByName(name: string) {
        return columns.filter(c => c.name === name)[0];
    }
    return {
        color: getColumnByName(insight.columns.color),
        facet: getColumnByName(insight.columns.facet),
        group: getColumnByName(insight.columns.group),
        size: getColumnByName(insight.columns.size),
        sort: getColumnByName(insight.columns.sort),
        uid: getColumnByName(insight.columns.uid),
        x: getColumnByName(insight.columns.x),
        y: getColumnByName(insight.columns.y),
        z: getColumnByName(insight.columns.z)
    };
}
