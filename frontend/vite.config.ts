import { defineConfig, loadEnv, resolveConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import tailwindcss from "@tailwindcss/vite";

import deno from "@deno/vite-plugin";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, Deno.cwd(), "");
  const target = env.API_URL || "https://localhost:7000/api";

  return defineConfig({
    server: {
      proxy: {
        "/api": {
          target,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
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
