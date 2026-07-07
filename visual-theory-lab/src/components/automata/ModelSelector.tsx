import type { AutomataModelId } from '../../modules/automata/automataTypes';
import { automataConcepts } from '../../modules/automata/automataConceptsData';

type ModelSelectorProps = {
  activeModelId: AutomataModelId;
  onSelectModel: (modelId: AutomataModelId) => void;
};

export function ModelSelector({ activeModelId, onSelectModel }: ModelSelectorProps) {
  return (
    <div className="automata-model-selector">
      {automataConcepts.map((concept) => (
        <button
          className={concept.id === activeModelId ? 'automata-model-card active' : 'automata-model-card'}
          key={concept.id}
          type="button"
          onClick={() => onSelectModel(concept.id)}
        >
          <strong>{concept.label}</strong>
          <span>{concept.status}</span>
        </button>
      ))}
    </div>
  );
}
