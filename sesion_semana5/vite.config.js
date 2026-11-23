import react from '@vitejs/plugin-react'
import process from 'node:process'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Permite publicar en la raíz o bajo una subruta (por ejemplo, GitHub Pages).
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
})
