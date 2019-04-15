// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
module htmlHelpers {

    export function addDiv(parentElement: HTMLElement, className: string) {
        var div = document.createElement('div');
        div.className = className;
        parentElement.appendChild(div);
        return div;
    }

}
