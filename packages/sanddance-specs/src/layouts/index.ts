/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { AggregateContainer } from './aggregateContainer.js';
import { AggregateSquare } from './aggregateSquare.js';
import { Band } from './band.js';
import { Cross } from './cross.js';
import { Layout } from './layout.js';
import { Scatter } from './scatter.js';
import { Square } from './square.js';
import { Stack } from './stack.js';
import { Strip } from './strip.js';
import { Treemap } from './treemap.js';
import { Wrap } from './wrap.js';

export type LayoutType =
    'AggregateContainer' |
    'AggregateSquare' |
    'Band' |
    'Cross' |
    'Scatter' |
    'Square' |
    'Stack' |
    'Strip' |
    'Treemap' |
    'Wrap'
    ;

export const layoutClasses: { [key in LayoutType]: typeof Layout } = {
    AggregateContainer,
    AggregateSquare,
    Band,
    Cross,
    Scatter,
    Square,
    Stack,
    Strip,
    Treemap,
    Wrap,
};
