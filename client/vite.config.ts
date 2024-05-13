import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        minify: 'esbuild',
        outDir: "build",
        chunkSizeWarningLimit: 100,
        rollupOptions: {
            onwarn(warning, warn) {
                if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                    return;
                }
                warn(warning);
            },
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        },
    },
})