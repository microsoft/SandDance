import { initializeIcons as i } from './fabric-icons';

import { IIconOptions } from '@uifabric/styling';

let registerIcons: (iconSubset: any, options?: Partial<IIconOptions>) => void;

export function initializeIcons(
  options?: IIconOptions
): void {
  [i].forEach(
    (initialize: (options?: IIconOptions) => void) => {
      const subset = initialize(options);
      registerIcons(subset, options);
    });
}

export function use(
  _registerIcons: (iconSubset: any, options?: Partial<IIconOptions>) => void
): void {
  registerIcons = _registerIcons;
}