import type { CodeReference } from '../complexity/complexityTypes';
import { getReduction } from './reductionsData';
import type { ReductionId } from './reductionTypes';
import { StatusBadge } from '../../components/ui/StatusBadge';

type ReductionInspectorProps = {
  activeReductionId: ReductionId;
};

const sharedReferences: CodeReference[] = [
  {
    label: 'Modulo principal',
    path: 'src/modules/reduction/ReductionLab.tsx',
    module: 'Reduction Lab',
    symbol: 'ReductionLab',
    description: 'Orquesta selector, visualizador, pasos activos y eventos de consola de la reduccion seleccionada.',
  },
  {
    label: 'Selector de reducciones',
    path: 'src/components/reduction/ReductionSelector.tsx',
    module: 'Reduction Lab',
    symbol: 'ReductionSelector',
    description: 'Permite elegir reducciones introductorias, estandar y avanzadas.',
  },
  {
    label: 'Panel de pasos',
    path: 'src/components/reduction/ReductionStepPanel.tsx',
    module: 'Reduction Lab',
    symbol: 'ReductionStepPanel',
    description: 'Muestra la construccion paso a paso y permite cargar pasos especificos.',
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
        {reference.module ? (
          <>
            <dt>Modulo</dt>
            <dd>{reference.module}</dd>
          </>
        ) : null}
        {reference.symbol ? (
          <>
            <dt>Simbolo</dt>
            <dd><code>{reference.symbol}</code></dd>
          </>
        ) : null}
        <dt>Uso</dt>
        <dd>{reference.description}</dd>
      </dl>
    </article>
  );
}

export function ReductionInspector({ activeReductionId }: ReductionInspectorProps) {
  const activeReduction = getReduction(activeReductionId);
  const references = [...activeReduction.codeReferences, ...sharedReferences];

  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div>
          <p className="eyebrow">Inspector</p>
          <h2>{activeReduction.label}</h2>
        </div>
        <StatusBadge label="reduction" tone="cyan" />
      </div>

      <div className="inspector-meta-grid">
        <StatusBadge label={activeReduction.theoremStatus} tone="green" />
        <StatusBadge label="Truth: TEOREMA" tone="green" />
        <StatusBadge label={activeReduction.difficulty} tone={activeReduction.difficulty === 'advanced' ? 'yellow' : 'cyan'} />
      </div>

      <section className="inspector-section compact">
        <h3>Idea central</h3>
        <p>Si puedo transformar {activeReduction.sourceProblem} en {activeReduction.targetProblem} en tiempo polinomial, entonces {activeReduction.targetProblem} es al menos tan dificil como {activeReduction.sourceProblem}.</p>
      </section>

      <section className="inspector-section compact">
        <h3>Preservacion</h3>
        <p>{activeReduction.equivalence}</p>
      </section>

      {activeReduction.warning ? (
        <section className="inspector-section compact misconception-section">
          <h3>Advertencia tecnica</h3>
          <p>{activeReduction.warning}</p>
        </section>
      ) : null}

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
