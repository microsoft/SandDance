# @msrvida/sanddance-react

Visually explore, understand, and present your data.

![sanddance-animation](https://user-images.githubusercontent.com/11507384/54236654-52d42800-44d1-11e9-859e-6c5d297a46d2.gif)

[Demo](https://microsoft.github.io/SandDance/app) - [API Reference](https://microsoft.github.io/SandDance/docs/sanddance-react/v4)

## Installation

Add these to the `dependencies` section of your `package.json`, then run `npm install`:

```json
"@msrvida/sanddance-react": "^4",
"vega": "^5.20"
```

Import these in your JavaScript:

```js
import * as vega from 'vega';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { use as SandDanceUse, SandDanceReact } from '@msrvida/sanddance-react';

SandDanceUse(React, ReactDOM, vega);
```

## Versions

### Breaking changes in v4

* removed deck.gl dependency

## For more information
Please visit the [SandDance website](https://microsoft.github.io/SandDance/).
