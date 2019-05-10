// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
module powerbi.extensibility.visual {

    export function getInsight(settings: Settings, size: SandDance.types.Size, specColumns: SandDance.types.SpecColumns) {
        const columns = convertSpecColumnsToInsightColumns(specColumns);
        const view: SandDance.VegaDeckGl.types.View = columns.z ? "3d" : "2d";
        const chart = settings.layout.charttype as SandDance.types.Chart;
        const insight: SandDance.types.Insight = { size, chart, columns, view, signalValues: {} };
        return insight;
    }

    function convertSpecColumnsToInsightColumns(specColumns: SandDance.types.SpecColumns): SandDance.types.InsightColumns {
        const columns = {} as SandDance.types.InsightColumns;
        for (let role in specColumns) {
            columns[role] = specColumns[role].name;
        }
        return columns;
    }

}
