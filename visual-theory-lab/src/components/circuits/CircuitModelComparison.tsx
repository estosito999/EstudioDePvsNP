import { circuitModels } from '../../modules/circuits/circuitData';

export function CircuitModelComparison() {
  return (
    <section className="verification-card circuit-model-card">
      <div className="verification-card-header">
        <div><p className="eyebrow">Models</p><h2>AC0 vs NC vs P/poly</h2></div>
      </div>
      <div className="automata-stub-grid">
        {circuitModels.map((model) => (
          <article key={model.id}>
            <strong>{model.label}</strong>
            <span>{model.description}</span>
            <p>{model.intuition}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
