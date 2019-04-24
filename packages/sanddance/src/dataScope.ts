// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from './vega-deck.gl';
import { FieldNameActive, FieldNameCollapsed, FieldNameSelected } from './specs/constants';
import { Column, ColumnTypeMap } from './specs/types';
import { Exec } from './searchExpression/exec';
import { getColumnsFromData } from './specs/inference';
import { Search } from './searchExpression/types';

export interface UserSelection {
    search: Search;
    included: object[];
    excluded: object[];
}

export class DataScope {
    public selection: UserSelection;

    private data: object[];
    private columns: Column[];
    public filteredData: object[];
    public active: object;
    public isCollapsed: boolean;

    setData(data: object[], columns?: Column[]) {
        const differentData = this.data !== data;
        if (differentData) {
            if (this.data) {
                //clean up things we added to old data
                this.deselect();
            }
            this.data = data;
            this.columns = columns;
            this.filteredData = null;
        }
        return differentData;
    }

    public getColumns(columnTypes?: ColumnTypeMap) {
        if (!this.columns) {
            this.columns = getColumnsFromData(this.data, columnTypes);
        }
        return this.columns;
    }

    currentData() {
        return this.filteredData || this.data;
    }

    select(search: Search) {
        this.deselect();
        if (search) {
            this.selection = this.createUserSelection(search, true);
            if (this.selection.included.length) {
                this.activate(this.selection.included[0]);
            }
        }
    }

    createUserSelection(search: Search, assign: boolean) {
        const exec = new Exec(search, this.getColumns());
        const s: UserSelection = {
            search,
            included: [],
            excluded: []
        };
        this.currentData().forEach(datum => {
            if (exec.run(datum)) {
                if (assign) {
                    datum[FieldNameSelected] = true;
                }
                s.included.push(datum);
            } else {
                s.excluded.push(datum);
            }
        });
        return s;
    }

    deselect() {
        this.deactivate();
        this.data.forEach(datum => {
            delete datum[FieldNameSelected];
        });
        this.selection = null;
    }

    hasSelectedData() {
        return !!this.selection;
    }

    collapse(collapsed: boolean, data = this.data) {
        data.forEach(datum => {
            datum[FieldNameCollapsed] = collapsed;
        });
        this.isCollapsed = collapsed;
    }

    activate(datum: object) {
        this.deactivate();
        datum[FieldNameActive] = true;
        this.active = datum;
    }

    deactivate() {
        if (this.active) {
            delete this.active[FieldNameActive];
        }
        this.active = null;
    }

    ordinalIndexWithinSelection(ordinal: number) {
        if (this.selection) {
            for (let i = 0; i < this.selection.included.length; i++) {
                let datum = this.selection.included[i];
                if (datum[VegaDeckGl.constants.GL_ORDINAL] === ordinal) {
                    return { datum, index: i };
                }
            }
        }
        return { datum: null, index: -1 };
    }
}
