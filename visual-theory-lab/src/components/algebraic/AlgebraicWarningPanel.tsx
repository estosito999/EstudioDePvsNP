import { algebraicLabMeta } from '../../modules/algebraic/algebraicData';
import { SeverityBadge } from '../ui/SeverityBadge';

export function AlgebraicWarningPanel() {
  return (
    <section className="verification-card algebraic-warning-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Difficulty warning</p>
          <h2>Advertencia sobre crecimiento</h2>
        </div>
        <SeverityBadge severity="critical" />
      </div>
      <p>{algebraicLabMeta.warning}</p>
      <div className="misconception-field">
        <span>Error comun</span>
        <p>{algebraicLabMeta.misconception.error}</p>
      </div>
      <div className="misconception-field">
        <span>Correccion</span>
        <p>{algebraicLabMeta.misconception.correction}</p>
      </div>
    </section>
  );
}
