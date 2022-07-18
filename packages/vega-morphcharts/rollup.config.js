import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './dist/es6/index.js',
  output: {
    file: './dist/umd/vega-morphcharts.js',
    format: 'umd',
    name: 'VegaMorphCharts'
  },
  plugins: [
    json(),
    resolve({ jsnext: true }),
    commonjs({ sourceMap: false })
  ]
};
