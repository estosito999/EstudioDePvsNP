import type { CodeReference } from '../complexity/complexityTypes';
import { getAlgorithm } from './algorithmsData';
import type { AlgorithmId } from './algorithmTypes';
import { SeverityBadge } from '../../components/ui/SeverityBadge';
import { StatusBadge } from '../../components/ui/StatusBadge';

type AlgorithmInspectorProps = {
  activeAlgorithmId: AlgorithmId;
};

const sharedReferences: CodeReference[] = [
  {
    label: 'Modulo principal',
    path: 'src/modules/algorithms/ClassicAlgorithmsLab.tsx',
    module: 'Classic Algorithms Lab',
    symbol: 'ClassicAlgorithmsLab',
    description: 'Orquesta seleccion de algoritmo, pasos Step/Run/Reset y eventos de consola.',
  },
  {
    label: 'Selector de algoritmos',
    path: 'src/components/algorithms/AlgorithmSelector.tsx',
    module: 'Classic Algorithms Lab',
    symbol: 'AlgorithmSelector',
    description: 'Renderiza el listado de algoritmos clasicos disponibles.',
  },
  {
    label: 'Estructura interna',
    path: 'src/components/algorithms/InternalStructurePanel.tsx',
    module: 'Classic Algorithms Lab',
    symbol: 'InternalStructurePanel',
    description: 'Muestra stack, queue, priority queue, tabla de distancias, matriz o flujo segun el algoritmo.',
  },
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
        <dt>Archivo</dt>
        <dd><code>{reference.path}</code></dd>
        <dt>Nombre</dt>
        <dd>{fileName}</dd>
        {reference.module ? <><dt>Modulo</dt><dd>{reference.module}</dd></> : null}
        {reference.symbol ? <><dt>Simbolo</dt><dd><code>{reference.symbol}</code></dd></> : null}
        <dt>Uso</dt>
        <dd>{reference.description}</dd>
      </dl>
    </article>
  );
}

export function AlgorithmInspector({ activeAlgorithmId }: AlgorithmInspectorProps) {
  const algorithm = getAlgorithm(activeAlgorithmId);
  const references = [...algorithm.codeReferences, ...sharedReferences];

  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div>
          <p className="eyebrow">Inspector</p>
          <h2>{algorithm.name}</h2>
        </div>
        <StatusBadge label="algorithm" tone="cyan" />
      </div>

      <div className="inspector-meta-grid">
        <StatusBadge label="Truth: TEOREMA" tone="green" />
        <StatusBadge label={algorithm.category} tone="purple" />
        <StatusBadge label={algorithm.timeComplexity} tone="green" />
      </div>

      <section className="inspector-section compact">
        <h3>Estructura interna</h3>
        <p>{algorithm.internalStructure}</p>
      </section>

      <section className="inspector-section compact misconception-section">
        <div className="misconception-card-title">
          <strong>Error comun</strong>
          <SeverityBadge severity={algorithm.misconception.severity} />
        </div>
        <div className="misconception-field">
          <span>Idea equivocada</span>
          <p>{algorithm.misconception.error}</p>
        </div>
        <div className="misconception-field">
          <span>Correccion</span>
          <p>{algorithm.misconception.correction}</p>
        </div>
      </section>

      <section className="inspector-section compact">
        <h3>Cuando funciona / falla</h3>
        <p>{algorithm.worksWhen}</p>
        <p className="muted-copy">Cuidado: {algorithm.failsWhen}</p>
      </section>

      <section className="related-code-section">
        <div className="code-header">
          <h3>Codigo relacionado</h3>
          <span>local paths</span>
        </div>
        <div className="code-reference-list">
          {references.map((reference) => (
            <CodeReferenceCard key={`${reference.path}-${reference.symbol ?? reference.label}`} reference={reference} />
          ))}
        </div>
      </section>
    </aside>
  );
}
