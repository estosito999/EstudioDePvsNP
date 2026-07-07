import { getUniverseCluster } from '../../modules/universe/universeData';
import type { UniverseNode } from '../../modules/universe/universeTypes';
import { SeverityBadge } from '../ui/SeverityBadge';

type UniverseNodePanelProps = {
  node: UniverseNode;
};

export function UniverseNodePanel({ node }: UniverseNodePanelProps) {
  const cluster = getUniverseCluster(node.cluster);
  return (
    <section className="verification-card universe-node-panel">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Nodo seleccionado</p>
          <h2>{node.label}</h2>
        </div>
        <span className="universe-cluster-pill" style={{ borderColor: cluster.color, color: cluster.color }}>{cluster.label}</span>
      </div>
      <div className="universe-layer-grid">
        <article className="truth-layer"><span>Truth Layer</span><p>{node.truth}</p></article>
        <article className="misconception-layer"><div><span>Misconception Layer</span><SeverityBadge severity={node.severity} /></div><p>{node.misconception}</p><strong>{node.correction}</strong></article>
      </div>
      <div className="universe-module-tags">
        {node.relatedModules.map((module) => <code key={module}>{module}</code>)}
      </div>
    </section>
  );
}
