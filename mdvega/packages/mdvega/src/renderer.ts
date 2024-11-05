/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import MarkdownIt from 'markdown-it';
import { Renderers } from 'vega-typings/types';
import { create, Hydration, plugins } from './factory';
import { SignalBus } from './signalbus';

export interface ErrorHandler {
    (error: Error, pluginName: string, instanceIndex: number, phase: string, container: Element): void;
}

export interface RendererOptions {
    vegaRenderer?: Renderers;
    dataSignalPrefix?: string;
    signalBus?: SignalBus;
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

    private destroyHandlers: { [key: string]: () => Promise<void> };

    constructor(public element: HTMLElement, options?: RendererOptions) {
        this.options = { ...defaultRendererOptions, ...options };
        this.md = create();
        this.signalBus = options.signalBus || new SignalBus(this.options.dataSignalPrefix);
        this.instances = {};
        this.destroyHandlers = {};
    }

    registerDestroyer(type: string, handler: () => Promise<void>) {
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
        this.signalBus.log('Renderer', 'rendering DOM');
        const hydrationPromises: Promise<Hydration>[] = plugins.map(plugin =>
            plugin.hydrateComponent ? plugin.hydrateComponent(this, errorHandler) : Promise.resolve(null),
        );

        try {
            const pluginHydrations = await Promise.all(hydrationPromises.filter(Boolean));
            const finalPromises: Promise<void>[] = [];

            for (const hydration of pluginHydrations) {
                if (hydration && hydration.finalize) {
                    finalPromises.push(hydration.finalize());
                }
                if (hydration && hydration.instances) {
                    this.instances[hydration.pluginName] = hydration.instances;
                }
            }

            await Promise.all(finalPromises);
        } catch (error) {
            console.error('Error in rendering plugins', error);
        }
    }

    async destroy() {
        await Promise.all(Object.values(this.destroyHandlers).map(handler => handler()));
        this.destroyHandlers = {};
        this.instances = {};
    }

}
