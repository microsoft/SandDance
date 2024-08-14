# @msrvida/sanddance-react

Visually explore, understand, and present your data.

![sanddance-animation](https://user-images.githubusercontent.com/11507384/189461831-9467863e-bff8-47d2-aa03-ab2b74658814.gif)

[Demo](https://microsoft.github.io/SandDance/app) - [API Reference](https://microsoft.github.io/SandDance/docs/sanddance-react/v4)

## Installation

Add these to the `dependencies` section of your `package.json`, then run `npm install`:

```json
"@msrvida/sanddance-react": "^4",
"react": "^17",
"react-dom": "^17",
"vega": "^5.30"
```

Import these in your JavaScript:

```js
import * as vega from 'vega';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as SandDanceReact from '@msrvida/sanddance-react';

SandDanceReact.use(React, ReactDOM, vega);

const data = [
    { a: 1, b: "c1" },
    { a: 1, b: "c2" },
    { a: 2, b: "c3" },
    { a: 3, b: "c4" }
];

const insight = {
    columns: {
        x: "a",
        color: "b",
    },
    scheme: "set1",
    chart: "barchartV",
    view: "2d",
    size: {
        height: 800,
        width: 800
    }
}

ReactDOM.render(
    <SandDanceReact.Viewer
        data={data}
        insight={insight}
    />,
    document.getElementById('app')
);
```

## Versions

### Breaking changes in v4

* renamed SandDanceReact to Viewer
* removed deck.gl dependency

## For more information
Please visit the [SandDance website](https://microsoft.github.io/SandDance/).
