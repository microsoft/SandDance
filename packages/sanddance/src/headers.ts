/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Headers } from './types';
import { Presenter, PresenterElement } from '@msrvida/vega-morphcharts';

export function ensureHeaders(presenter: Presenter, headers: Headers) {
    const vegaControls = presenter.getElement(PresenterElement.vegaControls);
    conditionalHeader(!!vegaControls.querySelectorAll('.vega-bindings > *').length, vegaControls, headers.chart);
    const legend = presenter.getElement(PresenterElement.legend);
    conditionalHeader(!!legend.children.length, legend, headers.legend);
}

function conditionalHeader(condition: boolean, element: HTMLElement, header: string) {
    const existing = existingHeader(element, header);
    if (condition && !existing) {
        addHeader(element, header);
    }
    if (!condition && existing) {
        existing.remove();
    }
}

function addHeader(element: HTMLElement, header: string) {
    const h = document.createElement('h4');
    h.innerHTML = header;
    element.insertAdjacentElement('beforebegin', h);
}

function existingHeader(element: HTMLElement, header: string) {
    const { previousElementSibling } = element;
    if (previousElementSibling && previousElementSibling.innerHTML === header) {
        return previousElementSibling;
    }
}
