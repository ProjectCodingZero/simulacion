import type { ReactNode } from "react";
import { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { INITIAL_SIMULATION_DASHBOARD } from "@/modules/shared/constants/simulationDashboard.ts";
import {
  type AppSocket,
  createWebSocketClient,
  type SetSeedPayload,
} from "@/modules/shared/services/websocketClient.ts";
import type { SimulationDashboardPayload } from "@/modules/shared/types/simulation.ts";

export interface WebSocketContextState {
  isConnected: boolean;
  dashboard: SimulationDashboardPayload;
  connect: () => void;
  disconnect: () => void;
  setSeed: (payload: SetSeedPayload) => void;
}

export const WebSocketContext = createContext<WebSocketContextState | null>(
  null,
);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [dashboard, setDashboard] = useState<SimulationDashboardPayload>(
    INITIAL_SIMULATION_DASHBOARD,
  );
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

  const setSeed = ({ seed, dias }: SetSeedPayload) => {
    const socket = socketRef.current;

    if (!socket?.connected) {
      toast.error("No hay conexion con el server");
      setIsConnected(false);
      return;
    }

    socket.emit("setSeed", { seed, dias });
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

    const handleSetSeed = ({ seed, dias }: SetSeedPayload) => {
      toast.success(`Seed recibido: ${seed}, dias: ${dias}`);
    };

    const handleSimulationDashboard = (payload: SimulationDashboardPayload) => {
      setDashboard(payload);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("setSeed", handleSetSeed);
    socket.on("simulationDashboard", handleSimulationDashboard);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("setSeed", handleSetSeed);
      socket.off("simulationDashboard", handleSimulationDashboard);
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <WebSocketContext
      value={{
        isConnected,
        dashboard,
        connect,
        disconnect,
        setSeed,
      }}
    >
      {children}
    </WebSocketContext>
  );
}
