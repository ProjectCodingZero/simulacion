import { defineConfig, loadEnv, resolveConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import tailwindcss from "@tailwindcss/vite";

import deno from "@deno/vite-plugin";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, Deno.cwd(), "");
  const apiTarget = env.API_URL || "http://localhost:8000/api";
  const backendOrigin = env.BACKEND_ORIGIN || "http://localhost:8000";

  return defineConfig({
    server: {
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/ws": {
          target: backendOrigin,
          changeOrigin: true,
          ws: true,
        },
      },
    },
    plugins: [react(), postcss(), tailwindcss(), deno()],
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
  });
});
