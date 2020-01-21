// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { AggregateTransform, Mark } from 'vega-typings';
import { BuildProps, Layout, LayoutProps } from './layout';
import { ContinuousAxisScale } from '../specBuilder';
import { InnerScope, Orientation } from '../interfaces';

export interface BarProps extends LayoutProps {
    orientation: Orientation;
}

export class Bar extends Layout {
    public props: BarProps & BuildProps;

    public build(): InnerScope {
        const { props } = this;
        const { parent, specContext } = props;
        const name = `bar_${this.id}`;
        const facetDataName = `facet_${name}`;
        const aggregation = this.getAgregation();
        const aggregateDataName = `${facetDataName}_${aggregation}`;
        const trans: AggregateTransform = {
            type: 'aggregate',
            groupby: [props.groupby.name],
            ops: [aggregation]
        };
        if (aggregation === 'sum') {
            trans.fields = [specContext.insight.columns.sum];
        }
        const mark: Mark = {
            name,
            type: 'group',
            from: {
                facet: {
                    name: facetDataName,
                    data: parent.dataName,
                    groupby: this.props.groupby.name
                }
            },
            data: [
                {
                    name: aggregateDataName,
                    source: facetDataName,
                    transform: [trans]
                }
            ],
            encode: {
                update: {
                    // x: {
                    //     scale: ScaleNames.X,
                    //     field: specColumns.x.name,
                    //     offset: 1
                    // },
                    // width: { signal: SignalNames.PointSize },
                    // y: [
                    //     {
                    //         scale: ScaleNames.Y,
                    //         test: testForCollapseSelection(),
                    //         signal: `${SignalNames.YDomain}[0]`
                    //     },
                    //     {
                    //         scale: ScaleNames.Y,
                    //         field: specColumns.y.name,
                    //         offset: {
                    //             signal: `-${SignalNames.PointSize}`
                    //         }
                    //     }
                    // ],
                    // height: [
                    //     {
                    //         test: testForCollapseSelection(),
                    //         value: 0
                    //     },
                    //     {
                    //         signal: SignalNames.PointSize
                    //     }
                    // ]
                }
            },
            marks: []
        };
        //parent.scope.data.push()
        parent.scope.marks.push(mark);
        return { dataName: facetDataName, scope: mark, sizeSignals: { height: 'TODO', width: 'TODO' } };
    }

    private getAgregation() {
        const { props } = this;
        let s: ContinuousAxisScale;
        if (props.orientation === 'vertical') {
            s = <ContinuousAxisScale>props.axesScales.y;
        } else {
            s = <ContinuousAxisScale>props.axesScales.x;
        }
        switch (s.aggregate) {
            case 'sum':
                return 'sum';
            default:
                return 'count';
        }
    }
}
