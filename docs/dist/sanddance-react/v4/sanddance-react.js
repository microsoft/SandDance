(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@msrvida/sanddance')) :
  typeof define === 'function' && define.amd ? define(['exports', '@msrvida/sanddance'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SandDanceReact = {}, global.SandDance));
})(this, (function (exports, SandDance) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var SandDance__namespace = /*#__PURE__*/_interopNamespace(SandDance);

  var collectionCompare = compare;

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
    if (value1 !== value1 && value2 !== value2) {
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
    if ({}.toString.call(value1) == '[object Set]') {
      return compareArrays(Array.from(value1), Array.from(value2));
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

  var compare$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': collectionCompare
  });

  /*!
  * Copyright (c) Microsoft Corporation.
  * Licensed under the MIT License.
  */
  const classList = (...args) => {
      return args.filter(Boolean).join(' ');
  };
  const deepCompare = (collectionCompare || compare$1);
  function addNullable(insight, signalValues) {
      const withNulls = Object.assign(Object.assign({ view: null, filter: null }, insight), { signalValues });
      return withNulls;
  }
  function compareInsight(viewer, insight) {
      const currentInsight = viewer.getInsight();
      const a = addNullable(currentInsight, Object.assign(Object.assign({}, viewer.insight.signalValues), currentInsight.signalValues));
      const b = addNullable(insight, Object.assign(Object.assign({}, a.signalValues), insight.signalValues));
      const compare = deepCompare(a, b);
      return { a, b, compare };
  }

  var util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    classList: classList,
    deepCompare: deepCompare,
    compareInsight: compareInsight
  });

  /*!
  * Copyright (c) Microsoft Corporation.
  * Licensed under the MIT License.
  */
  const base = {
      react: null,
      reactDOM: null,
  };
  /**
   * Specify the dependency libraries to use for rendering.
   * @param react React library.
   * @param vega Vega library.
   * @param deck @deck.gl/core library.
   * @param layers @deck.gl/layers library.
   * @param luma @luma.gl/core library.
   */
  function use(react, reactDOM, vega) {
      SandDance__namespace.VegaMorphCharts.use(vega);
      base.react = react;
      base.reactDOM = reactDOM;
      //inform React that we are using a dynamic base class
      Viewer.prototype = react.Component.prototype;
  }

  /*!
  * Copyright (c) Microsoft Corporation.
  * Licensed under the MIT License.
  */
  function _Viewer(_props) {
      class __Viewer extends base.react.Component {
          layout() {
              const { props } = this;
              this.lastData = props.data;
              this.viewer.render({
                  insight: props.insight,
                  setup: props.setup,
              }, props.data, props.renderOptions).then(renderResult => {
                  //TODO: show errors if any
                  //console.log('viewer render');
                  props.onView && props.onView(renderResult);
              }).catch(e => {
                  //console.log('viewer error');
                  props.onError && props.onError(e);
              });
          }
          view() {
              var _a, _b, _c, _d, _e;
              const { props } = this;
              let didLayout = false;
              if (props.insight && props.data) {
                  const c = compareInsight(this.viewer, props.insight);
                  const sameDataRef = props.data === this.lastData;
                  if (!c.compare || !sameDataRef) {
                      this.layout();
                      didLayout = true;
                  }
              }
              if (!didLayout && props.setup) {
                  const { camera } = props.setup;
                  //compare setup, move camera
                  if (camera && camera !== 'hold') {
                      if (!deepCompare(this.viewer.getCamera(), camera)) {
                          //camera is different
                          this.viewer.setCamera(camera);
                      }
                  }
                  else if (!camera && this.viewer.setup.camera) {
                      (_b = (_a = this.viewer) === null || _a === void 0 ? void 0 : _a.presenter) === null || _b === void 0 ? void 0 : _b.homeCamera();
                  }
                  if (props.setup.renderer) {
                      (_e = (_d = (_c = this.viewer) === null || _c === void 0 ? void 0 : _c.presenter) === null || _d === void 0 ? void 0 : _d.morphchartsref) === null || _e === void 0 ? void 0 : _e.setMorphChartsRendererOptions(props.setup.renderer);
                  }
              }
          }
          componentDidMount() {
              const { props } = this;
              const element = base.reactDOM.findDOMNode(this.viewerDiv);
              this.viewer = new SandDance.Viewer(element, props.viewerOptions);
              if (props.onMount) {
                  if (props.onMount(this.viewer.presenter.getElement(SandDance.VegaMorphCharts.PresenterElement.gl))) {
                      this.view();
                  }
              }
              else {
                  this.view();
              }
          }
          componentDidUpdate() {
              const { props } = this;
              this.viewer.options = SandDance.VegaMorphCharts.util.deepMerge(this.viewer.options, props.viewerOptions);
              this.view();
          }
          componentWillUnmount() {
              this.viewer.finalize();
          }
          render() {
              return (base.react.createElement("div", { className: "sanddance-ReactViewer", ref: div => (this.viewerDiv = div) }));
          }
      }
      return new __Viewer(_props);
  }
  const Viewer = _Viewer;

  /*!
  * Copyright (c) Microsoft Corporation.
  * Licensed under the MIT License.
  */
  const version = '4.0.0';

  exports.SandDance = SandDance__namespace;
  exports.Viewer = Viewer;
  exports.use = use;
  exports.util = util;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
