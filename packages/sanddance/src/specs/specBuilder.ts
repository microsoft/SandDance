// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { binnableColorScale } from './scales';
import { BuildProps, Layout, LayoutProps } from './layouts/layout';
import { colorReverseSignal, textSignals } from './signals';
import { ColorScaleNone, ScaleNames, SignalNames } from './constants';
import {
    Column,
    FacetStyle,
    SpecCapabilities,
    SpecContext
} from './types';
import { Cross, CrossProps } from './layouts/cross';
import { fill, opacity } from './fill';
import { InnerScope, SpecResult } from './interfaces';
import { maxbins } from './defaults';
import { push } from '../array';
import {
    Scale,
    Signal,
    Spec,
    Transforms
} from 'vega-typings';
import { Slice, SliceProps } from './layouts/slice';
import { topLookup } from './top';
import { Wrap, WrapProps } from './layouts/wrap';

export interface DiscreteAxisScale {
    discrete: true;
}

export type Aggregate = 'count' | 'multiply' | 'sum' | 'percent';

export interface ContinuousAxisScale {
    discrete: false;
    aggregate?: Aggregate;
}

export type AxisScale = DiscreteAxisScale | ContinuousAxisScale;

export interface AxisScales {
    x: AxisScale;
    y: AxisScale;
    z: AxisScale;
}

export interface LayoutPair {
    props?: LayoutProps;
    layoutClass: typeof Layout;
}

export interface SpecBuilderProps {
    axisScales?: AxisScales;
    layouts: LayoutPair[];
    specContext: SpecContext;
    errors?: string[];
    specCapabilities: SpecCapabilities;
    customZScale?: boolean;
}

export class SpecBuilder {
    public globalScope: InnerScope;

    constructor(public props: SpecBuilderProps) {
    }

    public validate() {
        const required = this.props.specCapabilities.roles.filter(r => !r.allowNone);
        const errors = required.map(r => {
            if (this.props.specContext.specColumns[r.role]) {
                return null;
            } else {
                return `Must set a field for ${r.role}`;
            }
        }).filter(Boolean);
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
            let dataName = 'data_source';
            const vegaSpec: Spec = {
                $schema: 'https://vega.github.io/schema/vega/v5.json',
                axes: [],
                data: [{ name: dataName, transform: [] }],
                marks: [],
                scales: [],

                //TODO add color & text signals
                // signals: allTruthy<Signal>(
                //     textSignals(specContext),
                //     [
                //         colorBinCountSignal(specContext),
                //         colorReverseSignal(specContext)
                //     ]
                // )

                signals: textSignals(specContext, 'h2').concat([
                    colorReverseSignal(specContext)
                ])
            };

            const topColorField = 'top_color';
            const categoricalColor = specColumns.color && !specColumns.color.quantitative;
            if (categoricalColor) {
                const legendName = 'data_legend';
                push(vegaSpec.data, topLookup(specColumns.color, specViewOptions.maxLegends, dataName, legendName, 'top_colors', topColorField));
                dataName = legendName;
            }

            if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
                if (specColumns.color.quantitative) {
                    vegaSpec.scales.push(binnableColorScale(insight.colorBin, dataName, specColumns.color.name, insight.scheme));
                } else {
                    vegaSpec.scales.push(
                        {
                            name: ScaleNames.Color,
                            type: 'ordinal',
                            domain: {
                                data: dataName,
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

            this.globalScope = {
                dataName,
                scope: vegaSpec,
                sizeSignals: {
                    height: 'h2',
                    width: 'w2'
                }
            };

            let { layouts } = this.props;

            if (insight.columns.facet) {
                const manifold = this.getManifoldLayout(insight.facetStyle, specColumns.facet, specColumns.facetV);
                push(vegaSpec.signals, manifold.signals);
                push(vegaSpec.scales, manifold.scales);
                layouts = [manifold.layoutPair, ...layouts];

                //TODO figure out tile size for facets
                vegaSpec.signals.push(
                    {
                        name: 'h2',
                        value: 100
                    },
                    {
                        name: 'w2',
                        value: 100
                    }
                );
            } else {
                vegaSpec.signals.push(
                    {
                        name: 'h2',
                        update: 'height'
                    },
                    {
                        name: 'w2',
                        update: 'width'
                    }
                );
                vegaSpec.height = insight.size.height;
                vegaSpec.width = insight.size.width;
                //vegaSpec.autosize = 'fit';
            }

            const globalTransforms: { [columnName: string]: Transforms[] } = {};

            let parentScope = this.globalScope;
            for (let i = 0; i < layouts.length; i++) {
                if (!parentScope) continue;
                if (!parentScope.scope) break;
                let { layoutClass, props } = layouts[i];
                let layoutBuildProps: LayoutProps & BuildProps = {
                    ...props,
                    global: this.globalScope,
                    parent: parentScope,
                    axesScales: this.props.axisScales
                };
                const layout = new layoutClass(layoutBuildProps);
                layout.id = i;
                let childScope = layout.build();
                if (childScope) {
                    if (props.addScaleAxes && childScope.globalScales) {
                        this.addGlobalScales(childScope.globalScales, layoutBuildProps.axesScales);
                    }
                    if (childScope.globalTransforms) {
                        for (let columnName in childScope.globalTransforms) {
                            globalTransforms[columnName] = childScope.globalTransforms[columnName];
                        }
                    }
                }
                parentScope = childScope;
            }

            //add mark to the final scope
            if (parentScope.mark) {
                parentScope.mark.encode.update.fill = fill(specContext, topColorField);
                parentScope.mark.encode.update.opacity = opacity(specContext);
            }


            for (let columnName in globalTransforms) {
                push(vegaSpec.data[0].transform, globalTransforms[columnName]);
            }

            //TODO apply the x/y/z axes


            //final fixups

            // const legends = getLegends(specContext);
            // if (legends) {
            //     vegaSpec.legends = legends;
            // }

            // if (!specColumns.facet) {
            //     //use autosize only when not faceting
            //     vegaSpec.autosize = 'fit';
            // }

            return {
                specCapabilities,
                vegaSpec
            }
        }
    }

    private addGlobalScales(globalScales: { x?: Scale, y?: Scale, z?: Scale }, axisScales: AxisScales) {

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
                        if (axisScale.discrete) {
                            //band scale
                        } else {
                            //continuous scale
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

    private getManifoldLayout(facetStyle: FacetStyle, facetColumn: Column, facetVColumn: Column) {
        let layoutPair: LayoutPair;
        const scales: Scale[] = [];
        const signals: Signal[] = [];
        const groupby = facetColumn;
        switch (facetStyle) {
            case 'horizontal': {
                const props: SliceProps = {
                    orientation: 'horizontal',
                    maxbins,
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
                    maxbins,
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
                    groupby,
                    maxbins
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
