import { frontierTopics } from '../../modules/frontier/frontierData';
import type { FrontierTopicId } from '../../modules/frontier/frontierTypes';

type FrontierTopicSelectorProps = {
  activeTopicId: FrontierTopicId;
  onSelectTopic: (topicId: FrontierTopicId) => void;
};

export function FrontierTopicSelector({ activeTopicId, onSelectTopic }: FrontierTopicSelectorProps) {
  const openProblems = frontierTopics.filter((topic) => topic.category === 'open-problem');
  const barriers = frontierTopics.filter((topic) => topic.category === 'barrier');

  return (
    <div className="frontier-selector-grid">
      <section className="frontier-selector-group">
        <p className="eyebrow">Problemas abiertos</p>
        <div className="frontier-topic-list">
          {openProblems.map((topic) => (
            <button className={topic.id === activeTopicId ? 'frontier-topic-card active' : 'frontier-topic-card'} key={topic.id} type="button" onClick={() => onSelectTopic(topic.id)}>
              <strong>{topic.title}</strong>
              <span>{topic.status}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="frontier-selector-group barrier">
        <p className="eyebrow">Barreras</p>
        <div className="frontier-topic-list">
          {barriers.map((topic) => (
            <button className={topic.id === activeTopicId ? 'frontier-topic-card active barrier' : 'frontier-topic-card barrier'} key={topic.id} type="button" onClick={() => onSelectTopic(topic.id)}>
              <strong>{topic.title}</strong>
              <span>{topic.status}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
