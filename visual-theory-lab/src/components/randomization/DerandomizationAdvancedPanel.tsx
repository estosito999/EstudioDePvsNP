import { randomizationLabMeta } from '../../modules/randomization/randomizationData';
import { SeverityBadge } from '../ui/SeverityBadge';

export function DerandomizationAdvancedPanel() {
  return (
    <section className="verification-card derandomization-advanced-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Advanced</p>
          <h2>Hardness vs Randomness</h2>
        </div>
        <SeverityBadge severity="high" />
      </div>
      <div className="advanced-topic-list">
        {randomizationLabMeta.advancedTopics.map((topic) => (
          <article key={topic.title}><strong>{topic.title}</strong><p>{topic.description}</p></article>
        ))}
      </div>
      <div className="misconception-field"><span>Error común</span><p>{randomizationLabMeta.misconception.error}</p></div>
      <div className="misconception-field"><span>Corrección</span><p>{randomizationLabMeta.misconception.correction}</p></div>
    </section>
  );
}
