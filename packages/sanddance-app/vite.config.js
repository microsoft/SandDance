import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'dist/es6/index.js'),
            name: 'SandDanceApp',
            formats: ['umd'],
            fileName: () => 'sanddance-app.js',
        },
        outDir: 'dist/umd',
        emptyOutDir: true,
        sourcemap: false,
        minify: false,
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});
