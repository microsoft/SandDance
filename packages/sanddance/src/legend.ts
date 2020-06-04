// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { ColorBin, Other } from '@msrvida/sanddance-specs';
import { Column } from '@msrvida/chart-types';
import { Language, LegendRowWithSearch } from './types';
import {
    notNice,
    selectBetween,
    selectExact,
    selectNone,
    selectNullOrEmpty
} from './expression';
import { SearchExpressionGroup, SearchExpressionOperators } from '@msrvida/search-expression';

function legendRange(colorBinType: ColorBin, column: Column, legend: VegaDeckGl.types.Legend, clickedIndex: number) {
    if (column.quantitative) {
        return selectQuantitative(colorBinType, column, legend, clickedIndex);
    } else {
        return selectCategorical(column, legend, clickedIndex);
    }
}

function selectCategorical(column: Column, legend: VegaDeckGl.types.Legend, clickedIndex: number): SearchExpressionGroup {
    const value = legend.rows[clickedIndex].value;
    if (value === Other) {
        const values: string[] = [];
        for (let i in legend.rows) {
            if (+i !== clickedIndex) {
                values.push(legend.rows[i].value);
            }
        }
        return selectNone(column, values);
    } else {
        //select equal
        return { expressions: [selectExact(column, legend.rows[clickedIndex].value)] };
    }
}

function selectQuantitative(colorBinType: ColorBin, column: Column, legend: VegaDeckGl.types.Legend, clickedIndex: number) {
    const keys = Object.keys(legend.rows).map(key => +key).sort((a, b) => +a - +b);
    let lowValue: string;
    let lowOperator: SearchExpressionOperators;
    let highValue: string;
    let highOperator: SearchExpressionOperators;
    const rowText = legend.rows[clickedIndex].label;
    switch (colorBinType) {
        case 'continuous': {
            lowValue = rowText;
            if (clickedIndex < keys.length - 1) {
                highValue = legend.rows[clickedIndex + 1].value;
            }
            break;
        }
        default: {
            if (rowText.indexOf('null') > 0) {
                const ex: SearchExpressionGroup = {
                    expressions: [selectNullOrEmpty(column)]
                };
                return ex;
            }
            const dash = rowText.indexOf('–');  //this is not the common dash character!
            if (dash > 0) {
                //bug in Vega for quantize?
                //lowOperator = '>';
                //highOperator = '<=';
                lowValue = rowText.substr(0, dash);
                highValue = rowText.substr(dash + 1);
            } else {
                if (rowText.indexOf('<') >= 0) {
                    highValue = rowText.substring(2);
                } else {
                    if (rowText.indexOf('≥') >= 0) {
                        lowValue = rowText.substring(2);
                    }
                }
            }
        }
    }
    if (lowValue) lowValue = notNice(lowValue);
    if (highValue) highValue = notNice(highValue);
    if (lowValue === highValue) {
        return selectExact(column, lowValue);
    } else {
        return selectBetween(column, lowValue, highValue, lowOperator, highOperator);
    }
}

export function finalizeLegend(colorBinType: ColorBin, colorColumn: Column, legend: VegaDeckGl.types.Legend, language: Language) {
    const rowTexts: string[] = [];
    for (let i in legend.rows) {
        let row = legend.rows[i] as LegendRowWithSearch;
        row.search = legendRange(colorBinType, colorColumn, legend, +i);
        if (row.value === Other) {
            row.label = language.legendOther;
        } else {
            rowTexts.push(row.value);
        }
    }
}
