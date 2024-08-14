import { registerMarkdownPlugin } from '../factory';

import { placeholdersPlugin } from './placeholders';
import { tablePlugin } from './table';
import { vegaPlugin } from './vega';
import { vegaLitePlugin } from './vega-lite';

export function registerNativePlugins() {
    registerMarkdownPlugin(placeholdersPlugin);
    registerMarkdownPlugin(tablePlugin);
    registerMarkdownPlugin(vegaPlugin);
    registerMarkdownPlugin(vegaLitePlugin);
}
