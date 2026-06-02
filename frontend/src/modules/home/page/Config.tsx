import React, { useState } from "react";
import Button from "@modules/shared/component/Button.tsx";
import FieldText from "@modules/shared/component/FieldText.tsx";
import { useSocket } from "@modules/shared/hooks/useWebsocket.ts";

interface ConfigUser {
  seed?: string;
  dias?: string;
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
            value={config.seed ?? ""}
            onKeyDown={handleCharacter(["e", "E", "+", "-", "."])}
            onChange={(e) => {
              const target = e.target.value;
              setConfig({ ...config, seed: target });
            }}
          />
        </FieldText>

        <FieldText legend="Dias" className="field-card">
          <label htmlFor="dias">Dias</label>
          <small>
            Cantidad de dias a simular. Se procesa un lote por dia.
          </small>
          <input
            disabled={!isConnected}
            placeholder="30"
            type="number"
            id="dias"
            value={config.dias ?? ""}
            onKeyDown={handleCharacter(["e", "E", "+", "-"])}
            onChange={(e) => {
              const target = e.target.value;
              setConfig({ ...config, dias: target });
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
              dias: config.dias ?? "",
            })}
        >
          Ejecutar simulacion
        </Button>
      </div>
    </section>
  );
}

export default Config;
