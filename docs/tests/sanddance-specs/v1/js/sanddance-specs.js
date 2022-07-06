// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"lKiud":[function(require,module,exports) {
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _es6 = require("../dist/es6");
const dataUrl = "/SandDance/sample-data/demovote.tsv";
const specViewOptions = {
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
let data;
let columns;
const container = document.getElementById("vis");
const select = document.getElementById("select-spec");
const insightTextarea = document.getElementById("insight-json");
const insightUdateButton = document.getElementById("insight-update");
const vegaOutput = document.getElementById("vega-spec");
const vegaCopy = document.getElementById("vega-spec-copy");
select.onchange = ()=>selected(select.selectedIndex);
insightUdateButton.onclick = ()=>{
    const insight = JSON.parse(insightTextarea.value);
    render(insight);
};
vegaCopy.onclick = ()=>{
    vegaOutput.select();
    document.execCommand("copy");
    vegaCopy.innerText = "copied";
    setTimeout(()=>{
        vegaCopy.innerText = "copy";
    }, 2000);
};
function selected(selectedIndex) {
    container.innerHTML = `loading spec...`;
    fetchInsight(select.options[selectedIndex].value);
}
function fetchInsight(specFilename) {
    fetch(`specs/${specFilename}`).then((response)=>response.json()).then((insight)=>render(insight)).catch((error)=>container.innerText = error);
}
function render(insight) {
    insightTextarea.value = JSON.stringify(insight, null, 2);
    const specColumns = (0, _es6.getSpecColumns)(insight, columns);
    const context = {
        specColumns,
        insight,
        specViewOptions
    };
    const specResult = (0, _es6.build)(context, data);
    if (specResult.errors) container.innerText = specResult.errors.map((error)=>error).join("\n");
    else renderVegaSpec(specResult.vegaSpec);
}
function renderVegaSpec(vegaSpec) {
    const runtime = vega.parse(vegaSpec);
    const vegaView = new vega.View(runtime, {
        container
    });
    vegaView.runAsync().catch((e)=>container.innerHTML = `error ${e}`).then(()=>{
        const d0 = vegaSpec.data[0];
        delete d0.values;
        d0.format = {
            parse: "auto",
            type: "tsv"
        };
        d0.url = "https://microsoft.github.io" + dataUrl;
        vegaOutput.value = JSON.stringify(vegaSpec, null, 2);
    });
}
container.innerHTML = `loading ${dataUrl}...`;
vega.loader().load(dataUrl).then((tsv_data)=>{
    data = vega.read(tsv_data, {
        type: "tsv",
        parse: "auto"
    });
    columns = (0, _es6.getColumnsFromData)(vega.inferTypes, data);
    selected(0);
});

},{"../dist/es6":"7COGi"}],"7COGi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _build = require("./build");
parcelHelpers.exportAll(_build, exports);
var _constants = require("./constants");
parcelHelpers.exportAll(_constants, exports);
var _inference = require("./inference");
parcelHelpers.exportAll(_inference, exports);
var _interfaces = require("./interfaces");
parcelHelpers.exportAll(_interfaces, exports);
var _types = require("./types");
parcelHelpers.exportAll(_types, exports);

},{"./build":"jHFbk","./constants":"eNr4m","./inference":"bdXVF","./interfaces":"52vfF","./types":"a5HkM","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"jHFbk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "build", ()=>build);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _charts = require("./charts");
var _inference = require("./inference");
var _specBuilder = require("./specBuilder");
function build(specContext, currData) {
    const { specColumns  } = specContext;
    const columns = [
        specColumns.color,
        specColumns.facet,
        specColumns.facetV,
        specColumns.group,
        specColumns.size,
        specColumns.sort,
        specColumns.x,
        specColumns.y,
        specColumns.z, 
    ];
    (0, _inference.inferAll)(columns, currData);
    const specBuilderProps = (0, _charts.getSpecBuilderPropsForChart)(specContext);
    const specBuilder = new (0, _specBuilder.SpecBuilder)(specBuilderProps, specContext);
    let specResult;
    if (specBuilder) {
        try {
            const errors = specBuilder.validate();
            if (errors.length) specResult = {
                errors,
                specCapabilities: specBuilderProps.specCapabilities,
                vegaSpec: null
            };
            else specResult = specBuilder.build();
        } catch (e) {
            specResult = {
                specCapabilities: null,
                vegaSpec: null,
                errors: [
                    e.stack
                ]
            };
        }
        if (!specResult.errors) {
            const data0 = specResult.vegaSpec.data[0];
            data0.values = currData;
        }
    } else specResult = {
        specCapabilities: null,
        vegaSpec: null,
        errors: [
            `could not build spec for ${specContext.insight.chart}`
        ]
    };
    return specResult;
}

},{"./charts":"4pEB6","./inference":"bdXVF","./specBuilder":"33BLD","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"4pEB6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getSpecBuilderPropsForChart", ()=>getSpecBuilderPropsForChart);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _barchartH = require("./barchartH");
var _barchartHDefault = parcelHelpers.interopDefault(_barchartH);
var _barchartV = require("./barchartV");
var _barchartVDefault = parcelHelpers.interopDefault(_barchartV);
var _density = require("./density");
var _densityDefault = parcelHelpers.interopDefault(_density);
var _grid = require("./grid");
var _gridDefault = parcelHelpers.interopDefault(_grid);
var _scatterplot = require("./scatterplot");
var _scatterplotDefault = parcelHelpers.interopDefault(_scatterplot);
var _stacks = require("./stacks");
var _stacksDefault = parcelHelpers.interopDefault(_stacks);
var _strips = require("./strips");
var _stripsDefault = parcelHelpers.interopDefault(_strips);
var _treemap = require("./treemap");
var _treemapDefault = parcelHelpers.interopDefault(_treemap);
var _facetLayout = require("../facetLayout");
var _constants = require("../constants");
var _defaults = require("../defaults");
const map = {
    barchart: (0, _barchartVDefault.default),
    barchartH: (0, _barchartHDefault.default),
    barchartV: (0, _barchartVDefault.default),
    density: (0, _densityDefault.default),
    grid: (0, _gridDefault.default),
    scatterplot: (0, _scatterplotDefault.default),
    stacks: (0, _stacksDefault.default),
    strips: (0, _stripsDefault.default),
    treemap: (0, _treemapDefault.default)
};
function getSpecBuilderPropsForChart(specContext) {
    const { insight , specColumns , specViewOptions  } = specContext;
    const fn = map[insight.chart];
    if (fn) {
        const props = fn(specContext);
        if (insight.columns.facet) {
            const discreteFacetColumn = {
                column: specColumns.facet,
                defaultBins: (0, _defaults.defaultBins),
                maxbins: (0, _defaults.maxbins),
                maxbinsSignalDisplayName: specViewOptions.language.FacetMaxBins,
                maxbinsSignalName: (0, _constants.SignalNames).FacetBins
            };
            const discreteFacetVColumn = {
                column: specColumns.facetV,
                defaultBins: (0, _defaults.defaultBins),
                maxbins: (0, _defaults.maxbins),
                maxbinsSignalDisplayName: specViewOptions.language.FacetVMaxBins,
                maxbinsSignalName: (0, _constants.SignalNames).FacetVBins
            };
            const { facetLayout , layoutPair  } = (0, _facetLayout.getFacetLayout)(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn, specViewOptions.colors.axisText);
            props.layouts.unshift(layoutPair);
            props.facetLayout = facetLayout;
            props.collapseFacetAxes = specViewOptions.collapseFacetAxes;
        }
        return props;
    }
}

},{"./barchartH":"jwW3p","./barchartV":"gx8bO","./density":"hJwhn","./grid":"dUpaP","./scatterplot":"6EBdS","./stacks":"8N6Z2","./strips":"jnY66","./treemap":"g0eb5","../facetLayout":"fJidQ","../constants":"eNr4m","../defaults":"5iedU","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"jwW3p":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("../constants");
var _defaults = require("../defaults");
var _size = require("../size");
exports.default = function(specContext) {
    var _a, _b, _c, _d;
    const { insight , specColumns , specViewOptions  } = specContext;
    const { language  } = specViewOptions;
    const showAxes = true;
    const bandProps = {
        orientation: "horizontal",
        groupby: {
            column: specColumns.y,
            defaultBins: (0, _defaults.defaultBins),
            maxbinsSignalName: (0, _constants.SignalNames).YBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
            maxbins: (0, _defaults.maxbins)
        },
        minBandWidth: (0, _defaults.minBarBandWidth),
        showAxes
    };
    const x = {
        title: null
    };
    const axisScales = {
        x,
        y: {
            title: (_a = specColumns.y) === null || _a === void 0 ? void 0 : _a.name
        },
        z: {
            title: (_b = specColumns.z) === null || _b === void 0 ? void 0 : _b.name
        }
    };
    const layouts = [
        {
            layoutType: "Band",
            props: bandProps
        }
    ];
    if (insight.totalStyle === "sum-strip-percent") {
        x.aggregate = "percent";
        x.title = language.percent;
        const stripProps = {
            addPercentageScale: true,
            sortOrder: "ascending",
            orientation: "horizontal",
            size: specColumns.size,
            sort: specColumns.sort,
            z: specColumns.z,
            showAxes
        };
        layouts.push({
            layoutType: "Strip",
            props: stripProps
        });
    } else {
        const aggProps = {
            niceScale: true,
            dock: "left",
            globalAggregateMaxExtentSignal: "aggMaxExtent",
            globalAggregateMaxExtentScaledSignal: "aggMaxExtentScaled",
            sumBy: specColumns.size,
            showAxes
        };
        layouts.push({
            layoutType: "AggregateContainer",
            props: aggProps
        });
        switch(insight.totalStyle){
            case "sum-treemap":
                {
                    x.aggregate = "sum";
                    x.title = language.sum;
                    const treemapProps = {
                        corner: "top-left",
                        size: specColumns.size,
                        treeMapMethod: specViewOptions.language.treeMapMethod,
                        z: specColumns.z,
                        showAxes
                    };
                    layouts.push({
                        layoutType: "Treemap",
                        props: treemapProps
                    });
                    break;
                }
            case "sum-strip":
                {
                    x.aggregate = "sum";
                    x.title = language.sum;
                    const stripProps = {
                        sortOrder: "ascending",
                        orientation: "horizontal",
                        size: specColumns.size,
                        sort: specColumns.sort,
                        z: specColumns.z,
                        showAxes
                    };
                    layouts.push({
                        layoutType: "Strip",
                        props: stripProps
                    });
                    break;
                }
            case "count-strip":
                {
                    x.aggregate = "count";
                    x.title = language.count;
                    const stripProps = {
                        sortOrder: "ascending",
                        orientation: "horizontal",
                        size: specColumns.size,
                        sort: specColumns.sort,
                        z: specColumns.z,
                        showAxes
                    };
                    layouts.push({
                        layoutType: "Strip",
                        props: stripProps
                    });
                    break;
                }
            default:
                {
                    x.aggregate = "count";
                    x.title = language.count;
                    const squareProps = {
                        sortBy: specColumns.sort,
                        fillDirection: "down-right",
                        z: specColumns.z,
                        maxGroupedUnits: aggProps.globalAggregateMaxExtentSignal,
                        maxGroupedFillSize: aggProps.globalAggregateMaxExtentScaledSignal,
                        showAxes
                    };
                    layouts.push({
                        layoutType: "Square",
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
            roles: [
                {
                    role: "y",
                    binnable: true,
                    axisSelection: ((_c = specColumns.y) === null || _c === void 0 ? void 0 : _c.quantitative) ? "range" : "exact",
                    axisSelectionBetweenTicks: true,
                    signals: [
                        (0, _constants.SignalNames).YBins
                    ]
                },
                {
                    role: "z",
                    axisSelection: ((_d = specColumns.z) === null || _d === void 0 ? void 0 : _d.quantitative) ? "range" : "exact",
                    allowNone: true
                },
                {
                    role: "color",
                    allowNone: true
                },
                {
                    role: "sort",
                    allowNone: true
                },
                {
                    role: "size",
                    allowNone: (0, _size.allowNoneForSize),
                    excludeCategoric: true,
                    signals: [
                        (0, _constants.SignalNames).TreeMapMethod
                    ]
                },
                {
                    role: "facet",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetVBins
                    ]
                }, 
            ]
        }
    };
};

},{"../constants":"eNr4m","../defaults":"5iedU","../size":"78CLt","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"eNr4m":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FieldNames", ()=>FieldNames);
parcelHelpers.export(exports, "ScaleNames", ()=>ScaleNames);
parcelHelpers.export(exports, "SignalNames", ()=>SignalNames);
parcelHelpers.export(exports, "Other", ()=>Other);
parcelHelpers.export(exports, "ColorScaleNone", ()=>ColorScaleNone);
const FieldNames = {
    Active: "__SandDance__Active",
    Collapsed: "__SandDance__Collapsed",
    Contains: "__SandDance__Contains",
    Count: "__SandDance__Count",
    Sum: "__SandDance__Sum",
    SumOfCount: "__SandDance__CountSum",
    SumOfSum: "__SandDance__SumSum",
    Selected: "__SandDance__Selected",
    First: "__SandDance__First",
    Last: "__SandDance__Last",
    Top: "__SandDance__Top",
    TopColor: "__SandDance__TopColor",
    TopIndex: "__SandDance__TopIndex",
    PowerBISelectionId: "__SandDance__PowerBISelectionId",
    FacetSearch: "__SandDance__FacetSearch",
    FacetTitle: "__SandDance__FacetTitle",
    Ordinal: "__SandDance__Ordinal",
    WrapCol: "__SandDance__WrapCol",
    WrapRow: "__SandDance__WrapRow",
    Value: "__SandDance__Value",
    OffsetX: "__SandDance__X",
    OffsetY: "__SandDance__Y",
    OffsetHeight: "__SandDance__H",
    OffsetWidth: "__SandDance__W"
};
const ScaleNames = {
    Color: "scale_color",
    X: "scale_x",
    Y: "scale_y",
    Z: "scale_z"
};
const SignalNames = {
    ViewportWidth: "ViewportWidth",
    ViewportHeight: "ViewportHeight",
    MinCellWidth: "MinCellWidth",
    MinCellHeight: "MinCellHeight",
    PlotOffsetLeft: "PlotOffsetLeft",
    PlotOffsetTop: "PlotOffsetTop",
    PlotOffsetBottom: "PlotOffsetBottom",
    PlotOffsetRight: "PlotOffsetRight",
    PlotHeightIn: "PlotHeightIn",
    PlotWidthIn: "PlotWidthIn",
    PlotHeightOut: "PlotHeightOut",
    PlotWidthOut: "PlotWidthOut",
    ColorBinCount: "RoleColor_BinCountSignal",
    ColorReverse: "RoleColor_ReverseSignal",
    FacetAxesAdjustX: "RoleFacet_AxesAdjustSignalX",
    FacetAxesAdjustY: "RoleFacet_AxesAdjustSignalY",
    FacetBins: "RoleFacet_BinsSignal",
    FacetVBins: "RoleFacetV_BinsSignal",
    FacetPaddingTop: "FacetPaddingTop",
    FacetPaddingBottom: "FacetPaddingBottom",
    FacetPaddingLeft: "FacetPaddingLeft",
    MarkOpacity: "Mark_OpacitySignal",
    PointScale: "Chart_PointScaleSignal",
    TextAngleX: "Text_AngleXSignal",
    TextAngleY: "Text_AngleYSignal",
    TextScale: "Text_ScaleSignal",
    TextSize: "Text_SizeSignal",
    TextTitleSize: "Text_TitleSizeSignal",
    TreeMapMethod: "Chart_TreeMapMethodSignal",
    XBins: "RoleX_BinsSignal",
    YBins: "RoleY_BinsSignal",
    ZHeight: "RoleZ_HeightSignal",
    ZGrounded: "RoleZ_Grounded",
    ZProportion: "RoleZ_ProportionSignal"
};
const Other = "__Other";
const ColorScaleNone = "none";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"7Mw3b":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"5iedU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defaultBins", ()=>defaultBins);
parcelHelpers.export(exports, "maxbins", ()=>maxbins);
parcelHelpers.export(exports, "minBarBandWidth", ()=>minBarBandWidth);
parcelHelpers.export(exports, "minFacetWidth", ()=>minFacetWidth);
parcelHelpers.export(exports, "minFacetHeight", ()=>minFacetHeight);
parcelHelpers.export(exports, "facetPaddingLeft", ()=>facetPaddingLeft);
parcelHelpers.export(exports, "facetPaddingTop", ()=>facetPaddingTop);
parcelHelpers.export(exports, "facetPaddingBottom", ()=>facetPaddingBottom);
parcelHelpers.export(exports, "facetPaddingRight", ()=>facetPaddingRight);
parcelHelpers.export(exports, "axesLabelLimit", ()=>axesLabelLimit);
parcelHelpers.export(exports, "axesTitleLimit", ()=>axesTitleLimit);
parcelHelpers.export(exports, "axesTitlePaddingX", ()=>axesTitlePaddingX);
parcelHelpers.export(exports, "axesTitlePaddingY", ()=>axesTitlePaddingY);
parcelHelpers.export(exports, "axesTitlePaddingFacetX", ()=>axesTitlePaddingFacetX);
parcelHelpers.export(exports, "axesTitlePaddingFacetY", ()=>axesTitlePaddingFacetY);
parcelHelpers.export(exports, "axesOffsetX", ()=>axesOffsetX);
parcelHelpers.export(exports, "axesOffsetY", ()=>axesOffsetY);
parcelHelpers.export(exports, "scatterSizedMin", ()=>scatterSizedMin);
parcelHelpers.export(exports, "scatterSizedDiv", ()=>scatterSizedDiv);
parcelHelpers.export(exports, "debounce", ()=>debounce);
const defaultBins = 10;
const maxbins = 100;
const minBarBandWidth = 15;
const minFacetWidth = 140;
const minFacetHeight = 180;
const facetPaddingLeft = 40;
const facetPaddingTop = 40;
const facetPaddingBottom = 40;
const facetPaddingRight = 40;
const axesLabelLimit = 100;
const axesTitleLimit = 100;
const axesTitlePaddingX = 30;
const axesTitlePaddingY = 60;
const axesTitlePaddingFacetX = 69;
const axesTitlePaddingFacetY = 92;
const axesOffsetX = 120;
const axesOffsetY = 120;
const scatterSizedMin = 10;
const scatterSizedDiv = 20;
const debounce = 250;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"78CLt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "allowNoneForSize", ()=>allowNoneForSize);
function allowNoneForSize(specContext) {
    switch(specContext.insight.totalStyle){
        case "sum-strip":
        case "sum-strip-percent":
        case "sum-treemap":
            return false;
        default:
            //if totalStyle is blank, count is assumed
            return true;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"gx8bO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("../constants");
var _defaults = require("../defaults");
var _size = require("../size");
exports.default = function(specContext) {
    var _a, _b;
    const { insight , specColumns , specViewOptions  } = specContext;
    const { language  } = specViewOptions;
    const showAxes = true;
    const bandProps = {
        orientation: "vertical",
        groupby: {
            column: specColumns.x,
            defaultBins: (0, _defaults.defaultBins),
            maxbinsSignalName: (0, _constants.SignalNames).XBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
            maxbins: (0, _defaults.maxbins)
        },
        minBandWidth: (0, _defaults.minBarBandWidth),
        showAxes
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
    const layouts = [
        {
            layoutType: "Band",
            props: bandProps
        }
    ];
    if (insight.totalStyle === "sum-strip-percent") {
        y.aggregate = "percent";
        y.title = language.percent;
        const stripProps = {
            addPercentageScale: true,
            sortOrder: "descending",
            orientation: "vertical",
            size: specColumns.size,
            sort: specColumns.sort,
            z: specColumns.z,
            showAxes
        };
        layouts.push({
            layoutType: "Strip",
            props: stripProps
        });
    } else {
        const aggProps = {
            niceScale: true,
            dock: "bottom",
            globalAggregateMaxExtentSignal: "aggMaxExtent",
            globalAggregateMaxExtentScaledSignal: "aggMaxExtentScaled",
            sumBy: specColumns.size,
            showAxes
        };
        layouts.push({
            layoutType: "AggregateContainer",
            props: aggProps
        });
        switch(insight.totalStyle){
            case "sum-treemap":
                {
                    y.aggregate = "sum";
                    y.title = language.sum;
                    const treemapProps = {
                        corner: "bottom-left",
                        size: specColumns.size,
                        treeMapMethod: specViewOptions.language.treeMapMethod,
                        z: specColumns.z,
                        showAxes
                    };
                    layouts.push({
                        layoutType: "Treemap",
                        props: treemapProps
                    });
                    break;
                }
            case "sum-strip":
                {
                    y.aggregate = "sum";
                    y.title = language.sum;
                    const stripProps = {
                        sortOrder: "descending",
                        orientation: "vertical",
                        size: specColumns.size,
                        sort: specColumns.sort,
                        z: specColumns.z,
                        showAxes
                    };
                    layouts.push({
                        layoutType: "Strip",
                        props: stripProps
                    });
                    break;
                }
            case "count-strip":
                {
                    y.aggregate = "count";
                    y.title = language.count;
                    const stripProps = {
                        sortOrder: "descending",
                        orientation: "vertical",
                        sort: specColumns.sort,
                        z: specColumns.z,
                        showAxes
                    };
                    layouts.push({
                        layoutType: "Strip",
                        props: stripProps
                    });
                    break;
                }
            default:
                {
                    y.aggregate = "count";
                    y.title = language.count;
                    const squareProps = {
                        sortBy: specColumns.sort,
                        fillDirection: "right-up",
                        z: specColumns.z,
                        maxGroupedUnits: aggProps.globalAggregateMaxExtentSignal,
                        maxGroupedFillSize: aggProps.globalAggregateMaxExtentScaledSignal,
                        showAxes
                    };
                    layouts.push({
                        layoutType: "Square",
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
            roles: [
                {
                    role: "x",
                    binnable: true,
                    axisSelection: ((_a = specColumns.x) === null || _a === void 0 ? void 0 : _a.quantitative) ? "range" : "exact",
                    axisSelectionBetweenTicks: true,
                    signals: [
                        (0, _constants.SignalNames).XBins
                    ]
                },
                {
                    role: "z",
                    axisSelection: ((_b = specColumns.z) === null || _b === void 0 ? void 0 : _b.quantitative) ? "range" : "exact",
                    allowNone: true
                },
                {
                    role: "color",
                    allowNone: true
                },
                {
                    role: "sort",
                    allowNone: true
                },
                {
                    role: "size",
                    allowNone: (0, _size.allowNoneForSize),
                    excludeCategoric: true,
                    signals: [
                        (0, _constants.SignalNames).TreeMapMethod
                    ]
                },
                {
                    role: "facet",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetVBins
                    ]
                }, 
            ]
        }
    };
};

},{"../constants":"eNr4m","../defaults":"5iedU","../size":"78CLt","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"hJwhn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("../constants");
var _defaults = require("../defaults");
var _size = require("../size");
exports.default = function(specContext) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const { insight , specColumns , specViewOptions  } = specContext;
    const axisScales = {
        x: {
            title: (_a = specColumns.x) === null || _a === void 0 ? void 0 : _a.name
        },
        y: {
            title: (_b = specColumns.y) === null || _b === void 0 ? void 0 : _b.name
        },
        z: {
            title: (_c = specColumns.z) === null || _c === void 0 ? void 0 : _c.name
        }
    };
    const backgroundImage = ((_d = specColumns.x) === null || _d === void 0 ? void 0 : _d.quantitative) && ((_e = specColumns.y) === null || _e === void 0 ? void 0 : _e.quantitative) && ((_f = insight.backgroundImage) === null || _f === void 0 ? void 0 : _f.extents) && insight.backgroundImage;
    const showAxes = !backgroundImage;
    const hBandProps = {
        excludeEncodingRuleMap: true,
        orientation: "horizontal",
        groupby: {
            column: specColumns.y,
            defaultBins: (0, _defaults.defaultBins),
            maxbinsSignalName: (0, _constants.SignalNames).YBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
            maxbins: (0, _defaults.maxbins)
        },
        minBandWidth: (0, _defaults.minBarBandWidth),
        showAxes,
        outerSignalExtents: backgroundImage && {
            max: backgroundImage.extents.top,
            min: backgroundImage.extents.bottom
        }
    };
    const vBandProps = {
        excludeEncodingRuleMap: true,
        orientation: "vertical",
        groupby: {
            column: specColumns.x,
            defaultBins: (0, _defaults.defaultBins),
            maxbinsSignalName: (0, _constants.SignalNames).XBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
            maxbins: (0, _defaults.maxbins)
        },
        minBandWidth: (0, _defaults.minBarBandWidth),
        showAxes,
        outerSignalExtents: backgroundImage && {
            max: backgroundImage.extents.right,
            min: backgroundImage.extents.left
        }
    };
    const aggProps = {
        onBuild: null,
        aggregation: null,
        sumBy: specColumns.size
    };
    const layouts = [
        {
            layoutType: "Band",
            props: vBandProps
        },
        {
            layoutType: "Band",
            props: hBandProps
        },
        {
            layoutType: "AggregateSquare",
            props: aggProps
        }, 
    ];
    switch(insight.totalStyle){
        case "sum-treemap":
            {
                aggProps.aggregation = "sum";
                const treemapProps = {
                    corner: "bottom-left",
                    size: specColumns.size,
                    treeMapMethod: specViewOptions.language.treeMapMethod,
                    z: specColumns.z,
                    showAxes
                };
                layouts.push({
                    layoutType: "Treemap",
                    props: treemapProps
                });
                break;
            }
        case "sum-strip":
            {
                aggProps.aggregation = "sum";
                const stripProps = {
                    sortOrder: "ascending",
                    orientation: "vertical",
                    size: specColumns.size,
                    sort: specColumns.sort,
                    z: specColumns.z,
                    showAxes
                };
                layouts.push({
                    layoutType: "Strip",
                    props: stripProps
                });
                break;
            }
        case "count-strip":
            {
                aggProps.aggregation = "count";
                const stripProps = {
                    sortOrder: "ascending",
                    orientation: "vertical",
                    sort: specColumns.sort,
                    z: specColumns.z,
                    showAxes
                };
                layouts.push({
                    layoutType: "Strip",
                    props: stripProps
                });
                break;
            }
        default:
            {
                aggProps.aggregation = "count";
                const squareProps = {
                    sortBy: specColumns.sort,
                    fillDirection: "right-down",
                    z: specColumns.z,
                    maxGroupedUnits: null,
                    maxGroupedFillSize: null,
                    showAxes
                };
                aggProps.onBuild = (aggMaxExtent, aggMaxExtentScaled)=>{
                    squareProps.maxGroupedUnits = aggMaxExtent;
                    squareProps.maxGroupedFillSize = aggMaxExtentScaled;
                };
                layouts.push({
                    layoutType: "Square",
                    props: squareProps
                });
                break;
            }
    }
    return {
        axisScales,
        layouts,
        specCapabilities: {
            backgroundImage: true,
            countsAndSums: true,
            roles: [
                {
                    role: "x",
                    binnable: true,
                    axisSelection: ((_g = specColumns.x) === null || _g === void 0 ? void 0 : _g.quantitative) ? "range" : "exact",
                    axisSelectionBetweenTicks: true,
                    signals: [
                        (0, _constants.SignalNames).XBins
                    ]
                },
                {
                    role: "y",
                    binnable: true,
                    axisSelection: ((_h = specColumns.y) === null || _h === void 0 ? void 0 : _h.quantitative) ? "range" : "exact",
                    axisSelectionBetweenTicks: true,
                    signals: [
                        (0, _constants.SignalNames).YBins
                    ]
                },
                {
                    role: "z",
                    axisSelection: ((_j = specColumns.z) === null || _j === void 0 ? void 0 : _j.quantitative) ? "range" : "exact",
                    allowNone: true
                },
                {
                    role: "color",
                    allowNone: true
                },
                {
                    role: "sort",
                    allowNone: true
                },
                {
                    role: "size",
                    allowNone: (0, _size.allowNoneForSize),
                    excludeCategoric: true,
                    signals: [
                        (0, _constants.SignalNames).TreeMapMethod
                    ]
                },
                {
                    role: "facet",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetVBins
                    ]
                }, 
            ]
        }
    };
};

},{"../constants":"eNr4m","../defaults":"5iedU","../size":"78CLt","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"dUpaP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
exports.default = function(specContext) {
    var _a;
    const { specColumns  } = specContext;
    const squareProps = {
        sortBy: specColumns.sort,
        fillDirection: "right-down",
        z: specColumns.z,
        collapseYHeight: true,
        showAxes: true
    };
    const axisScales = {
        z: {
            title: specColumns.z && specColumns.z.name
        }
    };
    return {
        axisScales,
        layouts: [
            {
                layoutType: "Square",
                props: squareProps
            }, 
        ],
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: "z",
                    axisSelection: ((_a = specColumns.z) === null || _a === void 0 ? void 0 : _a.quantitative) ? "range" : "exact",
                    allowNone: true
                },
                {
                    role: "color",
                    allowNone: true
                },
                {
                    role: "sort",
                    allowNone: true
                },
                {
                    role: "facet",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetVBins
                    ]
                }, 
            ]
        }
    };
};

},{"../constants":"eNr4m","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"6EBdS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
exports.default = function(specContext) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const { insight , specColumns , specViewOptions  } = specContext;
    const backgroundImageExtents = ((_a = specColumns.x) === null || _a === void 0 ? void 0 : _a.quantitative) && ((_b = specColumns.y) === null || _b === void 0 ? void 0 : _b.quantitative) && ((_c = insight.backgroundImage) === null || _c === void 0 ? void 0 : _c.extents);
    const scatterProps = {
        x: specColumns.x,
        y: specColumns.y,
        z: specColumns.z,
        size: specColumns.size,
        scatterPointScaleDisplay: specViewOptions.language.scatterPointScale,
        zGrounded: specViewOptions.language.zGrounded,
        backgroundImageExtents,
        showAxes: !backgroundImageExtents
    };
    const axisScales = {
        x: {
            title: (_d = specColumns.x) === null || _d === void 0 ? void 0 : _d.name
        },
        y: {
            title: (_e = specColumns.y) === null || _e === void 0 ? void 0 : _e.name
        },
        z: {
            title: (_f = specColumns.z) === null || _f === void 0 ? void 0 : _f.name
        }
    };
    return {
        axisScales,
        layouts: [
            {
                layoutType: "Scatter",
                props: scatterProps
            }, 
        ],
        specCapabilities: {
            backgroundImage: true,
            countsAndSums: false,
            roles: [
                {
                    role: "x",
                    axisSelection: ((_g = specColumns.x) === null || _g === void 0 ? void 0 : _g.quantitative) ? "range" : "exact"
                },
                {
                    role: "y",
                    axisSelection: ((_h = specColumns.y) === null || _h === void 0 ? void 0 : _h.quantitative) ? "range" : "exact"
                },
                {
                    role: "z",
                    axisSelection: ((_j = specColumns.z) === null || _j === void 0 ? void 0 : _j.quantitative) ? "range" : "exact",
                    allowNone: true
                },
                {
                    role: "color",
                    allowNone: true
                },
                {
                    role: "size",
                    excludeCategoric: true,
                    allowNone: true
                },
                {
                    role: "facet",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetVBins
                    ]
                }, 
            ],
            signals: [
                (0, _constants.SignalNames).PointScale,
                (0, _constants.SignalNames).ZGrounded
            ]
        }
    };
};

},{"../constants":"eNr4m","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"8N6Z2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _defaults = require("../defaults");
var _constants = require("../constants");
exports.default = function(specContext) {
    var _a, _b, _c, _d, _e, _f, _g;
    const { insight , specColumns , specViewOptions  } = specContext;
    const axisScales = {
        x: {
            title: (_a = specColumns.x) === null || _a === void 0 ? void 0 : _a.name
        },
        y: {
            title: (_b = specColumns.y) === null || _b === void 0 ? void 0 : _b.name
        },
        z: {
            title: specViewOptions.language.count
        }
    };
    const backgroundImage = ((_c = specColumns.x) === null || _c === void 0 ? void 0 : _c.quantitative) && ((_d = specColumns.y) === null || _d === void 0 ? void 0 : _d.quantitative) && ((_e = insight.backgroundImage) === null || _e === void 0 ? void 0 : _e.extents) && insight.backgroundImage;
    const showAxes = !backgroundImage;
    const hBandProps = {
        excludeEncodingRuleMap: true,
        orientation: "horizontal",
        groupby: {
            column: specColumns.y,
            defaultBins: (0, _defaults.defaultBins),
            maxbinsSignalName: (0, _constants.SignalNames).YBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
            maxbins: (0, _defaults.maxbins)
        },
        minBandWidth: (0, _defaults.minBarBandWidth),
        showAxes,
        outerSignalExtents: backgroundImage && {
            max: backgroundImage.extents.top,
            min: backgroundImage.extents.bottom
        }
    };
    const vBandProps = {
        excludeEncodingRuleMap: true,
        orientation: "vertical",
        groupby: {
            column: specColumns.x,
            defaultBins: (0, _defaults.defaultBins),
            maxbinsSignalName: (0, _constants.SignalNames).XBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
            maxbins: (0, _defaults.maxbins)
        },
        minBandWidth: (0, _defaults.minBarBandWidth),
        showAxes,
        outerSignalExtents: backgroundImage && {
            max: backgroundImage.extents.right,
            min: backgroundImage.extents.left
        }
    };
    const stackProps = {
        sort: specColumns.sort,
        showAxes
    };
    return {
        axisScales,
        customZScale: true,
        layouts: [
            {
                layoutType: "Band",
                props: vBandProps
            },
            {
                layoutType: "Band",
                props: hBandProps
            },
            {
                layoutType: "Stack",
                props: stackProps
            }, 
        ],
        specCapabilities: {
            backgroundImage: true,
            countsAndSums: false,
            roles: [
                {
                    role: "x",
                    binnable: true,
                    axisSelection: ((_f = specColumns.x) === null || _f === void 0 ? void 0 : _f.quantitative) ? "range" : "exact",
                    axisSelectionBetweenTicks: true,
                    signals: [
                        (0, _constants.SignalNames).XBins
                    ]
                },
                {
                    role: "y",
                    binnable: true,
                    axisSelection: ((_g = specColumns.y) === null || _g === void 0 ? void 0 : _g.quantitative) ? "range" : "exact",
                    axisSelectionBetweenTicks: true,
                    signals: [
                        (0, _constants.SignalNames).YBins
                    ]
                },
                {
                    role: "color",
                    allowNone: true
                },
                {
                    role: "sort",
                    allowNone: true
                },
                {
                    role: "facet",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetVBins
                    ]
                }, 
            ]
        }
    };
};

},{"../defaults":"5iedU","../constants":"eNr4m","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"jnY66":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
exports.default = function(specContext) {
    var _a;
    const { specColumns  } = specContext;
    const stripProps = {
        sortOrder: "ascending",
        orientation: "vertical",
        size: specColumns.size,
        sort: specColumns.sort,
        z: specColumns.z,
        showAxes: true
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
            aggregate: specColumns.size ? "sum" : "count"
        };
        const globalAggregateMaxExtentScaledSignal = "globalAggregateMaxExtentScaledSignal";
        const globalAggregateMaxExtentSignal = "globalAggregateMaxExtentSignal";
        const props = {
            dock: "top",
            niceScale: false,
            globalAggregateMaxExtentScaledSignal,
            globalAggregateMaxExtentSignal,
            sumBy: specColumns.size,
            showAxes: false
        };
        layouts.push({
            layoutType: "AggregateContainer",
            props
        });
    }
    layouts.push({
        layoutType: "Strip",
        props: stripProps
    });
    return {
        axisScales,
        layouts,
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: "size",
                    allowNone: true,
                    excludeCategoric: true
                },
                {
                    role: "z",
                    axisSelection: ((_a = specColumns.z) === null || _a === void 0 ? void 0 : _a.quantitative) ? "range" : "exact",
                    allowNone: true
                },
                {
                    role: "color",
                    allowNone: true
                },
                {
                    role: "sort",
                    allowNone: true
                },
                {
                    role: "facet",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetVBins
                    ]
                }, 
            ]
        }
    };
};

},{"../constants":"eNr4m","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"g0eb5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
exports.default = function(specContext) {
    var _a;
    const { specColumns , specViewOptions  } = specContext;
    const treemapProps = {
        corner: "top-left",
        group: specColumns.group,
        size: specColumns.size,
        treeMapMethod: specViewOptions.language.treeMapMethod,
        z: specColumns.z,
        showAxes: true
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
            aggregate: "sum"
        };
        const globalAggregateMaxExtentScaledSignal = "globalAggregateMaxExtentScaledSignal";
        const globalAggregateMaxExtentSignal = "globalAggregateMaxExtentSignal";
        const props = {
            dock: "top",
            niceScale: false,
            globalAggregateMaxExtentScaledSignal,
            globalAggregateMaxExtentSignal,
            sumBy: specColumns.size,
            showAxes: false
        };
        layouts.push({
            layoutType: "AggregateContainer",
            props
        });
    }
    layouts.push({
        layoutType: "Treemap",
        props: treemapProps
    });
    return {
        axisScales,
        layouts,
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: "size",
                    excludeCategoric: true
                },
                {
                    role: "group",
                    allowNone: true
                },
                {
                    role: "z",
                    axisSelection: ((_a = specColumns.z) === null || _a === void 0 ? void 0 : _a.quantitative) ? "range" : "exact",
                    allowNone: true
                },
                {
                    role: "color",
                    allowNone: true
                },
                {
                    role: "facet",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, _constants.SignalNames).FacetVBins
                    ]
                }, 
            ],
            signals: [
                (0, _constants.SignalNames).TreeMapMethod
            ]
        }
    };
};

},{"../constants":"eNr4m","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"fJidQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getFacetLayout", ()=>getFacetLayout);
var _defaults = require("./defaults");
function getFacetLayout(facetStyle, facetColumn, facetVColumn, axisTextColor) {
    let layoutPair;
    const groupby = facetColumn;
    const plotPadding = {
        x: 0,
        y: 0
    };
    let facetPadding;
    switch(facetStyle){
        case "cross":
            {
                const props = {
                    axisTextColor,
                    colRowTitles: true,
                    groupbyX: groupby,
                    groupbyY: facetVColumn
                };
                layoutPair = {
                    layoutType: "Cross",
                    props
                };
                facetPadding = {
                    bottom: (0, _defaults.facetPaddingBottom),
                    left: (0, _defaults.facetPaddingLeft),
                    top: 0
                };
                plotPadding.y = (0, _defaults.facetPaddingTop);
                plotPadding.x = (0, _defaults.facetPaddingRight);
                break;
            }
        case "wrap":
        default:
            {
                const props = {
                    axisTextColor,
                    cellTitles: true,
                    groupby
                };
                layoutPair = {
                    layoutType: "Wrap",
                    props
                };
                facetPadding = {
                    bottom: (0, _defaults.facetPaddingBottom),
                    left: (0, _defaults.facetPaddingLeft),
                    top: (0, _defaults.facetPaddingTop)
                };
                break;
            }
    }
    const facetLayout = {
        facetPadding,
        plotPadding
    };
    return {
        layoutPair,
        facetLayout
    };
}

},{"./defaults":"5iedU","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"bdXVF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Derive column metadata from the data array.
 * @param data Array of data objects.
 */ parcelHelpers.export(exports, "getColumnsFromData", ()=>getColumnsFromData);
/**
 * Get columns associated with each Insight role.
 * @param insight Insight to specify column roles.
 * @param columns Array of Columns inferred from the data.
 */ parcelHelpers.export(exports, "getSpecColumns", ()=>getSpecColumns);
/**
 * Populate columns with type inferences and stats.
 * @param columns Array of columns.
 * @param data Array of data objects.
 */ parcelHelpers.export(exports, "inferAll", ()=>inferAll);
parcelHelpers.export(exports, "getStats", ()=>getStats);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _d3Color = require("d3-color");
function isColor(cssColorSpecifier) {
    return !!(0, _d3Color.color)(cssColorSpecifier);
}
function isQuantitative(column) {
    return column.type === "number" || column.type === "integer";
}
function getColumnsFromData(inferTypesFn, data, columnTypes) {
    const sample = data[0];
    const fields = sample ? Object.keys(sample) : [];
    const inferences = Object.assign(Object.assign({}, inferTypesFn(data, fields)), columnTypes);
    const columns = fields.map((name)=>{
        const column = {
            name,
            type: inferences[name]
        };
        return column;
    });
    inferAll(columns, data);
    return columns;
}
function getSpecColumns(insight, columns) {
    function getColumnByName(name) {
        return columns.filter((c)=>c.name === name)[0];
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
function inferAll(columns, data) {
    columns.forEach((column)=>{
        if (column) {
            if (typeof column.quantitative !== "boolean") column.quantitative = isQuantitative(column);
            if (!column.stats) column.stats = getStats(data, column);
            if (column.type === "string" && typeof column.isColorData !== "boolean") checkIsColorData(data, column);
        }
    });
}
function checkIsColorData(data, column) {
    if (!column.stats.hasColorData) {
        column.isColorData = false;
        return;
    }
    for(let i = 0; i < data.length; i++)if (!isColor(data[i][column.name])) {
        column.isColorData = false;
        return;
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
    for(let i = 0; i < data.length; i++){
        const row = data[i];
        const value = row[column.name];
        const num = +value;
        distinctMap[value] = true;
        if (!isNaN(num)) {
            if (stats.max === null || num > stats.max) stats.max = num;
            if (stats.min === null || num < stats.min) stats.min = num;
            sum += num;
        }
        if (column.type === "string" && !stats.hasColorData && isColor(value)) stats.hasColorData = true;
    }
    if (column.quantitative) {
        stats.mean = data.length > 0 && sum / data.length;
        stats.hasNegative = detectNegative(column, data);
        if (column.type === "integer") stats.isSequential = detectSequentialColumn(column, data);
    }
    stats.distinctValueCount = Object.keys(distinctMap).length;
    return stats;
}
function detectNegative(column, data) {
    for(let i = 1; i < data.length; i++){
        if (data[i][column.name] < 0) return true;
    }
    return false;
}
function detectSequentialColumn(column, data) {
    if (data.length < 2) return false;
    const colname = column.name;
    for(let i = 1; i < data.length; i++){
        if (data[i][colname] !== data[i - 1][colname] + 1) return false;
    }
    return true;
}

},{"d3-color":"7SCp9","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"7SCp9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "color", ()=>(0, _colorJsDefault.default));
parcelHelpers.export(exports, "rgb", ()=>(0, _colorJs.rgb));
parcelHelpers.export(exports, "hsl", ()=>(0, _colorJs.hsl));
parcelHelpers.export(exports, "lab", ()=>(0, _labJsDefault.default));
parcelHelpers.export(exports, "hcl", ()=>(0, _labJs.hcl));
parcelHelpers.export(exports, "lch", ()=>(0, _labJs.lch));
parcelHelpers.export(exports, "gray", ()=>(0, _labJs.gray));
parcelHelpers.export(exports, "cubehelix", ()=>(0, _cubehelixJsDefault.default));
var _colorJs = require("./color.js");
var _colorJsDefault = parcelHelpers.interopDefault(_colorJs);
var _labJs = require("./lab.js");
var _labJsDefault = parcelHelpers.interopDefault(_labJs);
var _cubehelixJs = require("./cubehelix.js");
var _cubehelixJsDefault = parcelHelpers.interopDefault(_cubehelixJs);

},{"./color.js":"cJlE6","./lab.js":false,"./cubehelix.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"cJlE6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Color", ()=>Color);
parcelHelpers.export(exports, "darker", ()=>darker);
parcelHelpers.export(exports, "brighter", ()=>brighter);
parcelHelpers.export(exports, "rgbConvert", ()=>rgbConvert);
parcelHelpers.export(exports, "rgb", ()=>rgb);
parcelHelpers.export(exports, "Rgb", ()=>Rgb);
parcelHelpers.export(exports, "hslConvert", ()=>hslConvert);
parcelHelpers.export(exports, "hsl", ()=>hsl);
var _defineJs = require("./define.js");
var _defineJsDefault = parcelHelpers.interopDefault(_defineJs);
function Color() {}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp("^rgb\\(" + [
    reI,
    reI,
    reI
] + "\\)$"), reRgbPercent = new RegExp("^rgb\\(" + [
    reP,
    reP,
    reP
] + "\\)$"), reRgbaInteger = new RegExp("^rgba\\(" + [
    reI,
    reI,
    reI,
    reN
] + "\\)$"), reRgbaPercent = new RegExp("^rgba\\(" + [
    reP,
    reP,
    reP,
    reN
] + "\\)$"), reHslPercent = new RegExp("^hsl\\(" + [
    reN,
    reP,
    reP
] + "\\)$"), reHslaPercent = new RegExp("^hsla\\(" + [
    reN,
    reP,
    reP,
    reN
] + "\\)$");
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
(0, _defineJsDefault.default)(Color, color, {
    copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
        return this.rgb().displayable();
    },
    hex: color_formatHex,
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
exports.default = color;
function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
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
(0, _defineJsDefault.default)(Rgb, rgb, (0, _defineJs.extend)(Color, {
    brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
        return this;
    },
    displayable: function() {
        return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: rgb_formatHex,
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
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
}
function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
    } else s = l > 0 && l < 1 ? 0 : h;
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
(0, _defineJsDefault.default)(Hsl, hsl, (0, _defineJs.extend)(Color, {
    brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
        return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl: function() {
        var a = this.opacity;
        a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
    }
}));
/* From FvD 13.37, CSS Color Module Level 3 */ function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

},{"./define.js":"fa5me","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"fa5me":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "extend", ()=>extend);
exports.default = function(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
};
function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for(var key in definition)prototype[key] = definition[key];
    return prototype;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"33BLD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SpecBuilder", ()=>SpecBuilder);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _axes = require("./axes");
var _color = require("./color");
var _constants = require("./constants");
var _defaults = require("./defaults");
var _facetTitle = require("./facetTitle");
var _fill = require("./fill");
var _globalScope = require("./globalScope");
var _scope = require("./scope");
var _signals = require("./signals");
var _index = require("./layouts/index");
var _image = require("./image");
class SpecBuilder {
    constructor(props, specContext){
        this.props = props;
        this.specContext = specContext;
        this.globalSignals = {
            facetAxesAdjustX: {
                name: (0, _constants.SignalNames).FacetAxesAdjustX,
                update: props.facetLayout && props.collapseFacetAxes ? (0, _defaults.facetPaddingLeft).toString() : "0"
            },
            facetAxesAdjustY: {
                name: (0, _constants.SignalNames).FacetAxesAdjustY,
                update: props.facetLayout && props.collapseFacetAxes ? (0, _defaults.facetPaddingBottom).toString() : "0"
            },
            minCellWidth: {
                name: (0, _constants.SignalNames).MinCellWidth,
                update: `${0, _defaults.minFacetWidth}`
            },
            minCellHeight: {
                name: (0, _constants.SignalNames).MinCellHeight,
                update: `${0, _defaults.minFacetHeight}`
            },
            plotOffsetLeft: {
                name: (0, _constants.SignalNames).PlotOffsetLeft,
                update: "0"
            },
            plotOffsetTop: {
                name: (0, _constants.SignalNames).PlotOffsetTop,
                update: "0"
            },
            plotOffsetBottom: {
                name: (0, _constants.SignalNames).PlotOffsetBottom,
                update: "0"
            },
            plotOffsetRight: {
                name: (0, _constants.SignalNames).PlotOffsetRight,
                update: "0"
            },
            plotHeightOut: {
                name: (0, _constants.SignalNames).PlotHeightOut,
                update: (0, _constants.SignalNames).PlotHeightIn
            },
            plotWidthOut: {
                name: (0, _constants.SignalNames).PlotWidthOut,
                update: (0, _constants.SignalNames).PlotWidthIn
            }
        };
    }
    validate() {
        const { specContext  } = this;
        const { specCapabilities  } = this.props;
        const { roles  } = specCapabilities;
        const required = roles.filter((r)=>{
            switch(typeof r.allowNone){
                case "boolean":
                    return !r.allowNone;
                case "undefined":
                    return true;
                case "function":
                    return !r.allowNone(specContext);
            }
        });
        const numeric = roles.filter((r)=>r.excludeCategoric);
        const errors = required.map((r)=>{
            if (specContext.specColumns[r.role]) return null;
            else return `Field ${r.role} is required.`;
        }).concat(numeric.map((r)=>{
            if (specContext.specColumns[r.role] && !specContext.specColumns[r.role].quantitative) return `Field ${r.role} must be quantitative.`;
            else return null;
        })).filter(Boolean);
        const { backgroundImage  } = specContext.insight;
        if (backgroundImage && !backgroundImage.extents) errors.push("BackgroundImage must have extents.");
        return errors;
    }
    build() {
        var _a, _b;
        const { globalSignals , specContext  } = this;
        const { facetLayout , specCapabilities  } = this.props;
        const { insight , specColumns , specViewOptions  } = specContext;
        const dataName = "data_source";
        const { vegaSpec , groupMark  } = this.initSpec(dataName);
        const { topColorField , colorDataName  } = (0, _color.addColor)({
            scope: vegaSpec,
            dataName,
            specContext,
            scaleName: (0, _constants.ScaleNames).Color,
            legendDataName: "data_legend",
            topLookupName: "data_topcolorlookup",
            colorReverseSignalName: (0, _constants.SignalNames).ColorReverse
        });
        const globalScope = new (0, _globalScope.GlobalScope)({
            dataName: colorDataName,
            markGroup: groupMark,
            scope: vegaSpec,
            signals: globalSignals
        });
        if (facetLayout) {
            (0, _scope.addSignals)(vegaSpec, {
                name: (0, _constants.SignalNames).FacetPaddingBottom,
                update: `${facetLayout.facetPadding.bottom}`
            }, {
                name: (0, _constants.SignalNames).FacetPaddingLeft,
                update: `${facetLayout.facetPadding.left}`
            }, {
                name: (0, _constants.SignalNames).FacetPaddingTop,
                update: `${facetLayout.facetPadding.top}`
            });
            globalSignals.plotOffsetTop.update = `${facetLayout.plotPadding.y}`;
            globalSignals.plotOffsetRight.update = `${facetLayout.plotPadding.x}`;
        }
        const { firstScope , finalScope , specResult , allGlobalScales , allEncodingRules ,  } = this.iterateLayouts(globalScope, (i, innerScope)=>{
            if (facetLayout && i === 0) globalScope.zSize = innerScope.offsets.h;
        });
        if (specResult) return specResult;
        if (allGlobalScales.length > 0) {
            const plotHeightOut = globalSignals.plotHeightOut.name;
            const plotWidthOut = globalSignals.plotWidthOut.name;
            const colTitleScale = {
                type: "linear",
                name: "scale_facet_col_title",
                domain: [
                    0,
                    1
                ],
                range: [
                    0,
                    {
                        signal: plotWidthOut
                    }
                ]
            };
            const rowTitleScale = {
                type: "linear",
                name: "scale_facet_row_title",
                domain: [
                    0,
                    1
                ],
                range: [
                    {
                        signal: plotHeightOut
                    },
                    0
                ]
            };
            const facetScope = facetLayout ? firstScope : null;
            const backgroundGroup = facetLayout ? facetScope.facetScope : groupMark;
            //TODO if capability and numeric x,y
            if (insight.backgroundImage && specCapabilities.backgroundImage && ((_a = specColumns.x) === null || _a === void 0 ? void 0 : _a.quantitative) && ((_b = specColumns.y) === null || _b === void 0 ? void 0 : _b.quantitative)) {
                //backgroundGroup.encode.update.fill = { value: 'pink' }
                if (!backgroundGroup.marks) backgroundGroup.marks = [];
                const imageMark = (0, _image.getImageMark)(insight.backgroundImage, allGlobalScales);
                backgroundGroup.marks.unshift(imageMark);
            }
            const axesScopes = facetLayout ? (0, _facetTitle.addFacetAxesGroupMarks)({
                globalScope: globalScope.scope,
                plotScope: groupMark,
                facetScope,
                colTitleScale,
                rowTitleScale,
                colSeqName: "data_FacetCellColTitles",
                rowSeqName: "data_FacetCellRowTitles"
            }) : {
                main: [
                    {
                        scope: groupMark,
                        lines: true,
                        labels: true,
                        title: true
                    }
                ]
            };
            (0, _axes.addGlobalAxes)({
                globalScope,
                allGlobalScales,
                axisScales: this.props.axisScales,
                plotOffsetSignals: {
                    x: globalSignals.plotOffsetLeft,
                    y: globalSignals.plotOffsetBottom
                },
                axesOffsets: {
                    x: (0, _defaults.axesOffsetX),
                    y: (0, _defaults.axesOffsetY)
                },
                axesTitlePadding: facetLayout ? {
                    x: (0, _defaults.axesTitlePaddingFacetX),
                    y: (0, _defaults.axesTitlePaddingFacetY)
                } : {
                    x: (0, _defaults.axesTitlePaddingX),
                    y: (0, _defaults.axesTitlePaddingY)
                },
                labelBaseline: {
                    x: "top",
                    y: "middle"
                },
                specColumns,
                specViewOptions,
                axesScopes,
                hideZAxis: !!facetLayout,
                view: insight.view
            });
        }
        //add mark to the final scope
        if (finalScope.mark) {
            const { update  } = finalScope.mark.encode;
            const outputDataName = "output";
            finalScope.mark.from.data = outputDataName;
            (0, _scope.addData)(globalScope.markGroup, {
                name: outputDataName,
                source: globalScope.markDataName,
                transform: [
                    {
                        type: "formula",
                        expr: finalScope.offsets.x,
                        as: (0, _constants.FieldNames).OffsetX
                    },
                    {
                        type: "formula",
                        expr: finalScope.offsets.y,
                        as: (0, _constants.FieldNames).OffsetY
                    }, 
                ]
            });
            update.x = {
                field: (0, _constants.FieldNames).OffsetX
            };
            update.y = {
                field: (0, _constants.FieldNames).OffsetY
            };
            allEncodingRules.forEach((map)=>{
                for(const key in map)if (update[key]) {
                    const arrIn = map[key];
                    if (!Array.isArray(update[key])) {
                        const value = update[key];
                        const arrOut = [];
                        update[key] = arrOut;
                        arrIn.forEach((rule)=>arrOut.push(rule));
                        arrOut.push(value);
                    } else {
                        const arrOut = update[key];
                        arrIn.forEach((rule)=>arrOut.unshift(rule));
                    }
                }
            });
            update.fill = (0, _fill.fill)(specContext, topColorField, (0, _constants.ScaleNames).Color);
            update.opacity = (0, _fill.opacity)(specContext);
        }
        return {
            specCapabilities,
            vegaSpec
        };
    }
    initSpec(dataName) {
        const { globalSignals  } = this;
        const { facetAxesAdjustX , facetAxesAdjustY , minCellWidth , minCellHeight , plotOffsetLeft , plotOffsetBottom , plotOffsetTop , plotOffsetRight , plotHeightOut , plotWidthOut  } = globalSignals;
        const { specContext  } = this;
        const { insight  } = specContext;
        const groupMark = {
            type: "group",
            //style: 'cell',
            encode: {
                update: {
                    x: {
                        signal: `${(0, _constants.SignalNames).PlotOffsetLeft} - ${(0, _constants.SignalNames).FacetAxesAdjustX}`
                    },
                    y: {
                        signal: (0, _constants.SignalNames).PlotOffsetTop
                    },
                    height: {
                        signal: `${(0, _constants.SignalNames).PlotHeightOut} - ${(0, _constants.SignalNames).FacetAxesAdjustY}`
                    },
                    width: {
                        signal: `${(0, _constants.SignalNames).PlotWidthOut} + ${(0, _constants.SignalNames).FacetAxesAdjustX}`
                    }
                }
            }
        };
        const inputDataname = "input";
        const vegaSpec = {
            $schema: "https://vega.github.io/schema/vega/v5.json",
            //style: 'cell',
            data: [
                {
                    name: inputDataname
                },
                {
                    name: dataName,
                    source: inputDataname,
                    transform: []
                }
            ],
            marks: [
                groupMark
            ],
            signals: (0, _signals.textSignals)(specContext, (0, _constants.SignalNames).ViewportHeight).concat([
                minCellWidth,
                minCellHeight,
                {
                    name: (0, _constants.SignalNames).ViewportHeight,
                    update: `max(${(0, _constants.SignalNames).MinCellHeight}, ${insight.size.height})`
                },
                {
                    name: (0, _constants.SignalNames).ViewportWidth,
                    update: `max(${(0, _constants.SignalNames).MinCellWidth}, ${insight.size.width})`
                },
                plotOffsetLeft,
                plotOffsetTop,
                plotOffsetBottom,
                plotOffsetRight,
                facetAxesAdjustX,
                facetAxesAdjustY,
                {
                    name: (0, _constants.SignalNames).PlotHeightIn,
                    update: `${(0, _constants.SignalNames).ViewportHeight} - ${(0, _constants.SignalNames).PlotOffsetBottom} + ${(0, _constants.SignalNames).FacetAxesAdjustY}`
                },
                {
                    name: (0, _constants.SignalNames).PlotWidthIn,
                    update: `${(0, _constants.SignalNames).ViewportWidth} - ${(0, _constants.SignalNames).PlotOffsetLeft} - ${(0, _constants.SignalNames).PlotOffsetRight}`
                },
                plotHeightOut,
                plotWidthOut,
                {
                    name: "height",
                    update: `${(0, _constants.SignalNames).PlotOffsetTop} + ${(0, _constants.SignalNames).PlotHeightOut} + ${(0, _constants.SignalNames).PlotOffsetBottom} - ${(0, _constants.SignalNames).FacetAxesAdjustY}`
                },
                {
                    name: "width",
                    update: `${(0, _constants.SignalNames).PlotWidthOut} + ${(0, _constants.SignalNames).PlotOffsetLeft} + ${(0, _constants.SignalNames).PlotOffsetRight}`
                }, 
            ])
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
        const { layouts , specCapabilities  } = this.props;
        const allGlobalScales = [];
        const allEncodingRules = [];
        for(let i = 0; i < layouts.length; i++){
            if (!parentScope) continue;
            const buildProps = {
                globalScope,
                parentScope,
                axesScales: this.props.axisScales,
                groupings,
                id: i
            };
            const layout = this.createLayout(layouts[i], buildProps);
            try {
                childScope = layout.build();
                childScope.id = i;
                const groupby = layout.getGrouping();
                if (groupby) groupings.push({
                    id: i,
                    groupby,
                    fieldOps: [
                        {
                            field: null,
                            op: "count",
                            as: (0, _constants.FieldNames).Count
                        }, 
                    ]
                });
                const sumOp = layout.getAggregateSumOp();
                if (sumOp) groupings[groupings.length - 1].fieldOps.push(sumOp);
                onLayoutBuild(i, childScope);
            } catch (e) {
                specResult = {
                    errors: [
                        e.stack
                    ],
                    specCapabilities,
                    vegaSpec: null
                };
                break;
            }
            if (childScope && childScope.globalScales) allGlobalScales.push(childScope.globalScales);
            if (childScope.encodingRuleMap) allEncodingRules.push(childScope.encodingRuleMap);
            if (i === 0) firstScope = childScope;
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
        const { layoutType , props  } = layoutPair;
        const layoutBuildProps = Object.assign(Object.assign({}, props), buildProps);
        const layoutClass = (0, _index.layoutClasses)[layoutType];
        const layout = new layoutClass(layoutBuildProps);
        layout.id = buildProps.id;
        return layout;
    }
}

},{"./axes":"4VGAd","./color":"7m2aV","./constants":"eNr4m","./defaults":"5iedU","./facetTitle":"6LisZ","./fill":"291dn","./globalScope":"jGiIn","./scope":"k44Ul","./signals":"3piKm","./layouts/index":"8IEIT","./image":"3AjTc","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"4VGAd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addGlobalAxes", ()=>addGlobalAxes);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _defaults = require("./defaults");
var _scope = require("./scope");
function addGlobalAxes(props1) {
    const { axesOffsets , axisScales , axesScopes , axesTitlePadding , allGlobalScales , globalScope , labelBaseline , plotOffsetSignals , specColumns , specViewOptions  } = props1;
    const { scope  } = globalScope;
    allGlobalScales.forEach((globalScales)=>{
        const { scales  } = globalScales;
        for(const xyz in scales){
            const _scales = scales[xyz];
            if (_scales) {
                (0, _scope.addScales)(scope, ..._scales);
                let { showAxes  } = globalScales;
                let zindex = undefined;
                if (xyz === "z") {
                    showAxes = false;
                    if (props1.view === "3d" && specViewOptions.zAxisOptions && !props1.hideZAxis) {
                        if (specViewOptions.zAxisOptions.showZAxis) {
                            showAxes = true;
                            zindex = specViewOptions.zAxisOptions.zIndex;
                        }
                    }
                }
                if (showAxes && axisScales) {
                    const axisScale = axisScales[xyz];
                    if (axisScale) {
                        const lineColor = specViewOptions.colors.axisLine;
                        const horizontal = xyz === "x";
                        const column = specColumns[xyz] || {
                            quantitative: true
                        };
                        const title = axisScale.title;
                        const props = {
                            title,
                            horizontal,
                            column,
                            specViewOptions,
                            lineColor,
                            titlePadding: axesTitlePadding[xyz],
                            labelBaseline: labelBaseline[xyz],
                            zindex
                        };
                        axesScopes["main"].forEach((a)=>(0, _scope.addAxes)(a.scope, createAxis(Object.assign(Object.assign({}, props), {
                                scale: a.scale || _scales[0],
                                showTitle: a.title,
                                showLabels: a.labels,
                                showLines: a.lines
                            }))));
                        if (axesScopes[xyz]) axesScopes[xyz].forEach((a)=>(0, _scope.addAxes)(a.scope, createAxis(Object.assign(Object.assign({}, props), {
                                scale: a.scale || _scales[0],
                                showTitle: a.title,
                                showLabels: a.labels,
                                showLines: a.lines
                            }))));
                        if (plotOffsetSignals[xyz] && axesOffsets[xyz]) {
                            const plotOffsetSignal = plotOffsetSignals[xyz];
                            plotOffsetSignal.update = `${axesOffsets[xyz]}`;
                        }
                    }
                }
            }
        }
    });
}
function createAxis(props) {
    const { column , horizontal , labelBaseline , lineColor , scale , showLabels , showTitle , showLines , specViewOptions , title , titlePadding , zindex  } = props;
    const axis = Object.assign(Object.assign(Object.assign(Object.assign({
        zindex,
        scale: scale.name,
        orient: horizontal ? "bottom" : "left",
        domain: showLines,
        ticks: showLines
    }, showLines && {
        domainColor: lineColor,
        tickColor: lineColor,
        tickSize: specViewOptions.tickSize
    }), showTitle && {
        title,
        titleAlign: horizontal ? "left" : "right",
        titleAngle: {
            signal: horizontal ? (0, _constants.SignalNames).TextAngleX : (0, _constants.SignalNames).TextAngleY
        },
        titleColor: specViewOptions.colors.axisText,
        titleFontSize: {
            signal: (0, _constants.SignalNames).TextTitleSize
        },
        titleLimit: (0, _defaults.axesTitleLimit),
        titlePadding
    }), {
        labels: showLabels
    }), showLabels && {
        labelAlign: horizontal ? "left" : "right",
        labelBaseline,
        labelAngle: {
            signal: horizontal ? (0, _constants.SignalNames).TextAngleX : (0, _constants.SignalNames).TextAngleY
        },
        labelColor: specViewOptions.colors.axisText,
        labelFontSize: {
            signal: (0, _constants.SignalNames).TextSize
        },
        labelLimit: (0, _defaults.axesLabelLimit)
    });
    if (column.quantitative) axis.format = "~r";
    return axis;
}

},{"./constants":"eNr4m","./defaults":"5iedU","./scope":"k44Ul","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"k44Ul":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addAxes", ()=>addAxes);
parcelHelpers.export(exports, "addData", ()=>addData);
parcelHelpers.export(exports, "addMarks", ()=>addMarks);
parcelHelpers.export(exports, "addScales", ()=>addScales);
parcelHelpers.export(exports, "addSignals", ()=>addSignals);
parcelHelpers.export(exports, "addTransforms", ()=>addTransforms);
parcelHelpers.export(exports, "getDataByName", ()=>getDataByName);
parcelHelpers.export(exports, "getGroupBy", ()=>getGroupBy);
parcelHelpers.export(exports, "addOffsets", ()=>addOffsets);
function addAxes(scope, ...axes) {
    if (!axes || !axes.length) return;
    if (!scope.axes) scope.axes = [];
    scope.axes.push(...axes.filter(Boolean));
}
function addData(scope, ...datas) {
    if (!datas || !datas.length) return;
    if (!scope.data) scope.data = [];
    scope.data.push(...datas.filter(Boolean));
}
function addMarks(scope, ...marks) {
    if (!marks || !marks.length) return;
    if (!scope.marks) scope.marks = [];
    scope.marks.push(...marks.filter(Boolean));
}
function addScales(scope, ...scales) {
    if (!scales || !scales.length) return;
    if (!scope.scales) scope.scales = [];
    scope.scales.push(...scales.filter(Boolean));
}
function addSignals(scope, ...signals) {
    if (!signals || !signals.length) return;
    if (!scope.signals) scope.signals = [];
    scope.signals.push(...signals.filter(Boolean));
}
function addTransforms(data, ...transforms) {
    if (!transforms || !transforms.length) return;
    if (!data.transform) data.transform = [];
    data.transform.push(...transforms.filter(Boolean));
}
function getDataByName(data, dataName) {
    for(let i = 0; i < data.length; i++){
        if (data[i].name === dataName) return {
            data: data[i],
            index: i
        };
    }
}
function getGroupBy(groupings) {
    const groupby = groupings.map((g)=>g.groupby);
    return groupby.reduce((acc, val)=>acc.concat(val), []);
}
function addOffsets(...offsets) {
    return offsets.filter(Boolean).join(" + ");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"7m2aV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addColor", ()=>addColor);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _scope = require("./scope");
var _scales = require("./scales");
var _signals = require("./signals");
var _constants = require("./constants");
var _legends = require("./legends");
var _top = require("./top");
function addColor(props) {
    const { colorReverseSignalName , dataName , scope , legendDataName , scaleName , specContext , topLookupName  } = props;
    let colorDataName = dataName;
    const { insight , specColumns , specViewOptions  } = specContext;
    const legends = (0, _legends.getLegends)(specContext, scaleName);
    if (legends) scope.legends = legends;
    const categoricalColor = specColumns.color && !specColumns.color.quantitative;
    if (categoricalColor) {
        (0, _scope.addData)(scope, ...(0, _top.topLookup)(specColumns.color, specViewOptions.maxLegends, dataName, legendDataName, topLookupName, (0, _constants.FieldNames).TopColor, (0, _constants.FieldNames).TopIndex));
        colorDataName = legendDataName;
    }
    if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
        if (specColumns.color.quantitative) (0, _scope.addScales)(scope, (0, _scales.binnableColorScale)(scaleName, insight.colorBin, dataName, specColumns.color.name, insight.scheme));
        else (0, _scope.addScales)(scope, {
            name: scaleName,
            type: "ordinal",
            domain: {
                data: colorDataName,
                field: (0, _constants.FieldNames).TopColor,
                sort: true
            },
            range: {
                scheme: insight.scheme || (0, _constants.ColorScaleNone)
            },
            reverse: {
                signal: colorReverseSignalName
            }
        });
    }
    (0, _scope.addSignals)(scope, (0, _signals.colorBinCountSignal)(specContext), (0, _signals.colorReverseSignal)(specContext));
    return {
        topColorField: (0, _constants.FieldNames).TopColor,
        colorDataName
    };
}

},{"./scope":"k44Ul","./scales":"8b8up","./signals":"3piKm","./constants":"eNr4m","./legends":"d7VwA","./top":"1OWQa","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"8b8up":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "linearScale", ()=>linearScale);
parcelHelpers.export(exports, "pointScale", ()=>pointScale);
parcelHelpers.export(exports, "binnableColorScale", ()=>binnableColorScale);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _expr = require("./expr");
function linearScale(scaleName, domain, range, reverse, zero, nice = true) {
    const scale = {
        name: scaleName,
        type: "linear",
        range,
        round: true,
        reverse,
        domain,
        zero,
        nice
    };
    return scale;
}
function pointScale(scaleName, data, range, field, reverse) {
    const scale = {
        name: scaleName,
        type: "point",
        range,
        domain: {
            data,
            field: (0, _expr.safeFieldName)(field),
            sort: true
        },
        padding: 0.5
    };
    if (reverse !== undefined) scale.reverse = reverse;
    return scale;
}
function binnableColorScale(scaleName, colorBin, data, field, scheme) {
    scheme = scheme || (0, _constants.ColorScaleNone);
    const domain = {
        data,
        field: (0, _expr.safeFieldName)(field)
    };
    const range = {
        scheme
    };
    const reverse = {
        signal: (0, _constants.SignalNames).ColorReverse
    };
    if (colorBin !== "continuous") range.count = {
        signal: (0, _constants.SignalNames).ColorBinCount
    };
    switch(colorBin){
        case "continuous":
            {
                const sequentialScale = {
                    name: scaleName,
                    type: "linear",
                    domain,
                    range,
                    reverse
                };
                return sequentialScale;
            }
        case "quantile":
            {
                const quantileScale = {
                    name: scaleName,
                    type: "quantile",
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
                    type: "quantize",
                    domain,
                    range,
                    reverse
                };
                return quantizeScale;
            }
    }
}

},{"./constants":"eNr4m","./expr":"1G99Z","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"1G99Z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/**
 * Make sure that the field name is accessible via Vega's Field type
 * https://vega.github.io/vega/docs/types/#Field
 * examples: "source.x", "target['x']", "[my.field]"
 */ parcelHelpers.export(exports, "safeFieldName", ()=>safeFieldName);
/**
 * Make sure the field name is usable in a Vega expression
 */ parcelHelpers.export(exports, "exprSafeFieldName", ()=>exprSafeFieldName);
function safeFieldName(field) {
    return field.replace(".", "\\.").replace("[", "\\[").replace("]", "\\]");
}
function exprSafeFieldName(field) {
    //remove whitespace, period, accessors and logical modifiers
    return field.replace(/[.,:;+=\-/<>{}|~!@#$%^*[\]`'"()?\s\\]/g, "");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"3piKm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defaultZProportion", ()=>defaultZProportion);
parcelHelpers.export(exports, "textSignals", ()=>textSignals);
parcelHelpers.export(exports, "colorBinCountSignal", ()=>colorBinCountSignal);
parcelHelpers.export(exports, "colorReverseSignal", ()=>colorReverseSignal);
parcelHelpers.export(exports, "modifySignal", ()=>modifySignal);
var _constants = require("./constants");
var _defaults = require("./defaults");
const defaultZProportion = 0.6;
function textSignals(context, heightSignal) {
    const { specViewOptions  } = context;
    const signals = [
        {
            name: (0, _constants.SignalNames).ZProportion,
            value: defaultZProportion,
            bind: {
                name: specViewOptions.language.zScaleProportion,
                debounce: (0, _defaults.debounce),
                input: "range",
                min: 0.1,
                max: 2,
                step: 0.1
            }
        },
        {
            name: (0, _constants.SignalNames).ZHeight,
            update: `${heightSignal} * ${(0, _constants.SignalNames).ZProportion}`
        },
        {
            name: (0, _constants.SignalNames).TextScale,
            value: 1.2,
            bind: {
                name: specViewOptions.language.textScaleSignal,
                debounce: (0, _defaults.debounce),
                input: "range",
                min: 0.5,
                max: 2,
                step: 0.1
            }
        },
        {
            name: (0, _constants.SignalNames).TextSize,
            update: `${(0, _constants.SignalNames).TextScale} * 10`
        },
        {
            name: (0, _constants.SignalNames).TextTitleSize,
            update: `${(0, _constants.SignalNames).TextScale} * 15`
        },
        {
            name: (0, _constants.SignalNames).TextAngleX,
            value: 30,
            bind: {
                name: specViewOptions.language.xAxisTextAngleSignal,
                debounce: (0, _defaults.debounce),
                input: "range",
                min: 0,
                max: 90,
                step: 1
            }
        },
        {
            name: (0, _constants.SignalNames).TextAngleY,
            value: 0,
            bind: {
                name: specViewOptions.language.yAxisTextAngleSignal,
                debounce: (0, _defaults.debounce),
                input: "range",
                min: -90,
                max: 0,
                step: 1
            }
        },
        {
            name: (0, _constants.SignalNames).MarkOpacity,
            value: 1,
            bind: {
                name: specViewOptions.language.markOpacitySignal,
                debounce: (0, _defaults.debounce),
                input: "range",
                min: 0.1,
                max: 1,
                step: 0.05
            }
        }, 
    ];
    return signals;
}
function colorBinCountSignal(context) {
    const { specViewOptions  } = context;
    const signal = {
        name: (0, _constants.SignalNames).ColorBinCount,
        value: 7,
        bind: {
            name: specViewOptions.language.colorBinCount,
            debounce: (0, _defaults.debounce),
            input: "range",
            min: 1,
            max: specViewOptions.maxLegends + 1,
            step: 1
        }
    };
    return signal;
}
function colorReverseSignal(context) {
    const { specViewOptions  } = context;
    const signal = {
        name: (0, _constants.SignalNames).ColorReverse,
        value: false,
        bind: {
            name: specViewOptions.language.colorReverse,
            input: "checkbox"
        }
    };
    return signal;
}
function modifySignal(s, fn, update) {
    s.update = `${fn}((${s.update}), (${update}))`;
}

},{"./constants":"eNr4m","./defaults":"5iedU","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"d7VwA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getLegends", ()=>getLegends);
function legend(column, fill) {
    const legend1 = {
        orient: "none",
        title: column.name,
        fill,
        encode: {
            symbols: {
                update: {
                    shape: {
                        value: "square"
                    }
                }
            }
        }
    };
    if (column.quantitative) {
        legend1.type = "symbol";
        legend1.format = "~r";
    }
    return legend1;
}
function getLegends(context, fill) {
    const { specColumns , insight  } = context;
    if (specColumns.color && !insight.hideLegend && !insight.directColor && !specColumns.color.isColorData) return [
        legend(specColumns.color, fill)
    ];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"1OWQa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "topLookup", ()=>topLookup);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _expr = require("./expr");
function topLookup(column, count, source, legend, lookupName, fieldName, indexName) {
    const data = [
        {
            name: lookupName,
            source,
            transform: [
                {
                    type: "aggregate",
                    groupby: [
                        (0, _expr.safeFieldName)(column.name)
                    ]
                },
                {
                    type: "window",
                    ops: [
                        "count"
                    ],
                    as: [
                        indexName
                    ]
                },
                {
                    type: "filter",
                    expr: `datum[${JSON.stringify(indexName)}] <= ${count}`
                }, 
            ]
        },
        {
            name: legend,
            source,
            transform: [
                {
                    type: "lookup",
                    from: lookupName,
                    key: (0, _expr.safeFieldName)(column.name),
                    fields: [
                        column.name
                    ].map((0, _expr.safeFieldName)),
                    values: [
                        column.name
                    ].map((0, _expr.safeFieldName)),
                    as: [
                        fieldName
                    ]
                },
                {
                    type: "formula",
                    expr: `datum[${JSON.stringify(fieldName)}] == null ? '${(0, _constants.Other)}' : datum[${JSON.stringify(fieldName)}]`,
                    as: fieldName
                }, 
            ]
        }, 
    ];
    return data;
}

},{"./constants":"eNr4m","./expr":"1G99Z","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"6LisZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addFacetColRowTitles", ()=>addFacetColRowTitles);
parcelHelpers.export(exports, "addFacetCellTitles", ()=>addFacetCellTitles);
parcelHelpers.export(exports, "addFacetAxesGroupMarks", ()=>addFacetAxesGroupMarks);
parcelHelpers.export(exports, "facetRowHeaderFooter", ()=>facetRowHeaderFooter);
parcelHelpers.export(exports, "facetColumnHeaderFooter", ()=>facetColumnHeaderFooter);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _scope = require("./scope");
var _constants = require("./constants");
function addFacetColRowTitles(globalScope, colTitleSource, rowTitleSource, sizeSignals, axisTextColor) {
    const titleSignal = `parent[${JSON.stringify((0, _constants.FieldNames).FacetTitle)}]`;
    const index = `datum[${JSON.stringify((0, _constants.FieldNames).Ordinal)}] - 1`;
    const col = facetColumnHeaderFooter(colTitleSource.dataName, sizeSignals, index);
    const row = facetRowHeaderFooter(rowTitleSource.dataName, sizeSignals, index);
    (0, _scope.addMarks)(globalScope, col.header, row.footer);
    (0, _scope.addMarks)(col.header, {
        type: "text",
        encode: {
            enter: {
                align: {
                    value: "center"
                },
                baseline: {
                    value: "middle"
                },
                fill: {
                    value: axisTextColor
                }
            },
            update: {
                metaData: {
                    signal: `{search: parent[${JSON.stringify((0, _constants.FieldNames).FacetSearch)}]}`
                },
                x: {
                    signal: `${sizeSignals.layoutWidth} / 2`
                },
                limit: {
                    signal: sizeSignals.layoutWidth
                },
                fontSize: {
                    signal: (0, _constants.SignalNames).TextSize
                },
                text: {
                    signal: titleSignal
                }
            }
        }
    });
    (0, _scope.addMarks)(row.footer, {
        type: "text",
        encode: {
            enter: {
                align: {
                    value: "left"
                },
                baseline: {
                    value: "middle"
                },
                fill: {
                    value: axisTextColor
                }
            },
            update: {
                metaData: {
                    signal: `{search: parent[${JSON.stringify((0, _constants.FieldNames).FacetSearch)}]}`
                },
                y: {
                    signal: `${sizeSignals.layoutHeight} / 2`
                },
                limit: {
                    signal: (0, _constants.SignalNames).PlotOffsetRight
                },
                fontSize: {
                    signal: (0, _constants.SignalNames).TextSize
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
        type: "text",
        encode: {
            enter: {
                align: {
                    value: "center"
                },
                baseline: {
                    value: "bottom"
                },
                fill: {
                    value: axisTextColor
                }
            },
            update: {
                metaData: {
                    signal: `{search: parent[${JSON.stringify((0, _constants.FieldNames).FacetSearch)}]}`
                },
                x: {
                    signal: `(${sizeSignals.layoutWidth}) / 2`
                },
                text: {
                    signal: `parent[${JSON.stringify((0, _constants.FieldNames).FacetTitle)}]`
                },
                fontSize: {
                    signal: (0, _constants.SignalNames).TextSize
                },
                limit: {
                    signal: sizeSignals.layoutWidth
                },
                y: {
                    signal: `-${(0, _constants.SignalNames).FacetPaddingTop} / 2`
                }
            }
        }
    });
}
function addFacetAxesGroupMarks(props) {
    const { colSeqName , colTitleScale , globalScope , facetScope , plotScope , rowSeqName , rowTitleScale  } = props;
    const { sizeSignals  } = facetScope;
    const colSequence = createSequence(colSeqName, sizeSignals.colCount);
    const rowSequence = createSequence(rowSeqName, sizeSignals.rowCount);
    const index = "datum.data";
    const col = facetColumnHeaderFooter(colSeqName, sizeSignals, index);
    const row = facetRowHeaderFooter(rowSeqName, sizeSignals, index);
    (0, _scope.addData)(globalScope, colSequence, rowSequence);
    (0, _scope.addMarks)(globalScope, col.footer, row.header);
    (0, _scope.addScales)(globalScope, colTitleScale, rowTitleScale);
    const map = {
        main: [
            {
                scope: facetScope.facetScope,
                lines: true,
                labels: false,
                title: false
            }, 
        ],
        x: [
            {
                scope: col.footer,
                lines: true,
                labels: true,
                title: false
            },
            {
                scope: plotScope,
                scale: colTitleScale,
                lines: false,
                labels: false,
                title: true
            }, 
        ],
        y: [
            {
                scope: row.header,
                lines: true,
                labels: true,
                title: false
            },
            {
                scope: plotScope,
                scale: rowTitleScale,
                lines: false,
                labels: false,
                title: true
            }, 
        ]
    };
    return map;
}
function facetRowHeaderFooter(data, sizeSignals, index) {
    const rowFn = (xSignal)=>{
        return {
            type: "group",
            from: {
                data
            },
            encode: {
                update: {
                    x: {
                        signal: xSignal
                    },
                    y: {
                        signal: `${(0, _constants.SignalNames).PlotOffsetTop} + ${(0, _constants.SignalNames).FacetPaddingTop} + (${index}) * (${sizeSignals.layoutHeight} + ${(0, _constants.SignalNames).FacetPaddingTop} + ${(0, _constants.SignalNames).FacetPaddingBottom})`
                    },
                    height: {
                        signal: sizeSignals.layoutHeight
                    }
                }
            }
        };
    };
    const header = rowFn((0, _constants.SignalNames).PlotOffsetLeft);
    const footer = rowFn(`${(0, _constants.SignalNames).PlotOffsetLeft} + ${(0, _constants.SignalNames).PlotWidthOut} + ${(0, _constants.SignalNames).PlotOffsetRight} / 2`);
    return {
        header,
        footer
    };
}
function facetColumnHeaderFooter(data, sizeSignals, index) {
    const colFn = (ySignal)=>{
        return {
            type: "group",
            from: {
                data
            },
            encode: {
                update: {
                    x: {
                        signal: `(${index}) * (${sizeSignals.layoutWidth} + ${(0, _constants.SignalNames).FacetPaddingLeft}) + ${(0, _constants.SignalNames).FacetPaddingLeft} + ${(0, _constants.SignalNames).PlotOffsetLeft} - ${(0, _constants.SignalNames).FacetAxesAdjustX}`
                    },
                    y: {
                        signal: `${ySignal} - ${(0, _constants.SignalNames).FacetAxesAdjustY}`
                    },
                    width: {
                        signal: sizeSignals.layoutWidth
                    }
                }
            }
        };
    };
    //create group marks based on data sequences
    const header = colFn(`${(0, _constants.SignalNames).PlotOffsetTop} / 2`);
    const footer = colFn(`${(0, _constants.SignalNames).PlotOffsetTop} + ${(0, _constants.SignalNames).PlotHeightOut}`);
    return {
        header,
        footer
    };
}
function createSequence(dataName, countSignal) {
    return {
        name: dataName,
        transform: [
            {
                type: "sequence",
                start: 0,
                stop: {
                    signal: countSignal
                }
            }, 
        ]
    };
}

},{"./scope":"k44Ul","./constants":"eNr4m","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"291dn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "fill", ()=>fill);
parcelHelpers.export(exports, "opacity", ()=>opacity);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _expr = require("./expr");
function fill(context, colorFieldName, scale) {
    const { specColumns , insight , specViewOptions  } = context;
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
        signal: (0, _constants.SignalNames).MarkOpacity
    };
    return result;
}

},{"./constants":"eNr4m","./expr":"1G99Z","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"jGiIn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GlobalScope", ()=>GlobalScope);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _scope = require("./scope");
class GlobalScope {
    constructor(props){
        const { dataName , markGroup , scope , signals  } = props;
        this.scope = scope;
        this._markGroup = markGroup;
        this.signals = signals;
        this.data = (0, _scope.getDataByName)(scope.data, dataName).data;
        this._markDataName = dataName;
        this.offsets = {
            x: "0",
            y: "0",
            h: (0, _constants.SignalNames).PlotHeightIn,
            w: (0, _constants.SignalNames).PlotWidthIn
        };
        this.sizeSignals = {
            layoutHeight: (0, _constants.SignalNames).PlotHeightIn,
            layoutWidth: (0, _constants.SignalNames).PlotWidthIn
        };
        this.zSize = (0, _constants.SignalNames).PlotHeightIn;
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

},{"./constants":"eNr4m","./scope":"k44Ul","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"8IEIT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "layoutClasses", ()=>layoutClasses);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _aggregateContainer = require("./aggregateContainer");
var _aggregateSquare = require("./aggregateSquare");
var _band = require("./band");
var _cross = require("./cross");
var _scatter = require("./scatter");
var _square = require("./square");
var _stack = require("./stack");
var _strip = require("./strip");
var _treemap = require("./treemap");
var _wrap = require("./wrap");
const layoutClasses = {
    AggregateContainer: (0, _aggregateContainer.AggregateContainer),
    AggregateSquare: (0, _aggregateSquare.AggregateSquare),
    Band: (0, _band.Band),
    Cross: (0, _cross.Cross),
    Scatter: (0, _scatter.Scatter),
    Square: (0, _square.Square),
    Stack: (0, _stack.Stack),
    Strip: (0, _strip.Strip),
    Treemap: (0, _treemap.Treemap),
    Wrap: (0, _wrap.Wrap)
};

},{"./aggregateContainer":"2AO1d","./aggregateSquare":"3jVb3","./band":"cD88v","./cross":"3Xmem","./scatter":"jRktq","./square":"425K1","./stack":"b0WQI","./strip":"1pzL4","./treemap":"kPpw1","./wrap":"7BE6v","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"2AO1d":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AggregateContainer", ()=>AggregateContainer);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _constants = require("../constants");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
class AggregateContainer extends (0, _layout.Layout) {
    constructor(props){
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
        if (this.aggregation === "sum") {
            const fieldOp = {
                field: (0, _expr.safeFieldName)(this.props.sumBy.name),
                op: "sum",
                as: (0, _constants.FieldNames).Sum
            };
            return fieldOp;
        }
    }
    build() {
        const { aggregation , names , props  } = this;
        const { dock , globalScope , groupings , niceScale , parentScope , showAxes  } = props;
        (0, _scope.addTransforms)(globalScope.data, Object.assign(Object.assign({}, this.getTransforms(aggregation, (0, _scope.getGroupBy)(groupings))), {
            as: [
                names.aggregateField
            ]
        }), {
            type: "extent",
            field: (0, _expr.safeFieldName)(names.aggregateField),
            signal: names.globalAggregateExtentSignal
        });
        (0, _scope.addSignals)(globalScope.scope, {
            name: props.globalAggregateMaxExtentSignal,
            update: `${names.globalAggregateExtentSignal}[1]`
        });
        const horizontal = dock === "left";
        const groupScaled = `scale(${JSON.stringify(names.scale)}, datum[${JSON.stringify(names.aggregateField)}])`;
        const offsets = {
            x: parentScope.offsets.x,
            y: (0, _scope.addOffsets)(parentScope.offsets.y, dock === "bottom" ? groupScaled : ""),
            h: horizontal ? parentScope.offsets.h : dock === "top" ? groupScaled : `${parentScope.offsets.h} - ${groupScaled}`,
            w: horizontal ? groupScaled : parentScope.offsets.w
        };
        const scale = {
            type: "linear",
            name: names.scale,
            domain: [
                0,
                {
                    signal: props.globalAggregateMaxExtentSignal
                }, 
            ],
            range: horizontal ? [
                0,
                {
                    signal: parentScope.sizeSignals.layoutWidth
                }, 
            ] : [
                {
                    signal: parentScope.sizeSignals.layoutHeight
                },
                0, 
            ],
            nice: niceScale,
            zero: true,
            reverse: dock === "top"
        };
        const globalAggregateMaxExtentScaledValue = `scale(${JSON.stringify(names.scale)}, ${props.globalAggregateMaxExtentSignal})`;
        (0, _scope.addSignals)(globalScope.scope, {
            name: props.globalAggregateMaxExtentScaledSignal,
            update: dock === "bottom" ? `${parentScope.sizeSignals.layoutHeight} - ${globalAggregateMaxExtentScaledValue}` : globalAggregateMaxExtentScaledValue
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
                    x: horizontal ? [
                        scale
                    ] : undefined,
                    y: horizontal ? undefined : [
                        scale
                    ]
                }
            },
            encodingRuleMap: horizontal ? {
                x: [
                    {
                        test: (0, _selection.testForCollapseSelection)(),
                        signal: parentScope.offsets.x
                    }
                ],
                width: [
                    {
                        test: (0, _selection.testForCollapseSelection)(),
                        value: 0
                    }
                ]
            } : {
                y: [
                    {
                        test: (0, _selection.testForCollapseSelection)(),
                        signal: dock === "top" ? parentScope.offsets.y : (0, _scope.addOffsets)(parentScope.offsets.y, parentScope.offsets.h)
                    }
                ],
                height: [
                    {
                        test: (0, _selection.testForCollapseSelection)(),
                        value: 0
                    }
                ]
            }
        };
    }
    getTransforms(aggregation, groupby) {
        const trans = {
            type: "joinaggregate",
            groupby: groupby.map((0, _expr.safeFieldName)),
            ops: [
                aggregation
            ]
        };
        if (aggregation === "sum") trans.fields = [
            this.props.sumBy.name
        ].map((0, _expr.safeFieldName));
        return trans;
    }
    getAggregation() {
        const { props  } = this;
        let s;
        if (props.dock === "left") s = props.axesScales.x;
        else s = props.axesScales.y;
        switch(s.aggregate){
            case "sum":
                return "sum";
            default:
                return "count";
        }
    }
}

},{"./layout":"7w384","../constants":"eNr4m","../expr":"1G99Z","../scope":"k44Ul","../selection":"lp0UG","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"7w384":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Layout", ()=>Layout);
class Layout {
    constructor(props){
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
        throw "Not implemented";
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"lp0UG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "testForCollapseSelection", ()=>testForCollapseSelection);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
function testForCollapseSelection() {
    return `datum.${(0, _constants.FieldNames).Collapsed}`;
}

},{"./constants":"eNr4m","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"3jVb3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AggregateSquare", ()=>AggregateSquare);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
class AggregateSquare extends (0, _layout.Layout) {
    constructor(props){
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
        const { names , props  } = this;
        const { aggregation , globalScope , groupings , onBuild , parentScope  } = props;
        const { sizeSignals  } = parentScope;
        (0, _scope.addTransforms)(globalScope.data, Object.assign(Object.assign({}, this.getTransforms(aggregation, (0, _scope.getGroupBy)(groupings))), {
            as: [
                names.aggregateField
            ]
        }), {
            type: "extent",
            field: (0, _expr.safeFieldName)(names.aggregateField),
            signal: names.globalAggregateExtentSignal
        });
        const localAggregateMaxExtent = `datum[${JSON.stringify(names.aggregateField)}]`;
        const squareMaxSide = `min((${sizeSignals.layoutHeight}), (${sizeSignals.layoutWidth}))`;
        const squareMaxArea = `(${[
            squareMaxSide,
            squareMaxSide
        ].join(" * ")})`;
        const shrinkRatio = `((${localAggregateMaxExtent}) / (${names.globalAggregateExtentSignal}[1]))`;
        const squareArea = `(${[
            squareMaxArea,
            shrinkRatio
        ].join(" * ")})`;
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
            encodingRuleMap: {
                y: [
                    {
                        test: (0, _selection.testForCollapseSelection)(),
                        signal: offsets.y
                    }
                ],
                height: [
                    {
                        test: (0, _selection.testForCollapseSelection)(),
                        value: 0
                    }
                ]
            }
        };
    }
    getTransforms(aggregation, groupby) {
        const trans = {
            type: "joinaggregate",
            groupby: groupby.map((0, _expr.safeFieldName)),
            ops: [
                aggregation
            ]
        };
        if (aggregation === "sum") trans.fields = [
            this.props.sumBy.name
        ].map((0, _expr.safeFieldName));
        return trans;
    }
}

},{"./layout":"7w384","../expr":"1G99Z","../scope":"k44Ul","../selection":"lp0UG","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"cD88v":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bandScaleLinearSuffix", ()=>bandScaleLinearSuffix);
parcelHelpers.export(exports, "Band", ()=>Band);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _bin = require("../bin");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
var _signals = require("../signals");
var _scales = require("../scales");
const bandScaleLinearSuffix = "_linear";
class Band extends (0, _layout.Layout) {
    constructor(props){
        super(props);
        this.props = props;
        const p = this.prefix = `band_${this.id}`;
        this.names = {
            xScale: `scale_${p}_x`,
            yScale: `scale_${p}_y`,
            bandWidth: `${p}_bandwidth`,
            accumulative: `${p}_accumulative`
        };
        this.bin = (0, _bin.binnable)(this.prefix, props.globalScope.data.name, props.groupby, props.outerSignalExtents);
    }
    getGrouping() {
        return this.bin.fields;
    }
    build() {
        const { bin , names , props  } = this;
        const { globalScope , minBandWidth , orientation , parentScope , showAxes  } = props;
        const binField = bin.fields[0];
        if (bin.native === false) {
            (0, _scope.addSignals)(globalScope.scope, ...bin.signals);
            (0, _scope.addTransforms)(globalScope.data, ...bin.transforms);
            (0, _scope.addData)(globalScope.scope, bin.dataSequence);
        }
        //TODO don't add this, use existing dataset
        (0, _scope.addData)(globalScope.scope, {
            name: names.accumulative,
            source: bin.fullScaleDataname,
            transform: [
                {
                    type: "aggregate",
                    groupby: this.getGrouping().map((0, _expr.safeFieldName)),
                    ops: [
                        "count"
                    ]
                }, 
            ]
        });
        const horizontal = orientation === "horizontal";
        const minCellSignal = horizontal ? globalScope.signals.minCellHeight : globalScope.signals.minCellWidth;
        (0, _signals.modifySignal)(minCellSignal, "max", `length(data(${JSON.stringify(names.accumulative)})) * ${minBandWidth}`);
        (0, _scope.addSignals)(globalScope.scope, {
            name: names.bandWidth,
            update: `bandwidth(${JSON.stringify(horizontal ? names.yScale : names.xScale)})`
        });
        const scale = this.getScale(bin, horizontal);
        if (props.outerSignalExtents && bin.native === false) //add a linear scale for use by background image
        (0, _scope.addScales)(globalScope.scope, (0, _scales.linearScale)(scale.name + bandScaleLinearSuffix, {
            signal: bin.extentSignal
        }, scale.range, scale.reverse, false, false));
        let encodingRuleMap;
        if (!props.excludeEncodingRuleMap) encodingRuleMap = horizontal ? {
            x: [
                {
                    test: (0, _selection.testForCollapseSelection)(),
                    signal: parentScope.offsets.x
                }, 
            ],
            width: [
                {
                    test: (0, _selection.testForCollapseSelection)(),
                    value: 0
                }, 
            ]
        } : {
            y: [
                {
                    test: (0, _selection.testForCollapseSelection)(),
                    signal: (0, _scope.addOffsets)(parentScope.offsets.y, parentScope.offsets.h)
                }, 
            ],
            height: [
                {
                    test: (0, _selection.testForCollapseSelection)(),
                    value: 0
                }, 
            ]
        };
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
                    x: horizontal ? undefined : [
                        scale
                    ],
                    y: horizontal ? [
                        scale
                    ] : undefined
                }
            },
            encodingRuleMap
        };
    }
    getOffset(horizontal, binField) {
        const { names , props  } = this;
        const { parentScope  } = props;
        return {
            x: (0, _scope.addOffsets)(parentScope.offsets.x, horizontal ? "" : `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(binField)}])`),
            y: (0, _scope.addOffsets)(parentScope.offsets.y, horizontal ? `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(binField)}])` : ""),
            h: horizontal ? names.bandWidth : parentScope.offsets.h,
            w: horizontal ? parentScope.offsets.w : names.bandWidth
        };
    }
    getScale(bin, horizontal) {
        const { names  } = this;
        const { parentScope  } = this.props;
        const binField = (0, _expr.safeFieldName)(bin.fields[0]);
        let bandScale;
        if (horizontal) bandScale = {
            type: "band",
            name: names.yScale,
            range: [
                0,
                {
                    signal: parentScope.sizeSignals.layoutHeight
                }, 
            ],
            padding: 0.1,
            domain: {
                data: bin.domainDataName,
                field: binField,
                sort: true
            },
            reverse: true
        };
        else bandScale = {
            type: "band",
            name: names.xScale,
            range: [
                0,
                {
                    signal: parentScope.sizeSignals.layoutWidth
                }, 
            ],
            padding: 0.1,
            domain: {
                data: bin.domainDataName,
                field: binField,
                sort: true
            }
        };
        return bandScale;
    }
}

},{"./layout":"7w384","../bin":"1wZ7F","../expr":"1G99Z","../scope":"k44Ul","../selection":"lp0UG","../signals":"3piKm","../scales":"8b8up","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"1wZ7F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "binnable", ()=>binnable);
parcelHelpers.export(exports, "outerExtentSignal", ()=>outerExtentSignal);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _expr = require("./expr");
var _defaults = require("./defaults");
var _transforms = require("./transforms");
function binnable(prefix, domainDataName, discreteColumn, outerSignalExtents) {
    const { column , defaultBins , maxbins , maxbinsSignalDisplayName , maxbinsSignalName  } = discreteColumn;
    if (column.quantitative) {
        const field = `${prefix}_bin_${(0, _expr.exprSafeFieldName)(column.name)}`;
        const fieldEnd = `${field}_end`;
        const binSignal = `${field}_bins`;
        const dataExtentSignal = `${field}_bin_extent`;
        const outerSignal = `${field}_outer_extent`;
        domainDataName = `${field}_sequence`; //override the data name
        const extentTransform = (0, _transforms.dataExtent)(column, dataExtentSignal);
        let imageSignal;
        if (outerSignalExtents) imageSignal = outerExtentSignal(outerSignal, outerSignalExtents.min, outerSignalExtents.max, dataExtentSignal);
        const maxbinsSignal = {
            name: maxbinsSignalName,
            value: defaultBins,
            bind: {
                name: maxbinsSignalDisplayName,
                debounce: (0, _defaults.debounce),
                input: "range",
                min: 1,
                max: maxbins,
                step: 1
            }
        };
        const extentSignal = (imageSignal === null || imageSignal === void 0 ? void 0 : imageSignal.name) || dataExtentSignal;
        const binTransform = {
            type: "bin",
            field: (0, _expr.safeFieldName)(column.name),
            as: [
                field,
                fieldEnd, 
            ],
            signal: binSignal,
            extent: {
                signal: `[${extentSignal}[0], ${extentSignal}[1] + 1e-11]`
            },
            maxbins: {
                signal: maxbinsSignalName
            }
        };
        const dataSequence = {
            name: domainDataName,
            transform: [
                {
                    type: "sequence",
                    start: {
                        signal: `${binSignal}.start`
                    },
                    stop: {
                        signal: `${binSignal}.stop`
                    },
                    step: {
                        signal: `${binSignal}.step`
                    }
                },
                {
                    type: "formula",
                    expr: "datum.data",
                    as: field
                },
                {
                    type: "formula",
                    expr: `datum.data + ${binSignal}.step`,
                    as: fieldEnd
                },
                {
                    type: "window",
                    ops: [
                        "row_number"
                    ],
                    as: [
                        (0, _constants.FieldNames).Ordinal
                    ]
                },
                {
                    type: "formula",
                    expr: `datum.data === ${binSignal}.start`,
                    as: (0, _constants.FieldNames).First
                },
                {
                    type: "formula",
                    expr: `datum.data === ${binSignal}.stop - ${binSignal}.step`,
                    as: (0, _constants.FieldNames).Last
                }, 
            ]
        };
        const signals = [
            maxbinsSignal
        ];
        if (imageSignal) signals.push(imageSignal);
        const augmentBinnable = {
            discreteColumn,
            native: false,
            transforms: [
                extentTransform,
                binTransform
            ],
            fields: [
                field,
                fieldEnd
            ],
            binSignal,
            extentSignal,
            dataSequence,
            domainDataName,
            signals,
            fullScaleDataname: dataSequence.name
        };
        return augmentBinnable;
    } else {
        const nativeBinnable = {
            discreteColumn,
            native: true,
            fields: [
                column.name
            ],
            domainDataName,
            fullScaleDataname: domainDataName
        };
        return nativeBinnable;
    }
}
function outerExtentSignal(name, min, max, dataExtent) {
    return {
        name,
        update: `[min(${min}, ${dataExtent}[0]), max(${max}, ${dataExtent}[1])]`
    };
}

},{"./constants":"eNr4m","./expr":"1G99Z","./defaults":"5iedU","./transforms":"6fL08","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"6fL08":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "dataExtent", ()=>dataExtent);
var _expr = require("./expr");
function dataExtent(column, signal) {
    return {
        type: "extent",
        field: (0, _expr.safeFieldName)(column.name),
        signal
    };
}

},{"./expr":"1G99Z","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"3Xmem":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Cross", ()=>Cross);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _bin = require("../bin");
var _constants = require("../constants");
var _facetSearch = require("../facetSearch");
var _facetTitle = require("../facetTitle");
var _ordinal = require("../ordinal");
var _scope = require("../scope");
var _signals = require("../signals");
class Cross extends (0, _layout.Layout) {
    constructor(props){
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
        const { binX , binY , names , prefix , props  } = this;
        const { axisTextColor , colRowTitles , globalScope , parentScope  } = props;
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
            dim: "x",
            bin: binX,
            sortOrder: "ascending",
            size: parentScope.sizeSignals.layoutWidth,
            layout: parentScope.sizeSignals.layoutWidth,
            min: globalScope.signals.minCellWidth.name,
            out: globalScope.signals.plotWidthOut,
            offset: (0, _constants.SignalNames).FacetPaddingLeft,
            padding: (0, _constants.SignalNames).FacetPaddingLeft,
            dataOut: null,
            scaleName: null,
            position: null
        };
        const dy = {
            dim: "y",
            bin: binY,
            sortOrder: "ascending",
            size: parentScope.sizeSignals.layoutHeight,
            layout: parentScope.sizeSignals.layoutHeight,
            min: globalScope.signals.minCellHeight.name,
            out: globalScope.signals.plotHeightOut,
            offset: (0, _constants.SignalNames).FacetPaddingTop,
            padding: `(${(0, _constants.SignalNames).FacetPaddingTop} + ${(0, _constants.SignalNames).FacetPaddingBottom})`,
            dataOut: null,
            scaleName: null,
            position: null
        };
        const dimensions = [
            dx,
            dy
        ];
        dimensions.forEach((d)=>{
            const { bin , dim , padding , sortOrder  } = d;
            let data;
            let dataName;
            let countSignal;
            let scale;
            const titleSource = titles[dim];
            if (bin.native === false) {
                (0, _scope.addSignals)(globalScope.scope, ...bin.signals);
                (0, _scope.addTransforms)(globalScope.data, ...bin.transforms);
                (0, _scope.addData)(globalScope.scope, bin.dataSequence);
                (0, _scope.addTransforms)(bin.dataSequence, {
                    type: "formula",
                    expr: `indata(${JSON.stringify(globalScope.markDataName)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                    as: (0, _constants.FieldNames).Contains
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
                type: "formula",
                expr: (0, _facetSearch.serializeAsVegaExpression)(bin, (0, _constants.FieldNames).First, (0, _constants.FieldNames).Last),
                as: (0, _constants.FieldNames).FacetSearch
            }, {
                type: "formula",
                expr: (0, _facetSearch.displayBin)(bin),
                as: (0, _constants.FieldNames).FacetTitle
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
            (0, _signals.modifySignal)(d.out, "max", `((${size} + ${padding}) * ${count})`);
            d.position = this.dimensionOffset(d);
        });
        const groupRow = {
            type: "group",
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
            data: [
                {
                    name: names.searchUnion,
                    source: dx.dataOut.name,
                    transform: [
                        {
                            type: "formula",
                            expr: `[datum[${JSON.stringify((0, _constants.FieldNames).FacetSearch)}], merge(parent[${JSON.stringify((0, _constants.FieldNames).FacetSearch)}], { clause: '&&'})]`,
                            as: (0, _constants.FieldNames).FacetSearch
                        }, 
                    ]
                }, 
            ]
        };
        const groupCol = {
            style: "cell",
            name: prefix,
            type: "group",
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
        if (colRowTitles) (0, _facetTitle.addFacetColRowTitles)(globalScope.scope, titles.x, titles.y, sizeSignals, axisTextColor);
        return {
            facetScope: groupCol,
            offsets,
            sizeSignals,
            titles
        };
    }
    dimensionOffset(d) {
        const { names  } = this;
        return `${d.offset} + (scale(${JSON.stringify(d.scaleName)}, datum[${JSON.stringify(d.bin.fields[0])}]) - 1) * (${names.dimCellSize}_${d.dim} + ${d.padding})`;
    }
}

},{"./layout":"7w384","../bin":"1wZ7F","../constants":"eNr4m","../facetSearch":"2CVGj","../facetTitle":"6LisZ","../ordinal":"l8chc","../scope":"k44Ul","../signals":"3piKm","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"2CVGj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "displayBin", ()=>displayBin);
parcelHelpers.export(exports, "serializeAsVegaExpression", ()=>serializeAsVegaExpression);
function displayBin(bin) {
    const val = (index)=>`datum[${JSON.stringify(bin.fields[index])}]`;
    return bin.discreteColumn.column.quantitative ? `format(${val(0)}, '~r') + ' - ' + format(${val(1)}, '~r')` : val(0);
}
function obj(nameValues, clause) {
    if (clause) nameValues = [
        clause,
        ...nameValues
    ];
    return `{${nameValues.join()}}`;
}
function serializeAsVegaExpression(bin, firstFieldName, lastFieldName, clause) {
    if (bin.discreteColumn.column.quantitative) {
        const low = [
            `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
            "operator:'>='",
            `value:datum[${JSON.stringify(bin.fields[0])}]`, 
        ];
        const high = [
            "clause:'&&'",
            `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
            "operator:'<'",
            `value:datum[${JSON.stringify(bin.fields[1])}]`, 
        ];
        return obj([
            `expressions:[ datum[${JSON.stringify(firstFieldName)}] ? null : ${obj(low)}, datum[${JSON.stringify(lastFieldName)}] ? null : ${obj(high)}]`, 
        ], clause);
    } else {
        const exact = [
            `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
            "operator:'=='",
            `value:datum[${JSON.stringify(bin.fields[0])}]`, 
        ];
        return obj([
            `expressions:[${obj(exact)}]`, 
        ], clause);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"l8chc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createOrdinals", ()=>createOrdinals);
parcelHelpers.export(exports, "ordinalScale", ()=>ordinalScale);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _expr = require("./expr");
function createOrdinals(source, prefix, binFields, sortOrder) {
    const _binFields = binFields.map((0, _expr.safeFieldName));
    const dataName = `${prefix}_bin_order`;
    const data = {
        name: dataName,
        source,
        transform: [
            {
                type: "aggregate",
                groupby: _binFields
            },
            {
                type: "collect",
                sort: {
                    field: _binFields,
                    order: _binFields.map((f)=>sortOrder)
                }
            },
            {
                type: "window",
                ops: [
                    "row_number"
                ],
                as: [
                    (0, _constants.FieldNames).Ordinal
                ]
            }, 
        ]
    };
    return {
        data,
        scale: ordinalScale(dataName, `scale_${prefix}_order`, binFields)
    };
}
function ordinalScale(dataName, scaleName, binFields) {
    return {
        type: "ordinal",
        name: scaleName,
        domain: {
            data: dataName,
            field: (0, _expr.safeFieldName)(binFields[0])
        },
        range: {
            data: dataName,
            field: (0, _constants.FieldNames).Ordinal
        }
    };
}

},{"./constants":"eNr4m","./expr":"1G99Z","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"jRktq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Scatter", ()=>Scatter);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _constants = require("../constants");
var _defaults = require("../defaults");
var _expr = require("../expr");
var _scales = require("../scales");
var _scope = require("../scope");
var _selection = require("../selection");
var _transforms = require("../transforms");
var _bin = require("../bin");
class Scatter extends (0, _layout.Layout) {
    constructor(props){
        super(props);
        this.props = props;
        const p = this.prefix = `scatter_${this.id}`;
        this.names = {
            aggregateData: `data_${p}_aggregate`,
            markData: `data_${p}_mark`,
            xDataExtent: `${p}_xDataExtent`,
            yDataExtent: `${p}_yDataExtent`,
            xExtent: `${p}_xExtent`,
            yExtent: `${p}_yExtent`,
            sizeExtent: `${p}_sizeExtent`,
            sizeRange: `${p}_sizeRange`,
            sizeScale: `${p}_sizeScale`,
            xScale: `scale_${p}_x`,
            yScale: `scale_${p}_y`,
            zScale: `scale_${p}_z`
        };
    }
    build() {
        const { names , prefix , props  } = this;
        const { backgroundImageExtents , globalScope , parentScope , scatterPointScaleDisplay , showAxes , size , x , y , z , zGrounded  } = props;
        const qsize = size && size.quantitative && size;
        (0, _scope.addSignals)(globalScope.scope, {
            name: (0, _constants.SignalNames).PointScale,
            value: 5,
            bind: {
                name: scatterPointScaleDisplay,
                debounce: (0, _defaults.debounce),
                input: "range",
                min: 1,
                max: 10,
                step: 1
            }
        }, {
            name: (0, _constants.SignalNames).ZGrounded,
            value: false,
            bind: {
                name: zGrounded,
                input: "checkbox"
            }
        });
        if (backgroundImageExtents) {
            (0, _scope.addTransforms)(globalScope.data, (0, _transforms.dataExtent)(x, names.xDataExtent), (0, _transforms.dataExtent)(y, names.yDataExtent));
            const xSignal = (0, _bin.outerExtentSignal)(names.xExtent, backgroundImageExtents.left, backgroundImageExtents.right, names.xDataExtent);
            const ySignal = (0, _bin.outerExtentSignal)(names.yExtent, backgroundImageExtents.bottom, backgroundImageExtents.top, names.yDataExtent);
            (0, _scope.addSignals)(globalScope.scope, xSignal, ySignal);
        }
        if (qsize) {
            (0, _scope.addTransforms)(globalScope.data, {
                type: "extent",
                field: (0, _expr.safeFieldName)(qsize.name),
                signal: names.sizeExtent
            });
            (0, _scope.addScales)(globalScope.scope, {
                name: names.sizeScale,
                type: "linear",
                domain: [
                    0,
                    {
                        signal: `${names.sizeExtent}[1]`
                    }
                ],
                range: [
                    0,
                    {
                        signal: names.sizeRange
                    }
                ]
            });
            (0, _scope.addSignals)(globalScope.scope, {
                name: names.sizeRange,
                update: `min(${parentScope.sizeSignals.layoutHeight}, ${parentScope.sizeSignals.layoutWidth}) / ${(0, _defaults.scatterSizedDiv)}`
            });
        }
        (0, _scope.addData)(globalScope.scope, {
            name: names.markData,
            source: globalScope.markDataName,
            transform: [
                x,
                y,
                z
            ].map((c)=>{
                if (!c || !c.quantitative) return;
                const t = {
                    type: "filter",
                    expr: `isValid(datum[${JSON.stringify(c.name)}])`
                };
                return t;
            }).filter(Boolean)
        });
        globalScope.setMarkDataName(names.markData);
        const globalScales = {
            showAxes,
            scales: {}
        };
        const zValue = z ? `scale(${JSON.stringify(names.zScale)}, datum[${JSON.stringify(z.name)}])` : null;
        const sizeValueSignal = qsize ? `scale(${JSON.stringify(names.sizeScale)}, datum[${JSON.stringify(qsize.name)}]) * ${(0, _constants.SignalNames).PointScale}` : (0, _constants.SignalNames).PointScale;
        const update = Object.assign({
            height: [
                {
                    test: (0, _selection.testForCollapseSelection)(),
                    value: 0
                },
                {
                    signal: sizeValueSignal
                }, 
            ],
            width: {
                signal: sizeValueSignal
            }
        }, z && {
            z: [
                {
                    test: (0, _selection.testForCollapseSelection)(),
                    value: 0
                },
                {
                    signal: `${(0, _constants.SignalNames).ZGrounded} ? 0 : ${zValue}`
                }, 
            ],
            depth: [
                {
                    test: (0, _selection.testForCollapseSelection)(),
                    value: 0
                },
                {
                    signal: `${(0, _constants.SignalNames).ZGrounded} ? ${zValue} : ${sizeValueSignal}`
                }, 
            ]
        });
        const columnSignals = [
            {
                column: x,
                xyz: "x",
                scaleName: names.xScale,
                domain: backgroundImageExtents ? {
                    signal: names.xExtent
                } : {
                    data: globalScope.data.name,
                    field: (0, _expr.safeFieldName)(x.name)
                },
                reverse: false,
                signal: parentScope.sizeSignals.layoutWidth
            },
            {
                column: y,
                xyz: "y",
                scaleName: names.yScale,
                domain: backgroundImageExtents ? {
                    signal: names.yExtent
                } : {
                    data: globalScope.data.name,
                    field: (0, _expr.safeFieldName)(y.name)
                },
                reverse: true,
                signal: parentScope.sizeSignals.layoutHeight
            },
            {
                column: z,
                xyz: "z",
                scaleName: names.zScale,
                domain: {
                    data: globalScope.data.name,
                    field: z ? (0, _expr.safeFieldName)(z.name) : null
                },
                reverse: false,
                signal: `(${globalScope.zSize}) * ${(0, _constants.SignalNames).ZProportion}`
            }, 
        ];
        columnSignals.forEach((cs)=>{
            const { column , domain , reverse , scaleName , signal , xyz  } = cs;
            if (!column) return;
            let scale;
            if (column.quantitative) scale = (0, _scales.linearScale)(scaleName, domain, [
                0,
                {
                    signal
                }
            ], reverse, false, showAxes);
            else scale = (0, _scales.pointScale)(scaleName, globalScope.data.name, [
                0,
                {
                    signal
                }
            ], column.name, reverse);
            globalScales.scales[xyz] = [
                scale
            ];
        });
        const mark = {
            name: prefix,
            type: "rect",
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
                y: [
                    {
                        test: (0, _selection.testForCollapseSelection)(),
                        signal: (0, _scope.addOffsets)(parentScope.offsets.y, parentScope.sizeSignals.layoutHeight)
                    }, 
                ]
            }
        };
    }
}

},{"./layout":"7w384","../constants":"eNr4m","../defaults":"5iedU","../expr":"1G99Z","../scales":"8b8up","../scope":"k44Ul","../selection":"lp0UG","../transforms":"6fL08","../bin":"1wZ7F","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"425K1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Square", ()=>Square);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _constants = require("../constants");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
var _zBase = require("../zBase");
class Square extends (0, _layout.Layout) {
    constructor(props){
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
        const { names , prefix , props  } = this;
        const { fillDirection , globalScope , groupings , parentScope , collapseYHeight , showAxes , sortBy , z  } = props;
        const zScale = (0, _zBase.addZScale)(z, globalScope.zSize, globalScope.data.name, names.zScale);
        (0, _scope.addTransforms)(globalScope.data, Object.assign({
            type: "stack",
            groupby: (0, _scope.getGroupBy)(groupings).map((0, _expr.safeFieldName)),
            as: [
                names.stack0,
                names.stack1
            ]
        }, sortBy && {
            sort: {
                field: (0, _expr.safeFieldName)(sortBy.name),
                order: "ascending"
            }
        }));
        const { gap , levelSize , size , squaresPerBand  } = this.addSignals();
        const heightSignal = {
            signal: fillDirection === "down-right" ? size : levelSize
        };
        const mark = {
            name: prefix,
            type: "rect",
            from: {
                data: globalScope.markDataName
            },
            encode: {
                update: Object.assign({
                    height: collapseYHeight ? [
                        {
                            test: (0, _selection.testForCollapseSelection)(),
                            value: 0
                        },
                        heightSignal, 
                    ] : heightSignal,
                    width: {
                        signal: fillDirection === "down-right" ? levelSize : size
                    }
                }, z && {
                    z: {
                        value: 0
                    },
                    depth: [
                        {
                            test: (0, _selection.testForCollapseSelection)(),
                            value: 0
                        },
                        {
                            scale: names.zScale,
                            field: (0, _expr.safeFieldName)(z.name)
                        }, 
                    ]
                })
            }
        };
        (0, _scope.addMarks)(globalScope.markGroup, mark);
        const { tx , ty  } = this.transformXY(gap, levelSize, squaresPerBand);
        return Object.assign(Object.assign(Object.assign({}, z && {
            globalScales: {
                showAxes,
                scales: {
                    z: [
                        zScale
                    ]
                }
            }
        }), {
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
        }), collapseYHeight && {
            encodingRuleMap: {
                y: [
                    {
                        test: (0, _selection.testForCollapseSelection)(),
                        signal: parentScope.offsets.y
                    }, 
                ]
            }
        });
    }
    getBandWidth() {
        const { offsets  } = this.props.parentScope;
        switch(this.props.fillDirection){
            case "down-right":
                return offsets.h;
            default:
                return offsets.w;
        }
    }
    addSignals() {
        const { names , props  } = this;
        const { fillDirection , globalScope , groupings , parentScope  } = props;
        let { maxGroupedFillSize , maxGroupedUnits  } = props;
        if (!maxGroupedUnits) {
            if (groupings) {
                (0, _scope.addTransforms)(globalScope.data, {
                    type: "joinaggregate",
                    groupby: (0, _scope.getGroupBy)(groupings).map((0, _expr.safeFieldName)),
                    ops: [
                        "count"
                    ],
                    as: [
                        names.maxGroupField
                    ]
                }, {
                    type: "extent",
                    field: names.maxGroupField,
                    signal: names.maxGroupSignal
                });
                maxGroupedUnits = `(${names.maxGroupSignal}[1])`;
            } else maxGroupedUnits = `length(data(${JSON.stringify(globalScope.data.name)}))`;
        }
        if (!maxGroupedFillSize) maxGroupedFillSize = fillDirection === "down-right" ? parentScope.offsets.w : parentScope.offsets.h;
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
        const { names , prefix  } = this;
        const compartment = `(${names.bandWidth}) / ${squaresPerBand} * ((datum[${JSON.stringify(names.stack0)}]) % ${squaresPerBand})`;
        const level = `floor((datum[${JSON.stringify(names.stack0)}]) / ${squaresPerBand})`;
        const { fillDirection , parentScope  } = this.props;
        const tx = {
            type: "formula",
            expr: null,
            as: `${prefix}_${(0, _constants.FieldNames).OffsetX}`
        };
        const ty = {
            type: "formula",
            expr: null,
            as: `${prefix}_${(0, _constants.FieldNames).OffsetY}`
        };
        switch(fillDirection){
            case "down-right":
                tx.expr = `${level} * (${levelSize} + ${gap})`;
                ty.expr = compartment;
                break;
            case "right-up":
                tx.expr = compartment;
                ty.expr = `${parentScope.offsets.h} - ${levelSize} - ${level} * (${levelSize} + ${gap})`;
                break;
            case "right-down":
            default:
                tx.expr = compartment;
                ty.expr = `${level} * (${levelSize} + ${gap})`;
                break;
        }
        return {
            tx,
            ty
        };
    }
}

},{"./layout":"7w384","../constants":"eNr4m","../expr":"1G99Z","../scope":"k44Ul","../selection":"lp0UG","../zBase":"kSgN8","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"kSgN8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addZScale", ()=>addZScale);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _scales = require("./scales");
var _expr = require("./expr");
function addZScale(z, zSize, dataName, zScaleName) {
    if (z) {
        const zRange = [
            0,
            {
                signal: `(${zSize}) * ${(0, _constants.SignalNames).ZProportion}`
            }
        ];
        const scale = z.quantitative ? (0, _scales.linearScale)(zScaleName, {
            data: dataName,
            field: (0, _expr.safeFieldName)(z.name)
        }, zRange, false, true) : (0, _scales.pointScale)(zScaleName, dataName, zRange, z.name, false);
        return scale;
    }
}

},{"./constants":"eNr4m","./scales":"8b8up","./expr":"1G99Z","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"b0WQI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Stack", ()=>Stack);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
class Stack extends (0, _layout.Layout) {
    constructor(props){
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
            maxCount: `${p}_maxCount`,
            maxLevels: `${p}_maxLevels`,
            zScale: `${p}_zScale`
        };
    }
    build() {
        const { names , props  } = this;
        const { globalScope , groupings , parentScope , showAxes , sort  } = props;
        const { sizeSignals  } = parentScope;
        (0, _scope.addTransforms)(globalScope.data, {
            type: "joinaggregate",
            groupby: (0, _scope.getGroupBy)(groupings).map((0, _expr.safeFieldName)),
            ops: [
                "count"
            ],
            as: [
                names.count
            ]
        }, {
            type: "extent",
            field: names.count,
            signal: names.globalExtent
        }, Object.assign({
            type: "stack",
            groupby: (0, _scope.getGroupBy)(groupings).map((0, _expr.safeFieldName)),
            as: [
                names.stack0,
                names.stack1
            ]
        }, sort && {
            sort: {
                field: (0, _expr.safeFieldName)(sort.name),
                order: "ascending"
            }
        }));
        (0, _scope.addData)(globalScope.scope, {
            name: names.sequence,
            transform: [
                {
                    type: "sequence",
                    start: 1,
                    stop: {
                        signal: `sqrt(${names.globalExtent}[1])`
                    }
                },
                {
                    type: "formula",
                    expr: "datum.data * datum.data",
                    as: "squared"
                },
                {
                    type: "formula",
                    expr: `ceil(${names.globalExtent}[1] / datum.squared)`,
                    as: "maxlevels"
                },
                {
                    type: "formula",
                    expr: `(${names.size} - (datum.data - 1) * datum.data) / datum.data`,
                    as: "side"
                },
                {
                    type: "formula",
                    expr: "datum.side * datum.maxlevels + datum.maxlevels - 1",
                    as: "sidecubeheight"
                },
                {
                    type: "formula",
                    expr: `abs(${globalScope.zSize} - datum.sidecubeheight)`,
                    as: "heightmatch"
                },
                {
                    type: "collect",
                    sort: {
                        field: "heightmatch",
                        order: "ascending"
                    }
                },
                {
                    type: "window",
                    ops: [
                        "row_number"
                    ]
                },
                {
                    type: "filter",
                    expr: "datum.row_number === 1"
                }, 
            ]
        });
        (0, _scope.addSignals)(globalScope.scope, {
            name: names.size,
            update: `min((${sizeSignals.layoutHeight}), (${sizeSignals.layoutWidth}))`
        }, {
            name: names.squared,
            update: `data('${names.sequence}')[0].squared`
        }, {
            name: names.sides,
            update: `sqrt(${names.squared})`
        }, {
            name: names.cube,
            update: `(${names.size} - (${names.sides} - 1)) / ${names.sides}`
        }, {
            name: names.maxLevels,
            update: `data('${names.sequence}')[0].maxlevels`
        }, {
            name: names.maxCount,
            update: `${names.maxLevels} * ${names.squared}`
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
            type: "rect",
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
        const zScale = {
            type: "linear",
            name: names.zScale,
            domain: [
                0,
                {
                    signal: names.maxCount
                }, 
            ],
            range: [
                0,
                {
                    signal: `${names.maxLevels} * (${names.cube} + 1) - 1`
                }, 
            ],
            nice: false
        };
        return {
            offsets,
            mark,
            sizeSignals: {
                layoutHeight: names.size,
                layoutWidth: names.size
            },
            globalScales: {
                showAxes,
                scales: {
                    z: [
                        zScale
                    ]
                }
            },
            encodingRuleMap: {
                y: [
                    {
                        test: (0, _selection.testForCollapseSelection)(),
                        signal: parentScope.offsets.y
                    }
                ],
                z: [
                    {
                        test: (0, _selection.testForCollapseSelection)(),
                        value: 0
                    }
                ],
                depth: [
                    {
                        test: (0, _selection.testForCollapseSelection)(),
                        value: 0
                    }
                ],
                height: [
                    {
                        test: (0, _selection.testForCollapseSelection)(),
                        value: 0
                    }
                ]
            }
        };
    }
}

},{"./layout":"7w384","../expr":"1G99Z","../scope":"k44Ul","../selection":"lp0UG","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"1pzL4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Strip", ()=>Strip);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _constants = require("../constants");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
var _zBase = require("../zBase");
class Strip extends (0, _layout.Layout) {
    constructor(props){
        super(props);
        this.props = props;
        const p = this.prefix = `strip_${this.id}`;
        this.names = {
            firstField: `${p}${(0, _constants.FieldNames).First}`,
            lastField: `${p}${(0, _constants.FieldNames).Last}`,
            valueField: `${p}${(0, _constants.FieldNames).Value}`,
            scale: `scale_${p}`,
            zScale: `scale_${p}_z`
        };
    }
    build() {
        const { names , prefix , props  } = this;
        const { addPercentageScale , globalScope , groupings , orientation , showAxes , size , sort , sortOrder , parentScope , z  } = props;
        const zScale = (0, _zBase.addZScale)(z, globalScope.zSize, globalScope.data.name, names.zScale);
        const horizontal = orientation === "horizontal";
        const transform = [];
        if (sort) transform.push({
            type: "collect",
            sort: {
                field: (0, _expr.safeFieldName)(sort.name),
                order: sortOrder
            }
        });
        let stackField;
        if (size) {
            stackField = size.name;
            transform.push({
                type: "filter",
                expr: `datum[${JSON.stringify(size.name)}] > 0`
            });
        } else {
            stackField = names.valueField;
            transform.push({
                type: "formula",
                expr: "1",
                as: stackField
            });
        }
        const stackTransform = {
            type: "stack",
            field: (0, _expr.safeFieldName)(stackField),
            offset: "normalize",
            as: [
                names.firstField,
                names.lastField
            ]
        };
        if (groupings.length) stackTransform.groupby = (0, _scope.getGroupBy)(groupings).map((0, _expr.safeFieldName));
        transform.push(stackTransform);
        (0, _scope.addTransforms)(globalScope.data, ...transform);
        const span = [
            names.lastField,
            names.firstField
        ].map((f)=>`datum[${JSON.stringify(f)}]`).join(" - ");
        const offsets = {
            x: (0, _scope.addOffsets)(parentScope.offsets.x, horizontal ? `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.w})` : ""),
            y: (0, _scope.addOffsets)(parentScope.offsets.y, horizontal ? "" : `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.h})`),
            h: horizontal ? parentScope.offsets.h : `(${span}) * (${parentScope.offsets.h})`,
            w: horizontal ? `(${span}) * (${parentScope.offsets.w})` : parentScope.offsets.w
        };
        const mark = {
            name: prefix,
            type: "rect",
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
                    depth: [
                        {
                            test: (0, _selection.testForCollapseSelection)(),
                            value: 0
                        },
                        {
                            scale: names.zScale,
                            field: (0, _expr.safeFieldName)(z.name)
                        }, 
                    ]
                })
            }
        };
        (0, _scope.addMarks)(globalScope.markGroup, mark);
        let percentageScale;
        if (addPercentageScale) percentageScale = [
            {
                type: "linear",
                name: names.scale,
                domain: [
                    0,
                    100
                ],
                range: horizontal ? [
                    0,
                    {
                        signal: parentScope.sizeSignals.layoutWidth
                    }, 
                ] : [
                    {
                        signal: parentScope.sizeSignals.layoutHeight
                    },
                    0, 
                ]
            }
        ];
        return {
            globalScales: {
                showAxes,
                scales: {
                    x: horizontal ? percentageScale : undefined,
                    y: horizontal ? undefined : percentageScale,
                    z: zScale && [
                        zScale
                    ]
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

},{"./layout":"7w384","../constants":"eNr4m","../expr":"1G99Z","../scope":"k44Ul","../selection":"lp0UG","../zBase":"kSgN8","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"kPpw1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Treemap", ()=>Treemap);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _constants = require("../constants");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
var _zBase = require("../zBase");
class Treemap extends (0, _layout.Layout) {
    constructor(props){
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
        const { names , props  } = this;
        const { globalScope , parentScope , showAxes , treeMapMethod , z  } = props;
        const zScale = (0, _zBase.addZScale)(z, globalScope.zSize, globalScope.data.name, names.zScale);
        const offsets = {
            x: (0, _scope.addOffsets)(parentScope.offsets.x, fn(names.fieldX0)),
            y: (0, _scope.addOffsets)(parentScope.offsets.y, fn(names.fieldY0)),
            h: subtract(names.fieldY1, names.fieldY0),
            w: subtract(names.fieldX1, names.fieldX0)
        };
        const mark = this.transformedMark(offsets);
        (0, _scope.addSignals)(globalScope.scope, {
            name: (0, _constants.SignalNames).TreeMapMethod,
            value: "squarify",
            bind: {
                name: treeMapMethod,
                input: "select",
                options: [
                    "squarify",
                    "binary", 
                ]
            }
        });
        return Object.assign(Object.assign({}, z && {
            globalScales: {
                showAxes,
                scales: {
                    z: [
                        zScale
                    ]
                }
            }
        }), {
            mark,
            offsets,
            sizeSignals: {
                layoutHeight: null,
                layoutWidth: null
            }
        });
    }
    transformedMark(offsets) {
        const { names , props  } = this;
        const { globalScope , groupings , parentScope  } = props;
        if (groupings.length) {
            //treemap transform can't have it's boundary size grouped, so we need to facet the data.
            (0, _scope.addData)(globalScope.scope, {
                name: names.dataHeightWidth,
                source: globalScope.markDataName,
                transform: [
                    {
                        type: "formula",
                        expr: parentScope.offsets.h,
                        as: names.fieldHeight
                    },
                    {
                        type: "formula",
                        expr: parentScope.offsets.w,
                        as: names.fieldWidth
                    }, 
                ]
            });
            const treemapData = {
                name: names.dataFacetMark,
                source: names.dataFacet
            };
            const facets = {
                type: "group",
                from: {
                    facet: {
                        name: names.dataFacet,
                        data: names.dataHeightWidth,
                        groupby: (0, _scope.getGroupBy)(groupings).map((0, _expr.safeFieldName))
                    }
                },
                data: [
                    {
                        name: names.dataExtents,
                        source: names.dataFacet,
                        transform: [
                            {
                                type: "extent",
                                field: names.fieldHeight,
                                signal: names.heightExtent
                            },
                            {
                                type: "extent",
                                field: names.fieldWidth,
                                signal: names.widthExtent
                            }, 
                        ]
                    },
                    treemapData, 
                ]
            };
            globalScope.setMarkDataName(names.dataFacetMark);
            (0, _scope.addMarks)(globalScope.markGroup, facets);
            //assign new markgroup after adding mark to original group
            globalScope.setMarkGroup(facets);
            this.treemapTransform(treemapData, `${names.widthExtent}[0]`, `${names.heightExtent}[0]`);
            return this.addMark(offsets, facets, globalScope.markDataName);
        } else {
            this.treemapTransform(globalScope.data, parentScope.offsets.w, parentScope.offsets.h);
            return this.addMark(offsets, globalScope.markGroup, globalScope.markDataName);
        }
    }
    addMark(offsets, markParent, markDataName) {
        const { names , prefix , props  } = this;
        const { z  } = props;
        const mark = {
            name: prefix,
            type: "rect",
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
                    depth: [
                        {
                            test: (0, _selection.testForCollapseSelection)(),
                            value: 0
                        },
                        {
                            scale: names.zScale,
                            field: (0, _expr.safeFieldName)(z.name)
                        }, 
                    ]
                })
            }
        };
        (0, _scope.addMarks)(markParent, mark);
        return mark;
    }
    treemapTransform(treemapData, widthSignal, heightSignal) {
        const { names , props  } = this;
        const { group , size  } = props;
        (0, _scope.addTransforms)(treemapData, {
            type: "filter",
            expr: `datum[${JSON.stringify(size.name)}] > 0`
        }, {
            type: "nest",
            keys: [
                group && group.name || "__NONE__"
            ]
        }, {
            type: "treemap",
            field: (0, _expr.safeFieldName)(size.name),
            sort: {
                field: "value",
                order: "descending"
            },
            round: true,
            method: {
                signal: (0, _constants.SignalNames).TreeMapMethod
            },
            paddingInner: 1,
            paddingOuter: 0,
            size: [
                {
                    signal: widthSignal
                },
                {
                    signal: heightSignal
                }, 
            ],
            as: [
                names.fieldX0,
                names.fieldY0,
                names.fieldX1,
                names.fieldY1,
                names.fieldDepth,
                names.fieldChildren, 
            ]
        });
    }
}
function fn(n) {
    return `datum[${JSON.stringify(n)}]`;
}
function subtract(...fields) {
    return fields.map((n)=>fn(n)).join(" - ");
}

},{"./layout":"7w384","../constants":"eNr4m","../expr":"1G99Z","../scope":"k44Ul","../selection":"lp0UG","../zBase":"kSgN8","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"7BE6v":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Wrap", ()=>Wrap);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _bin = require("../bin");
var _constants = require("../constants");
var _expr = require("../expr");
var _facetSearch = require("../facetSearch");
var _facetTitle = require("../facetTitle");
var _ordinal = require("../ordinal");
var _scope = require("../scope");
var _signals = require("../signals");
class Wrap extends (0, _layout.Layout) {
    constructor(props){
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
        const { bin , names , prefix , props  } = this;
        const { axisTextColor , cellTitles , globalScope , parentScope  } = props;
        let ordinalBinData;
        if (bin.native === false) {
            (0, _scope.addSignals)(globalScope.scope, ...bin.signals);
            (0, _scope.addTransforms)(globalScope.data, ...bin.transforms);
            (0, _scope.addData)(globalScope.scope, bin.dataSequence);
            (0, _scope.addTransforms)(bin.dataSequence, {
                type: "formula",
                expr: `indata(${JSON.stringify(globalScope.data.name)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                as: (0, _constants.FieldNames).Contains
            });
            ordinalBinData = bin.dataSequence.name;
        } else {
            const ord = (0, _ordinal.createOrdinals)(globalScope.data.name, prefix, bin.fields, "ascending");
            (0, _scope.addData)(globalScope.scope, ord.data);
            ordinalBinData = ord.data.name;
        }
        (0, _scope.addData)(globalScope.scope, {
            name: names.rxc0,
            transform: [
                {
                    type: "sequence",
                    start: 1,
                    stop: {
                        signal: `ceil(sqrt(${names.dataLength})) + 1`
                    }
                },
                {
                    type: "formula",
                    expr: `ceil(${names.dataLength} / datum.data)`,
                    as: "complement"
                }, 
            ]
        }, {
            name: names.rxc1,
            source: names.rxc0,
            transform: [
                {
                    type: "project",
                    fields: [
                        "data"
                    ],
                    as: [
                        "cols"
                    ]
                }, 
            ]
        }, {
            name: names.rxc2,
            source: names.rxc0,
            transform: [
                {
                    type: "project",
                    fields: [
                        "complement"
                    ],
                    as: [
                        "cols"
                    ]
                }, 
            ]
        }, {
            name: names.rxc,
            source: [
                names.rxc1,
                names.rxc2
            ],
            transform: [
                {
                    type: "formula",
                    expr: `ceil(${names.dataLength} / datum.cols)`,
                    as: "rows"
                },
                {
                    type: "formula",
                    expr: `${parentScope.sizeSignals.layoutWidth} / datum.cols`,
                    as: "cellw"
                },
                {
                    type: "formula",
                    expr: `datum.cols === 1 ? max(datum.cellw, ${(0, _constants.SignalNames).MinCellWidth}) : datum.cellw`,
                    as: "cellw"
                },
                {
                    type: "formula",
                    expr: `${parentScope.sizeSignals.layoutHeight} / datum.rows`,
                    as: "cellh"
                },
                {
                    type: "formula",
                    expr: `datum.rows === 1 ? max(datum.cellh, ${(0, _constants.SignalNames).MinCellHeight}) : datum.cellh`,
                    as: "cellh"
                },
                {
                    type: "formula",
                    expr: `(datum.cellw >= ${(0, _constants.SignalNames).MinCellWidth} && datum.cellh >= ${(0, _constants.SignalNames).MinCellHeight})`,
                    as: "meetsmin"
                },
                {
                    type: "filter",
                    expr: "datum.meetsmin"
                },
                {
                    type: "formula",
                    expr: "datum.cellw / datum.cellh",
                    as: names.aspect
                },
                {
                    type: "formula",
                    expr: `abs(datum.${names.aspect} - ${names.target})`,
                    as: names.idealAspect
                },
                {
                    type: "formula",
                    expr: `${names.dataLength} / (datum.cols * datum.rows)`,
                    as: "coverage"
                },
                {
                    type: "collect",
                    sort: {
                        field: [
                            names.idealAspect,
                            "coverage"
                        ],
                        order: [
                            "ascending",
                            "descending"
                        ]
                    }
                }, 
            ]
        }, {
            name: names.rowColumnDataName,
            source: ordinalBinData,
            transform: [
                {
                    type: "formula",
                    expr: `floor((datum[${JSON.stringify((0, _constants.FieldNames).Ordinal)}] - 1) / ${names.colCount})`,
                    as: (0, _constants.FieldNames).WrapRow
                },
                {
                    type: "formula",
                    expr: `(datum[${JSON.stringify((0, _constants.FieldNames).Ordinal)}] - 1) % ${names.colCount}`,
                    as: (0, _constants.FieldNames).WrapCol
                },
                {
                    type: "formula",
                    expr: (0, _facetSearch.serializeAsVegaExpression)(bin, (0, _constants.FieldNames).First, (0, _constants.FieldNames).Last),
                    as: (0, _constants.FieldNames).FacetSearch
                },
                {
                    type: "formula",
                    expr: (0, _facetSearch.displayBin)(bin),
                    as: (0, _constants.FieldNames).FacetTitle
                }, 
            ]
        });
        const dataOut = {
            name: names.outputData,
            source: globalScope.data.name,
            transform: [
                {
                    type: "lookup",
                    from: names.rowColumnDataName,
                    key: (0, _expr.safeFieldName)(bin.fields[0]),
                    fields: [
                        bin.fields[0]
                    ].map((0, _expr.safeFieldName)),
                    values: [
                        (0, _constants.FieldNames).WrapRow,
                        (0, _constants.FieldNames).WrapCol
                    ]
                }, 
            ]
        };
        (0, _scope.addData)(globalScope.scope, dataOut);
        globalScope.setMarkDataName(names.outputData);
        (0, _scope.addSignals)(globalScope.scope, {
            name: names.minAspect,
            update: `${(0, _constants.SignalNames).MinCellWidth} / ${(0, _constants.SignalNames).MinCellHeight}`
        }, {
            name: names.target,
            update: `${names.minAspect} === 1 ? ${1.2} : ${names.minAspect}`
        }, {
            name: names.minArea,
            update: `${(0, _constants.SignalNames).MinCellWidth}*${(0, _constants.SignalNames).MinCellHeight}`
        }, {
            name: names.aspect,
            update: `${parentScope.sizeSignals.layoutWidth} / ${parentScope.sizeSignals.layoutHeight}`
        }, {
            name: names.dataLength,
            update: `data(${JSON.stringify(ordinalBinData)}).length`
        }, {
            name: names.growColCount,
            update: `max(floor(${parentScope.sizeSignals.layoutWidth} / ${(0, _constants.SignalNames).MinCellWidth}), 1)`
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
            update: `${names.fits} ? data(${JSON.stringify(names.rxc)})[0].cellh : ${(0, _constants.SignalNames).MinCellHeight}`
        });
        (0, _signals.modifySignal)(globalScope.signals.plotHeightOut, "max", `(${names.cellHeight} * ceil(${names.dataLength} / ${names.colCount}))`);
        (0, _signals.modifySignal)(globalScope.signals.plotWidthOut, "max", `(${names.cellWidth} * ${names.colCount})`);
        const signalH = [
            names.cellHeight,
            (0, _constants.SignalNames).FacetPaddingTop,
            (0, _constants.SignalNames).FacetPaddingBottom
        ].join(" - ");
        const signalW = [
            names.cellWidth,
            (0, _constants.SignalNames).FacetPaddingLeft
        ].join(" - ");
        const signalX = (0, _scope.addOffsets)(parentScope.offsets.x, `datum[${JSON.stringify((0, _constants.FieldNames).WrapCol)}] * ${names.cellWidth}`, (0, _constants.SignalNames).FacetPaddingLeft);
        const signalY = (0, _scope.addOffsets)(parentScope.offsets.y, `datum[${JSON.stringify((0, _constants.FieldNames).WrapRow)}] * ${names.cellHeight}`, (0, _constants.SignalNames).FacetPaddingTop);
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
            style: "cell",
            name: prefix,
            type: "group",
            from: {
                data: names.rowColumnDataName
            },
            encode: {
                update
            }
        };
        (0, _scope.addMarks)(globalScope.markGroup, group);
        const sizeSignals = {
            layoutHeight: `(${names.cellHeight} - ${(0, _constants.SignalNames).FacetPaddingTop} - ${(0, _constants.SignalNames).FacetPaddingBottom})`,
            layoutWidth: `(${names.cellWidth} - ${(0, _constants.SignalNames).FacetPaddingLeft})`,
            colCount: names.colCount,
            rowCount: `ceil(${names.dataLength} / ${names.colCount})`
        };
        if (cellTitles) (0, _facetTitle.addFacetCellTitles)(group, sizeSignals, axisTextColor);
        return {
            facetScope: group,
            sizeSignals,
            offsets
        };
    }
}

},{"./layout":"7w384","../bin":"1wZ7F","../constants":"eNr4m","../expr":"1G99Z","../facetSearch":"2CVGj","../facetTitle":"6LisZ","../ordinal":"l8chc","../scope":"k44Ul","../signals":"3piKm","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"3AjTc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getImageMark", ()=>getImageMark);
var _band = require("./layouts/band");
function getImageMark(backgroundImage, allGlobalScales) {
    const xScale = allGlobalScales.filter((s)=>s.scales.x)[0].scales.x[0];
    const yScale = allGlobalScales.filter((s)=>s.scales.y)[0].scales.y[0];
    const [xScaleName, yScaleName] = [
        xScale,
        yScale
    ].map((s)=>s.name + (xScale.type === "band" ? (0, _band.bandScaleLinearSuffix) : ""));
    return {
        type: "image",
        encode: {
            update: {
                url: {
                    value: backgroundImage.url
                },
                aspect: {
                    value: false
                },
                baseline: {
                    value: "bottom"
                },
                height: {
                    signal: getScaledSpan(yScaleName, backgroundImage.extents.bottom, backgroundImage.extents.top)
                },
                y: {
                    signal: getScaledValue(yScaleName, backgroundImage.extents.bottom)
                },
                width: {
                    signal: getScaledSpan(xScaleName, backgroundImage.extents.right, backgroundImage.extents.left)
                },
                x: {
                    signal: getScaledValue(xScaleName, backgroundImage.extents.left)
                }
            }
        }
    };
}
function getScaledSpan(scaleName, low, high) {
    return `abs(scale('${scaleName}', ${low}) - scale('${scaleName}', ${high}))`;
}
function getScaledValue(scaleName, value) {
    return `scale('${scaleName}', ${value})`;
}

},{"./layouts/band":"cD88v","@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"52vfF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}],"a5HkM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"7Mw3b"}]},["lKiud"], "lKiud", "parcelRequired43a")

