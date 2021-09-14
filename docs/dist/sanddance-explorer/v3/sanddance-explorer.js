(() => {
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule') {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequiredb83"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequiredb83"] = parcelRequire;
}
var $b6499bcf1ffc0a3b$exports = {};

$parcel$export($b6499bcf1ffc0a3b$exports, "controls", () => $ea687581edf48e56$exports);
$parcel$export($b6499bcf1ffc0a3b$exports, "getEmbedHTML", () => $ddc28421fe6d69d0$export$5e624397755a2e0);
$parcel$export($b6499bcf1ffc0a3b$exports, "SideTabId", () => $065798d25a9d250c$export$b264ae1d75dc4e4e);
$parcel$export($b6499bcf1ffc0a3b$exports, "use", () => $c5e1961a7f97a459$export$44747fb0056adba5);
$parcel$export($b6499bcf1ffc0a3b$exports, "capabilities", () => $3669ee32f5f0d5ff$export$33f60a5e15d39c82);
$parcel$export($b6499bcf1ffc0a3b$exports, "getColorSettingsFromThemePalette", () => $ffac552ad0872994$export$b3e0424e22817deb);
$parcel$export($b6499bcf1ffc0a3b$exports, "themePalettes", () => $ffac552ad0872994$export$ab53ba4bd9c9d2ec);
$parcel$export($b6499bcf1ffc0a3b$exports, "SandDance", () => $385418a87250916e$exports);
$parcel$export($b6499bcf1ffc0a3b$exports, "util", () => $6e437f743d80b3ba$exports);
$parcel$export($b6499bcf1ffc0a3b$exports, "version", () => $211e3c3b38323927$export$aef83baa0e7093df);
var $ea687581edf48e56$exports = {};
var $3456628043e62c6c$exports = {};

$parcel$export($3456628043e62c6c$exports, "Dialog", () => $3456628043e62c6c$export$d64e687ef4853cae);



const $6b702e1ad8ceb63e$export$afadbaa7ce934629 = 200;
function $6b702e1ad8ceb63e$export$30a13326eaae8e00(props) {
    const newProps = Object.assign({
    }, props);
    let selectedKey = null;
    if (newProps.options && newProps.options.length > 1) {
        const selectedOptions = newProps.options.filter((option)=>option.selected
        );
        if (selectedOptions && selectedOptions.length > 0) selectedKey = selectedOptions[0].key;
    }
    if (newProps.collapseLabel) newProps.onRenderTitle = (a, b)=>{
        return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("span", null, newProps.label, ": ", a[0].text);
    };
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Dropdown, Object.assign({
        dropdownWidth: $6b702e1ad8ceb63e$export$afadbaa7ce934629
    }, newProps, {
        label: newProps.collapseLabel ? null : newProps.label,
        selectedKey: selectedKey
    }));
}


var $385418a87250916e$exports = {};

$parcel$export($385418a87250916e$exports, "use", () => $385418a87250916e$export$44747fb0056adba5);
$parcel$export($385418a87250916e$exports, "colorSchemes", () => $c70916a34f2bf3db$export$4b303fbe85a206f6);
$parcel$export($385418a87250916e$exports, "constants", () => $a3b399caf5d2c16b$exports);
$parcel$export($385418a87250916e$exports, "searchExpression", () => $311a0d2a8fe80ff7$exports);
$parcel$export($385418a87250916e$exports, "specs", () => $2b1a2fc98adbe4f1$exports);
$parcel$export($385418a87250916e$exports, "types", () => $e41d8194c950c589$exports);
$parcel$export($385418a87250916e$exports, "util", () => $406c1b16a5bd3c44$exports);
$parcel$export($385418a87250916e$exports, "VegaDeckGl", () => $7f572b57d5948475$exports);
$parcel$export($385418a87250916e$exports, "Viewer", () => $cd7c0c51e96048d8$exports.Viewer);
$parcel$export($385418a87250916e$exports, "version", () => $dc138f04a6edaf73$export$aef83baa0e7093df);
var $a3b399caf5d2c16b$exports = {};

$parcel$export($a3b399caf5d2c16b$exports, "GL_ORDINAL", () => $a3b399caf5d2c16b$export$b86d149b7c15b53e);
$parcel$export($a3b399caf5d2c16b$exports, "ColorScaleNone", () => $146eeb4362821b4b$export$e1b9a037ce7886e5);
$parcel$export($a3b399caf5d2c16b$exports, "FieldNames", () => $146eeb4362821b4b$export$29b3fae588fa046f);
$parcel$export($a3b399caf5d2c16b$exports, "ScaleNames", () => $146eeb4362821b4b$export$9a32a517dc4aa15a);
$parcel$export($a3b399caf5d2c16b$exports, "SignalNames", () => $146eeb4362821b4b$export$e97f264ccfdb1383);
var $2b1a2fc98adbe4f1$exports = {};
var $4d5208b78df53d91$exports = {};

$parcel$export($4d5208b78df53d91$exports, "build", () => $4d5208b78df53d91$export$169a89f54f090971);
var $146eeb4362821b4b$exports = {};

$parcel$export($146eeb4362821b4b$exports, "SignalNames", () => $146eeb4362821b4b$export$e97f264ccfdb1383);
$parcel$export($146eeb4362821b4b$exports, "FieldNames", () => $146eeb4362821b4b$export$29b3fae588fa046f);
$parcel$export($146eeb4362821b4b$exports, "Other", () => $146eeb4362821b4b$export$8dc108353b27858);
$parcel$export($146eeb4362821b4b$exports, "ColorScaleNone", () => $146eeb4362821b4b$export$e1b9a037ce7886e5);
$parcel$export($146eeb4362821b4b$exports, "ScaleNames", () => $146eeb4362821b4b$export$9a32a517dc4aa15a);
const $146eeb4362821b4b$export$29b3fae588fa046f = {
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
const $146eeb4362821b4b$export$9a32a517dc4aa15a = {
    Color: 'scale_color',
    X: 'scale_x',
    Y: 'scale_y',
    Z: 'scale_z'
};
const $146eeb4362821b4b$export$e97f264ccfdb1383 = {
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
const $146eeb4362821b4b$export$8dc108353b27858 = '__Other';
const $146eeb4362821b4b$export$e1b9a037ce7886e5 = 'none';


const $d6acc81334b00d34$export$65229671e3d10c38 = 10;
const $d6acc81334b00d34$export$ab77596ad9a9a1f = 100;
const $d6acc81334b00d34$export$30d18778981eac54 = 15;
const $d6acc81334b00d34$export$9575804afbd9861b = 140;
const $d6acc81334b00d34$export$f6f90abbea75f1e0 = 180;
const $d6acc81334b00d34$export$3edaaab3bd4d1562 = 40;
const $d6acc81334b00d34$export$fa0456f55c73c7db = 40;
const $d6acc81334b00d34$export$270d92c8ba3779cc = 40;
const $d6acc81334b00d34$export$ca35a368a1db7499 = 40;
const $d6acc81334b00d34$export$bb1d81a2e772919b = 100;
const $d6acc81334b00d34$export$1d47b037cd4e8baa = 100;
const $d6acc81334b00d34$export$a4d60686dcce912 = 30;
const $d6acc81334b00d34$export$ee365cabf3b6c6 = 60;
const $d6acc81334b00d34$export$bfd91bf10acf0a22 = 69;
const $d6acc81334b00d34$export$9040dcec103623d1 = 92;
const $d6acc81334b00d34$export$1256463ddc3abfcf = 120;
const $d6acc81334b00d34$export$7ccb1c0a7972a85f = 120;
const $d6acc81334b00d34$export$fc724d34e5358887 = 10;
const $d6acc81334b00d34$export$2adbe44cf52133e9 = 20;


function $70adb8d24ee41c9b$export$39a639737c9fd43a(specContext) {
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


function $865e6885fab52a99$export$9099ad97b570f7c(specContext) {
    const { insight: insight , specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
    const { language: language  } = specViewOptions;
    const bandProps = {
        orientation: 'horizontal',
        groupby: {
            column: specColumns.y,
            defaultBins: $d6acc81334b00d34$export$65229671e3d10c38,
            maxbinsSignalName: $146eeb4362821b4b$export$e97f264ccfdb1383.YBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
            maxbins: $d6acc81334b00d34$export$ab77596ad9a9a1f
        },
        minBandWidth: $d6acc81334b00d34$export$30d18778981eac54,
        showAxes: true
    };
    const x = {
        title: null
    };
    const axisScales = {
        x: x,
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
        axisScales: axisScales,
        layouts: layouts,
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
                        $146eeb4362821b4b$export$e97f264ccfdb1383.YBins
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
                    allowNone: $70adb8d24ee41c9b$export$39a639737c9fd43a,
                    excludeCategoric: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.TreeMapMethod
                    ]
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetVBins
                    ]
                }
            ]
        }
    };
}





function $4bcb0de5c846a6d5$export$9099ad97b570f7c(specContext) {
    const { insight: insight , specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
    const { language: language  } = specViewOptions;
    const bandProps = {
        orientation: 'vertical',
        groupby: {
            column: specColumns.x,
            defaultBins: $d6acc81334b00d34$export$65229671e3d10c38,
            maxbinsSignalName: $146eeb4362821b4b$export$e97f264ccfdb1383.XBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
            maxbins: $d6acc81334b00d34$export$ab77596ad9a9a1f
        },
        minBandWidth: $d6acc81334b00d34$export$30d18778981eac54,
        showAxes: true
    };
    const y = {
        title: null
    };
    const axisScales = {
        x: {
            title: specColumns.x && specColumns.x.name
        },
        y: y,
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
        axisScales: axisScales,
        layouts: layouts,
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
                        $146eeb4362821b4b$export$e97f264ccfdb1383.XBins
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
                    allowNone: $70adb8d24ee41c9b$export$39a639737c9fd43a,
                    excludeCategoric: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.TreeMapMethod
                    ]
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetVBins
                    ]
                }
            ]
        }
    };
}





function $5711d986ee4e7fa7$export$9099ad97b570f7c(specContext) {
    const { insight: insight , specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
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
            defaultBins: $d6acc81334b00d34$export$65229671e3d10c38,
            maxbinsSignalName: $146eeb4362821b4b$export$e97f264ccfdb1383.YBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
            maxbins: $d6acc81334b00d34$export$ab77596ad9a9a1f
        },
        minBandWidth: $d6acc81334b00d34$export$30d18778981eac54,
        showAxes: true
    };
    const vBandProps = {
        excludeEncodingRuleMap: true,
        orientation: 'vertical',
        groupby: {
            column: specColumns.x,
            defaultBins: $d6acc81334b00d34$export$65229671e3d10c38,
            maxbinsSignalName: $146eeb4362821b4b$export$e97f264ccfdb1383.XBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
            maxbins: $d6acc81334b00d34$export$ab77596ad9a9a1f
        },
        minBandWidth: $d6acc81334b00d34$export$30d18778981eac54,
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
        axisScales: axisScales,
        layouts: layouts,
        specCapabilities: {
            countsAndSums: true,
            roles: [
                {
                    role: 'x',
                    binnable: true,
                    axisSelection: specColumns.x && specColumns.x.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.XBins
                    ]
                },
                {
                    role: 'y',
                    binnable: true,
                    axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.YBins
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
                    allowNone: $70adb8d24ee41c9b$export$39a639737c9fd43a,
                    excludeCategoric: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.TreeMapMethod
                    ]
                },
                {
                    role: 'facet',
                    allowNone: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetVBins
                    ]
                }
            ]
        }
    };
}



function $bc5409396cd1cad9$export$9099ad97b570f7c(specContext) {
    const { specColumns: specColumns  } = specContext;
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
        axisScales: axisScales,
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
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetVBins
                    ]
                }
            ]
        }
    };
}



function $8b05b9f953431d09$export$9099ad97b570f7c(specContext) {
    const { specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
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
        axisScales: axisScales,
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
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetVBins
                    ]
                }
            ],
            signals: [
                $146eeb4362821b4b$export$e97f264ccfdb1383.PointScale,
                $146eeb4362821b4b$export$e97f264ccfdb1383.ZGrounded
            ]
        }
    };
}




function $13c871ba05733408$export$9099ad97b570f7c(specContext) {
    const { specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
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
            defaultBins: $d6acc81334b00d34$export$65229671e3d10c38,
            maxbinsSignalName: $146eeb4362821b4b$export$e97f264ccfdb1383.YBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
            maxbins: $d6acc81334b00d34$export$ab77596ad9a9a1f
        },
        minBandWidth: $d6acc81334b00d34$export$30d18778981eac54,
        showAxes: true
    };
    const vBandProps = {
        excludeEncodingRuleMap: true,
        orientation: 'vertical',
        groupby: {
            column: specColumns.x,
            defaultBins: $d6acc81334b00d34$export$65229671e3d10c38,
            maxbinsSignalName: $146eeb4362821b4b$export$e97f264ccfdb1383.XBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
            maxbins: $d6acc81334b00d34$export$ab77596ad9a9a1f
        },
        minBandWidth: $d6acc81334b00d34$export$30d18778981eac54,
        showAxes: true
    };
    const stackProps = {
        sort: specColumns.sort
    };
    return {
        axisScales: axisScales,
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
                        $146eeb4362821b4b$export$e97f264ccfdb1383.XBins
                    ]
                },
                {
                    role: 'y',
                    binnable: true,
                    axisSelection: specColumns.y && specColumns.y.quantitative ? 'range' : 'exact',
                    axisSelectionBetweenTicks: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.YBins
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
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetVBins
                    ]
                }
            ]
        }
    };
}



function $6aeafd0fb264ea31$export$9099ad97b570f7c(specContext) {
    const { specColumns: specColumns  } = specContext;
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
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetVBins
                    ]
                }
            ]
        }
    };
}



function $592fc2648feb003d$export$9099ad97b570f7c(specContext) {
    const { specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
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
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetBins
                    ]
                },
                {
                    role: 'facetV',
                    allowNone: true,
                    signals: [
                        $146eeb4362821b4b$export$e97f264ccfdb1383.FacetVBins
                    ]
                }
            ],
            signals: [
                $146eeb4362821b4b$export$e97f264ccfdb1383.TreeMapMethod
            ]
        }
    };
}



function $ace849a6dc2f6251$export$343ebc577272c81a(facetStyle, facetColumn, facetVColumn, axisTextColor) {
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
                    bottom: $d6acc81334b00d34$export$270d92c8ba3779cc,
                    left: $d6acc81334b00d34$export$3edaaab3bd4d1562,
                    top: 0
                };
                plotPadding.y = $d6acc81334b00d34$export$fa0456f55c73c7db;
                plotPadding.x = $d6acc81334b00d34$export$ca35a368a1db7499;
                break;
            }
        case 'wrap':
        default:
            {
                const props = {
                    axisTextColor: axisTextColor,
                    cellTitles: true,
                    groupby: groupby
                };
                layoutPair = {
                    layoutType: 'Wrap',
                    props: props
                };
                facetPadding = {
                    bottom: $d6acc81334b00d34$export$270d92c8ba3779cc,
                    left: $d6acc81334b00d34$export$3edaaab3bd4d1562,
                    top: $d6acc81334b00d34$export$fa0456f55c73c7db
                };
                break;
            }
    }
    const facetLayout = {
        facetPadding: facetPadding,
        plotPadding: plotPadding
    };
    return {
        layoutPair: layoutPair,
        facetLayout: facetLayout
    };
}




const $5dcad97ed164a566$var$map = {
    barchart: $4bcb0de5c846a6d5$export$9099ad97b570f7c,
    barchartH: $865e6885fab52a99$export$9099ad97b570f7c,
    barchartV: $4bcb0de5c846a6d5$export$9099ad97b570f7c,
    density: $5711d986ee4e7fa7$export$9099ad97b570f7c,
    grid: $bc5409396cd1cad9$export$9099ad97b570f7c,
    scatterplot: $8b05b9f953431d09$export$9099ad97b570f7c,
    stacks: $13c871ba05733408$export$9099ad97b570f7c,
    strips: $6aeafd0fb264ea31$export$9099ad97b570f7c,
    treemap: $592fc2648feb003d$export$9099ad97b570f7c
};
function $5dcad97ed164a566$export$c48d4298c35d80ce(specContext) {
    const { insight: insight , specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
    const fn = $5dcad97ed164a566$var$map[insight.chart];
    if (fn) {
        const props = fn(specContext);
        if (insight.columns.facet) {
            const discreteFacetColumn = {
                column: specColumns.facet,
                defaultBins: $d6acc81334b00d34$export$65229671e3d10c38,
                maxbins: $d6acc81334b00d34$export$ab77596ad9a9a1f,
                maxbinsSignalDisplayName: specViewOptions.language.FacetMaxBins,
                maxbinsSignalName: $146eeb4362821b4b$export$e97f264ccfdb1383.FacetBins
            };
            const discreteFacetVColumn = {
                column: specColumns.facetV,
                defaultBins: $d6acc81334b00d34$export$65229671e3d10c38,
                maxbins: $d6acc81334b00d34$export$ab77596ad9a9a1f,
                maxbinsSignalDisplayName: specViewOptions.language.FacetVMaxBins,
                maxbinsSignalName: $146eeb4362821b4b$export$e97f264ccfdb1383.FacetVBins
            };
            const { facetLayout: facetLayout , layoutPair: layoutPair  } = $ace849a6dc2f6251$export$343ebc577272c81a(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn, specViewOptions.colors.axisText);
            props.layouts.unshift(layoutPair);
            props.facetLayout = facetLayout;
        }
        return props;
    }
}


var $0ebaa52647c6073e$exports = {};

$parcel$export($0ebaa52647c6073e$exports, "getColumnsFromData", () => $0ebaa52647c6073e$export$d25d2216dc7fff5a);
$parcel$export($0ebaa52647c6073e$exports, "getStats", () => $0ebaa52647c6073e$export$4c75e2c8266a336d);
$parcel$export($0ebaa52647c6073e$exports, "inferAll", () => $0ebaa52647c6073e$export$47bd397f706b4d82);
$parcel$export($0ebaa52647c6073e$exports, "getSpecColumns", () => $0ebaa52647c6073e$export$301044eba61980a8);
function $c6ab9564582a00e6$export$9099ad97b570f7c(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
}
function $c6ab9564582a00e6$export$46e35401bc090c62(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for(var key in definition)prototype[key] = definition[key];
    return prototype;
}


function $e57f9510c1a44a77$export$e4830c8e55b4f80d() {
}
var $e57f9510c1a44a77$export$a49b5ca9db8c9416 = 0.7;
var $e57f9510c1a44a77$export$acf32b1b82ce4fe7 = 1 / $e57f9510c1a44a77$export$a49b5ca9db8c9416;
var $e57f9510c1a44a77$var$reI = "\\s*([+-]?\\d+)\\s*", $e57f9510c1a44a77$var$reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", $e57f9510c1a44a77$var$reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $e57f9510c1a44a77$var$reHex = /^#([0-9a-f]{3,8})$/, $e57f9510c1a44a77$var$reRgbInteger = new RegExp("^rgb\\(" + [
    $e57f9510c1a44a77$var$reI,
    $e57f9510c1a44a77$var$reI,
    $e57f9510c1a44a77$var$reI
] + "\\)$"), $e57f9510c1a44a77$var$reRgbPercent = new RegExp("^rgb\\(" + [
    $e57f9510c1a44a77$var$reP,
    $e57f9510c1a44a77$var$reP,
    $e57f9510c1a44a77$var$reP
] + "\\)$"), $e57f9510c1a44a77$var$reRgbaInteger = new RegExp("^rgba\\(" + [
    $e57f9510c1a44a77$var$reI,
    $e57f9510c1a44a77$var$reI,
    $e57f9510c1a44a77$var$reI,
    $e57f9510c1a44a77$var$reN
] + "\\)$"), $e57f9510c1a44a77$var$reRgbaPercent = new RegExp("^rgba\\(" + [
    $e57f9510c1a44a77$var$reP,
    $e57f9510c1a44a77$var$reP,
    $e57f9510c1a44a77$var$reP,
    $e57f9510c1a44a77$var$reN
] + "\\)$"), $e57f9510c1a44a77$var$reHslPercent = new RegExp("^hsl\\(" + [
    $e57f9510c1a44a77$var$reN,
    $e57f9510c1a44a77$var$reP,
    $e57f9510c1a44a77$var$reP
] + "\\)$"), $e57f9510c1a44a77$var$reHslaPercent = new RegExp("^hsla\\(" + [
    $e57f9510c1a44a77$var$reN,
    $e57f9510c1a44a77$var$reP,
    $e57f9510c1a44a77$var$reP,
    $e57f9510c1a44a77$var$reN
] + "\\)$");
var $e57f9510c1a44a77$var$named = {
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
$c6ab9564582a00e6$export$9099ad97b570f7c($e57f9510c1a44a77$export$e4830c8e55b4f80d, $e57f9510c1a44a77$export$9099ad97b570f7c, {
    copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
        return this.rgb().displayable();
    },
    hex: $e57f9510c1a44a77$var$color_formatHex,
    formatHex: $e57f9510c1a44a77$var$color_formatHex,
    formatHsl: $e57f9510c1a44a77$var$color_formatHsl,
    formatRgb: $e57f9510c1a44a77$var$color_formatRgb,
    toString: $e57f9510c1a44a77$var$color_formatRgb
});
function $e57f9510c1a44a77$var$color_formatHex() {
    return this.rgb().formatHex();
}
function $e57f9510c1a44a77$var$color_formatHsl() {
    return $e57f9510c1a44a77$export$8269f892f57a576a(this).formatHsl();
}
function $e57f9510c1a44a77$var$color_formatRgb() {
    return this.rgb().formatRgb();
}
function $e57f9510c1a44a77$export$9099ad97b570f7c(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = $e57f9510c1a44a77$var$reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? $e57f9510c1a44a77$var$rgbn(m) // #ff0000
     : l === 3 ? new $e57f9510c1a44a77$export$224ee6128901ddf4(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) // #f00
     : l === 8 ? $e57f9510c1a44a77$var$rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) // #ff000000
     : l === 4 ? $e57f9510c1a44a77$var$rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) // #f000
     : null) : (m = $e57f9510c1a44a77$var$reRgbInteger.exec(format)) ? new $e57f9510c1a44a77$export$224ee6128901ddf4(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
     : (m = $e57f9510c1a44a77$var$reRgbPercent.exec(format)) ? new $e57f9510c1a44a77$export$224ee6128901ddf4(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
     : (m = $e57f9510c1a44a77$var$reRgbaInteger.exec(format)) ? $e57f9510c1a44a77$var$rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
     : (m = $e57f9510c1a44a77$var$reRgbaPercent.exec(format)) ? $e57f9510c1a44a77$var$rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
     : (m = $e57f9510c1a44a77$var$reHslPercent.exec(format)) ? $e57f9510c1a44a77$var$hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
     : (m = $e57f9510c1a44a77$var$reHslaPercent.exec(format)) ? $e57f9510c1a44a77$var$hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
     : $e57f9510c1a44a77$var$named.hasOwnProperty(format) ? $e57f9510c1a44a77$var$rgbn($e57f9510c1a44a77$var$named[format]) // eslint-disable-line no-prototype-builtins
     : format === "transparent" ? new $e57f9510c1a44a77$export$224ee6128901ddf4(NaN, NaN, NaN, 0) : null;
}
function $e57f9510c1a44a77$var$rgbn(n) {
    return new $e57f9510c1a44a77$export$224ee6128901ddf4(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function $e57f9510c1a44a77$var$rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new $e57f9510c1a44a77$export$224ee6128901ddf4(r, g, b, a);
}
function $e57f9510c1a44a77$export$7138c6bf7ee5608c(o) {
    if (!(o instanceof $e57f9510c1a44a77$export$e4830c8e55b4f80d)) o = $e57f9510c1a44a77$export$9099ad97b570f7c(o);
    if (!o) return new $e57f9510c1a44a77$export$224ee6128901ddf4;
    o = o.rgb();
    return new $e57f9510c1a44a77$export$224ee6128901ddf4(o.r, o.g, o.b, o.opacity);
}
function $e57f9510c1a44a77$export$1b3a2af3f3cd47f6(r, g, b, opacity) {
    return arguments.length === 1 ? $e57f9510c1a44a77$export$7138c6bf7ee5608c(r) : new $e57f9510c1a44a77$export$224ee6128901ddf4(r, g, b, opacity == null ? 1 : opacity);
}
function $e57f9510c1a44a77$export$224ee6128901ddf4(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
}
$c6ab9564582a00e6$export$9099ad97b570f7c($e57f9510c1a44a77$export$224ee6128901ddf4, $e57f9510c1a44a77$export$1b3a2af3f3cd47f6, $c6ab9564582a00e6$export$46e35401bc090c62($e57f9510c1a44a77$export$e4830c8e55b4f80d, {
    brighter: function(k) {
        k = k == null ? $e57f9510c1a44a77$export$acf32b1b82ce4fe7 : Math.pow($e57f9510c1a44a77$export$acf32b1b82ce4fe7, k);
        return new $e57f9510c1a44a77$export$224ee6128901ddf4(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? $e57f9510c1a44a77$export$a49b5ca9db8c9416 : Math.pow($e57f9510c1a44a77$export$a49b5ca9db8c9416, k);
        return new $e57f9510c1a44a77$export$224ee6128901ddf4(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
        return this;
    },
    displayable: function() {
        return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: $e57f9510c1a44a77$var$rgb_formatHex,
    formatHex: $e57f9510c1a44a77$var$rgb_formatHex,
    formatRgb: $e57f9510c1a44a77$var$rgb_formatRgb,
    toString: $e57f9510c1a44a77$var$rgb_formatRgb
}));
function $e57f9510c1a44a77$var$rgb_formatHex() {
    return "#" + $e57f9510c1a44a77$var$hex(this.r) + $e57f9510c1a44a77$var$hex(this.g) + $e57f9510c1a44a77$var$hex(this.b);
}
function $e57f9510c1a44a77$var$rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function $e57f9510c1a44a77$var$hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
}
function $e57f9510c1a44a77$var$hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new $e57f9510c1a44a77$var$Hsl(h, s, l, a);
}
function $e57f9510c1a44a77$export$8269f892f57a576a(o) {
    if (o instanceof $e57f9510c1a44a77$var$Hsl) return new $e57f9510c1a44a77$var$Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof $e57f9510c1a44a77$export$e4830c8e55b4f80d)) o = $e57f9510c1a44a77$export$9099ad97b570f7c(o);
    if (!o) return new $e57f9510c1a44a77$var$Hsl;
    if (o instanceof $e57f9510c1a44a77$var$Hsl) return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
    } else s = l > 0 && l < 1 ? 0 : h;
    return new $e57f9510c1a44a77$var$Hsl(h, s, l, o.opacity);
}
function $e57f9510c1a44a77$export$1eaadac1dc277f81(h, s, l, opacity) {
    return arguments.length === 1 ? $e57f9510c1a44a77$export$8269f892f57a576a(h) : new $e57f9510c1a44a77$var$Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function $e57f9510c1a44a77$var$Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
}
$c6ab9564582a00e6$export$9099ad97b570f7c($e57f9510c1a44a77$var$Hsl, $e57f9510c1a44a77$export$1eaadac1dc277f81, $c6ab9564582a00e6$export$46e35401bc090c62($e57f9510c1a44a77$export$e4830c8e55b4f80d, {
    brighter: function(k) {
        k = k == null ? $e57f9510c1a44a77$export$acf32b1b82ce4fe7 : Math.pow($e57f9510c1a44a77$export$acf32b1b82ce4fe7, k);
        return new $e57f9510c1a44a77$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? $e57f9510c1a44a77$export$a49b5ca9db8c9416 : Math.pow($e57f9510c1a44a77$export$a49b5ca9db8c9416, k);
        return new $e57f9510c1a44a77$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
        return new $e57f9510c1a44a77$export$224ee6128901ddf4($e57f9510c1a44a77$var$hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), $e57f9510c1a44a77$var$hsl2rgb(h, m1, m2), $e57f9510c1a44a77$var$hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
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
/* From FvD 13.37, CSS Color Module Level 3 */ function $e57f9510c1a44a77$var$hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}



function $0ebaa52647c6073e$var$isColor(cssColorSpecifier) {
    return !!$e57f9510c1a44a77$export$9099ad97b570f7c(cssColorSpecifier);
}
function $0ebaa52647c6073e$var$isQuantitative(column) {
    return column.type === 'number' || column.type === 'integer';
}
function $0ebaa52647c6073e$export$d25d2216dc7fff5a(inferTypesFn, data, columnTypes) {
    const sample = data[0];
    const fields = sample ? Object.keys(sample) : [];
    const inferences = Object.assign(Object.assign({
    }, inferTypesFn(data, fields)), columnTypes);
    const columns = fields.map((name)=>{
        const column = {
            name: name,
            type: inferences[name]
        };
        return column;
    });
    $0ebaa52647c6073e$export$47bd397f706b4d82(columns, data);
    return columns;
}
function $0ebaa52647c6073e$export$301044eba61980a8(insight, columns) {
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
function $0ebaa52647c6073e$export$47bd397f706b4d82(columns, data) {
    columns.forEach((column)=>{
        if (column) {
            if (typeof column.quantitative !== 'boolean') column.quantitative = $0ebaa52647c6073e$var$isQuantitative(column);
            if (!column.stats) column.stats = $0ebaa52647c6073e$export$4c75e2c8266a336d(data, column);
            if (column.type === 'string' && typeof column.isColorData !== 'boolean') $0ebaa52647c6073e$var$checkIsColorData(data, column);
        }
    });
}
function $0ebaa52647c6073e$var$checkIsColorData(data, column) {
    if (!column.stats.hasColorData) {
        column.isColorData = false;
        return;
    }
    for(let i = 0; i < data.length; i++)if (!$0ebaa52647c6073e$var$isColor(data[i][column.name])) {
        column.isColorData = false;
        return;
    }
    column.isColorData = true;
}
function $0ebaa52647c6073e$export$4c75e2c8266a336d(data, column) {
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
        if (column.type === 'string' && !stats.hasColorData && $0ebaa52647c6073e$var$isColor(value)) stats.hasColorData = true;
    }
    if (column.quantitative) {
        stats.mean = data.length > 0 && sum / data.length;
        stats.hasNegative = $0ebaa52647c6073e$var$detectNegative(column, data);
        if (column.type === 'integer') stats.isSequential = $0ebaa52647c6073e$var$detectSequentialColumn(column, data);
    }
    stats.distinctValueCount = Object.keys(distinctMap).length;
    return stats;
}
function $0ebaa52647c6073e$var$detectNegative(column, data) {
    for(let i = 1; i < data.length; i++){
        if (data[i][column.name] < 0) return true;
    }
    return false;
}
function $0ebaa52647c6073e$var$detectSequentialColumn(column, data) {
    if (data.length < 2) return false;
    let colname = column.name;
    for(let i = 1; i < data.length; i++){
        if (data[i][colname] !== data[i - 1][colname] + 1) return false;
    }
    return true;
}




function $b3fb1eeac72b53ef$export$fd4ba712bc1bf9c4(scope, ...axis) {
    if (!scope.axes) scope.axes = [];
    scope.axes.push(...axis);
}
function $b3fb1eeac72b53ef$export$3af5226bf85b3fe(scope, ...data) {
    if (!scope.data) scope.data = [];
    scope.data.push(...data);
}
function $b3fb1eeac72b53ef$export$2bdeef921b699304(scope, ...marks) {
    if (!scope.marks) scope.marks = [];
    scope.marks.push(...marks);
}
function $b3fb1eeac72b53ef$export$7bc781d47112a1ca(scope, ...scale) {
    if (!scope.scales) scope.scales = [];
    scope.scales.push(...scale.filter(Boolean));
}
function $b3fb1eeac72b53ef$export$fc8966a6eac27a(scope, ...signal) {
    if (!scope.signals) scope.signals = [];
    scope.signals.push(...signal);
}
function $b3fb1eeac72b53ef$export$dd47277a33967f3(data, ...transforms) {
    if (!data.transform) data.transform = [];
    data.transform.push(...transforms);
}
function $b3fb1eeac72b53ef$export$e5cbd1d444212cf8(data, dataName) {
    for(let i = 0; i < data.length; i++){
        if (data[i].name === dataName) return {
            data: data[i],
            index: i
        };
    }
}
function $b3fb1eeac72b53ef$export$d8d50e04ceb89a80(groupings) {
    const groupby = groupings.map((g)=>g.groupby
    );
    return groupby.reduce((acc, val)=>acc.concat(val)
    , []);
}
function $b3fb1eeac72b53ef$export$69458ad3b16ec03a(...offsets) {
    return offsets.filter(Boolean).join(' + ');
}


function $5a387119767f751c$export$323335ebe3b8edf4(props) {
    const { axesOffsets: axesOffsets , axisScales: axisScales , axesScopes: axesScopes , axesTitlePadding: axesTitlePadding , allGlobalScales: allGlobalScales , globalScope: globalScope , labelBaseline: labelBaseline , plotOffsetSignals: plotOffsetSignals , specColumns: specColumns , specViewOptions: specViewOptions  } = props;
    const { scope: scope  } = globalScope;
    allGlobalScales.forEach((globalScales)=>{
        const { scales: scales  } = globalScales;
        for(let xyz in scales){
            let _scales = scales[xyz];
            if (_scales) {
                $b3fb1eeac72b53ef$export$7bc781d47112a1ca(scope, ..._scales);
                let { showAxes: showAxes  } = globalScales;
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
                            title: title,
                            horizontal: horizontal,
                            column: column,
                            specViewOptions: specViewOptions,
                            lineColor: lineColor,
                            titlePadding: axesTitlePadding[xyz],
                            labelBaseline: labelBaseline[xyz],
                            zindex: zindex
                        };
                        axesScopes['main'].forEach((a)=>$b3fb1eeac72b53ef$export$fd4ba712bc1bf9c4(a.scope, $5a387119767f751c$var$createAxis(Object.assign(Object.assign({
                            }, props1), {
                                scale: a.scale || _scales[0],
                                showTitle: a.title,
                                showLabels: a.labels,
                                showLines: a.lines
                            })))
                        );
                        if (axesScopes[xyz]) axesScopes[xyz].forEach((a)=>$b3fb1eeac72b53ef$export$fd4ba712bc1bf9c4(a.scope, $5a387119767f751c$var$createAxis(Object.assign(Object.assign({
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
function $5a387119767f751c$var$createAxis(props) {
    const { column: column , horizontal: horizontal , labelBaseline: labelBaseline , lineColor: lineColor , scale: scale , showLabels: showLabels , showTitle: showTitle , showLines: showLines , specViewOptions: specViewOptions , title: title , titlePadding: titlePadding , zindex: zindex  } = props;
    const axis = Object.assign(Object.assign(Object.assign(Object.assign({
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
            signal: horizontal ? $146eeb4362821b4b$export$e97f264ccfdb1383.TextAngleX : $146eeb4362821b4b$export$e97f264ccfdb1383.TextAngleY
        },
        titleColor: specViewOptions.colors.axisText,
        titleFontSize: {
            signal: $146eeb4362821b4b$export$e97f264ccfdb1383.TextTitleSize
        },
        titleLimit: $d6acc81334b00d34$export$1d47b037cd4e8baa,
        titlePadding: titlePadding
    }), {
        labels: showLabels
    }), showLabels && {
        labelAlign: horizontal ? 'left' : 'right',
        labelBaseline: labelBaseline,
        labelAngle: {
            signal: horizontal ? $146eeb4362821b4b$export$e97f264ccfdb1383.TextAngleX : $146eeb4362821b4b$export$e97f264ccfdb1383.TextAngleY
        },
        labelColor: specViewOptions.colors.axisText,
        labelFontSize: {
            signal: $146eeb4362821b4b$export$e97f264ccfdb1383.TextSize
        },
        labelLimit: $d6acc81334b00d34$export$bb1d81a2e772919b
    });
    if (column.quantitative) axis.format = '~r';
    return axis;
}




function $8eb7a07ca128ffbc$export$d899a523879bc85a(field) {
    return field.replace('.', '\\.').replace('[', '\\[').replace(']', '\\]');
}
function $8eb7a07ca128ffbc$export$2c8af6107006eb60(field) {
    //remove whitespace, period, accessors and logical modifiers
    return field.replace(/[.,:;+=\-/<>{}|~!@#$%^*[\]`'"()?\s\\]/g, '');
}


function $52df80fd0126b376$export$d1dcafe205a223b7(scaleName, data, field, range, reverse, zero) {
    const scale = {
        name: scaleName,
        type: 'linear',
        range: range,
        round: true,
        reverse: reverse,
        domain: {
            data: data,
            field: $8eb7a07ca128ffbc$export$d899a523879bc85a(field)
        },
        zero: zero,
        nice: true
    };
    return scale;
}
function $52df80fd0126b376$export$3949eed57fd6ab06(scaleName, data, range, field, reverse) {
    const scale = {
        name: scaleName,
        type: 'point',
        range: range,
        domain: {
            data: data,
            field: $8eb7a07ca128ffbc$export$d899a523879bc85a(field),
            sort: true
        },
        padding: 0.5
    };
    if (reverse !== undefined) scale.reverse = reverse;
    return scale;
}
function $52df80fd0126b376$export$f59b7a6a9ab5fb2e(scaleName, colorBin, data, field, scheme) {
    scheme = scheme || $146eeb4362821b4b$export$e1b9a037ce7886e5;
    const domain = {
        data: data,
        field: $8eb7a07ca128ffbc$export$d899a523879bc85a(field)
    };
    const range = {
        scheme: scheme
    };
    const reverse = {
        signal: $146eeb4362821b4b$export$e97f264ccfdb1383.ColorReverse
    };
    if (colorBin !== 'continuous') range.count = {
        signal: $146eeb4362821b4b$export$e97f264ccfdb1383.ColorBinCount
    };
    switch(colorBin){
        case 'continuous':
            {
                const sequentialScale = {
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
                const quantileScale = {
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
                const quantizeScale = {
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



const $573ada9f4d41ca62$export$1b14b733306f144a = 0.6;
function $573ada9f4d41ca62$export$e568cf8be4c6e956(context, heightSignal) {
    const { specViewOptions: specViewOptions  } = context;
    const signals = [
        {
            name: $146eeb4362821b4b$export$e97f264ccfdb1383.ZProportion,
            value: $573ada9f4d41ca62$export$1b14b733306f144a,
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
            name: $146eeb4362821b4b$export$e97f264ccfdb1383.ZHeight,
            update: `${heightSignal} * ${$146eeb4362821b4b$export$e97f264ccfdb1383.ZProportion}`
        },
        {
            name: $146eeb4362821b4b$export$e97f264ccfdb1383.TextScale,
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
            name: $146eeb4362821b4b$export$e97f264ccfdb1383.TextSize,
            update: `${$146eeb4362821b4b$export$e97f264ccfdb1383.TextScale} * 10`
        },
        {
            name: $146eeb4362821b4b$export$e97f264ccfdb1383.TextTitleSize,
            update: `${$146eeb4362821b4b$export$e97f264ccfdb1383.TextScale} * 15`
        },
        {
            name: $146eeb4362821b4b$export$e97f264ccfdb1383.TextAngleX,
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
            name: $146eeb4362821b4b$export$e97f264ccfdb1383.TextAngleY,
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
            name: $146eeb4362821b4b$export$e97f264ccfdb1383.MarkOpacity,
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
function $573ada9f4d41ca62$export$1ad68bc363e02ccb(context) {
    const { specViewOptions: specViewOptions  } = context;
    const signal = {
        name: $146eeb4362821b4b$export$e97f264ccfdb1383.ColorBinCount,
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
function $573ada9f4d41ca62$export$17b2e68a7137b67d(context) {
    const { specViewOptions: specViewOptions  } = context;
    const signal = {
        name: $146eeb4362821b4b$export$e97f264ccfdb1383.ColorReverse,
        value: false,
        bind: {
            name: specViewOptions.language.colorReverse,
            input: 'checkbox'
        }
    };
    return signal;
}
function $573ada9f4d41ca62$export$8a3437c1e0038352(s, fn, update) {
    s.update = `${fn}((${s.update}), (${update}))`;
}



function $74d19d18fd52dec6$var$legend(column, fill) {
    const legend = {
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
function $74d19d18fd52dec6$export$eb28e9ee171b7920(context, fill) {
    const { specColumns: specColumns , insight: insight  } = context;
    if (specColumns.color && !insight.hideLegend && !insight.directColor && !specColumns.color.isColorData) return [
        $74d19d18fd52dec6$var$legend(specColumns.color, fill)
    ];
}




function $a8cab5f262d4fb66$export$e22b7451d997d17e(column, count, source, legend, lookupName, fieldName, indexName) {
    const data = [
        {
            name: lookupName,
            source: source,
            transform: [
                {
                    type: 'aggregate',
                    groupby: [
                        $8eb7a07ca128ffbc$export$d899a523879bc85a(column.name)
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
            source: source,
            transform: [
                {
                    type: 'lookup',
                    from: lookupName,
                    key: $8eb7a07ca128ffbc$export$d899a523879bc85a(column.name),
                    fields: [
                        column.name
                    ].map($8eb7a07ca128ffbc$export$d899a523879bc85a),
                    values: [
                        column.name
                    ].map($8eb7a07ca128ffbc$export$d899a523879bc85a),
                    as: [
                        fieldName
                    ]
                },
                {
                    type: 'formula',
                    expr: `datum[${JSON.stringify(fieldName)}] == null ? '${$146eeb4362821b4b$export$8dc108353b27858}' : datum[${JSON.stringify(fieldName)}]`,
                    as: fieldName
                }
            ]
        }
    ];
    return data;
}


function $d397a2a1ee48bc5e$export$2dc63264baec3ee2(props) {
    const { colorReverseSignalName: colorReverseSignalName , dataName: dataName , scope: scope , legendDataName: legendDataName , scaleName: scaleName , specContext: specContext , topLookupName: topLookupName  } = props;
    let colorDataName = dataName;
    const { insight: insight , specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
    const legends = $74d19d18fd52dec6$export$eb28e9ee171b7920(specContext, scaleName);
    if (legends) scope.legends = legends;
    const categoricalColor = specColumns.color && !specColumns.color.quantitative;
    if (categoricalColor) {
        $b3fb1eeac72b53ef$export$3af5226bf85b3fe(scope, ...$a8cab5f262d4fb66$export$e22b7451d997d17e(specColumns.color, specViewOptions.maxLegends, dataName, legendDataName, topLookupName, $146eeb4362821b4b$export$29b3fae588fa046f.TopColor, $146eeb4362821b4b$export$29b3fae588fa046f.TopIndex));
        colorDataName = legendDataName;
    }
    if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
        if (specColumns.color.quantitative) $b3fb1eeac72b53ef$export$7bc781d47112a1ca(scope, $52df80fd0126b376$export$f59b7a6a9ab5fb2e(scaleName, insight.colorBin, dataName, specColumns.color.name, insight.scheme));
        else $b3fb1eeac72b53ef$export$7bc781d47112a1ca(scope, {
            name: scaleName,
            type: 'ordinal',
            domain: {
                data: colorDataName,
                field: $146eeb4362821b4b$export$29b3fae588fa046f.TopColor,
                sort: true
            },
            range: {
                scheme: insight.scheme || $146eeb4362821b4b$export$e1b9a037ce7886e5
            },
            reverse: {
                signal: colorReverseSignalName
            }
        });
    }
    $b3fb1eeac72b53ef$export$fc8966a6eac27a(scope, $573ada9f4d41ca62$export$1ad68bc363e02ccb(specContext), $573ada9f4d41ca62$export$17b2e68a7137b67d(specContext));
    return {
        topColorField: $146eeb4362821b4b$export$29b3fae588fa046f.TopColor,
        colorDataName: colorDataName
    };
}







function $5a088e24510c9b50$export$45df82b83999ef0f(globalScope, colTitleSource, rowTitleSource, sizeSignals, axisTextColor) {
    const titleSignal = `parent[${JSON.stringify($146eeb4362821b4b$export$29b3fae588fa046f.FacetTitle)}]`;
    const index = `datum[${JSON.stringify($146eeb4362821b4b$export$29b3fae588fa046f.Ordinal)}] - 1`;
    const col = $5a088e24510c9b50$export$a3b38db8122a18f4(colTitleSource.dataName, sizeSignals, index);
    const row = $5a088e24510c9b50$export$db726b4ad0c270ea(rowTitleSource.dataName, sizeSignals, index);
    $b3fb1eeac72b53ef$export$2bdeef921b699304(globalScope, col.header, row.footer);
    $b3fb1eeac72b53ef$export$2bdeef921b699304(col.header, {
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
                    signal: `{search: parent[${JSON.stringify($146eeb4362821b4b$export$29b3fae588fa046f.FacetSearch)}]}`
                },
                x: {
                    signal: `${sizeSignals.layoutWidth} / 2`
                },
                limit: {
                    signal: sizeSignals.layoutWidth
                },
                fontSize: {
                    signal: $146eeb4362821b4b$export$e97f264ccfdb1383.TextSize
                },
                text: {
                    signal: titleSignal
                }
            }
        }
    });
    $b3fb1eeac72b53ef$export$2bdeef921b699304(row.footer, {
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
                    signal: `{search: parent[${JSON.stringify($146eeb4362821b4b$export$29b3fae588fa046f.FacetSearch)}]}`
                },
                y: {
                    signal: `${sizeSignals.layoutHeight} / 2`
                },
                limit: {
                    signal: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetRight
                },
                fontSize: {
                    signal: $146eeb4362821b4b$export$e97f264ccfdb1383.TextSize
                },
                text: {
                    signal: titleSignal
                }
            }
        }
    });
}
function $5a088e24510c9b50$export$3de75c28c7c095a1(scope, sizeSignals, axisTextColor) {
    $b3fb1eeac72b53ef$export$2bdeef921b699304(scope, {
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
                    signal: `{search: parent[${JSON.stringify($146eeb4362821b4b$export$29b3fae588fa046f.FacetSearch)}]}`
                },
                x: {
                    signal: `(${sizeSignals.layoutWidth}) / 2`
                },
                text: {
                    signal: `parent[${JSON.stringify($146eeb4362821b4b$export$29b3fae588fa046f.FacetTitle)}]`
                },
                fontSize: {
                    signal: $146eeb4362821b4b$export$e97f264ccfdb1383.TextSize
                },
                limit: {
                    signal: sizeSignals.layoutWidth
                },
                y: {
                    signal: `-${$146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingTop} / 2`
                }
            }
        }
    });
}
function $5a088e24510c9b50$export$3927d38091f734de(props) {
    const { colSeqName: colSeqName , colTitleScale: colTitleScale , globalScope: globalScope , facetScope: facetScope , plotScope: plotScope , rowSeqName: rowSeqName , rowTitleScale: rowTitleScale  } = props;
    const { sizeSignals: sizeSignals  } = facetScope;
    const colSequence = $5a088e24510c9b50$var$createSequence(colSeqName, sizeSignals.colCount);
    const rowSequence = $5a088e24510c9b50$var$createSequence(rowSeqName, sizeSignals.rowCount);
    const index = 'datum.data';
    const col = $5a088e24510c9b50$export$a3b38db8122a18f4(colSeqName, sizeSignals, index);
    const row = $5a088e24510c9b50$export$db726b4ad0c270ea(rowSeqName, sizeSignals, index);
    $b3fb1eeac72b53ef$export$3af5226bf85b3fe(globalScope, colSequence, rowSequence);
    $b3fb1eeac72b53ef$export$2bdeef921b699304(globalScope, col.footer, row.header);
    $b3fb1eeac72b53ef$export$7bc781d47112a1ca(globalScope, colTitleScale, rowTitleScale);
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
function $5a088e24510c9b50$export$db726b4ad0c270ea(data, sizeSignals, index) {
    const rowFn = (xSignal)=>{
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
                        signal: `${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetTop} + ${$146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingTop} + (${index}) * (${sizeSignals.layoutHeight} + ${$146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingTop} + ${$146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingBottom})`
                    },
                    height: {
                        signal: sizeSignals.layoutHeight
                    }
                }
            }
        };
    };
    const header = rowFn($146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetLeft);
    const footer = rowFn(`${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetLeft} + ${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotWidthOut} + ${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetRight} / 2`);
    return {
        header: header,
        footer: footer
    };
}
function $5a088e24510c9b50$export$a3b38db8122a18f4(data, sizeSignals, index) {
    const colFn = (ySignal)=>{
        return {
            type: 'group',
            from: {
                data: data
            },
            encode: {
                update: {
                    x: {
                        signal: `(${index}) * (${sizeSignals.layoutWidth} + ${$146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingLeft}) + ${$146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingLeft} + ${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetLeft}`
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
    const header = colFn(`${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetTop} / 2`);
    const footer = colFn(`${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetTop} + ${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotHeightOut}`);
    return {
        header: header,
        footer: footer
    };
}
function $5a088e24510c9b50$var$createSequence(dataName, countSignal) {
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




function $bcb29d9941a438e9$export$46d84c5e6bf6c95f(context, colorFieldName, scale) {
    const { specColumns: specColumns , insight: insight , specViewOptions: specViewOptions  } = context;
    const colorColumn = specColumns.color;
    return colorColumn ? colorColumn.isColorData || insight.directColor ? {
        field: $8eb7a07ca128ffbc$export$d899a523879bc85a(colorColumn.name)
    } : {
        scale: scale,
        field: colorColumn.quantitative ? $8eb7a07ca128ffbc$export$d899a523879bc85a(colorColumn.name) : colorFieldName
    } : {
        value: specViewOptions.colors.defaultCube
    };
}
function $bcb29d9941a438e9$export$82d51c42c483e4c3(context) {
    const result = {
        signal: $146eeb4362821b4b$export$e97f264ccfdb1383.MarkOpacity
    };
    return result;
}




class $7001bce89c3d5a96$export$d44ddc9302614dc0 {
    constructor(props){
        const { dataName: dataName , markGroup: markGroup1 , scope: scope , signals: signals  } = props;
        this.scope = scope;
        this._markGroup = markGroup1;
        this.signals = signals;
        this.data = $b3fb1eeac72b53ef$export$e5cbd1d444212cf8(scope.data, dataName).data;
        this._markDataName = dataName;
        this.offsets = {
            x: '0',
            y: '0',
            h: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotHeightIn,
            w: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotWidthIn
        };
        this.sizeSignals = {
            layoutHeight: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotHeightIn,
            layoutWidth: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotWidthIn
        };
        this.zSize = $146eeb4362821b4b$export$e97f264ccfdb1383.PlotHeightIn;
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




class $037582629f2ca83d$export$7ea53bcb0949d09b {
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






function $cf04044be3b2dc0d$export$fd3de786ee7197a6() {
    return `datum.${$146eeb4362821b4b$export$29b3fae588fa046f.Collapsed}`;
}


class $2270ea07621d68d4$export$f3086da9948fbc27 extends $037582629f2ca83d$export$7ea53bcb0949d09b {
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
                field: $8eb7a07ca128ffbc$export$d899a523879bc85a(this.props.sumBy.name),
                op: 'sum',
                as: $146eeb4362821b4b$export$29b3fae588fa046f.Sum
            };
            return fieldOp;
        }
    }
    build() {
        const { aggregation: aggregation , names: names , props: props1  } = this;
        const { dock: dock , globalScope: globalScope , groupings: groupings , niceScale: niceScale , parentScope: parentScope , showAxes: showAxes  } = props1;
        $b3fb1eeac72b53ef$export$dd47277a33967f3(globalScope.data, Object.assign(Object.assign({
        }, this.getTransforms(aggregation, $b3fb1eeac72b53ef$export$d8d50e04ceb89a80(groupings))), {
            as: [
                names.aggregateField
            ]
        }), {
            type: 'extent',
            field: $8eb7a07ca128ffbc$export$d899a523879bc85a(names.aggregateField),
            signal: names.globalAggregateExtentSignal
        });
        $b3fb1eeac72b53ef$export$fc8966a6eac27a(globalScope.scope, {
            name: props1.globalAggregateMaxExtentSignal,
            update: `${names.globalAggregateExtentSignal}[1]`
        });
        const horizontal = dock === 'left';
        const groupScaled = `scale(${JSON.stringify(names.scale)}, datum[${JSON.stringify(names.aggregateField)}])`;
        const offsets = {
            x: parentScope.offsets.x,
            y: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.y, dock === 'bottom' ? groupScaled : ''),
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
        $b3fb1eeac72b53ef$export$fc8966a6eac27a(globalScope.scope, {
            name: props1.globalAggregateMaxExtentScaledSignal,
            update: dock === 'bottom' ? `${parentScope.sizeSignals.layoutHeight} - ${globalAggregateMaxExtentScaledValue}` : globalAggregateMaxExtentScaledValue
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
                        test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                        signal: parentScope.offsets.x
                    }
                ],
                width: [
                    {
                        test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                        value: 0
                    }
                ]
            } : {
                y: [
                    {
                        test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                        signal: dock === 'top' ? parentScope.offsets.y : $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.y, parentScope.offsets.h)
                    }
                ],
                height: [
                    {
                        test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                        value: 0
                    }
                ]
            }
        };
    }
    getTransforms(aggregation, groupby) {
        const trans = {
            type: 'joinaggregate',
            groupby: groupby.map($8eb7a07ca128ffbc$export$d899a523879bc85a),
            ops: [
                aggregation
            ]
        };
        if (aggregation === 'sum') trans.fields = [
            this.props.sumBy.name
        ].map($8eb7a07ca128ffbc$export$d899a523879bc85a);
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






class $ccd7ede4b07b48a8$export$ab50d62f456c9445 extends $037582629f2ca83d$export$7ea53bcb0949d09b {
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
        const { names: names , props: props1  } = this;
        const { aggregation: aggregation , globalScope: globalScope , groupings: groupings , onBuild: onBuild , parentScope: parentScope  } = props1;
        const { sizeSignals: sizeSignals  } = parentScope;
        $b3fb1eeac72b53ef$export$dd47277a33967f3(globalScope.data, Object.assign(Object.assign({
        }, this.getTransforms(aggregation, $b3fb1eeac72b53ef$export$d8d50e04ceb89a80(groupings))), {
            as: [
                names.aggregateField
            ]
        }), {
            type: 'extent',
            field: $8eb7a07ca128ffbc$export$d899a523879bc85a(names.aggregateField),
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
            x: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.x, `(${parentScope.offsets.w} - ${squareSide}) / 2`),
            y: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.y, `(${parentScope.offsets.h} - ${squareSide}) / 2`),
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
                y: [
                    {
                        test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                        signal: offsets.y
                    }
                ],
                height: [
                    {
                        test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                        value: 0
                    }
                ]
            }
        };
    }
    getTransforms(aggregation, groupby) {
        const trans = {
            type: 'joinaggregate',
            groupby: groupby.map($8eb7a07ca128ffbc$export$d899a523879bc85a),
            ops: [
                aggregation
            ]
        };
        if (aggregation === 'sum') trans.fields = [
            this.props.sumBy.name
        ].map($8eb7a07ca128ffbc$export$d899a523879bc85a);
        return trans;
    }
}





function $d262e2f96d6108a3$export$24729013614a073c(prefix, domainDataName, discreteColumn) {
    const { column: column , defaultBins: defaultBins , maxbins: maxbins , maxbinsSignalDisplayName: maxbinsSignalDisplayName , maxbinsSignalName: maxbinsSignalName  } = discreteColumn;
    if (column.quantitative) {
        const field = `${prefix}_bin_${$8eb7a07ca128ffbc$export$2c8af6107006eb60(column.name)}`;
        const fieldEnd = `${field}_end`;
        const binSignal = `${field}_bins`;
        const extentSignal = `${field}_bin_extent`;
        domainDataName = `${field}_sequence`; //override the data name
        const extentTransform = {
            type: 'extent',
            field: $8eb7a07ca128ffbc$export$d899a523879bc85a(column.name),
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
            field: $8eb7a07ca128ffbc$export$d899a523879bc85a(column.name),
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
                        $146eeb4362821b4b$export$29b3fae588fa046f.Ordinal
                    ]
                },
                {
                    type: 'formula',
                    expr: `datum.data === ${binSignal}.start`,
                    as: $146eeb4362821b4b$export$29b3fae588fa046f.First
                },
                {
                    type: 'formula',
                    expr: `datum.data === ${binSignal}.stop - ${binSignal}.step`,
                    as: $146eeb4362821b4b$export$29b3fae588fa046f.Last
                }
            ]
        };
        const augmentBinnable = {
            discreteColumn: discreteColumn,
            native: false,
            transforms: [
                extentTransform,
                binTransform
            ],
            fields: [
                field,
                fieldEnd
            ],
            binSignal: binSignal,
            dataSequence: dataSequence,
            domainDataName: domainDataName,
            signals: [
                maxbinsSignal
            ],
            fullScaleDataname: dataSequence.name
        };
        return augmentBinnable;
    } else {
        const nativeBinnable = {
            discreteColumn: discreteColumn,
            native: true,
            fields: [
                column.name
            ],
            domainDataName: domainDataName,
            fullScaleDataname: domainDataName
        };
        return nativeBinnable;
    }
}






class $c72c6fe7eb71177f$export$efeea70621fdf7c2 extends $037582629f2ca83d$export$7ea53bcb0949d09b {
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
        this.bin = $d262e2f96d6108a3$export$24729013614a073c(this.prefix, props.globalScope.data.name, props.groupby);
    }
    getGrouping() {
        return this.bin.fields;
    }
    build() {
        const { bin: bin , names: names , props: props1  } = this;
        const { globalScope: globalScope , minBandWidth: minBandWidth , orientation: orientation , parentScope: parentScope , showAxes: showAxes  } = props1;
        const binField = bin.fields[0];
        if (bin.native === false) {
            $b3fb1eeac72b53ef$export$fc8966a6eac27a(globalScope.scope, ...bin.signals);
            $b3fb1eeac72b53ef$export$dd47277a33967f3(globalScope.data, ...bin.transforms);
            $b3fb1eeac72b53ef$export$3af5226bf85b3fe(globalScope.scope, bin.dataSequence);
        }
        //TODO don't add this, use existing dataset
        $b3fb1eeac72b53ef$export$3af5226bf85b3fe(globalScope.scope, {
            name: names.accumulative,
            source: bin.fullScaleDataname,
            transform: [
                {
                    type: 'aggregate',
                    groupby: this.getGrouping().map($8eb7a07ca128ffbc$export$d899a523879bc85a),
                    ops: [
                        'count'
                    ]
                }
            ]
        });
        const horizontal = orientation === 'horizontal';
        const minCellSignal = horizontal ? globalScope.signals.minCellHeight : globalScope.signals.minCellWidth;
        $573ada9f4d41ca62$export$8a3437c1e0038352(minCellSignal, 'max', `length(data(${JSON.stringify(names.accumulative)})) * ${minBandWidth}`);
        $b3fb1eeac72b53ef$export$fc8966a6eac27a(globalScope.scope, {
            name: names.bandWidth,
            update: `bandwidth(${JSON.stringify(horizontal ? names.yScale : names.xScale)})`
        });
        const scales = this.getScales(bin, horizontal);
        let encodingRuleMap;
        if (!props1.excludeEncodingRuleMap) encodingRuleMap = horizontal ? {
            x: [
                {
                    test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                    value: parentScope.offsets.x
                }
            ],
            width: [
                {
                    test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                    value: 0
                }
            ]
        } : {
            y: [
                {
                    test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                    signal: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.y, parentScope.offsets.h)
                }
            ],
            height: [
                {
                    test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
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
                showAxes: showAxes,
                scales: {
                    x: horizontal ? undefined : scales,
                    y: horizontal ? scales : undefined
                }
            },
            encodingRuleMap: encodingRuleMap
        };
    }
    getOffset(horizontal, binField) {
        const { names: names , props: props1  } = this;
        const { parentScope: parentScope  } = props1;
        return {
            x: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.x, horizontal ? '' : `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(binField)}])`),
            y: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.y, horizontal ? `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(binField)}])` : ''),
            h: horizontal ? names.bandWidth : parentScope.offsets.h,
            w: horizontal ? parentScope.offsets.w : names.bandWidth
        };
    }
    getScales(bin, horizontal) {
        const { names: names  } = this;
        const { parentScope: parentScope  } = this.props;
        const binField = $8eb7a07ca128ffbc$export$d899a523879bc85a(bin.fields[0]);
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





function $aee84c6f70860268$export$f0ba1a5b611a9ffc(bin) {
    const val = (index)=>`datum[${JSON.stringify(bin.fields[index])}]`
    ;
    return bin.discreteColumn.column.quantitative ? `format(${val(0)}, '~r') + ' - ' + format(${val(1)}, '~r')` : val(0);
}
function $aee84c6f70860268$var$obj(nameValues, clause) {
    if (clause) nameValues = [
        clause,
        ...nameValues
    ];
    return `{${nameValues.join()}}`;
}
function $aee84c6f70860268$export$de7be5604dfa90eb(bin, firstFieldName, lastFieldName, clause) {
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
        return $aee84c6f70860268$var$obj([
            `expressions:[ datum[${JSON.stringify(firstFieldName)}] ? null : ${$aee84c6f70860268$var$obj(low)}, datum[${JSON.stringify(lastFieldName)}] ? null : ${$aee84c6f70860268$var$obj(high)}]`
        ], clause);
    } else {
        const exact = [
            `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
            'operator:\'==\'',
            `value:datum[${JSON.stringify(bin.fields[0])}]`
        ];
        return $aee84c6f70860268$var$obj([
            `expressions:[${$aee84c6f70860268$var$obj(exact)}]`
        ], clause);
    }
}





function $361980567078f383$export$6e96ed03820b3f41(source, prefix, binFields, sortOrder) {
    const _binFields = binFields.map($8eb7a07ca128ffbc$export$d899a523879bc85a);
    const dataName = `${prefix}_bin_order`;
    const data = {
        name: dataName,
        source: source,
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
                    $146eeb4362821b4b$export$29b3fae588fa046f.Ordinal
                ]
            }
        ]
    };
    return {
        data: data,
        scale: $361980567078f383$export$9dbb9afc1fc26dba(dataName, `scale_${prefix}_order`, binFields)
    };
}
function $361980567078f383$export$9dbb9afc1fc26dba(dataName, scaleName, binFields) {
    return {
        type: 'ordinal',
        name: scaleName,
        domain: {
            data: dataName,
            field: $8eb7a07ca128ffbc$export$d899a523879bc85a(binFields[0])
        },
        range: {
            data: dataName,
            field: $146eeb4362821b4b$export$29b3fae588fa046f.Ordinal
        }
    };
}




class $7b9573b63f6fb3f3$export$c9f6f75e561fd9ec extends $037582629f2ca83d$export$7ea53bcb0949d09b {
    constructor(props){
        super(props);
        this.props = props;
        const p = this.prefix = `cross_${this.id}`;
        this.binX = $d262e2f96d6108a3$export$24729013614a073c(`${p}_x`, props.globalScope.data.name, props.groupbyX);
        this.binY = $d262e2f96d6108a3$export$24729013614a073c(`${p}_y`, props.globalScope.data.name, props.groupbyY);
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
        const { binX: binX , binY: binY , names: names , prefix: prefix , props: props1  } = this;
        const { axisTextColor: axisTextColor , colRowTitles: colRowTitles , globalScope: globalScope , parentScope: parentScope  } = props1;
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
            offset: $146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingLeft,
            padding: $146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingLeft,
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
            offset: $146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingTop,
            padding: `(${$146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingTop} + ${$146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingBottom})`,
            dataOut: null,
            scaleName: null,
            position: null
        };
        const dimensions = [
            dx,
            dy
        ];
        dimensions.forEach((d)=>{
            const { bin: bin , dim: dim , padding: padding , sortOrder: sortOrder  } = d;
            let data;
            let dataName;
            let countSignal;
            let scale;
            const titleSource = titles[dim];
            if (bin.native === false) {
                $b3fb1eeac72b53ef$export$fc8966a6eac27a(globalScope.scope, ...bin.signals);
                $b3fb1eeac72b53ef$export$dd47277a33967f3(globalScope.data, ...bin.transforms);
                $b3fb1eeac72b53ef$export$3af5226bf85b3fe(globalScope.scope, bin.dataSequence);
                $b3fb1eeac72b53ef$export$dd47277a33967f3(bin.dataSequence, {
                    type: 'formula',
                    expr: `indata(${JSON.stringify(globalScope.markDataName)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                    as: $146eeb4362821b4b$export$29b3fae588fa046f.Contains
                });
                data = bin.dataSequence;
                dataName = bin.dataSequence.name;
                countSignal = `length(data(${JSON.stringify(dataName)}))`;
                scale = $361980567078f383$export$9dbb9afc1fc26dba(dataName, `${names.dimScale}_${dim}`, bin.fields);
                titleSource.dataName = bin.dataSequence.name;
            } else {
                dataName = globalScope.markDataName;
                const ord = $361980567078f383$export$6e96ed03820b3f41(dataName, `${prefix}_${dim}`, bin.fields, sortOrder);
                data = ord.data;
                $b3fb1eeac72b53ef$export$3af5226bf85b3fe(globalScope.scope, ord.data);
                countSignal = `length(data(${JSON.stringify(ord.data.name)}))`;
                scale = ord.scale;
                titleSource.dataName = ord.data.name;
            }
            titleSource.quantitative = bin.discreteColumn.column.quantitative;
            d.dataOut = data;
            d.scaleName = scale.name;
            $b3fb1eeac72b53ef$export$dd47277a33967f3(data, {
                type: 'formula',
                expr: $aee84c6f70860268$export$de7be5604dfa90eb(bin, $146eeb4362821b4b$export$29b3fae588fa046f.First, $146eeb4362821b4b$export$29b3fae588fa046f.Last),
                as: $146eeb4362821b4b$export$29b3fae588fa046f.FacetSearch
            }, {
                type: 'formula',
                expr: $aee84c6f70860268$export$f0ba1a5b611a9ffc(bin),
                as: $146eeb4362821b4b$export$29b3fae588fa046f.FacetTitle
            });
            $b3fb1eeac72b53ef$export$7bc781d47112a1ca(globalScope.scope, scale);
            const count = `${names.dimCount}_${dim}`;
            const calc = `${names.dimCellSizeCalc}_${dim}`;
            const size = `${names.dimCellSize}_${dim}`;
            $b3fb1eeac72b53ef$export$fc8966a6eac27a(globalScope.scope, {
                name: count,
                update: countSignal
            });
            $b3fb1eeac72b53ef$export$fc8966a6eac27a(globalScope.scope, {
                name: calc,
                update: `${d.layout} / ${count}`
            }, {
                name: size,
                update: `max(${d.min}, (${calc} - ${padding}))`
            });
            $573ada9f4d41ca62$export$8a3437c1e0038352(d.out, 'max', `((${size} + ${padding}) * ${count})`);
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
                            expr: `[datum[${JSON.stringify($146eeb4362821b4b$export$29b3fae588fa046f.FacetSearch)}], merge(parent[${JSON.stringify($146eeb4362821b4b$export$29b3fae588fa046f.FacetSearch)}], { clause: '&&'})]`,
                            as: $146eeb4362821b4b$export$29b3fae588fa046f.FacetSearch
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
        $b3fb1eeac72b53ef$export$2bdeef921b699304(globalScope.markGroup, groupRow);
        $b3fb1eeac72b53ef$export$2bdeef921b699304(groupRow, groupCol);
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
        if (colRowTitles) $5a088e24510c9b50$export$45df82b83999ef0f(globalScope.scope, titles.x, titles.y, sizeSignals, axisTextColor);
        return {
            facetScope: groupCol,
            offsets: offsets,
            sizeSignals: sizeSignals,
            titles: titles
        };
    }
    dimensionOffset(d) {
        const { names: names  } = this;
        return `${d.offset} + (scale(${JSON.stringify(d.scaleName)}, datum[${JSON.stringify(d.bin.fields[0])}]) - 1) * (${names.dimCellSize}_${d.dim} + ${d.padding})`;
    }
}









class $656da2a7576cc899$export$32a98332419a23c6 extends $037582629f2ca83d$export$7ea53bcb0949d09b {
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
        const { names: names , prefix: prefix , props: props1  } = this;
        const { globalScope: globalScope , parentScope: parentScope , scatterPointScaleDisplay: scatterPointScaleDisplay , size: size , x: x , y: y , z: z , zGrounded: zGrounded  } = props1;
        const qsize = size && size.quantitative && size;
        $b3fb1eeac72b53ef$export$fc8966a6eac27a(globalScope.scope, {
            name: $146eeb4362821b4b$export$e97f264ccfdb1383.PointScale,
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
            name: $146eeb4362821b4b$export$e97f264ccfdb1383.ZGrounded,
            value: false,
            bind: {
                name: zGrounded,
                input: 'checkbox'
            }
        });
        if (qsize) {
            $b3fb1eeac72b53ef$export$dd47277a33967f3(globalScope.data, {
                type: 'extent',
                field: $8eb7a07ca128ffbc$export$d899a523879bc85a(qsize.name),
                signal: names.sizeExtent
            });
            $b3fb1eeac72b53ef$export$7bc781d47112a1ca(globalScope.scope, {
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
            $b3fb1eeac72b53ef$export$fc8966a6eac27a(globalScope.scope, {
                name: names.sizeRange,
                update: `min(${parentScope.sizeSignals.layoutHeight}, ${parentScope.sizeSignals.layoutWidth}) / ${$d6acc81334b00d34$export$2adbe44cf52133e9}`
            });
        }
        $b3fb1eeac72b53ef$export$3af5226bf85b3fe(globalScope.scope, {
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
        const sizeValueSignal = qsize ? `scale(${JSON.stringify(names.sizeScale)}, datum[${JSON.stringify(qsize.name)}]) * ${$146eeb4362821b4b$export$e97f264ccfdb1383.PointScale}` : $146eeb4362821b4b$export$e97f264ccfdb1383.PointScale;
        const update = Object.assign({
            height: [
                {
                    test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
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
                    test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                    value: 0
                },
                {
                    signal: `${$146eeb4362821b4b$export$e97f264ccfdb1383.ZGrounded} ? 0 : ${zValue}`
                }
            ],
            depth: [
                {
                    test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                    value: 0
                },
                {
                    signal: `${$146eeb4362821b4b$export$e97f264ccfdb1383.ZGrounded} ? ${zValue} : ${sizeValueSignal}`
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
                signal: `(${globalScope.zSize}) * ${$146eeb4362821b4b$export$e97f264ccfdb1383.ZProportion}`
            }
        ];
        columnSignals.forEach((cs)=>{
            const { column: column , reverse: reverse , scaleName: scaleName , signal: signal , xyz: xyz  } = cs;
            if (!column) return;
            let scale;
            if (column.quantitative) scale = $52df80fd0126b376$export$d1dcafe205a223b7(scaleName, globalScope.data.name, column.name, [
                0,
                {
                    signal: signal
                }
            ], reverse, false);
            else scale = $52df80fd0126b376$export$3949eed57fd6ab06(scaleName, globalScope.data.name, [
                0,
                {
                    signal: signal
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
                update: update
            }
        };
        $b3fb1eeac72b53ef$export$2bdeef921b699304(globalScope.markGroup, mark);
        return {
            offsets: {
                x: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.x, `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(x.name)}])`),
                y: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.y, `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(y.name)}]) - ${sizeValueSignal}`),
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
                y: [
                    {
                        test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                        signal: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.y, parentScope.sizeSignals.layoutHeight)
                    }
                ]
            }
        };
    }
}









function $a2775ffc32b7b634$export$d64499a0aa878724(z, zSize, dataName, zScaleName) {
    if (z) {
        const zRange = [
            0,
            {
                signal: `(${zSize}) * ${$146eeb4362821b4b$export$e97f264ccfdb1383.ZProportion}`
            }
        ];
        const scale = z.quantitative ? $52df80fd0126b376$export$d1dcafe205a223b7(zScaleName, dataName, z.name, zRange, false, true) : $52df80fd0126b376$export$3949eed57fd6ab06(zScaleName, dataName, zRange, z.name, false);
        return scale;
    }
}


class $862530b69d56ffb4$export$b9b93345c2943ac5 extends $037582629f2ca83d$export$7ea53bcb0949d09b {
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
        const { names: names , prefix: prefix , props: props1  } = this;
        const { fillDirection: fillDirection , globalScope: globalScope , groupings: groupings , parentScope: parentScope , collapseYHeight: collapseYHeight , sortBy: sortBy , z: z  } = props1;
        const zScale = $a2775ffc32b7b634$export$d64499a0aa878724(z, globalScope.zSize, globalScope.data.name, names.zScale);
        $b3fb1eeac72b53ef$export$dd47277a33967f3(globalScope.data, Object.assign({
            type: 'stack',
            groupby: $b3fb1eeac72b53ef$export$d8d50e04ceb89a80(groupings).map($8eb7a07ca128ffbc$export$d899a523879bc85a),
            as: [
                names.stack0,
                names.stack1
            ]
        }, sortBy && {
            sort: {
                field: $8eb7a07ca128ffbc$export$d899a523879bc85a(sortBy.name),
                order: 'ascending'
            }
        }));
        const { gap: gap , levelSize: levelSize , size: size , squaresPerBand: squaresPerBand  } = this.addSignals();
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
                            test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
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
                            test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                            value: 0
                        },
                        {
                            scale: names.zScale,
                            field: $8eb7a07ca128ffbc$export$d899a523879bc85a(z.name)
                        }
                    ]
                })
            }
        };
        $b3fb1eeac72b53ef$export$2bdeef921b699304(globalScope.markGroup, mark);
        const { tx: tx , ty: ty  } = this.transformXY(gap, levelSize, squaresPerBand);
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
                x: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.x, tx.expr),
                y: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.y, ty.expr),
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
                y: [
                    {
                        test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                        value: parentScope.offsets.y
                    }
                ]
            }
        });
    }
    getBandWidth() {
        const { offsets: offsets  } = this.props.parentScope;
        switch(this.props.fillDirection){
            case 'down-right':
                return offsets.h;
            default:
                return offsets.w;
        }
    }
    addSignals() {
        const { names: names , props: props1  } = this;
        const { fillDirection: fillDirection , globalScope: globalScope , groupings: groupings , parentScope: parentScope  } = props1;
        let { maxGroupedFillSize: maxGroupedFillSize , maxGroupedUnits: maxGroupedUnits  } = props1;
        if (!maxGroupedUnits) {
            if (groupings) {
                $b3fb1eeac72b53ef$export$dd47277a33967f3(globalScope.data, {
                    type: 'joinaggregate',
                    groupby: $b3fb1eeac72b53ef$export$d8d50e04ceb89a80(groupings).map($8eb7a07ca128ffbc$export$d899a523879bc85a),
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
            gap: gap,
            levelSize: levelSize,
            size: size,
            squaresPerBand: squaresPerBand
        };
    }
    transformXY(gap, levelSize, squaresPerBand) {
        const { names: names , prefix: prefix  } = this;
        const compartment = `(${names.bandWidth}) / ${squaresPerBand} * ((datum[${JSON.stringify(names.stack0)}]) % ${squaresPerBand})`;
        const level = `floor((datum[${JSON.stringify(names.stack0)}]) / ${squaresPerBand})`;
        const { fillDirection: fillDirection , parentScope: parentScope  } = this.props;
        const tx = {
            type: 'formula',
            expr: null,
            as: `${prefix}_${$146eeb4362821b4b$export$29b3fae588fa046f.OffsetX}`
        };
        const ty = {
            type: 'formula',
            expr: null,
            as: `${prefix}_${$146eeb4362821b4b$export$29b3fae588fa046f.OffsetY}`
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
            tx: tx,
            ty: ty
        };
    }
}






class $817d45a48045a6dc$export$5ace8476f20038f3 extends $037582629f2ca83d$export$7ea53bcb0949d09b {
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
        const { names: names , props: props1  } = this;
        const { globalScope: globalScope , groupings: groupings , parentScope: parentScope , sort: sort  } = props1;
        const { sizeSignals: sizeSignals  } = parentScope;
        $b3fb1eeac72b53ef$export$dd47277a33967f3(globalScope.data, {
            type: 'joinaggregate',
            groupby: $b3fb1eeac72b53ef$export$d8d50e04ceb89a80(groupings).map($8eb7a07ca128ffbc$export$d899a523879bc85a),
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
            groupby: $b3fb1eeac72b53ef$export$d8d50e04ceb89a80(groupings).map($8eb7a07ca128ffbc$export$d899a523879bc85a),
            as: [
                names.stack0,
                names.stack1
            ]
        }, sort && {
            sort: {
                field: $8eb7a07ca128ffbc$export$d899a523879bc85a(sort.name),
                order: 'ascending'
            }
        }));
        $b3fb1eeac72b53ef$export$3af5226bf85b3fe(globalScope.scope, {
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
        $b3fb1eeac72b53ef$export$fc8966a6eac27a(globalScope.scope, {
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
            x: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.x, groupX, `${cubeX} * (${names.cube} + 1)`),
            y: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.y, groupY, `${cubeY} * (${names.cube} + 1)`),
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
        $b3fb1eeac72b53ef$export$2bdeef921b699304(globalScope.markGroup, mark);
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
            offsets: offsets,
            mark: mark,
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
                        test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                        signal: parentScope.offsets.y
                    }
                ],
                z: [
                    {
                        test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                        value: 0
                    }
                ],
                depth: [
                    {
                        test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                        value: 0
                    }
                ],
                height: [
                    {
                        test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                        value: 0
                    }
                ]
            }
        };
    }
}








class $714f080adcb60d3e$export$64fee65f1033a46a extends $037582629f2ca83d$export$7ea53bcb0949d09b {
    constructor(props){
        super(props);
        this.props = props;
        const p = this.prefix = `strip_${this.id}`;
        this.names = {
            firstField: `${p}${$146eeb4362821b4b$export$29b3fae588fa046f.First}`,
            lastField: `${p}${$146eeb4362821b4b$export$29b3fae588fa046f.Last}`,
            valueField: `${p}${$146eeb4362821b4b$export$29b3fae588fa046f.Value}`,
            scale: `scale_${p}`,
            zScale: `scale_${p}_z`
        };
    }
    build() {
        const { names: names , prefix: prefix , props: props1  } = this;
        const { addPercentageScale: addPercentageScale , globalScope: globalScope , groupings: groupings , orientation: orientation , size: size , sort: sort , sortOrder: sortOrder , parentScope: parentScope , z: z  } = props1;
        const zScale = $a2775ffc32b7b634$export$d64499a0aa878724(z, globalScope.zSize, globalScope.data.name, names.zScale);
        const horizontal = orientation === 'horizontal';
        const transform = [];
        if (sort) transform.push({
            type: 'collect',
            sort: {
                field: $8eb7a07ca128ffbc$export$d899a523879bc85a(sort.name),
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
            field: $8eb7a07ca128ffbc$export$d899a523879bc85a(stackField),
            offset: 'normalize',
            as: [
                names.firstField,
                names.lastField
            ]
        };
        if (groupings.length) stackTransform.groupby = $b3fb1eeac72b53ef$export$d8d50e04ceb89a80(groupings).map($8eb7a07ca128ffbc$export$d899a523879bc85a);
        transform.push(stackTransform);
        $b3fb1eeac72b53ef$export$dd47277a33967f3(globalScope.data, ...transform);
        const span = [
            names.lastField,
            names.firstField
        ].map((f)=>`datum[${JSON.stringify(f)}]`
        ).join(' - ');
        const offsets = {
            x: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.x, horizontal ? `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.w})` : ''),
            y: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.y, horizontal ? '' : `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.h})`),
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
                            test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                            value: 0
                        },
                        {
                            scale: names.zScale,
                            field: $8eb7a07ca128ffbc$export$d899a523879bc85a(z.name)
                        }
                    ]
                })
            }
        };
        $b3fb1eeac72b53ef$export$2bdeef921b699304(globalScope.markGroup, mark);
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
            offsets: offsets,
            sizeSignals: {
                layoutHeight: null,
                layoutWidth: null
            },
            mark: mark
        };
    }
}








class $647a5cd6b510d0f6$export$e3cdbc1a607023ae extends $037582629f2ca83d$export$7ea53bcb0949d09b {
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
        const { names: names , props: props1  } = this;
        const { globalScope: globalScope , parentScope: parentScope , treeMapMethod: treeMapMethod , z: z  } = props1;
        const zScale = $a2775ffc32b7b634$export$d64499a0aa878724(z, globalScope.zSize, globalScope.data.name, names.zScale);
        const offsets = {
            x: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.x, $647a5cd6b510d0f6$var$fn(names.fieldX0)),
            y: $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.y, $647a5cd6b510d0f6$var$fn(names.fieldY0)),
            h: $647a5cd6b510d0f6$var$subtract(names.fieldY1, names.fieldY0),
            w: $647a5cd6b510d0f6$var$subtract(names.fieldX1, names.fieldX0)
        };
        const mark = this.transformedMark(offsets);
        $b3fb1eeac72b53ef$export$fc8966a6eac27a(globalScope.scope, {
            name: $146eeb4362821b4b$export$e97f264ccfdb1383.TreeMapMethod,
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
            mark: mark,
            offsets: offsets,
            sizeSignals: {
                layoutHeight: null,
                layoutWidth: null
            }
        });
    }
    transformedMark(offsets) {
        const { names: names , props: props1  } = this;
        const { globalScope: globalScope , groupings: groupings , parentScope: parentScope  } = props1;
        if (groupings.length) {
            //treemap transform can't have it's boundary size grouped, so we need to facet the data.
            $b3fb1eeac72b53ef$export$3af5226bf85b3fe(globalScope.scope, {
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
                        groupby: $b3fb1eeac72b53ef$export$d8d50e04ceb89a80(groupings).map($8eb7a07ca128ffbc$export$d899a523879bc85a)
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
            $b3fb1eeac72b53ef$export$2bdeef921b699304(globalScope.markGroup, facets);
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
        const { names: names , prefix: prefix , props: props1  } = this;
        const { z: z  } = props1;
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
                            test: $cf04044be3b2dc0d$export$fd3de786ee7197a6(),
                            value: 0
                        },
                        {
                            scale: names.zScale,
                            field: $8eb7a07ca128ffbc$export$d899a523879bc85a(z.name)
                        }
                    ]
                })
            }
        };
        $b3fb1eeac72b53ef$export$2bdeef921b699304(markParent, mark);
        return mark;
    }
    treemapTransform(treemapData, widthSignal, heightSignal) {
        const { names: names , props: props1  } = this;
        const { group: group , size: size  } = props1;
        $b3fb1eeac72b53ef$export$dd47277a33967f3(treemapData, {
            type: 'filter',
            expr: `datum[${JSON.stringify(size.name)}] > 0`
        }, {
            type: 'nest',
            keys: [
                group && group.name || '__NONE__'
            ]
        }, {
            type: 'treemap',
            field: $8eb7a07ca128ffbc$export$d899a523879bc85a(size.name),
            sort: {
                field: 'value',
                order: 'descending'
            },
            round: true,
            method: {
                signal: $146eeb4362821b4b$export$e97f264ccfdb1383.TreeMapMethod
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
function $647a5cd6b510d0f6$var$fn(n) {
    return `datum[${JSON.stringify(n)}]`;
}
function $647a5cd6b510d0f6$var$subtract(...fields) {
    return fields.map((n)=>$647a5cd6b510d0f6$var$fn(n)
    ).join(' - ');
}











class $2fcd6dca7f9fc501$export$3c26ce2d798a50d8 extends $037582629f2ca83d$export$7ea53bcb0949d09b {
    constructor(props){
        super(props);
        this.props = props;
        const p = this.prefix = `wrap_${this.id}`;
        this.bin = $d262e2f96d6108a3$export$24729013614a073c(this.prefix, props.globalScope.data.name, props.groupby);
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
        const { bin: bin , names: names , prefix: prefix , props: props1  } = this;
        const { axisTextColor: axisTextColor , cellTitles: cellTitles , globalScope: globalScope , parentScope: parentScope  } = props1;
        let ordinalBinData;
        if (bin.native === false) {
            $b3fb1eeac72b53ef$export$fc8966a6eac27a(globalScope.scope, ...bin.signals);
            $b3fb1eeac72b53ef$export$dd47277a33967f3(globalScope.data, ...bin.transforms);
            $b3fb1eeac72b53ef$export$3af5226bf85b3fe(globalScope.scope, bin.dataSequence);
            $b3fb1eeac72b53ef$export$dd47277a33967f3(bin.dataSequence, {
                type: 'formula',
                expr: `indata(${JSON.stringify(globalScope.data.name)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                as: $146eeb4362821b4b$export$29b3fae588fa046f.Contains
            });
            ordinalBinData = bin.dataSequence.name;
        } else {
            const ord = $361980567078f383$export$6e96ed03820b3f41(globalScope.data.name, prefix, bin.fields, 'ascending');
            $b3fb1eeac72b53ef$export$3af5226bf85b3fe(globalScope.scope, ord.data);
            ordinalBinData = ord.data.name;
        }
        $b3fb1eeac72b53ef$export$3af5226bf85b3fe(globalScope.scope, {
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
                    expr: `datum.cols === 1 ? max(datum.cellw, ${$146eeb4362821b4b$export$e97f264ccfdb1383.MinCellWidth}) : datum.cellw`,
                    as: 'cellw'
                },
                {
                    type: 'formula',
                    expr: `${parentScope.sizeSignals.layoutHeight} / datum.rows`,
                    as: 'cellh'
                },
                {
                    type: 'formula',
                    expr: `datum.rows === 1 ? max(datum.cellh, ${$146eeb4362821b4b$export$e97f264ccfdb1383.MinCellHeight}) : datum.cellh`,
                    as: 'cellh'
                },
                {
                    type: 'formula',
                    expr: `(datum.cellw >= ${$146eeb4362821b4b$export$e97f264ccfdb1383.MinCellWidth} && datum.cellh >= ${$146eeb4362821b4b$export$e97f264ccfdb1383.MinCellHeight})`,
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
                    expr: `floor((datum[${JSON.stringify($146eeb4362821b4b$export$29b3fae588fa046f.Ordinal)}] - 1) / ${names.colCount})`,
                    as: $146eeb4362821b4b$export$29b3fae588fa046f.WrapRow
                },
                {
                    type: 'formula',
                    expr: `(datum[${JSON.stringify($146eeb4362821b4b$export$29b3fae588fa046f.Ordinal)}] - 1) % ${names.colCount}`,
                    as: $146eeb4362821b4b$export$29b3fae588fa046f.WrapCol
                },
                {
                    type: 'formula',
                    expr: $aee84c6f70860268$export$de7be5604dfa90eb(bin, $146eeb4362821b4b$export$29b3fae588fa046f.First, $146eeb4362821b4b$export$29b3fae588fa046f.Last),
                    as: $146eeb4362821b4b$export$29b3fae588fa046f.FacetSearch
                },
                {
                    type: 'formula',
                    expr: $aee84c6f70860268$export$f0ba1a5b611a9ffc(bin),
                    as: $146eeb4362821b4b$export$29b3fae588fa046f.FacetTitle
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
                    key: $8eb7a07ca128ffbc$export$d899a523879bc85a(bin.fields[0]),
                    fields: [
                        bin.fields[0]
                    ].map($8eb7a07ca128ffbc$export$d899a523879bc85a),
                    values: [
                        $146eeb4362821b4b$export$29b3fae588fa046f.WrapRow,
                        $146eeb4362821b4b$export$29b3fae588fa046f.WrapCol
                    ]
                }
            ]
        };
        $b3fb1eeac72b53ef$export$3af5226bf85b3fe(globalScope.scope, dataOut);
        globalScope.setMarkDataName(names.outputData);
        $b3fb1eeac72b53ef$export$fc8966a6eac27a(globalScope.scope, {
            name: names.minAspect,
            update: `${$146eeb4362821b4b$export$e97f264ccfdb1383.MinCellWidth} / ${$146eeb4362821b4b$export$e97f264ccfdb1383.MinCellHeight}`
        }, {
            name: names.target,
            update: `${names.minAspect} === 1 ? ${1.2} : ${names.minAspect}`
        }, {
            name: names.minArea,
            update: `${$146eeb4362821b4b$export$e97f264ccfdb1383.MinCellWidth}*${$146eeb4362821b4b$export$e97f264ccfdb1383.MinCellHeight}`
        }, {
            name: names.aspect,
            update: `${parentScope.sizeSignals.layoutWidth} / ${parentScope.sizeSignals.layoutHeight}`
        }, {
            name: names.dataLength,
            update: `data(${JSON.stringify(ordinalBinData)}).length`
        }, {
            name: names.growColCount,
            update: `max(floor(${parentScope.sizeSignals.layoutWidth} / ${$146eeb4362821b4b$export$e97f264ccfdb1383.MinCellWidth}), 1)`
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
            update: `${names.fits} ? data(${JSON.stringify(names.rxc)})[0].cellh : ${$146eeb4362821b4b$export$e97f264ccfdb1383.MinCellHeight}`
        });
        $573ada9f4d41ca62$export$8a3437c1e0038352(globalScope.signals.plotHeightOut, 'max', `(${names.cellHeight} * ceil(${names.dataLength} / ${names.colCount}))`);
        $573ada9f4d41ca62$export$8a3437c1e0038352(globalScope.signals.plotWidthOut, 'max', `(${names.cellWidth} * ${names.colCount})`);
        const signalH = [
            names.cellHeight,
            $146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingTop,
            $146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingBottom
        ].join(' - ');
        const signalW = [
            names.cellWidth,
            $146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingLeft
        ].join(' - ');
        const signalX = $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.x, `datum[${JSON.stringify($146eeb4362821b4b$export$29b3fae588fa046f.WrapCol)}] * ${names.cellWidth}`, $146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingLeft);
        const signalY = $b3fb1eeac72b53ef$export$69458ad3b16ec03a(parentScope.offsets.y, `datum[${JSON.stringify($146eeb4362821b4b$export$29b3fae588fa046f.WrapRow)}] * ${names.cellHeight}`, $146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingTop);
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
                update: update
            }
        };
        $b3fb1eeac72b53ef$export$2bdeef921b699304(globalScope.markGroup, group);
        const sizeSignals = {
            layoutHeight: `(${names.cellHeight} - ${$146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingTop} - ${$146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingBottom})`,
            layoutWidth: `(${names.cellWidth} - ${$146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingLeft})`,
            colCount: names.colCount,
            rowCount: `ceil(${names.dataLength} / ${names.colCount})`
        };
        if (cellTitles) $5a088e24510c9b50$export$3de75c28c7c095a1(group, sizeSignals, axisTextColor);
        return {
            facetScope: group,
            sizeSignals: sizeSignals,
            offsets: offsets
        };
    }
}


const $99976a6cdb2da6d0$export$b90520ed48a3c473 = {
    AggregateContainer: $2270ea07621d68d4$export$f3086da9948fbc27,
    AggregateSquare: $ccd7ede4b07b48a8$export$ab50d62f456c9445,
    Band: $c72c6fe7eb71177f$export$efeea70621fdf7c2,
    Cross: $7b9573b63f6fb3f3$export$c9f6f75e561fd9ec,
    Scatter: $656da2a7576cc899$export$32a98332419a23c6,
    Square: $862530b69d56ffb4$export$b9b93345c2943ac5,
    Stack: $817d45a48045a6dc$export$5ace8476f20038f3,
    Strip: $714f080adcb60d3e$export$64fee65f1033a46a,
    Treemap: $647a5cd6b510d0f6$export$e3cdbc1a607023ae,
    Wrap: $2fcd6dca7f9fc501$export$3c26ce2d798a50d8
};


class $2c2a51b6f108069b$export$e15a5a4be5d609df {
    constructor(props, specContext){
        this.props = props;
        this.specContext = specContext;
        this.globalSignals = {
            minCellWidth: {
                name: $146eeb4362821b4b$export$e97f264ccfdb1383.MinCellWidth,
                update: `${$d6acc81334b00d34$export$9575804afbd9861b}`
            },
            minCellHeight: {
                name: $146eeb4362821b4b$export$e97f264ccfdb1383.MinCellHeight,
                update: `${$d6acc81334b00d34$export$f6f90abbea75f1e0}`
            },
            plotOffsetLeft: {
                name: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetLeft,
                update: '0'
            },
            plotOffsetTop: {
                name: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetTop,
                update: '0'
            },
            plotOffsetBottom: {
                name: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetBottom,
                update: '0'
            },
            plotOffsetRight: {
                name: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetRight,
                update: '0'
            },
            plotHeightOut: {
                name: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotHeightOut,
                update: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotHeightIn
            },
            plotWidthOut: {
                name: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotWidthOut,
                update: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotWidthIn
            }
        };
    }
    validate() {
        const { specContext: specContext1  } = this;
        const { specCapabilities: specCapabilities  } = this.props;
        const { roles: roles  } = specCapabilities;
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
        const { facetLayout: facetLayout , specCapabilities: specCapabilities  } = this.props;
        const { insight: insight , specColumns: specColumns , specViewOptions: specViewOptions  } = specContext1;
        const dataName = 'data_source';
        const { vegaSpec: vegaSpec , groupMark: groupMark  } = this.initSpec(dataName);
        const { topColorField: topColorField , colorDataName: colorDataName  } = $d397a2a1ee48bc5e$export$2dc63264baec3ee2({
            scope: vegaSpec,
            dataName: dataName,
            specContext: specContext1,
            scaleName: $146eeb4362821b4b$export$9a32a517dc4aa15a.Color,
            legendDataName: 'data_legend',
            topLookupName: 'data_topcolorlookup',
            colorReverseSignalName: $146eeb4362821b4b$export$e97f264ccfdb1383.ColorReverse
        });
        const globalScope = new $7001bce89c3d5a96$export$d44ddc9302614dc0({
            dataName: colorDataName,
            markGroup: groupMark,
            scope: vegaSpec,
            signals: this.globalSignals
        });
        if (facetLayout) {
            $b3fb1eeac72b53ef$export$fc8966a6eac27a(vegaSpec, {
                name: $146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingBottom,
                update: `${facetLayout.facetPadding.bottom}`
            }, {
                name: $146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingLeft,
                update: `${facetLayout.facetPadding.left}`
            }, {
                name: $146eeb4362821b4b$export$e97f264ccfdb1383.FacetPaddingTop,
                update: `${facetLayout.facetPadding.top}`
            });
            this.globalSignals.plotOffsetTop.update = `${facetLayout.plotPadding.y}`;
            this.globalSignals.plotOffsetRight.update = `${facetLayout.plotPadding.x}`;
        }
        const { firstScope: firstScope , finalScope: finalScope , specResult: specResult , allGlobalScales: allGlobalScales , allEncodingRules: allEncodingRules  } = this.iterateLayouts(globalScope, (i, innerScope)=>{
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
            let axesScopes = facetLayout ? $5a088e24510c9b50$export$3927d38091f734de({
                globalScope: globalScope.scope,
                plotScope: groupMark,
                facetScope: firstScope,
                colTitleScale: colTitleScale,
                rowTitleScale: rowTitleScale,
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
            $5a387119767f751c$export$323335ebe3b8edf4({
                globalScope: globalScope,
                allGlobalScales: allGlobalScales,
                axisScales: this.props.axisScales,
                plotOffsetSignals: {
                    x: this.globalSignals.plotOffsetLeft,
                    y: this.globalSignals.plotOffsetBottom
                },
                axesOffsets: {
                    x: $d6acc81334b00d34$export$1256463ddc3abfcf,
                    y: $d6acc81334b00d34$export$7ccb1c0a7972a85f
                },
                axesTitlePadding: facetLayout ? {
                    x: $d6acc81334b00d34$export$bfd91bf10acf0a22,
                    y: $d6acc81334b00d34$export$9040dcec103623d1
                } : {
                    x: $d6acc81334b00d34$export$a4d60686dcce912,
                    y: $d6acc81334b00d34$export$ee365cabf3b6c6
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
        }
        //add mark to the final scope
        if (finalScope.mark) {
            const { update: update  } = finalScope.mark.encode;
            const outputDataName = 'output';
            finalScope.mark.from.data = outputDataName;
            $b3fb1eeac72b53ef$export$3af5226bf85b3fe(globalScope.markGroup, {
                name: outputDataName,
                source: globalScope.markDataName,
                transform: [
                    {
                        type: 'formula',
                        expr: finalScope.offsets.x,
                        as: $146eeb4362821b4b$export$29b3fae588fa046f.OffsetX
                    },
                    {
                        type: 'formula',
                        expr: finalScope.offsets.y,
                        as: $146eeb4362821b4b$export$29b3fae588fa046f.OffsetY
                    }
                ]
            });
            update.x = {
                field: $146eeb4362821b4b$export$29b3fae588fa046f.OffsetX
            };
            update.y = {
                field: $146eeb4362821b4b$export$29b3fae588fa046f.OffsetY
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
            update.fill = $bcb29d9941a438e9$export$46d84c5e6bf6c95f(specContext1, topColorField, $146eeb4362821b4b$export$9a32a517dc4aa15a.Color);
            update.opacity = $bcb29d9941a438e9$export$82d51c42c483e4c3(specContext1);
        }
        return {
            specCapabilities: specCapabilities,
            vegaSpec: vegaSpec
        };
    }
    initSpec(dataName) {
        const { globalSignals: globalSignals  } = this;
        const { minCellWidth: minCellWidth , minCellHeight: minCellHeight , plotOffsetLeft: plotOffsetLeft , plotOffsetBottom: plotOffsetBottom , plotOffsetTop: plotOffsetTop , plotOffsetRight: plotOffsetRight , plotHeightOut: plotHeightOut , plotWidthOut: plotWidthOut  } = globalSignals;
        const { specContext: specContext1  } = this;
        const { insight: insight  } = specContext1;
        const groupMark = {
            type: 'group',
            //style: 'cell',
            encode: {
                update: {
                    x: {
                        signal: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetLeft
                    },
                    y: {
                        signal: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetTop
                    },
                    height: {
                        signal: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotHeightOut
                    },
                    width: {
                        signal: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotWidthOut
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
            signals: $573ada9f4d41ca62$export$e568cf8be4c6e956(specContext1, $146eeb4362821b4b$export$e97f264ccfdb1383.ViewportHeight).concat([
                minCellWidth,
                minCellHeight,
                {
                    name: $146eeb4362821b4b$export$e97f264ccfdb1383.ViewportHeight,
                    update: `max(${$146eeb4362821b4b$export$e97f264ccfdb1383.MinCellHeight}, ${insight.size.height})`
                },
                {
                    name: $146eeb4362821b4b$export$e97f264ccfdb1383.ViewportWidth,
                    update: `max(${$146eeb4362821b4b$export$e97f264ccfdb1383.MinCellWidth}, ${insight.size.width})`
                },
                plotOffsetLeft,
                plotOffsetTop,
                plotOffsetBottom,
                plotOffsetRight,
                {
                    name: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotHeightIn,
                    update: `${$146eeb4362821b4b$export$e97f264ccfdb1383.ViewportHeight} - ${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetBottom}`
                },
                {
                    name: $146eeb4362821b4b$export$e97f264ccfdb1383.PlotWidthIn,
                    update: `${$146eeb4362821b4b$export$e97f264ccfdb1383.ViewportWidth} - ${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetLeft} - ${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetRight}`
                },
                plotHeightOut,
                plotWidthOut,
                {
                    name: 'height',
                    update: `${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetTop} + ${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotHeightOut} + ${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetBottom}`
                },
                {
                    name: 'width',
                    update: `${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotWidthOut} + ${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetLeft} + ${$146eeb4362821b4b$export$e97f264ccfdb1383.PlotOffsetRight}`
                }
            ])
        };
        return {
            vegaSpec: vegaSpec,
            groupMark: groupMark
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
        let { layouts: layouts , specCapabilities: specCapabilities  } = this.props;
        const allGlobalScales = [];
        const allEncodingRules = [];
        for(let i = 0; i < layouts.length; i++){
            if (!parentScope) continue;
            let buildProps = {
                globalScope: globalScope,
                parentScope: parentScope,
                axesScales: this.props.axisScales,
                groupings: groupings,
                id: i
            };
            let layout = this.createLayout(layouts[i], buildProps);
            try {
                childScope = layout.build();
                childScope.id = i;
                let groupby = layout.getGrouping();
                if (groupby) groupings.push({
                    id: i,
                    groupby: groupby,
                    fieldOps: [
                        {
                            field: null,
                            op: 'count',
                            as: $146eeb4362821b4b$export$29b3fae588fa046f.Count
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
                    specCapabilities: specCapabilities,
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
            firstScope: firstScope,
            finalScope: parentScope,
            specResult: specResult,
            allGlobalScales: allGlobalScales,
            allEncodingRules: allEncodingRules
        };
    }
    createLayout(layoutPair, buildProps) {
        const { layoutType: layoutType , props: props1  } = layoutPair;
        const layoutBuildProps = Object.assign(Object.assign({
        }, props1), buildProps);
        const layoutClass = $99976a6cdb2da6d0$export$b90520ed48a3c473[layoutType];
        const layout = new layoutClass(layoutBuildProps);
        layout.id = buildProps.id;
        return layout;
    }
}


function $4d5208b78df53d91$export$169a89f54f090971(specContext, currData) {
    const { specColumns: specColumns  } = specContext;
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
    $0ebaa52647c6073e$export$47bd397f706b4d82(columns, currData);
    const specBuilderProps = $5dcad97ed164a566$export$c48d4298c35d80ce(specContext);
    const specBuilder = new $2c2a51b6f108069b$export$e15a5a4be5d609df(specBuilderProps, specContext);
    let specResult;
    if (specBuilder) {
        try {
            const errors = specBuilder.validate();
            if (errors.length) specResult = {
                errors: errors,
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




var $ba77fb5fc2d740bc$exports = {};


var $ed1c58c4a3fb69c4$exports = {};


$parcel$exportWildcard($2b1a2fc98adbe4f1$exports, $4d5208b78df53d91$exports);
$parcel$exportWildcard($2b1a2fc98adbe4f1$exports, $146eeb4362821b4b$exports);
$parcel$exportWildcard($2b1a2fc98adbe4f1$exports, $0ebaa52647c6073e$exports);
$parcel$exportWildcard($2b1a2fc98adbe4f1$exports, $ba77fb5fc2d740bc$exports);
$parcel$exportWildcard($2b1a2fc98adbe4f1$exports, $ed1c58c4a3fb69c4$exports);


const $a3b399caf5d2c16b$export$b86d149b7c15b53e = 'GL_ORDINAL';


var $311a0d2a8fe80ff7$exports = {};
var $66f57d958d42d9ea$exports = {};

$parcel$export($66f57d958d42d9ea$exports, "startsWith", () => $66f57d958d42d9ea$export$9c9bf82e6c23f371);
$parcel$export($66f57d958d42d9ea$exports, "compare", () => $66f57d958d42d9ea$export$df417da3ae0614a2);
$parcel$export($66f57d958d42d9ea$exports, "compareExpression", () => $66f57d958d42d9ea$export$78b9bb7e1041123b);
$parcel$export($66f57d958d42d9ea$exports, "compareGroup", () => $66f57d958d42d9ea$export$4220516453312347);
var $3df0cd4d21e5cd73$exports = {};

$parcel$export($3df0cd4d21e5cd73$exports, "ensureSearchExpressionGroupArray", () => $3df0cd4d21e5cd73$export$fe113050ed871cdd);
$parcel$export($3df0cd4d21e5cd73$exports, "isSearchExpressionGroup", () => $3df0cd4d21e5cd73$export$9dd7672f9e515de5);
$parcel$export($3df0cd4d21e5cd73$exports, "createGroupFromExpression", () => $3df0cd4d21e5cd73$export$d32b363d4983b578);
function $3df0cd4d21e5cd73$export$9dd7672f9e515de5(search) {
    if (!search) return false;
    return !!search.expressions;
}
function $3df0cd4d21e5cd73$export$d32b363d4983b578(input) {
    const output = {
        expressions: [
            input
        ]
    };
    return output;
}
function $3df0cd4d21e5cd73$export$fe113050ed871cdd(search) {
    if (Array.isArray(search)) return [
        ...search
    ];
    else if ($3df0cd4d21e5cd73$export$9dd7672f9e515de5(search)) return [
        search
    ];
    else return [
        $3df0cd4d21e5cd73$export$d32b363d4983b578(search)
    ];
}


const $66f57d958d42d9ea$var$expressionKeys = Object.keys({
    clause: null,
    name: null,
    operator: null,
    value: null
});
function $66f57d958d42d9ea$export$78b9bb7e1041123b(a, b) {
    if (a && b) for(let k = 0; k < $66f57d958d42d9ea$var$expressionKeys.length; k++){
        let key = $66f57d958d42d9ea$var$expressionKeys[k];
        if (a[key] != b[key]) return false;
    }
    else return !a && !b;
    return true;
}
const $66f57d958d42d9ea$var$groupKeys = Object.keys({
    clause: null
});
function $66f57d958d42d9ea$export$4220516453312347(a, b) {
    for(let k = 0; k < $66f57d958d42d9ea$var$groupKeys.length; k++){
        let key = $66f57d958d42d9ea$var$groupKeys[k];
        if (a[key] != b[key]) return false;
    }
    if (!a.expressions && !b.expressions) return true;
    if (!a.expressions || !b.expressions) return false;
    if (a.expressions.length != b.expressions.length) return false;
    for(let i = 0; i < a.expressions.length; i++){
        if (!$66f57d958d42d9ea$export$78b9bb7e1041123b(a.expressions[i], b.expressions[i])) return false;
    }
    return true;
}
function $66f57d958d42d9ea$export$df417da3ae0614a2(a, b) {
    if (a == b) return true;
    if (!a || !b) return false;
    let arrs = [
        a,
        b
    ].map($3df0cd4d21e5cd73$export$fe113050ed871cdd);
    let [arrA, arrB] = arrs;
    if (arrA.length != arrB.length) return false;
    for(let i = 0; i < arrA.length; i++){
        if (!$66f57d958d42d9ea$export$4220516453312347(arrA[i], arrB[i])) return false;
    }
    return true;
}
function $66f57d958d42d9ea$export$9c9bf82e6c23f371(whole, part) {
    if (!part) return true;
    let arrs = [
        whole,
        part
    ].map($3df0cd4d21e5cd73$export$fe113050ed871cdd);
    let [wholeArray, partArray] = arrs;
    if (partArray.length > wholeArray.length) return false;
    for(let i = 0; i < partArray.length; i++){
        if (!$66f57d958d42d9ea$export$4220516453312347(wholeArray[i], partArray[i])) return false;
    }
    return true;
}


var $745dd93524c614f6$exports = {};

$parcel$export($745dd93524c614f6$exports, "Exec", () => $745dd93524c614f6$export$17847fd07a76a1e0);

function $745dd93524c614f6$var$valueToBoolean(value) {
    if (typeof value === 'string') switch(value.toLowerCase()){
        case 'true':
            return true;
        case 'false':
            return false;
    }
    return !!value;
}
function $745dd93524c614f6$var$valueToString(value) {
    if (value == null) return '';
    switch(typeof value){
        case 'string':
            return value;
        case 'boolean':
        case 'number':
            return value.toString();
    }
    return '';
}
function $745dd93524c614f6$var$isStringOperation(ex) {
    switch(ex.operator){
        case 'contains':
        case '!contains':
        case 'starts':
        case '!starts':
            return true;
    }
    return false;
}
function $745dd93524c614f6$var$isnullorEmpty(value) {
    if (value == null) return true; //double equal sign to also catch undefined
    if (typeof value === 'string' && value.length === 0) return true;
    return false;
}
class $745dd93524c614f6$export$17847fd07a76a1e0 {
    constructor(search, columns){
        this.columns = columns;
        this.groups = $3df0cd4d21e5cd73$export$fe113050ed871cdd(search).map((g)=>{
            const expressions = g.expressions.filter(Boolean);
            expressions.forEach((ex)=>{
                ex.column = this.getColumn(ex.name);
                ex.valueBool = $745dd93524c614f6$var$valueToBoolean(ex.value);
                ex.valueLow = $745dd93524c614f6$var$valueToString(ex.value).toLocaleLowerCase();
                ex.stringOperation = $745dd93524c614f6$var$isStringOperation(ex);
            });
            const group = Object.assign(Object.assign({
            }, g), {
                expressions: expressions
            });
            return group;
        });
    }
    getColumn(name) {
        for(let i = 0; i < this.columns.length; i++){
            if (this.columns[i].name == name) return this.columns[i];
        }
    }
    runExpressionOnColumn(datum, ex) {
        const actualDataValue = datum[ex.name];
        if (ex.operator === 'isnullorEmpty') return $745dd93524c614f6$var$isnullorEmpty(actualDataValue);
        else if (ex.operator === '!isnullorEmpty') return !$745dd93524c614f6$var$isnullorEmpty(actualDataValue);
        let dataValue = actualDataValue;
        let expressionValue = ex.value;
        if (ex.column) {
            if (ex.column.type === 'string' || ex.stringOperation) {
                dataValue = $745dd93524c614f6$var$valueToString(actualDataValue).toLocaleLowerCase();
                expressionValue = ex.valueLow;
            } else if (ex.column.type === 'boolean') {
                dataValue = $745dd93524c614f6$var$valueToBoolean(actualDataValue);
                expressionValue = ex.valueBool;
            } else if (ex.column.quantitative) {
                dataValue = +actualDataValue;
                expressionValue = +ex.value;
            }
        }
        switch(ex.operator){
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
                expressions: this.columns.map((column, i)=>{
                    const ex2 = Object.assign(Object.assign({
                    }, ex), {
                        column: column,
                        name: column.name
                    });
                    if (i) ex2.clause = '||';
                    return ex2;
                })
            };
            return this.runGroup(datum, group);
        } else return this.runExpressionOnColumn(datum, ex);
    }
    runGroup(datum, group) {
        let accumulator = this.runExpression(datum, group.expressions[0]);
        for(let i = 1; i < group.expressions.length; i++){
            let ex = group.expressions[i];
            switch(ex.clause){
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
        for(let i = 1; i < this.groups.length; i++){
            let group = this.groups[i];
            switch(group.clause){
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



var $00705dd910744dd8$exports = {};

$parcel$export($00705dd910744dd8$exports, "invert", () => $00705dd910744dd8$export$4469b01c89fa5613);

function $00705dd910744dd8$var$invertSearchExpressionGroup(input) {
    //this only works if all expressions in this group have the same clause
    const output = {
        expressions: input.expressions.map($00705dd910744dd8$var$invertSearchExpression)
    };
    if (input.clause) output.clause = $00705dd910744dd8$var$invertedClauses[input.clause];
    return output;
}
const $00705dd910744dd8$var$invertedOperators = {
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
const $00705dd910744dd8$var$invertedClauses = {
    '&&': '||',
    '||': '&&'
};
function $00705dd910744dd8$var$invertSearchExpression(input) {
    const operator = $00705dd910744dd8$var$invertedOperators[input.operator];
    const output = Object.assign(Object.assign({
    }, input), {
        operator: operator
    });
    if (input.clause) output.clause = $00705dd910744dd8$var$invertedClauses[input.clause];
    return output;
}
function $00705dd910744dd8$export$4469b01c89fa5613(search) {
    if (Array.isArray(search)) return search.map($00705dd910744dd8$var$invertSearchExpressionGroup);
    else if ($3df0cd4d21e5cd73$export$9dd7672f9e515de5(search)) return $00705dd910744dd8$var$invertSearchExpressionGroup(search);
    else return $00705dd910744dd8$var$invertSearchExpression(search);
}


var $d8f1ab965659a119$exports = {};

$parcel$export($d8f1ab965659a119$exports, "narrow", () => $d8f1ab965659a119$export$aeb8b82cc90b8eb1);

function $d8f1ab965659a119$export$aeb8b82cc90b8eb1(a, b) {
    if (!a) return b;
    let arrs = [
        a,
        b
    ].map($3df0cd4d21e5cd73$export$fe113050ed871cdd);
    let [arrA, arrB] = arrs;
    arrB[0].clause = '&&';
    return arrA.concat(arrB);
}


var $c12daddb8da8817c$exports = {};


$parcel$exportWildcard($311a0d2a8fe80ff7$exports, $66f57d958d42d9ea$exports);
$parcel$exportWildcard($311a0d2a8fe80ff7$exports, $745dd93524c614f6$exports);
$parcel$exportWildcard($311a0d2a8fe80ff7$exports, $3df0cd4d21e5cd73$exports);
$parcel$exportWildcard($311a0d2a8fe80ff7$exports, $00705dd910744dd8$exports);
$parcel$exportWildcard($311a0d2a8fe80ff7$exports, $d8f1ab965659a119$exports);
$parcel$exportWildcard($311a0d2a8fe80ff7$exports, $c12daddb8da8817c$exports);



var $e41d8194c950c589$exports = {};


var $406c1b16a5bd3c44$exports = {};

$parcel$export($406c1b16a5bd3c44$exports, "isInternalFieldName", () => $406c1b16a5bd3c44$export$2634e87bf7671285);
$parcel$export($406c1b16a5bd3c44$exports, "getColumnsFromData", () => $0ebaa52647c6073e$export$d25d2216dc7fff5a);
$parcel$export($406c1b16a5bd3c44$exports, "getStats", () => $0ebaa52647c6073e$export$4c75e2c8266a336d);
$parcel$export($406c1b16a5bd3c44$exports, "inferAll", () => $0ebaa52647c6073e$export$47bd397f706b4d82);
$parcel$export($406c1b16a5bd3c44$exports, "getPresenterStyle", () => $4143f1453a8890e4$export$3e1dd6a74003f7a3);


var $7f572b57d5948475$exports = {};

$parcel$export($7f572b57d5948475$exports, "base", () => $2f0c752020c76b68$export$12896e353ebd9cc);
$parcel$export($7f572b57d5948475$exports, "use", () => $2f0c752020c76b68$export$44747fb0056adba5);
$parcel$export($7f572b57d5948475$exports, "Presenter", () => $f11b1222d18f5aff$export$67eca7ff2a7e9e8e);
$parcel$export($7f572b57d5948475$exports, "ViewGl", () => $65b765713b03cc6f$export$5ae75a3802efaf);
$parcel$export($7f572b57d5948475$exports, "constants", () => $d1b153eb04166abb$exports);
$parcel$export($7f572b57d5948475$exports, "controls", () => $98be522bb53bca50$exports);
$parcel$export($7f572b57d5948475$exports, "defaults", () => $1c19a15e6d55f62b$exports);
$parcel$export($7f572b57d5948475$exports, "types", () => $939314e4753f8ed9$exports);
$parcel$export($7f572b57d5948475$exports, "util", () => $00670849ca68e684$exports);
var $d1b153eb04166abb$exports = {};

$parcel$export($d1b153eb04166abb$exports, "layerNames", () => $d1b153eb04166abb$export$2ff906254960e78d);
const $d1b153eb04166abb$export$2ff906254960e78d = {
    cubes: 'LAYER_CUBES',
    lines: 'LAYER_LINES',
    text: 'LAYER_TEXT',
    paths: 'LAYER_PATHS',
    polygons: 'LAYER_POLYGONS'
};


var $98be522bb53bca50$exports = {};

$parcel$export($98be522bb53bca50$exports, "Table", () => $ff59b0d7f89aca0c$export$b168bb048906b6d9);
var $2f7102f270c1ff71$exports = {};
'use strict';
parcelRequire.register("eympE", function(module, exports) {
module.exports = JSON.parse("[\"a\",\"abbr\",\"address\",\"area\",\"article\",\"aside\",\"audio\",\"b\",\"base\",\"bdi\",\"bdo\",\"blockquote\",\"body\",\"br\",\"button\",\"canvas\",\"caption\",\"cite\",\"code\",\"col\",\"colgroup\",\"data\",\"datalist\",\"dd\",\"del\",\"details\",\"dfn\",\"dialog\",\"div\",\"dl\",\"dt\",\"em\",\"embed\",\"fieldset\",\"figcaption\",\"figure\",\"footer\",\"form\",\"h1\",\"h2\",\"h3\",\"h4\",\"h5\",\"h6\",\"head\",\"header\",\"hgroup\",\"hr\",\"html\",\"i\",\"iframe\",\"img\",\"input\",\"ins\",\"kbd\",\"keygen\",\"label\",\"legend\",\"li\",\"link\",\"main\",\"map\",\"mark\",\"math\",\"menu\",\"menuitem\",\"meta\",\"meter\",\"nav\",\"noscript\",\"object\",\"ol\",\"optgroup\",\"option\",\"output\",\"p\",\"param\",\"picture\",\"pre\",\"progress\",\"q\",\"rb\",\"rp\",\"rt\",\"rtc\",\"ruby\",\"s\",\"samp\",\"script\",\"section\",\"select\",\"slot\",\"small\",\"source\",\"span\",\"strong\",\"style\",\"sub\",\"summary\",\"sup\",\"svg\",\"table\",\"tbody\",\"td\",\"template\",\"textarea\",\"tfoot\",\"th\",\"thead\",\"time\",\"title\",\"tr\",\"track\",\"u\",\"ul\",\"var\",\"video\",\"wbr\"]");

});


$2f7102f270c1ff71$exports = (parcelRequire("eympE"));


var $c64d8daaa8ccecd0$exports = {};
parcelRequire.register("674G1", function(module, exports) {
module.exports = JSON.parse("[\"a\",\"altGlyph\",\"altGlyphDef\",\"altGlyphItem\",\"animate\",\"animateColor\",\"animateMotion\",\"animateTransform\",\"circle\",\"clipPath\",\"color-profile\",\"cursor\",\"defs\",\"desc\",\"ellipse\",\"feBlend\",\"feColorMatrix\",\"feComponentTransfer\",\"feComposite\",\"feConvolveMatrix\",\"feDiffuseLighting\",\"feDisplacementMap\",\"feDistantLight\",\"feFlood\",\"feFuncA\",\"feFuncB\",\"feFuncG\",\"feFuncR\",\"feGaussianBlur\",\"feImage\",\"feMerge\",\"feMergeNode\",\"feMorphology\",\"feOffset\",\"fePointLight\",\"feSpecularLighting\",\"feSpotLight\",\"feTile\",\"feTurbulence\",\"filter\",\"font\",\"font-face\",\"font-face-format\",\"font-face-name\",\"font-face-src\",\"font-face-uri\",\"foreignObject\",\"g\",\"glyph\",\"glyphRef\",\"hkern\",\"image\",\"line\",\"linearGradient\",\"marker\",\"mask\",\"metadata\",\"missing-glyph\",\"mpath\",\"path\",\"pattern\",\"polygon\",\"polyline\",\"radialGradient\",\"rect\",\"script\",\"set\",\"stop\",\"style\",\"svg\",\"switch\",\"symbol\",\"text\",\"textPath\",\"title\",\"tref\",\"tspan\",\"use\",\"view\",\"vkern\"]");

});


$c64d8daaa8ccecd0$exports = (parcelRequire("674G1"));


const $0bf1192cadf6b31c$var$htmlTagArray = $2f7102f270c1ff71$exports.default || $2f7102f270c1ff71$exports;
const $0bf1192cadf6b31c$var$svgTagArray = $c64d8daaa8ccecd0$exports.default || $c64d8daaa8ccecd0$exports;
/**
 * Decamelizes a string with/without a custom separator (hyphen by default).
 * from: https://ourcodeworld.com/articles/read/608/how-to-camelize-and-decamelize-strings-in-javascript
 *
 * @param str String in camelcase
 * @param separator Separator for the new decamelized string.
 */ function $0bf1192cadf6b31c$var$decamelize(str, separator = '-') {
    return str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase();
}
function $0bf1192cadf6b31c$export$2f8418d37d4320b9(tag, attrs, ...children) {
    if (typeof tag === 'function') {
        const fn = tag;
        const props = attrs;
        props.children = children;
        return fn(props);
    } else {
        const ns = $0bf1192cadf6b31c$var$tagNamespace(tag);
        const el = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
        const map = attrs;
        let ref;
        for(let name in map)if (name && map.hasOwnProperty(name)) {
            let value = map[name];
            if (name === 'className' && value !== void 0) $0bf1192cadf6b31c$var$setAttribute(el, ns, 'class', value.toString());
            else if (name === 'disabled' && !value) ;
            else if (value === null || value === undefined) continue;
            else if (value === true) $0bf1192cadf6b31c$var$setAttribute(el, ns, name, name);
            else if (typeof value === 'function') {
                if (name === 'ref') ref = value;
                else el[name.toLowerCase()] = value;
            } else if (typeof value === 'object') $0bf1192cadf6b31c$var$setAttribute(el, ns, name, $0bf1192cadf6b31c$var$flatten(value));
            else $0bf1192cadf6b31c$var$setAttribute(el, ns, name, value.toString());
        }
        if (children && children.length > 0) $0bf1192cadf6b31c$var$appendChildren(el, children);
        if (ref) ref(el);
        return el;
    }
}
function $0bf1192cadf6b31c$var$setAttribute(el, ns, name, value) {
    if (ns) el.setAttributeNS(null, name, value);
    else el.setAttribute(name, value);
}
function $0bf1192cadf6b31c$var$flatten(o) {
    const arr = [];
    for(let prop in o)arr.push(`${$0bf1192cadf6b31c$var$decamelize(prop, '-')}:${o[prop]}`);
    return arr.join(';');
}
function $0bf1192cadf6b31c$export$dc189866963b3431(parentElement, child) {
    if (child === null || child === undefined || typeof child === "boolean") return;
    else if (Array.isArray(child)) $0bf1192cadf6b31c$var$appendChildren(parentElement, child);
    else if ($0bf1192cadf6b31c$var$isElement(child)) parentElement.appendChild(child);
    else parentElement.appendChild(document.createTextNode(child.toString()));
}
function $0bf1192cadf6b31c$var$appendChildren(parentElement, children) {
    children.forEach((child)=>$0bf1192cadf6b31c$export$dc189866963b3431(parentElement, child)
    );
}
function $0bf1192cadf6b31c$var$isElement(el) {
    //nodeType cannot be zero https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    return !!el.nodeType;
}
function $0bf1192cadf6b31c$export$294609abb1df04a5(element, container) {
    container.innerHTML = '';
    if (element) $0bf1192cadf6b31c$export$dc189866963b3431(container, element);
}
function $0bf1192cadf6b31c$export$8e7b2a330fc63a94(childPositions, container) {
    let element = container || document.body;
    let childPosition;
    while(element && childPositions.length){
        childPosition = childPositions.shift();
        element = element.children.item(childPosition);
    }
    if (element) return element;
}
function $0bf1192cadf6b31c$export$e46a73d8be6af194(element, activeElementInfo) {
    element.focus();
    element.scrollTop = activeElementInfo.scrollTop;
    const input = element;
    if (input.setSelectionRange && activeElementInfo && activeElementInfo.selectionStart != null && activeElementInfo.selectionEnd != null) input.setSelectionRange(activeElementInfo.selectionStart, activeElementInfo.selectionEnd, activeElementInfo.selectionDirection);
}
function $0bf1192cadf6b31c$export$86621cf2b9b16a69(activeElementInfo, container) {
    if (activeElementInfo) {
        const element = $0bf1192cadf6b31c$export$8e7b2a330fc63a94(activeElementInfo.childPositions, container);
        if (element) $0bf1192cadf6b31c$export$e46a73d8be6af194(element, activeElementInfo);
    }
}
function $0bf1192cadf6b31c$export$1b18789f888bc242(container) {
    let element = document.activeElement;
    const { scrollTop: scrollTop , selectionDirection: selectionDirection , selectionEnd: selectionEnd , selectionStart: selectionStart  } = element;
    const activeElementInfo = {
        childPositions: [],
        scrollTop: scrollTop,
        selectionDirection: selectionDirection,
        selectionEnd: selectionEnd,
        selectionStart: selectionStart
    };
    while(element && element !== document.body && element !== container){
        activeElementInfo.childPositions.unshift($0bf1192cadf6b31c$var$getChildPosition(element));
        element = element.parentElement;
    }
    if ((element === document.body || element === container) && activeElementInfo.childPositions.length) return activeElementInfo;
}
function $0bf1192cadf6b31c$var$getChildPosition(element) {
    let childPosition = 0;
    while(element = element.previousElementSibling)childPosition++;
    return childPosition;
}
function $0bf1192cadf6b31c$var$tagNamespace(tag) {
    //issue: this won't disambiguate certain tags which exist in both svg and html: <a>, <title> ...
    if (tag === 'svg' || $0bf1192cadf6b31c$var$svgTagArray.indexOf(tag) >= 0 && !($0bf1192cadf6b31c$var$htmlTagArray.indexOf(tag) >= 0)) return "http://www.w3.org/2000/svg";
}


const $ff59b0d7f89aca0c$var$KeyCodes = {
    ENTER: 13
};
const $ff59b0d7f89aca0c$export$b168bb048906b6d9 = (props)=>{
    return $0bf1192cadf6b31c$export$2f8418d37d4320b9("table", {
        className: props.className
    }, props.children, props.rows.map((row, i)=>$0bf1192cadf6b31c$export$2f8418d37d4320b9("tr", {
            className: props.rowClassName || '',
            onClick: (e)=>props.onRowClick && props.onRowClick(e, i)
            ,
            tabIndex: props.onRowClick ? 0 : -1,
            onKeyUp: (e)=>{
                if (e.keyCode === $ff59b0d7f89aca0c$var$KeyCodes.ENTER && props.onRowClick) props.onRowClick(e, i);
            }
        }, row.cells.map((cell, i1)=>$0bf1192cadf6b31c$export$2f8418d37d4320b9("td", {
                className: cell.className || '',
                title: cell.title || ''
            }, cell.content)
        ))
    ));
};




var $939314e4753f8ed9$exports = {};


var $00670849ca68e684$exports = {};

$parcel$export($00670849ca68e684$exports, "addDiv", () => $39024345cb86b5d3$export$5e33e52a795b786d);
$parcel$export($00670849ca68e684$exports, "addEl", () => $39024345cb86b5d3$export$d9b9448966a4dbba);
$parcel$export($00670849ca68e684$exports, "allTruthy", () => $b0c54bedf6c3c64b$export$6a130595254331b4);
$parcel$export($00670849ca68e684$exports, "clone", () => $951ee4546fb8e7ae$export$d6a0542127b96c83);
$parcel$export($00670849ca68e684$exports, "colorFromString", () => $7654630391f879a6$export$286939df77fc306a);
$parcel$export($00670849ca68e684$exports, "colorIsEqual", () => $7654630391f879a6$export$7e1a2014f13a3acf);
$parcel$export($00670849ca68e684$exports, "colorToString", () => $7654630391f879a6$export$303cc9cbd0520953);
$parcel$export($00670849ca68e684$exports, "concat", () => $b0c54bedf6c3c64b$export$dde0d4a9e80fb26f);
$parcel$export($00670849ca68e684$exports, "createElement", () => $0bf1192cadf6b31c$export$2f8418d37d4320b9);
$parcel$export($00670849ca68e684$exports, "deepMerge", () => $951ee4546fb8e7ae$export$5cce22d6f6e7c745);
$parcel$export($00670849ca68e684$exports, "desaturate", () => $7654630391f879a6$export$dfbfe7a0951e0f20);
$parcel$export($00670849ca68e684$exports, "getActiveElementInfo", () => $0bf1192cadf6b31c$export$1b18789f888bc242);
$parcel$export($00670849ca68e684$exports, "getCubeLayer", () => $22297b1890eb4722$export$64c4e13ca1f096d);
$parcel$export($00670849ca68e684$exports, "getCubes", () => $22297b1890eb4722$export$f78fa54c8b685d69);
$parcel$export($00670849ca68e684$exports, "mount", () => $0bf1192cadf6b31c$export$294609abb1df04a5);
$parcel$export($00670849ca68e684$exports, "outerSize", () => $39024345cb86b5d3$export$c2ca7eb188f2974);
$parcel$export($00670849ca68e684$exports, "push", () => $b0c54bedf6c3c64b$export$280e7edab0689157);
$parcel$export($00670849ca68e684$exports, "setActiveElement", () => $0bf1192cadf6b31c$export$86621cf2b9b16a69);
function $b0c54bedf6c3c64b$export$dde0d4a9e80fb26f(...args) {
    return args.reduce((p, c)=>c ? p.concat(c) : p
    , []);
}
function $b0c54bedf6c3c64b$export$6a130595254331b4(...args) {
    return args.reduce((p, c)=>c ? p.concat(c) : p
    , []).filter(Boolean);
}
function $b0c54bedf6c3c64b$export$280e7edab0689157(arr, items) {
    arr.push.apply(arr, items);
}


function $39024345cb86b5d3$export$d9b9448966a4dbba(tagName, parentElement) {
    const el = document.createElement(tagName);
    parentElement.appendChild(el);
    return el;
}
function $39024345cb86b5d3$export$5e33e52a795b786d(parentElement, className) {
    const div = $39024345cb86b5d3$export$d9b9448966a4dbba('div', parentElement);
    if (className) div.className = className;
    return div;
}
function $39024345cb86b5d3$export$c2ca7eb188f2974(el) {
    const cs = getComputedStyle(el);
    const height = parseFloat(cs.marginTop) + parseFloat(cs.paddingTop) + parseFloat(cs.borderTopWidth) + el.offsetHeight + parseFloat(cs.borderBottomWidth) + parseFloat(cs.paddingBottom) + parseFloat(cs.marginBottom);
    const width = parseFloat(cs.marginLeft) + parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth) + el.offsetWidth + parseFloat(cs.borderRightWidth) + parseFloat(cs.paddingRight) + parseFloat(cs.marginRight);
    return {
        height: height,
        width: width
    };
}


var $a46edc27fdb359bb$exports = {};

$parcel$defineInteropFlag($a46edc27fdb359bb$exports);

$parcel$export($a46edc27fdb359bb$exports, "default", () => $a46edc27fdb359bb$export$9099ad97b570f7c);
var $a46edc27fdb359bb$var$isMergeableObject = function isMergeableObject(value) {
    return $a46edc27fdb359bb$var$isNonNullObject(value) && !$a46edc27fdb359bb$var$isSpecial(value);
};
function $a46edc27fdb359bb$var$isNonNullObject(value) {
    return !!value && typeof value === 'object';
}
function $a46edc27fdb359bb$var$isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);
    return stringValue === '[object RegExp]' || stringValue === '[object Date]' || $a46edc27fdb359bb$var$isReactElement(value);
}
// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var $a46edc27fdb359bb$var$canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var $a46edc27fdb359bb$var$REACT_ELEMENT_TYPE = $a46edc27fdb359bb$var$canUseSymbol ? Symbol.for('react.element') : 60103;
function $a46edc27fdb359bb$var$isReactElement(value) {
    return value.$$typeof === $a46edc27fdb359bb$var$REACT_ELEMENT_TYPE;
}
function $a46edc27fdb359bb$var$emptyTarget(val) {
    return Array.isArray(val) ? [] : {
    };
}
function $a46edc27fdb359bb$var$cloneUnlessOtherwiseSpecified(value, options) {
    return options.clone !== false && options.isMergeableObject(value) ? $a46edc27fdb359bb$var$deepmerge($a46edc27fdb359bb$var$emptyTarget(value), value, options) : value;
}
function $a46edc27fdb359bb$var$defaultArrayMerge(target, source, options) {
    return target.concat(source).map(function(element) {
        return $a46edc27fdb359bb$var$cloneUnlessOtherwiseSpecified(element, options);
    });
}
function $a46edc27fdb359bb$var$mergeObject(target, source, options) {
    var destination = {
    };
    if (options.isMergeableObject(target)) Object.keys(target).forEach(function(key) {
        destination[key] = $a46edc27fdb359bb$var$cloneUnlessOtherwiseSpecified(target[key], options);
    });
    Object.keys(source).forEach(function(key) {
        if (!options.isMergeableObject(source[key]) || !target[key]) destination[key] = $a46edc27fdb359bb$var$cloneUnlessOtherwiseSpecified(source[key], options);
        else destination[key] = $a46edc27fdb359bb$var$deepmerge(target[key], source[key], options);
    });
    return destination;
}
function $a46edc27fdb359bb$var$deepmerge(target, source, options) {
    options = options || {
    };
    options.arrayMerge = options.arrayMerge || $a46edc27fdb359bb$var$defaultArrayMerge;
    options.isMergeableObject = options.isMergeableObject || $a46edc27fdb359bb$var$isMergeableObject;
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
    if (!sourceAndTargetTypesMatch) return $a46edc27fdb359bb$var$cloneUnlessOtherwiseSpecified(source, options);
    else if (sourceIsArray) return options.arrayMerge(target, source, options);
    else return $a46edc27fdb359bb$var$mergeObject(target, source, options);
}
$a46edc27fdb359bb$var$deepmerge.all = function deepmergeAll(array, options) {
    if (!Array.isArray(array)) throw new Error('first argument should be an array');
    return array.reduce(function(prev, next) {
        return $a46edc27fdb359bb$var$deepmerge(prev, next, options);
    }, {
    });
};
var $a46edc27fdb359bb$var$deepmerge_1 = $a46edc27fdb359bb$var$deepmerge;
var $a46edc27fdb359bb$export$9099ad97b570f7c = $a46edc27fdb359bb$var$deepmerge_1;


const $951ee4546fb8e7ae$var$deepmerge = $a46edc27fdb359bb$exports.default || $a46edc27fdb359bb$exports;
function $951ee4546fb8e7ae$export$d6a0542127b96c83(objectToClone) {
    if (!objectToClone) return objectToClone;
    return $951ee4546fb8e7ae$var$deepmerge.all([
        objectToClone
    ]);
}
const $951ee4546fb8e7ae$var$dontMerge = (destination, source)=>source
;
function $951ee4546fb8e7ae$export$5cce22d6f6e7c745(...objectsToMerge) {
    const objects = objectsToMerge.filter(Boolean);
    return $951ee4546fb8e7ae$var$deepmerge.all(objects, {
        arrayMerge: $951ee4546fb8e7ae$var$dontMerge
    });
}


function $dbe51e4b908eb1a9$export$9099ad97b570f7c(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
}
function $dbe51e4b908eb1a9$export$46e35401bc090c62(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for(var key in definition)prototype[key] = definition[key];
    return prototype;
}


function $01e74fbc311d3ed5$export$e4830c8e55b4f80d() {
}
var $01e74fbc311d3ed5$export$a49b5ca9db8c9416 = 0.7;
var $01e74fbc311d3ed5$export$acf32b1b82ce4fe7 = 1 / $01e74fbc311d3ed5$export$a49b5ca9db8c9416;
var $01e74fbc311d3ed5$var$reI = "\\s*([+-]?\\d+)\\s*", $01e74fbc311d3ed5$var$reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", $01e74fbc311d3ed5$var$reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $01e74fbc311d3ed5$var$reHex = /^#([0-9a-f]{3,8})$/, $01e74fbc311d3ed5$var$reRgbInteger = new RegExp("^rgb\\(" + [
    $01e74fbc311d3ed5$var$reI,
    $01e74fbc311d3ed5$var$reI,
    $01e74fbc311d3ed5$var$reI
] + "\\)$"), $01e74fbc311d3ed5$var$reRgbPercent = new RegExp("^rgb\\(" + [
    $01e74fbc311d3ed5$var$reP,
    $01e74fbc311d3ed5$var$reP,
    $01e74fbc311d3ed5$var$reP
] + "\\)$"), $01e74fbc311d3ed5$var$reRgbaInteger = new RegExp("^rgba\\(" + [
    $01e74fbc311d3ed5$var$reI,
    $01e74fbc311d3ed5$var$reI,
    $01e74fbc311d3ed5$var$reI,
    $01e74fbc311d3ed5$var$reN
] + "\\)$"), $01e74fbc311d3ed5$var$reRgbaPercent = new RegExp("^rgba\\(" + [
    $01e74fbc311d3ed5$var$reP,
    $01e74fbc311d3ed5$var$reP,
    $01e74fbc311d3ed5$var$reP,
    $01e74fbc311d3ed5$var$reN
] + "\\)$"), $01e74fbc311d3ed5$var$reHslPercent = new RegExp("^hsl\\(" + [
    $01e74fbc311d3ed5$var$reN,
    $01e74fbc311d3ed5$var$reP,
    $01e74fbc311d3ed5$var$reP
] + "\\)$"), $01e74fbc311d3ed5$var$reHslaPercent = new RegExp("^hsla\\(" + [
    $01e74fbc311d3ed5$var$reN,
    $01e74fbc311d3ed5$var$reP,
    $01e74fbc311d3ed5$var$reP,
    $01e74fbc311d3ed5$var$reN
] + "\\)$");
var $01e74fbc311d3ed5$var$named = {
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
$dbe51e4b908eb1a9$export$9099ad97b570f7c($01e74fbc311d3ed5$export$e4830c8e55b4f80d, $01e74fbc311d3ed5$export$9099ad97b570f7c, {
    copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
        return this.rgb().displayable();
    },
    hex: $01e74fbc311d3ed5$var$color_formatHex,
    formatHex: $01e74fbc311d3ed5$var$color_formatHex,
    formatHsl: $01e74fbc311d3ed5$var$color_formatHsl,
    formatRgb: $01e74fbc311d3ed5$var$color_formatRgb,
    toString: $01e74fbc311d3ed5$var$color_formatRgb
});
function $01e74fbc311d3ed5$var$color_formatHex() {
    return this.rgb().formatHex();
}
function $01e74fbc311d3ed5$var$color_formatHsl() {
    return $01e74fbc311d3ed5$export$8269f892f57a576a(this).formatHsl();
}
function $01e74fbc311d3ed5$var$color_formatRgb() {
    return this.rgb().formatRgb();
}
function $01e74fbc311d3ed5$export$9099ad97b570f7c(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = $01e74fbc311d3ed5$var$reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? $01e74fbc311d3ed5$var$rgbn(m) // #ff0000
     : l === 3 ? new $01e74fbc311d3ed5$export$224ee6128901ddf4(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) // #f00
     : l === 8 ? $01e74fbc311d3ed5$var$rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) // #ff000000
     : l === 4 ? $01e74fbc311d3ed5$var$rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) // #f000
     : null) : (m = $01e74fbc311d3ed5$var$reRgbInteger.exec(format)) ? new $01e74fbc311d3ed5$export$224ee6128901ddf4(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
     : (m = $01e74fbc311d3ed5$var$reRgbPercent.exec(format)) ? new $01e74fbc311d3ed5$export$224ee6128901ddf4(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
     : (m = $01e74fbc311d3ed5$var$reRgbaInteger.exec(format)) ? $01e74fbc311d3ed5$var$rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
     : (m = $01e74fbc311d3ed5$var$reRgbaPercent.exec(format)) ? $01e74fbc311d3ed5$var$rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
     : (m = $01e74fbc311d3ed5$var$reHslPercent.exec(format)) ? $01e74fbc311d3ed5$var$hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
     : (m = $01e74fbc311d3ed5$var$reHslaPercent.exec(format)) ? $01e74fbc311d3ed5$var$hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
     : $01e74fbc311d3ed5$var$named.hasOwnProperty(format) ? $01e74fbc311d3ed5$var$rgbn($01e74fbc311d3ed5$var$named[format]) // eslint-disable-line no-prototype-builtins
     : format === "transparent" ? new $01e74fbc311d3ed5$export$224ee6128901ddf4(NaN, NaN, NaN, 0) : null;
}
function $01e74fbc311d3ed5$var$rgbn(n) {
    return new $01e74fbc311d3ed5$export$224ee6128901ddf4(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function $01e74fbc311d3ed5$var$rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new $01e74fbc311d3ed5$export$224ee6128901ddf4(r, g, b, a);
}
function $01e74fbc311d3ed5$export$7138c6bf7ee5608c(o) {
    if (!(o instanceof $01e74fbc311d3ed5$export$e4830c8e55b4f80d)) o = $01e74fbc311d3ed5$export$9099ad97b570f7c(o);
    if (!o) return new $01e74fbc311d3ed5$export$224ee6128901ddf4;
    o = o.rgb();
    return new $01e74fbc311d3ed5$export$224ee6128901ddf4(o.r, o.g, o.b, o.opacity);
}
function $01e74fbc311d3ed5$export$1b3a2af3f3cd47f6(r, g, b, opacity) {
    return arguments.length === 1 ? $01e74fbc311d3ed5$export$7138c6bf7ee5608c(r) : new $01e74fbc311d3ed5$export$224ee6128901ddf4(r, g, b, opacity == null ? 1 : opacity);
}
function $01e74fbc311d3ed5$export$224ee6128901ddf4(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
}
$dbe51e4b908eb1a9$export$9099ad97b570f7c($01e74fbc311d3ed5$export$224ee6128901ddf4, $01e74fbc311d3ed5$export$1b3a2af3f3cd47f6, $dbe51e4b908eb1a9$export$46e35401bc090c62($01e74fbc311d3ed5$export$e4830c8e55b4f80d, {
    brighter: function(k) {
        k = k == null ? $01e74fbc311d3ed5$export$acf32b1b82ce4fe7 : Math.pow($01e74fbc311d3ed5$export$acf32b1b82ce4fe7, k);
        return new $01e74fbc311d3ed5$export$224ee6128901ddf4(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? $01e74fbc311d3ed5$export$a49b5ca9db8c9416 : Math.pow($01e74fbc311d3ed5$export$a49b5ca9db8c9416, k);
        return new $01e74fbc311d3ed5$export$224ee6128901ddf4(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
        return this;
    },
    displayable: function() {
        return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: $01e74fbc311d3ed5$var$rgb_formatHex,
    formatHex: $01e74fbc311d3ed5$var$rgb_formatHex,
    formatRgb: $01e74fbc311d3ed5$var$rgb_formatRgb,
    toString: $01e74fbc311d3ed5$var$rgb_formatRgb
}));
function $01e74fbc311d3ed5$var$rgb_formatHex() {
    return "#" + $01e74fbc311d3ed5$var$hex(this.r) + $01e74fbc311d3ed5$var$hex(this.g) + $01e74fbc311d3ed5$var$hex(this.b);
}
function $01e74fbc311d3ed5$var$rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function $01e74fbc311d3ed5$var$hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
}
function $01e74fbc311d3ed5$var$hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new $01e74fbc311d3ed5$var$Hsl(h, s, l, a);
}
function $01e74fbc311d3ed5$export$8269f892f57a576a(o) {
    if (o instanceof $01e74fbc311d3ed5$var$Hsl) return new $01e74fbc311d3ed5$var$Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof $01e74fbc311d3ed5$export$e4830c8e55b4f80d)) o = $01e74fbc311d3ed5$export$9099ad97b570f7c(o);
    if (!o) return new $01e74fbc311d3ed5$var$Hsl;
    if (o instanceof $01e74fbc311d3ed5$var$Hsl) return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
    } else s = l > 0 && l < 1 ? 0 : h;
    return new $01e74fbc311d3ed5$var$Hsl(h, s, l, o.opacity);
}
function $01e74fbc311d3ed5$export$1eaadac1dc277f81(h, s, l, opacity) {
    return arguments.length === 1 ? $01e74fbc311d3ed5$export$8269f892f57a576a(h) : new $01e74fbc311d3ed5$var$Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function $01e74fbc311d3ed5$var$Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
}
$dbe51e4b908eb1a9$export$9099ad97b570f7c($01e74fbc311d3ed5$var$Hsl, $01e74fbc311d3ed5$export$1eaadac1dc277f81, $dbe51e4b908eb1a9$export$46e35401bc090c62($01e74fbc311d3ed5$export$e4830c8e55b4f80d, {
    brighter: function(k) {
        k = k == null ? $01e74fbc311d3ed5$export$acf32b1b82ce4fe7 : Math.pow($01e74fbc311d3ed5$export$acf32b1b82ce4fe7, k);
        return new $01e74fbc311d3ed5$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? $01e74fbc311d3ed5$export$a49b5ca9db8c9416 : Math.pow($01e74fbc311d3ed5$export$a49b5ca9db8c9416, k);
        return new $01e74fbc311d3ed5$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
        return new $01e74fbc311d3ed5$export$224ee6128901ddf4($01e74fbc311d3ed5$var$hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), $01e74fbc311d3ed5$var$hsl2rgb(h, m1, m2), $01e74fbc311d3ed5$var$hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
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
/* From FvD 13.37, CSS Color Module Level 3 */ function $01e74fbc311d3ed5$var$hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}



function $7654630391f879a6$var$rgbToDeckglColor(c) {
    return [
        c.r,
        c.g,
        c.b,
        c.opacity * 255
    ];
}
function $7654630391f879a6$export$7e1a2014f13a3acf(a, b) {
    if (a.length !== b.length) return false;
    for(let i = 0; i < a.length; i++){
        if (a[i] !== b[i]) return false;
    }
    return true;
}
function $7654630391f879a6$export$286939df77fc306a(cssColorSpecifier) {
    if (cssColorSpecifier) {
        const dc = $01e74fbc311d3ed5$export$9099ad97b570f7c(cssColorSpecifier);
        if (dc) {
            const c = dc.rgb();
            return $7654630391f879a6$var$rgbToDeckglColor(c);
        }
    }
}
function $7654630391f879a6$export$303cc9cbd0520953(color) {
    const c = [
        ...color
    ];
    if (c.length > 3) c[3] /= 255;
    return `rgba(${c.join(',')})`;
}
function $7654630391f879a6$export$dfbfe7a0951e0f20(color, value) {
    const rgb = $01e74fbc311d3ed5$export$1b3a2af3f3cd47f6(color[0], color[1], color[2], color[3] / 255);
    const hslColor = $01e74fbc311d3ed5$export$1eaadac1dc277f81(rgb);
    hslColor.s = value;
    const c = hslColor.rgb();
    return $7654630391f879a6$var$rgbToDeckglColor(c);
}




let $2f0c752020c76b68$var$vega = {
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
let $2f0c752020c76b68$var$deck = {
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
let $2f0c752020c76b68$var$layers = {
    IconLayer: null,
    LineLayer: null,
    PathLayer: null,
    PolygonLayer: null,
    TextLayer: null
};
let $2f0c752020c76b68$var$luma = {
    CubeGeometry: null,
    Model: null,
    Texture2D: null
};
const $2f0c752020c76b68$export$12896e353ebd9cc = {
    deck: $2f0c752020c76b68$var$deck,
    layers: $2f0c752020c76b68$var$layers,
    luma: $2f0c752020c76b68$var$luma,
    vega: $2f0c752020c76b68$var$vega
};
function $2f0c752020c76b68$export$44747fb0056adba5(vega, deck, layers, luma) {
    $2f0c752020c76b68$export$12896e353ebd9cc.deck = deck;
    $2f0c752020c76b68$export$12896e353ebd9cc.layers = layers;
    $2f0c752020c76b68$export$12896e353ebd9cc.luma = luma;
    $2f0c752020c76b68$export$12896e353ebd9cc.vega = vega;
}



var // Copyright (c) 2015 - 2017 Uber Technologies, Inc.
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
$829dd023807638d5$export$9099ad97b570f7c = `\
#define SHADER_NAME cube-layer-fragment-shader\n\nprecision highp float;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  gl_FragColor = vColor;\n\n  // use highlight color if this fragment belongs to the selected object.\n  gl_FragColor = picking_filterHighlightColor(gl_FragColor);\n\n  // use picking color if rendering to picking FBO.\n  gl_FragColor = picking_filterPickingColor(gl_FragColor);\n}\n`;


var $1c19a15e6d55f62b$exports = {};

$parcel$export($1c19a15e6d55f62b$exports, "defaultPresenterStyle", () => $1c19a15e6d55f62b$export$6b65f26458e4302);
$parcel$export($1c19a15e6d55f62b$exports, "min3dDepth", () => $1c19a15e6d55f62b$export$86fcdd5f967cff7a);
$parcel$export($1c19a15e6d55f62b$exports, "createStage", () => $1c19a15e6d55f62b$export$e35daa7ba55906d8);
$parcel$export($1c19a15e6d55f62b$exports, "minPixelSize", () => $1c19a15e6d55f62b$export$29071091ed6b4d66);
$parcel$export($1c19a15e6d55f62b$exports, "lineZ", () => $1c19a15e6d55f62b$export$11e2f23c74a3e539);
$parcel$export($1c19a15e6d55f62b$exports, "minHeight", () => $1c19a15e6d55f62b$export$96fb5e832e19efcf);
$parcel$export($1c19a15e6d55f62b$exports, "defaultPresenterConfig", () => $1c19a15e6d55f62b$export$95ceab4f757f40ae);
$parcel$export($1c19a15e6d55f62b$exports, "groupStrokeWidth", () => $1c19a15e6d55f62b$export$7d8384a7f1e55576);
$parcel$export($1c19a15e6d55f62b$exports, "minWidth", () => $1c19a15e6d55f62b$export$45fcbe2b700352a9);
$parcel$export($1c19a15e6d55f62b$exports, "defaultView", () => $1c19a15e6d55f62b$export$89bf53df2de0904);
const $1c19a15e6d55f62b$export$96fb5e832e19efcf = '100px';
const $1c19a15e6d55f62b$export$45fcbe2b700352a9 = '100px';
const $1c19a15e6d55f62b$export$6b65f26458e4302 = {
    cssPrefix: 'vega-deckgl-',
    defaultCubeColor: [
        128,
        128,
        128,
        255
    ],
    highlightColor: [
        0,
        0,
        0,
        255
    ]
};
const $1c19a15e6d55f62b$export$95ceab4f757f40ae = {
    onCubeClick: (e, cube)=>{
    },
    onCubeHover: (e, cube)=>{
    },
    transitionDurations: {
        color: 100,
        position: 600,
        size: 600,
        view: 600
    }
};
function $1c19a15e6d55f62b$export$e35daa7ba55906d8(view) {
    const stage = {
        view: view,
        cubeData: [],
        pathData: [],
        polygonData: [],
        axes: {
            x: [],
            y: [],
            z: []
        },
        gridLines: [],
        textData: [],
        legend: {
            rows: {
            }
        },
        facets: []
    };
    return stage;
}
const $1c19a15e6d55f62b$export$7d8384a7f1e55576 = 1;
const $1c19a15e6d55f62b$export$11e2f23c74a3e539 = -1;
const $1c19a15e6d55f62b$export$89bf53df2de0904 = '2d';
const $1c19a15e6d55f62b$export$86fcdd5f967cff7a = 0.05;
const $1c19a15e6d55f62b$export$29071091ed6b4d66 = 0.5;


var $6a90444830067801$export$9099ad97b570f7c = `\
#define SHADER_NAME cube-layer-vertex-shader\n\nattribute vec3 positions;\nattribute vec3 normals;\n\nattribute vec3 instancePositions;\nattribute vec3 instancePositions64Low;\nattribute vec3 instanceSizes;\nattribute vec4 instanceColors;\nattribute vec3 instancePickingColors;\n\n// Custom uniforms\nuniform float lightingMix;\n\n// Result\nvarying vec4 vColor;\n\nvoid main(void) {\n\n  float x = instanceSizes.x > 0.0 ? max(instanceSizes.x, ${$1c19a15e6d55f62b$export$29071091ed6b4d66.toFixed(1)}) : 0.0;\n  float y = instanceSizes.y > 0.0 ? max(instanceSizes.y, ${$1c19a15e6d55f62b$export$29071091ed6b4d66.toFixed(1)}) : 0.0;\n\n  // if alpha == 0.0, do not render element\n  float noRender = float(instanceColors.a == 0.0);\n  float finalXScale = project_size(x) * mix(1.0, 0.0, noRender);\n  float finalYScale = project_size(y) * mix(1.0, 0.0, noRender);\n  float finalZScale = project_size(instanceSizes.z) * mix(1.0, 0.0, noRender);\n\n  // cube geometry vertics are between -1 to 1, scale and transform it to between 0, 1\n  vec3 offset = vec3(\n    (positions.x + 1.0) / 2.0 * finalXScale,\n    (positions.y + 1.0) / 2.0 * finalYScale,\n    (positions.z + 1.0) / 2.0 * finalZScale);\n\n  // extrude positions\n  vec4 position_worldspace;\n  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset, position_worldspace);\n  \n  vec3 lightColor = lighting_getLightColor(instanceColors.rgb, project_uCameraPosition, position_worldspace.xyz, project_normal(normals));\n  vec3 mixedLight = mix(instanceColors.rgb, lightColor, lightingMix);\n  vec4 color = vec4(mixedLight, instanceColors.a) / 255.0;\n  vColor = color;\n\n  // Set color to be rendered to picking fbo (also used to check for selection highlight).\n  picking_setPickingColor(instancePickingColors);\n}\n`;



//https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
const $757aa2396bf25f0a$var$UNSIGNED_BYTE = 5121;
const $757aa2396bf25f0a$var$DOUBLE = 5130;
const $757aa2396bf25f0a$var$DEFAULT_COLOR = [
    255,
    0,
    255,
    255
];
const $757aa2396bf25f0a$var$defaultProps = {
    lightingMix: 0.5,
    getSize: (x)=>x.size
    ,
    getPosition: (x)=>x.position
    ,
    getColor: (x)=>x.color
    ,
    material: {
        ambient: 0.5,
        diffuse: 1
    }
};
function $757aa2396bf25f0a$var$_CubeLayer(props1) {
    //dynamic superclass, since we don't know have deck.Layer in the declaration phase
    class __CubeLayer extends $2f0c752020c76b68$export$12896e353ebd9cc.deck.Layer {
        getShaders() {
            return {
                vs: $6a90444830067801$export$9099ad97b570f7c,
                fs: $829dd023807638d5$export$9099ad97b570f7c,
                modules: [
                    $2f0c752020c76b68$export$12896e353ebd9cc.deck.project32,
                    $2f0c752020c76b68$export$12896e353ebd9cc.deck.gouraudLighting,
                    $2f0c752020c76b68$export$12896e353ebd9cc.deck.picking
                ]
            };
        }
        initializeState() {
            const attributeManager = this.getAttributeManager();
            attributeManager.addInstanced({
                instancePositions: {
                    size: 3,
                    type: $757aa2396bf25f0a$var$DOUBLE,
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
                    type: $757aa2396bf25f0a$var$UNSIGNED_BYTE,
                    transition: true,
                    accessor: 'getColor',
                    defaultValue: $757aa2396bf25f0a$var$DEFAULT_COLOR
                }
            });
        }
        updateState({ props: props , oldProps: oldProps , changeFlags: changeFlags  }) {
            super.updateState({
                props: props,
                oldProps: oldProps,
                changeFlags: changeFlags
            }); //TODO add parameter type to deck.gl-typings
            // Re-generate model if geometry changed
            //if (props.fp64 !== oldProps.fp64) {
            const { gl: gl  } = this.context;
            if (this.state.model) this.state.model.delete();
            this.setState({
                model: this._getModel(gl)
            });
            this.getAttributeManager().invalidateAll();
        //}
        }
        _getModel(gl) {
            return new $2f0c752020c76b68$export$12896e353ebd9cc.luma.Model(gl, Object.assign({
            }, this.getShaders(), {
                id: this.props.id,
                geometry: new $2f0c752020c76b68$export$12896e353ebd9cc.luma.CubeGeometry(),
                isInstanced: true
            }));
        }
        draw({ uniforms: uniforms  }) {
            let { lightingMix: lightingMix  } = this.props;
            if (this.props.interpolator && this.props.interpolator.layerInterpolatedProps) lightingMix = this.props.interpolator.layerInterpolatedProps.lightingMix;
            this.state.model.setUniforms(Object.assign({
            }, uniforms, {
                lightingMix: lightingMix
            })).draw();
        }
    }
    __CubeLayer.layerName = 'CubeLayer';
    __CubeLayer.defaultProps = $757aa2396bf25f0a$var$defaultProps;
    const instance = new __CubeLayer(props1);
    return instance;
}
const $757aa2396bf25f0a$export$332dc30a48f50bb7 = $757aa2396bf25f0a$var$_CubeLayer;


function $2daddc7dce63be23$export$c18e9be96ec0ef45(x) {
    return (Math.pow(2, -10 * x) - 0.0009765625) * 1.0009775171065494;
}


function $3cdbde20c3c9b141$export$2745c447f92bdc2(t) {
    return $2daddc7dce63be23$export$c18e9be96ec0ef45(1 - +t);
}
function $3cdbde20c3c9b141$export$c65510420a86b046(t) {
    return 1 - $2daddc7dce63be23$export$c18e9be96ec0ef45(t);
}
function $3cdbde20c3c9b141$export$195778d17fd74088(t) {
    return ((t *= 2) <= 1 ? $2daddc7dce63be23$export$c18e9be96ec0ef45(1 - t) : 2 - $2daddc7dce63be23$export$c18e9be96ec0ef45(t - 1)) / 2;
}



function $ce5538ade1fb7855$export$7f4df3f7510fa304(t) {
    if (t === 0 || t === 1) return t;
    return $3cdbde20c3c9b141$export$195778d17fd74088(t);
}


function $22297b1890eb4722$export$9b3c8e41de401a43(presenter, config, stage, lightSettings /*LightSettings*/ , lightingMix, interpolator, guideLines) {
    const cubeLayer = $22297b1890eb4722$var$newCubeLayer(presenter, config, stage.cubeData, presenter.style.highlightColor, lightSettings, lightingMix, interpolator);
    const { x: x , y: y , z: z  } = stage.axes;
    const lines = $b0c54bedf6c3c64b$export$dde0d4a9e80fb26f(stage.gridLines, guideLines);
    const texts = [
        ...stage.textData
    ];
    [
        x,
        y,
        z
    ].forEach((axes)=>{
        axes.forEach((axis)=>{
            if (axis.domain) lines.push(axis.domain);
            if (axis.ticks) lines.push.apply(lines, axis.ticks);
            if (axis.tickText) texts.push.apply(texts, axis.tickText);
            if (axis.title) texts.push(axis.title);
        });
    });
    let characterSet;
    if (config.getCharacterSet) characterSet = config.getCharacterSet(stage);
    else //Basic symbols, numbers, and uppercase / lowercase alphabet
    characterSet = new Array(95).fill(1).map((_, i)=>String.fromCharCode(32 + i)
    );
    if (stage.facets) stage.facets.forEach((f)=>{
        if (f.lines) lines.push.apply(lines, f.lines);
    });
    const lineLayer = $22297b1890eb4722$var$newLineLayer($d1b153eb04166abb$export$2ff906254960e78d.lines, lines);
    const textLayer = $22297b1890eb4722$var$newTextLayer(presenter, $d1b153eb04166abb$export$2ff906254960e78d.text, texts, config, presenter.style.fontFamily, characterSet);
    const pathLayer = $22297b1890eb4722$var$newPathLayer($d1b153eb04166abb$export$2ff906254960e78d.paths, stage.pathData);
    const polygonLayer = $22297b1890eb4722$var$newPolygonLayer($d1b153eb04166abb$export$2ff906254960e78d.polygons, stage.polygonData);
    return [
        textLayer,
        cubeLayer,
        lineLayer,
        pathLayer,
        polygonLayer
    ];
}
function $22297b1890eb4722$var$newCubeLayer(presenter, config, cubeData, highlightColor, lightSettings /*LightSettings*/ , lightingMix, interpolator) {
    const getPosition = $22297b1890eb4722$var$getTiming(config.transitionDurations.position, $ce5538ade1fb7855$export$7f4df3f7510fa304);
    const getSize = $22297b1890eb4722$var$getTiming(config.transitionDurations.size, $ce5538ade1fb7855$export$7f4df3f7510fa304);
    const getColor = $22297b1890eb4722$var$getTiming(config.transitionDurations.color);
    const cubeLayerProps = {
        interpolator: interpolator,
        lightingMix: lightingMix,
        id: $d1b153eb04166abb$export$2ff906254960e78d.cubes,
        data: cubeData,
        coordinateSystem: $2f0c752020c76b68$export$12896e353ebd9cc.deck.COORDINATE_SYSTEM.CARTESIAN,
        pickable: true,
        autoHighlight: true,
        highlightColor: highlightColor,
        onClick: (o, e)=>{
            config.onCubeClick(e && e.srcEvent, o.object);
        },
        onHover: (o, e)=>{
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
            getPosition: getPosition,
            getColor: getColor,
            getSize: getSize
        }
    };
    return new $757aa2396bf25f0a$export$332dc30a48f50bb7(cubeLayerProps);
}
function $22297b1890eb4722$var$newLineLayer(id, data) {
    return new $2f0c752020c76b68$export$12896e353ebd9cc.layers.LineLayer({
        id: id,
        data: data,
        widthUnits: 'pixels',
        coordinateSystem: $2f0c752020c76b68$export$12896e353ebd9cc.deck.COORDINATE_SYSTEM.CARTESIAN,
        getColor: (o)=>o.color
        ,
        getWidth: (o)=>o.strokeWidth
    });
}
function $22297b1890eb4722$var$newPathLayer(id, data) {
    if (!data) return null;
    return new $2f0c752020c76b68$export$12896e353ebd9cc.layers.PathLayer({
        id: id,
        data: data,
        billboard: true,
        widthScale: 1,
        widthMinPixels: 2,
        widthUnits: 'pixels',
        coordinateSystem: $2f0c752020c76b68$export$12896e353ebd9cc.deck.COORDINATE_SYSTEM.CARTESIAN,
        getPath: (o)=>o.positions
        ,
        getColor: (o)=>o.strokeColor
        ,
        getWidth: (o)=>o.strokeWidth
    });
}
function $22297b1890eb4722$var$newPolygonLayer(id, data) {
    if (!data) return null;
    let newlayer = new $2f0c752020c76b68$export$12896e353ebd9cc.layers.PolygonLayer({
        id: id,
        data: data,
        coordinateSystem: $2f0c752020c76b68$export$12896e353ebd9cc.deck.COORDINATE_SYSTEM.CARTESIAN,
        getPolygon: (o)=>o.positions
        ,
        getFillColor: (o)=>o.fillColor
        ,
        getLineColor: (o)=>o.strokeColor
        ,
        wireframe: false,
        filled: true,
        stroked: true,
        pickable: true,
        extruded: true,
        getElevation: (o)=>o.depth
        ,
        getLineWidth: (o)=>o.strokeWidth
    });
    return newlayer;
}
function $22297b1890eb4722$var$newTextLayer(presenter, id, data, config, fontFamily, characterSet) {
    let alphaCutoff = config.getTextHighlightAlphaCutoff && config.getTextHighlightAlphaCutoff();
    if (alphaCutoff === undefined) alphaCutoff = 0.1;
    const props = {
        id: id,
        data: data,
        characterSet: characterSet,
        coordinateSystem: $2f0c752020c76b68$export$12896e353ebd9cc.deck.COORDINATE_SYSTEM.CARTESIAN,
        sizeUnits: 'pixels',
        autoHighlight: true,
        pickable: true,
        highlightColor: (p)=>{
            if (config.getTextHighlightColor) return config.getTextHighlightColor(p.object);
            else return [
                0,
                0,
                0,
                0
            ];
        },
        onClick: (o, e)=>{
            let pe = e && e.srcEvent;
            config.onTextClick && config.onTextClick(pe, o.object);
        },
        onHover: (o, e)=>{
            if (o.index === -1) presenter.deckgl.interactiveState.onText = false;
            else presenter.deckgl.interactiveState.onText = config.onTextHover ? config.onTextHover(e && e.srcEvent, o.object) : true;
        },
        getColor: config.getTextColor || ((o)=>o.color
        ),
        getTextAnchor: (o)=>o.textAnchor
        ,
        getSize: (o)=>o.size
        ,
        getAngle: (o)=>o.angle
        ,
        fontSettings: {
            sdf: false,
            fontSize: 128,
            buffer: 3
        },
        _subLayerProps: {
            characters: {
                alphaCutoff: alphaCutoff
            }
        }
    };
    if (fontFamily) props.fontFamily = fontFamily;
    return new $2f0c752020c76b68$export$12896e353ebd9cc.layers.TextLayer(props);
}
function $22297b1890eb4722$var$getTiming(duration, easing) {
    let timing;
    if (duration) {
        timing = {
            duration: duration,
            type: 'interpolation'
        };
        if (easing) timing.easing = easing;
    }
    return timing;
}
function $22297b1890eb4722$export$64c4e13ca1f096d(deckProps) {
    return deckProps.layers.filter((layer)=>layer && layer.id === $d1b153eb04166abb$export$2ff906254960e78d.cubes
    )[0];
}
function $22297b1890eb4722$export$f78fa54c8b685d69(deckProps) {
    const cubeLayer = $22297b1890eb4722$export$64c4e13ca1f096d(deckProps);
    if (!cubeLayer) return;
    const cubeLayerProps = cubeLayer.props;
    return cubeLayerProps.data;
}











function $926cc9f2ab1acdd7$export$ddb98ba5d6830a81(factoryOptions) {
    function wrapper(props) {
        class OrbitControllerInternal extends $2f0c752020c76b68$export$12896e353ebd9cc.deck.OrbitController {
            constructor(props1){
                super(props1);
                this.invertPan = true;
            }
            handleEvent(event) {
                if (event.type === 'doubletap') {
                    if (factoryOptions && factoryOptions.doubleClickHandler) return factoryOptions.doubleClickHandler(event, this);
                }
                return super.handleEvent(event);
            }
        }
        const instance = new OrbitControllerInternal(props);
        return instance;
    }
    return wrapper;
}


//adapted from https://github.com/uber/deck.gl/blob/5.3-release/modules/lite/src/deckgl.js
const $9cd1d8acd3e8d45d$var$CANVAS_STYLE = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
};
// Create canvas elements for map and deck
function $9cd1d8acd3e8d45d$var$createCanvas(props) {
    let { container: container = document.body  } = props;
    if (typeof container === 'string') container = document.getElementById(container);
    if (!container) throw Error('Deck: container not found');
    // Add DOM elements
    const containerStyle = window.getComputedStyle(container);
    if (containerStyle.position === 'static') container.style.position = 'relative';
    const deckCanvas = document.createElement('canvas');
    container.appendChild(deckCanvas);
    Object.assign(deckCanvas.style, $9cd1d8acd3e8d45d$var$CANVAS_STYLE);
    return {
        container: container,
        deckCanvas: deckCanvas
    };
}
function $9cd1d8acd3e8d45d$export$ab3e167748757028(factoryOptions) {
    const OrbitControllerClass = $926cc9f2ab1acdd7$export$ddb98ba5d6830a81(factoryOptions);
    //dynamic superclass lets us create a subclass at execution phase instead of declaration phase.
    //This allows us to retrieve Deck from either UMD or ES6 consumers of this class.
    function wrapper(props2) {
        /**
         * @params container (Element) - DOM element to add deck.gl canvas to
         * @params controller (Object) - Controller class. Leave empty for auto detection
         */ class DeckGLInternal extends $2f0c752020c76b68$export$12896e353ebd9cc.deck.Deck {
            constructor(props1){
                if (typeof document === 'undefined') // Not browser
                throw Error('Deck can only be used in the browser');
                const { deckCanvas: deckCanvas  } = $9cd1d8acd3e8d45d$var$createCanvas(props1);
                const viewState = props1.initialViewState || props1.viewState || {
                };
                super(Object.assign({
                }, props1, {
                    width: '100%',
                    height: '100%',
                    canvas: deckCanvas,
                    controller: OrbitControllerClass,
                    initialViewState: viewState
                }));
                // Callback for the controller
                this._updateViewState = (params)=>{
                    if (this.onViewStateChange) this.onViewStateChange(params);
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
        const instance = new DeckGLInternal(props2);
        return instance;
    }
    return {
        OrbitControllerClass: OrbitControllerClass,
        DeckGL_Class: wrapper
    };
}



function $3e04537bdeb7ed01$var$wrapper(props) {
    class LinearInterpolatorInternal extends $2f0c752020c76b68$export$12896e353ebd9cc.deck.LinearInterpolator {
        constructor(transitionProps){
            super(transitionProps);
        }
        interpolateProps(viewStateStartProps, viewStateEndProps, t) {
            if (this.layerStartProps && this.layerEndProps) this.layerInterpolatedProps = super.interpolateProps(this.layerStartProps, this.layerEndProps, t);
            return super.interpolateProps(viewStateStartProps, viewStateEndProps, t);
        }
    }
    const instance = new LinearInterpolatorInternal(props);
    return instance;
}
const $3e04537bdeb7ed01$export$d12ed2a17cdbd6b6 = $3e04537bdeb7ed01$var$wrapper;





function $b40f12e420cd2891$export$f961f681246e659e() {
    const ambientLight = new $2f0c752020c76b68$export$12896e353ebd9cc.deck.AmbientLight({
        color: [
            255,
            255,
            255
        ],
        intensity: 0.3
    });
    const cameraLight = new $2f0c752020c76b68$export$12896e353ebd9cc.deck._CameraLight({
        color: [
            255,
            255,
            255
        ],
        intensity: 1
    });
    // const directionalLight = new base.deck.DirectionalLight({
    //     color: [255, 255, 255],
    //     direction: [0, 0, -1],
    //     intensity: 0.2
    //   });
    return [
        new $2f0c752020c76b68$export$12896e353ebd9cc.deck.LightingEffect({
            ambientLight: ambientLight,
            cameraLight: cameraLight
        })
    ];
}


var $407eabbb39689985$exports = {};

$parcel$export($407eabbb39689985$exports, "PresenterElement", () => $407eabbb39689985$export$82c3b66b9a0309ee);
var $407eabbb39689985$export$82c3b66b9a0309ee;
(function(PresenterElement) {
    PresenterElement[PresenterElement["root"] = 0] = "root";
    PresenterElement[PresenterElement["gl"] = 1] = "gl";
    PresenterElement[PresenterElement["panel"] = 2] = "panel";
    PresenterElement[PresenterElement["legend"] = 3] = "legend";
    PresenterElement[PresenterElement["vegaControls"] = 4] = "vegaControls";
})($407eabbb39689985$export$82c3b66b9a0309ee || ($407eabbb39689985$export$82c3b66b9a0309ee = {
}));





const $d4a2d33a2ce3fae4$export$c7e39a54887e8f2c = (props)=>{
    const rows = [];
    const addRow = (row, i)=>{
        const fn = $d4a2d33a2ce3fae4$var$symbolMap[row.symbol.shape];
        let jsx;
        if (fn) jsx = fn(row.symbol);
        else jsx = $0bf1192cadf6b31c$export$2f8418d37d4320b9("span", null, "x");
        rows.push({
            cells: [
                {
                    className: 'symbol',
                    content: jsx
                },
                {
                    className: 'label',
                    content: row.label,
                    title: row.label
                }
            ]
        });
    };
    var sorted = Object.keys(props.legend.rows).sort((a, b)=>+a - +b
    );
    sorted.forEach((i)=>addRow(props.legend.rows[i], +i)
    );
    if (sorted.length) return $0bf1192cadf6b31c$export$2f8418d37d4320b9($ff59b0d7f89aca0c$export$b168bb048906b6d9, {
        rows: rows,
        rowClassName: "legend-row",
        onRowClick: (e, i)=>props.onClick(e, props.legend, i)
    }, props.legend.title !== void 0 && $0bf1192cadf6b31c$export$2f8418d37d4320b9("tr", {
        onClick: (e)=>props.onClick(e, props.legend, null)
    }, $0bf1192cadf6b31c$export$2f8418d37d4320b9("th", {
        colSpan: 2
    }, props.legend.title)));
};
const $d4a2d33a2ce3fae4$var$symbolMap = {
    square: function(symbol) {
        return $0bf1192cadf6b31c$export$2f8418d37d4320b9("div", {
            style: {
                height: `${symbol.bounds.y2 - symbol.bounds.y1}px`,
                width: `${symbol.bounds.x2 - symbol.bounds.x1}px`,
                backgroundColor: symbol.fill,
                borderColor: symbol.fill
            }
        });
    }
};






function $c4b7c36e509fd737$export$7fe042ac7fbb96a5(v3) {
    let temp = -v3[1]; //negeative y to positive z
    if (v3[0] === $1c19a15e6d55f62b$export$11e2f23c74a3e539) v3[0] = 0;
    v3[1] = v3[2];
    v3[2] = temp;
}


const $e5679472beb08609$var$markStager = (options, stage, scene, x, y, groupType)=>{
    $2f0c752020c76b68$export$12896e353ebd9cc.vega.sceneVisit(scene, function(item) {
        var x1, y1, x2, y2;
        x1 = item.x || 0;
        y1 = item.y || 0;
        x2 = item.x2 != null ? item.x2 : x1;
        y2 = item.y2 != null ? item.y2 : y1;
        const lineItem = $e5679472beb08609$var$styledLine(x1 + x, y1 + y, x2 + x, y2 + y, item.stroke, item.strokeWidth);
        if (item.mark.role === 'axis-tick') {
            if (options.currAxis.role === 'z') {
                $c4b7c36e509fd737$export$7fe042ac7fbb96a5(lineItem.sourcePosition);
                $c4b7c36e509fd737$export$7fe042ac7fbb96a5(lineItem.targetPosition);
            }
            options.currAxis.ticks.push(lineItem);
        } else if (item.mark.role === 'axis-domain') {
            if (options.currAxis.role === 'z') {
                $c4b7c36e509fd737$export$7fe042ac7fbb96a5(lineItem.sourcePosition);
                $c4b7c36e509fd737$export$7fe042ac7fbb96a5(lineItem.targetPosition);
            }
            options.currAxis.domain = lineItem;
        } else stage.gridLines.push(lineItem);
    });
};
function $e5679472beb08609$var$styledLine(x1, y1, x2, y2, stroke, strokeWidth) {
    const line = {
        sourcePosition: [
            x1,
            -y1,
            $1c19a15e6d55f62b$export$11e2f23c74a3e539
        ],
        targetPosition: [
            x2,
            -y2,
            $1c19a15e6d55f62b$export$11e2f23c74a3e539
        ],
        color: $7654630391f879a6$export$286939df77fc306a(stroke),
        strokeWidth: strokeWidth
    };
    return line;
}
function $e5679472beb08609$export$202f564ca6763eba(gx, gy, height, width, stroke, strokeWidth, diagonals = false) {
    const lines = [
        $e5679472beb08609$var$styledLine(gx, gy, gx + width, gy, stroke, strokeWidth),
        $e5679472beb08609$var$styledLine(gx + width, gy, gx + width, gy + height, stroke, strokeWidth),
        $e5679472beb08609$var$styledLine(gx + width, gy + height, gx, gy + height, stroke, strokeWidth),
        $e5679472beb08609$var$styledLine(gx, gy + height, gx, gy, stroke, strokeWidth)
    ];
    if (diagonals) {
        lines.push($e5679472beb08609$var$styledLine(gx, gy, gx + width, gy + height, stroke, strokeWidth));
        lines.push($e5679472beb08609$var$styledLine(gx, gy + height, gx + width, gy, stroke, strokeWidth));
    }
    return lines;
}
var $e5679472beb08609$export$9099ad97b570f7c = $e5679472beb08609$var$markStager;





function $0828bcce4552e56e$export$497b736b228abfe4(presenter) {
    const rootDiv = $0bf1192cadf6b31c$export$2f8418d37d4320b9("div", {
        className: $0828bcce4552e56e$export$abef0c27bc20b102($407eabbb39689985$export$82c3b66b9a0309ee.root, presenter)
    }, $0bf1192cadf6b31c$export$2f8418d37d4320b9("div", {
        className: $0828bcce4552e56e$export$abef0c27bc20b102($407eabbb39689985$export$82c3b66b9a0309ee.gl, presenter),
        style: {
            minHeight: $1c19a15e6d55f62b$export$96fb5e832e19efcf,
            minWidth: $1c19a15e6d55f62b$export$45fcbe2b700352a9
        }
    }), $0bf1192cadf6b31c$export$2f8418d37d4320b9("div", {
        className: $0828bcce4552e56e$export$abef0c27bc20b102($407eabbb39689985$export$82c3b66b9a0309ee.panel, presenter)
    }, $0bf1192cadf6b31c$export$2f8418d37d4320b9("div", {
        className: $0828bcce4552e56e$export$abef0c27bc20b102($407eabbb39689985$export$82c3b66b9a0309ee.vegaControls, presenter)
    }), $0bf1192cadf6b31c$export$2f8418d37d4320b9("div", {
        className: $0828bcce4552e56e$export$abef0c27bc20b102($407eabbb39689985$export$82c3b66b9a0309ee.legend, presenter)
    })));
    $0bf1192cadf6b31c$export$294609abb1df04a5(rootDiv, presenter.el);
}
function $0828bcce4552e56e$export$abef0c27bc20b102(type, presenter) {
    return `${presenter.style.cssPrefix}${$407eabbb39689985$export$82c3b66b9a0309ee[type]}`;
}


function $6fdb0985cb4e7c3f$export$1a8f9f71a04e62a8(allocatedSize, empty, cubes) {
    const patched = new Array(allocatedSize);
    patched.fill(empty);
    cubes.forEach((cube)=>patched[cube.ordinal] = cube
    );
    return patched;
}



const $d169b7201589e8a3$var$legendMap = {
    'legend-title': function(legend, textItem) {
        legend.title = textItem.text;
    },
    'legend-symbol': function(legend, symbol) {
        const { bounds: bounds , fill: fill , shape: shape  } = symbol;
        //this object is safe for serialization
        const legendRowSymbol = {
            bounds: bounds,
            fill: fill,
            shape: shape
        };
        const i = symbol.datum.index;
        legend.rows[i] = legend.rows[i] || {
        };
        legend.rows[i].symbol = legendRowSymbol;
    },
    'legend-label': function(legend, label) {
        const i = label.datum.index;
        legend.rows[i] = legend.rows[i] || {
        };
        const row = legend.rows[i];
        row.label = label.text;
        row.value = label.datum.value;
    }
};
const $d169b7201589e8a3$var$markStager = (options, stage, scene, x, y, groupType)=>{
    $2f0c752020c76b68$export$12896e353ebd9cc.vega.sceneVisit(scene, function(item) {
        const fn = $d169b7201589e8a3$var$legendMap[item.mark.role];
        if (fn) fn(stage.legend, item);
    });
};
var $d169b7201589e8a3$export$9099ad97b570f7c = $d169b7201589e8a3$var$markStager;





const $6815fe36935b3c27$var$markStager = (options, stage, scene, x, y, groupType)=>{
    $2f0c752020c76b68$export$12896e353ebd9cc.vega.sceneVisit(scene, function(item) {
        //for orthographic (2d) - always use 0 or else Deck will not show them
        const z = stage.view === '2d' ? 0 : item.z || 0;
        const depth = (stage.view === '2d' ? 0 : item.depth || 0) + $1c19a15e6d55f62b$export$86fcdd5f967cff7a;
        //change direction of y from SVG to GL
        const ty = -1;
        let ordinal = options.assignCubeOrdinal(item.datum);
        if (ordinal > options.maxOrdinal) options.maxOrdinal = ordinal;
        if (ordinal === undefined) ;
        else {
            const cube = {
                ordinal: ordinal,
                size: [
                    item.width,
                    item.height,
                    depth
                ],
                position: [
                    x + (item.x || 0),
                    ty * (y + (item.y || 0)) - item.height,
                    z
                ],
                color: $7654630391f879a6$export$286939df77fc306a(item.fill) || options.defaultCubeColor || [
                    128,
                    128,
                    128,
                    128
                ]
            };
            cube.color[3] = item.opacity === undefined ? 255 : 255 * item.opacity;
            stage.cubeData.push(cube);
        }
    });
};
var $6815fe36935b3c27$export$9099ad97b570f7c = $6815fe36935b3c27$var$markStager;




//change direction of y from SVG to GL
const $665e38871904fb3d$var$ty = -1;
const $665e38871904fb3d$var$markStager = (options, stage, scene, x, y, groupType)=>{
    const g = Object.assign({
        opacity: 1,
        strokeOpacity: 1,
        strokeWidth: 1
    }, scene.items[0]);
    const path = {
        strokeWidth: g.strokeWidth,
        strokeColor: $7654630391f879a6$export$286939df77fc306a(g.stroke),
        positions: scene.items.map((it)=>[
                it.x,
                $665e38871904fb3d$var$ty * it.y,
                it.z || 0
            ]
        )
    };
    path.strokeColor[3] *= g.strokeOpacity;
    path.strokeColor[3] *= g.opacity;
    stage.pathData.push(path);
};
var $665e38871904fb3d$export$9099ad97b570f7c = $665e38871904fb3d$var$markStager;





const $a595c90ef2811732$var$markStager = (options, stage, scene, x, y, groupType)=>{
    //scale Deck.Gl text to Vega size
    const fontScale = 1;
    //change direction of y from SVG to GL
    const ty = -1;
    $2f0c752020c76b68$export$12896e353ebd9cc.vega.sceneVisit(scene, function(item) {
        if (!item.text) return;
        const size = item.fontSize * fontScale;
        const alignmentBaseline = $a595c90ef2811732$var$convertBaseline(item.baseline);
        const yOffset = alignmentBaseline === 'top' ? item.fontSize / 2 : 0; //fixup to get tick text correct
        const textItem = {
            color: $7654630391f879a6$export$286939df77fc306a(item.fill),
            text: item.limit === undefined ? item.text : $2f0c752020c76b68$export$12896e353ebd9cc.vega.truncate(item.text, item.limit, 'right', item.ellipsis || '...'),
            position: [
                x + (item.x || 0),
                ty * (y + (item.y || 0) + yOffset),
                0
            ],
            size: size,
            angle: $a595c90ef2811732$var$convertAngle(item.angle),
            textAnchor: $a595c90ef2811732$var$convertAlignment(item.align),
            alignmentBaseline: alignmentBaseline,
            metaData: item.metaData
        };
        if (item.mark.role === 'axis-label') {
            const tickText = textItem;
            tickText.value = item.datum.value;
            if (options.currAxis.role === 'z') $c4b7c36e509fd737$export$7fe042ac7fbb96a5(tickText.position);
            options.currAxis.tickText.push(tickText);
        } else if (item.mark.role === 'axis-title') {
            if (options.currAxis.role === 'z') $c4b7c36e509fd737$export$7fe042ac7fbb96a5(textItem.position);
            options.currAxis.title = textItem;
        } else stage.textData.push(textItem);
    });
};
function $a595c90ef2811732$var$convertAngle(vegaTextAngle) {
    if (vegaTextAngle && !isNaN(vegaTextAngle)) return 360 - vegaTextAngle;
    return 0;
}
function $a595c90ef2811732$var$convertAlignment(textAlign) {
    switch(textAlign){
        case 'center':
            return 'middle';
        case 'left':
            return 'start';
        case 'right':
            return 'end';
    }
    return 'start';
}
function $a595c90ef2811732$var$convertBaseline(baseline) {
    switch(baseline){
        case 'middle':
            return 'center';
    }
    return baseline || 'bottom';
}
var $a595c90ef2811732$export$9099ad97b570f7c = $a595c90ef2811732$var$markStager;



//change direction of y from SVG to GL
const $47e1e29a0d383aee$var$ty = -1;
const $47e1e29a0d383aee$var$markStager = (options, stage, scene, x, y, groupType)=>{
    const g = Object.assign({
        fillOpacity: 1,
        opacity: 1,
        strokeOpacity: 1,
        strokeWidth: 0,
        depth: 0
    }, scene.items[0]);
    const points = scene.items.map((item)=>{
        item = Object.assign({
            z: 0
        }, item);
        item = Object.assign({
            x2: item.x,
            y2: item.y,
            z2: item.z
        }, item);
        return [
            item.x,
            $47e1e29a0d383aee$var$ty * item.y,
            item.z,
            item.x2,
            $47e1e29a0d383aee$var$ty * item.y2,
            item.z2
        ];
    });
    let positions = [];
    let startpoint = [
        points[0][0],
        points[0][1],
        points[0][2]
    ];
    points.forEach((p)=>{
        positions.push([
            p[0],
            p[1],
            p[2]
        ]);
    });
    points.reverse().forEach((p)=>{
        positions.push([
            p[3],
            p[4],
            p[5]
        ]);
    });
    positions.push(startpoint);
    const polygon = {
        fillColor: $7654630391f879a6$export$286939df77fc306a(g.fill) || [
            0,
            0,
            0,
            0
        ],
        positions: positions,
        strokeColor: $7654630391f879a6$export$286939df77fc306a(g.stroke) || [
            0,
            0,
            0,
            0
        ],
        strokeWidth: g.strokeWidth,
        depth: g.depth
    };
    polygon.fillColor[3] *= g.fillOpacity;
    polygon.fillColor[3] *= g.opacity;
    polygon.strokeColor[3] *= g.strokeOpacity;
    polygon.strokeColor[3] *= g.opacity;
    stage.polygonData.push(polygon);
};
var $47e1e29a0d383aee$export$9099ad97b570f7c = $47e1e29a0d383aee$var$markStager;





var $07e63b8975cca4b6$export$c4789be062e8736;
(function(GroupType) {
    GroupType[GroupType["none"] = 0] = "none";
    GroupType[GroupType["legend"] = 1] = "legend";
    GroupType[GroupType["xAxis"] = 2] = "xAxis";
    GroupType[GroupType["yAxis"] = 3] = "yAxis";
    GroupType[GroupType["zAxis"] = 4] = "zAxis";
})($07e63b8975cca4b6$export$c4789be062e8736 || ($07e63b8975cca4b6$export$c4789be062e8736 = {
}));


function $20556b6986ba34c2$var$getOrientItem(group) {
    if (group.orient) return group;
    return group.datum;
}
function $20556b6986ba34c2$var$convertGroupRole(group, options) {
    if (group.mark.role === 'legend') return $07e63b8975cca4b6$export$c4789be062e8736.legend;
    if (group.mark.role === 'axis') {
        if (group.mark.zindex === options.zAxisZindex && options.zAxisZindex !== undefined) return $07e63b8975cca4b6$export$c4789be062e8736.zAxis;
        const orientItem = $20556b6986ba34c2$var$getOrientItem(group);
        if (orientItem) switch(orientItem.orient){
            case 'bottom':
            case 'top':
                return $07e63b8975cca4b6$export$c4789be062e8736.xAxis;
            case 'left':
            case 'right':
                return $07e63b8975cca4b6$export$c4789be062e8736.yAxis;
        }
    }
}
const $20556b6986ba34c2$var$group = (options, stage, scene, x, y, groupType)=>{
    $2f0c752020c76b68$export$12896e353ebd9cc.vega.sceneVisit(scene, function(g) {
        const gx = g.x || 0, gy = g.y || 0;
        if (g.context && g.context.background && !stage.backgroundColor) stage.backgroundColor = $7654630391f879a6$export$286939df77fc306a(g.context.background);
        if (g.stroke) {
            const facetRect = {
                datum: g.datum,
                lines: $e5679472beb08609$export$202f564ca6763eba(gx + x, gy + y, g.height, g.width, g.stroke, $1c19a15e6d55f62b$export$7d8384a7f1e55576)
            };
            stage.facets.push(facetRect);
        }
        groupType = $20556b6986ba34c2$var$convertGroupRole(g, options) || groupType;
        $20556b6986ba34c2$var$setCurrentAxis(options, stage, groupType);
        // draw group contents
        $2f0c752020c76b68$export$12896e353ebd9cc.vega.sceneVisit(g, function(item) {
            $20556b6986ba34c2$var$mainStager(options, stage, item, gx + x, gy + y, groupType);
        });
    });
};
function $20556b6986ba34c2$var$setCurrentAxis(options, stage, groupType) {
    let axes;
    let role;
    switch(groupType){
        case $07e63b8975cca4b6$export$c4789be062e8736.xAxis:
            axes = stage.axes.x;
            role = 'x';
            break;
        case $07e63b8975cca4b6$export$c4789be062e8736.yAxis:
            axes = stage.axes.y;
            role = 'y';
            break;
        case $07e63b8975cca4b6$export$c4789be062e8736.zAxis:
            axes = stage.axes.z;
            role = 'z';
            break;
        default:
            return;
    }
    options.currAxis = {
        domain: null,
        tickText: [],
        ticks: [],
        role: role
    };
    axes.push(options.currAxis);
}
const $20556b6986ba34c2$var$markStagers = {
    group: $20556b6986ba34c2$var$group,
    legend: $d169b7201589e8a3$export$9099ad97b570f7c,
    rect: $6815fe36935b3c27$export$9099ad97b570f7c,
    rule: $e5679472beb08609$export$9099ad97b570f7c,
    line: $665e38871904fb3d$export$9099ad97b570f7c,
    area: $47e1e29a0d383aee$export$9099ad97b570f7c,
    text: $a595c90ef2811732$export$9099ad97b570f7c
};
var $20556b6986ba34c2$var$mainStager = (options, stage, scene, x, y, groupType)=>{
    if (scene.marktype !== 'group' && groupType === $07e63b8975cca4b6$export$c4789be062e8736.legend) $d169b7201589e8a3$export$9099ad97b570f7c(options, stage, scene, x, y, groupType);
    else {
        var markStager = $20556b6986ba34c2$var$markStagers[scene.marktype];
        if (markStager) markStager(options, stage, scene, x, y, groupType);
    }
};
function $20556b6986ba34c2$export$d22b5f8ff2b9782(options, stage, scene) {
    $20556b6986ba34c2$var$mainStager(options, stage, scene, 0, 0, null);
    $20556b6986ba34c2$var$sortAxis(stage.axes.x, 0);
    $20556b6986ba34c2$var$sortAxis(stage.axes.y, 1);
}
function $20556b6986ba34c2$var$sortAxis(axes, dim) {
    axes.forEach((axis)=>{
        if (axis.domain) $20556b6986ba34c2$var$orderDomain(axis.domain, dim);
        axis.ticks.sort((a, b)=>a.sourcePosition[dim] - b.sourcePosition[dim]
        );
        axis.tickText.sort((a, b)=>a.position[dim] - b.position[dim]
        );
    });
}
function $20556b6986ba34c2$var$orderDomain(domain, dim) {
    if (domain.sourcePosition[dim] > domain.targetPosition[dim]) {
        const temp = domain.targetPosition;
        domain.targetPosition = domain.sourcePosition;
        domain.sourcePosition = temp;
    }
}


const $0d53c7f57e8e432c$export$65873ae0e87425e6 = [
    'target',
    'rotationOrbit',
    'rotationX',
    'zoom'
];
function $0d53c7f57e8e432c$export$9dd8668346b30dbc(height, width, view) {
    const target = [
        width / 2,
        -height / 2,
        0
    ];
    if (view === '2d') return {
        target: target,
        rotationOrbit: 0,
        rotationX: 90,
        zoom: -0.2
    };
    else return {
        target: target,
        rotationOrbit: 25,
        rotationX: 30,
        zoom: -0.4
    };
}



class $f11b1222d18f5aff$export$67eca7ff2a7e9e8e {
    /**
     * Instantiate a new Presenter.
     * @param el Parent HTMLElement to present within.
     * @param style Optional PresenterStyle styling options.
     */ constructor(el, style){
        this.el = el;
        this.style = $951ee4546fb8e7ae$export$5cce22d6f6e7c745($1c19a15e6d55f62b$export$6b65f26458e4302, style);
        $0828bcce4552e56e$export$497b736b228abfe4(this);
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
     */ get stage() {
        return this._last.stage;
    }
    /**
     * Get the current View camera type.
     */ get view() {
        return this._last.view;
    }
    /**
     * Cancels any pending animation, calling animationCanceled() on original queue.
     */ animationCancel() {
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.animationTimer = null;
            if (this.logger) this.logger(`canceling animation ${this.queuedAnimationOptions && this.queuedAnimationOptions.handlerLabel || 'handler'}`);
            if (this.queuedAnimationOptions && this.queuedAnimationOptions.animationCanceled) this.queuedAnimationOptions.animationCanceled.call(null);
        }
    }
    /**
     * Stops the current animation and queues a new animation.
     * @param handler Function to invoke when timeout is complete.
     * @param timeout Length of time to wait before invoking the handler.
     * @param options Optional QueuedAnimationOptions object.
     */ animationQueue(handler, timeout, options) {
        if (this.logger) this.logger(`queueing animation ${options && options.waitingLabel || 'waiting'}...`);
        this.animationCancel();
        this.animationTimer = setTimeout(()=>{
            if (this.logger) this.logger(`queueing animation ${options && options.handlerLabel || 'handler'}...`);
            handler();
        }, timeout);
    }
    /**
     * Retrieve a sub-element of the rendered output.
     * @param type PresenterElement type of the HTMLElement to retrieve.
     */ getElement(type) {
        const elements = this.el.getElementsByClassName($0828bcce4552e56e$export$abef0c27bc20b102(type, this));
        if (elements && elements.length) return elements[0];
    }
    /**
     * Present the Vega Scene, or Stage object using Deck.gl.
     * @param sceneOrStage Vega Scene object, or Stage object containing chart layout info.
     * @param height Height of the rendering area.
     * @param width Width of the rendering area.
     * @param config Optional presentation configuration object.
     */ present(sceneOrStage, height, width, config) {
        this.animationCancel();
        let scene = sceneOrStage;
        let stage;
        let options = {
            maxOrdinal: 0,
            currAxis: null,
            defaultCubeColor: this.style.defaultCubeColor,
            assignCubeOrdinal: (config === null || config === void 0 ? void 0 : config.onSceneRectAssignCubeOrdinal) || (()=>options.maxOrdinal++
            ),
            zAxisZindex: config === null || config === void 0 ? void 0 : config.zAxisZindex
        };
        //determine if this is a vega scene
        if (scene.marktype) {
            stage = $1c19a15e6d55f62b$export$e35daa7ba55906d8(scene.view);
            $20556b6986ba34c2$export$d22b5f8ff2b9782(options, stage, scene);
        } else stage = sceneOrStage;
        if (!this.deckgl) {
            const classes = $9cd1d8acd3e8d45d$export$ab3e167748757028({
                doubleClickHandler: ()=>{
                    this.homeCamera();
                }
            });
            this.OrbitControllerClass = classes.OrbitControllerClass;
            const initialViewState = $0d53c7f57e8e432c$export$9dd8668346b30dbc(height, width, stage.view);
            let glOptions;
            if (config && config.preserveDrawingBuffer) glOptions = {
                preserveDrawingBuffer: true
            };
            const deckProps = {
                glOptions: glOptions,
                height: null,
                width: null,
                effects: $b40f12e420cd2891$export$f961f681246e659e(),
                layers: [],
                onClick: config && config.onLayerClick,
                views: [
                    new $2f0c752020c76b68$export$12896e353ebd9cc.deck.OrbitView({
                        controller: $2f0c752020c76b68$export$12896e353ebd9cc.deck.OrbitController
                    })
                ],
                initialViewState: initialViewState,
                container: this.getElement($407eabbb39689985$export$82c3b66b9a0309ee.gl),
                getCursor: (interactiveState)=>{
                    if (interactiveState.onText || interactiveState.onAxisSelection) return 'pointer';
                    else if (interactiveState.onCube) return 'default';
                    else return 'grab';
                }
            };
            if (stage.backgroundColor) deckProps.style = {
                'background-color': $7654630391f879a6$export$303cc9cbd0520953(stage.backgroundColor)
            };
            this.deckgl = new classes.DeckGL_Class(deckProps);
        }
        let cubeCount = Math.max(this._last.cubeCount, stage.cubeData.length);
        if (options.maxOrdinal) {
            cubeCount = Math.max(cubeCount, options.maxOrdinal);
            const empty = {
                isEmpty: true,
                color: [
                    0,
                    0,
                    0,
                    0
                ] // possibly a bug in Deck.gl? set color to invisible.
            };
            stage.cubeData = $6fdb0985cb4e7c3f$export$1a8f9f71a04e62a8(cubeCount, empty, stage.cubeData);
        }
        this.setDeckProps(stage, height, width, cubeCount, config);
        const a = $0bf1192cadf6b31c$export$1b18789f888bc242();
        $0bf1192cadf6b31c$export$294609abb1df04a5($d4a2d33a2ce3fae4$export$c7e39a54887e8f2c({
            legend: stage.legend,
            onClick: config && config.onLegendClick
        }), this.getElement($407eabbb39689985$export$82c3b66b9a0309ee.legend));
        $0bf1192cadf6b31c$export$86621cf2b9b16a69(a);
        if (config && config.onPresent) config.onPresent();
    }
    /**
     * Present the same recently rendered Stage with only slight modifications such as a color change,
     * using the previous Stage values as a basis.
     * @param stage Partially populated Stage object containing changes.
     * @param modifyConfig Optional presentation configuration object.
     */ rePresent(stage, modifyConfig) {
        const newStage = Object.assign(Object.assign({
        }, this._last.stage), stage);
        this.setDeckProps(newStage, this._last.height, this._last.width, this._last.cubeCount, modifyConfig);
    }
    isNewBounds(view, height, width, cubeCount) {
        const lastBounds = this.lastBounds();
        for(let prop in lastBounds){
            if (lastBounds[prop] === null) return true;
        }
        const newBounds = {
            cubeCount: cubeCount,
            height: height,
            view: view,
            width: width
        };
        for(let prop1 in lastBounds){
            if (lastBounds[prop1] !== newBounds[prop1]) return true;
        }
    }
    lastBounds() {
        const { cubeCount: cubeCount , height: height , view: view , width: width  } = this._last;
        return {
            cubeCount: cubeCount,
            height: height,
            view: view,
            width: width
        };
    }
    setDeckProps(stage, height, width, cubeCount, modifyConfig) {
        const config = $951ee4546fb8e7ae$export$5cce22d6f6e7c745($1c19a15e6d55f62b$export$95ceab4f757f40ae, modifyConfig);
        const newBounds = this.isNewBounds(stage.view, height, width, cubeCount);
        //let lightSettings = this.style.lightSettings[stage.view];
        let lightingMix = stage.view === '3d' ? 1 : 0;
        let linearInterpolator;
        //choose the current OrbitView viewstate if possible
        let viewState = this.deckgl.viewState && Object.keys(this.deckgl.viewState).length && this.deckgl.viewState.OrbitView || this.deckgl.props.viewState;
        if (!viewState || newBounds || config.shouldViewstateTransition && config.shouldViewstateTransition()) {
            let newViewStateTarget = true;
            if (config && config.onTargetViewState) {
                const result = config.onTargetViewState(height, width);
                height = result.height;
                width = result.width;
                if (result.newViewStateTarget !== undefined) newViewStateTarget = result.newViewStateTarget;
            }
            if (!viewState || newViewStateTarget) viewState = $0d53c7f57e8e432c$export$9dd8668346b30dbc(height, width, stage.view);
            const oldCubeLayer = $22297b1890eb4722$export$64c4e13ca1f096d(this.deckgl.props);
            if (oldCubeLayer) {
                linearInterpolator = new $3e04537bdeb7ed01$export$d12ed2a17cdbd6b6($0d53c7f57e8e432c$export$65873ae0e87425e6);
                linearInterpolator.layerStartProps = {
                    lightingMix: oldCubeLayer.props.lightingMix
                };
                linearInterpolator.layerEndProps = {
                    lightingMix: lightingMix
                };
                viewState.transitionDuration = config.transitionDurations.view;
                viewState.transitionEasing = $ce5538ade1fb7855$export$7f4df3f7510fa304;
                viewState.transitionInterpolator = linearInterpolator;
            }
            stage.view;
        }
        const guideLines = this._showGuides && $e5679472beb08609$export$202f564ca6763eba(0, 0, height, width, '#0f0', 1, true);
        config.preLayer && config.preLayer(stage);
        const layers = $22297b1890eb4722$export$9b3c8e41de401a43(this, config, stage, /*lightSettings*/ null, lightingMix, linearInterpolator, guideLines);
        const deckProps = {
            effects: $b40f12e420cd2891$export$f961f681246e659e(),
            views: [
                new $2f0c752020c76b68$export$12896e353ebd9cc.deck.OrbitView({
                    controller: $2f0c752020c76b68$export$12896e353ebd9cc.deck.OrbitController
                })
            ],
            initialViewState: viewState,
            layers: layers
        };
        if (config && config.preStage) config.preStage(stage, deckProps);
        requestAnimationFrame(()=>this.deckgl.setProps(Object.assign(Object.assign({
            }, deckProps), {
                onAfterRender: ()=>{
                    if (this._afterRenderHandler) this._afterRenderHandler();
                }
            }))
        );
        delete stage.cubeData;
        this._last = {
            cubeCount: cubeCount,
            height: height,
            width: width,
            stage: stage,
            view: stage.view
        };
    }
    canvasToDataURL() {
        return new Promise((resolve, reject)=>{
            this._afterRenderHandler = ()=>{
                this._afterRenderHandler = null;
                const png = this.deckgl.canvas.toDataURL('image/png');
                resolve(png);
            };
        });
    }
    /**
     * Home the camera to the last initial position.
     */ homeCamera() {
        const viewState = $0d53c7f57e8e432c$export$9dd8668346b30dbc(this._last.height, this._last.width, this._last.view);
        viewState.transitionDuration = $1c19a15e6d55f62b$export$95ceab4f757f40ae.transitionDurations.view;
        viewState.transitionEasing = $ce5538ade1fb7855$export$7f4df3f7510fa304;
        viewState.transitionInterpolator = new $3e04537bdeb7ed01$export$d12ed2a17cdbd6b6($0d53c7f57e8e432c$export$65873ae0e87425e6);
        const deckProps = {
            effects: $b40f12e420cd2891$export$f961f681246e659e(),
            views: this.deckgl.props.views,
            initialViewState: viewState,
            layers: this.deckgl.props.layers
        };
        this.deckgl.setProps(deckProps);
    }
    /**
     * Get cube data array from the cubes layer.
     */ getCubeData() {
        return $22297b1890eb4722$export$f78fa54c8b685d69(this.deckgl.props);
    }
    /**
     * Show guidelines of rendering height/width and center of OrbitView.
     */ showGuides() {
        this._showGuides = true;
        this.getElement($407eabbb39689985$export$82c3b66b9a0309ee.gl).classList.add('show-center');
        this.rePresent(Object.assign(Object.assign({
        }, this._last.stage), {
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







//pass in the SuperClass, which should be a vega.View
function $9cff1a8ab4a1214a$var$_RendererGl(loader) {
    //dynamic superclass, since we don't know have vega.View in the declaration phase
    class RendererGlInternal extends $2f0c752020c76b68$export$12896e353ebd9cc.vega.Renderer {
        initialize(el, width, height, origin) {
            this.height = height;
            this.width = width;
            // this method will invoke resize to size the canvas appropriately
            return super.initialize(el, width, height, origin);
        }
        resize(width, height, origin) {
            super.resize(width, height, origin);
            this.origin = origin;
            this.height = height;
            this.width = width;
            //rteturn this for vega
            return this;
        }
        _render(scene, items) {
            const scene3d = scene;
            scene3d.view = this.getView();
            this.presenter.present(scene3d, this.height, this.width, this.presenterConfig);
            //return this for vega
            return this;
        }
    }
    const instance = new RendererGlInternal(loader);
    return instance;
}
const $9cff1a8ab4a1214a$export$e89ea95ade58a06c = $9cff1a8ab4a1214a$var$_RendererGl;


let $65b765713b03cc6f$var$registered = false;
//dynamic superclass lets us create a subclass at execution phase instead of declaration phase.
//This allows us to retrieve vega.View from either UMD or ES6 consumers of this class.
//pass in the SuperClass, which should be a vega.View
function $65b765713b03cc6f$var$_ViewGl(runtime, config) {
    //dynamic superclass, since we don't know have vega.View in the declaration phase
    class ViewGlInternal extends $2f0c752020c76b68$export$12896e353ebd9cc.vega.View {
        constructor(runtime1, config1 = {
        }){
            super(runtime1, config1);
            this.config = config1;
            this.presenter = config1.presenter;
            config1.presenterConfig = config1.presenterConfig || {
            };
            config1.presenterConfig.redraw = ()=>{
                this._redraw = true; //use Vega View private member _redraw
                this.run();
            };
        }
        renderer(...args) {
            if (args && args.length) {
                const renderer = args[0];
                if (renderer === 'deck.gl' && !$65b765713b03cc6f$var$registered) {
                    $2f0c752020c76b68$export$12896e353ebd9cc.vega.renderModule('deck.gl', {
                        handler: $2f0c752020c76b68$export$12896e353ebd9cc.vega.CanvasHandler,
                        renderer: $9cff1a8ab4a1214a$export$e89ea95ade58a06c
                    });
                    $65b765713b03cc6f$var$registered = true;
                }
                return super.renderer(renderer);
            } else return super.renderer();
        }
        initialize(el) {
            if (!this.presenter) this.presenter = new $f11b1222d18f5aff$export$67eca7ff2a7e9e8e(el);
            super.initialize(this.presenter.getElement($407eabbb39689985$export$82c3b66b9a0309ee.vegaControls));
            const renderer = this._renderer;
            renderer.presenterConfig = this.config.presenterConfig;
            renderer.presenter = this.presenter;
            renderer.getView = this.config && this.config.getView || (()=>this.presenter.view || $1c19a15e6d55f62b$export$89bf53df2de0904
            );
            return this;
        }
        error(e) {
            if (this.presenter.logger) this.presenter.logger(e);
        }
    }
    const instance = new ViewGlInternal(runtime, config);
    return instance;
}
const $65b765713b03cc6f$export$5ae75a3802efaf = $65b765713b03cc6f$var$_ViewGl;



$parcel$exportWildcard($7f572b57d5948475$exports, $407eabbb39689985$exports);


const { defaultPresenterConfig: $4143f1453a8890e4$var$defaultPresenterConfig , defaultPresenterStyle: $4143f1453a8890e4$var$defaultPresenterStyle  } = $1c19a15e6d55f62b$exports;
const { desaturate: $4143f1453a8890e4$var$desaturate  } = $00670849ca68e684$exports;
const $4143f1453a8890e4$export$23e61e65e99ffb54 = {
    colors: {
        activeCube: 'purple',
        defaultCube: $00670849ca68e684$exports.colorToString($4143f1453a8890e4$var$defaultPresenterStyle.defaultCubeColor),
        hoveredCube: $00670849ca68e684$exports.colorToString($4143f1453a8890e4$var$defaultPresenterStyle.highlightColor),
        selectedCube: 'yellow',
        axisSelectHighlight: $00670849ca68e684$exports.colorToString([
            128,
            128,
            128,
            128
        ]),
        axisLine: '#000',
        axisText: '#000',
        unselectedColorMethod: (color)=>{
            const c = $4143f1453a8890e4$var$desaturate(color, 0.05);
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
        selectionCount: (count)=>`${count} items selected`
    },
    maxLegends: 19,
    onError: (errors)=>{
    //console.log(`UnitVisViewer errors: ${errors.join('\n')}`);
    },
    transitionDurations: Object.assign(Object.assign({
    }, $4143f1453a8890e4$var$defaultPresenterConfig.transitionDurations), {
        scope: 600
    }),
    selectionPolygonZ: -1,
    tickSize: 10
};
function $4143f1453a8890e4$export$3e1dd6a74003f7a3(options) {
    var style = {
        cssPrefix: $4143f1453a8890e4$export$e875bf21bbc345e4,
        fontFamily: options.fontFamily,
        defaultCubeColor: $00670849ca68e684$exports.colorFromString(options.colors.defaultCube)
    };
    if (options.colors.hoveredCube) style.highlightColor = $00670849ca68e684$exports.colorFromString(options.colors.hoveredCube);
    //if (options.lightSettings) {
    // style.lightSettings = options.lightSettings;
    //}
    return style;
}
const $4143f1453a8890e4$export$e875bf21bbc345e4 = 'sanddance-';
const $4143f1453a8890e4$export$a42d95e61e0f98d3 = {
    black: '#212121',
    gray: '#D2D2D2',
    blue: '#0060F0',
    green: '#00C000',
    orange: '#FF9900',
    red: '#E00000'
};


function $406c1b16a5bd3c44$export$2634e87bf7671285(columnName, includeVegaDeckGLFields = false) {
    if (includeVegaDeckGLFields) {
        if (columnName === $a3b399caf5d2c16b$export$b86d149b7c15b53e) return true;
    }
    for(let f in $146eeb4362821b4b$export$29b3fae588fa046f){
        if (columnName === $146eeb4362821b4b$export$29b3fae588fa046f[f]) return true;
    }
    return false;
}





const $c70916a34f2bf3db$var$dualPairs = [
    [
        $4143f1453a8890e4$export$a42d95e61e0f98d3.black,
        $4143f1453a8890e4$export$a42d95e61e0f98d3.gray
    ],
    [
        $4143f1453a8890e4$export$a42d95e61e0f98d3.red,
        $4143f1453a8890e4$export$a42d95e61e0f98d3.green
    ],
    [
        $4143f1453a8890e4$export$a42d95e61e0f98d3.red,
        $4143f1453a8890e4$export$a42d95e61e0f98d3.blue
    ],
    [
        $4143f1453a8890e4$export$a42d95e61e0f98d3.black,
        $4143f1453a8890e4$export$a42d95e61e0f98d3.red
    ],
    [
        $4143f1453a8890e4$export$a42d95e61e0f98d3.black,
        $4143f1453a8890e4$export$a42d95e61e0f98d3.orange
    ],
    [
        $4143f1453a8890e4$export$a42d95e61e0f98d3.black,
        $4143f1453a8890e4$export$a42d95e61e0f98d3.green
    ]
];
const $c70916a34f2bf3db$export$4b303fbe85a206f6 = [
    {
        scheme: $146eeb4362821b4b$export$e1b9a037ce7886e5,
        colors: [
            $4143f1453a8890e4$export$23e61e65e99ffb54.colors.defaultCube
        ]
    }
];
$c70916a34f2bf3db$var$createDualColorSchemes();
function $c70916a34f2bf3db$export$2f7089dba07adb1(vega) {
    $c70916a34f2bf3db$export$4b303fbe85a206f6.forEach((cs)=>{
        if (cs.colors.length === 1) vega.scheme(cs.scheme, (x)=>cs.colors[0]
        );
        else vega.scheme(cs.scheme, cs.colors);
    });
}
function $c70916a34f2bf3db$var$createPair(names, colors) {
    const scheme = `dual_${names[0]}${names[1]}`;
    $c70916a34f2bf3db$export$4b303fbe85a206f6.push({
        scheme: scheme,
        colors: colors
    });
}
function $c70916a34f2bf3db$var$createDualColorSchemes() {
    $c70916a34f2bf3db$var$dualPairs.forEach((colors)=>{
        const names = colors.map((color)=>{
            for(let key in $4143f1453a8890e4$export$a42d95e61e0f98d3)if (color === $4143f1453a8890e4$export$a42d95e61e0f98d3[key]) return key;
        });
        $c70916a34f2bf3db$var$createPair(names, colors);
        $c70916a34f2bf3db$var$createPair([
            ...names
        ].reverse(), [
            ...colors
        ].reverse());
    });
}



var $cd7c0c51e96048d8$exports = {};

$parcel$export($cd7c0c51e96048d8$exports, "Viewer", () => $cd7c0c51e96048d8$export$ff719dc3ea4d1e34, (v) => $cd7c0c51e96048d8$export$ff719dc3ea4d1e34 = v);
var $d8c7d617dd7f10da$export$c17ac6787f338a14;
(function(DataLayoutChange) {
    DataLayoutChange[DataLayoutChange["same"] = 0] = "same";
    DataLayoutChange[DataLayoutChange["reset"] = 1] = "reset";
    DataLayoutChange[DataLayoutChange["refine"] = 2] = "refine";
})($d8c7d617dd7f10da$export$c17ac6787f338a14 || ($d8c7d617dd7f10da$export$c17ac6787f338a14 = {
}));
class $d8c7d617dd7f10da$export$c31c6960578c025a {
    constructor(dataScope, props){
        this.dataScope = dataScope;
        this.props = props;
    }
    select(search) {
        return new Promise((resolve, reject)=>{
            this.dataScope.select(search);
            this.props.onDataChanged($d8c7d617dd7f10da$export$c17ac6787f338a14.same);
            resolve();
        });
    }
    deselect() {
        return new Promise((resolve, reject)=>{
            this.dataScope.deselect();
            this.props.onDataChanged($d8c7d617dd7f10da$export$c17ac6787f338a14.same);
            resolve();
        });
    }
    filter(search, keepData, collapseData, rebase) {
        if (rebase) this.dataScope.collapse(false, keepData);
        this.dataScope.collapse(true, collapseData);
        return new Promise((resolve, reject)=>{
            this.props.onAnimateDataChange($d8c7d617dd7f10da$export$c17ac6787f338a14.refine, 'before refine', 'refine').then(()=>{
                this.dataScope.deselect();
                this.dataScope.setFilteredData(keepData);
                this.props.onDataChanged($d8c7d617dd7f10da$export$c17ac6787f338a14.refine, search);
                resolve();
            }).catch(reject);
        });
    }
    reset() {
        return new Promise((resolve, reject)=>{
            this.dataScope.deselect();
            this.dataScope.setFilteredData(null);
            this.props.onAnimateDataChange($d8c7d617dd7f10da$export$c17ac6787f338a14.reset, 'before reset', 'reset').then(()=>{
                this.dataScope.collapse(false);
                this.props.onDataChanged($d8c7d617dd7f10da$export$c17ac6787f338a14.reset);
                resolve();
            }).catch(reject);
        });
    }
    activate(datum) {
        return new Promise((resolve, reject)=>{
            this.dataScope.activate(datum);
            this.props.onDataChanged($d8c7d617dd7f10da$export$c17ac6787f338a14.same);
            resolve();
        });
    }
    deactivate() {
        return new Promise((resolve, reject)=>{
            this.dataScope.deactivate();
            this.props.onDataChanged($d8c7d617dd7f10da$export$c17ac6787f338a14.same);
            resolve();
        });
    }
}



function $8f727b1c21e8c366$var$cloneAxis(axes, axisColor, axisTextColor) {
    return axes.map((axis)=>{
        const newAxis = $00670849ca68e684$exports.deepMerge(axis);
        if (newAxis.domain) newAxis.domain.color = axisColor;
        if (newAxis.title) newAxis.title.color = axisTextColor;
        newAxis.ticks.forEach((t)=>{
            t.color = axisColor;
        });
        newAxis.tickText.forEach((t)=>{
            t.color = axisTextColor;
        });
        return newAxis;
    });
}
function $8f727b1c21e8c366$var$cloneTextData(textData, color) {
    return textData.map((t)=>{
        return Object.assign(Object.assign({
        }, t), {
            color: color
        });
    });
}
function $8f727b1c21e8c366$export$7e9483d314559015(stage, oldColors, newColors) {
    const hasNewLineColor = newColors.axisLine && newColors.axisLine !== oldColors.axisLine;
    const hasNewTextColor = newColors.axisText && newColors.axisText !== oldColors.axisText;
    let axes;
    let textData;
    if (hasNewLineColor || hasNewTextColor) {
        const lineColor = $00670849ca68e684$exports.colorFromString(newColors.axisLine || oldColors.axisLine);
        const textColor = $00670849ca68e684$exports.colorFromString(newColors.axisText || oldColors.axisText);
        axes = {
            x: $8f727b1c21e8c366$var$cloneAxis(stage.axes.x, lineColor, textColor),
            y: $8f727b1c21e8c366$var$cloneAxis(stage.axes.y, lineColor, textColor),
            z: $8f727b1c21e8c366$var$cloneAxis(stage.axes.z, lineColor, textColor)
        };
    }
    if (hasNewTextColor) textData = $8f727b1c21e8c366$var$cloneTextData(stage.textData, $00670849ca68e684$exports.colorFromString(newColors.axisText));
    return {
        axes: axes,
        textData: textData
    };
}


function $44fc789f5716c739$export$2a2f2afd479c1f6b(niceValue) {
    //convert "nice" numbers to numeric value
    return (niceValue + '').replace(/[\s,]/g, '');
}
function $44fc789f5716c739$var$tickValue(axis, i) {
    const tick = axis.tickText[i];
    let value;
    if (tick) value = axis.tickText[i].value;
    return {
        tick: tick,
        value: value
    };
}
function $44fc789f5716c739$export$f11b1d645ff3971c(column) {
    const searchExpression = {
        name: column.name,
        operator: 'isnullorEmpty'
    };
    return searchExpression;
}
function $44fc789f5716c739$export$9875831c14ede476(column, value) {
    if (value == null) return $44fc789f5716c739$export$f11b1d645ff3971c(column);
    const searchExpression = {
        name: column.name,
        operator: '==',
        value: value
    };
    return searchExpression;
}
function $44fc789f5716c739$export$6dc90c76fa6395fd(column, values) {
    const expressions = values.map((value, i)=>{
        const searchExpression = {
            name: column.name,
            operator: '!=',
            value: value
        };
        if (i) searchExpression.clause = '&&';
        return searchExpression;
    });
    const searchExpressionGroup = {
        expressions: expressions
    };
    return searchExpressionGroup;
}
function $44fc789f5716c739$export$5c1f62dac8cafc57(axis, column, i) {
    const result = $44fc789f5716c739$var$tickValue(axis, i);
    if (result.tick) return $44fc789f5716c739$export$9875831c14ede476(column, result.value);
}
function $44fc789f5716c739$export$34d6d0f79c89c63b(column, lowValue, highValue, lowOperator = '>=', highOperator = '<') {
    const expressions = [];
    if (lowValue !== undefined) expressions.push({
        name: column.name,
        operator: lowOperator,
        value: lowValue
    });
    if (highValue !== undefined) expressions.push({
        name: column.name,
        operator: highOperator,
        value: highValue
    });
    if (expressions.length > 1) expressions[1].clause = '&&';
    const searchExpressionGroup = {
        expressions: expressions
    };
    return searchExpressionGroup;
}
function $44fc789f5716c739$export$4fd7358fd1b2a025(axis, column, i) {
    const low = $44fc789f5716c739$var$tickValue(axis, i);
    const high = $44fc789f5716c739$var$tickValue(axis, i + 1);
    return $44fc789f5716c739$export$34d6d0f79c89c63b(column, low.value, high.value);
}




const { allTruthy: $98f3d02cd1bfe66c$export$6a130595254331b4 , concat: $98f3d02cd1bfe66c$export$dde0d4a9e80fb26f , push: $98f3d02cd1bfe66c$export$280e7edab0689157  } = $00670849ca68e684$exports;


function $05162edb3d6c06e2$export$34ed1fd5ef58e5bb(search) {
    let group;
    const vegaSearch = search;
    if (Array.isArray(vegaSearch)) {
        //flatten into one group
        group = {
            expressions: []
        };
        vegaSearch.forEach((g)=>{
            const clonedExpressions = $00670849ca68e684$exports.clone(g.expressions).filter(Boolean);
            clonedExpressions[0].clause = '&&';
            $98f3d02cd1bfe66c$export$280e7edab0689157(group.expressions, clonedExpressions);
        });
    } else group = vegaSearch ? {
        expressions: vegaSearch.expressions.filter(Boolean)
    } : null;
    return group;
}




function $eb543ae47877c1a9$export$799a72d0a47efbc5(presenter, specCapabilities, columns, stage, clickHandler, highlightColor, polygonZ) {
    const polygons = [];
    const xRole = specCapabilities.roles.filter((r)=>r.role === 'x'
    )[0];
    if (xRole && xRole.axisSelection) stage.axes.x.filter((axis)=>axis.tickText.length
    ).forEach((axis)=>{
        polygons.push.apply(polygons, $eb543ae47877c1a9$var$axisSelectionPolygons(axis, false, xRole.axisSelection, columns.x));
    });
    const yRole = specCapabilities.roles.filter((r)=>r.role === 'y'
    )[0];
    if (yRole && yRole.axisSelection) stage.axes.y.filter((axis)=>axis.tickText.length
    ).forEach((axis)=>{
        polygons.push.apply(polygons, $eb543ae47877c1a9$var$axisSelectionPolygons(axis, true, yRole.axisSelection, columns.y));
    });
    if (stage.facets && columns.facet) polygons.push.apply(polygons, $eb543ae47877c1a9$var$facetSelectionPolygons(stage.facets));
    //move polygons to Z
    polygons.forEach((datum)=>{
        datum.polygon.forEach((p)=>{
            p[2] = polygonZ;
        });
    });
    const onClick = (o, e)=>clickHandler(e.srcEvent, o.object.search)
    ;
    const polygonLayer = new $2f0c752020c76b68$export$12896e353ebd9cc.layers.PolygonLayer({
        autoHighlight: true,
        coordinateSystem: $2f0c752020c76b68$export$12896e353ebd9cc.deck.COORDINATE_SYSTEM.CARTESIAN,
        data: polygons,
        extruded: false,
        highlightColor: $00670849ca68e684$exports.colorFromString(highlightColor),
        id: 'selections',
        onHover: (o, e)=>{
            if (o.index === -1) presenter.deckgl.interactiveState.onAxisSelection = false;
            else presenter.deckgl.interactiveState.onAxisSelection = true;
        },
        onClick: onClick,
        getElevation: ()=>0
        ,
        getFillColor: ()=>[
                0,
                0,
                0,
                0
            ]
        ,
        pickable: true,
        stroked: false
    });
    return polygonLayer;
}
function $eb543ae47877c1a9$var$axisSelectionPolygons(axis, vertical, axisSelectionType, column) {
    const polygons = [];
    const size = 50;
    const getSearch = axisSelectionType === 'exact' ? (a, c, i)=>({
            expressions: [
                $44fc789f5716c739$export$5c1f62dac8cafc57(a, c, i)
            ]
        })
     : $44fc789f5716c739$export$4fd7358fd1b2a025;
    const { domain: domain , ticks: ticks  } = axis;
    if (ticks.length > 0 && domain) {
        const dim = vertical ? 1 : 0;
        const between = Math.abs(ticks[0].sourcePosition[dim] - domain.sourcePosition[dim]) > 1;
        let divisions;
        if (between) {
            divisions = [];
            for(let i = 1; i < ticks.length; i++)divisions.push((ticks[i].sourcePosition[dim] + ticks[i - 1].sourcePosition[dim]) / 2);
        } else divisions = ticks.slice(1, -1).map((tick)=>tick.sourcePosition[dim]
        );
        const add = (p2, i)=>{
            const coords = [
                [
                    p1,
                    q1
                ],
                [
                    p2,
                    q1
                ],
                [
                    p2,
                    q2
                ],
                [
                    p1,
                    q2
                ]
            ];
            polygons.push({
                search: getSearch(axis, column, i),
                polygon: vertical ? coords.map((xy)=>xy.reverse()
                ) : coords
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
function $eb543ae47877c1a9$var$facetSelectionPolygons(facetRects) {
    const polygons = [];
    let linesAndSearches;
    linesAndSearches = facetRects.map(({ datum: datum , lines: lines  }, i)=>{
        let group = $05162edb3d6c06e2$export$34ed1fd5ef58e5bb(datum[$146eeb4362821b4b$export$29b3fae588fa046f.FacetSearch]);
        return {
            lines: lines,
            search: group
        };
    });
    linesAndSearches.forEach(({ lines: lines , search: search  }, i)=>{
        //take any 2 lines to get a box dimension
        const [x, y] = $eb543ae47877c1a9$var$minMaxPoints(lines.slice(2));
        polygons.push({
            search: search,
            polygon: [
                [
                    x.min,
                    y.min
                ],
                [
                    x.max,
                    y.min
                ],
                [
                    x.max,
                    y.max
                ],
                [
                    x.min,
                    y.max
                ]
            ]
        });
    });
    return polygons;
}
function $eb543ae47877c1a9$var$minMaxPoints(lines) {
    const points = [];
    lines.forEach((line)=>{
        [
            line.sourcePosition,
            line.targetPosition
        ].forEach((point)=>{
            points.push(point);
        });
    });
    return [
        0,
        1
    ].map((dim)=>{
        let minMax = {
            min: null,
            max: null
        };
        points.forEach((point)=>{
            if (minMax.max == null) minMax.max = point[dim];
            else minMax.max = Math.max(minMax.max, point[dim]);
            if (minMax.min == null) minMax.min = point[dim];
            else minMax.min = Math.min(minMax.min, point[dim]);
        });
        return minMax;
    });
}





function $b6965e965f496d72$export$3d85010f65df95c0(currentData, showSelectedData, showActive, viewerOptions) {
    function getSelectionColorItem(datum) {
        let item;
        if (showSelectedData) item = datum[$146eeb4362821b4b$export$29b3fae588fa046f.Selected] ? {
            color: $00670849ca68e684$exports.colorFromString(viewerOptions.colors.selectedCube)
        } : {
            unSelected: true
        };
        if (showActive && datum[$146eeb4362821b4b$export$29b3fae588fa046f.Active]) item = {
            color: $00670849ca68e684$exports.colorFromString(viewerOptions.colors.activeCube)
        };
        return item;
    }
    const colorMap = {
    };
    currentData.forEach((datum)=>{
        const selectionColor = getSelectionColorItem(datum);
        if (selectionColor) {
            const ordinal = datum[$a3b399caf5d2c16b$export$b86d149b7c15b53e];
            colorMap[ordinal] = selectionColor;
        }
    });
    return colorMap;
}
function $b6965e965f496d72$export$1a7729b7ed4b2339(cubes) {
    const map = {
    };
    cubes.forEach((cube)=>{
        map[cube.ordinal] = {
            color: cube.color
        };
    });
    return map;
}
function $b6965e965f496d72$export$2cdcf144dcfa6eb4(colorContext, presenter) {
    if (!colorContext.colorMap) {
        const cubes = presenter.getCubeData();
        colorContext.colorMap = $b6965e965f496d72$export$1a7729b7ed4b2339(cubes);
    }
    colorContext.legend = $00670849ca68e684$exports.clone(presenter.stage.legend);
    colorContext.legendElement = presenter.getElement($407eabbb39689985$export$82c3b66b9a0309ee.legend).children[0];
}
function $b6965e965f496d72$export$65c9e5f150d5b083(maps, cubes, unselectedColorMethod) {
    Object.keys(maps[0]).forEach((ordinal)=>{
        const cube = cubes[+ordinal];
        if (cube && !cube.isEmpty) {
            const actualColorMappedItem = maps[0][ordinal];
            if (maps.length > 1) {
                const selectedColorMappedItem = maps[1][ordinal];
                if (selectedColorMappedItem) {
                    if (selectedColorMappedItem.unSelected && unselectedColorMethod) cube.color = unselectedColorMethod(actualColorMappedItem.color);
                    else cube.color = selectedColorMappedItem.color;
                    return;
                }
            }
            cube.color = actualColorMappedItem.color;
        }
    });
}








class $2f029215431ce823$export$993107647a287a6 {
    constructor(){
        this.filteredColumnsStats = {
        };
    }
    setData(data, columns) {
        const differentData = this.data !== data;
        if (differentData) {
            if (this.data) //clean up things we added to old data
            this.deselect();
            this.data = data;
            this.columns = columns;
            this.filteredData = null;
            this.filteredColumnsStats = {
            };
        }
        return differentData;
    }
    setFilteredData(filteredData) {
        this.filteredData = filteredData;
        this.filteredColumnsStats = {
        };
    }
    getColumns(columnTypes) {
        if (!this.columns) this.columns = $0ebaa52647c6073e$export$d25d2216dc7fff5a($2f0c752020c76b68$export$12896e353ebd9cc.vega.inferTypes, this.data, columnTypes);
        return this.columns;
    }
    getFilteredColumnStats(columnName) {
        if (!this.filteredColumnsStats[columnName]) this.filteredColumnsStats[columnName] = $0ebaa52647c6073e$export$4c75e2c8266a336d(this.filteredData, this.columns.filter((c)=>c.name === columnName
        )[0]);
        return this.filteredColumnsStats[columnName];
    }
    currentData() {
        return this.filteredData || this.data;
    }
    select(search) {
        this.deselect();
        if (search) {
            this.selection = this.createUserSelection(search, true, false);
            if (this.selection.included.length) this.activate(this.selection.included[0]);
        }
    }
    createUserSelection(search, assign, rebase) {
        const exec = new $745dd93524c614f6$export$17847fd07a76a1e0(search, this.getColumns());
        const s = {
            search: search,
            included: [],
            excluded: []
        };
        const data = rebase ? this.data : this.currentData();
        data.forEach((datum)=>{
            if (exec.run(datum)) {
                if (assign) datum[$146eeb4362821b4b$export$29b3fae588fa046f.Selected] = true;
                s.included.push(datum);
            } else s.excluded.push(datum);
        });
        return s;
    }
    deselect() {
        this.deactivate();
        this.data.forEach((datum)=>{
            delete datum[$146eeb4362821b4b$export$29b3fae588fa046f.Selected];
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
        data.forEach((datum)=>{
            datum[$146eeb4362821b4b$export$29b3fae588fa046f.Collapsed] = collapsed;
        });
        this.isCollapsed = collapsed;
    }
    activate(datum) {
        this.deactivate();
        datum[$146eeb4362821b4b$export$29b3fae588fa046f.Active] = true;
        this.active = datum;
    }
    deactivate() {
        if (this.active) delete this.active[$146eeb4362821b4b$export$29b3fae588fa046f.Active];
        this.active = null;
    }
    ordinalIndexWithinSelection(ordinal) {
        if (this.selection) for(let i = 0; i < this.selection.included.length; i++){
            let datum = this.selection.included[i];
            if (datum[$a3b399caf5d2c16b$export$b86d149b7c15b53e] === ordinal) return {
                datum: datum,
                index: i
            };
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









var $be230773a1581926$var$Action;
(function(Action) {
    Action[Action["deselect"] = 0] = "deselect";
    Action[Action["isolate"] = 1] = "isolate";
    Action[Action["exclude"] = 2] = "exclude";
    Action[Action["reset"] = 3] = "reset";
    Action[Action["next"] = 4] = "next";
    Action[Action["previous"] = 5] = "previous";
})($be230773a1581926$var$Action || ($be230773a1581926$var$Action = {
}));
class $be230773a1581926$export$e12e9bef3fc91403 {
    constructor(parentElement, language, animator, dataScope, colorMapHandler, hasColorMaps){
        this.language = language;
        this.animator = animator;
        this.dataScope = dataScope;
        this.colorMapHandler = colorMapHandler;
        this.hasColorMaps = hasColorMaps;
        this.element = $00670849ca68e684$exports.addDiv(parentElement, `${$4143f1453a8890e4$export$e875bf21bbc345e4}unitControls`);
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
            value: value
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
        switch(action){
            case $be230773a1581926$var$Action.deselect:
                this.clearSelection();
                p = this.animator.deselect();
                break;
            case $be230773a1581926$var$Action.exclude:
                this.clearSelection();
                p = this.animator.filter($00705dd910744dd8$export$4469b01c89fa5613(u.search), u.excluded, u.included, false);
                this.state.remapColor = false;
                break;
            case $be230773a1581926$var$Action.isolate:
                this.clearSelection();
                p = this.animator.filter(u.search, u.included, u.excluded, false);
                this.state.remapColor = false;
                break;
            case $be230773a1581926$var$Action.reset:
                this.clear();
                p = this.animator.reset();
                break;
            default:
                switch(action){
                    case $be230773a1581926$var$Action.previous:
                        this.state.index--;
                        if (this.state.index < 0) this.state.index = this.state.userSelection.included.length - 1;
                        break;
                    case $be230773a1581926$var$Action.next:
                        this.state.index++;
                        if (this.state.index >= this.state.userSelection.included.length) this.state.index = 0;
                        break;
                }
                this.render();
                p = this.animator.activate(this.state.userSelection.included[this.state.index]);
        }
        p.then(()=>this.render()
        );
    }
    render() {
        const hasRefinedData = this.dataScope.hasFilteredData();
        const renderProps = {
            language: this.language,
            actionHandler: (action)=>this.handleAction(action)
            ,
            selectionHandler: (columnName, value)=>this.selectByNameValue(columnName, value)
            ,
            count: this.state.userSelection && this.state.userSelection.included.length,
            hasRefinedData: hasRefinedData,
            item: this.state.userSelection && this.state.userSelection.included[this.state.index],
            remapColorHandler: (remap)=>this.remapChanged(remap)
            ,
            hasColorMaps: this.hasColorMaps() && hasRefinedData,
            remapColor: this.state.remapColor
        };
        const a = $00670849ca68e684$exports.getActiveElementInfo();
        $00670849ca68e684$exports.mount($be230773a1581926$var$renderDetails(renderProps), this.element);
        $00670849ca68e684$exports.setActiveElement(a);
    }
}
const $be230773a1581926$var$renderDetails = (props)=>{
    const controlButtons = [
        $00670849ca68e684$exports.createElement("button", {
            disabled: !props.item,
            onClick: (e)=>props.actionHandler($be230773a1581926$var$Action.deselect)
        }, props.language.deselect),
        $00670849ca68e684$exports.createElement("button", {
            disabled: !props.item,
            onClick: (e)=>props.actionHandler($be230773a1581926$var$Action.isolate)
        }, props.language.isolate),
        $00670849ca68e684$exports.createElement("button", {
            disabled: !props.item,
            onClick: (e)=>props.actionHandler($be230773a1581926$var$Action.exclude)
        }, props.language.exclude)
    ];
    const colorMapping = $00670849ca68e684$exports.createElement("div", null, $00670849ca68e684$exports.createElement("button", {
        disabled: props.remapColor,
        onClick: (e)=>props.remapColorHandler(true)
    }, props.language.newColorMap), $00670849ca68e684$exports.createElement("button", {
        disabled: !props.remapColor,
        onClick: (e)=>props.remapColorHandler(false)
    }, props.language.oldColorMap));
    const singleItem = props.count === 1;
    const scrollButtons = [
        $00670849ca68e684$exports.createElement("button", {
            disabled: singleItem,
            onClick: (e)=>props.actionHandler($be230773a1581926$var$Action.previous)
        }, props.language.previousDetail),
        $00670849ca68e684$exports.createElement("button", {
            disabled: singleItem,
            onClick: (e)=>props.actionHandler($be230773a1581926$var$Action.next)
        }, props.language.nextDetail),
        $00670849ca68e684$exports.createElement("span", null, " ", props.language.selectionCount(props.count))
    ];
    const rows = [];
    for(let prop in props.item){
        if (prop === $a3b399caf5d2c16b$export$b86d149b7c15b53e) continue;
        if ($406c1b16a5bd3c44$export$2634e87bf7671285(prop)) continue;
        rows.push({
            cells: [
                {
                    content: prop
                },
                {
                    content: $be230773a1581926$var$linkSelect(props.language, prop, props.item[prop], props.selectionHandler)
                }
            ]
        });
    }
    return $00670849ca68e684$exports.createElement("div", null, props.hasColorMaps && colorMapping, $00670849ca68e684$exports.createElement("h4", null, props.language.headers.selection), $00670849ca68e684$exports.createElement("div", {
        className: `${$4143f1453a8890e4$export$e875bf21bbc345e4}selection`
    }, controlButtons, $00670849ca68e684$exports.createElement("button", {
        disabled: !props.hasRefinedData,
        onClick: (e)=>props.actionHandler($be230773a1581926$var$Action.reset)
    }, "reset")), props.item && $00670849ca68e684$exports.createElement("h4", null, props.language.headers.details), $00670849ca68e684$exports.createElement("div", null, $00670849ca68e684$exports.createElement("div", {
        className: `${$4143f1453a8890e4$export$e875bf21bbc345e4}details-scroll`
    }, props.item && scrollButtons), $00670849ca68e684$exports.createElement("div", {
        className: `${$4143f1453a8890e4$export$e875bf21bbc345e4}details`
    }, props.item && $00670849ca68e684$exports.createElement($98be522bb53bca50$exports.Table, {
        rows: rows
    }))));
};
function $be230773a1581926$var$linkSelect(language1, columnName, value, selectionHandler) {
    return $00670849ca68e684$exports.createElement("span", null, $00670849ca68e684$exports.createElement("a", {
        href: "#",
        onClick: (e)=>selectionHandler(columnName, value)
    }, value), isNaN(value) ? [
        ' ',
        $00670849ca68e684$exports.createElement("a", {
            className: "bing-search",
            href: `https://www.bing.com/search?q=${encodeURIComponent(value)}`,
            target: "_blank"
        }, language1.bing)
    ] : '');
}



function $70a576f3e0597d61$export$219bf736f4dcad63(presenter, headers) {
    const vegaControls = presenter.getElement($407eabbb39689985$export$82c3b66b9a0309ee.vegaControls);
    $70a576f3e0597d61$var$conditionalHeader(!!vegaControls.querySelectorAll('.vega-bindings > *').length, vegaControls, headers.chart);
    const legend = presenter.getElement($407eabbb39689985$export$82c3b66b9a0309ee.legend);
    $70a576f3e0597d61$var$conditionalHeader(!!legend.children.length, legend, headers.legend);
}
function $70a576f3e0597d61$var$conditionalHeader(condition, element, header) {
    var existing = $70a576f3e0597d61$var$existingHeader(element, header);
    if (condition && !existing) $70a576f3e0597d61$var$addHeader(element, header);
    if (!condition && existing) existing.remove();
}
function $70a576f3e0597d61$var$addHeader(element, header) {
    const h = document.createElement('h4');
    h.innerHTML = header;
    element.insertAdjacentElement('beforebegin', h);
}
function $70a576f3e0597d61$var$existingHeader(element, header) {
    const { previousElementSibling: previousElementSibling  } = element;
    if (previousElementSibling && previousElementSibling.innerHTML === header) return previousElementSibling;
}




function $bb851559752c5ba0$var$legendRange(colorBinType, column, legend, clickedIndex) {
    if (column.quantitative) return $bb851559752c5ba0$var$selectQuantitative(colorBinType, column, legend, clickedIndex);
    else return $bb851559752c5ba0$var$selectCategorical(column, legend, clickedIndex);
}
function $bb851559752c5ba0$var$selectCategorical(column, legend, clickedIndex) {
    const value = legend.rows[clickedIndex].value;
    if (value === $146eeb4362821b4b$export$8dc108353b27858) {
        const values = [];
        for(let i in legend.rows)if (+i !== clickedIndex) values.push(legend.rows[i].value);
        return $44fc789f5716c739$export$6dc90c76fa6395fd(column, values);
    } else //select equal
    return {
        expressions: [
            $44fc789f5716c739$export$9875831c14ede476(column, legend.rows[clickedIndex].value)
        ]
    };
}
function $bb851559752c5ba0$var$selectQuantitative(colorBinType, column, legend, clickedIndex) {
    const keys = Object.keys(legend.rows).map((key)=>+key
    ).sort((a, b)=>+a - +b
    );
    let lowValue;
    let lowOperator;
    let highValue;
    let highOperator;
    const rowText = legend.rows[clickedIndex].label;
    switch(colorBinType){
        case 'continuous':
            lowValue = rowText;
            if (clickedIndex < keys.length - 1) highValue = legend.rows[clickedIndex + 1].value;
            break;
        default:
            {
                if (rowText.indexOf('null') > 0) {
                    const ex = {
                        expressions: [
                            $44fc789f5716c739$export$f11b1d645ff3971c(column)
                        ]
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
                    if (rowText.indexOf('<') >= 0) highValue = rowText.substring(2);
                    else if (rowText.indexOf('≥') >= 0) lowValue = rowText.substring(2);
                }
            }
    }
    if (lowValue) lowValue = $44fc789f5716c739$export$2a2f2afd479c1f6b(lowValue);
    if (highValue) highValue = $44fc789f5716c739$export$2a2f2afd479c1f6b(highValue);
    if (lowValue === highValue) return {
        expressions: [
            $44fc789f5716c739$export$9875831c14ede476(column, lowValue)
        ]
    };
    else return $44fc789f5716c739$export$34d6d0f79c89c63b(column, lowValue, highValue, lowOperator, highOperator);
}
function $bb851559752c5ba0$export$803a85dd7a220b99(colorBinType, colorColumn, legend, language) {
    const rowTexts = [];
    for(let i in legend.rows){
        let row = legend.rows[i];
        row.search = $bb851559752c5ba0$var$legendRange(colorBinType, colorColumn, legend, +i);
        if (row.value === $146eeb4362821b4b$export$8dc108353b27858) row.label = language.legendOther;
        else rowTexts.push(row.value);
    }
}



function $033f206191dd1c40$export$17254ea6be275784(columns, data, ordinalMap) {
    const uCol = columns.uid && columns.uid.name;
    if (ordinalMap) data.forEach((d, i)=>{
        const key = uCol ? d[uCol] : i;
        d[$a3b399caf5d2c16b$export$b86d149b7c15b53e] = ordinalMap[key];
    });
    else {
        ordinalMap = {
        };
        data.forEach((d, i)=>{
            d[$a3b399caf5d2c16b$export$b86d149b7c15b53e] = i;
            const uColValue = uCol ? d[uCol] : i;
            ordinalMap[uColValue] = i;
        });
    }
    return ordinalMap;
}
function $033f206191dd1c40$export$4560fd62e586acc(cube, data) {
    const len = data.length;
    for(let i = 0; i < len; i++){
        if (data[i][$a3b399caf5d2c16b$export$b86d149b7c15b53e] === cube.ordinal) return i;
    }
}



function $37e163a8fa47bb7c$export$c3a0858f04fd87bd(sv, b) {
    if (!sv || !b || !b.signals || !b.signals.length) return;
    for(let key in sv){
        let value = sv[key];
        let signalB = b.signals.filter((signal)=>signal.name === key
        )[0];
        if (signalB && signalB.bind) signalB.value = value;
    }
}
function $37e163a8fa47bb7c$export$6edb15af38125f88(view, spec) {
    if (!view || !spec || !spec.signals || !spec.signals.length) return;
    const result = {
    };
    spec.signals.forEach((signalA)=>{
        //bound to a UI control
        if (signalA.bind) try {
            result[signalA.name] = view.signal(signalA.name);
        } catch (e) {
        // continue regardless of error
        }
    });
    return result;
}





const { outerSize: $db05ca17fb46bbe6$var$outerSize  } = $00670849ca68e684$exports;
const { Table: $db05ca17fb46bbe6$var$Table  } = $98be522bb53bca50$exports;
class $db05ca17fb46bbe6$export$65f75c7b414e8cb6 {
    constructor(props){
        const renderProps = {
            cssPrefix: props.cssPrefix,
            rows: $db05ca17fb46bbe6$var$getRows(props.item, props.options)
        };
        this.element = $db05ca17fb46bbe6$var$renderTooltip(renderProps);
        if (this.element) {
            this.element.style.position = 'absolute';
            this.child = this.element.firstChild;
            document.body.appendChild(this.element);
            //measure and move as necessary
            let m = $db05ca17fb46bbe6$var$outerSize(this.child);
            while(m.height > document.documentElement.clientHeight){
                let tr = this.child.querySelector('tr:last-child');
                if (tr) tr.parentElement.removeChild(tr);
                else break;
                m = $db05ca17fb46bbe6$var$outerSize(this.child);
            }
            if (props.position.clientX + m.width >= document.documentElement.clientWidth) this.child.style.right = '0';
            let moveTop = true;
            if (props.position.clientY + m.height >= document.documentElement.clientHeight) {
                if (props.position.clientY - m.height > 0) this.child.style.bottom = '0';
                else moveTop = false;
            }
            if (moveTop) this.element.style.top = `${props.position.clientY}px`;
            this.element.style.left = `${props.position.clientX}px`;
        }
    }
    finalize() {
        if (this.element) document.body.removeChild(this.element);
        this.element = null;
    }
}
function $db05ca17fb46bbe6$var$getRows(item, options) {
    const rows = [];
    for(let columnName in item){
        if (columnName === $a3b399caf5d2c16b$export$b86d149b7c15b53e) continue;
        if ($406c1b16a5bd3c44$export$2634e87bf7671285(columnName)) continue;
        if (options && options.exclude) {
            if (options.exclude(columnName)) continue;
        }
        let value = item[columnName];
        let content;
        if (options && options.displayValue) content = options.displayValue(value);
        else switch(value){
            case null:
                content = $00670849ca68e684$exports.createElement("i", null, "null");
                break;
            case undefined:
                content = $00670849ca68e684$exports.createElement("i", null, "undefined");
                break;
            default:
                content = value.toString();
        }
        rows.push({
            cells: [
                {
                    content: columnName + ':'
                },
                {
                    content: content
                }
            ]
        });
    }
    return rows;
}
const $db05ca17fb46bbe6$var$renderTooltip = (props1)=>{
    return props1.rows.length === 0 ? null : $00670849ca68e684$exports.createElement("div", {
        className: `${props1.cssPrefix}tooltip`
    }, $db05ca17fb46bbe6$var$Table({
        rows: props1.rows
    }));
};





class $17b66d15f0c3b19b$export$8ab33d6b6c6417f7 {
    resetCharacterSet(forceNewCharacterSet, oldInsight, newInsight) {
        if (forceNewCharacterSet || $17b66d15f0c3b19b$var$needsNewCharacterSet(oldInsight, newInsight)) this.chars = undefined;
    }
    getCharacterSet(stage) {
        if (!this.chars) {
            const map = {
            };
            const addText = (text)=>{
                Array.from(text).forEach((char)=>{
                    map[char] = true;
                });
            };
            stage.textData.forEach((t)=>addText(t.text)
            );
            const { x: x , y: y , z: z  } = stage.axes;
            [
                x,
                y,
                z
            ].forEach((axes)=>{
                axes.forEach((axis)=>{
                    if (axis.tickText) axis.tickText.forEach((t)=>addText(t.text)
                    );
                    if (axis.title) addText(axis.title.text);
                });
            });
            this.chars = Object.keys(map);
        }
        return this.chars;
    }
}
function $17b66d15f0c3b19b$var$needsNewCharacterSet(oldInsight, newInsight) {
    if (!oldInsight) return true;
    if (!newInsight) return true;
    if (oldInsight.chart !== newInsight.chart) return true;
    if (oldInsight.facetStyle !== newInsight.facetStyle) return true;
    if (oldInsight.totalStyle !== newInsight.totalStyle) return true;
    if (oldInsight.hideAxes !== newInsight.hideAxes) return true;
    if (oldInsight.view !== newInsight.view) return true;
    if ($17b66d15f0c3b19b$var$differentObjectValues(oldInsight.signalValues, newInsight.signalValues)) return true;
    if ($17b66d15f0c3b19b$var$differentObjectValues(oldInsight.size, newInsight.size)) return true;
    const oldColumns = oldInsight.columns;
    const newColumns = newInsight.columns;
    if (oldColumns.facet !== newColumns.facet) return true;
    if (oldColumns.facetV !== newColumns.facetV) return true;
    if (oldColumns.x !== newColumns.x) return true;
    if (oldColumns.y !== newColumns.y) return true;
    if (oldColumns.z !== newColumns.z) return true;
    return false;
}
function $17b66d15f0c3b19b$var$differentObjectValues(a, b) {
    if (!a && !b) return false;
    if (!a || !b) return true;
    const keys = Object.keys(b);
    for(let i = 0; i < keys.length; i++){
        let key = keys[i];
        let ta = typeof a;
        let tb = typeof b;
        if (ta !== tb) return true;
        if (ta === 'object') return $17b66d15f0c3b19b$var$differentObjectValues(a[key], b[key]);
        else {
            if (a[key] !== b[key]) return true;
        }
    }
    return false;
}


var $cd7c0c51e96048d8$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
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
};
const { defaultView: $cd7c0c51e96048d8$var$defaultView  } = $1c19a15e6d55f62b$exports;
const $cd7c0c51e96048d8$var$zAxisZindex = 1010;
let $cd7c0c51e96048d8$var$didRegisterColorSchemes = false;
class $cd7c0c51e96048d8$export$ff719dc3ea4d1e34 {
    /**
     * Instantiate a new Viewer.
     * @param element Parent HTMLElement to present within.
     * @param options Optional viewer options object.
     */ constructor(element, options1){
        this.element = element;
        this.options = $00670849ca68e684$exports.deepMerge($4143f1453a8890e4$export$23e61e65e99ffb54, options1);
        this.presenter = new $f11b1222d18f5aff$export$67eca7ff2a7e9e8e(element, $4143f1453a8890e4$export$3e1dd6a74003f7a3(this.options));
        this._characterSet = new $17b66d15f0c3b19b$export$8ab33d6b6c6417f7();
        this._dataScope = new $2f029215431ce823$export$993107647a287a6();
        this._animator = new $d8c7d617dd7f10da$export$c31c6960578c025a(this._dataScope, {
            onDataChanged: this.onDataChanged.bind(this),
            onAnimateDataChange: this.onAnimateDataChange.bind(this)
        });
        this._details = new $be230773a1581926$export$e12e9bef3fc91403(this.presenter.getElement($407eabbb39689985$export$82c3b66b9a0309ee.panel), this.options.language, this._animator, this._dataScope, (remap)=>{
            this.currentColorContext = ~~remap;
            this.renderSameLayout();
        }, ()=>this.insight && this.insight.columns && !!this.insight.columns.color && this.colorContexts && this.colorContexts.length > 1
        );
        this.insight = {
        };
    }
    changeColorContexts(colorContexts) {
        this.colorContexts = colorContexts;
        this.currentColorContext = 0;
        this.options.onColorContextChange && this.options.onColorContextChange();
    }
    applyLegendColorContext(colorContext) {
        const a = $00670849ca68e684$exports.getActiveElementInfo();
        $00670849ca68e684$exports.mount(colorContext.legendElement, this.presenter.getElement($407eabbb39689985$export$82c3b66b9a0309ee.legend));
        $00670849ca68e684$exports.setActiveElement(a);
        this.presenter.stage.legend = colorContext.legend;
    }
    onAnimateDataChange(dataChange, waitingLabel, handlerLabel) {
        return new Promise((resolve, reject)=>{
            let innerPromise;
            if (dataChange === $d8c7d617dd7f10da$export$c17ac6787f338a14.refine) {
                const oldColorContext = this.colorContexts[this.currentColorContext];
                innerPromise = new Promise((innerResolve)=>{
                    this.renderNewLayout({
                    }, {
                        preStage: (stage, deckProps)=>{
                            $bb851559752c5ba0$export$803a85dd7a220b99(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
                            this.overrideAxisLabels(stage);
                            $b6965e965f496d72$export$65c9e5f150d5b083([
                                oldColorContext.colorMap
                            ], $00670849ca68e684$exports.getCubes(deckProps));
                            if (this.options.onStage) this.options.onStage(stage, deckProps);
                        }
                    }).then(()=>{
                        //apply old legend
                        this.applyLegendColorContext(oldColorContext);
                        innerResolve();
                    });
                });
            } else innerPromise = this.renderNewLayout({
            }, {
                preStage: (stage, deckProps)=>{
                    $bb851559752c5ba0$export$803a85dd7a220b99(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
                    this.overrideAxisLabels(stage);
                    if (this.options.onStage) this.options.onStage(stage, deckProps);
                }
            });
            innerPromise.then(()=>{
                this.presenter.animationQueue(resolve, this.options.transitionDurations.position, {
                    waitingLabel: waitingLabel,
                    handlerLabel: handlerLabel,
                    animationCanceled: reject
                });
            });
        });
    }
    onDataChanged(dataLayout, filter) {
        return $cd7c0c51e96048d8$var$__awaiter(this, void 0, void 0, function*() {
            switch(dataLayout){
                case $d8c7d617dd7f10da$export$c17ac6787f338a14.same:
                    this.renderSameLayout();
                    break;
                case $d8c7d617dd7f10da$export$c17ac6787f338a14.refine:
                    {
                        //save cube colors
                        const oldColorContext = this.colorContexts[this.currentColorContext];
                        let colorMap;
                        yield this.renderNewLayout({
                        }, {
                            preStage: (stage, deckProps)=>{
                                //save off the spec colors
                                colorMap = $b6965e965f496d72$export$1a7729b7ed4b2339(stage.cubeData);
                                $b6965e965f496d72$export$65c9e5f150d5b083([
                                    oldColorContext.colorMap
                                ], $00670849ca68e684$exports.getCubes(deckProps));
                                this.preStage(stage, deckProps);
                            },
                            onPresent: ()=>{
                                //save new legend
                                const newColorContext = {
                                    colorMap: colorMap,
                                    legend: $00670849ca68e684$exports.clone(this.presenter.stage.legend),
                                    legendElement: this.presenter.getElement($407eabbb39689985$export$82c3b66b9a0309ee.legend).children[0]
                                };
                                //apply old legend
                                this.applyLegendColorContext(oldColorContext);
                                this.changeColorContexts([
                                    oldColorContext,
                                    newColorContext
                                ]);
                            }
                        });
                        //narrow the filter only if it is different
                        if (!$66f57d958d42d9ea$export$df417da3ae0614a2(this.insight.filter, filter)) this.insight.filter = $d8f1ab965659a119$export$aeb8b82cc90b8eb1(this.insight.filter, filter);
                        if (this.options.onDataFilter) this.options.onDataFilter(this.insight.filter, this._dataScope.currentData());
                        break;
                    }
                case $d8c7d617dd7f10da$export$c17ac6787f338a14.reset:
                    {
                        const colorContext = {
                            colorMap: null,
                            legend: null,
                            legendElement: null
                        };
                        this.changeColorContexts([
                            colorContext
                        ]);
                        yield this.renderNewLayout({
                        }, {
                            onPresent: ()=>{
                                $b6965e965f496d72$export$2cdcf144dcfa6eb4(colorContext, this.presenter);
                            }
                        });
                        delete this.insight.filter;
                        if (this.options.onDataFilter) this.options.onDataFilter(null, null);
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
        if (!this._dataScope.hasFilteredData()) return this._specColumns;
        const roles = [
            'color',
            'facet',
            'group',
            'size',
            'sort',
            'sum',
            'x',
            'y',
            'z'
        ];
        const specColumns = Object.assign({
        }, this._specColumns);
        roles.forEach((r)=>{
            if (specColumns[r]) {
                const column = Object.assign({
                }, specColumns[r]);
                column.stats = this.getColumnStats(column);
                specColumns[r] = column;
            }
        });
        return specColumns;
    }
    renderNewLayout(signalValues, presenterConfig, view) {
        return $cd7c0c51e96048d8$var$__awaiter(this, void 0, void 0, function*() {
            const currData = this._dataScope.currentData();
            const context = {
                specColumns: this.getSpecColumnsWithFilteredStats(),
                insight: this.insight,
                specViewOptions: Object.assign(Object.assign({
                }, this.options), {
                    zAxisOptions: {
                        showZAxis: true,
                        zIndex: $cd7c0c51e96048d8$var$zAxisZindex
                    }
                })
            };
            const specResult = $4d5208b78df53d91$export$169a89f54f090971(context, currData);
            if (!specResult.errors) {
                const uiValues = $37e163a8fa47bb7c$export$6edb15af38125f88(this.vegaViewGl, this.vegaSpec);
                $37e163a8fa47bb7c$export$c3a0858f04fd87bd(Object.assign(Object.assign({
                }, uiValues), signalValues), specResult.vegaSpec);
                this.vegaSpec = specResult.vegaSpec;
                this.options.onVegaSpec && this.options.onVegaSpec(this.vegaSpec);
                this.specCapabilities = specResult.specCapabilities;
                const config = this.createConfig(presenterConfig);
                if (view) config.getView = ()=>view
                ;
                if (!$cd7c0c51e96048d8$var$didRegisterColorSchemes) {
                    $c70916a34f2bf3db$export$2f7089dba07adb1($2f0c752020c76b68$export$12896e353ebd9cc.vega);
                    $cd7c0c51e96048d8$var$didRegisterColorSchemes = true;
                }
                try {
                    if (this.vegaViewGl) this.vegaViewGl.finalize();
                    const runtime = $2f0c752020c76b68$export$12896e353ebd9cc.vega.parse(this.vegaSpec);
                    this.vegaViewGl = new $65b765713b03cc6f$export$5ae75a3802efaf(runtime, config).renderer('deck.gl').initialize(this.element);
                    yield this.vegaViewGl.runAsync();
                    const handler = (n, v)=>{
                        this._characterSet.resetCharacterSet(true);
                    };
                    this.vegaSpec.signals.forEach((s)=>{
                        this.vegaViewGl.addSignalListener(s.name, handler);
                    });
                    //capture new color color contexts via signals
                    this.configForSignalCapture(config.presenterConfig);
                } catch (e) {
                    specResult.errors = [
                        e.message
                    ];
                }
                if (!specResult.errors) $70a576f3e0597d61$export$219bf736f4dcad63(this.presenter, this.options.language.headers);
            }
            if (specResult.errors) {
                if (this.options.onError) this.options.onError(specResult.errors);
                else if (this.presenter.logger) this.presenter.logger(`errors rendering Vega spec:${specResult.errors.join('\n')}`);
            }
            return specResult;
        });
    }
    /**
     * Render the same layout with new options.
     * @param newViewerOptions New options object.
     */ renderSameLayout(newViewerOptions) {
        const colorContext = this.colorContexts[this.currentColorContext];
        const clonedCubes = this.presenter.getCubeData().map((cube)=>{
            return Object.assign({
            }, cube);
        });
        this.applyLegendColorContext(colorContext);
        let { axes: axes , textData: textData  } = this.presenter.stage;
        let recoloredAxes;
        if (newViewerOptions) {
            if (newViewerOptions.colors) {
                recoloredAxes = $8f727b1c21e8c366$export$7e9483d314559015(this.presenter.stage, this._lastColorOptions, newViewerOptions.colors);
                this._lastColorOptions = $00670849ca68e684$exports.clone(newViewerOptions.colors);
                axes = recoloredAxes.axes || axes;
                textData = recoloredAxes.textData || textData;
            }
            this.options = $00670849ca68e684$exports.deepMerge(this.options, newViewerOptions);
        }
        let colorMaps = [
            colorContext.colorMap
        ];
        let colorMethod;
        const hasSelectedData = this._dataScope.hasSelectedData();
        const hasActive = !!this._dataScope.active;
        if (hasSelectedData || hasActive) {
            const selectedColorMap = $b6965e965f496d72$export$3d85010f65df95c0(this._dataScope.currentData(), hasSelectedData, hasActive, this.options);
            colorMaps.push(selectedColorMap);
            colorMethod = this.options.colors.unselectedColorMethod;
        }
        $b6965e965f496d72$export$65c9e5f150d5b083(colorMaps, clonedCubes, colorMethod);
        const stage = {
            cubeData: clonedCubes,
            axes: axes,
            textData: textData
        };
        this.vegaViewGl.presenter.rePresent(stage, this.createConfig().presenterConfig);
    }
    getView(view) {
        if (view === undefined) {
            if (this.presenter.view === null) return $cd7c0c51e96048d8$var$defaultView;
            else return this.presenter.view;
        } else return view;
    }
    transformData(values, transform) {
        try {
            const runtime = $2f0c752020c76b68$export$12896e353ebd9cc.vega.parse({
                $schema: 'https://vega.github.io/schema/vega/v4.json',
                data: [
                    {
                        name: 'source',
                        values: values,
                        transform: transform
                    }
                ]
            });
            new $65b765713b03cc6f$export$5ae75a3802efaf(runtime).run();
        } catch (e) {
        // continue regardless of error
        }
        return values;
    }
    /**
     * Render data into a visualization.
     * @param insight Object to create a visualization specification.
     * @param data Array of data objects.
     * @param view Optional View to specify camera type.
     * @param ordinalMap Optional map of ordinals to assign to the data such that the same cubes can be re-used for new data.
     */ render(insight, data, options = {
    }) {
        return $cd7c0c51e96048d8$var$__awaiter(this, void 0, void 0, function*() {
            let result;
            //see if refine expression has changed
            if (!$66f57d958d42d9ea$export$df417da3ae0614a2(insight.filter, this.insight.filter)) {
                const allowAsyncRenderTime = 100;
                if (insight.filter) {
                    //refining
                    result = yield this._render(insight, data, options, true);
                    this.presenter.animationQueue(()=>{
                        this.filter(insight.filter, options.rebaseFilter && options.rebaseFilter());
                    }, allowAsyncRenderTime, {
                        waitingLabel: 'layout before refine',
                        handlerLabel: 'refine after layout'
                    });
                } else {
                    //not refining
                    this._dataScope.setFilteredData(null);
                    result = yield this._render(insight, data, options, true);
                    this.presenter.animationQueue(()=>{
                        this.reset();
                    }, allowAsyncRenderTime, {
                        waitingLabel: 'layout before reset',
                        handlerLabel: 'reset after layout'
                    });
                }
            } else result = yield this._render(insight, data, options, false);
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
        };
        //now be ready to capture color changing signals 
        presenterConfig.preStage = (stage, deckProps)=>{
            if (this._shouldSaveColorContext()) //save off the colors from Vega layout
            colorContext.colorMap = $b6965e965f496d72$export$1a7729b7ed4b2339(stage.cubeData);
            this.preStage(stage, deckProps);
        };
        presenterConfig.onPresent = ()=>{
            if (this._shouldSaveColorContext()) {
                $b6965e965f496d72$export$2cdcf144dcfa6eb4(colorContext, this.presenter);
                this.changeColorContexts([
                    colorContext
                ]);
                this._dataScope.deselect();
            }
        };
    }
    _render(insight, data, options, forceNewCharacterSet) {
        return $cd7c0c51e96048d8$var$__awaiter(this, void 0, void 0, function*() {
            if (this._tooltip) {
                this._tooltip.finalize();
                this._tooltip = null;
            }
            if (this._dataScope.setData(data, options.columns)) //apply transform to the data
            this.transformData(data, insight.transform);
            this._specColumns = $0ebaa52647c6073e$export$301044eba61980a8(insight, this._dataScope.getColumns(options.columnTypes));
            const ordinalMap = $033f206191dd1c40$export$17254ea6be275784(this._specColumns, data, options.ordinalMap);
            this._characterSet.resetCharacterSet(forceNewCharacterSet, this.insight, insight);
            this.insight = $00670849ca68e684$exports.clone(insight);
            this._lastColorOptions = $00670849ca68e684$exports.clone(this.options.colors);
            this._shouldSaveColorContext = ()=>!options.initialColorContext
            ;
            const colorContext = options.initialColorContext || {
                colorMap: null,
                legend: null,
                legendElement: null
            };
            const specResult = yield this.renderNewLayout(insight.signalValues, {
                preStage: (stage, deckProps)=>{
                    if (this._shouldSaveColorContext()) //save off the colors from Vega layout
                    colorContext.colorMap = $b6965e965f496d72$export$1a7729b7ed4b2339(stage.cubeData);
                    else //apply passed colorContext
                    $b6965e965f496d72$export$65c9e5f150d5b083([
                        colorContext.colorMap
                    ], $00670849ca68e684$exports.getCubes(deckProps));
                    //if items are selected, repaint
                    const hasSelectedData = !!this._dataScope.hasSelectedData();
                    const hasActive = !!this._dataScope.active;
                    if (this._dataScope.hasSelectedData() || this._dataScope.active) {
                        const selectedColorMap = $b6965e965f496d72$export$3d85010f65df95c0(this._dataScope.currentData(), hasSelectedData, hasActive, this.options);
                        $b6965e965f496d72$export$65c9e5f150d5b083([
                            colorContext.colorMap,
                            selectedColorMap
                        ], stage.cubeData, this.options.colors.unselectedColorMethod);
                    }
                    this.preStage(stage, deckProps);
                },
                onPresent: ()=>{
                    if (this._shouldSaveColorContext()) {
                        $b6965e965f496d72$export$2cdcf144dcfa6eb4(colorContext, this.presenter);
                        this.changeColorContexts([
                            colorContext
                        ]);
                    } else //apply passed colorContext
                    this.applyLegendColorContext(colorContext);
                },
                shouldViewstateTransition: ()=>this.shouldViewstateTransition(insight, this.insight)
            }, this.getView(insight.view));
            //future signal changes should save the color context
            this._shouldSaveColorContext = ()=>!options.discardColorContextUpdates || !options.discardColorContextUpdates()
            ;
            this._details.render();
            const result = {
                ordinalMap: ordinalMap,
                specResult: specResult
            };
            return result;
        });
    }
    overrideAxisLabels(stage) {
    // if (this._specColumns.x && this._specColumns.x.type === 'date') {
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
        const onClick = (e, search)=>{
            if (this.options.onAxisClick) this.options.onAxisClick(e, search);
            else this.select(search);
        };
        this.overrideAxisLabels(stage);
        const polygonLayer = $eb543ae47877c1a9$export$799a72d0a47efbc5(this.presenter, this.specCapabilities, this._specColumns, stage, onClick, this.options.colors.axisSelectHighlight, this.options.selectionPolygonZ);
        const order = 1; //after textlayer but before others
        deckProps.layers.splice(order, 0, polygonLayer);
        $bb851559752c5ba0$export$803a85dd7a220b99(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
        if (this.options.onStage) this.options.onStage(stage, deckProps);
    }
    onCubeClick(e, cube) {
        this.options.onCubeClick && this.options.onCubeClick(e, cube);
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
        if (hasSelectedData && this._dataScope.selection.included.length === 1 && this._dataScope.selection.included[0][$a3b399caf5d2c16b$export$b86d149b7c15b53e] === cube.ordinal) {
            this.deselect();
            return;
        }
        const search = {
            name: $a3b399caf5d2c16b$export$b86d149b7c15b53e,
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
        if (!cube) return;
        const currentData = this._dataScope.currentData();
        const index = $033f206191dd1c40$export$4560fd62e586acc(cube, currentData);
        if (index >= 0) this._tooltip = new $db05ca17fb46bbe6$export$65f75c7b414e8cb6({
            options: this.options.tooltipOptions,
            item: currentData[index],
            position: e,
            cssPrefix: this.presenter.style.cssPrefix
        });
    }
    onTextHover(e, t) {
        //return true if highlight color is different
        if (!t || !this.options.getTextColor || !this.options.getTextHighlightColor) return false;
        return !$00670849ca68e684$exports.colorIsEqual(this.options.getTextColor(t), this.options.getTextHighlightColor(t));
    }
    createConfig(c) {
        const { getTextColor: getTextColor , getTextHighlightColor: getTextHighlightColor , getTextHighlightAlphaCutoff: getTextHighlightAlphaCutoff , onTextClick: onTextClick  } = this.options;
        const defaultPresenterConfig = {
            zAxisZindex: $cd7c0c51e96048d8$var$zAxisZindex,
            getCharacterSet: (stage)=>this._characterSet.getCharacterSet(stage)
            ,
            getTextColor: getTextColor,
            getTextHighlightColor: getTextHighlightColor,
            getTextHighlightAlphaCutoff: getTextHighlightAlphaCutoff,
            onTextClick: (e, t)=>{
                if (t.metaData && t.metaData.search) {
                    const search = $05162edb3d6c06e2$export$34ed1fd5ef58e5bb(t.metaData.search);
                    if (this.options.onAxisClick) this.options.onAxisClick(e, search);
                    else this.select(search);
                }
                if (onTextClick) onTextClick(e, t);
            },
            onCubeClick: this.onCubeClick.bind(this),
            onCubeHover: this.onCubeHover.bind(this),
            onTextHover: this.onTextHover.bind(this),
            preStage: this.preStage.bind(this),
            onPresent: this.options.onPresent,
            onLayerClick: (info, e)=>{
                if (!info || !info.object) this.deselect();
            },
            onLegendClick: (e, legend, clickedIndex)=>{
                const legendRow = clickedIndex !== null && legend.rows[clickedIndex];
                if (legendRow) {
                    if (this.options.onLegendRowClick) this.options.onLegendRowClick(e, legendRow);
                    else this.select(legendRow.search);
                } else if (this.options.onLegendHeaderClick) //header clicked
                this.options.onLegendHeaderClick(e);
            },
            onSceneRectAssignCubeOrdinal: (datum)=>{
                //TODO see if datum is a facet selection rect
                return datum[$a3b399caf5d2c16b$export$b86d149b7c15b53e];
            },
            onTargetViewState: (h, w)=>{
                const { height: height , width: width  } = this.insight.size;
                let newViewStateTarget;
                if (this.options.onNewViewStateTarget) newViewStateTarget = this.options.onNewViewStateTarget();
                return {
                    height: height,
                    width: width,
                    newViewStateTarget: newViewStateTarget
                };
            },
            preserveDrawingBuffer: this.options.preserveDrawingBuffer
        };
        if (this.options.onBeforeCreateLayers) defaultPresenterConfig.preLayer = (stage)=>{
            this.options.onBeforeCreateLayers(stage, this.specCapabilities);
        };
        const config = {
            presenter: this.presenter,
            presenterConfig: Object.assign(defaultPresenterConfig, c)
        };
        if (this.options.transitionDurations) config.presenterConfig.transitionDurations = this.options.transitionDurations;
        return config;
    }
    /**
     * Filter the data and animate.
     * @param search Filter expression, see https://vega.github.io/vega/docs/expressions/
     * @param rebase Optional flag to apply to entire dataset. A false value will apply the filter upon any existing filter.
     */ filter(search, rebase = false) {
        const u = this._dataScope.createUserSelection(search, false, rebase);
        return new Promise((resolve, reject)=>{
            this._animator.filter(search, u.included, u.excluded, rebase).then(()=>{
                this._details.clear();
                this._details.clearSelection();
                this._details.populate(this._dataScope.selection);
                resolve();
            });
        });
    }
    /**
     * Remove any filtration and animate.
     */ reset() {
        return new Promise((resolve, reject)=>{
            this._animator.reset().then(()=>{
                this._details.clear();
                this._details.clearSelection();
                resolve();
            });
        });
    }
    /**
     * Select cubes by a filter expression.
     * @param search Filter expression, see https://vega.github.io/vega/docs/expressions/
     */ select(search) {
        return new Promise((resolve, reject)=>{
            this._animator.select(search).then(()=>{
                this._details.populate(this._dataScope.selection);
                resolve();
            });
        });
    }
    /**
     * Removes any selection.
     */ deselect() {
        return new Promise((resolve, reject)=>{
            this._animator.deselect().then(()=>{
                this._details.clearSelection();
                resolve();
            });
        });
    }
    /**
     * Gets the current selection.
     */ getSelection() {
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
     */ activate(datum) {
        return new Promise((resolve, reject)=>{
            this._animator.activate(datum).then(()=>{
                this._details.render();
                resolve();
            });
        });
    }
    /**
     * Deactivate item.
     */ deActivate() {
        return new Promise((resolve, reject)=>{
            if (this._dataScope && this._dataScope.active) this._animator.deactivate().then(()=>{
                this._details.render();
                resolve();
            });
            else resolve();
        });
    }
    /**
     * Gets the current insight with signal values.
     */ getInsight() {
        const insight = Object.assign({
        }, this.insight);
        insight.signalValues = this.getSignalValues();
        return insight;
    }
    /**
     * Gets column stats from current data (filtered or all).
     * @param column Column to get stats for.
     */ getColumnStats(column) {
        return this._dataScope.hasFilteredData() ? this._dataScope.getFilteredColumnStats(column.name) : column.stats;
    }
    /**
     * Gets current signal values.
     */ getSignalValues() {
        return $37e163a8fa47bb7c$export$6edb15af38125f88(this.vegaViewGl, this.vegaSpec);
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
 */ $cd7c0c51e96048d8$export$ff719dc3ea4d1e34.defaultViewerOptions = $4143f1453a8890e4$export$23e61e65e99ffb54;


const $dc138f04a6edaf73$export$aef83baa0e7093df = '3.2.1';


const $385418a87250916e$export$44747fb0056adba5 = $2f0c752020c76b68$export$44747fb0056adba5;


var $6e437f743d80b3ba$exports = {};

$parcel$export($6e437f743d80b3ba$exports, "classList", () => $6e437f743d80b3ba$export$f4d7ca4fe1e27e47);
$parcel$export($6e437f743d80b3ba$exports, "deepCompare", () => $6e437f743d80b3ba$export$9699af0473c7911b);
var $8cb2d6cf8e1a2579$exports = {};
$8cb2d6cf8e1a2579$exports = $8cb2d6cf8e1a2579$var$compare;
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
*/ function $8cb2d6cf8e1a2579$var$compare(value1, value2) {
    if (value1 === value2) return true;
    /* eslint-disable no-self-compare */ // if both values are NaNs return true
    if (value1 !== value1 && value2 !== value2) return true;
    if (({
    }).toString.call(value1) != ({
    }).toString.call(value2)) return false;
    if (value1 !== Object(value1)) // non equal primitives
    return false;
    if (!value1) return false;
    if (Array.isArray(value1)) return $8cb2d6cf8e1a2579$var$compareArrays(value1, value2);
    if (({
    }).toString.call(value1) == '[object Object]') return $8cb2d6cf8e1a2579$var$compareObjects(value1, value2);
    else return $8cb2d6cf8e1a2579$var$compareNativeSubtypes(value1, value2);
}
function $8cb2d6cf8e1a2579$var$compareNativeSubtypes(value1, value2) {
    // e.g. Function, RegExp, Date
    return value1.toString() === value2.toString();
}
function $8cb2d6cf8e1a2579$var$compareArrays(value1, value2) {
    var len = value1.length;
    if (len != value2.length) return false;
    var alike = true;
    for(var i = 0; i < len; i++)if (!$8cb2d6cf8e1a2579$var$compare(value1[i], value2[i])) {
        alike = false;
        break;
    }
    return alike;
}
function $8cb2d6cf8e1a2579$var$compareObjects(value1, value2) {
    var keys1 = Object.keys(value1).sort();
    var keys2 = Object.keys(value2).sort();
    var len = keys1.length;
    if (len != keys2.length) return false;
    for(var i = 0; i < len; i++){
        var key1 = keys1[i];
        var key2 = keys2[i];
        if (!(key1 == key2 && $8cb2d6cf8e1a2579$var$compare(value1[key1], value2[key2]))) return false;
    }
    return true;
}


const $6e437f743d80b3ba$export$f4d7ca4fe1e27e47 = (...args)=>{
    return args.filter(Boolean).join(' ');
};
const $6e437f743d80b3ba$export$9699af0473c7911b = $8cb2d6cf8e1a2579$exports.default || $8cb2d6cf8e1a2579$exports;




const $10e70159f7836695$export$12896e353ebd9cc = {
    react: null,
    reactDOM: null
};
function $10e70159f7836695$export$44747fb0056adba5(react, reactDOM, vega, deck, layers, luma) {
    $7f572b57d5948475$exports.use(vega, deck, layers, luma);
    $10e70159f7836695$export$12896e353ebd9cc.react = react;
    $10e70159f7836695$export$12896e353ebd9cc.reactDOM = reactDOM;
    //inform React that we are using a dynamic base class
    $2e70c6c127734088$export$1d29a992e629a3f4.prototype = react.Component.prototype;
}




function $2e70c6c127734088$var$addNullable(insight, signalValues) {
    const withNulls = Object.assign(Object.assign({
        view: null,
        filter: null
    }, insight), {
        signalValues: signalValues
    });
    return withNulls;
}
function $2e70c6c127734088$export$b1526dcecdc7f4ad(viewer, insight) {
    const currentInsight = viewer.getInsight();
    const a = $2e70c6c127734088$var$addNullable(currentInsight, Object.assign(Object.assign({
    }, viewer.insight.signalValues), currentInsight.signalValues));
    const b = $2e70c6c127734088$var$addNullable(insight, Object.assign(Object.assign({
    }, a.signalValues), insight.signalValues));
    const compare = $6e437f743d80b3ba$export$9699af0473c7911b(a, b);
    return {
        a: a,
        b: b,
        compare: compare
    };
}
function $2e70c6c127734088$var$_SandDanceReact(props) {
    class __SandDanceReact extends $10e70159f7836695$export$12896e353ebd9cc.react.Component {
        layout() {
            this.lastData = this.props.data;
            this.viewer.render(this.props.insight, this.props.data, this.props.renderOptions).then((renderResult)=>{
                //TODO: show errors if any
                //console.log('viewer render');
                this.props.onView && this.props.onView(renderResult);
            }).catch((e)=>{
                //console.log('viewer error');
                this.props.onError && this.props.onError(e);
            });
        }
        view() {
            if (this.props.insight && this.props.data) {
                const c = $2e70c6c127734088$export$b1526dcecdc7f4ad(this.viewer, this.props.insight);
                const sameDataRef = this.props.data === this.lastData;
                if (!c.compare || !sameDataRef) this.layout();
            }
        }
        componentDidMount() {
            const element = $10e70159f7836695$export$12896e353ebd9cc.reactDOM.findDOMNode(this.viewerDiv);
            this.viewer = new $cd7c0c51e96048d8$exports.Viewer(element, this.props.viewerOptions);
            if (this.props.onMount) {
                if (this.props.onMount(this.viewer.presenter.getElement($7f572b57d5948475$exports.PresenterElement.gl))) this.view();
            } else this.view();
        }
        componentDidUpdate() {
            this.viewer.options = $7f572b57d5948475$exports.util.deepMerge(this.viewer.options, this.props.viewerOptions);
            this.view();
        }
        componentWillUnmount() {
            this.viewer.finalize();
        }
        render() {
            return $10e70159f7836695$export$12896e353ebd9cc.react.createElement("div", {
                className: "sanddance-ReactViewer",
                ref: (div)=>this.viewerDiv = div
            });
        }
    }
    return new __SandDanceReact(props);
}
const $2e70c6c127734088$export$1d29a992e629a3f4 = $2e70c6c127734088$var$_SandDanceReact;



const $01b008870dc83545$export$aef83baa0e7093df = '3.0.1';





function $9339840789a2dc56$export$50478d543b96dfd6(props) {
    if (!props.explorer.viewer || !props.signal) return null;
    if (props.signal.bind) {
        const input = props.signal.bind.input;
        if (input) {
            const fn = $9339840789a2dc56$var$map[input];
            if (fn) {
                const prefix = props.prefix ? `${props.prefix} ` : '';
                let initialValue;
                try {
                    initialValue = props.explorer.viewer.vegaViewGl.signal(props.signal.name);
                } catch (error) {
                // continue regardless of error
                }
                const control = fn(prefix, props.signal.bind, initialValue, (value)=>{
                    props.onChange && props.onChange(value);
                    props.explorer.signal(props.signal.name, value, props.newViewStateTarget);
                }, props.disabled, props.collapseLabel);
                return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                    className: "sanddance-signal"
                }, control);
            }
        }
    }
    return null;
}
const $9339840789a2dc56$var$map = {
};
$9339840789a2dc56$var$map['range'] = (prefix, bind, initialValue, onChange, disabled, collapseLabel)=>{
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Slider, {
        label: prefix + bind.name,
        max: bind.max,
        min: bind.min,
        step: bind.step,
        defaultValue: initialValue,
        onChange: onChange,
        disabled: disabled
    });
};
$9339840789a2dc56$var$map['select'] = (prefix, bind, initialValue, onChange, disabled, collapseLabel)=>{
    const options = bind.options.map((o, i)=>{
        const option = {
            key: o,
            text: o
        };
        return option;
    });
    const label = prefix + bind.name;
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Dropdown, {
        onRenderTitle: collapseLabel ? (a, b)=>$c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("span", null, label, ": ", a[0].text)
         : undefined,
        defaultSelectedKey: initialValue,
        label: collapseLabel ? undefined : label,
        options: options,
        onChange: (e, o)=>onChange(o.text)
        ,
        disabled: disabled
    });
};
$9339840789a2dc56$var$map['checkbox'] = (prefix, bind, initialValue, onChange, disabled, collapseLabel)=>{
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Toggle, {
        defaultChecked: initialValue,
        label: prefix + bind.name,
        onChange: (e, checked)=>onChange(checked)
        ,
        disabled: disabled
    });
}; //TODO other signal types


const $d3f49cd4a4ebf638$export$e345c26dc94dc116 = {
    appName: 'SandDance',
    bingsearch: 'Bing',
    bingsearchDescription: (term)=>`Search Bing for "${term}"`
    ,
    buttonClose: 'Close',
    buttonSelect: 'Search & Select',
    buttonColorSchemeMap: 'Map color scheme to filtered data',
    buttonColorSchemeRemap: 'Remap color to filtered data',
    buttonColorSchemeKeep: 'Keep same color scheme',
    buttonCopyToClipboard: 'Copy to clipboard',
    buttonExclude: 'Exclude',
    buttonExport: 'Export',
    buttonExportCount: (total)=>total == 1 ? 'Export 1 row...' : `Export ${total} rows...`
    ,
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
    errorExportFilenameCharacters: (characters)=>`A filename cannot contain any of the following characters: ${characters}`
    ,
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
    labelColorFieldInfo: (colorColumnName, colorColumnType, categoricalNumeric, distinctValueCount)=>`Field <span className="fieldname">${colorColumnName}</span> is of type <span className="fieldtype">${colorColumnType}</span>${categoricalNumeric ? ` and has ${distinctValueCount} distinct values` : ''}.`
    ,
    labelColorFieldIsColorData: (colorColumnName)=>`Field <span className="fieldname">${colorColumnName}</span> contains direct color data.`
    ,
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
    labelHistoryChangeChartType: (chart)=>`Change chart type to ${chart}`
    ,
    labelHistoryMapColumn: (column)=>`Map ${column} role`
    ,
    labelHistoryUnMapColumn: (column)=>`Unmap ${column} role`
    ,
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
    record: (current, total)=>`${current} of ${total}`
    ,
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
    tooltipSearch: (column, value)=>`Click to search in '${column}' for "${value}"`
    ,
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
    signalGroups: [
        {
            prefix: 'Chart',
            label: 'Chart options'
        },
        {
            prefix: 'Mark',
            label: 'Mark options'
        },
        {
            prefix: 'RoleColor',
            label: 'Color options'
        },
        {
            prefix: 'RoleFacet',
            label: 'Facet options'
        },
        {
            prefix: 'RoleSort',
            label: 'Sort options'
        },
        {
            prefix: 'RoleX',
            label: 'X axis options'
        },
        {
            prefix: 'RoleY',
            label: 'Y axis options'
        },
        {
            prefix: 'RoleZ',
            label: 'Z axis options'
        },
        {
            prefix: 'Text',
            label: 'Text options'
        },
        {
            prefix: '*',
            label: 'Options'
        }
    ]
};


const $d359193c5ab9f387$var$maxFacets = 50;
const $d359193c5ab9f387$var$roleLabels = {
    color: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColumnColor,
    facet: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColumnFacet,
    facetV: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColumnFacetV,
    group: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColumnGroup,
    size: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColumnSize,
    sort: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColumnSort,
    uid: null,
    x: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColumnX,
    y: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColumnY,
    z: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColumnZ
};
const $d359193c5ab9f387$var$aliasLabels = {
    color: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelAliasColor,
    facet: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelAliasFacet,
    facetV: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelAliasFacetV,
    group: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelAliasGroup,
    size: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelAliasSize,
    sort: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelAliasSort,
    uid: null,
    x: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelAliasX,
    y: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelAliasY,
    z: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelAliasZ
};
function $d359193c5ab9f387$var$filterColumnList(context, columns) {
    switch(context){
        case 'facet':
        case 'facetV':
            return columns.filter((column)=>column.quantitative || column.stats.distinctValueCount && column.stats.distinctValueCount < $d359193c5ab9f387$var$maxFacets
            );
        default:
            return columns.slice();
    }
}
function $d359193c5ab9f387$var$optionsForSpecColumn(sectionName, columns, role, disabledColumnName, selectedColumnName) {
    const filtered = $d359193c5ab9f387$var$filterColumnList(role, columns);
    const options = filtered.map((column)=>{
        const option = {
            key: `column:${column.name}`,
            text: column.name,
            data: column,
            selected: selectedColumnName === column.name,
            disabled: disabledColumnName === column.name
        };
        return option;
    });
    if (options.length) {
        const option = {
            key: sectionName,
            text: sectionName,
            itemType: $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DropdownMenuItemType.Header
        };
        options.unshift(option);
    }
    return options;
}
function $d359193c5ab9f387$var$optionsForReference(sectionName, specRoles) {
    const options = specRoles.map((specRole)=>{
        const option = {
            key: `role:${specRole.role}`,
            text: $d359193c5ab9f387$var$aliasLabels[specRole.role],
            data: specRole.role
        };
        return option;
    }).sort((a, b)=>a.text.localeCompare(b.text)
    );
    if (options.length) {
        const option = {
            key: sectionName,
            text: sectionName,
            itemType: $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DropdownMenuItemType.Header
        };
        options.unshift(option);
    }
    return options;
}
function $d359193c5ab9f387$var$selectFirst(options) {
    for(let i = 0; i < options.length; i++){
        if (options[i].itemType === $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DropdownMenuItemType.Header) continue;
        options[i].selected = true;
        return;
    }
}
function $d359193c5ab9f387$export$6c7e7b0bee245ba4(props) {
    if (!props.specRole) return null;
    let categoricalColumns;
    let directColorColumns;
    let directColorGroup;
    let referenceGroup = [];
    if (props.specRole.role === 'color') {
        categoricalColumns = props.categoricalColumns.filter((c)=>!c.isColorData
        );
        directColorColumns = props.categoricalColumns.filter((c)=>c.isColorData
        );
        directColorGroup = $d359193c5ab9f387$var$optionsForSpecColumn($d3f49cd4a4ebf638$export$e345c26dc94dc116.selectDirectColor, directColorColumns, 'color', props.disabledColumnName, props.selectedColumnName);
    } else categoricalColumns = props.categoricalColumns;
    if (props.specRole.role === 'sort') {
        const others = props.specCapabilities.roles.filter((specRole)=>specRole.role !== props.specRole.role
        );
        referenceGroup = $d359193c5ab9f387$var$optionsForReference($d3f49cd4a4ebf638$export$e345c26dc94dc116.selectReference, others);
    }
    const quantitativeGroup = $d359193c5ab9f387$var$optionsForSpecColumn($d3f49cd4a4ebf638$export$e345c26dc94dc116.selectNumeric, props.quantitativeColumns, props.specRole.role, props.disabledColumnName, props.selectedColumnName);
    const categoricGroup = props.specRole.excludeCategoric ? null : $d359193c5ab9f387$var$optionsForSpecColumn($d3f49cd4a4ebf638$export$e345c26dc94dc116.selectNonNumeric, categoricalColumns, props.specRole.role, props.disabledColumnName, props.selectedColumnName);
    const options = referenceGroup.concat(quantitativeGroup).concat(categoricGroup).concat(directColorGroup).filter(Boolean);
    return options;
}
function $d359193c5ab9f387$export$ac5b76d1f02dd063(props) {
    const options = $d359193c5ab9f387$export$6c7e7b0bee245ba4(props);
    if (props.specRole.allowNone) options.unshift({
        key: -1,
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectNone
    });
    const hasSelection = options.reduce((p, c)=>{
        return p || c.selected;
    }, false);
    if (!hasSelection) $d359193c5ab9f387$var$selectFirst(options);
    let signals;
    if (props.explorer.viewer && props.explorer.viewer.vegaSpec) {
        if (props.specRole.signals) signals = props.explorer.viewer.vegaSpec.signals.filter((s)=>props.specRole.signals.indexOf(s.name) >= 0
        );
    }
    const label = $d359193c5ab9f387$var$roleLabels[props.specRole.role];
    const signalElements = !props.hideSignals && signals && signals.map((signal, i)=>$c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($9339840789a2dc56$export$50478d543b96dfd6, {
            key: i,
            explorer: props.explorer,
            signal: signal,
            onChange: (value)=>props.onChangeSignal && props.onChangeSignal(signal.name, value)
            ,
            collapseLabel: props.collapseLabel
        })
    );
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sanddance-columnMap"
    }, props.prefix, !props.hideDropdown && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($6b702e1ad8ceb63e$export$30a13326eaae8e00, {
        componentRef: props.componentRef,
        collapseLabel: props.collapseLabel,
        disabled: props.disabled,
        label: label,
        options: options,
        onChange: (e, o)=>props.changeColumnMapping(props.specRole.role, typeof o.data === 'string' ? o.data : $385418a87250916e$exports.VegaDeckGl.util.clone(o.data))
        ,
        onDismiss: props.onDismiss
    }), signalElements, props.suffix);
}



function $111d368e10bec10f$export$7d34e96f399a3b0b(stage, specCapabilities) {
    for(let axisName in stage.axes)specCapabilities.roles.forEach((specRole)=>{
        if (specRole.role === axisName) {
            let axes = stage.axes[axisName];
            axes.forEach((axis)=>{
                if (axis.title) {
                    const textItem = axis.title;
                    textItem.specRole = specRole;
                }
            });
        }
    });
}
function $111d368e10bec10f$var$px(n) {
    return n + 'px';
}
function $111d368e10bec10f$var$_PositionedColumnMap(props) {
    class __PositionedColumnMap extends $c5e1961a7f97a459$export$12896e353ebd9cc.react.Component {
        constructor(props1){
            super(props1);
            const { left: left , top: top  } = props1;
            this.state = {
                left: left,
                top: top
            };
            this.dropdownRef = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createRef();
        }
        focus() {
            if (!this.focused) {
                this.focused = true;
                this.dropdownRef.current.focus(true);
            }
        }
        componentDidMount() {
            const size = $385418a87250916e$exports.VegaDeckGl.util.outerSize(this.div);
            const over = {
                left: Math.max(0, this.state.left + size.width - this.props.container.offsetWidth),
                top: Math.max(0, this.state.top + size.height - this.props.container.offsetHeight)
            };
            if (over.left || over.top) {
                let { left: left1 , top: top1  } = this.state;
                left1 -= over.left;
                top1 -= over.top;
                this.setState({
                    left: left1,
                    top: top1
                });
            } else this.focus();
        }
        componentDidUpdate() {
            this.focus();
        }
        render() {
            return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                ref: (div)=>{
                    if (div) this.div = div;
                },
                className: "sanddance-columnMap-absolute",
                style: {
                    position: 'absolute',
                    left: $111d368e10bec10f$var$px(this.state.left),
                    top: $111d368e10bec10f$var$px(this.state.top)
                }
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($d359193c5ab9f387$export$ac5b76d1f02dd063, Object.assign({
            }, this.props, {
                componentRef: this.dropdownRef,
                hideSignals: true
            })));
        }
    }
    return new __PositionedColumnMap(props);
}
const $111d368e10bec10f$export$ca11bec7c35e97ff = $111d368e10bec10f$var$_PositionedColumnMap;


const $110bef004cdb041f$export$9092658cd6cf7753 = (title, embed)=>`<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>${title}</title>\n    <link rel="stylesheet" type="text/css"\n        href="https://unpkg.com/@msrvida/sanddance-embed@3/dist/css/sanddance-embed.css" />\n    <link rel="stylesheet" type="text/css"\n        href="https://unpkg.com/@msrvida/sanddance-explorer@3/dist/css/sanddance-explorer.css" />\n</head>\n\n<body>\n    <script src="https://unpkg.com/react@16.13/umd/react.production.min.js" crossorigin></script>\n    <script src="https://unpkg.com/react-dom@16.13/umd/react-dom.production.min.js" crossorigin></script>\n    <script src="https://unpkg.com/deck.gl@8.3.7/dist.min.js"></script>\n    <script src="https://unpkg.com/vega@5.17/build/vega.min.js"></script>\n    <script src="https://unpkg.com/@fluentui/react@7.150/dist/fluentui-react.js"></script>\n    <script src="https://unpkg.com/@msrvida/sanddance-explorer@3/dist/umd/sanddance-explorer.js"></script>\n    <script src="https://unpkg.com/@msrvida/sanddance-embed@3/dist/umd/sanddance-embed.js"></script>\n\n    <div id="app"></div>\n\n    ${embed}\n\n</body>\n\n</html>`
;




function $81d988802085482c$export$ff3ac2620f930363(data, delimiter) {
    var fields = Object.keys(data[0]);
    var file = data.map((row)=>{
        return fields.map((fieldName)=>{
            const value = row[fieldName];
            if (typeof value === 'number') return value;
            if (typeof value === 'string') {
                if (value.indexOf(delimiter) >= 0) return `"${value.replace(/"/g, '""')}"`;
                else return value;
            }
            return '';
        }).join(delimiter);
    });
    file.unshift(fields.join(delimiter));
    return file.join('\n');
}




const $ddc28421fe6d69d0$var$exportTypes = [
    [
        'json',
        $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelExportJSON
    ],
    [
        'csv',
        $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelExportCSV
    ],
    [
        'tsv',
        $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelExportTSV
    ],
    [
        'html',
        $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelExportHTML
    ]
];
function $ddc28421fe6d69d0$var$_DataExportPicker(props2) {
    class __DataExportPicker extends $c5e1961a7f97a459$export$12896e353ebd9cc.react.Component {
        constructor(props1){
            super(props1);
            this.state = this.getInitialState(this.props);
        }
        getInitialState(props) {
            const initialState = {
                initializer: props.initializer,
                dialogHidden: true,
                exportType: $ddc28421fe6d69d0$var$exportTypes[0][0],
                fileName: props.initializer.fileName,
                fileNameError: '',
                working: false
            };
            return initialState;
        }
        componentDidUpdate() {
            if (!$6e437f743d80b3ba$exports.deepCompare(this.props.initializer, this.state.initializer)) this.setState(this.getInitialState(this.props));
        }
        // Converts to dataExport type and calls dataExportHandler to deal with data
        createExport(exportType, displayName) {
            const final = (data)=>{
                this.props.dataExportHandler(data, exportType, displayName);
                this.close();
            };
            const json = JSON.stringify(this.props.data, $ddc28421fe6d69d0$var$columnReplacer);
            switch(exportType){
                case 'json':
                    final(json);
                    break;
                case 'csv':
                    final($81d988802085482c$export$ff3ac2620f930363(JSON.parse(json), ','));
                    break;
                case 'tsv':
                    final($81d988802085482c$export$ff3ac2620f930363(JSON.parse(json), '\t'));
                    break;
                case 'html':
                    {
                        const csv = $81d988802085482c$export$ff3ac2620f930363(JSON.parse(json), ',');
                        const html = $110bef004cdb041f$export$9092658cd6cf7753(`${$d3f49cd4a4ebf638$export$e345c26dc94dc116.appName} - ${escape(displayName)}`, $ddc28421fe6d69d0$var$embedScript(csv, displayName));
                        final(html);
                    }
            }
        }
        close() {
            this.setState({
                dialogHidden: true,
                working: false
            });
        }
        render() {
            const closeDialog = ()=>this.close()
            ;
            if (this.state.delayAction) requestAnimationFrame(()=>{
                //allow render to complete
                if (this.state.delayAction) {
                    this.state.delayAction();
                    this.setState({
                        delayAction: null
                    });
                }
            });
            const disabled = this.state.working || this.state.dialogHidden;
            return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                className: "sanddance-dataExporter"
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DefaultButton, {
                className: "search-action search-bottom-action",
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonExportCount(this.props.data.length),
                onClick: ()=>this.setState({
                        dialogHidden: false
                    })
                ,
                disabled: this.props.disabled
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($3456628043e62c6c$export$d64e687ef4853cae, {
                hidden: this.state.dialogHidden,
                onDismiss: closeDialog,
                dialogContentProps: {
                    className: `sanddance-dialog ${this.props.theme}`,
                    type: $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DialogType.normal,
                    title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelExport
                },
                buttons: [
                    $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.PrimaryButton, {
                        key: 0,
                        disabled: disabled || !!this.state.fileNameError,
                        onClick: (e)=>this.setState({
                                delayAction: ()=>this.createExport(this.state.exportType, this.state.fileName)
                                ,
                                working: true
                            })
                        ,
                        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonExport,
                        iconProps: {
                            iconName: 'Download'
                        }
                    })
                ]
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.TextField, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelExportFileName,
                onChange: (e, displayName)=>{
                    const displayNameError = $ddc28421fe6d69d0$var$getFileNameError(displayName);
                    this.setState({
                        fileName: displayName,
                        fileNameError: displayNameError
                    });
                },
                errorMessage: this.state.fileNameError,
                value: this.state.fileName
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.ChoiceGroup, {
                className: "sanddance-form-separate",
                disabled: disabled,
                options: $ddc28421fe6d69d0$var$exportTypes.map(([exportType, text])=>{
                    return {
                        key: exportType,
                        text: text,
                        disabled: false,
                        checked: exportType === this.state.exportType
                    };
                }),
                onChange: (ev, option)=>this.setState({
                        exportType: option.key
                    })
                ,
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelExportFormat
            })));
        }
    }
    return new __DataExportPicker(props2);
}
const $ddc28421fe6d69d0$export$ca7914cbf553e128 = $ddc28421fe6d69d0$var$_DataExportPicker;
const $ddc28421fe6d69d0$var$illegalChars = '\\/:*?"<>|';
function $ddc28421fe6d69d0$var$getFileNameError(displayName) {
    if (!displayName) return $d3f49cd4a4ebf638$export$e345c26dc94dc116.errorExportFilenameEmpty;
    for(let i = 0; i < $ddc28421fe6d69d0$var$illegalChars.length; i++){
        if (displayName.indexOf($ddc28421fe6d69d0$var$illegalChars[i]) >= 0) return $d3f49cd4a4ebf638$export$e345c26dc94dc116.errorExportFilenameCharacters($ddc28421fe6d69d0$var$illegalChars);
    }
}
function $ddc28421fe6d69d0$export$961ee36a1df3ff5f(fileName) {
    $ddc28421fe6d69d0$var$exportTypes.forEach(([exportType])=>{
        const re = new RegExp(`\\.${exportType}`, 'ig');
        fileName = fileName.replace(re, '');
    });
    return fileName;
}
function $ddc28421fe6d69d0$var$columnReplacer(name, value) {
    if ($385418a87250916e$exports.util.isInternalFieldName(name, true)) return undefined;
    return value === null ? '' : value;
}
function $ddc28421fe6d69d0$var$embedScript(csv, displayName, snapshots) {
    const dataFile = {
        type: 'csv',
        displayName: displayName,
        snapshots: snapshots
    };
    return `<pre id='csv-data' style='display:none'>${csv}</pre>\n    <script>SandDanceEmbed.load(Object.assign({rawText: document.getElementById('csv-data').innerText}, ${JSON.stringify(dataFile)}))</script>`;
}
function $ddc28421fe6d69d0$export$5e624397755a2e0(data, displayName, snapshots) {
    const json = JSON.stringify(data, $ddc28421fe6d69d0$var$columnReplacer);
    const csv = $81d988802085482c$export$ff3ac2620f930363(JSON.parse(json), ',');
    const html = $110bef004cdb041f$export$9092658cd6cf7753(`${$d3f49cd4a4ebf638$export$e345c26dc94dc116.appName} - ${escape(displayName)}`, $ddc28421fe6d69d0$var$embedScript(csv, displayName, snapshots));
    return html;
}








function $53aa18c6dd19d0a6$export$a145e63780346cea(props) {
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: $6e437f743d80b3ba$exports.classList('sanddance-group', props.className)
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "group-head"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("label", null, props.label), props.labelCount && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("span", {
        className: "count"
    }, "(", props.labelCount, ")")), props.children && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "group-body"
    }, props.children));
}






function $f79465ec08338359$export$e5d1b2cb7c0686b6(props) {
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, props.allColumns.map((c, i)=>$c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
            key: c.name
        }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("label", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Toggle, {
            checked: props.exclusions.indexOf(c.name) < 0,
            inlineLabel: true,
            label: c.name,
            onChange: ()=>props.toggleExclusion(c.name)
        })))
    ));
}


var $2b9a71dc82b0fe6b$exports = {};
"use strict";
var $2b9a71dc82b0fe6b$var$__createBinding = $2b9a71dc82b0fe6b$exports && $2b9a71dc82b0fe6b$exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $2b9a71dc82b0fe6b$var$__exportStar = $2b9a71dc82b0fe6b$exports && $2b9a71dc82b0fe6b$exports.__exportStar || function(m, exports) {
    for(var p in m)if (p !== "default" && !exports.hasOwnProperty(p)) $2b9a71dc82b0fe6b$var$__createBinding(exports, m, p);
};
Object.defineProperty($2b9a71dc82b0fe6b$exports, "__esModule", {
    value: true
});
parcelRequire.register("8hrAJ", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.BarChartRecommender = module.exports.BarChartRecommenderSummary = void 0;

var $40Dbu = parcelRequire("40Dbu");
var $6075505e46ea7e3c$var$maxDistinctVal = 20;
var $6075505e46ea7e3c$var$minDistinctVal = 2;
var $6075505e46ea7e3c$var$BarChartRecommenderSummary = function() {
    function BarChartRecommenderSummary(columns, data) {
        var score = -1;
        for(var i = 0; i < columns.length; i++){
            var recommendation = new $6075505e46ea7e3c$var$BarChartRecommender(columns[i], data).recommend();
            if (recommendation.score > score) {
                this.best = recommendation;
                score = recommendation.score;
            }
            if (score === 1) break;
        }
        for(var k = 0; k < columns.length; k++){
            var column = columns[k];
            if (column.name === this.best.columns.x || column.stats.isSequential) continue;
            if (column.quantitative || column.stats.distinctValueCount < $40Dbu.maxCategoricalColors && column.stats.distinctValueCount > 1) {
                this.best.columns.color = this.best.columns.sort = column.name;
                this.best.scheme = $40Dbu.defaultColorScheme(column);
                if (column.quantitative) this.best.colorBin = 'quantile';
                break;
            }
        }
    }
    BarChartRecommenderSummary.prototype.recommend = function() {
        return this.best;
    };
    return BarChartRecommenderSummary;
}();
module.exports.BarChartRecommenderSummary = $6075505e46ea7e3c$var$BarChartRecommenderSummary;
var $6075505e46ea7e3c$var$BarChartRecommender = function() {
    function BarChartRecommender(column, data) {
        this.score = 0;
        this.column = column;
        //the total score for bar chart is 1
        this.rules = [
            function(column1) {
                if (column1.stats.isSequential) return false;
                else if (column1.quantitative) return true;
                else if (!column1.quantitative && column1.stats.distinctValueCount <= $6075505e46ea7e3c$var$maxDistinctVal && column1.stats.distinctValueCount >= $6075505e46ea7e3c$var$minDistinctVal) return true;
                else return false;
            }
        ];
        for(var i = 0; i < this.rules.length; i++)if (this.rules[i](column)) this.score++;
    }
    BarChartRecommender.prototype.recommend = function() {
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
}();
module.exports.BarChartRecommender = $6075505e46ea7e3c$var$BarChartRecommender;

});
parcelRequire.register("40Dbu", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.defaultColorScheme = module.exports.Recommender = module.exports.maxCategoricalColors = void 0;
module.exports.maxCategoricalColors = 20;
var $2eb58eb905ff9786$var$Recommender = function() {
    function Recommender(columns, data) {
    }
    return Recommender;
}();
module.exports.Recommender = $2eb58eb905ff9786$var$Recommender;
function $2eb58eb905ff9786$var$defaultColorScheme(c) {
    if (c.quantitative) return 'redyellowgreen';
    else if (c.stats.distinctValueCount === 2) return 'dual_redgreen';
    else if (c.stats.distinctValueCount <= 10) return 'category10';
    return 'category20';
}
module.exports.defaultColorScheme = $2eb58eb905ff9786$var$defaultColorScheme;

});



// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
$2b9a71dc82b0fe6b$var$__exportStar((parcelRequire("8hrAJ")), $2b9a71dc82b0fe6b$exports);
parcelRequire.register("hD4wO", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.isGeo = module.exports.isLatitude = module.exports.isLongitude = void 0;
//TODO: languages other than english
var $cd59976b16f6cedb$var$longitudeNames = [
    'lon',
    'long',
    'longitude'
];
var $cd59976b16f6cedb$var$latitudeNames = [
    'lat',
    'latitude'
];
function $cd59976b16f6cedb$var$isSpec(names, limits, column, data) {
    var is = false;
    var cname = column.name.toLowerCase();
    for(var i = 0; i < names.length; i++)if (names[i] === cname) {
        is = true;
        break;
    }
    return is;
}
function $cd59976b16f6cedb$var$isLongitude(column, data) {
    return $cd59976b16f6cedb$var$isSpec($cd59976b16f6cedb$var$longitudeNames, [
        -180,
        180
    ], column, data);
}
module.exports.isLongitude = $cd59976b16f6cedb$var$isLongitude;
function $cd59976b16f6cedb$var$isLatitude(column, data) {
    return $cd59976b16f6cedb$var$isSpec($cd59976b16f6cedb$var$latitudeNames, [
        -90,
        90
    ], column, data);
}
module.exports.isLatitude = $cd59976b16f6cedb$var$isLatitude;
function $cd59976b16f6cedb$var$isGeo(column, data) {
    return $cd59976b16f6cedb$var$isLatitude(column, data) || $cd59976b16f6cedb$var$isLongitude(column, data);
}
module.exports.isGeo = $cd59976b16f6cedb$var$isGeo;

});


$2b9a71dc82b0fe6b$var$__exportStar((parcelRequire("hD4wO")), $2b9a71dc82b0fe6b$exports);
parcelRequire.register("6xy8I", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.ScatterPlotRecommenderSummary = void 0;

var $40Dbu = parcelRequire("40Dbu");

var $hD4wO = parcelRequire("hD4wO");
var $4c304e8d3e975fa8$var$ScatterPlotRecommenderSummary = function() {
    function ScatterPlotRecommenderSummary(columns, data) {
        var rec = {
            chart: 'scatterplot',
            score: undefined,
            columns: {
            },
            scheme: undefined,
            view: '2d'
        };
        columns.forEach(function(column) {
            if (!rec.columns.x) {
                if (column.name.toLowerCase() === 'x') return rec.columns.x = column.name;
                else if ($hD4wO.isLongitude(column)) return rec.columns.x = column.name;
            }
            if (!rec.columns.y) {
                if (column.name.toLowerCase() === 'y') return rec.columns.y = column.name;
                else if ($hD4wO.isLatitude(column)) return rec.columns.y = column.name;
            }
            if (!rec.columns.color && !column.stats.isSequential) {
                if (column.quantitative || column.stats.distinctValueCount < $40Dbu.maxCategoricalColors) {
                    rec.columns.color = rec.columns.sort = column.name;
                    rec.scheme = $40Dbu.defaultColorScheme(column);
                    if (column.quantitative) rec.colorBin = 'quantile';
                    return;
                }
            }
        });
        if (rec.columns.x && rec.columns.y) this.best = rec;
    }
    ScatterPlotRecommenderSummary.prototype.recommend = function() {
        return this.best;
    };
    return ScatterPlotRecommenderSummary;
}();
module.exports.ScatterPlotRecommenderSummary = $4c304e8d3e975fa8$var$ScatterPlotRecommenderSummary;

});


$2b9a71dc82b0fe6b$var$__exportStar((parcelRequire("6xy8I")), $2b9a71dc82b0fe6b$exports);
parcelRequire.register("jhH8Q", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.preferredColumnForTreemapSize = void 0;

var $hD4wO = parcelRequire("hD4wO");
function $e0a111de191627d0$var$preferredColumnForTreemapSize(columns, strict) {
    for(var i = 0; i < columns.length; i++){
        var c = columns[i];
        if (c.quantitative) {
            if (strict && c.stats.hasNegative) continue;
            if (strict && c.stats.isSequential) continue;
            if (strict && $hD4wO.isGeo(c)) continue;
            return c;
        }
    }
}
module.exports.preferredColumnForTreemapSize = $e0a111de191627d0$var$preferredColumnForTreemapSize;

});


$2b9a71dc82b0fe6b$var$__exportStar((parcelRequire("jhH8Q")), $2b9a71dc82b0fe6b$exports);
parcelRequire.register("ltoGO", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.RecommenderSummary = void 0;

var $8hrAJ = parcelRequire("8hrAJ");

var $6xy8I = parcelRequire("6xy8I");
var $fa1f753c48ca826c$var$RecommenderSummary = function() {
    function RecommenderSummary(columns, data) {
        var quickRec = new $6xy8I.ScatterPlotRecommenderSummary(columns, data).recommend();
        if (quickRec) this.rec = quickRec;
        else {
            var barChartrec = new $8hrAJ.BarChartRecommenderSummary(columns, data).recommend();
            if (barChartrec && barChartrec.score >= 1) this.rec = barChartrec;
            else this.rec = {
                chart: 'grid',
                columns: {
                },
                score: 1
            };
        }
    }
    RecommenderSummary.prototype.recommend = function() {
        return this.rec;
    };
    return RecommenderSummary;
}();
module.exports.RecommenderSummary = $fa1f753c48ca826c$var$RecommenderSummary;

});


$2b9a71dc82b0fe6b$var$__exportStar((parcelRequire("ltoGO")), $2b9a71dc82b0fe6b$exports);




function $3c7c0ab0b51acc22$export$d3f158f2cefb2dd8(insightColumns, actualColumns, transform) {
    //ensure columns exist
    for(let role in insightColumns){
        let columnName = insightColumns[role];
        let column = actualColumns.filter((c)=>c.name === columnName
        )[0];
        let transformColumn = transform ? transform.filter((t)=>{
            switch(t.type){
                case 'formula':
                    return t.as === columnName;
            }
        })[0] : null;
        if (!(column || transformColumn)) delete insightColumns[role];
    }
}
function $3c7c0ab0b51acc22$export$3285e8a72d4ef75f(chart, totalStyle, insightColumns, actualColumns) {
    //ensure columns are populated
    const nonInternal = actualColumns.filter((c)=>!$385418a87250916e$exports.util.isInternalFieldName(c.name)
    );
    const firstColumn = nonInternal[0];
    const firstColumnName = firstColumn && firstColumn.name;
    const firstQuantitative = nonInternal.filter((c)=>c.quantitative
    )[0];
    const firstQuantitativeColumnName = firstQuantitative && firstQuantitative.name;
    const ensureColumn = (role, quantitative, treemap)=>{
        if (!insightColumns[role]) {
            if (treemap) insightColumns[role] = $3c7c0ab0b51acc22$export$22e2b85518a07a7(actualColumns).name;
            else insightColumns[role] = quantitative ? firstQuantitativeColumnName : firstColumnName;
        }
    };
    function checkRequiresSize() {
        switch(totalStyle){
            case 'sum-strip':
            case 'sum-strip-percent':
                ensureColumn('size', true);
                break;
            case 'sum-treemap':
                ensureColumn('size', true, true);
                break;
        }
    }
    switch(chart){
        case 'barchart':
        case 'barchartV':
            ensureColumn('x');
            checkRequiresSize();
            break;
        case 'barchartH':
            ensureColumn('y');
            checkRequiresSize();
            break;
        case 'density':
            ensureColumn('x');
            ensureColumn('y');
            checkRequiresSize();
            break;
        case 'scatterplot':
        case 'stacks':
            ensureColumn('x');
            ensureColumn('y');
            break;
        case 'treemap':
            if (!insightColumns.size) insightColumns.size = $3c7c0ab0b51acc22$export$22e2b85518a07a7(actualColumns).name;
            if (!insightColumns.size) //error - no numeric column
            return [
                $d3f49cd4a4ebf638$export$e345c26dc94dc116.errorColumnMustBeNumeric
            ];
            break;
    }
}
function $3c7c0ab0b51acc22$export$22e2b85518a07a7(columns) {
    let column = $2b9a71dc82b0fe6b$exports.preferredColumnForTreemapSize(columns, true);
    if (!column) column = $2b9a71dc82b0fe6b$exports.preferredColumnForTreemapSize(columns, false);
    return column;
}


const $1d75e5ac49b64589$var$singleFacetLayouts = [
    {
        facetStyle: 'wrap',
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelFacetLayoutWrap
    }, 
];
const $1d75e5ac49b64589$export$bce7562fc7020019 = [
    {
        key: 'grid',
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.chartTypeGrid
    },
    {
        key: 'scatterplot',
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.chartTypeScatterPlot
    },
    {
        key: 'density',
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.chartTypeDensity
    },
    {
        key: 'barchartV',
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.chartTypeBarChartV
    },
    {
        key: 'barchartH',
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.chartTypeBarChartH
    },
    {
        key: 'treemap',
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.chartTypeTreeMap
    },
    {
        key: 'strips',
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.chartTypeStrips
    },
    {
        key: 'stacks',
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.chartTypeStacks
    }
];
function $1d75e5ac49b64589$export$3b8610020cb45508(key) {
    for(let i = 0; i < $1d75e5ac49b64589$export$bce7562fc7020019.length; i++){
        if (key === $1d75e5ac49b64589$export$bce7562fc7020019[i].key) return $1d75e5ac49b64589$export$bce7562fc7020019[i].text;
    }
}
function $1d75e5ac49b64589$var$_Chart(props) {
    class __Chart extends $c5e1961a7f97a459$export$12896e353ebd9cc.react.Component {
        constructor(props1){
            super(props1);
            this.state = {
                showTooltipDialog: false
            };
        }
        render() {
            const { props: props2  } = this;
            const { explorer: explorer , specCapabilities: specCapabilities  } = props2;
            const signals = explorer.viewer && explorer.viewer.vegaSpec && specCapabilities && specCapabilities.signals && explorer.viewer.vegaSpec.signals.filter((s)=>specCapabilities.signals.indexOf(s.name) >= 0
            );
            return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelChart
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                className: "calculator"
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.ChoiceGroup, {
                className: "sanddance-chart-type",
                options: $1d75e5ac49b64589$export$bce7562fc7020019.map((o)=>{
                    return Object.assign(Object.assign({
                    }, o), {
                        checked: props2.chart === o.key,
                        disabled: props2.disabled || o.key === 'treemap' && props2.quantitativeColumns.length === 0
                    });
                }),
                onChange: (e, o)=>props2.onChangeChartType(o.key)
            }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColumnMapping
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, specCapabilities && specCapabilities.roles.map((specRole, i)=>{
                const specColumnInRole = props2.insightColumns[specRole.role];
                const selectedColumnName = specColumnInRole;
                let disabledColumnName;
                let prefix;
                let suffix;
                let hideDropdown = false;
                let { totalStyle: totalStyle  } = props2;
                if (!totalStyle) totalStyle = 'count-square';
                let { facetStyle: facetStyle  } = props2;
                if (!facetStyle) facetStyle = 'wrap';
                switch(specRole.role){
                    case 'facet':
                        suffix = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($6b702e1ad8ceb63e$export$30a13326eaae8e00, {
                            disabled: !props2.insightColumns.facet,
                            collapseLabel: props2.collapseLabels,
                            label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelFacetLayout,
                            calloutProps: {
                                style: {
                                    minWidth: '18em'
                                }
                            },
                            options: [
                                {
                                    key: 'header1',
                                    text: `${$d3f49cd4a4ebf638$export$e345c26dc94dc116.labelFacetLayout}:`,
                                    itemType: $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DropdownMenuItemType.Header
                                },
                                ...$1d75e5ac49b64589$var$singleFacetLayouts.map((f)=>{
                                    const o = {
                                        key: f.facetStyle,
                                        text: f.text,
                                        data: f,
                                        selected: facetStyle === f.facetStyle
                                    };
                                    return o;
                                }),
                                {
                                    key: 'divider',
                                    text: '-',
                                    itemType: $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DropdownMenuItemType.Divider
                                },
                                {
                                    key: 'header2',
                                    text: `${$d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColumnFacetV}:`,
                                    itemType: $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DropdownMenuItemType.Header
                                },
                                ...$d359193c5ab9f387$export$6c7e7b0bee245ba4(Object.assign(Object.assign({
                                }, props2), {
                                    specRole: specRole,
                                    selectedColumnName: props2.insightColumns.facetV
                                })).map((o)=>{
                                    if (o.itemType !== $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DropdownMenuItemType.Header) {
                                        const facetData = {
                                            facetStyle: 'cross',
                                            column: o.data
                                        };
                                        o.data = facetData;
                                        o.text = `${$d3f49cd4a4ebf638$export$e345c26dc94dc116.labelFacetLayoutCross} ${o.text}`;
                                    }
                                    return o;
                                })
                            ],
                            onChange: (e, o)=>{
                                const facetData = o.data;
                                props2.changeColumnMapping('facet', 'facet', null, {
                                    facetStyle: facetData.facetStyle
                                });
                                if (facetData.facetStyle === 'cross') props2.changeColumnMapping('facetV', $385418a87250916e$exports.VegaDeckGl.util.clone(facetData.column));
                            }
                        });
                        break;
                    case 'facetV':
                        hideDropdown = true;
                        break;
                    case 'size':
                        {
                            const options = [
                                {
                                    key: 'count-square',
                                    text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTotalByCountSquare,
                                    data: 'count-square',
                                    selected: !totalStyle || totalStyle === 'count-square'
                                },
                                {
                                    key: 'count-strip',
                                    text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTotalByCountStrip,
                                    data: 'count-strip',
                                    selected: totalStyle === 'count-strip'
                                },
                                {
                                    key: 'sum-strip',
                                    text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTotalBySumStrip,
                                    data: 'sum-strip',
                                    selected: totalStyle === 'sum-strip'
                                },
                                {
                                    key: 'sum-treemap',
                                    text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTotalBySumTreemap,
                                    data: 'sum-treemap',
                                    selected: totalStyle === 'sum-treemap',
                                    disabled: props2.quantitativeColumns.length === 0
                                }
                            ];
                            if (specCapabilities.percentage) options.push({
                                key: 'sum-strip-percent',
                                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTotalBySumStripPercent,
                                data: 'sum-strip-percent',
                                selected: totalStyle === 'sum-strip-percent',
                                disabled: props2.quantitativeColumns.length === 0
                            });
                            prefix = !specCapabilities.countsAndSums ? null : $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($6b702e1ad8ceb63e$export$30a13326eaae8e00, {
                                collapseLabel: props2.collapseLabels,
                                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTotal,
                                calloutProps: {
                                    style: {
                                        minWidth: '18em'
                                    }
                                },
                                options: options,
                                onChange: (e, o)=>{
                                    const totalStyle1 = o.data;
                                    let defaultColumn;
                                    if (totalStyle1.indexOf('sum-') === 0) {
                                        if (totalStyle1 === 'sum-treemap') defaultColumn = $3c7c0ab0b51acc22$export$22e2b85518a07a7(props2.allColumns);
                                        defaultColumn = defaultColumn || props2.quantitativeColumns[0];
                                    }
                                    props2.changeColumnMapping('size', 'size', defaultColumn, {
                                        totalStyle: totalStyle1
                                    });
                                }
                            });
                            break;
                        }
                }
                let disabled = props2.disabled || props2.view === '2d' && specRole.role === 'z' || specRole.role === 'size' && !(!specCapabilities.countsAndSums || totalStyle.indexOf('sum-') === 0) || specRole.role === 'sort' && specCapabilities.countsAndSums && totalStyle === 'sum-treemap';
                return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($d359193c5ab9f387$export$ac5b76d1f02dd063, Object.assign({
                }, props2, {
                    prefix: prefix,
                    suffix: suffix,
                    collapseLabel: props2.collapseLabels,
                    disabled: disabled,
                    disabledColumnName: disabledColumnName,
                    selectedColumnName: selectedColumnName,
                    specRole: specRole,
                    key: i,
                    onChangeSignal: (name, value)=>props2.onChangeSignal(specRole.role, selectedColumnName, name, value)
                    ,
                    hideDropdown: hideDropdown
                }));
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                className: "sanddance-tooltipMap"
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DefaultButton, {
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonTooltipMapping,
                onClick: ()=>this.setState({
                        showTooltipDialog: true
                    })
            })))), signals && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelChartTypeOptions
            }, signals.map((signal, i)=>$c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($9339840789a2dc56$export$50478d543b96dfd6, {
                    key: i,
                    signal: signal,
                    explorer: explorer,
                    disabled: props2.disabled || this.disableSignal(signal),
                    collapseLabel: props2.collapseLabels,
                    newViewStateTarget: false
                })
            )), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($3456628043e62c6c$export$d64e687ef4853cae, {
                hidden: !this.state.showTooltipDialog,
                onDismiss: ()=>this.setState({
                        showTooltipDialog: false
                    })
                ,
                title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTooltipMapping
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($f79465ec08338359$export$e5d1b2cb7c0686b6, {
                allColumns: props2.allColumns,
                exclusions: props2.tooltipExclusions,
                toggleExclusion: props2.toggleTooltipExclusion
            })));
        }
        disableSignal(signal) {
            if (this.props.view === '2d' && signal.name === $385418a87250916e$exports.constants.SignalNames.ZGrounded) return true;
            return false;
        }
    }
    return new __Chart(props);
}
const $1d75e5ac49b64589$export$7decb792461ef5a9 = $1d75e5ac49b64589$var$_Chart;




function $70c33290fecfafcc$export$ccae1084348bcd5f(props) {
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.TextField, Object.assign({
        onKeyUp: (e)=>{
            e.nativeEvent.stopImmediatePropagation();
        }
    }, props));
}




const $f67b40470923e296$export$b4c3884e0757dcc5 = 100;
function $f67b40470923e296$export$7d9a0eec58b2266a(column) {
    const type = column && column.type;
    switch(type){
        case 'boolean':
            return [
                [
                    '==',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchEQ
                ],
                [
                    '!=',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchNEQ
                ],
                [
                    'isnullorEmpty',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchNULL
                ]
            ];
        case 'date':
        case 'integer':
        case 'number':
            return [
                [
                    '==',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchEQ
                ],
                [
                    '!=',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchNEQ
                ],
                [
                    '>',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchGT
                ],
                [
                    '>=',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchGTE
                ],
                [
                    '<',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchLT
                ],
                [
                    '<=',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchLTE
                ],
                [
                    'isnullorEmpty',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchNULL
                ]
            ];
        case 'string':
        default:
            return [
                [
                    '==',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchEQ
                ],
                [
                    '!=',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchNEQ
                ],
                [
                    '>',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchGT
                ],
                [
                    '>=',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchGTE
                ],
                [
                    '<',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchLT
                ],
                [
                    '<=',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchLTE
                ],
                [
                    'contains',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchIN
                ],
                [
                    'starts',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchSW
                ],
                [
                    'isnullorEmpty',
                    $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchNULL
                ]
            ];
    }
}
function $f67b40470923e296$var$getExpressionClauses(currClause, disableOR) {
    const keys = [
        [
            '&&',
            $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchAND
        ]
    ];
    if (!disableOR) keys.push([
        '||',
        $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchOR
    ]);
    return keys.map((key, i)=>{
        const [clause, text] = key;
        const selected = currClause == clause; //deliberate double equal 
        const option = {
            key: i,
            text: text,
            data: clause,
            selected: selected
        };
        return option;
    });
}
function $f67b40470923e296$var$getOperators(ex, column) {
    let anySelected = false;
    const validOperators = $f67b40470923e296$export$7d9a0eec58b2266a(column);
    const options = validOperators.map((validoperator)=>{
        const [op, text] = validoperator;
        const selected = ex.operator === op;
        anySelected = anySelected || selected;
        const option = {
            key: op,
            text: text,
            data: op,
            selected: selected
        };
        return option;
    });
    if (!anySelected) options[0].selected = true;
    return options;
}
function $f67b40470923e296$var$getDistinctValues(data, columnName) {
    const distinctMap = {
    };
    for(let i = 0; i < data.length; i++){
        let row = data[i];
        let value = row[columnName];
        distinctMap[value] = true;
    }
    return Object.keys(distinctMap).sort();
}
function $f67b40470923e296$var$getValues(ex, column, data, autoCompleteDistinctValues) {
    const stats = column && column.stats;
    if (stats && stats.distinctValueCount < $f67b40470923e296$export$b4c3884e0757dcc5) {
        if (!autoCompleteDistinctValues[column.name]) autoCompleteDistinctValues[column.name] = $f67b40470923e296$var$getDistinctValues(data, column.name);
        return autoCompleteDistinctValues[column.name].map((v, i)=>({
                key: i,
                text: v
            })
        );
    }
    return [];
}
function $f67b40470923e296$export$f20788672c44c8e(ex) {
    if (ex.operator === 'isnullorEmpty') return '';
    return typeof ex.value === 'string' ? ex.value : ex.value == null ? '' : ex.value.toString();
}
function $f67b40470923e296$export$ce56e60ad72f30(props) {
    const ex = props.searchExpression;
    const possibleValues = $f67b40470923e296$var$getValues(ex, props.column, props.data, props.autoCompleteDistinctValues);
    //TODO better date handling with calendar picker
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, props.index > 0 && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($6b702e1ad8ceb63e$export$30a13326eaae8e00, {
        collapseLabel: props.collapseLabels,
        className: "search-field",
        label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSearchClause,
        dropdownWidth: 120,
        disabled: !ex.unlocked || props.disableOR,
        options: $f67b40470923e296$var$getExpressionClauses(ex.clause, props.disableOR),
        onChange: (e, o)=>props.onUpdateExpression({
                clause: o.data
            }, props.index)
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($6b702e1ad8ceb63e$export$30a13326eaae8e00, {
        collapseLabel: props.collapseLabels,
        className: "search-field",
        label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSearchColumn,
        options: [
            {
                key: '',
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectAny,
                data: null,
                selected: ex.name === null
            }
        ].concat(props.columns.map((c, i)=>({
                key: c.name,
                text: c.name,
                data: c,
                selected: c.name === ex.name
            })
        )),
        onChange: (e, o)=>props.onUpdateExpression({
                name: o.data && o.data.name || null
            }, props.index)
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($6b702e1ad8ceb63e$export$30a13326eaae8e00, {
        collapseLabel: props.collapseLabels,
        className: "search-field",
        label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSearchOperator,
        dropdownWidth: 120,
        options: $f67b40470923e296$var$getOperators(ex, props.column),
        onChange: (e, o)=>props.onUpdateExpression({
                operator: o.data
            }, props.index)
    }), possibleValues.length > 0 && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.ComboBox, {
        className: "search-field",
        label: props.collapseLabels ? null : $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSearchValue,
        placeholder: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSearchValuePlaceholder,
        disabled: ex.operator === 'isnullorEmpty',
        dropdownWidth: $6b702e1ad8ceb63e$export$afadbaa7ce934629,
        allowFreeform: true,
        autoComplete: "on",
        errorMessage: ex.errorMessage,
        text: $f67b40470923e296$export$f20788672c44c8e(ex),
        options: $f67b40470923e296$var$getValues(ex, props.column, props.data, props.autoCompleteDistinctValues),
        onChange: (e, o, i, value)=>{
            if (o) value = o.text;
            props.onUpdateExpression({
                value: value
            }, props.index);
        }
    }), possibleValues.length === 0 && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($70c33290fecfafcc$export$ccae1084348bcd5f, {
        className: "search-field",
        label: props.collapseLabels ? null : $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSearchValue,
        placeholder: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSearchValuePlaceholder,
        disabled: ex.operator === 'isnullorEmpty',
        errorMessage: ex.errorMessage,
        value: $f67b40470923e296$export$f20788672c44c8e(ex),
        onChange: (e, v)=>props.onUpdateExpression({
                value: v
            }, props.index)
    }));
}




function $a4f65425c8c706b4$export$3e142902fa56c5af(props) {
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DefaultButton, Object.assign({
    }, props, {
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






const $db7ca2292e5ff554$var$maxClauses = 5;
function $db7ca2292e5ff554$var$getColumnWithName(columnName, columns) {
    for(var i = 0; i < columns.length; i++){
        if (columns[i].name === columnName) return columns[i];
    }
}
function $db7ca2292e5ff554$var$validateExpression(ex) {
    if (ex.operator === 'isnullorEmpty') {
        ex.errorMessage = null;
        return;
    }
    const s = $f67b40470923e296$export$f20788672c44c8e(ex);
    if (s.length === 0) ex.errorMessage = $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelRequired;
    else ex.errorMessage = null;
}
function $db7ca2292e5ff554$var$clearExpressionValidation(ex) {
    if (ex.operator === 'isnullorEmpty') {
        ex.errorMessage = null;
        return;
    }
    const s = $f67b40470923e296$export$f20788672c44c8e(ex);
    if (s.length !== 0) ex.errorMessage = null;
}
function $db7ca2292e5ff554$var$getGroupClauses(currClause, index, disableGroupOR) {
    let keys;
    if (index === 0) keys = [
        [
            null,
            $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchWHERE
        ]
    ];
    else {
        keys = [
            [
                '&&',
                $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchAND
            ]
        ];
        if (!disableGroupOR) keys.push([
            '||',
            $d3f49cd4a4ebf638$export$e345c26dc94dc116.searchOR
        ]);
    }
    return keys.map((key, i)=>{
        const [clause, text] = key;
        const selected = currClause == clause; //deliberate double equal 
        const option = {
            key: i,
            text: text,
            data: clause,
            selected: selected
        };
        return option;
    });
}
function $db7ca2292e5ff554$var$_Search(props2) {
    class __Search extends $c5e1961a7f97a459$export$12896e353ebd9cc.react.Component {
        constructor(props1){
            super(props1);
            this.state = this.getInitialState(this.props);
        }
        getInitialState(props) {
            const initialState = {
                groups: props.initializer.search || [
                    this.newGroup(0, null)
                ],
                sortedColumns: [
                    ...props.initializer.columns
                ].sort((a, b)=>a.name.localeCompare(b.name)
                ),
                initializer: props.initializer
            };
            initialState.groups.forEach((group)=>{
                group.expressions.forEach((ex)=>ex.unlocked = group.expressions.length <= 2
                );
            });
            return initialState;
        }
        componentDidUpdate() {
            if (!$6e437f743d80b3ba$exports.deepCompare(this.props.initializer, this.state.initializer)) this.setState(this.getInitialState(this.props));
        }
        validateAndSearch() {
            const groups = [
                ...this.state.groups
            ];
            groups.forEach((group)=>{
                group.expressions.forEach($db7ca2292e5ff554$var$validateExpression);
                const errors = group.expressions.reduce((p, c)=>p || c.errorMessage
                , '');
                if (errors) this.setState({
                    groups: groups
                });
                else this.props.onSelect(this.state.groups);
            });
        }
        newGroup(key, clause) {
            const group = {
                key: key,
                clause: clause,
                expressions: [
                    this.newExpression(0, null)
                ]
            };
            return group;
        }
        updateGroup(partialGroup, groupIndex) {
            const groups = [
                ...this.state.groups
            ];
            const group = Object.assign(Object.assign({
            }, groups[groupIndex]), partialGroup);
            groups[groupIndex] = group;
            this.setState({
                groups: groups
            });
        }
        addGroup() {
            const groups = [
                ...this.state.groups
            ];
            const maxKey = groups.reduce((max, p)=>p.key > max ? p.key : max
            , groups[0].key);
            const newGroup = this.newGroup(maxKey + 1, '&&');
            groups.push(newGroup);
            this.setState({
                groups: groups
            });
        }
        deleteGroup(groupIndex) {
            const groups = [
                ...this.state.groups
            ];
            groups.splice(groupIndex, 1);
            this.setState({
                groups: groups
            });
        }
        newExpression(key, clause) {
            const ex = {
                key: key,
                clause: clause,
                name: null,
                operator: 'contains',
                value: ''
            };
            return ex;
        }
        addExpression(groupIndex) {
            const groups = [
                ...this.state.groups
            ];
            const group = groups[groupIndex];
            const maxKey = group.expressions.reduce((max, p)=>p.key > max ? p.key : max
            , group.expressions[0].key);
            const newEx = this.newExpression(maxKey + 1, '&&');
            group.expressions.push(newEx);
            if (group.expressions.length === 2) newEx.unlocked = true;
            else {
                group.expressions.forEach((ex)=>ex.unlocked = false
                );
                newEx.clause = group.expressions[1].clause;
            }
            this.setState({
                groups: groups
            });
        }
        updateExpression(partialEx, groupIndex, index) {
            const groups = [
                ...this.state.groups
            ];
            const group = groups[groupIndex];
            const ex = $385418a87250916e$exports.VegaDeckGl.util.clone(group.expressions[index]);
            if (ex.name !== partialEx.name) {
                //choose an appropriate operator when switching data type
                const oldColumn = $db7ca2292e5ff554$var$getColumnWithName(ex.name, this.state.sortedColumns);
                const newColumn = $db7ca2292e5ff554$var$getColumnWithName(partialEx.name, this.state.sortedColumns);
                const oldType = oldColumn && oldColumn.type;
                const newType = newColumn && newColumn.type;
                if (oldType !== newType) {
                    const newOperators = $f67b40470923e296$export$7d9a0eec58b2266a(newColumn).map((validOperator)=>validOperator[0]
                    );
                    //see if old operator is compatible
                    if (newOperators.indexOf(ex.operator) < 0) //not compatible, so choose "equal"
                    partialEx.operator = '==';
                }
            }
            Object.assign(ex, partialEx);
            $db7ca2292e5ff554$var$clearExpressionValidation(ex);
            group.expressions[index] = ex;
            this.setState({
                groups: groups
            });
        }
        deleteExpression(groupIndex, index) {
            const groups = [
                ...this.state.groups
            ];
            const group = groups[groupIndex];
            const expressions = [
                ...group.expressions
            ];
            expressions.splice(index, 1);
            if (expressions.length === 2) expressions[1].unlocked = true;
            group.expressions = expressions;
            this.setState({
                groups: groups
            });
        }
        render() {
            return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
                className: "sanddance-search",
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSearch
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, this.state.groups.map((group, groupIndex)=>$c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                    className: "sanddance-search-group",
                    key: group.key
                }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($6b702e1ad8ceb63e$export$30a13326eaae8e00, {
                    collapseLabel: this.props.collapseLabels,
                    className: "search-group-clause",
                    label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSearchClause,
                    disabled: groupIndex === 0 || this.props.disableGroupOR,
                    dropdownWidth: 120,
                    options: $db7ca2292e5ff554$var$getGroupClauses(group.clause, groupIndex, this.props.disableGroupOR),
                    onChange: (e, o)=>this.updateGroup({
                            clause: o.data
                        }, groupIndex)
                }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, group.expressions.map((ex, i)=>$c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                        className: "sanddance-search-expression",
                        key: ex.key
                    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($f67b40470923e296$export$ce56e60ad72f30, {
                        collapseLabels: this.props.collapseLabels,
                        onUpdateExpression: (ex1, i1)=>this.updateExpression(ex1, groupIndex, i1)
                        ,
                        autoCompleteDistinctValues: this.props.autoCompleteDistinctValues,
                        index: i,
                        columns: this.state.sortedColumns,
                        data: this.props.data,
                        searchExpression: ex,
                        disableOR: this.props.disableExpressionOR,
                        column: $db7ca2292e5ff554$var$getColumnWithName(ex.name, this.state.sortedColumns)
                    }), group.expressions.length > 1 && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($a4f65425c8c706b4$export$3e142902fa56c5af, {
                        themePalette: this.props.themePalette,
                        className: "search-action",
                        iconName: "Cancel",
                        onClick: ()=>this.deleteExpression(groupIndex, i)
                        ,
                        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonDeleteExpression
                    }))
                )), group.expressions.length < $db7ca2292e5ff554$var$maxClauses && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($a4f65425c8c706b4$export$3e142902fa56c5af, {
                    themePalette: this.props.themePalette,
                    className: "search-action",
                    iconName: "Add",
                    onClick: ()=>this.addExpression(groupIndex)
                    ,
                    text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonAddExpression
                })), this.state.groups.length > 1 && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($a4f65425c8c706b4$export$3e142902fa56c5af, {
                    themePalette: this.props.themePalette,
                    className: "search-action",
                    iconName: "Cancel",
                    onClick: ()=>this.deleteGroup(groupIndex)
                    ,
                    text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonDeleteExpressionGroup
                }))
            ), this.state.groups.length < $db7ca2292e5ff554$var$maxClauses && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($a4f65425c8c706b4$export$3e142902fa56c5af, {
                themePalette: this.props.themePalette,
                className: "search-action search-bottom-action",
                iconName: "Add",
                onClick: ()=>this.addGroup()
                ,
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonAddExpressionGroup
            }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.PrimaryButton, {
                className: "search-action search-bottom-action",
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonSelect,
                onClick: ()=>this.validateAndSearch()
            }));
        }
    }
    return new __Search(props2);
}
const $db7ca2292e5ff554$export$59dc79d25800130f = $db7ca2292e5ff554$var$_Search;





var $3669ee32f5f0d5ff$var$PresenterElement = $385418a87250916e$exports.VegaDeckGl.PresenterElement;
function $3669ee32f5f0d5ff$export$6d478d95e4214fb3(viewer) {
    var tags = viewer.presenter.getElement($3669ee32f5f0d5ff$var$PresenterElement.gl).getElementsByTagName('canvas');
    if (tags) return tags[0];
}
function $3669ee32f5f0d5ff$export$143b1ce3525ff2(viewer) {
    var canvas = $3669ee32f5f0d5ff$export$6d478d95e4214fb3(viewer);
    if (canvas) canvas.tabIndex = -1;
}
const $3669ee32f5f0d5ff$export$33f60a5e15d39c82 = {
    webgl: !!document.createElement('canvas').getContext('webgl'),
    webgl2: !!document.createElement('canvas').getContext('webgl2')
};







const $211e3c3b38323927$export$aef83baa0e7093df = '3.2.0';


var $c8349196cda2bdc1$var$SandDance = $385418a87250916e$exports;
var $c8349196cda2bdc1$var$DataRefType;
(function(DataRefType) {
    DataRefType[DataRefType["none"] = 0] = "none";
    DataRefType[DataRefType["inline"] = 1] = "inline";
    DataRefType[DataRefType["url"] = 2] = "url";
})($c8349196cda2bdc1$var$DataRefType || ($c8349196cda2bdc1$var$DataRefType = {
}));
function $c8349196cda2bdc1$var$filterSignals(signal) {
    switch(signal.name){
        case $c8349196cda2bdc1$var$SandDance.constants.SignalNames.XBins:
        case $c8349196cda2bdc1$var$SandDance.constants.SignalNames.YBins:
        case $c8349196cda2bdc1$var$SandDance.constants.SignalNames.FacetBins:
        case $c8349196cda2bdc1$var$SandDance.constants.SignalNames.FacetVBins:
        case $c8349196cda2bdc1$var$SandDance.constants.SignalNames.ColorBinCount:
        case $c8349196cda2bdc1$var$SandDance.constants.SignalNames.ColorReverse:
        case $c8349196cda2bdc1$var$SandDance.constants.SignalNames.PointScale:
        case $c8349196cda2bdc1$var$SandDance.constants.SignalNames.TreeMapMethod:
            return false;
        default:
            return !!signal.bind;
    }
}
function $c8349196cda2bdc1$var$cloneData(vegaSpec) {
    const data0 = vegaSpec.data[0];
    const valuesData = data0;
    const values = valuesData.values;
    delete valuesData.values;
    const data = $c8349196cda2bdc1$var$SandDance.VegaDeckGl.util.clone(vegaSpec.data);
    valuesData.values = values;
    return {
        data: data,
        values: values
    };
}
function $c8349196cda2bdc1$var$cloneScales(vegaSpec) {
    return $c8349196cda2bdc1$var$SandDance.VegaDeckGl.util.clone(vegaSpec.scales);
}
function $c8349196cda2bdc1$var$serializeSpec(vegaSpec, datafile, dataRefType, transform, scheme) {
    const scales = $c8349196cda2bdc1$var$cloneScales(vegaSpec);
    const colorScale = scales.filter((scale)=>scale.name === $c8349196cda2bdc1$var$SandDance.constants.ScaleNames.Color
    )[0];
    if (scheme.indexOf('dual_') >= 0) colorScale.range = $c8349196cda2bdc1$var$SandDance.colorSchemes.filter((cs)=>cs.scheme === scheme
    )[0].colors;
    const clone = $c8349196cda2bdc1$var$cloneData(vegaSpec);
    const data0 = clone.data[0];
    if (dataRefType === $c8349196cda2bdc1$var$DataRefType.inline) {
        const valuesData = data0;
        valuesData.format = {
            parse: 'auto',
            type: 'json'
        };
        valuesData.values = clone.values;
    } else if (dataRefType === $c8349196cda2bdc1$var$DataRefType.none) {
        const valuesData = data0;
        valuesData.values = [];
        if (transform) {
            if (valuesData.transform) valuesData.transform.push.apply(valuesData.transform, transform);
            else valuesData.transform = transform;
        }
    } else if (dataRefType === $c8349196cda2bdc1$var$DataRefType.url) {
        const urlData = data0;
        urlData.url = datafile.dataUrl;
        urlData.format = {
            parse: 'auto',
            type: datafile.type
        };
        if (transform) {
            if (urlData.transform) urlData.transform.push.apply(urlData.transform, transform);
            else urlData.transform = transform;
        }
    }
    return Object.assign(Object.assign({
    }, vegaSpec), {
        data: clone.data,
        scales: scales
    });
}
function $c8349196cda2bdc1$var$defaultDataRefType(datafile) {
    if (datafile.dataUrl) return $c8349196cda2bdc1$var$DataRefType.url;
    return $c8349196cda2bdc1$var$DataRefType.none;
}
function $c8349196cda2bdc1$var$initState(props) {
    return {
        showSystemDialog: false,
        showVegaDialog: false,
        dataRefType: $c8349196cda2bdc1$var$defaultDataRefType(props.dataFile),
        spec: null
    };
}
function $c8349196cda2bdc1$var$signalGroupKey(key) {
    for(let i = 0; i < $d3f49cd4a4ebf638$export$e345c26dc94dc116.signalGroups.length; i++){
        if ($d3f49cd4a4ebf638$export$e345c26dc94dc116.signalGroups[i].prefix === key) return key;
    }
    return '*';
}
function $c8349196cda2bdc1$var$vegaSignalGroups(vegaSignals) {
    const signalGroupMap = {
    };
    vegaSignals.forEach((vs)=>{
        const split = vs.name.split('_');
        const key = $c8349196cda2bdc1$var$signalGroupKey(split[0]);
        signalGroupMap[key] = signalGroupMap[key] || [];
        signalGroupMap[key].push(vs);
    });
    return signalGroupMap;
}
function $c8349196cda2bdc1$var$_Settings(props) {
    class __Settings extends $c5e1961a7f97a459$export$12896e353ebd9cc.react.Component {
        constructor(props1){
            super(props1);
            this.state = $c8349196cda2bdc1$var$initState(props1);
        }
        render() {
            const { props: props2 , state: state  } = this;
            if (!props2.explorer.viewer || !props2.explorer.viewer.vegaSpec) return null;
            const options = [
                {
                    key: $c8349196cda2bdc1$var$DataRefType.none,
                    text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectVegaSpecDataNone,
                    selected: this.state.dataRefType === $c8349196cda2bdc1$var$DataRefType.none,
                    data: $c8349196cda2bdc1$var$DataRefType.none
                },
                !props2.dataFile.rawText && {
                    key: $c8349196cda2bdc1$var$DataRefType.url,
                    text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectVegaSpecDataUrl,
                    selected: this.state.dataRefType === $c8349196cda2bdc1$var$DataRefType.url,
                    data: $c8349196cda2bdc1$var$DataRefType.url
                },
                {
                    key: $c8349196cda2bdc1$var$DataRefType.inline,
                    text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectVegaSpecDataInline,
                    selected: this.state.dataRefType === $c8349196cda2bdc1$var$DataRefType.inline,
                    data: $c8349196cda2bdc1$var$DataRefType.inline
                }
            ].filter(Boolean);
            const signalGroupMap = $c8349196cda2bdc1$var$vegaSignalGroups(props2.explorer.viewer.vegaSpec.signals);
            return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, $d3f49cd4a4ebf638$export$e345c26dc94dc116.signalGroups.map((sg)=>{
                const vegaSignals = signalGroupMap[sg.prefix];
                if (vegaSignals) {
                    const filteredVegaSignals = vegaSignals.filter($c8349196cda2bdc1$var$filterSignals);
                    if (filteredVegaSignals.length > 0) return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
                        key: sg.prefix,
                        label: sg.label
                    }, filteredVegaSignals.map((signal, i)=>$c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($9339840789a2dc56$export$50478d543b96dfd6, {
                            key: i,
                            signal: signal,
                            explorer: props2.explorer,
                            newViewStateTarget: false
                        })
                    ));
                }
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelChartCanvas
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Toggle, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelShowAxes,
                defaultChecked: !props2.hideAxes,
                onChange: (e, checked)=>props2.onToggleAxes(!checked)
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Toggle, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelShowLegend,
                defaultChecked: !props2.hideLegend,
                onChange: (e, checked)=>props2.onToggleLegend(!checked)
            })), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTools
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DefaultButton, {
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonShowVegaSpec,
                onClick: ()=>this.setState({
                        showVegaDialog: true,
                        spec: $c8349196cda2bdc1$var$serializeSpec(props2.explorer.viewer.vegaSpec, props2.dataFile, this.state.dataRefType, props2.explorer.viewer.getInsight().transform, this.props.scheme)
                    })
            })), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSnapshots
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Slider, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSnapshotSettingThumbnailWidth,
                onChange: (value)=>{
                    this.props.explorer.snapshotThumbWidth = value;
                },
                min: 100,
                max: 800,
                defaultValue: this.props.explorer.snapshotThumbWidth
            })), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTransitionDurations
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Slider, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTransitionColor,
                onChange: (value)=>{
                    this.props.explorer.viewerOptions.transitionDurations.color = value;
                },
                min: 0,
                max: 10000,
                defaultValue: this.props.explorer.viewerOptions.transitionDurations.color
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Slider, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTransitionPosition,
                onChange: (value)=>{
                    this.props.explorer.viewerOptions.transitionDurations.position = value;
                },
                min: 0,
                max: 10000,
                defaultValue: this.props.explorer.viewerOptions.transitionDurations.position
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Slider, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTransitionSize,
                onChange: (value)=>{
                    this.props.explorer.viewerOptions.transitionDurations.size = value;
                },
                min: 0,
                max: 10000,
                defaultValue: this.props.explorer.viewerOptions.transitionDurations.size
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Slider, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTransitionCamera,
                onChange: (value)=>{
                    this.props.explorer.viewerOptions.transitionDurations.view = value;
                },
                min: 0,
                max: 10000,
                defaultValue: this.props.explorer.viewerOptions.transitionDurations.view
            })), props2.additionalSettings && props2.additionalSettings.map((g, i)=>$c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
                    key: i,
                    label: g.groupLabel
                }, g.children)
            ), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSystem
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DefaultButton, {
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSystemInfo,
                onClick: ()=>this.setState({
                        showSystemDialog: true
                    })
            })), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($3456628043e62c6c$export$d64e687ef4853cae, {
                hidden: !state.showVegaDialog,
                onDismiss: ()=>this.setState($c8349196cda2bdc1$var$initState(this.props))
                ,
                minWidth: "80%",
                title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelVegaSpec,
                buttons: [
                    $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.PrimaryButton, {
                        key: "copy",
                        iconProps: {
                            iconName: 'Copy'
                        },
                        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonCopyToClipboard,
                        onClick: ()=>{
                            var pre = document.getElementById('sanddance-vega-spec');
                            var range = document.createRange();
                            range.selectNode(pre);
                            const selection = window.getSelection();
                            selection.removeAllRanges();
                            selection.addRange(range);
                            document.execCommand('copy');
                        }
                    }),
                    $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DefaultButton, {
                        key: "edit",
                        iconProps: {
                            iconName: 'OpenInNewWindow'
                        },
                        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonLaunchVegaEditor,
                        onClick: ()=>{
                            window.open('https://vega.github.io/editor/', '_blank');
                        }
                    })
                ]
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($6b702e1ad8ceb63e$export$30a13326eaae8e00, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelVegaSpecData,
                options: options,
                onChange: (e, o)=>this.setState({
                        dataRefType: o.data,
                        spec: $c8349196cda2bdc1$var$serializeSpec(props2.explorer.viewer.vegaSpec, props2.dataFile, o.data, props2.explorer.viewer.getInsight().transform, this.props.scheme)
                    })
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("pre", {
                id: "sanddance-vega-spec"
            }, JSON.stringify(this.state.spec, null, 2)), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelVegaSpecNotes)), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($3456628043e62c6c$export$d64e687ef4853cae, {
                hidden: !state.showSystemDialog,
                onDismiss: ()=>this.setState($c8349196cda2bdc1$var$initState(this.props))
                ,
                title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSystemInfo
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("ul", null, this.props.children, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("li", null, "SandDanceExplorer version: ", $211e3c3b38323927$export$aef83baa0e7093df), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("li", null, "SandDanceReact version: ", $01b008870dc83545$export$aef83baa0e7093df), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("li", null, "SandDance version: ", $c8349196cda2bdc1$var$SandDance.version), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("li", null, "WebGL enabled: ", $3669ee32f5f0d5ff$export$33f60a5e15d39c82.webgl ? $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelYes : $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelNo), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("li", null, "WebGL2 enabled: ", $3669ee32f5f0d5ff$export$33f60a5e15d39c82.webgl2 ? $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelYes : $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelNo))));
        }
    }
    return new __Settings(props);
}
const $c8349196cda2bdc1$export$9c458e6eecac1eb9 = $c8349196cda2bdc1$var$_Settings;







function $2159fe8fc2041ed6$var$_SnapshotEditor(props) {
    class __SnapshotEditor extends $c5e1961a7f97a459$export$12896e353ebd9cc.react.Component {
        constructor(props1){
            super(props1);
            this.state = {
                showEditFormDialog: false,
                title: '',
                description: '',
                image: null,
                bgColor: null,
                insight: null,
                editIndex: -1
            };
        }
        resize(src, thumbWidth) {
            if (!src) return;
            var img = new Image();
            img.onload = ()=>{
                var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
                const ratio = img.width / thumbWidth;
                canvas.height = img.height / ratio;
                canvas.width = thumbWidth;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const image = canvas.toDataURL();
                this.setState({
                    image: image
                });
            };
            img.src = src;
        }
        editSnapshot(snapshot, editIndex = -1) {
            if (snapshot) this.setState(Object.assign(Object.assign({
                showEditFormDialog: true
            }, snapshot), {
                editIndex: editIndex
            }));
            else {
                const signalValues = this.props.explorer.viewer.getSignalValues();
                this.props.explorer.viewer.deselect().then(()=>{
                    const canvas = $3669ee32f5f0d5ff$export$6d478d95e4214fb3(this.props.explorer.viewer);
                    const bgColor = canvas && window.getComputedStyle(canvas).backgroundColor;
                    const insight = $385418a87250916e$exports.VegaDeckGl.util.clone(this.props.explorer.viewer.getInsight());
                    delete insight.size;
                    insight.signalValues = signalValues;
                    const title = this.props.getTitle && this.props.getTitle(insight) || '';
                    const description = this.props.getDescription && this.props.getDescription(insight) || '';
                    this.setState({
                        showEditFormDialog: true,
                        bgColor: bgColor,
                        title: title,
                        description: description,
                        insight: insight,
                        image: null,
                        editIndex: editIndex
                    });
                    //allow deselection to render
                    setTimeout(()=>{
                        this.props.explorer.viewer.presenter.canvasToDataURL().then((dataUrl)=>{
                            this.resize(dataUrl, this.props.explorer.snapshotThumbWidth);
                        });
                    }, 500);
                });
            }
        }
        render() {
            return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($3456628043e62c6c$export$d64e687ef4853cae, {
                modalProps: {
                    className: $6e437f743d80b3ba$exports.classList('sanddance-snapshot-dialog', this.props.theme)
                },
                minWidth: `${this.props.explorer.snapshotThumbWidth + 64}px`,
                hidden: !this.state.showEditFormDialog,
                onDismiss: ()=>this.setState({
                        showEditFormDialog: false
                    })
                ,
                title: this.state.editIndex >= 0 ? $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonEditSnapshot : $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonCreateSnapshot,
                buttons: $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.PrimaryButton, {
                    disabled: !this.state.image || !this.state.title,
                    key: 0,
                    onClick: (e)=>{
                        const snapshot = {
                            title: this.state.title,
                            description: this.state.description,
                            insight: this.state.insight,
                            image: this.state.image,
                            bgColor: this.state.bgColor
                        };
                        this.props.modifySnapShot && this.props.modifySnapShot(snapshot);
                        this.props.onWriteSnapshot(snapshot, this.state.editIndex);
                        this.setState({
                            showEditFormDialog: false,
                            title: '',
                            description: '',
                            image: null
                        });
                    },
                    iconProps: {
                        iconName: 'Camera'
                    },
                    text: this.state.editIndex >= 0 ? $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonUpdateSnapshot : $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonCreateSnapshot
                })
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.TextField, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSnapshotTitle,
                onChange: (e, title)=>this.setState({
                        title: title
                    })
                ,
                value: this.state.title
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.TextField, {
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSnapshotDescription,
                onChange: (e, description)=>this.setState({
                        description: description
                    })
                ,
                value: this.state.description,
                multiline: true
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                className: 'thumbnail'
            }, !this.state.image && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Spinner, null), this.state.image && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("img", {
                src: this.state.image,
                style: {
                    backgroundColor: this.state.bgColor
                }
            })), this.props.explorer.viewer && this.props.explorer.viewer.colorContexts && this.props.explorer.viewer.colorContexts.length > 1 && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColorFilter));
        }
    }
    return new __SnapshotEditor(props);
}
const $2159fe8fc2041ed6$export$1b30ac79c43d2fc0 = $2159fe8fc2041ed6$var$_SnapshotEditor;






function $118d0de4ae8ff9c2$export$aa4364103b35a0bd(props) {
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.IconButton, Object.assign({
    }, props, {
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




function $92d5d57bae29246e$var$_Snapshots(props) {
    class __Snapshots extends $c5e1961a7f97a459$export$12896e353ebd9cc.react.Component {
        constructor(props1){
            super(props1);
            this.state = {
                confirmation: null,
                title: '',
                description: '',
                image: null,
                bgColor: null,
                insight: null
            };
        }
        render() {
            const items = [
                {
                    key: 'clear',
                    text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonClearSnapshots,
                    onClick: ()=>this.setState({
                            confirmation: {
                                buttonText: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonClearSnapshots,
                                handler: ()=>this.props.onClearSnapshots()
                            }
                        })
                    ,
                    disabled: this.props.snapshots.length === 0
                }
            ];
            if (this.props.getTopActions) items.push.apply(items, this.props.getTopActions(this.props.snapshots));
            return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
                className: "sanddance-snapshots",
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSnapshots
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.PrimaryButton, {
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonCreateSnapshot,
                onClick: (e)=>this.props.editor.editSnapshot()
                ,
                split: true,
                menuProps: {
                    items: items
                }
            }), this.props.getChildren && this.props.getChildren(this.props.snapshots), this.state.confirmation && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($3456628043e62c6c$export$d64e687ef4853cae, {
                hidden: false,
                buttons: $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.PrimaryButton, {
                    key: 0,
                    onClick: (e)=>{
                        this.setState({
                            confirmation: null
                        });
                        this.state.confirmation.handler();
                    },
                    iconProps: {
                        iconName: 'Delete'
                    },
                    text: this.state.confirmation.buttonText
                }),
                onDismiss: ()=>this.setState({
                        confirmation: null
                    })
            }, $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelConfirmation), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, this.props.snapshots.map((snapshot, i)=>{
                const actions = this.props.getActions && this.props.getActions(snapshot, i) || [];
                actions.push({
                    iconButtonProps: {
                        themePalette: this.props.themePalette,
                        title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonEditSnapshot,
                        onClick: (e)=>this.props.editor.editSnapshot(snapshot, i)
                        ,
                        iconName: 'Edit'
                    }
                });
                if (this.props.snapshots.length > 1) actions.push({
                    iconButtonProps: {
                        disabled: i === 0,
                        themePalette: this.props.themePalette,
                        title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonMoveUp,
                        onClick: (e)=>this.props.onMoveUp(i)
                        ,
                        iconName: 'SortUp'
                    }
                }, {
                    iconButtonProps: {
                        disabled: i > this.props.snapshots.length - 2,
                        themePalette: this.props.themePalette,
                        title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonMoveDown,
                        onClick: (e)=>this.props.onMoveDown(i)
                        ,
                        iconName: 'SortDown'
                    }
                });
                actions.push({
                    iconButtonProps: {
                        themePalette: this.props.themePalette,
                        title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonDeleteSnapshot,
                        onClick: ()=>this.setState({
                                confirmation: {
                                    buttonText: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonDeleteSnapshot,
                                    handler: ()=>this.props.onRemoveSnapshot(i)
                                }
                            })
                        ,
                        iconName: 'Delete'
                    }
                });
                return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                    key: i,
                    className: $6e437f743d80b3ba$exports.classList('snapshot', i === this.props.selectedSnapshotIndex && 'selected')
                }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                    onClick: (e)=>this.props.onSnapshotClick(snapshot, i)
                }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                    className: 'title'
                }, snapshot.title), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                    className: 'thumbnail'
                }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("img", {
                    title: snapshot.description,
                    src: snapshot.image,
                    style: {
                        backgroundColor: snapshot.bgColor
                    }
                }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($92d5d57bae29246e$var$Actions, {
                    actions: actions,
                    snapshot: snapshot
                }));
            }))));
        }
    }
    return new __Snapshots(props);
}
const $92d5d57bae29246e$export$bd026f48d172e03 = $92d5d57bae29246e$var$_Snapshots;
function $92d5d57bae29246e$var$Actions(props) {
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "actions"
    }, props.actions.map((action, i)=>{
        if (action.iconButtonProps) return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($118d0de4ae8ff9c2$export$aa4364103b35a0bd, Object.assign({
            key: i
        }, action.iconButtonProps));
        if (action.element) return action.element;
    }));
}


var $b44f404896596941$exports = {};

$parcel$export($b44f404896596941$exports, "Explorer", () => $b44f404896596941$export$535aff0d258afa68);







const $41d7249449d225b2$var$className = 'sanddance-panel-tools';
function $41d7249449d225b2$var$ensureToolbar(panel) {
    const existing = panel.getElementsByClassName($41d7249449d225b2$var$className);
    if (existing.length > 0) return existing[0];
    else {
        const div = $385418a87250916e$exports.VegaDeckGl.util.addDiv(panel, $41d7249449d225b2$var$className);
        panel.insertAdjacentElement('afterbegin', div);
        return div;
    }
}
function $41d7249449d225b2$export$d4e85aa8ca214f54(presenter, showLegend, props) {
    const panel = presenter.getElement($385418a87250916e$exports.VegaDeckGl.PresenterElement.panel);
    const div = $41d7249449d225b2$var$ensureToolbar(panel);
    $c5e1961a7f97a459$export$12896e353ebd9cc.reactDOM.render($41d7249449d225b2$var$ColorMap(props), div);
    panel.style.display = showLegend ? '' : 'none';
}
function $41d7249449d225b2$var$ColorMap(props) {
    const menuProps = {
        items: [
            {
                key: 'new',
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonColorSchemeRemap,
                disabled: !props.canRemap || props.isRemap,
                onClick: ()=>props.colorMapHandler(true)
            },
            {
                key: 'old',
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonColorSchemeKeep,
                disabled: !props.canRemap || !props.isRemap,
                onClick: ()=>props.colorMapHandler(false)
            }
        ]
    };
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($118d0de4ae8ff9c2$export$aa4364103b35a0bd, {
        themePalette: props.themePalette,
        title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonColorSchemeMap,
        onClick: null,
        iconName: props.canRemap ? 'FiltersSolid' : 'Filters',
        menuProps: menuProps
    }));
}


function $aa1a81963e518cec$export$4ebf557d3792c9d7(newColumn, oldColumn, oldScheme) {
    if (oldColumn && oldColumn.quantitative === newColumn.quantitative && $aa1a81963e518cec$var$defaultColorScheme(oldColumn) === $aa1a81963e518cec$var$defaultColorScheme(newColumn)) return oldScheme;
    return $aa1a81963e518cec$var$defaultColorScheme(newColumn);
}
function $aa1a81963e518cec$var$defaultColorScheme(c) {
    if (c.quantitative) return 'redyellowgreen';
    else if (c.stats.distinctValueCount === 2) return 'dual_redgreen';
    else if (c.stats.distinctValueCount <= 10) return 'category10';
    return 'category20';
}







function $85c4338488c809e6$export$9099ad97b570f7c(x) {
    return Math.abs(x = Math.round(x)) >= 1000000000000000000000 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}
function $85c4338488c809e6$export$203fda1068e56634(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);
    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
        coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
        +x.slice(i + 1)
    ];
}


function $188784b179c71507$export$9099ad97b570f7c(x) {
    return x = $85c4338488c809e6$export$203fda1068e56634(Math.abs(x)), x ? x[1] : NaN;
}


function $66f985fe0c256175$export$9099ad97b570f7c(grouping, thousands) {
    return function(value, width) {
        var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
        while(i > 0 && g > 0){
            if (length + g + 1 > width) g = Math.max(1, width - length);
            t.push(value.substring(i -= g, i + g));
            if ((length += g + 1) > width) break;
            g = grouping[j = (j + 1) % grouping.length];
        }
        return t.reverse().join(thousands);
    };
}


function $dce316874c905c7f$export$9099ad97b570f7c(numerals) {
    return function(value) {
        return value.replace(/[0-9]/g, function(i) {
            return numerals[+i];
        });
    };
}


// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var $1ef03d2e5c4d2c74$var$re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function $1ef03d2e5c4d2c74$export$9099ad97b570f7c(specifier) {
    if (!(match = $1ef03d2e5c4d2c74$var$re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new $1ef03d2e5c4d2c74$export$297ff910602bd1b1({
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
$1ef03d2e5c4d2c74$export$9099ad97b570f7c.prototype = $1ef03d2e5c4d2c74$export$297ff910602bd1b1.prototype; // instanceof
function $1ef03d2e5c4d2c74$export$297ff910602bd1b1(specifier) {
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
$1ef03d2e5c4d2c74$export$297ff910602bd1b1.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};


function $2a72778cc866bf64$export$9099ad97b570f7c(s) {
    out: for(var n = s.length, i = 1, i0 = -1, i1; i < n; ++i)switch(s[i]){
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
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}




var $3709d5dcd25d86cb$export$68edb477682bf50b;
function $3709d5dcd25d86cb$export$9099ad97b570f7c(x, p) {
    var d = $85c4338488c809e6$export$203fda1068e56634(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent = d[1], i = exponent - ($3709d5dcd25d86cb$export$68edb477682bf50b = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + $85c4338488c809e6$export$203fda1068e56634(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}



function $b43ad9bf0fc6363c$export$9099ad97b570f7c(x, p) {
    var d = $85c4338488c809e6$export$203fda1068e56634(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}


var $4feaad501afa545e$export$9099ad97b570f7c = {
    "%": function(x, p) {
        return (x * 100).toFixed(p);
    },
    "b": function(x) {
        return Math.round(x).toString(2);
    },
    "c": function(x) {
        return x + "";
    },
    "d": $85c4338488c809e6$export$9099ad97b570f7c,
    "e": function(x, p) {
        return x.toExponential(p);
    },
    "f": function(x, p) {
        return x.toFixed(p);
    },
    "g": function(x, p) {
        return x.toPrecision(p);
    },
    "o": function(x) {
        return Math.round(x).toString(8);
    },
    "p": function(x, p) {
        return $b43ad9bf0fc6363c$export$9099ad97b570f7c(x * 100, p);
    },
    "r": $b43ad9bf0fc6363c$export$9099ad97b570f7c,
    "s": $3709d5dcd25d86cb$export$9099ad97b570f7c,
    "X": function(x) {
        return Math.round(x).toString(16).toUpperCase();
    },
    "x": function(x) {
        return Math.round(x).toString(16);
    }
};



function $7e3a8e0da1fb77fd$export$9099ad97b570f7c(x) {
    return x;
}


var $d91e3809eeaefbc6$var$map = Array.prototype.map, $d91e3809eeaefbc6$var$prefixes = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "µ",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y"
];
function $d91e3809eeaefbc6$export$9099ad97b570f7c(locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? $7e3a8e0da1fb77fd$export$9099ad97b570f7c : $66f985fe0c256175$export$9099ad97b570f7c($d91e3809eeaefbc6$var$map.call(locale.grouping, Number), locale.thousands + ""), currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "", currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "", decimal = locale.decimal === undefined ? "." : locale.decimal + "", numerals = locale.numerals === undefined ? $7e3a8e0da1fb77fd$export$9099ad97b570f7c : $dce316874c905c7f$export$9099ad97b570f7c($d91e3809eeaefbc6$var$map.call(locale.numerals, String)), percent = locale.percent === undefined ? "%" : locale.percent + "", minus = locale.minus === undefined ? "-" : locale.minus + "", nan = locale.nan === undefined ? "NaN" : locale.nan + "";
    function newFormat(specifier) {
        specifier = $1ef03d2e5c4d2c74$export$9099ad97b570f7c(specifier);
        var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
        // The "n" type is an alias for ",g".
        if (type === "n") comma = true, type = "g";
        else if (!$4feaad501afa545e$export$9099ad97b570f7c[type]) precision === undefined && (precision = 12), trim = true, type = "g";
        // If zero fill is specified, padding goes after sign and before digits.
        if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "=";
        // Compute the prefix and suffix.
        // For SI-prefix, the suffix is lazily computed.
        var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
        // What format function should we use?
        // Is this an integer type?
        // Can this type generate exponential notation?
        var formatType = $4feaad501afa545e$export$9099ad97b570f7c[type], maybeSuffix = /[defgprs%]/.test(type);
        // Set the default precision if not specified,
        // or clamp the specified precision to the supported range.
        // For significant precision, it must be in [1, 21].
        // For fixed precision, it must be in [0, 20].
        precision = precision === undefined ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
        function format(value) {
            var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
            if (type === "c") {
                valueSuffix = formatType(value) + valueSuffix;
                value = "";
            } else {
                value = +value;
                // Determine the sign. -0 is not less than 0, but 1 / -0 is!
                var valueNegative = value < 0 || 1 / value < 0;
                // Perform the initial formatting.
                value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
                // Trim insignificant zeros.
                if (trim) value = $2a72778cc866bf64$export$9099ad97b570f7c(value);
                // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
                if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
                // Compute the prefix and suffix.
                valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
                valueSuffix = (type === "s" ? $d91e3809eeaefbc6$var$prefixes[8 + $3709d5dcd25d86cb$export$68edb477682bf50b / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
                // Break the formatted value into the integer “value” part that can be
                // grouped, and fractional or exponential “suffix” part that is not.
                if (maybeSuffix) {
                    i = -1, n = value.length;
                    while((++i) < n)if (c = value.charCodeAt(i), 48 > c || c > 57) {
                        valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                        value = value.slice(0, i);
                        break;
                    }
                }
            }
            // If the fill character is not "0", grouping is applied before padding.
            if (comma && !zero) value = group(value, Infinity);
            // Compute the padding.
            var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
            // If the fill character is "0", grouping is applied after padding.
            if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
            // Reconstruct the final output based on the desired alignment.
            switch(align){
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
        format.toString = function() {
            return specifier + "";
        };
        return format;
    }
    function formatPrefix(specifier, value) {
        var f = newFormat((specifier = $1ef03d2e5c4d2c74$export$9099ad97b570f7c(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor($188784b179c71507$export$9099ad97b570f7c(value) / 3))) * 3, k = Math.pow(10, -e), prefix = $d91e3809eeaefbc6$var$prefixes[8 + e / 3];
        return function(value1) {
            return f(k * value1) + prefix;
        };
    }
    return {
        format: newFormat,
        formatPrefix: formatPrefix
    };
}


var $fad03a0fd28d041d$var$locale;
var $fad03a0fd28d041d$export$a5b158389611e45d;
var $fad03a0fd28d041d$export$656a208b80641058;
$fad03a0fd28d041d$export$9099ad97b570f7c({
    decimal: ".",
    thousands: ",",
    grouping: [
        3
    ],
    currency: [
        "$",
        ""
    ],
    minus: "-"
});
function $fad03a0fd28d041d$export$9099ad97b570f7c(definition) {
    $fad03a0fd28d041d$var$locale = $d91e3809eeaefbc6$export$9099ad97b570f7c(definition);
    $fad03a0fd28d041d$export$a5b158389611e45d = $fad03a0fd28d041d$var$locale.format;
    $fad03a0fd28d041d$export$656a208b80641058 = $fad03a0fd28d041d$var$locale.formatPrefix;
    return $fad03a0fd28d041d$var$locale;
}



var $0338ff3c02daec02$export$1c6888b44b81730b;
(function(DataScopeId) {
    DataScopeId[DataScopeId["AllData"] = 0] = "AllData";
    DataScopeId[DataScopeId["SelectedData"] = 1] = "SelectedData";
    DataScopeId[DataScopeId["FilteredData"] = 2] = "FilteredData";
})($0338ff3c02daec02$export$1c6888b44b81730b || ($0338ff3c02daec02$export$1c6888b44b81730b = {
}));
const $0338ff3c02daec02$var$shortFormat = $fad03a0fd28d041d$export$a5b158389611e45d('.2~s');
function $0338ff3c02daec02$var$short(n) {
    return n === -1 ? '--' : n ? n < 1000 ? n.toString() : $0338ff3c02daec02$var$shortFormat(n) : '0';
}
function $0338ff3c02daec02$export$993107647a287a6(props) {
    const dataCount = Object.assign({
        all: -1,
        filtered: -1,
        selected: -1
    }, props.dataCount);
    return props.compact ? $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: $6e437f743d80b3ba$exports.classList('sanddance-datascope', 'compact'),
        onClick: props.onCompactClick
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($0338ff3c02daec02$var$Compact, Object.assign({
    }, props, {
        dataScopeId: $0338ff3c02daec02$export$1c6888b44b81730b.AllData,
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectDataSpanAll,
        count: dataCount.all
    })), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($0338ff3c02daec02$var$Compact, Object.assign({
    }, props, {
        dataScopeId: $0338ff3c02daec02$export$1c6888b44b81730b.FilteredData,
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectDataSpanFilter,
        count: dataCount.filtered
    })), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($0338ff3c02daec02$var$Compact, Object.assign({
    }, props, {
        dataScopeId: $0338ff3c02daec02$export$1c6888b44b81730b.SelectedData,
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectDataSpanSelection,
        count: dataCount.selected
    }))) : $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: $6e437f743d80b3ba$exports.classList('sanddance-datascope', 'extended', props.active && 'active')
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, props.dataSet), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "datascope-buttons"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($0338ff3c02daec02$var$DataScopeButton, Object.assign({
    }, props, {
        dataScopeId: $0338ff3c02daec02$export$1c6888b44b81730b.AllData,
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectDataSpanAll,
        count: dataCount.all
    })), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($0338ff3c02daec02$var$DataScopeButton, Object.assign({
    }, props, {
        dataScopeId: $0338ff3c02daec02$export$1c6888b44b81730b.FilteredData,
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectDataSpanFilter,
        count: dataCount.filtered
    })), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($0338ff3c02daec02$var$DataScopeButton, Object.assign({
    }, props, {
        dataScopeId: $0338ff3c02daec02$export$1c6888b44b81730b.SelectedData,
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectDataSpanSelection,
        count: dataCount.selected
    })))));
}
function $0338ff3c02daec02$var$Compact(props) {
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: props.text,
        onClick: ()=>{
            props.onDataScopeClick(props.dataScopeId);
        }
    }, $0338ff3c02daec02$var$short(props.count));
}
function $0338ff3c02daec02$var$DataScopeButton(props) {
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($a4f65425c8c706b4$export$3e142902fa56c5af, {
        themePalette: props.themePalette,
        className: $6e437f743d80b3ba$exports.classList('datascope-button', props.selectedDataScope === props.dataScopeId && 'selected'),
        disabled: props.disabled,
        text: props.text,
        onClick: ()=>{
            props.onDataScopeClick(props.dataScopeId);
        },
        onRenderText: ()=>{
            return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                title: props.count > 0 ? props.count.toString() : ''
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("label", null, props.text), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, $0338ff3c02daec02$var$short(props.count)));
        },
        onRenderIcon: ()=>null
    });
}









function $c401ef163b66a583$export$72ac974b48f19b39(props) {
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: $6e437f743d80b3ba$exports.classList('scrollable-container', props.className),
        role: props.role
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "scrollable"
    }, props.children));
}


var $065798d25a9d250c$export$b264ae1d75dc4e4e;
(function(SideTabId) {
    SideTabId[SideTabId["ChartType"] = 0] = "ChartType";
    SideTabId[SideTabId["Data"] = 1] = "Data";
    SideTabId[SideTabId["Search"] = 2] = "Search";
    SideTabId[SideTabId["Color"] = 3] = "Color";
    SideTabId[SideTabId["Snapshots"] = 4] = "Snapshots";
    SideTabId[SideTabId["History"] = 5] = "History";
    SideTabId[SideTabId["Settings"] = 6] = "Settings";
    SideTabId[SideTabId["Pin"] = 7] = "Pin";
    SideTabId[SideTabId["Collapse"] = 8] = "Collapse";
})($065798d25a9d250c$export$b264ae1d75dc4e4e || ($065798d25a9d250c$export$b264ae1d75dc4e4e = {
}));




function $ee1d356b7aae3d3f$export$fc9ca46a31bcb059(props) {
    const sidebuttons = [
        {
            sideTabId: $065798d25a9d250c$export$b264ae1d75dc4e4e.ChartType,
            iconName: 'BIDashboard',
            title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelChart
        },
        {
            sideTabId: $065798d25a9d250c$export$b264ae1d75dc4e4e.Color,
            iconName: 'Color',
            title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColor
        },
        {
            sideTabId: $065798d25a9d250c$export$b264ae1d75dc4e4e.Data,
            iconName: 'Table',
            title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelDataBrowser
        },
        {
            sideTabId: $065798d25a9d250c$export$b264ae1d75dc4e4e.Search,
            iconName: 'Search',
            title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSearch
        },
        {
            sideTabId: $065798d25a9d250c$export$b264ae1d75dc4e4e.Snapshots,
            iconName: 'Camera',
            title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelSnapshots
        },
        {
            sideTabId: $065798d25a9d250c$export$b264ae1d75dc4e4e.History,
            iconName: 'History',
            title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelHistory
        },
        {
            sideTabId: $065798d25a9d250c$export$b264ae1d75dc4e4e.Settings,
            iconName: 'Settings',
            title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelChartSettings
        }
    ];
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: $6e437f743d80b3ba$exports.classList('sanddance-sidebar', 'calculator', props.pinned && 'pinned', props.closed && 'closed')
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sidebar-content"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($0338ff3c02daec02$export$993107647a287a6, Object.assign({
    }, props.dataScopeProps)), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "vbuttons",
        role: 'tablist'
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sidebar-dialogs"
    }, sidebuttons.map((sidebutton, i)=>$c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($ee1d356b7aae3d3f$export$8e66f8fc23b74ff3, Object.assign({
            key: i
        }, props, sidebutton, {
            themePalette: props.themePalette
        }))
    )), !props.hideSidebarControls && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sidebar-controls"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($ee1d356b7aae3d3f$export$8e66f8fc23b74ff3, Object.assign({
    }, props, {
        sideTabId: $065798d25a9d250c$export$b264ae1d75dc4e4e.Pin,
        iconName: props.pinned ? 'Pinned' : 'Pin',
        title: props.pinned ? $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonToolbarFloat : $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonToolbarDock
    })), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($ee1d356b7aae3d3f$export$8e66f8fc23b74ff3, Object.assign({
    }, props, {
        sideTabId: $065798d25a9d250c$export$b264ae1d75dc4e4e.Collapse,
        iconName: props.closed ? 'DoubleChevronRight12' : 'DoubleChevronLeft12',
        title: props.closed ? $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonToolbarShow : $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonToolbarHide
    })))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c401ef163b66a583$export$72ac974b48f19b39, {
        role: 'tabpanel'
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sidetab"
    }, props.children)), props.calculating && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "calculating"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Spinner, {
        size: $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.SpinnerSize.large
    }))));
}
function $ee1d356b7aae3d3f$export$8e66f8fc23b74ff3(props) {
    const selected = !props.closed && props.selectedSideTab === props.sideTabId;
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: $6e437f743d80b3ba$exports.classList('vbutton', selected && 'selected'),
        role: 'tab',
        "aria-selected": selected
    }, props.badgeText && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "count"
    }, props.badgeText), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($118d0de4ae8ff9c2$export$aa4364103b35a0bd, {
        themePalette: props.themePalette,
        className: "vbutton",
        iconName: props.iconName,
        title: props.title,
        onClick: ()=>{
            props.onSideTabClick(props.sideTabId);
        }
    }));
}



const $5e928fa465358196$export$f82d50ea4fab0593 = (props)=>{
    const { theme: theme  } = props;
    if (!theme) throw new Error('Theme is undefined or null.');
    const { palette: palette , semanticColors: semanticColors  } = theme;
    const BUTTON_ICON_CLASSNAME = '.ms-Button-icon';
    return {
        root: [
            Object.assign({
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.getFocusStyle(theme, {
                inset: 2
            })),
            {
                backgroundColor: palette.white
            }
        ],
        rootHovered: {
            backgroundColor: palette.neutralLighter,
            selectors: {
                [BUTTON_ICON_CLASSNAME]: {
                    color: palette.themeDarkAlt
                }
            }
        },
        rootPressed: {
            backgroundColor: palette.neutralLight,
            color: palette.neutralDark,
            selectors: {
                [BUTTON_ICON_CLASSNAME]: {
                    color: palette.themeDark
                }
            }
        },
        rootChecked: {
            backgroundColor: palette.neutralLight,
            color: palette.neutralDark,
            selectors: {
                [BUTTON_ICON_CLASSNAME]: {
                    color: palette.themeDark
                }
            }
        },
        rootCheckedHovered: {
            backgroundColor: palette.neutralQuaternaryAlt,
            color: palette.neutralDark
        },
        rootExpanded: {
            color: palette.neutralDark,
            backgroundColor: palette.neutralLight,
            selectors: {
                [BUTTON_ICON_CLASSNAME]: {
                    color: palette.themeDark
                }
            }
        },
        rootExpandedHovered: {
            background: palette.neutralQuaternaryAlt
        },
        rootDisabled: {
            backgroundColor: palette.white,
            selectors: {
                [BUTTON_ICON_CLASSNAME]: {
                    color: semanticColors.disabledBodySubtext
                }
            }
        },
        splitButtonMenuButton: {
            backgroundColor: palette.white,
            color: palette.neutralSecondary,
            selectors: {
                ':hover': {
                    backgroundColor: palette.neutralLighter,
                    selectors: {
                        [BUTTON_ICON_CLASSNAME]: {
                            color: palette.neutralPrimary
                        }
                    }
                },
                ':active': {
                    backgroundColor: palette.neutralLight,
                    selectors: {
                        [BUTTON_ICON_CLASSNAME]: {
                            color: palette.neutralPrimary
                        }
                    }
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



const $1f6e98b04834e41e$var$s = `\n ......\n.......\n...\n......\n ......\n    ...\n.......\n......\n`;
const $1f6e98b04834e41e$var$d = $1f6e98b04834e41e$var$s.split('\n').map((row, irow)=>row.length ? row.split('').map((char, icol)=>char.trim() ? `M${2 * icol + 1} ${2 * (irow - 1) + 1} v1 h1 v-1 Z` : ''
    ).join(' ') : ''
).join('\n');
function $1f6e98b04834e41e$export$4631b22d77b0b4e3() {
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 16 16"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("path", {
        d: $1f6e98b04834e41e$var$d
    }));
}





function $64071d48f10c4d85$export$47517a79cab7d511(props) {
    const zeroResults = props.selectionState.selectedData && props.selectionState.selectedData.length === 0;
    const disabled = !props.loaded;
    const items = [
        {
            key: 'undo',
            name: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonUndo,
            iconProps: {
                iconName: 'Undo'
            },
            disabled: disabled || props.historyItems.length === 0 || props.historyIndex === 0,
            onClick: props.undo
        },
        {
            key: 'redo',
            name: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonRedo,
            iconProps: {
                iconName: 'Redo'
            },
            disabled: disabled || props.historyItems.length <= 1 || props.historyIndex >= props.historyItems.length - 1,
            onClick: props.redo
        },
        {
            key: 'deselect',
            name: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonDeselect,
            iconProps: {
                iconName: 'Cancel'
            },
            disabled: disabled || !props.selectionSearch,
            onClick: props.doDeselect
        },
        {
            key: 'isolate',
            name: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonIsolate,
            iconProps: {
                iconName: 'Filter'
            },
            disabled: disabled || !props.selectionSearch || zeroResults,
            onClick: ()=>props.doFilter(props.selectionSearch, $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelHistoryFilterIsolate)
        },
        {
            key: 'exclude',
            name: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonExclude,
            iconProps: {
                iconName: 'ClearFilter'
            },
            disabled: disabled || !props.selectionSearch || zeroResults,
            onClick: ()=>props.doFilter($385418a87250916e$exports.searchExpression.invert(props.selectionSearch), $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelHistoryFilterIExclude)
        },
        {
            key: 'reset',
            name: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonReset,
            iconProps: {
                iconName: 'RemoveFilter'
            },
            disabled: disabled || !props.filter,
            onClick: ()=>props.doUnfilter($d3f49cd4a4ebf638$export$e345c26dc94dc116.labelHistoryFilterClear)
        }
    ];
    if (props.buttons) items.push.apply(items, props.buttons);
    if (props.collapseLabels) items.forEach((item)=>item.iconOnly = true
    );
    const farItems = [
        {
            key: 'previous-snapshot',
            iconProps: {
                iconName: 'Previous'
            },
            title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonPrevSnapshot,
            onClick: props.onSnapshotPreviousClick,
            disabled: props.snapshots.length < 2
        },
        {
            key: 'snapshot',
            iconProps: {
                iconName: 'Camera'
            },
            title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonCreateSnapshot,
            onClick: props.onSnapshotClick,
            disabled: !props.loaded
        },
        {
            key: 'next-snapshot',
            iconProps: {
                iconName: 'Next'
            },
            title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonNextSnapshot,
            onClick: props.onSnapshotNextClick,
            disabled: props.snapshots.length < 2
        },
        {
            key: 'view',
            iconProps: {
                iconName: props.view === '2d' ? 'CubeShape' : 'Page'
            },
            title: props.view === '2d' ? $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelViewType3d : $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelViewType2d,
            onClick: props.onViewClick,
            disabled: !props.loaded
        },
        {
            key: 'home',
            iconProps: {
                iconName: 'PicturePosition'
            },
            title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonCameraHome,
            onClick: props.onHomeClick,
            disabled: !props.loaded
        }
    ];
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sanddance-explorer-topbar"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "logo"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($1f6e98b04834e41e$export$4631b22d77b0b4e3, null), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("a", {
        href: props.logoClickUrl || '/',
        target: props.logoClickTarget || '_blank'
    }, $d3f49cd4a4ebf638$export$e345c26dc94dc116.appName)), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sanddance-explorer-commandbar"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Customizer, {
        scopedSettings: {
            CommandBarButton: {
                styles: (buttonProps)=>{
                    buttonProps.theme.palette = props.themePalette;
                    return $5e928fa465358196$export$f82d50ea4fab0593(buttonProps);
                }
            }
        }
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.CommandBar, {
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



const $3ec46caab6f4505c$export$b7dc3aabb556dfb2 = (dataFile)=>new Promise((resolve, reject)=>{
        const vega = $385418a87250916e$exports.VegaDeckGl.base.vega;
        const loader = vega.loader();
        function handleRawText(text) {
            let data;
            try {
                data = vega.read(text, {
                    type: dataFile.type,
                    parse: {
                    }
                });
            } catch (e) {
                reject(e);
            }
            if (data) $3ec46caab6f4505c$export$5832599d7ffde789(data, dataFile.type).then((dc)=>{
                if (dataFile.snapshotsUrl) fetch(dataFile.snapshotsUrl).then((response)=>response.json()
                ).then((snapshots)=>{
                    dc.snapshots = snapshots;
                    resolve(dc);
                }).catch(reject);
                else if (dataFile.snapshots) {
                    dc.snapshots = dataFile.snapshots;
                    resolve(dc);
                } else resolve(dc);
            }).catch(reject);
        }
        if (dataFile.dataUrl) loader.load(dataFile.dataUrl).then(handleRawText).catch(reject);
        else if (dataFile.rawText) handleRawText(dataFile.rawText);
        else reject('dataFile object must have either dataUrl or rawText property set.');
    })
;
const $3ec46caab6f4505c$export$5832599d7ffde789 = (data, type)=>new Promise((resolve, reject)=>{
        const parse = type === 'csv' || type === 'tsv';
        if (parse) //convert empty strings to null so that vega.inferType will get dates
        data.forEach((row)=>{
            for(let column in row)if (row[column] === '') row[column] = null;
        });
        const columns = $385418a87250916e$exports.util.getColumnsFromData($385418a87250916e$exports.VegaDeckGl.base.vega.inferTypes, data).filter((c)=>c.name && c.name.trim()
        ).sort((a, b)=>a.name.localeCompare(b.name)
        );
        if (parse) {
            const booleanColumns = columns.filter((c)=>c.type === 'boolean'
            );
            const dateColumns = columns.filter((c)=>c.type === 'date'
            );
            const numericColumns = columns.filter((c)=>c.type === 'integer' || c.type === 'number'
            );
            data.forEach((obj)=>{
                booleanColumns.forEach((c)=>{
                    obj[c.name] = ('' + obj[c.name]).toLowerCase() === 'true';
                });
                dateColumns.forEach((c)=>{
                    const input = obj[c.name];
                    if (input !== null) {
                        const d = new Date(input);
                        d.input = input;
                        obj[c.name] = d;
                    }
                });
                numericColumns.forEach((c)=>{
                    const n = parseFloat(obj[c.name]);
                    obj[c.name] = isNaN(n) ? null : n;
                });
            });
        }
        resolve({
            data: data,
            columns: columns
        });
    })
;



var $ffac552ad0872994$var$util = $385418a87250916e$exports.VegaDeckGl.util;
const $ffac552ad0872994$export$ab53ba4bd9c9d2ec = {
};
$ffac552ad0872994$export$ab53ba4bd9c9d2ec[''] = {
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
$ffac552ad0872994$export$ab53ba4bd9c9d2ec['dark-theme'] = {
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
function $ffac552ad0872994$export$b3e0424e22817deb(themePalette) {
    const c = $ffac552ad0872994$var$util.colorFromString(themePalette.themeSecondary);
    c[3] = 256 / 3; // one-third opacity background
    return {
        axisLine: themePalette.black,
        axisText: themePalette.black,
        hoveredCube: themePalette.black,
        clickableText: themePalette.themeDark,
        clickableTextHighlight: $ffac552ad0872994$var$util.colorToString(c),
        clickableTextHighlightAlphaCutoff: 0,
        searchText: themePalette.neutralPrimary,
        searchTextHighlight: themePalette.neutralPrimaryAlt
    };
}


const $4c9aa6a92253ee73$export$8d759f3178f6b82 = 'Segoe UI, sans-serif';
const $4c9aa6a92253ee73$export$23e61e65e99ffb54 = {
    colors: $ffac552ad0872994$export$b3e0424e22817deb($ffac552ad0872994$export$ab53ba4bd9c9d2ec['']),
    fontFamily: $4c9aa6a92253ee73$export$8d759f3178f6b82
};
const $4c9aa6a92253ee73$export$df0185090c61e4ef = 300;







function $e853b633102ebdad$export$b467f28d73d9ef5b(selected, scheme) {
    return {
        key: scheme,
        text: scheme,
        selected: selected === scheme,
        scheme: scheme,
        children: $e853b633102ebdad$export$bffb04186d5bb00c[scheme]
    };
}
const $e853b633102ebdad$export$bffb04186d5bb00c = {
};


const $b84b4567b28066c9$var$p8 = `${12.5}%`;
const $b84b4567b28066c9$var$p9 = `${100 / 9}%`;
const $b84b4567b28066c9$var$p10 = `${10}%`;
const $b84b4567b28066c9$var$p12 = `${100 / 12}%`;
const $b84b4567b28066c9$var$p20 = `${5}%`;
let $b84b4567b28066c9$var$loaded = false;
function $b84b4567b28066c9$var$load() {
    $e853b633102ebdad$export$bffb04186d5bb00c['accent'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#7fc97f",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(127, 201, 127)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#beaed4",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(190, 174, 212)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fdc086",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(253, 192, 134)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ffff99",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(255, 255, 153)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#386cb0",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(56, 108, 176)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#f0027f",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(240, 2, 127)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#bf5b17",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(191, 91, 23)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#666666",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(102, 102, 102)'
        }
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['category10'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#1f77b4",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(31, 119, 180)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ff7f0e",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(255, 127, 14)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#2ca02c",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(44, 160, 44)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#d62728",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(214, 39, 40)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#9467bd",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(148, 103, 189)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#8c564b",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(140, 86, 75)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e377c2",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(227, 119, 194)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#7f7f7f",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(127, 127, 127)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#bcbd22",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(188, 189, 34)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#17becf",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(23, 190, 207)'
        }
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['category20'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#1f77b4",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(31, 119, 180)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#aec7e8",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(174, 199, 232)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ff7f0e",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(255, 127, 14)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ffbb78",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(255, 187, 120)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#2ca02c",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(44, 160, 44)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#98df8a",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(152, 223, 138)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#d62728",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(214, 39, 40)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ff9896",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(255, 152, 150)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#9467bd",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(148, 103, 189)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#c5b0d5",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(197, 176, 213)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#8c564b",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(140, 86, 75)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#c49c94",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(196, 156, 148)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e377c2",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(227, 119, 194)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#f7b6d2",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(247, 182, 210)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#7f7f7f",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(127, 127, 127)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#c7c7c7",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(199, 199, 199)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#bcbd22",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(188, 189, 34)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#dbdb8d",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(219, 219, 141)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#17becf",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(23, 190, 207)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#9edae5",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(158, 218, 229)'
        }
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['category20b'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#393b79",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(57, 59, 121)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#5254a3",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(82, 84, 163)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#6b6ecf",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(107, 110, 207)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#9c9ede",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(156, 158, 222)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#637939",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(99, 121, 57)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#8ca252",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(140, 162, 82)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#b5cf6b",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(181, 207, 107)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#cedb9c",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(206, 219, 156)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#8c6d31",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(140, 109, 49)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#bd9e39",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(189, 158, 57)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e7ba52",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(231, 186, 82)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e7cb94",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(231, 203, 148)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#843c39",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(132, 60, 57)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ad494a",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(173, 73, 74)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#d6616b",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(214, 97, 107)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e7969c",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(231, 150, 156)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#7b4173",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(123, 65, 115)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#a55194",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(165, 81, 148)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ce6dbd",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(206, 109, 189)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#de9ed6",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(222, 158, 214)'
        }
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['category20c'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#3182bd",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(49, 130, 189)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#6baed6",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(107, 174, 214)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#9ecae1",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(158, 202, 225)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#c6dbef",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(198, 219, 239)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e6550d",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(230, 85, 13)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fd8d3c",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(253, 141, 60)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fdae6b",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(253, 174, 107)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fdd0a2",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(253, 208, 162)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#31a354",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(49, 163, 84)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#74c476",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(116, 196, 118)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#a1d99b",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(161, 217, 155)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#c7e9c0",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(199, 233, 192)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#756bb1",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(117, 107, 177)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#9e9ac8",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(158, 154, 200)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#bcbddc",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(188, 189, 220)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#dadaeb",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(218, 218, 235)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#636363",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(99, 99, 99)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#969696",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(150, 150, 150)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#bdbdbd",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(189, 189, 189)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#d9d9d9",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(217, 217, 217)'
        }
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['dark2'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#1b9e77",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(27, 158, 119)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#d95f02",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(217, 95, 2)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#7570b3",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(117, 112, 179)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e7298a",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(231, 41, 138)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#66a61e",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(102, 166, 30)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e6ab02",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(230, 171, 2)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#a6761d",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(166, 118, 29)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#666666",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(102, 102, 102)'
        }
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['paired'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#a6cee3",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(166, 206, 227)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#1f78b4",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(31, 120, 180)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#b2df8a",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(178, 223, 138)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#33a02c",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(51, 160, 44)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fb9a99",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(251, 154, 153)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e31a1c",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(227, 26, 28)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fdbf6f",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(253, 191, 111)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ff7f00",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(255, 127, 0)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#cab2d6",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(202, 178, 214)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#6a3d9a",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(106, 61, 154)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ffff99",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(255, 255, 153)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#b15928",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(177, 89, 40)'
        }
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['pastel1'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fbb4ae",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(251, 180, 174)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#b3cde3",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(179, 205, 227)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ccebc5",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(204, 235, 197)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#decbe4",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(222, 203, 228)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fed9a6",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(254, 217, 166)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ffffcc",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(255, 255, 204)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e5d8bd",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(229, 216, 189)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fddaec",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(253, 218, 236)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#f2f2f2",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(242, 242, 242)'
        }
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['pastel2'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#b3e2cd",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(179, 226, 205)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fdcdac",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(253, 205, 172)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#cbd5e8",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(203, 213, 232)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#f4cae4",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(244, 202, 228)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e6f5c9",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(230, 245, 201)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fff2ae",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(255, 242, 174)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#f1e2cc",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(241, 226, 204)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#cccccc",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(204, 204, 204)'
        }
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['set1'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e41a1c",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(228, 26, 28)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#377eb8",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(55, 126, 184)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#4daf4a",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(77, 175, 74)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#984ea3",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(152, 78, 163)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ff7f00",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(255, 127, 0)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ffff33",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(255, 255, 51)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#a65628",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(166, 86, 40)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#f781bf",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(247, 129, 191)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#999999",
        style: {
            width: $b84b4567b28066c9$var$p9,
            background: 'rgb(153, 153, 153)'
        }
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['set2'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#66c2a5",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(102, 194, 165)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fc8d62",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(252, 141, 98)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#8da0cb",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(141, 160, 203)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e78ac3",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(231, 138, 195)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#a6d854",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(166, 216, 84)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ffd92f",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(255, 217, 47)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e5c494",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(229, 196, 148)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#b3b3b3",
        style: {
            width: $b84b4567b28066c9$var$p8,
            background: 'rgb(179, 179, 179)'
        }
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['set3'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#8dd3c7",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(141, 211, 199)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ffffb3",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(255, 255, 179)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#bebada",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(190, 186, 218)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fb8072",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(251, 128, 114)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#80b1d3",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(128, 177, 211)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fdb462",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(253, 180, 98)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#b3de69",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(179, 222, 105)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fccde5",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(252, 205, 229)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#d9d9d9",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(217, 217, 217)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#bc80bd",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(188, 128, 189)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ccebc5",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(204, 235, 197)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ffed6f",
        style: {
            width: $b84b4567b28066c9$var$p12,
            background: 'rgb(255, 237, 111)'
        }
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['tableau10'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#4c78a8",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(76, 120, 168)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#f58518",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(245, 133, 24)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e45756",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(228, 87, 86)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#72b7b2",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(114, 183, 178)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#54a24b",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(84, 162, 75)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#eeca3b",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(238, 202, 59)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#b279a2",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(178, 121, 162)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ff9da6",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(255, 157, 166)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#9d755d",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(157, 117, 93)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#bab0ac",
        style: {
            width: $b84b4567b28066c9$var$p10,
            background: 'rgb(186, 176, 172)'
        }
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['tableau20'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "swatch"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#4c78a8",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(76, 120, 168)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#9ecae9",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(158, 202, 233)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#f58518",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(245, 133, 24)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ffbf79",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(255, 191, 121)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#54a24b",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(84, 162, 75)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#88d27a",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(136, 210, 122)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#b79a20",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(183, 154, 32)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#f2cf5b",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(242, 207, 91)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#439894",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(67, 152, 148)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#83bcb6",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(131, 188, 182)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#e45756",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(228, 87, 86)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#ff9d98",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(255, 157, 152)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#79706e",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(121, 112, 110)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#bab0ac",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(186, 176, 172)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#d67195",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(214, 113, 149)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#fcbfd2",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(252, 191, 210)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#b279a2",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(178, 121, 162)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#d6a5c9",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(214, 165, 201)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#9e765f",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(158, 118, 95)'
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        title: "#d8b5a5",
        style: {
            width: $b84b4567b28066c9$var$p20,
            background: 'rgb(216, 181, 165)'
        }
    }));
    $b84b4567b28066c9$var$loaded = true;
}
function $b84b4567b28066c9$export$611bfd724451b55b(selected) {
    if (!$b84b4567b28066c9$var$loaded) $b84b4567b28066c9$var$load();
    return [
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'accent'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'category10'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'category20'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'category20b'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'category20c'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'dark2'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'paired'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'pastel1'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'pastel2'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'set1'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'set2'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'set3'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'tableau10'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'tableau20')
    ];
}




let $97abaf0b46d2dfff$var$loaded = false;
function $97abaf0b46d2dfff$var$load() {
    $e853b633102ebdad$export$bffb04186d5bb00c['blueorange'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-blueorange"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(5, 48, 97)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(34, 101, 163)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(75, 148, 196)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(143, 194, 221)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(205, 227, 238)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(242, 240, 235)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(253, 221, 179)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(248, 182, 100)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(221, 132, 31)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(178, 90, 9)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(127, 59, 8)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-blueorange)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['brownbluegreen'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-brownbluegreen"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(84, 48, 5)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(139, 84, 15)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(188, 132, 53)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(222, 190, 123)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(242, 228, 192)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(238, 241, 234)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(195, 231, 226)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(127, 201, 191)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(57, 152, 143)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(10, 103, 95)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 60, 48)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-brownbluegreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['purplegreen'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-purplegreen"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(64, 0, 75)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(115, 47, 128)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(154, 109, 170)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(193, 164, 205)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(228, 210, 230)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(239, 240, 239)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(214, 238, 209)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(162, 215, 158)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(92, 173, 101)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(33, 120, 57)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 68, 27)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-purplegreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['pinkyellowgreen'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-pinkyellowgreen"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(142, 1, 82)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(192, 38, 126)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(221, 114, 173)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(240, 179, 214)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(250, 221, 237)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(245, 243, 239)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(225, 242, 202)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(182, 222, 135)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(128, 187, 71)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(79, 145, 37)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(39, 100, 25)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-pinkyellowgreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['purpleorange'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-purpleorange"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(45, 0, 75)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(85, 45, 132)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(129, 112, 172)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(176, 170, 208)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(215, 215, 233)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(243, 238, 234)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(253, 221, 179)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(248, 182, 100)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(221, 132, 31)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(178, 90, 9)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(127, 59, 8)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-purpleorange)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['redblue'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-redblue"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(103, 0, 31)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(172, 32, 47)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(213, 96, 80)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(241, 163, 133)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(251, 215, 196)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(242, 239, 238)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(205, 227, 238)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(143, 194, 221)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(75, 148, 196)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(34, 101, 163)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(5, 48, 97)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-redblue)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['redgrey'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-redgrey"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(103, 0, 31)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(172, 32, 47)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(213, 96, 80)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(241, 163, 133)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(252, 216, 197)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(250, 244, 241)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(223, 223, 223)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(184, 184, 184)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(134, 134, 134)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(78, 78, 78)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(26, 26, 26)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-redgrey)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['redyellowblue'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-redyellowblue"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(165, 0, 38)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(212, 50, 44)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(241, 110, 67)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(252, 172, 100)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(254, 221, 144)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(250, 248, 193)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(220, 241, 236)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(171, 214, 232)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(117, 171, 208)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(74, 116, 180)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(49, 54, 149)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-redyellowblue)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['redyellowgreen'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-redyellowgreen"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(165, 0, 38)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(212, 50, 44)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(241, 110, 67)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(252, 172, 99)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(254, 221, 141)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(249, 247, 174)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(215, 238, 142)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(164, 216, 110)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(100, 188, 97)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(34, 150, 79)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 104, 55)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-redyellowgreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['spectral'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-spectral"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(158, 1, 66)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(209, 60, 75)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(240, 112, 74)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(252, 172, 99)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(254, 221, 141)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(251, 248, 176)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(224, 243, 161)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(169, 221, 162)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(105, 189, 169)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(66, 136, 181)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(94, 79, 162)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-spectral)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $97abaf0b46d2dfff$var$loaded = true;
}
function $97abaf0b46d2dfff$export$dd1d85fd681382cc(selected) {
    if (!$97abaf0b46d2dfff$var$loaded) $97abaf0b46d2dfff$var$load();
    return [
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'blueorange'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'brownbluegreen'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'purplegreen'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'pinkyellowgreen'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'purpleorange'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'redblue'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'redgrey'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'redyellowblue'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'redyellowgreen'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'spectral')
    ];
}






let $8090ea68ee1d329a$var$loaded = false;
function $8090ea68ee1d329a$var$load() {
    $385418a87250916e$exports.colorSchemes.filter((cs)=>cs.colors.length === 2
    ).map((binaryScheme, i)=>{
        $e853b633102ebdad$export$bffb04186d5bb00c[binaryScheme.scheme] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
            className: "swatch"
        }, binaryScheme.colors.map((color, j)=>$c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                key: j,
                title: color,
                style: {
                    width: '50%',
                    backgroundColor: color
                }
            })
        ));
    });
    $8090ea68ee1d329a$var$loaded = true;
}
function $8090ea68ee1d329a$export$c6c021d4e17c9da4(selected) {
    if (!$8090ea68ee1d329a$var$loaded) $8090ea68ee1d329a$var$load();
    return $385418a87250916e$exports.colorSchemes.filter((cs)=>cs.colors.length === 2
    ).map((binaryScheme, i)=>$e853b633102ebdad$export$b467f28d73d9ef5b(selected, binaryScheme.scheme)
    );
}






let $fe9d4abaa233b5b6$var$loaded = false;
function $fe9d4abaa233b5b6$var$load() {
    $e853b633102ebdad$export$bffb04186d5bb00c['viridis'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-viridis"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "#440154"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "#482475"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "#414487"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "#355f8d"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "#2a788e"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "#21918c"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "#22a884"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "#44bf70"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "#7ad151"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "#bddf26"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "#fde725"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-viridis)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['inferno'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-inferno"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "#000004"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "#160b39"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "#420a68"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "#6a176e"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "#932667"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "#bc3754"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "#dd513a"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "#f37819"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "#fca50a"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "#f6d746"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "#fcffa4"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-inferno)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['magma'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-magma"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "#000004"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "#140e36"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "#3b0f70"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "#641a80"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "#8c2981"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "#b73779"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "#de4968"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "#f7705c"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "#fe9f6d"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "#fecf92"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "#fcfdbf"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-magma)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['plasma'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-plasma"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "#0d0887"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "#41049d"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "#6a00a8"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "#8f0da4"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "#b12a90"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "#cc4778"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "#e16462"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "#f2844b"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "#fca636"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "#fcce25"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "#f0f921"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-plasma)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['bluegreen'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-bluegreen"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(247, 252, 253)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(232, 246, 249)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(213, 239, 237)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(183, 228, 218)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(143, 211, 193)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(104, 194, 163)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(73, 177, 127)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(47, 153, 89)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(21, 127, 60)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(3, 100, 41)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 68, 27)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-bluegreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['bluepurple'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-bluepurple"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(247, 252, 253)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(228, 238, 245)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(204, 221, 236)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(178, 202, 225)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(156, 179, 213)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(143, 149, 198)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(140, 116, 181)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(137, 82, 165)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(133, 45, 143)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(115, 15, 113)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(77, 0, 75)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-bluepurple)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['greenblue'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-greenblue"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(247, 252, 240)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(229, 245, 223)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(211, 238, 206)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(189, 229, 191)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(158, 217, 187)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(123, 203, 196)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(88, 183, 205)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(57, 156, 198)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(29, 126, 183)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(11, 96, 161)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(8, 64, 129)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-greenblue)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['orangered'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-orangered"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 247, 236)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(254, 235, 207)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(253, 220, 175)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(253, 202, 148)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(253, 176, 122)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(250, 142, 93)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(241, 108, 73)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(224, 69, 48)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(200, 29, 19)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(167, 4, 3)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(127, 0, 0)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-orangered)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['purplebluegreen'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-purplebluegreen"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 247, 251)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(239, 231, 242)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(219, 216, 234)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(190, 201, 226)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(152, 185, 217)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(105, 168, 207)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(64, 150, 192)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(25, 135, 159)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(3, 120, 119)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(1, 99, 83)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(1, 70, 54)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-purplebluegreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['purpleblue'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-purpleblue"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 247, 251)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(239, 234, 244)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(219, 218, 235)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(191, 201, 226)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(155, 185, 217)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(114, 168, 207)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(67, 148, 195)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(26, 125, 182)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(6, 103, 161)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(4, 82, 129)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(2, 56, 88)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-purpleblue)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['purplered'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-purplered"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(247, 244, 249)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(234, 227, 240)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(220, 201, 226)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(208, 170, 210)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(208, 138, 194)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(221, 99, 174)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(227, 56, 144)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(215, 28, 108)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(183, 11, 79)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(143, 2, 58)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(103, 0, 31)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-purplered)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['redpurple'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-redpurple"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 247, 243)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(253, 228, 225)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(252, 207, 204)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(251, 181, 188)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(249, 147, 176)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(243, 105, 163)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(224, 62, 152)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(192, 23, 136)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(153, 3, 124)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(112, 1, 116)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(73, 0, 106)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-redpurple)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['yellowgreenblue'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-yellowgreenblue"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 255, 217)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(239, 249, 189)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(213, 238, 179)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(169, 221, 183)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(115, 201, 189)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(69, 180, 194)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(40, 151, 191)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(32, 115, 178)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(35, 78, 160)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(28, 49, 133)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(8, 29, 88)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-yellowgreenblue)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['yellowgreen'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-yellowgreen"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 255, 229)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(247, 252, 196)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(228, 244, 172)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(199, 232, 155)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(162, 216, 138)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(120, 197, 120)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(78, 175, 99)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(47, 148, 78)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(21, 121, 63)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(3, 96, 52)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 69, 41)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-yellowgreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['yelloworangebrown'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-yelloworangebrown"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 255, 229)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(255, 248, 196)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(254, 234, 161)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(254, 214, 118)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(254, 186, 74)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(251, 153, 44)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(238, 121, 24)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(216, 91, 10)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(183, 67, 4)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(143, 50, 4)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(102, 37, 6)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-yelloworangebrown)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['yelloworangered'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-yelloworangered"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 255, 204)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(255, 240, 169)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(254, 224, 135)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(254, 201, 101)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(254, 171, 75)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(253, 137, 60)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(250, 92, 46)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(236, 48, 35)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(211, 17, 33)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(175, 2, 37)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(128, 0, 38)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-yelloworangered)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $fe9d4abaa233b5b6$var$loaded = true;
}
function $fe9d4abaa233b5b6$export$6d349cc9a31d474e(selected) {
    if (!$fe9d4abaa233b5b6$var$loaded) $fe9d4abaa233b5b6$var$load();
    return [
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'viridis'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'inferno'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'magma'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'plasma'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'bluegreen'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'bluepurple'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'greenblue'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'orangered'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'purplebluegreen'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'purpleblue'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'purplered'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'redpurple'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'yellowgreenblue'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'yellowgreen'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'yelloworangebrown'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'yelloworangered')
    ];
}




let $2c722382b9c98d40$var$loaded = false;
function $2c722382b9c98d40$var$load() {
    $e853b633102ebdad$export$bffb04186d5bb00c['blues'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-blues"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(247, 251, 255)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(227, 238, 249)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(207, 225, 242)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(181, 212, 233)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(147, 195, 223)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(109, 174, 213)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(75, 151, 201)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(47, 126, 188)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(24, 100, 170)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(10, 74, 144)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(8, 48, 107)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-blues)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['greens'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-greens"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(247, 252, 245)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(232, 246, 227)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(211, 238, 205)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(183, 226, 177)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(151, 212, 148)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(115, 195, 120)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(77, 175, 98)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(47, 152, 79)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(21, 127, 59)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(3, 100, 41)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 68, 27)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-greens)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['greys'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-greys"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 255, 255)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(242, 242, 242)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(226, 226, 226)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(206, 206, 206)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(180, 180, 180)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(151, 151, 151)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(122, 122, 122)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(95, 95, 95)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(64, 64, 64)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(30, 30, 30)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 0, 0)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-greys)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['purples'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-purples"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(252, 251, 253)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(241, 239, 246)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(226, 225, 239)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(206, 206, 229)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(182, 181, 216)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(158, 155, 201)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(135, 130, 188)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(115, 99, 172)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(97, 64, 155)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(80, 31, 140)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(63, 0, 125)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-purples)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['reds'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-reds"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 245, 240)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(254, 227, 214)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(253, 201, 180)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(252, 170, 142)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(252, 138, 107)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(249, 105, 76)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(239, 69, 51)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(217, 39, 35)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(187, 21, 26)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(151, 11, 19)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(103, 0, 13)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-reds)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $e853b633102ebdad$export$bffb04186d5bb00c['oranges'] = $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("defs", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("linearGradient", {
        id: "gradient-oranges"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 245, 235)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(254, 232, 211)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(253, 216, 179)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(253, 194, 140)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(253, 167, 98)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(251, 141, 61)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(242, 112, 29)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(226, 86, 9)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(196, 65, 3)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(159, 51, 3)"
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(127, 39, 4)"
    }))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("rect", {
        fill: "url(#gradient-oranges)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $2c722382b9c98d40$var$loaded = true;
}
function $2c722382b9c98d40$export$86e9ca20e9e50ee0(selected) {
    if (!$2c722382b9c98d40$var$loaded) $2c722382b9c98d40$var$load();
    return [
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'blues'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'greens'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'greys'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'purples'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'reds'),
        $e853b633102ebdad$export$b467f28d73d9ef5b(selected, 'oranges')
    ];
}



const $36a7aa12c97398d2$var$maxDistinctColors = 20;
function $36a7aa12c97398d2$export$2eb9bde86c5870cc(props) {
    const { distinctValueCount: distinctValueCount  } = props.colorColumn.stats;
    let isDual = distinctValueCount === 2;
    const categoricalNumeric = distinctValueCount > 0 && distinctValueCount < $36a7aa12c97398d2$var$maxDistinctColors;
    let isQualitative = false;
    let isQuantitative = false;
    switch(props.colorColumn.type){
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
    const selected = props.scheme;
    const options = [];
    function menu(name, opts) {
        options.push({
            key: name,
            text: name,
            itemType: $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DropdownMenuItemType.Header
        });
        options.push.apply(options, opts);
    }
    isQualitative && menu($d3f49cd4a4ebf638$export$e345c26dc94dc116.schemeCategorical, $b84b4567b28066c9$export$611bfd724451b55b(selected));
    isQuantitative && menu($d3f49cd4a4ebf638$export$e345c26dc94dc116.schemeSequentialSingleHue, $2c722382b9c98d40$export$86e9ca20e9e50ee0(selected));
    isQuantitative && menu($d3f49cd4a4ebf638$export$e345c26dc94dc116.schemeSequentialMultiHue, $fe9d4abaa233b5b6$export$6d349cc9a31d474e(selected));
    isQuantitative && menu($d3f49cd4a4ebf638$export$e345c26dc94dc116.schemeDiverging, $97abaf0b46d2dfff$export$dd1d85fd681382cc(selected));
    isDual && menu($d3f49cd4a4ebf638$export$e345c26dc94dc116.schemeDual, $8090ea68ee1d329a$export$c6c021d4e17c9da4(selected));
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sanddance-palette"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sanddance-explanation",
        dangerouslySetInnerHTML: {
            __html: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColorFieldInfo(props.colorColumn.name, props.colorColumn.type, categoricalNumeric, distinctValueCount)
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($6b702e1ad8ceb63e$export$30a13326eaae8e00, {
        collapseLabel: props.collapseLabel,
        disabled: props.disabled,
        dropdownWidth: 400,
        label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColorScheme,
        onRenderOption: (option)=>{
            if (option.itemType === $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DropdownMenuItemType.Header) return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("span", null, option.text);
            else return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                className: "sanddance-scheme option"
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("span", {
                className: "name"
            }, option.scheme), option.children);
        },
        options: options,
        onChange: (e, o)=>{
            props.changeColorScheme(o.scheme);
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: $6e437f743d80b3ba$exports.classList('sanddance-scheme', props.disabled && 'disabled')
    }, props.scheme && $e853b633102ebdad$export$bffb04186d5bb00c[props.scheme]));
}





function $bb63fdf99ae08a83$export$e4830c8e55b4f80d(props) {
    const colorColumn = props.dataContent.columns.filter((c)=>c.name === props.colorColumn
    )[0];
    const disabledColorBin = !colorColumn || !colorColumn.quantitative || props.directColor;
    const colorBin = props.colorBin || 'quantize';
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sanddance-color-dialog"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
        label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColor
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($d359193c5ab9f387$export$ac5b76d1f02dd063, Object.assign({
    }, props, {
        collapseLabel: props.compactUI,
        selectedColumnName: props.colorColumn,
        specRole: props.specCapabilities && props.specCapabilities.roles.filter((r)=>r.role === 'color'
        )[0],
        key: 0
    })), colorColumn && colorColumn.isColorData && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sanddance-explanation",
        dangerouslySetInnerHTML: {
            __html: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColorFieldIsColorData(colorColumn.name)
        }
    }), colorColumn && !colorColumn.isColorData && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($36a7aa12c97398d2$export$2eb9bde86c5870cc, {
        collapseLabel: props.compactUI,
        scheme: props.scheme,
        colorColumn: colorColumn,
        changeColorScheme: (scheme)=>{
            props.onColorSchemeChange(scheme);
        },
        disabled: props.disabled || props.directColor || colorColumn && colorColumn.isColorData
    }), colorColumn && !colorColumn.isColorData && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($9339840789a2dc56$export$50478d543b96dfd6, {
        disabled: props.disabled || !colorColumn || props.directColor || colorColumn && colorColumn.isColorData,
        signal: props.colorReverseSignal,
        explorer: props.explorer,
        onChange: props.onColorReverseChange,
        collapseLabel: props.compactUI
    })), colorColumn && !colorColumn.isColorData && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
        label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColorBin
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sanddance-explanation"
    }, $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColorBinExplanation), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.ChoiceGroup, {
        options: [
            {
                key: 'continuous',
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColorBinNone,
                checked: colorBin === 'continuous',
                disabled: disabledColorBin
            },
            {
                key: 'quantize',
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColorBinQuantize,
                checked: colorBin === 'quantize',
                disabled: disabledColorBin
            },
            {
                key: 'quantile',
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColorBinQuantile,
                checked: colorBin === 'quantile',
                disabled: disabledColorBin
            }
        ],
        onChange: (e, o)=>{
            props.onColorBinChange(o.key);
        }
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($9339840789a2dc56$export$50478d543b96dfd6, {
        disabled: props.disabled || disabledColorBin || props.colorBin === 'continuous',
        signal: props.colorBinSignal,
        explorer: props.explorer,
        onChange: props.onColorBinCountChange,
        collapseLabel: props.compactUI
    })), colorColumn && !colorColumn.isColorData && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
        label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelColorOptions
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Toggle, {
        label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectDirectColor,
        disabled: !colorColumn.stats.hasColorData,
        checked: !!(colorColumn.stats.hasColorData && props.directColor),
        onChange: (e, checked)=>props.onDirectColorChange(checked)
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sanddance-explanation",
        dangerouslySetInnerHTML: {
            __html: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelDataColors
        }
    })));
}





const $0a1de8c04d50d308$export$840ab787eaee4157 = {
    ENTER: 13
};




function $3d49625ec08ed011$var$isNumber(value) {
    if (typeof value === 'number') return true;
    if (!isNaN(value)) return true;
    return false;
}
function $3d49625ec08ed011$var$isBoolean(value) {
    if (typeof value === 'boolean') return true;
    if (typeof value === 'string') switch(value.toLowerCase()){
        case "true":
        case "false":
            return true;
    }
    return false;
}
function $3d49625ec08ed011$var$bingSearchLink(column, value) {
    if ($3d49625ec08ed011$var$isNumber(value)) return null;
    if ($3d49625ec08ed011$var$isBoolean(value)) return null;
    if (column && column.stats.distinctValueCount === 2) return null;
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: 'bing-search'
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("a", {
        href: `https://www.bing.com/search?q=${encodeURIComponent(value)}`,
        target: '_blank',
        title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.bingsearchDescription(value),
        "aria-label": $d3f49cd4a4ebf638$export$e345c26dc94dc116.bingsearchDescription(value)
    }, $d3f49cd4a4ebf638$export$e345c26dc94dc116.bingsearch));
}
function $3d49625ec08ed011$var$displayValue(value) {
    switch(value){
        case '':
            return {
                special: true,
                display: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelBlank
            };
        case null:
            return {
                special: true,
                display: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelNull
            };
        case true:
            return {
                special: true,
                display: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelTrue
            };
        case false:
            return {
                special: true,
                display: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelFalse
            };
        default:
            if (typeof value === 'object') {
                if (value instanceof Date) {
                    const d = value;
                    return $3d49625ec08ed011$var$displayValue(d.input);
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
function $3d49625ec08ed011$var$displayValueElement(nvp) {
    const d = $3d49625ec08ed011$var$displayValue(nvp.value);
    if (d.special) return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("i", null, d.display);
    return d.display;
}
function $3d49625ec08ed011$export$cac33346369183d6(props) {
    if (!props.item) return null;
    const nameValuePairs = [];
    for(let columnName in props.item){
        if (columnName === $385418a87250916e$exports.constants.GL_ORDINAL && !props.showSystemFields) continue;
        if ($385418a87250916e$exports.util.isInternalFieldName(columnName)) continue;
        let nameValuePair = {
            columnName: columnName,
            value: props.item[columnName]
        };
        if (!props.bingSearchDisabled) nameValuePair.bingSearch = $3d49625ec08ed011$var$bingSearchLink(props.columns.filter((c)=>c.name === columnName
        )[0], props.item[columnName]);
        nameValuePairs.push(nameValuePair);
    }
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "sanddance-dataItem"
    }, nameValuePairs.map((nameValuePair, i)=>{
        const ex = {
            key: 0,
            name: nameValuePair.columnName,
            operator: '==',
            value: nameValuePair.value
        };
        if (nameValuePair.value === null || nameValuePair.value === '') {
            ex.operator = 'isnullorEmpty';
            delete ex.value;
        }
        const searchClick = (e)=>{
            const search = {
                key: 0,
                expressions: [
                    ex
                ]
            };
            props.onSearch(e, [
                search
            ]);
        };
        const title = $d3f49cd4a4ebf638$export$e345c26dc94dc116.tooltipSearch(nameValuePair.columnName, $3d49625ec08ed011$var$displayValue(nameValuePair.value).display);
        return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
            key: i,
            onClick: !props.disabled ? searchClick : null,
            title: title,
            onKeyUp: (e)=>{
                if (e.keyCode === $0a1de8c04d50d308$export$840ab787eaee4157.ENTER) searchClick(e);
            },
            tabIndex: 0,
            className: "name-value"
        }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
            className: "column-name"
        }, nameValuePair.columnName), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
            className: "column-value"
        }, $3d49625ec08ed011$var$displayValueElement(nameValuePair)), nameValuePair.bingSearch);
    }));
}







function $5d47ce1436721dba$export$50d5d540831edcd1(props) {
    function activateRecord(newIndex) {
        props.onActivate(props.data[newIndex], newIndex);
    }
    const { index: index  } = props;
    const length = props.data && props.data.length || 0;
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
        label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelDataBrowser,
        className: "sanddance-dataIndex"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($6b702e1ad8ceb63e$export$30a13326eaae8e00, {
        label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelDataScope,
        collapseLabel: true,
        options: [
            {
                key: $0338ff3c02daec02$export$1c6888b44b81730b.AllData,
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectDataSpanAll,
                isSelected: props.selectedDataScope === $0338ff3c02daec02$export$1c6888b44b81730b.AllData
            },
            {
                key: $0338ff3c02daec02$export$1c6888b44b81730b.FilteredData,
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectDataSpanFilter,
                isSelected: props.selectedDataScope === $0338ff3c02daec02$export$1c6888b44b81730b.FilteredData
            },
            {
                key: $0338ff3c02daec02$export$1c6888b44b81730b.SelectedData,
                text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.selectDataSpanSelection,
                isSelected: props.selectedDataScope === $0338ff3c02daec02$export$1c6888b44b81730b.SelectedData
            }
        ],
        onChange: (e, o)=>{
            props.onDataScopeClick(o.key);
        }
    }), !props.data && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        dangerouslySetInnerHTML: {
            __html: props.nullMessage
        }
    }), props.data && !props.data.length && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, props.zeroMessage), !!length && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "index"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($118d0de4ae8ff9c2$export$aa4364103b35a0bd, {
        themePalette: props.themePalette,
        iconName: "ChevronLeftMed",
        onClick: (e)=>activateRecord(index <= 0 ? length - 1 : index - 1)
        ,
        disabled: props.disabled || length === 1,
        title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonPrevDataItem
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("span", null, $d3f49cd4a4ebf638$export$e345c26dc94dc116.record(index + 1, length)), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($118d0de4ae8ff9c2$export$aa4364103b35a0bd, {
        themePalette: props.themePalette,
        iconName: "ChevronRightMed",
        onClick: (e)=>activateRecord(index >= length - 1 ? 0 : index + 1)
        ,
        disabled: props.disabled || length === 1,
        title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonNextDataItem
    })), !props.itemVisible && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        className: "item-filtered"
    }, $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelDataItemIsFiltered), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($3d49625ec08ed011$export$cac33346369183d6, {
        columns: props.columns,
        item: props.data[index],
        disabled: props.disabled,
        onSearch: props.onSearch,
        bingSearchDisabled: props.bingSearchDisabled
    })), props.dataExportHandler && props.data && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($ddc28421fe6d69d0$export$ca7914cbf553e128, {
        theme: props.theme,
        initializer: {
            fileName: `${$ddc28421fe6d69d0$export$961ee36a1df3ff5f(props.displayName)} (${props.data.length})`
        },
        data: props.data,
        dataExportHandler: props.dataExportHandler,
        disabled: props.disabled
    }));
}







function $f47f6bdc0d13e7a0$export$36b6e53ba8daf232(props) {
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($53aa18c6dd19d0a6$export$a145e63780346cea, {
        label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelHistory,
        className: "sanddance-history"
    }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("ol", null, props.historyItems.map((hi, i)=>$c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("li", {
            key: i,
            className: $6e437f743d80b3ba$exports.classList(i === props.historyIndex && 'selected'),
            onKeyUp: (e)=>{
                if (e.keyCode === $0a1de8c04d50d308$export$840ab787eaee4157.ENTER) props.redo(i);
            },
            onClick: ()=>props.redo(i)
            ,
            tabIndex: 0
        }, hi.label)
    )));
}








// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function $66cf349a20090358$var$hasClientXY(e) {
    if (e && e.clientX !== undefined && e.clientX !== undefined) return {
        top: e.clientY,
        left: e.clientX
    };
}
function $66cf349a20090358$export$27a0d3353083cdc6(e) {
    let xy = $66cf349a20090358$var$hasClientXY(e);
    if (xy) return xy;
    const te = e;
    if (te) for(let i = 0; i < te.touches.length; i++){
        let xy1 = $66cf349a20090358$var$hasClientXY(te.touches[i]);
        if (xy1) return xy1;
    }
}



function $96c12964caac8c31$export$e56fb8381b0a349a(prefs, partialInsight) {
    if (partialInsight) {
        const specTypePrefs = prefs[partialInsight.chart] || {
        };
        prefs[partialInsight.chart] = specTypePrefs;
        for(let _role in partialInsight.columns){
            let role = _role;
            if (role === 'color' || role === 'x') {
                let rolePrefs = specTypePrefs[role] || {
                };
                specTypePrefs[role] = rolePrefs;
                let column = partialInsight.columns[role];
                let copySignalValue = (signalName)=>{
                    if (partialInsight.signalValues && partialInsight.signalValues[signalName] && rolePrefs[column]) {
                        const signalValues = rolePrefs[column].signalValues || {
                        };
                        signalValues[signalName] = partialInsight.signalValues[signalName];
                        rolePrefs[column].signalValues = signalValues;
                    }
                };
                switch(role){
                    case 'color':
                        rolePrefs[column] = {
                            scheme: partialInsight.scheme,
                            colorBin: partialInsight.colorBin
                        };
                        copySignalValue($385418a87250916e$exports.constants.SignalNames.ColorBinCount);
                        break;
                    case 'x':
                        copySignalValue($385418a87250916e$exports.constants.SignalNames.XBins);
                        break;
                }
            }
        }
    }
}
function $96c12964caac8c31$export$c8fe9eec9afc2414(prefs, chart, role, column, signalName, signalValue) {
    const partialInsight = $96c12964caac8c31$export$79057c9e8e65cb3c(prefs, chart, role, column, {
        signalValues: {
        }
    });
    partialInsight.signalValues[signalName] = signalValue;
}
function $96c12964caac8c31$export$96ae7597659105d4(prefs, chart, role, columnName) {
    const specTypePrefs = $385418a87250916e$exports.VegaDeckGl.util.deepMerge({
    }, prefs['*'], prefs[chart]);
    const rolePrefs = $385418a87250916e$exports.VegaDeckGl.util.deepMerge({
    }, specTypePrefs['*'], specTypePrefs[role]);
    const partialInsight = $385418a87250916e$exports.VegaDeckGl.util.deepMerge({
    }, rolePrefs['*'], rolePrefs[columnName]);
    return partialInsight;
}
function $96c12964caac8c31$export$79057c9e8e65cb3c(prefs, chart, role, column, partialInsight) {
    const SpecTypePrefs = prefs[chart] || {
    };
    prefs[chart] = SpecTypePrefs;
    const rolePrefs = SpecTypePrefs[role] || {
    };
    SpecTypePrefs[role] = rolePrefs;
    rolePrefs[column] = $385418a87250916e$exports.VegaDeckGl.util.deepMerge({
    }, rolePrefs[column], partialInsight);
    return rolePrefs[column];
}




function $26a6576ea7ad3be3$var$comparableGroup(group) {
    return Object.assign(Object.assign({
    }, group), {
        clause: null
    });
}
function $26a6576ea7ad3be3$var$compareGroup(a, b) {
    return $385418a87250916e$exports.searchExpression.compareGroup($26a6576ea7ad3be3$var$comparableGroup(a), $26a6576ea7ad3be3$var$comparableGroup(b));
}
function $26a6576ea7ad3be3$export$94cca925abc30578(haystack, needle) {
    const groups = [];
    let found = false;
    //look for item in all
    haystack.forEach((group)=>{
        if ($26a6576ea7ad3be3$var$compareGroup(group, needle)) //if it exists, don't add it
        found = true;
        else groups.push(group);
    });
    return {
        groups: groups,
        found: found
    };
}




const $b44f404896596941$var$dataBrowserZeroMessages = {
};
$b44f404896596941$var$dataBrowserZeroMessages[$0338ff3c02daec02$export$1c6888b44b81730b.AllData] = $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelZeroAll;
$b44f404896596941$var$dataBrowserZeroMessages[$0338ff3c02daec02$export$1c6888b44b81730b.FilteredData] = null; //empty array is not used
$b44f404896596941$var$dataBrowserZeroMessages[$0338ff3c02daec02$export$1c6888b44b81730b.SelectedData] = $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelZeroSearchResults;
const $b44f404896596941$var$dataBrowserNullMessages = {
};
$b44f404896596941$var$dataBrowserNullMessages[$0338ff3c02daec02$export$1c6888b44b81730b.AllData] = $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelDataNullAll;
$b44f404896596941$var$dataBrowserNullMessages[$0338ff3c02daec02$export$1c6888b44b81730b.FilteredData] = $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelDataNullFiltered;
$b44f404896596941$var$dataBrowserNullMessages[$0338ff3c02daec02$export$1c6888b44b81730b.SelectedData] = $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelDataNullSelection;
function $b44f404896596941$var$createInputSearch(search) {
    const groups = $385418a87250916e$exports.searchExpression.ensureSearchExpressionGroupArray(search);
    const dialogSearch = groups.map((group, groupIndex)=>{
        return Object.assign(Object.assign({
            key: groupIndex
        }, group), {
            expressions: group.expressions.map((ex, i)=>{
                const ex2 = Object.assign({
                    key: i
                }, ex);
                return ex2;
            })
        });
    });
    return dialogSearch;
}
function $b44f404896596941$var$_Explorer(props) {
    class __Explorer extends $c5e1961a7f97a459$export$12896e353ebd9cc.react.Component {
        constructor(props1){
            super(props1);
            this.state = {
                calculating: null,
                errors: null,
                autoCompleteDistinctValues: {
                },
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
                sideTabId: $065798d25a9d250c$export$b264ae1d75dc4e4e.ChartType,
                dataScopeId: $0338ff3c02daec02$export$1c6888b44b81730b.AllData,
                selectedItemIndex: {
                },
                sidebarClosed: false,
                sidebarPinned: true,
                view: props1.initialView || '2d',
                snapshots: [],
                selectedSnapshotIndex: -1,
                tooltipExclusions: [],
                positionedColumnMapProps: null,
                note: null,
                historyIndex: -1,
                historyItems: []
            };
            this.state.selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.AllData] = 0;
            this.state.selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.FilteredData] = 0;
            this.state.selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.SelectedData] = 0;
            this.snapshotThumbWidth = $4c9aa6a92253ee73$export$df0185090c61e4ef;
            this.discardColorContextUpdates = true;
            this.updateViewerOptions(Object.assign(Object.assign({
            }, $385418a87250916e$exports.VegaDeckGl.util.clone($385418a87250916e$exports.Viewer.defaultViewerOptions)), props1.viewerOptions));
        }
        finalize() {
            if (this.viewer) this.viewer.finalize();
        }
        updateViewerOptions(viewerOptions) {
            this.viewerOptions = Object.assign(Object.assign({
            }, $385418a87250916e$exports.VegaDeckGl.util.deepMerge($4c9aa6a92253ee73$export$23e61e65e99ffb54, this.viewerOptions, viewerOptions)), {
                tooltipOptions: {
                    exclude: (columnName)=>this.state.tooltipExclusions.indexOf(columnName) >= 0
                },
                onColorContextChange: ()=>this.manageColorToolbar()
                ,
                onDataFilter: (filter, filteredData)=>{
                    const selectedItemIndex = Object.assign({
                    }, this.state.selectedItemIndex);
                    selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.FilteredData] = 0;
                    this.changeInsight({
                        filter: filter
                    }, {
                        label: this.historicFilterChange,
                        omit: !this.historicFilterChange
                    });
                    this.historicFilterChange = null;
                    this.setState({
                        filteredData: filteredData,
                        selectedItemIndex: selectedItemIndex
                    });
                    if (this.state.sideTabId === $065798d25a9d250c$export$b264ae1d75dc4e4e.Data && this.state.dataScopeId === $0338ff3c02daec02$export$1c6888b44b81730b.FilteredData) //make sure item is active
                    requestAnimationFrame(()=>filteredData && this.silentActivation(filteredData[0])
                    );
                    viewerOptions && viewerOptions.onDataFilter && viewerOptions.onDataFilter(filter, filteredData);
                },
                onSelectionChanged: (newSearch, index, selectedData)=>{
                    if (this.ignoreSelectionChange) return;
                    const selectedItemIndex = Object.assign({
                    }, this.state.selectedItemIndex);
                    selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.SelectedData] = index || 0;
                    let { search: search , sideTabId: sideTabId  } = this.state;
                    if (newSearch) search = $b44f404896596941$var$createInputSearch(newSearch);
                    this.setState({
                        search: search,
                        selectedItemIndex: selectedItemIndex,
                        sideTabId: sideTabId
                    });
                    viewerOptions && viewerOptions.onSelectionChanged && viewerOptions.onSelectionChanged(newSearch, index, selectedData);
                },
                onAxisClick: (e, search)=>{
                    this.toggleableSearch(e, search);
                    viewerOptions && viewerOptions.onAxisClick && viewerOptions.onAxisClick(e, search);
                },
                onLegendHeaderClick: (e)=>{
                    const pos = $66cf349a20090358$export$27a0d3353083cdc6(e);
                    const specRole = this.state.specCapabilities && this.state.specCapabilities.roles.filter((r)=>r.role === 'color'
                    )[0];
                    const positionedColumnMapProps = Object.assign(Object.assign({
                    }, this.getColumnMapBaseProps()), {
                        collapseLabel: true,
                        container: this.div,
                        selectedColumnName: this.state.columns['color'],
                        onDismiss: ()=>{
                            this.setState({
                                positionedColumnMapProps: null
                            });
                        },
                        specRole: specRole,
                        left: pos.left - this.div.clientLeft,
                        top: pos.top - this.div.clientTop
                    });
                    this.setState({
                        positionedColumnMapProps: positionedColumnMapProps
                    });
                },
                onLegendRowClick: (e, legendRow)=>{
                    this.toggleableSearch(e, legendRow.search);
                    viewerOptions && viewerOptions.onLegendRowClick && viewerOptions.onLegendRowClick(e, legendRow);
                },
                onError: (errors)=>{
                    this.setState({
                        errors: errors
                    });
                    viewerOptions && viewerOptions.onError && viewerOptions.onError(errors);
                },
                onBeforeCreateLayers: $111d368e10bec10f$export$7d34e96f399a3b0b,
                getTextColor: (o)=>{
                    if (o.specRole) return $385418a87250916e$exports.VegaDeckGl.util.colorFromString(this.viewerOptions.colors.clickableText);
                    else if (o.metaData && o.metaData.search) return $385418a87250916e$exports.VegaDeckGl.util.colorFromString(this.viewerOptions.colors.searchText);
                    else return o.color;
                },
                getTextHighlightAlphaCutoff: ()=>this.viewerOptions.colors.clickableTextHighlightAlphaCutoff
                ,
                getTextHighlightColor: (o)=>{
                    if (o.specRole) return $385418a87250916e$exports.VegaDeckGl.util.colorFromString(this.viewerOptions.colors.clickableTextHighlight);
                    else if (o.metaData && o.metaData.search) return $385418a87250916e$exports.VegaDeckGl.util.colorFromString(this.viewerOptions.colors.searchTextHighlight);
                    else return [
                        0,
                        0,
                        0,
                        0
                    ];
                },
                onTextClick: (e, text)=>{
                    if (e && text) {
                        const pos = $66cf349a20090358$export$27a0d3353083cdc6(e);
                        const { specRole: specRole  } = text;
                        if (pos && specRole) {
                            const positionedColumnMapProps = Object.assign(Object.assign({
                            }, this.getColumnMapBaseProps()), {
                                collapseLabel: true,
                                container: this.div,
                                selectedColumnName: this.state.columns[specRole.role],
                                onDismiss: ()=>{
                                    this.setState({
                                        positionedColumnMapProps: null
                                    });
                                },
                                specRole: specRole,
                                left: pos.left - this.div.clientLeft,
                                top: pos.top - this.div.clientTop
                            });
                            this.setState({
                                positionedColumnMapProps: positionedColumnMapProps
                            });
                        } else this.setState({
                            positionedColumnMapProps: null
                        });
                    }
                },
                onNewViewStateTarget: ()=>this.newViewStateTarget
            });
            if (this.viewer && this.viewer.presenter) {
                const newPresenterStyle = $385418a87250916e$exports.util.getPresenterStyle(this.viewerOptions);
                const mergePrenterStyle = Object.assign(Object.assign({
                }, this.viewer.presenter.style), newPresenterStyle);
                this.viewer.presenter.style = mergePrenterStyle;
                this.viewer.options = $385418a87250916e$exports.VegaDeckGl.util.deepMerge(this.viewer.options, this.props.viewerOptions, this.viewerOptions);
            }
        }
        signal(signalName, signalValue, newViewStateTarget) {
            switch(signalName){
                case $385418a87250916e$exports.constants.SignalNames.ColorBinCount:
                case $385418a87250916e$exports.constants.SignalNames.ColorReverse:
                case $385418a87250916e$exports.constants.SignalNames.MarkOpacity:
                    this.discardColorContextUpdates = false;
                    break;
            }
            this.newViewStateTarget = newViewStateTarget;
            this.viewer.vegaViewGl.signal(signalName, signalValue);
            this.viewer.vegaViewGl.runAsync().then(()=>{
                //deeply set the state without a state change. This prevents a redraw if re-rendered
                if (this.state.signalValues) this.state.signalValues[signalName] = signalValue;
                this.discardColorContextUpdates = true;
                this.newViewStateTarget = undefined;
                this.props.onSignalChanged && this.props.onSignalChanged(signalName, signalValue);
            });
        }
        manageColorToolbar() {
            const canRemap = this.viewer.colorContexts && this.viewer.colorContexts.length > 1;
            $41d7249449d225b2$export$d4e85aa8ca214f54(this.viewer.presenter, !!this.state.columns.color, {
                themePalette: $ffac552ad0872994$export$ab53ba4bd9c9d2ec[this.props.theme || ''],
                canRemap: canRemap,
                isRemap: canRemap && this.viewer.currentColorContext > 0,
                colorMapHandler: (remap)=>{
                    this.viewer.currentColorContext = ~~remap;
                    this.viewer.renderSameLayout();
                    this.manageColorToolbar();
                }
            });
        }
        getInsight() {
            return this.viewer.getInsight();
        }
        setInsight(historyAction, newState = {
        }, partialInsight = this.viewer.getInsight(), rebaseFilter = false) {
            const selectedItemIndex = Object.assign({
            }, this.state.selectedItemIndex);
            selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.AllData] = 0;
            selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.FilteredData] = 0;
            selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.SelectedData] = 0;
            const historicInsight = Object.assign({
                chart: null,
                scheme: null,
                columns: null,
                filter: null,
                rebaseFilter: rebaseFilter
            }, partialInsight);
            const state = Object.assign({
                filteredData: null,
                selectedItemIndex: selectedItemIndex,
                search: $b44f404896596941$var$createInputSearch(historicInsight.filter)
            }, newState);
            const changeInsight = ()=>{
                this.getColorContext = null;
                this.changeInsight(historicInsight, historyAction, state);
            };
            const currentFilter = this.viewer.getInsight().filter;
            if (rebaseFilter && currentFilter && historicInsight.filter) {
                if ($385418a87250916e$exports.searchExpression.startsWith(historicInsight.filter, currentFilter)) changeInsight();
                else this.viewer.reset().then(()=>new Promise((resolve, reject)=>{
                        setTimeout(resolve, this.viewer.options.transitionDurations.scope);
                    })
                ).then(changeInsight);
            } else changeInsight();
        }
        handleReviveSnapshot(snapshot, selectedSnapshotIndex) {
            let handled = false;
            if (this.props.onSnapshotClick) {
                this.setState({
                    selectedSnapshotIndex: selectedSnapshotIndex
                });
                handled = this.props.onSnapshotClick(snapshot, selectedSnapshotIndex);
            }
            if (!handled) this.reviveSnapshot(selectedSnapshotIndex);
        }
        reviveSnapshot(snapshotOrIndex) {
            if (typeof snapshotOrIndex === 'number') {
                const selectedSnapshotIndex = snapshotOrIndex;
                const snapshot = this.state.snapshots[selectedSnapshotIndex];
                const newState = {
                    note: snapshot.description,
                    selectedSnapshotIndex: selectedSnapshotIndex
                };
                if (!this.state.sidebarClosed) {
                    newState.sideTabId = $065798d25a9d250c$export$b264ae1d75dc4e4e.Snapshots;
                    this.scrollSnapshotIntoView(selectedSnapshotIndex);
                }
                this.setInsight({
                    label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelHistoryReviveSnapshot
                }, newState, snapshot.insight, true);
            } else {
                const snapshot = snapshotOrIndex;
                if (snapshot.insight) this.setInsight({
                    label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelHistoryReviveSnapshot
                }, {
                    note: snapshot.description,
                    selectedSnapshotIndex: -1
                }, snapshot.insight, true); //don't navigate to sideTab
                else this.setState({
                    note: snapshot.description,
                    selectedSnapshotIndex: -1
                });
            }
        }
        load(data, getPartialInsight, optionsOrPrefs) {
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
            return new Promise((resolve, reject)=>{
                const loadFinal = (dataContent)=>{
                    let partialInsight;
                    this.prefs = optionsOrPrefs && optionsOrPrefs.chartPrefs || optionsOrPrefs || {
                    };
                    if (getPartialInsight) {
                        partialInsight = getPartialInsight(dataContent.columns);
                        $96c12964caac8c31$export$e56fb8381b0a349a(this.prefs, partialInsight);
                    }
                    if (!partialInsight) {
                        //load recommendation
                        let r = new $2b9a71dc82b0fe6b$exports.RecommenderSummary(dataContent.columns, dataContent.data);
                        partialInsight = r.recommend();
                    }
                    partialInsight = Object.assign({
                        facetStyle: 'wrap',
                        filter: null,
                        totalStyle: null,
                        transform: null
                    }, partialInsight);
                    if (partialInsight.chart === 'barchart') partialInsight.chart = 'barchartV';
                    const selectedItemIndex = Object.assign({
                    }, this.state.selectedItemIndex);
                    const sideTabId = $065798d25a9d250c$export$b264ae1d75dc4e4e.ChartType;
                    selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.AllData] = 0;
                    selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.FilteredData] = 0;
                    selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.SelectedData] = 0;
                    let newState = Object.assign({
                        dataFile: dataFile,
                        dataContent: dataContent,
                        snapshots: dataContent.snapshots || this.state.snapshots,
                        autoCompleteDistinctValues: {
                        },
                        filteredData: null,
                        tooltipExclusions: optionsOrPrefs && optionsOrPrefs.tooltipExclusions || [],
                        selectedItemIndex: selectedItemIndex,
                        sideTabId: sideTabId
                    }, partialInsight);
                    this.getColorContext = null;
                    $3c7c0ab0b51acc22$export$d3f158f2cefb2dd8(newState.columns, dataContent.columns, newState.transform);
                    const errors = $3c7c0ab0b51acc22$export$3285e8a72d4ef75f(partialInsight === null || partialInsight === void 0 ? void 0 : partialInsight.chart, partialInsight === null || partialInsight === void 0 ? void 0 : partialInsight.totalStyle, newState.columns, dataContent.columns);
                    newState.errors = errors;
                    //change insight
                    this.changeInsight(partialInsight, {
                        label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelHistoryInit,
                        insert: true
                    }, newState);
                    //make sure item is active
                    this.activateDataBrowserItem(sideTabId, this.state.dataScopeId);
                    resolve();
                };
                let dataFile;
                if (Array.isArray(data)) return $3ec46caab6f4505c$export$5832599d7ffde789(data, 'json').then((result)=>{
                    dataFile = {
                        type: 'json'
                    };
                    loadFinal(result);
                }).catch(reject);
                else {
                    dataFile = data;
                    return $3ec46caab6f4505c$export$b7dc3aabb556dfb2(dataFile).then(loadFinal).catch(reject);
                }
            });
        }
        changeChartType(chart) {
            const partialInsight = $96c12964caac8c31$export$96ae7597659105d4(this.prefs, chart, '*', '*');
            const insight = Object.assign({
                chart: chart
            }, partialInsight);
            const columns = $385418a87250916e$exports.VegaDeckGl.util.deepMerge({
            }, partialInsight.columns, this.state.columns);
            const { signalValues: signalValues  } = this.viewer.getInsight();
            insight.signalValues = Object.assign(Object.assign({
            }, this.state.signalValues), signalValues);
            insight.columns = Object.assign({
            }, columns);
            insight.totalStyle = this.state.totalStyle;
            let errors;
            //special case mappings when switching chart type
            if (this.state.chart === 'scatterplot' && (chart === 'barchart' || chart === 'barchartV')) insight.columns = Object.assign(Object.assign({
            }, columns), {
                sort: columns.y
            });
            else if (this.state.chart === 'scatterplot' && chart === 'barchartH') insight.columns = Object.assign(Object.assign({
            }, columns), {
                sort: columns.x
            });
            else if (chart === 'treemap') {
                insight.view = '2d';
                if (!columns.size) {
                    //make sure size exists and is numeric
                    let sizeColumn;
                    //first check prefs
                    if (partialInsight && partialInsight.columns && partialInsight.columns.size) {
                        const prefSizeColumn = this.state.dataContent.columns.filter((c)=>c.name === partialInsight.columns.size
                        )[0];
                        if (prefSizeColumn && prefSizeColumn.quantitative) sizeColumn = prefSizeColumn;
                    }
                    if (!sizeColumn) sizeColumn = $3c7c0ab0b51acc22$export$22e2b85518a07a7(this.state.dataContent.columns);
                    if (!sizeColumn) //error - no numeric columns
                    errors = [
                        $d3f49cd4a4ebf638$export$e345c26dc94dc116.errorColumnMustBeNumeric
                    ];
                    else insight.columns = Object.assign(Object.assign({
                    }, columns), {
                        size: sizeColumn.name
                    });
                }
            } else if (chart === 'stacks') insight.view = '3d';
            $3c7c0ab0b51acc22$export$d3f158f2cefb2dd8(insight.columns, this.state.dataContent.columns, this.state.transform);
            errors = $3c7c0ab0b51acc22$export$3285e8a72d4ef75f(chart, insight.totalStyle, insight.columns, this.state.dataContent.columns);
            this.calculate(()=>{
                this.changeInsight(insight, {
                    label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelHistoryChangeChartType($1d75e5ac49b64589$export$3b8610020cb45508(chart))
                }, errors ? {
                    errors: errors
                } : null);
            });
        }
        calculate(calculating) {
            this.setState({
                calculating: calculating
            });
        }
        changeView(view) {
            this.changeInsight({
                view: view
            }, {
                label: view === '2d' ? $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelViewType2d : $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelViewType3d
            });
        }
        //state members which change the insight
        changeInsight(partialInsight, historyAction, additionalUIState) {
            if (partialInsight.chart === 'barchart') partialInsight.chart = 'barchartV';
            this.addHistory(partialInsight, historyAction, additionalUIState);
        }
        addHistory(historicInsight, historyAction, additionalUIState) {
            const setCleanState = (newState)=>{
                const cleanState = Object.assign(Object.assign({
                }, newState), additionalUIState);
                if (!cleanState.note) cleanState.note = null;
                delete cleanState.rebaseFilter;
                if (this.viewer) {
                    const { signalValues: signalValues  } = this.viewer.getInsight();
                    cleanState.signalValues = Object.assign(Object.assign(Object.assign({
                    }, this.state.signalValues), signalValues), cleanState.signalValues);
                }
                this.setState(cleanState);
            };
            if (historyAction.omit) {
                setCleanState(historicInsight);
                return;
            }
            const historyItems = this.state.historyItems.slice(0, this.state.historyIndex + 1);
            const historyIndex = historyItems.length;
            historyItems.push({
                label: historyAction.label,
                historicInsight: historicInsight
            });
            if (historyAction.insert) setCleanState({
                historyIndex: historyIndex,
                historyItems: historyItems
            });
            else setCleanState(Object.assign(Object.assign({
            }, historicInsight), {
                historyIndex: historyIndex,
                historyItems: historyItems
            }));
        }
        replay(index) {
            let filter = null;
            let historicInsight = {
            };
            for(let i = 0; i < index + 1; i++){
                const historyItem = this.state.historyItems[i];
                if (historyItem) {
                    if (historyItem.historicInsight.filter === null) filter = null;
                    else if (historyItem.historicInsight.rebaseFilter) filter = historyItem.historicInsight.filter;
                    else if (historyItem.historicInsight.filter) filter = $385418a87250916e$exports.searchExpression.narrow(filter, historyItem.historicInsight.filter);
                    historicInsight = Object.assign(Object.assign({
                    }, historicInsight), historyItem.historicInsight);
                }
            }
            return Object.assign(Object.assign({
            }, historicInsight), {
                filter: filter
            });
        }
        undo() {
            const historyIndex = this.state.historyIndex - 1;
            if (historyIndex < 0) return;
            const newState = this.replay(historyIndex);
            this.rebaseFilter = true;
            this.setState(Object.assign(Object.assign({
            }, newState), {
                historyIndex: historyIndex
            }));
        }
        redo(historyIndex = this.state.historyIndex + 1) {
            if (historyIndex >= this.state.historyItems.length) return;
            const newState = this.replay(historyIndex);
            this.rebaseFilter = true;
            this.setState(Object.assign(Object.assign({
            }, newState), {
                historyIndex: historyIndex
            }));
        }
        changespecCapabilities(specCapabilities) {
            this.setState({
                specCapabilities: specCapabilities
            });
        }
        changeColumnMapping(role, column, options) {
            const columns = Object.assign({
            }, this.state.columns);
            const label = column ? $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelHistoryMapColumn(role) : $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelHistoryUnMapColumn(role);
            const final = ()=>{
                const partialInsight = {
                    columns: columns,
                    totalStyle: options ? options.totalStyle : this.state.totalStyle
                };
                const errors = $3c7c0ab0b51acc22$export$3285e8a72d4ef75f(this.state.chart, partialInsight.totalStyle, partialInsight.columns, this.state.dataContent.columns);
                columns[role] = column && column.name;
                this.changeInsight(partialInsight, {
                    label: label
                }, errors ? {
                    errors: errors
                } : null);
            };
            const _changeInsight = (newInsight, columnUpdate, historyAction)=>{
                newInsight.columns = $385418a87250916e$exports.VegaDeckGl.util.deepMerge({
                }, columns, columnUpdate);
                $96c12964caac8c31$export$79057c9e8e65cb3c(this.prefs, this.state.chart, '*', '*', {
                    columns: columnUpdate
                });
                this.changeInsight(newInsight, historyAction);
            };
            if (column) {
                let columnUpdate;
                switch(role){
                    case 'facet':
                        {
                            $96c12964caac8c31$export$96ae7597659105d4(this.prefs, this.state.chart, 'facet', column.name);
                            const historicInsight = {
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
                            let calculating = null;
                            let historicInsight = {
                                scheme: options && options.scheme,
                                columns: columns,
                                colorBin: this.state.colorBin
                            };
                            if (!historicInsight.scheme) $96c12964caac8c31$export$96ae7597659105d4(this.prefs, this.state.chart, 'color', column.name);
                            if (!historicInsight.scheme) historicInsight.scheme = $aa1a81963e518cec$export$4ebf557d3792c9d7(column, null, this.state.scheme);
                            if (!column.stats.hasColorData) {
                                historicInsight.directColor = false;
                                if (this.state.directColor !== historicInsight.directColor) calculating = ()=>this._resize()
                                ;
                            }
                            if (this.state.columns && this.state.columns.color && this.state.columns.color !== column.name) {
                                const currColorColumn = this.state.dataContent.columns.filter((c)=>c.name === this.state.columns.color
                                )[0];
                                if (column.isColorData != currColorColumn.isColorData) calculating = ()=>this._resize()
                                ;
                            }
                            this.ignoreSelectionChange = true;
                            this.viewer.deselect().then(()=>{
                                this.ignoreSelectionChange = false;
                                //allow deselection to render
                                requestAnimationFrame(()=>{
                                    columnUpdate = {
                                        color: column.name
                                    };
                                    this.getColorContext = null;
                                    this.setState({
                                        calculating: calculating
                                    });
                                    _changeInsight(historicInsight, columnUpdate, {
                                        label: label
                                    });
                                });
                            });
                            break;
                        }
                    case 'x':
                        {
                            $96c12964caac8c31$export$96ae7597659105d4(this.prefs, this.state.chart, 'x', column.name);
                            const historicInsight = {
                                columns: columns
                            };
                            columnUpdate = {
                                x: column.name
                            };
                            _changeInsight(historicInsight, columnUpdate, {
                                label: label
                            });
                            break;
                        }
                    case 'size':
                        {
                            $96c12964caac8c31$export$96ae7597659105d4(this.prefs, this.state.chart, 'size', column.name);
                            const historicInsight = {
                                totalStyle: options ? options.totalStyle : this.state.totalStyle
                            };
                            columnUpdate = {
                                size: column.name
                            };
                            _changeInsight(historicInsight, columnUpdate, {
                                label: label
                            });
                            break;
                        }
                    default:
                        final();
                        break;
                }
            } else switch(role){
                case 'facet':
                    columns.facet = null;
                    columns.facetV = null;
                    this.changeInsight({
                        columns: columns,
                        facetStyle: 'wrap'
                    }, {
                        label: label
                    });
                    break;
                default:
                    final();
                    break;
            }
        }
        setSideTabId(sideTabId, dataScopeId) {
            if (sideTabId === $065798d25a9d250c$export$b264ae1d75dc4e4e.Data && dataScopeId == null) //choose most relevant DataScopeId
            dataScopeId = this.getBestDataScopeId();
            if (dataScopeId == null) dataScopeId = this.state.dataScopeId;
            this.setState({
                sideTabId: sideTabId,
                dataScopeId: dataScopeId,
                sidebarClosed: false
            });
            this.activateDataBrowserItem(sideTabId, dataScopeId);
        }
        getBestDataScopeId() {
            let dataScopeId;
            const selectionState = this.viewer && this.viewer.getSelection();
            if (selectionState && selectionState.selectedData && selectionState.selectedData.length) dataScopeId = $0338ff3c02daec02$export$1c6888b44b81730b.SelectedData;
            else if (this.state.filteredData) dataScopeId = $0338ff3c02daec02$export$1c6888b44b81730b.FilteredData;
            else dataScopeId = $0338ff3c02daec02$export$1c6888b44b81730b.AllData;
            return dataScopeId;
        }
        activateDataBrowserItem(sideTabId, dataScopeId) {
            if (!this.viewer) return;
            let itemToActivate;
            if (sideTabId === $065798d25a9d250c$export$b264ae1d75dc4e4e.Data) switch(dataScopeId){
                case $0338ff3c02daec02$export$1c6888b44b81730b.AllData:
                    itemToActivate = this.state.dataContent && this.state.dataContent.data[this.state.selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.AllData]];
                    break;
                case $0338ff3c02daec02$export$1c6888b44b81730b.FilteredData:
                    itemToActivate = this.state.filteredData && this.state.filteredData[this.state.selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.FilteredData]];
                    break;
                case $0338ff3c02daec02$export$1c6888b44b81730b.SelectedData:
                    {
                        const selection = this.viewer.getSelection() || {
                        };
                        itemToActivate = selection.selectedData && selection.selectedData[this.state.selectedItemIndex[$0338ff3c02daec02$export$1c6888b44b81730b.SelectedData]];
                        break;
                    }
            }
            this.silentActivation(itemToActivate);
        }
        silentActivation(itemToActivate) {
            this.ignoreSelectionChange = true;
            const done = ()=>{
                this.ignoreSelectionChange = false;
            };
            if (itemToActivate) return this.viewer.activate(itemToActivate).then(done);
            else return this.viewer.deActivate().then(done);
        }
        sidebar(sidebarClosed, sidebarPinned) {
            this.setState({
                sidebarClosed: sidebarClosed,
                sidebarPinned: sidebarPinned
            });
        }
        resize() {
            this.setState({
                calculating: ()=>this._resize()
            });
        }
        _resize() {
            this.changeInsight({
                size: this.getLayoutDivSize(this.state.sidebarPinned, this.state.sidebarClosed)
            }, {
                label: 'resize',
                omit: true
            });
        }
        viewerMounted(glDiv) {
            this.setState({
                size: this.getLayoutDivSize(this.state.sidebarPinned, this.state.sidebarClosed),
                signalValues: this.state.signalValues //keep initialized signalValues
            });
        }
        getLayoutDivSize(pinned, closed) {
            const div = pinned && !closed ? this.layoutDivPinned : this.layoutDivUnpinned;
            return {
                height: div.offsetHeight,
                width: div.offsetWidth
            };
        }
        toggleableSearch(e, search) {
            if (e.ctrlKey) {
                this.setState({
                    search: $b44f404896596941$var$createInputSearch(search)
                });
                this.setSideTabId($065798d25a9d250c$export$b264ae1d75dc4e4e.Search);
            } else {
                var oldSelection = this.viewer.getSelection();
                if (oldSelection.search) {
                    //look for matching groups and toggle them
                    const result = $26a6576ea7ad3be3$export$94cca925abc30578($385418a87250916e$exports.searchExpression.ensureSearchExpressionGroupArray(oldSelection.search), search);
                    if (result.found) {
                        //removing a group
                        if (result.groups.length === 0) this.doDeselect();
                        else //select with new search removed
                        this.doSelect(result.groups);
                    } else //adding a new group
                    if (e.altKey || e.shiftKey) {
                        let group = true;
                        if (e.altKey) search.clause = '&&';
                        else if (e.shiftKey) {
                            if (this.props.searchORDisabled) group = false;
                            else search.clause = '||';
                        }
                        if (group) {
                            result.groups.push(search);
                            this.doSelect(result.groups);
                        } else this.doSelect(search);
                    } else //replace
                    this.doSelect(search);
                } else this.doSelect(search);
            }
        }
        doFilter(search, historicFilterChange) {
            this.historicFilterChange = historicFilterChange;
            this.viewer.filter(search);
        }
        doUnfilter(historicFilterChange) {
            this.historicFilterChange = historicFilterChange;
            this.viewer.reset();
        }
        doSelect(search) {
            this.viewer.select(search);
        }
        doDeselect() {
            return this.viewer.deselect();
        }
        writeSnapshot(snapshot, editIndex) {
            let { selectedSnapshotIndex: selectedSnapshotIndex  } = this.state;
            let snapshots;
            if (editIndex >= 0) {
                snapshots = [
                    ...this.state.snapshots
                ];
                snapshots[editIndex] = snapshot;
                this.setState({
                    snapshots: snapshots,
                    selectedSnapshotIndex: selectedSnapshotIndex
                });
            } else {
                const note = snapshot.description;
                snapshots = this.state.snapshots.concat(snapshot);
                selectedSnapshotIndex = snapshots.length - 1;
                this.scrollSnapshotIntoView(selectedSnapshotIndex);
                this.setState({
                    sideTabId: $065798d25a9d250c$export$b264ae1d75dc4e4e.Snapshots,
                    snapshots: snapshots,
                    selectedSnapshotIndex: selectedSnapshotIndex,
                    note: note
                });
            }
            this.props.onSnapshotsChanged && this.props.onSnapshotsChanged(snapshots);
        }
        scrollSnapshotIntoView(selectedSnapshotIndex) {
            clearTimeout(this.scrollSnapshotTimer);
            if (this.state.sidebarClosed) return;
            this.scrollSnapshotTimer = setTimeout(()=>{
                const selectedSnapshotElement = this.div.querySelector(`.snapshot:nth-child(${selectedSnapshotIndex + 1})`);
                if (selectedSnapshotElement) selectedSnapshotElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 500);
        }
        componentDidMount() {
            if (this.props.mounted) this.props.mounted(this);
        }
        render() {
            const { colorBin: colorBin , columns: columns , directColor: directColor , facetStyle: facetStyle , filter: filter , hideAxes: hideAxes , hideLegend: hideLegend , scheme: scheme , signalValues: signalValues , size: size , totalStyle: totalStyle , transform: transform , chart: chart , view: view  } = this.state;
            const insight = {
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
            const loaded = !!(this.state.columns && this.state.dataContent);
            const selectionState = this.viewer && this.viewer.getSelection() || {
            };
            const selectionSearch = selectionState && selectionState.search;
            const columnMapProps = this.getColumnMapBaseProps();
            const datas = {
            };
            datas[$0338ff3c02daec02$export$1c6888b44b81730b.AllData] = this.state.dataContent && this.state.dataContent.data;
            datas[$0338ff3c02daec02$export$1c6888b44b81730b.FilteredData] = this.state.filteredData;
            datas[$0338ff3c02daec02$export$1c6888b44b81730b.SelectedData] = selectionState && selectionState.selectedData;
            if (this.state.calculating) requestAnimationFrame(()=>{
                //allow render to complete
                if (this.state.calculating) {
                    this.state.calculating();
                    this.setState({
                        calculating: null
                    });
                }
            });
            const theme = this.props.theme || '';
            const themePalette = $ffac552ad0872994$export$ab53ba4bd9c9d2ec[theme];
            return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                ref: (div)=>{
                    if (div) this.div = div;
                },
                className: $6e437f743d80b3ba$exports.classList('sanddance-explorer', this.props.theme)
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($64071d48f10c4d85$export$47517a79cab7d511, {
                collapseLabels: this.props.compactUI,
                historyIndex: this.state.historyIndex,
                historyItems: this.state.historyItems,
                undo: ()=>this.undo()
                ,
                redo: ()=>this.redo()
                ,
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
                onSnapshotPreviousClick: ()=>{
                    let selectedSnapshotIndex;
                    if (this.state.selectedSnapshotIndex === -1) selectedSnapshotIndex = this.state.snapshots.length - 1;
                    else {
                        selectedSnapshotIndex = this.state.selectedSnapshotIndex;
                        selectedSnapshotIndex--;
                        if (selectedSnapshotIndex < 0) selectedSnapshotIndex = this.state.snapshots.length - 1;
                    }
                    this.handleReviveSnapshot(this.state.snapshots[selectedSnapshotIndex], selectedSnapshotIndex);
                },
                onSnapshotClick: ()=>this.snapshotEditor.editSnapshot()
                ,
                onSnapshotNextClick: ()=>{
                    let selectedSnapshotIndex;
                    if (this.state.selectedSnapshotIndex === -1) selectedSnapshotIndex = 0;
                    else {
                        selectedSnapshotIndex = this.state.selectedSnapshotIndex;
                        selectedSnapshotIndex++;
                        if (selectedSnapshotIndex > this.state.snapshots.length - 1) selectedSnapshotIndex = 0;
                    }
                    this.handleReviveSnapshot(this.state.snapshots[selectedSnapshotIndex], selectedSnapshotIndex);
                },
                onViewClick: ()=>{
                    const view1 = this.state.view === '2d' ? '3d' : '2d';
                    this.changeInsight({
                        view: view1
                    }, {
                        label: view1 === '2d' ? $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelViewType2d : $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelViewType3d
                    });
                },
                onHomeClick: ()=>this.viewer.presenter.homeCamera()
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                className: $6e437f743d80b3ba$exports.classList('sanddance-main', this.state.sidebarPinned && 'pinned', this.state.sidebarClosed && 'closed', (insight.hideLegend || insight.directColor || !$b44f404896596941$var$colorMapping(insight, this.state.dataContent && this.state.dataContent.columns)) && 'hide-legend')
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                ref: (div)=>{
                    if (div && !this.layoutDivUnpinned) this.layoutDivUnpinned = div;
                },
                className: "sanddance-layout-unpinned"
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                ref: (div)=>{
                    if (div && !this.layoutDivPinned) this.layoutDivPinned = div;
                },
                className: "sanddance-layout-pinned"
            }), !loaded && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                className: "loading"
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Spinner, {
                size: $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.SpinnerSize.large,
                label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.loading
            })), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($ee1d356b7aae3d3f$export$fc9ca46a31bcb059, {
                themePalette: themePalette,
                calculating: !!this.state.calculating,
                closed: this.state.sidebarClosed,
                hideSidebarControls: this.props.hideSidebarControls,
                pinned: this.state.sidebarPinned,
                disabled: !loaded,
                dataScopeProps: {
                    themePalette: themePalette,
                    compact: this.state.sidebarClosed,
                    onCompactClick: ()=>{
                        this.changeInsight({
                            size: this.getLayoutDivSize(this.state.sidebarPinned, false)
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
                    active: this.state.sideTabId === $065798d25a9d250c$export$b264ae1d75dc4e4e.Data,
                    onDataScopeClick: (dataScopeId)=>this.setSideTabId($065798d25a9d250c$export$b264ae1d75dc4e4e.Data, dataScopeId)
                    ,
                    selectedDataScope: this.state.dataScopeId,
                    disabled: !loaded
                },
                onSideTabClick: (sideTabId)=>{
                    //collapse or toggle
                    if (sideTabId === $065798d25a9d250c$export$b264ae1d75dc4e4e.Collapse || this.state.sideTabId === sideTabId) {
                        let { dataScopeId: dataScopeId , sidebarClosed: sidebarClosed  } = this.state;
                        if (sidebarClosed && sideTabId === $065798d25a9d250c$export$b264ae1d75dc4e4e.Data) dataScopeId = this.getBestDataScopeId();
                        sidebarClosed = !this.state.sidebarClosed;
                        this.changeInsight({
                            size: this.getLayoutDivSize(this.state.sidebarPinned, sidebarClosed)
                        }, {
                            label: null,
                            omit: true
                        }, {
                            dataScopeId: dataScopeId,
                            sidebarClosed: sidebarClosed
                        });
                    } else if (sideTabId === $065798d25a9d250c$export$b264ae1d75dc4e4e.Pin) this.changeInsight({
                        size: this.getLayoutDivSize(!this.state.sidebarPinned, this.state.sidebarClosed)
                    }, {
                        label: null,
                        omit: true
                    }, {
                        sidebarPinned: !this.state.sidebarPinned
                    });
                    else this.setSideTabId(sideTabId);
                },
                selectedSideTab: this.state.sideTabId
            }, loaded && (()=>{
                switch(this.state.sideTabId){
                    case $065798d25a9d250c$export$b264ae1d75dc4e4e.ChartType:
                        return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($1d75e5ac49b64589$export$7decb792461ef5a9, Object.assign({
                            collapseLabels: this.props.compactUI,
                            tooltipExclusions: this.state.tooltipExclusions,
                            toggleTooltipExclusion: (columnName)=>{
                                const tooltipExclusions = [
                                    ...this.state.tooltipExclusions
                                ];
                                const i = tooltipExclusions.indexOf(columnName);
                                if (i < 0) tooltipExclusions.push(columnName);
                                else tooltipExclusions.splice(i, 1);
                                this.setState({
                                    tooltipExclusions: tooltipExclusions
                                });
                                this.props.onTooltipExclusionsChanged && this.props.onTooltipExclusionsChanged(tooltipExclusions);
                            },
                            disabled: !loaded || this.state.sidebarClosed
                        }, columnMapProps, {
                            chart: this.state.chart,
                            view: this.state.view,
                            onChangeChartType: (chart1)=>this.changeChartType(chart1)
                            ,
                            insightColumns: this.state.columns,
                            onChangeSignal: (role, column, name, value)=>$96c12964caac8c31$export$c8fe9eec9afc2414(this.prefs, this.state.chart, role, column, name, value)
                        }));
                    case $065798d25a9d250c$export$b264ae1d75dc4e4e.Color:
                        return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($bb63fdf99ae08a83$export$e4830c8e55b4f80d, Object.assign({
                            compactUI: this.props.compactUI,
                            specCapabilities: this.state.specCapabilities,
                            disabled: !loaded || this.state.sidebarClosed
                        }, columnMapProps, {
                            dataContent: this.state.dataContent,
                            scheme: this.state.scheme,
                            colorBin: this.state.colorBin,
                            colorBinSignal: this.viewer && this.viewer.vegaSpec && this.viewer.vegaSpec.signals.filter((s)=>s.name === $385418a87250916e$exports.constants.SignalNames.ColorBinCount
                            )[0],
                            colorReverseSignal: this.viewer && this.viewer.vegaSpec && this.viewer.vegaSpec.signals.filter((s)=>s.name === $385418a87250916e$exports.constants.SignalNames.ColorReverse
                            )[0],
                            colorColumn: this.state.columns.color,
                            onColorBinChange: (colorBin1)=>{
                                this.ignoreSelectionChange = true;
                                this.viewer.deselect().then(()=>{
                                    this.ignoreSelectionChange = false;
                                    //allow deselection to render
                                    requestAnimationFrame(()=>{
                                        this.getColorContext = null;
                                        this.changeInsight({
                                            colorBin: colorBin1
                                        }, {
                                            label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelHistoryColorBin
                                        });
                                        $96c12964caac8c31$export$79057c9e8e65cb3c(this.prefs, this.state.chart, 'color', this.state.columns.color, {
                                            colorBin: colorBin1
                                        });
                                    });
                                });
                            },
                            onColorSchemeChange: (scheme1)=>{
                                this.changeColumnMapping('color', this.state.dataContent.columns.filter((c)=>c.name === this.state.columns.color
                                )[0], {
                                    scheme: scheme1
                                });
                                $96c12964caac8c31$export$79057c9e8e65cb3c(this.prefs, this.state.chart, 'color', this.state.columns.color, {
                                    scheme: scheme1
                                });
                            },
                            onColorBinCountChange: (value)=>{
                                const signalValues1 = {
                                };
                                signalValues1[$385418a87250916e$exports.constants.SignalNames.ColorBinCount] = value;
                                $96c12964caac8c31$export$79057c9e8e65cb3c(this.prefs, this.state.chart, 'color', this.state.columns.color, {
                                    signalValues: signalValues1
                                });
                            },
                            onColorReverseChange: (value)=>{
                                this.getColorContext = null;
                            },
                            directColor: this.state.directColor,
                            onDirectColorChange: (directColor1)=>{
                                this.changeInsight({
                                    directColor: directColor1
                                }, {
                                    label: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelHistoryDirectColor
                                }, {
                                    calculating: ()=>this._resize()
                                });
                            }
                        }));
                    case $065798d25a9d250c$export$b264ae1d75dc4e4e.Data:
                        {
                            const data = datas[this.state.dataScopeId];
                            let itemVisible = true;
                            switch(this.state.dataScopeId){
                                case $0338ff3c02daec02$export$1c6888b44b81730b.AllData:
                                    {
                                        const item = this.state.selectedItemIndex[this.state.dataScopeId];
                                        itemVisible = this.state.dataContent && !this.state.filteredData || this.state.filteredData.indexOf(data[item]) >= 0;
                                    }
                            }
                            return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($5d47ce1436721dba$export$50d5d540831edcd1, {
                                theme: this.props.theme,
                                themePalette: themePalette,
                                disabled: !loaded || this.state.sidebarClosed,
                                columns: this.state.dataContent && this.state.dataContent.columns,
                                data: data,
                                displayName: this.state.dataFile && this.state.dataFile.displayName || $d3f49cd4a4ebf638$export$e345c26dc94dc116.defaultFileName,
                                nullMessage: $b44f404896596941$var$dataBrowserNullMessages[this.state.dataScopeId],
                                zeroMessage: $b44f404896596941$var$dataBrowserZeroMessages[this.state.dataScopeId],
                                index: this.state.selectedItemIndex[this.state.dataScopeId],
                                itemVisible: itemVisible,
                                dataExportHandler: this.props.dataExportHandler,
                                selectedDataScope: this.state.dataScopeId,
                                onDataScopeClick: (dataScopeId)=>this.setSideTabId($065798d25a9d250c$export$b264ae1d75dc4e4e.Data, dataScopeId)
                                ,
                                onActivate: (row, index)=>{
                                    const selectedItemIndex = Object.assign({
                                    }, this.state.selectedItemIndex);
                                    selectedItemIndex[this.state.dataScopeId] = index;
                                    this.setState({
                                        selectedItemIndex: selectedItemIndex
                                    });
                                    this.silentActivation(row);
                                },
                                onSearch: (e, search)=>{
                                    if (e.ctrlKey) this.setState({
                                        sideTabId: $065798d25a9d250c$export$b264ae1d75dc4e4e.Search,
                                        search: search
                                    });
                                    else this.doSelect(search);
                                },
                                bingSearchDisabled: this.props.bingSearchDisabled
                            });
                        }
                    case $065798d25a9d250c$export$b264ae1d75dc4e4e.Search:
                        return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($db7ca2292e5ff554$export$59dc79d25800130f, {
                            collapseLabels: this.props.compactUI,
                            themePalette: themePalette,
                            disabled: !loaded || this.state.sidebarClosed,
                            disableGroupOR: this.props.searchORDisabled,
                            disableExpressionOR: this.props.searchORDisabled,
                            initializer: {
                                columns: columnMapProps.allColumns,
                                search: this.state.search
                            },
                            autoCompleteDistinctValues: this.state.autoCompleteDistinctValues,
                            onSelect: (expr)=>this.doSelect(expr)
                            ,
                            data: this.state.dataContent.data
                        });
                    case $065798d25a9d250c$export$b264ae1d75dc4e4e.Snapshots:
                        return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($92d5d57bae29246e$export$bd026f48d172e03, Object.assign({
                        }, this.props.snapshotProps, {
                            editor: this.snapshotEditor,
                            themePalette: themePalette,
                            explorer: this,
                            snapshots: this.state.snapshots,
                            selectedSnapshotIndex: this.state.selectedSnapshotIndex,
                            onClearSnapshots: ()=>{
                                const snapshots = [];
                                this.setState({
                                    snapshots: snapshots,
                                    selectedSnapshotIndex: -1
                                });
                                this.props.onSnapshotsChanged && this.props.onSnapshotsChanged(snapshots);
                            },
                            onWriteSnapshot: (s, i)=>this.writeSnapshot(s, i)
                            ,
                            onRemoveSnapshot: (i)=>{
                                const snapshots = [
                                    ...this.state.snapshots
                                ];
                                snapshots.splice(i, 1);
                                let { selectedSnapshotIndex: selectedSnapshotIndex  } = this.state;
                                if (i === selectedSnapshotIndex) selectedSnapshotIndex = -1;
                                else if (selectedSnapshotIndex > i) selectedSnapshotIndex--;
                                this.setState({
                                    snapshots: snapshots,
                                    selectedSnapshotIndex: selectedSnapshotIndex
                                });
                                this.props.onSnapshotsChanged && this.props.onSnapshotsChanged(snapshots);
                            },
                            onSnapshotClick: (snapshot, selectedSnapshotIndex)=>{
                                this.setState({
                                    selectedSnapshotIndex: selectedSnapshotIndex
                                });
                                this.calculate(()=>{
                                    this.handleReviveSnapshot(snapshot, selectedSnapshotIndex);
                                });
                            },
                            onMoveUp: (i)=>{
                                if (i > 0) {
                                    const snapshots = [
                                        ...this.state.snapshots
                                    ];
                                    const temp = snapshots[i - 1];
                                    snapshots[i - 1] = snapshots[i];
                                    snapshots[i] = temp;
                                    let { selectedSnapshotIndex: selectedSnapshotIndex  } = this.state;
                                    if (i === selectedSnapshotIndex) selectedSnapshotIndex = i - 1;
                                    else if (i - 1 === selectedSnapshotIndex) selectedSnapshotIndex = i;
                                    this.setState({
                                        snapshots: snapshots,
                                        selectedSnapshotIndex: selectedSnapshotIndex
                                    });
                                    this.props.onSnapshotsChanged && this.props.onSnapshotsChanged(snapshots);
                                }
                            },
                            onMoveDown: (i)=>{
                                if (i < this.state.snapshots.length - 1) {
                                    const snapshots = [
                                        ...this.state.snapshots
                                    ];
                                    const temp = snapshots[i + 1];
                                    snapshots[i + 1] = snapshots[i];
                                    snapshots[i] = temp;
                                    let { selectedSnapshotIndex: selectedSnapshotIndex  } = this.state;
                                    if (i === selectedSnapshotIndex) selectedSnapshotIndex = i + 1;
                                    else if (i + 1 === selectedSnapshotIndex) selectedSnapshotIndex = i;
                                    this.setState({
                                        snapshots: snapshots,
                                        selectedSnapshotIndex: selectedSnapshotIndex
                                    });
                                    this.props.onSnapshotsChanged && this.props.onSnapshotsChanged(snapshots);
                                }
                            }
                        }));
                    case $065798d25a9d250c$export$b264ae1d75dc4e4e.History:
                        return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($f47f6bdc0d13e7a0$export$36b6e53ba8daf232, {
                            theme: theme,
                            themePalette: themePalette,
                            historyIndex: this.state.historyIndex,
                            historyItems: this.state.historyItems,
                            redo: (i)=>this.redo(i)
                        });
                    case $065798d25a9d250c$export$b264ae1d75dc4e4e.Settings:
                        return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c8349196cda2bdc1$export$9c458e6eecac1eb9, {
                            explorer: this,
                            dataFile: this.state.dataFile,
                            scheme: this.state.scheme,
                            hideLegend: this.state.hideLegend,
                            onToggleLegend: (hideLegend1)=>this.setState({
                                    hideLegend: hideLegend1,
                                    calculating: ()=>this._resize()
                                })
                            ,
                            hideAxes: this.state.hideAxes,
                            onToggleAxes: (hideAxes1)=>this.setState({
                                    calculating: ()=>this.setState({
                                            hideAxes: hideAxes1
                                        })
                                })
                            ,
                            additionalSettings: this.props.additionalSettings
                        }, this.props.systemInfoChildren);
                }
            })()), loaded && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                className: "sanddance-view"
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($2e70c6c127734088$export$1d29a992e629a3f4, {
                renderOptions: {
                    rebaseFilter: ()=>{
                        const { rebaseFilter: rebaseFilter  } = this;
                        if (rebaseFilter) this.rebaseFilter = false;
                        return rebaseFilter;
                    },
                    initialColorContext: this.getColorContext && this.getColorContext(this.viewer.insight, insight),
                    discardColorContextUpdates: ()=>this.discardColorContextUpdates
                },
                viewerOptions: this.viewerOptions,
                ref: (reactViewer)=>{
                    if (reactViewer) this.viewer = reactViewer.viewer;
                },
                onView: (renderResult)=>{
                    this.changespecCapabilities(renderResult.specResult.errors ? renderResult.specResult.specCapabilities : this.viewer.specCapabilities);
                    this.getColorContext = (oldInsight, newInsight)=>{
                        if (!oldInsight && !newInsight) return null;
                        if (!oldInsight || !newInsight) return null;
                        if (oldInsight.scheme !== newInsight.scheme) return null;
                        if (oldInsight.columns.color !== newInsight.columns.color) return null;
                        if (oldInsight.directColor != newInsight.directColor) return null;
                        return this.viewer.colorContexts && this.viewer.colorContexts[this.viewer.currentColorContext];
                    };
                    //don't allow tabbing to the canvas
                    $3669ee32f5f0d5ff$export$143b1ce3525ff2(this.viewer);
                    this.props.onView && this.props.onView();
                },
                onError: (e)=>{
                    this.props.onError && this.props.onError(e);
                },
                data: this.state.dataContent.data,
                insight: insight,
                onMount: (el)=>this.viewerMounted(el)
            }), this.state.note && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                className: 'sanddance-note'
            }, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($118d0de4ae8ff9c2$export$aa4364103b35a0bd, {
                className: 'cancel',
                themePalette: themePalette,
                title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonClose,
                iconName: 'Cancel',
                onClick: ()=>this.setState({
                        note: null
                    })
            }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", null, this.state.note))), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($3456628043e62c6c$export$d64e687ef4853cae, {
                title: $d3f49cd4a4ebf638$export$e345c26dc94dc116.labelError,
                hidden: !this.state.errors,
                onDismiss: ()=>{
                    this.setState({
                        errors: null
                    });
                }
            }, this.state.errors && this.state.errors.map((error, i)=>$c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
                    key: i
                }, error)
            )), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($2159fe8fc2041ed6$export$1b30ac79c43d2fc0, Object.assign({
                ref: (se)=>this.snapshotEditor = se
            }, this.props.snapshotProps, {
                explorer: this,
                onWriteSnapshot: (s, i)=>this.writeSnapshot(s, i)
                ,
                theme: this.props.theme,
                themePalette: themePalette
            }))), this.state.positionedColumnMapProps && $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($111d368e10bec10f$export$ca11bec7c35e97ff, Object.assign({
            }, this.state.positionedColumnMapProps)));
        }
        getColumnMapBaseProps() {
            const allColumns = this.state.dataContent && this.state.dataContent.columns.filter((c)=>!$385418a87250916e$exports.util.isInternalFieldName(c.name, true)
            );
            const quantitativeColumns = allColumns && allColumns.filter((c)=>c.quantitative
            );
            const categoricalColumns = allColumns && allColumns.filter((c)=>!c.quantitative
            );
            const props2 = {
                changeColumnMapping: (role, columnOrRole, defaultColumn, options)=>{
                    let column;
                    if (typeof columnOrRole === 'string') {
                        //look up current insight
                        const columnName = this.state.columns[columnOrRole];
                        column = allColumns.filter((c)=>c.name === columnName
                        )[0] || defaultColumn;
                    } else column = columnOrRole;
                    this.changeColumnMapping(role, column, options);
                },
                facetStyle: this.state.facetStyle,
                totalStyle: this.state.totalStyle,
                allColumns: allColumns,
                quantitativeColumns: quantitativeColumns,
                categoricalColumns: categoricalColumns,
                specCapabilities: this.state.specCapabilities,
                explorer: this
            };
            return props2;
        }
    }
    return new __Explorer(props);
}
const $b44f404896596941$export$535aff0d258afa68 = $b44f404896596941$var$_Explorer;
function $b44f404896596941$var$colorMapping(insight, columns) {
    if (columns && insight.columns && insight.columns.color) return columns.filter((c)=>c.name === insight.columns.color
    )[0];
}



const $c5e1961a7f97a459$export$12896e353ebd9cc = {
    fluentUI: null,
    react: null,
    reactDOM: null
};
function $c5e1961a7f97a459$export$44747fb0056adba5(fluentUI, react, reactDOM, vega, deck, layers, luma) {
    $10e70159f7836695$export$44747fb0056adba5(react, reactDOM, vega, deck, layers, luma);
    $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI = fluentUI;
    $c5e1961a7f97a459$export$12896e353ebd9cc.react = react;
    $c5e1961a7f97a459$export$12896e353ebd9cc.reactDOM = reactDOM;
    //inform React that we are using a dynamic base class
    $1d75e5ac49b64589$export$7decb792461ef5a9.prototype = react.Component.prototype;
    $ddc28421fe6d69d0$export$ca7914cbf553e128.prototype = react.Component.prototype;
    $b44f404896596941$export$535aff0d258afa68.prototype = react.Component.prototype;
    $111d368e10bec10f$export$ca11bec7c35e97ff.prototype = react.Component.prototype;
    $db7ca2292e5ff554$export$59dc79d25800130f.prototype = react.Component.prototype;
    $2159fe8fc2041ed6$export$1b30ac79c43d2fc0.prototype = react.Component.prototype;
    $92d5d57bae29246e$export$bd026f48d172e03.prototype = react.Component.prototype;
    $c8349196cda2bdc1$export$9c458e6eecac1eb9.prototype = react.Component.prototype;
}



function $3456628043e62c6c$export$d64e687ef4853cae(props) {
    return $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.Dialog, Object.assign({
    }, props, {
        dialogContentProps: Object.assign({
            type: $c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DialogType.normal,
            title: props.title
        }, props.dialogContentProps)
    }), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement("div", {
        onKeyUp: (e)=>{
            e.nativeEvent.stopImmediatePropagation();
        }
    }, props.children), $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DialogFooter, null, props.buttons, $c5e1961a7f97a459$export$12896e353ebd9cc.react.createElement($c5e1961a7f97a459$export$12896e353ebd9cc.fluentUI.DefaultButton, {
        iconProps: {
            iconName: 'Cancel'
        },
        onClick: props.onDismiss,
        text: $d3f49cd4a4ebf638$export$e345c26dc94dc116.buttonClose
    })));
}


$parcel$exportWildcard($ea687581edf48e56$exports, $3456628043e62c6c$exports);










$parcel$exportWildcard($b6499bcf1ffc0a3b$exports, $b44f404896596941$exports);


window.SandDanceExplorer = $b6499bcf1ffc0a3b$exports;

})();
