(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('markdown-it'), require('vega'), require('vega-lite')) :
    typeof define === 'function' && define.amd ? define(['exports', 'markdown-it', 'vega', 'vega-lite'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MdVega = {}, global.markdownit, global.vega, global.vegaLite));
})(this, (function (exports, MarkdownIt, vega, vegaLite) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var MarkdownIt__default = /*#__PURE__*/_interopDefaultLegacy(MarkdownIt);

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    const plugins = [];
    function registerMarkdownPlugin(plugin) {
        plugins.push(plugin);
        return 'register';
    }
    function create() {
        const md = new MarkdownIt__default["default"]();
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
            }
            else {
                return '';
            }
        };
        return md;
    }
    function definePlugin(md, pluginName) {
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

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["none"] = 0] = "none";
        LogLevel[LogLevel["all"] = 1] = "all";
    })(LogLevel || (LogLevel = {}));
    // Signal Bus to manage shared signals
    class SignalBus {
        constructor() {
            this.sources = [];
            this.signals = {};
            this.listeners = [];
            this.broadcastingStack = [];
            this.directUpdateSignals = new Set();
            this.logLevel = LogLevel.none;
        }
        log(message, ...optionalParams) {
            if (this.logLevel !== LogLevel.none) {
                console.log(`[Signal Bus] ${message}`, ...optionalParams);
            }
        }
        findSourceSignal(name, excludeId) {
            for (let i = 0; i < this.sources.length; i++) {
                const id = this.sources[i];
                if (id === excludeId)
                    continue;
                const scopedName = `${id}_${name}`;
                if (this.signals[scopedName]) {
                    const value = this.signals[scopedName];
                    return { id, value };
                }
            }
        }
        registerSignal(id, name, value) {
            const scopedName = `${id}_${name}`;
            if (!this.signals[scopedName]) {
                if (!this.sources.includes(id)) {
                    this.sources.push(id);
                }
                this.signals[scopedName] = value;
                this.log(`Registered signal: ${scopedName} with initial value:`, value);
            }
        }
        broadcast(originId, name, value) {
            const scopedName = `${originId}_${name}`;
            if (this.directUpdateSignals.has(scopedName)) {
                this.log(`Ignoring direct update for signal: ${name} from ${originId}`);
                this.directUpdateSignals.delete(scopedName);
                return;
            }
            this.log(`Broadcasting signal: ${name} from ${originId} with value:`, value);
            this.startBroadcast();
            this.signals[scopedName] = value;
            // Notify other listeners if they have the signal defined and the value has changed
            this.listeners.forEach(listener => {
                const listenerScopedName = `${listener.id}_${name}`;
                if (listener.id !== originId) {
                    if (listener.hasSignal(name)) {
                        if (this.signals[listenerScopedName] !== value) {
                            this.log(`Notifying listener: ${listener.id} with signal: ${name}, value:`, value);
                            listener.callback(name, value ? value.toString() : null);
                        }
                        else {
                            this.log(`Propagation snubbed for listener: ${listener.id}, signal: ${name}, value unchanged:`, value);
                        }
                    }
                    else {
                        this.log(`Listener ${listener.id} does not have signal: ${name}`);
                    }
                }
            });
            this.endBroadcast();
        }
        startBroadcast() {
            this.broadcastingStack.push(true);
        }
        endBroadcast() {
            this.broadcastingStack.pop();
        }
        isBroadcasting() {
            return this.broadcastingStack.length > 0;
        }
        registerListener(id, callback, hasSignal) {
            this.listeners.push({ id, callback, hasSignal });
            this.log(`Registered listener for: ${id}`);
        }
        // updateSignalDirectly(id: string, name: string, value: string | null) {
        //     const scopedName = `${id}_${name}`;
        //     this.directUpdateSignals.add(scopedName);
        //     this.signals[scopedName] = value;
        //     /////////////////////////////////////////////////////////////////////////////////////////////////////this.updateKeyValue(name, value);
        //     this.log(`Directly updating signal: ${name} for ${id} with value:`, value);
        // }
        // Function to reset signal listeners
        resetSignalListeners() {
            this.sources = [];
            this.listeners = [];
            this.signals = {};
            this.log('Signal listeners and signals have been reset.');
        }
    }

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    class Renderer {
        constructor(element) {
            this.element = element;
            this.md = create();
            this.signalBus = new SignalBus();
            this.instances = {};
            this.destroyHandlers = {};
        }
        registerDestroyer(type, handler) {
            this.destroyHandlers[type] = handler;
        }
        render(markdown) {
            //loop through all the destroy handlers and call them. have the key there to help us debug
            this.destroy();
            this.signalBus.resetSignalListeners(); // Reset signal listeners before updating charts
            const parsedHTML = this.md.render(markdown);
            this.element.innerHTML = parsedHTML;
            //loop through all the plugins and render them
            this.signalBus.log('rendering DOM');
            const finals = [];
            plugins.forEach(plugin => {
                if (plugin.hydrateComponent) {
                    this.instances[plugin.name] = [];
                    finals.push(plugin.hydrateComponent(this));
                }
            });
            finals.forEach(final => {
                if (final) {
                    final();
                }
            });
        }
        destroy() {
            for (const key in this.destroyHandlers) {
                this.destroyHandlers[key]();
            }
            this.destroyHandlers = {};
        }
    }

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    const placeholdersPlugin = {
        name: 'placeholders',
        initializePlugin: (md) => {
            console.log('Initializing placeholders plugin', md);
            // Custom plugin to handle dynamic placeholders
            md.use(function (md) {
                // Add a custom rule to handle {{...}} placeholders
                md.inline.ruler.after('emphasis', 'dynamic_placeholder', function (state, silent) {
                    let token;
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
            const elementsByKeys = new Map();
            placeholders.forEach(placeholder => {
                const key = placeholder.getAttribute('data-key');
                //see if key exists in the map
                if (elementsByKeys.has(key)) {
                    //if it does, append the element to the existing array
                    const elements = elementsByKeys.get(key);
                    elements.push(placeholder);
                }
                else {
                    //if it doesn't, create a new array with the element
                    elementsByKeys.set(key, [placeholder]);
                }
            });
            //now for each key, add a listener to the signal bus to update all the elements with the new value
            elementsByKeys.forEach((elements, key) => {
                const callback = (key, value) => {
                    renderer.signalBus.log(`Updating key: ${key} has ${elements.length} placeholder elements`);
                    elements.forEach(placeholder => {
                        placeholder.textContent = value;
                    });
                };
                const hasSignal = (name) => {
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
                            var _a;
                            placeholder.textContent = (_a = existingSourceSignal.value) === null || _a === void 0 ? void 0 : _a.toString();
                        });
                    }
                });
            };
        },
    };

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    const tablePlugin = {
        name: 'table',
        initializePlugin: (md) => {
            console.log('Initializing table plugin', md);
        },
    };

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    function sanitizedHTML(tagName, attributes, content) {
        // Create a temp element with the specified tag name
        const element = document.createElement(tagName);
        // Iterate over the attribute list and set each attribute
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });
        // Set the textContent to automatically escape the content
        element.textContent = content;
        // Return the outer HTML of the element
        return element.outerHTML;
    }

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    const vegaPlugin = {
        name: 'vega',
        initializePlugin: (md) => definePlugin(md, 'vega'),
        fence: (token, idx) => {
            const spec = JSON.parse(token.content.trim());
            const vegaId = `vega-${idx}`;
            return sanitizedHTML('div', { id: vegaId, class: 'vega-chart' }, JSON.stringify(spec));
        },
        hydrateComponent: (renderer) => {
            renderer.element.querySelectorAll('.vega-chart').forEach((container, index) => {
                if (!container.textContent)
                    return;
                const spec = JSON.parse(container.textContent);
                const vegaId = `vega-${index}`;
                // Register initial signals with the signal bus
                if (spec.signals) {
                    spec.signals.forEach((signal) => {
                        //see if signal already exists and get its value
                        const existingSourceSignal = renderer.signalBus.findSourceSignal(signal.name, vegaId);
                        if (existingSourceSignal) {
                            signal.value = existingSourceSignal.value;
                        }
                        renderer.signalBus.registerSignal(vegaId, signal.name, signal.value);
                    });
                }
                //TODO catch errors
                const runtime = vega.parse(spec);
                const view = new vega.View(runtime, { container, renderer: 'canvas' });
                view.runAsync();
                renderer.instances['vega'].push(view);
                // Helper function to check if a signal is defined in the spec
                const hasSignal = (signalName) => {
                    return !!(spec.signals && spec.signals.some(signal => signal.name === signalName));
                };
                // Register a listener for each signal in this Vega instance
                if (spec.signals) {
                    spec.signals.forEach(signal => {
                        view.addSignalListener(signal.name, (name, value) => {
                            renderer.signalBus.log(`[Vega ${vegaId}] Signal event: ${name}, value:`, value);
                            // Only broadcast if this is an event-driven signal change
                            renderer.signalBus.broadcast(vegaId, name, value);
                        });
                    });
                }
                // Register a global listener to update this Vega instance when signals change
                renderer.signalBus.registerListener(vegaId, (name, value) => {
                    const scopedName = `${vegaId}_${name}`;
                    if (renderer.signalBus.signals[scopedName] !== value) {
                        renderer.signalBus.log(`[Vega ${vegaId}] Updating signal: ${name} with value:`, value);
                        // Mark this update as direct to prevent broadcasting it again
                        ////////////////////////////////////////////////////////////////////renderer.signalBus.updateSignalDirectly(vegaId, name, value);
                        view.signal(name, value).runAsync();
                    }
                    else {
                        renderer.signalBus.log(`[Vega ${vegaId}] Signal update snubbed: ${name}, value unchanged:`, value);
                    }
                }, hasSignal);
            });
        },
    };

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    const vegaLitePlugin = {
        name: 'vega-lite',
        initializePlugin: (md) => definePlugin(md, 'vega-lite'),
        fence: (token, idx) => {
            const spec = JSON.parse(token.content.trim());
            const vegaSpec = vegaLite.compile(spec).spec;
            const vegaId = `vega-lite-${idx}`;
            return sanitizedHTML('div', { id: vegaId, class: 'vega-chart' }, JSON.stringify(vegaSpec));
        },
    };

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    function registerNativePlugins() {
        registerMarkdownPlugin(placeholdersPlugin);
        registerMarkdownPlugin(tablePlugin);
        registerMarkdownPlugin(vegaPlugin);
        registerMarkdownPlugin(vegaLitePlugin);
    }

    /*!
    * Copyright (c) Microsoft Corporation.
    * Licensed under the MIT License.
    */
    registerNativePlugins();

    exports.Renderer = Renderer;
    exports.definePlugin = definePlugin;
    exports.plugins = plugins;
    exports.registerMarkdownPlugin = registerMarkdownPlugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
