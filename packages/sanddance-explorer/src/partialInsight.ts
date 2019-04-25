// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SandDance } from '@msrvida/sanddance-react';

export interface RolePrefs {
  [columnName: string]: Partial<SandDance.types.Insight>;
}

export interface SpecTypePrefs {
  [role: string]: RolePrefs;
}

export interface Prefs {
  [chart: string]: SpecTypePrefs;
}

export function initPrefs(prefs: Prefs, partialInsight: Partial<SandDance.types.Insight>) {
  if (partialInsight) {
    const specTypePrefs = prefs[partialInsight.chart] || {};
    prefs[partialInsight.chart] = specTypePrefs;

    for (let _role in partialInsight.columns) {
      let role = _role as SandDance.types.InsightColumnRoles;
      if (role === 'color' || role === 'x') {
        let rolePrefs = specTypePrefs[role] || {};
        specTypePrefs[role] = rolePrefs;
        let column = partialInsight.columns[role];
        let copySignalValue = (signalName: string) => {
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
              colorBin: partialInsight.colorBin
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

export function saveSignalValuePref(prefs: Prefs, chart: SandDance.types.Chart, role: string, column: string, signalName: string, signalValue: string) {
  const partialInsight = savePref(prefs, chart, role, column, { signalValues: {} });
  partialInsight.signalValues[signalName] = signalValue;
}

export function copyPrefToNewState(prefs: Prefs, chart: SandDance.types.Chart, role: string, columnName: string) {
  const specTypePrefs = SandDance.VegaDeckGl.util.deepMerge({}, prefs['*'], prefs[chart]);
  const rolePrefs = SandDance.VegaDeckGl.util.deepMerge({}, specTypePrefs['*'], specTypePrefs[role]);
  const partialInsight = SandDance.VegaDeckGl.util.deepMerge({}, rolePrefs['*'], rolePrefs[columnName]);
  return partialInsight;
}

export function savePref(prefs: Prefs, chart: SandDance.types.Chart, role: string, column: string, partialInsight: Partial<SandDance.types.Insight>) {
  const SpecTypePrefs = prefs[chart] || {};
  prefs[chart] = SpecTypePrefs;

  const rolePrefs = SpecTypePrefs[role] || {}
  SpecTypePrefs[role] = rolePrefs;

  rolePrefs[column] = SandDance.VegaDeckGl.util.deepMerge({}, rolePrefs[column], partialInsight);
  return rolePrefs[column];
}
