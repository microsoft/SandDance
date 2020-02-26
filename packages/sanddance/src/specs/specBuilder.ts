// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    Axis,
    GroupMark,
    NewSignal,
    Scale,
    Scope,
    Signal,
    Spec
} from 'vega-typings';
import {
    AxisScale,
    AxisScales,
    DiscreteColumn,
    GlobalScope,
    InnerScope,
    SpecResult
} from './interfaces';
import { binnableColorScale } from './scales';
import { colorBinCountSignal, colorReverseSignal, textSignals } from './signals';
import { ColorScaleNone, ScaleNames, SignalNames } from './constants';
import {
    Column,
    FacetStyle,
    SpecCapabilities,
    SpecColumns,
    SpecContext,
    SpecViewOptions
} from './types';
import { Cross, CrossProps } from './layouts/cross';
import { fill, opacity } from './fill';
import { getLegends } from './legends';
import { LayoutBuildProps, LayoutPair, LayoutProps } from './layouts/layout';
import { minFacetSize } from './defaults';
import { push } from '../array';
import { Slice, SliceProps } from './layouts/slice';
import { topLookup } from './top';
import { util } from '@msrvida/vega-deck.gl';
import { Wrap, WrapProps } from './layouts/wrap';

export interface SpecBuilderProps {
    axisScales?: AxisScales;
    layouts: LayoutPair[];
    errors?: string[];
    specCapabilities: SpecCapabilities;
    customZScale?: boolean;
}

export class SpecBuilder {
    public globalScope: GlobalScope;

    constructor(public props: SpecBuilderProps & { specContext: SpecContext }) {
    }

    public validate() {
        const { specCapabilities, specContext } = this.props;
        const { roles } = specCapabilities;
        const required = roles.filter(r => !r.allowNone);
        const numeric = roles.filter(r => r.excludeCategoric);
        const errors = required
            .map(
                r => {
                    if (specContext.specColumns[r.role]) {
                        return null;
                    } else {
                        return `Field ${r.role} is required.`;
                    }
                }
            )
            .concat(
                numeric.map(
                    r => {
                        if (specContext.specColumns[r.role] && !specContext.specColumns[r.role].quantitative) {
                            return `Field ${r.role} must be quantitative.`;
                        } else {
                            return null;
                        }
                    }
                )
            )
            .filter(Boolean);
        return errors;
    }

    public build(): SpecResult {
        const { specCapabilities } = this.props;
        const errors = this.validate();
        if (errors.length) {
            return {
                errors,
                specCapabilities,
                vegaSpec: null
            }
        } else {
            const { specContext } = this.props;
            const { insight, specColumns, specViewOptions } = specContext;

            const minCellWidth: NewSignal = {
                name: SignalNames.MinCellWidth,
                update: `${minFacetSize}`
            };

            const minCellHeight: NewSignal = {
                name: SignalNames.MinCellHeight,
                update: `${minFacetSize}`
            };

            const plotOffsetX: NewSignal = {
                name: SignalNames.PlotOffsetX,
                update: `0`
            };

            const plotOffsetY: NewSignal = {
                name: SignalNames.PlotOffsetY,
                update: `0`
            };

            const plotHeightOut: NewSignal = {
                name: SignalNames.PlotHeightOut,
                update: SignalNames.PlotHeightIn
            };

            const plotWidthOut: NewSignal = {
                name: SignalNames.PlotWidthOut,
                update: SignalNames.PlotWidthIn
            };

            let dataName = 'data_source';
            const vegaSpec: Spec = {
                $schema: 'https://vega.github.io/schema/vega/v5.json',
                data: [
                    {
                        name: dataName,
                        transform: []
                    }
                ],
                style: 'cell',
                marks: [
                    {
                        type: 'group',
                        style: 'cell',
                        encode: {
                            update: {
                                x: {
                                    signal: SignalNames.PlotOffsetX
                                },
                                y: {
                                    value: 0
                                },
                                height: {
                                    signal: SignalNames.PlotHeightOut
                                },
                                width: {
                                    signal: SignalNames.PlotWidthOut
                                }
                            }
                        },
                        marks: [],
                        axes: [],
                        scales: [],
                        data: [],
                        signals: []
                    }
                ],
                scales: [],
                signals: textSignals(specContext, SignalNames.ViewportHeight).concat([
                    minCellWidth,
                    minCellHeight,
                    {
                        name: SignalNames.ViewportHeight,
                        update: `max(${SignalNames.MinCellHeight}, ${insight.size.height})`
                    },
                    {
                        name: SignalNames.ViewportWidth,
                        update: `max(${SignalNames.MinCellWidth}, ${insight.size.width})`
                    },
                    plotOffsetX,
                    plotOffsetY,
                    {
                        name: SignalNames.PlotHeightIn,
                        update: `${SignalNames.ViewportHeight} - ${SignalNames.PlotOffsetY}`
                    },
                    {
                        name: SignalNames.PlotWidthIn,
                        update: `${SignalNames.ViewportWidth} - ${SignalNames.PlotOffsetX}`
                    },
                    plotHeightOut,
                    plotWidthOut,
                    {
                        name: 'height',
                        update: `${SignalNames.PlotHeightOut} + ${SignalNames.PlotOffsetY}`
                    },
                    {
                        name: 'width',
                        update: `${SignalNames.PlotWidthOut} + ${SignalNames.PlotOffsetX}`
                    }
                ])
            };

            const { topColorField, colorDataName } = this.addColor(vegaSpec, dataName);

            this.globalScope = {
                dataName: colorDataName,
                scope: vegaSpec,
                sizeSignals: {
                    layoutHeight: SignalNames.PlotHeightIn,
                    layoutWidth: SignalNames.PlotWidthIn
                },
                signals: {
                    minCellWidth,
                    minCellHeight,
                    plotHeightOut,
                    plotWidthOut
                }
            };

            let { layouts } = this.props;

            if (insight.columns.facet) {
                const discreteFacetColumn: DiscreteColumn = {
                    column: specColumns.facet,
                    maxbins: 30,
                    maxbinsSignalDisplayName: 'TODO facet',
                    maxbinsSignalName: 'TODO facet'
                };
                const discreteFacetVColumn: DiscreteColumn = {
                    column: specColumns.facetV,
                    maxbins: 30,
                    maxbinsSignalDisplayName: 'TODO facetV',
                    maxbinsSignalName: 'TODO facetV'
                };
                const facetLayout = this.getFacetLayout(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn);
                push(vegaSpec.signals, facetLayout.signals);
                push(vegaSpec.scales, facetLayout.scales);
                layouts = [facetLayout.layoutPair, ...layouts];
            }

            const group1 = vegaSpec.marks[0] as GroupMark;

            let parentScope: InnerScope = {
                dataName: colorDataName,
                sizeSignals: this.globalScope.sizeSignals,
                scope: group1
            };
            let childScope: InnerScope;
            const groupings: string[][] = [];
            for (let i = 0; i < layouts.length; i++) {
                if (!parentScope) continue;
                if (!parentScope.scope) break;
                let { layoutClass, props } = layouts[i];
                let layoutBuildProps: LayoutProps & LayoutBuildProps = {
                    ...props,
                    global: this.globalScope,
                    parent: parentScope,
                    axesScales: this.props.axisScales,
                    groupings,
                    id: i
                };
                let layout = new layoutClass(layoutBuildProps);
                layout.id = i;
                try {
                    childScope = layout.build();
                    let grouping = layout.getGrouping();
                    if (grouping) {
                        groupings.push(grouping);
                    }
                }
                catch (e) {
                    return {
                        errors: [e.stack],
                        specCapabilities,
                        vegaSpec: null
                    }
                }
                if (childScope) {
                    if (props.addScaleAxes && childScope.globalScales) {
                        this.addGlobalScales(
                            childScope.globalScales,
                            layoutBuildProps.axesScales,
                            {
                                x: plotOffsetX,
                                y: plotOffsetY
                            },
                            specColumns,
                            specViewOptions,
                            group1.axes
                        );
                    }
                    // //the first layout when faceting may determine the overall height
                    // if (i === 0 && insight.columns.facet) {
                    //     if (childScope.sizeSignals.totalHeight) {
                    //         modifySignal plotHeightOut
                    //         group1.signals.push({
                    //             name: 'height',
                    //             update: childScope.sizeSignals.totalHeight
                    //         });
                    //     }
                    //     if (childScope.sizeSignals.totalWidth) {
                    //         group1.signals.push({
                    //             name: 'width',
                    //             update: childScope.sizeSignals.totalWidth
                    //         });
                    //     }
                    // }
                }
                parentScope = childScope;
            }

            //add mark to the final scope
            if (parentScope.mark) {
                const { update } = parentScope.mark.encode;
                update.fill = fill(specContext, topColorField);
                update.opacity = opacity(specContext);
            }

            return {
                specCapabilities,
                vegaSpec
            }
        }
    }

    private addColor(scope: Scope, dataSource: string) {
        let colorDataName = dataSource;
        const { specContext } = this.props;
        const { insight, specColumns, specViewOptions } = specContext;
        const legends = getLegends(specContext);
        if (legends) {
            scope.legends = legends;
        }

        const topColorField = 'top_color';
        const categoricalColor = specColumns.color && !specColumns.color.quantitative;
        if (categoricalColor) {
            const legendName = 'data_legend';
            push(scope.data, topLookup(specColumns.color, specViewOptions.maxLegends, dataSource, legendName, 'top_colors', topColorField));
            colorDataName = legendName;
        }

        if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
            if (specColumns.color.quantitative) {
                scope.scales.push(binnableColorScale(insight.colorBin, dataSource, specColumns.color.name, insight.scheme));
            } else {
                scope.scales.push(
                    {
                        name: ScaleNames.Color,
                        type: 'ordinal',
                        domain: {
                            data: colorDataName,
                            field: topColorField,
                            sort: true
                        },
                        range: {
                            scheme: insight.scheme || ColorScaleNone
                        },
                        reverse: { signal: SignalNames.ColorReverse }
                    }
                );
            }
        }

        push(scope.signals, [
            colorBinCountSignal(specContext),
            colorReverseSignal(specContext)
        ]);

        return { topColorField, colorDataName };
    }

    private addGlobalScales(
        globalScales: { x?: Scale, y?: Scale, z?: Scale },
        axisScales: AxisScales,
        plotOffsetSignals: { x: NewSignal, y: NewSignal },
        specColumns: SpecColumns,
        specViewOptions: SpecViewOptions,
        axes: Axis[]) {

        // const add = (axisScale: AxisScale, scale: Scale, column: Column, orient: AxisOrient) => {
        //     const pa = partialAxes(specViewOptions, AxisType.quantitative, columnToAxisType(column));

        // };

        // add(axisScales.x, globalScales.x, specColumns.x, 'bottom');
        // add(axisScales.y, globalScales.y, specColumns.y, 'left');
        // add(axisScales.z, globalScales.z, specColumns.z, 'left');

        const { scope } = this.globalScope; //TODO if faceting, scope shoule be each facet!!

        //TODO always add Z scale to global scope

        for (let s in globalScales) {
            let scale: Scale = globalScales[s];
            if (scale) {
                //TODO check to see if scale exists in global scope
                scope.scales.push(scale);
                if (axisScales) {
                    let axisScale: AxisScale = axisScales[s];
                    if (axisScale) {
                        const lineColor = util.colorToString(specViewOptions.colors.axisLine);
                        switch (axisScale.type) {
                            //band scale
                            //continuous scale
                            //etc
                        }
                        //const pa = partialAxes(specViewOptions, AxisType.quantitative, columnToAxisType(specColumns[s]));
                        const horizontal = s === 'x';
                        const column: Column = specColumns[s];
                        const axis: Axis = {
                            scale: scale.name,
                            orient: horizontal ? 'bottom' : 'left',
                            title: axisScale.aggregate ? 'TODO aggtitle' : column.name,
                            labelAlign: horizontal ? 'left' : 'right',
                            labelAngle: {
                                signal: horizontal ? SignalNames.TextAngleX : SignalNames.TextAngleY
                            },
                            labelFontSize: {
                                signal: SignalNames.TextSize
                            },
                            titleAngle: {
                                signal: horizontal ? SignalNames.TextAngleX : SignalNames.TextAngleY
                            },
                            titleAlign: horizontal ? 'left' : 'right',
                            titleFontSize: {
                                signal: SignalNames.TextTitleSize
                            },
                            titleColor: util.colorToString(specViewOptions.colors.axisText),
                            tickSize: specViewOptions.tickSize,
                            domainColor: lineColor,
                            tickColor: lineColor,
                            labelColor: util.colorToString(specViewOptions.colors.axisText)
                        };
                        if (column.quantitative) {
                            axis.format = '~r';
                        }
                        axes.push(axis);
                        if (plotOffsetSignals[s]) {
                            const plotOffsetSignal = plotOffsetSignals[s] as NewSignal;
                            plotOffsetSignal.update = `200`; //TODO measure axis text????
                        }
                    }
                }
            }
        }
    }

    private getFacetLayout(facetStyle: FacetStyle, facetColumn: DiscreteColumn, facetVColumn: DiscreteColumn) {
        let layoutPair: LayoutPair;
        const scales: Scale[] = [];
        const signals: Signal[] = [];
        const groupby = facetColumn;
        switch (facetStyle) {
            case 'horizontal': {
                const props: SliceProps = {
                    orientation: 'horizontal',
                    groupby
                };
                layoutPair = {
                    layoutClass: Slice,
                    props
                };
                break;
            }
            case 'vertical': {
                const props: SliceProps = {
                    orientation: 'vertical',
                    groupby
                };
                layoutPair = {
                    layoutClass: Slice,
                    props
                };
                break;
            }
            case 'cross': {
                const props: CrossProps = {
                    groupbyX: groupby,
                    groupbyY: facetVColumn
                };
                layoutPair = {
                    layoutClass: Cross,
                    props
                };
                break;
            }
            case 'wrap':
            default:
                const props: WrapProps = {
                    groupby
                };
                layoutPair = {
                    layoutClass: Wrap,
                    props
                };
                break;
        }
        return { layoutPair, scales, signals };
    }
}
