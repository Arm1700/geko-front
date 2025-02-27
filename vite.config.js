import { defineConfig } from 'vite';
import fs from 'fs/promises';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig(() => ({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'ie 11'],
      additionalLegacyPolyfills: ['core-js/stable', 'regenerator-runtime/runtime'],
      renderLegacyChunks: true,
    }),
  ],
  esbuild: {
    loader: 'jsx',  // Set the loader for jsx in esbuild configuration
    include: /src\/.*\.(js|jsx)$/,  // Ensure jsx and js files are correctly included
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: 'jsx', // Specify JSX loader for JS files
              contents: await fs.readFile(args.path, 'utf8'),
            }));
          },
        },
      ],
    },
  },
  server: {
    port: 3000,
  },
}));
