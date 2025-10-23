import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  // Set base to repository name for GitHub Pages
  // Change this to match your repository name: '/<repo-name>/'
  // Or set to '/' if deploying to a custom domain or username.github.io
  base: './',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
