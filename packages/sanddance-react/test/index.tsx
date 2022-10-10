// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as vega from 'vega';
import * as SandDanceReact from '../src/index';

SandDanceReact.use(React, ReactDOM, vega);

interface Props { }

interface State {
    data: object[];
    index: number;
}

class App extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            index: 0,
        };
    }

    render() {
        const { data, index } = this.state;

        return React.createElement('div', {},
            React.createElement('button',
                {
                    onClick: () => {
                        let index = this.state.index + 1;
                        if (index >= insightSetups.length) {
                            index = 0;
                        }
                        this.setState({ index });
                    },
                },
                "Next",
            ),
            React.createElement(SandDanceReact.Viewer,
                { data, ...insightSetups[index] },
            )
        );
    }
}

vega.loader().load('https://microsoft.github.io/SandDance/sample-data/titanicmaster.tsv').then(tsv_data => {
    const data = vega.read(tsv_data, { type: 'tsv', parse: 'auto' });
    const app = React.createElement(App, { data });
    ReactDOM.render(app, document.getElementById('app'));
});

var insightSetups: SandDanceReact.SandDance.types.InsightSetup[] = [
    {
        insight: {
            columns: {
                x: "Gender",
                y: "Joined",
                color: "Survived",
                z: "TicketCost",
                sort: "Survived"
            },
            scheme: "dual_redgreen",
            chart: "barchartV",
            view: "2d",
            size: {
                height: 800,
                width: 800
            }
        },
        setup: {
            camera: {
                position: [0, 0, 0],
                rotation: [0, 0, 0, 1],
                captureSize: {
                    height: 100,
                    width: 100,
                }
            },
            transition: {
                type: "ordinal"
            },
            transitionDurations: {
                position: 600,
                stagger: 600,
                view: 600
            },
            renderer: {
                advanced: false,
                advancedOptions: {
                    bloomIntensity: 2,
                    isBloomEnabled: false,
                    isDofEnabled: false,
                    dofFocusRange: 0.25,
                    isFxaaEnabled: false,
                    isShadowEnabled: true,
                    isSsaoEnabled: true
                },
                basicOptions: {
                    antialias: true
                }
            }
        }
    },
    {
        insight: {
            columns: {
                x: "Survived",
                y: "Joined",
                color: "TicketCost",
                z: "TicketCost",
                sort: "Survived"
            },
            scheme: "redyellowgreen",
            chart: "barchartH",
            view: "2d",
            size: {
                height: 800,
                width: 800
            }
        },
        setup: {
            camera: {
                position: [
                    0,
                    0,
                    0
                ],
                rotation: [
                    0.13633213577362982,
                    -0.37130944289829027,
                    -0.055216251568944684,
                    0.9167846049823424
                ],
                captureSize: {
                    height: 947,
                    width: 1496
                }
            },
            renderer: {
                advanced: false,
                advancedOptions: {
                    bloomIntensity: 2,
                    isBloomEnabled: false,
                    isDofEnabled: false,
                    dofFocusRange: 0.25,
                    isFxaaEnabled: false,
                    isShadowEnabled: true,
                    isSsaoEnabled: true
                },
                basicOptions: {
                    antialias: true
                }
            },
            transition: {
                type: "position",
                dimension: "x",
            },
            transitionDurations: {
                position: 702,
                stagger: 1998.0000000000002,
                view: 600
            }
        }
    },
    {
        insight: {
            columns: {
                x: "Survived",
                y: "Joined",
                color: "TicketCost",
                z: "TicketCost",
                sort: "Survived"
            },
            scheme: "redyellowgreen",
            chart: "barchartH",
            view: "2d",
            size: {
                height: 800,
                width: 800
            }
        },
        setup: {
            camera: undefined,
            renderer: {
                advanced: true,
                advancedOptions: {
                    bloomIntensity: 2,
                    isBloomEnabled: false,
                    isDofEnabled: false,
                    dofFocusRange: 0.25,
                    isFxaaEnabled: false,
                    isShadowEnabled: true,
                    isSsaoEnabled: true
                },
                basicOptions: {
                    antialias: true
                }
            },
            transition: {
                type: "position",
                dimension: "x",
            },
            transitionDurations: {
                position: 702,
                stagger: 1998.0000000000002,
                view: 600
            }
        }
    }
];