import React, { useState } from "react";
import Button from "@modules/shared/component/Button.tsx";
import FieldText from "@modules/shared/component/FieldText.tsx";
import { useSocket } from "@modules/shared/hooks/useWebsocket.ts";

interface ConfigUser {
  seed?: string;
  cable?: string;
}
function Config() {
  const [config, setConfig] = useState<ConfigUser>({});
  const { isConnected, setSeed } = useSocket();
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
    <section className="panel config-panel">
      <div className="section-heading">
        <div className="section-title">
          <span className="section-kicker">Parametros</span>
          <h1>Configuracion inicial</h1>
          <p>Defina los parametros de conexion y simulacion.</p>
        </div>
      </div>

      <div className="form-grid">
        <FieldText legend="Semilla" className="field-card">
          <label htmlFor="seed">Seed</label>
          <small>Permite repetir exactamente los mismos resultados.</small>
          <input
            disabled={!isConnected}
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
        </FieldText>

        <FieldText legend="Cable" className="field-card">
          <label htmlFor="cable">Cable</label>
          <small>
            Cantidad o identificador de cable para enviar al simulador.
          </small>
          <input
            disabled={!isConnected}
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
        </FieldText>
      </div>

      <div className="info-line">
        <span>i</span>
        <p>
          {isConnected
            ? "La conexion esta activa. Puede enviar la configuracion."
            : "Para editar y enviar la configuracion, conecte primero desde la pantalla Conexion."}
        </p>
      </div>

      <div className="panel-actions">
        <Button
          disabled={!isConnected}
          variant="secondary"
          onClick={() =>
            setSeed({
              seed: config.seed ?? "",
              cable: config.cable ?? "",
            })}
        >
          Establecer Semilla
        </Button>
      </div>
    </section>
  );
}

export default Config;
