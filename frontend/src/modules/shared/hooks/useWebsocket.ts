import { WebSocketContext } from "@modules/shared/context/WebSocketProvider.tsx";
import { useContext } from "react";

export const useSocket = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error("useSocket debe usarse dentro de WebSocketProvider");
  }

  return context;
};
