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
import { SandDance } from "@msrvida/sanddance-explorer";
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

    constructor(options: VisualConstructorOptions) {
        //console.log('Visual constructor', options);
        if (typeof document !== "undefined") {
            options.element.style.position = 'relative'
            this.viewElement = SandDance.VegaDeckGl.util.addDiv(options.element, 'sanddance-view');
            this.errorElement = SandDance.VegaDeckGl.util.addDiv(options.element, 'sanddance-error');
            this.errorElement.style.position = 'absolute';

            const props: Props = {
                mounted: (app: App) => {
                    this.app = app;
                },
                onViewChange: () => {
                    const insight = this.app.explorer.viewer.getInsight();
                    cleanInsight(insight);
                    const config: SandDanceConfig = {
                        insightJSON: JSON.stringify(insight)
                    };
                    const properties = config as any;
                    options.host.persistProperties({ replace: [{ objectName: 'sandDanceConfig', properties, selector: null }] });
                }
            };
            render(createElement(App, props), this.viewElement);
        }
    }

    public update(options: VisualUpdateOptions) {
        console.log('Visual update', options);

        const dataView = options && options.dataViews && options.dataViews[0];
        if (!dataView) return;

        this.settings = Visual.parseSettings(dataView);
        const oldData = this.app.explorer.state.dataContent && this.app.explorer.state.dataContent.data;
        let { data, different } = convertTableToObjectArray(dataView.table, oldData);

        if (!this.prevSettings) {
            different = true;
        }

        this.app.setChromeless(!this.settings.sandDanceMainSettings.showchrome);

        this.prevSettings = SandDance.VegaDeckGl.util.clone(this.settings);

        if (!different) return;

        this.app.explorer.load(data, columns => {

            const {
                sandDanceMainSettings,
                sandDanceConfig
            } = this.settings;

            let insight: Partial<SandDance.types.Insight>;

            if (sandDanceConfig.insightJSON) {
                try {
                    insight = JSON.parse(sandDanceConfig.insightJSON);
                    delete insight.size;

                    console.log('using insight:', insight);

                } catch (e) {
                    //TODO inform user that JSON did not parse. Possibly re-persist a blank.
                }
            }

            // if (!insight) {
            //     //TODO make sure insight works with columns
            //     insight = {
            //         columns: {
            //         },
            //         view: '2d'
            //     };
            //     console.log('new insight');
            // }

            return insight;
        });

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
