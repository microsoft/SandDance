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
})({"by41":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorScaleNone = exports.Other = exports.SignalNames = exports.ScaleNames = exports.FieldNames = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var FieldNames = {
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
var ScaleNames = {
  Color: 'scale_color',
  X: 'scale_x',
  Y: 'scale_y',
  Z: 'scale_z'
}; //Signal names

exports.ScaleNames = ScaleNames;
var SignalNames = {
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
var Other = '__Other'; //name of the "no-color" palette

exports.Other = Other;
var ColorScaleNone = 'none';
exports.ColorScaleNone = ColorScaleNone;
},{}],"pbgY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scatterSizedDiv = exports.scatterSizedMin = exports.axesOffsetY = exports.axesOffsetX = exports.axesTitlePaddingFacetY = exports.axesTitlePaddingFacetX = exports.axesTitlePaddingY = exports.axesTitlePaddingX = exports.axesTitleLimit = exports.axesLabelLimit = exports.facetPaddingRight = exports.facetPaddingBottom = exports.facetPaddingTop = exports.facetPaddingLeft = exports.minFacetHeight = exports.minFacetWidth = exports.minBarBandWidth = exports.maxbins = exports.defaultBins = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
//TODO move these to options
var defaultBins = 10;
exports.defaultBins = defaultBins;
var maxbins = 100;
exports.maxbins = maxbins;
var minBarBandWidth = 15;
exports.minBarBandWidth = minBarBandWidth;
var minFacetWidth = 140;
exports.minFacetWidth = minFacetWidth;
var minFacetHeight = 180;
exports.minFacetHeight = minFacetHeight;
var facetPaddingLeft = 40;
exports.facetPaddingLeft = facetPaddingLeft;
var facetPaddingTop = 40;
exports.facetPaddingTop = facetPaddingTop;
var facetPaddingBottom = 40;
exports.facetPaddingBottom = facetPaddingBottom;
var facetPaddingRight = 40;
exports.facetPaddingRight = facetPaddingRight;
var axesLabelLimit = 100;
exports.axesLabelLimit = axesLabelLimit;
var axesTitleLimit = 100;
exports.axesTitleLimit = axesTitleLimit;
var axesTitlePaddingX = 30;
exports.axesTitlePaddingX = axesTitlePaddingX;
var axesTitlePaddingY = 60;
exports.axesTitlePaddingY = axesTitlePaddingY;
var axesTitlePaddingFacetX = 69;
exports.axesTitlePaddingFacetX = axesTitlePaddingFacetX;
var axesTitlePaddingFacetY = 92;
exports.axesTitlePaddingFacetY = axesTitlePaddingFacetY;
var axesOffsetX = 120;
exports.axesOffsetX = axesOffsetX;
var axesOffsetY = 120;
exports.axesOffsetY = axesOffsetY;
var scatterSizedMin = 10;
exports.scatterSizedMin = scatterSizedMin;
var scatterSizedDiv = 20;
exports.scatterSizedDiv = scatterSizedDiv;
},{}],"qZd8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Layout =
/*#__PURE__*/
function () {
  function Layout(props) {
    _classCallCheck(this, Layout);

    this.props = props;
    this.id = props.id;
  }

  _createClass(Layout, [{
    key: "getGrouping",
    value: function getGrouping() {
      return null;
    }
  }, {
    key: "getAggregateSumOp",
    value: function getAggregateSumOp() {
      return null;
    }
  }, {
    key: "build",
    value: function build() {
      throw 'Not implemented';
    }
  }]);

  return Layout;
}();

exports.Layout = Layout;
},{}],"myEr":[function(require,module,exports) {
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
},{}],"VFVY":[function(require,module,exports) {
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

function addAxes(scope) {
  var _scope$axes;

  if (!scope.axes) {
    scope.axes = [];
  }

  for (var _len = arguments.length, axis = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    axis[_key - 1] = arguments[_key];
  }

  (_scope$axes = scope.axes).push.apply(_scope$axes, axis);
}

function addData(scope) {
  var _scope$data;

  if (!scope.data) {
    scope.data = [];
  }

  for (var _len2 = arguments.length, data = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    data[_key2 - 1] = arguments[_key2];
  }

  (_scope$data = scope.data).push.apply(_scope$data, data);
}

function addMarks(scope) {
  var _scope$marks;

  if (!scope.marks) {
    scope.marks = [];
  }

  for (var _len3 = arguments.length, marks = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    marks[_key3 - 1] = arguments[_key3];
  }

  (_scope$marks = scope.marks).push.apply(_scope$marks, marks);
}

function addScales(scope) {
  var _scope$scales;

  if (!scope.scales) {
    scope.scales = [];
  }

  for (var _len4 = arguments.length, scale = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    scale[_key4 - 1] = arguments[_key4];
  }

  (_scope$scales = scope.scales).push.apply(_scope$scales, scale);
}

function addSignals(scope) {
  var _scope$signals;

  if (!scope.signals) {
    scope.signals = [];
  }

  for (var _len5 = arguments.length, signal = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    signal[_key5 - 1] = arguments[_key5];
  }

  (_scope$signals = scope.signals).push.apply(_scope$signals, signal);
}

function addTransforms(data) {
  var _data$transform;

  if (!data.transform) {
    data.transform = [];
  }

  for (var _len6 = arguments.length, transforms = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    transforms[_key6 - 1] = arguments[_key6];
  }

  (_data$transform = data.transform).push.apply(_data$transform, transforms);
}

function getDataByName(data, dataName) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].name === dataName) return {
      data: data[i],
      index: i
    };
  }
}

function getGroupBy(groupings) {
  var groupby = groupings.map(function (g) {
    return g.groupby;
  });
  return groupby.reduce(function (acc, val) {
    return acc.concat(val);
  }, []);
}

function addOffsets() {
  for (var _len7 = arguments.length, offsets = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    offsets[_key7] = arguments[_key7];
  }

  return offsets.filter(Boolean).join(' + ');
}
},{}],"YrTi":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testForCollapseSelection = testForCollapseSelection;

var _constants = require("./constants");

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function testForCollapseSelection() {
  return "datum.".concat(_constants.FieldNames.Collapsed);
}
},{"./constants":"by41"}],"QVGZ":[function(require,module,exports) {
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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AggregateContainer =
/*#__PURE__*/
function (_Layout) {
  _inherits(AggregateContainer, _Layout);

  function AggregateContainer(props) {
    var _this;

    _classCallCheck(this, AggregateContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AggregateContainer).call(this, props));
    _this.props = props;

    var a = _this.aggregation = _this.getAggregation();

    var p = _this.prefix = "agg_".concat(_this.id);
    _this.names = {
      barCount: "".concat(p, "_count"),
      aggregateField: "".concat(p, "_aggregate_value"),
      globalAggregateExtentSignal: "".concat(p, "_").concat(a, "_extent"),
      scale: "scale_".concat(p),
      extentData: "data_".concat(p, "_extent"),
      offsets: "data_".concat(p, "_offsets")
    };
    return _this;
  }

  _createClass(AggregateContainer, [{
    key: "getAggregateSumOp",
    value: function getAggregateSumOp() {
      if (this.aggregation === 'sum') {
        var fieldOp = {
          field: (0, _expr.safeFieldName)(this.props.sumBy.name),
          op: 'sum',
          as: _constants.FieldNames.Sum
        };
        return fieldOp;
      }
    }
  }, {
    key: "build",
    value: function build() {
      var aggregation = this.aggregation,
          names = this.names,
          props = this.props;
      var dock = props.dock,
          globalScope = props.globalScope,
          groupings = props.groupings,
          niceScale = props.niceScale,
          parentScope = props.parentScope,
          showAxes = props.showAxes;
      (0, _scope.addTransforms)(globalScope.data, Object.assign(Object.assign({}, this.getTransforms(aggregation, (0, _scope.getGroupBy)(groupings))), {
        as: [names.aggregateField]
      }), {
        type: 'extent',
        field: (0, _expr.safeFieldName)(names.aggregateField),
        signal: names.globalAggregateExtentSignal
      });
      (0, _scope.addSignals)(globalScope.scope, {
        name: props.globalAggregateMaxExtentSignal,
        update: "".concat(names.globalAggregateExtentSignal, "[1]")
      });
      var horizontal = dock === 'left';
      var groupScaled = "scale(".concat(JSON.stringify(names.scale), ", datum[").concat(JSON.stringify(names.aggregateField), "])");
      var offsets = {
        x: parentScope.offsets.x,
        y: (0, _scope.addOffsets)(parentScope.offsets.y, dock === 'bottom' ? groupScaled : ''),
        h: horizontal ? parentScope.offsets.h : dock === 'top' ? groupScaled : "".concat(parentScope.offsets.h, " - ").concat(groupScaled),
        w: horizontal ? groupScaled : parentScope.offsets.w
      };
      var scale = {
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
      var globalAggregateMaxExtentScaledValue = "scale(".concat(JSON.stringify(names.scale), ", ").concat(props.globalAggregateMaxExtentSignal, ")");
      (0, _scope.addSignals)(globalScope.scope, {
        name: props.globalAggregateMaxExtentScaledSignal,
        update: dock === 'bottom' ? "".concat(parentScope.sizeSignals.layoutHeight, " - ").concat(globalAggregateMaxExtentScaledValue) : globalAggregateMaxExtentScaledValue
      });
      return {
        offsets: offsets,
        sizeSignals: horizontal ? {
          layoutHeight: parentScope.sizeSignals.layoutHeight,
          layoutWidth: null
        } : {
          layoutHeight: null,
          layoutWidth: parentScope.sizeSignals.layoutWidth
        },
        globalScales: {
          showAxes: showAxes,
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
  }, {
    key: "getTransforms",
    value: function getTransforms(aggregation, groupby) {
      var trans = {
        type: 'joinaggregate',
        groupby: groupby.map(_expr.safeFieldName),
        ops: [aggregation]
      };

      if (aggregation === 'sum') {
        trans.fields = [this.props.sumBy.name].map(_expr.safeFieldName);
      }

      return trans;
    }
  }, {
    key: "getAggregation",
    value: function getAggregation() {
      var props = this.props;
      var s;

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
  }]);

  return AggregateContainer;
}(_layout.Layout);

exports.AggregateContainer = AggregateContainer;
},{"./layout":"qZd8","../constants":"by41","../expr":"myEr","../scope":"VFVY","../selection":"YrTi"}],"fSZ7":[function(require,module,exports) {
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
  var column = discreteColumn.column,
      defaultBins = discreteColumn.defaultBins,
      maxbins = discreteColumn.maxbins,
      maxbinsSignalDisplayName = discreteColumn.maxbinsSignalDisplayName,
      maxbinsSignalName = discreteColumn.maxbinsSignalName;

  if (column.quantitative) {
    var field = "".concat(prefix, "_bin_").concat((0, _expr.exprSafeFieldName)(column.name));
    var fieldEnd = "".concat(field, "_end");
    var binSignal = "".concat(field, "_bins");
    var extentSignal = "".concat(field, "_bin_extent");
    domainDataName = "".concat(field, "_sequence"); //override the data name

    var extentTransform = {
      type: 'extent',
      field: (0, _expr.safeFieldName)(column.name),
      signal: extentSignal
    };
    var maxbinsSignal = {
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
    var binTransform = {
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
    var dataSequence = {
      name: domainDataName,
      transform: [{
        type: 'sequence',
        start: {
          signal: "".concat(binSignal, ".start")
        },
        stop: {
          signal: "".concat(binSignal, ".stop")
        },
        step: {
          signal: "".concat(binSignal, ".step")
        }
      }, {
        type: 'formula',
        expr: 'datum.data',
        as: field
      }, {
        type: 'formula',
        expr: "datum.data + ".concat(binSignal, ".step"),
        as: fieldEnd
      }, {
        type: 'window',
        ops: ['row_number'],
        as: [_constants.FieldNames.Ordinal]
      }, {
        type: 'formula',
        expr: "datum.data === ".concat(binSignal, ".start"),
        as: _constants.FieldNames.First
      }, {
        type: 'formula',
        expr: "datum.data === ".concat(binSignal, ".stop - ").concat(binSignal, ".step"),
        as: _constants.FieldNames.Last
      }]
    };
    return {
      discreteColumn: discreteColumn,
      native: false,
      transforms: [extentTransform, binTransform],
      fields: [field, fieldEnd],
      binSignal: binSignal,
      dataSequence: dataSequence,
      domainDataName: domainDataName,
      maxbinsSignal: maxbinsSignal,
      fullScaleDataname: dataSequence.name
    };
  } else {
    return {
      discreteColumn: discreteColumn,
      native: true,
      fields: [column.name],
      domainDataName: domainDataName,
      fullScaleDataname: domainDataName
    };
  }
}
},{"./constants":"by41","./expr":"myEr"}],"ITWz":[function(require,module,exports) {
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

var defaultZProportion = 0.6;
exports.defaultZProportion = defaultZProportion;

function textSignals(context, heightSignal) {
  var specViewOptions = context.specViewOptions;
  var signals = [{
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
    update: "".concat(heightSignal, " * ").concat(_constants.SignalNames.ZProportion)
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
    update: "".concat(_constants.SignalNames.TextScale, " * 10")
  }, {
    name: _constants.SignalNames.TextTitleSize,
    update: "".concat(_constants.SignalNames.TextScale, " * 15")
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
  var specViewOptions = context.specViewOptions;
  var signal = {
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
  var specViewOptions = context.specViewOptions;
  var signal = {
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
  s.update = "".concat(fn, "((").concat(s.update, "), (").concat(update, "))");
}
},{"./constants":"by41"}],"cU45":[function(require,module,exports) {
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

var Band =
/*#__PURE__*/
function (_Layout) {
  _inherits(Band, _Layout);

  function Band(props) {
    var _this;

    _classCallCheck(this, Band);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Band).call(this, props));
    _this.props = props;
    var p = _this.prefix = "band_".concat(_this.id);
    _this.names = {
      xScale: "scale_".concat(p, "_x"),
      yScale: "scale_".concat(p, "_y"),
      bandWidth: "".concat(p, "_bandwidth"),
      accumulative: "".concat(p, "_accumulative")
    };
    _this.bin = (0, _bin.binnable)(_this.prefix, props.globalScope.data.name, props.groupby);
    return _this;
  }

  _createClass(Band, [{
    key: "getGrouping",
    value: function getGrouping() {
      return this.bin.fields;
    }
  }, {
    key: "build",
    value: function build() {
      var bin = this.bin,
          names = this.names,
          props = this.props;
      var globalScope = props.globalScope,
          minBandWidth = props.minBandWidth,
          orientation = props.orientation,
          parentScope = props.parentScope,
          showAxes = props.showAxes;
      var binField = bin.fields[0];

      if (bin.native === false) {
        (0, _scope.addSignals)(globalScope.scope, bin.maxbinsSignal);

        _scope.addTransforms.apply(void 0, [globalScope.data].concat(_toConsumableArray(bin.transforms)));

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
      var horizontal = orientation === 'horizontal';
      var minCellSignal = horizontal ? globalScope.signals.minCellHeight : globalScope.signals.minCellWidth;
      (0, _signals.modifySignal)(minCellSignal, 'max', "length(data(".concat(JSON.stringify(names.accumulative), ")) * ").concat(minBandWidth));
      (0, _scope.addSignals)(globalScope.scope, {
        name: names.bandWidth,
        update: "bandwidth(".concat(JSON.stringify(horizontal ? names.yScale : names.xScale), ")")
      });
      var scale = this.getScale(bin, horizontal);
      var encodingRuleMap;

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
          showAxes: showAxes,
          scales: {
            x: horizontal ? undefined : scale,
            y: horizontal ? scale : undefined
          }
        },
        encodingRuleMap: encodingRuleMap
      };
    }
  }, {
    key: "getOffset",
    value: function getOffset(horizontal, binField) {
      var names = this.names,
          props = this.props;
      var parentScope = props.parentScope;
      return {
        x: (0, _scope.addOffsets)(parentScope.offsets.x, horizontal ? '' : "scale(".concat(JSON.stringify(names.xScale), ", datum[").concat(JSON.stringify(binField), "])")),
        y: (0, _scope.addOffsets)(parentScope.offsets.y, horizontal ? "scale(".concat(JSON.stringify(names.yScale), ", datum[").concat(JSON.stringify(binField), "])") : ''),
        h: horizontal ? names.bandWidth : parentScope.offsets.h,
        w: horizontal ? parentScope.offsets.w : names.bandWidth
      };
    }
  }, {
    key: "getScale",
    value: function getScale(bin, horizontal) {
      var names = this.names;
      var parentScope = this.props.parentScope;
      var binField = (0, _expr.safeFieldName)(bin.fields[0]);
      var scale;

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
  }]);

  return Band;
}(_layout.Layout);

exports.Band = Band;
},{"./layout":"qZd8","../bin":"fSZ7","../expr":"myEr","../scope":"VFVY","../selection":"YrTi","../signals":"ITWz"}],"j8bz":[function(require,module,exports) {
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
  var scale = {
    name: scaleName,
    type: 'linear',
    range: range,
    round: true,
    reverse: reverse,
    domain: {
      data: data,
      field: (0, _expr.safeFieldName)(field)
    },
    zero: zero,
    nice: true
  };
  return scale;
}

function pointScale(scaleName, data, range, field, reverse) {
  var scale = {
    name: scaleName,
    type: 'point',
    range: range,
    domain: {
      data: data,
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
  var domain = {
    data: data,
    field: (0, _expr.safeFieldName)(field)
  };
  var range = {
    scheme: scheme
  };
  var reverse = {
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
        var sequentialScale = {
          name: scaleName,
          type: 'linear',
          domain: domain,
          range: range,
          reverse: reverse
        };
        return sequentialScale;
      }

    case 'quantile':
      {
        var quantileScale = {
          name: scaleName,
          type: 'quantile',
          domain: domain,
          range: range,
          reverse: reverse
        };
        return quantileScale;
      }

    default:
      {
        var quantizeScale = {
          name: scaleName,
          type: 'quantize',
          domain: domain,
          range: range,
          reverse: reverse
        };
        return quantizeScale;
      }
  }
}
},{"./constants":"by41","./expr":"myEr"}],"n9jf":[function(require,module,exports) {
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
    var zRange = [0, {
      signal: "(".concat(zSize, ") * ").concat(_constants.SignalNames.ZProportion)
    }];
    (0, _scope.addScales)(globalScope.scope, z.quantitative ? (0, _scales.linearScale)(zScaleName, globalScope.data.name, z.name, zRange, false, true) : (0, _scales.pointScale)(zScaleName, globalScope.data.name, zRange, z.name, false));
  }
}
},{"./constants":"by41","./scales":"j8bz","./scope":"VFVY"}],"FgKk":[function(require,module,exports) {
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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Square =
/*#__PURE__*/
function (_Layout) {
  _inherits(Square, _Layout);

  function Square(props) {
    var _this;

    _classCallCheck(this, Square);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Square).call(this, props));
    _this.props = props;
    var p = _this.prefix = "square_".concat(_this.id);
    _this.names = {
      bandWidth: _this.getBandWidth(),
      maxGroupField: "".concat(p, "_max_group"),
      maxGroupSignal: "".concat(p, "_max_grouping"),
      stack0: "".concat(p, "_stack0"),
      stack1: "".concat(p, "_stack1"),
      zScale: "scale_".concat(p, "_z")
    };
    return _this;
  }

  _createClass(Square, [{
    key: "build",
    value: function build() {
      var names = this.names,
          prefix = this.prefix,
          props = this.props;
      var fillDirection = props.fillDirection,
          globalScope = props.globalScope,
          groupings = props.groupings,
          parentScope = props.parentScope,
          collapseYHeight = props.collapseYHeight,
          sortBy = props.sortBy,
          z = props.z;
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

      var _this$addSignals = this.addSignals(),
          gap = _this$addSignals.gap,
          levelSize = _this$addSignals.levelSize,
          size = _this$addSignals.size,
          squaresPerBand = _this$addSignals.squaresPerBand;

      var heightSignal = {
        signal: fillDirection === 'down-right' ? size : levelSize
      };
      var mark = {
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

      var _this$transformXY = this.transformXY(gap, levelSize, squaresPerBand),
          tx = _this$transformXY.tx,
          ty = _this$transformXY.ty;

      return Object.assign({
        offsets: {
          x: (0, _scope.addOffsets)(parentScope.offsets.x, tx.expr),
          y: (0, _scope.addOffsets)(parentScope.offsets.y, ty.expr),
          h: size,
          w: size
        },
        mark: mark,
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
  }, {
    key: "getBandWidth",
    value: function getBandWidth() {
      var offsets = this.props.parentScope.offsets;

      switch (this.props.fillDirection) {
        case 'down-right':
          return offsets.h;

        default:
          return offsets.w;
      }
    }
  }, {
    key: "addSignals",
    value: function addSignals() {
      var names = this.names,
          props = this.props;
      var fillDirection = props.fillDirection,
          globalScope = props.globalScope,
          groupings = props.groupings,
          parentScope = props.parentScope;
      var maxGroupedFillSize = props.maxGroupedFillSize,
          maxGroupedUnits = props.maxGroupedUnits;

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
          maxGroupedUnits = "(".concat(names.maxGroupSignal, "[1])");
        } else {
          maxGroupedUnits = "length(data(".concat(JSON.stringify(globalScope.data.name), "))");
        }
      }

      if (!maxGroupedFillSize) {
        maxGroupedFillSize = fillDirection === 'down-right' ? parentScope.offsets.w : parentScope.offsets.h;
      }

      var aspect = "((".concat(names.bandWidth, ") / (").concat(maxGroupedFillSize, "))");
      var squaresPerBand = "ceil(sqrt(".concat(maxGroupedUnits, " * ").concat(aspect, "))");
      var gap = "min(0.1 * ((".concat(names.bandWidth, ") / (").concat(squaresPerBand, " - 1)), 1)");
      var size = "(((".concat(names.bandWidth, ") / ").concat(squaresPerBand, ") - ").concat(gap, ")");
      var levels = "ceil(".concat(maxGroupedUnits, " / ").concat(squaresPerBand, ")");
      var levelSize = "(((".concat(maxGroupedFillSize, ") / ").concat(levels, ") - ").concat(gap, ")");
      return {
        gap: gap,
        levelSize: levelSize,
        size: size,
        squaresPerBand: squaresPerBand
      };
    }
  }, {
    key: "transformXY",
    value: function transformXY(gap, levelSize, squaresPerBand) {
      var names = this.names,
          prefix = this.prefix;
      var compartment = "(".concat(names.bandWidth, ") / ").concat(squaresPerBand, " * ((datum[").concat(JSON.stringify(names.stack0), "]) % ").concat(squaresPerBand, ")");
      var level = "floor((datum[".concat(JSON.stringify(names.stack0), "]) / ").concat(squaresPerBand, ")");
      var _this$props = this.props,
          fillDirection = _this$props.fillDirection,
          parentScope = _this$props.parentScope;
      var tx = {
        type: 'formula',
        expr: null,
        as: "".concat(prefix, "_").concat(_constants.FieldNames.OffsetX)
      };
      var ty = {
        type: 'formula',
        expr: null,
        as: "".concat(prefix, "_").concat(_constants.FieldNames.OffsetY)
      };

      switch (fillDirection) {
        case 'down-right':
          {
            tx.expr = "".concat(level, " * (").concat(levelSize, " + ").concat(gap, ")");
            ty.expr = compartment;
            break;
          }

        case 'right-up':
          {
            tx.expr = compartment;
            ty.expr = "".concat(parentScope.offsets.h, " - ").concat(levelSize, " - ").concat(level, " * (").concat(levelSize, " + ").concat(gap, ")");
            break;
          }

        case 'right-down':
        default:
          {
            tx.expr = compartment;
            ty.expr = "".concat(level, " * (").concat(levelSize, " + ").concat(gap, ")");
            break;
          }
      }

      return {
        tx: tx,
        ty: ty
      };
    }
  }]);

  return Square;
}(_layout.Layout);

exports.Square = Square;
},{"./layout":"qZd8","../constants":"by41","../expr":"myEr","../scope":"VFVY","../selection":"YrTi","../zBase":"n9jf"}],"cyzk":[function(require,module,exports) {
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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Strip =
/*#__PURE__*/
function (_Layout) {
  _inherits(Strip, _Layout);

  function Strip(props) {
    var _this;

    _classCallCheck(this, Strip);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Strip).call(this, props));
    _this.props = props;
    var p = _this.prefix = "strip_".concat(_this.id);
    _this.names = {
      firstField: "".concat(p).concat(_constants.FieldNames.First),
      lastField: "".concat(p).concat(_constants.FieldNames.Last),
      valueField: "".concat(p).concat(_constants.FieldNames.Value),
      scale: "scale_".concat(p),
      zScale: "scale_".concat(p, "_z")
    };
    return _this;
  }

  _createClass(Strip, [{
    key: "build",
    value: function build() {
      var names = this.names,
          prefix = this.prefix,
          props = this.props;
      var addPercentageScale = props.addPercentageScale,
          globalScope = props.globalScope,
          groupings = props.groupings,
          orientation = props.orientation,
          size = props.size,
          sort = props.sort,
          sortOrder = props.sortOrder,
          parentScope = props.parentScope,
          z = props.z;
      (0, _zBase.addZScale)(z, globalScope.zSize, globalScope, names.zScale);
      var horizontal = orientation === 'horizontal';
      var transform = [];

      if (sort) {
        transform.push({
          type: 'collect',
          sort: {
            field: (0, _expr.safeFieldName)(sort.name),
            order: sortOrder
          }
        });
      }

      var stackField;

      if (size) {
        stackField = size.name;
        transform.push({
          type: 'filter',
          expr: "datum[".concat(JSON.stringify(size.name), "] > 0")
        });
      } else {
        stackField = names.valueField;
        transform.push({
          type: 'formula',
          expr: '1',
          as: stackField
        });
      }

      var stackTransform = {
        type: 'stack',
        field: (0, _expr.safeFieldName)(stackField),
        offset: 'normalize',
        as: [names.firstField, names.lastField]
      };

      if (groupings.length) {
        stackTransform.groupby = (0, _scope.getGroupBy)(groupings).map(_expr.safeFieldName);
      }

      transform.push(stackTransform);

      _scope.addTransforms.apply(void 0, [globalScope.data].concat(transform));

      var span = [names.lastField, names.firstField].map(function (f) {
        return "datum[".concat(JSON.stringify(f), "]");
      }).join(' - ');
      var offsets = {
        x: (0, _scope.addOffsets)(parentScope.offsets.x, horizontal ? "datum[".concat(JSON.stringify(names.firstField), "] * (").concat(parentScope.offsets.w, ")") : ''),
        y: (0, _scope.addOffsets)(parentScope.offsets.y, horizontal ? '' : "datum[".concat(JSON.stringify(names.firstField), "] * (").concat(parentScope.offsets.h, ")")),
        h: horizontal ? parentScope.offsets.h : "(".concat(span, ") * (").concat(parentScope.offsets.h, ")"),
        w: horizontal ? "(".concat(span, ") * (").concat(parentScope.offsets.w, ")") : parentScope.offsets.w
      };
      var mark = {
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
      var percentageScale;

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
        offsets: offsets,
        sizeSignals: {
          layoutHeight: null,
          layoutWidth: null
        },
        mark: mark
      };
    }
  }]);

  return Strip;
}(_layout.Layout);

exports.Strip = Strip;
},{"./layout":"qZd8","../constants":"by41","../expr":"myEr","../scope":"VFVY","../selection":"YrTi","../zBase":"n9jf"}],"sFZ8":[function(require,module,exports) {
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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Treemap =
/*#__PURE__*/
function (_Layout) {
  _inherits(Treemap, _Layout);

  function Treemap(props) {
    var _this;

    _classCallCheck(this, Treemap);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Treemap).call(this, props));
    _this.props = props;
    var p = _this.prefix = "treemap_".concat(_this.id);
    _this.names = {
      dataName: "data_".concat(p),
      dataHeightWidth: "data_".concat(p, "_hw"),
      dataExtents: "data_".concat(p, "_extents"),
      dataFacet: "data_".concat(p, "_facet"),
      dataFacetMark: "data_".concat(p, "_facetMark"),
      fieldChildren: "".concat(p, "_children"),
      fieldDepth: "".concat(p, "_depth"),
      fieldX0: "".concat(p, "_x0"),
      fieldX1: "".concat(p, "_x1"),
      fieldY0: "".concat(p, "_y0"),
      fieldY1: "".concat(p, "_y1"),
      fieldHeight: "".concat(p, "_h"),
      fieldWidth: "".concat(p, "_w"),
      heightExtent: "".concat(p, "_heightExtent"),
      widthExtent: "".concat(p, "_widthExtent"),
      zScale: "scale_".concat(p, "_z")
    };
    return _this;
  }

  _createClass(Treemap, [{
    key: "build",
    value: function build() {
      var names = this.names,
          props = this.props;
      var globalScope = props.globalScope,
          parentScope = props.parentScope,
          treeMapMethod = props.treeMapMethod,
          z = props.z;
      (0, _zBase.addZScale)(z, globalScope.zSize, globalScope, names.zScale);
      var offsets = {
        x: (0, _scope.addOffsets)(parentScope.offsets.x, fn(names.fieldX0)),
        y: (0, _scope.addOffsets)(parentScope.offsets.y, fn(names.fieldY0)),
        h: subtract(names.fieldY1, names.fieldY0),
        w: subtract(names.fieldX1, names.fieldX0)
      };
      var mark = this.transformedMark(offsets);
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
        mark: mark,
        offsets: offsets,
        sizeSignals: {
          layoutHeight: null,
          layoutWidth: null
        }
      };
    }
  }, {
    key: "transformedMark",
    value: function transformedMark(offsets) {
      var names = this.names,
          props = this.props;
      var globalScope = props.globalScope,
          groupings = props.groupings,
          parentScope = props.parentScope;

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
        var treemapData = {
          name: names.dataFacetMark,
          source: names.dataFacet
        };
        var facets = {
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
        this.treemapTransform(treemapData, "".concat(names.widthExtent, "[0]"), "".concat(names.heightExtent, "[0]"));
        return this.addMark(offsets, facets, globalScope.markDataName);
      } else {
        this.treemapTransform(globalScope.data, parentScope.offsets.w, parentScope.offsets.h);
        return this.addMark(offsets, globalScope.markGroup, globalScope.markDataName);
      }
    }
  }, {
    key: "addMark",
    value: function addMark(offsets, markParent, markDataName) {
      var names = this.names,
          prefix = this.prefix,
          props = this.props;
      var z = props.z;
      var mark = {
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
  }, {
    key: "treemapTransform",
    value: function treemapTransform(treemapData, widthSignal, heightSignal) {
      var names = this.names,
          props = this.props;
      var group = props.group,
          size = props.size;
      (0, _scope.addTransforms)(treemapData, {
        type: 'filter',
        expr: "datum[".concat(JSON.stringify(size.name), "] > 0")
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
  }]);

  return Treemap;
}(_layout.Layout);

exports.Treemap = Treemap;

function fn(n) {
  return "datum[".concat(JSON.stringify(n), "]");
}

function subtract() {
  for (var _len = arguments.length, fields = new Array(_len), _key = 0; _key < _len; _key++) {
    fields[_key] = arguments[_key];
  }

  return fields.map(function (n) {
    return fn(n);
  }).join(' - ');
}
},{"./layout":"qZd8","../constants":"by41","../expr":"myEr","../scope":"VFVY","../selection":"YrTi","../zBase":"n9jf"}],"EWop":[function(require,module,exports) {
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
},{}],"yciP":[function(require,module,exports) {
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
  var insight = specContext.insight,
      specColumns = specContext.specColumns,
      specViewOptions = specContext.specViewOptions;
  var language = specViewOptions.language;
  var bandProps = {
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
  var x = {
    title: null
  };
  var axisScales = {
    x: x,
    y: {
      title: specColumns.y && specColumns.y.name
    },
    z: {
      title: specColumns.z && specColumns.z.name
    }
  };
  var layouts = [{
    layoutClass: _band.Band,
    props: bandProps
  }];

  if (insight.totalStyle === 'sum-strip-percent') {
    x.aggregate = 'percent';
    x.title = language.percent;
    var stripProps = {
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
    var aggProps = {
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
          var treemapProps = {
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
          var _stripProps = {
            sortOrder: 'ascending',
            orientation: 'horizontal',
            size: specColumns.size,
            sort: specColumns.sort,
            z: specColumns.z
          };
          layouts.push({
            layoutClass: _strip.Strip,
            props: _stripProps
          });
          break;
        }

      case 'count-strip':
        {
          x.aggregate = 'count';
          x.title = language.count;
          var _stripProps2 = {
            sortOrder: 'ascending',
            orientation: 'horizontal',
            size: specColumns.size,
            sort: specColumns.sort,
            z: specColumns.z
          };
          layouts.push({
            layoutClass: _strip.Strip,
            props: _stripProps2
          });
          break;
        }

      default:
        {
          x.aggregate = 'count';
          x.title = language.count;
          var squareProps = {
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
    axisScales: axisScales,
    layouts: layouts,
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
},{"../constants":"by41","../defaults":"pbgY","../layouts/aggregateContainer":"QVGZ","../layouts/band":"cU45","../layouts/square":"FgKk","../layouts/strip":"cyzk","../layouts/treemap":"sFZ8","../size":"EWop"}],"xQog":[function(require,module,exports) {
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
  var insight = specContext.insight,
      specColumns = specContext.specColumns,
      specViewOptions = specContext.specViewOptions;
  var language = specViewOptions.language;
  var bandProps = {
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
  var y = {
    title: null
  };
  var axisScales = {
    x: {
      title: specColumns.x && specColumns.x.name
    },
    y: y,
    z: {
      title: specColumns.z && specColumns.z.name
    }
  };
  var layouts = [{
    layoutClass: _band.Band,
    props: bandProps
  }];

  if (insight.totalStyle === 'sum-strip-percent') {
    y.aggregate = 'percent';
    y.title = language.percent;
    var stripProps = {
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
    var aggProps = {
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
          var treemapProps = {
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
          var _stripProps = {
            sortOrder: 'descending',
            orientation: 'vertical',
            size: specColumns.size,
            sort: specColumns.sort,
            z: specColumns.z
          };
          layouts.push({
            layoutClass: _strip.Strip,
            props: _stripProps
          });
          break;
        }

      case 'count-strip':
        {
          y.aggregate = 'count';
          y.title = language.count;
          var _stripProps2 = {
            sortOrder: 'descending',
            orientation: 'vertical',
            sort: specColumns.sort,
            z: specColumns.z
          };
          layouts.push({
            layoutClass: _strip.Strip,
            props: _stripProps2
          });
          break;
        }

      default:
        {
          y.aggregate = 'count';
          y.title = language.count;
          var squareProps = {
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
    axisScales: axisScales,
    layouts: layouts,
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
},{"../constants":"by41","../defaults":"pbgY","../layouts/aggregateContainer":"QVGZ","../layouts/band":"cU45","../layouts/square":"FgKk","../layouts/strip":"cyzk","../layouts/treemap":"sFZ8","../size":"EWop"}],"Gpg0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregateSquare = void 0;

var _layout = require("./layout");

var _expr = require("../expr");

var _scope = require("../scope");

var _selection = require("../selection");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AggregateSquare =
/*#__PURE__*/
function (_Layout) {
  _inherits(AggregateSquare, _Layout);

  function AggregateSquare(props) {
    var _this;

    _classCallCheck(this, AggregateSquare);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AggregateSquare).call(this, props));
    _this.props = props;
    var a = _this.props.aggregation;
    var p = _this.prefix = "agg_".concat(_this.id);
    _this.names = {
      barCount: "".concat(p, "_count"),
      aggregateField: "".concat(p, "_aggregate_value"),
      globalAggregateExtentSignal: "".concat(p, "_").concat(a, "_extent"),
      extentData: "data_".concat(p, "_extent")
    };
    return _this;
  }

  _createClass(AggregateSquare, [{
    key: "build",
    value: function build() {
      var names = this.names,
          props = this.props;
      var aggregation = props.aggregation,
          globalScope = props.globalScope,
          groupings = props.groupings,
          onBuild = props.onBuild,
          parentScope = props.parentScope;
      var sizeSignals = parentScope.sizeSignals;
      (0, _scope.addTransforms)(globalScope.data, Object.assign(Object.assign({}, this.getTransforms(aggregation, (0, _scope.getGroupBy)(groupings))), {
        as: [names.aggregateField]
      }), {
        type: 'extent',
        field: (0, _expr.safeFieldName)(names.aggregateField),
        signal: names.globalAggregateExtentSignal
      });
      var localAggregateMaxExtent = "datum[".concat(JSON.stringify(names.aggregateField), "]");
      var squareMaxSide = "min((".concat(sizeSignals.layoutHeight, "), (").concat(sizeSignals.layoutWidth, "))");
      var squareMaxArea = "(".concat([squareMaxSide, squareMaxSide].join(' * '), ")");
      var shrinkRatio = "((".concat(localAggregateMaxExtent, ") / (").concat(names.globalAggregateExtentSignal, "[1]))");
      var squareArea = "(".concat([squareMaxArea, shrinkRatio].join(' * '), ")");
      var squareSide = "sqrt(".concat(squareArea, ")");
      var localAggregateMaxExtentScaled = squareSide;
      onBuild && onBuild(localAggregateMaxExtent, localAggregateMaxExtentScaled);
      var offsets = {
        x: (0, _scope.addOffsets)(parentScope.offsets.x, "(".concat(parentScope.offsets.w, " - ").concat(squareSide, ") / 2")),
        y: (0, _scope.addOffsets)(parentScope.offsets.y, "(".concat(parentScope.offsets.h, " - ").concat(squareSide, ") / 2")),
        h: squareSide,
        w: squareSide
      };
      return {
        offsets: offsets,
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
  }, {
    key: "getTransforms",
    value: function getTransforms(aggregation, groupby) {
      var trans = {
        type: 'joinaggregate',
        groupby: groupby.map(_expr.safeFieldName),
        ops: [aggregation]
      };

      if (aggregation === 'sum') {
        trans.fields = [this.props.sumBy.name].map(_expr.safeFieldName);
      }

      return trans;
    }
  }]);

  return AggregateSquare;
}(_layout.Layout);

exports.AggregateSquare = AggregateSquare;
},{"./layout":"qZd8","../expr":"myEr","../scope":"VFVY","../selection":"YrTi"}],"LGcR":[function(require,module,exports) {
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
  var insight = specContext.insight,
      specColumns = specContext.specColumns,
      specViewOptions = specContext.specViewOptions;
  var axisScales = {
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
  var hBandProps = {
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
  var vBandProps = {
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
  var aggProps = {
    onBuild: null,
    aggregation: null,
    sumBy: specColumns.size
  };
  var layouts = [{
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
        var treemapProps = {
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
        var stripProps = {
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
        var _stripProps = {
          sortOrder: 'ascending',
          orientation: 'vertical',
          sort: specColumns.sort,
          z: specColumns.z
        };
        layouts.push({
          layoutClass: _strip.Strip,
          props: _stripProps
        });
        break;
      }

    default:
      {
        aggProps.aggregation = 'count';
        var squareProps = {
          sortBy: specColumns.sort,
          fillDirection: 'right-down',
          z: specColumns.z,
          maxGroupedUnits: null,
          maxGroupedFillSize: null
        };

        aggProps.onBuild = function (aggMaxExtent, aggMaxExtentScaled) {
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
    axisScales: axisScales,
    layouts: layouts,
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
},{"../constants":"by41","../defaults":"pbgY","../layouts/aggregateSquare":"Gpg0","../layouts/band":"cU45","../layouts/square":"FgKk","../layouts/strip":"cyzk","../layouts/treemap":"sFZ8","../size":"EWop"}],"nYYK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _constants = require("../constants");

var _square = require("../layouts/square");

function _default(specContext) {
  var specColumns = specContext.specColumns;
  var squareProps = {
    sortBy: specColumns.sort,
    fillDirection: 'right-down',
    z: specColumns.z,
    collapseYHeight: true
  };
  var axisScales = {
    z: {
      title: specColumns.z && specColumns.z.name
    }
  };
  return {
    axisScales: axisScales,
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
},{"../constants":"by41","../layouts/square":"FgKk"}],"p5f3":[function(require,module,exports) {
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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Scatter =
/*#__PURE__*/
function (_Layout) {
  _inherits(Scatter, _Layout);

  function Scatter(props) {
    var _this;

    _classCallCheck(this, Scatter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Scatter).call(this, props));
    _this.props = props;
    var p = _this.prefix = "scatter_".concat(_this.id);
    _this.names = {
      aggregateData: "data_".concat(p, "_aggregate"),
      markData: "data_".concat(p, "_mark"),
      sizeExtent: "".concat(p, "_sizeExtent"),
      sizeRange: "".concat(p, "_sizeRange"),
      sizeScale: "".concat(p, "_sizeScale"),
      xScale: "scale_".concat(p, "_x"),
      yScale: "scale_".concat(p, "_y"),
      zScale: "scale_".concat(p, "_z")
    };
    return _this;
  }

  _createClass(Scatter, [{
    key: "build",
    value: function build() {
      var names = this.names,
          prefix = this.prefix,
          props = this.props;
      var globalScope = props.globalScope,
          parentScope = props.parentScope,
          scatterPointScaleDisplay = props.scatterPointScaleDisplay,
          size = props.size,
          x = props.x,
          y = props.y,
          z = props.z,
          zGrounded = props.zGrounded;
      var qsize = size && size.quantitative && size;
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
            signal: "".concat(names.sizeExtent, "[1]")
          }],
          range: [0, {
            signal: names.sizeRange
          }]
        });
        (0, _scope.addSignals)(globalScope.scope, {
          name: names.sizeRange,
          update: "min(".concat(parentScope.sizeSignals.layoutHeight, ", ").concat(parentScope.sizeSignals.layoutWidth, ") / ").concat(_defaults.scatterSizedDiv)
        });
      }

      (0, _scope.addData)(globalScope.scope, {
        name: names.markData,
        source: globalScope.markDataName,
        transform: [x, y, z].map(function (c) {
          if (!c || !c.quantitative) return;
          var t = {
            type: 'filter',
            expr: "isValid(datum[".concat(JSON.stringify(c.name), "])")
          };
          return t;
        }).filter(Boolean)
      });
      globalScope.setMarkDataName(names.markData);
      var globalScales = {
        showAxes: true,
        scales: {}
      };
      var zValue = z ? "scale(".concat(JSON.stringify(names.zScale), ", datum[").concat(JSON.stringify(z.name), "])") : null;
      var sizeValueSignal = qsize ? "scale(".concat(JSON.stringify(names.sizeScale), ", datum[").concat(JSON.stringify(qsize.name), "]) * ").concat(_constants.SignalNames.PointScale) : _constants.SignalNames.PointScale;
      var update = Object.assign({
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
          signal: "".concat(_constants.SignalNames.ZGrounded, " ? 0 : ").concat(zValue)
        }],
        depth: [{
          test: (0, _selection.testForCollapseSelection)(),
          value: 0
        }, {
          signal: "".concat(_constants.SignalNames.ZGrounded, " ? ").concat(zValue, " : ").concat(sizeValueSignal)
        }]
      });
      var columnSignals = [{
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
        signal: "(".concat(globalScope.zSize, ") * ").concat(_constants.SignalNames.ZProportion)
      }];
      columnSignals.forEach(function (cs) {
        var column = cs.column,
            reverse = cs.reverse,
            scaleName = cs.scaleName,
            signal = cs.signal,
            xyz = cs.xyz;
        if (!column) return;
        var scale;

        if (column.quantitative) {
          scale = (0, _scales.linearScale)(scaleName, globalScope.data.name, column.name, [0, {
            signal: signal
          }], reverse, false);
        } else {
          scale = (0, _scales.pointScale)(scaleName, globalScope.data.name, [0, {
            signal: signal
          }], column.name, reverse);
        }

        globalScales.scales[xyz] = scale;
      });
      var mark = {
        name: prefix,
        type: 'rect',
        from: {
          data: globalScope.markDataName
        },
        encode: {
          update: update
        }
      };
      (0, _scope.addMarks)(globalScope.markGroup, mark);
      return {
        offsets: {
          x: (0, _scope.addOffsets)(parentScope.offsets.x, "scale(".concat(JSON.stringify(names.xScale), ", datum[").concat(JSON.stringify(x.name), "])")),
          y: (0, _scope.addOffsets)(parentScope.offsets.y, "scale(".concat(JSON.stringify(names.yScale), ", datum[").concat(JSON.stringify(y.name), "]) - ").concat(sizeValueSignal)),
          h: sizeValueSignal,
          w: sizeValueSignal
        },
        sizeSignals: {
          layoutHeight: null,
          layoutWidth: null
        },
        globalScales: globalScales,
        mark: mark,
        encodingRuleMap: {
          y: [{
            test: (0, _selection.testForCollapseSelection)(),
            signal: (0, _scope.addOffsets)(parentScope.offsets.y, parentScope.sizeSignals.layoutHeight)
          }]
        }
      };
    }
  }]);

  return Scatter;
}(_layout.Layout);

exports.Scatter = Scatter;
},{"./layout":"qZd8","../constants":"by41","../defaults":"pbgY","../expr":"myEr","../scales":"j8bz","../scope":"VFVY","../selection":"YrTi"}],"H8hU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _scatter = require("../layouts/scatter");

var _constants = require("../constants");

function _default(specContext) {
  var specColumns = specContext.specColumns,
      specViewOptions = specContext.specViewOptions;
  var scatterProps = {
    x: specColumns.x,
    y: specColumns.y,
    z: specColumns.z,
    size: specColumns.size,
    scatterPointScaleDisplay: specViewOptions.language.scatterPointScale,
    zGrounded: specViewOptions.language.zGrounded
  };
  var axisScales = {
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
    axisScales: axisScales,
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
},{"../layouts/scatter":"p5f3","../constants":"by41"}],"ImxQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stack = void 0;

var _layout = require("./layout");

var _expr = require("../expr");

var _scope = require("../scope");

var _selection = require("../selection");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Stack =
/*#__PURE__*/
function (_Layout) {
  _inherits(Stack, _Layout);

  function Stack(props) {
    var _this;

    _classCallCheck(this, Stack);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Stack).call(this, props));
    _this.props = props;
    var p = _this.prefix = "stack_".concat(_this.id);
    _this.names = {
      cube: "".concat(p, "_cube"),
      globalDataName: "data_".concat(p, "_count"),
      globalExtent: "".concat(p, "_global_extent"),
      levelDataName: "data_".concat(p, "_level"),
      count: "".concat(p, "_count"),
      stack0: "".concat(p, "_stack0"),
      stack1: "".concat(p, "_stack1"),
      sequence: "data_".concat(p, "_sequence"),
      sides: "".concat(p, "_sides"),
      size: "".concat(p, "_size"),
      squared: "".concat(p, "_squared"),
      squaredExtent: "".concat(p, "_squared_extent")
    };
    return _this;
  }

  _createClass(Stack, [{
    key: "build",
    value: function build() {
      var names = this.names,
          props = this.props;
      var globalScope = props.globalScope,
          groupings = props.groupings,
          parentScope = props.parentScope,
          sort = props.sort;
      var sizeSignals = parentScope.sizeSignals;
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
            signal: "sqrt(".concat(names.globalExtent, "[1])")
          }
        }, {
          type: 'formula',
          expr: 'datum.data * datum.data',
          as: 'squared'
        }, {
          type: 'formula',
          expr: "ceil(".concat(names.globalExtent, "[1] / datum.squared)"),
          as: 'maxlevels'
        }, {
          type: 'formula',
          expr: "(".concat(names.size, " - (datum.data - 1) * datum.data) / datum.data"),
          as: 'side'
        }, {
          type: 'formula',
          expr: 'datum.side * datum.maxlevels + datum.maxlevels - 1',
          as: 'sidecubeheight'
        }, {
          type: 'formula',
          expr: "abs(".concat(globalScope.zSize, " - datum.sidecubeheight)"),
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
        update: "min((".concat(sizeSignals.layoutHeight, "), (").concat(sizeSignals.layoutWidth, "))")
      }, {
        name: names.squared,
        update: "".concat(names.squaredExtent, "[0]")
      }, {
        name: names.sides,
        update: "sqrt(".concat(names.squared, ")")
      }, {
        name: names.cube,
        update: "(".concat(names.size, " - (").concat(names.sides, " - 1)) / ").concat(names.sides)
      });
      var zLevel = "floor(datum[".concat(JSON.stringify(names.stack0), "] / ").concat(names.squared, ")");
      var layerOrdinal = "(datum[".concat(JSON.stringify(names.stack0), "] % ").concat(names.squared, ")");
      var cubeX = "(".concat(layerOrdinal, " % ").concat(names.sides, ")");
      var cubeY = "floor(".concat(layerOrdinal, " / ").concat(names.sides, ")");
      var groupX = "(".concat(sizeSignals.layoutWidth, " - ").concat(names.size, ") / 2");
      var groupY = "(".concat(sizeSignals.layoutHeight, " - ").concat(names.size, ") / 2");
      var offsets = {
        x: (0, _scope.addOffsets)(parentScope.offsets.x, groupX, "".concat(cubeX, " * (").concat(names.cube, " + 1)")),
        y: (0, _scope.addOffsets)(parentScope.offsets.y, groupY, "".concat(cubeY, " * (").concat(names.cube, " + 1)")),
        h: names.size,
        w: names.size
      };
      var mark = {
        type: 'rect',
        from: {
          data: this.names.levelDataName
        },
        encode: {
          update: {
            z: {
              signal: "".concat(zLevel, " * (").concat(names.cube, " + 1)")
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
        offsets: offsets,
        mark: mark,
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
  }]);

  return Stack;
}(_layout.Layout);

exports.Stack = Stack;
},{"./layout":"qZd8","../expr":"myEr","../scope":"VFVY","../selection":"YrTi"}],"KUfI":[function(require,module,exports) {
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
  var specColumns = specContext.specColumns;
  var axisScales = {
    x: {
      title: specColumns.x && specColumns.x.name
    },
    y: {
      title: specColumns.y && specColumns.y.name
    }
  };
  var hBandProps = {
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
  var vBandProps = {
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
  var stackProps = {
    sort: specColumns.sort
  };
  return {
    axisScales: axisScales,
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
},{"../layouts/band":"cU45","../defaults":"pbgY","../constants":"by41","../layouts/stack":"ImxQ"}],"Ifo4":[function(require,module,exports) {
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
  var specColumns = specContext.specColumns;
  var stripProps = {
    sortOrder: 'ascending',
    orientation: 'vertical',
    size: specColumns.size,
    sort: specColumns.sort,
    z: specColumns.z
  };
  var axisScales = {
    z: {
      title: specColumns.z && specColumns.z.name
    }
  };
  var layouts = [];

  if (specColumns.facet) {
    axisScales.y = {
      title: null,
      aggregate: specColumns.size ? 'sum' : 'count'
    };
    var globalAggregateMaxExtentScaledSignal = 'globalAggregateMaxExtentScaledSignal';
    var globalAggregateMaxExtentSignal = 'globalAggregateMaxExtentSignal';
    var props = {
      dock: 'top',
      niceScale: false,
      globalAggregateMaxExtentScaledSignal: globalAggregateMaxExtentScaledSignal,
      globalAggregateMaxExtentSignal: globalAggregateMaxExtentSignal,
      sumBy: specColumns.size,
      showAxes: false
    };
    layouts.push({
      layoutClass: _aggregateContainer.AggregateContainer,
      props: props
    });
  }

  layouts.push({
    layoutClass: _strip.Strip,
    props: stripProps
  });
  return {
    axisScales: axisScales,
    layouts: layouts,
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
},{"../layouts/aggregateContainer":"QVGZ","../constants":"by41","../layouts/strip":"cyzk"}],"XuAL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _constants = require("../constants");

var _treemap = require("../layouts/treemap");

var _aggregateContainer = require("../layouts/aggregateContainer");

function _default(specContext) {
  var specColumns = specContext.specColumns,
      specViewOptions = specContext.specViewOptions;
  var treemapProps = {
    corner: 'top-left',
    group: specColumns.group,
    size: specColumns.size,
    treeMapMethod: specViewOptions.language.treeMapMethod,
    z: specColumns.z
  };
  var axisScales = {
    z: {
      title: specColumns.z && specColumns.z.name
    }
  };
  var layouts = [];

  if (specColumns.facet) {
    axisScales.y = {
      title: null,
      aggregate: 'sum'
    };
    var globalAggregateMaxExtentScaledSignal = 'globalAggregateMaxExtentScaledSignal';
    var globalAggregateMaxExtentSignal = 'globalAggregateMaxExtentSignal';
    var props = {
      dock: 'top',
      niceScale: false,
      globalAggregateMaxExtentScaledSignal: globalAggregateMaxExtentScaledSignal,
      globalAggregateMaxExtentSignal: globalAggregateMaxExtentSignal,
      sumBy: specColumns.size,
      showAxes: false
    };
    layouts.push({
      layoutClass: _aggregateContainer.AggregateContainer,
      props: props
    });
  }

  layouts.push({
    layoutClass: _treemap.Treemap,
    props: treemapProps
  });
  return {
    axisScales: axisScales,
    layouts: layouts,
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
},{"../constants":"by41","../layouts/treemap":"sFZ8","../layouts/aggregateContainer":"QVGZ"}],"pHGR":[function(require,module,exports) {
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
  var axesOffsets = props.axesOffsets,
      axisScales = props.axisScales,
      axesScopes = props.axesScopes,
      axesTitlePadding = props.axesTitlePadding,
      allGlobalScales = props.allGlobalScales,
      globalScope = props.globalScope,
      labelBaseline = props.labelBaseline,
      plotOffsetSignals = props.plotOffsetSignals,
      specColumns = props.specColumns,
      specViewOptions = props.specViewOptions;
  var scope = globalScope.scope;
  allGlobalScales.forEach(function (globalScales) {
    var scales = globalScales.scales;

    var _loop = function _loop(s) {
      var scale = scales[s];

      if (scale) {
        (0, _scope.addScales)(scope, scale);

        if (globalScales.showAxes && axisScales && s !== 'z') {
          var axisScale = axisScales[s];

          if (axisScale) {
            var lineColor = specViewOptions.colors.axisLine;
            var horizontal = s === 'x';
            var column = specColumns[s] || {
              quantitative: true
            };
            var title = axisScale.title;
            var _props = {
              title: title,
              horizontal: horizontal,
              column: column,
              specViewOptions: specViewOptions,
              lineColor: lineColor,
              titlePadding: axesTitlePadding[s],
              labelBaseline: labelBaseline[s]
            };
            axesScopes['main'].forEach(function (a) {
              return (0, _scope.addAxes)(a.scope, createAxis(Object.assign(Object.assign({}, _props), {
                scale: a.scale || scale.name,
                showTitle: a.title,
                showLabels: a.labels,
                showLines: a.lines
              })));
            });

            if (axesScopes[s]) {
              axesScopes[s].forEach(function (a) {
                return (0, _scope.addAxes)(a.scope, createAxis(Object.assign(Object.assign({}, _props), {
                  scale: a.scale || scale.name,
                  showTitle: a.title,
                  showLabels: a.labels,
                  showLines: a.lines
                })));
              });
            }

            if (plotOffsetSignals[s] && axesOffsets[s]) {
              var plotOffsetSignal = plotOffsetSignals[s];
              plotOffsetSignal.update = "".concat(axesOffsets[s]);
            }
          }
        }
      }
    };

    for (var s in scales) {
      _loop(s);
    }
  });
}

function createAxis(props) {
  var column = props.column,
      horizontal = props.horizontal,
      labelBaseline = props.labelBaseline,
      lineColor = props.lineColor,
      scale = props.scale,
      showLabels = props.showLabels,
      showTitle = props.showTitle,
      showLines = props.showLines,
      specViewOptions = props.specViewOptions,
      title = props.title,
      titlePadding = props.titlePadding;
  var axis = Object.assign(Object.assign(Object.assign(Object.assign({
    scale: scale,
    orient: horizontal ? 'bottom' : 'left',
    domain: showLines,
    ticks: showLines
  }, showLines && {
    domainColor: lineColor,
    tickColor: lineColor,
    tickSize: specViewOptions.tickSize
  }), showTitle && {
    title: title,
    titleAlign: horizontal ? 'left' : 'right',
    titleAngle: {
      signal: horizontal ? _constants.SignalNames.TextAngleX : _constants.SignalNames.TextAngleY
    },
    titleColor: specViewOptions.colors.axisText,
    titleFontSize: {
      signal: _constants.SignalNames.TextTitleSize
    },
    titleLimit: _defaults.axesTitleLimit,
    titlePadding: titlePadding
  }), {
    labels: showLabels
  }), showLabels && {
    labelAlign: horizontal ? 'left' : 'right',
    labelBaseline: labelBaseline,
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
},{"./constants":"by41","./defaults":"pbgY","./scope":"VFVY"}],"PA3E":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLegends = getLegends;

function legend(column, fill) {
  var legend = {
    orient: 'none',
    title: column.name,
    fill: fill,
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
  var specColumns = context.specColumns,
      insight = context.insight;

  if (specColumns.color && !insight.hideLegend && !insight.directColor && !specColumns.color.isColorData) {
    return [legend(specColumns.color, fill)];
  }
}
},{}],"kDm0":[function(require,module,exports) {
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
  var data = [{
    name: lookupName,
    source: source,
    transform: [{
      type: 'aggregate',
      groupby: [(0, _expr.safeFieldName)(column.name)]
    }, {
      type: 'window',
      ops: ['count'],
      as: [indexName]
    }, {
      type: 'filter',
      expr: "datum[".concat(JSON.stringify(indexName), "] <= ").concat(count)
    }]
  }, {
    name: legend,
    source: source,
    transform: [{
      type: 'lookup',
      from: lookupName,
      key: (0, _expr.safeFieldName)(column.name),
      fields: [column.name].map(_expr.safeFieldName),
      values: [column.name].map(_expr.safeFieldName),
      as: [fieldName]
    }, {
      type: 'formula',
      expr: "datum[".concat(JSON.stringify(fieldName), "] == null ? '").concat(_constants.Other, "' : datum[").concat(JSON.stringify(fieldName), "]"),
      as: fieldName
    }]
  }];
  return data;
}
},{"./constants":"by41","./expr":"myEr"}],"KNuK":[function(require,module,exports) {
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function addColor(props) {
  var colorReverseSignalName = props.colorReverseSignalName,
      dataName = props.dataName,
      scope = props.scope,
      legendDataName = props.legendDataName,
      scaleName = props.scaleName,
      specContext = props.specContext,
      topLookupName = props.topLookupName;
  var colorDataName = dataName;
  var insight = specContext.insight,
      specColumns = specContext.specColumns,
      specViewOptions = specContext.specViewOptions;
  var legends = (0, _legends.getLegends)(specContext, scaleName);

  if (legends) {
    scope.legends = legends;
  }

  var categoricalColor = specColumns.color && !specColumns.color.quantitative;

  if (categoricalColor) {
    _scope.addData.apply(void 0, [scope].concat(_toConsumableArray((0, _top.topLookup)(specColumns.color, specViewOptions.maxLegends, dataName, legendDataName, topLookupName, _constants.FieldNames.TopColor, _constants.FieldNames.TopIndex))));

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
    colorDataName: colorDataName
  };
}
},{"./scope":"VFVY","./scales":"j8bz","./signals":"ITWz","./constants":"by41","./legends":"PA3E","./top":"kDm0"}],"rxrV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayBin = displayBin;
exports.serializeAsVegaExpression = serializeAsVegaExpression;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function displayBin(bin) {
  var val = function val(index) {
    return "datum[".concat(JSON.stringify(bin.fields[index]), "]");
  };

  return bin.discreteColumn.column.quantitative ? "format(".concat(val(0), ", '~r') + ' - ' + format(").concat(val(1), ", '~r')") : val(0);
}

function obj(nameValues, clause) {
  if (clause) {
    nameValues = [clause].concat(_toConsumableArray(nameValues));
  }

  return "{".concat(nameValues.join(), "}");
}

function serializeAsVegaExpression(bin, firstFieldName, lastFieldName, clause) {
  if (bin.discreteColumn.column.quantitative) {
    var low = ["name:".concat(JSON.stringify(bin.discreteColumn.column.name)), 'operator:\'>=\'', "value:datum[".concat(JSON.stringify(bin.fields[0]), "]")];
    var high = ['clause:\'&&\'', "name:".concat(JSON.stringify(bin.discreteColumn.column.name)), 'operator:\'<\'', "value:datum[".concat(JSON.stringify(bin.fields[1]), "]")];
    return obj(["expressions:[ datum[".concat(JSON.stringify(firstFieldName), "] ? null : ").concat(obj(low), ", datum[").concat(JSON.stringify(lastFieldName), "] ? null : ").concat(obj(high), "]")], clause);
  } else {
    var exact = ["name:".concat(JSON.stringify(bin.discreteColumn.column.name)), 'operator:\'==\'', "value:datum[".concat(JSON.stringify(bin.fields[0]), "]")];
    return obj(["expressions:[".concat(obj(exact), "]")], clause);
  }
}
},{}],"fFxp":[function(require,module,exports) {
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
  var titleSignal = "parent[".concat(JSON.stringify(_constants.FieldNames.FacetTitle), "]");
  var index = "datum[".concat(JSON.stringify(_constants.FieldNames.Ordinal), "] - 1");
  var col = facetColumnHeaderFooter(colTitleSource.dataName, sizeSignals, index);
  var row = facetRowHeaderFooter(rowTitleSource.dataName, sizeSignals, index);
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
          signal: "{search: parent[".concat(JSON.stringify(_constants.FieldNames.FacetSearch), "]}")
        },
        x: {
          signal: "".concat(sizeSignals.layoutWidth, " / 2")
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
          signal: "{search: parent[".concat(JSON.stringify(_constants.FieldNames.FacetSearch), "]}")
        },
        y: {
          signal: "".concat(sizeSignals.layoutHeight, " / 2")
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
          signal: "{search: parent[".concat(JSON.stringify(_constants.FieldNames.FacetSearch), "]}")
        },
        x: {
          signal: "(".concat(sizeSignals.layoutWidth, ") / 2")
        },
        text: {
          signal: "parent[".concat(JSON.stringify(_constants.FieldNames.FacetTitle), "]")
        },
        fontSize: {
          signal: _constants.SignalNames.TextSize
        },
        limit: {
          signal: sizeSignals.layoutWidth
        },
        y: {
          signal: "-".concat(_constants.SignalNames.FacetPaddingTop, " / 2")
        }
      }
    }
  });
}

function addFacetAxesGroupMarks(props) {
  var colSeqName = props.colSeqName,
      colTitleScaleName = props.colTitleScaleName,
      globalScope = props.globalScope,
      facetScope = props.facetScope,
      plotHeightOut = props.plotHeightOut,
      plotScope = props.plotScope,
      plotWidthOut = props.plotWidthOut,
      rowSeqName = props.rowSeqName,
      rowTitleScaleName = props.rowTitleScaleName;
  var sizeSignals = facetScope.sizeSignals;
  var colSequence = createSequence(colSeqName, sizeSignals.colCount);
  var rowSequence = createSequence(rowSeqName, sizeSignals.rowCount);
  var index = 'datum.data';
  var col = facetColumnHeaderFooter(colSeqName, sizeSignals, index);
  var row = facetRowHeaderFooter(rowSeqName, sizeSignals, index);
  (0, _scope.addData)(globalScope, colSequence, rowSequence);
  (0, _scope.addMarks)(globalScope, col.footer, row.header);
  var colTitleScale = {
    type: 'linear',
    name: colTitleScaleName,
    domain: [0, 1],
    range: [0, {
      signal: plotWidthOut
    }]
  };
  var rowTitleScale = {
    type: 'linear',
    name: rowTitleScaleName,
    domain: [0, 1],
    range: [{
      signal: plotHeightOut
    }, 0]
  };
  (0, _scope.addScales)(globalScope, colTitleScale, rowTitleScale);
  var map = {
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
  var rowFn = function rowFn(xSignal) {
    return {
      type: 'group',
      from: {
        data: data
      },
      encode: {
        update: {
          x: {
            signal: xSignal
          },
          y: {
            signal: "".concat(_constants.SignalNames.PlotOffsetTop, " + ").concat(_constants.SignalNames.FacetPaddingTop, " + (").concat(index, ") * (").concat(sizeSignals.layoutHeight, " + ").concat(_constants.SignalNames.FacetPaddingTop, " + ").concat(_constants.SignalNames.FacetPaddingBottom, ")")
          },
          height: {
            signal: sizeSignals.layoutHeight
          }
        }
      }
    };
  };

  var header = rowFn(_constants.SignalNames.PlotOffsetLeft);
  var footer = rowFn("".concat(_constants.SignalNames.PlotOffsetLeft, " + ").concat(_constants.SignalNames.PlotWidthOut, " + ").concat(_constants.SignalNames.PlotOffsetRight, " / 2"));
  return {
    header: header,
    footer: footer
  };
}

function facetColumnHeaderFooter(data, sizeSignals, index) {
  var colFn = function colFn(ySignal) {
    return {
      type: 'group',
      from: {
        data: data
      },
      encode: {
        update: {
          x: {
            signal: "(".concat(index, ") * (").concat(sizeSignals.layoutWidth, " + ").concat(_constants.SignalNames.FacetPaddingLeft, ") + ").concat(_constants.SignalNames.FacetPaddingLeft, " + ").concat(_constants.SignalNames.PlotOffsetLeft)
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


  var header = colFn("".concat(_constants.SignalNames.PlotOffsetTop, " / 2"));
  var footer = colFn("".concat(_constants.SignalNames.PlotOffsetTop, " + ").concat(_constants.SignalNames.PlotHeightOut));
  return {
    header: header,
    footer: footer
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
},{"./scope":"VFVY","./constants":"by41"}],"o7uh":[function(require,module,exports) {
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
  var _binFields = binFields.map(_expr.safeFieldName);

  var dataName = "".concat(prefix, "_bin_order");
  var data = {
    name: dataName,
    source: source,
    transform: [{
      type: 'aggregate',
      groupby: _binFields
    }, {
      type: 'collect',
      sort: {
        field: _binFields,
        order: _binFields.map(function (f) {
          return sortOrder;
        })
      }
    }, {
      type: 'window',
      ops: ['row_number'],
      as: [_constants.FieldNames.Ordinal]
    }]
  };
  return {
    data: data,
    scale: ordinalScale(dataName, "scale_".concat(prefix, "_order"), binFields)
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
},{"./constants":"by41","./expr":"myEr"}],"hDE0":[function(require,module,exports) {
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

var Cross =
/*#__PURE__*/
function (_Layout) {
  _inherits(Cross, _Layout);

  function Cross(props) {
    var _this;

    _classCallCheck(this, Cross);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cross).call(this, props));
    _this.props = props;
    var p = _this.prefix = "cross_".concat(_this.id);
    _this.binX = (0, _bin.binnable)("".concat(p, "_x"), props.globalScope.data.name, props.groupbyX);
    _this.binY = (0, _bin.binnable)("".concat(p, "_y"), props.globalScope.data.name, props.groupbyY);
    _this.names = {
      facetDataName: "data_".concat(p, "_facet"),
      searchUnion: "data_".concat(p, "_search"),
      dimScale: "scale_".concat(p),
      dimCount: "".concat(p, "_count"),
      dimCategorical: "data_".concat(p, "_cat"),
      dimCellSize: "".concat(p, "_cell_size"),
      dimCellSizeCalc: "".concat(p, "_cell_calc")
    };
    return _this;
  }

  _createClass(Cross, [{
    key: "getGrouping",
    value: function getGrouping() {
      return this.binX.fields.concat(this.binY.fields);
    }
  }, {
    key: "build",
    value: function build() {
      var _this2 = this;

      var binX = this.binX,
          binY = this.binY,
          names = this.names,
          prefix = this.prefix,
          props = this.props;
      var axisTextColor = props.axisTextColor,
          colRowTitles = props.colRowTitles,
          globalScope = props.globalScope,
          parentScope = props.parentScope;
      var titles = {
        x: {
          dataName: null,
          quantitative: null
        },
        y: {
          dataName: null,
          quantitative: null
        }
      };
      var dx = {
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
      var dy = {
        dim: 'y',
        bin: binY,
        sortOrder: 'ascending',
        size: parentScope.sizeSignals.layoutHeight,
        layout: parentScope.sizeSignals.layoutHeight,
        min: globalScope.signals.minCellHeight.name,
        out: globalScope.signals.plotHeightOut,
        offset: _constants.SignalNames.FacetPaddingTop,
        padding: "(".concat(_constants.SignalNames.FacetPaddingTop, " + ").concat(_constants.SignalNames.FacetPaddingBottom, ")"),
        dataOut: null,
        scaleName: null,
        position: null
      };
      var dimensions = [dx, dy];
      dimensions.forEach(function (d) {
        var bin = d.bin,
            dim = d.dim,
            padding = d.padding,
            sortOrder = d.sortOrder;
        var data;
        var dataName;
        var countSignal;
        var scale;
        var titleSource = titles[dim];

        if (bin.native === false) {
          (0, _scope.addSignals)(globalScope.scope, bin.maxbinsSignal);

          _scope.addTransforms.apply(void 0, [globalScope.data].concat(_toConsumableArray(bin.transforms)));

          (0, _scope.addData)(globalScope.scope, bin.dataSequence);
          (0, _scope.addTransforms)(bin.dataSequence, {
            type: 'formula',
            expr: "indata(".concat(JSON.stringify(globalScope.markDataName), ", ").concat(JSON.stringify(bin.fields[0]), ", datum[").concat(JSON.stringify(bin.fields[0]), "])"),
            as: _constants.FieldNames.Contains
          });
          data = bin.dataSequence;
          dataName = bin.dataSequence.name;
          countSignal = "length(data(".concat(JSON.stringify(dataName), "))");
          scale = (0, _ordinal.ordinalScale)(dataName, "".concat(names.dimScale, "_").concat(dim), bin.fields);
          titleSource.dataName = bin.dataSequence.name;
        } else {
          dataName = globalScope.markDataName;
          var ord = (0, _ordinal.createOrdinals)(dataName, "".concat(prefix, "_").concat(dim), bin.fields, sortOrder);
          data = ord.data;
          (0, _scope.addData)(globalScope.scope, ord.data);
          countSignal = "length(data(".concat(JSON.stringify(ord.data.name), "))");
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
        var count = "".concat(names.dimCount, "_").concat(dim);
        var calc = "".concat(names.dimCellSizeCalc, "_").concat(dim);
        var size = "".concat(names.dimCellSize, "_").concat(dim);
        (0, _scope.addSignals)(globalScope.scope, {
          name: count,
          update: countSignal
        });
        (0, _scope.addSignals)(globalScope.scope, {
          name: calc,
          update: "".concat(d.layout, " / ").concat(count)
        }, {
          name: size,
          update: "max(".concat(d.min, ", (").concat(calc, " - ").concat(padding, "))")
        });
        (0, _signals.modifySignal)(d.out, 'max', "((".concat(size, " + ").concat(padding, ") * ").concat(count, ")"));
        d.position = _this2.dimensionOffset(d);
      });
      var groupRow = {
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
            expr: "[datum[".concat(JSON.stringify(_constants.FieldNames.FacetSearch), "], merge(parent[").concat(JSON.stringify(_constants.FieldNames.FacetSearch), "], { clause: '&&'})]"),
            as: _constants.FieldNames.FacetSearch
          }]
        }]
      };
      var groupCol = {
        style: 'cell',
        name: prefix,
        type: 'group',
        encode: {
          update: {
            height: {
              signal: "".concat(names.dimCellSize, "_y")
            },
            width: {
              signal: "".concat(names.dimCellSize, "_x")
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
      var offsets = {
        x: this.dimensionOffset(dx),
        y: this.dimensionOffset(dy),
        h: "".concat(names.dimCellSize, "_y"),
        w: "".concat(names.dimCellSize, "_x")
      };
      var sizeSignals = {
        layoutHeight: "".concat(names.dimCellSize, "_y"),
        layoutWidth: "".concat(names.dimCellSize, "_x"),
        colCount: "".concat(names.dimCount, "_x"),
        rowCount: "".concat(names.dimCount, "_y")
      };

      if (colRowTitles) {
        (0, _facetTitle.addFacetColRowTitles)(globalScope.scope, titles.x, titles.y, sizeSignals, axisTextColor);
      }

      return {
        facetScope: groupCol,
        offsets: offsets,
        sizeSignals: sizeSignals,
        titles: titles
      };
    }
  }, {
    key: "dimensionOffset",
    value: function dimensionOffset(d) {
      var names = this.names;
      return "".concat(d.offset, " + (scale(").concat(JSON.stringify(d.scaleName), ", datum[").concat(JSON.stringify(d.bin.fields[0]), "]) - 1) * (").concat(names.dimCellSize, "_").concat(d.dim, " + ").concat(d.padding, ")");
    }
  }]);

  return Cross;
}(_layout.Layout);

exports.Cross = Cross;
},{"./layout":"qZd8","../bin":"fSZ7","../constants":"by41","../facetSearch":"rxrV","../facetTitle":"fFxp","../ordinal":"o7uh","../scope":"VFVY","../signals":"ITWz"}],"zghg":[function(require,module,exports) {
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

var Wrap =
/*#__PURE__*/
function (_Layout) {
  _inherits(Wrap, _Layout);

  function Wrap(props) {
    var _this;

    _classCallCheck(this, Wrap);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Wrap).call(this, props));
    _this.props = props;
    var p = _this.prefix = "wrap_".concat(_this.id);
    _this.bin = (0, _bin.binnable)(_this.prefix, props.globalScope.data.name, props.groupby);
    _this.names = {
      outputData: "data_".concat(p, "_out"),
      rowColumnDataName: "data_".concat(p, "_row_col"),
      cellHeight: "".concat(p, "_cellHeight"),
      cellWidth: "".concat(p, "_cellWidth"),
      fits: "".concat(p, "_fits"),
      target: "".concat(p, "_target"),
      minArea: "".concat(p, "_minArea"),
      aspect: "".concat(p, "_aspect"),
      minAspect: "".concat(p, "_minAspect"),
      idealAspect: "".concat(p, "_idealAspect"),
      dataLength: "".concat(p, "_dataLength"),
      rxc0: "".concat(p, "_rxc0"),
      rxc1: "".concat(p, "_rxc1"),
      rxc2: "".concat(p, "_rxc2"),
      rxc: "".concat(p, "_rxc"),
      growColCount: "".concat(p, "_growColCount"),
      growCellWidth: "".concat(p, "_growCellWidth"),
      fitsArea: "".concat(p, "_fitsArea"),
      colCount: "".concat(p, "_colCount")
    };
    return _this;
  }

  _createClass(Wrap, [{
    key: "getGrouping",
    value: function getGrouping() {
      return this.bin.fields;
    }
  }, {
    key: "build",
    value: function build() {
      var bin = this.bin,
          names = this.names,
          prefix = this.prefix,
          props = this.props;
      var axisTextColor = props.axisTextColor,
          cellTitles = props.cellTitles,
          globalScope = props.globalScope,
          parentScope = props.parentScope;
      var ordinalBinData;

      if (bin.native === false) {
        (0, _scope.addSignals)(globalScope.scope, bin.maxbinsSignal);

        _scope.addTransforms.apply(void 0, [globalScope.data].concat(_toConsumableArray(bin.transforms)));

        (0, _scope.addData)(globalScope.scope, bin.dataSequence);
        (0, _scope.addTransforms)(bin.dataSequence, {
          type: 'formula',
          expr: "indata(".concat(JSON.stringify(globalScope.data.name), ", ").concat(JSON.stringify(bin.fields[0]), ", datum[").concat(JSON.stringify(bin.fields[0]), "])"),
          as: _constants.FieldNames.Contains
        });
        ordinalBinData = bin.dataSequence.name;
      } else {
        var ord = (0, _ordinal.createOrdinals)(globalScope.data.name, prefix, bin.fields, 'ascending');
        (0, _scope.addData)(globalScope.scope, ord.data);
        ordinalBinData = ord.data.name;
      }

      (0, _scope.addData)(globalScope.scope, {
        name: names.rxc0,
        transform: [{
          type: 'sequence',
          start: 1,
          stop: {
            signal: "ceil(sqrt(".concat(names.dataLength, ")) + 1")
          }
        }, {
          type: 'formula',
          expr: "ceil(".concat(names.dataLength, " / datum.data)"),
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
          expr: "ceil(".concat(names.dataLength, " / datum.cols)"),
          as: 'rows'
        }, {
          type: 'formula',
          expr: "".concat(parentScope.sizeSignals.layoutWidth, " / datum.cols"),
          as: 'cellw'
        }, {
          type: 'formula',
          expr: "datum.cols === 1 ? max(datum.cellw, ".concat(_constants.SignalNames.MinCellWidth, ") : datum.cellw"),
          as: 'cellw'
        }, {
          type: 'formula',
          expr: "".concat(parentScope.sizeSignals.layoutHeight, " / datum.rows"),
          as: 'cellh'
        }, {
          type: 'formula',
          expr: "datum.rows === 1 ? max(datum.cellh, ".concat(_constants.SignalNames.MinCellHeight, ") : datum.cellh"),
          as: 'cellh'
        }, {
          type: 'formula',
          expr: "(datum.cellw >= ".concat(_constants.SignalNames.MinCellWidth, " && datum.cellh >= ").concat(_constants.SignalNames.MinCellHeight, ")"),
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
          expr: "abs(datum.".concat(names.aspect, " - ").concat(names.target, ")"),
          as: names.idealAspect
        }, {
          type: 'formula',
          expr: "".concat(names.dataLength, " / (datum.cols * datum.rows)"),
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
          expr: "floor((datum[".concat(JSON.stringify(_constants.FieldNames.Ordinal), "] - 1) / ").concat(names.colCount, ")"),
          as: _constants.FieldNames.WrapRow
        }, {
          type: 'formula',
          expr: "(datum[".concat(JSON.stringify(_constants.FieldNames.Ordinal), "] - 1) % ").concat(names.colCount),
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
      var dataOut = {
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
        update: "".concat(_constants.SignalNames.MinCellWidth, " / ").concat(_constants.SignalNames.MinCellHeight)
      }, {
        name: names.target,
        update: "".concat(names.minAspect, " === 1 ? ", 1.2, " : ").concat(names.minAspect)
      }, {
        name: names.minArea,
        update: "".concat(_constants.SignalNames.MinCellWidth, "*").concat(_constants.SignalNames.MinCellHeight)
      }, {
        name: names.aspect,
        update: "".concat(parentScope.sizeSignals.layoutWidth, " / ").concat(parentScope.sizeSignals.layoutHeight)
      }, {
        name: names.dataLength,
        update: "data(".concat(JSON.stringify(ordinalBinData), ").length")
      }, {
        name: names.growColCount,
        update: "max(floor(".concat(parentScope.sizeSignals.layoutWidth, " / ").concat(_constants.SignalNames.MinCellWidth, "), 1)")
      }, {
        name: names.growCellWidth,
        update: "".concat(parentScope.sizeSignals.layoutWidth, " / ").concat(names.growColCount)
      }, {
        name: names.fitsArea,
        update: "((".concat(names.dataLength, " * ").concat(names.minArea, ") <= (").concat(parentScope.sizeSignals.layoutWidth, " * ").concat(parentScope.sizeSignals.layoutHeight, "))")
      }, {
        name: names.fits,
        update: "".concat(names.fitsArea, " && length(data(").concat(JSON.stringify(names.rxc), ")) > 0")
      }, {
        name: names.colCount,
        update: "".concat(names.fits, " ? data(").concat(JSON.stringify(names.rxc), ")[0].cols : ").concat(names.growColCount)
      }, {
        name: names.cellWidth,
        update: "".concat(names.fits, " ? data(").concat(JSON.stringify(names.rxc), ")[0].cellw : ").concat(names.growCellWidth)
      }, {
        name: names.cellHeight,
        update: "".concat(names.fits, " ? data(").concat(JSON.stringify(names.rxc), ")[0].cellh : ").concat(_constants.SignalNames.MinCellHeight)
      });
      (0, _signals.modifySignal)(globalScope.signals.plotHeightOut, 'max', "(".concat(names.cellHeight, " * ceil(").concat(names.dataLength, " / ").concat(names.colCount, "))"));
      (0, _signals.modifySignal)(globalScope.signals.plotWidthOut, 'max', "(".concat(names.cellWidth, " * ").concat(names.colCount, ")"));
      var signalH = [names.cellHeight, _constants.SignalNames.FacetPaddingTop, _constants.SignalNames.FacetPaddingBottom].join(' - ');
      var signalW = [names.cellWidth, _constants.SignalNames.FacetPaddingLeft].join(' - ');
      var signalX = (0, _scope.addOffsets)(parentScope.offsets.x, "datum[".concat(JSON.stringify(_constants.FieldNames.WrapCol), "] * ").concat(names.cellWidth), _constants.SignalNames.FacetPaddingLeft);
      var signalY = (0, _scope.addOffsets)(parentScope.offsets.y, "datum[".concat(JSON.stringify(_constants.FieldNames.WrapRow), "] * ").concat(names.cellHeight), _constants.SignalNames.FacetPaddingTop);
      var update = {
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
      var offsets = {
        x: signalX,
        y: signalY,
        h: signalH,
        w: signalW
      };
      var group = {
        style: 'cell',
        name: prefix,
        type: 'group',
        from: {
          data: names.rowColumnDataName
        },
        encode: {
          update: update
        }
      };
      (0, _scope.addMarks)(globalScope.markGroup, group);
      var sizeSignals = {
        layoutHeight: "(".concat(names.cellHeight, " - ").concat(_constants.SignalNames.FacetPaddingTop, " - ").concat(_constants.SignalNames.FacetPaddingBottom, ")"),
        layoutWidth: "(".concat(names.cellWidth, " - ").concat(_constants.SignalNames.FacetPaddingLeft, ")"),
        colCount: names.colCount,
        rowCount: "ceil(".concat(names.dataLength, " / ").concat(names.colCount, ")")
      };

      if (cellTitles) {
        (0, _facetTitle.addFacetCellTitles)(group, sizeSignals, axisTextColor);
      }

      return {
        facetScope: group,
        sizeSignals: sizeSignals,
        offsets: offsets
      };
    }
  }]);

  return Wrap;
}(_layout.Layout);

exports.Wrap = Wrap;
},{"./layout":"qZd8","../bin":"fSZ7","../constants":"by41","../expr":"myEr","../facetSearch":"rxrV","../facetTitle":"fFxp","../ordinal":"o7uh","../scope":"VFVY","../signals":"ITWz"}],"sb76":[function(require,module,exports) {
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
  var layoutPair;
  var scales = [];
  var signals;
  var groupby = facetColumn;
  var plotPadding = {
    x: 0,
    y: 0
  };

  switch (facetStyle) {
    case 'cross':
      {
        var props = {
          axisTextColor: axisTextColor,
          colRowTitles: true,
          groupbyX: groupby,
          groupbyY: facetVColumn
        };
        layoutPair = {
          layoutClass: _cross.Cross,
          props: props
        };
        signals = [{
          name: _constants.SignalNames.FacetPaddingBottom,
          update: "".concat(_defaults.facetPaddingBottom)
        }, {
          name: _constants.SignalNames.FacetPaddingLeft,
          update: "".concat(_defaults.facetPaddingLeft)
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
        var _props = {
          axisTextColor: axisTextColor,
          cellTitles: true,
          groupby: groupby
        };
        layoutPair = {
          layoutClass: _wrap.Wrap,
          props: _props
        };
        signals = [{
          name: _constants.SignalNames.FacetPaddingBottom,
          update: "".concat(_defaults.facetPaddingBottom)
        }, {
          name: _constants.SignalNames.FacetPaddingLeft,
          update: "".concat(_defaults.facetPaddingLeft)
        }, {
          name: _constants.SignalNames.FacetPaddingTop,
          update: "".concat(_defaults.facetPaddingTop)
        }];
        break;
      }
  }

  return {
    layoutPair: layoutPair,
    plotPadding: plotPadding,
    scales: scales,
    signals: signals
  };
}
},{"./layouts/cross":"hDE0","./defaults":"pbgY","./constants":"by41","./layouts/wrap":"zghg"}],"GWDe":[function(require,module,exports) {
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
  var specColumns = context.specColumns,
      insight = context.insight,
      specViewOptions = context.specViewOptions;
  var colorColumn = specColumns.color;
  return colorColumn ? colorColumn.isColorData || insight.directColor ? {
    field: (0, _expr.safeFieldName)(colorColumn.name)
  } : {
    scale: scale,
    field: colorColumn.quantitative ? (0, _expr.safeFieldName)(colorColumn.name) : colorFieldName
  } : {
    value: specViewOptions.colors.defaultCube
  };
}

function opacity(context) {
  var result = {
    signal: _constants.SignalNames.MarkOpacity
  };
  return result;
}
},{"./constants":"by41","./expr":"myEr"}],"eQnP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalScope = void 0;

var _constants = require("./constants");

var _scope = require("./scope");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GlobalScope =
/*#__PURE__*/
function () {
  function GlobalScope(props) {
    _classCallCheck(this, GlobalScope);

    var dataName = props.dataName,
        markGroup = props.markGroup,
        scope = props.scope,
        signals = props.signals;
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

  _createClass(GlobalScope, [{
    key: "setMarkDataName",
    value: function setMarkDataName(markDataName) {
      this._markDataName = markDataName;
    }
  }, {
    key: "setMarkGroup",
    value: function setMarkGroup(markGroup) {
      this._markGroup = markGroup;
    }
  }, {
    key: "markDataName",
    get: function get() {
      return this._markDataName;
    }
  }, {
    key: "markGroup",
    get: function get() {
      return this._markGroup;
    }
  }]);

  return GlobalScope;
}();

exports.GlobalScope = GlobalScope;
},{"./constants":"by41","./scope":"VFVY"}],"pv7J":[function(require,module,exports) {
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SpecBuilder =
/*#__PURE__*/
function () {
  function SpecBuilder(props) {
    _classCallCheck(this, SpecBuilder);

    this.props = props;
    this.globalSignals = {
      minCellWidth: {
        name: _constants.SignalNames.MinCellWidth,
        update: "".concat(_defaults.minFacetWidth)
      },
      minCellHeight: {
        name: _constants.SignalNames.MinCellHeight,
        update: "".concat(_defaults.minFacetHeight)
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

  _createClass(SpecBuilder, [{
    key: "validate",
    value: function validate() {
      var _this$props = this.props,
          specCapabilities = _this$props.specCapabilities,
          specContext = _this$props.specContext;
      var roles = specCapabilities.roles;
      var required = roles.filter(function (r) {
        switch (_typeof(r.allowNone)) {
          case 'boolean':
            return !r.allowNone;

          case 'undefined':
            return true;

          case 'function':
            return !r.allowNone(specContext);
        }
      });
      var numeric = roles.filter(function (r) {
        return r.excludeCategoric;
      });
      var errors = required.map(function (r) {
        if (specContext.specColumns[r.role]) {
          return null;
        } else {
          return "Field ".concat(r.role, " is required.");
        }
      }).concat(numeric.map(function (r) {
        if (specContext.specColumns[r.role] && !specContext.specColumns[r.role].quantitative) {
          return "Field ".concat(r.role, " must be quantitative.");
        } else {
          return null;
        }
      })).filter(Boolean);
      return errors;
    }
  }, {
    key: "build",
    value: function build() {
      var specCapabilities = this.props.specCapabilities;
      var errors = this.validate();

      if (errors.length) {
        return {
          errors: errors,
          specCapabilities: specCapabilities,
          vegaSpec: null
        };
      } else {
        var specContext = this.props.specContext;
        var insight = specContext.insight,
            specColumns = specContext.specColumns,
            specViewOptions = specContext.specViewOptions;
        var dataName = 'data_source';

        var _this$initSpec = this.initSpec(dataName),
            vegaSpec = _this$initSpec.vegaSpec,
            groupMark = _this$initSpec.groupMark;

        var _addColor = (0, _color.addColor)({
          scope: vegaSpec,
          dataName: dataName,
          specContext: specContext,
          scaleName: _constants.ScaleNames.Color,
          legendDataName: 'data_legend',
          topLookupName: 'data_topcolorlookup',
          colorReverseSignalName: _constants.SignalNames.ColorReverse
        }),
            topColorField = _addColor.topColorField,
            colorDataName = _addColor.colorDataName;

        var globalScope = new _globalScope.GlobalScope({
          dataName: colorDataName,
          markGroup: groupMark,
          scope: vegaSpec,
          signals: this.globalSignals
        });
        var facetLayout;

        if (insight.columns.facet) {
          var discreteFacetColumn = {
            column: specColumns.facet,
            defaultBins: _defaults.defaultBins,
            maxbins: _defaults.maxbins,
            maxbinsSignalDisplayName: specViewOptions.language.FacetMaxBins,
            maxbinsSignalName: _constants.SignalNames.FacetBins
          };
          var discreteFacetVColumn = {
            column: specColumns.facetV,
            defaultBins: _defaults.defaultBins,
            maxbins: _defaults.maxbins,
            maxbinsSignalDisplayName: specViewOptions.language.FacetVMaxBins,
            maxbinsSignalName: _constants.SignalNames.FacetVBins
          };
          facetLayout = (0, _facetLayout.getFacetLayout)(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn, specViewOptions.colors.axisText);

          _scope.addSignals.apply(void 0, [vegaSpec].concat(_toConsumableArray(facetLayout.signals)));

          _scope.addScales.apply(void 0, [vegaSpec].concat(_toConsumableArray(facetLayout.scales)));

          this.props.layouts = [facetLayout.layoutPair].concat(_toConsumableArray(this.props.layouts));
          this.globalSignals.plotOffsetTop.update = "".concat(facetLayout.plotPadding.y);
          this.globalSignals.plotOffsetRight.update = "".concat(facetLayout.plotPadding.x);
        }

        var _this$iterateLayouts = this.iterateLayouts(globalScope, function (i, innerScope) {
          if (facetLayout && i === 0) {
            globalScope.zSize = innerScope.offsets.h;
          }
        }),
            firstScope = _this$iterateLayouts.firstScope,
            finalScope = _this$iterateLayouts.finalScope,
            specResult = _this$iterateLayouts.specResult,
            allGlobalScales = _this$iterateLayouts.allGlobalScales,
            allEncodingRules = _this$iterateLayouts.allEncodingRules;

        if (specResult) {
          return specResult;
        }

        if (allGlobalScales.length > 0) {
          var axesScopes = facetLayout ? (0, _facetTitle.addFacetAxesGroupMarks)({
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
            globalScope: globalScope,
            allGlobalScales: allGlobalScales,
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
            specColumns: specColumns,
            specViewOptions: specViewOptions,
            axesScopes: axesScopes
          });
        } //add mark to the final scope


        if (finalScope.mark) {
          var update = finalScope.mark.encode.update;
          var outputDataName = 'output';
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
          allEncodingRules.forEach(function (map) {
            for (var key in map) {
              if (update[key]) {
                var arrIn = map[key];

                if (!Array.isArray(update[key])) {
                  (function () {
                    var value = update[key];
                    var arrOut = [];
                    update[key] = arrOut;
                    arrIn.forEach(function (rule) {
                      return arrOut.push(rule);
                    });
                    arrOut.push(value);
                  })();
                } else {
                  (function () {
                    var arrOut = update[key];
                    arrIn.forEach(function (rule) {
                      return arrOut.unshift(rule);
                    });
                  })();
                }
              }
            }
          });
          update.fill = (0, _fill.fill)(specContext, topColorField, _constants.ScaleNames.Color);
          update.opacity = (0, _fill.opacity)(specContext);
        }

        return {
          specCapabilities: specCapabilities,
          vegaSpec: vegaSpec
        };
      }
    }
  }, {
    key: "initSpec",
    value: function initSpec(dataName) {
      var globalSignals = this.globalSignals;
      var minCellWidth = globalSignals.minCellWidth,
          minCellHeight = globalSignals.minCellHeight,
          plotOffsetLeft = globalSignals.plotOffsetLeft,
          plotOffsetBottom = globalSignals.plotOffsetBottom,
          plotOffsetTop = globalSignals.plotOffsetTop,
          plotOffsetRight = globalSignals.plotOffsetRight,
          plotHeightOut = globalSignals.plotHeightOut,
          plotWidthOut = globalSignals.plotWidthOut;
      var specContext = this.props.specContext;
      var insight = specContext.insight;
      var groupMark = {
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
      var inputDataname = 'input';
      var vegaSpec = {
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
          update: "max(".concat(_constants.SignalNames.MinCellHeight, ", ").concat(insight.size.height, ")")
        }, {
          name: _constants.SignalNames.ViewportWidth,
          update: "max(".concat(_constants.SignalNames.MinCellWidth, ", ").concat(insight.size.width, ")")
        }, plotOffsetLeft, plotOffsetTop, plotOffsetBottom, plotOffsetRight, {
          name: _constants.SignalNames.PlotHeightIn,
          update: "".concat(_constants.SignalNames.ViewportHeight, " - ").concat(_constants.SignalNames.PlotOffsetBottom)
        }, {
          name: _constants.SignalNames.PlotWidthIn,
          update: "".concat(_constants.SignalNames.ViewportWidth, " - ").concat(_constants.SignalNames.PlotOffsetLeft, " - ").concat(_constants.SignalNames.PlotOffsetRight)
        }, plotHeightOut, plotWidthOut, {
          name: 'height',
          update: "".concat(_constants.SignalNames.PlotOffsetTop, " + ").concat(_constants.SignalNames.PlotHeightOut, " + ").concat(_constants.SignalNames.PlotOffsetBottom)
        }, {
          name: 'width',
          update: "".concat(_constants.SignalNames.PlotWidthOut, " + ").concat(_constants.SignalNames.PlotOffsetLeft, " + ").concat(_constants.SignalNames.PlotOffsetRight)
        }])
      };
      return {
        vegaSpec: vegaSpec,
        groupMark: groupMark
      };
    }
  }, {
    key: "iterateLayouts",
    value: function iterateLayouts(globalScope, onLayoutBuild) {
      var specResult;
      var parentScope = {
        sizeSignals: globalScope.sizeSignals,
        offsets: globalScope.offsets
      };
      var firstScope;
      var childScope;
      var groupings = [];
      var _this$props2 = this.props,
          layouts = _this$props2.layouts,
          specCapabilities = _this$props2.specCapabilities;
      var allGlobalScales = [];
      var allEncodingRules = [];

      for (var i = 0; i < layouts.length; i++) {
        if (!parentScope) continue;
        var buildProps = {
          globalScope: globalScope,
          parentScope: parentScope,
          axesScales: this.props.axisScales,
          groupings: groupings,
          id: i
        };
        var layout = this.createLayout(layouts[i], buildProps);

        try {
          childScope = layout.build();
          childScope.id = i;
          var groupby = layout.getGrouping();

          if (groupby) {
            groupings.push({
              id: i,
              groupby: groupby,
              fieldOps: [{
                field: null,
                op: 'count',
                as: _constants.FieldNames.Count
              }]
            });
          }

          var sumOp = layout.getAggregateSumOp();

          if (sumOp) {
            groupings[groupings.length - 1].fieldOps.push(sumOp);
          }

          onLayoutBuild(i, childScope);
        } catch (e) {
          specResult = {
            errors: [e.stack],
            specCapabilities: specCapabilities,
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
        firstScope: firstScope,
        finalScope: parentScope,
        specResult: specResult,
        allGlobalScales: allGlobalScales,
        allEncodingRules: allEncodingRules
      };
    }
  }, {
    key: "createLayout",
    value: function createLayout(layoutPair, buildProps) {
      var layoutClass = layoutPair.layoutClass,
          props = layoutPair.props;
      var layoutBuildProps = Object.assign(Object.assign({}, props), buildProps);
      var layout = new layoutClass(layoutBuildProps);
      layout.id = buildProps.id;
      return layout;
    }
  }]);

  return SpecBuilder;
}();

exports.SpecBuilder = SpecBuilder;
},{"./axes":"pHGR","./color":"KNuK","./constants":"by41","./defaults":"pbgY","./facetLayout":"sb76","./facetTitle":"fFxp","./fill":"GWDe","./globalScope":"eQnP","./scope":"VFVY","./signals":"ITWz"}],"MZyF":[function(require,module,exports) {
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
var map = {
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
  var insight = specContext.insight;
  var props;
  var fn = map[insight.chart];

  if (fn) {
    props = fn(specContext);
    return new _specBuilder.SpecBuilder(Object.assign(Object.assign({}, props), {
      specContext: specContext
    }));
  }
}
},{"./barchartH":"yciP","./barchartV":"xQog","./density":"LGcR","./grid":"nYYK","./scatterplot":"H8hU","./stacks":"KUfI","./strips":"Ifo4","./treemap":"XuAL","../specBuilder":"pv7J"}],"fV2I":[function(require,module,exports) {
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
},{}],"LIaf":[function(require,module,exports) {

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
},{"./define.js":"fV2I"}],"XzID":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rad2deg = exports.deg2rad = void 0;
var deg2rad = Math.PI / 180;
exports.deg2rad = deg2rad;
var rad2deg = 180 / Math.PI;
exports.rad2deg = rad2deg;
},{}],"f7Av":[function(require,module,exports) {

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
},{"./define.js":"fV2I","./color.js":"LIaf","./math.js":"XzID"}],"CMX9":[function(require,module,exports) {

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
},{"./define.js":"fV2I","./color.js":"LIaf","./math.js":"XzID"}],"Peej":[function(require,module,exports) {
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
},{"./color.js":"LIaf","./lab.js":"f7Av","./cubehelix.js":"CMX9"}],"euhF":[function(require,module,exports) {
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
  var sample = data[0];
  var fields = sample ? Object.keys(sample) : [];
  var inferences = Object.assign(Object.assign({}, inferTypesFn(data, fields)), columnTypes);
  var columns = fields.map(function (name) {
    var column = {
      name: name,
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
    return columns.filter(function (c) {
      return c.name === name;
    })[0];
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
  columns.forEach(function (column) {
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

  for (var i = 0; i < data.length; i++) {
    if (!isColor(data[i][column.name])) {
      column.isColorData = false;
      return;
    }
  }

  column.isColorData = true;
}

function getStats(data, column) {
  var distinctMap = {};
  var stats = {
    distinctValueCount: null,
    max: null,
    mean: null,
    min: null
  };
  var sum = 0;

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var value = row[column.name];
    distinctMap[value] = true;

    if (stats.max === null || value > stats.max) {
      stats.max = value;
    }

    if (stats.min === null || value < stats.min) {
      stats.min = value;
    }

    var num = +value;

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
  for (var i = 1; i < data.length; i++) {
    if (data[i][column.name] < 0) return true;
  }

  return false;
}

function detectSequentialColumn(column, data) {
  if (data.length < 2) return false;
  var colname = column.name;

  for (var i = 1; i < data.length; i++) {
    if (data[i][colname] !== data[i - 1][colname] + 1) return false;
  }

  return true;
}
},{"d3-color":"Peej"}],"Ioft":[function(require,module,exports) {
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
  var specColumns = context.specColumns;
  var columns = [specColumns.color, specColumns.facet, specColumns.facetV, specColumns.group, specColumns.size, specColumns.sort, specColumns.x, specColumns.y, specColumns.z];
  (0, _inference.inferAll)(columns, currData);
  var specBuilder = (0, _charts.getSpecBuilderForChart)(context);
  var specResult;

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
      var data0 = specResult.vegaSpec.data[0];
      data0.values = currData;
    }
  } else {
    specResult = {
      specCapabilities: null,
      vegaSpec: null,
      errors: ["could not build spec for ".concat(context.insight.chart)]
    };
  }

  return specResult;
}
},{"./charts":"MZyF","./inference":"euhF"}],"Qjn0":[function(require,module,exports) {

},{}],"St5X":[function(require,module,exports) {
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

var _interfaces = require("./interfaces");

Object.keys(_interfaces).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interfaces[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
},{"./build":"Ioft","./constants":"by41","./inference":"euhF","./interfaces":"Qjn0","./types":"Qjn0"}],"Hfbl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var es6_1 = require("../dist/es6");

var dataUrl = '../../../sample-data/demovote.tsv';
var specViewOptions = {
  colors: {
    defaultCube: "steelblue",
    axisLine: "#000",
    axisText: "#000"
  },
  language: {
    count: "Count"
  },
  maxLegends: 20,
  tickSize: 10
};
var data;
var columns;
var container = document.getElementById('vis');
var select = document.getElementById('select-spec');

select.onchange = function () {
  return selected(select.selectedIndex);
};

function selected(selectedIndex) {
  container.innerHTML = "loading spec...";
  fetchInsight(select.options[selectedIndex].value);
}

function fetchInsight(specFilename) {
  fetch("specs/".concat(specFilename)).then(function (response) {
    return response.json();
  }).then(function (insight) {
    return render(insight);
  }).catch(function (error) {
    return container.innerText = error;
  });
}

function render(insight) {
  var specColumns = es6_1.getSpecColumns(insight, columns);
  var context = {
    specColumns: specColumns,
    insight: insight,
    specViewOptions: specViewOptions
  };
  var specResult = es6_1.build(context, data);

  if (specResult.errors) {
    container.innerText = specResult.errors.map(function (error) {
      return error;
    }).join('\n');
  } else {
    renderVegaSpec(specResult.vegaSpec);
  }
}

function renderVegaSpec(vegaSpec) {
  var runtime = vega.parse(vegaSpec);
  var vegaView = new vega.View(runtime, {
    container: container
  });
  vegaView.runAsync().catch(function (e) {
    return container.innerHTML = "error ".concat(e);
  });
}

container.innerHTML = "loading ".concat(dataUrl, "...");
vega.loader().load(dataUrl).then(function (tsv_data) {
  data = vega.read(tsv_data, {
    type: 'tsv',
    parse: 'auto'
  });
  columns = es6_1.getColumnsFromData(vega.inferTypes, data);
  selected(0);
});
},{"../dist/es6":"St5X"}]},{},["Hfbl"], null)