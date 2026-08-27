import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg', 'logos/pwa-logo-square.png', '**/*.pdf'],
      manifest: {
        name: "M.UMAR",
        short_name: "M.UMAR",
        description: "Personal portfolio of Alan Hanma Umar",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/logos/pwa-logo-square.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/logos/pwa-logo-square.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/logos/pwa-logo-square.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,pdf}'],
        maximumFileSizeToCacheInBytes: 5000000
      },
      devOptions: {
        enabled: true
      }
    })
  ],
})
