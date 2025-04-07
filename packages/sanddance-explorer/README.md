# @msrvida/sanddance-explorer

Visually explore, understand, and present your data.

![image](https://user-images.githubusercontent.com/11507384/72197128-a99cdd80-33d2-11ea-9b49-5d470db0abc1.png)


[Demo](https://microsoft.github.io/SandDance/app) - [API Reference](https://microsoft.github.io/SandDance/docs/sanddance-explorer/v4)

## Installation

Add these to the `dependencies` section of your `package.json`, then run `npm install`:

```json
"@msrvida/sanddance-explorer": "^4",
"@fluentui/react": "^8",
"vega": "^5.32"
```

Import these in your JavaScript:

```js
import * as fluentui from '@fluentui/react';
import * as vega from 'vega';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Explorer, use } from '@msrvida/sanddance-explorer';

//quickstart: use the included stylesheet
import "@msrvida/sanddance-explorer/dist/css/sanddance-explorer.css"

/*
  in your own stylesheet, you can modify the sanddance-explorer class to fit your needs.
  Example:

.sanddance-explorer {
  height: 800px;
}

*/

fluentui.initializeIcons();

use(fluentui, React, ReactDOM, vega);

const data = [
  { a: 1, b: "c1" },
  { a: 1, b: "c2" },
  { a: 2, b: "c3" },
  { a: 3, b: "c4" }
];

const explorerProps = {
    logoClickUrl: 'https://microsoft.github.io/SandDance/',
    mounted: explorer => {
        explorer.load(data);
    }
};

ReactDOM.render(React.createElement(Explorer, explorerProps), document.getElementById('app'));
```

## Versions

### Breaking changes in v4

* removed deck.gl dependency
* @fluentui/react @8

### Breaking changes in v3

* deck.gl dependency from 6.4 to 8.1
* fluentui-react 7.x (formerly office-ui-fabric-react 6.x)

## For more information
Please visit the [SandDance website](https://microsoft.github.io/SandDance/).
