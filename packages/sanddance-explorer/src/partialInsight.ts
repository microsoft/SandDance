/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { SandDance } from '@msrvida/sanddance-react';

export interface RolePrefs {
  [columnName: string]: Partial<SandDance.specs.Insight>;
}

export interface SpecTypePrefs {
  [role: string]: RolePrefs;
}

export interface Prefs {
  [chart: string]: SpecTypePrefs;
}

export function initPrefs(prefs: Prefs, partialInsight: Partial<SandDance.specs.Insight>) {
    if (partialInsight) {
        const specTypePrefs = prefs[partialInsight.chart] || {};
        prefs[partialInsight.chart] = specTypePrefs;

        for (const _role in partialInsight.columns) {
            const role = _role as SandDance.specs.InsightColumnRoles;
            if (role === 'color' || role === 'x') {
                const rolePrefs = specTypePrefs[role] || {};
                specTypePrefs[role] = rolePrefs;
                const column = partialInsight.columns[role];
                const copySignalValue = (signalName: string) => {
                    if (partialInsight.signalValues && partialInsight.signalValues[signalName] && rolePrefs[column]) {
                        const signalValues = rolePrefs[column].signalValues || {};
                        signalValues[signalName] = partialInsight.signalValues[signalName];
                        rolePrefs[column].signalValues = signalValues;
                    }
                };

                switch (role) {
                    case 'color':
                        rolePrefs[column] = {
                            scheme: partialInsight.scheme,
                            colorBin: partialInsight.colorBin,
                        };
                        copySignalValue(SandDance.constants.SignalNames.ColorBinCount);
                        break;

                    case 'x':
                        copySignalValue(SandDance.constants.SignalNames.XBins);
                        break;
                }
            }
        }
    }
}

export function saveSignalValuePref(prefs: Prefs, chart: SandDance.specs.Chart, role: string, column: string, signalName: string, signalValue: string) {
    const partialInsight = savePref(prefs, chart, role, column, { signalValues: {} });
    partialInsight.signalValues[signalName] = signalValue;
}

export function copyPrefToNewState(prefs: Prefs, chart: SandDance.specs.Chart, role: string, columnName: string) {
    const specTypePrefs = SandDance.VegaMorphCharts.util.deepMerge({}, prefs['*'], prefs[chart]);
    const rolePrefs = SandDance.VegaMorphCharts.util.deepMerge({}, specTypePrefs['*'], specTypePrefs[role]);
    const partialInsight = SandDance.VegaMorphCharts.util.deepMerge({}, rolePrefs['*'], rolePrefs[columnName]);
    return partialInsight;
}

export function savePref(prefs: Prefs, chart: SandDance.specs.Chart, role: string, column: string, partialInsight: Partial<SandDance.specs.Insight>) {
    const SpecTypePrefs = prefs[chart] || {};
    prefs[chart] = SpecTypePrefs;

    const rolePrefs = SpecTypePrefs[role] || {};
    SpecTypePrefs[role] = rolePrefs;

    rolePrefs[column] = SandDance.VegaMorphCharts.util.deepMerge({}, rolePrefs[column], partialInsight);
    return rolePrefs[column];
}
