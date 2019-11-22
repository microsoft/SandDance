// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { ColumnStats } from './specs/types';
import { Spec } from 'vega-typings';

export function makeDateRange(tickTexts: VegaDeckGl.types.TickText[], columnStats: ColumnStats) {
    if (tickTexts.length === 1) {
        const d3TimeFormat = getD3TimeFormat(columnStats.min, columnStats.max);
        tickTexts[0].text = vegaTimeFormat([[columnStats.min, columnStats.max]], d3TimeFormat)[0];
    } else {
        const d3TimeFormat = getD3TimeFormat(tickTexts[0].value as number, tickTexts[1].value as number);
        const pairs = tickTexts.map((t, i) => {
            let min = t.value as number;
            let max: number;
            if (i === tickTexts.length - 1) {
                max = columnStats.max;
            } else {
                max = tickTexts[i + 1].value as number;
            }
            return [min, max] as [number, number];
        });
        const formattedPairs = vegaTimeFormat(pairs, d3TimeFormat);
        formattedPairs.forEach((formattedPair, i) => tickTexts[i].text = formattedPair);
    }
}

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;
const month = year / 12;

function getD3TimeFormat(min: number, max: number) {
    const span = max - min;
    if (span > year) return '%Y';
    if (span > month) return '%b %Y';
    if (span > day) return '%d %b %y';
    if (span > hour) return '%d %b %H:%M';
    if (span > second) return '%H:%M:%S';
    return '%S.%L';
}

function vegaTimeFormat(values: [number, number][], d3TimeFormat: string) {
    const name = 'timeFormat';
    const as = 'output';
    const spec: Spec = {
        $schema: 'https://vega.github.io/schema/vega/v3.json',
        data: [{
            name,
            values,
            transform: [{
                type: 'formula',
                expr: `timeFormat(datum[0], '${d3TimeFormat}') + ' - ' + timeFormat(datum[1], '${d3TimeFormat}')`,
                as
            }]
        }]
    };
    const runtime = VegaDeckGl.base.vega.parse(spec);
    const view = new VegaDeckGl.ViewGl(runtime).run();
    return view.data(name).map(row => row[as]);
}
