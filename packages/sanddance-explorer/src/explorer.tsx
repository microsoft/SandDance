// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from './base';
import { removeTabIndex } from './canvas';
import {
    onBeforeCreateLayers,
    PositionedColumnMap,
    PositionedColumnMapProps,
    TextWithSpecRole
} from './clickableTextLayer';
import { applyColorButtons } from './colorMap';
import { bestColorScheme } from './colorScheme';
import { ensureColumnsExist, ensureColumnsPopulated } from './columns';
import { ColumnMapBaseProps } from './controls/columnMap';
import { DataScopeId } from './controls/dataScope';
import { Dialog } from './controls/dialog';
import { IconButton } from './controls/iconButton';
import { AutoCompleteDistinctValues, InputSearchExpression } from './controls/searchTerm';
import { Sidebar } from './controls/sidebar';
import { Topbar } from './controls/topbar';
import { loadDataArray, loadDataFile } from './dataLoader';
import { defaultViewerOptions, snapshotThumbWidth } from './defaults';
import { Chart, chartLabel } from './dialogs/chart';
import { Color } from './dialogs/color';
import { DataBrowser } from './dialogs/dataBrowser';
import { History } from './dialogs/history';
import { InputSearchExpressionGroup, Search } from './dialogs/search';
import { Settings } from './dialogs/settings';
import { SnapshotEditor, SnapshotEditor_Class } from './dialogs/snapshotEditor';
import { Snapshots } from './dialogs/snapshots';
import {
    ChangeColumnMappingOptions,
    ColorSettings,
    DataContent,
    DataExportHandler,
    DataFile,
    SettingsGroup,
    SideTabId,
    SnapshotProps
} from './interfaces';
import { strings } from './language';
import { getPosition } from './mouseEvent';
import {
    copyPrefToNewState,
    initPrefs,
    Prefs,
    savePref,
    saveSignalValuePref
} from './partialInsight';
import { themePalettes } from './themes';
import { toggleSearch } from './toggleSearch';
import { preferredColumnForTreemapSize, RecommenderSummary } from '@msrvida/chart-recommender';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { SandDance, SandDanceReact, util } from '@msrvida/sanddance-react';

import Snapshot = SandDance.types.Snapshot;

export interface Options {
    chartPrefs?: Prefs;
    tooltipExclusions?: string[];
}

export interface Props {
    compactUI?: boolean;
    hideSidebarControls?: boolean;
    logoClickUrl?: string;
    logoClickTarget?: string;
    bingSearchDisabled?: boolean;
    searchORDisabled?: boolean;
    theme?: string;
    viewerOptions?: Partial<SandDance.types.ViewerOptions>;
    initialView?: SandDance.types.View;
    mounted?: (explorer: Explorer_Class) => any;
    datasetElement?: JSX.Element;
    dataExportHandler?: DataExportHandler;
    topBarButtonProps?: FluentUITypes.ICommandBarItemProps[];
    snapshotProps?: SnapshotProps;
    onSnapshotClick?: (snapshot: Snapshot, selectedSnaphotIndex: number) => void | boolean;
    onSnapshotsChanged?: (snapshots: Snapshot[]) => void;
    onView?: () => void;
    onError?: (e: any) => void;
    onSignalChanged?: (signalName: string, signalValue: any) => void;
    onTooltipExclusionsChanged?: (tooltipExclusions: string[]) => void;
    additionalSettings?: SettingsGroup[];
    systemInfoChildren?: React.ReactNode;
}

export interface UIState {
    calculating: () => void;
    errors: string[];
    autoCompleteDistinctValues: AutoCompleteDistinctValues;
    search: InputSearchExpressionGroup[];
    filteredData: object[];
    sidebarClosed: boolean;
    sidebarPinned: boolean;
    dataFile: DataFile;
    dataContent: DataContent;
    specCapabilities: SandDance.specs.SpecCapabilities;
    sideTabId: SideTabId;
    dataScopeId: DataScopeId;
    selectedItemIndex: { [key: number]: number };
    snapshots: Snapshot[];
    selectedSnapshotIndex: number;
    tooltipExclusions: string[];
    positionedColumnMapProps: PositionedColumnMapProps;
    note: string;
    historyIndex: number;
    historyItems: HistoryItem[];
}

export interface HistoricInsight extends SandDance.specs.Insight {
    rebaseFilter?: boolean;
}

export interface State extends HistoricInsight, UIState {
}

export interface HistoryAction {
    insert?: boolean;
    omit?: boolean;
    label: string;
}

export interface HistoryItem {
    label: string;
    historicInsight: Partial<HistoricInsight>;
}

const dataBrowserZeroMessages: { [key: number]: string } = {};
dataBrowserZeroMessages[DataScopeId.AllData] = strings.labelZeroAll;
dataBrowserZeroMessages[DataScopeId.FilteredData] = null; //empty array is not used
dataBrowserZeroMessages[DataScopeId.SelectedData] = strings.labelZeroSearchResults;

const dataBrowserNullMessages: { [key: number]: string } = {};
dataBrowserNullMessages[DataScopeId.AllData] = strings.labelDataNullAll;
dataBrowserNullMessages[DataScopeId.FilteredData] = strings.labelDataNullFiltered;
dataBrowserNullMessages[DataScopeId.SelectedData] = strings.labelDataNullSelection;

function createInputSearch(search: SandDance.searchExpression.Search) {
    const groups = SandDance.searchExpression.ensureSearchExpressionGroupArray(search);
    const dialogSearch: InputSearchExpressionGroup[] = groups.map((group, groupIndex) => {
        return {
            key: groupIndex,
            ...group,
            expressions: group.expressions.map((ex, i) => {
                const ex2: InputSearchExpression = {
                    key: i,
                    ...ex
                };
                return ex2;
            })
        };
    });
    return dialogSearch;
}

function _Explorer(props: Props) {
    class __Explorer extends base.react.Component<Props, State> {
        private layoutDivUnpinned: HTMLElement;
        private layoutDivPinned: HTMLElement;
        private getColorContext: (oldInsight: SandDance.specs.Insight, newInsight: SandDance.specs.Insight) => SandDance.types.ColorContext;
        private historicFilterChange: string;
        private rebaseFilter: boolean;
        private ignoreSelectionChange: boolean;
        private snapshotEditor: SnapshotEditor_Class;
        private scrollSnapshotTimer: number;
        private newViewStateTarget: boolean;

        public viewer: SandDance.Viewer;
        public viewerOptions: Partial<SandDance.types.ViewerOptions>;
        public discardColorContextUpdates: boolean;
        public prefs: Prefs;
        public div: HTMLElement;
        public snapshotThumbWidth: number;

        constructor(props: Props) {
            super(props);
            this.state = {
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
                    width: null
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
                sidebarClosed: false,
                sidebarPinned: true,
                view: props.initialView || '2d',
                snapshots: [],
                selectedSnapshotIndex: -1,
                tooltipExclusions: [],
                positionedColumnMapProps: null,
                note: null,
                historyIndex: -1,
                historyItems: []
            };

            this.state.selectedItemIndex[DataScopeId.AllData] = 0;
            this.state.selectedItemIndex[DataScopeId.FilteredData] = 0;
            this.state.selectedItemIndex[DataScopeId.SelectedData] = 0;

            this.snapshotThumbWidth = snapshotThumbWidth;
            this.discardColorContextUpdates = true;
            this.updateViewerOptions({ ...SandDance.VegaDeckGl.util.clone(SandDance.Viewer.defaultViewerOptions), ...props.viewerOptions });
        }

        public finalize() {
            if (this.viewer) this.viewer.finalize();
        }

        public updateViewerOptions(viewerOptions: Partial<SandDance.types.ViewerOptions>) {
            this.viewerOptions = {
                ...SandDance.VegaDeckGl.util.deepMerge(
                    defaultViewerOptions,
                    this.viewerOptions,
                    viewerOptions
                ),
                tooltipOptions: {
                    exclude: columnName => this.state.tooltipExclusions.indexOf(columnName) >= 0
                },
                onColorContextChange: () => this.manageColorToolbar(),
                onDataFilter: (filter, filteredData) => {
                    const selectedItemIndex = { ...this.state.selectedItemIndex };
                    selectedItemIndex[DataScopeId.FilteredData] = 0;
                    this.changeInsight(
                        { filter },
                        { label: this.historicFilterChange, omit: !this.historicFilterChange }
                    );
                    this.historicFilterChange = null;
                    this.setState({ filteredData, selectedItemIndex });
                    if (this.state.sideTabId === SideTabId.Data && this.state.dataScopeId === DataScopeId.FilteredData) {
                        //make sure item is active
                        requestAnimationFrame(() => filteredData && this.silentActivation(filteredData[0]));
                    }
                    viewerOptions && viewerOptions.onDataFilter && viewerOptions.onDataFilter(filter, filteredData);
                },
                onSelectionChanged: (newSearch, index, selectedData) => {
                    if (this.ignoreSelectionChange) return;
                    const selectedItemIndex = { ...this.state.selectedItemIndex };
                    selectedItemIndex[DataScopeId.SelectedData] = index || 0;
                    let { search, sideTabId } = this.state;
                    if (newSearch) {
                        search = createInputSearch(newSearch);
                        //} else {
                        //sideTabId = SideTabId.ChartType;
                    }
                    this.setState({ search, selectedItemIndex, sideTabId });
                    viewerOptions && viewerOptions.onSelectionChanged && viewerOptions.onSelectionChanged(newSearch, index, selectedData);
                },
                onAxisClick: (e, search) => {
                    this.toggleableSearch(e, search);
                    viewerOptions && viewerOptions.onAxisClick && viewerOptions.onAxisClick(e, search);
                },
                onLegendHeaderClick: e => {
                    const pos = getPosition(e);
                    const specRole = this.state.specCapabilities && this.state.specCapabilities.roles.filter(r => r.role === 'color')[0];
                    const positionedColumnMapProps: PositionedColumnMapProps = {
                        ...this.getColumnMapBaseProps(),
                        collapseLabel: true,
                        container: this.div,
                        selectedColumnName: this.state.columns['color'],
                        onDismiss: () => { this.setState({ positionedColumnMapProps: null }); },
                        specRole,
                        left: pos.left - this.div.clientLeft,
                        top: pos.top - this.div.clientTop
                    };
                    this.setState({ positionedColumnMapProps });
                },
                onLegendRowClick: (e, legendRow) => {
                    this.toggleableSearch(e, legendRow.search);
                    viewerOptions && viewerOptions.onLegendRowClick && viewerOptions.onLegendRowClick(e, legendRow);
                },
                onError: (errors) => {
                    this.setState({ errors });
                    viewerOptions && viewerOptions.onError && viewerOptions.onError(errors);
                },
                onBeforeCreateLayers,
                getTextColor: o => {
                    if ((o as TextWithSpecRole).specRole) {
                        return SandDance.VegaDeckGl.util.colorFromString((this.viewerOptions.colors as ColorSettings).clickableText);
                    } else if (o.metaData && o.metaData.search) {
                        return SandDance.VegaDeckGl.util.colorFromString((this.viewerOptions.colors as ColorSettings).searchText);
                    } else {
                        return o.color;
                    }
                },
                getTextHighlightColor: o => {
                    if ((o as TextWithSpecRole).specRole) {
                        return SandDance.VegaDeckGl.util.colorFromString((this.viewerOptions.colors as ColorSettings).clickableTextHighlight);
                    } else if (o.metaData && o.metaData.search) {
                        return SandDance.VegaDeckGl.util.colorFromString((this.viewerOptions.colors as ColorSettings).searchTextHighlight);
                    } else {
                        return [0, 0, 0, 0];
                    }
                },
                onTextClick: (e, text) => {
                    if (e && text) {
                        const pos = getPosition(e);
                        const { specRole } = text as TextWithSpecRole;
                        if (pos && specRole) {
                            const positionedColumnMapProps: PositionedColumnMapProps = {
                                ...this.getColumnMapBaseProps(),
                                collapseLabel: true,
                                container: this.div,
                                selectedColumnName: this.state.columns[specRole.role],
                                onDismiss: () => { this.setState({ positionedColumnMapProps: null }); },
                                specRole,
                                left: pos.left - this.div.clientLeft,
                                top: pos.top - this.div.clientTop
                            };
                            this.setState({ positionedColumnMapProps });
                        } else {
                            this.setState({ positionedColumnMapProps: null });
                        }
                    }
                },
                onNewViewStateTarget: () => this.newViewStateTarget
            };
            if (this.viewer && this.viewer.presenter) {
                const newPresenterStyle = SandDance.util.getPresenterStyle(this.viewerOptions as SandDance.types.ViewerOptions);
                const mergePrenterStyle = { ...this.viewer.presenter.style, ...newPresenterStyle };
                this.viewer.presenter.style = mergePrenterStyle;
                this.viewer.options = SandDance.VegaDeckGl.util.deepMerge(this.viewer.options, this.props.viewerOptions, this.viewerOptions) as SandDance.types.ViewerOptions;
            }
        }

        public signal(signalName: string, signalValue: any, newViewStateTarget?: boolean) {
            switch (signalName) {
                case SandDance.constants.SignalNames.ColorBinCount:
                case SandDance.constants.SignalNames.ColorReverse:
                case SandDance.constants.SignalNames.MarkOpacity:
                    this.discardColorContextUpdates = false;
                    break;
            }
            this.newViewStateTarget = newViewStateTarget;
            this.viewer.vegaViewGl.signal(signalName, signalValue);
            this.viewer.vegaViewGl.runAsync().then(() => {

                //deeply set the state without a state change. This prevents a redraw if re-rendered
                if (this.state.signalValues) {
                    this.state.signalValues[signalName] = signalValue;
                }
                
                this.discardColorContextUpdates = true;
                this.newViewStateTarget = undefined;
                this.props.onSignalChanged && this.props.onSignalChanged(signalName, signalValue);
            });
        }

        private manageColorToolbar() {
            const canRemap = this.viewer.colorContexts && this.viewer.colorContexts.length > 1;
            applyColorButtons(this.viewer.presenter, !!this.state.columns.color, {
                themePalette: themePalettes[this.props.theme || ''],
                canRemap,
                isRemap: canRemap && this.viewer.currentColorContext > 0,
                colorMapHandler: remap => {
                    this.viewer.currentColorContext = ~~remap;
                    this.viewer.renderSameLayout();
                    this.manageColorToolbar();
                }
            });
        }

        public getInsight() {
            return this.viewer.getInsight();
        }

        public setInsight(historyAction: HistoryAction, newState: Partial<UIState> = {}, partialInsight: Partial<SandDance.specs.Insight> = this.viewer.getInsight(), rebaseFilter = false) {
            const selectedItemIndex = { ...this.state.selectedItemIndex };
            selectedItemIndex[DataScopeId.AllData] = 0;
            selectedItemIndex[DataScopeId.FilteredData] = 0;
            selectedItemIndex[DataScopeId.SelectedData] = 0;
            const historicInsight: Partial<HistoricInsight> = {
                chart: null,
                scheme: null,
                columns: null,
                filter: null,
                rebaseFilter,
                ...partialInsight
            };
            const state: Partial<UIState> = {
                filteredData: null,
                selectedItemIndex,
                search: createInputSearch(historicInsight.filter),
                ...newState
            };
            const changeInsight = () => {
                this.getColorContext = null;
                this.changeInsight(historicInsight, historyAction, state);
            };
            const currentFilter = this.viewer.getInsight().filter;
            if (rebaseFilter && currentFilter && historicInsight.filter) {
                if (SandDance.searchExpression.startsWith(historicInsight.filter, currentFilter)) {
                    changeInsight();
                } else {
                    this.viewer.reset()
                        .then(() => new Promise((resolve, reject) => { setTimeout(resolve, this.viewer.options.transitionDurations.scope); }))
                        .then(changeInsight);
                }
            } else {
                changeInsight();
            }
        }

        private handleReviveSnapshot(snapshot: Snapshot, selectedSnapshotIndex: number) {
            let handled = false;
            if (this.props.onSnapshotClick) {
                this.setState({ selectedSnapshotIndex });
                handled = this.props.onSnapshotClick(snapshot, selectedSnapshotIndex) as boolean;
            }
            if (!handled) {
                this.reviveSnapshot(selectedSnapshotIndex);
            }
        }

        public reviveSnapshot(snapshotOrIndex: Snapshot | number) {
            if (typeof snapshotOrIndex === 'number') {
                const selectedSnapshotIndex = snapshotOrIndex as number;
                const snapshot = this.state.snapshots[selectedSnapshotIndex];
                const newState: Partial<UIState> = { note: snapshot.description, selectedSnapshotIndex };
                if (!this.state.sidebarClosed) {
                    newState.sideTabId = SideTabId.Snapshots;
                    this.scrollSnapshotIntoView(selectedSnapshotIndex);
                }
                this.setInsight({ label: strings.labelHistoryReviveSnapshot }, newState, snapshot.insight, true);
            } else {
                const snapshot = snapshotOrIndex as Snapshot;
                if (snapshot.insight) {
                    this.setInsight({ label: strings.labelHistoryReviveSnapshot }, { note: snapshot.description, selectedSnapshotIndex: -1 }, snapshot.insight, true); //don't navigate to sideTab
                } else {
                    this.setState({ note: snapshot.description, selectedSnapshotIndex: -1 });
                }
            }
        }

        public load(
            data: DataFile | object[],
            getPartialInsight?: (
                columns: SandDance.types.Column[]
            ) => Partial<SandDance.specs.Insight>,
            optionsOrPrefs?: Prefs | Options
        ) {
            this.setState({ historyIndex: -1, historyItems: [] });
            this.changeInsight(
                { columns: null },
                { label: null, omit: true },
                { note: null }
            );
            return new Promise<void>((resolve, reject) => {
                const loadFinal = (dataContent: DataContent) => {
                    let partialInsight: Partial<SandDance.specs.Insight>;
                    this.prefs = (optionsOrPrefs && (optionsOrPrefs as Options).chartPrefs || (optionsOrPrefs as Prefs)) || {};
                    if (getPartialInsight) {
                        partialInsight = getPartialInsight(dataContent.columns);
                        initPrefs(this.prefs, partialInsight);
                    }
                    if (!partialInsight) {
                        //load recommendation
                        let r = new RecommenderSummary(dataContent.columns, dataContent.data);
                        partialInsight = r.recommend();
                        if (partialInsight.chart === 'barchart') {
                            partialInsight.chart = 'barchartV';
                        }
                    }
                    partialInsight = {
                        facetStyle: 'wrap',
                        filter: null,
                        totalStyle: null,
                        transform: null,
                        ...partialInsight
                    };
                    const selectedItemIndex = { ...this.state.selectedItemIndex };
                    const sideTabId = SideTabId.ChartType;
                    selectedItemIndex[DataScopeId.AllData] = 0;
                    selectedItemIndex[DataScopeId.FilteredData] = 0;
                    selectedItemIndex[DataScopeId.SelectedData] = 0;
                    let newState: Partial<State> = {
                        dataFile,
                        dataContent,
                        snapshots: dataContent.snapshots || this.state.snapshots,
                        autoCompleteDistinctValues: {},
                        filteredData: null,
                        tooltipExclusions: (optionsOrPrefs && (optionsOrPrefs as Options).tooltipExclusions) || [],
                        selectedItemIndex,
                        sideTabId,
                        ...partialInsight
                    };
                    this.getColorContext = null;
                    ensureColumnsExist(newState.columns, dataContent.columns, newState.transform);
                    const errors = ensureColumnsPopulated(partialInsight ? partialInsight.chart : null, newState.columns, dataContent.columns);
                    newState.errors = errors;
                    //change insight
                    this.changeInsight(
                        partialInsight,
                        { label: strings.labelHistoryInit, insert: true },
                        newState as State
                    );
                    //make sure item is active
                    this.activateDataBrowserItem(sideTabId, this.state.dataScopeId);
                    resolve();
                };
                let dataFile: DataFile;
                if (Array.isArray(data)) {
                    return loadDataArray(data, 'json')
                        .then(result => {
                            dataFile = {
                                type: 'json'
                            };
                            loadFinal(result);
                        })
                        .catch(reject);
                } else {
                    dataFile = data as DataFile;
                    return loadDataFile(dataFile)
                        .then(loadFinal)
                        .catch(reject);
                }
            });
        }

        public changeChartType(chart: SandDance.specs.Chart) {
            const partialInsight = copyPrefToNewState(this.prefs, chart, '*', '*');
            const insight: Partial<HistoricInsight> = { chart, ...partialInsight };
            const columns = SandDance.VegaDeckGl.util.deepMerge({}, partialInsight.columns, this.state.columns);
            insight.columns = { ...columns };

            //special case mappings when switching chart type
            if (this.state.chart === 'scatterplot' && (chart === 'barchart' || chart === 'barchartV')) {
                insight.columns = { ...columns, sort: columns.y };
            } else if (this.state.chart === 'scatterplot' && chart === 'barchartH') {
                insight.columns = { ...columns, sort: columns.x };
            } else if (chart === 'treemap') {
                insight.view = '2d';
                if (!columns.size) {
                    //make sure size exists and is numeric
                    let sizeColumnName: string;
                    //first check prefs
                    if (partialInsight && partialInsight.columns && partialInsight.columns.size) {
                        const prefSizeColumn = this.state.dataContent.columns.filter(c => c.name === partialInsight.columns.size)[0];
                        if (prefSizeColumn && prefSizeColumn.quantitative) {
                            sizeColumnName = prefSizeColumn.name;
                        }
                    }
                    if (!sizeColumnName) {
                        sizeColumnName = preferredColumnForTreemapSize(this.state.dataContent.columns, true);
                    }
                    if (!sizeColumnName) {
                        sizeColumnName = preferredColumnForTreemapSize(this.state.dataContent.columns, false);
                    }
                    if (!sizeColumnName) {
                        //TODO error - no numeric columns
                    } else {
                        insight.columns = { ...columns, size: sizeColumnName };
                    }
                }
            } else if (chart === 'stacks') {
                insight.view = '3d';
            } else if (chart === 'scatterplot' && this.state.columns.size) {
                const { signalValues } = this.viewer.getInsight();
                signalValues[SandDance.specs.SignalNames.PointScale] = 1;
                insight.signalValues = signalValues;
            }

            ensureColumnsExist(insight.columns, this.state.dataContent.columns, this.state.transform);
            const errors = ensureColumnsPopulated(chart, insight.columns, this.state.dataContent.columns);

            this.calculate(() => {
                this.changeInsight(
                    insight,
                    { label: strings.labelHistoryChangeChartType(chartLabel(chart)) },
                    errors ? { errors } : null
                );
            });
        }

        public calculate(calculating: () => any) {
            this.setState({ calculating });
        }

        public changeView(view: SandDance.types.View) {
            this.changeInsight(
                { view },
                { label: view === '2d' ? strings.labelViewType2d : strings.labelViewType3d }
            );
        }

        //state members which change the insight
        public changeInsight(partialInsight: Partial<SandDance.specs.Insight>, historyAction: HistoryAction, additionalUIState?: Partial<UIState>) {
            if (!partialInsight.signalValues) {
                partialInsight.signalValues = null;
            }
            if (partialInsight.chart === 'barchart') {
                partialInsight.chart = 'barchartV';
            }
            this.addHistory(partialInsight, historyAction, additionalUIState);
        }

        public addHistory(historicInsight: Partial<HistoricInsight>, historyAction: HistoryAction, additionalUIState?: Partial<UIState>) {

            const setCleanState = (newState: State) => {
                const cleanState = { ...newState, ...additionalUIState };
                if (!cleanState.note) {
                    cleanState.note = null;
                }
                delete cleanState.rebaseFilter;
                this.setState(cleanState);
            };

            if (historyAction.omit) {
                setCleanState(historicInsight as State);
                return;
            }
            const historyItems = this.state.historyItems.slice(0, this.state.historyIndex + 1);
            const historyIndex = historyItems.length;
            historyItems.push({ label: historyAction.label, historicInsight });
            if (historyAction.insert) {
                setCleanState({ historyIndex, historyItems } as State);
            } else {
                setCleanState({ ...historicInsight, historyIndex, historyItems } as State);
            }
        }

        private replay(index: number) {
            let filter: SandDance.searchExpression.Search = null;
            let historicInsight: Partial<HistoricInsight> = {};
            for (let i = 0; i < index + 1; i++) {
                const historyItem = this.state.historyItems[i];
                if (historyItem) {
                    if (historyItem.historicInsight.filter === null) {
                        filter = null;
                    } else if (historyItem.historicInsight.rebaseFilter) {
                        filter = historyItem.historicInsight.filter;
                    } else if (historyItem.historicInsight.filter) {
                        filter = SandDance.searchExpression.narrow(filter, historyItem.historicInsight.filter);
                    }
                    historicInsight = { ...historicInsight, ...historyItem.historicInsight };
                }
            }
            return { ...historicInsight, filter };
        }

        public undo() {
            const historyIndex = this.state.historyIndex - 1;
            if (historyIndex < 0) return;
            const newState = this.replay(historyIndex);
            this.rebaseFilter = true;
            this.setState({ ...newState as State, historyIndex });
        }

        public redo(historyIndex = this.state.historyIndex + 1) {
            if (historyIndex >= this.state.historyItems.length) return;
            const newState = this.replay(historyIndex);
            this.rebaseFilter = true;
            this.setState({ ...newState as State, historyIndex });
        }

        public changespecCapabilities(
            specCapabilities: SandDance.specs.SpecCapabilities
        ) {
            this.setState({ specCapabilities });
        }

        public changeColumnMapping(role: SandDance.specs.InsightColumnRoles, column: SandDance.types.Column, options?: ChangeColumnMappingOptions) {
            const columns = { ...this.state.columns };
            const label = column ? strings.labelHistoryMapColumn(role) : strings.labelHistoryUnMapColumn(role);
            const final = () => {
                columns[role] = column && column.name;
                this.changeInsight(
                    { columns },
                    { label }
                );
            };
            const _changeInsight = (newInsight: Partial<HistoricInsight>, columnUpdate: SandDance.specs.InsightColumns, historyAction: HistoryAction) => {
                newInsight.columns = SandDance.VegaDeckGl.util.deepMerge(
                    {},
                    columns,
                    columnUpdate
                );
                savePref(this.prefs, this.state.chart, '*', '*', { columns: columnUpdate });
                this.changeInsight(newInsight, historyAction);
            };
            if (column) {
                let columnUpdate: SandDance.specs.InsightColumns;
                switch (role) {
                    case 'facet': {
                        copyPrefToNewState(this.prefs, this.state.chart, 'facet', column.name);
                        const historicInsight: Partial<HistoricInsight> = { columns, facetStyle: options ? options.facetStyle : this.state.facetStyle };
                        columnUpdate = { facet: column.name };
                        _changeInsight(historicInsight, columnUpdate, { label });
                        break;
                    }
                    case 'color': {
                        let calculating: () => void = null;
                        let historicInsight: Partial<HistoricInsight> = { scheme: options && options.scheme, columns, colorBin: this.state.colorBin };
                        if (!historicInsight.scheme) {
                            copyPrefToNewState(this.prefs, this.state.chart, 'color', column.name);
                        }
                        if (!historicInsight.scheme) {
                            historicInsight.scheme = bestColorScheme(column, null, this.state.scheme);
                        }
                        if (!column.stats.hasColorData) {
                            historicInsight.directColor = false;
                            if (this.state.directColor !== historicInsight.directColor) {
                                calculating = () => this._resize();
                            }
                        }
                        if (this.state.columns && this.state.columns.color && this.state.columns.color !== column.name) {
                            const currColorColumn = this.state.dataContent.columns.filter(c => c.name === this.state.columns.color)[0];
                            if (column.isColorData != currColorColumn.isColorData) {
                                calculating = () => this._resize();
                            }
                        }
                        this.ignoreSelectionChange = true;
                        this.viewer.deselect().then(() => {
                            this.ignoreSelectionChange = false;
                            //allow deselection to render
                            requestAnimationFrame(() => {
                                columnUpdate = { color: column.name };
                                this.getColorContext = null;
                                this.setState({ calculating });
                                _changeInsight(historicInsight, columnUpdate, { label });
                            });
                        });
                        break;
                    }
                    case 'x': {
                        copyPrefToNewState(this.prefs, this.state.chart, 'x', column.name);
                        const historicInsight: Partial<HistoricInsight> = { columns };
                        columnUpdate = { x: column.name };
                        _changeInsight(historicInsight, columnUpdate, { label });
                        break;
                    }
                    case 'size': {
                        copyPrefToNewState(this.prefs, this.state.chart, 'size', column.name);
                        const historicInsight: Partial<HistoricInsight> = { totalStyle: options ? options.totalStyle : this.state.totalStyle };
                        columnUpdate = { size: column.name };
                        _changeInsight(historicInsight, columnUpdate, { label });
                        break;
                    }
                    default: {
                        final();
                        break;
                    }
                }
            } else {
                switch (role) {
                    case 'facet': {
                        columns.facet = null;
                        columns.facetV = null;
                        this.changeInsight(
                            { columns, facetStyle: 'wrap' },
                            { label }
                        );
                        break;
                    }
                    default: {
                        final();
                        break;
                    }
                }
            }
        }

        private setSideTabId(sideTabId: SideTabId, dataScopeId?: DataScopeId) {
            if (sideTabId === SideTabId.Data && dataScopeId == null) {
                //choose most relevant DataScopeId
                dataScopeId = this.getBestDataScopeId();
            }
            if (dataScopeId == null) {
                dataScopeId = this.state.dataScopeId;
            }
            this.setState({ sideTabId, dataScopeId, sidebarClosed: false });
            this.activateDataBrowserItem(sideTabId, dataScopeId);
        }

        private getBestDataScopeId() {
            let dataScopeId: DataScopeId;
            const selectionState: SandDance.types.SelectionState = this.viewer && this.viewer.getSelection();
            if (selectionState && selectionState.selectedData && selectionState.selectedData.length) {
                dataScopeId = DataScopeId.SelectedData;
            }
            else if (this.state.filteredData) {
                dataScopeId = DataScopeId.FilteredData;
            }
            else {
                dataScopeId = DataScopeId.AllData;
            }
            return dataScopeId;
        }

        private activateDataBrowserItem(sideTabId: SideTabId, dataScopeId: DataScopeId) {
            if (!this.viewer) return;
            let itemToActivate: object;
            if (sideTabId === SideTabId.Data) {
                switch (dataScopeId) {
                    case DataScopeId.AllData: {
                        itemToActivate = this.state.dataContent && this.state.dataContent.data[this.state.selectedItemIndex[DataScopeId.AllData]];
                        break;
                    }
                    case DataScopeId.FilteredData: {
                        itemToActivate = this.state.filteredData && this.state.filteredData[this.state.selectedItemIndex[DataScopeId.FilteredData]];
                        break;
                    }
                    case DataScopeId.SelectedData: {
                        const selection = this.viewer.getSelection() || {};
                        itemToActivate = selection.selectedData && selection.selectedData[this.state.selectedItemIndex[DataScopeId.SelectedData]];
                        break;
                    }
                }
            }
            this.silentActivation(itemToActivate);
        }

        private silentActivation(itemToActivate: object) {
            this.ignoreSelectionChange = true;
            const done = () => {
                this.ignoreSelectionChange = false;
            };
            if (itemToActivate) {
                return this.viewer.activate(itemToActivate).then(done);
            } else {
                return this.viewer.deActivate().then(done);
            }
        }

        public sidebar(sidebarClosed: boolean, sidebarPinned: boolean) {
            this.setState({ sidebarClosed, sidebarPinned });
        }

        public resize() {
            this.setState({ calculating: () => this._resize() });
        }

        private _resize() {
            this.changeInsight(
                { size: this.getLayoutDivSize(this.state.sidebarPinned, this.state.sidebarClosed) },
                { label: 'resize', omit: true }
            );
        }

        private viewerMounted(glDiv: HTMLElement) {
            this.setState({
                size: this.getLayoutDivSize(this.state.sidebarPinned, this.state.sidebarClosed),
                signalValues: this.state.signalValues //keep initialized signalValues
            });
        }

        private getLayoutDivSize(pinned: boolean, closed: boolean) {
            const div = pinned && !closed ? this.layoutDivPinned : this.layoutDivUnpinned;
            return { height: div.offsetHeight, width: div.offsetWidth };
        }

        private toggleableSearch(e: TouchEvent | MouseEvent | PointerEvent, search: SandDance.searchExpression.SearchExpressionGroup) {
            if (e.ctrlKey) {
                this.setState({ search: createInputSearch(search) });
                this.setSideTabId(SideTabId.Search);
            } else {
                var oldSelection = this.viewer.getSelection();
                if (oldSelection.search) {
                    //look for matching groups and toggle them
                    const result = toggleSearch(SandDance.searchExpression.ensureSearchExpressionGroupArray(oldSelection.search), search);
                    if (result.found) {
                        //removing a group
                        if (result.groups.length === 0) {
                            this.doDeselect();
                        } else {
                            //select with new search removed
                            this.doSelect(result.groups);
                        }
                    } else {
                        //adding a new group
                        if (e.altKey || e.shiftKey) {
                            let group = true;
                            if (e.altKey) {
                                search.clause = '&&';
                            } else if (e.shiftKey) {
                                if (this.props.searchORDisabled) {
                                    group = false;
                                } else {
                                    search.clause = '||';
                                }
                            }
                            if (group) {
                                result.groups.push(search);
                                this.doSelect(result.groups);
                            } else {
                                this.doSelect(search);
                            }
                        } else {
                            //replace
                            this.doSelect(search);
                        }
                    }
                } else {
                    this.doSelect(search);
                }
            }
        }

        private doFilter(search: SandDance.searchExpression.Search, historicFilterChange: string) {
            this.historicFilterChange = historicFilterChange;
            this.viewer.filter(search);
        }

        private doUnfilter(historicFilterChange: string) {
            this.historicFilterChange = historicFilterChange;
            this.viewer.reset();
        }

        private doSelect(search: SandDance.searchExpression.Search) {
            this.viewer.select(search);
        }

        private doDeselect() {
            return this.viewer.deselect();
        }

        private writeSnapshot(snapshot: Snapshot, editIndex: number) {
            let { selectedSnapshotIndex } = this.state;
            let snapshots: Snapshot[];
            if (editIndex >= 0) {
                snapshots = [...this.state.snapshots];
                snapshots[editIndex] = snapshot;
                this.setState({ snapshots, selectedSnapshotIndex });
            } else {
                const note = snapshot.description;
                snapshots = this.state.snapshots.concat(snapshot);
                selectedSnapshotIndex = snapshots.length - 1;
                this.scrollSnapshotIntoView(selectedSnapshotIndex);
                this.setState({ sideTabId: SideTabId.Snapshots, snapshots, selectedSnapshotIndex, note });
            }
            this.props.onSnapshotsChanged && this.props.onSnapshotsChanged(snapshots);
        }

        public scrollSnapshotIntoView(selectedSnapshotIndex: number) {
            clearTimeout(this.scrollSnapshotTimer);
            if (this.state.sidebarClosed) return;
            this.scrollSnapshotTimer = setTimeout(() => {
                const selectedSnapshotElement = this.div.querySelector(`.snapshot:nth-child(${selectedSnapshotIndex + 1})`) as HTMLElement;
                if (selectedSnapshotElement) {
                    selectedSnapshotElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 500) as any as number;
        }

        componentDidMount() {
            if (this.props.mounted) {
                this.props.mounted(this as any as Explorer_Class);
            }
        }

        render() {
            const { colorBin, columns, directColor, facetStyle, filter, hideAxes, hideLegend, scheme, signalValues, size, totalStyle, transform, chart, view } = this.state;
            const insight: SandDance.specs.Insight = {
                colorBin,
                columns,
                directColor,
                facetStyle,
                filter,
                hideAxes,
                hideLegend,
                scheme,
                signalValues,
                size,
                totalStyle,
                transform,
                chart,
                view
            };

            const loaded = !!(this.state.columns && this.state.dataContent);

            const selectionState: SandDance.types.SelectionState = (this.viewer && this.viewer.getSelection()) || {};
            const selectionSearch = selectionState && selectionState.search;

            const columnMapProps = this.getColumnMapBaseProps();

            const datas: { [key: number]: object[] } = {};
            datas[DataScopeId.AllData] = this.state.dataContent && this.state.dataContent.data;
            datas[DataScopeId.FilteredData] = this.state.filteredData;
            datas[DataScopeId.SelectedData] = selectionState && selectionState.selectedData;

            if (this.state.calculating) {
                requestAnimationFrame(() => {
                    //allow render to complete
                    if (this.state.calculating) {
                        this.state.calculating();
                        this.setState({ calculating: null });
                    }
                });
            }

            const theme = this.props.theme || '';
            const themePalette = themePalettes[theme];

            return (
                <div
                    ref={div => { if (div) this.div = div; }}
                    className={util.classList('sanddance-explorer', this.props.theme)}
                >
                    <Topbar
                        collapseLabels={this.props.compactUI}
                        historyIndex={this.state.historyIndex}
                        historyItems={this.state.historyItems}
                        undo={() => this.undo()}
                        redo={() => this.redo()}
                        logoClickUrl={this.props.logoClickUrl}
                        logoClickTarget={this.props.logoClickTarget}
                        themePalette={themePalette}
                        loaded={loaded}
                        doDeselect={this.doDeselect.bind(this)}
                        doFilter={this.doFilter.bind(this)}
                        doUnfilter={this.doUnfilter.bind(this)}
                        filter={this.state.filter}
                        selectionSearch={selectionSearch}
                        selectionState={selectionState}
                        buttons={this.props.topBarButtonProps}
                        view={this.state.view}
                        snapshots={this.state.snapshots}
                        onSnapshotPreviousClick={() => {
                            let selectedSnapshotIndex: number;
                            if (this.state.selectedSnapshotIndex === -1) {
                                selectedSnapshotIndex = this.state.snapshots.length - 1;
                            } else {
                                selectedSnapshotIndex = this.state.selectedSnapshotIndex;
                                selectedSnapshotIndex--;
                                if (selectedSnapshotIndex < 0) {
                                    selectedSnapshotIndex = this.state.snapshots.length - 1;
                                }
                            }
                            this.handleReviveSnapshot(this.state.snapshots[selectedSnapshotIndex], selectedSnapshotIndex);
                        }}
                        onSnapshotClick={() => this.snapshotEditor.editSnapshot()}
                        onSnapshotNextClick={() => {
                            let selectedSnapshotIndex: number;
                            if (this.state.selectedSnapshotIndex === -1) {
                                selectedSnapshotIndex = 0;
                            } else {
                                selectedSnapshotIndex = this.state.selectedSnapshotIndex;
                                selectedSnapshotIndex++;
                                if (selectedSnapshotIndex > this.state.snapshots.length - 1) {
                                    selectedSnapshotIndex = 0;
                                }
                            }
                            this.handleReviveSnapshot(this.state.snapshots[selectedSnapshotIndex], selectedSnapshotIndex);
                        }}
                        onViewClick={() => {
                            const view = this.state.view === '2d' ? '3d' : '2d';
                            this.changeInsight(
                                { view },
                                { label: view === '2d' ? strings.labelViewType2d : strings.labelViewType3d }
                            );
                        }}
                        onHomeClick={() => this.viewer.presenter.homeCamera()}
                    />
                    <div className={util.classList('sanddance-main', this.state.sidebarPinned && 'pinned', this.state.sidebarClosed && 'closed', (insight.hideLegend || insight.directColor || !colorMapping(insight, this.state.dataContent && this.state.dataContent.columns)) && 'hide-legend')}>
                        <div ref={div => { if (div && !this.layoutDivUnpinned) this.layoutDivUnpinned = div; }} className="sanddance-layout-unpinned"></div>
                        <div ref={div => { if (div && !this.layoutDivPinned) this.layoutDivPinned = div; }} className="sanddance-layout-pinned"></div>
                        {!loaded && (
                            <div className="loading">
                                <base.fluentUI.Spinner
                                    size={base.fluentUI.SpinnerSize.large}
                                    label={strings.loading}
                                />
                            </div>
                        )}
                        <Sidebar
                            themePalette={themePalette}
                            calculating={!!this.state.calculating}
                            closed={this.state.sidebarClosed}
                            hideSidebarControls={this.props.hideSidebarControls}
                            pinned={this.state.sidebarPinned}
                            disabled={!loaded}
                            dataScopeProps={{
                                themePalette,
                                compact: this.state.sidebarClosed,
                                onCompactClick: () => {
                                    this.changeInsight(
                                        {
                                            size: this.getLayoutDivSize(this.state.sidebarPinned, false)
                                        },
                                        {
                                            label: null, omit: true
                                        },
                                        {
                                            sidebarClosed: false,
                                        }
                                    );
                                },
                                dataSet: this.props.datasetElement,
                                dataCount: loaded && {
                                    all: this.state.dataContent && this.state.dataContent.data.length,
                                    filtered: this.state.filteredData && this.state.filteredData.length,
                                    selected: selectionState && selectionState.selectedData && selectionState.selectedData.length
                                },
                                active: this.state.sideTabId === SideTabId.Data,
                                onDataScopeClick: dataScopeId => this.setSideTabId(SideTabId.Data, dataScopeId),
                                selectedDataScope: this.state.dataScopeId,
                                disabled: !loaded
                            }}
                            onSideTabClick={sideTabId => {
                                //collapse or toggle
                                if (sideTabId === SideTabId.Collapse || this.state.sideTabId === sideTabId) {
                                    let { dataScopeId, sidebarClosed } = this.state;
                                    if (sidebarClosed && sideTabId === SideTabId.Data) {
                                        dataScopeId = this.getBestDataScopeId();
                                    }
                                    sidebarClosed = !this.state.sidebarClosed;
                                    this.changeInsight(
                                        {
                                            size: this.getLayoutDivSize(this.state.sidebarPinned, sidebarClosed)
                                        },
                                        {
                                            label: null, omit: true
                                        },
                                        {
                                            dataScopeId,
                                            sidebarClosed,
                                        }
                                    );
                                } else if (sideTabId === SideTabId.Pin) {
                                    this.changeInsight(
                                        {
                                            size: this.getLayoutDivSize(!this.state.sidebarPinned, this.state.sidebarClosed)
                                        },
                                        {
                                            label: null, omit: true
                                        },
                                        {
                                            sidebarPinned: !this.state.sidebarPinned
                                        }
                                    );
                                } else {
                                    this.setSideTabId(sideTabId);
                                }
                            }}
                            selectedSideTab={this.state.sideTabId}
                        >
                            {loaded && (() => {
                                switch (this.state.sideTabId) {
                                    case SideTabId.ChartType: {
                                        return (
                                            <Chart
                                                collapseLabels={this.props.compactUI}
                                                tooltipExclusions={this.state.tooltipExclusions}
                                                toggleTooltipExclusion={columnName => {
                                                    const tooltipExclusions = [...this.state.tooltipExclusions];
                                                    const i = tooltipExclusions.indexOf(columnName);
                                                    if (i < 0) {
                                                        tooltipExclusions.push(columnName);
                                                    } else {
                                                        tooltipExclusions.splice(i, 1);
                                                    }
                                                    this.setState({ tooltipExclusions });
                                                    this.props.onTooltipExclusionsChanged && this.props.onTooltipExclusionsChanged(tooltipExclusions);
                                                }}
                                                disabled={!loaded || this.state.sidebarClosed}
                                                {...columnMapProps}
                                                chart={this.state.chart}
                                                view={this.state.view}
                                                onChangeChartType={chart => this.changeChartType(chart)}
                                                insightColumns={this.state.columns}
                                                onChangeSignal={(role, column, name, value) => saveSignalValuePref(this.prefs, this.state.chart, role, column, name, value)}
                                            />
                                        );
                                    }
                                    case SideTabId.Color: {
                                        return (
                                            <Color
                                                compactUI={this.props.compactUI}
                                                specCapabilities={this.state.specCapabilities}
                                                disabled={!loaded || this.state.sidebarClosed}
                                                {...columnMapProps}
                                                dataContent={this.state.dataContent}
                                                scheme={this.state.scheme}
                                                colorBin={this.state.colorBin}
                                                colorBinSignal={this.viewer && this.viewer.vegaSpec && this.viewer.vegaSpec.signals.filter(s => s.name === SandDance.constants.SignalNames.ColorBinCount)[0]}
                                                colorReverseSignal={this.viewer && this.viewer.vegaSpec && this.viewer.vegaSpec.signals.filter(s => s.name === SandDance.constants.SignalNames.ColorReverse)[0]}
                                                colorColumn={this.state.columns.color}
                                                onColorBinChange={colorBin => {
                                                    this.ignoreSelectionChange = true;
                                                    this.viewer.deselect().then(() => {
                                                        this.ignoreSelectionChange = false;
                                                        //allow deselection to render
                                                        requestAnimationFrame(() => {
                                                            this.getColorContext = null;
                                                            this.changeInsight(
                                                                { colorBin },
                                                                { label: strings.labelHistoryColorBin }
                                                            );
                                                            savePref(this.prefs, this.state.chart, 'color', this.state.columns.color, { colorBin });
                                                        });
                                                    });
                                                }}
                                                onColorSchemeChange={(scheme) => {
                                                    this.changeColumnMapping('color', this.state.dataContent.columns.filter(c => c.name === this.state.columns.color)[0], { scheme });
                                                    savePref(this.prefs, this.state.chart, 'color', this.state.columns.color, { scheme });
                                                }}
                                                onColorBinCountChange={value => {
                                                    const signalValues: SandDance.specs.SignalValues = {};
                                                    signalValues[SandDance.constants.SignalNames.ColorBinCount] = value;
                                                    savePref(this.prefs, this.state.chart, 'color', this.state.columns.color, { signalValues });
                                                }}
                                                onColorReverseChange={value => {
                                                    this.getColorContext = null;
                                                }}
                                                directColor={this.state.directColor}
                                                onDirectColorChange={directColor => {
                                                    this.changeInsight(
                                                        { directColor },
                                                        { label: strings.labelHistoryDirectColor },
                                                        { calculating: () => this._resize() }
                                                    );
                                                }}
                                            />
                                        );
                                    }
                                    case SideTabId.Data: {
                                        const data = datas[this.state.dataScopeId];
                                        let itemVisible = true;
                                        switch (this.state.dataScopeId) {
                                            case DataScopeId.AllData: {
                                                const item = this.state.selectedItemIndex[this.state.dataScopeId];
                                                itemVisible = this.state.dataContent && !this.state.filteredData || this.state.filteredData.indexOf(data[item]) >= 0;
                                            }
                                        }
                                        return (
                                            <DataBrowser
                                                theme={this.props.theme}
                                                themePalette={themePalette}
                                                disabled={!loaded || this.state.sidebarClosed}
                                                columns={this.state.dataContent && this.state.dataContent.columns}
                                                data={data}
                                                displayName={(this.state.dataFile && this.state.dataFile.displayName) || strings.defaultFileName}
                                                nullMessage={dataBrowserNullMessages[this.state.dataScopeId]}
                                                zeroMessage={dataBrowserZeroMessages[this.state.dataScopeId]}
                                                index={this.state.selectedItemIndex[this.state.dataScopeId]}
                                                itemVisible={itemVisible}
                                                dataExportHandler={this.props.dataExportHandler}
                                                selectedDataScope={this.state.dataScopeId}
                                                onDataScopeClick={dataScopeId => this.setSideTabId(SideTabId.Data, dataScopeId)}
                                                onActivate={(row, index) => {
                                                    const selectedItemIndex = { ...this.state.selectedItemIndex };
                                                    selectedItemIndex[this.state.dataScopeId] = index;
                                                    this.setState({ selectedItemIndex });
                                                    this.silentActivation(row);
                                                }}
                                                onSearch={(e, search) => {
                                                    if (e.ctrlKey) {
                                                        this.setState({ sideTabId: SideTabId.Search, search });
                                                    } else {
                                                        this.doSelect(search);
                                                    }
                                                }}
                                                bingSearchDisabled={this.props.bingSearchDisabled}
                                            />
                                        );
                                    }
                                    case SideTabId.Search: {
                                        return (
                                            <Search
                                                collapseLabels={this.props.compactUI}
                                                themePalette={themePalette}
                                                disabled={!loaded || this.state.sidebarClosed}
                                                disableGroupOR={this.props.searchORDisabled}
                                                disableExpressionOR={this.props.searchORDisabled}
                                                initializer={{
                                                    columns: columnMapProps.allColumns,
                                                    search: this.state.search
                                                }}
                                                autoCompleteDistinctValues={this.state.autoCompleteDistinctValues}
                                                onSelect={expr => this.doSelect(expr)}
                                                data={this.state.dataContent.data}
                                            />
                                        );
                                    }
                                    case SideTabId.Snapshots: {
                                        return (
                                            <Snapshots
                                                {...this.props.snapshotProps}
                                                editor={this.snapshotEditor}
                                                themePalette={themePalette}
                                                explorer={this as any as Explorer_Class}
                                                snapshots={this.state.snapshots}
                                                selectedSnapshotIndex={this.state.selectedSnapshotIndex}
                                                onClearSnapshots={() => {
                                                    const snapshots = [];
                                                    this.setState({ snapshots, selectedSnapshotIndex: -1 });
                                                    this.props.onSnapshotsChanged && this.props.onSnapshotsChanged(snapshots);
                                                }}
                                                onWriteSnapshot={(s, i) => this.writeSnapshot(s, i)}
                                                onRemoveSnapshot={i => {
                                                    const snapshots = [...this.state.snapshots];
                                                    snapshots.splice(i, 1);
                                                    let { selectedSnapshotIndex } = this.state;
                                                    if (i === selectedSnapshotIndex) {
                                                        selectedSnapshotIndex = -1;
                                                    } else if (selectedSnapshotIndex > i) {
                                                        selectedSnapshotIndex--;
                                                    }
                                                    this.setState({ snapshots, selectedSnapshotIndex });
                                                    this.props.onSnapshotsChanged && this.props.onSnapshotsChanged(snapshots);
                                                }}
                                                onSnapshotClick={(snapshot, selectedSnapshotIndex) => {
                                                    this.setState({ selectedSnapshotIndex });
                                                    this.calculate(() => {
                                                        this.handleReviveSnapshot(snapshot, selectedSnapshotIndex);
                                                    });
                                                }}
                                                onMoveUp={i => {
                                                    if (i > 0) {
                                                        const snapshots = [...this.state.snapshots];
                                                        const temp = snapshots[i - 1];
                                                        snapshots[i - 1] = snapshots[i];
                                                        snapshots[i] = temp;
                                                        let { selectedSnapshotIndex } = this.state;
                                                        if (i === selectedSnapshotIndex) {
                                                            selectedSnapshotIndex = i - 1;
                                                        } else if (i - 1 === selectedSnapshotIndex) {
                                                            selectedSnapshotIndex = i;
                                                        }
                                                        this.setState({ snapshots, selectedSnapshotIndex });
                                                        this.props.onSnapshotsChanged && this.props.onSnapshotsChanged(snapshots);
                                                    }
                                                }}
                                                onMoveDown={i => {
                                                    if (i < this.state.snapshots.length - 1) {
                                                        const snapshots = [...this.state.snapshots];
                                                        const temp = snapshots[i + 1];
                                                        snapshots[i + 1] = snapshots[i];
                                                        snapshots[i] = temp;
                                                        let { selectedSnapshotIndex } = this.state;
                                                        if (i === selectedSnapshotIndex) {
                                                            selectedSnapshotIndex = i + 1;
                                                        } else if (i + 1 === selectedSnapshotIndex) {
                                                            selectedSnapshotIndex = i;
                                                        }
                                                        this.setState({ snapshots, selectedSnapshotIndex });
                                                        this.props.onSnapshotsChanged && this.props.onSnapshotsChanged(snapshots);
                                                    }
                                                }}
                                            />
                                        );
                                    }
                                    case SideTabId.History: {
                                        return (
                                            <History
                                                theme={theme}
                                                themePalette={themePalette}
                                                historyIndex={this.state.historyIndex}
                                                historyItems={this.state.historyItems}
                                                redo={i => this.redo(i)}
                                            />
                                        );
                                    }
                                    case SideTabId.Settings: {
                                        return (
                                            <Settings
                                                explorer={this as any as Explorer_Class}
                                                dataFile={this.state.dataFile}
                                                scheme={this.state.scheme}
                                                hideLegend={this.state.hideLegend}
                                                onToggleLegend={hideLegend => this.setState({ hideLegend, calculating: () => this._resize() })}
                                                hideAxes={this.state.hideAxes}
                                                onToggleAxes={hideAxes => this.setState({ calculating: () => this.setState({ hideAxes }) })}
                                                additionalSettings={this.props.additionalSettings}
                                            >
                                                {this.props.systemInfoChildren}
                                            </Settings>
                                        );
                                    }
                                }
                            })()}
                        </Sidebar>
                        {loaded && (
                            <div className="sanddance-view">
                                <SandDanceReact
                                    renderOptions={{
                                        rebaseFilter: () => {
                                            const { rebaseFilter } = this;
                                            if (rebaseFilter) {
                                                this.rebaseFilter = false;
                                            }
                                            return rebaseFilter;
                                        },
                                        initialColorContext: this.getColorContext && this.getColorContext(this.viewer.insight, insight),
                                        discardColorContextUpdates: () => this.discardColorContextUpdates
                                    }}
                                    viewerOptions={this.viewerOptions}
                                    ref={reactViewer => {
                                        if (reactViewer) {
                                            this.viewer = reactViewer.viewer;
                                        }
                                    }}
                                    onView={renderResult => {
                                        this.changespecCapabilities(renderResult.specResult.errors ? renderResult.specResult.specCapabilities : this.viewer.specCapabilities);
                                        this.getColorContext = (oldInsight: SandDance.specs.Insight, newInsight: SandDance.specs.Insight) => {
                                            if (!oldInsight && !newInsight) {
                                                return null;
                                            }
                                            if (!oldInsight || !newInsight) {
                                                return null;
                                            }
                                            if (oldInsight.scheme !== newInsight.scheme) {
                                                return null;
                                            }
                                            if (oldInsight.columns.color !== newInsight.columns.color) {
                                                return null;
                                            }
                                            if (oldInsight.directColor != newInsight.directColor) {
                                                return null;
                                            }
                                            return this.viewer.colorContexts && this.viewer.colorContexts[this.viewer.currentColorContext];
                                        };
                                        //don't allow tabbing to the canvas
                                        removeTabIndex(this.viewer);
                                        this.props.onView && this.props.onView();
                                    }}
                                    onError={e => {
                                        this.props.onError && this.props.onError(e);
                                    }}
                                    data={this.state.dataContent.data}
                                    insight={insight}
                                    onMount={el => this.viewerMounted(el)}
                                />
                                {this.state.note && (
                                    <div className='sanddance-note'>
                                        <IconButton
                                            className='cancel'
                                            themePalette={themePalette}
                                            title={strings.buttonClose}
                                            iconName='Cancel'
                                            onClick={() => this.setState({ note: null })}
                                        />
                                        <div>{this.state.note}</div>
                                    </div>
                                )}
                            </div>
                        )}
                        <Dialog
                            title={strings.labelError}
                            hidden={!this.state.errors}
                            onDismiss={() => {
                                this.setState({ errors: null });
                            }}
                        >
                            {this.state.errors && this.state.errors.map((error, i) => (
                                <div key={i}>{error}</div>
                            ))}
                        </Dialog>
                        <SnapshotEditor
                            ref={se => this.snapshotEditor = se}
                            {...this.props.snapshotProps}
                            explorer={this as any as Explorer_Class}
                            onWriteSnapshot={(s, i) => this.writeSnapshot(s, i)}
                            theme={this.props.theme}
                            themePalette={themePalette}
                        />
                    </div>
                    {this.state.positionedColumnMapProps && (
                        <PositionedColumnMap
                            {...this.state.positionedColumnMapProps}
                        />
                    )}
                </div>
            );
        }

        private getColumnMapBaseProps() {
            const allColumns = this.state.dataContent && this.state.dataContent.columns.filter(c => !SandDance.util.isInternalFieldName(c.name, true));
            const quantitativeColumns = allColumns && allColumns.filter(c => c.quantitative);
            const categoricalColumns = allColumns && allColumns.filter(c => !c.quantitative);
            const props: ColumnMapBaseProps = {
                changeColumnMapping: (role, columnOrRole, options) => {
                    let column: SandDance.types.Column;
                    if (typeof columnOrRole === 'string') {
                        //look up current insight
                        const columnName = this.state.columns[columnOrRole];
                        column = allColumns.filter(c => c.name === columnName)[0];
                    } else {
                        column = columnOrRole;
                    }
                    this.changeColumnMapping(role, column, options);
                },
                facetStyle: this.state.facetStyle,
                totalStyle: this.state.totalStyle,
                allColumns,
                quantitativeColumns,
                categoricalColumns,
                specCapabilities: this.state.specCapabilities,
                explorer: this as any as Explorer_Class
            };
            return props;
        }
    }
    return new __Explorer(props);
}

export const Explorer: typeof Explorer_Class = _Explorer as any;

export declare class Explorer_Class extends base.react.Component<Props, State> {
    private layoutDivUnpinned;
    private layoutDivPinned;
    private getColorContext;
    private historicFilterChange;
    private rebaseFilter;
    private ignoreSelectionChange;
    private snapshotEditor;
    private scrollSnapshotTimer;
    private newViewStateTarget;
    viewer: SandDance.Viewer;
    viewerOptions: Partial<SandDance.types.ViewerOptions>;
    discardColorContextUpdates: boolean;
    prefs: Prefs;
    div: HTMLElement;
    snapshotThumbWidth: number;
    constructor(props: Props);
    finalize(): void;
    updateViewerOptions(viewerOptions: Partial<SandDance.types.ViewerOptions>): void;
    signal(signalName: string, signalValue: any, newViewStateTarget?: boolean): void;
    private manageColorToolbar;
    getInsight(): SandDance.specs.Insight;
    setInsight(historyAction: HistoryAction, newState?: Partial<UIState>, partialInsight?: Partial<SandDance.specs.Insight>, rebaseFilter?: boolean): void;
    private handleReviveSnapshot;
    reviveSnapshot(snapshotOrIndex: Snapshot | number): void;
    load(data: DataFile | object[], getPartialInsight?: (columns: SandDance.types.Column[]) => Partial<SandDance.specs.Insight>, optionsOrPrefs?: Prefs | Options): Promise<void>;
    changeChartType(chart: SandDance.specs.Chart): void;
    calculate(calculating: () => any): void;
    changeView(view: SandDance.types.View): void;
    changeInsight(partialInsight: Partial<SandDance.specs.Insight>, historyAction: HistoryAction, additionalUIState?: Partial<UIState>): void;
    addHistory(historicInsight: Partial<HistoricInsight>, historyAction: HistoryAction, additionalUIState?: Partial<UIState>): void;
    private replay;
    undo(): void;
    redo(historyIndex?: number): void;
    changespecCapabilities(specCapabilities: SandDance.specs.SpecCapabilities): void;
    changeColumnMapping(role: SandDance.specs.InsightColumnRoles, column: SandDance.types.Column, options?: ChangeColumnMappingOptions): void;
    private setSideTabId;
    private getBestDataScopeId;
    private activateDataBrowserItem;
    private silentActivation;
    sidebar(sidebarClosed: boolean, sidebarPinned: boolean): void;
    resize(): void;
    private _resize;
    private viewerMounted;
    private getLayoutDivSize;
    private toggleableSearch;
    private doFilter;
    private doUnfilter;
    private doSelect;
    private doDeselect;
    private writeSnapshot;
    scrollSnapshotIntoView(selectedSnapshotIndex: number): void;
    componentDidMount(): void;
    render(): JSX.Element;
    private getColumnMapBaseProps;
}

function colorMapping(insight: SandDance.specs.Insight, columns: SandDance.types.Column[]) {
    if (columns && insight.columns && insight.columns.color) {
        return columns.filter(c => c.name === insight.columns.color)[0];
    }
}
