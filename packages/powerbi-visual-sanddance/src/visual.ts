// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
module powerbi.extensibility.visual {
    "use strict";

    const defaultScheme = "powerbi";

    export interface SandDanceMainSettings {
        charttype: SandDance.types.Chart;
        showaxes: boolean;
        showlegend: boolean;
        colorbytype: 'numeric' | 'categorical';
    }

    export interface SandDanceColorCategoricalSettings {
        colorbycategorical: string;
    }

    export interface SandDanceColorNumericSettings {
        colorbynumeric: string;
    }

    export interface SandDanceScatterPlotSettings {
        pointsize: number;
    }

    export interface Settings {
        sandDanceMainSettings: SandDanceMainSettings;
        sandDanceColorCategoricalSettings?: SandDanceColorCategoricalSettings;
        sandDanceColorNumericSettings?: SandDanceColorNumericSettings;
        sandDanceScatterPlotSettings?: SandDanceScatterPlotSettings;
    }

    export interface Global {
        SandDance?: typeof SandDance;
    }

    export let global: Global = {};

    export class Visual implements IVisual {
        private settings: Settings;
        private viewer: SandDance.Viewer;
        private viewElement: HTMLElement;
        private errorElement: HTMLElement;
        private ordinalMap: SandDance.types.OrdinalMap;

        constructor(options: VisualConstructorOptions) {
            //un-comment for debug
            //console.log('Visual constructor', options);

            var w = window as any as {
                vega: SandDance.VegaDeckGl.types.VegaBase;
                deck: SandDance.VegaDeckGl.types.DeckBase & SandDance.VegaDeckGl.types.DeckLayerBase;
                luma: SandDance.VegaDeckGl.types.LumaBase;
                SandDance: typeof SandDance;
            };
            var deck = w.deck;
            var luma = w.luma;
            var vega = w.vega as SandDance.VegaDeckGl.types.VegaBase;
            global.SandDance = w.SandDance;

            options.element.style.position = 'relative'
            this.viewElement = global.SandDance.VegaDeckGl.util.addDiv(options.element, 'sanddance-view');
            this.errorElement = global.SandDance.VegaDeckGl.util.addDiv(options.element, 'sanddance-error');
            this.errorElement.style.position = 'absolute';

            this.settings = {
                sandDanceMainSettings: {
                    charttype: 'barchart',
                    showaxes: true,
                    showlegend: true,
                    colorbytype: null
                },
                sandDanceColorCategoricalSettings: {
                    colorbycategorical: defaultScheme
                },
                sandDanceColorNumericSettings: {
                    colorbynumeric: defaultScheme
                },
                sandDanceScatterPlotSettings: {
                    pointsize: 5
                }
            };

            vega.scheme(defaultScheme, (value: any) => {
                const color = options.host.colorPalette.getColor(value);
                return color.value;
            });

            global.SandDance.use(vega, deck, deck, luma);
            this.viewer = new global.SandDance.Viewer(this.viewElement, { onVegaSpec: vegaSpec => this.onVegaSpec(vegaSpec) });

            this.showMessage(messages.selectData);
        }

        private onVegaSpec(vegaSpec: Vega.Spec) {
            if (!this.settings.sandDanceMainSettings.showaxes) {
                delete vegaSpec.axes;
            }
        }

        public showMessage(errorHTML: string) {
            this.errorElement.innerHTML = errorHTML;
            if (errorHTML) {
                this.viewElement.style.display = 'none';
            } else {
                this.viewElement.style.display = '';
            }
        }

        private getGlSize() {
            const original = this.viewElement.style.display;
            this.viewElement.style.display = '';
            const gl = this.viewer.presenter.getElement(global.SandDance.VegaDeckGl.PresenterElement.gl);
            const size: SandDance.types.Size = { height: gl.offsetHeight, width: gl.offsetWidth };
            this.viewElement.style.display = original;
            return size;
        }

        public update(options: VisualUpdateOptions) {
            //un-comment for debug
            //console.log('Visual update', options);

            const dataView = options && options.dataViews && options.dataViews[0];
            if (!dataView) {
                this.showMessage(messages.selectData);
                return;
            }

            if (dataView.metadata && dataView.metadata.objects) {
                const settings = dataView.metadata.objects as any as Settings;
                for (var key in settings) {
                    let value = settings[key];
                    if (value) {
                        this.settings[key] = { ... this.settings[key], ...value };
                    }
                }
            }

            if (dataView.table &&
                dataView.metadata &&
                dataView.metadata.columns &&
                dataView.metadata.columns.length > 0 &&
                dataView.table.rows) {

                const metaDataColumns = getColumnsWithRoles(dataView.metadata.columns, ['uid', 'x', 'y', 'z', 'color', 'sort']);
                const data = getDataRows(metaDataColumns, dataView.table.rows);

                const rootElclassList = this.viewer.presenter.getElement(global.SandDance.VegaDeckGl.PresenterElement.root).classList;
                if (!this.settings.sandDanceMainSettings.showlegend || !metaDataColumns.color) {
                    rootElclassList.add('no-legend');
                } else {
                    rootElclassList.remove('no-legend');
                }
                const size = this.getGlSize();

                const insight = getInsight(this.settings, size, metaDataColumns);
                if (metaDataColumns.color) {
                    if (this.settings.sandDanceMainSettings.colorbytype === 'numeric') {
                        insight.scheme = (this.settings.sandDanceColorNumericSettings && this.settings.sandDanceColorNumericSettings.colorbynumeric) || defaultScheme;
                    } else {
                        insight.scheme = (this.settings.sandDanceColorCategoricalSettings && this.settings.sandDanceColorCategoricalSettings.colorbycategorical) || defaultScheme;
                    }
                }
                if (insight.chart === 'scatterplot') {
                    insight.signalValues[global.SandDance.constants.SignalNames.PointSize] = this.settings.sandDanceScatterPlotSettings.pointsize;
                }
                this.viewer.render(insight, data, { ordinalMap: this.ordinalMap }).then(renderResult => {
                    if (renderResult.specResult.errors) {
                        this.showMessage(messages.chartErrors(renderResult.specResult.errors));
                    } else {
                        this.ordinalMap = renderResult.ordinalMap;
                        this.showMessage('');
                    }
                });
            } else {
                this.showMessage(messages.noData);
            }
        }

        /**
         * Enumerates through the objects defined in the capabilities and adds the properties to the format pane
         *
         * @function
         * @param {EnumerateVisualObjectInstancesOptions} options - Map of defined objects
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            let objectName = options.objectName;
            let objectEnumeration: VisualObjectInstance[] = [];

            switch (objectName) {

                case 'sandDanceMainSettings':
                    var o: VisualObjectInstance = {
                        objectName: objectName,
                        properties: this.settings.sandDanceMainSettings as any,
                        selector: null
                    };
                    objectEnumeration.push(o);
                    break;

                case 'sandDanceColorCategoricalSettings':
                    if (this.settings.sandDanceMainSettings.colorbytype === 'categorical') {
                        var o: VisualObjectInstance = {
                            objectName: objectName,
                            properties: this.settings.sandDanceColorCategoricalSettings as any,
                            selector: null
                        };
                        objectEnumeration.push(o);
                    }
                    break;

                case 'sandDanceColorNumericSettings':
                    if (this.settings.sandDanceMainSettings.colorbytype === 'numeric') {
                        var o: VisualObjectInstance = {
                            objectName: objectName,
                            properties: this.settings.sandDanceColorNumericSettings as any,
                            selector: null
                        };
                        objectEnumeration.push(o);
                    }
                    break;

                case 'sandDanceScatterPlotSettings':
                    if (this.settings.sandDanceMainSettings.charttype === 'scatterplot') {
                        var o: VisualObjectInstance = {
                            objectName: objectName,
                            properties: this.settings.sandDanceScatterPlotSettings as any,
                            selector: null
                        };
                        objectEnumeration.push(o);
                    }
                    break;
            };
            return objectEnumeration;
        }
    }
}