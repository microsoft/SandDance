// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { ColumnMap, ColumnMapProps } from '../controls/columnMap';
import { DataContent } from '../interfaces';
import { NewSignal } from 'vega-typings/types';
import { Palette } from '../palettes';
import { SandDance } from '@msrvida/sanddance-react';
import { Signal } from '../controls/signal';
import { strings } from '../language';
import { Group } from '../controls/group';

export interface Props extends ColumnMapProps {
    specCapabilities: SandDance.types.SpecCapabilities;
    scheme: string;
    colorColumn: string;
    colorBin: SandDance.types.ColorBin;
    colorBinSignal: NewSignal;
    dataContent: DataContent;
    changeColorScheme: (scheme: string) => void;
    changeColorBin: (colorBin: SandDance.types.ColorBin) => void;
    onColorBinCountChange: (value: number) => void;
    disabled: boolean;
}

export function Color(props: Props) {
    const colorColumn = props.dataContent.columns.filter(c => c.name === props.colorColumn)[0];
    const disabledColorBin = !colorColumn || !colorColumn.quantitative;
    const colorBin = props.colorBin || 'quantize';
    return (
        <div className="sanddance-color-dialog">
            <Group label={strings.dialogTitleColor}>
                <ColumnMap
                    {...props}
                    selectedColumnName={props.colorColumn}
                    specRole={props.specCapabilities && props.specCapabilities.roles.filter(r => r.role === 'color')[0]}
                    key={0}
                />
                <Palette
                    scheme={props.scheme}
                    colorColumn={colorColumn}
                    changeColorScheme={scheme => {
                        props.changeColorScheme(scheme);
                    }}
                    dataContent={props.dataContent}
                />
            </Group>
            <Group label={strings.labelColorBin}>
                <div className="sanddance-explanation">{strings.labelColorBinExplanation}</div>
                <base.fabric.ChoiceGroup
                    options={[
                        {
                            key: "continuous",
                            text: strings.labelColorBinNone,
                            checked: colorBin === 'continuous',
                            disabled: disabledColorBin
                        },
                        {
                            key: "quantize",
                            text: strings.labelColorBinQuantize,
                            checked: colorBin === 'quantize',
                            disabled: disabledColorBin
                        },
                        {
                            key: "quantile",
                            text: strings.labelColorBinQuantile,
                            checked: colorBin === 'quantile',
                            disabled: disabledColorBin
                        }
                    ]}
                    onChange={(e, o) => {
                        props.changeColorBin(o.key as SandDance.types.ColorBin)
                    }}
                />
                <Signal
                    disabled={disabledColorBin || props.colorBin === 'continuous'}
                    signal={props.colorBinSignal}
                    explorer={props.explorer}
                    onChange={props.onColorBinCountChange}
                />
            </Group>
        </div>
    );
}
