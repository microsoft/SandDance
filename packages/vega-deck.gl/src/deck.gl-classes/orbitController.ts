/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import OrbitController from '@deck.gl/core/controllers/orbit-controller';
import { base } from '../base';

export interface OrbitControllerClassOptions {
    doubleClickHandler?: (e: MouseEvent, orbitController: OrbitController_Class) => void;
}

export function createOrbitControllerClass(factoryOptions: OrbitControllerClassOptions): typeof OrbitController_Class {

    function wrapper(props: any) {

        class OrbitControllerInternal extends base.deck.OrbitController {
            public invertPan: boolean;
            public dragRotate: boolean;

            constructor(props: any) {
                super(props);
                this.invertPan = true;
            }

            handleEvent(event: MouseEvent) {
                if (event.type === 'doubletap') {
                    if (factoryOptions && factoryOptions.doubleClickHandler) {
                        return factoryOptions.doubleClickHandler(event, this);
                    }
                }
                return super.handleEvent(event);
            }
        }

        const instance = new OrbitControllerInternal(props) as OrbitController;

        return instance;
    }

    return wrapper as any;
}

export declare class OrbitController_Class extends base.deck.OrbitController { }
