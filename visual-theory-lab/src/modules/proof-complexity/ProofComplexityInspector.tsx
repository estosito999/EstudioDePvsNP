import type { CodeReference } from '../complexity/complexityTypes';
import { proofComplexityMeta, proofComplexityTopics, resolutionSteps } from './proofComplexityData';
import type { ProofSystemId } from './proofComplexityTypes';
import { SeverityBadge } from '../../components/ui/SeverityBadge';
import { StatusBadge } from '../../components/ui/StatusBadge';

type ProofComplexityInspectorProps = {
  activeTopicId: ProofSystemId;
};

const sharedReferences: CodeReference[] = [
  { label: 'Selector de sistemas', path: 'src/components/proof-complexity/ProofSystemSelector.tsx', module: 'Proof Complexity Lab', symbol: 'ProofSystemSelector', description: 'Permite seleccionar Resolution, Cutting Planes, Frege, pruebas UNSAT y tamaño de prueba.' },
  { label: 'Tipos de proof complexity', path: 'src/modules/proof-complexity/proofComplexityTypes.ts', module: 'Proof Complexity Lab', symbol: 'ResolutionStep / ResolutionClause', description: 'Define estructura de clausulas, inferencias, temas y metadatos.' },
];

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

export function ProofComplexityInspector({ activeTopicId }: ProofComplexityInspectorProps) {
  const topic = proofComplexityTopics.find((item) => item.id === activeTopicId) ?? proofComplexityTopics[0];
  const references = [...proofComplexityMeta.codeReferences, ...sharedReferences];
  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div><p className="eyebrow">Inspector</p><h2>{topic.label}</h2></div>
        <StatusBadge label="proof system" tone="purple" />
      </div>
      <div className="inspector-meta-grid">
        <StatusBadge label="Truth: TEOREMA / MODELO" tone="green" />
        <StatusBadge label={`steps ${resolutionSteps.length}`} tone="cyan" />
        <StatusBadge label="UNSAT proof" tone="yellow" />
      </div>
      <section className="inspector-section compact"><h3>Descripcion</h3><p>{topic.description}</p></section>
      <section className="inspector-section compact misconception-section">
        <div className="misconception-card-title"><strong>Error comun</strong><SeverityBadge severity="critical" /></div>
        <div className="misconception-field"><span>Idea equivocada</span><p>{proofComplexityMeta.misconception.error}</p></div>
        <div className="misconception-field"><span>Correccion</span><p>{proofComplexityMeta.misconception.correction}</p></div>
      </section>
      <section className="related-code-section">
        <div className="code-header"><h3>Codigo relacionado</h3><span>local paths</span></div>
        <div className="code-reference-list">{references.map((reference) => <CodeReferenceCard key={`${reference.path}-${reference.symbol ?? reference.label}`} reference={reference} />)}</div>
      </section>
    </aside>
  );
}
