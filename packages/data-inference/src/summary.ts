import { Column } from '@msrvida/chart-types';

function createSpaces(num: number): string {
    return Array(num + 1).join(' ');  // Create a string of spaces of length `num`
}

export function getPandasHead(columns: Column[], data: object[]): string {
    const numRows = 5;  // Number of rows as in `head(5)` from pandas
    // Calculate maximum width for each column
    const columnWidths = columns.map(col =>
        Math.max(
            col.name.length,
            ...data.slice(0, numRows).map(row =>
                row[col.name]?.toString().length || 0,
            ),
        ),
    );

    // Create the header row with right-aligned column names
    const headerRow = columns.map((col, idx) =>
        col.name.padStart(columnWidths[idx], ' ')
    ).join(createSpaces(3));  // 3 spaces between columns
    let output = createSpaces(4) + headerRow + '\n';  // 4 spaces before header

    // Format each data row with row numbers and right-aligned data
    data.slice(0, numRows).forEach((row, rowIndex) => {
        const rowNumber = rowIndex.toString().padEnd(4);  // 4 spaces for row index
        const formattedRow = columns.map((col, idx) => {
            const cellValue = row[col.name] === null ? '' : row[col.name].toString();
            // Right-align data in each column
            return cellValue.padStart(columnWidths[idx], ' ');
        }).join(createSpaces(3));  // 3 spaces between columns
        output += rowNumber + formattedRow + '\n';
    });

    return output;
}
