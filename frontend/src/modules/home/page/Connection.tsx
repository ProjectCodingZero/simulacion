import { Wifi, WifiOff } from "lucide-react";
import Button from "@/modules/shared/component/Button";
import { useSocket } from "@/modules/shared/hooks/useWebsocket";

function Connection() {
  const { isConnected, connect, disconnect } = useSocket();
  return (
    <section className="panel network-panel">
      <div className="section-heading">
        <div className="section-title">
          <span className="section-kicker">Red</span>
          <h1>Servicio de simulacion</h1>
          <p>Administre la comunicacion en tiempo real con el servidor.</p>
        </div>
      </div>

      <div className="network-card">
        <div className="network-icon">
          {isConnected
            ? <Wifi size={30} aria-hidden="true" strokeWidth={1.9} />
            : <WifiOff size={30} aria-hidden="true" strokeWidth={1.9} />}
        </div>
        <div>
          <span>Estado actual</span>
          <strong>{isConnected ? "Red activa" : "Red desconectada"}</strong>
          <p>
            {isConnected
              ? "El canal WebSocket esta disponible para enviar parametros."
              : "Inicie la conexion antes de configurar la simulacion."}
          </p>
        </div>
      </div>

      <div className="panel-actions">
        <Button
          variant="primary"
          disabled={isConnected}
          onClick={connect}
        >
          Buscar red
        </Button>
        <Button
          variant="secondary"
          disabled={!isConnected}
          onClick={disconnect}
        >
          Desconectar
        </Button>
      </div>
    </section>
  );
}

export default Connection;
