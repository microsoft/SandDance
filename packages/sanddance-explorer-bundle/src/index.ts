// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from 'luma.gl';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as SandDanceExplorer from '@msrvida/sanddance-explorer';
import * as vega from 'vega-lib';
import { fabric } from './fabricComponents';

import SandDance = SandDanceExplorer.SandDance;
import types = SandDance.VegaDeckGl.types;

SandDanceExplorer.use(fabric, <types.VegaBase>vega, deck, layers, luma);

const init = (selector: string, cssHref: string) => new Promise<SandDanceExplorer.Explorer>((resolve, reject) => {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = cssHref;
    link.onload = () => {
        const explorerProps: SandDanceExplorer.Props = {
            logoClickUrl: 'https://microsoft.github.io/SandDance/',
            mounted: explorer => resolve(explorer)
        };
        const el = document.querySelector(selector) as HTMLElement;
        el.style.bottom = el.style.top = el.style.left = el.style.right = '0';
        el.style.display = 'grid';
        el.style.position = 'absolute';
        ReactDOM.render(React.createElement(SandDanceExplorer.Explorer, explorerProps), el);
    };
    document.getElementsByTagName("head")[0].appendChild(link);
});

export { deck, layers, luma, React, ReactDOM, SandDanceExplorer, vega, fabric, init };
