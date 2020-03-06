// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Binnable, binnable } from '../bin';
import { DiscreteColumn, InnerScope } from '../interfaces';
import { Layout, LayoutBuildProps, LayoutProps } from './layout';
import { GroupMark } from '@msrvida/vega-deck.gl/node_modules/vega-typings/types';
import { addMarks, addData, addScale, addSignal, addTransforms } from '../scope';
import { FieldNames } from '../constants';
import { modifySignal } from '../signals';
import { facetPaddingTop, facetPaddingBottom, facetPaddingLeft } from '../defaults';

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
        xScale: string,
        yScale: string,
        xCount: string,
        yCount: string,
        xCategorical: string,
        yCategorical: string,
        cellWidthCalc: string,
        cellHeightCalc: string,
        cellWidth: string,
        cellHeight: string
    };

    constructor(public props: CrossProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `cross_${this.id}`;
        this.binX = binnable(this.prefix, props.globalScope.dataName, props.groupbyX);
        this.binY = binnable(this.prefix, props.globalScope.dataName, props.groupbyY);
        this.names = {
            crossData: `data_${p}_cross`,
            facetDataName: `data_${p}_facet`,
            emptyDataName: `data_${p}_empty`,
            emptyMarkName: `${p}_empty`,
            xScale: `scale_${p}_x`,
            yScale: `scale_${p}_y`,
            xCount: `${p}_x_count`,
            yCount: `${p}_y_count`,
            xCategorical: `data_${p}_cat_x`,
            yCategorical: `data_${p}_cat_y`,
            cellHeight: `${p}_cell_height`,
            cellHeightCalc: `${p}_cell_height_calc`,
            cellWidth: `${p}_cell_width`,
            cellWidthCalc: `${p}_cell_width_calc`
        };
    }

    public getGrouping() {
        return this.binX.fields.concat(this.binY.fields);
    }

    public build(): InnerScope {
        const { binX, binY, names, prefix, props } = this;
        const { globalScope, parentScope } = props;
        const ordinalBinScales = [
            {
                bin: binX,
                scaleName: names.xScale,
                size: parentScope.sizeSignals.layoutWidth,
                count: names.xCount,
                cat: names.xCategorical,
                size2: names.cellWidth,
                calc: names.cellWidthCalc,
                layout: parentScope.sizeSignals.layoutWidth,
                min: globalScope.signals.minCellWidth.name,
                out: globalScope.signals.plotWidthOut
            },
            {
                bin: binY,
                scaleName: names.yScale,
                size: parentScope.sizeSignals.layoutHeight,
                count: names.yCount,
                cat: names.yCategorical,
                size2: names.cellHeight,
                calc: names.cellHeightCalc,
                layout: parentScope.sizeSignals.layoutHeight,
                min: globalScope.signals.minCellHeight.name,
                out: globalScope.signals.plotHeightOut
            }
        ];

        ordinalBinScales.forEach(o => {
            const { bin, cat, count, scaleName, size } = o;
            let data: string;
            let update: string;
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
                update = `length(data(${JSON.stringify(data)}))`;
            } else {
                data = globalScope.dataName;
                addData(globalScope.scope, {
                    name: cat,
                    source: data,
                    transform: [
                        {
                            type: 'aggregate',
                            groupby: bin.fields,
                            ops: ['count']
                        }
                    ]
                });
                update = `length(data(${JSON.stringify(cat)}))`;
            }
            addScale(globalScope.scope, {
                name: scaleName,
                type: 'point',
                domain: {
                    data,
                    field: bin.fields[0]
                },
                range: [
                    0,
                    { signal: o.out.name }
                ]
            });
            addSignal(globalScope.scope, { name: count, update });
            addSignal(globalScope.scope,
                {
                    name: o.calc,
                    update: `${o.layout} / ${o.count}`
                },
                {
                    name: o.size2,
                    update: `max(${o.min}, ${o.calc})`
                }
            )
            modifySignal(o.out, 'max', `(${o.size2} * ${o.count})`);
        });

        addData(globalScope.scope, {
            name: names.crossData,
            source: parentScope.dataName,
            transform: [
                {
                    type: 'formula',
                    expr: `['?']`,
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
                update: {
                    x: {
                        scale: names.xScale,
                        field: binX.fields[0],
                        offset: facetPaddingLeft
                    },
                    y: {
                        scale: names.yScale,
                        field: binY.fields[0],
                        offset: facetPaddingTop
                    },
                    height: {
                        signal: `${names.cellHeight} - ${facetPaddingTop} - ${facetPaddingBottom}`
                    },
                    width: {
                        signal: `${names.cellWidth} - ${facetPaddingLeft}`
                    },
                }
            }
        };

        addMarks(parentScope.scope, mark);

        return {
            dataName: names.facetDataName,
            scope: mark,
            emptyScope: null,
            sizeSignals: {
                layoutHeight: names.cellHeight,
                layoutWidth: names.cellWidth,
                colCount: names.xCount,
                rowCount: names.yCount
            }
        };
    }
}
