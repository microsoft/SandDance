/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Token } from 'markdown-it';
import { Batch, IInstance, Plugin, PrioritizedSignal } from '../factory';

function createTemplateFunction(template: string) {
    const parts = template.split(/(%7B%7B.*?%7D%7D)/g).map(part => {
        if (part.startsWith('%7B%7B') && part.endsWith('%7D%7D')) {
            const key = part.slice(6, -6); // Extract key from %7B%7Bkey%7D%7D
            return (batch: Batch) => batch[key]?.value?.toString() || '';
        } else {
            return () => part; // Static part of the template
        }
    });

    return (batch: Batch) => parts.map(fn => fn(batch)).join('');
}

function handleDynamicUrl(tokens: Token[], idx: number, attrName: string, elementType: string) {
    const token = tokens[idx];
    const attrValue = token.attrGet(attrName);

    if (attrValue && attrValue.includes('%7B%7B')) {
        // Ensure token.attrs is initialized
        if (!token.attrs) {
            token.attrs = [];
        }
        token.attrSet('data-template-url', attrValue); // Store original template
    }

    return token;
}

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

        md.renderer.rules['link_open'] = function (tokens, idx, options, env, slf) {
            handleDynamicUrl(tokens, idx, 'href', 'link');
            return slf.renderToken(tokens, idx, options);
        };

        md.renderer.rules['image'] = function (tokens, idx, options, env, slf) {
            handleDynamicUrl(tokens, idx, 'src', 'image');
            return slf.renderToken(tokens, idx, options);
        };

    },

    hydrateComponent: async (renderer) => {
        const templateFunctionMap = new WeakMap<Element, { templateFunction: (batch: Batch) => string, batch: Batch }>();
        const placeholders = renderer.element.querySelectorAll('.dynamic-placeholder');
        const dynamicUrls = renderer.element.querySelectorAll('[data-template-url]');
        const elementsByKeys = new Map<string, Element[]>();

        // Collect placeholders
        for (const placeholder of placeholders) {
            const key = placeholder.getAttribute('data-key');
            if (elementsByKeys.has(key)) {
                elementsByKeys.get(key).push(placeholder);
            } else {
                elementsByKeys.set(key, [placeholder]);
            }
        }

        // Collect dynamic URLs
        for (const element of dynamicUrls) {
            const templateUrl = element.getAttribute('data-template-url');
            const keys = Array.from(templateUrl.matchAll(/%7B%7B(.*?)%7D%7D/g)).map(match => match[1]);

            const templateFunction = createTemplateFunction(templateUrl);
            templateFunctionMap.set(element, { templateFunction, batch: {} });

            for (const key of keys) {
                if (elementsByKeys.has(key)) {
                    elementsByKeys.get(key).push(element);
                } else {
                    elementsByKeys.set(key, [element]);
                }
            }
        }

        // Create initial signals
        const initialSignals = Array.from(elementsByKeys.keys()).map(name => {
            const prioritizedSignal: PrioritizedSignal = {
                name,
                value: null,
                priority: -1,
                isData: false,
            };
            return prioritizedSignal;
        });

        const instances: IInstance[] = [
            {
                id: 'placeholders',
                initialSignals,
                recieveBatch: async (batch) => {
                    for (const key of Object.keys(batch)) {
                        const elements = elementsByKeys.get(key) || [];
                        for (const element of elements) {
                            if (element.classList.contains('dynamic-placeholder')) {
                                // Update placeholder content
                                const markdownContent = batch[key].value?.toString() || '';
                                const parsedMarkdown = isMarkdownInline(markdownContent)
                                    ? renderer.md.renderInline(markdownContent)
                                    : renderer.md.render(markdownContent);
                                element.innerHTML = parsedMarkdown;
                            } else if (element.hasAttribute('data-template-url')) {
                                // Update dynamic URL
                                const templateData = templateFunctionMap.get(element);
                                if (templateData) {
                                    // Merge the new batch with the stored batch
                                    templateData.batch = { ...templateData.batch, ...batch };
                                    const updatedUrl = templateData.templateFunction(templateData.batch);
                                    if (element.tagName === 'A') {
                                        element.setAttribute('href', updatedUrl);
                                    } else if (element.tagName === 'IMG') {
                                        element.setAttribute('src', updatedUrl);
                                    }
                                }
                            }
                        }
                    }
                },
            },
        ];

        return instances;
    },
};

function isMarkdownInline(markdown: string) {
    // Inline markdown typically does not contain newlines
    if (!markdown.includes('\n')) {
        return true;
    }

    // Block markdown typically contains newlines and block elements
    const blockElements = ['#', '-', '*', '>', '```', '~~~'];
    for (const element of blockElements) {
        if (markdown.trim().startsWith(element)) {
            return false;
        }
    }

    return true;
}