import Button from "@/modules/shared/component/Button";
import { useSocket } from "@/modules/shared/hooks/useWebsocket";

function Connection() {
  const { socket, isConnected, connect, disconnect } = useSocket();
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <h1>Conexion</h1>
          <p>Estado del canal websocket para la simulacion.</p>
        </div>
      </div>

      <div className="side-actions config-actions">
        <Button
          variant="primary"
          onClick={() => {
            connect();
            console.log(`socket: ${socket.active}`);
          }}
        >
          Connect {isConnected ? "online" : "offline"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            disconnect();
            console.log(`socket: ${socket.active}`);
          }}
        >
          Disconnect
        </Button>
      </div>
    </section>
  );
}

export default Connection;
