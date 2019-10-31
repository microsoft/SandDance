// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    DataContent,
    DataFile,
    DataFileType,
    DateWithSource
} from './interfaces';
import { SandDance } from '@msrvida/sanddance-react';

export const loadDataFile = (dataFile: DataFile) => new Promise<DataContent>((resolve, reject) => {
    const vega = SandDance.VegaDeckGl.base.vega;
    const loader = vega.loader();

    function handleRawText(text: string) {
        const data = vega.read(text, { type: dataFile.type, parse: {} });
        loadDataArray(data, dataFile.type).then(resolve).catch(reject);
    }

    if (dataFile.dataUrl) {
        loader.load(dataFile.dataUrl).then(handleRawText).catch(reject);
    } else if (dataFile.rawText) {
        handleRawText(dataFile.rawText);
    } else {
        reject('dataFile object must have either dataUrl or rawText property set.');
    }
});

export const loadDataArray = (data: object[], type: DataFileType) => new Promise<DataContent>((resolve, reject) => {
    if (type === 'csv' || type === 'tsv') {
        //convert empty strings to null so that vega.inferType will get dates
        data.forEach(row => {
            for (let column in row) {
                if (row[column] === '') {
                    row[column] = null;
                }
            }
        });
    }
    const columns = SandDance.util.getColumnsFromData(data).sort((a, b) => a.name.localeCompare(b.name));
    const dateColumns = columns.filter(c => c.type === 'date');
    if (dateColumns.length) {
        data.forEach(obj => {
            dateColumns.forEach(c => {
                const input = obj[c.name];
                if (input !== null) {
                    const d = new Date(input) as DateWithSource;
                    d.input = input;
                    obj[c.name] = d;
                }
            });
        });
    }
    resolve({ data, columns });
});
