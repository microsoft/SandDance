import { Column } from '@msrvida/chart-types';

function createSpaces(num: number): string {
    return Array(num + 1).join(' ');  // Create a string of spaces of length `num`
}

export namespace pandasSimulation {
    export function head(columns: Column[], data: object[], maxWidth: number = 80): string {
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
            const columnSpace = columnWidths[idx] + 1;  // account for one space between columns
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
            const headerRow = group.map(col => col.name.padStart(columnWidths[columns.indexOf(col)], ' ')).join(createSpaces(1));  // 1 space between columns
            let section = createSpaces(4) + headerRow + (groupIndex < columnGroups.length - 1 ? ' \\' : '') + '\n';

            // Format data rows
            data.slice(0, numRows).forEach((row, rowIndex) => {
                const rowNumber = rowIndex.toString().padEnd(4);  // 4 spaces for row index
                const formattedRow = group.map(col => {
                    const cellValue = row[col.name] == null ? '' : row[col.name].toString(); //double equals to catch null and undefined
                    return cellValue.padStart(columnWidths[columns.indexOf(col)], ' ');
                }).join(createSpaces(1));  // 1 space between columns
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

    export function info(columns: Column[], data: object[]): string {
        const numRows = data.length;
        const output: string[] = [];

        output.push('DataFrame Summary:');
        output.push(`Number of rows: ${numRows}`);
        output.push(`Number of columns: ${columns.length}\n`);

        const columnInfo = columns.map((col) => {
            const nonNullCount = data.filter(row => row[col.name] != null).length;
            const dtype = typeof data.find(row => row[col.name] != null)?.[col.name];

            return `${col.name}: ${dtype} (${nonNullCount} non-null)`;
        });

        output.push(columnInfo.join('\n'));

        // Estimate memory usage
        const memoryUsage = columns.reduce((total, col) => {
            const exampleValue = data.find(row => row[col.name] != null)?.[col.name];
            if (exampleValue == null) return total;

            const size = new Blob([exampleValue.toString()]).size;
            return total + (size * numRows);
        }, 0);

        output.push(`\nEstimated memory usage: ${(memoryUsage / 1024).toFixed(2)} KB`);

        return output.join('\n');
    }
}
