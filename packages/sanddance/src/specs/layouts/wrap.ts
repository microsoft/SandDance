// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    addData,
    addMarks,
    addSignal,
    addTransforms,
    getDataByName
} from '../scope';
import { binnable, Binnable } from '../bin';
import { createOrdinalsForFacet } from '../ordinal';
import { DiscreteColumn, InnerScope } from '../interfaces';
import { displayBin, serializeAsVegaExpression } from '../facetTitle';
import { FieldNames, SignalNames } from '../constants';
import { GroupEncodeEntry, GroupMark } from 'vega-typings';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { modifySignal } from '../signals';

export interface WrapProps extends LayoutProps {
    groupby: DiscreteColumn;
}

export class Wrap extends Layout {
    private bin: Binnable;
    private names: {
        facetDataName: string,
        emptyDataName: string,
        emptyMarkName: string,
        sortedDataName: string,
        rowColumnDataName: string,
        cellHeight: string,
        cellWidth: string,
        fits: string,
        target: string,
        minArea: string,
        aspect: string,
        minAspect: string,
        idealAspect: string,
        dataLength: string,
        rxc0: string,
        rxc1: string,
        rxc2: string,
        rxc: string,
        growColCount: string,
        growCellWidth: string,
        fitsArea: string,
        colCount: string
    };

    constructor(public props: WrapProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `wrap_${this.id}`;
        this.bin = binnable(this.prefix, props.globalScope.dataName, props.groupby);
        this.names = {
            facetDataName: `data_${p}_facet`,
            emptyDataName: `data_${p}_empty`,
            emptyMarkName: `${p}_empty`,
            sortedDataName: `data_${p}_sort`,
            rowColumnDataName: `data_${p}_row_col`,
            cellHeight: `${p}_cellHeight`,
            cellWidth: `${p}_cellWidth`,
            fits: `${p}_fits`,
            target: `${p}_target`,
            minArea: `${p}_minArea`,
            aspect: `${p}_aspect`,
            minAspect: `${p}_minAspect`,
            idealAspect: `${p}_idealAspect`,
            dataLength: `${p}_dataLength`,
            rxc0: `${p}_rxc0`,
            rxc1: `${p}_rxc1`,
            rxc2: `${p}_rxc2`,
            rxc: `${p}_rxc`,
            growColCount: `${p}_growColCount`,
            growCellWidth: `${p}_growCellWidth`,
            fitsArea: `${p}_fitsArea`,
            colCount: `${p}_colCount`
        };
    }

    public getGrouping() {
        return this.bin.fields;
    }

    public build(): InnerScope {
        const { bin, names, prefix, props } = this;
        const { globalScope, parentScope } = props;

        let ordinalBinData: string;

        if (bin.native === false) {
            addSignal(globalScope.scope, bin.maxbinsSignal);
            addTransforms(getDataByName(globalScope.scope.data, globalScope.dataName), ...bin.transforms);
            addData(globalScope.scope, bin.dataSequence);
            addTransforms(bin.dataSequence, {
                type: 'formula',
                expr: `indata(${JSON.stringify(parentScope.dataName)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                as: FieldNames.Contains
            });
            ordinalBinData = bin.dataSequence.name;
        } else {
            const ord = createOrdinalsForFacet(parentScope.dataName, prefix, bin.fields);
            addData(globalScope.scope, ord.data);
            ordinalBinData = ord.data.name
        }

        addData(globalScope.scope,
            {
                name: names.rxc0,
                transform: [
                    {
                        type: 'sequence',
                        start: 1,
                        stop: {
                            signal: `ceil(sqrt(${names.dataLength})) + 1`
                        }
                    },
                    {
                        type: 'formula',
                        expr: `ceil(${names.dataLength} / datum.data)`,
                        as: 'complement'
                    }
                ]
            },
            {
                name: names.rxc1,
                source: names.rxc0,
                transform: [
                    {
                        type: 'project',
                        fields: ['data'],
                        as: ['cols']
                    }
                ]
            },
            {
                name: names.rxc2,
                source: names.rxc0,
                transform: [
                    {
                        type: 'project',
                        fields: ['complement'],
                        as: ['cols']
                    }
                ]
            },
            {
                name: names.rxc,
                source: [names.rxc1, names.rxc2],
                transform: [
                    {
                        type: 'formula',
                        expr: `ceil(${names.dataLength} / datum.cols)`,
                        as: 'rows'
                    },
                    {
                        type: 'formula',
                        expr: `${parentScope.sizeSignals.layoutWidth} / datum.cols`,
                        as: 'cellw'
                    },
                    {
                        type: 'formula',
                        expr: `datum.cols === 1 ? max(datum.cellw, ${SignalNames.MinCellWidth}) : datum.cellw`,
                        as: 'cellw'
                    },
                    {
                        type: 'formula',
                        expr: `${parentScope.sizeSignals.layoutHeight} / datum.rows`,
                        as: 'cellh'
                    },
                    {
                        type: 'formula',
                        expr: `datum.rows === 1 ? max(datum.cellh, ${SignalNames.MinCellHeight}) : datum.cellh`,
                        as: 'cellh'
                    },
                    {
                        type: 'formula',
                        expr: `(datum.cellw >= ${SignalNames.MinCellWidth} && datum.cellh >= ${SignalNames.MinCellHeight})`,
                        as: 'meetsmin'
                    },
                    {
                        type: 'filter',
                        expr: 'datum.meetsmin'
                    },
                    {
                        type: 'formula',
                        expr: 'datum.cellw / datum.cellh',
                        as: names.aspect
                    },
                    {
                        type: 'formula',
                        expr: `abs(datum.${names.aspect} - ${names.target})`,
                        as: names.idealAspect
                    },
                    {
                        type: 'formula',
                        expr: `${names.dataLength} / (datum.cols * datum.rows)`,
                        as: 'coverage'
                    },
                    {
                        type: 'collect',
                        sort: {
                            field: [names.idealAspect, 'coverage'],
                            order: ['ascending', 'descending']
                        }
                    }
                ]
            },
            {
                name: names.rowColumnDataName,
                source: ordinalBinData,
                transform: [
                    {
                        type: 'formula',
                        expr: `floor((datum[${JSON.stringify(FieldNames.Ordinal)}] - 1) / ${names.colCount})`,
                        as: FieldNames.WrapRow
                    },
                    {
                        type: 'formula',
                        expr: `(datum[${JSON.stringify(FieldNames.Ordinal)}] - 1) % ${names.colCount}`,
                        as: FieldNames.WrapCol
                    }
                ]
            },
            {
                name: names.sortedDataName,           //need to sort by the bin, since there is no scale for positioning
                source: parentScope.dataName,
                transform: [
                    {
                        type: 'collect',
                        sort: {
                            field: bin.fields
                        }
                    },
                    {
                        type: 'formula',
                        expr: serializeAsVegaExpression(bin),
                        as: FieldNames.FacetSearch
                    },
                    {
                        type: 'formula',
                        expr: displayBin(bin),
                        as: FieldNames.FacetTitle
                    },
                    {
                        type: 'lookup',
                        from: names.rowColumnDataName,
                        key: bin.fields[0],
                        fields: [bin.fields[0]],
                        values: [FieldNames.WrapRow, FieldNames.WrapCol]
                    }
                ]
            }
        );

        addSignal(globalScope.scope,
            {
                name: names.minAspect,
                update: `${SignalNames.MinCellWidth} / ${SignalNames.MinCellHeight}`
            },
            {
                name: names.target,
                update: `${names.minAspect} === 1 ? ${1.2} : ${names.minAspect}`
            },
            {
                name: names.minArea,
                update: `${SignalNames.MinCellWidth}*${SignalNames.MinCellHeight}`
            },
            {
                name: names.aspect,
                update: `${parentScope.sizeSignals.layoutWidth} / ${parentScope.sizeSignals.layoutHeight}`
            },
            {
                name: names.dataLength,
                update: `data(${JSON.stringify(ordinalBinData)}).length`
            },
            {
                name: names.growColCount,
                update: `max(floor(${parentScope.sizeSignals.layoutWidth} / ${SignalNames.MinCellWidth}), 1)`
            },
            {
                name: names.growCellWidth,
                update: `${parentScope.sizeSignals.layoutWidth} / ${names.growColCount}`
            },
            {
                name: names.fitsArea,
                update: `((${names.dataLength} * ${names.minArea}) <= (${parentScope.sizeSignals.layoutWidth} * ${parentScope.sizeSignals.layoutHeight}))`
            },
            {
                name: names.fits,
                update: `${names.fitsArea} && length(data(${JSON.stringify(names.rxc)})) > 0`
            },
            {
                name: names.colCount,
                update: `${names.fits} ? data(${JSON.stringify(names.rxc)})[0].cols : ${names.growColCount}`
            },
            {
                name: names.cellWidth,
                update: `${names.fits} ? data(${JSON.stringify(names.rxc)})[0].cellw : ${names.growCellWidth}`
            },
            {
                name: names.cellHeight,
                update: `${names.fits} ? data(${JSON.stringify(names.rxc)})[0].cellh : ${SignalNames.MinCellHeight}`
            }
        );

        modifySignal(globalScope.signals.plotHeightOut, 'max', `(${names.cellHeight} * ceil(${names.dataLength} / ${names.colCount}))`);
        modifySignal(globalScope.signals.plotWidthOut, 'max', `(${names.cellWidth} * ${names.colCount})`);

        const update: GroupEncodeEntry = {
            height: {
                signal: `${names.cellHeight} - ${SignalNames.FacetPaddingTop} - ${SignalNames.FacetPaddingBottom}`
            },
            width: {
                signal: `${names.cellWidth} - ${SignalNames.FacetPaddingLeft}`
            },
            x: {
                signal: `datum[${JSON.stringify(FieldNames.WrapCol)}] * ${names.cellWidth} + ${SignalNames.FacetPaddingLeft}`
            },
            y: {
                signal: `datum[${JSON.stringify(FieldNames.WrapRow)}] * ${names.cellHeight} + ${SignalNames.FacetPaddingTop}`
            }
        };

        const mark: GroupMark = {
            style: 'cell',
            name: prefix,
            type: 'group',
            from: {
                facet: {
                    name: names.facetDataName,
                    data: names.sortedDataName,
                    groupby: bin.fields.concat([FieldNames.WrapRow, FieldNames.WrapCol, FieldNames.FacetSearch, FieldNames.FacetTitle])
                }
            },
            encode: { update }
        };
        addMarks(parentScope.scope, mark);

        let emptymark: GroupMark;
        if (bin.native === false) {
            addData(globalScope.scope,
                {
                    name: names.emptyDataName,
                    source: names.rowColumnDataName,
                    transform: [
                        {
                            type: 'filter',
                            expr: `!datum[${JSON.stringify(FieldNames.Contains)}]`
                        },
                        {
                            type: 'formula',
                            expr: serializeAsVegaExpression(bin),
                            as: FieldNames.FacetSearch
                        },
                        {
                            type: 'formula',
                            expr: displayBin(bin),
                            as: FieldNames.FacetTitle
                        }
                    ]
                }
            );
            emptymark = {
                style: 'cell',
                name: names.emptyMarkName,
                type: 'group',
                from: {
                    data: names.emptyDataName
                },
                encode: { update }
            };
            addMarks(parentScope.scope, emptymark);
        }

        return {
            dataName: names.facetDataName,
            scope: mark,
            emptyScope: emptymark,
            sizeSignals: {
                layoutHeight: `(${names.cellHeight} - ${SignalNames.FacetPaddingTop} - ${SignalNames.FacetPaddingBottom})`,
                layoutWidth: `(${names.cellWidth} - ${SignalNames.FacetPaddingLeft})`,
                colCount: names.colCount,
                rowCount: `ceil(${names.dataLength} / ${names.colCount})`
            }
        };
    }
}
