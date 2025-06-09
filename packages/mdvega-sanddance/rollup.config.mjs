import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

export default {
    input: './dist/es6/index.js',
    output: {
        file: './dist/umd/mdvega-sanddance.js',
        format: 'umd',
        name: 'MdVegaSandDance',
    },
    external: [
        'vega',
        'vega-lite',
    ],
    plugins: [
        json(),
        resolve({ jsnext: true }),
        commonjs({ sourceMap: false }),
        postcss({
            extract: false, // Don't extract to separate file - bundle inline
            inject: true,   // Inject CSS into the head
            minimize: false,
        }),
    ],
};
