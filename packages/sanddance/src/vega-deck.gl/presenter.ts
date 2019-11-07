// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from './base';
import { box } from './marks/rule';
import { className, initializePanel } from './panel';
import { colorToString } from './color';
import { createDeckGLClassesForPresenter, DeckGL_Class, DeckGLInternalProps, InteractiveState } from './deck.gl-classes/deckgl';
import { createStage, defaultPresenterConfig, defaultPresenterStyle } from './defaults';
import {
    Shape,
    PresenterConfig,
    PresenterStyle,
    QueuedAnimationOptions,
    Scene3d,
    Stage,
    View
} from './interfaces';
import { ShapeLayer_Class } from './shape-layer/shape-layer';
import { DeckProps } from '@deck.gl/core/lib/deck';
import { deepMerge } from './clone';
import { easeExpInOut } from 'd3-ease';
import { getShapeLayer, getShapes, getLayers } from './layers';
import { LegendView } from './legend';
import { LinearInterpolator, LinearInterpolator_Class } from './deck.gl-classes/linearInterpolator';
import { MarkStagerOptions } from './marks/interfaces';
import { mount } from 'tsx-create-element';
import { OrbitController_Class } from './deck.gl-classes/orbitController';
import { patchShapeArray } from './patchedCubeArray';
import { PresenterElement } from './enums';
import { sceneToStage } from './stagers';
import { targetViewState, viewStateProps } from './viewState';

interface IBounds {
    view: View;
    height: number;
    width: number;
    shapeCount: number;
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

    /**
     * Instantiate a new Presenter.
     * @param el Parent HTMLElement to present within.
     * @param style Optional PresenterStyle styling options.
     */
    constructor(public el: HTMLElement, style?: PresenterStyle) {
        this.style = deepMerge<PresenterStyle>(defaultPresenterStyle, style);
        initializePanel(this);
        this._last = { view: null, height: null, width: null, shapeCount: null, stage: null };
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
            offsetX: 0,
            offsetY: 0,
            maxOrdinal: -1,
            ordinalsSpecified: false,
            currAxis: null,
            currFacetRect: null,
            defaultShapeColor: this.style.defaultShapeColor
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

            const deckProps: Partial<DeckGLInternalProps> = {
                onClick: config && config.onLayerClick,
                views: [new base.deck.OrbitView({ controller: this.OrbitControllerClass })],
                container: this.getElement(PresenterElement.gl) as HTMLCanvasElement,
                getCursor: (interactiveState: InteractiveState) => {
                    if (interactiveState.onText || interactiveState.onAxisSelection) {
                        return 'pointer';
                    } else if (interactiveState.onShape) {
                        return 'default';
                    } else {
                        return 'grab';
                    }
                }
            };
            if (stage.backgroundColor) {
                deckProps.style = { 'background-color': colorToString(stage.backgroundColor) };
            }
            this.deckgl = new classes.DeckGL_Class(deckProps as DeckGLInternalProps);
        }
        let shapeCount = Math.max(this._last.shapeCount, stage.shapeData.length);
        if (options.ordinalsSpecified) {
            shapeCount = Math.max(shapeCount, options.maxOrdinal + 1);
            const empty: Partial<Shape> = {
                isEmpty: true,
                color: [0, 0, 0, 0] // possibly a bug in Deck.gl? set color to invisible.
            };
            stage.shapeData = patchShapeArray(shapeCount, empty, stage.shapeData as Shape[]);
        }
        this.setDeckProps(stage, height, width, shapeCount, config);
        mount(LegendView({ legend: stage.legend, onClick: config && config.onLegendClick }), this.getElement(PresenterElement.legend));
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
        this.setDeckProps(newStage, this._last.height, this._last.width, this._last.shapeCount, modifyConfig);
    }

    private isNewBounds(view: View, height: number, width: number, shapeCount: number) {
        const lastBounds: IBounds = this.lastBounds();
        for (let prop in lastBounds) {
            if (lastBounds[prop] === null) return true;
        }
        const newBounds: IBounds = { shapeCount, height, view, width };
        for (let prop in lastBounds) {
            if (lastBounds[prop] !== newBounds[prop]) return true;
        }
    }

    private lastBounds(): IBounds {
        const { shapeCount, height, view, width } = this._last;
        return { shapeCount, height, view, width };
    }

    private setDeckProps(stage: Stage, height: number, width: number, shapeCount: number, modifyConfig: PresenterConfig) {
        const config = deepMerge<PresenterConfig>(defaultPresenterConfig, modifyConfig);
        const newBounds = this.isNewBounds(stage.view, height, width, shapeCount);

        //choose the current OrbitView viewstate if possible
        let viewState = (this.deckgl.viewState && Object.keys(this.deckgl.viewState).length && this.deckgl.viewState.OrbitView)
            //otherwise use the initial viewstate if any
            || this.deckgl.props.viewState;

        if (!viewState || newBounds || config.shouldViewstateTransition && config.shouldViewstateTransition()) {
            viewState = targetViewState(height, width, stage.view);
            const oldShapeLayer = getShapeLayer(this.deckgl.props) as ShapeLayer_Class;
            if (oldShapeLayer) {

                //TODO use flyTo from deck.gl v7
                viewState.transitionDuration = config.transitionDurations.view;
                viewState.transitionEasing = easeExpInOut;
                //                viewState.transitionInterpolator = linearInterpolator;
            }
            if (stage.view === '2d') {

                //TODO change lighting when changing view
                //lightSettings = this.style.lightSettings['3d'];
            }
        }
        const guideLines = this._showGuides && box(0, 0, height, width, '#0f0', 1, true);
        config.preLayer && config.preLayer(stage);
        const layers = getLayers(this, config, stage, guideLines);
        const deckProps: Partial<DeckProps> = {
            views: [new base.deck.OrbitView({ controller: this.OrbitControllerClass })],
            viewState,
            layers
        };
        if (config && config.preStage) {
            config.preStage(stage, deckProps as DeckProps);
        }
        this.deckgl.setProps(deckProps);
        delete stage.shapeData;
        this._last = {
            shapeCount: shapeCount,
            height,
            width,
            stage: stage,
            view: stage.view
        };
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
            views: this.deckgl.props.views,
            viewState,
            layers: this.deckgl.props.layers
        };
        this.deckgl.setProps(deckProps);
    }

    /**
     * Get shape data array from the shapes layer. 
     */
    getShapeData() {
        return getShapes(this.deckgl.props);
    }

    /**
     * Show guidelines of rendering height/width and center of OrbitView.
     */
    showGuides() {
        this._showGuides = true;
        this.getElement(PresenterElement.gl).classList.add('show-center');
        this.rePresent({ ...this._last.stage, shapeData: this.getShapeData() });
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
