import { Column } from '@msrvida/chart-types';
import { TypeInference } from 'vega-typings/types';

class Table {
    private columns: string[];
    private columnWidths: number[];
    private rows: string[][];
    private maxWidth: number;

    constructor(columns: string[], rows: string[][], maxWidth: number = 80) {
        this.columns = columns;
        this.rows = rows;
        this.maxWidth = maxWidth;

        // Calculate maximum width for each column
        this.columnWidths = this.columns.map((col, idx) =>
            Math.max(
                col.length,
                ...this.rows.map(row => row[idx]?.length || 0),
            ),
        );
    }

    private createSpaces(num: number): string {
        return Array(num + 1).join(' ');
    }

    private groupColumns(): string[][] {
        let cumulativeWidth = 0;
        const columnGroups: string[][] = [];
        let currentGroup: string[] = [];

        this.columns.forEach((col, idx) => {
            const columnSpace = this.columnWidths[idx] + 1; // account for one space between columns
            if (cumulativeWidth + columnSpace > this.maxWidth && currentGroup.length > 0) {
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

        return columnGroups;
    }

    private formatRow(row: string[], group: string[]): string {
        return group.map(col => {
            const idx = this.columns.indexOf(col);
            const cellValue = row[idx] == null ? '' : row[idx].toString();
            return cellValue.padStart(this.columnWidths[idx], ' ');
        }).join(this.createSpaces(1));
    }

    public render(): string {
        const output: string[] = [];
        const columnGroups = this.groupColumns();

        columnGroups.forEach((group, groupIndex) => {
            const headerRow = group.map(col => col.padStart(this.columnWidths[this.columns.indexOf(col)], ' ')).join(this.createSpaces(1));
            let section = this.createSpaces(4) + headerRow + (groupIndex < columnGroups.length - 1 ? ' \\' : '') + '\n';

            this.rows.forEach((row, rowIndex) => {
                const rowNumber = rowIndex.toString().padEnd(4);
                section += rowNumber + this.formatRow(row, group) + '\n';
            });

            output.push(section);
            if (groupIndex < columnGroups.length - 1) {
                output.push('\n');
            }
        });

        return output.join('');
    }
}

export namespace pandasSimulation {

    // Mapping TypeScript types to Python-like dtypes
    const typeMapping: { [key in TypeInference]: string } = {
        boolean: 'bool',
        number: 'float64',  // Assuming 'number' is used for floating-point numbers
        date: 'datetime64[ns]',
        string: 'object',
        integer: 'int64',
    };

    export function head(columns: Column[], data: object[], maxWidth: number = 80): string {
        const numRows = 5;  // Number of rows as in `head(5)` from pandas
        const top = data.slice(0, numRows);  // Get the top `numRows` rows

        // Extract column names and rows for the table
        const columnNames = columns.map(col => col.name);
        const rows = top.map(row => columns.map(col => row[col.name]?.toString() || ''));

        // Create and render the table
        const table = new Table(columnNames, rows, maxWidth);
        return table.render();
    }

    export function info(columns: Column[], data: object[], maxWidth: number = 80): string {
        const numRows = data.length;
        const output: string[] = [];

        // Summary header
        output.push('<class \'pandas.core.frame.DataFrame\'>');
        output.push(`Index: ${numRows} entries, 0 to ${numRows - 1}`);
        output.push(`Data columns (total ${columns.length} columns):\n`);

        // Column headers and details
        const columnHeaders = ['#', 'Column', 'Non-Null Count', 'Dtype'];
        const rows = columns.map((col, idx) => {
            const nonNullCount = col.stats.nonNull.toString();
            const dtype = typeMapping[col.type as TypeInference] || 'unknown';
            return [idx.toString(), col.name, `${nonNullCount} non-null`, dtype];
        });

        // Create and render the table
        const table = new Table(columnHeaders, rows, maxWidth);
        output.push(table.render());

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
