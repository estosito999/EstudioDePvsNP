import type { AlgorithmStep } from '../../modules/algorithms/algorithmTypes';

type InternalStructurePanelProps = {
  title: string;
  step: AlgorithmStep;
};

export function InternalStructurePanel({ title, step }: InternalStructurePanelProps) {
  return (
    <section className="verification-card internal-structure-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Internal structure</p>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="structure-token-list">
        {step.structure.map((item) => <code key={item}>{item}</code>)}
      </div>

      {step.table ? (
        <table className="distance-table compact-table">
          <tbody>
            {Object.entries(step.table).map(([key, value]) => (
              <tr key={key}><td>{key}</td><td>{value}</td></tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {step.matrix ? (
        <table className="matrix-table">
          <tbody>
            {step.matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {step.maxFlow !== undefined ? (
        <div className="max-flow-readout"><span>Flujo maximo actual</span><strong>{step.maxFlow}</strong></div>
      ) : null}
    </section>
  );
}
