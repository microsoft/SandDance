/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { selectBetweenAxis, selectExactAxis } from './expression';
import { Column } from '@msrvida/chart-types';
import {
    InsightColumnRoles,
    SpecCapabilities,
    SpecColumns,
    SpecRoleCapabilities,
} from '@msrvida/sanddance-specs';
import { Search, SearchExpressionGroup } from '@msrvida/search-expression';
import * as VegaMorphCharts from '@msrvida/vega-morphcharts';

export interface AxisSelectionHandler {
    (event: TouchEvent | MouseEvent | PointerEvent, search: SearchExpressionGroup): void;
}

const dimToRole: { [key: string]: InsightColumnRoles } = {
    0: 'x',
    1: 'y',
    2: 'z',
};

const roleToDim: { [key in VegaMorphCharts.types.AxisRole]: number } = {
    x: 0,
    y: 1,
    z: 1,
};

interface SearchRole {
    axis: VegaMorphCharts.types.Axis;
    role: InsightColumnRoles;
    capabilities: SpecRoleCapabilities;
    column: Column;
    division: number;
}

export class AxisSelection {
    constructor(
        public specCapabilities: SpecCapabilities,
        public columns: SpecColumns,
        public stage: VegaMorphCharts.types.Stage,
    ) {
    }

    convert(divisions: number[]): Search {
        const searchRoles: SearchRole[] = [];
        divisions.forEach((division, i) => {
            const role = dimToRole[i];
            const axes: VegaMorphCharts.types.Axis[] = this.stage.axes[role];
            //all axes in a faceted chart should be the same
            const axis = axes.filter(axis => axis.tickText.length)[0];
            if (axis) {
                const capabilities = this.specCapabilities.roles.filter(r => r.role === role)[0];
                const column = this.columns[role];
                if (division >= 0 && capabilities?.axisSelection) {
                    searchRoles.push({
                        axis,
                        role,
                        capabilities,
                        column,
                        division,
                    });
                }
            }
        });
        switch (searchRoles.length) {
            case 0: {
                return null;
            }
            case 1: {
                return this.getSearchFromSearchRole(searchRoles[0]);
            }
            default: {
                const roles = searchRoles.map(searchRole => this.getSearchFromSearchRole(searchRole));
                roles.forEach((role, i) => {
                    if (i === 0) return;
                    role.clause = '&&';
                });
                return roles;
            }
        }
    }

    private getSearchFromSearchRole(searchRole: SearchRole) {
        const getSearch: { (a, c, i): SearchExpressionGroup } =
            searchRole.capabilities.axisSelection === 'exact' ?
                (a, c, i) => ({ expressions: [selectExactAxis(a, c, i)] })
                :
                selectBetweenAxis;
        const { axis, column, division } = searchRole;
        return getSearch(axis, column, division);
    }
}


export function moveTicksBetween(axes: VegaMorphCharts.types.Axis[]) {
    axes.forEach(axis => {
        if (axis.ticks.length === 0) return;

        const dim = roleToDim[axis.axisRole];
        const { color } = axis.ticks[0];

        const newLine = (value: number) => {
            const line: VegaMorphCharts.types.StyledLine = {
                sourcePosition: [0, 0, 0],
                targetPosition: [0, 0, 0],
                color,
            };
            line.sourcePosition[dim] = value;
            return line;
        };

        const newTicks: VegaMorphCharts.types.StyledLine[] = [];
        newTicks.push(newLine(axis.domain.sourcePosition[dim]));
        for (let i = 1; i < axis.ticks.length; i++) {
            newTicks.push(newLine((axis.ticks[i].sourcePosition[dim] + axis.ticks[i - 1].sourcePosition[dim]) / 2));
        }
        newTicks.push(newLine(axis.domain.targetPosition[dim]));
        axis.ticks = newTicks;
    });
}
