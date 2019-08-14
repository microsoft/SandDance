// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { className } from './vega-deck.gl/panel';
import { createElement, mount } from 'tsx-create-element';
import { Language } from './types';
import { Presenter, PresenterElement } from './vega-deck.gl';

interface Props {
    presenter: Presenter;
    language: Language;
    dataItem: object;
    position?: { clientX: number; clientY: number };
}

export class Tooltip {
    public element: HTMLElement;

    constructor(props: Props) {
        this.element = renderTooltip(props) as any as HTMLElement;
        document.body.appendChild(this.element);
        //measure and move is necessary
        this.element.style.left = `${props.position.clientX}px`;
        this.element.style.top = `${props.position.clientY}px`;
    }

    clear() {
        if (this.element) {
            document.body.removeChild(this.element);
        }
        this.element = null;
    }
}

const renderTooltip = (props: Props) => {
    return (
        <div className={className(PresenterElement.tooltip, props.presenter)}>
            tooltip
        </div>
    );
}
