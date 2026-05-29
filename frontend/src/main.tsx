import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { env } from "@/env";
import { WebSocketProvider } from "@/modules/shared/context/WebSocketProvider";
import "./index.css";

const API_URL: string = `http://${env[`VITE_UVICORN_HOST`]}:${
  env[`VITE_UVICORN_PORT`]
}`;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </StrictMode>,
);
