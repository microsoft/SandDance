// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    Axis,
    Mark,
    RangeScheme,
    Scale,
    Signal
} from 'vega-typings';
import { columnToAxisType, partialAxes } from '../axes';
import { DataNames, ScaleNames, SignalNames } from '../constants';
import { fill, opacity } from '../fill';
import { linearScale, pointScale } from '../scales';
import { push } from '../../array';
import { SpecContext } from '../types';
import { testForCollapseSelection } from '../selection';
import { UnitLayout } from './unitLayout';

export class Scatter extends UnitLayout {
    public build(specContext: SpecContext) {

        //TODO clean data in global scope
        // filterInvalidWhenNumeric(specColumns.x),
        // filterInvalidWhenNumeric(specColumns.y),
        // filterInvalidWhenNumeric(specColumns.z),

        //Add scales to global scope
        const { scales, signals } = this.props.global.scope;
        push(scales, getScales(specContext));
        push(signals, getSignals(specContext));

        this.props.parent.scope.marks = [getMark(specContext, this.props.parent.dataName)];
    }
}

function getAxes(context: SpecContext) {
    const { specColumns, specViewOptions } = context;
    const pa = partialAxes(specViewOptions, columnToAxisType(specColumns.x), columnToAxisType(specColumns.y));
    const axes: Axis[] = [
        {
            scale: ScaleNames.X,
            title: specColumns.x.name,
            ...pa.bottom as Axis
        },
        {
            scale: ScaleNames.Y,
            title: specColumns.y.name,
            ...pa.left as Axis
        }
    ];
    return axes;
}

function getMark(context: SpecContext, dataSource: string) {
    const { specColumns } = context;
    const mark: Mark = {
        type: 'rect',
        from: {
            data: dataSource
        },
        encode: {
            update: {
                x: {
                    scale: ScaleNames.X,
                    field: specColumns.x.name,
                    offset: 1
                },
                width: { signal: SignalNames.PointSize },
                y: [
                    {
                        scale: ScaleNames.Y,
                        test: testForCollapseSelection(),
                        signal: `${SignalNames.YDomain}[0]`
                    },
                    {
                        scale: ScaleNames.Y,
                        field: specColumns.y.name,
                        offset: {
                            signal: `-${SignalNames.PointSize}`
                        }
                    }
                ],
                height: [
                    {
                        test: testForCollapseSelection(),
                        value: 0
                    },
                    {
                        signal: SignalNames.PointSize
                    }
                ],
                fill: fill(context),
                opacity: opacity(context)
            }
        }
    };
    if (specColumns.z) {
        const update = mark.encode.update;
        update.z = [
            {
                test: testForCollapseSelection(),
                value: 0
            },
            {
                scale: ScaleNames.Z,
                field: specColumns.z.name
            }
        ];
        update.depth = { signal: SignalNames.PointSize };
    }
    return mark;
}

function getScales(context: SpecContext) {
    const { specColumns } = context;
    const heightRange: RangeScheme = [{ signal: 'child_height' }, 0];
    const widthRange: RangeScheme = [0, { signal: 'child_width' }];
    const scales: Scale[] = [
        (
            specColumns.x.quantitative ?
                linearScale(ScaleNames.X, DataNames.Main, specColumns.x.name, widthRange, false, false)
                :
                pointScale(ScaleNames.X, DataNames.Main, widthRange, specColumns.x.name)
        ),
        (
            specColumns.y.quantitative ?
                linearScale(ScaleNames.Y, DataNames.Main, specColumns.y.name, heightRange, false, false)
                :
                pointScale(ScaleNames.Y, DataNames.Main, heightRange, specColumns.y.name, true)
        )
    ];
    return scales;
}

function getSignals(context: SpecContext) {
    const { specViewOptions } = context;
    const signals: Signal[] = [
        {
            name: SignalNames.YDomain,
            update: `domain('${ScaleNames.Y}')`
        },
        {
            name: SignalNames.PointSize,
            value: 5,
            bind: {
                name: specViewOptions.language.scatterPointSize,
                debounce: 50,
                input: 'range',
                min: 1,
                max: 25,
                step: 1
            }
        }
    ];
    return signals;
}
