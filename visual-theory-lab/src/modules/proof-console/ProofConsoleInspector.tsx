import { StatusBadge } from '../../components/ui/StatusBadge';
import type { CodeReference } from '../complexity/complexityTypes';
import { proofConsoleCommands } from './proofConsoleData';

const references: CodeReference[] = [
  { label: 'Modulo Proof Console', path: 'src/modules/proof-console/ProofConsole.tsx', module: 'Proof Console', symbol: 'ProofConsole', description: 'Renderiza terminal, historial, input y botones de comandos.' },
  { label: 'Motor de comandos', path: 'src/modules/proof-console/proofConsoleData.ts', module: 'Proof Console', symbol: 'evaluateProofConsoleCommand', description: 'Clasifica help, list, query y claim con Truth Layer.' },
  { label: 'Tipos de consola', path: 'src/modules/proof-console/proofConsoleTypes.ts', module: 'Proof Console', symbol: 'ProofConsoleStatus', description: 'Define estados THEOREM, DEFINITION, COMMON ERROR, OPEN e INTUITION.' },
  { label: 'Complexity Explorer data', path: 'src/modules/complexity/complexityData.ts', module: 'Complexity Explorer', symbol: 'complexityConcepts', description: 'Fuente reutilizada para definiciones como NP y SAT.' },
  { label: 'Misconception Layer data', path: 'src/modules/complexity/misconceptionsData.ts', module: 'Misconception Layer', symbol: 'misconceptions', description: 'Fuente reutilizada para detectar errores comunes.' },
  { label: 'Open Frontier data', path: 'src/modules/frontier/frontierData.ts', module: 'Open Frontier Lab', symbol: 'frontierTopics', description: 'Fuente reutilizada para problemas abiertos como P vs NP.' },
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

export function ProofConsoleInspector() {
  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div><p className="eyebrow">Inspector</p><h2>Proof Console</h2></div>
        <StatusBadge label="terminal" tone="green" />
      </div>
      <div className="inspector-meta-grid">
        <StatusBadge label="THEOREM" tone="green" />
        <StatusBadge label="DEFINITION" tone="cyan" />
        <StatusBadge label="COMMON ERROR" tone="red" />
        <StatusBadge label="OPEN" tone="yellow" />
        <StatusBadge label="INTUITION" tone="purple" />
      </div>
      <section className="inspector-section compact"><h3>Rol</h3><p>Consulta afirmaciones del laboratorio sin crear demostraciones nuevas. Cada respuesta indica su estado de Truth Layer.</p></section>
      <section className="inspector-section compact"><h3>Comandos soportados</h3><p>{proofConsoleCommands.map((item) => item.command).join(', ')}</p></section>
      <section className="inspector-section compact"><h3>Ejemplos obligatorios</h3><p>query P vs NP, claim "P ⊆ NP", claim "NP significa no polinomial", query 2-SAT, query SAT.</p></section>
      <section className="related-code-section">
        <div className="code-header"><h3>Codigo relacionado</h3><span>local paths</span></div>
        <div className="code-reference-list">{references.map((reference) => <CodeReferenceCard key={`${reference.path}-${reference.symbol ?? reference.label}`} reference={reference} />)}</div>
      </section>
    </aside>
  );
}
