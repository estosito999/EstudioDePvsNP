import type { CodeReference } from '../complexity/complexityTypes';
import { satLabMeta } from './satData';
import { SeverityBadge } from '../../components/ui/SeverityBadge';
import { StatusBadge } from '../../components/ui/StatusBadge';

const sharedReferences: CodeReference[] = [
  { label: 'Workbench SAT', path: 'src/components/sat/SatWorkbench.tsx', module: 'SAT / Z3 Lab', symbol: 'SatWorkbench', description: 'Controla estado de CNF, DPLL, editor textual, llamada a Z3 y comparacion de metodos.' },
  { label: 'Utilidades SAT', path: 'src/modules/sat/satUtils.ts', module: 'SAT / Z3 Lab', symbol: 'buildDpllTrace / parseCnfText', description: 'Implementa parser CNF simple, evaluacion de clausulas y traza DPLL educativa.' },
  { label: 'Dependencias backend', path: 'backend/requirements.txt', module: 'SAT / Z3 Lab API', symbol: 'z3-solver', description: 'Declara FastAPI, Uvicorn y z3-solver para el backend local.' },
];

function copyPath(path: string) {
  if (!navigator.clipboard) return;
  void navigator.clipboard.writeText(path);
}

function CodeReferenceCard({ reference }: { reference: CodeReference }) {
  const fileName = reference.path.split('/').at(-1) ?? reference.path;
  return (
    <article className="code-reference-card">
      <div className="code-reference-topline">
        <strong>{reference.label}</strong>
        <button type="button" onClick={() => copyPath(reference.path)}>Copiar ruta</button>
      </div>
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

export function SatInspector() {
  const references = [...satLabMeta.codeReferences, ...sharedReferences];
  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div>
          <p className="eyebrow">Inspector</p>
          <h2>SAT / Z3 Lab</h2>
        </div>
        <StatusBadge label="solver lab" tone="purple" />
      </div>
      <div className="inspector-meta-grid">
        <StatusBadge label="Truth: EXPERIMENTO" tone="yellow" />
        <StatusBadge label="DPLL educational" tone="cyan" />
        <StatusBadge label="Z3 backend" tone="purple" />
      </div>
      <section className="inspector-section compact">
        <h3>Mensaje conceptual</h3>
        <p>{satLabMeta.conceptualMessage}</p>
      </section>
      <section className="inspector-section compact misconception-section">
        <div className="misconception-card-title">
          <strong>Error comun</strong>
          <SeverityBadge severity="critical" />
        </div>
        <div className="misconception-field"><span>Idea equivocada</span><p>Si Z3 resuelve rapido mis ejemplos, entonces P = NP.</p></div>
        <div className="misconception-field"><span>Correccion</span><p>Un solver puede ser muy rapido en muchas instancias, pero eso no demuestra un algoritmo polinomial para SAT general.</p></div>
      </section>
      <section className="related-code-section">
        <div className="code-header"><h3>Codigo relacionado</h3><span>local paths</span></div>
        <div className="code-reference-list">
          {references.map((reference) => <CodeReferenceCard key={`${reference.path}-${reference.symbol ?? reference.label}`} reference={reference} />)}
        </div>
      </section>
    </aside>
  );
}
