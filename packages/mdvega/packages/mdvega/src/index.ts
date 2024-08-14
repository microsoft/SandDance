/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { definePlugin, Plugin, plugins, registerMarkdownPlugin } from './factory';
import { Renderer } from './renderer';
import { registerNativePlugins } from './plugins';

registerNativePlugins();

export {
    definePlugin,
    Plugin,
    plugins,
    registerMarkdownPlugin,
    Renderer,
};

export type MdVega = {
    definePlugin: typeof definePlugin;
    plugins: typeof plugins;
    registerMarkdownPlugin: typeof registerMarkdownPlugin;
    Renderer: typeof Renderer;
};
