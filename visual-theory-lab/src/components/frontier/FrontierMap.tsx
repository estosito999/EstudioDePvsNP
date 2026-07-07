import type { FrontierTopic } from '../../modules/frontier/frontierTypes';

type FrontierMapProps = {
  topic: FrontierTopic;
};

export function FrontierMap({ topic }: FrontierMapProps) {
  return (
    <section className="verification-card frontier-map-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Proof boundary map</p>
          <h2>Demostrado vs abierto vs barrera</h2>
        </div>
      </div>
      <div className="frontier-boundary-map">
        <article className="proved"><span>Demostrado</span><strong>{topic.known[0]}</strong></article>
        <article className="open"><span>Abierto</span><strong>{topic.unknown[0]}</strong></article>
        <article className="barrier"><span>Limitación técnica</span><strong>{topic.category === 'barrier' ? topic.title : 'Barreras conocidas aplican a rutas de prueba'}</strong></article>
      </div>
    </section>
  );
}
