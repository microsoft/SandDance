import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/sanddance-test-es6.ts'),
            formats: ['umd'],
            name: 'SandDanceTestES6',
            fileName: () => 'sanddance-test-es6.js',
        },
        outDir: '../../docs/tests/v4/es6/js',
        emptyOutDir: false,
        sourcemap: false,
        minify: false,
    },
});
