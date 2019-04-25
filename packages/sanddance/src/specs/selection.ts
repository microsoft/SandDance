// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { FieldNames, ScaleNames, SignalNames } from './constants';
import { NumericValueRef, ProductionRule } from 'vega-typings';

function testForCollapseSelection() {
  return `datum.${FieldNames.Collapsed}`;
}

export function zeroIfCollapsed(numericValueRef: NumericValueRef): ProductionRule<NumericValueRef> {
  const rules: ProductionRule<NumericValueRef> = [
    {
      "test": testForCollapseSelection(),
      "value": 0
    },
    numericValueRef
  ];
  return rules;
}

export function collapseY(numericValueRef: NumericValueRef): ProductionRule<NumericValueRef> {
  const rules: ProductionRule<NumericValueRef> = [
    {
      "scale": ScaleNames.Y,
      "test": testForCollapseSelection(),
      "signal": `${SignalNames.YDomain}[0]`
    },
    numericValueRef
  ];
  return rules;
}
