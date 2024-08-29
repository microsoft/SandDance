/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

export function sanitizedHTML(tagName: string, attributes: { [key: string]: string }, content: string) {

    // Create a temp element with the specified tag name
    const element = document.createElement(tagName);

    // Iterate over the attribute list and set each attribute
    Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
    });

    // Set the textContent to automatically escape the content
    element.textContent = content;

    // Return the outer HTML of the element
    return element.outerHTML;
}
