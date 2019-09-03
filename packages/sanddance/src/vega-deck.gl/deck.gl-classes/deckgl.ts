// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import Deck, { DeckProps } from '@deck.gl/core/lib/deck';
import { base } from '../base';
import { createOrbitControllerClass, OrbitController_Class, OrbitControllerClassOptions } from './orbitController';

//adapted from https://github.com/uber/deck.gl/blob/5.3-release/modules/lite/src/deckgl.js

const CANVAS_STYLE = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
};

//TODO move into deckgl-typings
export interface InteractiveState {
    isDragging: boolean;
    onCube: boolean;
    onText: boolean;
    onAxisSelection: boolean;
}

export type DeckGLInternalProps = DeckProps & {
    container?: HTMLElement;
    getCursor?: (interactiveState: InteractiveState) => string;
}

// Create canvas elements for map and deck
function createCanvas(props: DeckGLInternalProps) {
    let { container = document.body } = props;

    if (typeof container === 'string') {
        container = document.getElementById(container);
    }

    if (!container) {
        throw Error('Deck: container not found');
    }

    // Add DOM elements
    const containerStyle = window.getComputedStyle(container);
    if (containerStyle.position === 'static') {
        container.style.position = 'relative';
    }

    const deckCanvas = document.createElement('canvas');
    container.appendChild(deckCanvas);
    Object.assign(deckCanvas.style, CANVAS_STYLE);

    return { container, deckCanvas };
}

export interface DeckGLClassesForPresenter {
    OrbitControllerClass: typeof OrbitController_Class;
    DeckGL_Class: typeof DeckGL_Class;
}

/**
 * Creates Deck.gl classes for rendering WebGL.
 * DEck.gl is instantiatable by calling `new createDeckGLClassesForPresenter(controlleroptions)(deckProps)`.
 */
export function createDeckGLClassesForPresenter(factoryOptions: OrbitControllerClassOptions): DeckGLClassesForPresenter {
    const OrbitControllerClass = createOrbitControllerClass(factoryOptions);

    //dynamic superclass lets us create a subclass at execution phase instead of declaration phase.
    //This allows us to retrieve Deck from either UMD or ES6 consumers of this class.

    function wrapper(props: DeckProps) {

        /**
         * @params container (Element) - DOM element to add deck.gl canvas to
         * @params controller (Object) - Controller class. Leave empty for auto detection
         */
        class DeckGLInternal extends base.deck.Deck {
            private _updateViewState;
            private onViewStateChange;
            public interactiveState: InteractiveState;

            constructor(props: DeckGLInternalProps = {}) {
                if (typeof document === 'undefined') {
                    // Not browser
                    throw Error('Deck can only be used in the browser');
                }

                const { deckCanvas } = createCanvas(props);

                const viewState = props.initialViewState || props.viewState || {};

                super(
                    Object.assign({}, props, {
                        width: '100%',
                        height: '100%',
                        canvas: deckCanvas,
                        controller: OrbitControllerClass,
                        initialViewState: viewState
                    })
                );

                // Callback for the controller
                this._updateViewState = params => {
                    if (this.onViewStateChange) {
                        this.onViewStateChange(params);
                    }
                };
            }

            setProps(props) {
                // this._updateViewState must be bound to `this`
                // but we don't have access to the current instance before calling super().
                if ('onViewStateChange' in props && this._updateViewState) {
                    // This is called at least once at _onRendererInitialized
                    this.onViewStateChange = props.onViewStateChange;
                    props.onViewStateChange = this._updateViewState;
                }

                super.setProps(props);
            }
        }

        const instance = new DeckGLInternal(props) as Deck;

        return instance;
    }

    return {
        OrbitControllerClass,
        DeckGL_Class: wrapper as any
    };
}

/**
 * Deck.gl instance for rendering WebGL.
 * This is not instantiatable, it is the TypeScript declaration of the type.
 */
export declare class DeckGL_Class extends base.deck.Deck {
    public interactiveState: InteractiveState;
 }
