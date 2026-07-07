import type { RandomClass } from '../../modules/randomization/randomizationTypes';

type DeterministicComparisonPanelProps = {
  randomClass: RandomClass;
};

export function DeterministicComparisonPanel({ randomClass }: DeterministicComparisonPanelProps) {
  return (
    <section className="verification-card deterministic-comparison-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Model comparison</p>
          <h2>Determinista vs probabilístico</h2>
        </div>
      </div>
      <div className="deterministic-comparison-grid">
        <article><span>Determinista</span><p>{randomClass.deterministicView}</p></article>
        <article className="probabilistic"><span>Probabilístico</span><p>{randomClass.probabilisticView}</p></article>
      </div>
      <div className="concept-message polynomial">{randomClass.guarantee}</div>
    </section>
  );
}
