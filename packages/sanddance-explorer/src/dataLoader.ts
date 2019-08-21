// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DataContent, DataFile } from './interfaces';
import { SandDance } from '@msrvida/sanddance-react';

export const loadDataFile = (dataFile: DataFile) => new Promise<DataContent>((resolve, reject) => {
    const vega = SandDance.VegaDeckGl.base.vega;
    const loader = vega.loader();

    function handleRawText(text: string) {
        const data = vega.read(text, { type: dataFile.type, parse: "auto" });
        loadDataArray(data).then(resolve).catch(reject);
    };

    if (dataFile.dataUrl) {
        loader.load(dataFile.dataUrl).then(handleRawText).catch(reject);
    } else if (dataFile.rawText) {
        handleRawText(dataFile.rawText);
    } else {
        reject('dataFile object must have either dataUrl or rawText property set.');
    }
});

export const loadDataArray = (data: object[]) => new Promise<DataContent>((resolve, reject) => {
    const columns = SandDance.util.getColumnsFromData(data).sort((a, b) => a.name.localeCompare(b.name));
    resolve({ data, columns });
});
