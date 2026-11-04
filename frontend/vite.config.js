import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: { "/api": "http://localhost:3001" },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/@react-three/drei/")) return "drei";
          if (id.includes("/node_modules/@react-three/fiber/")) return "fiber";
          if (id.includes("/node_modules/three/")) return "three";
          if (id.includes("/node_modules/gsap/")) return "gsap";
        },
      },
    },
  },
});
