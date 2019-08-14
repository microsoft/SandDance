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
    private element: HTMLElement;
    private child: HTMLElement;

    constructor(props: Props) {
        this.element = renderTooltip(props) as any as HTMLElement;
        this.child = this.element.children[0] as HTMLElement;
        document.body.appendChild(this.element);
        //measure and move is necessary
        const m = this.measure();
        if (props.position.clientX + m.width >= document.body.offsetWidth) {
            this.child.style.right = '0px';
        }
        if (props.position.clientY + m.height >= document.body.offsetHeight) {
            this.child.style.bottom = '0px';
        }
        this.element.style.left = `${props.position.clientX}px`;
        this.element.style.top = `${props.position.clientY}px`;
    }

    private measure() {
        const cs = getComputedStyle(this.child);
        const height = parseFloat(cs.marginTop) + parseFloat(cs.borderTopWidth) + parseFloat(cs.height) + parseFloat(cs.borderBottomWidth) + parseFloat(cs.marginBottom);
        const width = parseFloat(cs.marginLeft) + parseFloat(cs.borderLeftWidth) + parseFloat(cs.width) + parseFloat(cs.borderRightWidth) + parseFloat(cs.marginRight);
        return { height, width };
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
            <div className="data-item">
                tooltip
            </div>
        </div>
    );
}
