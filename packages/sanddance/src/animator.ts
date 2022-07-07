/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { DataScope } from './dataScope';
import { Search } from '@msrvida/search-expression';

export enum DataLayoutChange {
    same, reset, refine,
}

export interface Props {
    onAnimateDataChange: (dataChange: DataLayoutChange, waitingLabel: string, handlerLabel: string) => Promise<void>;
    onDataChanged: (dataChange: DataLayoutChange, search?: Search) => void;
}

export class Animator {

    constructor(private dataScope: DataScope, private props: Props) { }

    select(search: Search) {
        return new Promise<void>((resolve, reject) => {
            this.dataScope.select(search);
            this.props.onDataChanged(DataLayoutChange.same);
            resolve();
        });
    }

    deselect() {
        return new Promise<void>((resolve, reject) => {
            this.dataScope.deselect();
            this.props.onDataChanged(DataLayoutChange.same);
            resolve();
        });
    }

    filter(search: Search, keepData: object[], collapseData: object[], rebase: boolean) {
        if (rebase) {
            this.dataScope.collapse(false, keepData);    
        }
        this.dataScope.collapse(true, collapseData);
        return new Promise<void>((resolve, reject) => {
            this.props.onAnimateDataChange(DataLayoutChange.refine, 'before refine', 'refine').then(() => {
                this.dataScope.deselect();
                this.dataScope.setFilteredData(keepData);
                this.props.onDataChanged(DataLayoutChange.refine, search);
                resolve();
            }).catch(reject);
        });
    }

    reset() {
        return new Promise<void>((resolve, reject) => {
            this.dataScope.deselect();
            this.dataScope.setFilteredData(null);
            this.props.onAnimateDataChange(DataLayoutChange.reset, 'before reset', 'reset').then(() => {
                this.dataScope.collapse(false);
                this.props.onDataChanged(DataLayoutChange.reset);
                resolve();
            }).catch(reject);
        });
    }

    activate(datum: object) {
        return new Promise<void>((resolve, reject) => {
            this.dataScope.activate(datum);
            this.props.onDataChanged(DataLayoutChange.same);
            resolve();
        });
    }

    deactivate() {
        return new Promise<void>((resolve, reject) => {
            this.dataScope.deactivate();
            this.props.onDataChanged(DataLayoutChange.same);
            resolve();
        });
    }

}