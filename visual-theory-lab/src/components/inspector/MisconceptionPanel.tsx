import type { Misconception } from '../../modules/complexity/complexityTypes';
import { SeverityBadge } from '../ui/SeverityBadge';

type MisconceptionPanelProps = {
  active: boolean;
  misconceptions: Misconception[];
  conceptLabel: string;
};

export function MisconceptionPanel({ active, misconceptions, conceptLabel }: MisconceptionPanelProps) {
  if (!active) {
    return (
      <section className="inspector-section compact muted-panel misconception-standby">
        <h3>Misconception Layer</h3>
        <p>{misconceptions.length} errores comunes disponibles para {conceptLabel}.</p>
      </section>
    );
  }

  return (
    <section className="inspector-section misconception-section compact">
      <div className="misconception-heading-row">
        <h3>Errores comunes</h3>
        <span className="truth-pill red">ERROR COMUN</span>
      </div>

      {misconceptions.length === 0 ? (
        <p className="muted-copy">No hay errores comunes registrados para este concepto todavia.</p>
      ) : (
        <div className="misconception-card-list">
          {misconceptions.map((misconception) => (
            <article className={`misconception-card ${misconception.severity}`} key={misconception.id}>
              <div className="misconception-card-title">
                <strong>{misconception.title}</strong>
                <SeverityBadge severity={misconception.severity} />
              </div>
              <div className="misconception-field">
                <span>Idea equivocada</span>
                <p>{misconception.wrongIdea}</p>
              </div>
              <div className="misconception-field">
                <span>Correccion</span>
                <p>{misconception.correction}</p>
              </div>
              <div className="misconception-field">
                <span>Explicacion</span>
                <p>{misconception.explanation}</p>
              </div>
              <div className="related-concepts-row">
                <span>Conceptos relacionados</span>
                <div>
                  {misconception.relatedConceptIds.map((id) => (
                    <code key={id}>{id}</code>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
