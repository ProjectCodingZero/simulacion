import { WebSocketContext } from "@modules/shared/context/WebSocketProvider.tsx";
import { useContext } from "react";

export const useSocket = () => useContext(WebSocketContext);
