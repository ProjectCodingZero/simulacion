import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { env } from "@/env.ts";
import toast from "react-hot-toast";
export interface WebSocketContextState {
  socket: Socket;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  setSeed: ({ seed, cable }: { seed: string; cable: string }) => void;
}
const API_URL: string = `http://${env[`VITE_UVICORN_HOST`]}:${
  env[`VITE_UVICORN_PORT`]
}`;
export const WebSocketContext = createContext<WebSocketContextState>(
  null,
);
export function WebSocketProvider(
  { children }: { children: React.ReactNode },
) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const socketRef = useRef<Socket>(null);
  const handleConnect = () => {
    if (socketRef.current) {
      socketRef.current.connect();
    } else {
      toast.error("Failed to connect");
      setIsConnected(false);
    }
  };
  const handleDisconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    setIsConnected(socketRef.current?.connected ?? false);
  };
  const handleSetSeed = ({ seed, cable }: { seed: string; cable: string }) => {
    setIsConnected(socketRef.current?.connected ?? false);
    if (socketRef.current && isConnected) {
      socketRef.current.emit("setSeed", { seed, cable });
    }
    setIsConnected(socketRef.current?.connected ?? false);
  };
  useEffect(() => {
    socketRef.current = io(API_URL, { path: "/ws", autoConnect: false });
    socketRef.current.on("connect", () => {
      setIsConnected(true);
      toast.success("Conectado");
    });
    socketRef.current.on("disconnect", () => {
      setIsConnected(false);
      toast.success("Desconectado");
    });
    socketRef.current.on(
      "setSeed",
      ({ seed, cable }: { seed: string; cable: string }) => {
        if (!isConnected) {
          toast.error(`No hay conexion con el server`);
        } else {
          toast.success(`Seed recibido: ${seed}, cable: ${cable}`);
        }
      },
    );
    return () => {
      console.log("Limpiando socket antiguo...");
      if (socketRef.current) {
        socketRef.current.off("connect");
        socketRef.current.off("disconnect");
        socketRef.current.off("setSeed");
        socketRef.current.disconnect();
      }
    };
  }, [socketRef]);
  return (
    <WebSocketContext
      value={{
        socket: socketRef.current,
        isConnected,
        connect: handleConnect,
        disconnect: handleDisconnect,
        setSeed: handleSetSeed,
      }}
    >
      {children}
    </WebSocketContext>
  );
}
