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
import {
    Data,
    GroupEncodeEntry,
    GroupMark,
    OrdinalScale
} from 'vega-typings';
import {
    DiscreteColumn,
    InnerScope,
    Titles,
    TitleSource
} from '../interfaces';
import { displayBin, serializeAsVegaExpression } from '../facetTitle';
import { FieldNames, SignalNames } from '../constants';
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
        const titles: Titles = { x: { dataName: null, quantitative: null }, y: { dataName: null, quantitative: null } };
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
                offset: SignalNames.FacetPaddingLeft,
                padding: SignalNames.FacetPaddingLeft,
                dataOut: <Data>null
            },
            {
                dim: 'y',
                bin: binY,
                size: parentScope.sizeSignals.layoutHeight,
                layout: parentScope.sizeSignals.layoutHeight,
                min: globalScope.signals.minCellHeight.name,
                out: globalScope.signals.plotHeightOut,
                offset: SignalNames.FacetPaddingTop,
                padding: `(${SignalNames.FacetPaddingTop} + ${SignalNames.FacetPaddingBottom})`,
                dataOut: <Data>null
            }
        ];
        dimensions.forEach(o => {
            const { bin, dim, offset, padding } = o;
            let data: Data;
            let dataName: string;
            let countSignal: string;
            let scale: OrdinalScale;
            const titleSource: TitleSource = titles[dim];
            if (bin.native === false) {
                addSignal(globalScope.scope, bin.maxbinsSignal);
                addTransforms(globalScope.scope.data[0], ...bin.transforms);
                addData(globalScope.scope, bin.dataSequence);
                addTransforms(bin.dataSequence,
                    {
                        type: 'formula',
                        expr: `indata(${JSON.stringify(parentScope.dataName)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                        as: FieldNames.Contains
                    }
                );
                data = bin.dataSequence;
                dataName = bin.dataSequence.name;
                countSignal = `length(data(${JSON.stringify(dataName)}))`;
                scale = ordinalScale(dataName, `${names.dimScale}_${dim}`, bin.fields);
                titleSource.dataName = bin.dataSequence.name;
            } else {
                dataName = globalScope.dataName;
                const ord = createOrdinalsForFacet(dataName, `${prefix}_${dim}`, bin.fields);
                data = ord.data;
                addData(globalScope.scope, ord.data);
                countSignal = `length(data(${JSON.stringify(ord.data.name)}))`;
                scale = ord.scale;
                titleSource.dataName = ord.data.name;
            }
            titleSource.quantitative = bin.discreteColumn.column.quantitative;
            o.dataOut = data;
            addTransforms(data,
                {
                    type: 'formula',
                    expr: serializeAsVegaExpression(bin),
                    as: FieldNames.FacetRange
                },
                {
                    type: 'formula',
                    expr: displayBin(bin),
                    as: FieldNames.FacetTitle
                }
            );
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
                    type: 'lookup',
                    from: dimensions[0].dataOut.name,
                    key: binX.fields[0],
                    fields: [binX.fields[0]],
                    values: [FieldNames.FacetRange],
                    as: ['FRX']
                },
                {
                    type: 'lookup',
                    from: dimensions[1].dataOut.name,
                    key: binY.fields[0],
                    fields: [binY.fields[0]],
                    values: [FieldNames.FacetRange],
                    as: ['FRY']
                },
                {
                    type: 'formula',
                    expr: `[datum.FRX, merge(datum.FRY, { clause: '&&'})]`,
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
            },
            titles
        };
    }
}
