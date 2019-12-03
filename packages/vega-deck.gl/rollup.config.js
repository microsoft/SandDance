import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './dist/es6/index.js',
  output: {
    file: './dist/umd/vega-deck.gl.js',
    format: 'umd',
    name: 'VegaDeckGl'
  },
  plugins: [
    resolve({ jsnext: true }),
    commonjs({ sourceMap: false })
  ]
};
