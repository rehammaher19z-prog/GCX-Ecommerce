
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// إعدادات Vite
export default defineConfig({
  plugins: [react()],

  // مسار المشروع على GitHub Pages
  base: '/GCX-Ecommerce/',
})
