import { Column } from '@msrvida/chart-types';
import { TypeInference } from 'vega-typings/types';

function createSpaces(num: number): string {
    return Array(num + 1).join(' ');  // Create a string of spaces of length `num`
}

export namespace pandasSimulation {

    export function head(columns: Column[], data: object[], maxWidth: number = 80): string {
        const numRows = 5;  // Number of rows as in `head(5)` from pandas
        const top = data.slice(0, numRows);  // Get the top `numRows` rows
        const output: string[] = [];  // Array to store output strings

        // Step 1: Calculate maximum width for each column
        const columnWidths = columns.map(col =>
            Math.max(
                col.name.length,
                ...top.map(row => row[col.name]?.toString().length || 0)));

        // Step 2: Group columns into sets that fit within maxWidth
        let cumulativeWidth = 0;
        const columnGroups: Column[][] = [];
        let currentGroup: Column[] = [];

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
            top.forEach((row, rowIndex) => {
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

        // Summary header
        output.push('<class \'pandas.core.frame.DataFrame\'>');
        output.push(`Index: ${numRows} entries, 0 to ${numRows - 1}`);
        output.push(`Data columns (total ${columns.length} columns):\n`);

        // Calculate the column widths for formatting
        const indexWidth = 3;  // Width for the index column (e.g., " # ")
        const nameColWidth = Math.max(6, ...columns.map(col => col.name.length));  // Column name width
        const nonNullCountWidth = 14;  // Fixed width for "Non-Null Count"
        const dtypeWidth = 8;  // Fixed width for dtype

        // Column headers with dynamic width
        output.push(
            ` ${'#'.padEnd(indexWidth, ' ')} ` +
            `${'Column'.padEnd(nameColWidth, ' ')} ` +
            `${'Non-Null Count'.padEnd(nonNullCountWidth, ' ')} ` +
            'Dtype'.padEnd(dtypeWidth, ' '),
        );

        // Separator line with hyphens only under the column titles
        output.push(
            ` ${'-'.repeat(indexWidth)} ` +
            `${'-'.repeat('Column'.length)}${' '.repeat(nameColWidth - 'Column'.length)} ` +
            `${'-'.repeat('Non-Null Count'.length)} ` +
            `${'-'.repeat('Dtype'.length)}`,
        );

        // Mapping TypeScript types to Python-like dtypes
        const typeMapping: { [key in TypeInference]: string } = {
            boolean: 'bool',
            number: 'float64',  // Assuming 'number' is used for floating-point numbers
            date: 'datetime64[ns]',
            string: 'object',
            integer: 'int64',
        };

        // Column details
        columns.forEach((col, idx) => {
            const nonNullCount = col.stats.nonNull;
            const dtype = typeMapping[col.type as TypeInference];  // Map the TypeScript type to the simulated Python dtype
            const nonNullCountStr = `${nonNullCount} non-null`;

            output.push(
                ` ${idx.toString().padEnd(indexWidth, ' ')} ` +
                `${col.name.padEnd(nameColWidth, ' ')} ` +
                `${nonNullCountStr.padEnd(nonNullCountWidth, ' ')} ` +
                dtype.padEnd(dtypeWidth, ' '),
            );
        });

        // Memory usage estimation
        const memoryUsage = columns.reduce((total, col) => {
            const exampleValue = data.find(row => row[col.name] != null)?.[col.name];
            if (exampleValue == null) return total;

            const size = new Blob([exampleValue.toString()]).size;
            return total + (size * numRows);
        }, 0);

        output.push(`\ndtypes: ${columns.filter(col => col.type === 'number').length} float64, ` +
            `${columns.filter(col => col.type === 'integer').length} int64, ` +
            `${columns.filter(col => col.type === 'string').length} object`);

        output.push(`memory usage: ${(memoryUsage / 1024).toFixed(1)} KB`);

        return output.join('\n');
    }
}
