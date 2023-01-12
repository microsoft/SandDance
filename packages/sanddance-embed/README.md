# @msrvida/sanddance-embed

SandDance Embed is the easiest way to integrate [SandDance](https://microsoft.github.io/SandDance/) into your custom app, via an `<iframe>` tag. SandDance Embed is a wrapper around SandDance Explorer, plus [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) handlers to load data and manage its display from outside the iframe.

![image](https://user-images.githubusercontent.com/11507384/72197128-a99cdd80-33d2-11ea-9b49-5d470db0abc1.png)

There are two ways to create a SandDance Embed iframe instance:
1. Cross-domain
2. In-domain

## Cross-domain iframe
This is the simplest approach. Add an `<iframe>` tag in your HTML page:
```html
<iframe id="embedIframe" src="https://microsoft.github.io/SandDance/embed/v4/sanddance-embed.html" style="height:700px;width:100%"></iframe>
```

Get a code reference to this iframe:
```js
const embedIframe = document.getElementById('embedIframe');
embedIframe.onload = () => {
    //ready to send commands to SandDance Embed
}
```

*Note the version number in the address to specify by major version. You may style the iframe as you see fit.*

*Security: The URL is hosted by the secure [SandDance GitHub Pages website](https://github.com/microsoft/SandDance/tree/master/docs/embed).*

*Privacy: The page does not collect any data that you pass to SandDance Embed.*

## In-domain iframe
In your own website you can either [download a copy of the sanddance-embed.html file](https://microsoft.github.io/SandDance/embed/v4/sanddance-embed.html) and use it as above, or create an iframe dynamically.

*Note the static html file approach will provide better performance, by utilizing the browser's built-in caching mechanisms to load scripts.*

To dynamically create a SandDance Embed iframe in JavaScript:
```js
    const embedPromise = new Promise((resolve, reject) => {
        const embedIframe = document.createElement('iframe');
        embedIframe.style.height = '700px';
        embedIframe.style.width = '1000px'
        embedIframe.onload = () => {
            const embedScript = embedIframe.contentDocument.createElement('script');
            embedScript.src = 'https://unpkg.com/@msrvida/sanddance-embed@4/dist/umd/sanddance-embed.js';
            embedIframe.contentDocument.head.appendChild(embedScript);
            embedScript.onload = () => resolve(embedIframe);
            embedScript.onerror = reject;
        };
        document.body.appendChild(embedIframe);
    });
```
This promise provides you `embedIframe` when it is available:
```js
    embedPromise.then((embedIframe) => {
        //ready to send commands to SandDance Embed
    });
```

## Send commands to SandDance Embed
Use `postMessage` to communicate with `embedIframe.contentWindow`. For all command requests, see https://github.com/microsoft/SandDance/blob/master/packages/sanddance-embed/src/types/message-request.d.ts

* Load data and display initial chart:
    ```js
    const data = [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1 },
        { x: 2, y: 2, z: 2 },
    ];
    embedIframe.contentWindow.postMessage({ action: 'load', data, props: { theme: 'dark-theme' } }, '*');
    ```
    The `data` variable can be an array, or a [DataFile object](https://microsoft.github.io/SandDance/docs/sanddance-explorer/v4/interfaces/DataFile.html). The `props` member is optional [Explorer Props](https://microsoft.github.io/SandDance/docs/sanddance-explorer/v4/interfaces/Props.html), here is shown used to specify the dark color theme.  

* Get insight:
    ```js
    embedIframe.contentWindow.postMessage({ action: 'getInsight' }, '*');
    ```

* Get or set theme:
    ```js
    embedIframe.contentWindow.postMessage({ action: 'theme', dark: true }, '*');
    ```

## Receive commands from SandDance Embed
Attach a listener to your own window to observe message passing:
```js
    window.onmessage = (e) => {
        console.log('messaged', e.data);
    };
```
The message will contain a property `request` which is a clone of the requesting message object which instigated the response. Other properties vary depending on the type of request. For all command responses, see https://github.com/microsoft/SandDance/blob/master/packages/sanddance-embed/src/types/message-response.d.ts

 Here is an example of the response for `getInsight`:
```json
{
    "request": {
        "action": "getInsight"
    },
    "insight": {
        "colorBin": null,
        "columns": {
            "x": "x",
            "y": "y"
        },
        "facetStyle": "wrap",
        "filter": null,
        "hideAxes": false,
        "hideLegend": false,
        "signalValues": {
            "RoleZ_ProportionSignal": 0.6,
            "Text_ScaleSignal": 1.2,
            "RoleColor_BinCountSignal": 7,
            "RoleColor_ReverseSignal": false,
            "Chart_PointScaleSignal": 5,
            "RoleZ_Grounded": false
        },
        "size": {
            "height": 663,
            "width": 700
        },
        "totalStyle": null,
        "transform": null,
        "chart": "scatterplot",
        "view": "2d"
    }
}
```

## For more information
Please visit the [SandDance website](https://microsoft.github.io/SandDance/).
