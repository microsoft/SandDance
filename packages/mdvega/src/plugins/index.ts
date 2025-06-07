/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { registerMarkdownPlugin } from '../factory';

import { dropdownPlugin } from './dropdown';
import { imagePlugin } from './image';
import { placeholdersPlugin } from './placeholders';
import { presetsPlugin } from './presets';
import { tabulatorPlugin } from './tabulator';
import { vegaLitePlugin } from './vega-lite';
import { vegaPlugin } from './vega';

export function registerNativePlugins() {
    registerMarkdownPlugin(dropdownPlugin);
    registerMarkdownPlugin(imagePlugin);
    registerMarkdownPlugin(placeholdersPlugin);
    registerMarkdownPlugin(presetsPlugin);
    registerMarkdownPlugin(tabulatorPlugin);
    registerMarkdownPlugin(vegaLitePlugin);
    registerMarkdownPlugin(vegaPlugin);
}
