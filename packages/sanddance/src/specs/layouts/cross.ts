// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    addData,
    addMarks,
    addScale,
    addSignal,
    addTransforms
} from '../scope';
import { Binnable, binnable } from '../bin';
import { createOrdinalsForFacet, ordinalScale } from '../ordinal';
import { DiscreteColumn, InnerScope } from '../interfaces';
import { facetPaddingBottom, facetPaddingLeft, facetPaddingTop } from '../defaults';
import { FieldNames } from '../constants';
import { GroupEncodeEntry, GroupMark, OrdinalScale } from '@msrvida/vega-deck.gl/node_modules/vega-typings/types';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { modifySignal } from '../signals';

export interface CrossProps extends LayoutProps {
    groupbyX: DiscreteColumn;
    groupbyY: DiscreteColumn;
}

export class Cross extends Layout {
    private binX: Binnable;
    private binY: Binnable;
    private names: {
        crossData: string,
        facetDataName: string,
        emptyDataName: string,
        emptyMarkName: string,
        dimScale: string,
        dimCount: string,
        dimCategorical: string,
        dimCellSizeCalc: string,
        dimCellSize: string
    };

    constructor(public props: CrossProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `cross_${this.id}`;
        this.binX = binnable(`${p}_x`, props.globalScope.dataName, props.groupbyX);
        this.binY = binnable(`${p}_y`, props.globalScope.dataName, props.groupbyY);
        this.names = {
            crossData: `data_${p}_cross`,
            facetDataName: `data_${p}_facet`,
            emptyDataName: `data_${p}_empty`,
            emptyMarkName: `${p}_empty`,
            dimScale: `scale_${p}`,
            dimCount: `${p}_count`,
            dimCategorical: `data_${p}_cat`,
            dimCellSize: `${p}_cell_size`,
            dimCellSizeCalc: `${p}_cell_calc`
        };
    }

    public getGrouping() {
        return this.binX.fields.concat(this.binY.fields);
    }

    public build(): InnerScope {
        const { binX, binY, names, prefix, props } = this;
        const { globalScope, parentScope } = props;
        const update: GroupEncodeEntry = {
            height: {
                signal: `${names.dimCellSize}_y`
            },
            width: {
                signal: `${names.dimCellSize}_x`
            },
        };
        const dimensions = [
            {
                dim: 'x',
                bin: binX,
                size: parentScope.sizeSignals.layoutWidth,
                layout: parentScope.sizeSignals.layoutWidth,
                min: globalScope.signals.minCellWidth.name,
                out: globalScope.signals.plotWidthOut,
                offset: facetPaddingLeft,
                padding: facetPaddingLeft
            },
            {
                dim: 'y',
                bin: binY,
                size: parentScope.sizeSignals.layoutHeight,
                layout: parentScope.sizeSignals.layoutHeight,
                min: globalScope.signals.minCellHeight.name,
                out: globalScope.signals.plotHeightOut,
                offset: facetPaddingTop,
                padding: `(${facetPaddingTop} + ${facetPaddingBottom})`
            }
        ];
        dimensions.forEach(o => {
            const { bin, dim, offset, padding } = o;
            let data: string;
            let countSignal: string;
            let scale: OrdinalScale;
            if (bin.native === false) {
                addSignal(globalScope.scope, bin.maxbinsSignal);
                addTransforms(globalScope.scope.data[0], ...bin.transforms);
                addData(globalScope.scope, bin.dataSequence);
                addTransforms(bin.dataSequence, {
                    type: 'formula',
                    expr: `indata(${JSON.stringify(parentScope.dataName)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                    as: FieldNames.Contains
                });
                data = bin.dataSequence.name;
                countSignal = `length(data(${JSON.stringify(data)}))`;
                scale = ordinalScale(data, `${names.dimScale}_${dim}`, bin.fields);
            } else {
                data = globalScope.dataName;
                const ord = createOrdinalsForFacet(data, `${prefix}_${dim}`, bin.fields);
                addData(globalScope.scope, ord.data);
                countSignal = `length(data(${JSON.stringify(ord.data.name)}))`;
                scale = ord.scale;
            }
            addScale(globalScope.scope, scale);
            const count = `${names.dimCount}_${dim}`;
            const calc = `${names.dimCellSizeCalc}_${dim}`;
            const size = `${names.dimCellSize}_${dim}`;
            addSignal(globalScope.scope, { name: count, update: countSignal });
            addSignal(globalScope.scope,
                {
                    name: calc,
                    update: `${o.layout} / ${count}`
                },
                {
                    name: size,
                    update: `max(${o.min}, (${calc} - ${padding}))`
                }
            )
            modifySignal(o.out, 'max', `((${size} + ${padding}) * ${count})`);
            update[dim] = {
                signal: `${offset} + (scale(${JSON.stringify(scale.name)}, datum[${JSON.stringify(bin.fields[0])}]) - 1) * (${size} + ${padding})`
            };
        });

        addData(globalScope.scope, {
            name: names.crossData,
            source: parentScope.dataName,
            transform: [
                {
                    type: 'formula',
                    expr: `['?', 77]`,
                    as: FieldNames.FacetRange
                }
            ]
        });

        const mark: GroupMark = {
            style: 'cell',
            name: prefix,
            type: 'group',
            from: {
                facet: {
                    name: names.facetDataName,
                    data: names.crossData,
                    groupby: binX.fields.concat(binY.fields).concat([FieldNames.FacetRange])
                }
            },
            encode: {
                update
            }
        };

        addMarks(parentScope.scope, mark);

        return {
            dataName: names.facetDataName,
            scope: mark,
            emptyScope: null,
            sizeSignals: {
                layoutHeight: `${names.dimCellSize}_y`,
                layoutWidth: `${names.dimCellSize}_x`,
                colCount: `${names.dimCount}_x`,
                rowCount: `${names.dimCount}_y`
            }
        };
    }
}
