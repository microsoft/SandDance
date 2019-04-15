// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ViewType } from '../src/enums';
import { ViewGlConfig } from '../src/exports/types';
import { PresenterConfig } from '../src/exports/types';
import { Presenter } from '../src/presenter';
import {
    Loader,
    Renderers,
    Runtime,
    View
} from 'vega-typings';

export { Presenter }

/**
 * Subclass of Vega.View, with added properties for accessing a Presenter.
 */
export class ViewGl extends View {
    public presenter: Presenter;

    constructor(runtime: Runtime, config?: ViewGlConfig) {
        super(runtime, config);
    }

    renderer(renderer: Renderers | 'deck.gl'): this {
        return this;
    };
}
