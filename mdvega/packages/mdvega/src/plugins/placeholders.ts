/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Token } from 'markdown-it';
import { Plugin } from '../factory';

export const placeholdersPlugin: Plugin = {
    name: 'placeholders',
    initializePlugin: (md) => {
        console.log('Initializing placeholders plugin', md);

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
    hydrateComponent(renderer) {
        //collect all the placeholders within this container to get their keys
        const placeholders = renderer.element.querySelectorAll('.dynamic-placeholder');
        const elementsByKeys = new Map<string, Element[]>();
        placeholders.forEach(placeholder => {
            const key = placeholder.getAttribute('data-key') as string;
            //see if key exists in the map
            if (elementsByKeys.has(key)) {
                //if it does, append the element to the existing array
                const elements = elementsByKeys.get(key) as Element[];
                elements.push(placeholder);
            } else {
                //if it doesn't, create a new array with the element
                elementsByKeys.set(key, [placeholder]);
            }
        });
        //now for each key, add a listener to the signal bus to update all the elements with the new value
        elementsByKeys.forEach((elements, key) => {
            const callback = (key: string, value: string | null) => {
                renderer.signalBus.log(`Updating key: ${key} has ${elements.length} placeholder elements`);
                elements.forEach(placeholder => {
                    placeholder.textContent = value;
                });
            };
            const hasSignal = (name: string) => {
                return name === key;
            };
            renderer.signalBus.registerListener(key, callback, hasSignal);
        });
        return () => {
            elementsByKeys.forEach((elements, key) => {
                //initialize to signal value if any
                const existingSourceSignal = renderer.signalBus.findSourceSignal(key);
                if (existingSourceSignal) {
                    elements.forEach(placeholder => {
                        placeholder.textContent = existingSourceSignal.value?.toString();
                    });
                }
            });
        };
    },
};
