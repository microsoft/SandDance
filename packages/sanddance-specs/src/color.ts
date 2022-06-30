// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addData, addScales, addSignals } from './scope';
import { binnableColorScale } from './scales';
import { colorBinCountSignal, colorReverseSignal } from './signals';
import { ColorScaleNone, FieldNames } from './constants';
import { getLegends } from './legends';
import { Scope } from 'vega-typings';
import { SpecContext } from './types';
import { topLookup } from './top';

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
