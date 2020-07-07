---
layout: docs
---

# @msrvida/sanddance-explorer

Visually explore, understand, and present your data.

![image](https://user-images.githubusercontent.com/11507384/72197128-a99cdd80-33d2-11ea-9b49-5d470db0abc1.png)


[Demo](/app) - [API Reference](/docs/sanddance-explorer/v2/api)

## Installation

Add these to the `dependencies` section of your `package.json`, then run `npm install`:

```json
"@deck.gl/core": "^8.1.5",
"@deck.gl/layers": "^8.1.5",
"@msrvida/sanddance-explorer": "^2",
"@luma.gl/core": "^8.1.2",
"office-ui-fabric-react": "6.204.4",
"vega": "^5.11"
```

Import these in your JavaScript:

```js
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from 'luma.gl';
import * as fabric from 'office-ui-fabric-react';
import * as vega from 'vega';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Explorer, use } from '@msrvida/sanddance-explorer';

fabric.initializeIcons();

use(fabric, React, ReactDOM, vega, deck, layers, luma);

const data = [
  { a: 1, b: "c1" },
  { a: 1, b: "c2" },
  { a: 2, b: "c3" },
  { a: 3, b: "c4" }
];

const explorerProps = {
    logoClickUrl: '/',
    mounted: explorer => {
        explorer.load(data);
    }
};

ReactDOM.render(React.createElement(Explorer, explorerProps), document.getElementById('app'));
```

## Versions

### Breaking changes in v3

* deck.gl dependency from 6.4 to 8.1
* fluentui-react 7.x (formerly office-ui-fabric-react 6.x)

## For more information
Please visit the [SandDance website](/).
