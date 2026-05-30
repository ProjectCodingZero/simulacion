import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { WebSocketProvider } from "@/modules/shared/context/WebSocketProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </StrictMode>,
);
