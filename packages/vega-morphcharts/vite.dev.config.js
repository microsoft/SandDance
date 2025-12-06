import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'test/vegaspec',
    server: {
        open: true,
        hmr: false,
    },
});
