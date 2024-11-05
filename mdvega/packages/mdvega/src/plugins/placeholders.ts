/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Token } from 'markdown-it';
import { Plugin } from '../factory';

export const placeholdersPlugin: Plugin = {
    name: 'placeholders',
    initializePlugin: async (md) => {
        // Custom plugin to handle dynamic placeholders
        md.use(function (md) {
            // Add a custom rule to handle {{...}} placeholders
            md.inline.ruler.after('emphasis', 'dynamic_placeholder', function (state, silent) {
                let token: Token;
                const max = state.posMax;
                const start = state.pos;

                // Look for double curly braces {{
                if (state.src.charCodeAt(start) !== 0x7B /* { */ ||
                    state.src.charCodeAt(start + 1) !== 0x7B /* { */) {
                    return false;
                }

                for (let pos = start + 2; pos < max; pos++) {
                    if (state.src.charCodeAt(pos) === 0x7D /* } */ &&
                        state.src.charCodeAt(pos + 1) === 0x7D /* } */) {
                        if (!silent) {
                            state.pos = start + 2;
                            state.posMax = pos;

                            token = state.push('dynamic_placeholder', '', 0);
                            token.markup = state.src.slice(start, pos + 2);
                            token.content = state.src.slice(state.pos, state.posMax);

                            state.pos = pos + 2;
                            state.posMax = max;
                        }
                        return true;
                    }
                }
                return false;
            });

            // Renderer rule for dynamic placeholders
            md.renderer.rules['dynamic_placeholder'] = function (tokens, idx) {
                const key = tokens[idx].content.trim();
                return `<span class="dynamic-placeholder" data-key="${key}">{${key}}</span>`;
            };
        });

    },
    hydrateComponent: async (renderer) => {
        // Collect all the placeholders within this container to get their keys
        const placeholders = renderer.element.querySelectorAll('.dynamic-placeholder');
        const elementsByKeys = new Map<string, Element[]>();
        for (const placeholder of placeholders) {
            const key = placeholder.getAttribute('data-key') as string;
            // See if key exists in the map
            if (elementsByKeys.has(key)) {
                // If it does, append the element to the existing array
                const elements = elementsByKeys.get(key) as Element[];
                elements.push(placeholder);
            } else {
                // If it doesn't, create a new array with the element
                elementsByKeys.set(key, [placeholder]);
            }
        }

        // Now for each key, add a listener to the signal bus to update all the elements with the new value
        const signalCallback = async (name: string, value: string | null) => {
            for (const key of elementsByKeys.keys()) {
                if (name === key) {
                    const elements = elementsByKeys.get(key) as Element[];
                    renderer.signalBus.log(key, `Updating key: ${key} has ${elements.length} placeholder elements`);

                    for (const placeholder of elements) {
                        const parsedMarkdown = renderer.md.renderInline(value?.toString() || '');
                        placeholder.innerHTML = parsedMarkdown;
                    }
                }
            }   
        };
        const hasSignal = (name: string) => {
            for (const key of elementsByKeys.keys()) {
                if (name === key) return true;
            }
            return false;
        };
        renderer.signalBus.registerListener('placeholders', signalCallback, hasSignal, null, () => false);

        return {
            pluginName: placeholdersPlugin.name,
            finalize: async () => {
                for (const [key, elements] of elementsByKeys) {
                    // Initialize to signal value if any
                    const existingSourceSignal = renderer.signalBus.findSourceSignal(key);
                    if (existingSourceSignal) {
                        const parsedMarkdown = renderer.md.renderInline(existingSourceSignal.value?.toString() || '');
                        for (const placeholder of elements) {
                            placeholder.innerHTML = parsedMarkdown;
                        }
                    }
                }
            },
        };
    },
};
