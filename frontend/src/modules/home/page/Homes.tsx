import Button from "@/modules/shared/component/Button";
import { useSocket } from "@/modules/shared/hooks/useWebsocket";

function Homes() {
  const { socket, isConnected, connect, disconnect } = useSocket();
  return (
    <div>
      <Button
        onClick={() => {
          connect();
          console.log(`socket: ${socket.active}`);
        }}
      >
        Connect {isConnected ? "✅" : "❌"}
      </Button>
      <Button
        onClick={() => {
          disconnect();
          console.log(`socket: ${socket.active}`);
        }}
      >
        Disconnect
      </Button>
    </div>
  );
}

export default Homes;
