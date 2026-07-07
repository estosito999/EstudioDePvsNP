import { AutomataConceptMap } from '../../components/automata/AutomataConceptMap';
import { ModelSelector } from '../../components/automata/ModelSelector';
import { TuringMachineVisualizer } from '../../components/automata/TuringMachineVisualizer';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { automataConcepts } from './automataConceptsData';
import type { AutomataModelId } from './automataTypes';

type TuringAutomataLabProps = {
  activeModelId: AutomataModelId;
  onModelChange: (modelId: AutomataModelId) => void;
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

export function TuringAutomataLab({ activeModelId, onModelChange, onEvent }: TuringAutomataLabProps) {
  const activeModel = automataConcepts.find((concept) => concept.id === activeModelId) ?? automataConcepts[3];

  function selectModel(modelId: AutomataModelId) {
    onModelChange(modelId);
    const concept = automataConcepts.find((item) => item.id === modelId);
    onEvent(`${concept?.label ?? modelId} seleccionado`, 'system');
    if (modelId === 'ntm') onEvent('Error comun mostrado', 'warn');
  }

  return (
    <section className="module-shell automata-module">
      <header className="module-toolbar verification-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>Turing & Automata Lab</h1>
          <p className="module-subtitle">Modelos de computacion para conectar determinismo, no determinismo, P y NP.</p>
        </div>
        <div className="toolbar-actions">
          <StatusBadge label="TRUTH LAYER" tone="green" />
          <StatusBadge label="MISCONCEPTION LAYER" tone="yellow" />
          <StatusBadge label={activeModel.status} tone={activeModel.status === 'functional' ? 'green' : 'purple'} />
        </div>
      </header>

      <div className="verification-content">
        <ModelSelector activeModelId={activeModelId} onSelectModel={selectModel} />
        {activeModelId === 'dtm' ? (
          <TuringMachineVisualizer onEvent={onEvent} />
        ) : (
          <section className="verification-card automata-placeholder-card">
            <div className="verification-card-header">
              <div>
                <p className="eyebrow">Modelo preparado</p>
                <h2>{activeModel.label}</h2>
              </div>
              <StatusBadge label="stub" tone="purple" />
            </div>
            <p>{activeModel.definition}</p>
            <div className="concept-message warning">Visualizador funcional pendiente. La arquitectura ya separa modelo, datos y componentes para ampliarlo sin backend.</div>
          </section>
        )}
        <AutomataConceptMap />
      </div>
    </section>
  );
}
