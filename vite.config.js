import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log("Vite config is running in new version xdxdxdxd")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://backendfut.onrender.com',
        ws: true,
        changeOrigin: true,
        secure: false,
        
      }
    }
  }
})
 