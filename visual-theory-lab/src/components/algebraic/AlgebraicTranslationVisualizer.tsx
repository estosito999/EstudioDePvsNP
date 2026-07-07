import { algebraicLabMeta } from '../../modules/algebraic/algebraicData';

export function AlgebraicTranslationVisualizer() {
  return (
    <section className="verification-card algebraic-translation-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">SAT to polynomial system</p>
          <h2>Traduccion visual</h2>
        </div>
        <span className="status-badge purple">SAT → ALGEBRA</span>
      </div>

      <div className="algebraic-flow">
        <article>
          <span>Formula booleana</span>
          <strong>{algebraicLabMeta.booleanFormula}</strong>
        </article>
        <div className="reduction-arrow">→</div>
        <article className="transform">
          <span>Restriccion algebraica</span>
          <strong>{algebraicLabMeta.algebraicTranslation}</strong>
        </article>
      </div>

      <div className="algebraic-variable-list">
        {algebraicLabMeta.variables.map((variable) => (
          <code key={variable}>{variable} → {variable}² - {variable} = 0</code>
        ))}
      </div>
    </section>
  );
}
