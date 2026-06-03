import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.API_URL || "http://localhost:8000/api";
  const backendOrigin = env.BACKEND_ORIGIN || "http://localhost:8000";
  const allowedHosts = (env.VITE_ALLOWED_HOSTS || "utnfrt.bonar.tech")
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean);
  const proxy = {
    "/api": {
      target: apiTarget,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, ""),
    },
    "/ws": {
      target: backendOrigin,
      changeOrigin: true,
      ws: true,
    },
  };

  return defineConfig({
    resolve: {
      alias: {
        "@": "/src",
        "@modules": "/src/modules",
      },
    },
    server: {
      proxy,
    },
    preview: {
      allowedHosts,
      proxy,
    },
    plugins: [react(), tailwindcss()],
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
  });
});
