// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DataContent, DataFile } from './interfaces';
import { SandDance } from '@msrvida/sanddance-react';

export interface ColumnsAndScheme {
    scheme: string;
    columns: SandDance.types.InsightColumns;
}

export const loadDataFile = (dataFile: DataFile) => new Promise<[DataContent, ColumnsAndScheme]>((resolve, reject) => {
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

export const loadDataArray = (data: object[]) => new Promise<[DataContent, ColumnsAndScheme]>((resolve, reject) => {
    const columns = SandDance.util.getColumnsFromData(data);
    resolve([{ data, columns }, getInsightColumns(columns)]);
});

function getInsightColumns(columnArray: SandDance.types.Column[]): ColumnsAndScheme {
    let scheme: string;
    const colorColumn = columnArray[3] as SandDance.types.Column;
    if (colorColumn) {
        scheme = colorColumn.quantitative ? 'redyellowgreen' : 'category20';
    }

    const columns: SandDance.types.InsightColumns = {
        uid: columnArray[0].name,
        x: columnArray[1].name,
        y: columnArray[2] && columnArray[2].name,
        color: colorColumn && colorColumn.name,
        z: columnArray[4] && columnArray[4].name
    };
    const numericColumn = columnArray.filter(c => c.quantitative)[0];
    if (numericColumn) {
        columns.size = numericColumn.name;
    }

    return { scheme, columns };
}
