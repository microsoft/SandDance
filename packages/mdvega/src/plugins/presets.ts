/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Batch, definePlugin, IInstance, Plugin, PrioritizedSignal } from '../factory';
import { sanitizedHTML } from '../sanitize';

interface Preset {
    name: string;
    description?: string;
    state: { [signalName: string]: unknown };
}

export type PresetsSpec = Preset[];

interface PresetsInstance {
    id: string;
    presets: Preset[];
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
        const presetsInstances: PresetsInstance[] = [];
        const containers = renderer.element.querySelectorAll('.presets');
        for (const [index, container] of containers.entries()) {
            if (!container.textContent) continue;

            const id = `presets${index}`;
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
            const presetsInstance: PresetsInstance = { id, presets, element: ul };
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
                        const batch: Batch = {};
                        for (const [signalName, value] of Object.entries(preset.state)) {
                            batch[signalName] = { value, isData: false };
                        }
                        renderer.signalBus.broadcast(id, batch);
                    };
                    li.appendChild(button);
                    li.appendChild(document.createTextNode('\u00A0'));
                    if (preset.description) {
                        button.title = preset.description;
                    }
                }
                ul.appendChild(li);
            }
            presetsInstances.push(presetsInstance);
        }
        const instances: IInstance[] = presetsInstances.map((presetsInstance, index) => {
            const initialSignals: PrioritizedSignal[] = presetsInstance.presets.flatMap(preset => {
                return Object.keys(preset.state).map(signalName => {
                    return {
                        name: signalName,
                        value: null,
                        priority: -1,
                        isData: undefined,  // we do not know if it is data or not
                    };
                });
            });
            return {
                ...presetsInstance,
                initialSignals,
                broadcastComplete: async () => {
                    //populate state from the renderer.signalBus.signalDeps
                    const state: { [signalName: string]: unknown } = {};
                    for (const signalName of Object.keys(renderer.signalBus.signalDeps)) {
                        state[signalName] = renderer.signalBus.signalDeps[signalName].value;
                    }
                    // highlight any presets that have the same signals and values as the current state
                    setAllPresetsActiveState(presetsInstance, state);
                },
            };
        });
        return instances;
    },
};

function isPresetActive(preset: Preset, state: { [signalName: string]: unknown }) {
    for (const [signalName, value] of Object.entries(preset.state)) {
        if (state[signalName] !== value) {
            return false;
        }
    }
    return true;
}

function setAllPresetsActiveState(presetsInstance: PresetsInstance, state: { [signalName: string]: unknown }) {
    for (const [presetIndex, preset] of presetsInstance.presets.entries()) {
        const { classList } = presetsInstance.element.children[presetIndex];
        if (isPresetActive(preset, state)) {
            classList.add('active');
        } else {
            classList.remove('active');
        }
    }
}
