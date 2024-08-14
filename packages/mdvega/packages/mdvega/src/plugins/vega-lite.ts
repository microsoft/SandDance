import { compile } from 'vega-lite';
import { definePlugin, Plugin } from '../factory';

export const vegaLitePlugin: Plugin = {
    name: 'vega-lite',
    initializePlugin: (md) => definePlugin(md, 'vega-lite'),
    fence: (token, idx) => {
        const spec = JSON.parse(token.content.trim());
        const vegaSpec = compile(spec).spec;
        const vegaId = `vega-lite-${idx}`;
        return `<div id="${vegaId}" class="vega-chart">${JSON.stringify(vegaSpec)}</div>`;
    },
};
