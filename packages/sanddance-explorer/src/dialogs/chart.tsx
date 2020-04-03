// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { ColumnMap, ColumnMapBaseProps, getColumnMapOptions } from '../controls/columnMap';
import { Dialog } from '../controls/dialog';
import { Dropdown } from '../controls/dropdown';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { Group } from '../controls/group';
import { SandDance } from '@msrvida/sanddance-react';
import { Signal } from '../controls/signal';
import { Signal as VegaSignal } from 'vega-typings';
import { strings } from '../language';
import { ToggleColumns } from '../controls/toggleColumns';

export interface Props extends ColumnMapBaseProps {
    tooltipExclusions: string[];
    toggleTooltipExclusion: (columnName: string) => void;
    collapseLabels: boolean;
    disabled: boolean;
    chart: SandDance.specs.Chart;
    onChangeChartType: (chart: SandDance.specs.Chart) => void;
    view: SandDance.types.View;
    insightColumns: SandDance.specs.InsightColumns;
    onChangeSignal: (role: string, column: string, name: string, value: any) => void;
}

export interface State {
    showTooltipDialog: boolean;
}

interface FacetData {
    facetStyle: SandDance.specs.FacetStyle;
    text?: string;
    column?: SandDance.types.Column;
}

const singleFacetLayouts: FacetData[] = [
    { facetStyle: 'wrap', text: strings.labelFacetLayoutWrap },
    { facetStyle: 'horizontal', text: strings.labelFacetLayoutHorizontal },
    { facetStyle: 'vertical', text: strings.labelFacetLayoutVertical }
];

export class Chart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showTooltipDialog: false
        };
    }

    render() {
        const { props } = this;
        const { explorer, specCapabilities } = props;
        const signals = explorer.viewer &&
            explorer.viewer.vegaSpec &&
            specCapabilities &&
            specCapabilities.signals &&
            explorer.viewer.vegaSpec.signals.filter(s => specCapabilities.signals.indexOf(s.name) >= 0);
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
                                    key: 'strips',
                                    text: strings.chartTypeStrips
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
                            onChange={(e, o) => props.onChangeChartType(o.key as SandDance.specs.Chart)}
                        />
                    </div>
                </Group>
                <Group label={strings.labelColumnMapping}>
                    <div>
                        {specCapabilities && specCapabilities.roles.map((specRole, i) => {
                            const specColumnInRole = props.insightColumns[specRole.role];
                            const selectedColumnName = specColumnInRole;
                            let disabledColumnName: string;
                            let prefix: JSX.Element;
                            let suffix: JSX.Element;
                            let hideDropdown = false;
                            let { totalStyle } = props;
                            if (!totalStyle) {
                                totalStyle = 'count-square';
                            }
                            let { facetStyle } = props;
                            if (!facetStyle) {
                                facetStyle = 'wrap';
                            }
                            switch (specRole.role) {
                                case 'facet': {
                                    suffix = (
                                        <Dropdown
                                            disabled={!props.insightColumns.facet}
                                            collapseLabel={props.collapseLabels}
                                            label={strings.labelFacetLayout}
                                            calloutProps={{ style: { minWidth: '18em' } }}
                                            options={[
                                                {
                                                    key: 'header1',
                                                    text: `${strings.labelFacetLayout}:`,
                                                    itemType: base.fabric.DropdownMenuItemType.Header
                                                },
                                                ...singleFacetLayouts.map(f => {
                                                    const o: FabricTypes.IDropdownOption = {
                                                        key: f.facetStyle,
                                                        text: f.text,
                                                        data: f,
                                                        selected: facetStyle === f.facetStyle
                                                    };
                                                    return o;
                                                }),
                                                {
                                                    key: 'divider',
                                                    text: '-',
                                                    itemType: base.fabric.DropdownMenuItemType.Divider
                                                },
                                                {
                                                    key: 'header2',
                                                    text: `${strings.labelColumnFacetV}:`,
                                                    itemType: base.fabric.DropdownMenuItemType.Header
                                                },
                                                ...getColumnMapOptions({
                                                    ...props,
                                                    specRole,
                                                    selectedColumnName: props.insightColumns.facetV
                                                }).map(o => {
                                                    if (o.itemType !== base.fabric.DropdownMenuItemType.Header) {
                                                        const facetData: FacetData = {
                                                            facetStyle: 'cross',
                                                            column: o.data
                                                        };
                                                        o.data = facetData;
                                                        o.text = `${strings.labelFacetLayoutCross} ${o.text}`;
                                                    }
                                                    return o;
                                                })
                                            ]}
                                            onChange={(e, o) => {
                                                const facetData = o.data as FacetData;
                                                props.changeColumnMapping('facet', 'facet', { facetStyle: facetData.facetStyle });
                                                if (facetData.facetStyle === 'cross') {
                                                    props.changeColumnMapping('facetV', SandDance.VegaDeckGl.util.clone(facetData.column));
                                                }
                                            }}
                                        />
                                    );
                                    break;
                                }
                                case 'facetV': {
                                    hideDropdown = true;
                                    break;
                                }
                                case 'size': {
                                    const options: FabricTypes.IDropdownOption[] = [
                                        {
                                            key: 'count-square',
                                            text: strings.labelTotalByCountSquare,
                                            data: 'count-square',
                                            selected: !totalStyle || totalStyle === 'count-square'
                                        },
                                        {
                                            key: 'count-strip',
                                            text: strings.labelTotalByCountStrip,
                                            data: 'count-strip',
                                            selected: totalStyle === 'count-strip'
                                        },
                                        {
                                            key: 'sum-strip',
                                            text: strings.labelTotalBySumStrip,
                                            data: 'sum-strip',
                                            selected: totalStyle === 'sum-strip'
                                        },
                                        {
                                            key: 'sum-treemap',
                                            text: strings.labelTotalBySumTreemap,
                                            data: 'sum-treemap',
                                            selected: totalStyle === 'sum-treemap',
                                            disabled: props.quantitativeColumns.length === 0
                                        }
                                    ];
                                    if (specCapabilities.percentage) {
                                        options.push(
                                            {
                                                key: 'sum-strip-percent',
                                                text: strings.labelTotalBySumStripPercent,
                                                data: 'sum-strip-percent',
                                                selected: totalStyle === 'sum-strip-percent',
                                                disabled: props.quantitativeColumns.length === 0
                                            });
                                    }
                                    prefix = !specCapabilities.countsAndSums ? null : (
                                        <Dropdown
                                            collapseLabel={props.collapseLabels}
                                            label={strings.labelTotal}
                                            calloutProps={{ style: { minWidth: '18em' } }}
                                            options={options}
                                            onChange={(e, o) =>
                                                props.changeColumnMapping('size', 'size', { totalStyle: o.data })
                                            }
                                        />
                                    );
                                    break;
                                }
                            }
                            let disabled = props.disabled
                                || (props.view === '2d' && specRole.role === 'z')
                                || (specRole.role === 'size' && !(!specCapabilities.countsAndSums || totalStyle.indexOf('sum-') === 0))
                                || (specRole.role === 'sort' && specCapabilities.countsAndSums && totalStyle === 'sum-treemap');
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
                                    hideDropdown={hideDropdown}
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
                {signals && (
                    <Group label={strings.labelChartTypeOptions}>
                        {signals.map((signal, i) => (
                            <Signal
                                key={i}
                                signal={signal}
                                explorer={explorer}
                                disabled={props.disabled || this.disableSignal(signal)}
                                collapseLabel={props.collapseLabels}
                                newViewStateTarget={false}
                            />
                        ))}
                    </Group>
                )}
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

    private disableSignal(signal: VegaSignal) {
        if (this.props.view === '2d' && signal.name === SandDance.constants.SignalNames.ZGrounded) {
            return true;
        }
        return false;
    }

}
