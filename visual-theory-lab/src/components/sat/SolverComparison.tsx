import type { SolverStatus, Z3SolveResponse } from '../../modules/sat/satTypes';

type SolverComparisonProps = {
  bruteForceAssignments: number;
  dpllStatus: SolverStatus;
  z3Result?: Z3SolveResponse;
};

export function SolverComparison({ bruteForceAssignments, dpllStatus, z3Result }: SolverComparisonProps) {
  return (
    <section className="verification-card solver-comparison-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Solver comparison</p>
          <h2>Fuerza bruta vs DPLL vs Z3</h2>
        </div>
      </div>
      <div className="solver-grid">
        <article><span>Fuerza bruta</span><strong>{bruteForceAssignments.toLocaleString()} asignaciones</strong></article>
        <article><span>DPLL educativo</span><strong>{dpllStatus}</strong></article>
        <article><span>Z3 backend</span><strong>{z3Result?.status ?? 'sin ejecutar'}</strong></article>
      </div>
      {z3Result?.model ? (
        <div className="z3-model-readout">
          {Object.entries(z3Result.model).map(([variable, value]) => <code key={variable}>{variable}={String(value)}</code>)}
        </div>
      ) : null}
    </section>
  );
}
