// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addColor } from './color';
import { addGlobalScales } from './globalScales';
import {
    AxisScales,
    DiscreteColumn,
    GlobalScope,
    InnerScope,
    SpecResult
} from './interfaces';
import { fill, opacity } from './fill';
import { getFacetLayout } from './facetLayout';
import { GroupMark, NewSignal, Spec } from 'vega-typings';
import { LayoutBuildProps, LayoutPair, LayoutProps } from './layouts/layout';
import { minFacetSize } from './defaults';
import { push } from '../array';
import { SignalNames } from './constants';
import { SpecCapabilities, SpecContext } from './types';
import { textSignals } from './signals';

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

            const { topColorField, colorDataName } = addColor(vegaSpec, dataName, specContext);

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
                const facetLayout = getFacetLayout(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn);
                push(vegaSpec.signals, facetLayout.signals);
                push(vegaSpec.scales, facetLayout.scales);
                layouts = [facetLayout.layoutPair, ...layouts];
            }

            const groupMark = vegaSpec.marks[0] as GroupMark;

            let parentScope: InnerScope = {
                dataName: colorDataName,
                sizeSignals: this.globalScope.sizeSignals,
                scope: groupMark
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
                        addGlobalScales(
                            this.globalScope,
                            childScope.globalScales,
                            layoutBuildProps.axesScales,
                            {
                                x: plotOffsetX,
                                y: plotOffsetY
                            },
                            specColumns,
                            specViewOptions,
                            groupMark.axes
                        );
                    }
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

}
