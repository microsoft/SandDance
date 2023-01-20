/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { getColorSettingsFromThemePalette, themePalettes } from './themes';
import { SideTabId, ViewerOptions } from './interfaces';
import { SandDance } from '@msrvida/sanddance-react';
import { Props, State } from './explorer';
import { DataScopeId, resetSelectedItemIndex } from './controls/dataScope';

export const fontFamily = 'Segoe UI, sans-serif';

export const defaultViewerOptions: Partial<ViewerOptions> = {
    colors: getColorSettingsFromThemePalette(themePalettes['']),
    fontFamily,
};

export const snapshotThumbWidth = 300;

export const defaultRenderer: SandDance.VegaMorphCharts.types.MorphChartsRendererOptions = {
    advanced: false,
    advancedOptions: {
        bloomIntensity: 2,
        isBloomEnabled: false,
        isDofEnabled: false,
        dofFocusRange: 0.25,
        isFxaaEnabled: false,
        isShadowEnabled: true,
        isSsaoEnabled: true,
    },
    basicOptions: {
        antialias: true,
    },
};

export function initialExplorerState(props: Props) {
    const renderer = (props.initialRenderer as SandDance.VegaMorphCharts.types.MorphChartsRendererOptions) || defaultRenderer;
    if (!renderer.advancedOptions) {
        renderer.advancedOptions = defaultRenderer.advancedOptions;
    }
    if (!renderer.basicOptions) {
        renderer.basicOptions = defaultRenderer.basicOptions;
    }
    const state: State = {
        calculating: null,
        errors: null,
        autoCompleteDistinctValues: {},
        colorBin: null,
        dataContent: null,
        dataFile: null,
        search: null,
        totalStyle: null,
        facetStyle: 'wrap',
        filter: null,
        filteredData: null,
        specCapabilities: null,
        size: {
            height: null,
            width: null,
        },
        scheme: null,
        transform: null,
        columns: null,
        chart: 'grid',
        signalValues: null,
        hideAxes: false,
        hideLegend: false,
        sideTabId: SideTabId.ChartType,
        dataScopeId: DataScopeId.AllData,
        selectedItemIndex: {},
        sidebarClosed: props.initialSidebarClosed === undefined ? false : props.initialSidebarClosed,
        sidebarPinned: props.initialSidebarPinned === undefined ? true : props.initialSidebarPinned,
        view: props.initialView || '2d',
        snapshots: [],
        selectedSnapshotIndex: -1,
        tooltipExclusions: [],
        positionedColumnMapProps: null,
        note: null,
        historyIndex: -1,
        historyItems: [],
        renderer,
        transitionType: 'ordinal',
        transitionDimension: 'x',
        transitionDurations: SandDance.VegaMorphCharts.util.clone(SandDance.VegaMorphCharts.defaults.defaultPresenterConfig.transitionDurations),
    };
    resetSelectedItemIndex(state.selectedItemIndex);
    return state;
}
