/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './../style/visual.less';
import powerbiVisualsApi from 'powerbi-visuals-api';
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbiVisualsApi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbiVisualsApi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbiVisualsApi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbiVisualsApi.VisualObjectInstance;
import DataView = powerbiVisualsApi.DataView;
import VisualObjectInstanceEnumerationObject = powerbiVisualsApi.VisualObjectInstanceEnumerationObject;

import * as powerbiModels from 'powerbi-models';

import { capabilities, SandDance, util as util2 } from '@msrvida/sanddance-explorer';
import { convertFilter } from './convertFilter';
import { createElement } from 'react';
import { render } from 'react-dom';
import { App, Props, ViewChangeOptions } from './app';
import { convertTableToObjectArray } from './convertTableToObjectArray';
import { cleanInsight } from './cleanInsight';
import { VisualSettings, SandDanceConfig, IVisualSettings } from './settings';
import { language } from './language';

const util1 = SandDance.VegaMorphCharts.util;
const util = { ...util1, ...util2 };

export class Visual implements IVisual {
    private settings: VisualSettings;
    private viewElement: HTMLElement;
    private errorElement: HTMLElement;
    private events: powerbiVisualsApi.extensibility.IVisualEventService;
    private renderingOptions: VisualUpdateOptions;
    private app: App;
    private prevSettings: IVisualSettings;
    private host: powerbiVisualsApi.extensibility.visual.IVisualHost;
    private selectionManager: powerbiVisualsApi.extensibility.ISelectionManager;
    private fetchMoreTimer: number;
    private filters: { sd: SandDance.searchExpression.Search, pbi: powerbiModels.IFilter[] };
    private columns: powerbiVisualsApi.DataViewMetadataColumn[];

    public persistViewChange: boolean;
    public persistSelectionChange: boolean;
    public ignoreSelectionUpdate: boolean;
    public ignorePersistUpdate: boolean;
    public ignorePersistTimer: number;
    public sanddanceRenderOptions: SandDance.types.RenderOptions;
    public afterView: (() => void)[];
    public search: SandDance.searchExpression.Search;
    public snapshots: SandDance.types.Snapshot[];

    public static fetchMoreTimeout = 5000;
    public static ignorePersistTimeout = 200;

    constructor(options: VisualConstructorOptions) {
        // console.log('Visual constructor', options);
        this.host = options.host;
        this.events = this.host.eventService;
        this.selectionManager = this.host.createSelectionManager();
        this.afterView = [];
        this.sanddanceRenderOptions = {};
        this.persistSelectionChange = true;

        if (document) {
            options.element.style.position = 'relative';
            this.viewElement = util.addDiv(options.element, 'sanddance-powerbi');
            this.errorElement = util.addDiv(options.element, 'sanddance-error');
            this.errorElement.style.position = 'absolute';

            const props: Props = {
                renderOptions: this.sanddanceRenderOptions,
                mounted: (app: App) => {
                    this.app = app;
                },
                onCameraSave: (camera: SandDance.types.Camera) => {
                    const setup = this.app.explorer.getSetup();
                    setup.camera = camera;
                    // console.log('onCameraChange', setup);
                    this.ignorePersistUpdate = true;
                    this.persist({ setup });
                },
                onContextMenu: (e: MouseEvent | PointerEvent, selectionId?: powerbiVisualsApi.extensibility.ISelectionId) => {
                    const position: powerbiVisualsApi.extensibility.IPoint = {
                        x: e.clientX,
                        y: e.clientY,
                    };
                    this.selectionManager.showContextMenu(selectionId || {}, position);
                },
                onViewChange: viewChangeOptions => {
                    // console.log('onViewChange', this.renderingOptions, viewChangeOptions, this.persistViewChange);

                    if (this.afterView.length) {
                        this.afterView.forEach(fn => fn());
                        this.afterView.length = 0;
                    }

                    if (this.renderingOptions) {
                        this.events.renderingFinished(this.renderingOptions);
                    }

                    if (this.persistViewChange) {
                        this.persist(viewChangeOptions);
                    }
                    this.persistViewChange = true;
                },
                onSnapshotsChanged: snapshots => {
                    this.snapshots = snapshots;
                    this.persist({});
                },
                onError: (e: any) => {
                    if (this.renderingOptions) {
                        this.events.renderingFailed(this.renderingOptions);
                        this.renderingOptions = null;
                    }
                },
                onDataFilter: (searchFilter, filteredData) => {
                    // console.log('onDataFilter', filteredData);

                    this.persist({});
                    if (filteredData) {
                        const result = convertFilter(searchFilter, this.columns, filteredData);
                        this.applySelection(result.selectedIds);
                        this.applyFilters(result.filters);
                        this.filters = { sd: searchFilter, pbi: result.filters };
                    } else {
                        this.filters = null;
                        this.clearFilter();
                        this.clearSelection();
                    }
                },
                onSelectionChanged: (search, activeIndex, selectedData) => {
                    // console.log('onSelectionChanged', search, selectedData, this.persistSelectionChange);
                    this.ignoreSelectionUpdate = true;

                    this.search = search;

                    if (this.persistSelectionChange) {
                        this.persist({});
                    }
                    this.persistSelectionChange = true;

                    if (selectedData?.length) {
                        const result = convertFilter(search, this.columns, selectedData);
                        this.applySelection(result.selectedIds);
                        this.applyFilters(this.filters ? this.filters.pbi.concat(result.filters) : result.filters);

                    } else {
                        this.clearSelection();
                        // revert to filtered if it exists
                        if (this.filters) {
                            this.applyFilters(this.filters.pbi);
                        } else {
                            this.clearFilter();
                        }
                    }
                },
            };
            render(createElement(App, props), this.viewElement);
        }
    }

    private persist(options: ViewChangeOptions) {
        if (this.renderingOptions.viewMode !== powerbiVisualsApi.ViewMode.View) {
            const { explorer } = this.app;
            const insight = explorer.viewer.getInsight();
            const tooltipExclusions = options.tooltipExclusions || explorer.state.tooltipExclusions;
            cleanInsight(insight, false);
            const config: SandDanceConfig = {
                setupJSON: JSON.stringify(options.setup || explorer.getSetup()),
                insightJSON: JSON.stringify(insight),
                selectionQueryJSON: JSON.stringify(this.search),
                snapshotsJSON: JSON.stringify(this.snapshots || []),
                tooltipExclusionsJSON: JSON.stringify(tooltipExclusions),
                imageHolderJSON: JSON.stringify(explorer.imageHolder),
            };
            // console.log(`persist`, config);
            this.host.persistProperties({ replace: [{ objectName: 'sandDanceConfig', properties: config, selector: null }] });
            this.ignorePersistUpdate = true;
            this.ignorePersistTimer = window.setTimeout(() => {
                this.ignorePersistUpdate = false;
            }, Visual.ignorePersistTimeout);
        }
    }

    applySelection(selectedIds: powerbiVisualsApi.extensibility.ISelectionId[]) {
        if (selectedIds.length) {
            this.selectionManager.select(selectedIds, false);
        } else {
            this.clearSelection();
        }
    }

    clearSelection() {
        this.selectionManager.clear();
    }

    applyFilters(filters: powerbiModels.IFilter[]) {
        this.host.applyJsonFilter(null, 'general', 'filter', powerbiVisualsApi.FilterAction.merge);
        this.host.applyJsonFilter(filters, 'general', 'filter', powerbiVisualsApi.FilterAction.merge);
    }

    clearFilter() {
        this.applyFilters(null);
    }

    destroy() {
        this.app && this.app.finalize();
        this.app = null;
    }

    public update(options: VisualUpdateOptions) {
        // console.log('Visual update', options);
        this.renderingOptions = options;
        this.events.renderingStarted(this.renderingOptions);

        if (this.fetchMoreTimer) {
            clearTimeout(this.fetchMoreTimer);
        }

        if (!capabilities.webgl) {
            this.app.unload();
            return;
        }

        if (this.ignorePersistUpdate) {
            // console.log('PersistUpdate ignored ')
            this.ignorePersistUpdate = false;
            clearTimeout(this.ignorePersistTimer);
            this.events.renderingFinished(this.renderingOptions);
            return;
        }

        const dataView = options && options.dataViews && options.dataViews[0];
        if (!dataView || !dataView.table) {
            this.app.unload();
        } else {
            this.columns = dataView.metadata.columns;
            let doneFetching = true;
            if (dataView.metadata.segment) {
                doneFetching = !this.host.fetchMoreData();
            }
            this.app.fetchStatus(dataView.table.rows.length, !doneFetching);
            if (doneFetching) {
                this.show(dataView);
            } else {
                this.fetchMoreTimer = window.setTimeout(() => {
                    // console.log('Visual fetchMoreTimeout', options);

                    this.app.fetchStatus(dataView.table.rows.length, false);
                    this.show(dataView);

                }, Visual.fetchMoreTimeout);
            }
        }
    }

    show(dataView: powerbiVisualsApi.DataView) {
        this.settings = Visual.parseSettings(dataView);
        const oldData = this.app.getDataContent();
        const result = convertTableToObjectArray(dataView.table, oldData, this.host);
        let { different } = result;
        const { data } = result;
        if (!this.prevSettings) {
            different = true;
        }

        const { sandDanceConfig, sandDanceMainSettings } = this.settings;

        this.app.setState({ editmode: this.renderingOptions.viewMode !== powerbiVisualsApi.ViewMode.View });
        this.app.setChromeless(!sandDanceMainSettings.showchrome);
        this.app.changeTheme(this.settings.sandDanceMainSettings.darktheme);

        const p = this.app.explorer?.viewer?.presenter;
        if (p) {
            p.morphchartsref.core.config.textColor = [0, 0, 0];
            p.morphchartsref.core.config.isDebugVisible = sandDanceMainSettings.showdebug;
        }

        this.prevSettings = util.clone(this.settings);

        let setup: SandDance.types.Setup;
        if (sandDanceConfig.setupJSON) {
            try {
                setup = JSON.parse(sandDanceConfig.setupJSON);
            } catch (e) {
                // continue regardless of error
            }
        }

        const renderingFinished = () => {
            this.events.renderingFinished(this.renderingOptions);
        };

        if (!different) {
            // console.log('Visual update - not different');

            if (this.renderingOptions.viewMode === powerbiVisualsApi.ViewMode.Edit) {
                this.syncSelection(sandDanceConfig.selectionQueryJSON, false);
            }

            if (this.ignoreSelectionUpdate) {
                this.ignoreSelectionUpdate = false;
                return renderingFinished();
            }

            if (this.renderingOptions.viewMode === powerbiVisualsApi.ViewMode.View) {
                this.syncSelection(sandDanceConfig.selectionQueryJSON, false);
            }

            let setInsight = false;
            if (sandDanceConfig.insightJSON) {
                try {
                    const insight = JSON.parse(sandDanceConfig.insightJSON) as SandDance.specs.Insight;
                    const compA = util.clone(insight);
                    cleanInsight(compA, false);
                    const compB = util.clone(this.app.explorer.viewer.getInsight());
                    cleanInsight(compB, false);
                    if (!util.deepCompare(compA, compB)) {
                        setInsight = true;
                        this.app.explorer.setInsight({ label: language.historyActionUpdate }, null, insight, true, setup);
                    }
                } catch (e) {
                    // continue regardless of error
                }
            }

            if (!setInsight) {
                // console.log('same insight')
                const { camera: cameraOrHold, renderer } = setup;
                let camera: SandDance.types.Camera;
                let holdCamera = this.app.explorer.state.holdCamera;
                if (cameraOrHold === 'hold') {
                    holdCamera = true;
                } else {
                    camera = cameraOrHold;
                }
                this.app.explorer.setState({ camera, holdCamera, renderer });
                return renderingFinished();
            }
            return;
        }

        // console.log('Visual update - *is* different');

        if (sandDanceConfig.snapshotsJSON) {
            try {
                const snapshots = JSON.parse(sandDanceConfig.snapshotsJSON);

                if (this.snapshots === undefined) {
                    this.snapshots = snapshots;
                }
            } catch (e) {
                // continue regardless of error
            }
        }

        let tooltipExclusions: string[] = [];
        if (sandDanceConfig.tooltipExclusionsJSON) {
            try {
                tooltipExclusions = JSON.parse(sandDanceConfig.tooltipExclusionsJSON);
            } catch (e) {
                // continue regardless of error
            }
        }

        this.persistViewChange = false;
        this.app.load(
            data,
            columns => {
                if (!columns) return;

                // remove column which contains powerbi selectionId
                for (let i = 0; i < columns.length; i++) {
                    if (SandDance.util.isInternalFieldName(columns[i].name)) {
                        columns.splice(i, 1);
                        i--;
                    }
                }

                this.syncSelection(sandDanceConfig.selectionQueryJSON, true);
                this.syncBackgroundImage(sandDanceConfig.imageHolderJSON);

                let insight: Partial<SandDance.specs.Insight>;

                if (sandDanceConfig.insightJSON) {
                    try {
                        insight = JSON.parse(sandDanceConfig.insightJSON);
                        delete insight.size;
                    } catch (e) {
                        // continue regardless of error
                    }
                }

                if (this.filters) {
                    insight.filter = this.filters.sd;
                }

                return insight;
            },
            setup,
            tooltipExclusions,
            this.snapshots,
        );
    }

    syncBackgroundImage(imageHolderJSON: string) {
        if (imageHolderJSON) {
            try {
                const imageHolder = JSON.parse(imageHolderJSON);
                this.app.explorer.imageHolder = imageHolder;
            } catch (e) {
                // continue regardless of error
            }
        }
    }

    syncSelection(selectionQueryJSON: string, afterView: boolean) {
        const existingSelection = (this.app?.explorer?.viewer?.getSelection()?.search) || null;
        let search: SandDance.searchExpression.Search = null;
        if (selectionQueryJSON) {
            try {
                search = JSON.parse(selectionQueryJSON);
            } catch (e) {
                // continue regardless of error
            }
        }

        const diff = !SandDance.searchExpression.compare(existingSelection, search);
        if (diff) {
            // console.log('sync selection', selectionQueryJSON, existingSelection)
            this.persistSelectionChange = false;
            if (afterView || !this.app?.explorer?.viewer) {
                this.afterView.push(() => this.app.explorer.viewer.select(search));
            } else {
                this.app.explorer.viewer.select(search);
            }
        }
    }

    private static parseSettings(dataView: DataView): VisualSettings {
        return VisualSettings.parse(dataView);
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        if (options.objectName === 'sandDanceConfig') return [];
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}
