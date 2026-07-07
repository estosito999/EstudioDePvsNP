import type { CodeReference } from '../complexity/complexityTypes';
import { algebraicConcepts, algebraicLabMeta } from './algebraicData';
import type { AlgebraicConceptId } from './algebraicTypes';
import { SeverityBadge } from '../../components/ui/SeverityBadge';
import { StatusBadge } from '../../components/ui/StatusBadge';

type AlgebraicInspectorProps = {
  activeConceptId: AlgebraicConceptId;
};

const sharedReferences: CodeReference[] = [
  { label: 'Selector algebraico', path: 'src/components/algebraic/AlgebraicConceptSelector.tsx', module: 'Algebraic / Gröbner Lab', symbol: 'AlgebraicConceptSelector', description: 'Permite alternar entre variables booleanas, clausulas, ideales, variedades, Groebner y Nullstellensatz.' },
  { label: 'Sistema polinomial', path: 'src/components/algebraic/PolynomialSystemPanel.tsx', module: 'Algebraic / Gröbner Lab', symbol: 'PolynomialSystemPanel', description: 'Muestra ecuaciones generadas y explicacion de cada restriccion.' },
  { label: 'Advertencia algebraica', path: 'src/components/algebraic/AlgebraicWarningPanel.tsx', module: 'Algebraic / Gröbner Lab', symbol: 'AlgebraicWarningPanel', description: 'Renderiza misconception y advertencia de crecimiento de dificultad.' },
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

export function AlgebraicInspector({ activeConceptId }: AlgebraicInspectorProps) {
  const concept = algebraicConcepts.find((item) => item.id === activeConceptId) ?? algebraicConcepts[0];
  const references = [...algebraicLabMeta.codeReferences, ...sharedReferences];
  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div><p className="eyebrow">Inspector</p><h2>{concept.title}</h2></div>
        <StatusBadge label="algebraic" tone="purple" />
      </div>
      <div className="inspector-meta-grid">
        <StatusBadge label="Truth: MODELO / TRADUCCION" tone="cyan" />
        <StatusBadge label="SAT polynomial" tone="purple" />
        <StatusBadge label="Groebner aware" tone="yellow" />
      </div>
      <section className="inspector-section compact"><h3>Concepto</h3><p>{concept.description}</p></section>
      <section className="inspector-section compact"><h3>Intuicion</h3><p>{concept.intuition}</p></section>
      <section className="inspector-section compact misconception-section">
        <div className="misconception-card-title"><strong>Error comun</strong><SeverityBadge severity="critical" /></div>
        <div className="misconception-field"><span>Idea equivocada</span><p>{algebraicLabMeta.misconception.error}</p></div>
        <div className="misconception-field"><span>Correccion</span><p>{algebraicLabMeta.misconception.correction}</p></div>
      </section>
      <section className="related-code-section">
        <div className="code-header"><h3>Codigo relacionado</h3><span>local paths</span></div>
        <div className="code-reference-list">{references.map((reference) => <CodeReferenceCard key={`${reference.path}-${reference.symbol ?? reference.label}`} reference={reference} />)}</div>
      </section>
    </aside>
  );
}
