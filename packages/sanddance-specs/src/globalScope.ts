// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SignalNames } from './constants';
import { InnerScope } from './interfaces';
import { LayoutOffsets, SizeSignals } from './interfaces';
import { getDataByName } from './scope';
import {
    Data,
    GroupMark,
    NewSignal,
    Spec,
} from 'vega-typings';

export interface GlobalSignals {
    facetAxesAdjustX: NewSignal;
    facetAxesAdjustY: NewSignal;
    minCellWidth: NewSignal;
    minCellHeight: NewSignal;
    plotOffsetLeft: NewSignal;
    plotOffsetTop: NewSignal;
    plotOffsetBottom: NewSignal;
    plotOffsetRight: NewSignal;
    plotHeightOut: NewSignal;
    plotWidthOut: NewSignal;
}

export interface GlobalScopeProps {
    dataName: string;
    scope: Spec;
    markGroup: GroupMark;
    signals: GlobalSignals;
}

export class GlobalScope implements InnerScope {
    private _markDataName: string;
    public data: Data;
    public zSize: string;
    public sizeSignals: SizeSignals;
    public offsets: LayoutOffsets;
    public scope: Spec;
    private _markGroup: GroupMark;
    public signals: GlobalSignals;

    constructor(props: GlobalScopeProps) {
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
            w: SignalNames.PlotWidthIn,
        };
        this.sizeSignals = {
            layoutHeight: SignalNames.PlotHeightIn,
            layoutWidth: SignalNames.PlotWidthIn,
        };
        this.zSize = SignalNames.PlotHeightIn;
    }

    get markDataName(): string {
        return this._markDataName;
    }

    public setMarkDataName(markDataName: string) {
        this._markDataName = markDataName;
    }

    get markGroup(): GroupMark {
        return this._markGroup;
    }

    public setMarkGroup(markGroup: GroupMark) {
        this._markGroup = markGroup;
    }
}
