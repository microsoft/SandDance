// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
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
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
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
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jbvTk":[function(require,module,exports) {
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _es6 = require("../dist/es6");
const dataUrl = '/SandDance/sample-data/demovote.tsv';
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
const container = document.getElementById('vis');
const select = document.getElementById('select-spec');
const insightTextarea = document.getElementById('insight-json');
const insightUdateButton = document.getElementById('insight-update');
const vegaOutput = document.getElementById('vega-spec');
const vegaCopy = document.getElementById('vega-spec-copy');
select.onchange = ()=>selected(select.selectedIndex)
;
insightUdateButton.onclick = ()=>{
    const insight = JSON.parse(insightTextarea.value);
    render(insight);
};
vegaCopy.onclick = ()=>{
    vegaOutput.select();
    document.execCommand('copy');
    vegaCopy.innerText = 'copied';
    setTimeout(()=>{
        vegaCopy.innerText = 'copy';
    }, 2000);
};
function selected(selectedIndex) {
    container.innerHTML = `loading spec...`;
    fetchInsight(select.options[selectedIndex].value);
}
function fetchInsight(specFilename) {
    fetch(`specs/${specFilename}`).then((response)=>response.json()
    ).then((insight)=>render(insight)
    ).catch((error)=>container.innerText = error
    );
}
function render(insight) {
    insightTextarea.value = JSON.stringify(insight, null, 2);
    const specColumns = _es6.getSpecColumns(insight, columns);
    const context = {
        specColumns,
        insight,
        specViewOptions
    };
    const specResult = _es6.build(context, data);
    if (specResult.errors) container.innerText = specResult.errors.map((error)=>error
    ).join('\n');
    else renderVegaSpec(specResult.vegaSpec);
}
function renderVegaSpec(vegaSpec) {
    const runtime = vega.parse(vegaSpec);
    const vegaView = new vega.View(runtime, {
        container
    });
    vegaView.runAsync().catch((e)=>container.innerHTML = `error ${e}`
    ).then(()=>{
        const d0 = vegaSpec.data[0];
        delete d0.values;
        d0.format = {
            parse: 'auto',
            type: 'tsv'
        };
        d0.url = 'https://microsoft.github.io' + dataUrl;
        vegaOutput.value = JSON.stringify(vegaSpec, null, 2);
    });
}
container.innerHTML = `loading ${dataUrl}...`;
vega.loader().load(dataUrl).then((tsv_data)=>{
    data = vega.read(tsv_data, {
        type: 'tsv',
        parse: 'auto'
    });
    columns = _es6.getColumnsFromData(vega.inferTypes, data);
    selected(0);
});

},{"../dist/es6":"euhvD"}],"euhvD":[function(require,module,exports) {
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

},{"./build":"1PpvK","./constants":"1t33I","./inference":"1TgWB","./interfaces":"6lM8D","./types":"jrCG9","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"1PpvK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "build", ()=>build
);
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
        specColumns.z
    ];
    _inference.inferAll(columns, currData);
    const specBuilderProps = _charts.getSpecBuilderPropsForChart(specContext);
    const specBuilder = new _specBuilder.SpecBuilder(specBuilderProps, specContext);
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

},{"./charts":"3jPAH","./inference":"1TgWB","./specBuilder":"kpKNP","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"3jPAH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getSpecBuilderPropsForChart", ()=>getSpecBuilderPropsForChart
);
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
    barchart: _barchartVDefault.default,
    barchartH: _barchartHDefault.default,
    barchartV: _barchartVDefault.default,
    density: _densityDefault.default,
    grid: _gridDefault.default,
    scatterplot: _scatterplotDefault.default,
    stacks: _stacksDefault.default,
    strips: _stripsDefault.default,
    treemap: _treemapDefault.default
};
function getSpecBuilderPropsForChart(specContext) {
    const { insight , specColumns , specViewOptions  } = specContext;
    const fn = map[insight.chart];
    if (fn) {
        const props = fn(specContext);
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
            const { facetLayout , layoutPair  } = _facetLayout.getFacetLayout(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn, specViewOptions.colors.axisText);
            props.layouts.unshift(layoutPair);
            props.facetLayout = facetLayout;
        }
        return props;
    }
}

},{"./barchartH":"iOeTp","./barchartV":"h9IPg","./density":"je2Nv","./grid":"kiFt0","./scatterplot":"7abiv","./stacks":"cBy3D","./strips":"ghx3s","./treemap":"dLaAN","../facetLayout":"2Gjfb","../constants":"1t33I","../defaults":"3ylwt","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"iOeTp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("../constants");
var _defaults = require("../defaults");
var _size = require("../size");
exports.default = function(specContext) {
    const { insight , specColumns , specViewOptions  } = specContext;
    const { language  } = specViewOptions;
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
    const layouts = [
        {
            layoutType: 'Band',
            props: bandProps
        }
    ];
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
            layoutType: 'Strip',
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
            layoutType: 'AggregateContainer',
            props: aggProps
        });
        switch(insight.totalStyle){
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
                        layoutType: 'Treemap',
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
                        layoutType: 'Strip',
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
                        layoutType: 'Strip',
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
                        layoutType: 'Square',
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
                    role: 'y',
                    binnable: true,
                    axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [
                        _constants.SignalNames.YBins
                    ]
                },
                {
                    role: 'z',
                    axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                },
                {
                    role: 'size',
                    allowNone: _size.allowNoneForSize,
                    excludeCategoric: true,
                    signals: [
                        _constants.SignalNames.TreeMapMethod
                    ]
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetVBins
                    ]
                }
            ]
        }
    };
};

},{"../constants":"1t33I","../defaults":"3ylwt","../size":"akJ0W","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"1t33I":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FieldNames", ()=>FieldNames
);
parcelHelpers.export(exports, "ScaleNames", ()=>ScaleNames
);
parcelHelpers.export(exports, "SignalNames", ()=>SignalNames
);
parcelHelpers.export(exports, "Other", ()=>Other
);
parcelHelpers.export(exports, "ColorScaleNone", ()=>ColorScaleNone
);
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
const ScaleNames = {
    Color: 'scale_color',
    X: 'scale_x',
    Y: 'scale_y',
    Z: 'scale_z'
};
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
};
const Other = '__Other';
const ColorScaleNone = 'none';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"jMF8S":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule') return;
        // Skip duplicate re-exports when they have the same value.
        if (key in dest && dest[key] === source[key]) return;
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

},{}],"3ylwt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defaultBins", ()=>defaultBins
);
parcelHelpers.export(exports, "maxbins", ()=>maxbins
);
parcelHelpers.export(exports, "minBarBandWidth", ()=>minBarBandWidth
);
parcelHelpers.export(exports, "minFacetWidth", ()=>minFacetWidth
);
parcelHelpers.export(exports, "minFacetHeight", ()=>minFacetHeight
);
parcelHelpers.export(exports, "facetPaddingLeft", ()=>facetPaddingLeft
);
parcelHelpers.export(exports, "facetPaddingTop", ()=>facetPaddingTop
);
parcelHelpers.export(exports, "facetPaddingBottom", ()=>facetPaddingBottom
);
parcelHelpers.export(exports, "facetPaddingRight", ()=>facetPaddingRight
);
parcelHelpers.export(exports, "axesLabelLimit", ()=>axesLabelLimit
);
parcelHelpers.export(exports, "axesTitleLimit", ()=>axesTitleLimit
);
parcelHelpers.export(exports, "axesTitlePaddingX", ()=>axesTitlePaddingX
);
parcelHelpers.export(exports, "axesTitlePaddingY", ()=>axesTitlePaddingY
);
parcelHelpers.export(exports, "axesTitlePaddingFacetX", ()=>axesTitlePaddingFacetX
);
parcelHelpers.export(exports, "axesTitlePaddingFacetY", ()=>axesTitlePaddingFacetY
);
parcelHelpers.export(exports, "axesOffsetX", ()=>axesOffsetX
);
parcelHelpers.export(exports, "axesOffsetY", ()=>axesOffsetY
);
parcelHelpers.export(exports, "scatterSizedMin", ()=>scatterSizedMin
);
parcelHelpers.export(exports, "scatterSizedDiv", ()=>scatterSizedDiv
);
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"akJ0W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "allowNoneForSize", ()=>allowNoneForSize
);
function allowNoneForSize(specContext) {
    switch(specContext.insight.totalStyle){
        case 'sum-strip':
        case 'sum-strip-percent':
        case 'sum-treemap':
            return false;
        default:
            //if totalStyle is blank, count is assumed
            return true;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"h9IPg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("../constants");
var _defaults = require("../defaults");
var _size = require("../size");
exports.default = function(specContext) {
    const { insight , specColumns , specViewOptions  } = specContext;
    const { language  } = specViewOptions;
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
    const layouts = [
        {
            layoutType: 'Band',
            props: bandProps
        }
    ];
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
            layoutType: 'Strip',
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
            layoutType: 'AggregateContainer',
            props: aggProps
        });
        switch(insight.totalStyle){
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
                        layoutType: 'Treemap',
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
                        layoutType: 'Strip',
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
                        layoutType: 'Strip',
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
                        layoutType: 'Square',
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
                    role: 'x',
                    binnable: true,
                    axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [
                        _constants.SignalNames.XBins
                    ]
                },
                {
                    role: 'z',
                    axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                },
                {
                    role: 'size',
                    allowNone: _size.allowNoneForSize,
                    excludeCategoric: true,
                    signals: [
                        _constants.SignalNames.TreeMapMethod
                    ]
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetVBins
                    ]
                }
            ]
        }
    };
};

},{"../constants":"1t33I","../defaults":"3ylwt","../size":"akJ0W","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"je2Nv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("../constants");
var _defaults = require("../defaults");
var _size = require("../size");
exports.default = function(specContext) {
    const { insight , specColumns , specViewOptions  } = specContext;
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
    const layouts = [
        {
            layoutType: 'Band',
            props: vBandProps
        },
        {
            layoutType: 'Band',
            props: hBandProps
        },
        {
            layoutType: 'AggregateSquare',
            props: aggProps
        }
    ];
    switch(insight.totalStyle){
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
                    layoutType: 'Treemap',
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
                    layoutType: 'Strip',
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
                    layoutType: 'Strip',
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
                aggProps.onBuild = (aggMaxExtent, aggMaxExtentScaled)=>{
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
        axisScales,
        layouts,
        specCapabilities: {
            countsAndSums: true,
            roles: [
                {
                    role: 'x',
                    binnable: true,
                    axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [
                        _constants.SignalNames.XBins
                    ]
                },
                {
                    role: 'y',
                    binnable: true,
                    axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [
                        _constants.SignalNames.YBins
                    ]
                },
                {
                    role: 'z',
                    axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                },
                {
                    role: 'size',
                    allowNone: _size.allowNoneForSize,
                    excludeCategoric: true,
                    signals: [
                        _constants.SignalNames.TreeMapMethod
                    ]
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetVBins
                    ]
                }
            ]
        }
    };
};

},{"../constants":"1t33I","../defaults":"3ylwt","../size":"akJ0W","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"kiFt0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
exports.default = function(specContext) {
    const { specColumns  } = specContext;
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
        layouts: [
            {
                layoutType: 'Square',
                props: squareProps
            }
        ],
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: 'z',
                    axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetVBins
                    ]
                }
            ]
        }
    };
};

},{"../constants":"1t33I","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"7abiv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
exports.default = function(specContext) {
    const { specColumns , specViewOptions  } = specContext;
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
        layouts: [
            {
                layoutType: 'Scatter',
                props: scatterProps
            }
        ],
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: 'x',
                    axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact'
                },
                {
                    role: 'y',
                    axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact'
                },
                {
                    role: 'z',
                    axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'size',
                    excludeCategoric: true,
                    allowNone: true
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetVBins
                    ]
                }
            ],
            signals: [
                _constants.SignalNames.PointScale,
                _constants.SignalNames.ZGrounded
            ]
        }
    };
};

},{"../constants":"1t33I","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"cBy3D":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _defaults = require("../defaults");
var _constants = require("../constants");
exports.default = function(specContext) {
    const { specColumns , specViewOptions  } = specContext;
    const axisScales = {
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
        layouts: [
            {
                layoutType: 'Band',
                props: vBandProps
            },
            {
                layoutType: 'Band',
                props: hBandProps
            },
            {
                layoutType: 'Stack',
                props: stackProps
            }
        ],
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: 'x',
                    binnable: true,
                    axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [
                        _constants.SignalNames.XBins
                    ]
                },
                {
                    role: 'y',
                    binnable: true,
                    axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [
                        _constants.SignalNames.YBins
                    ]
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetVBins
                    ]
                }
            ]
        }
    };
};

},{"../defaults":"3ylwt","../constants":"1t33I","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"ghx3s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
exports.default = function(specContext) {
    const { specColumns  } = specContext;
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
            layoutType: 'AggregateContainer',
            props
        });
    }
    layouts.push({
        layoutType: 'Strip',
        props: stripProps
    });
    return {
        axisScales,
        layouts,
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: 'size',
                    allowNone: true,
                    excludeCategoric: true
                },
                {
                    role: 'z',
                    axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'sort',
                    allowNone: true
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetVBins
                    ]
                }
            ]
        }
    };
};

},{"../constants":"1t33I","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"dLaAN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
exports.default = function(specContext) {
    const { specColumns , specViewOptions  } = specContext;
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
            layoutType: 'AggregateContainer',
            props
        });
    }
    layouts.push({
        layoutType: 'Treemap',
        props: treemapProps
    });
    return {
        axisScales,
        layouts,
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: 'size',
                    excludeCategoric: true
                },
                {
                    role: 'group',
                    allowNone: true
                },
                {
                    role: 'z',
                    axisSelection: specColumns.z && specColumns.z.quantitative ? 'range' : 'exact',
                    allowNone: true
                },
                {
                    role: 'color',
                    allowNone: true
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        _constants.SignalNames.FacetVBins
                    ]
                }
            ],
            signals: [
                _constants.SignalNames.TreeMapMethod
            ]
        }
    };
};

},{"../constants":"1t33I","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"2Gjfb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getFacetLayout", ()=>getFacetLayout
);
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
        case 'cross':
            {
                const props = {
                    axisTextColor,
                    colRowTitles: true,
                    groupbyX: groupby,
                    groupbyY: facetVColumn
                };
                layoutPair = {
                    layoutType: 'Cross',
                    props
                };
                facetPadding = {
                    bottom: _defaults.facetPaddingBottom,
                    left: _defaults.facetPaddingLeft,
                    top: 0
                };
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
                    layoutType: 'Wrap',
                    props
                };
                facetPadding = {
                    bottom: _defaults.facetPaddingBottom,
                    left: _defaults.facetPaddingLeft,
                    top: _defaults.facetPaddingTop
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

},{"./defaults":"3ylwt","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"1TgWB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Derive column metadata from the data array.
 * @param data Array of data objects.
 */ parcelHelpers.export(exports, "getColumnsFromData", ()=>getColumnsFromData
);
/**
 * Get columns associated with each Insight role.
 * @param insight Insight to specify column roles.
 * @param columns Array of Columns inferred from the data.
 */ parcelHelpers.export(exports, "getSpecColumns", ()=>getSpecColumns
);
/**
 * Populate columns with type inferences and stats.
 * @param columns Array of columns.
 * @param data Array of data objects.
 */ parcelHelpers.export(exports, "inferAll", ()=>inferAll
);
parcelHelpers.export(exports, "getStats", ()=>getStats
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _d3Color = require("d3-color");
function isColor(cssColorSpecifier) {
    return !!_d3Color.color(cssColorSpecifier);
}
function isQuantitative(column) {
    return column.type === 'number' || column.type === 'integer';
}
function getColumnsFromData(inferTypesFn, data, columnTypes) {
    const sample = data[0];
    const fields = sample ? Object.keys(sample) : [];
    const inferences = Object.assign(Object.assign({
    }, inferTypesFn(data, fields)), columnTypes);
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
        return columns.filter((c)=>c.name === name
        )[0];
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
            if (typeof column.quantitative !== 'boolean') column.quantitative = isQuantitative(column);
            if (!column.stats) column.stats = getStats(data, column);
            if (column.type === 'string' && typeof column.isColorData !== 'boolean') checkIsColorData(data, column);
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
    const distinctMap = {
    };
    const stats = {
        distinctValueCount: null,
        max: null,
        mean: null,
        min: null
    };
    let sum = 0;
    for(let i = 0; i < data.length; i++){
        let row = data[i];
        let value = row[column.name];
        distinctMap[value] = true;
        if (stats.max === null || value > stats.max) stats.max = value;
        if (stats.min === null || value < stats.min) stats.min = value;
        let num = +value;
        if (!isNaN(num)) sum += num;
        if (column.type === 'string' && !stats.hasColorData && isColor(value)) stats.hasColorData = true;
    }
    if (column.quantitative) {
        stats.mean = data.length > 0 && sum / data.length;
        stats.hasNegative = detectNegative(column, data);
        if (column.type === 'integer') stats.isSequential = detectSequentialColumn(column, data);
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
    let colname = column.name;
    for(let i = 1; i < data.length; i++){
        if (data[i][colname] !== data[i - 1][colname] + 1) return false;
    }
    return true;
}

},{"d3-color":"9ZVln","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"9ZVln":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "color", ()=>_colorJsDefault.default
);
parcelHelpers.export(exports, "rgb", ()=>_colorJs.rgb
);
parcelHelpers.export(exports, "hsl", ()=>_colorJs.hsl
);
parcelHelpers.export(exports, "lab", ()=>_labJsDefault.default
);
parcelHelpers.export(exports, "hcl", ()=>_labJs.hcl
);
parcelHelpers.export(exports, "lch", ()=>_labJs.lch
);
parcelHelpers.export(exports, "gray", ()=>_labJs.gray
);
parcelHelpers.export(exports, "cubehelix", ()=>_cubehelixJsDefault.default
);
var _colorJs = require("./color.js");
var _colorJsDefault = parcelHelpers.interopDefault(_colorJs);
var _labJs = require("./lab.js");
var _labJsDefault = parcelHelpers.interopDefault(_labJs);
var _cubehelixJs = require("./cubehelix.js");
var _cubehelixJsDefault = parcelHelpers.interopDefault(_cubehelixJs);

},{"./color.js":"WkkeJ","./lab.js":"ilz7W","./cubehelix.js":"klNYx","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"WkkeJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Color", ()=>Color
);
parcelHelpers.export(exports, "darker", ()=>darker
);
parcelHelpers.export(exports, "brighter", ()=>brighter
);
parcelHelpers.export(exports, "rgbConvert", ()=>rgbConvert
);
parcelHelpers.export(exports, "rgb", ()=>rgb
);
parcelHelpers.export(exports, "Rgb", ()=>Rgb
);
parcelHelpers.export(exports, "hslConvert", ()=>hslConvert
);
parcelHelpers.export(exports, "hsl", ()=>hsl
);
var _defineJs = require("./define.js");
var _defineJsDefault = parcelHelpers.interopDefault(_defineJs);
function Color() {
}
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
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
};
_defineJsDefault.default(Color, color, {
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
     : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) // #f00
     : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) // #ff000000
     : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) // #f000
     : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
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
    return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
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
_defineJsDefault.default(Rgb, rgb, _defineJs.extend(Color, {
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
_defineJsDefault.default(Hsl, hsl, _defineJs.extend(Color, {
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

},{"./define.js":"jjeTm","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"jjeTm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "extend", ()=>extend
);
exports.default = function(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
};
function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for(var key in definition)prototype[key] = definition[key];
    return prototype;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"ilz7W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "gray", ()=>gray
);
parcelHelpers.export(exports, "Lab", ()=>Lab
);
parcelHelpers.export(exports, "lch", ()=>lch
);
parcelHelpers.export(exports, "hcl", ()=>hcl
);
parcelHelpers.export(exports, "Hcl", ()=>Hcl
);
var _defineJs = require("./define.js");
var _defineJsDefault = parcelHelpers.interopDefault(_defineJs);
var _colorJs = require("./color.js");
var _mathJs = require("./math.js");
// https://observablehq.com/@mbostock/lab-and-rgb
var K = 18, Xn = 0.96422, Yn = 1, Zn = 0.82521, t0 = 4 / 29, t1 = 6 / 29, t2 = 3 * t1 * t1, t3 = t1 * t1 * t1;
function labConvert(o) {
    if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
    if (o instanceof Hcl) return hcl2lab(o);
    if (!(o instanceof _colorJs.Rgb)) o = _colorJs.rgbConvert(o);
    var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
    if (r === g && g === b) x = z = y;
    else {
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
exports.default = lab;
function Lab(l, a, b, opacity) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
    this.opacity = +opacity;
}
_defineJsDefault.default(Lab, lab, _defineJs.extend(_colorJs.Color, {
    brighter: function(k) {
        return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    darker: function(k) {
        return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    rgb: function() {
        var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z = isNaN(this.b) ? y : y - this.b / 200;
        x = Xn * lab2xyz(x);
        y = Yn * lab2xyz(y);
        z = Zn * lab2xyz(z);
        return new _colorJs.Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.033454 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
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
    var h = Math.atan2(o.b, o.a) * _mathJs.rad2deg;
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
    var h = o.h * _mathJs.deg2rad;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
_defineJsDefault.default(Hcl, hcl, _defineJs.extend(_colorJs.Color, {
    brighter: function(k) {
        return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
    },
    darker: function(k) {
        return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
    },
    rgb: function() {
        return hcl2lab(this).rgb();
    }
}));

},{"./define.js":"jjeTm","./color.js":"WkkeJ","./math.js":"fZjuB","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"fZjuB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "deg2rad", ()=>deg2rad
);
parcelHelpers.export(exports, "rad2deg", ()=>rad2deg
);
var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"klNYx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Cubehelix", ()=>Cubehelix
);
var _defineJs = require("./define.js");
var _defineJsDefault = parcelHelpers.interopDefault(_defineJs);
var _colorJs = require("./color.js");
var _mathJs = require("./math.js");
var A = -0.14861, B = 1.78277, C = -0.29227, D = -0.90649, E = 1.97294, ED = E * D, EB = E * B, BC_DA = B * C - D * A;
function cubehelixConvert(o) {
    if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof _colorJs.Rgb)) o = _colorJs.rgbConvert(o);
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * _mathJs.rad2deg - 120 : NaN;
    return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity) {
    return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
exports.default = cubehelix;
function Cubehelix(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
}
_defineJsDefault.default(Cubehelix, cubehelix, _defineJs.extend(_colorJs.Color, {
    brighter: function(k) {
        k = k == null ? _colorJs.brighter : Math.pow(_colorJs.brighter, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? _colorJs.darker : Math.pow(_colorJs.darker, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
        var h = isNaN(this.h) ? 0 : (this.h + 120) * _mathJs.deg2rad, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
        return new _colorJs.Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
    }
}));

},{"./define.js":"jjeTm","./color.js":"WkkeJ","./math.js":"fZjuB","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"kpKNP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SpecBuilder", ()=>SpecBuilder
);
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
class SpecBuilder {
    constructor(props, specContext){
        this.props = props;
        this.specContext = specContext;
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
        const { specContext: specContext1  } = this;
        const { specCapabilities  } = this.props;
        const { roles  } = specCapabilities;
        const required = roles.filter((r)=>{
            switch(typeof r.allowNone){
                case 'boolean':
                    return !r.allowNone;
                case 'undefined':
                    return true;
                case 'function':
                    return !r.allowNone(specContext1);
            }
        });
        const numeric = roles.filter((r)=>r.excludeCategoric
        );
        const errors = required.map((r)=>{
            if (specContext1.specColumns[r.role]) return null;
            else return `Field ${r.role} is required.`;
        }).concat(numeric.map((r)=>{
            if (specContext1.specColumns[r.role] && !specContext1.specColumns[r.role].quantitative) return `Field ${r.role} must be quantitative.`;
            else return null;
        })).filter(Boolean);
        return errors;
    }
    build() {
        const { specContext: specContext1  } = this;
        const { facetLayout , specCapabilities  } = this.props;
        const { insight , specColumns , specViewOptions  } = specContext1;
        const dataName = 'data_source';
        const { vegaSpec , groupMark  } = this.initSpec(dataName);
        const { topColorField , colorDataName  } = _color.addColor({
            scope: vegaSpec,
            dataName,
            specContext: specContext1,
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
        if (facetLayout) {
            _scope.addSignals(vegaSpec, {
                name: _constants.SignalNames.FacetPaddingBottom,
                update: `${facetLayout.facetPadding.bottom}`
            }, {
                name: _constants.SignalNames.FacetPaddingLeft,
                update: `${facetLayout.facetPadding.left}`
            }, {
                name: _constants.SignalNames.FacetPaddingTop,
                update: `${facetLayout.facetPadding.top}`
            });
            this.globalSignals.plotOffsetTop.update = `${facetLayout.plotPadding.y}`;
            this.globalSignals.plotOffsetRight.update = `${facetLayout.plotPadding.x}`;
        }
        const { firstScope , finalScope , specResult , allGlobalScales , allEncodingRules  } = this.iterateLayouts(globalScope, (i, innerScope)=>{
            if (facetLayout && i === 0) globalScope.zSize = innerScope.offsets.h;
        });
        if (specResult) return specResult;
        if (allGlobalScales.length > 0) {
            const plotHeightOut = this.globalSignals.plotHeightOut.name;
            const plotWidthOut = this.globalSignals.plotWidthOut.name;
            const colTitleScale = {
                type: 'linear',
                name: 'scale_facet_col_title',
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
                type: 'linear',
                name: 'scale_facet_row_title',
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
            let axesScopes = facetLayout ? _facetTitle.addFacetAxesGroupMarks({
                globalScope: globalScope.scope,
                plotScope: groupMark,
                facetScope: firstScope,
                colTitleScale,
                rowTitleScale,
                colSeqName: 'data_FacetCellColTitles',
                rowSeqName: 'data_FacetCellRowTitles'
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
            _axes.addGlobalAxes({
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
                axesScopes,
                faceted: !!facetLayout,
                view: insight.view
            });
        }
        //add mark to the final scope
        if (finalScope.mark) {
            const { update  } = finalScope.mark.encode;
            const outputDataName = 'output';
            finalScope.mark.from.data = outputDataName;
            _scope.addData(globalScope.markGroup, {
                name: outputDataName,
                source: globalScope.markDataName,
                transform: [
                    {
                        type: 'formula',
                        expr: finalScope.offsets.x,
                        as: _constants.FieldNames.OffsetX
                    },
                    {
                        type: 'formula',
                        expr: finalScope.offsets.y,
                        as: _constants.FieldNames.OffsetY
                    }
                ]
            });
            update.x = {
                field: _constants.FieldNames.OffsetX
            };
            update.y = {
                field: _constants.FieldNames.OffsetY
            };
            allEncodingRules.forEach((map)=>{
                for(let key in map)if (update[key]) {
                    let arrIn = map[key];
                    if (!Array.isArray(update[key])) {
                        let value = update[key];
                        let arrOut = [];
                        update[key] = arrOut;
                        arrIn.forEach((rule)=>arrOut.push(rule)
                        );
                        arrOut.push(value);
                    } else {
                        let arrOut = update[key];
                        arrIn.forEach((rule)=>arrOut.unshift(rule)
                        );
                    }
                }
            });
            update.fill = _fill.fill(specContext1, topColorField, _constants.ScaleNames.Color);
            update.opacity = _fill.opacity(specContext1);
        }
        return {
            specCapabilities,
            vegaSpec
        };
    }
    initSpec(dataName) {
        const { globalSignals  } = this;
        const { minCellWidth , minCellHeight , plotOffsetLeft , plotOffsetBottom , plotOffsetTop , plotOffsetRight , plotHeightOut , plotWidthOut  } = globalSignals;
        const { specContext: specContext1  } = this;
        const { insight  } = specContext1;
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
            signals: _signals.textSignals(specContext1, _constants.SignalNames.ViewportHeight).concat([
                minCellWidth,
                minCellHeight,
                {
                    name: _constants.SignalNames.ViewportHeight,
                    update: `max(${_constants.SignalNames.MinCellHeight}, ${insight.size.height})`
                },
                {
                    name: _constants.SignalNames.ViewportWidth,
                    update: `max(${_constants.SignalNames.MinCellWidth}, ${insight.size.width})`
                },
                plotOffsetLeft,
                plotOffsetTop,
                plotOffsetBottom,
                plotOffsetRight,
                {
                    name: _constants.SignalNames.PlotHeightIn,
                    update: `${_constants.SignalNames.ViewportHeight} - ${_constants.SignalNames.PlotOffsetBottom}`
                },
                {
                    name: _constants.SignalNames.PlotWidthIn,
                    update: `${_constants.SignalNames.ViewportWidth} - ${_constants.SignalNames.PlotOffsetLeft} - ${_constants.SignalNames.PlotOffsetRight}`
                },
                plotHeightOut,
                plotWidthOut,
                {
                    name: 'height',
                    update: `${_constants.SignalNames.PlotOffsetTop} + ${_constants.SignalNames.PlotHeightOut} + ${_constants.SignalNames.PlotOffsetBottom}`
                },
                {
                    name: 'width',
                    update: `${_constants.SignalNames.PlotWidthOut} + ${_constants.SignalNames.PlotOffsetLeft} + ${_constants.SignalNames.PlotOffsetRight}`
                }
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
        let { layouts , specCapabilities  } = this.props;
        const allGlobalScales = [];
        const allEncodingRules = [];
        for(let i = 0; i < layouts.length; i++){
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
                if (groupby) groupings.push({
                    id: i,
                    groupby,
                    fieldOps: [
                        {
                            field: null,
                            op: 'count',
                            as: _constants.FieldNames.Count
                        }
                    ]
                });
                let sumOp = layout.getAggregateSumOp();
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
        const { layoutType , props: props1  } = layoutPair;
        const layoutBuildProps = Object.assign(Object.assign({
        }, props1), buildProps);
        const layoutClass = _index.layoutClasses[layoutType];
        const layout = new layoutClass(layoutBuildProps);
        layout.id = buildProps.id;
        return layout;
    }
}

},{"./axes":"1oKBP","./color":"83a70","./constants":"1t33I","./defaults":"3ylwt","./facetTitle":"bSVTk","./fill":"5uOBc","./globalScope":"4o6ok","./scope":"lHDQD","./signals":"hwNqr","./layouts/index":"fPHbx","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"1oKBP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addGlobalAxes", ()=>addGlobalAxes
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _defaults = require("./defaults");
var _scope = require("./scope");
function addGlobalAxes(props) {
    const { axesOffsets , axisScales , axesScopes , axesTitlePadding , allGlobalScales , globalScope , labelBaseline , plotOffsetSignals , specColumns , specViewOptions  } = props;
    const { scope  } = globalScope;
    allGlobalScales.forEach((globalScales)=>{
        const { scales  } = globalScales;
        for(let xyz in scales){
            let _scales = scales[xyz];
            if (_scales) {
                _scope.addScales(scope, ..._scales);
                let { showAxes  } = globalScales;
                let zindex = undefined;
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
                    let axisScale = axisScales[xyz];
                    if (axisScale) {
                        const lineColor = specViewOptions.colors.axisLine;
                        const horizontal = xyz === 'x';
                        const column = specColumns[xyz] || {
                            quantitative: true
                        };
                        const title = axisScale.title;
                        const props1 = {
                            title,
                            horizontal,
                            column,
                            specViewOptions,
                            lineColor,
                            titlePadding: axesTitlePadding[xyz],
                            labelBaseline: labelBaseline[xyz],
                            zindex
                        };
                        axesScopes['main'].forEach((a)=>_scope.addAxes(a.scope, createAxis(Object.assign(Object.assign({
                            }, props1), {
                                scale: a.scale || _scales[0],
                                showTitle: a.title,
                                showLabels: a.labels,
                                showLines: a.lines
                            })))
                        );
                        if (axesScopes[xyz]) axesScopes[xyz].forEach((a)=>_scope.addAxes(a.scope, createAxis(Object.assign(Object.assign({
                            }, props1), {
                                scale: a.scale || _scales[0],
                                showTitle: a.title,
                                showLabels: a.labels,
                                showLines: a.lines
                            })))
                        );
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
    if (column.quantitative) axis.format = '~r';
    return axis;
}

},{"./constants":"1t33I","./defaults":"3ylwt","./scope":"lHDQD","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"lHDQD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addAxes", ()=>addAxes
);
parcelHelpers.export(exports, "addData", ()=>addData
);
parcelHelpers.export(exports, "addMarks", ()=>addMarks
);
parcelHelpers.export(exports, "addScales", ()=>addScales
);
parcelHelpers.export(exports, "addSignals", ()=>addSignals
);
parcelHelpers.export(exports, "addTransforms", ()=>addTransforms
);
parcelHelpers.export(exports, "getDataByName", ()=>getDataByName
);
parcelHelpers.export(exports, "getGroupBy", ()=>getGroupBy
);
parcelHelpers.export(exports, "addOffsets", ()=>addOffsets
);
function addAxes(scope, ...axis) {
    if (!scope.axes) scope.axes = [];
    scope.axes.push(...axis);
}
function addData(scope, ...data) {
    if (!scope.data) scope.data = [];
    scope.data.push(...data);
}
function addMarks(scope, ...marks) {
    if (!scope.marks) scope.marks = [];
    scope.marks.push(...marks);
}
function addScales(scope, ...scale) {
    if (!scope.scales) scope.scales = [];
    scope.scales.push(...scale.filter(Boolean));
}
function addSignals(scope, ...signal) {
    if (!scope.signals) scope.signals = [];
    scope.signals.push(...signal);
}
function addTransforms(data, ...transforms) {
    if (!data.transform) data.transform = [];
    data.transform.push(...transforms);
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
    const groupby = groupings.map((g)=>g.groupby
    );
    return groupby.reduce((acc, val)=>acc.concat(val)
    , []);
}
function addOffsets(...offsets) {
    return offsets.filter(Boolean).join(' + ');
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"83a70":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addColor", ()=>addColor
);
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
    const legends = _legends.getLegends(specContext, scaleName);
    if (legends) scope.legends = legends;
    const categoricalColor = specColumns.color && !specColumns.color.quantitative;
    if (categoricalColor) {
        _scope.addData(scope, ..._top.topLookup(specColumns.color, specViewOptions.maxLegends, dataName, legendDataName, topLookupName, _constants.FieldNames.TopColor, _constants.FieldNames.TopIndex));
        colorDataName = legendDataName;
    }
    if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
        if (specColumns.color.quantitative) _scope.addScales(scope, _scales.binnableColorScale(scaleName, insight.colorBin, dataName, specColumns.color.name, insight.scheme));
        else _scope.addScales(scope, {
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
    _scope.addSignals(scope, _signals.colorBinCountSignal(specContext), _signals.colorReverseSignal(specContext));
    return {
        topColorField: _constants.FieldNames.TopColor,
        colorDataName
    };
}

},{"./scope":"lHDQD","./scales":"duG64","./signals":"hwNqr","./constants":"1t33I","./legends":"h6DHR","./top":"2AYxV","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"duG64":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "linearScale", ()=>linearScale
);
parcelHelpers.export(exports, "pointScale", ()=>pointScale
);
parcelHelpers.export(exports, "binnableColorScale", ()=>binnableColorScale
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _expr = require("./expr");
function linearScale(scaleName, data, field, range, reverse, zero) {
    const scale = {
        name: scaleName,
        type: 'linear',
        range,
        round: true,
        reverse,
        domain: {
            data,
            field: _expr.safeFieldName(field)
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
            field: _expr.safeFieldName(field),
            sort: true
        },
        padding: 0.5
    };
    if (reverse !== undefined) scale.reverse = reverse;
    return scale;
}
function binnableColorScale(scaleName, colorBin, data, field, scheme) {
    scheme = scheme || _constants.ColorScaleNone;
    const domain = {
        data,
        field: _expr.safeFieldName(field)
    };
    const range = {
        scheme
    };
    const reverse = {
        signal: _constants.SignalNames.ColorReverse
    };
    if (colorBin !== 'continuous') range.count = {
        signal: _constants.SignalNames.ColorBinCount
    };
    switch(colorBin){
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

},{"./constants":"1t33I","./expr":"2IX4W","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"2IX4W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/**
 * Make sure that the field name is accessible via Vega's Field type
 * https://vega.github.io/vega/docs/types/#Field
 * examples: "source.x", "target['x']", "[my.field]"
 */ parcelHelpers.export(exports, "safeFieldName", ()=>safeFieldName
);
/**
 * Make sure the field name is usable in a Vega expression
 */ parcelHelpers.export(exports, "exprSafeFieldName", ()=>exprSafeFieldName
);
function safeFieldName(field) {
    return field.replace('.', '\\.').replace('[', '\\[').replace(']', '\\]');
}
function exprSafeFieldName(field) {
    //remove whitespace, period, accessors and logical modifiers
    return field.replace(/[.,:;+=\-/<>{}|~!@#$%^*[\]`'"()?\s\\]/g, '');
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"hwNqr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defaultZProportion", ()=>defaultZProportion
);
parcelHelpers.export(exports, "textSignals", ()=>textSignals
);
parcelHelpers.export(exports, "colorBinCountSignal", ()=>colorBinCountSignal
);
parcelHelpers.export(exports, "colorReverseSignal", ()=>colorReverseSignal
);
parcelHelpers.export(exports, "modifySignal", ()=>modifySignal
);
var _constants = require("./constants");
const defaultZProportion = 0.6;
function textSignals(context, heightSignal) {
    const { specViewOptions  } = context;
    const signals = [
        {
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
        },
        {
            name: _constants.SignalNames.ZHeight,
            update: `${heightSignal} * ${_constants.SignalNames.ZProportion}`
        },
        {
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
        },
        {
            name: _constants.SignalNames.TextSize,
            update: `${_constants.SignalNames.TextScale} * 10`
        },
        {
            name: _constants.SignalNames.TextTitleSize,
            update: `${_constants.SignalNames.TextScale} * 15`
        },
        {
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
        },
        {
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
        },
        {
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
        }
    ];
    return signals;
}
function colorBinCountSignal(context) {
    const { specViewOptions  } = context;
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
    const { specViewOptions  } = context;
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

},{"./constants":"1t33I","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"h6DHR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getLegends", ()=>getLegends
);
function legend(column, fill) {
    const legend1 = {
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
        legend1.type = 'symbol';
        legend1.format = '~r';
    }
    return legend1;
}
function getLegends(context, fill) {
    const { specColumns , insight  } = context;
    if (specColumns.color && !insight.hideLegend && !insight.directColor && !specColumns.color.isColorData) return [
        legend(specColumns.color, fill)
    ];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"2AYxV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "topLookup", ()=>topLookup
);
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
                    type: 'aggregate',
                    groupby: [
                        _expr.safeFieldName(column.name)
                    ]
                },
                {
                    type: 'window',
                    ops: [
                        'count'
                    ],
                    as: [
                        indexName
                    ]
                },
                {
                    type: 'filter',
                    expr: `datum[${JSON.stringify(indexName)}] <= ${count}`
                }
            ]
        },
        {
            name: legend,
            source,
            transform: [
                {
                    type: 'lookup',
                    from: lookupName,
                    key: _expr.safeFieldName(column.name),
                    fields: [
                        column.name
                    ].map(_expr.safeFieldName),
                    values: [
                        column.name
                    ].map(_expr.safeFieldName),
                    as: [
                        fieldName
                    ]
                },
                {
                    type: 'formula',
                    expr: `datum[${JSON.stringify(fieldName)}] == null ? '${_constants.Other}' : datum[${JSON.stringify(fieldName)}]`,
                    as: fieldName
                }
            ]
        }
    ];
    return data;
}

},{"./constants":"1t33I","./expr":"2IX4W","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"bSVTk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addFacetColRowTitles", ()=>addFacetColRowTitles
);
parcelHelpers.export(exports, "addFacetCellTitles", ()=>addFacetCellTitles
);
parcelHelpers.export(exports, "addFacetAxesGroupMarks", ()=>addFacetAxesGroupMarks
);
parcelHelpers.export(exports, "facetRowHeaderFooter", ()=>facetRowHeaderFooter
);
parcelHelpers.export(exports, "facetColumnHeaderFooter", ()=>facetColumnHeaderFooter
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _scope = require("./scope");
var _constants = require("./constants");
function addFacetColRowTitles(globalScope, colTitleSource, rowTitleSource, sizeSignals, axisTextColor) {
    const titleSignal = `parent[${JSON.stringify(_constants.FieldNames.FacetTitle)}]`;
    const index = `datum[${JSON.stringify(_constants.FieldNames.Ordinal)}] - 1`;
    const col = facetColumnHeaderFooter(colTitleSource.dataName, sizeSignals, index);
    const row = facetRowHeaderFooter(rowTitleSource.dataName, sizeSignals, index);
    _scope.addMarks(globalScope, col.header, row.footer);
    _scope.addMarks(col.header, {
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
    _scope.addMarks(row.footer, {
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
    _scope.addMarks(scope, {
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
    const { colSeqName , colTitleScale , globalScope , facetScope , plotScope , rowSeqName , rowTitleScale  } = props;
    const { sizeSignals  } = facetScope;
    const colSequence = createSequence(colSeqName, sizeSignals.colCount);
    const rowSequence = createSequence(rowSeqName, sizeSignals.rowCount);
    const index = 'datum.data';
    const col = facetColumnHeaderFooter(colSeqName, sizeSignals, index);
    const row = facetRowHeaderFooter(rowSeqName, sizeSignals, index);
    _scope.addData(globalScope, colSequence, rowSequence);
    _scope.addMarks(globalScope, col.footer, row.header);
    _scope.addScales(globalScope, colTitleScale, rowTitleScale);
    const map = {
        main: [
            {
                scope: facetScope.facetScope,
                lines: true,
                labels: false,
                title: false
            }
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
            }
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
            }
        ]
    };
    return map;
}
function facetRowHeaderFooter(data, sizeSignals, index) {
    const rowFn = (xSignal)=>{
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
    const colFn = (ySignal)=>{
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
    };
    //create group marks based on data sequences
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
        transform: [
            {
                type: 'sequence',
                start: 0,
                stop: {
                    signal: countSignal
                }
            }
        ]
    };
}

},{"./scope":"lHDQD","./constants":"1t33I","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"5uOBc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "fill", ()=>fill
);
parcelHelpers.export(exports, "opacity", ()=>opacity
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _expr = require("./expr");
function fill(context, colorFieldName, scale) {
    const { specColumns , insight , specViewOptions  } = context;
    const colorColumn = specColumns.color;
    return colorColumn ? colorColumn.isColorData || insight.directColor ? {
        field: _expr.safeFieldName(colorColumn.name)
    } : {
        scale,
        field: colorColumn.quantitative ? _expr.safeFieldName(colorColumn.name) : colorFieldName
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

},{"./constants":"1t33I","./expr":"2IX4W","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"4o6ok":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GlobalScope", ()=>GlobalScope
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _scope = require("./scope");
class GlobalScope {
    constructor(props){
        const { dataName , markGroup: markGroup1 , scope , signals  } = props;
        this.scope = scope;
        this._markGroup = markGroup1;
        this.signals = signals;
        this.data = _scope.getDataByName(scope.data, dataName).data;
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

},{"./constants":"1t33I","./scope":"lHDQD","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"fPHbx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "layoutClasses", ()=>layoutClasses
);
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
    AggregateContainer: _aggregateContainer.AggregateContainer,
    AggregateSquare: _aggregateSquare.AggregateSquare,
    Band: _band.Band,
    Cross: _cross.Cross,
    Scatter: _scatter.Scatter,
    Square: _square.Square,
    Stack: _stack.Stack,
    Strip: _strip.Strip,
    Treemap: _treemap.Treemap,
    Wrap: _wrap.Wrap
};

},{"./aggregateContainer":"2O4nj","./aggregateSquare":"6wxfJ","./band":"2X3Vg","./cross":"in4x6","./scatter":"6EFcR","./square":"eYIiP","./stack":"jeLuC","./strip":"9us2O","./treemap":"6XNP4","./wrap":"6iuK6","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"2O4nj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AggregateContainer", ()=>AggregateContainer
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _constants = require("../constants");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
class AggregateContainer extends _layout.Layout {
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
        if (this.aggregation === 'sum') {
            const fieldOp = {
                field: _expr.safeFieldName(this.props.sumBy.name),
                op: 'sum',
                as: _constants.FieldNames.Sum
            };
            return fieldOp;
        }
    }
    build() {
        const { aggregation , names , props: props1  } = this;
        const { dock , globalScope , groupings , niceScale , parentScope , showAxes  } = props1;
        _scope.addTransforms(globalScope.data, Object.assign(Object.assign({
        }, this.getTransforms(aggregation, _scope.getGroupBy(groupings))), {
            as: [
                names.aggregateField
            ]
        }), {
            type: 'extent',
            field: _expr.safeFieldName(names.aggregateField),
            signal: names.globalAggregateExtentSignal
        });
        _scope.addSignals(globalScope.scope, {
            name: props1.globalAggregateMaxExtentSignal,
            update: `${names.globalAggregateExtentSignal}[1]`
        });
        const horizontal = dock === 'left';
        const groupScaled = `scale(${JSON.stringify(names.scale)}, datum[${JSON.stringify(names.aggregateField)}])`;
        const offsets = {
            x: parentScope.offsets.x,
            y: _scope.addOffsets(parentScope.offsets.y, dock === 'bottom' ? groupScaled : ''),
            h: horizontal ? parentScope.offsets.h : dock === 'top' ? groupScaled : `${parentScope.offsets.h} - ${groupScaled}`,
            w: horizontal ? groupScaled : parentScope.offsets.w
        };
        const scale = {
            type: 'linear',
            name: names.scale,
            domain: [
                0,
                {
                    signal: props1.globalAggregateMaxExtentSignal
                }
            ],
            range: horizontal ? [
                0,
                {
                    signal: parentScope.sizeSignals.layoutWidth
                }
            ] : [
                {
                    signal: parentScope.sizeSignals.layoutHeight
                },
                0
            ],
            nice: niceScale,
            zero: true,
            reverse: dock === 'top'
        };
        const globalAggregateMaxExtentScaledValue = `scale(${JSON.stringify(names.scale)}, ${props1.globalAggregateMaxExtentSignal})`;
        _scope.addSignals(globalScope.scope, {
            name: props1.globalAggregateMaxExtentScaledSignal,
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
                        test: _selection.testForCollapseSelection(),
                        signal: parentScope.offsets.x
                    }
                ],
                width: [
                    {
                        test: _selection.testForCollapseSelection(),
                        value: 0
                    }
                ]
            } : {
                y: [
                    {
                        test: _selection.testForCollapseSelection(),
                        signal: dock === 'top' ? parentScope.offsets.y : _scope.addOffsets(parentScope.offsets.y, parentScope.offsets.h)
                    }
                ],
                height: [
                    {
                        test: _selection.testForCollapseSelection(),
                        value: 0
                    }
                ]
            }
        };
    }
    getTransforms(aggregation, groupby) {
        const trans = {
            type: 'joinaggregate',
            groupby: groupby.map(_expr.safeFieldName),
            ops: [
                aggregation
            ]
        };
        if (aggregation === 'sum') trans.fields = [
            this.props.sumBy.name
        ].map(_expr.safeFieldName);
        return trans;
    }
    getAggregation() {
        const { props: props1  } = this;
        let s;
        if (props1.dock === 'left') s = props1.axesScales.x;
        else s = props1.axesScales.y;
        switch(s.aggregate){
            case 'sum':
                return 'sum';
            default:
                return 'count';
        }
    }
}

},{"./layout":"8pPe8","../constants":"1t33I","../expr":"2IX4W","../scope":"lHDQD","../selection":"gqqkZ","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"8pPe8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Layout", ()=>Layout
);
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
        throw 'Not implemented';
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"gqqkZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "testForCollapseSelection", ()=>testForCollapseSelection
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
function testForCollapseSelection() {
    return `datum.${_constants.FieldNames.Collapsed}`;
}

},{"./constants":"1t33I","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"6wxfJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AggregateSquare", ()=>AggregateSquare
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
class AggregateSquare extends _layout.Layout {
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
        const { names , props: props1  } = this;
        const { aggregation , globalScope , groupings , onBuild , parentScope  } = props1;
        const { sizeSignals  } = parentScope;
        _scope.addTransforms(globalScope.data, Object.assign(Object.assign({
        }, this.getTransforms(aggregation, _scope.getGroupBy(groupings))), {
            as: [
                names.aggregateField
            ]
        }), {
            type: 'extent',
            field: _expr.safeFieldName(names.aggregateField),
            signal: names.globalAggregateExtentSignal
        });
        const localAggregateMaxExtent = `datum[${JSON.stringify(names.aggregateField)}]`;
        const squareMaxSide = `min((${sizeSignals.layoutHeight}), (${sizeSignals.layoutWidth}))`;
        const squareMaxArea = `(${[
            squareMaxSide,
            squareMaxSide
        ].join(' * ')})`;
        const shrinkRatio = `((${localAggregateMaxExtent}) / (${names.globalAggregateExtentSignal}[1]))`;
        const squareArea = `(${[
            squareMaxArea,
            shrinkRatio
        ].join(' * ')})`;
        const squareSide = `sqrt(${squareArea})`;
        const localAggregateMaxExtentScaled = squareSide;
        onBuild && onBuild(localAggregateMaxExtent, localAggregateMaxExtentScaled);
        const offsets = {
            x: _scope.addOffsets(parentScope.offsets.x, `(${parentScope.offsets.w} - ${squareSide}) / 2`),
            y: _scope.addOffsets(parentScope.offsets.y, `(${parentScope.offsets.h} - ${squareSide}) / 2`),
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
                        test: _selection.testForCollapseSelection(),
                        signal: offsets.y
                    }
                ],
                height: [
                    {
                        test: _selection.testForCollapseSelection(),
                        value: 0
                    }
                ]
            }
        };
    }
    getTransforms(aggregation, groupby) {
        const trans = {
            type: 'joinaggregate',
            groupby: groupby.map(_expr.safeFieldName),
            ops: [
                aggregation
            ]
        };
        if (aggregation === 'sum') trans.fields = [
            this.props.sumBy.name
        ].map(_expr.safeFieldName);
        return trans;
    }
}

},{"./layout":"8pPe8","../expr":"2IX4W","../scope":"lHDQD","../selection":"gqqkZ","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"2X3Vg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Band", ()=>Band
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _bin = require("../bin");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
var _signals = require("../signals");
class Band extends _layout.Layout {
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
        this.bin = _bin.binnable(this.prefix, props.globalScope.data.name, props.groupby);
    }
    getGrouping() {
        return this.bin.fields;
    }
    build() {
        const { bin , names , props: props1  } = this;
        const { globalScope , minBandWidth , orientation , parentScope , showAxes  } = props1;
        const binField = bin.fields[0];
        if (bin.native === false) {
            _scope.addSignals(globalScope.scope, ...bin.signals);
            _scope.addTransforms(globalScope.data, ...bin.transforms);
            _scope.addData(globalScope.scope, bin.dataSequence);
        }
        //TODO don't add this, use existing dataset
        _scope.addData(globalScope.scope, {
            name: names.accumulative,
            source: bin.fullScaleDataname,
            transform: [
                {
                    type: 'aggregate',
                    groupby: this.getGrouping().map(_expr.safeFieldName),
                    ops: [
                        'count'
                    ]
                }
            ]
        });
        const horizontal = orientation === 'horizontal';
        const minCellSignal = horizontal ? globalScope.signals.minCellHeight : globalScope.signals.minCellWidth;
        _signals.modifySignal(minCellSignal, 'max', `length(data(${JSON.stringify(names.accumulative)})) * ${minBandWidth}`);
        _scope.addSignals(globalScope.scope, {
            name: names.bandWidth,
            update: `bandwidth(${JSON.stringify(horizontal ? names.yScale : names.xScale)})`
        });
        const scales = this.getScales(bin, horizontal);
        let encodingRuleMap;
        if (!props1.excludeEncodingRuleMap) encodingRuleMap = horizontal ? {
            x: [
                {
                    test: _selection.testForCollapseSelection(),
                    value: parentScope.offsets.x
                }
            ],
            width: [
                {
                    test: _selection.testForCollapseSelection(),
                    value: 0
                }
            ]
        } : {
            y: [
                {
                    test: _selection.testForCollapseSelection(),
                    signal: _scope.addOffsets(parentScope.offsets.y, parentScope.offsets.h)
                }
            ],
            height: [
                {
                    test: _selection.testForCollapseSelection(),
                    value: 0
                }
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
                    x: horizontal ? undefined : scales,
                    y: horizontal ? scales : undefined
                }
            },
            encodingRuleMap
        };
    }
    getOffset(horizontal, binField) {
        const { names , props: props1  } = this;
        const { parentScope  } = props1;
        return {
            x: _scope.addOffsets(parentScope.offsets.x, horizontal ? '' : `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(binField)}])`),
            y: _scope.addOffsets(parentScope.offsets.y, horizontal ? `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(binField)}])` : ''),
            h: horizontal ? names.bandWidth : parentScope.offsets.h,
            w: horizontal ? parentScope.offsets.w : names.bandWidth
        };
    }
    getScales(bin, horizontal) {
        const { names  } = this;
        const { parentScope  } = this.props;
        const binField = _expr.safeFieldName(bin.fields[0]);
        const scales = [];
        let bandScale;
        if (horizontal) bandScale = {
            type: 'band',
            name: names.yScale,
            range: [
                0,
                {
                    signal: parentScope.sizeSignals.layoutHeight
                }
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
            type: 'band',
            name: names.xScale,
            range: [
                0,
                {
                    signal: parentScope.sizeSignals.layoutWidth
                }
            ],
            padding: 0.1,
            domain: {
                data: bin.domainDataName,
                field: binField,
                sort: true
            }
        };
        scales.push(bandScale);
        return scales;
    }
}

},{"./layout":"8pPe8","../bin":"gwlvx","../expr":"2IX4W","../scope":"lHDQD","../selection":"gqqkZ","../signals":"hwNqr","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"gwlvx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "binnable", ()=>binnable
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _expr = require("./expr");
function binnable(prefix, domainDataName, discreteColumn) {
    const { column , defaultBins , maxbins , maxbinsSignalDisplayName , maxbinsSignalName  } = discreteColumn;
    if (column.quantitative) {
        const field = `${prefix}_bin_${_expr.exprSafeFieldName(column.name)}`;
        const fieldEnd = `${field}_end`;
        const binSignal = `${field}_bins`;
        const extentSignal = `${field}_bin_extent`;
        domainDataName = `${field}_sequence`; //override the data name
        const extentTransform = {
            type: 'extent',
            field: _expr.safeFieldName(column.name),
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
            field: _expr.safeFieldName(column.name),
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
                },
                {
                    type: 'formula',
                    expr: 'datum.data',
                    as: field
                },
                {
                    type: 'formula',
                    expr: `datum.data + ${binSignal}.step`,
                    as: fieldEnd
                },
                {
                    type: 'window',
                    ops: [
                        'row_number'
                    ],
                    as: [
                        _constants.FieldNames.Ordinal
                    ]
                },
                {
                    type: 'formula',
                    expr: `datum.data === ${binSignal}.start`,
                    as: _constants.FieldNames.First
                },
                {
                    type: 'formula',
                    expr: `datum.data === ${binSignal}.stop - ${binSignal}.step`,
                    as: _constants.FieldNames.Last
                }
            ]
        };
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
            dataSequence,
            domainDataName,
            signals: [
                maxbinsSignal
            ],
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

},{"./constants":"1t33I","./expr":"2IX4W","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"in4x6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Cross", ()=>Cross
);
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
class Cross extends _layout.Layout {
    constructor(props){
        super(props);
        this.props = props;
        const p = this.prefix = `cross_${this.id}`;
        this.binX = _bin.binnable(`${p}_x`, props.globalScope.data.name, props.groupbyX);
        this.binY = _bin.binnable(`${p}_y`, props.globalScope.data.name, props.groupbyY);
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
        const { binX , binY , names , prefix , props: props1  } = this;
        const { axisTextColor , colRowTitles , globalScope , parentScope  } = props1;
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
                _scope.addSignals(globalScope.scope, ...bin.signals);
                _scope.addTransforms(globalScope.data, ...bin.transforms);
                _scope.addData(globalScope.scope, bin.dataSequence);
                _scope.addTransforms(bin.dataSequence, {
                    type: 'formula',
                    expr: `indata(${JSON.stringify(globalScope.markDataName)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                    as: _constants.FieldNames.Contains
                });
                data = bin.dataSequence;
                dataName = bin.dataSequence.name;
                countSignal = `length(data(${JSON.stringify(dataName)}))`;
                scale = _ordinal.ordinalScale(dataName, `${names.dimScale}_${dim}`, bin.fields);
                titleSource.dataName = bin.dataSequence.name;
            } else {
                dataName = globalScope.markDataName;
                const ord = _ordinal.createOrdinals(dataName, `${prefix}_${dim}`, bin.fields, sortOrder);
                data = ord.data;
                _scope.addData(globalScope.scope, ord.data);
                countSignal = `length(data(${JSON.stringify(ord.data.name)}))`;
                scale = ord.scale;
                titleSource.dataName = ord.data.name;
            }
            titleSource.quantitative = bin.discreteColumn.column.quantitative;
            d.dataOut = data;
            d.scaleName = scale.name;
            _scope.addTransforms(data, {
                type: 'formula',
                expr: _facetSearch.serializeAsVegaExpression(bin, _constants.FieldNames.First, _constants.FieldNames.Last),
                as: _constants.FieldNames.FacetSearch
            }, {
                type: 'formula',
                expr: _facetSearch.displayBin(bin),
                as: _constants.FieldNames.FacetTitle
            });
            _scope.addScales(globalScope.scope, scale);
            const count = `${names.dimCount}_${dim}`;
            const calc = `${names.dimCellSizeCalc}_${dim}`;
            const size = `${names.dimCellSize}_${dim}`;
            _scope.addSignals(globalScope.scope, {
                name: count,
                update: countSignal
            });
            _scope.addSignals(globalScope.scope, {
                name: calc,
                update: `${d.layout} / ${count}`
            }, {
                name: size,
                update: `max(${d.min}, (${calc} - ${padding}))`
            });
            _signals.modifySignal(d.out, 'max', `((${size} + ${padding}) * ${count})`);
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
            data: [
                {
                    name: names.searchUnion,
                    source: dx.dataOut.name,
                    transform: [
                        {
                            type: 'formula',
                            expr: `[datum[${JSON.stringify(_constants.FieldNames.FacetSearch)}], merge(parent[${JSON.stringify(_constants.FieldNames.FacetSearch)}], { clause: '&&'})]`,
                            as: _constants.FieldNames.FacetSearch
                        }
                    ]
                }
            ]
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
        _scope.addMarks(globalScope.markGroup, groupRow);
        _scope.addMarks(groupRow, groupCol);
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
        if (colRowTitles) _facetTitle.addFacetColRowTitles(globalScope.scope, titles.x, titles.y, sizeSignals, axisTextColor);
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

},{"./layout":"8pPe8","../bin":"gwlvx","../constants":"1t33I","../facetSearch":"5bHzS","../facetTitle":"bSVTk","../ordinal":"iy5ix","../scope":"lHDQD","../signals":"hwNqr","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"5bHzS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "displayBin", ()=>displayBin
);
parcelHelpers.export(exports, "serializeAsVegaExpression", ()=>serializeAsVegaExpression
);
function displayBin(bin) {
    const val = (index)=>`datum[${JSON.stringify(bin.fields[index])}]`
    ;
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
            'operator:\'>=\'',
            `value:datum[${JSON.stringify(bin.fields[0])}]`
        ];
        const high = [
            'clause:\'&&\'',
            `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
            'operator:\'<\'',
            `value:datum[${JSON.stringify(bin.fields[1])}]`
        ];
        return obj([
            `expressions:[ datum[${JSON.stringify(firstFieldName)}] ? null : ${obj(low)}, datum[${JSON.stringify(lastFieldName)}] ? null : ${obj(high)}]`
        ], clause);
    } else {
        const exact = [
            `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
            'operator:\'==\'',
            `value:datum[${JSON.stringify(bin.fields[0])}]`
        ];
        return obj([
            `expressions:[${obj(exact)}]`
        ], clause);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"iy5ix":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createOrdinals", ()=>createOrdinals
);
parcelHelpers.export(exports, "ordinalScale", ()=>ordinalScale
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _expr = require("./expr");
function createOrdinals(source, prefix, binFields, sortOrder) {
    const _binFields = binFields.map(_expr.safeFieldName);
    const dataName = `${prefix}_bin_order`;
    const data = {
        name: dataName,
        source,
        transform: [
            {
                type: 'aggregate',
                groupby: _binFields
            },
            {
                type: 'collect',
                sort: {
                    field: _binFields,
                    order: _binFields.map((f)=>sortOrder
                    )
                }
            },
            {
                type: 'window',
                ops: [
                    'row_number'
                ],
                as: [
                    _constants.FieldNames.Ordinal
                ]
            }
        ]
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
            field: _expr.safeFieldName(binFields[0])
        },
        range: {
            data: dataName,
            field: _constants.FieldNames.Ordinal
        }
    };
}

},{"./constants":"1t33I","./expr":"2IX4W","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"6EFcR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Scatter", ()=>Scatter
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _constants = require("../constants");
var _defaults = require("../defaults");
var _expr = require("../expr");
var _scales = require("../scales");
var _scope = require("../scope");
var _selection = require("../selection");
class Scatter extends _layout.Layout {
    constructor(props){
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
        const { names , prefix , props: props1  } = this;
        const { globalScope , parentScope , scatterPointScaleDisplay , size , x , y , z , zGrounded  } = props1;
        const qsize = size && size.quantitative && size;
        _scope.addSignals(globalScope.scope, {
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
            _scope.addTransforms(globalScope.data, {
                type: 'extent',
                field: _expr.safeFieldName(qsize.name),
                signal: names.sizeExtent
            });
            _scope.addScales(globalScope.scope, {
                name: names.sizeScale,
                type: 'linear',
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
            _scope.addSignals(globalScope.scope, {
                name: names.sizeRange,
                update: `min(${parentScope.sizeSignals.layoutHeight}, ${parentScope.sizeSignals.layoutWidth}) / ${_defaults.scatterSizedDiv}`
            });
        }
        _scope.addData(globalScope.scope, {
            name: names.markData,
            source: globalScope.markDataName,
            transform: [
                x,
                y,
                z
            ].map((c)=>{
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
            scales: {
            }
        };
        const zValue = z ? `scale(${JSON.stringify(names.zScale)}, datum[${JSON.stringify(z.name)}])` : null;
        const sizeValueSignal = qsize ? `scale(${JSON.stringify(names.sizeScale)}, datum[${JSON.stringify(qsize.name)}]) * ${_constants.SignalNames.PointScale}` : _constants.SignalNames.PointScale;
        const update = Object.assign({
            height: [
                {
                    test: _selection.testForCollapseSelection(),
                    value: 0
                },
                {
                    signal: sizeValueSignal
                }
            ],
            width: {
                signal: sizeValueSignal
            }
        }, z && {
            z: [
                {
                    test: _selection.testForCollapseSelection(),
                    value: 0
                },
                {
                    signal: `${_constants.SignalNames.ZGrounded} ? 0 : ${zValue}`
                }
            ],
            depth: [
                {
                    test: _selection.testForCollapseSelection(),
                    value: 0
                },
                {
                    signal: `${_constants.SignalNames.ZGrounded} ? ${zValue} : ${sizeValueSignal}`
                }
            ]
        });
        const columnSignals = [
            {
                column: x,
                xyz: 'x',
                scaleName: names.xScale,
                reverse: false,
                signal: parentScope.sizeSignals.layoutWidth
            },
            {
                column: y,
                xyz: 'y',
                scaleName: names.yScale,
                reverse: true,
                signal: parentScope.sizeSignals.layoutHeight
            },
            {
                column: z,
                xyz: 'z',
                scaleName: names.zScale,
                reverse: false,
                signal: `(${globalScope.zSize}) * ${_constants.SignalNames.ZProportion}`
            }
        ];
        columnSignals.forEach((cs)=>{
            const { column , reverse , scaleName , signal , xyz  } = cs;
            if (!column) return;
            let scale;
            if (column.quantitative) scale = _scales.linearScale(scaleName, globalScope.data.name, column.name, [
                0,
                {
                    signal
                }
            ], reverse, false);
            else scale = _scales.pointScale(scaleName, globalScope.data.name, [
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
            type: 'rect',
            from: {
                data: globalScope.markDataName
            },
            encode: {
                update
            }
        };
        _scope.addMarks(globalScope.markGroup, mark);
        return {
            offsets: {
                x: _scope.addOffsets(parentScope.offsets.x, `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(x.name)}])`),
                y: _scope.addOffsets(parentScope.offsets.y, `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(y.name)}]) - ${sizeValueSignal}`),
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
                        test: _selection.testForCollapseSelection(),
                        signal: _scope.addOffsets(parentScope.offsets.y, parentScope.sizeSignals.layoutHeight)
                    }
                ]
            }
        };
    }
}

},{"./layout":"8pPe8","../constants":"1t33I","../defaults":"3ylwt","../expr":"2IX4W","../scales":"duG64","../scope":"lHDQD","../selection":"gqqkZ","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"eYIiP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Square", ()=>Square
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _constants = require("../constants");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
var _zBase = require("../zBase");
class Square extends _layout.Layout {
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
        const { names , prefix , props: props1  } = this;
        const { fillDirection , globalScope , groupings , parentScope , collapseYHeight , sortBy , z  } = props1;
        const zScale = _zBase.addZScale(z, globalScope.zSize, globalScope.data.name, names.zScale);
        _scope.addTransforms(globalScope.data, Object.assign({
            type: 'stack',
            groupby: _scope.getGroupBy(groupings).map(_expr.safeFieldName),
            as: [
                names.stack0,
                names.stack1
            ]
        }, sortBy && {
            sort: {
                field: _expr.safeFieldName(sortBy.name),
                order: 'ascending'
            }
        }));
        const { gap , levelSize , size , squaresPerBand  } = this.addSignals();
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
                    height: collapseYHeight ? [
                        {
                            test: _selection.testForCollapseSelection(),
                            value: 0
                        },
                        heightSignal
                    ] : heightSignal,
                    width: {
                        signal: fillDirection === 'down-right' ? levelSize : size
                    }
                }, z && {
                    z: {
                        value: 0
                    },
                    depth: [
                        {
                            test: _selection.testForCollapseSelection(),
                            value: 0
                        },
                        {
                            scale: names.zScale,
                            field: _expr.safeFieldName(z.name)
                        }
                    ]
                })
            }
        };
        _scope.addMarks(globalScope.markGroup, mark);
        const { tx , ty  } = this.transformXY(gap, levelSize, squaresPerBand);
        return Object.assign(Object.assign(Object.assign({
        }, z && {
            globalScales: {
                showAxes: true,
                scales: {
                    z: [
                        zScale
                    ]
                }
            }
        }), {
            offsets: {
                x: _scope.addOffsets(parentScope.offsets.x, tx.expr),
                y: _scope.addOffsets(parentScope.offsets.y, ty.expr),
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
                        test: _selection.testForCollapseSelection(),
                        value: parentScope.offsets.y
                    }
                ]
            }
        });
    }
    getBandWidth() {
        const { offsets  } = this.props.parentScope;
        switch(this.props.fillDirection){
            case 'down-right':
                return offsets.h;
            default:
                return offsets.w;
        }
    }
    addSignals() {
        const { names , props: props1  } = this;
        const { fillDirection , globalScope , groupings , parentScope  } = props1;
        let { maxGroupedFillSize , maxGroupedUnits  } = props1;
        if (!maxGroupedUnits) {
            if (groupings) {
                _scope.addTransforms(globalScope.data, {
                    type: 'joinaggregate',
                    groupby: _scope.getGroupBy(groupings).map(_expr.safeFieldName),
                    ops: [
                        'count'
                    ],
                    as: [
                        names.maxGroupField
                    ]
                }, {
                    type: 'extent',
                    field: names.maxGroupField,
                    signal: names.maxGroupSignal
                });
                maxGroupedUnits = `(${names.maxGroupSignal}[1])`;
            } else maxGroupedUnits = `length(data(${JSON.stringify(globalScope.data.name)}))`;
        }
        if (!maxGroupedFillSize) maxGroupedFillSize = fillDirection === 'down-right' ? parentScope.offsets.w : parentScope.offsets.h;
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
            type: 'formula',
            expr: null,
            as: `${prefix}_${_constants.FieldNames.OffsetX}`
        };
        const ty = {
            type: 'formula',
            expr: null,
            as: `${prefix}_${_constants.FieldNames.OffsetY}`
        };
        switch(fillDirection){
            case 'down-right':
                tx.expr = `${level} * (${levelSize} + ${gap})`;
                ty.expr = compartment;
                break;
            case 'right-up':
                tx.expr = compartment;
                ty.expr = `${parentScope.offsets.h} - ${levelSize} - ${level} * (${levelSize} + ${gap})`;
                break;
            case 'right-down':
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

},{"./layout":"8pPe8","../constants":"1t33I","../expr":"2IX4W","../scope":"lHDQD","../selection":"gqqkZ","../zBase":"g4Q8y","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"g4Q8y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addZScale", ()=>addZScale
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _constants = require("./constants");
var _scales = require("./scales");
function addZScale(z, zSize, dataName, zScaleName) {
    if (z) {
        const zRange = [
            0,
            {
                signal: `(${zSize}) * ${_constants.SignalNames.ZProportion}`
            }
        ];
        const scale = z.quantitative ? _scales.linearScale(zScaleName, dataName, z.name, zRange, false, true) : _scales.pointScale(zScaleName, dataName, zRange, z.name, false);
        return scale;
    }
}

},{"./constants":"1t33I","./scales":"duG64","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"jeLuC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Stack", ()=>Stack
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
class Stack extends _layout.Layout {
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
        const { names , props: props1  } = this;
        const { globalScope , groupings , parentScope , sort  } = props1;
        const { sizeSignals  } = parentScope;
        _scope.addTransforms(globalScope.data, {
            type: 'joinaggregate',
            groupby: _scope.getGroupBy(groupings).map(_expr.safeFieldName),
            ops: [
                'count'
            ],
            as: [
                names.count
            ]
        }, {
            type: 'extent',
            field: names.count,
            signal: names.globalExtent
        }, Object.assign({
            type: 'stack',
            groupby: _scope.getGroupBy(groupings).map(_expr.safeFieldName),
            as: [
                names.stack0,
                names.stack1
            ]
        }, sort && {
            sort: {
                field: _expr.safeFieldName(sort.name),
                order: 'ascending'
            }
        }));
        _scope.addData(globalScope.scope, {
            name: names.sequence,
            transform: [
                {
                    type: 'sequence',
                    start: 1,
                    stop: {
                        signal: `sqrt(${names.globalExtent}[1])`
                    }
                },
                {
                    type: 'formula',
                    expr: 'datum.data * datum.data',
                    as: 'squared'
                },
                {
                    type: 'formula',
                    expr: `ceil(${names.globalExtent}[1] / datum.squared)`,
                    as: 'maxlevels'
                },
                {
                    type: 'formula',
                    expr: `(${names.size} - (datum.data - 1) * datum.data) / datum.data`,
                    as: 'side'
                },
                {
                    type: 'formula',
                    expr: 'datum.side * datum.maxlevels + datum.maxlevels - 1',
                    as: 'sidecubeheight'
                },
                {
                    type: 'formula',
                    expr: `abs(${globalScope.zSize} - datum.sidecubeheight)`,
                    as: 'heightmatch'
                },
                {
                    type: 'collect',
                    sort: {
                        field: 'heightmatch',
                        order: 'ascending'
                    }
                },
                {
                    type: 'window',
                    ops: [
                        'row_number'
                    ]
                },
                {
                    type: 'filter',
                    expr: 'datum.row_number === 1'
                }
            ]
        });
        _scope.addSignals(globalScope.scope, {
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
            x: _scope.addOffsets(parentScope.offsets.x, groupX, `${cubeX} * (${names.cube} + 1)`),
            y: _scope.addOffsets(parentScope.offsets.y, groupY, `${cubeY} * (${names.cube} + 1)`),
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
        _scope.addMarks(globalScope.markGroup, mark);
        const zScale = {
            type: 'linear',
            name: names.zScale,
            domain: [
                0,
                {
                    signal: names.maxCount
                }
            ],
            range: [
                0,
                {
                    signal: `${names.maxLevels} * (${names.cube} + 1) - 1`
                }
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
                showAxes: true,
                scales: {
                    z: [
                        zScale
                    ]
                }
            },
            encodingRuleMap: {
                y: [
                    {
                        test: _selection.testForCollapseSelection(),
                        signal: parentScope.offsets.y
                    }
                ],
                z: [
                    {
                        test: _selection.testForCollapseSelection(),
                        value: 0
                    }
                ],
                depth: [
                    {
                        test: _selection.testForCollapseSelection(),
                        value: 0
                    }
                ],
                height: [
                    {
                        test: _selection.testForCollapseSelection(),
                        value: 0
                    }
                ]
            }
        };
    }
}

},{"./layout":"8pPe8","../expr":"2IX4W","../scope":"lHDQD","../selection":"gqqkZ","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"9us2O":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Strip", ()=>Strip
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _constants = require("../constants");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
var _zBase = require("../zBase");
class Strip extends _layout.Layout {
    constructor(props){
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
        const { names , prefix , props: props1  } = this;
        const { addPercentageScale , globalScope , groupings , orientation , size , sort , sortOrder , parentScope , z  } = props1;
        const zScale = _zBase.addZScale(z, globalScope.zSize, globalScope.data.name, names.zScale);
        const horizontal = orientation === 'horizontal';
        const transform = [];
        if (sort) transform.push({
            type: 'collect',
            sort: {
                field: _expr.safeFieldName(sort.name),
                order: sortOrder
            }
        });
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
            field: _expr.safeFieldName(stackField),
            offset: 'normalize',
            as: [
                names.firstField,
                names.lastField
            ]
        };
        if (groupings.length) stackTransform.groupby = _scope.getGroupBy(groupings).map(_expr.safeFieldName);
        transform.push(stackTransform);
        _scope.addTransforms(globalScope.data, ...transform);
        const span = [
            names.lastField,
            names.firstField
        ].map((f)=>`datum[${JSON.stringify(f)}]`
        ).join(' - ');
        const offsets = {
            x: _scope.addOffsets(parentScope.offsets.x, horizontal ? `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.w})` : ''),
            y: _scope.addOffsets(parentScope.offsets.y, horizontal ? '' : `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.h})`),
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
                    depth: [
                        {
                            test: _selection.testForCollapseSelection(),
                            value: 0
                        },
                        {
                            scale: names.zScale,
                            field: _expr.safeFieldName(z.name)
                        }
                    ]
                })
            }
        };
        _scope.addMarks(globalScope.markGroup, mark);
        let percentageScale;
        if (addPercentageScale) percentageScale = [
            {
                type: 'linear',
                name: names.scale,
                domain: [
                    0,
                    100
                ],
                range: horizontal ? [
                    0,
                    {
                        signal: parentScope.sizeSignals.layoutWidth
                    }
                ] : [
                    {
                        signal: parentScope.sizeSignals.layoutHeight
                    },
                    0
                ]
            }
        ];
        return {
            globalScales: {
                showAxes: true,
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

},{"./layout":"8pPe8","../constants":"1t33I","../expr":"2IX4W","../scope":"lHDQD","../selection":"gqqkZ","../zBase":"g4Q8y","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"6XNP4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Treemap", ()=>Treemap
);
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var _layout = require("./layout");
var _constants = require("../constants");
var _expr = require("../expr");
var _scope = require("../scope");
var _selection = require("../selection");
var _zBase = require("../zBase");
class Treemap extends _layout.Layout {
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
        const { names , props: props1  } = this;
        const { globalScope , parentScope , treeMapMethod , z  } = props1;
        const zScale = _zBase.addZScale(z, globalScope.zSize, globalScope.data.name, names.zScale);
        const offsets = {
            x: _scope.addOffsets(parentScope.offsets.x, fn(names.fieldX0)),
            y: _scope.addOffsets(parentScope.offsets.y, fn(names.fieldY0)),
            h: subtract(names.fieldY1, names.fieldY0),
            w: subtract(names.fieldX1, names.fieldX0)
        };
        const mark = this.transformedMark(offsets);
        _scope.addSignals(globalScope.scope, {
            name: _constants.SignalNames.TreeMapMethod,
            value: 'squarify',
            bind: {
                name: treeMapMethod,
                input: 'select',
                options: [
                    'squarify',
                    'binary'
                ]
            }
        });
        return Object.assign(Object.assign({
        }, z && {
            globalScales: {
                showAxes: true,
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
        const { names , props: props1  } = this;
        const { globalScope , groupings , parentScope  } = props1;
        if (groupings.length) {
            //treemap transform can't have it's boundary size grouped, so we need to facet the data.
            _scope.addData(globalScope.scope, {
                name: names.dataHeightWidth,
                source: globalScope.markDataName,
                transform: [
                    {
                        type: 'formula',
                        expr: parentScope.offsets.h,
                        as: names.fieldHeight
                    },
                    {
                        type: 'formula',
                        expr: parentScope.offsets.w,
                        as: names.fieldWidth
                    }
                ]
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
                        groupby: _scope.getGroupBy(groupings).map(_expr.safeFieldName)
                    }
                },
                data: [
                    {
                        name: names.dataExtents,
                        source: names.dataFacet,
                        transform: [
                            {
                                type: 'extent',
                                field: names.fieldHeight,
                                signal: names.heightExtent
                            },
                            {
                                type: 'extent',
                                field: names.fieldWidth,
                                signal: names.widthExtent
                            }
                        ]
                    },
                    treemapData
                ]
            };
            globalScope.setMarkDataName(names.dataFacetMark);
            _scope.addMarks(globalScope.markGroup, facets);
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
        const { names , prefix , props: props1  } = this;
        const { z  } = props1;
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
                    depth: [
                        {
                            test: _selection.testForCollapseSelection(),
                            value: 0
                        },
                        {
                            scale: names.zScale,
                            field: _expr.safeFieldName(z.name)
                        }
                    ]
                })
            }
        };
        _scope.addMarks(markParent, mark);
        return mark;
    }
    treemapTransform(treemapData, widthSignal, heightSignal) {
        const { names , props: props1  } = this;
        const { group , size  } = props1;
        _scope.addTransforms(treemapData, {
            type: 'filter',
            expr: `datum[${JSON.stringify(size.name)}] > 0`
        }, {
            type: 'nest',
            keys: [
                group && group.name || '__NONE__'
            ]
        }, {
            type: 'treemap',
            field: _expr.safeFieldName(size.name),
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
            size: [
                {
                    signal: widthSignal
                },
                {
                    signal: heightSignal
                }
            ],
            as: [
                names.fieldX0,
                names.fieldY0,
                names.fieldX1,
                names.fieldY1,
                names.fieldDepth,
                names.fieldChildren
            ]
        });
    }
}
function fn(n) {
    return `datum[${JSON.stringify(n)}]`;
}
function subtract(...fields) {
    return fields.map((n)=>fn(n)
    ).join(' - ');
}

},{"./layout":"8pPe8","../constants":"1t33I","../expr":"2IX4W","../scope":"lHDQD","../selection":"gqqkZ","../zBase":"g4Q8y","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"6iuK6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Wrap", ()=>Wrap
);
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
class Wrap extends _layout.Layout {
    constructor(props){
        super(props);
        this.props = props;
        const p = this.prefix = `wrap_${this.id}`;
        this.bin = _bin.binnable(this.prefix, props.globalScope.data.name, props.groupby);
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
        const { bin , names , prefix , props: props1  } = this;
        const { axisTextColor , cellTitles , globalScope , parentScope  } = props1;
        let ordinalBinData;
        if (bin.native === false) {
            _scope.addSignals(globalScope.scope, ...bin.signals);
            _scope.addTransforms(globalScope.data, ...bin.transforms);
            _scope.addData(globalScope.scope, bin.dataSequence);
            _scope.addTransforms(bin.dataSequence, {
                type: 'formula',
                expr: `indata(${JSON.stringify(globalScope.data.name)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                as: _constants.FieldNames.Contains
            });
            ordinalBinData = bin.dataSequence.name;
        } else {
            const ord = _ordinal.createOrdinals(globalScope.data.name, prefix, bin.fields, 'ascending');
            _scope.addData(globalScope.scope, ord.data);
            ordinalBinData = ord.data.name;
        }
        _scope.addData(globalScope.scope, {
            name: names.rxc0,
            transform: [
                {
                    type: 'sequence',
                    start: 1,
                    stop: {
                        signal: `ceil(sqrt(${names.dataLength})) + 1`
                    }
                },
                {
                    type: 'formula',
                    expr: `ceil(${names.dataLength} / datum.data)`,
                    as: 'complement'
                }
            ]
        }, {
            name: names.rxc1,
            source: names.rxc0,
            transform: [
                {
                    type: 'project',
                    fields: [
                        'data'
                    ],
                    as: [
                        'cols'
                    ]
                }
            ]
        }, {
            name: names.rxc2,
            source: names.rxc0,
            transform: [
                {
                    type: 'project',
                    fields: [
                        'complement'
                    ],
                    as: [
                        'cols'
                    ]
                }
            ]
        }, {
            name: names.rxc,
            source: [
                names.rxc1,
                names.rxc2
            ],
            transform: [
                {
                    type: 'formula',
                    expr: `ceil(${names.dataLength} / datum.cols)`,
                    as: 'rows'
                },
                {
                    type: 'formula',
                    expr: `${parentScope.sizeSignals.layoutWidth} / datum.cols`,
                    as: 'cellw'
                },
                {
                    type: 'formula',
                    expr: `datum.cols === 1 ? max(datum.cellw, ${_constants.SignalNames.MinCellWidth}) : datum.cellw`,
                    as: 'cellw'
                },
                {
                    type: 'formula',
                    expr: `${parentScope.sizeSignals.layoutHeight} / datum.rows`,
                    as: 'cellh'
                },
                {
                    type: 'formula',
                    expr: `datum.rows === 1 ? max(datum.cellh, ${_constants.SignalNames.MinCellHeight}) : datum.cellh`,
                    as: 'cellh'
                },
                {
                    type: 'formula',
                    expr: `(datum.cellw >= ${_constants.SignalNames.MinCellWidth} && datum.cellh >= ${_constants.SignalNames.MinCellHeight})`,
                    as: 'meetsmin'
                },
                {
                    type: 'filter',
                    expr: 'datum.meetsmin'
                },
                {
                    type: 'formula',
                    expr: 'datum.cellw / datum.cellh',
                    as: names.aspect
                },
                {
                    type: 'formula',
                    expr: `abs(datum.${names.aspect} - ${names.target})`,
                    as: names.idealAspect
                },
                {
                    type: 'formula',
                    expr: `${names.dataLength} / (datum.cols * datum.rows)`,
                    as: 'coverage'
                },
                {
                    type: 'collect',
                    sort: {
                        field: [
                            names.idealAspect,
                            'coverage'
                        ],
                        order: [
                            'ascending',
                            'descending'
                        ]
                    }
                }
            ]
        }, {
            name: names.rowColumnDataName,
            source: ordinalBinData,
            transform: [
                {
                    type: 'formula',
                    expr: `floor((datum[${JSON.stringify(_constants.FieldNames.Ordinal)}] - 1) / ${names.colCount})`,
                    as: _constants.FieldNames.WrapRow
                },
                {
                    type: 'formula',
                    expr: `(datum[${JSON.stringify(_constants.FieldNames.Ordinal)}] - 1) % ${names.colCount}`,
                    as: _constants.FieldNames.WrapCol
                },
                {
                    type: 'formula',
                    expr: _facetSearch.serializeAsVegaExpression(bin, _constants.FieldNames.First, _constants.FieldNames.Last),
                    as: _constants.FieldNames.FacetSearch
                },
                {
                    type: 'formula',
                    expr: _facetSearch.displayBin(bin),
                    as: _constants.FieldNames.FacetTitle
                }
            ]
        });
        const dataOut = {
            name: names.outputData,
            source: globalScope.data.name,
            transform: [
                {
                    type: 'lookup',
                    from: names.rowColumnDataName,
                    key: _expr.safeFieldName(bin.fields[0]),
                    fields: [
                        bin.fields[0]
                    ].map(_expr.safeFieldName),
                    values: [
                        _constants.FieldNames.WrapRow,
                        _constants.FieldNames.WrapCol
                    ]
                }
            ]
        };
        _scope.addData(globalScope.scope, dataOut);
        globalScope.setMarkDataName(names.outputData);
        _scope.addSignals(globalScope.scope, {
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
        _signals.modifySignal(globalScope.signals.plotHeightOut, 'max', `(${names.cellHeight} * ceil(${names.dataLength} / ${names.colCount}))`);
        _signals.modifySignal(globalScope.signals.plotWidthOut, 'max', `(${names.cellWidth} * ${names.colCount})`);
        const signalH = [
            names.cellHeight,
            _constants.SignalNames.FacetPaddingTop,
            _constants.SignalNames.FacetPaddingBottom
        ].join(' - ');
        const signalW = [
            names.cellWidth,
            _constants.SignalNames.FacetPaddingLeft
        ].join(' - ');
        const signalX = _scope.addOffsets(parentScope.offsets.x, `datum[${JSON.stringify(_constants.FieldNames.WrapCol)}] * ${names.cellWidth}`, _constants.SignalNames.FacetPaddingLeft);
        const signalY = _scope.addOffsets(parentScope.offsets.y, `datum[${JSON.stringify(_constants.FieldNames.WrapRow)}] * ${names.cellHeight}`, _constants.SignalNames.FacetPaddingTop);
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
        _scope.addMarks(globalScope.markGroup, group);
        const sizeSignals = {
            layoutHeight: `(${names.cellHeight} - ${_constants.SignalNames.FacetPaddingTop} - ${_constants.SignalNames.FacetPaddingBottom})`,
            layoutWidth: `(${names.cellWidth} - ${_constants.SignalNames.FacetPaddingLeft})`,
            colCount: names.colCount,
            rowCount: `ceil(${names.dataLength} / ${names.colCount})`
        };
        if (cellTitles) _facetTitle.addFacetCellTitles(group, sizeSignals, axisTextColor);
        return {
            facetScope: group,
            sizeSignals,
            offsets
        };
    }
}

},{"./layout":"8pPe8","../bin":"gwlvx","../constants":"1t33I","../expr":"2IX4W","../facetSearch":"5bHzS","../facetTitle":"bSVTk","../ordinal":"iy5ix","../scope":"lHDQD","../signals":"hwNqr","@parcel/transformer-js/src/esmodule-helpers.js":"jMF8S"}],"6lM8D":[function(require,module,exports) {

},{}],"jrCG9":[function(require,module,exports) {

},{}]},["jbvTk"], "jbvTk", "parcelRequired43a")

