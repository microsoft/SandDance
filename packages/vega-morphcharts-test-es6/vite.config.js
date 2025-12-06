import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/vega-morphcharts-test-es6.ts'),
            formats: ['umd'],
            name: 'VegaMorphchartsTestES6',
            fileName: () => 'vega-morphcharts-test-es6.js',
        },
        outDir: '../../docs/tests/v4/es6/js',
        emptyOutDir: false,
        sourcemap: false,
        minify: false,
    },
});
