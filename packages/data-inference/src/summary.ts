/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Column } from '@msrvida/chart-types';

export function getPandasHead(columns: Column[], data: object[]) {
    const numRows = 5;  // Number of rows as in `head(5)` from pandas
    const columnWidths = columns.map(col => col.name.length);

    // Update column widths based on the maximum length of data in each column
    data.slice(0, numRows).forEach(row => {
        columns.forEach((col, idx) => {
            const cellLength = (row[col.name] !== null && row[col.name] !== undefined) ? row[col.name].toString().length : 0;
            columnWidths[idx] = Math.max(columnWidths[idx], cellLength);
        });
    });

    // Create the header row
    const headerRow = columns.map((col, idx) => col.name.padEnd(columnWidths[idx], ' ')).join(' | ');
    let output = headerRow + '\n';

    // Format each data row
    data.slice(0, numRows).forEach((row, rowIndex) => {
        const formattedRow = columns.map((col, idx) => {
            const cellValue = row[col.name] === null ? '' : row[col.name].toString();
            // Right-align numeric columns, left-align others
            return col.type === 'number' || col.type === 'integer' ?
                cellValue.padStart(columnWidths[idx], ' ') :
                cellValue.padEnd(columnWidths[idx], ' ');
        }).join(' | ');
        output += formattedRow + '\n';
    });

    return output;
}
