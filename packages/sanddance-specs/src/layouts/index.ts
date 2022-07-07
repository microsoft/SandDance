/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { AggregateContainer } from './aggregateContainer';
import { AggregateSquare } from './aggregateSquare';
import { Band } from './band';
import { Cross } from './cross';
import { Layout } from './layout';
import { Scatter } from './scatter';
import { Square } from './square';
import { Stack } from './stack';
import { Strip } from './strip';
import { Treemap } from './treemap';
import { Wrap } from './wrap';

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
