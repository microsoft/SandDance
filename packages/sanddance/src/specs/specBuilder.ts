// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    AxisOrient,
    NewSignal,
    Scale,
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
import { Cross, CrossProps } from './layouts/cross';
import { FacetStyle, SpecCapabilities, SpecContext } from './types';
import { fill, opacity } from './fill';
import { getLegends } from './legends';
import { LayoutBuildProps, LayoutPair, LayoutProps } from './layouts/layout';
import { minFacetSize } from './defaults';
import { push } from '../array';
import { Slice, SliceProps } from './layouts/slice';
import { topLookup } from './top';
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

            const minCellX: NewSignal = {
                name: SignalNames.MinCellX,
                update: `${minFacetSize}`
            };

            const minCellY: NewSignal = {
                name: SignalNames.MinCellY,
                update: `${minFacetSize}`
            };

            let dataName = 'data_source';
            const vegaSpec: Spec = {
                $schema: 'https://vega.github.io/schema/vega/v5.json',
                axes: [],
                data: [{ name: dataName, transform: [] }],
                marks: [],
                scales: [],
                signals: textSignals(specContext, SignalNames.ViewportY).concat([
                    minCellX,
                    minCellY,
                    {
                        name: SignalNames.ViewportY,
                        update: `max(${SignalNames.MinCellY}, ${insight.size.height.toString()})`
                    },
                    {
                        name: SignalNames.ViewportX,
                        update: `max(${SignalNames.MinCellX}, ${insight.size.width.toString()})`
                    },
                ])
            };

            const { topColorField, colorDataName } = this.addColor(vegaSpec, dataName);

            this.globalScope = {
                dataName: colorDataName,
                scope: vegaSpec,
                sizeSignals: insight.columns.facet
                    ?
                    {
                        facetHeight: minCellY.name,
                        facetWidth: minCellX.name
                    }
                    :
                    {
                        facetHeight: SignalNames.ViewportY,
                        facetWidth: SignalNames.ViewportX
                    }
                ,
                signals: {
                    minCellX,
                    minCellY
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
            } else {
                vegaSpec.signals.push(
                    {
                        name: 'height',
                        update: SignalNames.ViewportY
                    },
                    {
                        name: 'width',
                        update: SignalNames.ViewportX
                    }
                );
            }

            let parentScope: InnerScope = this.globalScope;
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
                        this.addGlobalScales(childScope.globalScales, layoutBuildProps.axesScales);
                    }
                    //the first layout when faceting may determine the overall height
                    if (i === 0 && insight.columns.facet) {
                        if (childScope.sizeSignals.totalHeight) {
                            vegaSpec.signals.push({
                                name: 'height',
                                update: childScope.sizeSignals.totalHeight
                            });
                        }
                        if (childScope.sizeSignals.totalWidth) {
                            vegaSpec.signals.push({
                                name: 'width',
                                update: childScope.sizeSignals.totalWidth
                            });
                        }
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

    private addColor(vegaSpec: Spec, dataSource: string) {
        let colorDataName = dataSource;
        const { specContext } = this.props;
        const { insight, specColumns, specViewOptions } = specContext;
        const legends = getLegends(specContext);
        if (legends) {
            vegaSpec.legends = legends;
        }

        const topColorField = 'top_color';
        const categoricalColor = specColumns.color && !specColumns.color.quantitative;
        if (categoricalColor) {
            const legendName = 'data_legend';
            push(vegaSpec.data, topLookup(specColumns.color, specViewOptions.maxLegends, dataSource, legendName, 'top_colors', topColorField));
            colorDataName = legendName;
        }

        if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
            if (specColumns.color.quantitative) {
                vegaSpec.scales.push(binnableColorScale(insight.colorBin, dataSource, specColumns.color.name, insight.scheme));
            } else {
                vegaSpec.scales.push(
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

        push(vegaSpec.signals, [
            colorBinCountSignal(specContext),
            colorReverseSignal(specContext)
        ]);

        return { topColorField, colorDataName };
    }

    private addGlobalScales(globalScales: { x?: Scale, y?: Scale, z?: Scale }, axisScales: AxisScales) {

        const add = (axisScale: AxisScale, scale: Scale, orient: AxisOrient) => {

        };

        add(axisScales.x, globalScales.x, 'bottom');
        add(axisScales.y, globalScales.y, 'left');
        add(axisScales.z, globalScales.z, 'left');

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
                        switch (axisScale.type) {
                            //band scale
                            //continuous scale
                            //etc
                        }
                        scope.axes.push({
                            scale: scale.name,
                            orient: s === 'x' ? 'bottom' : 'left'
                        });
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
