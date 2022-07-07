/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { selectBetweenAxis, selectExactAxis } from './expression';
import { getSearchGroupFromVegaValue } from './search';
import { Column } from '@msrvida/chart-types';
import {
    AxisSelectionType,
    FieldNames,
    SpecCapabilities,
    SpecColumns,
} from '@msrvida/sanddance-specs';
import { SearchExpressionGroup } from '@msrvida/search-expression';
import * as VegaDeckGl from '@msrvida/vega-deck.gl';

export interface AxisSelectionHandler {
    (event: TouchEvent | MouseEvent | PointerEvent, search: SearchExpressionGroup): void;
}

export function axisSelectionLayer(presenter: VegaDeckGl.Presenter, specCapabilities: SpecCapabilities, columns: SpecColumns, stage: VegaDeckGl.types.Stage, clickHandler: AxisSelectionHandler, highlightColor: string, polygonZ: number) {
    const polygons: SelectPolygon[] = [];
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
        (datum.polygon as number[][]).forEach(p => {
            p[2] = polygonZ;
        });
    });
    const onClick: VegaDeckGl.LayerInputHandler = (o, e) => clickHandler(e.srcEvent, (o.object as SelectPolygon).search);
    const polygonLayer = new VegaDeckGl.base.layers.PolygonLayer<SelectPolygon>({
        autoHighlight: true,
        coordinateSystem: VegaDeckGl.base.deck.COORDINATE_SYSTEM.CARTESIAN,
        data: polygons,
        extruded: false,
        highlightColor: VegaDeckGl.util.colorFromString(highlightColor),
        id: 'selections',
        onHover: (o, e) => {
            if (o.index === -1) {
                presenter.deckgl.interactiveState.onAxisSelection = false;
            } else {
                presenter.deckgl.interactiveState.onAxisSelection = true;
            }
        },
        onClick,
        getElevation: () => 0,
        getFillColor: () => [0, 0, 0, 0],
        pickable: true,
        stroked: false,
    });

    return polygonLayer;
}

interface SelectPolygon {
    polygon: VegaDeckGl.Position[]
    search: SearchExpressionGroup;
}

function axisSelectionPolygons(axis: VegaDeckGl.types.Axis, vertical: boolean, axisSelectionType: AxisSelectionType, column: Column) {
    const polygons: SelectPolygon[] = [];
    const size = 50;
    const getSearch: { (a, c, i): SearchExpressionGroup } =
        axisSelectionType === 'exact' ?
            (a, c, i) => ({ expressions: [selectExactAxis(a, c, i)] })
            :
            selectBetweenAxis;
    const { domain, ticks } = axis;
    if (ticks.length > 0 && domain) {
        const dim = vertical ? 1 : 0;
        const between = Math.abs(ticks[0].sourcePosition[dim] - domain.sourcePosition[dim]) > 1;
        let divisions: number[];
        if (between) {
            divisions = [];
            for (let i = 1; i < ticks.length; i++) {
                divisions.push((ticks[i].sourcePosition[dim] + ticks[i - 1].sourcePosition[dim]) / 2);
            }
        } else {
            divisions = ticks.slice(1, -1).map(tick => tick.sourcePosition[dim]);
        }

        const add = (p2: number, i: number) => {
            const coords: VegaDeckGl.Position[] = [[p1, q1], [p2, q1], [p2, q2], [p1, q2]];
            polygons.push({
                search: getSearch(axis, column, i),
                polygon: vertical ? coords.map(xy => xy.reverse() as VegaDeckGl.Position) : coords,
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

function facetSelectionPolygons(facetRects: VegaDeckGl.types.FacetRect[]) {
    const polygons: SelectPolygon[] = [];
    const linesAndSearches: { lines: VegaDeckGl.types.StyledLine[], search: SearchExpressionGroup }[] = facetRects.map(({ datum, lines }, i) => {
        const group: SearchExpressionGroup = getSearchGroupFromVegaValue(datum[FieldNames.FacetSearch]);
        return {
            lines,
            search: group,
        };
    });
    linesAndSearches.forEach(({ lines, search }, i) => {
        //take any 2 lines to get a box dimension
        const [x, y] = minMaxPoints(lines.slice(2));
        polygons.push({
            search,
            polygon: [[x.min, y.min], [x.max, y.min], [x.max, y.max], [x.min, y.max]],
        });
    });
    return polygons;
}

function minMaxPoints(lines: VegaDeckGl.types.StyledLine[]) {
    const points: number[][] = [];
    lines.forEach(line => {
        [line.sourcePosition, line.targetPosition].forEach(point => {
            points.push(point);
        });
    });
    return [0, 1].map(dim => {
        const minMax: { min: number, max: number } = { min: null, max: null };
        points.forEach(point => {
            if (minMax.max == null) {
                minMax.max = point[dim];
            } else {
                minMax.max = Math.max(minMax.max, point[dim]);
            }
            if (minMax.min == null) {
                minMax.min = point[dim];
            } else {
                minMax.min = Math.min(minMax.min, point[dim]);
            }
        });
        return minMax;
    });
}
