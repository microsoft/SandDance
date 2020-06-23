# @msrvida/vega-deck.gl

View component for [Vega](https://vega.github.io/) visualizations, using [deck.gl](https://deck.gl/) for WebGL rendering.

This project combines two great visualization libraries into one. You have the expressiveness of [Vega specifications](https://vega.github.io/vega/docs/specification/) and the WebGL rendering of [deck.gl](https://deck.gl). As a result, you have the option of visualizing data in 3 dimensions.


[API Reference](https://microsoft.github.io/SandDance/docs/vega-deck.gl/v2/api)

## Limitations

This project does not fully implement every feature provided by Vega. Some interactive features are omitted due to the nature of the 3D rendering model which breaks correspondence to the 2D rendering plane. Other features simply have yet to be developed, for these we will gladly accept a pull request.

## Feature additions

Rect elements can be rendered as 3D cuboids. To do this, add `"z"` / `"depth"` encodings where you normally use `"x"` / `"width"` and `"y"` / `"height"`.

## Installation

You will need to consider how to load the libraries that `vega-deck.gl` depends on, based on your build & deployment scenario.

## Installation via script tags

This is the quickest installation option. You can load scripts from a CDN, or you can serve them from your own website. In your HTML, add these tags:

```html
<script src="https://unpkg.com/vega@^5.11/build/vega.js" charset="utf-8"></script>
<script src="https://unpkg.com/deck.gl@~6.4/deckgl.min.js"></script>
<script src="https://unpkg.com/@msrvida/vega-deck.gl@^2/dist/umd/vega-deck.gl.js"></script>
```

A global variable named `VegaDeckGl` will be available to you. In your JavaScript, call the `use()` function to pass the dependency libraries to `VegaDeckGl`:

```js
VegaDeckGl.use(vega, deck, deck, luma);
```

## Installation via Node.js

This option is for those who are using a script bundler such as [WebPack](https://webpack.js.org) or [Parcel](https://parceljs.org).

Add these to the `dependencies` section of your `package.json`, then run `npm install`:

```json
"@deck.gl/core": "^8.1.5",
"@deck.gl/layers": "^8.1.5",
"@luma.gl/core": "^8.1.2",
"@msrvida/vega-deck.gl": "^2",
"vega": "^5.11"
```

Import these in your JavaScript, then call the `use()` function to pass the dependency libraries to `VegaDeckGl`:

```js
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from 'luma.gl';
import * as vega from 'vega';
import * as VegaDeckGl from '@msrvida/vega-deck.gl';

VegaDeckGl.use(vega, deck, layers, luma);
```

## Usage

`VegaDeckGl.ViewGl` uses the same API as [Vega's View](https://github.com/vega/vega-view). In addition to `'canvas'` and `'svg'`, you can now pass `'deck.gl'` as the type of the renderer:

```js
var view = new VegaDeckGl.ViewGl(vega.parse(spec))
    .renderer('deck.gl')
    .initialize(document.querySelector('#vis'))
    .run();
```

## Versions

### Breaking changes in v3

* `Stage.TickText` now `VegaTextLayerDatum` type
* `View` type deleted
* `util.isColor` function deleted
