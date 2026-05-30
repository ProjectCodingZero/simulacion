import type { ReactNode } from "react";
import { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  type AppSocket,
  createWebSocketClient,
  type SetSeedPayload,
} from "@/modules/shared/services/websocketClient.ts";

export interface WebSocketContextState {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  setSeed: (payload: SetSeedPayload) => void;
}

export const WebSocketContext = createContext<WebSocketContextState | null>(
  null,
);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<AppSocket | null>(null);

  const connect = () => {
    const socket = socketRef.current;

    if (!socket) {
      toast.error("No se pudo crear la conexion");
      setIsConnected(false);
      return;
    }

    socket.connect();
  };

  const disconnect = () => {
    socketRef.current?.disconnect();
    setIsConnected(socketRef.current?.connected ?? false);
  };

  const setSeed = ({ seed, cable }: SetSeedPayload) => {
    const socket = socketRef.current;

    if (!socket?.connected) {
      toast.error("No hay conexion con el server");
      setIsConnected(false);
      return;
    }

    socket.emit("setSeed", { seed, cable });
  };

  useEffect(() => {
    const socket = createWebSocketClient();
    socketRef.current = socket;

    const handleConnect = () => {
      setIsConnected(true);
      toast.success("Conectado");
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      toast.success("Desconectado");
    };

    const handleSetSeed = ({ seed, cable }: SetSeedPayload) => {
      toast.success(`Seed recibido: ${seed}, cable: ${cable}`);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("setSeed", handleSetSeed);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("setSeed", handleSetSeed);
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <WebSocketContext
      value={{
        isConnected,
        connect,
        disconnect,
        setSeed,
      }}
    >
      {children}
    </WebSocketContext>
  );
}
