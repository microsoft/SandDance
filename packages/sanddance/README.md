# @msrvida/sanddance

Visually explore, understand, and present your data.

![sanddance-animation](https://user-images.githubusercontent.com/11507384/189461831-9467863e-bff8-47d2-aa03-ab2b74658814.gif)

[Demo](https://microsoft.github.io/SandDance/app) - [API Reference](https://microsoft.github.io/SandDance/docs/sanddance/v4)

## Installation

You will need to consider how to load the libraries that `sanddance` depends on, based on your build & deployment scenario.

## Installation via script tags

Load dependencies via `<script>` tags in your HTML:
```html
<script src="https://unpkg.com/vega@^5.25/build/vega.js" charset="utf-8"></script>
<script src="https://unpkg.com/@msrvida/sanddance@^4/dist/umd/sanddance.js"></script>
```

A global variable named `SandDance` will be available to you. In your JavaScript, call the `use` function to pass the dependency libraries:

```js
SandDance.use(vega);
```

## Installation via Node.js

Add these to the `dependencies` section of your `package.json`, then run `npm install`:

```json
"@msrvida/sanddance": "^4",
"vega": "^5.22"
```

Import these in your JavaScript, then call the `use()` function to pass the dependency libraries to `SandDance.VegaMorphCharts`:

```js
import * as vega from 'vega';
import * as SandDance from '@msrvida/sanddance';

SandDance.use(vega);
```

## Usage
```js
// Begin with an array of data objects which have the same named properties: 
const data = [
    { myX: 0, myY: 0, myZ: 0 },
    { myX: 1, myY: 1, myZ: 1 },
    { myX: 2, myY: 2, myZ: 2 },
];

// Create an instance of the [SandDance Viewer Class](https://microsoft.github.io/SandDance/docs/sanddance/v4/classes/Viewer.html) with an HTML DOM node to use for display:
const viewer = new SandDance.Viewer(document.querySelector('#vis'));

// Specify the chart by using an [Insight object](https://microsoft.github.io/SandDance/docs/sanddance/v4/interfaces/specs.Insight.html)
const insight = {
    columns: {
        x: 'myX',
        y: 'myY',
        z: 'myZ'
    },
    size: {
        height: 700,
        width: 700
    },
    chart: 'scatterplot'
};

// Render a chart, by calling the viewer's [render method](https://microsoft.github.io/SandDance/docs/sanddance/v4/classes/Viewer.html#render), passing the insight and the data:
viewer.render({ insight }, data);
```

## Versions

### 4.0.0 Changes

* Use MorphCharts as WebGL engine

### 3.2.0 Changes

* Show z-axis scale

### 3.1.0 Changes

* Fix for animation easing
* Text character set accepts all unicode

### Breaking changes in v4

* `viewer.render(insight)` now takes a higher level object, call as `viewer.render({insight})`

### Breaking changes in v3

* deck.gl dependency from 6.4 to 8.1
* new `searchExpression` namespace
  * `types.Search` moved here
  * `util.ensureSearchExpressionGroup` moved here
* new `specs` namespace
  * `types.Insight` moved here
* `ViewerOptions` colors are now `string` type
* `VegaDeckGl.View` moved to `types.View`

### Breaking changes in v2

* vega dependency from 4.x to 5.x

## For more information
Please visit the [SandDance website](https://microsoft.github.io/SandDance/).
