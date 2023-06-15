// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
///<reference path='../dist/umd/data-inference.d.ts' />
///<reference path='vega.d.ts' />

declare const vega: {
    inferTypes: typeof Vega.inferTypes;
    loader: typeof Vega.loader;
    parse: typeof Vega.parse;
    read: typeof Vega.read;
    View: typeof Vega.View;
};

vega.loader().load('../../../sample-data/titanicmaster.tsv').then(text => {
    const data = vega.read(text, { type: 'tsv' });
    
    const columns = DataInference.getColumnsFromData(vega.inferTypes, data);

    console.log(columns);
});
