import { automataConcepts, automataLabMeta } from '../../modules/automata/automataConceptsData';

export function AutomataConceptMap() {
  return (
    <section className="verification-card automata-concept-map">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">P vs NP connection</p>
          <h2>Modelos de computacion</h2>
        </div>
      </div>
      <div className="complexity-model-flow">
        <article><strong>Maquina determinista polinomial</strong><span>→ P</span></article>
        <article><strong>Maquina no determinista polinomial</strong><span>→ NP</span></article>
      </div>
      <p>{automataLabMeta.conceptualMessage}</p>
      <div className="automata-stub-grid">
        {automataConcepts.filter((concept) => concept.status === 'stub').map((concept) => (
          <article key={concept.id}>
            <strong>{concept.label}</strong>
            <span>{concept.kind}</span>
            <p>{concept.relationToComplexity}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
