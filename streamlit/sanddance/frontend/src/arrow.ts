import { ArrowTable } from "streamlit-component-lib";

export const convertArrowTableToRows = (arrowTable: ArrowTable): any[] => {
    const rows: any[] = [];
    const table = arrowTable.table;
    const numRows = arrowTable.dataRows;

    if (table.schema) {
        const columnNames = table.schema.fields.map(field => field.name);

        for (let batch of table.batches) {
            for (let i = 0; i < numRows; ++i) {
                const row: { [key: string]: any } = {};
                for (let colName of columnNames) {
                    const colIndex = table.schema.fields.findIndex(field => field.name === colName);
                    const columnData = batch.getChildAt(colIndex);
                    if (columnData) {
                        const cellValue = columnData.get(i);
                        row[colName] = typeof cellValue === 'bigint' ? String(cellValue) : cellValue;
                    }
                }
                rows.push(row);
            }
        }
    }

    return rows;
};
