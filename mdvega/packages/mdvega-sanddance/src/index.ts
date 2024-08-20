/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { use } from '@msrvida/sanddance';
import { VegaMorphCharts } from '@msrvida/sanddance';
import { MdVega } from '@msrvida/mdvega';
import { sanddancePlugin } from './plugin';

import styles from 'bundle-text:@msrvida/sanddance/dist/css/sanddance.css';

declare const vega: VegaMorphCharts.types.VegaBase;
declare const MdVega: MdVega;

use(vega);

if (MdVega) {
    MdVega.registerMarkdownPlugin(sanddancePlugin);
}

function injectStyles(css) {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
}

injectStyles(styles);
