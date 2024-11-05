/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { definePlugin, Plugin } from '../factory';
import { sanitizedHTML } from './sanitize';

interface Preset {
    name: string;
    description?: string;
    state: { [signalName: string]: unknown };
}

interface PresetsInstance {
    element: HTMLUListElement;
}

export const presetsPlugin: Plugin = {
    name: 'presets',
    initializePlugin: (md) => definePlugin(md, 'presets'),
    fence: (token, idx) => {
        const spec = JSON.parse(token.content.trim());
        const pluginId = `preset-${idx}`;
        return sanitizedHTML('div', { id: pluginId, class: 'presets' }, JSON.stringify(spec));
    },
    hydrateComponent: async (renderer, errorHandler) => {
        const instances: PresetsInstance[] = [];
        const containers = renderer.element.querySelectorAll('.presets');
        for (const [index, container] of containers.entries()) {
            if (!container.textContent) continue;

            let presets: Preset[];
            try {
                presets = JSON.parse(container.textContent) as Preset[];
            } catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'presets', index, 'parse', container);
                continue;
            }
            if (!Array.isArray(presets)) {
                container.innerHTML = '<div class="error">Expected an array of presets</div>';
                continue;
            }
            //clear the container
            container.innerHTML = '';
            const ul = document.createElement('ul');
            container.appendChild(ul);
            for (const preset of presets) {
                //make a button for each preset
                const li = document.createElement('li');
                if (!preset.name || !preset.state) {
                    const span = document.createElement('span');
                    span.className = 'error';
                    span.textContent = 'Each preset must have a name and state';
                    li.appendChild(span);
                } else {
                    const button = document.createElement('button');
                    button.textContent = preset.name;
                    button.onclick = () => {
                        renderer.signalBus.setState(preset.state);
                    };
                    li.appendChild(button);
                    li.appendChild(document.createTextNode('\u00A0'));
                    if (preset.description) {
                        const description = document.createElement('span');
                        description.textContent = preset.description;
                        li.appendChild(description);
                    }
                }
                ul.appendChild(li);
            }
            instances.push({ element: ul });
        }
        return {
            pluginName: presetsPlugin.name,
            instances,
        };
    },
};
