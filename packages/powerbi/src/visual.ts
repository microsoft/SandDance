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
"use strict";
import "@babel/polyfill";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import { capabilities, SandDance } from "@msrvida/sanddance-explorer";
import { createElement } from 'react';
import { render } from 'react-dom';

import { App, Props } from './app'
import { convertTableToObjectArray } from './data';
import { cleanInsight } from './insight';
import { VisualSettings, SandDanceConfig, IVisualSettings } from "./settings";

export class Visual implements IVisual {
    private settings: VisualSettings;
    private viewElement: HTMLElement;
    private errorElement: HTMLElement;
    private app: App;
    private prevSettings: IVisualSettings;
    private host: powerbi.extensibility.visual.IVisualHost;
    private selectionManager: powerbi.extensibility.ISelectionManager;

    constructor(options: VisualConstructorOptions) {
        //console.log('Visual constructor', options);
        this.host = options.host;
        this.selectionManager = this.host.createSelectionManager();

        if (typeof document !== "undefined") {
            options.element.style.position = 'relative'
            this.viewElement = SandDance.VegaDeckGl.util.addDiv(options.element, 'sanddance-powerbi');
            this.errorElement = SandDance.VegaDeckGl.util.addDiv(options.element, 'sanddance-error');
            this.errorElement.style.position = 'absolute';

            const props: Props = {
                mounted: (app: App) => {
                    this.app = app;
                },
                onViewChange: (tooltipExclusions: string[]) => {
                    const insight = this.app.explorer.viewer.getInsight();
                    tooltipExclusions = tooltipExclusions || this.app.explorer.state.tooltipExclusions;
                    cleanInsight(insight);
                    const config: SandDanceConfig = {
                        insightJSON: JSON.stringify(insight),
                        tooltipExclusionsJSON: JSON.stringify(tooltipExclusions)
                    };
                    const properties = config as any;
                    this.host.persistProperties({ replace: [{ objectName: 'sandDanceConfig', properties, selector: null }] });
                },
                onDataFilter: (filter, filteredData) => {
                    if (filteredData) {
                        const ids = filteredData.map(item => item[SandDance.constants.FieldNames.PowerBISelectionId] as powerbi.extensibility.ISelectionId);
                        this.selectionManager.select(ids, false);
                    } else {
                        this.selectionManager.clear();
                    }
                }
            };
            render(createElement(App, props), this.viewElement);
        }
    }

    destroy() {
        this.app && this.app.finalize();
        this.app = null;
    }

    public update(options: VisualUpdateOptions) {
        //console.log('Visual update', options);

        if (!capabilities.webgl) {
            this.app.unload();
            return;
        }

        const dataView = options && options.dataViews && options.dataViews[0];
        if (!dataView || !dataView.table) {
            this.app.unload();
            return;
        }

        this.settings = Visual.parseSettings(dataView);
        const oldData = this.app.getDataContent();
        let { data, different } = convertTableToObjectArray(dataView.table, oldData, this.host);
        if (!this.prevSettings) {
            different = true;
        }

        this.app.setChromeless(!this.settings.sandDanceMainSettings.showchrome);

        this.prevSettings = SandDance.VegaDeckGl.util.clone(this.settings);

        if (!different) {
            //console.log('Visual update - not different');
            return;
        }

        const {
            sandDanceMainSettings,
            sandDanceConfig
        } = this.settings;

        let tooltipExclusions: string[] = [];

        if (sandDanceConfig.tooltipExclusionsJSON) {
            try {
                tooltipExclusions = JSON.parse(sandDanceConfig.tooltipExclusionsJSON);
            } catch (e) { }
        }

        this.app.load(data, columns => {
            if (!columns) return;

            let insight: Partial<SandDance.types.Insight>;

            if (sandDanceConfig.insightJSON) {
                try {
                    insight = JSON.parse(sandDanceConfig.insightJSON);
                    delete insight.size;
                } catch (e) { }
            }

            return insight;
        }, tooltipExclusions);

    }

    private static parseSettings(dataView: DataView): VisualSettings {
        return VisualSettings.parse(dataView) as VisualSettings;
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
