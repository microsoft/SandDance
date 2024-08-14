/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { use } from '@msrvida/sanddance';
import { VegaMorphCharts } from '@msrvida/sanddance';
import { MdVega } from '@msrvida/mdvega';
import { sanddancePlugin } from './plugin';

declare const vega: VegaMorphCharts.types.VegaBase;
declare const MdVega: MdVega;

use(vega);

if (MdVega) {
    MdVega.registerMarkdownPlugin(sanddancePlugin);
}
