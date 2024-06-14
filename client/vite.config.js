import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: true, // generate .vite/manifest.json in outDir
    rollupOptions: {
        input: path.resolve(__dirname, 'index.html'), // Ensure this points to index.html
      },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
});
