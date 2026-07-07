import { universeClusters } from '../../modules/universe/universeData';

export function UniverseClusterLegend() {
  return (
    <section className="verification-card universe-cluster-legend">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Clusters</p>
          <h2>Mapa espacial de teoría de la computación</h2>
        </div>
      </div>
      <div className="universe-cluster-list">
        {universeClusters.map((cluster) => (
          <article key={cluster.id} style={{ borderColor: cluster.color }}>
            <strong style={{ color: cluster.color }}>{cluster.label}</strong>
            <p>{cluster.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
