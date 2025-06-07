/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import MarkdownIt from 'markdown-it';
import { Renderers } from 'vega-typings/types';
import { create, IInstance, plugins } from './factory';
import { SignalBus } from './signalbus';

export interface ErrorHandler {
    (error: Error, pluginName: string, instanceIndex: number, phase: string, container: Element, detail?: string): void;
}

export interface RendererOptions {
    vegaRenderer?: Renderers;
    dataSignalPrefix?: string;
    signalBus?: SignalBus;
    classList?: string[];
}

const defaultRendererOptions: RendererOptions = {
    vegaRenderer: 'canvas',
    dataSignalPrefix: 'data-signal:',
    classList: ['markdown-block'],
};

interface Hydration {
    pluginName: string;
    instances: IInstance[];
}

export class Renderer {

    public md: MarkdownIt;
    public instances: { [key: string]: IInstance[] };
    public signalBus: SignalBus;
    public options: RendererOptions;

    constructor(public element: HTMLElement, options?: RendererOptions) {
        this.options = { ...defaultRendererOptions, ...options };
        this.md = create({ classList: this.options.classList });
        this.signalBus = this.options.signalBus || new SignalBus(this.options.dataSignalPrefix);
        this.instances = {};
    }

    async render(markdown: string, errorHandler?: ErrorHandler) {
        if (!errorHandler) {
            errorHandler = (error, pluginName, instanceIndex, phase) => {
                console.error(`Error in plugin ${pluginName} instance ${instanceIndex} phase ${phase}`, error);
            };
        }

        //loop through all the destroy handlers and call them. have the key there to help us debug
        await this.destroy();

        const parsedHTML = this.md.render(markdown);
        this.element.innerHTML = parsedHTML;

        //loop through all the plugins and render them
        this.signalBus.log('Renderer', 'rendering DOM');
        const hydrationPromises: Promise<Hydration>[] = [];
        for (let i = 0; i < plugins.length; i++) {
            const plugin = plugins[i];
            if (plugin.hydrateComponent) {
                //make a new promise that returns IInstances but adds the plugin name
                hydrationPromises.push(plugin.hydrateComponent(this, errorHandler).then(instances => {
                    return {
                        pluginName: plugin.name,
                        instances,
                    };
                }));
            }
        }

        try {
            const pluginHydrations = await Promise.all(hydrationPromises);
            for (const hydration of pluginHydrations) {
                if (hydration && hydration.instances) {
                    this.instances[hydration.pluginName] = hydration.instances;
                    //registration phase
                    for (const instance of hydration.instances) {
                        this.signalBus.registerPeer(instance);
                    }
                }
            }
            this.signalBus.beginListening();
        } catch (error) {
            console.error('Error in rendering plugins', error);
        }
    }

    async destroy() {
        this.signalBus.reset();
        for (const pluginName of Object.keys(this.instances)) {
            const instances = this.instances[pluginName];
            for (const instance of instances) {
                instance.destroy && await instance.destroy();
            }
        }
        this.instances = {};
    }

}
