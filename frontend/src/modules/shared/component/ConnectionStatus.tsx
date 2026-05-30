import { useSocket } from "@/modules/shared/hooks/useWebsocket.ts";

function ConnectionStatus() {
  const { isConnected } = useSocket();

  return (
    <div className="top-connection-status" aria-live="polite">
      <span
        className={`status-dot ${
          isConnected ? "status-dot-online" : "status-dot-offline"
        }`}
      />
      <span>{isConnected ? "Conectado" : "Sin conexion"}</span>
    </div>
  );
}

export default ConnectionStatus;
