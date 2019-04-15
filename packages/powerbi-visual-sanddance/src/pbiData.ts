// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
module powerbi.extensibility.visual {

    interface OrdinalColumn extends SandDance.types.Column {
        ordinal: number;
    }

    export type VegaTypeInference = 'boolean' | 'date' | 'integer' | 'number' | 'string';

    export function convertColumnType(columnType: ValueTypeDescriptor): VegaTypeInference {
        if (columnType.bool) return 'boolean';
        if (columnType.dateTime) return 'date';
        if (columnType.integer) return 'integer';
        if (columnType.numeric) return 'number';
        return 'string';
    }

    export function getColumnsWithRoles(columns: DataViewMetadataColumn[], roles: string[]) {
        const metaDataColumns = {} as SandDance.types.SpecColumns;
        roles.forEach(role => {
            for (var i = 0; i < columns.length; i++) {
                let c = columns[i];
                if (c.roles[role]) {
                    let uCol: OrdinalColumn = {
                        name: c.displayName,
                        ordinal: i,
                        type: convertColumnType(c.type)
                    }
                    metaDataColumns[role] = uCol;
                    return;
                }
            }
        });
        return metaDataColumns;
    }

    export function getDataRows(columns: SandDance.types.SpecColumns, rows: DataViewTableRow[]) {
        const data = rows.map(row => {
            const obj = {};
            for (let key in columns) {
                let col = columns[key] as OrdinalColumn;
                obj[col.name] = row[col.ordinal];
            }
            return obj;
        });
        return data;
    }

}
