import {
  CircleAlert,
  Cog,
  type LucideIcon,
  Magnet,
  PackageCheck,
  Truck,
  UserCheck,
} from "lucide-react";
import { useSocket } from "@/modules/shared/hooks/useWebsocket.ts";
import type {
  MaterialId,
  ProcessStageId,
} from "@/modules/shared/types/simulation.ts";

interface StageView {
  id: ProcessStageId;
  number: number;
  label: string;
  description: string;
  colorClass: string;
  Icon: LucideIcon;
}

interface MaterialView {
  id: MaterialId;
  label: string;
  className: string;
}

const STAGES: StageView[] = [
  {
    id: "reception",
    number: 1,
    label: "Recepcion",
    description: "Material ingresado",
    colorClass: "blue",
    Icon: Truck,
  },
  {
    id: "classification",
    number: 2,
    label: "Clasificacion",
    description: "Material separado",
    colorClass: "green",
    Icon: UserCheck,
  },
  {
    id: "crushing",
    number: 3,
    label: "Triturado",
    description: "Material procesado",
    colorClass: "orange",
    Icon: Cog,
  },
  {
    id: "separation",
    number: 4,
    label: "Separacion",
    description: "Material recuperado",
    colorClass: "purple",
    Icon: Magnet,
  },
  {
    id: "output",
    number: 5,
    label: "Salida",
    description: "Resultado final",
    colorClass: "teal",
    Icon: PackageCheck,
  },
];

const MATERIALS: MaterialView[] = [
  { id: "copper", label: "Cobre", className: "copper" },
  { id: "aluminum", label: "Aluminio", className: "aluminum" },
  { id: "plastic", label: "Plastico", className: "plastic" },
  { id: "other", label: "Otros", className: "other" },
];

const statusText = {
  idle: "Configure los datos y ejecute la simulacion.",
  running: "Simulacion en ejecucion.",
  completed: "Simulacion finalizada.",
  paused: "Simulacion pausada.",
  error: "La simulacion informo un error.",
};

function formatKg(value: number) {
  return `${formatNumber(value)} kg`;
}

function formatPercent(value: number) {
  return `${formatNumber(value)} %`;
}

function formatNumber(value: number) {
  return value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function Home() {
  const { dashboard } = useSocket();
  const statusMessage = dashboard.message ?? statusText[dashboard.status];

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="section-heading">
          <div className="section-title">
            <span className="section-kicker">Vista general</span>
            <h1>Resumen del proceso</h1>
            <p
              className={dashboard.status === "error" ? "error-message" : ""}
            >
              {dashboard.status === "error" && (
                <CircleAlert aria-hidden="true" strokeWidth={2.2} />
              )}
              <span>{statusMessage}</span>
            </p>
          </div>
          <button
            className="secondary compact"
            disabled={dashboard.status !== "completed"}
            type="button"
          >
            Exportar CSV
          </button>
        </div>

        <div className="process-strip">
          {STAGES.map((
            { id, number, label, description, colorClass, Icon },
          ) => (
            <article className="stage-card" key={id}>
              <div className="stage-heading">
                <span className={`stage-number ${colorClass}`}>{number}</span>
                <strong>{label}</strong>
              </div>
              <Icon
                className="stage-icon"
                aria-hidden="true"
                strokeWidth={1.8}
              />
              <b>{formatKg(dashboard.stages[id].kg)}</b>
              <small>{description}</small>
            </article>
          ))}
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <h2>Resultados finales</h2>
            <p>Distribucion de materiales recuperados y perdidas.</p>
          </div>
          <div className="material-grid">
            {MATERIALS.map(({ id, label, className }) => (
              <article className={`material-card ${className}`} key={id}>
                <div className="material-card-label">
                  <span>{label}</span>
                </div>
                <div className="material-card-value">
                  <strong>{formatKg(dashboard.materials[id].kg)}</strong>
                </div>
                <div className="material-card-percent">
                  <small>
                    {formatPercent(dashboard.materials[id].percentage)}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="panel summary-panel">
          <div className="panel-heading">
            <h2>Resumen general</h2>
            <p>Totales acumulados de la corrida.</p>
          </div>
          <dl>
            <div>
              <dt>Dias simulados</dt>
              <dd>{dashboard.simulatedDays}</dd>
            </div>
            <div>
              <dt>Horas simuladas</dt>
              <dd>{dashboard.simulatedHours}</dd>
            </div>
            <div>
              <dt>Cable recibido</dt>
              <dd>{formatKg(dashboard.totals.cableReceivedKg)}</dd>
            </div>
            <div>
              <dt>Material recuperado metalico</dt>
              <dd>{formatKg(dashboard.totals.recoveredKg)}</dd>
            </div>
            <div>
              <dt>Material recuperado no metalico</dt>
              <dd>{formatKg(dashboard.totals.recoveredNotMetallicKg)}</dd>
            </div>
            <div>
              <dt>Perdidas totales</dt>
              <dd>{formatKg(dashboard.totals.lossesKg)}</dd>
            </div>
            <div>
              <dt>Eficiencia</dt>
              <dd>{formatPercent(dashboard.totals.efficiencyPercentage)}</dd>
            </div>
          </dl>
          <div className="lot-summary">
            <span>
              Cobre unipolar: <b>{dashboard.lots.copperUnipolar}</b>
            </span>
            <span>
              Aluminio: <b>{dashboard.lots.aluminum}</b>
            </span>
            <span>
              Mixto: <b>{dashboard.lots.mixed}</b>
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;
