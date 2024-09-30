import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: './dist/es6/index.js',
    output: {
        file: './dist/umd/data-inference.js',
        format: 'umd',
        name: 'DataInference',
    },
    plugins: [
        json(),
        resolve({ jsnext: true }),
        commonjs({ sourceMap: false }),
    ],
};
