import { algebraicConcepts } from '../../modules/algebraic/algebraicData';
import type { AlgebraicConceptId } from '../../modules/algebraic/algebraicTypes';

type AlgebraicConceptSelectorProps = {
  activeConceptId: AlgebraicConceptId;
  onSelectConcept: (conceptId: AlgebraicConceptId) => void;
};

export function AlgebraicConceptSelector({ activeConceptId, onSelectConcept }: AlgebraicConceptSelectorProps) {
  return (
    <div className="algebraic-concept-selector">
      {algebraicConcepts.map((concept) => (
        <button
          className={concept.id === activeConceptId ? 'algebraic-concept-card active' : 'algebraic-concept-card'}
          key={concept.id}
          type="button"
          onClick={() => onSelectConcept(concept.id)}
        >
          <strong>{concept.title}</strong>
          <span>{concept.id}</span>
        </button>
      ))}
    </div>
  );
}
