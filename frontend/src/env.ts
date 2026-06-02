// import { load } from "@std/dotenv";
/// <reference types="vite/client" />
export const env = {
  VITE_UVICORN_HOST: import.meta.env.VITE_UVICORN_HOST ?? "localhost",
  VITE_UVICORN_PORT: import.meta.env.VITE_UVICORN_PORT ?? "8000",
};
