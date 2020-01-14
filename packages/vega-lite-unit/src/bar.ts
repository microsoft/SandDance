// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as Vega from 'vega-typings';
import { FacetEncodingFieldDef } from 'vega-lite/build/src/spec/facet';
import { Field, TypedFieldDef, PositionFieldDef } from 'vega-lite/build/src/channeldef';
import { StandardType } from 'vega-lite/build/src/type';
import { TopLevelUnitSpec } from 'vega-lite/build/src/spec/unit';

export type UnitStyle = 'square' | 'treemap' | 'strip' | 'normalize';

interface TransformItem<T extends Vega.Transforms> {
    transform: T;
    i: number;
}

interface BarChartInfo {
    aggregateEncoding: TypedFieldDef<string, StandardType>;
    bandEncoding: TypedFieldDef<string, StandardType>;
    isBar: boolean;
    bandDim: string;
    countDim: string;
    countSize: string;
    quantitativeBand?: boolean;
    bandScaleName?: string;
    data0: Vega.Data;
    binData0?: Vega.Data;
    bandGroup?: string;
    facetQuantitative?: boolean;
}

export function unitizeBar(inputSpec: TopLevelUnitSpec, outputSpec: Vega.Spec, unitStyle: UnitStyle) {
    const xEncoding = inputSpec.encoding.x as TypedFieldDef<string, StandardType>;
    const yEncoding = inputSpec.encoding.y as TypedFieldDef<string, StandardType>;
    const facet = inputSpec.encoding.facet;
    const data0 = outputSpec.data[0] as Vega.SourceData;
    const data0Url = outputSpec.data[0] as Vega.UrlData;
    let bandBinTransform: Vega.BinTransform;

    let info: BarChartInfo;
    if (xEncoding.aggregate) {
        info = {
            data0,
            isBar: true,
            bandDim: 'y',
            countDim: 'x',
            countSize: 'child_width',
            bandEncoding: yEncoding,
            aggregateEncoding: xEncoding
        };
    } else {
        info = {
            data0,
            isBar: false,
            bandDim: 'x',
            countDim: 'y',
            countSize: 'child_height',
            bandEncoding: xEncoding,
            aggregateEncoding: yEncoding
        };
    }
    info.quantitativeBand = info.bandEncoding.type === 'quantitative';
    info.facetQuantitative = facet && facet.type === 'quantitative';

    const zeroData: Vega.Data = {
        name: 'source_00',
        url: data0Url.url,
        format: data0Url.format
    };
    outputSpec.data.unshift(zeroData);

    data0.source = 'source_00';
    delete data0Url.url;
    delete data0.format;

    if (info.quantitativeBand) {
        bandBinTransform = findBinTransform(data0, info.bandEncoding.field).transform;

        zeroData.transform = [
            data0.transform.shift(),
            data0.transform.shift()
        ];

        info.binData0 = zeroData;

        info.bandGroup = bandBinTransform.as[0];
        info.bandScaleName = 'quantBand';
        const binSignalName = bandBinTransform.signal;

        //add sequence if quantitative
        addSequence(outputSpec.data, binSignalName);

        //create band scale from linear scale
        const linearScale = findScaleByName<Vega.LinearScale>(outputSpec.scales, info.bandDim);
        const range = linearScale.range as any;
        addBandScale(outputSpec.scales, 'quantBand', range);

    } else {
        info.binData0 = data0;

        info.bandScaleName = info.bandDim;
        info.bandGroup = info.bandEncoding.field;

        const bandScale = findScaleByName<Vega.BandScale>(outputSpec.scales, info.bandDim);
        modifyBandScale(bandScale);
    }

    if (info.facetQuantitative) {
        info.binData0 = zeroData;
        zeroData.transform = zeroData.transform || [];
        zeroData.transform.push(data0.transform.shift());
        zeroData.transform.push(data0.transform.shift());
    }

    //add signals
    outputSpec.signals = outputSpec.signals || [];
    addSignals(outputSpec.signals, info.bandScaleName, !facet);

    const markAndGroupBy = facet ?
        unitizeFaceted(info, outputSpec, facet)
        :
        unitizeBasic(info, outputSpec)
        ;

    //remove single rect
    markAndGroupBy.marks.shift();

    //add a facet for the column
    const fromFacet: Vega.Facet = {
        name: 'bandfacet_0',
        data: facet ? 'facet' : 'source_00',
        groupby: markAndGroupBy.groupby
    };
    let aggField: string;
    switch (info.aggregateEncoding.aggregate) {
        case 'count': {
            aggField = 'count'
            break;
        }
        case 'sum': {
            const aggregateTransform = findAggregateTransform(info.data0);
            fromFacet.aggregate = {
                as: aggregateTransform.as as string[],
                fields: aggregateTransform.fields as string[],
                ops: aggregateTransform.ops as string[]
            }
            aggField = aggregateTransform.as[0];
            break;
        }
    }
    const barFacet: Vega.Mark = {
        name: 'bandfacet',
        type: 'group',
        from: {
            facet: fromFacet
        },
        signals: [],
        encode: {
            update: info.isBar
                ?
                {
                    y: {
                        signal: `scale('${info.bandDim}', datum['${info.bandGroup}'])${info.quantitativeBand ? '-bandWidth' : ''}`
                    },
                    height: {
                        signal: `bandWidth`
                    },
                    x: {
                        signal: `scale('${info.countDim}', 0)`
                    },
                    width: {
                        signal: `scale('${info.countDim}', datum['${aggField}'])`
                    }
                }
                :
                {
                    x: {
                        signal: `scale('${info.bandDim}', datum['${info.bandGroup}'])`
                    },
                    width: {
                        signal: `bandWidth`
                    },
                    y: {
                        signal: `scale('${info.countDim}', datum['${aggField}'])`
                    },
                    height: {
                        signal: `child_height - scale('${info.countDim}', datum['${aggField}'])`
                    }
                }
        },
        marks: []
    };

    switch (unitStyle) {
        case 'square': {
            squareMarks(info, outputSpec, barFacet);
            break;
        }
        case 'treemap': {
            treeMarks(info, aggField, barFacet);
            break;
        }
    }

    if (facet) {
        const cell = outputSpec.marks.filter(m => m.name === 'cell')[0] as Vega.Mark & Vega.Scope;
        const from = cell.from as Vega.FromFacet & { facet: Vega.Facet; };
        from.facet.data = 'source_00';
    }
    markAndGroupBy.marks.push(barFacet);

    //add maxcount
    data0.transform.push({
        type: "extent",
        field: "__count",
        signal: "maxcount"
    })
}

function unitizeFaceted(info: BarChartInfo, outputSpec: Vega.Spec, facet: FacetEncodingFieldDef<Field>) {
    let groupby: string[];
    //groupby needs to be by facet, then column group
    if (info.facetQuantitative) {
        const bandFacetTransform = findBinTransform(info.binData0, facet.field as string);
        groupby = [
            bandFacetTransform.transform.as[0],
            info.bandGroup
        ];
    } else {
        groupby = [
            facet.field as string,
            info.bandGroup
        ];
    }
    const marks = findMarkWithScope(outputSpec.marks);
    return { marks, groupby };
}

function unitizeBasic(info: BarChartInfo, outputSpec: Vega.Spec) {
    const marks = outputSpec.marks;
    return { marks, groupby: [info.bandGroup] };
}

function treeMarks(info: BarChartInfo, aggField: string, barFacet: Vega.Mark & Vega.Scope) {
    barFacet.signals.push(
        {
            name: 'barWidth',
            update: info.isBar
                ?
                `scale('${info.countDim}', parent['${aggField}'])`
                :
                'bandWidth'
        },
        {
            name: 'barHeight',
            update: info.isBar
                ?
                'bandWidth'
                :
                `child_height - scale('${info.countDim}', parent['${aggField}'])`
        }
    );
    barFacet.data = [
        {
            name: 'treemapData',
            source: 'bandfacet_0',
            transform: [
                {
                    type: 'nest'
                },
                {
                    type: 'treemap',
                    field: info.aggregateEncoding.field,
                    sort: { field: 'value', order: 'descending' },
                    round: true,
                    method: 'squarify',
                    padding: 1,
                    size: [{ signal: 'barWidth' }, { signal: 'barHeight' }]
                }
            ]
        }
    ];
    const treemapMark: Vega.Mark = {
        name: 'treemapMarks',
        type: "rect",
        from: {
            data: "treemapData"
        },
        encode: {
            update: {
                x: { field: "x0" },
                x2: { field: "x1" },
                y: { field: "y0" },
                y2: { field: "y1" }
            }
        }
    };
    barFacet.marks.push(treemapMark);
}

function squareMarks(info: BarChartInfo, outputSpec: Vega.Spec, barFacet: Vega.Mark & Vega.Scope) {
    barFacet.signals.push({
        name: 'ytop',
        update: info.isBar
            ?
            `scale('${info.bandDim}', parent['${info.bandGroup}'])`
            :
            `scale('${info.countDim}', parent['count'])`
    },
    );
    barFacet.data = [
        {
            name: 'squares',
            source: 'bandfacet_0',
            transform: [
                {
                    type: 'window',
                    ops: [
                        'count'
                    ],
                    as: [
                        'squarecount'
                    ]
                },
                {
                    type: "extent",
                    field: "squarecount",
                    signal: "maxsquarecount"
                }
            ]
        }
    ];
    const squareMark: Vega.Mark = {
        name: 'squaremarks',
        type: 'rect',
        from: {
            data: 'squares'
        },
        encode: {
            update: {}
        }
    };
    modifySquareMark(squareMark, info, getPositionCorrection(info));
    barFacet.marks.push(squareMark);

    //only for square
    outputSpec.signals.push.apply(outputSpec.signals, [
        { name: "aspect", update: `bandWidth/${info.countSize}` },
        { name: "cellcount", update: `ceil(sqrt(maxcount[1]*aspect))` },
        { name: "gap", update: "min(0.1*(bandWidth/(cellcount-1)),1)" },
        { name: "marksize", update: "bandWidth/cellcount-gap" }
    ]);
}

function getPositionCorrection(info: BarChartInfo) {
    if (info.quantitativeBand) {
        return info.isBar
            ?
            '( - 0.5 * bandWidth * bandPadding)'
            :
            '(0.75 * bandWidth * bandPadding)'
    }
}

function addSequence(data: Vega.Data[], binSignalName: string) {
    data.push({
        name: "seq",
        transform: [
            {
                type: "sequence",
                start: { signal: `${binSignalName}.start` },
                stop: { signal: `${binSignalName}.stop` },
                step: { signal: `${binSignalName}.step` }
            }
        ]
    });
}

function addSignals(signals: Vega.Signal[], bandScaleName: string, addChildSize: boolean) {
    if (addChildSize) {
        signals.push.apply(signals, [
            { name: "child_width", update: "width" },
            { name: "child_height", update: "height" },
        ]);
    }

    signals.push.apply(signals, [
        { name: "bandWidth", update: `bandwidth('${bandScaleName}')` },
        { name: 'bandPadding', value: 0.1 }
    ]);
}

function addBandScale(scales: Vega.Scale[], name: string, range: Vega.RangeBand) {
    scales.push({
        name,
        type: "band",
        domain: {
            data: "seq",
            field: "data",
            sort: true
        },
        range,
        padding: {
            signal: 'bandPadding'
        }
    });
}

function modifySquareMark(mark0: Vega.Mark, info: BarChartInfo, offsetAdditionExpression?: string) {
    const { update } = mark0.encode;
    const subtractMarksize = !info.isBar;

    const expressions = ['bandWidth /cellcount * ( (datum.squarecount-1) %cellcount)'];
    if (offsetAdditionExpression) {
        expressions.push(offsetAdditionExpression);
    }

    update[info.bandDim] = {
        //scale: info.bandDim,
        //field: info.bandGroup,
        offset: {
            signal: expressions.join(' + ')
        }
    };
    update[info.countDim] = {
        signal: `scale('${info.countDim}', floor((datum.squarecount-1)/cellcount) * cellcount)${subtractMarksize ? '-marksize - ytop' : ''}`
    };

    update.width = update.height = { signal: "marksize" };
    delete update.x2;
    delete update.y2;
}

function modifyBandScale(bandScale: Vega.BandScale) {
    delete bandScale.paddingInner;
    delete bandScale.paddingOuter;
    bandScale.padding = { signal: 'bandPadding' };
}

function findMarkWithScope(ms: Vega.Mark[]) {
    for (let i = 0; i < ms.length; i++) {
        let m = ms[i];
        if (m.type === 'group') {
            const s = m as Vega.Scope;
            if (s.marks) {
                return s.marks;
            }
        }
    }
}

function findAggregateTransform(d: Vega.Data) {
    for (let i = 0; i < d.transform.length; i++) {
        let transform = d.transform[i];
        if (transform.type === 'aggregate') {
            return transform;
        }
    }
}

function findBinTransform(d: Vega.Data, fieldName: string) {
    for (let i = 0; i < d.transform.length; i++) {
        let transform = d.transform[i];
        if (transform.type === 'bin' && transform.field === fieldName) {
            return { transform, i } as TransformItem<Vega.BinTransform>;
        }
    }
}

function findScaleByName<T extends Vega.Scale>(scales: Vega.Scale[], name: string) {
    for (let i = 0; i < scales.length; i++) {
        if (scales[i].name === name) {
            return scales[i] as T;
        }
    }
}

export function isPercent(inputSpec: TopLevelUnitSpec) {
    const xEncodingStacked = inputSpec.encoding.x as PositionFieldDef<string>;
    const yEncodingStacked = inputSpec.encoding.y as PositionFieldDef<string>;
    if (xEncodingStacked.stack && xEncodingStacked.stack === 'normalize') return true;
    if (yEncodingStacked.stack && yEncodingStacked.stack === 'normalize') return true;
    return false;
}

export function getSumField(inputSpec: TopLevelUnitSpec) {
    const xEncodingStacked = inputSpec.encoding.x as PositionFieldDef<string>;
    const yEncodingStacked = inputSpec.encoding.y as PositionFieldDef<string>;
    const both = [xEncodingStacked, yEncodingStacked];
    for (let i = 0; i < both.length; i++) {
        let enc = both[i];
        if (enc.aggregate && enc.aggregate === 'sum'){
            return enc.field;
        }
    }
}
