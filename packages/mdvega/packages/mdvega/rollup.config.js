import resolve from '@rollup/plugin-node-resolve';

export default {
    input: './dist/es6/index.js',
    output: {
        file: './dist/umd/mdvega.js',
        format: 'umd',
        name: 'MdVega',
        globals: {
            'markdown-it': 'markdownit',
            'vega': 'vega',
            'vega-lite': 'vegaLite',
        },
    },
    external: [
        'markdown-it',
        'vega',
        'vega-lite',
    ],
    plugins: [
        resolve(),
    ],
};
