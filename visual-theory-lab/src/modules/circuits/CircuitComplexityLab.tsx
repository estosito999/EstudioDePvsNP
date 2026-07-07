import { useState } from 'react';
import { CircuitFunctionSelector } from '../../components/circuits/CircuitFunctionSelector';
import { CircuitMetricsCard } from '../../components/circuits/CircuitMetricsCard';
import { CircuitModelComparison } from '../../components/circuits/CircuitModelComparison';
import { CircuitVisualizer } from '../../components/circuits/CircuitVisualizer';
import { LowerBoundsPanel } from '../../components/circuits/LowerBoundsPanel';
import { TruthTablePanel } from '../../components/circuits/TruthTablePanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { circuitExamples, defaultCircuitId } from './circuitData';
import type { BooleanFunctionId } from './circuitTypes';

type CircuitComplexityLabProps = {
  activeCircuitId: BooleanFunctionId;
  onCircuitChange: (id: BooleanFunctionId) => void;
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

function initialAssignment(variables: string[]) {
  return Object.fromEntries(variables.map((variable, index) => [variable, index % 2 === 0]));
}

export function CircuitComplexityLab({ activeCircuitId, onCircuitChange, onEvent }: CircuitComplexityLabProps) {
  const activeCircuit = circuitExamples.find((circuit) => circuit.id === activeCircuitId) ?? circuitExamples[0];
  const [assignment, setAssignment] = useState<Record<string, boolean>>(() => initialAssignment(activeCircuit.variables));

  function selectCircuit(id: BooleanFunctionId) {
    const circuit = circuitExamples.find((item) => item.id === id) ?? circuitExamples.find((item) => item.id === defaultCircuitId)!;
    onCircuitChange(id);
    setAssignment(initialAssignment(circuit.variables));
    onEvent(`Circuito ${circuit.name} seleccionado`, 'system');
    if (id === 'parity') onEvent('Error comun mostrado', 'warn');
  }

  return (
    <section className="module-shell circuit-module">
      <header className="module-toolbar verification-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>Circuit Complexity Lab</h1>
          <p className="module-subtitle">Circuitos booleanos, profundidad, fan-in/fan-out y limites inferiores en modelos restringidos.</p>
        </div>
        <div className="toolbar-actions">
          <StatusBadge label="AC0 / NC / P-poly" tone="purple" />
          <StatusBadge label="LOWER BOUNDS" tone="yellow" />
          <StatusBadge label="TRUTH TABLE" tone="green" />
        </div>
      </header>

      <div className="verification-content">
        <CircuitFunctionSelector activeCircuitId={activeCircuitId} onSelectCircuit={selectCircuit} />
        <div className="circuit-lab-grid">
          <CircuitVisualizer circuit={activeCircuit} assignment={assignment} />
          <CircuitMetricsCard circuit={activeCircuit} />
          <TruthTablePanel circuit={activeCircuit} assignment={assignment} onAssignmentChange={setAssignment} />
          <CircuitModelComparison />
          <LowerBoundsPanel />
        </div>
      </div>
    </section>
  );
}
