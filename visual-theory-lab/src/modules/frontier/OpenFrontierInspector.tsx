import { SeverityBadge } from '../../components/ui/SeverityBadge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import type { CodeReference } from '../complexity/complexityTypes';
import { frontierLabMeta, getFrontierTopic } from './frontierData';
import type { FrontierTopicId } from './frontierTypes';

type OpenFrontierInspectorProps = {
  activeTopicId: FrontierTopicId;
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

export function OpenFrontierInspector({ activeTopicId }: OpenFrontierInspectorProps) {
  const topic = getFrontierTopic(activeTopicId);
  const references = [...topic.codeReferences, ...frontierLabMeta.codeReferences];
  const uniqueReferences = references.filter((reference, index, all) => all.findIndex((item) => item.path === reference.path && item.symbol === reference.symbol) === index);

  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div><p className="eyebrow">Inspector</p><h2>{topic.title}</h2></div>
        <StatusBadge label={topic.status === 'OPEN' ? 'ABIERTO' : 'BARRIER'} tone={topic.status === 'OPEN' ? 'yellow' : 'red'} />
      </div>
      <div className="inspector-meta-grid">
        <StatusBadge label={topic.category === 'open-problem' ? 'problema abierto' : 'limitacion tecnica'} tone="purple" />
        <StatusBadge label="sin prueba reclamada" tone="cyan" />
      </div>
      <section className="inspector-section compact"><h3>Lo que si sabemos</h3><p>{topic.known.join(' ')}</p></section>
      <section className="inspector-section compact"><h3>Lo que no sabemos</h3><p>{topic.unknown.join(' ')}</p></section>
      <section className="inspector-section compact"><h3>Relacion con P vs NP</h3><p>{topic.relationToPvsNP}</p></section>
      <section className="inspector-section compact misconception-section">
        <div className="misconception-card-title"><strong>Errores comunes</strong><SeverityBadge severity={topic.status === 'OPEN' ? 'critical' : 'high'} /></div>
        {topic.commonMistakes.map((mistake) => <div className="misconception-field" key={mistake}><span>Evitar</span><p>{mistake}</p></div>)}
      </section>
      <section className="inspector-section compact"><h3>Guardrail conceptual</h3><p>{frontierLabMeta.conceptualMessage}</p></section>
      <section className="related-code-section">
        <div className="code-header"><h3>Codigo relacionado</h3><span>local paths</span></div>
        <div className="code-reference-list">{uniqueReferences.map((reference) => <CodeReferenceCard key={`${reference.path}-${reference.symbol ?? reference.label}`} reference={reference} />)}</div>
      </section>
    </aside>
  );
}
