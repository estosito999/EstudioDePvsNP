import type { CircuitDefinition } from '../../modules/circuits/circuitTypes';
import { evaluateCircuit } from '../../modules/circuits/circuitUtils';

type CircuitVisualizerProps = {
  circuit: CircuitDefinition;
  assignment: Record<string, boolean>;
};

export function CircuitVisualizer({ circuit, assignment }: CircuitVisualizerProps) {
  const { values } = evaluateCircuit(circuit, assignment);
  const layers = Array.from(new Set(circuit.gates.map((gate) => gate.layer))).sort((a, b) => a - b);
  return (
    <section className="verification-card circuit-visualizer-card">
      <div className="verification-card-header">
        <div><p className="eyebrow">Depth layers</p><h2>Constructor visual</h2></div>
        <span className="status-badge cyan">AND / OR / NOT</span>
      </div>
      <div className="circuit-layer-grid">
        {layers.map((layer) => (
          <div className="circuit-layer" key={layer}>
            <span>depth {layer}</span>
            {circuit.gates.filter((gate) => gate.layer === layer).map((gate) => (
              <article className={`circuit-gate ${gate.type.toLowerCase()} ${values[gate.id] ? 'true' : 'false'}`} key={gate.id}>
                <strong>{gate.label}</strong>
                <small>{gate.type}</small>
                {gate.inputs.length > 0 ? <code>{gate.inputs.join(', ')}</code> : null}
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
