/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import MarkdownIt, { Token } from 'markdown-it';
import { ErrorHandler, Renderer } from './renderer';

export interface Plugin {
    name: string;
    initializePlugin: (md: MarkdownIt) => void;
    fence?: (token: Token, idx: number) => string;
    hydrateComponent?: (renderer: Renderer, errorHandler: ErrorHandler) => void | (() => void);
}

export const plugins: Plugin[] = [];

export function registerMarkdownPlugin(plugin: Plugin) {
    plugins.push(plugin);
    return 'register';
}

export function create() {
    const md = new MarkdownIt();
    plugins.forEach(plugin => {
        plugin.initializePlugin(md);
    });

    // Default handler to preserve existing functionality
    const originalFence = md.renderer.rules.fence;

    // Modified fence renderer to dynamically use handlers
    md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
        const token = tokens[idx];
        const info = token.info.trim();

        // Check if a handler exists for the block type and use it
        const plugin = plugins.filter(p => p.name === info)[0];
        if (plugin && plugin.fence) {
            return plugin.fence(token, idx);
        }

        if (originalFence) {
            return originalFence(tokens, idx, options, env, slf);
        } else {
            return '';
        }
    };

    return md;
}

export function definePlugin(md: MarkdownIt, pluginName: string) {
    md.block.ruler.before('fence', `${pluginName}_block`, function (state, startLine, endLine) {
        const start = state.bMarks[startLine] + state.tShift[startLine];
        const max = state.eMarks[startLine];

        if (state.src.slice(start, max).trim() !== '```' + pluginName) {
            return false;
        }

        let nextLine = startLine;
        while (nextLine < endLine) {
            nextLine++;
            if (state.src.slice(state.bMarks[nextLine] + state.tShift[nextLine], state.eMarks[nextLine]).trim() === '```') {
                break;
            }
        }

        state.line = nextLine + 1;
        const token = state.push('fence', 'code', 0);
        token.info = pluginName;
        token.content = state.getLines(startLine + 1, nextLine, state.blkIndent, true);
        token.map = [startLine, state.line];

        return true;
    });
}
