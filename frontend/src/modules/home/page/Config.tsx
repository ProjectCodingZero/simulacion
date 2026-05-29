import React, { useState } from "react";
import Button from "@modules/shared/component/Button.tsx";
import Navbar from "@modules/shared/component/Navbar.tsx";
import FieldText from "@modules/shared/component/FieldText.tsx";
import { useSocket } from "@modules/shared/hooks/useWebsocket.ts";
import toast from "react-hot-toast";

interface ConfigUser {
  seed?: string;
  cable?: string;
}
function Config() {
  const [config, setConfig] = useState<ConfigUser>({});
  const { socket, isConnected, connect, disconnect, setSeed } = useSocket();
  const handleCharacter = (caracteresProhibidos: string[]): (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => void => {
    return (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (caracteresProhibidos.includes(e.key)) {
        e.preventDefault();
      }
    };
  };
  return (
    <section className="center self-center">
      <div className="rounded-xl shadow-lg flex flex-row">
        <FieldText legend="Name">
          <div className="center grid grid-row-2 border border-gray-300 rounded-lg ">
            <label htmlFor="seed" className="text-black m-4">
              Seed:
            </label>
            <input
              disabled={!isConnected}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-uva-500 focus:border-transparent transition-all"
              placeholder="1234"
              type="number"
              id="seed"
              value={config.seed}
              onKeyDown={handleCharacter(["e", "E", "+", "-", "."])}
              onChange={(e) => {
                const target = e.target.value;
                setConfig({ ...config, seed: target });
              }}
            />
            <label htmlFor="cable" className="text-black m-4">
              Cable:
            </label>
            <input
              disabled={!isConnected}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-uva-500 focus:border-transparent transition-all"
              placeholder="Cable"
              type="number"
              id="cable"
              value={config.cable}
              onKeyDown={handleCharacter(["e", "E", "+", "-"])}
              onChange={(e) => {
                const target = e.target.value;
                setConfig({ ...config, cable: target });
              }}
            />
            <div className="center flex flex-col border border-gray-300 rounded-lg m-4 p-4 gap-4">
              {!isConnected &&
                (
                  <Button
                    variant="primary"
                    onClick={connect}
                  >
                    Conectar
                  </Button>
                )}
              {isConnected &&
                (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => {
                        disconnect();
                        setConfig({ cable: "", seed: "" });
                      }}
                    >
                      Desconectar
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setSeed(config.seed, config.cable)}
                    >
                      Establecer Semilla
                    </Button>
                  </>
                )}
            </div>
          </div>
        </FieldText>
      </div>
    </section>
  );
}

export default Config;
