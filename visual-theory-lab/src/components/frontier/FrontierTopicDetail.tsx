import type { FrontierTopic } from '../../modules/frontier/frontierTypes';

type FrontierTopicDetailProps = {
  topic: FrontierTopic;
};

function FactList({ title, items, tone }: { title: string; items: string[]; tone: 'known' | 'unknown' | 'mistake' }) {
  return (
    <article className={`frontier-fact-card ${tone}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

export function FrontierTopicDetail({ topic }: FrontierTopicDetailProps) {
  return (
    <section className="verification-card frontier-detail-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Tema activo</p>
          <h2>{topic.title}</h2>
        </div>
        <span className={topic.status === 'OPEN' ? 'frontier-status open' : 'frontier-status barrier'}>{topic.status === 'OPEN' ? 'ABIERTO' : topic.status}</span>
      </div>

      <div className="frontier-fact-grid">
        <FactList title="Lo que sí sabemos" items={topic.known} tone="known" />
        <FactList title="Lo que no sabemos" items={topic.unknown} tone="unknown" />
        <FactList title="Errores comunes" items={topic.commonMistakes} tone="mistake" />
      </div>

      <div className="frontier-explanation-grid">
        <article>
          <span>Por qué importa</span>
          <p>{topic.whyItMatters}</p>
        </article>
        <article className="pnp-relation">
          <span>Relación con P vs NP</span>
          <p>{topic.relationToPvsNP}</p>
        </article>
      </div>
    </section>
  );
}
