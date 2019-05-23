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
import { SandDance, use } from "@msrvida/sanddance-explorer";
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from 'luma.gl';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as vega from 'vega-lib';
import * as fabric from "office-ui-fabric-react";

import { App, Props } from './app'
import { VisualSettings, defaultScheme } from "./settings";

export class Visual implements IVisual {
    private settings: VisualSettings;
    private viewElement: HTMLElement;
    private errorElement: HTMLElement;
    private app: App;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);

        if (typeof document !== "undefined") {

            options.element.style.position = 'relative'
            this.viewElement = SandDance.VegaDeckGl.util.addDiv(options.element, 'sanddance-view');
            this.errorElement = SandDance.VegaDeckGl.util.addDiv(options.element, 'sanddance-error');
            this.errorElement.style.position = 'absolute';

            vega.scheme(defaultScheme, (value: any) => {
                const color = options.host.colorPalette.getColor(value);
                return color.value;
            });

            fabric.initializeIcons();
            use(ReactDOM.render as any, fabric as any, vega as any, deck, layers, luma);

            const props: Props = {
                mounted: (app: App) => this.app = app
            };

            ReactDOM.render(React.createElement(App, props), this.viewElement);
        }
    }

    public update(options: VisualUpdateOptions) {
        console.log('Visual update', options);
        const dataView = options && options.dataViews && options.dataViews[0];
        if (!dataView) return;

        this.settings = Visual.parseSettings(dataView);

        const { table } = dataView;
        const columnNames = table.columns.map(c => c.displayName);
        const data = table.rows.map(row => {
            const o: object = {};
            columnNames.forEach((cn, i) => {
                o[cn] = row[i];
            });
            return o;
        });

        this.app.explorer.load(data, columns => {

            const {
                sandDanceMainSettings,
                sandDanceColorCategoricalSettings,
                sandDanceColorNumericSettings
            } = this.settings;

            const scheme = sandDanceMainSettings.colorbytype === 'categorical'
                ? sandDanceColorCategoricalSettings.colorbycategorical
                : sandDanceColorNumericSettings.colorbynumeric;

            //TODO make sure insight works with columns
            const insight: Partial<SandDance.types.Insight> = {
                scheme,
                columns: {
                },
                chart: sandDanceMainSettings.charttype,
                view: '2d'
            };

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
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}
