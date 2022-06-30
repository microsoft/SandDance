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
    facetPaddingBottom,
    facetPaddingLeft,
} from './defaults';
import { minFacetHeight, minFacetWidth } from './defaults';
import { FacetLayout } from './facetLayout';
import { addFacetAxesGroupMarks } from './facetTitle';
import { fill, opacity } from './fill';
import { GlobalScope, GlobalSignals } from './globalScope';
import {
    AxisScales,
    EncodingRule,
    GlobalScales,
    Grouping,
    InnerScope,
    SpecResult,
} from './interfaces';
import { LayoutBuildProps, LayoutPair, LayoutProps } from './layouts/layout';
import {
    addData,
    addSignals,
} from './scope';
import { textSignals } from './signals';
import { SpecCapabilities, SpecContext } from './types';
import {
    GroupMark,
    LinearScale,
    Spec,
} from 'vega-typings';
import { layoutClasses } from './layouts/index';

export interface SpecBuilderProps {
    axisScales?: AxisScales;
    layouts: LayoutPair[];
    errors?: string[];
    specCapabilities: SpecCapabilities;
    customZScale?: boolean;
    facetLayout?: FacetLayout;
    collapseFacetAxes?: boolean;
}

export class SpecBuilder {
    private globalSignals: GlobalSignals;

    constructor(public props: SpecBuilderProps, public specContext: SpecContext) {
        this.globalSignals = {
            facetAxesAdjustX: { name: SignalNames.FacetAxesAdjustX, update: props.facetLayout && props.collapseFacetAxes ? facetPaddingLeft.toString() : '0' },
            facetAxesAdjustY: { name: SignalNames.FacetAxesAdjustY, update: props.facetLayout && props.collapseFacetAxes ? facetPaddingBottom.toString() : '0' },
            minCellWidth: {
                name: SignalNames.MinCellWidth,
                update: `${minFacetWidth}`,
            },
            minCellHeight: { name: SignalNames.MinCellHeight, update: `${minFacetHeight}` },
            plotOffsetLeft: { name: SignalNames.PlotOffsetLeft, update: '0' },
            plotOffsetTop: { name: SignalNames.PlotOffsetTop, update: '0' },
            plotOffsetBottom: { name: SignalNames.PlotOffsetBottom, update: '0' },
            plotOffsetRight: { name: SignalNames.PlotOffsetRight, update: '0' },
            plotHeightOut: { name: SignalNames.PlotHeightOut, update: SignalNames.PlotHeightIn },
            plotWidthOut: { name: SignalNames.PlotWidthOut, update: SignalNames.PlotWidthIn },
        };
    }

    public validate() {
        const { specContext } = this;
        const { specCapabilities } = this.props;
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
                },
            )
            .concat(
                numeric.map(
                    r => {
                        if (specContext.specColumns[r.role] && !specContext.specColumns[r.role].quantitative) {
                            return `Field ${r.role} must be quantitative.`;
                        } else {
                            return null;
                        }
                    },
                ),
            )
            .filter(Boolean);
        return errors;
    }

    public build(): SpecResult {
        const { globalSignals, specContext } = this;
        const { facetLayout, specCapabilities } = this.props;
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
            colorReverseSignalName: SignalNames.ColorReverse,
        });
        const globalScope = new GlobalScope({
            dataName: colorDataName,
            markGroup: groupMark,
            scope: vegaSpec,
            signals: globalSignals,
        });
        if (facetLayout) {
            addSignals(vegaSpec,
                {
                    name: SignalNames.FacetPaddingBottom,
                    update: `${facetLayout.facetPadding.bottom}`,
                },
                {
                    name: SignalNames.FacetPaddingLeft,
                    update: `${facetLayout.facetPadding.left}`,
                },
                {
                    name: SignalNames.FacetPaddingTop,
                    update: `${facetLayout.facetPadding.top}`,
                },
            );
            globalSignals.plotOffsetTop.update = `${facetLayout.plotPadding.y}`;
            globalSignals.plotOffsetRight.update = `${facetLayout.plotPadding.x}`;
        }
        const {
            firstScope,
            finalScope,
            specResult,
            allGlobalScales,
            allEncodingRules,
        } = this.iterateLayouts(globalScope, (i, innerScope) => {
            if (facetLayout && i === 0) {
                globalScope.zSize = innerScope.offsets.h;
            }
        });

        if (specResult) {
            return specResult;
        }
        if (allGlobalScales.length > 0) {
            const plotHeightOut = globalSignals.plotHeightOut.name;
            const plotWidthOut = globalSignals.plotWidthOut.name;

            const colTitleScale: LinearScale = {
                type: 'linear',
                name: 'scale_facet_col_title',
                domain: [0, 1],
                range: [0, { signal: plotWidthOut }],
            };

            const rowTitleScale: LinearScale = {
                type: 'linear',
                name: 'scale_facet_row_title',
                domain: [0, 1],
                range: [{ signal: plotHeightOut }, 0],
            };

            const axesScopes: AxesScopeMap = facetLayout ?
                addFacetAxesGroupMarks({
                    globalScope: globalScope.scope,
                    plotScope: groupMark,
                    facetScope: firstScope,
                    colTitleScale,
                    rowTitleScale,
                    colSeqName: 'data_FacetCellColTitles',
                    rowSeqName: 'data_FacetCellRowTitles',
                })
                :
                {
                    main: [{
                        scope: groupMark,
                        lines: true,
                        labels: true,
                        title: true,
                    }],
                };
            addGlobalAxes({
                globalScope,
                allGlobalScales,
                axisScales: this.props.axisScales,
                plotOffsetSignals: { x: globalSignals.plotOffsetLeft, y: globalSignals.plotOffsetBottom },
                axesOffsets: { x: axesOffsetX, y: axesOffsetY },
                axesTitlePadding: facetLayout ? { x: axesTitlePaddingFacetX, y: axesTitlePaddingFacetY } : { x: axesTitlePaddingX, y: axesTitlePaddingY },
                labelBaseline: { x: 'top', y: 'middle' },
                specColumns,
                specViewOptions,
                axesScopes,
                hideZAxis: !!facetLayout,
                view: insight.view,
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
                            as: FieldNames.OffsetX,
                        },
                        {
                            type: 'formula',
                            expr: finalScope.offsets.y,
                            as: FieldNames.OffsetY,
                        },
                    ],
                },
            );
            update.x = {
                field: FieldNames.OffsetX,
            };
            update.y = {
                field: FieldNames.OffsetY,
            };

            allEncodingRules.forEach(map => {
                for (const key in map) {
                    if (update[key]) {
                        const arrIn = map[key];
                        if (!Array.isArray(update[key])) {
                            const value = update[key];
                            const arrOut = [];
                            update[key] = arrOut;
                            arrIn.forEach(rule => arrOut.push(rule));
                            arrOut.push(value);
                        } else {
                            const arrOut = update[key] as {}[];
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
            vegaSpec,
        };
    }

    private initSpec(dataName: string) {
        const { globalSignals } = this;
        const { facetAxesAdjustX, facetAxesAdjustY, minCellWidth, minCellHeight, plotOffsetLeft, plotOffsetBottom, plotOffsetTop, plotOffsetRight, plotHeightOut, plotWidthOut } = globalSignals;
        const { specContext } = this;
        const { insight } = specContext;
        const groupMark: GroupMark = {
            type: 'group',
            //style: 'cell',
            encode: {
                update: {
                    x: { signal: `${SignalNames.PlotOffsetLeft} - ${SignalNames.FacetAxesAdjustX}` },
                    y: { signal: SignalNames.PlotOffsetTop },
                    height: { signal: `${SignalNames.PlotHeightOut} - ${SignalNames.FacetAxesAdjustY}` },
                    width: { signal: `${SignalNames.PlotWidthOut} + ${SignalNames.FacetAxesAdjustX}` },
                },
            },
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
                    update: `max(${SignalNames.MinCellHeight}, ${insight.size.height})`,
                },
                {
                    name: SignalNames.ViewportWidth,
                    update: `max(${SignalNames.MinCellWidth}, ${insight.size.width})`,
                },
                plotOffsetLeft,
                plotOffsetTop,
                plotOffsetBottom,
                plotOffsetRight,
                facetAxesAdjustX,
                facetAxesAdjustY,
                {
                    name: SignalNames.PlotHeightIn,
                    update: `${SignalNames.ViewportHeight} - ${SignalNames.PlotOffsetBottom} + ${SignalNames.FacetAxesAdjustY}`,
                },
                {
                    name: SignalNames.PlotWidthIn,
                    update: `${SignalNames.ViewportWidth} - ${SignalNames.PlotOffsetLeft} - ${SignalNames.PlotOffsetRight}`,
                },
                plotHeightOut,
                plotWidthOut,
                {
                    name: 'height',
                    update: `${SignalNames.PlotOffsetTop} + ${SignalNames.PlotHeightOut} + ${SignalNames.PlotOffsetBottom} - ${SignalNames.FacetAxesAdjustY}`,
                },
                {
                    name: 'width',
                    update: `${SignalNames.PlotWidthOut} + ${SignalNames.PlotOffsetLeft} + ${SignalNames.PlotOffsetRight}`,
                },
            ]),
        };
        return { vegaSpec, groupMark };
    }

    private iterateLayouts(globalScope: GlobalScope, onLayoutBuild: (i: number, innerScope: InnerScope) => void) {
        let specResult: SpecResult;
        let parentScope: InnerScope = {
            sizeSignals: globalScope.sizeSignals,
            offsets: globalScope.offsets,
        };
        let firstScope: InnerScope;
        let childScope: InnerScope;
        const groupings: Grouping[] = [];
        const { layouts, specCapabilities } = this.props;
        const allGlobalScales: GlobalScales[] = [];
        const allEncodingRules: { [key: string]: EncodingRule[] }[] = [];
        for (let i = 0; i < layouts.length; i++) {
            if (!parentScope) continue;
            const buildProps: LayoutBuildProps = {
                globalScope,
                parentScope,
                axesScales: this.props.axisScales,
                groupings,
                id: i,
            };
            const layout = this.createLayout(layouts[i], buildProps);
            try {
                childScope = layout.build();
                childScope.id = i;
                const groupby = layout.getGrouping();
                if (groupby) {
                    groupings.push({
                        id: i,
                        groupby,
                        fieldOps: [
                            { field: null, op: 'count', as: FieldNames.Count },
                        ],
                    });
                }
                const sumOp = layout.getAggregateSumOp();
                if (sumOp) {
                    groupings[groupings.length - 1].fieldOps.push(sumOp);
                }
                onLayoutBuild(i, childScope);
            }
            catch (e) {
                specResult = {
                    errors: [e.stack],
                    specCapabilities,
                    vegaSpec: null,
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
        const { layoutType, props } = layoutPair;
        const layoutBuildProps: LayoutProps & LayoutBuildProps = {
            ...props,
            ...buildProps,
        };
        const layoutClass = layoutClasses[layoutType];
        const layout = new layoutClass(layoutBuildProps);
        layout.id = buildProps.id;
        return layout;
    }
}
