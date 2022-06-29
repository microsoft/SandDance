(() => {
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
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
parcelRequire.register("jN9Lg", function(module, exports) {
module.exports = JSON.parse('["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","math","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rb","rp","rt","rtc","ruby","s","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"]');

});

parcelRequire.register("7UTS5", function(module, exports) {
module.exports = JSON.parse('["a","altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","script","set","stop","style","svg","switch","symbol","text","textPath","title","tref","tspan","use","view","vkern"]');

});

parcelRequire.register("b7nfv", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.BarChartRecommender = module.exports.BarChartRecommenderSummary = void 0;

var $mKnoG = parcelRequire("mKnoG");
var $818261f0bc10eb56$var$maxDistinctVal = 20;
var $818261f0bc10eb56$var$minDistinctVal = 2;
var $818261f0bc10eb56$var$BarChartRecommenderSummary = /** @class */ function() {
    function BarChartRecommenderSummary1(columns, data) {
        var score = -1;
        for(var i = 0; i < columns.length; i++){
            var recommendation = new $818261f0bc10eb56$var$BarChartRecommender(columns[i], data).recommend();
            if (recommendation.score > score) {
                this.best = recommendation;
                score = recommendation.score;
            }
            if (score === 1) break;
        }
        for(var k = 0; k < columns.length; k++){
            var column = columns[k];
            if (column.name === this.best.columns.x || column.stats.isSequential) continue;
            if (column.quantitative || column.stats.distinctValueCount < $mKnoG.maxCategoricalColors && column.stats.distinctValueCount > 1) {
                this.best.columns.color = this.best.columns.sort = column.name;
                this.best.scheme = $mKnoG.defaultColorScheme(column);
                if (column.quantitative) this.best.colorBin = "quantile";
                break;
            }
        }
    }
    BarChartRecommenderSummary1.prototype.recommend = function() {
        return this.best;
    };
    return BarChartRecommenderSummary1;
}();
module.exports.BarChartRecommenderSummary = $818261f0bc10eb56$var$BarChartRecommenderSummary;
var $818261f0bc10eb56$var$BarChartRecommender = /** @class */ function() {
    function BarChartRecommender1(column1, data) {
        this.score = 0;
        this.column = column1;
        //the total score for bar chart is 1
        this.rules = [
            function(column) {
                if (column.stats.isSequential) return false;
                else if (column.quantitative) return true;
                else if (!column.quantitative && column.stats.distinctValueCount <= $818261f0bc10eb56$var$maxDistinctVal && column.stats.distinctValueCount >= $818261f0bc10eb56$var$minDistinctVal) return true;
                else return false;
            }
        ];
        for(var i = 0; i < this.rules.length; i++)if (this.rules[i](column1)) this.score++;
    }
    BarChartRecommender1.prototype.recommend = function() {
        var rec = {
            chart: "barchart",
            columns: {
                x: this.column.name
            },
            score: this.score,
            scheme: undefined,
            view: "2d"
        };
        return rec;
    };
    return BarChartRecommender1;
}();
module.exports.BarChartRecommender = $818261f0bc10eb56$var$BarChartRecommender;

});
parcelRequire.register("mKnoG", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.defaultColorScheme = module.exports.Recommender = module.exports.maxCategoricalColors = void 0;
module.exports.maxCategoricalColors = 20;
var $04460791e43e84ac$var$Recommender = /** @class */ function() {
    function Recommender1(columns, data) {}
    return Recommender1;
}();
module.exports.Recommender = $04460791e43e84ac$var$Recommender;
function $04460791e43e84ac$var$defaultColorScheme(c) {
    if (c.quantitative) return "redyellowgreen";
    else if (c.stats.distinctValueCount === 2) return "dual_redgreen";
    else if (c.stats.distinctValueCount <= 10) return "category10";
    return "category20";
}
module.exports.defaultColorScheme = $04460791e43e84ac$var$defaultColorScheme;

});


parcelRequire.register("a7afS", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.isGeo = module.exports.isLatitude = module.exports.isLongitude = void 0;
//TODO: languages other than english
var $75d28341ba4a9e0e$var$longitudeNames = [
    "lon",
    "long",
    "longitude"
];
var $75d28341ba4a9e0e$var$latitudeNames = [
    "lat",
    "latitude"
];
function $75d28341ba4a9e0e$var$isSpec(names, limits, column, data) {
    var is = false;
    var cname = column.name.toLowerCase();
    for(var i = 0; i < names.length; i++)if (names[i] === cname) {
        is = true;
        break;
    }
    data;
    return is;
}
function $75d28341ba4a9e0e$var$isLongitude(column, data) {
    return $75d28341ba4a9e0e$var$isSpec($75d28341ba4a9e0e$var$longitudeNames, [
        -180,
        180
    ], column, data);
}
module.exports.isLongitude = $75d28341ba4a9e0e$var$isLongitude;
function $75d28341ba4a9e0e$var$isLatitude(column, data) {
    return $75d28341ba4a9e0e$var$isSpec($75d28341ba4a9e0e$var$latitudeNames, [
        -90,
        90
    ], column, data);
}
module.exports.isLatitude = $75d28341ba4a9e0e$var$isLatitude;
function $75d28341ba4a9e0e$var$isGeo(column, data) {
    return $75d28341ba4a9e0e$var$isLatitude(column, data) || $75d28341ba4a9e0e$var$isLongitude(column, data);
}
module.exports.isGeo = $75d28341ba4a9e0e$var$isGeo;

});

parcelRequire.register("6bWv0", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.ScatterPlotRecommenderSummary = void 0;

var $mKnoG = parcelRequire("mKnoG");

var $a7afS = parcelRequire("a7afS");
var $482125d789b1323b$var$ScatterPlotRecommenderSummary = /** @class */ function() {
    function ScatterPlotRecommenderSummary1(columns, data) {
        var rec = {
            chart: "scatterplot",
            score: undefined,
            columns: {},
            scheme: undefined,
            view: "2d"
        };
        columns.forEach(function(column) {
            if (!rec.columns.x) {
                if (column.name.toLowerCase() === "x") return rec.columns.x = column.name;
                else if ($a7afS.isLongitude(column)) return rec.columns.x = column.name;
            }
            if (!rec.columns.y) {
                if (column.name.toLowerCase() === "y") return rec.columns.y = column.name;
                else if ($a7afS.isLatitude(column)) return rec.columns.y = column.name;
            }
            if (!rec.columns.color && !column.stats.isSequential) {
                if (column.quantitative || column.stats.distinctValueCount < $mKnoG.maxCategoricalColors) {
                    rec.columns.color = rec.columns.sort = column.name;
                    rec.scheme = $mKnoG.defaultColorScheme(column);
                    if (column.quantitative) rec.colorBin = "quantile";
                    return;
                }
            }
        });
        if (rec.columns.x && rec.columns.y) this.best = rec;
    }
    ScatterPlotRecommenderSummary1.prototype.recommend = function() {
        return this.best;
    };
    return ScatterPlotRecommenderSummary1;
}();
module.exports.ScatterPlotRecommenderSummary = $482125d789b1323b$var$ScatterPlotRecommenderSummary;

});

parcelRequire.register("217nY", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.preferredColumnForTreemapSize = void 0;

var $a7afS = parcelRequire("a7afS");
function $178167658ad4c5ea$var$preferredColumnForTreemapSize(columns, strict) {
    for(var i = 0; i < columns.length; i++){
        var c = columns[i];
        if (c.quantitative) {
            if (strict && c.stats.hasNegative) continue;
            if (strict && c.stats.isSequential) continue;
            if (strict && $a7afS.isGeo(c)) continue;
            return c;
        }
    }
}
module.exports.preferredColumnForTreemapSize = $178167658ad4c5ea$var$preferredColumnForTreemapSize;

});

parcelRequire.register("9kLwX", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.RecommenderSummary = void 0;

var $b7nfv = parcelRequire("b7nfv");

var $6bWv0 = parcelRequire("6bWv0");
var $6cbad9e37f0db778$var$RecommenderSummary = /** @class */ function() {
    function RecommenderSummary1(columns, data) {
        var quickRec = new $6bWv0.ScatterPlotRecommenderSummary(columns, data).recommend();
        if (quickRec) this.rec = quickRec;
        else {
            var barChartrec = new $b7nfv.BarChartRecommenderSummary(columns, data).recommend();
            if (barChartrec && barChartrec.score >= 1) this.rec = barChartrec;
            else this.rec = {
                chart: "grid",
                columns: {},
                score: 1
            };
        }
    }
    RecommenderSummary1.prototype.recommend = function() {
        return this.rec;
    };
    return RecommenderSummary1;
}();
module.exports.RecommenderSummary = $6cbad9e37f0db778$var$RecommenderSummary;

});

var $87e8ab1064b645b0$exports = {};

$parcel$export($87e8ab1064b645b0$exports, "controls", () => $b3059ab4f8ea4207$exports);
$parcel$export($87e8ab1064b645b0$exports, "getEmbedHTML", () => $e98d3084b701f145$export$9f4b684ea6be1a90);
$parcel$export($87e8ab1064b645b0$exports, "SideTabId", () => $a4811b1c86ed19fa$export$f3b7566ffe363e3b);
$parcel$export($87e8ab1064b645b0$exports, "use", () => $8535c575077b9670$export$1f96ae73734a86cc);
$parcel$export($87e8ab1064b645b0$exports, "capabilities", () => $29728562a99c68a2$export$8e76ac9f37578d1b);
$parcel$export($87e8ab1064b645b0$exports, "getColorSettingsFromThemePalette", () => $b61671d8f61aadb4$export$93a255849c3bdb97);
$parcel$export($87e8ab1064b645b0$exports, "themePalettes", () => $b61671d8f61aadb4$export$3465a0e7b289ab72);
$parcel$export($87e8ab1064b645b0$exports, "SandDance", () => $3b509b9541e52a8f$exports);
$parcel$export($87e8ab1064b645b0$exports, "util", () => $a1d9524814b1e23a$exports);
$parcel$export($87e8ab1064b645b0$exports, "version", () => $f56a95f33c4cc847$export$83d89fbfd8236492);
var $b3059ab4f8ea4207$exports = {};
var $5453c8de1a3cb6b6$exports = {};

$parcel$export($5453c8de1a3cb6b6$exports, "Dialog", () => $5453c8de1a3cb6b6$export$3ddf2d174ce01153);



const $01c4eef7f720da5f$export$8263e1ed1ef30f07 = 200;
function $01c4eef7f720da5f$export$931cbfb6bfb85fc(props) {
    const newProps = Object.assign({}, props);
    let selectedKey = null;
    if (newProps.options && newProps.options.length > 1) {
        const selectedOptions = newProps.options.filter((option)=>option.selected);
        if (selectedOptions && selectedOptions.length > 0) selectedKey = selectedOptions[0].key;
    }
    if (newProps.collapseLabel) newProps.onRenderTitle = (a, b)=>{
        return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("span", null, newProps.label, ": ", a[0].text);
    };
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Dropdown, Object.assign({
        dropdownWidth: $01c4eef7f720da5f$export$8263e1ed1ef30f07
    }, newProps, {
        label: newProps.collapseLabel ? null : newProps.label,
        selectedKey: selectedKey
    }));
}


var $3b509b9541e52a8f$exports = {};

$parcel$export($3b509b9541e52a8f$exports, "use", () => $3b509b9541e52a8f$export$1f96ae73734a86cc);
$parcel$export($3b509b9541e52a8f$exports, "colorSchemes", () => $c9f2c41a3f8ee485$export$2ad73d393c16f81c);
$parcel$export($3b509b9541e52a8f$exports, "constants", () => $4d0539c68a8de77f$exports);
$parcel$export($3b509b9541e52a8f$exports, "searchExpression", () => $c2919c2894b0628c$exports);
$parcel$export($3b509b9541e52a8f$exports, "specs", () => $64958c10656c4cf5$exports);
$parcel$export($3b509b9541e52a8f$exports, "types", () => $60e01fcba935f9e9$exports);
$parcel$export($3b509b9541e52a8f$exports, "util", () => $944bef2715b44399$exports);
$parcel$export($3b509b9541e52a8f$exports, "VegaDeckGl", () => $f80f7eb4951011b9$exports);
$parcel$export($3b509b9541e52a8f$exports, "Viewer", () => $0000a41cc7b5918f$exports.Viewer);
$parcel$export($3b509b9541e52a8f$exports, "version", () => $15874c145702a1a4$export$83d89fbfd8236492);
var $4d0539c68a8de77f$exports = {};

$parcel$export($4d0539c68a8de77f$exports, "GL_ORDINAL", () => $4d0539c68a8de77f$export$5672246984822a29);
$parcel$export($4d0539c68a8de77f$exports, "ColorScaleNone", () => $ec270fbe8d9983b4$export$c991c3dd58d9959c);
$parcel$export($4d0539c68a8de77f$exports, "FieldNames", () => $ec270fbe8d9983b4$export$10df5429b7082be2);
$parcel$export($4d0539c68a8de77f$exports, "ScaleNames", () => $ec270fbe8d9983b4$export$c9f17d36dfc40d76);
$parcel$export($4d0539c68a8de77f$exports, "SignalNames", () => $ec270fbe8d9983b4$export$809e371dee643808);
var $64958c10656c4cf5$exports = {};
var $7e9d31f0ccd4826a$exports = {};

$parcel$export($7e9d31f0ccd4826a$exports, "build", () => $7e9d31f0ccd4826a$export$3f8fe6489e95757d);
var $ec270fbe8d9983b4$exports = {};

$parcel$export($ec270fbe8d9983b4$exports, "FieldNames", () => $ec270fbe8d9983b4$export$10df5429b7082be2);
$parcel$export($ec270fbe8d9983b4$exports, "ScaleNames", () => $ec270fbe8d9983b4$export$c9f17d36dfc40d76);
$parcel$export($ec270fbe8d9983b4$exports, "SignalNames", () => $ec270fbe8d9983b4$export$809e371dee643808);
$parcel$export($ec270fbe8d9983b4$exports, "Other", () => $ec270fbe8d9983b4$export$8653a30c44b6e879);
$parcel$export($ec270fbe8d9983b4$exports, "ColorScaleNone", () => $ec270fbe8d9983b4$export$c991c3dd58d9959c);
const $ec270fbe8d9983b4$export$10df5429b7082be2 = {
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
const $ec270fbe8d9983b4$export$c9f17d36dfc40d76 = {
    Color: "scale_color",
    X: "scale_x",
    Y: "scale_y",
    Z: "scale_z"
};
const $ec270fbe8d9983b4$export$809e371dee643808 = {
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
const $ec270fbe8d9983b4$export$8653a30c44b6e879 = "__Other";
const $ec270fbe8d9983b4$export$c991c3dd58d9959c = "none";


const $17564e8cec2b9f75$export$4a9b1843df49fbce = 10;
const $17564e8cec2b9f75$export$15c9d32f115776f9 = 100;
const $17564e8cec2b9f75$export$929dfe98c4c4722c = 15;
const $17564e8cec2b9f75$export$7794a0aff56142de = 140;
const $17564e8cec2b9f75$export$7c432db1d0b63312 = 180;
const $17564e8cec2b9f75$export$6bd206e55cb747ae = 40;
const $17564e8cec2b9f75$export$c2b9f0002271e8ba = 40;
const $17564e8cec2b9f75$export$bdb7a7da14f9ff2b = 40;
const $17564e8cec2b9f75$export$c11851bee1b89f04 = 40;
const $17564e8cec2b9f75$export$2aa02e522549e01e = 100;
const $17564e8cec2b9f75$export$d3da25ad66816957 = 100;
const $17564e8cec2b9f75$export$2e7279af2df830e3 = 30;
const $17564e8cec2b9f75$export$f0388d9263db6e5f = 60;
const $17564e8cec2b9f75$export$fd4a597070549ada = 69;
const $17564e8cec2b9f75$export$a26a082bf9fa4ca0 = 92;
const $17564e8cec2b9f75$export$3f5b554d51e74365 = 120;
const $17564e8cec2b9f75$export$c33f11801bb18430 = 120;
const $17564e8cec2b9f75$export$e1f76e63dbed4a9a = 10;
const $17564e8cec2b9f75$export$c223d3ee3c0620d9 = 20;


function $7fe4016d5da6d504$export$d3be63162ba033ae(specContext) {
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


function $9d0255b0e2eb5a6d$export$2e2bcd8739ae039(specContext) {
    const { insight: insight , specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
    const { language: language  } = specViewOptions;
    const bandProps = {
        orientation: "horizontal",
        groupby: {
            column: specColumns.y,
            defaultBins: $17564e8cec2b9f75$export$4a9b1843df49fbce,
            maxbinsSignalName: (0, $ec270fbe8d9983b4$export$809e371dee643808).YBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
            maxbins: $17564e8cec2b9f75$export$15c9d32f115776f9
        },
        minBandWidth: (0, $17564e8cec2b9f75$export$929dfe98c4c4722c),
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
            z: specColumns.z
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
            showAxes: true
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
                        z: specColumns.z
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
                        z: specColumns.z
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
                        z: specColumns.z
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
                        maxGroupedFillSize: aggProps.globalAggregateMaxExtentScaledSignal
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
        axisScales: axisScales,
        layouts: layouts,
        specCapabilities: {
            countsAndSums: true,
            percentage: true,
            roles: [
                {
                    role: "y",
                    binnable: true,
                    axisSelection: specColumns.y && specColumns.y.quantitative ? "range" : "exact",
                    axisSelectionBetweenTicks: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).YBins
                    ]
                },
                {
                    role: "z",
                    axisSelection: specColumns.z && specColumns.z.quantitative ? "range" : "exact",
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
                    allowNone: (0, $7fe4016d5da6d504$export$d3be63162ba033ae),
                    excludeCategoric: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).TreeMapMethod
                    ]
                },
                {
                    role: "facet",
                    allowNone: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetVBins
                    ]
                }
            ]
        }
    };
}





function $89432af83262137a$export$2e2bcd8739ae039(specContext) {
    const { insight: insight , specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
    const { language: language  } = specViewOptions;
    const bandProps = {
        orientation: "vertical",
        groupby: {
            column: specColumns.x,
            defaultBins: $17564e8cec2b9f75$export$4a9b1843df49fbce,
            maxbinsSignalName: (0, $ec270fbe8d9983b4$export$809e371dee643808).XBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
            maxbins: $17564e8cec2b9f75$export$15c9d32f115776f9
        },
        minBandWidth: (0, $17564e8cec2b9f75$export$929dfe98c4c4722c),
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
            z: specColumns.z
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
            showAxes: true
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
                        z: specColumns.z
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
                        z: specColumns.z
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
                        z: specColumns.z
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
                        maxGroupedFillSize: aggProps.globalAggregateMaxExtentScaledSignal
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
        axisScales: axisScales,
        layouts: layouts,
        specCapabilities: {
            countsAndSums: true,
            percentage: true,
            roles: [
                {
                    role: "x",
                    binnable: true,
                    axisSelection: specColumns.x && specColumns.x.quantitative ? "range" : "exact",
                    axisSelectionBetweenTicks: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).XBins
                    ]
                },
                {
                    role: "z",
                    axisSelection: specColumns.z && specColumns.z.quantitative ? "range" : "exact",
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
                    allowNone: (0, $7fe4016d5da6d504$export$d3be63162ba033ae),
                    excludeCategoric: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).TreeMapMethod
                    ]
                },
                {
                    role: "facet",
                    allowNone: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetVBins
                    ]
                }
            ]
        }
    };
}





function $e99549e32deab63c$export$2e2bcd8739ae039(specContext) {
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
        orientation: "horizontal",
        groupby: {
            column: specColumns.y,
            defaultBins: $17564e8cec2b9f75$export$4a9b1843df49fbce,
            maxbinsSignalName: (0, $ec270fbe8d9983b4$export$809e371dee643808).YBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
            maxbins: $17564e8cec2b9f75$export$15c9d32f115776f9
        },
        minBandWidth: (0, $17564e8cec2b9f75$export$929dfe98c4c4722c),
        showAxes: true
    };
    const vBandProps = {
        excludeEncodingRuleMap: true,
        orientation: "vertical",
        groupby: {
            column: specColumns.x,
            defaultBins: $17564e8cec2b9f75$export$4a9b1843df49fbce,
            maxbinsSignalName: (0, $ec270fbe8d9983b4$export$809e371dee643808).XBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
            maxbins: $17564e8cec2b9f75$export$15c9d32f115776f9
        },
        minBandWidth: (0, $17564e8cec2b9f75$export$929dfe98c4c4722c),
        showAxes: true
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
        }
    ];
    switch(insight.totalStyle){
        case "sum-treemap":
            {
                aggProps.aggregation = "sum";
                const treemapProps = {
                    corner: "bottom-left",
                    size: specColumns.size,
                    treeMapMethod: specViewOptions.language.treeMapMethod,
                    z: specColumns.z
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
                    z: specColumns.z
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
                    z: specColumns.z
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
                    maxGroupedFillSize: null
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
        axisScales: axisScales,
        layouts: layouts,
        specCapabilities: {
            countsAndSums: true,
            roles: [
                {
                    role: "x",
                    binnable: true,
                    axisSelection: specColumns.x && specColumns.x.quantitative ? "range" : "exact",
                    axisSelectionBetweenTicks: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).XBins
                    ]
                },
                {
                    role: "y",
                    binnable: true,
                    axisSelection: specColumns.y && specColumns.y.quantitative ? "range" : "exact",
                    axisSelectionBetweenTicks: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).YBins
                    ]
                },
                {
                    role: "z",
                    axisSelection: specColumns.z && specColumns.z.quantitative ? "range" : "exact",
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
                    allowNone: (0, $7fe4016d5da6d504$export$d3be63162ba033ae),
                    excludeCategoric: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).TreeMapMethod
                    ]
                },
                {
                    role: "facet",
                    allowNone: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetVBins
                    ]
                }
            ]
        }
    };
}



function $0e5537dc1b4c969f$export$2e2bcd8739ae039(specContext) {
    const { specColumns: specColumns  } = specContext;
    const squareProps = {
        sortBy: specColumns.sort,
        fillDirection: "right-down",
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
                layoutType: "Square",
                props: squareProps
            }
        ],
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: "z",
                    axisSelection: specColumns.z && specColumns.z.quantitative ? "range" : "exact",
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
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetVBins
                    ]
                }
            ]
        }
    };
}



function $cabbea1bb44c3af8$export$2e2bcd8739ae039(specContext) {
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
                layoutType: "Scatter",
                props: scatterProps
            }
        ],
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: "x",
                    axisSelection: specColumns.x && specColumns.x.quantitative ? "range" : "exact"
                },
                {
                    role: "y",
                    axisSelection: specColumns.y && specColumns.y.quantitative ? "range" : "exact"
                },
                {
                    role: "z",
                    axisSelection: specColumns.z && specColumns.z.quantitative ? "range" : "exact",
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
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetVBins
                    ]
                }
            ],
            signals: [
                (0, $ec270fbe8d9983b4$export$809e371dee643808).PointScale,
                (0, $ec270fbe8d9983b4$export$809e371dee643808).ZGrounded
            ]
        }
    };
}




function $ad60c0d5f2be70b9$export$2e2bcd8739ae039(specContext) {
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
        orientation: "horizontal",
        groupby: {
            column: specColumns.y,
            defaultBins: $17564e8cec2b9f75$export$4a9b1843df49fbce,
            maxbinsSignalName: (0, $ec270fbe8d9983b4$export$809e371dee643808).YBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.YMaxBins,
            maxbins: $17564e8cec2b9f75$export$15c9d32f115776f9
        },
        minBandWidth: (0, $17564e8cec2b9f75$export$929dfe98c4c4722c),
        showAxes: true
    };
    const vBandProps = {
        excludeEncodingRuleMap: true,
        orientation: "vertical",
        groupby: {
            column: specColumns.x,
            defaultBins: $17564e8cec2b9f75$export$4a9b1843df49fbce,
            maxbinsSignalName: (0, $ec270fbe8d9983b4$export$809e371dee643808).XBins,
            maxbinsSignalDisplayName: specContext.specViewOptions.language.XMaxBins,
            maxbins: $17564e8cec2b9f75$export$15c9d32f115776f9
        },
        minBandWidth: (0, $17564e8cec2b9f75$export$929dfe98c4c4722c),
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
            }
        ],
        specCapabilities: {
            countsAndSums: false,
            roles: [
                {
                    role: "x",
                    binnable: true,
                    axisSelection: specColumns.x && specColumns.x.quantitative ? "range" : "exact",
                    axisSelectionBetweenTicks: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).XBins
                    ]
                },
                {
                    role: "y",
                    binnable: true,
                    axisSelection: specColumns.y && specColumns.y.quantitative ? "range" : "exact",
                    axisSelectionBetweenTicks: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).YBins
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
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetVBins
                    ]
                }
            ]
        }
    };
}



function $484a23b50e74118e$export$2e2bcd8739ae039(specContext) {
    const { specColumns: specColumns  } = specContext;
    const stripProps = {
        sortOrder: "ascending",
        orientation: "vertical",
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
            aggregate: specColumns.size ? "sum" : "count"
        };
        const globalAggregateMaxExtentScaledSignal = "globalAggregateMaxExtentScaledSignal";
        const globalAggregateMaxExtentSignal = "globalAggregateMaxExtentSignal";
        const props = {
            dock: "top",
            niceScale: false,
            globalAggregateMaxExtentScaledSignal: globalAggregateMaxExtentScaledSignal,
            globalAggregateMaxExtentSignal: globalAggregateMaxExtentSignal,
            sumBy: specColumns.size,
            showAxes: false
        };
        layouts.push({
            layoutType: "AggregateContainer",
            props: props
        });
    }
    layouts.push({
        layoutType: "Strip",
        props: stripProps
    });
    return {
        axisScales: axisScales,
        layouts: layouts,
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
                    axisSelection: specColumns.z && specColumns.z.quantitative ? "range" : "exact",
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
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetVBins
                    ]
                }
            ]
        }
    };
}



function $248901cc968463fe$export$2e2bcd8739ae039(specContext) {
    const { specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
    const treemapProps = {
        corner: "top-left",
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
            aggregate: "sum"
        };
        const globalAggregateMaxExtentScaledSignal = "globalAggregateMaxExtentScaledSignal";
        const globalAggregateMaxExtentSignal = "globalAggregateMaxExtentSignal";
        const props = {
            dock: "top",
            niceScale: false,
            globalAggregateMaxExtentScaledSignal: globalAggregateMaxExtentScaledSignal,
            globalAggregateMaxExtentSignal: globalAggregateMaxExtentSignal,
            sumBy: specColumns.size,
            showAxes: false
        };
        layouts.push({
            layoutType: "AggregateContainer",
            props: props
        });
    }
    layouts.push({
        layoutType: "Treemap",
        props: treemapProps
    });
    return {
        axisScales: axisScales,
        layouts: layouts,
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
                    axisSelection: specColumns.z && specColumns.z.quantitative ? "range" : "exact",
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
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetBins
                    ]
                },
                {
                    role: "facetV",
                    allowNone: true,
                    signals: [
                        (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetVBins
                    ]
                }
            ],
            signals: [
                (0, $ec270fbe8d9983b4$export$809e371dee643808).TreeMapMethod
            ]
        }
    };
}



function $dd293f8894d4c075$export$fb43a8c8f10fdc99(facetStyle, facetColumn, facetVColumn, axisTextColor) {
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
                    axisTextColor: axisTextColor,
                    colRowTitles: true,
                    groupbyX: groupby,
                    groupbyY: facetVColumn
                };
                layoutPair = {
                    layoutType: "Cross",
                    props: props
                };
                facetPadding = {
                    bottom: (0, $17564e8cec2b9f75$export$bdb7a7da14f9ff2b),
                    left: (0, $17564e8cec2b9f75$export$6bd206e55cb747ae),
                    top: 0
                };
                plotPadding.y = (0, $17564e8cec2b9f75$export$c2b9f0002271e8ba);
                plotPadding.x = (0, $17564e8cec2b9f75$export$c11851bee1b89f04);
                break;
            }
        case "wrap":
        default:
            {
                const props = {
                    axisTextColor: axisTextColor,
                    cellTitles: true,
                    groupby: groupby
                };
                layoutPair = {
                    layoutType: "Wrap",
                    props: props
                };
                facetPadding = {
                    bottom: (0, $17564e8cec2b9f75$export$bdb7a7da14f9ff2b),
                    left: (0, $17564e8cec2b9f75$export$6bd206e55cb747ae),
                    top: (0, $17564e8cec2b9f75$export$c2b9f0002271e8ba)
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




const $81fdb423dd3f4d9b$var$map = {
    barchart: (0, $89432af83262137a$export$2e2bcd8739ae039),
    barchartH: $9d0255b0e2eb5a6d$export$2e2bcd8739ae039,
    barchartV: $89432af83262137a$export$2e2bcd8739ae039,
    density: $e99549e32deab63c$export$2e2bcd8739ae039,
    grid: $0e5537dc1b4c969f$export$2e2bcd8739ae039,
    scatterplot: $cabbea1bb44c3af8$export$2e2bcd8739ae039,
    stacks: $ad60c0d5f2be70b9$export$2e2bcd8739ae039,
    strips: $484a23b50e74118e$export$2e2bcd8739ae039,
    treemap: $248901cc968463fe$export$2e2bcd8739ae039
};
function $81fdb423dd3f4d9b$export$104083a36c1647a7(specContext) {
    const { insight: insight , specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
    const fn = $81fdb423dd3f4d9b$var$map[insight.chart];
    if (fn) {
        const props = fn(specContext);
        if (insight.columns.facet) {
            const discreteFacetColumn = {
                column: specColumns.facet,
                defaultBins: $17564e8cec2b9f75$export$4a9b1843df49fbce,
                maxbins: $17564e8cec2b9f75$export$15c9d32f115776f9,
                maxbinsSignalDisplayName: specViewOptions.language.FacetMaxBins,
                maxbinsSignalName: (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetBins
            };
            const discreteFacetVColumn = {
                column: specColumns.facetV,
                defaultBins: $17564e8cec2b9f75$export$4a9b1843df49fbce,
                maxbins: $17564e8cec2b9f75$export$15c9d32f115776f9,
                maxbinsSignalDisplayName: specViewOptions.language.FacetVMaxBins,
                maxbinsSignalName: (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetVBins
            };
            const { facetLayout: facetLayout , layoutPair: layoutPair  } = (0, $dd293f8894d4c075$export$fb43a8c8f10fdc99)(insight.facetStyle, discreteFacetColumn, discreteFacetVColumn, specViewOptions.colors.axisText);
            props.layouts.unshift(layoutPair);
            props.facetLayout = facetLayout;
        }
        return props;
    }
}


var $ae86bb470afa6626$exports = {};

$parcel$export($ae86bb470afa6626$exports, "getColumnsFromData", () => $ae86bb470afa6626$export$3f19ad07848df794);
$parcel$export($ae86bb470afa6626$exports, "inferAll", () => $ae86bb470afa6626$export$e04a97cc71178399);
$parcel$export($ae86bb470afa6626$exports, "getSpecColumns", () => $ae86bb470afa6626$export$9e6128b2231f5173);
$parcel$export($ae86bb470afa6626$exports, "getStats", () => $ae86bb470afa6626$export$432f698644f45d1);
function $67aa9bbf7ac601ea$export$2e2bcd8739ae039(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
}
function $67aa9bbf7ac601ea$export$8b58be045bf06082(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for(var key in definition)prototype[key] = definition[key];
    return prototype;
}


function $fe67bfce8e40eaac$export$892596cec99bc70e() {}
var $fe67bfce8e40eaac$export$4adafc6ed0600c10 = 0.7;
var $fe67bfce8e40eaac$export$9eace2cc0d12c98d = 1 / $fe67bfce8e40eaac$export$4adafc6ed0600c10;
var $fe67bfce8e40eaac$var$reI = "\\s*([+-]?\\d+)\\s*", $fe67bfce8e40eaac$var$reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", $fe67bfce8e40eaac$var$reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $fe67bfce8e40eaac$var$reHex = /^#([0-9a-f]{3,8})$/, $fe67bfce8e40eaac$var$reRgbInteger = new RegExp("^rgb\\(" + [
    $fe67bfce8e40eaac$var$reI,
    $fe67bfce8e40eaac$var$reI,
    $fe67bfce8e40eaac$var$reI
] + "\\)$"), $fe67bfce8e40eaac$var$reRgbPercent = new RegExp("^rgb\\(" + [
    $fe67bfce8e40eaac$var$reP,
    $fe67bfce8e40eaac$var$reP,
    $fe67bfce8e40eaac$var$reP
] + "\\)$"), $fe67bfce8e40eaac$var$reRgbaInteger = new RegExp("^rgba\\(" + [
    $fe67bfce8e40eaac$var$reI,
    $fe67bfce8e40eaac$var$reI,
    $fe67bfce8e40eaac$var$reI,
    $fe67bfce8e40eaac$var$reN
] + "\\)$"), $fe67bfce8e40eaac$var$reRgbaPercent = new RegExp("^rgba\\(" + [
    $fe67bfce8e40eaac$var$reP,
    $fe67bfce8e40eaac$var$reP,
    $fe67bfce8e40eaac$var$reP,
    $fe67bfce8e40eaac$var$reN
] + "\\)$"), $fe67bfce8e40eaac$var$reHslPercent = new RegExp("^hsl\\(" + [
    $fe67bfce8e40eaac$var$reN,
    $fe67bfce8e40eaac$var$reP,
    $fe67bfce8e40eaac$var$reP
] + "\\)$"), $fe67bfce8e40eaac$var$reHslaPercent = new RegExp("^hsla\\(" + [
    $fe67bfce8e40eaac$var$reN,
    $fe67bfce8e40eaac$var$reP,
    $fe67bfce8e40eaac$var$reP,
    $fe67bfce8e40eaac$var$reN
] + "\\)$");
var $fe67bfce8e40eaac$var$named = {
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
(0, $67aa9bbf7ac601ea$export$2e2bcd8739ae039)($fe67bfce8e40eaac$export$892596cec99bc70e, $fe67bfce8e40eaac$export$2e2bcd8739ae039, {
    copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
        return this.rgb().displayable();
    },
    hex: $fe67bfce8e40eaac$var$color_formatHex,
    formatHex: $fe67bfce8e40eaac$var$color_formatHex,
    formatHsl: $fe67bfce8e40eaac$var$color_formatHsl,
    formatRgb: $fe67bfce8e40eaac$var$color_formatRgb,
    toString: $fe67bfce8e40eaac$var$color_formatRgb
});
function $fe67bfce8e40eaac$var$color_formatHex() {
    return this.rgb().formatHex();
}
function $fe67bfce8e40eaac$var$color_formatHsl() {
    return $fe67bfce8e40eaac$export$8133dc3fa904d6d1(this).formatHsl();
}
function $fe67bfce8e40eaac$var$color_formatRgb() {
    return this.rgb().formatRgb();
}
function $fe67bfce8e40eaac$export$2e2bcd8739ae039(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = $fe67bfce8e40eaac$var$reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? $fe67bfce8e40eaac$var$rgbn(m) // #ff0000
     : l === 3 ? new $fe67bfce8e40eaac$export$5e05a94393ac29e3(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
     : l === 8 ? $fe67bfce8e40eaac$var$rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
     : l === 4 ? $fe67bfce8e40eaac$var$rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
     : null // invalid hex
    ) : (m = $fe67bfce8e40eaac$var$reRgbInteger.exec(format)) ? new $fe67bfce8e40eaac$export$5e05a94393ac29e3(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
     : (m = $fe67bfce8e40eaac$var$reRgbPercent.exec(format)) ? new $fe67bfce8e40eaac$export$5e05a94393ac29e3(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
     : (m = $fe67bfce8e40eaac$var$reRgbaInteger.exec(format)) ? $fe67bfce8e40eaac$var$rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
     : (m = $fe67bfce8e40eaac$var$reRgbaPercent.exec(format)) ? $fe67bfce8e40eaac$var$rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
     : (m = $fe67bfce8e40eaac$var$reHslPercent.exec(format)) ? $fe67bfce8e40eaac$var$hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
     : (m = $fe67bfce8e40eaac$var$reHslaPercent.exec(format)) ? $fe67bfce8e40eaac$var$hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
     : $fe67bfce8e40eaac$var$named.hasOwnProperty(format) ? $fe67bfce8e40eaac$var$rgbn($fe67bfce8e40eaac$var$named[format]) // eslint-disable-line no-prototype-builtins
     : format === "transparent" ? new $fe67bfce8e40eaac$export$5e05a94393ac29e3(NaN, NaN, NaN, 0) : null;
}
function $fe67bfce8e40eaac$var$rgbn(n) {
    return new $fe67bfce8e40eaac$export$5e05a94393ac29e3(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
function $fe67bfce8e40eaac$var$rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new $fe67bfce8e40eaac$export$5e05a94393ac29e3(r, g, b, a);
}
function $fe67bfce8e40eaac$export$42da0a331c2802f5(o) {
    if (!(o instanceof $fe67bfce8e40eaac$export$892596cec99bc70e)) o = $fe67bfce8e40eaac$export$2e2bcd8739ae039(o);
    if (!o) return new $fe67bfce8e40eaac$export$5e05a94393ac29e3;
    o = o.rgb();
    return new $fe67bfce8e40eaac$export$5e05a94393ac29e3(o.r, o.g, o.b, o.opacity);
}
function $fe67bfce8e40eaac$export$8972dc0e6ad9238f(r, g, b, opacity) {
    return arguments.length === 1 ? $fe67bfce8e40eaac$export$42da0a331c2802f5(r) : new $fe67bfce8e40eaac$export$5e05a94393ac29e3(r, g, b, opacity == null ? 1 : opacity);
}
function $fe67bfce8e40eaac$export$5e05a94393ac29e3(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
}
(0, $67aa9bbf7ac601ea$export$2e2bcd8739ae039)($fe67bfce8e40eaac$export$5e05a94393ac29e3, $fe67bfce8e40eaac$export$8972dc0e6ad9238f, (0, $67aa9bbf7ac601ea$export$8b58be045bf06082)($fe67bfce8e40eaac$export$892596cec99bc70e, {
    brighter: function(k) {
        k = k == null ? $fe67bfce8e40eaac$export$9eace2cc0d12c98d : Math.pow($fe67bfce8e40eaac$export$9eace2cc0d12c98d, k);
        return new $fe67bfce8e40eaac$export$5e05a94393ac29e3(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? $fe67bfce8e40eaac$export$4adafc6ed0600c10 : Math.pow($fe67bfce8e40eaac$export$4adafc6ed0600c10, k);
        return new $fe67bfce8e40eaac$export$5e05a94393ac29e3(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
        return this;
    },
    displayable: function() {
        return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: $fe67bfce8e40eaac$var$rgb_formatHex,
    formatHex: $fe67bfce8e40eaac$var$rgb_formatHex,
    formatRgb: $fe67bfce8e40eaac$var$rgb_formatRgb,
    toString: $fe67bfce8e40eaac$var$rgb_formatRgb
}));
function $fe67bfce8e40eaac$var$rgb_formatHex() {
    return "#" + $fe67bfce8e40eaac$var$hex(this.r) + $fe67bfce8e40eaac$var$hex(this.g) + $fe67bfce8e40eaac$var$hex(this.b);
}
function $fe67bfce8e40eaac$var$rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function $fe67bfce8e40eaac$var$hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
}
function $fe67bfce8e40eaac$var$hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new $fe67bfce8e40eaac$var$Hsl(h, s, l, a);
}
function $fe67bfce8e40eaac$export$8133dc3fa904d6d1(o) {
    if (o instanceof $fe67bfce8e40eaac$var$Hsl) return new $fe67bfce8e40eaac$var$Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof $fe67bfce8e40eaac$export$892596cec99bc70e)) o = $fe67bfce8e40eaac$export$2e2bcd8739ae039(o);
    if (!o) return new $fe67bfce8e40eaac$var$Hsl;
    if (o instanceof $fe67bfce8e40eaac$var$Hsl) return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
    } else s = l > 0 && l < 1 ? 0 : h;
    return new $fe67bfce8e40eaac$var$Hsl(h, s, l, o.opacity);
}
function $fe67bfce8e40eaac$export$8f4a7c0bb78e6ea8(h, s, l, opacity) {
    return arguments.length === 1 ? $fe67bfce8e40eaac$export$8133dc3fa904d6d1(h) : new $fe67bfce8e40eaac$var$Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function $fe67bfce8e40eaac$var$Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
}
(0, $67aa9bbf7ac601ea$export$2e2bcd8739ae039)($fe67bfce8e40eaac$var$Hsl, $fe67bfce8e40eaac$export$8f4a7c0bb78e6ea8, (0, $67aa9bbf7ac601ea$export$8b58be045bf06082)($fe67bfce8e40eaac$export$892596cec99bc70e, {
    brighter: function(k) {
        k = k == null ? $fe67bfce8e40eaac$export$9eace2cc0d12c98d : Math.pow($fe67bfce8e40eaac$export$9eace2cc0d12c98d, k);
        return new $fe67bfce8e40eaac$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? $fe67bfce8e40eaac$export$4adafc6ed0600c10 : Math.pow($fe67bfce8e40eaac$export$4adafc6ed0600c10, k);
        return new $fe67bfce8e40eaac$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
        return new $fe67bfce8e40eaac$export$5e05a94393ac29e3($fe67bfce8e40eaac$var$hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), $fe67bfce8e40eaac$var$hsl2rgb(h, m1, m2), $fe67bfce8e40eaac$var$hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
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
/* From FvD 13.37, CSS Color Module Level 3 */ function $fe67bfce8e40eaac$var$hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}



function $ae86bb470afa6626$var$isColor(cssColorSpecifier) {
    return !!(0, $fe67bfce8e40eaac$export$2e2bcd8739ae039)(cssColorSpecifier);
}
function $ae86bb470afa6626$var$isQuantitative(column) {
    return column.type === "number" || column.type === "integer";
}
function $ae86bb470afa6626$export$3f19ad07848df794(inferTypesFn, data, columnTypes) {
    const sample = data[0];
    const fields = sample ? Object.keys(sample) : [];
    const inferences = Object.assign(Object.assign({}, inferTypesFn(data, fields)), columnTypes);
    const columns = fields.map((name)=>{
        const column = {
            name: name,
            type: inferences[name]
        };
        return column;
    });
    $ae86bb470afa6626$export$e04a97cc71178399(columns, data);
    return columns;
}
function $ae86bb470afa6626$export$9e6128b2231f5173(insight, columns) {
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
function $ae86bb470afa6626$export$e04a97cc71178399(columns, data) {
    columns.forEach((column)=>{
        if (column) {
            if (typeof column.quantitative !== "boolean") column.quantitative = $ae86bb470afa6626$var$isQuantitative(column);
            if (!column.stats) column.stats = $ae86bb470afa6626$export$432f698644f45d1(data, column);
            if (column.type === "string" && typeof column.isColorData !== "boolean") $ae86bb470afa6626$var$checkIsColorData(data, column);
        }
    });
}
function $ae86bb470afa6626$var$checkIsColorData(data, column) {
    if (!column.stats.hasColorData) {
        column.isColorData = false;
        return;
    }
    for(let i = 0; i < data.length; i++)if (!$ae86bb470afa6626$var$isColor(data[i][column.name])) {
        column.isColorData = false;
        return;
    }
    column.isColorData = true;
}
function $ae86bb470afa6626$export$432f698644f45d1(data, column) {
    const distinctMap = {};
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
        if (column.type === "string" && !stats.hasColorData && $ae86bb470afa6626$var$isColor(value)) stats.hasColorData = true;
    }
    if (column.quantitative) {
        stats.mean = data.length > 0 && sum / data.length;
        stats.hasNegative = $ae86bb470afa6626$var$detectNegative(column, data);
        if (column.type === "integer") stats.isSequential = $ae86bb470afa6626$var$detectSequentialColumn(column, data);
    }
    stats.distinctValueCount = Object.keys(distinctMap).length;
    return stats;
}
function $ae86bb470afa6626$var$detectNegative(column, data) {
    for(let i = 1; i < data.length; i++){
        if (data[i][column.name] < 0) return true;
    }
    return false;
}
function $ae86bb470afa6626$var$detectSequentialColumn(column, data) {
    if (data.length < 2) return false;
    let colname = column.name;
    for(let i = 1; i < data.length; i++){
        if (data[i][colname] !== data[i - 1][colname] + 1) return false;
    }
    return true;
}




function $b15ad8fb3905384f$export$b18909608a999daa(scope, ...axis) {
    if (!scope.axes) scope.axes = [];
    scope.axes.push(...axis);
}
function $b15ad8fb3905384f$export$6853292f627997e4(scope, ...data) {
    if (!scope.data) scope.data = [];
    scope.data.push(...data);
}
function $b15ad8fb3905384f$export$3df320e901c23a48(scope, ...marks) {
    if (!scope.marks) scope.marks = [];
    scope.marks.push(...marks);
}
function $b15ad8fb3905384f$export$290268902279a991(scope, ...scale) {
    if (!scope.scales) scope.scales = [];
    scope.scales.push(...scale.filter(Boolean));
}
function $b15ad8fb3905384f$export$5346a0d8a9111b3f(scope, ...signal) {
    if (!scope.signals) scope.signals = [];
    scope.signals.push(...signal);
}
function $b15ad8fb3905384f$export$eea5d31e98930019(data, ...transforms) {
    if (!data.transform) data.transform = [];
    data.transform.push(...transforms);
}
function $b15ad8fb3905384f$export$ef4373c7e62b2278(data, dataName) {
    for(let i = 0; i < data.length; i++){
        if (data[i].name === dataName) return {
            data: data[i],
            index: i
        };
    }
}
function $b15ad8fb3905384f$export$53a21aeef48e14a8(groupings) {
    const groupby = groupings.map((g)=>g.groupby);
    return groupby.reduce((acc, val)=>acc.concat(val), []);
}
function $b15ad8fb3905384f$export$e6b6683aec0fe907(...offsets) {
    return offsets.filter(Boolean).join(" + ");
}


function $4414e2f92de0ee30$export$3678bfcfeaea7c36(props1) {
    const { axesOffsets: axesOffsets , axisScales: axisScales , axesScopes: axesScopes , axesTitlePadding: axesTitlePadding , allGlobalScales: allGlobalScales , globalScope: globalScope , labelBaseline: labelBaseline , plotOffsetSignals: plotOffsetSignals , specColumns: specColumns , specViewOptions: specViewOptions  } = props1;
    const { scope: scope  } = globalScope;
    allGlobalScales.forEach((globalScales)=>{
        const { scales: scales  } = globalScales;
        for(let xyz in scales){
            let _scales = scales[xyz];
            if (_scales) {
                (0, $b15ad8fb3905384f$export$290268902279a991)(scope, ..._scales);
                let { showAxes: showAxes  } = globalScales;
                let zindex = undefined;
                if (xyz === "z") {
                    showAxes = false;
                    if (props1.view === "3d" && specViewOptions.zAxisOptions && !props1.faceted) {
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
                        const horizontal = xyz === "x";
                        const column = specColumns[xyz] || {
                            quantitative: true
                        };
                        const title = axisScale.title;
                        const props = {
                            title: title,
                            horizontal: horizontal,
                            column: column,
                            specViewOptions: specViewOptions,
                            lineColor: lineColor,
                            titlePadding: axesTitlePadding[xyz],
                            labelBaseline: labelBaseline[xyz],
                            zindex: zindex
                        };
                        axesScopes["main"].forEach((a)=>(0, $b15ad8fb3905384f$export$b18909608a999daa)(a.scope, $4414e2f92de0ee30$var$createAxis(Object.assign(Object.assign({}, props), {
                                scale: a.scale || _scales[0],
                                showTitle: a.title,
                                showLabels: a.labels,
                                showLines: a.lines
                            }))));
                        if (axesScopes[xyz]) axesScopes[xyz].forEach((a)=>(0, $b15ad8fb3905384f$export$b18909608a999daa)(a.scope, $4414e2f92de0ee30$var$createAxis(Object.assign(Object.assign({}, props), {
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
function $4414e2f92de0ee30$var$createAxis(props) {
    const { column: column , horizontal: horizontal , labelBaseline: labelBaseline , lineColor: lineColor , scale: scale , showLabels: showLabels , showTitle: showTitle , showLines: showLines , specViewOptions: specViewOptions , title: title , titlePadding: titlePadding , zindex: zindex  } = props;
    const axis = Object.assign(Object.assign(Object.assign(Object.assign({
        zindex: zindex,
        scale: scale.name,
        orient: horizontal ? "bottom" : "left",
        domain: showLines,
        ticks: showLines
    }, showLines && {
        domainColor: lineColor,
        tickColor: lineColor,
        tickSize: specViewOptions.tickSize
    }), showTitle && {
        title: title,
        titleAlign: horizontal ? "left" : "right",
        titleAngle: {
            signal: horizontal ? (0, $ec270fbe8d9983b4$export$809e371dee643808).TextAngleX : (0, $ec270fbe8d9983b4$export$809e371dee643808).TextAngleY
        },
        titleColor: specViewOptions.colors.axisText,
        titleFontSize: {
            signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).TextTitleSize
        },
        titleLimit: (0, $17564e8cec2b9f75$export$d3da25ad66816957),
        titlePadding: titlePadding
    }), {
        labels: showLabels
    }), showLabels && {
        labelAlign: horizontal ? "left" : "right",
        labelBaseline: labelBaseline,
        labelAngle: {
            signal: horizontal ? (0, $ec270fbe8d9983b4$export$809e371dee643808).TextAngleX : (0, $ec270fbe8d9983b4$export$809e371dee643808).TextAngleY
        },
        labelColor: specViewOptions.colors.axisText,
        labelFontSize: {
            signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).TextSize
        },
        labelLimit: (0, $17564e8cec2b9f75$export$2aa02e522549e01e)
    });
    if (column.quantitative) axis.format = "~r";
    return axis;
}




function $ac5b955a06ced550$export$fb70365b00e8cb7b(field) {
    return field.replace(".", "\\.").replace("[", "\\[").replace("]", "\\]");
}
function $ac5b955a06ced550$export$74df930fa4adaae4(field) {
    //remove whitespace, period, accessors and logical modifiers
    return field.replace(/[.,:;+=\-/<>{}|~!@#$%^*[\]`'"()?\s\\]/g, "");
}


function $c0bec0cf2b65a746$export$fefe9507ec0904ed(scaleName, data, field, range, reverse, zero) {
    const scale = {
        name: scaleName,
        type: "linear",
        range: range,
        round: true,
        reverse: reverse,
        domain: {
            data: data,
            field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(field)
        },
        zero: zero,
        nice: true
    };
    return scale;
}
function $c0bec0cf2b65a746$export$b67158f831e00d0d(scaleName, data, range, field, reverse) {
    const scale = {
        name: scaleName,
        type: "point",
        range: range,
        domain: {
            data: data,
            field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(field),
            sort: true
        },
        padding: 0.5
    };
    if (reverse !== undefined) scale.reverse = reverse;
    return scale;
}
function $c0bec0cf2b65a746$export$530110e7506d659d(scaleName, colorBin, data, field, scheme) {
    scheme = scheme || (0, $ec270fbe8d9983b4$export$c991c3dd58d9959c);
    const domain = {
        data: data,
        field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(field)
    };
    const range = {
        scheme: scheme
    };
    const reverse = {
        signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).ColorReverse
    };
    if (colorBin !== "continuous") range.count = {
        signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).ColorBinCount
    };
    switch(colorBin){
        case "continuous":
            {
                const sequentialScale = {
                    name: scaleName,
                    type: "linear",
                    domain: domain,
                    range: range,
                    reverse: reverse
                };
                return sequentialScale;
            }
        case "quantile":
            {
                const quantileScale = {
                    name: scaleName,
                    type: "quantile",
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
                    type: "quantize",
                    domain: domain,
                    range: range,
                    reverse: reverse
                };
                return quantizeScale;
            }
    }
}



const $7b42c6682d6a3c62$export$7bc9b23ce3036e78 = 0.6;
function $7b42c6682d6a3c62$export$d9407ec206a3236c(context, heightSignal) {
    const { specViewOptions: specViewOptions  } = context;
    const signals = [
        {
            name: (0, $ec270fbe8d9983b4$export$809e371dee643808).ZProportion,
            value: $7b42c6682d6a3c62$export$7bc9b23ce3036e78,
            bind: {
                name: specViewOptions.language.zScaleProportion,
                debounce: 50,
                input: "range",
                min: 0.2,
                max: 2,
                step: 0.1
            }
        },
        {
            name: (0, $ec270fbe8d9983b4$export$809e371dee643808).ZHeight,
            update: `${heightSignal} * ${(0, $ec270fbe8d9983b4$export$809e371dee643808).ZProportion}`
        },
        {
            name: (0, $ec270fbe8d9983b4$export$809e371dee643808).TextScale,
            value: 1.2,
            bind: {
                name: specViewOptions.language.textScaleSignal,
                debounce: 50,
                input: "range",
                min: 0.5,
                max: 2,
                step: 0.1
            }
        },
        {
            name: (0, $ec270fbe8d9983b4$export$809e371dee643808).TextSize,
            update: `${(0, $ec270fbe8d9983b4$export$809e371dee643808).TextScale} * 10`
        },
        {
            name: (0, $ec270fbe8d9983b4$export$809e371dee643808).TextTitleSize,
            update: `${(0, $ec270fbe8d9983b4$export$809e371dee643808).TextScale} * 15`
        },
        {
            name: (0, $ec270fbe8d9983b4$export$809e371dee643808).TextAngleX,
            value: 30,
            bind: {
                name: specViewOptions.language.xAxisTextAngleSignal,
                debounce: 50,
                input: "range",
                min: 0,
                max: 90,
                step: 1
            }
        },
        {
            name: (0, $ec270fbe8d9983b4$export$809e371dee643808).TextAngleY,
            value: 0,
            bind: {
                name: specViewOptions.language.yAxisTextAngleSignal,
                debounce: 50,
                input: "range",
                min: -90,
                max: 0,
                step: 1
            }
        },
        {
            name: (0, $ec270fbe8d9983b4$export$809e371dee643808).MarkOpacity,
            value: 1,
            bind: {
                name: specViewOptions.language.markOpacitySignal,
                debounce: 50,
                input: "range",
                min: 0.1,
                max: 1,
                step: 0.05
            }
        }
    ];
    return signals;
}
function $7b42c6682d6a3c62$export$641fa4f0ca86c2ad(context) {
    const { specViewOptions: specViewOptions  } = context;
    const signal = {
        name: (0, $ec270fbe8d9983b4$export$809e371dee643808).ColorBinCount,
        value: 7,
        bind: {
            name: specViewOptions.language.colorBinCount,
            input: "range",
            min: 1,
            max: specViewOptions.maxLegends + 1,
            step: 1
        }
    };
    return signal;
}
function $7b42c6682d6a3c62$export$526461dda4c87775(context) {
    const { specViewOptions: specViewOptions  } = context;
    const signal = {
        name: (0, $ec270fbe8d9983b4$export$809e371dee643808).ColorReverse,
        value: false,
        bind: {
            name: specViewOptions.language.colorReverse,
            input: "checkbox"
        }
    };
    return signal;
}
function $7b42c6682d6a3c62$export$cdc9366ba30317bd(s, fn, update) {
    s.update = `${fn}((${s.update}), (${update}))`;
}



function $5cda356d1efb9fa8$var$legend(column, fill) {
    const legend1 = {
        orient: "none",
        title: column.name,
        fill: fill,
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
function $5cda356d1efb9fa8$export$765837a81fadca85(context, fill) {
    const { specColumns: specColumns , insight: insight  } = context;
    if (specColumns.color && !insight.hideLegend && !insight.directColor && !specColumns.color.isColorData) return [
        $5cda356d1efb9fa8$var$legend(specColumns.color, fill)
    ];
}




function $e92379a4118b5981$export$a4725aa19e8564dd(column, count, source, legend, lookupName, fieldName, indexName) {
    const data = [
        {
            name: lookupName,
            source: source,
            transform: [
                {
                    type: "aggregate",
                    groupby: [
                        (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(column.name)
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
                }
            ]
        },
        {
            name: legend,
            source: source,
            transform: [
                {
                    type: "lookup",
                    from: lookupName,
                    key: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(column.name),
                    fields: [
                        column.name
                    ].map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b)),
                    values: [
                        column.name
                    ].map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b)),
                    as: [
                        fieldName
                    ]
                },
                {
                    type: "formula",
                    expr: `datum[${JSON.stringify(fieldName)}] == null ? '${(0, $ec270fbe8d9983b4$export$8653a30c44b6e879)}' : datum[${JSON.stringify(fieldName)}]`,
                    as: fieldName
                }
            ]
        }
    ];
    return data;
}


function $af92c5b6b1f801f6$export$4c4d9288a45f1fb3(props) {
    const { colorReverseSignalName: colorReverseSignalName , dataName: dataName , scope: scope , legendDataName: legendDataName , scaleName: scaleName , specContext: specContext , topLookupName: topLookupName  } = props;
    let colorDataName = dataName;
    const { insight: insight , specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
    const legends = (0, $5cda356d1efb9fa8$export$765837a81fadca85)(specContext, scaleName);
    if (legends) scope.legends = legends;
    const categoricalColor = specColumns.color && !specColumns.color.quantitative;
    if (categoricalColor) {
        (0, $b15ad8fb3905384f$export$6853292f627997e4)(scope, ...(0, $e92379a4118b5981$export$a4725aa19e8564dd)(specColumns.color, specViewOptions.maxLegends, dataName, legendDataName, topLookupName, (0, $ec270fbe8d9983b4$export$10df5429b7082be2).TopColor, (0, $ec270fbe8d9983b4$export$10df5429b7082be2).TopIndex));
        colorDataName = legendDataName;
    }
    if (specColumns.color && !specColumns.color.isColorData && !insight.directColor) {
        if (specColumns.color.quantitative) (0, $b15ad8fb3905384f$export$290268902279a991)(scope, (0, $c0bec0cf2b65a746$export$530110e7506d659d)(scaleName, insight.colorBin, dataName, specColumns.color.name, insight.scheme));
        else (0, $b15ad8fb3905384f$export$290268902279a991)(scope, {
            name: scaleName,
            type: "ordinal",
            domain: {
                data: colorDataName,
                field: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).TopColor,
                sort: true
            },
            range: {
                scheme: insight.scheme || (0, $ec270fbe8d9983b4$export$c991c3dd58d9959c)
            },
            reverse: {
                signal: colorReverseSignalName
            }
        });
    }
    (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(scope, (0, $7b42c6682d6a3c62$export$641fa4f0ca86c2ad)(specContext), (0, $7b42c6682d6a3c62$export$526461dda4c87775)(specContext));
    return {
        topColorField: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).TopColor,
        colorDataName: colorDataName
    };
}







function $af332f9d870ab775$export$4fec84497b9e6e3f(globalScope, colTitleSource, rowTitleSource, sizeSignals, axisTextColor) {
    const titleSignal = `parent[${JSON.stringify((0, $ec270fbe8d9983b4$export$10df5429b7082be2).FacetTitle)}]`;
    const index = `datum[${JSON.stringify((0, $ec270fbe8d9983b4$export$10df5429b7082be2).Ordinal)}] - 1`;
    const col = $af332f9d870ab775$export$4f57a5f5fbf1456e(colTitleSource.dataName, sizeSignals, index);
    const row = $af332f9d870ab775$export$d0cc3dc227001793(rowTitleSource.dataName, sizeSignals, index);
    (0, $b15ad8fb3905384f$export$3df320e901c23a48)(globalScope, col.header, row.footer);
    (0, $b15ad8fb3905384f$export$3df320e901c23a48)(col.header, {
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
                    signal: `{search: parent[${JSON.stringify((0, $ec270fbe8d9983b4$export$10df5429b7082be2).FacetSearch)}]}`
                },
                x: {
                    signal: `${sizeSignals.layoutWidth} / 2`
                },
                limit: {
                    signal: sizeSignals.layoutWidth
                },
                fontSize: {
                    signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).TextSize
                },
                text: {
                    signal: titleSignal
                }
            }
        }
    });
    (0, $b15ad8fb3905384f$export$3df320e901c23a48)(row.footer, {
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
                    signal: `{search: parent[${JSON.stringify((0, $ec270fbe8d9983b4$export$10df5429b7082be2).FacetSearch)}]}`
                },
                y: {
                    signal: `${sizeSignals.layoutHeight} / 2`
                },
                limit: {
                    signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetRight
                },
                fontSize: {
                    signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).TextSize
                },
                text: {
                    signal: titleSignal
                }
            }
        }
    });
}
function $af332f9d870ab775$export$3735b1dd76112836(scope, sizeSignals, axisTextColor) {
    (0, $b15ad8fb3905384f$export$3df320e901c23a48)(scope, {
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
                    signal: `{search: parent[${JSON.stringify((0, $ec270fbe8d9983b4$export$10df5429b7082be2).FacetSearch)}]}`
                },
                x: {
                    signal: `(${sizeSignals.layoutWidth}) / 2`
                },
                text: {
                    signal: `parent[${JSON.stringify((0, $ec270fbe8d9983b4$export$10df5429b7082be2).FacetTitle)}]`
                },
                fontSize: {
                    signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).TextSize
                },
                limit: {
                    signal: sizeSignals.layoutWidth
                },
                y: {
                    signal: `-${(0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingTop} / 2`
                }
            }
        }
    });
}
function $af332f9d870ab775$export$9f0b19d6fd936707(props) {
    const { colSeqName: colSeqName , colTitleScale: colTitleScale , globalScope: globalScope , facetScope: facetScope , plotScope: plotScope , rowSeqName: rowSeqName , rowTitleScale: rowTitleScale  } = props;
    const { sizeSignals: sizeSignals  } = facetScope;
    const colSequence = $af332f9d870ab775$var$createSequence(colSeqName, sizeSignals.colCount);
    const rowSequence = $af332f9d870ab775$var$createSequence(rowSeqName, sizeSignals.rowCount);
    const index = "datum.data";
    const col = $af332f9d870ab775$export$4f57a5f5fbf1456e(colSeqName, sizeSignals, index);
    const row = $af332f9d870ab775$export$d0cc3dc227001793(rowSeqName, sizeSignals, index);
    (0, $b15ad8fb3905384f$export$6853292f627997e4)(globalScope, colSequence, rowSequence);
    (0, $b15ad8fb3905384f$export$3df320e901c23a48)(globalScope, col.footer, row.header);
    (0, $b15ad8fb3905384f$export$290268902279a991)(globalScope, colTitleScale, rowTitleScale);
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
function $af332f9d870ab775$export$d0cc3dc227001793(data, sizeSignals, index) {
    const rowFn = (xSignal)=>{
        return {
            type: "group",
            from: {
                data: data
            },
            encode: {
                update: {
                    x: {
                        signal: xSignal
                    },
                    y: {
                        signal: `${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetTop} + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingTop} + (${index}) * (${sizeSignals.layoutHeight} + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingTop} + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingBottom})`
                    },
                    height: {
                        signal: sizeSignals.layoutHeight
                    }
                }
            }
        };
    };
    const header = rowFn((0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetLeft);
    const footer = rowFn(`${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetLeft} + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotWidthOut} + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetRight} / 2`);
    return {
        header: header,
        footer: footer
    };
}
function $af332f9d870ab775$export$4f57a5f5fbf1456e(data, sizeSignals, index) {
    const colFn = (ySignal)=>{
        return {
            type: "group",
            from: {
                data: data
            },
            encode: {
                update: {
                    x: {
                        signal: `(${index}) * (${sizeSignals.layoutWidth} + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingLeft}) + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingLeft} + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetLeft}`
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
    const header = colFn(`${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetTop} / 2`);
    const footer = colFn(`${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetTop} + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotHeightOut}`);
    return {
        header: header,
        footer: footer
    };
}
function $af332f9d870ab775$var$createSequence(dataName, countSignal) {
    return {
        name: dataName,
        transform: [
            {
                type: "sequence",
                start: 0,
                stop: {
                    signal: countSignal
                }
            }
        ]
    };
}




function $e4dd5cb1520ca850$export$9563e054e6f787fb(context, colorFieldName, scale) {
    const { specColumns: specColumns , insight: insight , specViewOptions: specViewOptions  } = context;
    const colorColumn = specColumns.color;
    return colorColumn ? colorColumn.isColorData || insight.directColor ? {
        field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(colorColumn.name)
    } : {
        scale: scale,
        field: colorColumn.quantitative ? (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(colorColumn.name) : colorFieldName
    } : {
        value: specViewOptions.colors.defaultCube
    };
}
function $e4dd5cb1520ca850$export$c17a3be1057836e(context) {
    const result = {
        signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).MarkOpacity
    };
    return result;
}




class $f57e47af7971582e$export$5fdf684e73bb2de5 {
    constructor(props){
        const { dataName: dataName , markGroup: markGroup , scope: scope , signals: signals  } = props;
        this.scope = scope;
        this._markGroup = markGroup;
        this.signals = signals;
        this.data = (0, $b15ad8fb3905384f$export$ef4373c7e62b2278)(scope.data, dataName).data;
        this._markDataName = dataName;
        this.offsets = {
            x: "0",
            y: "0",
            h: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotHeightIn,
            w: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotWidthIn
        };
        this.sizeSignals = {
            layoutHeight: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotHeightIn,
            layoutWidth: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotWidthIn
        };
        this.zSize = (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotHeightIn;
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




class $9d478b599f3cbcb3$export$c84671f46d6a1ca {
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






function $17aa946a16979010$export$71c45f78b1166d35() {
    return `datum.${(0, $ec270fbe8d9983b4$export$10df5429b7082be2).Collapsed}`;
}


class $9ed4e979e13f36e6$export$fd744dfcd98e5f49 extends (0, $9d478b599f3cbcb3$export$c84671f46d6a1ca) {
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
                field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(this.props.sumBy.name),
                op: "sum",
                as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).Sum
            };
            return fieldOp;
        }
    }
    build() {
        const { aggregation: aggregation , names: names , props: props  } = this;
        const { dock: dock , globalScope: globalScope , groupings: groupings , niceScale: niceScale , parentScope: parentScope , showAxes: showAxes  } = props;
        (0, $b15ad8fb3905384f$export$eea5d31e98930019)(globalScope.data, Object.assign(Object.assign({}, this.getTransforms(aggregation, (0, $b15ad8fb3905384f$export$53a21aeef48e14a8)(groupings))), {
            as: [
                names.aggregateField
            ]
        }), {
            type: "extent",
            field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(names.aggregateField),
            signal: names.globalAggregateExtentSignal
        });
        (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(globalScope.scope, {
            name: props.globalAggregateMaxExtentSignal,
            update: `${names.globalAggregateExtentSignal}[1]`
        });
        const horizontal = dock === "left";
        const groupScaled = `scale(${JSON.stringify(names.scale)}, datum[${JSON.stringify(names.aggregateField)}])`;
        const offsets = {
            x: parentScope.offsets.x,
            y: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.y, dock === "bottom" ? groupScaled : ""),
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
            reverse: dock === "top"
        };
        const globalAggregateMaxExtentScaledValue = `scale(${JSON.stringify(names.scale)}, ${props.globalAggregateMaxExtentSignal})`;
        (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(globalScope.scope, {
            name: props.globalAggregateMaxExtentScaledSignal,
            update: dock === "bottom" ? `${parentScope.sizeSignals.layoutHeight} - ${globalAggregateMaxExtentScaledValue}` : globalAggregateMaxExtentScaledValue
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
                        test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                        signal: parentScope.offsets.x
                    }
                ],
                width: [
                    {
                        test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                        value: 0
                    }
                ]
            } : {
                y: [
                    {
                        test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                        signal: dock === "top" ? parentScope.offsets.y : (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.y, parentScope.offsets.h)
                    }
                ],
                height: [
                    {
                        test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                        value: 0
                    }
                ]
            }
        };
    }
    getTransforms(aggregation, groupby) {
        const trans = {
            type: "joinaggregate",
            groupby: groupby.map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b)),
            ops: [
                aggregation
            ]
        };
        if (aggregation === "sum") trans.fields = [
            this.props.sumBy.name
        ].map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b));
        return trans;
    }
    getAggregation() {
        const { props: props  } = this;
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






class $0c7796f44595fe7a$export$7eda37970b01b2c extends (0, $9d478b599f3cbcb3$export$c84671f46d6a1ca) {
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
        const { names: names , props: props  } = this;
        const { aggregation: aggregation , globalScope: globalScope , groupings: groupings , onBuild: onBuild , parentScope: parentScope  } = props;
        const { sizeSignals: sizeSignals  } = parentScope;
        (0, $b15ad8fb3905384f$export$eea5d31e98930019)(globalScope.data, Object.assign(Object.assign({}, this.getTransforms(aggregation, (0, $b15ad8fb3905384f$export$53a21aeef48e14a8)(groupings))), {
            as: [
                names.aggregateField
            ]
        }), {
            type: "extent",
            field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(names.aggregateField),
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
            x: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.x, `(${parentScope.offsets.w} - ${squareSide}) / 2`),
            y: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.y, `(${parentScope.offsets.h} - ${squareSide}) / 2`),
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
                        test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                        signal: offsets.y
                    }
                ],
                height: [
                    {
                        test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                        value: 0
                    }
                ]
            }
        };
    }
    getTransforms(aggregation, groupby) {
        const trans = {
            type: "joinaggregate",
            groupby: groupby.map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b)),
            ops: [
                aggregation
            ]
        };
        if (aggregation === "sum") trans.fields = [
            this.props.sumBy.name
        ].map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b));
        return trans;
    }
}





function $02bd8e9b090c20c5$export$6868fd1605c79d3d(prefix, domainDataName, discreteColumn) {
    const { column: column , defaultBins: defaultBins , maxbins: maxbins , maxbinsSignalDisplayName: maxbinsSignalDisplayName , maxbinsSignalName: maxbinsSignalName  } = discreteColumn;
    if (column.quantitative) {
        const field = `${prefix}_bin_${(0, $ac5b955a06ced550$export$74df930fa4adaae4)(column.name)}`;
        const fieldEnd = `${field}_end`;
        const binSignal = `${field}_bins`;
        const extentSignal = `${field}_bin_extent`;
        domainDataName = `${field}_sequence`; //override the data name
        const extentTransform = {
            type: "extent",
            field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(column.name),
            signal: extentSignal
        };
        const maxbinsSignal = {
            name: maxbinsSignalName,
            value: defaultBins,
            bind: {
                name: maxbinsSignalDisplayName,
                debounce: 50,
                input: "range",
                min: 1,
                max: maxbins,
                step: 1
            }
        };
        const binTransform = {
            type: "bin",
            field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(column.name),
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
                        (0, $ec270fbe8d9983b4$export$10df5429b7082be2).Ordinal
                    ]
                },
                {
                    type: "formula",
                    expr: `datum.data === ${binSignal}.start`,
                    as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).First
                },
                {
                    type: "formula",
                    expr: `datum.data === ${binSignal}.stop - ${binSignal}.step`,
                    as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).Last
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






class $95d7ab00f3235589$export$5b22a87d7feca398 extends (0, $9d478b599f3cbcb3$export$c84671f46d6a1ca) {
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
        this.bin = (0, $02bd8e9b090c20c5$export$6868fd1605c79d3d)(this.prefix, props.globalScope.data.name, props.groupby);
    }
    getGrouping() {
        return this.bin.fields;
    }
    build() {
        const { bin: bin , names: names , props: props  } = this;
        const { globalScope: globalScope , minBandWidth: minBandWidth , orientation: orientation , parentScope: parentScope , showAxes: showAxes  } = props;
        const binField = bin.fields[0];
        if (bin.native === false) {
            (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(globalScope.scope, ...bin.signals);
            (0, $b15ad8fb3905384f$export$eea5d31e98930019)(globalScope.data, ...bin.transforms);
            (0, $b15ad8fb3905384f$export$6853292f627997e4)(globalScope.scope, bin.dataSequence);
        }
        //TODO don't add this, use existing dataset
        (0, $b15ad8fb3905384f$export$6853292f627997e4)(globalScope.scope, {
            name: names.accumulative,
            source: bin.fullScaleDataname,
            transform: [
                {
                    type: "aggregate",
                    groupby: this.getGrouping().map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b)),
                    ops: [
                        "count"
                    ]
                }
            ]
        });
        const horizontal = orientation === "horizontal";
        const minCellSignal = horizontal ? globalScope.signals.minCellHeight : globalScope.signals.minCellWidth;
        (0, $7b42c6682d6a3c62$export$cdc9366ba30317bd)(minCellSignal, "max", `length(data(${JSON.stringify(names.accumulative)})) * ${minBandWidth}`);
        (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(globalScope.scope, {
            name: names.bandWidth,
            update: `bandwidth(${JSON.stringify(horizontal ? names.yScale : names.xScale)})`
        });
        const scales = this.getScales(bin, horizontal);
        let encodingRuleMap;
        if (!props.excludeEncodingRuleMap) encodingRuleMap = horizontal ? {
            x: [
                {
                    test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                    signal: parentScope.offsets.x
                }
            ],
            width: [
                {
                    test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                    value: 0
                }
            ]
        } : {
            y: [
                {
                    test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                    signal: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.y, parentScope.offsets.h)
                }
            ],
            height: [
                {
                    test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
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
        const { names: names , props: props  } = this;
        const { parentScope: parentScope  } = props;
        return {
            x: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.x, horizontal ? "" : `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(binField)}])`),
            y: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.y, horizontal ? `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(binField)}])` : ""),
            h: horizontal ? names.bandWidth : parentScope.offsets.h,
            w: horizontal ? parentScope.offsets.w : names.bandWidth
        };
    }
    getScales(bin, horizontal) {
        const { names: names  } = this;
        const { parentScope: parentScope  } = this.props;
        const binField = (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(bin.fields[0]);
        const scales = [];
        let bandScale;
        if (horizontal) bandScale = {
            type: "band",
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
            type: "band",
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





function $0d0febe286e673b1$export$f241323700beca17(bin) {
    const val = (index)=>`datum[${JSON.stringify(bin.fields[index])}]`;
    return bin.discreteColumn.column.quantitative ? `format(${val(0)}, '~r') + ' - ' + format(${val(1)}, '~r')` : val(0);
}
function $0d0febe286e673b1$var$obj(nameValues, clause) {
    if (clause) nameValues = [
        clause,
        ...nameValues
    ];
    return `{${nameValues.join()}}`;
}
function $0d0febe286e673b1$export$b292ca0d4c2e4690(bin, firstFieldName, lastFieldName, clause) {
    if (bin.discreteColumn.column.quantitative) {
        const low = [
            `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
            "operator:'>='",
            `value:datum[${JSON.stringify(bin.fields[0])}]`
        ];
        const high = [
            "clause:'&&'",
            `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
            "operator:'<'",
            `value:datum[${JSON.stringify(bin.fields[1])}]`
        ];
        return $0d0febe286e673b1$var$obj([
            `expressions:[ datum[${JSON.stringify(firstFieldName)}] ? null : ${$0d0febe286e673b1$var$obj(low)}, datum[${JSON.stringify(lastFieldName)}] ? null : ${$0d0febe286e673b1$var$obj(high)}]`
        ], clause);
    } else {
        const exact = [
            `name:${JSON.stringify(bin.discreteColumn.column.name)}`,
            "operator:'=='",
            `value:datum[${JSON.stringify(bin.fields[0])}]`
        ];
        return $0d0febe286e673b1$var$obj([
            `expressions:[${$0d0febe286e673b1$var$obj(exact)}]`
        ], clause);
    }
}





function $f2ebf870c7736f2c$export$71d2e96f63f1ac97(source, prefix, binFields, sortOrder) {
    const _binFields = binFields.map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b));
    const dataName = `${prefix}_bin_order`;
    const data = {
        name: dataName,
        source: source,
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
                    (0, $ec270fbe8d9983b4$export$10df5429b7082be2).Ordinal
                ]
            }
        ]
    };
    return {
        data: data,
        scale: $f2ebf870c7736f2c$export$f85d5aad90241781(dataName, `scale_${prefix}_order`, binFields)
    };
}
function $f2ebf870c7736f2c$export$f85d5aad90241781(dataName, scaleName, binFields) {
    return {
        type: "ordinal",
        name: scaleName,
        domain: {
            data: dataName,
            field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(binFields[0])
        },
        range: {
            data: dataName,
            field: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).Ordinal
        }
    };
}




class $2454fff13f848bf5$export$3c877bb842c36952 extends (0, $9d478b599f3cbcb3$export$c84671f46d6a1ca) {
    constructor(props){
        super(props);
        this.props = props;
        const p = this.prefix = `cross_${this.id}`;
        this.binX = (0, $02bd8e9b090c20c5$export$6868fd1605c79d3d)(`${p}_x`, props.globalScope.data.name, props.groupbyX);
        this.binY = (0, $02bd8e9b090c20c5$export$6868fd1605c79d3d)(`${p}_y`, props.globalScope.data.name, props.groupbyY);
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
        const { binX: binX , binY: binY , names: names , prefix: prefix , props: props  } = this;
        const { axisTextColor: axisTextColor , colRowTitles: colRowTitles , globalScope: globalScope , parentScope: parentScope  } = props;
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
            offset: (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingLeft,
            padding: (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingLeft,
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
            offset: (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingTop,
            padding: `(${(0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingTop} + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingBottom})`,
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
                (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(globalScope.scope, ...bin.signals);
                (0, $b15ad8fb3905384f$export$eea5d31e98930019)(globalScope.data, ...bin.transforms);
                (0, $b15ad8fb3905384f$export$6853292f627997e4)(globalScope.scope, bin.dataSequence);
                (0, $b15ad8fb3905384f$export$eea5d31e98930019)(bin.dataSequence, {
                    type: "formula",
                    expr: `indata(${JSON.stringify(globalScope.markDataName)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                    as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).Contains
                });
                data = bin.dataSequence;
                dataName = bin.dataSequence.name;
                countSignal = `length(data(${JSON.stringify(dataName)}))`;
                scale = (0, $f2ebf870c7736f2c$export$f85d5aad90241781)(dataName, `${names.dimScale}_${dim}`, bin.fields);
                titleSource.dataName = bin.dataSequence.name;
            } else {
                dataName = globalScope.markDataName;
                const ord = (0, $f2ebf870c7736f2c$export$71d2e96f63f1ac97)(dataName, `${prefix}_${dim}`, bin.fields, sortOrder);
                data = ord.data;
                (0, $b15ad8fb3905384f$export$6853292f627997e4)(globalScope.scope, ord.data);
                countSignal = `length(data(${JSON.stringify(ord.data.name)}))`;
                scale = ord.scale;
                titleSource.dataName = ord.data.name;
            }
            titleSource.quantitative = bin.discreteColumn.column.quantitative;
            d.dataOut = data;
            d.scaleName = scale.name;
            (0, $b15ad8fb3905384f$export$eea5d31e98930019)(data, {
                type: "formula",
                expr: (0, $0d0febe286e673b1$export$b292ca0d4c2e4690)(bin, (0, $ec270fbe8d9983b4$export$10df5429b7082be2).First, (0, $ec270fbe8d9983b4$export$10df5429b7082be2).Last),
                as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).FacetSearch
            }, {
                type: "formula",
                expr: (0, $0d0febe286e673b1$export$f241323700beca17)(bin),
                as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).FacetTitle
            });
            (0, $b15ad8fb3905384f$export$290268902279a991)(globalScope.scope, scale);
            const count = `${names.dimCount}_${dim}`;
            const calc = `${names.dimCellSizeCalc}_${dim}`;
            const size = `${names.dimCellSize}_${dim}`;
            (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(globalScope.scope, {
                name: count,
                update: countSignal
            });
            (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(globalScope.scope, {
                name: calc,
                update: `${d.layout} / ${count}`
            }, {
                name: size,
                update: `max(${d.min}, (${calc} - ${padding}))`
            });
            (0, $7b42c6682d6a3c62$export$cdc9366ba30317bd)(d.out, "max", `((${size} + ${padding}) * ${count})`);
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
                            expr: `[datum[${JSON.stringify((0, $ec270fbe8d9983b4$export$10df5429b7082be2).FacetSearch)}], merge(parent[${JSON.stringify((0, $ec270fbe8d9983b4$export$10df5429b7082be2).FacetSearch)}], { clause: '&&'})]`,
                            as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).FacetSearch
                        }
                    ]
                }
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
        (0, $b15ad8fb3905384f$export$3df320e901c23a48)(globalScope.markGroup, groupRow);
        (0, $b15ad8fb3905384f$export$3df320e901c23a48)(groupRow, groupCol);
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
        if (colRowTitles) (0, $af332f9d870ab775$export$4fec84497b9e6e3f)(globalScope.scope, titles.x, titles.y, sizeSignals, axisTextColor);
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









class $154b2c962cf38cfb$export$1c460fb4285edadc extends (0, $9d478b599f3cbcb3$export$c84671f46d6a1ca) {
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
        const { names: names , prefix: prefix , props: props  } = this;
        const { globalScope: globalScope , parentScope: parentScope , scatterPointScaleDisplay: scatterPointScaleDisplay , size: size , x: x , y: y , z: z , zGrounded: zGrounded  } = props;
        const qsize = size && size.quantitative && size;
        (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(globalScope.scope, {
            name: (0, $ec270fbe8d9983b4$export$809e371dee643808).PointScale,
            value: 5,
            bind: {
                name: scatterPointScaleDisplay,
                debounce: 50,
                input: "range",
                min: 1,
                max: 10,
                step: 1
            }
        }, {
            name: (0, $ec270fbe8d9983b4$export$809e371dee643808).ZGrounded,
            value: false,
            bind: {
                name: zGrounded,
                input: "checkbox"
            }
        });
        if (qsize) {
            (0, $b15ad8fb3905384f$export$eea5d31e98930019)(globalScope.data, {
                type: "extent",
                field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(qsize.name),
                signal: names.sizeExtent
            });
            (0, $b15ad8fb3905384f$export$290268902279a991)(globalScope.scope, {
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
            (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(globalScope.scope, {
                name: names.sizeRange,
                update: `min(${parentScope.sizeSignals.layoutHeight}, ${parentScope.sizeSignals.layoutWidth}) / ${(0, $17564e8cec2b9f75$export$c223d3ee3c0620d9)}`
            });
        }
        (0, $b15ad8fb3905384f$export$6853292f627997e4)(globalScope.scope, {
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
            showAxes: true,
            scales: {}
        };
        const zValue = z ? `scale(${JSON.stringify(names.zScale)}, datum[${JSON.stringify(z.name)}])` : null;
        const sizeValueSignal = qsize ? `scale(${JSON.stringify(names.sizeScale)}, datum[${JSON.stringify(qsize.name)}]) * ${(0, $ec270fbe8d9983b4$export$809e371dee643808).PointScale}` : (0, $ec270fbe8d9983b4$export$809e371dee643808).PointScale;
        const update = Object.assign({
            height: [
                {
                    test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
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
                    test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                    value: 0
                },
                {
                    signal: `${(0, $ec270fbe8d9983b4$export$809e371dee643808).ZGrounded} ? 0 : ${zValue}`
                }
            ],
            depth: [
                {
                    test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                    value: 0
                },
                {
                    signal: `${(0, $ec270fbe8d9983b4$export$809e371dee643808).ZGrounded} ? ${zValue} : ${sizeValueSignal}`
                }
            ]
        });
        const columnSignals = [
            {
                column: x,
                xyz: "x",
                scaleName: names.xScale,
                reverse: false,
                signal: parentScope.sizeSignals.layoutWidth
            },
            {
                column: y,
                xyz: "y",
                scaleName: names.yScale,
                reverse: true,
                signal: parentScope.sizeSignals.layoutHeight
            },
            {
                column: z,
                xyz: "z",
                scaleName: names.zScale,
                reverse: false,
                signal: `(${globalScope.zSize}) * ${(0, $ec270fbe8d9983b4$export$809e371dee643808).ZProportion}`
            }
        ];
        columnSignals.forEach((cs)=>{
            const { column: column , reverse: reverse , scaleName: scaleName , signal: signal , xyz: xyz  } = cs;
            if (!column) return;
            let scale;
            if (column.quantitative) scale = (0, $c0bec0cf2b65a746$export$fefe9507ec0904ed)(scaleName, globalScope.data.name, column.name, [
                0,
                {
                    signal: signal
                }
            ], reverse, false);
            else scale = (0, $c0bec0cf2b65a746$export$b67158f831e00d0d)(scaleName, globalScope.data.name, [
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
            type: "rect",
            from: {
                data: globalScope.markDataName
            },
            encode: {
                update: update
            }
        };
        (0, $b15ad8fb3905384f$export$3df320e901c23a48)(globalScope.markGroup, mark);
        return {
            offsets: {
                x: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.x, `scale(${JSON.stringify(names.xScale)}, datum[${JSON.stringify(x.name)}])`),
                y: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.y, `scale(${JSON.stringify(names.yScale)}, datum[${JSON.stringify(y.name)}]) - ${sizeValueSignal}`),
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
                        test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                        signal: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.y, parentScope.sizeSignals.layoutHeight)
                    }
                ]
            }
        };
    }
}









function $b127773b4223519c$export$9e1d5954d0bb865c(z, zSize, dataName, zScaleName) {
    if (z) {
        const zRange = [
            0,
            {
                signal: `(${zSize}) * ${(0, $ec270fbe8d9983b4$export$809e371dee643808).ZProportion}`
            }
        ];
        const scale = z.quantitative ? (0, $c0bec0cf2b65a746$export$fefe9507ec0904ed)(zScaleName, dataName, z.name, zRange, false, true) : (0, $c0bec0cf2b65a746$export$b67158f831e00d0d)(zScaleName, dataName, zRange, z.name, false);
        return scale;
    }
}


class $c51cdb6381ccbb7b$export$b09fb900337259de extends (0, $9d478b599f3cbcb3$export$c84671f46d6a1ca) {
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
        const { names: names , prefix: prefix , props: props  } = this;
        const { fillDirection: fillDirection , globalScope: globalScope , groupings: groupings , parentScope: parentScope , collapseYHeight: collapseYHeight , sortBy: sortBy , z: z  } = props;
        const zScale = (0, $b127773b4223519c$export$9e1d5954d0bb865c)(z, globalScope.zSize, globalScope.data.name, names.zScale);
        (0, $b15ad8fb3905384f$export$eea5d31e98930019)(globalScope.data, Object.assign({
            type: "stack",
            groupby: (0, $b15ad8fb3905384f$export$53a21aeef48e14a8)(groupings).map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b)),
            as: [
                names.stack0,
                names.stack1
            ]
        }, sortBy && {
            sort: {
                field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(sortBy.name),
                order: "ascending"
            }
        }));
        const { gap: gap , levelSize: levelSize , size: size , squaresPerBand: squaresPerBand  } = this.addSignals();
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
                            test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                            value: 0
                        },
                        heightSignal
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
                            test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                            value: 0
                        },
                        {
                            scale: names.zScale,
                            field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(z.name)
                        }
                    ]
                })
            }
        };
        (0, $b15ad8fb3905384f$export$3df320e901c23a48)(globalScope.markGroup, mark);
        const { tx: tx , ty: ty  } = this.transformXY(gap, levelSize, squaresPerBand);
        return Object.assign(Object.assign(Object.assign({}, z && {
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
                x: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.x, tx.expr),
                y: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.y, ty.expr),
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
                        test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                        signal: parentScope.offsets.y
                    }
                ]
            }
        });
    }
    getBandWidth() {
        const { offsets: offsets  } = this.props.parentScope;
        switch(this.props.fillDirection){
            case "down-right":
                return offsets.h;
            default:
                return offsets.w;
        }
    }
    addSignals() {
        const { names: names , props: props  } = this;
        const { fillDirection: fillDirection , globalScope: globalScope , groupings: groupings , parentScope: parentScope  } = props;
        let { maxGroupedFillSize: maxGroupedFillSize , maxGroupedUnits: maxGroupedUnits  } = props;
        if (!maxGroupedUnits) {
            if (groupings) {
                (0, $b15ad8fb3905384f$export$eea5d31e98930019)(globalScope.data, {
                    type: "joinaggregate",
                    groupby: (0, $b15ad8fb3905384f$export$53a21aeef48e14a8)(groupings).map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b)),
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
            type: "formula",
            expr: null,
            as: `${prefix}_${(0, $ec270fbe8d9983b4$export$10df5429b7082be2).OffsetX}`
        };
        const ty = {
            type: "formula",
            expr: null,
            as: `${prefix}_${(0, $ec270fbe8d9983b4$export$10df5429b7082be2).OffsetY}`
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
            tx: tx,
            ty: ty
        };
    }
}






class $596680402951a0aa$export$694e0d28c7ffc90c extends (0, $9d478b599f3cbcb3$export$c84671f46d6a1ca) {
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
        const { names: names , props: props  } = this;
        const { globalScope: globalScope , groupings: groupings , parentScope: parentScope , sort: sort  } = props;
        const { sizeSignals: sizeSignals  } = parentScope;
        (0, $b15ad8fb3905384f$export$eea5d31e98930019)(globalScope.data, {
            type: "joinaggregate",
            groupby: (0, $b15ad8fb3905384f$export$53a21aeef48e14a8)(groupings).map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b)),
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
            groupby: (0, $b15ad8fb3905384f$export$53a21aeef48e14a8)(groupings).map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b)),
            as: [
                names.stack0,
                names.stack1
            ]
        }, sort && {
            sort: {
                field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(sort.name),
                order: "ascending"
            }
        }));
        (0, $b15ad8fb3905384f$export$6853292f627997e4)(globalScope.scope, {
            name: names.sequence,
            transform: [
                {
                    type: "sequence",
                    start: 1,
                    stop: {
                        signal: `max(sqrt(${names.globalExtent}[1]),2)`
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
                }
            ]
        });
        (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(globalScope.scope, {
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
            x: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.x, groupX, `${cubeX} * (${names.cube} + 1)`),
            y: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.y, groupY, `${cubeY} * (${names.cube} + 1)`),
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
        (0, $b15ad8fb3905384f$export$3df320e901c23a48)(globalScope.markGroup, mark);
        const zScale = {
            type: "linear",
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
                        test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                        signal: parentScope.offsets.y
                    }
                ],
                z: [
                    {
                        test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                        value: 0
                    }
                ],
                depth: [
                    {
                        test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                        value: 0
                    }
                ],
                height: [
                    {
                        test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                        value: 0
                    }
                ]
            }
        };
    }
}








class $c0dcd6f3c3c87d5a$export$c4df0d8c6c8f50e4 extends (0, $9d478b599f3cbcb3$export$c84671f46d6a1ca) {
    constructor(props){
        super(props);
        this.props = props;
        const p = this.prefix = `strip_${this.id}`;
        this.names = {
            firstField: `${p}${(0, $ec270fbe8d9983b4$export$10df5429b7082be2).First}`,
            lastField: `${p}${(0, $ec270fbe8d9983b4$export$10df5429b7082be2).Last}`,
            valueField: `${p}${(0, $ec270fbe8d9983b4$export$10df5429b7082be2).Value}`,
            scale: `scale_${p}`,
            zScale: `scale_${p}_z`
        };
    }
    build() {
        const { names: names , prefix: prefix , props: props  } = this;
        const { addPercentageScale: addPercentageScale , globalScope: globalScope , groupings: groupings , orientation: orientation , size: size , sort: sort , sortOrder: sortOrder , parentScope: parentScope , z: z  } = props;
        const zScale = (0, $b127773b4223519c$export$9e1d5954d0bb865c)(z, globalScope.zSize, globalScope.data.name, names.zScale);
        const horizontal = orientation === "horizontal";
        const transform = [];
        if (sort) transform.push({
            type: "collect",
            sort: {
                field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(sort.name),
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
            field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(stackField),
            offset: "normalize",
            as: [
                names.firstField,
                names.lastField
            ]
        };
        if (groupings.length) stackTransform.groupby = (0, $b15ad8fb3905384f$export$53a21aeef48e14a8)(groupings).map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b));
        transform.push(stackTransform);
        (0, $b15ad8fb3905384f$export$eea5d31e98930019)(globalScope.data, ...transform);
        const span = [
            names.lastField,
            names.firstField
        ].map((f)=>`datum[${JSON.stringify(f)}]`).join(" - ");
        const offsets = {
            x: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.x, horizontal ? `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.w})` : ""),
            y: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.y, horizontal ? "" : `datum[${JSON.stringify(names.firstField)}] * (${parentScope.offsets.h})`),
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
                            test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                            value: 0
                        },
                        {
                            scale: names.zScale,
                            field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(z.name)
                        }
                    ]
                })
            }
        };
        (0, $b15ad8fb3905384f$export$3df320e901c23a48)(globalScope.markGroup, mark);
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








class $e834c7064afd736d$export$d685cd2b84b49ee extends (0, $9d478b599f3cbcb3$export$c84671f46d6a1ca) {
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
        const { names: names , props: props  } = this;
        const { globalScope: globalScope , parentScope: parentScope , treeMapMethod: treeMapMethod , z: z  } = props;
        const zScale = (0, $b127773b4223519c$export$9e1d5954d0bb865c)(z, globalScope.zSize, globalScope.data.name, names.zScale);
        const offsets = {
            x: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.x, $e834c7064afd736d$var$fn(names.fieldX0)),
            y: (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.y, $e834c7064afd736d$var$fn(names.fieldY0)),
            h: $e834c7064afd736d$var$subtract(names.fieldY1, names.fieldY0),
            w: $e834c7064afd736d$var$subtract(names.fieldX1, names.fieldX0)
        };
        const mark = this.transformedMark(offsets);
        (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(globalScope.scope, {
            name: (0, $ec270fbe8d9983b4$export$809e371dee643808).TreeMapMethod,
            value: "squarify",
            bind: {
                name: treeMapMethod,
                input: "select",
                options: [
                    "squarify",
                    "binary"
                ]
            }
        });
        return Object.assign(Object.assign({}, z && {
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
        const { names: names , props: props  } = this;
        const { globalScope: globalScope , groupings: groupings , parentScope: parentScope  } = props;
        if (groupings.length) {
            //treemap transform can't have it's boundary size grouped, so we need to facet the data.
            (0, $b15ad8fb3905384f$export$6853292f627997e4)(globalScope.scope, {
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
                    }
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
                        groupby: (0, $b15ad8fb3905384f$export$53a21aeef48e14a8)(groupings).map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b))
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
                            }
                        ]
                    },
                    treemapData
                ]
            };
            globalScope.setMarkDataName(names.dataFacetMark);
            (0, $b15ad8fb3905384f$export$3df320e901c23a48)(globalScope.markGroup, facets);
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
        const { names: names , prefix: prefix , props: props  } = this;
        const { z: z  } = props;
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
                            test: (0, $17aa946a16979010$export$71c45f78b1166d35)(),
                            value: 0
                        },
                        {
                            scale: names.zScale,
                            field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(z.name)
                        }
                    ]
                })
            }
        };
        (0, $b15ad8fb3905384f$export$3df320e901c23a48)(markParent, mark);
        return mark;
    }
    treemapTransform(treemapData, widthSignal, heightSignal) {
        const { names: names , props: props  } = this;
        const { group: group , size: size  } = props;
        (0, $b15ad8fb3905384f$export$eea5d31e98930019)(treemapData, {
            type: "filter",
            expr: `datum[${JSON.stringify(size.name)}] > 0`
        }, {
            type: "nest",
            keys: [
                group && group.name || "__NONE__"
            ]
        }, {
            type: "treemap",
            field: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(size.name),
            sort: {
                field: "value",
                order: "descending"
            },
            round: true,
            method: {
                signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).TreeMapMethod
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
function $e834c7064afd736d$var$fn(n) {
    return `datum[${JSON.stringify(n)}]`;
}
function $e834c7064afd736d$var$subtract(...fields) {
    return fields.map((n)=>$e834c7064afd736d$var$fn(n)).join(" - ");
}











class $1f11bfc7bd0f55af$export$f6b1e3902165e5e1 extends (0, $9d478b599f3cbcb3$export$c84671f46d6a1ca) {
    constructor(props){
        super(props);
        this.props = props;
        const p = this.prefix = `wrap_${this.id}`;
        this.bin = (0, $02bd8e9b090c20c5$export$6868fd1605c79d3d)(this.prefix, props.globalScope.data.name, props.groupby);
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
        const { bin: bin , names: names , prefix: prefix , props: props  } = this;
        const { axisTextColor: axisTextColor , cellTitles: cellTitles , globalScope: globalScope , parentScope: parentScope  } = props;
        let ordinalBinData;
        if (bin.native === false) {
            (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(globalScope.scope, ...bin.signals);
            (0, $b15ad8fb3905384f$export$eea5d31e98930019)(globalScope.data, ...bin.transforms);
            (0, $b15ad8fb3905384f$export$6853292f627997e4)(globalScope.scope, bin.dataSequence);
            (0, $b15ad8fb3905384f$export$eea5d31e98930019)(bin.dataSequence, {
                type: "formula",
                expr: `indata(${JSON.stringify(globalScope.data.name)}, ${JSON.stringify(bin.fields[0])}, datum[${JSON.stringify(bin.fields[0])}])`,
                as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).Contains
            });
            ordinalBinData = bin.dataSequence.name;
        } else {
            const ord = (0, $f2ebf870c7736f2c$export$71d2e96f63f1ac97)(globalScope.data.name, prefix, bin.fields, "ascending");
            (0, $b15ad8fb3905384f$export$6853292f627997e4)(globalScope.scope, ord.data);
            ordinalBinData = ord.data.name;
        }
        (0, $b15ad8fb3905384f$export$6853292f627997e4)(globalScope.scope, {
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
                }
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
                }
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
                    expr: `datum.cols === 1 ? max(datum.cellw, ${(0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellWidth}) : datum.cellw`,
                    as: "cellw"
                },
                {
                    type: "formula",
                    expr: `${parentScope.sizeSignals.layoutHeight} / datum.rows`,
                    as: "cellh"
                },
                {
                    type: "formula",
                    expr: `datum.rows === 1 ? max(datum.cellh, ${(0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellHeight}) : datum.cellh`,
                    as: "cellh"
                },
                {
                    type: "formula",
                    expr: `(datum.cellw >= ${(0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellWidth} && datum.cellh >= ${(0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellHeight})`,
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
                }
            ]
        }, {
            name: names.rowColumnDataName,
            source: ordinalBinData,
            transform: [
                {
                    type: "formula",
                    expr: `floor((datum[${JSON.stringify((0, $ec270fbe8d9983b4$export$10df5429b7082be2).Ordinal)}] - 1) / ${names.colCount})`,
                    as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).WrapRow
                },
                {
                    type: "formula",
                    expr: `(datum[${JSON.stringify((0, $ec270fbe8d9983b4$export$10df5429b7082be2).Ordinal)}] - 1) % ${names.colCount}`,
                    as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).WrapCol
                },
                {
                    type: "formula",
                    expr: (0, $0d0febe286e673b1$export$b292ca0d4c2e4690)(bin, (0, $ec270fbe8d9983b4$export$10df5429b7082be2).First, (0, $ec270fbe8d9983b4$export$10df5429b7082be2).Last),
                    as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).FacetSearch
                },
                {
                    type: "formula",
                    expr: (0, $0d0febe286e673b1$export$f241323700beca17)(bin),
                    as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).FacetTitle
                }
            ]
        });
        const dataOut = {
            name: names.outputData,
            source: globalScope.data.name,
            transform: [
                {
                    type: "lookup",
                    from: names.rowColumnDataName,
                    key: (0, $ac5b955a06ced550$export$fb70365b00e8cb7b)(bin.fields[0]),
                    fields: [
                        bin.fields[0]
                    ].map((0, $ac5b955a06ced550$export$fb70365b00e8cb7b)),
                    values: [
                        (0, $ec270fbe8d9983b4$export$10df5429b7082be2).WrapRow,
                        (0, $ec270fbe8d9983b4$export$10df5429b7082be2).WrapCol
                    ]
                }
            ]
        };
        (0, $b15ad8fb3905384f$export$6853292f627997e4)(globalScope.scope, dataOut);
        globalScope.setMarkDataName(names.outputData);
        (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(globalScope.scope, {
            name: names.minAspect,
            update: `${(0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellWidth} / ${(0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellHeight}`
        }, {
            name: names.target,
            update: `${names.minAspect} === 1 ? ${1.2} : ${names.minAspect}`
        }, {
            name: names.minArea,
            update: `${(0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellWidth}*${(0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellHeight}`
        }, {
            name: names.aspect,
            update: `${parentScope.sizeSignals.layoutWidth} / ${parentScope.sizeSignals.layoutHeight}`
        }, {
            name: names.dataLength,
            update: `data(${JSON.stringify(ordinalBinData)}).length`
        }, {
            name: names.growColCount,
            update: `max(floor(${parentScope.sizeSignals.layoutWidth} / ${(0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellWidth}), 1)`
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
            update: `${names.fits} ? data(${JSON.stringify(names.rxc)})[0].cellh : ${(0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellHeight}`
        });
        (0, $7b42c6682d6a3c62$export$cdc9366ba30317bd)(globalScope.signals.plotHeightOut, "max", `(${names.cellHeight} * ceil(${names.dataLength} / ${names.colCount}))`);
        (0, $7b42c6682d6a3c62$export$cdc9366ba30317bd)(globalScope.signals.plotWidthOut, "max", `(${names.cellWidth} * ${names.colCount})`);
        const signalH = [
            names.cellHeight,
            (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingTop,
            (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingBottom
        ].join(" - ");
        const signalW = [
            names.cellWidth,
            (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingLeft
        ].join(" - ");
        const signalX = (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.x, `datum[${JSON.stringify((0, $ec270fbe8d9983b4$export$10df5429b7082be2).WrapCol)}] * ${names.cellWidth}`, (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingLeft);
        const signalY = (0, $b15ad8fb3905384f$export$e6b6683aec0fe907)(parentScope.offsets.y, `datum[${JSON.stringify((0, $ec270fbe8d9983b4$export$10df5429b7082be2).WrapRow)}] * ${names.cellHeight}`, (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingTop);
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
                update: update
            }
        };
        (0, $b15ad8fb3905384f$export$3df320e901c23a48)(globalScope.markGroup, group);
        const sizeSignals = {
            layoutHeight: `(${names.cellHeight} - ${(0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingTop} - ${(0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingBottom})`,
            layoutWidth: `(${names.cellWidth} - ${(0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingLeft})`,
            colCount: names.colCount,
            rowCount: `ceil(${names.dataLength} / ${names.colCount})`
        };
        if (cellTitles) (0, $af332f9d870ab775$export$3735b1dd76112836)(group, sizeSignals, axisTextColor);
        return {
            facetScope: group,
            sizeSignals: sizeSignals,
            offsets: offsets
        };
    }
}


const $cc6302de00719d9e$export$8b2ec0ba67742226 = {
    AggregateContainer: $9ed4e979e13f36e6$export$fd744dfcd98e5f49,
    AggregateSquare: $0c7796f44595fe7a$export$7eda37970b01b2c,
    Band: $95d7ab00f3235589$export$5b22a87d7feca398,
    Cross: $2454fff13f848bf5$export$3c877bb842c36952,
    Scatter: $154b2c962cf38cfb$export$1c460fb4285edadc,
    Square: $c51cdb6381ccbb7b$export$b09fb900337259de,
    Stack: $596680402951a0aa$export$694e0d28c7ffc90c,
    Strip: $c0dcd6f3c3c87d5a$export$c4df0d8c6c8f50e4,
    Treemap: $e834c7064afd736d$export$d685cd2b84b49ee,
    Wrap: $1f11bfc7bd0f55af$export$f6b1e3902165e5e1
};


class $afbd306f40f38f7e$export$e2e6dd2b1097c25b {
    constructor(props, specContext){
        this.props = props;
        this.specContext = specContext;
        this.globalSignals = {
            minCellWidth: {
                name: (0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellWidth,
                update: `${0, $17564e8cec2b9f75$export$7794a0aff56142de}`
            },
            minCellHeight: {
                name: (0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellHeight,
                update: `${0, $17564e8cec2b9f75$export$7c432db1d0b63312}`
            },
            plotOffsetLeft: {
                name: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetLeft,
                update: "0"
            },
            plotOffsetTop: {
                name: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetTop,
                update: "0"
            },
            plotOffsetBottom: {
                name: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetBottom,
                update: "0"
            },
            plotOffsetRight: {
                name: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetRight,
                update: "0"
            },
            plotHeightOut: {
                name: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotHeightOut,
                update: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotHeightIn
            },
            plotWidthOut: {
                name: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotWidthOut,
                update: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotWidthIn
            }
        };
    }
    validate() {
        const { specContext: specContext  } = this;
        const { specCapabilities: specCapabilities  } = this.props;
        const { roles: roles  } = specCapabilities;
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
        return errors;
    }
    build() {
        const { specContext: specContext  } = this;
        const { facetLayout: facetLayout , specCapabilities: specCapabilities  } = this.props;
        const { insight: insight , specColumns: specColumns , specViewOptions: specViewOptions  } = specContext;
        const dataName = "data_source";
        const { vegaSpec: vegaSpec , groupMark: groupMark  } = this.initSpec(dataName);
        const { topColorField: topColorField , colorDataName: colorDataName  } = (0, $af92c5b6b1f801f6$export$4c4d9288a45f1fb3)({
            scope: vegaSpec,
            dataName: dataName,
            specContext: specContext,
            scaleName: (0, $ec270fbe8d9983b4$export$c9f17d36dfc40d76).Color,
            legendDataName: "data_legend",
            topLookupName: "data_topcolorlookup",
            colorReverseSignalName: (0, $ec270fbe8d9983b4$export$809e371dee643808).ColorReverse
        });
        const globalScope = new (0, $f57e47af7971582e$export$5fdf684e73bb2de5)({
            dataName: colorDataName,
            markGroup: groupMark,
            scope: vegaSpec,
            signals: this.globalSignals
        });
        if (facetLayout) {
            (0, $b15ad8fb3905384f$export$5346a0d8a9111b3f)(vegaSpec, {
                name: (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingBottom,
                update: `${facetLayout.facetPadding.bottom}`
            }, {
                name: (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingLeft,
                update: `${facetLayout.facetPadding.left}`
            }, {
                name: (0, $ec270fbe8d9983b4$export$809e371dee643808).FacetPaddingTop,
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
            let axesScopes = facetLayout ? (0, $af332f9d870ab775$export$9f0b19d6fd936707)({
                globalScope: globalScope.scope,
                plotScope: groupMark,
                facetScope: firstScope,
                colTitleScale: colTitleScale,
                rowTitleScale: rowTitleScale,
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
            (0, $4414e2f92de0ee30$export$3678bfcfeaea7c36)({
                globalScope: globalScope,
                allGlobalScales: allGlobalScales,
                axisScales: this.props.axisScales,
                plotOffsetSignals: {
                    x: this.globalSignals.plotOffsetLeft,
                    y: this.globalSignals.plotOffsetBottom
                },
                axesOffsets: {
                    x: (0, $17564e8cec2b9f75$export$3f5b554d51e74365),
                    y: (0, $17564e8cec2b9f75$export$c33f11801bb18430)
                },
                axesTitlePadding: facetLayout ? {
                    x: (0, $17564e8cec2b9f75$export$fd4a597070549ada),
                    y: (0, $17564e8cec2b9f75$export$a26a082bf9fa4ca0)
                } : {
                    x: (0, $17564e8cec2b9f75$export$2e7279af2df830e3),
                    y: (0, $17564e8cec2b9f75$export$f0388d9263db6e5f)
                },
                labelBaseline: {
                    x: "top",
                    y: "middle"
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
            const outputDataName = "output";
            finalScope.mark.from.data = outputDataName;
            (0, $b15ad8fb3905384f$export$6853292f627997e4)(globalScope.markGroup, {
                name: outputDataName,
                source: globalScope.markDataName,
                transform: [
                    {
                        type: "formula",
                        expr: finalScope.offsets.x,
                        as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).OffsetX
                    },
                    {
                        type: "formula",
                        expr: finalScope.offsets.y,
                        as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).OffsetY
                    }
                ]
            });
            update.x = {
                field: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).OffsetX
            };
            update.y = {
                field: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).OffsetY
            };
            allEncodingRules.forEach((map)=>{
                for(let key in map)if (update[key]) {
                    let arrIn = map[key];
                    if (!Array.isArray(update[key])) {
                        let value = update[key];
                        let arrOut = [];
                        update[key] = arrOut;
                        arrIn.forEach((rule)=>arrOut.push(rule));
                        arrOut.push(value);
                    } else {
                        let arrOut = update[key];
                        arrIn.forEach((rule)=>arrOut.unshift(rule));
                    }
                }
            });
            update.fill = (0, $e4dd5cb1520ca850$export$9563e054e6f787fb)(specContext, topColorField, (0, $ec270fbe8d9983b4$export$c9f17d36dfc40d76).Color);
            update.opacity = (0, $e4dd5cb1520ca850$export$c17a3be1057836e)(specContext);
        }
        return {
            specCapabilities: specCapabilities,
            vegaSpec: vegaSpec
        };
    }
    initSpec(dataName) {
        const { globalSignals: globalSignals  } = this;
        const { minCellWidth: minCellWidth , minCellHeight: minCellHeight , plotOffsetLeft: plotOffsetLeft , plotOffsetBottom: plotOffsetBottom , plotOffsetTop: plotOffsetTop , plotOffsetRight: plotOffsetRight , plotHeightOut: plotHeightOut , plotWidthOut: plotWidthOut  } = globalSignals;
        const { specContext: specContext  } = this;
        const { insight: insight  } = specContext;
        const groupMark = {
            type: "group",
            //style: 'cell',
            encode: {
                update: {
                    x: {
                        signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetLeft
                    },
                    y: {
                        signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetTop
                    },
                    height: {
                        signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotHeightOut
                    },
                    width: {
                        signal: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotWidthOut
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
            signals: (0, $7b42c6682d6a3c62$export$d9407ec206a3236c)(specContext, (0, $ec270fbe8d9983b4$export$809e371dee643808).ViewportHeight).concat([
                minCellWidth,
                minCellHeight,
                {
                    name: (0, $ec270fbe8d9983b4$export$809e371dee643808).ViewportHeight,
                    update: `max(${(0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellHeight}, ${insight.size.height})`
                },
                {
                    name: (0, $ec270fbe8d9983b4$export$809e371dee643808).ViewportWidth,
                    update: `max(${(0, $ec270fbe8d9983b4$export$809e371dee643808).MinCellWidth}, ${insight.size.width})`
                },
                plotOffsetLeft,
                plotOffsetTop,
                plotOffsetBottom,
                plotOffsetRight,
                {
                    name: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotHeightIn,
                    update: `${(0, $ec270fbe8d9983b4$export$809e371dee643808).ViewportHeight} - ${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetBottom}`
                },
                {
                    name: (0, $ec270fbe8d9983b4$export$809e371dee643808).PlotWidthIn,
                    update: `${(0, $ec270fbe8d9983b4$export$809e371dee643808).ViewportWidth} - ${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetLeft} - ${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetRight}`
                },
                plotHeightOut,
                plotWidthOut,
                {
                    name: "height",
                    update: `${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetTop} + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotHeightOut} + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetBottom}`
                },
                {
                    name: "width",
                    update: `${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotWidthOut} + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetLeft} + ${(0, $ec270fbe8d9983b4$export$809e371dee643808).PlotOffsetRight}`
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
                            op: "count",
                            as: (0, $ec270fbe8d9983b4$export$10df5429b7082be2).Count
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
        const { layoutType: layoutType , props: props  } = layoutPair;
        const layoutBuildProps = Object.assign(Object.assign({}, props), buildProps);
        const layoutClass = (0, $cc6302de00719d9e$export$8b2ec0ba67742226)[layoutType];
        const layout = new layoutClass(layoutBuildProps);
        layout.id = buildProps.id;
        return layout;
    }
}


function $7e9d31f0ccd4826a$export$3f8fe6489e95757d(specContext, currData) {
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
    (0, $ae86bb470afa6626$export$e04a97cc71178399)(columns, currData);
    const specBuilderProps = (0, $81fdb423dd3f4d9b$export$104083a36c1647a7)(specContext);
    const specBuilder = new (0, $afbd306f40f38f7e$export$e2e6dd2b1097c25b)(specBuilderProps, specContext);
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




var $e4267d04195b1ffa$exports = {};


var $b221d01211ecfc7e$exports = {};


$parcel$exportWildcard($64958c10656c4cf5$exports, $7e9d31f0ccd4826a$exports);
$parcel$exportWildcard($64958c10656c4cf5$exports, $ec270fbe8d9983b4$exports);
$parcel$exportWildcard($64958c10656c4cf5$exports, $ae86bb470afa6626$exports);
$parcel$exportWildcard($64958c10656c4cf5$exports, $e4267d04195b1ffa$exports);
$parcel$exportWildcard($64958c10656c4cf5$exports, $b221d01211ecfc7e$exports);


const $4d0539c68a8de77f$export$5672246984822a29 = "GL_ORDINAL";


var $c2919c2894b0628c$exports = {};
var $93e9fd90e1c55c05$exports = {};

$parcel$export($93e9fd90e1c55c05$exports, "compareExpression", () => $93e9fd90e1c55c05$export$4787a3c825f2af47);
$parcel$export($93e9fd90e1c55c05$exports, "compareGroup", () => $93e9fd90e1c55c05$export$bc9dff9b0aa0e5b);
$parcel$export($93e9fd90e1c55c05$exports, "compare", () => $93e9fd90e1c55c05$export$398604a469f7de9a);
$parcel$export($93e9fd90e1c55c05$exports, "startsWith", () => $93e9fd90e1c55c05$export$68326237475e9a7d);
var $3d2ef5a685d44d00$exports = {};

$parcel$export($3d2ef5a685d44d00$exports, "isSearchExpressionGroup", () => $3d2ef5a685d44d00$export$ab134d298d957272);
$parcel$export($3d2ef5a685d44d00$exports, "createGroupFromExpression", () => $3d2ef5a685d44d00$export$cf32a499fcfecacd);
$parcel$export($3d2ef5a685d44d00$exports, "ensureSearchExpressionGroupArray", () => $3d2ef5a685d44d00$export$b5d04ce3dd7ae29e);
function $3d2ef5a685d44d00$export$ab134d298d957272(search) {
    if (!search) return false;
    return !!search.expressions;
}
function $3d2ef5a685d44d00$export$cf32a499fcfecacd(input) {
    const output = {
        expressions: [
            input
        ]
    };
    return output;
}
function $3d2ef5a685d44d00$export$b5d04ce3dd7ae29e(search) {
    if (Array.isArray(search)) return [
        ...search
    ];
    else if ($3d2ef5a685d44d00$export$ab134d298d957272(search)) return [
        search
    ];
    else return [
        $3d2ef5a685d44d00$export$cf32a499fcfecacd(search)
    ];
}


const $93e9fd90e1c55c05$var$expressionKeys = Object.keys({
    clause: null,
    name: null,
    operator: null,
    value: null
});
function $93e9fd90e1c55c05$export$4787a3c825f2af47(a, b) {
    if (a && b) for(let k = 0; k < $93e9fd90e1c55c05$var$expressionKeys.length; k++){
        let key = $93e9fd90e1c55c05$var$expressionKeys[k];
        if (a[key] != b[key]) return false;
    }
    else return !a && !b;
    return true;
}
const $93e9fd90e1c55c05$var$groupKeys = Object.keys({
    clause: null
});
function $93e9fd90e1c55c05$export$bc9dff9b0aa0e5b(a, b) {
    for(let k = 0; k < $93e9fd90e1c55c05$var$groupKeys.length; k++){
        let key = $93e9fd90e1c55c05$var$groupKeys[k];
        if (a[key] != b[key]) return false;
    }
    if (!a.expressions && !b.expressions) return true;
    if (!a.expressions || !b.expressions) return false;
    if (a.expressions.length != b.expressions.length) return false;
    for(let i = 0; i < a.expressions.length; i++){
        if (!$93e9fd90e1c55c05$export$4787a3c825f2af47(a.expressions[i], b.expressions[i])) return false;
    }
    return true;
}
function $93e9fd90e1c55c05$export$398604a469f7de9a(a, b) {
    if (a == b) return true;
    if (!a || !b) return false;
    let arrs = [
        a,
        b
    ].map((0, $3d2ef5a685d44d00$export$b5d04ce3dd7ae29e));
    let [arrA, arrB] = arrs;
    if (arrA.length != arrB.length) return false;
    for(let i = 0; i < arrA.length; i++){
        if (!$93e9fd90e1c55c05$export$bc9dff9b0aa0e5b(arrA[i], arrB[i])) return false;
    }
    return true;
}
function $93e9fd90e1c55c05$export$68326237475e9a7d(whole, part) {
    if (!part) return true;
    let arrs = [
        whole,
        part
    ].map((0, $3d2ef5a685d44d00$export$b5d04ce3dd7ae29e));
    let [wholeArray, partArray] = arrs;
    if (partArray.length > wholeArray.length) return false;
    for(let i = 0; i < partArray.length; i++){
        if (!$93e9fd90e1c55c05$export$bc9dff9b0aa0e5b(wholeArray[i], partArray[i])) return false;
    }
    return true;
}


var $43c2526e199cbbfb$exports = {};

$parcel$export($43c2526e199cbbfb$exports, "Exec", () => $43c2526e199cbbfb$export$bbfd672d43392844);

function $43c2526e199cbbfb$var$valueToBoolean(value) {
    if (typeof value === "string") switch(value.toLowerCase()){
        case "true":
            return true;
        case "false":
            return false;
    }
    return !!value;
}
function $43c2526e199cbbfb$var$valueToString(value) {
    if (value == null) return "";
    switch(typeof value){
        case "string":
            return value;
        case "boolean":
        case "number":
            return value.toString();
    }
    return "";
}
function $43c2526e199cbbfb$var$isStringOperation(ex) {
    switch(ex.operator){
        case "contains":
        case "!contains":
        case "starts":
        case "!starts":
            return true;
    }
    return false;
}
function $43c2526e199cbbfb$var$isnullorEmpty(value) {
    if (value == null) return true; //double equal sign to also catch undefined
    if (typeof value === "string" && value.length === 0) return true;
    return false;
}
class $43c2526e199cbbfb$export$bbfd672d43392844 {
    constructor(search, columns){
        this.columns = columns;
        this.groups = (0, $3d2ef5a685d44d00$export$b5d04ce3dd7ae29e)(search).map((g)=>{
            const expressions = g.expressions.filter(Boolean);
            expressions.forEach((ex)=>{
                ex.column = this.getColumn(ex.name);
                ex.valueBool = $43c2526e199cbbfb$var$valueToBoolean(ex.value);
                ex.valueLow = $43c2526e199cbbfb$var$valueToString(ex.value).toLocaleLowerCase();
                ex.stringOperation = $43c2526e199cbbfb$var$isStringOperation(ex);
            });
            const group = Object.assign(Object.assign({}, g), {
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
        if (ex.operator === "isnullorEmpty") return $43c2526e199cbbfb$var$isnullorEmpty(actualDataValue);
        else if (ex.operator === "!isnullorEmpty") return !$43c2526e199cbbfb$var$isnullorEmpty(actualDataValue);
        let dataValue = actualDataValue;
        let expressionValue = ex.value;
        if (ex.column) {
            if (ex.column.type === "string" || ex.stringOperation) {
                dataValue = $43c2526e199cbbfb$var$valueToString(actualDataValue).toLocaleLowerCase();
                expressionValue = ex.valueLow;
            } else if (ex.column.type === "boolean") {
                dataValue = $43c2526e199cbbfb$var$valueToBoolean(actualDataValue);
                expressionValue = ex.valueBool;
            } else if (ex.column.quantitative) {
                dataValue = +actualDataValue;
                expressionValue = +ex.value;
            }
        }
        switch(ex.operator){
            case "!=":
                return dataValue != expressionValue;
            case "<":
                return dataValue < expressionValue;
            case "<=":
                return dataValue <= expressionValue;
            case "==":
                return dataValue == expressionValue;
            case ">":
                return dataValue > expressionValue;
            case ">=":
                return dataValue >= expressionValue;
            case "contains":
                return dataValue.indexOf(expressionValue) >= 0;
            case "!contains":
                return dataValue.indexOf(expressionValue) < 0;
            case "starts":
                return dataValue.indexOf(expressionValue) == 0;
            case "!starts":
                return dataValue.indexOf(expressionValue) !== 0;
        }
    }
    runExpression(datum, ex) {
        if (ex.name == null) {
            //run on all columns
            const group = {
                expressions: this.columns.map((column, i)=>{
                    const ex2 = Object.assign(Object.assign({}, ex), {
                        column: column,
                        name: column.name
                    });
                    if (i) ex2.clause = "||";
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
                case "&&":
                    accumulator = accumulator && this.runExpression(datum, ex);
                    break;
                case "||":
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
                case "&&":
                    accumulator = accumulator && this.runGroup(datum, group);
                    break;
                case "||":
                    accumulator = accumulator || this.runGroup(datum, group);
                    break;
            }
        }
        return accumulator;
    }
}



var $29d69ef6542a87a4$exports = {};

$parcel$export($29d69ef6542a87a4$exports, "invert", () => $29d69ef6542a87a4$export$6897c284b6f9f4dc);

function $29d69ef6542a87a4$var$invertSearchExpressionGroup(input) {
    //this only works if all expressions in this group have the same clause
    const output = {
        expressions: input.expressions.map($29d69ef6542a87a4$var$invertSearchExpression)
    };
    if (input.clause) output.clause = $29d69ef6542a87a4$var$invertedClauses[input.clause];
    return output;
}
const $29d69ef6542a87a4$var$invertedOperators = {
    "!=": "==",
    "==": "!=",
    "<": ">=",
    ">=": "<",
    "<=": ">",
    ">": "<=",
    "!contains": "contains",
    "contains": "!contains",
    "!isnullorEmpty": "isnullorEmpty",
    "isnullorEmpty": "!isnullorEmpty",
    "!starts": "starts",
    "starts": "!starts"
};
const $29d69ef6542a87a4$var$invertedClauses = {
    "&&": "||",
    "||": "&&"
};
function $29d69ef6542a87a4$var$invertSearchExpression(input) {
    const operator = $29d69ef6542a87a4$var$invertedOperators[input.operator];
    const output = Object.assign(Object.assign({}, input), {
        operator: operator
    });
    if (input.clause) output.clause = $29d69ef6542a87a4$var$invertedClauses[input.clause];
    return output;
}
function $29d69ef6542a87a4$export$6897c284b6f9f4dc(search) {
    if (Array.isArray(search)) return search.map($29d69ef6542a87a4$var$invertSearchExpressionGroup);
    else if ((0, $3d2ef5a685d44d00$export$ab134d298d957272)(search)) return $29d69ef6542a87a4$var$invertSearchExpressionGroup(search);
    else return $29d69ef6542a87a4$var$invertSearchExpression(search);
}


var $8cda325438b8cb6f$exports = {};

$parcel$export($8cda325438b8cb6f$exports, "narrow", () => $8cda325438b8cb6f$export$ec67f55c222e1546);

function $8cda325438b8cb6f$export$ec67f55c222e1546(a, b) {
    if (!a) return b;
    let arrs = [
        a,
        b
    ].map((0, $3d2ef5a685d44d00$export$b5d04ce3dd7ae29e));
    let [arrA, arrB] = arrs;
    arrB[0].clause = "&&";
    return arrA.concat(arrB);
}


var $f3440c53f21713dc$exports = {};


$parcel$exportWildcard($c2919c2894b0628c$exports, $93e9fd90e1c55c05$exports);
$parcel$exportWildcard($c2919c2894b0628c$exports, $43c2526e199cbbfb$exports);
$parcel$exportWildcard($c2919c2894b0628c$exports, $3d2ef5a685d44d00$exports);
$parcel$exportWildcard($c2919c2894b0628c$exports, $29d69ef6542a87a4$exports);
$parcel$exportWildcard($c2919c2894b0628c$exports, $8cda325438b8cb6f$exports);
$parcel$exportWildcard($c2919c2894b0628c$exports, $f3440c53f21713dc$exports);



var $60e01fcba935f9e9$exports = {};


var $944bef2715b44399$exports = {};

$parcel$export($944bef2715b44399$exports, "isInternalFieldName", () => $944bef2715b44399$export$81adea670bebefbe);
$parcel$export($944bef2715b44399$exports, "getColumnsFromData", () => $ae86bb470afa6626$export$3f19ad07848df794);
$parcel$export($944bef2715b44399$exports, "getStats", () => $ae86bb470afa6626$export$432f698644f45d1);
$parcel$export($944bef2715b44399$exports, "inferAll", () => $ae86bb470afa6626$export$e04a97cc71178399);
$parcel$export($944bef2715b44399$exports, "getPresenterStyle", () => $74c2763994d75bb8$export$c4db461e5e345a8);


var $f80f7eb4951011b9$exports = {};

$parcel$export($f80f7eb4951011b9$exports, "base", () => $975e8617bd73ab77$export$e2253033e6e1df16);
$parcel$export($f80f7eb4951011b9$exports, "use", () => $975e8617bd73ab77$export$1f96ae73734a86cc);
$parcel$export($f80f7eb4951011b9$exports, "Presenter", () => $61fffe029a7d3e23$export$893c88c42e3630f9);
$parcel$export($f80f7eb4951011b9$exports, "ViewGl", () => $ba8a128a941ed656$export$6d8f9057dcd7f9e6);
$parcel$export($f80f7eb4951011b9$exports, "constants", () => $f3d4039a9d780933$exports);
$parcel$export($f80f7eb4951011b9$exports, "controls", () => $4abdd534baaa0892$exports);
$parcel$export($f80f7eb4951011b9$exports, "defaults", () => $cb224439f6a2e69c$exports);
$parcel$export($f80f7eb4951011b9$exports, "types", () => $eeab165cadcca29f$exports);
$parcel$export($f80f7eb4951011b9$exports, "util", () => $fc1d5f246c786135$exports);
var $f3d4039a9d780933$exports = {};

$parcel$export($f3d4039a9d780933$exports, "layerNames", () => $f3d4039a9d780933$export$5792b81513a80aca);
const $f3d4039a9d780933$export$5792b81513a80aca = {
    cubes: "LAYER_CUBES",
    lines: "LAYER_LINES",
    text: "LAYER_TEXT",
    paths: "LAYER_PATHS",
    polygons: "LAYER_POLYGONS"
};


var $4abdd534baaa0892$exports = {};

$parcel$export($4abdd534baaa0892$exports, "Table", () => $30be071d2984c290$export$54ec01a60f47d33d);
var $bf3f59d98a415f34$exports = {};
"use strict";

$bf3f59d98a415f34$exports = (parcelRequire("jN9Lg"));


var $52d0f26b0cd45e4e$exports = {};

$52d0f26b0cd45e4e$exports = (parcelRequire("7UTS5"));


const $5feb58fe75c7f837$var$htmlTagArray = $bf3f59d98a415f34$exports.default || $bf3f59d98a415f34$exports;
const $5feb58fe75c7f837$var$svgTagArray = $52d0f26b0cd45e4e$exports.default || $52d0f26b0cd45e4e$exports;
/**
 * Decamelizes a string with/without a custom separator (hyphen by default).
 * from: https://ourcodeworld.com/articles/read/608/how-to-camelize-and-decamelize-strings-in-javascript
 *
 * @param str String in camelcase
 * @param separator Separator for the new decamelized string.
 */ function $5feb58fe75c7f837$var$decamelize(str, separator = "-") {
    return str.replace(/([a-z\d])([A-Z])/g, "$1" + separator + "$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + separator + "$2").toLowerCase();
}
function $5feb58fe75c7f837$export$c8a8987d4410bf2d(tag, attrs, ...children) {
    if (typeof tag === "function") {
        const fn = tag;
        const props = attrs;
        props.children = children;
        return fn(props);
    } else {
        const ns = $5feb58fe75c7f837$var$tagNamespace(tag);
        const el = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
        const map = attrs;
        let ref;
        for(let name in map)if (name && map.hasOwnProperty(name)) {
            let value = map[name];
            if (name === "className" && value !== void 0) $5feb58fe75c7f837$var$setAttribute(el, ns, "class", value.toString());
            else if (name === "disabled" && !value) ;
            else if (value === null || value === undefined) continue;
            else if (value === true) $5feb58fe75c7f837$var$setAttribute(el, ns, name, name);
            else if (typeof value === "function") {
                if (name === "ref") ref = value;
                else el[name.toLowerCase()] = value;
            } else if (typeof value === "object") $5feb58fe75c7f837$var$setAttribute(el, ns, name, $5feb58fe75c7f837$var$flatten(value));
            else $5feb58fe75c7f837$var$setAttribute(el, ns, name, value.toString());
        }
        if (children && children.length > 0) $5feb58fe75c7f837$var$appendChildren(el, children);
        if (ref) ref(el);
        return el;
    }
}
function $5feb58fe75c7f837$var$setAttribute(el, ns, name, value) {
    if (ns) el.setAttributeNS(null, name, value);
    else el.setAttribute(name, value);
}
function $5feb58fe75c7f837$var$flatten(o) {
    const arr = [];
    for(let prop in o)arr.push(`${$5feb58fe75c7f837$var$decamelize(prop, "-")}:${o[prop]}`);
    return arr.join(";");
}
function $5feb58fe75c7f837$export$59da04d16460addd(parentElement, child) {
    if (child === null || child === undefined || typeof child === "boolean") return;
    else if (Array.isArray(child)) $5feb58fe75c7f837$var$appendChildren(parentElement, child);
    else if ($5feb58fe75c7f837$var$isElement(child)) parentElement.appendChild(child);
    else parentElement.appendChild(document.createTextNode(child.toString()));
}
function $5feb58fe75c7f837$var$appendChildren(parentElement, children) {
    children.forEach((child)=>$5feb58fe75c7f837$export$59da04d16460addd(parentElement, child));
}
function $5feb58fe75c7f837$var$isElement(el) {
    //nodeType cannot be zero https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    return !!el.nodeType;
}
function $5feb58fe75c7f837$export$186d02efde07ef98(element, container) {
    container.innerHTML = "";
    if (element) $5feb58fe75c7f837$export$59da04d16460addd(container, element);
}
function $5feb58fe75c7f837$export$d0bfd83e3f838e5e(childPositions, container) {
    let element = container || document.body;
    let childPosition;
    while(element && childPositions.length){
        childPosition = childPositions.shift();
        element = element.children.item(childPosition);
    }
    if (element) return element;
}
function $5feb58fe75c7f837$export$8a664f09713ad850(element, activeElementInfo) {
    element.focus();
    element.scrollTop = activeElementInfo.scrollTop;
    const input = element;
    if (input.setSelectionRange && activeElementInfo && activeElementInfo.selectionStart != null && activeElementInfo.selectionEnd != null) input.setSelectionRange(activeElementInfo.selectionStart, activeElementInfo.selectionEnd, activeElementInfo.selectionDirection);
}
function $5feb58fe75c7f837$export$7d007ff58288f238(activeElementInfo, container) {
    if (activeElementInfo) {
        const element = $5feb58fe75c7f837$export$d0bfd83e3f838e5e(activeElementInfo.childPositions, container);
        if (element) $5feb58fe75c7f837$export$8a664f09713ad850(element, activeElementInfo);
    }
}
function $5feb58fe75c7f837$export$5ec2c407fb44f02(container) {
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
        activeElementInfo.childPositions.unshift($5feb58fe75c7f837$var$getChildPosition(element));
        element = element.parentElement;
    }
    if ((element === document.body || element === container) && activeElementInfo.childPositions.length) return activeElementInfo;
}
function $5feb58fe75c7f837$var$getChildPosition(element) {
    let childPosition = 0;
    while(element = element.previousElementSibling)childPosition++;
    return childPosition;
}
function $5feb58fe75c7f837$var$tagNamespace(tag) {
    //issue: this won't disambiguate certain tags which exist in both svg and html: <a>, <title> ...
    if (tag === "svg" || $5feb58fe75c7f837$var$svgTagArray.indexOf(tag) >= 0 && !($5feb58fe75c7f837$var$htmlTagArray.indexOf(tag) >= 0)) return "http://www.w3.org/2000/svg";
}


const $30be071d2984c290$export$ec835b702d42f3f0 = {
    ENTER: "Enter"
};
const $30be071d2984c290$export$54ec01a60f47d33d = (props)=>{
    return (0, $5feb58fe75c7f837$export$c8a8987d4410bf2d)("table", {
        className: props.className
    }, props.children, props.rows.map((row, i)=>(0, $5feb58fe75c7f837$export$c8a8987d4410bf2d)("tr", {
            className: props.rowClassName || "",
            onClick: (e)=>props.onRowClick && props.onRowClick(e, i),
            tabIndex: props.onRowClick ? 0 : -1,
            onKeyUp: (e)=>{
                if (e.key === $30be071d2984c290$export$ec835b702d42f3f0.ENTER && props.onRowClick) props.onRowClick(e, i);
            }
        }, row.cells.map((cell, i)=>(0, $5feb58fe75c7f837$export$c8a8987d4410bf2d)("td", {
                className: cell.className || "",
                title: cell.title || ""
            }, cell.content)))));
};




var $eeab165cadcca29f$exports = {};


var $fc1d5f246c786135$exports = {};

$parcel$export($fc1d5f246c786135$exports, "addDiv", () => $64c4757e43ed27a4$export$6758c6c7563dc60e);
$parcel$export($fc1d5f246c786135$exports, "addEl", () => $64c4757e43ed27a4$export$3ca29736d56b698a);
$parcel$export($fc1d5f246c786135$exports, "allTruthy", () => $0c3b0860ccac235e$export$84af6d08e329f176);
$parcel$export($fc1d5f246c786135$exports, "clone", () => $bde658c1f00fc2a5$export$9cd59f9826255e47);
$parcel$export($fc1d5f246c786135$exports, "colorFromString", () => $88689deb35cd627d$export$78ed65bc9abd64b1);
$parcel$export($fc1d5f246c786135$exports, "colorIsEqual", () => $88689deb35cd627d$export$7da6ac10e55d4f2a);
$parcel$export($fc1d5f246c786135$exports, "colorToString", () => $88689deb35cd627d$export$f86d83653e5a505e);
$parcel$export($fc1d5f246c786135$exports, "concat", () => $0c3b0860ccac235e$export$ee1b3e54f0441b22);
$parcel$export($fc1d5f246c786135$exports, "createElement", () => $5feb58fe75c7f837$export$c8a8987d4410bf2d);
$parcel$export($fc1d5f246c786135$exports, "deepMerge", () => $bde658c1f00fc2a5$export$6969335ea1e4e77c);
$parcel$export($fc1d5f246c786135$exports, "desaturate", () => $88689deb35cd627d$export$fb75607d98509d9);
$parcel$export($fc1d5f246c786135$exports, "getActiveElementInfo", () => $5feb58fe75c7f837$export$5ec2c407fb44f02);
$parcel$export($fc1d5f246c786135$exports, "getCubeLayer", () => $2ce9d49664bfe8f3$export$ccecd364047ec381);
$parcel$export($fc1d5f246c786135$exports, "getCubes", () => $2ce9d49664bfe8f3$export$fa1ee03f26227b34);
$parcel$export($fc1d5f246c786135$exports, "mount", () => $5feb58fe75c7f837$export$186d02efde07ef98);
$parcel$export($fc1d5f246c786135$exports, "outerSize", () => $64c4757e43ed27a4$export$7642631117982e98);
$parcel$export($fc1d5f246c786135$exports, "push", () => $0c3b0860ccac235e$export$4cbf152802aa238);
$parcel$export($fc1d5f246c786135$exports, "setActiveElement", () => $5feb58fe75c7f837$export$7d007ff58288f238);
function $0c3b0860ccac235e$export$ee1b3e54f0441b22(...args) {
    return args.reduce((p, c)=>c ? p.concat(c) : p, []);
}
function $0c3b0860ccac235e$export$84af6d08e329f176(...args) {
    return args.reduce((p, c)=>c ? p.concat(c) : p, []).filter(Boolean);
}
function $0c3b0860ccac235e$export$4cbf152802aa238(arr, items) {
    arr.push.apply(arr, items);
}


function $64c4757e43ed27a4$export$3ca29736d56b698a(tagName, parentElement) {
    const el = document.createElement(tagName);
    parentElement.appendChild(el);
    return el;
}
function $64c4757e43ed27a4$export$6758c6c7563dc60e(parentElement, className) {
    const div = $64c4757e43ed27a4$export$3ca29736d56b698a("div", parentElement);
    if (className) div.className = className;
    return div;
}
function $64c4757e43ed27a4$export$7642631117982e98(el) {
    const cs = getComputedStyle(el);
    const height = parseFloat(cs.marginTop) + parseFloat(cs.paddingTop) + parseFloat(cs.borderTopWidth) + el.offsetHeight + parseFloat(cs.borderBottomWidth) + parseFloat(cs.paddingBottom) + parseFloat(cs.marginBottom);
    const width = parseFloat(cs.marginLeft) + parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth) + el.offsetWidth + parseFloat(cs.borderRightWidth) + parseFloat(cs.paddingRight) + parseFloat(cs.marginRight);
    return {
        height: height,
        width: width
    };
}


var $06c489908d03dca5$exports = {};

$parcel$defineInteropFlag($06c489908d03dca5$exports);

$parcel$export($06c489908d03dca5$exports, "default", () => $06c489908d03dca5$export$2e2bcd8739ae039);
var $06c489908d03dca5$var$isMergeableObject = function isMergeableObject(value) {
    return $06c489908d03dca5$var$isNonNullObject(value) && !$06c489908d03dca5$var$isSpecial(value);
};
function $06c489908d03dca5$var$isNonNullObject(value) {
    return !!value && typeof value === "object";
}
function $06c489908d03dca5$var$isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);
    return stringValue === "[object RegExp]" || stringValue === "[object Date]" || $06c489908d03dca5$var$isReactElement(value);
}
// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var $06c489908d03dca5$var$canUseSymbol = typeof Symbol === "function" && Symbol.for;
var $06c489908d03dca5$var$REACT_ELEMENT_TYPE = $06c489908d03dca5$var$canUseSymbol ? Symbol.for("react.element") : 0xeac7;
function $06c489908d03dca5$var$isReactElement(value) {
    return value.$$typeof === $06c489908d03dca5$var$REACT_ELEMENT_TYPE;
}
function $06c489908d03dca5$var$emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
}
function $06c489908d03dca5$var$cloneUnlessOtherwiseSpecified(value, options) {
    return options.clone !== false && options.isMergeableObject(value) ? $06c489908d03dca5$var$deepmerge($06c489908d03dca5$var$emptyTarget(value), value, options) : value;
}
function $06c489908d03dca5$var$defaultArrayMerge(target, source, options) {
    return target.concat(source).map(function(element) {
        return $06c489908d03dca5$var$cloneUnlessOtherwiseSpecified(element, options);
    });
}
function $06c489908d03dca5$var$mergeObject(target, source, options) {
    var destination = {};
    if (options.isMergeableObject(target)) Object.keys(target).forEach(function(key) {
        destination[key] = $06c489908d03dca5$var$cloneUnlessOtherwiseSpecified(target[key], options);
    });
    Object.keys(source).forEach(function(key) {
        if (!options.isMergeableObject(source[key]) || !target[key]) destination[key] = $06c489908d03dca5$var$cloneUnlessOtherwiseSpecified(source[key], options);
        else destination[key] = $06c489908d03dca5$var$deepmerge(target[key], source[key], options);
    });
    return destination;
}
function $06c489908d03dca5$var$deepmerge(target, source, options) {
    options = options || {};
    options.arrayMerge = options.arrayMerge || $06c489908d03dca5$var$defaultArrayMerge;
    options.isMergeableObject = options.isMergeableObject || $06c489908d03dca5$var$isMergeableObject;
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
    if (!sourceAndTargetTypesMatch) return $06c489908d03dca5$var$cloneUnlessOtherwiseSpecified(source, options);
    else if (sourceIsArray) return options.arrayMerge(target, source, options);
    else return $06c489908d03dca5$var$mergeObject(target, source, options);
}
$06c489908d03dca5$var$deepmerge.all = function deepmergeAll(array, options) {
    if (!Array.isArray(array)) throw new Error("first argument should be an array");
    return array.reduce(function(prev, next) {
        return $06c489908d03dca5$var$deepmerge(prev, next, options);
    }, {});
};
var $06c489908d03dca5$var$deepmerge_1 = $06c489908d03dca5$var$deepmerge;
var $06c489908d03dca5$export$2e2bcd8739ae039 = $06c489908d03dca5$var$deepmerge_1;


const $bde658c1f00fc2a5$var$deepmerge = $06c489908d03dca5$exports.default || $06c489908d03dca5$exports;
function $bde658c1f00fc2a5$export$9cd59f9826255e47(objectToClone) {
    if (!objectToClone) return objectToClone;
    return $bde658c1f00fc2a5$var$deepmerge.all([
        objectToClone
    ]);
}
const $bde658c1f00fc2a5$var$dontMerge = (destination, source)=>source;
function $bde658c1f00fc2a5$export$6969335ea1e4e77c(...objectsToMerge) {
    const objects = objectsToMerge.filter(Boolean);
    return $bde658c1f00fc2a5$var$deepmerge.all(objects, {
        arrayMerge: $bde658c1f00fc2a5$var$dontMerge
    });
}


function $74b9dd4e6ea088ae$export$2e2bcd8739ae039(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
}
function $74b9dd4e6ea088ae$export$8b58be045bf06082(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for(var key in definition)prototype[key] = definition[key];
    return prototype;
}


function $c0343f20bfecc638$export$892596cec99bc70e() {}
var $c0343f20bfecc638$export$4adafc6ed0600c10 = 0.7;
var $c0343f20bfecc638$export$9eace2cc0d12c98d = 1 / $c0343f20bfecc638$export$4adafc6ed0600c10;
var $c0343f20bfecc638$var$reI = "\\s*([+-]?\\d+)\\s*", $c0343f20bfecc638$var$reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", $c0343f20bfecc638$var$reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $c0343f20bfecc638$var$reHex = /^#([0-9a-f]{3,8})$/, $c0343f20bfecc638$var$reRgbInteger = new RegExp("^rgb\\(" + [
    $c0343f20bfecc638$var$reI,
    $c0343f20bfecc638$var$reI,
    $c0343f20bfecc638$var$reI
] + "\\)$"), $c0343f20bfecc638$var$reRgbPercent = new RegExp("^rgb\\(" + [
    $c0343f20bfecc638$var$reP,
    $c0343f20bfecc638$var$reP,
    $c0343f20bfecc638$var$reP
] + "\\)$"), $c0343f20bfecc638$var$reRgbaInteger = new RegExp("^rgba\\(" + [
    $c0343f20bfecc638$var$reI,
    $c0343f20bfecc638$var$reI,
    $c0343f20bfecc638$var$reI,
    $c0343f20bfecc638$var$reN
] + "\\)$"), $c0343f20bfecc638$var$reRgbaPercent = new RegExp("^rgba\\(" + [
    $c0343f20bfecc638$var$reP,
    $c0343f20bfecc638$var$reP,
    $c0343f20bfecc638$var$reP,
    $c0343f20bfecc638$var$reN
] + "\\)$"), $c0343f20bfecc638$var$reHslPercent = new RegExp("^hsl\\(" + [
    $c0343f20bfecc638$var$reN,
    $c0343f20bfecc638$var$reP,
    $c0343f20bfecc638$var$reP
] + "\\)$"), $c0343f20bfecc638$var$reHslaPercent = new RegExp("^hsla\\(" + [
    $c0343f20bfecc638$var$reN,
    $c0343f20bfecc638$var$reP,
    $c0343f20bfecc638$var$reP,
    $c0343f20bfecc638$var$reN
] + "\\)$");
var $c0343f20bfecc638$var$named = {
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
(0, $74b9dd4e6ea088ae$export$2e2bcd8739ae039)($c0343f20bfecc638$export$892596cec99bc70e, $c0343f20bfecc638$export$2e2bcd8739ae039, {
    copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
        return this.rgb().displayable();
    },
    hex: $c0343f20bfecc638$var$color_formatHex,
    formatHex: $c0343f20bfecc638$var$color_formatHex,
    formatHsl: $c0343f20bfecc638$var$color_formatHsl,
    formatRgb: $c0343f20bfecc638$var$color_formatRgb,
    toString: $c0343f20bfecc638$var$color_formatRgb
});
function $c0343f20bfecc638$var$color_formatHex() {
    return this.rgb().formatHex();
}
function $c0343f20bfecc638$var$color_formatHsl() {
    return $c0343f20bfecc638$export$8133dc3fa904d6d1(this).formatHsl();
}
function $c0343f20bfecc638$var$color_formatRgb() {
    return this.rgb().formatRgb();
}
function $c0343f20bfecc638$export$2e2bcd8739ae039(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = $c0343f20bfecc638$var$reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? $c0343f20bfecc638$var$rgbn(m) // #ff0000
     : l === 3 ? new $c0343f20bfecc638$export$5e05a94393ac29e3(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
     : l === 8 ? $c0343f20bfecc638$var$rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
     : l === 4 ? $c0343f20bfecc638$var$rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
     : null // invalid hex
    ) : (m = $c0343f20bfecc638$var$reRgbInteger.exec(format)) ? new $c0343f20bfecc638$export$5e05a94393ac29e3(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
     : (m = $c0343f20bfecc638$var$reRgbPercent.exec(format)) ? new $c0343f20bfecc638$export$5e05a94393ac29e3(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
     : (m = $c0343f20bfecc638$var$reRgbaInteger.exec(format)) ? $c0343f20bfecc638$var$rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
     : (m = $c0343f20bfecc638$var$reRgbaPercent.exec(format)) ? $c0343f20bfecc638$var$rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
     : (m = $c0343f20bfecc638$var$reHslPercent.exec(format)) ? $c0343f20bfecc638$var$hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
     : (m = $c0343f20bfecc638$var$reHslaPercent.exec(format)) ? $c0343f20bfecc638$var$hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
     : $c0343f20bfecc638$var$named.hasOwnProperty(format) ? $c0343f20bfecc638$var$rgbn($c0343f20bfecc638$var$named[format]) // eslint-disable-line no-prototype-builtins
     : format === "transparent" ? new $c0343f20bfecc638$export$5e05a94393ac29e3(NaN, NaN, NaN, 0) : null;
}
function $c0343f20bfecc638$var$rgbn(n) {
    return new $c0343f20bfecc638$export$5e05a94393ac29e3(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
function $c0343f20bfecc638$var$rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new $c0343f20bfecc638$export$5e05a94393ac29e3(r, g, b, a);
}
function $c0343f20bfecc638$export$42da0a331c2802f5(o) {
    if (!(o instanceof $c0343f20bfecc638$export$892596cec99bc70e)) o = $c0343f20bfecc638$export$2e2bcd8739ae039(o);
    if (!o) return new $c0343f20bfecc638$export$5e05a94393ac29e3;
    o = o.rgb();
    return new $c0343f20bfecc638$export$5e05a94393ac29e3(o.r, o.g, o.b, o.opacity);
}
function $c0343f20bfecc638$export$8972dc0e6ad9238f(r, g, b, opacity) {
    return arguments.length === 1 ? $c0343f20bfecc638$export$42da0a331c2802f5(r) : new $c0343f20bfecc638$export$5e05a94393ac29e3(r, g, b, opacity == null ? 1 : opacity);
}
function $c0343f20bfecc638$export$5e05a94393ac29e3(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
}
(0, $74b9dd4e6ea088ae$export$2e2bcd8739ae039)($c0343f20bfecc638$export$5e05a94393ac29e3, $c0343f20bfecc638$export$8972dc0e6ad9238f, (0, $74b9dd4e6ea088ae$export$8b58be045bf06082)($c0343f20bfecc638$export$892596cec99bc70e, {
    brighter: function(k) {
        k = k == null ? $c0343f20bfecc638$export$9eace2cc0d12c98d : Math.pow($c0343f20bfecc638$export$9eace2cc0d12c98d, k);
        return new $c0343f20bfecc638$export$5e05a94393ac29e3(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? $c0343f20bfecc638$export$4adafc6ed0600c10 : Math.pow($c0343f20bfecc638$export$4adafc6ed0600c10, k);
        return new $c0343f20bfecc638$export$5e05a94393ac29e3(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
        return this;
    },
    displayable: function() {
        return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: $c0343f20bfecc638$var$rgb_formatHex,
    formatHex: $c0343f20bfecc638$var$rgb_formatHex,
    formatRgb: $c0343f20bfecc638$var$rgb_formatRgb,
    toString: $c0343f20bfecc638$var$rgb_formatRgb
}));
function $c0343f20bfecc638$var$rgb_formatHex() {
    return "#" + $c0343f20bfecc638$var$hex(this.r) + $c0343f20bfecc638$var$hex(this.g) + $c0343f20bfecc638$var$hex(this.b);
}
function $c0343f20bfecc638$var$rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function $c0343f20bfecc638$var$hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
}
function $c0343f20bfecc638$var$hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new $c0343f20bfecc638$var$Hsl(h, s, l, a);
}
function $c0343f20bfecc638$export$8133dc3fa904d6d1(o) {
    if (o instanceof $c0343f20bfecc638$var$Hsl) return new $c0343f20bfecc638$var$Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof $c0343f20bfecc638$export$892596cec99bc70e)) o = $c0343f20bfecc638$export$2e2bcd8739ae039(o);
    if (!o) return new $c0343f20bfecc638$var$Hsl;
    if (o instanceof $c0343f20bfecc638$var$Hsl) return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
    } else s = l > 0 && l < 1 ? 0 : h;
    return new $c0343f20bfecc638$var$Hsl(h, s, l, o.opacity);
}
function $c0343f20bfecc638$export$8f4a7c0bb78e6ea8(h, s, l, opacity) {
    return arguments.length === 1 ? $c0343f20bfecc638$export$8133dc3fa904d6d1(h) : new $c0343f20bfecc638$var$Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function $c0343f20bfecc638$var$Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
}
(0, $74b9dd4e6ea088ae$export$2e2bcd8739ae039)($c0343f20bfecc638$var$Hsl, $c0343f20bfecc638$export$8f4a7c0bb78e6ea8, (0, $74b9dd4e6ea088ae$export$8b58be045bf06082)($c0343f20bfecc638$export$892596cec99bc70e, {
    brighter: function(k) {
        k = k == null ? $c0343f20bfecc638$export$9eace2cc0d12c98d : Math.pow($c0343f20bfecc638$export$9eace2cc0d12c98d, k);
        return new $c0343f20bfecc638$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? $c0343f20bfecc638$export$4adafc6ed0600c10 : Math.pow($c0343f20bfecc638$export$4adafc6ed0600c10, k);
        return new $c0343f20bfecc638$var$Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
        return new $c0343f20bfecc638$export$5e05a94393ac29e3($c0343f20bfecc638$var$hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), $c0343f20bfecc638$var$hsl2rgb(h, m1, m2), $c0343f20bfecc638$var$hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
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
/* From FvD 13.37, CSS Color Module Level 3 */ function $c0343f20bfecc638$var$hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}



function $88689deb35cd627d$var$rgbToDeckglColor(c) {
    return [
        c.r,
        c.g,
        c.b,
        c.opacity * 255
    ];
}
function $88689deb35cd627d$export$7da6ac10e55d4f2a(a, b) {
    if (a.length !== b.length) return false;
    for(let i = 0; i < a.length; i++){
        if (a[i] !== b[i]) return false;
    }
    return true;
}
function $88689deb35cd627d$export$78ed65bc9abd64b1(cssColorSpecifier) {
    if (cssColorSpecifier) {
        const dc = (0, $c0343f20bfecc638$export$2e2bcd8739ae039)(cssColorSpecifier);
        if (dc) {
            const c = dc.rgb();
            return $88689deb35cd627d$var$rgbToDeckglColor(c);
        }
    }
}
function $88689deb35cd627d$export$f86d83653e5a505e(color) {
    const c = [
        ...color
    ];
    if (c.length > 3) c[3] /= 255;
    return `rgba(${c.join(",")})`;
}
function $88689deb35cd627d$export$fb75607d98509d9(color, value) {
    const rgb = (0, $c0343f20bfecc638$export$8972dc0e6ad9238f)(color[0], color[1], color[2], color[3] / 255);
    const hslColor = (0, $c0343f20bfecc638$export$8f4a7c0bb78e6ea8)(rgb);
    hslColor.s = value;
    const c = hslColor.rgb();
    return $88689deb35cd627d$var$rgbToDeckglColor(c);
}




let $975e8617bd73ab77$var$vega = {
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
let $975e8617bd73ab77$var$deck = {
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
let $975e8617bd73ab77$var$layers = {
    IconLayer: null,
    LineLayer: null,
    PathLayer: null,
    PolygonLayer: null,
    TextLayer: null
};
let $975e8617bd73ab77$var$luma = {
    CubeGeometry: null,
    Model: null,
    Texture2D: null
};
const $975e8617bd73ab77$export$e2253033e6e1df16 = {
    deck: $975e8617bd73ab77$var$deck,
    layers: $975e8617bd73ab77$var$layers,
    luma: $975e8617bd73ab77$var$luma,
    vega: $975e8617bd73ab77$var$vega
};
function $975e8617bd73ab77$export$1f96ae73734a86cc(vega1, deck1, layers1, luma1) {
    $975e8617bd73ab77$export$e2253033e6e1df16.deck = deck1;
    $975e8617bd73ab77$export$e2253033e6e1df16.layers = layers1;
    $975e8617bd73ab77$export$e2253033e6e1df16.luma = luma1;
    $975e8617bd73ab77$export$e2253033e6e1df16.vega = vega1;
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
$30b7fe48e229d157$export$2e2bcd8739ae039 = `\
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


var $cb224439f6a2e69c$exports = {};

$parcel$export($cb224439f6a2e69c$exports, "minHeight", () => $cb224439f6a2e69c$export$a43cf604e12f3b17);
$parcel$export($cb224439f6a2e69c$exports, "minWidth", () => $cb224439f6a2e69c$export$ee148fbbe8357dd2);
$parcel$export($cb224439f6a2e69c$exports, "defaultPresenterStyle", () => $cb224439f6a2e69c$export$83ac8f5ae8122afc);
$parcel$export($cb224439f6a2e69c$exports, "defaultPresenterConfig", () => $cb224439f6a2e69c$export$200f593236aebbdc);
$parcel$export($cb224439f6a2e69c$exports, "createStage", () => $cb224439f6a2e69c$export$afa8810fbe5c2601);
$parcel$export($cb224439f6a2e69c$exports, "groupStrokeWidth", () => $cb224439f6a2e69c$export$62471df653c738cc);
$parcel$export($cb224439f6a2e69c$exports, "lineZ", () => $cb224439f6a2e69c$export$c25c42a6ee2ec894);
$parcel$export($cb224439f6a2e69c$exports, "defaultView", () => $cb224439f6a2e69c$export$93acc5219d6538bb);
$parcel$export($cb224439f6a2e69c$exports, "min3dDepth", () => $cb224439f6a2e69c$export$d90a7322036a432e);
$parcel$export($cb224439f6a2e69c$exports, "minPixelSize", () => $cb224439f6a2e69c$export$c9c7d435df6c4ed7);
const $cb224439f6a2e69c$export$a43cf604e12f3b17 = "100px";
const $cb224439f6a2e69c$export$ee148fbbe8357dd2 = "100px";
const $cb224439f6a2e69c$export$83ac8f5ae8122afc = {
    cssPrefix: "vega-deckgl-",
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
const $cb224439f6a2e69c$export$200f593236aebbdc = {
    onCubeClick: (e, cube)=>{},
    onCubeHover: (e, cube)=>{},
    transitionDurations: {
        color: 100,
        position: 600,
        size: 600,
        view: 600
    }
};
function $cb224439f6a2e69c$export$afa8810fbe5c2601(view) {
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
            rows: {}
        },
        facets: []
    };
    return stage;
}
const $cb224439f6a2e69c$export$62471df653c738cc = 1;
const $cb224439f6a2e69c$export$c25c42a6ee2ec894 = -1;
const $cb224439f6a2e69c$export$93acc5219d6538bb = "2d";
const $cb224439f6a2e69c$export$d90a7322036a432e = 0.05;
const $cb224439f6a2e69c$export$c9c7d435df6c4ed7 = 0.5;


var $0d8759e743ef282e$export$2e2bcd8739ae039 = `\
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

  float x = instanceSizes.x > 0.0 ? max(instanceSizes.x, ${(0, $cb224439f6a2e69c$export$c9c7d435df6c4ed7).toFixed(1)}) : 0.0;
  float y = instanceSizes.y > 0.0 ? max(instanceSizes.y, ${(0, $cb224439f6a2e69c$export$c9c7d435df6c4ed7).toFixed(1)}) : 0.0;

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



//https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
const $42922bf70b926cf7$var$UNSIGNED_BYTE = 0x1401;
const $42922bf70b926cf7$var$DOUBLE = 0x140a;
const $42922bf70b926cf7$var$DEFAULT_COLOR = [
    255,
    0,
    255,
    255
];
const $42922bf70b926cf7$var$defaultProps = {
    lightingMix: 0.5,
    getSize: (x)=>x.size,
    getPosition: (x)=>x.position,
    getColor: (x)=>x.color,
    material: {
        ambient: 0.5,
        diffuse: 1
    }
};
function $42922bf70b926cf7$var$_CubeLayer(props1) {
    //dynamic superclass, since we don't know have deck.Layer in the declaration phase
    class __CubeLayer extends (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.Layer {
        getShaders() {
            return {
                vs: $0d8759e743ef282e$export$2e2bcd8739ae039,
                fs: $30b7fe48e229d157$export$2e2bcd8739ae039,
                modules: [
                    (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.project32,
                    (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.gouraudLighting,
                    (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.picking
                ]
            };
        }
        initializeState() {
            const attributeManager = this.getAttributeManager();
            attributeManager.addInstanced({
                instancePositions: {
                    size: 3,
                    type: $42922bf70b926cf7$var$DOUBLE,
                    transition: true,
                    accessor: "getPosition"
                },
                instanceSizes: {
                    size: 3,
                    transition: true,
                    accessor: "getSize"
                },
                instanceColors: {
                    size: 4,
                    type: $42922bf70b926cf7$var$UNSIGNED_BYTE,
                    transition: true,
                    accessor: "getColor",
                    defaultValue: $42922bf70b926cf7$var$DEFAULT_COLOR
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
            return new (0, $975e8617bd73ab77$export$e2253033e6e1df16).luma.Model(gl, Object.assign({}, this.getShaders(), {
                id: this.props.id,
                geometry: new (0, $975e8617bd73ab77$export$e2253033e6e1df16).luma.CubeGeometry(),
                isInstanced: true
            }));
        }
        draw({ uniforms: uniforms  }) {
            let { lightingMix: lightingMix  } = this.props;
            if (this.props.interpolator && this.props.interpolator.layerInterpolatedProps) lightingMix = this.props.interpolator.layerInterpolatedProps.lightingMix;
            this.state.model.setUniforms(Object.assign({}, uniforms, {
                lightingMix: lightingMix
            })).draw();
        }
    }
    __CubeLayer.layerName = "CubeLayer";
    __CubeLayer.defaultProps = $42922bf70b926cf7$var$defaultProps;
    const instance = new __CubeLayer(props1);
    return instance;
}
const $42922bf70b926cf7$export$49d6aa54bfdcaef = $42922bf70b926cf7$var$_CubeLayer;


function $6a58ff249c135fca$export$be3f0f7224794b88(x) {
    return (Math.pow(2, -10 * x) - 0.0009765625) * 1.0009775171065494;
}


function $0eedd3fa704eca21$export$fc3e95f15e1ef38e(t) {
    return (0, $6a58ff249c135fca$export$be3f0f7224794b88)(1 - +t);
}
function $0eedd3fa704eca21$export$f3c9b2f85fbcf0ab(t) {
    return 1 - (0, $6a58ff249c135fca$export$be3f0f7224794b88)(t);
}
function $0eedd3fa704eca21$export$ae4d4e77fab188ff(t) {
    return ((t *= 2) <= 1 ? (0, $6a58ff249c135fca$export$be3f0f7224794b88)(1 - t) : 2 - (0, $6a58ff249c135fca$export$be3f0f7224794b88)(t - 1)) / 2;
}



function $bb1bb47ebb99b990$export$24c5ac7c37452e7d(t) {
    if (t === 0 || t === 1) return t;
    return (0, $0eedd3fa704eca21$export$ae4d4e77fab188ff)(t);
}


function $2ce9d49664bfe8f3$export$61f6a9c831786408(presenter, config, stage, lightSettings /*LightSettings*/ , lightingMix, interpolator, guideLines) {
    const cubeLayer = $2ce9d49664bfe8f3$var$newCubeLayer(presenter, config, stage.cubeData, presenter.style.highlightColor, lightSettings, lightingMix, interpolator);
    const { x: x , y: y , z: z  } = stage.axes;
    const lines = (0, $0c3b0860ccac235e$export$ee1b3e54f0441b22)(stage.gridLines, guideLines);
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
    characterSet = new Array(95).fill(1).map((_, i)=>String.fromCharCode(32 + i));
    if (stage.facets) stage.facets.forEach((f)=>{
        if (f.lines) lines.push.apply(lines, f.lines);
    });
    const lineLayer = $2ce9d49664bfe8f3$var$newLineLayer((0, $f3d4039a9d780933$export$5792b81513a80aca).lines, lines);
    const textLayer = $2ce9d49664bfe8f3$var$newTextLayer(presenter, (0, $f3d4039a9d780933$export$5792b81513a80aca).text, texts, config, presenter.style.fontFamily, characterSet);
    const pathLayer = $2ce9d49664bfe8f3$var$newPathLayer((0, $f3d4039a9d780933$export$5792b81513a80aca).paths, stage.pathData);
    const polygonLayer = $2ce9d49664bfe8f3$var$newPolygonLayer((0, $f3d4039a9d780933$export$5792b81513a80aca).polygons, stage.polygonData);
    return [
        textLayer,
        cubeLayer,
        lineLayer,
        pathLayer,
        polygonLayer
    ];
}
function $2ce9d49664bfe8f3$var$newCubeLayer(presenter, config, cubeData, highlightColor, lightSettings /*LightSettings*/ , lightingMix, interpolator) {
    const getPosition = $2ce9d49664bfe8f3$var$getTiming(config.transitionDurations.position, (0, $bb1bb47ebb99b990$export$24c5ac7c37452e7d));
    const getSize = $2ce9d49664bfe8f3$var$getTiming(config.transitionDurations.size, (0, $bb1bb47ebb99b990$export$24c5ac7c37452e7d));
    const getColor = $2ce9d49664bfe8f3$var$getTiming(config.transitionDurations.color);
    const cubeLayerProps = {
        interpolator: interpolator,
        lightingMix: lightingMix,
        id: (0, $f3d4039a9d780933$export$5792b81513a80aca).cubes,
        data: cubeData,
        coordinateSystem: (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.COORDINATE_SYSTEM.CARTESIAN,
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
    return new (0, $42922bf70b926cf7$export$49d6aa54bfdcaef)(cubeLayerProps);
}
function $2ce9d49664bfe8f3$var$newLineLayer(id, data) {
    return new (0, $975e8617bd73ab77$export$e2253033e6e1df16).layers.LineLayer({
        id: id,
        data: data,
        widthUnits: "pixels",
        coordinateSystem: (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.COORDINATE_SYSTEM.CARTESIAN,
        getColor: (o)=>o.color,
        getWidth: (o)=>o.strokeWidth
    });
}
function $2ce9d49664bfe8f3$var$newPathLayer(id, data) {
    if (!data) return null;
    return new (0, $975e8617bd73ab77$export$e2253033e6e1df16).layers.PathLayer({
        id: id,
        data: data,
        billboard: true,
        widthScale: 1,
        widthMinPixels: 2,
        widthUnits: "pixels",
        coordinateSystem: (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.COORDINATE_SYSTEM.CARTESIAN,
        getPath: (o)=>o.positions,
        getColor: (o)=>o.strokeColor,
        getWidth: (o)=>o.strokeWidth
    });
}
function $2ce9d49664bfe8f3$var$newPolygonLayer(id, data) {
    if (!data) return null;
    let newlayer = new (0, $975e8617bd73ab77$export$e2253033e6e1df16).layers.PolygonLayer({
        id: id,
        data: data,
        coordinateSystem: (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.COORDINATE_SYSTEM.CARTESIAN,
        getPolygon: (o)=>o.positions,
        getFillColor: (o)=>o.fillColor,
        getLineColor: (o)=>o.strokeColor,
        wireframe: false,
        filled: true,
        stroked: true,
        pickable: true,
        extruded: true,
        getElevation: (o)=>o.depth,
        getLineWidth: (o)=>o.strokeWidth
    });
    return newlayer;
}
function $2ce9d49664bfe8f3$var$newTextLayer(presenter, id, data, config, fontFamily, characterSet) {
    let alphaCutoff = config.getTextHighlightAlphaCutoff && config.getTextHighlightAlphaCutoff();
    if (alphaCutoff === undefined) alphaCutoff = 0.1;
    const props = {
        id: id,
        data: data,
        characterSet: characterSet,
        coordinateSystem: (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.COORDINATE_SYSTEM.CARTESIAN,
        sizeUnits: "pixels",
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
        getColor: config.getTextColor || ((o)=>o.color),
        getTextAnchor: (o)=>o.textAnchor,
        getSize: (o)=>o.size,
        getAngle: (o)=>o.angle,
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
    return new (0, $975e8617bd73ab77$export$e2253033e6e1df16).layers.TextLayer(props);
}
function $2ce9d49664bfe8f3$var$getTiming(duration, easing1) {
    let timing;
    if (duration) {
        timing = {
            duration: duration,
            type: "interpolation"
        };
        if (easing1) timing.easing = easing1;
    }
    return timing;
}
function $2ce9d49664bfe8f3$export$ccecd364047ec381(deckProps) {
    return deckProps.layers.filter((layer)=>layer && layer.id === (0, $f3d4039a9d780933$export$5792b81513a80aca).cubes)[0];
}
function $2ce9d49664bfe8f3$export$fa1ee03f26227b34(deckProps) {
    const cubeLayer = $2ce9d49664bfe8f3$export$ccecd364047ec381(deckProps);
    if (!cubeLayer) return;
    const cubeLayerProps = cubeLayer.props;
    return cubeLayerProps.data;
}











function $0a74f207e382a4fc$export$cf6caf239925fb63(factoryOptions) {
    function wrapper(props1) {
        class OrbitControllerInternal extends (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.OrbitController {
            constructor(props){
                super(props);
                this.invertPan = true;
            }
            handleEvent(event) {
                if (event.type === "doubletap") {
                    if (factoryOptions && factoryOptions.doubleClickHandler) return factoryOptions.doubleClickHandler(event, this);
                }
                return super.handleEvent(event);
            }
        }
        const instance = new OrbitControllerInternal(props1);
        return instance;
    }
    return wrapper;
}


//adapted from https://github.com/uber/deck.gl/blob/5.3-release/modules/lite/src/deckgl.js
const $f48cbb1d723098a5$var$CANVAS_STYLE = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
};
// Create canvas elements for map and deck
function $f48cbb1d723098a5$var$createCanvas(props) {
    let { container: container = document.body  } = props;
    if (typeof container === "string") container = document.getElementById(container);
    if (!container) throw Error("Deck: container not found");
    // Add DOM elements
    const containerStyle = window.getComputedStyle(container);
    if (containerStyle.position === "static") container.style.position = "relative";
    const deckCanvas = document.createElement("canvas");
    container.appendChild(deckCanvas);
    Object.assign(deckCanvas.style, $f48cbb1d723098a5$var$CANVAS_STYLE);
    return {
        container: container,
        deckCanvas: deckCanvas
    };
}
function $f48cbb1d723098a5$export$cc8b65d27ce6adb1(factoryOptions) {
    const OrbitControllerClass = (0, $0a74f207e382a4fc$export$cf6caf239925fb63)(factoryOptions);
    //dynamic superclass lets us create a subclass at execution phase instead of declaration phase.
    //This allows us to retrieve Deck from either UMD or ES6 consumers of this class.
    function wrapper(props1) {
        /**
         * @params container (Element) - DOM element to add deck.gl canvas to
         * @params controller (Object) - Controller class. Leave empty for auto detection
         */ class DeckGLInternal extends (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.Deck {
            constructor(props){
                if (typeof document === "undefined") // Not browser
                throw Error("Deck can only be used in the browser");
                const { deckCanvas: deckCanvas  } = $f48cbb1d723098a5$var$createCanvas(props);
                const viewState = props.initialViewState || props.viewState || {};
                super(Object.assign({}, props, {
                    width: "100%",
                    height: "100%",
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
                if ("onViewStateChange" in props && this._updateViewState) {
                    // This is called at least once at _onRendererInitialized
                    this.onViewStateChange = props.onViewStateChange;
                    props.onViewStateChange = this._updateViewState;
                }
                super.setProps(props);
            }
        }
        const instance = new DeckGLInternal(props1);
        return instance;
    }
    return {
        OrbitControllerClass: OrbitControllerClass,
        DeckGL_Class: wrapper
    };
}



function $2923565ec0b3fb84$var$wrapper(props) {
    class LinearInterpolatorInternal extends (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.LinearInterpolator {
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
const $2923565ec0b3fb84$export$19db461e577de3cc = $2923565ec0b3fb84$var$wrapper;





function $04b116f6958d3235$export$ecab656a5b486b67() {
    const ambientLight = new (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.AmbientLight({
        color: [
            255,
            255,
            255
        ],
        intensity: 0.3
    });
    const cameraLight = new (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck._CameraLight({
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
        new (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.LightingEffect({
            ambientLight: ambientLight,
            cameraLight: cameraLight
        })
    ];
}


var $483619dbeb86ab73$exports = {};

$parcel$export($483619dbeb86ab73$exports, "PresenterElement", () => $483619dbeb86ab73$export$79420be32f83a5b0);
var $483619dbeb86ab73$export$79420be32f83a5b0;
(function(PresenterElement1) {
    PresenterElement1[PresenterElement1["root"] = 0] = "root";
    PresenterElement1[PresenterElement1["gl"] = 1] = "gl";
    PresenterElement1[PresenterElement1["panel"] = 2] = "panel";
    PresenterElement1[PresenterElement1["legend"] = 3] = "legend";
    PresenterElement1[PresenterElement1["vegaControls"] = 4] = "vegaControls";
})($483619dbeb86ab73$export$79420be32f83a5b0 || ($483619dbeb86ab73$export$79420be32f83a5b0 = {}));





const $b89e73cbcb837965$export$b0b33bcc0f604685 = (props)=>{
    const rows = [];
    const addRow = (row, i)=>{
        const fn = $b89e73cbcb837965$var$symbolMap[row.symbol.shape];
        let jsx;
        if (fn) jsx = fn(row.symbol);
        else jsx = (0, $5feb58fe75c7f837$export$c8a8987d4410bf2d)("span", null, "x");
        rows.push({
            cells: [
                {
                    className: "symbol",
                    content: jsx
                },
                {
                    className: "label",
                    content: row.label,
                    title: row.label
                }
            ]
        });
    };
    var sorted = Object.keys(props.legend.rows).sort((a, b)=>+a - +b);
    sorted.forEach((i)=>addRow(props.legend.rows[i], +i));
    if (sorted.length) return (0, $5feb58fe75c7f837$export$c8a8987d4410bf2d)((0, $30be071d2984c290$export$54ec01a60f47d33d), {
        rows: rows,
        rowClassName: "legend-row",
        onRowClick: (e, i)=>props.onClick(e, props.legend, i)
    }, props.legend.title !== undefined && (0, $5feb58fe75c7f837$export$c8a8987d4410bf2d)("tr", {
        tabIndex: props.onClick ? 0 : -1,
        onClick: (e)=>props.onClick(e, props.legend, null),
        onKeyUp: (e)=>{
            if (e.key === (0, $30be071d2984c290$export$ec835b702d42f3f0).ENTER && props.onClick) props.onClick(e, props.legend, null);
        }
    }, (0, $5feb58fe75c7f837$export$c8a8987d4410bf2d)("th", {
        colSpan: 2
    }, props.legend.title)));
};
const $b89e73cbcb837965$var$symbolMap = {
    square: function(symbol) {
        return (0, $5feb58fe75c7f837$export$c8a8987d4410bf2d)("div", {
            style: {
                height: `${symbol.bounds.y2 - symbol.bounds.y1}px`,
                width: `${symbol.bounds.x2 - symbol.bounds.x1}px`,
                backgroundColor: symbol.fill,
                borderColor: symbol.fill
            }
        });
    }
};






function $1239d19cae4bcec7$export$5accd073ebd18e1(v3) {
    let temp = -v3[1]; //negeative y to positive z
    if (v3[0] === (0, $cb224439f6a2e69c$export$c25c42a6ee2ec894)) v3[0] = 0;
    v3[1] = v3[2];
    v3[2] = temp;
}


const $5d56ff003a42dc40$var$markStager = (options, stage, scene, x, y, groupType)=>{
    (0, $975e8617bd73ab77$export$e2253033e6e1df16).vega.sceneVisit(scene, function(item) {
        const x1 = item.x || 0;
        const y1 = item.y || 0;
        const x2 = item.x2 != null ? item.x2 : x1;
        const y2 = item.y2 != null ? item.y2 : y1;
        const lineItem = $5d56ff003a42dc40$var$styledLine(x1 + x, y1 + y, x2 + x, y2 + y, item.stroke, item.strokeWidth);
        if (item.mark.role === "axis-tick") {
            if (options.currAxis.role === "z") {
                (0, $1239d19cae4bcec7$export$5accd073ebd18e1)(lineItem.sourcePosition);
                (0, $1239d19cae4bcec7$export$5accd073ebd18e1)(lineItem.targetPosition);
            }
            options.currAxis.ticks.push(lineItem);
        } else if (item.mark.role === "axis-domain") {
            if (options.currAxis.role === "z") {
                (0, $1239d19cae4bcec7$export$5accd073ebd18e1)(lineItem.sourcePosition);
                (0, $1239d19cae4bcec7$export$5accd073ebd18e1)(lineItem.targetPosition);
            }
            options.currAxis.domain = lineItem;
        } else stage.gridLines.push(lineItem);
    });
};
function $5d56ff003a42dc40$var$styledLine(x1, y1, x2, y2, stroke, strokeWidth) {
    const line = {
        sourcePosition: [
            x1,
            -y1,
            (0, $cb224439f6a2e69c$export$c25c42a6ee2ec894)
        ],
        targetPosition: [
            x2,
            -y2,
            (0, $cb224439f6a2e69c$export$c25c42a6ee2ec894)
        ],
        color: (0, $88689deb35cd627d$export$78ed65bc9abd64b1)(stroke),
        strokeWidth: strokeWidth
    };
    return line;
}
function $5d56ff003a42dc40$export$827f4ee28efc37(gx, gy, height, width, stroke, strokeWidth, diagonals = false) {
    const lines = [
        $5d56ff003a42dc40$var$styledLine(gx, gy, gx + width, gy, stroke, strokeWidth),
        $5d56ff003a42dc40$var$styledLine(gx + width, gy, gx + width, gy + height, stroke, strokeWidth),
        $5d56ff003a42dc40$var$styledLine(gx + width, gy + height, gx, gy + height, stroke, strokeWidth),
        $5d56ff003a42dc40$var$styledLine(gx, gy + height, gx, gy, stroke, strokeWidth)
    ];
    if (diagonals) {
        lines.push($5d56ff003a42dc40$var$styledLine(gx, gy, gx + width, gy + height, stroke, strokeWidth));
        lines.push($5d56ff003a42dc40$var$styledLine(gx, gy + height, gx + width, gy, stroke, strokeWidth));
    }
    return lines;
}
var $5d56ff003a42dc40$export$2e2bcd8739ae039 = $5d56ff003a42dc40$var$markStager;





function $dfe8065030a6ee84$export$ba5a93ad8642dce4(presenter) {
    const rootDiv = (0, $5feb58fe75c7f837$export$c8a8987d4410bf2d)("div", {
        className: $dfe8065030a6ee84$export$2913c0c0b5623090((0, $483619dbeb86ab73$export$79420be32f83a5b0).root, presenter)
    }, (0, $5feb58fe75c7f837$export$c8a8987d4410bf2d)("div", {
        className: $dfe8065030a6ee84$export$2913c0c0b5623090((0, $483619dbeb86ab73$export$79420be32f83a5b0).gl, presenter),
        style: {
            minHeight: $cb224439f6a2e69c$export$a43cf604e12f3b17,
            minWidth: $cb224439f6a2e69c$export$ee148fbbe8357dd2
        }
    }), (0, $5feb58fe75c7f837$export$c8a8987d4410bf2d)("div", {
        className: $dfe8065030a6ee84$export$2913c0c0b5623090((0, $483619dbeb86ab73$export$79420be32f83a5b0).panel, presenter)
    }, (0, $5feb58fe75c7f837$export$c8a8987d4410bf2d)("div", {
        className: $dfe8065030a6ee84$export$2913c0c0b5623090((0, $483619dbeb86ab73$export$79420be32f83a5b0).vegaControls, presenter)
    }), (0, $5feb58fe75c7f837$export$c8a8987d4410bf2d)("div", {
        className: $dfe8065030a6ee84$export$2913c0c0b5623090((0, $483619dbeb86ab73$export$79420be32f83a5b0).legend, presenter)
    })));
    (0, $5feb58fe75c7f837$export$186d02efde07ef98)(rootDiv, presenter.el);
}
function $dfe8065030a6ee84$export$2913c0c0b5623090(type, presenter) {
    return `${presenter.style.cssPrefix}${(0, $483619dbeb86ab73$export$79420be32f83a5b0)[type]}`;
}


function $753504a3f96134c4$export$9a79ca9001afcc6d(allocatedSize, empty, cubes) {
    const patched = new Array(allocatedSize);
    patched.fill(empty);
    cubes.forEach((cube)=>patched[cube.ordinal] = cube);
    return patched;
}



const $89e7e208bf4a6623$var$legendMap = {
    "legend-title": function(legend, textItem) {
        legend.title = textItem.text;
    },
    "legend-symbol": function(legend, symbol) {
        const { bounds: bounds , fill: fill , shape: shape  } = symbol;
        //this object is safe for serialization
        const legendRowSymbol = {
            bounds: bounds,
            fill: fill,
            shape: shape
        };
        const i = symbol.datum.index;
        legend.rows[i] = legend.rows[i] || {};
        legend.rows[i].symbol = legendRowSymbol;
    },
    "legend-label": function(legend, label) {
        const i = label.datum.index;
        legend.rows[i] = legend.rows[i] || {};
        const row = legend.rows[i];
        row.label = label.text;
        row.value = label.datum.value;
    }
};
const $89e7e208bf4a6623$var$markStager = (options, stage, scene, x, y, groupType)=>{
    (0, $975e8617bd73ab77$export$e2253033e6e1df16).vega.sceneVisit(scene, function(item) {
        const fn = $89e7e208bf4a6623$var$legendMap[item.mark.role];
        if (fn) fn(stage.legend, item);
    });
};
var $89e7e208bf4a6623$export$2e2bcd8739ae039 = $89e7e208bf4a6623$var$markStager;





const $79b4fb4184b5fc75$var$markStager = (options, stage, scene, x, y, groupType)=>{
    (0, $975e8617bd73ab77$export$e2253033e6e1df16).vega.sceneVisit(scene, function(item) {
        //for orthographic (2d) - always use 0 or else Deck will not show them
        const z = stage.view === "2d" ? 0 : item.z || 0;
        const depth = (stage.view === "2d" ? 0 : item.depth || 0) + (0, $cb224439f6a2e69c$export$d90a7322036a432e);
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
                color: (0, $88689deb35cd627d$export$78ed65bc9abd64b1)(item.fill) || options.defaultCubeColor || [
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
var $79b4fb4184b5fc75$export$2e2bcd8739ae039 = $79b4fb4184b5fc75$var$markStager;




//change direction of y from SVG to GL
const $ab075339e2ce3efd$var$ty = -1;
const $ab075339e2ce3efd$var$markStager = (options, stage, scene, x, y, groupType)=>{
    const g = Object.assign({
        opacity: 1,
        strokeOpacity: 1,
        strokeWidth: 1
    }, scene.items[0]);
    const path = {
        strokeWidth: g.strokeWidth,
        strokeColor: (0, $88689deb35cd627d$export$78ed65bc9abd64b1)(g.stroke),
        positions: scene.items.map((it)=>[
                it.x,
                $ab075339e2ce3efd$var$ty * it.y,
                it.z || 0
            ])
    };
    path.strokeColor[3] *= g.strokeOpacity;
    path.strokeColor[3] *= g.opacity;
    stage.pathData.push(path);
};
var $ab075339e2ce3efd$export$2e2bcd8739ae039 = $ab075339e2ce3efd$var$markStager;





const $97a792063f683a9d$var$markStager = (options, stage, scene, x, y, groupType)=>{
    //scale Deck.Gl text to Vega size
    const fontScale = 1;
    //change direction of y from SVG to GL
    const ty = -1;
    (0, $975e8617bd73ab77$export$e2253033e6e1df16).vega.sceneVisit(scene, function(item) {
        if (!item.text) return;
        const size = item.fontSize * fontScale;
        const alignmentBaseline = $97a792063f683a9d$var$convertBaseline(item.baseline);
        const yOffset = alignmentBaseline === "top" ? item.fontSize / 2 : 0; //fixup to get tick text correct
        const textItem = {
            color: (0, $88689deb35cd627d$export$78ed65bc9abd64b1)(item.fill),
            text: item.limit === undefined ? item.text : (0, $975e8617bd73ab77$export$e2253033e6e1df16).vega.truncate(item.text, item.limit, "right", item.ellipsis || "..."),
            position: [
                x + (item.x || 0),
                ty * (y + (item.y || 0) + yOffset),
                0
            ],
            size: size,
            angle: $97a792063f683a9d$var$convertAngle(item.angle),
            textAnchor: $97a792063f683a9d$var$convertAlignment(item.align),
            alignmentBaseline: alignmentBaseline,
            metaData: item.metaData
        };
        if (item.mark.role === "axis-label") {
            const tickText = textItem;
            tickText.value = item.datum.value;
            if (options.currAxis.role === "z") (0, $1239d19cae4bcec7$export$5accd073ebd18e1)(tickText.position);
            options.currAxis.tickText.push(tickText);
        } else if (item.mark.role === "axis-title") {
            if (options.currAxis.role === "z") (0, $1239d19cae4bcec7$export$5accd073ebd18e1)(textItem.position);
            options.currAxis.title = textItem;
        } else stage.textData.push(textItem);
    });
};
function $97a792063f683a9d$var$convertAngle(vegaTextAngle) {
    if (vegaTextAngle && !isNaN(vegaTextAngle)) return 360 - vegaTextAngle;
    return 0;
}
function $97a792063f683a9d$var$convertAlignment(textAlign) {
    switch(textAlign){
        case "center":
            return "middle";
        case "left":
            return "start";
        case "right":
            return "end";
    }
    return "start";
}
function $97a792063f683a9d$var$convertBaseline(baseline) {
    switch(baseline){
        case "middle":
            return "center";
    }
    return baseline || "bottom";
}
var $97a792063f683a9d$export$2e2bcd8739ae039 = $97a792063f683a9d$var$markStager;



//change direction of y from SVG to GL
const $e715d15345e41e69$var$ty = -1;
const $e715d15345e41e69$var$markStager = (options, stage, scene, x, y, groupType)=>{
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
            $e715d15345e41e69$var$ty * item.y,
            item.z,
            item.x2,
            $e715d15345e41e69$var$ty * item.y2,
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
        fillColor: (0, $88689deb35cd627d$export$78ed65bc9abd64b1)(g.fill) || [
            0,
            0,
            0,
            0
        ],
        positions: positions,
        strokeColor: (0, $88689deb35cd627d$export$78ed65bc9abd64b1)(g.stroke) || [
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
var $e715d15345e41e69$export$2e2bcd8739ae039 = $e715d15345e41e69$var$markStager;





var $cb71d75340c71fa4$export$d460f747b73abb10;
(function(GroupType1) {
    GroupType1[GroupType1["none"] = 0] = "none";
    GroupType1[GroupType1["legend"] = 1] = "legend";
    GroupType1[GroupType1["xAxis"] = 2] = "xAxis";
    GroupType1[GroupType1["yAxis"] = 3] = "yAxis";
    GroupType1[GroupType1["zAxis"] = 4] = "zAxis";
})($cb71d75340c71fa4$export$d460f747b73abb10 || ($cb71d75340c71fa4$export$d460f747b73abb10 = {}));


function $3f4cbf010dab927f$var$getOrientItem(group1) {
    if (group1.orient) return group1;
    return group1.datum;
}
function $3f4cbf010dab927f$var$convertGroupRole(group2, options) {
    if (group2.mark.role === "legend") return (0, $cb71d75340c71fa4$export$d460f747b73abb10).legend;
    if (group2.mark.role === "axis") {
        if (group2.mark.zindex === options.zAxisZindex && options.zAxisZindex !== undefined) return (0, $cb71d75340c71fa4$export$d460f747b73abb10).zAxis;
        const orientItem = $3f4cbf010dab927f$var$getOrientItem(group2);
        if (orientItem) switch(orientItem.orient){
            case "bottom":
            case "top":
                return (0, $cb71d75340c71fa4$export$d460f747b73abb10).xAxis;
            case "left":
            case "right":
                return (0, $cb71d75340c71fa4$export$d460f747b73abb10).yAxis;
        }
    }
}
const $3f4cbf010dab927f$var$group = (options, stage, scene, x, y, groupType)=>{
    (0, $975e8617bd73ab77$export$e2253033e6e1df16).vega.sceneVisit(scene, function(g) {
        const gx = g.x || 0, gy = g.y || 0;
        if (g.context && g.context.background && !stage.backgroundColor) stage.backgroundColor = (0, $88689deb35cd627d$export$78ed65bc9abd64b1)(g.context.background);
        if (g.stroke) {
            const facetRect = {
                datum: g.datum,
                lines: (0, $5d56ff003a42dc40$export$827f4ee28efc37)(gx + x, gy + y, g.height, g.width, g.stroke, (0, $cb224439f6a2e69c$export$62471df653c738cc))
            };
            stage.facets.push(facetRect);
        }
        groupType = $3f4cbf010dab927f$var$convertGroupRole(g, options) || groupType;
        $3f4cbf010dab927f$var$setCurrentAxis(options, stage, groupType);
        // draw group contents
        (0, $975e8617bd73ab77$export$e2253033e6e1df16).vega.sceneVisit(g, function(item) {
            $3f4cbf010dab927f$var$mainStager(options, stage, item, gx + x, gy + y, groupType);
        });
    });
};
function $3f4cbf010dab927f$var$setCurrentAxis(options, stage, groupType) {
    let axes;
    let role;
    switch(groupType){
        case (0, $cb71d75340c71fa4$export$d460f747b73abb10).xAxis:
            axes = stage.axes.x;
            role = "x";
            break;
        case (0, $cb71d75340c71fa4$export$d460f747b73abb10).yAxis:
            axes = stage.axes.y;
            role = "y";
            break;
        case (0, $cb71d75340c71fa4$export$d460f747b73abb10).zAxis:
            axes = stage.axes.z;
            role = "z";
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
const $3f4cbf010dab927f$var$markStagers = {
    group: $3f4cbf010dab927f$var$group,
    legend: $89e7e208bf4a6623$export$2e2bcd8739ae039,
    rect: $79b4fb4184b5fc75$export$2e2bcd8739ae039,
    rule: $5d56ff003a42dc40$export$2e2bcd8739ae039,
    line: $ab075339e2ce3efd$export$2e2bcd8739ae039,
    area: $e715d15345e41e69$export$2e2bcd8739ae039,
    text: $97a792063f683a9d$export$2e2bcd8739ae039
};
const $3f4cbf010dab927f$var$mainStager = (options, stage, scene, x, y, groupType)=>{
    if (scene.marktype !== "group" && groupType === (0, $cb71d75340c71fa4$export$d460f747b73abb10).legend) (0, $89e7e208bf4a6623$export$2e2bcd8739ae039)(options, stage, scene, x, y, groupType);
    else {
        const markStager = $3f4cbf010dab927f$var$markStagers[scene.marktype];
        if (markStager) markStager(options, stage, scene, x, y, groupType);
    }
};
function $3f4cbf010dab927f$export$d78988dba6734aaa(options, stage, scene) {
    $3f4cbf010dab927f$var$mainStager(options, stage, scene, 0, 0, null);
    $3f4cbf010dab927f$var$sortAxis(stage.axes.x, 0);
    $3f4cbf010dab927f$var$sortAxis(stage.axes.y, 1);
}
function $3f4cbf010dab927f$var$sortAxis(axes, dim) {
    axes.forEach((axis)=>{
        if (axis.domain) $3f4cbf010dab927f$var$orderDomain(axis.domain, dim);
        axis.ticks.sort((a, b)=>a.sourcePosition[dim] - b.sourcePosition[dim]);
        axis.tickText.sort((a, b)=>a.position[dim] - b.position[dim]);
    });
}
function $3f4cbf010dab927f$var$orderDomain(domain, dim) {
    if (domain.sourcePosition[dim] > domain.targetPosition[dim]) {
        const temp = domain.targetPosition;
        domain.targetPosition = domain.sourcePosition;
        domain.sourcePosition = temp;
    }
}


const $81e82a55490093f4$export$19551db75f175e3 = [
    "target",
    "rotationOrbit",
    "rotationX",
    "zoom"
];
function $81e82a55490093f4$export$cf597f89e136a2d7(height, width, view) {
    const target = [
        width / 2,
        -height / 2,
        0
    ];
    if (view === "2d") return {
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



class $61fffe029a7d3e23$export$893c88c42e3630f9 {
    /**
     * Instantiate a new Presenter.
     * @param el Parent HTMLElement to present within.
     * @param style Optional PresenterStyle styling options.
     */ constructor(el, style){
        this.el = el;
        this.style = (0, $bde658c1f00fc2a5$export$6969335ea1e4e77c)((0, $cb224439f6a2e69c$export$83ac8f5ae8122afc), style);
        (0, $dfe8065030a6ee84$export$ba5a93ad8642dce4)(this);
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
            if (this.logger) this.logger(`canceling animation ${this.queuedAnimationOptions && this.queuedAnimationOptions.handlerLabel || "handler"}`);
            if (this.queuedAnimationOptions && this.queuedAnimationOptions.animationCanceled) this.queuedAnimationOptions.animationCanceled.call(null);
        }
    }
    /**
     * Stops the current animation and queues a new animation.
     * @param handler Function to invoke when timeout is complete.
     * @param timeout Length of time to wait before invoking the handler.
     * @param options Optional QueuedAnimationOptions object.
     */ animationQueue(handler, timeout, options) {
        if (this.logger) this.logger(`queueing animation ${options && options.waitingLabel || "waiting"}...`);
        this.animationCancel();
        this.animationTimer = setTimeout(()=>{
            if (this.logger) this.logger(`queueing animation ${options && options.handlerLabel || "handler"}...`);
            handler();
        }, timeout);
    }
    /**
     * Retrieve a sub-element of the rendered output.
     * @param type PresenterElement type of the HTMLElement to retrieve.
     */ getElement(type) {
        const elements = this.el.getElementsByClassName((0, $dfe8065030a6ee84$export$2913c0c0b5623090)(type, this));
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
            assignCubeOrdinal: (config === null || config === void 0 ? void 0 : config.onSceneRectAssignCubeOrdinal) || (()=>options.maxOrdinal++),
            zAxisZindex: config === null || config === void 0 ? void 0 : config.zAxisZindex
        };
        //determine if this is a vega scene
        if (scene.marktype) {
            stage = (0, $cb224439f6a2e69c$export$afa8810fbe5c2601)(scene.view);
            (0, $3f4cbf010dab927f$export$d78988dba6734aaa)(options, stage, scene);
        } else stage = sceneOrStage;
        if (!this.deckgl) {
            const classes = (0, $f48cbb1d723098a5$export$cc8b65d27ce6adb1)({
                doubleClickHandler: ()=>{
                    this.homeCamera();
                }
            });
            this.OrbitControllerClass = classes.OrbitControllerClass;
            const initialViewState = (0, $81e82a55490093f4$export$cf597f89e136a2d7)(height, width, stage.view);
            let glOptions;
            if (config && config.preserveDrawingBuffer) glOptions = {
                preserveDrawingBuffer: true
            };
            const deckProps = {
                glOptions: glOptions,
                height: null,
                width: null,
                effects: (0, $04b116f6958d3235$export$ecab656a5b486b67)(),
                layers: [],
                onClick: config && config.onLayerClick,
                views: [
                    new (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.OrbitView({
                        controller: (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.OrbitController
                    })
                ],
                initialViewState: initialViewState,
                container: this.getElement((0, $483619dbeb86ab73$export$79420be32f83a5b0).gl),
                getCursor: (interactiveState)=>{
                    if (interactiveState.onText || interactiveState.onAxisSelection) return "pointer";
                    else if (interactiveState.onCube) return "default";
                    else return "grab";
                }
            };
            if (stage.backgroundColor) deckProps.style = {
                "background-color": (0, $88689deb35cd627d$export$f86d83653e5a505e)(stage.backgroundColor)
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
            stage.cubeData = (0, $753504a3f96134c4$export$9a79ca9001afcc6d)(cubeCount, empty, stage.cubeData);
        }
        this.setDeckProps(stage, height, width, cubeCount, config);
        const a = (0, $5feb58fe75c7f837$export$5ec2c407fb44f02)();
        (0, $5feb58fe75c7f837$export$186d02efde07ef98)((0, $b89e73cbcb837965$export$b0b33bcc0f604685)({
            legend: stage.legend,
            onClick: config && config.onLegendClick
        }), this.getElement((0, $483619dbeb86ab73$export$79420be32f83a5b0).legend));
        (0, $5feb58fe75c7f837$export$7d007ff58288f238)(a);
        if (config && config.onPresent) config.onPresent();
    }
    /**
     * Present the same recently rendered Stage with only slight modifications such as a color change,
     * using the previous Stage values as a basis.
     * @param stage Partially populated Stage object containing changes.
     * @param modifyConfig Optional presentation configuration object.
     */ rePresent(stage, modifyConfig) {
        const newStage = Object.assign(Object.assign({}, this._last.stage), stage);
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
        const config = (0, $bde658c1f00fc2a5$export$6969335ea1e4e77c)((0, $cb224439f6a2e69c$export$200f593236aebbdc), modifyConfig);
        const newBounds = this.isNewBounds(stage.view, height, width, cubeCount);
        //let lightSettings = this.style.lightSettings[stage.view];
        let lightingMix = stage.view === "3d" ? 1.0 : 0.0;
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
            if (!viewState || newViewStateTarget) viewState = (0, $81e82a55490093f4$export$cf597f89e136a2d7)(height, width, stage.view);
            const oldCubeLayer = (0, $2ce9d49664bfe8f3$export$ccecd364047ec381)(this.deckgl.props);
            if (oldCubeLayer) {
                linearInterpolator = new (0, $2923565ec0b3fb84$export$19db461e577de3cc)((0, $81e82a55490093f4$export$19551db75f175e3));
                linearInterpolator.layerStartProps = {
                    lightingMix: oldCubeLayer.props.lightingMix
                };
                linearInterpolator.layerEndProps = {
                    lightingMix: lightingMix
                };
                viewState.transitionDuration = config.transitionDurations.view;
                viewState.transitionEasing = (0, $bb1bb47ebb99b990$export$24c5ac7c37452e7d);
                viewState.transitionInterpolator = linearInterpolator;
            }
            stage.view;
        }
        const guideLines = this._showGuides && (0, $5d56ff003a42dc40$export$827f4ee28efc37)(0, 0, height, width, "#0f0", 1, true);
        config.preLayer && config.preLayer(stage);
        const layers = (0, $2ce9d49664bfe8f3$export$61f6a9c831786408)(this, config, stage, /*lightSettings*/ null, lightingMix, linearInterpolator, guideLines);
        const deckProps = {
            effects: (0, $04b116f6958d3235$export$ecab656a5b486b67)(),
            views: [
                new (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.OrbitView({
                    controller: (0, $975e8617bd73ab77$export$e2253033e6e1df16).deck.OrbitController
                })
            ],
            initialViewState: viewState,
            layers: layers
        };
        if (config && config.preStage) config.preStage(stage, deckProps);
        requestAnimationFrame(()=>this.deckgl.setProps(Object.assign(Object.assign({}, deckProps), {
                onAfterRender: ()=>{
                    if (this._afterRenderHandler) this._afterRenderHandler();
                }
            })));
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
                const png = this.deckgl.canvas.toDataURL("image/png");
                resolve(png);
            };
        });
    }
    /**
     * Home the camera to the last initial position.
     */ homeCamera() {
        const viewState = (0, $81e82a55490093f4$export$cf597f89e136a2d7)(this._last.height, this._last.width, this._last.view);
        viewState.transitionDuration = (0, $cb224439f6a2e69c$export$200f593236aebbdc).transitionDurations.view;
        viewState.transitionEasing = (0, $bb1bb47ebb99b990$export$24c5ac7c37452e7d);
        viewState.transitionInterpolator = new (0, $2923565ec0b3fb84$export$19db461e577de3cc)((0, $81e82a55490093f4$export$19551db75f175e3));
        const deckProps = {
            effects: (0, $04b116f6958d3235$export$ecab656a5b486b67)(),
            views: this.deckgl.props.views,
            initialViewState: viewState,
            layers: this.deckgl.props.layers
        };
        this.deckgl.setProps(deckProps);
    }
    /**
     * Get cube data array from the cubes layer.
     */ getCubeData() {
        return (0, $2ce9d49664bfe8f3$export$fa1ee03f26227b34)(this.deckgl.props);
    }
    /**
     * Show guidelines of rendering height/width and center of OrbitView.
     */ showGuides() {
        this._showGuides = true;
        this.getElement((0, $483619dbeb86ab73$export$79420be32f83a5b0).gl).classList.add("show-center");
        this.rePresent(Object.assign(Object.assign({}, this._last.stage), {
            cubeData: this.getCubeData()
        }));
    }
    finalize() {
        this.animationCancel();
        if (this.deckgl) this.deckgl.finalize();
        if (this.el) this.el.innerHTML = "";
        this._last = null;
        this.deckgl = null;
        this.el = null;
        this.logger = null;
        this.queuedAnimationOptions = null;
    }
}







//pass in the SuperClass, which should be a vega.View
function $533abf23d125fe4b$var$_RendererGl(loader) {
    //dynamic superclass, since we don't know have vega.View in the declaration phase
    class RendererGlInternal extends (0, $975e8617bd73ab77$export$e2253033e6e1df16).vega.Renderer {
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
const $533abf23d125fe4b$export$ca9a02b0553384e7 = $533abf23d125fe4b$var$_RendererGl;


let $ba8a128a941ed656$var$registered = false;
//dynamic superclass lets us create a subclass at execution phase instead of declaration phase.
//This allows us to retrieve vega.View from either UMD or ES6 consumers of this class.
//pass in the SuperClass, which should be a vega.View
function $ba8a128a941ed656$var$_ViewGl(runtime1, config1) {
    //dynamic superclass, since we don't know have vega.View in the declaration phase
    class ViewGlInternal extends (0, $975e8617bd73ab77$export$e2253033e6e1df16).vega.View {
        constructor(runtime, config = {}){
            super(runtime, config);
            this.config = config;
            this.presenter = config.presenter;
            config.presenterConfig = config.presenterConfig || {};
            config.presenterConfig.redraw = ()=>{
                this._redraw = true; //use Vega View private member _redraw
                this.run();
            };
        }
        renderer(...args) {
            if (args && args.length) {
                const renderer = args[0];
                if (renderer === "deck.gl" && !$ba8a128a941ed656$var$registered) {
                    (0, $975e8617bd73ab77$export$e2253033e6e1df16).vega.renderModule("deck.gl", {
                        handler: (0, $975e8617bd73ab77$export$e2253033e6e1df16).vega.CanvasHandler,
                        renderer: (0, $533abf23d125fe4b$export$ca9a02b0553384e7)
                    });
                    $ba8a128a941ed656$var$registered = true;
                }
                return super.renderer(renderer);
            } else return super.renderer();
        }
        initialize(el) {
            if (!this.presenter) this.presenter = new (0, $61fffe029a7d3e23$export$893c88c42e3630f9)(el);
            super.initialize(this.presenter.getElement((0, $483619dbeb86ab73$export$79420be32f83a5b0).vegaControls));
            const renderer = this._renderer;
            renderer.presenterConfig = this.config.presenterConfig;
            renderer.presenter = this.presenter;
            renderer.getView = this.config && this.config.getView || (()=>this.presenter.view || (0, $cb224439f6a2e69c$export$93acc5219d6538bb));
            return this;
        }
        error(e) {
            if (this.presenter.logger) this.presenter.logger(e);
        }
    }
    const instance = new ViewGlInternal(runtime1, config1);
    return instance;
}
const $ba8a128a941ed656$export$6d8f9057dcd7f9e6 = $ba8a128a941ed656$var$_ViewGl;



$parcel$exportWildcard($f80f7eb4951011b9$exports, $483619dbeb86ab73$exports);


const { defaultPresenterConfig: $74c2763994d75bb8$var$defaultPresenterConfig , defaultPresenterStyle: $74c2763994d75bb8$var$defaultPresenterStyle  } = $cb224439f6a2e69c$exports;
const { desaturate: $74c2763994d75bb8$var$desaturate  } = $fc1d5f246c786135$exports;
const $74c2763994d75bb8$export$fb736e4909afb3d7 = {
    colors: {
        activeCube: "purple",
        defaultCube: $fc1d5f246c786135$exports.colorToString($74c2763994d75bb8$var$defaultPresenterStyle.defaultCubeColor),
        hoveredCube: $fc1d5f246c786135$exports.colorToString($74c2763994d75bb8$var$defaultPresenterStyle.highlightColor),
        selectedCube: "yellow",
        axisSelectHighlight: $fc1d5f246c786135$exports.colorToString([
            128,
            128,
            128,
            128
        ]),
        axisLine: "#000",
        axisText: "#000",
        unselectedColorMethod: (color)=>{
            const c = $74c2763994d75bb8$var$desaturate(color, 0.05);
            c[3] = 171;
            return c;
        }
    },
    language: {
        headers: {
            chart: "Chart",
            details: "Details",
            legend: "Legend",
            selection: "Select & Filter"
        },
        bing: "bing",
        newColorMap: "remap color to filtered items",
        oldColorMap: "keep same colors",
        deselect: "deselect",
        exclude: "exclude",
        isolate: "isolate",
        legendOther: "other",
        nextDetail: ">",
        previousDetail: "<",
        reset: "reset",
        colorBinCount: "Color bin count",
        colorReverse: "Color reverse",
        count: "Count",
        percent: "Percent",
        sum: "Sum",
        scatterPointScale: "Point scale",
        FacetMaxBins: "Facet max bins",
        FacetVMaxBins: "Cross facet max bins",
        XMaxBins: "X axis max bins",
        YMaxBins: "Y axis max bins",
        XGridSize: "X grid size",
        YGridSize: "Y grid size",
        InnerPaddingSize: "Inner padding size",
        OuterPaddingSize: "Outer padding size",
        treeMapMethod: "Treemap layout",
        facetColumns: "Facet columns",
        facetRows: "Facet rows",
        markOpacitySignal: "Mark opacity",
        textScaleSignal: "Text scale",
        xAxisTextAngleSignal: "X axis text angle",
        yAxisTextAngleSignal: "Y axis text angle",
        zGrounded: "Z grounded",
        zScaleProportion: "Z scale proportion to Y",
        selectionCount: (count)=>`${count} items selected`
    },
    maxLegends: 19,
    onError: (errors)=>{
    //console.log(`UnitVisViewer errors: ${errors.join('\n')}`);
    },
    transitionDurations: Object.assign(Object.assign({}, $74c2763994d75bb8$var$defaultPresenterConfig.transitionDurations), {
        scope: 600
    }),
    selectionPolygonZ: -1,
    tickSize: 10
};
function $74c2763994d75bb8$export$c4db461e5e345a8(options) {
    var style = {
        cssPrefix: $74c2763994d75bb8$export$f0d47e1c119d5bf2,
        fontFamily: options.fontFamily,
        defaultCubeColor: $fc1d5f246c786135$exports.colorFromString(options.colors.defaultCube)
    };
    if (options.colors.hoveredCube) style.highlightColor = $fc1d5f246c786135$exports.colorFromString(options.colors.hoveredCube);
    //if (options.lightSettings) {
    // style.lightSettings = options.lightSettings;
    //}
    return style;
}
const $74c2763994d75bb8$export$f0d47e1c119d5bf2 = "sanddance-";
const $74c2763994d75bb8$export$1641cdccd8d44edd = {
    black: "#212121",
    gray: "#D2D2D2",
    blue: "#0060F0",
    green: "#00C000",
    orange: "#FF9900",
    red: "#E00000"
};


function $944bef2715b44399$export$81adea670bebefbe(columnName, includeVegaDeckGLFields = false) {
    if (includeVegaDeckGLFields) {
        if (columnName === (0, $4d0539c68a8de77f$export$5672246984822a29)) return true;
    }
    for(let f in 0, $ec270fbe8d9983b4$export$10df5429b7082be2){
        if (columnName === (0, $ec270fbe8d9983b4$export$10df5429b7082be2)[f]) return true;
    }
    return false;
}





const $c9f2c41a3f8ee485$var$dualPairs = [
    [
        (0, $74c2763994d75bb8$export$1641cdccd8d44edd).black,
        (0, $74c2763994d75bb8$export$1641cdccd8d44edd).gray
    ],
    [
        (0, $74c2763994d75bb8$export$1641cdccd8d44edd).red,
        (0, $74c2763994d75bb8$export$1641cdccd8d44edd).green
    ],
    [
        (0, $74c2763994d75bb8$export$1641cdccd8d44edd).red,
        (0, $74c2763994d75bb8$export$1641cdccd8d44edd).blue
    ],
    [
        (0, $74c2763994d75bb8$export$1641cdccd8d44edd).black,
        (0, $74c2763994d75bb8$export$1641cdccd8d44edd).red
    ],
    [
        (0, $74c2763994d75bb8$export$1641cdccd8d44edd).black,
        (0, $74c2763994d75bb8$export$1641cdccd8d44edd).orange
    ],
    [
        (0, $74c2763994d75bb8$export$1641cdccd8d44edd).black,
        (0, $74c2763994d75bb8$export$1641cdccd8d44edd).green
    ]
];
const $c9f2c41a3f8ee485$export$2ad73d393c16f81c = [
    {
        scheme: (0, $ec270fbe8d9983b4$export$c991c3dd58d9959c),
        colors: [
            (0, $74c2763994d75bb8$export$fb736e4909afb3d7).colors.defaultCube
        ]
    }
];
$c9f2c41a3f8ee485$var$createDualColorSchemes();
function $c9f2c41a3f8ee485$export$3030070885af9365(vega) {
    $c9f2c41a3f8ee485$export$2ad73d393c16f81c.forEach((cs)=>{
        if (cs.colors.length === 1) vega.scheme(cs.scheme, (x)=>cs.colors[0]);
        else vega.scheme(cs.scheme, cs.colors);
    });
}
function $c9f2c41a3f8ee485$var$createPair(names, colors) {
    const scheme = `dual_${names[0]}${names[1]}`;
    $c9f2c41a3f8ee485$export$2ad73d393c16f81c.push({
        scheme: scheme,
        colors: colors
    });
}
function $c9f2c41a3f8ee485$var$createDualColorSchemes() {
    $c9f2c41a3f8ee485$var$dualPairs.forEach((colors)=>{
        const names = colors.map((color)=>{
            for(let key in 0, $74c2763994d75bb8$export$1641cdccd8d44edd)if (color === (0, $74c2763994d75bb8$export$1641cdccd8d44edd)[key]) return key;
        });
        $c9f2c41a3f8ee485$var$createPair(names, colors);
        $c9f2c41a3f8ee485$var$createPair([
            ...names
        ].reverse(), [
            ...colors
        ].reverse());
    });
}



var $0000a41cc7b5918f$exports = {};

$parcel$export($0000a41cc7b5918f$exports, "Viewer", () => $0000a41cc7b5918f$export$2ec4afd9b3c16a85, (v) => $0000a41cc7b5918f$export$2ec4afd9b3c16a85 = v);
var $57be1fa2f8a8b996$export$d9e571576e98a7ab;
(function(DataLayoutChange1) {
    DataLayoutChange1[DataLayoutChange1["same"] = 0] = "same";
    DataLayoutChange1[DataLayoutChange1["reset"] = 1] = "reset";
    DataLayoutChange1[DataLayoutChange1["refine"] = 2] = "refine";
})($57be1fa2f8a8b996$export$d9e571576e98a7ab || ($57be1fa2f8a8b996$export$d9e571576e98a7ab = {}));
class $57be1fa2f8a8b996$export$c774d8c9d4e9e234 {
    constructor(dataScope, props){
        this.dataScope = dataScope;
        this.props = props;
    }
    select(search) {
        return new Promise((resolve, reject)=>{
            this.dataScope.select(search);
            this.props.onDataChanged($57be1fa2f8a8b996$export$d9e571576e98a7ab.same);
            resolve();
        });
    }
    deselect() {
        return new Promise((resolve, reject)=>{
            this.dataScope.deselect();
            this.props.onDataChanged($57be1fa2f8a8b996$export$d9e571576e98a7ab.same);
            resolve();
        });
    }
    filter(search, keepData, collapseData, rebase) {
        if (rebase) this.dataScope.collapse(false, keepData);
        this.dataScope.collapse(true, collapseData);
        return new Promise((resolve, reject)=>{
            this.props.onAnimateDataChange($57be1fa2f8a8b996$export$d9e571576e98a7ab.refine, "before refine", "refine").then(()=>{
                this.dataScope.deselect();
                this.dataScope.setFilteredData(keepData);
                this.props.onDataChanged($57be1fa2f8a8b996$export$d9e571576e98a7ab.refine, search);
                resolve();
            }).catch(reject);
        });
    }
    reset() {
        return new Promise((resolve, reject)=>{
            this.dataScope.deselect();
            this.dataScope.setFilteredData(null);
            this.props.onAnimateDataChange($57be1fa2f8a8b996$export$d9e571576e98a7ab.reset, "before reset", "reset").then(()=>{
                this.dataScope.collapse(false);
                this.props.onDataChanged($57be1fa2f8a8b996$export$d9e571576e98a7ab.reset);
                resolve();
            }).catch(reject);
        });
    }
    activate(datum) {
        return new Promise((resolve, reject)=>{
            this.dataScope.activate(datum);
            this.props.onDataChanged($57be1fa2f8a8b996$export$d9e571576e98a7ab.same);
            resolve();
        });
    }
    deactivate() {
        return new Promise((resolve, reject)=>{
            this.dataScope.deactivate();
            this.props.onDataChanged($57be1fa2f8a8b996$export$d9e571576e98a7ab.same);
            resolve();
        });
    }
}



function $0c9263d924197a37$var$cloneAxis(axes, axisColor, axisTextColor) {
    return axes.map((axis)=>{
        const newAxis = $fc1d5f246c786135$exports.deepMerge(axis);
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
function $0c9263d924197a37$var$cloneTextData(textData, color) {
    return textData.map((t)=>{
        return Object.assign(Object.assign({}, t), {
            color: color
        });
    });
}
function $0c9263d924197a37$export$bb42b694d535c95a(stage, oldColors, newColors) {
    const hasNewLineColor = newColors.axisLine && newColors.axisLine !== oldColors.axisLine;
    const hasNewTextColor = newColors.axisText && newColors.axisText !== oldColors.axisText;
    let axes;
    let textData;
    if (hasNewLineColor || hasNewTextColor) {
        const lineColor = $fc1d5f246c786135$exports.colorFromString(newColors.axisLine || oldColors.axisLine);
        const textColor = $fc1d5f246c786135$exports.colorFromString(newColors.axisText || oldColors.axisText);
        axes = {
            x: $0c9263d924197a37$var$cloneAxis(stage.axes.x, lineColor, textColor),
            y: $0c9263d924197a37$var$cloneAxis(stage.axes.y, lineColor, textColor),
            z: $0c9263d924197a37$var$cloneAxis(stage.axes.z, lineColor, textColor)
        };
    }
    if (hasNewTextColor) textData = $0c9263d924197a37$var$cloneTextData(stage.textData, $fc1d5f246c786135$exports.colorFromString(newColors.axisText));
    return {
        axes: axes,
        textData: textData
    };
}


function $674c26d108d883bb$export$cb7265fd11709ea(niceValue) {
    //convert "nice" numbers to numeric value
    return (niceValue + "").replace(/[\s,]/g, "");
}
function $674c26d108d883bb$var$tickValue(axis, i) {
    const tick = axis.tickText[i];
    let value;
    if (tick) value = axis.tickText[i].value;
    return {
        tick: tick,
        value: value
    };
}
function $674c26d108d883bb$export$1be0843eea5393e4(column) {
    const searchExpression = {
        name: column.name,
        operator: "isnullorEmpty"
    };
    return searchExpression;
}
function $674c26d108d883bb$export$8543b98d22318eca(column, value) {
    if (value == null) return $674c26d108d883bb$export$1be0843eea5393e4(column);
    const searchExpression = {
        name: column.name,
        operator: "==",
        value: value
    };
    return searchExpression;
}
function $674c26d108d883bb$export$e531b549585c011c(column, values) {
    const expressions = values.map((value, i)=>{
        const searchExpression = {
            name: column.name,
            operator: "!=",
            value: value
        };
        if (i) searchExpression.clause = "&&";
        return searchExpression;
    });
    const searchExpressionGroup = {
        expressions: expressions
    };
    return searchExpressionGroup;
}
function $674c26d108d883bb$export$64b81e116b959f8a(axis, column, i) {
    const result = $674c26d108d883bb$var$tickValue(axis, i);
    if (result.tick) return $674c26d108d883bb$export$8543b98d22318eca(column, result.value);
}
function $674c26d108d883bb$export$8bb38a473c12645e(column, lowValue, highValue, lowOperator = ">=", highOperator = "<") {
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
    if (expressions.length > 1) expressions[1].clause = "&&";
    const searchExpressionGroup = {
        expressions: expressions
    };
    return searchExpressionGroup;
}
function $674c26d108d883bb$export$80908cccce4a97cb(axis, column, i) {
    const low = $674c26d108d883bb$var$tickValue(axis, i);
    const high = $674c26d108d883bb$var$tickValue(axis, i + 1);
    return $674c26d108d883bb$export$8bb38a473c12645e(column, low.value, high.value);
}




const { allTruthy: $6c7749fd93c51064$export$84af6d08e329f176 , concat: $6c7749fd93c51064$export$ee1b3e54f0441b22 , push: $6c7749fd93c51064$export$4cbf152802aa238  } = (0, $fc1d5f246c786135$exports);


function $2041f36649939dda$export$cb06c97de370398d(search) {
    let group;
    const vegaSearch = search;
    if (Array.isArray(vegaSearch)) {
        //flatten into one group
        group = {
            expressions: []
        };
        vegaSearch.forEach((g)=>{
            const clonedExpressions = $fc1d5f246c786135$exports.clone(g.expressions).filter(Boolean);
            clonedExpressions[0].clause = "&&";
            (0, $6c7749fd93c51064$export$4cbf152802aa238)(group.expressions, clonedExpressions);
        });
    } else group = vegaSearch ? {
        expressions: vegaSearch.expressions.filter(Boolean)
    } : null;
    return group;
}




function $04c641c9701e126c$export$7aba45edad9b8473(presenter, specCapabilities, columns, stage, clickHandler, highlightColor, polygonZ) {
    const polygons = [];
    const xRole = specCapabilities.roles.filter((r)=>r.role === "x")[0];
    if (xRole && xRole.axisSelection) stage.axes.x.filter((axis)=>axis.tickText.length).forEach((axis)=>{
        polygons.push.apply(polygons, $04c641c9701e126c$var$axisSelectionPolygons(axis, false, xRole.axisSelection, columns.x));
    });
    const yRole = specCapabilities.roles.filter((r)=>r.role === "y")[0];
    if (yRole && yRole.axisSelection) stage.axes.y.filter((axis)=>axis.tickText.length).forEach((axis)=>{
        polygons.push.apply(polygons, $04c641c9701e126c$var$axisSelectionPolygons(axis, true, yRole.axisSelection, columns.y));
    });
    if (stage.facets && columns.facet) polygons.push.apply(polygons, $04c641c9701e126c$var$facetSelectionPolygons(stage.facets));
    //move polygons to Z
    polygons.forEach((datum)=>{
        datum.polygon.forEach((p)=>{
            p[2] = polygonZ;
        });
    });
    const onClick = (o, e)=>clickHandler(e.srcEvent, o.object.search);
    const polygonLayer = new $975e8617bd73ab77$export$e2253033e6e1df16.layers.PolygonLayer({
        autoHighlight: true,
        coordinateSystem: $975e8617bd73ab77$export$e2253033e6e1df16.deck.COORDINATE_SYSTEM.CARTESIAN,
        data: polygons,
        extruded: false,
        highlightColor: $fc1d5f246c786135$exports.colorFromString(highlightColor),
        id: "selections",
        onHover: (o, e)=>{
            if (o.index === -1) presenter.deckgl.interactiveState.onAxisSelection = false;
            else presenter.deckgl.interactiveState.onAxisSelection = true;
        },
        onClick: onClick,
        getElevation: ()=>0,
        getFillColor: ()=>[
                0,
                0,
                0,
                0
            ],
        pickable: true,
        stroked: false
    });
    return polygonLayer;
}
function $04c641c9701e126c$var$axisSelectionPolygons(axis, vertical, axisSelectionType, column) {
    const polygons = [];
    const size = 50;
    const getSearch = axisSelectionType === "exact" ? (a, c, i)=>({
            expressions: [
                (0, $674c26d108d883bb$export$64b81e116b959f8a)(a, c, i)
            ]
        }) : (0, $674c26d108d883bb$export$80908cccce4a97cb);
    const { domain: domain , ticks: ticks  } = axis;
    if (ticks.length > 0 && domain) {
        const dim = vertical ? 1 : 0;
        const between = Math.abs(ticks[0].sourcePosition[dim] - domain.sourcePosition[dim]) > 1;
        let divisions;
        if (between) {
            divisions = [];
            for(let i = 1; i < ticks.length; i++)divisions.push((ticks[i].sourcePosition[dim] + ticks[i - 1].sourcePosition[dim]) / 2);
        } else divisions = ticks.slice(1, -1).map((tick)=>tick.sourcePosition[dim]);
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
                polygon: vertical ? coords.map((xy)=>xy.reverse()) : coords
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
function $04c641c9701e126c$var$facetSelectionPolygons(facetRects) {
    const polygons = [];
    const linesAndSearches = facetRects.map(({ datum: datum , lines: lines  }, i)=>{
        let group = (0, $2041f36649939dda$export$cb06c97de370398d)(datum[(0, $ec270fbe8d9983b4$export$10df5429b7082be2).FacetSearch]);
        return {
            lines: lines,
            search: group
        };
    });
    linesAndSearches.forEach(({ lines: lines , search: search  }, i)=>{
        //take any 2 lines to get a box dimension
        const [x, y] = $04c641c9701e126c$var$minMaxPoints(lines.slice(2));
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
function $04c641c9701e126c$var$minMaxPoints(lines) {
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





function $0fd54a544f9d2363$export$9cf45ec8b4cc2b65(currentData, showSelectedData, showActive, viewerOptions) {
    function getSelectionColorItem(datum) {
        let item;
        if (showSelectedData) item = datum[(0, $ec270fbe8d9983b4$export$10df5429b7082be2).Selected] ? {
            color: $fc1d5f246c786135$exports.colorFromString(viewerOptions.colors.selectedCube)
        } : {
            unSelected: true
        };
        if (showActive && datum[(0, $ec270fbe8d9983b4$export$10df5429b7082be2).Active]) item = {
            color: $fc1d5f246c786135$exports.colorFromString(viewerOptions.colors.activeCube)
        };
        return item;
    }
    const colorMap = {};
    currentData.forEach((datum)=>{
        const selectionColor = getSelectionColorItem(datum);
        if (selectionColor) {
            const ordinal = datum[0, $4d0539c68a8de77f$export$5672246984822a29];
            colorMap[ordinal] = selectionColor;
        }
    });
    return colorMap;
}
function $0fd54a544f9d2363$export$3b9379ac3646e0f0(cubes) {
    const map = {};
    cubes.forEach((cube)=>{
        map[cube.ordinal] = {
            color: cube.color
        };
    });
    return map;
}
function $0fd54a544f9d2363$export$44addeff9a96c1e7(colorContext, presenter) {
    if (!colorContext.colorMap) {
        const cubes = presenter.getCubeData();
        colorContext.colorMap = $0fd54a544f9d2363$export$3b9379ac3646e0f0(cubes);
    }
    colorContext.legend = $fc1d5f246c786135$exports.clone(presenter.stage.legend);
    colorContext.legendElement = presenter.getElement($483619dbeb86ab73$export$79420be32f83a5b0.legend).children[0];
}
function $0fd54a544f9d2363$export$fa70acaad0e00464(maps, cubes, unselectedColorMethod) {
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








class $bb7ed1a84d2d22a1$export$3fb74a6ae4f1171d {
    constructor(){
        this.filteredColumnsStats = {};
    }
    setData(data, columns) {
        const differentData = this.data !== data;
        if (differentData) {
            if (this.data) //clean up things we added to old data
            this.deselect();
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
        if (!this.columns) this.columns = (0, $ae86bb470afa6626$export$3f19ad07848df794)($975e8617bd73ab77$export$e2253033e6e1df16.vega.inferTypes, this.data, columnTypes);
        return this.columns;
    }
    getFilteredColumnStats(columnName) {
        if (!this.filteredColumnsStats[columnName]) this.filteredColumnsStats[columnName] = (0, $ae86bb470afa6626$export$432f698644f45d1)(this.filteredData, this.columns.filter((c)=>c.name === columnName)[0]);
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
        const exec = new (0, $43c2526e199cbbfb$export$bbfd672d43392844)(search, this.getColumns());
        const s = {
            search: search,
            included: [],
            excluded: []
        };
        const data = rebase ? this.data : this.currentData();
        data.forEach((datum)=>{
            if (exec.run(datum)) {
                if (assign) datum[(0, $ec270fbe8d9983b4$export$10df5429b7082be2).Selected] = true;
                s.included.push(datum);
            } else s.excluded.push(datum);
        });
        return s;
    }
    deselect() {
        this.deactivate();
        this.data.forEach((datum)=>{
            delete datum[(0, $ec270fbe8d9983b4$export$10df5429b7082be2).Selected];
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
            datum[(0, $ec270fbe8d9983b4$export$10df5429b7082be2).Collapsed] = collapsed;
        });
        this.isCollapsed = collapsed;
    }
    activate(datum) {
        this.deactivate();
        datum[(0, $ec270fbe8d9983b4$export$10df5429b7082be2).Active] = true;
        this.active = datum;
    }
    deactivate() {
        if (this.active) delete this.active[(0, $ec270fbe8d9983b4$export$10df5429b7082be2).Active];
        this.active = null;
    }
    ordinalIndexWithinSelection(ordinal) {
        if (this.selection) for(let i = 0; i < this.selection.included.length; i++){
            let datum = this.selection.included[i];
            if (datum[0, $4d0539c68a8de77f$export$5672246984822a29] === ordinal) return {
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









var $1e584946c82e7f09$var$Action;
(function(Action1) {
    Action1[Action1["deselect"] = 0] = "deselect";
    Action1[Action1["isolate"] = 1] = "isolate";
    Action1[Action1["exclude"] = 2] = "exclude";
    Action1[Action1["reset"] = 3] = "reset";
    Action1[Action1["next"] = 4] = "next";
    Action1[Action1["previous"] = 5] = "previous";
})($1e584946c82e7f09$var$Action || ($1e584946c82e7f09$var$Action = {}));
class $1e584946c82e7f09$export$3e8048d3cf2ba3fd {
    constructor(parentElement, language, animator, dataScope, colorMapHandler, hasColorMaps){
        this.language = language;
        this.animator = animator;
        this.dataScope = dataScope;
        this.colorMapHandler = colorMapHandler;
        this.hasColorMaps = hasColorMaps;
        this.element = (0, $fc1d5f246c786135$exports).addDiv(parentElement, `${(0, $74c2763994d75bb8$export$f0d47e1c119d5bf2)}unitControls`);
        this.clear();
    }
    finalize() {
        if (this.element) this.element.innerHTML = "";
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
            operator: "==",
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
            case $1e584946c82e7f09$var$Action.deselect:
                this.clearSelection();
                p = this.animator.deselect();
                break;
            case $1e584946c82e7f09$var$Action.exclude:
                this.clearSelection();
                p = this.animator.filter((0, $29d69ef6542a87a4$export$6897c284b6f9f4dc)(u.search), u.excluded, u.included, false);
                this.state.remapColor = false;
                break;
            case $1e584946c82e7f09$var$Action.isolate:
                this.clearSelection();
                p = this.animator.filter(u.search, u.included, u.excluded, false);
                this.state.remapColor = false;
                break;
            case $1e584946c82e7f09$var$Action.reset:
                this.clear();
                p = this.animator.reset();
                break;
            default:
                switch(action){
                    case $1e584946c82e7f09$var$Action.previous:
                        this.state.index--;
                        if (this.state.index < 0) this.state.index = this.state.userSelection.included.length - 1;
                        break;
                    case $1e584946c82e7f09$var$Action.next:
                        this.state.index++;
                        if (this.state.index >= this.state.userSelection.included.length) this.state.index = 0;
                        break;
                }
                this.render();
                p = this.animator.activate(this.state.userSelection.included[this.state.index]);
        }
        p.then(()=>this.render());
    }
    render() {
        const hasRefinedData = this.dataScope.hasFilteredData();
        const renderProps = {
            language: this.language,
            actionHandler: (action)=>this.handleAction(action),
            selectionHandler: (columnName, value)=>this.selectByNameValue(columnName, value),
            count: this.state.userSelection && this.state.userSelection.included.length,
            hasRefinedData: hasRefinedData,
            item: this.state.userSelection && this.state.userSelection.included[this.state.index],
            remapColorHandler: (remap)=>this.remapChanged(remap),
            hasColorMaps: this.hasColorMaps() && hasRefinedData,
            remapColor: this.state.remapColor
        };
        const a = $fc1d5f246c786135$exports.getActiveElementInfo();
        $fc1d5f246c786135$exports.mount($1e584946c82e7f09$var$renderDetails(renderProps), this.element);
        $fc1d5f246c786135$exports.setActiveElement(a);
    }
}
const $1e584946c82e7f09$var$renderDetails = (props)=>{
    const controlButtons = [
        $fc1d5f246c786135$exports.createElement("button", {
            disabled: !props.item,
            onClick: (e)=>props.actionHandler($1e584946c82e7f09$var$Action.deselect)
        }, props.language.deselect),
        $fc1d5f246c786135$exports.createElement("button", {
            disabled: !props.item,
            onClick: (e)=>props.actionHandler($1e584946c82e7f09$var$Action.isolate)
        }, props.language.isolate),
        $fc1d5f246c786135$exports.createElement("button", {
            disabled: !props.item,
            onClick: (e)=>props.actionHandler($1e584946c82e7f09$var$Action.exclude)
        }, props.language.exclude)
    ];
    const colorMapping = $fc1d5f246c786135$exports.createElement("div", null, $fc1d5f246c786135$exports.createElement("button", {
        disabled: props.remapColor,
        onClick: (e)=>props.remapColorHandler(true)
    }, props.language.newColorMap), $fc1d5f246c786135$exports.createElement("button", {
        disabled: !props.remapColor,
        onClick: (e)=>props.remapColorHandler(false)
    }, props.language.oldColorMap));
    const singleItem = props.count === 1;
    const scrollButtons = [
        $fc1d5f246c786135$exports.createElement("button", {
            disabled: singleItem,
            onClick: (e)=>props.actionHandler($1e584946c82e7f09$var$Action.previous)
        }, props.language.previousDetail),
        $fc1d5f246c786135$exports.createElement("button", {
            disabled: singleItem,
            onClick: (e)=>props.actionHandler($1e584946c82e7f09$var$Action.next)
        }, props.language.nextDetail),
        $fc1d5f246c786135$exports.createElement("span", null, " ", props.language.selectionCount(props.count))
    ];
    const rows = [];
    for(let prop in props.item){
        if (prop === (0, $4d0539c68a8de77f$export$5672246984822a29)) continue;
        if ((0, $944bef2715b44399$export$81adea670bebefbe)(prop)) continue;
        rows.push({
            cells: [
                {
                    content: prop
                },
                {
                    content: $1e584946c82e7f09$var$linkSelect(props.language, prop, props.item[prop], props.selectionHandler)
                }
            ]
        });
    }
    return $fc1d5f246c786135$exports.createElement("div", null, props.hasColorMaps && colorMapping, $fc1d5f246c786135$exports.createElement("h4", null, props.language.headers.selection), $fc1d5f246c786135$exports.createElement("div", {
        className: `${(0, $74c2763994d75bb8$export$f0d47e1c119d5bf2)}selection`
    }, controlButtons, $fc1d5f246c786135$exports.createElement("button", {
        disabled: !props.hasRefinedData,
        onClick: (e)=>props.actionHandler($1e584946c82e7f09$var$Action.reset)
    }, "reset")), props.item && $fc1d5f246c786135$exports.createElement("h4", null, props.language.headers.details), $fc1d5f246c786135$exports.createElement("div", null, $fc1d5f246c786135$exports.createElement("div", {
        className: `${(0, $74c2763994d75bb8$export$f0d47e1c119d5bf2)}details-scroll`
    }, props.item && scrollButtons), $fc1d5f246c786135$exports.createElement("div", {
        className: `${(0, $74c2763994d75bb8$export$f0d47e1c119d5bf2)}details`
    }, props.item && $fc1d5f246c786135$exports.createElement((0, $4abdd534baaa0892$exports).Table, {
        rows: rows
    }))));
};
function $1e584946c82e7f09$var$linkSelect(language, columnName, value, selectionHandler) {
    return $fc1d5f246c786135$exports.createElement("span", null, $fc1d5f246c786135$exports.createElement("a", {
        href: "#",
        onClick: (e)=>selectionHandler(columnName, value)
    }, value), isNaN(value) ? [
        " ",
        $fc1d5f246c786135$exports.createElement("a", {
            className: "bing-search",
            href: `https://www.bing.com/search?q=${encodeURIComponent(value)}`,
            target: "_blank"
        }, language.bing)
    ] : "");
}



function $a6c27e3c8d5dfd72$export$1d674716cc6da32f(presenter, headers) {
    const vegaControls = presenter.getElement((0, $483619dbeb86ab73$export$79420be32f83a5b0).vegaControls);
    $a6c27e3c8d5dfd72$var$conditionalHeader(!!vegaControls.querySelectorAll(".vega-bindings > *").length, vegaControls, headers.chart);
    const legend = presenter.getElement((0, $483619dbeb86ab73$export$79420be32f83a5b0).legend);
    $a6c27e3c8d5dfd72$var$conditionalHeader(!!legend.children.length, legend, headers.legend);
}
function $a6c27e3c8d5dfd72$var$conditionalHeader(condition, element, header) {
    var existing = $a6c27e3c8d5dfd72$var$existingHeader(element, header);
    if (condition && !existing) $a6c27e3c8d5dfd72$var$addHeader(element, header);
    if (!condition && existing) existing.remove();
}
function $a6c27e3c8d5dfd72$var$addHeader(element, header) {
    const h = document.createElement("h4");
    h.innerHTML = header;
    element.insertAdjacentElement("beforebegin", h);
}
function $a6c27e3c8d5dfd72$var$existingHeader(element, header) {
    const { previousElementSibling: previousElementSibling  } = element;
    if (previousElementSibling && previousElementSibling.innerHTML === header) return previousElementSibling;
}




function $d50aa7ce26a6d6ed$var$legendRange(colorBinType, column, legend, clickedIndex) {
    if (column.quantitative) return $d50aa7ce26a6d6ed$var$selectQuantitative(colorBinType, column, legend, clickedIndex);
    else return $d50aa7ce26a6d6ed$var$selectCategorical(column, legend, clickedIndex);
}
function $d50aa7ce26a6d6ed$var$selectCategorical(column, legend, clickedIndex) {
    const value = legend.rows[clickedIndex].value;
    if (value === (0, $ec270fbe8d9983b4$export$8653a30c44b6e879)) {
        const values = [];
        for(let i in legend.rows)if (+i !== clickedIndex) values.push(legend.rows[i].value);
        return (0, $674c26d108d883bb$export$e531b549585c011c)(column, values);
    } else //select equal
    return {
        expressions: [
            (0, $674c26d108d883bb$export$8543b98d22318eca)(column, legend.rows[clickedIndex].value)
        ]
    };
}
function $d50aa7ce26a6d6ed$var$selectQuantitative(colorBinType, column, legend, clickedIndex) {
    const keys = Object.keys(legend.rows).map((key)=>+key).sort((a, b)=>+a - +b);
    let lowValue;
    let lowOperator;
    let highValue;
    let highOperator;
    const rowText = legend.rows[clickedIndex].label;
    switch(colorBinType){
        case "continuous":
            lowValue = rowText;
            if (clickedIndex < keys.length - 1) highValue = legend.rows[clickedIndex + 1].value;
            break;
        default:
            {
                if (rowText.indexOf("null") > 0) {
                    const ex = {
                        expressions: [
                            (0, $674c26d108d883bb$export$1be0843eea5393e4)(column)
                        ]
                    };
                    return ex;
                }
                const dash = rowText.indexOf("\u2013"); //this is not the common dash character!
                if (dash > 0) {
                    //bug in Vega for quantize?
                    //lowOperator = '>';
                    //highOperator = '<=';
                    lowValue = rowText.substr(0, dash);
                    highValue = rowText.substr(dash + 1);
                } else {
                    if (rowText.indexOf("<") >= 0) highValue = rowText.substring(2);
                    else if (rowText.indexOf("\u2265") >= 0) lowValue = rowText.substring(2);
                }
            }
    }
    if (lowValue) lowValue = (0, $674c26d108d883bb$export$cb7265fd11709ea)(lowValue);
    if (highValue) highValue = (0, $674c26d108d883bb$export$cb7265fd11709ea)(highValue);
    if (lowValue === highValue) return {
        expressions: [
            (0, $674c26d108d883bb$export$8543b98d22318eca)(column, lowValue)
        ]
    };
    else return (0, $674c26d108d883bb$export$8bb38a473c12645e)(column, lowValue, highValue, lowOperator, highOperator);
}
function $d50aa7ce26a6d6ed$export$71ab65a966760ac3(colorBinType, colorColumn, legend, language) {
    const rowTexts = [];
    for(let i in legend.rows){
        let row = legend.rows[i];
        row.search = $d50aa7ce26a6d6ed$var$legendRange(colorBinType, colorColumn, legend, +i);
        if (row.value === (0, $ec270fbe8d9983b4$export$8653a30c44b6e879)) row.label = language.legendOther;
        else rowTexts.push(row.value);
    }
}



function $2de8589006f21d6f$export$f03cc77b21b3a2b2(columns, data, ordinalMap) {
    const uCol = columns.uid && columns.uid.name;
    if (ordinalMap) data.forEach((d, i)=>{
        const key = uCol ? d[uCol] : i;
        d[0, $4d0539c68a8de77f$export$5672246984822a29] = ordinalMap[key];
    });
    else {
        ordinalMap = {};
        data.forEach((d, i)=>{
            d[0, $4d0539c68a8de77f$export$5672246984822a29] = i;
            const uColValue = uCol ? d[uCol] : i;
            ordinalMap[uColValue] = i;
        });
    }
    return ordinalMap;
}
function $2de8589006f21d6f$export$5844459bbee68321(cube, data) {
    const len = data.length;
    for(let i = 0; i < len; i++){
        if (data[i][0, $4d0539c68a8de77f$export$5672246984822a29] === cube.ordinal) return i;
    }
}



function $7f509bc53ab5b2b2$export$385a06e733eab4de(sv, b) {
    if (!sv || !b || !b.signals || !b.signals.length) return;
    for(let key in sv){
        let value = sv[key];
        let signalB = b.signals.filter((signal)=>signal.name === key)[0];
        if (signalB && signalB.bind) signalB.value = value;
    }
}
function $7f509bc53ab5b2b2$export$764590c093441ac7(view, spec) {
    if (!view || !spec || !spec.signals || !spec.signals.length) return;
    const result = {};
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





const { outerSize: $a5823b006e1d2fb5$var$outerSize  } = $fc1d5f246c786135$exports;
const { Table: $a5823b006e1d2fb5$var$Table  } = $4abdd534baaa0892$exports;
class $a5823b006e1d2fb5$export$28c660c63b792dea {
    constructor(props){
        const renderProps = {
            cssPrefix: props.cssPrefix,
            rows: $a5823b006e1d2fb5$var$getRows(props.item, props.options)
        };
        this.element = $a5823b006e1d2fb5$var$renderTooltip(renderProps);
        if (this.element) {
            this.element.style.position = "absolute";
            this.child = this.element.firstChild;
            document.body.appendChild(this.element);
            //measure and move as necessary
            let m = $a5823b006e1d2fb5$var$outerSize(this.child);
            while(m.height > document.documentElement.clientHeight){
                let tr = this.child.querySelector("tr:last-child");
                if (tr) tr.parentElement.removeChild(tr);
                else break;
                m = $a5823b006e1d2fb5$var$outerSize(this.child);
            }
            if (props.position.clientX + m.width >= document.documentElement.clientWidth) this.child.style.right = "0";
            let moveTop = true;
            if (props.position.clientY + m.height >= document.documentElement.clientHeight) {
                if (props.position.clientY - m.height > 0) this.child.style.bottom = "0";
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
function $a5823b006e1d2fb5$var$getRows(item, options) {
    const rows = [];
    for(let columnName in item){
        if (columnName === (0, $4d0539c68a8de77f$export$5672246984822a29)) continue;
        if ((0, $944bef2715b44399$export$81adea670bebefbe)(columnName)) continue;
        if (options && options.exclude) {
            if (options.exclude(columnName)) continue;
        }
        let value = item[columnName];
        let content;
        if (options && options.displayValue) content = options.displayValue(value);
        else switch(value){
            case null:
                content = $fc1d5f246c786135$exports.createElement("i", null, "null");
                break;
            case undefined:
                content = $fc1d5f246c786135$exports.createElement("i", null, "undefined");
                break;
            default:
                content = value.toString();
        }
        rows.push({
            cells: [
                {
                    content: columnName + ":"
                },
                {
                    content: content
                }
            ]
        });
    }
    return rows;
}
const $a5823b006e1d2fb5$var$renderTooltip = (props)=>{
    return props.rows.length === 0 ? null : $fc1d5f246c786135$exports.createElement("div", {
        className: `${props.cssPrefix}tooltip`
    }, $a5823b006e1d2fb5$var$Table({
        rows: props.rows
    }));
};





class $a69b4de50b0b6b13$export$fba22c9d3f66adb {
    resetCharacterSet(forceNewCharacterSet, oldInsight, newInsight) {
        if (forceNewCharacterSet || $a69b4de50b0b6b13$var$needsNewCharacterSet(oldInsight, newInsight)) this.chars = undefined;
    }
    getCharacterSet(stage) {
        if (!this.chars) {
            const map = {};
            const addText = (text)=>{
                Array.from(text).forEach((char)=>{
                    map[char] = true;
                });
            };
            stage.textData.forEach((t)=>addText(t.text));
            const { x: x , y: y , z: z  } = stage.axes;
            [
                x,
                y,
                z
            ].forEach((axes)=>{
                axes.forEach((axis)=>{
                    if (axis.tickText) axis.tickText.forEach((t)=>addText(t.text));
                    if (axis.title) addText(axis.title.text);
                });
            });
            this.chars = Object.keys(map);
        }
        return this.chars;
    }
}
function $a69b4de50b0b6b13$var$needsNewCharacterSet(oldInsight, newInsight) {
    if (!oldInsight) return true;
    if (!newInsight) return true;
    if (oldInsight.chart !== newInsight.chart) return true;
    if (oldInsight.facetStyle !== newInsight.facetStyle) return true;
    if (oldInsight.totalStyle !== newInsight.totalStyle) return true;
    if (oldInsight.hideAxes !== newInsight.hideAxes) return true;
    if (oldInsight.view !== newInsight.view) return true;
    if ($a69b4de50b0b6b13$var$differentObjectValues(oldInsight.signalValues, newInsight.signalValues)) return true;
    if ($a69b4de50b0b6b13$var$differentObjectValues(oldInsight.size, newInsight.size)) return true;
    const oldColumns = oldInsight.columns;
    const newColumns = newInsight.columns;
    if (oldColumns.facet !== newColumns.facet) return true;
    if (oldColumns.facetV !== newColumns.facetV) return true;
    if (oldColumns.x !== newColumns.x) return true;
    if (oldColumns.y !== newColumns.y) return true;
    if (oldColumns.z !== newColumns.z) return true;
    return false;
}
function $a69b4de50b0b6b13$var$differentObjectValues(a, b) {
    if (!a && !b) return false;
    if (!a || !b) return true;
    const keys = Object.keys(b);
    for(let i = 0; i < keys.length; i++){
        let key = keys[i];
        let ta = typeof a;
        let tb = typeof b;
        if (ta !== tb) return true;
        if (ta === "object") return $a69b4de50b0b6b13$var$differentObjectValues(a[key], b[key]);
        else {
            if (a[key] !== b[key]) return true;
        }
    }
    return false;
}


var $0000a41cc7b5918f$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
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
const { defaultView: $0000a41cc7b5918f$var$defaultView  } = $cb224439f6a2e69c$exports;
const $0000a41cc7b5918f$var$zAxisZindex = 1010;
let $0000a41cc7b5918f$var$didRegisterColorSchemes = false;
class $0000a41cc7b5918f$export$2ec4afd9b3c16a85 {
    /**
     * Instantiate a new Viewer.
     * @param element Parent HTMLElement to present within.
     * @param options Optional viewer options object.
     */ constructor(element, options){
        this.element = element;
        this.options = $fc1d5f246c786135$exports.deepMerge((0, $74c2763994d75bb8$export$fb736e4909afb3d7), options);
        this.presenter = new $61fffe029a7d3e23$export$893c88c42e3630f9(element, (0, $74c2763994d75bb8$export$c4db461e5e345a8)(this.options));
        this._characterSet = new (0, $a69b4de50b0b6b13$export$fba22c9d3f66adb)();
        this._dataScope = new (0, $bb7ed1a84d2d22a1$export$3fb74a6ae4f1171d)();
        this._animator = new (0, $57be1fa2f8a8b996$export$c774d8c9d4e9e234)(this._dataScope, {
            onDataChanged: this.onDataChanged.bind(this),
            onAnimateDataChange: this.onAnimateDataChange.bind(this)
        });
        this._details = new (0, $1e584946c82e7f09$export$3e8048d3cf2ba3fd)(this.presenter.getElement($483619dbeb86ab73$export$79420be32f83a5b0.panel), this.options.language, this._animator, this._dataScope, (remap)=>{
            this.currentColorContext = ~~remap;
            this.renderSameLayout();
        }, ()=>this.insight && this.insight.columns && !!this.insight.columns.color && this.colorContexts && this.colorContexts.length > 1);
        this.insight = {};
    }
    changeColorContexts(colorContexts) {
        this.colorContexts = colorContexts;
        this.currentColorContext = 0;
        this.options.onColorContextChange && this.options.onColorContextChange();
    }
    applyLegendColorContext(colorContext) {
        const a = $fc1d5f246c786135$exports.getActiveElementInfo();
        $fc1d5f246c786135$exports.mount(colorContext.legendElement, this.presenter.getElement($483619dbeb86ab73$export$79420be32f83a5b0.legend));
        $fc1d5f246c786135$exports.setActiveElement(a);
        this.presenter.stage.legend = colorContext.legend;
    }
    onAnimateDataChange(dataChange, waitingLabel, handlerLabel) {
        return new Promise((resolve, reject)=>{
            let innerPromise;
            if (dataChange === (0, $57be1fa2f8a8b996$export$d9e571576e98a7ab).refine) {
                const oldColorContext = this.colorContexts[this.currentColorContext];
                innerPromise = new Promise((innerResolve)=>{
                    this.renderNewLayout({}, {
                        preStage: (stage, deckProps)=>{
                            (0, $d50aa7ce26a6d6ed$export$71ab65a966760ac3)(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
                            this.overrideAxisLabels(stage);
                            (0, $0fd54a544f9d2363$export$fa70acaad0e00464)([
                                oldColorContext.colorMap
                            ], $fc1d5f246c786135$exports.getCubes(deckProps));
                            if (this.options.onStage) this.options.onStage(stage, deckProps);
                        }
                    }).then(()=>{
                        //apply old legend
                        this.applyLegendColorContext(oldColorContext);
                        innerResolve();
                    });
                });
            } else innerPromise = this.renderNewLayout({}, {
                preStage: (stage, deckProps)=>{
                    (0, $d50aa7ce26a6d6ed$export$71ab65a966760ac3)(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
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
        return $0000a41cc7b5918f$var$__awaiter(this, void 0, void 0, function*() {
            switch(dataLayout){
                case (0, $57be1fa2f8a8b996$export$d9e571576e98a7ab).same:
                    this.renderSameLayout();
                    break;
                case (0, $57be1fa2f8a8b996$export$d9e571576e98a7ab).refine:
                    {
                        //save cube colors
                        const oldColorContext = this.colorContexts[this.currentColorContext];
                        let colorMap;
                        yield this.renderNewLayout({}, {
                            preStage: (stage, deckProps)=>{
                                //save off the spec colors
                                colorMap = (0, $0fd54a544f9d2363$export$3b9379ac3646e0f0)(stage.cubeData);
                                (0, $0fd54a544f9d2363$export$fa70acaad0e00464)([
                                    oldColorContext.colorMap
                                ], $fc1d5f246c786135$exports.getCubes(deckProps));
                                this.preStage(stage, deckProps);
                            },
                            onPresent: ()=>{
                                //save new legend
                                const newColorContext = {
                                    colorMap: colorMap,
                                    legend: $fc1d5f246c786135$exports.clone(this.presenter.stage.legend),
                                    legendElement: this.presenter.getElement($483619dbeb86ab73$export$79420be32f83a5b0.legend).children[0]
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
                        if (!$93e9fd90e1c55c05$export$398604a469f7de9a(this.insight.filter, filter)) this.insight.filter = $8cda325438b8cb6f$export$ec67f55c222e1546(this.insight.filter, filter);
                        if (this.options.onDataFilter) this.options.onDataFilter(this.insight.filter, this._dataScope.currentData());
                        break;
                    }
                case (0, $57be1fa2f8a8b996$export$d9e571576e98a7ab).reset:
                    {
                        const colorContext = {
                            colorMap: null,
                            legend: null,
                            legendElement: null
                        };
                        this.changeColorContexts([
                            colorContext
                        ]);
                        yield this.renderNewLayout({}, {
                            onPresent: ()=>{
                                (0, $0fd54a544f9d2363$export$44addeff9a96c1e7)(colorContext, this.presenter);
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
            "color",
            "facet",
            "group",
            "size",
            "sort",
            "sum",
            "x",
            "y",
            "z"
        ];
        const specColumns = Object.assign({}, this._specColumns);
        roles.forEach((r)=>{
            if (specColumns[r]) {
                const column = Object.assign({}, specColumns[r]);
                column.stats = this.getColumnStats(column);
                specColumns[r] = column;
            }
        });
        return specColumns;
    }
    renderNewLayout(signalValues, presenterConfig, view) {
        return $0000a41cc7b5918f$var$__awaiter(this, void 0, void 0, function*() {
            const currData = this._dataScope.currentData();
            const context = {
                specColumns: this.getSpecColumnsWithFilteredStats(),
                insight: this.insight,
                specViewOptions: Object.assign(Object.assign({}, this.options), {
                    zAxisOptions: {
                        showZAxis: true,
                        zIndex: $0000a41cc7b5918f$var$zAxisZindex
                    }
                })
            };
            const specResult = (0, $7e9d31f0ccd4826a$export$3f8fe6489e95757d)(context, currData);
            if (!specResult.errors) {
                const uiValues = (0, $7f509bc53ab5b2b2$export$764590c093441ac7)(this.vegaViewGl, this.vegaSpec);
                (0, $7f509bc53ab5b2b2$export$385a06e733eab4de)(Object.assign(Object.assign({}, uiValues), signalValues), specResult.vegaSpec);
                this.vegaSpec = specResult.vegaSpec;
                this.options.onVegaSpec && this.options.onVegaSpec(this.vegaSpec);
                this.specCapabilities = specResult.specCapabilities;
                const config = this.createConfig(presenterConfig);
                if (view) config.getView = ()=>view;
                if (!$0000a41cc7b5918f$var$didRegisterColorSchemes) {
                    (0, $c9f2c41a3f8ee485$export$3030070885af9365)($975e8617bd73ab77$export$e2253033e6e1df16.vega);
                    $0000a41cc7b5918f$var$didRegisterColorSchemes = true;
                }
                try {
                    if (this.vegaViewGl) this.vegaViewGl.finalize();
                    const runtime = $975e8617bd73ab77$export$e2253033e6e1df16.vega.parse(this.vegaSpec);
                    this.vegaViewGl = new $ba8a128a941ed656$export$6d8f9057dcd7f9e6(runtime, config).renderer("deck.gl").initialize(this.element);
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
                if (!specResult.errors) (0, $a6c27e3c8d5dfd72$export$1d674716cc6da32f)(this.presenter, this.options.language.headers);
            }
            if (specResult.errors) {
                if (this.options.onError) this.options.onError(specResult.errors);
                else if (this.presenter.logger) this.presenter.logger(`errors rendering Vega spec:${specResult.errors.join("\n")}`);
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
            return Object.assign({}, cube);
        });
        this.applyLegendColorContext(colorContext);
        let { axes: axes , textData: textData  } = this.presenter.stage;
        let recoloredAxes;
        if (newViewerOptions) {
            if (newViewerOptions.colors) {
                recoloredAxes = (0, $0c9263d924197a37$export$bb42b694d535c95a)(this.presenter.stage, this._lastColorOptions, newViewerOptions.colors);
                this._lastColorOptions = $fc1d5f246c786135$exports.clone(newViewerOptions.colors);
                axes = recoloredAxes.axes || axes;
                textData = recoloredAxes.textData || textData;
            }
            this.options = $fc1d5f246c786135$exports.deepMerge(this.options, newViewerOptions);
        }
        let colorMaps = [
            colorContext.colorMap
        ];
        let colorMethod;
        const hasSelectedData = this._dataScope.hasSelectedData();
        const hasActive = !!this._dataScope.active;
        if (hasSelectedData || hasActive) {
            const selectedColorMap = (0, $0fd54a544f9d2363$export$9cf45ec8b4cc2b65)(this._dataScope.currentData(), hasSelectedData, hasActive, this.options);
            colorMaps.push(selectedColorMap);
            colorMethod = this.options.colors.unselectedColorMethod;
        }
        (0, $0fd54a544f9d2363$export$fa70acaad0e00464)(colorMaps, clonedCubes, colorMethod);
        const stage = {
            cubeData: clonedCubes,
            axes: axes,
            textData: textData
        };
        this.vegaViewGl.presenter.rePresent(stage, this.createConfig().presenterConfig);
    }
    getView(view) {
        if (view === undefined) {
            if (this.presenter.view === null) return $0000a41cc7b5918f$var$defaultView;
            else return this.presenter.view;
        } else return view;
    }
    transformData(values, transform) {
        try {
            const runtime = $975e8617bd73ab77$export$e2253033e6e1df16.vega.parse({
                $schema: "https://vega.github.io/schema/vega/v4.json",
                data: [
                    {
                        name: "source",
                        values: values,
                        transform: transform
                    }
                ]
            });
            new $ba8a128a941ed656$export$6d8f9057dcd7f9e6(runtime).run();
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
     */ render(insight, data, options = {}) {
        return $0000a41cc7b5918f$var$__awaiter(this, void 0, void 0, function*() {
            let result;
            //see if refine expression has changed
            if (!$93e9fd90e1c55c05$export$398604a469f7de9a(insight.filter, this.insight.filter)) {
                const allowAsyncRenderTime = 100;
                if (insight.filter) {
                    //refining
                    result = yield this._render(insight, data, options, true);
                    this.presenter.animationQueue(()=>{
                        this.filter(insight.filter, options.rebaseFilter && options.rebaseFilter());
                    }, allowAsyncRenderTime, {
                        waitingLabel: "layout before refine",
                        handlerLabel: "refine after layout"
                    });
                } else {
                    //not refining
                    this._dataScope.setFilteredData(null);
                    result = yield this._render(insight, data, options, true);
                    this.presenter.animationQueue(()=>{
                        this.reset();
                    }, allowAsyncRenderTime, {
                        waitingLabel: "layout before reset",
                        handlerLabel: "reset after layout"
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
            colorContext.colorMap = (0, $0fd54a544f9d2363$export$3b9379ac3646e0f0)(stage.cubeData);
            this.preStage(stage, deckProps);
        };
        presenterConfig.onPresent = ()=>{
            if (this._shouldSaveColorContext()) {
                (0, $0fd54a544f9d2363$export$44addeff9a96c1e7)(colorContext, this.presenter);
                this.changeColorContexts([
                    colorContext
                ]);
                this._dataScope.deselect();
            }
        };
    }
    _render(insight, data, options, forceNewCharacterSet) {
        return $0000a41cc7b5918f$var$__awaiter(this, void 0, void 0, function*() {
            if (this._tooltip) {
                this._tooltip.finalize();
                this._tooltip = null;
            }
            if (this._dataScope.setData(data, options.columns)) //apply transform to the data
            this.transformData(data, insight.transform);
            this._specColumns = (0, $ae86bb470afa6626$export$9e6128b2231f5173)(insight, this._dataScope.getColumns(options.columnTypes));
            const ordinalMap = (0, $2de8589006f21d6f$export$f03cc77b21b3a2b2)(this._specColumns, data, options.ordinalMap);
            this._characterSet.resetCharacterSet(forceNewCharacterSet, this.insight, insight);
            this.insight = $fc1d5f246c786135$exports.clone(insight);
            this._lastColorOptions = $fc1d5f246c786135$exports.clone(this.options.colors);
            this._shouldSaveColorContext = ()=>!options.initialColorContext;
            const colorContext = options.initialColorContext || {
                colorMap: null,
                legend: null,
                legendElement: null
            };
            const specResult = yield this.renderNewLayout(insight.signalValues, {
                preStage: (stage, deckProps)=>{
                    if (this._shouldSaveColorContext()) //save off the colors from Vega layout
                    colorContext.colorMap = (0, $0fd54a544f9d2363$export$3b9379ac3646e0f0)(stage.cubeData);
                    else //apply passed colorContext
                    (0, $0fd54a544f9d2363$export$fa70acaad0e00464)([
                        colorContext.colorMap
                    ], $fc1d5f246c786135$exports.getCubes(deckProps));
                    //if items are selected, repaint
                    const hasSelectedData = !!this._dataScope.hasSelectedData();
                    const hasActive = !!this._dataScope.active;
                    if (this._dataScope.hasSelectedData() || this._dataScope.active) {
                        const selectedColorMap = (0, $0fd54a544f9d2363$export$9cf45ec8b4cc2b65)(this._dataScope.currentData(), hasSelectedData, hasActive, this.options);
                        (0, $0fd54a544f9d2363$export$fa70acaad0e00464)([
                            colorContext.colorMap,
                            selectedColorMap
                        ], stage.cubeData, this.options.colors.unselectedColorMethod);
                    }
                    this.preStage(stage, deckProps);
                },
                onPresent: ()=>{
                    if (this._shouldSaveColorContext()) {
                        (0, $0fd54a544f9d2363$export$44addeff9a96c1e7)(colorContext, this.presenter);
                        this.changeColorContexts([
                            colorContext
                        ]);
                    } else //apply passed colorContext
                    this.applyLegendColorContext(colorContext);
                },
                shouldViewstateTransition: ()=>this.shouldViewstateTransition(insight, this.insight)
            }, this.getView(insight.view));
            //future signal changes should save the color context
            this._shouldSaveColorContext = ()=>!options.discardColorContextUpdates || !options.discardColorContextUpdates();
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
        const polygonLayer = (0, $04c641c9701e126c$export$7aba45edad9b8473)(this.presenter, this.specCapabilities, this._specColumns, stage, onClick, this.options.colors.axisSelectHighlight, this.options.selectionPolygonZ);
        const order = 1; //after textlayer but before others
        deckProps.layers.splice(order, 0, polygonLayer);
        (0, $d50aa7ce26a6d6ed$export$71ab65a966760ac3)(this.insight.colorBin, this._specColumns.color, stage.legend, this.options.language);
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
        if (hasSelectedData && this._dataScope.selection.included.length === 1 && this._dataScope.selection.included[0][0, $4d0539c68a8de77f$export$5672246984822a29] === cube.ordinal) {
            this.deselect();
            return;
        }
        const search = {
            name: (0, $4d0539c68a8de77f$export$5672246984822a29),
            operator: "==",
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
        const index = (0, $2de8589006f21d6f$export$5844459bbee68321)(cube, currentData);
        if (index >= 0) this._tooltip = new (0, $a5823b006e1d2fb5$export$28c660c63b792dea)({
            options: this.options.tooltipOptions,
            item: currentData[index],
            position: e,
            cssPrefix: this.presenter.style.cssPrefix
        });
    }
    onTextHover(e, t) {
        //return true if highlight color is different
        if (!t || !this.options.getTextColor || !this.options.getTextHighlightColor) return false;
        return !$fc1d5f246c786135$exports.colorIsEqual(this.options.getTextColor(t), this.options.getTextHighlightColor(t));
    }
    createConfig(c) {
        const { getTextColor: getTextColor , getTextHighlightColor: getTextHighlightColor , getTextHighlightAlphaCutoff: getTextHighlightAlphaCutoff , onTextClick: onTextClick  } = this.options;
        const defaultPresenterConfig = {
            zAxisZindex: $0000a41cc7b5918f$var$zAxisZindex,
            getCharacterSet: (stage)=>this._characterSet.getCharacterSet(stage),
            getTextColor: getTextColor,
            getTextHighlightColor: getTextHighlightColor,
            getTextHighlightAlphaCutoff: getTextHighlightAlphaCutoff,
            onTextClick: (e, t)=>{
                if (t.metaData && t.metaData.search) {
                    const search = (0, $2041f36649939dda$export$cb06c97de370398d)(t.metaData.search);
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
                return datum[0, $4d0539c68a8de77f$export$5672246984822a29];
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
        const insight = Object.assign({}, this.insight);
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
        return (0, $7f509bc53ab5b2b2$export$764590c093441ac7)(this.vegaViewGl, this.vegaSpec);
    }
    finalize() {
        if (this._dataScope) this._dataScope.finalize();
        if (this._details) this._details.finalize();
        if (this._tooltip) this._tooltip.finalize();
        if (this.vegaViewGl) this.vegaViewGl.finalize();
        if (this.presenter) this.presenter.finalize();
        if (this.element) this.element.innerHTML = "";
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
 */ $0000a41cc7b5918f$export$2ec4afd9b3c16a85.defaultViewerOptions = (0, $74c2763994d75bb8$export$fb736e4909afb3d7);


const $15874c145702a1a4$export$83d89fbfd8236492 = "3.2.1";


const $3b509b9541e52a8f$export$1f96ae73734a86cc = (0, $975e8617bd73ab77$export$1f96ae73734a86cc);


var $a1d9524814b1e23a$exports = {};

$parcel$export($a1d9524814b1e23a$exports, "classList", () => $a1d9524814b1e23a$export$11c615ce16f87241);
$parcel$export($a1d9524814b1e23a$exports, "deepCompare", () => $a1d9524814b1e23a$export$e12301e595e16ad8);
var $77f4394dad3f0c80$exports = {};

$parcel$defineInteropFlag($77f4394dad3f0c80$exports);

$parcel$export($77f4394dad3f0c80$exports, "default", () => $77f4394dad3f0c80$export$2e2bcd8739ae039);
var $77f4394dad3f0c80$export$2e2bcd8739ae039 = $77f4394dad3f0c80$var$compare;
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
*/ function $77f4394dad3f0c80$var$compare(value1, value2) {
    if (value1 === value2) return true;
    /* eslint-disable no-self-compare */ // if both values are NaNs return true
    if (value1 !== value1 && value2 !== value2) return true;
    if (({}).toString.call(value1) != ({}).toString.call(value2)) return false;
    if (value1 !== Object(value1)) // non equal primitives
    return false;
    if (!value1) return false;
    if (Array.isArray(value1)) return $77f4394dad3f0c80$var$compareArrays(value1, value2);
    if (({}).toString.call(value1) == "[object Set]") return $77f4394dad3f0c80$var$compareArrays(Array.from(value1), Array.from(value2));
    if (({}).toString.call(value1) == "[object Object]") return $77f4394dad3f0c80$var$compareObjects(value1, value2);
    else return $77f4394dad3f0c80$var$compareNativeSubtypes(value1, value2);
}
function $77f4394dad3f0c80$var$compareNativeSubtypes(value1, value2) {
    // e.g. Function, RegExp, Date
    return value1.toString() === value2.toString();
}
function $77f4394dad3f0c80$var$compareArrays(value1, value2) {
    var len = value1.length;
    if (len != value2.length) return false;
    var alike = true;
    for(var i = 0; i < len; i++)if (!$77f4394dad3f0c80$var$compare(value1[i], value2[i])) {
        alike = false;
        break;
    }
    return alike;
}
function $77f4394dad3f0c80$var$compareObjects(value1, value2) {
    var keys1 = Object.keys(value1).sort();
    var keys2 = Object.keys(value2).sort();
    var len = keys1.length;
    if (len != keys2.length) return false;
    for(var i = 0; i < len; i++){
        var key1 = keys1[i];
        var key2 = keys2[i];
        if (!(key1 == key2 && $77f4394dad3f0c80$var$compare(value1[key1], value2[key2]))) return false;
    }
    return true;
}


const $a1d9524814b1e23a$export$11c615ce16f87241 = (...args)=>{
    return args.filter(Boolean).join(" ");
};
const $a1d9524814b1e23a$export$e12301e595e16ad8 = $77f4394dad3f0c80$exports.default || $77f4394dad3f0c80$exports;




const $de8134d48126c751$export$e2253033e6e1df16 = {
    react: null,
    reactDOM: null
};
function $de8134d48126c751$export$1f96ae73734a86cc(react, reactDOM, vega, deck, layers, luma) {
    $f80f7eb4951011b9$exports.use(vega, deck, layers, luma);
    $de8134d48126c751$export$e2253033e6e1df16.react = react;
    $de8134d48126c751$export$e2253033e6e1df16.reactDOM = reactDOM;
    //inform React that we are using a dynamic base class
    (0, $81745c046077d503$export$441ac54c4cda559d).prototype = react.Component.prototype;
}




function $81745c046077d503$var$addNullable(insight, signalValues) {
    const withNulls = Object.assign(Object.assign({
        view: null,
        filter: null
    }, insight), {
        signalValues: signalValues
    });
    return withNulls;
}
function $81745c046077d503$export$1557ccb739c4ea87(viewer, insight) {
    const currentInsight = viewer.getInsight();
    const a = $81745c046077d503$var$addNullable(currentInsight, Object.assign(Object.assign({}, viewer.insight.signalValues), currentInsight.signalValues));
    const b = $81745c046077d503$var$addNullable(insight, Object.assign(Object.assign({}, a.signalValues), insight.signalValues));
    const compare = (0, $a1d9524814b1e23a$export$e12301e595e16ad8)(a, b);
    return {
        a: a,
        b: b,
        compare: compare
    };
}
function $81745c046077d503$var$_SandDanceReact(props) {
    class __SandDanceReact extends (0, $de8134d48126c751$export$e2253033e6e1df16).react.Component {
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
                const c = $81745c046077d503$export$1557ccb739c4ea87(this.viewer, this.props.insight);
                const sameDataRef = this.props.data === this.lastData;
                if (!c.compare || !sameDataRef) this.layout();
            }
        }
        componentDidMount() {
            const element = (0, $de8134d48126c751$export$e2253033e6e1df16).reactDOM.findDOMNode(this.viewerDiv);
            this.viewer = new (0, $0000a41cc7b5918f$exports.Viewer)(element, this.props.viewerOptions);
            if (this.props.onMount) {
                if (this.props.onMount(this.viewer.presenter.getElement((0, $f80f7eb4951011b9$exports).PresenterElement.gl))) this.view();
            } else this.view();
        }
        componentDidUpdate() {
            this.viewer.options = (0, $f80f7eb4951011b9$exports).util.deepMerge(this.viewer.options, this.props.viewerOptions);
            this.view();
        }
        componentWillUnmount() {
            this.viewer.finalize();
        }
        render() {
            return (0, $de8134d48126c751$export$e2253033e6e1df16).react.createElement("div", {
                className: "sanddance-ReactViewer",
                ref: (div)=>this.viewerDiv = div
            });
        }
    }
    return new __SandDanceReact(props);
}
const $81745c046077d503$export$441ac54c4cda559d = $81745c046077d503$var$_SandDanceReact;



const $b7e03869cd46da1e$export$83d89fbfd8236492 = "3.0.1";





function $9c14fe62b8e7ad84$export$8210dfe1863c478(props) {
    if (!props.explorer.viewer || !props.signal) return null;
    if (props.signal.bind) {
        const input = props.signal.bind.input;
        if (input) {
            const fn = $9c14fe62b8e7ad84$var$map[input];
            if (fn) {
                const prefix = props.prefix ? `${props.prefix} ` : "";
                let initialValue;
                try {
                    initialValue = props.explorer.viewer.vegaViewGl.signal(props.signal.name);
                } catch (error) {
                // continue regardless of error
                }
                const control = fn(prefix, props.signal.bind, initialValue, (value)=>{
                    props.onChange && props.onChange(value);
                    props.explorer.signal(props.signal.name, value, props.newViewStateTarget);
                }, props.disabled, props.collapseLabel, props.componentRef);
                return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                    className: "sanddance-signal"
                }, control);
            }
        }
    }
    return null;
}
const $9c14fe62b8e7ad84$var$map = {};
$9c14fe62b8e7ad84$var$map["range"] = (prefix, bind, initialValue, onChange, disabled, collapseLabel, ref)=>{
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Slider, {
        componentRef: ref,
        label: prefix + bind.name,
        max: bind.max,
        min: bind.min,
        step: bind.step,
        defaultValue: initialValue,
        onChange: onChange,
        disabled: disabled
    });
};
$9c14fe62b8e7ad84$var$map["select"] = (prefix, bind, initialValue, onChange, disabled, collapseLabel, ref)=>{
    const options = bind.options.map((o, i)=>{
        const option = {
            key: o,
            text: o
        };
        return option;
    });
    const label = prefix + bind.name;
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Dropdown, {
        componentRef: ref,
        onRenderTitle: collapseLabel ? (a, b)=>(0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("span", null, label, ": ", a[0].text) : undefined,
        defaultSelectedKey: initialValue,
        label: collapseLabel ? undefined : label,
        options: options,
        onChange: (e, o)=>onChange(o.text),
        disabled: disabled
    });
};
$9c14fe62b8e7ad84$var$map["checkbox"] = (prefix, bind, initialValue, onChange, disabled, collapseLabel, ref)=>{
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Toggle, {
        componentRef: ref,
        defaultChecked: initialValue,
        label: prefix + bind.name,
        onChange: (e, checked)=>onChange(checked),
        disabled: disabled
    });
}; //TODO other signal types


const $0db66385c00a3f15$export$21c51bc433c16634 = {
    appName: "SandDance",
    bingsearch: "Bing",
    bingsearchDescription: (term)=>`Search Bing for "${term}"`,
    buttonClose: "Close",
    buttonSelect: "Search & Select",
    buttonColorSchemeMap: "Map color scheme to filtered data",
    buttonColorSchemeRemap: "Remap color to filtered data",
    buttonColorSchemeKeep: "Keep same color scheme",
    buttonCopyToClipboard: "Copy to clipboard",
    buttonExclude: "Exclude",
    buttonExport: "Export",
    buttonExportCount: (total)=>total == 1 ? "Export 1 row..." : `Export ${total} rows...`,
    buttonIsolate: "Isolate",
    buttonReset: "Stop filtering",
    buttonDeselect: "Clear selection",
    buttonToolbarFloat: "Float toolbar",
    buttonToolbarDock: "Dock toolbar",
    buttonToolbarHide: "Hide toolbar",
    buttonToolbarShow: "Show toolbar",
    buttonNextDataItem: "Next data item",
    buttonPrevDataItem: "Previous data item",
    buttonCreateSnapshot: "Create snapshot",
    buttonNextSnapshot: "Next snapshot",
    buttonPrevSnapshot: "Previous snapshot",
    buttonUpdateSnapshot: "Update snapshot",
    buttonAddExpression: "Add expression",
    buttonAddExpressionGroup: "Add group",
    buttonDeleteExpression: "Delete",
    buttonDeleteExpressionGroup: "Delete group",
    buttonClearSnapshots: "Clear snapshots",
    buttonDeleteSnapshot: "Delete snapshot",
    buttonEditSnapshot: "Edit snapshot",
    buttonMoveUp: "Move up",
    buttonMoveDown: "Move down",
    buttonShowVegaSpec: "Show Vega spec",
    buttonLaunchVegaEditor: "Open Vega Editor",
    buttonCameraHome: "Center chart in window",
    buttonTooltipMapping: "Tooltip columns...",
    buttonUndo: "Undo",
    buttonRedo: "Redo",
    chartTypeBarChartH: "Bar",
    chartTypeBarChartV: "Column",
    chartTypeDensity: "Density",
    chartTypeGrid: "Grid",
    chartTypeScatterPlot: "Scatter",
    chartTypeStacks: "Stacks",
    chartTypeStrips: "Strips",
    chartTypeTreeMap: "Treemap",
    defaultFileName: "sanddance-data",
    errorExportFilenameEmpty: "Filename cannot be blank",
    errorExportFilenameCharacters: (characters)=>`A filename cannot contain any of the following characters: ${characters}`,
    errorColumnMustBeNumeric: "Numeric column required for this chart type.",
    labelBlank: "blank",
    labelNull: "null",
    labelTrue: "true",
    labelFalse: "false",
    labelSystemInfo: "System info",
    labelChartSettings: "Chart settings",
    labelDataBrowser: "Data browser",
    labelDataScope: "Scope",
    labelExport: "Export Data",
    labelExportFormat: "File format",
    labelExportCSV: ".CSV - Comma separated values",
    labelExportHTML: ".HTML - A SandDance html page embedding this data",
    labelExportJSON: ".JSON - JavaScript object notation",
    labelExportTSV: ".TSV - Tab separated values",
    labelHistory: "History",
    labelTools: "Tools",
    labelVegaSpec: "Vega specification",
    labelColor: "Chart color",
    labelError: "Error",
    labelExportFileName: "File name",
    labelSnapshots: "Snapshots",
    labelSnapshotSettingThumbnailWidth: "Thumbnail image width",
    labelSearch: "Select by search",
    labelSearchClause: "Clause",
    labelSearchColumn: "Field",
    labelSearchOperator: "Operator",
    labelSearchValue: "Value",
    labelSearchValuePlaceholder: "Value to search for",
    labelChart: "Chart",
    labelChartCanvas: "Chart canvas",
    labelColumnMapping: "Column Mapping",
    labelChartTypeOptions: "Chart options",
    labelColorBin: "Color binning",
    labelColorOptions: "Color options",
    labelColorBinExplanation: "For numeric columns",
    labelColorFieldInfo: (colorColumnName, colorColumnType, categoricalNumeric, distinctValueCount)=>`Field <span className="fieldname">${colorColumnName}</span> is of type <span className="fieldtype">${colorColumnType}</span>${categoricalNumeric ? ` and has ${distinctValueCount} distinct values` : ""}.`,
    labelColorFieldIsColorData: (colorColumnName)=>`Field <span className="fieldname">${colorColumnName}</span> contains direct color data.`,
    labelColorBinNone: "None (continuous)",
    labelColorBinQuantize: "Quantize",
    labelColorBinQuantile: "Quantile",
    labelColorFilter: "Note: Colors will be re-mapped to the filter when viewing this snapshot.",
    labelColorScheme: "Scheme",
    labelTotal: "Total by",
    labelTotalByCountSquare: "Count (Grid layout)",
    labelTotalByCountStrip: "Count (Strip layout)",
    labelTotalBySumStrip: "Sum (Strip layout)",
    labelTotalBySumTreemap: "Sum (Treemap layout)",
    labelTotalBySumStripPercent: "Sum as percentage (Strip layout)",
    labelColumnColor: "Color by",
    labelColumnFacet: "Facet by",
    labelFacetLayout: "Facet layout",
    labelFacetLayoutWrap: "Wrap",
    // labelFacetLayoutHorizontal: 'Horizontal',
    // labelFacetLayoutVertical: 'Vertical',
    labelFacetLayoutCross: "\u229E",
    labelColumnFacetV: "Cross facet by",
    labelColumnSort: "Sort by",
    labelColumnX: "X Axis",
    labelColumnY: "Y Axis",
    labelColumnZ: "Z Axis",
    labelColumnSize: "Size by",
    labelColumnGroup: "Group by",
    labelAliasColor: "Color",
    labelAliasFacet: "Facet",
    labelAliasFacetV: "Vertical facet",
    labelAliasSort: "Sort",
    labelAliasX: "X Axis",
    labelAliasY: "Y Axis",
    labelAliasZ: "Z Axis",
    labelAliasSize: "Size",
    labelAliasGroup: "Group",
    labelDataItemIsFiltered: "Item is filtered from view",
    labelHistoryInit: "Initial view",
    labelHistoryFilterClear: "Clear filter",
    labelHistoryFilterIExclude: "Exclude filter",
    labelHistoryFilterIsolate: "Isolate filter",
    labelHistoryChangeChartType: (chart)=>`Change chart type to ${chart}`,
    labelHistoryMapColumn: (column)=>`Map ${column} role`,
    labelHistoryUnMapColumn: (column)=>`Unmap ${column} role`,
    labelHistoryReviveSnapshot: "Revive snapshot",
    labelHistoryColorBin: "Change color binning",
    labelHistoryDirectColor: "Change direct color",
    labelShowLegend: "Show legend",
    labelShowAxes: "Show axes",
    labelSnapshotTitle: "Title",
    labelSnapshotDescription: "Note (optional)",
    labelTooltipMapping: "Tooltip columns",
    labelTransitionDurations: "Transition durations",
    labelTransitionCamera: "2D / 3D view",
    labelTransitionColor: "Color",
    labelTransitionPosition: "Position",
    labelTransitionSize: "Size",
    labelVegaSpecData: "Data reference",
    labelVegaSpecNotes: "Note: You may need to change the color scheme to make this visible in Vega.",
    labelYes: "Yes",
    labelNo: "No",
    labelConfirmation: "Are you sure?",
    loading: "Loading...",
    schemeCategorical: "Categorical",
    schemeDiverging: "Diverging",
    schemeDual: "Dual",
    schemeSequentialMultiHue: "Sequential Multi Hue",
    schemeSequentialSingleHue: "Sequential Single Hue",
    selectDataSpanAll: "All rows",
    selectDataSpanFilter: "Filtered",
    selectDataSpanSelection: "Selected",
    selectVegaSpecDataNone: "None",
    selectVegaSpecDataInline: "Inline - WARNING this may use substantial browser/clipboard memory for large data sets.",
    selectVegaSpecDataUrl: "URL",
    record: (current, total)=>`${current} of ${total}`,
    searchEQ: "=",
    searchNEQ: "<>",
    searchGT: ">",
    searchGTE: ">=",
    searchLT: "<",
    searchLTE: "<=",
    searchNULL: "is null or empty",
    searchIN: "contains",
    searchSW: "starts with",
    searchWHERE: "Where",
    searchAND: "and",
    searchOR: "or",
    selectAny: "-- any --",
    selectNone: "-- none --",
    selectNumeric: "Numeric",
    selectNonNumeric: "Categorical",
    selectDirectColor: "Direct color",
    selectReference: "Column mappings",
    tooltipSearch: (column, value)=>`Click to search in '${column}' for "${value}"`,
    labelRequired: "required",
    labelSystem: "System",
    labelViewType2d: "View in 2D",
    labelViewType3d: "View in 3D",
    labelDataColors: "Enabled if this data column contains any CSS color values.",
    labelDataNullAll: "Loading data...",
    labelDataNullFiltered: "You can filter by first making a selection, then choosing <b>Isolate</b> or <b>Exclude</b> in the top bar.",
    labelDataNullSelection: "You can select by: <ul><li>clicking the chart axes</li><li>clicking in the legend</li><li>searching</li</ul>",
    labelZeroAll: "Dataset contains zero rows.",
    labelZeroSearchResults: "No rows matched your search.",
    signalGroups: [
        {
            prefix: "Chart",
            label: "Chart options"
        },
        {
            prefix: "Mark",
            label: "Mark options"
        },
        {
            prefix: "RoleColor",
            label: "Color options"
        },
        {
            prefix: "RoleFacet",
            label: "Facet options"
        },
        {
            prefix: "RoleSort",
            label: "Sort options"
        },
        {
            prefix: "RoleX",
            label: "X axis options"
        },
        {
            prefix: "RoleY",
            label: "Y axis options"
        },
        {
            prefix: "RoleZ",
            label: "Z axis options"
        },
        {
            prefix: "Text",
            label: "Text options"
        },
        {
            prefix: "*",
            label: "Options"
        }
    ]
};


const $f3c9564b99b49be4$var$maxFacets = 50;
const $f3c9564b99b49be4$var$roleLabels = {
    color: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColumnColor,
    facet: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColumnFacet,
    facetV: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColumnFacetV,
    group: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColumnGroup,
    size: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColumnSize,
    sort: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColumnSort,
    uid: null,
    x: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColumnX,
    y: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColumnY,
    z: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColumnZ
};
const $f3c9564b99b49be4$var$aliasLabels = {
    color: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelAliasColor,
    facet: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelAliasFacet,
    facetV: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelAliasFacetV,
    group: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelAliasGroup,
    size: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelAliasSize,
    sort: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelAliasSort,
    uid: null,
    x: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelAliasX,
    y: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelAliasY,
    z: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelAliasZ
};
function $f3c9564b99b49be4$var$filterColumnList(context, columns) {
    switch(context){
        case "facet":
        case "facetV":
            return columns.filter((column)=>column.quantitative || column.stats.distinctValueCount && column.stats.distinctValueCount < $f3c9564b99b49be4$var$maxFacets);
        default:
            return columns.slice();
    }
}
function $f3c9564b99b49be4$var$optionsForSpecColumn(sectionName, columns, role, disabledColumnName, selectedColumnName) {
    const filtered = $f3c9564b99b49be4$var$filterColumnList(role, columns);
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
            itemType: (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DropdownMenuItemType.Header
        };
        options.unshift(option);
    }
    return options;
}
function $f3c9564b99b49be4$var$optionsForReference(sectionName, specRoles) {
    const options = specRoles.map((specRole)=>{
        const option = {
            key: `role:${specRole.role}`,
            text: $f3c9564b99b49be4$var$aliasLabels[specRole.role],
            data: specRole.role
        };
        return option;
    }).sort((a, b)=>a.text.localeCompare(b.text));
    if (options.length) {
        const option = {
            key: sectionName,
            text: sectionName,
            itemType: (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DropdownMenuItemType.Header
        };
        options.unshift(option);
    }
    return options;
}
function $f3c9564b99b49be4$var$selectFirst(options) {
    for(let i = 0; i < options.length; i++){
        if (options[i].itemType === (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DropdownMenuItemType.Header) continue;
        options[i].selected = true;
        return;
    }
}
function $f3c9564b99b49be4$export$c171b40a34e110b5(props) {
    if (!props.specRole) return null;
    let categoricalColumns;
    let directColorColumns;
    let directColorGroup;
    let referenceGroup = [];
    if (props.specRole.role === "color") {
        categoricalColumns = props.categoricalColumns.filter((c)=>!c.isColorData);
        directColorColumns = props.categoricalColumns.filter((c)=>c.isColorData);
        directColorGroup = $f3c9564b99b49be4$var$optionsForSpecColumn((0, $0db66385c00a3f15$export$21c51bc433c16634).selectDirectColor, directColorColumns, "color", props.disabledColumnName, props.selectedColumnName);
    } else categoricalColumns = props.categoricalColumns;
    if (props.specRole.role === "sort") {
        const others = props.specCapabilities.roles.filter((specRole)=>specRole.role !== props.specRole.role);
        referenceGroup = $f3c9564b99b49be4$var$optionsForReference((0, $0db66385c00a3f15$export$21c51bc433c16634).selectReference, others);
    }
    const quantitativeGroup = $f3c9564b99b49be4$var$optionsForSpecColumn((0, $0db66385c00a3f15$export$21c51bc433c16634).selectNumeric, props.quantitativeColumns, props.specRole.role, props.disabledColumnName, props.selectedColumnName);
    const categoricGroup = props.specRole.excludeCategoric ? null : $f3c9564b99b49be4$var$optionsForSpecColumn((0, $0db66385c00a3f15$export$21c51bc433c16634).selectNonNumeric, categoricalColumns, props.specRole.role, props.disabledColumnName, props.selectedColumnName);
    const options = referenceGroup.concat(quantitativeGroup).concat(categoricGroup).concat(directColorGroup).filter(Boolean);
    return options;
}
function $f3c9564b99b49be4$export$83b9e0badda50eeb(props) {
    const options = $f3c9564b99b49be4$export$c171b40a34e110b5(props);
    if (props.specRole.allowNone) options.unshift({
        key: -1,
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectNone
    });
    const hasSelection = options.reduce((p, c)=>{
        return p || c.selected;
    }, false);
    if (!hasSelection) $f3c9564b99b49be4$var$selectFirst(options);
    let signals;
    if (props.explorer.viewer && props.explorer.viewer.vegaSpec) {
        if (props.specRole.signals) signals = props.explorer.viewer.vegaSpec.signals.filter((s)=>props.specRole.signals.indexOf(s.name) >= 0);
    }
    const label = $f3c9564b99b49be4$var$roleLabels[props.specRole.role];
    const signalElements = !props.hideSignals && signals && signals.map((signal, i)=>(0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $9c14fe62b8e7ad84$export$8210dfe1863c478), {
            key: i,
            explorer: props.explorer,
            signal: signal,
            onChange: (value)=>props.onChangeSignal && props.onChangeSignal(signal.name, value),
            collapseLabel: props.collapseLabel
        }));
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sanddance-columnMap"
    }, props.prefix, !props.hideDropdown && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $01c4eef7f720da5f$export$931cbfb6bfb85fc), {
        componentRef: props.componentRef,
        collapseLabel: props.collapseLabel,
        disabled: props.disabled,
        label: label,
        options: options,
        onChange: (e, o)=>props.changeColumnMapping(props.specRole.role, typeof o.data === "string" ? o.data : (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.clone(o.data)),
        onDismiss: props.onDismiss
    }), signalElements, props.suffix);
}



function $1f0c6e0f0abb4f2d$export$dd264fd5c92b73c6(stage, specCapabilities) {
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
function $1f0c6e0f0abb4f2d$var$px(n) {
    return n + "px";
}
function $1f0c6e0f0abb4f2d$var$_PositionedColumnMap(props1) {
    class __PositionedColumnMap extends (0, $8535c575077b9670$export$e2253033e6e1df16).react.Component {
        constructor(props){
            super(props);
            const { left: left , top: top  } = props;
            this.state = {
                left: left,
                top: top
            };
            this.dropdownRef = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createRef();
        }
        focus() {
            if (!this.focused) {
                this.focused = true;
                this.dropdownRef.current.focus(true);
            }
        }
        componentDidMount() {
            const size = (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.outerSize(this.div);
            const over = {
                left: Math.max(0, this.state.left + size.width - this.props.container.offsetWidth),
                top: Math.max(0, this.state.top + size.height - this.props.container.offsetHeight)
            };
            if (over.left || over.top) {
                let { left: left , top: top  } = this.state;
                left -= over.left;
                top -= over.top;
                this.setState({
                    left: left,
                    top: top
                });
            } else this.focus();
        }
        componentDidUpdate() {
            this.focus();
        }
        render() {
            return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                ref: (div)=>{
                    if (div) this.div = div;
                },
                className: "sanddance-columnMap-absolute",
                style: {
                    position: "absolute",
                    left: $1f0c6e0f0abb4f2d$var$px(this.state.left),
                    top: $1f0c6e0f0abb4f2d$var$px(this.state.top)
                }
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $f3c9564b99b49be4$export$83b9e0badda50eeb), Object.assign({}, this.props, {
                componentRef: this.dropdownRef,
                hideSignals: true
            })));
        }
    }
    return new __PositionedColumnMap(props1);
}
const $1f0c6e0f0abb4f2d$export$3e341bd56774d659 = $1f0c6e0f0abb4f2d$var$_PositionedColumnMap;


const $8f1b85a9470d3af5$export$c4b7cd609ccf4a5a = (title, embed)=>`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" type="text/css"
        href="https://unpkg.com/@msrvida/sanddance-embed@3/dist/css/sanddance-embed.css" />
    <link rel="stylesheet" type="text/css"
        href="https://unpkg.com/@msrvida/sanddance-explorer@3/dist/css/sanddance-explorer.css" />
</head>

<body>
    <script src="https://unpkg.com/react@16.13/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16.13/umd/react-dom.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/deck.gl@8.3.7/dist.min.js"></script>
    <script src="https://unpkg.com/vega@5.17/build/vega.min.js"></script>
    <script src="https://unpkg.com/@fluentui/react@7.150/dist/fluentui-react.js"></script>
    <script src="https://unpkg.com/@msrvida/sanddance-explorer@3/dist/umd/sanddance-explorer.js"></script>
    <script src="https://unpkg.com/@msrvida/sanddance-embed@3/dist/umd/sanddance-embed.js"></script>

    <div id="app"></div>

    ${embed}

</body>

</html>`;




function $3cd220df8c1129e3$export$65aea4b3b539487b(data, delimiter) {
    var fields = Object.keys(data[0]);
    var file = data.map((row)=>{
        return fields.map((fieldName)=>{
            const value = row[fieldName];
            if (typeof value === "number") return value;
            if (typeof value === "string") {
                if (value.indexOf(delimiter) >= 0) return `"${value.replace(/"/g, '""')}"`;
                else return value;
            }
            return "";
        }).join(delimiter);
    });
    file.unshift(fields.join(delimiter));
    return file.join("\n");
}




const $e98d3084b701f145$var$exportTypes = [
    [
        "json",
        (0, $0db66385c00a3f15$export$21c51bc433c16634).labelExportJSON
    ],
    [
        "csv",
        (0, $0db66385c00a3f15$export$21c51bc433c16634).labelExportCSV
    ],
    [
        "tsv",
        (0, $0db66385c00a3f15$export$21c51bc433c16634).labelExportTSV
    ],
    [
        "html",
        (0, $0db66385c00a3f15$export$21c51bc433c16634).labelExportHTML
    ]
];
function $e98d3084b701f145$var$_DataExportPicker(props1) {
    class __DataExportPicker extends (0, $8535c575077b9670$export$e2253033e6e1df16).react.Component {
        constructor(props){
            super(props);
            this.state = this.getInitialState(this.props);
        }
        getInitialState(props) {
            const initialState = {
                initializer: props.initializer,
                dialogHidden: true,
                exportType: $e98d3084b701f145$var$exportTypes[0][0],
                fileName: props.initializer.fileName,
                fileNameError: "",
                working: false
            };
            return initialState;
        }
        componentDidUpdate() {
            if (!(0, $a1d9524814b1e23a$exports).deepCompare(this.props.initializer, this.state.initializer)) this.setState(this.getInitialState(this.props));
        }
        // Converts to dataExport type and calls dataExportHandler to deal with data
        createExport(exportType, displayName) {
            const final = (data)=>{
                this.props.dataExportHandler(data, exportType, displayName);
                this.close();
            };
            const json = JSON.stringify(this.props.data, $e98d3084b701f145$var$columnReplacer);
            switch(exportType){
                case "json":
                    final(json);
                    break;
                case "csv":
                    final((0, $3cd220df8c1129e3$export$65aea4b3b539487b)(JSON.parse(json), ","));
                    break;
                case "tsv":
                    final((0, $3cd220df8c1129e3$export$65aea4b3b539487b)(JSON.parse(json), "	"));
                    break;
                case "html":
                    {
                        const csv = (0, $3cd220df8c1129e3$export$65aea4b3b539487b)(JSON.parse(json), ",");
                        const html = (0, $8f1b85a9470d3af5$export$c4b7cd609ccf4a5a)(`${(0, $0db66385c00a3f15$export$21c51bc433c16634).appName} - ${escape(displayName)}`, $e98d3084b701f145$var$embedScript(csv, displayName));
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
            const closeDialog = ()=>this.close();
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
            return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                className: "sanddance-dataExporter"
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DefaultButton, {
                className: "search-action search-bottom-action",
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonExportCount(this.props.data.length),
                onClick: ()=>this.setState({
                        dialogHidden: false
                    }),
                disabled: this.props.disabled
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $5453c8de1a3cb6b6$export$3ddf2d174ce01153), {
                hidden: this.state.dialogHidden,
                onDismiss: closeDialog,
                dialogContentProps: {
                    className: `sanddance-dialog ${this.props.theme}`,
                    type: (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DialogType.normal,
                    title: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelExport
                },
                buttons: [
                    (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.PrimaryButton, {
                        key: 0,
                        disabled: disabled || !!this.state.fileNameError,
                        onClick: (e)=>this.setState({
                                delayAction: ()=>this.createExport(this.state.exportType, this.state.fileName),
                                working: true
                            }),
                        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonExport,
                        iconProps: {
                            iconName: "Download"
                        }
                    })
                ]
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.TextField, {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelExportFileName,
                onChange: (e, displayName)=>{
                    const displayNameError = $e98d3084b701f145$var$getFileNameError(displayName);
                    this.setState({
                        fileName: displayName,
                        fileNameError: displayNameError
                    });
                },
                errorMessage: this.state.fileNameError,
                value: this.state.fileName
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.ChoiceGroup, {
                className: "sanddance-form-separate",
                disabled: disabled,
                options: $e98d3084b701f145$var$exportTypes.map(([exportType, text])=>{
                    return {
                        key: exportType,
                        text: text,
                        disabled: false,
                        checked: exportType === this.state.exportType
                    };
                }),
                onChange: (ev, option)=>this.setState({
                        exportType: option.key
                    }),
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelExportFormat
            })));
        }
    }
    return new __DataExportPicker(props1);
}
const $e98d3084b701f145$export$b1b568728c48eba1 = $e98d3084b701f145$var$_DataExportPicker;
const $e98d3084b701f145$var$illegalChars = '\\/:*?"<>|';
function $e98d3084b701f145$var$getFileNameError(displayName) {
    if (!displayName) return (0, $0db66385c00a3f15$export$21c51bc433c16634).errorExportFilenameEmpty;
    for(let i = 0; i < $e98d3084b701f145$var$illegalChars.length; i++){
        if (displayName.indexOf($e98d3084b701f145$var$illegalChars[i]) >= 0) return (0, $0db66385c00a3f15$export$21c51bc433c16634).errorExportFilenameCharacters($e98d3084b701f145$var$illegalChars);
    }
}
function $e98d3084b701f145$export$748f956e607b675b(fileName) {
    $e98d3084b701f145$var$exportTypes.forEach(([exportType])=>{
        const re = new RegExp(`\\.${exportType}`, "ig");
        fileName = fileName.replace(re, "");
    });
    return fileName;
}
function $e98d3084b701f145$var$columnReplacer(name, value) {
    if ((0, $3b509b9541e52a8f$exports).util.isInternalFieldName(name, true)) return undefined;
    return value === null ? "" : value;
}
function $e98d3084b701f145$var$embedScript(csv, displayName, snapshots) {
    const dataFile = {
        type: "csv",
        displayName: displayName,
        snapshots: snapshots
    };
    return `<pre id='csv-data' style='display:none'>${csv}</pre>
    <script>SandDanceEmbed.load(Object.assign({rawText: document.getElementById('csv-data').innerText}, ${JSON.stringify(dataFile)}))</script>`;
}
function $e98d3084b701f145$export$9f4b684ea6be1a90(data, displayName, snapshots) {
    const json = JSON.stringify(data, $e98d3084b701f145$var$columnReplacer);
    const csv = (0, $3cd220df8c1129e3$export$65aea4b3b539487b)(JSON.parse(json), ",");
    const html = (0, $8f1b85a9470d3af5$export$c4b7cd609ccf4a5a)(`${(0, $0db66385c00a3f15$export$21c51bc433c16634).appName} - ${escape(displayName)}`, $e98d3084b701f145$var$embedScript(csv, displayName, snapshots));
    return html;
}








function $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4(props) {
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: (0, $a1d9524814b1e23a$exports).classList("sanddance-group", props.className)
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "group-head"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("label", null, props.label), props.labelCount && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("span", {
        className: "count"
    }, "(", props.labelCount, ")")), props.children && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "group-body"
    }, props.children));
}






function $4a8bbc4be9711d93$export$ce08aabc421980f4(props) {
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, props.allColumns.map((c, i)=>(0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
            key: c.name
        }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("label", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Toggle, {
            checked: props.exclusions.indexOf(c.name) < 0,
            inlineLabel: true,
            label: c.name,
            onChange: ()=>props.toggleExclusion(c.name)
        })))));
}


var $72367f17ca00272b$exports = {};
"use strict";
var $72367f17ca00272b$var$__createBinding = $72367f17ca00272b$exports && $72367f17ca00272b$exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
var $72367f17ca00272b$var$__exportStar = $72367f17ca00272b$exports && $72367f17ca00272b$exports.__exportStar || function(m, exports) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) $72367f17ca00272b$var$__createBinding(exports, m, p);
};
Object.defineProperty($72367f17ca00272b$exports, "__esModule", {
    value: true
});

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
$72367f17ca00272b$var$__exportStar((parcelRequire("b7nfv")), $72367f17ca00272b$exports);

$72367f17ca00272b$var$__exportStar((parcelRequire("a7afS")), $72367f17ca00272b$exports);

$72367f17ca00272b$var$__exportStar((parcelRequire("6bWv0")), $72367f17ca00272b$exports);

$72367f17ca00272b$var$__exportStar((parcelRequire("217nY")), $72367f17ca00272b$exports);

$72367f17ca00272b$var$__exportStar((parcelRequire("9kLwX")), $72367f17ca00272b$exports);




function $a17a024e67e91c9f$export$1e096674a95fd43b(insightColumns, actualColumns, transform) {
    //ensure columns exist
    for(let role in insightColumns){
        let columnName = insightColumns[role];
        let column = actualColumns.filter((c)=>c.name === columnName)[0];
        let transformColumn = transform ? transform.filter((t)=>{
            switch(t.type){
                case "formula":
                    return t.as === columnName;
            }
        })[0] : null;
        if (!(column || transformColumn)) delete insightColumns[role];
    }
}
function $a17a024e67e91c9f$export$c2563952d877899(chart, totalStyle, insightColumns, actualColumns) {
    //ensure columns are populated
    const nonInternal = actualColumns.filter((c)=>!(0, $3b509b9541e52a8f$exports).util.isInternalFieldName(c.name));
    const firstColumn = nonInternal[0];
    const firstColumnName = firstColumn && firstColumn.name;
    const firstQuantitative = nonInternal.filter((c)=>c.quantitative)[0];
    const firstQuantitativeColumnName = firstQuantitative && firstQuantitative.name;
    const ensureColumn = (role, quantitative, treemap)=>{
        if (!insightColumns[role]) {
            if (treemap) insightColumns[role] = $a17a024e67e91c9f$export$7e0d3b5c6570ae8b(actualColumns).name;
            else insightColumns[role] = quantitative ? firstQuantitativeColumnName : firstColumnName;
        }
    };
    function checkRequiresSize() {
        switch(totalStyle){
            case "sum-strip":
            case "sum-strip-percent":
                ensureColumn("size", true);
                break;
            case "sum-treemap":
                ensureColumn("size", true, true);
                break;
        }
    }
    switch(chart){
        case "barchart":
        case "barchartV":
            ensureColumn("x");
            checkRequiresSize();
            break;
        case "barchartH":
            ensureColumn("y");
            checkRequiresSize();
            break;
        case "density":
            ensureColumn("x");
            ensureColumn("y");
            checkRequiresSize();
            break;
        case "scatterplot":
        case "stacks":
            ensureColumn("x");
            ensureColumn("y");
            break;
        case "treemap":
            if (!insightColumns.size) insightColumns.size = $a17a024e67e91c9f$export$7e0d3b5c6570ae8b(actualColumns).name;
            if (!insightColumns.size) //error - no numeric column
            return [
                (0, $0db66385c00a3f15$export$21c51bc433c16634).errorColumnMustBeNumeric
            ];
            break;
    }
}
function $a17a024e67e91c9f$export$7e0d3b5c6570ae8b(columns) {
    let column = (0, $72367f17ca00272b$exports.preferredColumnForTreemapSize)(columns, true);
    if (!column) column = (0, $72367f17ca00272b$exports.preferredColumnForTreemapSize)(columns, false);
    return column;
}


const $247884a4197e9da6$var$singleFacetLayouts = [
    {
        facetStyle: "wrap",
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelFacetLayoutWrap
    }
];
const $247884a4197e9da6$export$3fab399b77d7be2a = [
    {
        key: "grid",
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).chartTypeGrid
    },
    {
        key: "scatterplot",
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).chartTypeScatterPlot
    },
    {
        key: "density",
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).chartTypeDensity
    },
    {
        key: "barchartV",
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).chartTypeBarChartV
    },
    {
        key: "barchartH",
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).chartTypeBarChartH
    },
    {
        key: "treemap",
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).chartTypeTreeMap
    },
    {
        key: "strips",
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).chartTypeStrips
    },
    {
        key: "stacks",
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).chartTypeStacks
    }
];
function $247884a4197e9da6$export$7d1536ca08644643(key) {
    for(let i = 0; i < $247884a4197e9da6$export$3fab399b77d7be2a.length; i++){
        if (key === $247884a4197e9da6$export$3fab399b77d7be2a[i].key) return $247884a4197e9da6$export$3fab399b77d7be2a[i].text;
    }
}
function $247884a4197e9da6$var$_Chart(_props) {
    class __Chart extends (0, $8535c575077b9670$export$e2253033e6e1df16).react.Component {
        constructor(props){
            super(props);
            this.state = {
                showTooltipDialog: false
            };
            this.choiceRef = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createRef();
            props.explorer.dialogFocusHandler.focus = ()=>{
                var _a;
                return (_a = this.choiceRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            };
        }
        render() {
            const { props: props  } = this;
            const { explorer: explorer , specCapabilities: specCapabilities  } = props;
            const signals = explorer.viewer && explorer.viewer.vegaSpec && specCapabilities && specCapabilities.signals && explorer.viewer.vegaSpec.signals.filter((s)=>specCapabilities.signals.indexOf(s.name) >= 0);
            return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelChart
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                className: "calculator"
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.ChoiceGroup, {
                componentRef: this.choiceRef,
                className: "sanddance-chart-type",
                options: $247884a4197e9da6$export$3fab399b77d7be2a.map((o)=>{
                    return Object.assign(Object.assign({}, o), {
                        checked: props.chart === o.key,
                        disabled: props.disabled || o.key === "treemap" && props.quantitativeColumns.length === 0
                    });
                }),
                onChange: (e, o)=>props.onChangeChartType(o.key)
            }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColumnMapping
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, specCapabilities && specCapabilities.roles.map((specRole, i)=>{
                const specColumnInRole = props.insightColumns[specRole.role];
                const selectedColumnName = specColumnInRole;
                let disabledColumnName;
                let prefix;
                let suffix;
                let hideDropdown = false;
                let { totalStyle: totalStyle1  } = props;
                if (!totalStyle1) totalStyle1 = "count-square";
                let { facetStyle: facetStyle  } = props;
                if (!facetStyle) facetStyle = "wrap";
                switch(specRole.role){
                    case "facet":
                        suffix = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $01c4eef7f720da5f$export$931cbfb6bfb85fc), {
                            disabled: !props.insightColumns.facet,
                            collapseLabel: props.collapseLabels,
                            label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelFacetLayout,
                            calloutProps: {
                                style: {
                                    minWidth: "18em"
                                }
                            },
                            options: [
                                {
                                    key: "header1",
                                    text: `${(0, $0db66385c00a3f15$export$21c51bc433c16634).labelFacetLayout}:`,
                                    itemType: (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DropdownMenuItemType.Header
                                },
                                ...$247884a4197e9da6$var$singleFacetLayouts.map((f)=>{
                                    const o = {
                                        key: f.facetStyle,
                                        text: f.text,
                                        data: f,
                                        selected: facetStyle === f.facetStyle
                                    };
                                    return o;
                                }),
                                {
                                    key: "divider",
                                    text: "-",
                                    itemType: (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DropdownMenuItemType.Divider
                                },
                                {
                                    key: "header2",
                                    text: `${(0, $0db66385c00a3f15$export$21c51bc433c16634).labelColumnFacetV}:`,
                                    itemType: (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DropdownMenuItemType.Header
                                },
                                ...(0, $f3c9564b99b49be4$export$c171b40a34e110b5)(Object.assign(Object.assign({}, props), {
                                    specRole: specRole,
                                    selectedColumnName: props.insightColumns.facetV
                                })).map((o)=>{
                                    if (o.itemType !== (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DropdownMenuItemType.Header) {
                                        const facetData = {
                                            facetStyle: "cross",
                                            column: o.data
                                        };
                                        o.data = facetData;
                                        o.text = `${(0, $0db66385c00a3f15$export$21c51bc433c16634).labelFacetLayoutCross} ${o.text}`;
                                    }
                                    return o;
                                })
                            ],
                            onChange: (e, o)=>{
                                const facetData = o.data;
                                props.changeColumnMapping("facet", "facet", null, {
                                    facetStyle: facetData.facetStyle
                                });
                                if (facetData.facetStyle === "cross") props.changeColumnMapping("facetV", (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.clone(facetData.column));
                            }
                        });
                        break;
                    case "facetV":
                        hideDropdown = true;
                        break;
                    case "size":
                        {
                            const options = [
                                {
                                    key: "count-square",
                                    text: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTotalByCountSquare,
                                    data: "count-square",
                                    selected: !totalStyle1 || totalStyle1 === "count-square"
                                },
                                {
                                    key: "count-strip",
                                    text: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTotalByCountStrip,
                                    data: "count-strip",
                                    selected: totalStyle1 === "count-strip"
                                },
                                {
                                    key: "sum-strip",
                                    text: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTotalBySumStrip,
                                    data: "sum-strip",
                                    selected: totalStyle1 === "sum-strip"
                                },
                                {
                                    key: "sum-treemap",
                                    text: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTotalBySumTreemap,
                                    data: "sum-treemap",
                                    selected: totalStyle1 === "sum-treemap",
                                    disabled: props.quantitativeColumns.length === 0
                                }
                            ];
                            if (specCapabilities.percentage) options.push({
                                key: "sum-strip-percent",
                                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTotalBySumStripPercent,
                                data: "sum-strip-percent",
                                selected: totalStyle1 === "sum-strip-percent",
                                disabled: props.quantitativeColumns.length === 0
                            });
                            prefix = !specCapabilities.countsAndSums ? null : (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $01c4eef7f720da5f$export$931cbfb6bfb85fc), {
                                collapseLabel: props.collapseLabels,
                                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTotal,
                                calloutProps: {
                                    style: {
                                        minWidth: "18em"
                                    }
                                },
                                options: options,
                                onChange: (e, o)=>{
                                    const totalStyle = o.data;
                                    let defaultColumn;
                                    if (totalStyle.indexOf("sum-") === 0) {
                                        if (totalStyle === "sum-treemap") defaultColumn = (0, $a17a024e67e91c9f$export$7e0d3b5c6570ae8b)(props.allColumns);
                                        defaultColumn = defaultColumn || props.quantitativeColumns[0];
                                    }
                                    props.changeColumnMapping("size", "size", defaultColumn, {
                                        totalStyle: totalStyle
                                    });
                                }
                            });
                            break;
                        }
                }
                let disabled = props.disabled || props.view === "2d" && specRole.role === "z" || specRole.role === "size" && !(!specCapabilities.countsAndSums || totalStyle1.indexOf("sum-") === 0) || specRole.role === "sort" && specCapabilities.countsAndSums && totalStyle1 === "sum-treemap";
                return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $f3c9564b99b49be4$export$83b9e0badda50eeb), Object.assign({}, props, {
                    prefix: prefix,
                    suffix: suffix,
                    collapseLabel: props.collapseLabels,
                    disabled: disabled,
                    disabledColumnName: disabledColumnName,
                    selectedColumnName: selectedColumnName,
                    specRole: specRole,
                    key: i,
                    onChangeSignal: (name, value)=>props.onChangeSignal(specRole.role, selectedColumnName, name, value),
                    hideDropdown: hideDropdown
                }));
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                className: "sanddance-tooltipMap"
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DefaultButton, {
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonTooltipMapping,
                onClick: ()=>this.setState({
                        showTooltipDialog: true
                    })
            })))), signals && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelChartTypeOptions
            }, signals.map((signal, i)=>(0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $9c14fe62b8e7ad84$export$8210dfe1863c478), {
                    key: i,
                    signal: signal,
                    explorer: explorer,
                    disabled: props.disabled || this.disableSignal(signal),
                    collapseLabel: props.collapseLabels,
                    newViewStateTarget: false
                }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $5453c8de1a3cb6b6$export$3ddf2d174ce01153), {
                hidden: !this.state.showTooltipDialog,
                onDismiss: ()=>this.setState({
                        showTooltipDialog: false
                    }),
                title: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTooltipMapping
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $4a8bbc4be9711d93$export$ce08aabc421980f4), {
                allColumns: props.allColumns,
                exclusions: props.tooltipExclusions,
                toggleExclusion: props.toggleTooltipExclusion
            })));
        }
        disableSignal(signal) {
            if (this.props.view === "2d" && signal.name === (0, $3b509b9541e52a8f$exports).constants.SignalNames.ZGrounded) return true;
            return false;
        }
    }
    return new __Chart(_props);
}
const $247884a4197e9da6$export$acaa6426d77a227e = $247884a4197e9da6$var$_Chart;




function $0e7e0db23c06e103$export$2c73285ae9390cec(props) {
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.TextField, Object.assign({
        onKeyUp: (e)=>{
            e.nativeEvent.stopImmediatePropagation();
        }
    }, props));
}




const $f979d5a7baf59678$export$210195f4ae250f0a = 100;
function $f979d5a7baf59678$export$c2b32f315f251228(column) {
    const type = column && column.type;
    switch(type){
        case "boolean":
            return [
                [
                    "==",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchEQ
                ],
                [
                    "!=",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchNEQ
                ],
                [
                    "isnullorEmpty",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchNULL
                ]
            ];
        case "date":
        case "integer":
        case "number":
            return [
                [
                    "==",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchEQ
                ],
                [
                    "!=",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchNEQ
                ],
                [
                    ">",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchGT
                ],
                [
                    ">=",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchGTE
                ],
                [
                    "<",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchLT
                ],
                [
                    "<=",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchLTE
                ],
                [
                    "isnullorEmpty",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchNULL
                ]
            ];
        case "string":
        default:
            return [
                [
                    "==",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchEQ
                ],
                [
                    "!=",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchNEQ
                ],
                [
                    ">",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchGT
                ],
                [
                    ">=",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchGTE
                ],
                [
                    "<",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchLT
                ],
                [
                    "<=",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchLTE
                ],
                [
                    "contains",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchIN
                ],
                [
                    "starts",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchSW
                ],
                [
                    "isnullorEmpty",
                    (0, $0db66385c00a3f15$export$21c51bc433c16634).searchNULL
                ]
            ];
    }
}
function $f979d5a7baf59678$var$getExpressionClauses(currClause, disableOR) {
    const keys = [
        [
            "&&",
            (0, $0db66385c00a3f15$export$21c51bc433c16634).searchAND
        ]
    ];
    if (!disableOR) keys.push([
        "||",
        (0, $0db66385c00a3f15$export$21c51bc433c16634).searchOR
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
function $f979d5a7baf59678$var$getOperators(ex, column) {
    let anySelected = false;
    const validOperators = $f979d5a7baf59678$export$c2b32f315f251228(column);
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
function $f979d5a7baf59678$var$getDistinctValues(data, columnName) {
    const distinctMap = {};
    for(let i = 0; i < data.length; i++){
        let row = data[i];
        let value = row[columnName];
        distinctMap[value] = true;
    }
    return Object.keys(distinctMap).sort();
}
function $f979d5a7baf59678$var$getValues(ex, column, data, autoCompleteDistinctValues) {
    const stats = column && column.stats;
    if (stats && stats.distinctValueCount < $f979d5a7baf59678$export$210195f4ae250f0a) {
        if (!autoCompleteDistinctValues[column.name]) autoCompleteDistinctValues[column.name] = $f979d5a7baf59678$var$getDistinctValues(data, column.name);
        return autoCompleteDistinctValues[column.name].map((v, i)=>({
                key: i,
                text: v
            }));
    }
    return [];
}
function $f979d5a7baf59678$export$c72d34660a162238(ex) {
    if (ex.operator === "isnullorEmpty") return "";
    return typeof ex.value === "string" ? ex.value : ex.value == null ? "" : ex.value.toString();
}
function $f979d5a7baf59678$export$793106cac50ab579(props) {
    const ex = props.searchExpression;
    const possibleValues = $f979d5a7baf59678$var$getValues(ex, props.column, props.data, props.autoCompleteDistinctValues);
    //TODO better date handling with calendar picker
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, props.index > 0 && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $01c4eef7f720da5f$export$931cbfb6bfb85fc), {
        collapseLabel: props.collapseLabels,
        className: "search-field",
        label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSearchClause,
        dropdownWidth: 120,
        disabled: !ex.unlocked || props.disableOR,
        options: $f979d5a7baf59678$var$getExpressionClauses(ex.clause, props.disableOR),
        onChange: (e, o)=>props.onUpdateExpression({
                clause: o.data
            }, props.index)
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $01c4eef7f720da5f$export$931cbfb6bfb85fc), {
        componentRef: props.dropdownRef,
        collapseLabel: props.collapseLabels,
        className: "search-field",
        label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSearchColumn,
        options: [
            {
                key: "",
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectAny,
                data: null,
                selected: ex.name === null
            }
        ].concat(props.columns.map((c, i)=>({
                key: c.name,
                text: c.name,
                data: c,
                selected: c.name === ex.name
            }))),
        onChange: (e, o)=>props.onUpdateExpression({
                name: o.data && o.data.name || null
            }, props.index)
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $01c4eef7f720da5f$export$931cbfb6bfb85fc), {
        collapseLabel: props.collapseLabels,
        className: "search-field",
        label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSearchOperator,
        dropdownWidth: 120,
        options: $f979d5a7baf59678$var$getOperators(ex, props.column),
        onChange: (e, o)=>props.onUpdateExpression({
                operator: o.data
            }, props.index)
    }), possibleValues.length > 0 && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.ComboBox, {
        className: "search-field",
        label: props.collapseLabels ? null : (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSearchValue,
        placeholder: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSearchValuePlaceholder,
        disabled: ex.operator === "isnullorEmpty",
        dropdownWidth: (0, $01c4eef7f720da5f$export$8263e1ed1ef30f07),
        allowFreeform: true,
        autoComplete: "on",
        errorMessage: ex.errorMessage,
        text: $f979d5a7baf59678$export$c72d34660a162238(ex),
        options: $f979d5a7baf59678$var$getValues(ex, props.column, props.data, props.autoCompleteDistinctValues),
        onChange: (e, o, i, value)=>{
            if (o) value = o.text;
            props.onUpdateExpression({
                value: value
            }, props.index);
        }
    }), possibleValues.length === 0 && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $0e7e0db23c06e103$export$2c73285ae9390cec), {
        className: "search-field",
        label: props.collapseLabels ? null : (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSearchValue,
        placeholder: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSearchValuePlaceholder,
        disabled: ex.operator === "isnullorEmpty",
        errorMessage: ex.errorMessage,
        value: $f979d5a7baf59678$export$c72d34660a162238(ex),
        onChange: (e, v)=>props.onUpdateExpression({
                value: v
            }, props.index)
    }));
}




function $2a5fa1321d305a42$export$353f5b6fc5456de1(props) {
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DefaultButton, Object.assign({}, props, {
        styles: {
            root: {
                backgroundColor: "transparent",
                height: "30px",
                width: props.width,
                padding: 0
            },
            rootDisabled: {
                backgroundColor: "transparent"
            },
            icon: {
                color: props.themePalette.themePrimary
            },
            label: {
                fontWeight: "400",
                textAlign: props.textAlign || "left"
            }
        },
        iconProps: {
            iconName: props.iconName
        }
    }));
}






const $fd0d652c33ef4e65$var$maxClauses = 5;
function $fd0d652c33ef4e65$var$getColumnWithName(columnName, columns) {
    for(var i = 0; i < columns.length; i++){
        if (columns[i].name === columnName) return columns[i];
    }
}
function $fd0d652c33ef4e65$var$validateExpression(ex) {
    if (ex.operator === "isnullorEmpty") {
        ex.errorMessage = null;
        return;
    }
    const s = (0, $f979d5a7baf59678$export$c72d34660a162238)(ex);
    if (s.length === 0) ex.errorMessage = (0, $0db66385c00a3f15$export$21c51bc433c16634).labelRequired;
    else ex.errorMessage = null;
}
function $fd0d652c33ef4e65$var$clearExpressionValidation(ex) {
    if (ex.operator === "isnullorEmpty") {
        ex.errorMessage = null;
        return;
    }
    const s = (0, $f979d5a7baf59678$export$c72d34660a162238)(ex);
    if (s.length !== 0) ex.errorMessage = null;
}
function $fd0d652c33ef4e65$var$getGroupClauses(currClause, index, disableGroupOR) {
    let keys;
    if (index === 0) keys = [
        [
            null,
            (0, $0db66385c00a3f15$export$21c51bc433c16634).searchWHERE
        ]
    ];
    else {
        keys = [
            [
                "&&",
                (0, $0db66385c00a3f15$export$21c51bc433c16634).searchAND
            ]
        ];
        if (!disableGroupOR) keys.push([
            "||",
            (0, $0db66385c00a3f15$export$21c51bc433c16634).searchOR
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
function $fd0d652c33ef4e65$var$_Search(_props) {
    class __Search extends (0, $8535c575077b9670$export$e2253033e6e1df16).react.Component {
        constructor(props){
            super(props);
            this.state = this.getInitialState(this.props);
            this.dropdownRef = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createRef();
            props.explorer.dialogFocusHandler.focus = ()=>{
                var _a;
                return (_a = this.dropdownRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            };
        }
        getInitialState(props) {
            const initialState = {
                groups: props.initializer.search || [
                    this.newGroup(0, null)
                ],
                sortedColumns: [
                    ...props.initializer.columns
                ].sort((a, b)=>a.name.localeCompare(b.name)),
                initializer: props.initializer
            };
            initialState.groups.forEach((group)=>{
                group.expressions.forEach((ex)=>ex.unlocked = group.expressions.length <= 2);
            });
            return initialState;
        }
        componentDidUpdate() {
            if (!(0, $a1d9524814b1e23a$exports).deepCompare(this.props.initializer, this.state.initializer)) this.setState(this.getInitialState(this.props));
        }
        validateAndSearch() {
            const groups = [
                ...this.state.groups
            ];
            groups.forEach((group)=>{
                group.expressions.forEach($fd0d652c33ef4e65$var$validateExpression);
                const errors = group.expressions.reduce((p, c)=>p || c.errorMessage, "");
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
            const group = Object.assign(Object.assign({}, groups[groupIndex]), partialGroup);
            groups[groupIndex] = group;
            this.setState({
                groups: groups
            });
        }
        addGroup() {
            const groups = [
                ...this.state.groups
            ];
            const maxKey = groups.reduce((max, p)=>p.key > max ? p.key : max, groups[0].key);
            const newGroup = this.newGroup(maxKey + 1, "&&");
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
                operator: "contains",
                value: ""
            };
            return ex;
        }
        addExpression(groupIndex) {
            const groups = [
                ...this.state.groups
            ];
            const group = groups[groupIndex];
            const maxKey = group.expressions.reduce((max, p)=>p.key > max ? p.key : max, group.expressions[0].key);
            const newEx = this.newExpression(maxKey + 1, "&&");
            group.expressions.push(newEx);
            if (group.expressions.length === 2) newEx.unlocked = true;
            else {
                group.expressions.forEach((ex)=>ex.unlocked = false);
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
            const ex = (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.clone(group.expressions[index]);
            if (ex.name !== partialEx.name) {
                //choose an appropriate operator when switching data type
                const oldColumn = $fd0d652c33ef4e65$var$getColumnWithName(ex.name, this.state.sortedColumns);
                const newColumn = $fd0d652c33ef4e65$var$getColumnWithName(partialEx.name, this.state.sortedColumns);
                const oldType = oldColumn && oldColumn.type;
                const newType = newColumn && newColumn.type;
                if (oldType !== newType) {
                    const newOperators = (0, $f979d5a7baf59678$export$c2b32f315f251228)(newColumn).map((validOperator)=>validOperator[0]);
                    //see if old operator is compatible
                    if (newOperators.indexOf(ex.operator) < 0) //not compatible, so choose "equal"
                    partialEx.operator = "==";
                }
            }
            Object.assign(ex, partialEx);
            $fd0d652c33ef4e65$var$clearExpressionValidation(ex);
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
            return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
                className: "sanddance-search",
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSearch
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, this.state.groups.map((group, groupIndex)=>(0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                    className: "sanddance-search-group",
                    key: group.key
                }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $01c4eef7f720da5f$export$931cbfb6bfb85fc), {
                    collapseLabel: this.props.collapseLabels,
                    className: "search-group-clause",
                    label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSearchClause,
                    disabled: groupIndex === 0 || this.props.disableGroupOR,
                    dropdownWidth: 120,
                    options: $fd0d652c33ef4e65$var$getGroupClauses(group.clause, groupIndex, this.props.disableGroupOR),
                    onChange: (e, o)=>this.updateGroup({
                            clause: o.data
                        }, groupIndex)
                }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, group.expressions.map((ex1, i1)=>(0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                        className: "sanddance-search-expression",
                        key: ex1.key
                    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $f979d5a7baf59678$export$793106cac50ab579), {
                        dropdownRef: groupIndex === 0 && i1 === 0 ? this.dropdownRef : undefined,
                        collapseLabels: this.props.collapseLabels,
                        onUpdateExpression: (ex, i)=>this.updateExpression(ex, groupIndex, i),
                        autoCompleteDistinctValues: this.props.autoCompleteDistinctValues,
                        index: i1,
                        columns: this.state.sortedColumns,
                        data: this.props.data,
                        searchExpression: ex1,
                        disableOR: this.props.disableExpressionOR,
                        column: $fd0d652c33ef4e65$var$getColumnWithName(ex1.name, this.state.sortedColumns)
                    }), group.expressions.length > 1 && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $2a5fa1321d305a42$export$353f5b6fc5456de1), {
                        themePalette: this.props.themePalette,
                        className: "search-action",
                        iconName: "Cancel",
                        onClick: ()=>this.deleteExpression(groupIndex, i1),
                        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonDeleteExpression
                    })))), group.expressions.length < $fd0d652c33ef4e65$var$maxClauses && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $2a5fa1321d305a42$export$353f5b6fc5456de1), {
                    themePalette: this.props.themePalette,
                    className: "search-action",
                    iconName: "Add",
                    onClick: ()=>this.addExpression(groupIndex),
                    text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonAddExpression
                })), this.state.groups.length > 1 && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $2a5fa1321d305a42$export$353f5b6fc5456de1), {
                    themePalette: this.props.themePalette,
                    className: "search-action",
                    iconName: "Cancel",
                    onClick: ()=>this.deleteGroup(groupIndex),
                    text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonDeleteExpressionGroup
                }))), this.state.groups.length < $fd0d652c33ef4e65$var$maxClauses && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $2a5fa1321d305a42$export$353f5b6fc5456de1), {
                themePalette: this.props.themePalette,
                className: "search-action search-bottom-action",
                iconName: "Add",
                onClick: ()=>this.addGroup(),
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonAddExpressionGroup
            }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.PrimaryButton, {
                className: "search-action search-bottom-action",
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonSelect,
                onClick: ()=>this.validateAndSearch()
            }));
        }
    }
    return new __Search(_props);
}
const $fd0d652c33ef4e65$export$4b85d3515bd863a5 = $fd0d652c33ef4e65$var$_Search;





var $29728562a99c68a2$var$PresenterElement = (0, $3b509b9541e52a8f$exports).VegaDeckGl.PresenterElement;
function $29728562a99c68a2$export$f80a6900d44a74ee(viewer) {
    var tags = viewer.presenter.getElement($29728562a99c68a2$var$PresenterElement.gl).getElementsByTagName("canvas");
    if (tags) return tags[0];
}
function $29728562a99c68a2$export$95ea862e038e2d34(viewer) {
    var canvas = $29728562a99c68a2$export$f80a6900d44a74ee(viewer);
    if (canvas) canvas.tabIndex = -1;
}
const $29728562a99c68a2$export$8e76ac9f37578d1b = {
    webgl: !!document.createElement("canvas").getContext("webgl"),
    webgl2: !!document.createElement("canvas").getContext("webgl2")
};







const $f56a95f33c4cc847$export$83d89fbfd8236492 = "3.2.0";


var $4805700d8b417596$var$SandDance = $3b509b9541e52a8f$exports;
var $4805700d8b417596$var$DataRefType;
(function(DataRefType1) {
    DataRefType1[DataRefType1["none"] = 0] = "none";
    DataRefType1[DataRefType1["inline"] = 1] = "inline";
    DataRefType1[DataRefType1["url"] = 2] = "url";
})($4805700d8b417596$var$DataRefType || ($4805700d8b417596$var$DataRefType = {}));
function $4805700d8b417596$var$filterSignals(signal) {
    switch(signal.name){
        case $4805700d8b417596$var$SandDance.constants.SignalNames.XBins:
        case $4805700d8b417596$var$SandDance.constants.SignalNames.YBins:
        case $4805700d8b417596$var$SandDance.constants.SignalNames.FacetBins:
        case $4805700d8b417596$var$SandDance.constants.SignalNames.FacetVBins:
        case $4805700d8b417596$var$SandDance.constants.SignalNames.ColorBinCount:
        case $4805700d8b417596$var$SandDance.constants.SignalNames.ColorReverse:
        case $4805700d8b417596$var$SandDance.constants.SignalNames.PointScale:
        case $4805700d8b417596$var$SandDance.constants.SignalNames.TreeMapMethod:
            return false;
        default:
            return !!signal.bind;
    }
}
function $4805700d8b417596$var$cloneData(vegaSpec) {
    const data0 = vegaSpec.data[0];
    const valuesData = data0;
    const values = valuesData.values;
    delete valuesData.values;
    const data = $4805700d8b417596$var$SandDance.VegaDeckGl.util.clone(vegaSpec.data);
    valuesData.values = values;
    return {
        data: data,
        values: values
    };
}
function $4805700d8b417596$var$cloneScales(vegaSpec) {
    return $4805700d8b417596$var$SandDance.VegaDeckGl.util.clone(vegaSpec.scales);
}
function $4805700d8b417596$var$serializeSpec(vegaSpec, datafile, dataRefType, transform, scheme) {
    const scales = $4805700d8b417596$var$cloneScales(vegaSpec);
    const colorScale = scales.filter((scale)=>scale.name === $4805700d8b417596$var$SandDance.constants.ScaleNames.Color)[0];
    if (scheme.indexOf("dual_") >= 0) colorScale.range = $4805700d8b417596$var$SandDance.colorSchemes.filter((cs)=>cs.scheme === scheme)[0].colors;
    const clone = $4805700d8b417596$var$cloneData(vegaSpec);
    const data0 = clone.data[0];
    if (dataRefType === $4805700d8b417596$var$DataRefType.inline) {
        const valuesData = data0;
        valuesData.format = {
            parse: "auto",
            type: "json"
        };
        valuesData.values = clone.values;
    } else if (dataRefType === $4805700d8b417596$var$DataRefType.none) {
        const valuesData = data0;
        valuesData.values = [];
        if (transform) {
            if (valuesData.transform) valuesData.transform.push.apply(valuesData.transform, transform);
            else valuesData.transform = transform;
        }
    } else if (dataRefType === $4805700d8b417596$var$DataRefType.url) {
        const urlData = data0;
        urlData.url = datafile.dataUrl;
        urlData.format = {
            parse: "auto",
            type: datafile.type
        };
        if (transform) {
            if (urlData.transform) urlData.transform.push.apply(urlData.transform, transform);
            else urlData.transform = transform;
        }
    }
    return Object.assign(Object.assign({}, vegaSpec), {
        data: clone.data,
        scales: scales
    });
}
function $4805700d8b417596$var$defaultDataRefType(datafile) {
    if (datafile.dataUrl) return $4805700d8b417596$var$DataRefType.url;
    return $4805700d8b417596$var$DataRefType.none;
}
function $4805700d8b417596$var$initState(props) {
    return {
        showSystemDialog: false,
        showVegaDialog: false,
        dataRefType: $4805700d8b417596$var$defaultDataRefType(props.dataFile),
        spec: null
    };
}
function $4805700d8b417596$var$signalGroupKey(key) {
    for(let i = 0; i < (0, $0db66385c00a3f15$export$21c51bc433c16634).signalGroups.length; i++){
        if ((0, $0db66385c00a3f15$export$21c51bc433c16634).signalGroups[i].prefix === key) return key;
    }
    return "*";
}
function $4805700d8b417596$var$vegaSignalGroups(vegaSignals) {
    const signalGroupMap = {};
    vegaSignals.forEach((vs)=>{
        const split = vs.name.split("_");
        const key = $4805700d8b417596$var$signalGroupKey(split[0]);
        signalGroupMap[key] = signalGroupMap[key] || [];
        signalGroupMap[key].push(vs);
    });
    return signalGroupMap;
}
function $4805700d8b417596$var$_Settings(_props) {
    class __Settings extends (0, $8535c575077b9670$export$e2253033e6e1df16).react.Component {
        constructor(props){
            super(props);
            this.state = $4805700d8b417596$var$initState(props);
        }
        render() {
            const { props: props , state: state  } = this;
            if (!props.explorer.viewer || !props.explorer.viewer.vegaSpec) return null;
            const options = [
                {
                    key: $4805700d8b417596$var$DataRefType.none,
                    text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectVegaSpecDataNone,
                    selected: this.state.dataRefType === $4805700d8b417596$var$DataRefType.none,
                    data: $4805700d8b417596$var$DataRefType.none
                },
                !props.dataFile.rawText && {
                    key: $4805700d8b417596$var$DataRefType.url,
                    text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectVegaSpecDataUrl,
                    selected: this.state.dataRefType === $4805700d8b417596$var$DataRefType.url,
                    data: $4805700d8b417596$var$DataRefType.url
                },
                {
                    key: $4805700d8b417596$var$DataRefType.inline,
                    text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectVegaSpecDataInline,
                    selected: this.state.dataRefType === $4805700d8b417596$var$DataRefType.inline,
                    data: $4805700d8b417596$var$DataRefType.inline
                }
            ].filter(Boolean);
            const signalGroupMap = $4805700d8b417596$var$vegaSignalGroups(props.explorer.viewer.vegaSpec.signals);
            let first = true;
            return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, (0, $0db66385c00a3f15$export$21c51bc433c16634).signalGroups.map((sg, gi)=>{
                const vegaSignals = signalGroupMap[sg.prefix];
                if (vegaSignals) {
                    const filteredVegaSignals = vegaSignals.filter($4805700d8b417596$var$filterSignals);
                    if (filteredVegaSignals.length > 0) return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
                        key: sg.prefix,
                        label: sg.label
                    }, filteredVegaSignals.map((signal, i)=>{
                        const ref = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createRef();
                        if (first) {
                            first = false;
                            props.explorer.dialogFocusHandler.focus = ()=>{
                                const f = ref.current;
                                if (f.focus) f.focus();
                            };
                        }
                        return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $9c14fe62b8e7ad84$export$8210dfe1863c478), {
                            componentRef: ref,
                            key: i,
                            signal: signal,
                            explorer: props.explorer,
                            newViewStateTarget: false
                        });
                    }));
                }
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelChartCanvas
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Toggle, {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelShowAxes,
                defaultChecked: !props.hideAxes,
                onChange: (e, checked)=>props.onToggleAxes(!checked)
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Toggle, {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelShowLegend,
                defaultChecked: !props.hideLegend,
                onChange: (e, checked)=>props.onToggleLegend(!checked)
            })), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTools
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DefaultButton, {
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonShowVegaSpec,
                onClick: ()=>this.setState({
                        showVegaDialog: true,
                        spec: $4805700d8b417596$var$serializeSpec(props.explorer.viewer.vegaSpec, props.dataFile, this.state.dataRefType, props.explorer.viewer.getInsight().transform, this.props.scheme)
                    })
            })), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSnapshots
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Slider, {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSnapshotSettingThumbnailWidth,
                onChange: (value)=>{
                    this.props.explorer.snapshotThumbWidth = value;
                },
                min: 100,
                max: 800,
                defaultValue: this.props.explorer.snapshotThumbWidth
            })), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTransitionDurations
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Slider, {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTransitionColor,
                onChange: (value)=>{
                    this.props.explorer.viewerOptions.transitionDurations.color = value;
                },
                min: 0,
                max: 10000,
                defaultValue: this.props.explorer.viewerOptions.transitionDurations.color
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Slider, {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTransitionPosition,
                onChange: (value)=>{
                    this.props.explorer.viewerOptions.transitionDurations.position = value;
                },
                min: 0,
                max: 10000,
                defaultValue: this.props.explorer.viewerOptions.transitionDurations.position
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Slider, {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTransitionSize,
                onChange: (value)=>{
                    this.props.explorer.viewerOptions.transitionDurations.size = value;
                },
                min: 0,
                max: 10000,
                defaultValue: this.props.explorer.viewerOptions.transitionDurations.size
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Slider, {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTransitionCamera,
                onChange: (value)=>{
                    this.props.explorer.viewerOptions.transitionDurations.view = value;
                },
                min: 0,
                max: 10000,
                defaultValue: this.props.explorer.viewerOptions.transitionDurations.view
            })), props.additionalSettings && props.additionalSettings.map((g, i)=>(0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
                    key: i,
                    label: g.groupLabel
                }, g.children)), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSystem
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DefaultButton, {
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSystemInfo,
                onClick: ()=>this.setState({
                        showSystemDialog: true
                    })
            })), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $5453c8de1a3cb6b6$export$3ddf2d174ce01153), {
                hidden: !state.showVegaDialog,
                onDismiss: ()=>this.setState($4805700d8b417596$var$initState(this.props)),
                minWidth: "80%",
                title: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelVegaSpec,
                buttons: [
                    (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.PrimaryButton, {
                        key: "copy",
                        iconProps: {
                            iconName: "Copy"
                        },
                        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonCopyToClipboard,
                        onClick: ()=>{
                            var pre = document.getElementById("sanddance-vega-spec");
                            var range = document.createRange();
                            range.selectNode(pre);
                            const selection = window.getSelection();
                            selection.removeAllRanges();
                            selection.addRange(range);
                            document.execCommand("copy");
                        }
                    }),
                    (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DefaultButton, {
                        key: "edit",
                        iconProps: {
                            iconName: "OpenInNewWindow"
                        },
                        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonLaunchVegaEditor,
                        onClick: ()=>{
                            window.open("https://vega.github.io/editor/", "_blank");
                        }
                    })
                ]
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $01c4eef7f720da5f$export$931cbfb6bfb85fc), {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelVegaSpecData,
                options: options,
                onChange: (e, o)=>this.setState({
                        dataRefType: o.data,
                        spec: $4805700d8b417596$var$serializeSpec(props.explorer.viewer.vegaSpec, props.dataFile, o.data, props.explorer.viewer.getInsight().transform, this.props.scheme)
                    })
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("pre", {
                id: "sanddance-vega-spec"
            }, JSON.stringify(this.state.spec, null, 2)), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, (0, $0db66385c00a3f15$export$21c51bc433c16634).labelVegaSpecNotes)), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $5453c8de1a3cb6b6$export$3ddf2d174ce01153), {
                hidden: !state.showSystemDialog,
                onDismiss: ()=>this.setState($4805700d8b417596$var$initState(this.props)),
                title: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSystemInfo
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("ul", null, this.props.children, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("li", null, "SandDanceExplorer version: ", (0, $f56a95f33c4cc847$export$83d89fbfd8236492)), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("li", null, "SandDanceReact version: ", $b7e03869cd46da1e$export$83d89fbfd8236492), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("li", null, "SandDance version: ", $4805700d8b417596$var$SandDance.version), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("li", null, "WebGL enabled: ", (0, $29728562a99c68a2$export$8e76ac9f37578d1b).webgl ? (0, $0db66385c00a3f15$export$21c51bc433c16634).labelYes : (0, $0db66385c00a3f15$export$21c51bc433c16634).labelNo), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("li", null, "WebGL2 enabled: ", (0, $29728562a99c68a2$export$8e76ac9f37578d1b).webgl2 ? (0, $0db66385c00a3f15$export$21c51bc433c16634).labelYes : (0, $0db66385c00a3f15$export$21c51bc433c16634).labelNo))));
        }
    }
    return new __Settings(_props);
}
const $4805700d8b417596$export$c72f6eaae7b9adff = $4805700d8b417596$var$_Settings;







function $555bb845cf8689db$var$_SnapshotEditor(props1) {
    class __SnapshotEditor extends (0, $8535c575077b9670$export$e2253033e6e1df16).react.Component {
        constructor(props){
            super(props);
            this.state = {
                showEditFormDialog: false,
                title: "",
                description: "",
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
                var canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
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
                    const canvas = (0, $29728562a99c68a2$export$f80a6900d44a74ee)(this.props.explorer.viewer);
                    const bgColor = canvas && window.getComputedStyle(canvas).backgroundColor;
                    const insight = (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.clone(this.props.explorer.viewer.getInsight());
                    delete insight.size;
                    insight.signalValues = signalValues;
                    const title = this.props.getTitle && this.props.getTitle(insight) || "";
                    const description = this.props.getDescription && this.props.getDescription(insight) || "";
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
            return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $5453c8de1a3cb6b6$export$3ddf2d174ce01153), {
                modalProps: {
                    className: (0, $a1d9524814b1e23a$exports).classList("sanddance-snapshot-dialog", this.props.theme)
                },
                minWidth: `${this.props.explorer.snapshotThumbWidth + 64}px`,
                hidden: !this.state.showEditFormDialog,
                onDismiss: ()=>this.setState({
                        showEditFormDialog: false
                    }),
                title: this.state.editIndex >= 0 ? (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonEditSnapshot : (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonCreateSnapshot,
                buttons: (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.PrimaryButton, {
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
                            title: "",
                            description: "",
                            image: null
                        });
                    },
                    iconProps: {
                        iconName: "Camera"
                    },
                    text: this.state.editIndex >= 0 ? (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonUpdateSnapshot : (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonCreateSnapshot
                })
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.TextField, {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSnapshotTitle,
                onChange: (e, title)=>this.setState({
                        title: title
                    }),
                value: this.state.title
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.TextField, {
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSnapshotDescription,
                onChange: (e, description)=>this.setState({
                        description: description
                    }),
                value: this.state.description,
                multiline: true
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                className: "thumbnail"
            }, !this.state.image && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Spinner, null), this.state.image && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("img", {
                src: this.state.image,
                style: {
                    backgroundColor: this.state.bgColor
                }
            })), this.props.explorer.viewer && this.props.explorer.viewer.colorContexts && this.props.explorer.viewer.colorContexts.length > 1 && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColorFilter));
        }
    }
    return new __SnapshotEditor(props1);
}
const $555bb845cf8689db$export$15b376344cc89d12 = $555bb845cf8689db$var$_SnapshotEditor;






function $adfb025456b8f57f$export$c25acd513dcc8062(props) {
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.IconButton, Object.assign({}, props, {
        styles: {
            root: {
                color: props.themePalette.black
            },
            rootHovered: {
                background: "transparent",
                color: props.themePalette.themePrimary
            },
            rootPressed: {
                background: "transparent"
            },
            menuIcon: {
                display: "none"
            }
        },
        iconProps: {
            iconName: props.iconName
        },
        menuProps: props.menuProps
    }));
}




function $3465068850534ed3$var$_Snapshots(_props) {
    class __Snapshots extends (0, $8535c575077b9670$export$e2253033e6e1df16).react.Component {
        constructor(props){
            super(props);
            this.state = {
                confirmation: null,
                title: "",
                description: "",
                image: null,
                bgColor: null,
                insight: null
            };
        }
        render() {
            const items = [
                {
                    key: "clear",
                    text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonClearSnapshots,
                    onClick: ()=>this.setState({
                            confirmation: {
                                buttonText: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonClearSnapshots,
                                handler: ()=>this.props.onClearSnapshots()
                            }
                        }),
                    disabled: this.props.snapshots.length === 0
                }
            ];
            if (this.props.getTopActions) items.push.apply(items, this.props.getTopActions(this.props.snapshots));
            const ref = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createRef();
            this.props.explorer.dialogFocusHandler.focus = ()=>{
                var _a;
                (_a = ref.current) === null || _a === void 0 || _a.focus();
            };
            return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
                className: "sanddance-snapshots",
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSnapshots
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.PrimaryButton, {
                componentRef: ref,
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonCreateSnapshot,
                onClick: (e)=>this.props.editor.editSnapshot(),
                split: true,
                menuProps: {
                    items: items
                }
            }), this.props.getChildren && this.props.getChildren(this.props.snapshots), this.state.confirmation && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $5453c8de1a3cb6b6$export$3ddf2d174ce01153), {
                hidden: false,
                buttons: (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.PrimaryButton, {
                    key: 0,
                    onClick: (e)=>{
                        this.setState({
                            confirmation: null
                        });
                        this.state.confirmation.handler();
                    },
                    iconProps: {
                        iconName: "Delete"
                    },
                    text: this.state.confirmation.buttonText
                }),
                onDismiss: ()=>this.setState({
                        confirmation: null
                    })
            }, (0, $0db66385c00a3f15$export$21c51bc433c16634).labelConfirmation), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, this.props.snapshots.map((snapshot, i)=>{
                const actions = this.props.getActions && this.props.getActions(snapshot, i) || [];
                actions.push({
                    iconButtonProps: {
                        themePalette: this.props.themePalette,
                        title: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonEditSnapshot,
                        onClick: (e)=>this.props.editor.editSnapshot(snapshot, i),
                        iconName: "Edit"
                    }
                });
                if (this.props.snapshots.length > 1) actions.push({
                    iconButtonProps: {
                        disabled: i === 0,
                        themePalette: this.props.themePalette,
                        title: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonMoveUp,
                        onClick: (e)=>this.props.onMoveUp(i),
                        iconName: "SortUp"
                    }
                }, {
                    iconButtonProps: {
                        disabled: i > this.props.snapshots.length - 2,
                        themePalette: this.props.themePalette,
                        title: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonMoveDown,
                        onClick: (e)=>this.props.onMoveDown(i),
                        iconName: "SortDown"
                    }
                });
                actions.push({
                    iconButtonProps: {
                        themePalette: this.props.themePalette,
                        title: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonDeleteSnapshot,
                        onClick: ()=>this.setState({
                                confirmation: {
                                    buttonText: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonDeleteSnapshot,
                                    handler: ()=>this.props.onRemoveSnapshot(i)
                                }
                            }),
                        iconName: "Delete"
                    }
                });
                return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                    key: i,
                    className: (0, $a1d9524814b1e23a$exports).classList("snapshot", i === this.props.selectedSnapshotIndex && "selected")
                }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                    onClick: (e)=>this.props.onSnapshotClick(snapshot, i)
                }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                    className: "title"
                }, snapshot.title), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                    className: "thumbnail"
                }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("img", {
                    title: snapshot.description,
                    src: snapshot.image,
                    style: {
                        backgroundColor: snapshot.bgColor
                    }
                }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement($3465068850534ed3$var$Actions, {
                    actions: actions,
                    snapshot: snapshot
                }));
            }))));
        }
    }
    return new __Snapshots(_props);
}
const $3465068850534ed3$export$3e09886744a57615 = $3465068850534ed3$var$_Snapshots;
function $3465068850534ed3$var$Actions(props) {
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "actions"
    }, props.actions.map((action, i)=>{
        if (action.iconButtonProps) return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $adfb025456b8f57f$export$c25acd513dcc8062), Object.assign({
            key: i
        }, action.iconButtonProps));
        if (action.element) return action.element;
    }));
}


var $b935bf5e2863e486$exports = {};

$parcel$export($b935bf5e2863e486$exports, "Explorer", () => $b935bf5e2863e486$export$43584986cb77a794);







const $1ea281e0bf69aeed$var$className = "sanddance-panel-tools";
function $1ea281e0bf69aeed$var$ensureToolbar(panel) {
    const existing = panel.getElementsByClassName($1ea281e0bf69aeed$var$className);
    if (existing.length > 0) return existing[0];
    else {
        const div = (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.addDiv(panel, $1ea281e0bf69aeed$var$className);
        panel.insertAdjacentElement("afterbegin", div);
        return div;
    }
}
function $1ea281e0bf69aeed$export$225a002951c27da7(presenter, showLegend, props) {
    const panel = presenter.getElement((0, $3b509b9541e52a8f$exports).VegaDeckGl.PresenterElement.panel);
    const div = $1ea281e0bf69aeed$var$ensureToolbar(panel);
    (0, $8535c575077b9670$export$e2253033e6e1df16).reactDOM.render($1ea281e0bf69aeed$var$ColorMap(props), div);
    panel.style.display = showLegend ? "" : "none";
}
function $1ea281e0bf69aeed$var$ColorMap(props) {
    const menuProps = {
        items: [
            {
                key: "new",
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonColorSchemeRemap,
                disabled: !props.canRemap || props.isRemap,
                onClick: ()=>props.colorMapHandler(true)
            },
            {
                key: "old",
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonColorSchemeKeep,
                disabled: !props.canRemap || !props.isRemap,
                onClick: ()=>props.colorMapHandler(false)
            }
        ]
    };
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $adfb025456b8f57f$export$c25acd513dcc8062), {
        themePalette: props.themePalette,
        title: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonColorSchemeMap,
        onClick: null,
        iconName: props.canRemap ? "FiltersSolid" : "Filters",
        menuProps: menuProps
    }));
}


function $02ad5d745dd4974f$export$ba25af89e7ea3c1a(newColumn, oldColumn, oldScheme) {
    if (oldColumn && oldColumn.quantitative === newColumn.quantitative && $02ad5d745dd4974f$var$defaultColorScheme(oldColumn) === $02ad5d745dd4974f$var$defaultColorScheme(newColumn)) return oldScheme;
    return $02ad5d745dd4974f$var$defaultColorScheme(newColumn);
}
function $02ad5d745dd4974f$var$defaultColorScheme(c) {
    if (c.quantitative) return "redyellowgreen";
    else if (c.stats.distinctValueCount === 2) return "dual_redgreen";
    else if (c.stats.distinctValueCount <= 10) return "category10";
    return "category20";
}







function $336606e4467c7c06$export$2e2bcd8739ae039(x) {
    return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}
function $336606e4467c7c06$export$8f8e23dd27dc19f5(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);
    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
        coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
        +x.slice(i + 1)
    ];
}


function $66ddd43ef132fe4c$export$2e2bcd8739ae039(x) {
    return x = (0, $336606e4467c7c06$export$8f8e23dd27dc19f5)(Math.abs(x)), x ? x[1] : NaN;
}


function $4886ae7df3b00c8d$export$2e2bcd8739ae039(grouping, thousands) {
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


function $08e49d150cf0e40b$export$2e2bcd8739ae039(numerals) {
    return function(value) {
        return value.replace(/[0-9]/g, function(i) {
            return numerals[+i];
        });
    };
}


// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var $4e7c2ad27f8b8986$var$re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function $4e7c2ad27f8b8986$export$2e2bcd8739ae039(specifier) {
    if (!(match = $4e7c2ad27f8b8986$var$re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new $4e7c2ad27f8b8986$export$963aac351db36ed4({
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
$4e7c2ad27f8b8986$export$2e2bcd8739ae039.prototype = $4e7c2ad27f8b8986$export$963aac351db36ed4.prototype; // instanceof
function $4e7c2ad27f8b8986$export$963aac351db36ed4(specifier) {
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
$4e7c2ad27f8b8986$export$963aac351db36ed4.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};


function $df30648ee9197e79$export$2e2bcd8739ae039(s) {
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




var $54258f7cd36fe54f$export$6863724d9a42263;
function $54258f7cd36fe54f$export$2e2bcd8739ae039(x, p) {
    var d = (0, $336606e4467c7c06$export$8f8e23dd27dc19f5)(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent = d[1], i = exponent - ($54258f7cd36fe54f$export$6863724d9a42263 = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + (0, $336606e4467c7c06$export$8f8e23dd27dc19f5)(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}



function $679e3c4c7287d755$export$2e2bcd8739ae039(x, p) {
    var d = (0, $336606e4467c7c06$export$8f8e23dd27dc19f5)(x, p);
    if (!d) return x + "";
    var coefficient = d[0], exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}


var $80f7b023ca9d43c7$export$2e2bcd8739ae039 = {
    "%": function(x, p) {
        return (x * 100).toFixed(p);
    },
    "b": function(x) {
        return Math.round(x).toString(2);
    },
    "c": function(x) {
        return x + "";
    },
    "d": (0, $336606e4467c7c06$export$2e2bcd8739ae039),
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
        return (0, $679e3c4c7287d755$export$2e2bcd8739ae039)(x * 100, p);
    },
    "r": (0, $679e3c4c7287d755$export$2e2bcd8739ae039),
    "s": (0, $54258f7cd36fe54f$export$2e2bcd8739ae039),
    "X": function(x) {
        return Math.round(x).toString(16).toUpperCase();
    },
    "x": function(x) {
        return Math.round(x).toString(16);
    }
};



function $40245bd1e15a08bc$export$2e2bcd8739ae039(x) {
    return x;
}


var $c953dd2438486cb9$var$map = Array.prototype.map, $c953dd2438486cb9$var$prefixes = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "\xb5",
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
function $c953dd2438486cb9$export$2e2bcd8739ae039(locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? (0, $40245bd1e15a08bc$export$2e2bcd8739ae039) : (0, $4886ae7df3b00c8d$export$2e2bcd8739ae039)($c953dd2438486cb9$var$map.call(locale.grouping, Number), locale.thousands + ""), currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "", currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "", decimal = locale.decimal === undefined ? "." : locale.decimal + "", numerals = locale.numerals === undefined ? (0, $40245bd1e15a08bc$export$2e2bcd8739ae039) : (0, $08e49d150cf0e40b$export$2e2bcd8739ae039)($c953dd2438486cb9$var$map.call(locale.numerals, String)), percent = locale.percent === undefined ? "%" : locale.percent + "", minus = locale.minus === undefined ? "-" : locale.minus + "", nan = locale.nan === undefined ? "NaN" : locale.nan + "";
    function newFormat(specifier) {
        specifier = (0, $4e7c2ad27f8b8986$export$2e2bcd8739ae039)(specifier);
        var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
        // The "n" type is an alias for ",g".
        if (type === "n") comma = true, type = "g";
        else if (!(0, $80f7b023ca9d43c7$export$2e2bcd8739ae039)[type]) precision === undefined && (precision = 12), trim = true, type = "g";
        // If zero fill is specified, padding goes after sign and before digits.
        if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "=";
        // Compute the prefix and suffix.
        // For SI-prefix, the suffix is lazily computed.
        var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
        // What format function should we use?
        // Is this an integer type?
        // Can this type generate exponential notation?
        var formatType = (0, $80f7b023ca9d43c7$export$2e2bcd8739ae039)[type], maybeSuffix = /[defgprs%]/.test(type);
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
                if (trim) value = (0, $df30648ee9197e79$export$2e2bcd8739ae039)(value);
                // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
                if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
                // Compute the prefix and suffix.
                valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
                valueSuffix = (type === "s" ? $c953dd2438486cb9$var$prefixes[8 + (0, $54258f7cd36fe54f$export$6863724d9a42263) / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
                // Break the formatted value into the integer “value” part that can be
                // grouped, and fractional or exponential “suffix” part that is not.
                if (maybeSuffix) {
                    i = -1, n = value.length;
                    while(++i < n)if (c = value.charCodeAt(i), 48 > c || c > 57) {
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
    function formatPrefix(specifier, value1) {
        var f = newFormat((specifier = (0, $4e7c2ad27f8b8986$export$2e2bcd8739ae039)(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor((0, $66ddd43ef132fe4c$export$2e2bcd8739ae039)(value1) / 3))) * 3, k = Math.pow(10, -e), prefix = $c953dd2438486cb9$var$prefixes[8 + e / 3];
        return function(value) {
            return f(k * value) + prefix;
        };
    }
    return {
        format: newFormat,
        formatPrefix: formatPrefix
    };
}


var $2ab610105ad986f3$var$locale;
var $2ab610105ad986f3$export$d9468344d3651243;
var $2ab610105ad986f3$export$8d85692a469dde6f;
$2ab610105ad986f3$export$2e2bcd8739ae039({
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
function $2ab610105ad986f3$export$2e2bcd8739ae039(definition) {
    $2ab610105ad986f3$var$locale = (0, $c953dd2438486cb9$export$2e2bcd8739ae039)(definition);
    $2ab610105ad986f3$export$d9468344d3651243 = $2ab610105ad986f3$var$locale.format;
    $2ab610105ad986f3$export$8d85692a469dde6f = $2ab610105ad986f3$var$locale.formatPrefix;
    return $2ab610105ad986f3$var$locale;
}



var $99df88aa84de796a$export$f0297ce57faf7d71;
(function(DataScopeId1) {
    DataScopeId1[DataScopeId1["AllData"] = 0] = "AllData";
    DataScopeId1[DataScopeId1["SelectedData"] = 1] = "SelectedData";
    DataScopeId1[DataScopeId1["FilteredData"] = 2] = "FilteredData";
})($99df88aa84de796a$export$f0297ce57faf7d71 || ($99df88aa84de796a$export$f0297ce57faf7d71 = {}));
const $99df88aa84de796a$var$shortFormat = (0, $2ab610105ad986f3$export$d9468344d3651243)(".2~s");
function $99df88aa84de796a$var$short(n) {
    return n === -1 ? "--" : n ? n < 1000 ? n.toString() : $99df88aa84de796a$var$shortFormat(n) : "0";
}
function $99df88aa84de796a$export$3fb74a6ae4f1171d(props) {
    const dataCount = Object.assign({
        all: -1,
        filtered: -1,
        selected: -1
    }, props.dataCount);
    return props.compact ? (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: (0, $a1d9524814b1e23a$exports).classList("sanddance-datascope", "compact"),
        onClick: props.onCompactClick
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement($99df88aa84de796a$var$Compact, Object.assign({}, props, {
        dataScopeId: $99df88aa84de796a$export$f0297ce57faf7d71.AllData,
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectDataSpanAll,
        count: dataCount.all
    })), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement($99df88aa84de796a$var$Compact, Object.assign({}, props, {
        dataScopeId: $99df88aa84de796a$export$f0297ce57faf7d71.FilteredData,
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectDataSpanFilter,
        count: dataCount.filtered
    })), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement($99df88aa84de796a$var$Compact, Object.assign({}, props, {
        dataScopeId: $99df88aa84de796a$export$f0297ce57faf7d71.SelectedData,
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectDataSpanSelection,
        count: dataCount.selected
    }))) : (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: (0, $a1d9524814b1e23a$exports).classList("sanddance-datascope", "extended", props.active && "active")
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, props.dataSet), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "datascope-buttons"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement($99df88aa84de796a$var$DataScopeButton, Object.assign({}, props, {
        dataScopeId: $99df88aa84de796a$export$f0297ce57faf7d71.AllData,
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectDataSpanAll,
        count: dataCount.all
    })), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement($99df88aa84de796a$var$DataScopeButton, Object.assign({}, props, {
        dataScopeId: $99df88aa84de796a$export$f0297ce57faf7d71.FilteredData,
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectDataSpanFilter,
        count: dataCount.filtered
    })), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement($99df88aa84de796a$var$DataScopeButton, Object.assign({}, props, {
        dataScopeId: $99df88aa84de796a$export$f0297ce57faf7d71.SelectedData,
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectDataSpanSelection,
        count: dataCount.selected
    })))));
}
function $99df88aa84de796a$var$Compact(props) {
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: props.text,
        onClick: ()=>{
            props.onDataScopeClick(props.dataScopeId);
        }
    }, $99df88aa84de796a$var$short(props.count));
}
function $99df88aa84de796a$var$DataScopeButton(props) {
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $2a5fa1321d305a42$export$353f5b6fc5456de1), {
        themePalette: props.themePalette,
        className: (0, $a1d9524814b1e23a$exports).classList("datascope-button", props.selectedDataScope === props.dataScopeId && "selected"),
        disabled: props.disabled,
        text: props.text,
        onClick: ()=>{
            props.onDataScopeClick(props.dataScopeId);
        },
        onRenderText: ()=>{
            return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                title: props.count > 0 ? props.count.toString() : ""
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("label", null, props.text), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, $99df88aa84de796a$var$short(props.count)));
        },
        onRenderIcon: ()=>null
    });
}









function $4833a31f56c4b60e$export$fcc7818a78919c8c(props) {
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: (0, $a1d9524814b1e23a$exports).classList("scrollable-container", props.className),
        role: props.role
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "scrollable"
    }, props.children));
}


var $a4811b1c86ed19fa$export$f3b7566ffe363e3b;
(function(SideTabId1) {
    SideTabId1[SideTabId1["ChartType"] = 0] = "ChartType";
    SideTabId1[SideTabId1["Data"] = 1] = "Data";
    SideTabId1[SideTabId1["Search"] = 2] = "Search";
    SideTabId1[SideTabId1["Color"] = 3] = "Color";
    SideTabId1[SideTabId1["Snapshots"] = 4] = "Snapshots";
    SideTabId1[SideTabId1["History"] = 5] = "History";
    SideTabId1[SideTabId1["Settings"] = 6] = "Settings";
    SideTabId1[SideTabId1["Pin"] = 7] = "Pin";
    SideTabId1[SideTabId1["Collapse"] = 8] = "Collapse";
})($a4811b1c86ed19fa$export$f3b7566ffe363e3b || ($a4811b1c86ed19fa$export$f3b7566ffe363e3b = {}));




function $31fcbd44e38b82f5$export$1ba59dacbcbf90fe(props) {
    const sidebuttons = [
        {
            sideTabId: (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).ChartType,
            iconName: "BIDashboard",
            title: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelChart
        },
        {
            sideTabId: (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Color,
            iconName: "Color",
            title: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColor
        },
        {
            sideTabId: (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Data,
            iconName: "Table",
            title: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelDataBrowser
        },
        {
            sideTabId: (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Search,
            iconName: "Search",
            title: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSearch
        },
        {
            sideTabId: (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Snapshots,
            iconName: "Camera",
            title: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelSnapshots
        },
        {
            sideTabId: (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).History,
            iconName: "History",
            title: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelHistory
        },
        {
            sideTabId: (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Settings,
            iconName: "Settings",
            title: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelChartSettings
        }
    ];
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: (0, $a1d9524814b1e23a$exports).classList("sanddance-sidebar", "calculator", props.pinned && "pinned", props.closed && "closed")
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sidebar-content"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $99df88aa84de796a$export$3fb74a6ae4f1171d), Object.assign({}, props.dataScopeProps)), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "vbuttons",
        role: "tablist"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sidebar-dialogs"
    }, sidebuttons.map((sidebutton, i)=>(0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement($31fcbd44e38b82f5$export$a8fc19311f33df91, Object.assign({
            key: i
        }, props, sidebutton, {
            themePalette: props.themePalette
        })))), !props.hideSidebarControls && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sidebar-controls"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement($31fcbd44e38b82f5$export$a8fc19311f33df91, Object.assign({}, props, {
        role: "button",
        sideTabId: (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Pin,
        iconName: props.pinned ? "Pinned" : "Pin",
        title: props.pinned ? (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonToolbarFloat : (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonToolbarDock
    })), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement($31fcbd44e38b82f5$export$a8fc19311f33df91, Object.assign({}, props, {
        role: "button",
        sideTabId: (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Collapse,
        iconName: props.closed ? "DoubleChevronRight12" : "DoubleChevronLeft12",
        title: props.closed ? (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonToolbarShow : (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonToolbarHide
    })))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $4833a31f56c4b60e$export$fcc7818a78919c8c), {
        role: "tabpanel"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sidetab"
    }, props.children)), props.calculating && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "calculating"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Spinner, {
        size: (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.SpinnerSize.large
    }))));
}
function $31fcbd44e38b82f5$export$a8fc19311f33df91(props) {
    const selected = !props.closed && props.selectedSideTab === props.sideTabId;
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: (0, $a1d9524814b1e23a$exports).classList("vbutton", selected && "selected")
    }, props.badgeText && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "count"
    }, props.badgeText), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $adfb025456b8f57f$export$c25acd513dcc8062), {
        role: props.role || "tab",
        "aria-selected": selected,
        themePalette: props.themePalette,
        className: "vbutton",
        iconName: props.iconName,
        title: props.title,
        onClick: ()=>{
            props.onSideTabClick(props.sideTabId);
        }
    }));
}



const $8008cea877f23d13$export$26e7026630023d76 = (props)=>{
    const { theme: theme  } = props;
    if (!theme) throw new Error("Theme is undefined or null.");
    const { palette: palette , semanticColors: semanticColors  } = theme;
    const BUTTON_ICON_CLASSNAME = ".ms-Button-icon";
    return {
        root: [
            Object.assign({}, (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.getFocusStyle(theme, {
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
                ":hover": {
                    backgroundColor: palette.neutralLighter,
                    selectors: {
                        [BUTTON_ICON_CLASSNAME]: {
                            color: palette.neutralPrimary
                        }
                    }
                },
                ":active": {
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



const $1b1934775c689ff2$var$s = `
 ......
.......
...
......
 ......
    ...
.......
......
`;
const $1b1934775c689ff2$var$d = $1b1934775c689ff2$var$s.split("\n").map((row, irow)=>row.length ? row.split("").map((char, icol)=>char.trim() ? `M${2 * icol + 1} ${2 * (irow - 1) + 1} v1 h1 v-1 Z` : "").join(" ") : "").join("\n");
function $1b1934775c689ff2$export$e6ff31bff12b7ff4() {
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 16 16"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("path", {
        d: $1b1934775c689ff2$var$d
    }));
}





function $f336667543fc9dad$export$1ca1e38143dcc152(props) {
    const zeroResults = props.selectionState.selectedData && props.selectionState.selectedData.length === 0;
    const disabled = !props.loaded;
    const items = [
        {
            key: "undo",
            name: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonUndo,
            iconProps: {
                iconName: "Undo"
            },
            disabled: disabled || props.historyItems.length === 0 || props.historyIndex === 0,
            onClick: props.undo
        },
        {
            key: "redo",
            name: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonRedo,
            iconProps: {
                iconName: "Redo"
            },
            disabled: disabled || props.historyItems.length <= 1 || props.historyIndex >= props.historyItems.length - 1,
            onClick: props.redo
        },
        {
            key: "deselect",
            name: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonDeselect,
            iconProps: {
                iconName: "Cancel"
            },
            disabled: disabled || !props.selectionSearch,
            onClick: props.doDeselect
        },
        {
            key: "isolate",
            name: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonIsolate,
            iconProps: {
                iconName: "Filter"
            },
            disabled: disabled || !props.selectionSearch || zeroResults,
            onClick: ()=>props.doFilter(props.selectionSearch, (0, $0db66385c00a3f15$export$21c51bc433c16634).labelHistoryFilterIsolate)
        },
        {
            key: "exclude",
            name: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonExclude,
            iconProps: {
                iconName: "ClearFilter"
            },
            disabled: disabled || !props.selectionSearch || zeroResults,
            onClick: ()=>props.doFilter((0, $3b509b9541e52a8f$exports).searchExpression.invert(props.selectionSearch), (0, $0db66385c00a3f15$export$21c51bc433c16634).labelHistoryFilterIExclude)
        },
        {
            key: "reset",
            name: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonReset,
            iconProps: {
                iconName: "RemoveFilter"
            },
            disabled: disabled || !props.filter,
            onClick: ()=>props.doUnfilter((0, $0db66385c00a3f15$export$21c51bc433c16634).labelHistoryFilterClear)
        }
    ];
    if (props.buttons) items.push.apply(items, props.buttons);
    if (props.collapseLabels) items.forEach((item)=>item.iconOnly = true);
    const farItems = [
        {
            key: "previous-snapshot",
            iconProps: {
                iconName: "Previous"
            },
            title: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonPrevSnapshot,
            onClick: props.onSnapshotPreviousClick,
            disabled: props.snapshots.length < 2
        },
        {
            key: "snapshot",
            iconProps: {
                iconName: "Camera"
            },
            title: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonCreateSnapshot,
            onClick: props.onSnapshotClick,
            disabled: !props.loaded
        },
        {
            key: "next-snapshot",
            iconProps: {
                iconName: "Next"
            },
            title: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonNextSnapshot,
            onClick: props.onSnapshotNextClick,
            disabled: props.snapshots.length < 2
        },
        {
            key: "view",
            iconProps: {
                iconName: props.view === "2d" ? "CubeShape" : "Page"
            },
            title: props.view === "2d" ? (0, $0db66385c00a3f15$export$21c51bc433c16634).labelViewType3d : (0, $0db66385c00a3f15$export$21c51bc433c16634).labelViewType2d,
            onClick: props.onViewClick,
            disabled: !props.loaded
        },
        {
            key: "home",
            iconProps: {
                iconName: "PicturePosition"
            },
            title: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonCameraHome,
            onClick: props.onHomeClick,
            disabled: !props.loaded
        }
    ];
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sanddance-explorer-topbar"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "logo"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $1b1934775c689ff2$export$e6ff31bff12b7ff4), null), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("a", {
        href: props.logoClickUrl || "/",
        target: props.logoClickTarget || "_blank"
    }, (0, $0db66385c00a3f15$export$21c51bc433c16634).appName)), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sanddance-explorer-commandbar"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Customizer, {
        scopedSettings: {
            CommandBarButton: {
                styles: (buttonProps)=>{
                    buttonProps.theme.palette = props.themePalette;
                    return (0, $8008cea877f23d13$export$26e7026630023d76)(buttonProps);
                }
            }
        }
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.CommandBar, {
        items: items,
        farItems: farItems,
        styles: {
            root: {
                backgroundColor: "transparent",
                height: "unset",
                paddingLeft: 0,
                paddingRight: 0
            }
        }
    }))));
}



const $3d862e0e83f42a97$export$9d26f8f2be82424f = (dataFile)=>new Promise((resolve, reject)=>{
        const vega = (0, $3b509b9541e52a8f$exports).VegaDeckGl.base.vega;
        const loader = vega.loader();
        function handleRawText(text) {
            let data;
            try {
                data = vega.read(text, {
                    type: dataFile.type,
                    parse: {}
                });
            } catch (e) {
                reject(e);
            }
            if (data) $3d862e0e83f42a97$export$c084150d12efae43(data, dataFile.type).then((dc)=>{
                if (dataFile.snapshotsUrl) fetch(dataFile.snapshotsUrl).then((response)=>response.json()).then((snapshots)=>{
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
        else reject("dataFile object must have either dataUrl or rawText property set.");
    });
const $3d862e0e83f42a97$export$c084150d12efae43 = (data, type)=>new Promise((resolve, reject)=>{
        const parse = type === "csv" || type === "tsv";
        if (parse) //convert empty strings to null so that vega.inferType will get dates
        data.forEach((row)=>{
            for(let column in row)if (row[column] === "") row[column] = null;
        });
        const columns = (0, $3b509b9541e52a8f$exports).util.getColumnsFromData((0, $3b509b9541e52a8f$exports).VegaDeckGl.base.vega.inferTypes, data).filter((c)=>c.name && c.name.trim()).sort((a, b)=>a.name.localeCompare(b.name));
        if (parse) {
            const booleanColumns = columns.filter((c)=>c.type === "boolean");
            const dateColumns = columns.filter((c)=>c.type === "date");
            const numericColumns = columns.filter((c)=>c.type === "integer" || c.type === "number");
            data.forEach((obj)=>{
                booleanColumns.forEach((c)=>{
                    obj[c.name] = ("" + obj[c.name]).toLowerCase() === "true";
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
    });



var $b61671d8f61aadb4$var$util = (0, $3b509b9541e52a8f$exports).VegaDeckGl.util;
const $b61671d8f61aadb4$export$3465a0e7b289ab72 = {};
$b61671d8f61aadb4$export$3465a0e7b289ab72[""] = {
    themePrimary: "#0078d4",
    themeLighterAlt: "#eff6fc",
    themeLighter: "#deecf9",
    themeLight: "#c7e0f4",
    themeTertiary: "#71afe5",
    themeSecondary: "#2b88d8",
    themeDarkAlt: "#106ebe",
    themeDark: "#005a9e",
    themeDarker: "#004578",
    neutralLighterAlt: "#f8f8f8",
    neutralLighter: "#f4f4f4",
    neutralLight: "#eaeaea",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c8c8",
    neutralTertiary: "#c2c2c2",
    neutralSecondary: "#858585",
    neutralPrimaryAlt: "#4b4b4b",
    neutralPrimary: "#333333",
    neutralDark: "#272727",
    black: "#1d1d1d",
    white: "#ffffff"
};
$b61671d8f61aadb4$export$3465a0e7b289ab72["dark-theme"] = {
    themePrimary: "#00b4f0",
    themeLighterAlt: "#00070a",
    themeLighter: "#001d26",
    themeLight: "#003648",
    themeTertiary: "#006c90",
    themeSecondary: "#009ed3",
    themeDarkAlt: "#18bbf1",
    themeDark: "#3ac5f3",
    themeDarker: "#6cd4f6",
    neutralLighterAlt: "#0b0b0b",
    neutralLighter: "#151515",
    neutralLight: "#252525",
    neutralQuaternaryAlt: "#2f2f2f",
    neutralQuaternary: "#373737",
    neutralTertiaryAlt: "#595959",
    neutralTertiary: "#929292",
    neutralSecondary: "#a7a7a7",
    neutralPrimaryAlt: "#b4b4b4",
    neutralPrimary: "#cccccc",
    neutralDark: "#d8d8d8",
    black: "#f5f5f5",
    white: "#000000"
};
function $b61671d8f61aadb4$export$93a255849c3bdb97(themePalette) {
    const c = $b61671d8f61aadb4$var$util.colorFromString(themePalette.themeSecondary);
    c[3] = 256 / 3; // one-third opacity background
    return {
        axisLine: themePalette.black,
        axisText: themePalette.black,
        hoveredCube: themePalette.black,
        clickableText: themePalette.themeDark,
        clickableTextHighlight: $b61671d8f61aadb4$var$util.colorToString(c),
        clickableTextHighlightAlphaCutoff: 0,
        searchText: themePalette.neutralPrimary,
        searchTextHighlight: themePalette.neutralPrimaryAlt
    };
}


const $8bfbb5c28cff0e2c$export$a5975749f0374264 = "Segoe UI, sans-serif";
const $8bfbb5c28cff0e2c$export$fb736e4909afb3d7 = {
    colors: (0, $b61671d8f61aadb4$export$93a255849c3bdb97)((0, $b61671d8f61aadb4$export$3465a0e7b289ab72)[""]),
    fontFamily: $8bfbb5c28cff0e2c$export$a5975749f0374264
};
const $8bfbb5c28cff0e2c$export$7e33de69431bbb06 = 300;







function $7cf7713fac799e39$export$535452b9416b5e17(selected, scheme) {
    return {
        key: scheme,
        text: scheme,
        selected: selected === scheme,
        scheme: scheme,
        children: $7cf7713fac799e39$export$dc7e195cef98649[scheme]
    };
}
const $7cf7713fac799e39$export$dc7e195cef98649 = {};


const $4d291de0a4a37fc7$var$p8 = `${12.5}%`;
const $4d291de0a4a37fc7$var$p9 = `${100 / 9}%`;
const $4d291de0a4a37fc7$var$p10 = `${10}%`;
const $4d291de0a4a37fc7$var$p12 = `${100 / 12}%`;
const $4d291de0a4a37fc7$var$p20 = `${5}%`;
let $4d291de0a4a37fc7$var$loaded = false;
function $4d291de0a4a37fc7$var$load() {
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["accent"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#7fc97f",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(127, 201, 127)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#beaed4",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(190, 174, 212)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fdc086",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(253, 192, 134)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ffff99",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(255, 255, 153)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#386cb0",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(56, 108, 176)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#f0027f",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(240, 2, 127)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#bf5b17",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(191, 91, 23)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#666666",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(102, 102, 102)"
        }
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["category10"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#1f77b4",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(31, 119, 180)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ff7f0e",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(255, 127, 14)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#2ca02c",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(44, 160, 44)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#d62728",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(214, 39, 40)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#9467bd",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(148, 103, 189)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#8c564b",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(140, 86, 75)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e377c2",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(227, 119, 194)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#7f7f7f",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(127, 127, 127)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#bcbd22",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(188, 189, 34)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#17becf",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(23, 190, 207)"
        }
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["category20"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#1f77b4",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(31, 119, 180)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#aec7e8",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(174, 199, 232)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ff7f0e",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(255, 127, 14)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ffbb78",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(255, 187, 120)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#2ca02c",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(44, 160, 44)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#98df8a",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(152, 223, 138)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#d62728",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(214, 39, 40)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ff9896",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(255, 152, 150)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#9467bd",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(148, 103, 189)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#c5b0d5",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(197, 176, 213)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#8c564b",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(140, 86, 75)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#c49c94",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(196, 156, 148)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e377c2",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(227, 119, 194)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#f7b6d2",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(247, 182, 210)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#7f7f7f",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(127, 127, 127)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#c7c7c7",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(199, 199, 199)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#bcbd22",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(188, 189, 34)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#dbdb8d",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(219, 219, 141)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#17becf",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(23, 190, 207)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#9edae5",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(158, 218, 229)"
        }
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["category20b"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#393b79",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(57, 59, 121)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#5254a3",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(82, 84, 163)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#6b6ecf",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(107, 110, 207)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#9c9ede",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(156, 158, 222)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#637939",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(99, 121, 57)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#8ca252",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(140, 162, 82)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#b5cf6b",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(181, 207, 107)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#cedb9c",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(206, 219, 156)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#8c6d31",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(140, 109, 49)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#bd9e39",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(189, 158, 57)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e7ba52",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(231, 186, 82)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e7cb94",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(231, 203, 148)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#843c39",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(132, 60, 57)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ad494a",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(173, 73, 74)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#d6616b",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(214, 97, 107)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e7969c",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(231, 150, 156)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#7b4173",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(123, 65, 115)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#a55194",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(165, 81, 148)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ce6dbd",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(206, 109, 189)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#de9ed6",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(222, 158, 214)"
        }
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["category20c"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#3182bd",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(49, 130, 189)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#6baed6",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(107, 174, 214)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#9ecae1",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(158, 202, 225)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#c6dbef",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(198, 219, 239)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e6550d",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(230, 85, 13)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fd8d3c",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(253, 141, 60)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fdae6b",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(253, 174, 107)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fdd0a2",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(253, 208, 162)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#31a354",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(49, 163, 84)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#74c476",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(116, 196, 118)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#a1d99b",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(161, 217, 155)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#c7e9c0",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(199, 233, 192)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#756bb1",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(117, 107, 177)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#9e9ac8",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(158, 154, 200)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#bcbddc",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(188, 189, 220)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#dadaeb",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(218, 218, 235)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#636363",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(99, 99, 99)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#969696",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(150, 150, 150)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#bdbdbd",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(189, 189, 189)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#d9d9d9",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(217, 217, 217)"
        }
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["dark2"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#1b9e77",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(27, 158, 119)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#d95f02",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(217, 95, 2)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#7570b3",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(117, 112, 179)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e7298a",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(231, 41, 138)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#66a61e",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(102, 166, 30)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e6ab02",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(230, 171, 2)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#a6761d",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(166, 118, 29)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#666666",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(102, 102, 102)"
        }
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["paired"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#a6cee3",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(166, 206, 227)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#1f78b4",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(31, 120, 180)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#b2df8a",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(178, 223, 138)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#33a02c",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(51, 160, 44)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fb9a99",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(251, 154, 153)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e31a1c",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(227, 26, 28)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fdbf6f",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(253, 191, 111)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ff7f00",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(255, 127, 0)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#cab2d6",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(202, 178, 214)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#6a3d9a",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(106, 61, 154)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ffff99",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(255, 255, 153)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#b15928",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(177, 89, 40)"
        }
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["pastel1"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fbb4ae",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(251, 180, 174)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#b3cde3",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(179, 205, 227)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ccebc5",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(204, 235, 197)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#decbe4",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(222, 203, 228)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fed9a6",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(254, 217, 166)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ffffcc",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(255, 255, 204)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e5d8bd",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(229, 216, 189)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fddaec",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(253, 218, 236)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#f2f2f2",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(242, 242, 242)"
        }
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["pastel2"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#b3e2cd",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(179, 226, 205)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fdcdac",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(253, 205, 172)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#cbd5e8",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(203, 213, 232)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#f4cae4",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(244, 202, 228)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e6f5c9",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(230, 245, 201)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fff2ae",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(255, 242, 174)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#f1e2cc",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(241, 226, 204)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#cccccc",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(204, 204, 204)"
        }
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["set1"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e41a1c",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(228, 26, 28)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#377eb8",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(55, 126, 184)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#4daf4a",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(77, 175, 74)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#984ea3",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(152, 78, 163)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ff7f00",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(255, 127, 0)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ffff33",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(255, 255, 51)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#a65628",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(166, 86, 40)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#f781bf",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(247, 129, 191)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#999999",
        style: {
            width: $4d291de0a4a37fc7$var$p9,
            background: "rgb(153, 153, 153)"
        }
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["set2"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#66c2a5",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(102, 194, 165)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fc8d62",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(252, 141, 98)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#8da0cb",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(141, 160, 203)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e78ac3",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(231, 138, 195)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#a6d854",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(166, 216, 84)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ffd92f",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(255, 217, 47)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e5c494",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(229, 196, 148)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#b3b3b3",
        style: {
            width: $4d291de0a4a37fc7$var$p8,
            background: "rgb(179, 179, 179)"
        }
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["set3"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#8dd3c7",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(141, 211, 199)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ffffb3",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(255, 255, 179)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#bebada",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(190, 186, 218)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fb8072",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(251, 128, 114)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#80b1d3",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(128, 177, 211)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fdb462",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(253, 180, 98)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#b3de69",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(179, 222, 105)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fccde5",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(252, 205, 229)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#d9d9d9",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(217, 217, 217)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#bc80bd",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(188, 128, 189)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ccebc5",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(204, 235, 197)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ffed6f",
        style: {
            width: $4d291de0a4a37fc7$var$p12,
            background: "rgb(255, 237, 111)"
        }
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["tableau10"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#4c78a8",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(76, 120, 168)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#f58518",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(245, 133, 24)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e45756",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(228, 87, 86)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#72b7b2",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(114, 183, 178)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#54a24b",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(84, 162, 75)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#eeca3b",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(238, 202, 59)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#b279a2",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(178, 121, 162)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ff9da6",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(255, 157, 166)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#9d755d",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(157, 117, 93)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#bab0ac",
        style: {
            width: $4d291de0a4a37fc7$var$p10,
            background: "rgb(186, 176, 172)"
        }
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["tableau20"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "swatch"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#4c78a8",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(76, 120, 168)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#9ecae9",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(158, 202, 233)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#f58518",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(245, 133, 24)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ffbf79",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(255, 191, 121)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#54a24b",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(84, 162, 75)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#88d27a",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(136, 210, 122)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#b79a20",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(183, 154, 32)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#f2cf5b",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(242, 207, 91)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#439894",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(67, 152, 148)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#83bcb6",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(131, 188, 182)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#e45756",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(228, 87, 86)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#ff9d98",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(255, 157, 152)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#79706e",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(121, 112, 110)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#bab0ac",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(186, 176, 172)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#d67195",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(214, 113, 149)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#fcbfd2",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(252, 191, 210)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#b279a2",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(178, 121, 162)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#d6a5c9",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(214, 165, 201)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#9e765f",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(158, 118, 95)"
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        title: "#d8b5a5",
        style: {
            width: $4d291de0a4a37fc7$var$p20,
            background: "rgb(216, 181, 165)"
        }
    }));
    $4d291de0a4a37fc7$var$loaded = true;
}
function $4d291de0a4a37fc7$export$f3a499247c9822d1(selected) {
    if (!$4d291de0a4a37fc7$var$loaded) $4d291de0a4a37fc7$var$load();
    return [
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "accent"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "category10"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "category20"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "category20b"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "category20c"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "dark2"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "paired"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "pastel1"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "pastel2"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "set1"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "set2"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "set3"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "tableau10"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "tableau20")
    ];
}




let $fb44b4ac1e5f02bf$var$loaded = false;
function $fb44b4ac1e5f02bf$var$load() {
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["blueorange"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-blueorange"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(5, 48, 97)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(34, 101, 163)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(75, 148, 196)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(143, 194, 221)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(205, 227, 238)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(242, 240, 235)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(253, 221, 179)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(248, 182, 100)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(221, 132, 31)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(178, 90, 9)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(127, 59, 8)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-blueorange)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["brownbluegreen"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-brownbluegreen"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(84, 48, 5)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(139, 84, 15)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(188, 132, 53)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(222, 190, 123)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(242, 228, 192)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(238, 241, 234)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(195, 231, 226)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(127, 201, 191)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(57, 152, 143)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(10, 103, 95)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 60, 48)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-brownbluegreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["purplegreen"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-purplegreen"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(64, 0, 75)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(115, 47, 128)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(154, 109, 170)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(193, 164, 205)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(228, 210, 230)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(239, 240, 239)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(214, 238, 209)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(162, 215, 158)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(92, 173, 101)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(33, 120, 57)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 68, 27)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-purplegreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["pinkyellowgreen"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-pinkyellowgreen"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(142, 1, 82)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(192, 38, 126)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(221, 114, 173)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(240, 179, 214)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(250, 221, 237)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(245, 243, 239)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(225, 242, 202)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(182, 222, 135)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(128, 187, 71)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(79, 145, 37)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(39, 100, 25)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-pinkyellowgreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["purpleorange"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-purpleorange"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(45, 0, 75)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(85, 45, 132)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(129, 112, 172)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(176, 170, 208)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(215, 215, 233)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(243, 238, 234)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(253, 221, 179)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(248, 182, 100)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(221, 132, 31)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(178, 90, 9)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(127, 59, 8)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-purpleorange)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["redblue"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-redblue"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(103, 0, 31)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(172, 32, 47)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(213, 96, 80)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(241, 163, 133)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(251, 215, 196)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(242, 239, 238)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(205, 227, 238)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(143, 194, 221)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(75, 148, 196)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(34, 101, 163)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(5, 48, 97)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-redblue)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["redgrey"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-redgrey"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(103, 0, 31)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(172, 32, 47)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(213, 96, 80)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(241, 163, 133)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(252, 216, 197)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(250, 244, 241)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(223, 223, 223)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(184, 184, 184)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(134, 134, 134)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(78, 78, 78)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(26, 26, 26)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-redgrey)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["redyellowblue"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-redyellowblue"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(165, 0, 38)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(212, 50, 44)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(241, 110, 67)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(252, 172, 100)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(254, 221, 144)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(250, 248, 193)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(220, 241, 236)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(171, 214, 232)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(117, 171, 208)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(74, 116, 180)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(49, 54, 149)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-redyellowblue)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["redyellowgreen"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-redyellowgreen"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(165, 0, 38)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(212, 50, 44)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(241, 110, 67)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(252, 172, 99)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(254, 221, 141)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(249, 247, 174)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(215, 238, 142)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(164, 216, 110)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(100, 188, 97)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(34, 150, 79)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 104, 55)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-redyellowgreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["spectral"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-spectral"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(158, 1, 66)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(209, 60, 75)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(240, 112, 74)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(252, 172, 99)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(254, 221, 141)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(251, 248, 176)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(224, 243, 161)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(169, 221, 162)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(105, 189, 169)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(66, 136, 181)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(94, 79, 162)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-spectral)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $fb44b4ac1e5f02bf$var$loaded = true;
}
function $fb44b4ac1e5f02bf$export$ab7b13a7cc99f3af(selected) {
    if (!$fb44b4ac1e5f02bf$var$loaded) $fb44b4ac1e5f02bf$var$load();
    return [
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "blueorange"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "brownbluegreen"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "purplegreen"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "pinkyellowgreen"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "purpleorange"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "redblue"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "redgrey"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "redyellowblue"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "redyellowgreen"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "spectral")
    ];
}






let $2f535d00511be096$var$loaded = false;
function $2f535d00511be096$var$load() {
    (0, $3b509b9541e52a8f$exports).colorSchemes.filter((cs)=>cs.colors.length === 2).map((binaryScheme, i)=>{
        (0, $7cf7713fac799e39$export$dc7e195cef98649)[binaryScheme.scheme] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
            className: "swatch"
        }, binaryScheme.colors.map((color, j)=>(0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                key: j,
                title: color,
                style: {
                    width: "50%",
                    backgroundColor: color
                }
            })));
    });
    $2f535d00511be096$var$loaded = true;
}
function $2f535d00511be096$export$d1699a1bbdf17835(selected) {
    if (!$2f535d00511be096$var$loaded) $2f535d00511be096$var$load();
    return (0, $3b509b9541e52a8f$exports).colorSchemes.filter((cs)=>cs.colors.length === 2).map((binaryScheme, i)=>(0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, binaryScheme.scheme));
}






let $0876d32c36a80de2$var$loaded = false;
function $0876d32c36a80de2$var$load() {
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["viridis"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-viridis"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "#440154"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "#482475"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "#414487"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "#355f8d"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "#2a788e"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "#21918c"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "#22a884"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "#44bf70"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "#7ad151"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "#bddf26"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "#fde725"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-viridis)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["inferno"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-inferno"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "#000004"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "#160b39"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "#420a68"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "#6a176e"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "#932667"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "#bc3754"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "#dd513a"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "#f37819"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "#fca50a"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "#f6d746"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "#fcffa4"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-inferno)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["magma"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-magma"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "#000004"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "#140e36"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "#3b0f70"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "#641a80"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "#8c2981"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "#b73779"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "#de4968"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "#f7705c"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "#fe9f6d"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "#fecf92"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "#fcfdbf"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-magma)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["plasma"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-plasma"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "#0d0887"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "#41049d"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "#6a00a8"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "#8f0da4"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "#b12a90"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "#cc4778"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "#e16462"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "#f2844b"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "#fca636"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "#fcce25"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "#f0f921"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-plasma)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["bluegreen"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-bluegreen"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(247, 252, 253)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(232, 246, 249)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(213, 239, 237)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(183, 228, 218)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(143, 211, 193)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(104, 194, 163)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(73, 177, 127)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(47, 153, 89)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(21, 127, 60)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(3, 100, 41)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 68, 27)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-bluegreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["bluepurple"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-bluepurple"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(247, 252, 253)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(228, 238, 245)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(204, 221, 236)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(178, 202, 225)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(156, 179, 213)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(143, 149, 198)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(140, 116, 181)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(137, 82, 165)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(133, 45, 143)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(115, 15, 113)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(77, 0, 75)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-bluepurple)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["greenblue"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-greenblue"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(247, 252, 240)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(229, 245, 223)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(211, 238, 206)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(189, 229, 191)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(158, 217, 187)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(123, 203, 196)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(88, 183, 205)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(57, 156, 198)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(29, 126, 183)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(11, 96, 161)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(8, 64, 129)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-greenblue)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["orangered"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-orangered"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 247, 236)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(254, 235, 207)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(253, 220, 175)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(253, 202, 148)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(253, 176, 122)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(250, 142, 93)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(241, 108, 73)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(224, 69, 48)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(200, 29, 19)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(167, 4, 3)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(127, 0, 0)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-orangered)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["purplebluegreen"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-purplebluegreen"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 247, 251)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(239, 231, 242)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(219, 216, 234)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(190, 201, 226)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(152, 185, 217)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(105, 168, 207)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(64, 150, 192)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(25, 135, 159)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(3, 120, 119)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(1, 99, 83)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(1, 70, 54)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-purplebluegreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["purpleblue"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-purpleblue"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 247, 251)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(239, 234, 244)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(219, 218, 235)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(191, 201, 226)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(155, 185, 217)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(114, 168, 207)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(67, 148, 195)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(26, 125, 182)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(6, 103, 161)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(4, 82, 129)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(2, 56, 88)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-purpleblue)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["purplered"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-purplered"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(247, 244, 249)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(234, 227, 240)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(220, 201, 226)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(208, 170, 210)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(208, 138, 194)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(221, 99, 174)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(227, 56, 144)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(215, 28, 108)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(183, 11, 79)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(143, 2, 58)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(103, 0, 31)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-purplered)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["redpurple"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-redpurple"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 247, 243)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(253, 228, 225)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(252, 207, 204)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(251, 181, 188)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(249, 147, 176)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(243, 105, 163)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(224, 62, 152)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(192, 23, 136)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(153, 3, 124)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(112, 1, 116)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(73, 0, 106)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-redpurple)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["yellowgreenblue"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-yellowgreenblue"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 255, 217)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(239, 249, 189)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(213, 238, 179)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(169, 221, 183)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(115, 201, 189)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(69, 180, 194)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(40, 151, 191)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(32, 115, 178)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(35, 78, 160)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(28, 49, 133)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(8, 29, 88)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-yellowgreenblue)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["yellowgreen"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-yellowgreen"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 255, 229)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(247, 252, 196)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(228, 244, 172)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(199, 232, 155)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(162, 216, 138)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(120, 197, 120)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(78, 175, 99)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(47, 148, 78)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(21, 121, 63)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(3, 96, 52)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 69, 41)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-yellowgreen)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["yelloworangebrown"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-yelloworangebrown"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 255, 229)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(255, 248, 196)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(254, 234, 161)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(254, 214, 118)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(254, 186, 74)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(251, 153, 44)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(238, 121, 24)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(216, 91, 10)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(183, 67, 4)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(143, 50, 4)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(102, 37, 6)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-yelloworangebrown)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["yelloworangered"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-yelloworangered"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 255, 204)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(255, 240, 169)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(254, 224, 135)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(254, 201, 101)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(254, 171, 75)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(253, 137, 60)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(250, 92, 46)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(236, 48, 35)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(211, 17, 33)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(175, 2, 37)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(128, 0, 38)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-yelloworangered)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $0876d32c36a80de2$var$loaded = true;
}
function $0876d32c36a80de2$export$a4fd36c4882aa76e(selected) {
    if (!$0876d32c36a80de2$var$loaded) $0876d32c36a80de2$var$load();
    return [
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "viridis"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "inferno"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "magma"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "plasma"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "bluegreen"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "bluepurple"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "greenblue"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "orangered"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "purplebluegreen"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "purpleblue"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "purplered"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "redpurple"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "yellowgreenblue"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "yellowgreen"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "yelloworangebrown"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "yelloworangered")
    ];
}




let $39078f876ce15481$var$loaded = false;
function $39078f876ce15481$var$load() {
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["blues"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-blues"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(247, 251, 255)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(227, 238, 249)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(207, 225, 242)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(181, 212, 233)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(147, 195, 223)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(109, 174, 213)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(75, 151, 201)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(47, 126, 188)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(24, 100, 170)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(10, 74, 144)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(8, 48, 107)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-blues)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["greens"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-greens"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(247, 252, 245)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(232, 246, 227)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(211, 238, 205)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(183, 226, 177)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(151, 212, 148)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(115, 195, 120)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(77, 175, 98)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(47, 152, 79)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(21, 127, 59)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(3, 100, 41)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 68, 27)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-greens)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["greys"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-greys"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 255, 255)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(242, 242, 242)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(226, 226, 226)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(206, 206, 206)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(180, 180, 180)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(151, 151, 151)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(122, 122, 122)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(95, 95, 95)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(64, 64, 64)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(30, 30, 30)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(0, 0, 0)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-greys)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["purples"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-purples"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(252, 251, 253)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(241, 239, 246)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(226, 225, 239)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(206, 206, 229)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(182, 181, 216)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(158, 155, 201)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(135, 130, 188)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(115, 99, 172)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(97, 64, 155)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(80, 31, 140)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(63, 0, 125)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-purples)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["reds"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-reds"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 245, 240)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(254, 227, 214)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(253, 201, 180)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(252, 170, 142)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(252, 138, 107)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(249, 105, 76)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(239, 69, 51)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(217, 39, 35)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(187, 21, 26)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(151, 11, 19)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(103, 0, 13)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-reds)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    (0, $7cf7713fac799e39$export$dc7e195cef98649)["oranges"] = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("svg", {
        viewBox: "0,0,1,1",
        preserveAspectRatio: "none"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("defs", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("linearGradient", {
        id: "gradient-oranges"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "0%",
        stopColor: "rgb(255, 245, 235)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "10%",
        stopColor: "rgb(254, 232, 211)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "20%",
        stopColor: "rgb(253, 216, 179)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "30%",
        stopColor: "rgb(253, 194, 140)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "40%",
        stopColor: "rgb(253, 167, 98)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "50%",
        stopColor: "rgb(251, 141, 61)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "60%",
        stopColor: "rgb(242, 112, 29)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "70%",
        stopColor: "rgb(226, 86, 9)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "80%",
        stopColor: "rgb(196, 65, 3)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "90%",
        stopColor: "rgb(159, 51, 3)"
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("stop", {
        offset: "100%",
        stopColor: "rgb(127, 39, 4)"
    }))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("rect", {
        fill: "url(#gradient-oranges)",
        x: "0",
        y: "0",
        width: "1",
        height: "1"
    }));
    $39078f876ce15481$var$loaded = true;
}
function $39078f876ce15481$export$9b3c8b6a286fd957(selected) {
    if (!$39078f876ce15481$var$loaded) $39078f876ce15481$var$load();
    return [
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "blues"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "greens"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "greys"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "purples"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "reds"),
        (0, $7cf7713fac799e39$export$535452b9416b5e17)(selected, "oranges")
    ];
}



const $37d271b3645ead65$var$maxDistinctColors = 20;
function $37d271b3645ead65$export$e2fbaa661ec19dbf(props) {
    const { distinctValueCount: distinctValueCount  } = props.colorColumn.stats;
    let isDual = distinctValueCount === 2;
    const categoricalNumeric = distinctValueCount > 0 && distinctValueCount < $37d271b3645ead65$var$maxDistinctColors;
    let isQualitative = false;
    let isQuantitative = false;
    switch(props.colorColumn.type){
        case "boolean":
        case "string":
            isQualitative = true;
            break;
        case "number":
            isQuantitative = true;
            break;
        case "date":
        case "integer":
            isQuantitative = true;
            isQualitative = categoricalNumeric;
    }
    const selected = props.scheme;
    const options = [];
    function menu(name, opts) {
        options.push({
            key: name,
            text: name,
            itemType: (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DropdownMenuItemType.Header
        });
        options.push.apply(options, opts);
    }
    isQualitative && menu((0, $0db66385c00a3f15$export$21c51bc433c16634).schemeCategorical, (0, $4d291de0a4a37fc7$export$f3a499247c9822d1)(selected));
    isQuantitative && menu((0, $0db66385c00a3f15$export$21c51bc433c16634).schemeSequentialSingleHue, (0, $39078f876ce15481$export$9b3c8b6a286fd957)(selected));
    isQuantitative && menu((0, $0db66385c00a3f15$export$21c51bc433c16634).schemeSequentialMultiHue, (0, $0876d32c36a80de2$export$a4fd36c4882aa76e)(selected));
    isQuantitative && menu((0, $0db66385c00a3f15$export$21c51bc433c16634).schemeDiverging, (0, $fb44b4ac1e5f02bf$export$ab7b13a7cc99f3af)(selected));
    isDual && menu((0, $0db66385c00a3f15$export$21c51bc433c16634).schemeDual, (0, $2f535d00511be096$export$d1699a1bbdf17835)(selected));
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sanddance-palette"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sanddance-explanation",
        dangerouslySetInnerHTML: {
            __html: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColorFieldInfo(props.colorColumn.name, props.colorColumn.type, categoricalNumeric, distinctValueCount)
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $01c4eef7f720da5f$export$931cbfb6bfb85fc), {
        collapseLabel: props.collapseLabel,
        disabled: props.disabled,
        dropdownWidth: 400,
        label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColorScheme,
        onRenderOption: (option)=>{
            if (option.itemType === (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DropdownMenuItemType.Header) return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("span", null, option.text);
            else return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                className: "sanddance-scheme option"
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("span", {
                className: "name"
            }, option.scheme), option.children);
        },
        options: options,
        onChange: (e, o)=>{
            props.changeColorScheme(o.scheme);
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: (0, $a1d9524814b1e23a$exports).classList("sanddance-scheme", props.disabled && "disabled")
    }, props.scheme && (0, $7cf7713fac799e39$export$dc7e195cef98649)[props.scheme]));
}





function $0db948ac6e4b75cc$export$892596cec99bc70e(props) {
    const colorColumn = props.dataContent.columns.filter((c)=>c.name === props.colorColumn)[0];
    const disabledColorBin = !colorColumn || !colorColumn.quantitative || props.directColor;
    const colorBin = props.colorBin || "quantize";
    const dropdownRef = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createRef();
    props.explorer.dialogFocusHandler.focus = ()=>{
        var _a;
        return (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sanddance-color-dialog"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
        label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColor
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $f3c9564b99b49be4$export$83b9e0badda50eeb), Object.assign({}, props, {
        componentRef: dropdownRef,
        collapseLabel: props.compactUI,
        selectedColumnName: props.colorColumn,
        specRole: props.specCapabilities && props.specCapabilities.roles.filter((r)=>r.role === "color")[0],
        key: 0
    })), colorColumn && colorColumn.isColorData && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sanddance-explanation",
        dangerouslySetInnerHTML: {
            __html: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColorFieldIsColorData(colorColumn.name)
        }
    }), colorColumn && !colorColumn.isColorData && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $37d271b3645ead65$export$e2fbaa661ec19dbf), {
        collapseLabel: props.compactUI,
        scheme: props.scheme,
        colorColumn: colorColumn,
        changeColorScheme: (scheme)=>{
            props.onColorSchemeChange(scheme);
        },
        disabled: props.disabled || props.directColor || colorColumn && colorColumn.isColorData
    }), colorColumn && !colorColumn.isColorData && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $9c14fe62b8e7ad84$export$8210dfe1863c478), {
        disabled: props.disabled || !colorColumn || props.directColor || colorColumn && colorColumn.isColorData,
        signal: props.colorReverseSignal,
        explorer: props.explorer,
        onChange: props.onColorReverseChange,
        collapseLabel: props.compactUI
    })), colorColumn && !colorColumn.isColorData && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
        label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColorBin
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sanddance-explanation"
    }, (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColorBinExplanation), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.ChoiceGroup, {
        options: [
            {
                key: "continuous",
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColorBinNone,
                checked: colorBin === "continuous",
                disabled: disabledColorBin
            },
            {
                key: "quantize",
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColorBinQuantize,
                checked: colorBin === "quantize",
                disabled: disabledColorBin
            },
            {
                key: "quantile",
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColorBinQuantile,
                checked: colorBin === "quantile",
                disabled: disabledColorBin
            }
        ],
        onChange: (e, o)=>{
            props.onColorBinChange(o.key);
        }
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $9c14fe62b8e7ad84$export$8210dfe1863c478), {
        disabled: props.disabled || disabledColorBin || props.colorBin === "continuous",
        signal: props.colorBinSignal,
        explorer: props.explorer,
        onChange: props.onColorBinCountChange,
        collapseLabel: props.compactUI
    })), colorColumn && !colorColumn.isColorData && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
        label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelColorOptions
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Toggle, {
        label: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectDirectColor,
        disabled: !colorColumn.stats.hasColorData,
        checked: !!(colorColumn.stats.hasColorData && props.directColor),
        onChange: (e, checked)=>props.onDirectColorChange(checked)
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sanddance-explanation",
        dangerouslySetInnerHTML: {
            __html: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelDataColors
        }
    })));
}





const $dbe34e1e2a9121ef$export$ec835b702d42f3f0 = {
    ENTER: 13
};




function $e4a6dc900077dd85$var$isNumber(value) {
    if (typeof value === "number") return true;
    if (!isNaN(value)) return true;
    return false;
}
function $e4a6dc900077dd85$var$isBoolean(value) {
    if (typeof value === "boolean") return true;
    if (typeof value === "string") switch(value.toLowerCase()){
        case "true":
        case "false":
            return true;
    }
    return false;
}
function $e4a6dc900077dd85$var$bingSearchLink(column, value) {
    if ($e4a6dc900077dd85$var$isNumber(value)) return null;
    if ($e4a6dc900077dd85$var$isBoolean(value)) return null;
    if (column && column.stats.distinctValueCount === 2) return null;
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "bing-search"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("a", {
        href: `https://www.bing.com/search?q=${encodeURIComponent(value)}`,
        target: "_blank",
        title: (0, $0db66385c00a3f15$export$21c51bc433c16634).bingsearchDescription(value),
        "aria-label": (0, $0db66385c00a3f15$export$21c51bc433c16634).bingsearchDescription(value)
    }, (0, $0db66385c00a3f15$export$21c51bc433c16634).bingsearch));
}
function $e4a6dc900077dd85$var$displayValue(value) {
    switch(value){
        case "":
            return {
                special: true,
                display: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelBlank
            };
        case null:
            return {
                special: true,
                display: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelNull
            };
        case true:
            return {
                special: true,
                display: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelTrue
            };
        case false:
            return {
                special: true,
                display: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelFalse
            };
        default:
            if (typeof value === "object") {
                if (value instanceof Date) {
                    const d = value;
                    return $e4a6dc900077dd85$var$displayValue(d.input);
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
function $e4a6dc900077dd85$var$displayValueElement(nvp) {
    const d = $e4a6dc900077dd85$var$displayValue(nvp.value);
    if (d.special) return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("i", null, d.display);
    return d.display;
}
function $e4a6dc900077dd85$export$e9ab04247990d50b(props) {
    if (!props.item) return null;
    const nameValuePairs = [];
    for(let columnName in props.item){
        if (columnName === (0, $3b509b9541e52a8f$exports).constants.GL_ORDINAL && !props.showSystemFields) continue;
        if ((0, $3b509b9541e52a8f$exports).util.isInternalFieldName(columnName)) continue;
        let nameValuePair = {
            columnName: columnName,
            value: props.item[columnName]
        };
        if (!props.bingSearchDisabled) nameValuePair.bingSearch = $e4a6dc900077dd85$var$bingSearchLink(props.columns.filter((c)=>c.name === columnName)[0], props.item[columnName]);
        nameValuePairs.push(nameValuePair);
    }
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "sanddance-dataItem"
    }, nameValuePairs.map((nameValuePair, i)=>{
        const ex = {
            key: 0,
            name: nameValuePair.columnName,
            operator: "==",
            value: nameValuePair.value
        };
        if (nameValuePair.value === null || nameValuePair.value === "") {
            ex.operator = "isnullorEmpty";
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
        const title = (0, $0db66385c00a3f15$export$21c51bc433c16634).tooltipSearch(nameValuePair.columnName, $e4a6dc900077dd85$var$displayValue(nameValuePair.value).display);
        return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
            key: i,
            onClick: !props.disabled ? searchClick : null,
            title: title,
            onKeyUp: (e)=>{
                if (e.keyCode === (0, $dbe34e1e2a9121ef$export$ec835b702d42f3f0).ENTER) searchClick(e);
            },
            tabIndex: 0,
            className: "name-value"
        }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
            className: "column-name"
        }, nameValuePair.columnName), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
            className: "column-value"
        }, $e4a6dc900077dd85$var$displayValueElement(nameValuePair)), nameValuePair.bingSearch);
    }));
}







function $0829079b3c747bdc$export$1ce2294f62fa7154(props) {
    function activateRecord(newIndex) {
        props.onActivate(props.data[newIndex], newIndex);
    }
    const { index: index  } = props;
    const length = props.data && props.data.length || 0;
    const dropdownRef = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createRef();
    props.explorer.dialogFocusHandler.focus = ()=>{
        var _a;
        return (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
        label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelDataBrowser,
        className: "sanddance-dataIndex"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $01c4eef7f720da5f$export$931cbfb6bfb85fc), {
        componentRef: dropdownRef,
        label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelDataScope,
        collapseLabel: true,
        options: [
            {
                key: (0, $99df88aa84de796a$export$f0297ce57faf7d71).AllData,
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectDataSpanAll,
                isSelected: props.selectedDataScope === (0, $99df88aa84de796a$export$f0297ce57faf7d71).AllData
            },
            {
                key: (0, $99df88aa84de796a$export$f0297ce57faf7d71).FilteredData,
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectDataSpanFilter,
                isSelected: props.selectedDataScope === (0, $99df88aa84de796a$export$f0297ce57faf7d71).FilteredData
            },
            {
                key: (0, $99df88aa84de796a$export$f0297ce57faf7d71).SelectedData,
                text: (0, $0db66385c00a3f15$export$21c51bc433c16634).selectDataSpanSelection,
                isSelected: props.selectedDataScope === (0, $99df88aa84de796a$export$f0297ce57faf7d71).SelectedData
            }
        ],
        onChange: (e, o)=>{
            props.onDataScopeClick(o.key);
        }
    }), !props.data && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        dangerouslySetInnerHTML: {
            __html: props.nullMessage
        }
    }), props.data && !props.data.length && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, props.zeroMessage), !!length && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "index"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $adfb025456b8f57f$export$c25acd513dcc8062), {
        themePalette: props.themePalette,
        iconName: "ChevronLeftMed",
        onClick: (e)=>activateRecord(index <= 0 ? length - 1 : index - 1),
        disabled: props.disabled || length === 1,
        title: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonPrevDataItem
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("span", null, (0, $0db66385c00a3f15$export$21c51bc433c16634).record(index + 1, length)), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $adfb025456b8f57f$export$c25acd513dcc8062), {
        themePalette: props.themePalette,
        iconName: "ChevronRightMed",
        onClick: (e)=>activateRecord(index >= length - 1 ? 0 : index + 1),
        disabled: props.disabled || length === 1,
        title: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonNextDataItem
    })), !props.itemVisible && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        className: "item-filtered"
    }, (0, $0db66385c00a3f15$export$21c51bc433c16634).labelDataItemIsFiltered), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $e4a6dc900077dd85$export$e9ab04247990d50b), {
        columns: props.columns,
        item: props.data[index],
        disabled: props.disabled,
        onSearch: props.onSearch,
        bingSearchDisabled: props.bingSearchDisabled
    })), props.dataExportHandler && props.data && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $e98d3084b701f145$export$b1b568728c48eba1), {
        theme: props.theme,
        initializer: {
            fileName: `${(0, $e98d3084b701f145$export$748f956e607b675b)(props.displayName)} (${props.data.length})`
        },
        data: props.data,
        dataExportHandler: props.dataExportHandler,
        disabled: props.disabled
    }));
}







function $0820350effaa56a9$export$84202caead5689ba(props) {
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8d43140d74b3b13d$export$eb2fcfdbd7ba97d4), {
        label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelHistory,
        className: "sanddance-history"
    }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("ol", null, props.historyItems.map((hi, i)=>{
        let ref;
        if (i === props.historyIndex) {
            ref = (0, $8535c575077b9670$export$e2253033e6e1df16).react.createRef();
            props.explorer.dialogFocusHandler.focus = ()=>{
                var _a;
                (_a = ref.current) === null || _a === void 0 || _a.focus();
            };
        }
        return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("li", {
            key: i,
            className: (0, $a1d9524814b1e23a$exports).classList(i === props.historyIndex && "selected"),
            onKeyUp: (e)=>{
                if (e.keyCode === (0, $dbe34e1e2a9121ef$export$ec835b702d42f3f0).ENTER) props.redo(i);
            }
        }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DefaultButton, {
            className: "sanddance-history-button",
            componentRef: ref,
            text: hi.label,
            onClick: ()=>props.redo(i)
        }));
    })));
}








// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
function $68fd7b14b397ce6c$var$hasClientXY(e) {
    if (e && e.clientX !== undefined && e.clientX !== undefined) return {
        top: e.clientY,
        left: e.clientX
    };
}
function $68fd7b14b397ce6c$export$1690e12b840569b9(e) {
    let xy = $68fd7b14b397ce6c$var$hasClientXY(e);
    if (xy) return xy;
    const te = e;
    if (te === null || te === void 0 ? void 0 : te.touches) for(let i = 0; i < te.touches.length; i++){
        let xy = $68fd7b14b397ce6c$var$hasClientXY(te.touches[i]);
        if (xy) return xy;
    }
    const el = e.target;
    if (el && el.getClientRects) return el.getClientRects()[0];
}



function $b16b30fb0ba8a026$export$1915de5807f54194(prefs, partialInsight) {
    if (partialInsight) {
        const specTypePrefs = prefs[partialInsight.chart] || {};
        prefs[partialInsight.chart] = specTypePrefs;
        for(let _role in partialInsight.columns){
            let role = _role;
            if (role === "color" || role === "x") {
                let rolePrefs = specTypePrefs[role] || {};
                specTypePrefs[role] = rolePrefs;
                let column = partialInsight.columns[role];
                let copySignalValue = (signalName)=>{
                    if (partialInsight.signalValues && partialInsight.signalValues[signalName] && rolePrefs[column]) {
                        const signalValues = rolePrefs[column].signalValues || {};
                        signalValues[signalName] = partialInsight.signalValues[signalName];
                        rolePrefs[column].signalValues = signalValues;
                    }
                };
                switch(role){
                    case "color":
                        rolePrefs[column] = {
                            scheme: partialInsight.scheme,
                            colorBin: partialInsight.colorBin
                        };
                        copySignalValue((0, $3b509b9541e52a8f$exports).constants.SignalNames.ColorBinCount);
                        break;
                    case "x":
                        copySignalValue((0, $3b509b9541e52a8f$exports).constants.SignalNames.XBins);
                        break;
                }
            }
        }
    }
}
function $b16b30fb0ba8a026$export$c2992dc6411becf6(prefs, chart, role, column, signalName, signalValue) {
    const partialInsight = $b16b30fb0ba8a026$export$a14483004c11686f(prefs, chart, role, column, {
        signalValues: {}
    });
    partialInsight.signalValues[signalName] = signalValue;
}
function $b16b30fb0ba8a026$export$318d2f27a5d54aff(prefs, chart, role, columnName) {
    const specTypePrefs = (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.deepMerge({}, prefs["*"], prefs[chart]);
    const rolePrefs = (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.deepMerge({}, specTypePrefs["*"], specTypePrefs[role]);
    const partialInsight = (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.deepMerge({}, rolePrefs["*"], rolePrefs[columnName]);
    return partialInsight;
}
function $b16b30fb0ba8a026$export$a14483004c11686f(prefs, chart, role, column, partialInsight) {
    const SpecTypePrefs = prefs[chart] || {};
    prefs[chart] = SpecTypePrefs;
    const rolePrefs = SpecTypePrefs[role] || {};
    SpecTypePrefs[role] = rolePrefs;
    rolePrefs[column] = (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.deepMerge({}, rolePrefs[column], partialInsight);
    return rolePrefs[column];
}




function $e0216832bbbcfdeb$var$comparableGroup(group) {
    return Object.assign(Object.assign({}, group), {
        clause: null
    });
}
function $e0216832bbbcfdeb$var$compareGroup(a, b) {
    return (0, $3b509b9541e52a8f$exports).searchExpression.compareGroup($e0216832bbbcfdeb$var$comparableGroup(a), $e0216832bbbcfdeb$var$comparableGroup(b));
}
function $e0216832bbbcfdeb$export$2e59f49d97a9dbde(haystack, needle) {
    const groups = [];
    let found = false;
    //look for item in all
    haystack.forEach((group)=>{
        if ($e0216832bbbcfdeb$var$compareGroup(group, needle)) //if it exists, don't add it
        found = true;
        else groups.push(group);
    });
    return {
        groups: groups,
        found: found
    };
}




const $b935bf5e2863e486$var$dataBrowserZeroMessages = {};
$b935bf5e2863e486$var$dataBrowserZeroMessages[(0, $99df88aa84de796a$export$f0297ce57faf7d71).AllData] = (0, $0db66385c00a3f15$export$21c51bc433c16634).labelZeroAll;
$b935bf5e2863e486$var$dataBrowserZeroMessages[(0, $99df88aa84de796a$export$f0297ce57faf7d71).FilteredData] = null; //empty array is not used
$b935bf5e2863e486$var$dataBrowserZeroMessages[(0, $99df88aa84de796a$export$f0297ce57faf7d71).SelectedData] = (0, $0db66385c00a3f15$export$21c51bc433c16634).labelZeroSearchResults;
const $b935bf5e2863e486$var$dataBrowserNullMessages = {};
$b935bf5e2863e486$var$dataBrowserNullMessages[(0, $99df88aa84de796a$export$f0297ce57faf7d71).AllData] = (0, $0db66385c00a3f15$export$21c51bc433c16634).labelDataNullAll;
$b935bf5e2863e486$var$dataBrowserNullMessages[(0, $99df88aa84de796a$export$f0297ce57faf7d71).FilteredData] = (0, $0db66385c00a3f15$export$21c51bc433c16634).labelDataNullFiltered;
$b935bf5e2863e486$var$dataBrowserNullMessages[(0, $99df88aa84de796a$export$f0297ce57faf7d71).SelectedData] = (0, $0db66385c00a3f15$export$21c51bc433c16634).labelDataNullSelection;
function $b935bf5e2863e486$var$createInputSearch(search) {
    const groups = (0, $3b509b9541e52a8f$exports).searchExpression.ensureSearchExpressionGroupArray(search);
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
function $b935bf5e2863e486$var$_Explorer(props1) {
    class __Explorer extends (0, $8535c575077b9670$export$e2253033e6e1df16).react.Component {
        constructor(props){
            super(props);
            this.dialogFocusHandler = {};
            this.state = {
                calculating: null,
                errors: null,
                autoCompleteDistinctValues: {},
                colorBin: null,
                dataContent: null,
                dataFile: null,
                search: null,
                totalStyle: null,
                facetStyle: "wrap",
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
                chart: "grid",
                signalValues: null,
                hideAxes: false,
                hideLegend: false,
                sideTabId: (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).ChartType,
                dataScopeId: (0, $99df88aa84de796a$export$f0297ce57faf7d71).AllData,
                selectedItemIndex: {},
                sidebarClosed: false,
                sidebarPinned: true,
                view: props.initialView || "2d",
                snapshots: [],
                selectedSnapshotIndex: -1,
                tooltipExclusions: [],
                positionedColumnMapProps: null,
                note: null,
                historyIndex: -1,
                historyItems: []
            };
            this.state.selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).AllData] = 0;
            this.state.selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).FilteredData] = 0;
            this.state.selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).SelectedData] = 0;
            this.snapshotThumbWidth = (0, $8bfbb5c28cff0e2c$export$7e33de69431bbb06);
            this.discardColorContextUpdates = true;
            this.updateViewerOptions(Object.assign(Object.assign({}, (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.clone((0, $3b509b9541e52a8f$exports).Viewer.defaultViewerOptions)), props.viewerOptions));
        }
        finalize() {
            if (this.viewer) this.viewer.finalize();
        }
        updateViewerOptions(viewerOptions) {
            this.viewerOptions = Object.assign(Object.assign({}, (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.deepMerge((0, $8bfbb5c28cff0e2c$export$fb736e4909afb3d7), this.viewerOptions, viewerOptions)), {
                tooltipOptions: {
                    exclude: (columnName)=>this.state.tooltipExclusions.indexOf(columnName) >= 0
                },
                onColorContextChange: ()=>this.manageColorToolbar(),
                onDataFilter: (filter, filteredData)=>{
                    const selectedItemIndex = Object.assign({}, this.state.selectedItemIndex);
                    selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).FilteredData] = 0;
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
                    if (this.state.sideTabId === (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Data && this.state.dataScopeId === (0, $99df88aa84de796a$export$f0297ce57faf7d71).FilteredData) //make sure item is active
                    requestAnimationFrame(()=>filteredData && this.silentActivation(filteredData[0]));
                    viewerOptions && viewerOptions.onDataFilter && viewerOptions.onDataFilter(filter, filteredData);
                },
                onSelectionChanged: (newSearch, index, selectedData)=>{
                    if (this.ignoreSelectionChange) return;
                    const selectedItemIndex = Object.assign({}, this.state.selectedItemIndex);
                    selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).SelectedData] = index || 0;
                    let { search: search  } = this.state;
                    const { sideTabId: sideTabId  } = this.state;
                    if (newSearch) search = $b935bf5e2863e486$var$createInputSearch(newSearch);
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
                    const pos = (0, $68fd7b14b397ce6c$export$1690e12b840569b9)(e);
                    const specRole = this.state.specCapabilities && this.state.specCapabilities.roles.filter((r)=>r.role === "color")[0];
                    const positionedColumnMapProps = Object.assign(Object.assign({}, this.getColumnMapBaseProps()), {
                        collapseLabel: true,
                        container: this.div,
                        selectedColumnName: this.state.columns["color"],
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
                onBeforeCreateLayers: $1f0c6e0f0abb4f2d$export$dd264fd5c92b73c6,
                getTextColor: (o)=>{
                    if (o.specRole) return (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.colorFromString(this.viewerOptions.colors.clickableText);
                    else if (o.metaData && o.metaData.search) return (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.colorFromString(this.viewerOptions.colors.searchText);
                    else return o.color;
                },
                getTextHighlightAlphaCutoff: ()=>this.viewerOptions.colors.clickableTextHighlightAlphaCutoff,
                getTextHighlightColor: (o)=>{
                    if (o.specRole) return (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.colorFromString(this.viewerOptions.colors.clickableTextHighlight);
                    else if (o.metaData && o.metaData.search) return (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.colorFromString(this.viewerOptions.colors.searchTextHighlight);
                    else return [
                        0,
                        0,
                        0,
                        0
                    ];
                },
                onTextClick: (e, text)=>{
                    if (e && text) {
                        const pos = (0, $68fd7b14b397ce6c$export$1690e12b840569b9)(e);
                        const { specRole: specRole  } = text;
                        if (pos && specRole) {
                            const positionedColumnMapProps = Object.assign(Object.assign({}, this.getColumnMapBaseProps()), {
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
                const newPresenterStyle = (0, $3b509b9541e52a8f$exports).util.getPresenterStyle(this.viewerOptions);
                const mergePrenterStyle = Object.assign(Object.assign({}, this.viewer.presenter.style), newPresenterStyle);
                this.viewer.presenter.style = mergePrenterStyle;
                this.viewer.options = (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.deepMerge(this.viewer.options, this.props.viewerOptions, this.viewerOptions);
            }
        }
        signal(signalName, signalValue, newViewStateTarget) {
            switch(signalName){
                case (0, $3b509b9541e52a8f$exports).constants.SignalNames.ColorBinCount:
                case (0, $3b509b9541e52a8f$exports).constants.SignalNames.ColorReverse:
                case (0, $3b509b9541e52a8f$exports).constants.SignalNames.MarkOpacity:
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
            (0, $1ea281e0bf69aeed$export$225a002951c27da7)(this.viewer.presenter, !!this.state.columns.color, {
                themePalette: (0, $b61671d8f61aadb4$export$3465a0e7b289ab72)[this.props.theme || ""],
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
        setInsight(historyAction, newState = {}, partialInsight = this.viewer.getInsight(), rebaseFilter = false) {
            const selectedItemIndex = Object.assign({}, this.state.selectedItemIndex);
            selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).AllData] = 0;
            selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).FilteredData] = 0;
            selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).SelectedData] = 0;
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
                search: $b935bf5e2863e486$var$createInputSearch(historicInsight.filter)
            }, newState);
            const changeInsight = ()=>{
                this.getColorContext = null;
                this.changeInsight(historicInsight, historyAction, state);
            };
            const currentFilter = this.viewer.getInsight().filter;
            if (rebaseFilter && currentFilter && historicInsight.filter) {
                if ((0, $3b509b9541e52a8f$exports).searchExpression.startsWith(historicInsight.filter, currentFilter)) changeInsight();
                else this.viewer.reset().then(()=>new Promise((resolve, reject)=>{
                        setTimeout(resolve, this.viewer.options.transitionDurations.scope);
                    })).then(changeInsight);
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
            if (typeof snapshotOrIndex === "number") {
                const selectedSnapshotIndex = snapshotOrIndex;
                const snapshot = this.state.snapshots[selectedSnapshotIndex];
                const newState = {
                    note: snapshot.description,
                    selectedSnapshotIndex: selectedSnapshotIndex
                };
                if (!this.state.sidebarClosed) {
                    newState.sideTabId = (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Snapshots;
                    this.scrollSnapshotIntoView(selectedSnapshotIndex);
                }
                this.setInsight({
                    label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelHistoryReviveSnapshot
                }, newState, snapshot.insight, true);
            } else {
                const snapshot = snapshotOrIndex;
                if (snapshot.insight) this.setInsight({
                    label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelHistoryReviveSnapshot
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
                    this.prefs = optionsOrPrefs && optionsOrPrefs.chartPrefs || optionsOrPrefs || {};
                    if (getPartialInsight) {
                        partialInsight = getPartialInsight(dataContent.columns);
                        (0, $b16b30fb0ba8a026$export$1915de5807f54194)(this.prefs, partialInsight);
                    }
                    if (!partialInsight) {
                        //load recommendation
                        let r = new (0, $72367f17ca00272b$exports.RecommenderSummary)(dataContent.columns, dataContent.data);
                        partialInsight = r.recommend();
                    }
                    partialInsight = Object.assign({
                        facetStyle: "wrap",
                        filter: null,
                        totalStyle: null,
                        transform: null
                    }, partialInsight);
                    if (partialInsight.chart === "barchart") partialInsight.chart = "barchartV";
                    const selectedItemIndex = Object.assign({}, this.state.selectedItemIndex);
                    const sideTabId = (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).ChartType;
                    selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).AllData] = 0;
                    selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).FilteredData] = 0;
                    selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).SelectedData] = 0;
                    let newState = Object.assign({
                        dataFile: dataFile,
                        dataContent: dataContent,
                        snapshots: dataContent.snapshots || this.state.snapshots,
                        autoCompleteDistinctValues: {},
                        filteredData: null,
                        tooltipExclusions: optionsOrPrefs && optionsOrPrefs.tooltipExclusions || [],
                        selectedItemIndex: selectedItemIndex,
                        sideTabId: sideTabId
                    }, partialInsight);
                    this.getColorContext = null;
                    (0, $a17a024e67e91c9f$export$1e096674a95fd43b)(newState.columns, dataContent.columns, newState.transform);
                    const errors = (0, $a17a024e67e91c9f$export$c2563952d877899)(partialInsight === null || partialInsight === void 0 ? void 0 : partialInsight.chart, partialInsight === null || partialInsight === void 0 ? void 0 : partialInsight.totalStyle, newState.columns, dataContent.columns);
                    newState.errors = errors;
                    //change insight
                    this.changeInsight(partialInsight, {
                        label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelHistoryInit,
                        insert: true
                    }, newState);
                    //make sure item is active
                    this.activateDataBrowserItem(sideTabId, this.state.dataScopeId);
                    resolve();
                };
                let dataFile;
                if (Array.isArray(data)) return (0, $3d862e0e83f42a97$export$c084150d12efae43)(data, "json").then((result)=>{
                    dataFile = {
                        type: "json"
                    };
                    loadFinal(result);
                }).catch(reject);
                else {
                    dataFile = data;
                    return (0, $3d862e0e83f42a97$export$9d26f8f2be82424f)(dataFile).then(loadFinal).catch(reject);
                }
            });
        }
        changeChartType(chart) {
            const partialInsight = (0, $b16b30fb0ba8a026$export$318d2f27a5d54aff)(this.prefs, chart, "*", "*");
            const insight = Object.assign({
                chart: chart
            }, partialInsight);
            const columns = (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.deepMerge({}, partialInsight.columns, this.state.columns);
            const { signalValues: signalValues  } = this.viewer.getInsight();
            insight.signalValues = Object.assign(Object.assign({}, this.state.signalValues), signalValues);
            insight.columns = Object.assign({}, columns);
            insight.totalStyle = this.state.totalStyle;
            let errors;
            //special case mappings when switching chart type
            if (this.state.chart === "scatterplot" && (chart === "barchart" || chart === "barchartV")) insight.columns = Object.assign(Object.assign({}, columns), {
                sort: columns.y
            });
            else if (this.state.chart === "scatterplot" && chart === "barchartH") insight.columns = Object.assign(Object.assign({}, columns), {
                sort: columns.x
            });
            else if (chart === "treemap") {
                insight.view = "2d";
                if (!columns.size) {
                    //make sure size exists and is numeric
                    let sizeColumn;
                    //first check prefs
                    if (partialInsight && partialInsight.columns && partialInsight.columns.size) {
                        const prefSizeColumn = this.state.dataContent.columns.filter((c)=>c.name === partialInsight.columns.size)[0];
                        if (prefSizeColumn && prefSizeColumn.quantitative) sizeColumn = prefSizeColumn;
                    }
                    if (!sizeColumn) sizeColumn = (0, $a17a024e67e91c9f$export$7e0d3b5c6570ae8b)(this.state.dataContent.columns);
                    if (!sizeColumn) //error - no numeric columns
                    errors = [
                        (0, $0db66385c00a3f15$export$21c51bc433c16634).errorColumnMustBeNumeric
                    ];
                    else insight.columns = Object.assign(Object.assign({}, columns), {
                        size: sizeColumn.name
                    });
                }
            } else if (chart === "stacks") insight.view = "3d";
            (0, $a17a024e67e91c9f$export$1e096674a95fd43b)(insight.columns, this.state.dataContent.columns, this.state.transform);
            errors = (0, $a17a024e67e91c9f$export$c2563952d877899)(chart, insight.totalStyle, insight.columns, this.state.dataContent.columns);
            this.calculate(()=>{
                this.changeInsight(insight, {
                    label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelHistoryChangeChartType((0, $247884a4197e9da6$export$7d1536ca08644643)(chart))
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
                label: view === "2d" ? (0, $0db66385c00a3f15$export$21c51bc433c16634).labelViewType2d : (0, $0db66385c00a3f15$export$21c51bc433c16634).labelViewType3d
            });
        }
        //state members which change the insight
        changeInsight(partialInsight, historyAction, additionalUIState) {
            if (partialInsight.chart === "barchart") partialInsight.chart = "barchartV";
            this.addHistory(partialInsight, historyAction, additionalUIState);
        }
        addHistory(historicInsight, historyAction, additionalUIState) {
            const setCleanState = (newState)=>{
                const cleanState = Object.assign(Object.assign({}, newState), additionalUIState);
                if (!cleanState.note) cleanState.note = null;
                delete cleanState.rebaseFilter;
                if (this.viewer) {
                    const { signalValues: signalValues  } = this.viewer.getInsight();
                    cleanState.signalValues = Object.assign(Object.assign(Object.assign({}, this.state.signalValues), signalValues), cleanState.signalValues);
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
            else setCleanState(Object.assign(Object.assign({}, historicInsight), {
                historyIndex: historyIndex,
                historyItems: historyItems
            }));
        }
        replay(index) {
            let filter = null;
            let historicInsight = {};
            for(let i = 0; i < index + 1; i++){
                const historyItem = this.state.historyItems[i];
                if (historyItem) {
                    if (historyItem.historicInsight.filter === null) filter = null;
                    else if (historyItem.historicInsight.rebaseFilter) filter = historyItem.historicInsight.filter;
                    else if (historyItem.historicInsight.filter) filter = (0, $3b509b9541e52a8f$exports).searchExpression.narrow(filter, historyItem.historicInsight.filter);
                    historicInsight = Object.assign(Object.assign({}, historicInsight), historyItem.historicInsight);
                }
            }
            return Object.assign(Object.assign({}, historicInsight), {
                filter: filter
            });
        }
        undo() {
            const historyIndex = this.state.historyIndex - 1;
            if (historyIndex < 0) return;
            const newState = this.replay(historyIndex);
            this.rebaseFilter = true;
            this.setState(Object.assign(Object.assign({}, newState), {
                historyIndex: historyIndex
            }));
        }
        redo(historyIndex = this.state.historyIndex + 1) {
            if (historyIndex >= this.state.historyItems.length) return;
            const newState = this.replay(historyIndex);
            this.rebaseFilter = true;
            this.setState(Object.assign(Object.assign({}, newState), {
                historyIndex: historyIndex
            }));
        }
        changespecCapabilities(specCapabilities) {
            this.setState({
                specCapabilities: specCapabilities
            });
        }
        changeColumnMapping(role, column, options) {
            const columns = Object.assign({}, this.state.columns);
            const label = column ? (0, $0db66385c00a3f15$export$21c51bc433c16634).labelHistoryMapColumn(role) : (0, $0db66385c00a3f15$export$21c51bc433c16634).labelHistoryUnMapColumn(role);
            const final = ()=>{
                const partialInsight = {
                    columns: columns,
                    totalStyle: options ? options.totalStyle : this.state.totalStyle
                };
                const errors = (0, $a17a024e67e91c9f$export$c2563952d877899)(this.state.chart, partialInsight.totalStyle, partialInsight.columns, this.state.dataContent.columns);
                columns[role] = column && column.name;
                this.changeInsight(partialInsight, {
                    label: label
                }, errors ? {
                    errors: errors
                } : null);
            };
            const _changeInsight = (newInsight, columnUpdate, historyAction)=>{
                newInsight.columns = (0, $3b509b9541e52a8f$exports).VegaDeckGl.util.deepMerge({}, columns, columnUpdate);
                (0, $b16b30fb0ba8a026$export$a14483004c11686f)(this.prefs, this.state.chart, "*", "*", {
                    columns: columnUpdate
                });
                this.changeInsight(newInsight, historyAction);
            };
            if (column) {
                let columnUpdate;
                switch(role){
                    case "facet":
                        {
                            (0, $b16b30fb0ba8a026$export$318d2f27a5d54aff)(this.prefs, this.state.chart, "facet", column.name);
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
                    case "color":
                        {
                            let calculating = null;
                            let historicInsight = {
                                scheme: options && options.scheme,
                                columns: columns,
                                colorBin: this.state.colorBin
                            };
                            if (!historicInsight.scheme) (0, $b16b30fb0ba8a026$export$318d2f27a5d54aff)(this.prefs, this.state.chart, "color", column.name);
                            if (!historicInsight.scheme) historicInsight.scheme = (0, $02ad5d745dd4974f$export$ba25af89e7ea3c1a)(column, null, this.state.scheme);
                            if (!column.stats.hasColorData) {
                                historicInsight.directColor = false;
                                if (this.state.directColor !== historicInsight.directColor) calculating = ()=>this._resize();
                            }
                            if (this.state.columns && this.state.columns.color && this.state.columns.color !== column.name) {
                                const currColorColumn = this.state.dataContent.columns.filter((c)=>c.name === this.state.columns.color)[0];
                                if (column.isColorData != currColorColumn.isColorData) calculating = ()=>this._resize();
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
                    case "x":
                        {
                            (0, $b16b30fb0ba8a026$export$318d2f27a5d54aff)(this.prefs, this.state.chart, "x", column.name);
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
                    case "size":
                        {
                            (0, $b16b30fb0ba8a026$export$318d2f27a5d54aff)(this.prefs, this.state.chart, "size", column.name);
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
                case "facet":
                    columns.facet = null;
                    columns.facetV = null;
                    this.changeInsight({
                        columns: columns,
                        facetStyle: "wrap"
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
            if (sideTabId === (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Data && dataScopeId == null) //choose most relevant DataScopeId
            dataScopeId = this.getBestDataScopeId();
            if (dataScopeId == null) dataScopeId = this.state.dataScopeId;
            const calculating = ()=>{
                this.dialogFocusHandler.focus && this.dialogFocusHandler.focus();
            };
            this.setState({
                sideTabId: sideTabId,
                dataScopeId: dataScopeId,
                sidebarClosed: false,
                calculating: calculating
            });
            this.activateDataBrowserItem(sideTabId, dataScopeId);
        }
        getBestDataScopeId() {
            let dataScopeId;
            const selectionState = this.viewer && this.viewer.getSelection();
            if (selectionState && selectionState.selectedData && selectionState.selectedData.length) dataScopeId = (0, $99df88aa84de796a$export$f0297ce57faf7d71).SelectedData;
            else if (this.state.filteredData) dataScopeId = (0, $99df88aa84de796a$export$f0297ce57faf7d71).FilteredData;
            else dataScopeId = (0, $99df88aa84de796a$export$f0297ce57faf7d71).AllData;
            return dataScopeId;
        }
        activateDataBrowserItem(sideTabId, dataScopeId) {
            if (!this.viewer) return;
            let itemToActivate;
            if (sideTabId === (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Data) switch(dataScopeId){
                case (0, $99df88aa84de796a$export$f0297ce57faf7d71).AllData:
                    itemToActivate = this.state.dataContent && this.state.dataContent.data[this.state.selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).AllData]];
                    break;
                case (0, $99df88aa84de796a$export$f0297ce57faf7d71).FilteredData:
                    itemToActivate = this.state.filteredData && this.state.filteredData[this.state.selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).FilteredData]];
                    break;
                case (0, $99df88aa84de796a$export$f0297ce57faf7d71).SelectedData:
                    {
                        const selection = this.viewer.getSelection() || {};
                        itemToActivate = selection.selectedData && selection.selectedData[this.state.selectedItemIndex[(0, $99df88aa84de796a$export$f0297ce57faf7d71).SelectedData]];
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
                label: "resize",
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
                    search: $b935bf5e2863e486$var$createInputSearch(search)
                });
                this.setSideTabId((0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Search);
            } else {
                var oldSelection = this.viewer.getSelection();
                if (oldSelection.search) {
                    //look for matching groups and toggle them
                    const result = (0, $e0216832bbbcfdeb$export$2e59f49d97a9dbde)((0, $3b509b9541e52a8f$exports).searchExpression.ensureSearchExpressionGroupArray(oldSelection.search), search);
                    if (result.found) {
                        //removing a group
                        if (result.groups.length === 0) this.doDeselect();
                        else //select with new search removed
                        this.doSelect(result.groups);
                    } else //adding a new group
                    if (e.altKey || e.shiftKey) {
                        let group = true;
                        if (e.altKey) search.clause = "&&";
                        else if (e.shiftKey) {
                            if (this.props.searchORDisabled) group = false;
                            else search.clause = "||";
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
                    sideTabId: (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Snapshots,
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
                    behavior: "smooth",
                    block: "nearest"
                });
            }, 500);
        }
        componentDidMount() {
            if (this.props.mounted) this.props.mounted(this);
        }
        render() {
            const { colorBin: colorBin1 , columns: columns , directColor: directColor1 , facetStyle: facetStyle , filter: filter , hideAxes: hideAxes1 , hideLegend: hideLegend1 , scheme: scheme1 , signalValues: signalValues1 , size: size , totalStyle: totalStyle , transform: transform , chart: chart1 , view: view1  } = this.state;
            const insight = {
                colorBin: colorBin1,
                columns: columns,
                directColor: directColor1,
                facetStyle: facetStyle,
                filter: filter,
                hideAxes: hideAxes1,
                hideLegend: hideLegend1,
                scheme: scheme1,
                signalValues: signalValues1,
                size: size,
                totalStyle: totalStyle,
                transform: transform,
                chart: chart1,
                view: view1
            };
            const loaded = !!(this.state.columns && this.state.dataContent);
            const selectionState = this.viewer && this.viewer.getSelection() || {};
            const selectionSearch = selectionState && selectionState.search;
            const columnMapProps = this.getColumnMapBaseProps();
            const datas = {};
            datas[(0, $99df88aa84de796a$export$f0297ce57faf7d71).AllData] = this.state.dataContent && this.state.dataContent.data;
            datas[(0, $99df88aa84de796a$export$f0297ce57faf7d71).FilteredData] = this.state.filteredData;
            datas[(0, $99df88aa84de796a$export$f0297ce57faf7d71).SelectedData] = selectionState && selectionState.selectedData;
            if (this.state.calculating) requestAnimationFrame(()=>{
                //allow render to complete
                if (this.state.calculating) {
                    this.state.calculating();
                    this.setState({
                        calculating: null
                    });
                }
            });
            const theme = this.props.theme || "";
            const themePalette = (0, $b61671d8f61aadb4$export$3465a0e7b289ab72)[theme];
            return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                ref: (div)=>{
                    if (div) this.div = div;
                },
                className: (0, $a1d9524814b1e23a$exports).classList("sanddance-explorer", this.props.theme)
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $f336667543fc9dad$export$1ca1e38143dcc152), {
                collapseLabels: this.props.compactUI,
                historyIndex: this.state.historyIndex,
                historyItems: this.state.historyItems,
                undo: ()=>this.undo(),
                redo: ()=>this.redo(),
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
                onSnapshotClick: ()=>this.snapshotEditor.editSnapshot(),
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
                    const view = this.state.view === "2d" ? "3d" : "2d";
                    this.changeInsight({
                        view: view
                    }, {
                        label: view === "2d" ? (0, $0db66385c00a3f15$export$21c51bc433c16634).labelViewType2d : (0, $0db66385c00a3f15$export$21c51bc433c16634).labelViewType3d
                    });
                },
                onHomeClick: ()=>this.viewer.presenter.homeCamera()
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                className: (0, $a1d9524814b1e23a$exports).classList("sanddance-main", this.state.sidebarPinned && "pinned", this.state.sidebarClosed && "closed", (insight.hideLegend || insight.directColor || !$b935bf5e2863e486$var$colorMapping(insight, this.state.dataContent && this.state.dataContent.columns)) && "hide-legend")
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                ref: (div)=>{
                    if (div && !this.layoutDivUnpinned) this.layoutDivUnpinned = div;
                },
                className: "sanddance-layout-unpinned"
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                ref: (div)=>{
                    if (div && !this.layoutDivPinned) this.layoutDivPinned = div;
                },
                className: "sanddance-layout-pinned"
            }), !loaded && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                className: "loading"
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Spinner, {
                size: (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.SpinnerSize.large,
                label: (0, $0db66385c00a3f15$export$21c51bc433c16634).loading
            })), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $31fcbd44e38b82f5$export$1ba59dacbcbf90fe), {
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
                    active: this.state.sideTabId === (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Data,
                    onDataScopeClick: (dataScopeId)=>this.setSideTabId((0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Data, dataScopeId),
                    selectedDataScope: this.state.dataScopeId,
                    disabled: !loaded
                },
                onSideTabClick: (sideTabId)=>{
                    //collapse or toggle
                    if (sideTabId === (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Collapse || this.state.sideTabId === sideTabId) {
                        let { dataScopeId: dataScopeId , sidebarClosed: sidebarClosed  } = this.state;
                        if (sidebarClosed && sideTabId === (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Data) dataScopeId = this.getBestDataScopeId();
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
                    } else if (sideTabId === (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Pin) this.changeInsight({
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
                    case (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).ChartType:
                        return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $247884a4197e9da6$export$acaa6426d77a227e), Object.assign({
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
                            onChangeChartType: (chart)=>this.changeChartType(chart),
                            insightColumns: this.state.columns,
                            onChangeSignal: (role, column, name, value)=>(0, $b16b30fb0ba8a026$export$c2992dc6411becf6)(this.prefs, this.state.chart, role, column, name, value)
                        }));
                    case (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Color:
                        return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $0db948ac6e4b75cc$export$892596cec99bc70e), Object.assign({
                            compactUI: this.props.compactUI,
                            specCapabilities: this.state.specCapabilities,
                            disabled: !loaded || this.state.sidebarClosed
                        }, columnMapProps, {
                            dataContent: this.state.dataContent,
                            scheme: this.state.scheme,
                            colorBin: this.state.colorBin,
                            colorBinSignal: this.viewer && this.viewer.vegaSpec && this.viewer.vegaSpec.signals.filter((s)=>s.name === (0, $3b509b9541e52a8f$exports).constants.SignalNames.ColorBinCount)[0],
                            colorReverseSignal: this.viewer && this.viewer.vegaSpec && this.viewer.vegaSpec.signals.filter((s)=>s.name === (0, $3b509b9541e52a8f$exports).constants.SignalNames.ColorReverse)[0],
                            colorColumn: this.state.columns.color,
                            onColorBinChange: (colorBin)=>{
                                this.ignoreSelectionChange = true;
                                this.viewer.deselect().then(()=>{
                                    this.ignoreSelectionChange = false;
                                    //allow deselection to render
                                    requestAnimationFrame(()=>{
                                        this.getColorContext = null;
                                        this.changeInsight({
                                            colorBin: colorBin
                                        }, {
                                            label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelHistoryColorBin
                                        });
                                        (0, $b16b30fb0ba8a026$export$a14483004c11686f)(this.prefs, this.state.chart, "color", this.state.columns.color, {
                                            colorBin: colorBin
                                        });
                                    });
                                });
                            },
                            onColorSchemeChange: (scheme)=>{
                                this.changeColumnMapping("color", this.state.dataContent.columns.filter((c)=>c.name === this.state.columns.color)[0], {
                                    scheme: scheme
                                });
                                (0, $b16b30fb0ba8a026$export$a14483004c11686f)(this.prefs, this.state.chart, "color", this.state.columns.color, {
                                    scheme: scheme
                                });
                            },
                            onColorBinCountChange: (value)=>{
                                const signalValues = {};
                                signalValues[(0, $3b509b9541e52a8f$exports).constants.SignalNames.ColorBinCount] = value;
                                (0, $b16b30fb0ba8a026$export$a14483004c11686f)(this.prefs, this.state.chart, "color", this.state.columns.color, {
                                    signalValues: signalValues
                                });
                            },
                            onColorReverseChange: (value)=>{
                                this.getColorContext = null;
                            },
                            directColor: this.state.directColor,
                            onDirectColorChange: (directColor)=>{
                                this.changeInsight({
                                    directColor: directColor
                                }, {
                                    label: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelHistoryDirectColor
                                }, {
                                    calculating: ()=>this._resize()
                                });
                            }
                        }));
                    case (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Data:
                        {
                            const data = datas[this.state.dataScopeId];
                            let itemVisible = true;
                            switch(this.state.dataScopeId){
                                case (0, $99df88aa84de796a$export$f0297ce57faf7d71).AllData:
                                    {
                                        const item = this.state.selectedItemIndex[this.state.dataScopeId];
                                        itemVisible = this.state.dataContent && !this.state.filteredData || this.state.filteredData.indexOf(data[item]) >= 0;
                                    }
                            }
                            return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $0829079b3c747bdc$export$1ce2294f62fa7154), {
                                explorer: this,
                                theme: this.props.theme,
                                themePalette: themePalette,
                                disabled: !loaded || this.state.sidebarClosed,
                                columns: this.state.dataContent && this.state.dataContent.columns,
                                data: data,
                                displayName: this.state.dataFile && this.state.dataFile.displayName || (0, $0db66385c00a3f15$export$21c51bc433c16634).defaultFileName,
                                nullMessage: $b935bf5e2863e486$var$dataBrowserNullMessages[this.state.dataScopeId],
                                zeroMessage: $b935bf5e2863e486$var$dataBrowserZeroMessages[this.state.dataScopeId],
                                index: this.state.selectedItemIndex[this.state.dataScopeId],
                                itemVisible: itemVisible,
                                dataExportHandler: this.props.dataExportHandler,
                                selectedDataScope: this.state.dataScopeId,
                                onDataScopeClick: (dataScopeId)=>this.setSideTabId((0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Data, dataScopeId),
                                onActivate: (row, index)=>{
                                    const selectedItemIndex = Object.assign({}, this.state.selectedItemIndex);
                                    selectedItemIndex[this.state.dataScopeId] = index;
                                    this.setState({
                                        selectedItemIndex: selectedItemIndex
                                    });
                                    this.silentActivation(row);
                                },
                                onSearch: (e, search)=>{
                                    if (e.ctrlKey) this.setState({
                                        sideTabId: (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Search,
                                        search: search
                                    });
                                    else this.doSelect(search);
                                },
                                bingSearchDisabled: this.props.bingSearchDisabled
                            });
                        }
                    case (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Search:
                        return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $fd0d652c33ef4e65$export$4b85d3515bd863a5), {
                            explorer: this,
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
                            onSelect: (expr)=>this.doSelect(expr),
                            data: this.state.dataContent.data
                        });
                    case (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Snapshots:
                        return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $3465068850534ed3$export$3e09886744a57615), Object.assign({}, this.props.snapshotProps, {
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
                            onWriteSnapshot: (s, i)=>this.writeSnapshot(s, i),
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
                    case (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).History:
                        return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $0820350effaa56a9$export$84202caead5689ba), {
                            explorer: this,
                            theme: theme,
                            themePalette: themePalette,
                            historyIndex: this.state.historyIndex,
                            historyItems: this.state.historyItems,
                            redo: (i)=>this.redo(i)
                        });
                    case (0, $a4811b1c86ed19fa$export$f3b7566ffe363e3b).Settings:
                        return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $4805700d8b417596$export$c72f6eaae7b9adff), {
                            explorer: this,
                            dataFile: this.state.dataFile,
                            scheme: this.state.scheme,
                            hideLegend: this.state.hideLegend,
                            onToggleLegend: (hideLegend)=>this.setState({
                                    hideLegend: hideLegend,
                                    calculating: ()=>this._resize()
                                }),
                            hideAxes: this.state.hideAxes,
                            onToggleAxes: (hideAxes)=>this.setState({
                                    calculating: ()=>this.setState({
                                            hideAxes: hideAxes
                                        })
                                }),
                            additionalSettings: this.props.additionalSettings
                        }, this.props.systemInfoChildren);
                }
            })()), loaded && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                className: "sanddance-view"
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $81745c046077d503$export$441ac54c4cda559d), {
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
                    (0, $29728562a99c68a2$export$95ea862e038e2d34)(this.viewer);
                    this.props.onView && this.props.onView();
                },
                onError: (e)=>{
                    this.props.onError && this.props.onError(e);
                },
                data: this.state.dataContent.data,
                insight: insight,
                onMount: (el)=>this.viewerMounted(el)
            }), this.state.note && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                className: "sanddance-note"
            }, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $adfb025456b8f57f$export$c25acd513dcc8062), {
                className: "cancel",
                themePalette: themePalette,
                title: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonClose,
                iconName: "Cancel",
                onClick: ()=>this.setState({
                        note: null
                    })
            }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", null, this.state.note))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $5453c8de1a3cb6b6$export$3ddf2d174ce01153), {
                title: (0, $0db66385c00a3f15$export$21c51bc433c16634).labelError,
                hidden: !this.state.errors,
                onDismiss: ()=>{
                    this.setState({
                        errors: null
                    });
                }
            }, this.state.errors && this.state.errors.map((error, i)=>(0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
                    key: i
                }, error))), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $555bb845cf8689db$export$15b376344cc89d12), Object.assign({
                ref: (se)=>this.snapshotEditor = se
            }, this.props.snapshotProps, {
                explorer: this,
                onWriteSnapshot: (s, i)=>this.writeSnapshot(s, i),
                theme: this.props.theme,
                themePalette: themePalette
            }))), this.state.positionedColumnMapProps && (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $1f0c6e0f0abb4f2d$export$3e341bd56774d659), Object.assign({}, this.state.positionedColumnMapProps)));
        }
        getColumnMapBaseProps() {
            const allColumns = this.state.dataContent && this.state.dataContent.columns.filter((c)=>!(0, $3b509b9541e52a8f$exports).util.isInternalFieldName(c.name, true));
            const quantitativeColumns = allColumns && allColumns.filter((c)=>c.quantitative);
            const categoricalColumns = allColumns && allColumns.filter((c)=>!c.quantitative);
            const props = {
                changeColumnMapping: (role, columnOrRole, defaultColumn, options)=>{
                    let column;
                    if (typeof columnOrRole === "string") {
                        //look up current insight
                        const columnName = this.state.columns[columnOrRole];
                        column = allColumns.filter((c)=>c.name === columnName)[0] || defaultColumn;
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
            return props;
        }
    }
    return new __Explorer(props1);
}
const $b935bf5e2863e486$export$43584986cb77a794 = $b935bf5e2863e486$var$_Explorer;
function $b935bf5e2863e486$var$colorMapping(insight, columns) {
    if (columns && insight.columns && insight.columns.color) return columns.filter((c)=>c.name === insight.columns.color)[0];
}



const $8535c575077b9670$export$e2253033e6e1df16 = {
    fluentUI: null,
    react: null,
    reactDOM: null
};
function $8535c575077b9670$export$1f96ae73734a86cc(fluentUI, react, reactDOM, vega, deck, layers, luma) {
    (0, $de8134d48126c751$export$1f96ae73734a86cc)(react, reactDOM, vega, deck, layers, luma);
    $8535c575077b9670$export$e2253033e6e1df16.fluentUI = fluentUI;
    $8535c575077b9670$export$e2253033e6e1df16.react = react;
    $8535c575077b9670$export$e2253033e6e1df16.reactDOM = reactDOM;
    //inform React that we are using a dynamic base class
    (0, $247884a4197e9da6$export$acaa6426d77a227e).prototype = react.Component.prototype;
    (0, $e98d3084b701f145$export$b1b568728c48eba1).prototype = react.Component.prototype;
    (0, $b935bf5e2863e486$export$43584986cb77a794).prototype = react.Component.prototype;
    (0, $1f0c6e0f0abb4f2d$export$3e341bd56774d659).prototype = react.Component.prototype;
    (0, $fd0d652c33ef4e65$export$4b85d3515bd863a5).prototype = react.Component.prototype;
    (0, $555bb845cf8689db$export$15b376344cc89d12).prototype = react.Component.prototype;
    (0, $3465068850534ed3$export$3e09886744a57615).prototype = react.Component.prototype;
    (0, $4805700d8b417596$export$c72f6eaae7b9adff).prototype = react.Component.prototype;
}



function $5453c8de1a3cb6b6$export$3ddf2d174ce01153(props) {
    return (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.Dialog, Object.assign({}, props, {
        dialogContentProps: Object.assign({
            type: (0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DialogType.normal,
            title: props.title
        }, props.dialogContentProps)
    }), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement("div", {
        onKeyUp: (e)=>{
            e.nativeEvent.stopImmediatePropagation();
        }
    }, props.children), (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DialogFooter, null, props.buttons, (0, $8535c575077b9670$export$e2253033e6e1df16).react.createElement((0, $8535c575077b9670$export$e2253033e6e1df16).fluentUI.DefaultButton, {
        iconProps: {
            iconName: "Cancel"
        },
        onClick: props.onDismiss,
        text: (0, $0db66385c00a3f15$export$21c51bc433c16634).buttonClose
    })));
}


$parcel$exportWildcard($b3059ab4f8ea4207$exports, $5453c8de1a3cb6b6$exports);










$parcel$exportWildcard($87e8ab1064b645b0$exports, $b935bf5e2863e486$exports);


window.SandDanceExplorer = $87e8ab1064b645b0$exports;

})();
