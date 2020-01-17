// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DataNames } from './constants';
import { Footprint, FootprintProps } from './footprints/footprint';
import { getLegends } from './legends';
import { InnerScope, SpecResult } from './interfaces';
import { manifold } from './manifold';
import { Spec } from 'vega-typings';
import { SpecCapabilities, SpecContext } from './types';
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
            const dataName = DataNames.Main;
            const vegaSpec: Spec = {
                $schema: 'https://vega.github.io/schema/vega/v5.json',
                data: [{ name: dataName, transform: [] }],
                marks: [],
                scales: [],
                signals: []
            };
            this.globalScope = { dataName, scope: vegaSpec };

            //create cells, based on insight facets
            this.cellScope = this.createCells(dataName, vegaSpec);

            //create footprints within cells
            const { footprintClass, footprintProps } = this.props;
            const footprint = new footprintClass({ ...footprintProps, global: this.globalScope, parent: this.cellScope });
            this.footprintScope = footprint.build();

            //create unit layouts within footprints
            const { specContext, unitLayoutClass, unitLayoutProps } = this.props;
            const unitLayout = new unitLayoutClass({ ...unitLayoutProps, global: this.globalScope, parent: this.footprintScope });
            unitLayout.build(specContext);

            //final fixups
            const { insight, specColumns } = specContext;
            //TODO axes
            // if (!insight.hideAxes && axes && axes.length) {
            //     vegaSpec.axes = axes;
            // }

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

    private createCells(dataName: string, vegaSpec: Spec): InnerScope {
        const { insight } = this.props.specContext;
        const { columns } = insight;

        if (columns.facet) {
            const facetDataName = DataNames.FacetGroupCell;
            const scope = manifold(this.props.specContext.specColumns, vegaSpec, dataName, facetDataName);
            return { dataName: facetDataName, scope };

        } else {
            //vegaSpec.style = 'cell'; //TODO remove this once we get marks to appear

            Object.assign(vegaSpec, insight.size);
            return { dataName, scope: vegaSpec };
        }
    }
}
