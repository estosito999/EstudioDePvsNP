import { SeverityBadge } from '../../components/ui/SeverityBadge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import type { CodeReference } from '../complexity/complexityTypes';
import { findUniverseRoute, getUniverseCluster, getUniverseNode, universeLinks } from './universeData';
import type { UniverseNodeId } from './universeTypes';

type KnowledgeUniverseInspectorProps = {
  selectedNodeId: UniverseNodeId;
  routeTargetNodeId: UniverseNodeId;
};

function copyPath(path: string) {
  if (!navigator.clipboard) return;
  void navigator.clipboard.writeText(path);
}

function CodeReferenceCard({ reference }: { reference: CodeReference }) {
  const fileName = reference.path.split('/').at(-1) ?? reference.path;
  return (
    <article className="code-reference-card">
      <div className="code-reference-topline"><strong>{reference.label}</strong><button type="button" onClick={() => copyPath(reference.path)}>Copiar ruta</button></div>
      <dl className="code-reference-grid">
        <dt>Archivo</dt><dd><code>{reference.path}</code></dd>
        <dt>Nombre</dt><dd>{fileName}</dd>
        {reference.module ? <><dt>Modulo</dt><dd>{reference.module}</dd></> : null}
        {reference.symbol ? <><dt>Simbolo</dt><dd><code>{reference.symbol}</code></dd></> : null}
        <dt>Uso</dt><dd>{reference.description}</dd>
      </dl>
    </article>
  );
}

export function KnowledgeUniverseInspector({ selectedNodeId, routeTargetNodeId }: KnowledgeUniverseInspectorProps) {
  const selectedNode = getUniverseNode(selectedNodeId);
  const cluster = getUniverseCluster(selectedNode.cluster);
  const route = findUniverseRoute(selectedNodeId, routeTargetNodeId);
  const activeLinks = universeLinks.filter((link) => link.source === selectedNodeId || link.target === selectedNodeId);
  const references = selectedNode.codeReferences.filter((reference, index, all) => all.findIndex((item) => item.path === reference.path && item.symbol === reference.symbol) === index);

  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div><p className="eyebrow">Inspector 3D</p><h2>{selectedNode.label}</h2></div>
        <StatusBadge label={cluster.label} tone={selectedNode.cluster === 'sat' ? 'cyan' : selectedNode.cluster === 'complexity' ? 'purple' : 'yellow'} />
      </div>
      <div className="inspector-meta-grid">
        <StatusBadge label="spatial graph" tone="cyan" />
        <StatusBadge label={`${activeLinks.length} enlaces`} tone="purple" />
        <StatusBadge label={`${route.length} nodos en ruta`} tone="yellow" />
      </div>
      <section className="inspector-section compact"><h3>Truth Layer</h3><p>{selectedNode.truth}</p></section>
      <section className="inspector-section compact misconception-section">
        <div className="misconception-card-title"><strong>Misconception Layer</strong><SeverityBadge severity={selectedNode.severity} /></div>
        <div className="misconception-field"><span>Error comun</span><p>{selectedNode.misconception}</p></div>
        <div className="misconception-field"><span>Correccion</span><p>{selectedNode.correction}</p></div>
      </section>
      <section className="inspector-section compact"><h3>Ruta activa</h3><p>{route.map((nodeId) => getUniverseNode(nodeId).label).join(' → ')}</p></section>
      <section className="inspector-section compact"><h3>Relaciones activas</h3><p>{activeLinks.map((link) => `${getUniverseNode(link.source).label} ↔ ${getUniverseNode(link.target).label}: ${link.label}`).join(' ')}</p></section>
      <section className="related-code-section">
        <div className="code-header"><h3>Codigo relacionado</h3><span>local paths</span></div>
        <div className="code-reference-list">{references.map((reference) => <CodeReferenceCard key={`${reference.path}-${reference.symbol ?? reference.label}`} reference={reference} />)}</div>
      </section>
    </aside>
  );
}
