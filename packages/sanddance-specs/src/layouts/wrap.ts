// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { binnable, Binnable } from '../bin';
import { FieldNames, SignalNames } from '../constants';
import { safeFieldName } from '../expr';
import { displayBin, serializeAsVegaExpression } from '../facetSearch';
import { addFacetCellTitles } from '../facetTitle';
import {
    DiscreteColumn,
    InnerScope,
    LayoutOffsets,
    SizeSignals
} from '../interfaces';
import { createOrdinals } from '../ordinal';
import {
    addData,
    addMarks,
    addOffsets,
    addSignals,
    addTransforms
} from '../scope';
import { modifySignal } from '../signals';
import { Data, GroupEncodeEntry, GroupMark } from 'vega-typings';

export interface WrapProps extends LayoutProps {
    axisTextColor: string;
    cellTitles: boolean;
    groupby: DiscreteColumn;
}

export class Wrap extends Layout {
    private bin: Binnable;
    private names: {
        outputData: string,
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
        this.bin = binnable(this.prefix, props.globalScope.data.name, props.groupby);
        this.names = {
            outputData: `data_${p}_out`,
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
        const { axisTextColor, cellTitles, globalScope, parentScope } = props;

        let ordinalBinData: string;

        if (bin.native === false) {
            addSignals(globalScope.scope, bin.maxbinsSignal);
            addTransforms(globalScope.data, ...bin.transforms);
            addData(globalScope.scope, bin.dataSequence);
            addTransforms(bin.dataSequence, {
                type: 'formula',
                expr: `indata(${JSON.stringify(globalScope.data.name)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                as: FieldNames.Contains
            });
            ordinalBinData = bin.dataSequence.name;
        } else {
            const ord = createOrdinals(globalScope.data.name, prefix, bin.fields, 'ascending');
            addData(globalScope.scope, ord.data);
            ordinalBinData = ord.data.name;
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
                    },
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
                ]
            }
        );

        const dataOut: Data = {
            name: names.outputData,
            source: globalScope.data.name,
            transform: [
                {
                    type: 'lookup',
                    from: names.rowColumnDataName,
                    key: safeFieldName(bin.fields[0]),
                    fields: [bin.fields[0]].map(safeFieldName),
                    values: [FieldNames.WrapRow, FieldNames.WrapCol]
                }
            ]
        };
        addData(globalScope.scope, dataOut);
        globalScope.setMarkDataName(names.outputData);

        addSignals(globalScope.scope,
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

        const signalH = [names.cellHeight, SignalNames.FacetPaddingTop, SignalNames.FacetPaddingBottom].join(' - ');
        const signalW = [names.cellWidth, SignalNames.FacetPaddingLeft].join(' - ');
        const signalX = addOffsets(parentScope.offsets.x, `datum[${JSON.stringify(FieldNames.WrapCol)}] * ${names.cellWidth}`, SignalNames.FacetPaddingLeft);
        const signalY = addOffsets(parentScope.offsets.y, `datum[${JSON.stringify(FieldNames.WrapRow)}] * ${names.cellHeight}`, SignalNames.FacetPaddingTop);

        const update: GroupEncodeEntry = {
            height: {
                signal: signalH
            },
            width: {
                signal: signalW
            },
            x: {
                signal: signalX
            },
            y: {
                signal: signalY
            }
        };

        const offsets: LayoutOffsets = {
            x: signalX,
            y: signalY,
            h: signalH,
            w: signalW
        };

        const group: GroupMark = {
            style: 'cell',
            name: prefix,
            type: 'group',
            from: {
                data: names.rowColumnDataName
            },
            encode: { update }
        };
        addMarks(globalScope.markGroup, group);

        const sizeSignals: SizeSignals = {
            layoutHeight: `(${names.cellHeight} - ${SignalNames.FacetPaddingTop} - ${SignalNames.FacetPaddingBottom})`,
            layoutWidth: `(${names.cellWidth} - ${SignalNames.FacetPaddingLeft})`,
            colCount: names.colCount,
            rowCount: `ceil(${names.dataLength} / ${names.colCount})`
        };

        if (cellTitles) {
            addFacetCellTitles(group, sizeSignals, axisTextColor);
        }

        return {
            facetScope: group,
            sizeSignals,
            offsets
        };
    }
}
