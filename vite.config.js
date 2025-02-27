import { defineConfig } from 'vite';
import fs from 'fs/promises';
import react from '@vitejs/plugin-react';

export default defineConfig(() => ({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.(js|jsx)$/,
    exclude: [],
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: 'jsx',
              contents: await fs.readFile(args.path, 'utf8'),
            }));
          },
        },
      ],
    },
  },
}));