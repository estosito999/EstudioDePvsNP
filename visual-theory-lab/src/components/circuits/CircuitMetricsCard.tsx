import type { CircuitDefinition } from '../../modules/circuits/circuitTypes';
import { computeCircuitMetrics } from '../../modules/circuits/circuitUtils';

type CircuitMetricsCardProps = {
  circuit: CircuitDefinition;
};

export function CircuitMetricsCard({ circuit }: CircuitMetricsCardProps) {
  const metrics = computeCircuitMetrics(circuit);
  return (
    <section className="verification-card circuit-metrics-card">
      <div className="verification-card-header">
        <div><p className="eyebrow">Circuit metrics</p><h2>{circuit.name}</h2></div>
      </div>
      <div className="algorithm-facts-grid">
        <div><span>Tamaño</span><strong>{metrics.size}</strong></div>
        <div><span>Profundidad</span><strong>{metrics.depth}</strong></div>
        <div><span>Fan-in max</span><strong>{metrics.fanIn}</strong></div>
        <div><span>Fan-out max</span><strong>{metrics.fanOut}</strong></div>
      </div>
    </section>
  );
}
