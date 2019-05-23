// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import powerbi from "powerbi-visuals-api";

export function convertTableToObjectArray(table: powerbi.DataViewTable) {
    const columnNames = table.columns.map(c => c.displayName);
    const data = table.rows.map(row => {
        const o: object = {};
        columnNames.forEach((cn, i) => {
            o[cn] = row[i];
        });
        return o;
    });
    return data;
}
