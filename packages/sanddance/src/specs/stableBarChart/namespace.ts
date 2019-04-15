// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
export class NameSpace {
    public nested: string;
    public stacked: string;
    public __column: string;
    public __row: string;

    constructor(nameSpace = '') {
        ['nested', 'stacked', '__column', '__row'].forEach(name => {
            this[name] = `${name}${nameSpace}`;
        });
    }
}
