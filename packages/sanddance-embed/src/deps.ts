/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

namespace SandDanceEmbed {

    export function defaultDependencies(localDev = false, static = false, minified = true) {
        const deps: EmbedDependency[] = [
            {
                type: 'stylesheet',
                url: `${localDev
                    ? '../../../sanddance-explorer'
                    : 'https://unpkg.com/@msrvida/sanddance-explorer@4'
                }/dist/css/sanddance-explorer.css`,
            },
            {
                type: 'stylesheet',
                url: `${localDev
                    ? '../..'
                    : 'https://unpkg.com/@msrvida/sanddance-embed@4'
                }/dist/css/sanddance-embed.css`,
            },
            {
                type: 'script',
                url: `${localDev
                    ? '../../../../node_modules/react'
                    : 'https://unpkg.com/react@17'
                }/umd/react.${minified ? 'production.min' : 'development'}.js`,
            },
            {
                type: 'script',
                url: `${localDev
                    ? '../../../../node_modules/react-dom'
                    : 'https://unpkg.com/react-dom@17'
                }/umd/react-dom.${minified ? 'production.min' : 'development'}.js`,
            },
            {
                type: 'script',
                url: `${localDev
                    ? '../../../../node_modules/vega'
                    : 'https://unpkg.com/vega@5.32'
                }/build/vega${minified ? '.min' : ''}.js`,
            },
            {
                type: 'script',
                url: `${localDev
                    ? '../../../../node_modules/@fluentui/react'
                    : 'https://unpkg.com/@fluentui/react@8'
                }/dist/fluentui-react.js`,
            },
            {
                type: 'script',
                url: `${localDev
                    ? '../../../fluentui-icons'
                    : 'https://unpkg.com/@msrvida/fluentui-icons@1'
                }/dist/umd/fluentui-icons.js`,
            },
            {
                type: 'script',
                url: `${localDev
                    ? '../../../sanddance-explorer'
                    : 'https://unpkg.com/@msrvida/sanddance-explorer@4'
                }/dist/umd/sanddance-explorer.js`,
            },
        ];
        if (static) {
            deps.push(
                {
                    type: 'script',
                    url: `${localDev
                        ? '../..'
                        : 'https://unpkg.com/@msrvida/sanddance-embed@4'
                    }/dist/umd/sanddance-embed.js`,
                },
            );
        }
        return deps;
    }
}
