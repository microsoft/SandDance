// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { allTruthy, push } from '../array';
import { colorBinCountSignal, colorReverseSignal, textSignals } from './signals';
import { DataNames } from './constants';
import { Footprint, FootprintProps } from './footprints/footprint';
import { getColorScale } from './scales';
import { getLegends } from './legends';
import { InnerScope, SpecResult } from './interfaces';
import { manifold } from './manifold';
import { Signal, Spec } from 'vega-typings';
import { Size, SpecCapabilities, SpecContext } from './types';
import { topLookup } from './top';
import { UnitLayout, UnitLayoutProps } from './unitLayouts/unitLayout';

export interface SpecBuilderProps {
    footprintProps?: FootprintProps;
    footprintClass: typeof Footprint;
    unitLayoutProps?: UnitLayoutProps;
    unitLayoutClass: typeof UnitLayout;
    specContext: SpecContext;
    errors?: string[];
    specCapabilities: SpecCapabilities;
}

export class SpecBuilder {
    public globalScope: InnerScope;
    public cellScope: InnerScope;
    public footprintScope: InnerScope;

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
            let dataName = DataNames.Main;
            const vegaSpec: Spec = {
                $schema: 'https://vega.github.io/schema/vega/v5.json',
                data: [{ name: dataName, transform: [] }],
                marks: [],
                scales: [getColorScale(specColumns.color, insight)],
                signals: allTruthy<Signal>(
                    textSignals(specContext),
                    [
                        colorBinCountSignal(specContext),
                        colorReverseSignal(specContext)
                    ]
                )
            };

            const categoricalColor = specColumns.color && !specColumns.color.quantitative;
            if (categoricalColor) {
                push(vegaSpec.data, topLookup(specColumns.color, specViewOptions.maxLegends));
                dataName = DataNames.Legend;
            }

            this.globalScope = { dataName, scope: vegaSpec };

            //create cells, based on insight facets
            const cellScope = this.createCells(dataName, vegaSpec);
            this.cellScope = cellScope;
            push(vegaSpec.signals, [
                { name: 'child_height', value: cellScope.height },
                { name: 'child_width', value: cellScope.width }
            ]);

            //create footprints within cells
            const { footprintClass, footprintProps } = this.props;
            const footprint = new footprintClass({ ...footprintProps, global: this.globalScope, parent: this.cellScope });
            this.footprintScope = footprint.build();

            //create unit layouts within footprints
            const { unitLayoutClass, unitLayoutProps } = this.props;
            const unitLayout = new unitLayoutClass({ ...unitLayoutProps, global: this.globalScope, parent: this.footprintScope });
            unitLayout.build(specContext);

            //final fixups

            const legends = getLegends(specContext);
            if (legends) {
                vegaSpec.legends = legends;
            }

            if (!specColumns.facet) {
                //use autosize only when not faceting
                vegaSpec.autosize = 'fit';
            }

            return {
                specCapabilities,
                vegaSpec
            }
        }
    }

    private createCells(dataName: string, vegaSpec: Spec): InnerScope & Size {
        const { insight } = this.props.specContext;
        const { columns } = insight;

        //TODO axes
        // if (!insight.hideAxes && axes && axes.length) {
        //     vegaSpec.axes = axes;
        // }

        if (columns.facet) {
            //TODO: deal with size
            const height = 200, width = 200;
            const facetDataName = DataNames.FacetGroupCell;
            const scope = manifold(this.props.specContext.specColumns, vegaSpec, dataName, facetDataName);
            return { dataName: facetDataName, scope, height, width };

        } else {
            Object.assign(vegaSpec, insight.size);
            return { dataName, scope: vegaSpec, ...insight.size };
        }
    }
}
