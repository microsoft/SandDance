/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import MarkdownIt from 'markdown-it';
import { Renderers } from 'vega-typings/types';
import { create, plugins } from './factory';
import { SignalBus } from './signalbus';

export interface Handler {
    (): void;
}

export interface ErrorHandler {
    (error: Error, pluginName: string, instanceIndex: number, phase: string, container: Element): void;
}

export interface RendererOptions {
    vegaRenderer?: Renderers;
    dataSignalPrefix?: string;
}

const defaultRendererOptions: RendererOptions = {
    vegaRenderer: 'canvas',
    dataSignalPrefix: 'data-signal:',
};

export class Renderer {

    public md: MarkdownIt;
    public instances: { [key: string]: unknown[] };
    public signalBus: SignalBus;
    public options: RendererOptions;

    private destroyHandlers: { [key: string]: Handler };

    constructor(public element: HTMLElement, options?: RendererOptions) {
        this.options = { ...defaultRendererOptions, ...options };
        this.md = create();
        this.signalBus = new SignalBus(this.options.dataSignalPrefix);
        this.instances = {};
        this.destroyHandlers = {};
    }

    registerDestroyer(type: string, handler: Handler) {
        this.destroyHandlers[type] = handler;
    }

    async render(markdown: string, errorHandler?: ErrorHandler) {
        if (!errorHandler) {
            errorHandler = (error, pluginName, instanceIndex, phase) => {
                console.error(`Error in plugin ${pluginName} instance ${instanceIndex} phase ${phase}`, error);
            };
        }

        //loop through all the destroy handlers and call them. have the key there to help us debug
        this.destroy();

        this.signalBus.resetSignalListeners(); // Reset signal listeners before updating charts

        const parsedHTML = this.md.render(markdown);
        this.element.innerHTML = parsedHTML;

        //loop through all the plugins and render them
        this.signalBus.log('rendering DOM');
        const finals: (void | (() => void))[] = [];
        plugins.forEach(async plugin => {
            if (plugin.hydrateComponent) {
                this.instances[plugin.name] = [];
                finals.push(await plugin.hydrateComponent(this, errorHandler));
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
