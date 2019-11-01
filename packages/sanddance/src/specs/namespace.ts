// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
export class BarChartNameSpace {
    public bucket: string;
    public stacked: string;
    public __compartment: string;
    public __level: string;

    constructor(nameSpace = '') {
        ['bucket', 'stacked', '__compartment', '__level'].forEach(name => {
            this[name] = `${name}${nameSpace}`;
        });
    }
}
