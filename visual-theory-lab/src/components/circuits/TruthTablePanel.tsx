import type { CircuitDefinition } from '../../modules/circuits/circuitTypes';
import { evaluateCircuit, expectedFunctionValue, truthTableAssignments } from '../../modules/circuits/circuitUtils';

type TruthTablePanelProps = {
  circuit: CircuitDefinition;
  assignment: Record<string, boolean>;
  onAssignmentChange: (assignment: Record<string, boolean>) => void;
};

export function TruthTablePanel({ circuit, assignment, onAssignmentChange }: TruthTablePanelProps) {
  const rows = truthTableAssignments(circuit.variables);
  const allCorrect = rows.every((row) => evaluateCircuit(circuit, row).output === expectedFunctionValue(circuit.id, row));
  return (
    <section className="verification-card truth-table-card">
      <div className="verification-card-header">
        <div><p className="eyebrow">Truth table</p><h2>{allCorrect ? 'Calcula correctamente' : 'Fallo detectado'}</h2></div>
        <span className={allCorrect ? 'complexity-chip' : 'complexity-chip danger'}>{allCorrect ? 'CORRECT' : 'CHECK'}</span>
      </div>
      <div className="boolean-switch-grid">
        {circuit.variables.map((variable) => (
          <button
            className={assignment[variable] ? 'boolean-switch active' : 'boolean-switch false'}
            key={variable}
            type="button"
            onClick={() => onAssignmentChange({ ...assignment, [variable]: !assignment[variable] })}
          >
            <span>{variable}</span><strong>{assignment[variable] ? 'TRUE' : 'FALSE'}</strong>
          </button>
        ))}
      </div>
      <table className="matrix-table circuit-truth-table">
        <tbody>
          {rows.map((row, index) => {
            const actual = evaluateCircuit(circuit, row).output;
            const expected = expectedFunctionValue(circuit.id, row);
            return (
              <tr className={actual === expected ? 'ok' : 'bad'} key={index}>
                <td>{circuit.variables.map((variable) => `${variable}=${Number(row[variable])}`).join(' ')}</td>
                <td>out={Number(actual)}</td>
                <td>expected={Number(expected)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
