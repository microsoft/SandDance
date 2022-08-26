/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { deepMerge } from './clone';
import { createStage, defaultOnAxisItem, defaultPresenterConfig, defaultPresenterStyle } from './defaults';
import { PresenterElement } from './enums';
import {
    Cube,
    PresenterConfig,
    PresenterStyle,
    QueuedAnimationOptions,
    Scene3d,
    Stage,
    MorphChartsRenderResult,
    MorphChartsColors,
    MorphChartsOptions,
    MorphChartsRef,
} from './interfaces';
import { LegendView } from './legend';
import { MarkStagerOptions } from './marks/interfaces';
import { className, initializePanel } from './panel';
import { patchCubeArray } from './patchedCubeArray';
import { sceneToStage } from './stagers';
import { View } from '@msrvida/chart-types';
import { getActiveElementInfo, mount, setActiveElement } from 'tsx-create-element';
import { colorConfig, init, morphChartsRender } from './morphcharts';

interface IBounds {
    view: View;
    height: number;
    width: number;
    cubeCount: number;
}

/**
 * Class which presents a Stage of chart data using MorphCharts to render.
 */
export class Presenter {

    /**
     * Handle of the timer for animation.
     */
    public animationTimer: number;

    /**
     * MorphCharts instance for rendering WebGL.
     */
    public morphchartsref: MorphChartsRef;

    /**
     * Handle to recent MorphCharts rendering result.
     */
    public morphChartsRenderResult: MorphChartsRenderResult;

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

    private _morphChartsOptions: MorphChartsOptions;

    private _last: IBounds & { stage: Stage };

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
            this.logger(`queueing animation ${(options && options.waitingLabel) || 'waiting'}...(${timeout})`);
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
     * Present the Vega Scene, or Stage object using Morphcharts.
     * @param sceneOrStage Vega Scene object, or Stage object containing chart layout info.
     * @param height Height of the rendering area.
     * @param width Width of the rendering area. 
     * @param config Optional presentation configuration object.
     */
    present(sceneOrStage: Scene3d | Stage, height: number, width: number, config?: PresenterConfig) {
        this.animationCancel();
        const scene = sceneOrStage as Scene3d;
        let stage: Stage;
        const options: MarkStagerOptions = {
            maxOrdinal: 0,
            currAxis: null,
            defaultCubeColor: this.style.defaultCubeColor,
            assignCubeOrdinal: (config && config.onSceneRectAssignCubeOrdinal) || (() => options.maxOrdinal++),
            modifyAxis: config?.onAxisItem ? config.onAxisItem : defaultOnAxisItem,
            zAxisZindex: config?.zAxisZindex,
        };
        //determine if this is a vega scene
        if (scene.marktype) {
            stage = createStage(scene.view);
            sceneToStage(options, stage, scene);
        } else {
            stage = sceneOrStage as Stage;
        }
        const c = deepMerge(defaultPresenterConfig, config);
        if (!this.morphchartsref) {
            this._morphChartsOptions = {
                container: this.getElement(PresenterElement.gl),
                pickGridCallback: c.axisPickGridCallback,
                onCubeHover: (e, ordinal) => {
                    c.onCubeHover(e, { ordinal, color: null, position: null, size: null });
                },
                onCubeClick: (e, ordinal) => {
                    c.onCubeClick(e, { ordinal, color: null, position: null, size: null });
                },
                onCanvasClick: config?.onLayerClick,
                onLasso: config?.onLasso,
            };
            this.morphchartsref = init(this._morphChartsOptions, c.renderer || defaultPresenterConfig.renderer);
        }
        let cubeCount = Math.max(this._last.cubeCount, stage.cubeData.length);
        if (options.maxOrdinal) {
            cubeCount = Math.max(cubeCount, options.maxOrdinal);
            const empty: Partial<Cube> = {
                isEmpty: true,
            };
            stage.cubeData = patchCubeArray(cubeCount, empty, stage.cubeData as Cube[]);
        }

        config.preLayer && config.preLayer(stage);

        this.morphChartsRenderResult = morphChartsRender(this.morphchartsref, this._last.stage, stage, height, width, config && config.preStage, config && config.morphChartsColors, c);

        delete stage.cubeData;
        delete stage.redraw;

        this._last = {
            cubeCount,
            height,
            width,
            stage,
            view: stage.view,
        };

        const a = getActiveElementInfo();
        mount(LegendView({ legend: stage.legend, onClick: config && config.onLegendClick }), this.getElement(PresenterElement.legend));
        setActiveElement(a);

        if (config && config.onPresent) {
            config.onPresent();
        }
    }

    public canvasToDataURL() {
        return new Promise<string>((resolve, reject) => {
            this.morphchartsref.core.afterRenderCallback = () => {
                this.morphchartsref.core.afterRenderCallback = null;
                const canvas = this.getElement(PresenterElement.gl).getElementsByTagName('canvas')[0];
                const png = canvas.toDataURL('image/png');
                resolve(png);
            };
        });
    }

    public configColors(mcColors: MorphChartsColors) {
        colorConfig(this.morphchartsref, mcColors);
    }

    /**
     * Home the camera to the last initial position.
     */
    homeCamera() {
        this.morphchartsref?.reset();
    }

    /**
     * Show guidelines of rendering height/width and center of OrbitView.
     */
    showGuides() {
        this.getElement(PresenterElement.gl).classList.add('show-center');
        //TODO Morphcharts gridlines
    }

    finalize() {
        this.animationCancel();
        if (this.morphchartsref) this.morphchartsref.core.stop();
        if (this.el) this.el.innerHTML = '';
        this._last = null;
        this.morphchartsref = null;
        this.el = null;
        this.logger = null;
        this.queuedAnimationOptions = null;
    }
}
