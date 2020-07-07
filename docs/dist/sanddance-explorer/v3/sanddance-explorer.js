// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Uyrp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = Dropdown;
exports.dropdownWidth = void 0;

var _base = require("../base");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var dropdownWidth = 200;
exports.dropdownWidth = dropdownWidth;

function Dropdown(props) {
  var newProps = Object.assign({}, props);
  var selectedKey = null;

  if (newProps.options && newProps.options.length > 1) {
    var selectedOptions = newProps.options.filter(function (option) {
      return option.selected;
    });

    if (selectedOptions && selectedOptions.length > 0) {
      selectedKey = selectedOptions[0].key;
    }
  }

  if (newProps.collapseLabel) {
    newProps.onRenderTitle = function (a, b) {
      return _base.base.react.createElement("span", null, newProps.label, ": ", a[0].text);
    };
  }

  return _base.base.react.createElement(_base.base.fluentUI.Dropdown, Object.assign({
    dropdownWidth: dropdownWidth
  }, newProps, {
    label: newProps.collapseLabel ? null : newProps.label,
    selectedKey: selectedKey
  }));
}
},{"../base":"Vlbn"}],"kNZP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorScaleNone = exports.Other = exports.SignalNames = exports.ScaleNames = exports.FieldNames = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const FieldNames = {
  Active: '__SandDance__Active',
  Collapsed: '__SandDance__Collapsed',
  Contains: '__SandDance__Contains',
  Count: '__SandDance__Count',
  Sum: '__SandDance__Sum',
  SumOfCount: '__SandDance__CountSum',
  SumOfSum: '__SandDance__SumSum',
  Selected: '__SandDance__Selected',
  First: '__SandDance__First',
  Last: '__SandDance__Last',
  Top: '__SandDance__Top',
  TopColor: '__SandDance__TopColor',
  TopIndex: '__SandDance__TopIndex',
  PowerBISelectionId: '__SandDance__PowerBISelectionId',
  FacetSearch: '__SandDance__FacetSearch',
  FacetTitle: '__SandDance__FacetTitle',
  Ordinal: '__SandDance__Ordinal',
  WrapCol: '__SandDance__WrapCol',
  WrapRow: '__SandDance__WrapRow',
  Value: '__SandDance__Value',
  OffsetX: '__SandDance__X',
  OffsetY: '__SandDance__Y',
  OffsetHeight: '__SandDance__H',
  OffsetWidth: '__SandDance__W'
};
exports.FieldNames = FieldNames;
const ScaleNames = {
  Color: 'scale_color',
  X: 'scale_x',
  Y: 'scale_y',
  Z: 'scale_z'
}; //Signal names

exports.ScaleNames = ScaleNames;
const SignalNames = {
  ViewportWidth: 'ViewportWidth',
  ViewportHeight: 'ViewportHeight',
  MinCellWidth: 'MinCellWidth',
  MinCellHeight: 'MinCellHeight',
  PlotOffsetLeft: 'PlotOffsetLeft',
  PlotOffsetTop: 'PlotOffsetTop',
  PlotOffsetBottom: 'PlotOffsetBottom',
  PlotOffsetRight: 'PlotOffsetRight',
  PlotHeightIn: 'PlotHeightIn',
  PlotWidthIn: 'PlotWidthIn',
  PlotHeightOut: 'PlotHeightOut',
  PlotWidthOut: 'PlotWidthOut',
  ColorBinCount: 'RoleColor_BinCountSignal',
  ColorReverse: 'RoleColor_ReverseSignal',
  FacetBins: 'RoleFacet_BinsSignal',
  FacetVBins: 'RoleFacetV_BinsSignal',
  FacetPaddingTop: 'FacetPaddingTop',
  FacetPaddingBottom: 'FacetPaddingBottom',
  FacetPaddingLeft: 'FacetPaddingLeft',
  MarkOpacity: 'Mark_OpacitySignal',
  PointScale: 'Chart_PointScaleSignal',
  TextAngleX: 'Text_AngleXSignal',
  TextAngleY: 'Text_AngleYSignal',
  TextScale: 'Text_ScaleSignal',
  TextSize: 'Text_SizeSignal',
  TextTitleSize: 'Text_TitleSizeSignal',
  TreeMapMethod: 'Chart_TreeMapMethodSignal',
  XBins: 'RoleX_BinsSignal',
  YBins: 'RoleY_BinsSignal',
  ZHeight: 'RoleZ_HeightSignal',
  ZGrounded: 'RoleZ_Grounded',
  ZProportion: 'RoleZ_ProportionSignal'
}; //These are special formulaic data values

exports.SignalNames = SignalNames;
const Other = '__Other'; //name of the "no-color" palette

exports.Other = Other;
const ColorScaleNone = 'none';
exports.ColorScaleNone = ColorScaleNone;
},{}],"visW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scatterSizedDiv = exports.scatterSizedMin = exports.axesOffsetY = exports.axesOffsetX = exports.axesTitlePaddingFacetY = exports.axesTitlePaddingFacetX = exports.axesTitlePaddingY = exports.axesTitlePaddingX = exports.axesTitleLimit = exports.axesLabelLimit = exports.facetPaddingRight = exports.facetPaddingBottom = exports.facetPaddingTop = exports.facetPaddingLeft = exports.minFacetHeight = exports.minFacetWidth = exports.minBarBandWidth = exports.maxbins = exports.defaultBins = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
//TODO move these to options
const defaultBins = 10;
exports.defaultBins = defaultBins;
const maxbins = 100;
exports.maxbins = maxbins;
const minBarBandWidth = 15;
exports.minBarBandWidth = minBarBandWidth;
const minFacetWidth = 140;
exports.minFacetWidth = minFacetWidth;
const minFacetHeight = 180;
exports.minFacetHeight = minFacetHeight;
const facetPaddingLeft = 40;
exports.facetPaddingLeft = facetPaddingLeft;
const facetPaddingTop = 40;
exports.facetPaddingTop = facetPaddingTop;
const facetPaddingBottom = 40;
exports.facetPaddingBottom = facetPaddingBottom;
const facetPaddingRight = 40;
exports.facetPaddingRight = facetPaddingRight;
const axesLabelLimit = 100;
exports.axesLabelLimit = axesLabelLimit;
const axesTitleLimit = 100;
exports.axesTitleLimit = axesTitleLimit;
const axesTitlePaddingX = 30;
exports.axesTitlePaddingX = axesTitlePaddingX;
const axesTitlePaddingY = 60;
exports.axesTitlePaddingY = axesTitlePaddingY;
const axesTitlePaddingFacetX = 69;
exports.axesTitlePaddingFacetX = axesTitlePaddingFacetX;
const axesTitlePaddingFacetY = 92;
exports.axesTitlePaddingFacetY = axesTitlePaddingFacetY;
const axesOffsetX = 120;
exports.axesOffsetX = axesOffsetX;
const axesOffsetY = 120;
exports.axesOffsetY = axesOffsetY;
const scatterSizedMin = 10;
exports.scatterSizedMin = scatterSizedMin;
const scatterSizedDiv = 20;
exports.scatterSizedDiv = scatterSizedDiv;
},{}],"GfLt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

class Layout {
  constructor(props) {
    this.props = props;
    this.id = props.id;
  }

  getGrouping() {
    return null;
  }

  getAggregateSumOp() {
    return null;
  }

  build() {
    throw 'Not implemented';
  }

}

exports.Layout = Layout;
},{}],"IeV1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safeFieldName = safeFieldName;
exports.exprSafeFieldName = exprSafeFieldName;

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

/**
 * Make sure that the field name is accessible via Vega's Field type
 * https://vega.github.io/vega/docs/types/#Field
 * examples: "source.x", "target['x']", "[my.field]"
 */
function safeFieldName(field) {
  return field.replace('.', '\\.').replace('[', '\\[').replace(']', '\\]');
}
/**
 * Make sure the field name is usable in a Vega expression
 */


function exprSafeFieldName(field) {
  //remove whitespace, period, accessors and logical modifiers
  return field.replace(/[.,:;+=\-/<>{}|~!@#$%^*[\]`'"()?\s\\]/g, '');
}
},{}],"Nfxo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAxes = addAxes;
exports.addData = addData;
exports.addMarks = addMarks;
exports.addScales = addScales;
exports.addSignals = addSignals;
exports.addTransforms = addTransforms;
exports.getDataByName = getDataByName;
exports.getGroupBy = getGroupBy;
exports.addOffsets = addOffsets;

function addAxes(scope, ...axis) {
  if (!scope.axes) {
    scope.axes = [];
  }

  scope.axes.push(...axis);
}

function addData(scope, ...data) {
  if (!scope.data) {
    scope.data = [];
  }

  scope.data.push(...data);
}

function addMarks(scope, ...marks) {
  if (!scope.marks) {
    scope.marks = [];
  }

  scope.marks.push(...marks);
}

function addScales(scope, ...scale) {
  if (!scope.scales) {
    scope.scales = [];
  }

  scope.scales.push(...scale);
}

function addSignals(scope, ...signal) {
  if (!scope.signals) {
    scope.signals = [];
  }

  scope.signals.push(...signal);
}

function addTransforms(data, ...transforms) {
  if (!data.transform) {
    data.transform = [];
  }

  data.transform.push(...transforms);
}

function getDataByName(data, dataName) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === dataName) return {
      data: data[i],
      index: i
    };
  }
}

function getGroupBy(groupings) {
  const groupby = groupings.map(g => g.groupby);
  return groupby.reduce((acc, val) => acc.concat(val), []);
}

function addOffsets(...offsets) {
  return offsets.filter(Boolean).join(' + ');
}
},{}],"inPN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testForCollapseSelection = testForCollapseSelection;

var _constants = require("./constants");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function testForCollapseSelection() {
  return `datum.${_constants.FieldNames.Collapsed}`;
}
},{"./constants":"kNZP"}],"UF7t":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregateContainer = void 0;

var _layout = require("./layout");

var _constants = require("../constants");

var _expr = require("../expr");

var _scope = require("../scope");

var _selection = require("../selection");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
class AggregateContainer extends _layout.Layout {
  constructor(props) {
    super(props);
    this.props = props;
    const a = this.aggregation = this.getAggregation();
    const p = this.prefix = `agg_${this.id}`;
    this.names = {
      barCount: `${p}_count`,
      aggregateField: `${p}_aggregate_value`,
      globalAggregateExtentSignal: `${p}_${a}_extent`,
      scale: `scale_${p}`,
      extentData: `data_${p}_extent`,
      offsets: `data_${p}_offsets`
    };
  }

  getAggregateSumOp() {
    if (this.aggregation === 'sum') {
      const fieldOp = {
        field: (0, _expr.safeFieldName)(this.props.sumBy.name),
        op: 'sum',
        as: _constants.FieldNames.Sum
      };
      return fieldOp;
    }
  }

  build() {
    const {
      aggregation,
      names,
      props
    } = this;
    const {
      dock,
      globalScope,
      groupings,
      niceScale,
      parentScope,
      showAxes
    } = props;
    (0, _scope.addTransforms)(globalScope.data, Object.assign(Object.assign({}, this.getTransforms(aggregation, (0, _scope.getGroupBy)(groupings))), {
      as: [names.aggregateField]
    }), {
      type: 'extent',
      field: (0, _expr.safeFieldName)(names.aggregateField),
      signal: names.globalAggregateExtentSignal
    });
    (0, _scope.addSignals)(globalScope.scope, {
      name: props.globalAggregateMaxExtentSignal,
      update: `${names.globalAggregateExtentSignal}[1]`
    });
    const horizontal = dock === 'left';
    const groupScaled = `scale(${JSON.stringify(names.scale)}, datum[${JSON.stringify(names.aggregateField)}])`;
    const offsets = {
      x: parentScope.offsets.x,
      y: (0, _scope.addOffsets)(parentScope.offsets.y, dock === 'bottom' ? groupScaled : ''),
      h: horizontal ? parentScope.offsets.h : dock === 'top' ? groupScaled : `${parentScope.offsets.h} - ${groupScaled}`,
      w: horizontal ? groupScaled : parentScope.offsets.w
    };
    const scale = {
      type: 'linear',
      name: names.scale,
      domain: [0, {
        signal: props.globalAggregateMaxExtentSignal
      }],
      range: horizontal ? [0, {
        signal: parentScope.sizeSignals.layoutWidth
      }] : [{
        signal: parentScope.sizeSignals.layoutHeight
      }, 0],
      nice: niceScale,
      zero: true,
      reverse: dock === 'top'
    };
    const globalAggregateMaxExtentScaledValue = `scale(${JSON.stringify(names.scale)}, ${props.globalAggregateMaxExtentSignal})`;
    (0, _scope.addSignals)(globalScope.scope, {
      name: props.globalAggregateMaxExtentScaledSignal,
      update: dock === 'bottom' ? `${parentScope.sizeSignals.layoutHeight} - ${globalAggregateMaxExtentScaledValue}` : globalAggregateMaxExtentScaledValue
    });
    return {
      offsets,
      sizeSignals: horizontal ? {
        layoutHeight: parentScope.sizeSignals.layoutHeight,
        layoutWidth: null
      } : {
        layoutHeight: null,
        layoutWidth: parentScope.sizeSignals.layoutWidth
      },
      globalScales: {
        showAxes,
        scales: {
          x: horizontal ? scale : undefined,
          y: horizontal ? undefined : scale
        }
      },
      encodingRuleMap: horizontal ? {
        x: [{
          test: (0, _selection.testForCollapseSelection)(),
          signal: parentScope.offsets.x
        }],
        width: [{
          test: (0, _selection.testForCollapseSelection)(),
          value: 0
        }]
      } : {
        y: [{
          test: (0, _selection.testForCollapseSelection)(),
          signal: dock === 'top' ? parentScope.offsets.y : (0, _scope.addOffsets)(parentScope.offsets.y, parentScope.offsets.h)
        }],
        height: [{
          test: (0, _selection.testForCollapseSelection)(),
          value: 0
        }]
      }
    };
  }

  getTransforms(aggregation, groupby) {
    const trans = {
      type: 'joinaggregate',
      groupby: groupby.map(_expr.safeFieldName),
      ops: [aggregation]
    };

    if (aggregation === 'sum') {
      trans.fields = [this.props.sumBy.name].map(_expr.safeFieldName);
    }

    return trans;
  }

  getAggregation() {
    const {
      props
    } = this;
    let s;

    if (props.dock === 'left') {
      s = props.axesScales.x;
    } else {
      s = props.axesScales.y;
    }

    switch (s.aggregate) {
      case 'sum':
        return 'sum';

      default:
        return 'count';
    }
  }

}

exports.AggregateContainer = AggregateContainer;
},{"./layout":"GfLt","../constants":"kNZP","../expr":"IeV1","../scope":"Nfxo","../selection":"inPN"}],"HtEf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binnable = binnable;

var _constants = require("./constants");

var _expr = require("./expr");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function binnable(prefix, domainDataName, discreteColumn) {
  const {
    column,
    defaultBins,
    maxbins,
    maxbinsSignalDisplayName,
    maxbinsSignalName
  } = discreteColumn;

  if (column.quantitative) {
    const field = `${prefix}_bin_${(0, _expr.exprSafeFieldName)(column.name)}`;
    const fieldEnd = `${field}_end`;
    const binSignal = `${field}_bins`;
    const extentSignal = `${field}_bin_extent`;
    domainDataName = `${field}_sequence`; //override the data name

    const extentTransform = {
      type: 'extent',
      field: (0, _expr.safeFieldName)(column.name),
      signal: extentSignal
    };
    const maxbinsSignal = {
      name: maxbinsSignalName,
      value: defaultBins,
      bind: {
        name: maxbinsSignalDisplayName,
        debounce: 50,
        input: 'range',
        min: 1,
        max: maxbins,
        step: 1
      }
    };
    const binTransform = {
      type: 'bin',
      field: (0, _expr.safeFieldName)(column.name),
      as: [field, fieldEnd],
      signal: binSignal,
      extent: {
        signal: extentSignal
      },
      maxbins: {
        signal: maxbinsSignalName
      }
    };
    const dataSequence = {
      name: domainDataName,
      transform: [{
        type: 'sequence',
        start: {
          signal: `${binSignal}.start`
        },
        stop: {
          signal: `${binSignal}.stop`
        },
        step: {
          signal: `${binSignal}.step`
        }
      }, {
        type: 'formula',
        expr: 'datum.data',
        as: field
      }, {
        type: 'formula',
        expr: `datum.data + ${binSignal}.step`,
        as: fieldEnd
      }, {
        type: 'window',
        ops: ['row_number'],
        as: [_constants.FieldNames.Ordinal]
      }, {
        type: 'formula',
        expr: `datum.data === ${binSignal}.start`,
        as: _constants.FieldNames.First
      }, {
        type: 'formula',
        expr: `datum.data === ${binSignal}.stop - ${binSignal}.step`,
        as: _constants.FieldNames.Last
      }]
    };
    return {
      discreteColumn,
      native: false,
      transforms: [extentTransform, binTransform],
      fields: [field, fieldEnd],
      binSignal,
      dataSequence,
      domainDataName,
      maxbinsSignal,
      fullScaleDataname: dataSequence.name
    };
  } else {
    return {
      discreteColumn,
      native: true,
      fields: [column.name],
      domainDataName,
      fullScaleDataname: domainDataName
    };
  }
}
},{"./constants":"kNZP","./expr":"IeV1"}],"TTOO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textSignals = textSignals;
exports.colorBinCountSignal = colorBinCountSignal;
exports.colorReverseSignal = colorReverseSignal;
exports.modifySignal = modifySignal;
exports.defaultZProportion = void 0;

var _constants = require("./constants");

const defaultZProportion = 0.6;
exports.defaultZProportion = defaultZProportion;

function textSignals(context, heightSignal) {
  const {
    specViewOptions
  } = context;
  const signals = [{
    name: _constants.SignalNames.ZProportion,
    value: defaultZProportion,
    bind: {
      name: specViewOptions.language.zScaleProportion,
      debounce: 50,
      input: 'range',
      min: 0.2,
      max: 2,
      step: 0.1
    }
  }, {
    name: _constants.SignalNames.ZHeight,
    update: `${heightSignal} * ${_constants.SignalNames.ZProportion}`
  }, {
    name: _constants.SignalNames.TextScale,
    value: 1.2,
    bind: {
      name: specViewOptions.language.textScaleSignal,
      debounce: 50,
      input: 'range',
      min: 0.5,
      max: 2,
      step: 0.1
    }
  }, {
    name: _constants.SignalNames.TextSize,
    update: `${_constants.SignalNames.TextScale} * 10`
  }, {
    name: _constants.SignalNames.TextTitleSize,
    update: `${_constants.SignalNames.TextScale} * 15`
  }, {
    name: _constants.SignalNames.TextAngleX,
    value: 30,
    bind: {
      name: specViewOptions.language.xAxisTextAngleSignal,
      debounce: 50,
      input: 'range',
      min: 0,
      max: 90,
      step: 1
    }
  }, {
    name: _constants.SignalNames.TextAngleY,
    value: 0,
    bind: {
      name: specViewOptions.language.yAxisTextAngleSignal,
      debounce: 50,
      input: 'range',
      min: -90,
      max: 0,
      step: 1
    }
  }, {
    name: _constants.SignalNames.MarkOpacity,
    value: 1,
    bind: {
      name: specViewOptions.language.markOpacitySignal,
      debounce: 50,
      input: 'range',
      min: 0.1,
      max: 1,
      step: 0.05
    }
  }];
  return signals;
}

function colorBinCountSignal(context) {
  const {
    specViewOptions
  } = context;
  const signal = {
    name: _constants.SignalNames.ColorBinCount,
    value: 7,
    bind: {
      name: specViewOptions.language.colorBinCount,
      input: 'range',
      min: 1,
      max: specViewOptions.maxLegends + 1,
      step: 1
    }
  };
  return signal;
}

function colorReverseSignal(context) {
  const {
    specViewOptions
  } = context;
  const signal = {
    name: _constants.SignalNames.ColorReverse,
    value: false,
    bind: {
      name: specViewOptions.language.colorReverse,
      input: 'checkbox'
    }
  };
  return signal;
}

function modifySignal(s, fn, update) {
  s.update = `${fn}((${s.update}), (${update}))`;
}
},{"./constants":"kNZP"}],"xuzw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Band = void 0;

var _layout = require("./layout");

var _bin = require("../bin");

var _expr = require("../expr");

var _scope = require("../scope");

var _selection = require("../selection");

var _signals = require("../signals");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
class Band extends _layout.Layout {
  constructor(props) {
    super(props);
    this.props = props;
    const p = this.prefix = `band_${this.id}`;
    this.names = {
      xScale: `scale_${p}_x`,
      yScale: `scale_${p}_y`,
      bandWidth: `${p}_bandwidth`,
      accumulative: `${p}_accumulative`
    };
    this.bin = (0, _bin.binnable)(this.prefix, props.globalScope.data.name, props.groupby);
  }

  getGrouping() {
    return this.bin.fields;
  }

  build() {
    const {
      bin,
      names,
      props
    } = this;
    const {
      globalScope,
      minBandWidth,
      orientation,
      parentScope,
      showAxes
    } = props;
    const binField = bin.fields[0];

    if (bin.native === false) {
      (0, _scope.addSignals)(globalScope.scope, bin.maxbinsSignal);
      (0, _scope.addTransforms)(globalScope.data, ...bin.transforms);
      (0, _scope.addData)(globalScope.scope, bin.dataSequence);
    } //TODO don't add this, use existing dataset


    (0, _scope.addData)(globalScope.scope, {
      name: names.accumulative,
      source: bin.fullScaleDataname,
      transform: [{
        type: 'aggregate',
        groupby: this.getGrouping().map(_expr.safeFieldName),
        ops: ['count']
      }]
    });
    const horizontal = orientation === 'horizontal';
    const minCellSignal = horizontal ? globalScope.signals.minCellHeight : globalScope.signals.minCellWidth;
    (0, _signals.modifySignal)(minCellSignal, 'max', `length(data(${JSON.stringify(names.accumulative)})) * ${minBandWidth}`);
    (0, _scope.addSignals)(globalScope.scope, {
      name: names.bandWidth,
      update: `bandwidth(${JSON.stringify(horizontal ? names.yScale : names.xScale)})`
    });
    const scale = this.getScale(bin, horizontal);
    let encodingRuleMap;

    if (!props.excludeEncodingRuleMap) {
      encodingRuleMap = horizontal ? {
        x: [{
          test: (0, _selection.testForCollapseSelection)(),
          value: parentScope.offsets.x
        }],
        width: [{
          test: (0, _selection.testForCollapseSelection)(),
          value: 0
        }]
      } : {
        y: [{
          test: (0, _selection.testForCollapseSelection)(),
          signal: (0, _scope.addOffsets)(parentScope.offsets.y, parentScope.offsets.h)
        }],
        height: [{
          test: (0, _selection.testForCollapseSelection)(),
          value: 0
        }]
      };
    }

    return {
      offsets: this.getOffset(horizontal, binField),
      sizeSignals: horizontal ? {
        layoutHeight: names.bandWidth,
        layoutWidth: parentScope.sizeSignals.layoutWidth
      } : {
        layoutHeight: parentScope.sizeSignals.layoutHeight,
        layoutWidth: names.bandWidth
      },
      globalScales: {
        showAxes,
        scales: {
          x: horizontal ? undefined : scale,
          y: horizontal ? scale : undefined
        }
      },
      encodingRuleMap
    };
  }

  getOffset(horizontal, binField) {
    const {
      names,
      props
    } = this;
    const {
      parentScope
    } = props;
    return {
      x: (0, _scope.addOffsets)(parentScope.offsets.x, horizontal ? '' : `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(binField)}])`),
      y: (0, _scope.addOffsets)(parentScope.offsets.y, horizontal ? `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(binField)}])` : ''),
      h: horizontal ? names.bandWidth : parentScope.offsets.h,
      w: horizontal ? parentScope.offsets.w : names.bandWidth
    };
  }

  getScale(bin, horizontal) {
    const {
      names
    } = this;
    const {
      parentScope
    } = this.props;
    const binField = (0, _expr.safeFieldName)(bin.fields[0]);
    let scale;

    if (horizontal) {
      scale = {
        type: 'band',
        name: names.yScale,
        range: [0, {
          signal: parentScope.sizeSignals.layoutHeight
        }],
        padding: 0.1,
        domain: {
          data: bin.domainDataName,
          field: binField,
          sort: true
        },
        reverse: true
      };
    } else {
      scale = {
        type: 'band',
        name: names.xScale,
        range: [0, {
          signal: parentScope.sizeSignals.layoutWidth
        }],
        padding: 0.1,
        domain: {
          data: bin.domainDataName,
          field: binField,
          sort: true
        }
      };
    }

    return scale;
  }

}

exports.Band = Band;
},{"./layout":"GfLt","../bin":"HtEf","../expr":"IeV1","../scope":"Nfxo","../selection":"inPN","../signals":"TTOO"}],"mxMR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linearScale = linearScale;
exports.pointScale = pointScale;
exports.binnableColorScale = binnableColorScale;

var _constants = require("./constants");

var _expr = require("./expr");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function linearScale(scaleName, data, field, range, reverse, zero) {
  const scale = {
    name: scaleName,
    type: 'linear',
    range,
    round: true,
    reverse,
    domain: {
      data,
      field: (0, _expr.safeFieldName)(field)
    },
    zero,
    nice: true
  };
  return scale;
}

function pointScale(scaleName, data, range, field, reverse) {
  const scale = {
    name: scaleName,
    type: 'point',
    range,
    domain: {
      data,
      field: (0, _expr.safeFieldName)(field),
      sort: true
    },
    padding: 0.5
  };

  if (reverse !== undefined) {
    scale.reverse = reverse;
  }

  return scale;
}

function binnableColorScale(scaleName, colorBin, data, field, scheme) {
  scheme = scheme || _constants.ColorScaleNone;
  const domain = {
    data,
    field: (0, _expr.safeFieldName)(field)
  };
  const range = {
    scheme
  };
  const reverse = {
    signal: _constants.SignalNames.ColorReverse
  };

  if (colorBin !== 'continuous') {
    range.count = {
      signal: _constants.SignalNames.ColorBinCount
    };
  }

  switch (colorBin) {
    case 'continuous':
      {
        const sequentialScale = {
          name: scaleName,
          type: 'linear',
          domain,
          range,
          reverse
        };
        return sequentialScale;
      }

    case 'quantile':
      {
        const quantileScale = {
          name: scaleName,
          type: 'quantile',
          domain,
          range,
          reverse
        };
        return quantileScale;
      }

    default:
      {
        const quantizeScale = {
          name: scaleName,
          type: 'quantize',
          domain,
          range,
          reverse
        };
        return quantizeScale;
      }
  }
}
},{"./constants":"kNZP","./expr":"IeV1"}],"GmqS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addZScale = addZScale;

var _constants = require("./constants");

var _scales = require("./scales");

var _scope = require("./scope");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function addZScale(z, zSize, globalScope, zScaleName) {
  if (z) {
    const zRange = [0, {
      signal: `(${zSize}) * ${_constants.SignalNames.ZProportion}`
    }];
    (0, _scope.addScales)(globalScope.scope, z.quantitative ? (0, _scales.linearScale)(zScaleName, globalScope.data.name, z.name, zRange, false, true) : (0, _scales.pointScale)(zScaleName, globalScope.data.name, zRange, z.name, false));
  }
}
},{"./constants":"kNZP","./scales":"mxMR","./scope":"Nfxo"}],"Jhnx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Square = void 0;

var _layout = require("./layout");

var _constants = require("../constants");

var _expr = require("../expr");

var _scope = require("../scope");

var _selection = require("../selection");

var _zBase = require("../zBase");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
class Square extends _layout.Layout {
  constructor(props) {
    super(props);
    this.props = props;
    const p = this.prefix = `square_${this.id}`;
    this.names = {
      bandWidth: this.getBandWidth(),
      maxGroupField: `${p}_max_group`,
      maxGroupSignal: `${p}_max_grouping`,
      stack0: `${p}_stack0`,
      stack1: `${p}_stack1`,
      zScale: `scale_${p}_z`
    };
  }

  build() {
    const {
      names,
      prefix,
      props
    } = this;
    const {
      fillDirection,
      globalScope,
      groupings,
      parentScope,
      collapseYHeight,
      sortBy,
      z
    } = props;
    (0, _zBase.addZScale)(z, globalScope.zSize, globalScope, names.zScale);
    (0, _scope.addTransforms)(globalScope.data, Object.assign({
      type: 'stack',
      groupby: (0, _scope.getGroupBy)(groupings).map(_expr.safeFieldName),
      as: [names.stack0, names.stack1]
    }, sortBy && {
      sort: {
        field: (0, _expr.safeFieldName)(sortBy.name),
        order: 'ascending'
      }
    }));
    const {
      gap,
      levelSize,
      size,
      squaresPerBand
    } = this.addSignals();
    const heightSignal = {
      signal: fillDirection === 'down-right' ? size : levelSize
    };
    const mark = {
      name: prefix,
      type: 'rect',
      from: {
        data: globalScope.markDataName
      },
      encode: {
        update: Object.assign({
          height: collapseYHeight ? [{
            test: (0, _selection.testForCollapseSelection)(),
            value: 0
          }, heightSignal] : heightSignal,
          width: {
            signal: fillDirection === 'down-right' ? levelSize : size
          }
        }, z && {
          z: {
            value: 0
          },
          depth: [{
            test: (0, _selection.testForCollapseSelection)(),
            value: 0
          }, {
            scale: names.zScale,
            field: (0, _expr.safeFieldName)(z.name)
          }]
        })
      }
    };
    (0, _scope.addMarks)(globalScope.markGroup, mark);
    const {
      tx,
      ty
    } = this.transformXY(gap, levelSize, squaresPerBand);
    return Object.assign({
      offsets: {
        x: (0, _scope.addOffsets)(parentScope.offsets.x, tx.expr),
        y: (0, _scope.addOffsets)(parentScope.offsets.y, ty.expr),
        h: size,
        w: size
      },
      mark,
      sizeSignals: {
        layoutHeight: size,
        layoutWidth: size
      }
    }, collapseYHeight && {
      encodingRuleMap: {
        y: [{
          test: (0, _selection.testForCollapseSelection)(),
          value: parentScope.offsets.y
        }]
      }
    });
  }

  getBandWidth() {
    const {
      offsets
    } = this.props.parentScope;

    switch (this.props.fillDirection) {
      case 'down-right':
        return offsets.h;

      default:
        return offsets.w;
    }
  }

  addSignals() {
    const {
      names,
      props
    } = this;
    const {
      fillDirection,
      globalScope,
      groupings,
      parentScope
    } = props;
    let {
      maxGroupedFillSize,
      maxGroupedUnits
    } = props;

    if (!maxGroupedUnits) {
      if (groupings) {
        (0, _scope.addTransforms)(globalScope.data, {
          type: 'joinaggregate',
          groupby: (0, _scope.getGroupBy)(groupings).map(_expr.safeFieldName),
          ops: ['count'],
          as: [names.maxGroupField]
        }, {
          type: 'extent',
          field: names.maxGroupField,
          signal: names.maxGroupSignal
        });
        maxGroupedUnits = `(${names.maxGroupSignal}[1])`;
      } else {
        maxGroupedUnits = `length(data(${JSON.stringify(globalScope.data.name)}))`;
      }
    }

    if (!maxGroupedFillSize) {
      maxGroupedFillSize = fillDirection === 'down-right' ? parentScope.offsets.w : parentScope.offsets.h;
    }

    const aspect = `((${names.bandWidth}) / (${maxGroupedFillSize}))`;
    const squaresPerBand = `ceil(sqrt(${maxGroupedUnits} * ${aspect}))`;
    const gap = `min(0.1 * ((${names.bandWidth}) / (${squaresPerBand} - 1)), 1)`;
    const size = `(((${names.bandWidth}) / ${squaresPerBand}) - ${gap})`;
    const levels = `ceil(${maxGroupedUnits} / ${squaresPerBand})`;
    const levelSize = `(((${maxGroupedFillSize}) / ${levels}) - ${gap})`;
    return {
      gap,
      levelSize,
      size,
      squaresPerBand
    };
  }

  transformXY(gap, levelSize, squaresPerBand) {
    const {
      names,
      prefix
    } = this;
    const compartment = `(${names.bandWidth}) / ${squaresPerBand} * ((datum[${JSON.stringify(names.stack0)}]) % ${squaresPerBand})`;
    const level = `floor((datum[${JSON.stringify(names.stack0)}]) / ${squaresPerBand})`;
    const {
      fillDirection,
      parentScope
    } = this.props;
    const tx = {
      type: 'formula',
      expr: null,
      as: `${prefix}_${_constants.FieldNames.OffsetX}`
    };
    const ty = {
      type: 'formula',
      expr: null,
      as: `${prefix}_${_constants.FieldNames.OffsetY}`
    };

    switch (fillDirection) {
      case 'down-right':
        {
          tx.expr = `${level} * (${levelSize} + ${gap})`;
          ty.expr = compartment;
          break;
        }

      case 'right-up':
        {
          tx.expr = compartment;
          ty.expr = `${parentScope.offsets.h} - ${levelSize} - ${level} * (${levelSize} + ${gap})`;
          break;
        }

      case 'right-down':
      default:
        {
          tx.expr = compartment;
          ty.expr = `${level} * (${levelSize} + ${gap})`;
          break;
        }
    }

    return {
      tx,
      ty
    };
  }

}

exports.Square = Square;
},{"./layout":"GfLt","../constants":"kNZP","../expr":"IeV1","../scope":"Nfxo","../selection":"inPN","../zBase":"GmqS"}],"vr0D":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Strip = void 0;

var _layout = require("./layout");

var _constants = require("../constants");

var _expr = require("../expr");

var _scope = require("../scope");

var _selection = require("../selection");

var _zBase = require("../zBase");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
class Strip extends _layout.Layout {
  constructor(props) {
    super(props);
    this.props = props;
    const p = this.prefix = `strip_${this.id}`;
    this.names = {
      firstField: `${p}${_constants.FieldNames.First}`,
      lastField: `${p}${_constants.FieldNames.Last}`,
      valueField: `${p}${_constants.FieldNames.Value}`,
      scale: `scale_${p}`,
      zScale: `scale_${p}_z`
    };
  }

  build() {
    const {
      names,
      prefix,
      props
    } = this;
    const {
      addPercentageScale,
      globalScope,
      groupings,
      orientation,
      size,
      sort,
      sortOrder,
      parentScope,
      z
    } = props;
    (0, _zBase.addZScale)(z, globalScope.zSize, globalScope, names.zScale);
    const horizontal = orientation === 'horizontal';
    const transform = [];

    if (sort) {
      transform.push({
        type: 'collect',
        sort: {
          field: (0, _expr.safeFieldName)(sort.name),
          order: sortOrder
        }
      });
    }

    let stackField;

    if (size) {
      stackField = size.name;
      transform.push({
        type: 'filter',
        expr: `datum[${JSON.stringify(size.name)}] > 0`
      });
    } else {
      stackField = names.valueField;
      transform.push({
        type: 'formula',
        expr: '1',
        as: stackField
      });
    }

    const stackTransform = {
      type: 'stack',
      field: (0, _expr.safeFieldName)(stackField),
      offset: 'normalize',
      as: [names.firstField, names.lastField]
    };

    if (groupings.length) {
      stackTransform.groupby = (0, _scope.getGroupBy)(groupings).map(_expr.safeFieldName);
    }

    transform.push(stackTransform);
    (0, _scope.addTransforms)(globalScope.data, ...transform);
    const span = [names.lastField, names.firstField].map(f => `datum[${JSON.stringify(f)}]`).join(' - ');
    const offsets = {
      x: (0, _scope.addOffsets)(parentScope.offsets.x, horizontal ? `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.w})` : ''),
      y: (0, _scope.addOffsets)(parentScope.offsets.y, horizontal ? '' : `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.h})`),
      h: horizontal ? parentScope.offsets.h : `(${span}) * (${parentScope.offsets.h})`,
      w: horizontal ? `(${span}) * (${parentScope.offsets.w})` : parentScope.offsets.w
    };
    const mark = {
      name: prefix,
      type: 'rect',
      from: {
        data: globalScope.markDataName
      },
      encode: {
        update: Object.assign({
          height: {
            signal: offsets.h
          },
          width: {
            signal: offsets.w
          }
        }, z && {
          z: {
            value: 0
          },
          depth: [{
            test: (0, _selection.testForCollapseSelection)(),
            value: 0
          }, {
            scale: names.zScale,
            field: (0, _expr.safeFieldName)(z.name)
          }]
        })
      }
    };
    (0, _scope.addMarks)(globalScope.markGroup, mark);
    let percentageScale;

    if (addPercentageScale) {
      percentageScale = {
        type: 'linear',
        name: names.scale,
        domain: [0, 100],
        range: horizontal ? [0, {
          signal: parentScope.sizeSignals.layoutWidth
        }] : [{
          signal: parentScope.sizeSignals.layoutHeight
        }, 0]
      };
    }

    return {
      globalScales: {
        showAxes: true,
        scales: {
          x: horizontal ? percentageScale : undefined,
          y: horizontal ? undefined : percentageScale
        }
      },
      offsets,
      sizeSignals: {
        layoutHeight: null,
        layoutWidth: null
      },
      mark
    };
  }

}

exports.Strip = Strip;
},{"./layout":"GfLt","../constants":"kNZP","../expr":"IeV1","../scope":"Nfxo","../selection":"inPN","../zBase":"GmqS"}],"utMY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Treemap = void 0;

var _layout = require("./layout");

var _constants = require("../constants");

var _expr = require("../expr");

var _scope = require("../scope");

var _selection = require("../selection");

var _zBase = require("../zBase");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
class Treemap extends _layout.Layout {
  constructor(props) {
    super(props);
    this.props = props;
    const p = this.prefix = `treemap_${this.id}`;
    this.names = {
      dataName: `data_${p}`,
      dataHeightWidth: `data_${p}_hw`,
      dataExtents: `data_${p}_extents`,
      dataFacet: `data_${p}_facet`,
      dataFacetMark: `data_${p}_facetMark`,
      fieldChildren: `${p}_children`,
      fieldDepth: `${p}_depth`,
      fieldX0: `${p}_x0`,
      fieldX1: `${p}_x1`,
      fieldY0: `${p}_y0`,
      fieldY1: `${p}_y1`,
      fieldHeight: `${p}_h`,
      fieldWidth: `${p}_w`,
      heightExtent: `${p}_heightExtent`,
      widthExtent: `${p}_widthExtent`,
      zScale: `scale_${p}_z`
    };
  }

  build() {
    const {
      names,
      props
    } = this;
    const {
      globalScope,
      parentScope,
      treeMapMethod,
      z
    } = props;
    (0, _zBase.addZScale)(z, globalScope.zSize, globalScope, names.zScale);
    const offsets = {
      x: (0, _scope.addOffsets)(parentScope.offsets.x, fn(names.fieldX0)),
      y: (0, _scope.addOffsets)(parentScope.offsets.y, fn(names.fieldY0)),
      h: subtract(names.fieldY1, names.fieldY0),
      w: subtract(names.fieldX1, names.fieldX0)
    };
    const mark = this.transformedMark(offsets);
    (0, _scope.addSignals)(globalScope.scope, {
      name: _constants.SignalNames.TreeMapMethod,
      value: 'squarify',
      bind: {
        name: treeMapMethod,
        input: 'select',
        options: ['squarify', 'binary']
      }
    });
    return {
      mark,
      offsets,
      sizeSignals: {
        layoutHeight: null,
        layoutWidth: null
      }
    };
  }

  transformedMark(offsets) {
    const {
      names,
      props
    } = this;
    const {
      globalScope,
      groupings,
      parentScope
    } = props;

    if (groupings.length) {
      //treemap transform can't have it's boundary size grouped, so we need to facet the data.
      (0, _scope.addData)(globalScope.scope, {
        name: names.dataHeightWidth,
        source: globalScope.markDataName,
        transform: [{
          type: 'formula',
          expr: parentScope.offsets.h,
          as: names.fieldHeight
        }, {
          type: 'formula',
          expr: parentScope.offsets.w,
          as: names.fieldWidth
        }]
      });
      const treemapData = {
        name: names.dataFacetMark,
        source: names.dataFacet
      };
      const facets = {
        type: 'group',
        from: {
          facet: {
            name: names.dataFacet,
            data: names.dataHeightWidth,
            groupby: (0, _scope.getGroupBy)(groupings).map(_expr.safeFieldName)
          }
        },
        data: [{
          name: names.dataExtents,
          source: names.dataFacet,
          transform: [{
            type: 'extent',
            field: names.fieldHeight,
            signal: names.heightExtent
          }, {
            type: 'extent',
            field: names.fieldWidth,
            signal: names.widthExtent
          }]
        }, treemapData]
      };
      globalScope.setMarkDataName(names.dataFacetMark);
      (0, _scope.addMarks)(globalScope.markGroup, facets); //assign new markgroup after adding mark to original group

      globalScope.setMarkGroup(facets);
      this.treemapTransform(treemapData, `${names.widthExtent}[0]`, `${names.heightExtent}[0]`);
      return this.addMark(offsets, facets, globalScope.markDataName);
    } else {
      this.treemapTransform(globalScope.data, parentScope.offsets.w, parentScope.offsets.h);
      return this.addMark(offsets, globalScope.markGroup, globalScope.markDataName);
    }
  }

  addMark(offsets, markParent, markDataName) {
    const {
      names,
      prefix,
      props
    } = this;
    const {
      z
    } = props;
    const mark = {
      name: prefix,
      type: 'rect',
      from: {
        data: markDataName
      },
      encode: {
        update: Object.assign({
          width: {
            signal: offsets.w
          },
          height: {
            signal: offsets.h
          }
        }, z && {
          z: {
            value: 0
          },
          depth: [{
            test: (0, _selection.testForCollapseSelection)(),
            value: 0
          }, {
            scale: names.zScale,
            field: (0, _expr.safeFieldName)(z.name)
          }]
        })
      }
    };
    (0, _scope.addMarks)(markParent, mark);
    return mark;
  }

  treemapTransform(treemapData, widthSignal, heightSignal) {
    const {
      names,
      props
    } = this;
    const {
      group,
      size
    } = props;
    (0, _scope.addTransforms)(treemapData, {
      type: 'filter',
      expr: `datum[${JSON.stringify(size.name)}] > 0`
    }, {
      type: 'nest',
      keys: [group && group.name || '__NONE__']
    }, {
      type: 'treemap',
      field: (0, _expr.safeFieldName)(size.name),
      sort: {
        field: 'value',
        order: 'descending'
      },
      round: true,
      method: {
        signal: _constants.SignalNames.TreeMapMethod
      },
      paddingInner: 1,
      paddingOuter: 0,
      size: [{
        signal: widthSignal
      }, {
        signal: heightSignal
      }],
      as: [names.fieldX0, names.fieldY0, names.fieldX1, names.fieldY1, names.fieldDepth, names.fieldChildren]
    });
  }

}

exports.Treemap = Treemap;

function fn(n) {
  return `datum[${JSON.stringify(n)}]`;
}

function subtract(...fields) {
  return fields.map(n => fn(n)).join(' - ');
}
},{"./layout":"GfLt","../constants":"kNZP","../expr":"IeV1","../scope":"Nfxo","../selection":"inPN","../zBase":"GmqS"}],"a0oX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allowNoneForSize = allowNoneForSize;

function allowNoneForSize(specContext) {
  switch (specContext.insight.totalStyle) {
    case 'sum-strip':
    case 'sum-strip-percent':
    case 'sum-treemap':
      return false;

    default:
      //if totalStyle is blank, count is assumed
      return true;
  }
}
},{}],"PsHp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _constants = require("../constants");

var _defaults = require("../defaults");

var _aggregateContainer = require("../layouts/aggregateContainer");

var _band = require("../layouts/band");

var _square = require("../layouts/square");

var _strip = require("../layouts/strip");

var _treemap = require("../layouts/treemap");

var _size = require("../size");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function _default(specContext) {
  const {
    insight,
    specColumns,
    specViewOptions
  } = specContext;
  const {
    language
  } = specViewOptions;
  const bandProps = {
    orientation: 'horizontal',
    groupby: {
      column: specColumns.y,
      defaultBins: _defaults.defaultBins,
      maxbinsSignalName: _constants.SignalNames.YBins,
      maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
      maxbins: _defaults.maxbins
    },
    minBandWidth: _defaults.minBarBandWidth,
    showAxes: true
  };
  const x = {
    title: null
  };
  const axisScales = {
    x,
    y: {
      title: specColumns.y && specColumns.y.name
    },
    z: {
      title: specColumns.z && specColumns.z.name
    }
  };
  const layouts = [{
    layoutClass: _band.Band,
    props: bandProps
  }];

  if (insight.totalStyle === 'sum-strip-percent') {
    x.aggregate = 'percent';
    x.title = language.percent;
    const stripProps = {
      addPercentageScale: true,
      sortOrder: 'ascending',
      orientation: 'horizontal',
      size: specColumns.size,
      sort: specColumns.sort,
      z: specColumns.z
    };
    layouts.push({
      layoutClass: _strip.Strip,
      props: stripProps
    });
  } else {
    const aggProps = {
      niceScale: true,
      dock: 'left',
      globalAggregateMaxExtentSignal: 'aggMaxExtent',
      globalAggregateMaxExtentScaledSignal: 'aggMaxExtentScaled',
      sumBy: specColumns.size,
      showAxes: true
    };
    layouts.push({
      layoutClass: _aggregateContainer.AggregateContainer,
      props: aggProps
    });

    switch (insight.totalStyle) {
      case 'sum-treemap':
        {
          x.aggregate = 'sum';
          x.title = language.sum;
          const treemapProps = {
            corner: 'top-left',
            size: specColumns.size,
            treeMapMethod: specViewOptions.language.treeMapMethod,
            z: specColumns.z
          };
          layouts.push({
            layoutClass: _treemap.Treemap,
            props: treemapProps
          });
          break;
        }

      case 'sum-strip':
        {
          x.aggregate = 'sum';
          x.title = language.sum;
          const stripProps = {
            sortOrder: 'ascending',
            orientation: 'horizontal',
            size: specColumns.size,
            sort: specColumns.sort,
            z: specColumns.z
          };
          layouts.push({
            layoutClass: _strip.Strip,
            props: stripProps
          });
          break;
        }

      case 'count-strip':
        {
          x.aggregate = 'count';
          x.title = language.count;
          const stripProps = {
            sortOrder: 'ascending',
            orientation: 'horizontal',
            size: specColumns.size,
            sort: specColumns.sort,
            z: specColumns.z
          };
          layouts.push({
            layoutClass: _strip.Strip,
            props: stripProps
          });
          break;
        }

      default:
        {
          x.aggregate = 'count';
          x.title = language.count;
          const squareProps = {
            sortBy: specColumns.sort,
            fillDirection: 'down-right',
            z: specColumns.z,
            maxGroupedUnits: aggProps.globalAggregateMaxExtentSignal,
            maxGroupedFillSize: aggProps.globalAggregateMaxExtentScaledSignal
          };
          layouts.push({
            layoutClass: _square.Square,
            props: squareProps
          });
          break;
        }
    }
  }

  return {
    axisScales,
    layouts,
    specCapabilities: {
      countsAndSums: true,
      percentage: true,
      roles: [{
        role: 'y',
        binnable: true,
        axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
        signals: [_constants.SignalNames.YBins]
      }, {
        role: 'z',
        allowNone: true
      }, {
        role: 'color',
        allowNone: true
      }, {
        role: 'sort',
        allowNone: true
      }, {
        role: 'size',
        allowNone: _size.allowNoneForSize,
        excludeCategoric: true,
        signals: [_constants.SignalNames.TreeMapMethod]
      }, {
        role: 'facet',
        allowNone: true,
        signals: [_constants.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [_constants.SignalNames.FacetVBins]
      }]
    }
  };
}
},{"../constants":"kNZP","../defaults":"visW","../layouts/aggregateContainer":"UF7t","../layouts/band":"xuzw","../layouts/square":"Jhnx","../layouts/strip":"vr0D","../layouts/treemap":"utMY","../size":"a0oX"}],"AVzi":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _constants = require("../constants");

var _defaults = require("../defaults");

var _aggregateContainer = require("../layouts/aggregateContainer");

var _band = require("../layouts/band");

var _square = require("../layouts/square");

var _strip = require("../layouts/strip");

var _treemap = require("../layouts/treemap");

var _size = require("../size");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function _default(specContext) {
  const {
    insight,
    specColumns,
    specViewOptions
  } = specContext;
  const {
    language
  } = specViewOptions;
  const bandProps = {
    orientation: 'vertical',
    groupby: {
      column: specColumns.x,
      defaultBins: _defaults.defaultBins,
      maxbinsSignalName: _constants.SignalNames.XBins,
      maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
      maxbins: _defaults.maxbins
    },
    minBandWidth: _defaults.minBarBandWidth,
    showAxes: true
  };
  const y = {
    title: null
  };
  const axisScales = {
    x: {
      title: specColumns.x && specColumns.x.name
    },
    y,
    z: {
      title: specColumns.z && specColumns.z.name
    }
  };
  const layouts = [{
    layoutClass: _band.Band,
    props: bandProps
  }];

  if (insight.totalStyle === 'sum-strip-percent') {
    y.aggregate = 'percent';
    y.title = language.percent;
    const stripProps = {
      addPercentageScale: true,
      sortOrder: 'descending',
      orientation: 'vertical',
      size: specColumns.size,
      sort: specColumns.sort,
      z: specColumns.z
    };
    layouts.push({
      layoutClass: _strip.Strip,
      props: stripProps
    });
  } else {
    const aggProps = {
      niceScale: true,
      dock: 'bottom',
      globalAggregateMaxExtentSignal: 'aggMaxExtent',
      globalAggregateMaxExtentScaledSignal: 'aggMaxExtentScaled',
      sumBy: specColumns.size,
      showAxes: true
    };
    layouts.push({
      layoutClass: _aggregateContainer.AggregateContainer,
      props: aggProps
    });

    switch (insight.totalStyle) {
      case 'sum-treemap':
        {
          y.aggregate = 'sum';
          y.title = language.sum;
          const treemapProps = {
            corner: 'bottom-left',
            size: specColumns.size,
            treeMapMethod: specViewOptions.language.treeMapMethod,
            z: specColumns.z
          };
          layouts.push({
            layoutClass: _treemap.Treemap,
            props: treemapProps
          });
          break;
        }

      case 'sum-strip':
        {
          y.aggregate = 'sum';
          y.title = language.sum;
          const stripProps = {
            sortOrder: 'descending',
            orientation: 'vertical',
            size: specColumns.size,
            sort: specColumns.sort,
            z: specColumns.z
          };
          layouts.push({
            layoutClass: _strip.Strip,
            props: stripProps
          });
          break;
        }

      case 'count-strip':
        {
          y.aggregate = 'count';
          y.title = language.count;
          const stripProps = {
            sortOrder: 'descending',
            orientation: 'vertical',
            sort: specColumns.sort,
            z: specColumns.z
          };
          layouts.push({
            layoutClass: _strip.Strip,
            props: stripProps
          });
          break;
        }

      default:
        {
          y.aggregate = 'count';
          y.title = language.count;
          const squareProps = {
            sortBy: specColumns.sort,
            fillDirection: 'right-up',
            z: specColumns.z,
            maxGroupedUnits: aggProps.globalAggregateMaxExtentSignal,
            maxGroupedFillSize: aggProps.globalAggregateMaxExtentScaledSignal
          };
          layouts.push({
            layoutClass: _square.Square,
            props: squareProps
          });
          break;
        }
    }
  }

  return {
    axisScales,
    layouts,
    specCapabilities: {
      countsAndSums: true,
      percentage: true,
      roles: [{
        role: 'x',
        binnable: true,
        axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
        signals: [_constants.SignalNames.XBins]
      }, {
        role: 'z',
        allowNone: true
      }, {
        role: 'color',
        allowNone: true
      }, {
        role: 'sort',
        allowNone: true
      }, {
        role: 'size',
        allowNone: _size.allowNoneForSize,
        excludeCategoric: true,
        signals: [_constants.SignalNames.TreeMapMethod]
      }, {
        role: 'facet',
        allowNone: true,
        signals: [_constants.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [_constants.SignalNames.FacetVBins]
      }]
    }
  };
}
},{"../constants":"kNZP","../defaults":"visW","../layouts/aggregateContainer":"UF7t","../layouts/band":"xuzw","../layouts/square":"Jhnx","../layouts/strip":"vr0D","../layouts/treemap":"utMY","../size":"a0oX"}],"xftz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregateSquare = void 0;

var _layout = require("./layout");

var _expr = require("../expr");

var _scope = require("../scope");

var _selection = require("../selection");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
class AggregateSquare extends _layout.Layout {
  constructor(props) {
    super(props);
    this.props = props;
    const a = this.props.aggregation;
    const p = this.prefix = `agg_${this.id}`;
    this.names = {
      barCount: `${p}_count`,
      aggregateField: `${p}_aggregate_value`,
      globalAggregateExtentSignal: `${p}_${a}_extent`,
      extentData: `data_${p}_extent`
    };
  }

  build() {
    const {
      names,
      props
    } = this;
    const {
      aggregation,
      globalScope,
      groupings,
      onBuild,
      parentScope
    } = props;
    const {
      sizeSignals
    } = parentScope;
    (0, _scope.addTransforms)(globalScope.data, Object.assign(Object.assign({}, this.getTransforms(aggregation, (0, _scope.getGroupBy)(groupings))), {
      as: [names.aggregateField]
    }), {
      type: 'extent',
      field: (0, _expr.safeFieldName)(names.aggregateField),
      signal: names.globalAggregateExtentSignal
    });
    const localAggregateMaxExtent = `datum[${JSON.stringify(names.aggregateField)}]`;
    const squareMaxSide = `min((${sizeSignals.layoutHeight}), (${sizeSignals.layoutWidth}))`;
    const squareMaxArea = `(${[squareMaxSide, squareMaxSide].join(' * ')})`;
    const shrinkRatio = `((${localAggregateMaxExtent}) / (${names.globalAggregateExtentSignal}[1]))`;
    const squareArea = `(${[squareMaxArea, shrinkRatio].join(' * ')})`;
    const squareSide = `sqrt(${squareArea})`;
    const localAggregateMaxExtentScaled = squareSide;
    onBuild && onBuild(localAggregateMaxExtent, localAggregateMaxExtentScaled);
    const offsets = {
      x: (0, _scope.addOffsets)(parentScope.offsets.x, `(${parentScope.offsets.w} - ${squareSide}) / 2`),
      y: (0, _scope.addOffsets)(parentScope.offsets.y, `(${parentScope.offsets.h} - ${squareSide}) / 2`),
      h: squareSide,
      w: squareSide
    };
    return {
      offsets,
      sizeSignals: {
        layoutHeight: null,
        layoutWidth: null
      },
      globalScales: {
        showAxes: false,
        scales: {}
      },
      encodingRuleMap: {
        y: [{
          test: (0, _selection.testForCollapseSelection)(),
          signal: offsets.y
        }],
        height: [{
          test: (0, _selection.testForCollapseSelection)(),
          value: 0
        }]
      }
    };
  }

  getTransforms(aggregation, groupby) {
    const trans = {
      type: 'joinaggregate',
      groupby: groupby.map(_expr.safeFieldName),
      ops: [aggregation]
    };

    if (aggregation === 'sum') {
      trans.fields = [this.props.sumBy.name].map(_expr.safeFieldName);
    }

    return trans;
  }

}

exports.AggregateSquare = AggregateSquare;
},{"./layout":"GfLt","../expr":"IeV1","../scope":"Nfxo","../selection":"inPN"}],"PDD1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _constants = require("../constants");

var _defaults = require("../defaults");

var _aggregateSquare = require("../layouts/aggregateSquare");

var _band = require("../layouts/band");

var _square = require("../layouts/square");

var _strip = require("../layouts/strip");

var _treemap = require("../layouts/treemap");

var _size = require("../size");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function _default(specContext) {
  const {
    insight,
    specColumns,
    specViewOptions
  } = specContext;
  const axisScales = {
    x: {
      title: specColumns.x && specColumns.x.name
    },
    y: {
      title: specColumns.y && specColumns.y.name
    },
    z: {
      title: specColumns.z && specColumns.z.name
    }
  };
  const hBandProps = {
    excludeEncodingRuleMap: true,
    orientation: 'horizontal',
    groupby: {
      column: specColumns.y,
      defaultBins: _defaults.defaultBins,
      maxbinsSignalName: _constants.SignalNames.YBins,
      maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
      maxbins: _defaults.maxbins
    },
    minBandWidth: _defaults.minBarBandWidth,
    showAxes: true
  };
  const vBandProps = {
    excludeEncodingRuleMap: true,
    orientation: 'vertical',
    groupby: {
      column: specColumns.x,
      defaultBins: _defaults.defaultBins,
      maxbinsSignalName: _constants.SignalNames.XBins,
      maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
      maxbins: _defaults.maxbins
    },
    minBandWidth: _defaults.minBarBandWidth,
    showAxes: true
  };
  const aggProps = {
    onBuild: null,
    aggregation: null,
    sumBy: specColumns.size
  };
  const layouts = [{
    layoutClass: _band.Band,
    props: vBandProps
  }, {
    layoutClass: _band.Band,
    props: hBandProps
  }, {
    layoutClass: _aggregateSquare.AggregateSquare,
    props: aggProps
  }];

  switch (insight.totalStyle) {
    case 'sum-treemap':
      {
        aggProps.aggregation = 'sum';
        const treemapProps = {
          corner: 'bottom-left',
          size: specColumns.size,
          treeMapMethod: specViewOptions.language.treeMapMethod,
          z: specColumns.z
        };
        layouts.push({
          layoutClass: _treemap.Treemap,
          props: treemapProps
        });
        break;
      }

    case 'sum-strip':
      {
        aggProps.aggregation = 'sum';
        const stripProps = {
          sortOrder: 'ascending',
          orientation: 'vertical',
          size: specColumns.size,
          sort: specColumns.sort,
          z: specColumns.z
        };
        layouts.push({
          layoutClass: _strip.Strip,
          props: stripProps
        });
        break;
      }

    case 'count-strip':
      {
        aggProps.aggregation = 'count';
        const stripProps = {
          sortOrder: 'ascending',
          orientation: 'vertical',
          sort: specColumns.sort,
          z: specColumns.z
        };
        layouts.push({
          layoutClass: _strip.Strip,
          props: stripProps
        });
        break;
      }

    default:
      {
        aggProps.aggregation = 'count';
        const squareProps = {
          sortBy: specColumns.sort,
          fillDirection: 'right-down',
          z: specColumns.z,
          maxGroupedUnits: null,
          maxGroupedFillSize: null
        };

        aggProps.onBuild = (aggMaxExtent, aggMaxExtentScaled) => {
          squareProps.maxGroupedUnits = aggMaxExtent;
          squareProps.maxGroupedFillSize = aggMaxExtentScaled;
        };

        layouts.push({
          layoutClass: _square.Square,
          props: squareProps
        });
        break;
      }
  }

  return {
    axisScales,
    layouts,
    specCapabilities: {
      countsAndSums: true,
      roles: [{
        role: 'x',
        binnable: true,
        axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
        signals: [_constants.SignalNames.XBins]
      }, {
        role: 'y',
        binnable: true,
        axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
        signals: [_constants.SignalNames.YBins]
      }, {
        role: 'z',
        allowNone: true
      }, {
        role: 'color',
        allowNone: true
      }, {
        role: 'sort',
        allowNone: true
      }, {
        role: 'size',
        allowNone: _size.allowNoneForSize,
        excludeCategoric: true,
        signals: [_constants.SignalNames.TreeMapMethod]
      }, {
        role: 'facet',
        allowNone: true,
        signals: [_constants.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [_constants.SignalNames.FacetVBins]
      }]
    }
  };
}
},{"../constants":"kNZP","../defaults":"visW","../layouts/aggregateSquare":"xftz","../layouts/band":"xuzw","../layouts/square":"Jhnx","../layouts/strip":"vr0D","../layouts/treemap":"utMY","../size":"a0oX"}],"ys7l":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _constants = require("../constants");

var _square = require("../layouts/square");

function _default(specContext) {
  const {
    specColumns
  } = specContext;
  const squareProps = {
    sortBy: specColumns.sort,
    fillDirection: 'right-down',
    z: specColumns.z,
    collapseYHeight: true
  };
  const axisScales = {
    z: {
      title: specColumns.z && specColumns.z.name
    }
  };
  return {
    axisScales,
    layouts: [{
      layoutClass: _square.Square,
      props: squareProps
    }],
    specCapabilities: {
      countsAndSums: false,
      roles: [{
        role: 'z',
        allowNone: true
      }, {
        role: 'color',
        allowNone: true
      }, {
        role: 'sort',
        allowNone: true
      }, {
        role: 'facet',
        allowNone: true,
        signals: [_constants.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [_constants.SignalNames.FacetVBins]
      }]
    }
  };
}
},{"../constants":"kNZP","../layouts/square":"Jhnx"}],"WwUS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scatter = void 0;

var _layout = require("./layout");

var _constants = require("../constants");

var _defaults = require("../defaults");

var _expr = require("../expr");

var _scales = require("../scales");

var _scope = require("../scope");

var _selection = require("../selection");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
class Scatter extends _layout.Layout {
  constructor(props) {
    super(props);
    this.props = props;
    const p = this.prefix = `scatter_${this.id}`;
    this.names = {
      aggregateData: `data_${p}_aggregate`,
      markData: `data_${p}_mark`,
      sizeExtent: `${p}_sizeExtent`,
      sizeRange: `${p}_sizeRange`,
      sizeScale: `${p}_sizeScale`,
      xScale: `scale_${p}_x`,
      yScale: `scale_${p}_y`,
      zScale: `scale_${p}_z`
    };
  }

  build() {
    const {
      names,
      prefix,
      props
    } = this;
    const {
      globalScope,
      parentScope,
      scatterPointScaleDisplay,
      size,
      x,
      y,
      z,
      zGrounded
    } = props;
    const qsize = size && size.quantitative && size;
    (0, _scope.addSignals)(globalScope.scope, {
      name: _constants.SignalNames.PointScale,
      value: 5,
      bind: {
        name: scatterPointScaleDisplay,
        debounce: 50,
        input: 'range',
        min: 1,
        max: 10,
        step: 1
      }
    }, {
      name: _constants.SignalNames.ZGrounded,
      value: false,
      bind: {
        name: zGrounded,
        input: 'checkbox'
      }
    });

    if (qsize) {
      (0, _scope.addTransforms)(globalScope.data, {
        type: 'extent',
        field: (0, _expr.safeFieldName)(qsize.name),
        signal: names.sizeExtent
      });
      (0, _scope.addScales)(globalScope.scope, {
        name: names.sizeScale,
        type: 'linear',
        domain: [0, {
          signal: `${names.sizeExtent}[1]`
        }],
        range: [0, {
          signal: names.sizeRange
        }]
      });
      (0, _scope.addSignals)(globalScope.scope, {
        name: names.sizeRange,
        update: `min(${parentScope.sizeSignals.layoutHeight}, ${parentScope.sizeSignals.layoutWidth}) / ${_defaults.scatterSizedDiv}`
      });
    }

    (0, _scope.addData)(globalScope.scope, {
      name: names.markData,
      source: globalScope.markDataName,
      transform: [x, y, z].map(c => {
        if (!c || !c.quantitative) return;
        const t = {
          type: 'filter',
          expr: `isValid(datum[${JSON.stringify(c.name)}])`
        };
        return t;
      }).filter(Boolean)
    });
    globalScope.setMarkDataName(names.markData);
    const globalScales = {
      showAxes: true,
      scales: {}
    };
    const zValue = z ? `scale(${JSON.stringify(names.zScale)}, datum[${JSON.stringify(z.name)}])` : null;
    const sizeValueSignal = qsize ? `scale(${JSON.stringify(names.sizeScale)}, datum[${JSON.stringify(qsize.name)}]) * ${_constants.SignalNames.PointScale}` : _constants.SignalNames.PointScale;
    const update = Object.assign({
      height: [{
        test: (0, _selection.testForCollapseSelection)(),
        value: 0
      }, {
        signal: sizeValueSignal
      }],
      width: {
        signal: sizeValueSignal
      }
    }, z && {
      z: [{
        test: (0, _selection.testForCollapseSelection)(),
        value: 0
      }, {
        signal: `${_constants.SignalNames.ZGrounded} ? 0 : ${zValue}`
      }],
      depth: [{
        test: (0, _selection.testForCollapseSelection)(),
        value: 0
      }, {
        signal: `${_constants.SignalNames.ZGrounded} ? ${zValue} : ${sizeValueSignal}`
      }]
    });
    const columnSignals = [{
      column: x,
      xyz: 'x',
      scaleName: names.xScale,
      reverse: false,
      signal: parentScope.sizeSignals.layoutWidth
    }, {
      column: y,
      xyz: 'y',
      scaleName: names.yScale,
      reverse: true,
      signal: parentScope.sizeSignals.layoutHeight
    }, {
      column: z,
      xyz: 'z',
      scaleName: names.zScale,
      reverse: false,
      signal: `(${globalScope.zSize}) * ${_constants.SignalNames.ZProportion}`
    }];
    columnSignals.forEach(cs => {
      const {
        column,
        reverse,
        scaleName,
        signal,
        xyz
      } = cs;
      if (!column) return;
      let scale;

      if (column.quantitative) {
        scale = (0, _scales.linearScale)(scaleName, globalScope.data.name, column.name, [0, {
          signal
        }], reverse, false);
      } else {
        scale = (0, _scales.pointScale)(scaleName, globalScope.data.name, [0, {
          signal
        }], column.name, reverse);
      }

      globalScales.scales[xyz] = scale;
    });
    const mark = {
      name: prefix,
      type: 'rect',
      from: {
        data: globalScope.markDataName
      },
      encode: {
        update
      }
    };
    (0, _scope.addMarks)(globalScope.markGroup, mark);
    return {
      offsets: {
        x: (0, _scope.addOffsets)(parentScope.offsets.x, `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(x.name)}])`),
        y: (0, _scope.addOffsets)(parentScope.offsets.y, `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(y.name)}]) - ${sizeValueSignal}`),
        h: sizeValueSignal,
        w: sizeValueSignal
      },
      sizeSignals: {
        layoutHeight: null,
        layoutWidth: null
      },
      globalScales,
      mark,
      encodingRuleMap: {
        y: [{
          test: (0, _selection.testForCollapseSelection)(),
          signal: (0, _scope.addOffsets)(parentScope.offsets.y, parentScope.sizeSignals.layoutHeight)
        }]
      }
    };
  }

}

exports.Scatter = Scatter;
},{"./layout":"GfLt","../constants":"kNZP","../defaults":"visW","../expr":"IeV1","../scales":"mxMR","../scope":"Nfxo","../selection":"inPN"}],"mVfN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _scatter = require("../layouts/scatter");

var _constants = require("../constants");

function _default(specContext) {
  const {
    specColumns,
    specViewOptions
  } = specContext;
  const scatterProps = {
    x: specColumns.x,
    y: specColumns.y,
    z: specColumns.z,
    size: specColumns.size,
    scatterPointScaleDisplay: specViewOptions.language.scatterPointScale,
    zGrounded: specViewOptions.language.zGrounded
  };
  const axisScales = {
    x: {
      title: specColumns.x && specColumns.x.name
    },
    y: {
      title: specColumns.y && specColumns.y.name
    },
    z: {
      title: specColumns.z && specColumns.z.name
    }
  };
  return {
    axisScales,
    layouts: [{
      layoutClass: _scatter.Scatter,
      props: scatterProps
    }],
    specCapabilities: {
      countsAndSums: false,
      roles: [{
        role: 'x',
        axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact'
      }, {
        role: 'y',
        axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact'
      }, {
        role: 'z',
        allowNone: true
      }, {
        role: 'color',
        allowNone: true
      }, {
        role: 'size',
        excludeCategoric: true,
        allowNone: true
      }, {
        role: 'facet',
        allowNone: true,
        signals: [_constants.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [_constants.SignalNames.FacetVBins]
      }],
      signals: [_constants.SignalNames.PointScale, _constants.SignalNames.ZGrounded]
    }
  };
}
},{"../layouts/scatter":"WwUS","../constants":"kNZP"}],"ESPr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stack = void 0;

var _layout = require("./layout");

var _expr = require("../expr");

var _scope = require("../scope");

var _selection = require("../selection");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
class Stack extends _layout.Layout {
  constructor(props) {
    super(props);
    this.props = props;
    const p = this.prefix = `stack_${this.id}`;
    this.names = {
      cube: `${p}_cube`,
      globalDataName: `data_${p}_count`,
      globalExtent: `${p}_global_extent`,
      levelDataName: `data_${p}_level`,
      count: `${p}_count`,
      stack0: `${p}_stack0`,
      stack1: `${p}_stack1`,
      sequence: `data_${p}_sequence`,
      sides: `${p}_sides`,
      size: `${p}_size`,
      squared: `${p}_squared`,
      squaredExtent: `${p}_squared_extent`
    };
  }

  build() {
    const {
      names,
      props
    } = this;
    const {
      globalScope,
      groupings,
      parentScope,
      sort
    } = props;
    const {
      sizeSignals
    } = parentScope;
    (0, _scope.addTransforms)(globalScope.data, {
      type: 'joinaggregate',
      groupby: (0, _scope.getGroupBy)(groupings).map(_expr.safeFieldName),
      ops: ['count'],
      as: [names.count]
    }, {
      type: 'extent',
      field: names.count,
      signal: names.globalExtent
    }, Object.assign({
      type: 'stack',
      groupby: (0, _scope.getGroupBy)(groupings).map(_expr.safeFieldName),
      as: [names.stack0, names.stack1]
    }, sort && {
      sort: {
        field: (0, _expr.safeFieldName)(sort.name),
        order: 'ascending'
      }
    }));
    (0, _scope.addData)(globalScope.scope, {
      name: names.sequence,
      transform: [{
        type: 'sequence',
        start: 1,
        stop: {
          signal: `sqrt(${names.globalExtent}[1])`
        }
      }, {
        type: 'formula',
        expr: 'datum.data * datum.data',
        as: 'squared'
      }, {
        type: 'formula',
        expr: `ceil(${names.globalExtent}[1] / datum.squared)`,
        as: 'maxlevels'
      }, {
        type: 'formula',
        expr: `(${names.size} - (datum.data - 1) * datum.data) / datum.data`,
        as: 'side'
      }, {
        type: 'formula',
        expr: 'datum.side * datum.maxlevels + datum.maxlevels - 1',
        as: 'sidecubeheight'
      }, {
        type: 'formula',
        expr: `abs(${globalScope.zSize} - datum.sidecubeheight)`,
        as: 'heightmatch'
      }, {
        type: 'collect',
        sort: {
          field: 'heightmatch',
          order: 'ascending'
        }
      }, {
        type: 'window',
        ops: ['row_number']
      }, {
        type: 'filter',
        expr: 'datum.row_number === 1'
      }, {
        type: 'extent',
        field: 'squared',
        signal: names.squaredExtent
      }]
    });
    (0, _scope.addSignals)(globalScope.scope, {
      name: names.size,
      update: `min((${sizeSignals.layoutHeight}), (${sizeSignals.layoutWidth}))`
    }, {
      name: names.squared,
      update: `${names.squaredExtent}[0]`
    }, {
      name: names.sides,
      update: `sqrt(${names.squared})`
    }, {
      name: names.cube,
      update: `(${names.size} - (${names.sides} - 1)) / ${names.sides}`
    });
    const zLevel = `floor(datum[${JSON.stringify(names.stack0)}] / ${names.squared})`;
    const layerOrdinal = `(datum[${JSON.stringify(names.stack0)}] % ${names.squared})`;
    const cubeX = `(${layerOrdinal} % ${names.sides})`;
    const cubeY = `floor(${layerOrdinal} / ${names.sides})`;
    const groupX = `(${sizeSignals.layoutWidth} - ${names.size}) / 2`;
    const groupY = `(${sizeSignals.layoutHeight} - ${names.size}) / 2`;
    const offsets = {
      x: (0, _scope.addOffsets)(parentScope.offsets.x, groupX, `${cubeX} * (${names.cube} + 1)`),
      y: (0, _scope.addOffsets)(parentScope.offsets.y, groupY, `${cubeY} * (${names.cube} + 1)`),
      h: names.size,
      w: names.size
    };
    const mark = {
      type: 'rect',
      from: {
        data: this.names.levelDataName
      },
      encode: {
        update: {
          z: {
            signal: `${zLevel} * (${names.cube} + 1)`
          },
          height: {
            signal: names.cube
          },
          width: {
            signal: names.cube
          },
          depth: {
            signal: names.cube
          }
        }
      }
    };
    (0, _scope.addMarks)(globalScope.markGroup, mark);
    return {
      offsets,
      mark,
      sizeSignals: {
        layoutHeight: names.size,
        layoutWidth: names.size
      },
      globalScales: {
        showAxes: false,
        scales: {}
      },
      encodingRuleMap: {
        y: [{
          test: (0, _selection.testForCollapseSelection)(),
          signal: parentScope.offsets.y
        }],
        z: [{
          test: (0, _selection.testForCollapseSelection)(),
          value: 0
        }],
        depth: [{
          test: (0, _selection.testForCollapseSelection)(),
          value: 0
        }],
        height: [{
          test: (0, _selection.testForCollapseSelection)(),
          value: 0
        }]
      }
    };
  }

}

exports.Stack = Stack;
},{"./layout":"GfLt","../expr":"IeV1","../scope":"Nfxo","../selection":"inPN"}],"Fc39":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _band = require("../layouts/band");

var _defaults = require("../defaults");

var _constants = require("../constants");

var _stack = require("../layouts/stack");

function _default(specContext) {
  const {
    specColumns
  } = specContext;
  const axisScales = {
    x: {
      title: specColumns.x && specColumns.x.name
    },
    y: {
      title: specColumns.y && specColumns.y.name
    }
  };
  const hBandProps = {
    excludeEncodingRuleMap: true,
    orientation: 'horizontal',
    groupby: {
      column: specColumns.y,
      defaultBins: _defaults.defaultBins,
      maxbinsSignalName: _constants.SignalNames.YBins,
      maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
      maxbins: _defaults.maxbins
    },
    minBandWidth: _defaults.minBarBandWidth,
    showAxes: true
  };
  const vBandProps = {
    excludeEncodingRuleMap: true,
    orientation: 'vertical',
    groupby: {
      column: specColumns.x,
      defaultBins: _defaults.defaultBins,
      maxbinsSignalName: _constants.SignalNames.XBins,
      maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
      maxbins: _defaults.maxbins
    },
    minBandWidth: _defaults.minBarBandWidth,
    showAxes: true
  };
  const stackProps = {
    sort: specColumns.sort
  };
  return {
    axisScales,
    customZScale: true,
    layouts: [{
      layoutClass: _band.Band,
      props: vBandProps
    }, {
      layoutClass: _band.Band,
      props: hBandProps
    }, {
      layoutClass: _stack.Stack,
      props: stackProps
    }],
    specCapabilities: {
      countsAndSums: false,
      roles: [{
        role: 'x',
        binnable: true,
        axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
        signals: [_constants.SignalNames.XBins]
      }, {
        role: 'y',
        binnable: true,
        axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
        signals: [_constants.SignalNames.YBins]
      }, {
        role: 'color',
        allowNone: true
      }, {
        role: 'sort',
        allowNone: true
      }, {
        role: 'facet',
        allowNone: true,
        signals: [_constants.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [_constants.SignalNames.FacetVBins]
      }]
    }
  };
}
},{"../layouts/band":"xuzw","../defaults":"visW","../constants":"kNZP","../layouts/stack":"ESPr"}],"Z0w5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _aggregateContainer = require("../layouts/aggregateContainer");

var _constants = require("../constants");

var _strip = require("../layouts/strip");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function _default(specContext) {
  const {
    specColumns
  } = specContext;
  const stripProps = {
    sortOrder: 'ascending',
    orientation: 'vertical',
    size: specColumns.size,
    sort: specColumns.sort,
    z: specColumns.z
  };
  const axisScales = {
    z: {
      title: specColumns.z && specColumns.z.name
    }
  };
  const layouts = [];

  if (specColumns.facet) {
    axisScales.y = {
      title: null,
      aggregate: specColumns.size ? 'sum' : 'count'
    };
    const globalAggregateMaxExtentScaledSignal = 'globalAggregateMaxExtentScaledSignal';
    const globalAggregateMaxExtentSignal = 'globalAggregateMaxExtentSignal';
    const props = {
      dock: 'top',
      niceScale: false,
      globalAggregateMaxExtentScaledSignal,
      globalAggregateMaxExtentSignal,
      sumBy: specColumns.size,
      showAxes: false
    };
    layouts.push({
      layoutClass: _aggregateContainer.AggregateContainer,
      props
    });
  }

  layouts.push({
    layoutClass: _strip.Strip,
    props: stripProps
  });
  return {
    axisScales,
    layouts,
    specCapabilities: {
      countsAndSums: false,
      roles: [{
        role: 'size',
        allowNone: true,
        excludeCategoric: true
      }, {
        role: 'z',
        allowNone: true
      }, {
        role: 'color',
        allowNone: true
      }, {
        role: 'sort',
        allowNone: true
      }, {
        role: 'facet',
        allowNone: true,
        signals: [_constants.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [_constants.SignalNames.FacetVBins]
      }]
    }
  };
}
},{"../layouts/aggregateContainer":"UF7t","../constants":"kNZP","../layouts/strip":"vr0D"}],"GcJ6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _constants = require("../constants");

var _treemap = require("../layouts/treemap");

var _aggregateContainer = require("../layouts/aggregateContainer");

function _default(specContext) {
  const {
    specColumns,
    specViewOptions
  } = specContext;
  const treemapProps = {
    corner: 'top-left',
    group: specColumns.group,
    size: specColumns.size,
    treeMapMethod: specViewOptions.language.treeMapMethod,
    z: specColumns.z
  };
  const axisScales = {
    z: {
      title: specColumns.z && specColumns.z.name
    }
  };
  const layouts = [];

  if (specColumns.facet) {
    axisScales.y = {
      title: null,
      aggregate: 'sum'
    };
    const globalAggregateMaxExtentScaledSignal = 'globalAggregateMaxExtentScaledSignal';
    const globalAggregateMaxExtentSignal = 'globalAggregateMaxExtentSignal';
    const props = {
      dock: 'top',
      niceScale: false,
      globalAggregateMaxExtentScaledSignal,
      globalAggregateMaxExtentSignal,
      sumBy: specColumns.size,
      showAxes: false
    };
    layouts.push({
      layoutClass: _aggregateContainer.AggregateContainer,
      props
    });
  }

  layouts.push({
    layoutClass: _treemap.Treemap,
    props: treemapProps
  });
  return {
    axisScales,
    layouts,
    specCapabilities: {
      countsAndSums: false,
      roles: [{
        role: 'size',
        excludeCategoric: true
      }, {
        role: 'group',
        allowNone: true
      }, {
        role: 'z',
        allowNone: true
      }, {
        role: 'color',
        allowNone: true
      }, {
        role: 'facet',
        allowNone: true,
        signals: [_constants.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [_constants.SignalNames.FacetVBins]
      }],
      signals: [_constants.SignalNames.TreeMapMethod]
    }
  };
}
},{"../constants":"kNZP","../layouts/treemap":"utMY","../layouts/aggregateContainer":"UF7t"}],"Zzpz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGlobalAxes = addGlobalAxes;

var _constants = require("./constants");

var _defaults = require("./defaults");

var _scope = require("./scope");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function addGlobalAxes(props) {
  const {
    axesOffsets,
    axisScales,
    axesScopes,
    axesTitlePadding,
    allGlobalScales,
    globalScope,
    labelBaseline,
    plotOffsetSignals,
    specColumns,
    specViewOptions
  } = props;
  const {
    scope
  } = globalScope;
  allGlobalScales.forEach(globalScales => {
    const {
      scales
    } = globalScales;

    for (let s in scales) {
      let scale = scales[s];

      if (scale) {
        (0, _scope.addScales)(scope, scale);

        if (globalScales.showAxes && axisScales && s !== 'z') {
          let axisScale = axisScales[s];

          if (axisScale) {
            const lineColor = specViewOptions.colors.axisLine;
            const horizontal = s === 'x';
            const column = specColumns[s] || {
              quantitative: true
            };
            const title = axisScale.title;
            const props = {
              title,
              horizontal,
              column,
              specViewOptions,
              lineColor,
              titlePadding: axesTitlePadding[s],
              labelBaseline: labelBaseline[s]
            };
            axesScopes['main'].forEach(a => (0, _scope.addAxes)(a.scope, createAxis(Object.assign(Object.assign({}, props), {
              scale: a.scale || scale.name,
              showTitle: a.title,
              showLabels: a.labels,
              showLines: a.lines
            }))));

            if (axesScopes[s]) {
              axesScopes[s].forEach(a => (0, _scope.addAxes)(a.scope, createAxis(Object.assign(Object.assign({}, props), {
                scale: a.scale || scale.name,
                showTitle: a.title,
                showLabels: a.labels,
                showLines: a.lines
              }))));
            }

            if (plotOffsetSignals[s] && axesOffsets[s]) {
              const plotOffsetSignal = plotOffsetSignals[s];
              plotOffsetSignal.update = `${axesOffsets[s]}`;
            }
          }
        }
      }
    }
  });
}

function createAxis(props) {
  const {
    column,
    horizontal,
    labelBaseline,
    lineColor,
    scale,
    showLabels,
    showTitle,
    showLines,
    specViewOptions,
    title,
    titlePadding
  } = props;
  const axis = Object.assign(Object.assign(Object.assign(Object.assign({
    scale,
    orient: horizontal ? 'bottom' : 'left',
    domain: showLines,
    ticks: showLines
  }, showLines && {
    domainColor: lineColor,
    tickColor: lineColor,
    tickSize: specViewOptions.tickSize
  }), showTitle && {
    title,
    titleAlign: horizontal ? 'left' : 'right',
    titleAngle: {
      signal: horizontal ? _constants.SignalNames.TextAngleX : _constants.SignalNames.TextAngleY
    },
    titleColor: specViewOptions.colors.axisText,
    titleFontSize: {
      signal: _constants.SignalNames.TextTitleSize
    },
    titleLimit: _defaults.axesTitleLimit,
    titlePadding
  }), {
    labels: showLabels
  }), showLabels && {
    labelAlign: horizontal ? 'left' : 'right',
    labelBaseline,
    labelAngle: {
      signal: horizontal ? _constants.SignalNames.TextAngleX : _constants.SignalNames.TextAngleY
    },
    labelColor: specViewOptions.colors.axisText,
    labelFontSize: {
      signal: _constants.SignalNames.TextSize
    },
    labelLimit: _defaults.axesLabelLimit
  });

  if (column.quantitative) {
    axis.format = '~r';
  }

  return axis;
}
},{"./constants":"kNZP","./defaults":"visW","./scope":"Nfxo"}],"xnEZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLegends = getLegends;

function legend(column, fill) {
  const legend = {
    orient: 'none',
    title: column.name,
    fill,
    encode: {
      symbols: {
        update: {
          shape: {
            value: 'square'
          }
        }
      }
    }
  };

  if (column.quantitative) {
    legend.type = 'symbol';
    legend.format = '~r';
  }

  return legend;
}

function getLegends(context, fill) {
  const {
    specColumns,
    insight
  } = context;

  if (specColumns.color && !insight.hideLegend && !insight.directColor && !specColumns.color.isColorData) {
    return [legend(specColumns.color, fill)];
  }
}
},{}],"uI10":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topLookup = topLookup;

var _constants = require("./constants");

var _expr = require("./expr");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function topLookup(column, count, source, legend, lookupName, fieldName, indexName) {
  const data = [{
    name: lookupName,
    source,
    transform: [{
      type: 'aggregate',
      groupby: [(0, _expr.safeFieldName)(column.name)]
    }, {
      type: 'window',
      ops: ['count'],
      as: [indexName]
    }, {
      type: 'filter',
      expr: `datum[${JSON.stringify(indexName)}] <= ${count}`
    }]
  }, {
    name: legend,
    source,
    transform: [{
      type: 'lookup',
      from: lookupName,
      key: (0, _expr.safeFieldName)(column.name),
      fields: [column.name].map(_expr.safeFieldName),
      values: [column.name].map(_expr.safeFieldName),
      as: [fieldName]
    }, {
      type: 'formula',
      expr: `datum[${JSON.stringify(fieldName)}] == null ? '${_constants.Other}' : datum[${JSON.stringify(fieldName)}]`,
      as: fieldName
    }]
  }];
  return data;
}
},{"./constants":"kNZP","./expr":"IeV1"}],"MIbS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addColor = addColor;

var _scope = require("./scope");

var _scales = require("./scales");

var _signals = require("./signals");

var _constants = require("./constants");

var _legends = require("./legends");

var _top = require("./top");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function addColor(props) {
  const {
    colorReverseSignalName,
    dataName,
    scope,
    legendDataName,
    scaleName,
    specContext,
    topLookupName
  } = props;
  let colorDataName = dataName;
  const {
    insight,
    specColumns,
    specViewOptions
  } = specContext;
  const legends = (0, _legends.getLegends)(specContext, scaleName);

  if (legends) {
    scope.legends = legends;
  }

  const categoricalColor = specColumns.color && !specColumns.color.quantitative;

  if (categoricalColor) {
    (0, _scope.addData)(scope, ...(0, _top.topLookup)(specColumns.color, specViewOptions.maxLegends, dataName, legendDataName, topLookupName, _constants.FieldNames.TopColor, _constants.FieldNames.TopIndex));
    colorDataName = legendDataName;
  }

  if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
    if (specColumns.color.quantitative) {
      (0, _scope.addScales)(scope, (0, _scales.binnableColorScale)(scaleName, insight.colorBin, dataName, specColumns.color.name, insight.scheme));
    } else {
      (0, _scope.addScales)(scope, {
        name: scaleName,
        type: 'ordinal',
        domain: {
          data: colorDataName,
          field: _constants.FieldNames.TopColor,
          sort: true
        },
        range: {
          scheme: insight.scheme || _constants.ColorScaleNone
        },
        reverse: {
          signal: colorReverseSignalName
        }
      });
    }
  }

  (0, _scope.addSignals)(scope, (0, _signals.colorBinCountSignal)(specContext), (0, _signals.colorReverseSignal)(specContext));
  return {
    topColorField: _constants.FieldNames.TopColor,
    colorDataName
  };
}
},{"./scope":"Nfxo","./scales":"mxMR","./signals":"TTOO","./constants":"kNZP","./legends":"xnEZ","./top":"uI10"}],"keY5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayBin = displayBin;
exports.serializeAsVegaExpression = serializeAsVegaExpression;

function displayBin(bin) {
  const val = index => `datum[${JSON.stringify(bin.fields[index])}]`;

  return bin.discreteColumn.column.quantitative ? `format(${val(0)}, '~r') + ' - ' + format(${val(1)}, '~r')` : val(0);
}

function obj(nameValues, clause) {
  if (clause) {
    nameValues = [clause, ...nameValues];
  }

  return `{${nameValues.join()}}`;
}

function serializeAsVegaExpression(bin, firstFieldName, lastFieldName, clause) {
  if (bin.discreteColumn.column.quantitative) {
    const low = [`name:${JSON.stringify(bin.discreteColumn.column.name)}`, 'operator:\'>=\'', `value:datum[${JSON.stringify(bin.fields[0])}]`];
    const high = ['clause:\'&&\'', `name:${JSON.stringify(bin.discreteColumn.column.name)}`, 'operator:\'<\'', `value:datum[${JSON.stringify(bin.fields[1])}]`];
    return obj([`expressions:[ datum[${JSON.stringify(firstFieldName)}] ? null : ${obj(low)}, datum[${JSON.stringify(lastFieldName)}] ? null : ${obj(high)}]`], clause);
  } else {
    const exact = [`name:${JSON.stringify(bin.discreteColumn.column.name)}`, 'operator:\'==\'', `value:datum[${JSON.stringify(bin.fields[0])}]`];
    return obj([`expressions:[${obj(exact)}]`], clause);
  }
}
},{}],"xF0Y":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFacetColRowTitles = addFacetColRowTitles;
exports.addFacetCellTitles = addFacetCellTitles;
exports.addFacetAxesGroupMarks = addFacetAxesGroupMarks;
exports.facetRowHeaderFooter = facetRowHeaderFooter;
exports.facetColumnHeaderFooter = facetColumnHeaderFooter;

var _scope = require("./scope");

var _constants = require("./constants");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function addFacetColRowTitles(globalScope, colTitleSource, rowTitleSource, sizeSignals, axisTextColor) {
  const titleSignal = `parent[${JSON.stringify(_constants.FieldNames.FacetTitle)}]`;
  const index = `datum[${JSON.stringify(_constants.FieldNames.Ordinal)}] - 1`;
  const col = facetColumnHeaderFooter(colTitleSource.dataName, sizeSignals, index);
  const row = facetRowHeaderFooter(rowTitleSource.dataName, sizeSignals, index);
  (0, _scope.addMarks)(globalScope, col.header, row.footer);
  (0, _scope.addMarks)(col.header, {
    type: 'text',
    encode: {
      enter: {
        align: {
          value: 'center'
        },
        baseline: {
          value: 'middle'
        },
        fill: {
          value: axisTextColor
        }
      },
      update: {
        metaData: {
          signal: `{search: parent[${JSON.stringify(_constants.FieldNames.FacetSearch)}]}`
        },
        x: {
          signal: `${sizeSignals.layoutWidth} / 2`
        },
        limit: {
          signal: sizeSignals.layoutWidth
        },
        fontSize: {
          signal: _constants.SignalNames.TextSize
        },
        text: {
          signal: titleSignal
        }
      }
    }
  });
  (0, _scope.addMarks)(row.footer, {
    type: 'text',
    encode: {
      enter: {
        align: {
          value: 'left'
        },
        baseline: {
          value: 'middle'
        },
        fill: {
          value: axisTextColor
        }
      },
      update: {
        metaData: {
          signal: `{search: parent[${JSON.stringify(_constants.FieldNames.FacetSearch)}]}`
        },
        y: {
          signal: `${sizeSignals.layoutHeight} / 2`
        },
        limit: {
          signal: _constants.SignalNames.PlotOffsetRight
        },
        fontSize: {
          signal: _constants.SignalNames.TextSize
        },
        text: {
          signal: titleSignal
        }
      }
    }
  });
}

function addFacetCellTitles(scope, sizeSignals, axisTextColor) {
  (0, _scope.addMarks)(scope, {
    type: 'text',
    encode: {
      enter: {
        align: {
          value: 'center'
        },
        baseline: {
          value: 'bottom'
        },
        fill: {
          value: axisTextColor
        }
      },
      update: {
        metaData: {
          signal: `{search: parent[${JSON.stringify(_constants.FieldNames.FacetSearch)}]}`
        },
        x: {
          signal: `(${sizeSignals.layoutWidth}) / 2`
        },
        text: {
          signal: `parent[${JSON.stringify(_constants.FieldNames.FacetTitle)}]`
        },
        fontSize: {
          signal: _constants.SignalNames.TextSize
        },
        limit: {
          signal: sizeSignals.layoutWidth
        },
        y: {
          signal: `-${_constants.SignalNames.FacetPaddingTop} / 2`
        }
      }
    }
  });
}

function addFacetAxesGroupMarks(props) {
  const {
    colSeqName,
    colTitleScaleName,
    globalScope,
    facetScope,
    plotHeightOut,
    plotScope,
    plotWidthOut,
    rowSeqName,
    rowTitleScaleName
  } = props;
  const {
    sizeSignals
  } = facetScope;
  const colSequence = createSequence(colSeqName, sizeSignals.colCount);
  const rowSequence = createSequence(rowSeqName, sizeSignals.rowCount);
  const index = 'datum.data';
  const col = facetColumnHeaderFooter(colSeqName, sizeSignals, index);
  const row = facetRowHeaderFooter(rowSeqName, sizeSignals, index);
  (0, _scope.addData)(globalScope, colSequence, rowSequence);
  (0, _scope.addMarks)(globalScope, col.footer, row.header);
  const colTitleScale = {
    type: 'linear',
    name: colTitleScaleName,
    domain: [0, 1],
    range: [0, {
      signal: plotWidthOut
    }]
  };
  const rowTitleScale = {
    type: 'linear',
    name: rowTitleScaleName,
    domain: [0, 1],
    range: [{
      signal: plotHeightOut
    }, 0]
  };
  (0, _scope.addScales)(globalScope, colTitleScale, rowTitleScale);
  const map = {
    main: [{
      scope: facetScope.facetScope,
      lines: true,
      labels: false,
      title: false
    }],
    x: [{
      scope: col.footer,
      lines: true,
      labels: true,
      title: false
    }, {
      scope: plotScope,
      scale: colTitleScaleName,
      lines: false,
      labels: false,
      title: true
    }],
    y: [{
      scope: row.header,
      lines: true,
      labels: true,
      title: false
    }, {
      scope: plotScope,
      scale: rowTitleScaleName,
      lines: false,
      labels: false,
      title: true
    }]
  };
  return map;
}

function facetRowHeaderFooter(data, sizeSignals, index) {
  const rowFn = xSignal => {
    return {
      type: 'group',
      from: {
        data
      },
      encode: {
        update: {
          x: {
            signal: xSignal
          },
          y: {
            signal: `${_constants.SignalNames.PlotOffsetTop} + ${_constants.SignalNames.FacetPaddingTop} + (${index}) * (${sizeSignals.layoutHeight} + ${_constants.SignalNames.FacetPaddingTop} + ${_constants.SignalNames.FacetPaddingBottom})`
          },
          height: {
            signal: sizeSignals.layoutHeight
          }
        }
      }
    };
  };

  const header = rowFn(_constants.SignalNames.PlotOffsetLeft);
  const footer = rowFn(`${_constants.SignalNames.PlotOffsetLeft} + ${_constants.SignalNames.PlotWidthOut} + ${_constants.SignalNames.PlotOffsetRight} / 2`);
  return {
    header,
    footer
  };
}

function facetColumnHeaderFooter(data, sizeSignals, index) {
  const colFn = ySignal => {
    return {
      type: 'group',
      from: {
        data
      },
      encode: {
        update: {
          x: {
            signal: `(${index}) * (${sizeSignals.layoutWidth} + ${_constants.SignalNames.FacetPaddingLeft}) + ${_constants.SignalNames.FacetPaddingLeft} + ${_constants.SignalNames.PlotOffsetLeft}`
          },
          y: {
            signal: ySignal
          },
          width: {
            signal: sizeSignals.layoutWidth
          }
        }
      }
    };
  }; //create group marks based on data sequences


  const header = colFn(`${_constants.SignalNames.PlotOffsetTop} / 2`);
  const footer = colFn(`${_constants.SignalNames.PlotOffsetTop} + ${_constants.SignalNames.PlotHeightOut}`);
  return {
    header,
    footer
  };
}

function createSequence(dataName, countSignal) {
  return {
    name: dataName,
    transform: [{
      type: 'sequence',
      start: 0,
      stop: {
        signal: countSignal
      }
    }]
  };
}
},{"./scope":"Nfxo","./constants":"kNZP"}],"F91X":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrdinals = createOrdinals;
exports.ordinalScale = ordinalScale;

var _constants = require("./constants");

var _expr = require("./expr");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function createOrdinals(source, prefix, binFields, sortOrder) {
  const _binFields = binFields.map(_expr.safeFieldName);

  const dataName = `${prefix}_bin_order`;
  const data = {
    name: dataName,
    source,
    transform: [{
      type: 'aggregate',
      groupby: _binFields
    }, {
      type: 'collect',
      sort: {
        field: _binFields,
        order: _binFields.map(f => sortOrder)
      }
    }, {
      type: 'window',
      ops: ['row_number'],
      as: [_constants.FieldNames.Ordinal]
    }]
  };
  return {
    data,
    scale: ordinalScale(dataName, `scale_${prefix}_order`, binFields)
  };
}

function ordinalScale(dataName, scaleName, binFields) {
  return {
    type: 'ordinal',
    name: scaleName,
    domain: {
      data: dataName,
      field: (0, _expr.safeFieldName)(binFields[0])
    },
    range: {
      data: dataName,
      field: _constants.FieldNames.Ordinal
    }
  };
}
},{"./constants":"kNZP","./expr":"IeV1"}],"MA9m":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cross = void 0;

var _layout = require("./layout");

var _bin = require("../bin");

var _constants = require("../constants");

var _facetSearch = require("../facetSearch");

var _facetTitle = require("../facetTitle");

var _ordinal = require("../ordinal");

var _scope = require("../scope");

var _signals = require("../signals");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
class Cross extends _layout.Layout {
  constructor(props) {
    super(props);
    this.props = props;
    const p = this.prefix = `cross_${this.id}`;
    this.binX = (0, _bin.binnable)(`${p}_x`, props.globalScope.data.name, props.groupbyX);
    this.binY = (0, _bin.binnable)(`${p}_y`, props.globalScope.data.name, props.groupbyY);
    this.names = {
      facetDataName: `data_${p}_facet`,
      searchUnion: `data_${p}_search`,
      dimScale: `scale_${p}`,
      dimCount: `${p}_count`,
      dimCategorical: `data_${p}_cat`,
      dimCellSize: `${p}_cell_size`,
      dimCellSizeCalc: `${p}_cell_calc`
    };
  }

  getGrouping() {
    return this.binX.fields.concat(this.binY.fields);
  }

  build() {
    const {
      binX,
      binY,
      names,
      prefix,
      props
    } = this;
    const {
      axisTextColor,
      colRowTitles,
      globalScope,
      parentScope
    } = props;
    const titles = {
      x: {
        dataName: null,
        quantitative: null
      },
      y: {
        dataName: null,
        quantitative: null
      }
    };
    const dx = {
      dim: 'x',
      bin: binX,
      sortOrder: 'ascending',
      size: parentScope.sizeSignals.layoutWidth,
      layout: parentScope.sizeSignals.layoutWidth,
      min: globalScope.signals.minCellWidth.name,
      out: globalScope.signals.plotWidthOut,
      offset: _constants.SignalNames.FacetPaddingLeft,
      padding: _constants.SignalNames.FacetPaddingLeft,
      dataOut: null,
      scaleName: null,
      position: null
    };
    const dy = {
      dim: 'y',
      bin: binY,
      sortOrder: 'ascending',
      size: parentScope.sizeSignals.layoutHeight,
      layout: parentScope.sizeSignals.layoutHeight,
      min: globalScope.signals.minCellHeight.name,
      out: globalScope.signals.plotHeightOut,
      offset: _constants.SignalNames.FacetPaddingTop,
      padding: `(${_constants.SignalNames.FacetPaddingTop} + ${_constants.SignalNames.FacetPaddingBottom})`,
      dataOut: null,
      scaleName: null,
      position: null
    };
    const dimensions = [dx, dy];
    dimensions.forEach(d => {
      const {
        bin,
        dim,
        padding,
        sortOrder
      } = d;
      let data;
      let dataName;
      let countSignal;
      let scale;
      const titleSource = titles[dim];

      if (bin.native === false) {
        (0, _scope.addSignals)(globalScope.scope, bin.maxbinsSignal);
        (0, _scope.addTransforms)(globalScope.data, ...bin.transforms);
        (0, _scope.addData)(globalScope.scope, bin.dataSequence);
        (0, _scope.addTransforms)(bin.dataSequence, {
          type: 'formula',
          expr: `indata(${JSON.stringify(globalScope.markDataName)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
          as: _constants.FieldNames.Contains
        });
        data = bin.dataSequence;
        dataName = bin.dataSequence.name;
        countSignal = `length(data(${JSON.stringify(dataName)}))`;
        scale = (0, _ordinal.ordinalScale)(dataName, `${names.dimScale}_${dim}`, bin.fields);
        titleSource.dataName = bin.dataSequence.name;
      } else {
        dataName = globalScope.markDataName;
        const ord = (0, _ordinal.createOrdinals)(dataName, `${prefix}_${dim}`, bin.fields, sortOrder);
        data = ord.data;
        (0, _scope.addData)(globalScope.scope, ord.data);
        countSignal = `length(data(${JSON.stringify(ord.data.name)}))`;
        scale = ord.scale;
        titleSource.dataName = ord.data.name;
      }

      titleSource.quantitative = bin.discreteColumn.column.quantitative;
      d.dataOut = data;
      d.scaleName = scale.name;
      (0, _scope.addTransforms)(data, {
        type: 'formula',
        expr: (0, _facetSearch.serializeAsVegaExpression)(bin, _constants.FieldNames.First, _constants.FieldNames.Last),
        as: _constants.FieldNames.FacetSearch
      }, {
        type: 'formula',
        expr: (0, _facetSearch.displayBin)(bin),
        as: _constants.FieldNames.FacetTitle
      });
      (0, _scope.addScales)(globalScope.scope, scale);
      const count = `${names.dimCount}_${dim}`;
      const calc = `${names.dimCellSizeCalc}_${dim}`;
      const size = `${names.dimCellSize}_${dim}`;
      (0, _scope.addSignals)(globalScope.scope, {
        name: count,
        update: countSignal
      });
      (0, _scope.addSignals)(globalScope.scope, {
        name: calc,
        update: `${d.layout} / ${count}`
      }, {
        name: size,
        update: `max(${d.min}, (${calc} - ${padding}))`
      });
      (0, _signals.modifySignal)(d.out, 'max', `((${size} + ${padding}) * ${count})`);
      d.position = this.dimensionOffset(d);
    });
    const groupRow = {
      type: 'group',
      encode: {
        update: {
          y: {
            signal: dy.position
          }
        }
      },
      from: {
        data: dy.dataOut.name
      },
      data: [{
        name: names.searchUnion,
        source: dx.dataOut.name,
        transform: [{
          type: 'formula',
          expr: `[datum[${JSON.stringify(_constants.FieldNames.FacetSearch)}], merge(parent[${JSON.stringify(_constants.FieldNames.FacetSearch)}], { clause: '&&'})]`,
          as: _constants.FieldNames.FacetSearch
        }]
      }]
    };
    const groupCol = {
      style: 'cell',
      name: prefix,
      type: 'group',
      encode: {
        update: {
          height: {
            signal: `${names.dimCellSize}_y`
          },
          width: {
            signal: `${names.dimCellSize}_x`
          },
          x: {
            signal: dx.position
          }
        }
      },
      from: {
        data: names.searchUnion
      }
    };
    (0, _scope.addMarks)(globalScope.markGroup, groupRow);
    (0, _scope.addMarks)(groupRow, groupCol);
    const offsets = {
      x: this.dimensionOffset(dx),
      y: this.dimensionOffset(dy),
      h: `${names.dimCellSize}_y`,
      w: `${names.dimCellSize}_x`
    };
    const sizeSignals = {
      layoutHeight: `${names.dimCellSize}_y`,
      layoutWidth: `${names.dimCellSize}_x`,
      colCount: `${names.dimCount}_x`,
      rowCount: `${names.dimCount}_y`
    };

    if (colRowTitles) {
      (0, _facetTitle.addFacetColRowTitles)(globalScope.scope, titles.x, titles.y, sizeSignals, axisTextColor);
    }

    return {
      facetScope: groupCol,
      offsets,
      sizeSignals,
      titles
    };
  }

  dimensionOffset(d) {
    const {
      names
    } = this;
    return `${d.offset} + (scale(${JSON.stringify(d.scaleName)}, datum[${JSON.stringify(d.bin.fields[0])}]) - 1) * (${names.dimCellSize}_${d.dim} + ${d.padding})`;
  }

}

exports.Cross = Cross;
},{"./layout":"GfLt","../bin":"HtEf","../constants":"kNZP","../facetSearch":"keY5","../facetTitle":"xF0Y","../ordinal":"F91X","../scope":"Nfxo","../signals":"TTOO"}],"bQXK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrap = void 0;

var _layout = require("./layout");

var _bin = require("../bin");

var _constants = require("../constants");

var _expr = require("../expr");

var _facetSearch = require("../facetSearch");

var _facetTitle = require("../facetTitle");

var _ordinal = require("../ordinal");

var _scope = require("../scope");

var _signals = require("../signals");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
class Wrap extends _layout.Layout {
  constructor(props) {
    super(props);
    this.props = props;
    const p = this.prefix = `wrap_${this.id}`;
    this.bin = (0, _bin.binnable)(this.prefix, props.globalScope.data.name, props.groupby);
    this.names = {
      outputData: `data_${p}_out`,
      rowColumnDataName: `data_${p}_row_col`,
      cellHeight: `${p}_cellHeight`,
      cellWidth: `${p}_cellWidth`,
      fits: `${p}_fits`,
      target: `${p}_target`,
      minArea: `${p}_minArea`,
      aspect: `${p}_aspect`,
      minAspect: `${p}_minAspect`,
      idealAspect: `${p}_idealAspect`,
      dataLength: `${p}_dataLength`,
      rxc0: `${p}_rxc0`,
      rxc1: `${p}_rxc1`,
      rxc2: `${p}_rxc2`,
      rxc: `${p}_rxc`,
      growColCount: `${p}_growColCount`,
      growCellWidth: `${p}_growCellWidth`,
      fitsArea: `${p}_fitsArea`,
      colCount: `${p}_colCount`
    };
  }

  getGrouping() {
    return this.bin.fields;
  }

  build() {
    const {
      bin,
      names,
      prefix,
      props
    } = this;
    const {
      axisTextColor,
      cellTitles,
      globalScope,
      parentScope
    } = props;
    let ordinalBinData;

    if (bin.native === false) {
      (0, _scope.addSignals)(globalScope.scope, bin.maxbinsSignal);
      (0, _scope.addTransforms)(globalScope.data, ...bin.transforms);
      (0, _scope.addData)(globalScope.scope, bin.dataSequence);
      (0, _scope.addTransforms)(bin.dataSequence, {
        type: 'formula',
        expr: `indata(${JSON.stringify(globalScope.data.name)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
        as: _constants.FieldNames.Contains
      });
      ordinalBinData = bin.dataSequence.name;
    } else {
      const ord = (0, _ordinal.createOrdinals)(globalScope.data.name, prefix, bin.fields, 'ascending');
      (0, _scope.addData)(globalScope.scope, ord.data);
      ordinalBinData = ord.data.name;
    }

    (0, _scope.addData)(globalScope.scope, {
      name: names.rxc0,
      transform: [{
        type: 'sequence',
        start: 1,
        stop: {
          signal: `ceil(sqrt(${names.dataLength})) + 1`
        }
      }, {
        type: 'formula',
        expr: `ceil(${names.dataLength} / datum.data)`,
        as: 'complement'
      }]
    }, {
      name: names.rxc1,
      source: names.rxc0,
      transform: [{
        type: 'project',
        fields: ['data'],
        as: ['cols']
      }]
    }, {
      name: names.rxc2,
      source: names.rxc0,
      transform: [{
        type: 'project',
        fields: ['complement'],
        as: ['cols']
      }]
    }, {
      name: names.rxc,
      source: [names.rxc1, names.rxc2],
      transform: [{
        type: 'formula',
        expr: `ceil(${names.dataLength} / datum.cols)`,
        as: 'rows'
      }, {
        type: 'formula',
        expr: `${parentScope.sizeSignals.layoutWidth} / datum.cols`,
        as: 'cellw'
      }, {
        type: 'formula',
        expr: `datum.cols === 1 ? max(datum.cellw, ${_constants.SignalNames.MinCellWidth}) : datum.cellw`,
        as: 'cellw'
      }, {
        type: 'formula',
        expr: `${parentScope.sizeSignals.layoutHeight} / datum.rows`,
        as: 'cellh'
      }, {
        type: 'formula',
        expr: `datum.rows === 1 ? max(datum.cellh, ${_constants.SignalNames.MinCellHeight}) : datum.cellh`,
        as: 'cellh'
      }, {
        type: 'formula',
        expr: `(datum.cellw >= ${_constants.SignalNames.MinCellWidth} && datum.cellh >= ${_constants.SignalNames.MinCellHeight})`,
        as: 'meetsmin'
      }, {
        type: 'filter',
        expr: 'datum.meetsmin'
      }, {
        type: 'formula',
        expr: 'datum.cellw / datum.cellh',
        as: names.aspect
      }, {
        type: 'formula',
        expr: `abs(datum.${names.aspect} - ${names.target})`,
        as: names.idealAspect
      }, {
        type: 'formula',
        expr: `${names.dataLength} / (datum.cols * datum.rows)`,
        as: 'coverage'
      }, {
        type: 'collect',
        sort: {
          field: [names.idealAspect, 'coverage'],
          order: ['ascending', 'descending']
        }
      }]
    }, {
      name: names.rowColumnDataName,
      source: ordinalBinData,
      transform: [{
        type: 'formula',
        expr: `floor((datum[${JSON.stringify(_constants.FieldNames.Ordinal)}] - 1) / ${names.colCount})`,
        as: _constants.FieldNames.WrapRow
      }, {
        type: 'formula',
        expr: `(datum[${JSON.stringify(_constants.FieldNames.Ordinal)}] - 1) % ${names.colCount}`,
        as: _constants.FieldNames.WrapCol
      }, {
        type: 'formula',
        expr: (0, _facetSearch.serializeAsVegaExpression)(bin, _constants.FieldNames.First, _constants.FieldNames.Last),
        as: _constants.FieldNames.FacetSearch
      }, {
        type: 'formula',
        expr: (0, _facetSearch.displayBin)(bin),
        as: _constants.FieldNames.FacetTitle
      }]
    });
    const dataOut = {
      name: names.outputData,
      source: globalScope.data.name,
      transform: [{
        type: 'lookup',
        from: names.rowColumnDataName,
        key: (0, _expr.safeFieldName)(bin.fields[0]),
        fields: [bin.fields[0]].map(_expr.safeFieldName),
        values: [_constants.FieldNames.WrapRow, _constants.FieldNames.WrapCol]
      }]
    };
    (0, _scope.addData)(globalScope.scope, dataOut);
    globalScope.setMarkDataName(names.outputData);
    (0, _scope.addSignals)(globalScope.scope, {
      name: names.minAspect,
      update: `${_constants.SignalNames.MinCellWidth} / ${_constants.SignalNames.MinCellHeight}`
    }, {
      name: names.target,
      update: `${names.minAspect} === 1 ? ${1.2} : ${names.minAspect}`
    }, {
      name: names.minArea,
      update: `${_constants.SignalNames.MinCellWidth}*${_constants.SignalNames.MinCellHeight}`
    }, {
      name: names.aspect,
      update: `${parentScope.sizeSignals.layoutWidth} / ${parentScope.sizeSignals.layoutHeight}`
    }, {
      name: names.dataLength,
      update: `data(${JSON.stringify(ordinalBinData)}).length`
    }, {
      name: names.growColCount,
      update: `max(floor(${parentScope.sizeSignals.layoutWidth} / ${_constants.SignalNames.MinCellWidth}), 1)`
    }, {
      name: names.growCellWidth,
      update: `${parentScope.sizeSignals.layoutWidth} / ${names.growColCount}`
    }, {
      name: names.fitsArea,
      update: `((${names.dataLength} * ${names.minArea}) <= (${parentScope.sizeSignals.layoutWidth} * ${parentScope.sizeSignals.layoutHeight}))`
    }, {
      name: names.fits,
      update: `${names.fitsArea} && length(data(${JSON.stringify(names.rxc)})) > 0`
    }, {
      name: names.colCount,
      update: `${names.fits} ? data(${JSON.stringify(names.rxc)})[0].cols : ${names.growColCount}`
    }, {
      name: names.cellWidth,
      update: `${names.fits} ? data(${JSON.stringify(names.rxc)})[0].cellw : ${names.growCellWidth}`
    }, {
      name: names.cellHeight,
      update: `${names.fits} ? data(${JSON.stringify(names.rxc)})[0].cellh : ${_constants.SignalNames.MinCellHeight}`
    });
    (0, _signals.modifySignal)(globalScope.signals.plotHeightOut, 'max', `(${names.cellHeight} * ceil(${names.dataLength} / ${names.colCount}))`);
    (0, _signals.modifySignal)(globalScope.signals.plotWidthOut, 'max', `(${names.cellWidth} * ${names.colCount})`);
    const signalH = [names.cellHeight, _constants.SignalNames.FacetPaddingTop, _constants.SignalNames.FacetPaddingBottom].join(' - ');
    const signalW = [names.cellWidth, _constants.SignalNames.FacetPaddingLeft].join(' - ');
    const signalX = (0, _scope.addOffsets)(parentScope.offsets.x, `datum[${JSON.stringify(_constants.FieldNames.WrapCol)}] * ${names.cellWidth}`, _constants.SignalNames.FacetPaddingLeft);
    const signalY = (0, _scope.addOffsets)(parentScope.offsets.y, `datum[${JSON.stringify(_constants.FieldNames.WrapRow)}] * ${names.cellHeight}`, _constants.SignalNames.FacetPaddingTop);
    const update = {
      height: {
        signal: signalH
      },
      width: {
        signal: signalW
      },
      x: {
        signal: signalX
      },
      y: {
        signal: signalY
      }
    };
    const offsets = {
      x: signalX,
      y: signalY,
      h: signalH,
      w: signalW
    };
    const group = {
      style: 'cell',
      name: prefix,
      type: 'group',
      from: {
        data: names.rowColumnDataName
      },
      encode: {
        update
      }
    };
    (0, _scope.addMarks)(globalScope.markGroup, group);
    const sizeSignals = {
      layoutHeight: `(${names.cellHeight} - ${_constants.SignalNames.FacetPaddingTop} - ${_constants.SignalNames.FacetPaddingBottom})`,
      layoutWidth: `(${names.cellWidth} - ${_constants.SignalNames.FacetPaddingLeft})`,
      colCount: names.colCount,
      rowCount: `ceil(${names.dataLength} / ${names.colCount})`
    };

    if (cellTitles) {
      (0, _facetTitle.addFacetCellTitles)(group, sizeSignals, axisTextColor);
    }

    return {
      facetScope: group,
      sizeSignals,
      offsets
    };
  }

}

exports.Wrap = Wrap;
},{"./layout":"GfLt","../bin":"HtEf","../constants":"kNZP","../expr":"IeV1","../facetSearch":"keY5","../facetTitle":"xF0Y","../ordinal":"F91X","../scope":"Nfxo","../signals":"TTOO"}],"gUMf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFacetLayout = getFacetLayout;

var _cross = require("./layouts/cross");

var _defaults = require("./defaults");

var _constants = require("./constants");

var _wrap = require("./layouts/wrap");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function getFacetLayout(facetStyle, facetColumn, facetVColumn, axisTextColor) {
  let layoutPair;
  const scales = [];
  let signals;
  const groupby = facetColumn;
  const plotPadding = {
    x: 0,
    y: 0
  };

  switch (facetStyle) {
    case 'cross':
      {
        const props = {
          axisTextColor,
          colRowTitles: true,
          groupbyX: groupby,
          groupbyY: facetVColumn
        };
        layoutPair = {
          layoutClass: _cross.Cross,
          props
        };
        signals = [{
          name: _constants.SignalNames.FacetPaddingBottom,
          update: `${_defaults.facetPaddingBottom}`
        }, {
          name: _constants.SignalNames.FacetPaddingLeft,
          update: `${_defaults.facetPaddingLeft}`
        }, {
          name: _constants.SignalNames.FacetPaddingTop,
          update: '0'
        }];
        plotPadding.y = _defaults.facetPaddingTop;
        plotPadding.x = _defaults.facetPaddingRight;
        break;
      }

    case 'wrap':
    default:
      {
        const props = {
          axisTextColor,
          cellTitles: true,
          groupby
        };
        layoutPair = {
          layoutClass: _wrap.Wrap,
          props
        };
        signals = [{
          name: _constants.SignalNames.FacetPaddingBottom,
          update: `${_defaults.facetPaddingBottom}`
        }, {
          name: _constants.SignalNames.FacetPaddingLeft,
          update: `${_defaults.facetPaddingLeft}`
        }, {
          name: _constants.SignalNames.FacetPaddingTop,
          update: `${_defaults.facetPaddingTop}`
        }];
        break;
      }
  }

  return {
    layoutPair,
    plotPadding,
    scales,
    signals
  };
}
},{"./layouts/cross":"MA9m","./defaults":"visW","./constants":"kNZP","./layouts/wrap":"bQXK"}],"qyiT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fill = fill;
exports.opacity = opacity;

var _constants = require("./constants");

var _expr = require("./expr");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function fill(context, colorFieldName, scale) {
  const {
    specColumns,
    insight,
    specViewOptions
  } = context;
  const colorColumn = specColumns.color;
  return colorColumn ? colorColumn.isColorData || insight.directColor ? {
    field: (0, _expr.safeFieldName)(colorColumn.name)
  } : {
    scale,
    field: colorColumn.quantitative ? (0, _expr.safeFieldName)(colorColumn.name) : colorFieldName
  } : {
    value: specViewOptions.colors.defaultCube
  };
}

function opacity(context) {
  const result = {
    signal: _constants.SignalNames.MarkOpacity
  };
  return result;
}
},{"./constants":"kNZP","./expr":"IeV1"}],"O5yf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalScope = void 0;

var _constants = require("./constants");

var _scope = require("./scope");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
class GlobalScope {
  constructor(props) {
    const {
      dataName,
      markGroup,
      scope,
      signals
    } = props;
    this.scope = scope;
    this._markGroup = markGroup;
    this.signals = signals;
    this.data = (0, _scope.getDataByName)(scope.data, dataName).data;
    this._markDataName = dataName;
    this.offsets = {
      x: '0',
      y: '0',
      h: _constants.SignalNames.PlotHeightIn,
      w: _constants.SignalNames.PlotWidthIn
    };
    this.sizeSignals = {
      layoutHeight: _constants.SignalNames.PlotHeightIn,
      layoutWidth: _constants.SignalNames.PlotWidthIn
    };
    this.zSize = _constants.SignalNames.PlotHeightIn;
  }

  get markDataName() {
    return this._markDataName;
  }

  setMarkDataName(markDataName) {
    this._markDataName = markDataName;
  }

  get markGroup() {
    return this._markGroup;
  }

  setMarkGroup(markGroup) {
    this._markGroup = markGroup;
  }

}

exports.GlobalScope = GlobalScope;
},{"./constants":"kNZP","./scope":"Nfxo"}],"hPp4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecBuilder = void 0;

var _axes = require("./axes");

var _color = require("./color");

var _constants = require("./constants");

var _defaults = require("./defaults");

var _facetLayout = require("./facetLayout");

var _facetTitle = require("./facetTitle");

var _fill = require("./fill");

var _globalScope = require("./globalScope");

var _scope = require("./scope");

var _signals = require("./signals");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
class SpecBuilder {
  constructor(props) {
    this.props = props;
    this.globalSignals = {
      minCellWidth: {
        name: _constants.SignalNames.MinCellWidth,
        update: `${_defaults.minFacetWidth}`
      },
      minCellHeight: {
        name: _constants.SignalNames.MinCellHeight,
        update: `${_defaults.minFacetHeight}`
      },
      plotOffsetLeft: {
        name: _constants.SignalNames.PlotOffsetLeft,
        update: '0'
      },
      plotOffsetTop: {
        name: _constants.SignalNames.PlotOffsetTop,
        update: '0'
      },
      plotOffsetBottom: {
        name: _constants.SignalNames.PlotOffsetBottom,
        update: '0'
      },
      plotOffsetRight: {
        name: _constants.SignalNames.PlotOffsetRight,
        update: '0'
      },
      plotHeightOut: {
        name: _constants.SignalNames.PlotHeightOut,
        update: _constants.SignalNames.PlotHeightIn
      },
      plotWidthOut: {
        name: _constants.SignalNames.PlotWidthOut,
        update: _constants.SignalNames.PlotWidthIn
      }
    };
  }

  validate() {
    const {
      specCapabilities,
      specContext
    } = this.props;
    const {
      roles
    } = specCapabilities;
    const required = roles.filter(r => {
      switch (typeof r.allowNone) {
        case 'boolean':
          return !r.allowNone;

        case 'undefined':
          return true;

        case 'function':
          return !r.allowNone(specContext);
      }
    });
    const numeric = roles.filter(r => r.excludeCategoric);
    const errors = required.map(r => {
      if (specContext.specColumns[r.role]) {
        return null;
      } else {
        return `Field ${r.role} is required.`;
      }
    }).concat(numeric.map(r => {
      if (specContext.specColumns[r.role] && !specContext.specColumns[r.role].quantitative) {
        return `Field ${r.role} must be quantitative.`;
      } else {
        return null;
      }
    })).filter(Boolean);
    return errors;
  }

  build() {
    const {
      specCapabilities
    } = this.props;
    const errors = this.validate();

    if (errors.length) {
      return {
        errors,
        specCapabilities,
        vegaSpec: null
      };
    } else {
      const {
        specContext
      } = this.props;
      const {
        insight,
        specColumns,
        specViewOptions
      } = specContext;
      const dataName = 'data_source';
      const {
        vegaSpec,
        groupMark
      } = this.initSpec(dataName);
      const {
        topColorField,
        colorDataName
      } = (0, _color.addColor)({
        scope: vegaSpec,
        dataName,
        specContext,
        scaleName: _constants.ScaleNames.Color,
        legendDataName: 'data_legend',
        topLookupName: 'data_topcolorlookup',
        colorReverseSignalName: _constants.SignalNames.ColorReverse
      });
      const globalScope = new _globalScope.GlobalScope({
        dataName: colorDataName,
        markGroup: groupMark,
        scope: vegaSpec,
        signals: this.globalSignals
      });
      let facetLayout;

      if (insight.columns.facet) {
        const discreteFacetColumn = {
          column: specColumns.facet,
          defaultBins: _defaults.defaultBins,
          maxbins: _defaults.maxbins,
          maxbinsSignalDisplayName: specViewOptions.language.FacetMaxBins,
          maxbinsSignalName: _constants.SignalNames.FacetBins
        };
        const discreteFacetVColumn = {
          column: specColumns.facetV,
          defaultBins: _defaults.defaultBins,
          maxbins: _defaults.maxbins,
          maxbinsSignalDisplayName: specViewOptions.language.FacetVMaxBins,
          maxbinsSignalName: _constants.SignalNames.FacetVBins
        };
        facetLayout = (0, _facetLayout.getFacetLayout)(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn, specViewOptions.colors.axisText);
        (0, _scope.addSignals)(vegaSpec, ...facetLayout.signals);
        (0, _scope.addScales)(vegaSpec, ...facetLayout.scales);
        this.props.layouts = [facetLayout.layoutPair, ...this.props.layouts];
        this.globalSignals.plotOffsetTop.update = `${facetLayout.plotPadding.y}`;
        this.globalSignals.plotOffsetRight.update = `${facetLayout.plotPadding.x}`;
      }

      const {
        firstScope,
        finalScope,
        specResult,
        allGlobalScales,
        allEncodingRules
      } = this.iterateLayouts(globalScope, (i, innerScope) => {
        if (facetLayout && i === 0) {
          globalScope.zSize = innerScope.offsets.h;
        }
      });

      if (specResult) {
        return specResult;
      }

      if (allGlobalScales.length > 0) {
        let axesScopes = facetLayout ? (0, _facetTitle.addFacetAxesGroupMarks)({
          globalScope: globalScope.scope,
          plotScope: groupMark,
          facetScope: firstScope,
          plotHeightOut: this.globalSignals.plotHeightOut.name,
          plotWidthOut: this.globalSignals.plotWidthOut.name,
          colTitleScaleName: 'scale_facet_col_title',
          rowTitleScaleName: 'scale_facet_row_title',
          colSeqName: 'data_FacetCellColTitles',
          rowSeqName: 'data_FacetCellRowTitles'
        }) : {
          main: [{
            scope: groupMark,
            lines: true,
            labels: true,
            title: true
          }]
        };
        (0, _axes.addGlobalAxes)({
          globalScope,
          allGlobalScales,
          axisScales: this.props.axisScales,
          plotOffsetSignals: {
            x: this.globalSignals.plotOffsetLeft,
            y: this.globalSignals.plotOffsetBottom
          },
          axesOffsets: {
            x: _defaults.axesOffsetX,
            y: _defaults.axesOffsetY
          },
          axesTitlePadding: facetLayout ? {
            x: _defaults.axesTitlePaddingFacetX,
            y: _defaults.axesTitlePaddingFacetY
          } : {
            x: _defaults.axesTitlePaddingX,
            y: _defaults.axesTitlePaddingY
          },
          labelBaseline: {
            x: 'top',
            y: 'middle'
          },
          specColumns,
          specViewOptions,
          axesScopes
        });
      } //add mark to the final scope


      if (finalScope.mark) {
        const {
          update
        } = finalScope.mark.encode;
        const outputDataName = 'output';
        finalScope.mark.from.data = outputDataName;
        (0, _scope.addData)(globalScope.markGroup, {
          name: outputDataName,
          source: globalScope.markDataName,
          transform: [{
            type: 'formula',
            expr: finalScope.offsets.x,
            as: _constants.FieldNames.OffsetX
          }, {
            type: 'formula',
            expr: finalScope.offsets.y,
            as: _constants.FieldNames.OffsetY
          }]
        });
        update.x = {
          field: _constants.FieldNames.OffsetX
        };
        update.y = {
          field: _constants.FieldNames.OffsetY
        };
        allEncodingRules.forEach(map => {
          for (let key in map) {
            if (update[key]) {
              let arrIn = map[key];

              if (!Array.isArray(update[key])) {
                let value = update[key];
                let arrOut = [];
                update[key] = arrOut;
                arrIn.forEach(rule => arrOut.push(rule));
                arrOut.push(value);
              } else {
                let arrOut = update[key];
                arrIn.forEach(rule => arrOut.unshift(rule));
              }
            }
          }
        });
        update.fill = (0, _fill.fill)(specContext, topColorField, _constants.ScaleNames.Color);
        update.opacity = (0, _fill.opacity)(specContext);
      }

      return {
        specCapabilities,
        vegaSpec
      };
    }
  }

  initSpec(dataName) {
    const {
      globalSignals
    } = this;
    const {
      minCellWidth,
      minCellHeight,
      plotOffsetLeft,
      plotOffsetBottom,
      plotOffsetTop,
      plotOffsetRight,
      plotHeightOut,
      plotWidthOut
    } = globalSignals;
    const {
      specContext
    } = this.props;
    const {
      insight
    } = specContext;
    const groupMark = {
      type: 'group',
      //style: 'cell',
      encode: {
        update: {
          x: {
            signal: _constants.SignalNames.PlotOffsetLeft
          },
          y: {
            signal: _constants.SignalNames.PlotOffsetTop
          },
          height: {
            signal: _constants.SignalNames.PlotHeightOut
          },
          width: {
            signal: _constants.SignalNames.PlotWidthOut
          }
        }
      }
    };
    const inputDataname = 'input';
    const vegaSpec = {
      $schema: 'https://vega.github.io/schema/vega/v5.json',
      //style: 'cell',
      data: [{
        name: inputDataname
      }, {
        name: dataName,
        source: inputDataname,
        transform: []
      }],
      marks: [groupMark],
      signals: (0, _signals.textSignals)(specContext, _constants.SignalNames.ViewportHeight).concat([minCellWidth, minCellHeight, {
        name: _constants.SignalNames.ViewportHeight,
        update: `max(${_constants.SignalNames.MinCellHeight}, ${insight.size.height})`
      }, {
        name: _constants.SignalNames.ViewportWidth,
        update: `max(${_constants.SignalNames.MinCellWidth}, ${insight.size.width})`
      }, plotOffsetLeft, plotOffsetTop, plotOffsetBottom, plotOffsetRight, {
        name: _constants.SignalNames.PlotHeightIn,
        update: `${_constants.SignalNames.ViewportHeight} - ${_constants.SignalNames.PlotOffsetBottom}`
      }, {
        name: _constants.SignalNames.PlotWidthIn,
        update: `${_constants.SignalNames.ViewportWidth} - ${_constants.SignalNames.PlotOffsetLeft} - ${_constants.SignalNames.PlotOffsetRight}`
      }, plotHeightOut, plotWidthOut, {
        name: 'height',
        update: `${_constants.SignalNames.PlotOffsetTop} + ${_constants.SignalNames.PlotHeightOut} + ${_constants.SignalNames.PlotOffsetBottom}`
      }, {
        name: 'width',
        update: `${_constants.SignalNames.PlotWidthOut} + ${_constants.SignalNames.PlotOffsetLeft} + ${_constants.SignalNames.PlotOffsetRight}`
      }])
    };
    return {
      vegaSpec,
      groupMark
    };
  }

  iterateLayouts(globalScope, onLayoutBuild) {
    let specResult;
    let parentScope = {
      sizeSignals: globalScope.sizeSignals,
      offsets: globalScope.offsets
    };
    let firstScope;
    let childScope;
    const groupings = [];
    let {
      layouts,
      specCapabilities
    } = this.props;
    const allGlobalScales = [];
    const allEncodingRules = [];

    for (let i = 0; i < layouts.length; i++) {
      if (!parentScope) continue;
      let buildProps = {
        globalScope,
        parentScope,
        axesScales: this.props.axisScales,
        groupings,
        id: i
      };
      let layout = this.createLayout(layouts[i], buildProps);

      try {
        childScope = layout.build();
        childScope.id = i;
        let groupby = layout.getGrouping();

        if (groupby) {
          groupings.push({
            id: i,
            groupby,
            fieldOps: [{
              field: null,
              op: 'count',
              as: _constants.FieldNames.Count
            }]
          });
        }

        let sumOp = layout.getAggregateSumOp();

        if (sumOp) {
          groupings[groupings.length - 1].fieldOps.push(sumOp);
        }

        onLayoutBuild(i, childScope);
      } catch (e) {
        specResult = {
          errors: [e.stack],
          specCapabilities,
          vegaSpec: null
        };
        break;
      }

      if (childScope && childScope.globalScales) {
        allGlobalScales.push(childScope.globalScales);
      }

      if (childScope.encodingRuleMap) {
        allEncodingRules.push(childScope.encodingRuleMap);
      }

      if (i === 0) {
        firstScope = childScope;
      }

      parentScope = childScope;
    }

    return {
      firstScope,
      finalScope: parentScope,
      specResult,
      allGlobalScales,
      allEncodingRules
    };
  }

  createLayout(layoutPair, buildProps) {
    const {
      layoutClass,
      props
    } = layoutPair;
    const layoutBuildProps = Object.assign(Object.assign({}, props), buildProps);
    const layout = new layoutClass(layoutBuildProps);
    layout.id = buildProps.id;
    return layout;
  }

}

exports.SpecBuilder = SpecBuilder;
},{"./axes":"Zzpz","./color":"MIbS","./constants":"kNZP","./defaults":"visW","./facetLayout":"gUMf","./facetTitle":"xF0Y","./fill":"qyiT","./globalScope":"O5yf","./scope":"Nfxo","./signals":"TTOO"}],"HWtS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpecBuilderForChart = getSpecBuilderForChart;

var _barchartH = _interopRequireDefault(require("./barchartH"));

var _barchartV = _interopRequireDefault(require("./barchartV"));

var _density = _interopRequireDefault(require("./density"));

var _grid = _interopRequireDefault(require("./grid"));

var _scatterplot = _interopRequireDefault(require("./scatterplot"));

var _stacks = _interopRequireDefault(require("./stacks"));

var _strips = _interopRequireDefault(require("./strips"));

var _treemap = _interopRequireDefault(require("./treemap"));

var _specBuilder = require("../specBuilder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const map = {
  barchart: _barchartV.default,
  barchartH: _barchartH.default,
  barchartV: _barchartV.default,
  density: _density.default,
  grid: _grid.default,
  scatterplot: _scatterplot.default,
  stacks: _stacks.default,
  strips: _strips.default,
  treemap: _treemap.default
};

function getSpecBuilderForChart(specContext) {
  const {
    insight
  } = specContext;
  let props;
  const fn = map[insight.chart];

  if (fn) {
    props = fn(specContext);
    return new _specBuilder.SpecBuilder(Object.assign(Object.assign({}, props), {
      specContext
    }));
  }
}
},{"./barchartH":"PsHp","./barchartV":"AVzi","./density":"PDD1","./grid":"ys7l","./scatterplot":"mVfN","./stacks":"Fc39","./strips":"Z0w5","./treemap":"GcJ6","../specBuilder":"hPp4"}],"hdg1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.extend = extend;

function _default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);

  for (var key in definition) prototype[key] = definition[key];

  return prototype;
}
},{}],"TIYW":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = Color;
exports.default = color;
exports.rgbConvert = rgbConvert;
exports.rgb = rgb;
exports.Rgb = Rgb;
exports.hslConvert = hslConvert;
exports.hsl = hsl;
exports.brighter = exports.darker = void 0;

var _define = _interopRequireWildcard(require("./define.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Color() {}

var darker = 0.7;
exports.darker = darker;
var brighter = 1 / darker;
exports.brighter = brighter;
var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};
(0, _define.default)(Color, color, {
  copy: function (channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function () {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
  : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
  : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
  : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
  : null // invalid hex
  ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
  : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
  : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
  : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
  : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
  : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
  : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
  : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

(0, _define.default)(Rgb, rgb, (0, _define.extend)(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function () {
    return this;
  },
  displayable: function () {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;

  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }

  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

(0, _define.default)(Hsl, hsl, (0, _define.extend)(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function () {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function () {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
/* From FvD 13.37, CSS Color Module Level 3 */

function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
},{"./define.js":"hdg1"}],"bVm2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rad2deg = exports.deg2rad = void 0;
var deg2rad = Math.PI / 180;
exports.deg2rad = deg2rad;
var rad2deg = 180 / Math.PI;
exports.rad2deg = rad2deg;
},{}],"VUvB":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gray = gray;
exports.default = lab;
exports.Lab = Lab;
exports.lch = lch;
exports.hcl = hcl;
exports.Hcl = Hcl;

var _define = _interopRequireWildcard(require("./define.js"));

var _color = require("./color.js");

var _math = require("./math.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// https://observablehq.com/@mbostock/lab-and-rgb
var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
      x,
      z;
  if (r === g && g === b) x = z = y;else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

(0, _define.default)(Lab, lab, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function (k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function () {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new _color.Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);

  var h = Math.atan2(o.b, o.a) * _math.rad2deg;

  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * _math.deg2rad;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}

(0, _define.default)(Hcl, hcl, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function (k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function () {
    return hcl2lab(this).rgb();
  }
}));
},{"./define.js":"hdg1","./color.js":"TIYW","./math.js":"bVm2"}],"LYgN":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cubehelix;
exports.Cubehelix = Cubehelix;

var _define = _interopRequireWildcard(require("./define.js"));

var _color = require("./color.js");

var _math = require("./math.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
      // NaN if l=0 or l=1
  h = s ? Math.atan2(k, bl) * _math.rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

(0, _define.default)(Cubehelix, cubehelix, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    k = k == null ? _color.brighter : Math.pow(_color.brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? _color.darker : Math.pow(_color.darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * _math.deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new _color.Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
  }
}));
},{"./define.js":"hdg1","./color.js":"TIYW","./math.js":"bVm2"}],"mFud":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "color", {
  enumerable: true,
  get: function () {
    return _color.default;
  }
});
Object.defineProperty(exports, "rgb", {
  enumerable: true,
  get: function () {
    return _color.rgb;
  }
});
Object.defineProperty(exports, "hsl", {
  enumerable: true,
  get: function () {
    return _color.hsl;
  }
});
Object.defineProperty(exports, "lab", {
  enumerable: true,
  get: function () {
    return _lab.default;
  }
});
Object.defineProperty(exports, "hcl", {
  enumerable: true,
  get: function () {
    return _lab.hcl;
  }
});
Object.defineProperty(exports, "lch", {
  enumerable: true,
  get: function () {
    return _lab.lch;
  }
});
Object.defineProperty(exports, "gray", {
  enumerable: true,
  get: function () {
    return _lab.gray;
  }
});
Object.defineProperty(exports, "cubehelix", {
  enumerable: true,
  get: function () {
    return _cubehelix.default;
  }
});

var _color = _interopRequireWildcard(require("./color.js"));

var _lab = _interopRequireWildcard(require("./lab.js"));

var _cubehelix = _interopRequireDefault(require("./cubehelix.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./color.js":"TIYW","./lab.js":"VUvB","./cubehelix.js":"LYgN"}],"x9Lc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumnsFromData = getColumnsFromData;
exports.getSpecColumns = getSpecColumns;
exports.inferAll = inferAll;
exports.getStats = getStats;

var _d3Color = require("d3-color");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function isColor(cssColorSpecifier) {
  return !!(0, _d3Color.color)(cssColorSpecifier);
}

function isQuantitative(column) {
  return column.type === 'number' || column.type === 'integer';
}
/**
 * Derive column metadata from the data array.
 * @param data Array of data objects.
 */


function getColumnsFromData(inferTypesFn, data, columnTypes) {
  const sample = data[0];
  const fields = sample ? Object.keys(sample) : [];
  const inferences = Object.assign(Object.assign({}, inferTypesFn(data, fields)), columnTypes);
  const columns = fields.map(name => {
    const column = {
      name,
      type: inferences[name]
    };
    return column;
  });
  inferAll(columns, data);
  return columns;
}
/**
 * Get columns associated with each Insight role.
 * @param insight Insight to specify column roles.
 * @param columns Array of Columns inferred from the data.
 */


function getSpecColumns(insight, columns) {
  function getColumnByName(name) {
    return columns.filter(c => c.name === name)[0];
  }

  return {
    color: getColumnByName(insight.columns && insight.columns.color),
    facet: getColumnByName(insight.columns && insight.columns.facet),
    facetV: getColumnByName(insight.columns && insight.columns.facetV),
    group: getColumnByName(insight.columns && insight.columns.group),
    size: getColumnByName(insight.columns && insight.columns.size),
    sort: getColumnByName(insight.columns && insight.columns.sort),
    uid: getColumnByName(insight.columns && insight.columns.uid),
    x: getColumnByName(insight.columns && insight.columns.x),
    y: getColumnByName(insight.columns && insight.columns.y),
    z: getColumnByName(insight.columns && insight.columns.z)
  };
}
/**
 * Populate columns with type inferences and stats.
 * @param columns Array of columns.
 * @param data Array of data objects.
 */


function inferAll(columns, data) {
  columns.forEach(column => {
    if (column) {
      if (typeof column.quantitative !== 'boolean') {
        column.quantitative = isQuantitative(column);
      }

      if (!column.stats) {
        column.stats = getStats(data, column);
      }

      if (column.type === 'string' && typeof column.isColorData !== 'boolean') {
        checkIsColorData(data, column);
      }
    }
  });
}

function checkIsColorData(data, column) {
  if (!column.stats.hasColorData) {
    column.isColorData = false;
    return;
  }

  for (let i = 0; i < data.length; i++) {
    if (!isColor(data[i][column.name])) {
      column.isColorData = false;
      return;
    }
  }

  column.isColorData = true;
}

function getStats(data, column) {
  const distinctMap = {};
  const stats = {
    distinctValueCount: null,
    max: null,
    mean: null,
    min: null
  };
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    let value = row[column.name];
    distinctMap[value] = true;

    if (stats.max === null || value > stats.max) {
      stats.max = value;
    }

    if (stats.min === null || value < stats.min) {
      stats.min = value;
    }

    let num = +value;

    if (!isNaN(num)) {
      sum += num;
    }

    if (column.type === 'string' && !stats.hasColorData && isColor(value)) {
      stats.hasColorData = true;
    }
  }

  if (column.quantitative) {
    stats.mean = data.length > 0 && sum / data.length;
    stats.hasNegative = detectNegative(column, data);

    if (column.type === 'integer') {
      stats.isSequential = detectSequentialColumn(column, data);
    }
  }

  stats.distinctValueCount = Object.keys(distinctMap).length;
  return stats;
}

function detectNegative(column, data) {
  for (let i = 1; i < data.length; i++) {
    if (data[i][column.name] < 0) return true;
  }

  return false;
}

function detectSequentialColumn(column, data) {
  if (data.length < 2) return false;
  let colname = column.name;

  for (let i = 1; i < data.length; i++) {
    if (data[i][colname] !== data[i - 1][colname] + 1) return false;
  }

  return true;
}
},{"d3-color":"mFud"}],"EPvd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = build;

var _charts = require("./charts");

var _inference = require("./inference");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function build(context, currData) {
  const {
    specColumns
  } = context;
  const columns = [specColumns.color, specColumns.facet, specColumns.facetV, specColumns.group, specColumns.size, specColumns.sort, specColumns.x, specColumns.y, specColumns.z];
  (0, _inference.inferAll)(columns, currData);
  const specBuilder = (0, _charts.getSpecBuilderForChart)(context);
  let specResult;

  if (specBuilder) {
    try {
      specResult = specBuilder.build();
    } catch (e) {
      specResult = {
        specCapabilities: null,
        vegaSpec: null,
        errors: [e.stack]
      };
    }

    if (!specResult.errors) {
      const data0 = specResult.vegaSpec.data[0];
      data0.values = currData;
    }
  } else {
    specResult = {
      specCapabilities: null,
      vegaSpec: null,
      errors: [`could not build spec for ${context.insight.chart}`]
    };
  }

  return specResult;
}
},{"./charts":"HWtS","./inference":"x9Lc"}],"gl1V":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _build = require("./build");

Object.keys(_build).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _build[key];
    }
  });
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});

var _inference = require("./inference");

Object.keys(_inference).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _inference[key];
    }
  });
});
},{"./build":"EPvd","./constants":"kNZP","./inference":"x9Lc"}],"Syc7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ColorScaleNone", {
  enumerable: true,
  get: function () {
    return _sanddanceSpecs.ColorScaleNone;
  }
});
Object.defineProperty(exports, "FieldNames", {
  enumerable: true,
  get: function () {
    return _sanddanceSpecs.FieldNames;
  }
});
Object.defineProperty(exports, "ScaleNames", {
  enumerable: true,
  get: function () {
    return _sanddanceSpecs.ScaleNames;
  }
});
Object.defineProperty(exports, "SignalNames", {
  enumerable: true,
  get: function () {
    return _sanddanceSpecs.SignalNames;
  }
});
exports.GL_ORDINAL = void 0;

var _sanddanceSpecs = require("@msrvida/sanddance-specs");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const GL_ORDINAL = 'GL_ORDINAL';
exports.GL_ORDINAL = GL_ORDINAL;
},{"@msrvida/sanddance-specs":"gl1V"}],"AN7n":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSearchExpressionGroup = isSearchExpressionGroup;
exports.createGroupFromExpression = createGroupFromExpression;
exports.ensureSearchExpressionGroupArray = ensureSearchExpressionGroupArray;

function isSearchExpressionGroup(search) {
  if (!search) {
    return false;
  }

  return !!search.expressions;
}

function createGroupFromExpression(input) {
  const output = {
    expressions: [input]
  };
  return output;
}

function ensureSearchExpressionGroupArray(search) {
  if (Array.isArray(search)) {
    return [...search];
  } else if (isSearchExpressionGroup(search)) {
    return [search];
  } else {
    return [createGroupFromExpression(search)];
  }
}
},{}],"RvJY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareExpression = compareExpression;
exports.compareGroup = compareGroup;
exports.compare = compare;
exports.startsWith = startsWith;

var _group = require("./group");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const expressionKeys = Object.keys({
  clause: null,
  name: null,
  operator: null,
  value: null
});

function compareExpression(a, b) {
  if (a && b) {
    for (let k = 0; k < expressionKeys.length; k++) {
      let key = expressionKeys[k];
      if (a[key] != b[key]) return false;
    }
  } else {
    return !a && !b;
  }

  return true;
}

const groupKeys = Object.keys({
  clause: null
});

function compareGroup(a, b) {
  for (let k = 0; k < groupKeys.length; k++) {
    let key = groupKeys[k];
    if (a[key] != b[key]) return false;
  }

  if (!a.expressions && !b.expressions) return true;
  if (!a.expressions || !b.expressions) return false;
  if (a.expressions.length != b.expressions.length) return false;

  for (let i = 0; i < a.expressions.length; i++) {
    if (!compareExpression(a.expressions[i], b.expressions[i])) return false;
  }

  return true;
}

function compare(a, b) {
  if (a == b) return true;
  if (!a || !b) return false;
  let arrs = [a, b].map(_group.ensureSearchExpressionGroupArray);
  let [arrA, arrB] = arrs;
  if (arrA.length != arrB.length) return false;

  for (let i = 0; i < arrA.length; i++) {
    if (!compareGroup(arrA[i], arrB[i])) return false;
  }

  return true;
}

function startsWith(whole, part) {
  if (!part) return true;
  let arrs = [whole, part].map(_group.ensureSearchExpressionGroupArray);
  let [wholeArray, partArray] = arrs;
  if (partArray.length > wholeArray.length) return false;

  for (let i = 0; i < partArray.length; i++) {
    if (!compareGroup(wholeArray[i], partArray[i])) return false;
  }

  return true;
}
},{"./group":"AN7n"}],"hqwp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Exec = void 0;

var _group = require("./group");

function valueToBoolean(value) {
  if (typeof value === 'string') {
    switch (value.toLowerCase()) {
      case 'true':
        return true;

      case 'false':
        return false;
    }
  }

  return !!value;
}

function valueToString(value) {
  if (value == null) {
    return '';
  }

  switch (typeof value) {
    case 'string':
      return value;

    case 'boolean':
    case 'number':
      return value.toString();
  }

  return '';
}

function isStringOperation(ex) {
  switch (ex.operator) {
    case 'contains':
    case '!contains':
    case 'starts':
    case '!starts':
      return true;
  }

  return false;
}

function isnullorEmpty(value) {
  if (value == null) return true; //double equal sign to also catch undefined

  if (typeof value === 'string' && value.length === 0) return true;
  return false;
}

class Exec {
  constructor(search, columns) {
    this.columns = columns;
    this.groups = (0, _group.ensureSearchExpressionGroupArray)(search).map(g => {
      const expressions = g.expressions.filter(Boolean);
      expressions.forEach(ex => {
        ex.column = this.getColumn(ex.name);
        ex.valueBool = valueToBoolean(ex.value);
        ex.valueLow = valueToString(ex.value).toLocaleLowerCase();
        ex.stringOperation = isStringOperation(ex);
      });
      const group = Object.assign(Object.assign({}, g), {
        expressions
      });
      return group;
    });
  }

  getColumn(name) {
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].name == name) {
        return this.columns[i];
      }
    }
  }

  runExpressionOnColumn(datum, ex) {
    const actualDataValue = datum[ex.name];

    if (ex.operator === 'isnullorEmpty') {
      return isnullorEmpty(actualDataValue);
    } else if (ex.operator === '!isnullorEmpty') {
      return !isnullorEmpty(actualDataValue);
    }

    let dataValue = actualDataValue;
    let expressionValue = ex.value;

    if (ex.column) {
      if (ex.column.type === 'string' || ex.stringOperation) {
        dataValue = valueToString(actualDataValue).toLocaleLowerCase();
        expressionValue = ex.valueLow;
      } else if (ex.column.type === 'boolean') {
        dataValue = valueToBoolean(actualDataValue);
        expressionValue = ex.valueBool;
      } else if (ex.column.quantitative) {
        dataValue = +actualDataValue;
        expressionValue = +ex.value;
      }
    }

    switch (ex.operator) {
      case '!=':
        return dataValue != expressionValue;

      case '<':
        return dataValue < expressionValue;

      case '<=':
        return dataValue <= expressionValue;

      case '==':
        return dataValue == expressionValue;

      case '>':
        return dataValue > expressionValue;

      case '>=':
        return dataValue >= expressionValue;

      case 'contains':
        return dataValue.indexOf(expressionValue) >= 0;

      case '!contains':
        return dataValue.indexOf(expressionValue) < 0;

      case 'starts':
        return dataValue.indexOf(expressionValue) == 0;

      case '!starts':
        return dataValue.indexOf(expressionValue) !== 0;
    }
  }

  runExpression(datum, ex) {
    if (ex.name == null) {
      //run on all columns
      const group = {
        expressions: this.columns.map((column, i) => {
          const ex2 = Object.assign(Object.assign({}, ex), {
            column,
            name: column.name
          });

          if (i) {
            ex2.clause = '||';
          }

          return ex2;
        })
      };
      return this.runGroup(datum, group);
    } else {
      return this.runExpressionOnColumn(datum, ex);
    }
  }

  runGroup(datum, group) {
    let accumulator = this.runExpression(datum, group.expressions[0]);

    for (let i = 1; i < group.expressions.length; i++) {
      let ex = group.expressions[i];

      switch (ex.clause) {
        case '&&':
          accumulator = accumulator && this.runExpression(datum, ex);
          break;

        case '||':
          accumulator = accumulator || this.runExpression(datum, ex);
          break;
      }
    }

    return accumulator;
  }

  run(datum) {
    let accumulator = this.runGroup(datum, this.groups[0]);

    for (let i = 1; i < this.groups.length; i++) {
      let group = this.groups[i];

      switch (group.clause) {
        case '&&':
          accumulator = accumulator && this.runGroup(datum, group);
          break;

        case '||':
          accumulator = accumulator || this.runGroup(datum, group);
          break;
      }
    }

    return accumulator;
  }

}

exports.Exec = Exec;
},{"./group":"AN7n"}],"jBu6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invert = invert;

var _group = require("./group");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function invertSearchExpressionGroup(input) {
  //this only works if all expressions in this group have the same clause
  const output = {
    expressions: input.expressions.map(invertSearchExpression)
  };

  if (input.clause) {
    output.clause = invertedClauses[input.clause];
  }

  return output;
}

const invertedOperators = {
  '!=': '==',
  '==': '!=',
  '<': '>=',
  '>=': '<',
  '<=': '>',
  '>': '<=',
  '!contains': 'contains',
  'contains': '!contains',
  '!isnullorEmpty': 'isnullorEmpty',
  'isnullorEmpty': '!isnullorEmpty',
  '!starts': 'starts',
  'starts': '!starts'
};
const invertedClauses = {
  '&&': '||',
  '||': '&&'
};

function invertSearchExpression(input) {
  const operator = invertedOperators[input.operator];
  const output = Object.assign(Object.assign({}, input), {
    operator
  });

  if (input.clause) {
    output.clause = invertedClauses[input.clause];
  }

  return output;
}

function invert(search) {
  if (Array.isArray(search)) {
    return search.map(invertSearchExpressionGroup);
  } else if ((0, _group.isSearchExpressionGroup)(search)) {
    return invertSearchExpressionGroup(search);
  } else {
    return invertSearchExpression(search);
  }
}
},{"./group":"AN7n"}],"YlDD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.narrow = narrow;

var _group = require("./group");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function narrow(a, b) {
  if (!a) {
    return b;
  }

  let arrs = [a, b].map(_group.ensureSearchExpressionGroupArray);
  let [arrA, arrB] = arrs;
  arrB[0].clause = '&&';
  return arrA.concat(arrB);
}
},{"./group":"AN7n"}],"VB4o":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compare = require("./compare");

Object.keys(_compare).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _compare[key];
    }
  });
});

var _exec = require("./exec");

Object.keys(_exec).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _exec[key];
    }
  });
});

var _group = require("./group");

Object.keys(_group).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _group[key];
    }
  });
});

var _invert = require("./invert");

Object.keys(_invert).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _invert[key];
    }
  });
});

var _narrow = require("./narrow");

Object.keys(_narrow).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _narrow[key];
    }
  });
});
},{"./compare":"RvJY","./exec":"hqwp","./group":"AN7n","./invert":"jBu6","./narrow":"YlDD"}],"JCLk":[function(require,module,exports) {

},{}],"Fy6F":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.layerNames = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const layerNames = {
  cubes: 'LAYER_CUBES',
  lines: 'LAYER_LINES',
  text: 'LAYER_TEXT'
};
exports.layerNames = layerNames;
},{}],"yqJY":[function(require,module,exports) {
module.exports = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];
},{}],"U8lN":[function(require,module,exports) {
'use strict';

module.exports = require('./html-tags.json');
},{"./html-tags.json":"yqJY"}],"yoYL":[function(require,module,exports) {
module.exports = [
	"a",
	"altGlyph",
	"altGlyphDef",
	"altGlyphItem",
	"animate",
	"animateColor",
	"animateMotion",
	"animateTransform",
	"circle",
	"clipPath",
	"color-profile",
	"cursor",
	"defs",
	"desc",
	"ellipse",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"filter",
	"font",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignObject",
	"g",
	"glyph",
	"glyphRef",
	"hkern",
	"image",
	"line",
	"linearGradient",
	"marker",
	"mask",
	"metadata",
	"missing-glyph",
	"mpath",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialGradient",
	"rect",
	"script",
	"set",
	"stop",
	"style",
	"svg",
	"switch",
	"symbol",
	"text",
	"textPath",
	"title",
	"tref",
	"tspan",
	"use",
	"view",
	"vkern"
];
},{}],"VGVS":[function(require,module,exports) {
module.exports = require( './svg-tags.json' );
},{"./svg-tags.json":"yoYL"}],"YitK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElement = createElement;
exports.mount = mount;
exports.findElementByChildPositions = findElementByChildPositions;
exports.focusActiveElement = focusActiveElement;
exports.setActiveElement = setActiveElement;
exports.getActiveElementInfo = getActiveElementInfo;

var htmlTags = _interopRequireWildcard(require("html-tags"));

var svgTags = _interopRequireWildcard(require("svg-tags"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Decamelizes a string with/without a custom separator (hyphen by default).
 * from: https://ourcodeworld.com/articles/read/608/how-to-camelize-and-decamelize-strings-in-javascript
 *
 * @param str String in camelcase
 * @param separator Separator for the new decamelized string.
 */
function decamelize(str, separator = '-') {
  return str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase();
}

function createElement(tag, attrs, ...children) {
  if (typeof tag === 'function') {
    const fn = tag;
    const props = attrs;
    props.children = children;
    return fn(props);
  } else {
    const ns = tagNamespace(tag);
    const el = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
    const map = attrs;
    let ref;

    for (let name in map) {
      if (name && map.hasOwnProperty(name)) {
        let value = map[name];

        if (name === 'className' && value !== void 0) {
          setAttribute(el, ns, 'class', value.toString());
        } else if (name === 'disabled' && !value) {//do nothhing, omit this attribute
        } else if (value === null || value === undefined) {
          continue;
        } else if (value === true) {
          setAttribute(el, ns, name, name);
        } else if (typeof value === 'function') {
          if (name === 'ref') {
            ref = value;
          } else {
            el[name.toLowerCase()] = value;
          }
        } else if (typeof value === 'object') {
          setAttribute(el, ns, name, flatten(value));
        } else {
          setAttribute(el, ns, name, value.toString());
        }
      }
    }

    if (children && children.length > 0) {
      appendChildren(el, children);
    }

    if (ref) {
      ref(el);
    }

    return el;
  }
}

function setAttribute(el, ns, name, value) {
  if (ns) {
    el.setAttributeNS(null, name, value);
  } else {
    el.setAttribute(name, value);
  }
}

function flatten(o) {
  const arr = [];

  for (let prop in o) arr.push(`${decamelize(prop, '-')}:${o[prop]}`);

  return arr.join(';');
}

function addChild(parentElement, child) {
  if (child === null || child === undefined || typeof child === "boolean") {
    return;
  } else if (Array.isArray(child)) {
    appendChildren(parentElement, child);
  } else if (isElement(child)) {
    parentElement.appendChild(child);
  } else {
    parentElement.appendChild(document.createTextNode(child.toString()));
  }
}

function appendChildren(parentElement, children) {
  children.forEach(child => addChild(parentElement, child));
}

function isElement(el) {
  //nodeType cannot be zero https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  return !!el.nodeType;
}

function mount(element, container) {
  container.innerHTML = '';

  if (element) {
    addChild(container, element);
  }
}

function findElementByChildPositions(childPositions, container) {
  let element = container || document.body;
  let childPosition;

  while (element && childPositions.length) {
    childPosition = childPositions.shift();
    element = element.children.item(childPosition);
  }

  if (element) {
    return element;
  }

  ;
}

function focusActiveElement(element, activeElementInfo) {
  element.focus();
  element.scrollTop = activeElementInfo.scrollTop;
  const input = element;

  if (input.setSelectionRange && activeElementInfo && activeElementInfo.selectionStart != null && activeElementInfo.selectionEnd != null) {
    input.setSelectionRange(activeElementInfo.selectionStart, activeElementInfo.selectionEnd, activeElementInfo.selectionDirection);
  }
}

function setActiveElement(activeElementInfo, container) {
  if (activeElementInfo) {
    const element = findElementByChildPositions(activeElementInfo.childPositions, container);

    if (element) {
      focusActiveElement(element, activeElementInfo);
    }
  }
}

function getActiveElementInfo(container) {
  let element = document.activeElement;
  const {
    scrollTop,
    selectionDirection,
    selectionEnd,
    selectionStart
  } = element;
  const activeElementInfo = {
    childPositions: [],
    scrollTop,
    selectionDirection,
    selectionEnd,
    selectionStart
  };

  while (element && element !== document.body && element !== container) {
    activeElementInfo.childPositions.unshift(getChildPosition(element));
    element = element.parentElement;
  }

  if ((element === document.body || element === container) && activeElementInfo.childPositions.length) return activeElementInfo;
}

function getChildPosition(element) {
  let childPosition = 0;

  while (element = element.previousElementSibling) childPosition++;

  return childPosition;
}

function tagNamespace(tag) {
  //issue: this won't disambiguate certain tags which exist in both svg and html: <a>, <title> ...
  if (tag === 'svg' || svgTags.default.indexOf(tag) >= 0 && !(htmlTags.default.indexOf(tag) >= 0)) {
    return "http://www.w3.org/2000/svg";
  }
}
},{"html-tags":"U8lN","svg-tags":"VGVS"}],"KmGS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = void 0;

var _tsxCreateElement = require("tsx-create-element");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const KeyCodes = {
  ENTER: 13
};

const Table = props => {
  return (0, _tsxCreateElement.createElement)("table", {
    className: props.className
  }, props.children, props.rows.map((row, i) => (0, _tsxCreateElement.createElement)("tr", {
    className: props.rowClassName || '',
    onClick: e => props.onRowClick && props.onRowClick(e, i),
    tabIndex: props.onRowClick ? 0 : -1,
    onKeyUp: e => {
      if (e.keyCode === KeyCodes.ENTER && props.onRowClick) {
        props.onRowClick(e, i);
      }
    }
  }, row.cells.map((cell, i) => (0, _tsxCreateElement.createElement)("td", {
    className: cell.className || '',
    title: cell.title || ''
  }, cell.content)))));
};

exports.Table = Table;
},{"tsx-create-element":"YitK"}],"kUTU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Table", {
  enumerable: true,
  get: function () {
    return _controls.Table;
  }
});

var _controls = require("../controls");
},{"../controls":"KmGS"}],"dNRs":[function(require,module,exports) {
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

},{}],"Oim5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concat = concat;
exports.allTruthy = allTruthy;
exports.push = push;

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function concat(...args) {
  return args.reduce((p, c) => c ? p.concat(c) : p, []);
}
/**
 * Returns array with items which are truthy.
 * @param args array or arrays to concat into a single array.
 */


function allTruthy(...args) {
  return args.reduce((p, c) => c ? p.concat(c) : p, []).filter(Boolean);
}
/**
 * Add an array to an existing array in place.
 * @param arr Array to append to.
 * @param items Arrof of items to append.
 */


function push(arr, items) {
  arr.push.apply(arr, items);
}
},{}],"i6BN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEl = addEl;
exports.addDiv = addDiv;
exports.outerSize = outerSize;

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

/**
 * Create a new element as a child of another element.
 * @param tagName Tag name of the new tag to create.
 * @param parentElement Reference of the element to append to.
 * @returns new HTMLElement.
 */
function addEl(tagName, parentElement) {
  const el = document.createElement(tagName);
  parentElement.appendChild(el);
  return el;
}
/**
 * Create a new div HTMLElement as a child of another element.
 * @param parentElement Reference of the element to append to.
 * @param className Optional css class name to apply to the div.
 */


function addDiv(parentElement, className) {
  const div = addEl('div', parentElement);

  if (className) {
    div.className = className;
  }

  return div;
}
/**
 * Measure the outer height and width of an HTMLElement, including margin, padding and border.
 * @param el HTML Element to measure.
 */


function outerSize(el) {
  const cs = getComputedStyle(el);
  const height = parseFloat(cs.marginTop) + parseFloat(cs.paddingTop) + parseFloat(cs.borderTopWidth) + el.offsetHeight + parseFloat(cs.borderBottomWidth) + parseFloat(cs.paddingBottom) + parseFloat(cs.marginBottom);
  const width = parseFloat(cs.marginLeft) + parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth) + el.offsetWidth + parseFloat(cs.borderRightWidth) + parseFloat(cs.paddingRight) + parseFloat(cs.marginRight);
  return {
    height,
    width
  };
}
},{}],"hgzN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var isMergeableObject = function isMergeableObject(value) {
  return isNonNullObject(value) && !isSpecial(value);
};

function isNonNullObject(value) {
  return !!value && typeof value === 'object';
}

function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
} // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25


var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}

function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(function (element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}

function mergeObject(target, source, options) {
  var destination = {};

  if (options.isMergeableObject(target)) {
    Object.keys(target).forEach(function (key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }

  Object.keys(source).forEach(function (key) {
    if (!options.isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    } else {
      destination[key] = deepmerge(target[key], source[key], options);
    }
  });
  return destination;
}

function deepmerge(target, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}

deepmerge.all = function deepmergeAll(array, options) {
  if (!Array.isArray(array)) {
    throw new Error('first argument should be an array');
  }

  return array.reduce(function (prev, next) {
    return deepmerge(prev, next, options);
  }, {});
};

var deepmerge_1 = deepmerge;
var _default = deepmerge_1;
exports.default = _default;
},{}],"Jcn2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clone = clone;
exports.deepMerge = deepMerge;

var _deepmerge = _interopRequireWildcard(require("deepmerge"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const deepmerge = _deepmerge.default || _deepmerge;

function clone(objectToClone) {
  if (!objectToClone) return objectToClone;
  return deepmerge.all([objectToClone]);
}

const dontMerge = (destination, source) => source;

function deepMerge(...objectsToMerge) {
  const objects = objectsToMerge.filter(Boolean);
  return deepmerge.all(objects, {
    arrayMerge: dontMerge
  });
}
},{"deepmerge":"hgzN"}],"NpVm":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = Color;
exports.default = color;
exports.rgbConvert = rgbConvert;
exports.rgb = rgb;
exports.Rgb = Rgb;
exports.hslConvert = hslConvert;
exports.hsl = hsl;
exports.brighter = exports.darker = void 0;

var _define = _interopRequireWildcard(require("./define.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Color() {}

var darker = 0.7;
exports.darker = darker;
var brighter = 1 / darker;
exports.brighter = brighter;
var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};
(0, _define.default)(Color, color, {
  copy: function (channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function () {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
  : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
  : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
  : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
  : null // invalid hex
  ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
  : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
  : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
  : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
  : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
  : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
  : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
  : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

(0, _define.default)(Rgb, rgb, (0, _define.extend)(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function () {
    return this;
  },
  displayable: function () {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;

  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }

  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

(0, _define.default)(Hsl, hsl, (0, _define.extend)(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function () {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function () {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
/* From FvD 13.37, CSS Color Module Level 3 */

function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
},{"./define.js":"hdg1"}],"cyp8":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gray = gray;
exports.default = lab;
exports.Lab = Lab;
exports.lch = lch;
exports.hcl = hcl;
exports.Hcl = Hcl;

var _define = _interopRequireWildcard(require("./define.js"));

var _color = require("./color.js");

var _math = require("./math.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// https://observablehq.com/@mbostock/lab-and-rgb
var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
      x,
      z;
  if (r === g && g === b) x = z = y;else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

(0, _define.default)(Lab, lab, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function (k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function () {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new _color.Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);

  var h = Math.atan2(o.b, o.a) * _math.rad2deg;

  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * _math.deg2rad;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}

(0, _define.default)(Hcl, hcl, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function (k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function () {
    return hcl2lab(this).rgb();
  }
}));
},{"./define.js":"hdg1","./color.js":"NpVm","./math.js":"bVm2"}],"cAuQ":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cubehelix;
exports.Cubehelix = Cubehelix;

var _define = _interopRequireWildcard(require("./define.js"));

var _color = require("./color.js");

var _math = require("./math.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
      // NaN if l=0 or l=1
  h = s ? Math.atan2(k, bl) * _math.rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

(0, _define.default)(Cubehelix, cubehelix, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    k = k == null ? _color.brighter : Math.pow(_color.brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? _color.darker : Math.pow(_color.darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * _math.deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new _color.Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
  }
}));
},{"./define.js":"hdg1","./color.js":"NpVm","./math.js":"bVm2"}],"Mwak":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "color", {
  enumerable: true,
  get: function () {
    return _color.default;
  }
});
Object.defineProperty(exports, "rgb", {
  enumerable: true,
  get: function () {
    return _color.rgb;
  }
});
Object.defineProperty(exports, "hsl", {
  enumerable: true,
  get: function () {
    return _color.hsl;
  }
});
Object.defineProperty(exports, "lab", {
  enumerable: true,
  get: function () {
    return _lab.default;
  }
});
Object.defineProperty(exports, "hcl", {
  enumerable: true,
  get: function () {
    return _lab.hcl;
  }
});
Object.defineProperty(exports, "lch", {
  enumerable: true,
  get: function () {
    return _lab.lch;
  }
});
Object.defineProperty(exports, "gray", {
  enumerable: true,
  get: function () {
    return _lab.gray;
  }
});
Object.defineProperty(exports, "cubehelix", {
  enumerable: true,
  get: function () {
    return _cubehelix.default;
  }
});

var _color = _interopRequireWildcard(require("./color.js"));

var _lab = _interopRequireWildcard(require("./lab.js"));

var _cubehelix = _interopRequireDefault(require("./cubehelix.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./color.js":"NpVm","./lab.js":"cyp8","./cubehelix.js":"cAuQ"}],"j7Ij":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorIsEqual = colorIsEqual;
exports.colorFromString = colorFromString;
exports.colorToString = colorToString;
exports.desaturate = desaturate;

var _d3Color = require("d3-color");

function rgbToDeckglColor(c) {
  return [c.r, c.g, c.b, c.opacity * 255];
}
/**
 * Compares 2 colors to see if they are equal.
 * @param a RGBAColor to compare
 * @param b RGBAColor to compare
 * @returns True if colors are equal.
 */


function colorIsEqual(a, b) {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
/**
 * Convert a CSS color string to a Deck.gl RGBAColor array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.).
 * @param cssColorSpecifier A CSS Color Module Level 3 specifier string.
 */


function colorFromString(cssColorSpecifier) {
  if (cssColorSpecifier) {
    const dc = (0, _d3Color.color)(cssColorSpecifier);

    if (dc) {
      const c = dc.rgb();
      return rgbToDeckglColor(c);
    }
  }
}
/**
 * Convert a Deck.gl color to a CSS rgba() string.
 * @param color A Deck.gl RGBAColor array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.)
 */


function colorToString(color) {
  const c = [...color];

  if (c.length > 3) {
    c[3] /= 255;
  }

  return `rgba(${c.join(',')})`;
}

function desaturate(color, value) {
  const rgb = (0, _d3Color.rgb)(color[0], color[1], color[2], color[3] / 255);
  const hslColor = (0, _d3Color.hsl)(rgb);
  hslColor.s = value;
  const c = hslColor.rgb();
  return rgbToDeckglColor(c);
}
},{"d3-color":"Mwak"}],"To8D":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.use = use;
exports.base = void 0;
let vega = {
  CanvasHandler: null,
  inferType: null,
  inferTypes: null,
  loader: null,
  parse: null,
  read: null,
  renderModule: null,
  Renderer: null,
  sceneVisit: null,
  scheme: null,
  truncate: null,
  View: null
};
let deck = {
  _CameraLight: null,
  AmbientLight: null,
  CompositeLayer: null,
  COORDINATE_SYSTEM: null,
  Deck: null,
  DirectionalLight: null,
  Layer: null,
  LightingEffect: null,
  LinearInterpolator: null,
  OrbitView: null,
  OrbitController: null,
  gouraudLighting: null,
  picking: null,
  project32: null
};
let layers = {
  IconLayer: null,
  LineLayer: null,
  PathLayer: null,
  PolygonLayer: null,
  TextLayer: null
};
let luma = {
  CubeGeometry: null,
  Model: null,
  Texture2D: null
};
/**
 * References to dependency libraries.
 */

const base = {
  deck,
  layers,
  luma,
  vega
};
/**
 * Specify the dependency libraries to use for rendering.
 * @param vega Vega library.
 * @param deck deck/core library.
 * @param layers deck/layers library.
 * @param luma luma.gl library.
 */

exports.base = base;

function use(vega, deck, layers, luma) {
  base.deck = deck;
  base.layers = layers;
  base.luma = luma;
  base.vega = vega;
}
},{}],"mHNm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
var _default = `\
#define SHADER_NAME cube-layer-fragment-shader

precision highp float;

varying vec4 vColor;

void main(void) {
  gl_FragColor = vColor;

  // use highlight color if this fragment belongs to the selected object.
  gl_FragColor = picking_filterHighlightColor(gl_FragColor);

  // use picking color if rendering to picking FBO.
  gl_FragColor = picking_filterPickingColor(gl_FragColor);
}
`;
exports.default = _default;
},{}],"jQIe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStage = createStage;
exports.minPixelSize = exports.min3dDepth = exports.defaultView = exports.lineZ = exports.groupStrokeWidth = exports.defaultPresenterConfig = exports.defaultPresenterStyle = exports.minWidth = exports.minHeight = void 0;
const minHeight = '100px';
exports.minHeight = minHeight;
const minWidth = '100px'; // const lightSettings: { [view in View]: LightSettings } = {
//     '2d': {},
//     '3d': {
//         lightsPosition: [-122.45, 37.66, 8000, -122.0, 38.0, 8000],
//         ambientRatio: 0.3,
//         diffuseRatio: 0.6,
//         specularRatio: 0.4,
//         lightsStrength: [0.3, 0.0, 0.8, 0.0],
//         numberOfLights: 2
//     }
// };

exports.minWidth = minWidth;
const defaultPresenterStyle = {
  cssPrefix: 'vega-deckgl-',
  defaultCubeColor: [128, 128, 128, 255],
  highlightColor: [0, 0, 0, 255]
};
exports.defaultPresenterStyle = defaultPresenterStyle;
const defaultPresenterConfig = {
  onCubeClick: (e, cube) => {},
  onCubeHover: (e, cube) => {},
  transitionDurations: {
    color: 100,
    position: 600,
    size: 600,
    view: 600
  }
};
exports.defaultPresenterConfig = defaultPresenterConfig;

function createStage(view) {
  const stage = {
    view,
    cubeData: [],
    axes: {
      x: [],
      y: []
    },
    gridLines: [],
    textData: [],
    legend: {
      rows: {}
    },
    facets: []
  };
  return stage;
}

const groupStrokeWidth = 1;
exports.groupStrokeWidth = groupStrokeWidth;
const lineZ = -1;
exports.lineZ = lineZ;
const defaultView = '2d';
exports.defaultView = defaultView;
const min3dDepth = 0.05;
exports.min3dDepth = min3dDepth;
const minPixelSize = 0.5;
exports.minPixelSize = minPixelSize;
},{}],"zIwf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defaults = require("../defaults");

// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
var _default = `\
#define SHADER_NAME cube-layer-vertex-shader

attribute vec3 positions;
attribute vec3 normals;

attribute vec3 instancePositions;
attribute vec3 instancePositions64Low;
attribute vec3 instanceSizes;
attribute vec4 instanceColors;
attribute vec3 instancePickingColors;

// Custom uniforms
uniform float lightingMix;

// Result
varying vec4 vColor;

void main(void) {

  float x = instanceSizes.x > 0.0 ? max(instanceSizes.x, ${_defaults.minPixelSize.toFixed(1)}) : 0.0;
  float y = instanceSizes.y > 0.0 ? max(instanceSizes.y, ${_defaults.minPixelSize.toFixed(1)}) : 0.0;

  // if alpha == 0.0, do not render element
  float noRender = float(instanceColors.a == 0.0);
  float finalXScale = project_size(x) * mix(1.0, 0.0, noRender);
  float finalYScale = project_size(y) * mix(1.0, 0.0, noRender);
  float finalZScale = project_size(instanceSizes.z) * mix(1.0, 0.0, noRender);

  // cube geometry vertics are between -1 to 1, scale and transform it to between 0, 1
  vec3 offset = vec3(
    (positions.x + 1.0) / 2.0 * finalXScale,
    (positions.y + 1.0) / 2.0 * finalYScale,
    (positions.z + 1.0) / 2.0 * finalZScale);

  // extrude positions
  vec4 position_worldspace;
  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset, position_worldspace);
  
  vec3 lightColor = lighting_getLightColor(instanceColors.rgb, project_uCameraPosition, position_worldspace.xyz, project_normal(normals));
  vec3 mixedLight = mix(instanceColors.rgb, lightColor, lightingMix);
  vec4 color = vec4(mixedLight, instanceColors.a) / 255.0;
  vColor = color;

  // Set color to be rendered to picking fbo (also used to check for selection highlight).
  picking_setPickingColor(instancePickingColors);
}
`;
exports.default = _default;
},{"../defaults":"jQIe"}],"gZmI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubeLayer = void 0;

var _cubeLayerFragment = _interopRequireDefault(require("./cube-layer-fragment.glsl"));

var _cubeLayerVertex = _interopRequireDefault(require("./cube-layer-vertex.glsl"));

var _base = require("../base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// Adapted from https://github.com/uber/deck.gl/blob/5.3-release/modules/layers/src/grid-cell-layer/grid-cell-layer.js
//https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
const UNSIGNED_BYTE = 0x1401;
const DOUBLE = 0x140a;
const DEFAULT_COLOR = [255, 0, 255, 255];
const defaultProps = {
  lightingMix: 0.5,
  getSize: x => x.size,
  getPosition: x => x.position,
  getColor: x => x.color,
  material: {
    ambient: 0.5,
    diffuse: 1
  }
};

function _CubeLayer(props) {
  //dynamic superclass, since we don't know have deck.Layer in the declaration phase
  class __CubeLayer extends _base.base.deck.Layer {
    getShaders() {
      return {
        vs: _cubeLayerVertex.default,
        fs: _cubeLayerFragment.default,
        modules: [_base.base.deck.project32, _base.base.deck.gouraudLighting, _base.base.deck.picking]
      };
    }

    initializeState() {
      const attributeManager = this.getAttributeManager();
      attributeManager.addInstanced({
        instancePositions: {
          size: 3,
          type: DOUBLE,
          transition: true,
          accessor: 'getPosition'
        },
        instanceSizes: {
          size: 3,
          transition: true,
          accessor: 'getSize'
        },
        instanceColors: {
          size: 4,
          type: UNSIGNED_BYTE,
          transition: true,
          accessor: 'getColor',
          defaultValue: DEFAULT_COLOR
        }
      });
    }

    updateState({
      props,
      oldProps,
      changeFlags
    }) {
      super.updateState({
        props,
        oldProps,
        changeFlags
      }); //TODO add parameter type to deck.gl-typings
      // Re-generate model if geometry changed
      //if (props.fp64 !== oldProps.fp64) {

      const {
        gl
      } = this.context;

      if (this.state.model) {
        this.state.model.delete();
      }

      this.setState({
        model: this._getModel(gl)
      });
      this.getAttributeManager().invalidateAll(); //}
    }

    _getModel(gl) {
      return new _base.base.luma.Model(gl, Object.assign({}, this.getShaders(), {
        id: this.props.id,
        geometry: new _base.base.luma.CubeGeometry(),
        isInstanced: true
      }));
    }

    draw({
      uniforms
    }) {
      let {
        lightingMix
      } = this.props;

      if (this.props.interpolator && this.props.interpolator.layerInterpolatedProps) {
        lightingMix = this.props.interpolator.layerInterpolatedProps.lightingMix;
      }

      this.state.model.setUniforms(Object.assign({}, uniforms, {
        lightingMix
      })).draw();
    }

  }

  __CubeLayer.layerName = 'CubeLayer';
  __CubeLayer.defaultProps = defaultProps;
  const instance = new __CubeLayer(props);
  return instance;
} //signature to allow this function to be used with the 'new' keyword.
//need to trick the compiler by casting to 'any'.

/**
 * CubeLayer - a Deck.gl layer to render cuboids.
 * This is instantiatable by calling `new CubeLayer()`.
 */


const CubeLayer = _CubeLayer;
exports.CubeLayer = CubeLayer;
},{"./cube-layer-fragment.glsl":"mHNm","./cube-layer-vertex.glsl":"zIwf","../base":"To8D"}],"INt0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linear = linear;

function linear(t) {
  return +t;
}
},{}],"YHiQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quadIn = quadIn;
exports.quadOut = quadOut;
exports.quadInOut = quadInOut;

function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return t * (2 - t);
}

function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}
},{}],"qmX2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cubicIn = cubicIn;
exports.cubicOut = cubicOut;
exports.cubicInOut = cubicInOut;

function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
},{}],"dJ3h":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polyInOut = exports.polyOut = exports.polyIn = void 0;
var exponent = 3;

var polyIn = function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;
  return polyIn;
}(exponent);

exports.polyIn = polyIn;

var polyOut = function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;
  return polyOut;
}(exponent);

exports.polyOut = polyOut;

var polyInOut = function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;
  return polyInOut;
}(exponent);

exports.polyInOut = polyInOut;
},{}],"uHbA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sinIn = sinIn;
exports.sinOut = sinOut;
exports.sinInOut = sinInOut;
var pi = Math.PI,
    halfPi = pi / 2;

function sinIn(t) {
  return 1 - Math.cos(t * halfPi);
}

function sinOut(t) {
  return Math.sin(t * halfPi);
}

function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}
},{}],"VbvH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expIn = expIn;
exports.expOut = expOut;
exports.expInOut = expInOut;

function expIn(t) {
  return Math.pow(2, 10 * t - 10);
}

function expOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

function expInOut(t) {
  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
}
},{}],"Nnyc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circleIn = circleIn;
exports.circleOut = circleOut;
exports.circleInOut = circleInOut;

function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}

function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}
},{}],"WDS3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bounceIn = bounceIn;
exports.bounceOut = bounceOut;
exports.bounceInOut = bounceInOut;
var b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}

function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}

function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}
},{}],"LEz6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backInOut = exports.backOut = exports.backIn = void 0;
var overshoot = 1.70158;

var backIn = function custom(s) {
  s = +s;

  function backIn(t) {
    return t * t * ((s + 1) * t - s);
  }

  backIn.overshoot = custom;
  return backIn;
}(overshoot);

exports.backIn = backIn;

var backOut = function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((s + 1) * t + s) + 1;
  }

  backOut.overshoot = custom;
  return backOut;
}(overshoot);

exports.backOut = backOut;

var backInOut = function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;
  return backInOut;
}(overshoot);

exports.backInOut = backInOut;
},{}],"kSts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elasticInOut = exports.elasticOut = exports.elasticIn = void 0;
var tau = 2 * Math.PI,
    amplitude = 1,
    period = 0.3;

var elasticIn = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticIn(t) {
    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function (a) {
    return custom(a, p * tau);
  };

  elasticIn.period = function (p) {
    return custom(a, p);
  };

  return elasticIn;
}(amplitude, period);

exports.elasticIn = elasticIn;

var elasticOut = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticOut(t) {
    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function (a) {
    return custom(a, p * tau);
  };

  elasticOut.period = function (p) {
    return custom(a, p);
  };

  return elasticOut;
}(amplitude, period);

exports.elasticOut = elasticOut;

var elasticInOut = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0 ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p) : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function (a) {
    return custom(a, p * tau);
  };

  elasticInOut.period = function (p) {
    return custom(a, p);
  };

  return elasticInOut;
}(amplitude, period);

exports.elasticInOut = elasticInOut;
},{}],"id0f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "easeLinear", {
  enumerable: true,
  get: function () {
    return _linear.linear;
  }
});
Object.defineProperty(exports, "easeQuad", {
  enumerable: true,
  get: function () {
    return _quad.quadInOut;
  }
});
Object.defineProperty(exports, "easeQuadIn", {
  enumerable: true,
  get: function () {
    return _quad.quadIn;
  }
});
Object.defineProperty(exports, "easeQuadOut", {
  enumerable: true,
  get: function () {
    return _quad.quadOut;
  }
});
Object.defineProperty(exports, "easeQuadInOut", {
  enumerable: true,
  get: function () {
    return _quad.quadInOut;
  }
});
Object.defineProperty(exports, "easeCubic", {
  enumerable: true,
  get: function () {
    return _cubic.cubicInOut;
  }
});
Object.defineProperty(exports, "easeCubicIn", {
  enumerable: true,
  get: function () {
    return _cubic.cubicIn;
  }
});
Object.defineProperty(exports, "easeCubicOut", {
  enumerable: true,
  get: function () {
    return _cubic.cubicOut;
  }
});
Object.defineProperty(exports, "easeCubicInOut", {
  enumerable: true,
  get: function () {
    return _cubic.cubicInOut;
  }
});
Object.defineProperty(exports, "easePoly", {
  enumerable: true,
  get: function () {
    return _poly.polyInOut;
  }
});
Object.defineProperty(exports, "easePolyIn", {
  enumerable: true,
  get: function () {
    return _poly.polyIn;
  }
});
Object.defineProperty(exports, "easePolyOut", {
  enumerable: true,
  get: function () {
    return _poly.polyOut;
  }
});
Object.defineProperty(exports, "easePolyInOut", {
  enumerable: true,
  get: function () {
    return _poly.polyInOut;
  }
});
Object.defineProperty(exports, "easeSin", {
  enumerable: true,
  get: function () {
    return _sin.sinInOut;
  }
});
Object.defineProperty(exports, "easeSinIn", {
  enumerable: true,
  get: function () {
    return _sin.sinIn;
  }
});
Object.defineProperty(exports, "easeSinOut", {
  enumerable: true,
  get: function () {
    return _sin.sinOut;
  }
});
Object.defineProperty(exports, "easeSinInOut", {
  enumerable: true,
  get: function () {
    return _sin.sinInOut;
  }
});
Object.defineProperty(exports, "easeExp", {
  enumerable: true,
  get: function () {
    return _exp.expInOut;
  }
});
Object.defineProperty(exports, "easeExpIn", {
  enumerable: true,
  get: function () {
    return _exp.expIn;
  }
});
Object.defineProperty(exports, "easeExpOut", {
  enumerable: true,
  get: function () {
    return _exp.expOut;
  }
});
Object.defineProperty(exports, "easeExpInOut", {
  enumerable: true,
  get: function () {
    return _exp.expInOut;
  }
});
Object.defineProperty(exports, "easeCircle", {
  enumerable: true,
  get: function () {
    return _circle.circleInOut;
  }
});
Object.defineProperty(exports, "easeCircleIn", {
  enumerable: true,
  get: function () {
    return _circle.circleIn;
  }
});
Object.defineProperty(exports, "easeCircleOut", {
  enumerable: true,
  get: function () {
    return _circle.circleOut;
  }
});
Object.defineProperty(exports, "easeCircleInOut", {
  enumerable: true,
  get: function () {
    return _circle.circleInOut;
  }
});
Object.defineProperty(exports, "easeBounce", {
  enumerable: true,
  get: function () {
    return _bounce.bounceOut;
  }
});
Object.defineProperty(exports, "easeBounceIn", {
  enumerable: true,
  get: function () {
    return _bounce.bounceIn;
  }
});
Object.defineProperty(exports, "easeBounceOut", {
  enumerable: true,
  get: function () {
    return _bounce.bounceOut;
  }
});
Object.defineProperty(exports, "easeBounceInOut", {
  enumerable: true,
  get: function () {
    return _bounce.bounceInOut;
  }
});
Object.defineProperty(exports, "easeBack", {
  enumerable: true,
  get: function () {
    return _back.backInOut;
  }
});
Object.defineProperty(exports, "easeBackIn", {
  enumerable: true,
  get: function () {
    return _back.backIn;
  }
});
Object.defineProperty(exports, "easeBackOut", {
  enumerable: true,
  get: function () {
    return _back.backOut;
  }
});
Object.defineProperty(exports, "easeBackInOut", {
  enumerable: true,
  get: function () {
    return _back.backInOut;
  }
});
Object.defineProperty(exports, "easeElastic", {
  enumerable: true,
  get: function () {
    return _elastic.elasticOut;
  }
});
Object.defineProperty(exports, "easeElasticIn", {
  enumerable: true,
  get: function () {
    return _elastic.elasticIn;
  }
});
Object.defineProperty(exports, "easeElasticOut", {
  enumerable: true,
  get: function () {
    return _elastic.elasticOut;
  }
});
Object.defineProperty(exports, "easeElasticInOut", {
  enumerable: true,
  get: function () {
    return _elastic.elasticInOut;
  }
});

var _linear = require("./linear.js");

var _quad = require("./quad.js");

var _cubic = require("./cubic.js");

var _poly = require("./poly.js");

var _sin = require("./sin.js");

var _exp = require("./exp.js");

var _circle = require("./circle.js");

var _bounce = require("./bounce.js");

var _back = require("./back.js");

var _elastic = require("./elastic.js");
},{"./linear.js":"INt0","./quad.js":"YHiQ","./cubic.js":"qmX2","./poly.js":"dJ3h","./sin.js":"uHbA","./exp.js":"VbvH","./circle.js":"Nnyc","./bounce.js":"WDS3","./back.js":"LEz6","./elastic.js":"kSts"}],"U4xU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLayers = getLayers;
exports.getCubeLayer = getCubeLayer;
exports.getCubes = getCubes;

var _array = require("./array");

var _base = require("./base");

var _constants = require("./constants");

var _cubeLayer = require("./cube-layer/cube-layer");

var _d3Ease = require("d3-ease");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function getLayers(presenter, config, stage, lightSettings
/*LightSettings*/
, lightingMix, interpolator, guideLines) {
  const cubeLayer = newCubeLayer(presenter, config, stage.cubeData, presenter.style.highlightColor, lightSettings, lightingMix, interpolator);
  const {
    x,
    y
  } = stage.axes;
  const lines = (0, _array.concat)(stage.gridLines, guideLines);
  const texts = [...stage.textData];
  [x, y].forEach(axes => {
    axes.forEach(axis => {
      if (axis.domain) lines.push(axis.domain);
      if (axis.ticks) lines.push.apply(lines, axis.ticks);
      if (axis.tickText) texts.push.apply(texts, axis.tickText);
      if (axis.title) texts.push(axis.title);
    });
  });

  if (stage.facets) {
    stage.facets.forEach(f => {
      if (f.lines) lines.push.apply(lines, f.lines);
    });
  }

  const lineLayer = newLineLayer(_constants.layerNames.lines, lines);
  const textLayer = newTextLayer(presenter, _constants.layerNames.text, texts, config, presenter.style.fontFamily);
  return [textLayer, cubeLayer, lineLayer];
}

function newCubeLayer(presenter, config, cubeData, highlightColor, lightSettings
/*LightSettings*/
, lightingMix, interpolator) {
  const getPosition = getTiming(config.transitionDurations.position, _d3Ease.easeExpInOut);
  const getSize = getTiming(config.transitionDurations.size, _d3Ease.easeExpInOut);
  const getColor = getTiming(config.transitionDurations.color);
  const cubeLayerProps = {
    interpolator,
    lightingMix,
    id: _constants.layerNames.cubes,
    data: cubeData,
    coordinateSystem: _base.base.deck.COORDINATE_SYSTEM.CARTESIAN,
    pickable: true,
    autoHighlight: true,
    highlightColor,
    onClick: (o, e) => {
      config.onCubeClick(e && e.srcEvent, o.object);
    },
    onHover: (o, e) => {
      if (o.index === -1) {
        presenter.deckgl.interactiveState.onCube = false;
        config.onCubeHover(e && e.srcEvent, null);
      } else {
        presenter.deckgl.interactiveState.onCube = true;
        config.onCubeHover(e && e.srcEvent, o.object);
      }
    },
    //lightSettings,
    transitions: {
      getPosition,
      getColor,
      getSize
    }
  };
  return new _cubeLayer.CubeLayer(cubeLayerProps);
}

function newLineLayer(id, data) {
  return new _base.base.layers.LineLayer({
    id,
    data,
    widthUnits: 'pixels',
    coordinateSystem: _base.base.deck.COORDINATE_SYSTEM.CARTESIAN,
    getColor: o => o.color,
    getWidth: o => o.strokeWidth
  });
}

function newTextLayer(presenter, id, data, config, fontFamily) {
  const props = {
    id,
    data,
    coordinateSystem: _base.base.deck.COORDINATE_SYSTEM.CARTESIAN,
    sizeUnits: 'pixels',
    autoHighlight: true,
    pickable: true,
    highlightColor: p => {
      if (config.getTextHighlightColor) {
        return config.getTextHighlightColor(p.object);
      } else {
        return [0, 0, 0, 0];
      }
    },
    onClick: (o, e) => {
      let pe = e && e.srcEvent;
      config.onTextClick && config.onTextClick(pe, o.object);
    },
    onHover: (o, e) => {
      if (o.index === -1) {
        presenter.deckgl.interactiveState.onText = false;
      } else {
        presenter.deckgl.interactiveState.onText = config.onTextHover ? config.onTextHover(e && e.srcEvent, o.object) : true;
      }
    },
    getColor: config.getTextColor || (o => o.color),
    getTextAnchor: o => o.textAnchor,
    getSize: o => o.size,
    getAngle: o => o.angle,
    fontSettings: {
      sdf: true,
      fontSize: 128,
      buffer: 3
    }
  };

  if (fontFamily) {
    props.fontFamily = fontFamily;
  }

  return new _base.base.layers.TextLayer(props);
}

function getTiming(duration, easing) {
  let timing;

  if (duration) {
    timing = {
      duration,
      type: 'interpolation'
    };

    if (easing) {
      timing.easing = easing;
    }
  }

  return timing;
}

function getCubeLayer(deckProps) {
  return deckProps.layers.filter(layer => layer && layer.id === _constants.layerNames.cubes)[0];
}

function getCubes(deckProps) {
  const cubeLayer = getCubeLayer(deckProps);
  if (!cubeLayer) return;
  const cubeLayerProps = cubeLayer.props;
  return cubeLayerProps.data;
}
},{"./array":"Oim5","./base":"To8D","./constants":"Fy6F","./cube-layer/cube-layer":"gZmI","d3-ease":"id0f"}],"WeBf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "allTruthy", {
  enumerable: true,
  get: function () {
    return _array.allTruthy;
  }
});
Object.defineProperty(exports, "concat", {
  enumerable: true,
  get: function () {
    return _array.concat;
  }
});
Object.defineProperty(exports, "push", {
  enumerable: true,
  get: function () {
    return _array.push;
  }
});
Object.defineProperty(exports, "addDiv", {
  enumerable: true,
  get: function () {
    return _htmlHelpers.addDiv;
  }
});
Object.defineProperty(exports, "addEl", {
  enumerable: true,
  get: function () {
    return _htmlHelpers.addEl;
  }
});
Object.defineProperty(exports, "outerSize", {
  enumerable: true,
  get: function () {
    return _htmlHelpers.outerSize;
  }
});
Object.defineProperty(exports, "clone", {
  enumerable: true,
  get: function () {
    return _clone.clone;
  }
});
Object.defineProperty(exports, "deepMerge", {
  enumerable: true,
  get: function () {
    return _clone.deepMerge;
  }
});
Object.defineProperty(exports, "colorFromString", {
  enumerable: true,
  get: function () {
    return _color.colorFromString;
  }
});
Object.defineProperty(exports, "colorIsEqual", {
  enumerable: true,
  get: function () {
    return _color.colorIsEqual;
  }
});
Object.defineProperty(exports, "colorToString", {
  enumerable: true,
  get: function () {
    return _color.colorToString;
  }
});
Object.defineProperty(exports, "desaturate", {
  enumerable: true,
  get: function () {
    return _color.desaturate;
  }
});
Object.defineProperty(exports, "createElement", {
  enumerable: true,
  get: function () {
    return _tsxCreateElement.createElement;
  }
});
Object.defineProperty(exports, "getActiveElementInfo", {
  enumerable: true,
  get: function () {
    return _tsxCreateElement.getActiveElementInfo;
  }
});
Object.defineProperty(exports, "mount", {
  enumerable: true,
  get: function () {
    return _tsxCreateElement.mount;
  }
});
Object.defineProperty(exports, "setActiveElement", {
  enumerable: true,
  get: function () {
    return _tsxCreateElement.setActiveElement;
  }
});
Object.defineProperty(exports, "getCubeLayer", {
  enumerable: true,
  get: function () {
    return _layers.getCubeLayer;
  }
});
Object.defineProperty(exports, "getCubes", {
  enumerable: true,
  get: function () {
    return _layers.getCubes;
  }
});

var _array = require("../array");

var _htmlHelpers = require("../htmlHelpers");

var _clone = require("../clone");

var _color = require("../color");

var _tsxCreateElement = require("tsx-create-element");

var _layers = require("../layers");
},{"../array":"Oim5","../htmlHelpers":"i6BN","../clone":"Jcn2","../color":"j7Ij","tsx-create-element":"YitK","../layers":"U4xU"}],"gyzW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrbitControllerClass = createOrbitControllerClass;

var _base = require("../base");

function createOrbitControllerClass(factoryOptions) {
  function wrapper(props) {
    class OrbitControllerInternal extends _base.base.deck.OrbitController {
      constructor(props) {
        super(props);
        this.invertPan = true;
      }

      handleEvent(event) {
        if (event.type === 'doubletap') {
          if (factoryOptions && factoryOptions.doubleClickHandler) {
            return factoryOptions.doubleClickHandler(event, this);
          }
        }

        return super.handleEvent(event);
      }

    }

    const instance = new OrbitControllerInternal(props);
    return instance;
  }

  return wrapper;
}
},{"../base":"To8D"}],"NGGy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDeckGLClassesForPresenter = createDeckGLClassesForPresenter;

var _base = require("../base");

var _orbitController = require("./orbitController");

//adapted from https://github.com/uber/deck.gl/blob/5.3-release/modules/lite/src/deckgl.js
const CANVAS_STYLE = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}; // Create canvas elements for map and deck

function createCanvas(props) {
  let {
    container = document.body
  } = props;

  if (typeof container === 'string') {
    container = document.getElementById(container);
  }

  if (!container) {
    throw Error('Deck: container not found');
  } // Add DOM elements


  const containerStyle = window.getComputedStyle(container);

  if (containerStyle.position === 'static') {
    container.style.position = 'relative';
  }

  const deckCanvas = document.createElement('canvas');
  container.appendChild(deckCanvas);
  Object.assign(deckCanvas.style, CANVAS_STYLE);
  return {
    container,
    deckCanvas
  };
}
/**
 * Creates Deck.gl classes for rendering WebGL.
 * DEck.gl is instantiatable by calling `new createDeckGLClassesForPresenter(controlleroptions)(deckProps)`.
 */


function createDeckGLClassesForPresenter(factoryOptions) {
  const OrbitControllerClass = (0, _orbitController.createOrbitControllerClass)(factoryOptions); //dynamic superclass lets us create a subclass at execution phase instead of declaration phase.
  //This allows us to retrieve Deck from either UMD or ES6 consumers of this class.

  function wrapper(props) {
    /**
     * @params container (Element) - DOM element to add deck.gl canvas to
     * @params controller (Object) - Controller class. Leave empty for auto detection
     */
    class DeckGLInternal extends _base.base.deck.Deck {
      constructor(props) {
        if (typeof document === 'undefined') {
          // Not browser
          throw Error('Deck can only be used in the browser');
        }

        const {
          deckCanvas
        } = createCanvas(props);
        const viewState = props.initialViewState || props.viewState || {};
        super(Object.assign({}, props, {
          width: '100%',
          height: '100%',
          canvas: deckCanvas,
          controller: OrbitControllerClass,
          initialViewState: viewState
        })); // Callback for the controller

        this._updateViewState = params => {
          if (this.onViewStateChange) {
            this.onViewStateChange(params);
          }
        };
      }

      setProps(props) {
        // this._updateViewState must be bound to `this`
        // but we don't have access to the current instance before calling super().
        if ('onViewStateChange' in props && this._updateViewState) {
          // This is called at least once at _onRendererInitialized
          this.onViewStateChange = props.onViewStateChange;
          props.onViewStateChange = this._updateViewState;
        }

        super.setProps(props);
      }

    }

    const instance = new DeckGLInternal(props);
    return instance;
  }

  return {
    OrbitControllerClass,
    DeckGL_Class: wrapper
  };
}
},{"../base":"To8D","./orbitController":"gyzW"}],"BfWC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinearInterpolator = void 0;

var _base = require("../base");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function wrapper(props) {
  class LinearInterpolatorInternal extends _base.base.deck.LinearInterpolator {
    constructor(transitionProps) {
      super(transitionProps);
    }

    interpolateProps(viewStateStartProps, viewStateEndProps, t) {
      if (this.layerStartProps && this.layerEndProps) {
        this.layerInterpolatedProps = super.interpolateProps(this.layerStartProps, this.layerEndProps, t);
      }

      return super.interpolateProps(viewStateStartProps, viewStateEndProps, t);
    }

  }

  const instance = new LinearInterpolatorInternal(props);
  return instance;
}

const LinearInterpolator = wrapper;
exports.LinearInterpolator = LinearInterpolator;
},{"../base":"To8D"}],"ZnxW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lightingEffects = lightingEffects;

var _base = require("./base");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function lightingEffects() {
  const ambientLight = new _base.base.deck.AmbientLight({
    color: [255, 255, 255],
    intensity: 0.3
  });
  const cameraLight = new _base.base.deck._CameraLight({
    color: [255, 255, 255],
    intensity: 1
  }); // const directionalLight = new base.deck.DirectionalLight({
  //     color: [255, 255, 255],
  //     direction: [0, 0, -1],
  //     intensity: 0.2
  //   });

  return [new _base.base.deck.LightingEffect({
    ambientLight,
    cameraLight
  })];
}
},{"./base":"To8D"}],"qyL6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresenterElement = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

/**
 * HTML elements outputted by the presenter.
 */
var PresenterElement;
exports.PresenterElement = PresenterElement;

(function (PresenterElement) {
  PresenterElement[PresenterElement["root"] = 0] = "root";
  PresenterElement[PresenterElement["gl"] = 1] = "gl";
  PresenterElement[PresenterElement["panel"] = 2] = "panel";
  PresenterElement[PresenterElement["legend"] = 3] = "legend";
  PresenterElement[PresenterElement["vegaControls"] = 4] = "vegaControls";
})(PresenterElement || (exports.PresenterElement = PresenterElement = {}));
},{}],"zxV0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegendView = void 0;

var _tsxCreateElement = require("tsx-create-element");

var _controls = require("./controls");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const LegendView = props => {
  const rows = [];

  const addRow = (row, i) => {
    const fn = symbolMap[row.symbol.shape];
    let jsx;

    if (fn) {
      jsx = fn(row.symbol);
    } else {
      jsx = (0, _tsxCreateElement.createElement)("span", null, "x"); //console.log(`need to render ${row.symbol.shape} symbol shape`);
    }

    rows.push({
      cells: [{
        className: 'symbol',
        content: jsx
      }, {
        className: 'label',
        content: row.label,
        title: row.label
      }]
    });
  };

  var sorted = Object.keys(props.legend.rows).sort((a, b) => +a - +b);
  sorted.forEach(i => addRow(props.legend.rows[i], +i));

  if (sorted.length) {
    return (0, _tsxCreateElement.createElement)(_controls.Table, {
      rows: rows,
      rowClassName: "legend-row",
      onRowClick: (e, i) => props.onClick(e, props.legend, i)
    }, props.legend.title !== void 0 && (0, _tsxCreateElement.createElement)("tr", {
      onClick: e => props.onClick(e, props.legend, null)
    }, (0, _tsxCreateElement.createElement)("th", {
      colSpan: 2
    }, props.legend.title)));
  }
};

exports.LegendView = LegendView;
const symbolMap = {
  square: function (symbol) {
    return (0, _tsxCreateElement.createElement)("div", {
      style: {
        height: `${symbol.bounds.y2 - symbol.bounds.y1}px`,
        width: `${symbol.bounds.x2 - symbol.bounds.x1}px`,
        backgroundColor: symbol.fill,
        borderColor: symbol.fill
      }
    });
  }
};
},{"tsx-create-element":"YitK","./controls":"KmGS"}],"YfRA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.box = box;
exports.default = void 0;

var _base = require("../base");

var _color = require("../color");

var _defaults = require("../defaults");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const markStager = (options, stage, scene, x, y, groupType) => {
  _base.base.vega.sceneVisit(scene, function (item) {
    var x1, y1, x2, y2;
    x1 = item.x || 0;
    y1 = item.y || 0;
    x2 = item.x2 != null ? item.x2 : x1;
    y2 = item.y2 != null ? item.y2 : y1;
    const lineItem = styledLine(x1 + x, y1 + y, x2 + x, y2 + y, item.stroke, item.strokeWidth);

    if (item.mark.role === 'axis-tick') {
      options.currAxis.ticks.push(lineItem);
    } else if (item.mark.role === 'axis-domain') {
      options.currAxis.domain = lineItem;
    } else {
      stage.gridLines.push(lineItem);
    }
  });
};

function styledLine(x1, y1, x2, y2, stroke, strokeWidth) {
  const line = {
    sourcePosition: [x1, -y1, _defaults.lineZ],
    targetPosition: [x2, -y2, _defaults.lineZ],
    color: (0, _color.colorFromString)(stroke),
    strokeWidth: strokeWidth
  };
  return line;
}

function box(gx, gy, height, width, stroke, strokeWidth, diagonals = false) {
  const lines = [styledLine(gx, gy, gx + width, gy, stroke, strokeWidth), styledLine(gx + width, gy, gx + width, gy + height, stroke, strokeWidth), styledLine(gx + width, gy + height, gx, gy + height, stroke, strokeWidth), styledLine(gx, gy + height, gx, gy, stroke, strokeWidth)];

  if (diagonals) {
    lines.push(styledLine(gx, gy, gx + width, gy + height, stroke, strokeWidth));
    lines.push(styledLine(gx, gy + height, gx + width, gy, stroke, strokeWidth));
  }

  return lines;
}

var _default = markStager;
exports.default = _default;
},{"../base":"To8D","../color":"j7Ij","../defaults":"jQIe"}],"qkJA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializePanel = initializePanel;
exports.className = className;

var _tsxCreateElement = require("tsx-create-element");

var _defaults = require("./defaults");

var _enums = require("./enums");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function initializePanel(presenter) {
  const rootDiv = (0, _tsxCreateElement.createElement)("div", {
    className: className(_enums.PresenterElement.root, presenter)
  }, (0, _tsxCreateElement.createElement)("div", {
    className: className(_enums.PresenterElement.gl, presenter),
    style: {
      minHeight: _defaults.minHeight,
      minWidth: _defaults.minWidth
    }
  }), (0, _tsxCreateElement.createElement)("div", {
    className: className(_enums.PresenterElement.panel, presenter)
  }, (0, _tsxCreateElement.createElement)("div", {
    className: className(_enums.PresenterElement.vegaControls, presenter)
  }), (0, _tsxCreateElement.createElement)("div", {
    className: className(_enums.PresenterElement.legend, presenter)
  })));
  (0, _tsxCreateElement.mount)(rootDiv, presenter.el);
}

function className(type, presenter) {
  return `${presenter.style.cssPrefix}${_enums.PresenterElement[type]}`;
}
},{"tsx-create-element":"YitK","./defaults":"jQIe","./enums":"qyL6"}],"sE6a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchCubeArray = patchCubeArray;

function patchCubeArray(allocatedSize, empty, cubes) {
  const patched = new Array(allocatedSize);
  patched.fill(empty);
  cubes.forEach(cube => patched[cube.ordinal] = cube);
  return patched;
}
},{}],"KS5e":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = require("../base");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const legendMap = {
  'legend-title': function (legend, textItem) {
    legend.title = textItem.text;
  },
  'legend-symbol': function (legend, symbol) {
    const {
      bounds,
      fill,
      shape
    } = symbol; //this object is safe for serialization

    const legendRowSymbol = {
      bounds,
      fill,
      shape
    };
    const i = symbol.datum.index;
    legend.rows[i] = legend.rows[i] || {};
    legend.rows[i].symbol = legendRowSymbol;
  },
  'legend-label': function (legend, label) {
    const i = label.datum.index;
    legend.rows[i] = legend.rows[i] || {};
    const row = legend.rows[i];
    row.label = label.text;
    row.value = label.datum.value;
  }
};

const markStager = (options, stage, scene, x, y, groupType) => {
  _base.base.vega.sceneVisit(scene, function (item) {
    const fn = legendMap[item.mark.role];

    if (fn) {
      fn(stage.legend, item);
    } else {//console.log(`need to render legend ${item.mark.role}`);
    }
  });
};

var _default = markStager;
exports.default = _default;
},{"../base":"To8D"}],"Bi9w":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = require("../base");

var _color = require("../color");

var _defaults = require("../defaults");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const markStager = (options, stage, scene, x, y, groupType) => {
  _base.base.vega.sceneVisit(scene, function (item) {
    //for orthographic (2d) - always use 0 or else Deck will not show them
    const z = stage.view === '2d' ? 0 : item.z || 0;
    const depth = (stage.view === '2d' ? 0 : item.depth || 0) + _defaults.min3dDepth; //change direction of y from SVG to GL

    const ty = -1;
    let ordinal = options.assignCubeOrdinal(item.datum);

    if (ordinal > options.maxOrdinal) {
      options.maxOrdinal = ordinal;
    }

    if (ordinal === undefined) {//TODO add to polygons
      //console.log('not a cube');
    } else {
      const cube = {
        ordinal,
        size: [item.width, item.height, depth],
        position: [x + (item.x || 0), ty * (y + (item.y || 0)) - item.height, z],
        color: (0, _color.colorFromString)(item.fill) || options.defaultCubeColor || [128, 128, 128, 128]
      };
      cube.color[3] = item.opacity === undefined ? 255 : 255 * item.opacity;
      stage.cubeData.push(cube);
    }
  });
};

var _default = markStager;
exports.default = _default;
},{"../base":"To8D","../color":"j7Ij","../defaults":"jQIe"}],"ZnIC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = require("../base");

var _color = require("../color");

const markStager = (options, stage, scene, x, y, groupType) => {
  //scale Deck.Gl text to Vega size
  const fontScale = 1; //change direction of y from SVG to GL

  const ty = -1;

  _base.base.vega.sceneVisit(scene, function (item) {
    if (!item.text) return;
    const size = item.fontSize * fontScale;
    const alignmentBaseline = convertBaseline(item.baseline);
    const yOffset = alignmentBaseline === 'top' ? item.fontSize / 2 : 0; //fixup to get tick text correct

    const textItem = {
      color: (0, _color.colorFromString)(item.fill),
      text: _base.base.vega.truncate(item.text, item.limit, 'right', item.ellipsis || '...'),
      position: [x + (item.x || 0), ty * (y + (item.y || 0) + yOffset), 0],
      size,
      angle: convertAngle(item.angle),
      textAnchor: convertAlignment(item.align),
      alignmentBaseline,
      metaData: item.metaData
    };

    if (item.mark.role === 'axis-label') {
      const tickText = textItem;
      tickText.value = item.datum.value;
      options.currAxis.tickText.push(tickText);
    } else if (item.mark.role === 'axis-title') {
      options.currAxis.title = textItem;
    } else {
      stage.textData.push(textItem);
    }
  });
};

function convertAngle(vegaTextAngle) {
  if (vegaTextAngle && !isNaN(vegaTextAngle)) {
    return 360 - vegaTextAngle;
  }

  return 0;
}

function convertAlignment(textAlign) {
  switch (textAlign) {
    case 'center':
      return 'middle';

    case 'left':
      return 'start';

    case 'right':
      return 'end';
  }

  return 'start';
}

function convertBaseline(baseline) {
  switch (baseline) {
    case 'middle':
      return 'center';
  }

  return baseline || 'bottom';
}

var _default = markStager;
exports.default = _default;
},{"../base":"To8D","../color":"j7Ij"}],"ESmf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupType = void 0;
var GroupType;
exports.GroupType = GroupType;

(function (GroupType) {
  GroupType[GroupType["none"] = 0] = "none";
  GroupType[GroupType["legend"] = 1] = "legend";
  GroupType[GroupType["xAxis"] = 2] = "xAxis";
  GroupType[GroupType["yAxis"] = 3] = "yAxis";
})(GroupType || (exports.GroupType = GroupType = {}));
},{}],"yA2f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sceneToStage = sceneToStage;

var _legend = _interopRequireDefault(require("./marks/legend"));

var _rect = _interopRequireDefault(require("./marks/rect"));

var _rule = _interopRequireWildcard(require("./marks/rule"));

var _text = _interopRequireDefault(require("./marks/text"));

var _base = require("./base");

var _color = require("./color");

var _defaults = require("./defaults");

var _interfaces = require("./marks/interfaces");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function getOrientItem(group) {
  if (group.orient) {
    return group;
  }

  return group.datum;
}

function convertGroupRole(group) {
  if (group.mark.role === 'legend') return _interfaces.GroupType.legend;

  if (group.mark.role === 'axis') {
    const orientItem = getOrientItem(group);

    if (orientItem) {
      switch (orientItem.orient) {
        case 'bottom':
        case 'top':
          return _interfaces.GroupType.xAxis;

        case 'left':
        case 'right':
          return _interfaces.GroupType.yAxis;
      }
    }
  }
}

const group = (options, stage, scene, x, y, groupType) => {
  _base.base.vega.sceneVisit(scene, function (g) {
    const gx = g.x || 0,
          gy = g.y || 0;

    if (g.context && g.context.background && !stage.backgroundColor) {
      stage.backgroundColor = (0, _color.colorFromString)(g.context.background);
    }

    if (g.stroke) {
      const facetRect = {
        datum: g.datum,
        lines: (0, _rule.box)(gx + x, gy + y, g.height, g.width, g.stroke, _defaults.groupStrokeWidth)
      };
      stage.facets.push(facetRect);
    }

    groupType = convertGroupRole(g) || groupType;
    setCurrentAxis(options, stage, groupType); // draw group contents

    _base.base.vega.sceneVisit(g, function (item) {
      mainStager(options, stage, item, gx + x, gy + y, groupType);
    });
  });
};

function setCurrentAxis(options, stage, groupType) {
  let axes;

  switch (groupType) {
    case _interfaces.GroupType.xAxis:
      axes = stage.axes.x;
      break;

    case _interfaces.GroupType.yAxis:
      axes = stage.axes.y;
      break;

    default:
      return;
  }

  options.currAxis = {
    domain: null,
    tickText: [],
    ticks: []
  };
  axes.push(options.currAxis);
}

const markStagers = {
  group,
  legend: _legend.default,
  rect: _rect.default,
  rule: _rule.default,
  text: _text.default
};

var mainStager = (options, stage, scene, x, y, groupType) => {
  if (scene.marktype !== 'group' && groupType === _interfaces.GroupType.legend) {
    (0, _legend.default)(options, stage, scene, x, y, groupType);
  } else {
    var markStager = markStagers[scene.marktype];

    if (markStager) {
      markStager(options, stage, scene, x, y, groupType);
    } else {//console.log(`need to render ${scene.marktype}`);
    }
  }
};

function sceneToStage(options, stage, scene) {
  mainStager(options, stage, scene, 0, 0, null);
  sortAxis(stage.axes.x, 0);
  sortAxis(stage.axes.y, 1);
}

function sortAxis(axes, dim) {
  axes.forEach(axis => {
    if (axis.domain) orderDomain(axis.domain, dim);
    axis.ticks.sort((a, b) => a.sourcePosition[dim] - b.sourcePosition[dim]);
    axis.tickText.sort((a, b) => a.position[dim] - b.position[dim]);
  });
}

function orderDomain(domain, dim) {
  if (domain.sourcePosition[dim] > domain.targetPosition[dim]) {
    const temp = domain.targetPosition;
    domain.targetPosition = domain.sourcePosition;
    domain.sourcePosition = temp;
  }
}
},{"./marks/legend":"KS5e","./marks/rect":"Bi9w","./marks/rule":"YfRA","./marks/text":"ZnIC","./base":"To8D","./color":"j7Ij","./defaults":"jQIe","./marks/interfaces":"ESmf"}],"sOaQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.targetViewState = targetViewState;
exports.viewStateProps = void 0;
const viewStateProps = ['target', 'rotationOrbit', 'rotationX', 'zoom'];
exports.viewStateProps = viewStateProps;

function targetViewState(height, width, view) {
  const target = [width / 2, -height / 2, 0];

  if (view === '2d') {
    return {
      target,
      rotationOrbit: 0,
      rotationX: 90,
      zoom: -0.2
    };
  } else {
    return {
      target,
      rotationOrbit: 25,
      rotationX: 30,
      zoom: -0.4
    };
  }
}
},{}],"VMtV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Presenter = void 0;

var _base = require("./base");

var _clone = require("./clone");

var _color = require("./color");

var _deckgl = require("./deck.gl-classes/deckgl");

var _linearInterpolator = require("./deck.gl-classes/linearInterpolator");

var _defaults = require("./defaults");

var _effects = require("./effects");

var _enums = require("./enums");

var _layers = require("./layers");

var _legend = require("./legend");

var _rule = require("./marks/rule");

var _panel = require("./panel");

var _patchedCubeArray = require("./patchedCubeArray");

var _stagers = require("./stagers");

var _viewState = require("./viewState");

var _d3Ease = require("d3-ease");

var _tsxCreateElement = require("tsx-create-element");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

/**
 * Class which presents a Stage of chart data using Deck.gl to render.
 */
class Presenter {
  /**
   * Instantiate a new Presenter.
   * @param el Parent HTMLElement to present within.
   * @param style Optional PresenterStyle styling options.
   */
  constructor(el, style) {
    this.el = el;
    this.style = (0, _clone.deepMerge)(_defaults.defaultPresenterStyle, style);
    (0, _panel.initializePanel)(this);
    this._last = {
      view: null,
      height: null,
      width: null,
      cubeCount: null,
      stage: null
    };
  }
  /**
   * Get the previously rendered Stage object.
   */


  get stage() {
    return this._last.stage;
  }
  /**
   * Get the current View camera type.
   */


  get view() {
    return this._last.view;
  }
  /**
   * Cancels any pending animation, calling animationCanceled() on original queue.
   */


  animationCancel() {
    if (this.animationTimer) {
      clearTimeout(this.animationTimer);
      this.animationTimer = null;

      if (this.logger) {
        this.logger(`canceling animation ${this.queuedAnimationOptions && this.queuedAnimationOptions.handlerLabel || 'handler'}`);
      }

      if (this.queuedAnimationOptions && this.queuedAnimationOptions.animationCanceled) {
        this.queuedAnimationOptions.animationCanceled.call(null);
      }
    }
  }
  /**
   * Stops the current animation and queues a new animation.
   * @param handler Function to invoke when timeout is complete.
   * @param timeout Length of time to wait before invoking the handler.
   * @param options Optional QueuedAnimationOptions object.
   */


  animationQueue(handler, timeout, options) {
    if (this.logger) {
      this.logger(`queueing animation ${options && options.waitingLabel || 'waiting'}...`);
    }

    this.animationCancel();
    this.animationTimer = setTimeout(() => {
      if (this.logger) {
        this.logger(`queueing animation ${options && options.handlerLabel || 'handler'}...`);
      }

      handler();
    }, timeout);
  }
  /**
   * Retrieve a sub-element of the rendered output.
   * @param type PresenterElement type of the HTMLElement to retrieve.
   */


  getElement(type) {
    const elements = this.el.getElementsByClassName((0, _panel.className)(type, this));

    if (elements && elements.length) {
      return elements[0];
    }
  }
  /**
   * Present the Vega Scene, or Stage object using Deck.gl.
   * @param sceneOrStage Vega Scene object, or Stage object containing chart layout info.
   * @param height Height of the rendering area.
   * @param width Width of the rendering area.
   * @param config Optional presentation configuration object.
   */


  present(sceneOrStage, height, width, config) {
    this.animationCancel();
    let scene = sceneOrStage;
    let stage;
    let options = {
      maxOrdinal: 0,
      currAxis: null,
      defaultCubeColor: this.style.defaultCubeColor,
      assignCubeOrdinal: config && config.onSceneRectAssignCubeOrdinal || (() => options.maxOrdinal++)
    }; //determine if this is a vega scene

    if (scene.marktype) {
      stage = (0, _defaults.createStage)(scene.view);
      (0, _stagers.sceneToStage)(options, stage, scene);
    } else {
      stage = sceneOrStage;
    }

    if (!this.deckgl) {
      const classes = (0, _deckgl.createDeckGLClassesForPresenter)({
        doubleClickHandler: () => {
          this.homeCamera();
        }
      });
      this.OrbitControllerClass = classes.OrbitControllerClass;
      const initialViewState = (0, _viewState.targetViewState)(height, width, stage.view);
      let glOptions;

      if (config && config.preserveDrawingBuffer) {
        glOptions = {
          preserveDrawingBuffer: true
        };
      }

      const deckProps = {
        glOptions,
        height: null,
        width: null,
        effects: (0, _effects.lightingEffects)(),
        layers: [],
        onClick: config && config.onLayerClick,
        views: [new _base.base.deck.OrbitView({
          controller: _base.base.deck.OrbitController
        })],
        initialViewState,
        container: this.getElement(_enums.PresenterElement.gl),
        getCursor: interactiveState => {
          if (interactiveState.onText || interactiveState.onAxisSelection) {
            return 'pointer';
          } else if (interactiveState.onCube) {
            return 'default';
          } else {
            return 'grab';
          }
        }
      };

      if (stage.backgroundColor) {
        deckProps.style = {
          'background-color': (0, _color.colorToString)(stage.backgroundColor)
        };
      }

      this.deckgl = new classes.DeckGL_Class(deckProps);
    }

    let cubeCount = Math.max(this._last.cubeCount, stage.cubeData.length);

    if (options.maxOrdinal) {
      cubeCount = Math.max(cubeCount, options.maxOrdinal);
      const empty = {
        isEmpty: true,
        color: [0, 0, 0, 0] // possibly a bug in Deck.gl? set color to invisible.

      };
      stage.cubeData = (0, _patchedCubeArray.patchCubeArray)(cubeCount, empty, stage.cubeData);
    }

    this.setDeckProps(stage, height, width, cubeCount, config);
    const a = (0, _tsxCreateElement.getActiveElementInfo)();
    (0, _tsxCreateElement.mount)((0, _legend.LegendView)({
      legend: stage.legend,
      onClick: config && config.onLegendClick
    }), this.getElement(_enums.PresenterElement.legend));
    (0, _tsxCreateElement.setActiveElement)(a);

    if (config && config.onPresent) {
      config.onPresent();
    }
  }
  /**
   * Present the same recently rendered Stage with only slight modifications such as a color change,
   * using the previous Stage values as a basis.
   * @param stage Partially populated Stage object containing changes.
   * @param modifyConfig Optional presentation configuration object.
   */


  rePresent(stage, modifyConfig) {
    const newStage = Object.assign(Object.assign({}, this._last.stage), stage);
    this.setDeckProps(newStage, this._last.height, this._last.width, this._last.cubeCount, modifyConfig);
  }

  isNewBounds(view, height, width, cubeCount) {
    const lastBounds = this.lastBounds();

    for (let prop in lastBounds) {
      if (lastBounds[prop] === null) return true;
    }

    const newBounds = {
      cubeCount,
      height,
      view,
      width
    };

    for (let prop in lastBounds) {
      if (lastBounds[prop] !== newBounds[prop]) return true;
    }
  }

  lastBounds() {
    const {
      cubeCount,
      height,
      view,
      width
    } = this._last;
    return {
      cubeCount,
      height,
      view,
      width
    };
  }

  setDeckProps(stage, height, width, cubeCount, modifyConfig) {
    const config = (0, _clone.deepMerge)(_defaults.defaultPresenterConfig, modifyConfig);
    const newBounds = this.isNewBounds(stage.view, height, width, cubeCount); //let lightSettings = this.style.lightSettings[stage.view];

    let lightingMix = stage.view === '3d' ? 1.0 : 0.0;
    let linearInterpolator; //choose the current OrbitView viewstate if possible

    let viewState = this.deckgl.viewState && Object.keys(this.deckgl.viewState).length && this.deckgl.viewState.OrbitView || //otherwise use the initial viewstate if any
    this.deckgl.props.viewState;

    if (!viewState || newBounds || config.shouldViewstateTransition && config.shouldViewstateTransition()) {
      let newViewStateTarget = true;

      if (config && config.onTargetViewState) {
        const result = config.onTargetViewState(height, width);
        height = result.height;
        width = result.width;

        if (result.newViewStateTarget !== undefined) {
          newViewStateTarget = result.newViewStateTarget;
        }
      }

      if (!viewState || newViewStateTarget) {
        viewState = (0, _viewState.targetViewState)(height, width, stage.view);
      }

      const oldCubeLayer = (0, _layers.getCubeLayer)(this.deckgl.props);

      if (oldCubeLayer) {
        linearInterpolator = new _linearInterpolator.LinearInterpolator(_viewState.viewStateProps);
        linearInterpolator.layerStartProps = {
          lightingMix: oldCubeLayer.props.lightingMix
        };
        linearInterpolator.layerEndProps = {
          lightingMix
        };
        viewState.transitionDuration = config.transitionDurations.view;
        viewState.transitionEasing = _d3Ease.easeExpInOut;
        viewState.transitionInterpolator = linearInterpolator;
      }

      if (stage.view === '2d') {//lightSettings = this.style.lightSettings['3d'];
      }
    }

    const guideLines = this._showGuides && (0, _rule.box)(0, 0, height, width, '#0f0', 1, true);
    config.preLayer && config.preLayer(stage);
    const layers = (0, _layers.getLayers)(this, config, stage,
    /*lightSettings*/
    null, lightingMix, linearInterpolator, guideLines);
    const deckProps = {
      effects: (0, _effects.lightingEffects)(),
      views: [new _base.base.deck.OrbitView({
        controller: _base.base.deck.OrbitController
      })],
      initialViewState: viewState,
      layers
    };

    if (config && config.preStage) {
      config.preStage(stage, deckProps);
    }

    requestAnimationFrame(() => this.deckgl.setProps(Object.assign(Object.assign({}, deckProps), {
      onAfterRender: () => {
        if (this._afterRenderHandler) {
          this._afterRenderHandler();
        }
      }
    })));
    delete stage.cubeData;
    this._last = {
      cubeCount,
      height,
      width,
      stage: stage,
      view: stage.view
    };
  }

  canvasToDataURL() {
    return new Promise((resolve, reject) => {
      this._afterRenderHandler = () => {
        this._afterRenderHandler = null;
        const png = this.deckgl.canvas.toDataURL('image/png');
        resolve(png);
      };
    });
  }
  /**
   * Home the camera to the last initial position.
   */


  homeCamera() {
    const viewState = (0, _viewState.targetViewState)(this._last.height, this._last.width, this._last.view);
    viewState.transitionDuration = _defaults.defaultPresenterConfig.transitionDurations.view;
    viewState.transitionEasing = _d3Ease.easeExpInOut;
    viewState.transitionInterpolator = new _linearInterpolator.LinearInterpolator(_viewState.viewStateProps);
    const deckProps = {
      effects: (0, _effects.lightingEffects)(),
      views: this.deckgl.props.views,
      initialViewState: viewState,
      layers: this.deckgl.props.layers
    };
    this.deckgl.setProps(deckProps);
  }
  /**
   * Get cube data array from the cubes layer.
   */


  getCubeData() {
    return (0, _layers.getCubes)(this.deckgl.props);
  }
  /**
   * Show guidelines of rendering height/width and center of OrbitView.
   */


  showGuides() {
    this._showGuides = true;
    this.getElement(_enums.PresenterElement.gl).classList.add('show-center');
    this.rePresent(Object.assign(Object.assign({}, this._last.stage), {
      cubeData: this.getCubeData()
    }));
  }

  finalize() {
    this.animationCancel();
    if (this.deckgl) this.deckgl.finalize();
    if (this.el) this.el.innerHTML = '';
    this._last = null;
    this.deckgl = null;
    this.el = null;
    this.logger = null;
    this.queuedAnimationOptions = null;
  }

}

exports.Presenter = Presenter;
},{"./base":"To8D","./clone":"Jcn2","./color":"j7Ij","./deck.gl-classes/deckgl":"NGGy","./deck.gl-classes/linearInterpolator":"BfWC","./defaults":"jQIe","./effects":"ZnxW","./enums":"qyL6","./layers":"U4xU","./legend":"zxV0","./marks/rule":"YfRA","./panel":"qkJA","./patchedCubeArray":"sE6a","./stagers":"yA2f","./viewState":"sOaQ","d3-ease":"id0f","tsx-create-element":"YitK"}],"wGit":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RendererGl = void 0;

var _base = require("../base");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
//pass in the SuperClass, which should be a vega.View
function _RendererGl(loader) {
  //dynamic superclass, since we don't know have vega.View in the declaration phase
  class RendererGlInternal extends _base.base.vega.Renderer {
    initialize(el, width, height, origin) {
      this.height = height;
      this.width = width; // this method will invoke resize to size the canvas appropriately

      return super.initialize(el, width, height, origin);
    }

    resize(width, height, origin) {
      super.resize(width, height, origin);
      this.origin = origin;
      this.height = height;
      this.width = width; //rteturn this for vega

      return this;
    }

    _render(scene, items) {
      const scene3d = scene;
      scene3d.view = this.getView();
      this.presenter.present(scene3d, this.height, this.width, this.presenterConfig); //return this for vega

      return this;
    }

  }

  const instance = new RendererGlInternal(loader);
  return instance;
} //signature to allow this function to be used with the 'new' keyword.
//need to trick the compiler by casting to 'any'.

/**
 * Subclass of Vega.Renderer, with added properties for accessing a Presenter.
 * This is instantiated by ViewGl.
 */


const RendererGl = _RendererGl;
exports.RendererGl = RendererGl;
},{"../base":"To8D"}],"FyHd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewGl = void 0;

var _base = require("../base");

var _defaults = require("../defaults");

var _presenter = require("../presenter");

var _enums = require("../enums");

var _rendererGl = require("./rendererGl");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
let registered = false; //dynamic superclass lets us create a subclass at execution phase instead of declaration phase.
//This allows us to retrieve vega.View from either UMD or ES6 consumers of this class.
//pass in the SuperClass, which should be a vega.View

function _ViewGl(runtime, config) {
  //dynamic superclass, since we don't know have vega.View in the declaration phase
  class ViewGlInternal extends _base.base.vega.View {
    constructor(runtime, config = {}) {
      super(runtime, config);
      this.config = config;
      this.presenter = config.presenter;
      config.presenterConfig = config.presenterConfig || {};

      config.presenterConfig.redraw = () => {
        this._redraw = true; //use Vega View private member _redraw

        this.run();
      };
    }

    renderer(renderer) {
      if (renderer === 'deck.gl' && !registered) {
        _base.base.vega.renderModule('deck.gl', {
          handler: _base.base.vega.CanvasHandler,
          renderer: _rendererGl.RendererGl
        });

        registered = true;
      }

      return super.renderer(renderer);
    }

    initialize(el) {
      if (!this.presenter) {
        this.presenter = new _presenter.Presenter(el);
      }

      super.initialize(this.presenter.getElement(_enums.PresenterElement.vegaControls));
      const renderer = this._renderer;
      renderer.presenterConfig = this.config.presenterConfig;
      renderer.presenter = this.presenter;

      renderer.getView = this.config && this.config.getView || (() => this.presenter.view || _defaults.defaultView);

      return this;
    }

    error(e) {
      if (this.presenter.logger) {
        this.presenter.logger(e);
      }
    }

  }

  const instance = new ViewGlInternal(runtime, config);
  return instance;
} //signature to allow this function to be used with the 'new' keyword.
//need to trick the compiler by casting to 'any'.

/**
 * Subclass of Vega.View, with added properties for accessing a Presenter.
 * This is instantiatable by calling `new ViewGl()`. See https://vega.github.io/vega/docs/api/view/
 */


const ViewGl = _ViewGl;
exports.ViewGl = ViewGl;
},{"../base":"To8D","../defaults":"jQIe","../presenter":"VMtV","../enums":"qyL6","./rendererGl":"wGit"}],"eFEk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  constants: true,
  controls: true,
  types: true,
  util: true,
  defaults: true,
  base: true,
  use: true,
  Presenter: true,
  ViewGl: true
};
Object.defineProperty(exports, "base", {
  enumerable: true,
  get: function () {
    return _base.base;
  }
});
Object.defineProperty(exports, "use", {
  enumerable: true,
  get: function () {
    return _base.use;
  }
});
Object.defineProperty(exports, "Presenter", {
  enumerable: true,
  get: function () {
    return _presenter.Presenter;
  }
});
Object.defineProperty(exports, "ViewGl", {
  enumerable: true,
  get: function () {
    return _viewGl.ViewGl;
  }
});
exports.defaults = exports.util = exports.types = exports.controls = exports.constants = void 0;

var constants = _interopRequireWildcard(require("./constants"));

exports.constants = constants;

var controls = _interopRequireWildcard(require("./exports/controls"));

exports.controls = controls;

var types = _interopRequireWildcard(require("./exports/types"));

exports.types = types;

var util = _interopRequireWildcard(require("./exports/util"));

exports.util = util;

var defaults = _interopRequireWildcard(require("./defaults"));

exports.defaults = defaults;

var _base = require("./base");

var _presenter = require("./presenter");

var _viewGl = require("./vega-classes/viewGl");

var _enums = require("./enums");

Object.keys(_enums).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _enums[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./constants":"Fy6F","./exports/controls":"kUTU","./exports/types":"dNRs","./exports/util":"WeBf","./defaults":"jQIe","./base":"To8D","./presenter":"VMtV","./vega-classes/viewGl":"FyHd","./enums":"qyL6"}],"G0Md":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPresenterStyle = getPresenterStyle;
exports.dualColorSchemeColors = exports.cssPrefix = exports.defaultViewerOptions = void 0;

var VegaDeckGl = _interopRequireWildcard(require("@msrvida/vega-deck.gl"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const {
  defaultPresenterConfig,
  defaultPresenterStyle
} = VegaDeckGl.defaults;
const {
  desaturate
} = VegaDeckGl.util;
const defaultViewerOptions = {
  colors: {
    activeCube: 'purple',
    defaultCube: VegaDeckGl.util.colorToString(defaultPresenterStyle.defaultCubeColor),
    hoveredCube: VegaDeckGl.util.colorToString(defaultPresenterStyle.highlightColor),
    selectedCube: 'yellow',
    axisSelectHighlight: VegaDeckGl.util.colorToString([128, 128, 128, 128]),
    axisLine: '#000',
    axisText: '#000',
    unselectedColorMethod: color => {
      const c = desaturate(color, 0.05);
      c[3] = 171;
      return c;
    }
  },
  language: {
    headers: {
      chart: 'Chart',
      details: 'Details',
      legend: 'Legend',
      selection: 'Select & Filter'
    },
    bing: 'bing',
    newColorMap: 'remap color to filtered items',
    oldColorMap: 'keep same colors',
    deselect: 'deselect',
    exclude: 'exclude',
    isolate: 'isolate',
    legendOther: 'other',
    nextDetail: '>',
    previousDetail: '<',
    reset: 'reset',
    colorBinCount: 'Color bin count',
    colorReverse: 'Color reverse',
    count: 'Count',
    percent: 'Percent',
    sum: 'Sum',
    scatterPointScale: 'Point scale',
    FacetMaxBins: 'Facet max bins',
    FacetVMaxBins: 'Cross facet max bins',
    XMaxBins: 'X axis max bins',
    YMaxBins: 'Y axis max bins',
    XGridSize: 'X grid size',
    YGridSize: 'Y grid size',
    InnerPaddingSize: 'Inner padding size',
    OuterPaddingSize: 'Outer padding size',
    treeMapMethod: 'Treemap layout',
    facetColumns: 'Facet columns',
    facetRows: 'Facet rows',
    markOpacitySignal: 'Mark opacity',
    textScaleSignal: 'Text scale',
    xAxisTextAngleSignal: 'X axis text angle',
    yAxisTextAngleSignal: 'Y axis text angle',
    zGrounded: 'Z grounded',
    zScaleProportion: 'Z scale proportion to Y',
    selectionCount: count => `${count} items selected`
  },
  maxLegends: 19,
  onError: errors => {//console.log(`UnitVisViewer errors: ${errors.join('\n')}`);
  },
  transitionDurations: Object.assign(Object.assign({}, defaultPresenterConfig.transitionDurations), {
    scope: 600
  }),
  selectionPolygonZ: -1,
  tickSize: 10
};
exports.defaultViewerOptions = defaultViewerOptions;

function getPresenterStyle(options) {
  var style = {
    cssPrefix,
    fontFamily: options.fontFamily,
    defaultCubeColor: VegaDeckGl.util.colorFromString(options.colors.defaultCube)
  };

  if (options.colors.hoveredCube) {
    style.highlightColor = VegaDeckGl.util.colorFromString(options.colors.hoveredCube);
  } //if (options.lightSettings) {
  // style.lightSettings = options.lightSettings;
  //}


  return style;
}

const cssPrefix = 'sanddance-';
exports.cssPrefix = cssPrefix;
const dualColorSchemeColors = {
  black: '#212121',
  gray: '#D2D2D2',
  blue: '#0060F0',
  green: '#00C000',
  orange: '#FF9900',
  red: '#E00000'
};
exports.dualColorSchemeColors = dualColorSchemeColors;
},{"@msrvida/vega-deck.gl":"eFEk"}],"BTLl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInternalFieldName = isInternalFieldName;
Object.defineProperty(exports, "getColumnsFromData", {
  enumerable: true,
  get: function () {
    return _sanddanceSpecs.getColumnsFromData;
  }
});
Object.defineProperty(exports, "getStats", {
  enumerable: true,
  get: function () {
    return _sanddanceSpecs.getStats;
  }
});
Object.defineProperty(exports, "inferAll", {
  enumerable: true,
  get: function () {
    return _sanddanceSpecs.inferAll;
  }
});
Object.defineProperty(exports, "getPresenterStyle", {
  enumerable: true,
  get: function () {
    return _defaults.getPresenterStyle;
  }
});

var _constants = require("./constants");

var _sanddanceSpecs = require("@msrvida/sanddance-specs");

var _defaults = require("./defaults");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function isInternalFieldName(columnName, includeVegaDeckGLFields = false) {
  if (includeVegaDeckGLFields) {
    if (columnName === _constants.GL_ORDINAL) return true;
  }

  for (let f in _constants.FieldNames) {
    if (columnName === _constants.FieldNames[f]) return true;
  }

  return false;
}
},{"./constants":"Syc7","@msrvida/sanddance-specs":"gl1V","./defaults":"G0Md"}],"kNpg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerColorSchemes = registerColorSchemes;
exports.colorSchemes = void 0;

var _sanddanceSpecs = require("@msrvida/sanddance-specs");

var _defaults = require("./defaults");

const dualPairs = [[_defaults.dualColorSchemeColors.black, _defaults.dualColorSchemeColors.gray], [_defaults.dualColorSchemeColors.red, _defaults.dualColorSchemeColors.green], [_defaults.dualColorSchemeColors.red, _defaults.dualColorSchemeColors.blue], [_defaults.dualColorSchemeColors.black, _defaults.dualColorSchemeColors.red], [_defaults.dualColorSchemeColors.black, _defaults.dualColorSchemeColors.orange], [_defaults.dualColorSchemeColors.black, _defaults.dualColorSchemeColors.green]];
/**
 * Array of color schemes.
 */

const colorSchemes = [{
  scheme: _sanddanceSpecs.ColorScaleNone,
  colors: [_defaults.defaultViewerOptions.colors.defaultCube]
}];
exports.colorSchemes = colorSchemes;
createDualColorSchemes();

function registerColorSchemes(vega) {
  colorSchemes.forEach(cs => {
    if (cs.colors.length === 1) {
      vega.scheme(cs.scheme, x => cs.colors[0]);
    } else {
      vega.scheme(cs.scheme, cs.colors);
    }
  });
}

function createPair(names, colors) {
  const scheme = `dual_${names[0]}${names[1]}`;
  colorSchemes.push({
    scheme,
    colors
  });
}

function createDualColorSchemes() {
  dualPairs.forEach(colors => {
    const names = colors.map(color => {
      for (let key in _defaults.dualColorSchemeColors) if (color === _defaults.dualColorSchemeColors[key]) return key;
    });
    createPair(names, colors);
    createPair([...names].reverse(), [...colors].reverse());
  });
}
},{"@msrvida/sanddance-specs":"gl1V","./defaults":"G0Md"}],"U1OZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Animator = exports.DataLayoutChange = void 0;
var DataLayoutChange;
exports.DataLayoutChange = DataLayoutChange;

(function (DataLayoutChange) {
  DataLayoutChange[DataLayoutChange["same"] = 0] = "same";
  DataLayoutChange[DataLayoutChange["reset"] = 1] = "reset";
  DataLayoutChange[DataLayoutChange["refine"] = 2] = "refine";
})(DataLayoutChange || (exports.DataLayoutChange = DataLayoutChange = {}));

class Animator {
  constructor(dataScope, props) {
    this.dataScope = dataScope;
    this.props = props;
  }

  select(search) {
    return new Promise((resolve, reject) => {
      this.dataScope.select(search);
      this.props.onDataChanged(DataLayoutChange.same);
      resolve();
    });
  }

  deselect() {
    return new Promise((resolve, reject) => {
      this.dataScope.deselect();
      this.props.onDataChanged(DataLayoutChange.same);
      resolve();
    });
  }

  filter(search, keepData, collapseData, rebase) {
    if (rebase) {
      this.dataScope.collapse(false, keepData);
    }

    this.dataScope.collapse(true, collapseData);
    return new Promise((resolve, reject) => {
      this.props.onAnimateDataChange(DataLayoutChange.refine, 'before refine', 'refine').then(() => {
        this.dataScope.deselect();
        this.dataScope.setFilteredData(keepData);
        this.props.onDataChanged(DataLayoutChange.refine, search);
        resolve();
      }).catch(reject);
    });
  }

  reset() {
    return new Promise((resolve, reject) => {
      this.dataScope.deselect();
      this.dataScope.setFilteredData(null);
      this.props.onAnimateDataChange(DataLayoutChange.reset, 'before reset', 'reset').then(() => {
        this.dataScope.collapse(false);
        this.props.onDataChanged(DataLayoutChange.reset);
        resolve();
      }).catch(reject);
    });
  }

  activate(datum) {
    return new Promise((resolve, reject) => {
      this.dataScope.activate(datum);
      this.props.onDataChanged(DataLayoutChange.same);
      resolve();
    });
  }

  deactivate() {
    return new Promise((resolve, reject) => {
      this.dataScope.deactivate();
      this.props.onDataChanged(DataLayoutChange.same);
      resolve();
    });
  }

}

exports.Animator = Animator;
},{}],"A7xy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recolorAxes = recolorAxes;

var VegaDeckGl = _interopRequireWildcard(require("@msrvida/vega-deck.gl"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function cloneAxis(axes, axisColor, axisTextColor) {
  return axes.map(axis => {
    const newAxis = VegaDeckGl.util.deepMerge(axis);

    if (newAxis.domain) {
      newAxis.domain.color = axisColor;
    }

    if (newAxis.title) {
      newAxis.title.color = axisTextColor;
    }

    newAxis.ticks.forEach(t => {
      t.color = axisColor;
    });
    newAxis.tickText.forEach(t => {
      t.color = axisTextColor;
    });
    return newAxis;
  });
}

function cloneTextData(textData, color) {
  return textData.map(t => {
    return Object.assign(Object.assign({}, t), {
      color
    });
  });
}

function recolorAxes(stage, oldColors, newColors) {
  const hasNewLineColor = newColors.axisLine && newColors.axisLine !== oldColors.axisLine;
  const hasNewTextColor = newColors.axisText && newColors.axisText !== oldColors.axisText;
  let axes;
  let textData;

  if (hasNewLineColor || hasNewTextColor) {
    const lineColor = VegaDeckGl.util.colorFromString(newColors.axisLine || oldColors.axisLine);
    const textColor = VegaDeckGl.util.colorFromString(newColors.axisText || oldColors.axisText);
    axes = {
      x: cloneAxis(stage.axes.x, lineColor, textColor),
      y: cloneAxis(stage.axes.y, lineColor, textColor)
    };
  }

  if (hasNewTextColor) {
    textData = cloneTextData(stage.textData, VegaDeckGl.util.colorFromString(newColors.axisText));
  }

  return {
    axes,
    textData
  };
}
},{"@msrvida/vega-deck.gl":"eFEk"}],"JTcr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notNice = notNice;
exports.selectNullOrEmpty = selectNullOrEmpty;
exports.selectExact = selectExact;
exports.selectNone = selectNone;
exports.selectExactAxis = selectExactAxis;
exports.selectBetween = selectBetween;
exports.selectBetweenAxis = selectBetweenAxis;

function notNice(niceValue) {
  //convert "nice" numbers to numeric value
  return (niceValue + '').replace(/[\s,]/g, '');
}

function tickValue(axis, i) {
  const tick = axis.tickText[i];
  let value;

  if (tick) {
    value = axis.tickText[i].value;
  }

  return {
    tick,
    value
  };
}

function selectNullOrEmpty(column) {
  const searchExpression = {
    name: column.name,
    operator: 'isnullorEmpty'
  };
  return searchExpression;
}

function selectExact(column, value) {
  if (value == null) {
    return selectNullOrEmpty(column);
  }

  const searchExpression = {
    name: column.name,
    operator: '==',
    value
  };
  return searchExpression;
}

function selectNone(column, values) {
  const expressions = values.map((value, i) => {
    const searchExpression = {
      name: column.name,
      operator: '!=',
      value
    };

    if (i) {
      searchExpression.clause = '&&';
    }

    return searchExpression;
  });
  const searchExpressionGroup = {
    expressions
  };
  return searchExpressionGroup;
}

function selectExactAxis(axis, column, i) {
  const result = tickValue(axis, i);

  if (result.tick) {
    return selectExact(column, result.value);
  }
}

function selectBetween(column, lowValue, highValue, lowOperator = '>=', highOperator = '<') {
  const expressions = [];

  if (lowValue !== undefined) {
    expressions.push({
      name: column.name,
      operator: lowOperator,
      value: lowValue
    });
  }

  if (highValue !== undefined) {
    expressions.push({
      name: column.name,
      operator: highOperator,
      value: highValue
    });
  }

  if (expressions.length > 1) {
    expressions[1].clause = '&&';
  }

  const searchExpressionGroup = {
    expressions
  };
  return searchExpressionGroup;
}

function selectBetweenAxis(axis, column, i) {
  const low = tickValue(axis, i);
  const high = tickValue(axis, i + 1);
  return selectBetween(column, low.value, high.value);
}
},{}],"bPo5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.push = exports.concat = exports.allTruthy = void 0;

var _vegaDeck = require("@msrvida/vega-deck.gl");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const {
  allTruthy,
  concat,
  push
} = _vegaDeck.util;
exports.push = push;
exports.concat = concat;
exports.allTruthy = allTruthy;
},{"@msrvida/vega-deck.gl":"eFEk"}],"KytA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchGroupFromVegaValue = getSearchGroupFromVegaValue;

var VegaDeckGl = _interopRequireWildcard(require("@msrvida/vega-deck.gl"));

var _array = require("./array");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function getSearchGroupFromVegaValue(search) {
  let group;
  const vegaSearch = search;

  if (Array.isArray(vegaSearch)) {
    //flatten into one group
    group = {
      expressions: []
    };
    vegaSearch.forEach(g => {
      const clonedExpressions = VegaDeckGl.util.clone(g.expressions).filter(Boolean);
      clonedExpressions[0].clause = '&&';
      (0, _array.push)(group.expressions, clonedExpressions);
    });
  } else {
    group = vegaSearch ? {
      expressions: vegaSearch.expressions.filter(Boolean)
    } : null;
  }

  return group;
}
},{"@msrvida/vega-deck.gl":"eFEk","./array":"bPo5"}],"oIzg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.axisSelectionLayer = axisSelectionLayer;

var _expression = require("./expression");

var _search = require("./search");

var _sanddanceSpecs = require("@msrvida/sanddance-specs");

var VegaDeckGl = _interopRequireWildcard(require("@msrvida/vega-deck.gl"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function axisSelectionLayer(presenter, specCapabilities, columns, stage, clickHandler, highlightColor, polygonZ) {
  const polygons = [];
  const xRole = specCapabilities.roles.filter(r => r.role === 'x')[0];

  if (xRole && xRole.axisSelection) {
    stage.axes.x.filter(axis => axis.tickText.length).forEach(axis => {
      polygons.push.apply(polygons, axisSelectionPolygons(axis, false, xRole.axisSelection, columns.x));
    });
  }

  const yRole = specCapabilities.roles.filter(r => r.role === 'y')[0];

  if (yRole && yRole.axisSelection) {
    stage.axes.y.filter(axis => axis.tickText.length).forEach(axis => {
      polygons.push.apply(polygons, axisSelectionPolygons(axis, true, yRole.axisSelection, columns.y));
    });
  }

  if (stage.facets && columns.facet) {
    polygons.push.apply(polygons, facetSelectionPolygons(stage.facets));
  } //move polygons to Z


  polygons.forEach(datum => {
    datum.polygon.forEach(p => {
      p[2] = polygonZ;
    });
  });

  const onClick = (o, e) => clickHandler(e.srcEvent, o.object.search);

  const polygonLayer = new VegaDeckGl.base.layers.PolygonLayer({
    autoHighlight: true,
    coordinateSystem: VegaDeckGl.base.deck.COORDINATE_SYSTEM.CARTESIAN,
    data: polygons,
    extruded: false,
    highlightColor: VegaDeckGl.util.colorFromString(highlightColor),
    id: 'selections',
    onHover: (o, e) => {
      if (o.index === -1) {
        presenter.deckgl.interactiveState.onAxisSelection = false;
      } else {
        presenter.deckgl.interactiveState.onAxisSelection = true;
      }
    },
    onClick,
    getElevation: () => 0,
    getFillColor: () => [0, 0, 0, 0],
    pickable: true,
    stroked: false
  });
  return polygonLayer;
}

function axisSelectionPolygons(axis, vertical, axisSelectionType, column) {
  const polygons = [];
  const size = 50;
  const getSearch = axisSelectionType === 'exact' ? (a, c, i) => ({
    expressions: [(0, _expression.selectExactAxis)(a, c, i)]
  }) : _expression.selectBetweenAxis;
  const {
    domain,
    ticks
  } = axis;

  if (ticks.length > 0 && domain) {
    const dim = vertical ? 1 : 0;
    const between = Math.abs(ticks[0].sourcePosition[dim] - domain.sourcePosition[dim]) > 1;
    let divisions;

    if (between) {
      divisions = [];

      for (let i = 1; i < ticks.length; i++) {
        divisions.push((ticks[i].sourcePosition[dim] + ticks[i - 1].sourcePosition[dim]) / 2);
      }
    } else {
      divisions = ticks.slice(1, -1).map(tick => tick.sourcePosition[dim]);
    }

    const add = (p2, i) => {
      const coords = [[p1, q1], [p2, q1], [p2, q2], [p1, q2]];
      polygons.push({
        search: getSearch(axis, column, i),
        polygon: vertical ? coords.map(xy => xy.reverse()) : coords
      });
      p1 = p2;
    };

    let p1 = domain.sourcePosition[dim];
    const q1 = domain.sourcePosition[vertical ? 0 : 1];
    const q2 = q1 - size;
    divisions.forEach(add);
    add(domain.targetPosition[dim], ticks.length - (between ? 1 : 2));
  }

  return polygons;
}

function facetSelectionPolygons(facetRects) {
  const polygons = [];
  let linesAndSearches;
  linesAndSearches = facetRects.map(({
    datum,
    lines
  }, i) => {
    let group = (0, _search.getSearchGroupFromVegaValue)(datum[_sanddanceSpecs.FieldNames.FacetSearch]);
    return {
      lines,
      search: group
    };
  });
  linesAndSearches.forEach(({
    lines,
    search
  }, i) => {
    //take any 2 lines to get a box dimension
    const [x, y] = minMaxPoints(lines.slice(2));
    polygons.push({
      search,
      polygon: [[x.min, y.min], [x.max, y.min], [x.max, y.max], [x.min, y.max]]
    });
  });
  return polygons;
}

function minMaxPoints(lines) {
  const points = [];
  lines.forEach(line => {
    [line.sourcePosition, line.targetPosition].forEach(point => {
      points.push(point);
    });
  });
  return [0, 1].map(dim => {
    let minMax = {
      min: null,
      max: null
    };
    points.forEach(point => {
      if (minMax.max == null) {
        minMax.max = point[dim];
      } else {
        minMax.max = Math.max(minMax.max, point[dim]);
      }

      if (minMax.min == null) {
        minMax.min = point[dim];
      } else {
        minMax.min = Math.min(minMax.min, point[dim]);
      }
    });
    return minMax;
  });
}
},{"./expression":"JTcr","./search":"KytA","@msrvida/sanddance-specs":"gl1V","@msrvida/vega-deck.gl":"eFEk"}],"PfBA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectedColorMap = getSelectedColorMap;
exports.colorMapFromCubes = colorMapFromCubes;
exports.populateColorContext = populateColorContext;
exports.applyColorMapToCubes = applyColorMapToCubes;

var VegaDeckGl = _interopRequireWildcard(require("@msrvida/vega-deck.gl"));

var _sanddanceSpecs = require("@msrvida/sanddance-specs");

var _constants = require("./constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function getSelectedColorMap(currentData, showSelectedData, showActive, viewerOptions) {
  function getSelectionColorItem(datum) {
    let item;

    if (showSelectedData) {
      item = datum[_sanddanceSpecs.FieldNames.Selected] ? {
        color: VegaDeckGl.util.colorFromString(viewerOptions.colors.selectedCube)
      } : {
        unSelected: true
      };
    }

    if (showActive && datum[_sanddanceSpecs.FieldNames.Active]) {
      item = {
        color: VegaDeckGl.util.colorFromString(viewerOptions.colors.activeCube)
      };
    }

    return item;
  }

  const colorMap = {};
  currentData.forEach(datum => {
    const selectionColor = getSelectionColorItem(datum);

    if (selectionColor) {
      const ordinal = datum[_constants.GL_ORDINAL];
      colorMap[ordinal] = selectionColor;
    }
  });
  return colorMap;
}

function colorMapFromCubes(cubes) {
  const map = {};
  cubes.forEach(cube => {
    map[cube.ordinal] = {
      color: cube.color
    };
  });
  return map;
}

function populateColorContext(colorContext, presenter) {
  if (!colorContext.colorMap) {
    const cubes = presenter.getCubeData();
    colorContext.colorMap = colorMapFromCubes(cubes);
  }

  colorContext.legend = VegaDeckGl.util.clone(presenter.stage.legend);
  colorContext.legendElement = presenter.getElement(VegaDeckGl.PresenterElement.legend).children[0];
}

function applyColorMapToCubes(maps, cubes, unselectedColorMethod) {
  Object.keys(maps[0]).forEach(ordinal => {
    const cube = cubes[+ordinal];

    if (cube && !cube.isEmpty) {
      const actualColorMappedItem = maps[0][ordinal];

      if (maps.length > 1) {
        const selectedColorMappedItem = maps[1][ordinal];

        if (selectedColorMappedItem) {
          if (selectedColorMappedItem.unSelected && unselectedColorMethod) {
            cube.color = unselectedColorMethod(actualColorMappedItem.color);
          } else {
            cube.color = selectedColorMappedItem.color;
          }

          return;
        }
      }

      cube.color = actualColorMappedItem.color;
    }
  });
}
},{"@msrvida/vega-deck.gl":"eFEk","@msrvida/sanddance-specs":"gl1V","./constants":"Syc7"}],"MJ1d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataScope = void 0;

var VegaDeckGl = _interopRequireWildcard(require("@msrvida/vega-deck.gl"));

var _searchExpression = require("@msrvida/search-expression");

var _sanddanceSpecs = require("@msrvida/sanddance-specs");

var _constants = require("./constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
class DataScope {
  constructor() {
    this.filteredColumnsStats = {};
  }

  setData(data, columns) {
    const differentData = this.data !== data;

    if (differentData) {
      if (this.data) {
        //clean up things we added to old data
        this.deselect();
      }

      this.data = data;
      this.columns = columns;
      this.filteredData = null;
      this.filteredColumnsStats = {};
    }

    return differentData;
  }

  setFilteredData(filteredData) {
    this.filteredData = filteredData;
    this.filteredColumnsStats = {};
  }

  getColumns(columnTypes) {
    if (!this.columns) {
      this.columns = (0, _sanddanceSpecs.getColumnsFromData)(VegaDeckGl.base.vega.inferTypes, this.data, columnTypes);
    }

    return this.columns;
  }

  getFilteredColumnStats(columnName) {
    if (!this.filteredColumnsStats[columnName]) {
      this.filteredColumnsStats[columnName] = (0, _sanddanceSpecs.getStats)(this.filteredData, this.columns.filter(c => c.name === columnName)[0]);
    }

    return this.filteredColumnsStats[columnName];
  }

  currentData() {
    return this.filteredData || this.data;
  }

  select(search) {
    this.deselect();

    if (search) {
      this.selection = this.createUserSelection(search, true, false);

      if (this.selection.included.length) {
        this.activate(this.selection.included[0]);
      }
    }
  }

  createUserSelection(search, assign, rebase) {
    const exec = new _searchExpression.Exec(search, this.getColumns());
    const s = {
      search,
      included: [],
      excluded: []
    };
    const data = rebase ? this.data : this.currentData();
    data.forEach(datum => {
      if (exec.run(datum)) {
        if (assign) {
          datum[_sanddanceSpecs.FieldNames.Selected] = true;
        }

        s.included.push(datum);
      } else {
        s.excluded.push(datum);
      }
    });
    return s;
  }

  deselect() {
    this.deactivate();
    this.data.forEach(datum => {
      delete datum[_sanddanceSpecs.FieldNames.Selected];
    });
    this.selection = null;
  }

  hasFilteredData() {
    return !!this.filteredData;
  }

  hasSelectedData() {
    return !!this.selection;
  }

  collapse(collapsed, data = this.data) {
    data.forEach(datum => {
      datum[_sanddanceSpecs.FieldNames.Collapsed] = collapsed;
    });
    this.isCollapsed = collapsed;
  }

  activate(datum) {
    this.deactivate();
    datum[_sanddanceSpecs.FieldNames.Active] = true;
    this.active = datum;
  }

  deactivate() {
    if (this.active) {
      delete this.active[_sanddanceSpecs.FieldNames.Active];
    }

    this.active = null;
  }

  ordinalIndexWithinSelection(ordinal) {
    if (this.selection) {
      for (let i = 0; i < this.selection.included.length; i++) {
        let datum = this.selection.included[i];

        if (datum[_constants.GL_ORDINAL] === ordinal) {
          return {
            datum,
            index: i
          };
        }
      }
    }

    return {
      datum: null,
      index: -1
    };
  }

  finalize() {
    this.data = null;
    this.filteredData = null;
    this.filteredColumnsStats = null;

    if (this.selection) {
      this.selection.excluded = null;
      this.selection.included = null;
      this.selection = null;
    }
  }

}

exports.DataScope = DataScope;
},{"@msrvida/vega-deck.gl":"eFEk","@msrvida/search-expression":"VB4o","@msrvida/sanddance-specs":"gl1V","./constants":"Syc7"}],"KCB5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Details = void 0;

var VegaDeckGl = _interopRequireWildcard(require("@msrvida/vega-deck.gl"));

var _defaults = require("./defaults");

var _constants = require("./constants");

var _searchExpression = require("@msrvida/search-expression");

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var Action;

(function (Action) {
  Action[Action["deselect"] = 0] = "deselect";
  Action[Action["isolate"] = 1] = "isolate";
  Action[Action["exclude"] = 2] = "exclude";
  Action[Action["reset"] = 3] = "reset";
  Action[Action["next"] = 4] = "next";
  Action[Action["previous"] = 5] = "previous";
})(Action || (Action = {}));

class Details {
  constructor(parentElement, language, animator, dataScope, colorMapHandler, hasColorMaps) {
    this.language = language;
    this.animator = animator;
    this.dataScope = dataScope;
    this.colorMapHandler = colorMapHandler;
    this.hasColorMaps = hasColorMaps;
    this.element = VegaDeckGl.util.addDiv(parentElement, `${_defaults.cssPrefix}unitControls`);
    this.clear();
  }

  finalize() {
    if (this.element) this.element.innerHTML = '';
    this.dataScope = null;
    this.element = null;
  }

  clear() {
    this.state = {
      userSelection: null,
      index: -1,
      remapColor: false
    };
    this.render();
  }

  clearSelection() {
    this.state.userSelection = null;
    this.state.index = -1;
    this.render();
  }

  populate(userSelection, index = 0) {
    this.state.userSelection = userSelection;
    this.state.index = index;
    this.render();
  }

  selectByNameValue(columnName, value) {
    const search = {
      name: columnName,
      operator: '==',
      value
    };
    this.clearSelection();
    this.animator.select(search);
    this.populate(this.dataScope.selection);
  }

  remapChanged(remap) {
    this.state.remapColor = remap;
    this.colorMapHandler(remap);
    this.render();
  }

  handleAction(action) {
    let p;
    const u = this.state.userSelection;

    switch (action) {
      case Action.deselect:
        {
          this.clearSelection();
          p = this.animator.deselect();
          break;
        }

      case Action.exclude:
        {
          this.clearSelection();
          p = this.animator.filter((0, _searchExpression.invert)(u.search), u.excluded, u.included, false);
          this.state.remapColor = false;
          break;
        }

      case Action.isolate:
        {
          this.clearSelection();
          p = this.animator.filter(u.search, u.included, u.excluded, false);
          this.state.remapColor = false;
          break;
        }

      case Action.reset:
        {
          this.clear();
          p = this.animator.reset();
          break;
        }

      default:
        {
          switch (action) {
            case Action.previous:
              {
                this.state.index--;

                if (this.state.index < 0) {
                  this.state.index = this.state.userSelection.included.length - 1;
                }

                break;
              }

            case Action.next:
              {
                this.state.index++;

                if (this.state.index >= this.state.userSelection.included.length) {
                  this.state.index = 0;
                }

                break;
              }
          }

          this.render();
          p = this.animator.activate(this.state.userSelection.included[this.state.index]);
        }
    }

    p.then(() => this.render());
  }

  render() {
    const hasRefinedData = this.dataScope.hasFilteredData();
    const renderProps = {
      language: this.language,
      actionHandler: action => this.handleAction(action),
      selectionHandler: (columnName, value) => this.selectByNameValue(columnName, value),
      count: this.state.userSelection && this.state.userSelection.included.length,
      hasRefinedData,
      item: this.state.userSelection && this.state.userSelection.included[this.state.index],
      remapColorHandler: remap => this.remapChanged(remap),
      hasColorMaps: this.hasColorMaps() && hasRefinedData,
      remapColor: this.state.remapColor
    };
    const a = VegaDeckGl.util.getActiveElementInfo();
    VegaDeckGl.util.mount(renderDetails(renderProps), this.element);
    VegaDeckGl.util.setActiveElement(a);
  }

}

exports.Details = Details;

const renderDetails = props => {
  const controlButtons = [VegaDeckGl.util.createElement("button", {
    disabled: !props.item,
    onClick: e => props.actionHandler(Action.deselect)
  }, props.language.deselect), VegaDeckGl.util.createElement("button", {
    disabled: !props.item,
    onClick: e => props.actionHandler(Action.isolate)
  }, props.language.isolate), VegaDeckGl.util.createElement("button", {
    disabled: !props.item,
    onClick: e => props.actionHandler(Action.exclude)
  }, props.language.exclude)];
  const colorMapping = VegaDeckGl.util.createElement("div", null, VegaDeckGl.util.createElement("button", {
    disabled: props.remapColor,
    onClick: e => props.remapColorHandler(true)
  }, props.language.newColorMap), VegaDeckGl.util.createElement("button", {
    disabled: !props.remapColor,
    onClick: e => props.remapColorHandler(false)
  }, props.language.oldColorMap));
  const singleItem = props.count === 1;
  const scrollButtons = [VegaDeckGl.util.createElement("button", {
    disabled: singleItem,
    onClick: e => props.actionHandler(Action.previous)
  }, props.language.previousDetail), VegaDeckGl.util.createElement("button", {
    disabled: singleItem,
    onClick: e => props.actionHandler(Action.next)
  }, props.language.nextDetail), VegaDeckGl.util.createElement("span", null, " ", props.language.selectionCount(props.count))];
  const rows = [];

  for (let prop in props.item) {
    if (prop === _constants.GL_ORDINAL) {
      continue;
    }

    if ((0, _util.isInternalFieldName)(prop)) {
      continue;
    }

    rows.push({
      cells: [{
        content: prop
      }, {
        content: linkSelect(props.language, prop, props.item[prop], props.selectionHandler)
      }]
    });
  }

  return VegaDeckGl.util.createElement("div", null, props.hasColorMaps && colorMapping, VegaDeckGl.util.createElement("h4", null, props.language.headers.selection), VegaDeckGl.util.createElement("div", {
    className: `${_defaults.cssPrefix}selection`
  }, controlButtons, VegaDeckGl.util.createElement("button", {
    disabled: !props.hasRefinedData,
    onClick: e => props.actionHandler(Action.reset)
  }, "reset")), props.item && VegaDeckGl.util.createElement("h4", null, props.language.headers.details), VegaDeckGl.util.createElement("div", null, VegaDeckGl.util.createElement("div", {
    className: `${_defaults.cssPrefix}details-scroll`
  }, props.item && scrollButtons), VegaDeckGl.util.createElement("div", {
    className: `${_defaults.cssPrefix}details`
  }, props.item && VegaDeckGl.util.createElement(VegaDeckGl.controls.Table, {
    rows: rows
  }))));
};

function linkSelect(language, columnName, value, selectionHandler) {
  return VegaDeckGl.util.createElement("span", null, VegaDeckGl.util.createElement("a", {
    href: "#",
    onClick: e => selectionHandler(columnName, value)
  }, value), isNaN(value) ? [' ', VegaDeckGl.util.createElement("a", {
    className: "bing-search",
    href: `https://www.bing.com/search?q=${encodeURIComponent(value)}`,
    target: "_blank"
  }, language.bing)] : '');
}
},{"@msrvida/vega-deck.gl":"eFEk","./defaults":"G0Md","./constants":"Syc7","@msrvida/search-expression":"VB4o","./util":"BTLl"}],"nQLz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureHeaders = ensureHeaders;

var _vegaDeck = require("@msrvida/vega-deck.gl");

function ensureHeaders(presenter, headers) {
  const vegaControls = presenter.getElement(_vegaDeck.PresenterElement.vegaControls);
  conditionalHeader(!!vegaControls.querySelectorAll('.vega-bindings > *').length, vegaControls, headers.chart);
  const legend = presenter.getElement(_vegaDeck.PresenterElement.legend);
  conditionalHeader(!!legend.children.length, legend, headers.legend);
}

function conditionalHeader(condition, element, header) {
  var existing = existingHeader(element, header);

  if (condition && !existing) {
    addHeader(element, header);
  }

  if (!condition && existing) {
    existing.remove();
  }
}

function addHeader(element, header) {
  const h = document.createElement('h4');
  h.innerHTML = header;
  element.insertAdjacentElement('beforebegin', h);
}

function existingHeader(element, header) {
  const {
    previousElementSibling
  } = element;

  if (previousElementSibling && previousElementSibling.innerHTML === header) {
    return previousElementSibling;
  }
}
},{"@msrvida/vega-deck.gl":"eFEk"}],"rI67":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.finalizeLegend = finalizeLegend;

var _sanddanceSpecs = require("@msrvida/sanddance-specs");

var _expression = require("./expression");

function legendRange(colorBinType, column, legend, clickedIndex) {
  if (column.quantitative) {
    return selectQuantitative(colorBinType, column, legend, clickedIndex);
  } else {
    return selectCategorical(column, legend, clickedIndex);
  }
}

function selectCategorical(column, legend, clickedIndex) {
  const value = legend.rows[clickedIndex].value;

  if (value === _sanddanceSpecs.Other) {
    const values = [];

    for (let i in legend.rows) {
      if (+i !== clickedIndex) {
        values.push(legend.rows[i].value);
      }
    }

    return (0, _expression.selectNone)(column, values);
  } else {
    //select equal
    return {
      expressions: [(0, _expression.selectExact)(column, legend.rows[clickedIndex].value)]
    };
  }
}

function selectQuantitative(colorBinType, column, legend, clickedIndex) {
  const keys = Object.keys(legend.rows).map(key => +key).sort((a, b) => +a - +b);
  let lowValue;
  let lowOperator;
  let highValue;
  let highOperator;
  const rowText = legend.rows[clickedIndex].label;

  switch (colorBinType) {
    case 'continuous':
      {
        lowValue = rowText;

        if (clickedIndex < keys.length - 1) {
          highValue = legend.rows[clickedIndex + 1].value;
        }

        break;
      }

    default:
      {
        if (rowText.indexOf('null') > 0) {
          const ex = {
            expressions: [(0, _expression.selectNullOrEmpty)(column)]
          };
          return ex;
        }

        const dash = rowText.indexOf('–'); //this is not the common dash character!

        if (dash > 0) {
          //bug in Vega for quantize?
          //lowOperator = '>';
          //highOperator = '<=';
          lowValue = rowText.substr(0, dash);
          highValue = rowText.substr(dash + 1);
        } else {
          if (rowText.indexOf('<') >= 0) {
            highValue = rowText.substring(2);
          } else {
            if (rowText.indexOf('≥') >= 0) {
              lowValue = rowText.substring(2);
            }
          }
        }
      }
  }

  if (lowValue) lowValue = (0, _expression.notNice)(lowValue);
  if (highValue) highValue = (0, _expression.notNice)(highValue);

  if (lowValue === highValue) {
    return {
      expressions: [(0, _expression.selectExact)(column, lowValue)]
    };
  } else {
    return (0, _expression.selectBetween)(column, lowValue, highValue, lowOperator, highOperator);
  }
}

function finalizeLegend(colorBinType, colorColumn, legend, language) {
  const rowTexts = [];

  for (let i in legend.rows) {
    let row = legend.rows[i];
    row.search = legendRange(colorBinType, colorColumn, legend, +i);

    if (row.value === _sanddanceSpecs.Other) {
      row.label = language.legendOther;
    } else {
      rowTexts.push(row.value);
    }
  }
}
},{"@msrvida/sanddance-specs":"gl1V","./expression":"JTcr"}],"dxn8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignOrdinals = assignOrdinals;
exports.getDataIndexOfCube = getDataIndexOfCube;

var _constants = require("./constants");

function assignOrdinals(columns, data, ordinalMap) {
  const uCol = columns.uid && columns.uid.name;

  if (ordinalMap) {
    data.forEach((d, i) => {
      const key = uCol ? d[uCol] : i;
      d[_constants.GL_ORDINAL] = ordinalMap[key];
    });
  } else {
    ordinalMap = {};
    data.forEach((d, i) => {
      d[_constants.GL_ORDINAL] = i;
      const uColValue = uCol ? d[uCol] : i;
      ordinalMap[uColValue] = i;
    });
  }

  return ordinalMap;
}

function getDataIndexOfCube(cube, data) {
  const len = data.length;

  for (let i = 0; i < len; i++) {
    if (data[i][_constants.GL_ORDINAL] === cube.ordinal) {
      return i;
    }
  }
}
},{"./constants":"Syc7"}],"jmI2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applySignalValues = applySignalValues;
exports.extractSignalValuesFromView = extractSignalValuesFromView;

function applySignalValues(sv, b) {
  if (!sv || !b || !b.signals || !b.signals.length) return;

  for (let key in sv) {
    let value = sv[key];
    let signalB = b.signals.filter(signal => signal.name === key)[0];

    if (signalB && signalB.bind) {
      signalB.value = value;
    }
  }
}

function extractSignalValuesFromView(view, spec) {
  if (!view || !spec || !spec.signals || !spec.signals.length) return;
  const result = {};
  spec.signals.forEach(signalA => {
    //bound to a UI control
    if (signalA.bind) {
      try {
        result[signalA.name] = view.signal(signalA.name);
      } catch (e) {// continue regardless of error
      }
    }
  });
  return result;
}
},{}],"bkgF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = void 0;

var VegaDeckGl = _interopRequireWildcard(require("@msrvida/vega-deck.gl"));

var _constants = require("./constants");

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const {
  outerSize
} = VegaDeckGl.util;
const {
  Table
} = VegaDeckGl.controls;

class Tooltip {
  constructor(props) {
    const renderProps = {
      cssPrefix: props.cssPrefix,
      rows: getRows(props.item, props.options)
    };
    this.element = renderTooltip(renderProps);

    if (this.element) {
      this.element.style.position = 'absolute';
      this.child = this.element.firstChild;
      document.body.appendChild(this.element); //measure and move as necessary

      let m = outerSize(this.child);

      while (m.height > document.documentElement.clientHeight) {
        let tr = this.child.querySelector('tr:last-child');

        if (tr) {
          tr.parentElement.removeChild(tr);
        } else {
          break;
        }

        m = outerSize(this.child);
      }

      if (props.position.clientX + m.width >= document.documentElement.clientWidth) {
        this.child.style.right = '0';
      }

      let moveTop = true;

      if (props.position.clientY + m.height >= document.documentElement.clientHeight) {
        if (props.position.clientY - m.height > 0) {
          this.child.style.bottom = '0';
        } else {
          moveTop = false;
        }
      }

      if (moveTop) {
        this.element.style.top = `${props.position.clientY}px`;
      }

      this.element.style.left = `${props.position.clientX}px`;
    }
  }

  finalize() {
    if (this.element) {
      document.body.removeChild(this.element);
    }

    this.element = null;
  }

}

exports.Tooltip = Tooltip;

function getRows(item, options) {
  const rows = [];

  for (let columnName in item) {
    if (columnName === _constants.GL_ORDINAL) {
      continue;
    }

    if ((0, _util.isInternalFieldName)(columnName)) {
      continue;
    }

    if (options && options.exclude) {
      if (options.exclude(columnName)) {
        continue;
      }
    }

    let value = item[columnName];
    let content;

    if (options && options.displayValue) {
      content = options.displayValue(value);
    } else {
      switch (value) {
        case null:
          content = VegaDeckGl.util.createElement("i", null, "null");
          break;

        case undefined:
          content = VegaDeckGl.util.createElement("i", null, "undefined");
          break;

        default:
          content = value.toString();
      }
    }

    rows.push({
      cells: [{
        content: columnName + ':'
      }, {
        content
      }]
    });
  }

  return rows;
}

const renderTooltip = props => {
  return props.rows.length === 0 ? null : VegaDeckGl.util.createElement("div", {
    className: `${props.cssPrefix}tooltip`
  }, Table({
    rows: props.rows
  }));
};
},{"@msrvida/vega-deck.gl":"eFEk","./constants":"Syc7","./util":"BTLl"}],"CdFf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewer = void 0;

var _animator = require("./animator");

var _axes = require("./axes");

var _axisSelection = require("./axisSelection");

var _colorCubes = require("./colorCubes");

var _colorSchemes = require("./colorSchemes");

var _constants = require("./constants");

var _dataScope = require("./dataScope");

var _defaults = require("./defaults");

var _details = require("./details");

var _headers = require("./headers");

var _legend = require("./legend");

var _ordinal = require("./ordinal");

var _search = require("./search");

var _signals = require("./signals");

var _tooltip = require("./tooltip");

var _sanddanceSpecs = require("@msrvida/sanddance-specs");

var searchExpression = _interopRequireWildcard(require("@msrvida/search-expression"));

var VegaDeckGl = _interopRequireWildcard(require("@msrvida/vega-deck.gl"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.


const {
  defaultView
} = VegaDeckGl.defaults;
let didRegisterColorSchemes = false;
/**
 * Component to view a SandDance data visualization.
 */

class Viewer {
  /**
   * Instantiate a new Viewer.
   * @param element Parent HTMLElement to present within.
   * @param options Optional viewer options object.
   */
  constructor(element, options) {
    this.element = element;
    this.options = VegaDeckGl.util.deepMerge(_defaults.defaultViewerOptions, options);
    this.presenter = new VegaDeckGl.Presenter(element, (0, _defaults.getPresenterStyle)(this.options));
    this._dataScope = new _dataScope.DataScope();
    this._animator = new _animator.Animator(this._dataScope, {
      onDataChanged: this.onDataChanged.bind(this),
      onAnimateDataChange: this.onAnimateDataChange.bind(this)
    });
    this._details = new _details.Details(this.presenter.getElement(VegaDeckGl.PresenterElement.panel), this.options.language, this._animator, this._dataScope, remap => {
      this.currentColorContext = ~~remap;
      this.renderSameLayout();
    }, () => this.insight && this.insight.columns && !!this.insight.columns.color && this.colorContexts && this.colorContexts.length > 1);
    this.insight = {};
  }

  changeColorContexts(colorContexts) {
    this.colorContexts = colorContexts;
    this.currentColorContext = 0;
    this.options.onColorContextChange && this.options.onColorContextChange();
  }

  applyLegendColorContext(colorContext) {
    const a = VegaDeckGl.util.getActiveElementInfo();
    VegaDeckGl.util.mount(colorContext.legendElement, this.presenter.getElement(VegaDeckGl.PresenterElement.legend));
    VegaDeckGl.util.setActiveElement(a);
    this.presenter.stage.legend = colorContext.legend;
  }

  onAnimateDataChange(dataChange, waitingLabel, handlerLabel) {
    return new Promise((resolve, reject) => {
      let innerPromise;

      if (dataChange === _animator.DataLayoutChange.refine) {
        const oldColorContext = this.colorContexts[this.currentColorContext];
        innerPromise = new Promise(innerResolve => {
          this.renderNewLayout({}, {
            preStage: (stage, deckProps) => {
              (0, _legend.finalizeLegend)(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
              this.overrideAxisLabels(stage);
              (0, _colorCubes.applyColorMapToCubes)([oldColorContext.colorMap], VegaDeckGl.util.getCubes(deckProps));

              if (this.options.onStage) {
                this.options.onStage(stage, deckProps);
              }
            }
          }).then(() => {
            //apply old legend
            this.applyLegendColorContext(oldColorContext);
            innerResolve();
          });
        });
      } else {
        innerPromise = this.renderNewLayout({}, {
          preStage: (stage, deckProps) => {
            (0, _legend.finalizeLegend)(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
            this.overrideAxisLabels(stage);

            if (this.options.onStage) {
              this.options.onStage(stage, deckProps);
            }
          }
        });
      }

      innerPromise.then(() => {
        this.presenter.animationQueue(resolve, this.options.transitionDurations.position, {
          waitingLabel,
          handlerLabel,
          animationCanceled: reject
        });
      });
    });
  }

  onDataChanged(dataLayout, filter) {
    return __awaiter(this, void 0, void 0, function* () {
      switch (dataLayout) {
        case _animator.DataLayoutChange.same:
          {
            this.renderSameLayout();
            break;
          }

        case _animator.DataLayoutChange.refine:
          {
            //save cube colors
            const oldColorContext = this.colorContexts[this.currentColorContext];
            let colorMap;
            yield this.renderNewLayout({}, {
              preStage: (stage, deckProps) => {
                //save off the spec colors
                colorMap = (0, _colorCubes.colorMapFromCubes)(stage.cubeData);
                (0, _colorCubes.applyColorMapToCubes)([oldColorContext.colorMap], VegaDeckGl.util.getCubes(deckProps));
                this.preStage(stage, deckProps);
              },
              onPresent: () => {
                //save new legend
                const newColorContext = {
                  colorMap,
                  legend: VegaDeckGl.util.clone(this.presenter.stage.legend),
                  legendElement: this.presenter.getElement(VegaDeckGl.PresenterElement.legend).children[0]
                }; //apply old legend

                this.applyLegendColorContext(oldColorContext);
                this.changeColorContexts([oldColorContext, newColorContext]);
              }
            }); //narrow the filter only if it is different

            if (!searchExpression.compare(this.insight.filter, filter)) {
              this.insight.filter = searchExpression.narrow(this.insight.filter, filter);
            }

            if (this.options.onDataFilter) {
              this.options.onDataFilter(this.insight.filter, this._dataScope.currentData());
            }

            break;
          }

        case _animator.DataLayoutChange.reset:
          {
            const colorContext = {
              colorMap: null,
              legend: null,
              legendElement: null
            };
            this.changeColorContexts([colorContext]);
            yield this.renderNewLayout({}, {
              onPresent: () => {
                (0, _colorCubes.populateColorContext)(colorContext, this.presenter);
              }
            });
            delete this.insight.filter;

            if (this.options.onDataFilter) {
              this.options.onDataFilter(null, null);
            }

            break;
          }
      }

      if (this.options.onSelectionChanged) {
        const sel = this.getSelection();
        this.options.onSelectionChanged(sel && sel.search || null, 0, sel && sel.selectedData || null);
      }
    });
  }

  getSpecColumnsWithFilteredStats() {
    if (!this._dataScope.hasFilteredData()) {
      return this._specColumns;
    }

    const roles = ['color', 'facet', 'group', 'size', 'sort', 'sum', 'x', 'y', 'z'];
    const specColumns = Object.assign({}, this._specColumns);
    roles.forEach(r => {
      if (specColumns[r]) {
        const column = Object.assign({}, specColumns[r]);
        column.stats = this.getColumnStats(column);
        specColumns[r] = column;
      }
    });
    return specColumns;
  }

  renderNewLayout(signalValues, presenterConfig, view) {
    return __awaiter(this, void 0, void 0, function* () {
      const currData = this._dataScope.currentData();

      const context = {
        specColumns: this.getSpecColumnsWithFilteredStats(),
        insight: this.insight,
        specViewOptions: this.options
      };
      const specResult = (0, _sanddanceSpecs.build)(context, currData);

      if (!specResult.errors) {
        const uiValues = (0, _signals.extractSignalValuesFromView)(this.vegaViewGl, this.vegaSpec);
        (0, _signals.applySignalValues)(Object.assign(Object.assign({}, uiValues), signalValues), specResult.vegaSpec);
        this.vegaSpec = specResult.vegaSpec;
        this.options.onVegaSpec && this.options.onVegaSpec(this.vegaSpec);
        this.specCapabilities = specResult.specCapabilities;
        const config = this.createConfig(presenterConfig);

        if (view) {
          config.getView = () => view;
        }

        if (!didRegisterColorSchemes) {
          (0, _colorSchemes.registerColorSchemes)(VegaDeckGl.base.vega);
          didRegisterColorSchemes = true;
        }

        try {
          if (this.vegaViewGl) {
            this.vegaViewGl.finalize();
          }

          const runtime = VegaDeckGl.base.vega.parse(this.vegaSpec);
          this.vegaViewGl = new VegaDeckGl.ViewGl(runtime, config).renderer('deck.gl').initialize(this.element);
          yield this.vegaViewGl.runAsync(); //capture new color color contexts via signals

          this.configForSignalCapture(config.presenterConfig);
        } catch (e) {
          specResult.errors = [e.message];
        }

        if (!specResult.errors) {
          (0, _headers.ensureHeaders)(this.presenter, this.options.language.headers);
        }
      }

      if (specResult.errors) {
        if (this.options.onError) {
          this.options.onError(specResult.errors);
        } else if (this.presenter.logger) {
          this.presenter.logger(`errors rendering Vega spec:${specResult.errors.join('\n')}`);
        }
      }

      return specResult;
    });
  }
  /**
   * Render the same layout with new options.
   * @param newViewerOptions New options object.
   */


  renderSameLayout(newViewerOptions) {
    const colorContext = this.colorContexts[this.currentColorContext];
    const clonedCubes = this.presenter.getCubeData().map(cube => {
      return Object.assign({}, cube);
    });
    this.applyLegendColorContext(colorContext);
    let {
      axes,
      textData
    } = this.presenter.stage;
    let recoloredAxes;

    if (newViewerOptions) {
      if (newViewerOptions.colors) {
        recoloredAxes = (0, _axes.recolorAxes)(this.presenter.stage, this._lastColorOptions, newViewerOptions.colors);
        this._lastColorOptions = VegaDeckGl.util.clone(newViewerOptions.colors);
        axes = recoloredAxes.axes || axes;
        textData = recoloredAxes.textData || textData;
      }

      this.options = VegaDeckGl.util.deepMerge(this.options, newViewerOptions);
    }

    let colorMaps = [colorContext.colorMap];
    let colorMethod;

    const hasSelectedData = this._dataScope.hasSelectedData();

    const hasActive = !!this._dataScope.active;

    if (hasSelectedData || hasActive) {
      const selectedColorMap = (0, _colorCubes.getSelectedColorMap)(this._dataScope.currentData(), hasSelectedData, hasActive, this.options);
      colorMaps.push(selectedColorMap);
      colorMethod = this.options.colors.unselectedColorMethod;
    }

    (0, _colorCubes.applyColorMapToCubes)(colorMaps, clonedCubes, colorMethod);
    const stage = {
      cubeData: clonedCubes,
      axes,
      textData
    };
    this.vegaViewGl.presenter.rePresent(stage, this.createConfig().presenterConfig);
  }

  getView(view) {
    if (view === undefined) {
      if (this.presenter.view === null) {
        return defaultView;
      } else {
        return this.presenter.view;
      }
    } else {
      return view;
    }
  }

  transformData(values, transform) {
    try {
      const runtime = VegaDeckGl.base.vega.parse({
        $schema: 'https://vega.github.io/schema/vega/v4.json',
        data: [{
          name: 'source',
          values,
          transform
        }]
      });
      new VegaDeckGl.ViewGl(runtime).run();
    } catch (e) {// continue regardless of error
    }

    return values;
  }
  /**
   * Render data into a visualization.
   * @param insight Object to create a visualization specification.
   * @param data Array of data objects.
   * @param view Optional View to specify camera type.
   * @param ordinalMap Optional map of ordinals to assign to the data such that the same cubes can be re-used for new data.
   */


  render(insight, data, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      let result; //see if refine expression has changed

      if (!searchExpression.compare(insight.filter, this.insight.filter)) {
        const allowAsyncRenderTime = 100;

        if (insight.filter) {
          //refining
          result = yield this._render(insight, data, options);
          this.presenter.animationQueue(() => {
            this.filter(insight.filter, options.rebaseFilter && options.rebaseFilter());
          }, allowAsyncRenderTime, {
            waitingLabel: 'layout before refine',
            handlerLabel: 'refine after layout'
          });
        } else {
          //not refining
          this._dataScope.setFilteredData(null);

          result = yield this._render(insight, data, options);
          this.presenter.animationQueue(() => {
            this.reset();
          }, allowAsyncRenderTime, {
            waitingLabel: 'layout before reset',
            handlerLabel: 'reset after layout'
          });
        }
      } else {
        result = yield this._render(insight, data, options);
      }

      return result;
    });
  }

  shouldViewstateTransition(newInsight, oldInsight) {
    if (!oldInsight.columns) return false;
    if (oldInsight.chart !== newInsight.chart) return true;
    if (oldInsight.size.height !== newInsight.size.height) return true;
    if (oldInsight.size.width !== newInsight.size.width) return true;
    if (oldInsight.columns.facet !== newInsight.columns.facet) return true;
    return false;
  }

  configForSignalCapture(presenterConfig) {
    const colorContext = {
      colorMap: null,
      legend: null,
      legendElement: null
    }; //now be ready to capture color changing signals 

    presenterConfig.preStage = (stage, deckProps) => {
      if (this._shouldSaveColorContext()) {
        //save off the colors from Vega layout
        colorContext.colorMap = (0, _colorCubes.colorMapFromCubes)(stage.cubeData);
      }

      this.preStage(stage, deckProps);
    };

    presenterConfig.onPresent = () => {
      if (this._shouldSaveColorContext()) {
        (0, _colorCubes.populateColorContext)(colorContext, this.presenter);
        this.changeColorContexts([colorContext]);

        this._dataScope.deselect();
      }
    };
  }

  _render(insight, data, options) {
    return __awaiter(this, void 0, void 0, function* () {
      if (this._tooltip) {
        this._tooltip.finalize();

        this._tooltip = null;
      }

      if (this._dataScope.setData(data, options.columns)) {
        //apply transform to the data
        this.transformData(data, insight.transform);
      }

      this._specColumns = (0, _sanddanceSpecs.getSpecColumns)(insight, this._dataScope.getColumns(options.columnTypes));
      const ordinalMap = (0, _ordinal.assignOrdinals)(this._specColumns, data, options.ordinalMap);
      this.insight = VegaDeckGl.util.clone(insight);
      this._lastColorOptions = VegaDeckGl.util.clone(this.options.colors);

      this._shouldSaveColorContext = () => !options.initialColorContext;

      const colorContext = options.initialColorContext || {
        colorMap: null,
        legend: null,
        legendElement: null
      };
      const specResult = yield this.renderNewLayout(insight.signalValues, {
        preStage: (stage, deckProps) => {
          if (this._shouldSaveColorContext()) {
            //save off the colors from Vega layout
            colorContext.colorMap = (0, _colorCubes.colorMapFromCubes)(stage.cubeData);
          } else {
            //apply passed colorContext
            (0, _colorCubes.applyColorMapToCubes)([colorContext.colorMap], VegaDeckGl.util.getCubes(deckProps));
          } //if items are selected, repaint


          const hasSelectedData = !!this._dataScope.hasSelectedData();
          const hasActive = !!this._dataScope.active;

          if (this._dataScope.hasSelectedData() || this._dataScope.active) {
            const selectedColorMap = (0, _colorCubes.getSelectedColorMap)(this._dataScope.currentData(), hasSelectedData, hasActive, this.options);
            (0, _colorCubes.applyColorMapToCubes)([colorContext.colorMap, selectedColorMap], stage.cubeData, this.options.colors.unselectedColorMethod);
          }

          this.preStage(stage, deckProps);
        },
        onPresent: () => {
          if (this._shouldSaveColorContext()) {
            (0, _colorCubes.populateColorContext)(colorContext, this.presenter);
            this.changeColorContexts([colorContext]);
          } else {
            //apply passed colorContext
            this.applyLegendColorContext(colorContext);
          }
        },
        shouldViewstateTransition: () => this.shouldViewstateTransition(insight, this.insight)
      }, this.getView(insight.view)); //future signal changes should save the color context

      this._shouldSaveColorContext = () => !options.discardColorContextUpdates || !options.discardColorContextUpdates();

      this._details.render();

      const result = {
        ordinalMap,
        specResult
      };
      return result;
    });
  }

  overrideAxisLabels(stage) {// if (this._specColumns.x && this._specColumns.x.type === 'date') {
    //     stage.axes.x.forEach(axis => makeDateRange(
    //         axis.tickText,
    //         this.getColumnStats(this._specColumns.x)
    //     ));
    // }
    // if (this._specColumns.y && this._specColumns.y.type === 'date') {
    //     stage.axes.y.forEach(axis => makeDateRange(
    //         axis.tickText,
    //         this.getColumnStats(this._specColumns.y)
    //     ));
    // }
  }

  preStage(stage, deckProps) {
    const onClick = (e, search) => {
      if (this.options.onAxisClick) {
        this.options.onAxisClick(e, search);
      } else {
        this.select(search);
      }
    };

    this.overrideAxisLabels(stage);
    const polygonLayer = (0, _axisSelection.axisSelectionLayer)(this.presenter, this.specCapabilities, this._specColumns, stage, onClick, this.options.colors.axisSelectHighlight, this.options.selectionPolygonZ);
    const order = 1; //after textlayer but before others

    deckProps.layers.splice(order, 0, polygonLayer);
    (0, _legend.finalizeLegend)(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);

    if (this.options.onStage) {
      this.options.onStage(stage, deckProps);
    }
  }

  onCubeClick(e, cube) {
    const hasSelectedData = this._dataScope.hasSelectedData();

    if (hasSelectedData && this._dataScope.selection.included.length > 1) {
      //if active is within selection, keep the selection and activate the one.
      const indexWithinSelection = this._dataScope.ordinalIndexWithinSelection(cube.ordinal);

      if (indexWithinSelection.index >= 0) {
        this.activate(indexWithinSelection.datum);

        this._details.populate(this._dataScope.selection, indexWithinSelection.index);

        if (this.options.onSelectionChanged) {
          const sel = this.getSelection();
          this.options.onSelectionChanged(sel.search, indexWithinSelection.index, sel.selectedData);
        }

        return;
      }
    }

    if (hasSelectedData && this._dataScope.selection.included.length === 1 && this._dataScope.selection.included[0][_constants.GL_ORDINAL] === cube.ordinal) {
      this.deselect();
      return;
    }

    const search = {
      name: _constants.GL_ORDINAL,
      operator: '==',
      value: cube.ordinal
    };
    this.select(search);
  }

  onCubeHover(e, cube) {
    if (this._tooltip) {
      this._tooltip.finalize();

      this._tooltip = null;
    }

    if (!cube) {
      return;
    }

    const currentData = this._dataScope.currentData();

    const index = (0, _ordinal.getDataIndexOfCube)(cube, currentData);

    if (index >= 0) {
      this._tooltip = new _tooltip.Tooltip({
        options: this.options.tooltipOptions,
        item: currentData[index],
        position: e,
        cssPrefix: this.presenter.style.cssPrefix
      });
    }
  }

  onTextHover(e, t) {
    //return true if highlight color is different
    if (!t || !this.options.getTextColor || !this.options.getTextHighlightColor) return false;
    return !VegaDeckGl.util.colorIsEqual(this.options.getTextColor(t), this.options.getTextHighlightColor(t));
  }

  createConfig(c) {
    const {
      getTextColor,
      getTextHighlightColor,
      onTextClick
    } = this.options;
    const defaultPresenterConfig = {
      getTextColor,
      getTextHighlightColor,
      onTextClick: (e, t) => {
        if (t.metaData && t.metaData.search) {
          const search = (0, _search.getSearchGroupFromVegaValue)(t.metaData.search);

          if (this.options.onAxisClick) {
            this.options.onAxisClick(e, search);
          } else {
            this.select(search);
          }
        }

        if (onTextClick) {
          onTextClick(e, t);
        }
      },
      onCubeClick: this.onCubeClick.bind(this),
      onCubeHover: this.onCubeHover.bind(this),
      onTextHover: this.onTextHover.bind(this),
      preStage: this.preStage.bind(this),
      onPresent: this.options.onPresent,
      onLayerClick: (info, e) => {
        if (!info || !info.object) {
          this.deselect();
        }
      },
      onLegendClick: (e, legend, clickedIndex) => {
        const legendRow = clickedIndex !== null && legend.rows[clickedIndex];

        if (legendRow) {
          if (this.options.onLegendRowClick) {
            this.options.onLegendRowClick(e, legendRow);
          } else {
            this.select(legendRow.search);
          }
        } else if (this.options.onLegendHeaderClick) {
          //header clicked
          this.options.onLegendHeaderClick(e);
        }
      },
      onSceneRectAssignCubeOrdinal: datum => {
        //TODO see if datum is a facet selection rect
        return datum[_constants.GL_ORDINAL];
      },
      onTargetViewState: (h, w) => {
        const {
          height,
          width
        } = this.insight.size;
        let newViewStateTarget;

        if (this.options.onNewViewStateTarget) {
          newViewStateTarget = this.options.onNewViewStateTarget();
        }

        return {
          height,
          width,
          newViewStateTarget
        };
      },
      preserveDrawingBuffer: this.options.preserveDrawingBuffer
    };

    if (this.options.onBeforeCreateLayers) {
      defaultPresenterConfig.preLayer = stage => this.options.onBeforeCreateLayers(stage, this.specCapabilities);
    }

    const config = {
      presenter: this.presenter,
      presenterConfig: Object.assign(defaultPresenterConfig, c)
    };

    if (this.options.transitionDurations) {
      config.presenterConfig.transitionDurations = this.options.transitionDurations;
    }

    return config;
  }
  /**
   * Filter the data and animate.
   * @param search Filter expression, see https://vega.github.io/vega/docs/expressions/
   * @param rebase Optional flag to apply to entire dataset. A false value will apply the filter upon any existing filter.
   */


  filter(search, rebase = false) {
    const u = this._dataScope.createUserSelection(search, false, rebase);

    return new Promise((resolve, reject) => {
      this._animator.filter(search, u.included, u.excluded, rebase).then(() => {
        this._details.clear();

        this._details.clearSelection();

        this._details.populate(this._dataScope.selection);

        resolve();
      });
    });
  }
  /**
   * Remove any filtration and animate.
   */


  reset() {
    return new Promise((resolve, reject) => {
      this._animator.reset().then(() => {
        this._details.clear();

        this._details.clearSelection();

        resolve();
      });
    });
  }
  /**
   * Select cubes by a filter expression.
   * @param search Filter expression, see https://vega.github.io/vega/docs/expressions/
   */


  select(search) {
    return new Promise((resolve, reject) => {
      this._animator.select(search).then(() => {
        this._details.populate(this._dataScope.selection);

        resolve();
      });
    });
  }
  /**
   * Removes any selection.
   */


  deselect() {
    return new Promise((resolve, reject) => {
      this._animator.deselect().then(() => {
        this._details.clearSelection();

        resolve();
      });
    });
  }
  /**
   * Gets the current selection.
   */


  getSelection() {
    if (!this._dataScope) return null;
    const selectionState = {
      search: this._dataScope.selection && this._dataScope.selection.search || null,
      selectedData: this._dataScope.selection && this._dataScope.selection.included || null,
      active: this._dataScope.active
    };
    return selectionState;
  }
  /**
   * Set one data row to the active state.
   */


  activate(datum) {
    return new Promise((resolve, reject) => {
      this._animator.activate(datum).then(() => {
        this._details.render();

        resolve();
      });
    });
  }
  /**
   * Deactivate item.
   */


  deActivate() {
    return new Promise((resolve, reject) => {
      if (this._dataScope && this._dataScope.active) {
        this._animator.deactivate().then(() => {
          this._details.render();

          resolve();
        });
      } else {
        resolve();
      }
    });
  }
  /**
   * Gets the current insight with signal values.
   */


  getInsight() {
    const insight = Object.assign({}, this.insight);
    insight.signalValues = this.getSignalValues();
    return insight;
  }
  /**
   * Gets column stats from current data (filtered or all).
   * @param column Column to get stats for.
   */


  getColumnStats(column) {
    return this._dataScope.hasFilteredData() ? this._dataScope.getFilteredColumnStats(column.name) : column.stats;
  }
  /**
   * Gets current signal values.
   */


  getSignalValues() {
    return (0, _signals.extractSignalValuesFromView)(this.vegaViewGl, this.vegaSpec);
  }

  finalize() {
    if (this._dataScope) this._dataScope.finalize();
    if (this._details) this._details.finalize();
    if (this._tooltip) this._tooltip.finalize();
    if (this.vegaViewGl) this.vegaViewGl.finalize();
    if (this.presenter) this.presenter.finalize();
    if (this.element) this.element.innerHTML = '';
    this.colorContexts = null;
    this.element = null;
    this.options = null;
    this.presenter = null;
    this.vegaSpec = null;
    this.vegaViewGl = null;
    this._animator = null;
    this._dataScope = null;
    this._details = null;
    this._tooltip = null;
  }

}
/**
 * Default Viewer options.
 */


exports.Viewer = Viewer;
Viewer.defaultViewerOptions = _defaults.defaultViewerOptions;
},{"./animator":"U1OZ","./axes":"A7xy","./axisSelection":"oIzg","./colorCubes":"PfBA","./colorSchemes":"kNpg","./constants":"Syc7","./dataScope":"MJ1d","./defaults":"G0Md","./details":"KCB5","./headers":"nQLz","./legend":"rI67","./ordinal":"dxn8","./search":"KytA","./signals":"jmI2","./tooltip":"bkgF","@msrvida/sanddance-specs":"gl1V","@msrvida/search-expression":"VB4o","@msrvida/vega-deck.gl":"eFEk"}],"DZif":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const version = '3.0.2';
exports.version = version;
},{}],"rZaE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "colorSchemes", {
  enumerable: true,
  get: function () {
    return _colorSchemes.colorSchemes;
  }
});
Object.defineProperty(exports, "Viewer", {
  enumerable: true,
  get: function () {
    return _viewer.Viewer;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _version.version;
  }
});
exports.VegaDeckGl = exports.util = exports.types = exports.specs = exports.searchExpression = exports.constants = exports.use = void 0;

var constants = _interopRequireWildcard(require("./constants"));

exports.constants = constants;

var searchExpression = _interopRequireWildcard(require("@msrvida/search-expression"));

exports.searchExpression = searchExpression;

var specs = _interopRequireWildcard(require("@msrvida/sanddance-specs"));

exports.specs = specs;

var types = _interopRequireWildcard(require("./types"));

exports.types = types;

var util = _interopRequireWildcard(require("./util"));

exports.util = util;

var VegaDeckGl = _interopRequireWildcard(require("@msrvida/vega-deck.gl"));

exports.VegaDeckGl = VegaDeckGl;

var _colorSchemes = require("./colorSchemes");

var _viewer = require("./viewer");

var _version = require("./version");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const use = VegaDeckGl.use;
exports.use = use;
},{"./constants":"Syc7","@msrvida/search-expression":"VB4o","@msrvida/sanddance-specs":"gl1V","./types":"JCLk","./util":"BTLl","@msrvida/vega-deck.gl":"eFEk","./colorSchemes":"kNpg","./viewer":"CdFf","./version":"DZif"}],"wkaK":[function(require,module,exports) {
module.exports = compare;

/*
  primitives: value1 === value2
  functions: value1.toString == value2.toString
  arrays: if length, sequence and values of properties are identical
  objects: if length, names and values of properties are identical
  compare([[1, [2, 3]], [[1, [2, 3]]); // true
  compare([[1, [2, 3], 4], [[1, [2, 3]]); // false
  compare({a: 2, b: 3}, {a: 2, b: 3}); // true
  compare({a: 2, b: 3}, {b: 3, a: 2}); // true
  compare({a: 2, b: 3, c: 4}, {a: 2, b: 3}); // false
  compare({a: 2, b: 3}, {a: 2, b: 3, c: 4}); // false
  compare([[1, [2, {a: 4}], 4], [[1, [2, {a: 4}]]); // true
*/

function compare(value1, value2) {
  if (value1 === value2) {
    return true;
  }
  /* eslint-disable no-self-compare */
  // if both values are NaNs return true
  if ((value1 !== value1) && (value2 !== value2)) {
    return true;
  }
  if ({}.toString.call(value1) != {}.toString.call(value2)) {
    return false;
  }
  if (value1 !== Object(value1)) {
    // non equal primitives
    return false;
  }
  if (!value1) {
    return false;
  }
  if (Array.isArray(value1)) {
    return compareArrays(value1, value2);
  }
  if ({}.toString.call(value1) == '[object Object]') {
    return compareObjects(value1, value2);
  } else {
    return compareNativeSubtypes(value1, value2);
  }
}

function compareNativeSubtypes(value1, value2) {
  // e.g. Function, RegExp, Date
  return value1.toString() === value2.toString();
}

function compareArrays(value1, value2) {
  var len = value1.length;
  if (len != value2.length) {
    return false;
  }
  var alike = true;
  for (var i = 0; i < len; i++) {
    if (!compare(value1[i], value2[i])) {
      alike = false;
      break;
    }
  }
  return alike;
}

function compareObjects(value1, value2) {
  var keys1 = Object.keys(value1).sort();
  var keys2 = Object.keys(value2).sort();
  var len = keys1.length;
  if (len != keys2.length) {
    return false;
  }
  for (var i = 0; i < len; i++) {
    var key1 = keys1[i];
    var key2 = keys2[i];
    if (!(key1 == key2 && compare(value1[key1], value2[key2]))) {
      return false;
    }
  }
  return true;
}

},{}],"HI4Z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepCompare = exports.classList = void 0;

var compare = _interopRequireWildcard(require("just-compare"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const classList = (...args) => {
  return args.filter(Boolean).join(' ');
};

exports.classList = classList;
const deepCompare = compare.default || compare;
exports.deepCompare = deepCompare;
},{"just-compare":"wkaK"}],"X6sm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.use = use;
exports.base = void 0;

var _viewer = require("./viewer");

var SandDance = _interopRequireWildcard(require("@msrvida/sanddance"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const base = {
  react: null,
  reactDOM: null
};
/**
 * Specify the dependency libraries to use for rendering.
 * @param react React library.
 * @param vega Vega library.
 * @param deck @deck.gl/core library.
 * @param layers @deck.gl/layers library.
 * @param luma @luma.gl/core library.
 */

exports.base = base;

function use(react, reactDOM, vega, deck, layers, luma) {
  SandDance.VegaDeckGl.use(vega, deck, layers, luma);
  base.react = react;
  base.reactDOM = reactDOM; //inform React that we are using a dynamic base class

  _viewer.SandDanceReact.prototype = react.Component.prototype;
}
},{"./viewer":"qyfj","@msrvida/sanddance":"rZaE"}],"qyfj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareProps = compareProps;
exports.SandDanceReact = void 0;

var _base = require("./base");

var _util = require("./util");

var _sanddance = require("@msrvida/sanddance");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function addNullable(insight, signalValues) {
  const withNulls = Object.assign(Object.assign({
    view: null,
    filter: null
  }, insight), {
    signalValues
  });
  return withNulls;
}

function compareProps(viewer, insight) {
  const currentInsight = viewer.getInsight();
  const a = addNullable(currentInsight, Object.assign(Object.assign({}, viewer.insight.signalValues), currentInsight.signalValues));
  const b = addNullable(insight, Object.assign(Object.assign({}, a.signalValues), insight.signalValues));
  const compare = (0, _util.deepCompare)(a, b);
  return {
    a,
    b,
    compare
  };
}

function _SandDanceReact(props) {
  class __SandDanceReact extends _base.base.react.Component {
    layout() {
      this.lastData = this.props.data;
      this.viewer.render(this.props.insight, this.props.data, this.props.renderOptions).then(renderResult => {
        //TODO: show errors if any
        //console.log('viewer render');
        this.props.onView && this.props.onView(renderResult);
      }).catch(e => {
        //console.log('viewer error');
        this.props.onError && this.props.onError(e);
      });
    }

    view() {
      if (this.props.insight && this.props.data) {
        const c = compareProps(this.viewer, this.props.insight);
        const sameDataRef = this.props.data === this.lastData;

        if (!c.compare || !sameDataRef) {
          this.layout();
        }
      }
    }

    componentDidMount() {
      const element = _base.base.reactDOM.findDOMNode(this.viewerDiv);

      this.viewer = new _sanddance.Viewer(element, this.props.viewerOptions);

      if (this.props.onMount) {
        if (this.props.onMount(this.viewer.presenter.getElement(_sanddance.VegaDeckGl.PresenterElement.gl))) {
          this.view();
        }
      } else {
        this.view();
      }
    }

    componentDidUpdate() {
      this.viewer.options = _sanddance.VegaDeckGl.util.deepMerge(this.viewer.options, this.props.viewerOptions);
      this.view();
    }

    componentWillUnmount() {
      this.viewer.finalize();
    }

    render() {
      return _base.base.react.createElement("div", {
        className: "sanddance-ReactViewer",
        ref: div => this.viewerDiv = div
      });
    }

  }

  return new __SandDanceReact(props);
}

const SandDanceReact = _SandDanceReact;
exports.SandDanceReact = SandDanceReact;
},{"./base":"X6sm","./util":"HI4Z","@msrvida/sanddance":"rZaE"}],"TN0H":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
const version = '3.0.0';
exports.version = version;
},{}],"MjKu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SandDanceReact", {
  enumerable: true,
  get: function () {
    return _viewer.SandDanceReact;
  }
});
Object.defineProperty(exports, "use", {
  enumerable: true,
  get: function () {
    return _base.use;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _version.version;
  }
});
exports.util = exports.SandDance = void 0;

var SandDance = _interopRequireWildcard(require("@msrvida/sanddance"));

exports.SandDance = SandDance;

var util = _interopRequireWildcard(require("./util"));

exports.util = util;

var _viewer = require("./viewer");

var _base = require("./base");

var _version = require("./version");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"@msrvida/sanddance":"rZaE","./util":"HI4Z","./viewer":"qyfj","./base":"X6sm","./version":"TN0H"}],"OWDI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Signal = Signal;

var _base = require("../base");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function Signal(props) {
  if (!props.explorer.viewer || !props.signal) {
    return null;
  }

  if (props.signal.bind) {
    var input = props.signal.bind.input;

    if (input) {
      var fn = map[input];

      if (fn) {
        var prefix = props.prefix ? "".concat(props.prefix, " ") : '';
        var initialValue;

        try {
          initialValue = props.explorer.viewer.vegaViewGl.signal(props.signal.name);
        } catch (error) {// continue regardless of error
        }

        var control = fn(prefix, props.signal.bind, initialValue, function (value) {
          props.onChange && props.onChange(value);
          props.explorer.signal(props.signal.name, value, props.newViewStateTarget);
        }, props.disabled, props.collapseLabel);
        return _base.base.react.createElement("div", {
          className: "sanddance-signal"
        }, control);
      }
    }
  }

  return null;
}

var map = {};

map['range'] = function (prefix, bind, initialValue, onChange, disabled, collapseLabel) {
  return _base.base.react.createElement(_base.base.fluentUI.Slider, {
    label: prefix + bind.name,
    max: bind.max,
    min: bind.min,
    step: bind.step,
    defaultValue: initialValue,
    onChange: onChange,
    disabled: disabled
  });
};

map['select'] = function (prefix, bind, initialValue, _onChange, disabled, collapseLabel) {
  var options = bind.options.map(function (o, i) {
    var option = {
      key: o,
      text: o
    };
    return option;
  });
  var label = prefix + bind.name;
  return _base.base.react.createElement(_base.base.fluentUI.Dropdown, {
    onRenderTitle: collapseLabel ? function (a, b) {
      return _base.base.react.createElement("span", null, label, ": ", a[0].text);
    } : undefined,
    defaultSelectedKey: initialValue,
    label: collapseLabel ? undefined : label,
    options: options,
    onChange: function onChange(e, o) {
      return _onChange(o.text);
    },
    disabled: disabled
  });
};

map['checkbox'] = function (prefix, bind, initialValue, _onChange2, disabled, collapseLabel) {
  return _base.base.react.createElement(_base.base.fluentUI.Toggle, {
    defaultChecked: initialValue,
    label: prefix + bind.name,
    onChange: function onChange(e, checked) {
      return _onChange2(checked);
    },
    disabled: disabled
  });
}; //TODO other signal types
},{"../base":"Vlbn"}],"hk5u":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var strings = {
  appName: 'SandDance',
  bingsearch: 'Bing',
  bingsearchDescription: function bingsearchDescription(term) {
    return "Search Bing for \"".concat(term, "\"");
  },
  buttonClose: 'Close',
  buttonSelect: 'Search & Select',
  buttonColorSchemeMap: 'Map color scheme to filtered data',
  buttonColorSchemeRemap: 'Remap color to filtered data',
  buttonColorSchemeKeep: 'Keep same color scheme',
  buttonCopyToClipboard: 'Copy to clipboard',
  buttonExclude: 'Exclude',
  buttonExport: 'Export',
  buttonExportCount: function buttonExportCount(total) {
    return total == 1 ? 'Export 1 row...' : "Export ".concat(total, " rows...");
  },
  buttonIsolate: 'Isolate',
  buttonReset: 'Stop filtering',
  buttonDeselect: 'Clear selection',
  buttonToolbarFloat: 'Float toolbar',
  buttonToolbarDock: 'Dock toolbar',
  buttonToolbarHide: 'Hide toolbar',
  buttonToolbarShow: 'Show toolbar',
  buttonNextDataItem: 'Next data item',
  buttonPrevDataItem: 'Previous data item',
  buttonCreateSnapshot: 'Create snapshot',
  buttonNextSnapshot: 'Next snapshot',
  buttonPrevSnapshot: 'Previous snapshot',
  buttonUpdateSnapshot: 'Update snapshot',
  buttonAddExpression: 'Add expression',
  buttonAddExpressionGroup: 'Add group',
  buttonDeleteExpression: 'Delete',
  buttonDeleteExpressionGroup: 'Delete group',
  buttonClearSnapshots: 'Clear snapshots',
  buttonDeleteSnapshot: 'Delete snapshot',
  buttonEditSnapshot: 'Edit snapshot',
  buttonMoveUp: 'Move up',
  buttonMoveDown: 'Move down',
  buttonShowVegaSpec: 'Show Vega spec',
  buttonLaunchVegaEditor: 'Open Vega Editor',
  buttonCameraHome: 'Center chart in window',
  buttonTooltipMapping: 'Tooltip columns...',
  buttonUndo: 'Undo',
  buttonRedo: 'Redo',
  chartTypeBarChartH: 'Bar',
  chartTypeBarChartV: 'Column',
  chartTypeDensity: 'Density',
  chartTypeGrid: 'Grid',
  chartTypeScatterPlot: 'Scatter',
  chartTypeStacks: 'Stacks',
  chartTypeStrips: 'Strips',
  chartTypeTreeMap: 'Treemap',
  defaultFileName: 'sanddance-data',
  errorExportFilenameEmpty: 'Filename cannot be blank',
  errorExportFilenameCharacters: function errorExportFilenameCharacters(characters) {
    return "A filename cannot contain any of the following characters: ".concat(characters);
  },
  errorColumnMustBeNumeric: 'Numeric column required for this chart type.',
  labelBlank: 'blank',
  labelNull: 'null',
  labelTrue: 'true',
  labelFalse: 'false',
  labelSystemInfo: 'System info',
  labelChartSettings: 'Chart settings',
  labelDataBrowser: 'Data browser',
  labelDataScope: 'Scope',
  labelExport: 'Export Data',
  labelExportFormat: 'File format',
  labelExportCSV: '.CSV - Comma separated values',
  labelExportHTML: '.HTML - A SandDance html page embedding this data',
  labelExportJSON: '.JSON - JavaScript object notation',
  labelExportTSV: '.TSV - Tab separated values',
  labelHistory: 'History',
  labelTools: 'Tools',
  labelVegaSpec: 'Vega specification',
  labelColor: 'Chart color',
  labelError: 'Error',
  labelExportFileName: 'File name',
  labelSnapshots: 'Snapshots',
  labelSnapshotSettingThumbnailWidth: 'Thumbnail image width',
  labelSearch: 'Select by search',
  labelSearchClause: 'Clause',
  labelSearchColumn: 'Field',
  labelSearchOperator: 'Operator',
  labelSearchValue: 'Value',
  labelSearchValuePlaceholder: 'Value to search for',
  labelChart: 'Chart',
  labelChartCanvas: 'Chart canvas',
  labelColumnMapping: 'Column Mapping',
  labelChartTypeOptions: 'Chart options',
  labelColorBin: 'Color binning',
  labelColorOptions: 'Color options',
  labelColorBinExplanation: 'For numeric columns',
  labelColorFieldInfo: function labelColorFieldInfo(colorColumnName, colorColumnType, categoricalNumeric, distinctValueCount) {
    return "Field <span className=\"fieldname\">".concat(colorColumnName, "</span> is of type <span className=\"fieldtype\">").concat(colorColumnType, "</span>").concat(categoricalNumeric ? " and has ".concat(distinctValueCount, " distinct values") : '', ".");
  },
  labelColorFieldIsColorData: function labelColorFieldIsColorData(colorColumnName) {
    return "Field <span className=\"fieldname\">".concat(colorColumnName, "</span> contains direct color data.");
  },
  labelColorBinNone: 'None (continuous)',
  labelColorBinQuantize: 'Quantize',
  labelColorBinQuantile: 'Quantile',
  labelColorFilter: 'Note: Colors will be re-mapped to the filter when viewing this snapshot.',
  labelColorScheme: 'Scheme',
  labelTotal: 'Total by',
  labelTotalByCountSquare: 'Count (Grid layout)',
  labelTotalByCountStrip: 'Count (Strip layout)',
  labelTotalBySumStrip: 'Sum (Strip layout)',
  labelTotalBySumTreemap: 'Sum (Treemap layout)',
  labelTotalBySumStripPercent: 'Sum as percentage (Strip layout)',
  labelColumnColor: 'Color by',
  labelColumnFacet: 'Facet by',
  labelFacetLayout: 'Facet layout',
  labelFacetLayoutWrap: 'Wrap',
  // labelFacetLayoutHorizontal: 'Horizontal',
  // labelFacetLayoutVertical: 'Vertical',
  labelFacetLayoutCross: '⊞',
  labelColumnFacetV: 'Cross facet by',
  labelColumnSort: 'Sort by',
  labelColumnX: 'X Axis',
  labelColumnY: 'Y Axis',
  labelColumnZ: 'Z Axis',
  labelColumnSize: 'Size by',
  labelColumnGroup: 'Group by',
  labelAliasColor: 'Color',
  labelAliasFacet: 'Facet',
  labelAliasFacetV: 'Vertical facet',
  labelAliasSort: 'Sort',
  labelAliasX: 'X Axis',
  labelAliasY: 'Y Axis',
  labelAliasZ: 'Z Axis',
  labelAliasSize: 'Size',
  labelAliasGroup: 'Group',
  labelDataItemIsFiltered: 'Item is filtered from view',
  labelHistoryInit: 'Initial view',
  labelHistoryFilterClear: 'Clear filter',
  labelHistoryFilterIExclude: 'Exclude filter',
  labelHistoryFilterIsolate: 'Isolate filter',
  labelHistoryChangeChartType: function labelHistoryChangeChartType(chart) {
    return "Change chart type to ".concat(chart);
  },
  labelHistoryMapColumn: function labelHistoryMapColumn(column) {
    return "Map ".concat(column, " role");
  },
  labelHistoryUnMapColumn: function labelHistoryUnMapColumn(column) {
    return "Unmap ".concat(column, " role");
  },
  labelHistoryReviveSnapshot: 'Revive snapshot',
  labelHistoryColorBin: 'Change color binning',
  labelHistoryDirectColor: 'Change direct color',
  labelShowLegend: 'Show legend',
  labelShowAxes: 'Show axes',
  labelSnapshotTitle: 'Title',
  labelSnapshotDescription: 'Note (optional)',
  labelTooltipMapping: 'Tooltip columns',
  labelTransitionDurations: 'Transition durations',
  labelTransitionCamera: '2D / 3D view',
  labelTransitionColor: 'Color',
  labelTransitionPosition: 'Position',
  labelTransitionSize: 'Size',
  labelVegaSpecData: 'Data reference',
  labelVegaSpecNotes: 'Note: You may need to change the color scheme to make this visible in Vega.',
  labelYes: 'Yes',
  labelNo: 'No',
  labelConfirmation: 'Are you sure?',
  loading: 'Loading...',
  schemeCategorical: 'Categorical',
  schemeDiverging: 'Diverging',
  schemeDual: 'Dual',
  schemeSequentialMultiHue: 'Sequential Multi Hue',
  schemeSequentialSingleHue: 'Sequential Single Hue',
  selectDataSpanAll: 'All rows',
  selectDataSpanFilter: 'Filtered',
  selectDataSpanSelection: 'Selected',
  selectVegaSpecDataNone: 'None',
  selectVegaSpecDataInline: 'Inline - WARNING this may use substantial browser/clipboard memory for large data sets.',
  selectVegaSpecDataUrl: 'URL',
  record: function record(current, total) {
    return "".concat(current, " of ").concat(total);
  },
  searchEQ: '=',
  searchNEQ: '<>',
  searchGT: '>',
  searchGTE: '>=',
  searchLT: '<',
  searchLTE: '<=',
  searchNULL: 'is null or empty',
  searchIN: 'contains',
  searchSW: 'starts with',
  searchWHERE: 'Where',
  searchAND: 'and',
  searchOR: 'or',
  selectAny: '-- any --',
  selectNone: '-- none --',
  selectNumeric: 'Numeric',
  selectNonNumeric: 'Categorical',
  selectDirectColor: 'Direct color',
  selectReference: 'Column mappings',
  tooltipSearch: function tooltipSearch(column, value) {
    return "Click to search in '".concat(column, "' for \"").concat(value, "\"");
  },
  labelRequired: 'required',
  labelSystem: 'System',
  labelViewType2d: 'View in 2D',
  labelViewType3d: 'View in 3D',
  labelDataColors: 'Enabled if this data column contains any CSS color values.',
  labelDataNullAll: 'Loading data...',
  labelDataNullFiltered: 'You can filter by first making a selection, then choosing <b>Isolate</b> or <b>Exclude</b> in the top bar.',
  labelDataNullSelection: 'You can select by: <ul><li>clicking the chart axes</li><li>clicking in the legend</li><li>searching</li</ul>',
  labelZeroAll: 'Dataset contains zero rows.',
  labelZeroSearchResults: 'No rows matched your search.',
  signalGroups: [{
    prefix: 'Chart',
    label: 'Chart options'
  }, {
    prefix: 'Mark',
    label: 'Mark options'
  }, {
    prefix: 'RoleColor',
    label: 'Color options'
  }, {
    prefix: 'RoleFacet',
    label: 'Facet options'
  }, {
    prefix: 'RoleSort',
    label: 'Sort options'
  }, {
    prefix: 'RoleX',
    label: 'X axis options'
  }, {
    prefix: 'RoleY',
    label: 'Y axis options'
  }, {
    prefix: 'RoleZ',
    label: 'Z axis options'
  }, {
    prefix: 'Text',
    label: 'Text options'
  }, {
    prefix: '*',
    label: 'Options'
  }]
};
exports.strings = strings;
},{}],"DSho":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumnMapOptions = getColumnMapOptions;
exports.ColumnMap = ColumnMap;

var _base = require("../base");

var _dropdown = require("./dropdown");

var _sanddanceReact = require("@msrvida/sanddance-react");

var _signal = require("./signal");

var _language = require("../language");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var maxFacets = 50;
var roleLabels = {
  color: _language.strings.labelColumnColor,
  facet: _language.strings.labelColumnFacet,
  facetV: _language.strings.labelColumnFacetV,
  group: _language.strings.labelColumnGroup,
  size: _language.strings.labelColumnSize,
  sort: _language.strings.labelColumnSort,
  uid: null,
  x: _language.strings.labelColumnX,
  y: _language.strings.labelColumnY,
  z: _language.strings.labelColumnZ
};
var aliasLabels = {
  color: _language.strings.labelAliasColor,
  facet: _language.strings.labelAliasFacet,
  facetV: _language.strings.labelAliasFacetV,
  group: _language.strings.labelAliasGroup,
  size: _language.strings.labelAliasSize,
  sort: _language.strings.labelAliasSort,
  uid: null,
  x: _language.strings.labelAliasX,
  y: _language.strings.labelAliasY,
  z: _language.strings.labelAliasZ
};

function filterColumnList(context, columns) {
  switch (context) {
    case 'facet':
    case 'facetV':
      return columns.filter(function (column) {
        return column.quantitative || column.stats.distinctValueCount && column.stats.distinctValueCount < maxFacets;
      });

    default:
      return columns.slice();
  }
}

function optionsForSpecColumn(sectionName, columns, role, disabledColumnName, selectedColumnName) {
  var filtered = filterColumnList(role, columns);
  var options = filtered.map(function (column) {
    var option = {
      key: "column:".concat(column.name),
      text: column.name,
      data: column,
      selected: selectedColumnName === column.name,
      disabled: disabledColumnName === column.name
    };
    return option;
  });

  if (options.length) {
    var option = {
      key: sectionName,
      text: sectionName,
      itemType: _base.base.fluentUI.DropdownMenuItemType.Header
    };
    options.unshift(option);
  }

  return options;
}

function optionsForReference(sectionName, specRoles) {
  var options = specRoles.map(function (specRole) {
    var option = {
      key: "role:".concat(specRole.role),
      text: aliasLabels[specRole.role],
      data: specRole.role
    };
    return option;
  }).sort(function (a, b) {
    return a.text.localeCompare(b.text);
  });

  if (options.length) {
    var option = {
      key: sectionName,
      text: sectionName,
      itemType: _base.base.fluentUI.DropdownMenuItemType.Header
    };
    options.unshift(option);
  }

  return options;
}

function selectFirst(options) {
  for (var i = 0; i < options.length; i++) {
    if (options[i].itemType === _base.base.fluentUI.DropdownMenuItemType.Header) continue;
    options[i].selected = true;
    return;
  }
}

function getColumnMapOptions(props) {
  if (!props.specRole) return null;
  var categoricalColumns;
  var directColorColumns;
  var directColorGroup;
  var referenceGroup = [];

  if (props.specRole.role === 'color') {
    categoricalColumns = props.categoricalColumns.filter(function (c) {
      return !c.isColorData;
    });
    directColorColumns = props.categoricalColumns.filter(function (c) {
      return c.isColorData;
    });
    directColorGroup = optionsForSpecColumn(_language.strings.selectDirectColor, directColorColumns, 'color', props.disabledColumnName, props.selectedColumnName);
  } else {
    categoricalColumns = props.categoricalColumns;
  }

  if (props.specRole.role === 'sort') {
    var others = props.specCapabilities.roles.filter(function (specRole) {
      return specRole.role !== props.specRole.role;
    });
    referenceGroup = optionsForReference(_language.strings.selectReference, others);
  }

  var quantitativeGroup = optionsForSpecColumn(_language.strings.selectNumeric, props.quantitativeColumns, props.specRole.role, props.disabledColumnName, props.selectedColumnName);
  var categoricGroup = props.specRole.excludeCategoric ? null : optionsForSpecColumn(_language.strings.selectNonNumeric, categoricalColumns, props.specRole.role, props.disabledColumnName, props.selectedColumnName);
  var options = referenceGroup.concat(quantitativeGroup).concat(categoricGroup).concat(directColorGroup).filter(Boolean);
  return options;
}

function ColumnMap(props) {
  var options = getColumnMapOptions(props);

  if (props.specRole.allowNone) {
    options.unshift({
      key: -1,
      text: _language.strings.selectNone
    });
  }

  var hasSelection = options.reduce(function (p, c) {
    return p || c.selected;
  }, false);

  if (!hasSelection) {
    selectFirst(options);
  }

  var signals;

  if (props.explorer.viewer && props.explorer.viewer.vegaSpec) {
    if (props.specRole.signals) {
      signals = props.explorer.viewer.vegaSpec.signals.filter(function (s) {
        return props.specRole.signals.indexOf(s.name) >= 0;
      });
    }
  }

  var label = roleLabels[props.specRole.role];
  var signalElements = !props.hideSignals && signals && signals.map(function (signal, i) {
    return _base.base.react.createElement(_signal.Signal, {
      key: i,
      explorer: props.explorer,
      signal: signal,
      onChange: function onChange(value) {
        return props.onChangeSignal && props.onChangeSignal(signal.name, value);
      },
      collapseLabel: props.collapseLabel
    });
  });
  return _base.base.react.createElement("div", {
    className: "sanddance-columnMap"
  }, props.prefix, !props.hideDropdown && _base.base.react.createElement(_dropdown.Dropdown, {
    componentRef: props.componentRef,
    collapseLabel: props.collapseLabel,
    disabled: props.disabled,
    label: label,
    options: options,
    onChange: function onChange(e, o) {
      return props.changeColumnMapping(props.specRole.role, typeof o.data === 'string' ? o.data : _sanddanceReact.SandDance.VegaDeckGl.util.clone(o.data));
    },
    onDismiss: props.onDismiss
  }), signalElements, props.suffix);
}
},{"../base":"Vlbn","./dropdown":"Uyrp","@msrvida/sanddance-react":"MjKu","./signal":"OWDI","../language":"hk5u"}],"UUG7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onBeforeCreateLayers = onBeforeCreateLayers;
exports.PositionedColumnMap = void 0;

var _base = require("./base");

var _columnMap = require("./controls/columnMap");

var _sanddanceReact = require("@msrvida/sanddance-react");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function onBeforeCreateLayers(stage, specCapabilities) {
  var _loop = function _loop(axisName) {
    specCapabilities.roles.forEach(function (specRole) {
      if (specRole.role === axisName) {
        var axes = stage.axes[axisName];
        axes.forEach(function (axis) {
          if (axis.title) {
            var textItem = axis.title;
            textItem.specRole = specRole;
          }
        });
      }
    });
  };

  for (var axisName in stage.axes) {
    _loop(axisName);
  }
}

function px(n) {
  return n + 'px';
}

function _PositionedColumnMap(props) {
  var __PositionedColumnMap =
  /*#__PURE__*/
  function (_base$react$Component) {
    _inherits(__PositionedColumnMap, _base$react$Component);

    function __PositionedColumnMap(props) {
      var _this;

      _classCallCheck(this, __PositionedColumnMap);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(__PositionedColumnMap).call(this, props));
      var left = props.left,
          top = props.top;
      _this.state = {
        left: left,
        top: top
      };
      _this.dropdownRef = _base.base.react.createRef();
      return _this;
    }

    _createClass(__PositionedColumnMap, [{
      key: "focus",
      value: function focus() {
        if (!this.focused) {
          this.focused = true;
          this.dropdownRef.current.focus(true);
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var size = _sanddanceReact.SandDance.VegaDeckGl.util.outerSize(this.div);

        var over = {
          left: Math.max(0, this.state.left + size.width - this.props.container.offsetWidth),
          top: Math.max(0, this.state.top + size.height - this.props.container.offsetHeight)
        };

        if (over.left || over.top) {
          var _this$state = this.state,
              left = _this$state.left,
              top = _this$state.top;
          left -= over.left;
          top -= over.top;
          this.setState({
            left: left,
            top: top
          });
        } else {
          this.focus();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this.focus();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return _base.base.react.createElement("div", {
          ref: function ref(div) {
            if (div) _this2.div = div;
          },
          className: "sanddance-columnMap-absolute",
          style: {
            position: 'absolute',
            left: px(this.state.left),
            top: px(this.state.top)
          }
        }, _base.base.react.createElement(_columnMap.ColumnMap, Object.assign({}, this.props, {
          componentRef: this.dropdownRef,
          hideSignals: true
        })));
      }
    }]);

    return __PositionedColumnMap;
  }(_base.base.react.Component);

  return new __PositionedColumnMap(props);
}

var PositionedColumnMap = _PositionedColumnMap;
exports.PositionedColumnMap = PositionedColumnMap;
},{"./base":"Vlbn","./controls/columnMap":"DSho","@msrvida/sanddance-react":"MjKu"}],"fOIZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.embedHtml = void 0;

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var embedHtml = function embedHtml(title, embed) {
  return "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>".concat(title, "</title>\n    <link rel=\"stylesheet\" type=\"text/css\"\n        href=\"https://unpkg.com/@msrvida/sanddance-embed@3/dist/css/sanddance-embed.css\" />\n    <link rel=\"stylesheet\" type=\"text/css\"\n        href=\"https://unpkg.com/@msrvida/sanddance-explorer@3/dist/css/sanddance-explorer.css\" />\n</head>\n\n<body>\n    <script src=\"https://unpkg.com/react@16.13/umd/react.production.min.js\" crossorigin></script>\n    <script src=\"https://unpkg.com/react-dom@16.13/umd/react-dom.production.min.js\" crossorigin></script>\n    <script src=\"https://unpkg.com/deck.gl@8.1.5/dist.min.js\"></script>\n    <script src=\"https://unpkg.com/vega@5.11/build/vega.min.js\"></script>\n    <script src=\"https://unpkg.com/@fluentui/react@7.111/dist/fluentui-react.js\"></script>\n    <script src=\"https://unpkg.com/@msrvida/sanddance-explorer@3/dist/umd/sanddance-explorer.js\"></script>\n    <script src=\"https://unpkg.com/@msrvida/sanddance-embed@3/dist/umd/sanddance-embed.js\"></script>\n\n    <div id=\"app\"></div>\n\n    ").concat(embed, "\n\n</body>\n\n</html>");
};

exports.embedHtml = embedHtml;
},{}],"pP3Y":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToDelimited = convertToDelimited;

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function convertToDelimited(data, delimiter) {
  var fields = Object.keys(data[0]);
  var file = data.map(function (row) {
    return fields.map(function (fieldName) {
      var value = row[fieldName];

      if (typeof value === 'number') {
        return value;
      }

      if (typeof value === 'string') {
        if (value.indexOf(delimiter) >= 0) {
          return "\"".concat(value.replace(/"/g, '""'), "\"");
        } else {
          return value;
        }
      }

      return '';
    }).join(delimiter);
  });
  file.unshift(fields.join(delimiter));
  return file.join('\n');
}
},{}],"l7po":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeExtensions = removeExtensions;
exports.getEmbedHTML = getEmbedHTML;
exports.DataExportPicker = void 0;

var _dataExporterHtml = require("./dataExporterHtml");

var _dialog = require("./dialog");

var _base = require("../base");

var _exportDelimited = require("../exportDelimited");

var _language = require("../language");

var _sanddanceReact = require("@msrvida/sanddance-react");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var exportTypes = [['json', _language.strings.labelExportJSON], ['csv', _language.strings.labelExportCSV], ['tsv', _language.strings.labelExportTSV], ['html', _language.strings.labelExportHTML]];

function _DataExportPicker(props) {
  var __DataExportPicker =
  /*#__PURE__*/
  function (_base$react$Component) {
    _inherits(__DataExportPicker, _base$react$Component);

    function __DataExportPicker(props) {
      var _this;

      _classCallCheck(this, __DataExportPicker);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(__DataExportPicker).call(this, props));
      _this.state = _this.getInitialState(_this.props);
      return _this;
    }

    _createClass(__DataExportPicker, [{
      key: "getInitialState",
      value: function getInitialState(props) {
        var initialState = {
          initializer: props.initializer,
          dialogHidden: true,
          exportType: exportTypes[0][0],
          fileName: props.initializer.fileName,
          fileNameError: '',
          working: false
        };
        return initialState;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        if (!_sanddanceReact.util.deepCompare(this.props.initializer, this.state.initializer)) {
          this.setState(this.getInitialState(this.props));
        }
      } // Converts to dataExport type and calls dataExportHandler to deal with data

    }, {
      key: "createExport",
      value: function createExport(exportType, displayName) {
        var _this2 = this;

        var final = function final(data) {
          _this2.props.dataExportHandler(data, exportType, displayName);

          _this2.close();
        };

        var json = JSON.stringify(this.props.data, columnReplacer);

        switch (exportType) {
          case 'json':
            {
              final(json);
              break;
            }

          case 'csv':
            {
              final((0, _exportDelimited.convertToDelimited)(JSON.parse(json), ','));
              break;
            }

          case 'tsv':
            {
              final((0, _exportDelimited.convertToDelimited)(JSON.parse(json), '\t'));
              break;
            }

          case 'html':
            {
              var csv = (0, _exportDelimited.convertToDelimited)(JSON.parse(json), ',');
              var html = (0, _dataExporterHtml.embedHtml)("".concat(_language.strings.appName, " - ").concat(escape(displayName)), embedScript(csv, displayName));
              final(html);
            }
        }
      }
    }, {
      key: "close",
      value: function close() {
        this.setState({
          dialogHidden: true,
          working: false
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        var closeDialog = function closeDialog() {
          return _this3.close();
        };

        if (this.state.delayAction) {
          requestAnimationFrame(function () {
            //allow render to complete
            if (_this3.state.delayAction) {
              _this3.state.delayAction();

              _this3.setState({
                delayAction: null
              });
            }
          });
        }

        var disabled = this.state.working || this.state.dialogHidden;
        return _base.base.react.createElement("div", {
          className: "sanddance-dataExporter"
        }, _base.base.react.createElement(_base.base.fluentUI.DefaultButton, {
          className: "search-action search-bottom-action",
          text: _language.strings.buttonExportCount(this.props.data.length),
          onClick: function onClick() {
            return _this3.setState({
              dialogHidden: false
            });
          },
          disabled: this.props.disabled
        }), _base.base.react.createElement(_dialog.Dialog, {
          hidden: this.state.dialogHidden,
          onDismiss: closeDialog,
          dialogContentProps: {
            className: "sanddance-dialog ".concat(this.props.theme),
            type: _base.base.fluentUI.DialogType.normal,
            title: _language.strings.labelExport
          },
          buttons: [_base.base.react.createElement(_base.base.fluentUI.PrimaryButton, {
            key: 0,
            disabled: disabled || !!this.state.fileNameError,
            onClick: function onClick(e) {
              return _this3.setState({
                delayAction: function delayAction() {
                  return _this3.createExport(_this3.state.exportType, _this3.state.fileName);
                },
                working: true
              });
            },
            text: _language.strings.buttonExport,
            iconProps: {
              iconName: 'Download'
            }
          })]
        }, _base.base.react.createElement(_base.base.fluentUI.TextField, {
          label: _language.strings.labelExportFileName,
          onChange: function onChange(e, displayName) {
            var displayNameError = getFileNameError(displayName);

            _this3.setState({
              fileName: displayName,
              fileNameError: displayNameError
            });
          },
          errorMessage: this.state.fileNameError,
          value: this.state.fileName
        }), _base.base.react.createElement(_base.base.fluentUI.ChoiceGroup, {
          className: "sanddance-form-separate",
          disabled: disabled,
          options: exportTypes.map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                exportType = _ref2[0],
                text = _ref2[1];

            return {
              key: exportType,
              text: text,
              disabled: false,
              checked: exportType === _this3.state.exportType
            };
          }),
          onChange: function onChange(ev, option) {
            return _this3.setState({
              exportType: option.key
            });
          },
          label: _language.strings.labelExportFormat
        })));
      }
    }]);

    return __DataExportPicker;
  }(_base.base.react.Component);

  return new __DataExportPicker(props);
}

var DataExportPicker = _DataExportPicker;
exports.DataExportPicker = DataExportPicker;
var illegalChars = '\\/:*?"<>|';

function getFileNameError(displayName) {
  if (!displayName) {
    return _language.strings.errorExportFilenameEmpty;
  }

  for (var i = 0; i < illegalChars.length; i++) {
    if (displayName.indexOf(illegalChars[i]) >= 0) {
      return _language.strings.errorExportFilenameCharacters(illegalChars);
    }
  }
}

function removeExtensions(fileName) {
  exportTypes.forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        exportType = _ref4[0];

    var re = new RegExp("\\.".concat(exportType), 'ig');
    fileName = fileName.replace(re, '');
  });
  return fileName;
}

function columnReplacer(name, value) {
  if (_sanddanceReact.SandDance.util.isInternalFieldName(name, true)) {
    return undefined;
  }

  return value === null ? '' : value;
}

function embedScript(csv, displayName, snapshots) {
  var dataFile = {
    type: 'csv',
    displayName: displayName,
    snapshots: snapshots
  };
  return "<pre id='csv-data' style='display:none'>".concat(csv, "</pre>\n    <script>SandDanceEmbed.load(Object.assign({rawText: document.getElementById('csv-data').innerText}, ").concat(JSON.stringify(dataFile), "))</script>");
}

function getEmbedHTML(data, displayName, snapshots) {
  var json = JSON.stringify(data, columnReplacer);
  var csv = (0, _exportDelimited.convertToDelimited)(JSON.parse(json), ',');
  var html = (0, _dataExporterHtml.embedHtml)("".concat(_language.strings.appName, " - ").concat(escape(displayName)), embedScript(csv, displayName, snapshots));
  return html;
}
},{"./dataExporterHtml":"fOIZ","./dialog":"cFWm","../base":"Vlbn","../exportDelimited":"pP3Y","../language":"hk5u","@msrvida/sanddance-react":"MjKu"}],"Q3hf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Group = Group;

var _base = require("../base");

var _sanddanceReact = require("@msrvida/sanddance-react");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function Group(props) {
  return _base.base.react.createElement("div", {
    className: _sanddanceReact.util.classList('sanddance-group', props.className)
  }, _base.base.react.createElement("div", {
    className: "group-head"
  }, _base.base.react.createElement("label", null, props.label), props.labelCount && _base.base.react.createElement("span", {
    className: "count"
  }, "(", props.labelCount, ")")), props.children && _base.base.react.createElement("div", {
    className: "group-body"
  }, props.children));
}
},{"../base":"Vlbn","@msrvida/sanddance-react":"MjKu"}],"ZOmP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleColumns = ToggleColumns;

var _base = require("../base");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function ToggleColumns(props) {
  return _base.base.react.createElement("div", null, props.allColumns.map(function (c, i) {
    return _base.base.react.createElement("div", {
      key: c.name
    }, _base.base.react.createElement("label", null, _base.base.react.createElement(_base.base.fluentUI.Toggle, {
      checked: props.exclusions.indexOf(c.name) < 0,
      inlineLabel: true,
      label: c.name,
      onChange: function onChange() {
        return props.toggleExclusion(c.name);
      }
    })));
  }));
}
},{"../base":"Vlbn"}],"NGSt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chartLabel = chartLabel;
exports.Chart = exports.chartLabelMap = void 0;

var _base = require("../base");

var _columnMap = require("../controls/columnMap");

var _dialog = require("../controls/dialog");

var _dropdown = require("../controls/dropdown");

var _group = require("../controls/group");

var _sanddanceReact = require("@msrvida/sanddance-react");

var _signal = require("../controls/signal");

var _language = require("../language");

var _toggleColumns = require("../controls/toggleColumns");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var singleFacetLayouts = [{
  facetStyle: 'wrap',
  text: _language.strings.labelFacetLayoutWrap
}];
var chartLabelMap = [{
  key: 'grid',
  text: _language.strings.chartTypeGrid
}, {
  key: 'scatterplot',
  text: _language.strings.chartTypeScatterPlot
}, {
  key: 'density',
  text: _language.strings.chartTypeDensity
}, {
  key: 'barchartV',
  text: _language.strings.chartTypeBarChartV
}, {
  key: 'barchartH',
  text: _language.strings.chartTypeBarChartH
}, {
  key: 'treemap',
  text: _language.strings.chartTypeTreeMap
}, {
  key: 'strips',
  text: _language.strings.chartTypeStrips
}, {
  key: 'stacks',
  text: _language.strings.chartTypeStacks
}];
exports.chartLabelMap = chartLabelMap;

function chartLabel(key) {
  for (var i = 0; i < chartLabelMap.length; i++) {
    if (key === chartLabelMap[i].key) {
      return chartLabelMap[i].text;
    }
  }
}

function _Chart(props) {
  var __Chart =
  /*#__PURE__*/
  function (_base$react$Component) {
    _inherits(__Chart, _base$react$Component);

    function __Chart(props) {
      var _this;

      _classCallCheck(this, __Chart);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(__Chart).call(this, props));
      _this.state = {
        showTooltipDialog: false
      };
      return _this;
    }

    _createClass(__Chart, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var props = this.props;
        var explorer = props.explorer,
            specCapabilities = props.specCapabilities;
        var signals = explorer.viewer && explorer.viewer.vegaSpec && specCapabilities && specCapabilities.signals && explorer.viewer.vegaSpec.signals.filter(function (s) {
          return specCapabilities.signals.indexOf(s.name) >= 0;
        });
        return _base.base.react.createElement("div", null, _base.base.react.createElement(_group.Group, {
          label: _language.strings.labelChart
        }, _base.base.react.createElement("div", {
          className: "calculator"
        }, _base.base.react.createElement(_base.base.fluentUI.ChoiceGroup, {
          className: "sanddance-chart-type",
          options: chartLabelMap.map(function (o) {
            return Object.assign(Object.assign({}, o), {
              checked: props.chart === o.key,
              disabled: props.disabled || o.key === 'treemap' && props.quantitativeColumns.length === 0
            });
          }),
          onChange: function onChange(e, o) {
            return props.onChangeChartType(o.key);
          }
        }))), _base.base.react.createElement(_group.Group, {
          label: _language.strings.labelColumnMapping
        }, _base.base.react.createElement("div", null, specCapabilities && specCapabilities.roles.map(function (specRole, i) {
          var specColumnInRole = props.insightColumns[specRole.role];
          var selectedColumnName = specColumnInRole;
          var disabledColumnName;
          var prefix;
          var suffix;
          var hideDropdown = false;
          var totalStyle = props.totalStyle;

          if (!totalStyle) {
            totalStyle = 'count-square';
          }

          var facetStyle = props.facetStyle;

          if (!facetStyle) {
            facetStyle = 'wrap';
          }

          switch (specRole.role) {
            case 'facet':
              {
                suffix = _base.base.react.createElement(_dropdown.Dropdown, {
                  disabled: !props.insightColumns.facet,
                  collapseLabel: props.collapseLabels,
                  label: _language.strings.labelFacetLayout,
                  calloutProps: {
                    style: {
                      minWidth: '18em'
                    }
                  },
                  options: [{
                    key: 'header1',
                    text: "".concat(_language.strings.labelFacetLayout, ":"),
                    itemType: _base.base.fluentUI.DropdownMenuItemType.Header
                  }].concat(_toConsumableArray(singleFacetLayouts.map(function (f) {
                    var o = {
                      key: f.facetStyle,
                      text: f.text,
                      data: f,
                      selected: facetStyle === f.facetStyle
                    };
                    return o;
                  })), [{
                    key: 'divider',
                    text: '-',
                    itemType: _base.base.fluentUI.DropdownMenuItemType.Divider
                  }, {
                    key: 'header2',
                    text: "".concat(_language.strings.labelColumnFacetV, ":"),
                    itemType: _base.base.fluentUI.DropdownMenuItemType.Header
                  }], _toConsumableArray((0, _columnMap.getColumnMapOptions)(Object.assign(Object.assign({}, props), {
                    specRole: specRole,
                    selectedColumnName: props.insightColumns.facetV
                  })).map(function (o) {
                    if (o.itemType !== _base.base.fluentUI.DropdownMenuItemType.Header) {
                      var facetData = {
                        facetStyle: 'cross',
                        column: o.data
                      };
                      o.data = facetData;
                      o.text = "".concat(_language.strings.labelFacetLayoutCross, " ").concat(o.text);
                    }

                    return o;
                  }))),
                  onChange: function onChange(e, o) {
                    var facetData = o.data;
                    props.changeColumnMapping('facet', 'facet', {
                      facetStyle: facetData.facetStyle
                    });

                    if (facetData.facetStyle === 'cross') {
                      props.changeColumnMapping('facetV', _sanddanceReact.SandDance.VegaDeckGl.util.clone(facetData.column));
                    }
                  }
                });
                break;
              }

            case 'facetV':
              {
                hideDropdown = true;
                break;
              }

            case 'size':
              {
                var options = [{
                  key: 'count-square',
                  text: _language.strings.labelTotalByCountSquare,
                  data: 'count-square',
                  selected: !totalStyle || totalStyle === 'count-square'
                }, {
                  key: 'count-strip',
                  text: _language.strings.labelTotalByCountStrip,
                  data: 'count-strip',
                  selected: totalStyle === 'count-strip'
                }, {
                  key: 'sum-strip',
                  text: _language.strings.labelTotalBySumStrip,
                  data: 'sum-strip',
                  selected: totalStyle === 'sum-strip'
                }, {
                  key: 'sum-treemap',
                  text: _language.strings.labelTotalBySumTreemap,
                  data: 'sum-treemap',
                  selected: totalStyle === 'sum-treemap',
                  disabled: props.quantitativeColumns.length === 0
                }];

                if (specCapabilities.percentage) {
                  options.push({
                    key: 'sum-strip-percent',
                    text: _language.strings.labelTotalBySumStripPercent,
                    data: 'sum-strip-percent',
                    selected: totalStyle === 'sum-strip-percent',
                    disabled: props.quantitativeColumns.length === 0
                  });
                }

                prefix = !specCapabilities.countsAndSums ? null : _base.base.react.createElement(_dropdown.Dropdown, {
                  collapseLabel: props.collapseLabels,
                  label: _language.strings.labelTotal,
                  calloutProps: {
                    style: {
                      minWidth: '18em'
                    }
                  },
                  options: options,
                  onChange: function onChange(e, o) {
                    return props.changeColumnMapping('size', 'size', {
                      totalStyle: o.data
                    });
                  }
                });
                break;
              }
          }

          var disabled = props.disabled || props.view === '2d' && specRole.role === 'z' || specRole.role === 'size' && !(!specCapabilities.countsAndSums || totalStyle.indexOf('sum-') === 0) || specRole.role === 'sort' && specCapabilities.countsAndSums && totalStyle === 'sum-treemap';
          return _base.base.react.createElement(_columnMap.ColumnMap, Object.assign({}, props, {
            prefix: prefix,
            suffix: suffix,
            collapseLabel: props.collapseLabels,
            disabled: disabled,
            disabledColumnName: disabledColumnName,
            selectedColumnName: selectedColumnName,
            specRole: specRole,
            key: i,
            onChangeSignal: function onChangeSignal(name, value) {
              return props.onChangeSignal(specRole.role, selectedColumnName, name, value);
            },
            hideDropdown: hideDropdown
          }));
        }), _base.base.react.createElement("div", {
          className: "sanddance-tooltipMap"
        }, _base.base.react.createElement(_base.base.fluentUI.DefaultButton, {
          text: _language.strings.buttonTooltipMapping,
          onClick: function onClick() {
            return _this2.setState({
              showTooltipDialog: true
            });
          }
        })))), signals && _base.base.react.createElement(_group.Group, {
          label: _language.strings.labelChartTypeOptions
        }, signals.map(function (signal, i) {
          return _base.base.react.createElement(_signal.Signal, {
            key: i,
            signal: signal,
            explorer: explorer,
            disabled: props.disabled || _this2.disableSignal(signal),
            collapseLabel: props.collapseLabels,
            newViewStateTarget: false
          });
        })), _base.base.react.createElement(_dialog.Dialog, {
          hidden: !this.state.showTooltipDialog,
          onDismiss: function onDismiss() {
            return _this2.setState({
              showTooltipDialog: false
            });
          },
          title: _language.strings.labelTooltipMapping
        }, _base.base.react.createElement(_toggleColumns.ToggleColumns, {
          allColumns: props.allColumns,
          exclusions: props.tooltipExclusions,
          toggleExclusion: props.toggleTooltipExclusion
        })));
      }
    }, {
      key: "disableSignal",
      value: function disableSignal(signal) {
        if (this.props.view === '2d' && signal.name === _sanddanceReact.SandDance.constants.SignalNames.ZGrounded) {
          return true;
        }

        return false;
      }
    }]);

    return __Chart;
  }(_base.base.react.Component);

  return new __Chart(props);
}

var Chart = _Chart;
exports.Chart = Chart;
},{"../base":"Vlbn","../controls/columnMap":"DSho","../controls/dialog":"cFWm","../controls/dropdown":"Uyrp","../controls/group":"Q3hf","@msrvida/sanddance-react":"MjKu","../controls/signal":"OWDI","../language":"hk5u","../controls/toggleColumns":"ZOmP"}],"qO9b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextField = TextField;

var _base = require("../base");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function TextField(props) {
  return _base.base.react.createElement(_base.base.fluentUI.TextField, Object.assign({
    onKeyUp: function onKeyUp(e) {
      e.nativeEvent.stopImmediatePropagation();
    }
  }, props));
}
},{"../base":"Vlbn"}],"xBH3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValidOperators = getValidOperators;
exports.getText = getText;
exports.SearchTerm = SearchTerm;
exports.maxAutocomplete = void 0;

var _dropdown = require("./dropdown");

var _textfield = require("./textfield");

var _base = require("../base");

var _language = require("../language");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var maxAutocomplete = 100;
exports.maxAutocomplete = maxAutocomplete;

function getValidOperators(column) {
  var type = column && column.type;

  switch (type) {
    case 'boolean':
      return [['==', _language.strings.searchEQ], ['!=', _language.strings.searchNEQ], ['isnullorEmpty', _language.strings.searchNULL]];

    case 'date':
    case 'integer':
    case 'number':
      return [['==', _language.strings.searchEQ], ['!=', _language.strings.searchNEQ], ['>', _language.strings.searchGT], ['>=', _language.strings.searchGTE], ['<', _language.strings.searchLT], ['<=', _language.strings.searchLTE], ['isnullorEmpty', _language.strings.searchNULL]];

    case 'string':
    default:
      return [['==', _language.strings.searchEQ], ['!=', _language.strings.searchNEQ], ['>', _language.strings.searchGT], ['>=', _language.strings.searchGTE], ['<', _language.strings.searchLT], ['<=', _language.strings.searchLTE], ['contains', _language.strings.searchIN], ['starts', _language.strings.searchSW], ['isnullorEmpty', _language.strings.searchNULL]];
  }
}

function getExpressionClauses(currClause, disableOR) {
  var keys = [['&&', _language.strings.searchAND]];

  if (!disableOR) {
    keys.push(['||', _language.strings.searchOR]);
  }

  return keys.map(function (key, i) {
    var _key = _slicedToArray(key, 2),
        clause = _key[0],
        text = _key[1];

    var selected = currClause == clause; //deliberate double equal 

    var option = {
      key: i,
      text: text,
      data: clause,
      selected: selected
    };
    return option;
  });
}

function getOperators(ex, column) {
  var anySelected = false;
  var validOperators = getValidOperators(column);
  var options = validOperators.map(function (validoperator) {
    var _validoperator = _slicedToArray(validoperator, 2),
        op = _validoperator[0],
        text = _validoperator[1];

    var selected = ex.operator === op;
    anySelected = anySelected || selected;
    var option = {
      key: op,
      text: text,
      data: op,
      selected: selected
    };
    return option;
  });

  if (!anySelected) {
    options[0].selected = true;
  }

  return options;
}

function getDistinctValues(data, columnName) {
  var distinctMap = {};

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var value = row[columnName];
    distinctMap[value] = true;
  }

  return Object.keys(distinctMap).sort();
}

function getValues(ex, column, data, autoCompleteDistinctValues) {
  var stats = column && column.stats;

  if (stats && stats.distinctValueCount < maxAutocomplete) {
    if (!autoCompleteDistinctValues[column.name]) {
      autoCompleteDistinctValues[column.name] = getDistinctValues(data, column.name);
    }

    return autoCompleteDistinctValues[column.name].map(function (v, i) {
      return {
        key: i,
        text: v
      };
    });
  }

  return [];
}

function getText(ex) {
  if (ex.operator === 'isnullorEmpty') return '';
  return typeof ex.value === 'string' ? ex.value : ex.value == null ? '' : ex.value.toString();
}

function SearchTerm(props) {
  var ex = props.searchExpression;
  var possibleValues = getValues(ex, props.column, props.data, props.autoCompleteDistinctValues); //TODO better date handling with calendar picker

  return _base.base.react.createElement("div", null, props.index > 0 && _base.base.react.createElement(_dropdown.Dropdown, {
    collapseLabel: props.collapseLabels,
    className: "search-field",
    label: _language.strings.labelSearchClause,
    dropdownWidth: 120,
    disabled: !ex.unlocked || props.disableOR,
    options: getExpressionClauses(ex.clause, props.disableOR),
    onChange: function onChange(e, o) {
      return props.onUpdateExpression({
        clause: o.data
      }, props.index);
    }
  }), _base.base.react.createElement(_dropdown.Dropdown, {
    collapseLabel: props.collapseLabels,
    className: "search-field",
    label: _language.strings.labelSearchColumn,
    options: [{
      key: '',
      text: _language.strings.selectAny,
      data: null,
      selected: ex.name === null
    }].concat(props.columns.map(function (c, i) {
      return {
        key: c.name,
        text: c.name,
        data: c,
        selected: c.name === ex.name
      };
    })),
    onChange: function onChange(e, o) {
      return props.onUpdateExpression({
        name: o.data && o.data.name || null
      }, props.index);
    }
  }), _base.base.react.createElement(_dropdown.Dropdown, {
    collapseLabel: props.collapseLabels,
    className: "search-field",
    label: _language.strings.labelSearchOperator,
    dropdownWidth: 120,
    options: getOperators(ex, props.column),
    onChange: function onChange(e, o) {
      return props.onUpdateExpression({
        operator: o.data
      }, props.index);
    }
  }), possibleValues.length > 0 && _base.base.react.createElement(_base.base.fluentUI.ComboBox, {
    className: "search-field",
    label: props.collapseLabels ? null : _language.strings.labelSearchValue,
    placeholder: _language.strings.labelSearchValuePlaceholder,
    disabled: ex.operator === 'isnullorEmpty',
    dropdownWidth: _dropdown.dropdownWidth,
    allowFreeform: true,
    autoComplete: "on",
    errorMessage: ex.errorMessage,
    text: getText(ex),
    options: getValues(ex, props.column, props.data, props.autoCompleteDistinctValues),
    onChange: function onChange(e, o, i, value) {
      if (o) {
        value = o.text;
      }

      props.onUpdateExpression({
        value: value
      }, props.index);
    }
  }), possibleValues.length === 0 && _base.base.react.createElement(_textfield.TextField, {
    className: "search-field",
    label: props.collapseLabels ? null : _language.strings.labelSearchValue,
    placeholder: _language.strings.labelSearchValuePlaceholder,
    disabled: ex.operator === 'isnullorEmpty',
    errorMessage: ex.errorMessage,
    value: getText(ex),
    onChange: function onChange(e, v) {
      return props.onUpdateExpression({
        value: v
      }, props.index);
    }
  }));
}
},{"./dropdown":"Uyrp","./textfield":"qO9b","../base":"Vlbn","../language":"hk5u"}],"eqtW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = Button;

var _base = require("../base");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function Button(props) {
  return _base.base.react.createElement(_base.base.fluentUI.DefaultButton, Object.assign({}, props, {
    styles: {
      root: {
        backgroundColor: 'transparent',
        height: '30px',
        width: props.width,
        padding: 0
      },
      rootDisabled: {
        backgroundColor: 'transparent'
      },
      icon: {
        color: props.themePalette.themePrimary
      },
      label: {
        fontWeight: '400',
        textAlign: props.textAlign || 'left'
      }
    },
    iconProps: {
      iconName: props.iconName
    }
  }));
}
},{"../base":"Vlbn"}],"ozxe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = void 0;

var _searchTerm = require("../controls/searchTerm");

var _base = require("../base");

var _button = require("../controls/button");

var _dropdown = require("../controls/dropdown");

var _group = require("../controls/group");

var _sanddanceReact = require("@msrvida/sanddance-react");

var _language = require("../language");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var maxClauses = 5;

function getColumnWithName(columnName, columns) {
  for (var i = 0; i < columns.length; i++) {
    if (columns[i].name === columnName) return columns[i];
  }
}

function validateExpression(ex) {
  if (ex.operator === 'isnullorEmpty') {
    ex.errorMessage = null;
    return;
  }

  var s = (0, _searchTerm.getText)(ex);

  if (s.length === 0) {
    ex.errorMessage = _language.strings.labelRequired;
  } else {
    ex.errorMessage = null;
  }
}

function clearExpressionValidation(ex) {
  if (ex.operator === 'isnullorEmpty') {
    ex.errorMessage = null;
    return;
  }

  var s = (0, _searchTerm.getText)(ex);

  if (s.length !== 0) {
    ex.errorMessage = null;
  }
}

function getGroupClauses(currClause, index, disableGroupOR) {
  var keys;

  if (index === 0) {
    keys = [[null, _language.strings.searchWHERE]];
  } else {
    keys = [['&&', _language.strings.searchAND]];

    if (!disableGroupOR) {
      keys.push(['||', _language.strings.searchOR]);
    }
  }

  return keys.map(function (key, i) {
    var _key = _slicedToArray(key, 2),
        clause = _key[0],
        text = _key[1];

    var selected = currClause == clause; //deliberate double equal 

    var option = {
      key: i,
      text: text,
      data: clause,
      selected: selected
    };
    return option;
  });
}

function _Search(props) {
  var __Search =
  /*#__PURE__*/
  function (_base$react$Component) {
    _inherits(__Search, _base$react$Component);

    function __Search(props) {
      var _this;

      _classCallCheck(this, __Search);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(__Search).call(this, props));
      _this.state = _this.getInitialState(_this.props);
      return _this;
    }

    _createClass(__Search, [{
      key: "getInitialState",
      value: function getInitialState(props) {
        var initialState = {
          groups: props.initializer.search || [this.newGroup(0, null)],
          sortedColumns: _toConsumableArray(props.initializer.columns).sort(function (a, b) {
            return a.name.localeCompare(b.name);
          }),
          initializer: props.initializer
        };
        initialState.groups.forEach(function (group) {
          group.expressions.forEach(function (ex) {
            return ex.unlocked = group.expressions.length <= 2;
          });
        });
        return initialState;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        if (!_sanddanceReact.util.deepCompare(this.props.initializer, this.state.initializer)) {
          this.setState(this.getInitialState(this.props));
        }
      }
    }, {
      key: "validateAndSearch",
      value: function validateAndSearch() {
        var _this2 = this;

        var groups = _toConsumableArray(this.state.groups);

        groups.forEach(function (group) {
          group.expressions.forEach(validateExpression);
          var errors = group.expressions.reduce(function (p, c) {
            return p || c.errorMessage;
          }, '');

          if (errors) {
            _this2.setState({
              groups: groups
            });
          } else {
            _this2.props.onSelect(_this2.state.groups);
          }
        });
      }
    }, {
      key: "newGroup",
      value: function newGroup(key, clause) {
        var group = {
          key: key,
          clause: clause,
          expressions: [this.newExpression(0, null)]
        };
        return group;
      }
    }, {
      key: "updateGroup",
      value: function updateGroup(partialGroup, groupIndex) {
        var groups = _toConsumableArray(this.state.groups);

        var group = Object.assign(Object.assign({}, groups[groupIndex]), partialGroup);
        groups[groupIndex] = group;
        this.setState({
          groups: groups
        });
      }
    }, {
      key: "addGroup",
      value: function addGroup() {
        var groups = _toConsumableArray(this.state.groups);

        var maxKey = groups.reduce(function (max, p) {
          return p.key > max ? p.key : max;
        }, groups[0].key);
        var newGroup = this.newGroup(maxKey + 1, '&&');
        groups.push(newGroup);
        this.setState({
          groups: groups
        });
      }
    }, {
      key: "deleteGroup",
      value: function deleteGroup(groupIndex) {
        var groups = _toConsumableArray(this.state.groups);

        groups.splice(groupIndex, 1);
        this.setState({
          groups: groups
        });
      }
    }, {
      key: "newExpression",
      value: function newExpression(key, clause) {
        var ex = {
          key: key,
          clause: clause,
          name: null,
          operator: 'contains',
          value: ''
        };
        return ex;
      }
    }, {
      key: "addExpression",
      value: function addExpression(groupIndex) {
        var groups = _toConsumableArray(this.state.groups);

        var group = groups[groupIndex];
        var maxKey = group.expressions.reduce(function (max, p) {
          return p.key > max ? p.key : max;
        }, group.expressions[0].key);
        var newEx = this.newExpression(maxKey + 1, '&&');
        group.expressions.push(newEx);

        if (group.expressions.length === 2) {
          newEx.unlocked = true;
        } else {
          group.expressions.forEach(function (ex) {
            return ex.unlocked = false;
          });
          newEx.clause = group.expressions[1].clause;
        }

        this.setState({
          groups: groups
        });
      }
    }, {
      key: "updateExpression",
      value: function updateExpression(partialEx, groupIndex, index) {
        var groups = _toConsumableArray(this.state.groups);

        var group = groups[groupIndex];

        var ex = _sanddanceReact.SandDance.VegaDeckGl.util.clone(group.expressions[index]);

        if (ex.name !== partialEx.name) {
          //choose an appropriate operator when switching data type
          var oldColumn = getColumnWithName(ex.name, this.state.sortedColumns);
          var newColumn = getColumnWithName(partialEx.name, this.state.sortedColumns);
          var oldType = oldColumn && oldColumn.type;
          var newType = newColumn && newColumn.type;

          if (oldType !== newType) {
            var newOperators = (0, _searchTerm.getValidOperators)(newColumn).map(function (validOperator) {
              return validOperator[0];
            }); //see if old operator is compatible

            if (newOperators.indexOf(ex.operator) < 0) {
              //not compatible, so choose "equal"
              partialEx.operator = '==';
            }
          }
        }

        Object.assign(ex, partialEx);
        clearExpressionValidation(ex);
        group.expressions[index] = ex;
        this.setState({
          groups: groups
        });
      }
    }, {
      key: "deleteExpression",
      value: function deleteExpression(groupIndex, index) {
        var groups = _toConsumableArray(this.state.groups);

        var group = groups[groupIndex];

        var expressions = _toConsumableArray(group.expressions);

        expressions.splice(index, 1);

        if (expressions.length === 2) {
          expressions[1].unlocked = true;
        }

        group.expressions = expressions;
        this.setState({
          groups: groups
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        return _base.base.react.createElement(_group.Group, {
          className: "sanddance-search",
          label: _language.strings.labelSearch
        }, _base.base.react.createElement("div", null, this.state.groups.map(function (group, groupIndex) {
          return _base.base.react.createElement("div", {
            className: "sanddance-search-group",
            key: group.key
          }, _base.base.react.createElement(_dropdown.Dropdown, {
            collapseLabel: _this3.props.collapseLabels,
            className: "search-group-clause",
            label: _language.strings.labelSearchClause,
            disabled: groupIndex === 0 || _this3.props.disableGroupOR,
            dropdownWidth: 120,
            options: getGroupClauses(group.clause, groupIndex, _this3.props.disableGroupOR),
            onChange: function onChange(e, o) {
              return _this3.updateGroup({
                clause: o.data
              }, groupIndex);
            }
          }), _base.base.react.createElement("div", null, group.expressions.map(function (ex, i) {
            return _base.base.react.createElement("div", {
              className: "sanddance-search-expression",
              key: ex.key
            }, _base.base.react.createElement(_searchTerm.SearchTerm, {
              collapseLabels: _this3.props.collapseLabels,
              onUpdateExpression: function onUpdateExpression(ex, i) {
                return _this3.updateExpression(ex, groupIndex, i);
              },
              autoCompleteDistinctValues: _this3.props.autoCompleteDistinctValues,
              index: i,
              columns: _this3.state.sortedColumns,
              data: _this3.props.data,
              searchExpression: ex,
              disableOR: _this3.props.disableExpressionOR,
              column: getColumnWithName(ex.name, _this3.state.sortedColumns)
            }), group.expressions.length > 1 && _base.base.react.createElement(_button.Button, {
              themePalette: _this3.props.themePalette,
              className: "search-action",
              iconName: "Cancel",
              onClick: function onClick() {
                return _this3.deleteExpression(groupIndex, i);
              },
              text: _language.strings.buttonDeleteExpression
            }));
          })), group.expressions.length < maxClauses && _base.base.react.createElement("div", null, _base.base.react.createElement(_button.Button, {
            themePalette: _this3.props.themePalette,
            className: "search-action",
            iconName: "Add",
            onClick: function onClick() {
              return _this3.addExpression(groupIndex);
            },
            text: _language.strings.buttonAddExpression
          })), _this3.state.groups.length > 1 && _base.base.react.createElement(_button.Button, {
            themePalette: _this3.props.themePalette,
            className: "search-action",
            iconName: "Cancel",
            onClick: function onClick() {
              return _this3.deleteGroup(groupIndex);
            },
            text: _language.strings.buttonDeleteExpressionGroup
          }));
        }), this.state.groups.length < maxClauses && _base.base.react.createElement("div", null, _base.base.react.createElement(_button.Button, {
          themePalette: this.props.themePalette,
          className: "search-action search-bottom-action",
          iconName: "Add",
          onClick: function onClick() {
            return _this3.addGroup();
          },
          text: _language.strings.buttonAddExpressionGroup
        }))), _base.base.react.createElement(_base.base.fluentUI.PrimaryButton, {
          className: "search-action search-bottom-action",
          text: _language.strings.buttonSelect,
          onClick: function onClick() {
            return _this3.validateAndSearch();
          }
        }));
      }
    }]);

    return __Search;
  }(_base.base.react.Component);

  return new __Search(props);
}

var Search = _Search;
exports.Search = Search;
},{"../controls/searchTerm":"xBH3","../base":"Vlbn","../controls/button":"eqtW","../controls/dropdown":"Uyrp","../controls/group":"Q3hf","@msrvida/sanddance-react":"MjKu","../language":"hk5u"}],"Dryx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCanvas = getCanvas;
exports.removeTabIndex = removeTabIndex;
exports.capabilities = void 0;

var _sanddanceReact = require("@msrvida/sanddance-react");

var PresenterElement = _sanddanceReact.SandDance.VegaDeckGl.PresenterElement;

function getCanvas(viewer) {
  var tags = viewer.presenter.getElement(PresenterElement.gl).getElementsByTagName('canvas');

  if (tags) {
    return tags[0];
  }
}

function removeTabIndex(viewer) {
  var canvas = getCanvas(viewer);

  if (canvas) {
    canvas.tabIndex = -1;
  }
}

var capabilities = {
  webgl: !!document.createElement('canvas').getContext('webgl'),
  webgl2: !!document.createElement('canvas').getContext('webgl2')
};
exports.capabilities = capabilities;
},{"@msrvida/sanddance-react":"MjKu"}],"RvaL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var version = '3.0.1';
exports.version = version;
},{}],"zKGJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Settings = void 0;

var SandDanceReact = _interopRequireWildcard(require("@msrvida/sanddance-react"));

var _base = require("../base");

var _canvas = require("../canvas");

var _dialog = require("../controls/dialog");

var _dropdown = require("../controls/dropdown");

var _group = require("../controls/group");

var _signal = require("../controls/signal");

var _language = require("../language");

var _version = require("../version");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SandDance = SandDanceReact.SandDance;
var DataRefType;

(function (DataRefType) {
  DataRefType[DataRefType["none"] = 0] = "none";
  DataRefType[DataRefType["inline"] = 1] = "inline";
  DataRefType[DataRefType["url"] = 2] = "url";
})(DataRefType || (DataRefType = {}));

function filterSignals(signal) {
  switch (signal.name) {
    case SandDance.constants.SignalNames.XBins:
    case SandDance.constants.SignalNames.YBins:
    case SandDance.constants.SignalNames.FacetBins:
    case SandDance.constants.SignalNames.FacetVBins:
    case SandDance.constants.SignalNames.ColorBinCount:
    case SandDance.constants.SignalNames.ColorReverse:
    case SandDance.constants.SignalNames.PointScale:
    case SandDance.constants.SignalNames.TreeMapMethod:
      return false;

    default:
      return !!signal.bind;
  }
}

function cloneData(vegaSpec) {
  var data0 = vegaSpec.data[0];
  var valuesData = data0;
  var values = valuesData.values;
  delete valuesData.values;
  var data = SandDance.VegaDeckGl.util.clone(vegaSpec.data);
  valuesData.values = values;
  return {
    data: data,
    values: values
  };
}

function cloneScales(vegaSpec) {
  return SandDance.VegaDeckGl.util.clone(vegaSpec.scales);
}

function serializeSpec(vegaSpec, datafile, dataRefType, transform, scheme) {
  var scales = cloneScales(vegaSpec);
  var colorScale = scales.filter(function (scale) {
    return scale.name === SandDance.constants.ScaleNames.Color;
  })[0];

  if (scheme.indexOf('dual_') >= 0) {
    colorScale.range = SandDance.colorSchemes.filter(function (cs) {
      return cs.scheme === scheme;
    })[0].colors;
  }

  var clone = cloneData(vegaSpec);
  var data0 = clone.data[0];

  if (dataRefType === DataRefType.inline) {
    var valuesData = data0;
    valuesData.format = {
      parse: 'auto',
      type: 'json'
    };
    valuesData.values = clone.values;
  } else if (dataRefType === DataRefType.none) {
    var _valuesData = data0;
    _valuesData.values = [];

    if (transform) {
      if (_valuesData.transform) {
        _valuesData.transform.push.apply(_valuesData.transform, transform);
      } else {
        _valuesData.transform = transform;
      }
    }
  } else if (dataRefType === DataRefType.url) {
    var urlData = data0;
    urlData.url = datafile.dataUrl;
    urlData.format = {
      parse: 'auto',
      type: datafile.type
    };

    if (transform) {
      if (urlData.transform) {
        urlData.transform.push.apply(urlData.transform, transform);
      } else {
        urlData.transform = transform;
      }
    }
  }

  return Object.assign(Object.assign({}, vegaSpec), {
    data: clone.data,
    scales: scales
  });
}

function defaultDataRefType(datafile) {
  if (datafile.dataUrl) {
    return DataRefType.url;
  }

  return DataRefType.none;
}

function initState(props) {
  return {
    showSystemDialog: false,
    showVegaDialog: false,
    dataRefType: defaultDataRefType(props.dataFile),
    spec: null
  };
}

function signalGroupKey(key) {
  for (var i = 0; i < _language.strings.signalGroups.length; i++) {
    if (_language.strings.signalGroups[i].prefix === key) {
      return key;
    }
  }

  return '*';
}

function vegaSignalGroups(vegaSignals) {
  var signalGroupMap = {};
  vegaSignals.forEach(function (vs) {
    var split = vs.name.split('_');
    var key = signalGroupKey(split[0]);
    signalGroupMap[key] = signalGroupMap[key] || [];
    signalGroupMap[key].push(vs);
  });
  return signalGroupMap;
}

function _Settings(props) {
  var __Settings =
  /*#__PURE__*/
  function (_base$react$Component) {
    _inherits(__Settings, _base$react$Component);

    function __Settings(props) {
      var _this;

      _classCallCheck(this, __Settings);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(__Settings).call(this, props));
      _this.state = initState(props);
      return _this;
    }

    _createClass(__Settings, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var props = this.props,
            state = this.state;
        if (!props.explorer.viewer || !props.explorer.viewer.vegaSpec) return null;
        var options = [{
          key: DataRefType.none,
          text: _language.strings.selectVegaSpecDataNone,
          selected: this.state.dataRefType === DataRefType.none,
          data: DataRefType.none
        }, !props.dataFile.rawText && {
          key: DataRefType.url,
          text: _language.strings.selectVegaSpecDataUrl,
          selected: this.state.dataRefType === DataRefType.url,
          data: DataRefType.url
        }, {
          key: DataRefType.inline,
          text: _language.strings.selectVegaSpecDataInline,
          selected: this.state.dataRefType === DataRefType.inline,
          data: DataRefType.inline
        }].filter(Boolean);
        var signalGroupMap = vegaSignalGroups(props.explorer.viewer.vegaSpec.signals);
        return _base.base.react.createElement("div", null, _language.strings.signalGroups.map(function (sg) {
          var vegaSignals = signalGroupMap[sg.prefix];

          if (vegaSignals) {
            var filteredVegaSignals = vegaSignals.filter(filterSignals);

            if (filteredVegaSignals.length > 0) {
              return _base.base.react.createElement(_group.Group, {
                key: sg.prefix,
                label: sg.label
              }, filteredVegaSignals.map(function (signal, i) {
                return _base.base.react.createElement(_signal.Signal, {
                  key: i,
                  signal: signal,
                  explorer: props.explorer,
                  newViewStateTarget: false
                });
              }));
            }
          }
        }), _base.base.react.createElement(_group.Group, {
          label: _language.strings.labelChartCanvas
        }, _base.base.react.createElement(_base.base.fluentUI.Toggle, {
          label: _language.strings.labelShowAxes,
          defaultChecked: !props.hideAxes,
          onChange: function onChange(e, checked) {
            return props.onToggleAxes(!checked);
          }
        }), _base.base.react.createElement(_base.base.fluentUI.Toggle, {
          label: _language.strings.labelShowLegend,
          defaultChecked: !props.hideLegend,
          onChange: function onChange(e, checked) {
            return props.onToggleLegend(!checked);
          }
        })), _base.base.react.createElement(_group.Group, {
          label: _language.strings.labelTools
        }, _base.base.react.createElement(_base.base.fluentUI.DefaultButton, {
          text: _language.strings.buttonShowVegaSpec,
          onClick: function onClick() {
            return _this2.setState({
              showVegaDialog: true,
              spec: serializeSpec(props.explorer.viewer.vegaSpec, props.dataFile, _this2.state.dataRefType, props.explorer.viewer.getInsight().transform, _this2.props.scheme)
            });
          }
        })), _base.base.react.createElement(_group.Group, {
          label: _language.strings.labelSnapshots
        }, _base.base.react.createElement(_base.base.fluentUI.Slider, {
          label: _language.strings.labelSnapshotSettingThumbnailWidth,
          onChange: function onChange(value) {
            _this2.props.explorer.snapshotThumbWidth = value;
          },
          min: 100,
          max: 800,
          defaultValue: this.props.explorer.snapshotThumbWidth
        })), _base.base.react.createElement(_group.Group, {
          label: _language.strings.labelTransitionDurations
        }, _base.base.react.createElement(_base.base.fluentUI.Slider, {
          label: _language.strings.labelTransitionColor,
          onChange: function onChange(value) {
            _this2.props.explorer.viewerOptions.transitionDurations.color = value;
          },
          min: 0,
          max: 10000,
          defaultValue: this.props.explorer.viewerOptions.transitionDurations.color
        }), _base.base.react.createElement(_base.base.fluentUI.Slider, {
          label: _language.strings.labelTransitionPosition,
          onChange: function onChange(value) {
            _this2.props.explorer.viewerOptions.transitionDurations.position = value;
          },
          min: 0,
          max: 10000,
          defaultValue: this.props.explorer.viewerOptions.transitionDurations.position
        }), _base.base.react.createElement(_base.base.fluentUI.Slider, {
          label: _language.strings.labelTransitionSize,
          onChange: function onChange(value) {
            _this2.props.explorer.viewerOptions.transitionDurations.size = value;
          },
          min: 0,
          max: 10000,
          defaultValue: this.props.explorer.viewerOptions.transitionDurations.size
        }), _base.base.react.createElement(_base.base.fluentUI.Slider, {
          label: _language.strings.labelTransitionCamera,
          onChange: function onChange(value) {
            _this2.props.explorer.viewerOptions.transitionDurations.view = value;
          },
          min: 0,
          max: 10000,
          defaultValue: this.props.explorer.viewerOptions.transitionDurations.view
        })), props.additionalSettings && props.additionalSettings.map(function (g, i) {
          return _base.base.react.createElement(_group.Group, {
            key: i,
            label: g.groupLabel
          }, g.children);
        }), _base.base.react.createElement(_group.Group, {
          label: _language.strings.labelSystem
        }, _base.base.react.createElement(_base.base.fluentUI.DefaultButton, {
          text: _language.strings.labelSystemInfo,
          onClick: function onClick() {
            return _this2.setState({
              showSystemDialog: true
            });
          }
        })), _base.base.react.createElement(_dialog.Dialog, {
          hidden: !state.showVegaDialog,
          onDismiss: function onDismiss() {
            return _this2.setState(initState(_this2.props));
          },
          minWidth: "80%",
          title: _language.strings.labelVegaSpec,
          buttons: [_base.base.react.createElement(_base.base.fluentUI.PrimaryButton, {
            key: "copy",
            iconProps: {
              iconName: 'Copy'
            },
            text: _language.strings.buttonCopyToClipboard,
            onClick: function onClick() {
              var pre = document.getElementById('sanddance-vega-spec');
              var range = document.createRange();
              range.selectNode(pre);
              var selection = window.getSelection();
              selection.removeAllRanges();
              selection.addRange(range);
              document.execCommand('copy');
            }
          }), _base.base.react.createElement(_base.base.fluentUI.DefaultButton, {
            key: "edit",
            iconProps: {
              iconName: 'OpenInNewWindow'
            },
            text: _language.strings.buttonLaunchVegaEditor,
            onClick: function onClick() {
              window.open('https://vega.github.io/editor/', '_blank');
            }
          })]
        }, _base.base.react.createElement(_dropdown.Dropdown, {
          label: _language.strings.labelVegaSpecData,
          options: options,
          onChange: function onChange(e, o) {
            return _this2.setState({
              dataRefType: o.data,
              spec: serializeSpec(props.explorer.viewer.vegaSpec, props.dataFile, o.data, props.explorer.viewer.getInsight().transform, _this2.props.scheme)
            });
          }
        }), _base.base.react.createElement("pre", {
          id: "sanddance-vega-spec"
        }, JSON.stringify(this.state.spec, null, 2)), _base.base.react.createElement("div", null, _language.strings.labelVegaSpecNotes)), _base.base.react.createElement(_dialog.Dialog, {
          hidden: !state.showSystemDialog,
          onDismiss: function onDismiss() {
            return _this2.setState(initState(_this2.props));
          },
          title: _language.strings.labelSystemInfo
        }, _base.base.react.createElement("ul", null, this.props.children, _base.base.react.createElement("li", null, "SandDanceExplorer version: ", _version.version), _base.base.react.createElement("li", null, "SandDanceReact version: ", SandDanceReact.version), _base.base.react.createElement("li", null, "SandDance version: ", SandDance.version), _base.base.react.createElement("li", null, "WebGL enabled: ", _canvas.capabilities.webgl ? _language.strings.labelYes : _language.strings.labelNo), _base.base.react.createElement("li", null, "WebGL2 enabled: ", _canvas.capabilities.webgl2 ? _language.strings.labelYes : _language.strings.labelNo))));
      }
    }]);

    return __Settings;
  }(_base.base.react.Component);

  return new __Settings(props);
}

var Settings = _Settings;
exports.Settings = Settings;
},{"@msrvida/sanddance-react":"MjKu","../base":"Vlbn","../canvas":"Dryx","../controls/dialog":"cFWm","../controls/dropdown":"Uyrp","../controls/group":"Q3hf","../controls/signal":"OWDI","../language":"hk5u","../version":"RvaL"}],"dSzJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotEditor = void 0;

var _base = require("../base");

var _dialog = require("../controls/dialog");

var _canvas = require("../canvas");

var _sanddanceReact = require("@msrvida/sanddance-react");

var _language = require("../language");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _SnapshotEditor(props) {
  var __SnapshotEditor =
  /*#__PURE__*/
  function (_base$react$Component) {
    _inherits(__SnapshotEditor, _base$react$Component);

    function __SnapshotEditor(props) {
      var _this;

      _classCallCheck(this, __SnapshotEditor);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(__SnapshotEditor).call(this, props));
      _this.state = {
        showEditFormDialog: false,
        title: '',
        description: '',
        image: null,
        bgColor: null,
        insight: null,
        editIndex: -1
      };
      return _this;
    }

    _createClass(__SnapshotEditor, [{
      key: "resize",
      value: function resize(src, thumbWidth) {
        var _this2 = this;

        if (!src) return;
        var img = new Image();

        img.onload = function () {
          var canvas = document.createElement('canvas'),
              ctx = canvas.getContext('2d');
          var ratio = img.width / thumbWidth;
          canvas.height = img.height / ratio;
          canvas.width = thumbWidth;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          var image = canvas.toDataURL();

          _this2.setState({
            image: image
          });
        };

        img.src = src;
      }
    }, {
      key: "editSnapshot",
      value: function editSnapshot(snapshot) {
        var _this3 = this;

        var editIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

        if (snapshot) {
          this.setState(Object.assign(Object.assign({
            showEditFormDialog: true
          }, snapshot), {
            editIndex: editIndex
          }));
        } else {
          var signalValues = this.props.explorer.viewer.getSignalValues();
          this.props.explorer.viewer.deselect().then(function () {
            var canvas = (0, _canvas.getCanvas)(_this3.props.explorer.viewer);
            var bgColor = canvas && window.getComputedStyle(canvas).backgroundColor;

            var insight = _sanddanceReact.SandDance.VegaDeckGl.util.clone(_this3.props.explorer.viewer.getInsight());

            delete insight.size;
            insight.signalValues = signalValues;
            var title = _this3.props.getTitle && _this3.props.getTitle(insight) || '';
            var description = _this3.props.getDescription && _this3.props.getDescription(insight) || '';

            _this3.setState({
              showEditFormDialog: true,
              bgColor: bgColor,
              title: title,
              description: description,
              insight: insight,
              image: null,
              editIndex: editIndex
            }); //allow deselection to render


            setTimeout(function () {
              _this3.props.explorer.viewer.presenter.canvasToDataURL().then(function (dataUrl) {
                _this3.resize(dataUrl, _this3.props.explorer.snapshotThumbWidth);
              });
            }, 500);
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        return _base.base.react.createElement(_dialog.Dialog, {
          modalProps: {
            className: _sanddanceReact.util.classList('sanddance-snapshot-dialog', this.props.theme)
          },
          minWidth: "".concat(this.props.explorer.snapshotThumbWidth + 64, "px"),
          hidden: !this.state.showEditFormDialog,
          onDismiss: function onDismiss() {
            return _this4.setState({
              showEditFormDialog: false
            });
          },
          title: this.state.editIndex >= 0 ? _language.strings.buttonEditSnapshot : _language.strings.buttonCreateSnapshot,
          buttons: _base.base.react.createElement(_base.base.fluentUI.PrimaryButton, {
            disabled: !this.state.image || !this.state.title,
            key: 0,
            onClick: function onClick(e) {
              var snapshot = {
                title: _this4.state.title,
                description: _this4.state.description,
                insight: _this4.state.insight,
                image: _this4.state.image,
                bgColor: _this4.state.bgColor
              };
              _this4.props.modifySnapShot && _this4.props.modifySnapShot(snapshot);

              _this4.props.onWriteSnapshot(snapshot, _this4.state.editIndex);

              _this4.setState({
                showEditFormDialog: false,
                title: '',
                description: '',
                image: null
              });
            },
            iconProps: {
              iconName: 'Camera'
            },
            text: this.state.editIndex >= 0 ? _language.strings.buttonUpdateSnapshot : _language.strings.buttonCreateSnapshot
          })
        }, _base.base.react.createElement(_base.base.fluentUI.TextField, {
          label: _language.strings.labelSnapshotTitle,
          onChange: function onChange(e, title) {
            return _this4.setState({
              title: title
            });
          },
          value: this.state.title
        }), _base.base.react.createElement(_base.base.fluentUI.TextField, {
          label: _language.strings.labelSnapshotDescription,
          onChange: function onChange(e, description) {
            return _this4.setState({
              description: description
            });
          },
          value: this.state.description,
          multiline: true
        }), _base.base.react.createElement("div", {
          className: 'thumbnail'
        }, !this.state.image && _base.base.react.createElement(_base.base.fluentUI.Spinner, null), this.state.image && _base.base.react.createElement("img", {
          src: this.state.image,
          style: {
            backgroundColor: this.state.bgColor
          }
        })), this.props.explorer.viewer && this.props.explorer.viewer.colorContexts && this.props.explorer.viewer.colorContexts.length > 1 && _base.base.react.createElement("div", null, _language.strings.labelColorFilter));
      }
    }]);

    return __SnapshotEditor;
  }(_base.base.react.Component);

  return new __SnapshotEditor(props);
}

var SnapshotEditor = _SnapshotEditor;
exports.SnapshotEditor = SnapshotEditor;
},{"../base":"Vlbn","../controls/dialog":"cFWm","../canvas":"Dryx","@msrvida/sanddance-react":"MjKu","../language":"hk5u"}],"dQNc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconButton = IconButton;

var _base = require("../base");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function IconButton(props) {
  return _base.base.react.createElement(_base.base.fluentUI.IconButton, Object.assign({}, props, {
    styles: {
      root: {
        color: props.themePalette.black
      },
      rootHovered: {
        background: 'transparent',
        color: props.themePalette.themePrimary
      },
      rootPressed: {
        background: 'transparent'
      },
      menuIcon: {
        display: 'none'
      }
    },
    iconProps: {
      iconName: props.iconName
    },
    menuProps: props.menuProps
  }));
}
},{"../base":"Vlbn"}],"oc9r":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snapshots = void 0;

var _base = require("../base");

var _dialog = require("../controls/dialog");

var _group = require("../controls/group");

var _iconButton = require("../controls/iconButton");

var _sanddanceReact = require("@msrvida/sanddance-react");

var _language = require("../language");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _Snapshots(props) {
  var __Snapshots =
  /*#__PURE__*/
  function (_base$react$Component) {
    _inherits(__Snapshots, _base$react$Component);

    function __Snapshots(props) {
      var _this;

      _classCallCheck(this, __Snapshots);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(__Snapshots).call(this, props));
      _this.state = {
        confirmation: null,
        title: '',
        description: '',
        image: null,
        bgColor: null,
        insight: null
      };
      return _this;
    }

    _createClass(__Snapshots, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var items = [{
          key: 'clear',
          text: _language.strings.buttonClearSnapshots,
          onClick: function onClick() {
            return _this2.setState({
              confirmation: {
                buttonText: _language.strings.buttonClearSnapshots,
                handler: function handler() {
                  return _this2.props.onClearSnapshots();
                }
              }
            });
          },
          disabled: this.props.snapshots.length === 0
        }];

        if (this.props.getTopActions) {
          items.push.apply(items, this.props.getTopActions(this.props.snapshots));
        }

        return _base.base.react.createElement(_group.Group, {
          className: "sanddance-snapshots",
          label: _language.strings.labelSnapshots
        }, _base.base.react.createElement("div", null, _base.base.react.createElement(_base.base.fluentUI.PrimaryButton, {
          text: _language.strings.buttonCreateSnapshot,
          onClick: function onClick(e) {
            return _this2.props.editor.editSnapshot();
          },
          split: true,
          menuProps: {
            items: items
          }
        }), this.props.getChildren && this.props.getChildren(this.props.snapshots), this.state.confirmation && _base.base.react.createElement(_dialog.Dialog, {
          hidden: false,
          buttons: _base.base.react.createElement(_base.base.fluentUI.PrimaryButton, {
            key: 0,
            onClick: function onClick(e) {
              _this2.setState({
                confirmation: null
              });

              _this2.state.confirmation.handler();
            },
            iconProps: {
              iconName: 'Delete'
            },
            text: this.state.confirmation.buttonText
          }),
          onDismiss: function onDismiss() {
            return _this2.setState({
              confirmation: null
            });
          }
        }, _language.strings.labelConfirmation), _base.base.react.createElement("div", null, this.props.snapshots.map(function (snapshot, i) {
          var actions = _this2.props.getActions && _this2.props.getActions(snapshot, i) || [];
          actions.push({
            iconButtonProps: {
              themePalette: _this2.props.themePalette,
              title: _language.strings.buttonEditSnapshot,
              onClick: function onClick(e) {
                return _this2.props.editor.editSnapshot(snapshot, i);
              },
              iconName: 'Edit'
            }
          });

          if (_this2.props.snapshots.length > 1) {
            actions.push({
              iconButtonProps: {
                disabled: i === 0,
                themePalette: _this2.props.themePalette,
                title: _language.strings.buttonMoveUp,
                onClick: function onClick(e) {
                  return _this2.props.onMoveUp(i);
                },
                iconName: 'SortUp'
              }
            }, {
              iconButtonProps: {
                disabled: i > _this2.props.snapshots.length - 2,
                themePalette: _this2.props.themePalette,
                title: _language.strings.buttonMoveDown,
                onClick: function onClick(e) {
                  return _this2.props.onMoveDown(i);
                },
                iconName: 'SortDown'
              }
            });
          }

          actions.push({
            iconButtonProps: {
              themePalette: _this2.props.themePalette,
              title: _language.strings.buttonDeleteSnapshot,
              onClick: function onClick() {
                return _this2.setState({
                  confirmation: {
                    buttonText: _language.strings.buttonDeleteSnapshot,
                    handler: function handler() {
                      return _this2.props.onRemoveSnapshot(i);
                    }
                  }
                });
              },
              iconName: 'Delete'
            }
          });
          return _base.base.react.createElement("div", {
            key: i,
            className: _sanddanceReact.util.classList('snapshot', i === _this2.props.selectedSnapshotIndex && 'selected')
          }, _base.base.react.createElement("div", {
            onClick: function onClick(e) {
              return _this2.props.onSnapshotClick(snapshot, i);
            }
          }, _base.base.react.createElement("div", {
            className: 'title'
          }, snapshot.title), _base.base.react.createElement("div", {
            className: 'thumbnail'
          }, _base.base.react.createElement("img", {
            title: snapshot.description,
            src: snapshot.image,
            style: {
              backgroundColor: snapshot.bgColor
            }
          }))), _base.base.react.createElement(Actions, {
            actions: actions,
            snapshot: snapshot
          }));
        }))));
      }
    }]);

    return __Snapshots;
  }(_base.base.react.Component);

  return new __Snapshots(props);
}

var Snapshots = _Snapshots;
exports.Snapshots = Snapshots;

function Actions(props) {
  return _base.base.react.createElement("div", {
    className: "actions"
  }, props.actions.map(function (action, i) {
    if (action.iconButtonProps) {
      return _base.base.react.createElement(_iconButton.IconButton, Object.assign({
        key: i
      }, action.iconButtonProps));
    }

    if (action.element) {
      return action.element;
    }
  }));
}
},{"../base":"Vlbn","../controls/dialog":"cFWm","../controls/group":"Q3hf","../controls/iconButton":"dQNc","@msrvida/sanddance-react":"MjKu","../language":"hk5u"}],"E67y":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyColorButtons = applyColorButtons;

var _base = require("./base");

var _iconButton = require("./controls/iconButton");

var _sanddanceReact = require("@msrvida/sanddance-react");

var _language = require("./language");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var className = 'sanddance-panel-tools';

function ensureToolbar(panel) {
  var existing = panel.getElementsByClassName(className);

  if (existing.length > 0) {
    return existing[0];
  } else {
    var div = _sanddanceReact.SandDance.VegaDeckGl.util.addDiv(panel, className);

    panel.insertAdjacentElement('afterbegin', div);
    return div;
  }
}

function applyColorButtons(presenter, showLegend, props) {
  var panel = presenter.getElement(_sanddanceReact.SandDance.VegaDeckGl.PresenterElement.panel);
  var div = ensureToolbar(panel);

  _base.base.reactDOM.render(ColorMap(props), div);

  panel.style.display = showLegend ? '' : 'none';
}

function ColorMap(props) {
  var menuProps = {
    items: [{
      key: 'new',
      text: _language.strings.buttonColorSchemeRemap,
      disabled: !props.canRemap || props.isRemap,
      onClick: function onClick() {
        return props.colorMapHandler(true);
      }
    }, {
      key: 'old',
      text: _language.strings.buttonColorSchemeKeep,
      disabled: !props.canRemap || !props.isRemap,
      onClick: function onClick() {
        return props.colorMapHandler(false);
      }
    }]
  };
  return _base.base.react.createElement("div", null, _base.base.react.createElement(_iconButton.IconButton, {
    themePalette: props.themePalette,
    title: _language.strings.buttonColorSchemeMap,
    onClick: null,
    iconName: props.canRemap ? 'FiltersSolid' : 'Filters',
    menuProps: menuProps
  }));
}
},{"./base":"Vlbn","./controls/iconButton":"dQNc","@msrvida/sanddance-react":"MjKu","./language":"hk5u"}],"L8O2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bestColorScheme = bestColorScheme;

function bestColorScheme(newColumn, oldColumn, oldScheme) {
  if (oldColumn && oldColumn.quantitative === newColumn.quantitative && defaultColorScheme(oldColumn) === defaultColorScheme(newColumn)) {
    return oldScheme;
  }

  return defaultColorScheme(newColumn);
}

function defaultColorScheme(c) {
  if (c.quantitative) {
    return 'redyellowgreen';
  } else if (c.stats.distinctValueCount === 2) {
    return 'dual_redgreen';
  } else if (c.stats.distinctValueCount <= 10) {
    return 'category10';
  }

  return 'category20';
}
},{}],"ENdt":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxCategoricalColors = 20;
var Recommender = /** @class */ (function () {
    function Recommender(columns, data) {
    }
    return Recommender;
}());
exports.Recommender = Recommender;
function defaultColorScheme(c) {
    if (c.quantitative) {
        return 'redyellowgreen';
    }
    else if (c.stats.distinctValueCount === 2) {
        return 'dual_redgreen';
    }
    else if (c.stats.distinctValueCount <= 10) {
        return 'category10';
    }
    return 'category20';
}
exports.defaultColorScheme = defaultColorScheme;

},{}],"oxgd":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recommender_1 = require("./recommender");
var maxDistinctVal = 20;
var minDistinctVal = 2;
var BarChartRecommenderSummary = /** @class */ (function () {
    function BarChartRecommenderSummary(columns, data) {
        var score = -1;
        for (var i = 0; i < columns.length; i++) {
            var recommendation = new BarChartRecommender(columns[i], data).recommend();
            if (recommendation.score > score) {
                this.best = recommendation;
                score = recommendation.score;
            }
            if (score === 1)
                break;
        }
        for (var k = 0; k < columns.length; k++) {
            var column = columns[k];
            if (column.name === this.best.columns.x || column.stats.isSequential)
                continue;
            if (column.quantitative || (column.stats.distinctValueCount < recommender_1.maxCategoricalColors && column.stats.distinctValueCount > 1)) {
                this.best.columns.color = this.best.columns.sort = column.name;
                this.best.scheme = recommender_1.defaultColorScheme(column);
                if (column.quantitative) {
                    this.best.colorBin = 'quantile';
                }
                break;
            }
        }
    }
    BarChartRecommenderSummary.prototype.recommend = function () {
        return this.best;
    };
    return BarChartRecommenderSummary;
}());
exports.BarChartRecommenderSummary = BarChartRecommenderSummary;
var BarChartRecommender = /** @class */ (function () {
    function BarChartRecommender(column, data) {
        this.score = 0;
        this.column = column;
        //the total score for bar chart is 1
        this.rules = [
            function (column) {
                if (column.stats.isSequential)
                    return false;
                else if (column.quantitative) {
                    return true;
                }
                else if (!column.quantitative && column.stats.distinctValueCount <= maxDistinctVal && column.stats.distinctValueCount >= minDistinctVal) {
                    return true;
                }
                else {
                    return false;
                }
            }
        ];
        for (var i = 0; i < this.rules.length; i++) {
            if (this.rules[i](column))
                this.score++;
        }
    }
    BarChartRecommender.prototype.recommend = function () {
        var rec = {
            chart: 'barchart',
            columns: {
                x: this.column.name
            },
            score: this.score,
            scheme: undefined,
            view: '2d'
        };
        return rec;
    };
    return BarChartRecommender;
}());
exports.BarChartRecommender = BarChartRecommender;

},{"./recommender":"ENdt"}],"O4ew":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: languages other than english
var longitudeNames = ['lon', 'long', 'longitude'];
var latitudeNames = ['lat', 'latitude'];
function isSpec(names, limits, column, data) {
    var is = false;
    var cname = column.name.toLowerCase();
    for (var i = 0; i < names.length; i++) {
        if (names[i] === cname) {
            is = true;
            break;
        }
    }
    if (data) {
        //TODO: spin through data to see if it is within limits
    }
    return is;
}
function isLongitude(column, data) {
    return isSpec(longitudeNames, [-180, 180], column, data);
}
exports.isLongitude = isLongitude;
function isLatitude(column, data) {
    return isSpec(latitudeNames, [-90, 90], column, data);
}
exports.isLatitude = isLatitude;
function isGeo(column, data) {
    return isLatitude(column, data) || isLongitude(column, data);
}
exports.isGeo = isGeo;

},{}],"iBe2":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recommender_1 = require("./recommender");
var geo_1 = require("./geo");
var ScatterPlotRecommenderSummary = /** @class */ (function () {
    function ScatterPlotRecommenderSummary(columns, data) {
        var rec = {
            chart: 'scatterplot',
            score: undefined,
            columns: {},
            scheme: undefined,
            view: '2d'
        };
        columns.forEach(function (column) {
            if (!rec.columns.x) {
                if (column.name.toLowerCase() === 'x') {
                    return rec.columns.x = column.name;
                }
                else if (geo_1.isLongitude(column)) {
                    return rec.columns.x = column.name;
                }
            }
            if (!rec.columns.y) {
                if (column.name.toLowerCase() === 'y') {
                    return rec.columns.y = column.name;
                }
                else if (geo_1.isLatitude(column)) {
                    return rec.columns.y = column.name;
                }
            }
            if (!rec.columns.color && !column.stats.isSequential) {
                if (column.quantitative || column.stats.distinctValueCount < recommender_1.maxCategoricalColors) {
                    rec.columns.color = rec.columns.sort = column.name;
                    rec.scheme = recommender_1.defaultColorScheme(column);
                    if (column.quantitative) {
                        rec.colorBin = 'quantile';
                    }
                    return;
                }
            }
        });
        if (rec.columns.x && rec.columns.y) {
            this.best = rec;
        }
    }
    ScatterPlotRecommenderSummary.prototype.recommend = function () {
        return this.best;
    };
    return ScatterPlotRecommenderSummary;
}());
exports.ScatterPlotRecommenderSummary = ScatterPlotRecommenderSummary;

},{"./recommender":"ENdt","./geo":"O4ew"}],"At4q":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var geo_1 = require("./geo");
function preferredColumnForTreemapSize(columns, strict) {
    for (var i = 0; i < columns.length; i++) {
        var c = columns[i];
        if (c.quantitative) {
            if (strict && c.stats.hasNegative)
                continue;
            if (strict && c.stats.isSequential)
                continue;
            if (strict && geo_1.isGeo(c))
                continue;
            return c.name;
        }
    }
}
exports.preferredColumnForTreemapSize = preferredColumnForTreemapSize;

},{"./geo":"O4ew"}],"fB3P":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var barChart_1 = require("./barChart");
var scatterPlot_1 = require("./scatterPlot");
var RecommenderSummary = /** @class */ (function () {
    function RecommenderSummary(columns, data) {
        var quickRec = new scatterPlot_1.ScatterPlotRecommenderSummary(columns, data).recommend();
        if (quickRec) {
            this.rec = quickRec;
        }
        else {
            var barChartrec = new barChart_1.BarChartRecommenderSummary(columns, data).recommend();
            if (barChartrec && barChartrec.score >= 1) {
                this.rec = barChartrec;
            }
            else {
                this.rec = {
                    chart: 'grid',
                    columns: {},
                    score: 1
                };
            }
        }
    }
    RecommenderSummary.prototype.recommend = function () {
        return this.rec;
    };
    return RecommenderSummary;
}());
exports.RecommenderSummary = RecommenderSummary;

},{"./barChart":"oxgd","./scatterPlot":"iBe2"}],"i6UQ":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
__export(require("./barChart"));
__export(require("./geo"));
__export(require("./scatterPlot"));
__export(require("./treemap"));
__export(require("./recommenderSummary"));

},{"./barChart":"oxgd","./geo":"O4ew","./scatterPlot":"iBe2","./treemap":"At4q","./recommenderSummary":"fB3P"}],"f8v0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureColumnsExist = ensureColumnsExist;
exports.ensureColumnsPopulated = ensureColumnsPopulated;

var _chartRecommender = require("@msrvida/chart-recommender");

var _sanddanceReact = require("@msrvida/sanddance-react");

var _language = require("./language");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function ensureColumnsExist(insightColumns, actualColumns, transform) {
  var _loop = function _loop(role) {
    var columnName = insightColumns[role];
    var column = actualColumns.filter(function (c) {
      return c.name === columnName;
    })[0];
    var transformColumn = transform ? transform.filter(function (t) {
      switch (t.type) {
        case 'formula':
          {
            return t.as === columnName;
          }
      }
    })[0] : null;

    if (!(column || transformColumn)) {
      delete insightColumns[role];
    }
  };

  //ensure columns exist
  for (var role in insightColumns) {
    _loop(role);
  }
}

function ensureColumnsPopulated(chart, insightColumns, actualColumns) {
  //ensure columns are populated
  var nonInternal = actualColumns.filter(function (c) {
    return !_sanddanceReact.SandDance.util.isInternalFieldName(c.name);
  });
  var firstColumn = nonInternal[0];
  var firstColumnName = firstColumn && firstColumn.name;
  var firstQuantitative = nonInternal.filter(function (c) {
    return c.quantitative;
  })[0];
  var firstQuantitativeColumnName = firstQuantitative && firstQuantitative.name;

  var ensureColumn = function ensureColumn(role, quantitative) {
    if (!insightColumns[role]) {
      insightColumns[role] = quantitative ? firstQuantitativeColumnName : firstColumnName;
    }
  };

  switch (chart) {
    case 'barchart':
    case 'barchartV':
      ensureColumn('x');
      ensureColumn('size', true);
      break;

    case 'barchartH':
      ensureColumn('y');
      ensureColumn('size', true);
      break;

    case 'density':
      ensureColumn('x');
      ensureColumn('y');
      ensureColumn('size', true);
      break;

    case 'scatterplot':
    case 'stacks':
      ensureColumn('x');
      ensureColumn('y');
      break;

    case 'treemap':
      if (!insightColumns.size) {
        insightColumns.size = (0, _chartRecommender.preferredColumnForTreemapSize)(actualColumns, true);

        if (!insightColumns.size) {
          insightColumns.size = (0, _chartRecommender.preferredColumnForTreemapSize)(actualColumns, false);
        }
      }

      if (!insightColumns.size) {
        //error - no numeric column
        return [_language.strings.errorColumnMustBeNumeric];
      }

      break;
  }
}
},{"@msrvida/chart-recommender":"i6UQ","@msrvida/sanddance-react":"MjKu","./language":"hk5u"}],"fiGR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].
function _default(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity

  var i,
      coefficient = x.slice(0, i); // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).

  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
}
},{}],"G46r":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _formatDecimal = _interopRequireDefault(require("./formatDecimal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(x) {
  return x = (0, _formatDecimal.default)(Math.abs(x)), x ? x[1] : NaN;
}
},{"./formatDecimal.js":"fiGR"}],"CupU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(grouping, thousands) {
  return function (value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}
},{}],"mUgz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(numerals) {
  return function (value) {
    return value.replace(/[0-9]/g, function (i) {
      return numerals[+i];
    });
  };
}
},{}],"Nf4q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatSpecifier;
exports.FormatSpecifier = FormatSpecifier;
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier.prototype.toString = function () {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
},{}],"sIkL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function _default(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;

      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;

      default:
        if (!+s[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }

  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}
},{}],"WMxc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.prefixExponent = void 0;

var _formatDecimal = _interopRequireDefault(require("./formatDecimal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixExponent;
exports.prefixExponent = prefixExponent;

function _default(x, p) {
  var d = (0, _formatDecimal.default)(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (exports.prefixExponent = prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + (0, _formatDecimal.default)(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}
},{"./formatDecimal.js":"fiGR"}],"gMFS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _formatDecimal = _interopRequireDefault(require("./formatDecimal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(x, p) {
  var d = (0, _formatDecimal.default)(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}
},{"./formatDecimal.js":"fiGR"}],"w40g":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formatPrefixAuto = _interopRequireDefault(require("./formatPrefixAuto.js"));

var _formatRounded = _interopRequireDefault(require("./formatRounded.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  "%": function (x, p) {
    return (x * 100).toFixed(p);
  },
  "b": function (x) {
    return Math.round(x).toString(2);
  },
  "c": function (x) {
    return x + "";
  },
  "d": function (x) {
    return Math.round(x).toString(10);
  },
  "e": function (x, p) {
    return x.toExponential(p);
  },
  "f": function (x, p) {
    return x.toFixed(p);
  },
  "g": function (x, p) {
    return x.toPrecision(p);
  },
  "o": function (x) {
    return Math.round(x).toString(8);
  },
  "p": function (x, p) {
    return (0, _formatRounded.default)(x * 100, p);
  },
  "r": _formatRounded.default,
  "s": _formatPrefixAuto.default,
  "X": function (x) {
    return Math.round(x).toString(16).toUpperCase();
  },
  "x": function (x) {
    return Math.round(x).toString(16);
  }
};
exports.default = _default;
},{"./formatPrefixAuto.js":"WMxc","./formatRounded.js":"gMFS"}],"Ecm4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return x;
}
},{}],"Iakc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _exponent = _interopRequireDefault(require("./exponent.js"));

var _formatGroup = _interopRequireDefault(require("./formatGroup.js"));

var _formatNumerals = _interopRequireDefault(require("./formatNumerals.js"));

var _formatSpecifier = _interopRequireDefault(require("./formatSpecifier.js"));

var _formatTrim = _interopRequireDefault(require("./formatTrim.js"));

var _formatTypes = _interopRequireDefault(require("./formatTypes.js"));

var _formatPrefixAuto = require("./formatPrefixAuto.js");

var _identity = _interopRequireDefault(require("./identity.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = Array.prototype.map,
    prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

function _default(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? _identity.default : (0, _formatGroup.default)(map.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? _identity.default : (0, _formatNumerals.default)(map.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "-" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

  function newFormat(specifier) {
    specifier = (0, _formatSpecifier.default)(specifier);
    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type; // The "n" type is an alias for ",g".

    if (type === "n") comma = true, type = "g"; // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!_formatTypes.default[type]) precision === undefined && (precision = 12), trim = true, type = "g"; // If zero fill is specified, padding goes after sign and before digits.

    if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "="; // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.

    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : ""; // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?

    var formatType = _formatTypes.default[type],
        maybeSuffix = /[defgprs%]/.test(type); // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].

    precision = precision === undefined ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i,
          n,
          c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value; // Determine the sign. -0 is not less than 0, but 1 / -0 is!

        var valueNegative = value < 0 || 1 / value < 0; // Perform the initial formatting.

        value = isNaN(value) ? nan : formatType(Math.abs(value), precision); // Trim insignificant zeros.

        if (trim) value = (0, _formatTrim.default)(value); // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.

        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false; // Compute the prefix and suffix.

        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + _formatPrefixAuto.prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : ""); // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.

        if (maybeSuffix) {
          i = -1, n = value.length;

          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      } // If the fill character is not "0", grouping is applied before padding.


      if (comma && !zero) value = group(value, Infinity); // Compute the padding.

      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : ""; // If the fill character is "0", grouping is applied after padding.

      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = ""; // Reconstruct the final output based on the desired alignment.

      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;

        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;

        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;

        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }

      return numerals(value);
    }

    format.toString = function () {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = (0, _formatSpecifier.default)(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor((0, _exponent.default)(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function (value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}
},{"./exponent.js":"G46r","./formatGroup.js":"CupU","./formatNumerals.js":"mUgz","./formatSpecifier.js":"Nf4q","./formatTrim.js":"sIkL","./formatTypes.js":"w40g","./formatPrefixAuto.js":"WMxc","./identity.js":"Ecm4"}],"VIed":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultLocale;
exports.formatPrefix = exports.format = void 0;

var _locale = _interopRequireDefault(require("./locale.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locale;
var format;
exports.format = format;
var formatPrefix;
exports.formatPrefix = formatPrefix;
defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-"
});

function defaultLocale(definition) {
  locale = (0, _locale.default)(definition);
  exports.format = format = locale.format;
  exports.formatPrefix = formatPrefix = locale.formatPrefix;
  return locale;
}
},{"./locale.js":"Iakc"}],"cTEw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _exponent = _interopRequireDefault(require("./exponent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(step) {
  return Math.max(0, -(0, _exponent.default)(Math.abs(step)));
}
},{"./exponent.js":"G46r"}],"aFxy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _exponent = _interopRequireDefault(require("./exponent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor((0, _exponent.default)(value) / 3))) * 3 - (0, _exponent.default)(Math.abs(step)));
}
},{"./exponent.js":"G46r"}],"we8G":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _exponent = _interopRequireDefault(require("./exponent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, (0, _exponent.default)(max) - (0, _exponent.default)(step)) + 1;
}
},{"./exponent.js":"G46r"}],"SA6z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "formatDefaultLocale", {
  enumerable: true,
  get: function () {
    return _defaultLocale.default;
  }
});
Object.defineProperty(exports, "format", {
  enumerable: true,
  get: function () {
    return _defaultLocale.format;
  }
});
Object.defineProperty(exports, "formatPrefix", {
  enumerable: true,
  get: function () {
    return _defaultLocale.formatPrefix;
  }
});
Object.defineProperty(exports, "formatLocale", {
  enumerable: true,
  get: function () {
    return _locale.default;
  }
});
Object.defineProperty(exports, "formatSpecifier", {
  enumerable: true,
  get: function () {
    return _formatSpecifier.default;
  }
});
Object.defineProperty(exports, "FormatSpecifier", {
  enumerable: true,
  get: function () {
    return _formatSpecifier.FormatSpecifier;
  }
});
Object.defineProperty(exports, "precisionFixed", {
  enumerable: true,
  get: function () {
    return _precisionFixed.default;
  }
});
Object.defineProperty(exports, "precisionPrefix", {
  enumerable: true,
  get: function () {
    return _precisionPrefix.default;
  }
});
Object.defineProperty(exports, "precisionRound", {
  enumerable: true,
  get: function () {
    return _precisionRound.default;
  }
});

var _defaultLocale = _interopRequireWildcard(require("./defaultLocale.js"));

var _locale = _interopRequireDefault(require("./locale.js"));

var _formatSpecifier = _interopRequireWildcard(require("./formatSpecifier.js"));

var _precisionFixed = _interopRequireDefault(require("./precisionFixed.js"));

var _precisionPrefix = _interopRequireDefault(require("./precisionPrefix.js"));

var _precisionRound = _interopRequireDefault(require("./precisionRound.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./defaultLocale.js":"VIed","./locale.js":"Iakc","./formatSpecifier.js":"Nf4q","./precisionFixed.js":"cTEw","./precisionPrefix.js":"aFxy","./precisionRound.js":"we8G"}],"OsNT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataScope = DataScope;
exports.DataScopeId = void 0;

var _button = require("./button");

var _base = require("../base");

var _language = require("../language");

var _sanddanceReact = require("@msrvida/sanddance-react");

var _d3Format = require("d3-format");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var DataScopeId;
exports.DataScopeId = DataScopeId;

(function (DataScopeId) {
  DataScopeId[DataScopeId["AllData"] = 0] = "AllData";
  DataScopeId[DataScopeId["SelectedData"] = 1] = "SelectedData";
  DataScopeId[DataScopeId["FilteredData"] = 2] = "FilteredData";
})(DataScopeId || (exports.DataScopeId = DataScopeId = {}));

var shortFormat = (0, _d3Format.format)('.2~s');

function short(n) {
  return n === -1 ? '--' : n ? n < 1000 ? n.toString() : shortFormat(n) : '0';
}

function DataScope(props) {
  var dataCount = Object.assign({
    all: -1,
    filtered: -1,
    selected: -1
  }, props.dataCount);
  return props.compact ? _base.base.react.createElement("div", {
    className: _sanddanceReact.util.classList('sanddance-datascope', 'compact'),
    onClick: props.onCompactClick
  }, _base.base.react.createElement(Compact, Object.assign({}, props, {
    dataScopeId: DataScopeId.AllData,
    text: _language.strings.selectDataSpanAll,
    count: dataCount.all
  })), _base.base.react.createElement(Compact, Object.assign({}, props, {
    dataScopeId: DataScopeId.FilteredData,
    text: _language.strings.selectDataSpanFilter,
    count: dataCount.filtered
  })), _base.base.react.createElement(Compact, Object.assign({}, props, {
    dataScopeId: DataScopeId.SelectedData,
    text: _language.strings.selectDataSpanSelection,
    count: dataCount.selected
  }))) : _base.base.react.createElement("div", {
    className: _sanddanceReact.util.classList('sanddance-datascope', 'extended', props.active && 'active')
  }, _base.base.react.createElement("div", null, _base.base.react.createElement("div", null, props.dataSet), _base.base.react.createElement("div", {
    className: "datascope-buttons"
  }, _base.base.react.createElement(DataScopeButton, Object.assign({}, props, {
    dataScopeId: DataScopeId.AllData,
    text: _language.strings.selectDataSpanAll,
    count: dataCount.all
  })), _base.base.react.createElement(DataScopeButton, Object.assign({}, props, {
    dataScopeId: DataScopeId.FilteredData,
    text: _language.strings.selectDataSpanFilter,
    count: dataCount.filtered
  })), _base.base.react.createElement(DataScopeButton, Object.assign({}, props, {
    dataScopeId: DataScopeId.SelectedData,
    text: _language.strings.selectDataSpanSelection,
    count: dataCount.selected
  })))));
}

function Compact(props) {
  return _base.base.react.createElement("div", {
    title: props.text,
    onClick: function onClick() {
      props.onDataScopeClick(props.dataScopeId);
    }
  }, short(props.count));
}

function DataScopeButton(props) {
  return _base.base.react.createElement(_button.Button, {
    themePalette: props.themePalette,
    className: _sanddanceReact.util.classList('datascope-button', props.selectedDataScope === props.dataScopeId && 'selected'),
    disabled: props.disabled,
    text: props.text,
    onClick: function onClick() {
      props.onDataScopeClick(props.dataScopeId);
    },
    onRenderText: function onRenderText() {
      return _base.base.react.createElement("div", {
        title: props.count > 0 ? props.count.toString() : ''
      }, _base.base.react.createElement("label", null, props.text), _base.base.react.createElement("div", null, short(props.count)));
    },
    onRenderIcon: function onRenderIcon() {
      return null;
    }
  });
}
},{"./button":"eqtW","../base":"Vlbn","../language":"hk5u","@msrvida/sanddance-react":"MjKu","d3-format":"SA6z"}],"GuKX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scrollable = Scrollable;

var _base = require("../base");

var _sanddanceReact = require("@msrvida/sanddance-react");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function Scrollable(props) {
  return _base.base.react.createElement("div", {
    className: _sanddanceReact.util.classList('scrollable-container', props.className),
    role: props.role
  }, _base.base.react.createElement("div", {
    className: "scrollable"
  }, props.children));
}
},{"../base":"Vlbn","@msrvida/sanddance-react":"MjKu"}],"h2T5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SideTabId = void 0;
var SideTabId;
exports.SideTabId = SideTabId;

(function (SideTabId) {
  SideTabId[SideTabId["ChartType"] = 0] = "ChartType";
  SideTabId[SideTabId["Data"] = 1] = "Data";
  SideTabId[SideTabId["Search"] = 2] = "Search";
  SideTabId[SideTabId["Color"] = 3] = "Color";
  SideTabId[SideTabId["Snapshots"] = 4] = "Snapshots";
  SideTabId[SideTabId["History"] = 5] = "History";
  SideTabId[SideTabId["Settings"] = 6] = "Settings";
  SideTabId[SideTabId["Pin"] = 7] = "Pin";
  SideTabId[SideTabId["Collapse"] = 8] = "Collapse";
})(SideTabId || (exports.SideTabId = SideTabId = {}));
},{}],"f8Jx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = Sidebar;
exports.Sidebutton = Sidebutton;

var _base = require("../base");

var _dataScope = require("./dataScope");

var _iconButton = require("./iconButton");

var _scrollable = require("./scrollable");

var _interfaces = require("../interfaces");

var _language = require("../language");

var _sanddanceReact = require("@msrvida/sanddance-react");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function Sidebar(props) {
  var sidebuttons = [{
    sideTabId: _interfaces.SideTabId.ChartType,
    iconName: 'BIDashboard',
    title: _language.strings.labelChart
  }, {
    sideTabId: _interfaces.SideTabId.Color,
    iconName: 'Color',
    title: _language.strings.labelColor
  }, {
    sideTabId: _interfaces.SideTabId.Data,
    iconName: 'Table',
    title: _language.strings.labelDataBrowser
  }, {
    sideTabId: _interfaces.SideTabId.Search,
    iconName: 'Search',
    title: _language.strings.labelSearch
  }, {
    sideTabId: _interfaces.SideTabId.Snapshots,
    iconName: 'Camera',
    title: _language.strings.labelSnapshots
  }, {
    sideTabId: _interfaces.SideTabId.History,
    iconName: 'History',
    title: _language.strings.labelHistory
  }, {
    sideTabId: _interfaces.SideTabId.Settings,
    iconName: 'Settings',
    title: _language.strings.labelChartSettings
  }];
  return _base.base.react.createElement("div", {
    className: _sanddanceReact.util.classList('sanddance-sidebar', 'calculator', props.pinned && 'pinned', props.closed && 'closed')
  }, _base.base.react.createElement("div", {
    className: "sidebar-content"
  }, _base.base.react.createElement(_dataScope.DataScope, Object.assign({}, props.dataScopeProps)), _base.base.react.createElement("div", {
    className: "vbuttons",
    role: 'tablist'
  }, _base.base.react.createElement("div", {
    className: "sidebar-dialogs"
  }, sidebuttons.map(function (sidebutton, i) {
    return _base.base.react.createElement(Sidebutton, Object.assign({
      key: i
    }, props, sidebutton, {
      themePalette: props.themePalette
    }));
  })), !props.hideSidebarControls && _base.base.react.createElement("div", {
    className: "sidebar-controls"
  }, _base.base.react.createElement(Sidebutton, Object.assign({}, props, {
    sideTabId: _interfaces.SideTabId.Pin,
    iconName: props.pinned ? 'Pinned' : 'Pin',
    title: props.pinned ? _language.strings.buttonToolbarFloat : _language.strings.buttonToolbarDock
  })), _base.base.react.createElement(Sidebutton, Object.assign({}, props, {
    sideTabId: _interfaces.SideTabId.Collapse,
    iconName: props.closed ? 'DoubleChevronRight12' : 'DoubleChevronLeft12',
    title: props.closed ? _language.strings.buttonToolbarShow : _language.strings.buttonToolbarHide
  })))), _base.base.react.createElement(_scrollable.Scrollable, {
    role: 'tabpanel'
  }, _base.base.react.createElement("div", {
    className: "sidetab"
  }, props.children)), props.calculating && _base.base.react.createElement("div", {
    className: "calculating"
  }, _base.base.react.createElement(_base.base.fluentUI.Spinner, {
    size: _base.base.fluentUI.SpinnerSize.large
  }))));
}

function Sidebutton(props) {
  var selected = !props.closed && props.selectedSideTab === props.sideTabId;
  return _base.base.react.createElement("div", {
    className: _sanddanceReact.util.classList('vbutton', selected && 'selected'),
    role: 'tab',
    "aria-selected": selected
  }, props.badgeText && _base.base.react.createElement("div", {
    className: "count"
  }, props.badgeText), _base.base.react.createElement(_iconButton.IconButton, {
    themePalette: props.themePalette,
    className: "vbutton",
    iconName: props.iconName,
    title: props.title,
    onClick: function onClick() {
      props.onSideTabClick(props.sideTabId);
    }
  }));
}
},{"../base":"Vlbn","./dataScope":"OsNT","./iconButton":"dQNc","./scrollable":"GuKX","../interfaces":"h2T5","../language":"hk5u","@msrvida/sanddance-react":"MjKu"}],"hH4t":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandBarButtonStyles = void 0;

var _base = require("../base");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CommandBarButtonStyles = function CommandBarButtonStyles(props) {
  var theme = props.theme;

  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }

  var palette = theme.palette,
      semanticColors = theme.semanticColors;
  var BUTTON_ICON_CLASSNAME = '.ms-Button-icon';
  return {
    root: [Object.assign({}, _base.base.fluentUI.getFocusStyle(theme, {
      inset: 2
    })), {
      backgroundColor: palette.white
    }],
    rootHovered: {
      backgroundColor: palette.neutralLighter,
      selectors: _defineProperty({}, BUTTON_ICON_CLASSNAME, {
        color: palette.themeDarkAlt
      })
    },
    rootPressed: {
      backgroundColor: palette.neutralLight,
      color: palette.neutralDark,
      selectors: _defineProperty({}, BUTTON_ICON_CLASSNAME, {
        color: palette.themeDark
      })
    },
    rootChecked: {
      backgroundColor: palette.neutralLight,
      color: palette.neutralDark,
      selectors: _defineProperty({}, BUTTON_ICON_CLASSNAME, {
        color: palette.themeDark
      })
    },
    rootCheckedHovered: {
      backgroundColor: palette.neutralQuaternaryAlt,
      color: palette.neutralDark
    },
    rootExpanded: {
      color: palette.neutralDark,
      backgroundColor: palette.neutralLight,
      selectors: _defineProperty({}, BUTTON_ICON_CLASSNAME, {
        color: palette.themeDark
      })
    },
    rootExpandedHovered: {
      background: palette.neutralQuaternaryAlt
    },
    rootDisabled: {
      backgroundColor: palette.white,
      selectors: _defineProperty({}, BUTTON_ICON_CLASSNAME, {
        color: semanticColors.disabledBodySubtext
      })
    },
    splitButtonMenuButton: {
      backgroundColor: palette.white,
      color: palette.neutralSecondary,
      selectors: {
        ':hover': {
          backgroundColor: palette.neutralLighter,
          selectors: _defineProperty({}, BUTTON_ICON_CLASSNAME, {
            color: palette.neutralPrimary
          })
        },
        ':active': {
          backgroundColor: palette.neutralLight,
          selectors: _defineProperty({}, BUTTON_ICON_CLASSNAME, {
            color: palette.neutralPrimary
          })
        }
      }
    },
    splitButtonMenuButtonDisabled: {
      backgroundColor: palette.white
    },
    icon: {
      color: palette.themePrimary
    }
  };
};

exports.CommandBarButtonStyles = CommandBarButtonStyles;
},{"../base":"Vlbn"}],"GBuN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logo = Logo;

var _base = require("../base");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var s = "\n ......\n.......\n...\n......\n ......\n    ...\n.......\n......\n";
var d = s.split('\n').map(function (row, irow) {
  return row.length ? row.split('').map(function (char, icol) {
    return char.trim() ? "M".concat(2 * icol + 1, " ").concat(2 * (irow - 1) + 1, " v1 h1 v-1 Z") : '';
  }).join(' ') : '';
}).join('\n');

function Logo() {
  return _base.base.react.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16"
  }, _base.base.react.createElement("path", {
    d: d
  }));
}
},{"../base":"Vlbn"}],"Afi9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Topbar = Topbar;

var _CommandBarButton = require("./CommandBarButton.styles");

var _logo = require("./logo");

var _base = require("../base");

var _language = require("../language");

var _sanddanceReact = require("@msrvida/sanddance-react");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function Topbar(props) {
  var zeroResults = props.selectionState.selectedData && props.selectionState.selectedData.length === 0;
  var disabled = !props.loaded;
  var items = [{
    key: 'undo',
    name: _language.strings.buttonUndo,
    iconProps: {
      iconName: 'Undo'
    },
    disabled: disabled || props.historyItems.length === 0 || props.historyIndex === 0,
    onClick: props.undo
  }, {
    key: 'redo',
    name: _language.strings.buttonRedo,
    iconProps: {
      iconName: 'Redo'
    },
    disabled: disabled || props.historyItems.length <= 1 || props.historyIndex >= props.historyItems.length - 1,
    onClick: props.redo
  }, {
    key: 'deselect',
    name: _language.strings.buttonDeselect,
    iconProps: {
      iconName: 'Cancel'
    },
    disabled: disabled || !props.selectionSearch,
    onClick: props.doDeselect
  }, {
    key: 'isolate',
    name: _language.strings.buttonIsolate,
    iconProps: {
      iconName: 'Filter'
    },
    disabled: disabled || !props.selectionSearch || zeroResults,
    onClick: function onClick() {
      return props.doFilter(props.selectionSearch, _language.strings.labelHistoryFilterIsolate);
    }
  }, {
    key: 'exclude',
    name: _language.strings.buttonExclude,
    iconProps: {
      iconName: 'ClearFilter'
    },
    disabled: disabled || !props.selectionSearch || zeroResults,
    onClick: function onClick() {
      return props.doFilter(_sanddanceReact.SandDance.searchExpression.invert(props.selectionSearch), _language.strings.labelHistoryFilterIExclude);
    }
  }, {
    key: 'reset',
    name: _language.strings.buttonReset,
    iconProps: {
      iconName: 'RemoveFilter'
    },
    disabled: disabled || !props.filter,
    onClick: function onClick() {
      return props.doUnfilter(_language.strings.labelHistoryFilterClear);
    }
  }];

  if (props.buttons) {
    items.push.apply(items, props.buttons);
  }

  if (props.collapseLabels) {
    items.forEach(function (item) {
      return item.iconOnly = true;
    });
  }

  var farItems = [{
    key: 'previous-snapshot',
    iconProps: {
      iconName: 'Previous'
    },
    title: _language.strings.buttonPrevSnapshot,
    onClick: props.onSnapshotPreviousClick,
    disabled: props.snapshots.length < 2
  }, {
    key: 'snapshot',
    iconProps: {
      iconName: 'Camera'
    },
    title: _language.strings.buttonCreateSnapshot,
    onClick: props.onSnapshotClick,
    disabled: !props.loaded
  }, {
    key: 'next-snapshot',
    iconProps: {
      iconName: 'Next'
    },
    title: _language.strings.buttonNextSnapshot,
    onClick: props.onSnapshotNextClick,
    disabled: props.snapshots.length < 2
  }, {
    key: 'view',
    iconProps: {
      iconName: props.view === '2d' ? 'CubeShape' : 'Page'
    },
    title: props.view === '2d' ? _language.strings.labelViewType3d : _language.strings.labelViewType2d,
    onClick: props.onViewClick,
    disabled: !props.loaded
  }, {
    key: 'home',
    iconProps: {
      iconName: 'PicturePosition'
    },
    title: _language.strings.buttonCameraHome,
    onClick: props.onHomeClick,
    disabled: !props.loaded
  }];
  return _base.base.react.createElement("div", {
    className: "sanddance-explorer-topbar"
  }, _base.base.react.createElement("div", {
    className: "logo"
  }, _base.base.react.createElement(_logo.Logo, null), _base.base.react.createElement("a", {
    href: props.logoClickUrl || '/',
    target: props.logoClickTarget || '_blank'
  }, _language.strings.appName)), _base.base.react.createElement("div", {
    className: "sanddance-explorer-commandbar"
  }, _base.base.react.createElement(_base.base.fluentUI.Customizer, {
    scopedSettings: {
      CommandBarButton: {
        styles: function styles(buttonProps) {
          buttonProps.theme.palette = props.themePalette;
          return (0, _CommandBarButton.CommandBarButtonStyles)(buttonProps);
        }
      }
    }
  }, _base.base.react.createElement(_base.base.fluentUI.CommandBar, {
    items: items,
    farItems: farItems,
    styles: {
      root: {
        backgroundColor: 'transparent',
        height: 'unset',
        paddingLeft: 0,
        paddingRight: 0
      }
    }
  }))));
}
},{"./CommandBarButton.styles":"hH4t","./logo":"GBuN","../base":"Vlbn","../language":"hk5u","@msrvida/sanddance-react":"MjKu"}],"f19h":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadDataArray = exports.loadDataFile = void 0;

var _sanddanceReact = require("@msrvida/sanddance-react");

var loadDataFile = function loadDataFile(dataFile) {
  return new Promise(function (resolve, reject) {
    var vega = _sanddanceReact.SandDance.VegaDeckGl.base.vega;
    var loader = vega.loader();

    function handleRawText(text) {
      var data;

      try {
        data = vega.read(text, {
          type: dataFile.type,
          parse: {}
        });
      } catch (e) {
        reject(e);
      }

      if (data) {
        loadDataArray(data, dataFile.type).then(function (dc) {
          if (dataFile.snapshotsUrl) {
            fetch(dataFile.snapshotsUrl).then(function (response) {
              return response.json();
            }).then(function (snapshots) {
              dc.snapshots = snapshots;
              resolve(dc);
            }).catch(reject);
          } else if (dataFile.snapshots) {
            dc.snapshots = dataFile.snapshots;
            resolve(dc);
          } else {
            resolve(dc);
          }
        }).catch(reject);
      }
    }

    if (dataFile.dataUrl) {
      loader.load(dataFile.dataUrl).then(handleRawText).catch(reject);
    } else if (dataFile.rawText) {
      handleRawText(dataFile.rawText);
    } else {
      reject('dataFile object must have either dataUrl or rawText property set.');
    }
  });
};

exports.loadDataFile = loadDataFile;

var loadDataArray = function loadDataArray(data, type) {
  return new Promise(function (resolve, reject) {
    var parse = type === 'csv' || type === 'tsv';

    if (parse) {
      //convert empty strings to null so that vega.inferType will get dates
      data.forEach(function (row) {
        for (var column in row) {
          if (row[column] === '') {
            row[column] = null;
          }
        }
      });
    }

    var columns = _sanddanceReact.SandDance.util.getColumnsFromData(_sanddanceReact.SandDance.VegaDeckGl.base.vega.inferTypes, data).filter(function (c) {
      return c.name && c.name.trim();
    }).sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });

    if (parse) {
      var booleanColumns = columns.filter(function (c) {
        return c.type === 'boolean';
      });
      var dateColumns = columns.filter(function (c) {
        return c.type === 'date';
      });
      var numericColumns = columns.filter(function (c) {
        return c.type === 'integer' || c.type === 'number';
      });
      data.forEach(function (obj) {
        booleanColumns.forEach(function (c) {
          obj[c.name] = ('' + obj[c.name]).toLowerCase() === 'true';
        });
        dateColumns.forEach(function (c) {
          var input = obj[c.name];

          if (input !== null) {
            var d = new Date(input);
            d.input = input;
            obj[c.name] = d;
          }
        });
        numericColumns.forEach(function (c) {
          var n = parseFloat(obj[c.name]);
          obj[c.name] = isNaN(n) ? null : n;
        });
      });
    }

    resolve({
      data: data,
      columns: columns
    });
  });
};

exports.loadDataArray = loadDataArray;
},{"@msrvida/sanddance-react":"MjKu"}],"CgE3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColorSettingsFromThemePalette = getColorSettingsFromThemePalette;
exports.themePalettes = void 0;
var themePalettes = {};
exports.themePalettes = themePalettes;
themePalettes[''] = {
  themePrimary: '#0078d4',
  themeLighterAlt: '#eff6fc',
  themeLighter: '#deecf9',
  themeLight: '#c7e0f4',
  themeTertiary: '#71afe5',
  themeSecondary: '#2b88d8',
  themeDarkAlt: '#106ebe',
  themeDark: '#005a9e',
  themeDarker: '#004578',
  neutralLighterAlt: '#f8f8f8',
  neutralLighter: '#f4f4f4',
  neutralLight: '#eaeaea',
  neutralQuaternaryAlt: '#dadada',
  neutralQuaternary: '#d0d0d0',
  neutralTertiaryAlt: '#c8c8c8',
  neutralTertiary: '#c2c2c2',
  neutralSecondary: '#858585',
  neutralPrimaryAlt: '#4b4b4b',
  neutralPrimary: '#333333',
  neutralDark: '#272727',
  black: '#1d1d1d',
  white: '#ffffff'
};
themePalettes['dark-theme'] = {
  themePrimary: '#00b4f0',
  themeLighterAlt: '#00070a',
  themeLighter: '#001d26',
  themeLight: '#003648',
  themeTertiary: '#006c90',
  themeSecondary: '#009ed3',
  themeDarkAlt: '#18bbf1',
  themeDark: '#3ac5f3',
  themeDarker: '#6cd4f6',
  neutralLighterAlt: '#0b0b0b',
  neutralLighter: '#151515',
  neutralLight: '#252525',
  neutralQuaternaryAlt: '#2f2f2f',
  neutralQuaternary: '#373737',
  neutralTertiaryAlt: '#595959',
  neutralTertiary: '#929292',
  neutralSecondary: '#a7a7a7',
  neutralPrimaryAlt: '#b4b4b4',
  neutralPrimary: '#cccccc',
  neutralDark: '#d8d8d8',
  black: '#f5f5f5',
  white: '#000000'
};

function getColorSettingsFromThemePalette(themePalette) {
  return {
    axisLine: themePalette.black,
    axisText: themePalette.black,
    hoveredCube: themePalette.black,
    clickableText: themePalette.themeDark,
    clickableTextHighlight: themePalette.themeSecondary,
    searchText: themePalette.neutralPrimary,
    searchTextHighlight: themePalette.neutralPrimaryAlt
  };
}
},{}],"Tl9z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.snapshotThumbWidth = exports.defaultViewerOptions = exports.fontFamily = void 0;

var _themes = require("./themes");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var fontFamily = 'Segoe UI, sans-serif';
exports.fontFamily = fontFamily;
var defaultViewerOptions = {
  colors: (0, _themes.getColorSettingsFromThemePalette)(_themes.themePalettes['']),
  fontFamily: fontFamily
};
exports.defaultViewerOptions = defaultViewerOptions;
var snapshotThumbWidth = 300;
exports.snapshotThumbWidth = snapshotThumbWidth;
},{"./themes":"CgE3"}],"BSWy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemeOption = schemeOption;
exports.schemesJSX = void 0;

function schemeOption(selected, scheme) {
  return {
    key: scheme,
    text: scheme,
    selected: selected === scheme,
    scheme: scheme,
    children: schemesJSX[scheme]
  };
}

var schemesJSX = {};
exports.schemesJSX = schemesJSX;
},{}],"JrIT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categorical = categorical;

var _base = require("../base");

var _scheme = require("./scheme");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var p8 = "".concat(100 / 8, "%");
var p9 = "".concat(100 / 9, "%");
var p10 = "".concat(100 / 10, "%");
var p12 = "".concat(100 / 12, "%");
var p20 = "".concat(100 / 20, "%");
var loaded = false;

function load() {
  _scheme.schemesJSX['accent'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#7fc97f",
    style: {
      width: p8,
      background: 'rgb(127, 201, 127)'
    }
  }), _base.base.react.createElement("div", {
    title: "#beaed4",
    style: {
      width: p8,
      background: 'rgb(190, 174, 212)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fdc086",
    style: {
      width: p8,
      background: 'rgb(253, 192, 134)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ffff99",
    style: {
      width: p8,
      background: 'rgb(255, 255, 153)'
    }
  }), _base.base.react.createElement("div", {
    title: "#386cb0",
    style: {
      width: p8,
      background: 'rgb(56, 108, 176)'
    }
  }), _base.base.react.createElement("div", {
    title: "#f0027f",
    style: {
      width: p8,
      background: 'rgb(240, 2, 127)'
    }
  }), _base.base.react.createElement("div", {
    title: "#bf5b17",
    style: {
      width: p8,
      background: 'rgb(191, 91, 23)'
    }
  }), _base.base.react.createElement("div", {
    title: "#666666",
    style: {
      width: p8,
      background: 'rgb(102, 102, 102)'
    }
  }));
  _scheme.schemesJSX['category10'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#1f77b4",
    style: {
      width: p10,
      background: 'rgb(31, 119, 180)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ff7f0e",
    style: {
      width: p10,
      background: 'rgb(255, 127, 14)'
    }
  }), _base.base.react.createElement("div", {
    title: "#2ca02c",
    style: {
      width: p10,
      background: 'rgb(44, 160, 44)'
    }
  }), _base.base.react.createElement("div", {
    title: "#d62728",
    style: {
      width: p10,
      background: 'rgb(214, 39, 40)'
    }
  }), _base.base.react.createElement("div", {
    title: "#9467bd",
    style: {
      width: p10,
      background: 'rgb(148, 103, 189)'
    }
  }), _base.base.react.createElement("div", {
    title: "#8c564b",
    style: {
      width: p10,
      background: 'rgb(140, 86, 75)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e377c2",
    style: {
      width: p10,
      background: 'rgb(227, 119, 194)'
    }
  }), _base.base.react.createElement("div", {
    title: "#7f7f7f",
    style: {
      width: p10,
      background: 'rgb(127, 127, 127)'
    }
  }), _base.base.react.createElement("div", {
    title: "#bcbd22",
    style: {
      width: p10,
      background: 'rgb(188, 189, 34)'
    }
  }), _base.base.react.createElement("div", {
    title: "#17becf",
    style: {
      width: p10,
      background: 'rgb(23, 190, 207)'
    }
  }));
  _scheme.schemesJSX['category20'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#1f77b4",
    style: {
      width: p20,
      background: 'rgb(31, 119, 180)'
    }
  }), _base.base.react.createElement("div", {
    title: "#aec7e8",
    style: {
      width: p20,
      background: 'rgb(174, 199, 232)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ff7f0e",
    style: {
      width: p20,
      background: 'rgb(255, 127, 14)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ffbb78",
    style: {
      width: p20,
      background: 'rgb(255, 187, 120)'
    }
  }), _base.base.react.createElement("div", {
    title: "#2ca02c",
    style: {
      width: p20,
      background: 'rgb(44, 160, 44)'
    }
  }), _base.base.react.createElement("div", {
    title: "#98df8a",
    style: {
      width: p20,
      background: 'rgb(152, 223, 138)'
    }
  }), _base.base.react.createElement("div", {
    title: "#d62728",
    style: {
      width: p20,
      background: 'rgb(214, 39, 40)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ff9896",
    style: {
      width: p20,
      background: 'rgb(255, 152, 150)'
    }
  }), _base.base.react.createElement("div", {
    title: "#9467bd",
    style: {
      width: p20,
      background: 'rgb(148, 103, 189)'
    }
  }), _base.base.react.createElement("div", {
    title: "#c5b0d5",
    style: {
      width: p20,
      background: 'rgb(197, 176, 213)'
    }
  }), _base.base.react.createElement("div", {
    title: "#8c564b",
    style: {
      width: p20,
      background: 'rgb(140, 86, 75)'
    }
  }), _base.base.react.createElement("div", {
    title: "#c49c94",
    style: {
      width: p20,
      background: 'rgb(196, 156, 148)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e377c2",
    style: {
      width: p20,
      background: 'rgb(227, 119, 194)'
    }
  }), _base.base.react.createElement("div", {
    title: "#f7b6d2",
    style: {
      width: p20,
      background: 'rgb(247, 182, 210)'
    }
  }), _base.base.react.createElement("div", {
    title: "#7f7f7f",
    style: {
      width: p20,
      background: 'rgb(127, 127, 127)'
    }
  }), _base.base.react.createElement("div", {
    title: "#c7c7c7",
    style: {
      width: p20,
      background: 'rgb(199, 199, 199)'
    }
  }), _base.base.react.createElement("div", {
    title: "#bcbd22",
    style: {
      width: p20,
      background: 'rgb(188, 189, 34)'
    }
  }), _base.base.react.createElement("div", {
    title: "#dbdb8d",
    style: {
      width: p20,
      background: 'rgb(219, 219, 141)'
    }
  }), _base.base.react.createElement("div", {
    title: "#17becf",
    style: {
      width: p20,
      background: 'rgb(23, 190, 207)'
    }
  }), _base.base.react.createElement("div", {
    title: "#9edae5",
    style: {
      width: p20,
      background: 'rgb(158, 218, 229)'
    }
  }));
  _scheme.schemesJSX['category20b'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#393b79",
    style: {
      width: p20,
      background: 'rgb(57, 59, 121)'
    }
  }), _base.base.react.createElement("div", {
    title: "#5254a3",
    style: {
      width: p20,
      background: 'rgb(82, 84, 163)'
    }
  }), _base.base.react.createElement("div", {
    title: "#6b6ecf",
    style: {
      width: p20,
      background: 'rgb(107, 110, 207)'
    }
  }), _base.base.react.createElement("div", {
    title: "#9c9ede",
    style: {
      width: p20,
      background: 'rgb(156, 158, 222)'
    }
  }), _base.base.react.createElement("div", {
    title: "#637939",
    style: {
      width: p20,
      background: 'rgb(99, 121, 57)'
    }
  }), _base.base.react.createElement("div", {
    title: "#8ca252",
    style: {
      width: p20,
      background: 'rgb(140, 162, 82)'
    }
  }), _base.base.react.createElement("div", {
    title: "#b5cf6b",
    style: {
      width: p20,
      background: 'rgb(181, 207, 107)'
    }
  }), _base.base.react.createElement("div", {
    title: "#cedb9c",
    style: {
      width: p20,
      background: 'rgb(206, 219, 156)'
    }
  }), _base.base.react.createElement("div", {
    title: "#8c6d31",
    style: {
      width: p20,
      background: 'rgb(140, 109, 49)'
    }
  }), _base.base.react.createElement("div", {
    title: "#bd9e39",
    style: {
      width: p20,
      background: 'rgb(189, 158, 57)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e7ba52",
    style: {
      width: p20,
      background: 'rgb(231, 186, 82)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e7cb94",
    style: {
      width: p20,
      background: 'rgb(231, 203, 148)'
    }
  }), _base.base.react.createElement("div", {
    title: "#843c39",
    style: {
      width: p20,
      background: 'rgb(132, 60, 57)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ad494a",
    style: {
      width: p20,
      background: 'rgb(173, 73, 74)'
    }
  }), _base.base.react.createElement("div", {
    title: "#d6616b",
    style: {
      width: p20,
      background: 'rgb(214, 97, 107)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e7969c",
    style: {
      width: p20,
      background: 'rgb(231, 150, 156)'
    }
  }), _base.base.react.createElement("div", {
    title: "#7b4173",
    style: {
      width: p20,
      background: 'rgb(123, 65, 115)'
    }
  }), _base.base.react.createElement("div", {
    title: "#a55194",
    style: {
      width: p20,
      background: 'rgb(165, 81, 148)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ce6dbd",
    style: {
      width: p20,
      background: 'rgb(206, 109, 189)'
    }
  }), _base.base.react.createElement("div", {
    title: "#de9ed6",
    style: {
      width: p20,
      background: 'rgb(222, 158, 214)'
    }
  }));
  _scheme.schemesJSX['category20c'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#3182bd",
    style: {
      width: p20,
      background: 'rgb(49, 130, 189)'
    }
  }), _base.base.react.createElement("div", {
    title: "#6baed6",
    style: {
      width: p20,
      background: 'rgb(107, 174, 214)'
    }
  }), _base.base.react.createElement("div", {
    title: "#9ecae1",
    style: {
      width: p20,
      background: 'rgb(158, 202, 225)'
    }
  }), _base.base.react.createElement("div", {
    title: "#c6dbef",
    style: {
      width: p20,
      background: 'rgb(198, 219, 239)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e6550d",
    style: {
      width: p20,
      background: 'rgb(230, 85, 13)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fd8d3c",
    style: {
      width: p20,
      background: 'rgb(253, 141, 60)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fdae6b",
    style: {
      width: p20,
      background: 'rgb(253, 174, 107)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fdd0a2",
    style: {
      width: p20,
      background: 'rgb(253, 208, 162)'
    }
  }), _base.base.react.createElement("div", {
    title: "#31a354",
    style: {
      width: p20,
      background: 'rgb(49, 163, 84)'
    }
  }), _base.base.react.createElement("div", {
    title: "#74c476",
    style: {
      width: p20,
      background: 'rgb(116, 196, 118)'
    }
  }), _base.base.react.createElement("div", {
    title: "#a1d99b",
    style: {
      width: p20,
      background: 'rgb(161, 217, 155)'
    }
  }), _base.base.react.createElement("div", {
    title: "#c7e9c0",
    style: {
      width: p20,
      background: 'rgb(199, 233, 192)'
    }
  }), _base.base.react.createElement("div", {
    title: "#756bb1",
    style: {
      width: p20,
      background: 'rgb(117, 107, 177)'
    }
  }), _base.base.react.createElement("div", {
    title: "#9e9ac8",
    style: {
      width: p20,
      background: 'rgb(158, 154, 200)'
    }
  }), _base.base.react.createElement("div", {
    title: "#bcbddc",
    style: {
      width: p20,
      background: 'rgb(188, 189, 220)'
    }
  }), _base.base.react.createElement("div", {
    title: "#dadaeb",
    style: {
      width: p20,
      background: 'rgb(218, 218, 235)'
    }
  }), _base.base.react.createElement("div", {
    title: "#636363",
    style: {
      width: p20,
      background: 'rgb(99, 99, 99)'
    }
  }), _base.base.react.createElement("div", {
    title: "#969696",
    style: {
      width: p20,
      background: 'rgb(150, 150, 150)'
    }
  }), _base.base.react.createElement("div", {
    title: "#bdbdbd",
    style: {
      width: p20,
      background: 'rgb(189, 189, 189)'
    }
  }), _base.base.react.createElement("div", {
    title: "#d9d9d9",
    style: {
      width: p20,
      background: 'rgb(217, 217, 217)'
    }
  }));
  _scheme.schemesJSX['dark2'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#1b9e77",
    style: {
      width: p8,
      background: 'rgb(27, 158, 119)'
    }
  }), _base.base.react.createElement("div", {
    title: "#d95f02",
    style: {
      width: p8,
      background: 'rgb(217, 95, 2)'
    }
  }), _base.base.react.createElement("div", {
    title: "#7570b3",
    style: {
      width: p8,
      background: 'rgb(117, 112, 179)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e7298a",
    style: {
      width: p8,
      background: 'rgb(231, 41, 138)'
    }
  }), _base.base.react.createElement("div", {
    title: "#66a61e",
    style: {
      width: p8,
      background: 'rgb(102, 166, 30)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e6ab02",
    style: {
      width: p8,
      background: 'rgb(230, 171, 2)'
    }
  }), _base.base.react.createElement("div", {
    title: "#a6761d",
    style: {
      width: p8,
      background: 'rgb(166, 118, 29)'
    }
  }), _base.base.react.createElement("div", {
    title: "#666666",
    style: {
      width: p8,
      background: 'rgb(102, 102, 102)'
    }
  }));
  _scheme.schemesJSX['paired'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#a6cee3",
    style: {
      width: p12,
      background: 'rgb(166, 206, 227)'
    }
  }), _base.base.react.createElement("div", {
    title: "#1f78b4",
    style: {
      width: p12,
      background: 'rgb(31, 120, 180)'
    }
  }), _base.base.react.createElement("div", {
    title: "#b2df8a",
    style: {
      width: p12,
      background: 'rgb(178, 223, 138)'
    }
  }), _base.base.react.createElement("div", {
    title: "#33a02c",
    style: {
      width: p12,
      background: 'rgb(51, 160, 44)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fb9a99",
    style: {
      width: p12,
      background: 'rgb(251, 154, 153)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e31a1c",
    style: {
      width: p12,
      background: 'rgb(227, 26, 28)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fdbf6f",
    style: {
      width: p12,
      background: 'rgb(253, 191, 111)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ff7f00",
    style: {
      width: p12,
      background: 'rgb(255, 127, 0)'
    }
  }), _base.base.react.createElement("div", {
    title: "#cab2d6",
    style: {
      width: p12,
      background: 'rgb(202, 178, 214)'
    }
  }), _base.base.react.createElement("div", {
    title: "#6a3d9a",
    style: {
      width: p12,
      background: 'rgb(106, 61, 154)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ffff99",
    style: {
      width: p12,
      background: 'rgb(255, 255, 153)'
    }
  }), _base.base.react.createElement("div", {
    title: "#b15928",
    style: {
      width: p12,
      background: 'rgb(177, 89, 40)'
    }
  }));
  _scheme.schemesJSX['pastel1'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#fbb4ae",
    style: {
      width: p9,
      background: 'rgb(251, 180, 174)'
    }
  }), _base.base.react.createElement("div", {
    title: "#b3cde3",
    style: {
      width: p9,
      background: 'rgb(179, 205, 227)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ccebc5",
    style: {
      width: p9,
      background: 'rgb(204, 235, 197)'
    }
  }), _base.base.react.createElement("div", {
    title: "#decbe4",
    style: {
      width: p9,
      background: 'rgb(222, 203, 228)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fed9a6",
    style: {
      width: p9,
      background: 'rgb(254, 217, 166)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ffffcc",
    style: {
      width: p9,
      background: 'rgb(255, 255, 204)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e5d8bd",
    style: {
      width: p9,
      background: 'rgb(229, 216, 189)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fddaec",
    style: {
      width: p9,
      background: 'rgb(253, 218, 236)'
    }
  }), _base.base.react.createElement("div", {
    title: "#f2f2f2",
    style: {
      width: p9,
      background: 'rgb(242, 242, 242)'
    }
  }));
  _scheme.schemesJSX['pastel2'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#b3e2cd",
    style: {
      width: p8,
      background: 'rgb(179, 226, 205)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fdcdac",
    style: {
      width: p8,
      background: 'rgb(253, 205, 172)'
    }
  }), _base.base.react.createElement("div", {
    title: "#cbd5e8",
    style: {
      width: p8,
      background: 'rgb(203, 213, 232)'
    }
  }), _base.base.react.createElement("div", {
    title: "#f4cae4",
    style: {
      width: p8,
      background: 'rgb(244, 202, 228)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e6f5c9",
    style: {
      width: p8,
      background: 'rgb(230, 245, 201)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fff2ae",
    style: {
      width: p8,
      background: 'rgb(255, 242, 174)'
    }
  }), _base.base.react.createElement("div", {
    title: "#f1e2cc",
    style: {
      width: p8,
      background: 'rgb(241, 226, 204)'
    }
  }), _base.base.react.createElement("div", {
    title: "#cccccc",
    style: {
      width: p8,
      background: 'rgb(204, 204, 204)'
    }
  }));
  _scheme.schemesJSX['set1'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#e41a1c",
    style: {
      width: p9,
      background: 'rgb(228, 26, 28)'
    }
  }), _base.base.react.createElement("div", {
    title: "#377eb8",
    style: {
      width: p9,
      background: 'rgb(55, 126, 184)'
    }
  }), _base.base.react.createElement("div", {
    title: "#4daf4a",
    style: {
      width: p9,
      background: 'rgb(77, 175, 74)'
    }
  }), _base.base.react.createElement("div", {
    title: "#984ea3",
    style: {
      width: p9,
      background: 'rgb(152, 78, 163)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ff7f00",
    style: {
      width: p9,
      background: 'rgb(255, 127, 0)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ffff33",
    style: {
      width: p9,
      background: 'rgb(255, 255, 51)'
    }
  }), _base.base.react.createElement("div", {
    title: "#a65628",
    style: {
      width: p9,
      background: 'rgb(166, 86, 40)'
    }
  }), _base.base.react.createElement("div", {
    title: "#f781bf",
    style: {
      width: p9,
      background: 'rgb(247, 129, 191)'
    }
  }), _base.base.react.createElement("div", {
    title: "#999999",
    style: {
      width: p9,
      background: 'rgb(153, 153, 153)'
    }
  }));
  _scheme.schemesJSX['set2'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#66c2a5",
    style: {
      width: p8,
      background: 'rgb(102, 194, 165)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fc8d62",
    style: {
      width: p8,
      background: 'rgb(252, 141, 98)'
    }
  }), _base.base.react.createElement("div", {
    title: "#8da0cb",
    style: {
      width: p8,
      background: 'rgb(141, 160, 203)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e78ac3",
    style: {
      width: p8,
      background: 'rgb(231, 138, 195)'
    }
  }), _base.base.react.createElement("div", {
    title: "#a6d854",
    style: {
      width: p8,
      background: 'rgb(166, 216, 84)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ffd92f",
    style: {
      width: p8,
      background: 'rgb(255, 217, 47)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e5c494",
    style: {
      width: p8,
      background: 'rgb(229, 196, 148)'
    }
  }), _base.base.react.createElement("div", {
    title: "#b3b3b3",
    style: {
      width: p8,
      background: 'rgb(179, 179, 179)'
    }
  }));
  _scheme.schemesJSX['set3'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#8dd3c7",
    style: {
      width: p12,
      background: 'rgb(141, 211, 199)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ffffb3",
    style: {
      width: p12,
      background: 'rgb(255, 255, 179)'
    }
  }), _base.base.react.createElement("div", {
    title: "#bebada",
    style: {
      width: p12,
      background: 'rgb(190, 186, 218)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fb8072",
    style: {
      width: p12,
      background: 'rgb(251, 128, 114)'
    }
  }), _base.base.react.createElement("div", {
    title: "#80b1d3",
    style: {
      width: p12,
      background: 'rgb(128, 177, 211)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fdb462",
    style: {
      width: p12,
      background: 'rgb(253, 180, 98)'
    }
  }), _base.base.react.createElement("div", {
    title: "#b3de69",
    style: {
      width: p12,
      background: 'rgb(179, 222, 105)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fccde5",
    style: {
      width: p12,
      background: 'rgb(252, 205, 229)'
    }
  }), _base.base.react.createElement("div", {
    title: "#d9d9d9",
    style: {
      width: p12,
      background: 'rgb(217, 217, 217)'
    }
  }), _base.base.react.createElement("div", {
    title: "#bc80bd",
    style: {
      width: p12,
      background: 'rgb(188, 128, 189)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ccebc5",
    style: {
      width: p12,
      background: 'rgb(204, 235, 197)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ffed6f",
    style: {
      width: p12,
      background: 'rgb(255, 237, 111)'
    }
  }));
  _scheme.schemesJSX['tableau10'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#4c78a8",
    style: {
      width: p10,
      background: 'rgb(76, 120, 168)'
    }
  }), _base.base.react.createElement("div", {
    title: "#f58518",
    style: {
      width: p10,
      background: 'rgb(245, 133, 24)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e45756",
    style: {
      width: p10,
      background: 'rgb(228, 87, 86)'
    }
  }), _base.base.react.createElement("div", {
    title: "#72b7b2",
    style: {
      width: p10,
      background: 'rgb(114, 183, 178)'
    }
  }), _base.base.react.createElement("div", {
    title: "#54a24b",
    style: {
      width: p10,
      background: 'rgb(84, 162, 75)'
    }
  }), _base.base.react.createElement("div", {
    title: "#eeca3b",
    style: {
      width: p10,
      background: 'rgb(238, 202, 59)'
    }
  }), _base.base.react.createElement("div", {
    title: "#b279a2",
    style: {
      width: p10,
      background: 'rgb(178, 121, 162)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ff9da6",
    style: {
      width: p10,
      background: 'rgb(255, 157, 166)'
    }
  }), _base.base.react.createElement("div", {
    title: "#9d755d",
    style: {
      width: p10,
      background: 'rgb(157, 117, 93)'
    }
  }), _base.base.react.createElement("div", {
    title: "#bab0ac",
    style: {
      width: p10,
      background: 'rgb(186, 176, 172)'
    }
  }));
  _scheme.schemesJSX['tableau20'] = _base.base.react.createElement("div", {
    className: "swatch"
  }, _base.base.react.createElement("div", {
    title: "#4c78a8",
    style: {
      width: p20,
      background: 'rgb(76, 120, 168)'
    }
  }), _base.base.react.createElement("div", {
    title: "#9ecae9",
    style: {
      width: p20,
      background: 'rgb(158, 202, 233)'
    }
  }), _base.base.react.createElement("div", {
    title: "#f58518",
    style: {
      width: p20,
      background: 'rgb(245, 133, 24)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ffbf79",
    style: {
      width: p20,
      background: 'rgb(255, 191, 121)'
    }
  }), _base.base.react.createElement("div", {
    title: "#54a24b",
    style: {
      width: p20,
      background: 'rgb(84, 162, 75)'
    }
  }), _base.base.react.createElement("div", {
    title: "#88d27a",
    style: {
      width: p20,
      background: 'rgb(136, 210, 122)'
    }
  }), _base.base.react.createElement("div", {
    title: "#b79a20",
    style: {
      width: p20,
      background: 'rgb(183, 154, 32)'
    }
  }), _base.base.react.createElement("div", {
    title: "#f2cf5b",
    style: {
      width: p20,
      background: 'rgb(242, 207, 91)'
    }
  }), _base.base.react.createElement("div", {
    title: "#439894",
    style: {
      width: p20,
      background: 'rgb(67, 152, 148)'
    }
  }), _base.base.react.createElement("div", {
    title: "#83bcb6",
    style: {
      width: p20,
      background: 'rgb(131, 188, 182)'
    }
  }), _base.base.react.createElement("div", {
    title: "#e45756",
    style: {
      width: p20,
      background: 'rgb(228, 87, 86)'
    }
  }), _base.base.react.createElement("div", {
    title: "#ff9d98",
    style: {
      width: p20,
      background: 'rgb(255, 157, 152)'
    }
  }), _base.base.react.createElement("div", {
    title: "#79706e",
    style: {
      width: p20,
      background: 'rgb(121, 112, 110)'
    }
  }), _base.base.react.createElement("div", {
    title: "#bab0ac",
    style: {
      width: p20,
      background: 'rgb(186, 176, 172)'
    }
  }), _base.base.react.createElement("div", {
    title: "#d67195",
    style: {
      width: p20,
      background: 'rgb(214, 113, 149)'
    }
  }), _base.base.react.createElement("div", {
    title: "#fcbfd2",
    style: {
      width: p20,
      background: 'rgb(252, 191, 210)'
    }
  }), _base.base.react.createElement("div", {
    title: "#b279a2",
    style: {
      width: p20,
      background: 'rgb(178, 121, 162)'
    }
  }), _base.base.react.createElement("div", {
    title: "#d6a5c9",
    style: {
      width: p20,
      background: 'rgb(214, 165, 201)'
    }
  }), _base.base.react.createElement("div", {
    title: "#9e765f",
    style: {
      width: p20,
      background: 'rgb(158, 118, 95)'
    }
  }), _base.base.react.createElement("div", {
    title: "#d8b5a5",
    style: {
      width: p20,
      background: 'rgb(216, 181, 165)'
    }
  }));
  loaded = true;
}

function categorical(selected) {
  if (!loaded) load();
  return [(0, _scheme.schemeOption)(selected, 'accent'), (0, _scheme.schemeOption)(selected, 'category10'), (0, _scheme.schemeOption)(selected, 'category20'), (0, _scheme.schemeOption)(selected, 'category20b'), (0, _scheme.schemeOption)(selected, 'category20c'), (0, _scheme.schemeOption)(selected, 'dark2'), (0, _scheme.schemeOption)(selected, 'paired'), (0, _scheme.schemeOption)(selected, 'pastel1'), (0, _scheme.schemeOption)(selected, 'pastel2'), (0, _scheme.schemeOption)(selected, 'set1'), (0, _scheme.schemeOption)(selected, 'set2'), (0, _scheme.schemeOption)(selected, 'set3'), (0, _scheme.schemeOption)(selected, 'tableau10'), (0, _scheme.schemeOption)(selected, 'tableau20')];
}
},{"../base":"Vlbn","./scheme":"BSWy"}],"wtjh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diverging = diverging;

var _base = require("../base");

var _scheme = require("./scheme");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var loaded = false;

function load() {
  _scheme.schemesJSX['blueorange'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-blueorange"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(5, 48, 97)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(34, 101, 163)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(75, 148, 196)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(143, 194, 221)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(205, 227, 238)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(242, 240, 235)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(253, 221, 179)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(248, 182, 100)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(221, 132, 31)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(178, 90, 9)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(127, 59, 8)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-blueorange)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['brownbluegreen'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-brownbluegreen"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(84, 48, 5)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(139, 84, 15)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(188, 132, 53)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(222, 190, 123)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(242, 228, 192)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(238, 241, 234)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(195, 231, 226)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(127, 201, 191)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(57, 152, 143)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(10, 103, 95)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(0, 60, 48)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-brownbluegreen)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['purplegreen'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-purplegreen"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(64, 0, 75)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(115, 47, 128)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(154, 109, 170)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(193, 164, 205)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(228, 210, 230)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(239, 240, 239)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(214, 238, 209)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(162, 215, 158)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(92, 173, 101)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(33, 120, 57)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(0, 68, 27)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-purplegreen)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['pinkyellowgreen'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-pinkyellowgreen"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(142, 1, 82)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(192, 38, 126)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(221, 114, 173)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(240, 179, 214)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(250, 221, 237)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(245, 243, 239)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(225, 242, 202)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(182, 222, 135)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(128, 187, 71)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(79, 145, 37)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(39, 100, 25)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-pinkyellowgreen)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['purpleorange'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-purpleorange"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(45, 0, 75)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(85, 45, 132)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(129, 112, 172)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(176, 170, 208)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(215, 215, 233)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(243, 238, 234)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(253, 221, 179)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(248, 182, 100)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(221, 132, 31)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(178, 90, 9)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(127, 59, 8)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-purpleorange)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['redblue'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-redblue"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(103, 0, 31)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(172, 32, 47)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(213, 96, 80)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(241, 163, 133)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(251, 215, 196)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(242, 239, 238)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(205, 227, 238)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(143, 194, 221)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(75, 148, 196)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(34, 101, 163)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(5, 48, 97)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-redblue)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['redgrey'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-redgrey"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(103, 0, 31)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(172, 32, 47)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(213, 96, 80)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(241, 163, 133)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(252, 216, 197)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(250, 244, 241)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(223, 223, 223)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(184, 184, 184)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(134, 134, 134)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(78, 78, 78)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(26, 26, 26)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-redgrey)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['redyellowblue'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-redyellowblue"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(165, 0, 38)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(212, 50, 44)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(241, 110, 67)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(252, 172, 100)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(254, 221, 144)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(250, 248, 193)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(220, 241, 236)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(171, 214, 232)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(117, 171, 208)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(74, 116, 180)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(49, 54, 149)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-redyellowblue)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['redyellowgreen'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-redyellowgreen"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(165, 0, 38)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(212, 50, 44)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(241, 110, 67)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(252, 172, 99)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(254, 221, 141)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(249, 247, 174)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(215, 238, 142)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(164, 216, 110)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(100, 188, 97)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(34, 150, 79)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(0, 104, 55)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-redyellowgreen)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['spectral'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-spectral"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(158, 1, 66)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(209, 60, 75)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(240, 112, 74)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(252, 172, 99)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(254, 221, 141)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(251, 248, 176)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(224, 243, 161)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(169, 221, 162)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(105, 189, 169)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(66, 136, 181)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(94, 79, 162)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-spectral)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  loaded = true;
}

function diverging(selected) {
  if (!loaded) load();
  return [(0, _scheme.schemeOption)(selected, 'blueorange'), (0, _scheme.schemeOption)(selected, 'brownbluegreen'), (0, _scheme.schemeOption)(selected, 'purplegreen'), (0, _scheme.schemeOption)(selected, 'pinkyellowgreen'), (0, _scheme.schemeOption)(selected, 'purpleorange'), (0, _scheme.schemeOption)(selected, 'redblue'), (0, _scheme.schemeOption)(selected, 'redgrey'), (0, _scheme.schemeOption)(selected, 'redyellowblue'), (0, _scheme.schemeOption)(selected, 'redyellowgreen'), (0, _scheme.schemeOption)(selected, 'spectral')];
}
},{"../base":"Vlbn","./scheme":"BSWy"}],"uM5k":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dual = dual;

var _base = require("../base");

var _sanddanceReact = require("@msrvida/sanddance-react");

var _scheme = require("./scheme");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var loaded = false;

function load() {
  _sanddanceReact.SandDance.colorSchemes.filter(function (cs) {
    return cs.colors.length === 2;
  }).map(function (binaryScheme, i) {
    _scheme.schemesJSX[binaryScheme.scheme] = _base.base.react.createElement("div", {
      className: "swatch"
    }, binaryScheme.colors.map(function (color, j) {
      return _base.base.react.createElement("div", {
        key: j,
        title: color,
        style: {
          width: '50%',
          backgroundColor: color
        }
      });
    }));
  });

  loaded = true;
}

function dual(selected) {
  if (!loaded) load();
  return _sanddanceReact.SandDance.colorSchemes.filter(function (cs) {
    return cs.colors.length === 2;
  }).map(function (binaryScheme, i) {
    return (0, _scheme.schemeOption)(selected, binaryScheme.scheme);
  });
}
},{"../base":"Vlbn","@msrvida/sanddance-react":"MjKu","./scheme":"BSWy"}],"rVQa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequentialMultiHue = sequentialMultiHue;

var _base = require("../base");

var _scheme = require("./scheme");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var loaded = false;

function load() {
  _scheme.schemesJSX['viridis'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-viridis"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "#440154"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "#482475"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "#414487"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "#355f8d"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "#2a788e"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "#21918c"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "#22a884"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "#44bf70"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "#7ad151"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "#bddf26"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "#fde725"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-viridis)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['inferno'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-inferno"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "#000004"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "#160b39"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "#420a68"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "#6a176e"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "#932667"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "#bc3754"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "#dd513a"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "#f37819"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "#fca50a"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "#f6d746"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "#fcffa4"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-inferno)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['magma'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-magma"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "#000004"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "#140e36"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "#3b0f70"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "#641a80"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "#8c2981"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "#b73779"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "#de4968"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "#f7705c"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "#fe9f6d"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "#fecf92"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "#fcfdbf"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-magma)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['plasma'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-plasma"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "#0d0887"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "#41049d"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "#6a00a8"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "#8f0da4"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "#b12a90"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "#cc4778"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "#e16462"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "#f2844b"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "#fca636"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "#fcce25"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "#f0f921"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-plasma)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['bluegreen'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-bluegreen"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(247, 252, 253)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(232, 246, 249)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(213, 239, 237)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(183, 228, 218)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(143, 211, 193)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(104, 194, 163)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(73, 177, 127)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(47, 153, 89)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(21, 127, 60)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(3, 100, 41)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(0, 68, 27)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-bluegreen)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['bluepurple'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-bluepurple"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(247, 252, 253)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(228, 238, 245)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(204, 221, 236)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(178, 202, 225)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(156, 179, 213)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(143, 149, 198)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(140, 116, 181)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(137, 82, 165)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(133, 45, 143)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(115, 15, 113)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(77, 0, 75)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-bluepurple)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['greenblue'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-greenblue"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(247, 252, 240)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(229, 245, 223)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(211, 238, 206)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(189, 229, 191)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(158, 217, 187)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(123, 203, 196)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(88, 183, 205)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(57, 156, 198)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(29, 126, 183)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(11, 96, 161)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(8, 64, 129)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-greenblue)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['orangered'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-orangered"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(255, 247, 236)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(254, 235, 207)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(253, 220, 175)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(253, 202, 148)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(253, 176, 122)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(250, 142, 93)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(241, 108, 73)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(224, 69, 48)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(200, 29, 19)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(167, 4, 3)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(127, 0, 0)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-orangered)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['purplebluegreen'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-purplebluegreen"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(255, 247, 251)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(239, 231, 242)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(219, 216, 234)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(190, 201, 226)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(152, 185, 217)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(105, 168, 207)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(64, 150, 192)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(25, 135, 159)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(3, 120, 119)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(1, 99, 83)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(1, 70, 54)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-purplebluegreen)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['purpleblue'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-purpleblue"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(255, 247, 251)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(239, 234, 244)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(219, 218, 235)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(191, 201, 226)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(155, 185, 217)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(114, 168, 207)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(67, 148, 195)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(26, 125, 182)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(6, 103, 161)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(4, 82, 129)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(2, 56, 88)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-purpleblue)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['purplered'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-purplered"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(247, 244, 249)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(234, 227, 240)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(220, 201, 226)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(208, 170, 210)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(208, 138, 194)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(221, 99, 174)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(227, 56, 144)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(215, 28, 108)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(183, 11, 79)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(143, 2, 58)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(103, 0, 31)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-purplered)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['redpurple'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-redpurple"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(255, 247, 243)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(253, 228, 225)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(252, 207, 204)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(251, 181, 188)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(249, 147, 176)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(243, 105, 163)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(224, 62, 152)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(192, 23, 136)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(153, 3, 124)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(112, 1, 116)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(73, 0, 106)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-redpurple)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['yellowgreenblue'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-yellowgreenblue"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(255, 255, 217)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(239, 249, 189)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(213, 238, 179)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(169, 221, 183)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(115, 201, 189)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(69, 180, 194)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(40, 151, 191)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(32, 115, 178)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(35, 78, 160)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(28, 49, 133)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(8, 29, 88)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-yellowgreenblue)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['yellowgreen'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-yellowgreen"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(255, 255, 229)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(247, 252, 196)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(228, 244, 172)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(199, 232, 155)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(162, 216, 138)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(120, 197, 120)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(78, 175, 99)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(47, 148, 78)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(21, 121, 63)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(3, 96, 52)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(0, 69, 41)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-yellowgreen)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['yelloworangebrown'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-yelloworangebrown"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(255, 255, 229)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(255, 248, 196)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(254, 234, 161)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(254, 214, 118)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(254, 186, 74)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(251, 153, 44)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(238, 121, 24)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(216, 91, 10)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(183, 67, 4)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(143, 50, 4)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(102, 37, 6)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-yelloworangebrown)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['yelloworangered'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-yelloworangered"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(255, 255, 204)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(255, 240, 169)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(254, 224, 135)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(254, 201, 101)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(254, 171, 75)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(253, 137, 60)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(250, 92, 46)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(236, 48, 35)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(211, 17, 33)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(175, 2, 37)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(128, 0, 38)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-yelloworangered)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  loaded = true;
}

function sequentialMultiHue(selected) {
  if (!loaded) load();
  return [(0, _scheme.schemeOption)(selected, 'viridis'), (0, _scheme.schemeOption)(selected, 'inferno'), (0, _scheme.schemeOption)(selected, 'magma'), (0, _scheme.schemeOption)(selected, 'plasma'), (0, _scheme.schemeOption)(selected, 'bluegreen'), (0, _scheme.schemeOption)(selected, 'bluepurple'), (0, _scheme.schemeOption)(selected, 'greenblue'), (0, _scheme.schemeOption)(selected, 'orangered'), (0, _scheme.schemeOption)(selected, 'purplebluegreen'), (0, _scheme.schemeOption)(selected, 'purpleblue'), (0, _scheme.schemeOption)(selected, 'purplered'), (0, _scheme.schemeOption)(selected, 'redpurple'), (0, _scheme.schemeOption)(selected, 'yellowgreenblue'), (0, _scheme.schemeOption)(selected, 'yellowgreen'), (0, _scheme.schemeOption)(selected, 'yelloworangebrown'), (0, _scheme.schemeOption)(selected, 'yelloworangered')];
}
},{"../base":"Vlbn","./scheme":"BSWy"}],"Prvn":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequentialSingleHue = sequentialSingleHue;

var _base = require("../base");

var _scheme = require("./scheme");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var loaded = false;

function load() {
  _scheme.schemesJSX['blues'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-blues"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(247, 251, 255)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(227, 238, 249)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(207, 225, 242)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(181, 212, 233)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(147, 195, 223)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(109, 174, 213)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(75, 151, 201)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(47, 126, 188)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(24, 100, 170)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(10, 74, 144)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(8, 48, 107)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-blues)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['greens'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-greens"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(247, 252, 245)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(232, 246, 227)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(211, 238, 205)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(183, 226, 177)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(151, 212, 148)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(115, 195, 120)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(77, 175, 98)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(47, 152, 79)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(21, 127, 59)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(3, 100, 41)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(0, 68, 27)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-greens)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['greys'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-greys"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(255, 255, 255)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(242, 242, 242)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(226, 226, 226)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(206, 206, 206)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(180, 180, 180)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(151, 151, 151)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(122, 122, 122)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(95, 95, 95)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(64, 64, 64)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(30, 30, 30)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(0, 0, 0)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-greys)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['purples'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-purples"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(252, 251, 253)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(241, 239, 246)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(226, 225, 239)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(206, 206, 229)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(182, 181, 216)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(158, 155, 201)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(135, 130, 188)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(115, 99, 172)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(97, 64, 155)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(80, 31, 140)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(63, 0, 125)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-purples)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['reds'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-reds"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(255, 245, 240)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(254, 227, 214)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(253, 201, 180)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(252, 170, 142)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(252, 138, 107)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(249, 105, 76)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(239, 69, 51)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(217, 39, 35)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(187, 21, 26)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(151, 11, 19)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(103, 0, 13)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-reds)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  _scheme.schemesJSX['oranges'] = _base.base.react.createElement("svg", {
    viewBox: "0,0,1,1",
    preserveAspectRatio: "none"
  }, _base.base.react.createElement("defs", null, _base.base.react.createElement("linearGradient", {
    id: "gradient-oranges"
  }, _base.base.react.createElement("stop", {
    offset: "0%",
    stopColor: "rgb(255, 245, 235)"
  }), _base.base.react.createElement("stop", {
    offset: "10%",
    stopColor: "rgb(254, 232, 211)"
  }), _base.base.react.createElement("stop", {
    offset: "20%",
    stopColor: "rgb(253, 216, 179)"
  }), _base.base.react.createElement("stop", {
    offset: "30%",
    stopColor: "rgb(253, 194, 140)"
  }), _base.base.react.createElement("stop", {
    offset: "40%",
    stopColor: "rgb(253, 167, 98)"
  }), _base.base.react.createElement("stop", {
    offset: "50%",
    stopColor: "rgb(251, 141, 61)"
  }), _base.base.react.createElement("stop", {
    offset: "60%",
    stopColor: "rgb(242, 112, 29)"
  }), _base.base.react.createElement("stop", {
    offset: "70%",
    stopColor: "rgb(226, 86, 9)"
  }), _base.base.react.createElement("stop", {
    offset: "80%",
    stopColor: "rgb(196, 65, 3)"
  }), _base.base.react.createElement("stop", {
    offset: "90%",
    stopColor: "rgb(159, 51, 3)"
  }), _base.base.react.createElement("stop", {
    offset: "100%",
    stopColor: "rgb(127, 39, 4)"
  }))), _base.base.react.createElement("rect", {
    fill: "url(#gradient-oranges)",
    x: "0",
    y: "0",
    width: "1",
    height: "1"
  }));
  loaded = true;
}

function sequentialSingleHue(selected) {
  if (!loaded) load();
  return [(0, _scheme.schemeOption)(selected, 'blues'), (0, _scheme.schemeOption)(selected, 'greens'), (0, _scheme.schemeOption)(selected, 'greys'), (0, _scheme.schemeOption)(selected, 'purples'), (0, _scheme.schemeOption)(selected, 'reds'), (0, _scheme.schemeOption)(selected, 'oranges')];
}
},{"../base":"Vlbn","./scheme":"BSWy"}],"otJp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Palette = Palette;

var _base = require("../base");

var _categorical = require("./categorical");

var _diverging = require("./diverging");

var _dropdown = require("../controls/dropdown");

var _dual = require("./dual");

var _scheme = require("./scheme");

var _sanddanceReact = require("@msrvida/sanddance-react");

var _sequentialMultiHue = require("./sequentialMultiHue");

var _sequentialSingleHue = require("./sequentialSingleHue");

var _language = require("../language");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var maxDistinctColors = 20;

function Palette(props) {
  var distinctValueCount = props.colorColumn.stats.distinctValueCount;
  var isDual = distinctValueCount === 2;
  var categoricalNumeric = distinctValueCount > 0 && distinctValueCount < maxDistinctColors;
  var isQualitative = false;
  var isQuantitative = false;

  switch (props.colorColumn.type) {
    case 'boolean':
    case 'string':
      isQualitative = true;
      break;

    case 'number':
      isQuantitative = true;
      break;

    case 'date':
    case 'integer':
      isQuantitative = true;
      isQualitative = categoricalNumeric;
  }

  var selected = props.scheme;
  var options = [];

  function menu(name, opts) {
    options.push({
      key: name,
      text: name,
      itemType: _base.base.fluentUI.DropdownMenuItemType.Header
    });
    options.push.apply(options, opts);
  }

  isQualitative && menu(_language.strings.schemeCategorical, (0, _categorical.categorical)(selected));
  isQuantitative && menu(_language.strings.schemeSequentialSingleHue, (0, _sequentialSingleHue.sequentialSingleHue)(selected));
  isQuantitative && menu(_language.strings.schemeSequentialMultiHue, (0, _sequentialMultiHue.sequentialMultiHue)(selected));
  isQuantitative && menu(_language.strings.schemeDiverging, (0, _diverging.diverging)(selected));
  isDual && menu(_language.strings.schemeDual, (0, _dual.dual)(selected));
  return _base.base.react.createElement("div", {
    className: "sanddance-palette"
  }, _base.base.react.createElement("div", {
    className: "sanddance-explanation",
    dangerouslySetInnerHTML: {
      __html: _language.strings.labelColorFieldInfo(props.colorColumn.name, props.colorColumn.type, categoricalNumeric, distinctValueCount)
    }
  }), _base.base.react.createElement(_dropdown.Dropdown, {
    collapseLabel: props.collapseLabel,
    disabled: props.disabled,
    dropdownWidth: 400,
    label: _language.strings.labelColorScheme,
    onRenderOption: function onRenderOption(option) {
      if (option.itemType === _base.base.fluentUI.DropdownMenuItemType.Header) {
        return _base.base.react.createElement("span", null, option.text);
      } else {
        return _base.base.react.createElement("div", {
          className: "sanddance-scheme option"
        }, _base.base.react.createElement("span", {
          className: "name"
        }, option.scheme), option.children);
      }
    },
    options: options,
    onChange: function onChange(e, o) {
      props.changeColorScheme(o.scheme);
    }
  }), _base.base.react.createElement("div", {
    className: _sanddanceReact.util.classList('sanddance-scheme', props.disabled && 'disabled')
  }, props.scheme && _scheme.schemesJSX[props.scheme]));
}
},{"../base":"Vlbn","./categorical":"JrIT","./diverging":"wtjh","../controls/dropdown":"Uyrp","./dual":"uM5k","./scheme":"BSWy","@msrvida/sanddance-react":"MjKu","./sequentialMultiHue":"rVQa","./sequentialSingleHue":"Prvn","../language":"hk5u"}],"N8IJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = Color;

var _base = require("../base");

var _columnMap = require("../controls/columnMap");

var _palettes = require("../palettes");

var _signal = require("../controls/signal");

var _language = require("../language");

var _group = require("../controls/group");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function Color(props) {
  var colorColumn = props.dataContent.columns.filter(function (c) {
    return c.name === props.colorColumn;
  })[0];
  var disabledColorBin = !colorColumn || !colorColumn.quantitative || props.directColor;
  var colorBin = props.colorBin || 'quantize';
  return _base.base.react.createElement("div", {
    className: "sanddance-color-dialog"
  }, _base.base.react.createElement(_group.Group, {
    label: _language.strings.labelColor
  }, _base.base.react.createElement(_columnMap.ColumnMap, Object.assign({}, props, {
    collapseLabel: props.compactUI,
    selectedColumnName: props.colorColumn,
    specRole: props.specCapabilities && props.specCapabilities.roles.filter(function (r) {
      return r.role === 'color';
    })[0],
    key: 0
  })), colorColumn && colorColumn.isColorData && _base.base.react.createElement("div", {
    className: "sanddance-explanation",
    dangerouslySetInnerHTML: {
      __html: _language.strings.labelColorFieldIsColorData(colorColumn.name)
    }
  }), colorColumn && !colorColumn.isColorData && _base.base.react.createElement(_palettes.Palette, {
    collapseLabel: props.compactUI,
    scheme: props.scheme,
    colorColumn: colorColumn,
    changeColorScheme: function changeColorScheme(scheme) {
      props.onColorSchemeChange(scheme);
    },
    disabled: props.disabled || props.directColor || colorColumn && colorColumn.isColorData
  }), colorColumn && !colorColumn.isColorData && _base.base.react.createElement(_signal.Signal, {
    disabled: props.disabled || !colorColumn || props.directColor || colorColumn && colorColumn.isColorData,
    signal: props.colorReverseSignal,
    explorer: props.explorer,
    onChange: props.onColorReverseChange,
    collapseLabel: props.compactUI
  })), colorColumn && !colorColumn.isColorData && _base.base.react.createElement(_group.Group, {
    label: _language.strings.labelColorBin
  }, _base.base.react.createElement("div", {
    className: "sanddance-explanation"
  }, _language.strings.labelColorBinExplanation), _base.base.react.createElement(_base.base.fluentUI.ChoiceGroup, {
    options: [{
      key: 'continuous',
      text: _language.strings.labelColorBinNone,
      checked: colorBin === 'continuous',
      disabled: disabledColorBin
    }, {
      key: 'quantize',
      text: _language.strings.labelColorBinQuantize,
      checked: colorBin === 'quantize',
      disabled: disabledColorBin
    }, {
      key: 'quantile',
      text: _language.strings.labelColorBinQuantile,
      checked: colorBin === 'quantile',
      disabled: disabledColorBin
    }],
    onChange: function onChange(e, o) {
      props.onColorBinChange(o.key);
    }
  }), _base.base.react.createElement(_signal.Signal, {
    disabled: props.disabled || disabledColorBin || props.colorBin === 'continuous',
    signal: props.colorBinSignal,
    explorer: props.explorer,
    onChange: props.onColorBinCountChange,
    collapseLabel: props.compactUI
  })), colorColumn && !colorColumn.isColorData && _base.base.react.createElement(_group.Group, {
    label: _language.strings.labelColorOptions
  }, _base.base.react.createElement(_base.base.fluentUI.Toggle, {
    label: _language.strings.selectDirectColor,
    disabled: !colorColumn.stats.hasColorData,
    checked: !!(colorColumn.stats.hasColorData && props.directColor),
    onChange: function onChange(e, checked) {
      return props.onDirectColorChange(checked);
    }
  }), _base.base.react.createElement("div", {
    className: "sanddance-explanation",
    dangerouslySetInnerHTML: {
      __html: _language.strings.labelDataColors
    }
  })));
}
},{"../base":"Vlbn","../controls/columnMap":"DSho","../palettes":"otJp","../controls/signal":"OWDI","../language":"hk5u","../controls/group":"Q3hf"}],"XFNl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyCodes = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var KeyCodes = {
  ENTER: 13
};
exports.KeyCodes = KeyCodes;
},{}],"Gai8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataItem = DataItem;

var _base = require("../base");

var _keycodes = require("../keycodes");

var _language = require("../language");

var _sanddanceReact = require("@msrvida/sanddance-react");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isNumber(value) {
  if (typeof value === 'number') return true;
  if (!isNaN(value)) return true;
  return false;
}

function isBoolean(value) {
  if (typeof value === 'boolean') return true;

  if (typeof value === 'string') {
    switch (value.toLowerCase()) {
      case true + '':
      case false + '':
        return true;
    }
  }

  return false;
}

function bingSearchLink(column, value) {
  if (isNumber(value)) return null;
  if (isBoolean(value)) return null;
  if (column && column.stats.distinctValueCount === 2) return null;
  return _base.base.react.createElement("div", {
    className: 'bing-search'
  }, _base.base.react.createElement("a", {
    href: "https://www.bing.com/search?q=".concat(encodeURIComponent(value)),
    target: '_blank',
    title: _language.strings.bingsearchDescription(value),
    "aria-label": _language.strings.bingsearchDescription(value)
  }, _language.strings.bingsearch));
}

function displayValue(value) {
  switch (value) {
    case '':
      {
        return {
          special: true,
          display: _language.strings.labelBlank
        };
      }

    case null:
      {
        return {
          special: true,
          display: _language.strings.labelNull
        };
      }

    case true:
      {
        return {
          special: true,
          display: _language.strings.labelTrue
        };
      }

    case false:
      {
        return {
          special: true,
          display: _language.strings.labelFalse
        };
      }

    default:
      {
        if (_typeof(value) === 'object') {
          if (value instanceof Date) {
            var d = value;
            return displayValue(d.input);
          }

          return {
            special: false,
            display: value.toLocaleString()
          };
        }

        return {
          special: false,
          display: value
        };
      }
  }
}

function displayValueElement(nvp) {
  var d = displayValue(nvp.value);

  if (d.special) {
    return _base.base.react.createElement("i", null, d.display);
  }

  return d.display;
}

function DataItem(props) {
  if (!props.item) {
    return null;
  }

  var nameValuePairs = [];

  var _loop = function _loop(columnName) {
    if (columnName === _sanddanceReact.SandDance.constants.GL_ORDINAL && !props.showSystemFields) {
      return "continue";
    }

    if (_sanddanceReact.SandDance.util.isInternalFieldName(columnName)) {
      return "continue";
    }

    var nameValuePair = {
      columnName: columnName,
      value: props.item[columnName]
    };

    if (!props.bingSearchDisabled) {
      nameValuePair.bingSearch = bingSearchLink(props.columns.filter(function (c) {
        return c.name === columnName;
      })[0], props.item[columnName]);
    }

    nameValuePairs.push(nameValuePair);
  };

  for (var columnName in props.item) {
    var _ret = _loop(columnName);

    if (_ret === "continue") continue;
  }

  return _base.base.react.createElement("div", {
    className: "sanddance-dataItem"
  }, nameValuePairs.map(function (nameValuePair, i) {
    var ex = {
      key: 0,
      name: nameValuePair.columnName,
      operator: '==',
      value: nameValuePair.value
    };

    if (nameValuePair.value === null || nameValuePair.value === '') {
      ex.operator = 'isnullorEmpty';
      delete ex.value;
    }

    var searchClick = function searchClick(e) {
      var search = {
        key: 0,
        expressions: [ex]
      };
      props.onSearch(e, [search]);
    };

    var title = _language.strings.tooltipSearch(nameValuePair.columnName, displayValue(nameValuePair.value).display);

    return _base.base.react.createElement("div", {
      key: i,
      onClick: !props.disabled ? searchClick : null,
      title: title,
      onKeyUp: function onKeyUp(e) {
        if (e.keyCode === _keycodes.KeyCodes.ENTER) {
          searchClick(e);
        }
      },
      tabIndex: 0,
      className: "name-value"
    }, _base.base.react.createElement("div", {
      className: "column-name"
    }, nameValuePair.columnName), _base.base.react.createElement("div", {
      className: "column-value"
    }, displayValueElement(nameValuePair)), nameValuePair.bingSearch);
  }));
}
},{"../base":"Vlbn","../keycodes":"XFNl","../language":"hk5u","@msrvida/sanddance-react":"MjKu"}],"pJLc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataBrowser = DataBrowser;

var _base = require("../base");

var _dataExporter = require("../controls/dataExporter");

var _dataItem = require("../controls/dataItem");

var _dataScope = require("../controls/dataScope");

var _dropdown = require("../controls/dropdown");

var _group = require("../controls/group");

var _iconButton = require("../controls/iconButton");

var _language = require("../language");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function DataBrowser(props) {
  function activateRecord(newIndex) {
    props.onActivate(props.data[newIndex], newIndex);
  }

  var index = props.index;
  var length = props.data && props.data.length || 0;
  return _base.base.react.createElement(_group.Group, {
    label: _language.strings.labelDataBrowser,
    className: "sanddance-dataIndex"
  }, _base.base.react.createElement(_dropdown.Dropdown, {
    label: _language.strings.labelDataScope,
    collapseLabel: true,
    options: [{
      key: _dataScope.DataScopeId.AllData,
      text: _language.strings.selectDataSpanAll,
      isSelected: props.selectedDataScope === _dataScope.DataScopeId.AllData
    }, {
      key: _dataScope.DataScopeId.FilteredData,
      text: _language.strings.selectDataSpanFilter,
      isSelected: props.selectedDataScope === _dataScope.DataScopeId.FilteredData
    }, {
      key: _dataScope.DataScopeId.SelectedData,
      text: _language.strings.selectDataSpanSelection,
      isSelected: props.selectedDataScope === _dataScope.DataScopeId.SelectedData
    }],
    onChange: function onChange(e, o) {
      props.onDataScopeClick(o.key);
    }
  }), !props.data && _base.base.react.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: props.nullMessage
    }
  }), props.data && !props.data.length && _base.base.react.createElement("div", null, props.zeroMessage), !!length && _base.base.react.createElement("div", null, _base.base.react.createElement("div", {
    className: "index"
  }, _base.base.react.createElement(_iconButton.IconButton, {
    themePalette: props.themePalette,
    iconName: "ChevronLeftMed",
    onClick: function onClick(e) {
      return activateRecord(index <= 0 ? length - 1 : index - 1);
    },
    disabled: props.disabled || length === 1,
    title: _language.strings.buttonPrevDataItem
  }), _base.base.react.createElement("span", null, _language.strings.record(index + 1, length)), _base.base.react.createElement(_iconButton.IconButton, {
    themePalette: props.themePalette,
    iconName: "ChevronRightMed",
    onClick: function onClick(e) {
      return activateRecord(index >= length - 1 ? 0 : index + 1);
    },
    disabled: props.disabled || length === 1,
    title: _language.strings.buttonNextDataItem
  })), !props.itemVisible && _base.base.react.createElement("div", {
    className: "item-filtered"
  }, _language.strings.labelDataItemIsFiltered), _base.base.react.createElement(_dataItem.DataItem, {
    columns: props.columns,
    item: props.data[index],
    disabled: props.disabled,
    onSearch: props.onSearch,
    bingSearchDisabled: props.bingSearchDisabled
  })), props.dataExportHandler && props.data && _base.base.react.createElement(_dataExporter.DataExportPicker, {
    theme: props.theme,
    initializer: {
      fileName: "".concat((0, _dataExporter.removeExtensions)(props.displayName), " (").concat(props.data.length, ")")
    },
    data: props.data,
    dataExportHandler: props.dataExportHandler,
    disabled: props.disabled
  }));
}
},{"../base":"Vlbn","../controls/dataExporter":"l7po","../controls/dataItem":"Gai8","../controls/dataScope":"OsNT","../controls/dropdown":"Uyrp","../controls/group":"Q3hf","../controls/iconButton":"dQNc","../language":"hk5u"}],"YVpI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.History = History;

var _base = require("../base");

var _group = require("../controls/group");

var _keycodes = require("../keycodes");

var _language = require("../language");

var _sanddanceReact = require("@msrvida/sanddance-react");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function History(props) {
  return _base.base.react.createElement(_group.Group, {
    label: _language.strings.labelHistory,
    className: "sanddance-history"
  }, _base.base.react.createElement("ol", null, props.historyItems.map(function (hi, i) {
    return _base.base.react.createElement("li", {
      key: i,
      className: _sanddanceReact.util.classList(i === props.historyIndex && 'selected'),
      onKeyUp: function onKeyUp(e) {
        if (e.keyCode === _keycodes.KeyCodes.ENTER) {
          props.redo(i);
        }
      },
      onClick: function onClick() {
        return props.redo(i);
      },
      tabIndex: 0
    }, hi.label);
  })));
}
},{"../base":"Vlbn","../controls/group":"Q3hf","../keycodes":"XFNl","../language":"hk5u","@msrvida/sanddance-react":"MjKu"}],"yvMl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosition = getPosition;

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function hasClientXY(e) {
  if (e && e.clientX !== undefined && e.clientX !== undefined) {
    return {
      top: e.clientY,
      left: e.clientX
    };
  }
}

function getPosition(e) {
  var xy = hasClientXY(e);

  if (xy) {
    return xy;
  }

  var te = e;

  if (te) {
    for (var i = 0; i < te.touches.length; i++) {
      var _xy = hasClientXY(te.touches[i]);

      if (_xy) {
        return _xy;
      }
    }
  }
}
},{}],"tb7d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPrefs = initPrefs;
exports.saveSignalValuePref = saveSignalValuePref;
exports.copyPrefToNewState = copyPrefToNewState;
exports.savePref = savePref;

var _sanddanceReact = require("@msrvida/sanddance-react");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function initPrefs(prefs, partialInsight) {
  if (partialInsight) {
    var specTypePrefs = prefs[partialInsight.chart] || {};
    prefs[partialInsight.chart] = specTypePrefs;

    for (var _role in partialInsight.columns) {
      var role = _role;

      if (role === 'color' || role === 'x') {
        (function () {
          var rolePrefs = specTypePrefs[role] || {};
          specTypePrefs[role] = rolePrefs;
          var column = partialInsight.columns[role];

          var copySignalValue = function copySignalValue(signalName) {
            if (partialInsight.signalValues && partialInsight.signalValues[signalName] && rolePrefs[column]) {
              var signalValues = rolePrefs[column].signalValues || {};
              signalValues[signalName] = partialInsight.signalValues[signalName];
              rolePrefs[column].signalValues = signalValues;
            }
          };

          switch (role) {
            case 'color':
              rolePrefs[column] = {
                scheme: partialInsight.scheme,
                colorBin: partialInsight.colorBin
              };
              copySignalValue(_sanddanceReact.SandDance.constants.SignalNames.ColorBinCount);
              break;

            case 'x':
              copySignalValue(_sanddanceReact.SandDance.constants.SignalNames.XBins);
              break;
          }
        })();
      }
    }
  }
}

function saveSignalValuePref(prefs, chart, role, column, signalName, signalValue) {
  var partialInsight = savePref(prefs, chart, role, column, {
    signalValues: {}
  });
  partialInsight.signalValues[signalName] = signalValue;
}

function copyPrefToNewState(prefs, chart, role, columnName) {
  var specTypePrefs = _sanddanceReact.SandDance.VegaDeckGl.util.deepMerge({}, prefs['*'], prefs[chart]);

  var rolePrefs = _sanddanceReact.SandDance.VegaDeckGl.util.deepMerge({}, specTypePrefs['*'], specTypePrefs[role]);

  var partialInsight = _sanddanceReact.SandDance.VegaDeckGl.util.deepMerge({}, rolePrefs['*'], rolePrefs[columnName]);

  return partialInsight;
}

function savePref(prefs, chart, role, column, partialInsight) {
  var SpecTypePrefs = prefs[chart] || {};
  prefs[chart] = SpecTypePrefs;
  var rolePrefs = SpecTypePrefs[role] || {};
  SpecTypePrefs[role] = rolePrefs;
  rolePrefs[column] = _sanddanceReact.SandDance.VegaDeckGl.util.deepMerge({}, rolePrefs[column], partialInsight);
  return rolePrefs[column];
}
},{"@msrvida/sanddance-react":"MjKu"}],"yzxM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleSearch = toggleSearch;

var _sanddanceReact = require("@msrvida/sanddance-react");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function comparableGroup(group) {
  return Object.assign(Object.assign({}, group), {
    clause: null
  });
}

function compareGroup(a, b) {
  return _sanddanceReact.SandDance.searchExpression.compareGroup(comparableGroup(a), comparableGroup(b));
}

function toggleSearch(haystack, needle) {
  var groups = [];
  var found = false; //look for item in all

  haystack.forEach(function (group) {
    if (compareGroup(group, needle)) {
      //if it exists, don't add it
      found = true;
    } else {
      groups.push(group);
    }
  });
  return {
    groups: groups,
    found: found
  };
}
},{"@msrvida/sanddance-react":"MjKu"}],"KeW6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Explorer = void 0;

var _base = require("./base");

var _canvas = require("./canvas");

var _clickableTextLayer = require("./clickableTextLayer");

var _colorMap = require("./colorMap");

var _colorScheme = require("./colorScheme");

var _columns = require("./columns");

var _dataScope = require("./controls/dataScope");

var _dialog = require("./controls/dialog");

var _iconButton = require("./controls/iconButton");

var _sidebar = require("./controls/sidebar");

var _topbar = require("./controls/topbar");

var _dataLoader = require("./dataLoader");

var _defaults = require("./defaults");

var _chart = require("./dialogs/chart");

var _color = require("./dialogs/color");

var _dataBrowser = require("./dialogs/dataBrowser");

var _history = require("./dialogs/history");

var _search = require("./dialogs/search");

var _settings = require("./dialogs/settings");

var _snapshotEditor = require("./dialogs/snapshotEditor");

var _snapshots = require("./dialogs/snapshots");

var _interfaces = require("./interfaces");

var _language = require("./language");

var _mouseEvent = require("./mouseEvent");

var _partialInsight = require("./partialInsight");

var _themes = require("./themes");

var _toggleSearch = require("./toggleSearch");

var _chartRecommender = require("@msrvida/chart-recommender");

var _sanddanceReact = require("@msrvida/sanddance-react");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var dataBrowserZeroMessages = {};
dataBrowserZeroMessages[_dataScope.DataScopeId.AllData] = _language.strings.labelZeroAll;
dataBrowserZeroMessages[_dataScope.DataScopeId.FilteredData] = null; //empty array is not used

dataBrowserZeroMessages[_dataScope.DataScopeId.SelectedData] = _language.strings.labelZeroSearchResults;
var dataBrowserNullMessages = {};
dataBrowserNullMessages[_dataScope.DataScopeId.AllData] = _language.strings.labelDataNullAll;
dataBrowserNullMessages[_dataScope.DataScopeId.FilteredData] = _language.strings.labelDataNullFiltered;
dataBrowserNullMessages[_dataScope.DataScopeId.SelectedData] = _language.strings.labelDataNullSelection;

function createInputSearch(search) {
  var groups = _sanddanceReact.SandDance.searchExpression.ensureSearchExpressionGroupArray(search);

  var dialogSearch = groups.map(function (group, groupIndex) {
    return Object.assign(Object.assign({
      key: groupIndex
    }, group), {
      expressions: group.expressions.map(function (ex, i) {
        var ex2 = Object.assign({
          key: i
        }, ex);
        return ex2;
      })
    });
  });
  return dialogSearch;
}

function _Explorer(props) {
  var __Explorer =
  /*#__PURE__*/
  function (_base$react$Component) {
    _inherits(__Explorer, _base$react$Component);

    function __Explorer(props) {
      var _this;

      _classCallCheck(this, __Explorer);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(__Explorer).call(this, props));
      _this.state = {
        calculating: null,
        errors: null,
        autoCompleteDistinctValues: {},
        colorBin: null,
        dataContent: null,
        dataFile: null,
        search: null,
        totalStyle: null,
        facetStyle: 'wrap',
        filter: null,
        filteredData: null,
        specCapabilities: null,
        size: {
          height: null,
          width: null
        },
        scheme: null,
        transform: null,
        columns: null,
        chart: 'grid',
        signalValues: null,
        hideAxes: false,
        hideLegend: false,
        sideTabId: _interfaces.SideTabId.ChartType,
        dataScopeId: _dataScope.DataScopeId.AllData,
        selectedItemIndex: {},
        sidebarClosed: false,
        sidebarPinned: true,
        view: props.initialView || '2d',
        snapshots: [],
        selectedSnapshotIndex: -1,
        tooltipExclusions: [],
        positionedColumnMapProps: null,
        note: null,
        historyIndex: -1,
        historyItems: []
      };
      _this.state.selectedItemIndex[_dataScope.DataScopeId.AllData] = 0;
      _this.state.selectedItemIndex[_dataScope.DataScopeId.FilteredData] = 0;
      _this.state.selectedItemIndex[_dataScope.DataScopeId.SelectedData] = 0;
      _this.snapshotThumbWidth = _defaults.snapshotThumbWidth;
      _this.discardColorContextUpdates = true;

      _this.updateViewerOptions(Object.assign(Object.assign({}, _sanddanceReact.SandDance.VegaDeckGl.util.clone(_sanddanceReact.SandDance.Viewer.defaultViewerOptions)), props.viewerOptions));

      return _this;
    }

    _createClass(__Explorer, [{
      key: "finalize",
      value: function finalize() {
        if (this.viewer) this.viewer.finalize();
      }
    }, {
      key: "updateViewerOptions",
      value: function updateViewerOptions(viewerOptions) {
        var _this2 = this;

        this.viewerOptions = Object.assign(Object.assign({}, _sanddanceReact.SandDance.VegaDeckGl.util.deepMerge(_defaults.defaultViewerOptions, this.viewerOptions, viewerOptions)), {
          tooltipOptions: {
            exclude: function exclude(columnName) {
              return _this2.state.tooltipExclusions.indexOf(columnName) >= 0;
            }
          },
          onColorContextChange: function onColorContextChange() {
            return _this2.manageColorToolbar();
          },
          onDataFilter: function onDataFilter(filter, filteredData) {
            var selectedItemIndex = Object.assign({}, _this2.state.selectedItemIndex);
            selectedItemIndex[_dataScope.DataScopeId.FilteredData] = 0;

            _this2.changeInsight({
              filter: filter
            }, {
              label: _this2.historicFilterChange,
              omit: !_this2.historicFilterChange
            });

            _this2.historicFilterChange = null;

            _this2.setState({
              filteredData: filteredData,
              selectedItemIndex: selectedItemIndex
            });

            if (_this2.state.sideTabId === _interfaces.SideTabId.Data && _this2.state.dataScopeId === _dataScope.DataScopeId.FilteredData) {
              //make sure item is active
              requestAnimationFrame(function () {
                return filteredData && _this2.silentActivation(filteredData[0]);
              });
            }

            viewerOptions && viewerOptions.onDataFilter && viewerOptions.onDataFilter(filter, filteredData);
          },
          onSelectionChanged: function onSelectionChanged(newSearch, index, selectedData) {
            if (_this2.ignoreSelectionChange) return;
            var selectedItemIndex = Object.assign({}, _this2.state.selectedItemIndex);
            selectedItemIndex[_dataScope.DataScopeId.SelectedData] = index || 0;
            var _this2$state = _this2.state,
                search = _this2$state.search,
                sideTabId = _this2$state.sideTabId;

            if (newSearch) {
              search = createInputSearch(newSearch); //} else {
              //sideTabId = SideTabId.ChartType;
            }

            _this2.setState({
              search: search,
              selectedItemIndex: selectedItemIndex,
              sideTabId: sideTabId
            });

            viewerOptions && viewerOptions.onSelectionChanged && viewerOptions.onSelectionChanged(newSearch, index, selectedData);
          },
          onAxisClick: function onAxisClick(e, search) {
            _this2.toggleableSearch(e, search);

            viewerOptions && viewerOptions.onAxisClick && viewerOptions.onAxisClick(e, search);
          },
          onLegendHeaderClick: function onLegendHeaderClick(e) {
            var pos = (0, _mouseEvent.getPosition)(e);

            var specRole = _this2.state.specCapabilities && _this2.state.specCapabilities.roles.filter(function (r) {
              return r.role === 'color';
            })[0];

            var positionedColumnMapProps = Object.assign(Object.assign({}, _this2.getColumnMapBaseProps()), {
              collapseLabel: true,
              container: _this2.div,
              selectedColumnName: _this2.state.columns['color'],
              onDismiss: function onDismiss() {
                _this2.setState({
                  positionedColumnMapProps: null
                });
              },
              specRole: specRole,
              left: pos.left - _this2.div.clientLeft,
              top: pos.top - _this2.div.clientTop
            });

            _this2.setState({
              positionedColumnMapProps: positionedColumnMapProps
            });
          },
          onLegendRowClick: function onLegendRowClick(e, legendRow) {
            _this2.toggleableSearch(e, legendRow.search);

            viewerOptions && viewerOptions.onLegendRowClick && viewerOptions.onLegendRowClick(e, legendRow);
          },
          onError: function onError(errors) {
            _this2.setState({
              errors: errors
            });

            viewerOptions && viewerOptions.onError && viewerOptions.onError(errors);
          },
          onBeforeCreateLayers: _clickableTextLayer.onBeforeCreateLayers,
          getTextColor: function getTextColor(o) {
            if (o.specRole) {
              return _sanddanceReact.SandDance.VegaDeckGl.util.colorFromString(_this2.viewerOptions.colors.clickableText);
            } else if (o.metaData && o.metaData.search) {
              return _sanddanceReact.SandDance.VegaDeckGl.util.colorFromString(_this2.viewerOptions.colors.searchText);
            } else {
              return o.color;
            }
          },
          getTextHighlightColor: function getTextHighlightColor(o) {
            if (o.specRole) {
              return _sanddanceReact.SandDance.VegaDeckGl.util.colorFromString(_this2.viewerOptions.colors.clickableTextHighlight);
            } else if (o.metaData && o.metaData.search) {
              return _sanddanceReact.SandDance.VegaDeckGl.util.colorFromString(_this2.viewerOptions.colors.searchTextHighlight);
            } else {
              return [0, 0, 0, 0];
            }
          },
          onTextClick: function onTextClick(e, text) {
            if (e && text) {
              var pos = (0, _mouseEvent.getPosition)(e);
              var specRole = text.specRole;

              if (pos && specRole) {
                var positionedColumnMapProps = Object.assign(Object.assign({}, _this2.getColumnMapBaseProps()), {
                  collapseLabel: true,
                  container: _this2.div,
                  selectedColumnName: _this2.state.columns[specRole.role],
                  onDismiss: function onDismiss() {
                    _this2.setState({
                      positionedColumnMapProps: null
                    });
                  },
                  specRole: specRole,
                  left: pos.left - _this2.div.clientLeft,
                  top: pos.top - _this2.div.clientTop
                });

                _this2.setState({
                  positionedColumnMapProps: positionedColumnMapProps
                });
              } else {
                _this2.setState({
                  positionedColumnMapProps: null
                });
              }
            }
          },
          onNewViewStateTarget: function onNewViewStateTarget() {
            return _this2.newViewStateTarget;
          }
        });

        if (this.viewer && this.viewer.presenter) {
          var newPresenterStyle = _sanddanceReact.SandDance.util.getPresenterStyle(this.viewerOptions);

          var mergePrenterStyle = Object.assign(Object.assign({}, this.viewer.presenter.style), newPresenterStyle);
          this.viewer.presenter.style = mergePrenterStyle;
          this.viewer.options = _sanddanceReact.SandDance.VegaDeckGl.util.deepMerge(this.viewer.options, this.props.viewerOptions, this.viewerOptions);
        }
      }
    }, {
      key: "signal",
      value: function signal(signalName, signalValue, newViewStateTarget) {
        var _this3 = this;

        switch (signalName) {
          case _sanddanceReact.SandDance.constants.SignalNames.ColorBinCount:
          case _sanddanceReact.SandDance.constants.SignalNames.ColorReverse:
          case _sanddanceReact.SandDance.constants.SignalNames.MarkOpacity:
            this.discardColorContextUpdates = false;
            break;
        }

        this.newViewStateTarget = newViewStateTarget;
        this.viewer.vegaViewGl.signal(signalName, signalValue);
        this.viewer.vegaViewGl.runAsync().then(function () {
          //deeply set the state without a state change. This prevents a redraw if re-rendered
          if (_this3.state.signalValues) {
            _this3.state.signalValues[signalName] = signalValue;
          }

          _this3.discardColorContextUpdates = true;
          _this3.newViewStateTarget = undefined;
          _this3.props.onSignalChanged && _this3.props.onSignalChanged(signalName, signalValue);
        });
      }
    }, {
      key: "manageColorToolbar",
      value: function manageColorToolbar() {
        var _this4 = this;

        var canRemap = this.viewer.colorContexts && this.viewer.colorContexts.length > 1;
        (0, _colorMap.applyColorButtons)(this.viewer.presenter, !!this.state.columns.color, {
          themePalette: _themes.themePalettes[this.props.theme || ''],
          canRemap: canRemap,
          isRemap: canRemap && this.viewer.currentColorContext > 0,
          colorMapHandler: function colorMapHandler(remap) {
            _this4.viewer.currentColorContext = ~~remap;

            _this4.viewer.renderSameLayout();

            _this4.manageColorToolbar();
          }
        });
      }
    }, {
      key: "getInsight",
      value: function getInsight() {
        return this.viewer.getInsight();
      }
    }, {
      key: "setInsight",
      value: function setInsight(historyAction) {
        var _this5 = this;

        var newState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var partialInsight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.viewer.getInsight();
        var rebaseFilter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var selectedItemIndex = Object.assign({}, this.state.selectedItemIndex);
        selectedItemIndex[_dataScope.DataScopeId.AllData] = 0;
        selectedItemIndex[_dataScope.DataScopeId.FilteredData] = 0;
        selectedItemIndex[_dataScope.DataScopeId.SelectedData] = 0;
        var historicInsight = Object.assign({
          chart: null,
          scheme: null,
          columns: null,
          filter: null,
          rebaseFilter: rebaseFilter
        }, partialInsight);
        var state = Object.assign({
          filteredData: null,
          selectedItemIndex: selectedItemIndex,
          search: createInputSearch(historicInsight.filter)
        }, newState);

        var changeInsight = function changeInsight() {
          _this5.getColorContext = null;

          _this5.changeInsight(historicInsight, historyAction, state);
        };

        var currentFilter = this.viewer.getInsight().filter;

        if (rebaseFilter && currentFilter && historicInsight.filter) {
          if (_sanddanceReact.SandDance.searchExpression.startsWith(historicInsight.filter, currentFilter)) {
            changeInsight();
          } else {
            this.viewer.reset().then(function () {
              return new Promise(function (resolve, reject) {
                setTimeout(resolve, _this5.viewer.options.transitionDurations.scope);
              });
            }).then(changeInsight);
          }
        } else {
          changeInsight();
        }
      }
    }, {
      key: "handleReviveSnapshot",
      value: function handleReviveSnapshot(snapshot, selectedSnapshotIndex) {
        var handled = false;

        if (this.props.onSnapshotClick) {
          this.setState({
            selectedSnapshotIndex: selectedSnapshotIndex
          });
          handled = this.props.onSnapshotClick(snapshot, selectedSnapshotIndex);
        }

        if (!handled) {
          this.reviveSnapshot(selectedSnapshotIndex);
        }
      }
    }, {
      key: "reviveSnapshot",
      value: function reviveSnapshot(snapshotOrIndex) {
        if (typeof snapshotOrIndex === 'number') {
          var selectedSnapshotIndex = snapshotOrIndex;
          var snapshot = this.state.snapshots[selectedSnapshotIndex];
          var newState = {
            note: snapshot.description,
            selectedSnapshotIndex: selectedSnapshotIndex
          };

          if (!this.state.sidebarClosed) {
            newState.sideTabId = _interfaces.SideTabId.Snapshots;
            this.scrollSnapshotIntoView(selectedSnapshotIndex);
          }

          this.setInsight({
            label: _language.strings.labelHistoryReviveSnapshot
          }, newState, snapshot.insight, true);
        } else {
          var _snapshot = snapshotOrIndex;

          if (_snapshot.insight) {
            this.setInsight({
              label: _language.strings.labelHistoryReviveSnapshot
            }, {
              note: _snapshot.description,
              selectedSnapshotIndex: -1
            }, _snapshot.insight, true); //don't navigate to sideTab
          } else {
            this.setState({
              note: _snapshot.description,
              selectedSnapshotIndex: -1
            });
          }
        }
      }
    }, {
      key: "load",
      value: function load(data, getPartialInsight, optionsOrPrefs) {
        var _this6 = this;

        this.setState({
          historyIndex: -1,
          historyItems: []
        });
        this.changeInsight({
          columns: null
        }, {
          label: null,
          omit: true
        }, {
          note: null
        });
        return new Promise(function (resolve, reject) {
          var loadFinal = function loadFinal(dataContent) {
            var partialInsight;
            _this6.prefs = optionsOrPrefs && optionsOrPrefs.chartPrefs || optionsOrPrefs || {};

            if (getPartialInsight) {
              partialInsight = getPartialInsight(dataContent.columns);
              (0, _partialInsight.initPrefs)(_this6.prefs, partialInsight);
            }

            if (!partialInsight) {
              //load recommendation
              var r = new _chartRecommender.RecommenderSummary(dataContent.columns, dataContent.data);
              partialInsight = r.recommend();

              if (partialInsight.chart === 'barchart') {
                partialInsight.chart = 'barchartV';
              }
            }

            partialInsight = Object.assign({
              facetStyle: 'wrap',
              filter: null,
              totalStyle: null,
              transform: null
            }, partialInsight);
            var selectedItemIndex = Object.assign({}, _this6.state.selectedItemIndex);
            var sideTabId = _interfaces.SideTabId.ChartType;
            selectedItemIndex[_dataScope.DataScopeId.AllData] = 0;
            selectedItemIndex[_dataScope.DataScopeId.FilteredData] = 0;
            selectedItemIndex[_dataScope.DataScopeId.SelectedData] = 0;
            var newState = Object.assign({
              dataFile: dataFile,
              dataContent: dataContent,
              snapshots: dataContent.snapshots || _this6.state.snapshots,
              autoCompleteDistinctValues: {},
              filteredData: null,
              tooltipExclusions: optionsOrPrefs && optionsOrPrefs.tooltipExclusions || [],
              selectedItemIndex: selectedItemIndex,
              sideTabId: sideTabId
            }, partialInsight);
            _this6.getColorContext = null;
            (0, _columns.ensureColumnsExist)(newState.columns, dataContent.columns, newState.transform);
            var errors = (0, _columns.ensureColumnsPopulated)(partialInsight ? partialInsight.chart : null, newState.columns, dataContent.columns);
            newState.errors = errors; //change insight

            _this6.changeInsight(partialInsight, {
              label: _language.strings.labelHistoryInit,
              insert: true
            }, newState); //make sure item is active


            _this6.activateDataBrowserItem(sideTabId, _this6.state.dataScopeId);

            resolve();
          };

          var dataFile;

          if (Array.isArray(data)) {
            return (0, _dataLoader.loadDataArray)(data, 'json').then(function (result) {
              dataFile = {
                type: 'json'
              };
              loadFinal(result);
            }).catch(reject);
          } else {
            dataFile = data;
            return (0, _dataLoader.loadDataFile)(dataFile).then(loadFinal).catch(reject);
          }
        });
      }
    }, {
      key: "changeChartType",
      value: function changeChartType(chart) {
        var _this7 = this;

        var partialInsight = (0, _partialInsight.copyPrefToNewState)(this.prefs, chart, '*', '*');
        var insight = Object.assign({
          chart: chart
        }, partialInsight);

        var columns = _sanddanceReact.SandDance.VegaDeckGl.util.deepMerge({}, partialInsight.columns, this.state.columns);

        insight.columns = Object.assign({}, columns); //special case mappings when switching chart type

        if (this.state.chart === 'scatterplot' && (chart === 'barchart' || chart === 'barchartV')) {
          insight.columns = Object.assign(Object.assign({}, columns), {
            sort: columns.y
          });
        } else if (this.state.chart === 'scatterplot' && chart === 'barchartH') {
          insight.columns = Object.assign(Object.assign({}, columns), {
            sort: columns.x
          });
        } else if (chart === 'treemap') {
          insight.view = '2d';

          if (!columns.size) {
            //make sure size exists and is numeric
            var sizeColumnName; //first check prefs

            if (partialInsight && partialInsight.columns && partialInsight.columns.size) {
              var prefSizeColumn = this.state.dataContent.columns.filter(function (c) {
                return c.name === partialInsight.columns.size;
              })[0];

              if (prefSizeColumn && prefSizeColumn.quantitative) {
                sizeColumnName = prefSizeColumn.name;
              }
            }

            if (!sizeColumnName) {
              sizeColumnName = (0, _chartRecommender.preferredColumnForTreemapSize)(this.state.dataContent.columns, true);
            }

            if (!sizeColumnName) {
              sizeColumnName = (0, _chartRecommender.preferredColumnForTreemapSize)(this.state.dataContent.columns, false);
            }

            if (!sizeColumnName) {//TODO error - no numeric columns
            } else {
              insight.columns = Object.assign(Object.assign({}, columns), {
                size: sizeColumnName
              });
            }
          }
        } else if (chart === 'stacks') {
          insight.view = '3d';
        } else if (chart === 'scatterplot' && this.state.columns.size) {
          var _this$viewer$getInsig = this.viewer.getInsight(),
              signalValues = _this$viewer$getInsig.signalValues;

          signalValues[_sanddanceReact.SandDance.specs.SignalNames.PointScale] = 1;
          insight.signalValues = signalValues;
        }

        (0, _columns.ensureColumnsExist)(insight.columns, this.state.dataContent.columns, this.state.transform);
        var errors = (0, _columns.ensureColumnsPopulated)(chart, insight.columns, this.state.dataContent.columns);
        this.calculate(function () {
          _this7.changeInsight(insight, {
            label: _language.strings.labelHistoryChangeChartType((0, _chart.chartLabel)(chart))
          }, errors ? {
            errors: errors
          } : null);
        });
      }
    }, {
      key: "calculate",
      value: function calculate(calculating) {
        this.setState({
          calculating: calculating
        });
      }
    }, {
      key: "changeView",
      value: function changeView(view) {
        this.changeInsight({
          view: view
        }, {
          label: view === '2d' ? _language.strings.labelViewType2d : _language.strings.labelViewType3d
        });
      } //state members which change the insight

    }, {
      key: "changeInsight",
      value: function changeInsight(partialInsight, historyAction, additionalUIState) {
        if (!partialInsight.signalValues) {
          partialInsight.signalValues = null;
        }

        if (partialInsight.chart === 'barchart') {
          partialInsight.chart = 'barchartV';
        }

        this.addHistory(partialInsight, historyAction, additionalUIState);
      }
    }, {
      key: "addHistory",
      value: function addHistory(historicInsight, historyAction, additionalUIState) {
        var _this8 = this;

        var setCleanState = function setCleanState(newState) {
          var cleanState = Object.assign(Object.assign({}, newState), additionalUIState);

          if (!cleanState.note) {
            cleanState.note = null;
          }

          delete cleanState.rebaseFilter;

          _this8.setState(cleanState);
        };

        if (historyAction.omit) {
          setCleanState(historicInsight);
          return;
        }

        var historyItems = this.state.historyItems.slice(0, this.state.historyIndex + 1);
        var historyIndex = historyItems.length;
        historyItems.push({
          label: historyAction.label,
          historicInsight: historicInsight
        });

        if (historyAction.insert) {
          setCleanState({
            historyIndex: historyIndex,
            historyItems: historyItems
          });
        } else {
          setCleanState(Object.assign(Object.assign({}, historicInsight), {
            historyIndex: historyIndex,
            historyItems: historyItems
          }));
        }
      }
    }, {
      key: "replay",
      value: function replay(index) {
        var filter = null;
        var historicInsight = {};

        for (var i = 0; i < index + 1; i++) {
          var historyItem = this.state.historyItems[i];

          if (historyItem) {
            if (historyItem.historicInsight.filter === null) {
              filter = null;
            } else if (historyItem.historicInsight.rebaseFilter) {
              filter = historyItem.historicInsight.filter;
            } else if (historyItem.historicInsight.filter) {
              filter = _sanddanceReact.SandDance.searchExpression.narrow(filter, historyItem.historicInsight.filter);
            }

            historicInsight = Object.assign(Object.assign({}, historicInsight), historyItem.historicInsight);
          }
        }

        return Object.assign(Object.assign({}, historicInsight), {
          filter: filter
        });
      }
    }, {
      key: "undo",
      value: function undo() {
        var historyIndex = this.state.historyIndex - 1;
        if (historyIndex < 0) return;
        var newState = this.replay(historyIndex);
        this.rebaseFilter = true;
        this.setState(Object.assign(Object.assign({}, newState), {
          historyIndex: historyIndex
        }));
      }
    }, {
      key: "redo",
      value: function redo() {
        var historyIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.historyIndex + 1;
        if (historyIndex >= this.state.historyItems.length) return;
        var newState = this.replay(historyIndex);
        this.rebaseFilter = true;
        this.setState(Object.assign(Object.assign({}, newState), {
          historyIndex: historyIndex
        }));
      }
    }, {
      key: "changespecCapabilities",
      value: function changespecCapabilities(specCapabilities) {
        this.setState({
          specCapabilities: specCapabilities
        });
      }
    }, {
      key: "changeColumnMapping",
      value: function changeColumnMapping(role, column, options) {
        var _this9 = this;

        var columns = Object.assign({}, this.state.columns);
        var label = column ? _language.strings.labelHistoryMapColumn(role) : _language.strings.labelHistoryUnMapColumn(role);

        var final = function final() {
          columns[role] = column && column.name;

          _this9.changeInsight({
            columns: columns
          }, {
            label: label
          });
        };

        var _changeInsight = function _changeInsight(newInsight, columnUpdate, historyAction) {
          newInsight.columns = _sanddanceReact.SandDance.VegaDeckGl.util.deepMerge({}, columns, columnUpdate);
          (0, _partialInsight.savePref)(_this9.prefs, _this9.state.chart, '*', '*', {
            columns: columnUpdate
          });

          _this9.changeInsight(newInsight, historyAction);
        };

        if (column) {
          var columnUpdate;

          switch (role) {
            case 'facet':
              {
                (0, _partialInsight.copyPrefToNewState)(this.prefs, this.state.chart, 'facet', column.name);
                var historicInsight = {
                  columns: columns,
                  facetStyle: options ? options.facetStyle : this.state.facetStyle
                };
                columnUpdate = {
                  facet: column.name
                };

                _changeInsight(historicInsight, columnUpdate, {
                  label: label
                });

                break;
              }

            case 'color':
              {
                var calculating = null;
                var _historicInsight = {
                  scheme: options && options.scheme,
                  columns: columns,
                  colorBin: this.state.colorBin
                };

                if (!_historicInsight.scheme) {
                  (0, _partialInsight.copyPrefToNewState)(this.prefs, this.state.chart, 'color', column.name);
                }

                if (!_historicInsight.scheme) {
                  _historicInsight.scheme = (0, _colorScheme.bestColorScheme)(column, null, this.state.scheme);
                }

                if (!column.stats.hasColorData) {
                  _historicInsight.directColor = false;

                  if (this.state.directColor !== _historicInsight.directColor) {
                    calculating = function calculating() {
                      return _this9._resize();
                    };
                  }
                }

                if (this.state.columns && this.state.columns.color && this.state.columns.color !== column.name) {
                  var currColorColumn = this.state.dataContent.columns.filter(function (c) {
                    return c.name === _this9.state.columns.color;
                  })[0];

                  if (column.isColorData != currColorColumn.isColorData) {
                    calculating = function calculating() {
                      return _this9._resize();
                    };
                  }
                }

                this.ignoreSelectionChange = true;
                this.viewer.deselect().then(function () {
                  _this9.ignoreSelectionChange = false; //allow deselection to render

                  requestAnimationFrame(function () {
                    columnUpdate = {
                      color: column.name
                    };
                    _this9.getColorContext = null;

                    _this9.setState({
                      calculating: calculating
                    });

                    _changeInsight(_historicInsight, columnUpdate, {
                      label: label
                    });
                  });
                });
                break;
              }

            case 'x':
              {
                (0, _partialInsight.copyPrefToNewState)(this.prefs, this.state.chart, 'x', column.name);
                var _historicInsight2 = {
                  columns: columns
                };
                columnUpdate = {
                  x: column.name
                };

                _changeInsight(_historicInsight2, columnUpdate, {
                  label: label
                });

                break;
              }

            case 'size':
              {
                (0, _partialInsight.copyPrefToNewState)(this.prefs, this.state.chart, 'size', column.name);
                var _historicInsight3 = {
                  totalStyle: options ? options.totalStyle : this.state.totalStyle
                };
                columnUpdate = {
                  size: column.name
                };

                _changeInsight(_historicInsight3, columnUpdate, {
                  label: label
                });

                break;
              }

            default:
              {
                final();
                break;
              }
          }
        } else {
          switch (role) {
            case 'facet':
              {
                columns.facet = null;
                columns.facetV = null;
                this.changeInsight({
                  columns: columns,
                  facetStyle: 'wrap'
                }, {
                  label: label
                });
                break;
              }

            default:
              {
                final();
                break;
              }
          }
        }
      }
    }, {
      key: "setSideTabId",
      value: function setSideTabId(sideTabId, dataScopeId) {
        if (sideTabId === _interfaces.SideTabId.Data && dataScopeId == null) {
          //choose most relevant DataScopeId
          dataScopeId = this.getBestDataScopeId();
        }

        if (dataScopeId == null) {
          dataScopeId = this.state.dataScopeId;
        }

        this.setState({
          sideTabId: sideTabId,
          dataScopeId: dataScopeId,
          sidebarClosed: false
        });
        this.activateDataBrowserItem(sideTabId, dataScopeId);
      }
    }, {
      key: "getBestDataScopeId",
      value: function getBestDataScopeId() {
        var dataScopeId;
        var selectionState = this.viewer && this.viewer.getSelection();

        if (selectionState && selectionState.selectedData && selectionState.selectedData.length) {
          dataScopeId = _dataScope.DataScopeId.SelectedData;
        } else if (this.state.filteredData) {
          dataScopeId = _dataScope.DataScopeId.FilteredData;
        } else {
          dataScopeId = _dataScope.DataScopeId.AllData;
        }

        return dataScopeId;
      }
    }, {
      key: "activateDataBrowserItem",
      value: function activateDataBrowserItem(sideTabId, dataScopeId) {
        if (!this.viewer) return;
        var itemToActivate;

        if (sideTabId === _interfaces.SideTabId.Data) {
          switch (dataScopeId) {
            case _dataScope.DataScopeId.AllData:
              {
                itemToActivate = this.state.dataContent && this.state.dataContent.data[this.state.selectedItemIndex[_dataScope.DataScopeId.AllData]];
                break;
              }

            case _dataScope.DataScopeId.FilteredData:
              {
                itemToActivate = this.state.filteredData && this.state.filteredData[this.state.selectedItemIndex[_dataScope.DataScopeId.FilteredData]];
                break;
              }

            case _dataScope.DataScopeId.SelectedData:
              {
                var selection = this.viewer.getSelection() || {};
                itemToActivate = selection.selectedData && selection.selectedData[this.state.selectedItemIndex[_dataScope.DataScopeId.SelectedData]];
                break;
              }
          }
        }

        this.silentActivation(itemToActivate);
      }
    }, {
      key: "silentActivation",
      value: function silentActivation(itemToActivate) {
        var _this10 = this;

        this.ignoreSelectionChange = true;

        var done = function done() {
          _this10.ignoreSelectionChange = false;
        };

        if (itemToActivate) {
          return this.viewer.activate(itemToActivate).then(done);
        } else {
          return this.viewer.deActivate().then(done);
        }
      }
    }, {
      key: "sidebar",
      value: function sidebar(sidebarClosed, sidebarPinned) {
        this.setState({
          sidebarClosed: sidebarClosed,
          sidebarPinned: sidebarPinned
        });
      }
    }, {
      key: "resize",
      value: function resize() {
        var _this11 = this;

        this.setState({
          calculating: function calculating() {
            return _this11._resize();
          }
        });
      }
    }, {
      key: "_resize",
      value: function _resize() {
        this.changeInsight({
          size: this.getLayoutDivSize(this.state.sidebarPinned, this.state.sidebarClosed)
        }, {
          label: 'resize',
          omit: true
        });
      }
    }, {
      key: "viewerMounted",
      value: function viewerMounted(glDiv) {
        this.setState({
          size: this.getLayoutDivSize(this.state.sidebarPinned, this.state.sidebarClosed),
          signalValues: this.state.signalValues //keep initialized signalValues

        });
      }
    }, {
      key: "getLayoutDivSize",
      value: function getLayoutDivSize(pinned, closed) {
        var div = pinned && !closed ? this.layoutDivPinned : this.layoutDivUnpinned;
        return {
          height: div.offsetHeight,
          width: div.offsetWidth
        };
      }
    }, {
      key: "toggleableSearch",
      value: function toggleableSearch(e, search) {
        if (e.ctrlKey) {
          this.setState({
            search: createInputSearch(search)
          });
          this.setSideTabId(_interfaces.SideTabId.Search);
        } else {
          var oldSelection = this.viewer.getSelection();

          if (oldSelection.search) {
            //look for matching groups and toggle them
            var result = (0, _toggleSearch.toggleSearch)(_sanddanceReact.SandDance.searchExpression.ensureSearchExpressionGroupArray(oldSelection.search), search);

            if (result.found) {
              //removing a group
              if (result.groups.length === 0) {
                this.doDeselect();
              } else {
                //select with new search removed
                this.doSelect(result.groups);
              }
            } else {
              //adding a new group
              if (e.altKey || e.shiftKey) {
                var group = true;

                if (e.altKey) {
                  search.clause = '&&';
                } else if (e.shiftKey) {
                  if (this.props.searchORDisabled) {
                    group = false;
                  } else {
                    search.clause = '||';
                  }
                }

                if (group) {
                  result.groups.push(search);
                  this.doSelect(result.groups);
                } else {
                  this.doSelect(search);
                }
              } else {
                //replace
                this.doSelect(search);
              }
            }
          } else {
            this.doSelect(search);
          }
        }
      }
    }, {
      key: "doFilter",
      value: function doFilter(search, historicFilterChange) {
        this.historicFilterChange = historicFilterChange;
        this.viewer.filter(search);
      }
    }, {
      key: "doUnfilter",
      value: function doUnfilter(historicFilterChange) {
        this.historicFilterChange = historicFilterChange;
        this.viewer.reset();
      }
    }, {
      key: "doSelect",
      value: function doSelect(search) {
        this.viewer.select(search);
      }
    }, {
      key: "doDeselect",
      value: function doDeselect() {
        return this.viewer.deselect();
      }
    }, {
      key: "writeSnapshot",
      value: function writeSnapshot(snapshot, editIndex) {
        var selectedSnapshotIndex = this.state.selectedSnapshotIndex;
        var snapshots;

        if (editIndex >= 0) {
          snapshots = _toConsumableArray(this.state.snapshots);
          snapshots[editIndex] = snapshot;
          this.setState({
            snapshots: snapshots,
            selectedSnapshotIndex: selectedSnapshotIndex
          });
        } else {
          var note = snapshot.description;
          snapshots = this.state.snapshots.concat(snapshot);
          selectedSnapshotIndex = snapshots.length - 1;
          this.scrollSnapshotIntoView(selectedSnapshotIndex);
          this.setState({
            sideTabId: _interfaces.SideTabId.Snapshots,
            snapshots: snapshots,
            selectedSnapshotIndex: selectedSnapshotIndex,
            note: note
          });
        }

        this.props.onSnapshotsChanged && this.props.onSnapshotsChanged(snapshots);
      }
    }, {
      key: "scrollSnapshotIntoView",
      value: function scrollSnapshotIntoView(selectedSnapshotIndex) {
        var _this12 = this;

        clearTimeout(this.scrollSnapshotTimer);
        if (this.state.sidebarClosed) return;
        this.scrollSnapshotTimer = setTimeout(function () {
          var selectedSnapshotElement = _this12.div.querySelector(".snapshot:nth-child(".concat(selectedSnapshotIndex + 1, ")"));

          if (selectedSnapshotElement) {
            selectedSnapshotElement.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            });
          }
        }, 500);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.mounted) {
          this.props.mounted(this);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this13 = this;

        var _this$state = this.state,
            colorBin = _this$state.colorBin,
            columns = _this$state.columns,
            directColor = _this$state.directColor,
            facetStyle = _this$state.facetStyle,
            filter = _this$state.filter,
            hideAxes = _this$state.hideAxes,
            hideLegend = _this$state.hideLegend,
            scheme = _this$state.scheme,
            signalValues = _this$state.signalValues,
            size = _this$state.size,
            totalStyle = _this$state.totalStyle,
            transform = _this$state.transform,
            chart = _this$state.chart,
            view = _this$state.view;
        var insight = {
          colorBin: colorBin,
          columns: columns,
          directColor: directColor,
          facetStyle: facetStyle,
          filter: filter,
          hideAxes: hideAxes,
          hideLegend: hideLegend,
          scheme: scheme,
          signalValues: signalValues,
          size: size,
          totalStyle: totalStyle,
          transform: transform,
          chart: chart,
          view: view
        };
        var loaded = !!(this.state.columns && this.state.dataContent);
        var selectionState = this.viewer && this.viewer.getSelection() || {};
        var selectionSearch = selectionState && selectionState.search;
        var columnMapProps = this.getColumnMapBaseProps();
        var datas = {};
        datas[_dataScope.DataScopeId.AllData] = this.state.dataContent && this.state.dataContent.data;
        datas[_dataScope.DataScopeId.FilteredData] = this.state.filteredData;
        datas[_dataScope.DataScopeId.SelectedData] = selectionState && selectionState.selectedData;

        if (this.state.calculating) {
          requestAnimationFrame(function () {
            //allow render to complete
            if (_this13.state.calculating) {
              _this13.state.calculating();

              _this13.setState({
                calculating: null
              });
            }
          });
        }

        var theme = this.props.theme || '';
        var themePalette = _themes.themePalettes[theme];
        return _base.base.react.createElement("div", {
          ref: function ref(div) {
            if (div) _this13.div = div;
          },
          className: _sanddanceReact.util.classList('sanddance-explorer', this.props.theme)
        }, _base.base.react.createElement(_topbar.Topbar, {
          collapseLabels: this.props.compactUI,
          historyIndex: this.state.historyIndex,
          historyItems: this.state.historyItems,
          undo: function undo() {
            return _this13.undo();
          },
          redo: function redo() {
            return _this13.redo();
          },
          logoClickUrl: this.props.logoClickUrl,
          logoClickTarget: this.props.logoClickTarget,
          themePalette: themePalette,
          loaded: loaded,
          doDeselect: this.doDeselect.bind(this),
          doFilter: this.doFilter.bind(this),
          doUnfilter: this.doUnfilter.bind(this),
          filter: this.state.filter,
          selectionSearch: selectionSearch,
          selectionState: selectionState,
          buttons: this.props.topBarButtonProps,
          view: this.state.view,
          snapshots: this.state.snapshots,
          onSnapshotPreviousClick: function onSnapshotPreviousClick() {
            var selectedSnapshotIndex;

            if (_this13.state.selectedSnapshotIndex === -1) {
              selectedSnapshotIndex = _this13.state.snapshots.length - 1;
            } else {
              selectedSnapshotIndex = _this13.state.selectedSnapshotIndex;
              selectedSnapshotIndex--;

              if (selectedSnapshotIndex < 0) {
                selectedSnapshotIndex = _this13.state.snapshots.length - 1;
              }
            }

            _this13.handleReviveSnapshot(_this13.state.snapshots[selectedSnapshotIndex], selectedSnapshotIndex);
          },
          onSnapshotClick: function onSnapshotClick() {
            return _this13.snapshotEditor.editSnapshot();
          },
          onSnapshotNextClick: function onSnapshotNextClick() {
            var selectedSnapshotIndex;

            if (_this13.state.selectedSnapshotIndex === -1) {
              selectedSnapshotIndex = 0;
            } else {
              selectedSnapshotIndex = _this13.state.selectedSnapshotIndex;
              selectedSnapshotIndex++;

              if (selectedSnapshotIndex > _this13.state.snapshots.length - 1) {
                selectedSnapshotIndex = 0;
              }
            }

            _this13.handleReviveSnapshot(_this13.state.snapshots[selectedSnapshotIndex], selectedSnapshotIndex);
          },
          onViewClick: function onViewClick() {
            var view = _this13.state.view === '2d' ? '3d' : '2d';

            _this13.changeInsight({
              view: view
            }, {
              label: view === '2d' ? _language.strings.labelViewType2d : _language.strings.labelViewType3d
            });
          },
          onHomeClick: function onHomeClick() {
            return _this13.viewer.presenter.homeCamera();
          }
        }), _base.base.react.createElement("div", {
          className: _sanddanceReact.util.classList('sanddance-main', this.state.sidebarPinned && 'pinned', this.state.sidebarClosed && 'closed', (insight.hideLegend || insight.directColor || !colorMapping(insight, this.state.dataContent && this.state.dataContent.columns)) && 'hide-legend')
        }, _base.base.react.createElement("div", {
          ref: function ref(div) {
            if (div && !_this13.layoutDivUnpinned) _this13.layoutDivUnpinned = div;
          },
          className: "sanddance-layout-unpinned"
        }), _base.base.react.createElement("div", {
          ref: function ref(div) {
            if (div && !_this13.layoutDivPinned) _this13.layoutDivPinned = div;
          },
          className: "sanddance-layout-pinned"
        }), !loaded && _base.base.react.createElement("div", {
          className: "loading"
        }, _base.base.react.createElement(_base.base.fluentUI.Spinner, {
          size: _base.base.fluentUI.SpinnerSize.large,
          label: _language.strings.loading
        })), _base.base.react.createElement(_sidebar.Sidebar, {
          themePalette: themePalette,
          calculating: !!this.state.calculating,
          closed: this.state.sidebarClosed,
          hideSidebarControls: this.props.hideSidebarControls,
          pinned: this.state.sidebarPinned,
          disabled: !loaded,
          dataScopeProps: {
            themePalette: themePalette,
            compact: this.state.sidebarClosed,
            onCompactClick: function onCompactClick() {
              _this13.changeInsight({
                size: _this13.getLayoutDivSize(_this13.state.sidebarPinned, false)
              }, {
                label: null,
                omit: true
              }, {
                sidebarClosed: false
              });
            },
            dataSet: this.props.datasetElement,
            dataCount: loaded && {
              all: this.state.dataContent && this.state.dataContent.data.length,
              filtered: this.state.filteredData && this.state.filteredData.length,
              selected: selectionState && selectionState.selectedData && selectionState.selectedData.length
            },
            active: this.state.sideTabId === _interfaces.SideTabId.Data,
            onDataScopeClick: function onDataScopeClick(dataScopeId) {
              return _this13.setSideTabId(_interfaces.SideTabId.Data, dataScopeId);
            },
            selectedDataScope: this.state.dataScopeId,
            disabled: !loaded
          },
          onSideTabClick: function onSideTabClick(sideTabId) {
            //collapse or toggle
            if (sideTabId === _interfaces.SideTabId.Collapse || _this13.state.sideTabId === sideTabId) {
              var _this13$state = _this13.state,
                  dataScopeId = _this13$state.dataScopeId,
                  sidebarClosed = _this13$state.sidebarClosed;

              if (sidebarClosed && sideTabId === _interfaces.SideTabId.Data) {
                dataScopeId = _this13.getBestDataScopeId();
              }

              sidebarClosed = !_this13.state.sidebarClosed;

              _this13.changeInsight({
                size: _this13.getLayoutDivSize(_this13.state.sidebarPinned, sidebarClosed)
              }, {
                label: null,
                omit: true
              }, {
                dataScopeId: dataScopeId,
                sidebarClosed: sidebarClosed
              });
            } else if (sideTabId === _interfaces.SideTabId.Pin) {
              _this13.changeInsight({
                size: _this13.getLayoutDivSize(!_this13.state.sidebarPinned, _this13.state.sidebarClosed)
              }, {
                label: null,
                omit: true
              }, {
                sidebarPinned: !_this13.state.sidebarPinned
              });
            } else {
              _this13.setSideTabId(sideTabId);
            }
          },
          selectedSideTab: this.state.sideTabId
        }, loaded && function () {
          switch (_this13.state.sideTabId) {
            case _interfaces.SideTabId.ChartType:
              {
                return _base.base.react.createElement(_chart.Chart, Object.assign({
                  collapseLabels: _this13.props.compactUI,
                  tooltipExclusions: _this13.state.tooltipExclusions,
                  toggleTooltipExclusion: function toggleTooltipExclusion(columnName) {
                    var tooltipExclusions = _toConsumableArray(_this13.state.tooltipExclusions);

                    var i = tooltipExclusions.indexOf(columnName);

                    if (i < 0) {
                      tooltipExclusions.push(columnName);
                    } else {
                      tooltipExclusions.splice(i, 1);
                    }

                    _this13.setState({
                      tooltipExclusions: tooltipExclusions
                    });

                    _this13.props.onTooltipExclusionsChanged && _this13.props.onTooltipExclusionsChanged(tooltipExclusions);
                  },
                  disabled: !loaded || _this13.state.sidebarClosed
                }, columnMapProps, {
                  chart: _this13.state.chart,
                  view: _this13.state.view,
                  onChangeChartType: function onChangeChartType(chart) {
                    return _this13.changeChartType(chart);
                  },
                  insightColumns: _this13.state.columns,
                  onChangeSignal: function onChangeSignal(role, column, name, value) {
                    return (0, _partialInsight.saveSignalValuePref)(_this13.prefs, _this13.state.chart, role, column, name, value);
                  }
                }));
              }

            case _interfaces.SideTabId.Color:
              {
                return _base.base.react.createElement(_color.Color, Object.assign({
                  compactUI: _this13.props.compactUI,
                  specCapabilities: _this13.state.specCapabilities,
                  disabled: !loaded || _this13.state.sidebarClosed
                }, columnMapProps, {
                  dataContent: _this13.state.dataContent,
                  scheme: _this13.state.scheme,
                  colorBin: _this13.state.colorBin,
                  colorBinSignal: _this13.viewer && _this13.viewer.vegaSpec && _this13.viewer.vegaSpec.signals.filter(function (s) {
                    return s.name === _sanddanceReact.SandDance.constants.SignalNames.ColorBinCount;
                  })[0],
                  colorReverseSignal: _this13.viewer && _this13.viewer.vegaSpec && _this13.viewer.vegaSpec.signals.filter(function (s) {
                    return s.name === _sanddanceReact.SandDance.constants.SignalNames.ColorReverse;
                  })[0],
                  colorColumn: _this13.state.columns.color,
                  onColorBinChange: function onColorBinChange(colorBin) {
                    _this13.ignoreSelectionChange = true;

                    _this13.viewer.deselect().then(function () {
                      _this13.ignoreSelectionChange = false; //allow deselection to render

                      requestAnimationFrame(function () {
                        _this13.getColorContext = null;

                        _this13.changeInsight({
                          colorBin: colorBin
                        }, {
                          label: _language.strings.labelHistoryColorBin
                        });

                        (0, _partialInsight.savePref)(_this13.prefs, _this13.state.chart, 'color', _this13.state.columns.color, {
                          colorBin: colorBin
                        });
                      });
                    });
                  },
                  onColorSchemeChange: function onColorSchemeChange(scheme) {
                    _this13.changeColumnMapping('color', _this13.state.dataContent.columns.filter(function (c) {
                      return c.name === _this13.state.columns.color;
                    })[0], {
                      scheme: scheme
                    });

                    (0, _partialInsight.savePref)(_this13.prefs, _this13.state.chart, 'color', _this13.state.columns.color, {
                      scheme: scheme
                    });
                  },
                  onColorBinCountChange: function onColorBinCountChange(value) {
                    var signalValues = {};
                    signalValues[_sanddanceReact.SandDance.constants.SignalNames.ColorBinCount] = value;
                    (0, _partialInsight.savePref)(_this13.prefs, _this13.state.chart, 'color', _this13.state.columns.color, {
                      signalValues: signalValues
                    });
                  },
                  onColorReverseChange: function onColorReverseChange(value) {
                    _this13.getColorContext = null;
                  },
                  directColor: _this13.state.directColor,
                  onDirectColorChange: function onDirectColorChange(directColor) {
                    _this13.changeInsight({
                      directColor: directColor
                    }, {
                      label: _language.strings.labelHistoryDirectColor
                    }, {
                      calculating: function calculating() {
                        return _this13._resize();
                      }
                    });
                  }
                }));
              }

            case _interfaces.SideTabId.Data:
              {
                var data = datas[_this13.state.dataScopeId];
                var itemVisible = true;

                switch (_this13.state.dataScopeId) {
                  case _dataScope.DataScopeId.AllData:
                    {
                      var item = _this13.state.selectedItemIndex[_this13.state.dataScopeId];
                      itemVisible = _this13.state.dataContent && !_this13.state.filteredData || _this13.state.filteredData.indexOf(data[item]) >= 0;
                    }
                }

                return _base.base.react.createElement(_dataBrowser.DataBrowser, {
                  theme: _this13.props.theme,
                  themePalette: themePalette,
                  disabled: !loaded || _this13.state.sidebarClosed,
                  columns: _this13.state.dataContent && _this13.state.dataContent.columns,
                  data: data,
                  displayName: _this13.state.dataFile && _this13.state.dataFile.displayName || _language.strings.defaultFileName,
                  nullMessage: dataBrowserNullMessages[_this13.state.dataScopeId],
                  zeroMessage: dataBrowserZeroMessages[_this13.state.dataScopeId],
                  index: _this13.state.selectedItemIndex[_this13.state.dataScopeId],
                  itemVisible: itemVisible,
                  dataExportHandler: _this13.props.dataExportHandler,
                  selectedDataScope: _this13.state.dataScopeId,
                  onDataScopeClick: function onDataScopeClick(dataScopeId) {
                    return _this13.setSideTabId(_interfaces.SideTabId.Data, dataScopeId);
                  },
                  onActivate: function onActivate(row, index) {
                    var selectedItemIndex = Object.assign({}, _this13.state.selectedItemIndex);
                    selectedItemIndex[_this13.state.dataScopeId] = index;

                    _this13.setState({
                      selectedItemIndex: selectedItemIndex
                    });

                    _this13.silentActivation(row);
                  },
                  onSearch: function onSearch(e, search) {
                    if (e.ctrlKey) {
                      _this13.setState({
                        sideTabId: _interfaces.SideTabId.Search,
                        search: search
                      });
                    } else {
                      _this13.doSelect(search);
                    }
                  },
                  bingSearchDisabled: _this13.props.bingSearchDisabled
                });
              }

            case _interfaces.SideTabId.Search:
              {
                return _base.base.react.createElement(_search.Search, {
                  collapseLabels: _this13.props.compactUI,
                  themePalette: themePalette,
                  disabled: !loaded || _this13.state.sidebarClosed,
                  disableGroupOR: _this13.props.searchORDisabled,
                  disableExpressionOR: _this13.props.searchORDisabled,
                  initializer: {
                    columns: columnMapProps.allColumns,
                    search: _this13.state.search
                  },
                  autoCompleteDistinctValues: _this13.state.autoCompleteDistinctValues,
                  onSelect: function onSelect(expr) {
                    return _this13.doSelect(expr);
                  },
                  data: _this13.state.dataContent.data
                });
              }

            case _interfaces.SideTabId.Snapshots:
              {
                return _base.base.react.createElement(_snapshots.Snapshots, Object.assign({}, _this13.props.snapshotProps, {
                  editor: _this13.snapshotEditor,
                  themePalette: themePalette,
                  explorer: _this13,
                  snapshots: _this13.state.snapshots,
                  selectedSnapshotIndex: _this13.state.selectedSnapshotIndex,
                  onClearSnapshots: function onClearSnapshots() {
                    var snapshots = [];

                    _this13.setState({
                      snapshots: snapshots,
                      selectedSnapshotIndex: -1
                    });

                    _this13.props.onSnapshotsChanged && _this13.props.onSnapshotsChanged(snapshots);
                  },
                  onWriteSnapshot: function onWriteSnapshot(s, i) {
                    return _this13.writeSnapshot(s, i);
                  },
                  onRemoveSnapshot: function onRemoveSnapshot(i) {
                    var snapshots = _toConsumableArray(_this13.state.snapshots);

                    snapshots.splice(i, 1);
                    var selectedSnapshotIndex = _this13.state.selectedSnapshotIndex;

                    if (i === selectedSnapshotIndex) {
                      selectedSnapshotIndex = -1;
                    } else if (selectedSnapshotIndex > i) {
                      selectedSnapshotIndex--;
                    }

                    _this13.setState({
                      snapshots: snapshots,
                      selectedSnapshotIndex: selectedSnapshotIndex
                    });

                    _this13.props.onSnapshotsChanged && _this13.props.onSnapshotsChanged(snapshots);
                  },
                  onSnapshotClick: function onSnapshotClick(snapshot, selectedSnapshotIndex) {
                    _this13.setState({
                      selectedSnapshotIndex: selectedSnapshotIndex
                    });

                    _this13.calculate(function () {
                      _this13.handleReviveSnapshot(snapshot, selectedSnapshotIndex);
                    });
                  },
                  onMoveUp: function onMoveUp(i) {
                    if (i > 0) {
                      var snapshots = _toConsumableArray(_this13.state.snapshots);

                      var temp = snapshots[i - 1];
                      snapshots[i - 1] = snapshots[i];
                      snapshots[i] = temp;
                      var selectedSnapshotIndex = _this13.state.selectedSnapshotIndex;

                      if (i === selectedSnapshotIndex) {
                        selectedSnapshotIndex = i - 1;
                      } else if (i - 1 === selectedSnapshotIndex) {
                        selectedSnapshotIndex = i;
                      }

                      _this13.setState({
                        snapshots: snapshots,
                        selectedSnapshotIndex: selectedSnapshotIndex
                      });

                      _this13.props.onSnapshotsChanged && _this13.props.onSnapshotsChanged(snapshots);
                    }
                  },
                  onMoveDown: function onMoveDown(i) {
                    if (i < _this13.state.snapshots.length - 1) {
                      var snapshots = _toConsumableArray(_this13.state.snapshots);

                      var temp = snapshots[i + 1];
                      snapshots[i + 1] = snapshots[i];
                      snapshots[i] = temp;
                      var selectedSnapshotIndex = _this13.state.selectedSnapshotIndex;

                      if (i === selectedSnapshotIndex) {
                        selectedSnapshotIndex = i + 1;
                      } else if (i + 1 === selectedSnapshotIndex) {
                        selectedSnapshotIndex = i;
                      }

                      _this13.setState({
                        snapshots: snapshots,
                        selectedSnapshotIndex: selectedSnapshotIndex
                      });

                      _this13.props.onSnapshotsChanged && _this13.props.onSnapshotsChanged(snapshots);
                    }
                  }
                }));
              }

            case _interfaces.SideTabId.History:
              {
                return _base.base.react.createElement(_history.History, {
                  theme: theme,
                  themePalette: themePalette,
                  historyIndex: _this13.state.historyIndex,
                  historyItems: _this13.state.historyItems,
                  redo: function redo(i) {
                    return _this13.redo(i);
                  }
                });
              }

            case _interfaces.SideTabId.Settings:
              {
                return _base.base.react.createElement(_settings.Settings, {
                  explorer: _this13,
                  dataFile: _this13.state.dataFile,
                  scheme: _this13.state.scheme,
                  hideLegend: _this13.state.hideLegend,
                  onToggleLegend: function onToggleLegend(hideLegend) {
                    return _this13.setState({
                      hideLegend: hideLegend,
                      calculating: function calculating() {
                        return _this13._resize();
                      }
                    });
                  },
                  hideAxes: _this13.state.hideAxes,
                  onToggleAxes: function onToggleAxes(hideAxes) {
                    return _this13.setState({
                      calculating: function calculating() {
                        return _this13.setState({
                          hideAxes: hideAxes
                        });
                      }
                    });
                  },
                  additionalSettings: _this13.props.additionalSettings
                }, _this13.props.systemInfoChildren);
              }
          }
        }()), loaded && _base.base.react.createElement("div", {
          className: "sanddance-view"
        }, _base.base.react.createElement(_sanddanceReact.SandDanceReact, {
          renderOptions: {
            rebaseFilter: function rebaseFilter() {
              var rebaseFilter = _this13.rebaseFilter;

              if (rebaseFilter) {
                _this13.rebaseFilter = false;
              }

              return rebaseFilter;
            },
            initialColorContext: this.getColorContext && this.getColorContext(this.viewer.insight, insight),
            discardColorContextUpdates: function discardColorContextUpdates() {
              return _this13.discardColorContextUpdates;
            }
          },
          viewerOptions: this.viewerOptions,
          ref: function ref(reactViewer) {
            if (reactViewer) {
              _this13.viewer = reactViewer.viewer;
            }
          },
          onView: function onView(renderResult) {
            _this13.changespecCapabilities(renderResult.specResult.errors ? renderResult.specResult.specCapabilities : _this13.viewer.specCapabilities);

            _this13.getColorContext = function (oldInsight, newInsight) {
              if (!oldInsight && !newInsight) {
                return null;
              }

              if (!oldInsight || !newInsight) {
                return null;
              }

              if (oldInsight.scheme !== newInsight.scheme) {
                return null;
              }

              if (oldInsight.columns.color !== newInsight.columns.color) {
                return null;
              }

              if (oldInsight.directColor != newInsight.directColor) {
                return null;
              }

              return _this13.viewer.colorContexts && _this13.viewer.colorContexts[_this13.viewer.currentColorContext];
            }; //don't allow tabbing to the canvas


            (0, _canvas.removeTabIndex)(_this13.viewer);
            _this13.props.onView && _this13.props.onView();
          },
          onError: function onError(e) {
            _this13.props.onError && _this13.props.onError(e);
          },
          data: this.state.dataContent.data,
          insight: insight,
          onMount: function onMount(el) {
            return _this13.viewerMounted(el);
          }
        }), this.state.note && _base.base.react.createElement("div", {
          className: 'sanddance-note'
        }, _base.base.react.createElement(_iconButton.IconButton, {
          className: 'cancel',
          themePalette: themePalette,
          title: _language.strings.buttonClose,
          iconName: 'Cancel',
          onClick: function onClick() {
            return _this13.setState({
              note: null
            });
          }
        }), _base.base.react.createElement("div", null, this.state.note))), _base.base.react.createElement(_dialog.Dialog, {
          title: _language.strings.labelError,
          hidden: !this.state.errors,
          onDismiss: function onDismiss() {
            _this13.setState({
              errors: null
            });
          }
        }, this.state.errors && this.state.errors.map(function (error, i) {
          return _base.base.react.createElement("div", {
            key: i
          }, error);
        })), _base.base.react.createElement(_snapshotEditor.SnapshotEditor, Object.assign({
          ref: function ref(se) {
            return _this13.snapshotEditor = se;
          }
        }, this.props.snapshotProps, {
          explorer: this,
          onWriteSnapshot: function onWriteSnapshot(s, i) {
            return _this13.writeSnapshot(s, i);
          },
          theme: this.props.theme,
          themePalette: themePalette
        }))), this.state.positionedColumnMapProps && _base.base.react.createElement(_clickableTextLayer.PositionedColumnMap, Object.assign({}, this.state.positionedColumnMapProps)));
      }
    }, {
      key: "getColumnMapBaseProps",
      value: function getColumnMapBaseProps() {
        var _this14 = this;

        var allColumns = this.state.dataContent && this.state.dataContent.columns.filter(function (c) {
          return !_sanddanceReact.SandDance.util.isInternalFieldName(c.name, true);
        });
        var quantitativeColumns = allColumns && allColumns.filter(function (c) {
          return c.quantitative;
        });
        var categoricalColumns = allColumns && allColumns.filter(function (c) {
          return !c.quantitative;
        });
        var props = {
          changeColumnMapping: function changeColumnMapping(role, columnOrRole, options) {
            var column;

            if (typeof columnOrRole === 'string') {
              //look up current insight
              var columnName = _this14.state.columns[columnOrRole];
              column = allColumns.filter(function (c) {
                return c.name === columnName;
              })[0];
            } else {
              column = columnOrRole;
            }

            _this14.changeColumnMapping(role, column, options);
          },
          facetStyle: this.state.facetStyle,
          totalStyle: this.state.totalStyle,
          allColumns: allColumns,
          quantitativeColumns: quantitativeColumns,
          categoricalColumns: categoricalColumns,
          specCapabilities: this.state.specCapabilities,
          explorer: this
        };
        return props;
      }
    }]);

    return __Explorer;
  }(_base.base.react.Component);

  return new __Explorer(props);
}

var Explorer = _Explorer;
exports.Explorer = Explorer;

function colorMapping(insight, columns) {
  if (columns && insight.columns && insight.columns.color) {
    return columns.filter(function (c) {
      return c.name === insight.columns.color;
    })[0];
  }
}
},{"./base":"Vlbn","./canvas":"Dryx","./clickableTextLayer":"UUG7","./colorMap":"E67y","./colorScheme":"L8O2","./columns":"f8v0","./controls/dataScope":"OsNT","./controls/dialog":"cFWm","./controls/iconButton":"dQNc","./controls/sidebar":"f8Jx","./controls/topbar":"Afi9","./dataLoader":"f19h","./defaults":"Tl9z","./dialogs/chart":"NGSt","./dialogs/color":"N8IJ","./dialogs/dataBrowser":"pJLc","./dialogs/history":"YVpI","./dialogs/search":"ozxe","./dialogs/settings":"zKGJ","./dialogs/snapshotEditor":"dSzJ","./dialogs/snapshots":"oc9r","./interfaces":"h2T5","./language":"hk5u","./mouseEvent":"yvMl","./partialInsight":"tb7d","./themes":"CgE3","./toggleSearch":"yzxM","@msrvida/chart-recommender":"i6UQ","@msrvida/sanddance-react":"MjKu"}],"Vlbn":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.use = use;
exports.base = void 0;

var _clickableTextLayer = require("./clickableTextLayer");

var _dataExporter = require("./controls/dataExporter");

var _chart = require("./dialogs/chart");

var _search = require("./dialogs/search");

var _settings = require("./dialogs/settings");

var _snapshotEditor = require("./dialogs/snapshotEditor");

var _snapshots = require("./dialogs/snapshots");

var _explorer = require("./explorer");

var _sanddanceReact = require("@msrvida/sanddance-react");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var base = {
  fluentUI: null,
  react: null,
  reactDOM: null
};
/**
 * Specify the dependency libraries to use for rendering.
 * @param fluentUI FluentUI React library.
 * @param react React library.
 * @param vega Vega library.
 * @param deck @deck.gl/core library.
 * @param layers @deck.gl/layers library.
 * @param luma @luma.gl/core library.
 */

exports.base = base;

function use(fluentUI, react, reactDOM, vega, deck, layers, luma) {
  (0, _sanddanceReact.use)(react, reactDOM, vega, deck, layers, luma);
  base.fluentUI = fluentUI;
  base.react = react;
  base.reactDOM = reactDOM; //inform React that we are using a dynamic base class

  _chart.Chart.prototype = react.Component.prototype;
  _dataExporter.DataExportPicker.prototype = react.Component.prototype;
  _explorer.Explorer.prototype = react.Component.prototype;
  _clickableTextLayer.PositionedColumnMap.prototype = react.Component.prototype;
  _search.Search.prototype = react.Component.prototype;
  _snapshotEditor.SnapshotEditor.prototype = react.Component.prototype;
  _snapshots.Snapshots.prototype = react.Component.prototype;
  _settings.Settings.prototype = react.Component.prototype;
}
},{"./clickableTextLayer":"UUG7","./controls/dataExporter":"l7po","./dialogs/chart":"NGSt","./dialogs/search":"ozxe","./dialogs/settings":"zKGJ","./dialogs/snapshotEditor":"dSzJ","./dialogs/snapshots":"oc9r","./explorer":"KeW6","@msrvida/sanddance-react":"MjKu"}],"cFWm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = Dialog;

var _base = require("../base");

var _language = require("../language");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function Dialog(props) {
  return _base.base.react.createElement(_base.base.fluentUI.Dialog, Object.assign({}, props, {
    dialogContentProps: Object.assign({
      type: _base.base.fluentUI.DialogType.normal,
      title: props.title
    }, props.dialogContentProps)
  }), _base.base.react.createElement("div", {
    onKeyUp: function onKeyUp(e) {
      e.nativeEvent.stopImmediatePropagation();
    }
  }, props.children), _base.base.react.createElement(_base.base.fluentUI.DialogFooter, null, props.buttons, _base.base.react.createElement(_base.base.fluentUI.DefaultButton, {
    iconProps: {
      iconName: 'Cancel'
    },
    onClick: props.onDismiss,
    text: _language.strings.buttonClose
  })));
}
},{"../base":"Vlbn","../language":"hk5u"}],"nQgO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dialog = require("./dialog");

Object.keys(_dialog).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dialog[key];
    }
  });
});
},{"./dialog":"cFWm"}],"Focm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  controls: true,
  getEmbedHTML: true,
  SideTabId: true,
  use: true,
  capabilities: true,
  getColorSettingsFromThemePalette: true,
  themePalettes: true,
  SandDance: true,
  util: true,
  version: true
};
Object.defineProperty(exports, "getEmbedHTML", {
  enumerable: true,
  get: function () {
    return _dataExporter.getEmbedHTML;
  }
});
Object.defineProperty(exports, "SideTabId", {
  enumerable: true,
  get: function () {
    return _interfaces.SideTabId;
  }
});
Object.defineProperty(exports, "use", {
  enumerable: true,
  get: function () {
    return _base.use;
  }
});
Object.defineProperty(exports, "capabilities", {
  enumerable: true,
  get: function () {
    return _canvas.capabilities;
  }
});
Object.defineProperty(exports, "getColorSettingsFromThemePalette", {
  enumerable: true,
  get: function () {
    return _themes.getColorSettingsFromThemePalette;
  }
});
Object.defineProperty(exports, "themePalettes", {
  enumerable: true,
  get: function () {
    return _themes.themePalettes;
  }
});
Object.defineProperty(exports, "SandDance", {
  enumerable: true,
  get: function () {
    return _sanddanceReact.SandDance;
  }
});
Object.defineProperty(exports, "util", {
  enumerable: true,
  get: function () {
    return _sanddanceReact.util;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _version.version;
  }
});
exports.controls = void 0;

var controls = _interopRequireWildcard(require("./controls"));

exports.controls = controls;

var _dataExporter = require("./controls/dataExporter");

var _interfaces = require("./interfaces");

var _base = require("./base");

var _canvas = require("./canvas");

var _themes = require("./themes");

var _explorer = require("./explorer");

Object.keys(_explorer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _explorer[key];
    }
  });
});

var _sanddanceReact = require("@msrvida/sanddance-react");

var _version = require("./version");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./controls":"nQgO","./controls/dataExporter":"l7po","./interfaces":"h2T5","./base":"Vlbn","./canvas":"Dryx","./themes":"CgE3","./explorer":"KeW6","@msrvida/sanddance-react":"MjKu","./version":"RvaL"}]},{},["Focm"], "SandDanceExplorer")