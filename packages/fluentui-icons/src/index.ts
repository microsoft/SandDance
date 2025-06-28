import { initializeIcons as i } from './fabric-icons';

import { IIconOptions } from '@uifabric/styling';

let registerIcons: (iconSubset: any, options?: Partial<IIconOptions>) => void;
let unregisterIcons: (iconNames: string[]) => void;

export function initializeIcons(): void {
    [i].forEach(
        (initialize) => {
            const subset = initialize();
            unregisterIcons && unregisterIcons(Object.keys(subset.icons));
            registerIcons(subset, {
                disableWarnings: true,
            });
        });
}

export function use(
    _registerIcons: (iconSubset: any, options?: Partial<IIconOptions>) => void,
    _unregisterIcons?: (iconNames: string[]) => void,
): void {
    registerIcons = _registerIcons;
    unregisterIcons = _unregisterIcons;
}
