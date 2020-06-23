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
        let data: object[];
        try {
            data = vega.read(text, { type: dataFile.type, parse: {} });
        }
        catch (e) {
            reject(e);
        }
        if (data) {
            loadDataArray(data, dataFile.type).then(dc => {
                if (dataFile.snapshotsUrl) {
                    fetch(dataFile.snapshotsUrl)
                        .then(response => response.json())
                        .then(snapshots => {
                            dc.snapshots = snapshots;
                            resolve(dc);
                        })
                        .catch(reject);
                } else if (dataFile.snapshots) {
                    dc.snapshots = dataFile.snapshots;
                    resolve(dc);
                } else {
                    resolve(dc);
                }
            }).catch(reject);
        }
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
    const parse = type === 'csv' || type === 'tsv';
    if (parse) {
        //convert empty strings to null so that vega.inferType will get dates
        data.forEach(row => {
            for (let column in row) {
                if (row[column] === '') {
                    row[column] = null;
                }
            }
        });
    }
    const columns = SandDance.util.
        getColumnsFromData(SandDance.VegaDeckGl.base.vega.inferTypes, data)
        .filter(c => c.name && c.name.trim())
        .sort((a, b) => a.name.localeCompare(b.name));
    if (parse) {
        const booleanColumns = columns.filter(c => c.type === 'boolean');
        const dateColumns = columns.filter(c => c.type === 'date');
        const numericColumns = columns.filter(c => c.type === 'integer' || c.type === 'number');
        data.forEach(obj => {
            booleanColumns.forEach(c => {
                obj[c.name] = ('' + obj[c.name]).toLowerCase() === 'true';
            });
            dateColumns.forEach(c => {
                const input = obj[c.name];
                if (input !== null) {
                    const d = new Date(input) as DateWithSource;
                    d.input = input;
                    obj[c.name] = d;
                }
            });
            numericColumns.forEach(c => {
                const n = parseFloat(obj[c.name]);
                obj[c.name] = isNaN(n) ? null : n;
            });
        });
    }
    resolve({ data, columns });
});
