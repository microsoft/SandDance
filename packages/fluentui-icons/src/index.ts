import { initializeIcons as i } from './fabric-icons';

import { IIconOptions } from '@uifabric/styling';

export function initializeIcons(
  options?: IIconOptions
): void {
  [i].forEach(
    (initialize: (options?: IIconOptions) => void) => initialize(options)
  );
}
