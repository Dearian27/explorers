import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
// import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      devOptions: {
        enabled: true,
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: "Explorers",
        short_name: "explorers",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icon_x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "favicon",
          },
          {
            src: "/icon_x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "favicon",
          },
          {
            src: "/icon_x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "apple touch icon",
          },
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "favicon",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "favicon",
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "apple touch icon",
          },
        ],
      },
    }),
  ],
});
