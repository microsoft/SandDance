/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { definePlugin, IInstance, Plugin } from '../factory';
import { sanitizedHTML } from '../sanitize';

export interface ImageSpec {
    srcSignalName: string;
    alt?: string;
    width?: number;
    height?: number;
}

interface ImageInstance {
    id: string;
    spec: ImageSpec;
    element: HTMLImageElement;
    spinner: HTMLDivElement;
}

enum ImageOpacity {
    full = '1',
    loading = '0.1',
    error = '0.5',
}

export const imagePlugin: Plugin = {
    name: 'image',
    initializePlugin: (md) => definePlugin(md, 'image'),
    fence: (token, idx) => {
        const ImageId = `Image-${idx}`;
        return sanitizedHTML('div', { id: ImageId, class: 'image' }, token.content.trim());
    },
    hydrateComponent: async (renderer, errorHandler) => {
        const imageInstances: ImageInstance[] = [];
        const containers = renderer.element.querySelectorAll('.image');
        for (const [index, container] of containers.entries()) {
            if (!container.textContent) continue;
            try {
                const spec: ImageSpec = JSON.parse(container.textContent);
                const element = document.createElement('img');
                const spinner = document.createElement('div');
                spinner.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="gray" stroke-width="2" fill="none" stroke-dasharray="31.4" stroke-dashoffset="0">
                            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                        </circle>
                    </svg>`;

                if (spec.alt) element.alt = spec.alt;
                if (spec.width) element.width = spec.width;
                if (spec.height) element.height = spec.height;
                element.onload = () => {
                    spinner.style.display = 'none';
                    element.style.opacity = ImageOpacity.full;
                };
                element.onerror = () => {
                    spinner.style.display = 'none';
                    element.style.opacity = ImageOpacity.error;
                    errorHandler(new Error('Image failed to load'), 'image', index, 'load', container, element.src);
                };

                (container as HTMLElement).style.position = 'relative';
                spinner.style.position = 'absolute';
                container.innerHTML = '';
                container.appendChild(spinner);
                container.appendChild(element);

                const imageInstance: ImageInstance = { id: container.id, spec, element, spinner };
                imageInstances.push(imageInstance);
            } catch (e) {
                container.innerHTML = `<div class="error">${e.toString()}</div>`;
                errorHandler(e, 'Image', index, 'parse', container);
            }
        }
        const instances: IInstance[] = imageInstances.map((imageInstance, index) => {
            const { element, spinner, id, spec } = imageInstance;
            return {
                id,
                initialSignals: [
                    {
                        name: spec.srcSignalName,
                        value: null,
                        priority: -1,
                        isData: false,
                    }
                ],
                destroy: async () => {
                    if (element) {
                        element.remove();
                    }
                    if (spinner) {
                        spinner.remove();
                    }
                },
                recieveBatch: async (batch, from) => {
                    if (spec.srcSignalName in batch) {
                        const src = batch[spec.srcSignalName].value;
                        if (src) {
                            spinner.style.display = '';
                            element.src = src.toString();
                            element.style.opacity = ImageOpacity.loading;
                        } else {
                            element.src = '';   //TODO placeholder image
                            spinner.style.display = 'none';
                            element.style.opacity = ImageOpacity.full;
                        }
                    }
                }
            }
        });
        return instances;
    }
};
