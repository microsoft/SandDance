// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import powerbi from "powerbi-visuals-api";
import { SandDance, util } from "@msrvida/sanddance-explorer";

export function convertTableToObjectArray(table: powerbi.DataViewTable, oldData: object[]) {
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
        if (!different && ri === 0) {
            //check that all keys are the same
            const oldKeys = Object.keys(oldData[0]).filter(key => key !== SandDance.VegaDeckGl.constants.GL_ORDINAL);
            const newKeys = Object.keys(newObject);
            if (!util.deepCompare(oldKeys, newKeys)) {
                different = true;
            }
        }
        return newObject;
    });
    return { data, different };
}
