// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { use } from './base';
import { fabric } from './fabricComponents';
import { SandDanceApp } from './sanddanceApp';
import { DataSource, InsightMap } from './types';
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as SandDanceExplorer from '@msrvida/sanddance-explorer';
import {
    ColorSettings,
    DataFileType,
    Explorer,
    Prefs
} from '@msrvida/sanddance-explorer';
import * as luma from 'luma.gl';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as vega from 'vega';

use(fabric, vega, deck, layers, luma);

const staticContent = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('a.sanddance-app-static-content')
);

const dataSets = staticContent.filter(f => f.id).map<DataSource>(n => {
    const forData = staticContent.filter(f => f.dataset['for'] === n.id)[0];
    return {
        dataSourceType: 'sample',
        id: n.id,
        displayName: n.dataset['displayName'],
        dataUrl: n.href,
        type: n.dataset['type'] as DataFileType,
        snapshotsUrl: forData ? forData.href : null
    };
});

export let explorer: Explorer;

export { SandDanceExplorer };

declare var insights: InsightMap;
declare var darkTheme: boolean;
declare function setTheme(darkTheme: boolean): void;
declare var options: { [datasetId: string]: Prefs };
declare var themeColors: { [theme: string]: ColorSettings };

const undef = typeof undefined;

ReactDOM.render(
    <SandDanceApp
        setTheme={typeof setTheme !== undef && setTheme}
        darkTheme={typeof darkTheme !== undef && darkTheme}
        insights={typeof insights !== undef && insights}
        initialOptions={typeof options !== undef && options}
        themeColors={typeof themeColors !== undef && themeColors}
        dataSources={dataSets}
        mounted={app => {
            explorer = app.explorer;
        }}
    />,
    document.getElementById('app')
);
