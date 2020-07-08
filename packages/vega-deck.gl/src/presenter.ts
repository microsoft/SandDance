// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from './base';
import { deepMerge } from './clone';
import { colorToString } from './color';
import { CubeLayer_Class, CubeLayerInterpolatedProps } from './cube-layer/cube-layer';
import {
    createDeckGLClassesForPresenter,
    DeckGL_Class,
    DeckGLInternalProps,
    InteractiveState
} from './deck.gl-classes/deckgl';
import { LinearInterpolator, LinearInterpolator_Class } from './deck.gl-classes/linearInterpolator';
import { OrbitController_Class } from './deck.gl-classes/orbitController';
import { createStage, defaultPresenterConfig, defaultPresenterStyle } from './defaults';
import { lightingEffects } from './effects';
import { PresenterElement } from './enums';
import {
    Cube,
    PresenterConfig,
    PresenterStyle,
    QueuedAnimationOptions,
    Scene3d,
    Stage
} from './interfaces';
import { getCubeLayer, getCubes, getLayers } from './layers';
import { LegendView } from './legend';
import { MarkStagerOptions } from './marks/interfaces';
import { box } from './marks/rule';
import { className, initializePanel } from './panel';
import { patchCubeArray } from './patchedCubeArray';
import { sceneToStage } from './stagers';
import { targetViewState, viewStateProps } from './viewState';
import { DeckProps } from '@deck.gl/core/lib/deck';
import { View } from '@msrvida/chart-types';
import { easeExpInOut } from 'd3-ease';
import { getActiveElementInfo, mount, setActiveElement } from 'tsx-create-element';

interface IBounds {
    view: View;
    height: number;
    width: number;
    cubeCount: number;
}

/**
 * Class which presents a Stage of chart data using Deck.gl to render.
 */
export class Presenter {
    private OrbitControllerClass: typeof OrbitController_Class;

    /**
     * Handle of the timer for animation.
     */
    public animationTimer: number;

    /**
     * Deck.gl instance for rendering WebGL.
     */
    public deckgl: DeckGL_Class;

    /**
     * Logger, such as console.log
     */
    public logger: (message?: any, ...optionalParams: any[]) => void;

    /**
     * Get the previously rendered Stage object.
     */
    get stage(): Stage {
        return this._last.stage;
    }

    /**
     * Options for styling the output.
     */
    public style: PresenterStyle;

    /**
     * Get the current View camera type.
     */
    get view(): View {
        return this._last.view;
    }

    private queuedAnimationOptions: QueuedAnimationOptions;
    private _last: IBounds & { stage: Stage };
    private _showGuides: boolean;
    private _afterRenderHandler: () => void;

    /**
     * Instantiate a new Presenter.
     * @param el Parent HTMLElement to present within.
     * @param style Optional PresenterStyle styling options.
     */
    constructor(public el: HTMLElement, style?: PresenterStyle) {
        this.style = deepMerge<PresenterStyle>(defaultPresenterStyle, style);
        initializePanel(this);
        this._last = { view: null, height: null, width: null, cubeCount: null, stage: null };
    }

    /**
     * Cancels any pending animation, calling animationCanceled() on original queue.
     */
    animationCancel() {
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.animationTimer = null;
            if (this.logger) {
                this.logger(`canceling animation ${(this.queuedAnimationOptions && this.queuedAnimationOptions.handlerLabel) || 'handler'}`);
            }
            if (this.queuedAnimationOptions && this.queuedAnimationOptions.animationCanceled) {
                this.queuedAnimationOptions.animationCanceled.call(null);
            }
        }
    }

    /**
     * Stops the current animation and queues a new animation.
     * @param handler Function to invoke when timeout is complete.
     * @param timeout Length of time to wait before invoking the handler.
     * @param options Optional QueuedAnimationOptions object.
     */
    animationQueue(handler: () => void, timeout: number, options?: QueuedAnimationOptions) {
        if (this.logger) {
            this.logger(`queueing animation ${(options && options.waitingLabel) || 'waiting'}...`);
        }
        this.animationCancel();
        this.animationTimer = setTimeout(() => {
            if (this.logger) {
                this.logger(`queueing animation ${(options && options.handlerLabel) || 'handler'}...`);
            }
            handler();
        }, timeout) as any as number;
    }

    /**
     * Retrieve a sub-element of the rendered output.
     * @param type PresenterElement type of the HTMLElement to retrieve.
     */
    getElement(type: PresenterElement): HTMLElement {
        const elements = this.el.getElementsByClassName(className(type, this));
        if (elements && elements.length) {
            return elements[0] as HTMLElement;
        }
    }

    /**
     * Present the Vega Scene, or Stage object using Deck.gl.
     * @param sceneOrStage Vega Scene object, or Stage object containing chart layout info.
     * @param height Height of the rendering area.
     * @param width Width of the rendering area. 
     * @param config Optional presentation configuration object.
     */
    present(sceneOrStage: Scene3d | Stage, height: number, width: number, config?: PresenterConfig) {
        this.animationCancel();
        let scene = sceneOrStage as Scene3d;
        let stage: Stage;
        let options: MarkStagerOptions = {
            maxOrdinal: 0,
            currAxis: null,
            defaultCubeColor: this.style.defaultCubeColor,
            assignCubeOrdinal: (config && config.onSceneRectAssignCubeOrdinal) || (() => options.maxOrdinal++)
        };
        //determine if this is a vega scene
        if (scene.marktype) {
            stage = createStage(scene.view);
            sceneToStage(options, stage, scene);
        } else {
            stage = sceneOrStage as Stage;
        }
        if (!this.deckgl) {
            const classes = createDeckGLClassesForPresenter({
                doubleClickHandler: () => {
                    this.homeCamera();
                }
            });
            this.OrbitControllerClass = classes.OrbitControllerClass;

            const initialViewState = targetViewState(height, width, stage.view);

            let glOptions: WebGLContextAttributes;
            if (config && config.preserveDrawingBuffer) {
                glOptions = { preserveDrawingBuffer: true }
            }

            const deckProps: DeckGLInternalProps = {
                glOptions,
                height: null,
                width: null,
                effects: lightingEffects(),
                layers: [],
                onClick: config && config.onLayerClick,
                views: [new base.deck.OrbitView({ controller: base.deck.OrbitController })],
                initialViewState,
                container: this.getElement(PresenterElement.gl) as HTMLCanvasElement,
                getCursor: (interactiveState: InteractiveState) => {
                    if (interactiveState.onText || interactiveState.onAxisSelection) {
                        return 'pointer';
                    } else if (interactiveState.onCube) {
                        return 'default';
                    } else {
                        return 'grab';
                    }
                }
            };
            if (stage.backgroundColor) {
                deckProps.style = { 'background-color': colorToString(stage.backgroundColor) };
            }
            this.deckgl = new classes.DeckGL_Class(deckProps);
        }
        let cubeCount = Math.max(this._last.cubeCount, stage.cubeData.length);
        if (options.maxOrdinal) {
            cubeCount = Math.max(cubeCount, options.maxOrdinal);
            const empty: Partial<Cube> = {
                isEmpty: true,
                color: [0, 0, 0, 0] // possibly a bug in Deck.gl? set color to invisible.
            };
            stage.cubeData = patchCubeArray(cubeCount, empty, stage.cubeData as Cube[]);
        }
        this.setDeckProps(stage, height, width, cubeCount, config);

        const a = getActiveElementInfo();
        mount(LegendView({ legend: stage.legend, onClick: config && config.onLegendClick }), this.getElement(PresenterElement.legend));
        setActiveElement(a);

        if (config && config.onPresent) {
            config.onPresent();
        }
    }

    /**
     * Present the same recently rendered Stage with only slight modifications such as a color change,
     * using the previous Stage values as a basis.
     * @param stage Partially populated Stage object containing changes.
     * @param modifyConfig Optional presentation configuration object.
     */
    rePresent(stage: Partial<Stage>, modifyConfig?: PresenterConfig) {
        const newStage = { ...this._last.stage, ...stage };
        this.setDeckProps(newStage, this._last.height, this._last.width, this._last.cubeCount, modifyConfig);
    }

    private isNewBounds(view: View, height: number, width: number, cubeCount: number) {
        const lastBounds: IBounds = this.lastBounds();
        for (let prop in lastBounds) {
            if (lastBounds[prop] === null) return true;
        }
        const newBounds: IBounds = { cubeCount, height, view, width };
        for (let prop in lastBounds) {
            if (lastBounds[prop] !== newBounds[prop]) return true;
        }
    }

    private lastBounds(): IBounds {
        const { cubeCount, height, view, width } = this._last;
        return { cubeCount, height, view, width };
    }

    private setDeckProps(stage: Stage, height: number, width: number, cubeCount: number, modifyConfig: PresenterConfig) {
        const config = deepMerge<PresenterConfig>(defaultPresenterConfig, modifyConfig);
        const newBounds = this.isNewBounds(stage.view, height, width, cubeCount);
        //let lightSettings = this.style.lightSettings[stage.view];
        let lightingMix = stage.view === '3d' ? 1.0 : 0.0;
        let linearInterpolator: LinearInterpolator_Class<CubeLayerInterpolatedProps>;
        //choose the current OrbitView viewstate if possible
        let viewState = (this.deckgl.viewState && Object.keys(this.deckgl.viewState).length && this.deckgl.viewState.OrbitView)
            //otherwise use the initial viewstate if any
            || this.deckgl.props.viewState;

        if (!viewState || newBounds || config.shouldViewstateTransition && config.shouldViewstateTransition()) {
            let newViewStateTarget = true;
            if (config && config.onTargetViewState) {
                const result = config.onTargetViewState(height, width);
                height = result.height;
                width = result.width;
                if (result.newViewStateTarget !== undefined) {
                    newViewStateTarget = result.newViewStateTarget;
                }
            }
            if (!viewState || newViewStateTarget) {
                viewState = targetViewState(height, width, stage.view);
            }
            const oldCubeLayer = getCubeLayer(this.deckgl.props) as CubeLayer_Class;
            if (oldCubeLayer) {
                linearInterpolator = new LinearInterpolator(viewStateProps);
                linearInterpolator.layerStartProps = { lightingMix: oldCubeLayer.props.lightingMix };
                linearInterpolator.layerEndProps = { lightingMix };
                viewState.transitionDuration = config.transitionDurations.view;
                viewState.transitionEasing = easeExpInOut;
                viewState.transitionInterpolator = linearInterpolator;
            }
            if (stage.view === '2d') {
                //lightSettings = this.style.lightSettings['3d'];
            }
        }
        const guideLines = this._showGuides && box(0, 0, height, width, '#0f0', 1, true);
        config.preLayer && config.preLayer(stage);
        const layers = getLayers(this, config, stage, /*lightSettings*/null, lightingMix, linearInterpolator, guideLines);
        const deckProps: Partial<DeckProps> = {
            effects: lightingEffects(),
            views: [new base.deck.OrbitView({ controller: base.deck.OrbitController })],
            initialViewState: viewState,
            layers
        };
        if (config && config.preStage) {
            config.preStage(stage, deckProps);
        }
        requestAnimationFrame(() => this.deckgl.setProps({
            ...deckProps,
            onAfterRender: () => {
                if (this._afterRenderHandler) {
                    this._afterRenderHandler();
                }
            }
        }));
        delete stage.cubeData;
        this._last = {
            cubeCount,
            height,
            width,
            stage: stage,
            view: stage.view
        };
    }

    public canvasToDataURL() {
        return new Promise<string>((resolve, reject) => {
            this._afterRenderHandler = () => {
                this._afterRenderHandler = null;
                const png = this.deckgl.canvas.toDataURL('image/png');
                resolve(png);
            };
        });
    }

    /**
     * Home the camera to the last initial position.
     */
    homeCamera() {
        const viewState = targetViewState(this._last.height, this._last.width, this._last.view) as any;
        viewState.transitionDuration = defaultPresenterConfig.transitionDurations.view;
        viewState.transitionEasing = easeExpInOut;
        viewState.transitionInterpolator = new LinearInterpolator(viewStateProps);
        const deckProps: Partial<DeckProps> = {
            effects: lightingEffects(),
            views: this.deckgl.props.views,
            initialViewState: viewState,
            layers: this.deckgl.props.layers
        };
        this.deckgl.setProps(deckProps);
    }

    /**
     * Get cube data array from the cubes layer. 
     */
    getCubeData() {
        return getCubes(this.deckgl.props);
    }

    /**
     * Show guidelines of rendering height/width and center of OrbitView.
     */
    showGuides() {
        this._showGuides = true;
        this.getElement(PresenterElement.gl).classList.add('show-center');
        this.rePresent({ ...this._last.stage, cubeData: this.getCubeData() });
    }

    finalize() {
        this.animationCancel();
        if (this.deckgl) this.deckgl.finalize();
        if (this.el) this.el.innerHTML = '';
        this._last = null;
        this.deckgl = null;
        this.el = null;
        this.logger = null;
        this.queuedAnimationOptions = null;
    }
}
