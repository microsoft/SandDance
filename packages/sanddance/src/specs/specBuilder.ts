// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy, push } from '../array';
import { colorBinCountSignal, colorReverseSignal, textSignals } from './signals';
import { Layout, LayoutProps, BuildProps } from './layouts/layout';
import { getColorScale, getZScale } from './scales';
import { getLegends } from './legends';
import { InnerScope, SpecResult, SizeSignals } from './interfaces';
import { manifold } from './manifold';
import { Scale, Signal, Spec, Transforms } from 'vega-typings';
import { Size, SpecCapabilities, SpecContext, SpecColumns, Column, FacetStyle } from './types';
import { topLookup } from './top';
import { Slice, SliceProps } from './layouts/slice';
import { WrapProps, Wrap } from './layouts/wrap';
import { CrossProps, Cross } from './layouts/cross';
import { maxbins } from './defaults';

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
                scales: this.getScales(),

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
                    height: 'height',
                    width: 'width'
                }
            };

            let { layouts } = this.props;

            if (insight.columns.facet) {
                const manifold = this.getManifoldLayout(insight.facetStyle, specColumns.facet, specColumns.facetV);
                push(vegaSpec.signals, manifold.signals);
                push(vegaSpec.scales, manifold.scales);
                layouts = [manifold.layoutPair, ...layouts];
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
                    specContext,
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

            //TODO apply the x/y/z scales

            //TODO add mark to the final scope


            // //create cells, based on insight facets
            // const cellScope = this.createCells(dataName, vegaSpec);
            // this.cellScope = cellScope;
            // push(vegaSpec.signals, [
            //     { name: 'child_height', value: cellScope.height },
            //     { name: 'child_width', value: cellScope.width }
            // ]);

            // //create footprints within cells
            // const { footprintClass, footprintProps } = this.props;
            // const footprint = new footprintClass({ ...footprintProps, global: this.globalScope, parent: this.cellScope });
            // this.footprintScope = footprint.build();

            // //create unit layouts within footprints
            // const { unitLayoutClass, unitLayoutProps } = this.props;
            // const unitLayout = new unitLayoutClass({ ...unitLayoutProps, global: this.globalScope, parent: this.footprintScope });
            // unitLayout.build(specContext);

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

    // private createCells(dataName: string, vegaSpec: Spec): InnerScope & Size {
    //     const { insight } = this.props.specContext;
    //     const { columns } = insight;

    //     //TODO axes
    //     // if (!insight.hideAxes && axes && axes.length) {
    //     //     vegaSpec.axes = axes;
    //     // }

    //     if (columns.facet) {
    //         //TODO: deal with size
    //         const height = 200, width = 200;
    //         const facetDataName = DataNames.FacetGroupCell;
    //         const scope = manifold(this.props.specContext.specColumns, vegaSpec, dataName, facetDataName);
    //         return { dataName: facetDataName, scope, height, width };

    //     } else {
    //         Object.assign(vegaSpec, insight.size);
    //         return { dataName, scope: vegaSpec, ...insight.size };
    //     }
    // }

    private getScales() {
        const scales: Scale[] = [];

        //TODO scales from axesScale prop
        // scales: allTruthy<Scale>([
        //     getColorScale(specColumns.color, insight),
        //     !this.props.customZScale && getZScale(specColumns.z)
        // ]),

        return scales;
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
