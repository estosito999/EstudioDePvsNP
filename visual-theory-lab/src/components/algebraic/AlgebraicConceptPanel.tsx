import { algebraicConcepts } from '../../modules/algebraic/algebraicData';
import type { AlgebraicConceptId } from '../../modules/algebraic/algebraicTypes';

type AlgebraicConceptPanelProps = {
  activeConceptId: AlgebraicConceptId;
};

export function AlgebraicConceptPanel({ activeConceptId }: AlgebraicConceptPanelProps) {
  const concept = algebraicConcepts.find((item) => item.id === activeConceptId) ?? algebraicConcepts[0];
  return (
    <section className="verification-card algebraic-concept-panel">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Concepto activo</p>
          <h2>{concept.title}</h2>
        </div>
      </div>
      <p>{concept.description}</p>
      <div className="concept-message polynomial">{concept.intuition}</div>
    </section>
  );
}
