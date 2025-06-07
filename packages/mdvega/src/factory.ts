/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import MarkdownIt, { Token } from 'markdown-it';
import { attrs } from '@mdit/plugin-attrs';
import { container, MarkdownItContainerOptions } from '@mdit/plugin-container';
import { ErrorHandler, Renderer } from './renderer';

declare const markdownit: typeof MarkdownIt;

export interface PrioritizedSignal {
    name: string;
    value: unknown;
    priority: number;
    isData: boolean;
}

export interface BatchItem {
    value: unknown;
    isData: boolean;
}

export interface Batch {
    [name: string]: BatchItem;
}

export interface IInstance {
    id: string;
    initialSignals: PrioritizedSignal[];
    recieveBatch?: (batch: Batch, from: string) => Promise<void>;
    beginListening?: (sharedSignals: { signalName: string, isData: boolean }[]) => void;
    broadcastComplete?: () => Promise<void>;
    destroy?: () => Promise<void>;
    getCurrentSignalValue?: (signalName: string) => unknown;
}

export interface Plugin {
    name: string;
    initializePlugin: (md: MarkdownIt) => void;
    fence?: (token: Token, idx: number) => string;
    hydrateComponent?: (renderer: Renderer, errorHandler: ErrorHandler) => Promise<IInstance[]>;
}

export const plugins: Plugin[] = [];

export function registerMarkdownPlugin(plugin: Plugin) {
    plugins.push(plugin);
    return 'register';
}

export interface CreateOptions {
    classList?: string[];
}

export function create(options?: CreateOptions) {
    const md = new markdownit();
    for (const plugin of plugins) {
        plugin.initializePlugin(md);
    }

    md.use(attrs);

    options?.classList?.forEach(name => {
        const containerOptions: MarkdownItContainerOptions = { name };
        md.use(container, containerOptions);
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
