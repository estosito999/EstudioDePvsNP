import type { CodeReference } from '../complexity/complexityTypes';
import { automataConcepts, automataLabMeta } from './automataConceptsData';
import type { AutomataModelId } from './automataTypes';
import { SeverityBadge } from '../../components/ui/SeverityBadge';
import { StatusBadge } from '../../components/ui/StatusBadge';

type AutomataInspectorProps = {
  activeModelId: AutomataModelId;
};

const sharedReferences: CodeReference[] = [
  {
    label: 'Selector de modelos',
    path: 'src/components/automata/ModelSelector.tsx',
    module: 'Turing & Automata Lab',
    symbol: 'ModelSelector',
    description: 'Permite alternar entre DFA, NFA, PDA, DTM y NTM.',
  },
  {
    label: 'Cinta de Turing',
    path: 'src/components/automata/TuringTape.tsx',
    module: 'Turing & Automata Lab',
    symbol: 'TuringTape',
    description: 'Renderiza la cinta, celda activa y posicion del cabezal.',
  },
  {
    label: 'Tabla de transicion',
    path: 'src/components/automata/TransitionTable.tsx',
    module: 'Turing & Automata Lab',
    symbol: 'TransitionTable',
    description: 'Muestra y resalta la transicion usada por la maquina de Turing determinista.',
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

export function AutomataInspector({ activeModelId }: AutomataInspectorProps) {
  const activeModel = automataConcepts.find((concept) => concept.id === activeModelId) ?? automataConcepts[3];
  const references = [...automataLabMeta.codeReferences, ...sharedReferences];

  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div>
          <p className="eyebrow">Inspector</p>
          <h2>{activeModel.label}</h2>
        </div>
        <StatusBadge label={activeModel.status} tone={activeModel.status === 'functional' ? 'green' : 'purple'} />
      </div>

      <div className="inspector-meta-grid">
        <StatusBadge label="Truth: DEFINICION" tone="cyan" />
        <StatusBadge label={activeModel.kind} tone="purple" />
      </div>

      <section className="inspector-section compact">
        <h3>Definicion</h3>
        <p>{activeModel.definition}</p>
      </section>

      <section className="inspector-section compact">
        <h3>Conexion con complejidad</h3>
        <p>{activeModel.relationToComplexity}</p>
      </section>

      <section className="inspector-section compact misconception-section">
        <div className="misconception-card-title">
          <strong>Error comun</strong>
          <SeverityBadge severity={automataLabMeta.misconception.severity} />
        </div>
        <div className="misconception-field">
          <span>Idea equivocada</span>
          <p>{automataLabMeta.misconception.error}</p>
        </div>
        <div className="misconception-field">
          <span>Correccion</span>
          <p>{automataLabMeta.misconception.correction}</p>
        </div>
        <div className="misconception-field">
          <span>Explicacion</span>
          <p>{automataLabMeta.misconception.explanation}</p>
        </div>
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
