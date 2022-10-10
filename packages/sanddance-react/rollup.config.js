import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './dist/es6/index.js',
  output: {
    globals: {
      '@msrvida/sanddance': 'SandDance'
    },
    file: './dist/umd/sanddance-react.js',
    format: 'umd',
    name: 'SandDanceReact'
  },
  external: [
    '@msrvida/sanddance'
  ],
  plugins: [
    json(),
    resolve({ jsnext: true }),
    commonjs({ sourceMap: false })
  ]
};
