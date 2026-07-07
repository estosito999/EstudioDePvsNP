import { frontierLabMeta } from '../../modules/frontier/frontierData';

export function FrontierConceptBanner() {
  return (
    <section className="verification-intro frontier-concept-banner">
      <div>
        <p className="eyebrow">Conceptual guardrail</p>
        <h2>{frontierLabMeta.conceptualMessage}</h2>
      </div>
      <div className="frontier-legend">
        <span className="frontier-status open">ABIERTO</span>
        <span className="frontier-status barrier">BARRIER / LIMITATION</span>
      </div>
    </section>
  );
}
