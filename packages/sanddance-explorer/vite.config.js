import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'bundle/umd.js'),
            name: 'SandDanceExplorer',
            formats: ['umd'],
            fileName: () => 'sanddance-explorer.js',
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
