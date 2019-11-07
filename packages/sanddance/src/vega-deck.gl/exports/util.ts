// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

/**
 * This file is for external facing export only, do not use this for internal references, 
 * as it may cause circular dependencies in Rollup.
 */

import { addDiv, addEl, outerSize } from '../htmlHelpers';
import { clone, deepMerge } from '../clone';
import { colorFromString, colorIsEqual, colorToString, isColor } from '../color';
import { getShapeLayer, getShapes } from '../layers';

//alphabetize for documentation
export { addDiv, addEl, clone, colorFromString, colorIsEqual, colorToString, deepMerge, isColor, getShapeLayer, getShapes, outerSize };
