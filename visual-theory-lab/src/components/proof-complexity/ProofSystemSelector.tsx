import { proofComplexityTopics } from '../../modules/proof-complexity/proofComplexityData';
import type { ProofSystemId } from '../../modules/proof-complexity/proofComplexityTypes';

type ProofSystemSelectorProps = {
  activeTopicId: ProofSystemId;
  onSelectTopic: (topicId: ProofSystemId) => void;
};

export function ProofSystemSelector({ activeTopicId, onSelectTopic }: ProofSystemSelectorProps) {
  return (
    <div className="proof-system-selector">
      {proofComplexityTopics.map((topic) => (
        <button
          className={topic.id === activeTopicId ? 'proof-system-card active' : 'proof-system-card'}
          key={topic.id}
          type="button"
          onClick={() => onSelectTopic(topic.id)}
        >
          <strong>{topic.label}</strong>
          <span>{topic.status}</span>
        </button>
      ))}
    </div>
  );
}
