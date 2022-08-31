/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { Animator, DataLayoutChange } from './animator';
import { AxisSelection, moveTicksBetween } from './axisSelection';
import { populateColorContext } from './colorCubes';
import { registerColorSchemes } from './colorSchemes';
import { GL_ORDINAL } from './constants';
import { DataScope } from './dataScope';
import { makeDateRange } from './date';
import { defaultViewerOptions, getPresenterStyle } from './defaults';
import { Details } from './details';
import { ensureHeaders } from './headers';
import { finalizeLegend } from './legend';
import { assignOrdinals, getDataIndexOfCube } from './ordinal';
import { getSearchGroupFromVegaValue } from './search';
import { applySignalValues, extractSignalValuesFromView, unbindSignalUI } from './signals';
import { cleanDataItem, Tooltip } from './tooltip';
import {
    ColorContext,
    InsightSetup,
    LegendRowWithSearch,
    RenderOptions,
    RenderResult,
    SelectionState,
    Setup,
    TooltipCreateOptions,
    TooltipDestroyable,
    Transition,
    ViewerOptions,
} from './types';
import { Camera, Column } from '@msrvida/chart-types';
import { View } from '@msrvida/chart-types';
import {
    build,
    getSpecColumns,
    Insight,
    SignalValues,
    SpecCapabilities,
    SpecColumns,
    SpecContext,
} from '@msrvida/sanddance-specs';
import * as searchExpression from '@msrvida/search-expression';
import * as VegaMorphCharts from '@msrvida/vega-morphcharts';
import { ViewGl_Class } from '@msrvida/vega-morphcharts/dist/es6/vega-classes/viewGl';
import { Spec, Transforms, SignalListenerHandler } from 'vega-typings';

import Search = searchExpression.Search;
import SearchExpression = searchExpression.SearchExpression;
import SearchExpressionGroup = searchExpression.SearchExpressionGroup;

import { CharacterSet } from './characterSet';
import { assignTransitionStagger } from './transition';

const { defaultView } = VegaMorphCharts.defaults;

const zAxisZindex = 1010;

let didRegisterColorSchemes = false;

/**
 * Component to view a SandDance data visualization.
 */
export class Viewer {

    /**
     * Default Viewer options.
     */
    static defaultViewerOptions = defaultViewerOptions;

    /**
     * Behavior specified by the visualization type.
     */
    public specCapabilities: SpecCapabilities;

    /**
     * Viewer options object.
     */
    public options: ViewerOptions;

    /**
     * Vega specification.
     */
    public vegaSpec: Spec;

    /**
     * Vega View instance.
     */
    public vegaViewGl: ViewGl_Class;

    /**
     * Presenter which does the rendering.
     */
    public presenter: VegaMorphCharts.Presenter;

    /**
     * Insight object for chart layout.
     */
    public insight: Insight;

    /**
     * Setup object for visual rendering of Insight.
     */
    public setup: Setup;

    /**
     * Color contexts. There is only one color context until data is filtered, after which colors may be re-mapped in another color context.
     */
    public colorContexts: ColorContext[];

    /**
     * Index of current color context. Change this and then call renderSameLayout().
     */
    public currentColorContext: number;

    private _axisSelection: AxisSelection;
    private _specColumns: SpecColumns;
    private _dataScope: DataScope;
    private _animator: Animator;
    private _details: Details;
    private _tooltip: TooltipDestroyable;
    private _shouldSaveColorContext: () => boolean;
    private _lastPresenterConfig: VegaMorphCharts.types.PresenterConfig;
    private _characterSet: CharacterSet;

    /**
     * Instantiate a new Viewer.
     * @param element Parent HTMLElement to present within.
     * @param options Optional viewer options object.
     */
    constructor(public element: HTMLElement, options?: Partial<ViewerOptions>) {
        this.options = VegaMorphCharts.util.deepMerge<ViewerOptions>(defaultViewerOptions, options as ViewerOptions);
        this.presenter = new VegaMorphCharts.Presenter(element, getPresenterStyle(this.options));
        //this.presenter.logger = console.log;
        this._characterSet = new CharacterSet();
        this._dataScope = new DataScope();
        this._animator = new Animator(
            this._dataScope,
            {
                onDataChanged: this.onDataChanged.bind(this),
                onAnimateDataChange: this.onAnimateDataChange.bind(this),
            });
        this._details = new Details(
            this.presenter.getElement(VegaMorphCharts.PresenterElement.panel),
            this.options.language,
            this._animator,
            this._dataScope,
            remap => {
                this.currentColorContext = ~~remap;
                this.renderSameLayout();
            },
            () => this.insight && this.insight.columns && !!this.insight.columns.color && this.colorContexts && this.colorContexts.length > 1,
        );
        this.insight = {} as Insight;
    }

    private changeColorContexts(colorContexts: ColorContext[]) {
        this.colorContexts = colorContexts;
        this.currentColorContext = 0;
        this.options.onColorContextChange && this.options.onColorContextChange();
    }

    private applyLegendColorContext(colorContext: ColorContext) {
        const a = VegaMorphCharts.util.getActiveElementInfo();
        VegaMorphCharts.util.mount(colorContext.legendElement, this.presenter.getElement(VegaMorphCharts.PresenterElement.legend));
        VegaMorphCharts.util.setActiveElement(a);
        this.presenter.stage.legend = colorContext.legend;
    }

    private onAnimateDataChange(dataChange: DataLayoutChange, waitingLabel: string, handlerLabel: string, time?: number) {
        if (time === undefined) {
            const transitionDurations = this.setup?.transitionDurations || VegaMorphCharts.defaults.defaultPresenterConfig.transitionDurations;
            time = transitionDurations.position + transitionDurations.stagger;
        }
        return new Promise<void>((resolve, reject) => {
            let innerPromise: Promise<any>;
            if (dataChange === DataLayoutChange.refine) {
                const oldColorContext = this.colorContexts[this.currentColorContext];
                innerPromise = new Promise<void>(innerResolve => {
                    this.renderNewLayout({}, {
                        ...(this.setup || {}),
                        preStage: (stage, cubeLayer) => {
                            finalizeLegend(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
                            this.overrideAxisLabels(stage);
                            cubeLayer.unitColorMap = oldColorContext.colorMap;
                            if (this.options.onStage) {
                                this.options.onStage(stage);
                            }
                        },
                    }).then(() => {
                        //apply old legend
                        this.applyLegendColorContext(oldColorContext);
                        innerResolve();
                    });
                });
            } else {
                innerPromise = this.renderNewLayout({}, {
                    ...(this.setup || {}),
                    preStage: (stage, colorMapper) => {
                        finalizeLegend(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
                        this.overrideAxisLabels(stage);
                        if (this.options.onStage) {
                            this.options.onStage(stage);
                        }
                    },
                });
            }
            innerPromise.then(() => {
                this.presenter.animationQueue(resolve, time, { waitingLabel, handlerLabel, animationCanceled: reject });
            });
        });
    }

    private async onDataChanged(dataLayout: DataLayoutChange, filter?: Search) {
        switch (dataLayout) {
            case DataLayoutChange.same: {
                const hasSelectedData = this._dataScope.hasSelectedData();
                const hasActive = !!this._dataScope.active;

                if (hasSelectedData || hasActive) {
                    this.presenter.morphChartsRenderResult.update({ cubes: this.convertSearchToSet() });
                } else {
                    this.presenter.morphChartsRenderResult.update({ cubes: null });
                }
                break;
            }
            case DataLayoutChange.refine: {
                //save cube colors
                const oldColorContext = this.colorContexts[this.currentColorContext];
                let colorMap: VegaMorphCharts.types.UnitColorMap;
                this.presenter.morphChartsRenderResult.update({ cubes: null });
                await this.renderNewLayout({}, {
                    ...(this.setup || {}),
                    preStage: (stage, cubeLayer) => {
                        //save off the spec colors
                        colorMap = cubeLayer.unitColorMap;
                        cubeLayer.unitColorMap = oldColorContext.colorMap;
                        this.preStage(stage, cubeLayer);
                    },
                    onPresent: () => {
                        //save new legend
                        const newColorContext: ColorContext = {
                            colorMap,
                            legend: VegaMorphCharts.util.clone(this.presenter.stage.legend),
                            legendElement: this.presenter.getElement(VegaMorphCharts.PresenterElement.legend).children[0] as HTMLElement,
                        };
                        //apply old legend
                        this.applyLegendColorContext(oldColorContext);
                        this.changeColorContexts([oldColorContext, newColorContext]);
                        this.onPresent();
                    },
                });

                //narrow the filter only if it is different
                if (!searchExpression.compare(this.insight.filter, filter)) {
                    this.insight.filter = searchExpression.narrow(this.insight.filter, filter);
                }
                if (this.options.onDataFilter) {
                    this.options.onDataFilter(this.insight.filter, this._dataScope.currentData());
                }
                break;
            }
            case DataLayoutChange.reset: {
                const colorContext: ColorContext = {
                    colorMap: null,
                    legend: null,
                    legendElement: null,
                };
                this.changeColorContexts([colorContext]);
                this.presenter.morphChartsRenderResult.update({ cubes: null });
                await this.renderNewLayout({}, {
                    ...(this.setup || {}),
                    onPresent: () => {
                        //color needs to change instantly
                        populateColorContext(colorContext, this.presenter);
                        this.onPresent();
                    },
                });

                delete this.insight.filter;
                if (this.options.onDataFilter) {
                    this.options.onDataFilter(null, null);
                }
                break;
            }
        }
        if (this.options.onSelectionChanged) {
            const sel = this.getSelection();
            this.options.onSelectionChanged((sel && sel.search) || null, 0, (sel && sel.selectedData) || null);
        }
    }

    private convertSearchToSet() {
        if (this._dataScope.selection) {
            const s = new Set<number>();
            let found = false;
            this._dataScope.selection.included.forEach((o, i) => {
                s.add(o[GL_ORDINAL]);
                found = true;
            });
            if (!found) {
                s.add(-1);
            }
            return s;
        }
    }

    private convertSetToSearch(s: Set<number>) {
        const search: SearchExpressionGroup = {
            expressions: [],
        };
        s.forEach(value => {
            search.expressions.push({
                name: GL_ORDINAL,
                operator: '==',
                value,
                clause: '||',
            });
        });
        return search;
    }

    private getSpecColumnsWithFilteredStats() {
        if (!this._dataScope.hasFilteredData()) {
            return this._specColumns;
        }
        const roles = ['color', 'facet', 'group', 'size', 'sort', 'sum', 'x', 'y', 'z'];
        const specColumns = { ...this._specColumns };
        roles.forEach(r => {
            if (specColumns[r]) {
                const column = { ...specColumns[r] } as Column;
                column.stats = this.getColumnStats(column);
                specColumns[r] = column;
            }
        });
        return specColumns;
    }

    private async renderNewLayout(signalValues: SignalValues, presenterConfig?: VegaMorphCharts.types.PresenterConfig, view?: View) {
        const currData = this._dataScope.currentData();
        const context: SpecContext = {
            specColumns: this.getSpecColumnsWithFilteredStats(),
            insight: this.insight,
            specViewOptions: {
                ...this.options,
                zAxisOptions: {
                    showZAxis: true,
                    zIndex: zAxisZindex,
                },
                collapseFacetAxes: true,
            },
        };
        const specResult = build(context, currData);
        if (!specResult.errors) {
            const uiValues = extractSignalValuesFromView(this.vegaViewGl, this.vegaSpec);
            applySignalValues({ ...uiValues, ...signalValues }, specResult.vegaSpec);
            unbindSignalUI(specResult.vegaSpec);
            this.vegaSpec = specResult.vegaSpec;
            this.options.onVegaSpec && this.options.onVegaSpec(this.vegaSpec);
            this.specCapabilities = specResult.specCapabilities;
            const config = this.createConfig(presenterConfig);
            this._lastPresenterConfig = config.presenterConfig;
            if (view) {
                config.getView = () => view;
            }
            if (!didRegisterColorSchemes) {
                registerColorSchemes(VegaMorphCharts.base.vega);
                didRegisterColorSchemes = true;
            }
            try {
                if (this.vegaViewGl) {
                    this.vegaViewGl.finalize();
                }
                const runtime = VegaMorphCharts.base.vega.parse(this.vegaSpec);
                this.vegaViewGl = new VegaMorphCharts.ViewGl(runtime, config)
                    .renderer('morphcharts')
                    .initialize(this.element) as ViewGl_Class;
                await this.vegaViewGl.runAsync();

                const handler: SignalListenerHandler = (n, v) => {
                    this._characterSet.resetCharacterSet(true);
                };

                this.vegaSpec.signals.forEach(s => {
                    this.vegaViewGl.addSignalListener(s.name, handler);
                });

                //capture new color color contexts via signals
                this.configForSignalCapture(config.presenterConfig);
            }
            catch (e) {
                specResult.errors = [e.message];
            }
            if (!specResult.errors) {
                ensureHeaders(this.presenter, this.options.language.headers);
            }
        }
        if (specResult.errors) {
            if (this.options.onError) {
                this.options.onError(specResult.errors);
            } else if (this.presenter.logger) {
                this.presenter.logger(`errors rendering Vega spec:${specResult.errors.join('\n')}`);
            }
        }
        return specResult;
    }

    /**
     * Render the same layout with new options.
     * @param newViewerOptions New options object.
     */
    renderSameLayout(newViewerOptions?: Partial<ViewerOptions>) {
        const colorContext = this.colorContexts[this.currentColorContext];

        this.applyLegendColorContext(colorContext);

        if (newViewerOptions) {
            if (newViewerOptions.colors) {
                //set theme colors PresenterConfig
                const mcColors = this.getMorphChartsColors();
                this.presenter.configColors(mcColors);

                this._lastPresenterConfig.morphChartsColors = mcColors;
            }
            this.options = VegaMorphCharts.util.deepMerge(this.options, newViewerOptions as ViewerOptions);
        }

        this.presenter.morphChartsRenderResult.getCubeLayer().unitColorMap = colorContext.colorMap;
        this.presenter.morphChartsRenderResult.update({ cubes: this.convertSearchToSet() });
    }

    private getView(view: View) {
        if (view === undefined) {
            if (this.presenter.view === null) {
                return defaultView;
            } else {
                return this.presenter.view;
            }
        } else {
            return view;
        }
    }

    private transformData(values: object[], transform: Transforms[]) {
        try {
            const runtime = VegaMorphCharts.base.vega.parse({
                $schema: 'https://vega.github.io/schema/vega/v4.json',
                data: [{
                    name: 'source',
                    values,
                    transform,
                }],
            });
            new VegaMorphCharts.ViewGl(runtime).run();
        }
        catch (e) {
            // continue regardless of error
        }
        return values;
    }

    /**
     * Render data into a visualization.
     * @param insightSetup InsightSetup object to create a visualization rendering.
     * @param data Array of data objects.
     * @param renderOptions Optional RenderOptions object.
     */
    async render(insightSetup: InsightSetup, data: object[], renderOptions: RenderOptions = {}) {
        const { insight, setup } = insightSetup;
        let result: RenderResult;
        //see if refine expression has changed
        if (!searchExpression.compare(insight.filter, this.insight.filter)) {
            const transitionDurations = setup?.transitionDurations || VegaMorphCharts.defaults.defaultPresenterConfig.transitionDurations;
            const renderTime = transitionDurations.position + transitionDurations.stagger;
            const allowAsyncRenderTime = renderTime + this.options.filterRenderingTimerPadding;
            if (insight.filter) {
                //refining
                result = await this._render(insightSetup, data, renderOptions, true);
                this.presenter.animationQueue(() => {
                    this.filter(insight.filter, renderOptions.rebaseFilter && renderOptions.rebaseFilter());
                }, allowAsyncRenderTime, { waitingLabel: 'layout before refine', handlerLabel: 'refine after layout' });
            } else {
                //not refining
                this._dataScope.setFilteredData(null);
                result = await this._render(insightSetup, data, renderOptions, true);
                this.presenter.animationQueue(() => {
                    this.reset();
                }, allowAsyncRenderTime, { waitingLabel: 'layout before reset', handlerLabel: 'reset after layout' });
            }
        } else {
            result = await this._render(insightSetup, data, renderOptions, false);
        }
        return result;
    }

    private shouldViewstateTransition(newInsight: Insight, oldInsight: Insight) {
        if (!oldInsight.columns) return false;
        if (oldInsight.chart !== newInsight.chart) return true;
        if (oldInsight.size.height !== newInsight.size.height) return true;
        if (oldInsight.size.width !== newInsight.size.width) return true;
        if (oldInsight.columns.facet !== newInsight.columns.facet) return true;
        return false;
    }

    private configForSignalCapture(presenterConfig: VegaMorphCharts.types.PresenterConfig) {
        const colorContext = {
            colorMap: null,
            legend: null,
            legendElement: null,
        };

        //now be ready to capture color changing signals 
        presenterConfig.preStage = (stage, cubeLayer) => {
            if (this._shouldSaveColorContext()) {
                //save off the colors from Vega layout
                colorContext.colorMap = cubeLayer.unitColorMap;
            }
            this.preStage(stage, cubeLayer);
        };
        presenterConfig.onPresent = () => {
            if (this._shouldSaveColorContext()) {
                populateColorContext(colorContext, this.presenter);
                this.changeColorContexts([colorContext]);
                this._dataScope.deselect();
            }
            this.onPresent();
        };
    }

    private onPresent() {
        if (this.setup?.transition) {
            assignTransitionStagger(this.setup.transition, this._dataScope.currentData(), this.convertSearchToSet(), this.presenter);
        }
        this.options.onPresent && this.options.onPresent();
    }

    private async _render(insightSetup: InsightSetup, data: object[], renderOptions: RenderOptions, forceNewCharacterSet: boolean) {
        const { insight, setup } = insightSetup;
        if (this._tooltip) {
            this._tooltip.destroy();
            this._tooltip = null;
        }
        if (this._dataScope.setData(data, renderOptions.columns)) {
            //apply transform to the data
            this.transformData(data, insight.transform);
        }
        this._specColumns = getSpecColumns(insight, this._dataScope.getColumns(renderOptions.columnTypes));
        const ordinalMap = assignOrdinals(this._specColumns, data, renderOptions.ordinalMap);

        this._characterSet.resetCharacterSet(forceNewCharacterSet, this.insight, insight);

        this.insight = VegaMorphCharts.util.clone(insight);
        this.setup = setup;
        this._shouldSaveColorContext = () => !renderOptions.initialColorContext;
        const colorContext = renderOptions.initialColorContext || {
            colorMap: null,
            legend: null,
            legendElement: null,
        };
        const specResult = await this.renderNewLayout(
            insight.signalValues,
            {
                ...(setup || {}),
                preStage: (stage, cubeLayer) => {
                    if (this._shouldSaveColorContext()) {
                        //save off the colors from Vega layout
                        colorContext.colorMap = cubeLayer.unitColorMap;
                    } else {
                        //apply passed colorContext
                        cubeLayer.unitColorMap = colorContext.colorMap;
                    }
                    //if items are selected, repaint
                    const hasSelectedData = !!this._dataScope.hasSelectedData();
                    //const hasActive = !!this._dataScope.active;
                    if (hasSelectedData || this._dataScope.active) {
                        //TODO paint active item
                        //this.presenter.mcRenderResult.update({ cubes: this.convertSearchToSet() });
                    }
                    this.preStage(stage, cubeLayer);
                },
                onPresent: () => {
                    if (this._shouldSaveColorContext()) {
                        populateColorContext(colorContext, this.presenter);
                        this.changeColorContexts([colorContext]);
                    } else {
                        //apply passed colorContext
                        this.applyLegendColorContext(colorContext);
                    }
                    this.onPresent();
                },
                shouldViewstateTransition: () => this.shouldViewstateTransition(insight, this.insight),
            },
            this.getView(insight.view),
        );
        //future signal changes should save the color context
        this._shouldSaveColorContext = () => !renderOptions.discardColorContextUpdates || !renderOptions.discardColorContextUpdates();
        this._details.render();
        const result: RenderResult = { ordinalMap, specResult };
        return result;
    }

    private overrideAxisLabels(stage: VegaMorphCharts.types.Stage) {
        // if (this._specColumns.x && this._specColumns.x.type === 'date') {
        //     stage.axes.x.forEach(axis => makeDateRange(
        //         axis.tickText,
        //         this.getColumnStats(this._specColumns.x)
        //     ));
        // }
        // if (this._specColumns.y && this._specColumns.y.type === 'date') {
        //     stage.axes.y.forEach(axis => makeDateRange(
        //         axis.tickText,
        //         this.getColumnStats(this._specColumns.y)
        //     ));
        // }

    }

    private preLayer(stage: VegaMorphCharts.types.Stage) {
        //convert ticks
        let axisRole: VegaMorphCharts.types.AxisRole;
        for (axisRole in stage.axes) {
            const capability = this.specCapabilities.roles.filter(r => r.role === axisRole)[0];
            if (capability && (capability.axisSelectionBetweenTicks || capability.axisSelection === 'exact')) {
                moveTicksBetween(stage.axes[axisRole]);
            }
        }
    }

    private preStage(stage: VegaMorphCharts.types.Stage, cubeLayer: VegaMorphCharts.types.ICubeLayer) {
        this.overrideAxisLabels(stage);
        this._axisSelection = new AxisSelection(this.specCapabilities, this._specColumns, stage);
        finalizeLegend(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
        if (this.options.onStage) {
            this.options.onStage(stage);
        }
    }

    private onCubeClick(e: MouseEvent | PointerEvent | TouchEvent, cube: VegaMorphCharts.types.Cube) {
        this.options.onCubeClick && this.options.onCubeClick(e, cube);
        const hasSelectedData = this._dataScope.hasSelectedData();
        if (hasSelectedData && this._dataScope.selection.included.length > 1) {
            //if active is within selection, keep the selection and activate the one.
            const indexWithinSelection = this._dataScope.ordinalIndexWithinSelection(cube.ordinal);
            if (indexWithinSelection.index >= 0) {
                this.activate(indexWithinSelection.datum);
                this._details.populate(this._dataScope.selection, indexWithinSelection.index);
                if (this.options.onSelectionChanged) {
                    const sel = this.getSelection();
                    this.options.onSelectionChanged(sel.search, indexWithinSelection.index, sel.selectedData);
                }
                return;
            }
        }
        if (hasSelectedData && this._dataScope.selection.included.length === 1 && this._dataScope.selection.included[0][GL_ORDINAL] === cube.ordinal) {
            this.deselect();
            return;
        }
        const search: SearchExpression = {
            name: GL_ORDINAL,
            operator: '==',
            value: cube.ordinal,
        };
        this.select(search);
    }

    private onCubeHover(event: MouseEvent | PointerEvent | TouchEvent, cube: VegaMorphCharts.types.Cube) {
        if (this._tooltip) {
            this._tooltip.destroy();
            this._tooltip = null;
        }
        if (!cube) {
            return;
        }
        const currentData = this._dataScope.currentData();
        const index = getDataIndexOfCube(cube, currentData);
        if (index >= 0) {
            const dataItem = cleanDataItem(this.options.tooltipOptions?.prepareDataItem(currentData[index]) || currentData[index]);
            const tooltipCreateOptions: TooltipCreateOptions = {
                dataItem,
                event,
            };
            if (this.options.tooltipOptions?.create) {
                this._tooltip = this.options.tooltipOptions.create(tooltipCreateOptions);
            } else {
                this._tooltip = new Tooltip({
                    ...tooltipCreateOptions,
                    cssPrefix: this.presenter.style.cssPrefix,
                });
            }
        }
    }

    private onTextHover(e: MouseEvent | PointerEvent | TouchEvent, t: VegaMorphCharts.types.VegaTextLayerDatum) {
        //return true if highlight color is different
        if (!t || !this.options.getTextColor || !this.options.getTextHighlightColor) return false;
        return !VegaMorphCharts.util.colorIsEqual(this.options.getTextColor(t), this.options.getTextHighlightColor(t));
    }

    private getMorphChartsColors(): VegaMorphCharts.types.MorphChartsColors {
        const { colors } = this.options;
        return {
            activeItemColor: colors.activeCube,
            axesGridBackgroundColor: colors.backgroundColor,
            axesGridHighlightColor: colors.axisSelectHighlight,
            axesGridMajorColor: colors.gridLine,
            axesGridMinorColor: colors.gridLine,
            axesGridZeroColor: colors.gridLine,
            axesTextHeadingColor: colors.axisText,
            axesTextLabelColor: colors.axisText,
            axesTextTitleColor: colors.axisText,
            backgroundColor: colors.backgroundColor,
            textBorderColor: colors.backgroundColor,
            textColor: colors.axisText,
        };
    }

    private createConfig(c?: VegaMorphCharts.types.PresenterConfig): VegaMorphCharts.types.ViewGlConfig {
        const { getTextColor, getTextHighlightColor, onTextClick } = this.options;
        const defaultPresenterConfig: VegaMorphCharts.types.PresenterConfig = {
            morphChartsColors: this.getMorphChartsColors(),
            zAxisZindex,
            getCharacterSet: stage => this._characterSet.getCharacterSet(stage),
            getTextColor,
            getTextHighlightColor,
            onTextClick: (e, t) => {
                if (t.metaData && t.metaData.search) {
                    //used by facets to select the facet
                    const search = getSearchGroupFromVegaValue(t.metaData.search);
                    if (this.options.onAxisClick) {
                        this.options.onAxisClick(e, search);
                    } else {
                        this.select(search);
                    }
                }
                if (onTextClick) {
                    onTextClick(e, t);
                }
            },
            onCubeClick: this.onCubeClick.bind(this),
            onCubeHover: this.onCubeHover.bind(this),
            onTextHover: this.onTextHover.bind(this),
            preLayer: this.preLayer.bind(this),
            preStage: this.preStage.bind(this),
            onPresent: this.onPresent.bind(this),
            onAxisConfig: (cartesian, dim3d, axis) => {
                if (!axis) return;
                const role = this.specCapabilities.roles.filter(r => r.role === axis.axisRole)[0];
                if (role?.axisSelection) {
                    cartesian.isDivisionPickingEnabled[dim3d] = true;
                    cartesian.arePickDivisionsVisible[dim3d] = axis.tickText.length > 0;
                    cartesian.isLabelPickingEnabled[dim3d] = true;
                    cartesian.isTitlePickingEnabled[dim3d] = true;
                    cartesian.isHeadingPickingEnabled[dim3d] = true;
                    cartesian.isGridPickingEnabled = false;
                }
            },
            onAxesComplete: (cartesian) => {
            },
            axisPickGridCallback: (divisions: number[], e: MouseEvent | PointerEvent | TouchEvent) => {
                const search = this._axisSelection.convert(divisions);
                if (this.options.onAxisClick) {
                    this.options.onAxisClick(e, search as any);  //TODO change onAxisClick to accept Search
                } else {
                    this.select(search);
                }
            },
            onLayerClick: (e: MouseEvent) => {
                this.deselect();
            },
            onLegendClick: (e: MouseEvent, legend: VegaMorphCharts.types.Legend, clickedIndex: number) => {
                const legendRow = clickedIndex !== null && legend.rows[clickedIndex] as LegendRowWithSearch;
                if (legendRow) {
                    if (this.options.onLegendRowClick) {
                        this.options.onLegendRowClick(e, legendRow);
                    } else {
                        this.select(legendRow.search);
                    }
                } else if (this.options.onLegendHeaderClick) {
                    //header clicked
                    this.options.onLegendHeaderClick(e);
                }
            },
            onSceneRectAssignCubeOrdinal: datum => {
                //TODO see if datum is a facet selection rect
                return datum[GL_ORDINAL];
            },
            onTargetViewState: (h, w) => {
                const { height, width } = this.insight.size;
                let newViewStateTarget: boolean;
                if (this.options.onNewViewStateTarget) {
                    newViewStateTarget = this.options.onNewViewStateTarget();
                }
                return { height, width, newViewStateTarget };
            },
            layerSelection: {
                cubes: this.convertSearchToSet(),
            },
            preserveDrawingBuffer: this.options.preserveDrawingBuffer,
        };
        if (!this.options.disableLasso) {
            defaultPresenterConfig.onLasso = (ids, e) => {
                this.deselect();
                const search = this.convertSetToSearch(ids);
                this.select(search);
            };
        }
        if (this.options.onBeforeCreateLayers) {
            defaultPresenterConfig.preLayer = stage => {
                this.preLayer(stage);
                this.options.onBeforeCreateLayers(stage, this.specCapabilities);
            };
        }
        const config: VegaMorphCharts.types.ViewGlConfig = {
            presenter: this.presenter,
            presenterConfig: Object.assign(defaultPresenterConfig, c),
        };
        if (this.setup?.transitionDurations) {
            config.presenterConfig.transitionDurations = this.setup.transitionDurations;
        }
        return config;
    }

    /**
     * Filter the data and animate.
     * @param search Filter expression, see https://vega.github.io/vega/docs/expressions/
     * @param rebase Optional flag to apply to entire dataset. A false value will apply the filter upon any existing filter. 
     */
    filter(search: Search, rebase = false) {
        const u = this._dataScope.createUserSelection(search, false, rebase);
        return new Promise<void>((resolve, reject) => {
            this._animator.filter(search, u.included, u.excluded, rebase).then(() => {
                this._details.clear();
                this._details.clearSelection();
                this._details.populate(this._dataScope.selection);
                resolve();
            });
        });
    }

    /**
     * Remove any filtration and animate.
     */
    reset() {
        return new Promise<void>((resolve, reject) => {
            this._animator.reset().then(() => {
                this._details.clear();
                this._details.clearSelection();
                resolve();
            });
        });
    }

    /**
     * Select cubes by a filter expression.
     * @param search Filter expression, see https://vega.github.io/vega/docs/expressions/
     */
    select(search: Search) {
        return new Promise<void>((resolve, reject) => {
            this._animator.select(search).then(() => {
                this._details.populate(this._dataScope.selection);
                resolve();
            });
        });
    }

    /**
     * Removes any selection.
     */
    deselect() {
        return new Promise<void>((resolve, reject) => {
            this._animator.deselect().then(() => {
                this._details.clearSelection();
                resolve();
            });
        });
    }

    /**
     * Gets the current selection.
     */
    getSelection() {
        if (!this._dataScope) return null;
        const selectionState: SelectionState = {
            search: (this._dataScope.selection && this._dataScope.selection.search) || null,
            selectedData: (this._dataScope.selection && this._dataScope.selection.included) || null,
            active: this._dataScope.active,
        };
        return selectionState;
    }

    /**
     * Set one data row to the active state.
     */
    activate(datum: object) {
        return new Promise<void>((resolve, reject) => {
            this._animator.activate(datum).then(() => {
                this.presenter.morphChartsRenderResult.activate(datum[GL_ORDINAL]);
                this._details.render();
                resolve();
            });
        });
    }

    /**
     * Deactivate item.
     */
    deActivate() {
        return new Promise<void>((resolve, reject) => {
            if (this._dataScope && this._dataScope.active) {
                this._animator.deactivate().then(() => {
                    this.presenter.morphChartsRenderResult.activate(-1);
                    this._details.render();
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    /**
     * Gets the current camera.
     * @param transitionFinal Optional flag to get camera destination when transition completes.
     */
    getCamera(transitionFinal = false): Camera {
        let position: [number, number, number] = [0, 0, 0];
        let rotation: [number, number, number, number] = [0, 0, 0, 0];
        if (transitionFinal) {
            position = Array.from(this.presenter?.morphchartsref?.cameraTransitioner.vCameraPositionTo as any) as [number, number, number];
            rotation = Array.from(this.presenter?.morphchartsref?.cameraTransitioner.qCameraRotationTo as any) as [number, number, number, number];
        } else {
            const camera = this.presenter?.morphchartsref?.core?.camera;
            if (camera) {
                camera.getPosition(position);
                camera.getOrbit(rotation);
            }
        }
        return { position, rotation, captureSize: this.insight.size };
    }

    /**
     * Sets the current camera.
     * @param camera Camera to set.
     */
    setCamera(camera: Camera) {
        this.presenter?.morphChartsRenderResult?.moveCamera(camera.position, camera.rotation);
    }

    /**
     * Gets the current insight with signal values.
     */
    getInsight(): Insight {
        const insight = { ...this.insight };
        insight.signalValues = this.getSignalValues();
        return insight;
    }

    /**
     * Gets column stats from current data (filtered or all).
     * @param column Column to get stats for.
     */
    getColumnStats(column: Column) {
        return this._dataScope.hasFilteredData() ? this._dataScope.getFilteredColumnStats(column.name) : column.stats;
    }

    /**
     * Gets current signal values.
     */
    getSignalValues() {
        return extractSignalValuesFromView(this.vegaViewGl, this.vegaSpec);
    }

    finalize() {
        if (this._dataScope) this._dataScope.finalize();
        if (this._details) this._details.finalize();
        if (this._tooltip) this._tooltip.destroy();
        if (this.vegaViewGl) this.vegaViewGl.finalize();
        if (this.presenter) this.presenter.finalize();
        if (this.element) this.element.innerHTML = '';
        this.colorContexts = null;
        this.element = null;
        this.options = null;
        this.presenter = null;
        this.vegaSpec = null;
        this.vegaViewGl = null;
        this._animator = null;
        this._dataScope = null;
        this._details = null;
        this._tooltip = null;
    }
}
