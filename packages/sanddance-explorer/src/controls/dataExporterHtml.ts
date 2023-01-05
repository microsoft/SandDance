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
</head>

<body>
    <script src="https://unpkg.com/@msrvida/sanddance-embed@4.4/dist/umd/sanddance-embed.js"></script>

    ${embed}

</body>

</html>`;