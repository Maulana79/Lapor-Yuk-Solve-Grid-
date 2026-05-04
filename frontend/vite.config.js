import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // File statis yang akan di-cache oleh Service Worker
      includeAssets: ['LaporYuk.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
      // Konfigurasi Web App Manifest[cite: 1]
      manifest: {
        name: 'Lapor Yuk!',
        short_name: 'LaporYuk',
        description: 'Aplikasi Web Pelaporan Keluhan Masyarakat',
        theme_color: '#00B27A', // Warna hijau khas aplikasi kalian
        background_color: '#ffffff',
        display: 'standalone', // Agar tampil penuh layaknya aplikasi native mobile[cite: 1]
        orientation: 'portrait',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})