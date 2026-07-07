import { ReductionStepPanel } from './ReductionStepPanel';
import type { ReductionMeta } from '../../modules/reduction/reductionTypes';

type ReductionVisualizerProps = {
  reduction: ReductionMeta;
  activeStepIndex: number;
  onStepChange: (stepIndex: number) => void;
};

export function ReductionVisualizer({ reduction, activeStepIndex, onStepChange }: ReductionVisualizerProps) {
  const activeStep = reduction.steps[activeStepIndex] ?? reduction.steps[0];

  return (
    <div className="reduction-visual-grid">
      <ReductionStepPanel steps={reduction.steps} activeStepIndex={activeStepIndex} onStepSelect={onStepChange} />

      <section className="verification-card reduction-flow-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Polynomial mapping</p>
            <h2>{reduction.label}</h2>
          </div>
          <span className="complexity-chip">{reduction.theoremStatus}</span>
        </div>

        <div className="reduction-flow">
          <article>
            <span>Problema origen</span>
            <strong>{reduction.sourceProblem}</strong>
            <p>{reduction.inputInstance}</p>
          </article>
          <div className="reduction-arrow">≤p</div>
          <article className="transform">
            <span>Transformacion polinomial</span>
            <strong>{activeStep.title}</strong>
            <p>{activeStep.construction}</p>
          </article>
          <div className="reduction-arrow">→</div>
          <article>
            <span>Problema destino</span>
            <strong>{reduction.targetProblem}</strong>
            <p>{reduction.transformedInstance}</p>
          </article>
        </div>
      </section>

      <section className="verification-card reduction-explanation-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Intuicion visual</p>
            <h2>Por que funciona</h2>
          </div>
        </div>
        <p>{reduction.intuition}</p>
        <div className="concept-message polynomial">{reduction.equivalence}</div>
        {reduction.warning ? <div className="concept-message warning">{reduction.warning}</div> : null}
      </section>
    </div>
  );
}
