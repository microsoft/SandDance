// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { ColumnMap, ColumnMapBaseProps } from '../controls/columnMap';
import { Dialog } from '../controls/dialog';
import { Dropdown } from '../controls/dropdown';
import { Group } from '../controls/group';
import { SandDance } from '@msrvida/sanddance-react';
import { Signal } from '../controls/signal';
import { strings } from '../language';
import { ToggleColumns } from '../controls/toggleColumns';

export interface Props extends ColumnMapBaseProps {
    tooltipExclusions: string[];
    toggleTooltipExclusion: (columnName: string) => void;
    collapseLabels: boolean;
    disabled: boolean;
    chart: SandDance.types.Chart;
    onChangeChartType: (chart: SandDance.types.Chart) => void;
    view: SandDance.VegaDeckGl.types.View;
    insightColumns: SandDance.types.InsightColumns;
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
                            className="sanddance-chart-type"
                            options={[
                                {
                                    key: 'grid',
                                    text: strings.chartTypeGrid
                                },
                                {
                                    key: 'scatterplot',
                                    text: strings.chartTypeScatterPlot
                                },
                                {
                                    key: 'density',
                                    text: strings.chartTypeDensity
                                },
                                {
                                    key: 'barchartV',
                                    text: strings.chartTypeBarChartV
                                },
                                {
                                    key: 'barchartH',
                                    text: strings.chartTypeBarChartH
                                },
                                {
                                    key: 'treemap',
                                    text: strings.chartTypeTreeMap
                                },
                                {
                                    key: 'stacks',
                                    text: strings.chartTypeStacks
                                }
                            ].map(o => {
                                return {
                                    ...o,
                                    checked: props.chart === o.key,
                                    disabled: props.disabled
                                        || (o.key === 'treemap' && props.quantitativeColumns.length === 0)
                                };
                            })}
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
                                collapseLabel={props.collapseLabels}
                            />
                        ))}
                    </Group>
                )}
                <Group label={strings.labelColumnMapping}>
                    <div>
                        {props.specCapabilities && props.specCapabilities.roles.map((specRole, i) => {
                            const specColumnInRole = props.insightColumns[specRole.role];
                            const selectedColumnName = specColumnInRole;
                            let disabledColumnName: string;
                            let prefix: JSX.Element;
                            let suffix: JSX.Element;
                            switch (specRole.role) {
                                case 'facetV': {
                                    console.log('props.insightColumns', props.insightColumns);
                                    break;
                                }
                                case 'facet': {
                                    suffix = (
                                        <Dropdown
                                            disabled={!props.insightColumns.facet}
                                            collapseLabel={props.collapseLabels}
                                            label={strings.labelColumnFacetLayout}
                                            calloutProps={{ style: { minWidth: '18em' } }}
                                            options={[
                                                {
                                                    key: 'wrap',
                                                    text: 'Wrap',
                                                    data: 'wrap',
                                                    selected: !props.facetStyle || props.facetStyle === 'wrap'
                                                },
                                                {
                                                    key: 'horizontal',
                                                    text: 'horizontal',
                                                    data: 'horizontal',
                                                    selected: props.facetStyle === 'horizontal'
                                                },
                                                {
                                                    key: 'vertical',
                                                    text: 'vertical',
                                                    data: 'vertical',
                                                    selected: props.facetStyle === 'vertical'
                                                },
                                                {
                                                    key: 'cross',
                                                    text: 'cross',
                                                    data: 'cross',
                                                    selected: props.facetStyle === 'cross'
                                                }
                                            ]}
                                            onChange={(e, o) =>
                                                props.changeColumnMapping('facet', 'facet', { facetStyle: o.data })
                                            }
                                        />
                                    );
                                    break;
                                }
                                case 'size': {
                                    prefix = props.chart === 'treemap' ? null : (
                                        <Dropdown
                                            collapseLabel={props.collapseLabels}
                                            label={strings.labelTotal}
                                            calloutProps={{ style: { minWidth: '18em' } }}
                                            options={[
                                                {
                                                    key: 'count',
                                                    text: strings.labelTotalByCount,
                                                    data: null,
                                                    selected: !props.sumStyle
                                                },
                                                {
                                                    key: 'sum-treemap',
                                                    text: strings.labelTotalBySumTreemap,
                                                    data: 'treemap',
                                                    selected: props.sumStyle === 'treemap',
                                                    disabled: props.quantitativeColumns.length === 0
                                                },
                                                {
                                                    key: 'sum-percent',
                                                    text: strings.labelTotalBySumStripPercent,
                                                    data: 'strip-percent',
                                                    selected: props.sumStyle === 'strip-percent',
                                                    disabled: props.quantitativeColumns.length === 0
                                                }
                                            ]}
                                            onChange={(e, o) =>
                                                props.changeColumnMapping('size', 'size', { sumStyle: o.data })
                                            }
                                        />
                                    );
                                    break;
                                }
                                case 'facet': {
                                    disabledColumnName = props.insightColumns.facetV;
                                    break;
                                }
                                case 'facetV': {
                                    disabledColumnName = props.insightColumns.facet;
                                    break;
                                }
                            }
                            let disabled = props.disabled
                                || (props.view === '2d' && specRole.role === 'z')
                                || (specRole.role === 'size' && props.chart !== 'treemap' && !props.sumStyle)
                                || (specRole.role === 'facetV' && (!props.insightColumns.facet || props.facetStyle !== 'cross'));
                            return (
                                <ColumnMap
                                    {...props}
                                    prefix={prefix}
                                    suffix={suffix}
                                    collapseLabel={props.collapseLabels}
                                    disabled={disabled}
                                    disabledColumnName={disabledColumnName}
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
                <Dialog
                    hidden={!this.state.showTooltipDialog}
                    onDismiss={() => this.setState({ showTooltipDialog: false })}
                    title={strings.labelTooltipMapping}
                >
                    <ToggleColumns
                        allColumns={props.allColumns}
                        exclusions={props.tooltipExclusions}
                        toggleExclusion={props.toggleTooltipExclusion}
                    />
                </Dialog>
            </div>
        );
    }
}
