import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Main alias
      "@components": path.resolve(__dirname, "./src/components"), // Shortcut for components
      "@utils": path.resolve(__dirname, "./src/utils"), // Shortcut for utilities
    },
  },
});
