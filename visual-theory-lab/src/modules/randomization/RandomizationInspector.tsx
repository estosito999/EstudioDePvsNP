import { SeverityBadge } from '../../components/ui/SeverityBadge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import type { CodeReference } from '../complexity/complexityTypes';
import { getRandomClass, randomizationLabMeta } from './randomizationData';
import type { RandomClassId } from './randomizationTypes';

type RandomizationInspectorProps = {
  activeClassId: RandomClassId;
};

const sharedReferences: CodeReference[] = [
  { label: 'Selector de clases', path: 'src/components/randomization/RandomClassSelector.tsx', module: 'Randomization & Derandomization Lab', symbol: 'RandomClassSelector', description: 'Permite alternar entre BPP, RP, co-RP y ZPP.' },
  { label: 'Reduccion de error', path: 'src/components/randomization/ErrorReductionPanel.tsx', module: 'Randomization & Derandomization Lab', symbol: 'ErrorReductionPanel', description: 'Muestra repeticion/amplificacion y caida de error.' },
  { label: 'Generador pseudoaleatorio', path: 'src/components/randomization/PseudorandomGeneratorPanel.tsx', module: 'Randomization & Derandomization Lab', symbol: 'PseudorandomGeneratorPanel', description: 'Visualiza semilla corta, PRG y simulacion de bits aleatorios.' },
  { label: 'Seccion avanzada', path: 'src/components/randomization/DerandomizationAdvancedPanel.tsx', module: 'Randomization & Derandomization Lab', symbol: 'DerandomizationAdvancedPanel', description: 'Contiene Hardness vs Randomness, Impagliazzo-Wigderson y misconception obligatoria.' },
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

export function RandomizationInspector({ activeClassId }: RandomizationInspectorProps) {
  const randomClass = getRandomClass(activeClassId);
  const references = [...randomizationLabMeta.codeReferences, ...sharedReferences];
  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div><p className="eyebrow">Inspector</p><h2>{randomClass.label}</h2></div>
        <StatusBadge label="randomized" tone="cyan" />
      </div>
      <div className="inspector-meta-grid">
        <StatusBadge label={randomClass.fullName} tone="purple" />
        <StatusBadge label={`error ${randomClass.baseError}`} tone="yellow" />
      </div>
      <section className="inspector-section compact"><h3>Garantia</h3><p>{randomClass.guarantee}</p></section>
      <section className="inspector-section compact"><h3>Intuicion</h3><p>{randomClass.intuition}</p></section>
      <section className="inspector-section compact"><h3>Mensaje conceptual</h3><p>{randomizationLabMeta.conceptualMessage}</p></section>
      <section className="inspector-section compact misconception-section">
        <div className="misconception-card-title"><strong>Error comun</strong><SeverityBadge severity="high" /></div>
        <div className="misconception-field"><span>Idea equivocada</span><p>{randomizationLabMeta.misconception.error}</p></div>
        <div className="misconception-field"><span>Correccion</span><p>{randomizationLabMeta.misconception.correction}</p></div>
      </section>
      <section className="related-code-section">
        <div className="code-header"><h3>Codigo relacionado</h3><span>local paths</span></div>
        <div className="code-reference-list">{references.map((reference) => <CodeReferenceCard key={`${reference.path}-${reference.symbol ?? reference.label}`} reference={reference} />)}</div>
      </section>
    </aside>
  );
}
