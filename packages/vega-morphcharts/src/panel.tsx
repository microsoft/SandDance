/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { createElement, mount } from 'tsx-create-element';
import { minHeight, minWidth } from './defaults';
import { PresenterElement } from './enums';
import { PresenterStyle } from './interfaces';

export interface IPresenter {
    el: HTMLElement;
    style: PresenterStyle;
}

export function initializePanel(presenter: IPresenter) {
    const rootDiv = (
        <div className={className(PresenterElement.root, presenter)}>
            <div className={className(PresenterElement.gl, presenter)} style={{ minHeight, minWidth }}></div>
            <div className={className(PresenterElement.panel, presenter)}>
                <div className={className(PresenterElement.vegaControls, presenter)}></div>
                <div className={className(PresenterElement.legend, presenter)}></div>
            </div>
        </div>
    );
    mount(rootDiv, presenter.el);
}

export function className(type: PresenterElement, presenter: IPresenter) {
    return `${presenter.style.cssPrefix}${PresenterElement[type]}`;
}
