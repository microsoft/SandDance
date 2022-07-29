/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Axes, AxesVisibility, AxesTextOrientation, Edge3D, Meshes } from 'morphcharts';
import { Cartesian2dAxes, Cartesian3dAxes } from 'morphcharts/dist/components/axes';
import { Axis, IBounds, ILayer, ILayerCreator, ILayerProps, StyledLine, Stage, Vec3 } from '../interfaces';
import { outerBounds } from './bounds';

export const createAxesLayer: ILayerCreator = (props: ILayerProps): ILayer => {
    const { config, height, ref, stage } = props;
    const { core } = ref;
    const { renderer } = core;

    const { x, y, z } = stage.axes;
    const xyz = [...x, ...y, ...z];

    renderer.currentAxes = [];

    if (!xyz.length) {
        renderer.axesVisibility = AxesVisibility.none;
        return;
    }
    renderer.axesVisibility = AxesVisibility.current;

    const correlation = new AxesCorrelation(stage, 3);
    const { axesSets, labels } = correlation;

    const grid = correlation.getGrid();

    if (grid.byColumn[0]) {
        grid.byColumn[0].forEach(row => { row.axesSet.showFacetTitleY = true; });
        grid.byRow[0].forEach(col => { col.axesSet.showFacetTitleX = true; });
    }

    if (grid.rows > 1) {
        const { byRow } = grid;
        byRow[0].forEach(({ axesSet }, col) => {
            if (!axesSet.y) {
                if (byRow[1][col].axesSet) {
                    //move x up
                    byRow[1][col].axesSet.x.tickText = axesSet.x.tickText;
                    byRow[1][col].axesSet.showFacetTitleX = axesSet.showFacetTitleX;
                    delete axesSet.x;
                }
            }
        });
    }

    let bounds: IBounds;
    const allAxesSetBounds: AxesSetBounds[] = [];

    let anyZ = false;
    for (let i = 0; i < axesSets.length; i++) {
        if (axesSets[i].z) {
            anyZ = true;
            break;
        }
    }
    const is3d = stage.view === '3d' && anyZ;

    axesSets.forEach(axesSet => {
        if (!axesSet.x && !axesSet.y) return;
        const axesSetBounds: AxesSetBounds = {
            axesSet,
            maxBoundsX: null,
            maxBoundsY: null,
            maxBoundsZ: null,
            minBoundsX: null,
            minBoundsY: null,
            minBoundsZ: null,
        };

        if (is3d) {
            const zBounds = getDomainBounds(1, axesSet.z);
            axesSetBounds.minBoundsZ = -zBounds.maxBounds;
            axesSetBounds.maxBoundsZ = -zBounds.minBounds;
        }

        const yBounds = getDomainBounds(1, axesSet.y);
        axesSetBounds.minBoundsY = yBounds.minBounds;
        axesSetBounds.maxBoundsY = yBounds.maxBounds;
        axesSetBounds.y = yBounds.minBounds;
        axesSetBounds.h = yBounds.maxBounds - yBounds.minBounds;

        const xBounds = getDomainBounds(0, axesSet.x);
        axesSetBounds.minBoundsX = xBounds.minBounds;
        axesSetBounds.maxBoundsX = xBounds.maxBounds;
        axesSetBounds.x = xBounds.minBounds;
        axesSetBounds.w = xBounds.maxBounds - xBounds.minBounds;

        allAxesSetBounds.push(axesSetBounds);
        bounds = outerBounds(bounds, axesSetBounds);
    });

    const facetLabelX = labels.filter(label => label.axisRole === 'x')[0];
    const facetLabelY = labels.filter(label => label.axisRole === 'y')[0];

    core.inputManager.pickAxesTitleCallback = ({ axis, axes, manipulator }) => {
        const axesSet = axesSets[axes];
        let a: Axis;
        let f: Axis;
        switch (axis) {
            case 0: {
                a = axesSet.x;
                f = facetLabelX;
                break;
            }
            case 1: {
                a = axesSet.y;
                f = facetLabelY;
                break;
            }
            case 2: {
                a = axesSet.z;
                break;
            }
        }
        if (a) {
            config.onTextClick(manipulator.event as MouseEvent, a.title || f.title);
        }
    };

    allAxesSetBounds.forEach(axesSetBounds => {
        const { axesSet } = axesSetBounds;
        if (!axesSet.x && !axesSet.y) return;
        const cartesian = new (is3d ? Axes.Cartesian3dAxes : Axes.Cartesian2dAxes)(core);

        cartesian.isDivisionPickingEnabled = [false, false, false];
        cartesian.arePickDivisionsVisible = [false, false, false];
        cartesian.isLabelPickingEnabled = [false, false, false];
        cartesian.isTitlePickingEnabled = [false, false, false];
        cartesian.isGridPickingEnabled = false;
        cartesian.isHeadingPickingEnabled = [false, false, false];

        createAxes(cartesian, 0, 0, axesSet.x, AxesTextOrientation.perpendicular, height, props, axesSet.showFacetTitleX && facetLabelX);
        createAxes(cartesian, 1, 1, axesSet.y, AxesTextOrientation.perpendicular, height, props, axesSet.showFacetTitleY && facetLabelY);
        if (is3d) {
            createAxes(cartesian, 1, 2, axesSet.z, AxesTextOrientation.perpendicular, height, props);
        }

        configCartesianAxes(is3d, bounds, cartesian);

        const {
            maxBoundsX,
            maxBoundsY,
            minBoundsX,
            minBoundsY,
        } = bounds;

        const w = maxBoundsX - minBoundsX;
        const h = maxBoundsY - minBoundsY;

        cartesian.scalingX = axesSetBounds.w / w;
        cartesian.scalingY = axesSetBounds.h / h;

        cartesian.offsetX = ((axesSetBounds.x - minBoundsX + axesSetBounds.w / 2) / w) - 0.5;
        cartesian.offsetY = ((axesSetBounds.y - minBoundsY + axesSetBounds.h / 2) / h) - 0.5;

        const aspect = (h / w);
        if (aspect > 1) {
            cartesian.offsetX /= aspect;
        } else {
            cartesian.offsetY *= aspect;
        }

        const axes = is3d ? renderer.createCartesian3dAxesVisual(<Cartesian3dAxes>cartesian) : renderer.createCartesian2dAxesVisual(<Cartesian2dAxes>cartesian);
        renderer.currentAxes.push(axes);

        props.config.onAxesComplete && props.config.onAxesComplete(cartesian);
    });

    return { bounds };
};

const nullDomain: StyledLine = {
    sourcePosition: [0, 0, 0],
    targetPosition: [0, 0, 0],
};

interface AxesSetBounds extends IBounds {
    x?: number;
    y?: number;
    h?: number;
    w?: number;
    axesSet: AxesSet;
}

type AxesSet = {
    rendered?: boolean;
    x?: Axis;
    y?: Axis;
    z?: Axis;
    showFacetTitleX?: boolean;
    showFacetTitleY?: boolean;
}

class AxesCorrelation {
    axesSets: AxesSet[];
    labels: Axis[];

    constructor(stage: Stage, private dimensions: number) {
        const { x, y, z } = stage.axes;
        this.axesSets = [];
        this.labels = [];
        [x, y, z].forEach(axes => {
            axes.forEach(axis => {
                if (this.axesSets.length === 0) {
                    this.initialize(axis);
                } else {
                    this.correlate(axis);
                }
            });
        });
    }

    getGrid() {
        const mapCols: { [col: string]: { [row: string]: AxesSet } } = {};
        const mapRows: { [row: string]: null } = {};
        this.axesSets.forEach(axesSet => {
            const domain = axesSet?.x?.domain;
            if (!domain) return;
            const col = domain.sourcePosition[0].toString();
            const row = domain.sourcePosition[1].toString();
            if (!mapCols[col]) {
                mapCols[col] = {};
            }
            mapCols[col][row] = axesSet;
            mapRows[row] = null;
        });
        const colKeys = Object.keys(mapCols).sort((a, b) => +a - +b);
        const rowKeys = Object.keys(mapRows).sort((a, b) => +a - +b);
        return {
            cols: colKeys.length,
            rows: rowKeys.length,
            byColumn: colKeys.map(colKey => rowKeys.map(rowKey => { return { colKey, rowKey, axesSet: mapCols[colKey][rowKey] }; })),
            byRow: rowKeys.map(rowKey => colKeys.map(colKey => { return { colKey, rowKey, axesSet: mapCols[colKey][rowKey] }; })),
        };
    }

    initialize(axis: Axis) {
        if (!axis.domain) {
            this.labels.push(axis);
            return;
        }
        const axesSet: AxesSet = {};
        axesSet[axis.axisRole] = axis;
        this.axesSets.push(axesSet);
    }

    correlate(axis: Axis) {
        if (!axis.domain) {
            this.labels.push(axis);
            return;
        }
        for (let i = 0; i < this.axesSets.length; i++) {
            const axesSet = this.axesSets[i];
            for (const axisRole in axesSet) {
                const test: Axis = axesSet[axisRole];
                if (this.matchDomains(axis.domain, test.domain)) {
                    //prefer the axes with titles
                    if (!axesSet[axis.axisRole] || (!axesSet[axis.axisRole].tickText.length && axis.tickText.length)) {
                        axesSet[axis.axisRole] = axis;
                    }
                    return;
                }
            }
        }
        this.initialize(axis);
    }

    matchDomains(a: StyledLine, b: StyledLine) {
        if (this.matchPoint(a.sourcePosition, b.sourcePosition)) return true;
        if (this.matchPoint(a.sourcePosition, b.targetPosition)) return true;
        if (this.matchPoint(a.targetPosition, b.targetPosition)) return true;
        if (this.matchPoint(a.targetPosition, b.sourcePosition)) return true;
        return false;
    }

    matchPoint(a: Vec3, b: Vec3) {
        for (let i = 0; i < this.dimensions; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
}

function createAxes(cartesian: Axes.Cartesian2dAxes | Axes.Cartesian3dAxes, dim2d: number, dim3d: number, axis: Axis, orientation: AxesTextOrientation, height: number, props: ILayerProps, facetLabel?: Axis) {
    const domain = axis?.domain || nullDomain;
    const { tickPositions, tickText, textPos, textSize } = convertAxis(axis, domain, dim2d, height);

    cartesian.setTickPositions(dim3d, tickPositions);

    cartesian.zero[dim3d] = 0;  //TODO get any "zero" gridline position from vega

    cartesian.setLabelPositions(dim3d, textPos);
    cartesian.setLabels(dim3d, tickText);
    cartesian.setLabelSizes(dim3d, textSize);

    const title = axis?.title || facetLabel?.title;
    if (title?.text) {
        cartesian.setTitle(dim3d, title.text);
        cartesian.setTitleSize(dim3d, title.size / height);
    }

    cartesian.setLabelOrientation(dim3d, orientation);

    props.config.onAxisConfig && props.config.onAxisConfig(cartesian, dim3d, axis);

    return {
        tickText,
    };
}

function configCartesianAxes(is3d: boolean, bounds: IBounds, cartesian: Axes.Cartesian2dAxes | Axes.Cartesian3dAxes) {
    if (is3d) {
        cartesian.isEdgeVisible[Edge3D.topBack] = false;
    }
    cartesian.isEdgeVisible[Edge3D.backRight] = false;
    cartesian.isEdgeVisible[Edge3D.bottomRight] = false;
    cartesian.isEdgeVisible[Edge3D.frontRight] = false;
    cartesian.isEdgeVisible[Edge3D.topFront] = false;
    cartesian.isEdgeVisible[Edge3D.topRight] = false;

    const {
        maxBoundsX,
        maxBoundsY,
        maxBoundsZ,
        minBoundsX,
        minBoundsY,
        minBoundsZ,
    } = bounds;

    cartesian.minBoundsX = minBoundsX;
    cartesian.maxBoundsX = maxBoundsX;
    cartesian.minBoundsY = minBoundsY;
    cartesian.maxBoundsY = maxBoundsY;
    if (is3d) {
        (<Axes.Cartesian3dAxes>cartesian).minBoundsZ = minBoundsZ;
        (<Axes.Cartesian3dAxes>cartesian).maxBoundsZ = maxBoundsZ;
    }
}

function getDomainBounds(dim2d: number, axis: Axis) {
    const domain = axis?.domain || nullDomain;
    const minBounds = domain.sourcePosition[dim2d];
    const maxBounds = domain.targetPosition[dim2d];
    return {
        maxBounds,
        minBounds,
    };
}

function convertAxis(axis: Axis, domain: StyledLine, dim: number, height: number) {
    const tickPositions = axis
        ?
        axis.ticks.map(t => (t.sourcePosition[dim] - domain.sourcePosition[dim]) / (domain.targetPosition[dim] - domain.sourcePosition[dim]))
        :
        [];
    const tickText = axis ?
        axis.tickText.map(t => t.text)
        :
        [];

    const textPos = axis ?
        axis.tickText.map(t => (t.position[dim] - domain.sourcePosition[dim]) / (domain.targetPosition[dim] - domain.sourcePosition[dim]))
        :
        [];

    const textSize = axis ?
        axis.tickText.map(t => t.size / height)
        :
        [];

    if (tickPositions.length) {
        if (tickPositions[0] !== 0) {
            tickPositions[0] = 0;
        }

        if (tickPositions[tickPositions.length - 1] !== 1) {
            tickPositions[tickPositions.length - 1] = 1;
        }
    }

    return {
        tickPositions,
        tickText,
        textPos,
        textSize,
    };
}
