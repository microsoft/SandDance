/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

export const embedHtml = (title: string, embed: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@msrvida/sanddance-explorer@4/dist/css/sanddance-explorer.css" />
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@msrvida/sanddance-embed@4/dist/css/sanddance-embed.css" />
</head>
<body>
    <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/vega@5.32/build/vega.min.js"></script>
    <script src="https://unpkg.com/@fluentui/react@8/dist/fluentui-react.js"></script>
    <script src="https://unpkg.com/@msrvida/fluentui-icons@1/dist/umd/fluentui-icons.js"></script>
    <script src="https://unpkg.com/@msrvida/sanddance-explorer@4/dist/umd/sanddance-explorer.js"></script>
    <script src="https://unpkg.com/@msrvida/sanddance-embed@4.4/dist/umd/sanddance-embed.js"></script>
    ${embed}
</body>
</html>`;