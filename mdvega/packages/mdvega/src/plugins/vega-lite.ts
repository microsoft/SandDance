/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { definePlugin, Plugin } from '../factory';
import { sanitizedHTML } from './sanitize';

export const vegaLitePlugin: Plugin = {
    name: 'vega-lite',
    initializePlugin: (md) => definePlugin(md, 'vega-lite'),
    fence: (token, idx) => {
        const vegaLiteId = `vega-lite-${idx}`;
        return sanitizedHTML('div', { id: vegaLiteId, class: 'vega-chart', style: 'display: none' }, token.content.trim());
    },
};
