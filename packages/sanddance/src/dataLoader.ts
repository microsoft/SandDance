/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import {
    ColumnTypeMap,
    DataContent,
    DataFile,
    DataFileType,
    DateWithSource,
} from './types';
import * as VegaMorphCharts from '@msrvida/vega-morphcharts';
import { getColumnsFromData } from './util';

export const loadData = (
    data: DataFile | object[],
    loadFinal: (dataFile: DataFile, dataContent: DataContent) => void,
    reject: (reason?: any) => void, 
    columnTypes?: ColumnTypeMap,
) => {
    if (Array.isArray(data)) {
        return loadDataArray(data, 'json', columnTypes)
            .then(result => {
                const dataFile: DataFile = {
                    type: 'json',
                };
                loadFinal(dataFile, result);
            })
            .catch(reject);
    } else {
        const dataFile = data as DataFile;
        return loadDataFile(dataFile, columnTypes)
            .then(result => loadFinal(dataFile, result))
            .catch(reject);
    }
};

export const loadDataFile = (dataFile: DataFile, columnTypes?: ColumnTypeMap) => new Promise<DataContent>((resolve, reject) => {
    const vega = VegaMorphCharts.base.vega;
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
            loadDataArray(data, dataFile.type, columnTypes).then(dc => {
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

export const loadDataArray = (data: object[], type: DataFileType, columnTypes?: ColumnTypeMap) => new Promise<DataContent>((resolve, reject) => {
    const parse = type === 'csv' || type === 'tsv';
    if (parse) {
        //convert empty strings to null so that vega.inferType will get dates
        data.forEach(row => {
            for (const column in row) {
                if (row[column] === '') {
                    row[column] = null;
                }
            }
        });
    }
    const columns = getColumnsFromData(VegaMorphCharts.base.vega.inferTypes, data, columnTypes)
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