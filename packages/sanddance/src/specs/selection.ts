// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { CollapsedFieldName, MainYScale, YDomainSignal } from './constants';
import { NumericValueRef, ProductionRule } from 'vega-typings';

function testForCollapseSelection() {
  return `datum.${CollapsedFieldName}`;
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
      "scale": MainYScale,
      "test": testForCollapseSelection(),
      "signal": `${YDomainSignal}[0]`
    },
    numericValueRef
  ];
  return rules;
}
