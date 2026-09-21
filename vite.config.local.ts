// Local development config - bypasses Cloudflare Workers for Windows compatibility
// Use: node node_modules/vite/bin/vite.js dev --config vite.config.local.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { sites } from "./build/sites-vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    sites({ mockAuth: true }),
  ],
  resolve: {
    alias: {
      "@": "/app",
    },
  },
  server: {
    port: 3000,
  },
});
