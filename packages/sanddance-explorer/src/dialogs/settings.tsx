// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { Explorer } from '../explorer';
import { SandDance } from '@msrvida/sanddance-react';
import { Signal } from '../controls/signal';
import { Signal as VegaSignal } from 'vega-typings/types';
import { strings } from '../language';
import { Group } from '../controls/group';

export interface Props {
    explorer: Explorer;
}

function filterSignals(signal: VegaSignal) {
    switch (signal.name) {
        case SandDance.constants.BinXSignal:
        case SandDance.constants.BinYSignal:
        case SandDance.constants.ColorBinCountSignal:
        case SandDance.constants.PointSizeSignal:
        case SandDance.constants.TreeMapMethod:
            return false;
        default:
            return true;
    }
}

export function Settings(props: Props) {
    if (!props.explorer.viewer || !props.explorer.viewer.vegaSpec) return null;
    return (
        <Group
            label={strings.dialogTitleChartSettings}
        >
            {props.explorer.viewer.vegaSpec.signals.filter(filterSignals).map((signal, i) => {
                return (
                    <Signal
                        key={i}
                        signal={signal}
                        explorer={props.explorer}
                    />
                );
            })}
        </Group>
    );
}
