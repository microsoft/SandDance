/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import MarkdownIt from 'markdown-it';
import { create, plugins } from './factory';
import { SignalBus } from './signalbus';

export interface Handler {
    (): void;
}

export class Renderer {

    public md: MarkdownIt;
    public instances: { [key: string]: unknown[] };
    public signalBus: SignalBus;

    private destroyHandlers: { [key: string]: Handler };

    constructor(public element: HTMLElement) {
        this.md = create();
        this.signalBus = new SignalBus();
        this.instances = {};
        this.destroyHandlers = {};
    }

    registerDestroyer(type: string, handler: Handler) {
        this.destroyHandlers[type] = handler;
    }

    render(markdown: string) {
        //loop through all the destroy handlers and call them. have the key there to help us debug
        this.destroy();

        this.signalBus.resetSignalListeners(); // Reset signal listeners before updating charts

        const parsedHTML = this.md.render(markdown);
        this.element.innerHTML = parsedHTML;

        //loop through all the plugins and render them
        this.signalBus.log('rendering DOM');
        const finals: (void | (() => void))[] = [];
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