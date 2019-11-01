// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Language } from './types';
import { TickText } from './vega-deck.gl/interfaces';
import { ColumnStats } from './specs/types';

export function makeDateRange(tickTexts: TickText[], language: Language, columnStats: ColumnStats) {
    const range = (d1: string, d2: string) => `${d1} - ${d2}`;

    if (tickTexts.length === 1) {
        const span = getSpan(columnStats.min, columnStats.max);
        tickTexts[0].text = range(formatUnit(columnStats.min, span), formatUnit(columnStats.max, span));
    } else {
        const span = getSpan(tickTexts[0].value as number, tickTexts[1].value as number);
        tickTexts.forEach((t, i) => {
            let min = t.value as number;
            let max: number;
            if (i === tickTexts.length - 1) {
                max = columnStats.max;
            } else {
                max = tickTexts[i + 1].value as number
            }
            t.text = range(formatUnit(min, span), formatUnit(max, span));
        });
    }
}

const milli = 1;
const second = milli * 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;
const quarter = year / 4;
const month = year / 12;

enum TimeSpanFormat {
    year, quarter, month, day, hour, minute, second, milli
}

function getSpan(min: number, max: number): TimeSpanFormat {
    const span = max - min;
    if (span > year) return TimeSpanFormat.year;
    if (span > quarter) return TimeSpanFormat.quarter;
    if (span > month) return TimeSpanFormat.month;
    if (span > day) return TimeSpanFormat.day;
    if (span > hour) return TimeSpanFormat.hour;
    if (span > minute) return TimeSpanFormat.minute;
    if (span > second) return TimeSpanFormat.second;
    return TimeSpanFormat.milli;
}

function formatUnit(dateValue: string | number, timeSpanFormat: TimeSpanFormat) {
    const d = new Date(dateValue);
    switch (timeSpanFormat) {
        case TimeSpanFormat.year: return `${d.getFullYear()}`;
        case TimeSpanFormat.quarter: return `${d.getMonth()} ${d.getFullYear()}`;
        case TimeSpanFormat.month: return `${d.getMonth()} ${d.getFullYear()}`;
        case TimeSpanFormat.day: return `${d.getDate()} ${d.getMonth()} ${d.getFullYear()}`;
    }
    //const span = max - min;
    //TODO use span to determine unit
    return d.toLocaleTimeString();
}
