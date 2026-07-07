import type { CodeReference } from '../complexity/complexityTypes';
import { circuitExamples, circuitLabMeta } from './circuitData';
import type { BooleanFunctionId } from './circuitTypes';
import { computeCircuitMetrics } from './circuitUtils';
import { SeverityBadge } from '../../components/ui/SeverityBadge';
import { StatusBadge } from '../../components/ui/StatusBadge';

type CircuitInspectorProps = {
  activeCircuitId: BooleanFunctionId;
};

const sharedReferences: CodeReference[] = [
  { label: 'Selector de funciones', path: 'src/components/circuits/CircuitFunctionSelector.tsx', module: 'Circuit Complexity Lab', symbol: 'CircuitFunctionSelector', description: 'Permite seleccionar AND, OR, MAJORITY y PARITY.' },
  { label: 'Métricas', path: 'src/components/circuits/CircuitMetricsCard.tsx', module: 'Circuit Complexity Lab', symbol: 'CircuitMetricsCard', description: 'Calcula y muestra tamaño, profundidad, fan-in y fan-out.' },
  { label: 'Tabla de verdad', path: 'src/components/circuits/TruthTablePanel.tsx', module: 'Circuit Complexity Lab', symbol: 'TruthTablePanel', description: 'Evalua el circuito sobre todas las asignaciones pequeñas y marca correccion.' },
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

export function CircuitInspector({ activeCircuitId }: CircuitInspectorProps) {
  const activeCircuit = circuitExamples.find((circuit) => circuit.id === activeCircuitId) ?? circuitExamples[0];
  const metrics = computeCircuitMetrics(activeCircuit);
  const references = [...circuitLabMeta.codeReferences, ...sharedReferences];
  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div><p className="eyebrow">Inspector</p><h2>{activeCircuit.name}</h2></div>
        <StatusBadge label="circuit" tone="purple" />
      </div>
      <div className="inspector-meta-grid">
        <StatusBadge label="Truth: TEOREMA/DEFINICION" tone="green" />
        <StatusBadge label={`depth ${metrics.depth}`} tone="cyan" />
        <StatusBadge label={`size ${metrics.size}`} tone="yellow" />
      </div>
      <section className="inspector-section compact"><h3>Descripcion</h3><p>{activeCircuit.description}</p></section>
      {activeCircuit.limitationNote ? <section className="inspector-section compact misconception-section"><h3>Advertencia</h3><p>{activeCircuit.limitationNote}</p></section> : null}
      <section className="inspector-section compact misconception-section">
        <div className="misconception-card-title"><strong>Error comun</strong><SeverityBadge severity="critical" /></div>
        <div className="misconception-field"><span>Idea equivocada</span><p>{circuitLabMeta.misconception.error}</p></div>
        <div className="misconception-field"><span>Correccion</span><p>{circuitLabMeta.misconception.correction}</p></div>
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
