import { useState } from 'react';
import { ProofSystemSelector } from '../../components/proof-complexity/ProofSystemSelector';
import { ResolutionVisualizer } from '../../components/proof-complexity/ResolutionVisualizer';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { proofComplexityTopics, resolutionSteps } from './proofComplexityData';
import type { ProofSystemId } from './proofComplexityTypes';

type ProofComplexityLabProps = {
  activeTopicId: ProofSystemId;
  onTopicChange: (topicId: ProofSystemId) => void;
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

export function ProofComplexityLab({ activeTopicId, onTopicChange, onEvent }: ProofComplexityLabProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeTopic = proofComplexityTopics.find((topic) => topic.id === activeTopicId) ?? proofComplexityTopics[0];

  function selectTopic(topicId: ProofSystemId) {
    onTopicChange(topicId);
    setActiveStepIndex(0);
    const topic = proofComplexityTopics.find((item) => item.id === topicId);
    onEvent(`Tema ${topic?.label ?? topicId} seleccionado`, 'system');
    if (topicId !== 'resolution') onEvent('Tema preparado para ampliacion futura', 'info');
  }

  function step() {
    const next = Math.min(activeStepIndex + 1, resolutionSteps.length - 1);
    setActiveStepIndex(next);
    onEvent(`Paso ${next + 1} de Resolution cargado`, 'info');
    if (next === resolutionSteps.length - 1) onEvent('Contradiccion final derivada', 'system');
  }

  return (
    <section className="module-shell proof-complexity-module">
      <header className="module-toolbar verification-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>Proof Complexity Lab</h1>
          <p className="module-subtitle">Sistemas de prueba, derivaciones de insatisfacibilidad y tamaño de demostraciones.</p>
        </div>
        <div className="toolbar-actions">
          <StatusBadge label="TRUTH LAYER" tone="green" />
          <StatusBadge label="UNSAT PROOFS" tone="purple" />
          <StatusBadge label="PROOF SIZE" tone="yellow" />
        </div>
      </header>
      <div className="verification-content">
        <ProofSystemSelector activeTopicId={activeTopicId} onSelectTopic={selectTopic} />
        {activeTopicId === 'resolution' ? (
          <ResolutionVisualizer activeStepIndex={activeStepIndex} onStep={step} onReset={() => setActiveStepIndex(0)} />
        ) : (
          <section className="verification-card automata-placeholder-card">
            <div className="verification-card-header">
              <div><p className="eyebrow">Tema preparado</p><h2>{activeTopic.label}</h2></div>
              <StatusBadge label="prepared" tone="purple" />
            </div>
            <p>{activeTopic.description}</p>
            <div className="concept-message warning">Visualizador detallado pendiente. El modulo ya reserva datos y arquitectura para ampliarlo.</div>
          </section>
        )}
      </div>
    </section>
  );
}
