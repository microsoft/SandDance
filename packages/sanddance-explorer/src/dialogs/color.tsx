// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { ColumnMap, ColumnMapBaseProps } from '../controls/columnMap';
import { DataContent } from '../interfaces';
import { NewSignal } from 'vega-typings/types';
import { Palette } from '../palettes';
import { SandDance } from '@msrvida/sanddance-react';
import { Signal } from '../controls/signal';
import { strings } from '../language';
import { Group } from '../controls/group';

export interface Props extends ColumnMapBaseProps {
    specCapabilities: SandDance.types.SpecCapabilities;
    scheme: string;
    colorColumn: string;
    colorBin: SandDance.types.ColorBin;
    colorBinSignal: NewSignal;
    colorReverseSignal: NewSignal;
    dataContent: DataContent;
    onColorSchemeChange: (scheme: string) => void;
    onColorBinChange: (colorBin: SandDance.types.ColorBin) => void;
    onColorBinCountChange: (value: number) => void;
    onColorReverseChange: (value: boolean) => void;
    disabled: boolean;
    directColor: boolean;
    onDirectColorChange: (value: boolean) => void;
}

export function Color(props: Props) {
    const colorColumn = props.dataContent.columns.filter(c => c.name === props.colorColumn)[0];
    const disabledColorBin = !colorColumn || !colorColumn.quantitative || props.directColor;
    const colorBin = props.colorBin || 'quantize';
    return (
        <div className="sanddance-color-dialog">
            <Group label={strings.labelColor}>
                <ColumnMap
                    {...props}
                    selectedColumnName={props.colorColumn}
                    specRole={props.specCapabilities && props.specCapabilities.roles.filter(r => r.role === 'color')[0]}
                    key={0}
                />
                {colorColumn && colorColumn.isColorData && <div
                    className="sanddance-explanation"
                    dangerouslySetInnerHTML={{ __html: strings.labelColorFieldIsColorData(colorColumn.name) }}
                />}
                {colorColumn && !colorColumn.isColorData && <Palette
                    scheme={props.scheme}
                    colorColumn={colorColumn}
                    changeColorScheme={scheme => {
                        props.onColorSchemeChange(scheme);
                    }}
                    disabled={props.disabled || props.directColor || (colorColumn && colorColumn.isColorData)}
                />}
                {colorColumn && !colorColumn.isColorData && <Signal
                    disabled={props.disabled || !colorColumn || props.directColor || (colorColumn && colorColumn.isColorData)}
                    signal={props.colorReverseSignal}
                    explorer={props.explorer}
                    onChange={props.onColorReverseChange}
                />}
            </Group>
            {colorColumn && !colorColumn.isColorData && <Group label={strings.labelColorBin}>
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
                        props.onColorBinChange(o.key as SandDance.types.ColorBin)
                    }}
                />
                <Signal
                    disabled={props.disabled || disabledColorBin || props.colorBin === 'continuous'}
                    signal={props.colorBinSignal}
                    explorer={props.explorer}
                    onChange={props.onColorBinCountChange}
                />
            </Group>}
            {colorColumn && !colorColumn.isColorData && <Group label={strings.labelColorOptions}>
                <base.fabric.Toggle
                    label={strings.selectDirectColor}
                    disabled={!colorColumn.stats.hasColorData}
                    checked={!!(colorColumn.stats.hasColorData && props.directColor)}
                    onChange={(e, checked?: boolean) => props.onDirectColorChange(checked)}
                />
                <div className="sanddance-explanation" dangerouslySetInnerHTML={{ __html: strings.labelDataColors }} />
            </Group>}
        </div>
    );
}
