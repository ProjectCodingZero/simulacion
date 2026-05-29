import { io, type Socket } from "socket.io-client";

interface ServerToClientEvents {
  noArg: () => void;
  saludo: (mensaje: string) => void;
  chatMessage: (data: { usuario: string; texto: string }) => void;
}

interface ClientToServerEvents {
  identificar: (nombre: string) => void;
  enviarMensaje: (texto: string) => void;
}
