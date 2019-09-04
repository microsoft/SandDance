---
layout: docs
---

# @msrvida/sanddance-explorer

Visually explore, understand, and present your data.

![image](https://user-images.githubusercontent.com/11507384/54243089-591fcf80-44e4-11e9-851e-5ff4a262ccfd.png)


[Demo](/app) - [API Reference](/docs/sanddance-explorer/v1/api)

## Installation

Add these to the `dependencies` section of your `package.json`, then run `npm install`:

```json
"@deck.gl/core": "6.4",
"@deck.gl/layers": "6.4",
"luma.gl": "6.4",
"sanddance-explorer": "*",
"vega-lib": "^4.3.0"
```

Import these in your JavaScript:

```js
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from 'luma.gl';
import * as vega from 'vega-lib';
import { Explorer, SandDance } from '@msrvida/sanddance-explorer';

SandDance.use(vega, deck, layers, luma);
```

## For more information
Please visit the [SandDance website](/).
