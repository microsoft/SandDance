// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from 'luma.gl';
import * as React from 'react';
import * as vega from 'vega';
import Content from './index.mdx';
import { render } from 'react-dom';
import { SandDance, SandDanceReact } from '@msrvida/sanddance-react';

SandDance.use(vega, deck, layers, luma);

function fetchResource(linkId: string) {
    const link = document.querySelector<HTMLAnchorElement>('#' + linkId);
    return fetch(link.href);
}

const dataPromise = fetchResource('titanic-data').then(response => {
    return response.text();
}).then(text => {
    //vega converts the csv to json.
    return SandDance.VegaDeckGl.base.vega.read(text, { type: 'csv', parse: 'auto' });
});

const insightsPromise = fetchResource('titanic-insights').then(response => {
    return response.json();
}).then(json => {
    return json as SandDance.types.Insight[];
});

interface Props {
}

interface State {
    insights?: SandDance.types.Insight[];
    insightIndex: number;
    data?: object[];
    size: SandDance.types.Size;
}

export class Page extends React.Component<Props, State> {
    public viewer: SandDance.Viewer;

    constructor(props: Props) {
        super(props);
        this.state = {
            insightIndex: 0,
            size: { height: 600, width: 600 }
        };
    }

    componentDidMount() {
        Promise.all([dataPromise, insightsPromise]).then(([data, insights]: [object[], SandDance.types.Insight[]]) => {
            this.setState({ data, insights });
        });
    }

    goTo(insightIndex: number) {
        const changeInsight = () => {
            this.setState({ insightIndex });
        };
        const currentFilter = this.viewer.getInsight().filter;
        const newState = this.state.insights[insightIndex];
        if (currentFilter && newState.filter) {
            if (SandDance.searchExpression.startsWith(newState.filter, currentFilter)) {
                changeInsight();
            } else {
                this.viewer.reset()
                    .then(() => new Promise((resolve, reject) => { setTimeout(resolve, this.viewer.options.transitionDurations.scope); }))
                    .then(changeInsight);
            }
        } else {
            changeInsight();
        }

    }

    render() {
        if (!this.state.insights || !this.state.data) {
            return (
                <div>loading...</div>
            );
        }
        const { insightIndex, insights } = this.state;
        const partialInsight = insights[insightIndex];
        const insight: SandDance.types.Insight = {
            ...partialInsight,
            size: this.state.size,
            view: '2d'
        };
        return (
            <div>
                <SandDanceReact
                    ref={reactViewer => {
                        if (reactViewer) {
                            this.viewer = reactViewer.viewer;
                        }
                    }}
                    insight={insight}
                    data={this.state.data}
                />
                <div className="content">
                    <Content goTo={insightIndex => this.goTo(insightIndex)} />
                </div>
            </div>
        );
    }
}

render(<Page />, document.getElementById('app'));
