// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { build, getColumnsFromData, getSpecColumns, Insight, SpecContext, SpecViewOptions } from '../dist/es6';
import { Column } from '@msrvida/chart-types';
import * as Vega from 'vega-typings';

declare const vega: {
    inferTypes: typeof Vega.inferTypes;
    loader: typeof Vega.loader;
    parse: typeof Vega.parse;
    read: typeof Vega.read;
    View: typeof Vega.View;
};

const dataUrl = '/SandDance/sample-data/demovote.tsv';
const specViewOptions: SpecViewOptions = {
    colors: {
        defaultCube: "steelblue",
        axisLine: "#000",
        axisText: "#000"
    },
    language: <any>{
        count: "Count"
    },
    maxLegends: 20,
    tickSize: 10
};
let data: object[];
let columns: Column[];
const container = document.getElementById('vis');
const select = document.getElementById('select-spec') as HTMLSelectElement;
const insightTextarea = document.getElementById('insight-json') as HTMLTextAreaElement;
const insightUdateButton = document.getElementById('insight-update') as HTMLButtonElement;
const vegaOutput = document.getElementById('vega-spec') as HTMLTextAreaElement;
const vegaCopy = document.getElementById('vega-spec-copy') as HTMLButtonElement;

select.onchange = () => selected(select.selectedIndex);

insightUdateButton.onclick = () => {
    const insight = JSON.parse(insightTextarea.value);
    render(insight);
};

vegaCopy.onclick = () => {
    vegaOutput.select();
    document.execCommand('copy');
    vegaCopy.innerText = 'copied';
    setTimeout(() => {
        vegaCopy.innerText = 'copy';
    }, 2000);
}

function selected(selectedIndex: number) {
    container.innerHTML = `loading spec...`;
    fetchInsight(select.options[selectedIndex].value);
}

function fetchInsight(specFilename: string) {
    fetch(`specs/${specFilename}`)
        .then(response => response.json())
        .then(insight => render(insight))
        .catch(error => container.innerText = error);
}

function render(insight: Insight) {
    insightTextarea.value = JSON.stringify(insight, null, 2);
    const specColumns = getSpecColumns(insight, columns);
    const context: SpecContext = { specColumns, insight, specViewOptions };
    const specResult = build(context, data);
    if (specResult.errors) {
        container.innerText = specResult.errors.map(error => error).join('\n');
    } else {
        renderVegaSpec(specResult.vegaSpec);
    }
}

function renderVegaSpec(vegaSpec: Vega.Spec) {
    const runtime = vega.parse(vegaSpec);
    const vegaView = new vega.View(runtime, { container });
    vegaView
        .runAsync()
        .catch(e => container.innerHTML = `error ${e}`)
        .then(() => {
            const d0 = vegaSpec.data[0] as any;
            delete d0.values;
            d0.format = {
                parse: 'auto',
                type: 'tsv'
            };
            d0.url = 'https://microsoft.github.io' + dataUrl
            vegaOutput.value = JSON.stringify(vegaSpec, null, 2);
        });
}

container.innerHTML = `loading ${dataUrl}...`;
vega.loader().load(dataUrl).then(tsv_data => {
    data = vega.read(tsv_data, { type: 'tsv', parse: 'auto' });
    columns = getColumnsFromData(vega.inferTypes, data);
    selected(0);
});
