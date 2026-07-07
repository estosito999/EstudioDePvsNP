import type { AlgorithmMeta } from '../../modules/algorithms/algorithmTypes';

type ComplexityCardProps = {
  algorithm: AlgorithmMeta;
};

export function ComplexityCard({ algorithm }: ComplexityCardProps) {
  return (
    <section className="verification-card algorithm-complexity-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Complexity</p>
          <h2>{algorithm.name}</h2>
        </div>
        <span className="status-badge green">TEOREMA</span>
      </div>
      <div className="algorithm-facts-grid">
        <div><span>Tiempo</span><strong>{algorithm.timeComplexity}</strong></div>
        <div><span>Espacio</span><strong>{algorithm.spaceComplexity}</strong></div>
        <div><span>Funciona cuando</span><p>{algorithm.worksWhen}</p></div>
        <div><span>Falla / cuidado</span><p>{algorithm.failsWhen}</p></div>
      </div>
    </section>
  );
}
