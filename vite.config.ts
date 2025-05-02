import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["react-helmet-async"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["react-router-dom", "react-helmet-async"],
          // Add more if you notice other large packages
        },
      },
    },
    chunkSizeWarningLimit: 800, // Optional: increases warning threshold
  },
});
