// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Column, ColumnStats, ColumnTypeMap } from '@msrvida/chart-types';
import { Exec, Search } from '@msrvida/search-expression';
import { FieldNames, getColumnsFromData, getStats } from '@msrvida/sanddance-specs';
import { GL_ORDINAL } from './constants';

export interface ColumnsStatsMap {
    [columnName: string]: ColumnStats;
}

export interface UserSelection {
    search: Search;
    included: object[];
    excluded: object[];
}

export class DataScope {
    public selection: UserSelection;
    private data: object[];
    private columns: Column[];
    private filteredData: object[];
    private filteredColumnsStats: ColumnsStatsMap;
    public active: object;
    public isCollapsed: boolean;

    constructor() {
        this.filteredColumnsStats = {};
    }

    public setData(data: object[], columns?: Column[]) {
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

    public setFilteredData(filteredData: object[]) {
        this.filteredData = filteredData;
        this.filteredColumnsStats = {};
    }

    public getColumns(columnTypes?: ColumnTypeMap) {
        if (!this.columns) {
            this.columns = getColumnsFromData(this.data, columnTypes);
        }
        return this.columns;
    }

    public getFilteredColumnStats(columnName: string) {
        if (!this.filteredColumnsStats[columnName]) {
            this.filteredColumnsStats[columnName] = getStats(this.filteredData, this.columns.filter(c => c.name === columnName)[0]);
        }
        return this.filteredColumnsStats[columnName];
    }

    public currentData() {
        return this.filteredData || this.data;
    }

    public select(search: Search) {
        this.deselect();
        if (search) {
            this.selection = this.createUserSelection(search, true);
            if (this.selection.included.length) {
                this.activate(this.selection.included[0]);
            }
        }
    }

    public createUserSelection(search: Search, assign: boolean) {
        const exec = new Exec(search, this.getColumns());
        const s: UserSelection = {
            search,
            included: [],
            excluded: []
        };
        this.currentData().forEach(datum => {
            if (exec.run(datum)) {
                if (assign) {
                    datum[FieldNames.Selected] = true;
                }
                s.included.push(datum);
            } else {
                s.excluded.push(datum);
            }
        });
        return s;
    }

    public deselect() {
        this.deactivate();
        this.data.forEach(datum => {
            delete datum[FieldNames.Selected];
        });
        this.selection = null;
    }

    public hasFilteredData() {
        return !!this.filteredData;
    }

    public hasSelectedData() {
        return !!this.selection;
    }

    public collapse(collapsed: boolean, data = this.data) {
        data.forEach(datum => {
            datum[FieldNames.Collapsed] = collapsed;
        });
        this.isCollapsed = collapsed;
    }

    public activate(datum: object) {
        this.deactivate();
        datum[FieldNames.Active] = true;
        this.active = datum;
    }

    public deactivate() {
        if (this.active) {
            delete this.active[FieldNames.Active];
        }
        this.active = null;
    }

    public ordinalIndexWithinSelection(ordinal: number) {
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

    public finalize() {
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
