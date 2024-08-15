/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { specs, types } from '@msrvida/sanddance';
import { SignalRef } from 'vega-typings';

export interface Spec {
    data: object[] | types.DataFile | SignalRef;
    insight: specs.Insight;
}
