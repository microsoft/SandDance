/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { addData, addScales, addSignals } from './scope.js';
import { binnableColorScale } from './scales.js';
import { colorBinCountSignal, colorReverseSignal } from './signals.js';
import { ColorScaleNone, FieldNames } from './constants.js';
import { getLegends } from './legends.js';
import { Scope } from 'vega-typings';
import { SpecContext } from './types.js';
import { topLookup } from './top.js';

export interface Props {
    scope: Scope;
    dataName: string;
    specContext: SpecContext;
    scaleName: string;
    legendDataName: string;
    topLookupName: string;
    colorReverseSignalName: string;
}

export function addColor(props: Props) {
    const { colorReverseSignalName, dataName, scope, legendDataName, scaleName, specContext, topLookupName } = props;
    let colorDataName = dataName;
    const { insight, specColumns, specViewOptions } = specContext;
    const legends = getLegends(specContext, scaleName);
    if (legends) {
        scope.legends = legends;
    }

    const categoricalColor = specColumns.color && !specColumns.color.quantitative;
    if (categoricalColor) {
        addData(scope, ...topLookup(specColumns.color, specViewOptions.maxLegends, dataName, legendDataName, topLookupName, FieldNames.TopColor, FieldNames.TopIndex));
        colorDataName = legendDataName;
    }

    if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
        if (specColumns.color.quantitative) {
            addScales(scope, binnableColorScale(scaleName, insight.colorBin, dataName, specColumns.color.name, insight.scheme));
        } else {
            addScales(scope, {
                name: scaleName,
                type: 'ordinal',
                domain: {
                    data: colorDataName,
                    field: FieldNames.TopColor,
                    sort: true,
                },
                range: {
                    scheme: insight.scheme || ColorScaleNone,
                },
                reverse: { signal: colorReverseSignalName },
            });
        }
    }

    addSignals(scope,
        colorBinCountSignal(specContext),
        colorReverseSignal(specContext),
    );

    return { topColorField: FieldNames.TopColor, colorDataName };
}
