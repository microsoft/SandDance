// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
export const embedHtml = (title: string, embed: string) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" type="text/css"
        href="https://unpkg.com/@msrvida/sanddance-embed@3/dist/css/sanddance-embed.css" />
    <link rel="stylesheet" type="text/css"
        href="https://unpkg.com/@msrvida/sanddance-explorer@3/dist/css/sanddance-explorer.css" />
</head>

<body>
    <script src="https://unpkg.com/react@16.13/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16.13/umd/react-dom.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/deck.gl@8.1.5/dist.min.js"></script>
    <script src="https://unpkg.com/vega@5.11/build/vega.min.js"></script>
    <script src="https://unpkg.com/@fluentui/react@7.111/dist/fluentui-react.js"></script>
    <script src="https://unpkg.com/@msrvida/sanddance-explorer@3/dist/umd/sanddance-explorer.js"></script>
    <script src="https://unpkg.com/@msrvida/sanddance-embed@3/dist/umd/sanddance-embed.js"></script>

    <div id="app"></div>

    ${embed}

</body>

</html>`;