// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import powerbi from "powerbi-visuals-api";
import { SandDance, util } from "@msrvida/sanddance-explorer";

export function convertTableToObjectArray(table: powerbi.DataViewTable, oldData: object[], host: powerbi.extensibility.visual.IVisualHost) {
    let different: boolean;
    if (oldData) {
        different = table.rows.length !== oldData.length;
    } else {
        different = true;
    }
    const columnNames = table.columns.map(c => c.displayName);
    const data = table.rows.map((row, ri) => {
        const newObject: object = {};
        columnNames.forEach((cn, ci) => {
            const value = row[ci];
            newObject[cn] = value;
            if (!different) {
                const oldObject = oldData && oldData[ri];
                if (oldObject[cn] !== value) {
                    different = true;
                }
            }
        });
        newObject[SandDance.constants.FieldNames.PowerBISelectionId] = host.createSelectionIdBuilder().withTable(table, ri).createSelectionId();
        if (!different && ri === 0) {
            //check that all keys are the same
            const oldKeys = Object.keys(oldData[0]).filter(key => !SandDance.util.isInternalFieldName(key, true));
            const newKeys = Object.keys(newObject).filter(key => !SandDance.util.isInternalFieldName(key, true));
            if (!util.deepCompare(oldKeys, newKeys)) {
                different = true;
            }
        }
        return newObject;
    });
    return { data, different };
}
