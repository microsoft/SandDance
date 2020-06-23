// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { addGlobalAxes, AxesScopeMap } from './axes';
import { addColor } from './color';
import { FieldNames, ScaleNames, SignalNames } from './constants';
import {
    axesOffsetX,
    axesOffsetY,
    axesTitlePaddingFacetX,
    axesTitlePaddingFacetY,
    axesTitlePaddingX,
    axesTitlePaddingY,
    defaultBins,
    maxbins
} from './defaults';
import { minFacetHeight, minFacetWidth } from './defaults';
import { FacetLayout, getFacetLayout } from './facetLayout';
import { addFacetAxesGroupMarks } from './facetTitle';
import { fill, opacity } from './fill';
import { GlobalScope, GlobalSignals } from './globalScope';
import {
    AxisScales,
    DiscreteColumn,
    EncodingRule,
    GlobalScales,
    Grouping,
    InnerScope,
    LayoutOffsets,
    SpecResult
} from './interfaces';
import { LayoutBuildProps, LayoutPair, LayoutProps } from './layouts/layout';
import {
    addData,
    addScales,
    addSignals
} from './scope';
import { textSignals } from './signals';
import { SpecCapabilities, SpecContext } from './types';
import {
    GroupMark,
    Spec
} from 'vega-typings';

export interface SpecBuilderProps {
    axisScales?: AxisScales;
    layouts: LayoutPair[];
    errors?: string[];
    specCapabilities: SpecCapabilities;
    customZScale?: boolean;
}

export class SpecBuilder {
    private globalSignals: GlobalSignals;

    constructor(public props: SpecBuilderProps & { specContext: SpecContext }) {
        this.globalSignals = {
            minCellWidth: {
                name: SignalNames.MinCellWidth,
                update: `${minFacetWidth}`
            },
            minCellHeight: { name: SignalNames.MinCellHeight, update: `${minFacetHeight}` },
            plotOffsetLeft: { name: SignalNames.PlotOffsetLeft, update: '0' },
            plotOffsetTop: { name: SignalNames.PlotOffsetTop, update: '0' },
            plotOffsetBottom: { name: SignalNames.PlotOffsetBottom, update: '0' },
            plotOffsetRight: { name: SignalNames.PlotOffsetRight, update: '0' },
            plotHeightOut: { name: SignalNames.PlotHeightOut, update: SignalNames.PlotHeightIn },
            plotWidthOut: { name: SignalNames.PlotWidthOut, update: SignalNames.PlotWidthIn }
        };
    }

    public validate() {
        const { specCapabilities, specContext } = this.props;
        const { roles } = specCapabilities;
        const required = roles.filter(r => {
            switch (typeof r.allowNone) {
                case 'boolean':
                    return !r.allowNone;
                case 'undefined':
                    return true;
                case 'function':
                    return !r.allowNone(specContext);
            }
        });
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
            };
        } else {
            const { specContext } = this.props;
            const { insight, specColumns, specViewOptions } = specContext;
            const dataName = 'data_source';
            const { vegaSpec, groupMark } = this.initSpec(dataName);
            const { topColorField, colorDataName } = addColor({
                scope: vegaSpec,
                dataName,
                specContext,
                scaleName: ScaleNames.Color,
                legendDataName: 'data_legend',
                topLookupName: 'data_topcolorlookup',
                colorReverseSignalName: SignalNames.ColorReverse
            });
            const globalScope = new GlobalScope({
                dataName: colorDataName,
                markGroup: groupMark,
                scope: vegaSpec,
                signals: this.globalSignals
            });
            let facetLayout: FacetLayout;
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
                facetLayout = getFacetLayout(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn, specViewOptions.colors.axisText);
                addSignals(vegaSpec, ...facetLayout.signals);
                addScales(vegaSpec, ...facetLayout.scales);
                this.props.layouts = [facetLayout.layoutPair, ...this.props.layouts];
                this.globalSignals.plotOffsetTop.update = `${facetLayout.plotPadding.y}`;
                this.globalSignals.plotOffsetRight.update = `${facetLayout.plotPadding.x}`;
            }
            const {
                firstScope,
                finalScope,
                specResult,
                allGlobalScales,
                allEncodingRules
            } = this.iterateLayouts(globalScope, (i, innerScope) => {
                if (facetLayout && i === 0) {
                    globalScope.zSize = innerScope.offsets.h;
                }
            });

            if (specResult) {
                return specResult;
            }
            if (allGlobalScales.length > 0) {
                let axesScopes: AxesScopeMap = facetLayout ?
                    addFacetAxesGroupMarks({
                        globalScope: globalScope.scope,
                        plotScope: groupMark,
                        facetScope: firstScope,
                        plotHeightOut: this.globalSignals.plotHeightOut.name,
                        plotWidthOut: this.globalSignals.plotWidthOut.name,
                        colTitleScaleName: 'scale_facet_col_title',
                        rowTitleScaleName: 'scale_facet_row_title',
                        colSeqName: 'data_FacetCellColTitles',
                        rowSeqName: 'data_FacetCellRowTitles'
                    })
                    :
                    {
                        main: [{
                            scope: groupMark,
                            lines: true,
                            labels: true,
                            title: true
                        }]
                    };
                addGlobalAxes({
                    globalScope,
                    allGlobalScales,
                    axisScales: this.props.axisScales,
                    plotOffsetSignals: { x: this.globalSignals.plotOffsetLeft, y: this.globalSignals.plotOffsetBottom },
                    axesOffsets: { x: axesOffsetX, y: axesOffsetY },
                    axesTitlePadding: facetLayout ? { x: axesTitlePaddingFacetX, y: axesTitlePaddingFacetY } : { x: axesTitlePaddingX, y: axesTitlePaddingY },
                    labelBaseline: { x: 'top', y: 'middle' },
                    specColumns,
                    specViewOptions,
                    axesScopes
                });
            }

            //add mark to the final scope
            if (finalScope.mark) {
                const { update } = finalScope.mark.encode;

                const outputDataName = 'output';
                finalScope.mark.from.data = outputDataName;
                addData(globalScope.markGroup,
                    {
                        name: outputDataName,
                        source: globalScope.markDataName,
                        transform: [
                            {
                                type: 'formula',
                                expr: finalScope.offsets.x,
                                as: FieldNames.OffsetX
                            },
                            {
                                type: 'formula',
                                expr: finalScope.offsets.y,
                                as: FieldNames.OffsetY
                            }
                        ]
                    }
                );
                update.x = {
                    field: FieldNames.OffsetX
                };
                update.y = {
                    field: FieldNames.OffsetY
                };

                allEncodingRules.forEach(map => {
                    for (let key in map) {
                        if (update[key]) {
                            let arrIn = map[key];
                            if (!Array.isArray(update[key])) {
                                let value = update[key];
                                let arrOut = [];
                                update[key] = arrOut;
                                arrIn.forEach(rule => arrOut.push(rule));
                                arrOut.push(value);
                            } else {
                                let arrOut = update[key] as {}[];
                                arrIn.forEach(rule => arrOut.unshift(rule));
                            }
                        }
                    }
                });

                update.fill = fill(specContext, topColorField, ScaleNames.Color);
                update.opacity = opacity(specContext);
            }
            return {
                specCapabilities,
                vegaSpec
            };
        }
    }

    private initSpec(dataName: string) {
        const { globalSignals } = this;
        const { minCellWidth, minCellHeight, plotOffsetLeft, plotOffsetBottom, plotOffsetTop, plotOffsetRight, plotHeightOut, plotWidthOut } = globalSignals;
        const { specContext } = this.props;
        const { insight } = specContext;
        const groupMark: GroupMark = {
            type: 'group',
            //style: 'cell',
            encode: {
                update: {
                    x: { signal: SignalNames.PlotOffsetLeft },
                    y: { signal: SignalNames.PlotOffsetTop },
                    height: { signal: SignalNames.PlotHeightOut },
                    width: { signal: SignalNames.PlotWidthOut }
                }
            }
        };
        const inputDataname = 'input';
        const vegaSpec: Spec = {
            $schema: 'https://vega.github.io/schema/vega/v5.json',
            //style: 'cell',
            data: [{ name: inputDataname }, { name: dataName, source: inputDataname, transform: [] }],
            marks: [groupMark],
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
                plotOffsetLeft,
                plotOffsetTop,
                plotOffsetBottom,
                plotOffsetRight,
                {
                    name: SignalNames.PlotHeightIn,
                    update: `${SignalNames.ViewportHeight} - ${SignalNames.PlotOffsetBottom}`
                },
                {
                    name: SignalNames.PlotWidthIn,
                    update: `${SignalNames.ViewportWidth} - ${SignalNames.PlotOffsetLeft} - ${SignalNames.PlotOffsetRight}`
                },
                plotHeightOut,
                plotWidthOut,
                {
                    name: 'height',
                    update: `${SignalNames.PlotOffsetTop} + ${SignalNames.PlotHeightOut} + ${SignalNames.PlotOffsetBottom}`
                },
                {
                    name: 'width',
                    update: `${SignalNames.PlotWidthOut} + ${SignalNames.PlotOffsetLeft} + ${SignalNames.PlotOffsetRight}`
                }
            ])
        };
        return { vegaSpec, groupMark };
    }

    private iterateLayouts(globalScope: GlobalScope, onLayoutBuild: (i: number, innerScope: InnerScope) => void) {
        let specResult: SpecResult;
        let parentScope: InnerScope = {
            sizeSignals: globalScope.sizeSignals,
            offsets: globalScope.offsets
        };
        let firstScope: InnerScope;
        let childScope: InnerScope;
        const groupings: Grouping[] = [];
        let { layouts, specCapabilities } = this.props;
        const allGlobalScales: GlobalScales[] = [];
        const allEncodingRules: { [key: string]: EncodingRule[] }[] = [];
        for (let i = 0; i < layouts.length; i++) {
            if (!parentScope) continue;
            let buildProps: LayoutBuildProps = {
                globalScope,
                parentScope,
                axesScales: this.props.axisScales,
                groupings,
                id: i
            };
            let layout = this.createLayout(layouts[i], buildProps);
            try {
                childScope = layout.build();
                childScope.id = i;
                let groupby = layout.getGrouping();
                if (groupby) {
                    groupings.push({
                        id: i,
                        groupby,
                        fieldOps: [
                            { field: null, op: 'count', as: FieldNames.Count }
                        ]
                    });
                }
                let sumOp = layout.getAggregateSumOp();
                if (sumOp) {
                    groupings[groupings.length - 1].fieldOps.push(sumOp);
                }
                onLayoutBuild(i, childScope);
            }
            catch (e) {
                specResult = {
                    errors: [e.stack],
                    specCapabilities,
                    vegaSpec: null
                };
                break;
            }
            if (childScope && childScope.globalScales) {
                allGlobalScales.push(childScope.globalScales);
            }
            if (childScope.encodingRuleMap) {
                allEncodingRules.push(childScope.encodingRuleMap);
            }
            if (i === 0) {
                firstScope = childScope;
            }
            parentScope = childScope;
        }
        return { firstScope, finalScope: parentScope, specResult, allGlobalScales, allEncodingRules };
    }

    private createLayout(layoutPair: LayoutPair, buildProps: LayoutBuildProps) {
        const { layoutClass, props } = layoutPair;
        const layoutBuildProps: LayoutProps & LayoutBuildProps = {
            ...props,
            ...buildProps
        };
        const layout = new layoutClass(layoutBuildProps);
        layout.id = buildProps.id;
        return layout;
    }
}
