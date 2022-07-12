/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import * as compare from 'just-compare';
import { specs, Viewer } from '@msrvida/sanddance';

export const classList = (...args: Array<string | boolean>) => {
    return args.filter(Boolean).join(' ');
};

export const deepCompare = (compare.default || compare) as <T>(a: T, b: T) => boolean;

function addNullable(insight: specs.Insight, signalValues: specs.SignalValues) {
    const withNulls: specs.Insight = { view: null, filter: null, ...insight, signalValues };
    return withNulls;
}

export function compareInsight(viewer: Viewer, insight: specs.Insight) {
    const currentInsight = viewer.getInsight();
    const a = addNullable(currentInsight, { ...viewer.insight.signalValues, ...currentInsight.signalValues });
    const b = addNullable(insight, { ...a.signalValues, ...insight.signalValues });
    const compare = deepCompare(a, b);
    return { a, b, compare };
}
