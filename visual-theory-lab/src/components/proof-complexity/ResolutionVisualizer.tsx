import { resolutionClauses, resolutionSteps } from '../../modules/proof-complexity/proofComplexityData';

type ResolutionVisualizerProps = {
  activeStepIndex: number;
  onStep: () => void;
  onReset: () => void;
};

const positions: Record<string, { x: number; y: number }> = {
  c1: { x: 80, y: 45 },
  c2: { x: 280, y: 45 },
  c3: { x: 180, y: 135 },
  c4: { x: 360, y: 135 },
  c5: { x: 270, y: 225 },
  c6: { x: 455, y: 225 },
  empty: { x: 365, y: 315 },
};

export function ResolutionVisualizer({ activeStepIndex, onStep, onReset }: ResolutionVisualizerProps) {
  const visibleSteps = resolutionSteps.slice(0, activeStepIndex + 1);
  const activeStep = resolutionSteps[activeStepIndex];
  const visibleClauseIds = new Set(['c1', 'c2', 'c4', 'c6', ...visibleSteps.map((step) => step.conclusion)]);
  const proofSize = visibleClauseIds.size;

  return (
    <div className="resolution-grid">
      <section className="verification-card resolution-graph-card">
        <div className="verification-card-header">
          <div><p className="eyebrow">Resolution derivation</p><h2>Clausulas como nodos</h2></div>
          <span className="complexity-chip">size {proofSize}</span>
        </div>
        <svg className="resolution-svg" viewBox="0 0 540 370">
          {visibleSteps.map((step) => {
            const target = positions[step.conclusion];
            return step.premises.map((premise) => {
              const source = positions[premise];
              return <line className="resolution-arrow-line" key={`${premise}-${step.conclusion}`} x1={source.x} y1={source.y + 18} x2={target.x} y2={target.y - 22} />;
            });
          })}
          {resolutionClauses.filter((clause) => visibleClauseIds.has(clause.id)).map((clause) => {
            const position = positions[clause.id];
            const active = activeStep?.conclusion === clause.id || activeStep?.premises.includes(clause.id);
            return (
              <g className={active ? `resolution-node active ${clause.kind}` : `resolution-node ${clause.kind}`} key={clause.id}>
                <rect x={position.x - 48} y={position.y - 20} width="96" height="40" />
                <text x={position.x} y={position.y + 5}>{clause.label}</text>
              </g>
            );
          })}
        </svg>
      </section>

      <section className="verification-card resolution-step-card">
        <div className="verification-card-header">
          <div><p className="eyebrow">Inference rule</p><h2>{activeStep.title}</h2></div>
          <span className="status-badge green">TEOREMA</span>
        </div>
        <div className="resolution-rule-box">
          <code>{activeStep.rule}</code>
        </div>
        <p>{activeStep.explanation}</p>
        <div className="algorithm-facts-grid">
          <div><span>Regla usada</span><strong>Resolution</strong></div>
          <div><span>Pivote</span><strong>{activeStep.pivot}</strong></div>
          <div><span>Numero de pasos</span><strong>{activeStepIndex + 1} / {resolutionSteps.length}</strong></div>
          <div><span>Tamaño de prueba</span><strong>{proofSize}</strong></div>
        </div>
        <div className="verification-actions">
          <button type="button" onClick={onStep}>Step</button>
          <button type="button" onClick={onReset}>Reset</button>
        </div>
      </section>

      <section className="verification-card proof-complexity-example-card">
        <div className="verification-card-header">
          <div><p className="eyebrow">Ejemplo obligatorio</p><h2>Resolvente</h2></div>
        </div>
        <pre>{'(A ∨ B)\n(¬A ∨ C)\n---------\n(B ∨ C)'}</pre>
      </section>
    </div>
  );
}
