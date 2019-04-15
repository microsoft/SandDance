// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

/**
 * Create a new element as a child of another element.
 * @param tagName Tag name of the new tag to create.
 * @param parentElement Reference of the element to append to.
 * @returns new HTMLElement.
 */
export function addEl(tagName: string, parentElement: HTMLElement) {
    const el = document.createElement(tagName);
    parentElement.appendChild(el);
    return el;
}

/**
 * Create a new div HTMLElement as a child of another element.
 * @param parentElement Reference of the element to append to.
 * @param className Optional css class name to apply to the div.
 */
export function addDiv(parentElement: HTMLElement, className?: string) {
    const div = addEl('div', parentElement) as HTMLDivElement;
    if (className) {
        div.className = className;
    }
    return div;
}
