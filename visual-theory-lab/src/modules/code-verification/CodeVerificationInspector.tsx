import type { CodeReference } from '../complexity/complexityTypes';
import { bellmanFordMeta } from './bellmanFordData';
import { threeSatBruteforceMeta } from './threeSatBruteforceData';
import type { VerificationLabId } from './verificationTypes';
import { StatusBadge } from '../../components/ui/StatusBadge';

type CodeVerificationInspectorProps = {
  activeLabId: VerificationLabId;
};

const sharedReferences: CodeReference[] = [
  {
    label: 'Modulo principal',
    path: 'src/modules/code-verification/CodeVerificationLab.tsx',
    module: 'Code Verification Lab',
    symbol: 'CodeVerificationLab',
    description: 'Orquesta la seleccion entre laboratorios y comunica eventos a la consola inferior.',
  },
  {
    label: 'Panel de traza de codigo',
    path: 'src/components/code/CodeTracePanel.tsx',
    module: 'Code Verification Lab',
    symbol: 'CodeTracePanel',
    description: 'Muestra codigo visible con linea activa resaltada sin depender de una ejecucion real del interprete.',
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

export function CodeVerificationInspector({ activeLabId }: CodeVerificationInspectorProps) {
  const activeLab = activeLabId === 'bellman-ford' ? bellmanFordMeta : threeSatBruteforceMeta;
  const references = [...activeLab.codeReferences, ...sharedReferences];

  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div>
          <p className="eyebrow">Inspector</p>
          <h2>{activeLab.title}</h2>
        </div>
        <StatusBadge label="experiment" tone="yellow" />
      </div>

      <div className="inspector-meta-grid">
        <StatusBadge label={`Complexity: ${activeLab.complexity}`} tone={activeLabId === 'bellman-ford' ? 'green' : 'red'} />
        <StatusBadge label="Truth: EXPERIMENTO" tone="yellow" />
        <StatusBadge label="No formal proof" tone="red" />
      </div>

      <section className="inspector-section compact">
        <h3>Lectura conceptual</h3>
        <p>{activeLab.conceptualMessage}</p>
      </section>

      <section className="inspector-section compact misconception-section">
        <h3>Advertencia epistemologica</h3>
        <p>Este laboratorio ejecuta una visualizacion local de un algoritmo concreto. Sirve para formar intuicion, pero no reemplaza una demostracion formal ni una separacion de clases de complejidad.</p>
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
