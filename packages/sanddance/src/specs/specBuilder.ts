// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { BuildProps, Layout, LayoutProps } from './layouts/layout';
import {
    Column,
    FacetStyle,
    SpecCapabilities,
    SpecContext
} from './types';
import { Cross, CrossProps } from './layouts/cross';
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
                //height: insight.size.height,
                //width: insight.size.width,
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

                signals: []
            };

            // const categoricalColor = specColumns.color && !specColumns.color.quantitative;
            // if (categoricalColor) {
            //     push(vegaSpec.data, topLookup(specColumns.color, specViewOptions.maxLegends));
            //     dataName = 'data_legend';
            // }

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
                        value: insight.size.height
                    },
                    {
                        name: 'w2',
                        value: insight.size.width
                    }
                );
            }

            const globalTransforms: { [columnName: string]: Transforms[] } = {};

            let parentScope = this.globalScope;
            for (let i = 0; i < layouts.length; i++) {
                if (!parentScope) continue;
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
                    if (childScope.globalScales) {
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

            for (let columnName in globalTransforms) {
                push(vegaSpec.data[0].transform, globalTransforms[columnName]);
            }

            //TODO apply the x/y/z axes

            //TODO add mark to the final scope

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
        for (let s in globalScales) {
            let scale: Scale = globalScales[s];
            if (scale) {
                //TODO check to see if scale exists in global scope
                this.globalScope.scope.scales.push(scale);
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
                    groupby,
                    groupbyV: facetVColumn
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
