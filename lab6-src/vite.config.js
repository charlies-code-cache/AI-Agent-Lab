import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// BASE_PATH lets the same app be published under a sub-folder (GitHub Pages: /AI-Agent-Lab/lab6/).
// Locally it stays at /.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
