// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { ColumnMap, ColumnMapProps } from '../controls/columnMap';
import { Group } from '../controls/group';
import { SandDance } from '@msrvida/sanddance-react';
import { Signal } from '../controls/signal';
import { strings } from '../language';

export interface Props extends ColumnMapProps {
    specCapabilities: SandDance.types.SpecCapabilities;
    disabled: boolean;
    chart: SandDance.types.Chart;
    onChangeChartType: (chart: SandDance.types.Chart) => void;
    view: SandDance.VegaDeckGl.types.View;
    columns: SandDance.types.InsightColumns;
    onChangeSignal: (role: string, column: string, name: string, value: any) => void;
}

export interface State {
    showTooltipDialog: boolean;
}

export class Chart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showTooltipDialog: false
        };
    }

    render() {
        const props = this.props;
        const signals = props.explorer.viewer &&
            props.explorer.viewer.vegaSpec &&
            props.specCapabilities &&
            props.specCapabilities.signals &&
            props.explorer.viewer.vegaSpec.signals.filter(s => props.specCapabilities.signals.indexOf(s.name) >= 0);
        return (
            <div>
                <Group label={strings.labelChart}>
                    <div className="calculator">
                        <base.fabric.ChoiceGroup
                            options={[
                                {
                                    key: 'grid',
                                    text: strings.chartTypeGrid,
                                    checked: props.chart === 'grid',
                                    disabled: props.disabled
                                },
                                {
                                    key: 'scatterplot',
                                    text: strings.chartTypeScatterPlot,
                                    checked: props.chart === 'scatterplot',
                                    disabled: props.disabled
                                },
                                {
                                    key: 'density',
                                    text: strings.chartTypeDensity,
                                    checked: props.chart === 'density',
                                    disabled: props.disabled
                                },
                                {
                                    key: 'barchart',
                                    text: strings.chartTypeBarChart,
                                    checked: props.chart === 'barchart',
                                    disabled: props.disabled
                                },
                                {
                                    key: 'treemap',
                                    text: strings.chartTypeTreeMap,
                                    checked: props.chart === 'treemap',
                                    disabled: props.disabled
                                },
                                {
                                    key: 'stacks',
                                    text: strings.chartTypeStacks,
                                    checked: props.chart === 'stacks',
                                    disabled: props.disabled
                                }
                            ]}
                            onChange={(e, o) => props.onChangeChartType(o.key as SandDance.types.Chart)}
                        />
                    </div>
                </Group>
                {signals && (
                    <Group label={strings.labelChartTypeOptions}>
                        {signals.map((signal, i) => (
                            <Signal
                                key={i}
                                signal={signal}
                                explorer={props.explorer}
                                disabled={props.disabled}
                            />
                        ))}
                    </Group>
                )}
                <Group label={strings.labelColumnMapping}>
                    <div>
                        {props.specCapabilities && props.specCapabilities.roles.map((specRole, i) => {
                            const specColumnInRole = props.columns[specRole.role];
                            const selectedColumnName = specColumnInRole;
                            let disabled = props.disabled || (props.view === '2d' && specRole.role === 'z');
                            return (
                                <ColumnMap
                                    {...props}
                                    disabled={disabled}
                                    selectedColumnName={selectedColumnName}
                                    specRole={specRole}
                                    key={i}
                                    onChangeSignal={(name, value) => props.onChangeSignal(specRole.role, selectedColumnName, name, value)}
                                />
                            );
                        })}
                        <div className="sanddance-tooltipMap">
                            <base.fabric.DefaultButton
                                text={strings.buttonTooltipMapping}
                                onClick={() => this.setState({ showTooltipDialog: true })}
                            />
                        </div>
                    </div>
                </Group>
            </div>
        );
    }
}
