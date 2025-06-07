/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Batch, definePlugin, IInstance, Plugin } from '../factory';
import { sanitizedHTML } from '../sanitize';

interface DropdownInstance {
    id: string;
    spec: DropdownSpec;
    element: HTMLSelectElement;
}

interface DynamicDropdownOptions {
    dataSignalName: string;
    fieldName: string;
}

export interface DropdownSpec {
    name: string;
    value?: string | string[];
    label?: string;
    //one of either static or dynamic options must be set
    options?: string[];
    multiple?: boolean;
    size?: number;
    dynamicOptions?: DynamicDropdownOptions;
}

export const dropdownPlugin: Plugin = {
    name: 'dropdown',
    initializePlugin: (md) => definePlugin(md, 'dropdown'),
    fence: (token, idx) => {
        const DropdownId = `Dropdown-${idx}`;
        return sanitizedHTML('div', { id: DropdownId, class: 'dropdown' }, token.content.trim());
    },
    hydrateComponent: async (renderer, errorHandler) => {
        const dropdownInstances: DropdownInstance[] = [];
        const containers = renderer.element.querySelectorAll('.dropdown');
        for (const [index, container] of containers.entries()) {
            if (!container.textContent) continue;

            try {
                const spec: DropdownSpec = JSON.parse(container.textContent);

                const html = `<form class="vega-bindings">
                    <div class="vega-bind">
                        <label>
                            <span class="vega-bind-name">${spec.label || spec.name}</span>
                            <select class="vega-bind-select" id="${spec.name}" name="${spec.name}" ${spec.multiple ? 'multiple' : ''} size="${spec.size || 1}">
${getOptions(spec.multiple, spec.options, spec.value)}
                            </select>
                        </label>
                    </div>
                </form>`;
                container.innerHTML = html;
                const element = container.querySelector('select') as HTMLSelectElement;

                const dropdownInstance: DropdownInstance = { id: container.id, spec, element };
                dropdownInstances.push(dropdownInstance);
            } catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'Dropdown', index, 'parse', container);
                continue;
            }
        }
        const instances: IInstance[] = dropdownInstances.map((dropdownInstance, index) => {
            const { element, spec } = dropdownInstance;
            const initialSignals = [{
                name: spec.name,
                value: spec.value || null,
                priority: 1,
                isData: false,
            }];
            if (spec.dynamicOptions) {
                initialSignals.push({
                    name: spec.dynamicOptions.dataSignalName,
                    value: null,
                    priority: -1,
                    isData: true,
                });
            }
            return {
                ...dropdownInstance,
                initialSignals,
                recieveBatch: async (batch) => {
                    const { dynamicOptions } = spec;
                    if (dynamicOptions?.dataSignalName) {
                        const newData = batch[dynamicOptions.dataSignalName]?.value as object[];
                        if (newData) {
                            //pluck the field from the data and add options to the select
                            let hasFieldName = false;
                            //remove duplicates from the options array
                            const uniqueOptions = new Set<string>();
                            newData.forEach((d) => {
                                //check if the field exists in the data
                                if (d.hasOwnProperty(dynamicOptions.fieldName)) {
                                    hasFieldName = true;
                                    uniqueOptions.add(d[dynamicOptions.fieldName]);
                                }
                            });
                            if (hasFieldName) {
                                const options = Array.from(uniqueOptions);
                                const existingSelection = spec.multiple ? Array.from(element.selectedOptions).map(option => option.value) : element.value;
                                element.innerHTML = getOptions(spec.multiple, options, existingSelection);
                                if (!spec.multiple) {
                                    element.value = (batch[spec.name]?.value as string) || options[0];
                                }
                            } else {
                                //if the field doesn't exist, set the select to the first option
                                element.innerHTML = `<option value="">Field "${dynamicOptions.fieldName}" not found</option>`;
                                element.value = '';
                            }
                        }
                    }
                    if (batch[spec.name]) {
                        const value = batch[spec.name].value as string | string[];
                        if (spec.multiple) {
                            Array.from(element.options).forEach((option) => {
                                option.selected = value && (value as string[]).includes(option.value);
                            });
                        } else {
                            element.value = value as string;
                        }
                    }
                },
                beginListening() {
                    //wire up handler to send the selected value to the signal bus
                    element.addEventListener('change', (e) => {
                        const value = spec.multiple
                            ? Array.from((e.target as HTMLSelectElement).selectedOptions).map(option => option.value)
                            : (e.target as HTMLSelectElement).value;
                        const batch: Batch = {
                            [spec.name]: {
                                value,
                                isData: false,
                            },
                        };
                        renderer.signalBus.broadcast(dropdownInstance.id, batch);
                    });
                },
                getCurrentSignalValue: () => {
                    if (spec.multiple) {
                        return Array.from(element.selectedOptions).map(option => option.value);
                    }
                    return element.value;
                },
                destroy: async () => {
                    element.removeEventListener('change', dropdownInstance.element.onchange as EventListener);
                },
            };
        });
        return instances;
    }
};

function getOptions(multiple: boolean, options: string[], selected: string | string[]) {
    if (!options) {
        if (multiple) {
            if (Array.isArray(selected)) {
                options = selected as string[];
            } else {
                if (selected) {
                    options = [selected as string];
                }
            }
        } else {
            if (selected) {
                options = [selected as string];
            }
        }
    }
    if (!options) {
        return '';
    }
    return options.map((option) => {
        let attr = '';
        if (multiple) {
            attr = (selected as string[] || []).includes(option) ? 'selected' : '';
        } else {
            attr = selected === option ? 'selected' : '';
        }
        return `<option value="${option}" ${attr}>${option}</option>`;
    }).join('\n')
}
