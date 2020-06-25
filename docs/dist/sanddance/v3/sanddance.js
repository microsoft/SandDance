(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.SandDance = {}));
}(this, (function (exports) { 'use strict';

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    const FieldNames = {
        Active: '__SandDance__Active',
        Collapsed: '__SandDance__Collapsed',
        Contains: '__SandDance__Contains',
        Count: '__SandDance__Count',
        Sum: '__SandDance__Sum',
        SumOfCount: '__SandDance__CountSum',
        SumOfSum: '__SandDance__SumSum',
        Selected: '__SandDance__Selected',
        First: '__SandDance__First',
        Last: '__SandDance__Last',
        Top: '__SandDance__Top',
        TopColor: '__SandDance__TopColor',
        TopIndex: '__SandDance__TopIndex',
        PowerBISelectionId: '__SandDance__PowerBISelectionId',
        FacetSearch: '__SandDance__FacetSearch',
        FacetTitle: '__SandDance__FacetTitle',
        Ordinal: '__SandDance__Ordinal',
        WrapCol: '__SandDance__WrapCol',
        WrapRow: '__SandDance__WrapRow',
        Value: '__SandDance__Value',
        OffsetX: '__SandDance__X',
        OffsetY: '__SandDance__Y',
        OffsetHeight: '__SandDance__H',
        OffsetWidth: '__SandDance__W'
    };
    const ScaleNames = {
        Color: 'scale_color',
        X: 'scale_x',
        Y: 'scale_y',
        Z: 'scale_z'
    };
    //Signal names
    const SignalNames = {
        ViewportWidth: 'ViewportWidth',
        ViewportHeight: 'ViewportHeight',
        MinCellWidth: 'MinCellWidth',
        MinCellHeight: 'MinCellHeight',
        PlotOffsetLeft: 'PlotOffsetLeft',
        PlotOffsetTop: 'PlotOffsetTop',
        PlotOffsetBottom: 'PlotOffsetBottom',
        PlotOffsetRight: 'PlotOffsetRight',
        PlotHeightIn: 'PlotHeightIn',
        PlotWidthIn: 'PlotWidthIn',
        PlotHeightOut: 'PlotHeightOut',
        PlotWidthOut: 'PlotWidthOut',
        ColorBinCount: 'RoleColor_BinCountSignal',
        ColorReverse: 'RoleColor_ReverseSignal',
        FacetBins: 'RoleFacet_BinsSignal',
        FacetVBins: 'RoleFacetV_BinsSignal',
        FacetPaddingTop: 'FacetPaddingTop',
        FacetPaddingBottom: 'FacetPaddingBottom',
        FacetPaddingLeft: 'FacetPaddingLeft',
        MarkOpacity: 'Mark_OpacitySignal',
        PointScale: 'Chart_PointScaleSignal',
        TextAngleX: 'Text_AngleXSignal',
        TextAngleY: 'Text_AngleYSignal',
        TextScale: 'Text_ScaleSignal',
        TextSize: 'Text_SizeSignal',
        TextTitleSize: 'Text_TitleSizeSignal',
        TreeMapMethod: 'Chart_TreeMapMethodSignal',
        XBins: 'RoleX_BinsSignal',
        YBins: 'RoleY_BinsSignal',
        ZHeight: 'RoleZ_HeightSignal',
        ZGrounded: 'RoleZ_Grounded',
        ZProportion: 'RoleZ_ProportionSignal'
    };
    //These are special formulaic data values
    const Other = '__Other';
    //name of the "no-color" palette
    const ColorScaleNone = 'none';

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    //TODO move these to options
    const defaultBins = 10;
    const maxbins = 100;
    const minBarBandWidth = 15;
    const minFacetWidth = 140;
    const minFacetHeight = 180;
    const facetPaddingLeft = 40;
    const facetPaddingTop = 40;
    const facetPaddingBottom = 40;
    const facetPaddingRight = 40;
    const axesLabelLimit = 100;
    const axesTitleLimit = 100;
    const axesTitlePaddingX = 30;
    const axesTitlePaddingY = 60;
    const axesTitlePaddingFacetX = 69;
    const axesTitlePaddingFacetY = 92;
    const axesOffsetX = 120;
    const axesOffsetY = 120;
    const scatterSizedDiv = 20;

    class Layout {
        constructor(props) {
            this.props = props;
            this.id = props.id;
        }
        getGrouping() {
            return null;
        }
        getAggregateSumOp() {
            return null;
        }
        build() {
            throw 'Not implemented';
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    /**
     * Make sure that the field name is accessible via Vega's Field type
     * https://vega.github.io/vega/docs/types/#Field
     * examples: "source.x", "target['x']", "[my.field]"
     */
    function safeFieldName(field) {
        return field.replace('.', '\\.').replace('[', '\\[').replace(']', '\\]');
    }
    /**
     * Make sure the field name is usable in a Vega expression
     */
    function exprSafeFieldName(field) {
        //remove whitespace, period, accessors and logical modifiers
        return field.replace(/[.,:;+=\-/<>{}|~!@#$%^*[\]`'"()?\s\\]/g, '');
    }

    function addAxes(scope, ...axis) {
        if (!scope.axes) {
            scope.axes = [];
        }
        scope.axes.push(...axis);
    }
    function addData(scope, ...data) {
        if (!scope.data) {
            scope.data = [];
        }
        scope.data.push(...data);
    }
    function addMarks(scope, ...marks) {
        if (!scope.marks) {
            scope.marks = [];
        }
        scope.marks.push(...marks);
    }
    function addScales(scope, ...scale) {
        if (!scope.scales) {
            scope.scales = [];
        }
        scope.scales.push(...scale);
    }
    function addSignals(scope, ...signal) {
        if (!scope.signals) {
            scope.signals = [];
        }
        scope.signals.push(...signal);
    }
    function addTransforms(data, ...transforms) {
        if (!data.transform) {
            data.transform = [];
        }
        data.transform.push(...transforms);
    }
    function getDataByName(data, dataName) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].name === dataName)
                return { data: data[i], index: i };
        }
    }
    function getGroupBy(groupings) {
        const groupby = groupings.map(g => g.groupby);
        return groupby.reduce((acc, val) => acc.concat(val), []);
    }
    function addOffsets(...offsets) {
        return offsets.filter(Boolean).join(' + ');
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function testForCollapseSelection() {
        return `datum.${FieldNames.Collapsed}`;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class AggregateContainer extends Layout {
        constructor(props) {
            super(props);
            this.props = props;
            const a = this.aggregation = this.getAggregation();
            const p = this.prefix = `agg_${this.id}`;
            this.names = {
                barCount: `${p}_count`,
                aggregateField: `${p}_aggregate_value`,
                globalAggregateExtentSignal: `${p}_${a}_extent`,
                scale: `scale_${p}`,
                extentData: `data_${p}_extent`,
                offsets: `data_${p}_offsets`
            };
        }
        getAggregateSumOp() {
            if (this.aggregation === 'sum') {
                const fieldOp = {
                    field: safeFieldName(this.props.sumBy.name),
                    op: 'sum',
                    as: FieldNames.Sum
                };
                return fieldOp;
            }
        }
        build() {
            const { aggregation, names, props } = this;
            const { dock, globalScope, groupings, niceScale, parentScope, showAxes } = props;
            addTransforms(globalScope.data, Object.assign(Object.assign({}, this.getTransforms(aggregation, getGroupBy(groupings))), { as: [names.aggregateField] }), {
                type: 'extent',
                field: safeFieldName(names.aggregateField),
                signal: names.globalAggregateExtentSignal
            });
            addSignals(globalScope.scope, {
                name: props.globalAggregateMaxExtentSignal,
                update: `${names.globalAggregateExtentSignal}[1]`
            });
            const horizontal = dock === 'left';
            const groupScaled = `scale(${JSON.stringify(names.scale)}, datum[${JSON.stringify(names.aggregateField)}])`;
            const offsets = {
                x: parentScope.offsets.x,
                y: addOffsets(parentScope.offsets.y, dock === 'bottom' ?
                    groupScaled
                    :
                        ''),
                h: horizontal ?
                    parentScope.offsets.h
                    :
                        dock === 'top'
                            ? groupScaled
                            : `${parentScope.offsets.h} - ${groupScaled}`,
                w: horizontal ?
                    groupScaled
                    :
                        parentScope.offsets.w
            };
            const scale = {
                type: 'linear',
                name: names.scale,
                domain: [
                    0,
                    {
                        signal: props.globalAggregateMaxExtentSignal
                    }
                ],
                range: horizontal ?
                    [
                        0,
                        {
                            signal: parentScope.sizeSignals.layoutWidth
                        }
                    ]
                    :
                        [
                            {
                                signal: parentScope.sizeSignals.layoutHeight
                            },
                            0
                        ],
                nice: niceScale,
                zero: true,
                reverse: dock === 'top'
            };
            const globalAggregateMaxExtentScaledValue = `scale(${JSON.stringify(names.scale)}, ${props.globalAggregateMaxExtentSignal})`;
            addSignals(globalScope.scope, {
                name: props.globalAggregateMaxExtentScaledSignal,
                update: dock === 'bottom'
                    ? `${parentScope.sizeSignals.layoutHeight} - ${globalAggregateMaxExtentScaledValue}`
                    : globalAggregateMaxExtentScaledValue
            });
            return {
                offsets,
                sizeSignals: horizontal ?
                    {
                        layoutHeight: parentScope.sizeSignals.layoutHeight,
                        layoutWidth: null
                    }
                    :
                        {
                            layoutHeight: null,
                            layoutWidth: parentScope.sizeSignals.layoutWidth
                        },
                globalScales: {
                    showAxes,
                    scales: {
                        x: horizontal ? scale : undefined,
                        y: horizontal ? undefined : scale
                    }
                },
                encodingRuleMap: horizontal ?
                    {
                        x: [{
                                test: testForCollapseSelection(),
                                signal: parentScope.offsets.x
                            }],
                        width: [{
                                test: testForCollapseSelection(),
                                value: 0
                            }]
                    }
                    :
                        {
                            y: [{
                                    test: testForCollapseSelection(),
                                    signal: dock === 'top'
                                        ? parentScope.offsets.y
                                        : addOffsets(parentScope.offsets.y, parentScope.offsets.h)
                                }],
                            height: [{
                                    test: testForCollapseSelection(),
                                    value: 0
                                }]
                        }
            };
        }
        getTransforms(aggregation, groupby) {
            const trans = {
                type: 'joinaggregate',
                groupby: groupby.map(safeFieldName),
                ops: [aggregation]
            };
            if (aggregation === 'sum') {
                trans.fields = [this.props.sumBy.name].map(safeFieldName);
            }
            return trans;
        }
        getAggregation() {
            const { props } = this;
            let s;
            if (props.dock === 'left') {
                s = props.axesScales.x;
            }
            else {
                s = props.axesScales.y;
            }
            switch (s.aggregate) {
                case 'sum':
                    return 'sum';
                default:
                    return 'count';
            }
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function binnable(prefix, domainDataName, discreteColumn) {
        const { column, defaultBins, maxbins, maxbinsSignalDisplayName, maxbinsSignalName } = discreteColumn;
        if (column.quantitative) {
            const field = `${prefix}_bin_${exprSafeFieldName(column.name)}`;
            const fieldEnd = `${field}_end`;
            const binSignal = `${field}_bins`;
            const extentSignal = `${field}_bin_extent`;
            domainDataName = `${field}_sequence`; //override the data name
            const extentTransform = {
                type: 'extent',
                field: safeFieldName(column.name),
                signal: extentSignal
            };
            const maxbinsSignal = {
                name: maxbinsSignalName,
                value: defaultBins,
                bind: {
                    name: maxbinsSignalDisplayName,
                    debounce: 50,
                    input: 'range',
                    min: 1,
                    max: maxbins,
                    step: 1
                }
            };
            const binTransform = {
                type: 'bin',
                field: safeFieldName(column.name),
                as: [
                    field,
                    fieldEnd,
                ],
                signal: binSignal,
                extent: {
                    signal: extentSignal
                },
                maxbins: {
                    signal: maxbinsSignalName
                }
            };
            const dataSequence = {
                name: domainDataName,
                transform: [
                    {
                        type: 'sequence',
                        start: {
                            signal: `${binSignal}.start`
                        },
                        stop: {
                            signal: `${binSignal}.stop`
                        },
                        step: {
                            signal: `${binSignal}.step`
                        }
                    },
                    {
                        type: 'formula',
                        expr: 'datum.data',
                        as: field
                    },
                    {
                        type: 'formula',
                        expr: `datum.data + ${binSignal}.step`,
                        as: fieldEnd
                    },
                    {
                        type: 'window',
                        ops: ['row_number'],
                        as: [FieldNames.Ordinal]
                    },
                    {
                        type: 'formula',
                        expr: `datum.data === ${binSignal}.start`,
                        as: FieldNames.First
                    },
                    {
                        type: 'formula',
                        expr: `datum.data === ${binSignal}.stop - ${binSignal}.step`,
                        as: FieldNames.Last
                    }
                ]
            };
            return {
                discreteColumn,
                native: false,
                transforms: [extentTransform, binTransform],
                fields: [field, fieldEnd],
                binSignal,
                dataSequence,
                domainDataName,
                maxbinsSignal,
                fullScaleDataname: dataSequence.name
            };
        }
        else {
            return {
                discreteColumn,
                native: true,
                fields: [column.name],
                domainDataName,
                fullScaleDataname: domainDataName
            };
        }
    }

    const defaultZProportion = 0.6;
    function textSignals(context, heightSignal) {
        const { specViewOptions } = context;
        const signals = [
            {
                name: SignalNames.ZProportion,
                value: defaultZProportion,
                bind: {
                    name: specViewOptions.language.zScaleProportion,
                    debounce: 50,
                    input: 'range',
                    min: 0.2,
                    max: 2,
                    step: 0.1
                }
            },
            {
                name: SignalNames.ZHeight,
                update: `${heightSignal} * ${SignalNames.ZProportion}`
            },
            {
                name: SignalNames.TextScale,
                value: 1.2,
                bind: {
                    name: specViewOptions.language.textScaleSignal,
                    debounce: 50,
                    input: 'range',
                    min: 0.5,
                    max: 2,
                    step: 0.1
                }
            },
            {
                name: SignalNames.TextSize,
                update: `${SignalNames.TextScale} * 10`
            },
            {
                name: SignalNames.TextTitleSize,
                update: `${SignalNames.TextScale} * 15`
            },
            {
                name: SignalNames.TextAngleX,
                value: 30,
                bind: {
                    name: specViewOptions.language.xAxisTextAngleSignal,
                    debounce: 50,
                    input: 'range',
                    min: 0,
                    max: 90,
                    step: 1
                }
            },
            {
                name: SignalNames.TextAngleY,
                value: 0,
                bind: {
                    name: specViewOptions.language.yAxisTextAngleSignal,
                    debounce: 50,
                    input: 'range',
                    min: -90,
                    max: 0,
                    step: 1
                }
            },
            {
                name: SignalNames.MarkOpacity,
                value: 1,
                bind: {
                    name: specViewOptions.language.markOpacitySignal,
                    debounce: 50,
                    input: 'range',
                    min: 0.1,
                    max: 1,
                    step: 0.05
                }
            }
        ];
        return signals;
    }
    function colorBinCountSignal(context) {
        const { specViewOptions } = context;
        const signal = {
            name: SignalNames.ColorBinCount,
            value: 7,
            bind: {
                name: specViewOptions.language.colorBinCount,
                input: 'range',
                min: 1,
                max: specViewOptions.maxLegends + 1,
                step: 1
            }
        };
        return signal;
    }
    function colorReverseSignal(context) {
        const { specViewOptions } = context;
        const signal = {
            name: SignalNames.ColorReverse,
            value: false,
            bind: {
                name: specViewOptions.language.colorReverse,
                input: 'checkbox'
            }
        };
        return signal;
    }
    function modifySignal(s, fn, update) {
        s.update = `${fn}((${s.update}), (${update}))`;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class Band extends Layout {
        constructor(props) {
            super(props);
            this.props = props;
            const p = this.prefix = `band_${this.id}`;
            this.names = {
                xScale: `scale_${p}_x`,
                yScale: `scale_${p}_y`,
                bandWidth: `${p}_bandwidth`,
                accumulative: `${p}_accumulative`
            };
            this.bin = binnable(this.prefix, props.globalScope.data.name, props.groupby);
        }
        getGrouping() {
            return this.bin.fields;
        }
        build() {
            const { bin, names, props } = this;
            const { globalScope, minBandWidth, orientation, parentScope, showAxes } = props;
            const binField = bin.fields[0];
            if (bin.native === false) {
                addSignals(globalScope.scope, bin.maxbinsSignal);
                addTransforms(globalScope.data, ...bin.transforms);
                addData(globalScope.scope, bin.dataSequence);
            }
            //TODO don't add this, use existing dataset
            addData(globalScope.scope, {
                name: names.accumulative,
                source: bin.fullScaleDataname,
                transform: [
                    {
                        type: 'aggregate',
                        groupby: this.getGrouping().map(safeFieldName),
                        ops: ['count']
                    }
                ]
            });
            const horizontal = orientation === 'horizontal';
            const minCellSignal = (horizontal) ? globalScope.signals.minCellHeight : globalScope.signals.minCellWidth;
            modifySignal(minCellSignal, 'max', `length(data(${JSON.stringify(names.accumulative)})) * ${minBandWidth}`);
            addSignals(globalScope.scope, {
                name: names.bandWidth,
                update: `bandwidth(${JSON.stringify(horizontal ? names.yScale : names.xScale)})`
            });
            const scale = this.getScale(bin, horizontal);
            let encodingRuleMap;
            if (!props.excludeEncodingRuleMap) {
                encodingRuleMap = horizontal ?
                    {
                        x: [
                            {
                                test: testForCollapseSelection(),
                                value: parentScope.offsets.x
                            }
                        ],
                        width: [
                            {
                                test: testForCollapseSelection(),
                                value: 0
                            }
                        ]
                    }
                    :
                        {
                            y: [
                                {
                                    test: testForCollapseSelection(),
                                    signal: addOffsets(parentScope.offsets.y, parentScope.offsets.h)
                                }
                            ],
                            height: [
                                {
                                    test: testForCollapseSelection(),
                                    value: 0
                                }
                            ]
                        };
            }
            return {
                offsets: this.getOffset(horizontal, binField),
                sizeSignals: horizontal ?
                    {
                        layoutHeight: names.bandWidth,
                        layoutWidth: parentScope.sizeSignals.layoutWidth
                    }
                    :
                        {
                            layoutHeight: parentScope.sizeSignals.layoutHeight,
                            layoutWidth: names.bandWidth
                        },
                globalScales: {
                    showAxes,
                    scales: {
                        x: horizontal ? undefined : scale,
                        y: horizontal ? scale : undefined
                    }
                },
                encodingRuleMap
            };
        }
        getOffset(horizontal, binField) {
            const { names, props } = this;
            const { parentScope } = props;
            return {
                x: addOffsets(parentScope.offsets.x, horizontal ?
                    ''
                    :
                        `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(binField)}])`),
                y: addOffsets(parentScope.offsets.y, horizontal ?
                    `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(binField)}])`
                    :
                        ''),
                h: horizontal ?
                    names.bandWidth
                    :
                        parentScope.offsets.h,
                w: horizontal ?
                    parentScope.offsets.w
                    :
                        names.bandWidth
            };
        }
        getScale(bin, horizontal) {
            const { names } = this;
            const { parentScope } = this.props;
            const binField = safeFieldName(bin.fields[0]);
            let scale;
            if (horizontal) {
                scale = {
                    type: 'band',
                    name: names.yScale,
                    range: [
                        0,
                        {
                            signal: parentScope.sizeSignals.layoutHeight
                        }
                    ],
                    padding: 0.1,
                    domain: {
                        data: bin.domainDataName,
                        field: binField,
                        sort: true
                    },
                    reverse: true
                };
            }
            else {
                scale = {
                    type: 'band',
                    name: names.xScale,
                    range: [
                        0,
                        {
                            signal: parentScope.sizeSignals.layoutWidth
                        }
                    ],
                    padding: 0.1,
                    domain: {
                        data: bin.domainDataName,
                        field: binField,
                        sort: true
                    }
                };
            }
            return scale;
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function linearScale(scaleName, data, field, range, reverse, zero) {
        const scale = {
            name: scaleName,
            type: 'linear',
            range,
            round: true,
            reverse,
            domain: {
                data,
                field: safeFieldName(field)
            },
            zero,
            nice: true
        };
        return scale;
    }
    function pointScale(scaleName, data, range, field, reverse) {
        const scale = {
            name: scaleName,
            type: 'point',
            range,
            domain: {
                data,
                field: safeFieldName(field),
                sort: true
            },
            padding: 0.5
        };
        if (reverse !== undefined) {
            scale.reverse = reverse;
        }
        return scale;
    }
    function binnableColorScale(scaleName, colorBin, data, field, scheme) {
        scheme = scheme || ColorScaleNone;
        const domain = {
            data,
            field: safeFieldName(field)
        };
        const range = {
            scheme
        };
        const reverse = { signal: SignalNames.ColorReverse };
        if (colorBin !== 'continuous') {
            range.count = { signal: SignalNames.ColorBinCount };
        }
        switch (colorBin) {
            case 'continuous': {
                const sequentialScale = {
                    name: scaleName,
                    type: 'linear',
                    domain,
                    range,
                    reverse
                };
                return sequentialScale;
            }
            case 'quantile': {
                const quantileScale = {
                    name: scaleName,
                    type: 'quantile',
                    domain,
                    range,
                    reverse
                };
                return quantileScale;
            }
            default: {
                const quantizeScale = {
                    name: scaleName,
                    type: 'quantize',
                    domain,
                    range,
                    reverse
                };
                return quantizeScale;
            }
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function addZScale(z, zSize, globalScope, zScaleName) {
        if (z) {
            const zRange = [0, { signal: `(${zSize}) * ${SignalNames.ZProportion}` }];
            addScales(globalScope.scope, z.quantitative
                ?
                    linearScale(zScaleName, globalScope.data.name, z.name, zRange, false, true)
                :
                    pointScale(zScaleName, globalScope.data.name, zRange, z.name, false));
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class Square extends Layout {
        constructor(props) {
            super(props);
            this.props = props;
            const p = this.prefix = `square_${this.id}`;
            this.names = {
                bandWidth: this.getBandWidth(),
                maxGroupField: `${p}_max_group`,
                maxGroupSignal: `${p}_max_grouping`,
                stack0: `${p}_stack0`,
                stack1: `${p}_stack1`,
                zScale: `scale_${p}_z`
            };
        }
        build() {
            const { names, prefix, props } = this;
            const { fillDirection, globalScope, groupings, parentScope, collapseYHeight, sortBy, z } = props;
            addZScale(z, globalScope.zSize, globalScope, names.zScale);
            addTransforms(globalScope.data, Object.assign({ type: 'stack', groupby: getGroupBy(groupings).map(safeFieldName), as: [names.stack0, names.stack1] }, sortBy && {
                sort: {
                    field: safeFieldName(sortBy.name),
                    order: 'ascending'
                }
            }));
            const { gap, levelSize, size, squaresPerBand } = this.addSignals();
            const heightSignal = {
                signal: fillDirection === 'down-right' ? size : levelSize
            };
            const mark = {
                name: prefix,
                type: 'rect',
                from: {
                    data: globalScope.markDataName
                },
                encode: {
                    update: Object.assign({ height: collapseYHeight ?
                            [
                                {
                                    test: testForCollapseSelection(),
                                    value: 0
                                },
                                heightSignal
                            ]
                            :
                                heightSignal, width: {
                            signal: fillDirection === 'down-right' ? levelSize : size
                        } }, z && {
                        z: { value: 0 },
                        depth: [
                            {
                                test: testForCollapseSelection(),
                                value: 0
                            },
                            {
                                scale: names.zScale,
                                field: safeFieldName(z.name)
                            }
                        ]
                    })
                }
            };
            addMarks(globalScope.markGroup, mark);
            const { tx, ty } = this.transformXY(gap, levelSize, squaresPerBand);
            return Object.assign({ offsets: {
                    x: addOffsets(parentScope.offsets.x, tx.expr),
                    y: addOffsets(parentScope.offsets.y, ty.expr),
                    h: size,
                    w: size
                }, mark, sizeSignals: {
                    layoutHeight: size,
                    layoutWidth: size
                } }, collapseYHeight && {
                encodingRuleMap: {
                    y: [
                        {
                            test: testForCollapseSelection(),
                            value: parentScope.offsets.y
                        }
                    ]
                }
            });
        }
        getBandWidth() {
            const { offsets } = this.props.parentScope;
            switch (this.props.fillDirection) {
                case 'down-right':
                    return offsets.h;
                default:
                    return offsets.w;
            }
        }
        addSignals() {
            const { names, props } = this;
            const { fillDirection, globalScope, groupings, parentScope } = props;
            let { maxGroupedFillSize, maxGroupedUnits } = props;
            if (!maxGroupedUnits) {
                if (groupings) {
                    addTransforms(globalScope.data, {
                        type: 'joinaggregate',
                        groupby: getGroupBy(groupings).map(safeFieldName),
                        ops: ['count'],
                        as: [names.maxGroupField]
                    }, {
                        type: 'extent',
                        field: names.maxGroupField,
                        signal: names.maxGroupSignal
                    });
                    maxGroupedUnits = `(${names.maxGroupSignal}[1])`;
                }
                else {
                    maxGroupedUnits = `length(data(${JSON.stringify(globalScope.data.name)}))`;
                }
            }
            if (!maxGroupedFillSize) {
                maxGroupedFillSize = fillDirection === 'down-right' ? parentScope.offsets.w : parentScope.offsets.h;
            }
            const aspect = `((${names.bandWidth}) / (${maxGroupedFillSize}))`;
            const squaresPerBand = `ceil(sqrt(${maxGroupedUnits} * ${aspect}))`;
            const gap = `min(0.1 * ((${names.bandWidth}) / (${squaresPerBand} - 1)), 1)`;
            const size = `(((${names.bandWidth}) / ${squaresPerBand}) - ${gap})`;
            const levels = `ceil(${maxGroupedUnits} / ${squaresPerBand})`;
            const levelSize = `(((${maxGroupedFillSize}) / ${levels}) - ${gap})`;
            return { gap, levelSize, size, squaresPerBand };
        }
        transformXY(gap, levelSize, squaresPerBand) {
            const { names, prefix } = this;
            const compartment = `(${names.bandWidth}) / ${squaresPerBand} * ((datum[${JSON.stringify(names.stack0)}]) % ${squaresPerBand})`;
            const level = `floor((datum[${JSON.stringify(names.stack0)}]) / ${squaresPerBand})`;
            const { fillDirection, parentScope } = this.props;
            const tx = {
                type: 'formula',
                expr: null,
                as: `${prefix}_${FieldNames.OffsetX}`
            };
            const ty = {
                type: 'formula',
                expr: null,
                as: `${prefix}_${FieldNames.OffsetY}`
            };
            switch (fillDirection) {
                case 'down-right': {
                    tx.expr = `${level} * (${levelSize} + ${gap})`;
                    ty.expr = compartment;
                    break;
                }
                case 'right-up': {
                    tx.expr = compartment;
                    ty.expr = `${parentScope.offsets.h} - ${levelSize} - ${level} * (${levelSize} + ${gap})`;
                    break;
                }
                case 'right-down':
                default: {
                    tx.expr = compartment;
                    ty.expr = `${level} * (${levelSize} + ${gap})`;
                    break;
                }
            }
            return { tx, ty };
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class Strip extends Layout {
        constructor(props) {
            super(props);
            this.props = props;
            const p = this.prefix = `strip_${this.id}`;
            this.names = {
                firstField: `${p}${FieldNames.First}`,
                lastField: `${p}${FieldNames.Last}`,
                valueField: `${p}${FieldNames.Value}`,
                scale: `scale_${p}`,
                zScale: `scale_${p}_z`
            };
        }
        build() {
            const { names, prefix, props } = this;
            const { addPercentageScale, globalScope, groupings, orientation, size, sort, sortOrder, parentScope, z } = props;
            addZScale(z, globalScope.zSize, globalScope, names.zScale);
            const horizontal = orientation === 'horizontal';
            const transform = [];
            if (sort) {
                transform.push({
                    type: 'collect',
                    sort: {
                        field: safeFieldName(sort.name),
                        order: sortOrder
                    }
                });
            }
            let stackField;
            if (size) {
                stackField = size.name;
                transform.push({
                    type: 'filter',
                    expr: `datum[${JSON.stringify(size.name)}] > 0`
                });
            }
            else {
                stackField = names.valueField;
                transform.push({
                    type: 'formula',
                    expr: '1',
                    as: stackField
                });
            }
            const stackTransform = {
                type: 'stack',
                field: safeFieldName(stackField),
                offset: 'normalize',
                as: [names.firstField, names.lastField]
            };
            if (groupings.length) {
                stackTransform.groupby = getGroupBy(groupings).map(safeFieldName);
            }
            transform.push(stackTransform);
            addTransforms(globalScope.data, ...transform);
            const span = [names.lastField, names.firstField].map(f => `datum[${JSON.stringify(f)}]`).join(' - ');
            const offsets = {
                x: addOffsets(parentScope.offsets.x, horizontal ?
                    `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.w})`
                    :
                        ''),
                y: addOffsets(parentScope.offsets.y, horizontal ?
                    ''
                    :
                        `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.h})`),
                h: horizontal
                    ? parentScope.offsets.h
                    : `(${span}) * (${parentScope.offsets.h})`,
                w: horizontal
                    ? `(${span}) * (${parentScope.offsets.w})`
                    : parentScope.offsets.w
            };
            const mark = {
                name: prefix,
                type: 'rect',
                from: { data: globalScope.markDataName },
                encode: {
                    update: Object.assign({ height: {
                            signal: offsets.h
                        }, width: {
                            signal: offsets.w
                        } }, z && {
                        z: { value: 0 },
                        depth: [
                            {
                                test: testForCollapseSelection(),
                                value: 0
                            },
                            {
                                scale: names.zScale,
                                field: safeFieldName(z.name)
                            }
                        ]
                    })
                }
            };
            addMarks(globalScope.markGroup, mark);
            let percentageScale;
            if (addPercentageScale) {
                percentageScale = {
                    type: 'linear',
                    name: names.scale,
                    domain: [0, 100],
                    range: horizontal ?
                        [
                            0,
                            {
                                signal: parentScope.sizeSignals.layoutWidth
                            }
                        ]
                        :
                            [
                                {
                                    signal: parentScope.sizeSignals.layoutHeight
                                },
                                0
                            ]
                };
            }
            return {
                globalScales: {
                    showAxes: true,
                    scales: {
                        x: horizontal ? percentageScale : undefined,
                        y: horizontal ? undefined : percentageScale
                    }
                },
                offsets,
                sizeSignals: {
                    layoutHeight: null,
                    layoutWidth: null
                },
                mark
            };
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class Treemap extends Layout {
        constructor(props) {
            super(props);
            this.props = props;
            const p = this.prefix = `treemap_${this.id}`;
            this.names = {
                dataName: `data_${p}`,
                dataHeightWidth: `data_${p}_hw`,
                dataExtents: `data_${p}_extents`,
                dataFacet: `data_${p}_facet`,
                dataFacetMark: `data_${p}_facetMark`,
                fieldChildren: `${p}_children`,
                fieldDepth: `${p}_depth`,
                fieldX0: `${p}_x0`,
                fieldX1: `${p}_x1`,
                fieldY0: `${p}_y0`,
                fieldY1: `${p}_y1`,
                fieldHeight: `${p}_h`,
                fieldWidth: `${p}_w`,
                heightExtent: `${p}_heightExtent`,
                widthExtent: `${p}_widthExtent`,
                zScale: `scale_${p}_z`
            };
        }
        build() {
            const { names, props } = this;
            const { globalScope, parentScope, treeMapMethod, z } = props;
            addZScale(z, globalScope.zSize, globalScope, names.zScale);
            const offsets = {
                x: addOffsets(parentScope.offsets.x, fn(names.fieldX0)),
                y: addOffsets(parentScope.offsets.y, fn(names.fieldY0)),
                h: subtract(names.fieldY1, names.fieldY0),
                w: subtract(names.fieldX1, names.fieldX0)
            };
            const mark = this.transformedMark(offsets);
            addSignals(globalScope.scope, {
                name: SignalNames.TreeMapMethod,
                value: 'squarify',
                bind: {
                    name: treeMapMethod,
                    input: 'select',
                    options: [
                        'squarify', 'binary'
                    ]
                }
            });
            return {
                mark,
                offsets,
                sizeSignals: {
                    layoutHeight: null,
                    layoutWidth: null
                }
            };
        }
        transformedMark(offsets) {
            const { names, props } = this;
            const { globalScope, groupings, parentScope } = props;
            if (groupings.length) {
                //treemap transform can't have it's boundary size grouped, so we need to facet the data.
                addData(globalScope.scope, {
                    name: names.dataHeightWidth,
                    source: globalScope.markDataName,
                    transform: [
                        {
                            type: 'formula',
                            expr: parentScope.offsets.h,
                            as: names.fieldHeight
                        },
                        {
                            type: 'formula',
                            expr: parentScope.offsets.w,
                            as: names.fieldWidth
                        }
                    ]
                });
                const treemapData = {
                    name: names.dataFacetMark,
                    source: names.dataFacet
                };
                const facets = {
                    type: 'group',
                    from: {
                        facet: {
                            name: names.dataFacet,
                            data: names.dataHeightWidth,
                            groupby: getGroupBy(groupings).map(safeFieldName)
                        }
                    },
                    data: [
                        {
                            name: names.dataExtents,
                            source: names.dataFacet,
                            transform: [
                                {
                                    type: 'extent',
                                    field: names.fieldHeight,
                                    signal: names.heightExtent
                                },
                                {
                                    type: 'extent',
                                    field: names.fieldWidth,
                                    signal: names.widthExtent
                                }
                            ]
                        },
                        treemapData
                    ]
                };
                globalScope.setMarkDataName(names.dataFacetMark);
                addMarks(globalScope.markGroup, facets);
                //assign new markgroup after adding mark to original group
                globalScope.setMarkGroup(facets);
                this.treemapTransform(treemapData, `${names.widthExtent}[0]`, `${names.heightExtent}[0]`);
                return this.addMark(offsets, facets, globalScope.markDataName);
            }
            else {
                this.treemapTransform(globalScope.data, parentScope.offsets.w, parentScope.offsets.h);
                return this.addMark(offsets, globalScope.markGroup, globalScope.markDataName);
            }
        }
        addMark(offsets, markParent, markDataName) {
            const { names, prefix, props } = this;
            const { z } = props;
            const mark = {
                name: prefix,
                type: 'rect',
                from: { data: markDataName },
                encode: {
                    update: Object.assign({ width: {
                            signal: offsets.w
                        }, height: {
                            signal: offsets.h
                        } }, z && {
                        z: { value: 0 },
                        depth: [
                            {
                                test: testForCollapseSelection(),
                                value: 0
                            },
                            {
                                scale: names.zScale,
                                field: safeFieldName(z.name)
                            }
                        ]
                    })
                }
            };
            addMarks(markParent, mark);
            return mark;
        }
        treemapTransform(treemapData, widthSignal, heightSignal) {
            const { names, props } = this;
            const { group, size } = props;
            addTransforms(treemapData, {
                type: 'filter',
                expr: `datum[${JSON.stringify(size.name)}] > 0`
            }, {
                type: 'nest',
                keys: [(group && group.name) || '__NONE__']
            }, {
                type: 'treemap',
                field: safeFieldName(size.name),
                sort: { field: 'value', order: 'descending' },
                round: true,
                method: { signal: SignalNames.TreeMapMethod },
                paddingInner: 1,
                paddingOuter: 0,
                size: [
                    { signal: widthSignal },
                    { signal: heightSignal }
                ],
                as: [
                    names.fieldX0,
                    names.fieldY0,
                    names.fieldX1,
                    names.fieldY1,
                    names.fieldDepth,
                    names.fieldChildren
                ]
            });
        }
    }
    function fn(n) {
        return `datum[${JSON.stringify(n)}]`;
    }
    function subtract(...fields) {
        return fields.map(n => fn(n)).join(' - ');
    }

    function allowNoneForSize(specContext) {
        switch (specContext.insight.totalStyle) {
            case 'sum-strip':
            case 'sum-strip-percent':
            case 'sum-treemap':
                return false;
            default:
                //if totalStyle is blank, count is assumed
                return true;
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function barchartH (specContext) {
        const { insight, specColumns, specViewOptions } = specContext;
        const { language } = specViewOptions;
        const bandProps = {
            orientation: 'horizontal',
            groupby: {
                column: specColumns.y,
                defaultBins,
                maxbinsSignalName: SignalNames.YBins,
                maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
                maxbins
            },
            minBandWidth: minBarBandWidth,
            showAxes: true
        };
        const x = { title: null };
        const axisScales = {
            x,
            y: { title: specColumns.y && specColumns.y.name },
            z: { title: specColumns.z && specColumns.z.name }
        };
        const layouts = [{
                layoutClass: Band,
                props: bandProps
            }];
        if (insight.totalStyle === 'sum-strip-percent') {
            x.aggregate = 'percent';
            x.title = language.percent;
            const stripProps = {
                addPercentageScale: true,
                sortOrder: 'ascending',
                orientation: 'horizontal',
                size: specColumns.size,
                sort: specColumns.sort,
                z: specColumns.z
            };
            layouts.push({
                layoutClass: Strip,
                props: stripProps
            });
        }
        else {
            const aggProps = {
                niceScale: true,
                dock: 'left',
                globalAggregateMaxExtentSignal: 'aggMaxExtent',
                globalAggregateMaxExtentScaledSignal: 'aggMaxExtentScaled',
                sumBy: specColumns.size,
                showAxes: true
            };
            layouts.push({
                layoutClass: AggregateContainer,
                props: aggProps
            });
            switch (insight.totalStyle) {
                case 'sum-treemap': {
                    x.aggregate = 'sum';
                    x.title = language.sum;
                    const treemapProps = {
                        corner: 'top-left',
                        size: specColumns.size,
                        treeMapMethod: specViewOptions.language.treeMapMethod,
                        z: specColumns.z
                    };
                    layouts.push({
                        layoutClass: Treemap,
                        props: treemapProps
                    });
                    break;
                }
                case 'sum-strip': {
                    x.aggregate = 'sum';
                    x.title = language.sum;
                    const stripProps = {
                        sortOrder: 'ascending',
                        orientation: 'horizontal',
                        size: specColumns.size,
                        sort: specColumns.sort,
                        z: specColumns.z
                    };
                    layouts.push({
                        layoutClass: Strip,
                        props: stripProps
                    });
                    break;
                }
                case 'count-strip': {
                    x.aggregate = 'count';
                    x.title = language.count;
                    const stripProps = {
                        sortOrder: 'ascending',
                        orientation: 'horizontal',
                        size: specColumns.size,
                        sort: specColumns.sort,
                        z: specColumns.z
                    };
                    layouts.push({
                        layoutClass: Strip,
                        props: stripProps
                    });
                    break;
                }
                default: {
                    x.aggregate = 'count';
                    x.title = language.count;
                    const squareProps = {
                        sortBy: specColumns.sort,
                        fillDirection: 'down-right',
                        z: specColumns.z,
                        maxGroupedUnits: aggProps.globalAggregateMaxExtentSignal,
                        maxGroupedFillSize: aggProps.globalAggregateMaxExtentScaledSignal
                    };
                    layouts.push({
                        layoutClass: Square,
                        props: squareProps
                    });
                    break;
                }
            }
        }
        return {
            axisScales,
            layouts,
            specCapabilities: {
                countsAndSums: true,
                percentage: true,
                roles: [
                    {
                        role: 'y',
                        binnable: true,
                        axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
                        signals: [SignalNames.YBins]
                    },
                    {
                        role: 'z',
                        allowNone: true
                    },
                    {
                        role: 'color',
                        allowNone: true
                    },
                    {
                        role: 'sort',
                        allowNone: true
                    },
                    {
                        role: 'size',
                        allowNone: allowNoneForSize,
                        excludeCategoric: true,
                        signals: [SignalNames.TreeMapMethod]
                    },
                    {
                        role: 'facet',
                        allowNone: true,
                        signals: [SignalNames.FacetBins]
                    },
                    {
                        role: 'facetV',
                        allowNone: true,
                        signals: [SignalNames.FacetVBins]
                    }
                ]
            }
        };
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function barchartV (specContext) {
        const { insight, specColumns, specViewOptions } = specContext;
        const { language } = specViewOptions;
        const bandProps = {
            orientation: 'vertical',
            groupby: {
                column: specColumns.x,
                defaultBins,
                maxbinsSignalName: SignalNames.XBins,
                maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
                maxbins
            },
            minBandWidth: minBarBandWidth,
            showAxes: true
        };
        const y = { title: null };
        const axisScales = {
            x: { title: specColumns.x && specColumns.x.name },
            y,
            z: { title: specColumns.z && specColumns.z.name }
        };
        const layouts = [{
                layoutClass: Band,
                props: bandProps
            }];
        if (insight.totalStyle === 'sum-strip-percent') {
            y.aggregate = 'percent';
            y.title = language.percent;
            const stripProps = {
                addPercentageScale: true,
                sortOrder: 'descending',
                orientation: 'vertical',
                size: specColumns.size,
                sort: specColumns.sort,
                z: specColumns.z
            };
            layouts.push({
                layoutClass: Strip,
                props: stripProps
            });
        }
        else {
            const aggProps = {
                niceScale: true,
                dock: 'bottom',
                globalAggregateMaxExtentSignal: 'aggMaxExtent',
                globalAggregateMaxExtentScaledSignal: 'aggMaxExtentScaled',
                sumBy: specColumns.size,
                showAxes: true
            };
            layouts.push({
                layoutClass: AggregateContainer,
                props: aggProps
            });
            switch (insight.totalStyle) {
                case 'sum-treemap': {
                    y.aggregate = 'sum';
                    y.title = language.sum;
                    const treemapProps = {
                        corner: 'bottom-left',
                        size: specColumns.size,
                        treeMapMethod: specViewOptions.language.treeMapMethod,
                        z: specColumns.z
                    };
                    layouts.push({
                        layoutClass: Treemap,
                        props: treemapProps
                    });
                    break;
                }
                case 'sum-strip': {
                    y.aggregate = 'sum';
                    y.title = language.sum;
                    const stripProps = {
                        sortOrder: 'descending',
                        orientation: 'vertical',
                        size: specColumns.size,
                        sort: specColumns.sort,
                        z: specColumns.z
                    };
                    layouts.push({
                        layoutClass: Strip,
                        props: stripProps
                    });
                    break;
                }
                case 'count-strip': {
                    y.aggregate = 'count';
                    y.title = language.count;
                    const stripProps = {
                        sortOrder: 'descending',
                        orientation: 'vertical',
                        sort: specColumns.sort,
                        z: specColumns.z
                    };
                    layouts.push({
                        layoutClass: Strip,
                        props: stripProps
                    });
                    break;
                }
                default: {
                    y.aggregate = 'count';
                    y.title = language.count;
                    const squareProps = {
                        sortBy: specColumns.sort,
                        fillDirection: 'right-up',
                        z: specColumns.z,
                        maxGroupedUnits: aggProps.globalAggregateMaxExtentSignal,
                        maxGroupedFillSize: aggProps.globalAggregateMaxExtentScaledSignal
                    };
                    layouts.push({
                        layoutClass: Square,
                        props: squareProps
                    });
                    break;
                }
            }
        }
        return {
            axisScales,
            layouts,
            specCapabilities: {
                countsAndSums: true,
                percentage: true,
                roles: [
                    {
                        role: 'x',
                        binnable: true,
                        axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
                        signals: [SignalNames.XBins]
                    },
                    {
                        role: 'z',
                        allowNone: true
                    },
                    {
                        role: 'color',
                        allowNone: true
                    },
                    {
                        role: 'sort',
                        allowNone: true
                    },
                    {
                        role: 'size',
                        allowNone: allowNoneForSize,
                        excludeCategoric: true,
                        signals: [SignalNames.TreeMapMethod]
                    },
                    {
                        role: 'facet',
                        allowNone: true,
                        signals: [SignalNames.FacetBins]
                    },
                    {
                        role: 'facetV',
                        allowNone: true,
                        signals: [SignalNames.FacetVBins]
                    }
                ]
            }
        };
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class AggregateSquare extends Layout {
        constructor(props) {
            super(props);
            this.props = props;
            const a = this.props.aggregation;
            const p = this.prefix = `agg_${this.id}`;
            this.names = {
                barCount: `${p}_count`,
                aggregateField: `${p}_aggregate_value`,
                globalAggregateExtentSignal: `${p}_${a}_extent`,
                extentData: `data_${p}_extent`
            };
        }
        build() {
            const { names, props } = this;
            const { aggregation, globalScope, groupings, onBuild, parentScope } = props;
            const { sizeSignals } = parentScope;
            addTransforms(globalScope.data, Object.assign(Object.assign({}, this.getTransforms(aggregation, getGroupBy(groupings))), { as: [names.aggregateField] }), {
                type: 'extent',
                field: safeFieldName(names.aggregateField),
                signal: names.globalAggregateExtentSignal
            });
            const localAggregateMaxExtent = `datum[${JSON.stringify(names.aggregateField)}]`;
            const squareMaxSide = `min((${sizeSignals.layoutHeight}), (${sizeSignals.layoutWidth}))`;
            const squareMaxArea = `(${[squareMaxSide, squareMaxSide].join(' * ')})`;
            const shrinkRatio = `((${localAggregateMaxExtent}) / (${names.globalAggregateExtentSignal}[1]))`;
            const squareArea = `(${[squareMaxArea, shrinkRatio].join(' * ')})`;
            const squareSide = `sqrt(${squareArea})`;
            const localAggregateMaxExtentScaled = squareSide;
            onBuild && onBuild(localAggregateMaxExtent, localAggregateMaxExtentScaled);
            const offsets = {
                x: addOffsets(parentScope.offsets.x, `(${parentScope.offsets.w} - ${squareSide}) / 2`),
                y: addOffsets(parentScope.offsets.y, `(${parentScope.offsets.h} - ${squareSide}) / 2`),
                h: squareSide,
                w: squareSide
            };
            return {
                offsets,
                sizeSignals: {
                    layoutHeight: null,
                    layoutWidth: null
                },
                globalScales: {
                    showAxes: false,
                    scales: {}
                },
                encodingRuleMap: {
                    y: [{
                            test: testForCollapseSelection(),
                            signal: offsets.y
                        }],
                    height: [{
                            test: testForCollapseSelection(),
                            value: 0
                        }]
                }
            };
        }
        getTransforms(aggregation, groupby) {
            const trans = {
                type: 'joinaggregate',
                groupby: groupby.map(safeFieldName),
                ops: [aggregation]
            };
            if (aggregation === 'sum') {
                trans.fields = [this.props.sumBy.name].map(safeFieldName);
            }
            return trans;
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function density (specContext) {
        const { insight, specColumns, specViewOptions } = specContext;
        const axisScales = {
            x: { title: specColumns.x && specColumns.x.name },
            y: { title: specColumns.y && specColumns.y.name },
            z: { title: specColumns.z && specColumns.z.name }
        };
        const hBandProps = {
            excludeEncodingRuleMap: true,
            orientation: 'horizontal',
            groupby: {
                column: specColumns.y,
                defaultBins,
                maxbinsSignalName: SignalNames.YBins,
                maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
                maxbins
            },
            minBandWidth: minBarBandWidth,
            showAxes: true
        };
        const vBandProps = {
            excludeEncodingRuleMap: true,
            orientation: 'vertical',
            groupby: {
                column: specColumns.x,
                defaultBins,
                maxbinsSignalName: SignalNames.XBins,
                maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
                maxbins
            },
            minBandWidth: minBarBandWidth,
            showAxes: true
        };
        const aggProps = {
            onBuild: null,
            aggregation: null,
            sumBy: specColumns.size
        };
        const layouts = [
            {
                layoutClass: Band,
                props: vBandProps
            },
            {
                layoutClass: Band,
                props: hBandProps
            },
            {
                layoutClass: AggregateSquare,
                props: aggProps
            }
        ];
        switch (insight.totalStyle) {
            case 'sum-treemap': {
                aggProps.aggregation = 'sum';
                const treemapProps = {
                    corner: 'bottom-left',
                    size: specColumns.size,
                    treeMapMethod: specViewOptions.language.treeMapMethod,
                    z: specColumns.z
                };
                layouts.push({
                    layoutClass: Treemap,
                    props: treemapProps
                });
                break;
            }
            case 'sum-strip': {
                aggProps.aggregation = 'sum';
                const stripProps = {
                    sortOrder: 'ascending',
                    orientation: 'vertical',
                    size: specColumns.size,
                    sort: specColumns.sort,
                    z: specColumns.z
                };
                layouts.push({
                    layoutClass: Strip,
                    props: stripProps
                });
                break;
            }
            case 'count-strip': {
                aggProps.aggregation = 'count';
                const stripProps = {
                    sortOrder: 'ascending',
                    orientation: 'vertical',
                    sort: specColumns.sort,
                    z: specColumns.z
                };
                layouts.push({
                    layoutClass: Strip,
                    props: stripProps
                });
                break;
            }
            default: {
                aggProps.aggregation = 'count';
                const squareProps = {
                    sortBy: specColumns.sort,
                    fillDirection: 'right-down',
                    z: specColumns.z,
                    maxGroupedUnits: null,
                    maxGroupedFillSize: null
                };
                aggProps.onBuild = (aggMaxExtent, aggMaxExtentScaled) => {
                    squareProps.maxGroupedUnits = aggMaxExtent;
                    squareProps.maxGroupedFillSize = aggMaxExtentScaled;
                };
                layouts.push({
                    layoutClass: Square,
                    props: squareProps
                });
                break;
            }
        }
        return {
            axisScales,
            layouts,
            specCapabilities: {
                countsAndSums: true,
                roles: [
                    {
                        role: 'x',
                        binnable: true,
                        axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
                        signals: [SignalNames.XBins]
                    },
                    {
                        role: 'y',
                        binnable: true,
                        axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
                        signals: [SignalNames.YBins]
                    },
                    {
                        role: 'z',
                        allowNone: true
                    },
                    {
                        role: 'color',
                        allowNone: true
                    },
                    {
                        role: 'sort',
                        allowNone: true
                    },
                    {
                        role: 'size',
                        allowNone: allowNoneForSize,
                        excludeCategoric: true,
                        signals: [SignalNames.TreeMapMethod]
                    },
                    {
                        role: 'facet',
                        allowNone: true,
                        signals: [SignalNames.FacetBins]
                    },
                    {
                        role: 'facetV',
                        allowNone: true,
                        signals: [SignalNames.FacetVBins]
                    }
                ]
            }
        };
    }

    function grid (specContext) {
        const { specColumns } = specContext;
        const squareProps = {
            sortBy: specColumns.sort,
            fillDirection: 'right-down',
            z: specColumns.z,
            collapseYHeight: true
        };
        const axisScales = {
            z: { title: specColumns.z && specColumns.z.name }
        };
        return {
            axisScales,
            layouts: [
                {
                    layoutClass: Square,
                    props: squareProps
                }
            ],
            specCapabilities: {
                countsAndSums: false,
                roles: [
                    {
                        role: 'z',
                        allowNone: true
                    },
                    {
                        role: 'color',
                        allowNone: true
                    },
                    {
                        role: 'sort',
                        allowNone: true
                    },
                    {
                        role: 'facet',
                        allowNone: true,
                        signals: [SignalNames.FacetBins]
                    },
                    {
                        role: 'facetV',
                        allowNone: true,
                        signals: [SignalNames.FacetVBins]
                    }
                ]
            }
        };
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class Scatter extends Layout {
        constructor(props) {
            super(props);
            this.props = props;
            const p = this.prefix = `scatter_${this.id}`;
            this.names = {
                aggregateData: `data_${p}_aggregate`,
                markData: `data_${p}_mark`,
                sizeExtent: `${p}_sizeExtent`,
                sizeRange: `${p}_sizeRange`,
                sizeScale: `${p}_sizeScale`,
                xScale: `scale_${p}_x`,
                yScale: `scale_${p}_y`,
                zScale: `scale_${p}_z`
            };
        }
        build() {
            const { names, prefix, props } = this;
            const { globalScope, parentScope, scatterPointScaleDisplay, size, x, y, z, zGrounded } = props;
            const qsize = size && size.quantitative && size;
            addSignals(globalScope.scope, {
                name: SignalNames.PointScale,
                value: 5,
                bind: {
                    name: scatterPointScaleDisplay,
                    debounce: 50,
                    input: 'range',
                    min: 1,
                    max: 10,
                    step: 1
                }
            }, {
                name: SignalNames.ZGrounded,
                value: false,
                bind: {
                    name: zGrounded,
                    input: 'checkbox'
                }
            });
            if (qsize) {
                addTransforms(globalScope.data, {
                    type: 'extent',
                    field: safeFieldName(qsize.name),
                    signal: names.sizeExtent
                });
                addScales(globalScope.scope, {
                    name: names.sizeScale,
                    type: 'linear',
                    domain: [0, { signal: `${names.sizeExtent}[1]` }],
                    range: [0, { signal: names.sizeRange }]
                });
                addSignals(globalScope.scope, {
                    name: names.sizeRange,
                    update: `min(${parentScope.sizeSignals.layoutHeight}, ${parentScope.sizeSignals.layoutWidth}) / ${scatterSizedDiv}`
                });
            }
            addData(globalScope.scope, {
                name: names.markData,
                source: globalScope.markDataName,
                transform: [x, y, z].map(c => {
                    if (!c || !c.quantitative)
                        return;
                    const t = {
                        type: 'filter',
                        expr: `isValid(datum[${JSON.stringify(c.name)}])`
                    };
                    return t;
                }).filter(Boolean)
            });
            globalScope.setMarkDataName(names.markData);
            const globalScales = { showAxes: true, scales: {} };
            const zValue = z ? `scale(${JSON.stringify(names.zScale)}, datum[${JSON.stringify(z.name)}])` : null;
            const sizeValueSignal = qsize ?
                `scale(${JSON.stringify(names.sizeScale)}, datum[${JSON.stringify(qsize.name)}]) * ${SignalNames.PointScale}`
                : SignalNames.PointScale;
            const update = Object.assign({ height: [
                    {
                        test: testForCollapseSelection(),
                        value: 0
                    },
                    {
                        signal: sizeValueSignal
                    }
                ], width: {
                    signal: sizeValueSignal
                } }, z && {
                z: [
                    {
                        test: testForCollapseSelection(),
                        value: 0
                    },
                    {
                        signal: `${SignalNames.ZGrounded} ? 0 : ${zValue}`
                    }
                ],
                depth: [
                    {
                        test: testForCollapseSelection(),
                        value: 0
                    },
                    {
                        signal: `${SignalNames.ZGrounded} ? ${zValue} : ${sizeValueSignal}`
                    }
                ]
            });
            const columnSignals = [
                {
                    column: x,
                    xyz: 'x',
                    scaleName: names.xScale,
                    reverse: false,
                    signal: parentScope.sizeSignals.layoutWidth
                },
                {
                    column: y,
                    xyz: 'y',
                    scaleName: names.yScale,
                    reverse: true,
                    signal: parentScope.sizeSignals.layoutHeight
                },
                {
                    column: z,
                    xyz: 'z',
                    scaleName: names.zScale,
                    reverse: false,
                    signal: `(${globalScope.zSize}) * ${SignalNames.ZProportion}`
                }
            ];
            columnSignals.forEach(cs => {
                const { column, reverse, scaleName, signal, xyz } = cs;
                if (!column)
                    return;
                let scale;
                if (column.quantitative) {
                    scale = linearScale(scaleName, globalScope.data.name, column.name, [0, { signal }], reverse, false);
                }
                else {
                    scale = pointScale(scaleName, globalScope.data.name, [0, { signal }], column.name, reverse);
                }
                globalScales.scales[xyz] = scale;
            });
            const mark = {
                name: prefix,
                type: 'rect',
                from: { data: globalScope.markDataName },
                encode: { update }
            };
            addMarks(globalScope.markGroup, mark);
            return {
                offsets: {
                    x: addOffsets(parentScope.offsets.x, `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(x.name)}])`),
                    y: addOffsets(parentScope.offsets.y, `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(y.name)}]) - ${sizeValueSignal}`),
                    h: sizeValueSignal,
                    w: sizeValueSignal
                },
                sizeSignals: {
                    layoutHeight: null,
                    layoutWidth: null
                },
                globalScales,
                mark,
                encodingRuleMap: {
                    y: [
                        {
                            test: testForCollapseSelection(),
                            signal: addOffsets(parentScope.offsets.y, parentScope.sizeSignals.layoutHeight)
                        }
                    ]
                }
            };
        }
    }

    function scatterplot (specContext) {
        const { specColumns, specViewOptions } = specContext;
        const scatterProps = {
            x: specColumns.x,
            y: specColumns.y,
            z: specColumns.z,
            size: specColumns.size,
            scatterPointScaleDisplay: specViewOptions.language.scatterPointScale,
            zGrounded: specViewOptions.language.zGrounded
        };
        const axisScales = {
            x: { title: specColumns.x && specColumns.x.name },
            y: { title: specColumns.y && specColumns.y.name },
            z: { title: specColumns.z && specColumns.z.name }
        };
        return {
            axisScales,
            layouts: [
                {
                    layoutClass: Scatter,
                    props: scatterProps
                }
            ],
            specCapabilities: {
                countsAndSums: false,
                roles: [
                    {
                        role: 'x',
                        axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact'
                    },
                    {
                        role: 'y',
                        axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact'
                    },
                    {
                        role: 'z',
                        allowNone: true
                    },
                    {
                        role: 'color',
                        allowNone: true
                    },
                    {
                        role: 'size',
                        excludeCategoric: true,
                        allowNone: true
                    },
                    {
                        role: 'facet',
                        allowNone: true,
                        signals: [SignalNames.FacetBins]
                    },
                    {
                        role: 'facetV',
                        allowNone: true,
                        signals: [SignalNames.FacetVBins]
                    }
                ],
                signals: [SignalNames.PointScale, SignalNames.ZGrounded]
            }
        };
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class Stack extends Layout {
        constructor(props) {
            super(props);
            this.props = props;
            const p = this.prefix = `stack_${this.id}`;
            this.names = {
                cube: `${p}_cube`,
                globalDataName: `data_${p}_count`,
                globalExtent: `${p}_global_extent`,
                levelDataName: `data_${p}_level`,
                count: `${p}_count`,
                stack0: `${p}_stack0`,
                stack1: `${p}_stack1`,
                sequence: `data_${p}_sequence`,
                sides: `${p}_sides`,
                size: `${p}_size`,
                squared: `${p}_squared`,
                squaredExtent: `${p}_squared_extent`
            };
        }
        build() {
            const { names, props } = this;
            const { globalScope, groupings, parentScope, sort } = props;
            const { sizeSignals } = parentScope;
            addTransforms(globalScope.data, {
                type: 'joinaggregate',
                groupby: getGroupBy(groupings).map(safeFieldName),
                ops: ['count'],
                as: [names.count]
            }, {
                type: 'extent',
                field: names.count,
                signal: names.globalExtent
            }, Object.assign({ type: 'stack', groupby: getGroupBy(groupings).map(safeFieldName), as: [names.stack0, names.stack1] }, sort && {
                sort: {
                    field: safeFieldName(sort.name),
                    order: 'ascending'
                }
            }));
            addData(globalScope.scope, {
                name: names.sequence,
                transform: [
                    {
                        type: 'sequence',
                        start: 1,
                        stop: {
                            signal: `sqrt(${names.globalExtent}[1])`
                        }
                    },
                    {
                        type: 'formula',
                        expr: 'datum.data * datum.data',
                        as: 'squared'
                    },
                    {
                        type: 'formula',
                        expr: `ceil(${names.globalExtent}[1] / datum.squared)`,
                        as: 'maxlevels'
                    },
                    {
                        type: 'formula',
                        expr: `(${names.size} - (datum.data - 1) * datum.data) / datum.data`,
                        as: 'side'
                    },
                    {
                        type: 'formula',
                        expr: 'datum.side * datum.maxlevels + datum.maxlevels - 1',
                        as: 'sidecubeheight'
                    },
                    {
                        type: 'formula',
                        expr: `abs(${globalScope.zSize} - datum.sidecubeheight)`,
                        as: 'heightmatch'
                    },
                    {
                        type: 'collect',
                        sort: {
                            field: 'heightmatch',
                            order: 'ascending'
                        }
                    },
                    {
                        type: 'window',
                        ops: ['row_number']
                    },
                    {
                        type: 'filter',
                        expr: 'datum.row_number === 1'
                    },
                    {
                        type: 'extent',
                        field: 'squared',
                        signal: names.squaredExtent
                    }
                ]
            });
            addSignals(globalScope.scope, {
                name: names.size,
                update: `min((${sizeSignals.layoutHeight}), (${sizeSignals.layoutWidth}))`
            }, {
                name: names.squared,
                update: `${names.squaredExtent}[0]`
            }, {
                name: names.sides,
                update: `sqrt(${names.squared})`
            }, {
                name: names.cube,
                update: `(${names.size} - (${names.sides} - 1)) / ${names.sides}`
            });
            const zLevel = `floor(datum[${JSON.stringify(names.stack0)}] / ${names.squared})`;
            const layerOrdinal = `(datum[${JSON.stringify(names.stack0)}] % ${names.squared})`;
            const cubeX = `(${layerOrdinal} % ${names.sides})`;
            const cubeY = `floor(${layerOrdinal} / ${names.sides})`;
            const groupX = `(${sizeSignals.layoutWidth} - ${names.size}) / 2`;
            const groupY = `(${sizeSignals.layoutHeight} - ${names.size}) / 2`;
            const offsets = {
                x: addOffsets(parentScope.offsets.x, groupX, `${cubeX} * (${names.cube} + 1)`),
                y: addOffsets(parentScope.offsets.y, groupY, `${cubeY} * (${names.cube} + 1)`),
                h: names.size,
                w: names.size
            };
            const mark = {
                type: 'rect',
                from: { data: this.names.levelDataName },
                encode: {
                    update: {
                        z: {
                            signal: `${zLevel} * (${names.cube} + 1)`
                        },
                        height: {
                            signal: names.cube
                        },
                        width: {
                            signal: names.cube
                        },
                        depth: {
                            signal: names.cube
                        }
                    }
                }
            };
            addMarks(globalScope.markGroup, mark);
            return {
                offsets,
                mark,
                sizeSignals: {
                    layoutHeight: names.size,
                    layoutWidth: names.size
                },
                globalScales: {
                    showAxes: false,
                    scales: {}
                },
                encodingRuleMap: {
                    y: [{
                            test: testForCollapseSelection(),
                            signal: parentScope.offsets.y
                        }],
                    z: [{
                            test: testForCollapseSelection(),
                            value: 0
                        }],
                    depth: [{
                            test: testForCollapseSelection(),
                            value: 0
                        }],
                    height: [{
                            test: testForCollapseSelection(),
                            value: 0
                        }]
                }
            };
        }
    }

    function stacks (specContext) {
        const { specColumns } = specContext;
        const axisScales = {
            x: { title: specColumns.x && specColumns.x.name },
            y: { title: specColumns.y && specColumns.y.name }
        };
        const hBandProps = {
            excludeEncodingRuleMap: true,
            orientation: 'horizontal',
            groupby: {
                column: specColumns.y,
                defaultBins,
                maxbinsSignalName: SignalNames.YBins,
                maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
                maxbins
            },
            minBandWidth: minBarBandWidth,
            showAxes: true
        };
        const vBandProps = {
            excludeEncodingRuleMap: true,
            orientation: 'vertical',
            groupby: {
                column: specColumns.x,
                defaultBins,
                maxbinsSignalName: SignalNames.XBins,
                maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
                maxbins
            },
            minBandWidth: minBarBandWidth,
            showAxes: true
        };
        const stackProps = {
            sort: specColumns.sort
        };
        return {
            axisScales,
            customZScale: true,
            layouts: [
                {
                    layoutClass: Band,
                    props: vBandProps
                },
                {
                    layoutClass: Band,
                    props: hBandProps
                },
                {
                    layoutClass: Stack,
                    props: stackProps
                }
            ],
            specCapabilities: {
                countsAndSums: false,
                roles: [
                    {
                        role: 'x',
                        binnable: true,
                        axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
                        signals: [SignalNames.XBins]
                    },
                    {
                        role: 'y',
                        binnable: true,
                        axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
                        signals: [SignalNames.YBins]
                    },
                    {
                        role: 'color',
                        allowNone: true
                    },
                    {
                        role: 'sort',
                        allowNone: true
                    },
                    {
                        role: 'facet',
                        allowNone: true,
                        signals: [SignalNames.FacetBins]
                    },
                    {
                        role: 'facetV',
                        allowNone: true,
                        signals: [SignalNames.FacetVBins]
                    }
                ]
            }
        };
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function strips (specContext) {
        const { specColumns } = specContext;
        const stripProps = {
            sortOrder: 'ascending',
            orientation: 'vertical',
            size: specColumns.size,
            sort: specColumns.sort,
            z: specColumns.z
        };
        const axisScales = {
            z: { title: specColumns.z && specColumns.z.name }
        };
        const layouts = [];
        if (specColumns.facet) {
            axisScales.y = {
                title: null,
                aggregate: specColumns.size ? 'sum' : 'count'
            };
            const globalAggregateMaxExtentScaledSignal = 'globalAggregateMaxExtentScaledSignal';
            const globalAggregateMaxExtentSignal = 'globalAggregateMaxExtentSignal';
            const props = {
                dock: 'top',
                niceScale: false,
                globalAggregateMaxExtentScaledSignal,
                globalAggregateMaxExtentSignal,
                sumBy: specColumns.size,
                showAxes: false
            };
            layouts.push({
                layoutClass: AggregateContainer,
                props
            });
        }
        layouts.push({
            layoutClass: Strip,
            props: stripProps
        });
        return {
            axisScales,
            layouts,
            specCapabilities: {
                countsAndSums: false,
                roles: [
                    {
                        role: 'size',
                        allowNone: true,
                        excludeCategoric: true
                    },
                    {
                        role: 'z',
                        allowNone: true
                    },
                    {
                        role: 'color',
                        allowNone: true
                    },
                    {
                        role: 'sort',
                        allowNone: true
                    },
                    {
                        role: 'facet',
                        allowNone: true,
                        signals: [SignalNames.FacetBins]
                    },
                    {
                        role: 'facetV',
                        allowNone: true,
                        signals: [SignalNames.FacetVBins]
                    }
                ]
            }
        };
    }

    function treemap (specContext) {
        const { specColumns, specViewOptions } = specContext;
        const treemapProps = {
            corner: 'top-left',
            group: specColumns.group,
            size: specColumns.size,
            treeMapMethod: specViewOptions.language.treeMapMethod,
            z: specColumns.z
        };
        const axisScales = {
            z: { title: specColumns.z && specColumns.z.name }
        };
        const layouts = [];
        if (specColumns.facet) {
            axisScales.y = {
                title: null,
                aggregate: 'sum'
            };
            const globalAggregateMaxExtentScaledSignal = 'globalAggregateMaxExtentScaledSignal';
            const globalAggregateMaxExtentSignal = 'globalAggregateMaxExtentSignal';
            const props = {
                dock: 'top',
                niceScale: false,
                globalAggregateMaxExtentScaledSignal,
                globalAggregateMaxExtentSignal,
                sumBy: specColumns.size,
                showAxes: false
            };
            layouts.push({
                layoutClass: AggregateContainer,
                props
            });
        }
        layouts.push({
            layoutClass: Treemap,
            props: treemapProps
        });
        return {
            axisScales,
            layouts,
            specCapabilities: {
                countsAndSums: false,
                roles: [
                    {
                        role: 'size',
                        excludeCategoric: true,
                    },
                    {
                        role: 'group',
                        allowNone: true
                    },
                    {
                        role: 'z',
                        allowNone: true
                    },
                    {
                        role: 'color',
                        allowNone: true
                    },
                    {
                        role: 'facet',
                        allowNone: true,
                        signals: [SignalNames.FacetBins]
                    },
                    {
                        role: 'facetV',
                        allowNone: true,
                        signals: [SignalNames.FacetVBins]
                    }
                ],
                signals: [SignalNames.TreeMapMethod]
            }
        };
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function addGlobalAxes(props) {
        const { axesOffsets, axisScales, axesScopes, axesTitlePadding, allGlobalScales, globalScope, labelBaseline, plotOffsetSignals, specColumns, specViewOptions } = props;
        const { scope } = globalScope;
        allGlobalScales.forEach(globalScales => {
            const { scales } = globalScales;
            for (let s in scales) {
                let scale = scales[s];
                if (scale) {
                    addScales(scope, scale);
                    if (globalScales.showAxes && axisScales && s !== 'z') {
                        let axisScale = axisScales[s];
                        if (axisScale) {
                            const lineColor = specViewOptions.colors.axisLine;
                            const horizontal = s === 'x';
                            const column = specColumns[s] || { quantitative: true };
                            const title = axisScale.title;
                            const props = {
                                title,
                                horizontal,
                                column,
                                specViewOptions,
                                lineColor,
                                titlePadding: axesTitlePadding[s],
                                labelBaseline: labelBaseline[s]
                            };
                            axesScopes['main'].forEach(a => addAxes(a.scope, createAxis(Object.assign(Object.assign({}, props), { scale: a.scale || scale.name, showTitle: a.title, showLabels: a.labels, showLines: a.lines }))));
                            if (axesScopes[s]) {
                                axesScopes[s].forEach(a => addAxes(a.scope, createAxis(Object.assign(Object.assign({}, props), { scale: a.scale || scale.name, showTitle: a.title, showLabels: a.labels, showLines: a.lines }))));
                            }
                            if (plotOffsetSignals[s] && axesOffsets[s]) {
                                const plotOffsetSignal = plotOffsetSignals[s];
                                plotOffsetSignal.update = `${axesOffsets[s]}`;
                            }
                        }
                    }
                }
            }
        });
    }
    function createAxis(props) {
        const { column, horizontal, labelBaseline, lineColor, scale, showLabels, showTitle, showLines, specViewOptions, title, titlePadding } = props;
        const axis = Object.assign(Object.assign(Object.assign(Object.assign({ scale, orient: horizontal ? 'bottom' : 'left', domain: showLines, ticks: showLines }, showLines && {
            domainColor: lineColor,
            tickColor: lineColor,
            tickSize: specViewOptions.tickSize
        }), showTitle && {
            title,
            titleAlign: horizontal ? 'left' : 'right',
            titleAngle: {
                signal: horizontal ? SignalNames.TextAngleX : SignalNames.TextAngleY
            },
            titleColor: specViewOptions.colors.axisText,
            titleFontSize: {
                signal: SignalNames.TextTitleSize
            },
            titleLimit: axesTitleLimit,
            titlePadding
        }), { labels: showLabels }), showLabels && {
            labelAlign: horizontal ? 'left' : 'right',
            labelBaseline,
            labelAngle: {
                signal: horizontal ? SignalNames.TextAngleX : SignalNames.TextAngleY
            },
            labelColor: specViewOptions.colors.axisText,
            labelFontSize: {
                signal: SignalNames.TextSize
            },
            labelLimit: axesLabelLimit
        });
        if (column.quantitative) {
            axis.format = '~r';
        }
        return axis;
    }

    function legend(column, fill) {
        const legend = {
            orient: 'none',
            title: column.name,
            fill,
            encode: {
                symbols: {
                    update: {
                        shape: {
                            value: 'square'
                        }
                    }
                }
            }
        };
        if (column.quantitative) {
            legend.type = 'symbol';
            legend.format = '~r';
        }
        return legend;
    }
    function getLegends(context, fill) {
        const { specColumns, insight } = context;
        if (specColumns.color && !insight.hideLegend && !insight.directColor && !specColumns.color.isColorData) {
            return [legend(specColumns.color, fill)];
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function topLookup(column, count, source, legend, lookupName, fieldName, indexName) {
        const data = [
            {
                name: lookupName,
                source,
                transform: [
                    {
                        type: 'aggregate',
                        groupby: [safeFieldName(column.name)]
                    },
                    {
                        type: 'window',
                        ops: ['count'],
                        as: [indexName]
                    },
                    {
                        type: 'filter',
                        expr: `datum[${JSON.stringify(indexName)}] <= ${count}`
                    }
                ]
            },
            {
                name: legend,
                source,
                transform: [
                    {
                        type: 'lookup',
                        from: lookupName,
                        key: safeFieldName(column.name),
                        fields: [column.name].map(safeFieldName),
                        values: [column.name].map(safeFieldName),
                        as: [fieldName]
                    },
                    {
                        type: 'formula',
                        expr: `datum[${JSON.stringify(fieldName)}] == null ? '${Other}' : datum[${JSON.stringify(fieldName)}]`,
                        as: fieldName
                    }
                ]
            }
        ];
        return data;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function addColor(props) {
        const { colorReverseSignalName, dataName, scope, legendDataName, scaleName, specContext, topLookupName } = props;
        let colorDataName = dataName;
        const { insight, specColumns, specViewOptions } = specContext;
        const legends = getLegends(specContext, scaleName);
        if (legends) {
            scope.legends = legends;
        }
        const categoricalColor = specColumns.color && !specColumns.color.quantitative;
        if (categoricalColor) {
            addData(scope, ...topLookup(specColumns.color, specViewOptions.maxLegends, dataName, legendDataName, topLookupName, FieldNames.TopColor, FieldNames.TopIndex));
            colorDataName = legendDataName;
        }
        if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
            if (specColumns.color.quantitative) {
                addScales(scope, binnableColorScale(scaleName, insight.colorBin, dataName, specColumns.color.name, insight.scheme));
            }
            else {
                addScales(scope, {
                    name: scaleName,
                    type: 'ordinal',
                    domain: {
                        data: colorDataName,
                        field: FieldNames.TopColor,
                        sort: true
                    },
                    range: {
                        scheme: insight.scheme || ColorScaleNone
                    },
                    reverse: { signal: colorReverseSignalName }
                });
            }
        }
        addSignals(scope, colorBinCountSignal(specContext), colorReverseSignal(specContext));
        return { topColorField: FieldNames.TopColor, colorDataName };
    }

    function displayBin(bin) {
        const val = (index) => `datum[${JSON.stringify(bin.fields[index])}]`;
        return bin.discreteColumn.column.quantitative ?
            `format(${val(0)}, '~r') + ' - ' + format(${val(1)}, '~r')`
            :
                val(0);
    }
    function obj(nameValues, clause) {
        if (clause) {
            nameValues = [clause, ...nameValues];
        }
        return `{${nameValues.join()}}`;
    }
    function serializeAsVegaExpression(bin, firstFieldName, lastFieldName, clause) {
        if (bin.discreteColumn.column.quantitative) {
            const low = [
                `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
                'operator:\'>=\'',
                `value:datum[${JSON.stringify(bin.fields[0])}]`
            ];
            const high = [
                'clause:\'&&\'',
                `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
                'operator:\'<\'',
                `value:datum[${JSON.stringify(bin.fields[1])}]`
            ];
            return obj([
                `expressions:[ datum[${JSON.stringify(firstFieldName)}] ? null : ${obj(low)}, datum[${JSON.stringify(lastFieldName)}] ? null : ${obj(high)}]`
            ], clause);
        }
        else {
            const exact = [
                `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
                'operator:\'==\'',
                `value:datum[${JSON.stringify(bin.fields[0])}]`
            ];
            return obj([
                `expressions:[${obj(exact)}]`
            ], clause);
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function addFacetColRowTitles(globalScope, colTitleSource, rowTitleSource, sizeSignals, axisTextColor) {
        const titleSignal = `parent[${JSON.stringify(FieldNames.FacetTitle)}]`;
        const index = `datum[${JSON.stringify(FieldNames.Ordinal)}] - 1`;
        const col = facetColumnHeaderFooter(colTitleSource.dataName, sizeSignals, index);
        const row = facetRowHeaderFooter(rowTitleSource.dataName, sizeSignals, index);
        addMarks(globalScope, col.header, row.footer);
        addMarks(col.header, {
            type: 'text',
            encode: {
                enter: {
                    align: {
                        value: 'center'
                    },
                    baseline: {
                        value: 'middle'
                    },
                    fill: {
                        value: axisTextColor
                    }
                },
                update: {
                    metaData: {
                        signal: `{search: parent[${JSON.stringify(FieldNames.FacetSearch)}]}`
                    },
                    x: {
                        signal: `${sizeSignals.layoutWidth} / 2`
                    },
                    limit: {
                        signal: sizeSignals.layoutWidth
                    },
                    fontSize: {
                        signal: SignalNames.TextSize
                    },
                    text: {
                        signal: titleSignal
                    }
                }
            }
        });
        addMarks(row.footer, {
            type: 'text',
            encode: {
                enter: {
                    align: {
                        value: 'left'
                    },
                    baseline: {
                        value: 'middle'
                    },
                    fill: {
                        value: axisTextColor
                    }
                },
                update: {
                    metaData: {
                        signal: `{search: parent[${JSON.stringify(FieldNames.FacetSearch)}]}`
                    },
                    y: {
                        signal: `${sizeSignals.layoutHeight} / 2`
                    },
                    limit: {
                        signal: SignalNames.PlotOffsetRight
                    },
                    fontSize: {
                        signal: SignalNames.TextSize
                    },
                    text: {
                        signal: titleSignal
                    }
                }
            }
        });
    }
    function addFacetCellTitles(scope, sizeSignals, axisTextColor) {
        addMarks(scope, {
            type: 'text',
            encode: {
                enter: {
                    align: {
                        value: 'center'
                    },
                    baseline: {
                        value: 'bottom'
                    },
                    fill: {
                        value: axisTextColor
                    }
                },
                update: {
                    metaData: {
                        signal: `{search: parent[${JSON.stringify(FieldNames.FacetSearch)}]}`
                    },
                    x: {
                        signal: `(${sizeSignals.layoutWidth}) / 2`
                    },
                    text: {
                        signal: `parent[${JSON.stringify(FieldNames.FacetTitle)}]`
                    },
                    fontSize: {
                        signal: SignalNames.TextSize
                    },
                    limit: {
                        signal: sizeSignals.layoutWidth
                    },
                    y: {
                        signal: `-${SignalNames.FacetPaddingTop} / 2`
                    }
                }
            }
        });
    }
    function addFacetAxesGroupMarks(props) {
        const { colSeqName, colTitleScaleName, globalScope, facetScope, plotHeightOut, plotScope, plotWidthOut, rowSeqName, rowTitleScaleName } = props;
        const { sizeSignals } = facetScope;
        const colSequence = createSequence(colSeqName, sizeSignals.colCount);
        const rowSequence = createSequence(rowSeqName, sizeSignals.rowCount);
        const index = 'datum.data';
        const col = facetColumnHeaderFooter(colSeqName, sizeSignals, index);
        const row = facetRowHeaderFooter(rowSeqName, sizeSignals, index);
        addData(globalScope, colSequence, rowSequence);
        addMarks(globalScope, col.footer, row.header);
        const colTitleScale = {
            type: 'linear',
            name: colTitleScaleName,
            domain: [0, 1],
            range: [0, { signal: plotWidthOut }]
        };
        const rowTitleScale = {
            type: 'linear',
            name: rowTitleScaleName,
            domain: [0, 1],
            range: [{ signal: plotHeightOut }, 0]
        };
        addScales(globalScope, colTitleScale, rowTitleScale);
        const map = {
            main: [
                {
                    scope: facetScope.facetScope,
                    lines: true,
                    labels: false,
                    title: false
                }
            ],
            x: [
                {
                    scope: col.footer,
                    lines: true,
                    labels: true,
                    title: false
                },
                {
                    scope: plotScope,
                    scale: colTitleScaleName,
                    lines: false,
                    labels: false,
                    title: true
                }
            ],
            y: [
                {
                    scope: row.header,
                    lines: true,
                    labels: true,
                    title: false
                },
                {
                    scope: plotScope,
                    scale: rowTitleScaleName,
                    lines: false,
                    labels: false,
                    title: true
                }
            ]
        };
        return map;
    }
    function facetRowHeaderFooter(data, sizeSignals, index) {
        const rowFn = (xSignal) => {
            return {
                type: 'group',
                from: { data },
                encode: {
                    update: {
                        x: { signal: xSignal },
                        y: {
                            signal: `${SignalNames.PlotOffsetTop} + ${SignalNames.FacetPaddingTop} + (${index}) * (${sizeSignals.layoutHeight} + ${SignalNames.FacetPaddingTop} + ${SignalNames.FacetPaddingBottom})`
                        },
                        height: { signal: sizeSignals.layoutHeight }
                    }
                }
            };
        };
        const header = rowFn(SignalNames.PlotOffsetLeft);
        const footer = rowFn(`${SignalNames.PlotOffsetLeft} + ${SignalNames.PlotWidthOut} + ${SignalNames.PlotOffsetRight} / 2`);
        return { header, footer };
    }
    function facetColumnHeaderFooter(data, sizeSignals, index) {
        const colFn = (ySignal) => {
            return {
                type: 'group',
                from: { data },
                encode: {
                    update: {
                        x: {
                            signal: `(${index}) * (${sizeSignals.layoutWidth} + ${SignalNames.FacetPaddingLeft}) + ${SignalNames.FacetPaddingLeft} + ${SignalNames.PlotOffsetLeft}`
                        },
                        y: { signal: ySignal },
                        width: { signal: sizeSignals.layoutWidth }
                    }
                }
            };
        };
        //create group marks based on data sequences
        const header = colFn(`${SignalNames.PlotOffsetTop} / 2`);
        const footer = colFn(`${SignalNames.PlotOffsetTop} + ${SignalNames.PlotHeightOut}`);
        return { header, footer };
    }
    function createSequence(dataName, countSignal) {
        return {
            name: dataName,
            transform: [
                {
                    type: 'sequence',
                    start: 0,
                    stop: {
                        signal: countSignal
                    }
                }
            ]
        };
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function createOrdinals(source, prefix, binFields, sortOrder) {
        const _binFields = binFields.map(safeFieldName);
        const dataName = `${prefix}_bin_order`;
        const data = {
            name: dataName,
            source,
            transform: [
                {
                    type: 'aggregate',
                    groupby: _binFields
                },
                {
                    type: 'collect',
                    sort: {
                        field: _binFields,
                        order: _binFields.map(f => sortOrder)
                    }
                },
                {
                    type: 'window',
                    ops: ['row_number'],
                    as: [FieldNames.Ordinal]
                }
            ]
        };
        return {
            data,
            scale: ordinalScale(dataName, `scale_${prefix}_order`, binFields)
        };
    }
    function ordinalScale(dataName, scaleName, binFields) {
        return {
            type: 'ordinal',
            name: scaleName,
            domain: {
                data: dataName,
                field: safeFieldName(binFields[0])
            },
            range: {
                data: dataName,
                field: FieldNames.Ordinal
            }
        };
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class Cross extends Layout {
        constructor(props) {
            super(props);
            this.props = props;
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
        getGrouping() {
            return this.binX.fields.concat(this.binY.fields);
        }
        build() {
            const { binX, binY, names, prefix, props } = this;
            const { axisTextColor, colRowTitles, globalScope, parentScope } = props;
            const titles = { x: { dataName: null, quantitative: null }, y: { dataName: null, quantitative: null } };
            const dx = {
                dim: 'x',
                bin: binX,
                sortOrder: 'ascending',
                size: parentScope.sizeSignals.layoutWidth,
                layout: parentScope.sizeSignals.layoutWidth,
                min: globalScope.signals.minCellWidth.name,
                out: globalScope.signals.plotWidthOut,
                offset: SignalNames.FacetPaddingLeft,
                padding: SignalNames.FacetPaddingLeft,
                dataOut: null,
                scaleName: null,
                position: null
            };
            const dy = {
                dim: 'y',
                bin: binY,
                sortOrder: 'ascending',
                size: parentScope.sizeSignals.layoutHeight,
                layout: parentScope.sizeSignals.layoutHeight,
                min: globalScope.signals.minCellHeight.name,
                out: globalScope.signals.plotHeightOut,
                offset: SignalNames.FacetPaddingTop,
                padding: `(${SignalNames.FacetPaddingTop} + ${SignalNames.FacetPaddingBottom})`,
                dataOut: null,
                scaleName: null,
                position: null
            };
            const dimensions = [dx, dy];
            dimensions.forEach(d => {
                const { bin, dim, padding, sortOrder } = d;
                let data;
                let dataName;
                let countSignal;
                let scale;
                const titleSource = titles[dim];
                if (bin.native === false) {
                    addSignals(globalScope.scope, bin.maxbinsSignal);
                    addTransforms(globalScope.data, ...bin.transforms);
                    addData(globalScope.scope, bin.dataSequence);
                    addTransforms(bin.dataSequence, {
                        type: 'formula',
                        expr: `indata(${JSON.stringify(globalScope.markDataName)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                        as: FieldNames.Contains
                    });
                    data = bin.dataSequence;
                    dataName = bin.dataSequence.name;
                    countSignal = `length(data(${JSON.stringify(dataName)}))`;
                    scale = ordinalScale(dataName, `${names.dimScale}_${dim}`, bin.fields);
                    titleSource.dataName = bin.dataSequence.name;
                }
                else {
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
                addTransforms(data, {
                    type: 'formula',
                    expr: serializeAsVegaExpression(bin, FieldNames.First, FieldNames.Last),
                    as: FieldNames.FacetSearch
                }, {
                    type: 'formula',
                    expr: displayBin(bin),
                    as: FieldNames.FacetTitle
                });
                addScales(globalScope.scope, scale);
                const count = `${names.dimCount}_${dim}`;
                const calc = `${names.dimCellSizeCalc}_${dim}`;
                const size = `${names.dimCellSize}_${dim}`;
                addSignals(globalScope.scope, { name: count, update: countSignal });
                addSignals(globalScope.scope, {
                    name: calc,
                    update: `${d.layout} / ${count}`
                }, {
                    name: size,
                    update: `max(${d.min}, (${calc} - ${padding}))`
                });
                modifySignal(d.out, 'max', `((${size} + ${padding}) * ${count})`);
                d.position = this.dimensionOffset(d);
            });
            const groupRow = {
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
            const groupCol = {
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
            const offsets = {
                x: this.dimensionOffset(dx),
                y: this.dimensionOffset(dy),
                h: `${names.dimCellSize}_y`,
                w: `${names.dimCellSize}_x`
            };
            const sizeSignals = {
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
        dimensionOffset(d) {
            const { names } = this;
            return `${d.offset} + (scale(${JSON.stringify(d.scaleName)}, datum[${JSON.stringify(d.bin.fields[0])}]) - 1) * (${names.dimCellSize}_${d.dim} + ${d.padding})`;
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class Wrap extends Layout {
        constructor(props) {
            super(props);
            this.props = props;
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
        getGrouping() {
            return this.bin.fields;
        }
        build() {
            const { bin, names, prefix, props } = this;
            const { axisTextColor, cellTitles, globalScope, parentScope } = props;
            let ordinalBinData;
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
            }
            else {
                const ord = createOrdinals(globalScope.data.name, prefix, bin.fields, 'ascending');
                addData(globalScope.scope, ord.data);
                ordinalBinData = ord.data.name;
            }
            addData(globalScope.scope, {
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
            }, {
                name: names.rxc1,
                source: names.rxc0,
                transform: [
                    {
                        type: 'project',
                        fields: ['data'],
                        as: ['cols']
                    }
                ]
            }, {
                name: names.rxc2,
                source: names.rxc0,
                transform: [
                    {
                        type: 'project',
                        fields: ['complement'],
                        as: ['cols']
                    }
                ]
            }, {
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
            }, {
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
            });
            const dataOut = {
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
            addSignals(globalScope.scope, {
                name: names.minAspect,
                update: `${SignalNames.MinCellWidth} / ${SignalNames.MinCellHeight}`
            }, {
                name: names.target,
                update: `${names.minAspect} === 1 ? ${1.2} : ${names.minAspect}`
            }, {
                name: names.minArea,
                update: `${SignalNames.MinCellWidth}*${SignalNames.MinCellHeight}`
            }, {
                name: names.aspect,
                update: `${parentScope.sizeSignals.layoutWidth} / ${parentScope.sizeSignals.layoutHeight}`
            }, {
                name: names.dataLength,
                update: `data(${JSON.stringify(ordinalBinData)}).length`
            }, {
                name: names.growColCount,
                update: `max(floor(${parentScope.sizeSignals.layoutWidth} / ${SignalNames.MinCellWidth}), 1)`
            }, {
                name: names.growCellWidth,
                update: `${parentScope.sizeSignals.layoutWidth} / ${names.growColCount}`
            }, {
                name: names.fitsArea,
                update: `((${names.dataLength} * ${names.minArea}) <= (${parentScope.sizeSignals.layoutWidth} * ${parentScope.sizeSignals.layoutHeight}))`
            }, {
                name: names.fits,
                update: `${names.fitsArea} && length(data(${JSON.stringify(names.rxc)})) > 0`
            }, {
                name: names.colCount,
                update: `${names.fits} ? data(${JSON.stringify(names.rxc)})[0].cols : ${names.growColCount}`
            }, {
                name: names.cellWidth,
                update: `${names.fits} ? data(${JSON.stringify(names.rxc)})[0].cellw : ${names.growCellWidth}`
            }, {
                name: names.cellHeight,
                update: `${names.fits} ? data(${JSON.stringify(names.rxc)})[0].cellh : ${SignalNames.MinCellHeight}`
            });
            modifySignal(globalScope.signals.plotHeightOut, 'max', `(${names.cellHeight} * ceil(${names.dataLength} / ${names.colCount}))`);
            modifySignal(globalScope.signals.plotWidthOut, 'max', `(${names.cellWidth} * ${names.colCount})`);
            const signalH = [names.cellHeight, SignalNames.FacetPaddingTop, SignalNames.FacetPaddingBottom].join(' - ');
            const signalW = [names.cellWidth, SignalNames.FacetPaddingLeft].join(' - ');
            const signalX = addOffsets(parentScope.offsets.x, `datum[${JSON.stringify(FieldNames.WrapCol)}] * ${names.cellWidth}`, SignalNames.FacetPaddingLeft);
            const signalY = addOffsets(parentScope.offsets.y, `datum[${JSON.stringify(FieldNames.WrapRow)}] * ${names.cellHeight}`, SignalNames.FacetPaddingTop);
            const update = {
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
            const offsets = {
                x: signalX,
                y: signalY,
                h: signalH,
                w: signalW
            };
            const group = {
                style: 'cell',
                name: prefix,
                type: 'group',
                from: {
                    data: names.rowColumnDataName
                },
                encode: { update }
            };
            addMarks(globalScope.markGroup, group);
            const sizeSignals = {
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

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getFacetLayout(facetStyle, facetColumn, facetVColumn, axisTextColor) {
        let layoutPair;
        const scales = [];
        let signals;
        const groupby = facetColumn;
        const plotPadding = {
            x: 0,
            y: 0
        };
        switch (facetStyle) {
            case 'cross': {
                const props = {
                    axisTextColor,
                    colRowTitles: true,
                    groupbyX: groupby,
                    groupbyY: facetVColumn
                };
                layoutPair = {
                    layoutClass: Cross,
                    props
                };
                signals = [
                    {
                        name: SignalNames.FacetPaddingBottom,
                        update: `${facetPaddingBottom}`
                    },
                    {
                        name: SignalNames.FacetPaddingLeft,
                        update: `${facetPaddingLeft}`
                    },
                    {
                        name: SignalNames.FacetPaddingTop,
                        update: '0'
                    }
                ];
                plotPadding.y = facetPaddingTop;
                plotPadding.x = facetPaddingRight;
                break;
            }
            case 'wrap':
            default: {
                const props = {
                    axisTextColor,
                    cellTitles: true,
                    groupby
                };
                layoutPair = {
                    layoutClass: Wrap,
                    props
                };
                signals = [
                    {
                        name: SignalNames.FacetPaddingBottom,
                        update: `${facetPaddingBottom}`
                    },
                    {
                        name: SignalNames.FacetPaddingLeft,
                        update: `${facetPaddingLeft}`
                    },
                    {
                        name: SignalNames.FacetPaddingTop,
                        update: `${facetPaddingTop}`
                    }
                ];
                break;
            }
        }
        return { layoutPair, plotPadding, scales, signals };
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function fill(context, colorFieldName, scale) {
        const { specColumns, insight, specViewOptions } = context;
        const colorColumn = specColumns.color;
        return colorColumn ?
            colorColumn.isColorData || insight.directColor ?
                {
                    field: safeFieldName(colorColumn.name)
                }
                :
                    {
                        scale,
                        field: colorColumn.quantitative ? safeFieldName(colorColumn.name) : colorFieldName
                    }
            :
                {
                    value: specViewOptions.colors.defaultCube
                };
    }
    function opacity(context) {
        const result = {
            signal: SignalNames.MarkOpacity
        };
        return result;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class GlobalScope {
        constructor(props) {
            const { dataName, markGroup, scope, signals } = props;
            this.scope = scope;
            this._markGroup = markGroup;
            this.signals = signals;
            this.data = getDataByName(scope.data, dataName).data;
            this._markDataName = dataName;
            this.offsets = {
                x: '0',
                y: '0',
                h: SignalNames.PlotHeightIn,
                w: SignalNames.PlotWidthIn
            };
            this.sizeSignals = {
                layoutHeight: SignalNames.PlotHeightIn,
                layoutWidth: SignalNames.PlotWidthIn
            };
            this.zSize = SignalNames.PlotHeightIn;
        }
        get markDataName() {
            return this._markDataName;
        }
        setMarkDataName(markDataName) {
            this._markDataName = markDataName;
        }
        get markGroup() {
            return this._markGroup;
        }
        setMarkGroup(markGroup) {
            this._markGroup = markGroup;
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class SpecBuilder {
        constructor(props) {
            this.props = props;
            this.globalSignals = {
                minCellWidth: {
                    name: SignalNames.MinCellWidth,
                    update: `${minFacetWidth}`
                },
                minCellHeight: { name: SignalNames.MinCellHeight, update: `${minFacetHeight}` },
                plotOffsetLeft: { name: SignalNames.PlotOffsetLeft, update: '0' },
                plotOffsetTop: { name: SignalNames.PlotOffsetTop, update: '0' },
                plotOffsetBottom: { name: SignalNames.PlotOffsetBottom, update: '0' },
                plotOffsetRight: { name: SignalNames.PlotOffsetRight, update: '0' },
                plotHeightOut: { name: SignalNames.PlotHeightOut, update: SignalNames.PlotHeightIn },
                plotWidthOut: { name: SignalNames.PlotWidthOut, update: SignalNames.PlotWidthIn }
            };
        }
        validate() {
            const { specCapabilities, specContext } = this.props;
            const { roles } = specCapabilities;
            const required = roles.filter(r => {
                switch (typeof r.allowNone) {
                    case 'boolean':
                        return !r.allowNone;
                    case 'undefined':
                        return true;
                    case 'function':
                        return !r.allowNone(specContext);
                }
            });
            const numeric = roles.filter(r => r.excludeCategoric);
            const errors = required
                .map(r => {
                if (specContext.specColumns[r.role]) {
                    return null;
                }
                else {
                    return `Field ${r.role} is required.`;
                }
            })
                .concat(numeric.map(r => {
                if (specContext.specColumns[r.role] && !specContext.specColumns[r.role].quantitative) {
                    return `Field ${r.role} must be quantitative.`;
                }
                else {
                    return null;
                }
            }))
                .filter(Boolean);
            return errors;
        }
        build() {
            const { specCapabilities } = this.props;
            const errors = this.validate();
            if (errors.length) {
                return {
                    errors,
                    specCapabilities,
                    vegaSpec: null
                };
            }
            else {
                const { specContext } = this.props;
                const { insight, specColumns, specViewOptions } = specContext;
                const dataName = 'data_source';
                const { vegaSpec, groupMark } = this.initSpec(dataName);
                const { topColorField, colorDataName } = addColor({
                    scope: vegaSpec,
                    dataName,
                    specContext,
                    scaleName: ScaleNames.Color,
                    legendDataName: 'data_legend',
                    topLookupName: 'data_topcolorlookup',
                    colorReverseSignalName: SignalNames.ColorReverse
                });
                const globalScope = new GlobalScope({
                    dataName: colorDataName,
                    markGroup: groupMark,
                    scope: vegaSpec,
                    signals: this.globalSignals
                });
                let facetLayout;
                if (insight.columns.facet) {
                    const discreteFacetColumn = {
                        column: specColumns.facet,
                        defaultBins,
                        maxbins,
                        maxbinsSignalDisplayName: specViewOptions.language.FacetMaxBins,
                        maxbinsSignalName: SignalNames.FacetBins
                    };
                    const discreteFacetVColumn = {
                        column: specColumns.facetV,
                        defaultBins,
                        maxbins,
                        maxbinsSignalDisplayName: specViewOptions.language.FacetVMaxBins,
                        maxbinsSignalName: SignalNames.FacetVBins
                    };
                    facetLayout = getFacetLayout(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn, specViewOptions.colors.axisText);
                    addSignals(vegaSpec, ...facetLayout.signals);
                    addScales(vegaSpec, ...facetLayout.scales);
                    this.props.layouts = [facetLayout.layoutPair, ...this.props.layouts];
                    this.globalSignals.plotOffsetTop.update = `${facetLayout.plotPadding.y}`;
                    this.globalSignals.plotOffsetRight.update = `${facetLayout.plotPadding.x}`;
                }
                const { firstScope, finalScope, specResult, allGlobalScales, allEncodingRules } = this.iterateLayouts(globalScope, (i, innerScope) => {
                    if (facetLayout && i === 0) {
                        globalScope.zSize = innerScope.offsets.h;
                    }
                });
                if (specResult) {
                    return specResult;
                }
                if (allGlobalScales.length > 0) {
                    let axesScopes = facetLayout ?
                        addFacetAxesGroupMarks({
                            globalScope: globalScope.scope,
                            plotScope: groupMark,
                            facetScope: firstScope,
                            plotHeightOut: this.globalSignals.plotHeightOut.name,
                            plotWidthOut: this.globalSignals.plotWidthOut.name,
                            colTitleScaleName: 'scale_facet_col_title',
                            rowTitleScaleName: 'scale_facet_row_title',
                            colSeqName: 'data_FacetCellColTitles',
                            rowSeqName: 'data_FacetCellRowTitles'
                        })
                        :
                            {
                                main: [{
                                        scope: groupMark,
                                        lines: true,
                                        labels: true,
                                        title: true
                                    }]
                            };
                    addGlobalAxes({
                        globalScope,
                        allGlobalScales,
                        axisScales: this.props.axisScales,
                        plotOffsetSignals: { x: this.globalSignals.plotOffsetLeft, y: this.globalSignals.plotOffsetBottom },
                        axesOffsets: { x: axesOffsetX, y: axesOffsetY },
                        axesTitlePadding: facetLayout ? { x: axesTitlePaddingFacetX, y: axesTitlePaddingFacetY } : { x: axesTitlePaddingX, y: axesTitlePaddingY },
                        labelBaseline: { x: 'top', y: 'middle' },
                        specColumns,
                        specViewOptions,
                        axesScopes
                    });
                }
                //add mark to the final scope
                if (finalScope.mark) {
                    const { update } = finalScope.mark.encode;
                    const outputDataName = 'output';
                    finalScope.mark.from.data = outputDataName;
                    addData(globalScope.markGroup, {
                        name: outputDataName,
                        source: globalScope.markDataName,
                        transform: [
                            {
                                type: 'formula',
                                expr: finalScope.offsets.x,
                                as: FieldNames.OffsetX
                            },
                            {
                                type: 'formula',
                                expr: finalScope.offsets.y,
                                as: FieldNames.OffsetY
                            }
                        ]
                    });
                    update.x = {
                        field: FieldNames.OffsetX
                    };
                    update.y = {
                        field: FieldNames.OffsetY
                    };
                    allEncodingRules.forEach(map => {
                        for (let key in map) {
                            if (update[key]) {
                                let arrIn = map[key];
                                if (!Array.isArray(update[key])) {
                                    let value = update[key];
                                    let arrOut = [];
                                    update[key] = arrOut;
                                    arrIn.forEach(rule => arrOut.push(rule));
                                    arrOut.push(value);
                                }
                                else {
                                    let arrOut = update[key];
                                    arrIn.forEach(rule => arrOut.unshift(rule));
                                }
                            }
                        }
                    });
                    update.fill = fill(specContext, topColorField, ScaleNames.Color);
                    update.opacity = opacity();
                }
                return {
                    specCapabilities,
                    vegaSpec
                };
            }
        }
        initSpec(dataName) {
            const { globalSignals } = this;
            const { minCellWidth, minCellHeight, plotOffsetLeft, plotOffsetBottom, plotOffsetTop, plotOffsetRight, plotHeightOut, plotWidthOut } = globalSignals;
            const { specContext } = this.props;
            const { insight } = specContext;
            const groupMark = {
                type: 'group',
                //style: 'cell',
                encode: {
                    update: {
                        x: { signal: SignalNames.PlotOffsetLeft },
                        y: { signal: SignalNames.PlotOffsetTop },
                        height: { signal: SignalNames.PlotHeightOut },
                        width: { signal: SignalNames.PlotWidthOut }
                    }
                }
            };
            const inputDataname = 'input';
            const vegaSpec = {
                $schema: 'https://vega.github.io/schema/vega/v5.json',
                //style: 'cell',
                data: [{ name: inputDataname }, { name: dataName, source: inputDataname, transform: [] }],
                marks: [groupMark],
                signals: textSignals(specContext, SignalNames.ViewportHeight).concat([
                    minCellWidth,
                    minCellHeight,
                    {
                        name: SignalNames.ViewportHeight,
                        update: `max(${SignalNames.MinCellHeight}, ${insight.size.height})`
                    },
                    {
                        name: SignalNames.ViewportWidth,
                        update: `max(${SignalNames.MinCellWidth}, ${insight.size.width})`
                    },
                    plotOffsetLeft,
                    plotOffsetTop,
                    plotOffsetBottom,
                    plotOffsetRight,
                    {
                        name: SignalNames.PlotHeightIn,
                        update: `${SignalNames.ViewportHeight} - ${SignalNames.PlotOffsetBottom}`
                    },
                    {
                        name: SignalNames.PlotWidthIn,
                        update: `${SignalNames.ViewportWidth} - ${SignalNames.PlotOffsetLeft} - ${SignalNames.PlotOffsetRight}`
                    },
                    plotHeightOut,
                    plotWidthOut,
                    {
                        name: 'height',
                        update: `${SignalNames.PlotOffsetTop} + ${SignalNames.PlotHeightOut} + ${SignalNames.PlotOffsetBottom}`
                    },
                    {
                        name: 'width',
                        update: `${SignalNames.PlotWidthOut} + ${SignalNames.PlotOffsetLeft} + ${SignalNames.PlotOffsetRight}`
                    }
                ])
            };
            return { vegaSpec, groupMark };
        }
        iterateLayouts(globalScope, onLayoutBuild) {
            let specResult;
            let parentScope = {
                sizeSignals: globalScope.sizeSignals,
                offsets: globalScope.offsets
            };
            let firstScope;
            let childScope;
            const groupings = [];
            let { layouts, specCapabilities } = this.props;
            const allGlobalScales = [];
            const allEncodingRules = [];
            for (let i = 0; i < layouts.length; i++) {
                if (!parentScope)
                    continue;
                let buildProps = {
                    globalScope,
                    parentScope,
                    axesScales: this.props.axisScales,
                    groupings,
                    id: i
                };
                let layout = this.createLayout(layouts[i], buildProps);
                try {
                    childScope = layout.build();
                    childScope.id = i;
                    let groupby = layout.getGrouping();
                    if (groupby) {
                        groupings.push({
                            id: i,
                            groupby,
                            fieldOps: [
                                { field: null, op: 'count', as: FieldNames.Count }
                            ]
                        });
                    }
                    let sumOp = layout.getAggregateSumOp();
                    if (sumOp) {
                        groupings[groupings.length - 1].fieldOps.push(sumOp);
                    }
                    onLayoutBuild(i, childScope);
                }
                catch (e) {
                    specResult = {
                        errors: [e.stack],
                        specCapabilities,
                        vegaSpec: null
                    };
                    break;
                }
                if (childScope && childScope.globalScales) {
                    allGlobalScales.push(childScope.globalScales);
                }
                if (childScope.encodingRuleMap) {
                    allEncodingRules.push(childScope.encodingRuleMap);
                }
                if (i === 0) {
                    firstScope = childScope;
                }
                parentScope = childScope;
            }
            return { firstScope, finalScope: parentScope, specResult, allGlobalScales, allEncodingRules };
        }
        createLayout(layoutPair, buildProps) {
            const { layoutClass, props } = layoutPair;
            const layoutBuildProps = Object.assign(Object.assign({}, props), buildProps);
            const layout = new layoutClass(layoutBuildProps);
            layout.id = buildProps.id;
            return layout;
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const map = {
        barchart: barchartV,
        barchartH,
        barchartV,
        density,
        grid,
        scatterplot,
        stacks,
        strips,
        treemap
    };
    function getSpecBuilderForChart(specContext) {
        const { insight } = specContext;
        let props;
        const fn = map[insight.chart];
        if (fn) {
            props = fn(specContext);
            return new SpecBuilder(Object.assign(Object.assign({}, props), { specContext }));
        }
    }

    function define(constructor, factory, prototype) {
      constructor.prototype = factory.prototype = prototype;
      prototype.constructor = constructor;
    }

    function extend(parent, definition) {
      var prototype = Object.create(parent.prototype);
      for (var key in definition) prototype[key] = definition[key];
      return prototype;
    }

    function Color() {}

    var darker = 0.7;
    var brighter = 1 / darker;

    var reI = "\\s*([+-]?\\d+)\\s*",
        reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        reHex = /^#([0-9a-f]{3,8})$/,
        reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
        reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
        reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
        reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
        reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
        reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

    var named = {
      aliceblue: 0xf0f8ff,
      antiquewhite: 0xfaebd7,
      aqua: 0x00ffff,
      aquamarine: 0x7fffd4,
      azure: 0xf0ffff,
      beige: 0xf5f5dc,
      bisque: 0xffe4c4,
      black: 0x000000,
      blanchedalmond: 0xffebcd,
      blue: 0x0000ff,
      blueviolet: 0x8a2be2,
      brown: 0xa52a2a,
      burlywood: 0xdeb887,
      cadetblue: 0x5f9ea0,
      chartreuse: 0x7fff00,
      chocolate: 0xd2691e,
      coral: 0xff7f50,
      cornflowerblue: 0x6495ed,
      cornsilk: 0xfff8dc,
      crimson: 0xdc143c,
      cyan: 0x00ffff,
      darkblue: 0x00008b,
      darkcyan: 0x008b8b,
      darkgoldenrod: 0xb8860b,
      darkgray: 0xa9a9a9,
      darkgreen: 0x006400,
      darkgrey: 0xa9a9a9,
      darkkhaki: 0xbdb76b,
      darkmagenta: 0x8b008b,
      darkolivegreen: 0x556b2f,
      darkorange: 0xff8c00,
      darkorchid: 0x9932cc,
      darkred: 0x8b0000,
      darksalmon: 0xe9967a,
      darkseagreen: 0x8fbc8f,
      darkslateblue: 0x483d8b,
      darkslategray: 0x2f4f4f,
      darkslategrey: 0x2f4f4f,
      darkturquoise: 0x00ced1,
      darkviolet: 0x9400d3,
      deeppink: 0xff1493,
      deepskyblue: 0x00bfff,
      dimgray: 0x696969,
      dimgrey: 0x696969,
      dodgerblue: 0x1e90ff,
      firebrick: 0xb22222,
      floralwhite: 0xfffaf0,
      forestgreen: 0x228b22,
      fuchsia: 0xff00ff,
      gainsboro: 0xdcdcdc,
      ghostwhite: 0xf8f8ff,
      gold: 0xffd700,
      goldenrod: 0xdaa520,
      gray: 0x808080,
      green: 0x008000,
      greenyellow: 0xadff2f,
      grey: 0x808080,
      honeydew: 0xf0fff0,
      hotpink: 0xff69b4,
      indianred: 0xcd5c5c,
      indigo: 0x4b0082,
      ivory: 0xfffff0,
      khaki: 0xf0e68c,
      lavender: 0xe6e6fa,
      lavenderblush: 0xfff0f5,
      lawngreen: 0x7cfc00,
      lemonchiffon: 0xfffacd,
      lightblue: 0xadd8e6,
      lightcoral: 0xf08080,
      lightcyan: 0xe0ffff,
      lightgoldenrodyellow: 0xfafad2,
      lightgray: 0xd3d3d3,
      lightgreen: 0x90ee90,
      lightgrey: 0xd3d3d3,
      lightpink: 0xffb6c1,
      lightsalmon: 0xffa07a,
      lightseagreen: 0x20b2aa,
      lightskyblue: 0x87cefa,
      lightslategray: 0x778899,
      lightslategrey: 0x778899,
      lightsteelblue: 0xb0c4de,
      lightyellow: 0xffffe0,
      lime: 0x00ff00,
      limegreen: 0x32cd32,
      linen: 0xfaf0e6,
      magenta: 0xff00ff,
      maroon: 0x800000,
      mediumaquamarine: 0x66cdaa,
      mediumblue: 0x0000cd,
      mediumorchid: 0xba55d3,
      mediumpurple: 0x9370db,
      mediumseagreen: 0x3cb371,
      mediumslateblue: 0x7b68ee,
      mediumspringgreen: 0x00fa9a,
      mediumturquoise: 0x48d1cc,
      mediumvioletred: 0xc71585,
      midnightblue: 0x191970,
      mintcream: 0xf5fffa,
      mistyrose: 0xffe4e1,
      moccasin: 0xffe4b5,
      navajowhite: 0xffdead,
      navy: 0x000080,
      oldlace: 0xfdf5e6,
      olive: 0x808000,
      olivedrab: 0x6b8e23,
      orange: 0xffa500,
      orangered: 0xff4500,
      orchid: 0xda70d6,
      palegoldenrod: 0xeee8aa,
      palegreen: 0x98fb98,
      paleturquoise: 0xafeeee,
      palevioletred: 0xdb7093,
      papayawhip: 0xffefd5,
      peachpuff: 0xffdab9,
      peru: 0xcd853f,
      pink: 0xffc0cb,
      plum: 0xdda0dd,
      powderblue: 0xb0e0e6,
      purple: 0x800080,
      rebeccapurple: 0x663399,
      red: 0xff0000,
      rosybrown: 0xbc8f8f,
      royalblue: 0x4169e1,
      saddlebrown: 0x8b4513,
      salmon: 0xfa8072,
      sandybrown: 0xf4a460,
      seagreen: 0x2e8b57,
      seashell: 0xfff5ee,
      sienna: 0xa0522d,
      silver: 0xc0c0c0,
      skyblue: 0x87ceeb,
      slateblue: 0x6a5acd,
      slategray: 0x708090,
      slategrey: 0x708090,
      snow: 0xfffafa,
      springgreen: 0x00ff7f,
      steelblue: 0x4682b4,
      tan: 0xd2b48c,
      teal: 0x008080,
      thistle: 0xd8bfd8,
      tomato: 0xff6347,
      turquoise: 0x40e0d0,
      violet: 0xee82ee,
      wheat: 0xf5deb3,
      white: 0xffffff,
      whitesmoke: 0xf5f5f5,
      yellow: 0xffff00,
      yellowgreen: 0x9acd32
    };

    define(Color, color, {
      copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
      },
      displayable: function() {
        return this.rgb().displayable();
      },
      hex: color_formatHex, // Deprecated! Use color.formatHex.
      formatHex: color_formatHex,
      formatHsl: color_formatHsl,
      formatRgb: color_formatRgb,
      toString: color_formatRgb
    });

    function color_formatHex() {
      return this.rgb().formatHex();
    }

    function color_formatHsl() {
      return hslConvert(this).formatHsl();
    }

    function color_formatRgb() {
      return this.rgb().formatRgb();
    }

    function color(format) {
      var m, l;
      format = (format + "").trim().toLowerCase();
      return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
          : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
          : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
          : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
          : null) // invalid hex
          : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
          : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
          : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
          : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
          : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
          : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
          : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
          : null;
    }

    function rgbn(n) {
      return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
    }

    function rgba(r, g, b, a) {
      if (a <= 0) r = g = b = NaN;
      return new Rgb(r, g, b, a);
    }

    function rgbConvert(o) {
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Rgb;
      o = o.rgb();
      return new Rgb(o.r, o.g, o.b, o.opacity);
    }

    function rgb(r, g, b, opacity) {
      return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
    }

    function Rgb(r, g, b, opacity) {
      this.r = +r;
      this.g = +g;
      this.b = +b;
      this.opacity = +opacity;
    }

    define(Rgb, rgb, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb: function() {
        return this;
      },
      displayable: function() {
        return (-0.5 <= this.r && this.r < 255.5)
            && (-0.5 <= this.g && this.g < 255.5)
            && (-0.5 <= this.b && this.b < 255.5)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex, // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb
    }));

    function rgb_formatHex() {
      return "#" + hex(this.r) + hex(this.g) + hex(this.b);
    }

    function rgb_formatRgb() {
      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "rgb(" : "rgba(")
          + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.b) || 0))
          + (a === 1 ? ")" : ", " + a + ")");
    }

    function hex(value) {
      value = Math.max(0, Math.min(255, Math.round(value) || 0));
      return (value < 16 ? "0" : "") + value.toString(16);
    }

    function hsla(h, s, l, a) {
      if (a <= 0) h = s = l = NaN;
      else if (l <= 0 || l >= 1) h = s = NaN;
      else if (s <= 0) h = NaN;
      return new Hsl(h, s, l, a);
    }

    function hslConvert(o) {
      if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Hsl;
      if (o instanceof Hsl) return o;
      o = o.rgb();
      var r = o.r / 255,
          g = o.g / 255,
          b = o.b / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          h = NaN,
          s = max - min,
          l = (max + min) / 2;
      if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
      } else {
        s = l > 0 && l < 1 ? 0 : h;
      }
      return new Hsl(h, s, l, o.opacity);
    }

    function hsl(h, s, l, opacity) {
      return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
    }

    function Hsl(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }

    define(Hsl, hsl, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360,
            s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
            l = this.l,
            m2 = l + (l < 0.5 ? l : 1 - l) * s,
            m1 = 2 * l - m2;
        return new Rgb(
          hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb(h, m1, m2),
          hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s))
            && (0 <= this.l && this.l <= 1)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      formatHsl: function() {
        var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "hsl(" : "hsla(")
            + (this.h || 0) + ", "
            + (this.s || 0) * 100 + "%, "
            + (this.l || 0) * 100 + "%"
            + (a === 1 ? ")" : ", " + a + ")");
      }
    }));

    /* From FvD 13.37, CSS Color Module Level 3 */
    function hsl2rgb(h, m1, m2) {
      return (h < 60 ? m1 + (m2 - m1) * h / 60
          : h < 180 ? m2
          : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
          : m1) * 255;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function isColor(cssColorSpecifier) {
        return !!color(cssColorSpecifier);
    }
    function isQuantitative(column) {
        return column.type === 'number' || column.type === 'integer';
    }
    /**
     * Derive column metadata from the data array.
     * @param data Array of data objects.
     */
    function getColumnsFromData(inferTypesFn, data, columnTypes) {
        const sample = data[0];
        const fields = sample ? Object.keys(sample) : [];
        const inferences = Object.assign(Object.assign({}, inferTypesFn(data, fields)), columnTypes);
        const columns = fields.map(name => {
            const column = {
                name,
                type: inferences[name]
            };
            return column;
        });
        inferAll(columns, data);
        return columns;
    }
    /**
     * Get columns associated with each Insight role.
     * @param insight Insight to specify column roles.
     * @param columns Array of Columns inferred from the data.
     */
    function getSpecColumns(insight, columns) {
        function getColumnByName(name) {
            return columns.filter(c => c.name === name)[0];
        }
        return {
            color: getColumnByName(insight.columns && insight.columns.color),
            facet: getColumnByName(insight.columns && insight.columns.facet),
            facetV: getColumnByName(insight.columns && insight.columns.facetV),
            group: getColumnByName(insight.columns && insight.columns.group),
            size: getColumnByName(insight.columns && insight.columns.size),
            sort: getColumnByName(insight.columns && insight.columns.sort),
            uid: getColumnByName(insight.columns && insight.columns.uid),
            x: getColumnByName(insight.columns && insight.columns.x),
            y: getColumnByName(insight.columns && insight.columns.y),
            z: getColumnByName(insight.columns && insight.columns.z)
        };
    }
    /**
     * Populate columns with type inferences and stats.
     * @param columns Array of columns.
     * @param data Array of data objects.
     */
    function inferAll(columns, data) {
        columns.forEach(column => {
            if (column) {
                if (typeof column.quantitative !== 'boolean') {
                    column.quantitative = isQuantitative(column);
                }
                if (!column.stats) {
                    column.stats = getStats(data, column);
                }
                if (column.type === 'string' && typeof column.isColorData !== 'boolean') {
                    checkIsColorData(data, column);
                }
            }
        });
    }
    function checkIsColorData(data, column) {
        if (!column.stats.hasColorData) {
            column.isColorData = false;
            return;
        }
        for (let i = 0; i < data.length; i++) {
            if (!isColor(data[i][column.name])) {
                column.isColorData = false;
                return;
            }
        }
        column.isColorData = true;
    }
    function getStats(data, column) {
        const distinctMap = {};
        const stats = {
            distinctValueCount: null,
            max: null,
            mean: null,
            min: null
        };
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            let value = row[column.name];
            distinctMap[value] = true;
            if (stats.max === null || value > stats.max) {
                stats.max = value;
            }
            if (stats.min === null || value < stats.min) {
                stats.min = value;
            }
            let num = +value;
            if (!isNaN(num)) {
                sum += num;
            }
            if (column.type === 'string' && !stats.hasColorData && isColor(value)) {
                stats.hasColorData = true;
            }
        }
        if (column.quantitative) {
            stats.mean = data.length > 0 && (sum / data.length);
            stats.hasNegative = detectNegative(column, data);
            if (column.type === 'integer') {
                stats.isSequential = detectSequentialColumn(column, data);
            }
        }
        stats.distinctValueCount = Object.keys(distinctMap).length;
        return stats;
    }
    function detectNegative(column, data) {
        for (let i = 1; i < data.length; i++) {
            if (data[i][column.name] < 0)
                return true;
        }
        return false;
    }
    function detectSequentialColumn(column, data) {
        if (data.length < 2)
            return false;
        let colname = column.name;
        for (let i = 1; i < data.length; i++) {
            if (data[i][colname] !== data[i - 1][colname] + 1)
                return false;
        }
        return true;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function build(context, currData) {
        const { specColumns } = context;
        const columns = [
            specColumns.color,
            specColumns.facet,
            specColumns.facetV,
            specColumns.group,
            specColumns.size,
            specColumns.sort,
            specColumns.x,
            specColumns.y,
            specColumns.z
        ];
        inferAll(columns, currData);
        const specBuilder = getSpecBuilderForChart(context);
        let specResult;
        if (specBuilder) {
            try {
                specResult = specBuilder.build();
            }
            catch (e) {
                specResult = {
                    specCapabilities: null,
                    vegaSpec: null,
                    errors: [e.stack]
                };
            }
            if (!specResult.errors) {
                const data0 = specResult.vegaSpec.data[0];
                data0.values = currData;
            }
        }
        else {
            specResult = {
                specCapabilities: null,
                vegaSpec: null,
                errors: [`could not build spec for ${context.insight.chart}`]
            };
        }
        return specResult;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        build: build,
        FieldNames: FieldNames,
        ScaleNames: ScaleNames,
        SignalNames: SignalNames,
        Other: Other,
        ColorScaleNone: ColorScaleNone,
        getColumnsFromData: getColumnsFromData,
        getSpecColumns: getSpecColumns,
        inferAll: inferAll,
        getStats: getStats
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const GL_ORDINAL = 'GL_ORDINAL';

    var constants = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GL_ORDINAL: GL_ORDINAL,
        ColorScaleNone: ColorScaleNone,
        FieldNames: FieldNames,
        ScaleNames: ScaleNames,
        SignalNames: SignalNames
    });

    function isSearchExpressionGroup(search) {
        if (!search) {
            return false;
        }
        return !!search.expressions;
    }
    function createGroupFromExpression(input) {
        const output = {
            expressions: [input]
        };
        return output;
    }
    function ensureSearchExpressionGroupArray(search) {
        if (Array.isArray(search)) {
            return [...search];
        }
        else if (isSearchExpressionGroup(search)) {
            return [search];
        }
        else {
            return [createGroupFromExpression(search)];
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const expressionKeys = Object.keys({
        clause: null,
        name: null,
        operator: null,
        value: null
    });
    function compareExpression(a, b) {
        if (a && b) {
            for (let k = 0; k < expressionKeys.length; k++) {
                let key = expressionKeys[k];
                if (a[key] != b[key])
                    return false;
            }
        }
        else {
            return !a && !b;
        }
        return true;
    }
    const groupKeys = Object.keys({
        clause: null
    });
    function compareGroup(a, b) {
        for (let k = 0; k < groupKeys.length; k++) {
            let key = groupKeys[k];
            if (a[key] != b[key])
                return false;
        }
        if (!a.expressions && !b.expressions)
            return true;
        if (!a.expressions || !b.expressions)
            return false;
        if (a.expressions.length != b.expressions.length)
            return false;
        for (let i = 0; i < a.expressions.length; i++) {
            if (!compareExpression(a.expressions[i], b.expressions[i]))
                return false;
        }
        return true;
    }
    function compare(a, b) {
        if (a == b)
            return true;
        if (!a || !b)
            return false;
        let arrs = [a, b].map(ensureSearchExpressionGroupArray);
        let [arrA, arrB] = arrs;
        if (arrA.length != arrB.length)
            return false;
        for (let i = 0; i < arrA.length; i++) {
            if (!compareGroup(arrA[i], arrB[i]))
                return false;
        }
        return true;
    }
    function startsWith(whole, part) {
        if (!part)
            return true;
        let arrs = [whole, part].map(ensureSearchExpressionGroupArray);
        let [wholeArray, partArray] = arrs;
        if (partArray.length > wholeArray.length)
            return false;
        for (let i = 0; i < partArray.length; i++) {
            if (!compareGroup(wholeArray[i], partArray[i]))
                return false;
        }
        return true;
    }

    function valueToBoolean(value) {
        if (typeof value === 'string') {
            switch (value.toLowerCase()) {
                case 'true':
                    return true;
                case 'false':
                    return false;
            }
        }
        return !!value;
    }
    function valueToString(value) {
        if (value == null) {
            return '';
        }
        switch (typeof value) {
            case 'string':
                return value;
            case 'boolean':
            case 'number':
                return value.toString();
        }
        return '';
    }
    function isStringOperation(ex) {
        switch (ex.operator) {
            case 'contains':
            case '!contains':
            case 'starts':
            case '!starts':
                return true;
        }
        return false;
    }
    function isnullorEmpty(value) {
        if (value == null)
            return true; //double equal sign to also catch undefined
        if (typeof value === 'string' && value.length === 0)
            return true;
        return false;
    }
    class Exec {
        constructor(search, columns) {
            this.columns = columns;
            this.groups = ensureSearchExpressionGroupArray(search).map(g => {
                const expressions = g.expressions.filter(Boolean);
                expressions.forEach(ex => {
                    ex.column = this.getColumn(ex.name);
                    ex.valueBool = valueToBoolean(ex.value);
                    ex.valueLow = valueToString(ex.value).toLocaleLowerCase();
                    ex.stringOperation = isStringOperation(ex);
                });
                const group = Object.assign(Object.assign({}, g), { expressions });
                return group;
            });
        }
        getColumn(name) {
            for (let i = 0; i < this.columns.length; i++) {
                if (this.columns[i].name == name) {
                    return this.columns[i];
                }
            }
        }
        runExpressionOnColumn(datum, ex) {
            const actualDataValue = datum[ex.name];
            if (ex.operator === 'isnullorEmpty') {
                return isnullorEmpty(actualDataValue);
            }
            else if (ex.operator === '!isnullorEmpty') {
                return !isnullorEmpty(actualDataValue);
            }
            let dataValue = actualDataValue;
            let expressionValue = ex.value;
            if (ex.column) {
                if (ex.column.type === 'string' || ex.stringOperation) {
                    dataValue = valueToString(actualDataValue).toLocaleLowerCase();
                    expressionValue = ex.valueLow;
                }
                else if (ex.column.type === 'boolean') {
                    dataValue = valueToBoolean(actualDataValue);
                    expressionValue = ex.valueBool;
                }
                else if (ex.column.quantitative) {
                    dataValue = +actualDataValue;
                    expressionValue = +ex.value;
                }
            }
            switch (ex.operator) {
                case '!=':
                    return dataValue != expressionValue;
                case '<':
                    return dataValue < expressionValue;
                case '<=':
                    return dataValue <= expressionValue;
                case '==':
                    return dataValue == expressionValue;
                case '>':
                    return dataValue > expressionValue;
                case '>=':
                    return dataValue >= expressionValue;
                case 'contains':
                    return dataValue.indexOf(expressionValue) >= 0;
                case '!contains':
                    return dataValue.indexOf(expressionValue) < 0;
                case 'starts':
                    return dataValue.indexOf(expressionValue) == 0;
                case '!starts':
                    return dataValue.indexOf(expressionValue) !== 0;
            }
        }
        runExpression(datum, ex) {
            if (ex.name == null) {
                //run on all columns
                const group = {
                    expressions: this.columns.map((column, i) => {
                        const ex2 = Object.assign(Object.assign({}, ex), { column, name: column.name });
                        if (i) {
                            ex2.clause = '||';
                        }
                        return ex2;
                    })
                };
                return this.runGroup(datum, group);
            }
            else {
                return this.runExpressionOnColumn(datum, ex);
            }
        }
        runGroup(datum, group) {
            let accumulator = this.runExpression(datum, group.expressions[0]);
            for (let i = 1; i < group.expressions.length; i++) {
                let ex = group.expressions[i];
                switch (ex.clause) {
                    case '&&':
                        accumulator = accumulator && this.runExpression(datum, ex);
                        break;
                    case '||':
                        accumulator = accumulator || this.runExpression(datum, ex);
                        break;
                }
            }
            return accumulator;
        }
        run(datum) {
            let accumulator = this.runGroup(datum, this.groups[0]);
            for (let i = 1; i < this.groups.length; i++) {
                let group = this.groups[i];
                switch (group.clause) {
                    case '&&':
                        accumulator = accumulator && this.runGroup(datum, group);
                        break;
                    case '||':
                        accumulator = accumulator || this.runGroup(datum, group);
                        break;
                }
            }
            return accumulator;
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function invertSearchExpressionGroup(input) {
        //this only works if all expressions in this group have the same clause
        const output = {
            expressions: input.expressions.map(invertSearchExpression)
        };
        if (input.clause) {
            output.clause = invertedClauses[input.clause];
        }
        return output;
    }
    const invertedOperators = {
        '!=': '==',
        '==': '!=',
        '<': '>=',
        '>=': '<',
        '<=': '>',
        '>': '<=',
        '!contains': 'contains',
        'contains': '!contains',
        '!isnullorEmpty': 'isnullorEmpty',
        'isnullorEmpty': '!isnullorEmpty',
        '!starts': 'starts',
        'starts': '!starts'
    };
    const invertedClauses = {
        '&&': '||',
        '||': '&&'
    };
    function invertSearchExpression(input) {
        const operator = invertedOperators[input.operator];
        const output = Object.assign(Object.assign({}, input), { operator });
        if (input.clause) {
            output.clause = invertedClauses[input.clause];
        }
        return output;
    }
    function invert(search) {
        if (Array.isArray(search)) {
            return search.map(invertSearchExpressionGroup);
        }
        else if (isSearchExpressionGroup(search)) {
            return invertSearchExpressionGroup(search);
        }
        else {
            return invertSearchExpression(search);
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function narrow(a, b) {
        if (!a) {
            return b;
        }
        let arrs = [a, b].map(ensureSearchExpressionGroupArray);
        let [arrA, arrB] = arrs;
        arrB[0].clause = '&&';
        return arrA.concat(arrB);
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.

    var index$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        compareExpression: compareExpression,
        compareGroup: compareGroup,
        compare: compare,
        startsWith: startsWith,
        Exec: Exec,
        isSearchExpressionGroup: isSearchExpressionGroup,
        createGroupFromExpression: createGroupFromExpression,
        ensureSearchExpressionGroupArray: ensureSearchExpressionGroupArray,
        invert: invert,
        narrow: narrow
    });



    var types = /*#__PURE__*/Object.freeze({
        __proto__: null
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    const layerNames = {
        cubes: 'LAYER_CUBES',
        lines: 'LAYER_LINES',
        text: 'LAYER_TEXT'
    };

    var constants$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        layerNames: layerNames
    });

    var htmlTags = [
    	"a",
    	"abbr",
    	"address",
    	"area",
    	"article",
    	"aside",
    	"audio",
    	"b",
    	"base",
    	"bdi",
    	"bdo",
    	"blockquote",
    	"body",
    	"br",
    	"button",
    	"canvas",
    	"caption",
    	"cite",
    	"code",
    	"col",
    	"colgroup",
    	"data",
    	"datalist",
    	"dd",
    	"del",
    	"details",
    	"dfn",
    	"dialog",
    	"div",
    	"dl",
    	"dt",
    	"em",
    	"embed",
    	"fieldset",
    	"figcaption",
    	"figure",
    	"footer",
    	"form",
    	"h1",
    	"h2",
    	"h3",
    	"h4",
    	"h5",
    	"h6",
    	"head",
    	"header",
    	"hgroup",
    	"hr",
    	"html",
    	"i",
    	"iframe",
    	"img",
    	"input",
    	"ins",
    	"kbd",
    	"keygen",
    	"label",
    	"legend",
    	"li",
    	"link",
    	"main",
    	"map",
    	"mark",
    	"math",
    	"menu",
    	"menuitem",
    	"meta",
    	"meter",
    	"nav",
    	"noscript",
    	"object",
    	"ol",
    	"optgroup",
    	"option",
    	"output",
    	"p",
    	"param",
    	"picture",
    	"pre",
    	"progress",
    	"q",
    	"rb",
    	"rp",
    	"rt",
    	"rtc",
    	"ruby",
    	"s",
    	"samp",
    	"script",
    	"section",
    	"select",
    	"slot",
    	"small",
    	"source",
    	"span",
    	"strong",
    	"style",
    	"sub",
    	"summary",
    	"sup",
    	"svg",
    	"table",
    	"tbody",
    	"td",
    	"template",
    	"textarea",
    	"tfoot",
    	"th",
    	"thead",
    	"time",
    	"title",
    	"tr",
    	"track",
    	"u",
    	"ul",
    	"var",
    	"video",
    	"wbr"
    ];

    var htmlTags$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': htmlTags
    });

    function getCjsExportFromNamespace (n) {
    	return n && n['default'] || n;
    }

    var require$$0 = getCjsExportFromNamespace(htmlTags$1);

    var htmlTags$2 = require$$0;

    var svgTags = [
    	"a",
    	"altGlyph",
    	"altGlyphDef",
    	"altGlyphItem",
    	"animate",
    	"animateColor",
    	"animateMotion",
    	"animateTransform",
    	"circle",
    	"clipPath",
    	"color-profile",
    	"cursor",
    	"defs",
    	"desc",
    	"ellipse",
    	"feBlend",
    	"feColorMatrix",
    	"feComponentTransfer",
    	"feComposite",
    	"feConvolveMatrix",
    	"feDiffuseLighting",
    	"feDisplacementMap",
    	"feDistantLight",
    	"feFlood",
    	"feFuncA",
    	"feFuncB",
    	"feFuncG",
    	"feFuncR",
    	"feGaussianBlur",
    	"feImage",
    	"feMerge",
    	"feMergeNode",
    	"feMorphology",
    	"feOffset",
    	"fePointLight",
    	"feSpecularLighting",
    	"feSpotLight",
    	"feTile",
    	"feTurbulence",
    	"filter",
    	"font",
    	"font-face",
    	"font-face-format",
    	"font-face-name",
    	"font-face-src",
    	"font-face-uri",
    	"foreignObject",
    	"g",
    	"glyph",
    	"glyphRef",
    	"hkern",
    	"image",
    	"line",
    	"linearGradient",
    	"marker",
    	"mask",
    	"metadata",
    	"missing-glyph",
    	"mpath",
    	"path",
    	"pattern",
    	"polygon",
    	"polyline",
    	"radialGradient",
    	"rect",
    	"script",
    	"set",
    	"stop",
    	"style",
    	"svg",
    	"switch",
    	"symbol",
    	"text",
    	"textPath",
    	"title",
    	"tref",
    	"tspan",
    	"use",
    	"view",
    	"vkern"
    ];

    var svgTags$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': svgTags
    });

    var require$$0$1 = getCjsExportFromNamespace(svgTags$1);

    var lib = require$$0$1;

    /**
     * Decamelizes a string with/without a custom separator (hyphen by default).
     * from: https://ourcodeworld.com/articles/read/608/how-to-camelize-and-decamelize-strings-in-javascript
     *
     * @param str String in camelcase
     * @param separator Separator for the new decamelized string.
     */
    function decamelize(str, separator = '-') {
        return str
            .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
            .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
            .toLowerCase();
    }
    function createElement(tag, attrs, ...children) {
        if (typeof tag === 'function') {
            const fn = tag;
            const props = attrs;
            props.children = children;
            return fn(props);
        }
        else {
            const ns = tagNamespace(tag);
            const el = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
            const map = attrs;
            let ref;
            for (let name in map) {
                if (name && map.hasOwnProperty(name)) {
                    let value = map[name];
                    if (name === 'className' && value !== void 0) {
                        setAttribute(el, ns, 'class', value.toString());
                    }
                    else if (name === 'disabled' && !value) ;
                    else if (value === null || value === undefined) {
                        continue;
                    }
                    else if (value === true) {
                        setAttribute(el, ns, name, name);
                    }
                    else if (typeof value === 'function') {
                        if (name === 'ref') {
                            ref = value;
                        }
                        else {
                            el[name.toLowerCase()] = value;
                        }
                    }
                    else if (typeof value === 'object') {
                        setAttribute(el, ns, name, flatten(value));
                    }
                    else {
                        setAttribute(el, ns, name, value.toString());
                    }
                }
            }
            if (children && children.length > 0) {
                appendChildren(el, children);
            }
            if (ref) {
                ref(el);
            }
            return el;
        }
    }
    function setAttribute(el, ns, name, value) {
        if (ns) {
            el.setAttributeNS(null, name, value);
        }
        else {
            el.setAttribute(name, value);
        }
    }
    function flatten(o) {
        const arr = [];
        for (let prop in o)
            arr.push(`${decamelize(prop, '-')}:${o[prop]}`);
        return arr.join(';');
    }
    function addChild(parentElement, child) {
        if (child === null || child === undefined || typeof child === "boolean") {
            return;
        }
        else if (Array.isArray(child)) {
            appendChildren(parentElement, child);
        }
        else if (isElement(child)) {
            parentElement.appendChild(child);
        }
        else {
            parentElement.appendChild(document.createTextNode(child.toString()));
        }
    }
    function appendChildren(parentElement, children) {
        children.forEach(child => addChild(parentElement, child));
    }
    function isElement(el) {
        //nodeType cannot be zero https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        return !!el.nodeType;
    }
    function mount(element, container) {
        container.innerHTML = '';
        if (element) {
            addChild(container, element);
        }
    }
    function findElementByChildPositions(childPositions, container) {
        let element = container || document.body;
        let childPosition;
        while (element && childPositions.length) {
            childPosition = childPositions.shift();
            element = element.children.item(childPosition);
        }
        if (element) {
            return element;
        }
    }
    function focusActiveElement(element, activeElementInfo) {
        element.focus();
        element.scrollTop = activeElementInfo.scrollTop;
        const input = element;
        if (input.setSelectionRange && activeElementInfo && activeElementInfo.selectionStart != null && activeElementInfo.selectionEnd != null) {
            input.setSelectionRange(activeElementInfo.selectionStart, activeElementInfo.selectionEnd, activeElementInfo.selectionDirection);
        }
    }
    function setActiveElement(activeElementInfo, container) {
        if (activeElementInfo) {
            const element = findElementByChildPositions(activeElementInfo.childPositions, container);
            if (element) {
                focusActiveElement(element, activeElementInfo);
            }
        }
    }
    function getActiveElementInfo(container) {
        let element = document.activeElement;
        const { scrollTop, selectionDirection, selectionEnd, selectionStart } = element;
        const activeElementInfo = {
            childPositions: [],
            scrollTop,
            selectionDirection,
            selectionEnd,
            selectionStart
        };
        while (element && element !== document.body && element !== container) {
            activeElementInfo.childPositions.unshift(getChildPosition(element));
            element = element.parentElement;
        }
        if ((element === document.body || element === container) && activeElementInfo.childPositions.length)
            return activeElementInfo;
    }
    function getChildPosition(element) {
        let childPosition = 0;
        while (element = element.previousElementSibling)
            childPosition++;
        return childPosition;
    }
    function tagNamespace(tag) {
        //issue: this won't disambiguate certain tags which exist in both svg and html: <a>, <title> ...
        if (tag === 'svg' || (lib.indexOf(tag) >= 0 && !(htmlTags$2.indexOf(tag) >= 0))) {
            return "http://www.w3.org/2000/svg";
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const KeyCodes = {
        ENTER: 13
    };
    const Table = (props) => {
        return (createElement("table", { className: props.className },
            props.children,
            props.rows.map((row, i) => (createElement("tr", { className: props.rowClassName || '', onClick: e => props.onRowClick && props.onRowClick(e, i), tabIndex: props.onRowClick ? 0 : -1, onKeyUp: e => {
                    if (e.keyCode === KeyCodes.ENTER && props.onRowClick) {
                        props.onRowClick(e, i);
                    }
                } }, row.cells.map((cell, i) => (createElement("td", { className: cell.className || '', title: cell.title || '' }, cell.content))))))));
    };

    // Copyright (c) Microsoft Corporation. All rights reserved.

    var controls = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Table: Table
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.

    var types$1 = /*#__PURE__*/Object.freeze({
        __proto__: null
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    function concat(...args) {
        return args.reduce((p, c) => c ? p.concat(c) : p, []);
    }
    /**
     * Returns array with items which are truthy.
     * @param args array or arrays to concat into a single array.
     */
    function allTruthy(...args) {
        return args.reduce((p, c) => c ? p.concat(c) : p, []).filter(Boolean);
    }
    /**
     * Add an array to an existing array in place.
     * @param arr Array to append to.
     * @param items Arrof of items to append.
     */
    function push(arr, items) {
        arr.push.apply(arr, items);
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    /**
     * Create a new element as a child of another element.
     * @param tagName Tag name of the new tag to create.
     * @param parentElement Reference of the element to append to.
     * @returns new HTMLElement.
     */
    function addEl(tagName, parentElement) {
        const el = document.createElement(tagName);
        parentElement.appendChild(el);
        return el;
    }
    /**
     * Create a new div HTMLElement as a child of another element.
     * @param parentElement Reference of the element to append to.
     * @param className Optional css class name to apply to the div.
     */
    function addDiv(parentElement, className) {
        const div = addEl('div', parentElement);
        if (className) {
            div.className = className;
        }
        return div;
    }
    /**
     * Measure the outer height and width of an HTMLElement, including margin, padding and border.
     * @param el HTML Element to measure.
     */
    function outerSize(el) {
        const cs = getComputedStyle(el);
        const height = parseFloat(cs.marginTop) + parseFloat(cs.paddingTop) + parseFloat(cs.borderTopWidth) + el.offsetHeight + parseFloat(cs.borderBottomWidth) + parseFloat(cs.paddingBottom) + parseFloat(cs.marginBottom);
        const width = parseFloat(cs.marginLeft) + parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth) + el.offsetWidth + parseFloat(cs.borderRightWidth) + parseFloat(cs.paddingRight) + parseFloat(cs.marginRight);
        return { height, width };
    }

    var isMergeableObject = function isMergeableObject(value) {
    	return isNonNullObject(value)
    		&& !isSpecial(value)
    };

    function isNonNullObject(value) {
    	return !!value && typeof value === 'object'
    }

    function isSpecial(value) {
    	var stringValue = Object.prototype.toString.call(value);

    	return stringValue === '[object RegExp]'
    		|| stringValue === '[object Date]'
    		|| isReactElement(value)
    }

    // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
    var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

    function isReactElement(value) {
    	return value.$$typeof === REACT_ELEMENT_TYPE
    }

    function emptyTarget(val) {
    	return Array.isArray(val) ? [] : {}
    }

    function cloneUnlessOtherwiseSpecified(value, options) {
    	return (options.clone !== false && options.isMergeableObject(value))
    		? deepmerge(emptyTarget(value), value, options)
    		: value
    }

    function defaultArrayMerge(target, source, options) {
    	return target.concat(source).map(function(element) {
    		return cloneUnlessOtherwiseSpecified(element, options)
    	})
    }

    function mergeObject(target, source, options) {
    	var destination = {};
    	if (options.isMergeableObject(target)) {
    		Object.keys(target).forEach(function(key) {
    			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    		});
    	}
    	Object.keys(source).forEach(function(key) {
    		if (!options.isMergeableObject(source[key]) || !target[key]) {
    			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    		} else {
    			destination[key] = deepmerge(target[key], source[key], options);
    		}
    	});
    	return destination
    }

    function deepmerge(target, source, options) {
    	options = options || {};
    	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    	options.isMergeableObject = options.isMergeableObject || isMergeableObject;

    	var sourceIsArray = Array.isArray(source);
    	var targetIsArray = Array.isArray(target);
    	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    	if (!sourceAndTargetTypesMatch) {
    		return cloneUnlessOtherwiseSpecified(source, options)
    	} else if (sourceIsArray) {
    		return options.arrayMerge(target, source, options)
    	} else {
    		return mergeObject(target, source, options)
    	}
    }

    deepmerge.all = function deepmergeAll(array, options) {
    	if (!Array.isArray(array)) {
    		throw new Error('first argument should be an array')
    	}

    	return array.reduce(function(prev, next) {
    		return deepmerge(prev, next, options)
    	}, {})
    };

    var deepmerge_1 = deepmerge;

    var _deepmerge = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': deepmerge_1
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const deepmerge$1 = (deepmerge_1 || _deepmerge);
    function clone(objectToClone) {
        if (!objectToClone)
            return objectToClone;
        return deepmerge$1.all([objectToClone]);
    }
    const dontMerge = (destination, source) => source;
    function deepMerge(...objectsToMerge) {
        const objects = objectsToMerge.filter(Boolean);
        return deepmerge$1.all(objects, { arrayMerge: dontMerge });
    }

    function define$1(constructor, factory, prototype) {
      constructor.prototype = factory.prototype = prototype;
      prototype.constructor = constructor;
    }

    function extend$1(parent, definition) {
      var prototype = Object.create(parent.prototype);
      for (var key in definition) prototype[key] = definition[key];
      return prototype;
    }

    function Color$1() {}

    var darker$1 = 0.7;
    var brighter$1 = 1 / darker$1;

    var reI$1 = "\\s*([+-]?\\d+)\\s*",
        reN$1 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        reP$1 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        reHex$1 = /^#([0-9a-f]{3,8})$/,
        reRgbInteger$1 = new RegExp("^rgb\\(" + [reI$1, reI$1, reI$1] + "\\)$"),
        reRgbPercent$1 = new RegExp("^rgb\\(" + [reP$1, reP$1, reP$1] + "\\)$"),
        reRgbaInteger$1 = new RegExp("^rgba\\(" + [reI$1, reI$1, reI$1, reN$1] + "\\)$"),
        reRgbaPercent$1 = new RegExp("^rgba\\(" + [reP$1, reP$1, reP$1, reN$1] + "\\)$"),
        reHslPercent$1 = new RegExp("^hsl\\(" + [reN$1, reP$1, reP$1] + "\\)$"),
        reHslaPercent$1 = new RegExp("^hsla\\(" + [reN$1, reP$1, reP$1, reN$1] + "\\)$");

    var named$1 = {
      aliceblue: 0xf0f8ff,
      antiquewhite: 0xfaebd7,
      aqua: 0x00ffff,
      aquamarine: 0x7fffd4,
      azure: 0xf0ffff,
      beige: 0xf5f5dc,
      bisque: 0xffe4c4,
      black: 0x000000,
      blanchedalmond: 0xffebcd,
      blue: 0x0000ff,
      blueviolet: 0x8a2be2,
      brown: 0xa52a2a,
      burlywood: 0xdeb887,
      cadetblue: 0x5f9ea0,
      chartreuse: 0x7fff00,
      chocolate: 0xd2691e,
      coral: 0xff7f50,
      cornflowerblue: 0x6495ed,
      cornsilk: 0xfff8dc,
      crimson: 0xdc143c,
      cyan: 0x00ffff,
      darkblue: 0x00008b,
      darkcyan: 0x008b8b,
      darkgoldenrod: 0xb8860b,
      darkgray: 0xa9a9a9,
      darkgreen: 0x006400,
      darkgrey: 0xa9a9a9,
      darkkhaki: 0xbdb76b,
      darkmagenta: 0x8b008b,
      darkolivegreen: 0x556b2f,
      darkorange: 0xff8c00,
      darkorchid: 0x9932cc,
      darkred: 0x8b0000,
      darksalmon: 0xe9967a,
      darkseagreen: 0x8fbc8f,
      darkslateblue: 0x483d8b,
      darkslategray: 0x2f4f4f,
      darkslategrey: 0x2f4f4f,
      darkturquoise: 0x00ced1,
      darkviolet: 0x9400d3,
      deeppink: 0xff1493,
      deepskyblue: 0x00bfff,
      dimgray: 0x696969,
      dimgrey: 0x696969,
      dodgerblue: 0x1e90ff,
      firebrick: 0xb22222,
      floralwhite: 0xfffaf0,
      forestgreen: 0x228b22,
      fuchsia: 0xff00ff,
      gainsboro: 0xdcdcdc,
      ghostwhite: 0xf8f8ff,
      gold: 0xffd700,
      goldenrod: 0xdaa520,
      gray: 0x808080,
      green: 0x008000,
      greenyellow: 0xadff2f,
      grey: 0x808080,
      honeydew: 0xf0fff0,
      hotpink: 0xff69b4,
      indianred: 0xcd5c5c,
      indigo: 0x4b0082,
      ivory: 0xfffff0,
      khaki: 0xf0e68c,
      lavender: 0xe6e6fa,
      lavenderblush: 0xfff0f5,
      lawngreen: 0x7cfc00,
      lemonchiffon: 0xfffacd,
      lightblue: 0xadd8e6,
      lightcoral: 0xf08080,
      lightcyan: 0xe0ffff,
      lightgoldenrodyellow: 0xfafad2,
      lightgray: 0xd3d3d3,
      lightgreen: 0x90ee90,
      lightgrey: 0xd3d3d3,
      lightpink: 0xffb6c1,
      lightsalmon: 0xffa07a,
      lightseagreen: 0x20b2aa,
      lightskyblue: 0x87cefa,
      lightslategray: 0x778899,
      lightslategrey: 0x778899,
      lightsteelblue: 0xb0c4de,
      lightyellow: 0xffffe0,
      lime: 0x00ff00,
      limegreen: 0x32cd32,
      linen: 0xfaf0e6,
      magenta: 0xff00ff,
      maroon: 0x800000,
      mediumaquamarine: 0x66cdaa,
      mediumblue: 0x0000cd,
      mediumorchid: 0xba55d3,
      mediumpurple: 0x9370db,
      mediumseagreen: 0x3cb371,
      mediumslateblue: 0x7b68ee,
      mediumspringgreen: 0x00fa9a,
      mediumturquoise: 0x48d1cc,
      mediumvioletred: 0xc71585,
      midnightblue: 0x191970,
      mintcream: 0xf5fffa,
      mistyrose: 0xffe4e1,
      moccasin: 0xffe4b5,
      navajowhite: 0xffdead,
      navy: 0x000080,
      oldlace: 0xfdf5e6,
      olive: 0x808000,
      olivedrab: 0x6b8e23,
      orange: 0xffa500,
      orangered: 0xff4500,
      orchid: 0xda70d6,
      palegoldenrod: 0xeee8aa,
      palegreen: 0x98fb98,
      paleturquoise: 0xafeeee,
      palevioletred: 0xdb7093,
      papayawhip: 0xffefd5,
      peachpuff: 0xffdab9,
      peru: 0xcd853f,
      pink: 0xffc0cb,
      plum: 0xdda0dd,
      powderblue: 0xb0e0e6,
      purple: 0x800080,
      rebeccapurple: 0x663399,
      red: 0xff0000,
      rosybrown: 0xbc8f8f,
      royalblue: 0x4169e1,
      saddlebrown: 0x8b4513,
      salmon: 0xfa8072,
      sandybrown: 0xf4a460,
      seagreen: 0x2e8b57,
      seashell: 0xfff5ee,
      sienna: 0xa0522d,
      silver: 0xc0c0c0,
      skyblue: 0x87ceeb,
      slateblue: 0x6a5acd,
      slategray: 0x708090,
      slategrey: 0x708090,
      snow: 0xfffafa,
      springgreen: 0x00ff7f,
      steelblue: 0x4682b4,
      tan: 0xd2b48c,
      teal: 0x008080,
      thistle: 0xd8bfd8,
      tomato: 0xff6347,
      turquoise: 0x40e0d0,
      violet: 0xee82ee,
      wheat: 0xf5deb3,
      white: 0xffffff,
      whitesmoke: 0xf5f5f5,
      yellow: 0xffff00,
      yellowgreen: 0x9acd32
    };

    define$1(Color$1, color$1, {
      copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
      },
      displayable: function() {
        return this.rgb().displayable();
      },
      hex: color_formatHex$1, // Deprecated! Use color.formatHex.
      formatHex: color_formatHex$1,
      formatHsl: color_formatHsl$1,
      formatRgb: color_formatRgb$1,
      toString: color_formatRgb$1
    });

    function color_formatHex$1() {
      return this.rgb().formatHex();
    }

    function color_formatHsl$1() {
      return hslConvert$1(this).formatHsl();
    }

    function color_formatRgb$1() {
      return this.rgb().formatRgb();
    }

    function color$1(format) {
      var m, l;
      format = (format + "").trim().toLowerCase();
      return (m = reHex$1.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn$1(m) // #ff0000
          : l === 3 ? new Rgb$1((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
          : l === 8 ? rgba$1(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
          : l === 4 ? rgba$1((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
          : null) // invalid hex
          : (m = reRgbInteger$1.exec(format)) ? new Rgb$1(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
          : (m = reRgbPercent$1.exec(format)) ? new Rgb$1(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger$1.exec(format)) ? rgba$1(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
          : (m = reRgbaPercent$1.exec(format)) ? rgba$1(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
          : (m = reHslPercent$1.exec(format)) ? hsla$1(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
          : (m = reHslaPercent$1.exec(format)) ? hsla$1(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
          : named$1.hasOwnProperty(format) ? rgbn$1(named$1[format]) // eslint-disable-line no-prototype-builtins
          : format === "transparent" ? new Rgb$1(NaN, NaN, NaN, 0)
          : null;
    }

    function rgbn$1(n) {
      return new Rgb$1(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
    }

    function rgba$1(r, g, b, a) {
      if (a <= 0) r = g = b = NaN;
      return new Rgb$1(r, g, b, a);
    }

    function rgbConvert$1(o) {
      if (!(o instanceof Color$1)) o = color$1(o);
      if (!o) return new Rgb$1;
      o = o.rgb();
      return new Rgb$1(o.r, o.g, o.b, o.opacity);
    }

    function rgb$1(r, g, b, opacity) {
      return arguments.length === 1 ? rgbConvert$1(r) : new Rgb$1(r, g, b, opacity == null ? 1 : opacity);
    }

    function Rgb$1(r, g, b, opacity) {
      this.r = +r;
      this.g = +g;
      this.b = +b;
      this.opacity = +opacity;
    }

    define$1(Rgb$1, rgb$1, extend$1(Color$1, {
      brighter: function(k) {
        k = k == null ? brighter$1 : Math.pow(brighter$1, k);
        return new Rgb$1(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker$1 : Math.pow(darker$1, k);
        return new Rgb$1(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb: function() {
        return this;
      },
      displayable: function() {
        return (-0.5 <= this.r && this.r < 255.5)
            && (-0.5 <= this.g && this.g < 255.5)
            && (-0.5 <= this.b && this.b < 255.5)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex$1, // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex$1,
      formatRgb: rgb_formatRgb$1,
      toString: rgb_formatRgb$1
    }));

    function rgb_formatHex$1() {
      return "#" + hex$1(this.r) + hex$1(this.g) + hex$1(this.b);
    }

    function rgb_formatRgb$1() {
      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "rgb(" : "rgba(")
          + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.b) || 0))
          + (a === 1 ? ")" : ", " + a + ")");
    }

    function hex$1(value) {
      value = Math.max(0, Math.min(255, Math.round(value) || 0));
      return (value < 16 ? "0" : "") + value.toString(16);
    }

    function hsla$1(h, s, l, a) {
      if (a <= 0) h = s = l = NaN;
      else if (l <= 0 || l >= 1) h = s = NaN;
      else if (s <= 0) h = NaN;
      return new Hsl$1(h, s, l, a);
    }

    function hslConvert$1(o) {
      if (o instanceof Hsl$1) return new Hsl$1(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Color$1)) o = color$1(o);
      if (!o) return new Hsl$1;
      if (o instanceof Hsl$1) return o;
      o = o.rgb();
      var r = o.r / 255,
          g = o.g / 255,
          b = o.b / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          h = NaN,
          s = max - min,
          l = (max + min) / 2;
      if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
      } else {
        s = l > 0 && l < 1 ? 0 : h;
      }
      return new Hsl$1(h, s, l, o.opacity);
    }

    function hsl$1(h, s, l, opacity) {
      return arguments.length === 1 ? hslConvert$1(h) : new Hsl$1(h, s, l, opacity == null ? 1 : opacity);
    }

    function Hsl$1(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }

    define$1(Hsl$1, hsl$1, extend$1(Color$1, {
      brighter: function(k) {
        k = k == null ? brighter$1 : Math.pow(brighter$1, k);
        return new Hsl$1(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker$1 : Math.pow(darker$1, k);
        return new Hsl$1(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360,
            s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
            l = this.l,
            m2 = l + (l < 0.5 ? l : 1 - l) * s,
            m1 = 2 * l - m2;
        return new Rgb$1(
          hsl2rgb$1(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb$1(h, m1, m2),
          hsl2rgb$1(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s))
            && (0 <= this.l && this.l <= 1)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      formatHsl: function() {
        var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "hsl(" : "hsla(")
            + (this.h || 0) + ", "
            + (this.s || 0) * 100 + "%, "
            + (this.l || 0) * 100 + "%"
            + (a === 1 ? ")" : ", " + a + ")");
      }
    }));

    /* From FvD 13.37, CSS Color Module Level 3 */
    function hsl2rgb$1(h, m1, m2) {
      return (h < 60 ? m1 + (m2 - m1) * h / 60
          : h < 180 ? m2
          : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
          : m1) * 255;
    }

    function rgbToDeckglColor(c) {
        return [c.r, c.g, c.b, c.opacity * 255];
    }
    /**
     * Compares 2 colors to see if they are equal.
     * @param a RGBAColor to compare
     * @param b RGBAColor to compare
     * @returns True if colors are equal.
     */
    function colorIsEqual(a, b) {
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
    /**
     * Convert a CSS color string to a Deck.gl RGBAColor array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.).
     * @param cssColorSpecifier A CSS Color Module Level 3 specifier string.
     */
    function colorFromString(cssColorSpecifier) {
        if (cssColorSpecifier) {
            const dc = color$1(cssColorSpecifier);
            if (dc) {
                const c = dc.rgb();
                return rgbToDeckglColor(c);
            }
        }
    }
    /**
     * Convert a Deck.gl color to a CSS rgba() string.
     * @param color A Deck.gl RGBAColor array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.)
     */
    function colorToString(color) {
        const c = [...color];
        if (c.length > 3) {
            c[3] /= 255;
        }
        return `rgba(${c.join(',')})`;
    }
    function desaturate(color, value) {
        const rgb = rgb$1(color[0], color[1], color[2], color[3] / 255);
        const hslColor = hsl$1(rgb);
        hslColor.s = value;
        const c = hslColor.rgb();
        return rgbToDeckglColor(c);
    }

    let vega = {
        CanvasHandler: null,
        inferType: null,
        inferTypes: null,
        loader: null,
        parse: null,
        read: null,
        renderModule: null,
        Renderer: null,
        sceneVisit: null,
        scheme: null,
        truncate: null,
        View: null
    };
    let deck = {
        _CameraLight: null,
        AmbientLight: null,
        CompositeLayer: null,
        COORDINATE_SYSTEM: null,
        Deck: null,
        DirectionalLight: null,
        Layer: null,
        LightingEffect: null,
        LinearInterpolator: null,
        OrbitView: null,
        OrbitController: null,
        gouraudLighting: null,
        picking: null,
        project32: null
    };
    let layers = {
        IconLayer: null,
        LineLayer: null,
        PathLayer: null,
        PolygonLayer: null,
        TextLayer: null
    };
    let luma = {
        CubeGeometry: null,
        Model: null,
        Texture2D: null
    };
    /**
     * References to dependency libraries.
     */
    const base = {
        deck,
        layers,
        luma,
        vega
    };
    /**
     * Specify the dependency libraries to use for rendering.
     * @param vega Vega library.
     * @param deck deck/core library.
     * @param layers deck/layers library.
     * @param luma luma.gl library.
     */
    function use(vega, deck, layers, luma) {
        base.deck = deck;
        base.layers = layers;
        base.luma = luma;
        base.vega = vega;
    }

    // Copyright (c) 2015 - 2017 Uber Technologies, Inc.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a copy
    // of this software and associated documentation files (the "Software"), to deal
    // in the Software without restriction, including without limitation the rights
    // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    // copies of the Software, and to permit persons to whom the Software is
    // furnished to do so, subject to the following conditions:
    //
    // The above copyright notice and this permission notice shall be included in
    // all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    // THE SOFTWARE.
    var fs = `\
#define SHADER_NAME cube-layer-fragment-shader

precision highp float;

varying vec4 vColor;

void main(void) {
  gl_FragColor = vColor;

  // use highlight color if this fragment belongs to the selected object.
  gl_FragColor = picking_filterHighlightColor(gl_FragColor);

  // use picking color if rendering to picking FBO.
  gl_FragColor = picking_filterPickingColor(gl_FragColor);
}
`;

    const minHeight = '100px';
    const minWidth = '100px';
    // const lightSettings: { [view in View]: LightSettings } = {
    //     '2d': {},
    //     '3d': {
    //         lightsPosition: [-122.45, 37.66, 8000, -122.0, 38.0, 8000],
    //         ambientRatio: 0.3,
    //         diffuseRatio: 0.6,
    //         specularRatio: 0.4,
    //         lightsStrength: [0.3, 0.0, 0.8, 0.0],
    //         numberOfLights: 2
    //     }
    // };
    const defaultPresenterStyle = {
        cssPrefix: 'vega-deckgl-',
        defaultCubeColor: [128, 128, 128, 255],
        highlightColor: [0, 0, 0, 255],
    };
    const defaultPresenterConfig = {
        onCubeClick: (e, cube) => { },
        onCubeHover: (e, cube) => { },
        transitionDurations: {
            color: 100,
            position: 600,
            size: 600,
            view: 600
        }
    };
    function createStage(view) {
        const stage = {
            view,
            cubeData: [],
            axes: {
                x: [],
                y: []
            },
            gridLines: [],
            textData: [],
            legend: {
                rows: {}
            },
            facets: []
        };
        return stage;
    }
    const groupStrokeWidth = 1;
    const lineZ = -1;
    const defaultView = '2d';
    const min3dDepth = 0.05;
    const minPixelSize = 0.5;

    var defaults = /*#__PURE__*/Object.freeze({
        __proto__: null,
        minHeight: minHeight,
        minWidth: minWidth,
        defaultPresenterStyle: defaultPresenterStyle,
        defaultPresenterConfig: defaultPresenterConfig,
        createStage: createStage,
        groupStrokeWidth: groupStrokeWidth,
        lineZ: lineZ,
        defaultView: defaultView,
        min3dDepth: min3dDepth,
        minPixelSize: minPixelSize
    });

    // Copyright (c) 2015 - 2017 Uber Technologies, Inc.
    var vs = `\
#define SHADER_NAME cube-layer-vertex-shader

attribute vec3 positions;
attribute vec3 normals;

attribute vec3 instancePositions;
attribute vec3 instancePositions64Low;
attribute vec3 instanceSizes;
attribute vec4 instanceColors;
attribute vec3 instancePickingColors;

// Custom uniforms
uniform float lightingMix;

// Result
varying vec4 vColor;

void main(void) {

  float x = instanceSizes.x > 0.0 ? max(instanceSizes.x, ${minPixelSize.toFixed(1)}) : 0.0;
  float y = instanceSizes.y > 0.0 ? max(instanceSizes.y, ${minPixelSize.toFixed(1)}) : 0.0;

  // if alpha == 0.0, do not render element
  float noRender = float(instanceColors.a == 0.0);
  float finalXScale = project_size(x) * mix(1.0, 0.0, noRender);
  float finalYScale = project_size(y) * mix(1.0, 0.0, noRender);
  float finalZScale = project_size(instanceSizes.z) * mix(1.0, 0.0, noRender);

  // cube geometry vertics are between -1 to 1, scale and transform it to between 0, 1
  vec3 offset = vec3(
    (positions.x + 1.0) / 2.0 * finalXScale,
    (positions.y + 1.0) / 2.0 * finalYScale,
    (positions.z + 1.0) / 2.0 * finalZScale);

  // extrude positions
  vec4 position_worldspace;
  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset, position_worldspace);
  
  vec3 lightColor = lighting_getLightColor(instanceColors.rgb, project_uCameraPosition, position_worldspace.xyz, project_normal(normals));
  vec3 mixedLight = mix(instanceColors.rgb, lightColor, lightingMix);
  vec4 color = vec4(mixedLight, instanceColors.a) / 255.0;
  vColor = color;

  // Set color to be rendered to picking fbo (also used to check for selection highlight).
  picking_setPickingColor(instancePickingColors);
}
`;

    // Copyright (c) 2015 - 2017 Uber Technologies, Inc.
    //https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
    const UNSIGNED_BYTE = 0x1401;
    const DOUBLE = 0x140a;
    const DEFAULT_COLOR = [255, 0, 255, 255];
    const defaultProps = {
        lightingMix: 0.5,
        getSize: x => x.size,
        getPosition: x => x.position,
        getColor: x => x.color,
        material: { ambient: 0.5, diffuse: 1 }
    };
    function _CubeLayer(props) {
        //dynamic superclass, since we don't know have deck.Layer in the declaration phase
        class __CubeLayer extends base.deck.Layer {
            getShaders() {
                return { vs, fs, modules: [base.deck.project32, base.deck.gouraudLighting, base.deck.picking] };
            }
            initializeState() {
                const attributeManager = this.getAttributeManager();
                attributeManager.addInstanced({
                    instancePositions: {
                        size: 3,
                        type: DOUBLE,
                        transition: true,
                        accessor: 'getPosition'
                    },
                    instanceSizes: {
                        size: 3,
                        transition: true,
                        accessor: 'getSize'
                    },
                    instanceColors: {
                        size: 4,
                        type: UNSIGNED_BYTE,
                        transition: true,
                        accessor: 'getColor',
                        defaultValue: DEFAULT_COLOR
                    }
                });
            }
            updateState({ props, oldProps, changeFlags }) {
                super.updateState({ props, oldProps, changeFlags }); //TODO add parameter type to deck.gl-typings
                // Re-generate model if geometry changed
                //if (props.fp64 !== oldProps.fp64) {
                const { gl } = this.context;
                if (this.state.model) {
                    this.state.model.delete();
                }
                this.setState({ model: this._getModel(gl) });
                this.getAttributeManager().invalidateAll();
                //}
            }
            _getModel(gl) {
                return new base.luma.Model(gl, Object.assign({}, this.getShaders(), {
                    id: this.props.id,
                    geometry: new base.luma.CubeGeometry(),
                    isInstanced: true,
                }));
            }
            draw({ uniforms }) {
                let { lightingMix } = this.props;
                if (this.props.interpolator && this.props.interpolator.layerInterpolatedProps) {
                    lightingMix = this.props.interpolator.layerInterpolatedProps.lightingMix;
                }
                this.state.model.setUniforms(Object.assign({}, uniforms, {
                    lightingMix
                })).draw();
            }
        }
        __CubeLayer.layerName = 'CubeLayer';
        __CubeLayer.defaultProps = defaultProps;
        const instance = new __CubeLayer(props);
        return instance;
    }
    //signature to allow this function to be used with the 'new' keyword.
    //need to trick the compiler by casting to 'any'.
    /**
     * CubeLayer - a Deck.gl layer to render cuboids.
     * This is instantiatable by calling `new CubeLayer()`.
     */
    const CubeLayer = _CubeLayer;

    function expInOut(t) {
      return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getLayers(presenter, config, stage, lightSettings /*LightSettings*/, lightingMix, interpolator, guideLines) {
        const cubeLayer = newCubeLayer(presenter, config, stage.cubeData, presenter.style.highlightColor, lightSettings, lightingMix, interpolator);
        const { x, y } = stage.axes;
        const lines = concat(stage.gridLines, guideLines);
        const texts = [...stage.textData];
        [x, y].forEach(axes => {
            axes.forEach(axis => {
                if (axis.domain)
                    lines.push(axis.domain);
                if (axis.ticks)
                    lines.push.apply(lines, axis.ticks);
                if (axis.tickText)
                    texts.push.apply(texts, axis.tickText);
                if (axis.title)
                    texts.push(axis.title);
            });
        });
        if (stage.facets) {
            stage.facets.forEach(f => {
                if (f.lines)
                    lines.push.apply(lines, f.lines);
            });
        }
        const lineLayer = newLineLayer(layerNames.lines, lines);
        const textLayer = newTextLayer(presenter, layerNames.text, texts, config, presenter.style.fontFamily);
        return [textLayer, cubeLayer, lineLayer];
    }
    function newCubeLayer(presenter, config, cubeData, highlightColor, lightSettings /*LightSettings*/, lightingMix, interpolator) {
        const getPosition = getTiming(config.transitionDurations.position, expInOut);
        const getSize = getTiming(config.transitionDurations.size, expInOut);
        const getColor = getTiming(config.transitionDurations.color);
        const cubeLayerProps = {
            interpolator,
            lightingMix,
            id: layerNames.cubes,
            data: cubeData,
            coordinateSystem: base.deck.COORDINATE_SYSTEM.CARTESIAN,
            pickable: true,
            autoHighlight: true,
            highlightColor,
            onClick: (o, e) => {
                config.onCubeClick(e && e.srcEvent, o.object);
            },
            onHover: (o, e) => {
                if (o.index === -1) {
                    presenter.deckgl.interactiveState.onCube = false;
                    config.onCubeHover(e && e.srcEvent, null);
                }
                else {
                    presenter.deckgl.interactiveState.onCube = true;
                    config.onCubeHover(e && e.srcEvent, o.object);
                }
            },
            //lightSettings,
            transitions: {
                getPosition,
                getColor,
                getSize
            }
        };
        return new CubeLayer(cubeLayerProps);
    }
    function newLineLayer(id, data) {
        return new base.layers.LineLayer({
            id,
            data,
            widthUnits: 'pixels',
            coordinateSystem: base.deck.COORDINATE_SYSTEM.CARTESIAN,
            getColor: (o) => o.color,
            getWidth: (o) => o.strokeWidth
        });
    }
    function newTextLayer(presenter, id, data, config, fontFamily) {
        const props = {
            id,
            data,
            coordinateSystem: base.deck.COORDINATE_SYSTEM.CARTESIAN,
            sizeUnits: 'pixels',
            autoHighlight: true,
            pickable: true,
            highlightColor: p => {
                if (config.getTextHighlightColor) {
                    return config.getTextHighlightColor(p.object);
                }
                else {
                    return [0, 0, 0, 0];
                }
            },
            onClick: (o, e) => {
                let pe = e && e.srcEvent;
                config.onTextClick && config.onTextClick(pe, o.object);
            },
            onHover: (o, e) => {
                if (o.index === -1) {
                    presenter.deckgl.interactiveState.onText = false;
                }
                else {
                    presenter.deckgl.interactiveState.onText = config.onTextHover ? config.onTextHover(e && e.srcEvent, o.object) : true;
                }
            },
            getColor: config.getTextColor || (o => o.color),
            getTextAnchor: o => o.textAnchor,
            getSize: o => o.size,
            getAngle: o => o.angle,
            fontSettings: {
                sdf: true,
                fontSize: 128,
                buffer: 3
            }
        };
        if (fontFamily) {
            props.fontFamily = fontFamily;
        }
        return new base.layers.TextLayer(props);
    }
    function getTiming(duration, easing) {
        let timing;
        if (duration) {
            timing = {
                duration,
                type: 'interpolation'
            };
            if (easing) {
                timing.easing = easing;
            }
        }
        return timing;
    }
    function getCubeLayer(deckProps) {
        return deckProps.layers.filter(layer => layer && layer.id === layerNames.cubes)[0];
    }
    function getCubes(deckProps) {
        const cubeLayer = getCubeLayer(deckProps);
        if (!cubeLayer)
            return;
        const cubeLayerProps = cubeLayer.props;
        return cubeLayerProps.data;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.

    var util = /*#__PURE__*/Object.freeze({
        __proto__: null,
        addDiv: addDiv,
        addEl: addEl,
        allTruthy: allTruthy,
        clone: clone,
        colorFromString: colorFromString,
        colorIsEqual: colorIsEqual,
        colorToString: colorToString,
        concat: concat,
        createElement: createElement,
        deepMerge: deepMerge,
        desaturate: desaturate,
        getActiveElementInfo: getActiveElementInfo,
        getCubeLayer: getCubeLayer,
        getCubes: getCubes,
        mount: mount,
        outerSize: outerSize,
        push: push,
        setActiveElement: setActiveElement
    });

    function createOrbitControllerClass(factoryOptions) {
        function wrapper(props) {
            class OrbitControllerInternal extends base.deck.OrbitController {
                constructor(props) {
                    super(props);
                    this.invertPan = true;
                }
                handleEvent(event) {
                    if (event.type === 'doubletap') {
                        if (factoryOptions && factoryOptions.doubleClickHandler) {
                            return factoryOptions.doubleClickHandler(event, this);
                        }
                    }
                    return super.handleEvent(event);
                }
            }
            const instance = new OrbitControllerInternal(props);
            return instance;
        }
        return wrapper;
    }

    //adapted from https://github.com/uber/deck.gl/blob/5.3-release/modules/lite/src/deckgl.js
    const CANVAS_STYLE = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    };
    // Create canvas elements for map and deck
    function createCanvas(props) {
        let { container = document.body } = props;
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        if (!container) {
            throw Error('Deck: container not found');
        }
        // Add DOM elements
        const containerStyle = window.getComputedStyle(container);
        if (containerStyle.position === 'static') {
            container.style.position = 'relative';
        }
        const deckCanvas = document.createElement('canvas');
        container.appendChild(deckCanvas);
        Object.assign(deckCanvas.style, CANVAS_STYLE);
        return { container, deckCanvas };
    }
    /**
     * Creates Deck.gl classes for rendering WebGL.
     * DEck.gl is instantiatable by calling `new createDeckGLClassesForPresenter(controlleroptions)(deckProps)`.
     */
    function createDeckGLClassesForPresenter(factoryOptions) {
        const OrbitControllerClass = createOrbitControllerClass(factoryOptions);
        //dynamic superclass lets us create a subclass at execution phase instead of declaration phase.
        //This allows us to retrieve Deck from either UMD or ES6 consumers of this class.
        function wrapper(props) {
            /**
             * @params container (Element) - DOM element to add deck.gl canvas to
             * @params controller (Object) - Controller class. Leave empty for auto detection
             */
            class DeckGLInternal extends base.deck.Deck {
                constructor(props) {
                    if (typeof document === 'undefined') {
                        // Not browser
                        throw Error('Deck can only be used in the browser');
                    }
                    const { deckCanvas } = createCanvas(props);
                    const viewState = props.initialViewState || props.viewState || {};
                    super(Object.assign({}, props, {
                        width: '100%',
                        height: '100%',
                        canvas: deckCanvas,
                        controller: OrbitControllerClass,
                        initialViewState: viewState
                    }));
                    // Callback for the controller
                    this._updateViewState = params => {
                        if (this.onViewStateChange) {
                            this.onViewStateChange(params);
                        }
                    };
                }
                setProps(props) {
                    // this._updateViewState must be bound to `this`
                    // but we don't have access to the current instance before calling super().
                    if ('onViewStateChange' in props && this._updateViewState) {
                        // This is called at least once at _onRendererInitialized
                        this.onViewStateChange = props.onViewStateChange;
                        props.onViewStateChange = this._updateViewState;
                    }
                    super.setProps(props);
                }
            }
            const instance = new DeckGLInternal(props);
            return instance;
        }
        return {
            OrbitControllerClass,
            DeckGL_Class: wrapper
        };
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function wrapper(props) {
        class LinearInterpolatorInternal extends base.deck.LinearInterpolator {
            constructor(transitionProps) {
                super(transitionProps);
            }
            interpolateProps(viewStateStartProps, viewStateEndProps, t) {
                if (this.layerStartProps && this.layerEndProps) {
                    this.layerInterpolatedProps = super.interpolateProps(this.layerStartProps, this.layerEndProps, t);
                }
                return super.interpolateProps(viewStateStartProps, viewStateEndProps, t);
            }
        }
        const instance = new LinearInterpolatorInternal(props);
        return instance;
    }
    const LinearInterpolator = wrapper;

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function lightingEffects() {
        const ambientLight = new base.deck.AmbientLight({
            color: [255, 255, 255],
            intensity: 0.3
        });
        const cameraLight = new base.deck._CameraLight({
            color: [255, 255, 255],
            intensity: 1
        });
        // const directionalLight = new base.deck.DirectionalLight({
        //     color: [255, 255, 255],
        //     direction: [0, 0, -1],
        //     intensity: 0.2
        //   });
        return [new base.deck.LightingEffect({ ambientLight, cameraLight })];
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    /**
     * HTML elements outputted by the presenter.
     */
    var PresenterElement;
    (function (PresenterElement) {
        PresenterElement[PresenterElement["root"] = 0] = "root";
        PresenterElement[PresenterElement["gl"] = 1] = "gl";
        PresenterElement[PresenterElement["panel"] = 2] = "panel";
        PresenterElement[PresenterElement["legend"] = 3] = "legend";
        PresenterElement[PresenterElement["vegaControls"] = 4] = "vegaControls";
    })(PresenterElement || (PresenterElement = {}));

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const LegendView = (props) => {
        const rows = [];
        const addRow = (row, i) => {
            const fn = symbolMap[row.symbol.shape];
            let jsx;
            if (fn) {
                jsx = fn(row.symbol);
            }
            else {
                jsx = createElement("span", null, "x");
                //console.log(`need to render ${row.symbol.shape} symbol shape`);
            }
            rows.push({
                cells: [
                    { className: 'symbol', content: jsx },
                    { className: 'label', content: row.label, title: row.label }
                ]
            });
        };
        var sorted = Object.keys(props.legend.rows).sort((a, b) => +a - +b);
        sorted.forEach(i => addRow(props.legend.rows[i]));
        if (sorted.length) {
            return (createElement(Table, { rows: rows, rowClassName: "legend-row", onRowClick: (e, i) => props.onClick(e, props.legend, i) }, props.legend.title !== void 0 && createElement("tr", { onClick: e => props.onClick(e, props.legend, null) },
                createElement("th", { colSpan: 2 }, props.legend.title))));
        }
    };
    const symbolMap = {
        square: function (symbol) {
            return (createElement("div", { style: {
                    height: `${symbol.bounds.y2 - symbol.bounds.y1}px`,
                    width: `${symbol.bounds.x2 - symbol.bounds.x1}px`,
                    backgroundColor: symbol.fill,
                    borderColor: symbol.fill
                } }));
        }
    };

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const markStager = (options, stage, scene, x, y, groupType) => {
        base.vega.sceneVisit(scene, function (item) {
            var x1, y1, x2, y2;
            x1 = item.x || 0;
            y1 = item.y || 0;
            x2 = item.x2 != null ? item.x2 : x1;
            y2 = item.y2 != null ? item.y2 : y1;
            const lineItem = styledLine(x1 + x, y1 + y, x2 + x, y2 + y, item.stroke, item.strokeWidth);
            if (item.mark.role === 'axis-tick') {
                options.currAxis.ticks.push(lineItem);
            }
            else if (item.mark.role === 'axis-domain') {
                options.currAxis.domain = lineItem;
            }
            else {
                stage.gridLines.push(lineItem);
            }
        });
    };
    function styledLine(x1, y1, x2, y2, stroke, strokeWidth) {
        const line = {
            sourcePosition: [x1, -y1, lineZ],
            targetPosition: [x2, -y2, lineZ],
            color: colorFromString(stroke),
            strokeWidth: strokeWidth
        };
        return line;
    }
    function box(gx, gy, height, width, stroke, strokeWidth, diagonals = false) {
        const lines = [
            styledLine(gx, gy, gx + width, gy, stroke, strokeWidth),
            styledLine(gx + width, gy, gx + width, gy + height, stroke, strokeWidth),
            styledLine(gx + width, gy + height, gx, gy + height, stroke, strokeWidth),
            styledLine(gx, gy + height, gx, gy, stroke, strokeWidth)
        ];
        if (diagonals) {
            lines.push(styledLine(gx, gy, gx + width, gy + height, stroke, strokeWidth));
            lines.push(styledLine(gx, gy + height, gx + width, gy, stroke, strokeWidth));
        }
        return lines;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function initializePanel(presenter) {
        const rootDiv = (createElement("div", { className: className(PresenterElement.root, presenter) },
            createElement("div", { className: className(PresenterElement.gl, presenter), style: { minHeight, minWidth } }),
            createElement("div", { className: className(PresenterElement.panel, presenter) },
                createElement("div", { className: className(PresenterElement.vegaControls, presenter) }),
                createElement("div", { className: className(PresenterElement.legend, presenter) }))));
        mount(rootDiv, presenter.el);
    }
    function className(type, presenter) {
        return `${presenter.style.cssPrefix}${PresenterElement[type]}`;
    }

    function patchCubeArray(allocatedSize, empty, cubes) {
        const patched = new Array(allocatedSize);
        patched.fill(empty);
        cubes.forEach(cube => patched[cube.ordinal] = cube);
        return patched;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const legendMap = {
        'legend-title': function (legend, textItem) {
            legend.title = textItem.text;
        },
        'legend-symbol': function (legend, symbol) {
            const { bounds, fill, shape } = symbol;
            //this object is safe for serialization
            const legendRowSymbol = { bounds, fill, shape };
            const i = symbol.datum.index;
            legend.rows[i] = legend.rows[i] || {};
            legend.rows[i].symbol = legendRowSymbol;
        },
        'legend-label': function (legend, label) {
            const i = label.datum.index;
            legend.rows[i] = legend.rows[i] || {};
            const row = legend.rows[i];
            row.label = label.text;
            row.value = label.datum.value;
        }
    };
    const markStager$1 = (options, stage, scene, x, y, groupType) => {
        base.vega.sceneVisit(scene, function (item) {
            const fn = legendMap[item.mark.role];
            if (fn) {
                fn(stage.legend, item);
            }
        });
    };

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const markStager$2 = (options, stage, scene, x, y, groupType) => {
        base.vega.sceneVisit(scene, function (item) {
            //for orthographic (2d) - always use 0 or else Deck will not show them
            const z = stage.view === '2d' ? 0 : (item.z || 0);
            const depth = (stage.view === '2d' ? 0 : (item.depth || 0)) + min3dDepth;
            //change direction of y from SVG to GL
            const ty = -1;
            let ordinal = options.assignCubeOrdinal(item.datum);
            if (ordinal > options.maxOrdinal) {
                options.maxOrdinal = ordinal;
            }
            if (ordinal === undefined) ;
            else {
                const cube = {
                    ordinal,
                    size: [item.width, item.height, depth],
                    position: [x + (item.x || 0), ty * (y + (item.y || 0)) - item.height, z],
                    color: colorFromString(item.fill) || options.defaultCubeColor || [128, 128, 128, 128]
                };
                cube.color[3] = item.opacity === undefined ? 255 : 255 * item.opacity;
                stage.cubeData.push(cube);
            }
        });
    };

    const markStager$3 = (options, stage, scene, x, y, groupType) => {
        //scale Deck.Gl text to Vega size
        const fontScale = 1;
        //change direction of y from SVG to GL
        const ty = -1;
        base.vega.sceneVisit(scene, function (item) {
            if (!item.text)
                return;
            const size = item.fontSize * fontScale;
            const alignmentBaseline = convertBaseline(item.baseline);
            const yOffset = alignmentBaseline === 'top' ? item.fontSize / 2 : 0; //fixup to get tick text correct
            const textItem = {
                color: colorFromString(item.fill),
                text: base.vega.truncate(item.text, item.limit, 'right', item.ellipsis || '...'),
                position: [x + (item.x || 0), ty * (y + (item.y || 0) + yOffset), 0],
                size,
                angle: convertAngle(item.angle),
                textAnchor: convertAlignment(item.align),
                alignmentBaseline,
                metaData: item.metaData
            };
            if (item.mark.role === 'axis-label') {
                const tickText = textItem;
                tickText.value = item.datum.value;
                options.currAxis.tickText.push(tickText);
            }
            else if (item.mark.role === 'axis-title') {
                options.currAxis.title = textItem;
            }
            else {
                stage.textData.push(textItem);
            }
        });
    };
    function convertAngle(vegaTextAngle) {
        if (vegaTextAngle && !isNaN(vegaTextAngle)) {
            return 360 - vegaTextAngle;
        }
        return 0;
    }
    function convertAlignment(textAlign) {
        switch (textAlign) {
            case 'center': return 'middle';
            case 'left': return 'start';
            case 'right': return 'end';
        }
        return 'start';
    }
    function convertBaseline(baseline) {
        switch (baseline) {
            case 'middle': return 'center';
        }
        return baseline || 'bottom';
    }

    var GroupType;
    (function (GroupType) {
        GroupType[GroupType["none"] = 0] = "none";
        GroupType[GroupType["legend"] = 1] = "legend";
        GroupType[GroupType["xAxis"] = 2] = "xAxis";
        GroupType[GroupType["yAxis"] = 3] = "yAxis";
    })(GroupType || (GroupType = {}));

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getOrientItem(group) {
        if (group.orient) {
            return group;
        }
        return group.datum;
    }
    function convertGroupRole(group) {
        if (group.mark.role === 'legend')
            return GroupType.legend;
        if (group.mark.role === 'axis') {
            const orientItem = getOrientItem(group);
            if (orientItem) {
                switch (orientItem.orient) {
                    case 'bottom':
                    case 'top':
                        return GroupType.xAxis;
                    case 'left':
                    case 'right':
                        return GroupType.yAxis;
                }
            }
        }
    }
    const group = (options, stage, scene, x, y, groupType) => {
        base.vega.sceneVisit(scene, function (g) {
            const gx = g.x || 0, gy = g.y || 0;
            if (g.context && g.context.background && !stage.backgroundColor) {
                stage.backgroundColor = colorFromString(g.context.background);
            }
            if (g.stroke) {
                const facetRect = {
                    datum: g.datum,
                    lines: box(gx + x, gy + y, g.height, g.width, g.stroke, groupStrokeWidth)
                };
                stage.facets.push(facetRect);
            }
            groupType = convertGroupRole(g) || groupType;
            setCurrentAxis(options, stage, groupType);
            // draw group contents
            base.vega.sceneVisit(g, function (item) {
                mainStager(options, stage, item, gx + x, gy + y, groupType);
            });
        });
    };
    function setCurrentAxis(options, stage, groupType) {
        let axes;
        switch (groupType) {
            case GroupType.xAxis:
                axes = stage.axes.x;
                break;
            case GroupType.yAxis:
                axes = stage.axes.y;
                break;
            default:
                return;
        }
        options.currAxis = {
            domain: null,
            tickText: [],
            ticks: []
        };
        axes.push(options.currAxis);
    }
    const markStagers = {
        group,
        legend: markStager$1,
        rect: markStager$2,
        rule: markStager,
        text: markStager$3
    };
    var mainStager = (options, stage, scene, x, y, groupType) => {
        if (scene.marktype !== 'group' && groupType === GroupType.legend) {
            markStager$1(options, stage, scene);
        }
        else {
            var markStager = markStagers[scene.marktype];
            if (markStager) {
                markStager(options, stage, scene, x, y, groupType);
            }
        }
    };
    function sceneToStage(options, stage, scene) {
        mainStager(options, stage, scene, 0, 0, null);
        sortAxis(stage.axes.x, 0);
        sortAxis(stage.axes.y, 1);
    }
    function sortAxis(axes, dim) {
        axes.forEach(axis => {
            if (axis.domain)
                orderDomain(axis.domain, dim);
            axis.ticks.sort((a, b) => a.sourcePosition[dim] - b.sourcePosition[dim]);
            axis.tickText.sort((a, b) => a.position[dim] - b.position[dim]);
        });
    }
    function orderDomain(domain, dim) {
        if (domain.sourcePosition[dim] > domain.targetPosition[dim]) {
            const temp = domain.targetPosition;
            domain.targetPosition = domain.sourcePosition;
            domain.sourcePosition = temp;
        }
    }

    const viewStateProps = ['target', 'rotationOrbit', 'rotationX', 'zoom'];
    function targetViewState(height, width, view) {
        const target = [width / 2, -height / 2, 0];
        if (view === '2d') {
            return {
                target,
                rotationOrbit: 0,
                rotationX: 90,
                zoom: -0.2
            };
        }
        else {
            return {
                target,
                rotationOrbit: 25,
                rotationX: 30,
                zoom: -0.4
            };
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    /**
     * Class which presents a Stage of chart data using Deck.gl to render.
     */
    class Presenter {
        /**
         * Instantiate a new Presenter.
         * @param el Parent HTMLElement to present within.
         * @param style Optional PresenterStyle styling options.
         */
        constructor(el, style) {
            this.el = el;
            this.style = deepMerge(defaultPresenterStyle, style);
            initializePanel(this);
            this._last = { view: null, height: null, width: null, cubeCount: null, stage: null };
        }
        /**
         * Get the previously rendered Stage object.
         */
        get stage() {
            return this._last.stage;
        }
        /**
         * Get the current View camera type.
         */
        get view() {
            return this._last.view;
        }
        /**
         * Cancels any pending animation, calling animationCanceled() on original queue.
         */
        animationCancel() {
            if (this.animationTimer) {
                clearTimeout(this.animationTimer);
                this.animationTimer = null;
                if (this.logger) {
                    this.logger(`canceling animation ${(this.queuedAnimationOptions && this.queuedAnimationOptions.handlerLabel) || 'handler'}`);
                }
                if (this.queuedAnimationOptions && this.queuedAnimationOptions.animationCanceled) {
                    this.queuedAnimationOptions.animationCanceled.call(null);
                }
            }
        }
        /**
         * Stops the current animation and queues a new animation.
         * @param handler Function to invoke when timeout is complete.
         * @param timeout Length of time to wait before invoking the handler.
         * @param options Optional QueuedAnimationOptions object.
         */
        animationQueue(handler, timeout, options) {
            if (this.logger) {
                this.logger(`queueing animation ${(options && options.waitingLabel) || 'waiting'}...`);
            }
            this.animationCancel();
            this.animationTimer = setTimeout(() => {
                if (this.logger) {
                    this.logger(`queueing animation ${(options && options.handlerLabel) || 'handler'}...`);
                }
                handler();
            }, timeout);
        }
        /**
         * Retrieve a sub-element of the rendered output.
         * @param type PresenterElement type of the HTMLElement to retrieve.
         */
        getElement(type) {
            const elements = this.el.getElementsByClassName(className(type, this));
            if (elements && elements.length) {
                return elements[0];
            }
        }
        /**
         * Present the Vega Scene, or Stage object using Deck.gl.
         * @param sceneOrStage Vega Scene object, or Stage object containing chart layout info.
         * @param height Height of the rendering area.
         * @param width Width of the rendering area.
         * @param config Optional presentation configuration object.
         */
        present(sceneOrStage, height, width, config) {
            this.animationCancel();
            let scene = sceneOrStage;
            let stage;
            let options = {
                maxOrdinal: 0,
                currAxis: null,
                defaultCubeColor: this.style.defaultCubeColor,
                assignCubeOrdinal: (config && config.onSceneRectAssignCubeOrdinal) || (() => options.maxOrdinal++)
            };
            //determine if this is a vega scene
            if (scene.marktype) {
                stage = createStage(scene.view);
                sceneToStage(options, stage, scene);
            }
            else {
                stage = sceneOrStage;
            }
            if (!this.deckgl) {
                const classes = createDeckGLClassesForPresenter({
                    doubleClickHandler: () => {
                        this.homeCamera();
                    }
                });
                this.OrbitControllerClass = classes.OrbitControllerClass;
                const initialViewState = targetViewState(height, width, stage.view);
                let glOptions;
                if (config && config.preserveDrawingBuffer) {
                    glOptions = { preserveDrawingBuffer: true };
                }
                const deckProps = {
                    glOptions,
                    height: null,
                    width: null,
                    effects: lightingEffects(),
                    layers: [],
                    onClick: config && config.onLayerClick,
                    views: [new base.deck.OrbitView({ controller: base.deck.OrbitController })],
                    initialViewState,
                    container: this.getElement(PresenterElement.gl),
                    getCursor: (interactiveState) => {
                        if (interactiveState.onText || interactiveState.onAxisSelection) {
                            return 'pointer';
                        }
                        else if (interactiveState.onCube) {
                            return 'default';
                        }
                        else {
                            return 'grab';
                        }
                    }
                };
                if (stage.backgroundColor) {
                    deckProps.style = { 'background-color': colorToString(stage.backgroundColor) };
                }
                this.deckgl = new classes.DeckGL_Class(deckProps);
            }
            let cubeCount = Math.max(this._last.cubeCount, stage.cubeData.length);
            if (options.maxOrdinal) {
                cubeCount = Math.max(cubeCount, options.maxOrdinal);
                const empty = {
                    isEmpty: true,
                    color: [0, 0, 0, 0] // possibly a bug in Deck.gl? set color to invisible.
                };
                stage.cubeData = patchCubeArray(cubeCount, empty, stage.cubeData);
            }
            this.setDeckProps(stage, height, width, cubeCount, config);
            const a = getActiveElementInfo();
            mount(LegendView({ legend: stage.legend, onClick: config && config.onLegendClick }), this.getElement(PresenterElement.legend));
            setActiveElement(a);
            if (config && config.onPresent) {
                config.onPresent();
            }
        }
        /**
         * Present the same recently rendered Stage with only slight modifications such as a color change,
         * using the previous Stage values as a basis.
         * @param stage Partially populated Stage object containing changes.
         * @param modifyConfig Optional presentation configuration object.
         */
        rePresent(stage, modifyConfig) {
            const newStage = Object.assign(Object.assign({}, this._last.stage), stage);
            this.setDeckProps(newStage, this._last.height, this._last.width, this._last.cubeCount, modifyConfig);
        }
        isNewBounds(view, height, width, cubeCount) {
            const lastBounds = this.lastBounds();
            for (let prop in lastBounds) {
                if (lastBounds[prop] === null)
                    return true;
            }
            const newBounds = { cubeCount, height, view, width };
            for (let prop in lastBounds) {
                if (lastBounds[prop] !== newBounds[prop])
                    return true;
            }
        }
        lastBounds() {
            const { cubeCount, height, view, width } = this._last;
            return { cubeCount, height, view, width };
        }
        setDeckProps(stage, height, width, cubeCount, modifyConfig) {
            const config = deepMerge(defaultPresenterConfig, modifyConfig);
            const newBounds = this.isNewBounds(stage.view, height, width, cubeCount);
            //let lightSettings = this.style.lightSettings[stage.view];
            let lightingMix = stage.view === '3d' ? 1.0 : 0.0;
            let linearInterpolator;
            //choose the current OrbitView viewstate if possible
            let viewState = (this.deckgl.viewState && Object.keys(this.deckgl.viewState).length && this.deckgl.viewState.OrbitView)
                //otherwise use the initial viewstate if any
                || this.deckgl.props.viewState;
            if (!viewState || newBounds || config.shouldViewstateTransition && config.shouldViewstateTransition()) {
                let newViewStateTarget = true;
                if (config && config.onTargetViewState) {
                    const result = config.onTargetViewState(height, width);
                    height = result.height;
                    width = result.width;
                    if (result.newViewStateTarget !== undefined) {
                        newViewStateTarget = result.newViewStateTarget;
                    }
                }
                if (!viewState || newViewStateTarget) {
                    viewState = targetViewState(height, width, stage.view);
                }
                const oldCubeLayer = getCubeLayer(this.deckgl.props);
                if (oldCubeLayer) {
                    linearInterpolator = new LinearInterpolator(viewStateProps);
                    linearInterpolator.layerStartProps = { lightingMix: oldCubeLayer.props.lightingMix };
                    linearInterpolator.layerEndProps = { lightingMix };
                    viewState.transitionDuration = config.transitionDurations.view;
                    viewState.transitionEasing = expInOut;
                    viewState.transitionInterpolator = linearInterpolator;
                }
                if (stage.view === '2d') ;
            }
            const guideLines = this._showGuides && box(0, 0, height, width, '#0f0', 1, true);
            config.preLayer && config.preLayer(stage);
            const layers = getLayers(this, config, stage, /*lightSettings*/ null, lightingMix, linearInterpolator, guideLines);
            const deckProps = {
                effects: lightingEffects(),
                views: [new base.deck.OrbitView({ controller: base.deck.OrbitController })],
                initialViewState: viewState,
                layers
            };
            if (config && config.preStage) {
                config.preStage(stage, deckProps);
            }
            requestAnimationFrame(() => this.deckgl.setProps(Object.assign(Object.assign({}, deckProps), { onAfterRender: () => {
                    if (this._afterRenderHandler) {
                        this._afterRenderHandler();
                    }
                } })));
            delete stage.cubeData;
            this._last = {
                cubeCount,
                height,
                width,
                stage: stage,
                view: stage.view
            };
        }
        canvasToDataURL() {
            return new Promise((resolve, reject) => {
                this._afterRenderHandler = () => {
                    this._afterRenderHandler = null;
                    const png = this.deckgl.canvas.toDataURL('image/png');
                    resolve(png);
                };
            });
        }
        /**
         * Home the camera to the last initial position.
         */
        homeCamera() {
            const viewState = targetViewState(this._last.height, this._last.width, this._last.view);
            viewState.transitionDuration = defaultPresenterConfig.transitionDurations.view;
            viewState.transitionEasing = expInOut;
            viewState.transitionInterpolator = new LinearInterpolator(viewStateProps);
            const deckProps = {
                effects: lightingEffects(),
                views: this.deckgl.props.views,
                initialViewState: viewState,
                layers: this.deckgl.props.layers
            };
            this.deckgl.setProps(deckProps);
        }
        /**
         * Get cube data array from the cubes layer.
         */
        getCubeData() {
            return getCubes(this.deckgl.props);
        }
        /**
         * Show guidelines of rendering height/width and center of OrbitView.
         */
        showGuides() {
            this._showGuides = true;
            this.getElement(PresenterElement.gl).classList.add('show-center');
            this.rePresent(Object.assign(Object.assign({}, this._last.stage), { cubeData: this.getCubeData() }));
        }
        finalize() {
            this.animationCancel();
            if (this.deckgl)
                this.deckgl.finalize();
            if (this.el)
                this.el.innerHTML = '';
            this._last = null;
            this.deckgl = null;
            this.el = null;
            this.logger = null;
            this.queuedAnimationOptions = null;
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    //pass in the SuperClass, which should be a vega.View
    function _RendererGl(loader) {
        //dynamic superclass, since we don't know have vega.View in the declaration phase
        class RendererGlInternal extends base.vega.Renderer {
            initialize(el, width, height, origin) {
                this.height = height;
                this.width = width;
                // this method will invoke resize to size the canvas appropriately
                return super.initialize(el, width, height, origin);
            }
            resize(width, height, origin) {
                super.resize(width, height, origin);
                this.origin = origin;
                this.height = height;
                this.width = width;
                //rteturn this for vega
                return this;
            }
            _render(scene, items) {
                const scene3d = scene;
                scene3d.view = this.getView();
                this.presenter.present(scene3d, this.height, this.width, this.presenterConfig);
                //return this for vega
                return this;
            }
        }
        const instance = new RendererGlInternal(loader);
        return instance;
    }
    //signature to allow this function to be used with the 'new' keyword.
    //need to trick the compiler by casting to 'any'.
    /**
     * Subclass of Vega.Renderer, with added properties for accessing a Presenter.
     * This is instantiated by ViewGl.
     */
    const RendererGl = _RendererGl;

    // Copyright (c) Microsoft Corporation. All rights reserved.
    let registered = false;
    //dynamic superclass lets us create a subclass at execution phase instead of declaration phase.
    //This allows us to retrieve vega.View from either UMD or ES6 consumers of this class.
    //pass in the SuperClass, which should be a vega.View
    function _ViewGl(runtime, config) {
        //dynamic superclass, since we don't know have vega.View in the declaration phase
        class ViewGlInternal extends base.vega.View {
            constructor(runtime, config = {}) {
                super(runtime, config);
                this.config = config;
                this.presenter = config.presenter;
                config.presenterConfig = config.presenterConfig || {};
                config.presenterConfig.redraw = () => {
                    this._redraw = true; //use Vega View private member _redraw
                    this.run();
                };
            }
            renderer(renderer) {
                if (renderer === 'deck.gl' && !registered) {
                    base.vega.renderModule('deck.gl', { handler: base.vega.CanvasHandler, renderer: RendererGl });
                    registered = true;
                }
                return super.renderer(renderer);
            }
            initialize(el) {
                if (!this.presenter) {
                    this.presenter = new Presenter(el);
                }
                super.initialize(this.presenter.getElement(PresenterElement.vegaControls));
                const renderer = this._renderer;
                renderer.presenterConfig = this.config.presenterConfig;
                renderer.presenter = this.presenter;
                renderer.getView = this.config && this.config.getView || (() => this.presenter.view || defaultView);
                return this;
            }
            error(e) {
                if (this.presenter.logger) {
                    this.presenter.logger(e);
                }
            }
        }
        const instance = new ViewGlInternal(runtime, config);
        return instance;
    }
    //signature to allow this function to be used with the 'new' keyword.
    //need to trick the compiler by casting to 'any'.
    /**
     * Subclass of Vega.View, with added properties for accessing a Presenter.
     * This is instantiatable by calling `new ViewGl()`. See https://vega.github.io/vega/docs/api/view/
     */
    const ViewGl = _ViewGl;

    // Copyright (c) Microsoft Corporation. All rights reserved.

    var index$2 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        constants: constants$1,
        controls: controls,
        defaults: defaults,
        types: types$1,
        util: util,
        base: base,
        use: use,
        Presenter: Presenter,
        ViewGl: ViewGl,
        get PresenterElement () { return PresenterElement; }
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const { defaultPresenterConfig: defaultPresenterConfig$1, defaultPresenterStyle: defaultPresenterStyle$1 } = defaults;
    const { desaturate: desaturate$1 } = util;
    const defaultViewerOptions = {
        colors: {
            activeCube: 'purple',
            defaultCube: colorToString(defaultPresenterStyle$1.defaultCubeColor),
            hoveredCube: colorToString(defaultPresenterStyle$1.highlightColor),
            selectedCube: 'yellow',
            axisSelectHighlight: colorToString([128, 128, 128, 128]),
            axisLine: '#000',
            axisText: '#000',
            unselectedColorMethod: (color) => {
                const c = desaturate$1(color, 0.05);
                c[3] = 171;
                return c;
            }
        },
        language: {
            headers: {
                chart: 'Chart',
                details: 'Details',
                legend: 'Legend',
                selection: 'Select & Filter'
            },
            bing: 'bing',
            newColorMap: 'remap color to filtered items',
            oldColorMap: 'keep same colors',
            deselect: 'deselect',
            exclude: 'exclude',
            isolate: 'isolate',
            legendOther: 'other',
            nextDetail: '>',
            previousDetail: '<',
            reset: 'reset',
            colorBinCount: 'Color bin count',
            colorReverse: 'Color reverse',
            count: 'Count',
            percent: 'Percent',
            sum: 'Sum',
            scatterPointScale: 'Point scale',
            FacetMaxBins: 'Facet max bins',
            FacetVMaxBins: 'Cross facet max bins',
            XMaxBins: 'X axis max bins',
            YMaxBins: 'Y axis max bins',
            XGridSize: 'X grid size',
            YGridSize: 'Y grid size',
            InnerPaddingSize: 'Inner padding size',
            OuterPaddingSize: 'Outer padding size',
            treeMapMethod: 'Treemap layout',
            facetColumns: 'Facet columns',
            facetRows: 'Facet rows',
            markOpacitySignal: 'Mark opacity',
            textScaleSignal: 'Text scale',
            xAxisTextAngleSignal: 'X axis text angle',
            yAxisTextAngleSignal: 'Y axis text angle',
            zGrounded: 'Z grounded',
            zScaleProportion: 'Z scale proportion to Y',
            selectionCount: count => `${count} items selected`
        },
        maxLegends: 19,
        onError: (errors) => {
            //console.log(`UnitVisViewer errors: ${errors.join('\n')}`);
        },
        transitionDurations: Object.assign(Object.assign({}, defaultPresenterConfig$1.transitionDurations), { scope: 600 }),
        selectionPolygonZ: -1,
        tickSize: 10
    };
    function getPresenterStyle(options) {
        var style = {
            cssPrefix,
            fontFamily: options.fontFamily,
            defaultCubeColor: colorFromString(options.colors.defaultCube)
        };
        if (options.colors.hoveredCube) {
            style.highlightColor = colorFromString(options.colors.hoveredCube);
        }
        //if (options.lightSettings) {
        // style.lightSettings = options.lightSettings;
        //}
        return style;
    }
    const cssPrefix = 'sanddance-';
    const dualColorSchemeColors = {
        black: '#212121',
        gray: '#D2D2D2',
        blue: '#0060F0',
        green: '#00C000',
        orange: '#FF9900',
        red: '#E00000'
    };

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function isInternalFieldName(columnName, includeVegaDeckGLFields = false) {
        if (includeVegaDeckGLFields) {
            if (columnName === GL_ORDINAL)
                return true;
        }
        for (let f in FieldNames) {
            if (columnName === FieldNames[f])
                return true;
        }
        return false;
    }

    var util$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        isInternalFieldName: isInternalFieldName,
        getColumnsFromData: getColumnsFromData,
        getStats: getStats,
        inferAll: inferAll,
        getPresenterStyle: getPresenterStyle
    });

    const dualPairs = [
        [dualColorSchemeColors.black, dualColorSchemeColors.gray],
        [dualColorSchemeColors.red, dualColorSchemeColors.green],
        [dualColorSchemeColors.red, dualColorSchemeColors.blue],
        [dualColorSchemeColors.black, dualColorSchemeColors.red],
        [dualColorSchemeColors.black, dualColorSchemeColors.orange],
        [dualColorSchemeColors.black, dualColorSchemeColors.green]
    ];
    /**
     * Array of color schemes.
     */
    const colorSchemes = [
        {
            scheme: ColorScaleNone,
            colors: [defaultViewerOptions.colors.defaultCube]
        }
    ];
    createDualColorSchemes();
    function registerColorSchemes(vega) {
        colorSchemes.forEach(cs => {
            if (cs.colors.length === 1) {
                vega.scheme(cs.scheme, x => cs.colors[0]);
            }
            else {
                vega.scheme(cs.scheme, cs.colors);
            }
        });
    }
    function createPair(names, colors) {
        const scheme = `dual_${names[0]}${names[1]}`;
        colorSchemes.push({ scheme, colors });
    }
    function createDualColorSchemes() {
        dualPairs.forEach(colors => {
            const names = colors.map(color => {
                for (let key in dualColorSchemeColors)
                    if (color === dualColorSchemeColors[key])
                        return key;
            });
            createPair(names, colors);
            createPair([...names].reverse(), [...colors].reverse());
        });
    }

    var DataLayoutChange;
    (function (DataLayoutChange) {
        DataLayoutChange[DataLayoutChange["same"] = 0] = "same";
        DataLayoutChange[DataLayoutChange["reset"] = 1] = "reset";
        DataLayoutChange[DataLayoutChange["refine"] = 2] = "refine";
    })(DataLayoutChange || (DataLayoutChange = {}));
    class Animator {
        constructor(dataScope, props) {
            this.dataScope = dataScope;
            this.props = props;
        }
        select(search) {
            return new Promise((resolve, reject) => {
                this.dataScope.select(search);
                this.props.onDataChanged(DataLayoutChange.same);
                resolve();
            });
        }
        deselect() {
            return new Promise((resolve, reject) => {
                this.dataScope.deselect();
                this.props.onDataChanged(DataLayoutChange.same);
                resolve();
            });
        }
        filter(search, keepData, collapseData, rebase) {
            if (rebase) {
                this.dataScope.collapse(false, keepData);
            }
            this.dataScope.collapse(true, collapseData);
            return new Promise((resolve, reject) => {
                this.props.onAnimateDataChange(DataLayoutChange.refine, 'before refine', 'refine').then(() => {
                    this.dataScope.deselect();
                    this.dataScope.setFilteredData(keepData);
                    this.props.onDataChanged(DataLayoutChange.refine, search);
                    resolve();
                }).catch(reject);
            });
        }
        reset() {
            return new Promise((resolve, reject) => {
                this.dataScope.deselect();
                this.dataScope.setFilteredData(null);
                this.props.onAnimateDataChange(DataLayoutChange.reset, 'before reset', 'reset').then(() => {
                    this.dataScope.collapse(false);
                    this.props.onDataChanged(DataLayoutChange.reset);
                    resolve();
                }).catch(reject);
            });
        }
        activate(datum) {
            return new Promise((resolve, reject) => {
                this.dataScope.activate(datum);
                this.props.onDataChanged(DataLayoutChange.same);
                resolve();
            });
        }
        deactivate() {
            return new Promise((resolve, reject) => {
                this.dataScope.deactivate();
                this.props.onDataChanged(DataLayoutChange.same);
                resolve();
            });
        }
    }

    function cloneAxis(axes, axisColor, axisTextColor) {
        return axes.map(axis => {
            const newAxis = deepMerge(axis);
            if (newAxis.domain) {
                newAxis.domain.color = axisColor;
            }
            if (newAxis.title) {
                newAxis.title.color = axisTextColor;
            }
            newAxis.ticks.forEach(t => { t.color = axisColor; });
            newAxis.tickText.forEach(t => { t.color = axisTextColor; });
            return newAxis;
        });
    }
    function cloneTextData(textData, color) {
        return textData.map(t => {
            return Object.assign(Object.assign({}, t), { color });
        });
    }
    function recolorAxes(stage, oldColors, newColors) {
        const hasNewLineColor = newColors.axisLine && newColors.axisLine !== oldColors.axisLine;
        const hasNewTextColor = newColors.axisText && newColors.axisText !== oldColors.axisText;
        let axes;
        let textData;
        if (hasNewLineColor || hasNewTextColor) {
            const lineColor = colorFromString(newColors.axisLine || oldColors.axisLine);
            const textColor = colorFromString(newColors.axisText || oldColors.axisText);
            axes = {
                x: cloneAxis(stage.axes.x, lineColor, textColor),
                y: cloneAxis(stage.axes.y, lineColor, textColor)
            };
        }
        if (hasNewTextColor) {
            textData = cloneTextData(stage.textData, colorFromString(newColors.axisText));
        }
        return { axes, textData };
    }

    function notNice(niceValue) {
        //convert "nice" numbers to numeric value
        return (niceValue + '').replace(/[\s,]/g, '');
    }
    function tickValue(axis, i) {
        const tick = axis.tickText[i];
        let value;
        if (tick) {
            value = axis.tickText[i].value;
        }
        return { tick, value };
    }
    function selectNullOrEmpty(column) {
        const searchExpression = {
            name: column.name,
            operator: 'isnullorEmpty'
        };
        return searchExpression;
    }
    function selectExact(column, value) {
        if (value == null) {
            return selectNullOrEmpty(column);
        }
        const searchExpression = {
            name: column.name,
            operator: '==',
            value
        };
        return searchExpression;
    }
    function selectNone(column, values) {
        const expressions = values.map((value, i) => {
            const searchExpression = {
                name: column.name,
                operator: '!=',
                value
            };
            if (i) {
                searchExpression.clause = '&&';
            }
            return searchExpression;
        });
        const searchExpressionGroup = {
            expressions
        };
        return searchExpressionGroup;
    }
    function selectExactAxis(axis, column, i) {
        const result = tickValue(axis, i);
        if (result.tick) {
            return selectExact(column, result.value);
        }
    }
    function selectBetween(column, lowValue, highValue, lowOperator = '>=', highOperator = '<') {
        const expressions = [];
        if (lowValue !== undefined) {
            expressions.push({
                name: column.name,
                operator: lowOperator,
                value: lowValue
            });
        }
        if (highValue !== undefined) {
            expressions.push({
                name: column.name,
                operator: highOperator,
                value: highValue
            });
        }
        if (expressions.length > 1) {
            expressions[1].clause = '&&';
        }
        const searchExpressionGroup = {
            expressions
        };
        return searchExpressionGroup;
    }
    function selectBetweenAxis(axis, column, i) {
        const low = tickValue(axis, i);
        const high = tickValue(axis, i + 1);
        return selectBetween(column, low.value, high.value);
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const { allTruthy: allTruthy$1, concat: concat$1, push: push$1 } = util;

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getSearchGroupFromVegaValue(search) {
        let group;
        const vegaSearch = search;
        if (Array.isArray(vegaSearch)) {
            //flatten into one group
            group = { expressions: [] };
            vegaSearch.forEach(g => {
                const clonedExpressions = clone(g.expressions).filter(Boolean);
                clonedExpressions[0].clause = '&&';
                push$1(group.expressions, clonedExpressions);
            });
        }
        else {
            group = vegaSearch ?
                { expressions: vegaSearch.expressions.filter(Boolean) }
                : null;
        }
        return group;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function axisSelectionLayer(presenter, specCapabilities, columns, stage, clickHandler, highlightColor, polygonZ) {
        const polygons = [];
        const xRole = specCapabilities.roles.filter(r => r.role === 'x')[0];
        if (xRole && xRole.axisSelection) {
            stage.axes.x.filter(axis => axis.tickText.length).forEach(axis => {
                polygons.push.apply(polygons, axisSelectionPolygons(axis, false, xRole.axisSelection, columns.x));
            });
        }
        const yRole = specCapabilities.roles.filter(r => r.role === 'y')[0];
        if (yRole && yRole.axisSelection) {
            stage.axes.y.filter(axis => axis.tickText.length).forEach(axis => {
                polygons.push.apply(polygons, axisSelectionPolygons(axis, true, yRole.axisSelection, columns.y));
            });
        }
        if (stage.facets && columns.facet) {
            polygons.push.apply(polygons, facetSelectionPolygons(stage.facets));
        }
        //move polygons to Z
        polygons.forEach(datum => {
            datum.polygon.forEach(p => {
                p[2] = polygonZ;
            });
        });
        const onClick = (o, e) => clickHandler(e.srcEvent, o.object.search);
        const polygonLayer = new base.layers.PolygonLayer({
            autoHighlight: true,
            coordinateSystem: base.deck.COORDINATE_SYSTEM.CARTESIAN,
            data: polygons,
            extruded: false,
            highlightColor: colorFromString(highlightColor),
            id: 'selections',
            onHover: (o, e) => {
                if (o.index === -1) {
                    presenter.deckgl.interactiveState.onAxisSelection = false;
                }
                else {
                    presenter.deckgl.interactiveState.onAxisSelection = true;
                }
            },
            onClick,
            getElevation: () => 0,
            getFillColor: () => [0, 0, 0, 0],
            pickable: true,
            stroked: false
        });
        return polygonLayer;
    }
    function axisSelectionPolygons(axis, vertical, axisSelectionType, column) {
        const polygons = [];
        const size = 50;
        const getSearch = axisSelectionType === 'exact' ?
            (a, c, i) => ({ expressions: [selectExactAxis(a, c, i)] })
            :
                selectBetweenAxis;
        const { domain, ticks } = axis;
        if (ticks.length > 0 && domain) {
            const dim = vertical ? 1 : 0;
            const between = Math.abs(ticks[0].sourcePosition[dim] - domain.sourcePosition[dim]) > 1;
            let divisions;
            if (between) {
                divisions = [];
                for (let i = 1; i < ticks.length; i++) {
                    divisions.push((ticks[i].sourcePosition[dim] + ticks[i - 1].sourcePosition[dim]) / 2);
                }
            }
            else {
                divisions = ticks.slice(1, -1).map(tick => tick.sourcePosition[dim]);
            }
            const add = (p2, i) => {
                const coords = [[p1, q1], [p2, q1], [p2, q2], [p1, q2]];
                polygons.push({
                    search: getSearch(axis, column, i),
                    polygon: vertical ? coords.map(xy => xy.reverse()) : coords
                });
                p1 = p2;
            };
            let p1 = domain.sourcePosition[dim];
            const q1 = domain.sourcePosition[vertical ? 0 : 1];
            const q2 = q1 - size;
            divisions.forEach(add);
            add(domain.targetPosition[dim], ticks.length - (between ? 1 : 2));
        }
        return polygons;
    }
    function facetSelectionPolygons(facetRects) {
        const polygons = [];
        let linesAndSearches;
        linesAndSearches = facetRects.map(({ datum, lines }, i) => {
            let group = getSearchGroupFromVegaValue(datum[FieldNames.FacetSearch]);
            return {
                lines,
                search: group
            };
        });
        linesAndSearches.forEach(({ lines, search }, i) => {
            //take any 2 lines to get a box dimension
            const [x, y] = minMaxPoints(lines.slice(2));
            polygons.push({
                search,
                polygon: [[x.min, y.min], [x.max, y.min], [x.max, y.max], [x.min, y.max]]
            });
        });
        return polygons;
    }
    function minMaxPoints(lines) {
        const points = [];
        lines.forEach(line => {
            [line.sourcePosition, line.targetPosition].forEach(point => {
                points.push(point);
            });
        });
        return [0, 1].map(dim => {
            let minMax = { min: null, max: null };
            points.forEach(point => {
                if (minMax.max == null) {
                    minMax.max = point[dim];
                }
                else {
                    minMax.max = Math.max(minMax.max, point[dim]);
                }
                if (minMax.min == null) {
                    minMax.min = point[dim];
                }
                else {
                    minMax.min = Math.min(minMax.min, point[dim]);
                }
            });
            return minMax;
        });
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function getSelectedColorMap(currentData, showSelectedData, showActive, viewerOptions) {
        function getSelectionColorItem(datum) {
            let item;
            if (showSelectedData) {
                item = datum[FieldNames.Selected] ?
                    { color: colorFromString(viewerOptions.colors.selectedCube) }
                    :
                        { unSelected: true };
            }
            if (showActive && datum[FieldNames.Active]) {
                item = { color: colorFromString(viewerOptions.colors.activeCube) };
            }
            return item;
        }
        const colorMap = {};
        currentData.forEach(datum => {
            const selectionColor = getSelectionColorItem(datum);
            if (selectionColor) {
                const ordinal = datum[GL_ORDINAL];
                colorMap[ordinal] = selectionColor;
            }
        });
        return colorMap;
    }
    function colorMapFromCubes(cubes) {
        const map = {};
        cubes.forEach(cube => {
            map[cube.ordinal] = { color: cube.color };
        });
        return map;
    }
    function populateColorContext(colorContext, presenter) {
        if (!colorContext.colorMap) {
            const cubes = presenter.getCubeData();
            colorContext.colorMap = colorMapFromCubes(cubes);
        }
        colorContext.legend = clone(presenter.stage.legend);
        colorContext.legendElement = presenter.getElement(PresenterElement.legend).children[0];
    }
    function applyColorMapToCubes(maps, cubes, unselectedColorMethod) {
        Object.keys(maps[0]).forEach(ordinal => {
            const cube = cubes[+ordinal];
            if (cube && !cube.isEmpty) {
                const actualColorMappedItem = maps[0][ordinal];
                if (maps.length > 1) {
                    const selectedColorMappedItem = maps[1][ordinal];
                    if (selectedColorMappedItem) {
                        if (selectedColorMappedItem.unSelected && unselectedColorMethod) {
                            cube.color = unselectedColorMethod(actualColorMappedItem.color);
                        }
                        else {
                            cube.color = selectedColorMappedItem.color;
                        }
                        return;
                    }
                }
                cube.color = actualColorMappedItem.color;
            }
        });
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    class DataScope {
        constructor() {
            this.filteredColumnsStats = {};
        }
        setData(data, columns) {
            const differentData = this.data !== data;
            if (differentData) {
                if (this.data) {
                    //clean up things we added to old data
                    this.deselect();
                }
                this.data = data;
                this.columns = columns;
                this.filteredData = null;
                this.filteredColumnsStats = {};
            }
            return differentData;
        }
        setFilteredData(filteredData) {
            this.filteredData = filteredData;
            this.filteredColumnsStats = {};
        }
        getColumns(columnTypes) {
            if (!this.columns) {
                this.columns = getColumnsFromData(base.vega.inferTypes, this.data, columnTypes);
            }
            return this.columns;
        }
        getFilteredColumnStats(columnName) {
            if (!this.filteredColumnsStats[columnName]) {
                this.filteredColumnsStats[columnName] = getStats(this.filteredData, this.columns.filter(c => c.name === columnName)[0]);
            }
            return this.filteredColumnsStats[columnName];
        }
        currentData() {
            return this.filteredData || this.data;
        }
        select(search) {
            this.deselect();
            if (search) {
                this.selection = this.createUserSelection(search, true, false);
                if (this.selection.included.length) {
                    this.activate(this.selection.included[0]);
                }
            }
        }
        createUserSelection(search, assign, rebase) {
            const exec = new Exec(search, this.getColumns());
            const s = {
                search,
                included: [],
                excluded: []
            };
            const data = rebase ? this.data : this.currentData();
            data.forEach(datum => {
                if (exec.run(datum)) {
                    if (assign) {
                        datum[FieldNames.Selected] = true;
                    }
                    s.included.push(datum);
                }
                else {
                    s.excluded.push(datum);
                }
            });
            return s;
        }
        deselect() {
            this.deactivate();
            this.data.forEach(datum => {
                delete datum[FieldNames.Selected];
            });
            this.selection = null;
        }
        hasFilteredData() {
            return !!this.filteredData;
        }
        hasSelectedData() {
            return !!this.selection;
        }
        collapse(collapsed, data = this.data) {
            data.forEach(datum => {
                datum[FieldNames.Collapsed] = collapsed;
            });
            this.isCollapsed = collapsed;
        }
        activate(datum) {
            this.deactivate();
            datum[FieldNames.Active] = true;
            this.active = datum;
        }
        deactivate() {
            if (this.active) {
                delete this.active[FieldNames.Active];
            }
            this.active = null;
        }
        ordinalIndexWithinSelection(ordinal) {
            if (this.selection) {
                for (let i = 0; i < this.selection.included.length; i++) {
                    let datum = this.selection.included[i];
                    if (datum[GL_ORDINAL] === ordinal) {
                        return { datum, index: i };
                    }
                }
            }
            return { datum: null, index: -1 };
        }
        finalize() {
            this.data = null;
            this.filteredData = null;
            this.filteredColumnsStats = null;
            if (this.selection) {
                this.selection.excluded = null;
                this.selection.included = null;
                this.selection = null;
            }
        }
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    var Action;
    (function (Action) {
        Action[Action["deselect"] = 0] = "deselect";
        Action[Action["isolate"] = 1] = "isolate";
        Action[Action["exclude"] = 2] = "exclude";
        Action[Action["reset"] = 3] = "reset";
        Action[Action["next"] = 4] = "next";
        Action[Action["previous"] = 5] = "previous";
    })(Action || (Action = {}));
    class Details {
        constructor(parentElement, language, animator, dataScope, colorMapHandler, hasColorMaps) {
            this.language = language;
            this.animator = animator;
            this.dataScope = dataScope;
            this.colorMapHandler = colorMapHandler;
            this.hasColorMaps = hasColorMaps;
            this.element = addDiv(parentElement, `${cssPrefix}unitControls`);
            this.clear();
        }
        finalize() {
            if (this.element)
                this.element.innerHTML = '';
            this.dataScope = null;
            this.element = null;
        }
        clear() {
            this.state = {
                userSelection: null,
                index: -1,
                remapColor: false
            };
            this.render();
        }
        clearSelection() {
            this.state.userSelection = null;
            this.state.index = -1;
            this.render();
        }
        populate(userSelection, index = 0) {
            this.state.userSelection = userSelection;
            this.state.index = index;
            this.render();
        }
        selectByNameValue(columnName, value) {
            const search = {
                name: columnName,
                operator: '==',
                value
            };
            this.clearSelection();
            this.animator.select(search);
            this.populate(this.dataScope.selection);
        }
        remapChanged(remap) {
            this.state.remapColor = remap;
            this.colorMapHandler(remap);
            this.render();
        }
        handleAction(action) {
            let p;
            const u = this.state.userSelection;
            switch (action) {
                case Action.deselect: {
                    this.clearSelection();
                    p = this.animator.deselect();
                    break;
                }
                case Action.exclude: {
                    this.clearSelection();
                    p = this.animator.filter(invert(u.search), u.excluded, u.included, false);
                    this.state.remapColor = false;
                    break;
                }
                case Action.isolate: {
                    this.clearSelection();
                    p = this.animator.filter(u.search, u.included, u.excluded, false);
                    this.state.remapColor = false;
                    break;
                }
                case Action.reset: {
                    this.clear();
                    p = this.animator.reset();
                    break;
                }
                default: {
                    switch (action) {
                        case Action.previous: {
                            this.state.index--;
                            if (this.state.index < 0) {
                                this.state.index = this.state.userSelection.included.length - 1;
                            }
                            break;
                        }
                        case Action.next: {
                            this.state.index++;
                            if (this.state.index >= this.state.userSelection.included.length) {
                                this.state.index = 0;
                            }
                            break;
                        }
                    }
                    this.render();
                    p = this.animator.activate(this.state.userSelection.included[this.state.index]);
                }
            }
            p.then(() => this.render());
        }
        render() {
            const hasRefinedData = this.dataScope.hasFilteredData();
            const renderProps = {
                language: this.language,
                actionHandler: action => this.handleAction(action),
                selectionHandler: (columnName, value) => this.selectByNameValue(columnName, value),
                count: this.state.userSelection && this.state.userSelection.included.length,
                hasRefinedData,
                item: this.state.userSelection && this.state.userSelection.included[this.state.index],
                remapColorHandler: remap => this.remapChanged(remap),
                hasColorMaps: this.hasColorMaps() && hasRefinedData,
                remapColor: this.state.remapColor
            };
            const a = getActiveElementInfo();
            mount(renderDetails(renderProps), this.element);
            setActiveElement(a);
        }
    }
    const renderDetails = (props) => {
        const controlButtons = [
            createElement("button", { disabled: !props.item, onClick: e => props.actionHandler(Action.deselect) }, props.language.deselect),
            createElement("button", { disabled: !props.item, onClick: e => props.actionHandler(Action.isolate) }, props.language.isolate),
            createElement("button", { disabled: !props.item, onClick: e => props.actionHandler(Action.exclude) }, props.language.exclude)
        ];
        const colorMapping = (createElement("div", null,
            createElement("button", { disabled: props.remapColor, onClick: e => props.remapColorHandler(true) }, props.language.newColorMap),
            createElement("button", { disabled: !props.remapColor, onClick: e => props.remapColorHandler(false) }, props.language.oldColorMap)));
        const singleItem = props.count === 1;
        const scrollButtons = [
            createElement("button", { disabled: singleItem, onClick: e => props.actionHandler(Action.previous) }, props.language.previousDetail),
            createElement("button", { disabled: singleItem, onClick: e => props.actionHandler(Action.next) }, props.language.nextDetail),
            createElement("span", null,
                " ",
                props.language.selectionCount(props.count))
        ];
        const rows = [];
        for (let prop in props.item) {
            if (prop === GL_ORDINAL) {
                continue;
            }
            if (isInternalFieldName(prop)) {
                continue;
            }
            rows.push({
                cells: [
                    { content: prop }, { content: linkSelect(props.language, prop, props.item[prop], props.selectionHandler) }
                ]
            });
        }
        return (createElement("div", null,
            props.hasColorMaps && colorMapping,
            createElement("h4", null, props.language.headers.selection),
            createElement("div", { className: `${cssPrefix}selection` },
                controlButtons,
                createElement("button", { disabled: !props.hasRefinedData, onClick: e => props.actionHandler(Action.reset) }, "reset")),
            props.item && createElement("h4", null, props.language.headers.details),
            createElement("div", null,
                createElement("div", { className: `${cssPrefix}details-scroll` }, props.item && scrollButtons),
                createElement("div", { className: `${cssPrefix}details` }, props.item && createElement(Table, { rows: rows })))));
    };
    function linkSelect(language, columnName, value, selectionHandler) {
        return (createElement("span", null,
            createElement("a", { href: "#", onClick: e => selectionHandler(columnName, value) }, value),
            isNaN(value) ? [' ', createElement("a", { className: "bing-search", href: `https://www.bing.com/search?q=${encodeURIComponent(value)}`, target: "_blank" }, language.bing)] : ''));
    }

    function ensureHeaders(presenter, headers) {
        const vegaControls = presenter.getElement(PresenterElement.vegaControls);
        conditionalHeader(!!vegaControls.querySelectorAll('.vega-bindings > *').length, vegaControls, headers.chart);
        const legend = presenter.getElement(PresenterElement.legend);
        conditionalHeader(!!legend.children.length, legend, headers.legend);
    }
    function conditionalHeader(condition, element, header) {
        var existing = existingHeader(element, header);
        if (condition && !existing) {
            addHeader(element, header);
        }
        if (!condition && existing) {
            existing.remove();
        }
    }
    function addHeader(element, header) {
        const h = document.createElement('h4');
        h.innerHTML = header;
        element.insertAdjacentElement('beforebegin', h);
    }
    function existingHeader(element, header) {
        const { previousElementSibling } = element;
        if (previousElementSibling && previousElementSibling.innerHTML === header) {
            return previousElementSibling;
        }
    }

    function legendRange(colorBinType, column, legend, clickedIndex) {
        if (column.quantitative) {
            return selectQuantitative(colorBinType, column, legend, clickedIndex);
        }
        else {
            return selectCategorical(column, legend, clickedIndex);
        }
    }
    function selectCategorical(column, legend, clickedIndex) {
        const value = legend.rows[clickedIndex].value;
        if (value === Other) {
            const values = [];
            for (let i in legend.rows) {
                if (+i !== clickedIndex) {
                    values.push(legend.rows[i].value);
                }
            }
            return selectNone(column, values);
        }
        else {
            //select equal
            return { expressions: [selectExact(column, legend.rows[clickedIndex].value)] };
        }
    }
    function selectQuantitative(colorBinType, column, legend, clickedIndex) {
        const keys = Object.keys(legend.rows).map(key => +key).sort((a, b) => +a - +b);
        let lowValue;
        let lowOperator;
        let highValue;
        let highOperator;
        const rowText = legend.rows[clickedIndex].label;
        switch (colorBinType) {
            case 'continuous': {
                lowValue = rowText;
                if (clickedIndex < keys.length - 1) {
                    highValue = legend.rows[clickedIndex + 1].value;
                }
                break;
            }
            default: {
                if (rowText.indexOf('null') > 0) {
                    const ex = {
                        expressions: [selectNullOrEmpty(column)]
                    };
                    return ex;
                }
                const dash = rowText.indexOf('–'); //this is not the common dash character!
                if (dash > 0) {
                    //bug in Vega for quantize?
                    //lowOperator = '>';
                    //highOperator = '<=';
                    lowValue = rowText.substr(0, dash);
                    highValue = rowText.substr(dash + 1);
                }
                else {
                    if (rowText.indexOf('<') >= 0) {
                        highValue = rowText.substring(2);
                    }
                    else {
                        if (rowText.indexOf('≥') >= 0) {
                            lowValue = rowText.substring(2);
                        }
                    }
                }
            }
        }
        if (lowValue)
            lowValue = notNice(lowValue);
        if (highValue)
            highValue = notNice(highValue);
        if (lowValue === highValue) {
            return { expressions: [selectExact(column, lowValue)] };
        }
        else {
            return selectBetween(column, lowValue, highValue, lowOperator, highOperator);
        }
    }
    function finalizeLegend(colorBinType, colorColumn, legend, language) {
        const rowTexts = [];
        for (let i in legend.rows) {
            let row = legend.rows[i];
            row.search = legendRange(colorBinType, colorColumn, legend, +i);
            if (row.value === Other) {
                row.label = language.legendOther;
            }
            else {
                rowTexts.push(row.value);
            }
        }
    }

    function assignOrdinals(columns, data, ordinalMap) {
        const uCol = columns.uid && columns.uid.name;
        if (ordinalMap) {
            data.forEach((d, i) => {
                const key = uCol ? d[uCol] : i;
                d[GL_ORDINAL] = ordinalMap[key];
            });
        }
        else {
            ordinalMap = {};
            data.forEach((d, i) => {
                d[GL_ORDINAL] = i;
                const uColValue = uCol ? d[uCol] : i;
                ordinalMap[uColValue] = i;
            });
        }
        return ordinalMap;
    }
    function getDataIndexOfCube(cube, data) {
        const len = data.length;
        for (let i = 0; i < len; i++) {
            if (data[i][GL_ORDINAL] === cube.ordinal) {
                return i;
            }
        }
    }

    function applySignalValues(sv, b) {
        if (!sv || !b || !b.signals || !b.signals.length)
            return;
        for (let key in sv) {
            let value = sv[key];
            let signalB = b.signals.filter(signal => signal.name === key)[0];
            if (signalB && signalB.bind) {
                signalB.value = value;
            }
        }
    }
    function extractSignalValuesFromView(view, spec) {
        if (!view || !spec || !spec.signals || !spec.signals.length)
            return;
        const result = {};
        spec.signals.forEach((signalA) => {
            //bound to a UI control
            if (signalA.bind) {
                try {
                    result[signalA.name] = view.signal(signalA.name);
                }
                catch (e) {
                    // continue regardless of error
                }
            }
        });
        return result;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const { outerSize: outerSize$1 } = util;
    const { Table: Table$1 } = controls;
    class Tooltip {
        constructor(props) {
            const renderProps = {
                cssPrefix: props.cssPrefix,
                rows: getRows(props.item, props.options)
            };
            this.element = renderTooltip(renderProps);
            if (this.element) {
                this.element.style.position = 'absolute';
                this.child = this.element.firstChild;
                document.body.appendChild(this.element);
                //measure and move as necessary
                let m = outerSize$1(this.child);
                while (m.height > document.documentElement.clientHeight) {
                    let tr = this.child.querySelector('tr:last-child');
                    if (tr) {
                        tr.parentElement.removeChild(tr);
                    }
                    else {
                        break;
                    }
                    m = outerSize$1(this.child);
                }
                if (props.position.clientX + m.width >= document.documentElement.clientWidth) {
                    this.child.style.right = '0';
                }
                let moveTop = true;
                if (props.position.clientY + m.height >= document.documentElement.clientHeight) {
                    if (props.position.clientY - m.height > 0) {
                        this.child.style.bottom = '0';
                    }
                    else {
                        moveTop = false;
                    }
                }
                if (moveTop) {
                    this.element.style.top = `${props.position.clientY}px`;
                }
                this.element.style.left = `${props.position.clientX}px`;
            }
        }
        finalize() {
            if (this.element) {
                document.body.removeChild(this.element);
            }
            this.element = null;
        }
    }
    function getRows(item, options) {
        const rows = [];
        for (let columnName in item) {
            if (columnName === GL_ORDINAL) {
                continue;
            }
            if (isInternalFieldName(columnName)) {
                continue;
            }
            if (options && options.exclude) {
                if (options.exclude(columnName)) {
                    continue;
                }
            }
            let value = item[columnName];
            let content;
            if (options && options.displayValue) {
                content = options.displayValue(value);
            }
            else {
                switch (value) {
                    case null:
                        content = createElement("i", null, "null");
                        break;
                    case undefined:
                        content = createElement("i", null, "undefined");
                        break;
                    default:
                        content = value.toString();
                }
            }
            rows.push({
                cells: [
                    { content: columnName + ':' },
                    { content }
                ]
            });
        }
        return rows;
    }
    const renderTooltip = (props) => {
        return props.rows.length === 0 ? null : (createElement("div", { className: `${props.cssPrefix}tooltip` }, Table$1({ rows: props.rows })));
    };

    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    const { defaultView: defaultView$1 } = defaults;
    let didRegisterColorSchemes = false;
    /**
     * Component to view a SandDance data visualization.
     */
    class Viewer {
        /**
         * Instantiate a new Viewer.
         * @param element Parent HTMLElement to present within.
         * @param options Optional viewer options object.
         */
        constructor(element, options) {
            this.element = element;
            this.options = deepMerge(defaultViewerOptions, options);
            this.presenter = new Presenter(element, getPresenterStyle(this.options));
            this._dataScope = new DataScope();
            this._animator = new Animator(this._dataScope, {
                onDataChanged: this.onDataChanged.bind(this),
                onAnimateDataChange: this.onAnimateDataChange.bind(this)
            });
            this._details = new Details(this.presenter.getElement(PresenterElement.panel), this.options.language, this._animator, this._dataScope, remap => {
                this.currentColorContext = ~~remap;
                this.renderSameLayout();
            }, () => this.insight && this.insight.columns && !!this.insight.columns.color && this.colorContexts && this.colorContexts.length > 1);
            this.insight = {};
        }
        changeColorContexts(colorContexts) {
            this.colorContexts = colorContexts;
            this.currentColorContext = 0;
            this.options.onColorContextChange && this.options.onColorContextChange();
        }
        applyLegendColorContext(colorContext) {
            const a = getActiveElementInfo();
            mount(colorContext.legendElement, this.presenter.getElement(PresenterElement.legend));
            setActiveElement(a);
            this.presenter.stage.legend = colorContext.legend;
        }
        onAnimateDataChange(dataChange, waitingLabel, handlerLabel) {
            return new Promise((resolve, reject) => {
                let innerPromise;
                if (dataChange === DataLayoutChange.refine) {
                    const oldColorContext = this.colorContexts[this.currentColorContext];
                    innerPromise = new Promise(innerResolve => {
                        this.renderNewLayout({}, {
                            preStage: (stage, deckProps) => {
                                finalizeLegend(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
                                this.overrideAxisLabels(stage);
                                applyColorMapToCubes([oldColorContext.colorMap], getCubes(deckProps));
                                if (this.options.onStage) {
                                    this.options.onStage(stage, deckProps);
                                }
                            }
                        }).then(() => {
                            //apply old legend
                            this.applyLegendColorContext(oldColorContext);
                            innerResolve();
                        });
                    });
                }
                else {
                    innerPromise = this.renderNewLayout({}, {
                        preStage: (stage, deckProps) => {
                            finalizeLegend(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
                            this.overrideAxisLabels(stage);
                            if (this.options.onStage) {
                                this.options.onStage(stage, deckProps);
                            }
                        }
                    });
                }
                innerPromise.then(() => {
                    this.presenter.animationQueue(resolve, this.options.transitionDurations.position, { waitingLabel, handlerLabel, animationCanceled: reject });
                });
            });
        }
        onDataChanged(dataLayout, filter) {
            return __awaiter(this, void 0, void 0, function* () {
                switch (dataLayout) {
                    case DataLayoutChange.same: {
                        this.renderSameLayout();
                        break;
                    }
                    case DataLayoutChange.refine: {
                        //save cube colors
                        const oldColorContext = this.colorContexts[this.currentColorContext];
                        let colorMap;
                        yield this.renderNewLayout({}, {
                            preStage: (stage, deckProps) => {
                                //save off the spec colors
                                colorMap = colorMapFromCubes(stage.cubeData);
                                applyColorMapToCubes([oldColorContext.colorMap], getCubes(deckProps));
                                this.preStage(stage, deckProps);
                            },
                            onPresent: () => {
                                //save new legend
                                const newColorContext = {
                                    colorMap,
                                    legend: clone(this.presenter.stage.legend),
                                    legendElement: this.presenter.getElement(PresenterElement.legend).children[0]
                                };
                                //apply old legend
                                this.applyLegendColorContext(oldColorContext);
                                this.changeColorContexts([oldColorContext, newColorContext]);
                            }
                        });
                        //narrow the filter only if it is different
                        if (!compare(this.insight.filter, filter)) {
                            this.insight.filter = narrow(this.insight.filter, filter);
                        }
                        if (this.options.onDataFilter) {
                            this.options.onDataFilter(this.insight.filter, this._dataScope.currentData());
                        }
                        break;
                    }
                    case DataLayoutChange.reset: {
                        const colorContext = {
                            colorMap: null,
                            legend: null,
                            legendElement: null
                        };
                        this.changeColorContexts([colorContext]);
                        yield this.renderNewLayout({}, {
                            onPresent: () => {
                                populateColorContext(colorContext, this.presenter);
                            }
                        });
                        delete this.insight.filter;
                        if (this.options.onDataFilter) {
                            this.options.onDataFilter(null, null);
                        }
                        break;
                    }
                }
                if (this.options.onSelectionChanged) {
                    const sel = this.getSelection();
                    this.options.onSelectionChanged((sel && sel.search) || null, 0, (sel && sel.selectedData) || null);
                }
            });
        }
        getSpecColumnsWithFilteredStats() {
            if (!this._dataScope.hasFilteredData()) {
                return this._specColumns;
            }
            const roles = ['color', 'facet', 'group', 'size', 'sort', 'sum', 'x', 'y', 'z'];
            const specColumns = Object.assign({}, this._specColumns);
            roles.forEach(r => {
                if (specColumns[r]) {
                    const column = Object.assign({}, specColumns[r]);
                    column.stats = this.getColumnStats(column);
                    specColumns[r] = column;
                }
            });
            return specColumns;
        }
        renderNewLayout(signalValues, presenterConfig, view) {
            return __awaiter(this, void 0, void 0, function* () {
                const currData = this._dataScope.currentData();
                const context = { specColumns: this.getSpecColumnsWithFilteredStats(), insight: this.insight, specViewOptions: this.options };
                const specResult = build(context, currData);
                if (!specResult.errors) {
                    const uiValues = extractSignalValuesFromView(this.vegaViewGl, this.vegaSpec);
                    applySignalValues(Object.assign(Object.assign({}, uiValues), signalValues), specResult.vegaSpec);
                    this.vegaSpec = specResult.vegaSpec;
                    this.options.onVegaSpec && this.options.onVegaSpec(this.vegaSpec);
                    this.specCapabilities = specResult.specCapabilities;
                    const config = this.createConfig(presenterConfig);
                    if (view) {
                        config.getView = () => view;
                    }
                    if (!didRegisterColorSchemes) {
                        registerColorSchemes(base.vega);
                        didRegisterColorSchemes = true;
                    }
                    try {
                        if (this.vegaViewGl) {
                            this.vegaViewGl.finalize();
                        }
                        const runtime = base.vega.parse(this.vegaSpec);
                        this.vegaViewGl = new ViewGl(runtime, config)
                            .renderer('deck.gl')
                            .initialize(this.element);
                        yield this.vegaViewGl.runAsync();
                        //capture new color color contexts via signals
                        this.configForSignalCapture(config.presenterConfig);
                    }
                    catch (e) {
                        specResult.errors = [e.message];
                    }
                    if (!specResult.errors) {
                        ensureHeaders(this.presenter, this.options.language.headers);
                    }
                }
                if (specResult.errors) {
                    if (this.options.onError) {
                        this.options.onError(specResult.errors);
                    }
                    else if (this.presenter.logger) {
                        this.presenter.logger(`errors rendering Vega spec:${specResult.errors.join('\n')}`);
                    }
                }
                return specResult;
            });
        }
        /**
         * Render the same layout with new options.
         * @param newViewerOptions New options object.
         */
        renderSameLayout(newViewerOptions) {
            const colorContext = this.colorContexts[this.currentColorContext];
            const clonedCubes = this.presenter.getCubeData().map(cube => {
                return Object.assign({}, cube);
            });
            this.applyLegendColorContext(colorContext);
            let { axes, textData } = this.presenter.stage;
            let recoloredAxes;
            if (newViewerOptions) {
                if (newViewerOptions.colors) {
                    recoloredAxes = recolorAxes(this.presenter.stage, this._lastColorOptions, newViewerOptions.colors);
                    this._lastColorOptions = clone(newViewerOptions.colors);
                    axes = recoloredAxes.axes || axes;
                    textData = recoloredAxes.textData || textData;
                }
                this.options = deepMerge(this.options, newViewerOptions);
            }
            let colorMaps = [colorContext.colorMap];
            let colorMethod;
            const hasSelectedData = this._dataScope.hasSelectedData();
            const hasActive = !!this._dataScope.active;
            if (hasSelectedData || hasActive) {
                const selectedColorMap = getSelectedColorMap(this._dataScope.currentData(), hasSelectedData, hasActive, this.options);
                colorMaps.push(selectedColorMap);
                colorMethod = this.options.colors.unselectedColorMethod;
            }
            applyColorMapToCubes(colorMaps, clonedCubes, colorMethod);
            const stage = { cubeData: clonedCubes, axes, textData };
            this.vegaViewGl.presenter.rePresent(stage, this.createConfig().presenterConfig);
        }
        getView(view) {
            if (view === undefined) {
                if (this.presenter.view === null) {
                    return defaultView$1;
                }
                else {
                    return this.presenter.view;
                }
            }
            else {
                return view;
            }
        }
        transformData(values, transform) {
            try {
                const runtime = base.vega.parse({
                    $schema: 'https://vega.github.io/schema/vega/v4.json',
                    data: [{
                            name: 'source',
                            values,
                            transform
                        }]
                });
                new ViewGl(runtime).run();
            }
            catch (e) {
                // continue regardless of error
            }
            return values;
        }
        /**
         * Render data into a visualization.
         * @param insight Object to create a visualization specification.
         * @param data Array of data objects.
         * @param view Optional View to specify camera type.
         * @param ordinalMap Optional map of ordinals to assign to the data such that the same cubes can be re-used for new data.
         */
        render(insight, data, options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                let result;
                //see if refine expression has changed
                if (!compare(insight.filter, this.insight.filter)) {
                    const allowAsyncRenderTime = 100;
                    if (insight.filter) {
                        //refining
                        result = yield this._render(insight, data, options);
                        this.presenter.animationQueue(() => {
                            this.filter(insight.filter, options.rebaseFilter && options.rebaseFilter());
                        }, allowAsyncRenderTime, { waitingLabel: 'layout before refine', handlerLabel: 'refine after layout' });
                    }
                    else {
                        //not refining
                        this._dataScope.setFilteredData(null);
                        result = yield this._render(insight, data, options);
                        this.presenter.animationQueue(() => {
                            this.reset();
                        }, allowAsyncRenderTime, { waitingLabel: 'layout before reset', handlerLabel: 'reset after layout' });
                    }
                }
                else {
                    result = yield this._render(insight, data, options);
                }
                return result;
            });
        }
        shouldViewstateTransition(newInsight, oldInsight) {
            if (!oldInsight.columns)
                return false;
            if (oldInsight.chart !== newInsight.chart)
                return true;
            if (oldInsight.size.height !== newInsight.size.height)
                return true;
            if (oldInsight.size.width !== newInsight.size.width)
                return true;
            if (oldInsight.columns.facet !== newInsight.columns.facet)
                return true;
            return false;
        }
        configForSignalCapture(presenterConfig) {
            const colorContext = {
                colorMap: null,
                legend: null,
                legendElement: null
            };
            //now be ready to capture color changing signals 
            presenterConfig.preStage = (stage, deckProps) => {
                if (this._shouldSaveColorContext()) {
                    //save off the colors from Vega layout
                    colorContext.colorMap = colorMapFromCubes(stage.cubeData);
                }
                this.preStage(stage, deckProps);
            };
            presenterConfig.onPresent = () => {
                if (this._shouldSaveColorContext()) {
                    populateColorContext(colorContext, this.presenter);
                    this.changeColorContexts([colorContext]);
                    this._dataScope.deselect();
                }
            };
        }
        _render(insight, data, options) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this._tooltip) {
                    this._tooltip.finalize();
                    this._tooltip = null;
                }
                if (this._dataScope.setData(data, options.columns)) {
                    //apply transform to the data
                    this.transformData(data, insight.transform);
                }
                this._specColumns = getSpecColumns(insight, this._dataScope.getColumns(options.columnTypes));
                const ordinalMap = assignOrdinals(this._specColumns, data, options.ordinalMap);
                this.insight = clone(insight);
                this._lastColorOptions = clone(this.options.colors);
                this._shouldSaveColorContext = () => !options.initialColorContext;
                const colorContext = options.initialColorContext || {
                    colorMap: null,
                    legend: null,
                    legendElement: null
                };
                const specResult = yield this.renderNewLayout(insight.signalValues, {
                    preStage: (stage, deckProps) => {
                        if (this._shouldSaveColorContext()) {
                            //save off the colors from Vega layout
                            colorContext.colorMap = colorMapFromCubes(stage.cubeData);
                        }
                        else {
                            //apply passed colorContext
                            applyColorMapToCubes([colorContext.colorMap], getCubes(deckProps));
                        }
                        //if items are selected, repaint
                        const hasSelectedData = !!this._dataScope.hasSelectedData();
                        const hasActive = !!this._dataScope.active;
                        if (this._dataScope.hasSelectedData() || this._dataScope.active) {
                            const selectedColorMap = getSelectedColorMap(this._dataScope.currentData(), hasSelectedData, hasActive, this.options);
                            applyColorMapToCubes([colorContext.colorMap, selectedColorMap], stage.cubeData, this.options.colors.unselectedColorMethod);
                        }
                        this.preStage(stage, deckProps);
                    },
                    onPresent: () => {
                        if (this._shouldSaveColorContext()) {
                            populateColorContext(colorContext, this.presenter);
                            this.changeColorContexts([colorContext]);
                        }
                        else {
                            //apply passed colorContext
                            this.applyLegendColorContext(colorContext);
                        }
                    },
                    shouldViewstateTransition: () => this.shouldViewstateTransition(insight, this.insight)
                }, this.getView(insight.view));
                //future signal changes should save the color context
                this._shouldSaveColorContext = () => !options.discardColorContextUpdates || !options.discardColorContextUpdates();
                this._details.render();
                const result = { ordinalMap, specResult };
                return result;
            });
        }
        overrideAxisLabels(stage) {
            // if (this._specColumns.x && this._specColumns.x.type === 'date') {
            //     stage.axes.x.forEach(axis => makeDateRange(
            //         axis.tickText,
            //         this.getColumnStats(this._specColumns.x)
            //     ));
            // }
            // if (this._specColumns.y && this._specColumns.y.type === 'date') {
            //     stage.axes.y.forEach(axis => makeDateRange(
            //         axis.tickText,
            //         this.getColumnStats(this._specColumns.y)
            //     ));
            // }
        }
        preStage(stage, deckProps) {
            const onClick = (e, search) => {
                if (this.options.onAxisClick) {
                    this.options.onAxisClick(e, search);
                }
                else {
                    this.select(search);
                }
            };
            this.overrideAxisLabels(stage);
            const polygonLayer = axisSelectionLayer(this.presenter, this.specCapabilities, this._specColumns, stage, onClick, this.options.colors.axisSelectHighlight, this.options.selectionPolygonZ);
            const order = 1; //after textlayer but before others
            deckProps.layers.splice(order, 0, polygonLayer);
            finalizeLegend(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
            if (this.options.onStage) {
                this.options.onStage(stage, deckProps);
            }
        }
        onCubeClick(e, cube) {
            const hasSelectedData = this._dataScope.hasSelectedData();
            if (hasSelectedData && this._dataScope.selection.included.length > 1) {
                //if active is within selection, keep the selection and activate the one.
                const indexWithinSelection = this._dataScope.ordinalIndexWithinSelection(cube.ordinal);
                if (indexWithinSelection.index >= 0) {
                    this.activate(indexWithinSelection.datum);
                    this._details.populate(this._dataScope.selection, indexWithinSelection.index);
                    if (this.options.onSelectionChanged) {
                        const sel = this.getSelection();
                        this.options.onSelectionChanged(sel.search, indexWithinSelection.index, sel.selectedData);
                    }
                    return;
                }
            }
            if (hasSelectedData && this._dataScope.selection.included.length === 1 && this._dataScope.selection.included[0][GL_ORDINAL] === cube.ordinal) {
                this.deselect();
                return;
            }
            const search = {
                name: GL_ORDINAL,
                operator: '==',
                value: cube.ordinal
            };
            this.select(search);
        }
        onCubeHover(e, cube) {
            if (this._tooltip) {
                this._tooltip.finalize();
                this._tooltip = null;
            }
            if (!cube) {
                return;
            }
            const currentData = this._dataScope.currentData();
            const index = getDataIndexOfCube(cube, currentData);
            if (index >= 0) {
                this._tooltip = new Tooltip({
                    options: this.options.tooltipOptions,
                    item: currentData[index],
                    position: e,
                    cssPrefix: this.presenter.style.cssPrefix
                });
            }
        }
        onTextHover(e, t) {
            //return true if highlight color is different
            if (!t || !this.options.getTextColor || !this.options.getTextHighlightColor)
                return false;
            return !colorIsEqual(this.options.getTextColor(t), this.options.getTextHighlightColor(t));
        }
        createConfig(c) {
            const { getTextColor, getTextHighlightColor, onTextClick } = this.options;
            const defaultPresenterConfig = {
                getTextColor,
                getTextHighlightColor,
                onTextClick: (e, t) => {
                    if (t.metaData && t.metaData.search) {
                        const search = getSearchGroupFromVegaValue(t.metaData.search);
                        if (this.options.onAxisClick) {
                            this.options.onAxisClick(e, search);
                        }
                        else {
                            this.select(search);
                        }
                    }
                    if (onTextClick) {
                        onTextClick(e, t);
                    }
                },
                onCubeClick: this.onCubeClick.bind(this),
                onCubeHover: this.onCubeHover.bind(this),
                onTextHover: this.onTextHover.bind(this),
                preStage: this.preStage.bind(this),
                onPresent: this.options.onPresent,
                onLayerClick: (info, e) => {
                    if (!info || !info.object) {
                        this.deselect();
                    }
                },
                onLegendClick: (e, legend, clickedIndex) => {
                    const legendRow = clickedIndex !== null && legend.rows[clickedIndex];
                    if (legendRow) {
                        if (this.options.onLegendRowClick) {
                            this.options.onLegendRowClick(e, legendRow);
                        }
                        else {
                            this.select(legendRow.search);
                        }
                    }
                    else if (this.options.onLegendHeaderClick) {
                        //header clicked
                        this.options.onLegendHeaderClick(e);
                    }
                },
                onSceneRectAssignCubeOrdinal: datum => {
                    //TODO see if datum is a facet selection rect
                    return datum[GL_ORDINAL];
                },
                onTargetViewState: (h, w) => {
                    const { height, width } = this.insight.size;
                    let newViewStateTarget;
                    if (this.options.onNewViewStateTarget) {
                        newViewStateTarget = this.options.onNewViewStateTarget();
                    }
                    return { height, width, newViewStateTarget };
                },
                preserveDrawingBuffer: this.options.preserveDrawingBuffer
            };
            if (this.options.onBeforeCreateLayers) {
                defaultPresenterConfig.preLayer = stage => this.options.onBeforeCreateLayers(stage, this.specCapabilities);
            }
            const config = {
                presenter: this.presenter,
                presenterConfig: Object.assign(defaultPresenterConfig, c)
            };
            if (this.options.transitionDurations) {
                config.presenterConfig.transitionDurations = this.options.transitionDurations;
            }
            return config;
        }
        /**
         * Filter the data and animate.
         * @param search Filter expression, see https://vega.github.io/vega/docs/expressions/
         * @param rebase Optional flag to apply to entire dataset. A false value will apply the filter upon any existing filter.
         */
        filter(search, rebase = false) {
            const u = this._dataScope.createUserSelection(search, false, rebase);
            return new Promise((resolve, reject) => {
                this._animator.filter(search, u.included, u.excluded, rebase).then(() => {
                    this._details.clear();
                    this._details.clearSelection();
                    this._details.populate(this._dataScope.selection);
                    resolve();
                });
            });
        }
        /**
         * Remove any filtration and animate.
         */
        reset() {
            return new Promise((resolve, reject) => {
                this._animator.reset().then(() => {
                    this._details.clear();
                    this._details.clearSelection();
                    resolve();
                });
            });
        }
        /**
         * Select cubes by a filter expression.
         * @param search Filter expression, see https://vega.github.io/vega/docs/expressions/
         */
        select(search) {
            return new Promise((resolve, reject) => {
                this._animator.select(search).then(() => {
                    this._details.populate(this._dataScope.selection);
                    resolve();
                });
            });
        }
        /**
         * Removes any selection.
         */
        deselect() {
            return new Promise((resolve, reject) => {
                this._animator.deselect().then(() => {
                    this._details.clearSelection();
                    resolve();
                });
            });
        }
        /**
         * Gets the current selection.
         */
        getSelection() {
            if (!this._dataScope)
                return null;
            const selectionState = {
                search: (this._dataScope.selection && this._dataScope.selection.search) || null,
                selectedData: (this._dataScope.selection && this._dataScope.selection.included) || null,
                active: this._dataScope.active
            };
            return selectionState;
        }
        /**
         * Set one data row to the active state.
         */
        activate(datum) {
            return new Promise((resolve, reject) => {
                this._animator.activate(datum).then(() => {
                    this._details.render();
                    resolve();
                });
            });
        }
        /**
         * Deactivate item.
         */
        deActivate() {
            return new Promise((resolve, reject) => {
                if (this._dataScope && this._dataScope.active) {
                    this._animator.deactivate().then(() => {
                        this._details.render();
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        }
        /**
         * Gets the current insight with signal values.
         */
        getInsight() {
            const insight = Object.assign({}, this.insight);
            insight.signalValues = this.getSignalValues();
            return insight;
        }
        /**
         * Gets column stats from current data (filtered or all).
         * @param column Column to get stats for.
         */
        getColumnStats(column) {
            return this._dataScope.hasFilteredData() ? this._dataScope.getFilteredColumnStats(column.name) : column.stats;
        }
        /**
         * Gets current signal values.
         */
        getSignalValues() {
            return extractSignalValuesFromView(this.vegaViewGl, this.vegaSpec);
        }
        finalize() {
            if (this._dataScope)
                this._dataScope.finalize();
            if (this._details)
                this._details.finalize();
            if (this._tooltip)
                this._tooltip.finalize();
            if (this.vegaViewGl)
                this.vegaViewGl.finalize();
            if (this.presenter)
                this.presenter.finalize();
            if (this.element)
                this.element.innerHTML = '';
            this.colorContexts = null;
            this.element = null;
            this.options = null;
            this.presenter = null;
            this.vegaSpec = null;
            this.vegaViewGl = null;
            this._animator = null;
            this._dataScope = null;
            this._details = null;
            this._tooltip = null;
        }
    }
    /**
     * Default Viewer options.
     */
    Viewer.defaultViewerOptions = defaultViewerOptions;

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    const version = '3.0.2';

    // Copyright (c) Microsoft Corporation. All rights reserved.
    const use$1 = use;

    exports.VegaDeckGl = index$2;
    exports.Viewer = Viewer;
    exports.colorSchemes = colorSchemes;
    exports.constants = constants;
    exports.searchExpression = index$1;
    exports.specs = index;
    exports.types = types;
    exports.use = use$1;
    exports.util = util$1;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
