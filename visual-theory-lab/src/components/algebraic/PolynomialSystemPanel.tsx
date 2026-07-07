import { algebraicLabMeta } from '../../modules/algebraic/algebraicData';

export function PolynomialSystemPanel() {
  return (
    <section className="verification-card polynomial-system-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Polynomial system</p>
          <h2>Sistema de ecuaciones</h2>
        </div>
      </div>
      <div className="polynomial-equation-list">
        {algebraicLabMeta.equations.map((equation) => (
          <article key={equation.id}>
            <span>{equation.label}</span>
            <strong>{equation.expression}</strong>
            <p>{equation.explanation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
