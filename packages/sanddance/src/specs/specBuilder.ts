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
import { defaultBins, maxbins } from './defaults';
import { fill, opacity } from './fill';
import { getFacetLayout } from './facetLayout';
import {
    GroupMark,
    NewSignal,
    Scope,
    Spec
} from 'vega-typings';
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
    private minCellWidth: NewSignal;
    private minCellHeight: NewSignal;
    private plotOffsetX: NewSignal;
    private plotOffsetY: NewSignal;
    private plotHeightOut: NewSignal;
    private plotWidthOut: NewSignal;

    constructor(public props: SpecBuilderProps & { specContext: SpecContext }) {
        this.minCellWidth = {
            name: SignalNames.MinCellWidth,
            update: `${minFacetSize}`
        };
        this.minCellHeight = { name: SignalNames.MinCellHeight, update: `${minFacetSize}` };
        this.plotOffsetX = { name: SignalNames.PlotOffsetX, update: `0` };
        this.plotOffsetY = { name: SignalNames.PlotOffsetY, update: `0` };
        this.plotHeightOut = { name: SignalNames.PlotHeightOut, update: SignalNames.PlotHeightIn };
        this.plotWidthOut = { name: SignalNames.PlotWidthOut, update: SignalNames.PlotWidthIn };
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
            const dataName = 'data_source';
            const { vegaSpec, groupMark } = this.initSpec(dataName);
            const { topColorField, colorDataName } = addColor(vegaSpec, dataName, specContext);
            const globalScope = this.createGlobalScope(colorDataName, vegaSpec);
            if (insight.columns.facet) {
                const discreteFacetColumn: DiscreteColumn = {
                    column: specColumns.facet,
                    defaultBins,
                    maxbins,
                    maxbinsSignalDisplayName: specViewOptions.language.FacetMaxBins,
                    maxbinsSignalName: SignalNames.FacetBins
                };
                const discreteFacetVColumn: DiscreteColumn = {
                    column: specColumns.facetV,
                    defaultBins,
                    maxbins,
                    maxbinsSignalDisplayName: specViewOptions.language.FacetVMaxBins,
                    maxbinsSignalName: SignalNames.FacetVBins
                };
                const facetLayout = getFacetLayout(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn);
                push(vegaSpec.signals, facetLayout.signals);
                push(vegaSpec.scales, facetLayout.scales);
                this.props.layouts = [facetLayout.layoutPair, ...this.props.layouts];
            }
            const { finalScope, specResult } = this.iterateLayouts(globalScope, groupMark, colorDataName);
            if (specResult) {
                return specResult;
            }
            //add mark to the final scope
            if (finalScope.mark) {
                const { update } = finalScope.mark.encode;
                update.fill = fill(specContext, topColorField);
                update.opacity = opacity(specContext);
            }
            return {
                specCapabilities,
                vegaSpec
            }
        }
    }

    private createGlobalScope(dataName: string, scope: Spec) {
        const { minCellWidth, minCellHeight, plotHeightOut, plotWidthOut } = this;
        const globalScope: GlobalScope = {
            dataName,
            scope,
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
        return globalScope;
    }

    private initSpec(dataName: string) {
        const { minCellWidth, minCellHeight, plotOffsetX, plotOffsetY, plotHeightOut, plotWidthOut } = this;
        const { specContext } = this.props;
        const { insight } = specContext;
        const groupMark: GroupMark = {
            type: 'group',
            style: 'cell',
            encode: {
                update: {
                    x: { signal: SignalNames.PlotOffsetX },
                    y: { value: 0 },
                    height: { signal: SignalNames.PlotHeightOut },
                    width: { signal: SignalNames.PlotWidthOut }
                }
            },
            marks: [],
            axes: [],
            scales: [],
            data: [],
            signals: []
        };
        const vegaSpec: Spec = {
            $schema: 'https://vega.github.io/schema/vega/v5.json',
            data: [{ name: dataName, transform: [] }],
            style: 'cell',
            marks: [groupMark],
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
        return { vegaSpec, groupMark };
    }

    private iterateLayouts(globalScope: GlobalScope, scope: Scope, dataName: string) {
        let specResult: SpecResult;
        let parentScope: InnerScope = {
            dataName,
            sizeSignals: globalScope.sizeSignals,
            scope
        };
        let childScope: InnerScope;
        const groupings: string[][] = [];
        let { layouts, specCapabilities, specContext } = this.props;
        const { specColumns, specViewOptions } = specContext;
        const { plotOffsetX, plotOffsetY } = this;
        for (let i = 0; i < layouts.length; i++) {
            if (!parentScope) continue;
            if (!parentScope.scope) break;
            let { layoutClass, props } = layouts[i];
            let layoutBuildProps: LayoutProps & LayoutBuildProps = {
                ...props,
                global: globalScope,
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
                specResult = {
                    errors: [e.stack],
                    specCapabilities,
                    vegaSpec: null
                };
                break;
            }
            if (childScope) {
                if (props.addScaleAxes && childScope.globalScales) {
                    addGlobalScales(
                        globalScope,
                        childScope.globalScales,
                        layoutBuildProps.axesScales,
                        { x: plotOffsetX, y: plotOffsetY },
                        specColumns,
                        specViewOptions,
                        scope.axes
                    );
                }
            }
            parentScope = childScope;
        }
        return { finalScope: parentScope, specResult };
    }
}
