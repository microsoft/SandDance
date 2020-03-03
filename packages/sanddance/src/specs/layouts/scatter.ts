// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    Mark,
    RangeScheme,
    Scale,
    Signal,
    RectMark,
    LinearScale
} from 'vega-typings';
import { ScaleNames, SignalNames } from '../constants';
import { fill, opacity } from '../fill';
import { linearScale, pointScale } from '../scales';
import { SpecContext, Column } from '../types';
import { testForCollapseSelection } from '../selection';
import { Layout, LayoutProps, LayoutBuildProps } from './layout';
import { InnerScope, DiscreteColumn } from '../interfaces';
import { addScale, addData } from '../scope';

export interface ScatterProps extends LayoutProps {
    x: Column;
    y: Column;
    z: Column;
}

export class Scatter extends Layout {
    private names: {
        xScale: string,
        yScale: string
    };

    constructor(public props: ScatterProps & LayoutBuildProps) {
        super(props);
        const p = this.prefix = `scatter_${this.id}`;
        this.names = {
            xScale: `${p}_scale_x`,
            yScale: `${p}_scale_y`
        };
    }

//     public build(): InnerScope {
//         const { globalScope, parentScope } = this.props;

        //TODO clean data in global scope
        // filterInvalidWhenNumeric(specColumns.x),
        // filterInvalidWhenNumeric(specColumns.y),
        // filterInvalidWhenNumeric(specColumns.z),

//         //this needs to be global since the scale depends on it
//         // addData(globalScope.scope,
//         //     {
//         //         name: names.globalAggregateData,
//         //         source: globalScope.dataName,
//         //         transform: [
//         //             {
//         //                 type: 'extent',
//         //                 field: aggregation,
//         //                 signal: names.globalAggregateExtentSignal
//         //             }
//         //         ]
//         //     },
//         //     {
//         //         name: names.accumulative,
//         //         source: bin.fullScaleDataname,
//         //         transform: [
//         //             {
//         //                 type: 'aggregate',
//         //                 groupby: this.getGrouping(),
//         //                 ops: ['count']
//         //             }
//         //         ]
//         //     }
//         // );

//         //TODO use main scales 
// //        addScale(this.getScales())
//         //push(scales, getScales(specContext));
//         //push(signals, getSignals(specContext));

//         //const mark = getMark(specContext, this.props.parent.dataName);
//         //this.props.parent.scope.marks = [mark];

//         // const mark: RectMark = {
//         //     name: this.prefix,
//         //     type: 'rect',
//         //     from: {
//         //         data: parentScope.dataName
//         //     },
//         //     encode: {
//         //         update: {
//         //             x: {
//         //                 scale: 
//         //             }
//         //             height: {
//         //                 signal: fillDirection === 'down-right' ? names.size : names.levelSize
//         //             },
//         //             width: {
//         //                 signal: fillDirection === 'down-right' ? names.levelSize : names.size
//         //             }
//         //         }
//         //     }
//         // };

//         return {
//             dataName: null,
//             sizeSignals: {
//                 layoutHeight: null,
//                 layoutWidth: null
//             },
//             globalScales: {
//                 x: null,
//                 y: null,
//                 z: null
//             },
//             mark
//         };
//     }

//     private getScales() {
//         const { names } = this;
//         const xScale: LinearScale = {
//             type: 'linear',
//             name: names.yScale,
//             domain: [
//                 0,
//                 {
//                     signal: names.globalAggregateMaxExtentSignal
//                 }
//             ],
//             range: [
//                 {
//                     signal: parentScope.sizeSignals.layoutHeight
//                 },
//                 0
//             ],
//             nice: true,
//             zero: true
//         };
//     }
}

// function getMark(source: string) {
//     const mark: Mark = {
//         type: 'group',
//         from: {
//             facet: {
//                 name: 'f1',
//                 data: dataSource,
//                 groupby: ['x', 'y']
//             }
//         },
//         encode: {
//             update: {
//                 x: {
//                     scale: ScaleNames.X,
//                     field: specColumns.x.name,
//                     offset: 1
//                 },
//                 width: { signal: SignalNames.PointSize },
//                 y: [
//                     {
//                         scale: ScaleNames.Y,
//                         test: testForCollapseSelection(),
//                         signal: `${SignalNames.YDomain}[0]`
//                     },
//                     {
//                         scale: ScaleNames.Y,
//                         field: specColumns.y.name,
//                         offset: {
//                             signal: `-${SignalNames.PointSize}`
//                         }
//                     }
//                 ],
//                 height: [
//                     {
//                         test: testForCollapseSelection(),
//                         value: 0
//                     },
//                     {
//                         signal: SignalNames.PointSize
//                     }
//                 ],
//                 fill: fill(context),
//                 opacity: opacity(context)
//             }
//         }
//     };
//     if (specColumns.z) {
//         const update = mark.encode.update;
//         update.z = [
//             {
//                 test: testForCollapseSelection(),
//                 value: 0
//             },
//             {
//                 scale: ScaleNames.Z,
//                 field: specColumns.z.name
//             }
//         ];
//         update.depth = { signal: SignalNames.PointSize };
//     }
//     return mark;
// }

// function getScales(context: SpecContext) {
//     const { specColumns } = context;
//     const heightRange: RangeScheme = [{ signal: 'child_height' }, 0];
//     const widthRange: RangeScheme = [0, { signal: 'child_width' }];
//     const scales: Scale[] = [
//         (
//             specColumns.x.quantitative ?
//                 linearScale(ScaleNames.X, DataNames.Main, specColumns.x.name, widthRange, false, false)
//                 :
//                 pointScale(ScaleNames.X, DataNames.Main, widthRange, specColumns.x.name)
//         ),
//         (
//             specColumns.y.quantitative ?
//                 linearScale(ScaleNames.Y, DataNames.Main, specColumns.y.name, heightRange, false, false)
//                 :
//                 pointScale(ScaleNames.Y, DataNames.Main, heightRange, specColumns.y.name, true)
//         )
//     ];
//     return scales;
// }

// function getSignals(context: SpecContext) {
//     const { specViewOptions } = context;
//     const signals: Signal[] = [
//         {
//             name: SignalNames.YDomain,
//             update: `domain('${ScaleNames.Y}')`
//         },
//         {
//             name: SignalNames.PointSize,
//             value: 5,
//             bind: {
//                 name: specViewOptions.language.scatterPointSize,
//                 debounce: 50,
//                 input: 'range',
//                 min: 1,
//                 max: 25,
//                 step: 1
//             }
//         }
//     ];
//     return signals;
// }
