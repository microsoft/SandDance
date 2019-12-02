// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import _OrbitController from '@deck.gl/core/controllers/orbit-controller';
import { base } from '../base';

export interface OrbitControllerClassOptions {
    doubleClickHandler?: (e: MouseEvent, orbitController: OrbitController_Class) => void;
}

export function createOrbitControllerClass(factoryOptions: OrbitControllerClassOptions): typeof OrbitController_Class {
    
    function wrapper(props: any) {

        class OrbitControllerInternal extends base.deck._OrbitController {
            public invertPan: boolean;
            public dragRotate: boolean;

            constructor(props: any) {
                super(props);
                this.invertPan = true;
            }

            _onDoubleTap(event: MouseEvent) {
                if (factoryOptions && factoryOptions.doubleClickHandler) {
                    factoryOptions.doubleClickHandler(event, this);
                } else {
                    super._onDoubleTap(event);
                }
            }

            _onPanRotate(event: MouseEvent) {
                if (!this.dragRotate) {
                    return false;
                }
                return this._onPanRotateStandard(event);
            }
        }

        const instance = new OrbitControllerInternal(props) as _OrbitController;

        return instance;
    }
    
    return wrapper as any;
}

export declare class OrbitController_Class extends base.deck._OrbitController { }
