// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from '@luma.gl/core';
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

const snapshotsPromise = fetchResource('titanic-snapshots').then(response => {
    return response.json();
}).then(json => {
    return json as SandDance.types.Snapshot[];
});

interface Props {
}

interface State {
    snapshots?: SandDance.types.Snapshot[];
    insightIndex: number;
    data?: object[];
    size: SandDance.specs.Size;
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
        Promise.all([dataPromise, snapshotsPromise]).then(([data, snapshots]: [object[], SandDance.types.Snapshot[]]) => {
            this.setState({ data, snapshots });
        });
    }

    goTo(insightIndex: number) {
        const changeInsight = () => {
            this.setState({ insightIndex });
        };
        const currentFilter = this.viewer.getInsight().filter;
        const newState = this.state.snapshots[insightIndex].insight;
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
        if (!this.state.snapshots || !this.state.data) {
            return (
                <div>loading...</div>
            );
        }
        const { insightIndex, snapshots } = this.state;
        const partialInsight = snapshots[insightIndex].insight;
        const insight: SandDance.specs.Insight = {
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
