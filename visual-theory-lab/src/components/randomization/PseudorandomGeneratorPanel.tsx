import { randomizationLabMeta } from '../../modules/randomization/randomizationData';

export function PseudorandomGeneratorPanel() {
  return (
    <section className="verification-card prg-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Derandomization</p>
          <h2>Generadores pseudoaleatorios</h2>
        </div>
        <span className="status-badge purple">PRG</span>
      </div>
      <div className="prg-pipeline">
        {randomizationLabMeta.prgPipeline.map((stage, index) => (
          <div className="prg-stage" key={stage}>
            <span>{index + 1}</span>
            <strong>{stage}</strong>
          </div>
        ))}
      </div>
      <p>Un PRG útil expande una semilla corta en bits que un algoritmo eficiente no puede distinguir de aleatoriedad real.</p>
    </section>
  );
}
