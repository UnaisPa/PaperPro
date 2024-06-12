import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:5173,
    proxy: {
      '/api': {
        target:'http://localhost:5000',
        changeOrigin:true
      }
    },
    build: {
        // generate .vite/manifest.json in outDir
        manifest: true,
        rollupOptions: {
          // overwrite default .html entry
          input: '/src/main.jsx',
        },
      },
    host:true
  },
  resolve:{
    alias:{
        "@": path.resolve(__dirname,"./src")
    }
  },
  
})
