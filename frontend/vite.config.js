import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  server: {
    host: process.env.VITE_HOST || "0.0.0.0",
    port: parseInt(process.env.VITE_PORT) || 5001,
    hmr: {
      clientPort: 443,
    },
    allowedHosts: "all",
  },
});
