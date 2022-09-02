// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { fluentUIComponents } from './fluentUIComponents';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as vega from 'vega';
import {
    capabilities,
    DataFile,
    Explorer,
    Explorer_Class,
    getColorSettingsFromThemePalette,
    Props as ExplorerProps,
    SandDance,
    themePalettes,
    use,
    util,
} from '@msrvida/sanddance-explorer';
import { Logo } from '@msrvida/sanddance-explorer/dist/es6/controls/logo';
import { language } from './language';
import { version } from './version';
import powerbiVisualsApi from 'powerbi-visuals-api';

// tslint:disable-next-line
use(fluentUIComponents, React as any, ReactDOM as any, vega);

function getThemePalette(darkTheme: boolean) {
    const theme = darkTheme ? 'dark-theme' : '';
    return themePalettes[theme];
}

export interface ViewChangeOptions {
    tooltipExclusions?: string[];
    setup?: SandDance.types.Setup;
}

export interface Props {
    renderOptions: SandDance.types.RenderOptions;
    mounted: (app: App) => void;
    onViewChange: (viewChangeOptions: ViewChangeOptions) => void;
    onError: (e: any) => void;
    onDataFilter: (filter: SandDance.searchExpression.Search, filteredData: object[]) => void;
    onSelectionChanged: (search: SandDance.searchExpression.Search, activeIndex: number, selectedData: object[]) => void;
    onSnapshotsChanged: (snapshots: SandDance.types.Snapshot[]) => void;
    onContextMenu: (e: MouseEvent | PointerEvent, selectionId?: powerbiVisualsApi.extensibility.ISelectionId) => void;
    onSetupSave: (setup: SandDance.types.Setup) => void;
}

const RIGHT_MOUSE_BUTTON = 2;
const cameraSettle = 200;

export interface State {
    loaded: boolean;
    editmode: boolean;
    chromeless: boolean;
    darkTheme: boolean;
    rowCount: number;
    fetching: boolean;
}

export class App extends React.Component<Props, State> {
    private viewerOptions: Partial<SandDance.types.ViewerOptions>;
    public explorer: Explorer_Class;
    private cameraTimer: number;
    public lastCamera: SandDance.types.Camera;
    public lastCameraStable: boolean;

    constructor(props: Props) {
        super(props);
        this.state = {
            loaded: false,
            editmode: true,
            chromeless: false,
            darkTheme: null,
            rowCount: null,
            fetching: false,
        };
        this.viewerOptions = this.getViewerOptions();
    }

    finalize() {
        this.endCameraListener();
        this.explorer && this.explorer.finalize();
        this.explorer = null;
    }

    private getViewerOptions(darkTheme?: boolean): Partial<SandDance.types.ViewerOptions> {
        return {
            colors: getColorSettingsFromThemePalette(themePalettes[darkTheme ? 'dark-theme' : '']),
            onCubeClick: (e, cube) => {
                const { button } = e as unknown as PointerEvent;
                if (button === RIGHT_MOUSE_BUTTON) {
                    const row = this.explorer.state.dataContent.data[cube.ordinal];
                    const selectionId = row[SandDance.constants.FieldNames.PowerBISelectionId];
                    this.props.onContextMenu(<MouseEvent>e, selectionId);
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }
            },
            onDataFilter: this.props.onDataFilter,
            onSelectionChanged: this.props.onSelectionChanged,
            preserveDrawingBuffer: true,
            onVegaSpec: () => {
                this.endCameraListener();
            },
            disableLasso: true,
        };
    }

    getDataContent() {
        return this.explorer && this.explorer.state.dataContent && this.explorer.state.dataContent.data;
    }

    load(data: DataFile | object[], getPartialInsight: (columns: SandDance.types.Column[]) => Partial<SandDance.specs.Insight>, setup: SandDance.types.Setup, tooltipExclusions: string[], snapshots: SandDance.types.Snapshot[], snapshotIndex?: number) {
        const wasLoaded = this.state.loaded;
        const { explorer } = this;
        if (wasLoaded) {
            const { historyItems, sideTabId } = explorer.state;
            const loaded = () => {
                // console.log('reloading history')
                const last = historyItems[historyItems.length - 1];
                historyItems.push({
                    historicInsight: { ...last?.historicInsight || {} },
                    label: language.historyActionDataChange,
                });
                const historyIndex = historyItems.length - 1;
                explorer.setState({ historyIndex, historyItems, sideTabId });
            };
            explorer.setState({
                calculating: () => {
                    explorer.load(data, getPartialInsight, { tooltipExclusions, setup }).then(loaded);
                    explorer.setState({ snapshots });
                    this.manageSnapshot(snapshotIndex);
                },
            });
        } else {
            explorer.load(data, getPartialInsight, { tooltipExclusions, setup });
            explorer.setState({ snapshots });
            this.manageSnapshot(snapshotIndex);
        }
        this.setState({ loaded: true });
    }

    private beginCameraListener(transitionFinal: boolean, stable: boolean) {
        const { viewer } = this.explorer;
        this.lastCameraStable = stable;
        this.lastCamera = viewer.getCamera(transitionFinal);
        const { transitionDurations } = viewer.setup;
        this.cameraTimer = setTimeout(() => this.listenToCamera(), transitionDurations.position + transitionDurations.stagger + cameraSettle) as unknown as number;
    }

    private endCameraListener() {
        clearTimeout(this.cameraTimer);
    }

    private listenToCamera() {
        const currCamera = this.explorer.viewer.getCamera(false);
        const compare = util.deepCompare(currCamera, this.lastCamera);
        let stable = this.lastCameraStable;
        if (this.lastCameraStable) {
            if (!compare) {
                //camera has moved, listen for stability
                stable = false;
            }
        } else {
            if (compare) {
                //unstable camera has stabilized
                const setup = this.explorer.getSetup();
                setup.camera = currCamera;
                this.props.onSetupSave(setup);
                stable = true;
            }
        }
        this.beginCameraListener(false, stable);
    }

    manageSnapshot(selectedSnapshotIndex: number) {
        const { explorer } = this;
        if (selectedSnapshotIndex != null) {
            if (selectedSnapshotIndex !== explorer.state.selectedSnapshotIndex) {
                explorer.reviveSnapshot(selectedSnapshotIndex);
            }
        } else {
            explorer.setState({ selectedSnapshotIndex });
        }
    }

    unload() {
        this.endCameraListener();
        this.setState({ loaded: false });
    }

    fetchStatus(rowCount: number, fetching: boolean) {
        this.setState({ rowCount, fetching });
    }

    changeTheme(darkTheme: boolean) {
        this.viewerOptions = this.getViewerOptions(darkTheme);
        if (this.state.darkTheme !== darkTheme && this.explorer) {
            this.explorer.updateViewerOptions(this.viewerOptions);
            SandDance.VegaMorphCharts.base.vega.scheme(SandDance.constants.ColorScaleNone, x => this.explorer.viewer.options.colors.defaultCube);
            if (this.explorer.viewer) {
                this.explorer.viewer.renderSameLayout(this.explorer.viewerOptions);
            }
        }
        fluentUIComponents.loadTheme({ palette: getThemePalette(darkTheme) });
        this.setState({ darkTheme });
    }

    setChromeless(chromeless: boolean) {
        if (chromeless === this.state.chromeless) return;
        this.setState({ chromeless });
        this.explorer.sidebar(chromeless, !chromeless);
        this.explorer.resize();
    }

    render() {
        const { props, state } = this;
        const className = util.classList(
            'sanddance-app',
            state.editmode && 'editmode',
            state.chromeless && 'chromeless',
            state.loaded && 'loaded',
        );
        const explorerProps: ExplorerProps = {
            renderOptions: props.renderOptions,
            hideSidebarControls: true,
            logoClickUrl: 'https://microsoft.github.io/SandDance/',
            bingSearchDisabled: true,
            searchORDisabled: true,
            theme: state.darkTheme && 'dark-theme',
            viewerOptions: this.viewerOptions,
            initialView: '2d',
            mounted: explorer => {
                // explorer.snapshotThumbWidth = 240;
                this.explorer = explorer;
                props.mounted(this);
            },
            onSetupOptionsChanged: this.props.onSetupSave,
            onSignalChanged: () => {
                props.onViewChange({});
            },
            snapshotProps: {
                hidden: !this.explorer?.state.snapshots || this.explorer?.state.snapshots.length === 0,
            },
            onSnapshotsChanged: props.onSnapshotsChanged,
            onTooltipExclusionsChanged: tooltipExclusions => props.onViewChange({ tooltipExclusions }),
            onView: () => {
                this.beginCameraListener(true, true);
                this.explorer.viewer.presenter.getElement(SandDance.VegaMorphCharts.PresenterElement.gl).oncontextmenu = (e) => {
                    props.onContextMenu(e);
                    return false;
                };
                props.onViewChange({});
            },
            onError: props.onError,
            systemInfoChildren: [
                React.createElement('li', null, `${language.powerBiCustomVisual}: ${version}`),
            ],
        };
        return React.createElement('div', { className },
            React.createElement(Explorer, explorerProps),
            React.createElement('div', { className: 'sanddance-init' },
                React.createElement('div', null,
                    React.createElement(Logo),
                ),
                !capabilities.webgl && React.createElement('div', { className: 'sanddance-webgl-required' },
                    language.webglDisabled,
                ),
            ),
            state.fetching && React.createElement('div', { className: 'sanddance-fetch' },
                `${language.fetching} ${state.rowCount ? `(${state.rowCount} ${language.fetched})` : ''}`,
            ),
        );
    }
}
