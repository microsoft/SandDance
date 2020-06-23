# @msrvida/sanddance-vue

Visually explore, understand, and present your data.

![sanddance-animation](https://user-images.githubusercontent.com/11507384/54236654-52d42800-44d1-11e9-859e-6c5d297a46d2.gif)

## Installation

Add these to the `dependencies` section of your `package.json`, then run `npm install`:

```json
"@deck.gl/core": "^8.1.5",
"@deck.gl/layers": "^8.1.5",
"@msrvida/sanddance-vue": "^3",
"@luma.gl/core": "^8.1.2",
"vega": "^5.11"
```

## Example code

```
<template>
  <div id="app">
    <SandDanceVue v-bind:data="data" v-bind:insight="insight" />
  </div>
</template>

<script>
import * as deck from "@deck.gl/core";
import * as layers from "@deck.gl/layers";
import * as luma from "@luma.gl/core";
import * as vega from "vega";
import SandDanceVue, { SandDance } from "@msrvida/sanddance-vue";

SandDance.use(vega, deck, layers, luma);

const data = [{ a: 1 }, { a: 2 }, { a: 3 }];

const insight = {
  chart: "barchartV",
  columns: {
    x: "a",
    z: "a"
  },
  size: {
    height: 500,
    width: 500
  },
  view: "3d"
};

export default {
  name: "App",
  components: {
    SandDanceVue
  },
  data: () => {
    return {
      data,
      insight
    };
  }
};
</script>

<style>
.sanddance-VueViewer {
  height: 700px;
  border: 1px solid black;
}
</style>

<style src="@msrvida/sanddance/dist/css/sanddance.css" />
```

## For more information

Please visit the [SandDance website](https://microsoft.github.io/SandDance/).
