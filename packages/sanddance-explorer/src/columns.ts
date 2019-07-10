import { SandDance } from "@msrvida/sanddance-react";
import { strings } from "./language";

export function ensureColumnsExist(insightColumns: SandDance.types.InsightColumns, actualColumns: SandDance.types.Column[]) {
    //ensure columns exist
    for (let role in insightColumns) {
        let columnName = insightColumns[role];
        let column = actualColumns.filter(c => c.name === columnName)[0];
        if (!column) {
            delete insightColumns[role];
        }
    }
}

export function ensureColumnsPopulated(chart: SandDance.types.Chart, insightColumns: SandDance.types.InsightColumns, actualColumns: SandDance.types.Column[]) {
    //ensure columns are populated
    const firstColumn = actualColumns[0];
    const firstColumnName = firstColumn && firstColumn.name;
    const ensureColumn = (role: SandDance.types.InsightColumnRoles) => {
        if (!insightColumns[role]) {
            insightColumns[role] = firstColumnName;
        }
    };
    switch (chart) {
        case 'barchart':
            ensureColumn('x');
            break;
        case 'density':
        case 'scatterplot':
        case 'stacks':
            ensureColumn('x');
            ensureColumn('y');
            break;
        case 'treemap':
            if (!insightColumns.size) {
                for (let i = 0; i < actualColumns.length; i++) {
                    let c = actualColumns[i];
                    if (c.quantitative) {
                        insightColumns.size = c.name;
                        break;
                    }
                }
            }
            if (!insightColumns.size) {
                //error - no numeric column
                return [strings.errorColumnMustBeNumeric];
            }
            break;
    }
}
