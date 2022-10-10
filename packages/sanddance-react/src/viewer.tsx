/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from './base';
import { compareInsight, deepCompare } from './util';
import { specs, types, VegaMorphCharts, Viewer as SandDanceViewer } from '@msrvida/sanddance';

export interface Props {
    viewerOptions?: Partial<types.ViewerOptions>;
    insight: specs.Insight;
    setup?: types.Setup;
    data: object[];
    renderOptions?: types.RenderOptions;
    onView?: (renderResult: types.RenderResult) => void;
    onError?: (error: any) => void;
    onMount?: (element: HTMLElement) => boolean | void;
}

export interface State {
}

function _Viewer(_props: Props) {

    class __Viewer extends base.react.Component<Props, State> {
        public viewer: SandDanceViewer;
        private viewerDiv: React.ReactInstance;
        private lastData: object[];

        private layout() {
            const { props } = this;
            this.lastData = props.data;
            this.viewer.render(
                {
                    insight: props.insight,
                    setup: props.setup,
                },
                props.data,
                props.renderOptions,
            ).then(renderResult => {
                //TODO: show errors if any
                //console.log('viewer render');
                props.onView && props.onView(renderResult);
            }).catch(e => {
                //console.log('viewer error');
                props.onError && props.onError(e);
            });
        }

        private view() {
            const { props } = this;
            let didLayout = false;
            if (props.insight && props.data) {
                const c = compareInsight(this.viewer, props.insight);
                const sameDataRef = props.data === this.lastData;
                if (!c.compare || !sameDataRef) {
                    this.layout();
                    didLayout = true;
                }
            }
            if (!didLayout && props.setup) {
                const { camera } = props.setup;
                //compare setup, move camera
                if (camera !== 'hold') {
                    if (!deepCompare(this.viewer.setup.camera, camera)) {
                        //camera is different
                        if (!camera) {
                            this.viewer?.presenter?.homeCamera();
                        } else {
                            this.viewer.setCamera(camera);
                        }
                        //save this for next comparison
                        const setup = VegaMorphCharts.util.clone(this.viewer.setup);
                        setup.camera = camera;
                        this.viewer.setup = setup;
                    }
                }
                if (props.setup.renderer) {
                    this.viewer?.presenter?.morphchartsref?.setMorphChartsRendererOptions(props.setup.renderer);
                }
            }
        }

        componentDidMount() {
            const { props } = this;
            const element = base.reactDOM.findDOMNode(this.viewerDiv) as HTMLElement;
            this.viewer = new SandDanceViewer(element, props.viewerOptions);
            if (props.onMount) {
                if (props.onMount(this.viewer.presenter.getElement(VegaMorphCharts.PresenterElement.gl))) {
                    this.view();
                }
            } else {
                this.view();
            }
        }

        componentDidUpdate() {
            const { props } = this;
            this.viewer.options = VegaMorphCharts.util.deepMerge(this.viewer.options, props.viewerOptions) as types.ViewerOptions;
            this.view();
        }

        componentWillUnmount() {
            this.viewer.finalize();
        }

        render() {
            return (
                <div className="sanddance-ReactViewer" ref={div => (this.viewerDiv = div)} />
            );
        }
    }

    return new __Viewer(_props);
}

export const Viewer: typeof Viewer_Class = _Viewer as any;

export declare class Viewer_Class extends base.react.Component<Props, State> {
    public viewer: SandDanceViewer;
}
