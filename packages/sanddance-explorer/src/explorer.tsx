// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { applyColorButtons } from './colorMap';
import { AutoCompleteDistinctValues, InputSearchExpression } from './controls/searchTerm';
import { base } from './base';
import { bestColorScheme } from './colorScheme';
import { Chart } from './dialogs/chart';
import { Color } from './dialogs/color';
import {
  ColorSettings,
  DataContent,
  DataFile,
  Snapshot
} from './interfaces';
import { ColumnMapBaseProps } from './controls/columnMap';
import {
  copyPrefToNewState,
  initPrefs,
  Prefs,
  savePref,
  saveSignalValuePref
} from './partialInsight';
import { DataBrowser } from './dialogs/dataBrowser';
import { DataScopeId } from './controls/dataScope';
import { defaultViewerOptions } from './defaults';
import { Dialog } from './controls/dialog';
import { ensureColumnsExist, ensureColumnsPopulated } from './columns';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { getPosition } from './mouseEvent';
import { InputSearchExpressionGroup, Search } from './dialogs/search';
import { loadDataArray, loadDataFile } from './dataLoader';
import {
  onBeforeCreateLayers,
  PositionedColumnMap,
  PositionedColumnMapProps,
  TextWithSpecRole
} from './clickableTextLayer';
import { preferredColumnForTreemapSize, RecommenderSummary } from '@msrvida/chart-recommender';
import { removeTabIndex } from './canvas';
import { SandDance, SandDanceReact, util } from '@msrvida/sanddance-react';
import { Settings } from './dialogs/settings';
import { Sidebar, SideTabId } from './controls/sidebar';
import { SnapshotProps, Snapshots } from './dialogs/snapshots';
import { strings } from './language';
import { themePalettes } from './themes';
import { toggleSearch } from './toggleSearch';
import { Topbar } from './controls/topbar';

export interface Options {
  chartPrefs?: Prefs;
  tooltipExclusions?: string[];
}

export interface Props {
  hideSidebarControls?: boolean;
  logoClickUrl?: string;
  logoClickTarget?: string;
  theme?: string;
  viewerOptions?: Partial<SandDance.types.ViewerOptions>;
  initialView?: SandDance.VegaDeckGl.types.View;
  mounted?: (explorer: Explorer) => any;
  datasetElement?: JSX.Element;
  topBarButtonProps?: FabricTypes.ICommandBarItemProps[];
  snapshotProps?: SnapshotProps;
  onSnapshotClick?: (snapshot: Snapshot) => void;
  onView?: () => void;
  onSignalChanged?: () => void;
  onTooltipExclusionsChanged?: (tooltipExclusions: string[]) => void;
}

export interface State extends SandDance.types.Insight {
  calculating: () => void;
  errors: string[];
  autoCompleteDistinctValues: AutoCompleteDistinctValues;
  search: InputSearchExpressionGroup[];
  filteredData: object[];
  sidebarClosed: boolean;
  sidebarPinned: boolean;
  dataFile: DataFile;
  dataContent: DataContent;
  specCapabilities: SandDance.types.SpecCapabilities;
  sideTabId: SideTabId;
  dataScopeId: DataScopeId;
  selectedItemIndex: { [key: number]: number };
  snapshots: Snapshot[];
  tooltipExclusions: string[];
  positionedColumnMapProps: PositionedColumnMapProps;
}

const dataBrowserTitles: { [key: number]: string } = {};
dataBrowserTitles[DataScopeId.AllData] = strings.selectDataSpanAll;
dataBrowserTitles[DataScopeId.FilteredData] = strings.selectDataSpanFilter;
dataBrowserTitles[DataScopeId.SelectedData] = strings.selectDataSpanSelection;

const dataBrowserZeroMessages: { [key: number]: string } = {};
dataBrowserZeroMessages[DataScopeId.AllData] = strings.labelZeroAll;
dataBrowserZeroMessages[DataScopeId.FilteredData] = null; //empty array is not used
dataBrowserZeroMessages[DataScopeId.SelectedData] = strings.labelZeroSearchResults;

const dataBrowserNullMessages: { [key: number]: string } = {};
dataBrowserNullMessages[DataScopeId.AllData] = strings.labelDataNullAll;
dataBrowserNullMessages[DataScopeId.FilteredData] = strings.labelDataNullFiltered;
dataBrowserNullMessages[DataScopeId.SelectedData] = strings.labelDataNullSelection;

function createInputSearch(search: SandDance.types.Search) {
  const groups = SandDance.util.ensureSearchExpressionGroupArray(search);
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

export class Explorer extends React.Component<Props, State> {
  private layoutDivUnpinned: HTMLElement;
  private layoutDivPinned: HTMLElement;
  private getColorContext: (oldInsight: SandDance.types.Insight, newInsight: SandDance.types.Insight) => SandDance.types.ColorContext;
  private ignoreSelectionChange: boolean;

  public viewer: SandDance.Viewer;
  public viewerOptions: Partial<SandDance.types.ViewerOptions>;
  public discardColorContextUpdates: boolean;
  public prefs: Prefs;
  public div: HTMLElement;

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
      facets: null,
      filter: null,
      filteredData: null,
      specCapabilities: null,
      size: {
        height: null,
        width: null
      },
      scheme: null,
      columns: null,
      chart: "grid",
      signalValues: null,
      hideAxes: false,
      hideLegend: false,
      sideTabId: SideTabId.ChartType,
      dataScopeId: DataScopeId.AllData,
      selectedItemIndex: {},
      sidebarClosed: false,
      sidebarPinned: true,
      view: props.initialView || "2d",
      snapshots: [],
      tooltipExclusions: [],
      positionedColumnMapProps: null
    };

    this.state.selectedItemIndex[DataScopeId.AllData] = 0;
    this.state.selectedItemIndex[DataScopeId.FilteredData] = 0;
    this.state.selectedItemIndex[DataScopeId.SelectedData] = 0;

    this.discardColorContextUpdates = true;
    this.updateViewerOptions({ ...SandDance.VegaDeckGl.util.clone(SandDance.Viewer.defaultViewerOptions), ...props.viewerOptions });
  }

  finalize() {
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
      onDataFilter: (dataFilter, filteredData) => {
        const selectedItemIndex = { ...this.state.selectedItemIndex };
        selectedItemIndex[DataScopeId.FilteredData] = 0;
        this.changeInsight({ filter: dataFilter, filteredData, selectedItemIndex });
        if (this.state.sideTabId === SideTabId.Data && this.state.dataScopeId === DataScopeId.FilteredData) {
          //make sure item is active
          setTimeout(() => this.silentActivation(filteredData[0]), 0);
        }
        viewerOptions && viewerOptions.onDataFilter && viewerOptions.onDataFilter(dataFilter, filteredData);
      },
      onSelectionChanged: (newSearch, index) => {
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
        viewerOptions && viewerOptions.onSelectionChanged && viewerOptions.onSelectionChanged(newSearch);
      },
      onAxisClick: (e, search) => {
        this.toggleableSearch(e, search);
        viewerOptions && viewerOptions.onLegendRowClick && viewerOptions.onAxisClick(e, search);
      },
      onLegendHeaderClick: e => {
        const pos = getPosition(e);
        const specRole = this.state.specCapabilities && this.state.specCapabilities.roles.filter(r => r.role === 'color')[0];
        const positionedColumnMapProps: PositionedColumnMapProps = {
          ...this.getColumnMapBaseProps(),
          container: this.div,
          selectedColumnName: this.state.columns['color'],
          onDismiss: () => { this.setState({ positionedColumnMapProps: null }) },
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
        const t = o as TextWithSpecRole;
        if (t.specRole) {
          return (this.viewerOptions.colors as ColorSettings).clickableText;
        } else {
          return o.color;
        }
      },
      getTextHighlightColor: o => {
        const t = o as TextWithSpecRole;
        if (t.specRole) {
          return (this.viewerOptions.colors as ColorSettings).clickableTextHighlight;
        } else {
          return o.color;
        }
      },
      onTextClick: (e, text) => {
        if (e && text) {
          const pos = getPosition(e);
          const { specRole } = text as TextWithSpecRole;
          if (pos && specRole) {
            const positionedColumnMapProps: PositionedColumnMapProps = {
              ...this.getColumnMapBaseProps(),
              container: this.div,
              selectedColumnName: this.state.columns[specRole.role],
              onDismiss: () => { this.setState({ positionedColumnMapProps: null }) },
              specRole,
              left: pos.left - this.div.clientLeft,
              top: pos.top - this.div.clientTop
            };
            this.setState({ positionedColumnMapProps });
          } else {
            this.setState({ positionedColumnMapProps: null });
          }
        }
      }
    };
    if (this.viewer && this.viewer.presenter) {
      const newPresenterStyle = SandDance.util.getPresenterStyle(this.viewerOptions as SandDance.types.ViewerOptions);
      const mergePrenterStyle = { ...this.viewer.presenter.style, ...newPresenterStyle };
      this.viewer.presenter.style = mergePrenterStyle;
      this.viewer.options = SandDance.VegaDeckGl.util.deepMerge(this.viewer.options, this.props.viewerOptions, this.viewerOptions) as SandDance.types.ViewerOptions;
    }
  }

  signal(signalName: string, signalValue: any) {
    switch (signalName) {
      case SandDance.constants.SignalNames.ColorBinCount:
      case SandDance.constants.SignalNames.ColorReverse:
        this.discardColorContextUpdates = false;
        break;
    }
    this.viewer.vegaViewGl.signal(signalName, signalValue);
    this.viewer.vegaViewGl.run();
    this.discardColorContextUpdates = true;
    this.props.onSignalChanged && this.props.onSignalChanged();
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

  setInsight(partialInsight: Partial<SandDance.types.Insight>) {
    const selectedItemIndex = { ...this.state.selectedItemIndex };
    selectedItemIndex[DataScopeId.AllData] = 0;
    selectedItemIndex[DataScopeId.FilteredData] = 0;
    selectedItemIndex[DataScopeId.SelectedData] = 0;
    let newState: Partial<State> = {
      chart: null,
      scheme: null,
      columns: null,
      filter: null,
      filteredData: null,
      selectedItemIndex,
      ...partialInsight
    };
    this.getColorContext = null;
    this.changeInsight(newState as State);
  }

  load(
    data: DataFile | object[],
    getPartialInsight?: (
      columns: SandDance.types.Column[]
    ) => Partial<SandDance.types.Insight>,
    optionsOrPrefs?: Prefs | Options
  ) {
    this.changeInsight({ columns: null });
    return new Promise<void>((resolve, reject) => {
      const loadFinal = (dataContent: DataContent) => {
        let partialInsight: Partial<SandDance.types.Insight>;
        this.prefs = (optionsOrPrefs && (optionsOrPrefs as Options).chartPrefs || (optionsOrPrefs as Prefs)) || {};
        if (getPartialInsight) {
          partialInsight = getPartialInsight(dataContent.columns);
          initPrefs(this.prefs, partialInsight);
        }
        if (!partialInsight) {
          //load recommendation
          let r = new RecommenderSummary(dataContent.columns, dataContent.data);
          partialInsight = r.recommend();
        }
        const selectedItemIndex = { ...this.state.selectedItemIndex };
        const sideTabId = SideTabId.ChartType;
        selectedItemIndex[DataScopeId.AllData] = 0;
        selectedItemIndex[DataScopeId.FilteredData] = 0;
        selectedItemIndex[DataScopeId.SelectedData] = 0;
        let newState: Partial<State> = {
          dataFile,
          dataContent,
          autoCompleteDistinctValues: {},
          filter: null,
          filteredData: null,
          tooltipExclusions: (optionsOrPrefs && (optionsOrPrefs as Options).tooltipExclusions) || [],
          selectedItemIndex,
          sideTabId,
          ...partialInsight
        };
        this.getColorContext = null;
        ensureColumnsExist(newState.columns, dataContent.columns);
        const errors = ensureColumnsPopulated(partialInsight ? partialInsight.chart : null, newState.columns, dataContent.columns);
        newState.errors = errors;
        //change insight
        this.changeInsight(newState as State);
        //make sure item is active
        this.activateDataBrowserItem(sideTabId, this.state.dataScopeId);
        resolve();
      };
      let dataFile: DataFile;
      if (Array.isArray(data)) {
        return loadDataArray(data)
          .then(result => {
            dataFile = {
              type: "json"
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

  changeChartType(chart: SandDance.types.Chart) {
    const partialInsight = copyPrefToNewState(this.prefs, chart, '*', '*');
    const newState: Partial<State> = { chart, ...partialInsight };
    const columns = this.state.columns || {};
    newState.columns = { ...columns };

    //special case mappings when switching chart type
    if (this.state.chart === 'scatterplot' && chart === 'barchart') {
      newState.columns = { ...columns, sort: columns.y };
    } else if (chart === 'treemap') {
      newState.view = '2d';
      if (!columns.size) {
        //make sure size exists and is numeric
        let sizeColumnName = preferredColumnForTreemapSize(this.state.dataContent.columns, true);
        if (!sizeColumnName) {
          sizeColumnName = preferredColumnForTreemapSize(this.state.dataContent.columns, false);
        }
        if (!sizeColumnName) {
          //TODO error - no numeric columns
        } else {
          newState.columns = { ...columns, size: sizeColumnName };
        }
      }
    } else if (chart === 'stacks') {
      newState.view = '3d';
    }

    ensureColumnsExist(newState.columns, this.state.dataContent.columns);
    const errors = ensureColumnsPopulated(chart, newState.columns, this.state.dataContent.columns);
    if (errors) {
      newState.errors = errors;
    }

    this.calculate(() => this.changeInsight(newState as any));
  }

  calculate(calculating: () => any) {
    this.setState({ calculating });
  }

  changeView(view: SandDance.VegaDeckGl.types.View) {
    this.changeInsight({ view });
  }

  //state members which change the insight
  changeInsight(newState: Partial<State>) {
    if (!newState.signalValues) {
      newState.signalValues = null;
    }
    this.setState(newState as State);
  }

  changespecCapabilities(
    specCapabilities: SandDance.types.SpecCapabilities
  ) {
    this.setState({ specCapabilities });
  }

  changeColumnMapping(role: SandDance.types.InsightColumnRoles, column: SandDance.types.Column, options?: { scheme?: string }) {
    const columns = { ...this.state.columns };
    const final = () => {
      columns[role] = column && column.name;
      this.changeInsight({ columns });
    };
    if (column) {
      switch (role) {
        case "facet":
          (() => {
            const facetColumn = column;
            let facets: SandDance.types.Facets;
            if (facetColumn.quantitative) {
              facets = {
                columns: 3, //TODO: calculate grid from aspect ratio
                rows: 3
              };
            } else {
              switch (facetColumn.stats.distinctValueCount) {
                case 2:
                  facets = {
                    columns: 2,
                    rows: 1
                  };
                  break;
                default:
                  facets = {
                    columns: null,
                    rows: null
                  };
                  let square = 1;
                  while (square * square < facetColumn.stats.distinctValueCount) {
                    square++;
                  }
                  facets.columns = facets.rows = square;
              }
            }
            columns['facet'] = column.name;
            this.changeInsight({ facets, columns });
          })();
          break;

        case "color":
          (() => {
            let newState: Partial<State> = { scheme: options && options.scheme, columns, colorBin: this.state.colorBin };
            if (!newState.scheme) {
              const partialInsight = copyPrefToNewState(this.prefs, this.state.chart, 'color', column.name);
              newState = { ...newState, ...partialInsight };
            }
            if (!newState.scheme) {
              newState.scheme = bestColorScheme(column, null, this.state.scheme);
            }
            this.ignoreSelectionChange = true;
            this.viewer.deselect().then(() => {
              this.ignoreSelectionChange = false;
              //allow deselection to render
              setTimeout(() => {
                columns['color'] = column.name;
                this.getColorContext = null;
                this.changeInsight(newState as any);
              }, 0);
            });
          })();
          break;

        case 'x':
          (() => {
            const partialInsight = copyPrefToNewState(this.prefs, this.state.chart, 'x', column.name);
            const newState: Partial<State> = { columns, ...partialInsight };
            columns['x'] = column.name;
            this.changeInsight(newState as any);
          })();
          break;

        default:
          final();
          break;
      }
    } else {
      final();
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
        case DataScopeId.AllData:
          itemToActivate = this.state.dataContent && this.state.dataContent.data[this.state.selectedItemIndex[DataScopeId.AllData]];
          break;
        case DataScopeId.FilteredData:
          itemToActivate = this.state.filteredData && this.state.filteredData[this.state.selectedItemIndex[DataScopeId.FilteredData]];
          break;
        case DataScopeId.SelectedData:
          const selection = this.viewer.getSelection() || {};
          itemToActivate = selection.selectedData && selection.selectedData[this.state.selectedItemIndex[DataScopeId.SelectedData]];
          break;
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

  sidebar(sidebarClosed: boolean, sidebarPinned: boolean) {
    this.setState({ sidebarClosed, sidebarPinned });
  }

  resize() {
    this.setState({ calculating: () => this._resize() });
  }

  private _resize() {
    this.changeInsight({ size: this.getLayoutDivSize(this.state.sidebarPinned, this.state.sidebarClosed) });
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

  private toggleableSearch(e: TouchEvent | MouseEvent | PointerEvent, search: SandDance.types.SearchExpressionGroup) {
    if (e.ctrlKey) {
      this.setState({ search: createInputSearch(search) });
      this.setSideTabId(SideTabId.Search);
    } else {
      var oldSelection = this.viewer.getSelection();
      if (oldSelection.search) {
        //look for matching groups and toggle them
        const result = toggleSearch(SandDance.util.ensureSearchExpressionGroupArray(oldSelection.search), search);
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
            if (e.shiftKey) {
              search.clause = '||';
            } else if (e.altKey) {
              search.clause = '&&';
            }
            result.groups.push(search);
            this.doSelect(result.groups);
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

  private doFilter(search: SandDance.types.Search) {
    this.viewer.filter(search);
  }

  private doUnfilter() {
    this.viewer.reset();
  }

  private doSelect(search: SandDance.types.Search) {
    this.viewer.select(search);
  }

  private doDeselect() {
    return this.viewer.deselect();
  }

  componentDidMount() {
    if (this.props.mounted) {
      this.props.mounted(this);
    }
  }

  render() {
    const { colorBin, columns, facets, filter, hideAxes, hideLegend, scheme, signalValues, size, chart, view } = this.state;
    const insight: SandDance.types.Insight = {
      colorBin,
      columns,
      facets,
      filter,
      hideAxes,
      hideLegend,
      scheme,
      signalValues,
      size,
      chart,
      view
    };

    if (!insight.columns || !insight.columns.color) {
      insight.hideLegend = true;
    }

    const loaded = !!(this.state.columns && this.state.dataContent);

    const selectionState: SandDance.types.SelectionState = (this.viewer && this.viewer.getSelection()) || {};
    const selectionSearch = selectionState && selectionState.search;

    const columnMapProps = this.getColumnMapBaseProps();

    const datas: { [key: number]: object[] } = {};
    datas[DataScopeId.AllData] = this.state.dataContent && this.state.dataContent.data;
    datas[DataScopeId.FilteredData] = this.state.filteredData;
    datas[DataScopeId.SelectedData] = selectionState && selectionState.selectedData;

    if (this.state.calculating) {
      setTimeout(() => {
        //allow render to complete
        if (this.state.calculating) {
          this.state.calculating();
          this.setState({ calculating: null });
        }
      }, 0);
    }

    const theme = this.props.theme || '';
    const themePalette = themePalettes[theme];

    return (
      <div
        ref={div => { if (div) this.div = div; }}
        className={util.classList("sanddance-explorer", this.props.theme)}
      >
        <Topbar
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
          onViewClick={() => {
            const view = this.state.view === '2d' ? '3d' : '2d';
            this.changeInsight({ view });
          }}
          onHomeClick={() => this.viewer.presenter.homeCamera()}
        />
        <div className={util.classList("sanddance-main", this.state.sidebarPinned && "pinned", this.state.sidebarClosed && "closed", insight.hideLegend && "hide-legend")}>
          <div ref={div => { if (div && !this.layoutDivUnpinned) this.layoutDivUnpinned = div }} className="sanddance-layout-unpinned"></div>
          <div ref={div => { if (div && !this.layoutDivPinned) this.layoutDivPinned = div }} className="sanddance-layout-pinned"></div>
          {!loaded && (
            <div className="loading">
              <base.fabric.Spinner
                size={base.fabric.SpinnerSize.large}
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
                this.changeInsight({
                  sidebarClosed: false,
                  size: this.getLayoutDivSize(this.state.sidebarPinned, false)
                });
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
                this.changeInsight({
                  dataScopeId,
                  sidebarClosed,
                  size: this.getLayoutDivSize(this.state.sidebarPinned, sidebarClosed)
                });
              } else if (sideTabId === SideTabId.Pin) {
                this.changeInsight({
                  sidebarPinned: !this.state.sidebarPinned,
                  size: this.getLayoutDivSize(!this.state.sidebarPinned, this.state.sidebarClosed)
                });
              } else {
                this.setSideTabId(sideTabId);
              }
            }}
            selectedSideTab={this.state.sideTabId}
          >
            {loaded && (() => {
              switch (this.state.sideTabId) {
                case SideTabId.ChartType:
                  return (
                    <Chart
                      specCapabilities={this.state.specCapabilities}
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
                        this.props.onTooltipExclusionsChanged && this.props.onTooltipExclusionsChanged(tooltipExclusions)
                      }}
                      disabled={!loaded || this.state.sidebarClosed}
                      {...columnMapProps}
                      chart={this.state.chart}
                      view={this.state.view}
                      onChangeChartType={chart => this.changeChartType(chart)}
                      columns={this.state.columns}
                      onChangeSignal={(role, column, name, value) => {
                        saveSignalValuePref(this.prefs, this.state.chart, role, column, name, value);
                      }}
                    />
                  );
                case SideTabId.Color:
                  return (
                    <Color
                      specCapabilities={this.state.specCapabilities}
                      disabled={!loaded || this.state.sidebarClosed}
                      {...columnMapProps}
                      dataContent={this.state.dataContent}
                      scheme={this.state.scheme}
                      colorBin={this.state.colorBin}
                      colorBinSignal={this.viewer && this.viewer.vegaSpec && this.viewer.vegaSpec.signals.filter(s => s.name === SandDance.constants.SignalNames.ColorBinCount)[0]}
                      colorReverseSignal={this.viewer && this.viewer.vegaSpec && this.viewer.vegaSpec.signals.filter(s => s.name === SandDance.constants.SignalNames.ColorReverse)[0]}
                      colorColumn={this.state.columns.color}
                      changeColorBin={colorBin => {
                        this.ignoreSelectionChange = true;
                        this.viewer.deselect().then(() => {
                          this.ignoreSelectionChange = false;
                          //allow deselection to render
                          setTimeout(() => {
                            this.getColorContext = null;
                            this.changeInsight({ colorBin });
                            savePref(this.prefs, this.state.chart, 'color', this.state.columns.color, { colorBin });
                          }, 0);
                        });
                      }}
                      changeColorScheme={(scheme) => {
                        this.changeColumnMapping('color', this.state.dataContent.columns.filter(c => c.name === this.state.columns.color)[0], { scheme });
                        savePref(this.prefs, this.state.chart, 'color', this.state.columns.color, { scheme });
                      }}
                      onColorBinCountChange={value => {
                        const signalValues: SandDance.types.SignalValues = {};
                        signalValues[SandDance.constants.SignalNames.ColorBinCount] = value;
                        savePref(this.prefs, this.state.chart, 'color', this.state.columns.color, { signalValues });
                      }}
                      onColorReverseChange={value => {
                        this.getColorContext = null;
                        const signalValues: SandDance.types.SignalValues = {};
                        signalValues[SandDance.constants.SignalNames.ColorReverse] = value;
                      }}
                    />
                  );
                case SideTabId.Data:
                  const data = datas[this.state.dataScopeId];
                  let itemVisible = true;
                  switch (this.state.dataScopeId) {
                    case DataScopeId.AllData:
                      const item = this.state.selectedItemIndex[this.state.dataScopeId];
                      itemVisible = this.state.dataContent && !this.state.filteredData || this.state.filteredData.indexOf(data[item]) >= 0;
                  }
                  return (
                    <DataBrowser
                      themePalette={themePalette}
                      disabled={!loaded || this.state.sidebarClosed}
                      columns={this.state.dataContent && this.state.dataContent.columns}
                      data={data}
                      title={dataBrowserTitles[this.state.dataScopeId]}
                      nullMessage={dataBrowserNullMessages[this.state.dataScopeId]}
                      zeroMessage={dataBrowserZeroMessages[this.state.dataScopeId]}
                      index={this.state.selectedItemIndex[this.state.dataScopeId]}
                      itemVisible={itemVisible}
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
                    />
                  );
                case SideTabId.Search:
                  return (
                    <Search
                      themePalette={themePalette}
                      disabled={!loaded || this.state.sidebarClosed}
                      initializer={{
                        columns: columnMapProps.allColumns,
                        search: this.state.search
                      }}
                      autoCompleteDistinctValues={this.state.autoCompleteDistinctValues}
                      onSelect={expr => {
                        this.doSelect(expr);
                      }}
                      data={this.state.dataContent.data}
                    />
                  );
                case SideTabId.Snapshots:
                  return (
                    <Snapshots
                      {...this.props.snapshotProps}
                      themePalette={themePalette}
                      explorer={this}
                      snapshots={this.state.snapshots}
                      onCreateSnapshot={snapshot => {
                        this.setState({ snapshots: this.state.snapshots.concat(snapshot) });
                      }}
                      onRemoveSnapshot={i => {
                        const snapshots = [...this.state.snapshots];
                        snapshots.splice(i, 1);
                        this.setState({ snapshots });
                      }}
                      onSnapshotClick={snapshot => {
                        this.calculate(() => {
                          if (this.props.onSnapshotClick) {
                            this.props.onSnapshotClick(snapshot);
                          } else {
                            this.setInsight(snapshot.insight);
                          }
                        });
                      }}
                    />
                  );
                case SideTabId.Settings:
                  return (
                    <Settings
                      explorer={this}
                      dataFile={this.state.dataFile}
                      scheme={this.state.scheme}
                      hideLegend={this.state.hideLegend}
                      onToggleLegend={hideLegend => this.setState({ hideLegend, calculating: () => this._resize() })}
                      hideAxes={this.state.hideAxes}
                      onToggleAxes={hideAxes => this.setState({ calculating: () => this.setState({ hideAxes }) })}
                    />
                  );
              }
            })()}
          </Sidebar>
          {loaded && (
            <div className="sanddance-view">
              <SandDanceReact
                renderOptions={{
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
                  this.getColorContext = (oldInsight: SandDance.types.Insight, newInsight: SandDance.types.Insight) => {
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
                    return this.viewer.colorContexts && this.viewer.colorContexts[this.viewer.currentColorContext];
                  };
                  //don't allow tabbing to the canvas
                  removeTabIndex(this.viewer);
                  this.props.onView && this.props.onView();
                }}
                data={this.state.dataContent.data}
                insight={insight}
                onMount={el => this.viewerMounted(el)}
              />
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
      changeColumnMapping: (role, column) => this.changeColumnMapping(role, column),
      allColumns,
      quantitativeColumns,
      categoricalColumns,
      explorer: this
    };
    return props;
  }
}
