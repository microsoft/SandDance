// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    addData,
    addMarks,
    addScale,
    addSignal,
    addTransforms,
    getDataByName
} from '../scope';
import { addFacetColRowTitles } from '../facetTitle';
import { Binnable, binnable } from '../bin';
import { createOrdinalsForFacet, ordinalScale } from '../ordinal';
import {
    Data,
    FormulaTransform,
    GroupEncodeEntry,
    GroupMark,
    LookupTransform,
    OrdinalScale,
    SortOrder
} from 'vega-typings';
import {
    DiscreteColumn,
    InnerScope,
    SizeSignals,
    Titles,
    TitleSource
} from '../interfaces';
import { displayBin, serializeAsVegaExpression } from '../facetSearch';
import { FieldNames, SignalNames } from '../constants';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { modifySignal } from '../signals';

export interface CrossProps extends LayoutProps {
    axisTextColor: string;
    colRowTitles: boolean;
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
        fullDataName: string,
        dimScale: string,
        dimCount: string,
        dimCategorical: string,
        dimCellSizeCalc: string,
        dimCellSize: string,
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
            fullDataName: `data_${p}_full`,
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
        const { axisTextColor, colRowTitles, globalScope, parentScope } = props;
        const titles: Titles = { x: { dataName: null, quantitative: null }, y: { dataName: null, quantitative: null } };
        const update: GroupEncodeEntry = {
            height: {
                signal: `${names.dimCellSize}_y`
            },
            width: {
                signal: `${names.dimCellSize}_x`
            }
        };
        const dimensions = [
            {
                dim: 'x',
                bin: binX,
                sortOrder: <SortOrder>'ascending',
                size: parentScope.sizeSignals.layoutWidth,
                layout: parentScope.sizeSignals.layoutWidth,
                min: globalScope.signals.minCellWidth.name,
                out: globalScope.signals.plotWidthOut,
                offset: SignalNames.FacetPaddingLeft,
                padding: SignalNames.FacetPaddingLeft,
                dataOut: <Data>null,
                scaleName: <string>null
            },
            {
                dim: 'y',
                bin: binY,
                sortOrder: <SortOrder>'ascending',
                size: parentScope.sizeSignals.layoutHeight,
                layout: parentScope.sizeSignals.layoutHeight,
                min: globalScope.signals.minCellHeight.name,
                out: globalScope.signals.plotHeightOut,
                offset: SignalNames.FacetPaddingTop,
                padding: `(${SignalNames.FacetPaddingTop} + ${SignalNames.FacetPaddingBottom})`,
                dataOut: <Data>null,
                scaleName: <string>null
            }
        ];
        dimensions.forEach(d => {
            const { bin, dim, offset, padding, sortOrder } = d;
            let data: Data;
            let dataName: string;
            let countSignal: string;
            let scale: OrdinalScale;
            const titleSource: TitleSource = titles[dim];
            if (bin.native === false) {
                addSignal(globalScope.scope, bin.maxbinsSignal);
                addTransforms(getDataByName(globalScope.scope.data, globalScope.dataName).data, ...bin.transforms);
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
                const ord = createOrdinalsForFacet(dataName, `${prefix}_${dim}`, bin.fields, sortOrder);
                data = ord.data;
                addData(globalScope.scope, ord.data);
                countSignal = `length(data(${JSON.stringify(ord.data.name)}))`;
                scale = ord.scale;
                titleSource.dataName = ord.data.name;
            }
            titleSource.quantitative = bin.discreteColumn.column.quantitative;
            d.dataOut = data;
            d.scaleName = scale.name;
            addTransforms(data,
                {
                    type: 'formula',
                    expr: serializeAsVegaExpression(bin, FieldNames.First, FieldNames.Last),
                    as: FieldNames.FacetSearch
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
                    update: `${d.layout} / ${count}`
                },
                {
                    name: size,
                    update: `max(${d.min}, (${calc} - ${padding}))`
                }
            );
            modifySignal(d.out, 'max', `((${size} + ${padding}) * ${count})`);
            update[dim] = {
                signal: `${offset} + (scale(${JSON.stringify(scale.name)}, datum[${JSON.stringify(bin.fields[0])}]) - 1) * (${size} + ${padding})`
            };
        });

        const facetSearchUnion: FormulaTransform = {
            type: 'formula',
            expr: `[datum[${JSON.stringify(`${FieldNames.FacetSearch}_x`)}], merge(datum[${JSON.stringify(`${FieldNames.FacetSearch}_y`)}], { clause: '&&'})]`,
            as: FieldNames.FacetSearch
        };

        addData(globalScope.scope, {
            name: names.crossData,
            source: parentScope.dataName,
            transform: [
                ...dimensions.map(d => {
                    return <LookupTransform>{
                        type: 'lookup',
                        from: d.dataOut.name,
                        key: d.bin.fields[0],
                        fields: [d.bin.fields[0]],
                        values: [FieldNames.FacetSearch],
                        as: [`${FieldNames.FacetSearch}_${d.dim}`]
                    };
                }),
                facetSearchUnion
            ]
        });

        const group: GroupMark = {
            style: 'cell',
            name: prefix,
            type: 'group',
            from: {
                facet: {
                    name: names.facetDataName,
                    data: names.crossData,
                    groupby: binX.fields.concat(binY.fields).concat([FieldNames.FacetSearch])
                }
            },
            encode: {
                update
            }
        };

        addMarks(parentScope.scope, group);

        const xy = 'xy';
        const fieldFull = 'full';

        addData(globalScope.scope,
            {
                name: names.fullDataName,
                source: names.crossData,
                transform: [
                    {
                        type: 'aggregate',
                        groupby: binX.fields.concat(binY.fields)
                    },
                    ...dimensions.map(d => {
                        return <FormulaTransform>{
                            type: 'formula',
                            expr: `scale(${JSON.stringify(d.scaleName)}, datum[${JSON.stringify(d.bin.fields[0])}])`,
                            as: d.dim
                        };
                    }),
                    {
                        type: 'formula',
                        expr: 'join([datum.x, datum.y])',
                        as: xy
                    }
                ]
            },
            {
                name: names.emptyDataName,
                transform: [
                    {
                        type: 'sequence',
                        start: 0,
                        stop: {
                            signal: `${dimensions.map(d => `${names.dimCount}_${d.dim}`).join(' * ')}`
                        }
                    },
                    {
                        type: 'formula',
                        expr: `datum.data % ${names.dimCount}_x + 1`,
                        as: 'x'
                    },
                    {
                        type: 'formula',
                        expr: `floor(datum.data / ${names.dimCount}_x) + 1`,
                        as: 'y'
                    },
                    {
                        type: 'formula',
                        expr: 'join([datum.x, datum.y])',
                        as: xy
                    },
                    {
                        type: 'lookup',
                        from: names.fullDataName,
                        key: xy,
                        fields: [xy],
                        values: [xy],
                        as: [fieldFull]
                    },
                    {
                        type: 'filter',
                        expr: `datum[${JSON.stringify(fieldFull)}] === null`
                    },
                    ...dimensions.map(d => {
                        return <LookupTransform>{
                            type: 'lookup',
                            from: d.dataOut.name,
                            key: FieldNames.Ordinal,
                            fields: [d.dim],
                            values: [d.bin.fields[0]]
                        };
                    }),
                    ...dimensions.map(d => {
                        return <LookupTransform>{
                            type: 'lookup',
                            from: d.dataOut.name,
                            key: FieldNames.Ordinal,
                            fields: [d.dim],
                            values: d.bin.discreteColumn.column.quantitative ?
                                d.bin.fields.concat([FieldNames.First, FieldNames.Last])
                                :
                                d.bin.fields,
                            as: d.bin.discreteColumn.column.quantitative ?
                                d.bin.fields.concat([`${FieldNames.First}_${d.dim}`, `${FieldNames.Last}_${d.dim}`])
                                : d.bin.fields
                        };
                    }),
                    ...dimensions.map(d => {
                        return <FormulaTransform>{
                            type: 'formula',
                            expr: serializeAsVegaExpression(d.bin, `${FieldNames.First}_${d.dim}`, `${FieldNames.Last}_${d.dim}`),
                            as: `${FieldNames.FacetSearch}_${d.dim}`
                        };
                    }),
                    facetSearchUnion
                ]
            }
        );

        const emptyUpdate: GroupEncodeEntry = {
            height: {
                signal: `${names.dimCellSize}_y`
            },
            width: {
                signal: `${names.dimCellSize}_x`
            }
        };

        dimensions.forEach(d => {
            emptyUpdate[d.dim] = {
                signal: `${d.offset} + (datum.${d.dim} - 1) * (${names.dimCellSize}_${d.dim} + ${d.padding})`
            };
        });

        addMarks(parentScope.scope, {
            name: names.emptyMarkName,
            style: 'cell',
            type: 'group',
            from: {
                data: names.emptyDataName
            },
            encode: {
                update: emptyUpdate
            }
        });

        const sizeSignals: SizeSignals = {
            layoutHeight: `${names.dimCellSize}_y`,
            layoutWidth: `${names.dimCellSize}_x`,
            colCount: `${names.dimCount}_x`,
            rowCount: `${names.dimCount}_y`
        };

        if (colRowTitles) {
            addFacetColRowTitles(globalScope.scope, titles.x, titles.y, sizeSignals, axisTextColor);
        }

        return {
            dataName: names.facetDataName,
            scope: group,
            sizeSignals,
            titles
        };
    }
}
