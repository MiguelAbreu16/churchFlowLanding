import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: ['churchflowlanding-production.up.railway.app', '.up.railway.app'],
  },
  ssr: {
    noExternal: ["@apollo/client"],
  },
})
