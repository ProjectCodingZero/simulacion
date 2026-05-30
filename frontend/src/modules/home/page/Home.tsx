import { Cog, Magnet, PackageCheck, Truck, UserCheck } from "lucide-react";

function Home() {
  return (
    <div className="page-stack">
      <section className="panel">
        <div className="section-heading">
          <div className="section-title">
            <span className="section-kicker">Vista general</span>
            <h1>Resumen del proceso</h1>
            <p>Configure los datos y ejecute la simulacion.</p>
          </div>
          <button className="secondary compact" disabled type="button">
            Exportar CSV
          </button>
        </div>

        <div className="process-strip">
          <article className="stage-card">
            <div className="stage-heading">
              <span className="stage-number blue">1</span>
              <strong>Recepcion</strong>
            </div>
            <Truck
              className="stage-icon"
              aria-hidden="true"
              strokeWidth={1.8}
            />
            <b>0 kg</b>
            <small>Material ingresado</small>
          </article>
          <div className="arrow">&rarr;</div>
          <article className="stage-card">
            <div className="stage-heading">
              <span className="stage-number green">2</span>
              <strong>Clasificacion</strong>
            </div>
            <UserCheck
              className="stage-icon"
              aria-hidden="true"
              strokeWidth={1.8}
            />
            <b>0 kg</b>
            <small>Material separado</small>
          </article>
          <div className="arrow">&rarr;</div>
          <article className="stage-card">
            <div className="stage-heading">
              <span className="stage-number orange">3</span>
              <strong>Triturado</strong>
            </div>
            <Cog className="stage-icon" aria-hidden="true" strokeWidth={1.8} />
            <b>0 kg</b>
            <small>Material procesado</small>
          </article>
          <div className="arrow">&rarr;</div>
          <article className="stage-card">
            <div className="stage-heading">
              <span className="stage-number purple">4</span>
              <strong>Separacion</strong>
            </div>
            <Magnet
              className="stage-icon"
              aria-hidden="true"
              strokeWidth={1.8}
            />
            <b>0 kg</b>
            <small>Material recuperado</small>
          </article>
          <div className="arrow">&rarr;</div>
          <article className="stage-card">
            <div className="stage-heading">
              <span className="stage-number teal">5</span>
              <strong>Salida</strong>
            </div>
            <PackageCheck
              className="stage-icon"
              aria-hidden="true"
              strokeWidth={1.8}
            />
            <b>0 kg</b>
            <small>Resultado final</small>
          </article>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <h2>Resultados finales</h2>
            <p>Distribucion de materiales recuperados y perdidas.</p>
          </div>
          <div className="material-grid">
            <article className="material-card copper">
              <span>Cobre</span>
              <strong>0 kg</strong>
              <small>0,00 %</small>
            </article>
            <article className="material-card aluminum">
              <span>Aluminio</span>
              <strong>0 kg</strong>
              <small>0,00 %</small>
            </article>
            <article className="material-card plastic">
              <span>Plastico</span>
              <strong>0 kg</strong>
              <small>0,00 %</small>
            </article>
            <article className="material-card other">
              <span>Otros</span>
              <strong>0 kg</strong>
              <small>0,00 %</small>
            </article>
            <article className="material-card losses">
              <span>Perdidas</span>
              <strong>0 kg</strong>
              <small>0,00 %</small>
            </article>
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
              <dd>0</dd>
            </div>
            <div>
              <dt>Horas simuladas</dt>
              <dd>0</dd>
            </div>
            <div>
              <dt>Cable recibido</dt>
              <dd>0 kg</dd>
            </div>
            <div>
              <dt>Material recuperado</dt>
              <dd>0 kg</dd>
            </div>
            <div>
              <dt>Perdidas totales</dt>
              <dd>0 kg</dd>
            </div>
            <div>
              <dt>Eficiencia</dt>
              <dd>0,00 %</dd>
            </div>
          </dl>
          <div className="lot-summary">
            <span>
              Cobre unipolar: <b>0</b>
            </span>
            <span>
              Aluminio: <b>0</b>
            </span>
            <span>
              Mixto: <b>0</b>
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;
