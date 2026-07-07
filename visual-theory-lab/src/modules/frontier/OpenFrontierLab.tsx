import { FrontierConceptBanner } from '../../components/frontier/FrontierConceptBanner';
import { FrontierMap } from '../../components/frontier/FrontierMap';
import { FrontierTopicDetail } from '../../components/frontier/FrontierTopicDetail';
import { FrontierTopicSelector } from '../../components/frontier/FrontierTopicSelector';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getFrontierTopic } from './frontierData';
import type { FrontierTopicId } from './frontierTypes';

type OpenFrontierLabProps = {
  activeTopicId: FrontierTopicId;
  onTopicChange: (topicId: FrontierTopicId) => void;
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

export function OpenFrontierLab({ activeTopicId, onTopicChange, onEvent }: OpenFrontierLabProps) {
  const topic = getFrontierTopic(activeTopicId);

  function selectTopic(topicId: FrontierTopicId) {
    const nextTopic = getFrontierTopic(topicId);
    onTopicChange(topicId);
    onEvent(`Frontera seleccionada: ${nextTopic.title} (${nextTopic.status})`, nextTopic.status === 'OPEN' ? 'info' : 'warn');
    if (topicId === 'p-vs-np') onEvent('Guardrail activo: P vs NP sigue ABIERTO; no se presenta P=NP ni P≠NP como demostrado', 'warn');
  }

  return (
    <section className="module-shell frontier-module">
      <header className="module-toolbar verification-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>Open Frontier Lab</h1>
          <p className="module-subtitle">Mapa de problemas abiertos, barreras tecnicas y lo que realmente esta demostrado.</p>
        </div>
        <div className="toolbar-actions">
          <StatusBadge label="OPEN PROBLEMS" tone="yellow" />
          <StatusBadge label="BARRIERS" tone="red" />
          <StatusBadge label="NO CLAIMED PROOF" tone="cyan" />
        </div>
      </header>

      <div className="verification-content">
        <FrontierConceptBanner />
        <FrontierTopicSelector activeTopicId={activeTopicId} onSelectTopic={selectTopic} />
        <div className="frontier-main-grid">
          <FrontierTopicDetail topic={topic} />
          <FrontierMap topic={topic} />
        </div>
      </div>
    </section>
  );
}
