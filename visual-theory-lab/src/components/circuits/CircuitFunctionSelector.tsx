import type { BooleanFunctionId } from '../../modules/circuits/circuitTypes';
import { circuitExamples } from '../../modules/circuits/circuitData';

type CircuitFunctionSelectorProps = {
  activeCircuitId: BooleanFunctionId;
  onSelectCircuit: (id: BooleanFunctionId) => void;
};

export function CircuitFunctionSelector({ activeCircuitId, onSelectCircuit }: CircuitFunctionSelectorProps) {
  return (
    <div className="circuit-function-selector">
      {circuitExamples.map((circuit) => (
        <button
          className={circuit.id === activeCircuitId ? 'circuit-function-card active' : 'circuit-function-card'}
          key={circuit.id}
          type="button"
          onClick={() => onSelectCircuit(circuit.id)}
        >
          <strong>{circuit.name}</strong>
          <span>{circuit.variables.length} inputs</span>
        </button>
      ))}
    </div>
  );
}
