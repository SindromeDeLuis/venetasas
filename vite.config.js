import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon.ico"],
      manifest: {
        name: "VeneTasas",
        short_name: "VeneTasas",
        description: "Comparador de tasas cambiarias en Venekia",
        theme_color: "#0d1117",
        background_color: "#0d1117",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
