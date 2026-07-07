import type { BooleanFunctionId, CircuitDefinition, CircuitMetrics } from './circuitTypes';

export function computeCircuitMetrics(circuit: CircuitDefinition): CircuitMetrics {
  const fanOutByGate = Object.fromEntries(circuit.gates.map((gate) => [gate.id, 0]));
  circuit.gates.forEach((gate) => gate.inputs.forEach((input) => { fanOutByGate[input] = (fanOutByGate[input] ?? 0) + 1; }));
  return {
    size: circuit.gates.filter((gate) => gate.type !== 'INPUT').length,
    depth: Math.max(...circuit.gates.map((gate) => gate.layer)),
    fanIn: Math.max(...circuit.gates.map((gate) => gate.inputs.length)),
    fanOut: Math.max(...Object.values(fanOutByGate)),
  };
}

export function evaluateCircuit(circuit: CircuitDefinition, assignment: Record<string, boolean>) {
  const values: Record<string, boolean> = { ...assignment };
  [...circuit.gates].sort((a, b) => a.layer - b.layer).forEach((gate) => {
    if (gate.type === 'INPUT') return;
    if (gate.type === 'NOT') values[gate.id] = !values[gate.inputs[0]];
    if (gate.type === 'AND') values[gate.id] = gate.inputs.every((input) => values[input]);
    if (gate.type === 'OR') values[gate.id] = gate.inputs.some((input) => values[input]);
  });
  return { output: values[circuit.outputGateId], values };
}

export function expectedFunctionValue(id: BooleanFunctionId, assignment: Record<string, boolean>) {
  const values = Object.values(assignment);
  if (id === 'and') return values.every(Boolean);
  if (id === 'or') return values.some(Boolean);
  if (id === 'majority') return values.filter(Boolean).length >= 2;
  return values.filter(Boolean).length % 2 === 1;
}

export function truthTableAssignments(variables: string[]) {
  return Array.from({ length: 2 ** variables.length }, (_, index) => Object.fromEntries(
    variables.map((variable, bit) => [variable, Boolean(index & (1 << bit))]),
  ));
}
