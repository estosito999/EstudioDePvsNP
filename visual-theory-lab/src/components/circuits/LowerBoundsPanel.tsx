import { circuitLabMeta } from '../../modules/circuits/circuitData';
import { SeverityBadge } from '../ui/SeverityBadge';

export function LowerBoundsPanel() {
  return (
    <section className="verification-card lower-bounds-card">
      <div className="verification-card-header">
        <div><p className="eyebrow">Lower bounds</p><h2>{circuitLabMeta.lowerBoundTitle}</h2></div>
        <SeverityBadge severity="critical" />
      </div>
      <p>{circuitLabMeta.lowerBoundText}</p>
      <div className="concept-message warning">
        <strong>{circuitLabMeta.pVsNpTitle}</strong>
        <p>{circuitLabMeta.pVsNpText}</p>
      </div>
      <div className="misconception-field">
        <span>Error comun</span>
        <p>{circuitLabMeta.misconception.error}</p>
      </div>
      <div className="misconception-field">
        <span>Correccion</span>
        <p>{circuitLabMeta.misconception.correction}</p>
      </div>
    </section>
  );
}
