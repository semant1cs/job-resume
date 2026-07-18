import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages отдаёт проектный сайт из подпути /job-resume/ — переключаем
  // base только для CI-сборки под Pages (GH_PAGES=true), чтобы обычная
  // локальная разработка и деплой на Vercel/Netlify (корень домена) не сломались.
  base: process.env.GH_PAGES ? '/job-resume/' : '/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('node_modules/matter-js')) return 'matter'
          if (id.includes('node_modules/gsap')) return 'gsap'
        },
      },
    },
  },
})
