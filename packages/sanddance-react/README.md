# @msrvida/sanddance-react

Visually explore, understand, and present your data.

![sanddance-animation](https://user-images.githubusercontent.com/11507384/54236654-52d42800-44d1-11e9-859e-6c5d297a46d2.gif)

[Demo](https://microsoft.github.io/SandDance/app) - [API Reference](https://microsoft.github.io/SandDance/docs/sanddance-react/v3)

## Installation

Add these to the `dependencies` section of your `package.json`, then run `npm install`:

```json
"@deck.gl/core": "^8.3.7",
"@deck.gl/layers": "^8.3.7",
"@msrvida/sanddance-react": "^3",
"@luma.gl/core": "^8.3.1",
"vega": "^5.17.0"
```

Import these in your JavaScript:

```js
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from '@luma.gl/core';
import * as vega from 'vega';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { use as SandDanceUse, SandDanceReact } from '@msrvida/sanddance-react';

SandDanceUse(React, ReactDOM, vega, deck, layers, luma);
```

## For more information
Please visit the [SandDance website](https://microsoft.github.io/SandDance/).
