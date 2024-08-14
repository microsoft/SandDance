/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { DataFile } from '@msrvida/chart-types';
import { specs } from '@msrvida/sanddance';
import { SignalRef } from 'vega-typings';

export interface Spec {
    data: object[] | DataFile | SignalRef;
    insight: specs.Insight;
}
