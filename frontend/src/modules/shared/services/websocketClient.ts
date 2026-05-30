import { env } from "@/env.ts";
import { io, type Socket } from "socket.io-client";

export interface SetSeedPayload {
  seed: string;
  cable: string;
}

interface ServerToClientEvents {
  setSeed: (payload: SetSeedPayload) => void;
}

interface ClientToServerEvents {
  setSeed: (payload: SetSeedPayload) => void;
}

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const WEBSOCKET_URL =
  `http://${env.VITE_UVICORN_HOST}:${env.VITE_UVICORN_PORT}`;

export function createWebSocketClient(): AppSocket {
  return io(WEBSOCKET_URL, { path: "/ws", autoConnect: false });
}
