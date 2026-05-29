function Home() {
  return (
    <div className="stack">
      <section className="panel">
        <div className="section-heading">
          <div>
            <h1>Resumen del proceso</h1>
            <p>Configure los datos y ejecute la simulacion.</p>
          </div>
          <button className="secondary compact" disabled type="button">
            Exportar CSV
          </button>
        </div>

        <div className="process-strip">
          <article className="stage-card">
            <span className="stage-number blue">1</span>
            <strong>Recepcion</strong>
            <div className="stage-icon truck"></div>
            <b>0 kg</b>
          </article>
          <div className="arrow">&rarr;</div>
          <article className="stage-card">
            <span className="stage-number green">2</span>
            <strong>Clasificacion</strong>
            <div className="stage-icon worker"></div>
            <b>0 kg</b>
          </article>
          <div className="arrow">&rarr;</div>
          <article className="stage-card">
            <span className="stage-number orange">3</span>
            <strong>Triturado</strong>
            <div className="stage-icon gear"></div>
            <b>0 kg</b>
          </article>
          <div className="arrow">&rarr;</div>
          <article className="stage-card">
            <span className="stage-number purple">4</span>
            <strong>Separacion</strong>
            <div className="stage-icon magnet"></div>
            <b>0 kg</b>
          </article>
          <div className="arrow">&rarr;</div>
          <article className="stage-card">
            <span className="stage-number teal">5</span>
            <strong>Salida</strong>
            <div className="stage-icon box"></div>
            <b>0 kg</b>
          </article>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="panel">
          <h2>Resultados finales</h2>
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
          <h2>Resumen general</h2>
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
