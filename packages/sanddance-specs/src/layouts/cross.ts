// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { Binnable, binnable } from '../bin';
import { FieldNames, SignalNames } from '../constants';
import { displayBin, serializeAsVegaExpression } from '../facetSearch';
import { addFacetColRowTitles } from '../facetTitle';
import {
    DiscreteColumn,
    InnerScope,
    LayoutOffsets,
    SizeSignals,
    Titles,
    TitleSource
} from '../interfaces';
import { createOrdinals, ordinalScale } from '../ordinal';
import {
    addData,
    addMarks,
    addScales,
    addSignals,
    addTransforms
} from '../scope';
import { modifySignal } from '../signals';
import {
    Data,
    GroupMark,
    NewSignal,
    OrdinalScale,
    SortOrder
} from 'vega-typings';

export interface CrossProps extends LayoutProps {
    axisTextColor: string;
    colRowTitles: boolean;
    groupbyX: DiscreteColumn;
    groupbyY: DiscreteColumn;
}

interface Dimension {
    dim: string;
    bin: Binnable;
    sortOrder: SortOrder;
    size: string;
    layout: string;
    min: string;
    out: NewSignal;
    offset: string;
    padding: string;
    dataOut: Data;
    scaleName: string;
    position: string;
}

export class Cross extends Layout {
    private binX: Binnable;
    private binY: Binnable;
    private names: {
        facetDataName: string,
        searchUnion: string,
        dimScale: string,
        dimCount: string,
        dimCategorical: string,
        dimCellSizeCalc: string,
        dimCellSize: string,
    };

    constructor(public props: CrossProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `cross_${this.id}`;
        this.binX = binnable(`${p}_x`, props.globalScope.data.name, props.groupbyX);
        this.binY = binnable(`${p}_y`, props.globalScope.data.name, props.groupbyY);
        this.names = {
            facetDataName: `data_${p}_facet`,
            searchUnion: `data_${p}_search`,
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

        const dx: Dimension = {
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
            scaleName: <string>null,
            position: null
        };
        const dy: Dimension = {
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
            scaleName: <string>null,
            position: null
        };

        const dimensions = [dx, dy];
        dimensions.forEach(d => {
            const { bin, dim, padding, sortOrder } = d;
            let data: Data;
            let dataName: string;
            let countSignal: string;
            let scale: OrdinalScale;
            const titleSource: TitleSource = titles[dim];
            if (bin.native === false) {
                addSignals(globalScope.scope, bin.maxbinsSignal);
                addTransforms(globalScope.data, ...bin.transforms);
                addData(globalScope.scope, bin.dataSequence);
                addTransforms(bin.dataSequence,
                    {
                        type: 'formula',
                        expr: `indata(${JSON.stringify(globalScope.markDataName)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                        as: FieldNames.Contains
                    }
                );
                data = bin.dataSequence;
                dataName = bin.dataSequence.name;
                countSignal = `length(data(${JSON.stringify(dataName)}))`;
                scale = ordinalScale(dataName, `${names.dimScale}_${dim}`, bin.fields);
                titleSource.dataName = bin.dataSequence.name;
            } else {
                dataName = globalScope.markDataName;
                const ord = createOrdinals(dataName, `${prefix}_${dim}`, bin.fields, sortOrder);
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
            addScales(globalScope.scope, scale);
            const count = `${names.dimCount}_${dim}`;
            const calc = `${names.dimCellSizeCalc}_${dim}`;
            const size = `${names.dimCellSize}_${dim}`;
            addSignals(globalScope.scope, { name: count, update: countSignal });
            addSignals(globalScope.scope,
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
            d.position = this.dimensionOffset(d);
        });

        const groupRow: GroupMark = {
            type: 'group',
            encode: {
                update: {
                    y: {
                        signal: dy.position
                    }
                }
            },
            from: {
                data: dy.dataOut.name
            },
            data: [
                {
                    name: names.searchUnion,
                    source: dx.dataOut.name,
                    transform: [
                        {
                            type: 'formula',
                            expr: `[datum[${JSON.stringify(FieldNames.FacetSearch)}], merge(parent[${JSON.stringify(FieldNames.FacetSearch)}], { clause: '&&'})]`,
                            as: FieldNames.FacetSearch
                        }
                    ]
                }
            ]
        };

        const groupCol: GroupMark = {
            style: 'cell',
            name: prefix,
            type: 'group',
            encode: {
                update: {
                    height: {
                        signal: `${names.dimCellSize}_y`
                    },
                    width: {
                        signal: `${names.dimCellSize}_x`
                    },
                    x: {
                        signal: dx.position
                    }
                }
            },
            from: {
                data: names.searchUnion
            }
        };

        addMarks(globalScope.markGroup, groupRow);
        addMarks(groupRow, groupCol);

        const offsets: LayoutOffsets = {
            x: this.dimensionOffset(dx),
            y: this.dimensionOffset(dy),
            h: `${names.dimCellSize}_y`,
            w: `${names.dimCellSize}_x`
        };

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
            facetScope: groupCol,
            offsets,
            sizeSignals,
            titles
        };
    }

    private dimensionOffset(d: Dimension) {
        const { names } = this;
        return `${d.offset} + (scale(${JSON.stringify(d.scaleName)}, datum[${JSON.stringify(d.bin.fields[0])}]) - 1) * (${names.dimCellSize}_${d.dim} + ${d.padding})`;
    }
}
