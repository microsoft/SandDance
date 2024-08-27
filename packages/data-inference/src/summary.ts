import { Column } from '@msrvida/chart-types';

function createSpaces(num: number): string {
    return Array(num + 1).join(' ');  // Create a string of spaces of length `num`
}

export function getPandasHead(columns: Column[], data: object[], maxWidth: number = 80): string {
    const numRows = 5;  // Number of rows as in `head(5)` from pandas
    const output: string[] = [];  // Array to store output strings

    // Step 1: Calculate maximum width for each column
    const columnWidths = columns.map(col =>
        Math.max(
            col.name.length,
            ...data.slice(0, numRows).map(row => row[col.name]?.toString().length || 0)));

    // Step 2: Group columns into sets that fit within maxWidth
    let cumulativeWidth = 0;
    const columnGroups = [];
    let currentGroup = [];

    columns.forEach((col, idx) => {
        const columnSpace = columnWidths[idx] + 3;  // account for spaces between columns
        if (cumulativeWidth + columnSpace > maxWidth && currentGroup.length > 0) {
            columnGroups.push(currentGroup);
            cumulativeWidth = columnSpace;
            currentGroup = [col];
        } else {
            cumulativeWidth += columnSpace;
            currentGroup.push(col);
        }
    });

    if (currentGroup.length > 0) {
        columnGroups.push(currentGroup);
    }

    // Step 3: Generate output for each group of columns
    columnGroups.forEach((group, groupIndex) => {
        // Prepare headers and rows for current group
        const headerRow = group.map(col => col.name.padStart(columnWidths[columns.indexOf(col)], ' ')).join(createSpaces(3));
        let section = createSpaces(4) + headerRow + (groupIndex < columnGroups.length - 1 ? ' \\' : '') + '\n';

        // Format data rows
        data.slice(0, numRows).forEach((row, rowIndex) => {
            const rowNumber = rowIndex.toString().padEnd(4);  // 4 spaces for row index
            const formattedRow = group.map(col => {
                const cellValue = row[col.name] === null ? '' : row[col.name].toString();
                return cellValue.padStart(columnWidths[columns.indexOf(col)], ' ');
            }).join(createSpaces(3));
            section += rowNumber + formattedRow + '\n';
        });

        // Add current section to output
        output.push(section);
        if (groupIndex < columnGroups.length - 1) {
            output.push('\n');  // Add an extra line between groups
        }
    });

    return output.join('');  // Join all parts of the output before returning
}
