import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/Vector_Strike/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      includeAssets: ['favicon.ico', 'vite.svg', '*.png'],
      manifest: {
        id: '/Vector_Strike/',
        start_url: '/Vector_Strike/',
        scope: '/Vector_Strike/',
        name: 'Vector Strike',
        short_name: 'Vector Strike',
        description: 'Um simulador tático militar focado na resolução de problemas de física.',
        theme_color: '#06b6d4',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'landscape',
        icons: [
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'vite.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      devOptions: {
        enabled: true
      }
    })
  ],
})
