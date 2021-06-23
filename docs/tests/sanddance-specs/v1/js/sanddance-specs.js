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
})({"Brjv":[function(require,module,exports) {
"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorScaleNone = exports.Other = exports.SignalNames = exports.ScaleNames = exports.FieldNames = void 0;
exports.FieldNames = {
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
exports.ScaleNames = {
  Color: 'scale_color',
  X: 'scale_x',
  Y: 'scale_y',
  Z: 'scale_z'
}; //Signal names

exports.SignalNames = {
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

exports.Other = '__Other'; //name of the "no-color" palette

exports.ColorScaleNone = 'none';
},{}],"NBFE":[function(require,module,exports) {
"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scatterSizedDiv = exports.scatterSizedMin = exports.axesOffsetY = exports.axesOffsetX = exports.axesTitlePaddingFacetY = exports.axesTitlePaddingFacetX = exports.axesTitlePaddingY = exports.axesTitlePaddingX = exports.axesTitleLimit = exports.axesLabelLimit = exports.facetPaddingRight = exports.facetPaddingBottom = exports.facetPaddingTop = exports.facetPaddingLeft = exports.minFacetHeight = exports.minFacetWidth = exports.minBarBandWidth = exports.maxbins = exports.defaultBins = void 0; //TODO move these to options

exports.defaultBins = 10;
exports.maxbins = 100;
exports.minBarBandWidth = 15;
exports.minFacetWidth = 140;
exports.minFacetHeight = 180;
exports.facetPaddingLeft = 40;
exports.facetPaddingTop = 40;
exports.facetPaddingBottom = 40;
exports.facetPaddingRight = 40;
exports.axesLabelLimit = 100;
exports.axesTitleLimit = 100;
exports.axesTitlePaddingX = 30;
exports.axesTitlePaddingY = 60;
exports.axesTitlePaddingFacetX = 69;
exports.axesTitlePaddingFacetY = 92;
exports.axesOffsetX = 120;
exports.axesOffsetY = 120;
exports.scatterSizedMin = 10;
exports.scatterSizedDiv = 20;
},{}],"hgy7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allowNoneForSize = void 0;

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

exports.allowNoneForSize = allowNoneForSize;
},{}],"mnz8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var constants_1 = require("../constants");

var defaults_1 = require("../defaults");

var size_1 = require("../size");

function default_1(specContext) {
  var insight = specContext.insight,
      specColumns = specContext.specColumns,
      specViewOptions = specContext.specViewOptions;
  var language = specViewOptions.language;
  var bandProps = {
    orientation: 'horizontal',
    groupby: {
      column: specColumns.y,
      defaultBins: defaults_1.defaultBins,
      maxbinsSignalName: constants_1.SignalNames.YBins,
      maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
      maxbins: defaults_1.maxbins
    },
    minBandWidth: defaults_1.minBarBandWidth,
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
    layoutType: 'Band',
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
      layoutType: 'Strip',
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
      layoutType: 'AggregateContainer',
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
            layoutType: 'Treemap',
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
            layoutType: 'Strip',
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
            layoutType: 'Strip',
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
            layoutType: 'Square',
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
        signals: [constants_1.SignalNames.YBins]
      }, {
        role: 'z',
        axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
        allowNone: true
      }, {
        role: 'color',
        allowNone: true
      }, {
        role: 'sort',
        allowNone: true
      }, {
        role: 'size',
        allowNone: size_1.allowNoneForSize,
        excludeCategoric: true,
        signals: [constants_1.SignalNames.TreeMapMethod]
      }, {
        role: 'facet',
        allowNone: true,
        signals: [constants_1.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [constants_1.SignalNames.FacetVBins]
      }]
    }
  };
}

exports.default = default_1;
},{"../constants":"Brjv","../defaults":"NBFE","../size":"hgy7"}],"CHTs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var constants_1 = require("../constants");

var defaults_1 = require("../defaults");

var size_1 = require("../size");

function default_1(specContext) {
  var insight = specContext.insight,
      specColumns = specContext.specColumns,
      specViewOptions = specContext.specViewOptions;
  var language = specViewOptions.language;
  var bandProps = {
    orientation: 'vertical',
    groupby: {
      column: specColumns.x,
      defaultBins: defaults_1.defaultBins,
      maxbinsSignalName: constants_1.SignalNames.XBins,
      maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
      maxbins: defaults_1.maxbins
    },
    minBandWidth: defaults_1.minBarBandWidth,
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
    layoutType: 'Band',
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
      layoutType: 'Strip',
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
      layoutType: 'AggregateContainer',
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
            layoutType: 'Treemap',
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
            layoutType: 'Strip',
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
            layoutType: 'Strip',
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
            layoutType: 'Square',
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
        signals: [constants_1.SignalNames.XBins]
      }, {
        role: 'z',
        axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
        allowNone: true
      }, {
        role: 'color',
        allowNone: true
      }, {
        role: 'sort',
        allowNone: true
      }, {
        role: 'size',
        allowNone: size_1.allowNoneForSize,
        excludeCategoric: true,
        signals: [constants_1.SignalNames.TreeMapMethod]
      }, {
        role: 'facet',
        allowNone: true,
        signals: [constants_1.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [constants_1.SignalNames.FacetVBins]
      }]
    }
  };
}

exports.default = default_1;
},{"../constants":"Brjv","../defaults":"NBFE","../size":"hgy7"}],"bNhh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var constants_1 = require("../constants");

var defaults_1 = require("../defaults");

var size_1 = require("../size");

function default_1(specContext) {
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
      defaultBins: defaults_1.defaultBins,
      maxbinsSignalName: constants_1.SignalNames.YBins,
      maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
      maxbins: defaults_1.maxbins
    },
    minBandWidth: defaults_1.minBarBandWidth,
    showAxes: true
  };
  var vBandProps = {
    excludeEncodingRuleMap: true,
    orientation: 'vertical',
    groupby: {
      column: specColumns.x,
      defaultBins: defaults_1.defaultBins,
      maxbinsSignalName: constants_1.SignalNames.XBins,
      maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
      maxbins: defaults_1.maxbins
    },
    minBandWidth: defaults_1.minBarBandWidth,
    showAxes: true
  };
  var aggProps = {
    onBuild: null,
    aggregation: null,
    sumBy: specColumns.size
  };
  var layouts = [{
    layoutType: 'Band',
    props: vBandProps
  }, {
    layoutType: 'Band',
    props: hBandProps
  }, {
    layoutType: 'AggregateSquare',
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
          layoutType: 'Treemap',
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
          layoutType: 'Strip',
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
          layoutType: 'Strip',
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
          layoutType: 'Square',
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
        signals: [constants_1.SignalNames.XBins]
      }, {
        role: 'y',
        binnable: true,
        axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
        signals: [constants_1.SignalNames.YBins]
      }, {
        role: 'z',
        axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
        allowNone: true
      }, {
        role: 'color',
        allowNone: true
      }, {
        role: 'sort',
        allowNone: true
      }, {
        role: 'size',
        allowNone: size_1.allowNoneForSize,
        excludeCategoric: true,
        signals: [constants_1.SignalNames.TreeMapMethod]
      }, {
        role: 'facet',
        allowNone: true,
        signals: [constants_1.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [constants_1.SignalNames.FacetVBins]
      }]
    }
  };
}

exports.default = default_1;
},{"../constants":"Brjv","../defaults":"NBFE","../size":"hgy7"}],"lwW1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("../constants");

function default_1(specContext) {
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
      layoutType: 'Square',
      props: squareProps
    }],
    specCapabilities: {
      countsAndSums: false,
      roles: [{
        role: 'z',
        axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
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
        signals: [constants_1.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [constants_1.SignalNames.FacetVBins]
      }]
    }
  };
}

exports.default = default_1;
},{"../constants":"Brjv"}],"rI9B":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("../constants");

function default_1(specContext) {
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
      layoutType: 'Scatter',
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
        axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
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
        signals: [constants_1.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [constants_1.SignalNames.FacetVBins]
      }],
      signals: [constants_1.SignalNames.PointScale, constants_1.SignalNames.ZGrounded]
    }
  };
}

exports.default = default_1;
},{"../constants":"Brjv"}],"o0Wk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var defaults_1 = require("../defaults");

var constants_1 = require("../constants");

function default_1(specContext) {
  var specColumns = specContext.specColumns,
      specViewOptions = specContext.specViewOptions;
  var axisScales = {
    x: {
      title: specColumns.x && specColumns.x.name
    },
    y: {
      title: specColumns.y && specColumns.y.name
    },
    z: {
      title: specViewOptions.language.count
    }
  };
  var hBandProps = {
    excludeEncodingRuleMap: true,
    orientation: 'horizontal',
    groupby: {
      column: specColumns.y,
      defaultBins: defaults_1.defaultBins,
      maxbinsSignalName: constants_1.SignalNames.YBins,
      maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
      maxbins: defaults_1.maxbins
    },
    minBandWidth: defaults_1.minBarBandWidth,
    showAxes: true
  };
  var vBandProps = {
    excludeEncodingRuleMap: true,
    orientation: 'vertical',
    groupby: {
      column: specColumns.x,
      defaultBins: defaults_1.defaultBins,
      maxbinsSignalName: constants_1.SignalNames.XBins,
      maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
      maxbins: defaults_1.maxbins
    },
    minBandWidth: defaults_1.minBarBandWidth,
    showAxes: true
  };
  var stackProps = {
    sort: specColumns.sort
  };
  return {
    axisScales: axisScales,
    customZScale: true,
    layouts: [{
      layoutType: 'Band',
      props: vBandProps
    }, {
      layoutType: 'Band',
      props: hBandProps
    }, {
      layoutType: 'Stack',
      props: stackProps
    }],
    specCapabilities: {
      countsAndSums: false,
      roles: [{
        role: 'x',
        binnable: true,
        axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
        signals: [constants_1.SignalNames.XBins]
      }, {
        role: 'y',
        binnable: true,
        axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
        signals: [constants_1.SignalNames.YBins]
      }, {
        role: 'color',
        allowNone: true
      }, {
        role: 'sort',
        allowNone: true
      }, {
        role: 'facet',
        allowNone: true,
        signals: [constants_1.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [constants_1.SignalNames.FacetVBins]
      }]
    }
  };
}

exports.default = default_1;
},{"../defaults":"NBFE","../constants":"Brjv"}],"oNz7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("../constants");

function default_1(specContext) {
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
      layoutType: 'AggregateContainer',
      props: props
    });
  }

  layouts.push({
    layoutType: 'Strip',
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
        axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
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
        signals: [constants_1.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [constants_1.SignalNames.FacetVBins]
      }]
    }
  };
}

exports.default = default_1;
},{"../constants":"Brjv"}],"Lnwc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("../constants");

function default_1(specContext) {
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
      layoutType: 'AggregateContainer',
      props: props
    });
  }

  layouts.push({
    layoutType: 'Treemap',
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
        axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
        allowNone: true
      }, {
        role: 'color',
        allowNone: true
      }, {
        role: 'facet',
        allowNone: true,
        signals: [constants_1.SignalNames.FacetBins]
      }, {
        role: 'facetV',
        allowNone: true,
        signals: [constants_1.SignalNames.FacetVBins]
      }],
      signals: [constants_1.SignalNames.TreeMapMethod]
    }
  };
}

exports.default = default_1;
},{"../constants":"Brjv"}],"uArX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFacetLayout = void 0;

var defaults_1 = require("./defaults");

function getFacetLayout(facetStyle, facetColumn, facetVColumn, axisTextColor) {
  var layoutPair;
  var groupby = facetColumn;
  var plotPadding = {
    x: 0,
    y: 0
  };
  var facetPadding;

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
          layoutType: 'Cross',
          props: props
        };
        facetPadding = {
          bottom: defaults_1.facetPaddingBottom,
          left: defaults_1.facetPaddingLeft,
          top: 0
        };
        plotPadding.y = defaults_1.facetPaddingTop;
        plotPadding.x = defaults_1.facetPaddingRight;
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
          layoutType: 'Wrap',
          props: _props
        };
        facetPadding = {
          bottom: defaults_1.facetPaddingBottom,
          left: defaults_1.facetPaddingLeft,
          top: defaults_1.facetPaddingTop
        };
        break;
      }
  }

  var facetLayout = {
    facetPadding: facetPadding,
    plotPadding: plotPadding
  };
  return {
    layoutPair: layoutPair,
    facetLayout: facetLayout
  };
}

exports.getFacetLayout = getFacetLayout;
},{"./defaults":"NBFE"}],"bvDx":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpecBuilderPropsForChart = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var barchartH_1 = __importDefault(require("./barchartH"));

var barchartV_1 = __importDefault(require("./barchartV"));

var density_1 = __importDefault(require("./density"));

var grid_1 = __importDefault(require("./grid"));

var scatterplot_1 = __importDefault(require("./scatterplot"));

var stacks_1 = __importDefault(require("./stacks"));

var strips_1 = __importDefault(require("./strips"));

var treemap_1 = __importDefault(require("./treemap"));

var facetLayout_1 = require("../facetLayout");

var constants_1 = require("../constants");

var defaults_1 = require("../defaults");

var map = {
  barchart: barchartV_1.default,
  barchartH: barchartH_1.default,
  barchartV: barchartV_1.default,
  density: density_1.default,
  grid: grid_1.default,
  scatterplot: scatterplot_1.default,
  stacks: stacks_1.default,
  strips: strips_1.default,
  treemap: treemap_1.default
};

function getSpecBuilderPropsForChart(specContext) {
  var insight = specContext.insight,
      specColumns = specContext.specColumns,
      specViewOptions = specContext.specViewOptions;
  var fn = map[insight.chart];

  if (fn) {
    var props = fn(specContext);

    if (insight.columns.facet) {
      var discreteFacetColumn = {
        column: specColumns.facet,
        defaultBins: defaults_1.defaultBins,
        maxbins: defaults_1.maxbins,
        maxbinsSignalDisplayName: specViewOptions.language.FacetMaxBins,
        maxbinsSignalName: constants_1.SignalNames.FacetBins
      };
      var discreteFacetVColumn = {
        column: specColumns.facetV,
        defaultBins: defaults_1.defaultBins,
        maxbins: defaults_1.maxbins,
        maxbinsSignalDisplayName: specViewOptions.language.FacetVMaxBins,
        maxbinsSignalName: constants_1.SignalNames.FacetVBins
      };

      var _facetLayout_1$getFac = facetLayout_1.getFacetLayout(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn, specViewOptions.colors.axisText),
          facetLayout = _facetLayout_1$getFac.facetLayout,
          layoutPair = _facetLayout_1$getFac.layoutPair;

      props.layouts.unshift(layoutPair);
      props.facetLayout = facetLayout;
    }

    return props;
  }
}

exports.getSpecBuilderPropsForChart = getSpecBuilderPropsForChart;
},{"./barchartH":"mnz8","./barchartV":"CHTs","./density":"bNhh","./grid":"lwW1","./scatterplot":"rI9B","./stacks":"o0Wk","./strips":"oNz7","./treemap":"Lnwc","../facetLayout":"uArX","../constants":"Brjv","../defaults":"NBFE"}],"fV2I":[function(require,module,exports) {
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
},{"./color.js":"LIaf","./lab.js":"f7Av","./cubehelix.js":"CMX9"}],"oOk9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStats = exports.inferAll = exports.getSpecColumns = exports.getColumnsFromData = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var d3_color_1 = require("d3-color");

function isColor(cssColorSpecifier) {
  return !!d3_color_1.color(cssColorSpecifier);
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

exports.getColumnsFromData = getColumnsFromData;
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

exports.getSpecColumns = getSpecColumns;
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

exports.inferAll = inferAll;

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

exports.getStats = getStats;

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
},{"d3-color":"Peej"}],"o9XU":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addOffsets = exports.getGroupBy = exports.getDataByName = exports.addTransforms = exports.addSignals = exports.addScales = exports.addMarks = exports.addData = exports.addAxes = void 0;

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

exports.addAxes = addAxes;

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

exports.addData = addData;

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

exports.addMarks = addMarks;

function addScales(scope) {
  var _scope$scales;

  if (!scope.scales) {
    scope.scales = [];
  }

  for (var _len4 = arguments.length, scale = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    scale[_key4 - 1] = arguments[_key4];
  }

  (_scope$scales = scope.scales).push.apply(_scope$scales, _toConsumableArray(scale.filter(Boolean)));
}

exports.addScales = addScales;

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

exports.addSignals = addSignals;

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

exports.addTransforms = addTransforms;

function getDataByName(data, dataName) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].name === dataName) return {
      data: data[i],
      index: i
    };
  }
}

exports.getDataByName = getDataByName;

function getGroupBy(groupings) {
  var groupby = groupings.map(function (g) {
    return g.groupby;
  });
  return groupby.reduce(function (acc, val) {
    return acc.concat(val);
  }, []);
}

exports.getGroupBy = getGroupBy;

function addOffsets() {
  for (var _len7 = arguments.length, offsets = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    offsets[_key7] = arguments[_key7];
  }

  return offsets.filter(Boolean).join(' + ');
}

exports.addOffsets = addOffsets;
},{}],"pHOy":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGlobalAxes = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var constants_1 = require("./constants");

var defaults_1 = require("./defaults");

var scope_1 = require("./scope");

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

    var _loop = function _loop(xyz) {
      var _scales = scales[xyz];

      if (_scales) {
        scope_1.addScales.apply(scope_1, [scope].concat(_toConsumableArray(_scales)));
        var showAxes = globalScales.showAxes;
        var zindex = undefined;

        if (xyz === 'z') {
          showAxes = false;

          if (props.view === '3d' && specViewOptions.zAxisOptions && !props.faceted) {
            if (specViewOptions.zAxisOptions.showZAxis) {
              showAxes = true;
              zindex = specViewOptions.zAxisOptions.zIndex;
            }
          }
        }

        if (showAxes && axisScales) {
          var axisScale = axisScales[xyz];

          if (axisScale) {
            var lineColor = specViewOptions.colors.axisLine;
            var horizontal = xyz === 'x';
            var column = specColumns[xyz] || {
              quantitative: true
            };
            var title = axisScale.title;
            var _props = {
              title: title,
              horizontal: horizontal,
              column: column,
              specViewOptions: specViewOptions,
              lineColor: lineColor,
              titlePadding: axesTitlePadding[xyz],
              labelBaseline: labelBaseline[xyz],
              zindex: zindex
            };
            axesScopes['main'].forEach(function (a) {
              return scope_1.addAxes(a.scope, createAxis(Object.assign(Object.assign({}, _props), {
                scale: a.scale || _scales[0],
                showTitle: a.title,
                showLabels: a.labels,
                showLines: a.lines
              })));
            });

            if (axesScopes[xyz]) {
              axesScopes[xyz].forEach(function (a) {
                return scope_1.addAxes(a.scope, createAxis(Object.assign(Object.assign({}, _props), {
                  scale: a.scale || _scales[0],
                  showTitle: a.title,
                  showLabels: a.labels,
                  showLines: a.lines
                })));
              });
            }

            if (plotOffsetSignals[xyz] && axesOffsets[xyz]) {
              var plotOffsetSignal = plotOffsetSignals[xyz];
              plotOffsetSignal.update = "".concat(axesOffsets[xyz]);
            }
          }
        }
      }
    };

    for (var xyz in scales) {
      _loop(xyz);
    }
  });
}

exports.addGlobalAxes = addGlobalAxes;

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
      titlePadding = props.titlePadding,
      zindex = props.zindex;
  var axis = Object.assign(Object.assign(Object.assign(Object.assign({
    zindex: zindex,
    scale: scale.name,
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
      signal: horizontal ? constants_1.SignalNames.TextAngleX : constants_1.SignalNames.TextAngleY
    },
    titleColor: specViewOptions.colors.axisText,
    titleFontSize: {
      signal: constants_1.SignalNames.TextTitleSize
    },
    titleLimit: defaults_1.axesTitleLimit,
    titlePadding: titlePadding
  }), {
    labels: showLabels
  }), showLabels && {
    labelAlign: horizontal ? 'left' : 'right',
    labelBaseline: labelBaseline,
    labelAngle: {
      signal: horizontal ? constants_1.SignalNames.TextAngleX : constants_1.SignalNames.TextAngleY
    },
    labelColor: specViewOptions.colors.axisText,
    labelFontSize: {
      signal: constants_1.SignalNames.TextSize
    },
    labelLimit: defaults_1.axesLabelLimit
  });

  if (column.quantitative) {
    axis.format = '~r';
  }

  return axis;
}
},{"./constants":"Brjv","./defaults":"NBFE","./scope":"o9XU"}],"y9xY":[function(require,module,exports) {
"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exprSafeFieldName = exports.safeFieldName = void 0;
/**
 * Make sure that the field name is accessible via Vega's Field type
 * https://vega.github.io/vega/docs/types/#Field
 * examples: "source.x", "target['x']", "[my.field]"
 */

function safeFieldName(field) {
  return field.replace('.', '\\.').replace('[', '\\[').replace(']', '\\]');
}

exports.safeFieldName = safeFieldName;
/**
 * Make sure the field name is usable in a Vega expression
 */

function exprSafeFieldName(field) {
  //remove whitespace, period, accessors and logical modifiers
  return field.replace(/[.,:;+=\-/<>{}|~!@#$%^*[\]`'"()?\s\\]/g, '');
}

exports.exprSafeFieldName = exprSafeFieldName;
},{}],"ho4N":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binnableColorScale = exports.pointScale = exports.linearScale = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var constants_1 = require("./constants");

var expr_1 = require("./expr");

function linearScale(scaleName, data, field, range, reverse, zero) {
  var scale = {
    name: scaleName,
    type: 'linear',
    range: range,
    round: true,
    reverse: reverse,
    domain: {
      data: data,
      field: expr_1.safeFieldName(field)
    },
    zero: zero,
    nice: true
  };
  return scale;
}

exports.linearScale = linearScale;

function pointScale(scaleName, data, range, field, reverse) {
  var scale = {
    name: scaleName,
    type: 'point',
    range: range,
    domain: {
      data: data,
      field: expr_1.safeFieldName(field),
      sort: true
    },
    padding: 0.5
  };

  if (reverse !== undefined) {
    scale.reverse = reverse;
  }

  return scale;
}

exports.pointScale = pointScale;

function binnableColorScale(scaleName, colorBin, data, field, scheme) {
  scheme = scheme || constants_1.ColorScaleNone;
  var domain = {
    data: data,
    field: expr_1.safeFieldName(field)
  };
  var range = {
    scheme: scheme
  };
  var reverse = {
    signal: constants_1.SignalNames.ColorReverse
  };

  if (colorBin !== 'continuous') {
    range.count = {
      signal: constants_1.SignalNames.ColorBinCount
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

exports.binnableColorScale = binnableColorScale;
},{"./constants":"Brjv","./expr":"y9xY"}],"Vrvc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifySignal = exports.colorReverseSignal = exports.colorBinCountSignal = exports.textSignals = exports.defaultZProportion = void 0;

var constants_1 = require("./constants");

exports.defaultZProportion = 0.6;

function textSignals(context, heightSignal) {
  var specViewOptions = context.specViewOptions;
  var signals = [{
    name: constants_1.SignalNames.ZProportion,
    value: exports.defaultZProportion,
    bind: {
      name: specViewOptions.language.zScaleProportion,
      debounce: 50,
      input: 'range',
      min: 0.2,
      max: 2,
      step: 0.1
    }
  }, {
    name: constants_1.SignalNames.ZHeight,
    update: "".concat(heightSignal, " * ").concat(constants_1.SignalNames.ZProportion)
  }, {
    name: constants_1.SignalNames.TextScale,
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
    name: constants_1.SignalNames.TextSize,
    update: "".concat(constants_1.SignalNames.TextScale, " * 10")
  }, {
    name: constants_1.SignalNames.TextTitleSize,
    update: "".concat(constants_1.SignalNames.TextScale, " * 15")
  }, {
    name: constants_1.SignalNames.TextAngleX,
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
    name: constants_1.SignalNames.TextAngleY,
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
    name: constants_1.SignalNames.MarkOpacity,
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

exports.textSignals = textSignals;

function colorBinCountSignal(context) {
  var specViewOptions = context.specViewOptions;
  var signal = {
    name: constants_1.SignalNames.ColorBinCount,
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

exports.colorBinCountSignal = colorBinCountSignal;

function colorReverseSignal(context) {
  var specViewOptions = context.specViewOptions;
  var signal = {
    name: constants_1.SignalNames.ColorReverse,
    value: false,
    bind: {
      name: specViewOptions.language.colorReverse,
      input: 'checkbox'
    }
  };
  return signal;
}

exports.colorReverseSignal = colorReverseSignal;

function modifySignal(s, fn, update) {
  s.update = "".concat(fn, "((").concat(s.update, "), (").concat(update, "))");
}

exports.modifySignal = modifySignal;
},{"./constants":"Brjv"}],"sF1D":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLegends = void 0;

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

exports.getLegends = getLegends;
},{}],"K1tP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topLookup = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var constants_1 = require("./constants");

var expr_1 = require("./expr");

function topLookup(column, count, source, legend, lookupName, fieldName, indexName) {
  var data = [{
    name: lookupName,
    source: source,
    transform: [{
      type: 'aggregate',
      groupby: [expr_1.safeFieldName(column.name)]
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
      key: expr_1.safeFieldName(column.name),
      fields: [column.name].map(expr_1.safeFieldName),
      values: [column.name].map(expr_1.safeFieldName),
      as: [fieldName]
    }, {
      type: 'formula',
      expr: "datum[".concat(JSON.stringify(fieldName), "] == null ? '").concat(constants_1.Other, "' : datum[").concat(JSON.stringify(fieldName), "]"),
      as: fieldName
    }]
  }];
  return data;
}

exports.topLookup = topLookup;
},{"./constants":"Brjv","./expr":"y9xY"}],"AW9l":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addColor = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var scope_1 = require("./scope");

var scales_1 = require("./scales");

var signals_1 = require("./signals");

var constants_1 = require("./constants");

var legends_1 = require("./legends");

var top_1 = require("./top");

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
  var legends = legends_1.getLegends(specContext, scaleName);

  if (legends) {
    scope.legends = legends;
  }

  var categoricalColor = specColumns.color && !specColumns.color.quantitative;

  if (categoricalColor) {
    scope_1.addData.apply(scope_1, [scope].concat(_toConsumableArray(top_1.topLookup(specColumns.color, specViewOptions.maxLegends, dataName, legendDataName, topLookupName, constants_1.FieldNames.TopColor, constants_1.FieldNames.TopIndex))));
    colorDataName = legendDataName;
  }

  if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
    if (specColumns.color.quantitative) {
      scope_1.addScales(scope, scales_1.binnableColorScale(scaleName, insight.colorBin, dataName, specColumns.color.name, insight.scheme));
    } else {
      scope_1.addScales(scope, {
        name: scaleName,
        type: 'ordinal',
        domain: {
          data: colorDataName,
          field: constants_1.FieldNames.TopColor,
          sort: true
        },
        range: {
          scheme: insight.scheme || constants_1.ColorScaleNone
        },
        reverse: {
          signal: colorReverseSignalName
        }
      });
    }
  }

  scope_1.addSignals(scope, signals_1.colorBinCountSignal(specContext), signals_1.colorReverseSignal(specContext));
  return {
    topColorField: constants_1.FieldNames.TopColor,
    colorDataName: colorDataName
  };
}

exports.addColor = addColor;
},{"./scope":"o9XU","./scales":"ho4N","./signals":"Vrvc","./constants":"Brjv","./legends":"sF1D","./top":"K1tP"}],"aYnH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.facetColumnHeaderFooter = exports.facetRowHeaderFooter = exports.addFacetAxesGroupMarks = exports.addFacetCellTitles = exports.addFacetColRowTitles = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var scope_1 = require("./scope");

var constants_1 = require("./constants");

function addFacetColRowTitles(globalScope, colTitleSource, rowTitleSource, sizeSignals, axisTextColor) {
  var titleSignal = "parent[".concat(JSON.stringify(constants_1.FieldNames.FacetTitle), "]");
  var index = "datum[".concat(JSON.stringify(constants_1.FieldNames.Ordinal), "] - 1");
  var col = facetColumnHeaderFooter(colTitleSource.dataName, sizeSignals, index);
  var row = facetRowHeaderFooter(rowTitleSource.dataName, sizeSignals, index);
  scope_1.addMarks(globalScope, col.header, row.footer);
  scope_1.addMarks(col.header, {
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
          signal: "{search: parent[".concat(JSON.stringify(constants_1.FieldNames.FacetSearch), "]}")
        },
        x: {
          signal: "".concat(sizeSignals.layoutWidth, " / 2")
        },
        limit: {
          signal: sizeSignals.layoutWidth
        },
        fontSize: {
          signal: constants_1.SignalNames.TextSize
        },
        text: {
          signal: titleSignal
        }
      }
    }
  });
  scope_1.addMarks(row.footer, {
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
          signal: "{search: parent[".concat(JSON.stringify(constants_1.FieldNames.FacetSearch), "]}")
        },
        y: {
          signal: "".concat(sizeSignals.layoutHeight, " / 2")
        },
        limit: {
          signal: constants_1.SignalNames.PlotOffsetRight
        },
        fontSize: {
          signal: constants_1.SignalNames.TextSize
        },
        text: {
          signal: titleSignal
        }
      }
    }
  });
}

exports.addFacetColRowTitles = addFacetColRowTitles;

function addFacetCellTitles(scope, sizeSignals, axisTextColor) {
  scope_1.addMarks(scope, {
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
          signal: "{search: parent[".concat(JSON.stringify(constants_1.FieldNames.FacetSearch), "]}")
        },
        x: {
          signal: "(".concat(sizeSignals.layoutWidth, ") / 2")
        },
        text: {
          signal: "parent[".concat(JSON.stringify(constants_1.FieldNames.FacetTitle), "]")
        },
        fontSize: {
          signal: constants_1.SignalNames.TextSize
        },
        limit: {
          signal: sizeSignals.layoutWidth
        },
        y: {
          signal: "-".concat(constants_1.SignalNames.FacetPaddingTop, " / 2")
        }
      }
    }
  });
}

exports.addFacetCellTitles = addFacetCellTitles;

function addFacetAxesGroupMarks(props) {
  var colSeqName = props.colSeqName,
      colTitleScale = props.colTitleScale,
      globalScope = props.globalScope,
      facetScope = props.facetScope,
      plotScope = props.plotScope,
      rowSeqName = props.rowSeqName,
      rowTitleScale = props.rowTitleScale;
  var sizeSignals = facetScope.sizeSignals;
  var colSequence = createSequence(colSeqName, sizeSignals.colCount);
  var rowSequence = createSequence(rowSeqName, sizeSignals.rowCount);
  var index = 'datum.data';
  var col = facetColumnHeaderFooter(colSeqName, sizeSignals, index);
  var row = facetRowHeaderFooter(rowSeqName, sizeSignals, index);
  scope_1.addData(globalScope, colSequence, rowSequence);
  scope_1.addMarks(globalScope, col.footer, row.header);
  scope_1.addScales(globalScope, colTitleScale, rowTitleScale);
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
      scale: colTitleScale,
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
      scale: rowTitleScale,
      lines: false,
      labels: false,
      title: true
    }]
  };
  return map;
}

exports.addFacetAxesGroupMarks = addFacetAxesGroupMarks;

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
            signal: "".concat(constants_1.SignalNames.PlotOffsetTop, " + ").concat(constants_1.SignalNames.FacetPaddingTop, " + (").concat(index, ") * (").concat(sizeSignals.layoutHeight, " + ").concat(constants_1.SignalNames.FacetPaddingTop, " + ").concat(constants_1.SignalNames.FacetPaddingBottom, ")")
          },
          height: {
            signal: sizeSignals.layoutHeight
          }
        }
      }
    };
  };

  var header = rowFn(constants_1.SignalNames.PlotOffsetLeft);
  var footer = rowFn("".concat(constants_1.SignalNames.PlotOffsetLeft, " + ").concat(constants_1.SignalNames.PlotWidthOut, " + ").concat(constants_1.SignalNames.PlotOffsetRight, " / 2"));
  return {
    header: header,
    footer: footer
  };
}

exports.facetRowHeaderFooter = facetRowHeaderFooter;

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
            signal: "(".concat(index, ") * (").concat(sizeSignals.layoutWidth, " + ").concat(constants_1.SignalNames.FacetPaddingLeft, ") + ").concat(constants_1.SignalNames.FacetPaddingLeft, " + ").concat(constants_1.SignalNames.PlotOffsetLeft)
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


  var header = colFn("".concat(constants_1.SignalNames.PlotOffsetTop, " / 2"));
  var footer = colFn("".concat(constants_1.SignalNames.PlotOffsetTop, " + ").concat(constants_1.SignalNames.PlotHeightOut));
  return {
    header: header,
    footer: footer
  };
}

exports.facetColumnHeaderFooter = facetColumnHeaderFooter;

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
},{"./scope":"o9XU","./constants":"Brjv"}],"YYBq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.opacity = exports.fill = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var constants_1 = require("./constants");

var expr_1 = require("./expr");

function fill(context, colorFieldName, scale) {
  var specColumns = context.specColumns,
      insight = context.insight,
      specViewOptions = context.specViewOptions;
  var colorColumn = specColumns.color;
  return colorColumn ? colorColumn.isColorData || insight.directColor ? {
    field: expr_1.safeFieldName(colorColumn.name)
  } : {
    scale: scale,
    field: colorColumn.quantitative ? expr_1.safeFieldName(colorColumn.name) : colorFieldName
  } : {
    value: specViewOptions.colors.defaultCube
  };
}

exports.fill = fill;

function opacity(context) {
  var result = {
    signal: constants_1.SignalNames.MarkOpacity
  };
  return result;
}

exports.opacity = opacity;
},{"./constants":"Brjv","./expr":"y9xY"}],"ITwQ":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalScope = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var constants_1 = require("./constants");

var scope_1 = require("./scope");

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
    this.data = scope_1.getDataByName(scope.data, dataName).data;
    this._markDataName = dataName;
    this.offsets = {
      x: '0',
      y: '0',
      h: constants_1.SignalNames.PlotHeightIn,
      w: constants_1.SignalNames.PlotWidthIn
    };
    this.sizeSignals = {
      layoutHeight: constants_1.SignalNames.PlotHeightIn,
      layoutWidth: constants_1.SignalNames.PlotWidthIn
    };
    this.zSize = constants_1.SignalNames.PlotHeightIn;
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
},{"./constants":"Brjv","./scope":"o9XU"}],"wrUK":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

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
},{}],"iEjb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testForCollapseSelection = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var constants_1 = require("./constants");

function testForCollapseSelection() {
  return "datum.".concat(constants_1.FieldNames.Collapsed);
}

exports.testForCollapseSelection = testForCollapseSelection;
},{"./constants":"Brjv"}],"z5gu":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregateContainer = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var layout_1 = require("./layout");

var constants_1 = require("../constants");

var expr_1 = require("../expr");

var scope_1 = require("../scope");

var selection_1 = require("../selection");

var AggregateContainer =
/*#__PURE__*/
function (_layout_1$Layout) {
  _inherits(AggregateContainer, _layout_1$Layout);

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
          field: expr_1.safeFieldName(this.props.sumBy.name),
          op: 'sum',
          as: constants_1.FieldNames.Sum
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
      scope_1.addTransforms(globalScope.data, Object.assign(Object.assign({}, this.getTransforms(aggregation, scope_1.getGroupBy(groupings))), {
        as: [names.aggregateField]
      }), {
        type: 'extent',
        field: expr_1.safeFieldName(names.aggregateField),
        signal: names.globalAggregateExtentSignal
      });
      scope_1.addSignals(globalScope.scope, {
        name: props.globalAggregateMaxExtentSignal,
        update: "".concat(names.globalAggregateExtentSignal, "[1]")
      });
      var horizontal = dock === 'left';
      var groupScaled = "scale(".concat(JSON.stringify(names.scale), ", datum[").concat(JSON.stringify(names.aggregateField), "])");
      var offsets = {
        x: parentScope.offsets.x,
        y: scope_1.addOffsets(parentScope.offsets.y, dock === 'bottom' ? groupScaled : ''),
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
      scope_1.addSignals(globalScope.scope, {
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
            x: horizontal ? [scale] : undefined,
            y: horizontal ? undefined : [scale]
          }
        },
        encodingRuleMap: horizontal ? {
          x: [{
            test: selection_1.testForCollapseSelection(),
            signal: parentScope.offsets.x
          }],
          width: [{
            test: selection_1.testForCollapseSelection(),
            value: 0
          }]
        } : {
          y: [{
            test: selection_1.testForCollapseSelection(),
            signal: dock === 'top' ? parentScope.offsets.y : scope_1.addOffsets(parentScope.offsets.y, parentScope.offsets.h)
          }],
          height: [{
            test: selection_1.testForCollapseSelection(),
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
        groupby: groupby.map(expr_1.safeFieldName),
        ops: [aggregation]
      };

      if (aggregation === 'sum') {
        trans.fields = [this.props.sumBy.name].map(expr_1.safeFieldName);
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
}(layout_1.Layout);

exports.AggregateContainer = AggregateContainer;
},{"./layout":"wrUK","../constants":"Brjv","../expr":"y9xY","../scope":"o9XU","../selection":"iEjb"}],"XX9h":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregateSquare = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var layout_1 = require("./layout");

var expr_1 = require("../expr");

var scope_1 = require("../scope");

var selection_1 = require("../selection");

var AggregateSquare =
/*#__PURE__*/
function (_layout_1$Layout) {
  _inherits(AggregateSquare, _layout_1$Layout);

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
      scope_1.addTransforms(globalScope.data, Object.assign(Object.assign({}, this.getTransforms(aggregation, scope_1.getGroupBy(groupings))), {
        as: [names.aggregateField]
      }), {
        type: 'extent',
        field: expr_1.safeFieldName(names.aggregateField),
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
        x: scope_1.addOffsets(parentScope.offsets.x, "(".concat(parentScope.offsets.w, " - ").concat(squareSide, ") / 2")),
        y: scope_1.addOffsets(parentScope.offsets.y, "(".concat(parentScope.offsets.h, " - ").concat(squareSide, ") / 2")),
        h: squareSide,
        w: squareSide
      };
      return {
        offsets: offsets,
        sizeSignals: {
          layoutHeight: null,
          layoutWidth: null
        },
        encodingRuleMap: {
          y: [{
            test: selection_1.testForCollapseSelection(),
            signal: offsets.y
          }],
          height: [{
            test: selection_1.testForCollapseSelection(),
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
        groupby: groupby.map(expr_1.safeFieldName),
        ops: [aggregation]
      };

      if (aggregation === 'sum') {
        trans.fields = [this.props.sumBy.name].map(expr_1.safeFieldName);
      }

      return trans;
    }
  }]);

  return AggregateSquare;
}(layout_1.Layout);

exports.AggregateSquare = AggregateSquare;
},{"./layout":"wrUK","../expr":"y9xY","../scope":"o9XU","../selection":"iEjb"}],"p0ME":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binnable = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var constants_1 = require("./constants");

var expr_1 = require("./expr");

function binnable(prefix, domainDataName, discreteColumn) {
  var column = discreteColumn.column,
      defaultBins = discreteColumn.defaultBins,
      maxbins = discreteColumn.maxbins,
      maxbinsSignalDisplayName = discreteColumn.maxbinsSignalDisplayName,
      maxbinsSignalName = discreteColumn.maxbinsSignalName;

  if (column.quantitative) {
    var field = "".concat(prefix, "_bin_").concat(expr_1.exprSafeFieldName(column.name));
    var fieldEnd = "".concat(field, "_end");
    var binSignal = "".concat(field, "_bins");
    var extentSignal = "".concat(field, "_bin_extent");
    domainDataName = "".concat(field, "_sequence"); //override the data name

    var extentTransform = {
      type: 'extent',
      field: expr_1.safeFieldName(column.name),
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
      field: expr_1.safeFieldName(column.name),
      as: [field, fieldEnd],
      signal: binSignal,
      extent: {
        signal: "[".concat(extentSignal, "[0], ").concat(extentSignal, "[1] + 1e-11]")
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
        as: [constants_1.FieldNames.Ordinal]
      }, {
        type: 'formula',
        expr: "datum.data === ".concat(binSignal, ".start"),
        as: constants_1.FieldNames.First
      }, {
        type: 'formula',
        expr: "datum.data === ".concat(binSignal, ".stop - ").concat(binSignal, ".step"),
        as: constants_1.FieldNames.Last
      }]
    };
    var augmentBinnable = {
      discreteColumn: discreteColumn,
      native: false,
      transforms: [extentTransform, binTransform],
      fields: [field, fieldEnd],
      binSignal: binSignal,
      dataSequence: dataSequence,
      domainDataName: domainDataName,
      signals: [maxbinsSignal],
      fullScaleDataname: dataSequence.name
    };
    return augmentBinnable;
  } else {
    var nativeBinnable = {
      discreteColumn: discreteColumn,
      native: true,
      fields: [column.name],
      domainDataName: domainDataName,
      fullScaleDataname: domainDataName
    };
    return nativeBinnable;
  }
}

exports.binnable = binnable;
},{"./constants":"Brjv","./expr":"y9xY"}],"H2wZ":[function(require,module,exports) {
"use strict";

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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Band = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var layout_1 = require("./layout");

var bin_1 = require("../bin");

var expr_1 = require("../expr");

var scope_1 = require("../scope");

var selection_1 = require("../selection");

var signals_1 = require("../signals");

var Band =
/*#__PURE__*/
function (_layout_1$Layout) {
  _inherits(Band, _layout_1$Layout);

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
    _this.bin = bin_1.binnable(_this.prefix, props.globalScope.data.name, props.groupby);
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
        scope_1.addSignals.apply(scope_1, [globalScope.scope].concat(_toConsumableArray(bin.signals)));
        scope_1.addTransforms.apply(scope_1, [globalScope.data].concat(_toConsumableArray(bin.transforms)));
        scope_1.addData(globalScope.scope, bin.dataSequence);
      } //TODO don't add this, use existing dataset


      scope_1.addData(globalScope.scope, {
        name: names.accumulative,
        source: bin.fullScaleDataname,
        transform: [{
          type: 'aggregate',
          groupby: this.getGrouping().map(expr_1.safeFieldName),
          ops: ['count']
        }]
      });
      var horizontal = orientation === 'horizontal';
      var minCellSignal = horizontal ? globalScope.signals.minCellHeight : globalScope.signals.minCellWidth;
      signals_1.modifySignal(minCellSignal, 'max', "length(data(".concat(JSON.stringify(names.accumulative), ")) * ").concat(minBandWidth));
      scope_1.addSignals(globalScope.scope, {
        name: names.bandWidth,
        update: "bandwidth(".concat(JSON.stringify(horizontal ? names.yScale : names.xScale), ")")
      });
      var scales = this.getScales(bin, horizontal);
      var encodingRuleMap;

      if (!props.excludeEncodingRuleMap) {
        encodingRuleMap = horizontal ? {
          x: [{
            test: selection_1.testForCollapseSelection(),
            value: parentScope.offsets.x
          }],
          width: [{
            test: selection_1.testForCollapseSelection(),
            value: 0
          }]
        } : {
          y: [{
            test: selection_1.testForCollapseSelection(),
            signal: scope_1.addOffsets(parentScope.offsets.y, parentScope.offsets.h)
          }],
          height: [{
            test: selection_1.testForCollapseSelection(),
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
            x: horizontal ? undefined : scales,
            y: horizontal ? scales : undefined
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
        x: scope_1.addOffsets(parentScope.offsets.x, horizontal ? '' : "scale(".concat(JSON.stringify(names.xScale), ", datum[").concat(JSON.stringify(binField), "])")),
        y: scope_1.addOffsets(parentScope.offsets.y, horizontal ? "scale(".concat(JSON.stringify(names.yScale), ", datum[").concat(JSON.stringify(binField), "])") : ''),
        h: horizontal ? names.bandWidth : parentScope.offsets.h,
        w: horizontal ? parentScope.offsets.w : names.bandWidth
      };
    }
  }, {
    key: "getScales",
    value: function getScales(bin, horizontal) {
      var names = this.names;
      var parentScope = this.props.parentScope;
      var binField = expr_1.safeFieldName(bin.fields[0]);
      var scales = [];
      var bandScale;

      if (horizontal) {
        bandScale = {
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
        bandScale = {
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

      scales.push(bandScale);
      return scales;
    }
  }]);

  return Band;
}(layout_1.Layout);

exports.Band = Band;
},{"./layout":"wrUK","../bin":"p0ME","../expr":"y9xY","../scope":"o9XU","../selection":"iEjb","../signals":"Vrvc"}],"l3GW":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeAsVegaExpression = exports.displayBin = void 0;

function displayBin(bin) {
  var val = function val(index) {
    return "datum[".concat(JSON.stringify(bin.fields[index]), "]");
  };

  return bin.discreteColumn.column.quantitative ? "format(".concat(val(0), ", '~r') + ' - ' + format(").concat(val(1), ", '~r')") : val(0);
}

exports.displayBin = displayBin;

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

exports.serializeAsVegaExpression = serializeAsVegaExpression;
},{}],"W818":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ordinalScale = exports.createOrdinals = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var constants_1 = require("./constants");

var expr_1 = require("./expr");

function createOrdinals(source, prefix, binFields, sortOrder) {
  var _binFields = binFields.map(expr_1.safeFieldName);

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
      as: [constants_1.FieldNames.Ordinal]
    }]
  };
  return {
    data: data,
    scale: ordinalScale(dataName, "scale_".concat(prefix, "_order"), binFields)
  };
}

exports.createOrdinals = createOrdinals;

function ordinalScale(dataName, scaleName, binFields) {
  return {
    type: 'ordinal',
    name: scaleName,
    domain: {
      data: dataName,
      field: expr_1.safeFieldName(binFields[0])
    },
    range: {
      data: dataName,
      field: constants_1.FieldNames.Ordinal
    }
  };
}

exports.ordinalScale = ordinalScale;
},{"./constants":"Brjv","./expr":"y9xY"}],"WoHO":[function(require,module,exports) {
"use strict";

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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cross = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var layout_1 = require("./layout");

var bin_1 = require("../bin");

var constants_1 = require("../constants");

var facetSearch_1 = require("../facetSearch");

var facetTitle_1 = require("../facetTitle");

var ordinal_1 = require("../ordinal");

var scope_1 = require("../scope");

var signals_1 = require("../signals");

var Cross =
/*#__PURE__*/
function (_layout_1$Layout) {
  _inherits(Cross, _layout_1$Layout);

  function Cross(props) {
    var _this;

    _classCallCheck(this, Cross);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cross).call(this, props));
    _this.props = props;
    var p = _this.prefix = "cross_".concat(_this.id);
    _this.binX = bin_1.binnable("".concat(p, "_x"), props.globalScope.data.name, props.groupbyX);
    _this.binY = bin_1.binnable("".concat(p, "_y"), props.globalScope.data.name, props.groupbyY);
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
        offset: constants_1.SignalNames.FacetPaddingLeft,
        padding: constants_1.SignalNames.FacetPaddingLeft,
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
        offset: constants_1.SignalNames.FacetPaddingTop,
        padding: "(".concat(constants_1.SignalNames.FacetPaddingTop, " + ").concat(constants_1.SignalNames.FacetPaddingBottom, ")"),
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
          scope_1.addSignals.apply(scope_1, [globalScope.scope].concat(_toConsumableArray(bin.signals)));
          scope_1.addTransforms.apply(scope_1, [globalScope.data].concat(_toConsumableArray(bin.transforms)));
          scope_1.addData(globalScope.scope, bin.dataSequence);
          scope_1.addTransforms(bin.dataSequence, {
            type: 'formula',
            expr: "indata(".concat(JSON.stringify(globalScope.markDataName), ", ").concat(JSON.stringify(bin.fields[0]), ", datum[").concat(JSON.stringify(bin.fields[0]), "])"),
            as: constants_1.FieldNames.Contains
          });
          data = bin.dataSequence;
          dataName = bin.dataSequence.name;
          countSignal = "length(data(".concat(JSON.stringify(dataName), "))");
          scale = ordinal_1.ordinalScale(dataName, "".concat(names.dimScale, "_").concat(dim), bin.fields);
          titleSource.dataName = bin.dataSequence.name;
        } else {
          dataName = globalScope.markDataName;
          var ord = ordinal_1.createOrdinals(dataName, "".concat(prefix, "_").concat(dim), bin.fields, sortOrder);
          data = ord.data;
          scope_1.addData(globalScope.scope, ord.data);
          countSignal = "length(data(".concat(JSON.stringify(ord.data.name), "))");
          scale = ord.scale;
          titleSource.dataName = ord.data.name;
        }

        titleSource.quantitative = bin.discreteColumn.column.quantitative;
        d.dataOut = data;
        d.scaleName = scale.name;
        scope_1.addTransforms(data, {
          type: 'formula',
          expr: facetSearch_1.serializeAsVegaExpression(bin, constants_1.FieldNames.First, constants_1.FieldNames.Last),
          as: constants_1.FieldNames.FacetSearch
        }, {
          type: 'formula',
          expr: facetSearch_1.displayBin(bin),
          as: constants_1.FieldNames.FacetTitle
        });
        scope_1.addScales(globalScope.scope, scale);
        var count = "".concat(names.dimCount, "_").concat(dim);
        var calc = "".concat(names.dimCellSizeCalc, "_").concat(dim);
        var size = "".concat(names.dimCellSize, "_").concat(dim);
        scope_1.addSignals(globalScope.scope, {
          name: count,
          update: countSignal
        });
        scope_1.addSignals(globalScope.scope, {
          name: calc,
          update: "".concat(d.layout, " / ").concat(count)
        }, {
          name: size,
          update: "max(".concat(d.min, ", (").concat(calc, " - ").concat(padding, "))")
        });
        signals_1.modifySignal(d.out, 'max', "((".concat(size, " + ").concat(padding, ") * ").concat(count, ")"));
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
            expr: "[datum[".concat(JSON.stringify(constants_1.FieldNames.FacetSearch), "], merge(parent[").concat(JSON.stringify(constants_1.FieldNames.FacetSearch), "], { clause: '&&'})]"),
            as: constants_1.FieldNames.FacetSearch
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
      scope_1.addMarks(globalScope.markGroup, groupRow);
      scope_1.addMarks(groupRow, groupCol);
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
        facetTitle_1.addFacetColRowTitles(globalScope.scope, titles.x, titles.y, sizeSignals, axisTextColor);
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
}(layout_1.Layout);

exports.Cross = Cross;
},{"./layout":"wrUK","../bin":"p0ME","../constants":"Brjv","../facetSearch":"l3GW","../facetTitle":"aYnH","../ordinal":"W818","../scope":"o9XU","../signals":"Vrvc"}],"bIfR":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scatter = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var layout_1 = require("./layout");

var constants_1 = require("../constants");

var defaults_1 = require("../defaults");

var expr_1 = require("../expr");

var scales_1 = require("../scales");

var scope_1 = require("../scope");

var selection_1 = require("../selection");

var Scatter =
/*#__PURE__*/
function (_layout_1$Layout) {
  _inherits(Scatter, _layout_1$Layout);

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
      scope_1.addSignals(globalScope.scope, {
        name: constants_1.SignalNames.PointScale,
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
        name: constants_1.SignalNames.ZGrounded,
        value: false,
        bind: {
          name: zGrounded,
          input: 'checkbox'
        }
      });

      if (qsize) {
        scope_1.addTransforms(globalScope.data, {
          type: 'extent',
          field: expr_1.safeFieldName(qsize.name),
          signal: names.sizeExtent
        });
        scope_1.addScales(globalScope.scope, {
          name: names.sizeScale,
          type: 'linear',
          domain: [0, {
            signal: "".concat(names.sizeExtent, "[1]")
          }],
          range: [0, {
            signal: names.sizeRange
          }]
        });
        scope_1.addSignals(globalScope.scope, {
          name: names.sizeRange,
          update: "min(".concat(parentScope.sizeSignals.layoutHeight, ", ").concat(parentScope.sizeSignals.layoutWidth, ") / ").concat(defaults_1.scatterSizedDiv)
        });
      }

      scope_1.addData(globalScope.scope, {
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
      var sizeValueSignal = qsize ? "scale(".concat(JSON.stringify(names.sizeScale), ", datum[").concat(JSON.stringify(qsize.name), "]) * ").concat(constants_1.SignalNames.PointScale) : constants_1.SignalNames.PointScale;
      var update = Object.assign({
        height: [{
          test: selection_1.testForCollapseSelection(),
          value: 0
        }, {
          signal: sizeValueSignal
        }],
        width: {
          signal: sizeValueSignal
        }
      }, z && {
        z: [{
          test: selection_1.testForCollapseSelection(),
          value: 0
        }, {
          signal: "".concat(constants_1.SignalNames.ZGrounded, " ? 0 : ").concat(zValue)
        }],
        depth: [{
          test: selection_1.testForCollapseSelection(),
          value: 0
        }, {
          signal: "".concat(constants_1.SignalNames.ZGrounded, " ? ").concat(zValue, " : ").concat(sizeValueSignal)
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
        signal: "(".concat(globalScope.zSize, ") * ").concat(constants_1.SignalNames.ZProportion)
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
          scale = scales_1.linearScale(scaleName, globalScope.data.name, column.name, [0, {
            signal: signal
          }], reverse, false);
        } else {
          scale = scales_1.pointScale(scaleName, globalScope.data.name, [0, {
            signal: signal
          }], column.name, reverse);
        }

        globalScales.scales[xyz] = [scale];
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
      scope_1.addMarks(globalScope.markGroup, mark);
      return {
        offsets: {
          x: scope_1.addOffsets(parentScope.offsets.x, "scale(".concat(JSON.stringify(names.xScale), ", datum[").concat(JSON.stringify(x.name), "])")),
          y: scope_1.addOffsets(parentScope.offsets.y, "scale(".concat(JSON.stringify(names.yScale), ", datum[").concat(JSON.stringify(y.name), "]) - ").concat(sizeValueSignal)),
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
            test: selection_1.testForCollapseSelection(),
            signal: scope_1.addOffsets(parentScope.offsets.y, parentScope.sizeSignals.layoutHeight)
          }]
        }
      };
    }
  }]);

  return Scatter;
}(layout_1.Layout);

exports.Scatter = Scatter;
},{"./layout":"wrUK","../constants":"Brjv","../defaults":"NBFE","../expr":"y9xY","../scales":"ho4N","../scope":"o9XU","../selection":"iEjb"}],"heLX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addZScale = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var constants_1 = require("./constants");

var scales_1 = require("./scales");

function addZScale(z, zSize, dataName, zScaleName) {
  if (z) {
    var zRange = [0, {
      signal: "(".concat(zSize, ") * ").concat(constants_1.SignalNames.ZProportion)
    }];
    var scale = z.quantitative ? scales_1.linearScale(zScaleName, dataName, z.name, zRange, false, true) : scales_1.pointScale(zScaleName, dataName, zRange, z.name, false);
    return scale;
  }
}

exports.addZScale = addZScale;
},{"./constants":"Brjv","./scales":"ho4N"}],"Nfji":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Square = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var layout_1 = require("./layout");

var constants_1 = require("../constants");

var expr_1 = require("../expr");

var scope_1 = require("../scope");

var selection_1 = require("../selection");

var zBase_1 = require("../zBase");

var Square =
/*#__PURE__*/
function (_layout_1$Layout) {
  _inherits(Square, _layout_1$Layout);

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
      var zScale = zBase_1.addZScale(z, globalScope.zSize, globalScope.data.name, names.zScale);
      scope_1.addTransforms(globalScope.data, Object.assign({
        type: 'stack',
        groupby: scope_1.getGroupBy(groupings).map(expr_1.safeFieldName),
        as: [names.stack0, names.stack1]
      }, sortBy && {
        sort: {
          field: expr_1.safeFieldName(sortBy.name),
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
              test: selection_1.testForCollapseSelection(),
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
              test: selection_1.testForCollapseSelection(),
              value: 0
            }, {
              scale: names.zScale,
              field: expr_1.safeFieldName(z.name)
            }]
          })
        }
      };
      scope_1.addMarks(globalScope.markGroup, mark);

      var _this$transformXY = this.transformXY(gap, levelSize, squaresPerBand),
          tx = _this$transformXY.tx,
          ty = _this$transformXY.ty;

      return Object.assign(Object.assign(Object.assign({}, z && {
        globalScales: {
          showAxes: true,
          scales: {
            z: [zScale]
          }
        }
      }), {
        offsets: {
          x: scope_1.addOffsets(parentScope.offsets.x, tx.expr),
          y: scope_1.addOffsets(parentScope.offsets.y, ty.expr),
          h: size,
          w: size
        },
        mark: mark,
        sizeSignals: {
          layoutHeight: size,
          layoutWidth: size
        }
      }), collapseYHeight && {
        encodingRuleMap: {
          y: [{
            test: selection_1.testForCollapseSelection(),
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
          scope_1.addTransforms(globalScope.data, {
            type: 'joinaggregate',
            groupby: scope_1.getGroupBy(groupings).map(expr_1.safeFieldName),
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
        as: "".concat(prefix, "_").concat(constants_1.FieldNames.OffsetX)
      };
      var ty = {
        type: 'formula',
        expr: null,
        as: "".concat(prefix, "_").concat(constants_1.FieldNames.OffsetY)
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
}(layout_1.Layout);

exports.Square = Square;
},{"./layout":"wrUK","../constants":"Brjv","../expr":"y9xY","../scope":"o9XU","../selection":"iEjb","../zBase":"heLX"}],"nVYA":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stack = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var layout_1 = require("./layout");

var expr_1 = require("../expr");

var scope_1 = require("../scope");

var selection_1 = require("../selection");

var Stack =
/*#__PURE__*/
function (_layout_1$Layout) {
  _inherits(Stack, _layout_1$Layout);

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
      maxCount: "".concat(p, "_maxCount"),
      maxLevels: "".concat(p, "_maxLevels"),
      zScale: "".concat(p, "_zScale")
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
      scope_1.addTransforms(globalScope.data, {
        type: 'joinaggregate',
        groupby: scope_1.getGroupBy(groupings).map(expr_1.safeFieldName),
        ops: ['count'],
        as: [names.count]
      }, {
        type: 'extent',
        field: names.count,
        signal: names.globalExtent
      }, Object.assign({
        type: 'stack',
        groupby: scope_1.getGroupBy(groupings).map(expr_1.safeFieldName),
        as: [names.stack0, names.stack1]
      }, sort && {
        sort: {
          field: expr_1.safeFieldName(sort.name),
          order: 'ascending'
        }
      }));
      scope_1.addData(globalScope.scope, {
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
        }]
      });
      scope_1.addSignals(globalScope.scope, {
        name: names.size,
        update: "min((".concat(sizeSignals.layoutHeight, "), (").concat(sizeSignals.layoutWidth, "))")
      }, {
        name: names.squared,
        update: "data('".concat(names.sequence, "')[0].squared")
      }, {
        name: names.sides,
        update: "sqrt(".concat(names.squared, ")")
      }, {
        name: names.cube,
        update: "(".concat(names.size, " - (").concat(names.sides, " - 1)) / ").concat(names.sides)
      }, {
        name: names.maxLevels,
        update: "data('".concat(names.sequence, "')[0].maxlevels")
      }, {
        name: names.maxCount,
        update: "".concat(names.maxLevels, " * ").concat(names.squared)
      });
      var zLevel = "floor(datum[".concat(JSON.stringify(names.stack0), "] / ").concat(names.squared, ")");
      var layerOrdinal = "(datum[".concat(JSON.stringify(names.stack0), "] % ").concat(names.squared, ")");
      var cubeX = "(".concat(layerOrdinal, " % ").concat(names.sides, ")");
      var cubeY = "floor(".concat(layerOrdinal, " / ").concat(names.sides, ")");
      var groupX = "(".concat(sizeSignals.layoutWidth, " - ").concat(names.size, ") / 2");
      var groupY = "(".concat(sizeSignals.layoutHeight, " - ").concat(names.size, ") / 2");
      var offsets = {
        x: scope_1.addOffsets(parentScope.offsets.x, groupX, "".concat(cubeX, " * (").concat(names.cube, " + 1)")),
        y: scope_1.addOffsets(parentScope.offsets.y, groupY, "".concat(cubeY, " * (").concat(names.cube, " + 1)")),
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
      scope_1.addMarks(globalScope.markGroup, mark);
      var zScale = {
        type: 'linear',
        name: names.zScale,
        domain: [0, {
          signal: names.maxCount
        }],
        range: [0, {
          signal: "".concat(names.maxLevels, " * (").concat(names.cube, " + 1) - 1")
        }],
        nice: false
      };
      return {
        offsets: offsets,
        mark: mark,
        sizeSignals: {
          layoutHeight: names.size,
          layoutWidth: names.size
        },
        globalScales: {
          showAxes: true,
          scales: {
            z: [zScale]
          }
        },
        encodingRuleMap: {
          y: [{
            test: selection_1.testForCollapseSelection(),
            signal: parentScope.offsets.y
          }],
          z: [{
            test: selection_1.testForCollapseSelection(),
            value: 0
          }],
          depth: [{
            test: selection_1.testForCollapseSelection(),
            value: 0
          }],
          height: [{
            test: selection_1.testForCollapseSelection(),
            value: 0
          }]
        }
      };
    }
  }]);

  return Stack;
}(layout_1.Layout);

exports.Stack = Stack;
},{"./layout":"wrUK","../expr":"y9xY","../scope":"o9XU","../selection":"iEjb"}],"IkBC":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Strip = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var layout_1 = require("./layout");

var constants_1 = require("../constants");

var expr_1 = require("../expr");

var scope_1 = require("../scope");

var selection_1 = require("../selection");

var zBase_1 = require("../zBase");

var Strip =
/*#__PURE__*/
function (_layout_1$Layout) {
  _inherits(Strip, _layout_1$Layout);

  function Strip(props) {
    var _this;

    _classCallCheck(this, Strip);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Strip).call(this, props));
    _this.props = props;
    var p = _this.prefix = "strip_".concat(_this.id);
    _this.names = {
      firstField: "".concat(p).concat(constants_1.FieldNames.First),
      lastField: "".concat(p).concat(constants_1.FieldNames.Last),
      valueField: "".concat(p).concat(constants_1.FieldNames.Value),
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
      var zScale = zBase_1.addZScale(z, globalScope.zSize, globalScope.data.name, names.zScale);
      var horizontal = orientation === 'horizontal';
      var transform = [];

      if (sort) {
        transform.push({
          type: 'collect',
          sort: {
            field: expr_1.safeFieldName(sort.name),
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
        field: expr_1.safeFieldName(stackField),
        offset: 'normalize',
        as: [names.firstField, names.lastField]
      };

      if (groupings.length) {
        stackTransform.groupby = scope_1.getGroupBy(groupings).map(expr_1.safeFieldName);
      }

      transform.push(stackTransform);
      scope_1.addTransforms.apply(scope_1, [globalScope.data].concat(transform));
      var span = [names.lastField, names.firstField].map(function (f) {
        return "datum[".concat(JSON.stringify(f), "]");
      }).join(' - ');
      var offsets = {
        x: scope_1.addOffsets(parentScope.offsets.x, horizontal ? "datum[".concat(JSON.stringify(names.firstField), "] * (").concat(parentScope.offsets.w, ")") : ''),
        y: scope_1.addOffsets(parentScope.offsets.y, horizontal ? '' : "datum[".concat(JSON.stringify(names.firstField), "] * (").concat(parentScope.offsets.h, ")")),
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
              test: selection_1.testForCollapseSelection(),
              value: 0
            }, {
              scale: names.zScale,
              field: expr_1.safeFieldName(z.name)
            }]
          })
        }
      };
      scope_1.addMarks(globalScope.markGroup, mark);
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
            x: horizontal ? [percentageScale] : undefined,
            y: horizontal ? undefined : [percentageScale],
            z: zScale && [zScale]
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
}(layout_1.Layout);

exports.Strip = Strip;
},{"./layout":"wrUK","../constants":"Brjv","../expr":"y9xY","../scope":"o9XU","../selection":"iEjb","../zBase":"heLX"}],"YiCb":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Treemap = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var layout_1 = require("./layout");

var constants_1 = require("../constants");

var expr_1 = require("../expr");

var scope_1 = require("../scope");

var selection_1 = require("../selection");

var zBase_1 = require("../zBase");

var Treemap =
/*#__PURE__*/
function (_layout_1$Layout) {
  _inherits(Treemap, _layout_1$Layout);

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
      var zScale = zBase_1.addZScale(z, globalScope.zSize, globalScope.data.name, names.zScale);
      var offsets = {
        x: scope_1.addOffsets(parentScope.offsets.x, fn(names.fieldX0)),
        y: scope_1.addOffsets(parentScope.offsets.y, fn(names.fieldY0)),
        h: subtract(names.fieldY1, names.fieldY0),
        w: subtract(names.fieldX1, names.fieldX0)
      };
      var mark = this.transformedMark(offsets);
      scope_1.addSignals(globalScope.scope, {
        name: constants_1.SignalNames.TreeMapMethod,
        value: 'squarify',
        bind: {
          name: treeMapMethod,
          input: 'select',
          options: ['squarify', 'binary']
        }
      });
      return Object.assign(Object.assign({}, z && {
        globalScales: {
          showAxes: true,
          scales: {
            z: [zScale]
          }
        }
      }), {
        mark: mark,
        offsets: offsets,
        sizeSignals: {
          layoutHeight: null,
          layoutWidth: null
        }
      });
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
        scope_1.addData(globalScope.scope, {
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
              groupby: scope_1.getGroupBy(groupings).map(expr_1.safeFieldName)
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
        scope_1.addMarks(globalScope.markGroup, facets); //assign new markgroup after adding mark to original group

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
              test: selection_1.testForCollapseSelection(),
              value: 0
            }, {
              scale: names.zScale,
              field: expr_1.safeFieldName(z.name)
            }]
          })
        }
      };
      scope_1.addMarks(markParent, mark);
      return mark;
    }
  }, {
    key: "treemapTransform",
    value: function treemapTransform(treemapData, widthSignal, heightSignal) {
      var names = this.names,
          props = this.props;
      var group = props.group,
          size = props.size;
      scope_1.addTransforms(treemapData, {
        type: 'filter',
        expr: "datum[".concat(JSON.stringify(size.name), "] > 0")
      }, {
        type: 'nest',
        keys: [group && group.name || '__NONE__']
      }, {
        type: 'treemap',
        field: expr_1.safeFieldName(size.name),
        sort: {
          field: 'value',
          order: 'descending'
        },
        round: true,
        method: {
          signal: constants_1.SignalNames.TreeMapMethod
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
}(layout_1.Layout);

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
},{"./layout":"wrUK","../constants":"Brjv","../expr":"y9xY","../scope":"o9XU","../selection":"iEjb","../zBase":"heLX"}],"YyUw":[function(require,module,exports) {
"use strict";

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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrap = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var layout_1 = require("./layout");

var bin_1 = require("../bin");

var constants_1 = require("../constants");

var expr_1 = require("../expr");

var facetSearch_1 = require("../facetSearch");

var facetTitle_1 = require("../facetTitle");

var ordinal_1 = require("../ordinal");

var scope_1 = require("../scope");

var signals_1 = require("../signals");

var Wrap =
/*#__PURE__*/
function (_layout_1$Layout) {
  _inherits(Wrap, _layout_1$Layout);

  function Wrap(props) {
    var _this;

    _classCallCheck(this, Wrap);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Wrap).call(this, props));
    _this.props = props;
    var p = _this.prefix = "wrap_".concat(_this.id);
    _this.bin = bin_1.binnable(_this.prefix, props.globalScope.data.name, props.groupby);
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
        scope_1.addSignals.apply(scope_1, [globalScope.scope].concat(_toConsumableArray(bin.signals)));
        scope_1.addTransforms.apply(scope_1, [globalScope.data].concat(_toConsumableArray(bin.transforms)));
        scope_1.addData(globalScope.scope, bin.dataSequence);
        scope_1.addTransforms(bin.dataSequence, {
          type: 'formula',
          expr: "indata(".concat(JSON.stringify(globalScope.data.name), ", ").concat(JSON.stringify(bin.fields[0]), ", datum[").concat(JSON.stringify(bin.fields[0]), "])"),
          as: constants_1.FieldNames.Contains
        });
        ordinalBinData = bin.dataSequence.name;
      } else {
        var ord = ordinal_1.createOrdinals(globalScope.data.name, prefix, bin.fields, 'ascending');
        scope_1.addData(globalScope.scope, ord.data);
        ordinalBinData = ord.data.name;
      }

      scope_1.addData(globalScope.scope, {
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
          expr: "datum.cols === 1 ? max(datum.cellw, ".concat(constants_1.SignalNames.MinCellWidth, ") : datum.cellw"),
          as: 'cellw'
        }, {
          type: 'formula',
          expr: "".concat(parentScope.sizeSignals.layoutHeight, " / datum.rows"),
          as: 'cellh'
        }, {
          type: 'formula',
          expr: "datum.rows === 1 ? max(datum.cellh, ".concat(constants_1.SignalNames.MinCellHeight, ") : datum.cellh"),
          as: 'cellh'
        }, {
          type: 'formula',
          expr: "(datum.cellw >= ".concat(constants_1.SignalNames.MinCellWidth, " && datum.cellh >= ").concat(constants_1.SignalNames.MinCellHeight, ")"),
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
          expr: "floor((datum[".concat(JSON.stringify(constants_1.FieldNames.Ordinal), "] - 1) / ").concat(names.colCount, ")"),
          as: constants_1.FieldNames.WrapRow
        }, {
          type: 'formula',
          expr: "(datum[".concat(JSON.stringify(constants_1.FieldNames.Ordinal), "] - 1) % ").concat(names.colCount),
          as: constants_1.FieldNames.WrapCol
        }, {
          type: 'formula',
          expr: facetSearch_1.serializeAsVegaExpression(bin, constants_1.FieldNames.First, constants_1.FieldNames.Last),
          as: constants_1.FieldNames.FacetSearch
        }, {
          type: 'formula',
          expr: facetSearch_1.displayBin(bin),
          as: constants_1.FieldNames.FacetTitle
        }]
      });
      var dataOut = {
        name: names.outputData,
        source: globalScope.data.name,
        transform: [{
          type: 'lookup',
          from: names.rowColumnDataName,
          key: expr_1.safeFieldName(bin.fields[0]),
          fields: [bin.fields[0]].map(expr_1.safeFieldName),
          values: [constants_1.FieldNames.WrapRow, constants_1.FieldNames.WrapCol]
        }]
      };
      scope_1.addData(globalScope.scope, dataOut);
      globalScope.setMarkDataName(names.outputData);
      scope_1.addSignals(globalScope.scope, {
        name: names.minAspect,
        update: "".concat(constants_1.SignalNames.MinCellWidth, " / ").concat(constants_1.SignalNames.MinCellHeight)
      }, {
        name: names.target,
        update: "".concat(names.minAspect, " === 1 ? ", 1.2, " : ").concat(names.minAspect)
      }, {
        name: names.minArea,
        update: "".concat(constants_1.SignalNames.MinCellWidth, "*").concat(constants_1.SignalNames.MinCellHeight)
      }, {
        name: names.aspect,
        update: "".concat(parentScope.sizeSignals.layoutWidth, " / ").concat(parentScope.sizeSignals.layoutHeight)
      }, {
        name: names.dataLength,
        update: "data(".concat(JSON.stringify(ordinalBinData), ").length")
      }, {
        name: names.growColCount,
        update: "max(floor(".concat(parentScope.sizeSignals.layoutWidth, " / ").concat(constants_1.SignalNames.MinCellWidth, "), 1)")
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
        update: "".concat(names.fits, " ? data(").concat(JSON.stringify(names.rxc), ")[0].cellh : ").concat(constants_1.SignalNames.MinCellHeight)
      });
      signals_1.modifySignal(globalScope.signals.plotHeightOut, 'max', "(".concat(names.cellHeight, " * ceil(").concat(names.dataLength, " / ").concat(names.colCount, "))"));
      signals_1.modifySignal(globalScope.signals.plotWidthOut, 'max', "(".concat(names.cellWidth, " * ").concat(names.colCount, ")"));
      var signalH = [names.cellHeight, constants_1.SignalNames.FacetPaddingTop, constants_1.SignalNames.FacetPaddingBottom].join(' - ');
      var signalW = [names.cellWidth, constants_1.SignalNames.FacetPaddingLeft].join(' - ');
      var signalX = scope_1.addOffsets(parentScope.offsets.x, "datum[".concat(JSON.stringify(constants_1.FieldNames.WrapCol), "] * ").concat(names.cellWidth), constants_1.SignalNames.FacetPaddingLeft);
      var signalY = scope_1.addOffsets(parentScope.offsets.y, "datum[".concat(JSON.stringify(constants_1.FieldNames.WrapRow), "] * ").concat(names.cellHeight), constants_1.SignalNames.FacetPaddingTop);
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
      scope_1.addMarks(globalScope.markGroup, group);
      var sizeSignals = {
        layoutHeight: "(".concat(names.cellHeight, " - ").concat(constants_1.SignalNames.FacetPaddingTop, " - ").concat(constants_1.SignalNames.FacetPaddingBottom, ")"),
        layoutWidth: "(".concat(names.cellWidth, " - ").concat(constants_1.SignalNames.FacetPaddingLeft, ")"),
        colCount: names.colCount,
        rowCount: "ceil(".concat(names.dataLength, " / ").concat(names.colCount, ")")
      };

      if (cellTitles) {
        facetTitle_1.addFacetCellTitles(group, sizeSignals, axisTextColor);
      }

      return {
        facetScope: group,
        sizeSignals: sizeSignals,
        offsets: offsets
      };
    }
  }]);

  return Wrap;
}(layout_1.Layout);

exports.Wrap = Wrap;
},{"./layout":"wrUK","../bin":"p0ME","../constants":"Brjv","../expr":"y9xY","../facetSearch":"l3GW","../facetTitle":"aYnH","../ordinal":"W818","../scope":"o9XU","../signals":"Vrvc"}],"iKgs":[function(require,module,exports) {
"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.layoutClasses = void 0;

var aggregateContainer_1 = require("./aggregateContainer");

var aggregateSquare_1 = require("./aggregateSquare");

var band_1 = require("./band");

var cross_1 = require("./cross");

var scatter_1 = require("./scatter");

var square_1 = require("./square");

var stack_1 = require("./stack");

var strip_1 = require("./strip");

var treemap_1 = require("./treemap");

var wrap_1 = require("./wrap");

exports.layoutClasses = {
  AggregateContainer: aggregateContainer_1.AggregateContainer,
  AggregateSquare: aggregateSquare_1.AggregateSquare,
  Band: band_1.Band,
  Cross: cross_1.Cross,
  Scatter: scatter_1.Scatter,
  Square: square_1.Square,
  Stack: stack_1.Stack,
  Strip: strip_1.Strip,
  Treemap: treemap_1.Treemap,
  Wrap: wrap_1.Wrap
};
},{"./aggregateContainer":"z5gu","./aggregateSquare":"XX9h","./band":"H2wZ","./cross":"WoHO","./scatter":"bIfR","./square":"Nfji","./stack":"nVYA","./strip":"IkBC","./treemap":"YiCb","./wrap":"YyUw"}],"D8t7":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecBuilder = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var axes_1 = require("./axes");

var color_1 = require("./color");

var constants_1 = require("./constants");

var defaults_1 = require("./defaults");

var defaults_2 = require("./defaults");

var facetTitle_1 = require("./facetTitle");

var fill_1 = require("./fill");

var globalScope_1 = require("./globalScope");

var scope_1 = require("./scope");

var signals_1 = require("./signals");

var index_1 = require("./layouts/index");

var SpecBuilder =
/*#__PURE__*/
function () {
  function SpecBuilder(props, specContext) {
    _classCallCheck(this, SpecBuilder);

    this.props = props;
    this.specContext = specContext;
    this.globalSignals = {
      minCellWidth: {
        name: constants_1.SignalNames.MinCellWidth,
        update: "".concat(defaults_2.minFacetWidth)
      },
      minCellHeight: {
        name: constants_1.SignalNames.MinCellHeight,
        update: "".concat(defaults_2.minFacetHeight)
      },
      plotOffsetLeft: {
        name: constants_1.SignalNames.PlotOffsetLeft,
        update: '0'
      },
      plotOffsetTop: {
        name: constants_1.SignalNames.PlotOffsetTop,
        update: '0'
      },
      plotOffsetBottom: {
        name: constants_1.SignalNames.PlotOffsetBottom,
        update: '0'
      },
      plotOffsetRight: {
        name: constants_1.SignalNames.PlotOffsetRight,
        update: '0'
      },
      plotHeightOut: {
        name: constants_1.SignalNames.PlotHeightOut,
        update: constants_1.SignalNames.PlotHeightIn
      },
      plotWidthOut: {
        name: constants_1.SignalNames.PlotWidthOut,
        update: constants_1.SignalNames.PlotWidthIn
      }
    };
  }

  _createClass(SpecBuilder, [{
    key: "validate",
    value: function validate() {
      var specContext = this.specContext;
      var specCapabilities = this.props.specCapabilities;
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
      var specContext = this.specContext;
      var _this$props = this.props,
          facetLayout = _this$props.facetLayout,
          specCapabilities = _this$props.specCapabilities;
      var insight = specContext.insight,
          specColumns = specContext.specColumns,
          specViewOptions = specContext.specViewOptions;
      var dataName = 'data_source';

      var _this$initSpec = this.initSpec(dataName),
          vegaSpec = _this$initSpec.vegaSpec,
          groupMark = _this$initSpec.groupMark;

      var _color_1$addColor = color_1.addColor({
        scope: vegaSpec,
        dataName: dataName,
        specContext: specContext,
        scaleName: constants_1.ScaleNames.Color,
        legendDataName: 'data_legend',
        topLookupName: 'data_topcolorlookup',
        colorReverseSignalName: constants_1.SignalNames.ColorReverse
      }),
          topColorField = _color_1$addColor.topColorField,
          colorDataName = _color_1$addColor.colorDataName;

      var globalScope = new globalScope_1.GlobalScope({
        dataName: colorDataName,
        markGroup: groupMark,
        scope: vegaSpec,
        signals: this.globalSignals
      });

      if (facetLayout) {
        scope_1.addSignals(vegaSpec, {
          name: constants_1.SignalNames.FacetPaddingBottom,
          update: "".concat(facetLayout.facetPadding.bottom)
        }, {
          name: constants_1.SignalNames.FacetPaddingLeft,
          update: "".concat(facetLayout.facetPadding.left)
        }, {
          name: constants_1.SignalNames.FacetPaddingTop,
          update: "".concat(facetLayout.facetPadding.top)
        });
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
        var plotHeightOut = this.globalSignals.plotHeightOut.name;
        var plotWidthOut = this.globalSignals.plotWidthOut.name;
        var colTitleScale = {
          type: 'linear',
          name: 'scale_facet_col_title',
          domain: [0, 1],
          range: [0, {
            signal: plotWidthOut
          }]
        };
        var rowTitleScale = {
          type: 'linear',
          name: 'scale_facet_row_title',
          domain: [0, 1],
          range: [{
            signal: plotHeightOut
          }, 0]
        };
        var axesScopes = facetLayout ? facetTitle_1.addFacetAxesGroupMarks({
          globalScope: globalScope.scope,
          plotScope: groupMark,
          facetScope: firstScope,
          colTitleScale: colTitleScale,
          rowTitleScale: rowTitleScale,
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
        axes_1.addGlobalAxes({
          globalScope: globalScope,
          allGlobalScales: allGlobalScales,
          axisScales: this.props.axisScales,
          plotOffsetSignals: {
            x: this.globalSignals.plotOffsetLeft,
            y: this.globalSignals.plotOffsetBottom
          },
          axesOffsets: {
            x: defaults_1.axesOffsetX,
            y: defaults_1.axesOffsetY
          },
          axesTitlePadding: facetLayout ? {
            x: defaults_1.axesTitlePaddingFacetX,
            y: defaults_1.axesTitlePaddingFacetY
          } : {
            x: defaults_1.axesTitlePaddingX,
            y: defaults_1.axesTitlePaddingY
          },
          labelBaseline: {
            x: 'top',
            y: 'middle'
          },
          specColumns: specColumns,
          specViewOptions: specViewOptions,
          axesScopes: axesScopes,
          faceted: !!facetLayout,
          view: insight.view
        });
      } //add mark to the final scope


      if (finalScope.mark) {
        var update = finalScope.mark.encode.update;
        var outputDataName = 'output';
        finalScope.mark.from.data = outputDataName;
        scope_1.addData(globalScope.markGroup, {
          name: outputDataName,
          source: globalScope.markDataName,
          transform: [{
            type: 'formula',
            expr: finalScope.offsets.x,
            as: constants_1.FieldNames.OffsetX
          }, {
            type: 'formula',
            expr: finalScope.offsets.y,
            as: constants_1.FieldNames.OffsetY
          }]
        });
        update.x = {
          field: constants_1.FieldNames.OffsetX
        };
        update.y = {
          field: constants_1.FieldNames.OffsetY
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
        update.fill = fill_1.fill(specContext, topColorField, constants_1.ScaleNames.Color);
        update.opacity = fill_1.opacity(specContext);
      }

      return {
        specCapabilities: specCapabilities,
        vegaSpec: vegaSpec
      };
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
      var specContext = this.specContext;
      var insight = specContext.insight;
      var groupMark = {
        type: 'group',
        //style: 'cell',
        encode: {
          update: {
            x: {
              signal: constants_1.SignalNames.PlotOffsetLeft
            },
            y: {
              signal: constants_1.SignalNames.PlotOffsetTop
            },
            height: {
              signal: constants_1.SignalNames.PlotHeightOut
            },
            width: {
              signal: constants_1.SignalNames.PlotWidthOut
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
        signals: signals_1.textSignals(specContext, constants_1.SignalNames.ViewportHeight).concat([minCellWidth, minCellHeight, {
          name: constants_1.SignalNames.ViewportHeight,
          update: "max(".concat(constants_1.SignalNames.MinCellHeight, ", ").concat(insight.size.height, ")")
        }, {
          name: constants_1.SignalNames.ViewportWidth,
          update: "max(".concat(constants_1.SignalNames.MinCellWidth, ", ").concat(insight.size.width, ")")
        }, plotOffsetLeft, plotOffsetTop, plotOffsetBottom, plotOffsetRight, {
          name: constants_1.SignalNames.PlotHeightIn,
          update: "".concat(constants_1.SignalNames.ViewportHeight, " - ").concat(constants_1.SignalNames.PlotOffsetBottom)
        }, {
          name: constants_1.SignalNames.PlotWidthIn,
          update: "".concat(constants_1.SignalNames.ViewportWidth, " - ").concat(constants_1.SignalNames.PlotOffsetLeft, " - ").concat(constants_1.SignalNames.PlotOffsetRight)
        }, plotHeightOut, plotWidthOut, {
          name: 'height',
          update: "".concat(constants_1.SignalNames.PlotOffsetTop, " + ").concat(constants_1.SignalNames.PlotHeightOut, " + ").concat(constants_1.SignalNames.PlotOffsetBottom)
        }, {
          name: 'width',
          update: "".concat(constants_1.SignalNames.PlotWidthOut, " + ").concat(constants_1.SignalNames.PlotOffsetLeft, " + ").concat(constants_1.SignalNames.PlotOffsetRight)
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
                as: constants_1.FieldNames.Count
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
      var layoutType = layoutPair.layoutType,
          props = layoutPair.props;
      var layoutBuildProps = Object.assign(Object.assign({}, props), buildProps);
      var layoutClass = index_1.layoutClasses[layoutType];
      var layout = new layoutClass(layoutBuildProps);
      layout.id = buildProps.id;
      return layout;
    }
  }]);

  return SpecBuilder;
}();

exports.SpecBuilder = SpecBuilder;
},{"./axes":"pHOy","./color":"AW9l","./constants":"Brjv","./defaults":"NBFE","./facetTitle":"aYnH","./fill":"YYBq","./globalScope":"ITwQ","./scope":"o9XU","./signals":"Vrvc","./layouts/index":"iKgs"}],"HkbF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = void 0; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var charts_1 = require("./charts");

var inference_1 = require("./inference");

var specBuilder_1 = require("./specBuilder");

function build(specContext, currData) {
  var specColumns = specContext.specColumns;
  var columns = [specColumns.color, specColumns.facet, specColumns.facetV, specColumns.group, specColumns.size, specColumns.sort, specColumns.x, specColumns.y, specColumns.z];
  inference_1.inferAll(columns, currData);
  var specBuilderProps = charts_1.getSpecBuilderPropsForChart(specContext);
  var specBuilder = new specBuilder_1.SpecBuilder(specBuilderProps, specContext);
  var specResult;

  if (specBuilder) {
    try {
      var errors = specBuilder.validate();

      if (errors.length) {
        specResult = {
          errors: errors,
          specCapabilities: specBuilderProps.specCapabilities,
          vegaSpec: null
        };
      } else {
        specResult = specBuilder.build();
      }
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
      errors: ["could not build spec for ".concat(specContext.insight.chart)]
    };
  }

  return specResult;
}

exports.build = build;
},{"./charts":"bvDx","./inference":"oOk9","./specBuilder":"D8t7"}],"fhf2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"fUdq":[function(require,module,exports) {
"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./build"), exports);

__exportStar(require("./constants"), exports);

__exportStar(require("./inference"), exports);

__exportStar(require("./interfaces"), exports);

__exportStar(require("./types"), exports);
},{"./build":"HkbF","./constants":"Brjv","./inference":"oOk9","./interfaces":"fhf2","./types":"fhf2"}],"Hfbl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var index_1 = require("../src/index");

var dataUrl = '/SandDance/sample-data/demovote.tsv';
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
var insightTextarea = document.getElementById('insight-json');
var insightUdateButton = document.getElementById('insight-update');
var vegaOutput = document.getElementById('vega-spec');
var vegaCopy = document.getElementById('vega-spec-copy');

select.onchange = function () {
  return selected(select.selectedIndex);
};

insightUdateButton.onclick = function () {
  var insight = JSON.parse(insightTextarea.value);
  render(insight);
};

vegaCopy.onclick = function () {
  vegaOutput.select();
  document.execCommand('copy');
  vegaCopy.innerText = 'copied';
  setTimeout(function () {
    vegaCopy.innerText = 'copy';
  }, 2000);
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
  insightTextarea.value = JSON.stringify(insight, null, 2);
  var specColumns = index_1.getSpecColumns(insight, columns);
  var context = {
    specColumns: specColumns,
    insight: insight,
    specViewOptions: specViewOptions
  };
  var specResult = index_1.build(context, data);

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
  }).then(function () {
    var d0 = vegaSpec.data[0];
    delete d0.values;
    d0.format = {
      parse: 'auto',
      type: 'tsv'
    };
    d0.url = 'https://microsoft.github.io' + dataUrl;
    vegaOutput.value = JSON.stringify(vegaSpec, null, 2);
  });
}

container.innerHTML = "loading ".concat(dataUrl, "...");
vega.loader().load(dataUrl).then(function (tsv_data) {
  data = vega.read(tsv_data, {
    type: 'tsv',
    parse: 'auto'
  });
  columns = index_1.getColumnsFromData(vega.inferTypes, data);
  selected(0);
});
},{"../src/index":"fUdq"}]},{},["Hfbl"], null)