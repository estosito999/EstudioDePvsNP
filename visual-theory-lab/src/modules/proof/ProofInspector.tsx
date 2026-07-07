import type { CodeReference } from '../complexity/complexityTypes';
import { satInNpProofMeta } from './satInNpProofData';
import { twoSatProofMeta } from './twoSatProofData';
import type { ProofId } from './proofTypes';
import { StatusBadge } from '../../components/ui/StatusBadge';

type ProofInspectorProps = {
  activeProofId: ProofId;
};

const sharedReferences: CodeReference[] = [
  {
    label: 'Modulo principal',
    path: 'src/modules/proof/ProofLab.tsx',
    module: 'Proof Lab',
    symbol: 'ProofLab',
    description: 'Orquesta la seleccion de pruebas y conecta los visualizadores con la consola inferior.',
  },
  {
    label: 'Panel de pasos',
    path: 'src/components/proof/ProofStepPanel.tsx',
    module: 'Proof Lab',
    symbol: 'ProofStepPanel',
    description: 'Renderiza el flujo visual de la demostracion y marca pasos pendientes, activos y completos.',
  },
  {
    label: 'Panel de traza de codigo',
    path: 'src/components/code/CodeTracePanel.tsx',
    module: 'Proof Lab',
    symbol: 'CodeTracePanel',
    description: 'Muestra codigo visible con linea activa resaltada para conectar prueba y criterio computacional.',
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

export function ProofInspector({ activeProofId }: ProofInspectorProps) {
  const activeProof = activeProofId === 'two-sat-in-p' ? twoSatProofMeta : satInNpProofMeta;
  const references = [...activeProof.codeReferences, ...sharedReferences];

  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div>
          <p className="eyebrow">Inspector</p>
          <h2>{activeProof.title}</h2>
        </div>
        <StatusBadge label="theorem" tone="green" />
      </div>

      <div className="inspector-meta-grid">
        <StatusBadge label={activeProof.theoremStatus} tone="green" />
        <StatusBadge label="Truth: TEOREMA" tone="green" />
        <StatusBadge label="Proof visual" tone="cyan" />
      </div>

      <section className="inspector-section compact">
        <h3>Idea formal</h3>
        <p>{activeProof.formalIdea}</p>
      </section>

      {activeProof.misconceptionNote ? (
        <section className="inspector-section compact misconception-section">
          <h3>Misconception Layer</h3>
          <p>{activeProof.misconceptionNote}</p>
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
