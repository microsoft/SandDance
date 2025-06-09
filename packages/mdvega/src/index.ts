/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { definePlugin, Plugin, plugins, registerMarkdownPlugin } from './factory';
import { Renderer } from './renderer';
import { registerNativePlugins } from './plugins';
import { sanitizedHTML } from './sanitize';
import * as common from './plugins/common';

registerNativePlugins();

export {
    definePlugin,
    Plugin,
    plugins,
    registerMarkdownPlugin,
    Renderer,
    sanitizedHTML,
    common,
};

export type MdVega = {
    definePlugin: typeof definePlugin;
    plugins: typeof plugins;
    registerMarkdownPlugin: typeof registerMarkdownPlugin;
    Renderer: typeof Renderer;
    sanitizedHTML: typeof sanitizedHTML;
    common: typeof common;
};

export * as Plugins from './plugins/interfaces';
export { Batch, IInstance } from './factory';
