import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    publicDir: resolve(__dirname, '../../docs'),
    server: {
        open: true,
    },
});
